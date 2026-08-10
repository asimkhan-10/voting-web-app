import { useState, useEffect } from 'react';
import { X, User, Shield, Calendar, Plus, Save } from 'lucide-react';

export default function CandidateModal({ isOpen, onClose, onSubmit, initialData, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    party: '',
    age: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        party: initialData.party || '',
        age: initialData.age || ''
      });
    } else {
      setFormData({ name: '', party: '', age: '' });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      age: Number(formData.age)
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn">
      <div className="glass-card max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-[#2A2D3A] bg-white dark:bg-[#1C1E26] relative">
        
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-[#20232D] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          {initialData ? <Save className="w-5 h-5 text-orange-500" /> : <Plus className="w-5 h-5 text-orange-500" />}
          {initialData ? 'Edit Candidate Profile' : 'Register New Candidate'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Candidate Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
            <div className="relative rounded-md shadow-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400 dark:text-slate-500" />
              </div>
              <input
                type="text"
                name="name"
                required
                placeholder="Candidate Full Name"
                value={formData.name}
                onChange={handleChange}
                className="glass-input block w-full pl-10 pr-3 py-2 rounded-xl text-sm dark:bg-[#20232D] dark:border-[#2A2D3A]"
              />
            </div>
          </div>

          {/* Political Party */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Party Name</label>
            <div className="relative rounded-md shadow-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Shield className="h-5 w-5 text-slate-400 dark:text-slate-500" />
              </div>
              <input
                type="text"
                name="party"
                required
                placeholder="Political Alliance / Party"
                value={formData.party}
                onChange={handleChange}
                className="glass-input block w-full pl-10 pr-3 py-2 rounded-xl text-sm dark:bg-[#20232D] dark:border-[#2A2D3A]"
              />
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Candidate Age</label>
            <div className="relative rounded-md shadow-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-slate-400 dark:text-slate-500" />
              </div>
              <input
                type="number"
                name="age"
                required
                min="25"
                placeholder="35"
                value={formData.age}
                onChange={handleChange}
                className="glass-input block w-full pl-10 pr-3 py-2 rounded-xl text-sm dark:bg-[#20232D] dark:border-[#2A2D3A]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-[#20232D] hover:bg-slate-200 dark:hover:bg-[#252834] border border-slate-200 dark:border-[#2A2D3A] transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 shadow-md glow-orange transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Saving...' : initialData ? 'Update Profile' : 'Add Candidate'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}