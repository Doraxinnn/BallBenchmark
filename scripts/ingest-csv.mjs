import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const ZENODO = path.join(ROOT, 'zenodo-video');
const VIDEOS_JSON = path.join(ROOT, 'src/data/videos.json');
const PUBLIC_CSV = path.join(ROOT, 'public/csv');

// 1. 修正 bowling 文件 typo
for (const n of [1, 2]) {
  const oldPath = path.join(ZENODO, 'bowling', `baoling${n}.csv`);
  const newPath = path.join(ZENODO, 'bowling', `bowling${n}.csv`);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: baoling${n}.csv -> bowling${n}.csv`);
  }
}

// 2. 读 videos.json
const videos = JSON.parse(fs.readFileSync(VIDEOS_JSON, 'utf-8'));

// 3. sport -> dir 映射
const sportDir = { Basketball: 'basketball', Billiards: 'billiards', Bowling: 'bowling' };

// 从 videoSrc 解析 sport 本地编号（如 basketball_1.mp4 -> 1）
function getSportIndex(video) {
  const m = video.videoSrc.match(/_(\d+)\.mp4/);
  return m ? m[1] : null;
}

// 4. 逐个 video 解析 CSV
let totalCount = 0;
for (const video of videos) {
  const dir = sportDir[video.sport];
  const idx = getSportIndex(video);
  const csvPath = path.join(ZENODO, dir, `${dir}${idx}.csv`);
  if (!fs.existsSync(csvPath)) {
    console.warn(`Missing: ${csvPath}`);
    video.segments = [];
    continue;
  }
  const text = fs.readFileSync(csvPath, 'utf-8');
  const lines = text.split(/\r?\n/).filter(Boolean);
  const segments = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    if (cols.length < 4) continue;
    const [index, start_time, end_time, result] = cols;
    const label = result.trim().toLowerCase() === 'hit' ? 'Hit' : 'Miss';
    segments.push({
      id: `${video.id}_${index}`,
      label,
      start: parseFloat(start_time),
      end: parseFloat(end_time),
    });
  }
  video.segments = segments;
  totalCount += segments.length;
  console.log(`${video.id} (${video.sport}): ${segments.length} segments`);
}
console.log(`\nTotal: ${totalCount} segments across ${videos.length} videos`);

// 5. 写回 videos.json
fs.writeFileSync(VIDEOS_JSON, JSON.stringify(videos, null, 2) + '\n');

// 6. 复制 CSV 到 public/csv/
fs.mkdirSync(path.join(PUBLIC_CSV, 'basketball'), { recursive: true });
fs.mkdirSync(path.join(PUBLIC_CSV, 'billiards'), { recursive: true });
fs.mkdirSync(path.join(PUBLIC_CSV, 'bowling'), { recursive: true });
for (const video of videos) {
  const dir = sportDir[video.sport];
  const idx = getSportIndex(video);
  const src = path.join(ZENODO, dir, `${dir}${idx}.csv`);
  const dst = path.join(PUBLIC_CSV, dir, `${dir}${idx}.csv`);
  fs.copyFileSync(src, dst);
}
console.log(`\nCopied CSVs to public/csv/`);
