# Pomodoro
41 + 0

# Pages
- Register Page
- Login Page
- Thread List
- Thread Detail
- Leaderboard

# Notes
fungsi api yang sebelumnya saya buat mandiri, diubah dengan mekanisme yang menyerupai projek latihan (fungsi mengembalikan fungsi-fungsi api).

# Penilaian
- [v] Buat minimal dua pengujian fungsi Reducer. 
    - [v] Terdapat lebih dari tiga pengujian fungsi reducer.
    - [vc] authedUser
    - [v] threads
    - [v] threadDetail
    - [vc] users 
- [v] Buat minimal dua pengujian Thunk Function.
    - [v] Terdapat lebih dari tiga pengujian fungsi thunks.
    - [v] asyncReceiveUsersAndThreads (shared)
    - [v] asyncPreload (isPreload)
    - [v] asyncUnvoteThreadDetail (Thread Detail)
    - [v] asyncSetAuthedUser
- [v] Buat minimal dua pengujian React Components.
    - [v] Terdapat lebih dari tiga pengujian pada React Component.
    - [vc] UpvoteButton
    - [vc] ThreadList
    - [vc] DownvoteButton
    - [vc] NewThreadForm
- [v] Buat minimal satu pengujian End-to-End untuk alur login aplikasi.
- [vc] Wajib menulis skenario pengujian pada masing-masing berkas pengujian.
- [v] Pengujian dapat dijalankan dengan perintah npm test dan npm run e2e.
- [v] Memiliki minimal 2 stories komponen.
    - [v] TextArea
    - [v] UpvoteButton
- [ ] Deploy 
    - [ ] Deploy aplikasi dengan menggunakan teknik CI/CD.
    - [ ] Continuous Integration diterapkan dengan GitHub Actions.
    - [ ] Continuous Deployment diterapkan dengan Vercel.
    - [ ] Memproteksi branch master.
    - [ ] Melampirkan URL Vercel aplikasi Anda pada catatan submission.
    - [ ] Melampirkan screenshot sebagai bukti telah menerapkan konfigurasi CI/CD dan branch protection dengan benar. Screenshot yang perlu dilampirkan:
        - [ ] 1_ci_check_error: menunjukkan CI check error karena pengujian gagal, contohnya.
        - [ ] 2_ci_check_pass: menunjukkan CI check pass karena pengujian lolos, contohnya.
        - [ ] 3_branch_protection: menunjukkan branch proteksi pada halaman PR, contohnya.
        - [ ] Screenshot dilampirkan di dalam berkas ZIP proyek. Berikut contoh struktur folder proyeknya.
- [ ] Memanfaatkan minimal satu React Ecosystem pada daftar berikut.
    - [ ] Storybook
    - [ ] react-cosmos
- [ ] Aplikasi harus tetap mempertahankan kriteria utama yang ada di submission sebelumnya.
    - [ ] Fungsionalitas Aplikasi
    - [ ] Bugs Highlighting
    - [ ] Arsitektur Aplikasi
- [v] Menerapkan saran pada submission sebelumnya, seperti:
    - [v] fitur votes pada thread dan komentar;
    - [v] menampilkan leaderboard; dan
    - [v] filter daftar thread berdasarkan kategori.
- [ ] Saran lainnya.
    - [ ] Aplikasi yang Anda bangun mudah untuk digunakan. Contohnya, tidak membuat pengguna bingung dan menggunakan warna yang mudah dalam membaca teks.
    - [ ] Aplikasi yang Anda bangun memiliki tampilkan yang menarik.