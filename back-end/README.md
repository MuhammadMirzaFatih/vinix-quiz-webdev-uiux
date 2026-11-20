# Back-End VINIX7 Platform

REST API service untuk platform pembelajaran dan evaluasi VINIX7.

---

## Menjalankan Back-End

### 1. Install Dependensi
```bash
cd back-end
npm install
```

### 2. Menjalankan Server
```bash
npm start
```
Server berjalan di `http://localhost:5000`. Secara default, server berjalan dalam mode in-memory store tanpa memerlukan koneksi database eksternal.

### 3. Menjalankan Uji Alur API
```bash
npm test
```

---

## Daftar Endpoint Utama

### Autentikasi
- `POST /api/auth/register`: Mendaftarkan pengguna baru (`nama`, `email`, `password`).
- `POST /api/auth/login`: Login pengguna menggunakan email/nama dan password.

### Courses & Modul
- `GET /api/courses`: Mengambil daftar 10 modul beserta status gembok (locked, unlocked, passed).
- `GET /api/courses/:id`: Mengambil detail modul dan daftar section materi.
- `POST /api/courses/:id/read`: Menandai section materi telah selesai dibaca.

### Ujian & Penilaian
- `POST /api/courses/:id/exam/start`: Memulai sesi ujian modul (mengembalikan daftar soal 1-10 PG dan 11-15 Essay).
- `POST /api/attempts/:id/submit`: Mengirim jawaban ujian dan menghitung nilai akhir.
- `GET /api/attempts/:id`: Mengambil rincian hasil ujian dan pembahasan.

### Pengguna
- `GET /api/me/progress`: Mengambil ringkasan progres belajar pengguna.
- `GET /api/me/history`: Mengambil riwayat seluruh sesi ujian pengguna.

---

## Struktur Folder Back-End

```text
back-end/
├── src/
│   ├── config/        # Konfigurasi database dan Supabase
│   ├── controllers/   # Request handler untuk setiap rute
│   ├── data/          # Data materi, bank soal modul 1-10, dan in-memory store
│   ├── middlewares/   # Validasi input dan middleware autentikasi JWT
│   ├── routes/        # Definisi rute Express
│   ├── services/      # Logika bisnis (scoring engine, gating, rotasi soal)
│   └── server.js      # Entry point Express app
├── scripts/           # Script pengujian otomatis dan seeding database
└── package.json
```
