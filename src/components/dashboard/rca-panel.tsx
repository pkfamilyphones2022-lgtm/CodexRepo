import { RcaItem } from "@/types/domain";

type Props = {
  item?: RcaItem;
};

export function RcaPanel({ item }: Props) {
  return (
    <article className="card">
      <h2>Explain-Everything RCA</h2>
      {!item ? (
        <p className="small">Choose a test row and click “View” to inspect root-cause analysis.</p>
      ) : (
        <>
          <p className="small"><strong>Failure:</strong> {item.failure}</p>
          <p className="small"><strong>Likely root cause:</strong> {item.rootCause}</p>
          <p className="small"><strong>Evidence:</strong> {item.evidence}</p>
          <p className="small"><strong>Next action:</strong> {item.nextAction}</p>
          <p className="small"><strong>Confidence:</strong> {item.confidence}</p>
        </>
      )}
    </article>
  );
}
