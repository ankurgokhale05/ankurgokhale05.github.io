import { useEffect, useRef, useState } from 'react';

const MAX_ZOOMED_WIDTH = 1000; // px; keeps "Zoom in" readable without getting huge on wide screens

// Renders a PDF (the résumé, or slides) as images (one canvas per page), so it is read-only
// and looks the same on every browser, including phones.
// By default each page is scaled to fit entirely on screen; "Zoom in" fits the width instead.
export default function ResumeViewer({ src, open, onClose, title = 'Résumé' }) {
  const name = title.toLowerCase();
  const scrollerRef = useRef(null);
  const pagesRef = useRef(null);
  const closeRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const [doc, setDoc] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  const [canZoom, setCanZoom] = useState(false); // false when fitting the width wouldn't make the page bigger (e.g. phones)
  const [size, setSize] = useState(0); // bumps when the viewer is resized, to re-fit the pages

  // Keyboard, focus, and page-scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // Load the PDF once per open.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    let loaded;
    setStatus('loading');
    setZoomed(false);

    (async () => {
      try {
        const pdfjs = await import('pdfjs-dist');
        const { default: workerUrl } = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
        pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
        loaded = await pdfjs.getDocument(src).promise;
        if (cancelled) return loaded.destroy();
        setDoc(loaded);
      } catch (err) {
        // Closing the viewer mid-load cancels PDF.js work; that's expected, not an error.
        if (cancelled) return;
        console.error(err);
        setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
      loaded?.destroy();
      setDoc(null);
    };
  }, [open, src]);

  // Re-fit when the window or viewer changes size.
  useEffect(() => {
    if (!open) return;
    const bump = () => setSize((n) => n + 1);
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', bump);
      return () => window.removeEventListener('resize', bump);
    }
    const ro = new ResizeObserver(bump);
    if (scrollerRef.current) ro.observe(scrollerRef.current);
    return () => ro.disconnect();
  }, [open]);

  // Draw every page at the current fit.
  useEffect(() => {
    const container = pagesRef.current;
    const scroller = scrollerRef.current;
    if (!doc || !container || !scroller) return;
    let cancelled = false;
    const tasks = [];

    (async () => {
      try {
        const style = getComputedStyle(scroller);
        const availW = container.clientWidth;
        const availH = scroller.clientHeight - parseFloat(style.paddingTop || 0) - parseFloat(style.paddingBottom || 0);
        const ratio = window.devicePixelRatio || 1;
        const canvases = [];

        for (let n = 1; n <= doc.numPages; n++) {
          const page = await doc.getPage(n);
          if (cancelled) return;
          const base = page.getViewport({ scale: 1 });
          // Fallback of 1 when the viewer has no size yet (e.g. in tests).
          const hasSize = availW > 0 && availH > 0;
          const fitScale = hasSize ? Math.min(availW / base.width, availH / base.height) : 1;
          const widthScale = hasSize ? Math.min(availW, MAX_ZOOMED_WIDTH) / base.width : 1.5;
          const zoomHelps = widthScale > fitScale * 1.1;
          if (n === 1) setCanZoom(zoomHelps);
          const scale = zoomed && zoomHelps ? widthScale : fitScale;
          const viewport = page.getViewport({ scale: scale * ratio });
          const canvas = document.createElement('canvas');
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          canvas.style.width = `${Math.floor(base.width * scale)}px`;
          canvas.className = 'mx-auto block rounded bg-white shadow-lg';
          canvas.setAttribute('role', 'img');
          canvas.setAttribute('aria-label', `${title} page ${n} of ${doc.numPages}`);
          canvases.push(canvas);
          const task = page.render({ canvasContext: canvas.getContext('2d'), viewport });
          tasks.push(task);
          await task.promise;
          if (cancelled) return;
        }
        container.replaceChildren(...canvases);
        setStatus('ready');
      } catch (err) {
        // A newer render (resize, zoom) or closing cancels this one; that's expected.
        if (cancelled) return;
        console.error(err);
        setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
      for (const t of tasks) t.cancel?.();
    };
  }, [doc, zoomed, size]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/90 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 px-4 py-3 md:px-8">
        <h2 className="truncate text-sm font-bold uppercase tracking-widest text-slate-200">{title}</h2>
        <div className="flex shrink-0 items-center gap-1">
          {canZoom && (
            <button
              type="button"
              onClick={() => setZoomed((z) => !z)}
              aria-pressed={zoomed}
              disabled={status !== 'ready'}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-300 disabled:opacity-40"
            >
              {zoomed ? 'Fit to screen' : 'Zoom in'}
            </button>
          )}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-300"
            aria-label={`Close ${name}`}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="flex-1 overflow-y-auto px-4 py-4 md:px-8"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        onContextMenu={(e) => e.preventDefault()}
      >
        {status === 'loading' && <p className="py-12 text-center text-sm text-slate-400">Loading {name}…</p>}
        {status === 'error' && <p className="py-12 text-center text-sm text-slate-400">Sorry, the {name} couldn&apos;t be loaded.</p>}
        {/* Tapping the page toggles zoom; tapping beside it closes the viewer. */}
        <div
          ref={pagesRef}
          className={`space-y-4 select-none ${canZoom ? (zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in') : ''}`}
          onClick={(e) => (e.target === e.currentTarget ? onClose() : canZoom && setZoomed((z) => !z))}
        />
      </div>
    </div>
  );
}
