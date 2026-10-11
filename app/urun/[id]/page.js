import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";
import Gallery from "@/components/Gallery";
import ProductCard from "@/components/ProductCard";
import Stars from "@/components/Stars";
import { getCatalog, getProduct } from "@/lib/catalog";
import { formatDate, formatDeliveryDate, formatTL } from "@/lib/format";

// Tüm ürün sayfaları yayına alınırken önceden hazırlanır, bu yüzden anında açılır
export async function generateStaticParams() {
  try {
    const products = await getCatalog();
    return products.map((p) => ({ id: String(p.id) }));
  } catch {
    return []; // API o an cevap vermezse sayfalar ilk ziyarette hazırlanır
  }
}

// Her ürün için ayrı sekme başlığı, açıklama ve paylaşım görseli (SEO)
export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Ürün bulunamadı" };

  return {
    title: product.title,
    description: `${product.description} ${formatTL(product.price)}, 12 aya varan taksit ve ücretsiz kargo.`,
    alternates: { canonical: `/urun/${product.id}` },
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.thumbnail],
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const [product, catalog] = await Promise.all([getProduct(id), getCatalog()]);
  if (!product) notFound();

  const similar = catalog
    .filter((p) => p.category === product.category && p.id !== product.id)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const monthly = Math.ceil(product.price / 12);

  // Arama motorları için ürün bilgisi (Google sonuçlarında fiyat ve stok görünebilir)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images,
    description: product.description,
    sku: product.sku,
    ...(product.brand && { brand: { "@type": "Brand", name: product.brand } }),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "TRY",
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="breadcrumb" aria-label="Sayfa yolu">
        <ol>
          <li>
            <Link href="/">Ana sayfa</Link>
          </li>
          <li>
            <Link href={`/urunler?kategori=${product.category}`}>{product.categoryName}</Link>
          </li>
          <li aria-current="page">{product.title}</li>
        </ol>
      </nav>

      <article className="detail">
        <Gallery images={product.images} title={product.title} />

        <div className="detail-info">
          {product.brand && (
            <Link href={`/urunler?marka=${encodeURIComponent(product.brand)}`} className="detail-brand">
              {product.brand}
            </Link>
          )}
          <h1>{product.title}</h1>

          <a href="#degerlendirmeler" className="detail-rating">
            <Stars rating={product.rating} />
            <span>{product.rating.toFixed(1).replace(".", ",")}</span>
            <span className="muted">({product.reviews.length} değerlendirme)</span>
          </a>

          <div className="detail-price">
            {product.oldPrice && (
              <p className="detail-old">
                <s>{formatTL(product.oldPrice)}</s>
                <span className="tag">%{product.discount} indirim</span>
              </p>
            )}
            <p className="detail-now">{formatTL(product.price)}</p>
            <p className="muted">KDV dahil. Aylık {formatTL(monthly)}'den başlayan 12 taksit.</p>
          </div>

          <AddToCart
            product={{
              id: product.id,
              title: product.title,
              brand: product.brand,
              price: product.price,
              thumbnail: product.thumbnail,
              stock: product.stock,
            }}
          />

          <ul className="delivery">
            <li>
              {product.stock === 0 ? (
                <span className="stock stock-out">Stokta yok</span>
              ) : product.stock < 10 ? (
                <span className="stock stock-low">Son {product.stock} ürün</span>
              ) : (
                <span className="stock">Stokta</span>
              )}
            </li>
            {product.stock > 0 && (
              <li>
                Tahmini kargoya teslim: <strong>{formatDeliveryDate(product.shipDate)}</strong>
              </li>
            )}
            <li>Ücretsiz kargo</li>
            <li>{product.returnPolicy}</li>
          </ul>
        </div>
      </article>

      <section className="detail-section" aria-labelledby="urun-bilgileri">
        <h2 id="urun-bilgileri" className="section-title">
          Ürün bilgileri
        </h2>
        <div className="info-grid">
          <p className="description">{product.description}</p>
          <dl className="specs">
            {product.brand && (
              <div>
                <dt>Marka</dt>
                <dd>{product.brand}</dd>
              </div>
            )}
            <div>
              <dt>Kategori</dt>
              <dd>{product.categoryName}</dd>
            </div>
            <div>
              <dt>Garanti</dt>
              <dd>{product.warranty}</dd>
            </div>
            <div>
              <dt>Kargo</dt>
              <dd>{product.shipping}</dd>
            </div>
            <div>
              <dt>İade</dt>
              <dd>{product.returnPolicy}</dd>
            </div>
            <div>
              <dt>Stok kodu</dt>
              <dd>{product.sku}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="degerlendirmeler" className="detail-section" aria-labelledby="degerlendirmeler-baslik">
        <h2 id="degerlendirmeler-baslik" className="section-title">
          Değerlendirmeler
        </h2>

        {product.reviews.length > 0 ? (
          <div className="reviews">
            <div className="review-summary">
              <p className="review-score">{product.rating.toFixed(1).replace(".", ",")}</p>
              <Stars rating={product.rating} size="lg" />
              <p className="muted">{product.reviews.length} değerlendirme</p>
            </div>

            <ul className="review-list">
              {product.reviews.map((r, i) => (
                <li key={i} className="review">
                  <div className="review-head">
                    <Stars rating={r.rating} />
                    <time dateTime={r.date}>{formatDate(r.date)}</time>
                  </div>
                  <p>{r.comment}</p>
                  <p className="review-author">{r.name}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="muted">Bu ürün için henüz değerlendirme yok.</p>
        )}
      </section>

      {similar.length > 0 && (
        <section className="detail-section" aria-labelledby="benzer">
          <h2 id="benzer" className="section-title">
            Benzer ürünler
          </h2>
          <div className="product-grid">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
