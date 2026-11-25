import { z } from 'zod';
import { RunSummary } from './trace.js';
import { PrMeta } from './platform.js';

/**
 * Run cost (L01 lab, "Run Cost Badge"). A new file on purpose: existing
 * contracts are never edited, so the cost field is added by extending them.
 *
 * cost_usd: USD for the whole run — OpenRouter's real `usage.cost` when the
 * provider returns it, else tokens x the price book. Null = unknown (old run,
 * failed/cancelled run, or a model with no price). Null is shown as "—",
 * never as $0.00.
 */
export const CostUsd = z.number().nonnegative().nullable();

/** One row of a PR's run history, with the run's cost. */
export const RunSummaryWithCost = RunSummary.extend({ cost_usd: CostUsd });
export type RunSummaryWithCost = z.infer<typeof RunSummaryWithCost>;

/** One PR in the list, with the total cost of all its runs. */
export const PrMetaWithCost = PrMeta.extend({ cost_usd: CostUsd.optional() });
export type PrMetaWithCost = z.infer<typeof PrMetaWithCost>;
