// state.js — Logika & State Aplikasi TaskSplit (Bebas DOM)

const warnaAnggota = ['#513229', '#8A5A44', '#5F6F3E', '#9A6B2F', '#3E6D94', '#8C4A4A', '#57646B', '#7A4F2B'];

export const state = {
  anggota: [],
  tugas: [],
  idBerikut: 1,
  sedangMemuat: false
};

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

export function amankan(teks) {
  return teks.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function hitungTugas(idAnggota) {
  return state.tugas.filter(t => t.anggotaId === idAnggota).length;
}

export function tambahAnggota(nama) {
  const anggotaBaru = {
    id: state.idBerikut,
    nama: nama,
    warna: warnaAnggota[state.idBerikut % warnaAnggota.length]
  };
  state.anggota.push(anggotaBaru);
  state.idBerikut++;
  return anggotaBaru;
}

export function hapusAnggota(id) {
  state.anggota = state.anggota.filter(x => x.id !== id);
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
  return tugasBaru;
}

export function hapusTugas(id) {
  state.tugas = state.tugas.filter(t => t.id !== id);
}