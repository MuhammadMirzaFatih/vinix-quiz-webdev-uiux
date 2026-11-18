/**
 * Progress Routes
 * Menangani rute ringkasan progres belajar peserta
 * Rute:
 * - GET /me/progress
 */

import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import * as progressController from '../controllers/progressController.js';

const router = Router();

const flexibleAuth = (req, res, next) => {
  if (req.headers['authorization']) {
    return authenticate(req, res, next);
  }
  next();
};

// GET /progress (di-mount pada /api/me dan /me -> /me/progress)
router.get('/progress', flexibleAuth, progressController.getProgress);

export default router;
