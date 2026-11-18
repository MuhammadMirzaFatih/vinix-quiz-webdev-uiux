# 💻 Back-End Developer Guide: VINIX7 Assessment Platform

Direktori ini diperuntukkan bagi **Anggota 2 (Back-End Developer)**. Tugas utama Anda adalah mengembangkan REST API server-side, mesin evaluasi otomatis soal (PG & Essay), validasi Progressive Gating, dan rotasi soal.

---

## 📌 1. Kontrak Endpoint REST API Wajib (PRD Bagian 11)

| No | Method | Endpoint | Deskripsi & Validasi Penting |
| :--- | :--- | :--- | :--- |
| 1 | `POST` | `/api/auth/register` | Mendaftarkan pengguna baru & inisialisasi baris `progress` Modul 1 (`unlocked`). |
| 2 | `POST` | `/api/auth/login` | Autentikasi dan return JWT Token + data profil pengguna. |
| 3 | `GET` | `/api/courses` | Ambil daftar seluruh 10 course beserta status gating (`locked`, `unlocked`, `passed`) dan `nilaiTerbaik`. |
| 4 | `GET` | `/api/courses/:id` | Ambil detail 1 course beserta materi Bagian 1, Bagian 2, dan Referensi. |
| 5 | `POST` | `/api/courses/:id/sections/:sid/complete` | Menandai sebuah section telah selesai dibaca (update array `bagian_selesai`). |
| 6 | `POST` | `/api/courses/:id/exam/start` | **Validasi cooldown:** Jika `cooldown_until > now`, return 429/Error Cooldown. Jika lolos, return `attemptId` dan 15 soal (10 PG + 5 Essay) **TANPA kunci jawaban & TANPA bobot poin**. |
| 7 | `POST` | `/api/attempts/:id/submit` | Terima payload jawaban peserta, jalankan `scoringEngine`, hitung nilai akhir, set status lulus (jika $\ge 80$), set `cooldownUntil` (now + 60 detik jika $< 80$). Jika lulus, **otomatis buka Modul N+1**. |
| 8 | `GET` | `/api/attempts/:id/result` | Mengembalikan hasil skor akhir, status lulus/gagal, label per soal (`Tepat`, `Kurang Tepat`, `Salah`), pembahasan kunci jawaban, dan daftar topik yang lemah. |
| 9 | `GET` | `/api/me/progress` | Ringkasan progres kumulatif siswa di semua course. |

---

## 🛡️ 2. Aturan Keamanan Mutlak (PRD Halaman 10)
> **PENTING:** Kunci jawaban Pilihan Ganda, kata kunci rubrik Essay, dan kalkulasi nilai **HANYA** boleh ada di server.
> Jangan pernah mengirimkan field `poin`, `kunci_jawaban`, `kata_kunci`, atau `is_correct` pada endpoint `/courses/:id/exam/start`. Kunci jawaban baru dikirim di `/attempts/:id/result` **setelah** ujian selesai disubmit.

---

## 🧠 3. Logic & Service yang Sudah Disediakan
Kami telah menyiapkan fondasi logika di dalam folder `src/services/`:
1. `src/services/scoringEngine.js`:
   - Normalisasi teks (`lowercase`, strip punctuation, clean spaces).
   - Pencocokan kata kunci essay (Rubrik ramah poin kunci: 10 = Poin kunci terpenuhi, 8 = Konsep dasar ada, 0 = Tidak relevan).
   - Kalkulasi skor akhir: `0.60 * PG + 0.40 * Essay`.
   - Klasifikasi topik lemah otomatis.
2. `src/services/rotationService.js`:
   - Penentuan paket Set A (percobaan 1), Set B (percobaan 2), Set C (percobaan 3), atau acak.
3. `src/services/gatingService.js`:
   - Validasi cooldown 60 detik (1 menit).
   - Logika gembok course berikutnya.

---

## 🚀 4. Cara Menjalankan Backend Lokal
```bash
# 1. Masuk ke folder backend
cd back-end

# 2. Salin template environment variable
cp .env.example .env

# 3. Install dependensi
npm install

# 4. Jalankan server mode dev
npm run dev
```
Server akan aktif di `http://localhost:5000`.
Frontend saat ini menggunakan **Mock JSON Services** yang mengacu 100% pada kontrak data ini, sehingga saat backend Anda selesai, frontend tinggal mengganti `USE_REAL_BACKEND = true` di `front-end/src/api/client.js`!
