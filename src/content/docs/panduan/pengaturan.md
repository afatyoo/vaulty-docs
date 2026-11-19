---
title: "Pengaturan akun"
description: "Password, verifikasi dua langkah, sesi, bahasa, mata uang, aplikasi terpasang, dan akses agen AI."
sidebar:
  order: 13
---

Buka **Pengaturan** dari ikon roda gigi di sisi kiri atau menu akun. Tiap bagian di bawah ini tersusun sebagai baris yang bisa dibuka tutup, klik judulnya untuk membuka.

![Halaman Pengaturan](../../../assets/screens/id/settings.webp)

## Ganti password

Isi password saat ini, lalu password baru dua kali (minimal 12 karakter dengan huruf besar, huruf kecil, dan angka). Perangkat lain otomatis keluar, perangkat ini tetap masuk.

## Verifikasi dua langkah (Personal ke atas)

Klik **Aktifkan TFA**, pindai kode QR dengan aplikasi authenticator (nama akunnya "Vaulty"), masukkan kode 6 digit, lalu **simpan kode pemulihan** di tempat aman. Setelah itu setiap masuk butuh kode dari aplikasi.

## Perangkat dan sesi

Daftar perangkat yang sedang masuk. Klik ikon keluar di samping perangkat yang tidak kamu kenali untuk mengeluarkannya.

## Pasang sebagai aplikasi

Kartu **Pasang aplikasi** membantu menambahkan Vaulty ke layar utama ponsel atau komputer. Di iPhone, ikuti petunjuk manual yang tampil.

## Akses agen AI (MCP)

![Kartu Akses agen AI (MCP) di Pengaturan](../../../assets/screens/id/settings-mcp.webp)

Buat token untuk menyambungkan asisten AI. Panduan lengkapnya ada di [Menyambungkan agen AI](/agen-ai/menyambungkan-mcp/).

## Notifikasi Email (Personal ke atas)

Atur alamat tujuan, lalu nyalakan **Kirim email** untuk pengingat tagihan jatuh tempo, anggaran hampir habis, dan cicilan utang (berapa hari sebelumnya dan ambang anggaran bisa diatur di sini juga).

Nyalakan **Email tiap transaksi tercatat** kalau mau dapat email setiap kali mencatat pemasukan atau pengeluaran. Mati secara bawaan. Isi **Nominal minimum** kalau cuma mau dikabari untuk transaksi di atas jumlah tertentu, kosongkan untuk semua nominal.

Tombol **Kirim Email Test** memastikan pengaturan SMTP-nya benar, dan **Periksa Sekarang** memuat ulang daftar peringatan yang sudah dikirim.

## Bahasa, tampilan, dan mata uang

- **Bahasa:** Bahasa Indonesia atau English. Semua layar, email, laporan, dan invoice mengikuti pilihan ini.
- **Tampilan:** mode terang atau gelap.
- **Mata uang tampilan** (Personal ke atas): angka dikonversi untuk ditampilkan saja, tidak mengubah data tersimpan.
- **Mata uang pencatatan:** mata uang asli tempat seluruh transaksi disimpan, dipilih pertama kali saat onboarding. Hanya pemilik organisasi yang bisa menggantinya di sini. Kalau diganti, seluruh data lama (pemasukan, pengeluaran, anggaran, tagihan, tabungan, utang) otomatis dikonversi memakai kurs hari itu, supaya nilai riilnya tetap sama walau angkanya berubah. Kalau kurs sedang tidak bisa diambil, penggantian ditolak sampai bisa dicoba lagi. Mengganti ke mata uang selain rupiah memerlukan paket Personal ke atas, sedangkan kembali ke rupiah selalu bisa.

## Passkey (semua paket)

Di bagian **Verifikasi dua langkah** ada **Passkey**: masuk dengan sidik jari, Face ID, atau PIN perangkat tanpa mengetik kata sandi.

1. Klik **Tambah passkey**, beri nama perangkatnya, dan masukkan **kata sandi saat ini**.
2. Ikuti perintah dari perangkatmu (sidik jari, Face ID, atau PIN).
3. Lain kali, klik **Masuk dengan passkey** di halaman masuk.

Masuk dengan passkey mewajibkan sidik jari, Face ID, atau PIN, jadi sudah mencakup dua faktor dan tidak meminta kode 2FA lagi. Kata sandi, Google, dan 2FA tetap bisa dipakai. Vaulty hanya menyimpan kunci publik; sidik jarimu tidak pernah keluar dari perangkat. Satu akun boleh punya sampai 10 passkey, dan menghapus atau menambahnya selalu meminta kata sandi.

## Riwayat login

Di **Perangkat dan sesi** ada **Riwayat login** selama 90 hari terakhir, termasuk percobaan dengan kata sandi salah. Alamat IP disamarkan. Kalau akunmu dimasuki dari kombinasi peramban dan sistem operasi yang baru, Vaulty mengirim **email peringatan**, supaya kamu bisa segera mengeluarkan semua sesi lain kalau itu bukan kamu.

## Notifikasi di perangkat ini

Di kartu **Pasang aplikasi** ada sakelar **Notifikasi di perangkat ini**. Kalau dinyalakan, notifikasi yang sama dengan lonceng di aplikasi (tagihan jatuh tempo, anggaran hampir habis, insight, target) juga muncul di perangkatmu walau Vaulty tidak dibuka. Isinya hanya judul dan pesan singkat. Sakelarnya per perangkat. Di iPhone dan iPad, pasang Vaulty ke layar utama dulu, lalu buka dari ikon itu. Kalau sakelarnya tidak bisa dinyalakan, berarti notifikasi push belum diaktifkan di server atau izin notifikasi di perangkatmu ditolak.

## Ringkasan email (Personal ke atas)

Di **Notifikasi Email**, pilih **Ringkasan email**: **Mati** (bawaan), **Mingguan** (tiap Senin), atau **Bulanan** (tiap tanggal 1), sekitar pukul 07.00 WIB. Isinya total pemasukan dan pengeluaran beserta perubahannya dari periode sebelumnya, kategori terboros, tagihan 7 hari ke depan, dan progres target. Setiap email punya tautan berhenti berlangganan sekali klik.
