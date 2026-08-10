import { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import LiveLeaderboard from '../components/leaderboard/LiveLeaderboard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getVoteCounts, getCandidates } from '../api/candidateApi';
import { Trophy, RefreshCw, Radio } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LeaderboardPage() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch candidate list with vote counts
  const fetchLeaderboardData = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      let data;
      try {
        data = await getVoteCounts();
      } catch {
        data = await getCandidates();
      }

      const list = Array.isArray(data)
        ? data
        : data.data || data.candidates || [];

      setCandidates(list);
      if (isManual) toast.success('Live counts refreshed!');
    } catch (err) {
      console.error('Failed to load leaderboard data:', err);
      if (isManual) toast.error('Failed to refresh counts.');
    } finally {
      setLoading(false);
      if (isManual) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();

    // Auto-polling interval every 5 seconds for live election updates
    const interval = setInterval(() => {
      fetchLeaderboardData(false);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F1117] text-slate-900 dark:text-white flex flex-col transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-[#1A3326] text-teal-700 dark:text-[#34D399] border border-teal-200 dark:border-[#34D399]/30 mb-2">
              <Radio className="w-3.5 h-3.5 animate-pulse text-teal-600 dark:text-[#34D399]" />
              <span>Live Real-Time Telemetry</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
              <Trophy className="w-7 h-7 text-amber-500 dark:text-[#FBBF24]" />
              Election Leaderboard
            </h1>
            <p className="text-sm text-slate-600 dark:text-[#9E9E9E] mt-1">
              Live ranking of candidates based on cast votes across all voting stations.
            </p>
          </div>

          <button
            onClick={() => fetchLeaderboardData(true)}
            disabled={refreshing}
            className="self-start sm:self-auto flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#1C1E26] hover:bg-slate-100 dark:hover:bg-[#20232D] border border-slate-200 dark:border-[#2A2D3A] shadow-xs transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 text-teal-600 dark:text-[#34D399] ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh Counts'}</span>
          </button>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="py-20">
            <LoadingSpinner fullScreen={false} />
          </div>
        ) : candidates.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center border border-slate-200 dark:border-[#2A2D3A] text-slate-500 dark:text-slate-400 bg-white dark:bg-[#1C1E26]">
            No candidate standings available at this moment.
          </div>
        ) : (
          <LiveLeaderboard candidates={candidates} />
        )}

      </main>
    </div>
  );
}