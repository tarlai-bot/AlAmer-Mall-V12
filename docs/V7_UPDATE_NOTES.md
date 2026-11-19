# Al Amer Mall — V7 destination and business experience

## Included
- Rebuilt bilingual homepage in charcoal, ivory, champagne and Al Amer orange.
- Real mall photographs replace AI concept images on the homepage.
- Separate actions for exploring the destination and leasing.
- Retail, dining, entertainment and hypermarket discovery cards.
- Brand logo wall using assets already supplied with the project.
- Existing Smarvy WebM video plays muted, inline and looping; pause/play control and poster fallback. Browser autoplay policy still applies. Reduced-motion users start paused.
- Three selectable visit moments and an interactive visit planner with Google Maps directions.
- New bilingual leasing page, requirement finder and inquiry preparation form.
- Requirements pass into the inquiry form. Contact details remain in memory, not browser storage.
- The form opens a prepared email or WhatsApp message; the user sends it there. There is no backend delivery or simulated success.
- Printable bilingual business profile at /business-profile.html. Use Print / Save as PDF.
- Responsive navigation, escape-to-close mobile menu and contrasting language control.
- Removed invented visitor counter and fictional available units from updated pages.

## Deployment
The archive contains the full source and a prebuilt dist/ directory. Deploy the contents of dist/ to a static host. Configure all application paths to fall back to index.html. Existing web.config and vercel.json are retained. To rebuild: npm ci; npm run build. Admin source remains included.

## Validation
- Production Vite build passed.
- Static asset references introduced in the new pages exist.
- New application links match declared router paths.
- Whole-project TypeScript check remains blocked by pre-existing errors in Careers, ContactUs, CustomerService, Investment, Footer and several other original files. No reported errors in newly implemented Home, Rental, RentalInquiry or OpportunityFinder.
- Browser visual QA could not run because the runtime has no installed Chromium executable. Desktop/mobile browser acceptance remains required.
- Existing build warns about missing /grid-pattern.svg in older code.

## Data and media still needed
- Approved footfall data/feed before displaying visitor metrics; distinguish visits during a period from current occupancy.
- Approved unit inventory, floor geometry and current availability before a clickable leasing floor plan can be accurate. Existing /maps route is retained.
- Verified catchment and audience figures for an expanded investment profile.
- Mall-wide cinematic video for the hero. Current hero uses a real mall photograph, and the supplied Smarvy video plays in the entertainment section.
- Google Drive folder could not be read during this work; only media supplied in the archive were used.
- Confirm existing leasing email, WhatsApp number, store directory and event data before public deployment.
- No new SQL schema or CRM backend has been introduced. Existing integrations/admin are retained.

## Templates
The supplied React architecture was retained. No third-party template was incorporated, so no additional template license or attribution is introduced.

# V8 — demo statistics and destination stories
- Animated illustrative counters: 18,000 daily, 450,000 monthly and 4,800,000 annual visits. These values are synthetic demo data, not actual figures or forecasts. The demo badge is prominent and each counter is labeled.
- Monthly and weekday chart views, accessible data table, and visit/occupancy distinction.
- Parking photograph replaced by a supplied mall entrance photograph in the visit planner.
- Added sourced Polo soft-opening story and archived 29 July 2026 community race story. Generic mall photos are explicitly identified; they are not represented as photographs of those events.
- Added Al Amer Moments links to social channels. No external social videos were downloaded or embedded because usable video files could not be retrieved.
- Cinematic mall-wide hero video, backend news/media administration, confirmed live statistics, real available-unit map, and updated operating hours still require source media/data and integration work. They are not implemented by this update.
