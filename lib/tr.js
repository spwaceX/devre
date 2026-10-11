// API ürün bilgilerini İngilizce veriyor. Bu dosya o verileri Türkçeleştiriyor:
// ürün adları, açıklamalar, yorumlar, garanti/kargo/iade bilgileri.
// Fiyat, stok, puan ve görseller her zaman API'den canlı geliyor.

// Ürün numarasına göre Türkçe ad (listede olmayanlar API'deki adıyla kalır)
const TITLES = {
  51: "Smoothie Blender",
  56: "Tek Gözlü Elektrikli Ocak",
  61: "El Blenderı",
  66: "Mikrodalga Fırın",
  78: "Apple MacBook Pro 14 inç Uzay Grisi",
  79: "Asus Zenbook Pro Duo Çift Ekranlı Laptop",
  80: "Huawei MateBook X Pro",
  82: "Dell XPS 13 9300 Laptop",
  99: "Amazon Echo Plus Akıllı Hoparlör",
  101: "Apple AirPods Max Gümüş",
  102: "Apple AirPower Kablosuz Şarj Cihazı",
  103: "Apple HomePod mini Uzay Grisi",
  104: "Apple iPhone Şarj Adaptörü",
  105: "Apple MagSafe Batarya",
  106: "Apple Watch Series 4 Altın",
  107: "Beats Flex Kablosuz Kulaklık",
  108: "iPhone 12 MagSafe Silikon Kılıf Erik",
  110: "Telefon için Selfie Işığı",
  111: "Kumandalı Selfie Çubuğu",
  112: "Stüdyo Kamera Pedestalı",
  126: "Oppo F19 Pro+",
  159: "iPad mini 2021 Yıldız Işığı",
  160: "Samsung Galaxy Tab S8+ Gri",
  161: "Samsung Galaxy Tab Beyaz",
};

const DESCRIPTIONS = {
  51: "Güçlü motoru ve paslanmaz çelik bıçaklarıyla smoothie, çorba ve soslar için kullanışlı blender.",
  56: "Tezgâh üstünde kullanılabilen, kademeli ısı ayarlı tek gözlü elektrikli ocak. Yurt odaları ve küçük mutfaklar için pratik.",
  61: "Çorba ve püreleri doğrudan tencerede pürüzsüz hale getiren, tek elle kullanılan el blenderı.",
  66: "Isıtma, buz çözme ve pişirme programlarıyla mutfakta zaman kazandıran mikrodalga fırın.",
  78: "Apple silikon çipi, Liquid Retina XDR ekranı ve gün boyu süren pil ömrüyle yaratıcı işler için tasarlanmış profesyonel dizüstü bilgisayar.",
  79: "Klavyenin üstündeki ikinci dokunmatik ekranı sayesinde video kurgu ve tasarım işlerinde çalışma alanınızı ikiye katlayan laptop.",
  80: "İnce alüminyum gövdesi, neredeyse çerçevesiz 3K dokunmatik ekranı ve hafif yapısıyla yolda çalışanlar için ideal.",
  81: "360 derece dönen menteşesi sayesinde laptop, tablet ve çadır modunda kullanılabilen, kalem destekli dönüştürülebilir bilgisayar.",
  82: "13,4 inç InfinityEdge ekranı ve kompakt gövdesiyle yüksek performansı küçük bir çantaya sığdıran ultrabook.",
  99: "Dahili akıllı ev merkezine sahip, Alexa sesli asistanlı akıllı hoparlör. Müzik çalar, ışıkları ve prizleri sesinizle yönetir.",
  100: "iPhone'unuzla tek dokunuşta eşleşen, şarj kutusuyla 24 saate varan dinleme süresi sunan kablosuz kulaklık.",
  101: "Aktif gürültü engelleme, uzamsal ses ve örgü kafa bandına sahip kulak üstü kablosuz kulaklık.",
  102: "iPhone, Apple Watch ve AirPods'u aynı anda şarj etmek için tasarlanmış kablosuz şarj altlığı.",
  103: "Küçük boyutuna rağmen odayı dolduran 360 derece sese sahip, Siri destekli akıllı hoparlör.",
  104: "iPhone'unuzu hızlı ve güvenli şekilde şarj eden USB-C güç adaptörü.",
  105: "iPhone'un arkasına mıknatısla tutunan, gün içinde ek şarj sağlayan taşınabilir batarya.",
  106: "Kalp ritmi takibi, düşme algılama ve antrenman ölçümleri sunan akıllı saat.",
  107: "Gün boyu kullanım için hafif, boyun bantlı kablosuz kulaklık. 12 saate varan pil ömrü sunar.",
  108: "Yumuşak dokulu silikon yüzeyi ve MagSafe uyumlu mıknatıslarıyla iPhone 12'yi koruyan kılıf.",
  109: "Telefon ve kompakt kameralar için boyu ayarlanabilen hafif monopod. Sabit çekimler için idealdir.",
  110: "Telefona takılarak yüzünüzü eşit şekilde aydınlatan, kademeli parlaklık ayarlı selfie ışığı.",
  111: "Uzaktan kumandalı, katlanabilir selfie çubuğu. Grup fotoğrafları ve seyahatler için pratik.",
  112: "Profesyonel kameralar için yüksekliği ayarlanabilen, tekerlekli stüdyo pedestalı.",
  121: "Touch ID parmak izi sensörünü ilk kez getiren, kompakt 4 inç ekranlı klasik iPhone.",
  122: "4,7 inç Retina HD ekranı ve ince alüminyum gövdesiyle günlük kullanım için dengeli bir iPhone.",
  123: "Üçlü kamera sistemi, 120 Hz ProMotion ekranı ve A15 Bionic çipiyle profesyonel çekimler için tasarlandı.",
  124: "Kenardan kenara OLED ekranı ve Face ID yüz tanıma özelliğiyle iPhone tasarımını yeniden tanımlayan model.",
  125: "Geniş bataryası ve hızlı şarj desteğiyle uygun fiyatlı, günlük kullanıma uygun akıllı telefon.",
  126: "AMOLED ekranı, 5G desteği ve 50W hızlı şarjıyla orta segmentte güçlü bir seçenek.",
  127: "Ekran içi parmak izi okuyucusu ve çift arka kamerasıyla şık ve hesaplı bir telefon.",
  128: "Büyük ekranı ve uzun pil ömrüyle bütçe dostu akıllı telefon.",
  129: "Açılır ön kamerası sayesinde çentiksiz, tam ekran deneyimi sunan akıllı telefon.",
  130: "64 MP ana kamerasıyla detaylı fotoğraflar çeken, AMOLED ekranlı orta segment telefon.",
  131: "Suya ve toza dayanıklı gövdesi ve parlak Super AMOLED ekranıyla dayanıklı bir amiral gemisi.",
  132: "Kenarları kavisli Infinity ekranı ve ince tasarımıyla döneminin en şık telefonlarından.",
  133: "Üçlü arka kamera, ekran içi ultrasonik parmak izi ve kablosuz güç paylaşımı sunan amiral gemisi.",
  134: "Yüksek çözünürlüklü selfie kamerası ve AMOLED ekranıyla fotoğraf sevenlere yönelik telefon.",
  135: "Yapay zekâ destekli 24 MP ön kamerası ve geniş ekranıyla selfie odaklı akıllı telefon.",
  136: "Ekran içi parmak izi okuyucusu ve gece çekimlerinde başarılı kamerasıyla öne çıkan model.",
  159: "8,3 inç Liquid Retina ekranı, A15 Bionic çipi ve Apple Pencil desteğiyle avuç içine sığan güçlü tablet.",
  160: "12,4 inç Super AMOLED ekranı ve kutudan çıkan S Pen kalemiyle not alma ve çizim için ideal tablet.",
  161: "Film izleme, okuma ve ders çalışma için geniş ekranlı, hafif ve hesaplı Android tablet.",
};

export function trTitle(id, fallback) {
  return TITLES[id] ?? fallback;
}

export function trDescription(id, fallback) {
  return DESCRIPTIONS[id] ?? fallback;
}

// ---------- Yorumlar ----------

// API'deki yorum cümlelerinin Türkçe karşılıkları
const COMMENTS = {
  "Would not recommend!": "Tavsiye etmiyorum, beklentimi karşılamadı.",
  "Very satisfied!": "Çok memnun kaldım, teşekkürler.",
  "Highly impressed!": "Beklentimin çok üzerinde çıktı.",
  "Great product!": "Harika bir ürün, gönül rahatlığıyla alabilirsiniz.",
  "Awesome product!": "Müthiş bir ürün, her kuruşuna değer.",
  "Poor quality!": "Kalitesi düşük, açıkçası hayal kırıklığı.",
  "Would buy again!": "Tekrar olsa yine alırım.",
  "Very dissatisfied!": "Hiç memnun kalmadım.",
  "Very unhappy with my purchase!": "Bu alışverişten hiç memnun değilim.",
  "Very disappointed!": "Büyük hayal kırıklığı yaşadım.",
  "Fast shipping!": "Kargo çok hızlı geldi, paketleme de özenliydi.",
  "Not as described!": "Ürün açıklamada anlatıldığı gibi değil.",
  "Great value for money!": "Fiyat/performans olarak çok başarılı.",
  "Very happy with my purchase!": "Aldığıma çok memnunum.",
  "Highly recommended!": "Kesinlikle tavsiye ederim.",
  "Not worth the price!": "Bu fiyata değmez.",
  "Very pleased!": "Gayet memnunum, sorunsuz çalışıyor.",
  "Excellent quality!": "Kalitesi mükemmel.",
  "Waste of money!": "Paraya yazık, almayın.",
  "Disappointing product!": "Beklediğim gibi çıkmadı.",
  "Would not buy again!": "Bir daha almam.",
};

// Çevirisi olmayan bir yorum gelirse puana göre Türkçe bir cümle kullanılır
const BY_RATING = {
  5: "Çok memnun kaldım, herkese tavsiye ederim.",
  4: "Güzel ürün, fiyatına göre gayet iyi.",
  3: "İdare eder, ortalama bir ürün.",
  2: "Beklentimin altında kaldı.",
  1: "Hiç memnun kalmadım.",
};

const FIRST_NAMES = [
  "Ayşe", "Mehmet", "Zeynep", "Emre", "Elif", "Burak", "Selin", "Can",
  "Merve", "Oğuz", "Deniz", "Kerem", "Ece", "Mert", "Gizem", "Barış",
  "Damla", "Onur", "Buse", "Serkan", "Cansu", "Tolga", "İrem", "Kaan",
];
const INITIALS = ["Y", "K", "D", "Ş", "A", "Ç", "Ö", "T", "B", "E", "G", "S"];

// Aynı yorumcu her zaman aynı Türkçe ismi alsın diye basit bir sayı üretiyoruz
function hash(text) {
  let h = 0;
  for (const ch of text) h = (h * 31 + ch.codePointAt(0)) >>> 0;
  return h;
}

// "Christian Perez" → "Emre K." (Türk e-ticaret sitelerindeki gibi soyadı kısaltılmış)
function trName(original) {
  const h = hash(original);
  return `${FIRST_NAMES[h % FIRST_NAMES.length]} ${INITIALS[(h >>> 5) % INITIALS.length]}.`;
}

// API bazen olumsuz yorumu 5 yıldızla eşleştirebiliyor; bu yorumların hangisinin olumsuz olduğu
const NEGATIVE = new Set([
  "Would not recommend!", "Poor quality!", "Very dissatisfied!", "Very unhappy with my purchase!",
  "Very disappointed!", "Not as described!", "Not worth the price!", "Waste of money!",
  "Disappointing product!", "Would not buy again!",
]);

function trComment(comment, rating) {
  const translated = COMMENTS[comment];
  if (!translated) return BY_RATING[rating] ?? comment;
  const negative = NEGATIVE.has(comment);
  // Yorum ile puan çelişiyorsa (ör. "Harika ürün" + 1 yıldız) puana uygun cümleyi kullan
  if ((negative && rating >= 4) || (!negative && rating <= 2)) return BY_RATING[rating];
  return translated;
}

export function trReviews(reviews = []) {
  return reviews.map((r) => ({
    name: trName(r.reviewerName),
    rating: r.rating,
    comment: trComment(r.comment, r.rating),
    date: r.date,
  }));
}

// ---------- Garanti, kargo, iade ----------

const UNITS = { year: "yıl", month: "ay", week: "hafta", day: "gün" };

// "3-year warranty", "6 months warranty", "Lifetime warranty" → Türkçe
export function trWarranty(text = "") {
  if (/lifetime/i.test(text)) return "Ömür boyu garanti";
  if (/no warranty/i.test(text)) return "Garanti yok";
  const m = text.match(/(\d+)[\s-](year|month|week|day)/i);
  return m ? `${m[1]} ${UNITS[m[2].toLowerCase()]} garanti` : text;
}

// "30 days return policy", "7-day return policy", "No return policy" → Türkçe
export function trReturn(text = "") {
  if (/no return/i.test(text)) return "İade yapılmaz";
  const m = text.match(/(\d+)[\s-]day/i);
  return m ? `${m[1]} gün içinde ücretsiz iade` : text;
}

// Kargo bilgisi → { text: Türkçe açıklama, days: en geç kaç günde kargoda }
export function trShipping(text = "") {
  if (/overnight/i.test(text)) return { text: "Ertesi gün kargoda", days: 1 };
  let m = text.match(/(\d+)(?:-(\d+))? business days?/i);
  if (m) return { text: `${m[0].split(" ")[0]} iş günü içinde kargoda`, days: Number(m[2] ?? m[1]) };
  m = text.match(/(\d+) (week|month)/i);
  if (m) {
    const n = Number(m[1]);
    const isWeek = m[2].toLowerCase() === "week";
    return { text: `${n} ${isWeek ? "hafta" : "ay"} içinde kargoda`, days: n * (isWeek ? 7 : 30) };
  }
  return { text, days: 7 };
}
