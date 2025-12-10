# 🚀 Cara Deploy ke Branch gh-pages

## Langkah 1: Install Dependencies

Pastikan `gh-pages` sudah terinstall:

```bash
npm install
```

Atau install manual:
```bash
npm install --save-dev gh-pages
```

## Langkah 2: Deploy ke GitHub Pages

Jalankan command berikut:

```bash
npm run deploy
```

Command ini akan:
1. ✅ Build aplikasi (`npm run build`)
2. ✅ Copy file `.nojekyll` ke folder `dist`
3. ✅ Deploy semua file dari `dist/` ke branch `gh-pages` di GitHub

## Langkah 3: Verifikasi di GitHub

Setelah deploy selesai:

1. **Buka repository di GitHub:**
   ```
   https://github.com/kholis313354/game_angkringan
   ```

2. **Cek branch gh-pages:**
   - Klik dropdown **"main"** (di atas file list)
   - Pilih branch **"gh-pages"**
   - Pastikan ada file:
     - ✅ `index.html`
     - ✅ `assets/` (folder)
     - ✅ `img/` (folder)
     - ✅ `sound/` (folder)
     - ✅ `.nojekyll` (file penting!)

## Langkah 4: Aktifkan GitHub Pages

1. Di repository GitHub, klik **Settings**
2. Scroll ke bagian **Pages** (sidebar kiri)
3. Di bagian **Source**, pilih:
   - **Branch:** `gh-pages`
   - **Folder:** `/ (root)`
4. Klik **Save**

## Langkah 5: Tunggu dan Akses

- ⏳ Tunggu **2-3 menit** untuk GitHub memproses
- 🔄 Hard refresh browser: **Ctrl + F5** atau **Ctrl + Shift + R**
- 🌐 Akses game di:
  ```
  https://kholis313354.github.io/game_angkringan/
  ```

## 🔄 Update Game (Setelah Perubahan)

Setelah melakukan perubahan kode:

```bash
# 1. Commit perubahan ke main branch
git add .
git commit -m "Update game"
git push origin main

# 2. Deploy ulang
npm run deploy
```

## ⚠️ Troubleshooting

### Error: "gh-pages command not found"
```bash
npm install --save-dev gh-pages
```

### Error: "Repository not found"
Pastikan:
- Sudah login ke GitHub
- Repository sudah dibuat
- Remote origin sudah benar:
  ```bash
  git remote -v
  ```

### Halaman Masih Putih

1. **Cek branch gh-pages:**
   - Pastikan branch `gh-pages` ada
   - Pastikan file `.nojekyll` ada di branch tersebut

2. **Cek GitHub Pages Settings:**
   - Source: `gh-pages`
   - Folder: `/ (root)`

3. **Cek Browser Console (F12):**
   - Lihat error di tab **Console**
   - Lihat file yang gagal load di tab **Network**

4. **Deploy Ulang:**
   ```bash
   npm run deploy
   ```

### Deploy Manual (Jika npm run deploy Gagal)

```bash
# 1. Build aplikasi
npm run build

# 2. Pastikan .nojekyll ada
Copy-Item .nojekyll dist\.nojekyll -Force

# 3. Buat branch gh-pages (jika belum)
git checkout --orphan gh-pages
git rm -rf .

# 4. Copy semua file dari dist
Copy-Item dist\* . -Recurse -Force

# 5. Commit dan push
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages --force

# 6. Kembali ke main branch
git checkout main
```

## 📝 Checklist Deploy

Sebelum deploy, pastikan:
- [ ] `gh-pages` sudah terinstall
- [ ] Build berhasil (`npm run build`)
- [ ] File `.nojekyll` ada di `dist/`
- [ ] Repository GitHub sudah dibuat
- [ ] Remote origin sudah di-set

Setelah deploy:
- [ ] Deploy berhasil (`npm run deploy`)
- [ ] Branch `gh-pages` ada di GitHub
- [ ] File `.nojekyll` ada di branch `gh-pages`
- [ ] GitHub Pages aktif (Settings → Pages)
- [ ] Source branch: `gh-pages`
- [ ] Folder: `/ (root)`
- [ ] Tunggu 2-3 menit
- [ ] Hard refresh browser (Ctrl + F5)
- [ ] Game bisa diakses

## 🎯 Command Cepat

```bash
# Deploy sekali jalan
npm run deploy
```

Selesai! Game akan otomatis ter-deploy ke branch `gh-pages` dan bisa diakses di GitHub Pages.

