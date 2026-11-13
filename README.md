# TaskSplit

Aplikasi web untuk membagi tugas kelompok secara adil dan rapi. Pengguna menambah anggota, membuat tugas beserta deadline, memilih penanggung jawab, lalu melihat hasil pembagian per anggota.

Project Akhir mata kuliah Praktikum Pemrograman Visual (TB033109).

## Cara menjalankan
1. Clone repositori ini.
2. Buka folder di VS Code lalu klik Go Live (ekstensi Live Server). Jangan buka `index.html` dengan klik dua kali, karena ES Modules hanya bisa jalan lewat server lokal.
3. Butuh internet karena Bootstrap 5.3.3 dan Google Fonts dimuat dari CDN.

## Fitur MVP dan statusnya
| Fitur | Status |
|---|---|
| Tambah anggota (nama tidak kosong, minimal 3 huruf, tidak kembar) | Selesai |
| Hapus anggota (ditolak selama anggota masih punya tugas) | Selesai |
| Buat tugas: nama, deadline, penanggung jawab, dengan validasi | Selesai |
| Hasil pembagian per anggota, diurutkan menurut deadline, bisa hapus tugas | Selesai |
| Data anggota dan tugas tersimpan di localStorage dan kembali setelah dimuat ulang | Selesai (Sprint 4) |
| Peringatan saat data tersimpan rusak atau penyimpanan tidak tersedia | Selesai (Sprint 4) |
| Toast, bunyi "ding", dan status memuat | Selesai |
| Edit anggota atau tugas, ekspor hasil | Belum ada |

## Struktur
- `index.html`, `style.css`: halaman dan tampilan
- `src/`: modul ES (`main.js` titik masuk, `state.js`, `storage.js`, `komponen.js`, `ui.js`, `ui-pustaka.js`), peta lengkap di `MODULE_MAP.md`
- `assets/`: bunyi, ikon, dan `manifest.json` (daftar aset)
- `docs/DEBUG_LOG.md`: catatan debugging Sprint 2
- `MODULE_MAP.md`, `ROADMAP.md`, `CHANGELOG.md`: peta modul, rencana sprint, dan riwayat versi

## Kontrak komponen (`src/komponen.js`)
Semua komponen berupa fungsi yang menerima data lewat parameter dan mengembalikan elemen DOM. Teks dari pengguna masuk lewat `textContent` atau node teks, tidak pernah lewat `innerHTML`.

| Komponen | Parameter | Mengembalikan | Dipakai di |
|---|---|---|---|
| `Avatar(anggota)` | `{ id, nama, warna }` | `span.avatar` (huruf pertama nama) | `ChipAnggota`, `GrupAnggota` |
| `ChipAnggota(anggota)` | `{ id, nama, warna }` | `span.chip` dengan tombol hapus (`data-id`) | daftar anggota, satu per anggota |
| `ItemTugas(tugas)` | `{ id, nama, deadline, anggotaId }` | `div.item-tugas` dengan tombol hapus (`data-id`) | `GrupAnggota`, satu per tugas |
| `GrupAnggota(anggota, daftarTugas)` | anggota dan tugas miliknya | `div.grup` | tab Hasil, satu per anggota |
| `KartuKosong({ judul, teks, label, tujuan })` | teks dan tab tujuan | `div.kosong` dengan tombol `data-pindah` | tab Hasil (belum ada anggota, belum ada tugas) |
| `PesanSamar(teks)` | teks | `p.samar` | daftar anggota kosong, grup tanpa tugas |

## Kontrak penyimpanan (`src/storage.js`)
- Kunci: `tasksplit:v1`. Kalau bentuk data berubah, naikkan versi kunci (misalnya `tasksplit:v2`).
- Bentuk data: `{ anggota: [{ id, nama }], tugas: [{ id, nama, deadline, anggotaId }] }`. Warna anggota dan status memuat tidak disimpan.
- `muat()` mengembalikan `{ anggota, tugas, idBerikut }` dan tidak pernah melempar galat. Data yang bukan JSON, bukan objek, atau salah format diabaikan dan aplikasi mulai dari kosong. Item yang tidak sah dibuang: anggota tanpa id atau nama, tugas tanpa nama, tanpa deadline berformat tanggal, atau yang anggotanya tidak ada. `idBerikut` dihitung ulang dari id terbesar.
- `simpan(data)` dibungkus try/catch dan mengembalikan `true` atau `false`. Salinan data juga disimpan di memori supaya aplikasi tetap jalan saat localStorage diblokir atau penuh.
- `pesanStatus()` mengembalikan teks peringatan untuk pengguna (tampil di header), atau teks kosong kalau semuanya normal.

## Pengujian ketangguhan (Sprint 4)
Dilakukan manual lewat DevTools. Bukti screenshot ada di laporan Tugas P12.

| Skenario | Cara | Hasil yang diharapkan |
|---|---|---|
| S2: data bukan JSON | Console: `localStorage.setItem('tasksplit:v1', '{rusak')` lalu muat ulang | Aplikasi terbuka dengan data kosong, pesan peringatan tampil, anggota baru bisa ditambah |
| S5: item rusak | Isi kunci dengan array yang memuat `null`, angka, dan satu anggota sah, lalu muat ulang | Hanya anggota sah yang tampil, pesan jumlah data dilewati |
| S6: penyimpanan penuh | Console: ganti `Storage.prototype.setItem` dengan fungsi yang melempar `QuotaExceededError`, lalu tambah anggota | Aplikasi tetap jalan, pesan "Perubahan tidak tersimpan" tampil |
| Teks berisi HTML | Tambah anggota bernama `<b>Ani</b>` | Tampil sebagai teks di chip, pilihan penanggung jawab, dan tab Hasil |

## Riwayat sprint
### Sprint 2 (Tugas P10)
- BUG-01: nama tombol menu terbaca dobel oleh pembaca layar (cabang `fix/ikon-menu`)
- BUG-02: nama anggota panjang melebar keluar kartu di halaman Hasil (cabang `fix/nama-panjang`)
- Aset: folder `aset/` menjadi `assets/`, nama berkas huruf kecil-tanda-hubung, `manifest.json` dibuat

### Sprint 3 (Tugas P11)
- `script.js` dipecah menjadi 4 modul ES di `src/`
- Tidak ada variabel global aplikasi dan tidak ada atribut `onclick`
- Perilaku aplikasi sama seperti sebelum refactor (alur MVP diuji sebelum dan sesudah)

### Sprint 4 (Tugas P12)
- `komponen.js`: 6 komponen reusable, tampilan tidak lagi dibuat dengan `innerHTML`
- `storage.js`: penyimpanan aman berkunci `tasksplit:v1`
- Anggota dan tugas tersimpan, data rusak tidak mematikan aplikasi

## Aset
- Semua berkas di `assets/` terdaftar di `assets/manifest.json` beserta sumber dan lisensinya.
- Ikon tab (Anggota, Bagi Tugas, Hasil) ditempel sebagai SVG inline di `index.html`.
- Bootstrap 5.3.3 (CDN jsDelivr) dan Google Fonts dimuat dari CDN, bukan berkas proyek.

## Catatan Penggunaan AI
- Sprint 2: langkah debugging, template DEBUG_LOG, script pembuat manifest.json, dan perintah Git dibantu Claude (Anthropic).
  Prompt: "tolong kasih step by step dari 0 soal Bagian Proyek Akhir Tugas P10 Detektif Bug, pakai web TaskSplit"
- Sprint 3: [Mengerjakan coding dengan bantuan Gemini AI dan Claude untuk melanjutkan step yang sebelumnya sudah dikerjakan].
  Prompt: "tolong kasih tau aku setelah step ini harus apa? jawab kalo udh bener"
- Sprint 4: kode `storage.js` dan `komponen.js`, perubahan `state.js`, `ui.js`, dan `index.html`, serta dokumen (README, CHANGELOG, ROADMAP, MODULE_MAP) dibantu Claude (Anthropic).
  Prompt: "oke sekarang kita lanjut ngerjain yang tasksplit tapi sebelum itu tolong jelasin aku harus ngerjain apa dan benerin apa terus disuruh apa"
- Pengujian alur MVP dan skenario data rusak di peramban dilakukan sendiri.