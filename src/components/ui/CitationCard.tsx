interface CitationCardProps {
  title: string;
  authors: string;
  year: number;
  publisher?: string;
  doi?: string;
  license?: string;
  licenseUrl?: string;
  licenseName?: string;
}

export default function CitationCard({
  title,
  authors,
  year,
  publisher,
  doi,
  license,
  licenseUrl,
  licenseName,
}: CitationCardProps) {
  return (
    <div className="bg-card rounded-card shadow-card border border-border p-6">
      <h3 className="text-sm font-medium text-muted mb-3">Citation</h3>
      <p className="text-heading font-medium mb-2">{title}</p>
      <p className="text-body text-sm mb-1">{authors}</p>
      <p className="text-muted text-sm mb-3">
        {publisher ? `${publisher}, ` : ''}{year}
      </p>

      {doi && (
        <p className="text-sm mb-2">
          <span className="text-muted">DOI: </span>
          <span className="text-body break-all">{doi}</span>
        </p>
      )}

      {license && licenseUrl && (
        <p className="text-sm">
          <span className="text-muted">License: </span>
          <a
            href={licenseUrl}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            {license}
          </a>
          {licenseName && licenseName !== license && (
            <span className="text-muted"> — {licenseName}</span>
          )}
        </p>
      )}
    </div>
  );
}