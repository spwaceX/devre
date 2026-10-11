"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCart({ product }) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const max = Math.min(product.stock, 10);

  // "Sepete eklendi" mesajı 2,5 saniye sonra eski haline döner
  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 2500);
    return () => clearTimeout(timer);
  }, [added]);

  if (product.stock === 0) {
    return (
      <button type="button" className="button button-primary button-wide" disabled>
        Tükendi
      </button>
    );
  }

  return (
    <div className="add-to-cart">
      <div className="stepper" role="group" aria-label="Adet">
        <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Azalt" disabled={quantity <= 1}>
          −
        </button>
        <output aria-live="polite">{quantity}</output>
        <button type="button" onClick={() => setQuantity((q) => Math.min(max, q + 1))} aria-label="Artır" disabled={quantity >= max}>
          +
        </button>
      </div>

      <button
        type="button"
        className={`button button-primary button-wide${added ? " is-done" : ""}`}
        onClick={() => {
          add(product, quantity);
          setAdded(true);
        }}
      >
        {added ? "Sepete eklendi" : "Sepete ekle"}
      </button>

      {added && (
        <Link href="/sepet" className="text-link go-cart">
          Sepete git
        </Link>
      )}
    </div>
  );
}
