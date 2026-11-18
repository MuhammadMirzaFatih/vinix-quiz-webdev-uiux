/**
 * VINIX7 Interactive Mini-Course & Assessment Platform
 * MOCK DATABASE & LOCALSTORAGE ENGINE (Mengacu pada PRD Bagian 5, 6, 11, 13)
 */

export const INITIAL_COURSES = [
  {
    id: 'c1',
    urutan: 1,
    judul: 'Mindset Startup & Problem Solving',
    ringkasan: 'Pola pikir value-driven, identifikasi masalah nyata, Problem Statement Canvas, dan metode 5 Whys.',
    kategori: 'Product & Startup',
    estimasiWaktu: '45 Menit',
    level: 'Fondasi',
    icon: 'Lightbulb',
    referensiEksternal: 'Lean Startup (Eric Ries), MVP Principle, 5 Whys Root Cause Analysis',
    sections: [
      {
        id: 's1-1',
        urutan: 1,
        judul: 'Bagian 1: Pola Pikir Value Driven & Agility',
        pdfUrl: '/materials/modul-1-bagian-1.pdf',
        pdfTitle: 'Slide PPT Modul 1: Startup Mindset & Agility',
        isi: `### 1. Pola Pikir Value Driven vs Feature Driven
Dalam pengembangan produk digital, kesalahan paling sering dari pemula adalah berfokus pada teknologi canggih atau fitur sebanyak mungkin (*feature-driven*), bukan pada nilai manfaat yang diterima pengguna (*value-driven*).

> **Prinsip Utama:** Nilai (*Value*) tercipta saat sebuah produk berhasil mempermudah hidup pengguna atau menyelesaikan masalah mendesak yang mereka hadapi.

#### Karakteristik Mindset Value-Driven:
* **Solve The Problem:** Selalu berpegang pada masalah nyata pengguna, bukan ide asumsi sepihak desainer/developer.
* **Agility:** Kemampuan tim untuk bergerak cepat, menerima umpan balik (*feedback*), beradaptasi dengan perubahan, dan terus melakukan iterasi produk.
* **Kegagalan Awal adalah Data:** Setiap kesalahan atau hipotesis yang meleset bukan kerugian mutlak, melainkan data berharga untuk perbaikan produk selanjutnya.`
      },
      {
        id: 's1-2',
        urutan: 2,
        judul: 'Bagian 2: Problem Statement Canvas & Teknik 5 Whys',
        pdfUrl: '/materials/modul-1-bagian-2.pdf',
        pdfTitle: 'Slide PPT Modul 1: Problem Canvas & 5 Whys',
        isi: `### 2. Membedah Masalah dengan Problem Statement Canvas
Sebelum membuat antarmuka atau menulis baris kode, tim wajib membedah masalah menggunakan 4 elemen pokok:
1. **Who (Target Pengguna):** Siapa kelompok spesifik yang paling menderita akibat masalah ini? Hindari mendefinisikan pengguna sebagai "semua orang".
2. **Context (When & Where):** Kapan dan di mana masalah tersebut paling sering muncul?
3. **Root Cause (Akar Masalah):** Penyebab terdalam yang memicu timbulnya masalah.
4. **The Gap:** Celah kelemahan dari solusi alternatif yang saat ini digunakan pengguna.

#### Format Rumusan Masalah Standar:
\`\`\`text
"[Target Pengguna] kesulitan saat [Konteks] karena [Akar Masalah], yang berakibat [Dampak Terukur]."
\`\`\`

#### Teknik 5 Whys
Metode mengajukan pertanyaan *"Mengapa?"* secara berulang hingga ditemukan akar terdalam (*root cause*), bukan sekadar mengobati gejala (*symptom*).`
      },
      {
        id: 's1-3',
        urutan: 3,
        judul: 'Referensi Tambahan: Lean Startup & Studi Kasus Kos-Kosan',
        pdfUrl: '/materials/modul-1-bagian-3.pdf',
        pdfTitle: 'Slide PPT Modul 1: Lean Startup & Studi Kasus',
        isi: `### 3. Studi Kasus Manajemen Kos-Kosan
**Latar Belakang Kasus:**
Pemilik kos dengan 10–30 kamar yang tidak tinggal di lokasi kesulitan memantau pembayaran sewa bulanan.

* **Solusi Saat Ini:** Mengirim broadcast pesan WhatsApp satu per satu dan mencatat pembayaran di buku manual / Excel.
* **The Gap:** Pesan WA sering diabaikan penyewa, bukti transfer palsu sulit diverifikasi, dan pengecekan mutasi bank manual menyita waktu.
* **Peluang Inovasi MVP:** Sistem notifikasi penagihan otomatis terintegrasi gateway pembayaran instan dan dashboard arus kas transparan.`
      }
    ]
  },
  {
    id: 'c2',
    urutan: 2,
    judul: 'UI/UX & Design Thinking',
    ringkasan: 'Perbedaan mendasar UI vs UX, 5 tahap Design Thinking (EDIPT), dan studi kasus kegagalan produk.',
    kategori: 'UI/UX Design',
    estimasiWaktu: '50 Menit',
    level: 'Fondasi',
    icon: 'Palette',
    referensiEksternal: 'Double Diamond Framework, Hukum UX (Hicks, Fittss, Jakobs Law), Studi Kasus Juicero & Windows 8',
    sections: [
      {
        id: 's2-1',
        urutan: 1,
        judul: 'Bagian 1: Perbedaan UI dan UX',
        isi: `### UI (User Interface) vs UX (User Experience)
* **UI (Antarmuka Pengguna):** Elemen visual yang tampak di layar seperti tombol, tipografi, warna, tata letak, dan ikon.
* **UX (Pengalaman Pengguna):** Keseluruhan rasa, kemudahan, dan emosi yang dialami pengguna saat berinteraksi dengan produk dari awal hingga akhir.

> **Analogi:** UI adalah tampilan visual dan interior mobil; UX adalah seberapa mulus, aman, dan nyaman mobil tersebut dikendarai di jalan.`
      },
      {
        id: 's2-2',
        urutan: 2,
        judul: 'Bagian 2: 5 Tahap Design Thinking (EDIPT)',
        isi: `### Alur Design Thinking
1. **Empathize:** Memahami pengguna secara mendalam melalui observasi dan wawancara tanpa asumsi.
2. **Define:** Merumuskan masalah utama secara spesifik berdasarkan temuan riset.
3. **Ideate:** Menghasilkan ide-ide solusi sebanyak mungkin tanpa menghakimi kelayakannya terlebih dahulu.
4. **Prototype:** Membuat representasi fisik/digital awal yang dapat diuji coba.
5. **Test:** Menguji prototipe ke pengguna nyata untuk mendapatkan feedback jujur.`
      },
      {
        id: 's2-3',
        urutan: 3,
        judul: 'Referensi Tambahan: Studi Kasus Produk Gagal',
        isi: `### Pelajaran dari Produk Gagal
* **Juicero ($120M):** Mesin pembuat jus canggih seharga $400 yang gagal karena kantong jusnya ternyata bisa diperas dengan tangan kosong. Pelajaran: Jangan membuat solusi teknologi yang tidak memberikan nilai tambah nyata.
* **Windows 8:** Menghilangkan tombol Start secara drastis tanpa mempertimbangkan kebiasaan pengguna desktop, mengakibatkan penolakan pasar secara masif.`
      }
    ]
  },
  {
    id: 'c3',
    urutan: 3,
    judul: 'User Research & Persona',
    ringkasan: 'Metode riset kualitatif & kuantitatif, teknik wawancara bebas leading question, User Persona, dan Journey Map.',
    kategori: 'UI/UX Design',
    estimasiWaktu: '55 Menit',
    level: 'Intermediate',
    icon: 'Users',
    referensiEksternal: 'Empathy Map (Says, Thinks, Does, Feels), User Journey Mapping, Wawancara 3-5 Responden',
    sections: [
      {
        id: 's3-1',
        urutan: 1,
        judul: 'Bagian 1: Riset Kualitatif vs Kuantitatif',
        isi: `### Memilih Pendekatan Riset Pengguna
* **Kualitatif:** Menggali motivasi, alasan, dan rasa frustrasi mendalam melalui wawancara terbuka 3–5 pengguna. Menjawab pertanyaan *"Mengapa"* dan *"Bagaimana"*.
* **Kuantitatif:** Mengumpulkan data numerik dan statistik dari responden berskala besar untuk membuktikan hipotesis secara terukur. Menjawab pertanyaan *"Berapa banyak"*.

#### Leading Question (Pertanyaan Mengarahkan)
Hindari pertanyaan seperti *"Aplikasi ini sangat mudah digunakan, bukan?"* karena menciptakan bias konfirmasi. Gunakan pertanyaan netral: *"Bagaimana pengalaman Anda saat mencoba menyelesaikan proses pembayaran?"*.`
      },
      {
        id: 's3-2',
        urutan: 2,
        judul: 'Bagian 2: User Persona & Empathy Map',
        isi: `### Empathy Map & User Persona
* **Empathy Map:** Memetakan apa yang pengguna **Katakan (Says)**, **Pikirkan (Thinks)**, **Lakukan (Does)**, dan **Rasakan (Feels)**, serta membedah titik sakit (*Pain*) dan harapan (*Gain*).
* **User Persona:** Karakter arketipe fiktif berbasis data riset nyata yang mewakili segmen pengguna utama tim.`
      },
      {
        id: 's3-3',
        urutan: 3,
        judul: 'Referensi Tambahan: User Journey Map',
        isi: `### Memetakan Perjalanan Pengguna
User Journey Map menggambarkan tahapan kronologis interaksi pengguna dengan produk, mengidentifikasi titik emosi frustrasi (*pain points*), dan membuka peluang peningkatan layanan (*opportunities*).`
      }
    ]
  },
  {
    id: 'c4',
    urutan: 4,
    judul: 'Wireframing & User Flow',
    ringkasan: 'Information Architecture (IA), pola baca F-Pattern & Z-Pattern, prinsip Proximity, Contrast, dan Crazy 8s.',
    kategori: 'UI/UX Design',
    estimasiWaktu: '60 Menit',
    level: 'Intermediate',
    icon: 'Layers',
    referensiEksternal: 'Pilar Information Architecture, Pola Scan F/Z, Flowchart Simbol (Terminator, Process, Decision)',
    sections: [
      {
        id: 's4-1',
        urutan: 1,
        judul: 'Bagian 1: Information Architecture & Pola Membaca',
        isi: `### Information Architecture (IA)
4 Pilar IA:
1. **Organization System:** Mengelompokkan informasi secara terstruktur.
2. **Labeling System:** Menamai menu dan tombol agar mudah dipahami secara intuitif.
3. **Navigation System:** Jalur berpindah antar halaman atau fitur.
4. **Search System:** Membantu pengguna menemukan konten spesifik dengan cepat.

#### Pola Scan Mata Pengguna:
* **F-Pattern:** Pola membaca artikel atau halaman kaya teks panjang.
* **Z-Pattern:** Pola memindai landing page visual dengan titik fokus CTA di pojok kanan atas dan bawah.`
      },
      {
        id: 's4-2',
        urutan: 2,
        judul: 'Bagian 2: Wireframing & Prinsip Desain',
        isi: `### Wireframing & Prinsip Gestalt
* **Proximity:** Elemen yang saling terkait ditempatkan berdekatan agar dipahami sebagai satu kesatuan.
* **Contrast:** Menonjolkan elemen kritis (seperti tombol aksi utama) dibanding elemen sekunder.
* **Crazy 8s:** Metode sketsa cepat 8 variasi tata letak dalam waktu 8 menit untuk memicu kreativitas.`
      },
      {
        id: 's4-3',
        urutan: 3,
        judul: 'Referensi Tambahan: User Flow & Happy Path',
        isi: `### Notasi Flowchart & Pencegahan Dead End
* **Terminator:** Awal/akhir alur.
* **Process:** Langkah kerja pengguna.
* **Decision:** Percabangan logika kondisi (misal: "Apakah formulir lengkap?").
* **Pencegahan Dead End:** Pastikan setiap langkah memiliki opsi aksi lanjutan yang jelas bagi pengguna.`
      }
    ]
  },
  {
    id: 'c5',
    urutan: 5,
    judul: 'UI & Prototyping',
    ringkasan: 'Low-Fidelity vs High-Fidelity prototype, komponen form interaktif, CTA, dan prinsip Test Early, Learn Fast.',
    kategori: 'UI/UX Design',
    estimasiWaktu: '50 Menit',
    level: 'Intermediate',
    icon: 'Smartphone',
    referensiEksternal: 'Figma Interaction Links, Anatomy of Form Components, Mobile-first touch targets',
    sections: [
      {
        id: 's5-1',
        urutan: 1,
        judul: 'Bagian 1: Lo-Fi vs Hi-Fi Prototype',
        isi: `### Level Kesetiaan Prototipe
* **Low-Fidelity:** Kerangka sketsa sederhana berfokus pada alur dan tata letak tanpa warna atau grafis mendetail.
* **High-Fidelity:** Tampilan menyerupai produk akhir dengan interaktivitas penuh, transisi, dan visual autentik.`
      },
      {
        id: 's5-2',
        urutan: 2,
        judul: 'Bagian 2: Komponen Interaktif & CTA',
        isi: `### Anatomi Komponen UI
* **Call To Action (CTA):** Tombol yang memandu pengguna mengambil tindakan penting (misal: "Daftar Sekarang", "Mulai Ujian").
* **Form Inputs:** Input text, Radio Button (pilihan tunggal ringkas), Dropdown (banyak opsi hemat ruang), Checkbox (pilihan jamak).`
      },
      {
        id: 's5-3',
        urutan: 3,
        judul: 'Referensi Tambahan: Test Early, Learn Fast',
        isi: `### Filosofi Pengujian Cepat
Semakin dini cacat desain ditemukan dalam bentuk prototipe, semakin murah biaya perbaikannya dibandingkan jika baru ditemukan saat tahap coding akhir.`
      }
    ]
  },
  {
    id: 'c6',
    urutan: 6,
    judul: 'HTML Dasar & Semantik',
    ringkasan: 'Struktur dokumen HTML5, tag semantik (article, header, main), aksesibilitas atribut alt, dan WCAG 1.4.3.',
    kategori: 'Web Development',
    estimasiWaktu: '45 Menit',
    level: 'Fondasi',
    icon: 'Code2',
    referensiEksternal: 'W3C HTML5 Specification, WCAG 2.1 AA Contrast Ratio (4.5:1), Semantic Accessibility',
    sections: [
      {
        id: 's6-1',
        urutan: 1,
        judul: 'Bagian 1: Struktur Dasar HTML5 & Elemen Root',
        isi: `### Struktur Dokumen HTML5
\`\`\`html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Judul Dokumen</title>
</head>
<body>
  <h1>Konten Utama</h1>
</body>
</html>
\`\`\`
* \`<!DOCTYPE html>\`: Memberi instruksi ke browser bahwa dokumen menggunakan standar HTML5.
* \`<html>\`: Root element pembungkus seluruh halaman.
* \`<head>\`: Menyimpan metadata yang tidak tampak langsung di halaman.
* \`<body>\`: Seluruh konten visual yang ditampilkan ke pengguna.`
      },
      {
        id: 's6-2',
        urutan: 2,
        judul: 'Bagian 2: HTML Semantik vs Div Soup',
        isi: `### Mengapa HTML Semantik Penting?
Elemen semantik seperti \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, dan \`<footer>\` memberikan makna struktural bagi mesin perayap SEO dan pembaca layar disabilitas (*screen reader*).
Hindari penggunaan elemen \`<div>\` secara berlebihan untuk semua elemen (*div soup*).`
      },
      {
        id: 's6-3',
        urutan: 3,
        judul: 'Referensi Tambahan: Aksesibilitas WCAG & Atribut Alt',
        isi: `### Aksesibilitas Web (WCAG 1.4.3)
* **Atribut alt pada gambar:** Wajib diisi deskripsi bermakna agar pengguna tunanetra yang mengandalkan screen reader dapat memahami konteks gambar.
* **Rasio Kontras Teks:** Minimal 4.5:1 untuk teks normal dan 3:1 untuk teks besar agar mudah dibaca di layar dengan pencahayaan rendah.`
      }
    ]
  },
  {
    id: 'c7',
    urutan: 7,
    judul: 'PRD, AI, Git Kolaborasi & Slicing Desain',
    ringkasan: 'Format User Story, Acceptance Criteria, alur Git kolaboratif (PR & conflict), Design Token, dan Mobile-First.',
    kategori: 'Engineering & Workflow',
    estimasiWaktu: '65 Menit',
    level: 'Intermediate',
    icon: 'GitPullRequest',
    referensiEksternal: 'Git Feature Branch Workflow, Pull Request & Code Review Etiquette, Design Tokens in Tailwind',
    sections: [
      {
        id: 's7-1',
        urutan: 1,
        judul: 'Bagian 1: PRD, User Story, & Acceptance Criteria',
        isi: `### Fondasi Keselarasan Tim
* **PRD (Product Requirement Document):** Dokumen tunggal acuan seluruh tim agar tidak terjadi miskomunikasi spesifikasi.
* **Format User Story:** *"Sebagai [jenis pengguna], saya ingin [fitur/kebutuhan], sehingga saya dapat [manfaat/tujuan]."*
* **Acceptance Criteria (AC):** Standar kondisi teruji yang harus dipenuhi sebelum sebuah tugas dianggap selesai (*Definition of Done*).`
      },
      {
        id: 's7-2',
        urutan: 2,
        judul: 'Bagian 2: Alur Kolaborasi Git & Code Review',
        isi: `### Git Branch & Pull Request (PR)
* Selalu buat branch fitur baru terpisah dari branch utama: \`git checkout -b feature/login-page\`.
* Lakukan Pull Request (PR) untuk mendiskusikan perubahan kode dan meminta review rekan sebelum di-*merge*.
* Hindari \`git push --force\` di branch kolaboratif karena dapat menimpa pekerjaan rekan tim.`
      },
      {
        id: 's7-3',
        urutan: 3,
        judul: 'Referensi Tambahan: Slicing Desain & Mobile-First',
        isi: `### Slicing Desain ke Komponen
* Menerjemahkan tata letak Figma menjadi komponen kode terisolasi dan dapat digunakan ulang (*reusable*).
* **Pendekatan Mobile-First:** Rancang antarmuka untuk layar HP terlebih dahulu (360px) lalu perluas secara modular ke layar desktop.`
      }
    ]
  },
  {
    id: 'c8',
    urutan: 8,
    judul: 'Integrasi Data Dinamis',
    ringkasan: 'BaaS Supabase, 5 UI States (Idle, Loading, Success, Error, Empty), Debounce, AbortController, RLS, DOMPurify.',
    kategori: 'Web Development',
    estimasiWaktu: '70 Menit',
    level: 'Advanced',
    icon: 'Database',
    referensiEksternal: 'PostgreSQL Row Level Security, Sanitasi XSS DOMPurify, Debounce Hook, AbortController',
    sections: [
      {
        id: 's8-1',
        urutan: 1,
        judul: 'Bagian 1: Backend as a Service & 5 UI States',
        isi: `### Mengelola 5 Kondisi Antarmuka (UI States)
1. **Idle:** Kondisi awal sebelum request dimulai.
2. **Loading:** Menampilkan indikator proses (seperti skeleton loader).
3. **Success:** Data berhasil diterima dan dirender sempurna.
4. **Error:** Kegagalan koneksi atau server dengan pesan pemulihan ramah pengguna.
5. **Empty:** Data kosong / belum ada riwayat dengan ajakan bertindak (*CTA*).`
      },
      {
        id: 's8-2',
        urutan: 2,
        judul: 'Bagian 2: Optimasi Request: Debounce & AbortController',
        isi: `### Menjaga Performa & Menghindari Race Condition
* **Debounce:** Menunda eksekusi request pencarian hingga pengguna berhenti mengetik selama sekian milidetik, mencegah pemborosan request server.
* **AbortController:** Membatalkan request API sebelumnya yang belum selesai saat pengguna melakukan aksi baru.`
      },
      {
        id: 's8-3',
        urutan: 3,
        judul: 'Referensi Tambahan: Keamanan Web (RLS & XSS Sanitasi)',
        isi: `### Aspek Keamanan Data
* **Row Level Security (RLS):** Kebijakan database yang memastikan pengguna hanya bisa mengakses baris data miliknya sendiri.
* **DOMPurify:** Membersihkan konten HTML dari potensi injeksi script berbahaya (*Cross-Site Scripting / XSS*).`
      }
    ]
  },
  {
    id: 'c9',
    urutan: 9,
    judul: 'Usability Testing & Sprint Perbaikan',
    ringkasan: 'Metode Think-Aloud, aturan 5 pengguna Nielsen, Microsoft Clarity heatmap & rage click, metrik SEQ, dan GitHub Issues.',
    kategori: 'UI/UX & Quality',
    estimasiWaktu: '60 Menit',
    level: 'Advanced',
    icon: 'Sparkles',
    referensiEksternal: 'Nielsen Norman 5 User Rule, Think-Aloud Protocol, Session Replays, Single Ease Question (SEQ)',
    sections: [
      {
        id: 's9-1',
        urutan: 1,
        judul: 'Bagian 1: Metodologi Usability Testing & Think-Aloud',
        isi: `### Menguji Antarmuka ke Pengguna Nyata
* **Aturan 5 Pengguna Nielsen:** 5 penguji mampu menemukan hingga 85% masalah kegunaan produk.
* **Metode Think-Aloud:** Penguji diminta menyuarakan apa yang sedang dipikirkan, dirasakan, dan dibingungkan saat mencoba menyelesaikan tugas.
* **Prinsip No Guidance:** Fasilitator dilarang membantu atau mengarahkan pengguna selama pengetesan agar hasil pengamatan valid.`
      },
      {
        id: 's9-2',
        urutan: 2,
        judul: 'Bagian 2: Analisis Perilaku Pengguna dengan Heatmap',
        isi: `### Alat Analitik Perilaku (Microsoft Clarity)
* **Heatmap:** Peta visual area yang paling sering diklik atau dilihat pengguna.
* **Session Replay:** Rekaman video interaksi kursor pengguna secara anonim.
* **Rage Click:** Perilaku pengguna mengklik tombol secara bertubi-tubi karena frustrasi tombol tidak segera merespons.`
      },
      {
        id: 's9-3',
        urutan: 3,
        judul: 'Referensi Tambahan: Metrik SEQ & Triase Bug',
        isi: `### Mengukur Kemudahan Tugas
* **Single Ease Question (SEQ):** Pertanyaan berskala 1–7 setelah pengguna menyelesaikan skenario tugas: *"Seberapa mudah tugas ini diselesaikan?"*.
* **Triase Bug:** Mengklasifikasikan masalah ke dalam tingkat Kritis, Mayor, Minor, dan Kosmetik.`
      }
    ]
  },
  {
    id: 'c10',
    urutan: 10,
    judul: 'Audit Kualitas Web & Showcase Portofolio',
    ringkasan: 'Audit Google Lighthouse, Core Web Vitals (LCP, INP, CLS), sanitasi keamanan dasar (.env & HTTPS), dan studi kasus portofolio.',
    kategori: 'Engineering & Career',
    estimasiWaktu: '60 Menit',
    level: 'Advanced',
    icon: 'Award',
    referensiEksternal: 'Google Lighthouse Audit >= 90, Core Web Vitals (LCP <= 2.5s, INP <= 200ms, CLS <= 0.1), Case Study Structure',
    sections: [
      {
        id: 's10-1',
        urutan: 1,
        judul: 'Bagian 1: Google Lighthouse & Core Web Vitals',
        isi: `### Metrik Kualitas Google Lighthouse
Audit otomatis 4 pilar utama:
1. **Performance:** Kecepatan rendering halaman.
2. **Accessibility:** Keterbacaan dan kepatuhan WCAG bagi pengguna difabel.
3. **Best Practices:** Keamanan standar web (HTTPS, script aman).
4. **SEO:** Kemudahan halaman diindeks oleh Google.

#### 3 Indikator Core Web Vitals:
* **LCP (Largest Contentful Paint) <= 2.5 detik:** Kecepatan pemuatan elemen visual utama terbesar.
* **INP (Interaction to Next Paint) <= 200 ms:** Kecepatan respon interaksi terhadap klik pengguna.
* **CLS (Cumulative Layout Shift) <= 0.1:** Stabilitas tata letak halaman saat loading.`
      },
      {
        id: 's10-2',
        urutan: 2,
        judul: 'Bagian 2: Praktik Keamanan Dasar Web',
        isi: `### Menjaga Keamanan Aplikasi
* **File .env:** Tempat menyimpan rahasia konfigurasi (API Keys, kredensial database). Jangan pernah mengunggah file \`.env\` ke public repository GitHub!
* **Protokol HTTPS:** Mengenkripsi transmisi data antara browser pengguna dan server.`
      },
      {
        id: 's10-3',
        urutan: 3,
        judul: 'Referensi Tambahan: Menyusun Case Study Portofolio',
        isi: `### Struktur Case Study Profesional
Rekruter industri lebih menyukai portofolio berbasis pemecahan masalah (*Problem Solving*) dibandingkan sekadar screenshot antarmuka:
1. **Overview:** Ringkasan proyek, durasi, peran, dan tantangan utama.
2. **Discovery:** Riset pengguna dan identifikasi masalah mendasar.
3. **Engineering:** Keputusan arsitektur teknis dan implementasi kode.
4. **Testing:** Hasil usability testing dan temuan audit performa.
5. **Impact:** Dampak terukur dan pencapaian produk.`
      }
    ]
  }
];

/**
 * Bank Soal per Modul & Paket (Set A, B, C)
 * Mengacu langsung pada Lampiran Resmi PRD (halaman 13 - 163)
 */
export const MOCK_QUESTIONS = {
  // ================= MODUL 1 (Mindset Startup & Problem Solving) =================
  c1: {
    A: [
      // 10 Pilihan Ganda (Set A)
      {
        id: 'q1-A-1',
        urutan: 1,
        topik: 'Startup Mindset',
        tipe: 'pilihan_ganda',
        teks: 'Apa yang dimaksud dengan pola pikir Value Driven?',
        options: [
          { id: 'opt-1', teks: 'Berfokus pada teknologi terbaru' },
          { id: 'opt-2', teks: 'Berfokus pada desain yang menarik' },
          { id: 'opt-3', teks: 'Berfokus pada nilai yang diberikan kepada pengguna' },
          { id: 'opt-4', teks: 'Berfokus pada keuntungan perusahaan semata' }
        ],
        kunciJawaban: 'opt-3',
        pembahasan: 'Value Driven berfokus pada pemberian nilai nyata bagi pemecahan masalah pengguna.'
      },
      {
        id: 'q1-A-2',
        urutan: 2,
        topik: 'Startup Mindset',
        tipe: 'pilihan_ganda',
        teks: 'Dalam mindset startup, pertanyaan yang paling tepat sebelum membuat fitur adalah...',
        options: [
          { id: 'opt-1', teks: 'Fitur apa yang paling canggih?' },
          { id: 'opt-2', teks: 'Teknologi apa yang paling mahal?' },
          { id: 'opt-3', teks: 'Nilai apa yang dapat mempermudah hidup pengguna?' },
          { id: 'opt-4', teks: 'Bagaimana cara mengalahkan kompetitor seketika?' }
        ],
        kunciJawaban: 'opt-3',
        pembahasan: 'Pertanyaan inti startup berpusat pada nilai manfaat bagi kemudahan hidup pengguna.'
      },
      {
        id: 'q1-A-3',
        urutan: 3,
        topik: 'Problem Solving',
        tipe: 'pilihan_ganda',
        teks: 'Prinsip "Solve The Problem" menekankan bahwa produk startup harus...',
        options: [
          { id: 'opt-1', teks: 'Mengutamakan animasi desain visual' },
          { id: 'opt-2', teks: 'Berpegang pada masalah nyata pengguna' },
          { id: 'opt-3', teks: 'Meniru fitur kompetitor paling besar' },
          { id: 'opt-4', teks: 'Membuat sebanyak mungkin fitur sekaligus' }
        ],
        kunciJawaban: 'opt-2',
        pembahasan: 'Startup harus berpegang teguh pada penyelesaian masalah nyata, bukan asumsi.'
      },
      {
        id: 'q1-A-4',
        urutan: 4,
        topik: 'Agility',
        tipe: 'pilihan_ganda',
        teks: 'Agility dalam pengembangan startup berarti...',
        options: [
          { id: 'opt-1', teks: 'Menghindari segala bentuk kegagalan' },
          { id: 'opt-2', teks: 'Menunggu produk 100% sempurna sebelum rilis' },
          { id: 'opt-3', teks: 'Bergerak cepat, menerima feedback, dan terus memperbaiki produk' },
          { id: 'opt-4', teks: 'Membuat produk sekali tanpa perlu diperbarui' }
        ],
        kunciJawaban: 'opt-3',
        pembahasan: 'Agility adalah fleksibilitas bergerak cepat, mendengar feedback, dan terus iterasi.'
      },
      {
        id: 'q1-A-5',
        urutan: 5,
        topik: 'Validasi Masalah',
        tipe: 'pilihan_ganda',
        teks: 'Kegagalan pada tahap awal startup sebaiknya dianggap sebagai...',
        options: [
          { id: 'opt-1', teks: 'Bukti ketidakmampuan tim developer' },
          { id: 'opt-2', teks: 'Kerugian finansial mutlak' },
          { id: 'opt-3', teks: 'Data berharga untuk melakukan perbaikan' },
          { id: 'opt-4', teks: 'Alasan mutlak menghentikan proyek' }
        ],
        kunciJawaban: 'opt-3',
        pembahasan: 'Kegagalan awal merupakan umpan balik dan data empiris untuk perbaikan berkelanjutan.'
      },
      {
        id: 'q1-A-6',
        urutan: 6,
        topik: 'Problem-Solution Fit',
        tipe: 'pilihan_ganda',
        teks: 'Checkpoint pertama yang harus dicapai sebelum Product-Market Fit adalah...',
        options: [
          { id: 'opt-1', teks: 'Market Expansion' },
          { id: 'opt-2', teks: 'Business Incorporation' },
          { id: 'opt-3', teks: 'Problem-Solution Fit' },
          { id: 'opt-4', teks: 'Revenue Scaling' }
        ],
        kunciJawaban: 'opt-3',
        pembahasan: 'Problem-Solution Fit membuktikan bahwa solusi kita terbukti menyelesaikan masalah sebelum diskalakan.'
      },
      {
        id: 'q1-A-7',
        urutan: 7,
        topik: 'Validasi Masalah',
        tipe: 'pilihan_ganda',
        teks: 'Sebuah masalah dianggap layak untuk diselesaikan oleh produk digital jika...',
        options: [
          { id: 'opt-1', teks: 'Mudah diselesaikan dalam 1 hari' },
          { id: 'opt-2', teks: 'Sedang viral di media sosial' },
          { id: 'opt-3', teks: 'Mendesak dan benar-benar dialami pengguna' },
          { id: 'opt-4', teks: 'Hanya disukai oleh pihak investor' }
        ],
        kunciJawaban: 'opt-3',
        pembahasan: 'Masalah bernilai tinggi adalah masalah yang mendesak, nyata, dan dirasakan langsung.'
      },
      {
        id: 'q1-A-8',
        urutan: 8,
        topik: 'Validasi Solusi',
        tipe: 'pilihan_ganda',
        teks: 'Dalam tahap awal validasi produk, yang harus lebih diprioritaskan adalah...',
        options: [
          { id: 'opt-1', teks: 'Tampilan animasi UI yang rumit' },
          { id: 'opt-2', teks: 'Validasi solusi kepada target pengguna' },
          { id: 'opt-3', teks: 'Pembuatan logo perusahaan' },
          { id: 'opt-4', teks: 'Kampanye iklan berbayar besar-besaran' }
        ],
        kunciJawaban: 'opt-2',
        pembahasan: 'Validasi solusi kepada pengguna adalah prioritas utama sebelum investasi aset berlebih.'
      },
      {
        id: 'q1-A-9',
        urutan: 9,
        topik: 'Inovasi Produk',
        tipe: 'pilihan_ganda',
        teks: 'Keluhan dan rasa frustrasi pengguna dalam startup sebaiknya dipandang sebagai...',
        options: [
          { id: 'opt-1', teks: 'Hambatan operasional bisnis' },
          { id: 'opt-2', teks: 'Risiko kegagalan mutlak' },
          { id: 'opt-3', teks: 'Bahan bakar utama untuk inovasi produk' },
          { id: 'opt-4', teks: 'Serangan dari pihak kompetitor' }
        ],
        kunciJawaban: 'opt-3',
        pembahasan: 'Rasa frustrasi pengguna memetakan pain point yang bisa diubah menjadi peluang inovasi.'
      },
      {
        id: 'q1-A-10',
        urutan: 10,
        topik: 'Problem Statement Canvas',
        tipe: 'pilihan_ganda',
        teks: 'Problem Statement Canvas digunakan oleh tim produk untuk...',
        options: [
          { id: 'opt-1', teks: 'Membuat laporan perpajakan' },
          { id: 'opt-2', teks: 'Merumuskan masalah secara presisi dan terstruktur' },
          { id: 'opt-3', teks: 'Mendesain layout kode database' },
          { id: 'opt-4', teks: 'Menentukan harga jual saham' }
        ],
        kunciJawaban: 'opt-2',
        pembahasan: 'Canvas ini membantu tim mendefinisikan target, konteks, akar masalah, dan celah solusi.'
      },

      // 5 Soal Essay Studi Kasus (Set A)
      {
        id: 'q1-A-11',
        urutan: 11,
        topik: 'Startup Mindset',
        tipe: 'essay',
        teks: 'Jelaskan pengertian Value Driven dalam pola pikir startup digital!',
        kunciJawabanIdeal: 'Value Driven adalah pola pikir startup yang berfokus pada penciptaan nilai (value) bagi pengguna dengan menyelesaikan masalah nyata yang mereka alami. Keputusan bisnis, fitur, dan inovasi dibuat berdasarkan manfaat yang diberikan kepada pengguna, bukan hanya teknologi atau keuntungan semata.',
        keywords: ['nilai', 'value', 'pengguna', 'customer', 'masalah nyata', 'manfaat', 'kebutuhan']
      },
      {
        id: 'q1-A-12',
        urutan: 12,
        topik: 'Problem Solving',
        tipe: 'essay',
        teks: 'Mengapa startup harus fokus pada masalah pengguna, bukan pada solusi atau teknologinya terlebih dahulu?',
        kunciJawabanIdeal: 'Karena solusi dan teknologi dapat berubah seiring perkembangan zaman, tetapi masalah pengguna tetap menjadi dasar kebutuhan pasar. Dengan memahami masalah terlebih dahulu, startup dapat menciptakan solusi yang relevan, dibutuhkan, dan memiliki peluang adopsi yang tinggi.',
        keywords: ['masalah pengguna', 'solusi bisa berubah', 'kebutuhan pasar', 'relevan', 'validasi']
      },
      {
        id: 'q1-A-13',
        urutan: 13,
        topik: 'Agility',
        tipe: 'essay',
        teks: 'Jelaskan konsep Agility dan manfaat penerapannya bagi tim pengembang startup!',
        kunciJawabanIdeal: 'Agility adalah kemampuan startup untuk bergerak cepat, menerima umpan balik (feedback), beradaptasi terhadap perubahan pasar, melakukan eksperimen, dan terus memperbaiki produk berdasarkan data kebutuhan pengguna nyata.',
        keywords: ['bergerak cepat', 'adaptasi', 'feedback', 'eksperimen', 'perbaikan berkelanjutan']
      },
      {
        id: 'q1-A-14',
        urutan: 14,
        topik: 'Problem-Solution Fit',
        tipe: 'essay',
        teks: 'Apa yang dimaksud dengan Problem-Solution Fit dan mengapa tahapan ini krusial?',
        kunciJawabanIdeal: 'Problem-Solution Fit adalah kondisi ketika solusi yang dibangun terbukti mampu menyelesaikan masalah penting yang dialami target pengguna. Tahapan ini krusial karena mengurangi risiko membangun produk yang tidak dibutuhkan pasar.',
        keywords: ['solusi sesuai masalah', 'validasi', 'kebutuhan pengguna', 'mengurangi risiko', 'dibutuhkan pasar']
      },
      {
        id: 'q1-A-15',
        urutan: 15,
        topik: 'Validasi Masalah',
        tipe: 'essay',
        teks: 'Mengapa proses validasi masalah harus dilakukan sebelum menulis kode pembuatan produk?',
        kunciJawabanIdeal: 'Karena startup harus memastikan masalah tersebut benar-benar nyata dialami pengguna, penting untuk diselesaikan, dan layak dijadikan bisnis sehingga tidak membuang waktu, biaya, dan sumber daya untuk produk yang tidak berguna.',
        keywords: ['memastikan masalah nyata', 'kebutuhan pengguna', 'mengurangi risiko', 'efisiensi biaya', 'validasi']
      }
    ],

    // Set B (Percobaan ke-2)
    B: [
      {
        id: 'q1-B-1',
        urutan: 1,
        topik: 'Problem Solving',
        tipe: 'pilihan_ganda',
        teks: 'Strategi AI yang paling tepat digunakan untuk merumuskan pain point pengguna adalah...',
        options: [
          { id: 'opt-1', teks: 'Data Mining Otomatis' },
          { id: 'opt-2', teks: 'Prompt Engineering terstruktur' },
          { id: 'opt-3', teks: 'Web Hosting Serverless' },
          { id: 'opt-4', teks: 'Cloud Computing' }
        ],
        kunciJawaban: 'opt-2',
        pembahasan: 'Prompt engineering yang terstruktur membantu mensimulasikan wawancara dan menggali pain points.'
      },
      {
        id: 'q1-B-2',
        urutan: 2,
        topik: 'Analisis Kompetitor',
        tipe: 'pilihan_ganda',
        teks: 'Analisis kompetitor pada tahap perumusan masalah bertujuan untuk menemukan...',
        options: [
          { id: 'opt-1', teks: 'Harga produk termurah di pasar' },
          { id: 'opt-2', teks: 'Celah kebutuhan pengguna yang belum dipenuhi kompetitor' },
          { id: 'opt-3', teks: 'Total modal usaha terbesar' },
          { id: 'opt-4', teks: 'Cara menyalin kode sumber kompetitor' }
        ],
        kunciJawaban: 'opt-2',
        pembahasan: 'Tujuan utama analisis kompetitor adalah mencari the gap (celah pasar).'
      },
      {
        id: 'q1-B-3',
        urutan: 3,
        topik: 'Startup Mindset',
        tipe: 'pilihan_ganda',
        teks: 'UVP merupakan singkatan dari...',
        options: [
          { id: 'opt-1', teks: 'User Validation Process' },
          { id: 'opt-2', teks: 'Unique Value Proposition' },
          { id: 'opt-3', teks: 'User Value Product' },
          { id: 'opt-4', teks: 'Unique Verification Point' }
        ],
        kunciJawaban: 'opt-2',
        pembahasan: 'UVP adalah Unique Value Proposition, pembeda nilai unik produk dibanding alternatif lain.'
      },
      {
        id: 'q1-B-4',
        urutan: 4,
        topik: 'Problem Solving',
        tipe: 'pilihan_ganda',
        teks: 'Penggunaan peran AI sebagai "Devil’s Advocate" berfungsi untuk...',
        options: [
          { id: 'opt-1', teks: 'Mendesain layout antarmuka' },
          { id: 'opt-2', teks: 'Mengkritisi ide dan menguji asumsi secara skeptis' },
          { id: 'opt-3', teks: 'Menjual produk ke konsumen' },
          { id: 'opt-4', teks: 'Mengatur relasi database' }
        ],
        kunciJawaban: 'opt-2',
        pembahasan: 'Devil’s Advocate bertugas mencari kelemahan dan lubang asumsi dari ide produk.'
      },
      {
        id: 'q1-B-5',
        urutan: 5,
        topik: 'Anatomi Masalah',
        tipe: 'pilihan_ganda',
        teks: 'Unsur "Who" dalam anatomi rumusan masalah merujuk pada...',
        options: [
          { id: 'opt-1', teks: 'Penyandang dana (investor)' },
          { id: 'opt-2', teks: 'Kompetitor terbesar' },
          { id: 'opt-3', teks: 'Kelompok target pengguna spesifik' },
          { id: 'opt-4', teks: 'Tim developer internal' }
        ],
        kunciJawaban: 'opt-3',
        pembahasan: 'Who adalah target audiens spesifik yang paling menderita akibat masalah.'
      },
      {
        id: 'q1-B-6',
        urutan: 6,
        topik: 'Anatomi Masalah',
        tipe: 'pilihan_ganda',
        teks: 'Definisi target pengguna yang baik dan terarah adalah...',
        options: [
          { id: 'opt-1', teks: 'Semua orang pengguna internet' },
          { id: 'opt-2', teks: 'Kelompok spesifik yang paling merasakan dampak masalah' },
          { id: 'opt-3', teks: 'Seluruh masyarakat Indonesia' },
          { id: 'opt-4', teks: 'Pengguna media sosial' }
        ],
        kunciJawaban: 'opt-2',
        pembahasan: 'Segmentasi spesifik membuat solusi lebih tajam dan terfokus.'
      },
      {
        id: 'q1-B-7',
        urutan: 7,
        topik: 'Pain Point',
        tipe: 'pilihan_ganda',
        teks: 'Istilah "Pain Point" dalam perancangan produk berarti...',
        options: [
          { id: 'opt-1', teks: 'Target pasar' },
          { id: 'opt-2', teks: 'Biaya operasional' },
          { id: 'opt-3', teks: 'Titik masalah atau frustrasi yang dialami pengguna' },
          { id: 'opt-4', teks: 'Strategi harga jual' }
        ],
        kunciJawaban: 'opt-3',
        pembahasan: 'Pain point adalah kesulitan nyata atau frustrasi yang menghambat pengguna.'
      },
      {
        id: 'q1-B-8',
        urutan: 8,
        topik: 'Jobs to be Done',
        tipe: 'pilihan_ganda',
        teks: 'Kerangka "Jobs to be Done" (JTBD) menjelaskan tentang...',
        options: [
          { id: 'opt-1', teks: 'Tugas spesifik yang ingin diselesaikan oleh pengguna' },
          { id: 'opt-2', teks: 'Daftar tugas harian tim programmer' },
          { id: 'opt-3', teks: 'Kewajiban investor kepada startup' },
          { id: 'opt-4', teks: 'Rencana promosi pemasaran' }
        ],
        kunciJawaban: 'opt-1',
        pembahasan: 'JTBD menjelaskan pekerjaan yang ingin dituntaskan pengguna dengan bantuan produk.'
      },
      {
        id: 'q1-B-9',
        urutan: 9,
        topik: 'Konteks Masalah',
        tipe: 'pilihan_ganda',
        teks: 'Unsur Konteks (When & Where) dalam rumusan masalah menjelaskan...',
        options: [
          { id: 'opt-1', teks: 'Alamat kantor pusat startup' },
          { id: 'opt-2', teks: 'Situasi dan momen spesifik yang memicu timbulnya masalah' },
          { id: 'opt-3', teks: 'Lokasi pertemuan investor' },
          { id: 'opt-4', teks: 'Tempat promosi baliho produk' }
        ],
        kunciJawaban: 'opt-2',
        pembahasan: 'Konteks memetakan kondisi saat masalah tersebut terjadi.'
      },
      {
        id: 'q1-B-10',
        urutan: 10,
        topik: 'Root Cause',
        tipe: 'pilihan_ganda',
        teks: 'Metode yang efektif digunakan untuk menggali hingga ke akar masalah adalah...',
        options: [
          { id: 'opt-1', teks: 'Analisis SWOT' },
          { id: 'opt-2', teks: 'Lean Canvas' },
          { id: 'opt-3', teks: 'Metode 5 Whys' },
          { id: 'opt-4', teks: 'Benchmarking visual' }
        ],
        kunciJawaban: 'opt-3',
        pembahasan: '5 Whys menggali lapisan demi lapisan sebab hingga ke akar terdalam.'
      },

      // 5 Essay Set B
      {
        id: 'q1-B-11',
        urutan: 11,
        topik: 'Inovasi Produk',
        tipe: 'essay',
        teks: 'Bagaimana keluhan pelanggan dapat diubah menjadi sumber inovasi berharga bagi startup?',
        kunciJawabanIdeal: 'Keluhan pelanggan menunjukkan hambatan dan masalah nyata yang dialami pengguna saat memakai solusi yang ada. Data tersebut dapat diubah menjadi ide fitur baru, peningkatan kualitas produk, dan penemuan celah pasar yang belum dipenuhi kompetitor.',
        keywords: ['keluhan pelanggan', 'masalah nyata', 'peluang inovasi', 'kebutuhan pengguna', 'perbaikan produk']
      },
      {
        id: 'q1-B-12',
        urutan: 12,
        topik: 'Problem Statement Canvas',
        tipe: 'essay',
        teks: 'Jelaskan fungsi dan manfaat dari Problem Statement Canvas bagi tim produk!',
        kunciJawabanIdeal: 'Problem Statement Canvas adalah alat untuk mendefinisikan, menganalisis, dan membedah masalah pengguna secara terstruktur sehingga tim dapat mengidentifikasi akar masalah, dampak terukur, konteks kejadian, dan peluang solusi yang tepat.',
        keywords: ['alat analisis', 'masalah pengguna', 'terstruktur', 'akar masalah', 'peluang solusi']
      },
      {
        id: 'q1-B-13',
        urutan: 13,
        topik: 'Problem Solving',
        tipe: 'essay',
        teks: 'Sebutkan dan jelaskan empat strategi riset menggunakan AI Prompting!',
        kunciJawabanIdeal: 'Empat strategi AI Prompting yaitu: 1. AI sebagai Market Researcher (memetakan data tren pasar), 2. AI sebagai Interview Simulator (mensimulasikan calon responden), 3. AI sebagai Competitor Analyst (menganalisis kelebihan/kekurangan lawan), dan 4. AI sebagai Devil’s Advocate (menguji dan mengkritisi kelemahan asumsi tim).',
        keywords: ['market researcher', 'interview simulator', 'competitor analyst', 'devil advocate']
      },
      {
        id: 'q1-B-14',
        urutan: 14,
        topik: 'Root Cause',
        tipe: 'essay',
        teks: 'Jelaskan perbedaan mendasar antara Pain Point dan Root Cause!',
        kunciJawabanIdeal: 'Pain Point adalah gejala, keluhan, atau kesulitan langsung yang dirasakan oleh pengguna di permukaan, sedangkan Root Cause adalah akar penyebab utama terdalam yang melahirkan timbulnya keluhan tersebut.',
        keywords: ['pain point', 'gejala masalah', 'root cause', 'penyebab utama', 'akar masalah']
      },
      {
        id: 'q1-B-15',
        urutan: 15,
        topik: 'Anatomi Masalah',
        tipe: 'essay',
        teks: 'Mengapa target pengguna dalam perancangan produk tidak boleh didefinisikan sebagai "semua orang"?',
        kunciJawabanIdeal: 'Karena kebutuhan dan masalah setiap kelompok pengguna berbeda. Target yang terlalu luas membuat solusi menjadi bias, tidak fokus, dan sulit divalidasi, sedangkan segmentasi spesifik membantu menciptakan solusi yang tajam dan tepat sasaran.',
        keywords: ['segmentasi', 'spesifik', 'fokus', 'kebutuhan berbeda', 'target pengguna']
      }
    ]
  }
};

/**
 * In-memory / LocalStorage State Manager
 * Mengatur Progressive Gating, Attempt History, dan Cooldown Timer
 */
const STORAGE_KEY_PROGRESS = 'vinix7_progress_state';
const STORAGE_KEY_ATTEMPTS = 'vinix7_attempts_state';

export function getStoredProgress() {
  const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error('Error parsing progress:', e);
    }
  }

  // Initial State: Course 1 terbuka, course 2-10 terkunci
  const initial = {
    c1: { status: 'unlocked', bagianSelesai: [], nilaiTerbaik: 0 },
    c2: { status: 'locked', bagianSelesai: [], nilaiTerbaik: 0 },
    c3: { status: 'locked', bagianSelesai: [], nilaiTerbaik: 0 },
    c4: { status: 'locked', bagianSelesai: [], nilaiTerbaik: 0 },
    c5: { status: 'locked', bagianSelesai: [], nilaiTerbaik: 0 },
    c6: { status: 'locked', bagianSelesai: [], nilaiTerbaik: 0 },
    c7: { status: 'locked', bagianSelesai: [], nilaiTerbaik: 0 },
    c8: { status: 'locked', bagianSelesai: [], nilaiTerbaik: 0 },
    c9: { status: 'locked', bagianSelesai: [], nilaiTerbaik: 0 },
    c10: { status: 'locked', bagianSelesai: [], nilaiTerbaik: 0 }
  };
  localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(initial));
  return initial;
}

export function saveStoredProgress(progress) {
  localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
}

export function getStoredAttempts() {
  const raw = localStorage.getItem(STORAGE_KEY_ATTEMPTS);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error('Error parsing attempts:', e);
    }
  }
  return [];
}

export function saveStoredAttempts(attempts) {
  localStorage.setItem(STORAGE_KEY_ATTEMPTS, JSON.stringify(attempts));
}
