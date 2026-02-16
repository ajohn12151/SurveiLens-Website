export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    type: 'internal' | 'external';
    slug: string; // Internal: /blog/slug, External: https://...
    image?: string;
    readTime?: string;
    sourceName?: string; // For external posts (e.g., "TechCrunch")
    content?: string; // Full article content for internal posts
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: '1',
        title: "Why we don't use Facial Recognition",
        excerpt: "Our deep dive into ethical AI and why we chose behavioral analysis over identity profiling to protect student privacy.",
        date: "January 22, 2026",
        author: "Alan John, Co-Founder",
        type: 'internal',
        slug: 'no-facial-recognition',
        readTime: '5 min read',
    },
    {
        id: '2',
        title: "SurveiLens MVP Launch: Modernizing School Security Without New Hardware",
        excerpt: "We're officially launching our MVP this February. Here's how we're using existing camera infrastructure to detect threats and protect students.",
        date: "January 20, 2026",
        author: "Alan John, Co-Founder",
        type: 'internal',
        slug: 'mvp-launch',
        readTime: '6 min read',
        content: `## Why We Built SurveiLens

School security hasn't evolved meaningfully in decades. Metal detectors at entrances, lockdown drills, and panic buttons have become standard, yet they share a common flaw: they react to threats after they've already materialized.

When I started SurveiLens with my co-founder last year, we asked a simple question: what if school security systems could identify potential threats *before* they escalate? Not by adding more hardware or turning schools into fortresses, but by making existing infrastructure intelligent.

## The Problem with Current Approaches

Most schools have invested heavily in camera systems over the past decade. These cameras record everything, but they do little to prevent incidents. Footage is reviewed after the fact, if at all. Security personnel cannot monitor hundreds of feeds simultaneously. By the time someone notices something wrong in a live feed, it's often too late.

Meanwhile, proposed solutions typically fall into two categories:

1. **Hardware-heavy approaches**: Metal detectors, bulletproof doors, and armed security. These create fortress-like environments that affect school climate and are financially out of reach for many districts.

2. **Privacy-invasive surveillance**: Facial recognition systems that track every student's movement and create permanent behavioral records. These raise serious ethical concerns and often face community backlash.

We believed there had to be a third way.

## Our Approach: Behavioral Analysis Over Identity Tracking

SurveiLens takes a fundamentally different approach. Instead of identifying *who* is in a frame, we analyze *behavior* within a scene. Our computer vision models detect concerning patterns—someone drawing a weapon, aggressive physical altercations, or individuals entering restricted areas—without ever recognizing faces or storing identity data.

This distinction matters. Behavioral analysis means:

- No facial recognition databases
- No tracking of individual students across campus
- No storage of personal biometric data
- Alerts based on actions, not identities

When our system detects a potential threat, it immediately notifies designated personnel with relevant context—what was detected, where, and when—allowing for rapid, informed response.

## How the MVP Works

Our MVP, launching this February, integrates with existing IP camera infrastructure. Schools don't need new hardware. We work with what they already have.

The deployment process is straightforward:

**Week 1**: We map the existing camera network and identify optimal coverage zones. Our team works with school security staff to understand specific concerns—maybe it's a parking lot with past incidents, or a main entrance that needs better monitoring.

**Week 2**: We install edge computing devices that process video feeds locally. No footage leaves the school's network unless specifically configured for backup purposes. All threat detection happens on-premise, minimizing latency and maximizing privacy.

**Week 3**: We configure alert protocols. Different situations trigger different responses. A detected weapon might immediately notify school resource officers and administration. An altercation in a hallway could alert nearby teachers. Schools customize these workflows to their protocols.

**Ongoing**: The system learns and improves. As security staff provide feedback on alerts—valid threat or false positive—the models refine their accuracy for that specific environment.

## Early Results from Pilot Testing

We've spent the past six months running controlled pilots with private security firms and testing in simulated school environments. The results have validated our core hypotheses:

**Response time reduction**: In drills, the time from incident occurrence to security notification dropped from an average of 4-7 minutes (waiting for someone to notice and report) to under 10 seconds (automated detection).

**False positive management**: Our current models generate approximately 2-3 false alerts per camera per week in active environments. While not perfect, this is manageable for security staff, and each feedback instance improves future accuracy.

**Privacy preservation**: Independent security auditors confirmed our systems don't store or process facial recognition data. Behavioral analysis works as designed—detecting threats without tracking individuals.

## Addressing the Hard Questions

When we talk with school administrators and parents, certain concerns come up consistently. I want to address them directly.

**What about false positives? Won't this desensitize staff to alerts?**

It's a valid concern. We mitigate this through severity classification and rapid feedback loops. Critical alerts (weapon detection) are rare and treated with utmost seriousness. Lower-tier alerts accumulate context—if the system detects multiple concerning indicators, confidence increases and notification urgency escalates. Staff feedback on false positives immediately retrains local models.

**Who has access to the footage?**

Access controls are entirely managed by the school. SurveiLens processes feeds in real-time and can store alert clips locally for review, but we don't host footage in our cloud. Schools maintain complete ownership and control of their data.

**What happens if the system fails?**

SurveiLens is designed as an enhancement to existing security practices, not a replacement. All current protocols—human monitoring, communication systems, physical security—remain in place. Our system adds a layer of automated vigilance that works alongside trained personnel.

**Could this be used to target specific students?**

No. Our architecture makes this technically impossible. The models don't identify individuals. They analyze movement patterns, object detection, and spatial relationships. A student could wear a mask, and threat detection would function identically.

## What's Next

The February MVP represents our foundation, not our ceiling. Our roadmap includes:

- **Audio integration**: Detecting specific sound signatures—gunshots, breaking glass, aggressive shouting—to supplement visual detection
- **Predictive analytics**: Identifying patterns that *precede* incidents, like crowd formations that suggest developing altercations
- **Integration ecosystems**: Connecting with access control systems, public address systems, and emergency services for coordinated response

But we're taking this step by step. School security is too important to rush. Every feature we add undergoes rigorous testing, privacy review, and ethical evaluation.

## Join Us

We're currently selecting our first cohort of school partners for expanded deployment in Fall 2026. If you're an administrator, security professional, or educator interested in learning more, we'd welcome the conversation.

School safety shouldn't require choosing between ineffective systems and invasive surveillance. There's a better path forward—one that respects both security needs and fundamental privacy rights.

We're building that path. Join us.

---

*Alan John is the Co-Founder of SurveiLens. He can be reached at alan@surveilens.security.*`
    }
];
