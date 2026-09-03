# Racikan Rindu Dashboard v2

Update ini mengikuti workbook terbaru **Point Pelanggan (1).xlsx** dan menambahkan **dropdown kategori menu pada sistem rekomendasi**.

## Data terbaru
- Pelanggan: 20
- Reward: 160
- Kategori: Sea Salt Latte Series, Latte Series, Double Cheese Series, Cheese Series, Non Cheese Series
- Top 3: Nurul (333), Dafi (282), Farhan (254)

## Fitur kategori
1. Pada bagian **Point Checker**, pelanggan dapat memilih:
   - Semua kategori
   - Sea Salt Latte Series, Latte Series, Double Cheese Series, Cheese Series, Non Cheese Series
2. Setelah rekomendasi muncul, pelanggan masih dapat mengganti kategori melalui dropdown **Filter Reward**.
3. Kartu reward menampilkan badge kategori.
4. Bagian **Semua pilihan rasa** juga punya filter kategori.
5. WhatsApp otomatis menyertakan kategori menu yang dipilih.

## Struktur Google Sheets terbaru
Sheet `Database`:
- A: No
- B: Nama Produk
- C: Varian/Kategori
- D: Ukuran Varian
- E: Poin

Sheet `Point Pelanggan`:
- A: No
- B: Data Pelanggan
- C: Point Pelanggan

## Hubungkan Google Sheets secara live
1. Buka Google Sheet.
2. Extensions → Apps Script.
3. Tempel isi `apps-script.gs`.
4. Deploy → New deployment → Web app.
5. Execute as: **Me**.
6. Who has access: **Anyone**.
7. Copy URL `/exec`.
8. Buka `app.js`, ubah:
   `const LIVE_MODE = true;`
   `const API_URL = "URL_WEB_APP_KAMU";`
9. Upload `index.html`, `styles.css`, `app.js` ke hosting statis.

Mode demo saat ini menggunakan snapshot data workbook terbaru, jadi website tetap bisa dibuka tanpa API.
