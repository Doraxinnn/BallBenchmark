import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { DatasetVideo } from '@/types/dataset';
import SportBadge from './SportBadge';
import { getDisplayName, formatDuration } from '@/utils/videoDisplay';

interface VideoCardProps {
  video: DatasetVideo;
}

export default function VideoCard({ video }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const displayName = getDisplayName(video);

  const handleEnter = () => {
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {});
    }
  };

  const handleLeave = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <Link
      to={`/dataset/${video.id}`}
      className="group block bg-card rounded-card-lg shadow-card border border-border overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="relative aspect-video bg-gray-900 overflow-hidden">
        <video
          ref={videoRef}
          src={video.videoSrc}
          muted
          playsInline
          loop
          preload="none"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-0 transition-opacity pointer-events-none">
          <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
            <Play className="w-6 h-6 text-white fill-white" />
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <SportBadge sport={video.sport} />
          <span className="text-xs text-muted">{formatDuration(video.durationSec)}</span>
        </div>
        <h3 className="text-heading font-semibold mb-1">{displayName}</h3>
        <p className="text-sm text-muted">
          {video.segments.length > 0
            ? `${video.segments.length} segments`
            : 'No annotations yet'}
        </p>
      </div>
    </Link>
  );
}