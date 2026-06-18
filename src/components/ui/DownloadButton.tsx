import { Download } from 'lucide-react';

interface DownloadButtonProps {
  onClick: () => void;
  label?: string;
}

export default function DownloadButton({ onClick, label = 'Download' }: DownloadButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      <Download className="w-4 h-4" />
      {label}
    </button>
  );
}
