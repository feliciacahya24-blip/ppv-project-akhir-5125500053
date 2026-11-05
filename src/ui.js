// ui.js — Manipulasi DOM & Animasi Tampilan TaskSplit

import { state, amankan, hitungTugas, formatTanggal, hariIni } from './state.js';

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

export function tampilkanAnggota(daftarAnggotaEl, pilihAnggotaEl, infoAnggotaEl) {
  if (state.anggota.length === 0) {
    daftarAnggotaEl.innerHTML = '<p class="samar">Belum ada anggota.</p>';
  } else {
    let html = '';
    state.anggota.forEach(a => {
      html += `
        <span class="chip">
          <span class="avatar" style="background:${a.warna}">${amankan(a.nama.charAt(0).toUpperCase())}</span>
          ${amankan(a.nama)}
          <button type="button" class="hapus-anggota" data-id="${a.id}" title="Hapus anggota">×</button>
        </span>`;
    });
    daftarAnggotaEl.innerHTML = html;
  }
  isiPilihan(pilihAnggotaEl, infoAnggotaEl);
}

export function isiPilihan(pilihAnggotaEl, infoAnggotaEl) {
  const dipilih = pilihAnggotaEl.value;
  let html = '<option value="">Pilih anggota</option>';
  state.anggota.forEach(a => {
    html += `<option value="${a.id}">${amankan(a.nama)}</option>`;
  });
  pilihAnggotaEl.innerHTML = html;

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
  if (state.sedangMemuat) {
    hasilEl.innerHTML = '<div class="memuat"><span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Membagi tugas...</div>';
    return;
  }

  if (state.anggota.length === 0) {
    hasilEl.innerHTML = `
      <div class="kosong">
        <h3>Belum ada anggota!</h3>
        <p>Yuk, isi nama anggota kelompok & tugas mereka di sini. :)</p>
        <button type="button" class="tombol" data-pindah="anggota">Ke halaman Anggota</button>
      </div>`;
    return;
  }
  if (state.tugas.length === 0) {
    hasilEl.innerHTML = `
      <div class="kosong">
        <h3>Belum ada pembagian tugas</h3>
        <p>Isi form tugas baru, pilih anggota, lalu klik "Bagikan tugas".</p>
        <button type="button" class="tombol" data-pindah="tugas">Ke halaman Tugas</button>
      </div>`;
    return;
  }

  let html = '';
  state.anggota.forEach(a => {
    const tugasAnggota = state.tugas.filter(t => t.anggotaId === a.id);
    tugasAnggota.sort((x, y) => x.deadline.localeCompare(y.deadline));

    html += `
      <div class="grup">
        <div class="grup-atas">
          <span class="avatar" style="background:${a.warna}">${amankan(a.nama.charAt(0).toUpperCase())}</span>
          <h3>${amankan(a.nama)}</h3>
          <span class="lencana">${tugasAnggota.length} tugas</span>
        </div>`;

    if (tugasAnggota.length === 0) {
      html += '<p class="samar">Belum dapat tugas.</p>';
    }

    tugasAnggota.forEach(t => {
      const hariIniPersis = t.deadline === hariIni();
      html += `
        <div class="item-tugas" data-id="${t.id}">
          <div>
            <strong>${amankan(t.nama)}</strong>
            <span class="deadline ${hariIniPersis ? 'hari-ini' : ''}">Deadline: ${formatTanggal(t.deadline)}${hariIniPersis ? ' (hari ini)' : ''}</span>
          </div>
          <button type="button" class="tombol-hapus" data-id="${t.id}">Hapus</button>
        </div>`;
    });

    html += '</div>';
  });
  html += '<button type="button" class="tombol tombol-besar" data-pindah="tugas">Tambah tugas lagi</button>';
  hasilEl.innerHTML = html;

  if (idBaru) {
    const kartuBaru = hasilEl.querySelector('.item-tugas[data-id="' + idBaru + '"]');
    if (kartuBaru) {
      animasi(kartuBaru,
        [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }],
        { duration: 300, easing: 'ease-out' });
    }
  }
}