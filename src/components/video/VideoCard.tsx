import { Link } from 'react-router-dom';
import { DatasetVideo } from '@/types/dataset';
import SportBadge from './SportBadge';
import { formatDuration, getDisplayName } from '@/utils/videoDisplay';

interface VideoCardProps {
  video: DatasetVideo;
}

export default function VideoCard({ video }: VideoCardProps) {
  const duration = formatDuration(video.durationSec);

  return (
    <Link
      to={`/dataset/${video.id}`}
      className="group block rounded-card border border-border bg-card p-5 shadow-card transition-colors hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <SportBadge sport={video.sport} />
        {duration && <span className="text-sm tabular-nums text-muted">{duration}</span>}
      </div>
      <h3 className="mb-2 font-semibold text-heading">{getDisplayName(video)}</h3>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-muted">{video.segments.length} annotated segments</span>
        <span className="font-medium text-primary group-hover:underline">View annotations</span>
      </div>
    </Link>
  );
}
