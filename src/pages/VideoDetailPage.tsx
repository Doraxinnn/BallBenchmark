import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import VideoPlayerCard from '@/components/video/VideoPlayerCard';
import SegmentSummaryCard from '@/components/video/SegmentSummaryCard';
import TemporalTimeline from '@/components/video/TemporalTimeline';
import SportBadge from '@/components/video/SportBadge';
import videos from '@/data/videos.json';
import { DatasetVideo } from '@/types/dataset';
import { getDisplayName, formatDuration, getCsvPath } from '@/utils/videoDisplay';

export default function VideoDetailPage() {
  const { videoId } = useParams<{ videoId: string }>();
  const video = (videos as DatasetVideo[]).find(v => v.id === videoId);

  if (!video) {
    return (
      <PageContainer>
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold text-heading mb-2">Video Not Found</h2>
          <p className="text-muted mb-4">The requested video does not exist.</p>
          <Link to="/dataset" className="text-primary hover:underline">
            Back to Dataset
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mb-6">
        <Link
          to="/dataset"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dataset
        </Link>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <h1 className="text-2xl font-bold text-heading">{getDisplayName(video)}</h1>
          <SportBadge sport={video.sport} size="md" />
        </div>
        <p className="text-muted text-sm">
          {video.split} split
          {formatDuration(video.durationSec) && (
            <> · Duration {formatDuration(video.durationSec)}</>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <VideoPlayerCard videoSrc={video.videoSrc} csvHref={getCsvPath(video)} />
        </div>
        <div>
          <SegmentSummaryCard video={video} />
        </div>
      </div>

      <TemporalTimeline video={video} />
    </PageContainer>
  );
}