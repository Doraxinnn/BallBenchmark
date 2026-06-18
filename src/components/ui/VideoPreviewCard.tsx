import { Link } from 'react-router-dom';
import { DatasetVideo } from '@/types/dataset';

interface VideoPreviewCardProps {
  video: DatasetVideo;
}

export default function VideoPreviewCard({ video }: VideoPreviewCardProps) {
  return (
    <Link
      to={`/dataset/${video.id}`}
      className="block bg-card rounded-card shadow-card border border-border overflow-hidden hover:shadow-card-hover transition-shadow"
    >
      <div className="aspect-video bg-gray-100 relative">
        <img
          src={video.previewImage}
          alt={video.id}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
      <div className="p-4">
        <p className="font-medium text-heading">{video.id}</p>
        <p className="text-sm text-muted">{video.sport}</p>
        <p className="text-xs text-muted mt-1">
          {Math.floor(video.durationSec / 60)}:{String(video.durationSec % 60).padStart(2, '0')} • {video.segments.length} segments
        </p>
      </div>
    </Link>
  );
}
