// konsep.js — Konsep produk TaskSplit (Project Akhir PPV, NRP 5125500053)
const KONSEP = {
  nama: 'TaskSplit',
  tagline: 'Tahu siapa mengerjakan apa dan kapan tenggatnya, tanpa menelusuri grup obrolan.',
  persona: {
    nama: 'Tomashi, 21 tahun',
    siapa: 'Mahasiswa semester 5 yang hampir selalu ditunjuk menjadi ketua setiap tugas kelompok.',
    keseharian: 'Memegang beberapa tugas kelompok sekaligus, mengatur dan mengarahkan anggota, lalu mengecek perkembangan di sela jam kuliah yang waktunya tidak menentu.',
    masalah: 'Bingung membagi jobdesk antara dirinya dan anggota, terutama saat ada tenggat yang mepet.',
  },
  masalah: 'Ketua kelompok yang memegang banyak tugas sekaligus sunlit mengingat siapa mengerjakan apa dan kapan tenggatnya. Pembagian jobdesk yang tersebar di pesan membuat anggota lupa atau salah paham, sehingga hasil kerja tidak sesuai kesepakatan awal. Pada tugas bertenggat mepet, ketua harus menanyai anggota satu per satu dan waktunya habis untuk menelusuri pesan lama.',
  solusi: 'TaskSplit adalah halaman web yang mencatat jobdesk setiap anggota beserta tenggatnya dalam satu daftar. Ketua cukup memasukkan anggota dan tugas, lalu hasil pembagiannya langsung tampil per anggota. Data tersimpan otomatis sehingga bisa dibuka dan dicek kapan saja.',
  metrik: 'Membagi 5 tugas ke 4 anggota selesai dalam 5 menit atau kurang; status semua tugas terbaca dalam 10 detik setelah halaman dibuka.',
  fitur: [
    { nama: 'Kelola daftar anggota', prioritas: 'wajib', alasan: 'Tanpa daftar anggota, tugas tidak punya penanggung jawab. Status: v0.1.0.' },
    { nama: 'Input jobdesk dengan tenggat pengerjaannya', prioritas: 'wajib', alasan: 'Inti masalah persona: mencatat apa yang dikerjakan dan kapan batasnya. Status: V0.1.0.' },
    { nama: 'Pembagian tugas per anggota yang jelas', prioritas: 'wajib', alasan: 'Menjawab pertanyaan siapa mengerjakan apa dalam sekali lihat. Status: TAG_ISI.' },
    { nama: 'Auto save data', prioritas: 'wajib', alasan: 'Persona mengecek di waktu yang tidak pasti, jadi data tidak boleh hilang saat halaman ditutup. Status: V0.1.0.' },
    { nama: 'Daftar Pembagian Tugas sesuai materi pelajaran yang dapat diisi sendiri.', prioritas: 'sebaiknya', alasan: 'Membantu Pengguna untuk mencatat jobdesk tugas kelompok per-materi pelajaran.' },
    { nama: 'Login Akun Pengguna', prioritas: 'belum', alasan: 'Butuh server dan akun, sedangkan nilai utama produk sudah teruji tanpa itu.' },
    { nama: 'Notifikasi Pengingat Tenggat', prioritas: 'belum', alasan: 'Butuh izin notifikasi dan server; ditunda ke versi berikutnya.' },
  ],
  pembanding: [
    { nama: 'Trello', kelebihan: 'Papan kartu visual; tugas bisa diberi anggota dan tanggal jatuh tempo.', kekurangan: 'Semua anggota harus punya akun dan diundang; fiturnya lebih banyak dari kebutuhan membagi tugas sederhana.' },
    { nama: 'Notion', kelebihan: 'Sangat fleksibel; tabel tugas dan penanggung jawab bisa disusun sendiri.', kekurangan: 'Templat harus dirancang sendiri dan kurva belajarnya tinggi bagi ketua yang sedang dikejar tenggat.' },
  ],
  pembeda: 'Khusus untuk membagi tugas kelompok: tanpa akun dan tanpa undangan, ketua mencatat anggota, tugas, dan tenggat dalam satu halaman ringan yang bisa dibuka kapan saja.',
};
