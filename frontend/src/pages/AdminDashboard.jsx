import { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import CandidateModal from '../components/candidate/CandidateModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getCandidates, addCandidate, updateCandidate, deleteCandidate } from '../api/candidateApi';
import toast from 'react-hot-toast';
import { ShieldCheck, UserPlus, Edit3, Trash2, Award } from 'lucide-react';

export default function AdminDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);

  const fetchCandidateList = async () => {
    try {
      const data = await getCandidates();
      const list = Array.isArray(data)
        ? data
        : data.data || data.candidates || [];
      setCandidates(list);
    } catch (err) {
      console.error('Failed to load candidate list:', err);
      toast.error('Failed to load candidates.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidateList();
  }, []);

  const handleOpenAddModal = () => {
    setEditingCandidate(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (candidate) => {
    setEditingCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setSubmitting(true);
    try {
      if (editingCandidate) {
        await updateCandidate(editingCandidate._id, formData);
        toast.success('Candidate profile updated!');
      } else {
        await addCandidate(formData);
        toast.success('New candidate registered successfully!');
      }
      setIsModalOpen(false);
      await fetchCandidateList();
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Operation failed.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCandidate = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove candidate "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteCandidate(id);
      toast.success(`Removed ${name} from election ballot.`);
      await fetchCandidateList();
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Failed to delete candidate.';
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F1117] text-slate-900 dark:text-white flex flex-col transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-[#1B2A4A] text-indigo-700 dark:text-[#60A5FA] border border-indigo-200 dark:border-[#60A5FA]/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-[#60A5FA]" />
              <span>System Administrative Console</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Candidate Management Panel
            </h1>
            <p className="text-sm text-slate-600 dark:text-[#9E9E9E] mt-1">
              Add new election candidates, update political party affiliations, or prune profiles.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 shadow-md glow-orange transition-all active:scale-95 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register Candidate</span>
          </button>
        </div>

        {/* Candidate Management Table */}
        {loading ? (
          <div className="py-20">
            <LoadingSpinner fullScreen={false} />
          </div>
        ) : candidates.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center border border-slate-200 dark:border-[#2A2D3A] text-slate-500 dark:text-slate-400 bg-white dark:bg-[#1C1E26]">
            No candidates registered in the database. Click "Register Candidate" to add one.
          </div>
        ) : (
          <div className="glass-card rounded-2xl border border-slate-200 dark:border-[#2A2D3A] overflow-hidden shadow-sm bg-white dark:bg-[#1C1E26]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 dark:bg-[#16181E] border-b border-slate-200 dark:border-[#2A2D3A] text-slate-600 dark:text-[#9E9E9E] text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-4 px-6">Candidate Name</th>
                    <th className="py-4 px-6">Party / Alliance</th>
                    <th className="py-4 px-6">Age</th>
                    <th className="py-4 px-6">Total Votes</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-[#2A2D3A] text-sm font-medium text-slate-800 dark:text-slate-200">
                  {candidates.map((candidate) => (
                    <tr key={candidate._id} className="hover:bg-slate-50 dark:hover:bg-[#20232D] transition-colors">
                      
                      <td className="py-4 px-6 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-[#3D2818] border border-orange-200 dark:border-[#FBBF24]/30 text-orange-600 dark:text-[#FBBF24] flex items-center justify-center text-xs font-bold">
                          {candidate.name.charAt(0)}
                        </div>
                        {candidate.name}
                      </td>

                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-[#20232D] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#2A2D3A]">
                          {candidate.party}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                        {candidate.age} yrs
                      </td>

                      <td className="py-4 px-6 font-mono font-bold text-teal-600 dark:text-[#34D399] flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-teal-600 dark:text-[#34D399]" />
                        {candidate.voteCount || 0}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(candidate)}
                            className="p-2 text-slate-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-[#3D2818] rounded-lg transition-colors cursor-pointer"
                            title="Edit Profile"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteCandidate(candidate._id, candidate.name)}
                            className="p-2 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-[#F472B6] hover:bg-rose-50 dark:hover:bg-[#3B1E2E] rounded-lg transition-colors cursor-pointer"
                            title="Delete Candidate"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* Candidate Form Modal */}
      <CandidateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingCandidate}
        loading={submitting}
      />
    </div>
  );
}