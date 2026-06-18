import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import VideoPlayerCard from '@/components/video/VideoPlayerCard';
import SegmentSummaryCard from '@/components/video/SegmentSummaryCard';
import TemporalTimeline from '@/components/video/TemporalTimeline';
import videos from '@/data/videos.json';
import { DatasetVideo } from '@/types/dataset';

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

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

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
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-heading">{video.id}</h1>
          <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
            {video.sport}
          </span>
        </div>
        <p className="text-muted text-sm">Duration: {formatDuration(video.durationSec)}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <VideoPlayerCard videoSrc={video.videoSrc} poster={video.previewImage} />
        </div>
        <div>
          <SegmentSummaryCard video={video} />
        </div>
      </div>

      <TemporalTimeline video={video} />
    </PageContainer>
  );
}
