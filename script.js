const warnaAnggota = ['#513229', '#8A5A44', '#5F6F3E', '#9A6B2F', '#3E6D94', '#8C4A4A', '#57646B', '#7A4F2B'];
let anggota = [];
let tugas = [];
let idBerikut = 1;
let sedangMemuat = false;

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

const kurangiGerak = window.matchMedia('(prefers-reduced-motion: reduce)');

// Pengganti element.animate(): kalau "kurangi gerak" aktif, durasi jadi 0 (langsung selesai)
function animasi(el, keyframes, opsi) {
  const pengaturan = { ...opsi };
  if (kurangiGerak.matches) pengaturan.duration = 0;
  return el.animate(keyframes, pengaturan);
}

function getar(el) {
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

const daftarTampilan = ['anggota', 'tugas', 'hasil'];

function pindahTampilan(nama) {
  const tujuan = document.getElementById('tampilan-' + nama);
  const sudahTampil = !tujuan.hidden;   // true kalau tab yang diklik memang sudah terbuka

  daftarTampilan.forEach(function (n) {
    document.getElementById('tampilan-' + n).hidden = (n !== nama);
  });
  // tandai tombol menu yang sedang aktif
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

document.addEventListener('click', function (event) {
  const pemicu = event.target.closest('[data-pindah]');
  if (!pemicu) return;
  pindahTampilan(pemicu.dataset.pindah);
});

function tampilkanError(kolom, tempatPesan, pesan) {
  tempatPesan.textContent = pesan;
  kolom.classList.add('salah');
  getar(kolom);   
}

function hapusError(kolom, tempatPesan) {
  tempatPesan.textContent = '';
  kolom.classList.remove('salah');
}

function hariIni() {
  const t = new Date();
  const bulan = String(t.getMonth() + 1).padStart(2, '0');
  const hari = String(t.getDate()).padStart(2, '0');
  return `${t.getFullYear()}-${bulan}-${hari}`;
}

function formatTanggal(teks) {
  return new Date(teks + 'T00:00:00').toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

function amankan(teks) {
  return teks.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function hitungTugas(idAnggota) {
  return tugas.filter(t => t.anggotaId === idAnggota).length;
}

function tampilkanAnggota() {
  if (anggota.length === 0) {
    daftarAnggota.innerHTML = '<p class="samar">Belum ada anggota.</p>';
  } else {
    let html = '';
    anggota.forEach(a => {
      html += `
        <span class="chip">
          <span class="avatar" style="background:${a.warna}">${amankan(a.nama.charAt(0).toUpperCase())}</span>
          ${amankan(a.nama)}
          <button type="button" class="hapus-anggota" data-id="${a.id}" title="Hapus anggota">×</button>
        </span>`;
    });
    daftarAnggota.innerHTML = html;
  }
  isiPilihan();
}

function isiPilihan() {
  const dipilih = pilihAnggota.value;
  let html = '<option value="">Pilih anggota</option>';
  anggota.forEach(a => {
    html += `<option value="${a.id}">${amankan(a.nama)}</option>`;
  });
  pilihAnggota.innerHTML = html;

  const masihAda = anggota.some(a => String(a.id) === dipilih);
  pilihAnggota.value = masihAda ? dipilih : '';
  tampilkanInfo();
}

function tampilkanInfo() {
  if (pilihAnggota.value === '') {
    infoAnggota.textContent = '';
    return;
  }
  const a = anggota.find(x => String(x.id) === pilihAnggota.value);
  infoAnggota.textContent = `${a.nama} saat ini punya ${hitungTugas(a.id)} tugas.`;
}

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
  const sudahAda = anggota.some(a => a.nama.toLowerCase() === nama.toLowerCase());
  if (sudahAda) {
    tampilkanError(inputAnggota, errorAnggota, `${nama} sudah ada di kelompok. Pakai nama lain atau tambahkan inisial.`);
    return;
  }

  anggota.push({
    id: idBerikut,
    nama: nama,
    warna: warnaAnggota[idBerikut % warnaAnggota.length]
  });
  idBerikut++;

  inputAnggota.value = '';
  hapusError(inputAnggota, errorAnggota);
  tampilkanAnggota();
  tampilkanHasil();
  mainkanSuara();
  tampilkanToast(nama + ' ditambahkan ke kelompok.');
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
  if (sedangMemuat) return;

  const id = Number(event.target.dataset.id);
  const a = anggota.find(x => x.id === id);
  const jumlah = hitungTugas(id);

  if (jumlah > 0) {
    tampilkanError(inputAnggota, errorAnggota, `${a.nama} masih punya ${jumlah} tugas. Hapus tugasnya dulu di halaman Hasil sebelum menghapus anggota.`);
    return;
  }

  anggota = anggota.filter(x => x.id !== id);
  hapusError(inputAnggota, errorAnggota);
  tampilkanAnggota();
  tampilkanHasil();
});

function tampilkanHasil(idBaru) {   

  if (sedangMemuat) {
        hasil.innerHTML = '<div class="memuat"><span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Membagi tugas...</div>';
    return;
  }

  if (anggota.length === 0) {
    hasil.innerHTML = `
      <div class="kosong">
        <h3>Belum ada anggota!</h3>
        <p>Yuk, isi nama anggota kelompok & tugas mereka di sini. :)</p>
        <button type="button" class="tombol" data-pindah="anggota">Ke halaman Anggota</button>
      </div>`;
    return;
  }
  if (tugas.length === 0) {
    hasil.innerHTML = `
      <div class="kosong">
        <h3>Belum ada pembagian tugas</h3>
        <p>Isi form tugas baru, pilih anggota, lalu klik "Bagikan tugas".</p>
        <button type="button" class="tombol" data-pindah="tugas">Ke halaman Tugas</button>
      </div>`;
    return;
  }

  let html = '';
  anggota.forEach(a => {
    const tugasAnggota = tugas.filter(t => t.anggotaId === a.id);
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
  hasil.innerHTML = html;

  if (idBaru) {
    const kartuBaru = hasil.querySelector('.item-tugas[data-id="' + idBaru + '"]');
    if (kartuBaru) {
      animasi(kartuBaru,
        [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }],
        { duration: 300, easing: 'ease-out' });
    }
  }
}

hasil.addEventListener('click', function (event) {
  if (!event.target.classList.contains('tombol-hapus')) return;
  if (sedangMemuat) return;

  const id = Number(event.target.dataset.id);
  tugas = tugas.filter(t => t.id !== id);
  tampilkanInfo();
  tampilkanHasil();
  tampilkanToast('Tugas dihapus.');
});

inputDeadline.min = hariIni();
tampilkanAnggota();
tampilkanHasil();

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
  tampilkanInfo();
});

inputDeadline.addEventListener('change', function () {
  hapusError(inputDeadline, errorDeadline);
});

formTugas.addEventListener('submit', function (event) {
  event.preventDefault();
  if (sedangMemuat) return;

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
  } else if (tugas.some(t => t.nama.toLowerCase() === nama.toLowerCase())) {
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

  if (anggota.length === 0) {
    tampilkanError(pilihAnggota, errorPilih, 'Belum ada anggota. Tambahkan anggota dulu di halaman Anggota.');
    adaError = true;
  } else if (idAnggota === '') {
    tampilkanError(pilihAnggota, errorPilih, 'Wajib memilih siapa anggota yang akan mengerjakan tugas ini.');
    adaError = true;
  }

  if (adaError) return;

  sedangMemuat = true;
  tombolTugas.disabled = true;
  tombolTugas.textContent = 'Membagi tugas...';
  tampilkanHasil();
  pindahTampilan('hasil');

  setTimeout(function () {
    const tugasBaru = {
      id: idBerikut,
      nama: nama,
      deadline: deadline,
      anggotaId: Number(idAnggota)
    };
    tugas.push(tugasBaru);
    idBerikut++;

    formTugas.reset();
    tampilkanInfo();

    sedangMemuat = false;
    tombolTugas.disabled = false;
    tombolTugas.textContent = 'Bagikan tugas';
    tampilkanHasil(tugasBaru.id);
    tampilkanToast(`Tugas "${tugasBaru.nama}" berhasil dibagikan.`);
  }, 900);
});
// ---------- Media kedua: bunyi saat tugas berhasil dibagikan ----------
const bunyiTing = document.getElementById('bunyi-ting');
const tombolSuara = document.getElementById('tombol-suara');
let suaraNyala = true;

// Kontrol: pengguna bisa menyalakan dan mematikan suara
tombolSuara.addEventListener('click', function () {
  suaraNyala = !suaraNyala;
  tombolSuara.textContent = suaraNyala ? 'Suara: Nyala' : 'Suara: Mati';
  tombolSuara.setAttribute('aria-pressed', String(suaraNyala));
});

// Penanganan gagal dimuat: file hilang atau salah nama
function suaraTidakTersedia() {
  suaraNyala = false;
  tombolSuara.disabled = true;
  tombolSuara.textContent = 'Suara tidak tersedia';
}
bunyiTing.addEventListener('error', suaraTidakTersedia);
if (bunyiTing.error) suaraTidakTersedia();

function mainkanSuara() {
  if (!suaraNyala) return;
  bunyiTing.currentTime = 0;
  bunyiTing.play().catch(function (e) {
    if (e && e.name === 'NotSupportedError') suaraTidakTersedia();
  });
}