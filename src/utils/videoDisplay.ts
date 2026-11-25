import { DatasetVideo } from '@/types/dataset';

export function getDisplayName(video: DatasetVideo): string {
  return `${video.sport} ${video.sportIndex}`;
}

export function getCsvPath(video: DatasetVideo): string {
  const sport = video.sport.toLowerCase();
  return `${import.meta.env.BASE_URL}csv/${sport}/${sport}${video.sportIndex}.csv`;
}

export function formatDuration(sec: number): string | null {
  if (!sec || sec <= 0) return null;
  const mins = Math.floor(sec / 60);
  const secs = sec % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}