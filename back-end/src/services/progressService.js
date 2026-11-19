/**
 * Progress Service (Dual-Store: memory & supabase)
 */

import { courses, attempts, progress, initUserProgress } from '../data/memoryStore.js';
import { getSupabaseClient } from '../config/supabase.js';
import { initUserProgressSupabase } from './courseService.js';

const isSupabase = () => process.env.DATA_STORE === 'supabase';
const isValidUuid = (val) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val || '');

export async function getUserProgressSummary(userId) {
  if (isSupabase()) {
    const supabase = getSupabaseClient();
    const { data: allCourses, error: cErr } = await supabase
      .from('courses')
      .select('id, urutan')
      .order('urutan', { ascending: true });
    if (cErr) throw cErr;

    let userProgress = [];
    let userAttempts = [];

    if (isValidUuid(userId)) {
      await initUserProgressSupabase(userId);
      const [pRes, aRes] = await Promise.all([
        supabase.from('progress').select('*').eq('user_id', userId),
        supabase.from('attempts').select('id').eq('user_id', userId)
      ]);
      if (pRes.error) throw pRes.error;
      if (aRes.error) throw aRes.error;
      userProgress = pRes.data || [];
      userAttempts = aRes.data || [];
    }

    const totalCourses = (allCourses || []).length || 10;
    const passedCount = userProgress.filter(p => p.status === 'passed').length;
    const scores = userProgress.map(p => Number(p.nilai_terbaik || 0)).filter(s => s > 0);
    const averageScore = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

    const progressMap = {};
    (allCourses || []).forEach(c => {
      const p = userProgress.find(up => up.course_id === c.id);
      progressMap[c.id] = {
        status: p ? p.status : (c.urutan === 1 ? 'unlocked' : 'locked'),
        bagianSelesai: p ? (p.bagian_selesai || []) : [],
        bagian_selesai: p ? (p.bagian_selesai || []) : [],
        nilaiTerbaik: p ? Number(p.nilai_terbaik || 0) : 0,
        nilai_terbaik: p ? Number(p.nilai_terbaik || 0) : 0
      };
    });

    return {
      totalCourses,
      passedCount,
      percentage: Math.round((passedCount / totalCourses) * 100),
      averageScore,
      totalAttempts: userAttempts.length,
      progressMap
    };
  }

  // Mode In-Memory
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

  return {
    totalCourses: courses.length,
    passedCount,
    percentage: Math.round((passedCount / (courses.length || 10)) * 100),
    averageScore,
    totalAttempts: userAttempts.length,
    progressMap
  };
}