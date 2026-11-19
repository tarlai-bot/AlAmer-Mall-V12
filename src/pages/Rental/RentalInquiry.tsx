import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../Home/mall.css";
export default function RentalInquiry() {
  const { i18n } = useTranslation();
  const ar = i18n.language.startsWith("ar");
  const c = (a: string, e: string) => (ar ? a : e);
  const [params] = useSearchParams();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(() =>
    [
      params.get("category"),
      params.get("area") ? `${params.get("area")} m²` : "",
      params.get("audience"),
    ]
      .filter(Boolean)
      .join(" · ")
  );
  const [ready, setReady] = useState(false);
  useEffect(() => window.scrollTo(0, 0), []);
  const body = `${c("طلب تأجير — العامر مول", "Leasing inquiry — Al Amer Mall")}\n${c("الاسم", "Name")}: ${name}\n${c("الشركة", "Company")}: ${company}\n${c("البريد", "Email")}: ${email}\n${c("الهاتف", "Phone")}: ${phone}\n${c("الاحتياج", "Requirement")}: ${message}`;
  return (
    <div className="am-site" dir={ar ? "rtl" : "ltr"}>
      <section className="am-section" style={{ paddingTop: 150, maxWidth: 900 }}>
        <span className="am-eyebrow">{c("خطوتك الأولى", "YOUR FIRST STEP")}</span>
        <h1 style={{ fontSize: "clamp(2.8rem,5vw,4.5rem)" }}>
          {c("لنتعرف على مشروعك.", "Tell us about your concept.")}
        </h1>
        <p>
          {c(
            "أدخل بياناتك لتجهيز رسالة، ثم أرسلها من تطبيق البريد أو واتساب.",
            "Enter your details to prepare a message, then send it from your email or WhatsApp app."
          )}
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setReady(true);
          }}
          onChange={() => setReady(false)}
        >
          <div
            className="finder-fields"
            style={{ gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}
          >
            {[
              [c("الاسم", "Name"), name, setName, "text"],
              [c("الشركة / العلامة", "Company / brand"), company, setCompany, "text"],
              [c("البريد الإلكتروني", "Email"), email, setEmail, "email"],
              [c("رقم الهاتف", "Phone"), phone, setPhone, "tel"],
            ].map(([label, value, setter, type]) => (
              <label key={label as string}>
                {label as string}
                <input
                  required
                  type={type as string}
                  value={value as string}
                  onChange={(e) => (setter as (s: string) => void)(e.target.value)}
                  style={{
                    display: "block",
                    width: "100%",
                    border: "1px solid #aaa",
                    padding: 14,
                    marginTop: 10,
                  }}
                />
              </label>
            ))}
          </div>
          <label>
            {c("النشاط والمساحة والتفاصيل", "Concept, space and details")}
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              style={{
                display: "block",
                width: "100%",
                border: "1px solid #aaa",
                padding: 14,
                margin: "12px 0 24px",
              }}
            />
          </label>
          <button className="am-button" type="submit">
            {c("جهّز طلب التواصل", "Prepare inquiry")} ↗
          </button>
        </form>
        {ready && (
          <div className="finder-result" style={{ borderColor: "#aaa" }} aria-live="polite">
            <h3>{c("الرسالة جاهزة — لم تُرسل بعد", "Message ready — not sent yet")}</h3>
            <p style={{ whiteSpace: "pre-wrap", margin: "20px 0" }}>{body}</p>
            <div className="am-actions">
              <a
                className="am-button"
                href={`mailto:rentals@alamermall.com?subject=${encodeURIComponent(c("طلب تأجير — العامر مول", "Leasing inquiry — Al Amer Mall"))}&body=${encodeURIComponent(body)}`}
              >
                {c("افتح البريد للإرسال", "Open email to send")} ↗
              </a>
              <a
                className="am-button"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://wa.me/966544439986?text=${encodeURIComponent(body)}`}
              >
                {c("افتح واتساب للإرسال", "Open WhatsApp to send")} ↗
              </a>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
