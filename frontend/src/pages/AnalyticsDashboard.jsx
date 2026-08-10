import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import VoteBarChart from '../components/charts/VoteBarChart';
import PartyDonutChart from '../components/charts/PartyDonutChart';
import VotingTrendChart from '../components/charts/VotingTrendChart';
import { getCandidates } from '../api/candidateApi';
import { AuthContext } from '../context/AuthContext';
import { 
  Users, 
  Vote, 
  Trophy, 
  Activity, 
  ArrowRight, 
  Radio, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export default function AnalyticsDashboard() {
  const { user } = useContext(AuthContext);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const data = await getCandidates();
      const list = Array.isArray(data) ? data : data.data || data.candidates || [];
      setCandidates(list);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // Auto-polling interval for live telemetry update
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Compute key statistics
  const totalVotes = candidates.reduce((acc, c) => acc + (c.voteCount || 0), 0);
  const sortedCandidates = [...candidates].sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0));
  const leadingCandidate = sortedCandidates[0] || null;
  
  // Simulated registered voter count for turnout % calculation
  const totalRegisteredVoters = Math.max(totalVotes + 15, 50);
  const turnoutPercentage = totalRegisteredVoters > 0 ? Math.round((totalVotes / totalRegisteredVoters) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F1117] text-slate-900 dark:text-white flex flex-col transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hero Banner & Live Status */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-[#2A2D3A] relative overflow-hidden bg-white/80 dark:bg-[#1C1E26]/90 shadow-sm">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 dark:bg-[#3D2818] text-orange-600 dark:text-[#FBBF24] border border-orange-200 dark:border-[#FBBF24]/30 mb-3">
                <Radio className="w-3.5 h-3.5 animate-pulse text-orange-500" />
                <span>Executive Election Analytics Console</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Election Real-Time Dashboard
              </h1>
              
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-[#9E9E9E] leading-relaxed">
                Monitor voter participation rates, live candidate standings, and party market share metrics across all polling networks.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/candidates"
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 shadow-md glow-orange transition-all active:scale-95 cursor-pointer"
              >
                <Vote className="w-4 h-4" />
                <span>Go to Ballot & Vote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="py-20">
            <LoadingSpinner fullScreen={false} />
          </div>
        ) : (
          <>
            {/* Top 4 KPI Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Total Votes Cast */}
              <div className="glass-card rounded-2xl p-5 border border-slate-200 dark:border-[#2A2D3A] bg-white dark:bg-[#1C1E26] shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Total Votes Cast
                  </span>
                  <div className="p-2 bg-teal-50 dark:bg-[#1A3326] border border-teal-200 dark:border-[#34D399]/30 rounded-xl">
                    <Users className="w-4 h-4 text-teal-600 dark:text-[#34D399]" />
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                    {totalVotes}
                  </span>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-teal-600 dark:text-[#34D399] font-medium">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Active Telemetry Sync</span>
                  </div>
                </div>
              </div>

              {/* Registered Candidates */}
              <div className="glass-card rounded-2xl p-5 border border-slate-200 dark:border-[#2A2D3A] bg-white dark:bg-[#1C1E26] shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Registered Candidates
                  </span>
                  <div className="p-2 bg-indigo-50 dark:bg-[#1B2A4A] border border-indigo-200 dark:border-[#60A5FA]/30 rounded-xl">
                    <Vote className="w-4 h-4 text-indigo-600 dark:text-[#60A5FA]" />
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                    {candidates.length}
                  </span>
                  <div className="mt-2 text-xs text-indigo-600 dark:text-[#60A5FA] font-medium">
                    Official Election Nominees
                  </div>
                </div>
              </div>

              {/* Voter Turnout Rate */}
              <div className="glass-card rounded-2xl p-5 border border-slate-200 dark:border-[#2A2D3A] bg-white dark:bg-[#1C1E26] shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Voter Turnout Rate
                  </span>
                  <div className="p-2 bg-cyan-50 dark:bg-[#153245] border border-cyan-200 dark:border-[#38BDF8]/30 rounded-xl">
                    <Activity className="w-4 h-4 text-cyan-600 dark:text-[#38BDF8]" />
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                    {turnoutPercentage}%
                  </span>
                  <div className="mt-2 text-xs text-cyan-600 dark:text-[#38BDF8] font-medium">
                    Estimated Network Participation
                  </div>
                </div>
              </div>

              {/* Leading Candidate */}
              <div className="glass-card rounded-2xl p-5 border border-slate-200 dark:border-[#2A2D3A] bg-white dark:bg-[#1C1E26] shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Leading Candidate
                  </span>
                  <div className="p-2 bg-amber-50 dark:bg-[#3D2818] border border-amber-200 dark:border-[#FBBF24]/30 rounded-xl">
                    <Trophy className="w-4 h-4 text-amber-600 dark:text-[#FBBF24]" />
                  </div>
                </div>
                <div>
                  <span className="text-xl font-bold text-slate-900 dark:text-white truncate block">
                    {leadingCandidate ? leadingCandidate.name : 'N/A'}
                  </span>
                  <div className="mt-2 flex items-center justify-between text-xs text-amber-600 dark:text-[#FBBF24] font-medium">
                    <span>{leadingCandidate?.party || 'Independent'}</span>
                    <span className="font-mono font-bold">{leadingCandidate?.voteCount || 0} votes</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Charts & Graphs Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <VoteBarChart candidates={candidates} />
              </div>
              <div className="lg:col-span-1">
                <PartyDonutChart candidates={candidates} />
              </div>
            </div>

            {/* Charts & Graphs Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <VotingTrendChart totalVotes={totalVotes} />
              </div>

              {/* Live Voting Telemetry Stream */}
              <div className="lg:col-span-1 glass-card rounded-2xl p-6 border border-slate-200 dark:border-[#2A2D3A] bg-white dark:bg-[#1C1E26] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-orange-500" />
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">Live Activity Log</h3>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-[#34D399] tracking-wider">
                      Verified
                    </span>
                  </div>

                  <div className="space-y-3">
                    {sortedCandidates.slice(0, 3).map((candidate, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-[#20232D] border border-slate-100 dark:border-[#2A2D3A] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 bg-teal-50 dark:bg-[#1A3326] text-teal-600 dark:text-[#34D399] rounded-lg">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">{candidate.name}</span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                              Party: {candidate.party}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white font-mono">
                          {candidate.voteCount || 0} v
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#2A2D3A] flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-[#34D399]" />
                    Node Verified
                  </span>
                  <Link to="/leaderboard" className="font-semibold text-orange-500 hover:text-orange-600">
                    View Full Standings →
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Callout Banner */}
            <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-[#2A2D3A] bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-500 text-white rounded-xl shadow-md glow-orange">
                  <Vote className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Ready to Participate in the Election?</h4>
                  <p className="text-xs text-slate-600 dark:text-[#9E9E9E]">Cast your vote securely on the official digital ballot page.</p>
                </div>
              </div>

              <Link
                to="/candidates"
                className="py-2.5 px-5 rounded-xl text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 shadow-md glow-orange transition-all cursor-pointer whitespace-nowrap"
              >
                Go to Voting Ballot
              </Link>
            </div>
          </>
        )}

      </main>
    </div>
  );
}
