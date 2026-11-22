import { describe, it, expect } from "vitest";
import type { FindingRecord } from "@devdigest/shared";
import { confidentFindings, countBySeverity, visibleFindings } from "./helpers";

const f = (id: string, severity: FindingRecord["severity"], confidence = 0.9) =>
  ({ id, severity, confidence }) as FindingRecord;

const LIST = [f("c1", "CRITICAL"), f("w1", "WARNING", 0.3), f("c2", "CRITICAL", 0.4), f("s1", "SUGGESTION")];

describe("countBySeverity", () => {
  it("counts each level and gives 0 to empty levels", () => {
    expect(countBySeverity(LIST)).toEqual({ CRITICAL: 2, WARNING: 1, SUGGESTION: 1 });
    expect(countBySeverity([f("c1", "CRITICAL")])).toEqual({ CRITICAL: 1, WARNING: 0, SUGGESTION: 0 });
  });

  it("follows hide-low, so counts match the visible list", () => {
    expect(countBySeverity(confidentFindings(LIST, true))).toEqual({ CRITICAL: 1, WARNING: 0, SUGGESTION: 1 });
  });
});

describe("visibleFindings", () => {
  it("keeps only the picked severity", () => {
    expect(visibleFindings(LIST, false, "CRITICAL").map((x) => x.id)).toEqual(["c1", "c2"]);
  });

  it("applies severity and hide-low together", () => {
    expect(visibleFindings(LIST, true, "CRITICAL").map((x) => x.id)).toEqual(["c1"]);
  });

  it("returns everything, sorted by severity, with no filter", () => {
    expect(visibleFindings(LIST, false).map((x) => x.id)).toEqual(["c1", "c2", "w1", "s1"]);
  });
});
