---
title: "Catatan perubahan"
description: "Perubahan dan fitur baru Vaulty."
sidebar:
  order: 4
---

## 30 Oktober 2026

**Diperbaiki**
- **Penarikan dari tabungan atau investasi tidak lagi dihitung sebagai pemasukan.** Dulu uang yang kamu tarik dari tabungan ikut menambah Total Pemasukan, padahal itu bukan uang baru. Sekarang uangnya tetap masuk ke saldo dompet, tetapi Total Pemasukan, grafik arus kas, skor kesehatan keuangan, proyeksi akhir bulan, total di halaman Pemasukan, laporan PDF dan Excel, dan ringkasan untuk agen AI (MCP) hanya menghitung pemasukan yang sebenarnya. Data lama ikut benar otomatis, tanpa perlu diubah.

## 28 Oktober 2026

**Baru**
- **Centang persetujuan Syarat dan Ketentuan serta Kebijakan Privasi saat daftar.** Keduanya bisa dibaca langsung lewat popup di formulir daftar, tidak perlu pindah tab atau halaman. Daftar lewat Google otomatis dianggap menyetujui keduanya, karena jalur itu tidak melewati formulir dan centangnya.
- **Halaman error bermerek untuk gangguan server (500/502/503/504).** Kalau server sedang benar-benar tidak bisa dihubungi, sekarang muncul halaman Vaulty yang jelas ("Server kami lagi bermasalah, coba lagi sebentar lagi") bukan halaman error polos nginx.

- **Titik pemisah ribuan sekarang otomatis muncul di semua kolom nominal**, bukan cuma di Tabungan: Pemasukan, Pengeluaran, Tagihan, batas Anggaran, Target Tabungan, dan tombol tambah cepat di Dashboard. Ketik 500000, langsung kebaca 500.000.

**Diubah**
- **Pemilihan mata uang pencatatan dipindah dari formulir daftar ke onboarding.** Awalnya dipilih sebelum akun dibuat; sekarang dipilih di langkah "Ruang keuanganmu" setelah akun dan organisasi ada, supaya urutannya lebih masuk akal dan formulir daftar tetap ringkas.

**Diperbaiki**
- **Teks di Pengaturan yang masih bilang "semua data disimpan dalam IDR"** sekarang diperbaiki, karena sejak ada mata uang pencatatan pilihan sendiri klaim itu sudah tidak selalu benar.
- **Berkas terjemahan yang dipakai aplikasi saat berjalan (bukan cuma saat build) sempat ketinggalan ratusan istilah**, termasuk teks persetujuan Syarat & Kebijakan Privasi di atas. Sekarang disatukan jadi satu sumber, dibuat ulang otomatis setiap kali aplikasi di-build, supaya tidak bisa ketinggalan lagi.

## 27 Oktober 2026

**Baru**
- **Mata uang pencatatan keuangan bisa dipilih sendiri, tidak lagi terkunci ke Rupiah.** Saat onboarding (langkah "Ruang keuanganmu", setelah akun dibuat), kamu sekarang memilih mata uang yang dipakai untuk mencatat transaksi (IDR, USD, EUR, dan 17 lainnya). Ini beda dari pengaturan "mata uang tampilan" yang sudah ada sebelumnya, yang cuma mengubah cara angka ditampilkan tanpa mengubah datanya; mata uang pencatatan ini adalah mata uang data aslinya.
- **Mata uang pencatatan bisa diganti kapan saja lewat Pengaturan** (khusus pemilik organisasi). Semua transaksi, anggaran, tabungan, tagihan, dan utang yang sudah tercatat otomatis dikonversi pakai kurs hari itu, jadi nilai riilnya tetap sama walau angkanya berubah. Ada konfirmasi jelas sebelum dijalankan karena ini mengubah data finansial secara permanen.
- **Nama akun tabungan/investasi sekarang menyarankan daftar yang pernah dipakai**, jadi tidak perlu mengetik ulang "Tabungan BCA" setiap kali mencatat setoran atau penarikan. Tetap bisa mengetik nama baru kalau belum pernah ada.
- **Nominal setoran dan penarikan tabungan sekarang otomatis dapat titik pemisah ribuan saat diketik** (1500000 jadi 1.500.000), biar lebih gampang dibaca.

**Diubah**
- **Halaman Pengaturan dirapikan.** Sebelumnya sembilan kartu pengaturan ditumpuk memanjang ke bawah; sekarang semuanya ada di satu tempat, terbagi jadi baris-baris yang bisa dibuka-tutup dan tertutup secara bawaan, supaya halamannya pendek dan kamu tinggal buka bagian yang dicari. Bahasa, tema, dan mata uang digabung jadi satu bagian "Preferensi".

Audit keamanan menyeluruh juga sudah selesai dikerjakan di belakang layar. Tidak ada tanda data pengguna pernah diakses lewat celah-celah yang ditemukan; semuanya ditutup sebelum dipakai siapa pun.

**Keamanan: akun dan login**
- **Aktifkan autentikasi dua faktor sekarang minta password:** sebelumnya cukup sesi yang sedang login. Sekarang kamu perlu masukin password akun dulu sebelum mulai memasang 2FA, sama seperti saat menonaktifkannya.
- **Login lewat Google dan login pakai email sekarang ikut diminta kode 2FA** kalau akunnya sudah mengaktifkan autentikasi dua faktor. Sebelumnya dua jalur ini bisa langsung masuk tanpa kode, berbeda dari login pakai username.
- **Ganti password sekarang langsung berlaku di semua jalur login**, baik masuk pakai username maupun email. Sebelumnya ada kondisi langka di mana password lama masih bisa dipakai login lewat email setelah diganti.
- **Reset password lewat "lupa password" sekarang otomatis mengeluarkan semua perangkat yang sedang login**, bukan cuma mengganti passwordnya saja. Ini supaya kalau alasan kamu reset password adalah akun dicurigai bocor, sesi yang bocor itu ikut terputus.
- **Login Google yang menautkan akun yang sempat didaftarkan duluan oleh orang lain** (dengan email yang sama tapi belum diverifikasi) sekarang otomatis membersihkan password dan sesi lama di akun itu saat ditautkan, supaya yang bisa login hanya pemilik email yang terbukti lewat Google.
- **Batas percobaan kode verifikasi 2FA saat login sekarang lebih ketat ditegakkan**, menutup celah yang sebelumnya bisa dipakai untuk mencoba banyak kode tanpa kena batas.

**Keamanan: paket dan langganan**
- **Batas transaksi dan kategori anggaran bulanan paket Gratis sekarang ditegakkan lebih konsisten**, termasuk saat mengedit transaksi yang sudah ada dan saat mencatat transaksi pertama di layar onboarding.
- **Batas jumlah anggota tim sekarang berlaku juga saat undangan diterima**, bukan cuma saat mengundang. Sebelumnya paket dengan batas anggota tetap bisa kelebihan anggota kalau undangannya diterima semua.
- **Memulihkan data dari backup sekarang ikut aturan masa tenggang dan batas paket Gratis**, sama seperti menambah data lewat form biasa.
- **Perbaikan perhitungan harga upgrade paket** supaya tidak salah terapkan kalau pembayaran telat diproses setelah periode langganan sudah berganti.
- **Rincian tagihan (alamat, NPWP) di faktur sekarang hanya bisa dilihat pemilik organisasi**, bukan semua anggota.

**Keamanan: lainnya**
- **Alamat email untuk notifikasi transaksi sekarang divalidasi formatnya dan dibatasi jumlah pengiriman uji coba per hari**, supaya fitur ini tidak bisa disalahgunakan untuk mengirim email ke alamat orang lain berkali-kali.
- Perbaikan tambahan di konsol operator (admin) dan di konfigurasi server supaya alamat IP pengguna terbaca benar oleh pembatas laju login.

## 17 Oktober 2026

**Baru**
- **Notifikasi email per transaksi (Personal ke atas):** nyalain di Pengaturan buat dapet email tiap kali pemasukan atau pengeluaran dicatat. Mati secara bawaan, dan bisa diatur nominal minimumnya biar transaksi kecil sehari-hari gak membanjiri kotak masuk.

**Diubah**
- **Pengaturan notifikasi email pindah dari Perencanaan ke Pengaturan:** tab "Notifikasi" di halaman Perencanaan dihapus, pengaturan pengingat emailnya (tagihan, anggaran, utang, dan opsi per-transaksi yang baru) sekarang ada di Pengaturan, bareng pengaturan akun lainnya.

**Diperbaiki**
- **Nama transaksi panjang di dashboard gak lagi berantakan:** di HP, nama transaksi yang panjang (misal keterangan investasi atau transfer) sebelumnya turun ke dua baris dan bikin label kategori jadi gak sejajar. Sekarang dipotong pakai titik-titik seperti bagian lain di aplikasi.
- **Tombol sekarang kerasa dipencet:** semua tombol di aplikasi sebelumnya gak ngasih efek visual pas ditekan, jadi kerasa gak responsif, apalagi di HP. Sekarang tombolnya sedikit mengecil pas lagi ditahan.

## 12 Oktober 2026

**Baru (internal)**
- **Paket custom:** konsol operator sekarang bisa bikin paket custom (misalnya batas anggota lebih banyak untuk satu keluarga) dan langsung dikasih ke satu pelanggan, tanpa perlu deploy kode. Ini tidak mengubah apa pun di paket Gratis, Personal, atau Family yang sudah ada.

## 10 Oktober 2026

**Baru**

- **Email konfirmasi daftar tunggu:** pendaftaran baru menerima email dengan template Vaulty, sesuai bahasa landing. Mendaftar ulang dengan email dan produk yang sama tidak mengirim email tambahan.


**Diperbaiki**
- **Kolom tanggal sekarang pakai kalender Vaulty sendiri:** mengisi pengeluaran, pemasukan, tabungan, tagihan, target, atau kekayaan bersih sebelumnya memakai date picker bawaan browser yang tampilannya gak nyambung. Sekarang semua kolom tanggal pakai kalender bertema Vaulty.
- **Skor kesehatan keuangan lebih jelas:** badge status gak lagi pakai emoji lingkaran warna, sekarang pakai ikon asli dengan latar warna solid biar langsung kebaca. Garis warna tipis di atas kartu skor juga dihapus.
- **Grafik arus kas sekarang selalu nampilin 6 bulan penuh:** bulan yang sama sekali gak ada transaksinya sebelumnya dilewatin gitu aja, jadi bar-nya bisa kurang dari yang seharusnya dan nyisain celah kosong gak konsisten di kanan. Sekarang grafiknya selalu tampil 6 bulan berturut-turut, termasuk yang nol. Posisi tooltip juga dibenerin biar gak nabrak badge persentase pertumbuhan.
- **Transaksi terbaru gak lagi berantakan di HP:** nama transaksi yang panjang (kayak "Uang muka ganti dudukan shock motor") bisa bikin kolom jumlah ke-dorong ke baris baru, jadi gak sejajar sama baris lain. Di layar sempit, tiap transaksi sekarang tampil jadi kartu berlabel seperti tabel lain di aplikasi, bukan baris sempit yang berantakan.

## 3 Oktober 2026

**Diperbaiki**
- **Pembayaran tidak dobel:** klik tombol bayar dua kali, atau koneksi yang gagal lalu dicoba ulang, tidak lagi membuat dua transaksi terpisah untuk pembayaran yang sama.

## 29 September 2026

**Berubah**
- **Alamat baru:** aplikasi sekarang di **apps.vaulty.id**, dokumentasi di **docs.vaulty.id**, dan situs utama di **vaulty.id**. Alamat lama otomatis dialihkan, jadi tautan dan bookmark lama tetap jalan.
- **Daftar tunggu dibuka:** selama pendaftaran belum dibuka, tombol di vaulty.id mengarah ke formulir email. Kami kabari lewat email begitu Vaulty bisa dipakai.

- **Langganan yang habis turun ke paket Gratis:** masa tenggang sekarang 1 hari (sebelumnya 7 hari), lalu akun pindah ke paket Gratis, bukan dikunci baca saja. Trial yang habis juga langsung pindah ke Gratis. Datamu tetap aman.

**Diperbaiki**
- Kartu ketiga di halaman **Insight** versi Inggris menampilkan tulisan `{count}`. Sekarang labelnya "Spending categories" (di bahasa Indonesia "Kategori pengeluaran").
- **Onboarding sempat melewati langkah pertama** untuk akun berikutnya yang masuk di tab browser yang sama (misalnya login ulang, atau daftar baru lewat Google): sekarang selalu diperiksa per akun, bukan per tab.
- **Pembayaran dari langkah "Pilih paket" di onboarding** sekarang memakai halaman pembayaran bermerek yang sama dengan menu Langganan di dashboard, bukan halaman Midtrans polos. Setelah bayar, tombol "Lanjutkan pengaturan akun" mengantar balik ke onboarding tepat di langkah berikutnya.

## 28 September 2026

**Baru**
- **Tur produk:** saat pertama masuk, Vaulty menawarkan tur yang menjelaskan tiap menu sesuai paketmu, dan bisa diulang dari menu akun.
- **Halaman pembayaran khusus** dengan Snap Midtrans tertanam, tampil layar penuh dan tanpa popup.
- **Akses agen AI (MCP)** untuk paket Personal ke atas: buat token, sambungkan asisten AI untuk membaca ringkasan dan mencatat transaksi.
- **Insight lanjutan** untuk paket Family: perbandingan dengan bulan lalu, proyeksi akhir bulan, dan pengeluaran per anggota.
- **Email:** email selamat datang, pemberitahuan pembayaran gagal atau kedaluwarsa, dan **invoice PDF** terlampir di email kuitansi.
- **Lampiran struk lewat kamera** atau unggah file.
- **Dokumentasi** ini, lengkap dengan panduan penggunaan dan screenshot.

**Diperbaiki**
- Pengingat trial memakai kalimat sendiri, bukan lagi teks masa tenggang.
- Bahasa: satu layar satu bahasa, termasuk email, PDF, dan Excel.
