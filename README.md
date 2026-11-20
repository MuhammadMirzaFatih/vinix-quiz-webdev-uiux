# VINIX7 Platform

Platform pembelajaran interaktif Web Development dan UI/UX Design dengan sistem Progressive Gating.

---

## Cara Menjalankan Project

### 1. Install Dependensi
Jalankan instalasi dependensi pada folder front-end dan back-end:

```bash
cd front-end
npm install
cd ..

cd back-end
npm install
cd ..
```

### 2. Jalankan Server
Buka 2 terminal terpisah:

- **Terminal 1 (Back-End):**
  ```bash
  cd back-end
  npm start
  ```
  API server berjalan di `http://localhost:5000`.

- **Terminal 2 (Front-End):**
  ```bash
  cd front-end
  npm run dev
  ```
  Web client berjalan di `http://localhost:5173`.

### 3. Akses Aplikasi
Buka browser dan akses `http://localhost:5173`.

Alur penggunaan:
1. Pengguna diarahkan ke halaman Register untuk membuat akun.
2. Setelah mendaftar, kredensial otomatis terisi di halaman Login.
3. Setelah login, pengguna diarahkan ke Dashboard.

---

## Fitur Utama

1. **Progressive Gating:** Modul berikutnya terkunci dan baru terbuka setelah peserta lulus ujian modul sebelumnya dengan nilai minimal 80.
2. **Ujian Akhir Modul:** Terdiri dari 10 soal Pilihan Ganda (bobot 60%) dan 5 soal Essay (bobot 40%).
3. **Sistem Cooldown:** Jika nilai di bawah 80, peserta perlu menunggu jeda 60 detik sebelum dapat mengulang ujian.
4. **Rotasi Soal:** Percobaan ujian menggunakan paket soal berbeda (Set A, Set B, Set C).
5. **Review dan Evaluasi:** Menampilkan rincian skor, status jawaban, pembahasan, dan topik yang perlu dipelajari kembali.

---

## Struktur Folder

```text
vinix-quiz_webdev&uiux/
├── front-end/    # Aplikasi client (React, Vite, Tailwind CSS)
├── back-end/     # REST API server (Node.js, Express)
├── database/     # Skema database dan seed data (PostgreSQL / Supabase)
├── devops/       # Konfigurasi Docker dan CI/CD
└── README.md     # Dokumentasi project
```

---

## Tech Stack

- **Front-End:** React 19, Vite, Tailwind CSS, React Router
- **Back-End:** Node.js, Express.js
- **Database:** PostgreSQL / Supabase
