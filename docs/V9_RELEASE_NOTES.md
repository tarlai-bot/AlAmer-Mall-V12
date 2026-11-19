# Al Amer Mall V9 — current release

## What is implemented
- 2025 visits: 7,400,000, supplied by the user as the mall's historical total.
- Synthetic demo counters and fabricated monthly/weekday charts removed from the current statistics component.
- Statistics cutoff is yesterday in Asia/Riyadh, recalculated on page load.
- Current-year actual total remains blank until a complete daily dataset through the cutoff is supplied. No entries are fabricated.
- Last year's daily average is derived from 7,400,000 / days in 2025. It is not presented as yesterday's visits.
- A separate collapsed estimate uses last year's average multiplied by elapsed days. Explicitly labeled a calculation, not actual footfall or an approved forecast; no growth factor is invented.
- Public statistics source: public/data/visitor-statistics.json. Daily records use {"date":"YYYY-MM-DD","visits":12345}. Keep daily dates unique, use actual entry counts, and include every day through yesterday for actual YTD display. The empty daily array is intentional.
- Unified bilingual searchable directory of 14 known brands/experiences using supplied source assets and corroborated announcements. This is not a certified exhaustive tenant roll.
- Browser-local favorite brands / visit list, category filters, Arabic spelling normalization and direct store-detail links.
- Destination gallery with four supplied real photographs, native dialog viewer, previous/next buttons, keyboard arrow navigation and Escape close.
- Two official archived Al Amer Mall LinkedIn video post embeds, loaded only on request, with permanent source links as fallback. Embedding/player availability depends on LinkedIn; playback was not browser-verified. Existing local Smarvy WebM remains available.
- Visitor service shortcuts: map, guest services, events and accessibility inquiry; unverified on-site facilities are not promised.
- Scroll entrance animations and responsive hover interactions with reduced-motion support.
- Replaced duplicate store-page header. Replaced misleading generic Polo photograph with a clearly typographic brand-name card, not an official logo.
- Business profile updated with management-provided 2025 footfall.

## Brand/media sourcing
Supplied files: Al Amer Market, DIMI, Najmah, Saffron Threads, Bukhamseen, WaCafe, Poshak, La Casa Pasta, Corn Shack, Taraf, Shaiji, Smarvy and Kids Island.
Polo: official mall LinkedIn announcement and management post corroborate the opening. A verified store photo/official logo was not retrieved; no fabricated photo or logo was used.
Bukhamseen announcement is treated as an announced partnership; current opening status is not inferred from an old “coming soon” post.
Tagged brands in LinkedIn posts are not assumed to be tenants.

## References consulted
- https://www.linkedin.com/company/al-amer-mall
- https://www.linkedin.com/posts/mohamedsaidentertainement_alamermall-apparelgroup-bhpc-activity-7496824030876962816-85RM
- https://www.linkedin.com/posts/al-amer-mall_smarvyspot-alamermall-alahsa-activity-7277701471515688960-4B3q
- https://www.linkedin.com/posts/al-amer-mall_entertainment-alahsa-shoppingexperience-activity-7140962391093161984-Lj2K
- https://thedubaimall.com/en/plan-your-visit/services
- https://www.mallofamerica.com/plan-your-trip/accessibility
- https://www.mallofamerica.com/guest-services

## Verification and limits
Production Vite build passed. New local asset references and destination routes pass static checks. No TypeScript errors reported in the new/updated feature components, Home, Stores or Restaurants. Original unrelated whole-project TypeScript errors persist.
Browser visual QA and external video playback could not be performed because Chromium is unavailable in this runtime. Test desktop/mobile and LinkedIn embeds before public deployment.
Source and production dist/ are both included. Deploy dist/ with SPA fallback to index.html. No production deployment was performed.

## Still required for full operational scope
Approved daily 2026 visitor records, a complete current tenant list, correct Polo store photographs/logo, current hours and event dates, and a backend CMS/CRM integration. No direct TikTok/Instagram downloads, new AI images, booking backend or automatic social synchronization were added. Existing admin source is retained.
