/** Formatting for the run cost badge. Pure functions, no React. */

/** Shown when a run has no cost or token data (old, failed or unpriced run). */
export const NO_DATA = "—";

/**
 * USD cost of one run. Null/undefined → "—" (never "$0.00": unknown is not free).
 * Reviews usually cost fractions of a cent, so keep at least 3 decimals
 * ("$0.012", not "$0.01"); below one cent keep 2 significant digits
 * ("$0.0014", "$0.00042"), with no trailing zeros past 3 decimals ("$0.001").
 */
export function formatCost(usd: number | null | undefined): string {
  if (usd == null || !Number.isFinite(usd) || usd < 0) return NO_DATA;
  if (usd === 0) return "$0";
  if (usd >= 1) return `$${usd.toFixed(2)}`;
  if (usd >= 0.01) return `$${usd.toFixed(3)}`;
  const decimals = Math.max(3, 1 - Math.floor(Math.log10(usd)));
  return `$${trimTrailingZeros(usd.toFixed(decimals), 3)}`;
}

/** "0.0010" → "0.001": drop trailing zeros, but keep at least `min` decimals. */
function trimTrailingZeros(s: string, min: number): string {
  const dot = s.indexOf(".");
  let end = s.length;
  while (end > dot + 1 + min && s[end - 1] === "0") end--;
  return s.slice(0, end);
}

/** Token count, short: 820 → "820", 8_240 → "8.2K", 1_250_000 → "1.3M". */
export function formatTokens(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n) || n < 0) return NO_DATA;
  if (n < 1000) return String(Math.round(n));
  if (n < 1_000_000) return `${trimZero((n / 1000).toFixed(1))}K`;
  return `${trimZero((n / 1_000_000).toFixed(1))}M`;
}

function trimZero(s: string): string {
  return s.endsWith(".0") ? s.slice(0, -2) : s;
}

/** True when the run has any number worth showing. */
export function hasCostData(c: RunCost | null | undefined): boolean {
  return c != null && (c.costUsd != null || c.tokensIn != null || c.tokensOut != null);
}

/** What the badge needs from a run. */
export interface RunCost {
  costUsd: number | null | undefined;
  tokensIn?: number | null;
  tokensOut?: number | null;
}
