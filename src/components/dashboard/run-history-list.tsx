import { DataSourceMeta } from "@/lib/dataSource";

export type RunHistoryItem = {
  id: string;
  timestamp: string;
  source: DataSourceMeta["mode"];
  summary: {
    stablePass: number;
    stableFail: number;
    flaky: number;
  };
};

type Props = {
  runs: RunHistoryItem[];
};

export function RunHistoryList({ runs }: Props) {
  return (
    <article className="card" style={{ marginTop: 16 }}>
      <h2>Recent Runs</h2>
      {runs.length === 0 ? (
        <p className="small">No runs yet. Click “Run Suite” to create your first execution snapshot.</p>
      ) : (
        <table className="table">
          <thead>
            <tr><th>Run ID</th><th>Time</th><th>Source</th><th>Result</th></tr>
          </thead>
          <tbody>
            {runs.map((run) => (
              <tr key={run.id}>
                <td>{run.id}</td>
                <td>{run.timestamp}</td>
                <td>{run.source.toUpperCase()}</td>
                <td>{`pass ${run.summary.stablePass} · fail ${run.summary.stableFail} · flaky ${run.summary.flaky}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </article>
  );
}
