import { DatasetVideo, SegmentLabel } from '@/types/dataset';

export function getTotalSegments(videos: DatasetVideo[]): number {
  return videos.reduce((acc, video) => acc + video.segments.length, 0);
}

export function getSegmentsByLabel(videos: DatasetVideo[]): Record<SegmentLabel, number> {
  const counts: Record<SegmentLabel, number> = {
    Hit: 0,
    Miss: 0,
    Irrelevant: 0,
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

export function getSegmentsByTimeInterval(
  videos: DatasetVideo[],
  intervalSec: number = 5
): { time: number; count: number }[] {
  const maxDuration = Math.max(...videos.map(v => v.durationSec));
  const intervals: { time: number; count: number }[] = [];

  for (let t = 0; t < maxDuration; t += intervalSec) {
    let count = 0;
    videos.forEach(video => {
      video.segments.forEach(segment => {
        if (segment.start < t + intervalSec && segment.end > t) {
          count++;
        }
      });
    });
    intervals.push({ time: t, count });
  }

  return intervals;
}
