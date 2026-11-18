/**
 * Progress Controller
 * Menghubungkan endpoint progres belajar peserta
 * Endpoint: GET /me/progress
 */

import { courses, attempts, progress, initUserProgress } from '../data/memoryStore.js';

/**
 * Mengambil ringkasan progres belajar peserta di seluruh course
 * GET /me/progress
 */
export function getProgress(req, res, next) {
  try {
    const userId = req.user?.id || 'demo-student-01';
    initUserProgress(userId);

    const userProgress = progress.filter(p => p.user_id === userId);
    const userAttempts = attempts.filter(a => a.user_id === userId);

    const passedCount = userProgress.filter(p => p.status === 'passed').length;
    const scores = userProgress.map(p => Number(p.nilai_terbaik || 0)).filter(s => s > 0);
    const averageScore = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

    const progressMap = {};
    courses.forEach(c => {
      const p = userProgress.find(up => up.course_id === c.id);
      progressMap[c.id] = {
        status: p ? p.status : (c.urutan === 1 ? 'unlocked' : 'locked'),
        bagianSelesai: p ? p.bagian_selesai : [],
        bagian_selesai: p ? p.bagian_selesai : [],
        nilaiTerbaik: p ? Number(p.nilai_terbaik || 0) : 0,
        nilai_terbaik: p ? Number(p.nilai_terbaik || 0) : 0
      };
    });

    const summary = {
      totalCourses: courses.length,
      passedCount,
      percentage: Math.round((passedCount / (courses.length || 10)) * 100),
      averageScore,
      totalAttempts: userAttempts.length,
      progressMap
    };

    return res.status(200).json(summary);
  } catch (err) {
    next(err);
  }
}
