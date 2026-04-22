# NodirDev - Backend Setup Guide

## Xususiyatlar

- **Contact Form** - Mijozlar xabarlarini qabul qilish
- **Admin Panel** - Barcha xabarlarni ko'rish va boshqarish
- **D1 Database** - Xabarlar saqlanadigan ma'lumotlar bazasi
- **Xavfsizlik** - Token orqali himoyalangan admin panel

## O'rnatish

### 1. D1 Database yaratish

```bash
# D1 database yaratish
npx wrangler d1 create nodirdev-messages

# Jadval yaratish
npx wrangler d1 execute nodirdev-messages --file=./schema.sql
```

### 2. Environment Variables sozlash

Cloudflare Dashboard → Pages → Your Project → Settings → Environment Variables:

- `ADMIN_TOKEN` - Admin panelga kirish uchun maxfiy token (masalan: `nodirdev-2024-secure`)

### 3. D1 Binding sozlash

Cloudflare Dashboard → Pages → Your Project → Settings → Functions:

- Binding name: `DB`
- Database: `nodirdev-messages`

Yoki `wrangler.toml` ni yangilang:

```toml
[[d1_databases]]
binding = "DB"
database_name = "nodirdev-messages"
database_id = "your-database-id"
```

## Admin Panel

### Kirish

- URL: `https://your-site.com/admin.html`
- Token: `ADMIN_TOKEN` da belgilagan token

### Imkoniyatlar

- Xabarlarni ko'rish
- O'qilgan/o'qilmagan deb belgilash
- Xabarlarni o'chirish
- Yangi xabarlar sonini ko'rish

## API Endpoints

### POST /api/contact

Contact form orqali xabar yuborish.

**Parameters:**
- `name` - Mijoz ismi (majburiy)
- `phone` - Telefon raqami (majburiy)
- `email` - Email (ixtiyoriy)
- `type` - Sayt turi (majburiy)
- `message` - Xabar matni (majburiy)
- `bot-field` - Honeypot (bot himoyasi)

### GET /api/messages

Barcha xabarlarni olish (faqat admin).

**Headers:**
- `Authorization: Bearer {token}`

### PUT /api/messages?id={id}

Xabarni o'qilgan deb belgilash.

**Headers:**
- `Authorization: Bearer {token}`

### DELETE /api/messages?id={id}

Xabarni o'chirish.

**Headers:**
- `Authorization: Bearer {token}`

## Deploy qilish

```bash
# Local test
npx wrangler pages dev .

# Deploy
npx wrangler pages deploy .
```

## Xavfsizlik maslahatlari

1. **Kuchli token tanlang** - `nodirdev-2024-secure-kalit` kabi
2. **Tokenni hech kimga bermang** - Faqat ishonchli odamlarga
3. **Tokenni muntazam yangilang** - Har 3-6 oyda bir
4. **Admin panel URL ni maxfiy saqlang** - Tashqi havolalar bermang
