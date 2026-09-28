---
title: "Keamanan akun dan data"
description: "Bagaimana Vaulty menjaga akunmu, dan hal yang bisa kamu lakukan sendiri."
sidebar:
  order: 3
---

## Yang dilakukan Vaulty

- **Password tidak disimpan apa adanya.** Yang tersimpan adalah hasil pengacakan satu arah (hash), dan Vaulty mewajibkan password minimal 12 karakter dengan huruf besar, huruf kecil, dan angka.
- **Sesi login aman.** Sesi memakai cookie yang tidak bisa dibaca skrip halaman, hanya dikirim lewat HTTPS, dan dilindungi token CSRF. Sesi berakhir otomatis kalau lama tidak dipakai, dan kamu bisa mengeluarkan perangkat lain sendiri.
- **Pembatasan percobaan.** Percobaan masuk, daftar, dan reset password dibatasi supaya tebakan password tidak bisa dilakukan berulang.
- **Verifikasi dua langkah (TOTP)** dengan kode pemulihan, untuk paket Personal ke atas. Rahasia TOTP disimpan terenkripsi.
- **Data antar organisasi terpisah.** Setiap permintaan ke server diperiksa terhadap organisasi aktifmu. Tidak ada cara melihat data organisasi lain.
- **Peran per anggota.** Pemilik, admin, member, dan viewer punya izin berbeda, dan izinnya diperiksa di server, bukan hanya disembunyikan di tampilan.
- **Tautan sekali pakai dan berbatas waktu:** verifikasi email 24 jam, reset password 1 jam, undangan anggota 7 hari.
- **Pembayaran lewat Midtrans.** Data kartu diproses Midtrans dan tidak pernah disimpan Vaulty.
- **Token agen AI (MCP)** disimpan hanya dalam bentuk hash, terikat satu organisasi, bisa dibatasi baca saja, dan bisa dicabut kapan saja.
- **Catatan aktivitas.** Perubahan data tercatat (siapa, apa, kapan), termasuk yang dilakukan lewat MCP.
- **Kotak sampah.** Data yang dihapus bisa dipulihkan.

## Yang bisa kamu lakukan

1. Pakai **password yang unik** untuk Vaulty, dan jangan dipakai di layanan lain.
2. Aktifkan **verifikasi dua langkah** dan simpan kode pemulihan di tempat aman.
3. Cek **Perangkat dan sesi** di Pengaturan, dan keluarkan perangkat yang tidak kamu kenali.
4. Perlakukan **token MCP seperti password**. Cabut token yang tidak dipakai atau yang mungkin bocor.
5. Beri anggota keluarga peran **Viewer** kalau mereka hanya perlu melihat.
6. Waspadai email yang meminta password atau kode. Vaulty tidak pernah memintanya lewat email.

## Melaporkan masalah keamanan

Kalau kamu menemukan celah atau merasa akunmu disalahgunakan, segera hubungi kami lewat email di halaman [Hubungi kami](/bantuan/kontak/) dan ganti password. Sertakan penjelasan singkat, tanpa mengirim password.
