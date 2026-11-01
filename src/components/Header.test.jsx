import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Header from './Header';

vi.mock('../analytics', () => ({ track: vi.fn() }));
const { track } = await import('../analytics');

describe('Header', () => {
  it('shows name, title, and tagline', () => {
    render(<Header active="about" />);
    expect(screen.getByRole('heading', { level: 1, name: 'Ankur Gokhale' })).toBeInTheDocument();
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    expect(screen.getByText(/backend systems and data platforms/)).toBeInTheDocument();
  });

  it('links to every section and marks the active one', () => {
    render(<Header active="education" />);
    const nav = screen.getByRole('navigation');
    const links = within(nav).getAllByRole('link');
    expect(links.map((a) => a.getAttribute('href'))).toEqual(['#about', '#experience', '#education', '#projects']);
    expect(within(nav).getByRole('link', { name: 'education' })).toHaveAttribute('aria-current', 'true');
    expect(within(nav).getByRole('link', { name: 'about' })).not.toHaveAttribute('aria-current');
  });

  it('opens the résumé from the nav and the mobile button', async () => {
    const onOpenResume = vi.fn();
    render(<Header active="about" onOpenResume={onOpenResume} />);
    await userEvent.click(screen.getByRole('button', { name: 'Resume' }));
    await userEvent.click(screen.getByRole('button', { name: 'View Résumé' }));
    expect(onOpenResume).toHaveBeenCalledTimes(2);
  });

  it('hides résumé buttons when there is no résumé', () => {
    render(<Header active="about" onOpenResume={null} />);
    expect(screen.queryByRole('button', { name: /resume|résumé/i })).not.toBeInTheDocument();
  });

  it('shows GitHub, LinkedIn, and Email links and counts clicks', async () => {
    render(<Header active="about" />);
    const list = screen.getByRole('list', { name: 'Social media' });
    const links = within(list).getAllByRole('link');
    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      'https://github.com/ankurgokhale05',
      'https://www.linkedin.com/in/ankurajitgokhale/',
      'mailto:ankurgokhale05@gmail.com',
    ]);
    expect(links[0]).toHaveAttribute('target', '_blank');
    expect(links[2]).not.toHaveAttribute('target');

    links[1].addEventListener('click', (e) => e.preventDefault());
    await userEvent.click(links[1]);
    expect(track).toHaveBeenCalledWith('click-linkedin', 'Clicked LinkedIn');
  });
});
