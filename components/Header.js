import Link from "next/link";
import CartButton from "./CartButton";
import { CATEGORIES } from "@/lib/catalog";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-main">
        <Link href="/" className="logo" aria-label="Devre ana sayfa">
          devre
        </Link>

        <form className="search" role="search" action="/urunler">
          <label htmlFor="site-search" className="sr-only">
            Ürün, marka veya kategori ara
          </label>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input id="site-search" name="q" type="search" placeholder="Ürün, marka veya kategori ara" />
        </form>

        <CartButton />
      </div>

      <nav className="category-bar" aria-label="Kategoriler">
        <div className="container category-links">
          <Link href="/urunler">Tüm ürünler</Link>
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/urunler?kategori=${c.slug}`}>
              {c.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
