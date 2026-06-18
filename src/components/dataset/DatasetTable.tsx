import { Link } from 'react-router-dom';
import { DatasetVideo } from '@/types/dataset';
import { Eye } from 'lucide-react';

interface DatasetTableProps {
  videos: DatasetVideo[];
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function DatasetTable({ videos, currentPage, pageSize, onPageChange }: DatasetTableProps) {
  const totalPages = Math.ceil(videos.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedVideos = videos.slice(startIndex, endIndex);

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="bg-card rounded-card shadow-card border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase">Video ID</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase">Preview</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase">Sport</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase">Duration</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase"># Segments</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedVideos.map(video => (
              <tr key={video.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-heading">{video.id}</td>
                <td className="px-4 py-3">
                  <div className="w-16 h-10 bg-gray-100 rounded overflow-hidden">
                    <img
                      src={video.previewImage}
                      alt={video.id}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-body">{video.sport}</td>
                <td className="px-4 py-3 text-sm text-body">{formatDuration(video.durationSec)}</td>
                <td className="px-4 py-3 text-sm text-body">{video.segments.length}</td>
                <td className="px-4 py-3">
                  <Link
                    to={`/dataset/${video.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 border-t border-border flex items-center justify-between">
        <p className="text-sm text-muted">
          Showing {startIndex + 1}-{Math.min(endIndex, videos.length)} of {videos.length}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-sm font-medium text-body border border-border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-muted">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-sm font-medium text-body border border-border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
