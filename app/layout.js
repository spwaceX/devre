import { Archivo } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

// Archivo, genişliği ayarlanabilen (değişken) bir yazı tipi:
// başlıklarda geniş, metinlerde normal genişlikte kullanıyoruz.
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

// Vercel'de yayındaki adresi otomatik alır; bilgisayarda localhost kullanılır
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Devre | Telefon, Bilgisayar ve Aksesuar",
    template: "%s | Devre",
  },
  description:
    "Telefon, bilgisayar, tablet, aksesuar ve küçük ev aletleri. Güncel kurla TL fiyatlar, 12 aya varan taksit ve ücretsiz kargo.",
  openGraph: {
    siteName: "Devre",
    locale: "tr_TR",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#16233a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={archivo.variable}>
      <body>
        <CartProvider>
          <a href="#icerik" className="skip-link">
            İçeriğe geç
          </a>
          <Header />
          <main id="icerik">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
