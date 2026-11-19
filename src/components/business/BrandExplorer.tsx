import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const brands = [
  [
    "polo",
    "Beverly Hills Polo Club",
    "بولو كلوب",
    "retail",
    "/media/events/polo-opening.jpg",
    "",
    "/stores",
  ],
  [
    "dimi",
    "DIMI",
    "ديمي",
    "retail",
    "/images/stores/dimi/DIMI_image.webp",
    "/images/stores/dimi/DIMI_Logo.jpg",
    "/stores",
  ],
  [
    "najmah",
    "Najmah Jewelry",
    "نجمة للمجوهرات",
    "retail",
    "/images/stores/najmahJewelry/Najmah_image.webp",
    "/images/stores/najmahJewelry/Najmah_Logo.webp",
    "/stores",
  ],
  [
    "saffron",
    "Saffron Threads",
    "خيوط الزعفران",
    "retail",
    "/images/stores/saffronThreads/SaffronThreads_Image.webp",
    "/images/stores/saffronThreads/SaffronThreads_Logo.jpg",
    "/stores",
  ],
  [
    "bukhamseen",
    "Bukhamseen Furniture",
    "بوخمسين للمفروشات",
    "retail",
    "/images/stores/bukhamseen/bukhamseen_image.webp",
    "/images/stores/bukhamseen/bukhamseen_logo.jpg",
    "/stores",
  ],
  [
    "poshak",
    "Poshak",
    "بوشاك",
    "dining",
    "/images/dining/poshak/Poshak_image.webp",
    "/images/dining/poshak/Poshak_Logo.png",
    "/restaurants",
  ],
  [
    "casapasta",
    "La Casa Pasta",
    "كازا باستا",
    "dining",
    "/images/dining/laCasaPasta/lacasapasta_Image.webp",
    "/images/dining/laCasaPasta/lacasapasta_Logo.svg",
    "/restaurants",
  ],
  [
    "wacafe",
    "WaCafe",
    "وا كافيه",
    "dining",
    "/images/dining/Wacafe/Wacafe_image.webp",
    "/images/dining/Wacafe/Wacafe_Logo.webp",
    "/restaurants",
  ],
  [
    "cornshack",
    "Corn Shack",
    "كورن شاك",
    "dining",
    "/images/dining/cornShack/CornShack_image.webp",
    "/images/dining/cornShack/CornShack_Logo.jpeg",
    "/restaurants",
  ],
  [
    "taraf",
    "Taraf",
    "ترف",
    "dining",
    "/images/dining/taraf/Taraf_image.webp",
    "/images/dining/taraf/TARAF_Logo.jpg",
    "/restaurants",
  ],
  [
    "shaiji",
    "Shaiji",
    "شايجي",
    "dining",
    "/images/dining/shaiji/Shaiji_image.webp",
    "/images/dining/shaiji/Shaiji_Logo.jpg",
    "/restaurants",
  ],
  [
    "smarvy",
    "Smarvy Spot",
    "سمارفي سبوت",
    "play",
    "/images/smarvy/Smarvy_banner.jpg",
    "/images/smarvy/Smarvy_Logo.png",
    "/entertainment/smarvy",
  ],
  [
    "kids",
    "Kids Island",
    "جزيرة الأطفال",
    "play",
    "/images/stores/kidsIsland/KidsIsland_Image.webp",
    "/images/stores/kidsIsland/KidsIsland_Logo.webp",
    "/entertainment",
  ],
  [
    "market",
    "Al Amer Market",
    "أسواق العامر",
    "everyday",
    "/images/hypermarket/Entrance_Image02.webp",
    "/images/hypermarket/Hypermarket_Logo.png",
    "/hypermarket",
  ],
];
export default function BrandExplorer() {
  const { i18n } = useTranslation();
  const ar = i18n.language.startsWith("ar");
  const c = (a: string, e: string) => (ar ? a : e);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const v = JSON.parse(localStorage.getItem("am-visit-favorites") || "[]");
      return Array.isArray(v) ? v : [];
    } catch {
      return [];
    }
  });
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/[أإآ]/g, "ا")
      .replace(/ة/g, "ه")
      .replace(/[\u064b-\u065f]/g, "");
  const filtered = brands.filter(
    (b) =>
      (category === "all" || b[3] === category) &&
      normalize(`${b[1]} ${b[2]}`).includes(normalize(query)) &&
      (!onlyFavorites || favorites.includes(b[0]))
  );
  const toggle = (id: string) => {
    const next = favorites.includes(id) ? favorites.filter((x) => x !== id) : [...favorites, id];
    setFavorites(next);
    try {
      localStorage.setItem("am-visit-favorites", JSON.stringify(next));
    } catch {}
  };
  return (
    <section className="am-section" id="brands">
      <div className="am-heading">
        <div>
          <span className="am-eyebrow">{c("دليل الوجهة", "DESTINATION DIRECTORY")}</span>
          <h2>{c("اكتشف. اختر. احفظ.", "Discover. Choose. Save.")}</h2>
        </div>
        <button
          className="am-text-link"
          onClick={() => {
            setOnlyFavorites(!onlyFavorites);
            setExpanded(true);
          }}
          aria-pressed={onlyFavorites}
        >
          {c("قائمة زيارتي", "My visit list")} ({favorites.length}) ♡
        </button>
      </div>
      <div className="am-directory-controls">
        <input
          aria-label={c("ابحث عن علامة", "Search brands")}
          placeholder={c("ابحث بالعربية أو الإنجليزية…", "Search in Arabic or English…")}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setExpanded(true);
          }}
        />
        <select
          aria-label={c("الفئة", "Category")}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setExpanded(true);
          }}
        >
          {[
            ["all", "كل التجارب", "All experiences"],
            ["retail", "المتاجر", "Retail"],
            ["dining", "المطاعم والمقاهي", "Dining"],
            ["play", "الترفيه", "Entertainment"],
            ["everyday", "الاحتياجات اليومية", "Everyday"],
          ].map(([v, a, e]) => (
            <option key={v} value={v}>
              {c(a, e)}
            </option>
          ))}
        </select>
      </div>
      <div className="am-directory-grid">
        {filtered.slice(0, expanded ? 99 : 6).map(([id, en, arabic, , image, logo, path]) => (
          <article key={id}>
            <div className="am-brand-photo">
              {image ? (
                <img src={image} alt={c(arabic, en)} loading="lazy" />
              ) : (
                <div className="am-brand-wordmark">
                  Beverly Hills
                  <br />
                  Polo Club
                </div>
              )}
              <button
                aria-label={c(`حفظ ${arabic}`, `Save ${en}`)}
                aria-pressed={favorites.includes(id)}
                onClick={() => toggle(id)}
              >
                {favorites.includes(id) ? "♥" : "♡"}
              </button>
            </div>
            <div className="am-brand-details">
              {logo && <img src={logo} alt={c(`شعار ${arabic}`, `${en} logo`)} loading="lazy" />}
              <h3>{c(arabic, en)}</h3>
              {id === "bukhamseen" && (
                <small>
                  {c(
                    "شراكة معلنة — تحقق من حالة الافتتاح",
                    "Announced partnership — check opening status"
                  )}
                </small>
              )}
              {id === "polo" && (
                <small>{c("افتتاح منشور على LinkedIn", "Opening shared on LinkedIn")}</small>
              )}
              <Link
                className="am-text-link"
                to={
                  path === "/stores"
                    ? `/stores?brand=${id === "polo" ? "beverly-hills-polo" : id}`
                    : path === "/restaurants"
                      ? `/restaurants?search=${encodeURIComponent(ar ? arabic : en)}`
                      : path
                }
              >
                {c("استكشف التفاصيل", "Explore details")} ↗
              </Link>
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <p role="status">
          {c(
            "لا توجد نتائج. جرّب فئة أخرى أو أضف علامة إلى قائمة زيارتك.",
            "No results. Try another category or save a brand to your visit list."
          )}
        </p>
      )}
      {!expanded && filtered.length > 6 && (
        <button className="am-button" style={{ marginTop: 30 }} onClick={() => setExpanded(true)}>
          {c("اعرض كل العلامات المدرجة", "Show all listed brands")} ({brands.length}) ↓
        </button>
      )}
    </section>
  );
}
