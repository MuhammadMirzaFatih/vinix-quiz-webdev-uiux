/**
 * Scoring Engine Service
 * Mengimplementasikan Aturan PRD Bagian 6 & 13:
 * - Komposisi 10 PG (10 poin/soal = max 100)
 * - Komposisi 5 Essay (10 poin/soal = max 50)
 * - Bobot: 60% PG + 40% Essay
 * - Rumus: Nilai Akhir = [ 0.60 * (Total_PG / 100) + 0.40 * (Total_Essay / 50) ] * 100
 * - KKM: 80 (>= 80 Lulus, <= 79 Belum Lulus)
 */

export function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function evaluateEssay(studentAnswer, keywords = []) {
  if (!studentAnswer || keywords.length === 0) {
    return {
      poin: 0,
      label: 'Salah',
      matchedCount: 0,
      totalKeywords: keywords.length,
      missingKeywords: [...keywords]
    };
  }

  const normalized = normalizeText(studentAnswer);
  let matched = 0;
  const missingKeywords = [];

  for (const kw of keywords) {
    const normalizedKw = normalizeText(kw);
    if (normalized.includes(normalizedKw)) {
      matched++;
    } else {
      missingKeywords.push(kw);
    }
  }

  const ratio = matched / keywords.length;

  // Skala Rubrik PRD Bagian 6 & 13: 10 (Tepat), 9/8/7 (Kurang Tepat), 0 (Salah)
  if (ratio >= 0.75 || matched >= 4) {
    return { poin: 10, label: 'Tepat', matchedCount: matched, totalKeywords: keywords.length, missingKeywords };
  } else if (ratio >= 0.55 || matched === 3) {
    return { poin: 9, label: 'Kurang Tepat', matchedCount: matched, totalKeywords: keywords.length, missingKeywords };
  } else if (ratio >= 0.35 || matched === 2) {
    return { poin: 8, label: 'Kurang Tepat', matchedCount: matched, totalKeywords: keywords.length, missingKeywords };
  } else if (matched >= 1) {
    return { poin: 7, label: 'Kurang Tepat', matchedCount: matched, totalKeywords: keywords.length, missingKeywords };
  } else {
    return { poin: 0, label: 'Salah', matchedCount: 0, totalKeywords: keywords.length, missingKeywords };
  }
}

export function calculateFinalScore(evaluatedAnswers) {
  let totalPG = 0;
  let totalEssay = 0;
  const topicScores = {};

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

  const pgComponent = 0.60 * (totalPG / 100);
  const essayComponent = 0.40 * (totalEssay / 50);
  const rawScore = (pgComponent + essayComponent) * 100;
  const nilaiAkhir = Math.round(rawScore * 100) / 100;

  const lulus = nilaiAkhir >= 80;

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