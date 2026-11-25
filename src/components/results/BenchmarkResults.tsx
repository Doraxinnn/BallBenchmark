import { useLayoutEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import data from '@/data/benchmarkResults.json';
import ScoreComparison, { type BenchmarkHarness, type ScoreRow } from './ScoreComparison';
import SportDiagnostics, { type DiagnosticScores, type OutcomeCounts } from './SportDiagnostics';
import './results.css';

export const benchmarkSports = ['Basketball', 'Billiards', 'Bowling'] as const;
export type BenchmarkSport = typeof benchmarkSports[number];
type ResultsScope = 'Overall' | BenchmarkSport;

interface BenchmarkData {
  systems: { id: string; name: string }[];
  harnesses: BenchmarkHarness[];
  scores: Record<ResultsScope, ScoreRow[]>;
  diagnostics: Partial<Record<BenchmarkSport, DiagnosticScores[]>>;
  outcomes: Partial<Record<BenchmarkSport, OutcomeCounts>>;
}

const { systems, harnesses, scores, diagnostics, outcomes }: BenchmarkData = data;
const systemOrder = [...scores.Overall]
  .sort((a, b) => Math.max(...b.values) - Math.max(...a.values))
  .map(row => row.system);
const peak = Math.max(...Object.values(scores).flatMap(rows => rows.flatMap(row => row.values)));
const chartStep = 20;
const chartScale = Math.max(chartStep, Math.ceil(peak / chartStep) * chartStep);

const sportDescriptions: Record<BenchmarkSport, string> = {
  Basketball: 'Codex + GPT improves across the three harnesses, with gains in both hit and miss F1.',
  Billiards: 'Billiards scores lowest in 11 of the 12 evaluated configurations. Temporal matching recall for Codex + GPT remains below 12 across all three harnesses.',
  Bowling: 'Codex + GPT scores highest with Basic Structured. Research-Augmented recovers some of the score lost under Rule-Guided.',
};

function getBest(scope: ResultsScope) {
  const candidates = scores[scope].flatMap(row => row.values.map((value, index) => ({
    value,
    system: systems.find(system => system.id === row.system)?.name ?? row.system,
    harness: harnesses[index].name,
  })));
  return candidates.reduce((best, candidate) => candidate.value > best.value ? candidate : best);
}

function ScoringNote({ scope }: { scope: ResultsScope }) {
  return (
    <details className="results-details">
      <summary>How scores are calculated</summary>
      <p className="results-caption mt-2 max-w-3xl">
        Predictions are matched one-to-one to annotated events at temporal intersection over union (tIoU) ≥ 0.5.
        The Overall Score gives equal weight to hit and miss F1. Scores are averaged over three runs per video,
        then equally across videos within each sport.
        {scope === 'Overall' && ' The benchmark score gives equal weight to all three sports.'}
      </p>
    </details>
  );
}

export default function BenchmarkResults({ sport }: { sport?: BenchmarkSport }) {
  const results = useRef<HTMLElement>(null);
  const { hash } = useLocation();

  useLayoutEffect(() => {
    if (sport && hash === '#benchmark-results') {
      results.current?.focus({ preventScroll: true });
      results.current?.scrollIntoView({ block: 'start' });
    }
  }, [hash, sport]);

  const scope = sport ?? 'Overall';
  const best = getBest(scope);
  const sportDiagnostics = sport && diagnostics[sport];
  const chartRows = [...scores[scope]].sort((a, b) => systemOrder.indexOf(a.system) - systemOrder.indexOf(b.system));

  return (
    <section ref={results} id="benchmark-results" tabIndex={-1} className="results-section scroll-mt-28" aria-labelledby="benchmark-results-title">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="benchmark-results-title" className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
            {sport ? `${sport} results` : 'Benchmark results'}
          </h2>
          <p className="mt-2 text-body">
            {sport ? 'Four agent–model combinations across three reference harnesses.' : 'Four agent–model combinations, three reference harnesses, and three independent runs per video and configuration.'}
          </p>
        </div>
        {sport && (
          <button
            type="button"
            className="results-text-link"
            onClick={() => {
              const videos = document.getElementById('sport-videos');
              videos?.focus({ preventScroll: true });
              videos?.scrollIntoView({ block: 'start' });
            }}
          >
            Browse videos
          </button>
        )}
      </div>

      <div className="results-feature">
        <ScoreComparison
          rows={chartRows}
          systems={systems}
          harnesses={harnesses}
          scale={chartScale}
          step={chartStep}
          source={`The workbook reproduces the scores in paper Table ${sport ? 3 : 2}.`}
        />
        <aside className="results-highlight" aria-label={`Best evaluated ${sport ?? 'overall'} score`}>
          <div>
            <p className="text-sm font-medium text-blue-200">Best {sport ? `${sport.toLowerCase()} score` : 'overall score'}</p>
            <p className="results-highlight-value">{best.value.toFixed(2)} <span>/ 100</span></p>
            <div className="results-highlight-track" aria-hidden="true"><span style={{ width: `${best.value}%` }} /></div>
            <p className="mt-5 font-semibold text-white">{best.system}</p>
            <p className="mt-1 text-sm text-blue-200">{best.harness}</p>
          </div>
          <p className="mt-6 border-t border-white/20 pt-4 text-sm leading-relaxed text-blue-50">
            {sport ? sportDescriptions[sport] : 'Codex + GPT leads under all three harnesses. Billiards scores lowest in 11 of the 12 evaluated configurations.'}
          </p>
        </aside>
      </div>
      <ScoringNote scope={scope} />

      {sport && sportDiagnostics && (
        <SportDiagnostics
          key={sport}
          harnesses={harnesses}
          diagnostics={sportDiagnostics}
          counts={outcomes[sport]}
          source={sport === 'Billiards' ? 'Calculated from the experiment workbook using the Table 4 averaging protocol.' : 'The workbook reproduces the diagnostics in paper Table 4.'}
          outcomesSource="Paper Table 5."
        />
      )}

      {!sport && (
        <div className="mt-7">
          <h3 className="text-lg font-bold text-heading">Best scores by sport</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {benchmarkSports.map(name => {
              const sportBest = getBest(name);
              return (
                <Link key={name} to={`/dataset?sport=${name}#benchmark-results`} className="results-sport-link">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span className="font-semibold text-heading">{name}</span>
                    <span className="text-xl font-bold tabular-nums text-heading">{sportBest.value.toFixed(2)}</span>
                  </div>
                  <div className="results-sport-track" aria-hidden="true"><span style={{ width: `${sportBest.value}%` }} /></div>
                  <span className="block text-sm text-body">{sportBest.system} · {sportBest.harness}</span>
                  <span className="results-text-link mt-2 inline-block">View results</span>
                </Link>
              );
            })}
          </div>
          <p className="results-caption mt-3">Best observed Overall Score out of 100 for each sport · Paper Table 3</p>
        </div>
      )}
    </section>
  );
}
