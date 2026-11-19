import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
export default function OpportunityFinder() {
  const { i18n } = useTranslation();
  const ar = i18n.language.startsWith("ar");
  const c = (a: string, e: string) => (ar ? a : e);
  const [type, setType] = useState("retail");
  const [area, setArea] = useState("100–250");
  const [audience, setAudience] = useState("families");
  const [show, setShow] = useState(false);
  const query = new URLSearchParams({ category: type, area, audience }).toString();
  return (
    <div className="opportunity-finder">
      <div className="finder-fields">
        <label>
          {c("نوع النشاط", "Business type")}
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setShow(false);
            }}
          >
            {[
              ["retail", "متجر / أزياء", "Retail / fashion"],
              ["food", "مطعم / مقهى", "Restaurant / café"],
              ["beauty", "عناية وجمال", "Beauty"],
              ["entertainment", "ترفيه", "Entertainment"],
              ["kiosk", "كشك", "Kiosk"],
            ].map(([v, a, e]) => (
              <option key={v} value={v}>
                {c(a, e)}
              </option>
            ))}
          </select>
        </label>
        <label>
          {c("المساحة المطلوبة (م²)", "Required area (m²)")}
          <select
            value={area}
            onChange={(e) => {
              setArea(e.target.value);
              setShow(false);
            }}
          >
            {["20–50", "50–100", "100–250", "250–500", "500+"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label>
          {c("الجمهور المستهدف", "Target audience")}
          <select
            value={audience}
            onChange={(e) => {
              setAudience(e.target.value);
              setShow(false);
            }}
          >
            {[
              ["families", "العائلات", "Families"],
              ["youth", "الشباب", "Young adults"],
              ["children", "الأطفال", "Children"],
              ["all", "الجميع", "Everyone"],
            ].map(([v, a, e]) => (
              <option key={v} value={v}>
                {c(a, e)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button className="am-button" onClick={() => setShow(true)}>
        {c("اعرض المسار المناسب", "Find your direction")} ↗
      </button>
      {show && (
        <div className="finder-result" aria-live="polite">
          <h3>
            {type === "food"
              ? c("تجربة ضيافة ضمن وجهة متكاملة", "A hospitality concept in a complete destination")
              : type === "entertainment"
                ? c("تجربة ترفيه للعائلة", "A family entertainment concept")
                : c("مساحة لعلامتك وتجربتها", "A space for your brand experience")}
          </h3>
          <p>
            {c(
              `احتياجك: ${area} م². سيراجع فريق التأجير المواقع المناسبة لنشاطك وجمهورك، ويؤكد التوفر والمساحة والشروط.`,
              `Your requirement: ${area} m². Our leasing team will review locations for your concept and audience, then confirm availability, size and terms.`
            )}
          </p>
          <Link className="am-text-link" to={`/rental/inquiry?${query}`}>
            {c("تابع طلب التأجير", "Continue leasing inquiry")} ↗
          </Link>
        </div>
      )}
    </div>
  );
}
