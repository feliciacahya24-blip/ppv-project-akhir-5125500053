# DEBUG LOG - TaskSplit (Sprint 2)

## BUG-01 - Nama tombol menu terbaca dobel oleh pembaca layar

- **Reproduksi:**
  1. Buka TaskSplit lewat Live Server.
  2. Klik kanan tombol "Anggota", pilih Inspect, lalu buka tab Accessibility.
  3. Name tertulis "Ikon anggota Anggota" (seharusnya "Anggota").
- **Hipotesis:**
  1. Ikon svg di dalam tombol memakai role="img" dan aria-label, sehingga ikut digabung ke nama tombol -> terbukti, karena panel Accessibility menunjukkan node image "Ikon anggota" di dalam button dan Name berisi dua bagian itu.
- **Bukti (alat DevTools):** Edge DevTools, tab Accessibility, Computed properties: Name "Ikon anggota Anggota".
- **Perbaikan:** `index.html:25, index.html:32, index.html:39` - mengganti `role="img" aria-label="..."` dengan `aria-hidden="true" focusable="false"` pada tiga `<svg class="ikon-tab">`. Ikon hanya hiasan, nama tombol sudah cukup dari teksnya (commit `74ef811`).
- **Uji ulang:** Langkah reproduksi diulang, Name sekarang "Anggota" dan ikon tetap tampil.

## BUG-02 - Nama anggota panjang melebar keluar kartu di halaman Hasil

- **Reproduksi:**
  1. Tambah anggota bernama 20 huruf W, lalu beri satu tugas.
  2. Buka tab Hasil, atur lebar layar 400 px lewat DevTools.
  3. Judul grup (nama anggota) keluar dari garis kartu (seharusnya terbungkus di dalam kartu).
- **Hipotesis:**
  1. Judul grup di dalam flex tidak punya min-width: 0 dan overflow-wrap, sehingga teks tanpa spasi tidak bisa terpotong -> terbukti, karena judul melewati kartu dan menghilang setelah dua properti itu ditambahkan.
- **Bukti (alat DevTools):** mode responsif 400 px dan tab Elements, kotak judul `<h3>` keluar dari kartu.
- **Perbaikan:** `style.css:172` - menambah `min-width: 0` dan `overflow-wrap: anywhere` pada `.grup-atas h3` (commit `e2fc373`).
- **Uji ulang:** langkah yang sama diulang, nama sekarang terbungkus di dalam kartu.