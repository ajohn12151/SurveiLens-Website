TECH_STACK.md — Surveilens Marketing Website (V1)
1) Goals the stack must satisfy
Fast to build (Cursor/Antigravity friendly), minimal glue code
Premium motion (Anime.js scroll-story) without hurting performance
Lead capture that’s Supabase-ready now and easy to connect to email/CRM later
SEO + share ready (metadata/OG/sitemap/schema)
Accessible (reduced motion, keyboard nav)
Deployable with one-click CI/CD

2) Core stack (recommended)
Frontend
Next.js (App Router) + TypeScript
SSR/SSG for SEO
Route-level code splitting
Tailwind CSS
Tokenized design system, fast iteration
Anime.js (v4+)
Used specifically for the scroll-story concept demo
Framer Motion (optional)
Only for basic fade/slide reveals (optional; you can do CSS-only if you want fewer deps)
Backend / Data
Supabase
Postgres for lead storage
RLS (Row Level Security)
Optional: Supabase Edge Functions later (webhooks, email sends)
Email / Notifications (stub now, easy later)
Start with DB-only lead capture
Later plug one provider:
Resend (simple), or Postmark (deliverability), or SendGrid
Keep an adapter interface so switching providers is painless
Deployment
Vercel
Preview deployments for every PR
Edge/CDN for fast global delivery

3) Key packages
Required
next, react, react-dom, typescript
tailwindcss, postcss, autoprefixer
animejs
@supabase/supabase-js
zod (form validation)
react-hook-form (or keep it minimal with controlled inputs)
Optional but useful
lucide-react (icons)
clsx + tailwind-merge (class composition)
framer-motion (simple entrance animations)
next-sitemap (auto sitemap generation)

4) Installation & local dev
# create app
npx create-next-app@latest surveilens-site --ts --app

cd surveilens-site

# styling
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# anime + supabase + forms
npm install animejs @supabase/supabase-js zod react-hook-form
npm install lucide-react clsx tailwind-merge

Run:
npm run dev


5) App structure (clean + scalable)
Recommended folder layout (App Router):
src/
  app/
    (marketing)/
      page.tsx                 # Home
      product/page.tsx
      how-it-works/page.tsx
      solutions/schools/page.tsx
      security/page.tsx
      about/page.tsx
      early-access/page.tsx
      legal/privacy/page.tsx
      legal/terms/page.tsx
    api/
      lead/route.ts            # POST lead capture
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    sections/
      Hero.tsx
      EarlyAccessStrip.tsx
      SignalsAtlas.tsx
      ScrollStoryDemo.tsx      # Anime.js module
      DeepDiveVideoSlot.tsx
      FAQ.tsx
      LeadForm.tsx
    ui/
      Button.tsx
      Card.tsx
      Input.tsx
      Modal.tsx
      Stepper.tsx
  lib/
    supabase/
      client.ts
    config.ts                  # Site constants (Calendly link, video URLs)
    validations/
      lead.ts                  # Zod schema
    analytics.ts               # placeholder hooks
  styles/
    globals.css


6) Config + environment variables
Public config (safe)
Use src/lib/config.ts for values that are safe to ship to browsers:
CALENDLY_URL (optional; if missing show “coming soon” modal)
CONCEPT_DEMO_ENABLED (bool)
DEEP_DIVE_MP4_URL (optional; if missing show placeholder)
OG_IMAGE_URL (placeholder)
Secrets (server-only)
Use Vercel environment variables:
SUPABASE_URL
SUPABASE_ANON_KEY (client safe but keep in env)
SUPABASE_SERVICE_ROLE_KEY (server-only, never expose to client)
EMAIL_PROVIDER_API_KEY (later)
EMAIL_TO_ADDRESS (later, when you have business email)
Important: For V1, you can avoid service role usage by inserting leads via an API route that uses anon + a permissive insert policy, or use service role in the server route with strict input validation + rate limiting.

7) Database schema (Supabase)
Table: early_access_leads
Columns:
id (uuid, pk, default gen_random_uuid)
created_at (timestamptz, default now())
name (text, not null)
email (text, not null)
org (text, not null)
role (text, null)
org_size (text, null)
message (text, null)
lead_type (text, default 'early_access') // early_access | walkthrough_request
utm_source (text, null)
utm_medium (text, null)
utm_campaign (text, null)
page_path (text, null)
referrer (text, null)
Indexes:
index on created_at
index on email (optional for dedupe)
RLS (recommended posture)
Enable RLS
Allow INSERT from your site only:
Simplest: allow anon inserts but use server route + service role to keep DB private
If using anon directly: restrict with a function that checks rate-limit tokens (more complex)
Best V1 approach: API Route inserts into Supabase using service role key (server only) + validation + rate limiting.

8) Lead capture API design
Endpoint
POST /api/lead
Payload (validated with Zod)
name, email, org required
optional: role, org_size, message
metadata: lead_type, utm_*, page_path, referrer
Behavior
Validate input (Zod)
Rate limit (basic: in-memory for V1; better: Upstash Redis later)
Insert into Supabase
Return success
(Later) send email notification via provider
Email integration stub (future)
Write a lib/notify.ts with an interface like:
sendLeadNotification(lead): Promise<void>
Then implement resend.ts or postmark.ts behind it.

9) Anime.js scroll-story implementation details (tech)
Where it lives
components/sections/ScrollStoryDemo.tsx
How to integrate with React cleanly
Use useEffect() to create animations
Scope them to a root element
Cleanup on unmount to avoid memory leaks
Recommended pattern:
Use createScope({ root }) inside useEffect
Create one timeline that represents all 5 steps
Sync to scroll:
Preferred: Anime.js onScroll() timeline sync
Fallback: manual scroll progress + requestAnimationFrame
Performance rules
Use SVG/HTML for the stage frames (avoid heavy images)
Lazy-load the whole section:
dynamic import ScrollStoryDemo so it loads after first paint
If mobile:
skip scroll syncing and render carousel
Reduced motion
Check prefers-reduced-motion
Render static step list + static stage frames

10) Media strategy (demo assets)
Demo type #1 (Anime.js concept)
Pure HTML/SVG “mock UI”
Ships with the site
Demo type #2 (MP4 deep-dive later)
Provide a DEEP_DIVE_MP4_URL config
Hosting options later:
Vercel blob / S3 / Cloudflare R2 (best)
Or embed from Vimeo if you want analytics + streaming quality

11) SEO + performance stack
SEO
Next.js metadata API per page
sitemap.xml + robots.txt
Schema.org JSON-LD:
Organization
SoftwareApplication
Performance
Use next/image for all images
Avoid scroll-jank:
isolate animation work to transforms/opacity
avoid expensive box-shadow animation
Ship minimal JS:
dynamic import the story module
keep icons tree-shaken

12) Analytics (placeholder now, easy later)
Track:
CTA clicks: Join Early Access, Schedule a Walkthrough
Form submit started / success / error
Scroll-story completion rate
Deep-dive placeholder clicks
Provider options:
PostHog (product analytics)
GA4 (basic)
Plausible (lightweight)
Implementation:
lib/analytics.ts exports track(eventName, props)

13) Security considerations (important for schools)
Form endpoint rate limit
Honeypot input + server validation
Don’t expose Supabase service role key
Basic security headers (CSP baseline, X-Frame-Options where appropriate)
Input sanitization (server-side; never trust client)

14) Testing + QA
Unit tests (optional V1)
Zod validation tests
API route tests (light)
E2E (recommended before launch)
Playwright:
form submission
nav routes
mobile carousel behavior
Lighthouse checks
Run before shipping:
Home
Product
Security

15) Deployment pipeline (Vercel)
main branch auto-deploys to production
PR branches get preview deploys
Environment variables configured in Vercel project settings
Add redirects if needed:
/contact → /early-access

16) “Enterprise-ready later” future-proofing
When you expand beyond schools:
Keep copy modular: content/ folder with JSON/TS objects for each industry
Add /solutions/enterprise without refactoring the site
Add a real “Integrations” section once you can safely claim vendors
Add a security page upgrade path:
SOC2-in-progress banner only when true
public status page link later

