import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import CandidateCard from '../components/candidate/CandidateCard';
import VoteConfirmModal from '../components/candidate/VoteConfirmModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getCandidates, castVote } from '../api/candidateApi';
import toast from 'react-hot-toast';
import { Vote, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

export default function CandidatesPage() {
  const { user, setUser, refetchProfile } = useContext(AuthContext);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [votingInProgress, setVotingInProgress] = useState(false);

  const fetchCandidateData = async () => {
    try {
      const data = await getCandidates();
      const list = Array.isArray(data) ? data : data.data || data.candidates || [];
      setCandidates(list);
    } catch (err) {
      console.error('Failed to load candidates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidateData();
  }, []);

  const handleOpenVoteModal = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleConfirmVote = async () => {
    if (!selectedCandidate) return;

    setVotingInProgress(true);
    try {
      await castVote(selectedCandidate._id);
      toast.success(`Successfully voted for ${selectedCandidate.name}!`);
      
      // Update local state to immediately disable voting buttons
      setUser((prev) => (prev ? { ...prev, isVoted: true } : prev));
      
      // Re-hydrate profile and refresh candidate counts
      await refetchProfile();
      await fetchCandidateData();
      
      setIsModalOpen(false);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Failed to submit vote.';
      toast.error(msg);
    } finally {
      setVotingInProgress(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F1117] text-slate-900 dark:text-white flex flex-col transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Banner Section */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 mb-8 border border-slate-200 dark:border-[#2A2D3A] relative overflow-hidden bg-white/80 dark:bg-[#1C1E26]/90">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 dark:bg-[#3D2818] text-orange-600 dark:text-[#FBBF24] border border-orange-200 dark:border-[#FBBF24]/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Election Ballot</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Cast Your Democratic Vote
            </h1>
            
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-[#9E9E9E] leading-relaxed">
              Browse registered candidates below and select your preferred candidate. Ensure you verify your choice before confirming.
            </p>

            {user?.isVoted ? (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-teal-50 dark:bg-[#1A3326] text-teal-800 dark:text-[#34D399] border border-teal-200 dark:border-[#34D399]/30">
                <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-[#34D399]" />
                <span>Your vote has been securely recorded on the network.</span>
              </div>
            ) : user?.role === 'admin' ? (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-amber-50 dark:bg-[#3D2818] text-amber-800 dark:text-[#FBBF24] border border-amber-200 dark:border-[#FBBF24]/30">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-[#FBBF24]" />
                <span>You are signed in as Admin. Admins cannot cast votes.</span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Candidate List Grid */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Vote className="w-5 h-5 text-orange-500" />
            Registered Candidates ({candidates.length})
          </h2>
        </div>

        {loading ? (
          <div className="py-20">
            <LoadingSpinner fullScreen={false} />
          </div>
        ) : candidates.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center border border-slate-200 dark:border-[#2A2D3A] text-slate-500 dark:text-slate-400 bg-white dark:bg-[#1C1E26]">
            No candidates have been registered for this election yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((candidate) => (
              <CandidateCard
                key={candidate._id}
                candidate={candidate}
                onVoteClick={handleOpenVoteModal}
                user={user}
              />
            ))}
          </div>
        )}

      </main>

      {/* Confirmation Modal */}
      <VoteConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmVote}
        candidate={selectedCandidate}
        loading={votingInProgress}
      />
    </div>
  );
}
