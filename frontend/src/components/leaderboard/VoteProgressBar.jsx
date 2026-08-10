import { motion } from 'framer-motion';

export default function VoteProgressBar({ candidate, totalVotes, rank }) {
  const voteCount = candidate.voteCount || 0;
  const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;

  // Distinct color per top 3 rank positions
  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return { 
          emoji: '🥇', 
          bg: 'bg-amber-50 dark:bg-[#3D2818] border-amber-300 dark:border-[#FBBF24]/40 text-amber-800 dark:text-[#FBBF24]', 
          bar: 'bg-gradient-to-r from-orange-500 to-amber-400' 
        };
      case 2:
        return { 
          emoji: '🥈', 
          bg: 'bg-slate-100 dark:bg-[#20232D] border-slate-300 dark:border-[#2A2D3A] text-slate-700 dark:text-slate-200', 
          bar: 'bg-gradient-to-r from-slate-400 to-slate-300 dark:from-slate-500 dark:to-slate-400' 
        };
      case 3:
        return { 
          emoji: '🥉', 
          bg: 'bg-amber-100/70 dark:bg-[#3D2818]/60 border-amber-400 dark:border-[#FBBF24]/30 text-amber-900 dark:text-[#FBBF24]', 
          bar: 'bg-gradient-to-r from-amber-600 to-amber-500' 
        };
      default:
        return { 
          emoji: `#${rank}`, 
          bg: 'bg-slate-100 dark:bg-[#252834] border-slate-200 dark:border-[#2A2D3A] text-slate-600 dark:text-[#9E9E9E]', 
          bar: 'bg-gradient-to-r from-orange-500 to-amber-500' 
        };
    }
  };

  const style = getRankBadge(rank);

  return (
    <div className="glass-card rounded-xl p-4 border border-slate-200 dark:border-[#2A2D3A] transition-all bg-white dark:bg-[#1C1E26] shadow-xs">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs border ${style.bg}`}>
            {style.emoji}
          </span>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">{candidate.name}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">{candidate.party}</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">{voteCount} votes</span>
          <span className="text-xs text-slate-500 dark:text-[#9E9E9E] ml-2 font-mono">({percentage}%)</span>
        </div>
      </div>

      {/* Animated Percentage Bar */}
      <div className="w-full h-2.5 bg-slate-100 dark:bg-[#20232D] rounded-full overflow-hidden border border-slate-200 dark:border-[#2A2D3A]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${style.bar}`}
        />
      </div>
    </div>
  );
}