import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Experience, { Logo } from './Experience';
import { experience } from '../data';

describe('Experience', () => {
  it('renders every job with its bullets', () => {
    render(<Experience />);
    const items = screen.getAllByRole('listitem').filter((li) => li.parentElement.tagName === 'OL');
    expect(items).toHaveLength(experience.length);
    for (const [i, job] of experience.entries()) {
      const item = within(items[i]);
      expect(item.getByRole('heading', { level: 3 })).toHaveTextContent(`${job.title} · ${job.company}`);
      for (const b of job.bullets) expect(item.getByText(b)).toBeInTheDocument();
      expect(item.getByText(job.date)).toBeInTheDocument();
    }
  });

  it('links job titles to the company site in a new tab', () => {
    render(<Experience />);
    const cvs = screen.getByRole('link', { name: /CVS Health Inc\./ });
    expect(cvs).toHaveAttribute('href', 'https://www.cvshealth.com');
    expect(cvs).toHaveAttribute('target', '_blank');
    expect(cvs).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('shows each company logo', () => {
    render(<Experience />);
    for (const job of experience) expect(screen.getByAltText(`${job.company} logo`)).toBeInTheDocument();
  });

  it('opens the résumé from the "View Full Résumé" link', async () => {
    const onOpenResume = vi.fn();
    render(<Experience onOpenResume={onOpenResume} />);
    await userEvent.click(screen.getByRole('button', { name: /View Full Résumé/ }));
    expect(onOpenResume).toHaveBeenCalledOnce();
  });

  it('hides the résumé link when there is no résumé', () => {
    render(<Experience />);
    expect(screen.queryByRole('button', { name: /View Full Résumé/ })).not.toBeInTheDocument();
  });
});

describe('Logo', () => {
  it('shows the image when a logo is given', () => {
    render(<Logo src="logos/visa.svg" name="Visa Inc." />);
    expect(screen.getByAltText('Visa Inc. logo')).toHaveAttribute('src', '/logos/visa.svg');
  });

  it.each([
    ['Digital Vibes LLC', 'DV'],
    ['Aduera Inc.', 'A'],
    ['Cisco Systems Inc.', 'CS'],
  ])('falls back to initials for %s', (name, initials) => {
    const { container } = render(<Logo name={name} />);
    expect(container).toHaveTextContent(initials);
    expect(container.querySelector('img')).toBeNull();
  });
});
