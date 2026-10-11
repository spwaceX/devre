import { CATEGORIES, getCatalog } from "@/lib/catalog";

// /sitemap.xml: sitedeki tüm sayfaların listesi (arama motorları için)
export default async function sitemap() {
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

  let products = [];
  try {
    products = await getCatalog();
  } catch {}

  return [
    { url: base, priority: 1 },
    { url: `${base}/urunler`, priority: 0.8 },
    ...CATEGORIES.map((c) => ({ url: `${base}/urunler?kategori=${c.slug}`, priority: 0.7 })),
    ...products.map((p) => ({ url: `${base}/urun/${p.id}`, priority: 0.6 })),
  ];
}
