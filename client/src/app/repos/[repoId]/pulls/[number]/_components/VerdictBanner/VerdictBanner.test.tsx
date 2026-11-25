import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../../../../../../messages/en/prReview.json";
import { VerdictBanner } from "./VerdictBanner";

afterEach(cleanup);

function renderWithIntl(ui: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={{ prReview: messages }}>
      {ui}
    </NextIntlClientProvider>,
  );
}

describe("VerdictBanner (smoke)", () => {
  it("shows verdict label + score + finding/blocker counts", () => {
    renderWithIntl(
      <VerdictBanner
        verdict="request_changes"
        summary="Hardcoded secret introduced."
        score={42}
        findingsCount={1}
        blockers={1}
        agentName="Security Reviewer"
      />,
    );
    expect(screen.getByText("Request changes")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText(/1 findings · 1 blockers/)).toBeInTheDocument();
  });

  it("shows the run cost line when the run has cost data", () => {
    renderWithIntl(
      <VerdictBanner
        verdict="comment"
        summary={null}
        score={76}
        findingsCount={2}
        blockers={0}
        cost={{ costUsd: 0.0144, tokensIn: 8240, tokensOut: 1310 }}
      />,
    );
    expect(screen.getByText("$0.014 · 8.2K→1.3K")).toBeInTheDocument();
  });

  it("shows a dash for a run without cost data, and nothing without a run", () => {
    const base = { verdict: "comment" as const, summary: null, score: 76, findingsCount: 0, blockers: 0 };
    const { unmount } = renderWithIntl(<VerdictBanner {...base} cost={null} />);
    expect(screen.getByLabelText("No cost data for this run")).toHaveTextContent("—");
    unmount();
    renderWithIntl(<VerdictBanner {...base} />);
    expect(screen.queryByLabelText("No cost data for this run")).not.toBeInTheDocument();
  });
});
