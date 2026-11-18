// back-end/src/data/modules/modul1SetC.js
const now = () => new Date().toISOString();

export const modul1SetCOptions = [
  // Q1-C (q1000005-0000-0000-0000-000000000001)
  { id: 'o1-C1-1', question_id: 'q1000005-0000-0000-0000-000000000001', teks: 'Segera menutup perusahaan jika produk versi pertama tidak langsung menghasilkan profit besar.', poin: 0, umpan_balik: 'Keliru. Fail fast bukan berarti menyerah, melainkan menguji asumsi secepat mungkin.', is_correct: false },
  { id: 'o1-C1-2', question_id: 'q1000005-0000-0000-0000-000000000001', teks: 'Menguji hipotesis dan prototipe sederhana secepat mungkin untuk menemukan kekurangan sejak dini dan beradaptasi berdasarkan umpan balik nyata.', poin: 10, umpan_balik: 'Tepat! Fail fast, learn faster menekankan validasi cepat agar tim segera belajar dari data.', is_correct: true },
  { id: 'o1-C1-3', question_id: 'q1000005-0000-0000-0000-000000000001', teks: 'Merilis aplikasi tanpa melalui proses pengujian kualitas (QA) agar menjadi yang pertama di pasar.', poin: 0, umpan_balik: 'Keliru. Mengabaikan kualitas merusak kepercayaan pengguna.', is_correct: false },
  { id: 'o1-C1-4', question_id: 'q1000005-0000-0000-0000-000000000001', teks: 'Mengganti seluruh ide bisnis setiap minggu tanpa melakukan analisis akar masalah.', poin: 0, umpan_balik: 'Keliru. Perubahan tanpa arah bukan bagian dari pembelajaran tervalidasi.', is_correct: false },

  // Q2-C (q1000005-0000-0000-0000-000000000002)
  { id: 'o1-C2-1', question_id: 'q1000005-0000-0000-0000-000000000002', teks: 'Langsung memberikan diskon 50% di halaman checkout agar pengguna segera membayar.', poin: 0, umpan_balik: 'Keliru. Diskon hanya menutupi masalah sementara tanpa tahu penyebab pengguna batal.', is_correct: false },
  { id: 'o1-C2-2', question_id: 'q1000005-0000-0000-0000-000000000002', teks: 'Menggali penyebab utama (root cause) mengapa pengguna batal checkout melalui observasi perilaku dan wawancara pengguna.', poin: 10, umpan_balik: 'Tepat! Problem-solving mindset selalu mencari akar penyebab sebelum merancang intervensi.', is_correct: true },
  { id: 'o1-C2-3', question_id: 'q1000005-0000-0000-0000-000000000002', teks: 'Mengubah warna tombol checkout menjadi lebih mencolok dan menambah animasi.', poin: 0, umpan_balik: 'Keliru. Perubahan kosmetik tidak menyelesaikan hambatan alur pembayaran.', is_correct: false },
  { id: 'o1-C2-4', question_id: 'q1000005-0000-0000-0000-000000000002', teks: 'Menghapus halaman ringkasan pesanan agar proses transaksi lebih singkat.', poin: 0, umpan_balik: 'Keliru. Menghapus informasi penting justru meningkatkan keraguan pengguna.', is_correct: false },

  // Q3-C (q1000005-0000-0000-0000-000000000003)
  { id: 'o1-C3-1', question_id: 'q1000005-0000-0000-0000-000000000003', teks: 'Melakukan wawancara mendalam dengan calon pengguna yang mengalami masalah tersebut.', poin: 0, umpan_balik: 'Keliru. Wawancara mendalam adalah metode validasi yang sah.', is_correct: false },
  { id: 'o1-C3-2', question_id: 'q1000005-0000-0000-0000-000000000003', teks: 'Mengamati langsung bagaimana pengguna berupaya menyelesaikan masalahnya saat ini.', poin: 0, umpan_balik: 'Keliru. Observasi langsung adalah cara valid untuk menemukan pain point nyata.', is_correct: false },
  { id: 'o1-C3-3', question_id: 'q1000005-0000-0000-0000-000000000003', teks: 'Mengandalkan asumsi pribadi tim pendiri dan pujian dari keluarga dekat tanpa data pengguna nyata.', poin: 10, umpan_balik: 'Tepat! Asumsi internal dan pujian keluarga (bias) bukan bukti validasi masalah.', is_correct: true },
  { id: 'o1-C3-4', question_id: 'q1000005-0000-0000-0000-000000000003', teks: 'Menguji prototipe awal (MVP) kepada sekelompok kecil target pengguna spesifik.', poin: 0, umpan_balik: 'Keliru. Pengujian MVP kepada target audiens adalah metode validasi yang tepat.', is_correct: false },

  // Q4-C (q1000005-0000-0000-0000-000000000004)
  { id: 'o1-C4-1', question_id: 'q1000005-0000-0000-0000-000000000004', teks: 'Dokumen perencanaan kaku yang tidak boleh diubah selama satu tahun penuh.', poin: 0, umpan_balik: 'Keliru. Itu ciri pendekatan waterfall yang kaku.', is_correct: false },
  { id: 'o1-C4-2', question_id: 'q1000005-0000-0000-0000-000000000004', teks: 'Iterasi cepat, responsif terhadap umpan balik pengguna, dan perbaikan berkelanjutan.', poin: 10, umpan_balik: 'Tepat! Agility mengutamakan kecepatan belajar dan adaptasi berbasis feedback.', is_correct: true },
  { id: 'o1-C4-3', question_id: 'q1000005-0000-0000-0000-000000000004', teks: 'Penambahan fitur sebanyak mungkin sebelum peluncuran perdana.', poin: 0, umpan_balik: 'Keliru. Itu feature bloat, bukan agility.', is_correct: false },
  { id: 'o1-C4-4', question_id: 'q1000005-0000-0000-0000-000000000004', teks: 'Pengurangan komunikasi antar tim agar masing-masing bekerja sendiri.', poin: 0, umpan_balik: 'Keliru. Agility justru membutuhkan kolaborasi erat.', is_correct: false },

  // Q5-C (q1000005-0000-0000-0000-000000000005)
  { id: 'o1-C5-1', question_id: 'q1000005-0000-0000-0000-000000000005', teks: 'Memetakan masalah pengguna secara terstruktur (target, konteks, akar masalah, dampak, dan celah solusi) sebelum merancang produk.', poin: 10, umpan_balik: 'Tepat! Problem Statement Canvas menyatukan pemahaman tim tentang anatomi masalah.', is_correct: true },
  { id: 'o1-C5-2', question_id: 'q1000005-0000-0000-0000-000000000005', teks: 'Menghitung proyeksi pendapatan bersih perusahaan dalam lima tahun ke depan.', poin: 0, umpan_balik: 'Keliru. Itu bagian dari proyeksi finansial/business plan.', is_correct: false },
  { id: 'o1-C5-3', question_id: 'q1000005-0000-0000-0000-000000000005', teks: 'Menentukan skema warna dan tipografi utama antarmuka aplikasi.', poin: 0, umpan_balik: 'Keliru. Itu bagian dari design system.', is_correct: false },
  { id: 'o1-C5-4', question_id: 'q1000005-0000-0000-0000-000000000005', teks: 'Menyusun jadwal pembagian tugas coding antar anggota tim.', poin: 0, umpan_balik: 'Keliru. Itu bagian dari sprint planning.', is_correct: false },

  // Q6-C (q1000005-0000-0000-0000-000000000006)
  { id: 'o1-C6-1', question_id: 'q1000005-0000-0000-0000-000000000006', teks: 'Tim perlu membuat 15 fitur tambahan lagi agar variasi aplikasi semakin lengkap.', poin: 0, umpan_balik: 'Keliru. Menambah fitur yang tidak dipakai hanya membuang sumber daya.', is_correct: false },
  { id: 'o1-C6-2', question_id: 'q1000005-0000-0000-0000-000000000006', teks: '14 fitur lainnya terbukti tidak memberikan nilai nyata bagi pengguna; tim harus fokus menyempurnakan 1 fitur inti yang paling menyelesaikan masalah.', poin: 10, umpan_balik: 'Tepat! Value-driven berfokus pada fitur inti yang benar-benar memberi nilai.', is_correct: true },
  { id: 'o1-C6-3', question_id: 'q1000005-0000-0000-0000-000000000006', teks: 'Pengguna tidak memahami cara memakai 14 fitur tersebut sehingga perlu dibuatkan buku panduan tebal.', poin: 0, umpan_balik: 'Keliru. Produk yang baik tidak membutuhkan panduan tebal untuk menjelaskan fitur yang tidak dibutuhkan.', is_correct: false },
  { id: 'o1-C6-4', question_id: 'q1000005-0000-0000-0000-000000000006', teks: 'Semua fitur harus tetap dipertahankan karena biaya pembuatannya sudah terlanjur keluar.', poin: 0, umpan_balik: 'Keliru. Itu adalah jebakan sunk cost fallacy.', is_correct: false },

  // Q7-C (q1000005-0000-0000-0000-000000000007)
  { id: 'o1-C7-1', question_id: 'q1000005-0000-0000-0000-000000000007', teks: 'Saat tim ingin memilih warna logo yang paling disukai oleh pendiri startup.', poin: 0, umpan_balik: 'Keliru. 5 Whys bukan untuk preferensi visual subjektif.', is_correct: false },
  { id: 'o1-C7-2', question_id: 'q1000005-0000-0000-0000-000000000007', teks: 'Saat tim menemukan keluhan pengguna dan ingin menelusuri penyebab mendasar di balik gejala tersebut.', poin: 10, umpan_balik: 'Tepat! 5 Whys digunakan untuk menggali dari gejala permukaan menuju akar masalah.', is_correct: true },
  { id: 'o1-C7-3', question_id: 'q1000005-0000-0000-0000-000000000007', teks: 'Saat tim ingin menghitung total kebutuhan server untuk satu juta pengguna.', poin: 0, umpan_balik: 'Keliru. Itu adalah capacity planning teknis.', is_correct: false },
  { id: 'o1-C7-4', question_id: 'q1000005-0000-0000-0000-000000000007', teks: 'Saat tim ingin membandingkan harga langganan tiga penyedia layanan cloud.', poin: 0, umpan_balik: 'Keliru. Itu adalah perbandingan vendor.', is_correct: false },

  // Q8-C (q1000005-0000-0000-0000-000000000008)
  { id: 'o1-C8-1', question_id: 'q1000005-0000-0000-0000-000000000008', teks: 'Karena segmen yang spesifik memiliki masalah yang seragam sehingga lebih mudah divalidasi dan diselesaikan secara mendalam.', poin: 10, umpan_balik: 'Tepat! Niche yang spesifik memudahkan validasi tajam dan membangun basis pengguna loyal awal.', is_correct: true },
  { id: 'o1-C8-2', question_id: 'q1000005-0000-0000-0000-000000000008', teks: 'Karena aplikasi versi awal tidak mampu menampung lebih dari 100 pengguna.', poin: 0, umpan_balik: 'Keliru. Alasannya adalah fokus validasi kebutuhan, bukan keterbatasan kapasitas.', is_correct: false },
  { id: 'o1-C8-3', question_id: 'q1000005-0000-0000-0000-000000000008', teks: 'Karena investor melarang startup memiliki banyak pengguna pada tahun pertama.', poin: 0, umpan_balik: 'Keliru. Tidak ada larangan seperti itu.', is_correct: false },
  { id: 'o1-C8-4', question_id: 'q1000005-0000-0000-0000-000000000008', teks: 'Karena segmen sempit tidak memerlukan proses riset pengguna sama sekali.', poin: 0, umpan_balik: 'Keliru. Riset pengguna tetap wajib dilakukan.', is_correct: false },

  // Q9-C (q1000005-0000-0000-0000-000000000009)
  { id: 'o1-C9-1', question_id: 'q1000005-0000-0000-0000-000000000009', teks: 'Karena wawancara selalu membutuhkan biaya yang lebih murah daripada membuat formulir online.', poin: 0, umpan_balik: 'Keliru. Keunggulannya bukan pada biaya formulir, melainkan kedalaman insight.', is_correct: false },
  { id: 'o1-C9-2', question_id: 'q1000005-0000-0000-0000-000000000009', teks: 'Karena wawancara memungkinkan peneliti menggali alasan emosional, konteks nyata, dan tindak lanjut (follow-up) yang tidak tertangkap di pilihan ganda survei.', poin: 10, umpan_balik: 'Tepat! Wawancara menggali "mengapa" di balik perilaku pengguna secara mendalam.', is_correct: true },
  { id: 'o1-C9-3', question_id: 'q1000005-0000-0000-0000-000000000009', teks: 'Karena survei kuesioner tidak dapat diisi menggunakan perangkat ponsel.', poin: 0, umpan_balik: 'Keliru. Survei online mudah diakses di ponsel.', is_correct: false },
  { id: 'o1-C9-4', question_id: 'q1000005-0000-0000-0000-000000000009', teks: 'Karena wawancara otomatis menghasilkan data statistik untuk 10.000 responden.', poin: 0, umpan_balik: 'Keliru. Data statistik skala besar adalah fungsi riset kuantitatif.', is_correct: false },

  // Q10-C (q1000005-0000-0000-0000-000000000010)
  { id: 'o1-C10-1', question_id: 'q1000005-0000-0000-0000-000000000010', teks: 'Tim berisiko membangun solusi yang hanya menutupi gejala permukaan sehingga masalah utama terus berulang dan produk ditinggalkan.', poin: 10, umpan_balik: 'Tepat! Tanpa root cause analysis, solusi tidak menyentuh sumber masalah sebenarnya.', is_correct: true },
  { id: 'o1-C10-2', question_id: 'q1000005-0000-0000-0000-000000000010', teks: 'Kode program aplikasi tidak akan bisa dikompilasi di server produksi.', poin: 0, umpan_balik: 'Keliru. Ini masalah relevansi produk, bukan error kompilasi.', is_correct: false },
  { id: 'o1-C10-3', question_id: 'q1000005-0000-0000-0000-000000000010', teks: 'Ukuran file desain di Figma menjadi terlalu besar untuk dibuka.', poin: 0, umpan_balik: 'Keliru. Tidak berkaitan dengan ukuran file desain.', is_correct: false },
  { id: 'o1-C10-4', question_id: 'q1000005-0000-0000-0000-000000000010', teks: 'Tim kehilangan hak untuk mendaftarkan nama domain website.', poin: 0, umpan_balik: 'Keliru. Tidak berhubungan dengan pendaftaran domain.', is_correct: false }
];

export const modul1SetCRubrics = [
  {
    id: 'er-0000001-0000-0000-0000-000000000011',
    question_id: 'q1000006-0000-0000-0000-000000000001',
    kunci_jawaban: 'Product-Market Fit adalah kondisi ketika produk terbukti memenuhi kebutuhan pasar yang kuat, ditandai dengan tingginya retensi dan pertumbuhan organik. Ini penting karena menjadi syarat mutlak sebelum startup melakukan ekspansi skala besar.',
    kata_kunci: ['product-market fit', 'kebutuhan pasar', 'retensi', 'pertumbuhan', 'ekspansi', 'validasi'],
    rubrik_skor: { '10': '>=80% kata kunci', '9': 'Konsep inti benar kurang 1 unsur', '8': '60% benar', '7': 'Ide umum', '0': 'Tidak relevan' },
    created_at: now()
  },
  {
    id: 'er-0000001-0000-0000-0000-000000000012',
    question_id: 'q1000006-0000-0000-0000-000000000002',
    kunci_jawaban: 'The Gap memetakan kelemahan atau celah dari solusi alternatif yang saat ini dipakai pengguna. Dengan memahami celah tersebut, tim dapat menciptakan nilai pembeda (diferensiasi) yang membuat pengguna bersedia beralih ke produk baru.',
    kata_kunci: ['gap', 'celah', 'kelemahan solusi', 'diferensiasi', 'alternatif', 'beralih'],
    rubrik_skor: { '10': '>=80% kata kunci', '9': 'Konsep inti benar kurang 1 unsur', '8': '60% benar', '7': 'Ide umum', '0': 'Tidak relevan' },
    created_at: now()
  },
  {
    id: 'er-0000001-0000-0000-0000-000000000013',
    question_id: 'q1000006-0000-0000-0000-000000000003',
    kunci_jawaban: 'Iterasi adalah siklus perbaikan produk secara bertahap dan berulang berdasarkan umpan balik pengguna. Iterasi cepat lebih baik karena meminimalkan risiko membuang waktu dan biaya pada asumsi yang keliru.',
    kata_kunci: ['iterasi', 'perbaikan', 'berulang', 'umpan balik', 'risiko', 'cepat'],
    rubrik_skor: { '10': '>=80% kata kunci', '9': 'Konsep inti benar kurang 1 unsur', '8': '60% benar', '7': 'Ide umum', '0': 'Tidak relevan' },
    created_at: now()
  },
  {
    id: 'er-0000001-0000-0000-0000-000000000014',
    question_id: 'q1000006-0000-0000-0000-000000000004',
    kunci_jawaban: 'Dua cara konkret memvalidasi masalah: (1) Wawancara mendalam (user interview) tanpa pertanyaan mengarahkan kepada target pengguna, dan (2) Observasi langsung perilaku pengguna saat menghadapi hambatan tersebut.',
    kata_kunci: ['wawancara', 'interview', 'observasi', 'perilaku', 'pengguna', 'validasi'],
    rubrik_skor: { '10': '>=80% kata kunci', '9': 'Konsep inti benar kurang 1 unsur', '8': '60% benar', '7': 'Ide umum', '0': 'Tidak relevan' },
    created_at: now()
  },
  {
    id: 'er-0000001-0000-0000-0000-000000000015',
    question_id: 'q1000006-0000-0000-0000-000000000005',
    kunci_jawaban: 'Premature Scaling adalah tindakan memperbesar skala bisnis, tim, atau biaya pemasaran secara agresif sebelum mencapai Problem-Solution Fit. Dampaknya adalah pemborosan kas secara cepat karena pengguna baru langsung pergi akibat produk belum relevan.',
    kata_kunci: ['premature scaling', 'ekspansi', 'problem-solution fit', 'kas', 'retensi', 'pemborosan'],
    rubrik_skor: { '10': '>=80% kata kunci', '9': 'Konsep inti benar kurang 1 unsur', '8': '60% benar', '7': 'Ide umum', '0': 'Tidak relevan' },
    created_at: now()
  }
];