# MODULE_MAP - TaskSplit

Peta modul ES di folder `src/`. Titik masuk: `src/main.js`, dimuat lewat `<script type="module">` di `index.html`.

## Peta import (satu arah, tanpa melingkar)

```mermaid
graph TD
  main[main.js] --> state[state.js]
  main --> ui[ui.js]
  main --> pustaka[ui-pustaka.js]
  ui --> state
  ui --> storage[storage.js]
  ui --> komponen[komponen.js]
  komponen --> state
  state --> storage
```

Versi teks:
```
main.js       -> state.js, ui.js, ui-pustaka.js
ui.js         -> state.js, storage.js, komponen.js
komponen.js   -> state.js (hanya hariIni dan formatTanggal)
state.js      -> storage.js
storage.js    -> (tidak mengimpor apa pun)
ui-pustaka.js -> (tidak mengimpor apa pun; memakai `bootstrap` dari skrip CDN)
```

## Tanggung jawab per modul
| Modul | Satu kalimat |
|---|---|
| `main.js` | Titik masuk yang memasang semua event, menjalankan validasi form, dan mengatur bunyi, lalu menghubungkan modul lain. |
| `state.js` | Menyimpan data aplikasi (anggota, tugas, penanda memuat) beserta fungsi mengubahnya dan memicu penyimpanan, tanpa menyentuh DOM. |
| `storage.js` | Membaca dan menulis localStorage (`tasksplit:v1`) dengan aman, menyaring data rusak, dan menyediakan teks peringatan. |
| `komponen.js` | Fungsi yang menerima data lewat parameter dan mengembalikan elemen (chip anggota, item tugas, grup, kartu kosong). |
| `ui.js` | Menyusun tampilan dari komponen, pindah tab, menampilkan atau menghapus pesan error, dan menjalankan animasinya. |
| `ui-pustaka.js` | Pembungkus Bootstrap Toast; satu-satunya berkas yang memanggil JavaScript Bootstrap. |

## Bagian yang belum dimodulkan
- Fitur bunyi (tombol Suara, `mainkanSuara`) masih di `main.js` karena kodenya kecil dan hanya dipakai di sana; dipisah ke modul sendiri bisa dilakukan di sprint berikutnya.
- Validasi form masih di dalam handler `submit` di `main.js`; memisahkannya berarti mengubah alur kode.
- Fungsi bantu `hariIni` dan `formatTanggal` masih berada di `state.js`, sehingga `komponen.js` mengimpor `state.js`; memindahkannya ke `util.js` akan membuat komponen sepenuhnya mandiri.
- Bootstrap dan Google Fonts tetap dimuat lewat tag `<script>` dan `<link>` di `index.html` karena berupa pustaka CDN, bukan kode aplikasi.