# ASAP Travel Africa — Website

Production website for **ASAP Travel Africa** (asaptravelafrica.com) — car rental, self drive and tailored trips across Zimbabwe and Southern Africa.

## Stack

Pure static site — no framework, no build step, no dependencies.

- `index.html` — the full one-page site
- `404.html` — custom not-found page
- `assets/css/style.css` — hover/focus states and responsive breakpoints
- `assets/js/main.js` — sticky nav, hero video montage, fleet tabs, destinations carousel, booking form
- `assets/images/` — logos, destination photos, favicon
- `robots.txt`, `sitemap.xml` — SEO

Fonts (Inter, Space Grotesk) load from Google Fonts. Stock photos/videos load from Pexels/Unsplash CDNs. The GoHighLevel External Tracking script (`tk_04fa3cfa5cbb4fa5aafa683419abec81`) loads before `</body>` and captures submissions of the `#asap-booking-request` form.

## Deploy to Cloudflare Pages

1. Push this folder to a new GitHub repository (all files at the repo root).
2. In Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**, select the repo.
3. Use these build settings:

| Setting | Value |
|---|---|
| Framework preset | **None** |
| Build command | *(leave empty)* |
| Build output directory | `/` |
| Root directory | `/` |
| Environment variables | *(none required)* |
| Node version | *(not applicable — no build)* |

4. Deploy. Cloudflare Pages serves `index.html` at the root and automatically uses `404.html` for missing routes.
5. Add the custom domain `asaptravelafrica.com` under the project's **Custom domains** tab.

Because this is a single-page static site with hash navigation (`#fleet`, `#book`, …), refreshing any URL never 404s — all in-page routes resolve on `/`.

## Editing

- **Fleet cars / prices**: edit the `CARS` array at the top of `assets/js/main.js`.
- **Booking form fields**: in `index.html`, form `#asap-booking-request`. Field names (`full_name`, `email`, `phone`, `travel_service_needed`, `pick_up_location`, `travel_dates`, `travel_requirements`) are wired to GoHighLevel — keep them unchanged.
- **Contact details**: search `index.html` for the `#contact` section and footer.
