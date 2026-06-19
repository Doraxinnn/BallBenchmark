import { DatasetVideo, SegmentLabel } from '@/types/dataset';

export function getTotalSegments(videos: DatasetVideo[]): number {
  return videos.reduce((acc, video) => acc + video.segments.length, 0);
}

export function getSegmentsByLabel(videos: DatasetVideo[]): Record<SegmentLabel, number> {
  const counts: Record<SegmentLabel, number> = {
    Hit: 0,
    Miss: 0,
  };

  videos.forEach(video => {
    video.segments.forEach(segment => {
      counts[segment.label]++;
    });
  });

  return counts;
}

export function getVideosBySport(videos: DatasetVideo[]): Record<string, number> {
  const counts: Record<string, number> = {};

  videos.forEach(video => {
    counts[video.sport] = (counts[video.sport] || 0) + 1;
  });

  return counts;
}
