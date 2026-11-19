import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Play, Pause, ArrowUpRight } from "lucide-react";
import mediaSources from "../../data/mall-events.json";
const moments = [
  {
    id: "national-day-96",
    a: "فرحة وطن تجمعنا",
    e: "A nation’s joy, shared",
    tagA: "اليوم الوطني 96",
    tagE: "National Day 96",
    textA: "لحظات من احتفاء العامر مول باليوم الوطني السعودي، من قنوات المول الرسمية.",
    textE: "Saudi National Day moments from Al Amer Mall’s official channels.",
  },
  {
    id: "polo-opening",
    a: "إضافة تفتح باب الاكتشاف",
    e: "A new reason to discover",
    tagA: "افتتاح بولو كلوب",
    tagE: "Polo Club opening",
    textA: "شاهد الافتتاح التجريبي لبولو كلوب Beverly Hills في العامر مول.",
    textE: "Watch the Beverly Hills Polo Club soft opening at Al Amer Mall.",
  },
  {
    id: "eid-adha",
    a: "فرحة العيد، بكل تفاصيلها",
    e: "Eid joy, in every detail",
    tagA: "فعاليات عيد الأضحى",
    tagE: "Eid Al Adha moments",
    textA: "من أجواء العيد التي شاركها زوار العامر مول؛ ذكريات من أرشيف قنواتنا.",
    textE: "Eid moments shared by mall visitors, from our channel archive.",
  },
  {
    id: "eid-fitr",
    a: "لحظات صغيرة، ذكريات كبيرة",
    e: "Small moments, lasting memories",
    tagA: "فعاليات عيد الفطر",
    tagE: "Eid Al Fitr moments",
    textA: "مشاهد من فعاليات عيد الفطر واللحظات العائلية داخل المول.",
    textE: "Scenes from Eid Al Fitr activities and family moments at the mall.",
  },
];
const brands = [
  ["Beverly Hills Polo Club", "بولو كلوب", "/media/events/polo-opening.jpg", "/stores"],
  ["DIMI", "ديمي", "/images/stores/dimi/DIMI_image.webp", "/stores"],
  ["Najmah Jewelry", "نجمة للمجوهرات", "/images/stores/najmahJewelry/Najmah_image.webp", "/stores"],
  [
    "Saffron Threads",
    "خيوط الزعفران",
    "/images/stores/saffronThreads/SaffronThreads_Image.webp",
    "/stores",
  ],
  ["WaCafe", "وا كافيه", "/images/dining/Wacafe/Wacafe_image.webp", "/restaurants"],
  [
    "La Casa Pasta",
    "كازا باستا",
    "/images/dining/laCasaPasta/lacasapasta_Image.webp",
    "/restaurants",
  ],
];
export default function DestinationHighlights() {
  const { i18n } = useTranslation();
  const ar = i18n.language.startsWith("ar");
  const c = (a: string, e: string) => (ar ? a : e);
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const current = moments[selected];
  const source =
    mediaSources.find((m) => m.name === current.id)?.source ||
    "https://sa.linkedin.com/company/al-amer-mall";
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => setPlaying(false));
        else el.pause();
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [selected]);
  return (
    <section className="am-highlights am-section" id="mall-highlights">
      <div className="am-heading">
        <div>
          <span className="am-eyebrow">{c("من قلب المول", "FROM THE HEART OF THE MALL")}</span>
          <h2>{c("هنا، تكبر الحكاية.", "Here, the story grows.")}</h2>
        </div>
        <a
          className="am-text-link"
          href="https://sa.linkedin.com/company/al-amer-mall"
          target="_blank"
          rel="noopener noreferrer"
        >
          {c("من قنواتنا الرسمية", "From our official channels")} ↗
        </a>
      </div>
      <div className="am-highlight-cards">
        {moments.map((m, i) => (
          <button key={m.id} aria-pressed={selected === i} onClick={() => setSelected(i)}>
            <img src={`/media/events/${m.id}.jpg`} alt={c(m.tagA, m.tagE)} loading="lazy" />
            <div className="am-highlight-card-copy">
              <small>{c(m.tagA, m.tagE)}</small>
              <h3>{c(m.a, m.e)}</h3>
              <span>
                <Play size={16} />
                {c("شاهد اللحظة", "Watch the moment")}
              </span>
            </div>
          </button>
        ))}
      </div>
      <div className="am-highlight-feature" key={current.id}>
        <div className="am-highlight-film">
          <video
            ref={video}
            muted
            loop
            playsInline
            controls
            preload="metadata"
            poster={`/media/events/${current.id}.jpg`}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            <source src={`/media/events/${current.id}.mp4`} type="video/mp4" />
          </video>
          <button
            className="am-film-toggle"
            onClick={() =>
              playing
                ? video.current?.pause()
                : video.current?.play().catch(() => setPlaying(false))
            }
            aria-label={playing ? c("إيقاف مؤقت", "Pause") : c("تشغيل", "Play")}
          >
            {playing ? <Pause size={18} /> : <Play size={18} />}
          </button>
        </div>
        <div>
          <span className="am-eyebrow">{c(current.tagA, current.tagE)}</span>
          <h3>{c(current.a, current.e)}</h3>
          <p>{c(current.textA, current.textE)}</p>
          <p className="am-event-archive">
            {c(
              "مشاهد منشورة من أرشيف المول · ليست إعلانًا عن موعد قادم",
              "Published mall archive · not an upcoming event announcement"
            )}
          </p>
          <a className="am-text-link" href={source} target="_blank" rel="noopener noreferrer">
            {c("تابع القصة على LinkedIn", "Follow the story on LinkedIn")}{" "}
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
      <div className="am-heading am-brand-photo-heading">
        <div>
          <span className="am-eyebrow">{c("اكتشف على طريقتك", "DISCOVER YOUR WAY")}</span>
          <h3>{c("أسماء تعرفها. تفاصيل تكتشفها.", "Familiar names. New discoveries.")}</h3>
        </div>
        <Link className="am-text-link" to="/stores">
          {c("كل المتاجر", "Explore stores")} ↗
        </Link>
      </div>
      <div className="am-brand-photo-row">
        {brands.map(([en, a, img, path]) => (
          <Link key={en} to={path}>
            <img src={img} alt={c(a, en)} loading="lazy" />
            <span>
              {c(a, en)} <ArrowUpRight size={17} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
