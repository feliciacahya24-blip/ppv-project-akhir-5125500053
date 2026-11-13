# Changelog

Semua perubahan penting pada TaskSplit dicatat di sini.
Format mengikuti [Keep a Changelog](https://keepachangelog.com/id-ID/1.1.0/).

## [0.4.0] - 2026-11-13
### Added
- `src/storage.js`: penyimpanan localStorage dengan kunci berversi `tasksplit:v1`. `muat()` tidak pernah melempar galat dan menyaring data rusak, `simpan()` memakai try/catch dengan cadangan di memori, `pesanStatus()` memberi teks peringatan.
- `src/komponen.js`: komponen `Avatar`, `ChipAnggota`, `ItemTugas`, `GrupAnggota`, `KartuKosong`, dan `PesanSamar`.
- Anggota dan tugas tersimpan dan kembali setelah halaman dimuat ulang.
- Tulisan peringatan `#status-penyimpanan` di header saat data rusak atau penyimpanan tidak tersedia.
### Changed
- `src/ui.js` membuat tampilan lewat komponen, `replaceChildren`, dan `new Option`; tidak ada lagi `innerHTML` untuk teks pengguna.
- `src/state.js` memuat data awal dari storage dan menyimpan setiap perubahan; warna anggota dihitung dari id dan tidak disimpan.
### Removed
- Fungsi `amankan()` di `state.js` karena sudah tidak dipakai.
### Fixed
- TaskSplit tidak lagi mati saat isi localStorage rusak; data tidak sah disaring (tugas tanpa anggota ikut dibuang).

## [0.3.0] - 2026-11-05-0.3.0
### Changed
- `script.js` dipecah menjadi 4 modul ES di `src/`: `main.js`, `state.js`, `ui.js`, `ui-pustaka.js`.
- Tidak ada variabel global aplikasi dan tidak ada atribut `onclick`.
### Added
- `MODULE_MAP.md` (peta modul dan tanggung jawabnya).

## [0.2.0] - 202-0.2.0
### Fixed
- BUG-01: nama tombol menu terbaca dobel oleh pembaca layar (ikon dihias `aria-hidden`).
- BUG-02: nama anggota panjang melebar keluar kartu di halaman Hasil.
### Changed
- Folder `aset/` menjadi `assets/` dengan nama berkas seragam.
### Added
- `assets/manifest.json` dan `docs/DEBUG_LOG.md`.

## [0.1.0] - 2026-12-11-0.1.0
### Added
- Basis proyek: prototipe terpadu TaskSplit dengan 3 tampilan (Anggota, Bagi Tugas, Hasil) dan pustaka UI Bootstrap 5.3.3 (nav pills, card, toast), disinkronkan dari Tugas P09.