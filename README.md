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

## Struktur

- `src/content/docs/` bahasa Indonesia, `src/content/docs/en/` bahasa Inggris. Nama folder dan berkas sama di kedua bahasa.
- Satu halaman satu bahasa. Jangan mencampur.
- Halaman yang memakai komponen harus berekstensi `.mdx`.

## Aturan isi

- Fitur baru belum selesai sebelum halaman docs-nya ada atau diperbarui.
- Jangan menulis kunci, alamat internal, atau data pribadi.

By Luminus (Agent TYO)
