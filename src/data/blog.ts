export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "pentingnya-website-profesional-untuk-bisnis-umkm",
    title: "Pentingnya Website Profesional untuk Bisnis UMKM di Era Digital",
    excerpt: "Di era digital saat ini, memiliki website profesional bukan lagi sebuah pilihan, melainkan kebutuhan bagi setiap bisnis UMKM yang ingin berkembang.",
    content: "Di era digital saat ini, memiliki website profesional bukan lagi sebuah pilihan, melainkan kebutuhan bagi setiap bisnis UMKM yang ingin berkembang. Website menjadi etalase digital yang bisa diakses 24/7 oleh calon pelanggan dari mana saja.\n\n## Mengapa Website Penting?\n\n1. **Kredibilitas**: 84% konsumen percaya bisnis dengan website profesional lebih kredibel.\n2. **Jangkauan**: Website bisa diakses siapa saja, kapan saja, dari mana saja.\n3. **Marketing**: Website menjadi pusat aktivitas marketing digital Anda.\n4. **Informasi**: Pelanggan bisa dengan mudah mencari informasi tentang produk/layanan Anda.\n\n## Tips Memulai\n\nMulailah dengan website company profile sederhana. Pastikan desainnya responsif, loading cepat, dan informasinya lengkap. Jangan lupa integrasikan dengan media sosial dan WhatsApp untuk kemudahan komunikasi.",
    category: "business",
    author: "Mustofa Habibi Bafadhal",
    date: "2024-12-15",
    readTime: "3 min read",
  },
  {
    slug: "tips-memilih-jasa-pembuatan-website",
    title: "5 Tips Memilih Jasa Pembuatan Website yang Tepat",
    excerpt: "Tidak semua jasa pembuatan website sama. Berikut tips memilih penyedia jasa website yang tepat untuk bisnis Anda.",
    content: "Memilih jasa pembuatan website yang tepat sangat penting untuk memastikan hasil yang memuaskan. Berikut 5 tips yang perlu diperhatikan:\n\n## 1. Cek Portfolio\nLihat hasil kerja sebelumnya. Apakah desainnya konsisten? Apakah responsif di mobile?\n\n## 2. Baca Testimoni\nTestimoni klien sebelumnya bisa memberi gambaran tentang kualitas layanan.\n\n## 3. Tanyakan Teknologi yang Digunakan\nPastikan mereka menggunakan teknologi modern dan best practice terkini.\n\n## 4. Perhatikan Layanan After-Sales\nDukungan setelah website launching sama pentingnya dengan proses pembuatan.\n\n## 5. Bandingkan Harga\nHarga murah belum tentu buruk, harga mahal belum tentu baik. Pastikan sesuai dengan fitur yang ditawarkan.",
    category: "web-development",
    author: "Mustofa Habibi Bafadhal",
    date: "2024-11-28",
    readTime: "4 min read",
  },
  {
    slug: "ui-ux-trend-2025",
    title: "Tren Desain UI/UX 2025 yang Wajib Diketahui",
    excerpt: "Dunia desain UI/UX terus berevolusi. Simak tren terbaru yang akan mendominasi tahun 2025.",
    content: "Dunia desain UI/UX terus berevolusi setiap tahun. Berikut tren yang diprediksi akan mendominasi tahun 2025:\n\n## 1. Micro-interactions yang Lebih Halus\nAnimasi kecil yang memberikan feedback ke pengguna akan semakin penting.\n\n## 2. Dark Mode sebagai Standar\nHampir semua aplikasi modern kini menyediakan dark mode sebagai fitur standar.\n\n## 3. Tipografi Ekspresif\nPenggunaan font yang lebih berani dan ekspresif untuk menciptakan identitas unik.\n\n## 4. 3D dan Depth\nEfek 3D yang ringan dan depth akan semakin banyak digunakan.\n\n## 5. Personalized Experience\nKonten dan tampilan yang disesuaikan dengan preferensi pengguna.",
    category: "ui-ux",
    author: "Mustofa Habibi Bafadhal",
    date: "2024-11-10",
    readTime: "5 min read",
  },
  {
    slug: "dasar-seo-untuk-pemula",
    title: "Panduan Dasar SEO untuk Pemula",
    excerpt: "Pelajari dasar-dasar SEO yang perlu Anda ketahui untuk meningkatkan visibilitas website di mesin pencarian.",
    content: "SEO (Search Engine Optimization) adalah proses mengoptimalkan website agar muncul di peringkat atas hasil pencarian Google. Berikut dasar-dasarnya:\n\n## On-Page SEO\n1. **Meta Title & Description**: Buat title dan description yang menarik dan mengandung kata kunci.\n2. **Heading Structure**: Gunakan H1, H2, H3 secara hierarkis.\n3. **Image Alt Text**: Beri deskripsi pada setiap gambar.\n4. **URL Structure**: Buat URL yang bersih dan deskriptif.\n\n## Technical SEO\n1. **Kecepatan Website**: Pastikan loading cepat di semua perangkat.\n2. **Mobile Friendly**: Website harus responsif.\n3. **Sitemap**: Buat sitemap.xml untuk memudahkan indexing.\n4. **SSL Certificate**: Gunakan HTTPS untuk keamanan.\n\n## Content is King\nKonten berkualitas dan relevan adalah faktor terpenting dalam SEO.",
    category: "seo",
    author: "Mustofa Habibi Bafadhal",
    date: "2024-10-20",
    readTime: "4 min read",
  },
  {
    slug: "perbandingan-cms-website",
    title: "Perbandingan CMS: WordPress vs Custom vs Headless",
    excerpt: "Membandingkan kelebihan dan kekurangan berbagai jenis CMS untuk membantu Anda memilih yang terbaik.",
    content: "Memilih CMS yang tepat sangat penting untuk kemudahan pengelolaan website. Berikut perbandingannya:\n\n## WordPress\n**Kelebihan**: Mudah digunakan, banyak plugin, komunitas besar.\n**Kekurangan**: Rawan security issue, berat, terbatas secara desain.\n\n## Custom CMS\n**Kelebihan**: Sesuai kebutuhan, aman, performa optimal.\n**Kekurangan**: Biaya development lebih tinggi, butuh waktu lebih lama.\n\n## Headless CMS\n**Kelebihan**: Fleksibel, performa tinggi, omnichannel.\n**Kekurangan**: Butuh developer untuk mengelola, lebih kompleks.\n\nPilihan terbaik tergantung pada kebutuhan spesifik bisnis Anda.",
    category: "technology",
    author: "Mustofa Habibi Bafadhal",
    date: "2024-10-05",
    readTime: "3 min read",
  },
];