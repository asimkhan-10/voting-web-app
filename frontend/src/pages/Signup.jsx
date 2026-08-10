import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import toast from 'react-hot-toast';
import { Vote, IdCard, Lock, Mail, Phone, MapPin, UserCheck, ArrowRight, Sun, Moon } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({
    cnic: '',
    password: '',
    age: '',
    email: '',
    mobile: '',
    address: '',
    role: 'voter'
  });

  const [submitting, setSubmitting] = useState(false);
  const { signup } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(formData.age) < 18) {
      toast.error('You must be at least 18 years old to register.');
      return;
    }

    setSubmitting(true);
    try {
      await signup({ ...formData, age: Number(formData.age) });
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Registration failed.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F1117] text-slate-900 dark:text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-200">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

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
          Create Voter Account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-[#9E9E9E]">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-orange-500 dark:text-orange-400 hover:text-orange-600">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
        <div className="glass-card py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-slate-200 dark:border-[#2A2D3A] bg-white dark:bg-[#1C1E26]">
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* CNIC */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">CNIC Number</label>
              <div className="relative rounded-md shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IdCard className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  type="text"
                  name="cnic"
                  required
                  placeholder="1234567890123"
                  value={formData.cnic}
                  onChange={handleChange}
                  className="glass-input block w-full pl-10 pr-3 py-2 rounded-xl text-sm dark:bg-[#20232D] dark:border-[#2A2D3A]"
                />
              </div>
            </div>

            {/* Password & Age */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Password</label>
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
                    className="glass-input block w-full pl-10 pr-3 py-2 rounded-xl text-sm dark:bg-[#20232D] dark:border-[#2A2D3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Age (Min 18)</label>
                <div className="relative rounded-md shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserCheck className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="number"
                    name="age"
                    min="18"
                    required
                    placeholder="18"
                    value={formData.age}
                    onChange={handleChange}
                    className="glass-input block w-full pl-10 pr-3 py-2 rounded-xl text-sm dark:bg-[#20232D] dark:border-[#2A2D3A]"
                  />
                </div>
              </div>
            </div>

            {/* Email & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <div className="relative rounded-md shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="glass-input block w-full pl-10 pr-3 py-2 rounded-xl text-sm dark:bg-[#20232D] dark:border-[#2A2D3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Mobile Number</label>
                <div className="relative rounded-md shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="text"
                    name="mobile"
                    placeholder="03001234567"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="glass-input block w-full pl-10 pr-3 py-2 rounded-xl text-sm dark:bg-[#20232D] dark:border-[#2A2D3A]"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Residential Address</label>
              <div className="relative rounded-md shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="House #, Street, City"
                  value={formData.address}
                  onChange={handleChange}
                  className="glass-input block w-full pl-10 pr-3 py-2 rounded-xl text-sm dark:bg-[#20232D] dark:border-[#2A2D3A]"
                />
              </div>
            </div>

            {/* Role Switcher */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Account Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="glass-input block w-full px-3 py-2 rounded-xl text-sm dark:bg-[#20232D] dark:border-[#2A2D3A] dark:text-white"
              >
                <option value="voter" className="bg-white dark:bg-[#1C1E26] text-slate-900 dark:text-white">Voter</option>
                <option value="admin" className="bg-white dark:bg-[#1C1E26] text-slate-900 dark:text-white">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-4 w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-all disabled:opacity-50 glow-orange cursor-pointer"
            >
              {submitting ? 'Creating Account...' : 'Complete Registration'}
              {!submitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}