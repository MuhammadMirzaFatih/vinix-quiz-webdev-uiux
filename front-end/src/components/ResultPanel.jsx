import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Layers, 
  Calculator,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ResultPanel({ result, courseId, nextCourseId }) {
  const isPassed = result.finalScore >= 80;

  useEffect(() => {
    if (isPassed) {
      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore in non-browser env
      }
    }
  }, [isPassed]);

  return (
    <div
      className={`rounded-3xl border p-6 sm:p-10 shadow-lg transition-all ${
        isPassed
          ? 'bg-gradient-to-br from-emerald-50 via-white to-teal-50/40 border-emerald-200'
          : 'bg-gradient-to-br from-rose-50 via-white to-amber-50/40 border-rose-200'
      }`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Badge & Pass Status */}
        <div className="flex items-center gap-6 text-center md:text-left">
          <div
            className={`w-24 h-24 rounded-3xl flex items-center justify-center font-black text-3xl shadow-inner shrink-0 ${
              isPassed
                ? 'bg-emerald-500 text-white ring-8 ring-emerald-100 shadow-emerald-200'
                : 'bg-rose-500 text-white ring-8 ring-rose-100 shadow-rose-200'
            }`}
          >
            {result.finalScore}
          </div>

          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isPassed
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {isPassed ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Lulus Evaluasi (KKM 80)
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5" />
                    Belum Memenuhi KKM 80
                  </>
                )}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                Percobaan #{result.attemptNumber || 1} (Set {result.setPaket || 'A'})
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isPassed ? 'Selamat, Anda Berhasil Lulus!' : 'Tetap Semangat, Evaluasi Mandiri'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              {isPassed
                ? 'Pemahaman fondasi Anda telah tervalidasi. Modul berikutnya dalam kurikulum berjenjang telah otomatis terbuka!'
                : 'Anda belum mencapai syarat skor kelulusan minimal 80. Tinjau pembahasan dan analisis topik lemah sebelum mengulang.'}
            </p>
          </div>
        </div>

        {/* Right CTA */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
          {isPassed && nextCourseId ? (
            <Link
              to={`/courses/${nextCourseId}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-200 transition-all hover:scale-102"
            >
              <span>Lanjut ke Modul Berikutnya</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              to={`/courses/${courseId}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-sm rounded-xl shadow-sm transition-all"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Pelajari Ulang Materi Modul</span>
            </Link>
          )}
        </div>
      </div>

      {/* Breakdown Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-200/60">
        
        {/* Pilihan Ganda */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Poin Pilihan Ganda (Bobot 60%)</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-slate-900">{result.totalPG || 0}</span>
            <span className="text-xs font-bold text-slate-400">/ 100 Poin</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Kontribusi: {((0.60 * ((result.totalPG || 0) / 100)) * 100).toFixed(1)} Poin
          </p>
        </div>

        {/* Essay Studi Kasus */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Poin Essay Studi Kasus (Bobot 40%)</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-slate-900">{result.totalEssay || 0}</span>
            <span className="text-xs font-bold text-slate-400">/ 50 Poin</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Kontribusi: {((0.40 * ((result.totalEssay || 0) / 50)) * 100).toFixed(1)} Poin
          </p>
        </div>

        {/* Rumus Penilaian PRD */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-indigo-600" />
            Formula Nilai Akhir PRD
          </p>
          <div className="mt-1.5 text-[11px] font-mono text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200 leading-relaxed">
            [0.60 &times; (PG/100) + 0.40 &times; (Essay/50)] &times; 100
          </div>
        </div>
      </div>
    </div>
  );
}
