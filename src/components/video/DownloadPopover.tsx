import { useState, useRef, useEffect } from 'react';
import { Download, ChevronDown } from 'lucide-react';

interface DownloadPopoverProps {
  videoSrc: string;
  videoFilename: string;
  csvHref: string;
  csvFilename: string;
}

export default function DownloadPopover({
  videoSrc, videoFilename, csvHref, csvFilename,
}: DownloadPopoverProps) {
  const [open, setOpen] = useState(false);
  const [includeVideo, setIncludeVideo] = useState(true);
  const [includeCsv, setIncludeCsv] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function triggerDownload(href: string, filename: string) {
    const a = document.createElement('a');
    a.href = href;
    a.download = filename;
    a.target = '_blank';
    a.rel = 'noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function handleDownload() {
    if (includeVideo) triggerDownload(videoSrc, videoFilename);
    if (includeCsv) {
      const delay = includeVideo ? 250 : 0;
      setTimeout(() => triggerDownload(csvHref, csvFilename), delay);
    }
    setOpen(false);
  }

  return (
    <div ref={ref} className="absolute top-3 right-3">
      <button
        onClick={() => setOpen(o => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/60 hover:bg-black/80 text-white text-xs font-medium rounded-md backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        <Download className="w-3.5 h-3.5" />
        Download
        <ChevronDown className="w-3 h-3" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Download options"
          className="absolute top-full right-0 mt-2 w-60 bg-card border border-border rounded-lg shadow-lg p-3 z-10 text-left"
        >
          <p className="text-xs font-medium text-muted mb-2">Include:</p>
          <label className="flex items-center gap-2 py-1.5 px-1 cursor-pointer hover:bg-background rounded">
            <input
              type="checkbox"
              checked={includeVideo}
              onChange={e => setIncludeVideo(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-body">Video file (.mp4)</span>
          </label>
          <label className="flex items-center gap-2 py-1.5 px-1 cursor-pointer hover:bg-background rounded">
            <input
              type="checkbox"
              checked={includeCsv}
              onChange={e => setIncludeCsv(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-body">CSV annotations (.csv)</span>
          </label>
          <button
            onClick={handleDownload}
            disabled={!includeVideo && !includeCsv}
            className="w-full mt-3 px-3 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
}
