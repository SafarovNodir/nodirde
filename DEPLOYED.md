# NodirDev - Deployed Successfully! 

## Sayt manzili
https://5bc59c9e.nodirde.pages.dev

## Admin Panel
**URL:** https://5bc59c9e.nodirde.pages.dev/admin.html

**Token:** `nodirdev-2024-secure-admin-panel`

### Admin panel imkoniyatlari:
- Xabarlarni ko'rish
- O'qilgan/o'qilmagan deb belgilash
- Xabarlarni o'chirish
- Statistikani kuzatish

## Database
**Nomi:** nodirdev-messages  
**ID:** c88d8935-05c0-467b-a671-38e4aed83427

## Contact Form API
**Endpoint:** POST `/api/contact`

Forma orqali yuborilgan xabarlar avtomatik ravishda:
1. D1 database ga saqlanadi
2. Admin panelda ko'rinadi

## Xavfsizlik
- Admin panel token bilan himoyalangan
- Token: `nodirdev-2024-secure-admin-panel`
- Token ni hech kimga bermang!

## Kelajakda yangilash
```bash
cd D:\nodirdev\nodirde
npx wrangler pages deploy .
```

## Esklatmalar
- Sayt dark/light mode ni qo'llab-quvvatlaydi
- Forma honeypot bilan botlardan himoyalangan
- Barcha ma'lumotlar Cloudflare D1 da xavfsiz saqlanadi
