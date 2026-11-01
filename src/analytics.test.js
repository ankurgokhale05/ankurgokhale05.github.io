import { describe, expect, it, vi } from 'vitest';
import { track } from './analytics';

describe('track', () => {
  it('does nothing when the counter script is missing or blocked', () => {
    expect(() => track('resume-open')).not.toThrow();
  });

  it('sends a named event to GoatCounter', () => {
    window.goatcounter = { count: vi.fn() };
    track('resume-open', 'Résumé opened');
    expect(window.goatcounter.count).toHaveBeenCalledWith({ path: 'resume-open', title: 'Résumé opened', event: true });
  });

  it('uses the name as the title when no title is given', () => {
    window.goatcounter = { count: vi.fn() };
    track('click-github');
    expect(window.goatcounter.count).toHaveBeenCalledWith({ path: 'click-github', title: 'click-github', event: true });
  });

  it('never lets an analytics error break the page', () => {
    window.goatcounter = { count: () => { throw new Error('blocked'); } };
    expect(() => track('x')).not.toThrow();
  });
});
