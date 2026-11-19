import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  MapPin,
  Play,
  Pause,
  ShoppingBag,
  Coffee,
  Ticket,
  Store,
  ArrowRight,
} from "lucide-react";
import Header from "../../components/layout/Header";
import SEO from "../../components/common/SEO";
import DestinationGallery from "../../components/business/DestinationGallery";
import BrandExplorer from "../../components/business/BrandExplorer";
import SocialVideos from "../../components/business/SocialVideos";
import VisitorServices from "../../components/business/VisitorServices";
import MallStories from "../../components/business/MallStories";
import DestinationHighlights from "../../components/business/DestinationHighlights";
import MallStatistics from "../../components/business/MallStatistics";
import OpportunityFinder from "../../components/business/OpportunityFinder";
import "./mall.css";
import "./visitor-statistics.css";
export default function Home() {
  const { i18n } = useTranslation();
  const ar = i18n.language.startsWith("ar");
  const c = (a: string, e: string) => (ar ? a : e);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [period, setPeriod] = useState(0);
  const [plan, setPlan] = useState("family");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.current?.pause();
    if (window.location.hash)
      requestAnimationFrame(() =>
        document.getElementById(window.location.hash.slice(1))?.scrollIntoView()
      );
    else window.scrollTo(0, 0);
    document.querySelector(".am-site")?.classList.add("am-js");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".am-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const experiences = [
    {
      a: "تسوّق بطريقتك",
      e: "Find your own style",
      label: c("التسوق", "SHOP"),
      path: "/stores",
      image: "/images/alamerMall/Mall_image02.webp",
      icon: ShoppingBag,
    },
    {
      a: "موعد مع المذاق",
      e: "Make time for taste",
      label: c("المطاعم والمقاهي", "DINE"),
      path: "/restaurants",
      image: "/images/dining/Wacafe/Wacafe_image.webp",
      icon: Coffee,
    },
    {
      a: "لحظات تستحق العودة",
      e: "Moments worth returning for",
      label: c("الترفيه", "PLAY"),
      path: "/entertainment",
      image: "/images/smarvy/Smarvy_banner.jpg",
      icon: Ticket,
    },
    {
      a: "كل يوم أقرب لك",
      e: "Your everyday essentials",
      label: c("الهايبر ماركت", "EVERYDAY"),
      path: "/hypermarket",
      image: "/images/hypermarket/Entrance_Image02.webp",
      icon: Store,
    },
  ];
  const moments = [
    {
      a: "بداية يومك",
      e: "Start your day",
      text: c(
        "احتياجات البيت ومنتجات طازجة في هايبر ماركت العامر.",
        "Fresh picks and home essentials at Al Amer Hypermarket."
      ),
      image: "/images/hypermarket/fresh_vegetables.webp",
      path: "/hypermarket",
    },
    {
      a: "وقت لنفسك",
      e: "An afternoon for you",
      text: c(
        "اكتشف المتاجر، ثم استمتع باستراحة في المقهى.",
        "Discover the stores, then pause for a café moment."
      ),
      image: "/images/dining/Wacafe/Wacafe_image.webp",
      path: "/restaurants",
    },
    {
      a: "مساء يجمعنا",
      e: "An evening together",
      text: c(
        "اجمع العائلة على تجربة من الطعام والمرح.",
        "Bring the family together for dining and play."
      ),
      image: "/images/smarvy/Smarvy_banner.jpg",
      path: "/entertainment",
    },
  ];
  return (
    <div className="am-site" dir={ar ? "rtl" : "ltr"}>
      <SEO
        title={c(
          "العامر مول | لكل زيارة حكاية",
          "Al Amer Mall | Where Al Ahsa meets. Where your story begins."
        )}
        description={c(
          "اكتشف التسوق والمطاعم والترفيه وفرص التأجير في العامر مول بالأحساء.",
          "Discover shopping, dining, entertainment and leasing at Al Amer Mall, Al Ahsa."
        )}
      />
      <Header />
      <section className="am-hero">
        <img
          className="am-hero-image"
          src="/images/alamerMall/mall_image01.webp"
          alt={c("العامر مول", "Al Amer Mall")}
          fetchPriority="high"
        />
        <div className="am-hero-shade" />
        <div className="am-hero-content">
          <span className="am-eyebrow">{c("العامر مول · الأحساء", "AL AMER MALL · AL AHSA")}</span>
          <h1>
            {c("حيث تلتقي الأحساء…", "Where Al Ahsa meets.")}
            <br />
            <em>{c("وتبدأ الحكاية.", "Where your story begins.")}</em>
          </h1>
          <p>
            {c(
              "بين اكتشافٍ يلفت انتباهك، ومذاقٍ يجمعكم، ولحظةٍ تحب أن تعيشها من جديد… لكل زيارة سببٌ آخر للعودة.",
              "A discovery that catches your eye. A taste worth sharing. A moment you want to relive. Every visit brings another reason to return."
            )}
          </p>
          <div className="am-actions">
            <a className="am-button" href="#visit">
              {c("اصنع يومك هنا", "Make it your day")}
              <ArrowUpRight size={19} />
            </a>
            <a className="am-button am-button-outline" href="#discover">
              {c("اكتشف المول", "Explore the mall")}
              <ArrowRight size={19} />
            </a>
          </div>
        </div>
        <div className="am-hero-bottom">
          <span>
            {c("المبرز، الأحساء · المملكة العربية السعودية", "AL MUBARRAZ, AL AHSA · SAUDI ARABIA")}
          </span>
          <a href="#discover">{c("تجربة تستحق الاكتشاف", "SCROLL TO DISCOVER")} ↓</a>
        </div>
      </section>
      <div className="am-strip">
        <span>{c("تسوّق", "SHOP")}</span>
        <i /> <span>{c("تذوّق", "DINE")}</span>
        <i />
        <span>{c("استمتع", "PLAY")}</span>
        <i />
        <span>{c("اجتمع", "CONNECT")}</span>
        <i />
        <span>{c("انمُ معنا", "GROW WITH US")}</span>
      </div>
      <MallStatistics />
      <DestinationHighlights />
      <BrandExplorer />
      <section id="discover" className="am-section am-reveal">
        <div className="am-heading">
          <div>
            <span className="am-eyebrow">
              {c("وجهة، وأكثر", "ONE DESTINATION. MANY POSSIBILITIES.")}
            </span>
            <h2>{c("كل زيارة، حكاية.", "Every visit, a story.")}</h2>
          </div>
          <Link className="am-text-link" to="/gallery">
            {c("شاهد المول", "See the destination")} ↗
          </Link>
        </div>
        <div className="am-experiences">
          {experiences.map((x, i) => (
            <Link className="am-experience" key={x.path} to={x.path}>
              <img src={x.image} alt={c(x.a, x.e)} loading="lazy" />
              <div className="am-card-shade" />
              <span className="am-card-number">0{i + 1}</span>
              <div className="am-experience-copy">
                <x.icon size={24} />
                <span>{x.label}</span>
                <h3>{c(x.a, x.e)}</h3>
                <ArrowUpRight size={26} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="am-business am-reveal" id="commercial">
        <div className="am-section am-business-grid">
          <div>
            <span className="am-eyebrow">
              {c("علامتك. وجهتنا.", "YOUR BRAND. OUR DESTINATION.")}
            </span>
            <h2>
              {c("المكان المناسب،", "The right place.")}
              <br />
              <em>{c("لفصلك القادم.", "Your next chapter.")}</em>
            </h2>
            <p>
              {c(
                "حين يجتمع التسوق اليومي مع المطاعم والترفيه، تتعدد أسباب الزيارة. اكتشف كيف يمكن لعلامتك أن تكون جزءًا من تجربة العامر مول.",
                "Everyday shopping, dining and entertainment bring different reasons to visit. Discover how your brand can become part of the Al Amer Mall experience."
              )}
            </p>
            <Link className="am-button" to="/rental">
              {c("استكشف فرص الأعمال", "Explore business opportunities")} ↗
            </Link>
          </div>
          <div className="am-reasons">
            {[
              [
                c("موقع في الأحساء", "Located in Al Ahsa"),
                c(
                  "وجهة في المبرز تجمع احتياجات الزائر في مكان واحد.",
                  "A destination in Al Mubarraz bringing visitor needs together."
                ),
              ],
              [
                c("هايبر ماركت رئيسي", "An everyday anchor"),
                c(
                  "احتياجات يومية تمنح المتسوق سببًا للعودة.",
                  "Everyday essentials give shoppers a reason to return."
                ),
              ],
              [
                c("تجربة عائلية متنوعة", "A varied family experience"),
                c(
                  "متاجر ومطاعم وترفيه تدعم تجربة متكاملة.",
                  "Retail, dining and entertainment support a complete visit."
                ),
              ],
              [
                c("شراكة تبدأ بفهم نشاطك", "A partnership built around your concept"),
                c(
                  "شارك احتياجك ليقترح فريق التأجير الخيارات المناسبة.",
                  "Share your requirement so our team can discuss suitable options."
                ),
              ],
            ].map(([title, text], i) => (
              <article key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="am-section am-motion am-reveal">
        <div className="am-video">
          <video
            ref={video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/smarvy/Smarvy_banner.jpg"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => setPlaying(false)}
          >
            <source src="/images/smarvy/Smarvy-video.webm" type="video/webm" />
          </video>
          <button
            aria-label={
              playing ? c("إيقاف الفيديو", "Pause video") : c("تشغيل الفيديو", "Play video")
            }
            onClick={() => {
              if (playing) video.current?.pause();
              else video.current?.play().catch(() => setPlaying(false));
            }}
          >
            {playing ? <Pause /> : <Play />}
          </button>
          <span>
            {c("سمارفي · تجربة ترفيه حقيقية", "SMARVY · A REAL ENTERTAINMENT EXPERIENCE")}
          </span>
        </div>
        <div>
          <span className="am-eyebrow">{c("أكثر من تسوق", "MORE THAN SHOPPING")}</span>
          <h2>
            {c("المرح،", "Good times.")}
            <br />
            {c("جزء من المكان.", "Part of the place.")}
          </h2>
          <p>
            {c(
              "لحظات العائلة تبدأ هنا. اكتشف سمارفي وأضف إلى زيارتك تجربة مليئة بالحركة والمرح.",
              "Family moments begin here. Discover Smarvy and add energy and play to your visit."
            )}
          </p>
          <Link className="am-text-link" to="/entertainment/smarvy">
            {c("اكتشف سمارفي", "Discover Smarvy")} ↗
          </Link>
        </div>
      </section>
      <section className="am-section am-reveal">
        <div className="am-heading">
          <div>
            <span className="am-eyebrow">
              {c("المول على إيقاعك", "A DESTINATION AT YOUR PACE")}
            </span>
            <h2>{c("اختر لحظتك.", "Find your moment.")}</h2>
          </div>
          <div
            className="am-tabs"
            role="tablist"
            aria-label={c("تجارب الزيارة", "Visit experiences")}
          >
            {moments.map((m, i) => (
              <button
                key={m.e}
                role="tab"
                aria-selected={period === i}
                aria-controls="moment-panel"
                id={`moment-${i}`}
                onClick={() => setPeriod(i)}
              >
                {c(m.a, m.e)}
              </button>
            ))}
          </div>
        </div>
        <div
          className="am-moment"
          id="moment-panel"
          role="tabpanel"
          aria-labelledby={`moment-${period}`}
        >
          <img
            src={moments[period].image}
            alt={c(moments[period].a, moments[period].e)}
            loading="lazy"
          />
          <div>
            <span className="am-eyebrow">0{period + 1} / 03</span>
            <h3>{c(moments[period].a, moments[period].e)}</h3>
            <p>{moments[period].text}</p>
            <Link className="am-text-link" to={moments[period].path}>
              {c("اكتشف التجربة", "Explore the experience")} ↗
            </Link>
          </div>
        </div>
      </section>
      <section className="am-section am-reveal" id="visit">
        <div className="am-heading">
          <div>
            <span className="am-eyebrow">{c("خطط لزيارتك", "MAKE IT YOUR DAY")}</span>
            <h2>{c("يومك يبدأ باختيار.", "Your day starts with a choice.")}</h2>
          </div>
          <Link className="am-text-link" to="/maps">
            {c("خريطة المول", "Mall map")} ↗
          </Link>
        </div>
        <div className="am-visit">
          <div>
            <label htmlFor="visit-type">
              {c("كيف تحب أن تقضي وقتك؟", "How would you like to spend your time?")}
            </label>
            <select id="visit-type" value={plan} onChange={(e) => setPlan(e.target.value)}>
              <option value="family">{c("وقت مع العائلة", "Family time")}</option>
              <option value="shopping">{c("تسوق واحتياجات يومية", "Shopping & essentials")}</option>
              <option value="dining">{c("مطاعم ومقاهي", "Dining & cafés")}</option>
            </select>
            <div className="am-itinerary" aria-live="polite">
              {(plan === "family"
                ? [
                    c("اكتشف سمارفي", "Explore Smarvy"),
                    c("استراحة في المطاعم", "A dining break"),
                    c("جولة في المتاجر", "Browse the stores"),
                  ]
                : plan === "shopping"
                  ? [
                      c("ابدأ بالهايبر ماركت", "Start at the hypermarket"),
                      c("اكتشف المتاجر", "Discover the stores"),
                      c("استراحة قهوة", "Pause for coffee"),
                    ]
                  : [
                      c("اختر مطعمك", "Choose your restaurant"),
                      c("جولة داخل المول", "Explore the mall"),
                      c("اختم بمقهى", "Finish with a café"),
                    ]
              ).map((x, i) => (
                <p key={x}>
                  <span>0{i + 1}</span>
                  {x}
                </p>
              ))}
            </div>
            <a
              className="am-button"
              href="https://www.google.com/maps/search/?api=1&query=Al+Amer+Mall+Al+Mubarraz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin size={18} />
              {c("احصل على الاتجاهات", "Get directions")}
            </a>
          </div>
          <img
            src="/images/alamerMall/mall_image.webp"
            alt={c("مدخل العامر مول", "Al Amer Mall entrance")}
            loading="lazy"
          />
        </div>
      </section>
      <section className="am-business am-reveal">
        <div className="am-section">
          <span className="am-eyebrow">
            {c("فرص تنطلق من احتياجك", "AN OPPORTUNITY THAT STARTS WITH YOU")}
          </span>
          <h2>{c("ما مساحة طموحك؟", "Room for your ambition.")}</h2>
          <p>
            {c(
              "حدد نشاطك ومساحتك وجمهورك. الخطوة التالية: نقاش مباشر مع فريق التأجير.",
              "Choose your concept, space and audience. Next: a conversation with our leasing team."
            )}
          </p>
          <OpportunityFinder />
        </div>
      </section>
      <DestinationGallery />
      <SocialVideos />
      <VisitorServices />
      <MallStories />
      <section className="am-section am-reveal am-news">
        <div>
          <span className="am-eyebrow">{c("ابقَ قريبًا", "STAY CONNECTED")}</span>
          <h2>{c("حكايات المول، مستمرة.", "The story keeps moving.")}</h2>
          <p>
            {c(
              "تابع الأخبار والفعاليات وقصص العلامات من قنوات العامر مول.",
              "Follow destination news, events and brand stories on Al Amer Mall channels."
            )}
          </p>
          <Link className="am-text-link" to="/events">
            {c("الأخبار والفعاليات", "News & events")} ↗
          </Link>
        </div>
        <div className="am-social">
          {[
            ["Instagram", "https://www.instagram.com/alamermall/"],
            ["TikTok", "https://www.tiktok.com/@alamermall"],
            ["LinkedIn", "https://www.linkedin.com/company/al-amer-mall"],
            ["Snapchat", "https://www.snapchat.com/@alamermall"],
          ].map(([n, url]) => (
            <a key={n} href={url} target="_blank" rel="noopener noreferrer">
              {n}
              <ArrowUpRight />
            </a>
          ))}
        </div>
      </section>
      <section className="am-final">
        <img
          src="/images/alamerMall/Mall_image03.webp"
          alt={c("داخل العامر مول", "Inside Al Amer Mall")}
          loading="lazy"
        />
        <div>
          <span className="am-eyebrow">
            {c("الأحساء · وجهتك القادمة", "AL AHSA · YOUR NEXT DESTINATION")}
          </span>
          <h2>
            {c("قصتك القادمة،", "Your next story.")}
            <br />
            {c("تبدأ هنا.", "Starts here.")}
          </h2>
          <div className="am-actions">
            <Link className="am-button" to="/rental/inquiry">
              {c("تواصل مع فريق التأجير", "Talk to our leasing team")} ↗
            </Link>
            <a
              className="am-button am-button-outline"
              href="/business-profile.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              {c("ملف المول التجاري", "Business profile")} ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
