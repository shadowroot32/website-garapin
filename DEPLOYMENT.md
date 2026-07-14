# Panduan Deployment — Garapin.id

## Arsitektur

Karena website ini adalah **Company Profile (static site)** tanpa backend/database berat, deployment cukup sederhana:

```
Frontend + API Routes (Next.js) → Vercel (gratis)
     │
     └── API /api/contact → Serverless Function
```

> **Catatan:** Paket Starter/Profesional/Premium yang dijual Garapin.id berbeda. Untuk website Garapin.id sendiri, kita pakai arsitektur static + serverless function (setara Paket Starter+ ringan).

---

## 1. Deploy ke Vercel (Rekomendasi)

Vercel adalah platform buatan Next.js — paling kompatibel.

### Step-by-step:

#### a. Push ke GitHub
```bash
# Buat repo di GitHub dulu, lalu:
git init
git add .
git commit -m "Initial commit - Garapin.id website"
git remote add origin https://github.com/[username]/garapin-id.git
git push -u origin main
```

#### b. Import ke Vercel
1. Buka [vercel.com](https://vercel.com) → Login (pake GitHub)
2. Klik **Add New** → **Project**
3. Pilih repo `garapin-id`
4. **Framework Preset**: Otomatis terdeteksi `Next.js`
5. **Build Command**: Biarkan default (`next build`)
6. **Output Directory**: Biarkan default
7. **Environment Variables**: Tidak ada untuk sekarang
8. Klik **Deploy**

Selesai. Website langsung live di `https://garapin-id.vercel.app`

### Kelebihan Vercel:
- ✅ Gratis (Hobby plan — 100GB bandwidth/bulan)
- ✅ API routes (`/api/contact`) jalan otomatis sebagai serverless function
- ✅ SSL/HTTPS otomatis
- ✅ CI/CD: setiap push ke `main` auto-deploy
- ✅ Preview URL untuk setiap branch
- ✅ Analytics bawaan (opsional)

---

## 2. Deploy ke Netlify (Alternatif)

Kalau mau di Netlify:

1. Push ke GitHub (sama seperti di atas)
2. Buka [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Pilih repo
4. **Build settings:**
   - Build command: `next build`
   - Publish directory: `.next`
5. Klik **Deploy**

> **Catatan:** API routes `/api/contact` tetap bisa jalan di Netlify karena Next.js support, tapi perlu install `@netlify/plugin-nextjs`.

---

## 3. Domain Kustom

### Beli domain (jika belum):
- Niagahoster / Domainesia / Namecheap
- Contoh: `garapin.id`

### Setup di Vercel:
1. Dashboard Vercel → Project → **Settings** → **Domains**
2. Masukkan `garapin.id`
3. Ikuti instruksi untuk mengatur DNS:
   - Tambahkan CNAME record ke `cname.vercel-dns.com` (atau nameserver Vercel)

### Setup di Netlify:
1. Dashboard Netlify → **Domain settings**
2. Masukkan domain → ikuti instruksi DNS

---

## 4. Yang Perlu Dilakukan Setelah Deploy

### a. Setup Contact Form (Email/WhatsApp)

Sekarang form kontak hanya log ke console. Untuk production, update file:

**`src/app/api/contact/route.ts`**

Biar form submissions dikirim ke WhatsApp/Email:

```typescript
// Contoh: Kirim ke WhatsApp via API
export async function POST(request: Request) {
  const body = await request.json();

  // Kirim ke WhatsApp
  const waMessage = `*Pesan Baru dari Website Garapin.id*
Nama: ${body.name}
Perusahaan: ${body.company || '-'}
Kontak: ${body.contact}
Jenis Website: ${body.websiteType}
Paket: ${body.package}
Pesan: ${body.message}`;

  // Pakai API WhatsApp Business / WaboxApp / Fonnte
  await fetch('https://api.fonnte.com/send', {
    method: 'POST',
    headers: {
      'Authorization': process.env.FONNTE_TOKEN!, // Set di Vercel Env
    },
    body: JSON.stringify({
      target: '085283868884', // Nomor WA Garapin.id
      message: waMessage,
    }),
  });

  return NextResponse.json({ success: true });
}
```

**Set Environment Variable di Vercel:**
1. Dashboard Vercel → Project → **Settings** → **Environment Variables**
2. Tambah variabel seperti `FONNTE_TOKEN`, `EMAIL_PASSWORD`, dll

### b. Ganti Logo

Logo digenerate sebagai placeholder (inisial "G" di Navbar/Footer). Untuk logo asli:

1. Simpan file logo di `public/logo.svg` atau `public/logo.png`
2. Update komponen:
   - `src/components/sections/navbar.tsx` — di bagian Logo
   - `src/components/sections/footer.tsx` — di bagian Logo
   - `src/app/layout.tsx` — tambahkan `favicon.ico` di `public/`

### c. Update Konten

- **Portfolio**: Edit `src/data/portfolio.ts` — ganti data dummy dengan proyek nyata
- **Blog**: Edit `src/data/blog.ts` — ganti artikel contoh dengan artikel asli
- **Testimonial**: Edit `src/components/sections/home-client.tsx` → fungsi `TestimonialsSection`
- **Harga**: Edit `src/data/dictionaries/id.json` dan `en.json` → bagian `pricing`

### d. Setup Analytics

```bash
npm install @vercel/analytics
```

Lalu di `src/app/layout.tsx`:
```typescript
import { Analytics } from "@vercel/analytics/next";

// Di dalam <body>
<Analytics />
```

### e. Setup SEO

1. **Google Search Console**: Daftarkan domain di search.google.com
2. **Sitemap**: Generate otomatis oleh Next.js (`/sitemap.xml`)
3. **robots.txt**: Generate otomatis oleh Next.js (`/robots.txt`)
4. **Open Graph**: Tambahkan gambar OG di `public/og-image.png`

---

## 5. Checklist Final Sebelum Live

- [ ] Domain sudah diarahkan ke Vercel/Netlify
- [ ] SSL/HTTPS aktif
- [ ] Contact form mengirim ke WhatsApp/Email (bukan console.log)
- [ ] Portfolio diisi dengan data nyata (atau label "Contoh Konsep")
- [ ] Logo asli sudah diganti
- [ ] Harga sudah sesuai (konfirmasi final: 3.5jt / 5.5jt / 7jt)
- [ ] Google Analytics terpasang
- [ ] Test semua halaman di mobile & desktop
- [ ] Test form kontak
- [ ] Test language switcher ID ↔ EN

---

## 6. Hosting & Biaya

| Layanan | Kebutuhan | Estimasi |
|---------|-----------|----------|
| Domain | garapin.id | ~Rp 200.000/tahun |
| Vercel Hobby | Frontend + API | Gratis |
| WhatsApp API | Notifikasi form | Gratis (Fonnte) |
| **Total** | | **~Rp 200.000/tahun** |

---

## 7. Maintenance Rutin

- **Update dependencies**: `npm update` sebulan sekali
- **Backup**: Code sudah di GitHub, tidak perlu backup terpisah
- **Konten blog**: Update minimal 1x/bulan untuk SEO
- **Monitoring**: Vercel otomatis notif kalau site down

---

## Referensi

- [Vercel Deployment Docs](https://nextjs.org/docs/app/getting-started/deploying)
- [Next.js on Netlify](https://docs.netlify.com/frameworks/next-js/)
- [Fonnte API (WA Gateway)](https://fonnte.com)