import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { 
  GraduationCap, 
  BookOpen, 
  History, 
  RotateCcw, 
  KeyRound, 
  Menu, 
  X, 
  User, 
  CheckCircle2, 
  LogOut,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { summary, resetProgress, unlockAllForDemo } = useProgress();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [devToolsOpen, setDevToolsOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Beranda', icon: GraduationCap },
    { to: '/courses', label: 'Daftar Modul', icon: BookOpen },
    { to: '/history', label: 'Riwayat Ujian', icon: History }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#090E20]/95 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Title */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded-lg p-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0052CC] to-[#003399] flex items-center justify-center text-white shadow-md shadow-blue-950 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-[#FBE156]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight leading-none">
                  <span className="text-blue-500">VINIX</span>
                  <span className="text-[#FBE156]">7</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-blue-950/80 text-blue-300 rounded-md border border-blue-800/60">
                  Gating MVP
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Interactive Mini-Course & Assessment</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
                    active
                      ? 'bg-blue-950/70 text-[#FBE156] border border-blue-800/50 shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#FBE156]' : 'text-slate-400'}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Progress Pill & Demo Tools & User */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Overall Progress Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#131D35] rounded-full text-xs font-medium text-slate-300 border border-slate-700/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{summary.passedCount} / {summary.totalCourses} Modul</span>
              <span className="font-bold text-[#FBE156]">({summary.percentage}%)</span>
            </div>

            {/* Quick Demo Controls Dropdown for Evaluator */}
            <div className="relative">
              <button
                onClick={() => setDevToolsOpen(!devToolsOpen)}
                title="Demo & Evaluasi Tools"
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors border border-transparent hover:border-slate-700"
              >
                <Sparkles className="w-4 h-4 text-[#FBE156]" />
              </button>
              {devToolsOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#131D35] border border-slate-700 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Evaluator Controls</p>
                  <button
                    onClick={() => { unlockAllForDemo(); setDevToolsOpen(false); }}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-blue-900/40 hover:text-white rounded-lg"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-[#FBE156]" />
                    Buka Semua Gembok (Demo)
                  </button>
                  <button
                    onClick={() => { resetProgress(); setDevToolsOpen(false); }}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-300 hover:bg-rose-950/40 rounded-lg"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Ulang Progres (Awal)
                  </button>
                </div>
              )}
            </div>

            {/* User profile with initials MF like VINIX7 LMS */}
            {user ? (
              <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-[#0B132B] font-extrabold text-xs flex items-center justify-center ring-2 ring-white/10 shrink-0">
                  {user.nama ? user.nama.split(' ').map(n=>n[0]).slice(0,2).join('') : 'MF'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-bold text-white leading-tight">{user.nama}</p>
                  <p className="text-[10px] text-slate-400 leading-tight">{user.email}</p>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-[#FBE156] hover:bg-[#F3D746] text-[#0A1124] text-xs font-extrabold rounded-lg shadow-sm transition-colors"
              >
                Masuk
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#090E20] px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-slate-200 text-[#0B132B] font-extrabold text-xs flex items-center justify-center">
                MF
              </div>
              <span className="text-xs font-bold text-white">{user?.nama || 'Tamu'}</span>
            </div>
            <span className="text-xs font-bold text-[#FBE156] bg-blue-950 px-2.5 py-1 rounded-full border border-blue-800/60">
              {summary.passedCount} / 10 Lulus
            </span>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold ${
                    active ? 'bg-blue-950/70 text-[#FBE156] border border-blue-800/60' : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#FBE156]" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Quick Demo Controls on Mobile */}
          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => { unlockAllForDemo(); setMobileMenuOpen(false); }}
              className="flex-1 py-2 text-xs font-semibold bg-blue-950/60 text-blue-300 border border-blue-800/50 rounded-lg text-center"
            >
              Demo: Buka Semua
            </button>
            <button
              onClick={() => { resetProgress(); setMobileMenuOpen(false); }}
              className="flex-1 py-2 text-xs font-semibold bg-rose-950/60 text-rose-300 border border-rose-800/50 rounded-lg text-center"
            >
              Reset Progres
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
