import { describe, it, expect } from 'vitest';
import { latestReviewCost, REVIEW_WINDOW_MS } from '../src/modules/pulls/run-cost.js';

const at = (iso: string) => new Date(iso);

describe('latestReviewCost', () => {
  it('is null when no run has a cost', () => {
    expect(latestReviewCost([])).toBeNull();
    expect(latestReviewCost([{ ranAt: at('2026-11-24T14:00:00Z'), costUsd: null }])).toBeNull();
  });

  it('sums the runs of one "Run all" click, not older reviews', () => {
    const cost = latestReviewCost([
      { ranAt: at('2026-11-24T14:18:12Z'), costUsd: 0.00018 }, // General
      { ranAt: at('2026-11-24T14:18:07Z'), costUsd: 0.00038 }, // Security, same click
      { ranAt: at('2026-11-24T14:12:14Z'), costUsd: 0.0002 }, // older review
      { ranAt: at('2026-11-24T14:04:16Z'), costUsd: 0.00062 }, // older review
    ]);
    expect(cost).toBeCloseTo(0.00056, 9);
  });

  it('ignores runs without a cost inside the window', () => {
    const cost = latestReviewCost([
      { ranAt: at('2026-11-24T14:18:12Z'), costUsd: 0.001 },
      { ranAt: at('2026-11-24T14:18:10Z'), costUsd: null },
    ]);
    expect(cost).toBe(0.001);
  });

  it('includes a run exactly at the window edge', () => {
    const newest = at('2026-11-24T14:18:00Z');
    const edge = new Date(newest.getTime() - REVIEW_WINDOW_MS);
    expect(latestReviewCost([{ ranAt: newest, costUsd: 1 }, { ranAt: edge, costUsd: 2 }])).toBe(3);
  });
});
