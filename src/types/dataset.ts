export type SegmentLabel = 'Hit' | 'Miss';

export interface Segment {
  id: string;
  label: SegmentLabel;
  start: number;
  end: number;
}

export interface DatasetVideo {
  id: string;
  sport: string;
  sportIndex: number;
  split: 'Train' | 'Validation' | 'Test';
  durationSec: number;
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
