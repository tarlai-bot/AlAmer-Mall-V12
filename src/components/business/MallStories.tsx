import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
export default function MallStories() {
  const { i18n } = useTranslation();
  const ar = i18n.language.startsWith("ar");
  const c = (a: string, e: string) => (ar ? a : e);
  const stories = [
    {
      title: c(
        "التسوق والخدمات والترفيه في وجهة واحدة",
        "Shopping, services and entertainment together"
      ),
      tag: c("من قنوات المول · تعريف بالوجهة", "From mall channels · destination overview"),
      text: c(
        "تعرّف على تجربة العامر مول التي تجمع التسوق والخدمات والترفيه. استكشف دليل المتاجر، واختر تجربة الطعام والمرح المناسبة لزيارتك.",
        "Explore Al Amer Mall’s shopping, services and entertainment experience. Browse the store directory and choose dining and play for your visit."
      ),
      image: "/images/alamerMall/Mall_image02.webp",
      alt: c("داخل العامر مول", "Inside Al Amer Mall"),
      source:
        "https://ae.linkedin.com/posts/al-amer-mall_alamermall-saudiarabia-%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D8%B1%D9%85%D9%88%D9%84-activity-7427010807730700288-H0GG",
      note: c(
        "صورة عامة للمول · اقرأ منشور الوجهة",
        "General mall photograph · read the destination post"
      ),
    },
    {
      title: c("بولو كلوب: افتتاح تجريبي", "Polo Club: soft opening"),
      tag: c("منشور رسمي · افتتاحات", "Official post · openings"),
      text: c(
        "أعلنت صفحة العامر مول عن افتتاح Beverly Hills Polo Club التجريبي، وإضافة تجربة جديدة لمزيج المتاجر.",
        "Al Amer Mall shared the Beverly Hills Polo Club soft opening, adding a new experience to its retail mix."
      ),
      image: "/media/events/polo-opening.jpg",
      alt: c("متجر بولو كلوب في العامر مول", "Polo Club storefront at Al Amer Mall"),
      source:
        "https://ae.linkedin.com/posts/al-amer-mall_%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D8%B1%D9%85%D9%88%D9%84-%D8%A8%D9%88%D9%84%D9%88%D9%83%D9%84%D9%88%D8%A8-%D8%A7%D9%81%D8%AA%D8%AA%D8%A7%D8%AD%D8%AA%D8%AC%D8%B1%D9%8A%D8%A8%D9%8A-activity-7497555931136802816-5pV6",
      note: c("صورة من فيديو الافتتاح الرسمي", "Image from the official opening video"),
    },
    {
      title: c("رياضة ومجتمع داخل المول", "Sport and community inside the mall"),
      tag: c("أرشيف · 29 يوليو 2026", "Archive · 29 July 2026"),
      text: c(
        "وثّقت جمعية المشي والجري بالأحساء تنظيم سباق داخل العامر مول بمشاركة الكبار والصغار.",
        "Al Ahsa Walking and Running Association documented an indoor mall race for adults and children."
      ),
      image: "/images/alamerMall/Mall_image03.webp",
      alt: c("صورة عامة للمول وليست صورة السباق", "General mall photograph, not a race photograph"),
      source: "https://www.wra.org.sa/news/أول-سباق-“ماوثالون”-داخل-مركز-تجاري-للكبار-والصغار/",
      note: c("صورة عامة للمول", "General mall photograph"),
    },
  ];
  return (
    <section className="am-section am-reveal">
      <div className="am-heading">
        <div>
          <span className="am-eyebrow">{c("من أخبار الوجهة", "DESTINATION STORIES")}</span>
          <h2>{c("المول، في حركة.", "A destination in motion.")}</h2>
        </div>
        <Link className="am-text-link" to="/events">
          {c("دليل الفعاليات", "Events directory")} ↗
        </Link>
      </div>
      <div className="am-story-grid">
        {stories.map((s) => (
          <article key={s.source}>
            <img src={s.image} alt={s.alt} loading="lazy" />
            <div>
              <small>{s.tag}</small>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <a className="am-text-link" href={s.source} target="_blank" rel="noopener noreferrer">
                {c("اقرأ المصدر", "Read the source")} ↗
              </a>
              <small className="am-story-note">{s.note}</small>
            </div>
          </article>
        ))}
      </div>
      <div className="am-story-video">
        <div>
          <span className="am-eyebrow">{c("لحظات العامر", "AL AMER MOMENTS")}</span>
          <h3>{c("اكتشف القصص من قنواتنا.", "Discover stories on our channels.")}</h3>
          <p>
            {c(
              "فيديوهات الزيارة والافتتاحات والفعاليات من حسابات العامر مول.",
              "Visit moments, openings and events from Al Amer Mall accounts."
            )}
          </p>
          <div className="am-actions">
            <a
              className="am-text-link"
              href="https://www.instagram.com/alamermall/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram ↗
            </a>
            <a
              className="am-text-link"
              href="https://www.tiktok.com/@alamermall"
              target="_blank"
              rel="noopener noreferrer"
            >
              TikTok ↗
            </a>
          </div>
        </div>
        <Link className="am-button" to="/entertainment/smarvy">
          {c("شاهد تجربة سمارفي", "See the Smarvy experience")} ↗
        </Link>
      </div>
    </section>
  );
}
