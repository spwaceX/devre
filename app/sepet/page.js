import CartView from "@/components/CartView";

export const metadata = {
  title: "Sepetim",
  robots: { index: false }, // sepet sayfasının arama sonuçlarında çıkmasına gerek yok
};

export default function CartPage() {
  return (
    <div className="container">
      <h1 className="page-title">Sepetim</h1>
      <CartView />
    </div>
  );
}
