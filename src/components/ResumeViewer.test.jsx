import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
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
    render: () => ({ promise: Promise.resolve() }),
  }),
});

describe('ResumeViewer', () => {
  beforeEach(() => {
    getDocument.mockReset();
    document.body.style.overflow = '';
  });

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
    expect(screen.queryByText('Loading résumé…')).not.toBeInTheDocument();
  });

  it('shows an error message if the PDF fails to load', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    getDocument.mockReturnValue({ promise: Promise.reject(new Error('404')) });
    render(<ResumeViewer src="/missing.pdf" open onClose={() => {}} />);
    expect(await screen.findByText("Sorry, the résumé couldn't be loaded.")).toBeInTheDocument();
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
