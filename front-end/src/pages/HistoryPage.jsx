import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStoredAttempts, INITIAL_COURSES } from '../api/mockData';
import { 
  History, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Clock, 
  Award, 
  BookOpen,
  Calendar
} from 'lucide-react';

export default function HistoryPage() {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    const list = getStoredAttempts().filter(a => a.selesai);
    // Sort descending by completion date
    list.sort((a, b) => new Date(b.selesai).getTime() - new Date(a.selesai).getTime());
    setAttempts(list);
  }, []);

  const getCourseInfo = (courseId) => {
    return INITIAL_COURSES.find(c => c.id === courseId) || { judul: 'Modul Pembelajaran', urutan: 1 };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
          <History className="w-4 h-4" />
          <span>Jejak Pembelajaran &amp; Evaluasi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Riwayat Percobaan Ujian Akhir
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Daftar seluruh sesi ujian yang pernah Anda tempuh beserta skor dan status kelulusan KKM 80.
        </p>
      </div>

      {attempts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
            <History className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Belum Ada Riwayat Ujian</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Anda belum pernah menyelesaikan ujian modul. Mulailah membaca materi pada Modul 1 dan kerjakan ujian akhirnya!
          </p>
          <div className="mt-6">
            <Link
              to="/courses/c1"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Mulai Modul 1 Sekarang</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {attempts.map((att) => {
            const course = getCourseInfo(att.courseId);
            const isPassed = att.nilai >= 80;

            return (
              <div
                key={att.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:border-indigo-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 ${
                      isPassed
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {att.nilai}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                        Modul {course.urutan}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        Percobaan #{att.attemptNumber} (Set {att.setPaket})
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {course.judul}
                    </h3>

                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(att.selesai).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(att.selesai).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Status badge & View Result CTA */}
                <div className="flex items-center justify-between sm:justify-end gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold ${
                      isPassed
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {isPassed ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Lulus (KKM 80)
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        Belum Lulus
                      </>
                    )}
                  </span>

                  <Link
                    to={`/result/${att.id}`}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 transition-colors"
                  >
                    <span>Lihat Ulasan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
