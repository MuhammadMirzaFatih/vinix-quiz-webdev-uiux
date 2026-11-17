-- ==============================================================================
-- VINIX7 INTERACTIVE MINI-COURSE & ASSESSMENT PLATFORM
-- DATABASE SCHEMA DEFINITION (PostgreSQL / Supabase Compatible)
-- Based on PRD Section 11: Kesepakatan Model Data & Kontrak API (Back-End)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUM TYPES
CREATE TYPE course_status_enum AS ENUM ('locked', 'unlocked', 'passed');
CREATE TYPE question_type_enum AS ENUM ('pilihan_ganda', 'essay');
CREATE TYPE set_paket_enum AS ENUM ('A', 'B', 'C');
CREATE TYPE answer_label_enum AS ENUM ('Tepat', 'Kurang Tepat', 'Salah');

-- 2. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. COURSES TABLE (10 Modul Berjenjang)
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    urutan INT UNIQUE NOT NULL, -- 1 s/d 10
    judul VARCHAR(255) NOT NULL,
    ringkasan TEXT NOT NULL,
    kategori VARCHAR(100) DEFAULT 'Web Educational Technology',
    estimasi_waktu VARCHAR(50) DEFAULT '45 Menit',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. SECTIONS TABLE (Bagian 1, Bagian 2, Referensi Tambahan per Modul)
CREATE TABLE IF NOT EXISTS sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    urutan INT NOT NULL, -- 1 (Bagian 1), 2 (Bagian 2), 3 (Referensi Tambahan)
    judul VARCHAR(255) NOT NULL,
    isi TEXT NOT NULL, -- Konten Markdown / HTML
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_course_section_urutan UNIQUE (course_id, urutan)
);

-- 5. QUESTIONS TABLE (45 Soal per Modul: 30 PG + 15 Essay)
CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    set_paket set_paket_enum NOT NULL, -- 'A', 'B', 'C'
    topik VARCHAR(150) NOT NULL, -- Label topik untuk analisis kelemahan pasca-ujian
    tipe question_type_enum NOT NULL, -- 'pilihan_ganda' atau 'essay'
    teks TEXT NOT NULL,
    urutan INT NOT NULL, -- Nomor soal dalam set/modul
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. OPTIONS TABLE (Khusus Pilihan Ganda - Pengecoh & Jawaban Benar)
CREATE TABLE IF NOT EXISTS options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    teks TEXT NOT NULL,
    poin INT NOT NULL DEFAULT 0, -- 10 untuk benar, 0 untuk pengecoh (3 opsi)
    umpan_balik TEXT, -- Pembahasan jika opsi ini dipilih
    is_correct BOOLEAN GENERATED ALWAYS AS (poin = 10) STORED
);

-- 7. ESSAY RUBRICS TABLE (Khusus Essay - Dikelola di Server, TIDAK DIKIRIM KE CLIENT)
CREATE TABLE IF NOT EXISTS essay_rubrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID UNIQUE NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    kunci_jawaban TEXT NOT NULL, -- Jawaban ideal (Skor 10)
    kata_kunci TEXT[] NOT NULL, -- Array kata kunci wajib untuk normalisasi teks
    rubrik_skor JSONB NOT NULL, -- { "10": "...", "9": "...", "8": "...", "7": "...", "0": "..." }
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. ATTEMPTS TABLE (Sesi Percobaan Ujian Akhir)
CREATE TABLE IF NOT EXISTS attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    attempt_number INT NOT NULL, -- Percobaan ke-1, 2, 3, dst
    set_paket set_paket_enum NOT NULL, -- A, B, atau C
    mulai TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    selesai TIMESTAMP WITH TIME ZONE,
    total_poin_pg NUMERIC(5,2) DEFAULT 0, -- Max 100
    total_poin_essay NUMERIC(5,2) DEFAULT 0, -- Max 50
    nilai NUMERIC(5,2) DEFAULT 0, -- Formula: (0.6 * PG/100 + 0.4 * Essay/50) * 100
    lulus BOOLEAN DEFAULT FALSE, -- True jika nilai >= 80
    cooldown_until TIMESTAMP WITH TIME ZONE -- Current + 1 menit jika nilai < 80
);

-- 9. ANSWERS TABLE (Jawaban Peserta per Soal dalam Attempt)
CREATE TABLE IF NOT EXISTS answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    jawaban TEXT NOT NULL, -- ID opsi untuk PG, atau string jawaban teks untuk Essay
    poin NUMERIC(4,2) NOT NULL DEFAULT 0, -- 10/0 untuk PG, 10/9/8/7/0 untuk Essay
    label answer_label_enum NOT NULL, -- 'Tepat', 'Kurang Tepat', 'Salah'
    catatan_evaluasi TEXT, -- Penjelasan evaluasi otomatis
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. PROGRESS TABLE (Status Progressive Gating Siswa)
CREATE TABLE IF NOT EXISTS progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    bagian_selesai INT[] DEFAULT '{}', -- Array urutan section yang selesai, e.g. {1, 2}
    nilai_terbaik NUMERIC(5,2) DEFAULT 0,
    status course_status_enum NOT NULL DEFAULT 'locked',
    unlocked_at TIMESTAMP WITH TIME ZONE,
    passed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_course UNIQUE (user_id, course_id)
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX idx_sections_course ON sections(course_id, urutan);
CREATE INDEX idx_questions_course_set ON questions(course_id, set_paket);
CREATE INDEX idx_options_question ON options(question_id);
CREATE INDEX idx_attempts_user_course ON attempts(user_id, course_id);
CREATE INDEX idx_answers_attempt ON answers(attempt_id);
CREATE INDEX idx_progress_user ON progress(user_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE essay_rubrics ENABLE ROW LEVEL SECURITY;

-- Users can only read/update their own data
CREATE POLICY "Users can manage own account" ON users
    FOR ALL USING (auth.uid() = id);

-- Users can only read/manage their own progress
CREATE POLICY "Users can view own progress" ON progress
    FOR ALL USING (auth.uid() = user_id);

-- Users can only view their own attempts
CREATE POLICY "Users can view own attempts" ON attempts
    FOR SELECT USING (auth.uid() = user_id);

-- CRITICAL SECURITY RULE: essay_rubrics can NEVER be read directly by client roles
-- Only service_role (Back-End) can read essay_rubrics
CREATE POLICY "Only backend can read essay rubrics" ON essay_rubrics
    FOR ALL TO service_role USING (true);
