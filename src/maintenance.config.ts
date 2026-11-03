/* =====================================================================
   PERAWATAN — ubah blok ini untuk mengatur mode perawatan situs
   ===================================================================== */
export const MAINTENANCE = {
  // true  = semua halaman dialihkan ke /maintenance
  // false = situs normal (halaman /maintenance tetap bisa dibuka langsung)
  enabled: false,
  // Tiap item tampil di barisnya sendiri; baris terakhir berwarna kuning.
  // Di layar kecil, satu baris muat sekitar 9 huruf.
  lines: ["Sedang", "dalam", "perawatan"],
};

export function needsMaintenanceRedirect(pathname: string, enabled = MAINTENANCE.enabled) {
  return enabled && !pathname.startsWith("/maintenance");
}
