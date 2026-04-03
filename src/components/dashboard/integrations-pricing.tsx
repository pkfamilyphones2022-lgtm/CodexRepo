import { IntegrationStatus } from "@/types/domain";

type Props = {
  integrations: IntegrationStatus;
};

const label = (value: boolean) => (value ? "✅" : "❌");

export function IntegrationsPricing({ integrations }: Props) {
  return (
    <section className="grid grid-2" style={{ marginTop: 16 }}>
      <article className="card">
        <h2>MCP Integrations</h2>
        <p className="small">
          GitHub {label(integrations.github)} · Jira {label(integrations.jira)} · Slack {label(integrations.slack)} · CI/CD {label(integrations.cicd)}
        </p>
        <p className="small">Native connectors planned via MCP transport (not webhook-only).</p>
      </article>

      <article className="card">
        <h2>Solo-dev Pricing</h2>
        <div className="pricing">
          <div className="card"><h3>Free</h3><p className="small">200 runs/mo · 1 project</p></div>
          <div className="card"><h3>Starter</h3><p className="small">$29/mo · 2k runs · Slack</p></div>
          <div className="card"><h3>Growth</h3><p className="small">$149/mo · 15k runs · Jira + SSO</p></div>
        </div>
      </article>
    </section>
  );
}
