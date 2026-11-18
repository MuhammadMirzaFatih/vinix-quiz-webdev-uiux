import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';
import { useProgress } from '../context/ProgressContext';
import ProgressBar from '../components/ProgressBar';
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Award, 
  Clock, 
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  FileText,
  Upload,
  Eye,
  Info,
  Download,
  AlertTriangle,
  RefreshCw,
  Link2
} from 'lucide-react';

/**
 * Normalizes any Google Drive / Google Slides sharing URL into an embeddable preview URL
 */
export function getPdfEmbedUrl(url) {
  if (!url) return '';
  // Google Drive file: /file/d/FILE_ID/view...
  const gDriveFileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (gDriveFileMatch && gDriveFileMatch[1]) {
    return `https://drive.google.com/file/d/${gDriveFileMatch[1]}/preview`;
  }
  // Google Drive link with id query param: ?id=FILE_ID
  const gDriveIdMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (gDriveIdMatch && gDriveIdMatch[1]) {
    return `https://drive.google.com/file/d/${gDriveIdMatch[1]}/preview`;
  }
  // Google Slides: /presentation/d/SLIDE_ID/...
  const gSlidesMatch = url.match(/\/presentation\/d\/([a-zA-Z0-9_-]+)/);
  if (gSlidesMatch && gSlidesMatch[1]) {
    return `https://docs.google.com/presentation/d/${gSlidesMatch[1]}/embed?start=false&loop=false&delayms=3000`;
  }
  return url;
}

export default function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshProgress } = useProgress();

  const [course, setCourse] = useState(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completingSection, setCompletingSection] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Mode: 'pdf' (Slide PPT/PDF) vs 'text' (Ringkasan Poin Kunci)
  const [viewMode, setViewMode] = useState('pdf');
  // Local uploaded PDFs (temporary object URLs for live preview)
  const [localPdfs, setLocalPdfs] = useState({});
  const [pdfStatus, setPdfStatus] = useState('checking'); // 'checking' | 'found' | 'not_found'
  const [showDriveModal, setShowDriveModal] = useState(false);
  const [driveInputUrl, setDriveInputUrl] = useState('');
  const fileInputRef = useRef(null);

  // Computed active PDF URL safely
  const activePdfUrl = React.useMemo(() => {
    if (!course) return '';
    const secs = course.sections || [];
    const sec = secs[activeSectionIndex] || secs[0];
    if (!sec) return '';
    return localPdfs[sec.id] || sec.pdfUrl || course.pdfUrl || `/materials/modul-${course.urutan}-bagian-${sec.urutan}.pdf`;
  }, [course, activeSectionIndex, localPdfs]);

  useEffect(() => {
    if (!activePdfUrl) return;
    if (activePdfUrl.startsWith('blob:') || activePdfUrl.includes('drive.google.com') || activePdfUrl.includes('docs.google.com')) {
      setPdfStatus('found');
      return;
    }
    let isMounted = true;
    setPdfStatus('checking');
    fetch(activePdfUrl, { method: 'HEAD' })
      .then(res => {
        if (isMounted) {
          setPdfStatus(res.ok ? 'found' : 'not_found');
        }
      })
      .catch(() => {
        if (isMounted) {
          setPdfStatus('found');
        }
      });
    return () => { isMounted = false; };
  }, [activePdfUrl]);

  useEffect(() => {
    async function loadCourse() {
      try {
        setLoading(true);
        const data = await apiClient.getCourseById(id);
        setCourse(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCourse();
  }, [id]);

  const handleMarkComplete = async (sectionUrutan) => {
    try {
      setCompletingSection(true);
      const res = await apiClient.completeSection(course.id, sectionUrutan);
      if (res.success) {
        setCourse(prev => ({
          ...prev,
          bagianSelesai: res.bagianSelesai
        }));
        setToastMessage(`Bagian ${sectionUrutan} berhasil ditandai selesai!`);
        refreshProgress();
        setTimeout(() => setToastMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCompletingSection(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center animate-pulse">
        <div className="w-1/2 h-8 bg-slate-200 rounded mx-auto mb-4" />
        <div className="w-3/4 h-4 bg-slate-200 rounded mx-auto mb-8" />
        <div className="h-64 bg-slate-200 rounded-2xl" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <h2 className="text-lg font-bold text-slate-800">Modul tidak ditemukan</h2>
        <Link to="/courses" className="mt-4 inline-block text-xs font-bold text-indigo-600 hover:underline">
          &larr; Kembali ke daftar modul
        </Link>
      </div>
    );
  }

  const isLocked = course.status === 'locked';
  const isPassed = course.status === 'passed';
  const sections = course.sections || [];
  const currentSection = sections[activeSectionIndex] || sections[0];
  const isCurrentSectionCompleted = course.bagianSelesai?.includes(currentSection.urutan);
  const totalSections = sections.length;
  const sectionsRead = course.bagianSelesai?.length || 0;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Back navigation */}
      <div>
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog Modul</span>
        </Link>
      </div>

      {/* Course Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold uppercase tracking-wider">
                Modul {course.urutan}
              </span>
              <span className="text-xs font-medium text-slate-400">&bull;</span>
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {course.estimasiWaktu || '45 Menit'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {course.judul}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              {course.ringkasan}
            </p>
          </div>

          {/* Status pill & Best score */}
          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            {isPassed ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Lulus Evaluasi ({course.nilaiTerbaik} Poin)
              </span>
            ) : isLocked ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-slate-100 text-slate-600 border border-slate-200">
                <Lock className="w-4 h-4 text-slate-500" />
                Modul Terkunci
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-800 border border-indigo-200">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                Sedang Ditempuh
              </span>
            )}
            <p className="text-[11px] text-slate-400">
              Syarat Lulus: Skor Ujian &ge; 80
            </p>
          </div>
        </div>

        {/* Progress Bar of reading */}
        <div className="pt-6">
          <ProgressBar
            current={sectionsRead}
            total={totalSections}
            label={`Progres Membaca Materi Modul (${sectionsRead}/${totalSections} Bagian)`}
            size="md"
          />
        </div>
      </div>

      {/* Locked Notification */}
      {isLocked && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-amber-900 flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-amber-950">Akses Modul Ini Masih Terkunci</h3>
            <p className="text-xs text-amber-800/90 mt-1 leading-relaxed">
              Sesuai aturan <em>Progressive Gating</em> PRD, Anda harus menyelesaikan dan lulus ujian akhir pada <strong>Modul {course.urutan - 1}</strong> dengan nilai minimal <strong>80</strong> untuk membuka modul ini.
            </p>
            <div className="mt-3">
              <Link
                to={`/courses/c${course.urutan - 1}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                <span>Buka Modul {course.urutan - 1} Sekarang &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Layout: Section Tabs + Section Reader + Exam CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Section List / Navigation */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-500">
            Daftar Materi Modul
          </h2>
          <div className="space-y-2">
            {sections.map((sec, idx) => {
              const isSelected = activeSectionIndex === idx;
              const isDone = course.bagianSelesai?.includes(sec.urutan);

              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSectionIndex(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-indigo-50/80 border-indigo-400 ring-2 ring-indigo-200/50 shadow-sm'
                      : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : isDone
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {sec.urutan}
                    </span>
                    <div>
                      <h4 className={`text-xs font-bold leading-snug ${isSelected ? 'text-indigo-950' : 'text-slate-800'}`}>
                        {sec.judul}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {isDone ? 'Telah dibaca' : 'Belum selesai'}
                      </p>
                    </div>
                  </div>

                  {isDone && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Exam Card CTA */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-indigo-700/50">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-sky-400 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base mb-1">Ujian Akhir Modul</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              15 Soal (10 Pilihan Ganda + 5 Essay Studi Kasus). Wajib mencapai skor minimal 80 untuk membuka modul berikutnya.
            </p>
            {isLocked ? (
              <button
                disabled
                className="w-full py-3 bg-slate-700 text-slate-400 font-bold text-xs rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Terkunci (Selesaikan Modul {course.urutan - 1})</span>
              </button>
            ) : (
              <button
                onClick={() => navigate(`/exam/${course.id}`)}
                className="w-full py-3 bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-300 hover:to-indigo-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{isPassed ? 'Ulangi / Coba Paket Soal Baru' : 'Mulai Ujian Akhir (15 Soal)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Section Reader */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            
            {/* Top Toolbar: Section Title & Mode Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <FileText className="w-4 h-4" />
                  {currentSection.judul}
                </span>
                <p className="text-xs text-slate-400">
                  {viewMode === 'pdf' ? 'Tampilan Dokumen Slide Asli' : 'Tampilan Rangkuman Poin Kunci'}
                </p>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setViewMode('pdf')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    viewMode === 'pdf'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Slide PPT / PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('text')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    viewMode === 'text'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Ringkasan Teks</span>
                </button>
              </div>
            </div>

            {/* Hidden File Input for uploading custom PDF */}
            <input
              type="file"
              ref={fileInputRef}
              accept="application/pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setLocalPdfs(prev => ({ ...prev, [currentSection.id]: url }));
                  setToastMessage(`File PDF '${file.name}' berhasil dimuat!`);
                  setTimeout(() => setToastMessage(''), 3500);
                }
              }}
            />

            {/* CONDITIONAL RENDER: PDF VIEWER vs TEXT SUMMARY */}
            {viewMode === 'pdf' ? (
              <div className="space-y-4">
                
                {/* PDF Header Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900 text-white rounded-2xl">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${pdfStatus === 'not_found' ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
                    <span className="text-xs font-bold tracking-wide">
                      {localPdfs[currentSection.id]
                        ? '📄 Membaca PDF Pilihan Anda'
                        : (currentSection.pdfTitle || 'Dokumen Slide PDF Modul')}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Link Google Drive button */}
                    <button
                      type="button"
                      onClick={() => {
                        setDriveInputUrl(localPdfs[currentSection.id] || '');
                        setShowDriveModal(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                      title="Masukkan link Google Drive atau Google Slides"
                    >
                      <Link2 className="w-3.5 h-3.5" />
                      <span>Link Google Drive</span>
                    </button>

                    {/* Pick from computer button */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                      title="Pilih file PDF materi dari komputer Anda"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Pilih PDF dari Laptop</span>
                    </button>

                    {/* Open in new tab */}
                    <a
                      href={activePdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
                      title="Buka dokumen di tab baru browser"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Layar Penuh / Tab Baru</span>
                    </a>

                    {/* Download button */}
                    <a
                      href={activePdfUrl}
                      download={`modul-${course.urutan}-bagian-${currentSection.urutan}.pdf`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
                      title="Unduh file PDF ke komputer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Unduh</span>
                    </a>
                  </div>
                </div>

                {/* Status Notice if local PDF not found on server */}
                {pdfStatus === 'not_found' && !activePdfUrl.includes('drive.google.com') && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs leading-relaxed">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold">File PDF belum terdeteksi di server: <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">{activePdfUrl}</code></p>
                      <p className="text-amber-800">
                        Anda dapat menampilkan slide dengan salah satu cara berikut:
                      </p>
                      <ul className="list-disc list-inside space-y-0.5 text-amber-800 pl-1">
                        <li><strong>Link Google Drive:</strong> Klik tombol hijau <strong>"Link Google Drive"</strong> di atas dan tempel link file PDF Anda.</li>
                        <li><strong>Pilih dari Komputer:</strong> Klik tombol <strong>"Pilih PDF dari Laptop"</strong> di atas untuk memuat file PDF dari laptop secara langsung.</li>
                        <li><strong>Restart Server:</strong> Jika file baru dimasukkan ke <code className="bg-amber-100 px-1 rounded font-mono">public/materials/</code>, restart dev server dengan <kbd className="bg-white px-1 border rounded">Ctrl+C</kbd> lalu <code className="bg-amber-100 px-1 rounded font-mono">npm run dev</code>.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Embedded PDF Viewer (Google Drive or Native Object) */}
                <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner min-h-[620px]">
                  {getPdfEmbedUrl(activePdfUrl).includes('drive.google.com') || getPdfEmbedUrl(activePdfUrl).includes('docs.google.com') ? (
                    <iframe
                      src={getPdfEmbedUrl(activePdfUrl)}
                      className="w-full h-[650px] border-0 rounded-2xl bg-white shadow-xs"
                      allow="autoplay"
                      title={currentSection.judul}
                    />
                  ) : (
                    <object
                      data={`${activePdfUrl}#toolbar=1`}
                      type="application/pdf"
                      className="w-full h-[640px] block"
                    >
                      <iframe
                        src={`${activePdfUrl}#toolbar=1`}
                        className="w-full h-[640px] border-0"
                        title={currentSection.judul}
                      >
                        <div className="flex flex-col items-center justify-center p-8 bg-slate-50 text-center space-y-4 h-full">
                          <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                            <FileText className="w-7 h-7" />
                          </div>
                          <div className="max-w-md">
                            <h4 className="text-base font-bold text-slate-800">Pratinjau PDF di Browser</h4>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                              Browser Anda mungkin memblokir pratinjau dokumen langsung di dalam frame. Silakan gunakan tombol berikut untuk membuka dokumen atau gunakan Google Drive:
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center justify-center gap-3">
                            <a
                              href={activePdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>Buka PDF di Tab Baru</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold rounded-xl shadow-xs transition-colors"
                            >
                              <Upload className="w-4 h-4" />
                              <span>Pilih PDF dari Laptop</span>
                            </button>
                          </div>
                        </div>
                      </iframe>
                    </object>
                  )}
                </div>

                {/* Helpful Instruction Tip */}
                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 text-indigo-950 flex items-start gap-3 text-xs leading-relaxed">
                  <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div className="space-y-1.5">
                    <p className="font-bold">Tips Membaca PDF & Troubleshooting Pratinjau:</p>
                    <ul className="list-disc list-inside space-y-1 text-indigo-900">
                      <li><strong>Jika Muncul Tampilan Kosong/Abu-abu:</strong> Di browser Chrome/Edge, buka tab baru ke <code className="bg-indigo-100 px-1 py-0.5 rounded font-mono">chrome://settings/content/pdfDocuments</code>, lalu pastikan memilih <em>"Open PDFs in Chrome"</em> (Buka PDF di Chrome), bukan <em>"Download PDFs"</em> (Unduh PDF).</li>
                      <li><strong>Buka Layar Penuh:</strong> Klik tombol <strong>"Layar Penuh / Tab Baru"</strong> di atas jika ingin membaca PDF di jendela browser tersendiri yang lebih leluasa.</li>
                      <li><strong>Beralih ke Teks Rangkuman:</strong> Anda juga dapat beralih ke tab <strong>"Ringkasan Teks"</strong> di kanan atas jika ingin membaca intisari materi tanpa dokumen slide.</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              /* Text / Markdown Mode */
              <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-4">
                {currentSection.isi.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={pIdx} className="text-lg font-bold text-slate-900 pt-2 border-b border-slate-100 pb-2">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('#### ')) {
                    return (
                      <h4 key={pIdx} className="text-sm font-bold text-indigo-900 pt-1">
                        {paragraph.replace('#### ', '')}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('> ')) {
                    return (
                      <blockquote key={pIdx} className="p-4 bg-indigo-50/60 border-l-4 border-indigo-500 rounded-r-xl text-indigo-950 text-xs italic">
                        {paragraph.replace('> ', '')}
                      </blockquote>
                    );
                  }
                  if (paragraph.startsWith('```')) {
                    const cleaned = paragraph.replace(/```[a-z]*/g, '').trim();
                    return (
                      <pre key={pIdx} className="p-4 bg-slate-900 text-sky-300 font-mono text-xs rounded-xl overflow-x-auto">
                        <code>{cleaned}</code>
                      </pre>
                    );
                  }
                  return (
                    <p key={pIdx} className="text-slate-700 whitespace-pre-line">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            )}

            {/* Section Reader Footer: Mark Complete Button */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400">
                  Bagian {activeSectionIndex + 1} dari {sections.length}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleMarkComplete(currentSection.urutan)}
                  disabled={completingSection || isCurrentSectionCompleted}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                    isCurrentSectionCompleted
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isCurrentSectionCompleted ? 'Sudah Ditandai Selesai' : 'Tandai Selesai Dibaca'}</span>
                </button>

                {activeSectionIndex < sections.length - 1 && (
                  <button
                    onClick={() => setActiveSectionIndex(prev => prev + 1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <span>Lanjut Bagian Berikutnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Tempel Link Google Drive */}
      {showDriveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Link2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Masukkan Link Google Drive</h3>
                <p className="text-xs text-slate-500">Slide PDF / Google Slides akan langsung tertanam di sini</p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Link Berbagi Google Drive / Slides:</label>
              <input
                type="url"
                placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                value={driveInputUrl}
                onChange={(e) => setDriveInputUrl(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-[11px] text-slate-400 leading-relaxed">
                *Pastikan akses link di Google Drive disetel ke <strong>"Siapa saja yang memiliki link" (Anyone with the link can view)</strong>.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowDriveModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  if (driveInputUrl.trim()) {
                    setLocalPdfs(prev => ({ ...prev, [currentSection.id]: driveInputUrl.trim() }));
                    setToastMessage('Link Google Drive berhasil ditautkan!');
                    setShowDriveModal(false);
                    setTimeout(() => setToastMessage(''), 3500);
                  }
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs"
              >
                Terapkan Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
