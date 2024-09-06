# PetCare | Website Booking Dokter Hewan

#### 
Deskripsi Umum: PetCare Pro adalah sebuah platform online yang dirancang untuk mempermudah pemilik hewan peliharaan dalam memesan layanan dokter hewan. Website ini menyediakan solusi lengkap mulai dari pencarian dokter hewan berdasarkan spesialisasi hingga pemesanan kunjungan dengan berbagai fitur pendukung.

## Skema Database

#### Fitur Utama

Seharusnya Fitur Utama Seperti Dibawah Ini

- **Pendaftaran dan Autentikasi Pengguna**
Pendaftaran akun untuk Owner dan User.
Login dan logout.
Pengelolaan profil pengguna (update informasi, ubah password).


- **Manajemen Data Hewan**
Tambah, edit, dan hapus data Animal.
Melihat detail hewan.
Menampilkan daftar hewan berdasarkan Owner.

- **Manajemen Data Dokter Hewan**
Tampilan daftar Doctor dengan spesialisasi dan informasi kontak.
Pencarian dan filter dokter berdasarkan spesialisasi atau nama.
Melihat detail dokter.

- **Pemesanan Layanan**
Membuat pemesanan untuk layanan dokter hewan (Booking).
Menyediakan pilihan tanggal check-in dan check-out.
Menyimpan informasi pemesanan, termasuk jumlah tamu dan total harga.

- **Manajemen Pemesanan**
Melihat daftar pemesanan yang telah dibuat.
Mengelola pemesanan (edit atau batalkan).
Menampilkan detail pemesanan.

- **Filter dan Pencarian**
Filter dokter berdasarkan spesialisasi atau ketersediaan.
Pencarian hewan atau dokter berdasarkan nama.

- **Dashboard dan Statistik**
Menampilkan statistik pemesanan dan data hewan.
Dashboard untuk Owner dan User untuk melihat ringkasan informasi terkait pemesanan dan hewan.

- **Notifikasi dan Pemberitahuan**
Notifikasi tentang status pemesanan.
Pengingat untuk jadwal check-in atau check-out.

- **Laporan dan History**
Melihat riwayat pemesanan dan perawatan hewan.
Laporan pemesanan dan aktivitas dokter hewan.

- **Pengaturan dan Preferensi**
Pengaturan profil pengguna (Owner dan User).
Preferensi sistem (misalnya, pengaturan notifikasi).

Fitur Tambahan
Integrasi Kalender: Sinkronisasi jadwal pemesanan dengan kalender eksternal.
Ulasan dan Rating: Memberikan ulasan dan rating untuk dokter hewan setelah pemesanan selesai.
Pengelolaan Keuangan: Fitur untuk melacak pembayaran dan tagihan (jika diperlukan).
User Roles and Permissions
Owner: Memiliki akses ke fitur untuk mengelola hewan, membuat pemesanan, dan melihat riwayat.
User: Dapat mendaftar, login, mencari dokter, dan membuat pemesanan (jika diperlukan).




##ERD


        +--------------------------------------------------------------------+
        |                                                                    |
        |                                                                    |   
+------------------+       +------------------+      +------------------+    |
|      Owner       |       |    Animal        |      |    Booking       |    | 
|------------------|       |------------------|      |------------------|    |
| id (PK)          |------<| id (PK)          |      | id (PK)          | >--+
| name             |       | species          |      | owner_id (FK)    |
| address          |       | name             |      | doctor_id (FK)   |
| contact_info     |       | age              |      | checkInDate      |
|                  |       | gender           |      | checkOutDate     |
|                  |       | weight           |      | numberOfGuests   |
|                  |       | disease          |      | totalPrice       |
|                  |       | owner_id (FK)    |      +------------------+
|                  |       +------------------+               V
|                  |                                          |                     
|                  |                                          | 
|                  |       +------------------+               |
|                  |       |    Doctor        |               |
|                  |       |------------------|               |
|                  |       | id (PK)          | --------------+        
|                  |       | name             |      
|                  |       | specialty        |      
|                  |       | contact_info     |      
|                  |       +------------------+      
+------------------+


## Tech Stack

- Frontend: React & Tailwind.css
- Backend: Java
- DB: MySql
