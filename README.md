# Vaulty Docs

Dokumentasi Vaulty (Astro Starlight), dua bahasa: Indonesia di akar, Inggris di `/en/`.
Live di https://docs.vaulty.afatyo.web.id. Rencana lengkap ada di catatan Obsidian "Rencana Dokumentasi Vaulty".

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # hasil di dist/
```

## Deploy (server uji)

Situs statis yang disajikan nginx, sama seperti landing:

```bash
SITE_URL=https://docs.vaulty.afatyo.web.id npm run build
rsync -az --delete dist/ root@wallet:/var/www/vaulty-docs/
```

## Data yang harus sama dengan aplikasi

Dua berkas di `src/data/` tidak boleh diketik ulang di halaman:

| Berkas | Sumber | Cara memperbarui |
|---|---|---|
| `mcp-tools.json` | kode server MCP (`backend/mcp.js` di repo `vaulty`) | di repo `vaulty`: `node backend/scripts/exportMcpTools.mjs ../vaulty-docs/src/data/mcp-tools.json` |
| `plans.json` | tabel `plans` (harga) dan `backend/features.js` | ubah manual saat harga berubah, lalu cek tabel di halaman Paket |

Halaman `agen-ai/referensi-tools` dan `paket/paket-dan-harga` membaca berkas itu lewat komponen `McpTools.astro` dan `PlanTable.astro`.

## Screenshot otomatis

Semua gambar di `src/assets/screens/<id|en>/` dibuat oleh skrip, dari data dummy yang realistis di aplikasi **lokal**:

```bash
npm i                                  # sekali (puppeteer-core dan sharp)
GLOBAL_RATE_LIMIT_MAX=20000 docker compose -f ../vaulty/docker-compose.yml up -d backend   # longgarkan pembatas lokal
node scripts/capture-screens.mjs all      # buat data dummy lalu potret semua halaman, id dan en
node scripts/capture-screens.mjs all reuse    # pakai akun demo yang ada, potret ulang tur dan onboarding
node scripts/capture-screens.mjs en forms     # hanya form (anggaran, tagihan, tabungan, target)
```

Syarat: aplikasi lokal di `http://localhost:3030`, Google Chrome terpasang, `docker compose` bisa dipakai dari repo `vaulty` (variabel `VAULTY_REPO`). Data dummy hanya masuk ke database lokal: Keluarga Wulandari (Indonesia) dan Tan Family (Inggris), paket Family, dua anggota, lima bulan transaksi, anggaran, tagihan, tabungan, target, utang, dan riwayat pembayaran. Jalankan ulang setiap ada perubahan tampilan aplikasi.

## Struktur

- `src/content/docs/panduan/` panduan penggunaan langkah demi langkah per menu, dengan gambar.
- `src/content/docs/` bahasa Indonesia, `src/content/docs/en/` bahasa Inggris. Nama folder dan berkas sama di kedua bahasa.
- Satu halaman satu bahasa. Jangan mencampur.
- Halaman yang memakai komponen harus berekstensi `.mdx`.

## Aturan isi

- Fitur baru belum selesai sebelum halaman docs-nya ada atau diperbarui.
- Jangan menulis kunci, alamat internal, atau data pribadi.

By Luminus (Agent TYO)
