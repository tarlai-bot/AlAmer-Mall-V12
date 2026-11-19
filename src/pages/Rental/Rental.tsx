import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import OpportunityFinder from "../../components/business/OpportunityFinder";
import "../Home/mall.css";
export default function Rental() {
  const { i18n } = useTranslation();
  const ar = i18n.language.startsWith("ar");
  const c = (a: string, e: string) => (ar ? a : e);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="am-site" dir={ar ? "rtl" : "ltr"}>
      <section className="am-business">
        <div className="am-section" style={{ paddingTop: 160 }}>
          <span className="am-eyebrow">
            {c("العامر مول · فرص الأعمال", "AL AMER MALL · BUSINESS OPPORTUNITIES")}
          </span>
          <h1 style={{ fontSize: "clamp(3rem,6vw,5rem)", lineHeight: 1.2 }}>
            {c("علامتك. وجهتنا.", "Your brand. Our destination.")}
          </h1>
          <p>
            {c(
              "تجزئة، مطاعم، مقاهٍ وترفيه ضمن وجهة واحدة في الأحساء. شاركنا خطتك لنبحث معك الموقع المناسب.",
              "Retail, dining, cafés and entertainment in one Al Ahsa destination. Share your plan and discuss the right location with us."
            )}
          </p>
          <div className="am-actions">
            <a className="am-button" href="#opportunities">
              {c("حدد احتياجك", "Find your direction")} ↓
            </a>
            <a
              className="am-button am-button-outline"
              href="/business-profile.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              {c("ملف المول التجاري", "Business profile")} ↗
            </a>
            <Link className="am-button am-button-outline" to="/maps">
              {c("خريطة المول", "Mall map")} ↗
            </Link>
          </div>
        </div>
      </section>
      <section className="am-section">
        <div className="am-heading">
          <h2>{c("أسباب متنوعة للزيارة.", "Different reasons to visit.")}</h2>
        </div>
        <div className="am-experiences">
          {[
            ["/stores", "/images/alamerMall/Mall_image02.webp", "المتاجر", "Retail"],
            [
              "/restaurants",
              "/images/dining/Wacafe/Wacafe_image.webp",
              "المطاعم والمقاهي",
              "Dining",
            ],
            ["/entertainment", "/images/smarvy/Smarvy_banner.jpg", "الترفيه", "Entertainment"],
            [
              "/hypermarket",
              "/images/hypermarket/Entrance_Image02.webp",
              "الهايبر ماركت",
              "Hypermarket",
            ],
          ].map(([path, image, a, e]) => (
            <Link className="am-experience" key={path} to={path}>
              <img src={image} alt={c(a, e)} loading="lazy" />
              <div className="am-card-shade" />
              <div className="am-experience-copy">
                <h3>{c(a, e)}</h3>↗
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="am-business" id="opportunities">
        <div className="am-section">
          <span className="am-eyebrow">
            {c("لنبدأ من احتياجك", "LET’S START WITH YOUR REQUIREMENT")}
          </span>
          <h2>{c("مساحة لطموحك.", "Room for your ambition.")}</h2>
          <p>
            {c(
              "يؤكد فريق التأجير الوحدات المتاحة ومساحاتها ومواقعها وشروطها عند التواصل.",
              "Available units, areas, locations and terms are confirmed by the leasing team when you contact us."
            )}
          </p>
          <OpportunityFinder />
        </div>
      </section>
      <section className="am-section">
        <h2>{c("لنفتح باب الحديث.", "Let’s open the conversation.")}</h2>
        <div className="am-actions">
          <Link className="am-button" to="/rental/inquiry">
            {c("طلب تأجير", "Leasing inquiry")} ↗
          </Link>
          <Link className="am-text-link" to="/contact">
            {c("بيانات التواصل", "Contact information")} ↗
          </Link>
        </div>
      </section>
    </div>
  );
}
