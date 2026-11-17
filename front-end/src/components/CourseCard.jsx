import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  BookOpen, 
  Award,
  Sparkles,
  Lightbulb,
  Palette,
  Users,
  Layers,
  Smartphone,
  Code2,
  GitPullRequest,
  Database
} from 'lucide-react';
import ProgressBar from './ProgressBar';

const ICON_MAP = {
  Lightbulb,
  Palette,
  Users,
  Layers,
  Smartphone,
  Code2,
  GitPullRequest,
  Database,
  Sparkles,
  Award
};

export default function CourseCard({ course }) {
  const isLocked = course.status === 'locked';
  const isPassed = course.status === 'passed';
  const isUnlocked = course.status === 'unlocked';

  const IconComponent = ICON_MAP[course.icon] || BookOpen;
  const sectionsRead = course.bagianSelesai?.length || 0;
  const totalSections = course.sections?.length || 3;
  const readPercentage = Math.round((sectionsRead / totalSections) * 100);

  return (
    <div
      className={`relative rounded-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden border ${
        isLocked
          ? 'bg-slate-100/70 border-slate-200 opacity-80'
          : isPassed
            ? 'bg-white border-emerald-200/80 shadow-md shadow-emerald-50/50 hover:shadow-lg hover:border-emerald-300'
            : 'bg-white border-indigo-200/80 shadow-md shadow-indigo-50/50 hover:shadow-xl hover:border-indigo-400 group'
      }`}
    >
      {/* Top Banner / Status Badge */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-3 mb-4">
          
          {/* Module Number & Icon */}
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-base transition-colors ${
                isLocked
                  ? 'bg-slate-200 text-slate-400'
                  : isPassed
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-indigo-50 text-indigo-600 border border-indigo-200 group-hover:bg-indigo-600 group-hover:text-white'
              }`}
            >
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Modul {course.urutan}
              </span>
              <h3 className="font-bold text-base text-slate-900 leading-snug line-clamp-1">
                {course.judul}
              </h3>
            </div>
          </div>

          {/* Gating Status Pill */}
          <div>
            {isLocked && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-200/80 text-slate-600 border border-slate-300">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                Terkunci
              </span>
            )}
            {isPassed && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Lulus ({course.nilaiTerbaik} Poin)
              </span>
            )}
            {isUnlocked && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Terbuka
              </span>
            )}
          </div>
        </div>

        {/* Course Description */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
          {course.ringkasan}
        </p>

        {/* Meta Info: Time, Category */}
        <div className="flex items-center gap-4 text-[11px] font-medium text-slate-500 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {course.estimasiWaktu || '45 Menit'}
          </span>
          <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-600 font-semibold">
            {course.kategori}
          </span>
        </div>

        {/* Reading Progress */}
        <div className="pt-2 border-t border-slate-100">
          <ProgressBar
            current={sectionsRead}
            total={totalSections}
            label={`Materi Dibaca (${sectionsRead}/${totalSections})`}
            size="sm"
          />
        </div>
      </div>

      {/* Card Action Footer */}
      <div className={`p-4 px-6 border-t ${isLocked ? 'bg-slate-50/60 border-slate-200' : 'bg-slate-50/40 border-slate-100'}`}>
        {isLocked ? (
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              Syarat: Lulus Modul {course.urutan - 1} (KKM 80)
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              {isPassed ? 'Ujian telah tuntas' : 'Ujian Akhir: 15 Soal'}
            </span>
            <Link
              to={`/courses/${course.id}`}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                isPassed
                  ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100'
              }`}
            >
              <span>{isPassed ? 'Buka Modul' : 'Mulai Belajar'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
