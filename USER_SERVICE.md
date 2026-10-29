# 📖 Dokumentasi User Service

Dokumentasi teknis dan spesifikasi API untuk layanan **User Service** pada arsitektur microservices *Next E-Commerce*.

---

## 📌 Daftar Isi
1. [Gambaran Umum](#-gambaran-umum)
2. [Arsitektur & Struktur Folder](#-arsitektur--struktur-folder)
3. [Konfigurasi & Menjalankan Service](#-konfigurasi--menjalankan-service)
4. [Autentikasi & Autorisasi](#-autentikasi--autorisasi)
5. [Skema Database (Prisma)](#-skema-database-prisma)
6. [Koleksi Endpoint API](#-koleksi-endpoint-api)
   - [Health Check](#1-health-check)
   - [User Endpoints (Buyer)](#2-user-endpoints-buyer)
   - [Seller Endpoints](#3-seller-endpoints)
   - [Store Endpoints](#4-store-endpoints)
   - [Address Endpoints](#5-address-endpoints)
7. [Format Respons & Error Handling](#-format-respons--error-handling)

---

## 🔭 Gambaran Umum

**User Service** bertanggung jawab mengelola seluruh identitas pengguna (Buyer dan Seller), profil toko (*Store*), serta buku alamat pengiriman (*User Address*).

- **Teknologi**: Node.js, Express.js (v5), TypeScript
- **Database ORM**: PostgreSQL via Prisma Client v7
- **Autentikasi & Validasi**: JSON Web Token (JWT), BcryptJS, Zod
- **Port Default**: `5001`
- **Base URL**: `http://localhost:5001`

---

## 🏛 Arsitektur & Struktur Folder

Layanan ini mengadopsi prinsip **Clean Architecture / Onion Architecture** agar bisnis logic terisolasi dari framework eksternal:

```text
services/user-service/src/
├── application/             # Bisnis logic & DTO
│   ├── errors/              # Domain & HTTP custom errors
│   └── use-cases/           # Implementasi use case (user, seller, store, address)
├── container/               # Dependency Injection container
├── domain/                  # Core entities & repository interfaces
│   ├── entities/
│   └── repositories/
├── infrastructure/          # Implementasi database & security
│   ├── database/prisma/     # Prisma client & repository implementations
│   └── security/            # JWT, Bcrypt password hasher
├── presentation/            # Entry point HTTP (Express)
│   ├── controllers/         # Controller per domain
│   ├── middlewares/         # authMiddleware, validateRequest, errorHandler
│   └── routes/              # Routing endpoint Express
├── types/                   # Type definitions custom Express
├── app.ts                   # Konfigurasi aplikasi Express
└── server.ts                # Entry point server listener
```

---

## ⚙ Konfigurasi & Menjalankan Service

### 1. Environment Variables (`.env`)
Buat atau sesuaikan file `.env` di dalam direktori `services/user-service/.env`:

```env
PORT=5001
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password@localhost:5432/ecom_user_db?schema=public"
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=1h
```

### 2. Instalasi & Menjalankan Service

```bash
# Dari root project atau direktori services/user-service:
cd services/user-service

# Install dependencies (jika belum)
npm install

# Generate Prisma Client & Migrasi Database
npx prisma generate
npx prisma db push

# Menjalankan dalam mode development (live-reload dengan tsx)
npm run dev
```

---

## 🔐 Autentikasi & Autorisasi

Service ini menggunakan mekanisme **Bearer Token JWT** yang disematkan pada request header:

```http
Authorization: Bearer <TOKEN_JWT>
```

- **Role yang Tersedia**:
  - `BUYER`: Diberikan saat registrasi melalui `/user/register`.
  - `SELLER`: Diberikan saat registrasi melalui `/seller/register`.
  - `ADMIN`: Khusus kebutuhan administrasi.
- **Middleware Keamanan**:
  - `authMiddleware`: Memvalidasi keberadaan token JWT dan mengekstrak `userId` (`req.user`) serta `userRole`.
  - `requireRole(['SELLER'])`: Membatasi akses endpoint hanya untuk role tertentu (misal: pengelolaan profil seller dan toko).

---

## 🗄 Skema Database (Prisma)

### Relasi Entitas
```mermaid
erDiagram
    User ||--o| Store : "owns (1:1)"
    User ||--o{ UserAddress : "has many (1:N)"

    User {
        string id PK "UUID"
        string email UK
        string password
        string fullName
        string phone
        string avatarUrl
        enum role "BUYER | SELLER | ADMIN"
        datetime createdAt
        datetime updatedAt
    }

    Store {
        string id PK "UUID"
        string userId FK "Unique"
        string name
        string slug UK
        string description
        string logoUrl
        string bankName
        string bankAccountNumber
        string bankAccountHolder
        decimal ratingCache "Default 0.0"
        datetime createdAt
        datetime updatedAt
    }

    UserAddress {
        string id PK "UUID"
        string userId FK
        string recipientName
        string phone
        string streetAddress
        string city
        string postalCode
        string province
        boolean isDefault "Default false"
        datetime createdAt
    }
```

---

## 📡 Koleksi Endpoint API

### 1. Health Check

#### `GET /health`
Mengecek status ketersediaan User Service.

- **Akses**: Public
- **Respon (200 OK)**:
  ```json
  {
    "status": "success",
    "service": "User Service",
    "message": "User Service is healthy and running 🚀",
    "timestamp": "2026-10-17T11:00:00.000Z"
  }
  ```

---

### 2. User Endpoints (Buyer)
Prefix: `/user`

#### `POST /user/register`
Mendaftarkan akun pengguna baru dengan role default `BUYER`.

- **Akses**: Public
- **Request Body**:
  | Field | Tipe | Wajib | Keterangan |
  |---|---|---|---|
  | `fullName` | `string` | Ya | Minimal 3 karakter |
  | `email` | `string` | Ya | Format email valid |
  | `password` | `string` | Ya | Minimal 4 karakter |

  ```json
  {
    "fullName": "Budi Santoso",
    "email": "budi@example.com",
    "password": "password123"
  }
  ```
- **Respon (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Registered Successful",
    "data": {
      "id": "e98e7279-d65b-4ec9-8681-79b88939c322",
      "fullName": "Budi Santoso",
      "email": "budi@example.com"
    }
  }
  ```

#### `POST /user/login`
Melakukan autentikasi akun pengguna.

- **Akses**: Public
- **Request Body**:
  ```json
  {
    "email": "budi@example.com",
    "password": "password123"
  }
  ```
- **Respon (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Login Successful",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

---

### 3. Seller Endpoints
Prefix: `/seller`

#### `POST /seller/register`
Mendaftarkan akun penjual baru dengan role `SELLER`.

- **Akses**: Public
- **Request Body**:
  ```json
  {
    "fullName": "Toko Berkah Official",
    "email": "seller@tokoberkah.com",
    "password": "sellerpassword123"
  }
  ```
- **Respon (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Registered Successful",
    "data": {
      "id": "c62391ea-2713-4318-97c7-013149be3e32",
      "fullName": "Toko Berkah Official",
      "email": "seller@tokoberkah.com"
    }
  }
  ```

#### `POST /seller/login`
Autentikasi akun Seller dan mendapatkan token JWT role `SELLER`.

- **Akses**: Public
- **Request Body**:
  ```json
  {
    "email": "seller@tokoberkah.com",
    "password": "sellerpassword123"
  }
  ```
- **Respon (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Login Successful",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

#### `PATCH /seller/`
Memperbarui data profil akun Seller yang sedang login.

- **Akses**: Protected (`SELLER` only)
- **Headers**: `Authorization: Bearer <SELLER_TOKEN>`
- **Request Body**:
  | Field | Tipe | Wajib | Keterangan |
  |---|---|---|---|
  | `fullName` | `string` | Tidak | Minimal 3 karakter |
  | `email` | `string` | Tidak | Format email valid |
  | `phone` | `string` | Tidak | Minimal 10 digit |
  | `avatarUrl` | `string` | Tidak | URL gambar profil |

  ```json
  {
    "fullName": "Toko Berkah Jaya",
    "phone": "081234567890",
    "avatarUrl": "https://example.com/avatar.jpg"
  }
  ```
- **Respon (202 Accepted)**:
  ```json
  {
    "success": true,
    "message": "Update Success",
    "data": {
      "id": "c62391ea-2713-4318-97c7-013149be3e32",
      "fullName": "Toko Berkah Jaya",
      "email": "seller@tokoberkah.com",
      "phone": "081234567890",
      "avatarUrl": "https://example.com/avatar.jpg"
    }
  }
  ```

---

### 4. Store Endpoints
Prefix: `/store`

#### `GET /store/`
Mendapatkan profil toko milik seller yang sedang login.

- **Akses**: Protected (`SELLER` only)
- **Headers**: `Authorization: Bearer <SELLER_TOKEN>`
- **Respon (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Store Retrieve successful",
    "data": {
      "name": "Toko Berkah",
      "slug": "toko-berkah",
      "description": "Menyediakan aneka perlengkapan harian",
      "logoUrl": "https://example.com/store-logo.png",
      "bankName": "BCA",
      "bankAccountNumber": "1234567890",
      "bankAccountHolder": "Toko Berkah Jaya",
      "ratingCache": "4.90",
      "createdAt": "2026-10-01T08:30:00.000Z"
    }
  }
  ```

#### `GET /store/:slug`
Melihat profil toko publik berdasarkan *slug* toko.

- **Akses**: Public
- **Params**: `slug` (contoh: `toko-berkah`)
- **Respon (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Store Retrieve successful",
    "data": {
      "name": "Toko Berkah",
      "slug": "toko-berkah",
      "description": "Menyediakan aneka perlengkapan harian",
      "logoUrl": "https://example.com/store-logo.png",
      "bankName": "BCA",
      "bankAccountNumber": "1234567890",
      "bankAccountHolder": "Toko Berkah Jaya",
      "ratingCache": "4.90",
      "createdAt": "2026-10-01T08:30:00.000Z"
    }
  }
  ```

#### `POST /store/create`
Membuat profil toko baru bagi seller yang belum memiliki toko.

- **Akses**: Protected (`SELLER` only)
- **Headers**: `Authorization: Bearer <SELLER_TOKEN>`
- **Request Body**:
  | Field | Tipe | Wajib | Keterangan |
  |---|---|---|---|
  | `name` | `string` | Ya | Nama toko |
  | `slug` | `string` | Ya | Unique identifier URL-friendly |
  | `description` | `string` | Tidak | Deskripsi singkat toko |
  | `logoUrl` | `string` | Tidak | URL logo toko |
  | `bankName` | `string` | Tidak | Nama bank pencairan |
  | `bankAccountNumber`| `string` | Tidak | Nomor rekening bank |
  | `bankAccountHolder`| `string` | Tidak | Nama pemegang rekening |

  ```json
  {
    "name": "Toko Berkah",
    "slug": "toko-berkah",
    "description": "Menyediakan aneka perlengkapan harian",
    "logoUrl": "https://example.com/store-logo.png",
    "bankName": "BCA",
    "bankAccountNumber": "1234567890",
    "bankAccountHolder": "Toko Berkah Jaya"
  }
  ```
- **Respon (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Store Created Successful",
    "data": {
      "name": "Toko Berkah",
      "slug": "toko-berkah",
      "description": "Menyediakan aneka perlengkapan harian",
      "logoUrl": "https://example.com/store-logo.png",
      "bankName": "BCA",
      "bankAccountNumber": "1234567890",
      "bankAccountHolder": "Toko Berkah Jaya",
      "ratingCache": "0.00",
      "createdAt": "2026-10-17T11:00:00.000Z"
    }
  }
  ```

#### `PATCH /store/update`
Memperbarui informasi profil toko yang dimiliki seller saat ini.

- **Akses**: Protected (`SELLER` only)
- **Headers**: `Authorization: Bearer <SELLER_TOKEN>`
- **Request Body**: Semua field bersifat opsional (`name`, `slug`, `description`, `logoUrl`, `bankName`, `bankAccountNumber`, `bankAccountHolder`).
  ```json
  {
    "description": "Toko resmi terpercaya dengan promo setiap hari",
    "bankAccountNumber": "0987654321"
  }
  ```
- **Respon (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Store Updated Successful",
    "data": {
      "name": "Toko Berkah",
      "slug": "toko-berkah",
      "description": "Toko resmi terpercaya dengan promo setiap hari",
      "logoUrl": "https://example.com/store-logo.png",
      "bankName": "BCA",
      "bankAccountNumber": "0987654321",
      "bankAccountHolder": "Toko Berkah Jaya"
    }
  }
  ```

---

### 5. Address Endpoints
Prefix: `/address`

> **Catatan**: Semua endpoint di `/address` terlindungi oleh `authMiddleware`. Baik pengguna dengan role `BUYER` maupun `SELLER` dapat memiliki alamat.

#### `POST /address/`
Menambahkan alamat pengiriman baru untuk user yang sedang login.

- **Akses**: Protected (User Token)
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Request Body**:
  | Field | Tipe | Wajib | Keterangan |
  |---|---|---|---|
  | `recipientName` | `string` | Ya | Minimal 2 karakter |
  | `phone` | `string` | Ya | Minimal 10 karakter |
  | `streetAddress` | `string` | Ya | Minimal 5 karakter |
  | `city` | `string` | Ya | Minimal 2 karakter |
  | `postalCode` | `string` | Ya | Minimal 3 karakter |
  | `province` | `string` | Tidak | Nama provinsi |
  | `isDefault` | `boolean`| Tidak | Set sebagai alamat utama (default: `false`) |

  ```json
  {
    "recipientName": "Budi Santoso",
    "phone": "081298765432",
    "streetAddress": "Jl. Merdeka No. 45, RT 01/RW 02",
    "city": "Jakarta Selatan",
    "postalCode": "12340",
    "province": "DKI Jakarta",
    "isDefault": true
  }
  ```
- **Respon (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Address created successfully",
    "data": {
      "id": "761dcb89-6bc3-4873-9824-0466fc4cf417",
      "userId": "e98e7279-d65b-4ec9-8681-79b88939c322",
      "recipientName": "Budi Santoso",
      "phone": "081298765432",
      "streetAddress": "Jl. Merdeka No. 45, RT 01/RW 02",
      "city": "Jakarta Selatan",
      "postalCode": "12340",
      "province": "DKI Jakarta",
      "isDefault": true,
      "createdAt": "2026-10-17T11:00:00.000Z"
    }
  }
  ```

#### `GET /address/`
Mendapatkan daftar semua alamat milik pengguna yang sedang login.

- **Akses**: Protected (User Token)
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Respon (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Addresses retrieved successfully",
    "data": [
      {
        "id": "761dcb89-6bc3-4873-9824-0466fc4cf417",
        "userId": "e98e7279-d65b-4ec9-8681-79b88939c322",
        "recipientName": "Budi Santoso",
        "phone": "081298765432",
        "streetAddress": "Jl. Merdeka No. 45, RT 01/RW 02",
        "city": "Jakarta Selatan",
        "postalCode": "12340",
        "province": "DKI Jakarta",
        "isDefault": true,
        "createdAt": "2026-10-17T11:00:00.000Z"
      }
    ]
  }
  ```

#### `PATCH /address/:id/default`
Menetapkan salah satu alamat menjadi alamat default (alamat lainnya otomatis diset bukan default).

- **Akses**: Protected (User Token)
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Params**: `id` (Address UUID)
- **Respon (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Address set as default successfully",
    "data": {
      "id": "761dcb89-6bc3-4873-9824-0466fc4cf417",
      "userId": "e98e7279-d65b-4ec9-8681-79b88939c322",
      "recipientName": "Budi Santoso",
      "phone": "081298765432",
      "streetAddress": "Jl. Merdeka No. 45, RT 01/RW 02",
      "city": "Jakarta Selatan",
      "postalCode": "12340",
      "province": "DKI Jakarta",
      "isDefault": true
    }
  }
  ```

#### `DELETE /address/:id`
Menghapus data alamat berdasarkan ID.

- **Akses**: Protected (User Token)
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Params**: `id` (Address UUID)
- **Respon (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Address deleted successfully"
  }
  ```

---

## 🛑 Format Respons & Error Handling

Seluruh respon error ditangani secara tersentralisasi melalui `errorHandler` middleware.

### 1. Struktur Respon Error Validasi (400 Bad Request)
Jika input request body tidak memenuhi skema Zod:
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    {
      "path": "email",
      "message": "Email not valid"
    },
    {
      "path": "password",
      "message": "Password must be 4 characters min"
    }
  ]
}
```

### 2. Unauthorized Error (401 Unauthorized)
Jika token tidak disertakan, format tidak valid, atau kadaluarsa:
```json
{
  "success": false,
  "message": "Token Is Missing"
}
```
Atau jika hak akses tidak sesuai role:
```json
{
  "success": false,
  "message": "Unauthorized: Insufficient permissions"
}
```

### 3. Not Found Error (404 Not Found)
Jika entitas tidak ditemukan di database:
```json
{
  "success": false,
  "message": "Store not found"
}
```

### 4. Conflict / Duplicate (409 Conflict)
Jika email atau slug toko sudah terdaftar sebelumnya:
```json
{
  "success": false,
  "message": "Email already exists"
}
```

