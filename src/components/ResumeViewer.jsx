import { useEffect, useRef, useState } from 'react';

// Renders the résumé PDF as images (one canvas per page), so it is read-only
// and looks the same on every browser, including phones.
export default function ResumeViewer({ src, open, onClose }) {
  const pagesRef = useRef(null);
  const closeRef = useRef(null);
  const [status, setStatus] = useState('loading');

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

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    let doc;
    setStatus('loading');

    (async () => {
      try {
        const pdfjs = await import('pdfjs-dist');
        const { default: workerUrl } = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
        pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

        doc = await pdfjs.getDocument(src).promise;
        const container = pagesRef.current;
        if (cancelled || !container) return;
        container.replaceChildren();

        const width = Math.min(container.clientWidth, 900);
        const ratio = window.devicePixelRatio || 1;

        for (let n = 1; n <= doc.numPages; n++) {
          const page = await doc.getPage(n);
          if (cancelled) return;
          const base = page.getViewport({ scale: 1 });
          const viewport = page.getViewport({ scale: (width / base.width) * ratio });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = '100%';
          canvas.className = 'mx-auto mb-4 block rounded bg-white shadow-lg';
          canvas.setAttribute('role', 'img');
          canvas.setAttribute('aria-label', `Résumé page ${n} of ${doc.numPages}`);
          container.appendChild(canvas);
          await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        }
        if (!cancelled) setStatus('ready');
      } catch (err) {
        // Closing the viewer mid-render cancels PDF.js work; that's expected, not an error.
        if (cancelled) return;
        console.error(err);
        setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
      doc?.destroy();
    };
  }, [open, src]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/90 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Résumé"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 md:px-8">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">Résumé</h2>
        <button
          ref={closeRef}
          onClick={onClose}
          className="rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-300"
          aria-label="Close résumé"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
      <div
        className="flex-1 overflow-y-auto px-4 py-6 md:px-8"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        onContextMenu={(e) => e.preventDefault()}
      >
        {status === 'loading' && <p className="py-12 text-center text-sm text-slate-500">Loading résumé…</p>}
        {status === 'error' && <p className="py-12 text-center text-sm text-slate-400">Sorry, the résumé couldn't be loaded.</p>}
        <div ref={pagesRef} className="mx-auto max-w-[900px] select-none" />
      </div>
    </div>
  );
}
