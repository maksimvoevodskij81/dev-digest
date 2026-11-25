/* RunCostBadge — what one review run cost, in two sizes:
   - compact: "$0.012" (PR list COST column)
   - full:    "$0.014 · 8.2K→1.3K" (verdict banner on PR detail)
   No data → "—", never "$0.00". Reads only data the API already returns:
   no extra model calls. */
"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@devdigest/ui";
import { NO_DATA, formatCost, formatTokens, hasCostData, type RunCost } from "./format";

export function RunCostBadge({
  cost,
  variant,
}: {
  cost: RunCost | null | undefined;
  variant: "compact" | "full";
}) {
  const t = useTranslations("prReview");

  if (!hasCostData(cost)) {
    return (
      <span className="mono" aria-label={t("cost.noData")} title={t("cost.noData")} style={muted}>
        {NO_DATA}
      </span>
    );
  }

  const usd = formatCost(cost!.costUsd);
  const tin = formatTokens(cost!.tokensIn);
  const tout = formatTokens(cost!.tokensOut);
  const label = t("cost.tooltip", { cost: usd, tokensIn: tin, tokensOut: tout });

  if (variant === "compact") {
    return (
      <span className="mono" aria-label={label} title={label} style={muted}>
        {usd}
      </span>
    );
  }

  const showTokens = cost!.tokensIn != null || cost!.tokensOut != null;
  return (
    <span aria-label={label} title={label}>
      <Badge mono color="var(--text-secondary)">
        {usd}
        {showTokens ? ` · ${tin}→${tout}` : ""}
      </Badge>
    </span>
  );
}

const muted = { color: "var(--text-muted)", fontSize: 12 } as const;
