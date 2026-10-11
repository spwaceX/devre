import Link from "next/link";

export const metadata = { title: "Sayfa bulunamadı" };

export default function NotFound() {
  return (
    <div className="container message">
      <h1>Bu sayfa bulunamadı</h1>
      <p>Ürün satıştan kaldırılmış ya da adres hatalı yazılmış olabilir.</p>
      <Link href="/urunler" className="button button-primary">
        Ürünlere göz at
      </Link>
    </div>
  );
}
