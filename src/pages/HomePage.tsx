import PageContainer from '@/components/layout/PageContainer';
import StatCard from '@/components/ui/StatCard';
import HomeHero from '@/components/home/HomeHero';
import { siteConfig } from '@/data/siteConfig';

export default function HomePage() {
  return (
    <PageContainer>
      <HomeHero />

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
  );
}