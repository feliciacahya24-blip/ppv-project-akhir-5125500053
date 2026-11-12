// src/storage.js — penyimpanan aman TaskSplit
export const KUNCI = 'tasksplit:v1'; // naikkan ke :v2 kalau bentuk data berubah

let cadangan = null; // salinan terakhir di memori, dipakai kalau localStorage diblokir
let pesanData = '';  // data tersimpan rusak (bertahan selama halaman dibuka)
let pesanAkses = ''; // penyimpanan diblokir / penuh

const kosong = () => ({ anggota: [], tugas: [], idBerikut: 1 });
const salin = (data) => JSON.parse(JSON.stringify(data));

function adalahObjek(x) {
  return x !== null && typeof x === 'object' && !Array.isArray(x);
}
function idSah(x) {
  return Number.isInteger(x) && x > 0;
}
function teksSah(x) {
  return typeof x === 'string' && x.trim() !== '';
}
function tanggalSah(x) {
  return typeof x === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(x) && !Number.isNaN(new Date(x + 'T00:00:00').getTime());
}

// Menyaring data: hanya anggota dan tugas yang sah yang dipakai
function bersihkan(data) {
  const hasil = kosong();
  const idTerpakai = new Set();
  let dibuang = 0;

  const daftarAnggota = Array.isArray(data.anggota) ? data.anggota : [];
  for (const a of daftarAnggota) {
    if (adalahObjek(a) && idSah(a.id) && teksSah(a.nama) && !idTerpakai.has(a.id)) {
      idTerpakai.add(a.id);
      hasil.anggota.push({ id: a.id, nama: a.nama.trim().slice(0, 20) });
    } else {
      dibuang++;
    }
  }

  const idAnggota = new Set(hasil.anggota.map((a) => a.id));
  const daftarTugas = Array.isArray(data.tugas) ? data.tugas : [];
  for (const t of daftarTugas) {
    if (adalahObjek(t) && idSah(t.id) && teksSah(t.nama) && tanggalSah(t.deadline)
        && idAnggota.has(t.anggotaId) && !idTerpakai.has(t.id)) {
      idTerpakai.add(t.id);
      hasil.tugas.push({ id: t.id, nama: t.nama.trim().slice(0, 40), deadline: t.deadline, anggotaId: t.anggotaId });
    } else {
      dibuang++;
    }
  }

  hasil.idBerikut = Math.max(0, ...idTerpakai) + 1;
  return { hasil, dibuang };
}

export function muat() {
  let mentah;
  try {
    mentah = localStorage.getItem(KUNCI);
    pesanAkses = '';
  } catch (err) {
    pesanAkses = 'Penyimpanan browser tidak tersedia. Data hanya ada sementara dan hilang saat halaman ditutup.';
    console.warn('localStorage tidak bisa dibaca:', err.name);
    return cadangan ? salin(cadangan) : kosong();
  }

  if (mentah === null) return kosong(); // belum pernah disimpan

  let data;
  try {
    data = JSON.parse(mentah);
  } catch (err) {
    pesanData = 'Data tersimpan rusak dan diabaikan. TaskSplit dimulai dari kosong.';
    console.warn('JSON di', KUNCI, 'rusak:', err.message);
    return kosong();
  }

  if (!adalahObjek(data) || (!Array.isArray(data.anggota) && !Array.isArray(data.tugas))) {
    pesanData = 'Data tersimpan tidak sesuai format dan diabaikan. TaskSplit dimulai dari kosong.';
    console.warn('Isi', KUNCI, 'tidak sesuai format');
    return kosong();
  }

  const { hasil, dibuang } = bersihkan(data);
  if (dibuang > 0) {
    pesanData = `${dibuang} data rusak dilewati.`;
    console.warn(pesanData);
  }
  cadangan = salin(hasil);
  return hasil;
}

// data: { anggota: [{id, nama}], tugas: [{id, nama, deadline, anggotaId}] }
export function simpan(data) {
  try {
    const teks = JSON.stringify(data);
    cadangan = JSON.parse(teks);
    localStorage.setItem(KUNCI, teks);
    pesanAkses = '';
    return true;
  } catch (err) {
    pesanAkses = 'Perubahan tidak tersimpan (penyimpanan penuh atau diblokir). Data hanya ada sementara.';
    console.warn('Gagal menyimpan:', err.name);
    return false;
  }
}

// Teks peringatan untuk pengguna ('' kalau semua normal)
export function pesanStatus() {
  return [pesanAkses, pesanData].filter(Boolean).join(' ');
}