import React, { useState, useEffect, useRef } from "react"
import {
  ArrowRight,
  ChevronDown,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  BookOpen,
  Award,
  Zap,
  Phone,
  Target,
  Layers,
  Search,
  BarChart3,
  Rocket,
} from "lucide-react"

/* ─── TYPES ─────────────────────────────────────────────── */

interface Skill {
  name: string
  desc: string
  time: string
}

interface Phase {
  number: string
  title: string
  duration: string
  color: string
  bg: string
  border: string
  icon: React.ElementType
  tagline: string
  skills: Skill[]
  resources: string[]
  milestone: string
  tip: string
}

interface SalaryRow {
  label: string
  range: string
  bar: number
  color: string
}

interface StatItem {
  icon: React.ElementType
  val: string
  label: string
  color: string
}

interface AdvantageItem {
  title: string
  desc: string
}

/* ─── HOOK ──────────────────────────────────────────────── */

function useInView(): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState<boolean>(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return [ref, inView]
}

/* ─── DATA ──────────────────────────────────────────────── */

const phases: Phase[] = [
  {
    number: "01",
    title: "Reframe What You Already Do",
    duration: "Weeks 1–3",
    color: "#e11d48",
    bg: "#fff1f2",
    border: "#fecdd3",
    icon: Phone,
    tagline: "You've been doing product management — without the title",
    skills: [
      {
        name: "The Product Manager Mindset",
        desc: "A PM's job is to figure out what to build, why to build it, and how to get a team to ship it. Every time you escalated a recurring complaint pattern to improve a process, every time you tracked SLA metrics and decided which failure modes to fix first — that was product thinking. You just didn't have the vocabulary.",
        time: "3 days",
      },
      {
        name: "PM Vocabulary & Frameworks",
        desc: "User stories, acceptance criteria, product specs, PRDs, OKRs, roadmaps, backlogs — the language product teams speak. The concepts aren't foreign to you; the terminology is. Learn to translate your call centre instincts into PM-fluent communication.",
        time: "1 week",
      },
      {
        name: "How Product Teams Work",
        desc: "Agile, Scrum, Kanban, sprints, standups, retrospectives — the operating rhythm of a product team. Compare this to your shift management, briefing cycles, and performance reviews. The cadence is the same. The outputs differ.",
        time: "1 week",
      },
    ],
    resources: [
      "Lenny's Newsletter (free tier)",
      "Shreyas Doshi on LinkedIn (free)",
      "Inspired by Marty Cagan (book — worth buying)",
    ],
    milestone:
      "Write a 1-page 'product teardown' of the call centre software your team uses — what works, what doesn't, and what you'd fix first if you were the PM.",
    tip: "Every PM I've hired who came from operations has outperformed the MBA hires in the first year. They know what actually breaks. They know what users actually complain about. They've lived in the messy reality that product managers typically only read about in research reports.",
  },
  {
    number: "02",
    title: "User Research & Discovery",
    duration: "Weeks 4–9",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
    icon: Search,
    tagline: "You've been doing user research every single day — in real time",
    skills: [
      {
        name: "Discovery & Problem Definition",
        desc: "How to identify real user problems worth solving. Jobs-to-be-done (JTBD), problem statements, assumption mapping — the structured approach to what you've been doing intuitively when you identified patterns in call types and complained to your manager that 'this keeps happening because of the product.'",
        time: "2 weeks",
      },
      {
        name: "User Interviews",
        desc: "How to conduct structured 1:1 interviews to uncover user needs, motivations, and pain points. You've had thousands of customer conversations. Now learn to turn those instincts into a systematic research practice that produces evidence, not just anecdotes.",
        time: "1.5 weeks",
      },
      {
        name: "Competitor Analysis & Market Mapping",
        desc: "How to analyse competing products, identify gaps, and position a product in a market. What alternatives do users have? What do they hate about them? What switch triggers make people choose differently?",
        time: "1.5 weeks",
      },
    ],
    resources: [
      "The Mom Test by Rob Fitzpatrick (book — essential)",
      "Teresa Torres on Continuous Discovery (free articles)",
      "JTBD Institute (free resources)",
    ],
    milestone:
      "Conduct 5 user interviews with real people about a product or service you use. Write a synthesis of what you found and what it implies.",
    tip: "Call centre team leads are the world's most experienced qualitative researchers. You've heard thousands of customers describe their frustrations in their own words, under real emotional pressure, without a prepared script. That is a research skill. Most PMs spend months building the intuition you already have.",
  },
  {
    number: "03",
    title: "Product Strategy & Prioritisation",
    duration: "Weeks 10–17",
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    icon: Target,
    tagline: "You already know how to decide what matters most under pressure",
    skills: [
      {
        name: "Prioritisation Frameworks",
        desc: "RICE, MoSCoW, the Kano model, opportunity scoring — structured ways to decide what to build next. Compare this to how you triage escalations, allocate agents, and decide which SLA breach to address first. The frameworks formalise a skill you already have.",
        time: "2 weeks",
      },
      {
        name: "Product Roadmapping",
        desc: "How to build and communicate a product roadmap — what you'll build, in what order, and why. Roadmaps are not Gantt charts. They're a communication tool for alignment. Sound familiar? You've been aligning teams to operational priorities your entire career.",
        time: "2 weeks",
      },
      {
        name: "OKRs & Product Metrics",
        desc: "Setting Objectives and Key Results, defining success metrics, building dashboards that tell the real story. You've lived and died by SLAs, CSAT, AHT, FCR. Product metrics are the same rigour applied to a different set of outcomes.",
        time: "2 weeks",
      },
    ],
    resources: [
      "Lenny's Product Strategy Course (free episodes)",
      "Reforge Blog (free articles)",
      "Product Talk by Teresa Torres (free)",
    ],
    milestone:
      "Build a 6-month roadmap for a product you use regularly. Define the problem, the opportunity, three initiatives, and the success metric for each.",
    tip: "Prioritisation is one of the hardest skills in product management — and one most PMs take years to develop. You've been making high-stakes triage decisions under pressure every shift for years. The skill is there. You just need to learn to explain it in product language.",
  },
  {
    number: "04",
    title: "Data, Analytics & Product Metrics",
    duration: "Weeks 18–25",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    icon: BarChart3,
    tagline: "KPIs, dashboards, and data-driven decisions — you've been doing this",
    skills: [
      {
        name: "SQL for Product Managers",
        desc: "SELECT, GROUP BY, JOIN, COUNT, AVG — enough SQL to pull your own data without waiting for an analyst. Not enough to be a data engineer; enough to be dangerous and independent. The single most-mentioned skill gap among junior PMs.",
        time: "3 weeks",
      },
      {
        name: "Product Analytics Tools",
        desc: "Mixpanel, Amplitude, Google Analytics, Looker — the tools PMs use to understand user behaviour, build funnels, and track retention. These are the product equivalents of your call centre reporting dashboards.",
        time: "2 weeks",
      },
      {
        name: "A/B Testing & Experimentation",
        desc: "Hypothesis formation, test design, statistical significance, reading results — how product teams run experiments. You've been running informal experiments every time you tested a new script, process, or routing rule. Now formalise it.",
        time: "1.5 weeks",
      },
    ],
    resources: [
      "Mode SQL Tutorial (free)",
      "Mixpanel University (free)",
      "Evan Miller's A/B Test Calculator (free)",
    ],
    milestone:
      "Write a full experiment brief: hypothesis, test design, success metric, minimum detectable effect, and what you'd do with each possible result.",
    tip: "PMs who can pull their own data are worth their weight in gold. You don't need to be a data scientist — you need to not be blocked by the data team every time you have a question. Three weeks of SQL changes your entire working life as a PM.",
  },
  {
    number: "05",
    title: "Technical Fundamentals & Working with Engineers",
    duration: "Weeks 26–32",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    icon: Layers,
    tagline: "You don't need to code. You need to understand how engineers think.",
    skills: [
      {
        name: "How Software Gets Built",
        desc: "APIs, front-end vs back-end, databases, microservices, the basics of how software systems are structured. Not enough to write code — enough to have a real technical conversation, understand engineering effort estimates, and know when to push back on 'that's too hard.'",
        time: "2 weeks",
      },
      {
        name: "Writing Product Specs & User Stories",
        desc: "PRDs, user stories, acceptance criteria, edge cases — the documents that translate product thinking into engineering work. Good specs prevent bad builds. Bad specs are the most expensive mistake in product development. Learn to write them well.",
        time: "2 weeks",
      },
      {
        name: "Agile in Practice",
        desc: "Sprint planning, backlog grooming, daily standups, retrospectives, story points — the real operating cadence of a product team. The rituals and their purpose. What to do when they break down. How to run them well.",
        time: "1.5 weeks",
      },
    ],
    resources: [
      "Basecamp's Shape Up (free online)",
      "Silicon Valley Product Group blog (free)",
      "The Pragmatic Engineer Newsletter (free tier)",
    ],
    milestone:
      "Write a full PRD (Product Requirements Document) for one feature of a product you use. Include the problem, user stories, acceptance criteria, open questions, and success metrics.",
    tip: "The most common fear career changers have is the technical gap. Here's the reality: engineers don't need PMs who can code. They need PMs who are clear, decisive, and don't change their minds every sprint. Your operations background made you exactly that.",
  },
  {
    number: "06",
    title: "Build Your Portfolio & Land the Role",
    duration: "Weeks 33–48",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
    icon: Rocket,
    tagline: "Your call centre background is the differentiator — lean into it",
    skills: [
      {
        name: "3 PM Portfolio Projects",
        desc: "A product teardown, a product spec, and a case study — the three artefacts that show hiring managers you think like a PM. Each one should tell a story: here's the problem I identified, here's how I thought about it, here's what I would build and why.",
        time: "4 weeks",
      },
      {
        name: "Case Study Interview Prep",
        desc: "Product design questions ('Design a product for X'), metrics questions ('How would you measure success for Y?'), strategy questions ('How would you prioritise Z?') — the interview formats used by every major product team. Practice with a partner.",
        time: "2 weeks",
      },
      {
        name: "Resume & LinkedIn Pivot",
        desc: "Rewrite your career story in PM language. 'Managed a team of 40 agents across 3 shifts with 94% SLA attainment' is not just operations experience — it's stakeholder management, metrics ownership, and cross-functional coordination. Name it correctly.",
        time: "1 week",
      },
      {
        name: "Strategic Job Targeting",
        desc: "Target operations-heavy companies: e-commerce, logistics, fintech, SaaS companies with large customer success teams. These organisations value PMs who understand operational reality. Your background is a premium, not a liability, in these environments.",
        time: "Ongoing",
      },
    ],
    resources: [
      "Exponent PM Interview Prep (free tier)",
      "Lenny's Job Board (free to browse)",
      "Product School community (free)",
    ],
    milestone:
      "3 published portfolio pieces + a targeted applications list + your first Associate or Junior PM offer.",
    tip: "Companies building operational software — field service tools, workforce management, customer support platforms, logistics tech — desperately need PMs who have lived the problem. You are their ideal hire. Stop hiding your background and start leading with it.",
  },
]

const salaryData: SalaryRow[] = [
  { label: "Associate PM / Junior PM (0–2 yrs)", range: "$65K–$95K", bar: 35, color: "#e11d48" },
  { label: "Product Manager (2–4 yrs)", range: "$95K–$140K", bar: 58, color: "#d97706" },
  { label: "Senior Product Manager", range: "$135K–$190K", bar: 78, color: "#059669" },
  { label: "Principal PM / Group PM / Director", range: "$180K–$260K+", bar: 100, color: "#7c3aed" },
]

const advantages: AdvantageItem[] = [
  {
    title: "You've Managed Stakeholders at Every Level",
    desc: "You've reported up to senior leadership on SLA performance, managed across to other department heads, and directed down to a team of agents — all simultaneously. That's the exact stakeholder matrix a PM navigates every day. Most candidates spend two years learning what you've already mastered.",
  },
  {
    title: "You Know What 'Done' Actually Looks Like",
    desc: "When a feature ships, PMs have to define what success looks like operationally — not just technically. You know how a product change actually affects the people using it daily. You've lived the gap between 'it works in demo' and 'it works in production at 400 calls per hour.'",
  },
  {
    title: "You've Built and Maintained Trust Under Pressure",
    desc: "Managing a call centre team means making decisions in front of people, owning outcomes when things go wrong, and keeping a team aligned when everything is on fire. That's the exact pressure test of product leadership. You've already passed it, repeatedly.",
  },
  {
    title: "You Speak the Language of the Customer",
    desc: "Most PMs learn about user pain through research reports and interview transcripts. You've heard it raw — unfiltered, emotional, in real time. You know which complaints are structural product failures and which are one-off edge cases. That instinct is genuinely rare in product.",
  },
]

/* ─── COMPONENT ─────────────────────────────────────────── */

export default function ProductManagerRoadmapPage(): React.ReactElement {
  const [openPhase, setOpenPhase] = useState<number | null>(0)
  const [heroRef, heroIn] = useInView()
  const [salRef, salIn] = useInView()

  const stats: StatItem[] = [
    { icon: DollarSign, val: "$95K", label: "Avg. PM Salary (mid)", color: "#e11d48" },
    { icon: TrendingUp, val: "+19%", label: "Job Growth (10yr)", color: "#d97706" },
    { icon: Users, val: "#1", label: "Most Sought-After Role in Tech", color: "#059669" },
    { icon: Clock, val: "12mo", label: "Avg. Transition Time", color: "#7c3aed" },
  ]

  return (
    <div
      style={{
        fontFamily: "'IBM Plex Serif', Georgia, serif",
        background: "#fafafa",
        color: "#0d1117",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=IBM+Plex+Sans:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        .fade{animation:fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both}
        .sans{font-family:'IBM Plex Sans',system-ui,sans-serif}
        .phase-card{background:#fff;border:1.5px solid #e2e8f0;border-radius:16px;overflow:hidden;transition:all 0.3s;cursor:pointer;margin-bottom:10px;box-shadow:0 1px 8px rgba(225,29,72,0.04)}
        .phase-card:hover{border-color:#fecdd3;box-shadow:0 8px 32px rgba(225,29,72,0.08)}
        .resource-pill{display:inline-flex;align-items:center;gap:5px;background:#fff1f2;border:1px solid #fecdd3;border-radius:99px;padding:4px 12px;font-size:12px;color:#be123c;font-weight:600;font-family:'IBM Plex Sans',sans-serif}
        .cta-btn{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#e11d48,#d97706);color:#fff;padding:0.9rem 2rem;border-radius:10px;font-size:0.95rem;font-weight:700;border:none;cursor:pointer;font-family:'IBM Plex Sans',sans-serif;text-decoration:none;transition:all 0.25s}
        .cta-btn:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(225,29,72,0.3)}
        .back-btn{display:inline-flex;align-items:center;gap:8px;color:#94a3b8;font-size:14px;font-weight:600;text-decoration:none;margin-bottom:2rem;transition:color 0.2s;background:none;border:none;cursor:pointer;padding:0;font-family:'IBM Plex Sans',sans-serif}
        .back-btn:hover{color:#e11d48}
        .data-quote{background:#fff1f2;border-left:3px solid #e11d48;padding:1.5rem 2rem;border-radius:0 14px 14px 0;margin:2rem 0;font-style:italic;color:#334155;font-size:1.05rem;line-height:1.85}
        .stat-chip{display:inline-flex;flex-direction:column;align-items:center;background:#fff;border:1.5px solid #e2e8f0;border-radius:14px;padding:1.25rem 1.5rem;min-width:120px;transition:all 0.25s}
        .stat-chip:hover{border-color:#fecdd3;background:#fff1f2}
        .adv-card{background:#fff;border:1.5px solid #e2e8f0;border-radius:14px;padding:1.5rem;transition:all 0.25s}
        .adv-card:hover{border-color:#fecdd3;box-shadow:0 8px 24px rgba(225,29,72,0.07);transform:translateY(-2px)}
        .callout-red{background:#fff1f2;border:1px solid #fecdd3;border-radius:12px;padding:1.25rem 1.5rem;font-family:'IBM Plex Sans',sans-serif;font-size:0.9rem;color:#881337;line-height:1.65}
        .section-tag{font-family:'IBM Plex Sans',sans-serif;font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#94a3b8}
        .adv-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .stat-row{display:flex;gap:16px;flex-wrap:wrap}
        @media(max-width:640px){.adv-grid{grid-template-columns:1fr!important}.stat-row{flex-direction:column!important}}
      `}</style>

      {/* TOP BAR */}
      <div
        style={{
          height: 3,
          background: "linear-gradient(90deg, #e11d48, #d97706, #059669, #0891b2, #7c3aed)",
        }}
      />

      {/* HERO */}
      <section
        style={{
          background: "linear-gradient(160deg, #fafafa 0%, #fff1f2 50%, #fffbeb 100%)",
          padding: "4.5rem 6% 3.5rem",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <button className="back-btn" onClick={() => window.history.back()}>
            ← Back to Career Paths
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#e11d48",
                display: "inline-block",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <span className="section-tag">Career Transition Guide</span>
          </div>

          <h1
            ref={heroRef}
            className={heroIn ? "fade sans" : "sans"}
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 3.75rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              marginBottom: "1.5rem",
              color: "#0d1117",
            }}
          >
            From Call Centre
            <br />
            Team Lead
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #e11d48, #d97706)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              to Product Manager
            </span>
          </h1>

          <p
            style={{
              fontSize: "1.2rem",
              color: "#475569",
              lineHeight: 1.85,
              marginBottom: "2rem",
              fontStyle: "italic",
              fontFamily: "'IBM Plex Serif', Georgia, serif",
            }}
          >
            You've been managing SLAs, owning metrics, handling escalations, and coordinating teams under pressure. That's not a different job from product management — it's the same job, in a different room.
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: "2.5rem",
              alignItems: "center",
            }}
          >
            <a href="#roadmap" className="cta-btn">
              Start the Roadmap <ArrowRight size={16} />
            </a>
            <span
              className="sans"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                color: "#94a3b8",
                fontWeight: 600,
              }}
            >
              <Clock size={13} color="#e11d48" /> ~12 months part-time
            </span>
          </div>

          <div className="stat-row">
            {stats.map((s: StatItem, i: number) => (
              <div key={i} className="stat-chip">
                <s.icon size={18} color={s.color} style={{ marginBottom: 6 }} />
                <div
                  className="sans"
                  style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0d1117", lineHeight: 1 }}
                >
                  {s.val}
                </div>
                <div
                  className="sans"
                  style={{
                    fontSize: "0.68rem",
                    color: "#94a3b8",
                    marginTop: 4,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textAlign: "center",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESSAY INTRO */}
      <section
        style={{ padding: "4.5rem 6%", background: "#fff", borderBottom: "1px solid #e2e8f0" }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div className="section-tag" style={{ marginBottom: "1.5rem" }}>Before We Begin</div>

          <h2
            className="sans"
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              marginBottom: "1.5rem",
              lineHeight: 1.2,
              color: "#0d1117",
            }}
          >
            Call centre team leads make exceptional product managers. The industry just doesn't connect those dots yet.
          </h2>

          <p style={{ fontSize: "1.05rem", color: "#334155", lineHeight: 1.9, marginBottom: "1.25rem" }}>
            Think about what you actually do every day. You track metrics that matter — not just the ones that are easy to measure, but the ones that reflect real customer experience: first call resolution, average handle time, CSAT, escalation rate. You make triage decisions under pressure: which problem gets fixed first, which agent gets which type of call, which process failure gets escalated to the product team. You manage stakeholders in every direction simultaneously — your team, your peers, your senior leadership, and occasionally the customers themselves.
          </p>

          <p style={{ fontSize: "1.05rem", color: "#334155", lineHeight: 1.9, marginBottom: "1.25rem" }}>
            Now read a product manager job description. Owns the product roadmap. Defines success metrics. Prioritises competing demands. Aligns cross-functional teams. Acts as the voice of the customer. Communicates up to leadership, across to engineering, and down to the team.
          </p>

          <p style={{ fontSize: "1.05rem", color: "#334155", lineHeight: 1.9, marginBottom: "1.25rem" }}>
            You've been doing this job. The gap between where you are and where you want to be is narrower than any job description makes it look.
          </p>

          <div className="data-quote">
            "The best PM I ever hired came from a call centre background. She knew what customers actually wanted because she'd spoken to thousands of them. She knew which product failures were catastrophic and which were edge cases because she'd lived it. She had more product instinct on day one than engineers I'd worked with for years."
            <div
              className="sans"
              style={{
                marginTop: "0.75rem",
                fontSize: "0.85rem",
                color: "#e11d48",
                fontStyle: "normal",
                fontWeight: 600,
              }}
            >
              — Head of Product at a Series B fintech company
            </div>
          </div>

          <p style={{ fontSize: "1.05rem", color: "#334155", lineHeight: 1.9, marginBottom: "1.25rem" }}>
            The roadmap below bridges a specific and learnable gap: moving from managing operational processes to managing the product those processes depend on. From running the team that reports the problems to being the person who fixes them in the product.
          </p>

          <div className="callout-red">
            <strong>The honest picture:</strong> Senior product managers earn 2–3× what most call centre team leads earn in the same industry. The skills overlap is real and substantial. The transition takes longer than most people want — typically 12–18 months of consistent part-time effort — but it is one of the most achievable pivots in tech for someone with your background.
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" style={{ padding: "4.5rem 6%", background: "#fafafa" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="section-tag" style={{ marginBottom: "0.75rem" }}>The Roadmap</div>
          <h2
            className="sans"
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              marginBottom: "0.5rem",
              color: "#0d1117",
            }}
          >
            Your 6-Phase Journey
          </h2>
          <p className="sans" style={{ color: "#94a3b8", marginBottom: "2.5rem", fontSize: "0.95rem" }}>
            Click each phase to read the full breakdown
          </p>

          {phases.map((phase: Phase, i: number) => {
            const Icon = phase.icon
            const isOpen: boolean = openPhase === i

            return (
              <div
                key={i}
                className="phase-card"
                style={{ borderColor: isOpen ? phase.color + "50" : "#e2e8f0" }}
                onClick={() => setOpenPhase(isOpen ? null : i)}
              >
                {/* PHASE HEADER */}
                <div
                  style={{
                    padding: "1.375rem 1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 12,
                      background: phase.bg,
                      border: `1.5px solid ${phase.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} color={phase.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span
                        className="sans"
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 800,
                          color: phase.color,
                          letterSpacing: "0.1em",
                        }}
                      >
                        PHASE {phase.number}
                      </span>
                      <span
                        className="sans"
                        style={{
                          fontSize: "0.7rem",
                          color: "#94a3b8",
                          background: "#f1f5f9",
                          padding: "2px 8px",
                          borderRadius: 99,
                          fontWeight: 600,
                        }}
                      >
                        {phase.duration}
                      </span>
                    </div>
                    <h3
                      className="sans"
                      style={{ fontSize: "1rem", fontWeight: 700, color: "#0d1117", lineHeight: 1.25 }}
                    >
                      {phase.title}
                    </h3>
                    <p className="sans" style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: 2 }}>
                      {phase.tagline}
                    </p>
                  </div>
                  <div
                    style={{
                      color: "#cbd5e1",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s",
                      flexShrink: 0,
                    }}
                  >
                    <ChevronDown size={18} />
                  </div>
                </div>

                {/* PHASE BODY */}
                {isOpen && (
                  <div
                    style={{ padding: "0 1.5rem 1.5rem", borderTop: `1px solid ${phase.color}18` }}
                  >
                    {/* Skills */}
                    <div style={{ marginTop: "1.25rem", marginBottom: "1.5rem" }}>
                      <div className="section-tag" style={{ marginBottom: "0.75rem" }}>
                        What You'll Learn
                      </div>
                      {phase.skills.map((skill: Skill, j: number) => (
                        <div
                          key={j}
                          style={{
                            display: "flex",
                            gap: 12,
                            alignItems: "flex-start",
                            padding: "11px 0",
                            borderBottom: "1px solid #f1f5f9",
                          }}
                        >
                          <div
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              background: phase.color,
                              flexShrink: 0,
                              marginTop: 7,
                            }}
                          />
                          <div style={{ flex: 1 }}>
                            <div
                              className="sans"
                              style={{
                                fontWeight: 700,
                                color: "#0d1117",
                                fontSize: "0.9rem",
                                marginBottom: 3,
                              }}
                            >
                              {skill.name}
                            </div>
                            <div style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.7 }}>
                              {skill.desc}
                            </div>
                          </div>
                          <div
                            className="sans"
                            style={{
                              fontSize: "0.7rem",
                              color: phase.color,
                              fontWeight: 700,
                              background: phase.bg,
                              padding: "3px 10px",
                              borderRadius: 99,
                              flexShrink: 0,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {skill.time}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Resources */}
                    <div style={{ marginBottom: "1.25rem" }}>
                      <div className="section-tag" style={{ marginBottom: "0.625rem" }}>
                        Best Free Resources
                      </div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {phase.resources.map((r: string, j: number) => (
                          <span key={j} className="resource-pill">
                            <BookOpen size={10} color={phase.color} /> {r}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Milestone */}
                    <div
                      style={{
                        background: phase.bg,
                        border: `1px solid ${phase.border}`,
                        borderRadius: 12,
                        padding: "1rem 1.25rem",
                        marginBottom: "0.875rem",
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                      }}
                    >
                      <Award size={16} color={phase.color} style={{ flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <div
                          className="sans"
                          style={{
                            fontSize: "0.68rem",
                            fontWeight: 800,
                            color: phase.color,
                            letterSpacing: "0.08em",
                            marginBottom: 3,
                          }}
                        >
                          PHASE MILESTONE
                        </div>
                        <div
                          className="sans"
                          style={{ fontSize: "0.875rem", color: "#334155", fontWeight: 600, lineHeight: 1.5 }}
                        >
                          {phase.milestone}
                        </div>
                      </div>
                    </div>

                    {/* Tip */}
                    <div
                      style={{
                        background: "#fffbeb",
                        border: "1px solid #fde68a",
                        borderRadius: 12,
                        padding: "1rem 1.25rem",
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                      }}
                    >
                      <Zap size={14} color="#d97706" style={{ flexShrink: 0, marginTop: 2 }} />
                      <div style={{ fontSize: "0.875rem", color: "#78350f", lineHeight: 1.7, fontStyle: "italic" }}>
                        "{phase.tip}"
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* UNFAIR ADVANTAGE */}
      <section
        style={{
          padding: "4.5rem 6%",
          background: "#fff",
          borderTop: "1px solid #e2e8f0",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="section-tag" style={{ marginBottom: "1.5rem" }}>Your Unfair Advantage</div>
          <h2
            className="sans"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              marginBottom: "1.25rem",
              color: "#0d1117",
            }}
          >
            What you bring that a pure technical candidate doesn't
          </h2>
          <p
            style={{ fontSize: "1.05rem", color: "#334155", lineHeight: 1.9, marginBottom: "2rem" }}
          >
            Product management has a dirty secret: most PMs have never actually felt the weight of a customer problem. They've read about it in research, seen it in data, heard about it in user interviews. You've fielded it in real time, under pressure, at volume, while managing a team simultaneously. That is not a lesser experience than an MBA or a computer science degree. In most product contexts, it's a better one.
          </p>
          <div className="adv-grid" style={{ marginBottom: "2rem" }}>
            {advantages.map((item: AdvantageItem, i: number) => (
              <div key={i} className="adv-card">
                <div
                  className="sans"
                  style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0d1117", marginBottom: 6 }}
                >
                  {item.title}
                </div>
                <div style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.7 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SALARY */}
      <section style={{ padding: "4.5rem 6%", background: "#fafafa" }}>
        <div ref={salRef} style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="section-tag" style={{ marginBottom: "0.75rem" }}>Earning Potential</div>
          <h2
            className="sans"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              marginBottom: "0.5rem",
              color: "#0d1117",
            }}
          >
            What You'll Earn
          </h2>
          <p className="sans" style={{ color: "#94a3b8", marginBottom: "2.5rem", fontSize: "0.9rem" }}>
            Product management has one of the steepest salary growth curves in any industry
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {salaryData.map((s: SalaryRow, i: number) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span
                    className="sans"
                    style={{ fontSize: "0.875rem", fontWeight: 600, color: "#334155" }}
                  >
                    {s.label}
                  </span>
                  <span
                    className="sans"
                    style={{ fontSize: "0.875rem", fontWeight: 800, color: s.color }}
                  >
                    {s.range}
                  </span>
                </div>
                <div
                  style={{ height: 6, background: "#e2e8f0", borderRadius: 99, overflow: "hidden" }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: salIn ? `${s.bar}%` : "0%",
                      background: s.color,
                      borderRadius: 99,
                      transition: `width 1.2s ease ${i * 0.15}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section
        style={{ padding: "4.5rem 6%", background: "#fff", borderTop: "1px solid #e2e8f0" }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="section-tag" style={{ marginBottom: "1.5rem" }}>A Final Word</div>
          <h2
            className="sans"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              marginBottom: "1.25rem",
              color: "#0d1117",
            }}
          >
            The best products are built by people who've lived the problem. You're one of them.
          </h2>
          <p
            style={{ fontSize: "1.05rem", color: "#334155", lineHeight: 1.9, marginBottom: "1.25rem" }}
          >
            The product management industry has a persistent blind spot: it undervalues operational experience and overvalues academic credentials. The result is products built by people who have never actually used them under real conditions, in real volume, with real consequences. Products that look great in a demo and fall apart in a call centre.
          </p>
          <p
            style={{ fontSize: "1.05rem", color: "#334155", lineHeight: 1.9, marginBottom: "1.25rem" }}
          >
            You've spent years on the receiving end of that failure. You know exactly what it costs — in agent time, in customer frustration, in escalations that should never have happened. Add the product skills this roadmap teaches you, and you don't just become a PM. You become the PM who actually understands the problem.
          </p>
          <div className="data-quote">
            Operations experience is not a detour on the way to product management. For the right companies — and there are many of them — it's the most direct route. The call centre team lead who becomes a PM at a CX software company isn't an unlikely hire. They're the only logical one.
          </div>
          <div
            style={{
              marginTop: "2.5rem",
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <a href="#roadmap" className="cta-btn">
              Start Phase 01 Today <ArrowRight size={16} />
            </a>
      
          </div>
        </div>
      </section>
    </div>
  )
}
