import Link from "next/link";
import { CATEGORIES, getRate } from "@/lib/catalog";
import { formatDate } from "@/lib/format";

export default async function Footer() {
  const { rate, date } = await getRate();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <section>
          <p className="logo logo-footer">devre</p>
          <p className="footer-note">
            Devre, İleri Web Tasarım dersi için hazırlanmış bir demo teknoloji mağazasıdır. Sipariş ve ödeme
            alınmaz.
          </p>
        </section>

        <nav aria-label="Alt menü kategoriler">
          <h2>Kategoriler</h2>
          <ul>
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/urunler?kategori=${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <section>
          <h2>Veriler</h2>
          <ul>
            <li>
              Ürünler: <a href="https://dummyjson.com" rel="noopener" target="_blank">DummyJSON API</a>
            </li>
            <li>
              Döviz kuru: <a href="https://frankfurter.dev" rel="noopener" target="_blank">Frankfurter API</a>
            </li>
            <li>
              1 USD = {rate.toFixed(2).replace(".", ",")} TL
              {date ? ` (${formatDate(date)})` : " (tahmini kur)"}
            </li>
          </ul>
        </section>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Devre. Fiyatlara KDV dahildir.</p>
      </div>
    </footer>
  );
}
