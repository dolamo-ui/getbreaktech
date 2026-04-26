import React, { useState, useEffect, useRef } from "react"
import { ArrowRight, CheckCircle2, Clock, Star, Zap, Code2, Palette, Globe, Layers, Monitor, Smartphone, Github, ExternalLink, ChevronDown, TrendingUp, Users, DollarSign, BookOpen, Play, Award, Rocket } from "lucide-react"

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
    title: "Build Your Foundation",
    duration: "Weeks 1–6",
    color: "#f97316",
    bg: "#fff7ed",
    border: "#fed7aa",
    icon: Code2,
    tagline: "From zero to writing real code",
    skills: [
      { name: "HTML5 Semantics", desc: "Structure web pages like a pro — headings, forms, accessibility", time: "1 week" },
      { name: "CSS3 & Flexbox/Grid", desc: "Make things look beautiful and responsive on every screen", time: "2 weeks" },
      { name: "JavaScript Basics", desc: "Variables, functions, loops, DOM manipulation", time: "2 weeks" },
      { name: "Dev Tools & Browser", desc: "Inspect, debug, and understand the browser environment", time: "3 days" },
    ],
    resources: ["freeCodeCamp (free)", "The Odin Project (free)", "CSS Tricks (free)"],
    milestone: "Build a personal landing page with HTML & CSS",
    tip: "Your non-tech background is an asset here — you already know how users think. Lean into that.",
  },
  {
    number: "02",
    title: "Go Interactive with JavaScript",
    duration: "Weeks 7–14",
    color: "#eab308",
    bg: "#fefce8",
    border: "#fef08a",
    icon: Zap,
    tagline: "Make the web come alive",
    skills: [
      { name: "ES6+ Modern JS", desc: "Arrow functions, destructuring, promises, async/await", time: "2 weeks" },
      { name: "DOM Manipulation", desc: "Change pages dynamically, respond to user interactions", time: "1 week" },
      { name: "Fetch API & REST", desc: "Talk to servers, consume APIs, handle JSON data", time: "1 week" },
      { name: "Git & GitHub", desc: "Version control — essential for every developer on earth", time: "1 week" },
    ],
    resources: ["JavaScript.info (free)", "Scrimba JS Course (free tier)", "MDN Web Docs (free)"],
    milestone: "Build a weather app or to-do list that fetches live data",
    tip: "Every error message is a teacher. Google every error — that's what real developers do.",
  },
  {
    number: "03",
    title: "Master React",
    duration: "Weeks 15–24",
    color: "#06b6d4",
    bg: "#ecfeff",
    border: "#a5f3fc",
    icon: Layers,
    tagline: "The most in-demand skill in frontend",
    skills: [
      { name: "React Fundamentals", desc: "Components, props, state, JSX — the React mental model", time: "2 weeks" },
      { name: "React Hooks", desc: "useState, useEffect, useContext — modern React patterns", time: "2 weeks" },
      { name: "React Router", desc: "Multi-page apps, dynamic routes, navigation", time: "1 week" },
      { name: "State Management", desc: "Context API + basic Zustand/Redux concepts", time: "1 week" },
    ],
    resources: ["React docs (free)", "Scrimba React Course", "Jack Herrington YouTube (free)"],
    milestone: "Build a full multi-page React app with routing and state",
    tip: "React is the #1 most requested skill in frontend job listings. This phase unlocks 80% of job opportunities.",
  },
  {
    number: "04",
    title: "Professional Tools & Styling",
    duration: "Weeks 25–30",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    icon: Palette,
    tagline: "Build things that look and feel production-ready",
    skills: [
      { name: "Tailwind CSS", desc: "Utility-first styling — industry standard for modern UIs", time: "1 week" },
      { name: "TypeScript Basics", desc: "Add types to JavaScript — employers love this", time: "2 weeks" },
      { name: "Testing (Jest + RTL)", desc: "Write tests that give you confidence your code works", time: "1 week" },
      { name: "Vite & Build Tools", desc: "Understand bundlers, env variables, deployment pipelines", time: "1 week" },
    ],
    resources: ["Tailwind CSS docs (free)", "Matt Pocock TypeScript (free)", "Testing Library docs"],
    milestone: "Rebuild a previous project using TypeScript + Tailwind",
    tip: "TypeScript on your resume adds ~15% to salary expectations. It's worth the extra week.",
  },
  {
    number: "05",
    title: "Build Your Portfolio",
    duration: "Weeks 31–38",
    color: "#10b981",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    icon: Globe,
    tagline: "Projects that make employers stop scrolling",
    skills: [
      { name: "3 Portfolio Projects", desc: "Real apps that solve real problems — not just tutorials", time: "3 weeks" },
      { name: "Deploy Everything", desc: "Vercel, Netlify — every project live and shareable", time: "3 days" },
      { name: "GitHub Profile", desc: "Green squares, pinned repos, professional README files", time: "3 days" },
      { name: "Portfolio Site", desc: "Your personal brand — make it memorable", time: "1 week" },
    ],
    resources: ["Vercel (free tier)", "GitHub Pages (free)", "readme.so (free)"],
    milestone: "3 deployed projects + a professional portfolio site live on the web",
    tip: "Projects > Certificates. One real deployed app is worth more than 10 Udemy certificates.",
  },
  {
    number: "06",
    title: "Land Your First Role",
    duration: "Weeks 39–48",
    color: "#ec4899",
    bg: "#fdf2f8",
    border: "#fbcfe8",
    icon: Rocket,
    tagline: "The job search is a skill — learn it",
    skills: [
      { name: "Resume & LinkedIn", desc: "Quantify impact, use keywords, get past ATS filters", time: "1 week" },
      { name: "Interview Prep", desc: "JS fundamentals, React patterns, system design basics", time: "2 weeks" },
      { name: "LeetCode Basics", desc: "Arrays, strings, objects — easy/medium problems only", time: "2 weeks" },
      { name: "Networking & Applications", desc: "Apply broadly, follow up, attend local meetups", time: "Ongoing" },
    ],
    resources: ["interviewing.io (free practice)", "Frontend Interview Handbook (free)", "LinkedIn Job Alerts"],
    milestone: "First frontend developer job offer — you made it.",
    tip: "Apply to 5+ jobs per day. Treat the job search like a job. Most people get hired between application 40–80.",
  },
]

const salaryData = [
  { label: "Junior (0–2 yrs)", range: "$55K–$85K", bar: 45, color: "#f97316" },
  { label: "Mid (2–5 yrs)", range: "$85K–$130K", bar: 70, color: "#eab308" },
  { label: "Senior (5+ yrs)", range: "$130K–$200K", bar: 90, color: "#10b981" },
  { label: "Lead / Staff", range: "$160K–$280K+", bar: 100, color: "#8b5cf6" },
]

export default function FrontendDeveloperRoadmapPage() {
  const [openPhase, setOpenPhase] = useState<number | null>(0)
  const [heroRef, heroIn] = useInView()
  const [roadRef, roadIn] = useInView()
  const [salRef, salIn] = useInView()

  return (
    <div style={{ fontFamily: "'Outfit', system-ui, sans-serif", background: "#0a0a0a", color: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes barFill{from{width:0}to{width:var(--w)}}
        .fade{animation:fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both}
        .shimmer{background:linear-gradient(90deg,#f97316,#eab308,#10b981,#06b6d4,#8b5cf6,#f97316);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 5s linear infinite}
        .phase-card{background:#111;border:1.5px solid #222;border-radius:20px;overflow:hidden;transition:all 0.3s ease;cursor:pointer}
        .phase-card:hover{border-color:#333;background:#141414}
        .skill-row{display:flex;gap:12px;align-items:flex-start;padding:12px 0;border-bottom:1px solid #1a1a1a}
        .skill-row:last-child{border-bottom:none}
        .resource-pill{display:inline-flex;align-items:center;gap:6px;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:99px;padding:4px 12px;font-size:12px;color:#aaa;font-weight:600}
        .stat-box{background:#111;border:1.5px solid #1e1e1e;border-radius:16px;padding:1.5rem;text-align:center;transition:all 0.3s}
        .stat-box:hover{border-color:#333;transform:translateY(-3px)}
        .back-btn{display:inline-flex;align-items:center;gap:8px;color:#666;font-size:14px;font-weight:600;text-decoration:none;margin-bottom:2rem;transition:color 0.2s;background:none;border:none;cursor:pointer;padding:0;font-family:inherit}
        .back-btn:hover{color:#f97316}
        .cta-btn{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#f97316,#eab308);color:#000;padding:1rem 2rem;border-radius:14px;font-size:1rem;font-weight:800;border:none;cursor:pointer;font-family:inherit;text-decoration:none;transition:all 0.3s}
        .cta-btn:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(249,115,22,0.4)}
      `}</style>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)", padding: "5rem 5% 4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #f97316, #eab308, #10b981, #06b6d4, #8b5cf6)" }} />
        <div style={{ position: "absolute", top: "20%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.08), transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-10%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,179,8,0.06), transparent 60%)", pointerEvents: "none" }} />

        <div ref={heroRef} style={{ maxWidth: 900, margin: "0 auto" }}>
          <button className="back-btn" onClick={() => window.history.back()}>
            ← Back to Roadmaps
          </button>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)", color: "#f97316", fontSize: "0.72rem", fontWeight: 700, padding: "0.4rem 1rem", borderRadius: 30, marginBottom: "1.5rem", letterSpacing: "0.1em" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f97316", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
            CAREER TRANSITION ROADMAP
          </div>

          <h1 className={heroIn ? "fade" : ""} style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "1.25rem" }}>
            Non-Tech →{" "}
            <span className="shimmer">Frontend Developer</span>
          </h1>

          <p className={heroIn ? "fade" : ""} style={{ fontSize: "1.15rem", color: "#888", lineHeight: 1.75, maxWidth: 620, marginBottom: "2.5rem", animationDelay: "0.1s" }}>
            You don't need a CS degree. You don't need to be a "math person." You need curiosity, consistency, and a roadmap. This is that roadmap — built for people exactly like you.
          </p>

          <div className={heroIn ? "fade" : ""} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem", animationDelay: "0.2s" }}>
            <a href="#roadmap" className="cta-btn">
              Start the Roadmap <ArrowRight size={18} />
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#666", fontSize: 14 }}>
              <Clock size={14} color="#f97316" /> ~10–12 months part-time
            </div>
          </div>

          {/* Stats */}
          <div className={heroIn ? "fade" : ""} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", animationDelay: "0.3s" }}>
            {[
              { icon: DollarSign, val: "$75K", label: "Avg. Starting Salary", color: "#f97316" },
              { icon: TrendingUp, val: "+25%", label: "Job Growth (10yr)", color: "#eab308" },
              { icon: Users, val: "12K+", label: "Transitioned with Us", color: "#10b981" },
              { icon: Clock, val: "10mo", label: "Avg. Time to Hire", color: "#06b6d4" },
            ].map((s, i) => (
              <div key={i} className="stat-box">
                <s.icon size={20} color={s.color} style={{ marginBottom: 8 }} />
                <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: "0.72rem", color: "#555", marginTop: 4, fontWeight: 600, letterSpacing: "0.04em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHASES */}
      <section id="roadmap" style={{ padding: "5rem 5%", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div ref={roadRef} style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className={roadIn ? "fade" : ""} style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
              Your 6-Phase Journey
            </h2>
            <p style={{ color: "#555", fontSize: "1rem" }}>Click each phase to expand the full breakdown</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {phases.map((phase, i) => {
              const Icon = phase.icon
              const isOpen = openPhase === i
              return (
                <div key={i} className="phase-card" style={{ borderColor: isOpen ? phase.color + "60" : "#222" }} onClick={() => setOpenPhase(isOpen ? null : i)}>
                  {/* Header */}
                  <div style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: phase.bg, border: `1.5px solid ${phase.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={22} color={phase.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: 800, color: phase.color, letterSpacing: "0.1em" }}>PHASE {phase.number}</span>
                        <span style={{ fontSize: "0.72rem", color: "#444", background: "#1a1a1a", padding: "2px 10px", borderRadius: 99, fontWeight: 600 }}>{phase.duration}</span>
                      </div>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>{phase.title}</h3>
                      <p style={{ fontSize: "0.82rem", color: "#666", marginTop: 2 }}>{phase.tagline}</p>
                    </div>
                    <div style={{ color: "#444", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
                      <ChevronDown size={20} />
                    </div>
                  </div>

                  {/* Expanded content */}
                  {isOpen && (
                    <div style={{ padding: "0 1.5rem 1.5rem", borderTop: `1px solid ${phase.color}20` }}>
                      {/* Skills */}
                      <div style={{ marginTop: "1.25rem", marginBottom: "1.5rem" }}>
                        <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#444", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>WHAT YOU'LL LEARN</div>
                        {phase.skills.map((skill, j) => (
                          <div key={j} className="skill-row">
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: phase.color, flexShrink: 0, marginTop: 6 }} />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.9rem", marginBottom: 2 }}>{skill.name}</div>
                              <div style={{ fontSize: "0.82rem", color: "#666", lineHeight: 1.5 }}>{skill.desc}</div>
                            </div>
                            <div style={{ fontSize: "0.72rem", color: phase.color, fontWeight: 700, background: phase.bg, padding: "3px 10px", borderRadius: 99, flexShrink: 0 }}>{skill.time}</div>
                          </div>
                        ))}
                      </div>

                      {/* Resources */}
                      <div style={{ marginBottom: "1.25rem" }}>
                        <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#444", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>BEST RESOURCES</div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {phase.resources.map((r, j) => (
                            <span key={j} className="resource-pill">
                              <BookOpen size={11} color={phase.color} /> {r}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Milestone */}
                      <div style={{ background: phase.bg, border: `1.5px solid ${phase.border}`, borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1rem", display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <Award size={18} color={phase.color} style={{ flexShrink: 0, marginTop: 2 }} />
                        <div>
                          <div style={{ fontSize: "0.7rem", fontWeight: 800, color: phase.color, letterSpacing: "0.08em", marginBottom: 4 }}>PHASE MILESTONE</div>
                          <div style={{ fontSize: "0.875rem", color: "#333", fontWeight: 600 }}>{phase.milestone}</div>
                        </div>
                      </div>

                      {/* Tip */}
                      <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: "1rem 1.25rem", display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <Zap size={16} color="#fbbf24" style={{ flexShrink: 0, marginTop: 2 }} />
                        <div style={{ fontSize: "0.82rem", color: "#888", lineHeight: 1.6, fontStyle: "italic" }}>"{phase.tip}"</div>
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
      <section style={{ padding: "5rem 5%", background: "#080808" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div ref={salRef}>
            <h2 className={salIn ? "fade" : ""} style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
              What You'll Earn
            </h2>
            <p style={{ color: "#555", marginBottom: "2.5rem", fontSize: "0.95rem" }}>US market averages — remote-friendly roles often on the higher end</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {salaryData.map((s, i) => (
                <div key={i} className={salIn ? "fade" : ""} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#ccc" }}>{s.label}</span>
                    <span style={{ fontSize: "0.9rem", fontWeight: 800, color: s.color }}>{s.range}</span>
                  </div>
                  <div style={{ height: 8, background: "#1a1a1a", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: salIn ? `${s.bar}%` : "0%", background: s.color, borderRadius: 99, transition: `width 1s ease ${i * 0.15}s` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 5%", background: "#0a0a0a", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem", animation: "float 4s ease-in-out infinite" }}>🚀</div>
          <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "1rem" }}>
            Your first line of code<br />is one click away
          </h2>
          <p style={{ color: "#666", lineHeight: 1.7, marginBottom: "2rem", fontSize: "0.95rem" }}>
            Thousands of people from retail, hospitality, admin, and sales have made this exact transition. The only difference between them and someone still thinking about it — is starting.
          </p>
          <a href="/roadmaps" className="cta-btn">
            Browse All Roadmaps <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  )
}