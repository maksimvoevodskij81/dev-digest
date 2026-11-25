import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../../messages/en/prReview.json";
import { RunCostBadge } from "./RunCostBadge";

afterEach(cleanup);

function renderWithIntl(ui: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={{ prReview: messages }}>
      {ui}
    </NextIntlClientProvider>,
  );
}

const RUN = { costUsd: 0.0144, tokensIn: 8240, tokensOut: 1310 };

describe("RunCostBadge", () => {
  it("compact: shows only the cost", () => {
    renderWithIntl(<RunCostBadge cost={RUN} variant="compact" />);
    expect(screen.getByText("$0.014")).toBeInTheDocument();
    expect(screen.queryByText(/8\.2K/)).not.toBeInTheDocument();
  });

  it("full: shows cost and tokens in → out", () => {
    renderWithIntl(<RunCostBadge cost={RUN} variant="full" />);
    expect(screen.getByText("$0.014 · 8.2K→1.3K")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Run cost $0.014 · 8.2K input → 1.3K output tokens"),
    ).toBeInTheDocument();
  });

  it("shows a dash, not $0.00, for a run without data", () => {
    renderWithIntl(<RunCostBadge cost={{ costUsd: null }} variant="full" />);
    expect(screen.getByText("—")).toBeInTheDocument();
    expect(screen.queryByText(/\$0\.00/)).not.toBeInTheDocument();
    expect(screen.getByLabelText("No cost data for this run")).toBeInTheDocument();
  });

  it("full: unknown price but known tokens shows a dash for cost", () => {
    renderWithIntl(
      <RunCostBadge cost={{ costUsd: null, tokensIn: 500, tokensOut: 40 }} variant="full" />,
    );
    expect(screen.getByText("— · 500→40")).toBeInTheDocument();
  });
});
