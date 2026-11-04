# Versi statis untuk GitHub Pages

Folder ini berisi situs dalam HTML/CSS/JS murni:

- `index.html` — struktur halaman
- `style.css` — semua gaya & warna (ganti warna di blok `:root`)
- `script.js` — animasi, suara 8-bit, easter egg, form

## Cara publish
1. Di GitHub buka repo → **Settings → Pages**.
2. Source: **GitHub Actions** (bukan Deploy from a branch).
3. Di tab **Actions**, jalankan **Publish GitHub Pages → Run workflow** sekali, atau kirim perubahan ke `main`.
4. Setelah publikasi selesai, situs tampil di `https://<username>.github.io/<nama-repo>/`.

## Saklar perawatan
Ubah `enabled` di `src/maintenance.config.ts`: `true` menampilkan perawatan, `false` memulihkan halaman normal. Workflow membaca saklar ini setiap perubahan masuk ke `main`, tanpa mengubah salinan halaman normal di `docs/`. Perubahan situs publik berlaku setelah workflow selesai; pratinjau Lovable mengikuti saklar secara langsung.
