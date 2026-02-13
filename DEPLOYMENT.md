# Deploy to Vercel (GitHub Recommended)

## Prerequisites

- Node.js LTS terpasang
- Akun GitHub
- Akun Vercel
- Supabase sudah diset (lihat `SUPABASE_SETUP.md`)

## 1) Pastikan build lokal aman

```bash
npm install
npm run build
```

## 2) Inisialisasi Git dan commit

Dari root project:

```bash
git init
git add -A
git commit -m "Initial commit"

git branch -M main
```

## 3A) Buat repo GitHub via GitHub CLI (opsional, paling cepat)

Kalau kamu punya `gh`:

```bash
gh auth login
gh repo create for-her --private --source . --remote origin --push
```

## 3B) Kalau tanpa GitHub CLI

1. Buat repo baru di GitHub (misal: `for-her`)
2. Ambil URL repo (HTTPS atau SSH)
3. Jalankan:

```bash
git remote add origin https://github.com/<username>/for-her.git
git push -u origin main
```

## 4) Deploy di Vercel (via GitHub integration)

1. Buka https://vercel.com/new
2. Import repo GitHub kamu
3. Framework: Next.js (auto-detect)
4. Tambahkan Environment Variables (Project → Settings → Environment Variables):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Set untuk **Production** (dan optional Preview).

5. Deploy

## 5) Deploy via Vercel CLI (opsional)

Kalau mau pakai command line:

```bash
npm i -g vercel
vercel login
vercel
```

Tambahkan env (interactive):

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

vercel --prod
```

## Notes

- Jangan commit `.env.local` (sudah di-ignore oleh `.gitignore`).
- Kalau kamu ubah env di Vercel setelah deploy, lakukan redeploy agar kebaca di build.
