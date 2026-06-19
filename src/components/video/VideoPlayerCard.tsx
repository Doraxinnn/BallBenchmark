import { Download } from 'lucide-react';

interface VideoPlayerCardProps {
  videoSrc: string;
  poster?: string;
}

export default function VideoPlayerCard({ videoSrc, poster }: VideoPlayerCardProps) {
  const filename = videoSrc.split('/').pop() || 'video.mp4';

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

        <a
          href={videoSrc}
          download={filename}
          target="_blank"
          rel="noreferrer"
          aria-label="Download video"
          className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/60 hover:bg-black/80 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm focus-visible:opacity-100"
        >
          <Download className="w-3.5 h-3.5" />
          Download
        </a>
      </div>
    </div>
  );
}