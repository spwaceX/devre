// 5 üzerinden puanı yıldızlarla gösterir (ör. 4,3 puan → 4 tam, 1 kısmi dolu yıldız)
export default function Stars({ rating, size = "sm" }) {
  const percent = Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <span className={`stars stars-${size}`} role="img" aria-label={`5 üzerinden ${rating.toFixed(1).replace(".", ",")} puan`}>
      <span className="stars-empty" aria-hidden="true">★★★★★</span>
      <span className="stars-full" style={{ width: `${percent}%` }} aria-hidden="true">
        ★★★★★
      </span>
    </span>
  );
}
