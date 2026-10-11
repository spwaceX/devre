"use client";

import Image from "next/image";
import { useState } from "react";

// Ürün görselleri: küçük görsele tıklanınca büyük görsel değişir
export default function Gallery({ images, title }) {
  const [active, setActive] = useState(0);

  return (
    <div className="gallery">
      <div className="gallery-main">
        <Image
          src={images[active]}
          alt={`${title}, görsel ${active + 1}`}
          fill
          sizes="(min-width: 900px) 560px, 100vw"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {images.length > 1 && (
        <div className="gallery-thumbs" role="group" aria-label="Diğer görseller">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className="gallery-thumb"
              aria-current={i === active}
              aria-label={`${i + 1}. görseli göster`}
              onClick={() => setActive(i)}
            >
              <Image src={src} alt="" fill sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
