import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Publications from './Publications';
import { publications } from '../data';

describe('Publications', () => {
  it('shows each paper with its date, type, and venue', () => {
    render(<Publications />);
    const items = screen.getAllByRole('listitem').filter((li) => li.parentElement.tagName === 'OL');
    expect(items).toHaveLength(publications.length);
    for (const [i, p] of publications.entries()) {
      const item = within(items[i]);
      expect(item.getByRole('heading', { level: 3 })).toHaveTextContent(p.title);
      expect(item.getByText(p.date)).toBeInTheDocument();
      expect(item.getByText(p.type)).toBeInTheDocument();
      expect(item.getByText(p.venue)).toBeInTheDocument();
    }
  });

  it('links the Saviour paper and bolds Ankur among the authors', () => {
    render(<Publications />);
    const link = screen.getByRole('link', { name: /Saviour: Disaster Management/ });
    expect(link).toHaveAttribute('href', 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3276164');
    expect(link).toHaveAttribute('target', '_blank');
    expect(screen.getByText('A. Gokhale').tagName).toBe('B');
  });

  it('shows the competition ranking', () => {
    render(<Publications />);
    expect(screen.getByText('Ranked 2nd of 56 teams')).toBeInTheDocument();
  });

  it('opens the slides in the viewer', async () => {
    const onOpenSlides = vi.fn();
    render(<Publications onOpenSlides={onOpenSlides} />);
    await userEvent.click(screen.getByRole('button', { name: /View slides/ }));
    expect(onOpenSlides).toHaveBeenCalledWith(expect.objectContaining({ slides: 'papers/vgpp-slides.pdf' }));
  });

  it('hides the slides button when no viewer is available', () => {
    render(<Publications />);
    expect(screen.queryByRole('button', { name: /View slides/ })).not.toBeInTheDocument();
  });
});
