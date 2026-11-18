/**
 * Auth Service
 * Layer akses data untuk operasi autentikasi (register, login)
 * Saat ini menggunakan in-memory store; mudah dimigrasi ke Supabase
 * dengan mengganti import dan query di bawah ini.
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { users, initUserProgress } from '../data/memoryStore.js';

const getJwtSecret = () => process.env.JWT_SECRET || 'supersecret_vinix7';
const getJwtExpiresIn = () => process.env.JWT_EXPIRES_IN || '7d';

function generateToken(user) {
  return jwt.sign(
    { id: user.id, nama: user.nama, email: user.email },
    getJwtSecret(),
    { expiresIn: getJwtExpiresIn() }
  );
}

export async function registerUser(nama, email, password) {
  // Cek duplikasi email
  const existing = users.find(u => u.email === email.toLowerCase().trim());
  if (existing) {
    const err = new Error('Email sudah terdaftar. Silakan gunakan email lain.');
    err.status = 409;
    throw err;
  }

  const password_hash = await bcrypt.hash(password, 10);
  const now = new Date().toISOString();

  const newUser = {
    id: uuidv4(),
    nama: nama.trim(),
    email: email.toLowerCase().trim(),
    password_hash,
    avatar_url: null,
    created_at: now,
    updated_at: now
  };

  users.push(newUser);

  // Inisialisasi progress 10 modul (Modul 1 unlocked, 2-10 locked)
  initUserProgress(newUser.id);

  const token = generateToken(newUser);
  return {
    token,
    user: { id: newUser.id, nama: newUser.nama, email: newUser.email, avatar_url: newUser.avatar_url }
  };
}

export async function loginUser(email, password) {
  const user = users.find(u => u.email === email.toLowerCase().trim());
  if (!user) {
    const err = new Error('Email atau password salah.');
    err.status = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    const err = new Error('Email atau password salah.');
    err.status = 401;
    throw err;
  }

  const token = generateToken(user);
  return {
    token,
    user: { id: user.id, nama: user.nama, email: user.email, avatar_url: user.avatar_url }
  };
}
