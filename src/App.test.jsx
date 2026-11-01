import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('./components/ResumeViewer', () => ({
  default: ({ open }) => (open ? <div role="dialog" aria-label="Résumé" /> : null),
}));

describe('App', () => {
  it('renders all sections in order', () => {
    const { container } = render(<App />);
    const ids = [...container.querySelectorAll('main section')].map((s) => s.id);
    expect(ids).toEqual(['about', 'experience', 'education', 'projects']);
    expect(screen.getByRole('contentinfo')).toHaveAttribute('id', 'contact');
  });

  it('keeps the footer free of third-party credits', () => {
    render(<App />);
    expect(screen.getByRole('contentinfo')).not.toHaveTextContent(/Brittany|inspired/i);
  });

  it('opens the résumé directly when visiting /#resume', () => {
    window.location.hash = '#resume';
    render(<App />);
    expect(screen.getByRole('dialog', { name: 'Résumé' })).toBeInTheDocument();
  });

  it('starts with the résumé closed', () => {
    render(<App />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('jumps to the section in the URL once the page has rendered', () => {
    Element.prototype.scrollIntoView.mockClear();
    window.location.hash = '#education';
    render(<App />);
    expect(document.getElementById('education').scrollIntoView).toHaveBeenCalled();
  });

  it('shows all cards right away in browsers without IntersectionObserver', () => {
    const { container } = render(<App />);
    const cards = container.querySelectorAll('[data-reveal]');
    expect(cards.length).toBeGreaterThan(10);
    for (const el of cards) expect(el).toHaveClass('is-visible');
  });

  it('hides the skip link until it is focused', () => {
    render(<App />);
    const skip = screen.getByRole('link', { name: 'Skip to Content' });
    expect(skip).toHaveClass('sr-only');
    expect(skip).toHaveAttribute('href', '#content');
  });
});
