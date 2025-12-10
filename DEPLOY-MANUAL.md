# 🚀 Deploy Manual ke GitHub Pages

## Cara Deploy yang Benar

### Langkah 1: Pastikan di Branch Main
```bash
git checkout main
```

### Langkah 2: Build Aplikasi
```bash
npm run build
```

### Langkah 3: Copy .nojekyll ke dist
```bash
Copy-Item .nojekyll dist\.nojekyll -Force
```

### Langkah 4: Deploy ke gh-pages (Manual)

**Opsi A: Menggunakan gh-pages (jika berhasil)**
```bash
npx gh-pages -d dist
```

**Opsi B: Deploy Manual dengan Git**

```bash
# 1. Buat/checkout branch gh-pages
git checkout --orphan gh-pages

# 2. Hapus semua file (kecuali .git)
git rm -rf .

# 3. Copy semua file dari dist
Copy-Item dist\* . -Recurse -Force

# 4. Tambahkan semua file
git add .

# 5. Commit
git commit -m "Deploy to GitHub Pages"

# 6. Push ke GitHub
git push origin gh-pages --force

# 7. Kembali ke main
git checkout main
```

## ⚠️ PENTING!

- Branch `gh-pages` HANYA berisi file dari `dist/`
- JANGAN commit `node_modules/` ke `gh-pages`
- Pastikan file `.nojekyll` ada di branch `gh-pages`

## ✅ Verifikasi

Setelah deploy:
1. Buka GitHub → repository → branch `gh-pages`
2. Pastikan ada: `index.html`, `assets/`, `img/`, `sound/`, `.nojekyll`
3. Settings → Pages → Source: `gh-pages`
4. Tunggu 2-3 menit
5. Akses: `https://kholis313354.github.io/game_angkringan/`

