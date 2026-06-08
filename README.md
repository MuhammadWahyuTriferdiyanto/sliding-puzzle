# 🧩 Sliding Puzzle

Game puzzle klasik berbasis web yang dibuat dengan HTML, CSS, dan JavaScript murni — tanpa library, tanpa framework.

![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## 🎮 Demo

> 🚀 [Mainkan sekarang](https://USERNAME.github.io/sliding-puzzle)

---

## ✨ Fitur

- 🔢 **3 tingkat kesulitan** — grid 3×3, 4×4, dan 5×5
- ⏱️ **Timer & hitungan gerakan** — pantau performa setiap sesi
- 🏆 **Waktu terbaik** — tercatat otomatis per ukuran puzzle
- 🟢 **Highlight tile benar** — tile yang sudah di posisi tepat langsung berwarna hijau
- 💡 **Highlight tile bisa digeser** — memudahkan pemain pemula
- 🎲 **Algoritma shuffle aman** — dijamin selalu bisa diselesaikan
- 📱 **Responsif** — nyaman dimainkan di desktop maupun mobile

---

## 🛠️ Teknologi

| Teknologi | Kegunaan |
|-----------|----------|
| HTML5 | Struktur halaman |
| CSS3 | Tampilan & animasi |
| JavaScript (Vanilla) | Logika game |
| Google Fonts | Tipografi (Space Mono + DM Sans) |

---

## 🚀 Cara Menjalankan

```bash
# 1. Clone repo ini
git clone https://github.com/USERNAME/sliding-puzzle.git

# 2. Masuk ke folder
cd sliding-puzzle

# 3. Buka index.html di browser
#    (atau gunakan Live Server di VS Code)
```

Tidak perlu install apapun. Langsung buka `index.html` di browser!

---

## 📁 Struktur Project

```
sliding-puzzle/
├── index.html   # Struktur halaman
├── style.css    # Tampilan & tema
└── game.js      # Logika game (berisi komentar penjelasan)
```

---

## 🧠 Cara Kerja

Puzzle direpresentasikan sebagai **array 1 dimensi**. Kotak kosong ditandai dengan nilai `0`.

```
Contoh grid 3×3:
[ 1, 2, 3 ]      tiles = [1, 2, 3, 4, 5, 6, 7, 8, 0]
[ 4, 5, 6 ]      emptyIdx = 8
[ 7, 8, _ ]
```

Tile hanya bisa digeser jika **bersebelahan langsung** (atas/bawah/kiri/kanan) dengan kotak kosong. Pengacakan dilakukan dengan **500 gerakan random** dari posisi selesai — sehingga hasil acak **selalu bisa diselesaikan**.

---

## 📜 Lisensi

MIT License — bebas digunakan dan dimodifikasi.

---

<p align="center">Dibuat dengan ❤️ menggunakan HTML, CSS & JavaScript</p>
