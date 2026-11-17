# 🎓 VINIX7 Interactive Mini-Course & Assessment Platform

> **Platform Pembelajaran Berjenjang Web Development & UI/UX Design dengan Mekanisme Progressive Gating**  
> Proyek Tugas Akhir Magang VINIX7 &bull; Kategori: *Web Educational Technology*

---

## 🌟 1. Ringkasan Eksekutif & Fitur Inti (*Progressive Gating*)

Platform ini dibangun untuk mengatasi kendala pembelajar mandiri pemula (*"Si Penonton Tutorial"*) yang sering mengalami fondasi pemahaman bolong karena belajar tanpa urutan terstruktur dan tanpa ujian validasi.

### 🛡️ Mekanisme Utama (*Core Features*)
1. **Progressive Gating:** Modul berikutnya ($N+1$) **terkunci rapat** dan hanya akan terbuka otomatis apabila peserta berhasil **lulus ujian akhir Modul $N$ dengan nilai minimal 80 (KKM)**.
2. **Komposisi Ujian 60 : 40:** Ujian terdiri dari **10 Pilihan Ganda** + **5 Essay Studi Kasus** (Total 15 Soal).
   $$\text{Nilai Akhir} = \left[ 0{,}60 \times \frac{\text{Total Poin PG}}{100} + 0{,}40 \times \frac{\text{Total Poin Essay}}{50} \right] \times 100$$
3. **Cooldown 1 Menit & Rotasi Paket Soal:** 
   * Jika nilai $< 80$, tombol *Ulangi Ujian* terkunci dengan hitung mundur **60 detik (1 menit)**.
   * Percobaan 1 menggunakan **Set A**, Percobaan 2 **Set B**, Percobaan 3 **Set C** (Percobaan 4+ diacak).
4. **Evaluasi Diagnostik Pasca-Ujian:** Menampilkan skor akhir, label per butir soal (*Tepat, Kurang Tepat, Salah*), kunci jawaban, pembahasan, dan **Analisis Topik Lemah (*Weak Topics*)** untuk rekomendasi belajar ulang.

---

## 📁 2. Struktur Repositori Terpadu

Repositori ini telah diorganisasi secara modular untuk 4 anggota tim pengembang:

```bash
vinix-quiz_webdev&uiux/
├── front-end/           # [SELESAI 100%] Aplikasi Web Interaktif (React + Vite + Tailwind CSS)
├── back-end/            # [UNTUK TEMAN 1] Layanan REST API & Mesin Penilaian Otomatis
├── database/            # [UNTUK TEMAN 2] Skema DDL PostgreSQL, RLS Policy, & Seeds Bank Soal
├── devops/              # [UNTUK TEMAN 2] Konfigurasi Docker, Compose, & Panduan CI/CD
└── README.md            # Dokumentasi Utama Proyek
```

---

## 💻 3. Status Bagian Front-End (Sudah Selesai 100%)

Bagian **Front-End** telah dikerjakan secara utuh, responsif (360px s/d Desktop), dan mematuhi standar aksesibilitas WCAG 2.1 AA:
* ✅ **Halaman Autentikasi (`/login`, `/register`):** Dilengkapi tombol *1-Click Demo Login* untuk kemudahan evaluasi penguji.
* ✅ **Halaman Beranda & Progres (`/`):** Ringkasan statistik modul lulus, persentase kelulusan, rata-rata nilai, dan tombol cepat lanjut belajar.
* ✅ **Halaman Katalog Modul (`/courses`):** Menampilkan 10 modul dengan indikator visual gembok (*Locked, Unlocked, Passed*).
* ✅ **Halaman Baca Materi (`/courses/:id`):** Pembaca materi per bagian (Bagian 1, Bagian 2, Referensi) dengan tombol *"Tandai Selesai"* dan progress bar dinamis.
* ✅ **Halaman Workspace Ujian (`/exam/:courseId`):** Navigasi grid nomor 1–15, penanda status terjawab/kosong, penyimpanan draft otomatis di browser, dialog modal konfirmasi submit, dan proteksi jeda cooldown.
* ✅ **Halaman Hasil & Pembahasan (`/result/:attemptId`):** Panel skor, selebrasi confetti jika lulus ($\ge 80$), timer cooldown 60 detik jika belum lulus, identifikasi topik yang lemah, dan ulasan seluruh 15 butir soal.
* ✅ **Halaman Riwayat Ujian (`/history`):** Rekam jejak seluruh sesi percobaan ujian siswa.
* ✅ **Mock Data & API Engine (`src/api/client.js`):** Menggunakan data tiruan yang 100% patuh pada kontrak API PRD Bagian 11. Beralih ke backend riil cukup mengubah `USE_REAL_BACKEND = true`.

### 🚀 Cara Menjalankan Front-End di Komputer Lokal:
```bash
# 1. Masuk ke direktori front-end
cd front-end

# 2. Jalankan development server
npm run dev
```
Buka browser di `http://localhost:5173`.

---

## 🛠️ 4. Panduan Tugas Teman 1: Back-End Developer (`back-end/`)

> **Fokus Utama:** Membangun REST API server-side menggunakan Node.js/Express (atau framework pilihan), menghubungkan database, dan menjaga keamanan kunci jawaban agar tidak bocor ke browser.

### Checklist Tugas yang Perlu Dikerjakan:
1. **Konfigurasi Environment:**
   * Buka folder `back-end/`, salin `.env.example` menjadi `.env`.
   * Atur port (`PORT=5000`) dan string koneksi database/Supabase.
2. **Implementasikan 8 Endpoint REST API Wajib (PRD Bagian 11):**
   * `POST /api/auth/register` & `POST /api/auth/login` (Registrasi & JWT Token).
   * `GET /api/courses` (Ambil status 10 modul & skor terbaik pengguna).
   * `GET /api/courses/:id` (Ambil konten materi Bagian 1, Bagian 2, dan Referensi).
   * `POST /api/courses/:id/sections/:sid/complete` (Tandai bagian materi selesai).
   * `POST /api/courses/:id/exam/start`:
     * Cek `cooldown_until`. Jika masih aktif, tolak dengan status 429/Cooldown.
     * Ambil 15 soal (10 PG + 5 Essay) sesuai rotasi paket (Set A/B/C).
     * **ATURAN KEAMANAN MUTLAK:** Jangan kirimkan field `poin`, `kunci_jawaban`, `kata_kunci`, atau `is_correct` ke Front-End pada endpoint ini!
   * `POST /api/attempts/:id/submit`:
     * Terima jawaban peserta, jalankan mesin penilaian otomatis.
     * Terapkan formula: `Nilai = [0.60 * (PG/100) + 0.40 * (Essay/50)] * 100`.
     * Jika Nilai $\ge 80$: Set status `passed` dan buka modul berikutnya ($N+1$) menjadi `unlocked`.
     * Jika Nilai $< 80$: Set `cooldown_until` = waktu saat ini + 60 detik.
   * `GET /api/attempts/:id/result`:
     * Mengembalikan skor akhir, rincian label per soal, kunci jawaban ideal, pembahasan, dan daftar topik lemah (*weak topics*).
   * `GET /api/me/progress`: Ringkasan progres peserta.
3. **Manfaatkan Layanan Logika yang Sudah Disiapkan:**
   * `src/services/scoringEngine.js` &rarr; Fungsi normalisasi teks, pencocokan kata kunci essay berjenjang (10, 9, 8, 7, 0), dan pengelompokan topik lemah.
   * `src/services/rotationService.js` &rarr; Fungsi pemilihan paket Set A, B, C dan pengacakan opsi.
   * `src/services/gatingService.js` &rarr; Fungsi validasi batas waktu cooldown 1 menit.

---

## 🐘 5. Panduan Tugas Teman 2: Database & DevOps Engineer (`database/` & `devops/`)

> **Fokus Utama:** Mengelola skema PostgreSQL, keamanan akses data (Row Level Security), pengisian bank soal (*seeding*), serta containerization Docker.

### Checklist Tugas Database (`database/`):
1. **Eksekusi Skema DDL (`database/schema.sql`):**
   * Buat instance PostgreSQL (direkomendasikan via [Supabase](https://supabase.com) untuk MVP).
   * Jalankan `database/schema.sql` untuk men-generate 9 tabel utama (`users`, `courses`, `sections`, `questions`, `options`, `essay_rubrics`, `attempts`, `answers`, `progress`).
2. **Terapkan Kebijakan Row Level Security (RLS):**
   * Pastikan tabel `essay_rubrics` **HANYA** dapat diakses oleh `service_role` (Back-End) dan tertutup untuk role publik/anon agar kunci jawaban tidak bisa di-inspeksi melalui Network tab / DevTools.
   * Batasi akses tabel `attempts` dan `progress` agar peserta hanya bisa membaca datanya sendiri (`auth.uid() = user_id`).
3. **Seeding Bank Soal 10 Modul (`database/seeds/`):**
   * Telah disediakan contoh seed: `01_courses_and_sections.sql` (10 Modul lengkap) dan `02_sample_questions.sql` (Modul 1 Set A).
   * Lengkapi sisa bank soal untuk Modul 2 s/d 10 dengan menyalin naskah lengkap 450 butir soal dari **Lampiran PRD halaman 29 s/d 163**.

### Checklist Tugas DevOps (`devops/`):
1. **Multi-Container Local Setup:**
   * Di dalam folder `devops/`, jalankan perintah:
     ```bash
     docker compose up --build -d
     ```
   * Ini akan otomatis menyalakan PostgreSQL di port `5432`, Backend di port `5000`, dan Frontend di port `5173`.
2. **Audit Kualitas (PRD Bagian 9):**
   * Sebelum showcase akhir magang, lakukan audit Google Lighthouse pada Frontend. Pastikan skor mencapai **$\ge 90$** untuk kategori *Performance*, *Accessibility*, *Best Practices*, dan *SEO*.

---

## 🤝 6. Alur Kerja Tim (Sprint & Integrasi)
1. **Fase Saat Ini:** Front-End sudah selesai dan berjalan mandiri menggunakan Mock Data.
2. **Langkah Berikutnya:**
   * Teman 2 menyiapkan database di Supabase dan menjalankan `schema.sql`.
   * Teman 1 mengembangkan endpoint API di `back-end/` dan mengetesnya via Postman / Curl.
   * Integrasi akhir: Di file `front-end/src/api/client.js`, ubah `USE_REAL_BACKEND = true` untuk langsung beralih dari Mock Data ke Server REST API teman Anda!
