import React from 'react';
import { AlertCircle, HelpCircle, X } from 'lucide-react';

export default function ConfirmModal({
  isOpen,
  title = 'Konfirmasi Pengiriman Ujian',
  message,
  unansweredCount = 0,
  onConfirm,
  onCancel,
  confirmText = 'Ya, Kirim Sekarang',
  cancelText = 'Kembali Periksa'
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 animate-in zoom-in-95">
        
        {/* Header Icon */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
            unansweredCount > 0 ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'
          }`}>
            {unansweredCount > 0 ? <AlertCircle className="w-6 h-6" /> : <HelpCircle className="w-6 h-6" />}
          </div>
          <button
            onClick={onCancel}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          {title}
        </h3>
        
        {unansweredCount > 0 ? (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
            <p className="font-bold text-amber-950 mb-1">
              Perhatian: Masih ada {unansweredCount} soal yang belum dijawab!
            </p>
            Soal yang tidak diisi akan otomatis mendapatkan skor 0. Apakah Anda yakin ingin tetap mengirimkan jawaban Anda sekarang?
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
            {message || 'Seluruh 15 soal telah terisi. Sistem akan langsung mengkalkulasi skor Anda berdasarkan formula PRD (60% PG + 40% Essay).'}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-100 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
