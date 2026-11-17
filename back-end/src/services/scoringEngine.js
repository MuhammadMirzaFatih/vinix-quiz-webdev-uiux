/**
 * Scoring Engine Service
 * Mengimplementasikan Aturan PRD Bagian 6 & 13:
 * - Komposisi 10 PG (10 poin/soal = max 100)
 * - Komposisi 5 Essay (10 poin/soal = max 50)
 * - Bobot: 60% PG + 40% Essay
 * - Rumus: Nilai Akhir = [ 0.60 * (Total_PG / 100) + 0.40 * (Total_Essay / 50) ] * 100
 * - KKM: 80 (>= 80 Lulus, <= 79 Belum Lulus)
 */

/**
 * Normalisasi teks untuk pencocokan kata kunci essay
 * (lowercase, menghapus tanda baca, merapikan spasi berlebih)
 */
export function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Evaluasi jawaban Essay berdasarkan pencocokan kata kunci
 * @param {string} studentAnswer - Jawaban yang diketik peserta
 * @param {string[]} keywords - Daftar kata kunci dari tabel essay_rubrics
 * @returns {{ poin: number, label: 'Tepat'|'Kurang Tepat'|'Salah', matchedCount: number, totalKeywords: number }}
 */
export function evaluateEssay(studentAnswer, keywords = []) {
  if (!studentAnswer || keywords.length === 0) {
    return { poin: 0, label: 'Salah', matchedCount: 0, totalKeywords: keywords.length };
  }

  const normalized = normalizeText(studentAnswer);
  let matched = 0;

  for (const kw of keywords) {
    const normalizedKw = normalizeText(kw);
    if (normalized.includes(normalizedKw)) {
      matched++;
    }
  }

  const ratio = matched / keywords.length;

  // Sesuai Rubrik PRD Hal 11 & Hal 43:
  // Nilai 10 -> >= 80% kata kunci utama muncul dan konsep benar
  // Nilai 9  -> Konsep inti benar, kurang 1 unsur (rasio ~70-79%)
  // Nilai 8  -> Sekitar 60% konsep benar (~55-69%)
  // Nilai 7  -> Hanya ide umum (~40-54%)
  // Nilai 0  -> Salah / tidak relevan (< 40%)
  if (ratio >= 0.8) {
    return { poin: 10, label: 'Tepat', matchedCount: matched, totalKeywords: keywords.length };
  } else if (ratio >= 0.7) {
    return { poin: 9, label: 'Kurang Tepat', matchedCount: matched, totalKeywords: keywords.length };
  } else if (ratio >= 0.55) {
    return { poin: 8, label: 'Kurang Tepat', matchedCount: matched, totalKeywords: keywords.length };
  } else if (ratio >= 0.4) {
    return { poin: 7, label: 'Kurang Tepat', matchedCount: matched, totalKeywords: keywords.length };
  } else {
    return { poin: 0, label: 'Salah', matchedCount: matched, totalKeywords: keywords.length };
  }
}

/**
 * Hitung Nilai Akhir & Analisis Topik Lemah
 * @param {Array} evaluatedAnswers - Array objek evaluasi setiap soal
 * @returns {{ nilaiAkhir: number, lulus: boolean, totalPG: number, totalEssay: number, weakTopics: string[] }}
 */
export function calculateFinalScore(evaluatedAnswers) {
  let totalPG = 0;
  let totalEssay = 0;
  const topicScores = {}; // { [topik]: { totalPoin: number, maxPoin: number } }

  for (const item of evaluatedAnswers) {
    const { topik, tipe, poin } = item;

    if (tipe === 'pilihan_ganda') {
      totalPG += poin;
    } else if (tipe === 'essay') {
      totalEssay += poin;
    }

    if (!topicScores[topik]) {
      topicScores[topik] = { earned: 0, possible: 0 };
    }
    topicScores[topik].earned += poin;
    topicScores[topik].possible += 10;
  }

  // Formula Nilai Akhir: [0.60 * (Total_PG / 100) + 0.40 * (Total_Essay / 50)] * 100
  const pgComponent = 0.60 * (totalPG / 100);
  const essayComponent = 0.40 * (totalEssay / 50);
  const rawScore = (pgComponent + essayComponent) * 100;
  const nilaiAkhir = Math.round(rawScore * 100) / 100; // Pembulatan 2 desimal

  const lulus = nilaiAkhir >= 80;

  // Analisis Topik Lemah: Topik dengan persentase perolehan poin < 70%
  const weakTopics = Object.entries(topicScores)
    .filter(([_, score]) => (score.earned / score.possible) < 0.7)
    .map(([topik]) => topik);

  return {
    nilaiAkhir,
    lulus,
    totalPG,
    totalEssay,
    weakTopics
  };
}
