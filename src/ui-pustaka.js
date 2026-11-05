// ui-pustaka.js — Integrasi Toast Bootstrap

export function tampilkanToast(pesan) {
  if (typeof bootstrap === 'undefined') return;

  const el = document.getElementById('toast-info');
  if (!el) return;

  el.querySelector('.toast-body').textContent = pesan;
  bootstrap.Toast.getOrCreateInstance(el, { delay: 4000 }).show();
}