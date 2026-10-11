// Tüm veri bu dosyadan geliyor.
// 1) Ürünler: DummyJSON REST API  → https://dummyjson.com/docs/products
// 2) Dolar kuru: Frankfurter API   → https://frankfurter.dev
// İki API de ücretsiz ve anahtar (API key) gerektirmiyor.

import { trTitle, trDescription, trReviews, trWarranty, trReturn, trShipping } from "./tr";

const PRODUCTS_API = "https://dummyjson.com";
const RATE_API = "https://api.frankfurter.dev/v1/latest?base=USD&symbols=TRY";

// Kur API'sine ulaşılamazsa fiyatlar bu kurla hesaplanır
const FALLBACK_RATE = 49;

// Sitedeki kategoriler ve API'de hangi kategorilere karşılık geldikleri
export const CATEGORIES = [
  { slug: "telefon", name: "Telefon", sources: ["smartphones"] },
  { slug: "bilgisayar-tablet", name: "Bilgisayar ve Tablet", sources: ["laptops", "tablets"] },
  { slug: "aksesuar", name: "Aksesuar", sources: ["mobile-accessories"] },
  // Mutfak kategorisinden yalnızca elektrikli aletleri alıyoruz (bıçak, kaşık vb. değil)
  { slug: "ev-aletleri", name: "Küçük Ev Aletleri", sources: ["kitchen-accessories"], only: [51, 56, 61, 66] },
];

const LIST_FIELDS = "title,brand,price,discountPercentage,rating,stock,thumbnail,category";

async function getJSON(url) {
  // Cevaplar 1 saat önbellekte tutulur, böylece sayfalar hızlı açılır
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`İstek başarısız (${res.status}): ${url}`);
  return res.json();
}

export function getCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}

function categoryOf(apiCategory, id) {
  return CATEGORIES.find(
    (c) => c.sources.includes(apiCategory) && (!c.only || c.only.includes(id))
  );
}

// Güncel dolar kuru: { rate: 49.17, date: "2026-10-09" }
export async function getRate() {
  try {
    const data = await getJSON(RATE_API);
    return { rate: data.rates.TRY, date: data.date };
  } catch {
    return { rate: FALLBACK_RATE, date: null };
  }
}

// Dolar fiyatı → TL fiyatı ve indirim öncesi fiyat
function prices(usd, discountPercentage, rate) {
  const price = Math.round(usd * rate);
  const discount = Math.round(discountPercentage);
  const oldPrice = discount > 0 ? Math.round(price / (1 - discountPercentage / 100)) : null;
  return { price, oldPrice, discount };
}

function toListItem(p, rate) {
  const category = categoryOf(p.category, p.id);
  return {
    id: p.id,
    title: trTitle(p.id, p.title),
    brand: p.brand ?? null,
    category: category.slug,
    categoryName: category.name,
    rating: p.rating,
    stock: p.stock,
    thumbnail: p.thumbnail,
    ...prices(p.price, p.discountPercentage, rate),
  };
}

// Mağazadaki tüm ürünler (listeleme sayfaları için)
export async function getCatalog() {
  const sources = CATEGORIES.flatMap((c) => c.sources);

  // Kategorileri ve kuru aynı anda istiyoruz, birbirlerini beklemiyorlar
  const [{ rate }, ...lists] = await Promise.all([
    getRate(),
    ...sources.map((s) => getJSON(`${PRODUCTS_API}/products/category/${s}?limit=0&select=${LIST_FIELDS}`)),
  ]);

  return lists
    .flatMap((data) => data?.products ?? [])
    .filter((p) => categoryOf(p.category, p.id))
    .map((p) => toListItem(p, rate));
}

// Tek bir ürünün tüm bilgileri (detay sayfası için)
export async function getProduct(id) {
  if (!/^\d+$/.test(String(id))) return null;

  const [{ rate }, p] = await Promise.all([getRate(), getJSON(`${PRODUCTS_API}/products/${id}`)]);

  // Mağazada satmadığımız bir ürün numarası girilirse "bulunamadı" gösterilir
  if (!p || !categoryOf(p.category, p.id)) return null;

  const shipping = trShipping(p.shippingInformation);
  const shipDate = new Date();
  shipDate.setDate(shipDate.getDate() + shipping.days);

  return {
    ...toListItem(p, rate),
    description: trDescription(p.id, p.description),
    images: p.images?.length ? p.images : [p.thumbnail],
    reviews: trReviews(p.reviews),
    sku: p.sku,
    warranty: trWarranty(p.warrantyInformation),
    returnPolicy: trReturn(p.returnPolicy),
    shipping: shipping.text,
    shipDate,
  };
}
