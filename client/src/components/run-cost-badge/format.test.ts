import { describe, it, expect } from "vitest";
import { formatCost, formatTokens, hasCostData } from "./format";

describe("formatCost", () => {
  it("shows a dash, not $0.00, when the cost is unknown", () => {
    expect(formatCost(null)).toBe("—");
    expect(formatCost(undefined)).toBe("—");
    expect(formatCost(Number.NaN)).toBe("—");
  });

  it("keeps at least 3 decimals for cent fractions", () => {
    expect(formatCost(0.0123)).toBe("$0.012");
    expect(formatCost(0.0144)).toBe("$0.014");
    expect(formatCost(0.001)).toBe("$0.001");
  });

  it("keeps 2 significant digits below one cent", () => {
    expect(formatCost(0.0013710740000000001)).toBe("$0.0014");
    expect(formatCost(0.000556322)).toBe("$0.00056");
    expect(formatCost(0.00042)).toBe("$0.00042");
    expect(formatCost(0.0000001)).toBe("$0.0000001"); // no "1e-7"
  });

  it("uses 2 decimals from one dollar up, and $0 for a free run", () => {
    expect(formatCost(1.234)).toBe("$1.23");
    expect(formatCost(0)).toBe("$0");
  });
});

describe("formatTokens", () => {
  it("shortens thousands and millions", () => {
    expect(formatTokens(820)).toBe("820");
    expect(formatTokens(8240)).toBe("8.2K");
    expect(formatTokens(1000)).toBe("1K");
    expect(formatTokens(1_250_000)).toBe("1.3M");
    expect(formatTokens(null)).toBe("—");
  });
});

describe("hasCostData", () => {
  it("is false only when nothing is known", () => {
    expect(hasCostData(null)).toBe(false);
    expect(hasCostData({ costUsd: null, tokensIn: null, tokensOut: null })).toBe(false);
    expect(hasCostData({ costUsd: null, tokensIn: 10, tokensOut: 2 })).toBe(true);
  });
});
