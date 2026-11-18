/**
 * Course Service
 * Layer akses data untuk modul, sections, dan progress peserta
 */

import { courses, sections, progress } from '../data/memoryStore.js';

/**
 * Ambil semua course beserta status gating dari tabel progress user
 */
export function getAllCourses(userId) {
  return courses.map(course => {
    const prog = progress.find(p => p.user_id === userId && p.course_id === course.id)
      || { status: 'locked', bagian_selesai: [], nilai_terbaik: 0 };

    return {
      id: course.id,
      urutan: course.urutan,
      judul: course.judul,
      ringkasan: course.ringkasan,
      kategori: course.kategori,
      estimasi_waktu: course.estimasi_waktu,
      level: course.level,
      icon: course.icon,
      pdf_url: course.pdf_url,
      referensi_eksternal: course.referensi_eksternal,
      status: prog.status,
      bagian_selesai: prog.bagian_selesai,
      nilai_terbaik: prog.nilai_terbaik,
      total_sections: sections.filter(s => s.course_id === course.id).length,
      is_completed: prog.status === 'passed'
    };
  });
}

/**
 * Ambil detail satu course beserta section-nya
 */
export function getCourseById(courseId, userId) {
  const course = courses.find(c => c.id === courseId);
  if (!course) {
    const err = new Error('Modul tidak ditemukan.');
    err.status = 404;
    throw err;
  }

  const courseSections = sections
    .filter(s => s.course_id === courseId)
    .sort((a, b) => a.urutan - b.urutan);

  const prog = progress.find(p => p.user_id === userId && p.course_id === courseId)
    || { status: 'locked', bagian_selesai: [], nilai_terbaik: 0 };

  return {
    ...course,
    status: prog.status,
    bagian_selesai: prog.bagian_selesai,
    nilai_terbaik: prog.nilai_terbaik,
    sections: courseSections.map(s => ({
      id: s.id,
      urutan: s.urutan,
      judul: s.judul,
      isi: s.isi,
      pdf_url: s.pdf_url,
      pdf_title: s.pdf_title
    }))
  };
}

/**
 * Tandai bagian materi sebagai selesai dibaca
 */
export function completeSectionForUser(userId, courseId, sectionUrutan) {
  const course = courses.find(c => c.id === courseId);
  if (!course) {
    const err = new Error('Modul tidak ditemukan.');
    err.status = 404;
    throw err;
  }

  const prog = progress.find(p => p.user_id === userId && p.course_id === courseId);
  if (!prog) {
    const err = new Error('Progress modul tidak ditemukan. Pastikan user sudah terdaftar.');
    err.status = 404;
    throw err;
  }

  const sectionNum = parseInt(sectionUrutan, 10);
  if (!prog.bagian_selesai.includes(sectionNum)) {
    prog.bagian_selesai.push(sectionNum);
    prog.bagian_selesai.sort((a, b) => a - b);
    prog.updated_at = new Date().toISOString();
  }

  return { success: true, bagian_selesai: prog.bagian_selesai };
}
