# 🔧 Solusi Error 404 dan Deploy

## ❌ Masalah

Anda sedang di branch `gh-pages` yang hanya berisi **file build**, bukan source code. File `package.json` ada di branch `main`.

## ✅ Solusi

### Langkah 1: Kembali ke Branch Main

```bash
git checkout main
```

### Langkah 2: Pastikan Semua File Ada

Setelah kembali ke `main`, pastikan file-file ini ada:
- ✅ `package.json`
- ✅ `vite.config.js`
- ✅ `src/` (folder)
- ✅ `public/` (folder)
- ✅ `.nojekyll`

### Langkah 3: Install Dependencies (jika perlu)

```bash
npm install
```

### Langkah 4: Build dan Deploy

```bash
npm run deploy
```

Atau manual:

```bash
# Build
npm run build

# Pastikan .nojekyll ada
Copy-Item .nojekyll dist\.nojekyll -Force

# Deploy ke gh-pages
npx gh-pages -d dist
```

## 📝 Penjelasan Branch

- **Branch `main`**: Berisi source code (package.json, src/, dll)
- **Branch `gh-pages`**: Berisi file build saja (index.html, assets/, img/, sound/)

**Jangan build di branch `gh-pages`!** Build harus dilakukan di branch `main`, lalu deploy ke `gh-pages`.

## 🚀 Langkah Lengkap Deploy

```bash
# 1. Pastikan di branch main
git checkout main

# 2. Install dependencies (jika belum)
npm install

# 3. Deploy (akan build otomatis)
npm run deploy
```

## 🔍 Verifikasi

Setelah deploy:

1. **Cek branch gh-pages di GitHub:**
   - Buka repository
   - Klik dropdown "main" → pilih "gh-pages"
   - Harus ada: `index.html`, `assets/`, `img/`, `sound/`, `.nojekyll`

2. **Cek GitHub Pages Settings:**
   - Settings → Pages
   - Source: `gh-pages`
   - Folder: `/ (root)`

3. **Tunggu 2-3 menit** lalu refresh browser

## ⚠️ Jika File package.json Tidak Ada

Jika setelah `git checkout main` file masih tidak ada, mungkin file terhapus. Buat ulang:

```bash
# Kembali ke main
git checkout main

# Cek apakah file ada
ls package.json

# Jika tidak ada, pull dari GitHub
git pull origin main
```

Atau restore dari commit sebelumnya:
```bash
git checkout main
git checkout HEAD -- package.json
```


