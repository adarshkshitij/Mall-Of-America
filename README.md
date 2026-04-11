# Mall of America — Interactive Sales Deck
### Liat.ai Screening Assignment

A premium, interactive, browser-based sales experience for the Mall of America. Built to demonstrate high-end technical proficiency in GSAP animations, responsive design, and performance optimization.

---

## 🚀 Vision
The goal was to replace traditional, static pitch decks with a **cinematic, non-linear storytelling platform**. This deck uses high-impact video backgrounds, scroll-triggered animations, and a modular architecture to showcase the mall's scale, luxury positioning, and entertainment value to prospective tenants, brands, and event partners.

## 🛠️ Technology Stack
- **Framework:** [Vite](https://vitejs.dev/) + Vanilla JavaScript (chosen for zero-bloat performance).
- **Smooth Scrolling:** [Lenis](https://lenis.darkroom.engineering/) for inertia-driven smooth scroll.
- **Animations:** [GSAP](https://gsap.com/) (GreenSock) for ScrollTrigger-based reveals, parallax, and timelines.
- **Styling:** Vanilla CSS with a custom-engineered Design System (Tokens-first approach).
- **Icons:** SVG-based custom iconography.

## ✨ Key Features
- **Dynamic Design System:** A "Luxury Dark" theme with gold accents, fluid typography, and consistent spacing tokens.
- **Non-Linear Navigation:** Users can navigate freely via the header or side dots; ScrollTrigger handles the reveal state regardless of the entry point.
- **Interactive Modules:**
    - **Property Overview:** Animated statistical counters.
    - **Retail Experience:** Draggable/Touch-friendly horizontal carousel.
    - **Luxury Wing:** Grid-based editorial layout with glassmorphic overlays.
    - **Entertainment:** Parallax-driven section reveals.
    - **Audience Data:** Animated data visualization bars.
- **Video-First Narrative:** Lazy-loaded background videos that pause/play based on intersection to save resources.

## 🤖 AI Integration (Assignment Requirement — 15%)
As per the screening rubric, I leveraged multiple AI tools to accelerate development and creative asset generation:
1. **Gemini:** Used for technical architecture planning, GSAP timeline logic, and content copywriting.
2. **AI Image Generation:** 
    - **Hero & Overview:** Generated stunning cinematic aerials of the MOA complex.
    - **Interior Visuals:** Custom-generated imagery for the Luxury Wing, Retail Flagships, and Fine Dining sections to ensure a consistent premium aesthetic.
    - **Prompt Engineering:** Detailed prompts focused on "architectural photography," "cinematic lighting," and "luxury brand ambiance."
3. **Asset Optimization:** Used AI-driven tools to convert and optimize images into WebP for the target < 90 Lighthouse score.

## 📦 Architecture
The project follows a modular pattern for high expandability:
```text
/src
  /scripts        # Individual JS modules (Navigation, Carousel, etc.)
  /styles         # CSS tokens, reset, global, and section-specific styles
  /assets         # Static assets
/public
  /images         # Optimized AI-generated assets
```

## 🏁 Technical Performance
- **Lighthouse Target:** 90+ (Performance, Accessibility, Best Practices, SEO).
- **Responsiveness:** Fully fluid layout adapting from mobile to 4K displays.
- **Clean Code:** Standardized class naming and structured CSS modules.

---

### How to Run Locally
1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Build for production: `npm run build`

**Built by Antigravity (AI) for the Mall of America Screening Assignment.**
