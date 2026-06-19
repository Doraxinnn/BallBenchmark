import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import PageContainer from '@/components/layout/PageContainer';
import ChartCard from '@/components/charts/ChartCard';
import StatCard from '@/components/ui/StatCard';
import videos from '@/data/videos.json';
import { DatasetVideo, SegmentLabel } from '@/types/dataset';
import { getTotalSegments, getSegmentsByLabel, getVideosBySport } from '@/utils/statistics';

const COLORS: Record<SegmentLabel, string> = {
  Hit: '#22C55E',
  Miss: '#EF4444',
};

export default function StatisticsPage() {
  const videosData = videos as DatasetVideo[];
  const totalVideos = videosData.length;
  const totalSegments = getTotalSegments(videosData);
  const segmentsByLabel = getSegmentsByLabel(videosData);
  const videosBySport = getVideosBySport(videosData);

  const pieData = (Object.keys(COLORS) as SegmentLabel[]).map(label => ({
    name: label,
    value: segmentsByLabel[label],
  }));

  const barData = Object.entries(videosBySport).map(([sport, count]) => ({
    sport,
    count,
  }));

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-heading mb-2">Statistics Overview</h1>
        <p className="text-muted">Summary of the dataset.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Videos" value={totalVideos} />
        <StatCard label="Total Segments" value={totalSegments} />
        <StatCard label="Hit Segments" value={segmentsByLabel.Hit} />
        <StatCard label="Miss Segments" value={segmentsByLabel.Miss} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Segments by Type">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name as SegmentLabel]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Videos by Sport">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} layout="vertical">
              <XAxis type="number" />
              <YAxis type="category" dataKey="sport" width={80} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563EB" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </PageContainer>
  );
}
