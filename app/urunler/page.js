import Catalog from "@/components/Catalog";
import { CATEGORIES, getCatalog, getCategory } from "@/lib/catalog";

// Sekme başlığı seçili kategoriye göre değişiyor (ör. "Telefon | Devre")
export async function generateMetadata({ searchParams }) {
  const { kategori } = await searchParams;
  const category = getCategory(kategori);
  return {
    title: category ? category.name : "Tüm ürünler",
    description: category
      ? `${category.name} kategorisindeki ürünler, güncel TL fiyatları ve taksit seçenekleriyle.`
      : "Telefon, bilgisayar, tablet, aksesuar ve küçük ev aletleri.",
    alternates: { canonical: category ? `/urunler?kategori=${category.slug}` : "/urunler" },
  };
}

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const products = await getCatalog();

  const categories = CATEGORIES.map(({ slug, name }) => ({
    slug,
    name,
    count: products.filter((p) => p.category === slug).length,
  }));

  // Adresteki seçimler (ör. /urunler?kategori=telefon&marka=Apple) sayfanın başlangıç durumu oluyor
  const initial = {
    q: params.q?.trim() ?? "",
    kategori: getCategory(params.kategori) ? params.kategori : "",
    marka: params.marka ? params.marka.split(",") : [],
    sirala: params.sirala ?? "onerilen",
    stokta: params.stokta === "1",
  };

  // key: kategori menüsünden başka bir bağlantıya tıklanınca filtreler sıfırdan kurulsun
  return (
    <div className="container">
      <Catalog key={JSON.stringify(initial)} products={products} categories={categories} initial={initial} />
    </div>
  );
}
