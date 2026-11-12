// ui.js — Manipulasi DOM & Animasi Tampilan TaskSplit
import { state, hitungTugas } from './state.js';
import { pesanStatus } from './storage.js';
import { ChipAnggota, GrupAnggota, KartuKosong, PesanSamar } from './komponen.js';

const kurangiGerak = window.matchMedia('(prefers-reduced-motion: reduce)');

export function animasi(el, keyframes, opsi) {
  const pengaturan = { ...opsi };
  if (kurangiGerak.matches) pengaturan.duration = 0;
  return el.animate(keyframes, pengaturan);
}

export function getar(el) {
  animasi(el,
    [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-6px)' },
      { transform: 'translateX(6px)' },
      { transform: 'translateX(-6px)' },
      { transform: 'translateX(6px)' },
      { transform: 'translateX(0)' }
    ],
    { duration: 300, easing: 'ease-in-out' });
}

export function pindahTampilan(nama) {
  const daftarTampilan = ['anggota', 'tugas', 'hasil'];
  const tujuan = document.getElementById('tampilan-' + nama);
  if (!tujuan) return;
  const sudahTampil = !tujuan.hidden;

  daftarTampilan.forEach(function (n) {
    const el = document.getElementById('tampilan-' + n);
    if (el) el.hidden = (n !== nama);
  });

  document.querySelectorAll('.nav-link').forEach(function (tab) {
    if (tab.dataset.pindah === nama) {
      tab.setAttribute('aria-current', 'page');
      tab.classList.add('active');
    } else {
      tab.removeAttribute('aria-current');
      tab.classList.remove('active');
    }
  });

  if (!sudahTampil) {
    animasi(tujuan,
      [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }],
      { duration: 220, easing: 'ease-out' });
  }

  window.scrollTo(0, 0);
}

export function tampilkanError(kolom, tempatPesan, pesan) {
  tempatPesan.textContent = pesan;
  kolom.classList.add('salah');
  getar(kolom);
}

export function hapusError(kolom, tempatPesan) {
  tempatPesan.textContent = '';
  kolom.classList.remove('salah');
}

// Memberi tahu pengguna kalau data rusak atau penyimpanan tidak tersedia
function perbaruiStatusPenyimpanan() {
  const el = document.getElementById('status-penyimpanan');
  if (el) el.textContent = pesanStatus();
}

export function tampilkanAnggota(daftarAnggotaEl, pilihAnggotaEl, infoAnggotaEl) {
  if (state.anggota.length === 0) {
    daftarAnggotaEl.replaceChildren(PesanSamar('Belum ada anggota.'));
  } else {
    daftarAnggotaEl.replaceChildren(...state.anggota.map((a) => ChipAnggota(a)));
  }
  isiPilihan(pilihAnggotaEl, infoAnggotaEl);
}

export function isiPilihan(pilihAnggotaEl, infoAnggotaEl) {
  const dipilih = pilihAnggotaEl.value;
  pilihAnggotaEl.replaceChildren(
    new Option('Pilih anggota', ''),
    ...state.anggota.map((a) => new Option(a.nama, String(a.id)))
  );

  const masihAda = state.anggota.some(a => String(a.id) === dipilih);
  pilihAnggotaEl.value = masihAda ? dipilih : '';
  tampilkanInfo(pilihAnggotaEl, infoAnggotaEl);
}

export function tampilkanInfo(pilihAnggotaEl, infoAnggotaEl) {
  if (pilihAnggotaEl.value === '') {
    infoAnggotaEl.textContent = '';
    return;
  }
  const a = state.anggota.find(x => String(x.id) === pilihAnggotaEl.value);
  if (a) {
    infoAnggotaEl.textContent = `${a.nama} saat ini punya ${hitungTugas(a.id)} tugas.`;
  }
}

export function tampilkanHasil(hasilEl, idBaru) {
  perbaruiStatusPenyimpanan();

  if (state.sedangMemuat) {
    const memuat = document.createElement('div');
    memuat.className = 'memuat';
    const spinner = document.createElement('span');
    spinner.className = 'spinner-border spinner-border-sm';
    spinner.setAttribute('aria-hidden', 'true');
    memuat.append(spinner, ' Membagi tugas...');
    hasilEl.replaceChildren(memuat);
    return;
  }

  if (state.anggota.length === 0) {
    hasilEl.replaceChildren(KartuKosong({
      judul: 'Belum ada anggota!',
      teks: 'Yuk, isi nama anggota kelompok & tugas mereka di sini. :)',
      label: 'Ke halaman Anggota',
      tujuan: 'anggota'
    }));
    return;
  }
  if (state.tugas.length === 0) {
    hasilEl.replaceChildren(KartuKosong({
      judul: 'Belum ada pembagian tugas',
      teks: 'Isi form tugas baru, pilih anggota, lalu klik "Bagikan tugas".',
      label: 'Ke halaman Tugas',
      tujuan: 'tugas'
    }));
    return;
  }

  const semuaGrup = state.anggota.map((a) => {
    const tugasAnggota = state.tugas
      .filter((t) => t.anggotaId === a.id)
      .sort((x, y) => x.deadline.localeCompare(y.deadline));
    return GrupAnggota(a, tugasAnggota);
  });

  const tambahLagi = document.createElement('button');
  tambahLagi.type = 'button';
  tambahLagi.className = 'tombol tombol-besar';
  tambahLagi.dataset.pindah = 'tugas';
  tambahLagi.textContent = 'Tambah tugas lagi';

  hasilEl.replaceChildren(...semuaGrup, tambahLagi);

  if (idBaru) {
    const kartuBaru = hasilEl.querySelector('.item-tugas[data-id="' + idBaru + '"]');
    if (kartuBaru) {
      animasi(kartuBaru,
        [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }],
        { duration: 300, easing: 'ease-out' });
    }
  }
}