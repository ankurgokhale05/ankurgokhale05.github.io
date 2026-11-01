import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Skills from './Skills';
import { skills } from '../data';

describe('Skills', () => {
  it('shows every group with its skills', () => {
    render(<Skills />);
    for (const { group, items } of skills) {
      expect(screen.getByText(group, { selector: 'dt' })).toBeInTheDocument();
      const list = screen.getByRole('list', { name: group });
      for (const item of items) expect(list).toHaveTextContent(item);
    }
  });
});
