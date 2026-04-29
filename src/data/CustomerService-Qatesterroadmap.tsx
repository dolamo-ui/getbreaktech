import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
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
  Bug,
  ClipboardList,
  Search,
  BarChart2,
  Rocket,
  TestTube2,
} from "lucide-react"

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

function useInView(): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState<boolean>(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
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

const phases: Phase[] = [
  {
    number: "01",
    title: "Understand What QA Actually Is",
    duration: "Weeks 1–3",
    color: "#6366f1",
    bg: "#eef2ff",
    border: "#c7d2fe",
    icon: Search,
    tagline: "You already do half of this job — you just haven't been paid for it",
    skills: [
      {
        name: "The QA Mindset",
        desc: "QA is the art of thinking adversarially — asking 'what could go wrong here?' before the user does. In call centre work, you spent every shift answering exactly that question after the fact. Now you'll answer it first.",
        time: "3 days",
      },
      {
        name: "Software Testing Fundamentals",
        desc: "Functional, regression, smoke, sanity, exploratory testing — the core testing types and when each applies. This is the vocabulary that QA job descriptions are written in. Learn it and postings start making sense.",
        time: "1 week",
      },
      {
        name: "Bug Lifecycle & Reporting",
        desc: "How a bug is found, documented, prioritised, fixed, and verified. JIRA, Linear, Trello — the tracking tools that every QA team uses. A well-written bug report is the primary deliverable of this role.",
        time: "1 week",
      },
      {
        name: "How Software Gets Built",
        desc: "Agile, sprints, standups, user stories, acceptance criteria — the development process that QA lives inside. You cannot test effectively without understanding the lifecycle you are part of.",
        time: "4 days",
      },
    ],
    resources: [
      "ISTQB Foundation Syllabus (free PDF)",
      "Ministry of Testing (free content)",
      "Software Testing Help (free blog)",
    ],
    milestone:
      "Write 10 detailed, professional bug reports for any app you use daily — be ruthlessly specific about reproduction steps",
    tip: "Every escalation you handled in the call centre was a bug report in disguise. You described the problem, the steps to reproduce it, what the customer expected, and what actually happened. That is the exact structure of a professional QA defect report.",
  },
  {
    number: "02",
    title: "Learn Manual Testing Deeply",
    duration: "Weeks 4–10",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    icon: ClipboardList,
    tagline: "The foundation every great tester builds before they touch automation",
    skills: [
      {
        name: "Writing Test Cases",
        desc: "Test case IDs, preconditions, step-by-step instructions, expected results — structured and reproducible so anyone on the team can execute them. This is the primary written output of a manual QA role.",
        time: "1.5 weeks",
      },
      {
        name: "Test Plans & Test Strategies",
        desc: "How to scope what you will test, in what order, with what priority, and what you will deliberately leave out. A QA tester who can write a test plan is worth significantly more than one who can only follow one.",
        time: "1 week",
      },
      {
        name: "Equivalence Partitioning & Boundary Testing",
        desc: "Smart test design techniques — testing one representative value from each class of inputs rather than every possible value. Work smarter, not just harder. These techniques appear in almost every QA interview.",
        time: "1 week",
      },
      {
        name: "Exploratory Testing",
        desc: "Unscripted testing guided by intuition, curiosity, and experience — the most creative, human part of QA that no script can fully replace. Your years of handling unpredictable customer situations give you an exceptional foundation for this.",
        time: "1 week",
      },
    ],
    resources: [
      "ISTQB FL Study Guide (free PDFs)",
      "Guru99 Testing Tutorials (free)",
      "TestRails Blog (free)",
    ],
    milestone:
      "Write a complete test plan with 30 or more test cases for a free application like Todoist or Notion",
    tip: "Manual testing is the heart of QA. Automation is a tool — judgment is the skill. Your years of noticing when something feels wrong, when a process doesn't make sense, when a customer's complaint reveals a systemic issue — that judgment makes you better at exploratory testing than most fresh graduates.",
  },
  {
    number: "03",
    title: "Learn the Tools of the Trade",
    duration: "Weeks 11–18",
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    icon: TestTube2,
    tagline: "The platforms that appear in every QA job listing — learn them now",
    skills: [
      {
        name: "JIRA for QA",
        desc: "Create and manage bug tickets, link defects to test cases, track sprint progress, manage backlog — the single most common tool in QA job listings globally. If you know JIRA well, you are immediately more employable.",
        time: "1 week",
      },
      {
        name: "Postman — API Testing Basics",
        desc: "Test the backend layer that users never see. Send HTTP requests, check responses, verify data structures, validate error handling — no code required. API testing skills add 20 to 30 percent to your salary ceiling at the junior level.",
        time: "2 weeks",
      },
      {
        name: "TestRail or Zephyr",
        desc: "Professional test management platforms — create test suites, execute test runs, generate coverage reports. Knowing these tools signals professional-level experience to any hiring manager reviewing your resume.",
        time: "1 week",
      },
      {
        name: "Basic SQL for QA",
        desc: "SELECT, WHERE, JOIN — just enough to query a database and verify that what the UI shows matches what was actually stored. You do not need to be a developer. You need to be able to check the data.",
        time: "2 weeks",
      },
    ],
    resources: [
      "Postman Learning Center (free)",
      "SQLZoo (free)",
      "JIRA Free Tier (free)",
    ],
    milestone:
      "Test a public API such as OpenWeather or the Pokémon API — document 15 test cases with expected and actual results",
    tip: "API testing feels intimidating until you realise it is just asking a server questions and checking whether it answers correctly. You already know how to ask the right questions and recognise a wrong answer. That instinct transfers directly.",
  },
  {
    number: "04",
    title: "Introduction to Test Automation",
    duration: "Weeks 19–28",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
    icon: Bug,
    tagline: "You do not need to become a developer to automate tests",
    skills: [
      {
        name: "Python Basics for Testers",
        desc: "Variables, loops, functions, conditional logic — just enough Python to write test scripts. This is not a full programming course. It is the minimum viable coding knowledge that unlocks automation testing.",
        time: "3 weeks",
      },
      {
        name: "Selenium WebDriver",
        desc: "Automate browser actions — open URLs, click buttons, fill forms, assert page content, handle alerts. The industry standard for UI automation and the most commonly required automation skill in junior QA postings.",
        time: "2 weeks",
      },
      {
        name: "Pytest Framework",
        desc: "Structure your automated test scripts, write assertions, group tests into suites, generate reports. Pytest is Python's most popular testing framework and appears in the majority of QA automation job descriptions.",
        time: "1.5 weeks",
      },
      {
        name: "Page Object Model",
        desc: "The design pattern that transforms fragile test scripts into maintainable, professional-grade automation. When your tests break every time the UI changes, POM is the solution. Knowing it separates junior from mid-level candidates.",
        time: "1 week",
      },
    ],
    resources: [
      "Automate the Boring Stuff Python (free)",
      "Selenium Documentation (free)",
      "Test Automation University (free)",
    ],
    milestone:
      "Write 5 end-to-end automated tests for a website — structured with Page Object Model, passing in CI",
    tip: "You do not need to become a programmer. You need to become fluent enough in Python to automate the repetitive parts of testing so you can focus on the parts that require human judgment. Think of it as creating macros for quality — you are teaching the machine to do the boring checks so you can do the clever ones.",
  },
  {
    number: "05",
    title: "Build Your QA Portfolio",
    duration: "Weeks 29–36",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    icon: BarChart2,
    tagline: "Show your work — make employers find you before you even apply",
    skills: [
      {
        name: "Test an Open Source Application",
        desc: "Find a real open-source app on GitHub and build a complete test suite for it — test plan, test cases, automated scripts, and a bug report document. This is the centrepiece of your portfolio and the evidence that closes most interviews.",
        time: "2 weeks",
      },
      {
        name: "GitHub Profile for QA",
        desc: "Public repositories with your Selenium scripts, README files explaining your approach, and documented test results. Hiring managers look here before they finish reading your resume. Make it look like someone who builds things.",
        time: "1 week",
      },
      {
        name: "Professional Bug Report Document",
        desc: "A curated collection of your 10 best bug reports — formatted, detailed, with reproduction steps and severity ratings. This document is often more impressive to non-technical hiring managers than a GitHub full of code.",
        time: "1 week",
      },
      {
        name: "LinkedIn & Resume Translation",
        desc: "Map your call centre experience into QA language: issue verification, systematic troubleshooting, escalation documentation, resolution tracking, user empathy testing. The experience is real — it just needs the right vocabulary.",
        time: "4 days",
      },
    ],
    resources: [
      "GitHub (free)",
      "Notion Portfolio Templates (free)",
      "Canva Resume Builder (free)",
    ],
    milestone:
      "Public GitHub repository with 20 or more automated tests plus a polished bug report portfolio document",
    tip: "Your call centre experience is not a gap in your resume — it is a feature. You have real-world, externally validated evidence of finding problems, documenting them clearly, communicating them to technical teams, and following them to resolution. That is QA. You have just been doing it unpaid.",
  },
  {
    number: "06",
    title: "Land Your First QA Role",
    duration: "Weeks 37–48",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
    icon: Rocket,
    tagline: "The right first role is closer than you think — apply strategically, not broadly",
    skills: [
      {
        name: "QA Interview Preparation",
        desc: "Testing fundamentals questions, SDLC explanations, live test case writing exercises, bug prioritisation scenarios — the standard set that every QA interviewer draws from. Prepare specific answers for each and practice them out loud.",
        time: "2 weeks",
      },
      {
        name: "Target Startups & Mid-Size Companies",
        desc: "Small and medium companies need generalist manual testers first — not specialised automation engineers. This is where almost every successful QA career begins. Do not apply to enterprise companies before getting your first role elsewhere.",
        time: "Ongoing",
      },
      {
        name: "Paid Testing Platforms",
        desc: "uTest and Testlio pay testers to test real apps for real companies — no job offer required. This gets you legitimate, paid QA experience to put on your resume while your job search is still running.",
        time: "Ongoing",
      },
      {
        name: "ISTQB Foundation Certificate",
        desc: "Optional but genuinely respected — many companies still list it as preferred. It validates your knowledge to hiring managers who are not themselves technical. Three weeks of study, one exam, lifetime credential.",
        time: "2 weeks",
      },
    ],
    resources: [
      "uTest (paid testing gigs)",
      "Testlio (freelance QA)",
      "ISTQB.org (official study guides free)",
    ],
    milestone:
      "First QA Analyst role — the moment your call centre experience officially becomes a technical superpower",
    tip: "QA roles have significantly lower application competition than developer roles. A strong portfolio, clear written communication — which you demonstrably have — and a coherent career narrative will set you apart from candidates who have technical skills but cannot explain their work. You can do both.",
  },
]

const salaryData: SalaryRow[] = [
  {
    label: "Junior QA Analyst (0–2 yrs)",
    range: "$45K–$65K",
    bar: 38,
    color: "#6366f1",
  },
  {
    label: "QA Engineer (2–4 yrs)",
    range: "$65K–$90K",
    bar: 56,
    color: "#0891b2",
  },
  {
    label: "Senior QA / Automation (4–7 yrs)",
    range: "$90K–$130K",
    bar: 76,
    color: "#059669",
  },
  {
    label: "QA Lead / Manager",
    range: "$120K–$180K+",
    bar: 100,
    color: "#7c3aed",
  },
]

const advantages: AdvantageItem[] = [
  {
    title: "You Communicate With Precision",
    desc: "Bug reports require exactly the kind of writing you've been doing for years: describe the problem, what you expected, what actually happened, how to reproduce it. Every escalation summary you've written is a bug report template.",
  },
  {
    title: "You Understand How Users Actually Behave",
    desc: "Thousands of calls have given you a map of every way users misuse, misunderstand, and break software. That map is enormously valuable in a QA role. A developer testing their own code doesn't have it. You do.",
  },
  {
    title: "You Stay Calm Under Pressure",
    desc: "Call centre shifts are relentlessly demanding. A QA sprint deadline with a release on the line is pressured — but it is a different kind of pressure. You have already been trained for composure under fire in a way most technical candidates have not.",
  },
  {
    title: "You Think Systematically",
    desc: "Verification scripts, troubleshooting procedures, following escalation processes — QA is structured, methodical thinking applied to software. You have been doing structured, methodical thinking in a different domain. The transfer is direct.",
  },
]

export default function CustomerServiceQATesterRoadmapPage(): React.ReactElement {
  const navigate = useNavigate()
  const [openPhase, setOpenPhase] = useState<number | null>(0)
  const [heroRef, heroIn] = useInView()
  const [salRef, salIn] = useInView()

  const stats: StatItem[] = [
    { icon: DollarSign, val: "$58K", label: "Avg. Starting Salary", color: "#6366f1" },
    { icon: TrendingUp, val: "+22%", label: "Job Growth (10yr)", color: "#0891b2" },
    { icon: Users, val: "Low", label: "Competition vs Dev Roles", color: "#059669" },
    { icon: Clock, val: "11mo", label: "Avg. Time to Hire", color: "#d97706" },
  ]

  return (
    <div
      style={{
        fontFamily: "'IBM Plex Serif', Georgia, serif",
        background: "#f8f9ff",
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
        .phase-card{background:#fff;border:1.5px solid #e2e8f0;border-radius:16px;overflow:hidden;transition:all 0.3s;cursor:pointer;margin-bottom:10px;box-shadow:0 1px 8px rgba(99,102,241,0.04)}
        .phase-card:hover{border-color:#c7d2fe;box-shadow:0 8px 32px rgba(99,102,241,0.1)}
        .resource-pill{display:inline-flex;align-items:center;gap:5px;background:#eef2ff;border:1px solid #c7d2fe;border-radius:99px;padding:4px 12px;font-size:12px;color:#4338ca;font-weight:600;font-family:'IBM Plex Sans',sans-serif}
        .cta-btn{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#6366f1,#0891b2);color:#fff;padding:0.9rem 2rem;border-radius:10px;font-size:0.95rem;font-weight:700;border:none;cursor:pointer;font-family:'IBM Plex Sans',sans-serif;text-decoration:none;transition:all 0.25s}
        .cta-btn:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(99,102,241,0.35)}
        .back-btn{display:inline-flex;align-items:center;gap:8px;color:#94a3b8;font-size:14px;font-weight:600;text-decoration:none;margin-bottom:2rem;transition:color 0.2s;background:none;border:none;cursor:pointer;padding:0;font-family:'IBM Plex Sans',sans-serif}
        .back-btn:hover{color:#6366f1}
        .data-quote{background:#f0f4ff;border-left:3px solid #6366f1;padding:1.5rem 2rem;border-radius:0 14px 14px 0;margin:2rem 0;font-style:italic;color:#334155;font-size:1.05rem;line-height:1.85}
        .stat-chip{display:inline-flex;flex-direction:column;align-items:center;background:#fff;border:1.5px solid #e2e8f0;border-radius:14px;padding:1.25rem 1.5rem;min-width:120px;transition:all 0.25s}
        .stat-chip:hover{border-color:#6366f1;background:#eef2ff}
        .adv-card{background:#fff;border:1.5px solid #e2e8f0;border-radius:14px;padding:1.5rem;transition:all 0.25s}
        .adv-card:hover{border-color:#c7d2fe;box-shadow:0 8px 24px rgba(99,102,241,0.08);transform:translateY(-2px)}
        .callout-indigo{background:#eef2ff;border:1px solid #c7d2fe;border-radius:12px;padding:1.25rem 1.5rem;font-family:'IBM Plex Sans',sans-serif;font-size:0.9rem;color:#312e81;line-height:1.65}
        .section-tag{font-family:'IBM Plex Sans',sans-serif;font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#94a3b8}
        .adv-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .stat-row{display:flex;gap:16px;flex-wrap:wrap}
        @media(max-width:640px){.adv-grid{grid-template-columns:1fr!important}.stat-row{flex-direction:column!important}}
      `}</style>

      {/* TOP BAR */}
      <div style={{ height: 3, background: "linear-gradient(90deg, #6366f1, #0891b2, #059669, #d97706, #7c3aed)" }} />

      {/* HERO */}
      <section style={{ background: "linear-gradient(160deg, #f8f9ff 0%, #eef2ff 50%, #ecfeff 100%)", padding: "4.5rem 6% 3.5rem", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <button className="back-btn" onClick={() => navigate("/career-change")}>
            ← Back to Career Paths
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
            <span className="section-tag">Career Transition Guide</span>
          </div>

          <h1
            ref={heroRef}
            className={heroIn ? "fade sans" : "sans"}
            style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.75rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: "1.5rem", color: "#0d1117" }}
          >
            From Call Centre Agent
            <br />
            <span style={{ background: "linear-gradient(135deg, #6366f1, #0891b2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              to QA Tester
            </span>
          </h1>

          <p style={{ fontSize: "1.2rem", color: "#475569", lineHeight: 1.85, marginBottom: "2rem", fontStyle: "italic", fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
            You've spent years being the person who notices when something goes wrong. Now let's turn that into a career — and a salary that reflects the skill.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: "2.5rem", alignItems: "center" }}>
            <a href="#roadmap" className="cta-btn">
              Start the Roadmap <ArrowRight size={16} />
            </a>
            <span className="sans" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>
              <Clock size={13} color="#6366f1" /> ~11 months part-time
            </span>
          </div>

          <div className="stat-row">
            {stats.map((s: StatItem, i: number) => (
              <div key={i} className="stat-chip">
                <s.icon size={18} color={s.color} style={{ marginBottom: 6 }} />
                <div className="sans" style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0d1117", lineHeight: 1 }}>{s.val}</div>
                <div className="sans" style={{ fontSize: "0.68rem", color: "#94a3b8", marginTop: 4, fontWeight: 600, letterSpacing: "0.04em", textAlign: "center" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESSAY INTRO */}
      <section style={{ padding: "4.5rem 6%", background: "#fff", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div className="section-tag" style={{ marginBottom: "1.5rem" }}>Before We Begin</div>

          <h2 className="sans" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "1.5rem", lineHeight: 1.2, color: "#0d1117" }}>
            Call centre agents are already QA testers. The industry just hasn't been paying them like it.
          </h2>

          <p style={{ fontSize: "1.05rem", color: "#334155", lineHeight: 1.9, marginBottom: "1.25rem" }}>
            Think about a typical shift. A customer calls: "I clicked the button three times and nothing happened." You ask: what browser? What were you doing before that? Did an error message appear? Without knowing the term, you were gathering reproduction steps for a bug report. Every single day.
          </p>

          <p style={{ fontSize: "1.05rem", color: "#334155", lineHeight: 1.9, marginBottom: "1.25rem" }}>
            Quality Assurance is, at its core, the discipline of asking "what could go wrong here?" and then systematically checking every answer before the user encounters it. You have been doing that — reactively, after users hit the bug — for your entire career. This roadmap teaches you to do it proactively, before the code ships. The shift in timing is the entire job change.
          </p>

          <div className="data-quote">
            "The best bug report I ever read was written by someone who came from customer support. She didn't know any code, but she described the issue so precisely — every step, every condition, every error message — that our developer fixed it in 20 minutes. Most engineers on my team can't write like that."
            <div className="sans" style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "#6366f1", fontStyle: "normal", fontWeight: 600 }}>
              — Engineering Manager at a Series A SaaS startup
            </div>
          </div>

          <p style={{ fontSize: "1.05rem", color: "#334155", lineHeight: 1.9, marginBottom: "1.25rem" }}>
            The roadmap below bridges one specific gap: giving you the vocabulary, tools, and formal skills to walk into a QA role with evidence of capability. The core instincts — systematic thinking, precise communication, empathy with frustrated users — you already have. Those take years to develop. You have already spent those years.
          </p>

          <div className="callout-indigo">
            <strong>The honest picture:</strong> QA is one of the most accessible entry points into the technology industry. It requires no computer science degree, no advanced mathematics, and no years of programming experience. It requires precision, patience, curiosity, and the ability to see software through the eyes of someone who doesn't understand how it was built. That is exactly what years of call centre work produce.
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" style={{ padding: "4.5rem 6%", background: "#f8f9ff" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="section-tag" style={{ marginBottom: "0.75rem" }}>The Roadmap</div>
          <h2 className="sans" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "0.5rem", color: "#0d1117" }}>
            Your 6-Phase Journey
          </h2>
          <p className="sans" style={{ color: "#94a3b8", marginBottom: "2.5rem", fontSize: "0.95rem" }}>
            Click each phase to read the full breakdown
          </p>

          {phases.map((phase: Phase, i: number) => {
            const Icon = phase.icon
            const isOpen = openPhase === i
            return (
              <div key={i} className="phase-card" style={{ borderColor: isOpen ? phase.color + "50" : "#e2e8f0" }} onClick={() => setOpenPhase(isOpen ? null : i)}>
                <div style={{ padding: "1.375rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 50, height: 50, borderRadius: 12, background: phase.bg, border: `1.5px solid ${phase.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={20} color={phase.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span className="sans" style={{ fontSize: "0.68rem", fontWeight: 800, color: phase.color, letterSpacing: "0.1em" }}>PHASE {phase.number}</span>
                      <span className="sans" style={{ fontSize: "0.7rem", color: "#94a3b8", background: "#f1f5f9", padding: "2px 8px", borderRadius: 99, fontWeight: 600 }}>{phase.duration}</span>
                    </div>
                    <h3 className="sans" style={{ fontSize: "1rem", fontWeight: 700, color: "#0d1117", lineHeight: 1.25 }}>{phase.title}</h3>
                    <p className="sans" style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: 2 }}>{phase.tagline}</p>
                  </div>
                  <div style={{ color: "#cbd5e1", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s", flexShrink: 0 }}>
                    <ChevronDown size={18} />
                  </div>
                </div>

                {isOpen && (
                  <div style={{ padding: "0 1.5rem 1.5rem", borderTop: `1px solid ${phase.color}18` }}>
                    <div style={{ marginTop: "1.25rem", marginBottom: "1.5rem" }}>
                      <div className="section-tag" style={{ marginBottom: "0.75rem" }}>What You'll Learn</div>
                      {phase.skills.map((skill: Skill, j: number) => (
                        <div key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "11px 0", borderBottom: "1px solid #f1f5f9" }}>
                          <div style={{ width: 7, height: 7, borderRadius: "50%", background: phase.color, flexShrink: 0, marginTop: 7 }} />
                          <div style={{ flex: 1 }}>
                            <div className="sans" style={{ fontWeight: 700, color: "#0d1117", fontSize: "0.9rem", marginBottom: 3 }}>{skill.name}</div>
                            <div style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.7 }}>{skill.desc}</div>
                          </div>
                          <div className="sans" style={{ fontSize: "0.7rem", color: phase.color, fontWeight: 700, background: phase.bg, padding: "3px 10px", borderRadius: 99, flexShrink: 0, whiteSpace: "nowrap" }}>{skill.time}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginBottom: "1.25rem" }}>
                      <div className="section-tag" style={{ marginBottom: "0.625rem" }}>Best Free Resources</div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {phase.resources.map((r: string, j: number) => (
                          <span key={j} className="resource-pill"><BookOpen size={10} color={phase.color} /> {r}</span>
                        ))}
                      </div>
                    </div>

                    <div style={{ background: phase.bg, border: `1px solid ${phase.border}`, borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "0.875rem", display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <Award size={16} color={phase.color} style={{ flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <div className="sans" style={{ fontSize: "0.68rem", fontWeight: 800, color: phase.color, letterSpacing: "0.08em", marginBottom: 3 }}>PHASE MILESTONE</div>
                        <div className="sans" style={{ fontSize: "0.875rem", color: "#334155", fontWeight: 600, lineHeight: 1.5 }}>{phase.milestone}</div>
                      </div>
                    </div>

                    <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: "1rem 1.25rem", display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <Zap size={14} color="#d97706" style={{ flexShrink: 0, marginTop: 2 }} />
                      <div style={{ fontSize: "0.875rem", color: "#78350f", lineHeight: 1.7, fontStyle: "italic" }}>"{phase.tip}"</div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* UNFAIR ADVANTAGE */}
      <section style={{ padding: "4.5rem 6%", background: "#fff", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="section-tag" style={{ marginBottom: "1.5rem" }}>Your Unfair Advantage</div>
          <h2 className="sans" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "1.25rem", color: "#0d1117" }}>
            What you bring that a computer science graduate doesn't
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#334155", lineHeight: 1.9, marginBottom: "2rem" }}>
            The technology industry has a persistent blind spot: it overhires people who can code and underhires people who understand users. QA is the discipline that sits directly at that intersection. You are exactly the person this discipline needs — you have just been working in the wrong building.
          </p>
          <div className="adv-grid" style={{ marginBottom: "2rem" }}>
            {advantages.map((item: AdvantageItem, i: number) => (
              <div key={i} className="adv-card">
                <div className="sans" style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0d1117", marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SALARY */}
      <section style={{ padding: "4.5rem 6%", background: "#f8f9ff" }}>
        <div ref={salRef} style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="section-tag" style={{ marginBottom: "0.75rem" }}>Earning Potential</div>
          <h2 className="sans" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "0.5rem", color: "#0d1117" }}>
            What You'll Earn
          </h2>
          <p className="sans" style={{ color: "#94a3b8", marginBottom: "2.5rem", fontSize: "0.9rem" }}>
            QA salaries grow steadily — and accelerate sharply once automation skills are added
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {salaryData.map((s: SalaryRow, i: number) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span className="sans" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#334155" }}>{s.label}</span>
                  <span className="sans" style={{ fontSize: "0.875rem", fontWeight: 800, color: s.color }}>{s.range}</span>
                </div>
                <div style={{ height: 6, background: "#e2e8f0", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: salIn ? `${s.bar}%` : "0%", background: s.color, borderRadius: 99, transition: `width 1.2s ease ${i * 0.15}s` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ padding: "4.5rem 6%", background: "#fff", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="section-tag" style={{ marginBottom: "1.5rem" }}>A Final Word</div>
          <h2 className="sans" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "1.25rem", color: "#0d1117" }}>
            The person who finds the bug is just as valuable as the person who wrote the code.
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#334155", lineHeight: 1.9, marginBottom: "1.25rem" }}>
            There is a persistent myth in technology that the only people worth paying well are the ones writing code. That myth exists because the industry forgets what happens when QA isn't there. Products ship with broken checkout flows. Authentication systems lock out real users. Buttons that do the opposite of what they label. Every one of those bugs generates a call to someone exactly like you.
          </p>
          <p style={{ fontSize: "1.05rem", color: "#334155", lineHeight: 1.9, marginBottom: "1.25rem" }}>
            With this roadmap, you can be the person who prevents that call from ever happening. You become the last line of defence before the user — the person whose systematic curiosity protects the product, the team's reputation, and every user who would otherwise have hit that bug on a Tuesday morning.
          </p>
          <div className="data-quote">
            That is not a small thing. That is protecting the experience of every person who uses the product. That is worth paying for — and the industry is, finally, starting to pay for it properly.
          </div>
          <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <a href="#roadmap" className="cta-btn">
              Start Phase 01 Today <ArrowRight size={16} />
            </a>
            <a href="/roadmaps" className="sans" style={{ fontSize: "0.9rem", fontWeight: 600, color: "#94a3b8", textDecoration: "none" }}>
              ← Browse All Paths
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}