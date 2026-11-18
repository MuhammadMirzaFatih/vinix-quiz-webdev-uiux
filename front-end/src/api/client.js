/**
 * VINIX7 REST API Client
 * Mengikuti Kesepakatan Kontrak Data & Endpoint (PRD Bagian 11)
 * 
 * Beralih ke backend nyata semudah mengubah `USE_REAL_BACKEND = true`!
 */

import {
  INITIAL_COURSES,
  MOCK_QUESTIONS,
  getStoredProgress,
  saveStoredProgress,
  getStoredAttempts,
  saveStoredAttempts
} from './mockData';

export const USE_REAL_BACKEND = false;
export const API_BASE_URL = 'http://localhost:5000/api';

/** Helper text normalizer for mock essay evaluation */
function normalize(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * API Client Object
 */
export const apiClient = {
  // 1. Auth: Login
  async login(email, password) {
    if (USE_REAL_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return await res.json();
    }

    // Mock Login
    await new Promise(r => setTimeout(r, 400));
    const user = {
      id: 'u-123456',
      nama: email.split('@')[0].toUpperCase() || 'Peserta Magang VINIX7',
      email: email || 'peserta@vinix7.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
    localStorage.setItem('vinix7_user', JSON.stringify(user));
    return { success: true, user, token: 'mock-jwt-token-vinix7' };
  },

  // 2. Auth: Register
  async register(nama, email, password) {
    if (USE_REAL_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, email, password })
      });
      return await res.json();
    }

    await new Promise(r => setTimeout(r, 400));
    const user = {
      id: 'u-' + Date.now(),
      nama: nama || 'Peserta Magang',
      email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
    localStorage.setItem('vinix7_user', JSON.stringify(user));
    return { success: true, user, token: 'mock-jwt-token-vinix7' };
  },

  // 3. Courses: Get All (with Progressive Gating Status)
  async getCourses() {
    if (USE_REAL_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/courses`);
      return await res.json();
    }

    await new Promise(r => setTimeout(r, 200));
    const progressMap = getStoredProgress();

    return INITIAL_COURSES.map(course => {
      const prog = progressMap[course.id] || { status: 'locked', bagianSelesai: [], nilaiTerbaik: 0 };
      return {
        ...course,
        status: prog.status,
        bagianSelesai: prog.bagianSelesai,
        nilaiTerbaik: prog.nilaiTerbaik,
        totalSections: course.sections.length,
        isCompleted: prog.status === 'passed'
      };
    });
  },

  // 4. Course Detail & Sections
  async getCourseById(courseId) {
    if (USE_REAL_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/courses/${courseId}`);
      return await res.json();
    }

    await new Promise(r => setTimeout(r, 200));
    const course = INITIAL_COURSES.find(c => c.id === courseId);
    if (!course) throw new Error('Course tidak ditemukan');

    const progressMap = getStoredProgress();
    const prog = progressMap[courseId] || { status: 'locked', bagianSelesai: [], nilaiTerbaik: 0 };

    return {
      ...course,
      status: prog.status,
      bagianSelesai: prog.bagianSelesai,
      nilaiTerbaik: prog.nilaiTerbaik
    };
  },

  // 5. Complete a Section
  async completeSection(courseId, sectionUrutan) {
    if (USE_REAL_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/courses/${courseId}/sections/${sectionUrutan}/complete`, {
        method: 'POST'
      });
      return await res.json();
    }

    await new Promise(r => setTimeout(r, 150));
    const progressMap = getStoredProgress();
    if (!progressMap[courseId]) {
      progressMap[courseId] = { status: 'unlocked', bagianSelesai: [], nilaiTerbaik: 0 };
    }

    if (!progressMap[courseId].bagianSelesai.includes(sectionUrutan)) {
      progressMap[courseId].bagianSelesai.push(sectionUrutan);
      progressMap[courseId].bagianSelesai.sort((a, b) => a - b);
      saveStoredProgress(progressMap);
    }

    return { success: true, bagianSelesai: progressMap[courseId].bagianSelesai };
  },

  // 6. Exam: Start Session (Validates 1-minute cooldown & returns 15 questions without answers)
  async startExam(courseId) {
    if (USE_REAL_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/courses/${courseId}/exam/start`, {
        method: 'POST'
      });
      return await res.json();
    }

    await new Promise(r => setTimeout(r, 300));
    const attempts = getStoredAttempts();
    const courseAttempts = attempts.filter(a => a.courseId === courseId);
    const lastAttempt = courseAttempts[courseAttempts.length - 1];

    // Check 1-minute Cooldown if failed previously
    if (lastAttempt && !lastAttempt.lulus && lastAttempt.cooldownUntil) {
      const remainingMs = new Date(lastAttempt.cooldownUntil).getTime() - Date.now();
      if (remainingMs > 0) {
        const remainingSeconds = Math.ceil(remainingMs / 1000);
        return {
          error: 'COOLDOWN_ACTIVE',
          message: `Mohon tunggu jeda waktu cooldown selama ${remainingSeconds} detik sebelum mengulang ujian.`,
          remainingSeconds,
          cooldownUntil: lastAttempt.cooldownUntil
        };
      }
    }

    // Determine Set (Set A on attempt 1, Set B on attempt 2, Set C on attempt 3)
    const attemptNumber = courseAttempts.length + 1;
    let setPaket = 'A';
    if (attemptNumber === 2) setPaket = 'B';
    else if (attemptNumber >= 3) setPaket = 'C';

    const courseQuestions = (MOCK_QUESTIONS[courseId] && MOCK_QUESTIONS[courseId][setPaket]) 
      || MOCK_QUESTIONS['c1']['A'];

    const attemptId = 'att-' + Date.now();

    // STRICT SECURITY: Strip out answer keys and explanations before sending to client!
    const clientQuestions = courseQuestions.map(q => ({
      id: q.id,
      urutan: q.urutan,
      topik: q.topik,
      tipe: q.tipe,
      teks: q.teks,
      options: q.options ? q.options.map(opt => ({ id: opt.id, teks: opt.teks })) : null
    }));

    // Save active session
    const newAttempt = {
      id: attemptId,
      courseId,
      attemptNumber,
      setPaket,
      mulai: new Date().toISOString(),
      selesai: null,
      nilai: null,
      lulus: null,
      cooldownUntil: null
    };
    attempts.push(newAttempt);
    saveStoredAttempts(attempts);

    return {
      attemptId,
      courseId,
      attemptNumber,
      setPaket,
      questions: clientQuestions
    };
  },

  // 7. Exam: Submit Answers (Server-Side Evaluation & Progressive Gating Unlock)
  async submitExam(attemptId, courseId, submittedAnswers) {
    if (USE_REAL_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/attempts/${attemptId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: submittedAnswers })
      });
      return await res.json();
    }

    await new Promise(r => setTimeout(r, 600)); // Simulate grading computation
    const attempts = getStoredAttempts();
    const attemptIndex = attempts.findIndex(a => a.id === attemptId);
    if (attemptIndex === -1) throw new Error('Attempt tidak valid');

    const attempt = attempts[attemptIndex];
    const sourceQuestions = (MOCK_QUESTIONS[courseId] && MOCK_QUESTIONS[courseId][attempt.setPaket]) 
      || MOCK_QUESTIONS['c1']['A'];

    let totalPG = 0;
    let totalEssay = 0;
    const evaluatedQuestions = [];
    const topicStats = {};

    for (const q of sourceQuestions) {
      const studentAns = submittedAnswers[q.id];
      let poin = 0;
      let label = 'Salah';
      let feedback = '';

      if (q.tipe === 'pilihan_ganda') {
        const isCorrect = studentAns === q.kunciJawaban;
        poin = isCorrect ? 10 : 0;
        label = isCorrect ? 'Tepat' : 'Salah';
        feedback = q.pembahasan || (isCorrect ? 'Jawaban Anda benar!' : 'Jawaban Anda kurang tepat.');
        totalPG += poin;
      } else if (q.tipe === 'essay') {
        // Keyword matching according to PRD section 13
        const keywords = q.keywords || [];
        const normAns = normalize(studentAns);
        let matches = 0;
        for (const kw of keywords) {
          if (normAns.includes(normalize(kw))) matches++;
        }
        const ratio = keywords.length > 0 ? (matches / keywords.length) : 0;

        if (matches >= 2 || ratio >= 0.35) {
          poin = 10;
          label = 'Tepat';
          feedback = 'Jawaban ringkas, tepat sasaran, dan poin kunci utama terpenuhi!';
        } else if (matches >= 1 || ratio >= 0.2) {
          poin = 8;
          label = 'Kurang Tepat';
          feedback = 'Konsep dasar sudah benar, tambahkan sedikit detail kata kunci materi.';
        } else {
          poin = 0;
          label = 'Salah';
          feedback = 'Jawaban belum mencakup kata kunci utama dari materi slide.';
        }
        totalEssay += poin;
      }

      // Group by topic for weak topics detection
      if (!topicStats[q.topik]) {
        topicStats[q.topik] = { earned: 0, possible: 0 };
      }
      topicStats[q.topik].earned += poin;
      topicStats[q.topik].possible += 10;

      evaluatedQuestions.push({
        questionId: q.id,
        urutan: q.urutan,
        topik: q.topik,
        tipe: q.tipe,
        teks: q.teks,
        options: q.options || null,
        jawabanPengguna: studentAns || '(Tidak dijawab)',
        kunciJawaban: q.tipe === 'pilihan_ganda' ? q.kunciJawaban : q.kunciJawabanIdeal,
        poin,
        label,
        pembahasan: feedback
      });
    }

    // Formula: [ 0.60 * (Total_PG / 100) + 0.40 * (Total_Essay / 50) ] * 100
    const rawScore = ((0.60 * (totalPG / 100)) + (0.40 * (totalEssay / 50))) * 100;
    const finalScore = Math.round(rawScore);
    const isPassed = finalScore >= 80;

    // Cooldown 1 menit (60 detik) jika gagal
    const cooldownUntil = !isPassed ? new Date(Date.now() + 60 * 1000).toISOString() : null;

    // Detect weak topics (< 70% earned in that topic)
    const weakTopics = Object.entries(topicStats)
      .filter(([_, stats]) => (stats.earned / stats.possible) < 0.7)
      .map(([topik]) => topik);

    // Update attempt
    attempt.selesai = new Date().toISOString();
    attempt.totalPG = totalPG;
    attempt.totalEssay = totalEssay;
    attempt.nilai = finalScore;
    attempt.lulus = isPassed;
    attempt.cooldownUntil = cooldownUntil;
    attempt.weakTopics = weakTopics;
    attempt.evaluatedQuestions = evaluatedQuestions;

    attempts[attemptIndex] = attempt;
    saveStoredAttempts(attempts);

    // ================= PROGRESSIVE GATING UNLOCK LOGIC =================
    const progressMap = getStoredProgress();
    if (!progressMap[courseId]) {
      progressMap[courseId] = { status: 'unlocked', bagianSelesai: [], nilaiTerbaik: 0 };
    }

    // Track best score
    if (finalScore > (progressMap[courseId].nilaiTerbaik || 0)) {
      progressMap[courseId].nilaiTerbaik = finalScore;
    }

    if (isPassed) {
      progressMap[courseId].status = 'passed';

      // Unlock next course (N+1)
      const currentCourse = INITIAL_COURSES.find(c => c.id === courseId);
      if (currentCourse) {
        const nextCourse = INITIAL_COURSES.find(c => c.urutan === currentCourse.urutan + 1);
        if (nextCourse && progressMap[nextCourse.id]?.status === 'locked') {
          progressMap[nextCourse.id].status = 'unlocked';
        }
      }
    }
    saveStoredProgress(progressMap);

    return {
      attemptId,
      finalScore,
      isPassed,
      totalPG,
      totalEssay,
      weakTopics,
      cooldownUntil,
      attemptNumber: attempt.attemptNumber,
      setPaket: attempt.setPaket,
      evaluatedQuestions
    };
  },

  // 8. Get Attempt Result
  async getAttemptResult(attemptId) {
    if (USE_REAL_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/attempts/${attemptId}/result`);
      return await res.json();
    }

    await new Promise(r => setTimeout(r, 200));
    const attempts = getStoredAttempts();
    const attempt = attempts.find(a => a.id === attemptId);
    if (!attempt) throw new Error('Hasil ujian tidak ditemukan');
    return attempt;
  },

  // 9. Get User Progress Summary
  async getUserProgress() {
    if (USE_REAL_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/me/progress`);
      return await res.json();
    }

    await new Promise(r => setTimeout(r, 200));
    const progressMap = getStoredProgress();
    const attempts = getStoredAttempts();

    const passedCount = Object.values(progressMap).filter(p => p.status === 'passed').length;
    const scores = Object.values(progressMap).map(p => p.nilaiTerbaik).filter(s => s > 0);
    const averageScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

    return {
      totalCourses: INITIAL_COURSES.length,
      passedCount,
      percentage: Math.round((passedCount / INITIAL_COURSES.length) * 100),
      averageScore,
      totalAttempts: attempts.length,
      progressMap
    };
  }
};
