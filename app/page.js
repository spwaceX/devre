import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, getCatalog } from "@/lib/catalog";
import { formatTL } from "@/lib/format";

export default async function HomePage() {
  const products = await getCatalog();

  // Haftanın fırsatı: telefon ve bilgisayarlar arasında en çok TL indirimi olan stokta ürün
  const featured = products
    .filter((p) => ["telefon", "bilgisayar-tablet"].includes(p.category) && p.stock > 0 && p.oldPrice)
    .sort((a, b) => b.oldPrice - b.price - (a.oldPrice - a.price))[0];

  const deals = [...products].filter((p) => p.stock > 0).sort((a, b) => b.discount - a.discount).slice(0, 4);
  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "tr")
  );

  const categories = CATEGORIES.map((c) => {
    const items = products.filter((p) => p.category === c.slug);
    // Kategori görseli olarak o kategorinin en pahalı ürünü
    const cover = [...items].sort((a, b) => b.price - a.price)[0];
    return { ...c, count: items.length, cover };
  });

  return (
    <>
      {featured && (
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-inner">
            <div className="hero-text">
              <p className="hero-kicker">Haftanın fırsatı</p>
              <h1 id="hero-title">{featured.title}</h1>
              <p className="hero-price">
                <span className="price-tag">{formatTL(featured.price)}</span>
                <s>{formatTL(featured.oldPrice)}</s>
              </p>
              <p className="hero-note">
                %{featured.discount} indirim, 12 aya varan taksit ve ücretsiz kargo.
              </p>
              <div className="hero-actions">
                <Link href={`/urun/${featured.id}`} className="button button-accent">
                  Ürünü incele
                </Link>
                <Link href="/urunler" className="button button-ghost">
                  Tüm ürünler
                </Link>
              </div>
            </div>

            <div className="hero-stage">
              <Image
                src={featured.thumbnail}
                alt={featured.title}
                fill
                sizes="(min-width: 900px) 520px, 90vw"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </section>
      )}

      <section className="perks" aria-label="Alışveriş avantajları">
        <ul className="container perks-list">
          <li>
            <strong>Ücretsiz kargo</strong>
            <span>Tüm siparişlerde</span>
          </li>
          <li>
            <strong>12 aya varan taksit</strong>
            <span>Tüm kredi kartlarına</span>
          </li>
          <li>
            <strong>Güncel kurla TL fiyat</strong>
            <span>Fiyatlar her saat yenilenir</span>
          </li>
        </ul>
      </section>

      <div className="container">
        <section className="section" aria-labelledby="kategoriler">
          <h2 id="kategoriler" className="section-title">
            Kategoriler
          </h2>
          <ul className="category-grid">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/urunler?kategori=${c.slug}`} className="category-tile">
                  <span className="category-name">{c.name}</span>
                  <span className="category-count">{c.count} ürün</span>
                  {c.cover && (
                    <span className="category-image">
                      <Image src={c.cover.thumbnail} alt="" fill sizes="(min-width: 900px) 200px, 40vw" />
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="section" aria-labelledby="indirimler">
          <div className="section-head">
            <h2 id="indirimler" className="section-title">
              Haftanın indirimleri
            </h2>
            <Link href="/urunler?sirala=indirim" className="text-link">
              Tümünü gör
            </Link>
          </div>
          <div className="product-grid">
            {deals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="begenilenler">
          <div className="section-head">
            <h2 id="begenilenler" className="section-title">
              En beğenilenler
            </h2>
            <Link href="/urunler?sirala=puan" className="text-link">
              Tümünü gör
            </Link>
          </div>
          <div className="product-grid">
            {topRated.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        <section className="section brands" aria-labelledby="markalar">
          <h2 id="markalar" className="section-title">
            Markalar
          </h2>
          <ul className="brand-list">
            {brands.map((b) => (
              <li key={b}>
                <Link href={`/urunler?marka=${encodeURIComponent(b)}`}>{b}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
