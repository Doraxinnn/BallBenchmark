import { useState, useMemo } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import DatasetFilters from '@/components/dataset/DatasetFilters';
import DatasetTable from '@/components/dataset/DatasetTable';
import videos from '@/data/videos.json';
import { DatasetVideo, FilterState } from '@/types/dataset';

export default function DatasetPage() {
  const [filters, setFilters] = useState<FilterState>({
    sport: 'All Sports',
    segmentType: 'All Types',
    split: 'All Splits',
    search: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filteredVideos = useMemo(() => {
    return (videos as DatasetVideo[]).filter(video => {
      if (filters.sport !== 'All Sports' && video.sport !== filters.sport) {
        return false;
      }
      if (filters.split !== 'All Splits' && video.split !== filters.split) {
        return false;
      }
      if (filters.segmentType !== 'All Types') {
        const hasType = video.segments.some(s => s.label === filters.segmentType);
        if (!hasType) return false;
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          video.id.toLowerCase().includes(searchLower) ||
          video.sport.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  }, [filters]);

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-heading mb-2">Dataset</h1>
        <p className="text-muted">Explore and download the full dataset.</p>
      </div>

      <DatasetFilters filters={filters} onChange={(f) => { setFilters(f); setCurrentPage(1); }} />

      <DatasetTable
        videos={filteredVideos}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </PageContainer>
  );
}
