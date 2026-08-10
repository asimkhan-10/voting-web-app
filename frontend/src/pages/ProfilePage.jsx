import { useState, useContext } from 'react';
import Navbar from '../components/common/Navbar';
import { AuthContext } from '../context/AuthContext';
import { updatePassword } from '../api/authApi';
import toast from 'react-hot-toast';
import { 
  User, 
  Shield, 
  IdCard, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Lock, 
  KeyRound, 
  Save 
} from 'lucide-react';

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!passwordData.currentPassword || !passwordData.newPassword) {
      toast.error('Please fill in both current and new passwords.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long.');
      return;
    }

    setSubmitting(true);
    try {
      await updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      toast.success('Password updated successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Failed to update password.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F1117] text-slate-900 dark:text-white flex flex-col transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
            <User className="w-7 h-7 text-orange-500" />
            Voter Account & Profile
          </h1>
          <p className="text-sm text-slate-600 dark:text-[#9E9E9E] mt-1">
            Manage your personal verification records and security settings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Profile Card Overview */}
          <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-[#2A2D3A] bg-white dark:bg-[#1C1E26] flex flex-col items-center text-center relative overflow-hidden shadow-xs">
            <div className="w-20 h-20 rounded-2xl bg-orange-50 dark:bg-[#3D2818] border border-orange-200 dark:border-[#FBBF24]/30 flex items-center justify-center text-orange-600 dark:text-[#FBBF24] text-2xl font-bold mb-4 shadow-xs">
              {user?.cnic ? String(user.cnic).slice(0, 3) : 'USR'}
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              CNIC: {user?.cnic || 'N/A'}
            </h2>

            <div className="mt-2 flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-[#1B2A4A] text-indigo-700 dark:text-[#60A5FA] border border-indigo-200 dark:border-[#60A5FA]/30 capitalize flex items-center gap-1">
                <Shield className="w-3 h-3 text-indigo-600 dark:text-[#60A5FA]" />
                {user?.role || 'Voter'}
              </span>

              {user?.isVoted ? (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-[#1A3326] text-teal-700 dark:text-[#34D399] border border-teal-200 dark:border-[#34D399]/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-teal-600 dark:text-[#34D399]" />
                  Voted
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-[#3D2818] text-amber-800 dark:text-[#FBBF24] border border-amber-200 dark:border-[#FBBF24]/30">
                  Not Voted Yet
                </span>
              )}
            </div>

            <div className="w-full mt-6 pt-6 border-t border-slate-100 dark:border-[#2A2D3A] text-left space-y-3 text-xs text-slate-600 dark:text-[#9E9E9E]">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <IdCard className="w-4 h-4 text-orange-500" />
                <span>Age: <strong className="text-slate-800 dark:text-slate-200">{user?.age || 'N/A'} yrs</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Mail className="w-4 h-4 text-orange-500" />
                <span className="truncate">Email: <strong className="text-slate-800 dark:text-slate-200">{user?.email || 'N/A'}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Phone className="w-4 h-4 text-orange-500" />
                <span>Mobile: <strong className="text-slate-800 dark:text-slate-200">{user?.mobile || 'N/A'}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span className="truncate">Address: <strong className="text-slate-800 dark:text-slate-200">{user?.address || 'N/A'}</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Update Password Form */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-[#2A2D3A] bg-white dark:bg-[#1C1E26] shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-orange-500" />
              Security Settings
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Change your password to keep your voter profile secure.
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              
              {/* Current Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Current Password</label>
                <div className="relative rounded-md shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="password"
                    name="currentPassword"
                    required
                    placeholder="••••••••"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="glass-input block w-full pl-10 pr-3 py-2.5 rounded-xl text-sm dark:bg-[#20232D] dark:border-[#2A2D3A]"
                  />
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">New Password</label>
                <div className="relative rounded-md shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="password"
                    name="newPassword"
                    required
                    placeholder="••••••••"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="glass-input block w-full pl-10 pr-3 py-2.5 rounded-xl text-sm dark:bg-[#20232D] dark:border-[#2A2D3A]"
                  />
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Confirm New Password</label>
                <div className="relative rounded-md shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    placeholder="••••••••"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="glass-input block w-full pl-10 pr-3 py-2.5 rounded-xl text-sm dark:bg-[#20232D] dark:border-[#2A2D3A]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 py-2.5 px-5 rounded-xl text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 shadow-md glow-orange transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{submitting ? 'Updating Password...' : 'Update Password'}</span>
                </button>
              </div>

            </form>
          </div>

        </div>

      </main>
    </div>
  );
}