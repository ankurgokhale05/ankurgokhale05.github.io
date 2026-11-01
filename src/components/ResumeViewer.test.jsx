import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ResumeViewer from './ResumeViewer';

// Fake PDF.js: a 2-page document whose pages "render" instantly.
const getDocument = vi.fn();
vi.mock('pdfjs-dist', () => ({ GlobalWorkerOptions: {}, getDocument: (...a) => getDocument(...a) }));
vi.mock('pdfjs-dist/build/pdf.worker.min.mjs?url', () => ({ default: 'worker.js' }));

const fakePdf = (numPages) => ({
  numPages,
  destroy: vi.fn(),
  getPage: async () => ({
    getViewport: ({ scale }) => ({ width: 612 * scale, height: 792 * scale }),
    render: () => ({ promise: Promise.resolve(), cancel: vi.fn() }),
  }),
});

describe('ResumeViewer', () => {
  beforeEach(() => {
    getDocument.mockReset();
    document.body.style.overflow = '';
  });
  afterEach(() => vi.restoreAllMocks());

  it('renders nothing when closed', () => {
    render(<ResumeViewer src="/resume.pdf" open={false} onClose={() => {}} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(getDocument).not.toHaveBeenCalled();
  });

  it('draws one read-only image per page', async () => {
    getDocument.mockReturnValue({ promise: Promise.resolve(fakePdf(2)) });
    render(<ResumeViewer src="/resume.pdf" open onClose={() => {}} />);
    expect(screen.getByRole('dialog', { name: 'Résumé' })).toBeInTheDocument();
    expect(screen.getByText('Loading résumé…')).toBeInTheDocument();

    await waitFor(() => expect(screen.getAllByRole('img', { name: /Résumé page/ })).toHaveLength(2));
    expect(getDocument).toHaveBeenCalledWith('/resume.pdf');
    expect(screen.getByRole('img', { name: 'Résumé page 2 of 2' }).tagName).toBe('CANVAS');
    await waitFor(() => expect(screen.queryByText('Loading résumé…')).not.toBeInTheDocument());
  });

  it('starts fitted to the screen and toggles zoom from the button or by tapping the page', async () => {
    getDocument.mockReturnValue({ promise: Promise.resolve(fakePdf(1)) });
    const onClose = vi.fn();
    render(<ResumeViewer src="/resume.pdf" open onClose={onClose} />);
    const page = await screen.findByRole('img', { name: 'Résumé page 1 of 1' });

    const zoom = screen.getByRole('button', { name: 'Zoom in' });
    expect(zoom).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(zoom);
    expect(await screen.findByRole('button', { name: 'Fit to screen' })).toHaveAttribute('aria-pressed', 'true');

    // Wait for the zoomed-in page to replace the original before tapping it.
    const zoomedPage = await waitFor(() => {
      const el = screen.getByRole('img', { name: 'Résumé page 1 of 1' });
      expect(el).not.toBe(page);
      return el;
    });
    await userEvent.click(zoomedPage);
    expect(await screen.findByRole('button', { name: 'Zoom in' })).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('shows an error message if the PDF fails to load', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    getDocument.mockReturnValue({ promise: Promise.reject(new Error('404')) });
    render(<ResumeViewer src="/missing.pdf" open onClose={() => {}} />);
    expect(await screen.findByText("Sorry, the résumé couldn't be loaded.")).toBeInTheDocument();
  });

  it('stays quiet when closed while pages are still loading', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    let fail;
    getDocument.mockReturnValue({ promise: new Promise((_, reject) => (fail = reject)) });
    const { rerender } = render(<ResumeViewer src="/resume.pdf" open onClose={() => {}} />);

    rerender(<ResumeViewer src="/resume.pdf" open={false} onClose={() => {}} />);
    fail(new Error('Worker was destroyed'));
    await new Promise((r) => setTimeout(r, 0));

    expect(consoleError).not.toHaveBeenCalled();
  });

  it('closes with Escape, the close button, or a click outside the pages', async () => {
    getDocument.mockReturnValue({ promise: Promise.resolve(fakePdf(1)) });
    const onClose = vi.fn();
    render(<ResumeViewer src="/resume.pdf" open onClose={onClose} />);

    await userEvent.keyboard('{Escape}');
    await userEvent.click(screen.getByRole('button', { name: 'Close résumé' }));
    await userEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it('focuses the close button and locks page scrolling while open', () => {
    getDocument.mockReturnValue({ promise: new Promise(() => {}) });
    const { rerender } = render(<ResumeViewer src="/resume.pdf" open onClose={() => {}} />);
    expect(screen.getByRole('button', { name: 'Close résumé' })).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');

    rerender(<ResumeViewer src="/resume.pdf" open={false} onClose={() => {}} />);
    expect(document.body.style.overflow).toBe('');
  });
});
