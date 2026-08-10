import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity } from 'lucide-react';

export default function VotingTrendChart({ totalVotes = 0 }) {
  const [activePoint, setActivePoint] = useState(null);

  // Generate responsive trend data points based on total votes
  const intervals = [
    { label: '08:00 AM', votes: Math.round(totalVotes * 0.08) },
    { label: '10:00 AM', votes: Math.round(totalVotes * 0.22) },
    { label: '12:00 PM', votes: Math.round(totalVotes * 0.45) },
    { label: '02:00 PM', votes: Math.round(totalVotes * 0.68) },
    { label: '04:00 PM', votes: Math.round(totalVotes * 0.88) },
    { label: '06:00 PM', votes: totalVotes },
  ];

  const maxVal = Math.max(totalVotes, 10);
  const width = 500;
  const height = 140;
  const padding = 20;

  // Generate SVG path coordinates
  const points = intervals.map((item, idx) => {
    const x = padding + (idx / (intervals.length - 1)) * (width - 2 * padding);
    const y = height - padding - (item.votes / maxVal) * (height - 2 * padding);
    return { x, y, ...item };
  });

  const pathD = points.reduce((acc, point, idx) => {
    return idx === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-[#2A2D3A] bg-white dark:bg-[#1C1E26] shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-indigo-50 dark:bg-[#1B2A4A] border border-indigo-200 dark:border-[#60A5FA]/30 rounded-xl">
            <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-[#60A5FA]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Voting Velocity & Activity Trend</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Time-series vote accumulation graph</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-[#1A3326] text-emerald-700 dark:text-[#34D399] border border-emerald-200 dark:border-[#34D399]/30">
          <Activity className="w-3 h-3 animate-pulse text-emerald-600 dark:text-[#34D399]" />
          Live Velocity
        </span>
      </div>

      {/* SVG Trend Area Graph */}
      <div className="relative my-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-36 overflow-visible">
          <defs>
            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid Baseline Lines */}
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="currentColor" className="text-slate-200 dark:text-[#2A2D3A]" strokeWidth="1" />
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="currentColor" className="text-slate-100 dark:text-[#20232D]" strokeDasharray="3 3" strokeWidth="1" />

          {/* Fill Gradient Area */}
          <motion.path
            d={areaD}
            fill="url(#trendGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Stroke Line */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="#f97316"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Interactive Data Points */}
          {points.map((pt, idx) => (
            <g key={idx} className="cursor-pointer" onMouseEnter={() => setActivePoint(pt)} onMouseLeave={() => setActivePoint(null)}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={activePoint?.label === pt.label ? "6" : "4"}
                className="fill-orange-500 stroke-white dark:stroke-[#1C1E26] transition-all"
                strokeWidth="2"
              />
            </g>
          ))}
        </svg>

        {/* Floating Tooltip */}
        {activePoint && (
          <div 
            className="absolute z-20 px-3 py-1.5 bg-slate-900 dark:bg-[#16181E] text-white text-xs rounded-lg shadow-xl border border-slate-700 dark:border-[#2A2D3A] pointer-events-none transform -translate-x-1/2 -translate-y-12 animate-fadeIn font-mono"
            style={{ left: `${(activePoint.x / width) * 100}%`, top: `${(activePoint.y / height) * 100}%` }}
          >
            {activePoint.label}: <strong>{activePoint.votes} votes</strong>
          </div>
        )}
      </div>

      {/* Time Label X-Axis */}
      <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider pt-2 border-t border-slate-100 dark:border-[#2A2D3A]">
        {intervals.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>
    </div>
  );
}
