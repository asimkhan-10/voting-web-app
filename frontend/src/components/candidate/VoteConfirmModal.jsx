import { AlertTriangle, CheckCircle2, X } from 'lucide-react';

export default function VoteConfirmModal({ isOpen, onClose, onConfirm, candidate, loading }) {
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn">
      <div className="glass-card max-w-md w-full rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-[#2A2D3A] bg-white dark:bg-[#1C1E26] relative">
        
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-[#20232D] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 text-amber-600 dark:text-[#FBBF24]">
          <div className="p-2.5 bg-amber-50 dark:bg-[#3D2818] border border-amber-200 dark:border-[#FBBF24]/30 rounded-xl">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-[#FBBF24]" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Confirm Your Vote</h3>
        </div>

        <p className="text-sm text-slate-600 dark:text-[#9E9E9E] mb-6 leading-relaxed">
          Are you sure you want to vote for{' '}
          <span className="font-bold text-orange-500 dark:text-orange-400">{candidate.name}</span> representing{' '}
          <span className="font-semibold text-slate-800 dark:text-slate-200">"{candidate.party}"</span>?
          <br />
          <span className="text-xs text-rose-500 dark:text-[#F472B6] mt-2 block font-medium">
            ⚠️ Note: Voting is final and cannot be changed or reverted later.
          </span>
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-[#20232D] hover:bg-slate-200 dark:hover:bg-[#252834] border border-slate-200 dark:border-[#2A2D3A] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 shadow-md glow-orange transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Submitting...' : 'Confirm Vote'}
            {!loading && <CheckCircle2 className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </div>
  );
}