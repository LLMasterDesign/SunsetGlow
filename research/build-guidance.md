# Build Guidance and Implementation Plan

## Tech Stack
- Frontend: React + Vite + TypeScript + Tailwind CSS.
- Motion: GSAP + ScrollTrigger; Framer Motion for component choreography.
- Media: MP4/WebM hero video (1080p max, 3–8 Mbps), image fallbacks.
- Forms: Serverless function (Netlify/Vercel) or service (Formspree/HubSpot/Airtable).

## Architecture
- Pages: Home, Portfolio, Services, Process, Pricing, Service Area, About, Contact.
- Components: HeroVideo, BeforeAfterSlider, GalleryGrid, TestimonialCarousel, CTAStickyBar, ZipChecker, QuoteEstimator, SchedulerEmbed.
- Data: JSON/YAML for gallery items with tags; environment config for service areas.

## Hero Video Implementation
- Use <video> with autoplay muted playsinline loop; poster fallback.
- Provide reduced-motion alternative (static hero) via CSS `@media (prefers-reduced-motion)`.
- Keep first frame bright and legible under overlay.

## Scroll & Interaction
- GSAP timelines bound to ScrollTrigger for reveals and parallax.
- Staggered Framer Motion on cards; hover elevates with subtle scale/shine.
- Before/After slider using pointer events and requestAnimationFrame.

## Performance
- Preload hero video poster; lazy-load non-critical media.
- Serve responsive images via `<img srcset>`; compress with modern formats (AVIF/WebP/JPEG XL fallback policy).
- Code-split gallery route; defer heavy libraries until view.

## Accessibility
- Semantic HTML, proper alt text, sufficient color contrast.
- Keyboard operable sliders and galleries.
- Pause/stop/hide controls for moving content (WCAG 2.2.2).

## SEO & Local
- Metadata per page; JSON-LD LocalBusiness with service area and hours.
- Location pages for key cities; embed map; NAP consistency.
- Fast LCP: prioritize hero poster and headline render.

## Analytics & CRO
- Track: CTA clicks, quote estimator events, zip checks, scheduler conversions.
- A/B test hero copy and CTA wording.
- Heatmaps/session replay (privacy aware) to refine layout.

## Delivery Plan (Milestones)
1) Foundation: layout, routing, hero video with overlay CTA.
2) Gallery + Before/After + Testimonials.
3) Process scrollytelling + ZipChecker + CTAStickyBar.
4) QuoteEstimator + SchedulerEmbed; analytics wired.
5) SEO/local pages, performance tuning, accessibility pass.

## Content Prep Checklist
- 20–40 high-quality photos; 6–10 short night clips.
- 3–5 testimonials (video preferred), badges, insurance proof.
- Service area list with zips; pricing ranges; availability calendar.