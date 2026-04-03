import { Requirement } from "@/types/domain";

type Props = {
  requirements: Requirement[];
};

export function RequirementsTable({ requirements }: Props) {
  return (
    <article className="card">
      <h2>Requirement Coverage</h2>
      <table className="table">
        <thead>
          <tr><th>Requirement</th><th>Business Goal</th><th>Coverage</th></tr>
        </thead>
        <tbody>
          {requirements.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.goal}</td>
              <td>{r.coverage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}
