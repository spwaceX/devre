"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Sepet tüm sayfalarda ortak; bu yüzden React Context ile paylaşılıyor.
// Sayfa yenilense de kaybolmasın diye tarayıcının localStorage'ında saklanıyor.

const CartContext = createContext(null);
const STORAGE_KEY = "devre-sepet";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // İlk açılışta kayıtlı sepeti oku
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(saved)) setItems(saved);
    } catch {
      // Gizli sekme gibi durumlarda localStorage çalışmayabilir; boş sepetle devam
    }
    setLoaded(true);
  }, []);

  // Sepet her değiştiğinde kaydet
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  function add(product, quantity = 1) {
    setItems((current) => {
      const existing = current.find((i) => i.id === product.id);
      if (existing) {
        return current.map((i) =>
          i.id === product.id ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) } : i
        );
      }
      const { id, title, brand, price, thumbnail, stock } = product;
      return [...current, { id, title, brand, price, thumbnail, stock, quantity }];
    });
  }

  function setQuantity(id, quantity) {
    setItems((current) =>
      current.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) } : i))
    );
  }

  function remove(id) {
    setItems((current) => current.filter((i) => i.id !== id));
  }

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, loaded, count, total, add, setQuantity, remove }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
