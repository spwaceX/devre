import Image from "next/image";
import Link from "next/link";
import Stars from "./Stars";
import { formatTL } from "@/lib/format";

export default function ProductCard({ product, priority = false }) {
  const soldOut = product.stock === 0;

  return (
    <article className="product-card">
      <Link href={`/urun/${product.id}`} className="product-link">
        <div className="product-stage">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(min-width: 1100px) 260px, (min-width: 700px) 30vw, 46vw"
            loading={priority ? "eager" : "lazy"}
          />
          {soldOut ? (
            <span className="tag tag-muted">Tükendi</span>
          ) : (
            product.discount > 0 && <span className="tag">%{product.discount} indirim</span>
          )}
        </div>

        <div className="product-text">
          {/* Markası olmayan ürünlerde kategori adı yazıyor, kartlar hizalı kalıyor */}
          <p className="product-brand">{product.brand ?? product.categoryName}</p>
          <h3 className="product-title">{product.title}</h3>
          <div className="product-rating">
            <Stars rating={product.rating} />
            <span>{product.rating.toFixed(1).replace(".", ",")}</span>
          </div>
          <p className="product-price">
            <span className="price">{formatTL(product.price)}</span>
            {product.oldPrice && <s className="old-price">{formatTL(product.oldPrice)}</s>}
          </p>
        </div>
      </Link>
    </article>
  );
}
