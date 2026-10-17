# Database Design Planning

Rancangan database relasional untuk mendukung aplikasi e-commerce berdasarkan struktur front-end yang sudah ditentukan.

## Entity Relationship Diagram (ERD) Overview

Sistem akan menggunakan database relasional (PostgreSQL disarankan). Berikut adalah entitas utama:

1.  **Users**: Penyimpan data pembeli dan penjual (bisa dibedakan dengan kolom `role`).
2.  **Products**: Data produk yang dijual.
3.  **Categories**: Pengelompokan produk.
4.  **Orders**: Header pesanan.
5.  **OrderItems**: Detail item dalam pesanan.
6.  **Reviews**: Ulasan pembeli terhadap produk.
7.  **Wishlist**: Item yang disimpan oleh pembeli.
8.  **Addresses**: Alamat pengiriman pembeli.

## Skema Tabel

### 1. Table `users`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `username` | VARCHAR | Unique username |
| `email` | VARCHAR | Unique email |
| `password_hash`| TEXT | Hashed password |
| `role` | ENUM | 'buyer' atau 'seller' |
| `created_at` | TIMESTAMP | Waktu pembuatan |

### 2. Table `products`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `seller_id` | UUID | Foreign Key -> `users` |
| `category_id` | UUID | Foreign Key -> `categories` |
| `name` | VARCHAR | Nama produk |
| `description` | TEXT | Deskripsi lengkap |
| `price` | DECIMAL | Harga |
| `stock` | INTEGER | Jumlah stok |
| `created_at` | TIMESTAMP | |

### 3. Table `orders`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `user_id` | UUID | Foreign Key -> `users` |
| `status` | ENUM | 'pending', 'paid', 'shipped', 'delivered', 'cancelled' |
| `total_amount` | DECIMAL | Total harga |
| `created_at` | TIMESTAMP | |

### 4. Table `order_items`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `order_id` | UUID | Foreign Key -> `orders` |
| `product_id` | UUID | Foreign Key -> `products` |
| `quantity` | INTEGER | |
| `price` | DECIMAL | Harga saat dibeli |

## Catatan Model Lain
Rancangan ini bersifat modular. Jika ingin menambah model lain seperti **Promotions** atau **Coupons**, cukup buat tabel baru dan hubungkan ke `orders` atau `products` menggunakan Foreign Key.
