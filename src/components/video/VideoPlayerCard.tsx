import DownloadPopover from './DownloadPopover';

interface VideoPlayerCardProps {
  videoSrc: string;
  csvHref: string;
  poster?: string;
}

export default function VideoPlayerCard({ videoSrc, csvHref, poster }: VideoPlayerCardProps) {
  const videoFilename = videoSrc.split('/').pop() || 'video.mp4';
  const csvFilename = csvHref.split('/').pop() || 'annotations.csv';

  return (
    <div className="bg-card rounded-card shadow-card border border-border overflow-hidden">
      <div className="aspect-video bg-gray-900 relative group">
        <video
          controls
          className="w-full h-full"
          poster={poster}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
          <DownloadPopover
            videoSrc={videoSrc}
            videoFilename={videoFilename}
            csvHref={csvHref}
            csvFilename={csvFilename}
          />
        </div>
      </div>
    </div>
  );
}
