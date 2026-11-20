# DevOps & Deployment VINIX7 Platform

Konfigurasi containerization Docker dan alur deployment untuk platform VINIX7.

---

## Menjalankan dengan Docker Compose

Untuk menjalankan seluruh service (database, backend, dan frontend) dalam satu perintah:

```bash
cd devops
docker compose up --build -d
```

### Port Service
- Front-End: `http://localhost:5173`
- Back-End API: `http://localhost:5000`
- PostgreSQL: `localhost:5432`

Untuk menghentikan service:
```bash
docker compose down
```

---

## CI/CD Pipeline

Pipeline pengujian otomatis berjalan melalui GitHub Actions pada file `.github/workflows/ci.yml`. Pipeline ini melakukan:
1. Validasi linting dan sintaks kode.
2. Build testing untuk front-end (Vite).
3. Automated test untuk endpoint dan alur back-end.
