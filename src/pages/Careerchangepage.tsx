import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import {
  ArrowRight, CheckCircle2, Target, Lightbulb, Users, Sparkles,
  TrendingUp, Headphones, Shield, Phone, Palette,
  BarChart3, BookOpen, Award, Clock, MapPin, Menu, X, Star,
  Code2, Database, Brain, Layers, Globe, Zap, ChevronRight
} from "lucide-react"
import { Navbar } from "../components/Navbar"

/* ─── TYPES ─────────────────────────────────────────────── */
interface Step { step: number; title: string; description: string; color: string }
interface Transition { from: string; to: string; description: string; icon: React.ElementType; accent: string }
interface Tip { icon: React.ElementType; title: string; description: string }

/* ─── DATA ─────────────────────────────────────────────── */
const steps: Step[] = [
  {
    step: 1, title: "Audit Your Transferable Skills",
    description: "Map what you already know — communication, logic, process thinking, client management — these cross industries more than you'd expect.",
    color: "#2563eb"
  },
  {
    step: 2, title: "Choose a Realistic Target Role",
    description: "Research entry-level job descriptions in your target field. Look for patterns in required skills, tools, and qualifications you need to close.",
    color: "#059669"
  },
  {
    step: 3, title: "Build a Focused Learning Plan",
    description: "Don't try to learn everything. Pick 2–3 core skills, set a 90-day deadline, and use free platforms like freeCodeCamp, The Odin Project, or CS50.",
    color: "#d97706"
  },
  {
    step: 4, title: "Create Portfolio Evidence",
    description: "Projects beat certificates. Build 3 real projects that solve real problems — recruiters want proof of skill, not just diplomas.",
    color: "#7c3aed"
  },
  {
    step: 5, title: "Reframe Your Story",
    description: "Write a career narrative that connects your past to your future. 'I managed retail operations for 200+ customers daily' becomes systems thinking experience.",
    color: "#dc2626"
  },
  {
    step: 6, title: "Apply Strategically, Not Broadly",
    description: "Apply to 5 well-researched roles per week over 50 random applications. Warm outreach on LinkedIn to engineers who made similar transitions.",
    color: "#0891b2"
  },
]

const popularTransitions: Transition[] = [
  {
    from: "Retail Manager", to: "Frontend Developer",
    description: "Your experience with customer UX, inventory systems, and fast decision-making maps directly to product thinking and UI problem-solving.",
    icon: Code2, accent: "#2563eb"
  },
  {
    from: "IT Support Specialist", to: "Cybersecurity Analyst",
    description: "You already understand network infrastructure, user access patterns, and incident response. The jump to security is a natural progression, not a leap.",
    icon: Shield, accent: "#059669"
  },
  {
    from: "Customer Service Rep", to: "QA / Software Tester",
    description: "Documenting bugs, reproducing edge cases, and empathizing with user frustration — this is your job description, just in a different language.",
    icon: Headphones, accent: "#7c3aed"
  },
  {
    from: "Call Centre Team Lead", to: "Product Manager",
    description: "You've managed SLAs, tracked KPIs, handled escalations, and coordinated teams. That's product operations with a different job title.",
    icon: Phone, accent: "#d97706"
  },
  {
    from: "Graphic Designer", to: "UX / UI Designer",
    description: "You already think visually and understand layout hierarchy. Adding Figma, user research basics, and interaction design closes the gap fast.",
    icon: Palette, accent: "#dc2626"
  },
  {
    from: "Marketing Analyst", to: "Data Analyst",
    description: "Campaign metrics, A/B testing, funnel analysis — you've been doing data work. Formalise it with SQL and Python and the title follows.",
    icon: BarChart3, accent: "#0891b2"
  },
]

const tips: Tip[] = [
  {
    icon: Target, title: "Be Specific About Your 'Why'",
    description: "Vague motivations collapse under pressure. 'I want better pay' won't sustain 6 months of evening study. Know exactly what problem your new career solves for your life."
  },
  {
    icon: Lightbulb, title: "Don't Hide Your Background",
    description: "Most career changers try to erase their past. The best ones lean into it. Your 5 years in hospitality is a genuine differentiator in a field full of fresh graduates."
  },
  {
    icon: Users, title: "Find One Person Who Made Your Exact Jump",
    description: "LinkedIn search: '[previous role] → [target role]'. Message 10 people. Ask for a 15-minute call. One conversation beats 100 YouTube tutorials for real, specific guidance."
  },
  {
    icon: BookOpen, title: "Learn in Public from Day One",
    description: "Post your projects, share your struggles, document your process on LinkedIn or GitHub. This builds visibility and accountability simultaneously — and recruiters notice."
  },
  {
    icon: Clock, title: "Set a Hard Transition Deadline",
    description: "Open-ended timelines breed procrastination. 'I'll transition when I'm ready' never comes. Set a date: 'I will apply for my first role by [Month, Year]' and reverse-engineer from there."
  },
  {
    icon: Award, title: "Prioritise Skills Over Credentials",
    description: "A completed bootcamp with no projects is worth less than a GitHub with 3 solid repos. Employers in tech, design, and data want demonstrated ability — not another certificate PDF."
  },
]

const testimonials = [
  {
    quote: "I spent 7 years managing a restaurant kitchen. Learning to code felt impossible at first — but the systems thinking I used every single day was exactly what backend development required. The logic was already there.",
    name: "Sipho Nkosi",
    role: "Head Chef → Backend Engineer at Takealot",
    initials: "SN",
    color: "#2563eb",
    duration: "11 months to first role"
  },
  {
    quote: "I was an insurance claims processor. Boring job, detail-oriented work. Someone pointed out that's literally what QA testers do — find what's broken and document it precisely. That reframe changed everything for me.",
    name: "Amahle Dlamini",
    role: "Claims Processor → QA Engineer",
    initials: "AD",
    color: "#059669",
    duration: "8 months to first role"
  },
  {
    quote: "Four years in call centre management. I knew SLAs, I knew user pain points, I knew how to prioritise competing demands. When I reframed that experience in my CV and interviews, product managers actually got excited.",
    name: "Kagiso Molefe",
    role: "Call Centre Manager → Associate PM",
    initials: "KM",
    color: "#7c3aed",
    duration: "14 months to first role"
  },
]

const faqs = [
  {
    q: "Do I need a computer science degree to work in tech?",
    a: "No. Many mid-level engineers, designers, and analysts entered through bootcamps, self-study, or adjacent fields. Degrees help for certain roles (ML research, some enterprise companies) but are not a hard requirement for the majority of tech jobs."
  },
  {
    q: "How long does a realistic career change take?",
    a: "Typically 8–18 months from starting to learn to landing your first role. This varies significantly based on how many hours per week you can dedicate, how targeted your job search is, and how transferable your current skills are."
  },
  {
    q: "Should I quit my job to learn faster?",
    a: "Almost always no. Financial stress degrades learning quality and shortens your runway. The majority of successful career changers transitioned while employed — evenings, weekends, and lunch breaks compound quickly."
  },
  {
    q: "What if I'm over 35 — is it too late?",
    a: "No. Mid-career changers often have advantages: professional maturity, domain expertise, communication skills, and a concrete track record. Age discrimination exists in some pockets of tech, but it's far from universal and many companies actively value experience."
  },
]

/* ─── HOOK ──────────────────────────────────────────────── */
function useInView(options: IntersectionObserverInit = {}): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); observer.disconnect() }
    }, { threshold: 0.08, ...options })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, inView]
}

/* ─── MAIN ────────────────────────────────────────────── */
export default function CareerChangePage(): React.ReactElement {
  const [heroRef, heroIn] = useInView()
  const [stepsRef, stepsIn] = useInView()
  const [transRef, transIn] = useInView()
  const [tipsRef, tipsIn] = useInView()
  const [testiRef, testiIn] = useInView()
  const [faqRef, faqIn] = useInView()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#fff", color: "#0a0a0a", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Crimson+Pro:wght@600;700&family=Syne:wght@700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp   { from { opacity:0; transform:translateY(32px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeIn   { from { opacity:0 } to { opacity:1 } }
        @keyframes slideL   { from { opacity:0; transform:translateX(-28px) } to { opacity:1; transform:translateX(0) } }
        @keyframes slideR   { from { opacity:0; transform:translateX(28px) } to { opacity:1; transform:translateX(0) } }
        @keyframes lineGrow { from { width:0 } to { width:100% } }
        @keyframes bobble  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }

        .fade-up  { animation: fadeUp  0.7s cubic-bezier(0.22,1,0.36,1) both }
        .fade-in  { animation: fadeIn  0.7s ease both }
        .slide-l  { animation: slideL  0.7s cubic-bezier(0.22,1,0.36,1) both }
        .slide-r  { animation: slideR  0.7s cubic-bezier(0.22,1,0.36,1) both }

        .step-card {
          background: #fff; border-radius: 16px; padding: 1.75rem 1.5rem;
          border: 1px solid #e8e8e8;
          transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
          position: relative; overflow: hidden;
        }
        .step-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.08); transform: translateY(-3px); border-color: #d0d0d0; }

        .trans-card {
          background: #fff; border-radius: 16px; padding: 1.75rem;
          border: 1px solid #e8e8e8;
          transition: box-shadow 0.25s, transform 0.25s;
          cursor: pointer;
        }
        .trans-card:hover { box-shadow: 0 16px 48px rgba(0,0,0,0.09); transform: translateY(-4px); }

        .tip-card {
          background: #fafafa; border-radius: 16px; padding: 1.75rem;
          border: 1px solid #efefef;
          transition: box-shadow 0.25s, background 0.25s;
        }
        .tip-card:hover { box-shadow: 0 8px 30px rgba(0,0,0,0.07); background: #fff; }

        .testi-card {
          background: #fafafa; border-radius: 16px; padding: 2rem;
          border: 1px solid #efefef;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .testi-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.08); transform: translateY(-3px); }

        .cta-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: #1e1e2e; color: #fff;
          padding: 0.875rem 1.75rem; border-radius: 10px;
          font-size: 0.95rem; font-weight: 600; border: none; cursor: pointer;
          font-family: inherit; text-decoration: none;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(0,0,0,0.18);
          letter-spacing: -0.01em;
        }
        .cta-primary:hover { background: #2d2d44; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.22); }

        .cta-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #1e1e2e;
          padding: 0.875rem 1.75rem; border-radius: 10px;
          font-size: 0.95rem; font-weight: 600;
          border: 1.5px solid #1e1e2e; cursor: pointer;
          font-family: inherit; text-decoration: none;
          transition: background 0.2s, transform 0.2s;
        }
        .cta-ghost:hover { background: #f5f5f5; transform: translateY(-2px); }

        .stat-box {
          padding: 1.75rem; border-radius: 14px;
          border: 1px solid #e8e8e8; background: #fff;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .stat-box:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.07); transform: translateY(-2px); }

        .badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em;
          padding: 0.35rem 0.875rem; border-radius: 20px;
          margin-bottom: 1.25rem;
        }

        .divider { height: 1px; background: #efefef; margin: 0; }

        .faq-item {
          border-bottom: 1px solid #efefef; padding: 1.25rem 0;
          cursor: pointer;
        }
        .faq-item:last-child { border-bottom: none; }

        /* Responsive */
        @media (max-width: 860px) {
          .hero-split { flex-direction: column !important; }
          .hero-right { display: none !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .trans-grid { grid-template-columns: 1fr !important; }
          .tips-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .testi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── IMPORTED NAVBAR ── */}
      <Navbar />

      {/* ── ANNOUNCEMENT BANNER ── */}
      <div style={{
        marginTop: 76,
        background: "#1e1e2e", color: "#e2e8f0",
        textAlign: "center", padding: "10px 16px",
        fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.01em",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
      }}>
        <Zap size={13} color="#fbbf24" />
        <span>New: AI & Data paths added for 2025 — <a href="/roadmaps" style={{ color: "#93c5fd", textDecoration: "underline", fontWeight: 600 }}>explore them →</a></span>
      </div>

      {/* ── HERO ── */}
      <section style={{ padding: "6rem 5% 5rem", background: "#fff", borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div ref={heroRef} className={heroIn ? "fade-up" : ""} style={{ opacity: heroIn ? 1 : 0, maxWidth: 760 }}>
            <span className="badge" style={{ background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#3b82f6", display: "inline-block" }} />
              CAREER CHANGE GUIDE
            </span>

            <h1 style={{
              fontSize: "clamp(2.6rem, 5vw, 4.2rem)", fontWeight: 900, color: "#0a0a0a",
              lineHeight: 1.06, letterSpacing: "-0.04em",
              fontFamily: "'Syne', sans-serif", marginBottom: "1.5rem",
            }}>
              Your background is<br />
              not your barrier.<br />
              <span style={{ color: "#2563eb" }}>It's your edge.</span>
            </h1>

            <p style={{ fontSize: "1.1rem", color: "#475569", lineHeight: 1.8, maxWidth: 560, marginBottom: "2.25rem" }}>
              Thousands of people transition into tech, design, and data every year — not from computer science degrees, but from retail floors, call centres, kitchens, and classrooms. This guide shows you exactly how.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: "3rem" }}>
              <a href="#roadmap" className="cta-primary">
                See the Roadmap <ArrowRight size={16} />
              </a>
              <a href="#transitions" className="cta-ghost">
                Find Your Path
              </a>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "2.5rem", flexWrap: "wrap", paddingTop: "2rem", borderTop: "1px solid #f0f0f0" }}>
              {[
                { val: "8–18 months", label: "Average transition time" },
                { val: "Free guide", label: "No signup required" },
                { val: "Real stories", label: "South African changers" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0a0a0a", fontFamily: "'Syne', sans-serif" }}>{s.val}</div>
                  <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: 2, fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HONEST CONTEXT ── */}
      <section style={{ background: "#fafafa", padding: "5rem 5%", borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="hero-split">
            <div>
              <span className="badge" style={{ background: "#fefce8", border: "1px solid #fef08a", color: "#854d0e" }}>
                THE HONEST REALITY
              </span>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1.25rem", fontFamily: "'Syne', sans-serif" }}>
                Career change is hard.<br />Here's what actually helps.
              </h2>
              <p style={{ fontSize: "0.95rem", color: "#64748b", lineHeight: 1.85, marginBottom: "1.25rem" }}>
                Most career change content oversells the ease and undersells the time. The truth: a realistic transition takes 8–18 months of consistent part-time effort. It is achievable — but it requires a specific approach, not just motivation.
              </p>
              <p style={{ fontSize: "0.95rem", color: "#64748b", lineHeight: 1.85 }}>
                This guide focuses on what actually moves the needle: building real evidence of skill, targeting your job search, and reframing your existing experience as an asset — not a liability.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="hero-right">
              {[
                { label: "Most common mistake", val: "Learning too broadly", icon: "⚠️" },
                { label: "Biggest accelerator", val: "Portfolio projects", icon: "🚀" },
                { label: "Realistic timeline", val: "8–18 months", icon: "📅" },
                { label: "Most underrated move", val: "Informational calls", icon: "💬" },
              ].map(item => (
                <div key={item.label} className="stat-box">
                  <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>{item.icon}</div>
                  <div style={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>{item.label}</div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0a0a0a" }}>{item.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6-STEP ROADMAP ── */}
      <section id="roadmap" style={{ padding: "6rem 5%", background: "#fff", borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
            <span className="badge" style={{ background: "#ede9fe", border: "1px solid #ddd6fe", color: "#6d28d9" }}>
              🗺️ THE ROADMAP
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'Syne', sans-serif", marginBottom: "0.75rem" }}>
              The 6-Step Career Change Framework
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#64748b", maxWidth: 500, lineHeight: 1.75 }}>
              Not a motivational checklist — a practical sequence built from how real career changers actually got hired.
            </p>
          </div>

          <div ref={stepsRef} style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }} className="steps-grid">
            {steps.map((item, i) => (
              <div key={item.step} className={`step-card ${stepsIn ? "fade-up" : ""}`}
                style={{ opacity: stepsIn ? 1 : 0, animationDelay: `${i * 0.08}s` }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: item.color, borderRadius: "16px 16px 0 0" }} />
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: `${item.color}12`, border: `1.5px solid ${item.color}25`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 900, color: item.color, fontFamily: "'Syne', sans-serif" }}>{item.step}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.08em", color: item.color, marginBottom: "0.3rem", textTransform: "uppercase" }}>Step {item.step}</div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0a0a0a", marginBottom: "0.5rem", fontFamily: "'Syne', sans-serif" }}>{item.title}</h3>
                    <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.75 }}>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR TRANSITIONS ── */}
      <section id="transitions" style={{ padding: "6rem 5%", background: "#fafafa", borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span className="badge" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d" }}>
                CAREER TRANSITIONS
              </span>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'Syne', sans-serif" }}>
                Where people like you<br />are going
              </h2>
            </div>
            <a href="/roadmaps" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.88rem", fontWeight: 600, color: "#2563eb", textDecoration: "none" }}>
              All roadmaps <ArrowRight size={15} />
            </a>
          </div>

          <div ref={transRef} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }} className="trans-grid">
            {popularTransitions.map((t, i) => {
              const Icon = t.icon
              return (
                <div key={i} className={`trans-card ${transIn ? "fade-up" : ""}`}
                  style={{ opacity: transIn ? 1 : 0, animationDelay: `${i * 0.07}s` }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `${t.accent}12`, border: `1.5px solid ${t.accent}25`,
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem",
                  }}>
                    <Icon size={20} color={t.accent} strokeWidth={1.75} />
                  </div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>
                    {t.from}
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0a0a0a", marginBottom: "0.625rem", fontFamily: "'Syne', sans-serif" }}>
                    → {t.to}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.75, marginBottom: "1.25rem" }}>{t.description}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.85rem", fontWeight: 600, color: t.accent }}>
                    View Roadmap <ChevronRight size={14} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TIPS ── */}
      <section style={{ padding: "6rem 5%", background: "#fff", borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <span className="badge" style={{ background: "#fff7ed", border: "1px solid #fed7aa", color: "#c2410c" }}>
              💡 PRACTICAL ADVICE
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'Syne', sans-serif" }}>
              Six things that actually help
            </h2>
          </div>

          <div ref={tipsRef} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }} className="tips-grid">
            {tips.map((tip, i) => (
              <div key={tip.title} className={`tip-card ${tipsIn ? "fade-up" : ""}`}
                style={{ opacity: tipsIn ? 1 : 0, animationDelay: `${i * 0.08}s` }}>
                <div style={{ marginBottom: "1rem" }}>
                  <tip.icon size={20} color="#2563eb" strokeWidth={1.75} />
                </div>
                <h3 style={{ fontSize: "0.975rem", fontWeight: 700, color: "#0a0a0a", marginBottom: "0.625rem", fontFamily: "'Syne', sans-serif" }}>{tip.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.8 }}>{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: "#fafafa", padding: "6rem 5%", borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <span className="badge" style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46" }}>
              REAL STORIES
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'Syne', sans-serif" }}>
              From people who made the jump
            </h2>
          </div>

          <div ref={testiRef} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }} className="testi-grid">
            {testimonials.map((t, i) => (
              <div key={t.name} className={`testi-card ${testiIn ? "fade-up" : ""}`}
                style={{ opacity: testiIn ? 1 : 0, animationDelay: `${i * 0.1}s` }}>
                <div style={{ display: "flex", gap: 2, marginBottom: "1rem" }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={13} color="#fbbf24" fill="#fbbf24" />)}
                </div>
                <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                  "{t.quote}"
                </p>
                <div style={{ height: 1, background: "#f0f0f0", marginBottom: "1.25rem" }} />
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                    background: `${t.color}18`, border: `1.5px solid ${t.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: t.color, fontWeight: 800, fontSize: "0.78rem",
                  }}>{t.initials}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#0a0a0a" }}>{t.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: 1 }}>{t.role}</div>
                  </div>
                  <div style={{ marginLeft: "auto", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 20, padding: "3px 10px", fontSize: "0.68rem", fontWeight: 700, color: "#15803d", whiteSpace: "nowrap" }}>
                    {t.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#fff", padding: "6rem 5%", borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <span className="badge" style={{ background: "#f8fafc", border: "1px solid #e2e8f0", color: "#475569" }}>
              FAQ
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.03em", fontFamily: "'Syne', sans-serif" }}>
              Common questions
            </h2>
          </div>

          <div ref={faqRef} style={{ opacity: faqIn ? 1 : 0, transition: "opacity 0.6s ease" }}>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                  <h3 style={{ fontSize: "0.975rem", fontWeight: 600, color: "#0a0a0a", lineHeight: 1.5 }}>{faq.q}</h3>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                    background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "transform 0.2s",
                    transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}>
                    <span style={{ fontSize: "1.1rem", color: "#555", lineHeight: 1 }}>+</span>
                  </div>
                </div>
                {openFaq === i && (
                  <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.85, marginTop: "0.875rem", paddingRight: 44 }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: "#fff", padding: "6rem 5%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            background: "#1e1e2e", borderRadius: 24, padding: "4rem 3rem",
            textAlign: "center", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent 65%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span className="badge" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem" }}>
                <Globe size={12} /> FREE CAREER ROADMAPS
              </span>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", fontFamily: "'Syne', sans-serif", marginBottom: "1rem" }}>
                Find your specific path
              </h2>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: 480, margin: "0 auto 2.5rem" }}>
                Browse detailed, role-specific roadmaps that show exactly what to learn, in what order, with the best free resources for each step.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/roadmaps" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#fff", color: "#0a0a0a", padding: "0.875rem 1.75rem",
                  borderRadius: 10, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)" }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)" }}>
                  Browse Roadmaps <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}