import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import toast from 'react-hot-toast';
import { Vote, Lock, IdCard, ArrowRight, Sun, Moon } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({ cnic: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const { login } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.cnic || !formData.password) {
      toast.error('Please enter both CNIC and Password.');
      return;
    }

    setSubmitting(true);
    try {
      await login(formData);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Invalid credentials.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F1117] text-slate-900 dark:text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-200">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
      
      {/* Theme toggle top-right */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 dark:text-[#9E9E9E] hover:text-slate-900 dark:hover:text-white bg-white dark:bg-[#1C1E26] border border-slate-200 dark:border-[#2A2D3A] shadow-xs transition-colors cursor-pointer"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center items-center gap-3">
          <div className="p-3 bg-orange-50 dark:bg-[#3D2818] border border-orange-200 dark:border-[#FBBF24]/30 rounded-2xl glow-orange shadow-xs">
            <Vote className="w-8 h-8 text-orange-500" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500">
            VoteChain
          </span>
        </div>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-[#9E9E9E]">
          Or{' '}
          <Link to="/signup" className="font-semibold text-orange-500 dark:text-orange-400 hover:text-orange-600">
            create a new voter profile
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="glass-card py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-slate-200 dark:border-[#2A2D3A] bg-white dark:bg-[#1C1E26]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                CNIC / Identification Number
              </label>
              <div className="relative rounded-md shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IdCard className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  type="text"
                  name="cnic"
                  required
                  placeholder="e.g. 1234567890123"
                  value={formData.cnic}
                  onChange={handleChange}
                  className="glass-input block w-full pl-10 pr-3 py-2.5 rounded-xl text-sm dark:bg-[#20232D] dark:border-[#2A2D3A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative rounded-md shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="glass-input block w-full pl-10 pr-3 py-2.5 rounded-xl text-sm dark:bg-[#20232D] dark:border-[#2A2D3A]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-all disabled:opacity-50 glow-orange cursor-pointer"
            >
              {submitting ? 'Signing in...' : 'Sign In'}
              {!submitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}