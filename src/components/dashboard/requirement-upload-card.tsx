import { FormEvent } from "react";

type Props = {
  prdInput: string;
  onPrdChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  busy: boolean;
  message?: string;
};

export function RequirementUploadCard({ prdInput, onPrdChange, onSubmit, busy, message }: Props) {
  return (
    <article className="card">
      <h2>Upload PRD / Story</h2>
      <p className="small">Paste user story text to generate requirement-linked tests.</p>
      <form onSubmit={onSubmit} className="stack">
        <textarea
          className="input"
          rows={4}
          placeholder="As a user, I want to reset my password securely so that my account stays protected..."
          value={prdInput}
          onChange={(e: { target: { value: string } }) => onPrdChange(e.target.value)}
        />
        <button className="button" disabled={busy} type="submit">
          {busy ? "Ingesting..." : "Ingest PRD"}
        </button>
      </form>
      {message ? <p className="small">{message}</p> : null}
    </article>
  );
}
