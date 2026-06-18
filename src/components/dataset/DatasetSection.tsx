import { DatasetVideo } from '@/types/dataset';
import VideoCard from '@/components/video/VideoCard';
import SportBadge from '@/components/video/SportBadge';

interface DatasetSectionProps {
  sport: 'Basketball' | 'Billiards' | 'Bowling';
  videos: DatasetVideo[];
}

export default function DatasetSection({ sport, videos }: DatasetSectionProps) {
  if (videos.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-heading">{sport}</h2>
        <SportBadge sport={sport} size="md">
          {videos.length} video{videos.length === 1 ? '' : 's'}
        </SportBadge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}