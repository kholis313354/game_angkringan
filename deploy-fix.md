# 🔧 Fix Deploy GitHub Pages - Halaman Putih

## Masalah
Halaman putih setelah deploy biasanya karena:
1. File `.nojekyll` tidak ada di branch `gh-pages`
2. Branch `gh-pages` belum dibuat atau kosong
3. GitHub Pages belum diaktifkan dengan benar

## ✅ Solusi Step-by-Step

### Langkah 1: Pastikan gh-pages sudah terinstall
```bash
npm install --save-dev gh-pages
```

### Langkah 2: Pastikan file .nojekyll ada di dist
```bash
# File .nojekyll harus ada di folder dist sebelum deploy
Copy-Item .nojekyll dist\.nojekyll
```

### Langkah 3: Build dan Deploy
```bash
# Build aplikasi
npm run build

# Pastikan .nojekyll ada di dist
Copy-Item .nojekyll dist\.nojekyll -Force

# Deploy ke GitHub Pages
npm run deploy
```

### Langkah 4: Verifikasi di GitHub
1. Buka repository di GitHub
2. Klik **Settings** → **Pages**
3. Pastikan:
   - Source: **Deploy from a branch**
   - Branch: **gh-pages**
   - Folder: **/ (root)**
4. Klik **Save**

### Langkah 5: Cek Branch gh-pages
1. Di repository GitHub, klik dropdown **"main"** (di atas file list)
2. Pilih branch **"gh-pages"**
3. Pastikan ada file:
   - `index.html`
   - `assets/` (folder)
   - `img/` (folder)
   - `sound/` (folder)
   - `.nojekyll` (file penting!)

### Langkah 6: Tunggu dan Refresh
- Tunggu 2-3 menit untuk GitHub memproses
- Hard refresh browser: **Ctrl + F5** atau **Ctrl + Shift + R**
- Cek URL: `https://kholis313354.github.io/game_angkringan/`

## 🚨 Jika Masih Putih

### Opsi 1: Deploy Manual
Jika `npm run deploy` tidak bekerja, deploy manual:

```bash
# Build
npm run build

# Copy .nojekyll
Copy-Item .nojekyll dist\.nojekyll -Force

# Buat branch gh-pages (jika belum)
git checkout --orphan gh-pages
git rm -rf .

# Copy semua file dari dist
Copy-Item dist\* . -Recurse -Force

# Commit dan push
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages --force

# Kembali ke main
git checkout main
```

### Opsi 2: Cek Browser Console
1. Buka halaman game
2. Tekan **F12** untuk buka Developer Tools
3. Lihat tab **Console** untuk error
4. Lihat tab **Network** untuk file yang gagal load

### Opsi 3: Verifikasi Path
Pastikan semua path menggunakan `/game_angkringan/`:
- ✅ `/game_angkringan/assets/...`
- ✅ `/game_angkringan/img/...`
- ✅ `/game_angkringan/sound/...`

## 📝 Checklist Deploy

- [ ] `gh-pages` sudah terinstall (`npm install --save-dev gh-pages`)
- [ ] Build berhasil (`npm run build`)
- [ ] File `.nojekyll` ada di `dist/`
- [ ] Deploy berhasil (`npm run deploy`)
- [ ] Branch `gh-pages` ada di GitHub
- [ ] File `.nojekyll` ada di branch `gh-pages`
- [ ] GitHub Pages aktif (Settings → Pages)
- [ ] Source branch: `gh-pages`
- [ ] Folder: `/ (root)`
- [ ] Tunggu 2-3 menit
- [ ] Hard refresh browser (Ctrl + F5)

## 🔍 Debug

Cek apakah file ada di branch gh-pages:
```bash
git checkout gh-pages
ls -la
# Harus ada: index.html, assets/, img/, sound/, .nojekyll
git checkout main
```

Jika file tidak ada, deploy ulang:
```bash
npm run deploy
```

