# Game Angkringan 🎮

Game web interaktif berbasis React.js dimana pemain harus menangkap makanan yang jatuh sambil menghindari batu. Game ini dibuat dengan React.js dan Vite.

## 🎯 Fitur Game

- **Karakter yang dapat dikontrol**: Gerakkan karakter kiri-kanan menggunakan keyboard (← → atau A D) atau geser jari di mobile/tablet
- **Makanan jatuh**: Tangkap makanan (ikan lele, tahu, tempe, ayam goreng) untuk mendapatkan 10 poin
- **Tantangan batu**: Hindari batu yang jatuh atau game over!
- **Tantangan manipulasi**: Pada poin 100, 200, dan 300, beberapa makanan akan berubah menjadi batu saat mendekati karakter
- **Leaderboard**: Simpan dan lihat 10 skor tertinggi
- **Efek suara**: Background music dan sound effects
- **Responsive**: Dapat dimainkan di desktop, tablet, dan mobile

## 🚀 Cara Memainkan

### Desktop
- Gunakan tombol **← →** atau **A D** untuk menggerakkan karakter
- Tangkap makanan untuk mendapatkan poin
- Hindari batu!

### Mobile/Tablet
- **Geser jari kiri/kanan** di area game untuk menggerakkan karakter
- Tangkap makanan untuk mendapatkan poin
- Hindari batu!

## 📦 Instalasi untuk Development

1. Clone repository ini:
```bash
git clone <url-repository-anda>
cd Game
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan development server:
```bash
npm run dev
```

4. Buka browser di `http://localhost:5173`

## 🏗️ Build untuk Production

```bash
npm run build
```

File build akan berada di folder `dist/`

## 📤 Cara Publish ke GitHub Pages

### Langkah 1: Siapkan Repository GitHub

1. Buat repository baru di GitHub (jika belum ada)
2. Inisialisasi git di folder project (jika belum):
```bash
git init
git add .
git commit -m "Initial commit"
```

3. Hubungkan ke repository GitHub:
```bash
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git branch -M main
git push -u origin main
```

**Ganti `USERNAME` dengan username GitHub Anda dan `REPO-NAME` dengan nama repository Anda**

### Langkah 2: Install GitHub Pages Plugin

Install plugin untuk deploy otomatis ke GitHub Pages:

```bash
npm install --save-dev gh-pages
```

### Langkah 3: Update package.json

Tambahkan script deploy di `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### Langkah 4: Build dan Deploy

1. Build aplikasi:
```bash
npm run build
```

2. Deploy ke GitHub Pages:
```bash
npm run deploy
```

Atau gunakan satu command:
```bash
npm run deploy
```

### Langkah 5: Aktifkan GitHub Pages

1. Buka repository di GitHub
2. Pergi ke **Settings** → **Pages**
3. Di bagian **Source**, pilih **gh-pages** branch
4. Klik **Save**

### Langkah 6: Akses Game

Setelah beberapa menit, game akan tersedia di:
```
https://USERNAME.github.io/REPO-NAME/
```

**Ganti `USERNAME` dan `REPO-NAME` dengan informasi repository Anda**

## 🔄 Update Game

Setelah melakukan perubahan, deploy ulang dengan:

```bash
npm run deploy
```

## 📝 Catatan Penting

- File `.nojekyll` sudah disertakan untuk memastikan GitHub Pages tidak menggunakan Jekyll
- Base path sudah diatur ke `./` di `vite.config.js` untuk kompatibilitas GitHub Pages
- Leaderboard menggunakan localStorage browser, jadi data akan tersimpan per browser
- Untuk menghapus semua data leaderboard, klik tombol 🗑️ di leaderboard

## 🛠️ Teknologi yang Digunakan

- **React.js** - Framework UI
- **Vite** - Build tool dan dev server
- **CSS3** - Styling dengan responsive design
- **HTML5 Audio** - Sound effects dan background music

## 📄 Lisensi

Game ini dibuat untuk tujuan edukasi dan hiburan.

## 👨‍💻 Kontribusi

Silakan buat issue atau pull request jika ingin berkontribusi!

---

**Selamat Bermain! 🎮✨**

