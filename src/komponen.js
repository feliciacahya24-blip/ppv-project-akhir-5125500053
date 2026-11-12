// src/komponen.js — komponen UI TaskSplit (fungsi yang menerima data dan mengembalikan elemen)
import { formatTanggal, hariIni } from './state.js';

function buat(tag, kelas, teks) {
  const el = document.createElement(tag);
  if (kelas) el.className = kelas;
  if (teks !== undefined) el.textContent = teks;
  return el;
}

// Avatar(anggota) -> HTMLElement. anggota: { id, nama, warna }
export function Avatar(anggota) {
  const el = buat('span', 'avatar', String(anggota.nama).charAt(0).toUpperCase());
  el.style.background = anggota.warna;
  return el;
}

// ChipAnggota(anggota) -> HTMLElement. Tombol hapus membawa data-id
export function ChipAnggota(anggota) {
  const chip = buat('span', 'chip');
  const hapus = buat('button', 'hapus-anggota', '×');
  hapus.type = 'button';
  hapus.dataset.id = String(anggota.id);
  hapus.title = 'Hapus anggota';
  chip.append(Avatar(anggota), anggota.nama, hapus);
  return chip;
}

// ItemTugas(tugas) -> HTMLElement. tugas: { id, nama, deadline, anggotaId }
export function ItemTugas(tugas) {
  const persis = tugas.deadline === hariIni();
  const item = buat('div', 'item-tugas');
  item.dataset.id = String(tugas.id);

  const kiri = buat('div');
  const nama = buat('strong', '', tugas.nama);
  const deadline = buat(
    'span',
    persis ? 'deadline hari-ini' : 'deadline',
    'Deadline: ' + formatTanggal(tugas.deadline) + (persis ? ' (hari ini)' : '')
  );
  kiri.append(nama, deadline);

  const hapus = buat('button', 'tombol-hapus', 'Hapus');
  hapus.type = 'button';
  hapus.dataset.id = String(tugas.id);

  item.append(kiri, hapus);
  return item;
}

// PesanSamar(teks) -> HTMLElement
export function PesanSamar(teks) {
  return buat('p', 'samar', teks);
}

// GrupAnggota(anggota, daftarTugas) -> HTMLElement
export function GrupAnggota(anggota, daftarTugas) {
  const grup = buat('div', 'grup');
  const atas = buat('div', 'grup-atas');
  atas.append(
    Avatar(anggota),
    buat('h3', '', anggota.nama),
    buat('span', 'lencana', daftarTugas.length + ' tugas')
  );
  grup.append(atas);

  if (daftarTugas.length === 0) grup.append(PesanSamar('Belum dapat tugas.'));
  daftarTugas.forEach((t) => grup.append(ItemTugas(t)));
  return grup;
}

// KartuKosong({ judul, teks, label, tujuan }) -> HTMLElement
export function KartuKosong({ judul, teks, label, tujuan }) {
  const kotak = buat('div', 'kosong');
  const tombol = buat('button', 'tombol', label);
  tombol.type = 'button';
  tombol.dataset.pindah = tujuan;
  kotak.append(buat('h3', '', judul), buat('p', '', teks), tombol);
  return kotak;
}