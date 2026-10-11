"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function CartButton() {
  const { count } = useCart();

  return (
    <Link href="/sepet" className="cart-button" aria-label={`Sepetim, ${count} ürün`}>
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="19" r="1.4" fill="currentColor" />
        <circle cx="17" cy="19" r="1.4" fill="currentColor" />
      </svg>
      <span className="cart-label">Sepetim</span>
      {count > 0 && (
        // key değişince rozet yeniden oluşur ve küçük bir animasyon oynar
        <span key={count} className="cart-count">
          {count}
        </span>
      )}
    </Link>
  );
}
