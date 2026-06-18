interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
}

export default function StatCard({ label, value, sublabel }: StatCardProps) {
  return (
    <div className="bg-card rounded-card shadow-card p-6 border border-border">
      <p className="text-muted text-sm mb-1">{label}</p>
      <p className="text-heading text-2xl font-semibold">{value}</p>
      {sublabel && <p className="text-muted text-xs mt-1">{sublabel}</p>}
    </div>
  );
}
