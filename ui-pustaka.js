// ui-pustaka.js — SATU-SATUNYA berkas yang memanggil JavaScript Bootstrap.
// Berkas lain cukup memanggil tampilkanToast('pesan').

function tampilkanToast(pesan) {
  // Kalau Bootstrap gagal dimuat (misalnya internet mati), lewati saja
  if (typeof bootstrap === 'undefined') return;

  const el = document.getElementById('toast-info');
  if (!el) return;

  el.querySelector('.toast-body').textContent = pesan;
  bootstrap.Toast.getOrCreateInstance(el, { delay: 4000 }).show();
}