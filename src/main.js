// main.js — Entry Point & Event Listeners TaskSplit

import { state, hariIni, hitungTugas, tambahAnggota, hapusAnggota, tambahTugas, hapusTugas } from './state.js';
import { tampilkanToast } from './ui-pustaka.js';
import {
  pindahTampilan, tampilkanError, hapusError,
  tampilkanAnggota, tampilkanInfo, tampilkanHasil
} from './ui.js';

// DOM Elements
const formAnggota = document.getElementById('form-anggota');
const inputAnggota = document.getElementById('nama-anggota');
const errorAnggota = document.getElementById('error-anggota');
const daftarAnggota = document.getElementById('daftar-anggota');

const formTugas = document.getElementById('form-tugas');
const inputTugas = document.getElementById('nama-tugas');
const errorTugas = document.getElementById('error-tugas');
const inputDeadline = document.getElementById('deadline');
const errorDeadline = document.getElementById('error-deadline');
const pilihAnggota = document.getElementById('pilih-anggota');
const infoAnggota = document.getElementById('info-anggota');
const errorPilih = document.getElementById('error-pilih');
const tombolTugas = document.getElementById('tombol-tugas');

const hasil = document.getElementById('hasil');

const bunyiTing = document.getElementById('bunyi-ting');
const tombolSuara = document.getElementById('tombol-suara');
let suaraNyala = true;

function suaraTidakTersedia() {
  suaraNyala = false;
  if (tombolSuara) {
    tombolSuara.disabled = true;
    tombolSuara.textContent = 'Suara tidak tersedia';
  }
}

if (bunyiTing) {
  bunyiTing.addEventListener('error', suaraTidakTersedia);
  if (bunyiTing.error) suaraTidakTersedia();
}

function mainkanSuara() {
  if (!suaraNyala || !bunyiTing) return;
  bunyiTing.currentTime = 0;
  bunyiTing.play().catch(function (e) {
    if (e && e.name === 'NotSupportedError') suaraTidakTersedia();
  });
}

if (tombolSuara) {
  tombolSuara.addEventListener('click', function () {
    suaraNyala = !suaraNyala;
    tombolSuara.textContent = suaraNyala ? 'Suara: Nyala' : 'Suara: Mati';
    tombolSuara.setAttribute('aria-pressed', String(suaraNyala));
  });
}

// Inisialisasi Tampilan
if (inputDeadline) inputDeadline.min = hariIni();
tampilkanAnggota(daftarAnggota, pilihAnggota, infoAnggota);
tampilkanHasil(hasil);

// Event Delegation Navigasi Tab
document.addEventListener('click', function (event) {
  const pemicu = event.target.closest('[data-pindah]');
  if (!pemicu) return;
  pindahTampilan(pemicu.dataset.pindah);
});

// Event Form Anggota
formAnggota.addEventListener('submit', function (event) {
  event.preventDefault();
  const nama = inputAnggota.value.trim();

  if (nama === '') {
    tampilkanError(inputAnggota, errorAnggota, 'Nama anggota belum diisi. Silahkan isi nama anggota kalian.');
    return;
  }

  if (nama.length < 3) {
    tampilkanError(inputAnggota, errorAnggota, 'Nama panggilan terlalu pendek. Gunakan minimal 3 huruf.');
    return;
  }
  const sudahAda = state.anggota.some(a => a.nama.toLowerCase() === nama.toLowerCase());
  if (sudahAda) {
    tampilkanError(inputAnggota, errorAnggota, `${nama} sudah ada di kelompok. Pakai nama lain atau tambahkan inisial.`);
    return;
  }

  const anggotaBaru = tambahAnggota(nama);

  inputAnggota.value = '';
  hapusError(inputAnggota, errorAnggota);
  tampilkanAnggota(daftarAnggota, pilihAnggota, infoAnggota);
  tampilkanHasil(hasil);
  mainkanSuara();
  tampilkanToast(anggotaBaru.nama + ' ditambahkan ke kelompok.');
});

inputAnggota.addEventListener('input', function () {
  hapusError(inputAnggota, errorAnggota);
});

inputAnggota.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    inputAnggota.value = '';
    hapusError(inputAnggota, errorAnggota);
  }
});

daftarAnggota.addEventListener('click', function (event) {
  if (!event.target.classList.contains('hapus-anggota')) return;
  if (state.sedangMemuat) return;

  const id = Number(event.target.dataset.id);
  const a = state.anggota.find(x => x.id === id);
  const jumlah = hitungTugas(id);

  if (jumlah > 0) {
    tampilkanError(inputAnggota, errorAnggota, `${a.nama} masih punya ${jumlah} tugas. Hapus tugasnya dulu di halaman Hasil sebelum menghapus anggota.`);
    return;
  }

  hapusAnggota(id);
  hapusError(inputAnggota, errorAnggota);
  tampilkanAnggota(daftarAnggota, pilihAnggota, infoAnggota);
  tampilkanHasil(hasil);
});

// Event Form Tugas
inputTugas.addEventListener('input', function () {
  hapusError(inputTugas, errorTugas);
});

inputTugas.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    inputTugas.value = '';
    hapusError(inputTugas, errorTugas);
  }
});

pilihAnggota.addEventListener('change', function () {
  hapusError(pilihAnggota, errorPilih);
  tampilkanInfo(pilihAnggota, infoAnggota);
});

inputDeadline.addEventListener('change', function () {
  hapusError(inputDeadline, errorDeadline);
});

formTugas.addEventListener('submit', function (event) {
  event.preventDefault();
  if (state.sedangMemuat) return;

  const nama = inputTugas.value.trim();
  const deadline = inputDeadline.value;
  const idAnggota = pilihAnggota.value;
  let adaError = false;

  if (nama === '') {
    tampilkanError(inputTugas, errorTugas, 'Nama tugas tidak terisi. Contoh: Melakukan riset materi.');
    adaError = true;
  } else if (nama.length < 3) {
    tampilkanError(inputTugas, errorTugas, 'Nama tugas terlalu pendek. Gunakan minimal 3 huruf.');
    adaError = true;
  } else if (state.tugas.some(t => t.nama.toLowerCase() === nama.toLowerCase())) {
    tampilkanError(inputTugas, errorTugas, 'Tugas ini sudah ada yang mengerjakan! Pakai sebutan yang berbeda.');
    adaError = true;
  }

  if (deadline === '') {
    tampilkanError(inputDeadline, errorDeadline, 'Pilih deadline-nya dulu, agar tidak terlambat!.');
    adaError = true;
  } else if (deadline < hariIni()) {
    tampilkanError(inputDeadline, errorDeadline, 'Deadline sudah terlewat. Pilih tanggal yang sesuai lagi, yuk!');
    adaError = true;
  }

  if (state.anggota.length === 0) {
    tampilkanError(pilihAnggota, errorPilih, 'Belum ada anggota. Tambahkan anggota dulu di halaman Anggota.');
    adaError = true;
  } else if (idAnggota === '') {
    tampilkanError(pilihAnggota, errorPilih, 'Wajib memilih siapa anggota yang akan mengerjakan tugas ini.');
    adaError = true;
  }

  if (adaError) return;

  state.sedangMemuat = true;
  tombolTugas.disabled = true;
  tombolTugas.textContent = 'Membagi tugas...';
  tampilkanHasil(hasil);
  pindahTampilan('hasil');

  setTimeout(function () {
    const tugasBaru = tambahTugas(nama, deadline, idAnggota);

    formTugas.reset();
    tampilkanInfo(pilihAnggota, infoAnggota);

    state.sedangMemuat = false;
    tombolTugas.disabled = false;
    tombolTugas.textContent = 'Bagikan tugas';
    tampilkanHasil(hasil, tugasBaru.id);
    tampilkanToast(`Tugas "${tugasBaru.nama}" berhasil dibagikan.`);
  }, 900);
});

// Event Hapus Tugas
hasil.addEventListener('click', function (event) {
  if (!event.target.classList.contains('tombol-hapus')) return;
  if (state.sedangMemuat) return;

  const id = Number(event.target.dataset.id);
  hapusTugas(id);
  tampilkanInfo(pilihAnggota, infoAnggota);
  tampilkanHasil(hasil);
  tampilkanToast('Tugas dihapus.');
});