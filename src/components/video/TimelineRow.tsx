import { useState } from 'react';
import { SegmentLabel, Segment } from '@/types/dataset';

interface TimelineRowProps {
  label: SegmentLabel;
  segments: Segment[];
  durationSec: number;
  color: string;
}

export default function TimelineRow({ label, segments, durationSec, color }: TimelineRowProps) {
  const [hoveredSegment, setHoveredSegment] = useState<Segment | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const filteredSegments = segments.filter(s => s.label === label);

  const handleMouseEnter = (segment: Segment, e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
    setHoveredSegment(segment);
  };

  const handleMouseLeave = () => {
    setHoveredSegment(null);
  };

  return (
    <div className="relative">
      <div className="flex items-center h-8">
        <div className="w-20 text-xs text-muted font-medium">{label}</div>
        <div className="flex-1 relative h-6 bg-gray-100 rounded">
          {filteredSegments.map(segment => (
            <div
              key={segment.id}
              className={`absolute top-1 h-4 rounded-sm ${color} cursor-pointer transition-opacity hover:opacity-80`}
              style={{
                left: `${(segment.start / durationSec) * 100}%`,
                width: `${((segment.end - segment.start) / durationSec) * 100}%`,
              }}
              onMouseEnter={(e) => handleMouseEnter(segment, e)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
      </div>

      {hoveredSegment && (
        <div
          className="fixed z-50 bg-heading text-white text-xs px-3 py-2 rounded-lg shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <p className="font-medium">{hoveredSegment.label}</p>
          <p>Start: {hoveredSegment.start.toFixed(2)}s</p>
          <p>End: {hoveredSegment.end.toFixed(2)}s</p>
          <p>Duration: {(hoveredSegment.end - hoveredSegment.start).toFixed(2)}s</p>
        </div>
      )}
    </div>
  );
}
