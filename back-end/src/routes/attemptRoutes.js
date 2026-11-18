/**
 * Attempt Routes
 * Menangani rute pengiriman jawaban dan perolehan hasil ujian
 * Rute:
 * - POST /attempts/:id/submit
 * - GET  /attempts/:id/result
 */

import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { validateSubmitExam } from '../middlewares/validators.js';
import * as attemptController from '../controllers/attemptController.js';

const router = Router();

const flexibleAuth = (req, res, next) => {
  if (req.headers['authorization']) {
    return authenticate(req, res, next);
  }
  next();
};

// POST /attempts/:id/submit - Mengirim jawaban ujian untuk dinilai di server
router.post('/:id/submit', flexibleAuth, validateSubmitExam, attemptController.submitExam);

// GET /attempts/:id/result - Mengambil hasil skor, pembahasan, dan topik lemah
router.get('/:id/result', flexibleAuth, attemptController.getAttemptResult);

export default router;
