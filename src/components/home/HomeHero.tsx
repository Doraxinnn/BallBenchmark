import { Link } from 'react-router-dom';
import { ArrowRight, CircleDot, Circle, Target, Activity } from 'lucide-react';
import videos from '@/data/videos.json';
import { DatasetVideo } from '@/types/dataset';
import { siteConfig } from '@/data/siteConfig';

interface SportEntry {
  sport: 'Basketball' | 'Billiards' | 'Bowling';
  icon: typeof CircleDot;
  description: string;
}

const sportEntries: SportEntry[] = [
  { sport: 'Basketball', icon: CircleDot, description: 'Court play, scoring actions' },
  { sport: 'Billiards', icon: Target, description: 'Cue sports precision shots' },
  { sport: 'Bowling', icon: Circle, description: 'Lane play and pin outcomes' },
];

export default function HomeHero() {
  const videoCounts = (videos as DatasetVideo[]).reduce<Record<string, number>>((acc, v) => {
    acc[v.sport] = (acc[v.sport] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <section className="mb-16">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4">
          <Activity className="w-3.5 h-3.5" />
          Ball Sports Video Benchmark
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-heading mb-4">
          {siteConfig.fullName}
        </h1>
        <p className="text-lg text-body mb-6 max-w-2xl">{siteConfig.description}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/dataset"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
          >
            Browse Dataset
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/statistics"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-heading font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            View Statistics
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sportEntries.map(({ sport, icon: Icon, description }) => (
          <Link
            key={sport}
            to={`/dataset?sport=${sport}`}
            className="group relative bg-card rounded-card-lg border border-border p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <ArrowRight className="w-4 h-4 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-heading font-semibold text-lg mb-1">{sport}</h3>
            <p className="text-sm text-muted mb-3">{description}</p>
            <p className="text-xs text-muted">
              {videoCounts[sport] ?? 0} video{(videoCounts[sport] ?? 0) === 1 ? '' : 's'}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}