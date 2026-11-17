import React from 'react';
import { HelpCircle, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

export default function QuestionCard({
  question,
  answer,
  onAnswerChange,
  showResult = false,
  reviewData = null
}) {
  const isEssay = question.tipe === 'essay';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 transition-all">
      
      {/* Top Header: Question Meta */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-extrabold text-xs flex items-center justify-center">
            {question.urutan}
          </span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {isEssay ? 'Soal Essay Studi Kasus' : 'Soal Pilihan Ganda'}
          </span>
        </div>

        {/* Topic Badge */}
        <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full border border-slate-200">
          Topik: {question.topik}
        </span>
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
          {question.teks}
        </h3>
      </div>

      {/* Answer Form */}
      {!showResult ? (
        <div className="space-y-3">
          {isEssay ? (
            <div>
              <label 
                htmlFor={`essay-${question.id}`} 
                className="block text-xs font-bold text-slate-700 mb-2"
              >
                Tulis Uraian Analisis Anda:
              </label>
              <textarea
                id={`essay-${question.id}`}
                rows={5}
                value={answer || ''}
                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                placeholder="Tuliskan analisis komprehensif Anda di sini mengacu pada materi modul..."
                className="w-full p-4 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 leading-relaxed placeholder:text-slate-400"
              />
              <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                  Sertakan istilah kunci & konsep inti materi untuk skor maksimal (10 Poin).
                </span>
                <span>{(answer || '').length} Karakter</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2.5">
              {question.options?.map((option, idx) => {
                const isSelected = answer === option.id;
                const optionLetters = ['A', 'B', 'C', 'D'];
                return (
                  <label
                    key={option.id}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-indigo-50/70 border-indigo-400 ring-2 ring-indigo-200/60 shadow-sm'
                        : 'bg-white border-slate-200 hover:bg-slate-50/70 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option.id}
                      checked={isSelected}
                      onChange={() => onAnswerChange(question.id, option.id)}
                      className="sr-only"
                    />
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {optionLetters[idx] || idx + 1}
                    </div>
                    <span className={`text-sm leading-snug pt-0.5 ${isSelected ? 'font-bold text-indigo-950' : 'text-slate-700'}`}>
                      {option.teks}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Review / Result Mode */
        reviewData && (
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
            
            {/* Score pill */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Skor Diperoleh:</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                  reviewData.poin === 10
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                    : reviewData.poin >= 7
                      ? 'bg-amber-100 text-amber-800 border-amber-200'
                      : 'bg-rose-100 text-rose-800 border-rose-200'
                }`}
              >
                {reviewData.poin} / 10 Poin ({reviewData.label})
              </span>
            </div>

            {/* User's Answer */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <p className="font-bold text-slate-500 mb-1">Jawaban Anda:</p>
              <p className="text-slate-800 whitespace-pre-wrap">{reviewData.jawabanPengguna}</p>
            </div>

            {/* Explanation / Key Answer */}
            <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs">
              <p className="font-bold text-indigo-900 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                Pembahasan & Kunci Ideal:
              </p>
              <p className="text-indigo-950 leading-relaxed whitespace-pre-wrap">
                {isEssay ? reviewData.kunciJawaban : reviewData.pembahasan}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
