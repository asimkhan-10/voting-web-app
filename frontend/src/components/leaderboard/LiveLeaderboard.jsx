import VoteProgressBar from './VoteProgressBar';
import { Trophy, Users } from 'lucide-react';

export default function LiveLeaderboard({ candidates = [] }) {
  // Sort candidates descending by vote count
  const sortedCandidates = [...candidates].sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0));
  
  // Calculate total votes across all candidates
  const totalVotes = candidates.reduce((acc, curr) => acc + (curr.voteCount || 0), 0);

  return (
    <div className="space-y-6">
      
      {/* Total Votes Counter */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-[#2A2D3A] bg-white dark:bg-[#1C1E26] flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-50 dark:bg-[#3D2818] border border-orange-200 dark:border-[#FBBF24]/30 rounded-xl">
            <Trophy className="w-6 h-6 text-orange-500 dark:text-[#FBBF24]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Election Standings</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Live updated vote breakdown</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Total Votes Cast</span>
          <span className="text-2xl font-extrabold text-orange-500 dark:text-orange-400 font-mono flex items-center gap-1.5 justify-end tracking-tight">
            <Users className="w-5 h-5 text-orange-500 dark:text-orange-400" />
            {totalVotes}
          </span>
        </div>
      </div>

      {/* Ranked Candidate List */}
      <div className="space-y-3">
        {sortedCandidates.map((candidate, index) => (
          <VoteProgressBar
            key={candidate._id || index}
            candidate={candidate}
            totalVotes={totalVotes}
            rank={index + 1}
          />
        ))}
      </div>

    </div>
  );
}