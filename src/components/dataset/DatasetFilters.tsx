import { FilterState } from '@/types/dataset';

interface DatasetFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const sports = ['All Sports', 'Basketball', 'Bowling', 'Billiards'];
const segmentTypes = ['All Types', 'Hit', 'Miss', 'Irrelevant'];
const splits = ['All Splits', 'Train', 'Validation', 'Test'];

export default function DatasetFilters({ filters, onChange }: DatasetFiltersProps) {
  return (
    <div className="bg-card rounded-card shadow-card border border-border p-4 mb-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted">Sport</label>
          <select
            value={filters.sport}
            onChange={(e) => onChange({ ...filters, sport: e.target.value })}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {sports.map(sport => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted">Segment Type</label>
          <select
            value={filters.segmentType}
            onChange={(e) => onChange({ ...filters, segmentType: e.target.value })}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {segmentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted">Split</label>
          <select
            value={filters.split}
            onChange={(e) => onChange({ ...filters, split: e.target.value })}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {splits.map(split => (
              <option key={split} value={split}>{split}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xs text-muted">Search</label>
          <input
            type="text"
            placeholder="Search videos..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
}
