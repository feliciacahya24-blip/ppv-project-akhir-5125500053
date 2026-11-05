# Peta Modul TaskSplit (PPV Final Project - Sprint 3)

## Hubungan Import Modul
- `src/main.js` -> mengimpor `src/state.js`, `src/ui.js`, dan `src/ui-pustaka.js`
- `src/ui.js` -> mengimpor `src/state.js`
- `src/ui-pustaka.js` -> mengisolasi panggilan Toast Bootstrap
- `src/state.js` -> mengelola data utama aplikasi (bebas DOM)

## Pembagian Tanggung Jawab Modul

1. **`src/state.js`**
   - Menyimpan data state utama (`anggota`, `tugas`, `sedangMemuat`).
   - Menyediakan fungsi penambahan/penghapusan data dan helper tanggal.
   - **Bebas DOM** (tidak memanggil `document`, `window`, atau elemen UI).

2. **`src/ui.js`**
   - Mengurus render elemen HTML, animasi (`animate`, `getar`), perpindahan tab (`pindahTampilan`), dan kelas CSS error.

3. **`src/ui-pustaka.js`**
   - Mengisolasi pemanggilan pustaka eksternal (Bootstrap Toast).

4. **`src/main.js`**
   - Titik masuk aplikasi (`type="module"`).
   - Menghubungkan seluruh *event listener* (`submit`, `click`, `input`, `change`, `keydown`) dan feedback audio.