import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import HomePage from '@/pages/HomePage';
import DatasetPage from '@/pages/DatasetPage';
import VideoDetailPage from '@/pages/VideoDetailPage';
import StatisticsPage from '@/pages/StatisticsPage';
import AboutPage from '@/pages/AboutPage';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -8 },
};

const pageTransition = {
  type: 'tween' as const,
  ease: 'easeOut' as const,
  duration: 0.22,
};

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="will-change-[transform,opacity]"
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/dataset" element={<PageTransition><DatasetPage /></PageTransition>} />
            <Route path="/dataset/:videoId" element={<PageTransition><VideoDetailPage /></PageTransition>} />
            <Route path="/statistics" element={<PageTransition><StatisticsPage /></PageTransition>} />
            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}