import { DatasetVideo } from '@/types/dataset';

export function getDisplayName(video: DatasetVideo): string {
  const m = video.videoSrc.match(/\/([a-z]+)_(\d+)\.mp4/);
  if (!m) return video.sport;
  const sport = m[1][0].toUpperCase() + m[1].slice(1);
  return `${sport} ${m[2]}`;
}

export function getSportNumber(video: DatasetVideo): number {
  const m = video.videoSrc.match(/_(\d+)\.mp4/);
  return m ? parseInt(m[1], 10) : 0;
}

export function getCsvPath(video: DatasetVideo): string {
  const m = video.videoSrc.match(/\/([a-z]+)_(\d+)\.mp4/);
  if (!m) return '';
  return `/csv/${m[1]}/${m[1]}${m[2]}.csv`;
}

export function formatDuration(sec: number): string | null {
  if (!sec || sec <= 0) return null;
  const mins = Math.floor(sec / 60);
  const secs = sec % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}