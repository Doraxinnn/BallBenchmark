import { Link } from 'react-router-dom';
import { ArrowRight, Play, Activity } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import StatCard from '@/components/ui/StatCard';
import { siteConfig } from '@/data/siteConfig';

function Navbar() {
  return (
    <div className="bg-white border-b border-border">
      <div className="max-w-container mx-auto px-6 h-16 flex items-center">
        <Link to="/" className="flex items-center gap-2 text-heading font-semibold text-lg">
          <Activity className="w-6 h-6 text-primary" />
          <span>TS-Benchmark</span>
        </Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <PageContainer className="py-12">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          <div className="flex-1">
            <h1 className="text-4xl lg:text-5xl font-bold text-heading mb-4">
              {siteConfig.fullName}
            </h1>
            <p className="text-lg text-body mb-8 max-w-xl">
              {siteConfig.description}
            </p>
            <div className="flex gap-4">
              <Link
                to="/dataset"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
              >
                Browse Dataset
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/statistics"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-heading font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                View Statistics
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md">
            <div className="bg-card rounded-card-lg shadow-card border border-border overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <button className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10">
                  <Play className="w-8 h-8 text-white fill-white" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-hit" />
                    <div className="h-full w-1/4 bg-miss -mt-1" />
                    <div className="h-full w-1/5 bg-irrelevant -mt-1" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted">Sample Video</p>
                <p className="text-heading font-medium">VID_0001 • Basketball</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Videos" value={siteConfig.stats.totalVideos} />
          <StatCard label="Annotated Segments" value={siteConfig.stats.totalSegments} />
          <StatCard
            label="Segment Types"
            value={siteConfig.stats.segmentTypes}
            sublabel="Hit / Miss / Irrelevant"
          />
        </section>
      </PageContainer>
    </div>
  );
}
