// Türkçe biçimlendirme yardımcıları

const number = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 });

// 88548 → "88.548 TL"
export function formatTL(value) {
  return number.format(value) + " TL";
}

const longDate = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  weekday: "long",
  timeZone: "Europe/Istanbul",
});

const shortDate = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Istanbul",
});

// "14 Ekim Çarşamba"
export function formatDeliveryDate(date) {
  return longDate.format(date);
}

// "30 Nisan 2025"
export function formatDate(value) {
  return shortDate.format(new Date(value));
}

// Arama için: büyük/küçük harf ve Türkçe karakter farkını yok sayar
// "IPHONE" ve "iphone", "şarj" ve "sarj" aynı kabul edilir
export function fold(text = "") {
  return text
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");
}
