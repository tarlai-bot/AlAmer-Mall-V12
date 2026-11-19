import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
const photos = [
  ["/media/events/national-day-96.jpg", "احتفاء اليوم الوطني 96", "National Day 96"],
  ["/media/events/polo-opening.jpg", "افتتاح بولو كلوب", "Polo Club opening"],
  ["/media/events/eid-adha.jpg", "من أجواء عيد الأضحى", "Eid Al Adha moments"],
  ["/media/events/eid-fitr.jpg", "من فعاليات عيد الفطر", "Eid Al Fitr activities"],
  ["/images/alamerMall/Mall_image02.webp", "جولة داخل المول", "Inside the mall"],
  ["/images/alamerMall/Mall_image03.webp", "مساحات تجمعنا", "Spaces to connect"],
  ["/images/hypermarket/Entrance_Image02.webp", "هايبر ماركت العامر", "Al Amer Hypermarket"],
  ["/images/smarvy/Smarvy_banner.jpg", "ترفيه للعائلة", "Family entertainment"],
  ["/images/water fountain/waterFountain_image.webp", "النافورة", "The fountain"],
  ["/images/dining/Wacafe/Wacafe_image.webp", "لحظات المقاهي", "Café moments"],
  ["/images/alamerMall/mall_image01.webp", "وجهة الأحساء", "An Al Ahsa destination"],
  ["/images/hypermarket/fresh_vegetables.webp", "تجربة يومية", "An everyday experience"],
];
export default function DestinationGallery() {
  const { i18n } = useTranslation();
  const ar = i18n.language.startsWith("ar");
  const c = (a: string, e: string) => (ar ? a : e);
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const move = (n: number) => setIndex((i) => (i + n + photos.length) % photos.length);
  return (
    <section className="am-section" id="moments">
      <div className="am-heading">
        <div>
          <span className="am-eyebrow">{c("صور من الوجهة", "FROM THE DESTINATION")}</span>
          <h2>{c("لكل زاوية، حكاية.", "Every corner, a story.")}</h2>
        </div>
      </div>
      <div className="am-gallery-grid">
        {photos.map(([src, a, e], i) => (
          <button
            key={src}
            onClick={() => {
              setIndex(i);
              dialog.current?.showModal();
            }}
          >
            <img src={src} alt={c(a, e)} loading="lazy" />
            <span>{c(a, e)} ↗</span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="am-photo-dialog"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
        aria-label={c("عارض صور المول", "Mall photo viewer")}
      >
        <button
          className="am-photo-close"
          onClick={() => dialog.current?.close()}
          aria-label={c("إغلاق", "Close")}
        >
          ×
        </button>
        <img src={photos[index][0]} alt={c(photos[index][1], photos[index][2])} />
        <div>
          <button onClick={() => move(-1)} aria-label={c("الصورة السابقة", "Previous photo")}>
            ←
          </button>
          <span>
            {c(photos[index][1], photos[index][2])} · {index + 1} / {photos.length}
          </span>
          <button onClick={() => move(1)} aria-label={c("الصورة التالية", "Next photo")}>
            →
          </button>
        </div>
      </dialog>
    </section>
  );
}
