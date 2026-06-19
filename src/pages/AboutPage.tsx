import PageContainer from '@/components/layout/PageContainer';
import CitationCard from '@/components/ui/CitationCard';
import { ExternalLink, Shield } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export default function AboutPage() {
  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-heading mb-2">About {siteConfig.name}</h1>
        <p className="text-muted">{siteConfig.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-card rounded-card shadow-card border border-border p-6">
            <h2 className="text-lg font-semibold text-heading mb-3">Annotation</h2>
            <p className="text-body">
              All segments are annotated by human annotators.
            </p>
          </div>

          <div className="bg-card rounded-card shadow-card border border-border p-6">
            <h2 className="text-lg font-semibold text-heading mb-3">Segment Types</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-hit" />
                <span className="text-body"><strong>Hit:</strong> successful actions.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-miss" />
                <span className="text-body"><strong>Miss:</strong> failed actions.</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-card shadow-card border border-border p-6">
            <h2 className="text-lg font-semibold text-heading mb-3">Format</h2>
            <p className="text-body">
              Annotations are provided in JSON format.
            </p>
          </div>

          <div className="bg-card rounded-card shadow-card border border-border p-6">
            <h2 className="text-lg font-semibold text-heading mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              License
            </h2>
            <p className="text-body mb-3">
              This dataset is released under the{' '}
              <a
                href={siteConfig.citation.licenseUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline font-medium"
              >
                {siteConfig.citation.license}
              </a>{' '}
              ({siteConfig.citation.licenseName}).
            </p>
            <p className="text-body text-sm text-muted">
              You are free to share and adapt the material for any purpose, including commercially,
              as long as you give appropriate credit.
            </p>
          </div>

          <div className="bg-card rounded-card shadow-card border border-border p-6">
            <h2 className="text-lg font-semibold text-heading mb-3">Usage</h2>
            <p className="text-body">
              This dataset is released for research purposes only.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-card-lg p-8 flex items-center justify-center min-h-64">
            <div className="text-center">
              <SportIcon className="w-24 h-24 text-primary/30 mx-auto mb-4" />
              <p className="text-muted text-sm">Ball Sports Video Analysis</p>
            </div>
          </div>

          <CitationCard
            title={siteConfig.citation.title}
            authors={siteConfig.citation.authors}
            year={siteConfig.citation.year}
            publisher={siteConfig.citation.publisher}
            doi={siteConfig.citation.doi}
            doiUrl={siteConfig.citation.doiUrl}
            recordUrl={siteConfig.citation.recordUrl}
            license={siteConfig.citation.license}
            licenseUrl={siteConfig.citation.licenseUrl}
            licenseName={siteConfig.citation.licenseName}
          />

          <div className="bg-card rounded-card shadow-card border border-border p-6">
            <h3 className="text-sm font-medium text-muted mb-4">Download</h3>
            <div className="space-y-3">
              <a
                href={siteConfig.citation.recordUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors justify-center"
              >
                <ExternalLink className="w-4 h-4" />
                Download from Zenodo
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

function SportIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  );
}