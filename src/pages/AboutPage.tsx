import PageContainer from '@/components/layout/PageContainer';
import CitationCard from '@/components/ui/CitationCard';
import DownloadButton from '@/components/ui/DownloadButton';
import { siteConfig } from '@/data/siteConfig';

export default function AboutPage() {
  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-heading mb-2">About TS-Benchmark</h1>
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
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-irrelevant" />
                <span className="text-body"><strong>Irrelevant:</strong> unrelated content.</span>
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
              <p className="text-muted text-sm">Sports Video Analysis</p>
            </div>
          </div>

          <CitationCard
            title={siteConfig.citation.title}
            authors={siteConfig.citation.authors}
            year={siteConfig.citation.year}
          />

          <div className="bg-card rounded-card shadow-card border border-border p-6">
            <h3 className="text-sm font-medium text-muted mb-4">Download</h3>
            <div className="space-y-3">
              <DownloadButton onClick={() => {}} label="Download Dataset" />
              <DownloadButton onClick={() => {}} label="Download Annotations" />
              <DownloadButton onClick={() => {}} label="Download Metadata" />
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
