import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';
import ProgressBar from '../components/ProgressBar';
import { 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Target,
  Zap
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { courses, summary, loading } = useProgress();

  // Find the next active course to resume
  const activeCourse = courses.find(c => c.status === 'unlocked') || courses[0];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-indigo-700/30">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-10 top-10 w-40 h-40 rounded-full bg-sky-400/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Tugas Akhir Magang VINIX7 &bull; Web Educational Technology</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight sm:leading-tight">
            Belajar Terstruktur dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-200">Progressive Gating</span>
          </h1>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Selamat datang kembali, <strong>{user?.nama || 'Peserta'}</strong>. Platform ini memastikan fondasi Web Development &amp; UI/UX Anda teruji tuntas melalui kurikulum 10 modul berjenjang dengan evaluasi kelulusan KKM 80.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {activeCourse ? (
              <Link
                to={`/courses/${activeCourse.id}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-300 hover:to-indigo-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-sky-500/20 transition-all hover:scale-102"
              >
                <span>Lanjutkan Modul {activeCourse.urutan}: {activeCourse.judul}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-colors"
              >
                <span>Lihat Semua Modul</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <Link
              to="/courses"
              className="px-5 py-3.5 rounded-xl bg-indigo-800/60 hover:bg-indigo-800 border border-indigo-600/40 text-xs font-bold text-slate-200 transition-colors"
            >
              Jelajahi Kurikulum
            </Link>
          </div>
        </div>
      </section>

      {/* Progress & Quick Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Modul Selesai */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">Modul Tuntas</p>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-slate-900">{summary.passedCount}</span>
              <span className="text-xs font-bold text-slate-400">/ 10 Modul</span>
            </div>
          </div>
        </div>

        {/* Persentase Kelulusan */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
            <Target className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-400">Progress Jalur</p>
              <span className="text-xs font-black text-indigo-600">{summary.percentage}%</span>
            </div>
            <div className="mt-2">
              <ProgressBar percentage={summary.percentage} showValue={false} size="sm" />
            </div>
          </div>
        </div>

        {/* Skor Rata-rata */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">Rerata Skor Terbaik</p>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-slate-900">{summary.averageScore}</span>
              <span className="text-xs font-bold text-slate-400">/ 100 Poin</span>
            </div>
          </div>
        </div>

        {/* Total Percobaan Ujian */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">Sesi Evaluasi</p>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-slate-900">{summary.totalAttempts}</span>
              <span className="text-xs font-bold text-slate-400">Kali Ujian</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Rules Card (PRD Alignment) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          Aturan Utama Progressive Gating (Sesuai PRD)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center mb-3">
              1
            </span>
            <h3 className="font-bold text-sm text-slate-900 mb-1">KKM Kelulusan 80</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Modul berikutnya hanya akan terbuka jika Anda mencapai nilai minimal 80 pada ujian akhir modul saat ini.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center mb-3">
              2
            </span>
            <h3 className="font-bold text-sm text-slate-900 mb-1">Evaluasi 60% PG + 40% Essay</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ujian terdiri dari 10 soal Pilihan Ganda dan 5 soal Essay studi kasus dengan pencocokan kata kunci otomatis.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center mb-3">
              3
            </span>
            <h3 className="font-bold text-sm text-slate-900 mb-1">Cooldown 1 Menit &amp; Rotasi Soal</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Jika belum lulus, sistem memberlakukan jeda waktu 1 menit dan menyajikan paket soal rotasi berikutnya (Set A &rarr; B &rarr; C).
            </p>
          </div>
        </div>
      </section>

      {/* Featured Courses Overview */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Kurikulum 10 Modul Berjenjang
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Dari Mindset Startup, UI/UX Design, HTML Semantik, hingga Integrasi Data &amp; Portofolio
            </p>
          </div>
          <Link
            to="/courses"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 6).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
