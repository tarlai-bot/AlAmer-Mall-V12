import { useState } from "react";
import { useTranslation } from "react-i18next";
const clips = [
  {
    id: "7277701471515688960",
    ar: "سمارفي سبوت — من أرشيف المول",
    en: "Smarvy Spot — from the mall archive",
    image: "/images/smarvy/Smarvy_banner.jpg",
    url: "https://www.linkedin.com/posts/al-amer-mall_smarvyspot-alamermall-alahsa-activity-7277701471515688960-4B3q",
  },
  {
    id: "7140962391093161984",
    ar: "هايبر ماركت العامر — فيديو الافتتاح",
    en: "Al Amer Market — opening video",
    image: "/images/hypermarket/Entrance_Image02.webp",
    url: "https://www.linkedin.com/posts/al-amer-mall_entertainment-alahsa-shoppingexperience-activity-7140962391093161984-Lj2K",
  },
];
export default function SocialVideos() {
  const { i18n } = useTranslation();
  const ar = i18n.language.startsWith("ar");
  const c = (a: string, e: string) => (ar ? a : e);
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <section className="am-section" id="social-videos">
      <div className="am-heading">
        <div>
          <span className="am-eyebrow">{c("لحظات من قنواتنا", "MOMENTS FROM OUR CHANNELS")}</span>
          <h2>{c("المول، بالصوت والصورة.", "The destination, in motion.")}</h2>
        </div>
      </div>
      <article className="am-media-local">
        <video controls playsInline preload="metadata" poster="/images/smarvy/Smarvy_banner.jpg">
          <source src="/images/smarvy/Smarvy-video.webm" type="video/webm" />
        </video>
        <div>
          <span className="am-eyebrow">
            {c("تجربة ترفيه من المول", "ENTERTAINMENT AT THE MALL")}
          </span>
          <h3>{c("شاهد سمارفي عن قرب", "A closer look at Smarvy")}</h3>
          <p>
            {c(
              "أضف الترفيه إلى زيارتك، ثم استمتع بجولة في المتاجر واستراحة في المطاعم والمقاهي.",
              "Add entertainment to your visit, then browse the stores and enjoy a dining or café break."
            )}
          </p>
          <a className="am-text-link" href="/entertainment/smarvy">
            {c("اكتشف تجربة سمارفي", "Discover Smarvy")} ↗
          </a>
        </div>
      </article>
      <div className="am-social-videos">
        {clips.map((clip) => (
          <article key={clip.id}>
            <img src={clip.image} alt={c(clip.ar, clip.en)} loading="lazy" />
            <div>
              <small>{c("فيديو منشور على LinkedIn · أرشيف", "LinkedIn video · archive")}</small>
              <h3>{c(clip.ar, clip.en)}</h3>
              <button
                className="am-button"
                onClick={() => setSelected(selected === clip.id ? null : clip.id)}
                aria-expanded={selected === clip.id}
              >
                {selected === clip.id
                  ? c("إغلاق المشغل", "Close player")
                  : c("شاهد المنشور والفيديو", "View post and video")}{" "}
                ▶
              </button>
              <a className="am-text-link" href={clip.url} target="_blank" rel="noopener noreferrer">
                {c("افتح على LinkedIn", "Open on LinkedIn")} ↗
              </a>
              {selected === clip.id && (
                <div className="am-embed">
                  <iframe
                    title={c(clip.ar, clip.en)}
                    src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${clip.id}`}
                    loading="lazy"
                    allowFullScreen
                  />
                  <p>
                    {c(
                      "إذا لم يظهر المشغل، افتح المنشور على LinkedIn.",
                      "If the player is unavailable, open the post on LinkedIn."
                    )}
                  </p>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
