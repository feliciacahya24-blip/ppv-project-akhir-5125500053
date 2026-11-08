# TaskSplit

Aplikasi web untuk membagi tugas kelompok secara adil dan rapi. Pengguna menambah anggota, membuat tugas beserta deadline, memilih penanggung jawab, lalu melihat hasil pembagian per anggota.

Project Akhir mata kuliah Praktikum Pemrograman Visual (TB033109).

## Cara menjalankan
1. Clone repositori ini.
2. Buka folder di VS Code lalu klik Go Live (ekstensi Live Server). Jangan buka `index.html` dengan klik dua kali, karena ES Modules hanya bisa jalan lewat server lokal.
3. Butuh internet karena Bootstrap 5.3.3 dan Google Fonts dimuat dari CDN.

## Struktur
- `index.html`, `style.css`: halaman dan tampilan
- `src/`: modul ES (`main.js` titik masuk, `state.js`, `ui.js`, `ui-pustaka.js`), peta lengkap di `MODULE_MAP.md`
- `assets/`: bunyi, ikon, dan `manifest.json` (daftar aset)
- `docs/DEBUG_LOG.md`: catatan debugging Sprint 2
- `MODULE_MAP.md`: peta modul Sprint 3
- `ROADMAP.md`: rencana dan status sprint

## Sprint 2 (Tugas P10)
- BUG-01: nama tombol menu terbaca dobel oleh pembaca layar (cabang `fix/ikon-menu`)
- BUG-02: nama anggota panjang melebar keluar kartu di halaman Hasil (cabang `fix/nama-panjang`)
- Aset: folder `aset/` menjadi `assets/`, nama berkas huruf kecil-tanda-hubung, `manifest.json` dibuat

## Sprint 3 (Tugas P11)
- `script.js` dipecah menjadi 4 modul ES di `src/`
- Tidak ada variabel global aplikasi dan tidak ada atribut `onclick`
- Perilaku aplikasi sama seperti sebelum refactor (alur MVP diuji sebelum dan sesudah)

## Aset
- Semua berkas di `assets/` terdaftar di `assets/manifest.json` beserta sumber dan lisensinya.
- Ikon tab (Anggota, Bagi Tugas, Hasil) ditempel sebagai SVG inline di `index.html`.
- Bootstrap 5.3.3 (CDN jsDelivr) dan Google Fonts dimuat dari CDN, bukan berkas proyek.

## Catatan Penggunaan AI
- Sprint 2: langkah debugging, template DEBUG_LOG, script pembuat manifest.json, dan perintah Git dibantu Claude (Anthropic).
  Prompt: "tolong kasih step by step dari 0 soal Bagian Proyek Akhir Tugas P10 Detektif Bug, pakai web TaskSplit"
- Sprint 3: [Mengerjakan coding dengan bantuan Gemini AI dan Claude untuk melanjutkan step yang sebelumnya sudah dikerjakan].
  Prompt: "tolong kasih tau aku setelah step ini harus apa? jawab kalo udh bener"
- Pengujian alur MVP di peramban dilakukan sendiri.