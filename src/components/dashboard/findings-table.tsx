import { Finding } from "@/types/domain";

type Props = { findings: Finding[] };

export function FindingsTable({ findings }: Props) {
  return (
    <article className="card" style={{ marginTop: 16 }}>
      <h2>Top Findings</h2>
      <table className="table">
        <thead>
          <tr><th>Severity</th><th>Issue</th><th>Suggested Fix</th></tr>
        </thead>
        <tbody>
          {findings.map((f) => (
            <tr key={f.id}>
              <td><span className={`badge ${f.severity === "high" ? "bad" : "warn"}`}>{f.severity}</span></td>
              <td>{f.title}</td>
              <td>{f.fix}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}
