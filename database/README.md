# 🗄️ Database & DevOps Guide: VINIX7 Assessment Platform

Direktori ini diperuntukkan bagi **Anggota 3 (Database & DevOps Engineer)** dan **Anggota 2 (Back-End Developer)** untuk mengelola skema basis data, migrasi, dan keamanan data sesuai kesepakatan **PRD Bagian 11 & Bagian 12**.

---

## 📌 1. Gambaran Umum Skema Data
Database dirancang menggunakan **PostgreSQL** (kompatibel penuh dengan **Supabase** atau PostgreSQL lokal/Docker) dengan model data inti:

| Nama Tabel | Deskripsi | Aturan Kunci |
| :--- | :--- | :--- |
| `users` | Data akun peserta & pengajar | Password di-hash (Bcrypt/Argon2) |
| `courses` | 10 Modul pembelajaran magang | Urutan 1–10 unik |
| `sections` | Sub-materi per modul (Bagian 1, Bagian 2, Referensi) | Relasi cascade ke `courses` |
| `questions` | Bank 450 soal (30 PG + 15 Essay per modul) | Dikelompokkan ke Set A, B, C & tag topik |
| `options` | Opsi jawaban Pilihan Ganda (1 benar, 3 pengecoh) | Poin 10/0, ulasan umpan balik |
| `essay_rubrics` | Kunci jawaban ideal & rubrik berjenjang essay | **WAJIB RLS TERTUTUP** (Hanya Back-End) |
| `attempts` | Riwayat sesi ujian yang dikerjakan peserta | Rekam set paket, nilai, status lulus, & cooldown |
| `answers` | Jawaban per butir soal per attempt | Rekam poin (10/9/8/7/0) dan label (Tepat/Kurang Tepat/Salah) |
| `progress` | Progres kelulusan dan Progressive Gating | Rekam status `locked`, `unlocked`, `passed` |

---

## 🛠️ 2. Langkah Setup Database (Supabase / PostgreSQL)

### Opsi A: Menggunakan Supabase (Rekomendasi MVP)
1. Buat project baru di [Supabase Dashboard](https://supabase.com).
2. Buka tab **SQL Editor**.
3. Jalankan script `schema.sql` untuk membuat tipe enum, tabel, relasi, indeks, dan RLS.
4. Jalankan script pada folder `seeds/`:
   - `01_courses_and_sections.sql` (Inisialisasi 10 course).
   - `02_sample_questions.sql` (Inisialisasi bank soal & rubrik modul 1).

### Opsi B: Menggunakan Docker / PostgreSQL Lokal
```bash
# Menjalankan container postgres
docker run --name vinix-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=vinix7_quiz -p 5432:5432 -d postgres:16

# Eksekusi schema dan seeds
psql -h localhost -U postgres -d vinix7_quiz -f database/schema.sql
psql -h localhost -U postgres -d vinix7_quiz -f database/seeds/01_courses_and_sections.sql
psql -h localhost -U postgres -d vinix7_quiz -f database/seeds/02_sample_questions.sql
```

---

## 🔒 3. Aturan Keamanan & RLS (Row Level Security) Wajib
1. **Pencegahan Cheat DevTools:** 
   - Tabel `essay_rubrics` dan kolom `is_correct` / `poin` pada tabel `options` **TIDAK BOLEH** dibuka untuk role `anon` / `authenticated`.
   - Hanya API server menggunakan `service_role` (atau query backend) yang dapat membaca kunci jawaban dan rubrik penilaian.
2. **Isolasi Data Peserta:**
   - Tabel `attempts`, `answers`, dan `progress` diatur dengan RLS agar peserta hanya bisa membaca data miliknya sendiri (`auth.uid() = user_id`).

---

## 📋 4. Checklist Tugas Anggota 3 (Database & DevOps)
- [x] Struktur DDL `schema.sql` dan indeks relasi.
- [ ] Buat project Supabase / PostgreSQL instance di cloud.
- [ ] Lengkapi data seed untuk Modul 2 s/d Modul 10 (mengacu pada Lampiran PRD hal 29–163).
- [ ] Uji performa query (pastikan query riwayat attempt dan progress di bawah 50ms).
- [ ] Atur environment variables connection string di `.env` backend.
