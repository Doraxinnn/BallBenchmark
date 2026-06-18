import { DatasetVideo, SegmentLabel } from '@/types/dataset';
import DownloadButton from '@/components/ui/DownloadButton';
import { downloadAnnotations } from '@/utils/download';

interface SegmentSummaryCardProps {
  video: DatasetVideo;
}

const labelColors: Record<SegmentLabel, { bg: string; text: string; label: string }> = {
  Hit: { bg: 'bg-hit/10', text: 'text-hit', label: 'Hit' },
  Miss: { bg: 'bg-miss/10', text: 'text-miss', label: 'Miss' },
  Irrelevant: { bg: 'bg-irrelevant/10', text: 'text-irrelevant', label: 'Irrelevant' },
};

export default function SegmentSummaryCard({ video }: SegmentSummaryCardProps) {
  const counts: Record<SegmentLabel, number> = {
    Hit: 0,
    Miss: 0,
    Irrelevant: 0,
  };

  video.segments.forEach(s => {
    counts[s.label]++;
  });

  return (
    <div className="bg-card rounded-card shadow-card border border-border p-6">
      <h3 className="text-sm font-medium text-muted mb-4">Segments Summary</h3>

      <div className="space-y-3 mb-6">
        {(Object.keys(labelColors) as SegmentLabel[]).map(label => (
          <div key={label} className="flex items-center justify-between">
            <span className={`text-sm ${labelColors[label].text} font-medium`}>
              {labelColors[label].label}
            </span>
            <span className="text-heading font-semibold">{counts[label]}</span>
          </div>
        ))}
      </div>

      <DownloadButton onClick={() => downloadAnnotations(video)} label="Download Annotations (.json)" />
    </div>
  );
}
