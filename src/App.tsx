import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import HomePage from '@/pages/HomePage';
import DatasetPage from '@/pages/DatasetPage';
import VideoDetailPage from '@/pages/VideoDetailPage';
import StatisticsPage from '@/pages/StatisticsPage';
import AboutPage from '@/pages/AboutPage';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dataset" element={<DatasetPage />} />
            <Route path="/dataset/:videoId" element={<VideoDetailPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
