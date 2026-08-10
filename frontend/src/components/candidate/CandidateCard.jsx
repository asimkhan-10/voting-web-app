import { Vote, CheckCircle2, ShieldAlert, Award } from 'lucide-react';

export default function CandidateCard({ candidate, onVoteClick, user }) {
  const isUserVoted = user?.isVoted;
  const isAdmin = user?.role === 'admin';

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-[#2A2D3A] transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-orange-500/10 relative overflow-hidden bg-white dark:bg-[#1C1E26]">
      
      {/* Decorative Background Pill */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/15 transition-all pointer-events-none" />

      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-orange-50 dark:bg-[#3D2818] text-orange-600 dark:text-[#FBBF24] border border-orange-200 dark:border-[#FBBF24]/30">
            {candidate.party}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Age: {candidate.age}
          </span>
        </div>

        {/* Candidate Info */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
          {candidate.name}
        </h3>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-[#2A2D3A] flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500 dark:text-[#9E9E9E]">
            <Award className="w-4 h-4 text-teal-600 dark:text-[#34D399]" />
            <span className="text-xs font-semibold">Current Votes</span>
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white font-mono tracking-tight">
            {candidate.voteCount || 0}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6">
        {isAdmin ? (
          <div className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-amber-50 dark:bg-[#3D2818] text-amber-800 dark:text-[#FBBF24] border border-amber-200 dark:border-[#FBBF24]/30 text-center flex items-center justify-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-[#FBBF24]" />
            Admins cannot cast votes
          </div>
        ) : isUserVoted ? (
          <div className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-teal-50 dark:bg-[#1A3326] text-teal-700 dark:text-[#34D399] border border-teal-200 dark:border-[#34D399]/30 text-center flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-[#34D399]" />
            Vote Cast
          </div>
        ) : (
          <button
            onClick={() => onVoteClick(candidate)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 active:scale-[0.98] transition-all shadow-md glow-orange cursor-pointer"
          >
            <Vote className="w-4 h-4" />
            Vote for Candidate
          </button>
        )}
      </div>

    </div>
  );
}