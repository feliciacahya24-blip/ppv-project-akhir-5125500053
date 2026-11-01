# TaskSplit

Aplikasi web untuk membagi tugas kelompok secara adil dan rapi. Pengguna menambah anggota, membuat tugas beserta deadline, memilih penanggung jawab, lalu melihat hasil pembagian per anggota.

Project Akhir mata kuliah Praktikum Pemrograman Visual (TB033109).

## Cara menjalankan
1. Clone repositori ini.
2. Buka folder di VS Code lalu klik Go Live (ekstensi Live Server), atau buka `index.html` di peramban.
3. Butuh internet karena Bootstrap 5.3.3 dan Google Fonts dimuat dari CDN.

## Struktur
- `index.html`, `style.css`, `script.js`, `ui-pustaka.js`: aplikasi
- `assets/`: bunyi, ikon, dan `manifest.json` (daftar aset)
- `docs/DEBUG_LOG.md`: catatan debugging Sprint 2
- `ROADMAP.md`: rencana dan status sprint

## Sprint 2 (Tugas P10)
- BUG-01: nama tombol menu terbaca dobel oleh pembaca layar (cabang `fix/ikon-menu`)
- BUG-02: nama anggota panjang melebar keluar kartu di halaman Hasil (cabang `fix/nama-panjang`)
- Aset: folder `aset/` menjadi `assets/`, nama berkas huruf kecil-tanda-hubung, `manifest.json` dibuat

## Aset
- Semua berkas di `assets/` terdaftar di `assets/manifest.json` beserta sumber dan lisensinya.
- Ikon tab (Anggota, Bagi Tugas, Hasil) ditempel sebagai SVG inline di `index.html`.
- Bootstrap 5.3.3 (CDN jsDelivr) dan Google Fonts dimuat dari CDN, bukan berkas proyek.

## Catatan Penggunaan AI
- Langkah debugging, template DEBUG_LOG, script pembuat manifest.json, dan perintah Git dibantu Claude (Anthropic).
- Prompt: "tolong kasih step by step dari 0 soal Bagian Proyek Akhir Tugas P10 Detektif Bug, pakai web TaskSplit"
- Penemuan bug dan pengujian dilakukan sendiri di peramban.