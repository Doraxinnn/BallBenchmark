export interface BenchmarkHarness {
  id: string;
  name: string;
}

export interface ScoreRow {
  system: string;
  values: number[];
}

export const harnessColors = ['#4777a5', '#0f766e', '#673ac0'];

export function HarnessLegend({ harnesses }: { harnesses: BenchmarkHarness[] }) {
  return (
    <ul className="results-legend" aria-label="Reference harness configurations">
      {harnesses.map((harness, index) => (
        <li key={harness.id}>
          <span aria-hidden="true" style={{ backgroundColor: harnessColors[index] }} />
          {harness.name}
        </li>
      ))}
    </ul>
  );
}

interface ScoreComparisonProps {
  rows: ScoreRow[];
  systems: { id: string; name: string }[];
  harnesses: BenchmarkHarness[];
  scale: number;
  step: number;
  source: string;
}

export default function ScoreComparison({ rows, systems, harnesses, scale, step, source }: ScoreComparisonProps) {
  const ticks = Array.from({ length: scale / step + 1 }, (_, index) => index * step);

  return (
    <figure className="results-card min-w-0">
      <figcaption>
        <h3 className="results-chart-title">Scores by agent–model and harness</h3>
        <p className="results-caption">Overall Score out of 100 · Axis shown from 0 to {scale}</p>
      </figcaption>
      <HarnessLegend harnesses={harnesses} />
      <div className="mt-5">
        <div className="results-score-row results-axis-row" aria-hidden="true">
          <div className="results-axis">
            {ticks.map(tick => <span key={tick} style={{ left: `${tick / scale * 100}%` }}>{tick}</span>)}
          </div>
        </div>
        <ul className="results-score-list" aria-label="Benchmark scores for all evaluated configurations">
          {rows.map(row => (
            <li key={row.system} className="results-score-row">
              <span className="text-sm font-semibold leading-snug text-heading">
                {systems.find(system => system.id === row.system)?.name ?? row.system}
              </span>
              <div
                className="results-bar-group"
                style={{ backgroundSize: `${step / scale * 100}% 100%` }}
              >
                {row.values.map((value, index) => (
                  <div className="results-bar-row" key={harnesses[index].id}>
                    <span className="sr-only">{harnesses[index].name} </span>
                    <span
                      aria-hidden="true"
                      className="results-bar"
                      style={{ width: `${value / scale * 100}%`, backgroundColor: harnessColors[index] }}
                    />
                    <span className="results-bar-value">{value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <p className="results-caption mt-4">{source}</p>
    </figure>
  );
}
