DESIGN_DOC.md — Surveilens Marketing Website (V1.4)

0) Purpose
Build a premium, high-converting marketing site for Surveilens that:
leads with “No new cameras / no rip-and-replace”
includes two demo experiences
Anime.js scroll-story concept demo (now)
MP4 deep-dive slot (later: you + cofounder walkthrough)
converts via Join Early Access (primary) + Schedule a Walkthrough (secondary)
Inspiration: Cluely-like product-led clarity (clean hero, crisp sections, conversion rhythm) (Anime.js) + Flock-like scroll narrative energy (scroll cue + story progression) (Anime.js) — while staying 100% original in layout, copy, and visuals.

1) Make it visually unique (not average B2B SaaS)
Your differentiator isn’t just “AI.” It’s: “No new cameras, but new understanding.” The site should feel like a threat-signal instrument panel, not a generic SaaS landing page.
1.1 Signature design motifs (use 2–3 consistently)
A) Signal Constellation Background (subtle, premium)
A faint field of dots/lines that slowly “aligns” as you scroll (no cheesy particle storm).
It visually reinforces “patterns” and “signals.”
Reduced motion = static background.
B) Glass-on-Dark “Overlay Aesthetic”
The site itself should feel like an overlay: translucent panels, soft borders, blur, and crisp typography.
This ties directly to Surveilens being an overlay on existing systems.
C) “No New Cameras” Proof-by-Visual
A camera grid is shown as a stable mosaic (the “existing fleet”), while a transparent overlay layer appears above it (Surveilens).
This becomes a reusable visual language: base layer = “existing systems,” top layer = “threat detection.”
1.2 Unique interaction ideas (pick the best 2–3)
1) Safety Signals Atlas (interactive capability grid)
Instead of a basic features list, use a 2D “atlas”:
Rows = scenario category (Aggression / Unauthorized access / After-hours / Crowd anomalies)
Columns = “signal type” (motion, crowd dynamics, restricted zones, time windows)
Hovering highlights related signals and updates a mini preview card.
2) “Alert Confidence Ladder” (explain false positives without claiming perfection)
A visual ladder showing how Surveilens combines cues:
motion + person confirmation + time window + zone rules
It’s educational and trust-building—without needing customer proof.
3) Scenario Dial (micro-interaction)
A small dial/tabs: “After-hours,” “Unauthorized access,” “Aggression cues,” “Crowd anomaly”
Switching tabs changes the UI mock in place (lightweight; works great even if scroll-story is heavy).

2) Information architecture
Pages (V1)
/ Home
/product Product
/how-it-works How It Works
/solutions/schools Schools
/security Security & Privacy
/about About
/early-access Early Access
/legal/privacy, /legal/terms
Nav + CTAs
Sticky nav
Links: Product, How It Works, Schools, Security
CTAs:
Primary: Join Early Access
Secondary: Schedule a Walkthrough (Calendly link placeholder)

3) Visual style system
3.1 Theme
Dark premium (near-black), subtle gradient noise, glass surfaces.
One accent color (electric blue), used sparingly for CTAs + progress.
3.2 Tokens (starter)
Spacing: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96
Radius: 12 (cards), 16 (panels)
Border: 1px white @ 8–12% opacity
Shadows: soft and wide (no harsh drops)

4) Components
Navbar (sticky, blurred)
Hero (headline + CTAs + scroll cue)
Early Access strip (pre-MVP honesty)
Safety Signals Atlas (unique interactive grid)
Scroll-story demo (Anime.js)
How it works stepper (3 steps)
Capabilities grid (A–D categories)
Security/Privacy teaser
Deep-dive MP4 slot (placeholder now)
FAQ accordion
Early access form
Footer (legal, links, placeholder contact)

5) Motion & interaction spec
5.1 Global motion rules
Short, calm transitions; no bouncy “startup” energy.
Reduced motion disables:
scroll-driven transforms
pinned story animation
background constellation movement
5.2 Scroll cue
“Scroll” chip with tiny arrow bobbing (low amplitude).

6) Anime.js Setup + Usage Guide (Install, Import, React)
6.1 Installation (NPM)
Anime.js can be installed via the animejs package. (Anime.js)
npm install animejs

Then import Anime.js methods directly into your JavaScript (works great with bundlers like Vite/esbuild). (Anime.js)
import { animate } from 'animejs';

6.2 Using with React (recommended pattern: useEffect + createScope)
Anime.js supports a React-friendly pattern using useEffect() + createScope() to scope animations to a component root and cleanly revert them on unmount. (Anime.js)
Why createScope() matters
Prevents animations from leaking across route changes
Ensures cleanup is easy (scope.revert()) (Anime.js)
Helps you build componentized motion systems
React example (keep as your reference template)
(This is the exact style pattern you provided; it matches the Anime.js “Using with React” approach.) (Anime.js)
import { animate, createScope, spring, createDraggable } from 'animejs';
import { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const root = useRef(null);
  const scope = useRef(null);
  const [ rotations, setRotations ] = useState(0);

  useEffect(() => {
    scope.current = createScope({ root }).add(self => {
      // Every anime.js instance declared here is now scoped to <div ref={root}>

      animate('.logo', {
        scale: [
          { to: 1.25, ease: 'inOut(3)', duration: 200 },
          { to: 1, ease: spring({ bounce: .7 }) }
        ],
        loop: true,
        loopDelay: 250,
      });

      createDraggable('.logo', {
        container: [0, 0, 0, 0],
        releaseEase: spring({ bounce: .7 })
      });

      self.add('rotateLogo', (i) => {
        animate('.logo', {
          rotate: i * 360,
          ease: 'out(4)',
          duration: 1500,
        });
      });
    });

    // Cleanup all anime.js instances declared inside the scope
    return () => scope.current.revert();
  }, []);

  const handleClick = () => {
    setRotations(prev => {
      const newRotations = prev + 1;
      scope.current.methods.rotateLogo(newRotations);
      return newRotations;
    });
  };

  return (
    <div ref={root}>
      <div className="large centered row">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <div className="medium row">
        <fieldset className="controls">
          <button onClick={handleClick}>rotations: {rotations}</button>
        </fieldset>
      </div>
    </div>
  );
}

export default App;

“Beginner guide” reference
If someone on your team needs a gentle intro, this Medium guide is a decent starting point. (Medium)

7) Anime.js Scroll-Story Demo — Full Storyboard + Implementation Spec
7.1 Interaction goal
A scroll-driven narrative module that demonstrates Surveilens’ concept workflow (pre-MVP), inspired by modern scroll storytelling patterns (Anime.js) but executed as an original Surveilens “signal overlay” experience.
7.2 Desktop layout
Section: #story
Height: ~240vh (enough scroll for 5 steps)
Inner layout: 2 columns
Left column (content)
Stepper (1–5)
Step title
1–2 sentences
“Signal type” pill
Microcopy: “Concept demo (pre-MVP)”
Right column (stage)
Fixed aspect ratio (16:10) mock UI panel
Contains:
camera tile base layer (existing fleet metaphor)
overlay layer (glassy)
alert card
timeline rail + marker
status chip
Pinned approach
Use CSS position: sticky for the stage; the story section scroll provides progress.
7.3 Mobile / Reduced motion
Mobile: replace scroll sync with a swipe carousel (same 5 steps).
Reduced motion: render all 5 steps stacked with static stage frames.

7.4 Storyboard: Steps (5)
Step 1 — After-hours presence
Title: After-hours presence
Text: Person detected during restricted time windows. Motion + person confirmation helps reduce false positives.
Stage changes:
highlight “Time window” badge
stylized person presence indicator
alert card: “After-hours presence”
Motion beats:
stage fade-in + subtle scale (0.98 → 1)
alert slides in (x: 12px → 0) + fade
progress fill: 0% → 20%

Step 2 — Restricted door entry
Title: Restricted door entry
Text: Entry signal detected in a restricted zone (wrong zone or after-hours).
Stage changes:
zone boundary highlights near doorway
alert updates: “Unauthorized access signal”
marker moves to checkpoint 2
Motion beats:
alert content crossfade (opacity dip → swap → restore)
progress fill: 20% → 40%

Step 3 — Aggression cues
Title: Aggression cues
Text: Motion patterns like rushing/striking can trigger a review alert for staff.
Stage changes:
subtle motion streaks around a region
alert updates: “Aggression pattern detected”
Motion beats:
region pulse (scale 1 → 1.02 → 1)
progress fill: 40% → 60%

Step 4 — Crowd anomaly
Title: Crowd anomaly
Text: Rapid dispersal, running toward exits, or sudden density changes can indicate a potential incident.
Stage changes:
multiple dot indicators appear
density strip animates
alert updates: “Crowd anomaly signal”
Motion beats:
density indicator rises smoothly
progress fill: 60% → 80%

Step 5 — Review → escalate
Title: Review → escalate
Text: Alerts surface in a clear queue. Staff review and escalate based on policy.
Stage changes:
alert card shows action buttons (Acknowledge / Escalate)
status chip transitions: Unreviewed → Acknowledged → Escalated
Motion beats:
buttons fade in
chip crossfade + color shift (subtle)
progress fill: 80% → 100%

7.5 What to animate (selectors)
Recommended DOM selectors inside the stage:
#stageFrame
.fleetGrid (existing camera mosaic)
.overlayLayer (glassy overlay)
.highlightRegion
.alertCard, .alertTitle, .alertDetails
.progressFill
.markerDot
.chipStatus
.actionButtons

7.6 How to drive scroll sync (2 approaches)
Approach A (Preferred): onScroll() controlling a timeline
Anime.js supports using onScroll() directly in a timeline’s autoplay setting, which synchronizes animation/timeline instances to scroll. (Anime.js)
Build the sequence with a timeline (Anime.js timeline API). (Anime.js)
Mental model
One timeline contains all transitions.
Scroll position maps to timeline progress.
Skeleton
import { createTimeline, onScroll } from 'animejs';

const tl = createTimeline({
  autoplay: onScroll({ target: document.querySelector('#story') }),
  defaults: { easing: 'easeOutQuad', duration: 260 }
});

// Step segments: use `.add()` with positions (0, 1, 2, 3, 4) or ms offsets
tl.add('.alertCard', { opacity: [0, 1], translateX: [12, 0] }, 0);
// ...

Approach B (Fallback): manual scroll progress + requestAnimationFrame
Compute progress (0→1) and set timeline time each frame. Use requestAnimationFrame() so updates align with the browser’s paint cycle. (MDN Web Docs)
This is especially helpful if you want snapping behavior or custom thresholds.

7.7 Step threshold behavior (design requirement)
Even if scroll is continuous, the experience should feel stepped:
when progress crosses a threshold, the step changes,
transitions occur quickly (220–320ms),
then the stage holds stable until the next threshold.
This prevents “constant motion” fatigue and keeps performance clean.

8) MP4 deep-dive demo slot (future)
Component: DeepDiveVideoSlot
V1 state:
poster thumbnail
label: “In-depth walkthrough coming soon (MP4)”
CTAs: Join Early Access + Schedule a Walkthrough
Later:
drop in an MP4 <video> player without redesign
controlled by a single config var (e.g., DEEP_DIVE_MP4_URL)

9) Page wireframe spec (updated with unique modules)
9.1 Home (/)
Hero (No new cameras + what it is) + CTAs
Early access strip (“Build with schools—join early access”)
Safety Signals Atlas (interactive grid) (unique)
Anime.js scroll-story demo (concept)
How it works (3-step)
Capabilities grid (A–D)
Security & privacy teaser
Deep-dive MP4 slot (placeholder)
FAQ
Early access form + schedule link
9.2 Product (/product)
lead with “No new cameras” visual metaphor (fleet grid + overlay)
capabilities (A–D)
workflow (detect → alert → review)
CTA
9.3 How It Works (/how-it-works)
simple overlay explanation (base layer vs overlay layer)
cloud pipeline (high-level)
“what you control” (retention, roles, thresholds — configurable)
CTA
9.4 Schools (/solutions/schools)
school scenario cards (hallway/door/after-hours)
safety language (no “surveillance”)
CTA
9.5 Security & Privacy (/security)
clear data handling model (no fake badges)
“pre-MVP transparency”
CTA

10) Accessibility, performance, and degradation rules (must follow)
Mobile: no pinned scroll; use carousel.
Reduced motion: static step list; no scroll-driven transforms.
Performance: lazy-load the scroll-story section’s heavier assets; keep stage frames lightweight (SVG/HTML).
No over-claiming: use “designed to detect” and “targets include.”

