# TIUM Staffing — Next.js Website Redesign PRD

**Version:** 1.0  
**Project:** TIUM Staffing Website Redesign  
**Reference Website:** https://tiumtech.com/  
**Framework:** Next.js + TypeScript  
**Design Direction:** Premium, modern, trustworthy, human-centered, conversion-focused

---

## 1. Product Overview

TIUM Staffing is an employment agency providing workforce solutions for businesses across multiple industries. The current website presents staffing services, company information, industries served, reasons to choose TIUM, careers, and contact information.

The objective of this project is to rebuild the website from the ground up using Next.js while preserving the core business information and improving the visual design, UX, responsiveness, performance, accessibility, SEO, and conversion experience.

The redesign should **not be a pixel-for-pixel copy** of the existing website. It should preserve the business content and information architecture while presenting TIUM as a modern staffing and talent solutions company.

---

## 2. Product Goals

### Business Goals

1. Increase employer inquiries.
2. Improve candidate engagement.
3. Communicate TIUM's services clearly.
4. Establish stronger brand credibility.
5. Showcase industry expertise.
6. Generate qualified contact leads.
7. Encourage businesses to request staffing assistance.
8. Encourage candidates to explore career opportunities.

### UX Goals

Within the first 5–10 seconds, visitors should understand:

- What TIUM does.
- Who TIUM serves.
- What services TIUM provides.
- How to contact TIUM or explore career opportunities.

---

## 3. Target Users

### Employers

Businesses looking for:

- Permanent employees.
- Contract employees.
- Contingent staffing.
- Recruitment Process Outsourcing.
- Specialized talent.
- Industry-specific recruitment.

### Candidates

Job seekers looking for:

- Permanent roles.
- Contract roles.
- Temporary opportunities.
- Industry-specific employment.
- Career opportunities.

### Staffing / Business Partners

Organizations looking for:

- Recruitment support.
- RPO partnerships.
- Candidate sourcing.
- Lead generation.
- Workforce strategy.

---

## 4. Information Architecture

```text
TIUM
│
├── Home
│
├── About
│   ├── Company
│   ├── Mission
│   ├── Vision
│   └── Values
│
├── Services
│   ├── RPO
│   ├── Contingent Staffing
│   ├── Direct Hire
│   ├── Contract Hire
│   ├── Lead Generation
│   └── Candidate Sourcing
│
├── Industries
│   ├── Information Technology
│   ├── Healthcare
│   ├── Automobiles
│   ├── Oil & Gas
│   ├── Aeronautics
│   └── Management
│
├── Why TIUM
│
├── Careers
│
└── Contact
```

---

# 5. Design Philosophy

## Visual Keywords

- Premium
- Minimal
- Corporate
- Human
- Modern
- Editorial
- Trustworthy
- Technology-driven
- High whitespace
- Strong typography
- Subtle motion
- Conversion-focused

## Avoid

- Generic Bootstrap-style layouts.
- Excessive gradients.
- Too many colors.
- Stock-photo-heavy pages.
- Overly complicated animations.
- Excessive glassmorphism.
- Template-looking cards.
- Large walls of text.

---

# 6. Global Navigation

## Desktop Header

Left:

```text
TIUM Logo
```

Navigation:

```text
About
Services
Industries
Why TIUM
Careers
```

Primary CTA:

```text
Contact Us
```

Optional secondary CTA:

```text
Find Talent
```

## Header Behavior

Initial state:

```text
Transparent / overlay
```

Scrolled state:

```text
White or solid background
Backdrop blur
Subtle border/shadow
Sticky positioning
```

## Mobile

```text
TIUM                                      ☰
```

Full-screen navigation:

```text
01  About
02  Services
03  Industries
04  Why TIUM
05  Careers
06  Contact
```

---

# 7. Homepage

The homepage is the primary conversion page.

---

## 7.1 Hero

### Eyebrow

```text
STAFFING • TALENT • OPPORTUNITY
```

### Headline

Primary direction:

> The right talent can change everything.

Alternative:

> Building stronger teams through better talent.

### Supporting Copy

> TIUM Staffing connects businesses with exceptional talent through flexible, reliable and industry-focused workforce solutions.

### CTAs

Primary:

```text
Find Talent →
```

Secondary:

```text
Explore Careers
```

### Visual Direction

Use a premium human/talent visual composition rather than a generic hero image.

Possible elements:

- Professional candidate imagery.
- Floating candidate cards.
- Industry tags.
- Location indicators.
- Subtle animated UI elements.
- Abstract workforce graphics.

Example:

```text
             FIND TALENT

        ┌─────────────────────┐
        │ Candidate           │
        │ Software Engineer   │
        │ Austin, TX          │
        └─────────────────────┘

   Healthcare     IT     Engineering
```

Animations should remain subtle.

---

# 8. Trust / Industry Strip

Immediately below the hero.

```text
WORKFORCE SOLUTIONS FOR

Technology | Healthcare | Automotive |
Energy | Aerospace | Management
```

The current TIUM website identifies Information Technology, Healthcare, Automobiles, Oil & Gas, Aeronautics, and Management as industries served.

---

# 9. Introduction Section

## Heading

> People are the foundation of every successful organization.

### Layout

Split-screen editorial section.

Left:

Large statement.

Right:

Company introduction.

### Content Direction

Explain that TIUM provides workforce solutions tailored to business needs, with an emphasis on client satisfaction, qualified talent, and long-term partnerships.

CTA:

```text
More About TIUM →
```

---

# 10. About Section

## Heading

> Built to connect exceptional talent with thriving organizations.

### Content

Explain:

- TIUM's staffing background.
- Experienced professionals.
- Qualified candidate access.
- Strategic workforce solutions.
- Long-term client relationships.

CTA:

```text
Learn More →
```

---

# 11. Mission & Vision

Create a large editorial section.

## Mission

> Empower businesses with the right talent and individuals with the right opportunities.

Supporting themes:

- Integrity.
- Transparency.
- Excellence.
- Client satisfaction.
- Career growth.
- Organizational success.

## Vision

> A future where talent and opportunity converge seamlessly.

Supporting themes:

- Innovative staffing.
- Effective workforce solutions.
- Exceptional talent.
- Forward-thinking organizations.

Use a visually strong two-column layout.

---

# 12. Values

## Heading

> What we believe in.

Values:

```text
01 — Excellence
02 — Integrity
03 — Client-Centric Approach
04 — Innovation
05 — Collaboration
```

### Interaction

Desktop:

- Hover over value.
- Number moves.
- Description appears.
- Background/image subtly changes.

Mobile:

- Accordion or stacked cards.

---

# 13. Services

## Heading

> Workforce solutions built around your needs.

### Intro

Explain that TIUM provides flexible staffing solutions for different hiring and workforce requirements.

## Services

### 01 — Recruitment Process Outsourcing

**RPO**

Provide recruitment operations and sourcing support for organizations that want to extend or outsource parts of their recruitment function.

### 02 — Contingent Staffing

Flexible staffing solutions for changing workforce requirements.

### 03 — Direct Hire

Permanent recruitment for businesses looking for long-term talent.

### 04 — Contract Hire

Access specialized professionals for defined projects or time periods.

### 05 — Lead Generation

Support business and candidate pipeline generation.

### 06 — Candidate Sourcing

Source qualified candidates across industries and job categories.

---

# 14. Services Interaction

Instead of six static cards, use an editorial interactive list.

Example:

```text
SERVICES

01  Recruitment Process Outsourcing      →
02  Contingent Staffing                  →
03  Direct Hire                          →
04  Contract Hire                        →
05  Lead Generation                      →
06  Candidate Sourcing                   →
```

On hover:

- Row expands.
- Description appears.
- Image changes.
- Arrow animates.
- Number shifts.
- Background visual appears.

Each service should have a dedicated route:

```text
/services/rpo
/services/contingent-staffing
/services/direct-hire
/services/contract-hire
/services/lead-generation
/services/candidate-sourcing
```

---

# 15. Industries

## Heading

> Talent that understands your industry.

Industries:

```text
01 — Information Technology
02 — Healthcare
03 — Automobiles
04 — Oil & Gas
05 — Aeronautics
06 — Management
```

## Interaction

Desktop:

- Horizontal scroll.
- Drag interaction.
- Hover preview.

Mobile:

- Horizontal swipe cards or stacked sections.

Each industry should have a dedicated route:

```text
/industries/technology
/industries/healthcare
/industries/automobiles
/industries/oil-gas
/industries/aeronautics
/industries/management
```

---

# 16. Industry Visual Treatment

Each industry should have a distinct visual identity.

Example:

```text
┌──────────────────────────────────────┐
│                                      │
│       INFORMATION TECHNOLOGY         │
│                                      │
│       Digital Transformation         │
│                                      │
│                               01     │
└──────────────────────────────────────┘
```

Use high-quality imagery with controlled overlays.

---

# 17. Why TIUM

## Heading

> Why businesses choose TIUM.

Create an editorial grid/list rather than generic feature cards.

## Reasons

```text
01 — Proven Expertise
02 — Tailored Solutions
03 — Global Reach, Local Touch
04 — Strategic Partnerships
05 — Comprehensive Services
06 — Industry Specialization
07 — Technology-Driven Approach
08 — Commitment to Compliance
```

### Interaction

Hovering over each reason should reveal supporting copy.

Example:

```text
PROVEN EXPERTISE

Years of experience connecting businesses
with qualified talent.
```

---

# 18. Employer / Candidate CTA

Create a major conversion section.

## Heading

> Whether you're building a team or building your career, let's start the conversation.

Two paths:

```text
┌──────────────────────────┐
│ EMPLOYERS                │
│                          │
│ Find Talent →            │
└──────────────────────────┘

┌──────────────────────────┐
│ CANDIDATES               │
│                          │
│ Find Opportunities →     │
└──────────────────────────┘
```

---

# 19. Careers Page

The redesigned Careers page should be more functional than the existing page.

## Hero

> Your next opportunity starts here.

## Features

- Job search.
- Location filter.
- Industry filter.
- Employment type.
- Experience level.
- Job details.
- Application CTA.

Example:

```text
Search jobs...

[ Location ] [ Industry ] [ Job Type ]

────────────────────────────────

Senior Software Engineer
Austin, TX
Full Time

View Position →
```

Future job architecture:

```text
/careers
/careers/[job-slug]
```

---

# 20. Contact Page

## Hero

> Let's build your next team.

## Form

```text
Full Name *
Email *
Phone
Company
I'm looking for *

○ Staffing
○ RPO
○ Recruitment
○ Career Opportunity

Message *

[ SEND MESSAGE ]
```

## Current Contact Information

```text
5900 Balcone Dr STE 100
Austin, TX 78731

P: +1 (307) 529 0201
E: support@tiumtech.com
```

Verify contact information before production deployment.

---

# 21. Footer

Large premium footer.

```text
TIUM

Connecting exceptional talent
with exceptional opportunities.

────────────────────────────────

COMPANY
About
Why TIUM
Careers

SERVICES
RPO
Direct Hire
Contract Hire
Contingent Staffing

INDUSTRIES
Technology
Healthcare
Automotive
Oil & Gas
Aeronautics
Management

CONTACT
Austin, Texas
+1 (307) 529 0201
support@tiumtech.com

────────────────────────────────

© 2026 TIUM Staffing LLC
Privacy Policy
```

---

# 22. Visual Design System

## Color Palette

Primary dark:

```text
#0B0F14
```

White:

```text
#FFFFFF
```

Optional accent:

```text
#2563EB
```

Alternative high-contrast accent:

```text
#C8FF3D
```

Use only one accent direction in the final design.

## Typography

Recommended:

```text
Primary: Inter
Display: Space Grotesk
```

Alternative:

```text
Primary: Manrope
Display: Space Grotesk
```

### Hero Typography

Use responsive display typography:

```css
font-size: clamp(3.5rem, 7vw, 8rem);
```

---

# 23. UI Style

## Buttons

Avoid overly generic pill buttons.

Example:

```text
Find Talent →
```

Hover:

```text
Find Talent  → →
```

## Cards

Use:

- 1px borders.
- 12–24px radius.
- Subtle shadows.
- Strong typography.
- Controlled image overlays.

---

# 24. Motion & Animation

Use Motion / Framer Motion.

### Page entrance

- Fade.
- Small vertical translation.

### Text

- Split text reveal.

### Cards

```text
translateY(-6px)
```

### Images

```text
scale(1.03)
```

### Navigation

- Smooth section transitions.
- Subtle menu animation.

### Accessibility

Support:

```css
@media (prefers-reduced-motion: reduce)
```

Animations must enhance the experience rather than dominate it.

---

# 25. Recommended Tech Stack

```text
Next.js
TypeScript
React
Tailwind CSS
Motion
Lucide React
```

Optional:

```text
shadcn/ui
React Hook Form
Zod
```

---

# 26. Next.js Architecture

Recommended structure:

```text
tium-redesign/
│
├── app/
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── industries/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── why-tium/
│   │   └── page.tsx
│   ├── careers/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── privacy/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   │
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── TrustBar.tsx
│   │   ├── Introduction.tsx
│   │   ├── AboutPreview.tsx
│   │   ├── Services.tsx
│   │   ├── Industries.tsx
│   │   ├── WhyTium.tsx
│   │   ├── MissionVision.tsx
│   │   ├── Values.tsx
│   │   └── CTA.tsx
│   │
│   ├── services/
│   │   └── ServiceCard.tsx
│   │
│   ├── industries/
│   │   └── IndustryCard.tsx
│   │
│   ├── careers/
│   │   ├── JobCard.tsx
│   │   ├── JobFilters.tsx
│   │   └── JobSearch.tsx
│   │
│   ├── forms/
│   │   └── ContactForm.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── Container.tsx
│       ├── SectionHeading.tsx
│       └── Reveal.tsx
│
├── data/
│   ├── services.ts
│   ├── industries.ts
│   ├── values.ts
│   └── reasons.ts
│
├── lib/
│   ├── utils.ts
│   └── validation.ts
│
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── services/
│   │   └── industries/
│   └── icons/
│
└── package.json
```

---

# 27. Content Architecture

Do not hard-code repeated content directly into React components.

Example:

```ts
export const services = [
  {
    id: "rpo",
    number: "01",
    title: "Recruitment Process Outsourcing",
    slug: "rpo",
    description: "...",
    image: "/images/services/rpo.jpg"
  },
  {
    id: "contingent-staffing",
    number: "02",
    title: "Contingent Staffing",
    slug: "contingent-staffing",
    description: "...",
    image: "/images/services/contingent.jpg"
  }
];
```

Use the same pattern for industries and values.

---

# 28. Backend / Forms

Do not over-engineer the first version.

Recommended:

```text
Contact Form
      ↓
React Hook Form
      ↓
Zod Validation
      ↓
Next.js Server Action / API Route
      ↓
Email / CRM
```

Implement:

- Server-side validation.
- Input sanitization.
- Rate limiting.
- CAPTCHA/Turnstile if required.

---

# 29. CMS Strategy

A CMS is optional for V1.

For the first release:

```text
TypeScript data files
+
Static / server-rendered pages
```

Future CMS support can be added for:

- Jobs.
- Services.
- Industries.
- Blog posts.
- Team members.
- Company updates.

Future architecture:

```text
Next.js
   ↓
Headless CMS
   ↓
Content
```

---

# 30. SEO

Every page requires unique:

- `<title>`
- Meta description.
- Open Graph metadata.
- Canonical URL.
- Proper heading hierarchy.

## Suggested SEO titles

```text
TIUM Staffing | Workforce & Recruitment Solutions
About TIUM Staffing | Talent & Workforce Solutions
TIUM Staffing Services | RPO, Direct Hire & Contract Staffing
Industries We Serve | TIUM Staffing
Careers at TIUM Staffing
Contact TIUM Staffing
```

## Structured Data

Implement where appropriate:

```text
Organization
LocalBusiness
JobPosting
BreadcrumbList
```

---

# 31. Performance

Target Lighthouse:

```text
Performance       90+
Accessibility     95+
Best Practices    95+
SEO               95+
```

Use:

- `next/image`.
- WebP / AVIF.
- Lazy loading.
- Server Components wherever possible.
- Font optimization.
- Minimal client-side JavaScript.
- Limited third-party scripts.
- Optimized animations.

Avoid huge video backgrounds unless performance testing proves acceptable.

---

# 32. Responsive Design

## Desktop

```text
1440px+
```

Use large editorial layouts.

## Laptop

```text
1024–1439px
```

Reduce typography and spacing.

## Tablet

```text
768–1023px
```

Convert complex two-column sections into simpler layouts.

## Mobile

```text
<768px
```

Prioritize:

- Readability.
- CTA visibility.
- Touch targets.
- Horizontal scrolling where appropriate.
- No horizontal overflow.

---

# 33. Accessibility

Implement:

- Semantic HTML.
- Keyboard navigation.
- Visible focus states.
- Correct heading hierarchy.
- Alt text.
- ARIA labels.
- Sufficient color contrast.
- Reduced-motion support.
- Minimum 44px touch targets where practical.

---

# 34. Analytics

Track:

```text
page_view
click_find_talent
click_find_job
submit_contact
view_service
view_industry
apply_job
```

Recommended analytics events:

```text
CTA click
Contact submission
Career page visit
Job search
Job detail view
Application click
Service detail view
Industry detail view
```

---

# 35. Security

Implement:

- Server-side validation.
- Rate limiting.
- CAPTCHA/Turnstile.
- Input sanitization.
- Secure headers.
- No secrets in client-side code.
- Environment variables for credentials.

---

# 36. Phase Breakdown

## Phase 1 — Foundation

- [ ] Initialize Next.js.
- [ ] Configure TypeScript.
- [ ] Configure Tailwind.
- [ ] Configure fonts.
- [ ] Build design tokens.
- [ ] Build Navbar.
- [ ] Build Footer.
- [ ] Build responsive Container.
- [ ] Configure routing.

## Phase 2 — Homepage

- [ ] Hero.
- [ ] Trust/industry strip.
- [ ] Introduction.
- [ ] About preview.
- [ ] Services.
- [ ] Industries.
- [ ] Why TIUM.
- [ ] Mission/Vision.
- [ ] Values.
- [ ] Employer/Candidate CTA.
- [ ] Footer.

## Phase 3 — Inner Pages

- [ ] About.
- [ ] Services.
- [ ] Service details.
- [ ] Industries.
- [ ] Industry details.
- [ ] Why TIUM.
- [ ] Careers.
- [ ] Job details.
- [ ] Contact.
- [ ] Privacy.
- [ ] 404.

## Phase 4 — Motion

- [ ] Page entrance animations.
- [ ] Text reveal.
- [ ] Card hover states.
- [ ] Image reveal.
- [ ] Horizontal industry interaction.
- [ ] Mobile menu animation.
- [ ] Reduced-motion support.

## Phase 5 — Optimization

- [ ] Lighthouse audit.
- [ ] SEO audit.
- [ ] Accessibility audit.
- [ ] Mobile testing.
- [ ] Cross-browser testing.
- [ ] Image optimization.
- [ ] Performance testing.

---

# 37. Definition of Done

The project is complete when:

- [ ] All major existing TIUM content is represented.
- [ ] Homepage is fully responsive.
- [ ] Desktop navigation works.
- [ ] Mobile navigation works.
- [ ] Services use structured data.
- [ ] Industries use structured data.
- [ ] Service detail pages work.
- [ ] Industry detail pages work.
- [ ] Contact form works.
- [ ] Careers page works.
- [ ] Job detail architecture exists.
- [ ] SEO metadata exists.
- [ ] Images are optimized.
- [ ] Animations support reduced motion.
- [ ] Lighthouse scores are strong.
- [ ] No mobile horizontal overflow exists.
- [ ] All CTAs work.
- [ ] 404 page exists.
- [ ] Privacy page exists.

---

# 38. Homepage UX Flow

```text
NAVBAR
   ↓
HERO
   ↓
TRUST / INDUSTRY STRIP
   ↓
INTRODUCTION
   ↓
ABOUT
   ↓
SERVICES
   ↓
INDUSTRIES
   ↓
WHY TIUM
   ↓
MISSION / VISION
   ↓
VALUES
   ↓
EMPLOYER / CANDIDATE CTA
   ↓
FOOTER
```

---

# 39. Final Design Direction

The redesigned TIUM website should feel like a **modern staffing-tech brand**, not a generic recruitment template.

The design should combine:

```text
Premium typography
+
Editorial layouts
+
Human-focused imagery
+
Strong information hierarchy
+
Subtle Motion animations
+
Clear conversion paths
+
Excellent mobile UX
```

The business content and core information architecture should remain recognizable as TIUM, while the implementation, component architecture, visual system, responsive behavior, and interactions should be rebuilt from scratch in Next.js.

---

## Reference Notes

The current TIUM website contains the following major navigation areas: Home, About Us, Our Services, Why Choose Us, Career, and Contact. Its current homepage also includes company introduction, mission, vision, values, six staffing services, six industries, eight reasons to choose TIUM, client content, and contact details.

Current source: https://tiumtech.com/
