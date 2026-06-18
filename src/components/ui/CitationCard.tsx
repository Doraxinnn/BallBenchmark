interface CitationCardProps {
  title: string;
  authors: string;
  year: number;
}

export default function CitationCard({ title, authors, year }: CitationCardProps) {
  return (
    <div className="bg-card rounded-card shadow-card border border-border p-6">
      <h3 className="text-sm font-medium text-muted mb-3">Citation</h3>
      <p className="text-heading font-medium mb-1">{title}</p>
      <p className="text-body text-sm mb-1">{authors}</p>
      <p className="text-muted text-sm">{year}</p>
    </div>
  );
}
