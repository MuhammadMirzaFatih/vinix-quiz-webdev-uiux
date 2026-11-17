# 🚀 DevOps & CI/CD Guide: VINIX7 Platform

Direktori ini diperuntukkan bagi **Anggota 3 (Database & DevOps Engineer)** untuk mengelola containerization, deployment, dan otomatisasi CI/CD sesuai **PRD Bagian 4, 9, & 12**.

---

## 📦 1. Menjalankan Seluruh Stack dengan Docker Compose
Untuk menjalankan PostgreSQL, Backend, dan Frontend secara terpadu di mesin lokal:

```bash
cd devops
docker compose up --build -d
```

Service yang akan menyala:
* 🌐 **Frontend:** `http://localhost:5173`
* 🔌 **Backend API:** `http://localhost:5000`
* 🐘 **PostgreSQL:** `localhost:5432` (db: `vinix7_quiz`)

---

## 🎯 2. Target Kualitas & Audit Otomatis (PRD Bagian 9)
Sesuai PRD, sebelum proyek dirilis atau didemokan, lakukan audit performa web:
1. **Google Lighthouse Audit Target:** Skor $\ge 90$ untuk:
   * *Performance*
   * *Accessibility (WCAG 2.1 AA)*
   * *Best Practices*
   * *SEO*
2. **Core Web Vitals Target (Persentil ke-75):**
   * LCP $\le 2{,}5$ detik
   * INP $\le 200$ ms
   * CLS $\le 0{,}1$

---

## 🛠️ 3. Checklist Tugas DevOps
- [ ] Atur environment staging & production (misal: Vercel untuk Frontend, Railway/Render untuk Backend, Supabase untuk DB).
- [ ] Setup pipeline CI/CD GitHub Actions untuk build test otomatis saat ada PR ke `main`.
- [ ] Konfigurasi sertifikat SSL/HTTPS dan CORS origin policy.
