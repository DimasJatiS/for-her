# Supabase Setup (For Vercel Deploy)

Project ini sudah pakai `@supabase/supabase-js` dan helper di `lib/supabase.ts`.
Data quiz akan disimpan ke table `responses`.

## 1) Buat Project Supabase

1. Buka https://supabase.com/dashboard
2. **New project**
3. Pilih organisasi, isi nama project, password DB, region
4. Tunggu provisioning selesai

## 2) Ambil API Keys (untuk Next.js)

Supabase Dashboard → **Project Settings** → **API**
- `Project URL` → isi ke `NEXT_PUBLIC_SUPABASE_URL`
- `anon public key` → isi ke `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Buat file env lokal:

```bash
# dari folder project
copy .env.example .env.local
```

Lalu isi `.env.local`.

## 3) Buat Table + RLS Policy

Supabase Dashboard → **SQL Editor** → New query, lalu jalankan:

```sql
-- Table untuk menyimpan jawaban quiz
create table if not exists public.responses (
  id uuid primary key default gen_random_uuid(),
  question_id int not null,
  question text not null,
  answer text not null,
  created_at timestamptz not null default now()
);

-- Pastikan extension tersedia (gen_random_uuid)
create extension if not exists pgcrypto;

alter table public.responses enable row level security;

-- Policy: izinkan insert dari client anon (tanpa login)
create policy if not exists "responses_insert_anon"
on public.responses
for insert
to anon
with check (true);

-- Policy: izinkan read (optional). Jika kamu tidak mau data bisa dibaca publik,
-- hapus/disable policy ini dan juga jangan panggil getQuizResponses() dari client.
create policy if not exists "responses_select_anon"
on public.responses
for select
to anon
using (true);
```

Catatan:
- Karena app kamu pakai `NEXT_PUBLIC_*` key, semua akses data akan lewat **RLS**.
- Kalau mau lebih private: jangan kasih `select` policy, atau pakai server-side route dengan `service_role` (lebih advanced).

## 4) Test Local

```bash
npm install
npm run dev
```

Coba jawab quiz di `/quiz`, lalu cek table `responses` di Supabase → **Table Editor**.
