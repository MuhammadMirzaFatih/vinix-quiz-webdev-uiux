-- ==============================================================================
-- VINIX7 INTERACTIVE MINI-COURSE & ASSESSMENT PLATFORM
-- DATABASE SCHEMA DEFINITION (PostgreSQL / Supabase Compatible)
-- Based on PRD Section 11: Kesepakatan Model Data & Kontrak API (Back-End)
-- 9 Tabel Utama + ENUM Types + Indexes + RLS Policies
-- ==============================================================================

-- Enable UUID extension (diperlukan untuk Supabase / PostgreSQL)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- SECTION 1: ENUM TYPES
-- ==============================================================================

-- Status modul dalam sistem Progressive Gating
CREATE TYPE course_status_enum AS ENUM ('locked', 'unlocked', 'passed');

-- Tipe soal ujian
CREATE TYPE question_type_enum AS ENUM ('pilihan_ganda', 'essay');

-- Paket soal yang dirotasi per percobaan
CREATE TYPE set_paket_enum AS ENUM ('A', 'B', 'C');

-- Label evaluasi jawaban peserta
CREATE TYPE answer_label_enum AS ENUM ('Tepat', 'Kurang Tepat', 'Salah');

-- ==============================================================================
-- TABLE 1: USERS
-- Menyimpan akun peserta magang
-- ==============================================================================
CREATE TABLE IF NOT EXISTS users (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama            VARCHAR(150) NOT NULL,
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,                      -- bcrypt hash
    avatar_url      TEXT,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE users IS 'Akun peserta magang VINIX7. Email harus unik.';
COMMENT ON COLUMN users.password_hash IS 'Password di-hash menggunakan bcrypt (salt rounds = 10). JANGAN simpan plain-text.';

-- ==============================================================================
-- TABLE 2: COURSES
-- 10 Modul Kurikulum Magang (urutan 1 s/d 10)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS courses (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    urutan              INT UNIQUE NOT NULL CHECK (urutan BETWEEN 1 AND 10),
    judul               VARCHAR(255) NOT NULL,
    ringkasan           TEXT NOT NULL,
    kategori            VARCHAR(100) DEFAULT 'Web Educational Technology',
    estimasi_waktu      VARCHAR(50) DEFAULT '45 Menit',
    level               VARCHAR(50) DEFAULT 'Fondasi',           -- Fondasi / Intermediate / Advanced
    icon                VARCHAR(100),                            -- Nama ikon Lucide React
    referensi_eksternal TEXT,                                    -- Referensi buku / framework
    pdf_url             TEXT,                                    -- Link Google Drive preview / CDN
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE courses IS '10 Modul kurikulum berjenjang. Urutan 1-10 bersifat unik dan tidak dapat diubah.';

-- ==============================================================================
-- TABLE 3: SECTIONS
-- Bagian materi dalam setiap modul (Bagian 1, 2, Referensi Tambahan)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS sections (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id   UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    urutan      INT NOT NULL CHECK (urutan BETWEEN 1 AND 3),    -- 1=Bagian 1, 2=Bagian 2, 3=Referensi
    judul       VARCHAR(255) NOT NULL,
    isi         TEXT NOT NULL,                                   -- Konten materi (Markdown)
    pdf_url     TEXT,                                           -- Link slide per bagian (opsional)
    pdf_title   VARCHAR(255),                                   -- Judul slide PDF
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_course_section_urutan UNIQUE (course_id, urutan)
);

COMMENT ON TABLE sections IS 'Konten materi per bagian dalam setiap modul. Cascade delete mengikuti course.';
COMMENT ON COLUMN sections.isi IS 'Konten materi dalam format Markdown, dirender di front-end.';

-- ==============================================================================
-- TABLE 4: QUESTIONS
-- Bank soal ujian (10 PG + 5 Essay = 15 soal per Set, 3 Set = 45 soal/modul)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS questions (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id   UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    set_paket   set_paket_enum NOT NULL,                        -- 'A', 'B', atau 'C'
    topik       VARCHAR(150) NOT NULL,                          -- Label topik untuk analisis weak topics
    tipe        question_type_enum NOT NULL,                    -- 'pilihan_ganda' atau 'essay'
    teks        TEXT NOT NULL,                                  -- Teks soal lengkap
    urutan      INT NOT NULL CHECK (urutan BETWEEN 1 AND 15),   -- 1-10 PG, 11-15 Essay
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE questions IS 'Bank soal ujian: 10 PG (urutan 1-10) + 5 Essay (urutan 11-15) per Set A/B/C per modul.';
COMMENT ON COLUMN questions.set_paket IS 'Rotasi set soal: Percobaan 1=A, 2=B, 3=C, 4+=acak.';
COMMENT ON COLUMN questions.topik IS 'Label topik untuk analisis Weak Topics pasca-ujian (jika <70% topik tersebut terjawab benar).';

-- ==============================================================================
-- TABLE 5: OPTIONS
-- Opsi pilihan ganda (4 opsi per soal PG: 1 benar + 3 pengecoh)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS options (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    teks        TEXT NOT NULL,                                  -- Teks opsi jawaban
    poin        INT NOT NULL DEFAULT 0 CHECK (poin IN (0, 10)), -- 10 = benar, 0 = pengecoh
    umpan_balik TEXT,                                           -- Pembahasan jika opsi ini dipilih
    is_correct  BOOLEAN GENERATED ALWAYS AS (poin = 10) STORED  -- Kolom virtual; otomatis dari poin
);

COMMENT ON TABLE options IS 'Opsi jawaban PG. 1 opsi bernilai 10 poin (benar), 3 opsi bernilai 0 poin (pengecoh).';
COMMENT ON COLUMN options.is_correct IS 'Kolom virtual (generated). True jika poin=10. JANGAN dikirim ke client!';
COMMENT ON COLUMN options.poin IS 'WAJIB RLS: Kolom poin TIDAK BOLEH diakses oleh role anon/publik.';

-- ==============================================================================
-- TABLE 6: ESSAY_RUBRICS
-- Kunci jawaban dan rubrik penilaian essay
-- ⚠️ WAJIB DIJAGA KETAT: Hanya backend (service_role) yang boleh membaca!
-- ==============================================================================
CREATE TABLE IF NOT EXISTS essay_rubrics (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id     UUID UNIQUE NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    kunci_jawaban   TEXT NOT NULL,                              -- Jawaban ideal (skor maksimal)
    kata_kunci      TEXT[] NOT NULL,                           -- Array kata kunci wajib
    rubrik_skor     JSONB NOT NULL,                            -- { "10": "...", "8": "...", "0": "..." }
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE essay_rubrics IS '⚠️ RAHASIA SERVER: Kunci jawaban essay. Hanya service_role yang boleh membaca. NEVER expose ke client.';
COMMENT ON COLUMN essay_rubrics.kata_kunci IS 'Array kata kunci; penilaian otomatis via keyword matching + normalisasi teks.';
COMMENT ON COLUMN essay_rubrics.rubrik_skor IS 'JSON rubrik: 10=Tepat (>=2 kata kunci match), 8=Kurang Tepat (1 match), 0=Salah.';

-- ==============================================================================
-- TABLE 7: ATTEMPTS
-- Riwayat sesi percobaan ujian akhir setiap peserta
-- ==============================================================================
CREATE TABLE IF NOT EXISTS attempts (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id           UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    attempt_number      INT NOT NULL CHECK (attempt_number >= 1),  -- Percobaan ke-1, 2, 3, dst
    set_paket           set_paket_enum NOT NULL,                   -- A, B, atau C
    mulai               TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    selesai             TIMESTAMP WITH TIME ZONE,                  -- NULL jika belum selesai
    total_poin_pg       NUMERIC(5,2) DEFAULT 0,                    -- Maks 100
    total_poin_essay    NUMERIC(5,2) DEFAULT 0,                    -- Maks 50
    nilai               NUMERIC(5,2) DEFAULT 0,                    -- [0.6*(PG/100) + 0.4*(Essay/50)] * 100
    lulus               BOOLEAN DEFAULT FALSE,                     -- TRUE jika nilai >= 80
    cooldown_until      TIMESTAMP WITH TIME ZONE                   -- NOW() + 60 detik jika nilai < 80
);

COMMENT ON TABLE attempts IS 'Riwayat sesi ujian. Cooldown 1 menit aktif jika nilai < 80. KKM = 80.';
COMMENT ON COLUMN attempts.nilai IS 'Formula: [0.60 × (Total_PG/100) + 0.40 × (Total_Essay/50)] × 100. Dibulatkan 2 desimal.';
COMMENT ON COLUMN attempts.cooldown_until IS 'Timestamp batas cooldown. Backend wajib cek cooldown_until > NOW() sebelum start exam baru.';

-- ==============================================================================
-- TABLE 8: ANSWERS
-- Jawaban spesifik peserta per butir soal dalam sebuah attempt
-- ==============================================================================
CREATE TABLE IF NOT EXISTS answers (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id          UUID NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
    question_id         UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    jawaban             TEXT NOT NULL,                          -- ID opsi (PG) atau teks jawaban (Essay)
    poin                NUMERIC(4,2) NOT NULL DEFAULT 0,        -- 10/0 untuk PG; 10/8/0 untuk Essay
    label               answer_label_enum NOT NULL,             -- 'Tepat', 'Kurang Tepat', 'Salah'
    catatan_evaluasi    TEXT,                                   -- Penjelasan evaluasi otomatis
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_attempt_question UNIQUE (attempt_id, question_id)
);

COMMENT ON TABLE answers IS 'Jawaban peserta per soal dalam satu sesi ujian. Poin essay: 10 (Tepat) / 8 (Kurang Tepat) / 0 (Salah).';

-- ==============================================================================
-- TABLE 9: PROGRESS
-- Status Progressive Gating setiap peserta per modul
-- ==============================================================================
CREATE TABLE IF NOT EXISTS progress (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id       UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    bagian_selesai  INT[] DEFAULT '{}',                         -- Array urutan section selesai, e.g. {1,2,3}
    nilai_terbaik   NUMERIC(5,2) DEFAULT 0,                    -- Nilai tertinggi dari semua attempt
    status          course_status_enum NOT NULL DEFAULT 'locked', -- locked → unlocked → passed
    unlocked_at     TIMESTAMP WITH TIME ZONE,                  -- Kapan modul ini di-unlock
    passed_at       TIMESTAMP WITH TIME ZONE,                  -- Kapan modul ini di-pass
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_course UNIQUE (user_id, course_id)
);

COMMENT ON TABLE progress IS 'Status Progressive Gating: Modul 1 default unlocked, Modul N+1 unlock otomatis setelah nilai >= 80.';
COMMENT ON COLUMN progress.bagian_selesai IS 'Array integer urutan bagian yang sudah selesai dibaca. Dikirim ke client sebagai bagianSelesai.';

-- ==============================================================================
-- SECTION 2: PERFORMANCE INDEXES
-- ==============================================================================

CREATE INDEX IF NOT EXISTS idx_sections_course_urutan     ON sections(course_id, urutan);
CREATE INDEX IF NOT EXISTS idx_questions_course_set       ON questions(course_id, set_paket);
CREATE INDEX IF NOT EXISTS idx_questions_tipe             ON questions(tipe);
CREATE INDEX IF NOT EXISTS idx_options_question           ON options(question_id);
CREATE INDEX IF NOT EXISTS idx_options_correct            ON options(question_id) WHERE is_correct = TRUE;
CREATE INDEX IF NOT EXISTS idx_essay_rubrics_question     ON essay_rubrics(question_id);
CREATE INDEX IF NOT EXISTS idx_attempts_user_course       ON attempts(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_attempts_cooldown          ON attempts(cooldown_until) WHERE cooldown_until IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_answers_attempt            ON answers(attempt_id);
CREATE INDEX IF NOT EXISTS idx_answers_question           ON answers(question_id);
CREATE INDEX IF NOT EXISTS idx_progress_user              ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_user_course       ON progress(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_progress_status            ON progress(status);

-- ==============================================================================
-- SECTION 3: ROW LEVEL SECURITY (RLS) POLICIES
-- Supabase menggunakan auth.uid() untuk identifikasi user aktif
-- ==============================================================================

-- Aktifkan RLS pada tabel sensitif
ALTER TABLE users           ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress        ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempts        ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers         ENABLE ROW LEVEL SECURITY;
ALTER TABLE essay_rubrics   ENABLE ROW LEVEL SECURITY;
ALTER TABLE options         ENABLE ROW LEVEL SECURITY;

-- ── USERS: hanya bisa baca/update data sendiri ─────────────────────────────
CREATE POLICY "users_own_data"
    ON users FOR ALL
    USING (auth.uid() = id);

-- ── PROGRESS: hanya bisa baca/update progress sendiri ─────────────────────
CREATE POLICY "progress_own_data"
    ON progress FOR ALL
    USING (auth.uid() = user_id);

-- ── ATTEMPTS: hanya bisa baca attempt sendiri ─────────────────────────────
CREATE POLICY "attempts_own_data"
    ON attempts FOR SELECT
    USING (auth.uid() = user_id);

-- Backend (service_role) bisa INSERT dan UPDATE
CREATE POLICY "attempts_backend_write"
    ON attempts FOR ALL
    TO service_role
    USING (true);

-- ── ANSWERS: hanya bisa baca jawaban attempt sendiri ─────────────────────
CREATE POLICY "answers_own_data"
    ON answers FOR SELECT
    USING (
        attempt_id IN (
            SELECT id FROM attempts WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "answers_backend_write"
    ON answers FOR ALL
    TO service_role
    USING (true);

-- ── OPTIONS: semua user bisa baca TEKS opsi, tapi BUKAN poin/is_correct ──
-- Implementasi: buat view khusus tanpa kolom sensitif
CREATE POLICY "options_public_read"
    ON options FOR SELECT
    USING (true);
-- ⚠️ PENTING: Gunakan VIEW atau kolom-level security agar poin & is_correct
--             tidak bisa diakses langsung oleh role anon/authenticated.

-- ── ESSAY_RUBRICS: ⚠️ WAJIB TERTUTUP TOTAL dari client ──────────────────
-- HANYA service_role (backend) yang boleh membaca
CREATE POLICY "essay_rubrics_backend_only"
    ON essay_rubrics FOR ALL
    TO service_role
    USING (true);

-- Blokir semua akses dari role anon dan authenticated
CREATE POLICY "essay_rubrics_deny_client"
    ON essay_rubrics FOR SELECT
    TO anon, authenticated
    USING (false);

-- ── COURSES & SECTIONS: dapat dibaca semua user terautentikasi ───────────
-- (Tidak perlu RLS ketat karena ini data publik kurikulum)

-- ==============================================================================
-- SECTION 4: HELPER VIEW (Opsional)
-- View untuk mengirim opsi PG ke client TANPA kolom poin dan is_correct
-- ==============================================================================

CREATE OR REPLACE VIEW options_client_safe AS
    SELECT id, question_id, teks
    FROM options;

COMMENT ON VIEW options_client_safe IS 'View aman untuk dikirim ke client: hanya id, question_id, teks (tanpa poin/is_correct).';
