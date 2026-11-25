import { DatasetVideo } from '@/types/dataset';
import { formatDuration } from '@/utils/videoDisplay';
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
  const tickPositions = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="bg-card rounded-card shadow-card border border-border p-6">
      <h3 className="text-sm font-medium text-muted mb-4">Temporal Segments</h3>

      <div className="relative mb-2 ml-12 h-4 sm:ml-20">
        {tickPositions.map((position, index) => (
          <span
            key={position}
            className={`absolute whitespace-nowrap text-xs tabular-nums text-muted
              ${index % 2 === 1 ? 'hidden sm:inline' : ''}
              ${position === 1 ? '-translate-x-full' : position > 0 ? '-translate-x-1/2' : ''}`}
            style={{ left: `${position * 100}%` }}
          >
            {formatDuration(Math.round(durationSec * position)) ?? '0:00'}
          </span>
        ))}
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
