/**
 * Course Controller
 * Menghubungkan endpoint kurikulum dan modul ke courseService & examService
 * Endpoint:
 * - GET  /courses
 * - GET  /courses/:id
 * - POST /courses/:id/sections/:sid/complete
 * - POST /courses/:id/exam/start
 */

import * as courseService from '../services/courseService.js';
import * as examService from '../services/examService.js';
import { courses, initUserProgress } from '../data/memoryStore.js';

/**
 * Helper untuk mencocokkan ID course fleksibel (UUID, 'c1', '1', atau 'modul-1')
 */
function resolveCourseId(rawId) {
  if (!rawId) return rawId;
  const match = courses.find(c =>
    c.id === rawId ||
    String(c.urutan) === String(rawId) ||
    `c${c.urutan}` === String(rawId).toLowerCase() ||
    `modul-${c.urutan}` === String(rawId).toLowerCase()
  );
  return match ? match.id : rawId;
}

/**
 * Helper untuk format course agar 100% kompatibel dengan camelCase (Front-End)
 * dan snake_case (PostgreSQL / Supabase Schema)
 */
function formatCourse(course) {
  return {
    ...course,
    // CamelCase untuk komponen Front-End (CourseCard, ProgressBar, dll)
    bagianSelesai: course.bagian_selesai || course.bagianSelesai || [],
    nilaiTerbaik: course.nilai_terbaik ?? course.nilaiTerbaik ?? 0,
    totalSections: course.total_sections ?? course.totalSections ?? 3,
    isCompleted: course.is_completed ?? course.isCompleted ?? (course.status === 'passed'),
    estimasiWaktu: course.estimasi_waktu || course.estimasiWaktu || '45 Menit',
    referensiEksternal: course.referensi_eksternal || course.referensiEksternal || '',
    pdfUrl: course.pdf_url || course.pdfUrl || null,
    // Tetap sertakan field schema database
    bagian_selesai: course.bagian_selesai || course.bagianSelesai || [],
    nilai_terbaik: course.nilai_terbaik ?? course.nilaiTerbaik ?? 0,
    total_sections: course.total_sections ?? course.totalSections ?? 3,
    is_completed: course.is_completed ?? course.isCompleted ?? (course.status === 'passed')
  };
}

/**
 * Mengambil daftar seluruh course beserta status gating dan nilai terbaik
 * GET /courses
 */
export function getAllCourses(req, res, next) {
  try {
    const userId = req.user?.id || req.query.userId || 'demo-student-01';
    initUserProgress(userId);

    const rawCourses = courseService.getAllCourses(userId);
    const formatted = rawCourses.map(formatCourse);

    return res.status(200).json(formatted);
  } catch (err) {
    next(err);
  }
}

/**
 * Mengambil detail course beserta konten materi per bagian
 * GET /courses/:id
 */
export function getCourseById(req, res, next) {
  try {
    const courseId = resolveCourseId(req.params.id);
    const userId = req.user?.id || req.query.userId || 'demo-student-01';
    initUserProgress(userId);

    const rawCourse = courseService.getCourseById(courseId, userId);

    const formatted = {
      ...formatCourse(rawCourse),
      sections: (rawCourse.sections || []).map(sec => ({
        ...sec,
        pdfUrl: sec.pdf_url || sec.pdfUrl || null,
        pdfTitle: sec.pdf_title || sec.pdfTitle || null
      }))
    };

    return res.status(200).json(formatted);
  } catch (err) {
    next(err);
  }
}

/**
 * Menandai bagian materi telah selesai dibaca
 * POST /courses/:id/sections/:sid/complete
 */
export function completeSection(req, res, next) {
  try {
    const courseId = resolveCourseId(req.params.id);
    const sectionUrutan = req.params.sid || req.params.sectionUrutan;
    const userId = req.user?.id || 'demo-student-01';
    initUserProgress(userId);

    const result = courseService.completeSectionForUser(userId, courseId, sectionUrutan);

    return res.status(200).json({
      success: true,
      message: 'Bagian materi ditandai selesai',
      bagianSelesai: result.bagian_selesai,
      bagian_selesai: result.bagian_selesai
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Memulai sesi ujian akhir (memvalidasi cooldown & merotasi Set A/B/C)
 * POST /courses/:id/exam/start
 */
export function startExam(req, res, next) {
  try {
    const courseId = resolveCourseId(req.params.id);
    const userId = req.user?.id || 'demo-student-01';
    initUserProgress(userId);

    const result = examService.startExam(userId, courseId);
    return res.status(200).json(result);
  } catch (err) {
    // Tangani error cooldown sesuai kontrak PRD (Status 429)
    if (err.error === 'COOLDOWN_ACTIVE' || err.status === 429) {
      return res.status(429).json({
        error: 'COOLDOWN_ACTIVE',
        message: err.message,
        remainingSeconds: err.remainingSeconds,
        cooldownUntil: err.cooldownUntil
      });
    }
    next(err);
  }
}
