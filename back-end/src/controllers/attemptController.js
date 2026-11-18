/**
 * Attempt Controller
 * Menghubungkan endpoint submit jawaban dan hasil ujian ke examService
 * Endpoint:
 * - POST /attempts/:id/submit
 * - GET  /attempts/:id/result
 */

import * as examService from '../services/examService.js';
import { attempts } from '../data/memoryStore.js';

/**
 * Mengirim jawaban peserta untuk dinilai di server
 * POST /attempts/:id/submit
 */
export function submitExam(req, res, next) {
  try {
    const attemptId = req.params.id;
    const attempt = attempts.find(a => a.id === attemptId);

    // Utamakan course_id dari attempt record agar selalu konsisten dengan UUID store
    const courseId = attempt?.course_id || req.body.courseId;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'courseId tidak ditemukan untuk attempt ini.'
      });
    }

    // Jawaban peserta (bisa dikirim dalam { answers: { ... } } atau langsung { ... })
    const submittedAnswers = req.body.answers || req.body;

    const result = examService.submitExam(attemptId, courseId, submittedAnswers);

    return res.status(200).json({
      ...result,
      // Alias untuk kompatibilitas penuh dengan Front-End dan DB Schema
      id: result.attemptId,
      finalScore: result.nilai,
      totalScore: result.nilai,
      isPassed: result.lulus,
      success: true
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Mengambil skor akhir, status kelulusan, analisis topik lemah, kunci jawaban, dan pembahasan
 * GET /attempts/:id/result
 */
export function getAttemptResult(req, res, next) {
  try {
    const attemptId = req.params.id;
    const attempt = attempts.find(a => a.id === attemptId);

    // Jika user terautentikasi gunakan id-nya, jika tidak fallback ke pemilik attempt
    const userId = req.user?.id || attempt?.user_id || 'demo-student-01';

    const result = examService.getAttemptResult(attemptId, userId);

    return res.status(200).json({
      ...result,
      id: result.attemptId,
      finalScore: result.nilai,
      totalScore: result.nilai,
      isPassed: result.lulus,
      success: true
    });
  } catch (err) {
    next(err);
  }
}
