import { RunSummary } from "@/types/domain";

type Props = {
  summary: RunSummary;
  running: boolean;
  onRun: () => void;
};

export function RunSummaryPanel({ summary, running, onRun }: Props) {
  return (
    <article className="card">
      <div className="header-inline">
        <h2>Run Results</h2>
        <button className="button" disabled={running} onClick={onRun}>
          {running ? "Running..." : "Run Suite"}
        </button>
      </div>
      <div className="kpi"><span>Stable Pass</span><span className="badge good">{summary.stablePass}</span></div>
      <div className="kpi"><span>Stable Fail</span><span className="badge bad">{summary.stableFail}</span></div>
      <div className="kpi"><span>Flaky</span><span className="badge warn">{summary.flaky}</span></div>
      <div className="kpi"><span>Security Findings</span><span className="badge bad">{summary.securityFindings}</span></div>
      <div className="kpi"><span>Perf Regressions</span><span className="badge warn">{summary.perfRegressions}</span></div>
    </article>
  );
}
