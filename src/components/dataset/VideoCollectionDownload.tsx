import { Download } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

interface VideoCollectionDownloadProps {
  compact?: boolean;
}

export default function VideoCollectionDownload({ compact = false }: VideoCollectionDownloadProps) {
  const { shareUrl, accessCode } = siteConfig.videoCollection;
  const { totalVideos } = siteConfig.stats;
  const actionStyle = compact
    ? 'border border-border bg-card text-primary hover:bg-blue-50'
    : 'bg-primary text-white hover:bg-primary-dark';

  const action = (
    <a
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${actionStyle}`}
    >
      <Download aria-hidden="true" className="h-4 w-4" />
      {compact ? `Open all ${totalVideos} videos` : `Download all ${totalVideos} videos`}
    </a>
  );

  const code = (
    <span className="text-xs text-muted">
      Access code <code className="rounded bg-blue-50 px-1.5 py-0.5 font-semibold text-heading">{accessCode}</code>
    </span>
  );

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {action}
        {code}
      </div>
    );
  }

  return (
    <section className="flex flex-wrap items-center justify-between gap-4 rounded-card border border-blue-200 bg-blue-50/60 px-5 py-4">
      <div>
        <h2 className="text-base font-semibold text-heading">Video collection</h2>
        <p className="mt-1 text-sm text-body">Redacted videos on Baidu Netdisk.</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {action}
        {code}
      </div>
    </section>
  );
}
