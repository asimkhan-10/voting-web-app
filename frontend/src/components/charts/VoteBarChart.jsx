import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, BarChart3 } from 'lucide-react';

export default function VoteBarChart({ candidates = [] }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Sort candidates by vote count descending
  const sorted = [...candidates].sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0));
  const maxVotes = Math.max(...sorted.map((c) => c.voteCount || 0), 1);
  const totalVotes = sorted.reduce((acc, c) => acc + (c.voteCount || 0), 0);

  // Palette array for candidate bars
  const colors = [
    { bar: 'from-orange-500 to-amber-500', glow: 'rgba(249, 115, 22, 0.4)' },
    { bar: 'from-teal-500 to-emerald-400', glow: 'rgba(52, 211, 153, 0.4)' },
    { bar: 'from-indigo-500 to-blue-500', glow: 'rgba(96, 165, 250, 0.4)' },
    { bar: 'from-cyan-500 to-sky-400', glow: 'rgba(56, 189, 248, 0.4)' },
    { bar: 'from-rose-500 to-pink-500', glow: 'rgba(244, 114, 182, 0.4)' },
  ];

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-[#2A2D3A] bg-white dark:bg-[#1C1E26] shadow-xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-orange-50 dark:bg-[#3D2818] border border-orange-200 dark:border-[#FBBF24]/30 rounded-xl">
            <BarChart3 className="w-5 h-5 text-orange-500 dark:text-[#FBBF24]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Vote Distribution by Candidate</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Live vote comparison graph</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-[#20232D] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#2A2D3A]">
          {sorted.length} Candidates
        </span>
      </div>

      {/* Bar Graph Display */}
      {sorted.length === 0 ? (
        <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-sm">
          No candidate data available for chart.
        </div>
      ) : (
        <div className="space-y-4 my-auto">
          {sorted.map((candidate, index) => {
            const votes = candidate.voteCount || 0;
            const pct = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
            const widthPct = Math.max((votes / maxVotes) * 100, 4); // Minimum visible bar width
            const colorScheme = colors[index % colors.length];

            return (
              <div 
                key={candidate._id || index}
                className="group relative"
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-[#20232D] border border-slate-200 dark:border-[#2A2D3A] text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-[10px]">
                      #{index + 1}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
                      {candidate.name}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">
                      ({candidate.party})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-bold text-slate-900 dark:text-white">{votes} votes</span>
                    <span className="text-slate-400 dark:text-slate-500 text-[11px]">({pct}%)</span>
                  </div>
                </div>

                {/* Progress Track */}
                <div className="w-full h-3.5 bg-slate-100 dark:bg-[#20232D] rounded-full overflow-hidden border border-slate-200/80 dark:border-[#2A2D3A] relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPct}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${colorScheme.bar}`}
                    style={{
                      boxShadow: hoveredIdx === index ? `0 0 12px ${colorScheme.glow}` : 'none'
                    }}
                  />
                </div>

                {/* Hover Tooltip */}
                {hoveredIdx === index && (
                  <div className="absolute left-1/2 -translate-x-1/2 -top-10 z-20 px-3 py-1.5 bg-slate-900 dark:bg-[#16181E] text-white text-xs rounded-lg shadow-xl border border-slate-700 dark:border-[#2A2D3A] flex items-center gap-2 animate-fadeIn pointer-events-none whitespace-nowrap">
                    <Award className="w-3.5 h-3.5 text-orange-400" />
                    <span>{candidate.name}: <strong>{votes} votes</strong> ({pct}% of total)</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Meta */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#2A2D3A] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Highest: <strong className="text-slate-800 dark:text-slate-200">{sorted[0]?.name || 'N/A'}</strong> ({sorted[0]?.voteCount || 0} votes)</span>
        <span>Total Votes: <strong className="text-slate-800 dark:text-slate-200">{totalVotes}</strong></span>
      </div>
    </div>
  );
}
