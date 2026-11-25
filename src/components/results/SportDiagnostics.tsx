import { useState } from 'react';
import { BenchmarkHarness, HarnessLegend, harnessColors } from './ScoreComparison';

export interface DiagnosticScores {
  hitF1: number;
  missF1: number;
  temporalRecall: number;
  nonEvent: number;
}

type Outcome = 'hit' | 'miss';
export type OutcomeCounts = Record<Outcome, number[][]>;

const metrics = [
  { key: 'hitF1', name: 'Hit F1', description: 'Event-level F1 for successful attempts.' },
  { key: 'missF1', name: 'Miss F1', description: 'Event-level F1 for unsuccessful attempts.' },
  { key: 'temporalRecall', name: 'Temporal recall', description: 'Share of annotated events with a temporal match.' },
  { key: 'nonEvent', name: 'Non-event score', description: 'Share of annotated background time left unpredicted.' },
] as const;

const outcomes = [
  { name: 'Correct match', color: '#0f766e' },
  { name: 'Wrong label', color: '#98420f' },
  { name: 'No overlap', color: '#52647e' },
  { name: '0 < tIoU < 0.5', color: '#7850b8' },
];

interface SportDiagnosticsProps {
  harnesses: BenchmarkHarness[];
  diagnostics: DiagnosticScores[];
  counts?: OutcomeCounts;
  source: string;
  outcomesSource: string;
}

function EventOutcomes({ counts, harnesses, source }: { counts: OutcomeCounts; harnesses: BenchmarkHarness[]; source: string }) {
  const [outcome, setOutcome] = useState<Outcome>('hit');
  const rows = counts[outcome];
  const total = rows[0].reduce((sum, count) => sum + count, 0);

  return (
    <figure className="results-card min-w-0">
      <figcaption className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h4 className="results-chart-title">What happened to annotated events?</h4>
          <p className="results-caption" aria-live="polite">
            {total.toLocaleString('en-US')} {outcome} observations per harness across three runs
          </p>
        </div>
        <div className="results-toggle" role="group" aria-label="Ground-truth outcome">
          {(['hit', 'miss'] as const).map(label => (
            <button key={label} type="button" aria-pressed={outcome === label} onClick={() => setOutcome(label)}>
              {label === 'hit' ? 'Hit' : 'Miss'}
            </button>
          ))}
        </div>
      </figcaption>

      <ul className="results-legend" aria-label="Ground-truth event outcomes">
        {outcomes.map(({ name, color }) => (
          <li key={name}>
            <span aria-hidden="true" style={{ backgroundColor: color }} />{name}
          </li>
        ))}
      </ul>
      <ul className="mt-5 space-y-3" aria-label={`Outcome breakdown for ground-truth ${outcome} events`}>
        {rows.map((row, index) => (
          <li className="results-outcome-row" key={harnesses[index].id}>
            <span className="text-sm font-medium text-heading">{harnesses[index].name}</span>
            <div className="results-outcome-bar">
              {row.map((count, category) => {
                const share = count / total * 100;
                return (
                  <div
                    className="results-outcome-segment"
                    key={outcomes[category].name}
                    title={`${outcomes[category].name}: ${count} (${share.toFixed(1)}%)`}
                    style={{ width: `${share}%`, backgroundColor: outcomes[category].color }}
                  >
                    <span className="sr-only">{outcomes[category].name}: {count} ({share.toFixed(1)}%) </span>
                    {share >= 15 && <span aria-hidden="true">{Math.round(share)}%</span>}
                  </div>
                );
              })}
            </div>
          </li>
        ))}
      </ul>

      <details className="results-details">
        <summary>View exact counts</summary>
        <div className="mt-3 overflow-x-auto">
          <table className="results-table">
            <caption className="sr-only">Ground-truth {outcome} event observations by harness</caption>
            <thead>
              <tr>
                <th scope="col">Harness</th>
                {outcomes.map(({ name }) => <th scope="col" key={name}>{name}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={harnesses[index].id}>
                  <th scope="row">{harnesses[index].name}</th>
                  {row.map((count, category) => <td key={outcomes[category].name}>{count.toLocaleString('en-US')}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      <p className="results-caption mt-3">
        Wrong labels follow a temporal match. Unmatched events are grouped by their highest temporal intersection
        over union (tIoU) with any prediction. Each annotated event contributes once per run, so videos with
        more events carry more weight. {source}
      </p>
    </figure>
  );
}

export default function SportDiagnostics({ harnesses, diagnostics, counts, source, outcomesSource }: SportDiagnosticsProps) {
  return (
    <section className="mt-8 space-y-4" aria-labelledby="sport-diagnostics-title">
      <div>
        <h3 id="sport-diagnostics-title" className="text-xl font-bold text-heading">Codex + GPT diagnostics</h3>
        <p className="mt-1 text-sm text-body">Compare outcome recognition, temporal coverage, and background exclusion.</p>
      </div>
      <figure className="results-card">
        <figcaption>
          <h4 className="results-chart-title">Performance by metric</h4>
          <p className="results-caption">All metrics use a 0–100 scale. Videos contribute equally within the sport.</p>
        </figcaption>
        <HarnessLegend harnesses={harnesses} />
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {metrics.map(({ key, name, description }) => (
            <div className="results-metric" key={key}>
              <h5 className="text-sm font-semibold leading-tight text-heading">{name}</h5>
              <ul className="space-y-1.5" aria-label={name}>
                {diagnostics.map((row, index) => (
                  <li className="results-metric-row" key={harnesses[index].id}>
                    <span className="sr-only">{harnesses[index].name} </span>
                    <div aria-hidden="true" className="results-metric-track">
                      <span style={{ width: `${row[key]}%`, backgroundColor: harnessColors[index] }} />
                    </div>
                    <span>{row[key].toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs leading-relaxed text-muted">{description}</p>
            </div>
          ))}
        </div>
        <p className="results-caption mt-4">
          Hit and miss F1 contribute equally to the Overall Score. Read non-event score alongside temporal recall,
          since sparse predictions can leave most background untouched. {source}
        </p>
      </figure>
      {counts && <EventOutcomes counts={counts} harnesses={harnesses} source={outcomesSource} />}
    </section>
  );
}
