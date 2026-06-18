import { ReactNode } from 'react';

interface SportBadgeProps {
  sport: string;
  size?: 'sm' | 'md';
  children?: ReactNode;
}

const sportColors: Record<string, { bg: string; text: string; dot: string }> = {
  Basketball: { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  Billiards: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  Bowling: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
};

export default function SportBadge({ sport, size = 'sm', children }: SportBadgeProps) {
  const colors = sportColors[sport] ?? { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' };
  const sizeClass = size === 'md' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 ${colors.bg} ${colors.text} ${sizeClass} rounded-full font-medium`}>
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
      {children ?? sport}
    </span>
  );
}