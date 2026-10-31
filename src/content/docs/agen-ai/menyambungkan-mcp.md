---
title: "Menyambungkan agen AI (MCP)"
description: "Hubungkan asisten AI ke Vaulty lewat Model Context Protocol."
sidebar: 
  order: 1
---

**MCP (Model Context Protocol)** adalah cara standar agar asisten AI terhubung ke layanan lain. Dengan MCP, asisten AI yang kamu pakai (misalnya Claude Code) bisa membaca keuanganmu (ringkasan, arus kas, anggaran, tabungan, tagihan, utang, skor kesehatan, dan lainnya) dan, kalau kamu izinkan, mencatat serta mengubah datanya di Vaulty.

Tersedia untuk paket **Personal** ke atas.

## 1. Buat token akses

1. Buka **Pengaturan > Akses agen AI (MCP)**. Hanya pemilik organisasi yang bisa mengelola token.
2. Isi **nama token** (misalnya "Claude di laptop").
3. Pilih **akses**: *Baca saja*, atau *Baca dan ubah data*.
4. Pilih **masa berlaku**: 30 hari, 90 hari, 1 tahun, atau tanpa batas.
5. Klik **Buat token**, lalu **salin token sekarang**. Token hanya ditampilkan sekali.

:::danger[Perlakukan token seperti password]
Siapa pun yang memegang token bisa membaca (dan bila diizinkan, menulis) data keuanganmu sampai token dicabut. Kalau token bocor, cabut segera di halaman yang sama.
:::

## 2. Sambungkan ke agen

Alamat server MCP: `https://<alamat-aplikasi-vaulty>/api/mcp`. Halaman pengaturan menampilkan alamat yang benar beserta contoh siap salin.

### Claude Code

```bash
claude mcp add --transport http vaulty https://<alamat-aplikasi-vaulty>/api/mcp \
  --header "Authorization: Bearer <TOKEN>"
```

### Klien MCP lain (JSON)

```json
{
  "mcpServers": {
    "vaulty": {
      "type": "http",
      "url": "https://<alamat-aplikasi-vaulty>/api/mcp",
      "headers": { "Authorization": "Bearer <TOKEN>" }
    }
  }
}
```

## 3. Coba

Minta agenmu, misalnya:

- "Berapa total pengeluaranku bulan ini, dan kategori apa yang terbesar?"
- "Anggaran mana yang sudah terlampaui?"
- "Catat pengeluaran kopi Rp 25.000 kategori Makanan."
- "Bagaimana skor kesehatan keuanganku bulan ini, dan apa yang perlu diperbaiki?"
- "Tagihan mana yang belum lunas bulan ini? Tandai listrik sudah dibayar."
- "Berapa progres target liburanku, dan berapa yang perlu kusetor per bulan?"
- "Catat cicilan utang ke Budi Rp 500.000."

Permintaan yang mencatat atau mengubah data butuh token dengan akses tulis. Agen akan memanggil daftar kategori dulu supaya kategori dan metode pembayaran sesuai.

## Batas dan keamanan

- Agen bisa membaca dan, dengan token akses tulis, menambah dan mengubah data di semua fitur yang ada di paketmu. Yang **tidak** bisa lewat MCP: mengubah langganan atau pembayaran, mengundang atau mengeluarkan anggota, mengganti mata uang pencatatan, memulihkan cadangan, dan mengunggah lampiran struk.
- **Menghapus** selalu butuh konfirmasi eksplisit (`confirm: true`), dan datanya masuk tong sampah selama 30 hari. Pemulihannya lewat menu Tong sampah di aplikasi.
- Semua jumlah memakai **mata uang pencatatan** organisasimu, bukan selalu rupiah.
- Maksimal **60 permintaan per menit** per token dan **10 token aktif** per organisasi.
- Setiap panggilan diperiksa ulang: token belum dicabut atau kedaluwarsa, pembuatnya masih anggota organisasi, dan paketnya masih mencakup MCP.
- Semua pencatatan lewat MCP tercatat di log aktivitas dengan nama token.
- Menurunkan paket ke Gratis menutup akses MCP. Token tidak terhapus dan berfungsi lagi saat kamu naik paket.

Lihat [referensi tools](/agen-ai/referensi-tools/) untuk parameter tiap alat.

## Tampilan di aplikasi

![Kartu Akses agen AI (MCP) di Pengaturan](../../../assets/screens/id/settings-mcp.webp)
