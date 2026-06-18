import { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function ChartCard({ title, children, className = '' }: ChartCardProps) {
  return (
    <div className={`bg-card rounded-card shadow-card border border-border p-6 ${className}`}>
      <h3 className="text-sm font-medium text-muted mb-4">{title}</h3>
      <div className="h-64">
        {children}
      </div>
    </div>
  );
}
