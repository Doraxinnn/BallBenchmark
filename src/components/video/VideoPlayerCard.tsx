interface VideoPlayerCardProps {
  videoSrc: string;
  poster?: string;
}

export default function VideoPlayerCard({ videoSrc, poster }: VideoPlayerCardProps) {
  return (
    <div className="bg-card rounded-card shadow-card border border-border overflow-hidden">
      <div className="aspect-video bg-gray-900 relative">
        <video
          controls
          className="w-full h-full"
          poster={poster}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
