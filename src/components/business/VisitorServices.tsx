import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
export default function VisitorServices() {
  const { i18n } = useTranslation();
  const ar = i18n.language.startsWith("ar");
  const c = (a: string, e: string) => (ar ? a : e);
  return (
    <section className="am-section" id="services">
      <div className="am-heading">
        <div>
          <span className="am-eyebrow">{c("زيارة أسهل", "AN EASIER VISIT")}</span>
          <h2>{c("كل ما تحتاجه، أقرب.", "Everything you need, closer.")}</h2>
        </div>
      </div>
      <div className="am-service-grid">
        {[
          [
            "/maps",
            "خريطة المول",
            "Mall map",
            "اكتشف توزيع الوجهة قبل وصولك.",
            "Explore the destination before you arrive.",
          ],
          [
            "/customer-service",
            "خدمات الزوار",
            "Guest services",
            "استفسر عن الخدمات ومساعدة الزوار.",
            "Ask about services and visitor assistance.",
          ],
          [
            "/events",
            "الأخبار والفعاليات",
            "News & events",
            "تابع أخبار الوجهة ومواعيد الأنشطة المنشورة.",
            "Explore destination news and listed activities.",
          ],
          [
            "/contact",
            "سهولة الوصول",
            "Accessibility assistance",
            "تواصل قبل الزيارة لتأكيد التسهيلات المناسبة لاحتياجك.",
            "Contact us before visiting to confirm assistance for your needs.",
          ],
        ].map(([path, a, e, at, et], i) => (
          <Link key={path} to={path}>
            <span>0{i + 1}</span>
            <h3>{c(a, e)}</h3>
            <p>{c(at, et)}</p>↗
          </Link>
        ))}
      </div>
      <div className="am-concierge">
        <h3>{c("تحتاج مساعدة في اختيار تجربتك؟", "Need help choosing your experience?")}</h3>
        <p>
          {c(
            "فريق المول قريب منك. تواصل للاستفسارات أو لتنسيق جولة تجارية.",
            "Our mall team is here to help with questions or to coordinate a business visit."
          )}
        </p>
        <a
          className="am-button"
          href="https://wa.me/966544439986"
          target="_blank"
          rel="noopener noreferrer"
        >
          {c("تواصل مع الفريق", "Contact the team")} ↗
        </a>
      </div>
    </section>
  );
}
