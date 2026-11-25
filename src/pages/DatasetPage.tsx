import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import DatasetSection from '@/components/dataset/DatasetSection';
import DatasetSportTabs from '@/components/dataset/DatasetSportTabs';
import BenchmarkResults from '@/components/results/BenchmarkResults';
import videos from '@/data/videos.json';
import { DatasetVideo } from '@/types/dataset';

type SportFilter = 'All Sports' | 'Basketball' | 'Billiards' | 'Bowling';

export default function DatasetPage() {
  const [params, setParams] = useSearchParams();
  const urlSport = params.get('sport');
  const activeSport: SportFilter =
    urlSport === 'Basketball' || urlSport === 'Billiards' || urlSport === 'Bowling'
      ? urlSport
      : 'All Sports';

  const grouped = useMemo(() => {
    const all = videos as DatasetVideo[];
    return {
      Basketball: all.filter(v => v.sport === 'Basketball'),
      Billiards: all.filter(v => v.sport === 'Billiards'),
      Bowling: all.filter(v => v.sport === 'Bowling'),
    };
  }, []);

  const handleSportChange = (sport: string) => {
    if (sport === 'All Sports') {
      setParams({});
    } else {
      setParams({ sport });
    }
  };

  const visibleSports: Array<'Basketball' | 'Billiards' | 'Bowling'> =
    activeSport === 'All Sports'
      ? ['Basketball', 'Billiards', 'Bowling']
      : [activeSport];

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-heading mb-2">Dataset</h1>
        <p className="text-muted">
          Browse {videos.length} annotated ball sports videos. Hover a card to preview.
        </p>
      </div>

      <DatasetSportTabs active={activeSport} onChange={handleSportChange} />

      {activeSport !== 'All Sports' && <BenchmarkResults key={activeSport} sport={activeSport} />}

      <div id="sport-videos" tabIndex={-1} className="scroll-mt-28">
        {visibleSports.map(sport => (
          <DatasetSection key={sport} sport={sport} videos={grouped[sport]} />
        ))}
      </div>
    </PageContainer>
  );
}