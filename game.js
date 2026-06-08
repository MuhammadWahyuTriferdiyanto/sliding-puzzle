// ============================================================
//  SLIDING PUZZLE - game.js
//  Variabel utama
// ============================================================

let size = 4;          // ukuran grid (3, 4, atau 5)
let tiles = [];        // array isi tile [1,2,3,...,0]  (0 = kotak kosong)
let emptyIdx = 0;      // posisi kotak kosong di array
let moves = 0;         // hitungan gerakan
let seconds = 0;       // hitungan waktu (detik)
let timerInterval = null;
let gameStarted = false;
let gameSolved = false;
let bestTimes = {};    // simpan waktu terbaik per ukuran, contoh: { '4x4': 120 }

// ============================================================
//  INISIALISASI
// ============================================================

// Jalankan saat halaman pertama kali dibuka
window.addEventListener('DOMContentLoaded', () => {
  // Tombol pilih ukuran
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      size = parseInt(btn.dataset.size);
      newGame();
    });
  });

  // Tombol Acak dan Reset
  document.getElementById('btn-shuffle').addEventListener('click', newGame);
  document.getElementById('btn-reset').addEventListener('click', resetToSolved);

  // Mulai game pertama kali
  newGame();
});

// ============================================================
//  GAME UTAMA
// ============================================================

// Mulai game baru dengan puzzle teracak
function newGame() {
  stopTimer();
  moves = 0;
  seconds = 0;
  gameStarted = false;
  gameSolved = false;

  updateDisplay();
  document.getElementById('win-banner').classList.add('hidden');

  // Buat tiles terurut: [1, 2, 3, ..., size*size-1, 0]
  tiles = Array.from({ length: size * size }, (_, i) => i + 1);
  tiles[size * size - 1] = 0;
  emptyIdx = size * size - 1;

  // Acak dengan cara geser tile secara random (dijamin bisa diselesaikan)
  for (let i = 0; i < 600; i++) {
    const neighbors = getNeighbors(emptyIdx);
    const pick = neighbors[Math.floor(Math.random() * neighbors.length)];
    swapTiles(emptyIdx, pick);
    emptyIdx = pick;
  }

  renderBoard();
}

// Reset ke posisi selesai (untuk belajar atau lihat solusi)
function resetToSolved() {
  stopTimer();
  moves = 0;
  seconds = 0;
  gameStarted = false;
  gameSolved = false;

  document.getElementById('win-banner').classList.add('hidden');
  updateDisplay();

  tiles = Array.from({ length: size * size }, (_, i) => i + 1);
  tiles[size * size - 1] = 0;
  emptyIdx = size * size - 1;

  renderBoard();
}

// ============================================================
//  LOGIKA GERAK TILE
// ============================================================

// Klik tile → geser jika bersebelahan dengan kotak kosong
function handleTileClick(clickedIdx) {
  if (gameSolved) return;

  // Cek apakah tile yang diklik bersebelahan dengan kotak kosong
  const neighbors = getNeighbors(emptyIdx);
  if (!neighbors.includes(clickedIdx)) return;

  // Mulai timer saat tile pertama kali digeser
  if (!gameStarted) {
    gameStarted = true;
    startTimer();
  }

  // Tukar posisi tile dengan kotak kosong
  swapTiles(emptyIdx, clickedIdx);
  emptyIdx = clickedIdx;
  moves++;

  updateDisplay();
  renderBoard();
  checkWin();
}

// Dapatkan index tile yang bersebelahan (atas, bawah, kiri, kanan)
function getNeighbors(idx) {
  const row = Math.floor(idx / size);
  const col = idx % size;
  const neighbors = [];

  if (row > 0)      neighbors.push(idx - size); // atas
  if (row < size-1) neighbors.push(idx + size); // bawah
  if (col > 0)      neighbors.push(idx - 1);    // kiri
  if (col < size-1) neighbors.push(idx + 1);    // kanan

  return neighbors;
}

// Tukar dua tile dalam array
function swapTiles(a, b) {
  [tiles[a], tiles[b]] = [tiles[b], tiles[a]];
}

// ============================================================
//  CEK MENANG
// ============================================================

function checkWin() {
  // Menang jika setiap tile ada di posisi yang benar
  // Tile ke-i seharusnya bernilai i+1, kecuali tile terakhir = 0
  const isWin = tiles.every((val, idx) => {
    if (idx === size * size - 1) return val === 0;
    return val === idx + 1;
  });

  if (isWin) {
    gameSolved = true;
    stopTimer();

    // Simpan waktu terbaik
    const key = `${size}x${size}`;
    if (!bestTimes[key] || seconds < bestTimes[key]) {
      bestTimes[key] = seconds;
    }

    updateBest();
    document.getElementById('win-banner').classList.remove('hidden');
    renderBoard(); // render ulang agar semua tile hijau
  }
}

// ============================================================
//  RENDER PAPAN
// ============================================================

function renderBoard() {
  const board = document.getElementById('board');

  // Set jumlah kolom sesuai ukuran
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  // Tentukan ukuran font tile sesuai ukuran grid
  const fontSize = size === 3 ? '28px' : size === 4 ? '22px' : '16px';

  // Tile mana saja yang bisa digeser (bersebelahan dengan kotak kosong)
  const movable = getNeighbors(emptyIdx);

  board.innerHTML = '';

  tiles.forEach((val, idx) => {
    const tile = document.createElement('div');
    tile.className = 'tile';

    if (val === 0) {
      // Kotak kosong
      tile.classList.add('empty');
    } else {
      tile.textContent = val;
      tile.style.fontSize = fontSize;

      // Tile sudah di posisi benar → hijau
      if (val === idx + 1) {
        tile.classList.add('correct');
      }

      // Tile bisa digeser → highlight border
      if (movable.includes(idx)) {
        tile.classList.add('movable');
      }

      // Klik handler
      tile.addEventListener('click', () => handleTileClick(idx));
    }

    board.appendChild(tile);
  });
}

// ============================================================
//  TIMER
// ============================================================

function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    document.getElementById('timer').textContent = formatTime(seconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, '0')}`;
}

// ============================================================
//  UPDATE UI
// ============================================================

function updateDisplay() {
  document.getElementById('moves').textContent = moves;
  document.getElementById('timer').textContent = formatTime(seconds);
  updateBest();
}

function updateBest() {
  const key = `${size}x${size}`;
  if (bestTimes[key] !== undefined) {
    document.getElementById('best').textContent = formatTime(bestTimes[key]);
  } else {
    document.getElementById('best').textContent = '—';
  }
}
