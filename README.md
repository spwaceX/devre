# Devre – Teknoloji Mağazası

İleri Web Tasarım dersi bireysel projesi. Telefon, bilgisayar, tablet, aksesuar ve küçük ev aletleri satan, Türkiye'ye uyarlanmış bir e-ticaret sitesi (demo; sipariş ve ödeme alınmaz).

## Özellikler

- **Canlı veri:** Ürünler DummyJSON REST API'sinden, dolar kuru Frankfurter API'sinden çekilir
- **TL fiyatlar:** Dolar fiyatları güncel kurla TL'ye çevrilir; 12 taksit tutarı ve indirim öncesi fiyat gösterilir
- **Türkçe içerik:** Ürün adları, açıklamalar, yorumlar, garanti/kargo/iade bilgileri Türkçeleştirilir (`lib/tr.js`)
- **Ürün listesi:** Kategori, marka ve stok filtresi; fiyat, puan ve indirime göre sıralama; Türkçe karakter duyarsız arama
- **Ürün detayı:** Görsel galerisi, stok durumu, tahmini kargo tarihi, ürün bilgileri, değerlendirmeler, benzer ürünler
- **Sepet:** Adet artırma/azaltma, kaldırma, toplam tutar; tarayıcıda saklanır (localStorage)
- **Duyarlı tasarım:** Mobil, tablet ve masaüstü; CSS Grid ve Flexbox
- **SEO:** Sayfa başına başlık ve açıklama, semantik HTML5, `sitemap.xml`, `robots.txt`, ürün yapısal verisi (JSON-LD)
- **Performans:** Ürün sayfaları önceden oluşturulur, API cevapları 1 saat önbellekte tutulur, görseller otomatik optimize edilir

## Teknolojiler

- [Next.js](https://nextjs.org) (React, App Router)
- [DummyJSON](https://dummyjson.com/docs/products) – ürün verileri
- [Frankfurter](https://frankfurter.dev) – USD/TRY kuru
- Vercel – yayınlama

## Klasör yapısı

```
app/
  layout.js             Tüm sayfalarda ortak üst bilgi, alt bilgi ve sepet
  page.js               Ana sayfa: haftanın fırsatı, kategoriler, indirimler, markalar
  urunler/page.js       Ürün listesi
  urun/[id]/page.js     Ürün detay sayfası
  sepet/page.js         Sepet
  sitemap.js, robots.js Arama motorları için
  globals.css           Tüm stiller
components/             Ürün kartı, filtreler, galeri, sepet bileşenleri
lib/
  catalog.js            API istekleri ve TL fiyat hesaplama
  tr.js                 Türkçe ürün adları, açıklamalar ve yorum çevirileri
  format.js             TL ve tarih biçimlendirme
```

## Çalıştırma

Node.js 20.9 veya üstü gerekir.

```bash
npm install
npm run dev
```

Ardından tarayıcıda http://localhost:3000 adresini açın.
