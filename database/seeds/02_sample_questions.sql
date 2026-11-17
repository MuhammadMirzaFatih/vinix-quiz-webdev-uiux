-- ==============================================================================
-- VINIX7 SEEDS: SAMPLE QUESTIONS & ESSAY RUBRICS (MODUL 1 - SET A)
-- Extracted directly from PRD Appendix (Pages 13-28)
-- ==============================================================================

-- 1. Insert PG Questions Set A (Modul 1)
INSERT INTO questions (id, course_id, set_paket, topik, tipe, teks, urutan) VALUES
('q1000001-0000-0000-0000-000000000001', 'c0000001-0000-0000-0000-000000000001', 'A', 'Startup Mindset', 'pilihan_ganda', 'Apa yang dimaksud dengan pola pikir Value Driven?', 1),
('q1000001-0000-0000-0000-000000000002', 'c0000001-0000-0000-0000-000000000001', 'A', 'Startup Mindset', 'pilihan_ganda', 'Dalam mindset startup, pertanyaan yang paling tepat adalah...', 2),
('q1000001-0000-0000-0000-000000000003', 'c0000001-0000-0000-0000-000000000001', 'A', 'Problem Solving', 'pilihan_ganda', 'Prinsip Solve The Problem menekankan bahwa startup harus...', 3),
('q1000001-0000-0000-0000-000000000004', 'c0000001-0000-0000-0000-000000000001', 'A', 'Agility', 'pilihan_ganda', 'Agility dalam startup berarti...', 4),
('q1000001-0000-0000-0000-000000000005', 'c0000001-0000-0000-0000-000000000001', 'A', 'Validasi Masalah', 'pilihan_ganda', 'Kegagalan pada tahap awal startup dianggap sebagai...', 5),
('q1000001-0000-0000-0000-000000000006', 'c0000001-0000-0000-0000-000000000001', 'A', 'Problem-Solution Fit', 'pilihan_ganda', 'Checkpoint pertama sebelum mencapai Product-Market Fit adalah...', 6),
('q1000001-0000-0000-0000-000000000007', 'c0000001-0000-0000-0000-000000000001', 'A', 'Validasi Masalah', 'pilihan_ganda', 'Sebuah masalah layak diselesaikan jika...', 7),
('q1000001-0000-0000-0000-000000000008', 'c0000001-0000-0000-0000-000000000001', 'A', 'Validasi Solusi', 'pilihan_ganda', 'Dalam tahap awal validasi, yang harus lebih diprioritaskan adalah...', 8),
('q1000001-0000-0000-0000-000000000009', 'c0000001-0000-0000-0000-000000000001', 'A', 'Inovasi Produk', 'pilihan_ganda', 'Keluhan dan frustrasi pengguna dianggap sebagai...', 9),
('q1000001-0000-0000-0000-000000000010', 'c0000001-0000-0000-0000-000000000001', 'A', 'Problem Statement Canvas', 'pilihan_ganda', 'Problem Statement Canvas digunakan untuk...', 10)
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Options for PG Question 1
INSERT INTO options (question_id, teks, poin, umpan_balik) VALUES
('q1000001-0000-0000-0000-000000000001', 'Berfokus pada teknologi terbaru', 0, 'Teknologi hanyalah enabler, bukan inti nilai.'),
('q1000001-0000-0000-0000-000000000001', 'Berfokus pada desain yang menarik', 0, 'Desain menarik tanpa nilai fungsional tidak menyelesaikan masalah.'),
('q1000001-0000-0000-0000-000000000001', 'Berfokus pada nilai yang diberikan kepada pengguna', 10, 'Tepat! Value-driven berpusat pada pemecahan masalah dan manfaat nyata bagi pengguna.'),
('q1000001-0000-0000-0000-000000000001', 'Berfokus pada keuntungan perusahaan semata', 0, 'Keuntungan adalah dampak dari nilai yang berhasil dihantarkan, bukan fokus tunggal tahap awal.');

-- 3. Insert Essay Questions Set A (Modul 1)
INSERT INTO questions (id, course_id, set_paket, topik, tipe, teks, urutan) VALUES
('q1000002-0000-0000-0000-000000000001', 'c0000001-0000-0000-0000-000000000001', 'A', 'Startup Mindset', 'essay', 'Jelaskan pengertian Value Driven dalam mindset startup!', 1),
('q1000002-0000-0000-0000-000000000002', 'c0000001-0000-0000-0000-000000000001', 'A', 'Problem Solving', 'essay', 'Mengapa startup harus fokus pada masalah, bukan pada solusi atau teknologi?', 2),
('q1000002-0000-0000-0000-000000000003', 'c0000001-0000-0000-0000-000000000001', 'A', 'Agility', 'essay', 'Jelaskan konsep Agility dan manfaatnya bagi startup!', 3),
('q1000002-0000-0000-0000-000000000004', 'c0000001-0000-0000-0000-000000000001', 'A', 'Problem-Solution Fit', 'essay', 'Apa yang dimaksud dengan Problem-Solution Fit? Mengapa penting?', 4),
('q1000002-0000-0000-0000-000000000005', 'c0000001-0000-0000-0000-000000000001', 'A', 'Validasi Masalah', 'essay', 'Mengapa validasi masalah harus dilakukan sebelum membuat produk?', 5)
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Essay Rubrics (Held strictly on Server!)
INSERT INTO essay_rubrics (question_id, kunci_jawaban, kata_kunci, rubrik_skor) VALUES
('q1000002-0000-0000-0000-000000000001', 
'Value Driven adalah pola pikir startup yang berfokus pada penciptaan nilai (value) bagi pengguna dengan menyelesaikan masalah nyata yang mereka alami. Keputusan bisnis, fitur, dan inovasi dibuat berdasarkan manfaat yang diberikan kepada pengguna, bukan hanya teknologi atau keuntungan semata.',
ARRAY['nilai', 'value', 'pengguna', 'customer', 'masalah nyata', 'manfaat', 'kebutuhan'],
'{"10": ">=80% kata kunci muncul dan konsep inti dijelaskan secara tepat", "9": "Konsep inti benar, namun kurang 1 unsur penjelas", "8": "Sekitar 60% konsep benar tapi terlalu umum", "7": "Hanya ide umum tanpa kedalaman materi", "0": "Salah/tidak relevan"}'::jsonb),

('q1000002-0000-0000-0000-000000000002',
'Karena solusi dan teknologi dapat berubah, tetapi masalah pengguna tetap menjadi dasar kebutuhan pasar. Dengan memahami masalah terlebih dahulu, startup dapat menciptakan solusi yang relevan, dibutuhkan, dan memiliki peluang adopsi yang lebih tinggi.',
ARRAY['masalah pengguna', 'solusi bisa berubah', 'kebutuhan pasar', 'relevan', 'validasi'],
'{"10": "Mencakup aspek kebutuhan pasar dan fakta bahwa teknologi/solusi dapat berubah", "9": "Menjelaskan kebutuhan pengguna sebelum membuat solusi", "8": "Menjelaskan tanpa menghubungkan ke validasi pasar", "7": "Hanya menyatakan teknologi bukan segalanya", "0": "Salah konsep"}'::jsonb);
