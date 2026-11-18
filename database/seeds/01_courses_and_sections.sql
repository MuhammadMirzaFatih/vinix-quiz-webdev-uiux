-- ==============================================================================
-- VINIX7 SEEDS: COURSES & SECTIONS (MODUL 1 - 10)
-- Based on PRD Section 5: Struktur Kurikulum (10 Course)
-- ==============================================================================

-- 1. Insert 10 Courses
INSERT INTO courses (id, urutan, judul, ringkasan, estimasi_waktu, pdf_url) VALUES
('c0000001-0000-0000-0000-000000000001', 1, 'Mindset Startup & Problem Solving', 'Memahami pola pikir value-driven, identifikasi masalah nyata vs solusi palsu, Problem Statement Canvas, dan 5 Whys.', '45 Menit', 'https://drive.google.com/file/d/1ofkBoMKz26NmUddSc5dCT3y7JexVlKnS/preview'),
('c0000002-0000-0000-0000-000000000002', 2, 'UI/UX & Design Thinking', 'Pilar UI vs UX, 5 tahap Design Thinking, Empathy Map, dan studi kasus kegagalan produk digital nyata.', '50 Menit', NULL),
('c0000003-0000-0000-0000-000000000003', 3, 'User Research & Persona', 'Metodologi riset kualitatif & kuantitatif, teknik wawancara bebas leading question, User Persona, dan User Journey Map.', '55 Menit', NULL),
('c0000004-0000-0000-0000-000000000004', 4, 'Wireframing & User Flow', 'Information Architecture (IA), F-Pattern vs Z-Pattern, prinsip Proximity & Contrast, User Flow diagram, dan Crazy 8s.', '60 Menit', NULL),
('c0000005-0000-0000-0000-000000000005', 5, 'UI & Prototyping', 'Low-Fidelity vs High-Fidelity prototype, komponen form interaktif, CTA efektif, dan prinsip Test Early, Learn Fast.', '50 Menit', NULL),
('c0000006-0000-0000-0000-000000000006', 6, 'HTML Dasar & Semantik', 'Struktur dokumen HTML5, tag semantik (article, header, main), aksesibilitas atribut alt, dan kepatuhan WCAG 1.4.3.', '45 Menit', NULL),
('c0000007-0000-0000-0000-000000000007', 7, 'PRD, AI, Git Kolaborasi & Slicing Desain', 'Penyusunan PRD, User Story & Acceptance Criteria, alur Git kolaboratif (PR & conflict), Design Token, dan Mobile-First.', '65 Menit', NULL),
('c0000008-0000-0000-0000-000000000008', 8, 'Integrasi Data Dinamis', 'BaaS Supabase, 5 UI States (Idle, Loading, Success, Error, Empty), Debounce, AbortController, Row Level Security, DOMPurify XSS.', '70 Menit', NULL),
('c0000009-0000-0000-0000-000000000009', 9, 'Usability Testing & Sprint Perbaikan', 'Metode Think-Aloud, aturan 5 pengguna Nielsen, Microsoft Clarity heatmap & rage click, metrik SEQ, dan triase GitHub Issue.', '60 Menit', NULL),
('c0000010-0000-0000-0000-000000000010', 10, 'Audit Kualitas Web & Showcase Portofolio', 'Audit Google Lighthouse, Core Web Vitals (LCP, INP, CLS), sanitasi keamanan dasar (.env & HTTPS), dan struktur studi kasus portofolio.', '60 Menit', NULL)
ON CONFLICT (urutan) DO NOTHING;

-- 2. Insert Sections for Course 1
INSERT INTO sections (course_id, urutan, judul, isi) VALUES
('c0000001-0000-0000-0000-000000000001', 1, 'Bagian 1: Pola Pikir Value Driven & Startup Mindset', 
'### Memahami Pola Pikir Value Driven

Banyak pemula terjebak membuat produk digital karena teknologinya terlihat keren, bukan karena menyelesaikan masalah nyata. Pola pikir **Value Driven** menekankan bahwa:
- Keputusan fitur berpusat pada seberapa besar manfaat langsung yang dirasakan oleh pengguna.
- Pertanyaan fundamental: *"Nilai apa yang dapat mempermudah hidup pengguna?"*, bukan sekadar *"Fitur canggih apa yang bisa kita buat?"*.
- **Agility:** Bergerak cepat, menguji hipotesis lebih awal, menerima umpan balik jujur dari pengguna, dan melakukan iterasi berkesinambungan.'),

('c0000001-0000-0000-0000-000000000001', 2, 'Bagian 2: Problem Statement Canvas & Teknik 5 Whys', 
'### Membedah Masalah dengan Presisi

Sebelum menyentuh baris kode, validasi masalah adalah fondasi utama.
1. **Problem Statement Canvas:** Alat pembedah siapa penggunanya (*Who*), apa titik sakitnya (*Pain Point*), di mana & kapan terjadi (*Context*), dan apa celah dari solusi alternatif saat ini (*The Gap*).
2. **Teknik 5 Whys:** Metode menggali hingga ke akar masalah (*Root Cause*), bukan hanya sekadar mengobati gejala (*Symptom*).
3. **Rumusan Masalah Standar:**
   > "[Target Pengguna] kesulitan saat [Konteks] karena [Akar Masalah], yang berakibat [Dampak Terukur]."'),

('c0000001-0000-0000-0000-000000000001', 3, 'Referensi Tambahan: Lean Startup & MVP Case Study', 
'### Bacaan Pengayaan Industri
- Eric Ries - *The Lean Startup* (Siklus Build-Measure-Learn).
- Konsep **Problem-Solution Fit** sebagai checkpoint mutlak sebelum melangkah ke Product-Market Fit.
- Studi Kasus: Manajemen Operasional Kos-Kosan (Manual vs Otomatisasi Terintegrasi).')
ON CONFLICT (course_id, urutan) DO NOTHING;
