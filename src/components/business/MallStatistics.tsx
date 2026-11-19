import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ksaCutoff, modelYear, buckets } from "../../lib/footfall.mjs";
function Count({ n, locale }: { n: number; locale: string }) {
  const [value, setValue] = useState(n);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(n);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const step = (time: number) => {
      const p = Math.min((time - start) / 1100, 1);
      setValue(Math.round(n * (1 - (1 - p) ** 3)));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [n]);
  return <>{value.toLocaleString(locale)}</>;
}
export default function MallStatistics({ initialCutoff }: { initialCutoff?: string }) {
  const { i18n } = useTranslation();
  const ar = i18n.language.startsWith("ar");
  const c = (a: string, e: string) => (ar ? a : e);
  const locale = ar ? "ar-SA" : "en-US";
  const [cutoff, setCutoff] = useState(initialCutoff || ksaCutoff());
  const growth = 6;
  const [view, setView] = useState("month");
  useEffect(() => {
    setCutoff(ksaCutoff());
    const id = setInterval(() => setCutoff(ksaCutoff()), 60000);
    return () => clearInterval(id);
  }, []);
  const year = Number(cutoff.slice(0, 4));
  const annual = Math.round(7400000 * (1 + growth / 100));
  const rows = useMemo(
    () => modelYear(year, annual).filter((r) => r.date <= cutoff),
    [year, annual, cutoff]
  );
  const baseline = useMemo(() => modelYear(2025, 7400000), []);
  const total = rows.reduce((s, r) => s + r.visits, 0);
  const month = rows
    .filter((r) => r.date.slice(0, 7) === cutoff.slice(0, 7))
    .reduce((s, r) => s + r.visits, 0);
  const latest = rows.at(-1)?.visits || 0;
  const chart = buckets(rows, view);
  const plotted = view === "week" ? chart.slice(-8) : chart;
  const maximum = Math.max(...plotted.map((r) => r.visits), 1);
  const priorCutoff = `2025${cutoff.slice(4)}`;
  const comparison = buckets(
    baseline.filter((r) => r.date <= priorCutoff),
    "month"
  );
  const monthly = buckets(rows, "month");
  const lineMax = Math.max(...monthly.map((r) => r.visits), ...comparison.map((r) => r.visits), 1);
  const points = (data: { label: string; visits: number }[]) =>
    data
      .map(
        (r, i) =>
          `${30 + (i * 900) / Math.max(monthly.length - 1, 1)},${210 - (r.visits / lineMax) * 175}`
      )
      .join(" ");
  const prior = baseline.filter((r) => r.date <= priorCutoff).reduce((s, r) => s + r.visits, 0);
  const priorMonth = baseline
    .filter((r) => r.date.slice(5, 7) === cutoff.slice(5, 7) && r.date <= priorCutoff)
    .reduce((s, r) => s + r.visits, 0);
  const monthChange = priorMonth ? ((month / priorMonth - 1) * 100).toFixed(1) : "0";
  const difference = prior ? ((total / prior - 1) * 100).toFixed(1) : "0";
  const label = (key: string) =>
    view === "week"
      ? new Date(key + "T00:00:00Z").toLocaleDateString(locale, {
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        })
      : new Date(key + "-01T00:00:00Z").toLocaleDateString(locale, {
          month: "short",
          timeZone: "UTC",
        });
  return (
    <section className="nm-statistics" id="statistics">
      <div className="am-section">
        <div className="am-heading">
          <div>
            <span className="am-eyebrow">{c("نبض الوجهة", "THE DESTINATION PULSE")}</span>
            <h2>
              {c("ملايين الزيارات.", "Millions of visits.")}
              <br />
              <em>{c("فرص تتجدد.", "New possibilities.")}</em>
            </h2>
          </div>
          <div className="nm-period">
            <span>{c("حتى نهاية أمس · توقيت السعودية", "Through yesterday · Saudi time")}</span>
            <strong>{cutoff}</strong>
            <small>
              {c(
                "الأرقام الحالية محسوبة من 7.4 مليون زيارة في 2025 بنمو مفترض 6%، وليست قياسات فعلية.",
                "Current figures are modeled from 7.4M visits in 2025 with assumed 6% growth; they are not measured counts."
              )}
            </small>
          </div>
        </div>
        <div className="nm-stats-grid">
          <article className="nm-history">
            <span>{c("زيارات العام الماضي · 2025", "Last year’s visits · 2025")}</span>
            <strong>
              <Count n={7400000} locale={locale} />
            </strong>
            <small>
              {c("بحسب الرقم المقدم من إدارة المول", "Figure supplied by mall management")}
            </small>
          </article>
          <article>
            <span>{c(`زيارات ${year} حتى أمس`, `${year} visits through yesterday`)}</span>
            <strong>
              <Count n={total} locale={locale} />
            </strong>
            <small className="nm-growth">
              +{difference}% {c("مقارنة نفس الفترة", "same-period comparison")}
            </small>
          </article>
          <article>
            <span>{c("زيارات الشهر حتى أمس", "Month through yesterday")}</span>
            <strong>
              <Count n={month} locale={locale} />
            </strong>
            <small className="nm-growth">
              +{monthChange}% {c("مقارنة نفس الشهر", "same-month comparison")}
            </small>
          </article>
          <article>
            <span>{c("زيارات أمس", "Yesterday’s visits")}</span>
            <strong>
              <Count n={latest} locale={locale} />
            </strong>
            <small>
              {c("زيارات، وليست أشخاصًا موجودين الآن", "Visits, not current occupancy")}
            </small>
          </article>
        </div>
        <div className="nm-chart-layout">
          <div className="nm-chart">
            <div className="am-heading">
              <h3>{c("حركة الزيارات", "Visitor momentum")}</h3>
              <div className="am-tabs">
                {[
                  ["month", "أشهر السنة", "Monthly"],
                  ["week", "آخر 8 أسابيع", "Last 8 weeks"],
                ].map(([v, a, e]) => (
                  <button key={v} aria-pressed={view === v} onClick={() => setView(v)}>
                    {c(a, e)}
                  </button>
                ))}
              </div>
            </div>
            <p className="nm-chart-caption">
              {c(
                "الأشهر والأسابيع مع أرقامها حتى نهاية أمس",
                "Monthly and weekly figures through yesterday"
              )}
            </p>
            <div className="nm-bars" key={view}>
              {plotted.map((r) => (
                <div className="nm-bar-column" key={r.label}>
                  <span>
                    {Math.round(r.visits / 1000).toLocaleString(locale)}
                    {c(" ألف", "k")}
                  </span>
                  <div className="nm-bar-track">
                    <div
                      className="am-animated-bar"
                      style={{ height: `${(r.visits / maximum) * 100}%` }}
                    />
                  </div>
                  <small>{label(r.label)}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="am-visit-comparison">
          <div className="am-heading">
            <h3>{c("مقارنة الزيارات الشهرية", "Monthly visit comparison")}</h3>
            <div className="am-chart-legend">
              <span>
                ● {year} {c("", "")}
              </span>
              <span>● 2025 {c("", "")}</span>
            </div>
          </div>
          <svg
            viewBox="0 0 960 250"
            role="img"
            aria-label={c(
              "مقارنة شهرية محسوبة بين العامين",
              "Modeled monthly comparison between years"
            )}
          >
            <path
              d="M30 35H930 M30 95H930 M30 155H930 M30 210H930"
              stroke="#d9d2c5"
              strokeWidth="1"
            />
            <polyline
              points={points(comparison)}
              fill="none"
              stroke="#aaa08e"
              strokeWidth="3"
              strokeDasharray="6 6"
            />
            <polyline
              key={annual}
              className="am-chart-line"
              points={points(monthly)}
              fill="none"
              stroke="#a37643"
              strokeWidth="4"
            />
            {monthly.map((r, i) => (
              <g key={r.label}>
                <circle
                  cx={30 + (i * 900) / Math.max(monthly.length - 1, 1)}
                  cy={210 - (r.visits / lineMax) * 175}
                  r="5"
                  fill="#a37643"
                >
                  <title>{`${r.label}: ${r.visits.toLocaleString(locale)}`}</title>
                </circle>
                <text
                  x={30 + (i * 900) / Math.max(monthly.length - 1, 1)}
                  y="242"
                  textAnchor="middle"
                  fontSize="13"
                  fill="#61574b"
                >
                  {new Date(r.label + "-01T00:00:00Z").toLocaleDateString(locale, {
                    month: "short",
                    timeZone: "UTC",
                  })}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <details className="nm-data-table">
          <summary>{c("اعرض الأرقام وطريقة الحساب", "View figures and methodology")}</summary>
          <p>
            {c(
              "المرجع الوحيد الفعلي المقدم: 7.4 مليون زيارة في 2025. بقية الفترات محسوبة بأوزان افتراضية، ويبلغ افتراض النمو الافتراضي 6%. لتقديم إحصاءات فعلية يجب استبدال النموذج بسجلات عدّ الزوار.",
              "The supplied historical reference is 7.4M visits in 2025. Other periods are estimates, with a default assumed annual growth of 6%. Actual reporting requires visitor-count records."
            )}
          </p>
          <table>
            <thead>
              <tr>
                <th>{c("الفترة", "Period")}</th>
                <th>{c("الزيارات المحسوبة", "Modeled visits")}</th>
              </tr>
            </thead>
            <tbody>
              {chart.map((r) => (
                <tr key={r.label}>
                  <td>{r.label}</td>
                  <td>{r.visits.toLocaleString(locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </div>
    </section>
  );
}
