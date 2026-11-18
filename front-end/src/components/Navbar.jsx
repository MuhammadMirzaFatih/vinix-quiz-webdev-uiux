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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Title */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#003399] via-blue-700 to-sky-400 flex items-center justify-center text-white shadow-md shadow-blue-100 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight leading-none">
                  <span className="text-[#003399]">VINIX</span>
                  <span className="text-[#FBE156] drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">7</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-blue-50 text-[#003399] rounded-md border border-blue-200">
                  Gating MVP
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">Interactive Mini-Course & Assessment</p>
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
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    active
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Progress Pill & Demo Tools & User */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Overall Progress Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-700 border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{summary.passedCount} / {summary.totalCourses} Modul Lulus</span>
              <span className="font-bold text-indigo-600">({summary.percentage}%)</span>
            </div>

            {/* Quick Demo Controls Dropdown for Evaluator */}
            <div className="relative">
              <button
                onClick={() => setDevToolsOpen(!devToolsOpen)}
                title="Demo & Evaluasi Tools"
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
              >
                <Sparkles className="w-4 h-4" />
              </button>
              {devToolsOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Evaluator Controls</p>
                  <button
                    onClick={() => { unlockAllForDemo(); setDevToolsOpen(false); }}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-indigo-600" />
                    Buka Semua Gembok (Demo)
                  </button>
                  <button
                    onClick={() => { resetProgress(); setDevToolsOpen(false); }}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Ulang Progres (Awal)
                  </button>
                </div>
              )}
            </div>

            {/* User profile */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={user.nama}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
                />
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-bold text-slate-800 leading-tight">{user.nama}</p>
                  <p className="text-[10px] text-slate-500 leading-tight">{user.email}</p>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
              >
                Masuk
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600" />
              <span className="text-xs font-bold text-slate-800">{user?.nama || 'Tamu'}</span>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
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
                    active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-indigo-600" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Quick Demo Controls on Mobile */}
          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => { unlockAllForDemo(); setMobileMenuOpen(false); }}
              className="flex-1 py-2 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-lg text-center"
            >
              Demo: Buka Semua
            </button>
            <button
              onClick={() => { resetProgress(); setMobileMenuOpen(false); }}
              className="flex-1 py-2 text-xs font-semibold bg-rose-50 text-rose-600 rounded-lg text-center"
            >
              Reset Progres
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
