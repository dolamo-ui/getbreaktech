import React, { useState, useEffect, useRef } from "react"
import { ArrowRight, ChevronDown, Clock, DollarSign, TrendingUp, Users, BookOpen, Award, Zap, CheckCircle2, Bug, TestTube2, Search, ClipboardList, MessageSquare, BarChart2, Layers, Rocket } from "lucide-react"

function useInView(): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

const phases = [
  {
    number: "01",
    title: "Understand What QA Actually Is",
    duration: "Weeks 1–3",
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
    icon: Search,
    tagline: "Spoiler: you already do half of this job",
    skills: [
      { name: "The QA Mindset", desc: "Learn to think adversarially — your job is to break things before users do. Sound familiar? In call centers, you spent every day handling what broke.", time: "3 days" },
      { name: "Software Testing Basics", desc: "Functional, regression, smoke, sanity, exploratory testing — the vocabulary of QA explained simply.", time: "1 week" },
      { name: "Bug Lifecycle & Reporting", desc: "How bugs are found, documented, tracked, and verified. JIRA, Linear, Trello — the tools teams use.", time: "1 week" },
      { name: "How Software Gets Built", desc: "Agile, sprints, standups — understand the development process so you know where QA fits.", time: "4 days" },
    ],
    resources: ["ISTQB Foundation Syllabus (free PDF)", "Ministry of Testing (free content)", "Software Testing Help (free blog)"],
    milestone: "Write 10 detailed bug reports for any app you use daily — be brutally specific",
    tip: "Every escalation you handled was a bug report in disguise. You described the problem, the steps to reproduce it, and what the customer expected instead. That's exactly what QA testers write every single day.",
  },
  {
    number: "02",
    title: "Learn Manual Testing Deeply",
    duration: "Weeks 4–10",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    icon: ClipboardList,
    tagline: "The foundation every great tester builds on",
    skills: [
      { name: "Writing Test Cases", desc: "Test case IDs, preconditions, steps, expected results — structured and reproducible. This is how QA teams work.", time: "1.5 weeks" },
      { name: "Test Plans & Test Strategies", desc: "How to plan what to test, in what order, with what priority. Scope, schedule, risk assessment.", time: "1 week" },
      { name: "Equivalence Partitioning & Boundary Testing", desc: "Smart test design techniques to catch bugs with fewer tests. Work smarter, not just harder.", time: "1 week" },
      { name: "Exploratory Testing", desc: "Unscripted testing guided by experience and intuition — the most creative, human part of QA.", time: "1 week" },
    ],
    resources: ["ISTQB FL Study Guide (free PDFs)", "Guru99 Testing Tutorials (free)", "Test Rails Blog (free)"],
    milestone: "Write a complete test plan for a free app like Todoist or Notion — 30+ test cases",
    tip: "Manual testing is the heart of QA. Automation is a tool — judgment is the skill. Your years of noticing when things feel wrong give you better judgment than most fresh CS graduates.",
  },
  {
    number: "03",
    title: "Pick Up Tools of the Trade",
    duration: "Weeks 11–18",
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    icon: TestTube2,
    tagline: "Learn the platforms that run QA teams",
    skills: [
      { name: "JIRA for QA", desc: "Create and manage bugs, link to test cases, track sprints. The #1 tool in every job listing.", time: "1 week" },
      { name: "Postman — API Testing Basics", desc: "Test what the user never sees. Send requests, check responses, verify data — no code required.", time: "2 weeks" },
      { name: "TestRail or Zephyr", desc: "Professional test management platforms — create test suites, track runs, report coverage.", time: "1 week" },
      { name: "Basic SQL for Testers", desc: "SELECT queries to verify data in databases. You don't need to be a developer — you just need to check the data.", time: "2 weeks" },
    ],
    resources: ["Postman Learning Center (free)", "SQL Zoo (free)", "JIRA Free Tier (free)"],
    milestone: "Test a public API (OpenWeather, Pokémon API) — document 15 test cases with results",
    tip: "API testing feels intimidating until you realise it's just asking a server questions and checking if it answers correctly. You already know how to ask the right questions and how to spot a wrong answer.",
  },
  {
    number: "04",
    title: "Introduction to Test Automation",
    duration: "Weeks 19–28",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
    icon: Bug,
    tagline: "You don't need to be a developer to automate tests",
    skills: [
      { name: "Python Basics for Testers", desc: "Variables, loops, functions — just enough Python to write test scripts. Not a full programming course, just what QA needs.", time: "3 weeks" },
      { name: "Selenium WebDriver", desc: "Automate browser actions — click buttons, fill forms, verify page content. The industry standard for UI automation.", time: "2 weeks" },
      { name: "Pytest Framework", desc: "Structure and run your automated tests. Write assertions that check what the software actually does.", time: "1.5 weeks" },
      { name: "Page Object Model", desc: "Design pattern that makes test code maintainable. Your scripts stop being fragile and start being professional.", time: "1 week" },
    ],
    resources: ["Automate the Boring Stuff Python (free online)", "Selenium Documentation (free)", "Test Automation University (free)"],
    milestone: "Automate 5 end-to-end tests for a website like Wikipedia or a demo app",
    tip: "You don't need to become a programmer. You need to become fluent enough to automate repetitive test tasks. Think of it as creating macros for testing — you're teaching the computer to do the boring part so you can focus on the clever part.",
  },
  {
    number: "05",
    title: "Build Your QA Portfolio",
    duration: "Weeks 29–36",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
    icon: BarChart2,
    tagline: "Show your work — make employers find you irresistible",
    skills: [
      { name: "Test a Real Open Source App", desc: "Find a free/open-source app on GitHub and create a full test suite for it. This is your portfolio's centrepiece.", time: "2 weeks" },
      { name: "GitHub Profile for Testers", desc: "Public repositories with your test scripts, README files, documented bug reports. Employers look here first.", time: "1 week" },
      { name: "Bug Report Portfolio", desc: "A document or website showing your 10 best bug reports — detailed, professional, clear. This is often more impressive than code.", time: "1 week" },
      { name: "LinkedIn & Resume QA Framing", desc: "Frame your call centre experience in QA language — verification, escalation, issue reproduction, resolution tracking.", time: "4 days" },
    ],
    resources: ["GitHub (free)", "Notion Portfolio Templates (free)", "Canva Resume Builder (free)"],
    milestone: "Public GitHub repo with 20+ automated tests + a professional bug report document",
    tip: "Your call center experience is not a gap in your resume — it's a feature. You have real-world evidence of finding problems, documenting them clearly, and following them to resolution. That is QA.",
  },
  {
    number: "06",
    title: "Land Your First QA Role",
    duration: "Weeks 37–48",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    icon: Rocket,
    tagline: "The right role is closer than you think",
    skills: [
      { name: "Interview Prep: QA Questions", desc: "Testing fundamentals, SDLC, how to write test cases, prioritising bugs — the standard interview set.", time: "2 weeks" },
      { name: "Target Startups & Mid-Size Companies", desc: "Smaller companies need generalist manual testers first. This is where most QA careers begin — not big tech.", time: "Ongoing" },
      { name: "Contract & Freelance Testing", desc: "Platforms like uTest and Testlio let you get paid to test real apps while you job search. Build experience and income simultaneously.", time: "Ongoing" },
      { name: "ISTQB Foundation Certificate", desc: "Optional but respected. Many employers still list it as preferred — it validates your knowledge to hiring managers.", time: "2 weeks" },
    ],
    resources: ["uTest (paid testing gigs)", "Testlio (freelance QA)", "ISTQB.org (official study guides free)"],
    milestone: "Your first QA role — the moment your call center experience becomes a superpower",
    tip: "Apply early and apply widely. QA roles have lower competition than developer roles. A strong portfolio and clear communication skills — both of which you already have — will set you apart from candidates who only have technical skills.",
  },
]

const salaryData = [
  { label: "Junior QA Analyst (0–2 yrs)", range: "$45K–$65K", bar: 38, color: "#2563eb" },
  { label: "QA Engineer (2–4 yrs)", range: "$65K–$90K", bar: 58, color: "#7c3aed" },
  { label: "Senior QA / Automation (4–7 yrs)", range: "$90K–$130K", bar: 80, color: "#059669" },
  { label: "QA Lead / Manager", range: "$120K–$180K+", bar: 100, color: "#d97706" },
]

export default function QATesterRoadmapPage() {
  const [openPhase, setOpenPhase] = useState<number | null>(0)
  const [heroRef, heroIn] = useInView()
  const [salRef, salIn] = useInView()
  const [storyRef, storyIn] = useInView()

  return (
    <div style={{ fontFamily: "'Lora', Georgia, serif", background: "#ffffff", color: "#111827", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes barFill{from{width:0}}
        .fade{animation:fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both}
        body{font-family:'Lora',Georgia,serif}
        .sans{font-family:'DM Sans',system-ui,sans-serif}
        .phase-card{background:#fff;border:1.5px solid #e5e7eb;border-radius:16px;overflow:hidden;transition:all 0.3s ease;cursor:pointer;margin-bottom:12px}
        .phase-card:hover{border-color:#93c5fd;box-shadow:0 4px 24px rgba(37,99,235,0.08)}
        .resource-pill{display:inline-flex;align-items:center;gap:5px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:99px;padding:4px 12px;font-size:12px;color:#6b7280;font-weight:600;font-family:'DM Sans',sans-serif}
        .cta-btn{display:inline-flex;align-items:center;gap:8px;background:#2563eb;color:#fff;padding:0.875rem 2rem;border-radius:10px;font-size:0.95rem;font-weight:700;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;text-decoration:none;transition:all 0.25s;letter-spacing:-0.01em}
        .cta-btn:hover{background:#1d4ed8;transform:translateY(-2px);box-shadow:0 8px 24px rgba(37,99,235,0.3)}
        .back-btn{display:inline-flex;align-items:center;gap:8px;color:#9ca3af;font-size:14px;font-weight:600;text-decoration:none;margin-bottom:2rem;transition:color 0.2s;background:none;border:none;cursor:pointer;padding:0;font-family:'DM Sans',sans-serif}
        .back-btn:hover{color:#2563eb}
        .story-block{background:#f8faff;border-left:3px solid #2563eb;padding:1.5rem 2rem;border-radius:0 12px 12px 0;margin:2.5rem 0;font-style:italic;color:#374151;font-size:1.05rem;line-height:1.8}
        .callout{background:#fefce8;border:1px solid #fde68a;border-radius:12px;padding:1.25rem 1.5rem;margin:2rem 0;font-family:'DM Sans',sans-serif;font-size:0.9rem;color:#78350f;line-height:1.6}
        .stat-pill{display:inline-flex;flex-direction:column;align-items:center;background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:14px;padding:1.25rem 1.5rem;min-width:120px;text-align:center;transition:all 0.25s}
        .stat-pill:hover{border-color:#2563eb;background:#eff6ff}
        .section-label{font-family:'DM Sans',sans-serif;font-size:0.7rem;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#9ca3af;margin-bottom:0.625rem}
        @media(max-width:640px){.stats-row{flex-direction:column!important}.hero-pad{padding:3rem 5% 2.5rem!important}}
      `}</style>

      {/* TOP BAR */}
      <div style={{ height: 3, background: "linear-gradient(90deg, #2563eb, #7c3aed, #059669)" }} />

      {/* HERO */}
      <section className="hero-pad" style={{ background: "#fff", padding: "4rem 6% 3rem", borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <button className="back-btn sans" onClick={() => window.history.back()}>← Back to Career Paths</button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2563eb", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
            <span className="sans section-label">Career Transition Guide</span>
          </div>

          <h1 ref={heroRef} className={`${heroIn ? "fade" : ""} sans`} style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "1.5rem", color: "#0f172a", fontFamily: "'DM Sans', sans-serif" }}>
            From Call Center Agent<br />to QA Tester
          </h1>

          <p style={{ fontSize: "1.2rem", color: "#374151", lineHeight: 1.8, marginBottom: "2rem", fontFamily: "'Lora', serif", fontStyle: "italic" }}>
            You've spent years being the person who notices when something goes wrong. Now, let's turn that into a career.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: "2.5rem", alignItems: "center" }}>
            <a href="#roadmap" className="cta-btn">Start Reading the Roadmap <ArrowRight size={16} /></a>
            <span className="sans" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#9ca3af", fontWeight: 600 }}>
              <Clock size={13} color="#2563eb" /> ~11 months part-time
            </span>
          </div>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }} className="stats-row">
            {[
              { icon: DollarSign, val: "$58K", label: "Avg. Starting Salary", color: "#2563eb" },
              { icon: TrendingUp, val: "+22%", label: "Job Growth (10yr)", color: "#7c3aed" },
              { icon: Users, val: "Low", label: "Competition vs Dev Roles", color: "#059669" },
              { icon: Clock, val: "11mo", label: "Avg. Time to Hire", color: "#d97706" },
            ].map((s, i) => (
              <div key={i} className="stat-pill">
                <s.icon size={18} color={s.color} style={{ marginBottom: 6 }} />
                <div className="sans" style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>{s.val}</div>
                <div className="sans" style={{ fontSize: "0.68rem", color: "#9ca3af", marginTop: 4, fontWeight: 600, letterSpacing: "0.04em", textAlign: "center" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section ref={storyRef} style={{ padding: "4rem 6%", background: "#fff", borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div className="section-label sans" style={{ marginBottom: "1.5rem" }}>Before We Begin</div>

          <h2 className="sans" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: "1.5rem", lineHeight: 1.25, color: "#0f172a" }}>
            You already think like a QA tester. You just don't know it yet.
          </h2>

          <p style={{ fontSize: "1.05rem", color: "#374151", lineHeight: 1.9, marginBottom: "1.25rem" }}>
            Think about a typical day at the call center. A customer calls and says: "I tried to click the button three times and nothing happened." You ask: "What browser are you using? What were you doing before that? Did you get an error message?" Without realising it, you were gathering reproduction steps for a bug report.
          </p>

          <div className="story-block">
            "The best bug report I ever read was written by someone who came from customer support. She didn't know any code, but she described the issue so precisely — every step, every condition — that our dev fixed it in 20 minutes. Most of our engineers can't write like that."
            <div className="sans" style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "#6b7280", fontStyle: "normal", fontWeight: 600 }}>— Engineering Manager at a SaaS startup</div>
          </div>

          <p style={{ fontSize: "1.05rem", color: "#374151", lineHeight: 1.9, marginBottom: "1.25rem" }}>
            Quality Assurance is, at its core, about asking: "What could go wrong here?" and then systematically checking every answer. It's about being the voice of the user before the user even touches the product. Sound familiar?
          </p>

          <p style={{ fontSize: "1.05rem", color: "#374151", lineHeight: 1.9, marginBottom: "1.5rem" }}>
            Call center agents are already QA testers who get paid less. The roadmap below is simply the bridge — giving you the vocabulary, the tools, and the formal skills to walk into a tech company and get paid what your skills are worth.
          </p>

          <div className="callout">
            <strong>The honest truth:</strong> QA is one of the most accessible entry points into tech. It requires no computer science degree, no advanced math, and no years of coding experience. It requires precision, patience, curiosity, and empathy — skills you have in abundance.
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" style={{ padding: "4rem 6%", background: "#f9fafb" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="section-label sans" style={{ marginBottom: "0.75rem" }}>The Roadmap</div>
          <h2 className="sans" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: "0.625rem", color: "#0f172a" }}>Your 6-Phase Journey</h2>
          <p style={{ color: "#6b7280", marginBottom: "2.5rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem" }}>Click each phase to read the full breakdown</p>

          <div>
            {phases.map((phase, i) => {
              const Icon = phase.icon
              const isOpen = openPhase === i
              return (
                <div key={i} className="phase-card" style={{ borderColor: isOpen ? phase.color + "50" : "#e5e7eb" }} onClick={() => setOpenPhase(isOpen ? null : i)}>
                  <div style={{ padding: "1.375rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: phase.bg, border: `1.5px solid ${phase.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={20} color={phase.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                        <span className="sans" style={{ fontSize: "0.68rem", fontWeight: 800, color: phase.color, letterSpacing: "0.1em" }}>PHASE {phase.number}</span>
                        <span className="sans" style={{ fontSize: "0.7rem", color: "#9ca3af", background: "#f3f4f6", padding: "2px 8px", borderRadius: 99, fontWeight: 600 }}>{phase.duration}</span>
                      </div>
                      <h3 className="sans" style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.25 }}>{phase.title}</h3>
                      <p className="sans" style={{ fontSize: "0.8rem", color: "#9ca3af", marginTop: 2 }}>{phase.tagline}</p>
                    </div>
                    <div style={{ color: "#d1d5db", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s", flexShrink: 0 }}>
                      <ChevronDown size={18} />
                    </div>
                  </div>

                  {isOpen && (
                    <div style={{ padding: "0 1.5rem 1.5rem", borderTop: `1px solid ${phase.color}20` }}>
                      <div style={{ marginTop: "1.25rem", marginBottom: "1.5rem" }}>
                        <div className="section-label" style={{ marginBottom: "0.75rem" }}>What You'll Learn</div>
                        {phase.skills.map((skill, j) => (
                          <div key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "11px 0", borderBottom: "1px solid #f3f4f6" }}>
                            <div style={{ width: 7, height: 7, borderRadius: "50%", background: phase.color, flexShrink: 0, marginTop: 7 }} />
                            <div style={{ flex: 1 }}>
                              <div className="sans" style={{ fontWeight: 700, color: "#111827", fontSize: "0.9rem", marginBottom: 3 }}>{skill.name}</div>
                              <div style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.65, fontFamily: "'Lora', serif" }}>{skill.desc}</div>
                            </div>
                            <div className="sans" style={{ fontSize: "0.7rem", color: phase.color, fontWeight: 700, background: phase.bg, padding: "3px 10px", borderRadius: 99, flexShrink: 0, whiteSpace: "nowrap" }}>{skill.time}</div>
                          </div>
                        ))}
                      </div>

                      <div style={{ marginBottom: "1.25rem" }}>
                        <div className="section-label" style={{ marginBottom: "0.625rem" }}>Best Free Resources</div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {phase.resources.map((r, j) => (
                            <span key={j} className="resource-pill"><BookOpen size={10} color={phase.color} /> {r}</span>
                          ))}
                        </div>
                      </div>

                      <div style={{ background: phase.bg, border: `1px solid ${phase.border}`, borderRadius: 10, padding: "1rem 1.25rem", marginBottom: "0.875rem", display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <Award size={16} color={phase.color} style={{ flexShrink: 0, marginTop: 2 }} />
                        <div>
                          <div className="sans" style={{ fontSize: "0.68rem", fontWeight: 800, color: phase.color, letterSpacing: "0.08em", marginBottom: 3 }}>PHASE MILESTONE</div>
                          <div className="sans" style={{ fontSize: "0.875rem", color: "#374151", fontWeight: 600, lineHeight: 1.5 }}>{phase.milestone}</div>
                        </div>
                      </div>

                      <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "1rem 1.25rem", display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <Zap size={14} color: "#d97706" style={{ flexShrink: 0, marginTop: 2 }} />
                        <div style={{ fontSize: "0.875rem", color: "#78350f", lineHeight: 1.7, fontFamily: "'Lora', serif", fontStyle: "italic" }}>"{phase.tip}"</div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* WHAT SETS YOU APART */}
      <section style={{ padding: "4rem 6%", background: "#fff", borderTop: "1px solid #f3f4f6", borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div className="section-label sans" style={{ marginBottom: "1.5rem" }}>Your Unfair Advantage</div>
          <h2 className="sans" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: "1.5rem", color: "#0f172a" }}>
            What you bring that a CS graduate doesn't
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#374151", lineHeight: 1.9, marginBottom: "1.5rem" }}>
            The tech industry has a persistent blind spot: it overhires people who can code and underhires people who understand users. You are that underutilised asset.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: "2rem" }}>
            {[
              { title: "You Communicate Clearly", desc: "Bug reports require precision and clarity. Years of written summaries and escalation notes have already trained you for this." },
              { title: "You Know How Users Think", desc: "You've spoken to thousands of frustrated users. You understand exactly how people use software — and misuse it." },
              { title: "You Work Under Pressure", desc: "Call center work is relentlessly demanding. A QA sprint deadline is manageable by comparison." },
              { title: "You're Methodical By Nature", desc: "Verification, troubleshooting steps, following scripts — QA is structured thinking, and you've been doing structured thinking for years." },
            ].map((item, i) => (
              <div key={i} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1.25rem" }}>
                <div className="sans" style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.65, fontFamily: "'Lora', serif" }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SALARY */}
      <section style={{ padding: "4rem 6%", background: "#f9fafb" }}>
        <div ref={salRef} style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="section-label sans" style={{ marginBottom: "0.75rem" }}>Earning Potential</div>
          <h2 className="sans" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: "0.5rem", color: "#0f172a" }}>What You'll Earn</h2>
          <p className="sans" style={{ color: "#9ca3af", marginBottom: "2.5rem", fontSize: "0.9rem" }}>QA salaries grow steadily with automation skills</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {salaryData.map((s, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span className="sans" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#374151" }}>{s.label}</span>
                  <span className="sans" style={{ fontSize: "0.875rem", fontWeight: 800, color: s.color }}>{s.range}</span>
                </div>
                <div style={{ height: 6, background: "#e5e7eb", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: salIn ? `${s.bar}%` : "0%", background: s.color, borderRadius: 99, transition: `width 1.2s ease ${i * 0.15}s` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING STORY */}
      <section style={{ padding: "4rem 6%", background: "#fff", borderTop: "1px solid #f3f4f6" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="section-label sans" style={{ marginBottom: "1.5rem" }}>A Final Word</div>
          <h2 className="sans" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: "1.25rem", color: "#0f172a" }}>
            The person who finds the bug is just as valuable as the person who writes the code
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#374151", lineHeight: 1.9, marginBottom: "1.25rem" }}>
            There's a persistent myth in tech that the only people worth paying well are the ones writing code. That myth exists because the industry forgets what happens when QA isn't there. Products ship with broken checkout flows. Apps crash on the most common phone. Buttons that do the opposite of what they say they do.
          </p>
          <p style={{ fontSize: "1.05rem", color: "#374151", lineHeight: 1.9, marginBottom: "1.25rem" }}>
            Every time that happens, a call center agent answers the phone and explains what went wrong. With this roadmap, you can be the person who prevents that call from ever happening.
          </p>
          <div className="story-block">
            That's not a small thing. That's protecting the reputation of the product, the time of the engineers, and the trust of every user who would have encountered that bug. That is worth paying for.
          </div>
          <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <a href="#roadmap" className="cta-btn">Start Phase 01 Today <ArrowRight size={16} /></a>
            <a href="/roadmaps" className="sans" style={{ fontSize: "0.9rem", fontWeight: 600, color: "#6b7280", textDecoration: "none" }}>← Browse All Paths</a>
          </div>
        </div>
      </section>

    </div>
  )
}