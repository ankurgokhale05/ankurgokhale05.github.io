import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Section from './Section';

describe('Section', () => {
  it('shows a visible heading that also names the section', () => {
    render(
      <Section id="skills" label="Skills">
        <p>content</p>
      </Section>
    );
    const heading = screen.getByRole('heading', { level: 2, name: 'Skills' });
    expect(heading).not.toHaveClass('sr-only');
    expect(screen.getByRole('region', { name: 'Skills' })).toHaveAttribute('id', 'skills');
  });
});
