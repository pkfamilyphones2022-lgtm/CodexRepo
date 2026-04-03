import { GeneratedTest } from "@/types/domain";

type Props = {
  tests: GeneratedTest[];
  busy: boolean;
  onGenerate: () => void;
  onSelectRca: (testId: string) => void;
};

export function GeneratedTestsTable({ tests, busy, onGenerate, onSelectRca }: Props) {
  return (
    <article className="card">
      <div className="header-inline">
        <h2>Generated Tests (with rationale)</h2>
        <button className="button" onClick={onGenerate} disabled={busy}>
          {busy ? "Generating..." : "Generate Tests"}
        </button>
      </div>
      <table className="table">
        <thead>
          <tr><th>Test</th><th>Type</th><th>Rationale</th><th>RCA</th></tr>
        </thead>
        <tbody>
          {tests.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.type}</td>
              <td>{t.rationale}</td>
              <td><button className="link" onClick={() => onSelectRca(t.id)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}
