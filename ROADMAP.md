# ROADMAP - TaskSplit

## Sprint 1 - Prototipe dan Pustaka UI (selesai)
- [x] Prototipe terpadu 3 tampilan: Anggota, Bagi Tugas, Hasil (Tugas 4)
- [x] Pasang Bootstrap 5.3.3 lewat ui-pustaka.js: nav pills, card, toast (P09)

## Sprint 2 - Debug, Aset, dan Git (selesai)
- [x] BUG-01 ikon menu: cabang fix/ikon-menu, dicatat di docs/DEBUG_LOG.md
- [x] BUG-02 nama panjang: cabang fix/nama-panjang, dicatat di docs/DEBUG_LOG.md
- [x] Aset: aset/ menjadi assets/, nama berkas seragam, manifest.json dibuat
- [x] Network tanpa 404

## Sprint 3 - Modularisasi dengan ES Modules (selesai)
- [x] Cabang refactor/modul, satu commit refactor: per langkah, lalu digabung ke main
- [x] script.js dipecah menjadi 4 modul ES di src/ (main, state, ui, ui-pustaka)
- [x] Tanpa variabel global aplikasi dan tanpa onclick
- [x] Alur MVP sebelum dan sesudah refactor: perilaku sama
- [x] MODULE_MAP.md dibuat

## Sprint 4 - Komponen, Penyimpanan Aman, dan Perawatan (selesai)
- [x] src/komponen.js: 6 komponen reusable, teks pengguna lewat textContent
- [x] src/storage.js: kunci berversi tasksplit:v1, muat() dan simpan() tidak pernah melempar galat
- [x] Anggota dan tugas tersimpan dan kembali setelah dimuat ulang
- [x] Uji data rusak (S2) dan penyimpanan penuh (S6): aplikasi tetap jalan dan pengguna diberi tahu
- [x] README lengkap, CHANGELOG.md, dan tag v0.1.0 sampai v0.4.0

## Tertunda
- Fitur bunyi dan validasi form belum dimodulkan: lihat MODULE_MAP.md.
- Edit anggota dan tugas, serta ekspor hasil, belum ada.
- Belum ada migrasi data antarversi kunci (saat ini hanya `tasksplit:v1`).