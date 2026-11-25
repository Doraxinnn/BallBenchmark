import { useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import VideoCollectionDownload from '@/components/dataset/VideoCollectionDownload';
import SegmentSummaryCard from '@/components/video/SegmentSummaryCard';
import TemporalTimeline from '@/components/video/TemporalTimeline';
import SportBadge from '@/components/video/SportBadge';
import videos from '@/data/videos.json';
import { DatasetVideo } from '@/types/dataset';
import { getDisplayName, formatDuration, getCsvPath } from '@/utils/videoDisplay';

export default function VideoDetailPage() {
  const { videoId } = useParams<{ videoId: string }>();
  const video = (videos as DatasetVideo[]).find(v => v.id === videoId);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [videoId]);

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

      <div className="mb-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        <section className="rounded-card border border-border bg-card p-6 shadow-card lg:col-span-2" aria-labelledby="data-downloads-title">
          <h2 id="data-downloads-title" className="text-lg font-semibold text-heading">Downloads</h2>
          <p className="mt-1 text-sm text-body">
            Get the annotations for this video or open the complete video collection.
          </p>
          <div className="mt-4 flex flex-wrap items-start gap-3">
            <a
              href={getCsvPath(video)}
              download
              className="inline-flex items-center rounded-lg border border-primary bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Download annotation CSV
            </a>
            <VideoCollectionDownload compact />
          </div>
        </section>
        <SegmentSummaryCard video={video} />
      </div>

      <TemporalTimeline video={video} />
    </PageContainer>
  );
}