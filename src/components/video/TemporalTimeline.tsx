import { DatasetVideo } from '@/types/dataset';
import TimelineRow from './TimelineRow';

interface TemporalTimelineProps {
  video: DatasetVideo;
}

const labelColors = {
  Hit: 'bg-hit',
  Miss: 'bg-miss',
};

export default function TemporalTimeline({ video }: TemporalTimelineProps) {
  const durationSec = video.durationSec;
  const maxTick = Math.ceil(durationSec / 5) * 5;
  const ticks = [];
  for (let t = 0; t <= maxTick; t += 5) {
    ticks.push(t);
  }

  return (
    <div className="bg-card rounded-card shadow-card border border-border p-6">
      <h3 className="text-sm font-medium text-muted mb-4">Temporal Segments</h3>

      <div className="mb-2">
        <div className="flex items-center ml-20">
          {ticks.map(tick => (
            <div
              key={tick}
              className="flex-1 text-xs text-muted"
              style={{ maxWidth: `${100 / (ticks.length - 1)}%` }}
            >
              {String(Math.floor(tick / 60)).padStart(2, '0')}:{String(tick % 60).padStart(2, '0')}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {(['Hit', 'Miss'] as const).map(label => (
          <TimelineRow
            key={label}
            label={label}
            segments={video.segments}
            durationSec={durationSec}
            color={labelColors[label]}
          />
        ))}
      </div>
    </div>
  );
}
