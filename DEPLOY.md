# 📤 Panduan Lengkap Deploy Game ke GitHub Pages

## ✅ Persiapan

### 1. Install Dependencies (jika belum)
```bash
npm install
```

### 2. Install gh-pages (untuk deploy otomatis)
```bash
npm install --save-dev gh-pages
```

## 🚀 Langkah-langkah Deploy

### Langkah 1: Buat Repository di GitHub

1. Buka [GitHub.com](https://github.com) dan login
2. Klik tombol **"+"** di kanan atas → **"New repository"**
3. Isi nama repository (contoh: `game-angkringan`)
4. Pilih **Public** (agar bisa diakses gratis)
5. **JANGAN** centang "Initialize with README" (karena sudah ada file)
6. Klik **"Create repository"**

### Langkah 2: Inisialisasi Git (jika belum)

Buka terminal di folder project dan jalankan:

```bash
# Inisialisasi git (jika belum)
git init

# Tambahkan semua file
git add .

# Commit pertama
git commit -m "Initial commit: Game Angkringan"

# Hubungkan ke repository GitHub (GANTI USERNAME dan REPO-NAME)
git remote add origin https://github.com/USERNAME/REPO-NAME.git

# Push ke GitHub
git branch -M main
git push -u origin main
```

**Contoh:**
```bash
git remote add origin https://github.com/johndoe/game-angkringan.git
```

### Langkah 3: Build Aplikasi

```bash
npm run build
```

File build akan ada di folder `dist/`

### Langkah 4: Deploy ke GitHub Pages

```bash
npm run deploy
```

Perintah ini akan:
1. Build aplikasi
2. Membuat branch `gh-pages` 
3. Push file build ke branch `gh-pages`

### Langkah 5: Aktifkan GitHub Pages

1. Buka repository di GitHub
2. Klik **Settings** (di menu atas)
3. Scroll ke bagian **Pages** (di sidebar kiri)
4. Di bagian **Source**, pilih:
   - Branch: **gh-pages**
   - Folder: **/ (root)**
5. Klik **Save**

### Langkah 6: Tunggu dan Akses

- Tunggu 1-2 menit untuk GitHub memproses
- Game akan tersedia di: `https://USERNAME.github.io/REPO-NAME/`

**Contoh:**
```
https://johndoe.github.io/game-angkringan/
```

## 🔄 Update Game (Setelah Perubahan)

Setelah melakukan perubahan kode:

```bash
# Commit perubahan
git add .
git commit -m "Update game features"

# Push ke main branch
git push origin main

# Deploy ulang
npm run deploy
```

## 🗑️ Hapus Data Leaderboard

Untuk menghapus semua data leaderboard:
1. Buka game di browser
2. Di halaman Start Screen, cari tombol **🗑️** di sebelah "🏆 Leaderboard"
3. Klik tombol tersebut
4. Konfirmasi penghapusan

**Atau** hapus manual melalui browser console:
```javascript
localStorage.removeItem('angkringan_leaderboard')
```

## ⚠️ Troubleshooting

### Error: "gh-pages command not found"
```bash
npm install --save-dev gh-pages
```

### Error: "Repository not found"
- Pastikan URL repository benar
- Pastikan sudah login ke GitHub
- Cek apakah repository sudah dibuat

### Game tidak muncul setelah deploy
- Tunggu 2-3 menit (GitHub perlu waktu untuk memproses)
- Refresh halaman dengan Ctrl+F5 (hard refresh)
- Cek apakah branch `gh-pages` sudah dibuat di GitHub

### Path assets tidak ditemukan
- Pastikan `vite.config.js` sudah menggunakan `base: './'`
- Pastikan file `.nojekyll` ada di root folder

### Leaderboard tidak muncul
- Leaderboard menggunakan localStorage browser
- Data akan berbeda per browser/device
- Untuk reset, gunakan tombol 🗑️ atau hapus manual

## 📝 Catatan Penting

1. **File `.nojekyll`** sudah disertakan untuk memastikan GitHub Pages tidak menggunakan Jekyll
2. **Base path** sudah diatur ke `./` di `vite.config.js`
3. **Leaderboard** menggunakan localStorage, jadi data tersimpan per browser
4. Setiap deploy akan **menimpa** branch `gh-pages` dengan build terbaru

## 🎮 Link Game

Setelah deploy, bagikan link game Anda:
```
https://USERNAME.github.io/REPO-NAME/
```

**Selamat! Game Anda sudah online! 🎉**

