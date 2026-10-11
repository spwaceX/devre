"use client";

// Ürün API'sine ulaşılamazsa sayfa çökmek yerine bu ekran gösterilir
export default function Error({ reset }) {
  return (
    <div className="container message">
      <h1>Ürünler şu an yüklenemiyor</h1>
      <p>Ürün bilgilerini aldığımız servise ulaşılamadı. Birkaç saniye sonra tekrar deneyin.</p>
      <button type="button" className="button button-primary" onClick={() => reset()}>
        Tekrar dene
      </button>
    </div>
  );
}
