import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Shield } from 'lucide-react';

export default function PartyDonutChart({ candidates = [] }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Group votes by political party
  const partyMap = {};
  candidates.forEach((c) => {
    const party = c.party || 'Independent';
    partyMap[party] = (partyMap[party] || 0) + (c.voteCount || 0);
  });

  const partyList = Object.keys(partyMap).map((party) => ({
    name: party,
    votes: partyMap[party],
  })).sort((a, b) => b.votes - a.votes);

  const totalVotes = partyList.reduce((acc, p) => acc + p.votes, 0);

  // Color palette matching status & metric colors
  const palette = [
    { name: 'Orange', stroke: '#F97316', bg: 'bg-orange-500', text: 'text-orange-500' },
    { name: 'Teal', stroke: '#34D399', bg: 'bg-teal-500', text: 'text-teal-500' },
    { name: 'Indigo', stroke: '#60A5FA', bg: 'bg-indigo-500', text: 'text-indigo-500' },
    { name: 'Cyan', stroke: '#38BDF8', bg: 'bg-cyan-500', text: 'text-cyan-500' },
    { name: 'Amber', stroke: '#FBBF24', bg: 'bg-amber-500', text: 'text-amber-500' },
    { name: 'Rose', stroke: '#F472B6', bg: 'bg-rose-500', text: 'text-rose-500' },
  ];

  // Calculate SVG donut segments
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let accumulatedAngle = 0;

  const slices = partyList.map((item, idx) => {
    const pct = totalVotes > 0 ? item.votes / totalVotes : 0;
    const strokeDasharray = `${pct * circumference} ${circumference}`;
    const strokeDashoffset = -accumulatedAngle * circumference;
    accumulatedAngle += pct;
    const styleColor = palette[idx % palette.length];

    return {
      ...item,
      pct: Math.round(pct * 100),
      strokeDasharray,
      strokeDashoffset,
      color: styleColor,
    };
  });

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-[#2A2D3A] bg-white dark:bg-[#1C1E26] shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-teal-50 dark:bg-[#1A3326] border border-teal-200 dark:border-[#34D399]/30 rounded-xl">
            <PieChart className="w-5 h-5 text-teal-600 dark:text-[#34D399]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Political Party Share</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Share breakdown by alliance</p>
          </div>
        </div>
      </div>

      {partyList.length === 0 || totalVotes === 0 ? (
        <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-sm">
          No party vote data recorded yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center my-auto">
          {/* Donut Graphic */}
          <div className="relative flex items-center justify-center p-2">
            <svg width="170" height="170" viewBox="0 0 160 160" className="transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="transparent"
                stroke="currentColor"
                strokeWidth="16"
                className="text-slate-100 dark:text-[#20232D]"
              />
              {slices.map((slice, idx) => (
                <motion.circle
                  key={slice.name}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke={slice.color.stroke}
                  strokeWidth={hoveredIdx === idx ? '20' : '16'}
                  strokeDasharray={slice.strokeDasharray}
                  strokeDashoffset={slice.strokeDashoffset}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: slice.strokeDashoffset }}
                  transition={{ duration: 1, delay: idx * 0.15, ease: 'easeOut' }}
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              ))}
            </svg>

            {/* Inner Center Badge */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <Shield className="w-5 h-5 text-teal-600 dark:text-[#34D399] mb-0.5" />
              <span className="text-xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                {hoveredIdx !== null ? `${slices[hoveredIdx].pct}%` : `${slices.length}`}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                {hoveredIdx !== null ? slices[hoveredIdx].name : 'Parties'}
              </span>
            </div>
          </div>

          {/* Party Legend List */}
          <div className="space-y-2.5">
            {slices.map((slice, idx) => (
              <div
                key={slice.name}
                className={`p-2 rounded-xl border transition-all flex items-center justify-between text-xs cursor-pointer ${
                  hoveredIdx === idx
                    ? 'bg-slate-100 dark:bg-[#20232D] border-slate-300 dark:border-[#2A2D3A] shadow-xs'
                    : 'border-transparent hover:bg-slate-50 dark:hover:bg-[#20232D]/50'
                }`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${slice.color.bg}`} />
                  <span className="font-bold text-slate-800 dark:text-slate-200">{slice.name}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono">
                  <span className="font-bold text-slate-900 dark:text-white">{slice.votes} v</span>
                  <span className="text-slate-400 dark:text-slate-500 text-[11px]">({slice.pct}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Meta */}
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-[#2A2D3A] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Leading Alliance: <strong className="text-slate-800 dark:text-slate-200">{slices[0]?.name || 'N/A'}</strong></span>
        <span>Dominance: <strong className="text-slate-800 dark:text-slate-200">{slices[0]?.pct || 0}%</strong></span>
      </div>
    </div>
  );
}
