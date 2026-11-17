---
title: "Aturan otomatis dan kategori otomatis"
description: "Membuat aturan yang mengubah transaksi baru secara otomatis, dan memahami kategori yang diisi sendiri."
sidebar:
  order: 9.7
---

Paket **Personal** ke atas. Aturannya ada di **Perencanaan**, tab **Aturan Kategori**, bagian **Aturan lanjutan**.

## Aturan lanjutan

Satu aturan punya **syarat** dan **aksi**. Aturan berjalan untuk setiap transaksi baru, dari aplikasi maupun dari agen AI (MCP).

**Syarat** (1 sampai 5, semuanya harus cocok):

| Bidang | Pilihan |
|---|---|
| Nama | mengandung, sama dengan, diawali |
| Jumlah | minimal, maksimal, sama dengan |
| Rekening | sama dengan |
| Kategori | sama dengan |

**Aksi** (pilih minimal satu):

- **Ubah kategori**
- **Ganti nama jadi**
- **Tambah tag**
- **Kecualikan dari laporan**
- **Jadikan transfer ke rekening** (hanya aturan pengeluaran)
- **Kirim email ke pemilik dan admin**

Kalau dua aturan mengubah hal yang sama, yang **prioritasnya lebih tinggi** menang. Tag dari semua aturan yang cocok digabung.

### Jadikan transfer

Misalnya aturan "nama mengandung Top up GoPay" dengan aksi **Jadikan transfer ke rekening GoPay**. Setiap pengeluaran baru "Top up GoPay" dari BCA diganti menjadi transfer BCA ke GoPay, jadi tidak terhitung sebagai pengeluaran. Aksi ini dilewati kalau pengeluarannya bagian tagihan, tabungan, atau pecahan, atau kalau rekening asal dan tujuannya sama.

### Kirim email

Pemilik dan admin menerima notifikasi di aplikasi, plus email kalau paketnya punya pengingat email dan alamat notifikasi sudah diisi. Paling banyak **30 per hari** per organisasi, supaya aturan yang terlalu luas tidak membanjiri kotak masuk.

### Menjalankan ke transaksi lama

**Jalankan ke transaksi lama** menerapkan aturan ke transaksi **365 hari** terakhir. Kamu bisa melihat dulu berapa yang akan berubah. Aksi **Jadikan transfer** dan **Kirim email** tidak ikut berjalan di sini, supaya riwayatmu tidak berubah massal dan tidak ada email massal.

Satu organisasi boleh punya paling banyak 50 aturan.

## Kategori yang diisi otomatis

Saat kamu mengetik nama transaksi dan kategori masih kosong, Vaulty bisa menebak kategorinya dari kebiasaanmu sendiri (kata di nama, metode pembayaran, dan besaran jumlah). Kolomnya diberi tanda **terisi otomatis**, dan pilihanmu tidak pernah ditimpa.

- Aturan kategori buatanmu **selalu menang** atas tebakan.
- Tebakan baru muncul setelah ada minimal **30 transaksi berkategori**, dan hanya kalau keyakinannya cukup tinggi.
- Perhitungannya berjalan di server Vaulty dari datamu sendiri, tidak dikirim ke layanan luar.
- Bisa dimatikan lewat sakelar di tab **Aturan Kategori**.
