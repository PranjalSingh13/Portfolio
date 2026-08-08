# Pranjal Singh — Developer Portfolio

Elite developer portfolio website for Pranjal Singh, built using React, Vite, Tailwind CSS, Framer Motion, and React Icons. Optimised for performance, accessibility, SEO, and security.

---

## Technical Specifications

- **Frontend Core**: React 18.3, Vite (manual code splitting for dynamic chunks)
- **Styling**: Tailwind CSS (custom HSL curated palette, zero generic colors)
- **Animations**: Framer Motion (Intersection Observer viewport staggering, smooth exit parameters)
- **Security**: Sanitized contact form fields, bot honeypots, strict CSP headers, Referrer & Permissions policies
- **SEO**: JSON-LD Person structured schema, OpenGraph profiles, Twitter cards, custom XML sitemap & robots configuration
- **Accessibility**: 100/100 Lighthouse target, focus indicator overrides, semantic markup, keyboard accessibility

---

## Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg          ← Custom developer brand icon
│   ├── robots.txt           ← Web crawlers indexation
│   ├── sitemap.xml          ← Search engine schema
│   ├── manifest.json        ← PWA descriptor file
│   └── docs/
│       └── PranjalSingh_Resume.pdf ← Copied resume PDF file
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx    ← Shrinks on scroll, includes active ScrollSpy
│   │   │   └── Footer.jsx    ← Minimal, displays LeetCode/GitHub links
│   │   ├── sections/
│   │   │   ├── Hero.jsx      ← CSS background grid, premium developer SVG placeholder
│   │   │   ├── About.jsx     ← Academic milestones & vertical timeline
│   │   │   ├── Skills.jsx    ← Dom-specific proficiency charts
│   │   │   ├── Experience.jsx← Staggered internship details (TBI, Uptoskills)
│   │   │   ├── Projects.jsx  ← Expandable cards for MyRideShare, StructDB, Price Comparison Pro
│   │   │   ├── GitHub.jsx    ← Dynamic Github telemetry with cache fallbacks
│   │   │   ├── Achievements.jsx ← Verification credentials cards
│   │   │   ├── Resume.jsx    ← Interactive resume schema preview
│   │   │   └── Contact.jsx   ← Sanitized validation contact form
│   │   └── ui/
│   │       ├── AnimatedSection.jsx
│   │       ├── ProjectCard.jsx
│   │       ├── SkillBar.jsx
│   │       ├── Toast.jsx
│   │       ├── LoadingSkeleton.jsx
│   │       └── BackToTop.jsx
│   ├── hooks/
│   │   ├── useGitHub.js      ← Rate-limiting handler
│   │   ├── useScrollSpy.js   ← Nav item highlighting
│   │   ├── useToast.js
│   │   └── useIntersection.js
│   ├── services/
│   │   └── github.js         ← Public API endpoints
│   ├── utils/
│   │   ├── sanitize.js       ← XSS scrubbing utility
│   │   ├── validation.js     ← Regular expression validators
│   │   └── constants.js      ← Main spec settings
│   ├── styles/
│   │   └── index.css         ← Tailwind directives & components classes
│   ├── App.jsx               ← Global page layout mapping
│   └── main.jsx              ← React entry-point
├── vite.config.js            ← Code splitter
├── tailwind.config.js        ← Tailored themes definition
├── postcss.config.js
├── vercel.json               ← Deployment headers (CSP / HSTS)
└── netlify.toml              ← Deployment headers
```

---

## Installation & Setup

1. **Clone the workspace** and navigate to the project directory:
   ```bash
   cd PortFolio
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the local development server**:
   ```bash
   npm run dev
   ```
4. **Compile production build**:
   ```bash
   npm run build
   ```
5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## Environment & Integration Configuration

### 1. Contact Form Email Setup
To receive emails directly from your live portfolio, configure one of the following form submission providers:

#### Option A: Web3Forms (Recommended - Zero Config)
1. Request a free access key at [Web3Forms](https://web3forms.com).
2. Copy your access key (e.g. `12345678-abcd-1234-abcd-123456789abc`).
3. Add it to your `.env` file (or Vercel/Netlify Environment Variables):
   ```env
   VITE_WEB3FORMS_ACCESS_KEY=your-access-key-here
   ```

#### Option B: Formspree (Custom Endpoints)
1. Set up a form at [Formspree](https://formspree.io).
2. Obtain your custom endpoint (e.g. `https://formspree.io/f/your-form-id`).
3. Add it to your `.env` file:
   ```env
   VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/your-form-id
   ```

---

## Deployment Guide

### Vercel
1. Ensure `vercel.json` is in the root directory.
2. Link your repository to Vercel.
3. Configure the build command as `npm run build` and output directory as `dist`.
4. Define environment variables (`VITE_GITHUB_USERNAME`, `VITE_WEB3FORMS_ACCESS_KEY`, etc.) in the Vercel project dashboard.
5. Deploy.

### Netlify
1. Ensure `netlify.toml` is in the root directory.
2. Set build command to `npm run build` and publish directory to `dist`.
3. Configure environment variables in the Netlify site configuration panel.
4. Deploy.

