"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { formatTL } from "@/lib/format";

export default function CartView() {
  const { items, loaded, count, total, setQuantity, remove } = useCart();
  const [checkout, setCheckout] = useState(false);

  // Sepet tarayıcıdan okunana kadar boş sepet mesajı göstermeyelim
  if (!loaded) return <p className="muted">Sepet yükleniyor…</p>;

  if (items.length === 0) {
    return (
      <div className="empty">
        <p>Sepetin boş.</p>
        <Link href="/urunler" className="button button-primary">
          Ürünlere göz at
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <Link href={`/urun/${item.id}`} className="cart-thumb">
              <Image src={item.thumbnail} alt={item.title} fill sizes="96px" />
            </Link>

            <div className="cart-item-info">
              {item.brand && <p className="product-brand">{item.brand}</p>}
              <Link href={`/urun/${item.id}`} className="cart-item-title">
                {item.title}
              </Link>
              <p className="muted">Birim fiyat: {formatTL(item.price)}</p>
            </div>

            <div className="stepper" role="group" aria-label={`${item.title} adedi`}>
              <button
                type="button"
                aria-label="Azalt"
                disabled={item.quantity <= 1}
                onClick={() => setQuantity(item.id, item.quantity - 1)}
              >
                −
              </button>
              <output>{item.quantity}</output>
              <button
                type="button"
                aria-label="Artır"
                disabled={item.quantity >= item.stock}
                onClick={() => setQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <p className="cart-line-total">{formatTL(item.price * item.quantity)}</p>

            <button type="button" className="text-link remove" onClick={() => remove(item.id)}>
              Kaldır
            </button>
          </li>
        ))}
      </ul>

      <aside className="summary" aria-labelledby="ozet">
        <h2 id="ozet">Sipariş özeti</h2>
        <dl>
          <div>
            <dt>Ürünler ({count} adet)</dt>
            <dd>{formatTL(total)}</dd>
          </div>
          <div>
            <dt>Kargo</dt>
            <dd>Ücretsiz</dd>
          </div>
          <div className="summary-total">
            <dt>Toplam</dt>
            <dd>{formatTL(total)}</dd>
          </div>
        </dl>
        <p className="muted">KDV dahil. 12 taksitle aylık {formatTL(Math.ceil(total / 12))}.</p>

        <button type="button" className="button button-accent button-wide" onClick={() => setCheckout(true)}>
          Siparişi tamamla
        </button>
        {checkout && (
          <p className="notice" role="status">
            Devre bir demo mağaza olduğu için sipariş ve ödeme alınmıyor.
          </p>
        )}
      </aside>
    </div>
  );
}
