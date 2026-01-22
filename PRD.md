PRD.md — Surveilens Marketing Website (V1.3)
1) Overview
Project: Surveilens Marketing Website (V1)
Owner: Alan John
Stage: Pre-MVP
Primary Goal: Explain Surveilens fast and convert visitors into Join Early Access leads.
Secondary Goals:
Provide a Schedule a Walkthrough option (Calendly-style link)
Showcase two demo experiences:
Interactive scrolldown animation demo (anime.js)
Future MP4 deep-dive demo slot (co-founder walkthrough)
Non-goals (V1): customer portal, login, pricing calculator, full CMS/blog.

2) Problem Statement
Surveilens needs an enterprise-grade website that:
Communicates the value proposition in <30 seconds
Highlights the key differentiator: no need to replace the existing camera fleet
Shows “what it looks like” via a concept demo even before MVP is ready
Captures early access leads in a way that’s ready to connect to Supabase + email later

3) Target Users & Personas
Primary ICP (Now): Schools
Roles: safety/security leadership, operations leadership, administrators, facilities
Concerns: privacy optics, false alarms, deployment complexity, budget approvals
Messaging constraints: avoid “surveillance” language; emphasize threat detection and safety signals
Secondary ICP (Later): Enterprise
Roles: security ops + IT leadership
Concerns: integrations, reliability, compliance posture, auditability

4) Goals & Success Metrics
Primary (Business)
Early access signups per week: target placeholder X
Join Early Access conversion rate: target placeholder X%
Schedule link CTR: target placeholder X%
Secondary (Experience)
Comprehension: users can describe “what it is” after 30 seconds (user test)
Scrolldown demo completion rate
Performance: Lighthouse 90+ on key pages (mobile + desktop)

5) Positioning & Messaging Requirements
Core Message (must appear in Hero and once again below)
“Works with your existing camera fleet — no rip-and-replace.”
Supporting Messages
Cloud-based threat detection pipeline
Real-time detection → alerting workflow (high-level, honest, no “guarantees”)
Schools-first now, enterprise-ready later
Tone / Word Rules
Use: threat detection, incident awareness, safety signals, real-time alerts
Avoid: surveillance (especially on schools pages), fear-mongering, exaggerated accuracy claims

6) V1 Public Capabilities (Schools-first)
The site will list “Detections (V1 target)” with careful language like “Designed to detect” / “Targets include”.
A) Violence / Aggression
Fight starting
Aggressive rushing / striking motions
Group swarm patterns (lightweight crowd cues)
B) Unauthorized Access
Entry through restricted doors (after-hours or wrong zone)
Tailgating indicators (optional MVP+)
C) After-hours Presence
Person detected in restricted time windows
Motion + person confirmation to reduce false positives
D) Crowd Anomalies
Panic movement / sudden dispersal
Running in hallways toward exits
Rapid crowd density changes

7) Scope
Pages (V1)
Home (primary story + conversion)
Product (capabilities + workflow)
How It Works (simple overlay explanation + cloud pipeline)
Solutions (Schools-focused + enterprise teaser)
Security & Privacy (data handling posture; conservative claims)
Early Access (can be same as Contact section/page; form-first)
About (mission + stage + credibility framing)
Legal: Privacy Policy + Terms
Out of Scope (V1)
Pricing numbers (use “Join Early Access” + walkthrough scheduling)
Full blog/CMS
Customer login portal

8) Core User Journey
Land on Home → understand Surveilens + “no new cameras”
Experience the anime.js scrolldown concept demo
Scan “Detections (V1 target)”
See privacy posture (cloud-based, data handling explained)
Convert via:
Join Early Access (primary)
Schedule a Walkthrough (secondary)

9) Functional Requirements
FR1 — Primary Conversion: Join Early Access (must-have)
Join Early Access is the primary CTA in navbar and repeated on key sections.
Form fields (recommended):
Name (required)
Work email (required)
Organization (required)
Role/title (optional)
School size (# campuses/students) (optional)
Message (optional)
Submission behavior:
Validate required fields
Store submission in Supabase-ready schema
Show success state: “You’re on the early access list” + next steps
Email notification integration is stubbed (no business email yet)
Data model (Supabase-ready): early_access_leads
id, created_at
name, email, org, role, org_size, message
utm_source, utm_medium, utm_campaign, page_path, referrer
lead_type (enum: early_access, walkthrough_request)
Spam protection:
Honeypot
Rate limit
Server-side validation

FR2 — Secondary Conversion: Schedule a Walkthrough (must-have)
A secondary CTA: Schedule a Walkthrough
Uses a Calendly-style link placeholder:
If link is not configured, show a modal: “Scheduling coming soon — join early access instead.”

FR3 — Demo Type #1: anime.js Scrolldown Concept Demo (must-have)
A dedicated section on Home (and optionally Product) that provides a scroll-driven “in action” concept demo.
Requirements:
Built with anime.js.
Must feel like a premium scrolldown story (inspired by the style of modern safety SaaS) without copying layouts or assets.
Desktop behavior:
A story module that advances through 4–6 steps as the user scrolls.
Each step updates:
Visual “UI” panel (original mock UI/illustration)
A short caption describing what’s happening (school scenario)
Progress indicator (stepper)
Mobile behavior:
Degrade to swipeable step carousel (no pinned scroll if performance suffers)
Reduced motion:
If prefers-reduced-motion, show static step list (no heavy animation)
Step content (suggested 4–6):
After-hours presence detected → alert generated
Unauthorized access attempt in restricted zone
Hallway rush pattern indicates aggression risk
Crowd dispersal/panic anomaly
Human review + escalation workflow (high-level)

FR4 — Demo Type #2: Future MP4 Deep-Dive Slot (must-have)
A separate “Deep-dive demo” module with a clear placeholder now.
Requirements:
Supports embedding an MP4 later (self-hosted or streamed)
V1 state:
Placeholder thumbnail + “In-depth walkthrough coming soon”
CTA: Join Early Access + Schedule Walkthrough
Later:
Replace placeholder with MP4 player without redesigning the page

FR5 — SEO, Analytics, Share (must-have)
Page metadata + OG defaults
sitemap.xml + robots.txt
Schema.org: Organization + SoftwareApplication
Analytics placeholders for:
CTA clicks (early access + schedule)
Form submits
Story completion rate

10) Non-Functional Requirements
Performance: Lighthouse 90+; lazy-load heavy demo assets; avoid scroll jank
Accessibility: keyboard navigation, focus states, reduced motion support
Security: no secrets in client, rate-limit form endpoints, secure headers baseline
Compatibility: modern browsers + mobile Safari

11) Home Page Content Requirements (V1)
Hero (no new cameras + what it is) + CTAs
Quick “What it is”
anime.js scrolldown concept demo
How it works (3 steps)
Detections (A–D categories above)
Security & privacy summary
MP4 deep-dive placeholder module
FAQ
Final CTA + Early Access form

12) Risks & Mitigations
Pre-MVP trust gap: be explicit it’s early access; avoid fake proof
Over-claiming detection accuracy: use “designed to detect”; no “guaranteed” language
Cloud privacy concerns: be transparent about data handling and retention being configurable
Anime.js scroll performance: degrade to carousel/static for mobile + reduced motion

13) Acceptance Criteria
Users understand Surveilens + “no new cameras” in <30 seconds
Early access form works end-to-end and stores leads (Supabase-ready)
Schedule Walkthrough CTA exists and fails gracefully if link missing
anime.js scrolldown concept demo works on desktop and degrades on mobile
MP4 slot exists and is easy to swap later
Site is fast, accessible, and responsive


