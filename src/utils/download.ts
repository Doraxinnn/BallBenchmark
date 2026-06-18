import { DatasetVideo } from '@/types/dataset';

export function downloadAnnotations(video: DatasetVideo): void {
  const annotationData = {
    videoId: video.id,
    sport: video.sport,
    durationSec: video.durationSec,
    segments: video.segments.map(s => ({
      label: s.label,
      start: s.start,
      end: s.end,
    })),
  };

  const blob = new Blob([JSON.stringify(annotationData, null, 2)], {
    type: 'application/json',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${video.id}_annotations.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
