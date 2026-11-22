import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { FindingRecord } from "@devdigest/shared";
import messages from "../../../../../../../../messages/en/prReview.json";

vi.mock("../../../../../../../lib/hooks/reviews", () => ({
  useFindingAction: () => ({ mutate: vi.fn(), isPending: false }),
}));

import { FindingsPanel } from "./FindingsPanel";

afterEach(cleanup);

const FINDINGS: FindingRecord[] = [
  {
    id: "f1",
    severity: "CRITICAL",
    category: "security",
    title: "Hardcoded secret",
    file: "src/config.ts",
    start_line: 11,
    end_line: 11,
    rationale: "A secret is committed.",
    suggestion: null,
    confidence: 0.95,
    kind: "finding",
    trifecta_components: null,
    evidence: null,
    review_id: "r1",
    accepted_at: null,
    dismissed_at: null,
  },
];

function renderWithIntl(ui: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={{ prReview: messages }}>
      {ui}
    </NextIntlClientProvider>,
  );
}

describe("FindingsPanel (smoke)", () => {
  it("renders the toolbar + a finding card", () => {
    renderWithIntl(<FindingsPanel findings={FINDINGS} prId="pr1" />);
    expect(screen.getByText("Hide low confidence")).toBeInTheDocument();
    expect(screen.getByText("Hardcoded secret")).toBeInTheDocument();
  });

  it("shows the empty state when nothing matches", () => {
    renderWithIntl(<FindingsPanel findings={[]} prId="pr1" />);
    expect(screen.getByText("No findings match")).toBeInTheDocument();
  });
});

const MIXED: FindingRecord[] = [
  FINDINGS[0]!,
  { ...FINDINGS[0]!, id: "f2", severity: "CRITICAL", title: "SQL injection" },
  { ...FINDINGS[0]!, id: "f3", severity: "WARNING", title: "N+1 query" },
];

const counter = (name: RegExp) => screen.getByRole("button", { name });

describe("FindingsPanel severity counters", () => {
  it("shows a counter per level that matches the findings", () => {
    renderWithIntl(<FindingsPanel findings={MIXED} prId="pr1" />);
    expect(counter(/critical/i)).toHaveTextContent("2");
    expect(counter(/warning/i)).toHaveTextContent("1");
    expect(counter(/suggestion/i)).toHaveTextContent("0");
    expect(counter(/suggestion/i)).toBeDisabled();
  });

  it("filters to one level on click and clears on a second click", () => {
    renderWithIntl(<FindingsPanel findings={MIXED} prId="pr1" />);
    fireEvent.click(counter(/warning/i));
    expect(screen.getByText("N+1 query")).toBeInTheDocument();
    expect(screen.queryByText("SQL injection")).not.toBeInTheDocument();
    expect(counter(/warning/i)).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(counter(/warning/i));
    expect(screen.getByText("SQL injection")).toBeInTheDocument();
    expect(screen.getByText("N+1 query")).toBeInTheDocument();
  });

  it("clears the filter with the Clear link", () => {
    renderWithIntl(<FindingsPanel findings={MIXED} prId="pr1" />);
    fireEvent.click(counter(/critical/i));
    expect(screen.queryByText("N+1 query")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Clear filter" }));
    expect(screen.getByText("N+1 query")).toBeInTheDocument();
  });
});
