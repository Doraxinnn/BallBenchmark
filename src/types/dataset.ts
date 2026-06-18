export type SegmentLabel = 'Hit' | 'Miss' | 'Irrelevant';

export interface Segment {
  id: string;
  label: SegmentLabel;
  start: number;
  end: number;
}

export interface DatasetVideo {
  id: string;
  sport: string;
  split: 'Train' | 'Validation' | 'Test';
  durationSec: number;
  previewImage: string;
  videoSrc: string;
  resolution: string;
  fps: number;
  segments: Segment[];
}

export interface FilterState {
  sport: string;
  segmentType: string;
  split: string;
  search: string;
}
