# Mall of America — Interactive Sales Deck
### Liat.ai Screening Assignment | Phase 1 & 2 Complete

A premium, interactive, browser-based sales experience for the Mall of America. This tool is designed to replace fragmented sales processes (PDFs, static slide decks) with a cinematic, non-linear narrative that drives action from prospective tenants, sponsors, and event partners.

---

## 🚀 Business Rationale
This tool solves the "fragmented pitch" problem by consolidating:
1. **The Vision:** High-impact cinematic videos of the destination.
2. **The Data:** Real-time demographics and crowd insights (Audience Insight Module).
3. **The Conversion:** Contextual Calls-to-Action for Leasing, Sponsorship, and Venue Booking.

## 🛠️ Technology Stack
- **Framework:** [Vite](https://vitejs.dev/) + Vanilla JavaScript (Zero-bloat performance).
- **Animations:** [GSAP](https://gsap.com/) + ScrollTrigger + Custom GSAP Count-up Engine.
- **Smooth Interaction:** [Lenis](https://lenis.darkroom.engineering/) for inertial smooth scrolling.
- **Video Engine:** Custom-built `hover-videos.js` module for Awwwards-style card transitions.
- **Performance:** Native CSS Variables & Tokens for a consistent, themeable Design System.

## ✨ Key Interactive Features (Requirement Compliance)
- **Non-Linear Navigation:** Sidebar and Top-bar navigation allow prospects to explore at their own pace.
- **Magnetic Custom Cursor:** Bespoke tracking cursor with dynamic labels ("VIEW", "DRAG") implemented with GSAP `quickTo`.
- **Audience Insights (Phase 2):** Built-in demographics module replacing manual spreadsheets with animated data visualization.
- **Venue Capabilities:** Segmented sections detailing Performing Arts potentials and Exposition center logistics.
- **Spotlight Reveal:** High-end flashlight cursor effects on interactive partnership cards.

## 🤖 AI Integration & Craft (15% Weight)
This project serves as a showcase for high-level AI-augmented development:
1. **Gemini:** Used for architectural planning, GSAP timeline engineering, and complex storytelling logic.
2. **Google Veo:** Used to generate the high-end, cinematic video loops for the Retail, Luxury, and Entertainment sections, ensuring a professional, royalty-free aesthetic that surpasses stock footage.
3. **Vision Processing:** Used AI to optimize and generate high-fidelity `.webp` assets to maintain a target Lighthouse performance.

## 🏁 Performance & Deployment
- **Performance:** Optimized lazy-loading and `preload="none"` strategy for all 15+ videos to maintain a fast Time-to-Interactive.
- **Responsiveness:** Fluid grid system adapting from mobile to 4K displays.
- **Lighthouse:** Built with SEO and accessibility best practices in mind.

---

### How to Run Locally
1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Build for production: `npm run build`

**Developed with Liat.ai screening rubrics in mind — focused on craft, storytelling, and technical ambition.**

