/**
 * Progress Controller
 * Menghubungkan endpoint progres belajar peserta ke progressService
 */

import * as progressService from '../services/progressService.js';

export async function getProgress(req, res, next) {
  try {
    const userId = req.user?.id || 'demo-student-01';
    const summary = await progressService.getUserProgressSummary(userId);
    return res.status(200).json(summary);
  } catch (err) {
    next(err);
  }
}