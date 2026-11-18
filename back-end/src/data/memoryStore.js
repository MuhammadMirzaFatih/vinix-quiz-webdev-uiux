/**
 * VINIX7 In-Memory Data Store
 * ============================================================
 * Penyimpanan data sementara sebelum kredensial Supabase tersedia.
 * Struktur objek 100% identik dengan skema tabel PostgreSQL/Supabase
 * sehingga migrasi cukup mengganti fungsi akses data di layer services/.
 *
 * Tabel yang dicerminkan (9 tabel sesuai PRD Bagian 11):
 *   users, courses, sections, questions, options,
 *   essay_rubrics, attempts, answers, progress
 * ============================================================
 */

import { v4 as uuidv4 } from 'uuid';

// ─── Helper ───────────────────────────────────────────────────────────────────
const now = () => new Date().toISOString();

// ─── 1. USERS ─────────────────────────────────────────────────────────────────
// Kolom: id, nama, email, password_hash, avatar_url, created_at, updated_at
export const users = [];

// ─── 2. COURSES ───────────────────────────────────────────────────────────────
// Kolom: id, urutan, judul, ringkasan, kategori, estimasi_waktu, level,
//        icon, referensi_eksternal, pdf_url, created_at, updated_at
export const courses = [
  {
    id: 'c0000001-0000-0000-0000-000000000001',
    urutan: 1,
    judul: 'Mindset Startup & Problem Solving',
    ringkasan: 'Pola pikir value-driven, identifikasi masalah nyata, Problem Statement Canvas, dan metode 5 Whys.',
    kategori: 'Product & Startup',
    estimasi_waktu: '45 Menit',
    level: 'Fondasi',
    icon: 'Lightbulb',
    referensi_eksternal: 'Lean Startup (Eric Ries), MVP Principle, 5 Whys Root Cause Analysis',
    pdf_url: 'https://drive.google.com/file/d/1ofkBoMKz26NmUddSc5dCT3y7JexVlKnS/preview',
    created_at: now(), updated_at: now()
  },
  {
    id: 'c0000002-0000-0000-0000-000000000002',
    urutan: 2,
    judul: 'UI/UX & Design Thinking',
    ringkasan: 'Mengupas tuntas anatomi desain produk digital, 5 tahap Design Thinking, kurva 1:10:100, dan studi kasus produk gagal.',
    kategori: 'UI/UX Design',
    estimasi_waktu: '50 Menit',
    level: 'Fondasi',
    icon: 'Palette',
    referensi_eksternal: "Double Diamond Framework, Hukum UX (Hick's Law), Studi Kasus Juicero, Windows 8, Google Glass",
    pdf_url: 'https://drive.google.com/file/d/1Tp17CHNjKtoU0JVsaGZrAZDIMK9JbNGE/preview',
    created_at: now(), updated_at: now()
  },
  {
    id: 'c0000003-0000-0000-0000-000000000003',
    urutan: 3,
    judul: 'User Research & Persona',
    ringkasan: 'Metode riset kualitatif & kuantitatif, teknik wawancara bebas leading question, User Persona, dan Journey Map.',
    kategori: 'UI/UX Design',
    estimasi_waktu: '55 Menit',
    level: 'Intermediate',
    icon: 'Users',
    referensi_eksternal: 'Empathy Map (Says, Thinks, Does, Feels), User Journey Mapping, Wawancara 3-5 Responden',
    pdf_url: null,
    created_at: now(), updated_at: now()
  },
  {
    id: 'c0000004-0000-0000-0000-000000000004',
    urutan: 4,
    judul: 'Wireframing & User Flow',
    ringkasan: 'Information Architecture (IA), pola baca F-Pattern & Z-Pattern, prinsip Proximity, Contrast, dan Crazy 8s.',
    kategori: 'UI/UX Design',
    estimasi_waktu: '60 Menit',
    level: 'Intermediate',
    icon: 'Layers',
    referensi_eksternal: 'Pilar Information Architecture, Pola Scan F/Z, Flowchart Simbol (Terminator, Process, Decision)',
    pdf_url: null,
    created_at: now(), updated_at: now()
  },
  {
    id: 'c0000005-0000-0000-0000-000000000005',
    urutan: 5,
    judul: 'UI & Prototyping',
    ringkasan: 'Low-Fidelity vs High-Fidelity prototype, komponen form interaktif, CTA, dan prinsip Test Early, Learn Fast.',
    kategori: 'UI/UX Design',
    estimasi_waktu: '50 Menit',
    level: 'Intermediate',
    icon: 'Smartphone',
    referensi_eksternal: 'Figma Interaction Links, Anatomy of Form Components, Mobile-first touch targets',
    pdf_url: null,
    created_at: now(), updated_at: now()
  },
  {
    id: 'c0000006-0000-0000-0000-000000000006',
    urutan: 6,
    judul: 'HTML Dasar & Semantik',
    ringkasan: 'Struktur dokumen HTML5, tag semantik (article, header, main), aksesibilitas atribut alt, dan WCAG 1.4.3.',
    kategori: 'Web Development',
    estimasi_waktu: '45 Menit',
    level: 'Fondasi',
    icon: 'Code2',
    referensi_eksternal: 'W3C HTML5 Specification, WCAG 2.1 AA Contrast Ratio (4.5:1), Semantic Accessibility',
    pdf_url: null,
    created_at: now(), updated_at: now()
  },
  {
    id: 'c0000007-0000-0000-0000-000000000007',
    urutan: 7,
    judul: 'PRD, AI, Git Kolaborasi & Slicing Desain',
    ringkasan: 'Format User Story, Acceptance Criteria, alur Git kolaboratif (PR & conflict), Design Token, dan Mobile-First.',
    kategori: 'Engineering & Workflow',
    estimasi_waktu: '65 Menit',
    level: 'Intermediate',
    icon: 'GitPullRequest',
    referensi_eksternal: 'Git Feature Branch Workflow, Pull Request & Code Review Etiquette, Design Tokens in Tailwind',
    pdf_url: null,
    created_at: now(), updated_at: now()
  },
  {
    id: 'c0000008-0000-0000-0000-000000000008',
    urutan: 8,
    judul: 'Integrasi Data Dinamis',
    ringkasan: 'BaaS Supabase, 5 UI States (Idle, Loading, Success, Error, Empty), Debounce, AbortController, RLS, DOMPurify.',
    kategori: 'Web Development',
    estimasi_waktu: '70 Menit',
    level: 'Advanced',
    icon: 'Database',
    referensi_eksternal: 'PostgreSQL Row Level Security, Sanitasi XSS DOMPurify, Debounce Hook, AbortController',
    pdf_url: null,
    created_at: now(), updated_at: now()
  },
  {
    id: 'c0000009-0000-0000-0000-000000000009',
    urutan: 9,
    judul: 'Usability Testing & Sprint Perbaikan',
    ringkasan: 'Metode Think-Aloud, aturan 5 pengguna Nielsen, Microsoft Clarity heatmap & rage click, metrik SEQ, dan GitHub Issues.',
    kategori: 'UI/UX & Quality',
    estimasi_waktu: '60 Menit',
    level: 'Advanced',
    icon: 'Sparkles',
    referensi_eksternal: 'Nielsen Norman 5 User Rule, Think-Aloud Protocol, Session Replays, Single Ease Question (SEQ)',
    pdf_url: null,
    created_at: now(), updated_at: now()
  },
  {
    id: 'c0000010-0000-0000-0000-000000000010',
    urutan: 10,
    judul: 'Audit Kualitas Web & Showcase Portofolio',
    ringkasan: 'Audit Google Lighthouse, Core Web Vitals (LCP, INP, CLS), sanitasi keamanan dasar (.env & HTTPS), dan studi kasus portofolio.',
    kategori: 'Engineering & Career',
    estimasi_waktu: '60 Menit',
    level: 'Advanced',
    icon: 'Award',
    referensi_eksternal: 'Google Lighthouse Audit >= 90, Core Web Vitals (LCP <= 2.5s, INP <= 200ms, CLS <= 0.1), Case Study Structure',
    pdf_url: null,
    created_at: now(), updated_at: now()
  }
];

// ─── 3. SECTIONS ──────────────────────────────────────────────────────────────
// Kolom: id, course_id, urutan, judul, isi, pdf_url, pdf_title, created_at
export const sections = [
  // ═══════ Modul 1: Mindset Startup & Problem Solving ═══════
  {
    id: 's0000001-0000-0000-0000-000000000001',
    course_id: 'c0000001-0000-0000-0000-000000000001',
    urutan: 1,
    judul: 'Bagian 1: Pola Pikir Value Driven & Agility',
    isi: `### 1. Pola Pikir Value Driven vs Feature Driven\nDalam pengembangan produk digital, kesalahan paling sering dari pemula adalah berfokus pada teknologi canggih atau fitur sebanyak mungkin (*feature-driven*), bukan pada nilai manfaat yang diterima pengguna (*value-driven*).\n\n> **Prinsip Utama:** Nilai (*Value*) tercipta saat sebuah produk berhasil mempermudah hidup pengguna atau menyelesaikan masalah mendesak yang mereka hadapi.\n\n#### Karakteristik Mindset Value-Driven:\n* **Solve The Problem:** Selalu berpegang pada masalah nyata pengguna, bukan ide asumsi sepihak.\n* **Agility:** Kemampuan tim untuk bergerak cepat, menerima umpan balik, beradaptasi dan iterasi.\n* **Kegagalan Awal adalah Data:** Setiap kesalahan adalah data berharga untuk perbaikan produk.`,
    pdf_url: 'https://drive.google.com/file/d/1ofkBoMKz26NmUddSc5dCT3y7JexVlKnS/preview',
    pdf_title: 'Slide PPT Modul 1: Startup Mindset & Agility',
    created_at: now()
  },
  {
    id: 's0000001-0000-0000-0000-000000000002',
    course_id: 'c0000001-0000-0000-0000-000000000001',
    urutan: 2,
    judul: 'Bagian 2: Problem Statement Canvas & Teknik 5 Whys',
    isi: `### 2. Membedah Masalah dengan Problem Statement Canvas\nSebelum membuat antarmuka atau menulis kode, tim wajib membedah masalah menggunakan 4 elemen pokok:\n1. **Who (Target Pengguna):** Siapa kelompok spesifik yang paling menderita akibat masalah ini?\n2. **Context (When & Where):** Kapan dan di mana masalah tersebut paling sering muncul?\n3. **Root Cause (Akar Masalah):** Penyebab terdalam yang memicu timbulnya masalah.\n4. **The Gap:** Celah kelemahan dari solusi alternatif yang saat ini digunakan pengguna.\n\nFormat: "[Target Pengguna] kesulitan saat [Konteks] karena [Akar Masalah], yang berakibat [Dampak Terukur]."\n\n#### Teknik 5 Whys\nMetode mengajukan pertanyaan "Mengapa?" secara berulang hingga ditemukan akar terdalam (root cause).`,
    pdf_url: 'https://drive.google.com/file/d/1ofkBoMKz26NmUddSc5dCT3y7JexVlKnS/preview',
    pdf_title: 'Slide PPT Modul 1: Problem Canvas & 5 Whys',
    created_at: now()
  },
  {
    id: 's0000001-0000-0000-0000-000000000003',
    course_id: 'c0000001-0000-0000-0000-000000000001',
    urutan: 3,
    judul: 'Referensi Tambahan: Lean Startup & Studi Kasus Kos-Kosan',
    isi: `### 3. Studi Kasus Manajemen Kos-Kosan\nPemilik kos dengan 10–30 kamar yang tidak tinggal di lokasi kesulitan memantau pembayaran sewa bulanan.\n\n* **Solusi Saat Ini:** Broadcast WhatsApp satu per satu dan catat manual di Excel.\n* **The Gap:** Pesan WA sering diabaikan, bukti transfer palsu sulit diverifikasi.\n* **Peluang MVP:** Notifikasi otomatis terintegrasi gateway pembayaran dan dashboard arus kas.`,
    pdf_url: 'https://drive.google.com/file/d/1ofkBoMKz26NmUddSc5dCT3y7JexVlKnS/preview',
    pdf_title: 'Slide PPT Modul 1: Lean Startup & Studi Kasus',
    created_at: now()
  },
  // ═══════ Modul 2: UI/UX & Design Thinking ═══════
  {
    id: 's0000002-0000-0000-0000-000000000001',
    course_id: 'c0000002-0000-0000-0000-000000000002',
    urutan: 1,
    judul: 'Bagian 1: Anatomi UI vs UX & Kurva Biaya 1:10:100',
    isi: `### 1. UI vs UX\n* **UX (User Experience):** Fokus strategi, psikologi, dan alur pemecahan masalah (di pikiran pengguna).\n* **UI (User Interface):** Fokus estetika, desain interaksi, dan identitas merek (di layar perangkat).\n\n> **Kurva 1:10:100:** Memperbaiki desain setelah rilis 100x lebih mahal dibanding fase riset awal.`,
    pdf_url: 'https://drive.google.com/file/d/1Tp17CHNjKtoU0JVsaGZrAZDIMK9JbNGE/preview',
    pdf_title: 'Slide PPT Modul 2: Anatomi UI vs UX & Kurva Biaya 1:10:100',
    created_at: now()
  },
  {
    id: 's0000002-0000-0000-0000-000000000002',
    course_id: 'c0000002-0000-0000-0000-000000000002',
    urutan: 2,
    judul: 'Bagian 2: 5 Tahap Design Thinking & Purwarupa Kasar',
    isi: `### 2. Lima Tahapan Design Thinking\n1. **Empathize** – Pahami apa yang dirasakan dan menjadi penderitaan pengguna.\n2. **Define** – Rumuskan akar permasalahan psikologis secara spesifik.\n3. **Ideate** – Brainstorming sebebas mungkin, jangan tolak ide aneh.\n4. **Prototype** – Buat representasi murah (sketsa kertas atau wireframe hitam-putih).\n5. **Test** – Langsung ujikan ke target audiens, cari kebingungan bukan pujian.`,
    pdf_url: 'https://drive.google.com/file/d/1Tp17CHNjKtoU0JVsaGZrAZDIMK9JbNGE/preview',
    pdf_title: 'Slide PPT Modul 2: 5 Tahap Design Thinking & Purwarupa Kasar',
    created_at: now()
  },
  {
    id: 's0000002-0000-0000-0000-000000000003',
    course_id: 'c0000002-0000-0000-0000-000000000002',
    urutan: 3,
    judul: 'Bagian 3: Studi Kasus Produk Gagal & Dosa Besar Desainer',
    isi: `### 3. Studi Kasus Produk Gagal\n* **Juicero ($120M):** Over-engineering tanpa nilai guna nyata.\n* **Windows 8:** Menghapus tombol Start, disorientasi pengguna massal.\n* **Google Glass:** Abai konteks sosial dan privasi publik.\n\n#### 4 Dosa Besar Desainer Pemula:\n1. Mendesain untuk diri sendiri.\n2. Terbiasa "Lorem Ipsum".\n3. Terlalu banyak opsi (Hick's Law).\n4. Estetika membunuh fungsi.`,
    pdf_url: 'https://drive.google.com/file/d/1Tp17CHNjKtoU0JVsaGZrAZDIMK9JbNGE/preview',
    pdf_title: 'Slide PPT Modul 2: Studi Kasus Produk Gagal & Dosa Besar Desainer',
    created_at: now()
  }
];

// ─── 4. QUESTIONS (Modul 1 – Set A, B, C lengkap) ────────────────────────────
// Kolom: id, course_id, set_paket, topik, tipe, teks, urutan, created_at
export const questions = [
  // ════════════ SET A – 10 PG ════════════
  { id: 'q1000001-0000-0000-0000-000000000001', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'A', topik: 'Startup Mindset', tipe: 'pilihan_ganda', teks: 'Dalam konteks pengembangan produk startup digital, manakah pernyataan berikut yang paling tepat membedakan pendekatan Value-Driven dari pendekatan Feature-Driven?', urutan: 1, created_at: now() },
  { id: 'q1000001-0000-0000-0000-000000000002', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'A', topik: 'Startup Mindset', tipe: 'pilihan_ganda', teks: 'Sebelum menyetujui penambahan fitur baru ke dalam roadmap produk, pertanyaan validasi paling mendasar yang wajib diajukan tim menurut pola pikir startup adalah...', urutan: 2, created_at: now() },
  { id: 'q1000001-0000-0000-0000-000000000003', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'A', topik: 'Problem Solving', tipe: 'pilihan_ganda', teks: 'Sebuah startup merilis aplikasi dengan desain antarmuka modern dan transisi animasi mulus, namun tingkat retensi pengguna (30-day retention) anjlok drastis ke angka 5%. Berdasarkan prinsip "Solve The Problem", diagnosa akar masalah yang paling tepat adalah...', urutan: 3, created_at: now() },
  { id: 'q1000001-0000-0000-0000-000000000004', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'A', topik: 'Agility', tipe: 'pilihan_ganda', teks: 'Bagaimanakah penerapan prinsip Agility yang paling tepat ketika fitur baru yang telah dikembangkan selama berbulan-bulan terbukti sangat jarang digunakan oleh pengguna berdasarkan data analitik?', urutan: 4, created_at: now() },
  { id: 'q1000001-0000-0000-0000-000000000005', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'A', topik: 'Validasi Masalah', tipe: 'pilihan_ganda', teks: 'Dalam metodologi startup, mengapa kegagalan saat menguji hipotesis produk di fase awal dipandang sebagai sebuah "keberhasilan pembelajaran (validated learning)", bukan kerugian mutlak?', urutan: 5, created_at: now() },
  { id: 'q1000001-0000-0000-0000-000000000006', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'A', topik: 'Problem-Solution Fit', tipe: 'pilihan_ganda', teks: 'Mengapa melakukan ekspansi agresif (scaling tim & anggaran pemasaran besar-besaran) sebelum mencapai Problem-Solution Fit dianggap sebagai penyebab kematian utama bagi startup tahap awal (premature scaling)?', urutan: 6, created_at: now() },
  { id: 'q1000001-0000-0000-0000-000000000007', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'A', topik: 'Problem Statement Canvas', tipe: 'pilihan_ganda', teks: 'Pada perumusan Problem Statement Canvas, tim sering kali tergoda mendefinisikan elemen "Who" (Target Pengguna) dengan cakupan seluas mungkin, misalnya "Semua orang yang menggunakan smartphone". Mengapa pola ini merupakan jebakan berbahaya?', urutan: 7, created_at: now() },
  { id: 'q1000001-0000-0000-0000-000000000008', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'A', topik: 'Teknik 5 Whys', tipe: 'pilihan_ganda', teks: 'Perhatikan studi kasus: "Penyewa kos sering terlambat membayar sewa bulanan". Jika pengelola kos hanya berhenti pada kesimpulan awal dan langsung membangun aplikasi dengan notifikasi alarm harian, mengapa solusi ini kemungkinan besar gagal berdasarkan teknik 5 Whys?', urutan: 8, created_at: now() },
  { id: 'q1000001-0000-0000-0000-000000000009', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'A', topik: 'Problem Statement Canvas', tipe: 'pilihan_ganda', teks: 'Dalam Problem Statement Canvas, mengapa pemahaman mendalam mengenai elemen "The Gap" (kelemahan atau celah dari solusi alternatif yang saat ini digunakan pengguna) menjadi fondasi penentu diferensiasi produk?', urutan: 9, created_at: now() },
  { id: 'q1000001-0000-0000-0000-000000000010', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'A', topik: 'Problem Statement Canvas', tipe: 'pilihan_ganda', teks: 'Manakah rumusan kalimat masalah di bawah ini yang paling disiplin dan tepat dalam menerapkan struktur baku Problem Statement Canvas?', urutan: 10, created_at: now() },
  // ════════════ SET A – 5 Essay ════════════
  { id: 'q1000002-0000-0000-0000-000000000001', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'A', topik: 'Problem Statement Canvas', tipe: 'essay', teks: 'Sebutkan 4 elemen pokok yang terdapat di dalam Problem Statement Canvas sesuai materi slide!', urutan: 11, created_at: now() },
  { id: 'q1000002-0000-0000-0000-000000000002', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'A', topik: 'Teknik 5 Whys', tipe: 'essay', teks: 'Secara singkat, apa tujuan utama dari teknik 5 Whys dalam membedah masalah produk?', urutan: 12, created_at: now() },
  { id: 'q1000002-0000-0000-0000-000000000003', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'A', topik: 'Startup Mindset', tipe: 'essay', teks: 'Jelaskan perbedaan singkat antara pola pikir Value-Driven dan Feature-Driven!', urutan: 13, created_at: now() },
  { id: 'q1000002-0000-0000-0000-000000000004', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'A', topik: 'Problem Statement', tipe: 'essay', teks: 'Tuliskan rumus kalimat standar dalam menyusun Problem Statement sesuai slide materi!', urutan: 14, created_at: now() },
  { id: 'q1000002-0000-0000-0000-000000000005', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'A', topik: 'Agility & Validasi', tipe: 'essay', teks: 'Mengapa kegagalan awal dalam startup dianggap sebagai data berharga dan bukan kerugian mutlak?', urutan: 15, created_at: now() },
  // ════════════ SET B – 10 PG ════════════
  { id: 'q1000003-0000-0000-0000-000000000001', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'B', topik: 'Problem Solving', tipe: 'pilihan_ganda', teks: 'Strategi AI yang paling tepat digunakan untuk merumuskan pain point pengguna adalah...', urutan: 1, created_at: now() },
  { id: 'q1000003-0000-0000-0000-000000000002', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'B', topik: 'Analisis Kompetitor', tipe: 'pilihan_ganda', teks: 'Analisis kompetitor pada tahap perumusan masalah bertujuan untuk menemukan...', urutan: 2, created_at: now() },
  { id: 'q1000003-0000-0000-0000-000000000003', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'B', topik: 'Startup Mindset', tipe: 'pilihan_ganda', teks: 'UVP merupakan singkatan dari...', urutan: 3, created_at: now() },
  { id: 'q1000003-0000-0000-0000-000000000004', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'B', topik: 'Problem Solving', tipe: 'pilihan_ganda', teks: 'Penggunaan peran AI sebagai "Devil’s Advocate" berfungsi untuk...', urutan: 4, created_at: now() },
  { id: 'q1000003-0000-0000-0000-000000000005', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'B', topik: 'Anatomi Masalah', tipe: 'pilihan_ganda', teks: 'Unsur "Who" dalam anatomi rumusan masalah merujuk pada...', urutan: 5, created_at: now() },
  { id: 'q1000003-0000-0000-0000-000000000006', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'B', topik: 'Anatomi Masalah', tipe: 'pilihan_ganda', teks: 'Definisi target pengguna yang baik dan terarah adalah...', urutan: 6, created_at: now() },
  { id: 'q1000003-0000-0000-0000-000000000007', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'B', topik: 'Pain Point', tipe: 'pilihan_ganda', teks: 'Istilah "Pain Point" dalam perancangan produk berarti...', urutan: 7, created_at: now() },
  { id: 'q1000003-0000-0000-0000-000000000008', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'B', topik: 'Jobs to be Done', tipe: 'pilihan_ganda', teks: 'Kerangka "Jobs to be Done" (JTBD) menjelaskan tentang...', urutan: 8, created_at: now() },
  { id: 'q1000003-0000-0000-0000-000000000009', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'B', topik: 'Konteks Masalah', tipe: 'pilihan_ganda', teks: 'Unsur Konteks (When & Where) dalam rumusan masalah menjelaskan...', urutan: 9, created_at: now() },
  { id: 'q1000003-0000-0000-0000-000000000010', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'B', topik: 'Root Cause', tipe: 'pilihan_ganda', teks: 'Metode yang efektif digunakan untuk menggali hingga ke akar masalah adalah...', urutan: 10, created_at: now() },
  // ════════════ SET B – 5 Essay ════════════
  { id: 'q1000004-0000-0000-0000-000000000001', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'B', topik: 'Inovasi Produk', tipe: 'essay', teks: 'Bagaimana keluhan pelanggan dapat diubah menjadi sumber inovasi berharga bagi startup?', urutan: 11, created_at: now() },
  { id: 'q1000004-0000-0000-0000-000000000002', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'B', topik: 'Problem Statement Canvas', tipe: 'essay', teks: 'Jelaskan fungsi dan manfaat dari Problem Statement Canvas bagi tim produk!', urutan: 12, created_at: now() },
  { id: 'q1000004-0000-0000-0000-000000000003', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'B', topik: 'Problem Solving', tipe: 'essay', teks: 'Sebutkan dan jelaskan empat strategi riset menggunakan AI Prompting!', urutan: 13, created_at: now() },
  { id: 'q1000004-0000-0000-0000-000000000004', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'B', topik: 'Root Cause', tipe: 'essay', teks: 'Jelaskan perbedaan mendasar antara Pain Point dan Root Cause!', urutan: 14, created_at: now() },
  { id: 'q1000004-0000-0000-0000-000000000005', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'B', topik: 'Anatomi Masalah', tipe: 'essay', teks: 'Mengapa target pengguna dalam perancangan produk tidak boleh didefinisikan sebagai "semua orang"?', urutan: 15, created_at: now() },
  // ════════════ SET C – 10 PG ════════════
  { id: 'q1000005-0000-0000-0000-000000000001', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'C', topik: 'Startup Mindset', tipe: 'pilihan_ganda', teks: 'Prinsip "Fail Fast, Learn Faster" dalam startup paling tepat diartikan sebagai...', urutan: 1, created_at: now() },
  { id: 'q1000005-0000-0000-0000-000000000002', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'C', topik: 'Problem Solving', tipe: 'pilihan_ganda', teks: 'Tim desain mengetahui bahwa pengguna sering kali meninggalkan halaman checkout. Langkah pertama yang paling tepat menurut Problem-Solving mindset adalah...', urutan: 2, created_at: now() },
  { id: 'q1000005-0000-0000-0000-000000000003', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'C', topik: 'Validasi Masalah', tipe: 'pilihan_ganda', teks: 'Mana dari berikut ini yang BUKAN merupakan cara valid untuk memvalidasi masalah pengguna?', urutan: 3, created_at: now() },
  { id: 'q1000005-0000-0000-0000-000000000004', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'C', topik: 'Agility', tipe: 'pilihan_ganda', teks: 'Prinsip Agility dalam pengembangan produk mengutamakan...', urutan: 4, created_at: now() },
  { id: 'q1000005-0000-0000-0000-000000000005', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'C', topik: 'Problem Statement Canvas', tipe: 'pilihan_ganda', teks: 'Mana pernyataan berikut yang paling tepat menggambarkan tujuan Problem Statement Canvas?', urutan: 5, created_at: now() },
  { id: 'q1000005-0000-0000-0000-000000000006', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'C', topik: 'Problem-Solution Fit', tipe: 'pilihan_ganda', teks: 'Sebuah aplikasi transportasi menemukan bahwa mayoritas pengguna aktifnya hanya menggunakan 1 fitur dari 15 yang tersedia. Kesimpulan terbaik berdasarkan prinsip Value-Driven adalah...', urutan: 6, created_at: now() },
  { id: 'q1000005-0000-0000-0000-000000000007', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'C', topik: 'Teknik 5 Whys', tipe: 'pilihan_ganda', teks: 'Manakah situasi yang paling tepat untuk menggunakan teknik 5 Whys?', urutan: 7, created_at: now() },
  { id: 'q1000005-0000-0000-0000-000000000008', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'C', topik: 'Startup Mindset', tipe: 'pilihan_ganda', teks: 'Mengapa startup disarankan untuk memulai dengan segmen pengguna yang sangat sempit dan spesifik (niche)?', urutan: 8, created_at: now() },
  { id: 'q1000005-0000-0000-0000-000000000009', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'C', topik: 'Validasi Masalah', tipe: 'pilihan_ganda', teks: 'Mengapa wawancara pengguna (user interview) dianggap lebih valid dibanding survei kuesioner untuk menemukan pain point?', urutan: 9, created_at: now() },
  { id: 'q1000005-0000-0000-0000-000000000010', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'C', topik: 'Problem Statement Canvas', tipe: 'pilihan_ganda', teks: 'Apa risiko utama jika tim produk melewatkan tahap analisis "Root Cause" dan langsung melompat ke solusi?', urutan: 10, created_at: now() },
  // ════════════ SET C – 5 Essay ════════════
  { id: 'q1000006-0000-0000-0000-000000000001', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'C', topik: 'Startup Mindset', tipe: 'essay', teks: 'Apa yang dimaksud dengan "Product-Market Fit" dan mengapa ini dianggap sebagai milestone terpenting startup?', urutan: 11, created_at: now() },
  { id: 'q1000006-0000-0000-0000-000000000002', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'C', topik: 'Problem Statement Canvas', tipe: 'essay', teks: 'Jelaskan mengapa "The Gap" adalah elemen terpenting dalam Problem Statement Canvas dari sudut pandang diferensiasi produk!', urutan: 12, created_at: now() },
  { id: 'q1000006-0000-0000-0000-000000000003', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'C', topik: 'Agility', tipe: 'essay', teks: 'Apa yang dimaksud dengan "iterasi" dalam konteks pengembangan produk agile? Mengapa iterasi cepat lebih baik dari perencanaan besar-besaran?', urutan: 13, created_at: now() },
  { id: 'q1000006-0000-0000-0000-000000000004', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'C', topik: 'Validasi Masalah', tipe: 'essay', teks: 'Sebutkan 2 cara konkret untuk memvalidasi apakah masalah yang ingin diselesaikan oleh startup benar-benar dirasakan oleh pengguna!', urutan: 14, created_at: now() },
  { id: 'q1000006-0000-0000-0000-000000000005', course_id: 'c0000001-0000-0000-0000-000000000001', set_paket: 'C', topik: 'Problem Solving', tipe: 'essay', teks: 'Jelaskan konsep "Premature Scaling" dan dampaknya pada keberlangsungan startup!', urutan: 15, created_at: now() }
];

// ─── 5. OPTIONS (Jawaban PG Set A Modul 1 – lengkap dengan kunci) ─────────────
// Kolom: id, question_id, teks, poin (10=benar/0=salah), umpan_balik, is_correct
export const options = [
  // Q1-A: Value-Driven vs Feature-Driven
  { id: 'o1-A1-1', question_id: 'q1000001-0000-0000-0000-000000000001', teks: 'Value-Driven mengukur keberhasilan produk dari tingginya angka durasi waktu yang dihabiskan pengguna di dalam aplikasi, sedangkan Feature-Driven mengukurnya dari kecepatan rilis versi baru.', poin: 0, umpan_balik: 'Keliru. Durasi penggunaan semata adalah vanity metric, bukan pembeda esensi value-driven.', is_correct: false },
  { id: 'o1-A1-2', question_id: 'q1000001-0000-0000-0000-000000000001', teks: 'Value-Driven fokus mewujudkan seluruh daftar permintaan fitur yang diajukan pengguna pada survei, sedangkan Feature-Driven fokus mengimplementasikan ide inovatif internal tim pendiri.', poin: 0, umpan_balik: 'Keliru. Menuruti semua permintaan tanpa validasi justru melahirkan feature bloat.', is_correct: false },
  { id: 'o1-A1-3', question_id: 'q1000001-0000-0000-0000-000000000001', teks: 'Value-Driven berpusat pada seberapa efektif produk menuntaskan pain point dan mempermudah hidup pengguna, sedangkan Feature-Driven berfokus pada kuantitas fitur serta adopsi tren teknologi terkini.', poin: 10, umpan_balik: 'Tepat! Value-driven selalu berfokus pada pemecahan masalah nyata dan nilai manfaat pengguna.', is_correct: true },
  { id: 'o1-A1-4', question_id: 'q1000001-0000-0000-0000-000000000001', teks: 'Value-Driven memprioritaskan fitur-fitur yang langsung menghasilkan arus kas (monetization-first), sedangkan Feature-Driven memprioritaskan fitur gratis untuk memperbesar basis pengguna.', poin: 0, umpan_balik: 'Keliru. Ini strategi bisnis/pricing, bukan definisi value-driven.', is_correct: false },
  // Q2-A
  { id: 'o1-A2-1', question_id: 'q1000001-0000-0000-0000-000000000002', teks: 'Apakah fitur ini secara spesifik memangkas friksi terbesar pengguna dan menyelesaikan masalah mendesak yang belum teratasi dengan baik?', poin: 10, umpan_balik: 'Tepat! Pertanyaan inti startup berpusat pada nilai guna: apakah fitur memangkas friksi nyata?', is_correct: true },
  { id: 'o1-A2-2', question_id: 'q1000001-0000-0000-0000-000000000002', teks: 'Apakah fitur ini memiliki keunikan teknologi mutakhir yang belum diimplementasikan oleh kompetitor utama?', poin: 0, umpan_balik: 'Keliru. Keunikan teknologi bukan validasi utama; validasi adalah nilai nyata bagi pengguna.', is_correct: false },
  { id: 'o1-A2-3', question_id: 'q1000001-0000-0000-0000-000000000002', teks: 'Berapa proyeksi peningkatan metrik pendaftaran akun baru (acquisition rate) jika fitur ini berhasil diluncurkan?', poin: 0, umpan_balik: 'Keliru. Proyeksi akuisisi tanpa validasi masalah hanyalah asumsi.', is_correct: false },
  { id: 'o1-A2-4', question_id: 'q1000001-0000-0000-0000-000000000002', teks: 'Apakah mayoritas responden kuesioner awal menyatakan berminat mencoba jika fitur ini dirilis?', poin: 0, umpan_balik: 'Keliru. Minat verbal di kuesioner bukan bukti validasi masalah yang kuat.', is_correct: false },
  // Q3-A
  { id: 'o1-A3-1', question_id: 'q1000001-0000-0000-0000-000000000003', teks: 'Alur onboarding aplikasi dirancang terlalu ringkas sehingga pengguna belum sempat mengeksplorasi seluruh modul.', poin: 0, umpan_balik: 'Keliru. Kompleksitas onboarding bukan akar dari retensi rendah dalam skenario ini.', is_correct: false },
  { id: 'o1-A3-2', question_id: 'q1000001-0000-0000-0000-000000000003', teks: 'Tim pengembang belum menyematkan mekanisme gamifikasi seperti lencana penghargaan dan sistem streak harian.', poin: 0, umpan_balik: 'Keliru. Gamifikasi hanyalah lapisan atas, bukan solusi masalah nilai inti.', is_correct: false },
  { id: 'o1-A3-3', question_id: 'q1000001-0000-0000-0000-000000000003', teks: 'Segmen target pengguna yang disasar belum memiliki tingkat literasi digital yang memadai.', poin: 0, umpan_balik: 'Keliru. Ini asumsi tanpa dasar; bukan akar masalah dari skenario ini.', is_correct: false },
  { id: 'o1-A3-4', question_id: 'q1000001-0000-0000-0000-000000000003', teks: 'Aplikasi hanya memikat rasa penasaran estetika di awal, namun gagal memberikan solusi atas masalah nyata yang berulang kali dihadapi pengguna.', poin: 10, umpan_balik: 'Tepat! Prinsip "Solve The Problem": keindahan visual tidak mempertahankan pengguna jika masalah riil tidak diselesaikan.', is_correct: true },
  // Q4-A
  { id: 'o1-A4-1', question_id: 'q1000001-0000-0000-0000-000000000004', teks: 'Memindahkan posisi tombol fitur tersebut ke bagian paling atas layar utama agar memperoleh visibilitas maksimal.', poin: 0, umpan_balik: 'Keliru. Meningkatkan visibilitas fitur yang tidak diinginkan tidak menyelesaikan masalah dasarnya.', is_correct: false },
  { id: 'o1-A4-2', question_id: 'q1000001-0000-0000-0000-000000000004', teks: 'Menerima kenyataan data secara objektif tanpa bias ego, mencari tahu alasan mendasar penolakan pengguna, dan berani menghentikan atau merombak fitur tersebut.', poin: 10, umpan_balik: 'Tepat! Agility menuntut keterbukaan terhadap data empiris dan berani mengeliminasi fitur yang tidak bernilai.', is_correct: true },
  { id: 'o1-A4-3', question_id: 'q1000001-0000-0000-0000-000000000004', teks: 'Memberikan insentif voucer atau hadiah kepada pengguna setiap kali mengakses fitur tersebut.', poin: 0, umpan_balik: 'Keliru. Insentif buatan menciptakan penggunaan palsu yang tidak mencerminkan nilai nyata fitur.', is_correct: false },
  { id: 'o1-A4-4', question_id: 'q1000001-0000-0000-0000-000000000004', teks: 'Mempertahankan fitur di sistem sembari menunggu pengguna terbiasa, mengingat alokasi waktu dan biaya yang sudah dihabiskan sangat besar.', poin: 0, umpan_balik: 'Keliru. Ini adalah sunk cost fallacy, kebalikan dari mentalitas agile.', is_correct: false },
  // Q5-A
  { id: 'o1-A5-1', question_id: 'q1000001-0000-0000-0000-000000000005', teks: 'Karena kegagalan membuktikan kepada pemodal bahwa tim telah mengambil risiko inovasi ekstrem.', poin: 0, umpan_balik: 'Keliru. Pembuktian keberanian bukan alasan validated learning.', is_correct: false },
  { id: 'o1-A5-2', question_id: 'q1000001-0000-0000-0000-000000000005', teks: 'Karena setiap ide fitur yang gagal dapat segera dipatenkan agar tidak ditiru kompetitor.', poin: 0, umpan_balik: 'Keliru. Paten bukan tujuan dari validated learning.', is_correct: false },
  { id: 'o1-A5-3', question_id: 'q1000001-0000-0000-0000-000000000005', teks: 'Karena data penolakan pengguna di awal secara cepat menyelamatkan tim dari pemborosan waktu, tenaga, dan modal untuk membangun produk yang tidak diinginkan pasar.', poin: 10, umpan_balik: 'Tepat! Validated learning memandang kegagalan awal sebagai penyelamat sumber daya (waktu, modal, tenaga).', is_correct: true },
  { id: 'o1-A5-4', question_id: 'q1000001-0000-0000-0000-000000000005', teks: 'Karena kegagalan eksperimen otomatis memverifikasi bahwa infrastruktur backend telah bebas dari bug.', poin: 0, umpan_balik: 'Keliru. Kegagalan validasi produk tidak ada hubungannya dengan kualitas infrastruktur backend.', is_correct: false },
  // Q6-A
  { id: 'o1-A6-1', question_id: 'q1000001-0000-0000-0000-000000000006', teks: 'Mempercepat pertumbuhan pada produk yang belum terbukti menyelesaikan masalah hanya akan mempercepat kehabisan kas untuk mendatangkan pengguna yang pada akhirnya pergi.', poin: 10, umpan_balik: 'Tepat! Premature scaling mempercepat pengurasan kas tanpa retensi produk yang solid.', is_correct: true },
  { id: 'o1-A6-2', question_id: 'q1000001-0000-0000-0000-000000000006', teks: 'Tim pengembang belum sempat merapikan arsitektur basis data sebelum penambahan programmer baru.', poin: 0, umpan_balik: 'Keliru. Ini masalah teknis, bukan risiko utama premature scaling.', is_correct: false },
  { id: 'o1-A6-3', question_id: 'q1000001-0000-0000-0000-000000000006', teks: 'Lonjakan trafik pengguna baru akan menurunkan akurasi model data science.', poin: 0, umpan_balik: 'Keliru. Ini bukan risiko utama premature scaling dalam konteks startup awal.', is_correct: false },
  { id: 'o1-A6-4', question_id: 'q1000001-0000-0000-0000-000000000006', teks: 'Persentase kepemilikan saham pendiri akan terdilusi sebelum valuasi mencapai fase optimal.', poin: 0, umpan_balik: 'Keliru. Dilusi saham adalah pertimbangan finansial terpisah dari risiko operasional premature scaling.', is_correct: false },
  // Q7-A
  { id: 'o1-A7-1', question_id: 'q1000001-0000-0000-0000-000000000007', teks: 'Biaya kampanye iklan digital bertarget luas memiliki tarif per klik yang lebih fluktuatif.', poin: 0, umpan_balik: 'Keliru. Ini masalah biaya iklan, bukan alasan mendefinisikan "Who" secara spesifik.', is_correct: false },
  { id: 'o1-A7-2', question_id: 'q1000001-0000-0000-0000-000000000007', teks: 'Perangkat analitik modern tidak sanggup mengelompokkan data aktivitas pengguna jika kriteria tidak dibatasi ketat.', poin: 0, umpan_balik: 'Keliru. Ini masalah teknis analitik, bukan alasan utama.', is_correct: false },
  { id: 'o1-A7-3', question_id: 'q1000001-0000-0000-0000-000000000007', teks: 'Pengguna lintas generasi memiliki preferensi sistem operasi seluler yang berbeda-beda.', poin: 0, umpan_balik: 'Keliru. Ini masalah kompatibilitas teknis, bukan alasan segmentasi pengguna.', is_correct: false },
  { id: 'o1-A7-4', question_id: 'q1000001-0000-0000-0000-000000000007', teks: 'Kebutuhan dan urgensi setiap kelompok pengguna berbeda; jika target ditujukan untuk semua orang, masalah menjadi kabur dan solusi tidak relevan bagi siapa pun.', poin: 10, umpan_balik: 'Tepat! "Who" harus spesifik agar masalah fokus dan solusi relevan.', is_correct: true },
  // Q8-A
  { id: 'o1-A8-1', question_id: 'q1000001-0000-0000-0000-000000000008', teks: 'Penyewa kos lebih merespons panggilan otomatis daripada notifikasi aplikasi.', poin: 0, umpan_balik: 'Keliru. Ini asumsi saluran komunikasi, bukan kelemahan fatal dari pendekatan 5 Whys.', is_correct: false },
  { id: 'o1-A8-2', question_id: 'q1000001-0000-0000-0000-000000000008', teks: 'Pemilik kos hanya mengobati gejala luar (kelupaan), padahal akar masalah bisa berupa ketidaksesuaian siklus tanggal gajian atau friksi metode transfer perbankan.', poin: 10, umpan_balik: 'Tepat! 5 Whys membedah lapisan masalah hingga menemukan akar sejati, bukan sekadar menambal gejala.', is_correct: true },
  { id: 'o1-A8-3', question_id: 'q1000001-0000-0000-0000-000000000008', teks: 'Pengiriman notifikasi alarm harian berisiko memicu resistensi psikologis penyewa.', poin: 0, umpan_balik: 'Keliru. Ini bukan kelemahan fatal dari pendekatan Why ke-1 dalam konteks 5 Whys.', is_correct: false },
  { id: 'o1-A8-4', question_id: 'q1000001-0000-0000-0000-000000000008', teks: 'Pengelola kos belum menerapkan skema penalti denda keterlambatan yang cukup agresif.', poin: 0, umpan_balik: 'Keliru. Penalti adalah intervensi business, bukan jawaban atas pertanyaan 5 Whys.', is_correct: false },
  // Q9-A
  { id: 'o1-A9-1', question_id: 'q1000001-0000-0000-0000-000000000009', teks: 'Pengguna hanya akan bersedia beralih ke produk baru jika produk tersebut menawarkan keunggulan nilai yang nyata dan melompati friksi dari solusi lama mereka.', poin: 10, umpan_balik: 'Tepat! The Gap mengidentifikasi celah ketidakpuasan dari alternatif saat ini yang memicu pengguna mau beralih.', is_correct: true },
  { id: 'o1-A9-2', question_id: 'q1000001-0000-0000-0000-000000000009', teks: 'Pemahaman The Gap memberikan celah hukum hak cipta untuk membatasi ruang gerak kompetitor.', poin: 0, umpan_balik: 'Keliru. The Gap bukan konsep hukum, melainkan analisis kompetitif produk.', is_correct: false },
  { id: 'o1-A9-3', question_id: 'q1000001-0000-0000-0000-000000000009', teks: 'Tim dapat langsung mereplikasi seluruh antarmuka kompetitor dan menambahkan beberapa filter tambahan.', poin: 0, umpan_balik: 'Keliru. Mereplikasi kompetitor tanpa inovasi nilai baru tidak menciptakan diferensiasi.', is_correct: false },
  { id: 'o1-A9-4', question_id: 'q1000001-0000-0000-0000-000000000009', teks: 'The Gap menjadi indikator untuk menetapkan harga jual agar selalu berada di bawah harga kompetitor.', poin: 0, umpan_balik: 'Keliru. Strategi harga bukan tujuan analisis The Gap dalam Problem Statement Canvas.', is_correct: false },
  // Q10-A
  { id: 'o1-A10-1', question_id: 'q1000001-0000-0000-0000-000000000010', teks: 'Aplikasi kami menyediakan platform agregator terintegrasi dengan AI agar pengguna dapat memangkas pengeluaran bulanan hingga 30%.', poin: 0, umpan_balik: 'Keliru. Ini deskripsi solusi/promosi produk, bukan problem statement.', is_correct: false },
  { id: 'o1-A10-2', question_id: 'q1000001-0000-0000-0000-000000000010', teks: 'Generasi muda Indonesia membutuhkan literasi keuangan modern karena tingkat tabungan darurat masih di bawah standar ideal.', poin: 0, umpan_balik: 'Keliru. Terlalu makro dan abstrak, tidak memenuhi format baku Canvas.', is_correct: false },
  { id: 'o1-A10-3', question_id: 'q1000001-0000-0000-0000-000000000010', teks: '[Mahasiswa perantau] kesulitan [mengelola pengeluaran harian] saat [minggu pertama menerima kiriman uang] karena [ketiadaan sistem alokasi pos dana otomatis], yang mengakibatkan [kehabisan uang saku sebelum pertengahan bulan].', poin: 10, umpan_balik: 'Tepat! Format: [Who] kesulitan [konteks] karena [root cause], berakibat [dampak terukur].', is_correct: true },
  { id: 'o1-A10-4', question_id: 'q1000001-0000-0000-0000-000000000010', teks: '[Tim engineering] terkendala [mengintegrasikan payment gateway] karena [dokumentasi teknis belum lengkap], yang berdampak pada [penundaan jadwal rilis dua minggu].', poin: 0, umpan_balik: 'Keliru. Ini kendala teknis internal tim, bukan problem statement pengguna eksternal.', is_correct: false },

  // ─── SET B OPTIONS (Modul 1 Set B) ───
  // Q1-B: AI Prompting Strategy
  { id: 'o1-B1-1', question_id: 'q1000003-0000-0000-0000-000000000001', teks: 'Data Mining Otomatis', poin: 0, umpan_balik: 'Keliru. Data mining tidak merumuskan pain point secara langsung.', is_correct: false },
  { id: 'o1-B1-2', question_id: 'q1000003-0000-0000-0000-000000000001', teks: 'Prompt Engineering terstruktur', poin: 10, umpan_balik: 'Tepat! Prompt engineering terstruktur membantu menggali pain point secara tajam.', is_correct: true },
  { id: 'o1-B1-3', question_id: 'q1000003-0000-0000-0000-000000000001', teks: 'Web Hosting Serverless', poin: 0, umpan_balik: 'Keliru. Ini ranah infrastruktur cloud, bukan perumusan masalah.', is_correct: false },
  { id: 'o1-B1-4', question_id: 'q1000003-0000-0000-0000-000000000001', teks: 'Cloud Computing', poin: 0, umpan_balik: 'Keliru. Cloud computing adalah teknologi komputasi awan.', is_correct: false },
  // Q2-B: Analisis Kompetitor
  { id: 'o1-B2-1', question_id: 'q1000003-0000-0000-0000-000000000002', teks: 'Harga produk termurah di pasar', poin: 0, umpan_balik: 'Keliru. Analisis kompetitor bukan semata-mata mencari harga termurah.', is_correct: false },
  { id: 'o1-B2-2', question_id: 'q1000003-0000-0000-0000-000000000002', teks: 'Celah kebutuhan pengguna yang belum dipenuhi kompetitor', poin: 10, umpan_balik: 'Tepat! Tujuan utama analisis kompetitor adalah mencari The Gap (celah pasar).', is_correct: true },
  { id: 'o1-B2-3', question_id: 'q1000003-0000-0000-0000-000000000002', teks: 'Total modal usaha terbesar', poin: 0, umpan_balik: 'Keliru. Modal usaha bukan tujuan analisis perumusan masalah.', is_correct: false },
  { id: 'o1-B2-4', question_id: 'q1000003-0000-0000-0000-000000000002', teks: 'Cara menyalin kode sumber kompetitor', poin: 0, umpan_balik: 'Keliru. Menyalin kode bukan etika inovasi produk.', is_correct: false },
  // Q3-B: UVP
  { id: 'o1-B3-1', question_id: 'q1000003-0000-0000-0000-000000000003', teks: 'User Validation Process', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  { id: 'o1-B3-2', question_id: 'q1000003-0000-0000-0000-000000000003', teks: 'Unique Value Proposition', poin: 10, umpan_balik: 'Tepat! UVP adalah Unique Value Proposition, pembeda nilai unik produk dibanding alternatif lain.', is_correct: true },
  { id: 'o1-B3-3', question_id: 'q1000003-0000-0000-0000-000000000003', teks: 'User Value Product', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  { id: 'o1-B3-4', question_id: 'q1000003-0000-0000-0000-000000000003', teks: 'Unique Verification Point', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  // Q4-B: Devil's Advocate
  { id: 'o1-B4-1', question_id: 'q1000003-0000-0000-0000-000000000004', teks: 'Mendesain layout antarmuka', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  { id: 'o1-B4-2', question_id: 'q1000003-0000-0000-0000-000000000004', teks: 'Mengkritisi ide dan menguji asumsi secara skeptis', poin: 10, umpan_balik: 'Tepat! Devil’s Advocate bertugas mencari kelemahan dan lubang asumsi dari ide produk.', is_correct: true },
  { id: 'o1-B4-3', question_id: 'q1000003-0000-0000-0000-000000000004', teks: 'Menjual produk ke konsumen', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  { id: 'o1-B4-4', question_id: 'q1000003-0000-0000-0000-000000000004', teks: 'Mengatur relasi database', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  // Q5-B: Unsur Who
  { id: 'o1-B5-1', question_id: 'q1000003-0000-0000-0000-000000000005', teks: 'Penyandang dana (investor)', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  { id: 'o1-B5-2', question_id: 'q1000003-0000-0000-0000-000000000005', teks: 'Kompetitor terbesar', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  { id: 'o1-B5-3', question_id: 'q1000003-0000-0000-0000-000000000005', teks: 'Kelompok target pengguna spesifik', poin: 10, umpan_balik: 'Tepat! Who adalah target audiens spesifik yang paling menderita akibat masalah.', is_correct: true },
  { id: 'o1-B5-4', question_id: 'q1000003-0000-0000-0000-000000000005', teks: 'Tim developer internal', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  // Q6-B: Target Pengguna
  { id: 'o1-B6-1', question_id: 'q1000003-0000-0000-0000-000000000006', teks: 'Semua orang pengguna internet', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  { id: 'o1-B6-2', question_id: 'q1000003-0000-0000-0000-000000000006', teks: 'Kelompok spesifik yang paling merasakan dampak masalah', poin: 10, umpan_balik: 'Tepat! Segmentasi spesifik membuat solusi lebih tajam dan terfokus.', is_correct: true },
  { id: 'o1-B6-3', question_id: 'q1000003-0000-0000-0000-000000000006', teks: 'Seluruh masyarakat Indonesia', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  { id: 'o1-B6-4', question_id: 'q1000003-0000-0000-0000-000000000006', teks: 'Pengguna media sosial', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  // Q7-B: Pain Point
  { id: 'o1-B7-1', question_id: 'q1000003-0000-0000-0000-000000000007', teks: 'Target pasar', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  { id: 'o1-B7-2', question_id: 'q1000003-0000-0000-0000-000000000007', teks: 'Biaya operasional', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  { id: 'o1-B7-3', question_id: 'q1000003-0000-0000-0000-000000000007', teks: 'Titik masalah atau frustrasi yang dialami pengguna', poin: 10, umpan_balik: 'Tepat! Pain point adalah kesulitan nyata atau frustrasi yang menghambat pengguna.', is_correct: true },
  { id: 'o1-B7-4', question_id: 'q1000003-0000-0000-0000-000000000007', teks: 'Strategi harga jual', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  // Q8-B: JTBD
  { id: 'o1-B8-1', question_id: 'q1000003-0000-0000-0000-000000000008', teks: 'Tugas spesifik yang ingin diselesaikan oleh pengguna', poin: 10, umpan_balik: 'Tepat! JTBD menjelaskan pekerjaan yang ingin dituntaskan pengguna dengan bantuan produk.', is_correct: true },
  { id: 'o1-B8-2', question_id: 'q1000003-0000-0000-0000-000000000008', teks: 'Daftar tugas harian tim programmer', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  { id: 'o1-B8-3', question_id: 'q1000003-0000-0000-0000-000000000008', teks: 'Kewajiban investor kepada startup', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  { id: 'o1-B8-4', question_id: 'q1000003-0000-0000-0000-000000000008', teks: 'Rencana promosi pemasaran', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  // Q9-B: Konteks
  { id: 'o1-B9-1', question_id: 'q1000003-0000-0000-0000-000000000009', teks: 'Alamat kantor pusat startup', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  { id: 'o1-B9-2', question_id: 'q1000003-0000-0000-0000-000000000009', teks: 'Situasi dan momen spesifik yang memicu timbulnya masalah', poin: 10, umpan_balik: 'Tepat! Konteks memetakan kondisi saat masalah tersebut terjadi.', is_correct: true },
  { id: 'o1-B9-3', question_id: 'q1000003-0000-0000-0000-000000000009', teks: 'Lokasi pertemuan investor', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  { id: 'o1-B9-4', question_id: 'q1000003-0000-0000-0000-000000000009', teks: 'Tempat promosi baliho produk', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  // Q10-B: 5 Whys
  { id: 'o1-B10-1', question_id: 'q1000003-0000-0000-0000-000000000010', teks: 'Analisis SWOT', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  { id: 'o1-B10-2', question_id: 'q1000003-0000-0000-0000-000000000010', teks: 'Lean Canvas', poin: 0, umpan_balik: 'Keliru.', is_correct: false },
  { id: 'o1-B10-3', question_id: 'q1000003-0000-0000-0000-000000000010', teks: 'Metode 5 Whys', poin: 10, umpan_balik: 'Tepat! 5 Whys menggali lapisan demi lapisan sebab hingga ke akar terdalam.', is_correct: true },
  { id: 'o1-B10-4', question_id: 'q1000003-0000-0000-0000-000000000010', teks: 'Benchmarking visual', poin: 0, umpan_balik: 'Keliru.', is_correct: false }
];

// ─── 6. ESSAY RUBRICS ─────────────────────────────────────────────────────────
// Kolom: id, question_id, kunci_jawaban, kata_kunci, rubrik_skor, created_at
// ⚠️ WAJIB DIJAGA DI SERVER — TIDAK PERNAH DIKIRIM KE CLIENT
export const essay_rubrics = [
  {
    id: 'er-0000001-0000-0000-0000-000000000001',
    question_id: 'q1000002-0000-0000-0000-000000000001',
    kunci_jawaban: '4 elemen pokok Problem Statement Canvas: 1. Who (Target Pengguna), 2. Context (Konteks kapan & di mana), 3. Root Cause (Akar Masalah), 4. The Gap (Celah kelemahan alternatif saat ini).',
    kata_kunci: ['who', 'context', 'root cause', 'gap', 'pengguna', 'konteks', 'akar masalah', 'celah'],
    rubrik_skor: { '10': 'Menyebutkan minimal 2+ elemen kunci dengan tepat', '8': 'Menyebutkan 1 elemen kunci', '0': 'Tidak relevan' },
    created_at: now()
  },
  {
    id: 'er-0000001-0000-0000-0000-000000000002',
    question_id: 'q1000002-0000-0000-0000-000000000002',
    kunci_jawaban: 'Tujuan utama teknik 5 Whys adalah untuk menemukan akar masalah terdalam (root cause), bukan sekadar mengobati gejala permukaan (symptom).',
    kata_kunci: ['akar masalah', 'root cause', 'gejala', 'symptom'],
    rubrik_skor: { '10': 'Menyebutkan konsep akar masalah / root cause', '8': 'Menyebutkan konsep mencari penyebab secara umum', '0': 'Tidak relevan' },
    created_at: now()
  },
  {
    id: 'er-0000001-0000-0000-0000-000000000003',
    question_id: 'q1000002-0000-0000-0000-000000000003',
    kunci_jawaban: 'Value-Driven berfokus pada manfaat nyata dan pemecahan masalah pengguna, sedangkan Feature-Driven hanya berfokus pada memperbanyak fitur atau kecanggihan teknologi.',
    kata_kunci: ['manfaat', 'pengguna', 'fitur', 'masalah', 'nilai', 'value'],
    rubrik_skor: { '10': 'Menyebutkan perbedaan value vs feature dengan konteks pengguna', '8': 'Menyebutkan salah satu konsep dengan benar', '0': 'Tidak relevan' },
    created_at: now()
  },
  {
    id: 'er-0000001-0000-0000-0000-000000000004',
    question_id: 'q1000002-0000-0000-0000-000000000004',
    kunci_jawaban: '[Target Pengguna] kesulitan saat [Konteks] karena [Akar Masalah], yang berakibat [Dampak Terukur].',
    kata_kunci: ['pengguna', 'konteks', 'akar masalah', 'dampak', 'kesulitan', 'akibat'],
    rubrik_skor: { '10': 'Menyebutkan format lengkap dengan semua komponen', '8': 'Menyebutkan minimal 2-3 komponen format', '0': 'Tidak relevan' },
    created_at: now()
  },
  {
    id: 'er-0000001-0000-0000-0000-000000000005',
    question_id: 'q1000002-0000-0000-0000-000000000005',
    kunci_jawaban: 'Karena kegagalan awal memberikan umpan balik (feedback) dan data nyata untuk melakukan evaluasi, iterasi, serta perbaikan produk berikutnya.',
    kata_kunci: ['feedback', 'umpan balik', 'iterasi', 'perbaikan', 'evaluasi', 'data'],
    rubrik_skor: { '10': 'Menyebutkan konsep feedback/iterasi/data dalam konteks pembelajaran', '8': 'Menyebutkan bahwa kegagalan memberikan pelajaran secara umum', '0': 'Tidak relevan' },
    created_at: now()
  },
  // ─── Set B Essay Rubrics ───
  {
    id: 'er-0000001-0000-0000-0000-000000000006',
    question_id: 'q1000004-0000-0000-0000-000000000001',
    kunci_jawaban: 'Keluhan pelanggan menunjukkan hambatan dan masalah nyata yang dialami pengguna saat memakai solusi yang ada. Data tersebut dapat diubah menjadi ide fitur baru, peningkatan kualitas produk, dan penemuan celah pasar yang belum dipenuhi kompetitor.',
    kata_kunci: ['keluhan pelanggan', 'masalah nyata', 'peluang inovasi', 'kebutuhan pengguna', 'perbaikan produk', 'celah'],
    rubrik_skor: { '10': 'Menyebutkan keluhan pelanggan dan perbaikan/inovasi', '8': 'Menyebutkan kebutuhan pengguna', '0': 'Tidak relevan' },
    created_at: now()
  },
  {
    id: 'er-0000001-0000-0000-0000-000000000007',
    question_id: 'q1000004-0000-0000-0000-000000000002',
    kunci_jawaban: 'Problem Statement Canvas adalah alat untuk mendefinisikan, menganalisis, dan membedah masalah pengguna secara terstruktur sehingga tim dapat mengidentifikasi akar masalah, dampak terukur, konteks kejadian, dan peluang solusi yang tepat.',
    kata_kunci: ['alat analisis', 'masalah pengguna', 'terstruktur', 'akar masalah', 'peluang solusi', 'canvas'],
    rubrik_skor: { '10': 'Menyebutkan alat analisis dan akar masalah terstruktur', '8': 'Menyebutkan analisis masalah umum', '0': 'Tidak relevan' },
    created_at: now()
  },
  {
    id: 'er-0000001-0000-0000-0000-000000000008',
    question_id: 'q1000004-0000-0000-0000-000000000003',
    kunci_jawaban: 'Empat strategi AI Prompting yaitu: 1. AI sebagai Market Researcher (memetakan data tren pasar), 2. AI sebagai Interview Simulator (mensimulasikan calon responden), 3. AI sebagai Competitor Analyst (menganalisis kelebihan/kekurangan lawan), dan 4. AI sebagai Devil’s Advocate (menguji dan mengkritisi kelemahan asumsi tim).',
    kata_kunci: ['market researcher', 'interview simulator', 'competitor analyst', 'devil advocate'],
    rubrik_skor: { '10': 'Menyebutkan minimal 2 strategi AI Prompting', '8': 'Menyebutkan 1 strategi', '0': 'Tidak relevan' },
    created_at: now()
  },
  {
    id: 'er-0000001-0000-0000-0000-000000000009',
    question_id: 'q1000004-0000-0000-0000-000000000004',
    kunci_jawaban: 'Pain Point adalah gejala, keluhan, atau kesulitan langsung yang dirasakan oleh pengguna di permukaan, sedangkan Root Cause adalah akar penyebab utama terdalam yang melahirkan timbulnya keluhan tersebut.',
    kata_kunci: ['pain point', 'gejala masalah', 'root cause', 'penyebab utama', 'akar masalah', 'gejala', 'akar'],
    rubrik_skor: { '10': 'Menjelaskan perbedaan pain point (gejala) dan root cause (akar)', '8': 'Menjelaskan salah satunya', '0': 'Tidak relevan' },
    created_at: now()
  },
  {
    id: 'er-0000001-0000-0000-0000-000000000010',
    question_id: 'q1000004-0000-0000-0000-000000000005',
    kunci_jawaban: 'Karena kebutuhan dan masalah setiap kelompok pengguna berbeda. Target yang terlalu luas membuat solusi menjadi bias, tidak fokus, dan sulit divalidasi, sedangkan segmentasi spesifik membantu menciptakan solusi yang tajam dan tepat sasaran.',
    kata_kunci: ['segmentasi', 'spesifik', 'fokus', 'kebutuhan berbeda', 'target pengguna', 'berbeda'],
    rubrik_skor: { '10': 'Menjelaskan alasan segmentasi dan kebutuhan yang berbeda', '8': 'Menjelaskan target pasar', '0': 'Tidak relevan' },
    created_at: now()
  }
];

// ─── 7. ATTEMPTS ──────────────────────────────────────────────────────────────
// Kolom: id, user_id, course_id, attempt_number, set_paket, mulai, selesai,
//        total_poin_pg, total_poin_essay, nilai, lulus, cooldown_until
export const attempts = [];

// ─── 8. ANSWERS ───────────────────────────────────────────────────────────────
// Kolom: id, attempt_id, question_id, jawaban, poin, label, catatan_evaluasi, created_at
export const answers = [];

// ─── 9. PROGRESS ──────────────────────────────────────────────────────────────
// Kolom: id, user_id, course_id, bagian_selesai (array), nilai_terbaik,
//        status ('locked'|'unlocked'|'passed'), unlocked_at, passed_at, updated_at
export const progress = [];

// ─── Helper Functions ─────────────────────────────────────────────────────────

/**
 * Inisialisasi baris progress untuk user baru (10 modul).
 * Modul 1 = 'unlocked', Modul 2–10 = 'locked' (Progressive Gating sesuai PRD).
 */
export function initUserProgress(userId) {
  const ts = new Date().toISOString();
  courses.forEach((course) => {
    const existing = progress.find(p => p.user_id === userId && p.course_id === course.id);
    if (!existing) {
      progress.push({
        id: uuidv4(),
        user_id: userId,
        course_id: course.id,
        bagian_selesai: [],
        nilai_terbaik: 0,
        status: course.urutan === 1 ? 'unlocked' : 'locked',
        unlocked_at: course.urutan === 1 ? ts : null,
        passed_at: null,
        updated_at: ts
      });
    }
  });
}

export { uuidv4 };
