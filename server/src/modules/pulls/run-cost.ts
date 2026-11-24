/**
 * Cost of a PR's latest review, for the PR list's COST column.
 *
 * One click can start several agent runs ("Run all agents"): they start within
 * seconds of each other and together are one review. There is no review/batch
 * id on agent_runs, so a time window groups them: every priced run that started
 * at most REVIEW_WINDOW_MS before the newest priced run counts.
 */
export const REVIEW_WINDOW_MS = 120_000;

export interface PricedRun {
  ranAt: Date | null;
  costUsd: number | null;
}

/** Sum of the latest review's priced runs; null when no run has a cost. */
export function latestReviewCost(runs: PricedRun[]): number | null {
  const priced = runs.filter(
    (r): r is { ranAt: Date; costUsd: number } => r.costUsd != null && r.ranAt != null,
  );
  if (priced.length === 0) return null;
  const newest = Math.max(...priced.map((r) => r.ranAt.getTime()));
  return priced
    .filter((r) => r.ranAt.getTime() >= newest - REVIEW_WINDOW_MS)
    .reduce((sum, r) => sum + r.costUsd, 0);
}
