# Immersive Inspiration (Video / Motion / Interactivity)

Award-winning and experiential patterns to adapt for a Christmas lights site.

## Awwwards/Showcase Patterns (general)
- Video background hero with soft overlay text and strong CTA.
- Scroll-triggered reveals (GSAP ScrollTrigger), parallax depth, masked text reveals.
- Micro-interactions on hover for cards, buttons, gallery items.

## Twinbru (3D + SVG line animation)
- Ref: https://www.digitalsilk.com/digital-trends/website-animations/
- Borrow: loading line animation, subtle cursor-reactive particles, layered scroll reveals.

## The Eames by Enso (Scrollytelling)
- Ref: https://www.ryviu.com/blog/interactive-websites-examples/
- Borrow: narrative sections with pinned panels; progress-based animation.

## Waaark (Interactive studio site)
- Ref: https://www.designveloper.com/blog/website-animations/
- Borrow: hover-reactive typography and cards; transform static images to motion on hover.

## Corebook° (Principle reveals)
- Ref: https://www.designveloper.com/blog/website-animations/
- Borrow: content sections that animate in with masked shapes and subtle easing.

## Superlist (UI motion)
- Ref: https://www.digitalsilk.com/digital-trends/website-animations/
- Borrow: element choreography; staggered entrances matched to scroll.

## Species in Pieces (Generative motion)
- Ref: https://ichirr.com/20-website-animation-examples-to-enhance-user-engagement-and-captivate-your-audience/
- Borrow: shape morphs between scenes; use for seasonal themes or pattern transitions.

---

### Motion System Guidelines
- Duration: 300–500ms for UI; 800–1200ms for section reveals.
- Easing: use standard ease-out; avoid bounce for professional feel.
- Performance: use GPU-accelerated transforms, CSS opacity, will-change hints.
- Accessibility: reduced motion preference honors `prefers-reduced-motion`.
- Mobile: cap video bitrate, provide image fallback.

### Tools & Libs
- GSAP + ScrollTrigger for scroll scenes.
- Framer Motion or Motion One for React components.
- Lottie for lightweight vector animations.
- three.js or R3F for subtle 3D sparkle effects (optional).