import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Education from './Education';

describe('Education', () => {
  it('shows both degrees with GPA and coursework', () => {
    render(<Education />);
    expect(screen.getByRole('link', { name: /Master of Science in Computer Science, The University of Texas at Dallas/ })).toHaveAttribute('href', 'https://www.utdallas.edu');
    expect(screen.getByRole('link', { name: /B\.E\. \(Hons\.\) in Computer Science, University of Mumbai/ })).toBeInTheDocument();
    expect(screen.getByText('Specialization in Data Science · GPA 3.81 / 4.0')).toBeInTheDocument();
    expect(screen.getByText('GPA 8.8 / 10')).toBeInTheDocument();
    expect(screen.getByText('Machine Learning')).toBeInTheDocument();
    expect(screen.getByText('2019 — 2021')).toBeInTheDocument();
    expect(screen.getByText('2015 — 2019')).toBeInTheDocument();
  });

  it('shows the school logos', () => {
    render(<Education />);
    expect(screen.getByAltText('The University of Texas at Dallas logo')).toBeInTheDocument();
    expect(screen.getByAltText('University of Mumbai logo')).toBeInTheDocument();
  });
});
