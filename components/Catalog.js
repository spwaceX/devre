"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { fold } from "@/lib/format";

const SORTS = [
  { value: "onerilen", label: "Önerilen" },
  { value: "fiyat-artan", label: "En düşük fiyat" },
  { value: "fiyat-azalan", label: "En yüksek fiyat" },
  { value: "puan", label: "En yüksek puan" },
  { value: "indirim", label: "En yüksek indirim" },
];

const sorters = {
  "fiyat-artan": (a, b) => a.price - b.price,
  "fiyat-azalan": (a, b) => b.price - a.price,
  puan: (a, b) => b.rating - a.rating,
  indirim: (a, b) => b.discount - a.discount,
};

// Ürünlerin tamamı sunucudan bir kez geliyor; filtreleme, arama ve sıralama
// tarayıcıda anında yapılıyor. Seçimler adres çubuğuna da yazılıyor,
// böylece filtrelenmiş sayfanın bağlantısı paylaşılabiliyor.
export default function Catalog({ products, categories, initial }) {
  const [query, setQuery] = useState(initial.q);
  const [category, setCategory] = useState(initial.kategori);
  const [brands, setBrands] = useState(initial.marka);
  const [sort, setSort] = useState(initial.sirala);
  const [inStock, setInStock] = useState(initial.stokta);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Seçimleri adres çubuğuna yaz (sayfa yeniden yüklenmeden)
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category) params.set("kategori", category);
    if (brands.length) params.set("marka", brands.join(","));
    if (sort !== "onerilen") params.set("sirala", sort);
    if (inStock) params.set("stokta", "1");
    const search = params.toString();
    window.history.replaceState(null, "", search ? `/urunler?${search}` : "/urunler");
  }, [query, category, brands, sort, inStock]);

  // Seçili kategorideki markalar ve ürün sayıları
  const brandOptions = useMemo(() => {
    const counts = {};
    for (const p of products) {
      if (p.brand && (!category || p.category === category)) counts[p.brand] = (counts[p.brand] ?? 0) + 1;
    }
    return Object.entries(counts).sort(([a], [b]) => a.localeCompare(b, "tr"));
  }, [products, category]);

  const results = useMemo(() => {
    const term = fold(query.trim());
    const list = products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!brands.length || brands.includes(p.brand)) &&
        (!inStock || p.stock > 0) &&
        (!term || fold(`${p.title} ${p.brand ?? ""} ${p.categoryName}`).includes(term))
    );
    return sorters[sort] ? [...list].sort(sorters[sort]) : list;
  }, [products, query, category, brands, sort, inStock]);

  function toggleBrand(brand) {
    setBrands((current) => (current.includes(brand) ? current.filter((b) => b !== brand) : [...current, brand]));
  }

  function chooseCategory(slug) {
    setCategory(slug);
    setBrands([]); // farklı kategoride o markalar olmayabilir
  }

  function clearAll() {
    setQuery("");
    setCategory("");
    setBrands([]);
    setInStock(false);
    setSort("onerilen");
  }

  const activeCategory = categories.find((c) => c.slug === category);
  const filterCount = (category ? 1 : 0) + brands.length + (inStock ? 1 : 0);

  return (
    <div className="catalog">
      <div className="catalog-head">
        <h1>{activeCategory?.name ?? "Tüm ürünler"}</h1>
        <p className="result-count" aria-live="polite">
          {query ? `“${query}” için ` : ""}
          {results.length} ürün
        </p>
      </div>

      <div className="catalog-toolbar">
        {/* Arama üstteki arama kutusundan yapılıyor; burada aktif arama gösteriliyor */}
        {query && (
          <p className="query-chip">
            Aranan: <strong>{query}</strong>
            <button type="button" onClick={() => setQuery("")} aria-label="Aramayı kaldır">
              ×
            </button>
          </p>
        )}

        <button
          type="button"
          className="button button-outline filters-toggle"
          aria-expanded={filtersOpen}
          aria-controls="filters"
          onClick={() => setFiltersOpen((o) => !o)}
        >
          Filtrele{filterCount > 0 && ` (${filterCount})`}
        </button>

        <label className="sort">
          <span className="sr-only">Sırala</span>
          <select className="input" value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="catalog-body">
        <aside id="filters" className={`filters${filtersOpen ? " is-open" : ""}`} aria-label="Filtreler">
          <fieldset>
            <legend>Kategori</legend>
            <label className="option">
              <input type="radio" name="kategori" checked={!category} onChange={() => chooseCategory("")} />
              <span>Tümü</span>
              <span className="option-count">{products.length}</span>
            </label>
            {categories.map((c) => (
              <label key={c.slug} className="option">
                <input
                  type="radio"
                  name="kategori"
                  checked={category === c.slug}
                  onChange={() => chooseCategory(c.slug)}
                />
                <span>{c.name}</span>
                <span className="option-count">{c.count}</span>
              </label>
            ))}
          </fieldset>

          {brandOptions.length > 0 && (
            <fieldset>
              <legend>Marka</legend>
              {brandOptions.map(([brand, count]) => (
                <label key={brand} className="option">
                  <input type="checkbox" checked={brands.includes(brand)} onChange={() => toggleBrand(brand)} />
                  <span>{brand}</span>
                  <span className="option-count">{count}</span>
                </label>
              ))}
            </fieldset>
          )}

          <fieldset>
            <legend>Stok durumu</legend>
            <label className="option">
              <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
              <span>Yalnızca stokta olanlar</span>
            </label>
          </fieldset>

          {filterCount > 0 && (
            <button type="button" className="text-link clear-filters" onClick={clearAll}>
              Filtreleri temizle
            </button>
          )}
        </aside>

        {results.length > 0 ? (
          <div className="product-grid product-grid-catalog">
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 3} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>Bu arama ve filtrelere uygun ürün yok.</p>
            <button type="button" className="button button-primary" onClick={clearAll}>
              Filtreleri temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
