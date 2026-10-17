# 📘 Panduan Setup & Struktur Folder Microservices (PRD)

## Fondasi Monorepo E-Commerce (Express.js + Prisma + PostgreSQL)

Dokumen ini adalah **panduan setup struktur proyek dan instalasi dependensi** untuk membangun arsitektur backend Microservices dari nol (_from scratch_).

Dokumen ini difokuskan pada:

1. **Struktur folder monorepo** yang rapi dan modular.
2. **Instalasi dependensi** Express.js, TypeScript, Prisma, dan PostgreSQL driver per service.
3. **Pemisahan skema database Prisma** berdasarkan domain dari folder `backend/`.
4. **Template file awal** agar Anda (atau model AI pembantu) dapat menulis konfigurasi Express, koneksi database, dan logic bisnis sendiri dari nol untuk proses belajar.

> [!IMPORTANT]
> **CATATAN PENTING:**
> Folder `/backend` yang ada saat ini **TIDAK DIUBAH / DIHAPUS** karena digunakan sebagai bahan referensi pembelajaran. Semua service baru dibuat di folder `/services/*` dan `/packages/*`.

---

## 1. Pemetaan Port & Database

Masing-masing service memiliki database PostgreSQL tersendiri:

| Service                | Port Lokal | Nama Database PostgreSQL | Tabel yang Dikelola                                                                                        |
| :--------------------- | :--------- | :----------------------- | :--------------------------------------------------------------------------------------------------------- |
| **API Gateway**        | `5000`     | _(Tanpa Database)_       | - _(Hanya Routing Proxy & Auth Guard)_                                                                     |
| **User Service**       | `5001`     | `ecom_user_db`           | `users`, `user_addresses`, `stores`                                                                        |
| **Product Service**    | `5002`     | `ecom_product_db`        | `categories`, `products`, `product_images`, `product_reviews`, `banners`, `flash_sales`                    |
| **Order Service**      | `5003`     | `ecom_order_db`          | `carts`, `cart_items`, `wishlists`, `orders`, `order_items`, `order_shipments`, `order_tracking_timelines` |
| **Payment Service**    | `5004`     | `ecom_payment_db`        | `payments`, `payment_logs`                                                                                 |
| **Frontend (Next.js)** | `3000`     | -                        | Aplikasi UI Frontend (Shop & Seller)                                                                       |

---

## 2. Struktur Direktori Lengkap (Folder Blueprint)

Berikut adalah struktur folder dan file yang perlu dibuat:

```text
Next_Ecom_micro/
├── backend/                              # [ARSIP REFERENSI - TETAP UTUH]
├── frontend/                             # [Aplikasi Next.js Frontend]
│
├── packages/
│   └── shared-types/                     # Tipe data & interface bersama (TypeScript)
│       ├── src/
│       │   ├── index.ts
│       │   ├── user.types.ts
│       │   ├── product.types.ts
│       │   ├── order.types.ts
│       │   └── payment.types.ts
│       ├── package.json
│       └── tsconfig.json
│
├── services/
│   ├── api-gateway/                      # [PORT 5000] Reverse Proxy / Entry Point
│   │   ├── src/
│   │   │   ├── config/                   # Tempat konfigurasi URL service & env
│   │   │   ├── middlewares/              # Auth middleware & error handler
│   │   │   ├── routes/                   # Routing reverse proxy
│   │   │   ├── app.ts                    # Setup Express app Anda
│   │   │   └── server.ts                 # Entry point server.listen(5000)
│   │   ├── .env.example
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── user-service/                     # [PORT 5001] User & Store Service
│   │   ├── prisma/
│   │   │   └── schema.prisma             # Skema tabel User, UserAddress, Store
│   │   ├── src/
│   │   │   ├── config/                   # Koneksi Prisma & env (Tulis sendiri)
│   │   │   ├── controllers/              # Auth, User, Store Controller
│   │   │   ├── services/                 # Business logic
│   │   │   ├── routes/                   # Route endpoints
│   │   │   ├── middlewares/              # Middleware khusus user service
│   │   │   ├── app.ts                    # Setup Express app Anda
│   │   │   └── server.ts                 # Entry point server.listen(5001)
│   │   ├── .env.example
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── product-service/                  # [PORT 5002] Product & Catalog Service
│   │   ├── prisma/
│   │   │   └── schema.prisma             # Skema Product, Category, Review, Banner
│   │   ├── src/
│   │   │   ├── config/                   # Koneksi Prisma & env (Tulis sendiri)
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── routes/
│   │   │   ├── middlewares/
│   │   │   ├── app.ts
│   │   │   └── server.ts
│   │   ├── .env.example
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── order-service/                    # [PORT 5003] Cart & Order Service
│   │   ├── prisma/
│   │   │   └── schema.prisma             # Skema Cart, Wishlist, Order, Shipment
│   │   ├── src/
│   │   │   ├── config/                   # Koneksi Prisma & env (Tulis sendiri)
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── routes/
│   │   │   ├── middlewares/
│   │   │   ├── app.ts
│   │   │   └── server.ts
│   │   ├── .env.example
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── payment-service/                  # [PORT 5004] Payment Service
│       ├── prisma/
│       │   └── schema.prisma             # Skema Payment, PaymentLog
│       ├── src/
│       │   ├── config/                   # Koneksi Prisma & env (Tulis sendiri)
│       │   ├── controllers/
│       │   ├── services/
│       │   ├── routes/
│       │   ├── middlewares/
│       │   ├── app.ts
│       │   └── server.ts
│       ├── .env.example
│       ├── package.json
│       └── tsconfig.json
│
├── package.json                          # Root package.json (Workspaces & Scripts)
├── tsconfig.base.json                    # Konfigurasi TypeScript bersama
├── prd.md                                # File ini
└── database_design.md                    # Dokumentasi rancangan awal
```

---

## 3. Panduan Instalasi Dependensi per Service

### 3.1. Root Project (`/`)

Jalankan di root folder untuk mengelola multi-service & TypeScript base:

```bash
npm install -D typescript ts-node-dev concurrently @types/node
```

#### File `tsconfig.base.json` (di root):

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  }
}
```

---

### 3.2. Package Shared Types (`packages/shared-types`)

Masuk ke folder `packages/shared-types`:

```bash
cd packages/shared-types
npm init -y
npm install -D typescript
```

#### `packages/shared-types/package.json`:

```json
{
  "name": "@ecom/shared-types",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc -w"
  }
}
```

---

### 3.3. API Gateway (`services/api-gateway`)

Masuk ke folder `services/api-gateway`:

```bash
cd services/api-gateway
npm init -y
npm install express cors dotenv helmet morgan http-proxy-middleware jsonwebtoken
npm install -D typescript ts-node-dev @types/express @types/cors @types/morgan @types/jsonwebtoken @types/node
```

#### `services/api-gateway/.env.example`:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here

USER_SERVICE_URL=http://localhost:5001
PRODUCT_SERVICE_URL=http://localhost:5002
ORDER_SERVICE_URL=http://localhost:5003
PAYMENT_SERVICE_URL=http://localhost:5004
```

---

### 3.4. User Service (`services/user-service`)

Masuk ke folder `services/user-service`:

```bash
cd services/user-service
npm init -y
npm install express cors dotenv helmet morgan @prisma/client bcryptjs jsonwebtoken zod
npm install -D typescript ts-node-dev prisma @types/express @types/cors @types/morgan @types/bcryptjs @types/jsonwebtoken @types/node
npx prisma init
```

#### `services/user-service/.env.example`:

```env
PORT=5001
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password@localhost:5432/ecom_user_db?schema=public"
JWT_SECRET=your_jwt_secret_key_here
```

---

### 3.5. Product Service (`services/product-service`)

Masuk ke folder `services/product-service`:

```bash
cd services/product-service
npm init -y
npm install express cors dotenv helmet morgan @prisma/client zod
npm install -D typescript ts-node-dev prisma @types/express @types/cors @types/morgan @types/node
npx prisma init
```

#### `services/product-service/.env.example`:

```env
PORT=5002
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password@localhost:5432/ecom_product_db?schema=public"
```

---

### 3.6. Order Service (`services/order-service`)

Masuk ke folder `services/order-service`:

```bash
cd services/order-service
npm init -y
npm install express cors dotenv helmet morgan @prisma/client axios zod
npm install -D typescript ts-node-dev prisma @types/express @types/cors @types/morgan @types/node
npx prisma init
```

#### `services/order-service/.env.example`:

```env
PORT=5003
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password@localhost:5432/ecom_order_db?schema=public"
PRODUCT_SERVICE_URL=http://localhost:5002
PAYMENT_SERVICE_URL=http://localhost:5004
```

---

### 3.7. Payment Service (`services/payment-service`)

Masuk ke folder `services/payment-service`:

```bash
cd services/payment-service
npm init -y
npm install express cors dotenv helmet morgan @prisma/client axios zod
npm install -D typescript ts-node-dev prisma @types/express @types/cors @types/morgan @types/node
npx prisma init
```

#### `services/payment-service/.env.example`:

```env
PORT=5004
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password@localhost:5432/ecom_payment_db?schema=public"
ORDER_SERVICE_URL=http://localhost:5003
PRODUCT_SERVICE_URL=http://localhost:5002
```

---

## 4. Rancangan Skema Prisma per Service

Di bawah ini adalah isi `schema.prisma` yang sudah dipisahkan untuk setiap service (berdasarkan rancangan database Anda di `backend/`):

---

### 4.1. `services/user-service/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  BUYER
  SELLER
  ADMIN
}

model User {
  id        String        @id @default(uuid())
  email     String        @unique
  password  String        @map("password")
  fullName  String        @map("full_name")
  phone     String?
  avatarUrl String?       @map("avatar_url")
  role      UserRole      @default(BUYER)
  createdAt DateTime      @default(now()) @map("created_at")
  updatedAt DateTime      @updatedAt @map("updated_at")
  store     Store?
  addresses UserAddress[]

  @@map("users")
}

model UserAddress {
  id            String   @id @default(uuid())
  userId        String   @map("user_id")
  recipientName String   @map("recipient_name")
  phone         String
  streetAddress String   @map("street_address")
  city          String
  postalCode    String   @map("postal_code")
  province      String?
  isDefault     Boolean  @default(false) @map("is_default")
  createdAt     DateTime @default(now()) @map("created_at")
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("user_addresses")
}

model Store {
  id                String   @id @default(uuid())
  userId            String   @unique @map("user_id")
  name              String
  slug              String   @unique
  description       String?
  logoUrl           String?  @map("logo_url")
  bankName          String?  @map("bank_name")
  bankAccountNumber String?  @map("bank_account_number")
  bankAccountHolder String?  @map("bank_account_holder")
  ratingCache       Decimal  @default(0.0) @map("rating_cache") @db.Decimal(3, 2)
  createdAt         DateTime @default(now()) @map("created_at")
  updatedAt         DateTime @updatedAt @map("updated_at")
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("stores")
}
```

---

### 4.2. `services/product-service/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum ProductStatus {
  ACTIVE
  INACTIVE
  DRAFT
  ARCHIVED
}

model Category {
  id          String    @id @default(uuid())
  name        String    @unique
  slug        String    @unique
  icon        String?
  description String?
  products    Product[]

  @@map("categories")
}

model Product {
  id                String          @id @default(uuid())
  storeId           String          @map("store_id")
  categoryId        String          @map("category_id")
  name              String
  slug              String          @unique
  description       String
  price             Decimal         @db.Decimal(12, 2)
  stock             Int             @default(0)
  sku               String?         @unique
  lowStockThreshold Int             @default(10) @map("low_stock_threshold")
  ratingCache       Decimal         @default(0.0) @map("rating_cache") @db.Decimal(2, 1)
  totalReviews      Int             @default(0) @map("total_reviews")
  status            ProductStatus   @default(ACTIVE)
  createdAt         DateTime        @default(now()) @map("created_at")
  updatedAt         DateTime        @updatedAt @map("updated_at")
  images            ProductImage[]
  reviews           ProductReview[]
  flashSales        FlashSale[]
  category          Category        @relation(fields: [categoryId], references: [id])

  @@index([storeId])
  @@index([categoryId])
  @@index([status])
  @@map("products")
}

model ProductImage {
  id        String  @id @default(uuid())
  productId String  @map("product_id")
  imageUrl  String  @map("image_url")
  isPrimary Boolean @default(false) @map("is_primary")
  sortOrder Int     @default(0) @map("sort_order")
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@index([productId])
  @@map("product_images")
}

model ProductReview {
  id              String    @id @default(uuid())
  productId       String    @map("product_id")
  userId          String    @map("user_id")
  orderId         String?   @map("order_id")
  rating          Int       @default(5)
  comment         String
  sellerReply     String?   @map("seller_reply")
  sellerRepliedAt DateTime? @map("seller_replied_at")
  createdAt       DateTime  @default(now()) @map("created_at")
  updatedAt       DateTime  @updatedAt @map("updated_at")
  product         Product   @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@index([productId])
  @@index([userId])
  @@map("product_reviews")
}

model Banner {
  id        String   @id @default(uuid())
  title     String
  imageUrl  String   @map("image_url")
  linkUrl   String?  @map("link_url")
  isActive  Boolean  @default(true) @map("is_active")
  sortOrder Int      @default(0) @map("sort_order")
  createdAt DateTime @default(now()) @map("created_at")

  @@map("banners")
}

model FlashSale {
  id            String   @id @default(uuid())
  productId     String   @map("product_id")
  discountPrice Decimal  @map("discount_price") @db.Decimal(12, 2)
  startTime     DateTime @map("start_time")
  endTime       DateTime @map("end_time")
  isActive      Boolean  @default(true) @map("is_active")
  product       Product  @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@index([productId])
  @@map("flash_sales")
}
```

---

### 4.3. `services/order-service/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum OrderStatus {
  PENDING_PAYMENT
  PROCESSING
  SHIPPED
  COMPLETED
  CANCELLED
}

enum ShippingService {
  REGULAR
  EXPRESS
}

model Cart {
  id        String     @id @default(uuid())
  userId    String     @unique @map("user_id")
  createdAt DateTime   @default(now()) @map("created_at")
  updatedAt DateTime   @updatedAt @map("updated_at")
  items     CartItem[]

  @@map("carts")
}

model CartItem {
  id        String   @id @default(uuid())
  cartId    String   @map("cart_id")
  productId String   @map("product_id")
  quantity  Int      @default(1)
  createdAt DateTime @default(now()) @map("created_at")
  cart      Cart     @relation(fields: [cartId], references: [id], onDelete: Cascade)

  @@unique([cartId, productId])
  @@map("cart_items")
}

model Wishlist {
  id        String   @id @default(uuid())
  userId    String   @map("user_id")
  productId String   @map("product_id")
  createdAt DateTime @default(now()) @map("created_at")

  @@unique([userId, productId])
  @@map("wishlists")
}

model Order {
  id                      String                  @id @default(uuid())
  orderNumber             String                  @unique @map("order_number")
  userId                  String                  @map("user_id")
  storeId                 String                  @map("store_id")
  subtotal                Decimal                 @db.Decimal(12, 2)
  shippingFee             Decimal                 @default(0.00) @map("shipping_fee") @db.Decimal(12, 2)
  discountAmount          Decimal                 @default(0.00) @map("discount_amount") @db.Decimal(12, 2)
  totalAmount             Decimal                 @map("total_amount") @db.Decimal(12, 2)
  orderStatus             OrderStatus             @default(PENDING_PAYMENT) @map("order_status")
  shippingAddressSnapshot Json                    @map("shipping_address_snapshot")
  createdAt               DateTime                @default(now()) @map("created_at")
  updatedAt               DateTime                @updatedAt @map("updated_at")
  items                   OrderItem[]
  shipment                OrderShipment?
  trackingTimelines       OrderTrackingTimeline[]

  @@index([userId])
  @@index([storeId])
  @@index([orderStatus])
  @@map("orders")
}

model OrderItem {
  id           String  @id @default(uuid())
  orderId      String  @map("order_id")
  productId    String  @map("product_id")
  productName  String  @map("product_name")
  productImage String? @map("product_image")
  price        Decimal @db.Decimal(12, 2)
  quantity     Int
  subtotal     Decimal @db.Decimal(12, 2)
  order        Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)

  @@index([orderId])
  @@map("order_items")
}

model OrderShipment {
  id              String          @id @default(uuid())
  orderId         String          @unique @map("order_id")
  courierName     String          @map("courier_name")
  trackingNumber  String?         @unique @map("tracking_number")
  shippingService ShippingService @default(REGULAR) @map("shipping_service")
  shippingCost    Decimal         @map("shipping_cost") @db.Decimal(12, 2)
  shippedAt       DateTime?       @map("shipped_at")
  deliveredAt     DateTime?       @map("delivered_at")
  order           Order           @relation(fields: [orderId], references: [id], onDelete: Cascade)

  @@map("order_shipments")
}

model OrderTrackingTimeline {
  id          String   @id @default(uuid())
  orderId     String   @map("order_id")
  stepOrder   Int      @map("step_order")
  stepTitle   String   @map("step_title")
  description String?
  eventTime   DateTime @default(now()) @map("event_time")
  order       Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)

  @@index([orderId, stepOrder])
  @@map("order_tracking_timelines")
}
```

---

### 4.4. `services/payment-service/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum PaymentMethod {
  BANK_TRANSFER
  E_WALLET
  COD
}

enum PaymentStatus {
  PENDING
  SUCCESS
  FAILED
  REFUNDED
}

model Payment {
  id            String        @id @default(uuid())
  orderId       String        @unique @map("order_id")
  paymentMethod PaymentMethod @map("payment_method")
  paymentStatus PaymentStatus @default(PENDING) @map("payment_status")
  amount        Decimal       @db.Decimal(12, 2)
  paidAt        DateTime?     @map("paid_at")
  createdAt     DateTime      @default(now()) @map("created_at")
  updatedAt     DateTime      @updatedAt @map("updated_at")
  logs          PaymentLog[]

  @@map("payments")
}

model PaymentLog {
  id        String   @id @default(uuid())
  paymentId String   @map("payment_id")
  event     String
  payload   Json
  createdAt DateTime @default(now()) @map("created_at")
  payment   Payment  @relation(fields: [paymentId], references: [id], onDelete: Cascade)

  @@index([paymentId])
  @@map("payment_logs")
}
```

---

## 5. Perintah Pembuatan Database di PostgreSQL Lokal

Buka pgAdmin atau terminal `psql`, lalu jalankan:

```sql
CREATE DATABASE ecom_user_db;
CREATE DATABASE ecom_product_db;
CREATE DATABASE ecom_order_db;
CREATE DATABASE ecom_payment_db;
```

Setelah database dibuat dan file `.env` diisi dengan kredensial PostgreSQL Anda, jalankan migrasi di masing-masing folder service:

```bash
# Di services/user-service:
npx prisma migrate dev --name init_user_db

# Di services/product-service:
npx prisma migrate dev --name init_product_db

# Di services/order-service:
npx prisma migrate dev --name init_order_db

# Di services/payment-service:
npx prisma migrate dev --name init_payment_db
```

---

## 6. Checklist Langkah Eksekusi Pembelajaran

- [ ] **Langkah 1:** Buat struktur folder `/packages/shared-types` dan `/services/*` beserta subfoldernya.
- [ ] **Langkah 2:** Install dependencies per service menggunakan `npm install`.
- [ ] **Langkah 3:** Salin skema `schema.prisma` ke masing-masing folder `services/*/prisma/`.
- [ ] **Langkah 4:** Buat database di PostgreSQL lokal dan lakukan migrasi Prisma (`prisma migrate dev`).
- [ ] **Langkah 5 (Mulai Belajar Koding):**
  - Tulis koneksi database Prisma Client di `src/config/db.ts` di masing-masing service.
  - Tulis setup Express app di `src/app.ts` dan `src/server.ts`.
  - Buat route dan controller pertama Anda di `user-service` (misal: Register & Login).
  - Buat reverse proxy di `api-gateway` untuk meneruskan request ke `user-service`.
