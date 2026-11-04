/* =====================================================================
   PERAWATAN — ubah blok ini untuk mengatur mode perawatan situs
   ===================================================================== */
export const MAINTENANCE = {
   // Berlaku di Lovable dan GitHub Pages (Settings → Pages → Source: GitHub Actions).
   // GitHub Pages diperbarui otomatis setelah perubahan masuk ke main.
   // true  = semua halaman dialihkan ke /maintenance
  // false = situs normal (halaman /maintenance tetap bisa dibuka langsung)
  enabled: true,
  // Tiap item tampil di barisnya sendiri; baris terakhir berwarna kuning.
  // Di layar kecil, satu baris muat sekitar 9 huruf.
  lines: ["Sedang", "dalam", "perawatan"],
};

export function needsMaintenanceRedirect(pathname: string, enabled = MAINTENANCE.enabled) {
  return enabled && !pathname.startsWith("/maintenance");
}
