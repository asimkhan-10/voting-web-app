import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { Vote, Trophy, LogOut, ShieldCheck, User, Menu, X, Sun, Moon, LayoutDashboard } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 dark:border-[#2A2D3A] bg-white/90 dark:bg-[#16181E]/90 backdrop-blur-xl shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="p-2 bg-orange-50 dark:bg-[#3D2818] border border-orange-200 dark:border-[#f97316]/30 rounded-xl group-hover:scale-105 transition-transform shadow-xs">
              <Vote className="w-5 h-5 text-orange-500" />
            </div>
            <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500">
              VoteChain
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <Link
              to="/dashboard"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/dashboard') 
                  ? 'bg-orange-50 dark:bg-[#252834] text-orange-600 dark:text-orange-400 border border-orange-200/80 dark:border-[#2A2D3A] shadow-xs' 
                  : 'text-slate-600 dark:text-[#9E9E9E] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#20232D]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-orange-500" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/candidates"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/candidates') 
                  ? 'bg-orange-50 dark:bg-[#252834] text-orange-600 dark:text-orange-400 border border-orange-200/80 dark:border-[#2A2D3A] shadow-xs' 
                  : 'text-slate-600 dark:text-[#9E9E9E] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#20232D]'
              }`}
            >
              <Vote className="w-4 h-4 text-orange-500" />
              <span>Ballot & Voting</span>
            </Link>

            <Link
              to="/leaderboard"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/leaderboard') 
                  ? 'bg-teal-50 dark:bg-[#1A3326] text-teal-600 dark:text-[#34D399] border border-teal-200/80 dark:border-[#34D399]/30 shadow-xs' 
                  : 'text-slate-600 dark:text-[#9E9E9E] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#20232D]'
              }`}
            >
              <Trophy className="w-4 h-4 text-teal-600 dark:text-[#34D399]" />
              <span>Leaderboard</span>
            </Link>

            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/admin') 
                    ? 'bg-indigo-50 dark:bg-[#1B2A4A] text-indigo-600 dark:text-[#60A5FA] border border-indigo-200 dark:border-[#60A5FA]/30 shadow-xs' 
                    : 'text-slate-600 dark:text-[#9E9E9E] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#20232D]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-[#60A5FA]" />
                <span>Admin Panel</span>
              </Link>
            )}
          </div>

          {/* Desktop Right Action Menu */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-[#9E9E9E] hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#20232D] hover:bg-slate-200/80 dark:hover:bg-[#252834] border border-slate-200 dark:border-[#2A2D3A] transition-colors cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <Link
              to="/profile"
              className="flex items-center gap-2.5 p-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#20232D] hover:bg-slate-200/80 dark:hover:bg-[#252834] border border-slate-200 dark:border-[#2A2D3A] transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {user?.cnic ? String(user.cnic).slice(0, 3) : 'USR'}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                  {user?.role === 'admin' ? 'Administrator' : 'Voter'}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  {user?.cnic || 'CNIC'}
                </span>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-[#F472B6] hover:bg-rose-50 dark:hover:bg-[#3B1E2E] rounded-xl transition-colors border border-transparent hover:border-rose-200 dark:hover:border-[#F472B6]/30 cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Right Bar Actions & Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-[#9E9E9E] bg-slate-100 dark:bg-[#20232D] border border-slate-200 dark:border-[#2A2D3A]"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <Link
              to="/profile"
              className="p-2 bg-slate-100 dark:bg-[#20232D] border border-slate-200 dark:border-[#2A2D3A] rounded-xl text-orange-500"
            >
              <User className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#20232D] rounded-xl transition-colors border border-slate-200 dark:border-[#2A2D3A]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-[#2A2D3A] bg-white/95 dark:bg-[#16181E]/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2 animate-fadeIn shadow-lg">
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 p-3 rounded-xl text-sm font-semibold transition-colors ${
              isActive('/dashboard') 
                ? 'bg-orange-50 dark:bg-[#252834] text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-[#2A2D3A]' 
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#20232D]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-orange-500" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/candidates"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 p-3 rounded-xl text-sm font-semibold transition-colors ${
              isActive('/candidates') 
                ? 'bg-orange-50 dark:bg-[#252834] text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-[#2A2D3A]' 
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#20232D]'
            }`}
          >
            <Vote className="w-4 h-4 text-orange-500" />
            <span>Ballot & Voting</span>
          </Link>

          <Link
            to="/leaderboard"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 p-3 rounded-xl text-sm font-semibold transition-colors ${
              isActive('/leaderboard') 
                ? 'bg-teal-50 dark:bg-[#1A3326] text-teal-600 dark:text-[#34D399] border border-teal-200 dark:border-[#34D399]/30' 
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#20232D]'
            }`}
          >
            <Trophy className="w-4 h-4 text-teal-600 dark:text-[#34D399]" />
            <span>Leaderboard</span>
          </Link>

          {user?.role === 'admin' && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2.5 p-3 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/admin') 
                  ? 'bg-indigo-100 dark:bg-[#1B2A4A] text-indigo-800 dark:text-[#60A5FA] border border-indigo-300 dark:border-[#60A5FA]/30' 
                  : 'text-indigo-600 dark:text-[#60A5FA] hover:bg-indigo-50 dark:hover:bg-[#1B2A4A]/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-[#60A5FA]" />
              <span>Admin Panel</span>
            </Link>
          )}

          <Link
            to="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 p-3 rounded-xl text-sm font-semibold transition-colors ${
              isActive('/profile') 
                ? 'bg-slate-100 dark:bg-[#20232D] text-slate-900 dark:text-white border border-slate-200 dark:border-[#2A2D3A]' 
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#20232D]'
            }`}
          >
            <User className="w-4 h-4 text-orange-500" />
            <span>Account Profile ({user?.cnic || 'CNIC'})</span>
          </Link>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleLogout();
            }}
            className="w-full flex items-center gap-2.5 p-3 rounded-xl text-sm font-semibold text-rose-600 dark:text-[#F472B6] hover:bg-rose-50 dark:hover:bg-[#3B1E2E] border border-rose-100 dark:border-[#F472B6]/30 transition-colors"
          >
            <LogOut className="w-4 h-4 text-rose-600 dark:text-[#F472B6]" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
}