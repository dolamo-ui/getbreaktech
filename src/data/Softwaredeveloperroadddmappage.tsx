import React, { useState, useEffect, useRef } from "react"
import { ArrowRight, Code2, Database, Server, Package, ChevronDown, Clock, TrendingUp, DollarSign, BookOpen, Award, Zap, Heart, Layers } from "lucide-react"

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
    title: "Python Fundamentals",
    duration: "Weeks 1–8",
    color: "#f472b6",
    bg: "#fdf2f8",
    border: "#fbcfe8",
    icon: Code2,
    tagline: "The most beginner-friendly language in the world",
    skills: [
      { name: "Python Basics", desc: "Variables, data types, conditionals, loops — think in code for the first time", time: "2 weeks" },
      { name: "Functions & Modules", desc: "Reusable code blocks, imports, organizing logic into clean units", time: "1.5 weeks" },
      { name: "Data Structures", desc: "Lists, dicts, sets, tuples — how to store and organize data", time: "1.5 weeks" },
      { name: "OOP Basics", desc: "Classes, objects, inheritance — the way modern apps are structured", time: "2 weeks" },
    ],
    resources: ["Python.org Docs (free)", "Automate the Boring Stuff (free online)", "CS50P Harvard (free)"],
    milestone: "Build a command-line app that solves a real problem you faced in customer service",
    tip: "Customer service taught you patience and breaking problems down for users. That IS programming. You already think like a developer.",
  },
  {
    number: "02",
    title: "Web Development Basics",
    duration: "Weeks 9–16",
    color: "#a78bfa",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    icon: Layers,
    tagline: "Understand the full web stack",
    skills: [
      { name: "HTML & CSS Essentials", desc: "Structure and style web pages — the frontend foundation every developer needs", time: "1.5 weeks" },
      { name: "JavaScript Fundamentals", desc: "DOM, events, fetch API — make pages interactive and dynamic", time: "2 weeks" },
      { name: "How the Web Works", desc: "HTTP, DNS, servers, browsers, APIs — understand the full picture", time: "1 week" },
      { name: "Git & Version Control", desc: "Branches, commits, pull requests — how real teams collaborate", time: "1 week" },
    ],
    resources: ["MDN Web Docs (free)", "The Odin Project (free)", "CS50W Harvard (free)"],
    milestone: "Build a personal website that tells your story from customer service to developer",
    tip: "The web is the most accessible platform on earth. Everything you learn here is immediately deployable and shareable.",
  },
  {
    number: "03",
    title: "Backend Development with Python",
    duration: "Weeks 17–26",
    color: "#34d399",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    icon: Server,
    tagline: "Build the engine under the hood",
    skills: [
      { name: "Django or Flask", desc: "Build real web applications with Python — APIs, routing, templates", time: "3 weeks" },
      { name: "REST APIs", desc: "JSON, HTTP methods, request/response cycles, authentication", time: "2 weeks" },
      { name: "SQL & Databases", desc: "PostgreSQL, SQLite — query, model, and manage data", time: "2 weeks" },
      { name: "Authentication & Auth", desc: "JWT, sessions, OAuth — keep applications secure", time: "1 week" },
    ],
    resources: ["Django Girls Tutorial (free)", "Flask Mega-Tutorial (free)", "SQLBolt (free)"],
    milestone: "Build a full CRUD API with user authentication — deployed to the internet",
    tip: "The gap between front and back is where most developers live. Learn both well and you become rare and extremely hireable.",
  },
  {
    number: "04",
    title: "Data, Testing & Best Practices",
    duration: "Weeks 27–34",
    color: "#fbbf24",
    bg: "#fffbeb",
    border: "#fde68a",
    icon: Database,
    tagline: "Write code that teams actually want",
    skills: [
      { name: "Unit Testing with pytest", desc: "Write tests first, debug with confidence, ship without fear", time: "2 weeks" },
      { name: "SQL Advanced Queries", desc: "JOINs, aggregations, indexes — query complex data like a pro", time: "1.5 weeks" },
      { name: "Docker Basics", desc: "Containerize apps, understand dev environments, deploy anywhere", time: "1 week" },
      { name: "Clean Code Principles", desc: "Naming, functions, refactoring, documentation — code others love to read", time: "1 week" },
    ],
    resources: ["pytest docs (free)", "Use The Index, Luke (free)", "Docker's Get Started (free)"],
    milestone: "Rewrite a previous project with full test coverage and Docker support",
    tip: "Companies don't just hire for what you know — they hire people whose code they can trust. Tests prove that.",
  },
  {
    number: "05",
    title: "Build Your Portfolio Projects",
    duration: "Weeks 35–42",
    color: "#f97316",
    bg: "#fff7ed",
    border: "#fed7aa",
    icon: Package,
    tagline: "Real projects, real problems, real solutions",
    skills: [
      { name: "Full-Stack App #1", desc: "Idea inspired by a customer service problem you actually experienced", time: "2 weeks" },
      { name: "Full-Stack App #2", desc: "A tool that automates or improves something from your old job", time: "2 weeks" },
      { name: "Open Source Contribution", desc: "Fix a bug or add a feature to an existing GitHub project", time: "1 week" },
      { name: "Deploy Everything", desc: "Railway, Render, or Heroku — live apps with real URLs", time: "3 days" },
    ],
    resources: ["Railway (free tier)", "Render (free tier)", "GitHub (free)"],
    milestone: "2 live full-stack apps + 1 open source contribution on your GitHub profile",
    tip: "The best portfolio projects come from your own life. Your customer service background gives you unique ideas nobody else has.",
  },
  {
    number: "06",
    title: "Land Your First Dev Role",
    duration: "Weeks 43–52",
    color: "#ec4899",
    bg: "#fdf2f8",
    border: "#fbcfe8",
    icon: Heart,
    tagline: "Your empathy is your superpower in interviews",
    skills: [
      { name: "Technical Interview Prep", desc: "Data structures basics, Python problem solving, explain your projects clearly", time: "2 weeks" },
      { name: "Resume & LinkedIn", desc: "Lead with projects, frame customer service as communication + empathy + product sense", time: "1 week" },
      { name: "LeetCode Easy Problems", desc: "Arrays, strings, hash maps — enough to pass screening rounds", time: "2 weeks" },
      { name: "Behavioral Interviews", desc: "STAR format — your customer stories are compelling interview gold", time: "1 week" },
    ],
    resources: ["Neetcode (free)", "Pramp (free mock interviews)", "Tech Interview Handbook (free)"],
    milestone: "First software developer job offer — the role that changes everything.",
    tip: "Your customer service background makes you exceptional at behavioral interviews. Every interviewer wants someone who can talk to users. That's you.",
  },
]

const salaryData = [
  { label: "Junior Dev (0–2 yrs)", range: "$60K–$90K", bar: 42, color: "#f472b6" },
  { label: "Mid-Level Dev (2–5 yrs)", range: "$90K–$140K", bar: 68, color: "#a78bfa" },
  { label: "Senior Dev (5+ yrs)", range: "$140K–$200K", bar: 88, color: "#34d399" },
  { label: "Staff / Principal", range: "$180K–$300K+", bar: 100, color: "#fbbf24" },
]

export default function SoftwareDeveloperRoadmapPage() {
  const [openPhase, setOpenPhase] = useState<number | null>(0)
  const [heroRef, heroIn] = useInView()
  const [salRef, salIn] = useInView()

  return (
    <div style={{ fontFamily: "'Outfit', system-ui, sans-serif", background: "#fafafa", color: "#0a0a0a", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        .fade{animation:fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both}
        .phase-card{background:#fff;border:1.5px solid #f0f0f0;border-radius:20px;overflow:hidden;transition:all 0.3s;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.04)}
        .phase-card:hover{box-shadow:0 8px 32px rgba(0,0,0,0.08);transform:translateY(-2px)}
        .stat-box{background:#fff;border:1.5px solid #f0f0f0;border-radius:16px;padding:1.5rem;text-align:center;transition:all 0.3s;box-shadow:0 2px 8px rgba(0,0,0,0.04)}
        .stat-box:hover{box-shadow:0 8px 24px rgba(0,0,0,0.08);transform:translateY(-3px)}
        .resource-pill{display:inline-flex;align-items:center;gap:6px;background:#f8f8f8;border:1px solid #eee;border-radius:99px;padding:4px 12px;font-size:12px;color:#888;font-weight:600}
        .back-btn{display:inline-flex;align-items:center;gap:8px;color:#aaa;font-size:14px;font-weight:600;text-decoration:none;margin-bottom:2rem;transition:color 0.2s;background:none;border:none;cursor:pointer;padding:0;font-family:inherit}
        .back-btn:hover{color:#f472b6}
        .cta-btn{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#f472b6,#a78bfa);color:#fff;padding:1rem 2rem;border-radius:14px;font-size:1rem;font-weight:800;border:none;cursor:pointer;font-family:inherit;text-decoration:none;transition:all 0.3s}
        .cta-btn:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(244,114,182,0.4)}
      `}</style>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #fff 0%, #fdf2f8 50%, #f5f3ff 100%)", padding: "5rem 5% 4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #f472b6, #a78bfa, #34d399, #fbbf24)" }} />
        <div style={{ position: "absolute", top: "10%", right: "0%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.12), transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(244,114,182,0.1), transparent 60%)", pointerEvents: "none" }} />

        <div ref={heroRef} style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <button className="back-btn" onClick={() => window.history.back()}>← Back to Roadmaps</button>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(244,114,182,0.1)", border: "1px solid rgba(244,114,182,0.3)", color: "#ec4899", fontSize: "0.72rem", fontWeight: 700, padding: "0.4rem 1rem", borderRadius: 30, marginBottom: "1.5rem", letterSpacing: "0.1em" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ec4899", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
            CAREER TRANSITION ROADMAP
          </div>

          <h1 className={heroIn ? "fade" : ""} style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "1.25rem", color: "#0a0a0a" }}>
            Customer Service →{" "}
            <span style={{ background: "linear-gradient(90deg, #f472b6, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Software Developer</span>
          </h1>

          <p className={heroIn ? "fade" : ""} style={{ fontSize: "1.15rem", color: "#64748b", lineHeight: 1.75, maxWidth: 620, marginBottom: "2.5rem", animationDelay: "0.1s" }}>
            Empathy isn't soft skill fluff — it's the most underrated superpower in software development. The best products are built by people who deeply understand users. That's been your job your entire career.
          </p>

          <div className={heroIn ? "fade" : ""} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem", animationDelay: "0.2s" }}>
            <a href="#roadmap" className="cta-btn">Start the Roadmap <ArrowRight size={18} /></a>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: 14 }}>
              <Clock size={14} color="#f472b6" /> ~12 months part-time
            </div>
          </div>

          <div className={heroIn ? "fade" : ""} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", animationDelay: "0.3s" }}>
            {[
              { icon: DollarSign, val: "$72K", label: "Avg. Starting Salary", color: "#f472b6" },
              { icon: TrendingUp, val: "+25%", label: "Job Growth (10yr)", color: "#a78bfa" },
              { icon: Heart, val: "Top 3", label: "Most Satisfying Careers", color: "#34d399" },
              { icon: Clock, val: "12mo", label: "Avg. Time to Hire", color: "#fbbf24" },
            ].map((s, i) => (
              <div key={i} className="stat-box">
                <s.icon size={20} color={s.color} style={{ marginBottom: 8 }} />
                <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0a0a0a", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: 4, fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHASES */}
      <section id="roadmap" style={{ padding: "5rem 5%", background: "#fafafa" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "0.5rem", textAlign: "center" }}>Your 6-Phase Journey</h2>
          <p style={{ color: "#94a3b8", marginBottom: "3rem", textAlign: "center" }}>Click each phase to expand</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {phases.map((phase, i) => {
              const Icon = phase.icon
              const isOpen = openPhase === i
              return (
                <div key={i} className="phase-card" style={{ borderColor: isOpen ? phase.color + "60" : "#f0f0f0" }} onClick={() => setOpenPhase(isOpen ? null : i)}>
                  <div style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: phase.bg, border: `1.5px solid ${phase.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={22} color={phase.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: 800, color: phase.color, letterSpacing: "0.1em" }}>PHASE {phase.number}</span>
                        <span style={{ fontSize: "0.72rem", color: "#94a3b8", background: "#f8f8f8", padding: "2px 10px", borderRadius: 99, fontWeight: 600 }}>{phase.duration}</span>
                      </div>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0a0a0a", lineHeight: 1.2 }}>{phase.title}</h3>
                      <p style={{ fontSize: "0.82rem", color: "#94a3b8", marginTop: 2 }}>{phase.tagline}</p>
                    </div>
                    <div style={{ color: "#d1d5db", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
                      <ChevronDown size={20} />
                    </div>
                  </div>

                  {isOpen && (
                    <div style={{ padding: "0 1.5rem 1.5rem", borderTop: `1px solid ${phase.color}20` }}>
                      <div style={{ marginTop: "1.25rem", marginBottom: "1.5rem" }}>
                        <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>WHAT YOU'LL LEARN</div>
                        {phase.skills.map((skill, j) => (
                          <div key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 0", borderBottom: "1px solid #f8f8f8" }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: phase.color, flexShrink: 0, marginTop: 6 }} />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 700, color: "#0a0a0a", fontSize: "0.9rem", marginBottom: 2 }}>{skill.name}</div>
                              <div style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.5 }}>{skill.desc}</div>
                            </div>
                            <div style={{ fontSize: "0.72rem", color: phase.color, fontWeight: 700, background: phase.bg, padding: "3px 10px", borderRadius: 99, flexShrink: 0 }}>{skill.time}</div>
                          </div>
                        ))}
                      </div>

                      <div style={{ marginBottom: "1.25rem" }}>
                        <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>BEST RESOURCES</div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {phase.resources.map((r, j) => (
                            <span key={j} className="resource-pill"><BookOpen size={11} color={phase.color} /> {r}</span>
                          ))}
                        </div>
                      </div>

                      <div style={{ background: phase.bg, border: `1.5px solid ${phase.border}`, borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1rem", display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <Award size={18} color={phase.color} style={{ flexShrink: 0, marginTop: 2 }} />
                        <div>
                          <div style={{ fontSize: "0.7rem", fontWeight: 800, color: phase.color, letterSpacing: "0.08em", marginBottom: 4 }}>PHASE MILESTONE</div>
                          <div style={{ fontSize: "0.875rem", color: "#333", fontWeight: 600 }}>{phase.milestone}</div>
                        </div>
                      </div>

                      <div style={{ background: "#f8f8f8", border: "1px solid #f0f0f0", borderRadius: 12, padding: "1rem 1.25rem", display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <Zap size={16} color={phase.color} style={{ flexShrink: 0, marginTop: 2 }} />
                        <div style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.6, fontStyle: "italic" }}>"{phase.tip}"</div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SALARY */}
      <section style={{ padding: "5rem 5%", background: "#fff" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div ref={salRef}>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>What You'll Earn</h2>
            <p style={{ color: "#94a3b8", marginBottom: "2.5rem", fontSize: "0.95rem" }}>Software development rewards consistency over time</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {salaryData.map((s, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#475569" }}>{s.label}</span>
                    <span style={{ fontSize: "0.9rem", fontWeight: 800, color: s.color }}>{s.range}</span>
                  </div>
                  <div style={{ height: 8, background: "#f8f8f8", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: salIn ? `${s.bar}%` : "0%", background: s.color, borderRadius: 99, transition: `width 1s ease ${i * 0.15}s` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 5%", background: "linear-gradient(135deg, #fdf2f8, #f5f3ff)", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem", animation: "float 4s ease-in-out infinite" }}>💜</div>
          <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "1rem" }}>
            Empathy builds<br />better software
          </h2>
          <p style={{ color: "#64748b", lineHeight: 1.7, marginBottom: "2rem", fontSize: "0.95rem" }}>
            The tech industry desperately needs people who understand users — not just code. Your background isn't a liability. It's exactly what the best teams are looking for.
          </p>
          <a href="/roadmaps" className="cta-btn">Browse All Roadmaps <ArrowRight size={18} /></a>
        </div>
      </section>
    </div>
  )
}