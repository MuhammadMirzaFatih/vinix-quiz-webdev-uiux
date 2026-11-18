/**
 * Exam Service
 * Mengelola siklus ujian: start → submit → result
 * Menggunakan scoringEngine, rotationService, dan gatingService
 */

import { v4 as uuidv4 } from 'uuid';
import {
  questions, options, essay_rubrics,
  attempts, answers, progress, courses
} from '../data/memoryStore.js';
import { evaluateEssay, calculateFinalScore } from './scoringEngine.js';
import { determineSetPaket } from './rotationService.js';
import { checkCooldownActive, computeCooldownDate } from './gatingService.js';

/**
 * Mulai sesi ujian baru
 * - Validasi cooldown (PRD: 60 detik jika nilai < 80)
 * - Tentukan set paket (A/B/C berdasarkan attempt_number)
 * - Ambil soal tanpa kunci jawaban (aturan keamanan mutlak)
 */
export function startExam(userId, courseId) {
  const course = courses.find(c => c.id === courseId);
  if (!course) {
    const err = new Error('Modul tidak ditemukan.');
    err.status = 404;
    throw err;
  }

  // Cek status progress (harus unlocked atau passed agar bisa ujian)
  const prog = progress.find(p => p.user_id === userId && p.course_id === courseId);
  if (!prog || prog.status === 'locked') {
    const err = new Error('Modul ini masih terkunci. Selesaikan modul sebelumnya terlebih dahulu.');
    err.status = 403;
    throw err;
  }

  // Riwayat attempt user di course ini, diurutkan dari terlama
  const userCourseAttempts = attempts
    .filter(a => a.user_id === userId && a.course_id === courseId)
    .sort((a, b) => new Date(a.mulai) - new Date(b.mulai));

  const lastAttempt = userCourseAttempts[userCourseAttempts.length - 1];

  // Validasi cooldown (PRD Bagian 6 & 7)
  if (lastAttempt && !lastAttempt.lulus && lastAttempt.cooldown_until) {
    const cooldown = checkCooldownActive(lastAttempt.cooldown_until);
    if (cooldown.active) {
      const err = new Error(
        `Mohon tunggu jeda waktu cooldown selama ${cooldown.remainingSeconds} detik sebelum mengulang ujian.`
      );
      err.status = 429;
      err.error = 'COOLDOWN_ACTIVE';
      err.remainingSeconds = cooldown.remainingSeconds;
      err.cooldownUntil = lastAttempt.cooldown_until;
      throw err;
    }
  }

  // Tentukan nomor percobaan dan set paket
  const attemptNumber = userCourseAttempts.length + 1;
  const setPaket = determineSetPaket(attemptNumber);

  // Ambil soal set yang sesuai
  const courseQuestions = questions
    .filter(q => q.course_id === courseId && q.set_paket === setPaket)
    .sort((a, b) => a.urutan - b.urutan);

  if (courseQuestions.length === 0) {
    const err = new Error(`Bank soal Set ${setPaket} untuk modul ini belum tersedia.`);
    err.status = 503;
    throw err;
  }

  // Buat attempt baru di store
  const attemptId = uuidv4();
  const newAttempt = {
    id: attemptId,
    user_id: userId,
    course_id: courseId,
    attempt_number: attemptNumber,
    set_paket: setPaket,
    mulai: new Date().toISOString(),
    selesai: null,
    total_poin_pg: 0,
    total_poin_essay: 0,
    nilai: null,
    lulus: null,
    cooldown_until: null
  };
  attempts.push(newAttempt);

  // ⚠️ ATURAN KEAMANAN MUTLAK: Strip kunci jawaban sebelum kirim ke client!
  // Kolom yang TIDAK boleh dikirim: poin, is_correct, kunci_jawaban, kata_kunci
  const clientQuestions = courseQuestions.map(q => {
    const base = {
      id: q.id,
      urutan: q.urutan,
      topik: q.topik,
      tipe: q.tipe,
      teks: q.teks
    };

    if (q.tipe === 'pilihan_ganda') {
      // Hanya kirim id dan teks opsi — TANPA poin/is_correct!
      base.options = options
        .filter(o => o.question_id === q.id)
        .map(o => ({ id: o.id, teks: o.teks }));
    }
    // Essay: tidak ada opsi dan tidak ada kunci jawaban

    return base;
  });

  return {
    attemptId,
    courseId,
    attemptNumber,
    setPaket,
    questions: clientQuestions
  };
}

/**
 * Submit jawaban dan evaluasi (server-side scoring sesuai PRD Bagian 13)
 */
export function submitExam(attemptId, courseId, submittedAnswers) {
  const attempt = attempts.find(a => a.id === attemptId);
  if (!attempt) {
    const err = new Error('Sesi ujian tidak ditemukan atau sudah kedaluwarsa.');
    err.status = 404;
    throw err;
  }

  if (attempt.selesai) {
    const err = new Error('Ujian ini sudah pernah disubmit sebelumnya.');
    err.status = 400;
    throw err;
  }

  // Ambil soal yang dikerjakan dalam sesi ini
  const courseQuestions = questions
    .filter(q => q.course_id === courseId && q.set_paket === attempt.set_paket)
    .sort((a, b) => a.urutan - b.urutan);

  const evaluatedAnswers = [];
  const savedAnswers = [];

  for (const q of courseQuestions) {
    const studentAns = submittedAnswers[q.id];
    let poin = 0;
    let label = 'Salah';
    let feedback = '';

    if (q.tipe === 'pilihan_ganda') {
      // Ambil opsi yang benar dari store (server-side only)
      const correctOption = options.find(o => o.question_id === q.id && o.is_correct);
      const isCorrect = studentAns === (correctOption ? correctOption.id : null);
      poin = isCorrect ? 10 : 0;
      label = isCorrect ? 'Tepat' : 'Salah';

      // Ambil umpan balik dari opsi yang dipilih peserta
      const selectedOption = options.find(o => o.question_id === q.id && o.id === studentAns);
      feedback = selectedOption
        ? selectedOption.umpan_balik
        : (correctOption ? `Jawaban benar: ${correctOption.teks}` : 'Jawaban Anda kurang tepat.');

    } else if (q.tipe === 'essay') {
      const rubric = essay_rubrics.find(r => r.question_id === q.id);
      const keywords = rubric ? rubric.kata_kunci : [];
      const result = evaluateEssay(studentAns, keywords);
      poin = result.poin;
      label = result.label;

      if (result.poin === 10) feedback = 'Jawaban ringkas, tepat sasaran, dan poin kunci utama terpenuhi!';
      else if (result.poin === 8) feedback = 'Konsep dasar sudah benar, tambahkan sedikit detail kata kunci materi.';
      else feedback = 'Jawaban belum mencakup kata kunci utama dari materi slide.';
    }

    evaluatedAnswers.push({ topik: q.topik, tipe: q.tipe, poin });

    savedAnswers.push({
      id: uuidv4(),
      attempt_id: attemptId,
      question_id: q.id,
      jawaban: studentAns || '(Tidak dijawab)',
      poin,
      label,
      catatan_evaluasi: feedback,
      created_at: new Date().toISOString()
    });
  }

  // Simpan semua jawaban ke store
  savedAnswers.forEach(a => answers.push(a));

  // Hitung nilai akhir dengan formula PRD: [0.60*(PG/100) + 0.40*(Essay/50)] * 100
  const { nilaiAkhir, lulus, totalPG, totalEssay, weakTopics } = calculateFinalScore(evaluatedAnswers);

  const cooldownUntil = !lulus ? computeCooldownDate().toISOString() : null;

  // Update attempt record
  attempt.selesai = new Date().toISOString();
  attempt.total_poin_pg = totalPG;
  attempt.total_poin_essay = totalEssay;
  attempt.nilai = nilaiAkhir;
  attempt.lulus = lulus;
  attempt.cooldown_until = cooldownUntil;

  // ─── Progressive Gating Unlock Logic (PRD Bagian 7 & 8) ───────────────────
  const prog = progress.find(p => p.user_id === attempt.user_id && p.course_id === courseId);
  if (prog) {
    if (nilaiAkhir > (prog.nilai_terbaik || 0)) {
      prog.nilai_terbaik = nilaiAkhir;
    }

    if (lulus) {
      prog.status = 'passed';
      prog.passed_at = new Date().toISOString();
      prog.updated_at = new Date().toISOString();

      // Unlock modul berikutnya (N+1)
      const currentCourse = courses.find(c => c.id === courseId);
      if (currentCourse) {
        const nextCourse = courses.find(c => c.urutan === currentCourse.urutan + 1);
        if (nextCourse) {
          const nextProg = progress.find(
            p => p.user_id === attempt.user_id && p.course_id === nextCourse.id
          );
          if (nextProg && nextProg.status === 'locked') {
            nextProg.status = 'unlocked';
            nextProg.unlocked_at = new Date().toISOString();
            nextProg.updated_at = new Date().toISOString();
          }
        }
      }
    } else {
      prog.updated_at = new Date().toISOString();
    }
  }

  // Build response evaluatedQuestions (aman dikirim ke client)
  const evaluatedQuestionsResponse = courseQuestions.map((q, i) => {
    const ans = savedAnswers[i];
    const questionOptions = q.tipe === 'pilihan_ganda'
      ? options.filter(o => o.question_id === q.id).map(o => ({ id: o.id, teks: o.teks }))
      : null;

    return {
      questionId: q.id,
      urutan: q.urutan,
      topik: q.topik,
      tipe: q.tipe,
      teks: q.teks,
      options: questionOptions,
      jawabanPengguna: ans.jawaban,
      poin: ans.poin,
      label: ans.label,
      pembahasan: ans.catatan_evaluasi
    };
  });

  return {
    attemptId,
    courseId,
    nilai: nilaiAkhir,
    lulus,
    totalPG,
    totalEssay,
    weakTopics,
    cooldownUntil,
    attemptNumber: attempt.attempt_number,
    setPaket: attempt.set_paket,
    evaluatedQuestions: evaluatedQuestionsResponse
  };
}

/**
 * Ambil hasil attempt beserta evaluasi lengkap untuk halaman Result
 */
export function getAttemptResult(attemptId, userId) {
  const attempt = attempts.find(a => a.id === attemptId);
  if (!attempt) {
    const err = new Error('Hasil ujian tidak ditemukan.');
    err.status = 404;
    throw err;
  }

  if (attempt.user_id !== userId) {
    const err = new Error('Akses ditolak. Ini bukan ujian Anda.');
    err.status = 403;
    throw err;
  }

  if (!attempt.selesai) {
    const err = new Error('Ujian belum selesai disubmit.');
    err.status = 400;
    throw err;
  }

  const attemptAnswers = answers.filter(a => a.attempt_id === attemptId);
  const courseQuestions = questions
    .filter(q => q.course_id === attempt.course_id && q.set_paket === attempt.set_paket)
    .sort((a, b) => a.urutan - b.urutan);

  // Hitung topik lemah dari jawaban
  const topicStats = {};
  attemptAnswers.forEach(a => {
    const q = courseQuestions.find(q => q.id === a.question_id);
    if (!q) return;
    if (!topicStats[q.topik]) topicStats[q.topik] = { earned: 0, possible: 0 };
    topicStats[q.topik].earned += Number(a.poin);
    topicStats[q.topik].possible += 10;
  });

  const weakTopics = Object.entries(topicStats)
    .filter(([, s]) => s.earned / s.possible < 0.7)
    .map(([topik]) => topik);

  const evaluatedQuestions = courseQuestions.map(q => {
    const ans = attemptAnswers.find(a => a.question_id === q.id);
    const questionOptions = q.tipe === 'pilihan_ganda'
      ? options.filter(o => o.question_id === q.id).map(o => ({ id: o.id, teks: o.teks }))
      : null;

    return {
      questionId: q.id,
      urutan: q.urutan,
      topik: q.topik,
      tipe: q.tipe,
      teks: q.teks,
      options: questionOptions,
      jawabanPengguna: ans ? ans.jawaban : '(Tidak dijawab)',
      poin: ans ? ans.poin : 0,
      label: ans ? ans.label : 'Salah',
      pembahasan: ans ? ans.catatan_evaluasi : ''
    };
  });

  return {
    attemptId: attempt.id,
    courseId: attempt.course_id,
    attemptNumber: attempt.attempt_number,
    setPaket: attempt.set_paket,
    mulai: attempt.mulai,
    selesai: attempt.selesai,
    nilai: attempt.nilai,
    totalPG: attempt.total_poin_pg,
    totalEssay: attempt.total_poin_essay,
    lulus: attempt.lulus,
    cooldownUntil: attempt.cooldown_until,
    weakTopics,
    evaluatedQuestions
  };
}
