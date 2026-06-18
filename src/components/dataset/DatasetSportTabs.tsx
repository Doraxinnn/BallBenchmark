interface DatasetSportTabsProps {
  active: string;
  onChange: (sport: string) => void;
}

const sports = ['All Sports', 'Basketball', 'Billiards', 'Bowling'];

export default function DatasetSportTabs({ active, onChange }: DatasetSportTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
      {sports.map(sport => {
        const isActive = active === sport;
        return (
          <button
            key={sport}
            onClick={() => onChange(sport)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              isActive
                ? 'text-primary border-primary'
                : 'text-muted border-transparent hover:text-heading'
            }`}
          >
            {sport}
          </button>
        );
      })}
    </div>
  );
}