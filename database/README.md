# Database VINIX7 Platform

Direktori ini berisi skema DDL PostgreSQL dan data awal (seed) untuk platform VINIX7.

---

## Skema Tabel

Struktur tabel didefinisikan pada file `schema.sql`:

1. `users`: Data akun pengguna (nama, email, hash password).
2. `courses`: Data 10 modul pembelajaran.
3. `sections`: Sub-materi atau slide pembagian modul.
4. `questions`: Bank soal ujian per modul (tipe pilihan ganda dan essay, set A/B/C).
5. `options`: Opsi jawaban pilihan ganda beserta kunci jawaban.
6. `essay_rubrics`: Kunci jawaban acuan dan kata kunci evaluasi essay.
7. `attempts`: Riwayat sesi pengerjaan ujian.
8. `answers`: Jawaban peserta untuk setiap butir soal.
9. `progress`: Status pembukaan modul per pengguna (locked, unlocked, passed).

---

## Cara Setup Database

### Menggunakan Supabase
1. Buat project baru di Supabase.
2. Buka SQL Editor di dashboard Supabase.
3. Jalankan isi file `schema.sql`.
4. Jalankan script seed di folder `seeds/` secara berurutan untuk mengisi modul dan bank soal.

### Menggunakan PostgreSQL Lokal
```bash
# Menjalankan PostgreSQL via Docker
docker run --name vinix-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=vinix7_quiz -p 5432:5432 -d postgres:16

# Eksekusi skema dan seed
psql -h localhost -U postgres -d vinix7_quiz -f database/schema.sql
psql -h localhost -U postgres -d vinix7_quiz -f database/seeds/01_courses_and_sections.sql
```
