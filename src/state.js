// state.js — Logika & State Aplikasi TaskSplit (Bebas DOM)
import { muat, simpan } from './storage.js';

const warnaAnggota = ['#513229', '#8A5A44', '#5F6F3E', '#9A6B2F', '#3E6D94', '#8C4A4A', '#57646B', '#7A4F2B'];

function warnaUntuk(id) {
  return warnaAnggota[id % warnaAnggota.length];
}

const awal = muat();

export const state = {
  anggota: awal.anggota.map((a) => ({ id: a.id, nama: a.nama, warna: warnaUntuk(a.id) })),
  tugas: awal.tugas,
  idBerikut: awal.idBerikut,
  sedangMemuat: false
};

// Menyimpan anggota dan tugas (warna dan status memuat tidak ikut disimpan)
function simpanSemua() {
  simpan({
    anggota: state.anggota.map((a) => ({ id: a.id, nama: a.nama })),
    tugas: state.tugas
  });
}

export function hariIni() {
  const t = new Date();
  const bulan = String(t.getMonth() + 1).padStart(2, '0');
  const hari = String(t.getDate()).padStart(2, '0');
  return `${t.getFullYear()}-${bulan}-${hari}`;
}

export function formatTanggal(teks) {
  return new Date(teks + 'T00:00:00').toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

export function hitungTugas(idAnggota) {
  return state.tugas.filter(t => t.anggotaId === idAnggota).length;
}

export function tambahAnggota(nama) {
  const anggotaBaru = {
    id: state.idBerikut,
    nama: nama,
    warna: warnaUntuk(state.idBerikut)
  };
  state.anggota.push(anggotaBaru);
  state.idBerikut++;
  simpanSemua();
  return anggotaBaru;
}

export function hapusAnggota(id) {
  state.anggota = state.anggota.filter(x => x.id !== id);
  simpanSemua();
}

export function tambahTugas(nama, deadline, idAnggota) {
  const tugasBaru = {
    id: state.idBerikut,
    nama: nama,
    deadline: deadline,
    anggotaId: Number(idAnggota)
  };
  state.tugas.push(tugasBaru);
  state.idBerikut++;
  simpanSemua();
  return tugasBaru;
}

export function hapusTugas(id) {
  state.tugas = state.tugas.filter(t => t.id !== id);
  simpanSemua();
}