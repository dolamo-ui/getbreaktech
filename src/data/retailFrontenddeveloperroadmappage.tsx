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
  Code2,
  Palette,
  Globe,
  Layers,
  Rocket,
  GitBranch,
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
    title: "Build Your Foundation",
    duration: "Weeks 1–6",
    color: "#6366f1",
    bg: "#eef2ff",
    border: "#c7d2fe",
    icon: Code2,
    tagline: "From zero to writing real, working code",
    skills: [
      {
        name: "HTML5 Semantics",
        desc: "Structure web pages correctly — headings, forms, accessibility, semantic elements. HTML is not glamorous. It is also the foundation that everything else sits on. Get it right and the rest is easier.",
        time: "1 week",
      },
      {
        name: "CSS3, Flexbox & Grid",
        desc: "Make things look right on every screen, at every size, in every browser. CSS has a reputation for being frustrating. That reputation is earned. It also becomes genuinely enjoyable once you understand the layout model. Flexbox and Grid are the two tools that unlock everything.",
        time: "2 weeks",
      },
      {
        name: "JavaScript Fundamentals",
        desc: "Variables, functions, loops, conditionals, DOM manipulation — the building blocks of every interactive web experience ever built. JavaScript is the language of the web. There is no shortcut around learning it properly.",
        time: "2 weeks",
      },
      {
        name: "Browser Developer Tools",
        desc: "Inspect elements, debug scripts, monitor network requests, analyse performance — the browser's built-in toolset that every professional uses every day. Learn this early and debugging stops being frightening.",
        time: "3 days",
      },
    ],
    resources: [
      "freeCodeCamp (free)",
      "The Odin Project (free)",
      "CSS Tricks (free)",
    ],
    milestone:
      "Build a personal landing page with HTML and CSS — no tutorials, no copy-paste, written from scratch",
    tip: "Your non-tech background is an asset in Phase 1. You already know how websites are supposed to feel for users. That instinct — that something is confusing, or slow, or ugly — is exactly what makes a good frontend developer. You're not learning from zero.",
  },
  {
    number: "02",
    title: "Go Interactive with JavaScript",
    duration: "Weeks 7–14",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    icon: Zap,
    tagline: "Make the web come alive — this is where it gets addictive",
    skills: [
      {
        name: "Modern ES6+ JavaScript",
        desc: "Arrow functions, destructuring, template literals, the spread operator, modules, promises, async/await — the modern JavaScript syntax that every codebase uses. These are not advanced topics. They are the baseline.",
        time: "2 weeks",
      },
      {
        name: "DOM Manipulation",
        desc: "Change the page dynamically based on user interactions. Show and hide elements, update content, respond to clicks and keypresses. This is where your code first does something visible and satisfying.",
        time: "1 week",
      },
      {
        name: "Fetch API & Working with REST",
        desc: "Request data from external services, handle JSON responses, display live information — weather, stock prices, news, anything with a public API. This is what turns a static page into a real application.",
        time: "1 week",
      },
      {
        name: "Git & GitHub",
        desc: "Version control — the tool that lets you track changes, collaborate with other developers, and recover from mistakes. Git is non-negotiable. Every professional developer uses it every day. Learn it now, not later.",
        time: "1 week",
      },
    ],
    resources: [
      "JavaScript.info (free)",
      "Scrimba JS Course (free tier)",
      "MDN Web Docs (free)",
    ],
    milestone:
      "Build a weather app or task manager that fetches live data from a public API",
    tip: "Every error message is a teacher. The instinct to panic when the console turns red is the thing to unlearn first. Google every error verbatim — in quotation marks, exactly as it appears. That is what every working developer does, from junior to senior. It is not a sign of weakness. It is the method.",
  },
  {
    number: "03",
    title: "Master React",
    duration: "Weeks 15–24",
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    icon: Layers,
    tagline: "The single most in-demand skill in all of frontend development",
    skills: [
      {
        name: "React Fundamentals",
        desc: "Components, props, state, JSX, event handling — the React mental model. React does not add complexity for no reason. Once you understand why it exists — managing UI state at scale — it becomes the obvious way to build anything.",
        time: "2 weeks",
      },
      {
        name: "React Hooks",
        desc: "useState, useEffect, useContext, useRef, useMemo — modern React's core primitives. Hooks replaced class components and made React dramatically simpler. Master these and you can build almost anything.",
        time: "2 weeks",
      },
      {
        name: "React Router",
        desc: "Multi-page applications, dynamic routes, URL parameters, navigation — how single-page apps create the illusion of multiple pages. Almost every React application in production uses a router.",
        time: "1 week",
      },
      {
        name: "State Management",
        desc: "Context API for simple cases, Zustand or Redux for complex ones — managing data that multiple components need access to. Understanding state management separates developers who can build features from developers who can build products.",
        time: "1 week",
      },
    ],
    resources: [
      "React official docs (free)",
      "Scrimba React Course",
      "Jack Herrington YouTube (free)",
    ],
    milestone:
      "Build a complete multi-page React application with routing, state management, and at least one external API",
    tip: "React is the single most requested skill in frontend job listings, by a significant margin. This phase unlocks roughly 80% of all available frontend opportunities. The investment of time here pays back immediately and compounds for the entire length of your career.",
  },
  {
    number: "04",
    title: "Professional Tools & TypeScript",
    duration: "Weeks 25–30",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
    icon: Palette,
    tagline: "Build things that look and feel production-ready from day one",
    skills: [
      {
        name: "Tailwind CSS",
        desc: "Utility-first CSS — style directly in your HTML using composable class names, without writing separate CSS files. Tailwind is polarising until you use it seriously. After that, most developers never go back.",
        time: "1 week",
      },
      {
        name: "TypeScript Basics",
        desc: "Add type safety to JavaScript — catch errors at compile time instead of runtime, document your intent, make refactoring safer. TypeScript on your resume adds roughly 15% to salary expectations. It is worth one focused week.",
        time: "2 weeks",
      },
      {
        name: "Testing with Jest & React Testing Library",
        desc: "Write automated tests that verify your code works correctly — component tests, integration tests, user interaction simulations. The ability to write tests signals seniority. Very few junior developers bother.",
        time: "1 week",
      },
      {
        name: "Build Tools & Deployment",
        desc: "Vite for development, environment variables, CI/CD basics, deploying to Vercel or Netlify — understanding the pipeline from code to live URL. If you can ship a feature independently, you are immediately more valuable.",
        time: "1 week",
      },
    ],
    resources: [
      "Tailwind CSS docs (free)",
      "Matt Pocock TypeScript tutorials (free)",
      "Testing Library docs (free)",
    ],
    milestone:
      "Rebuild a previous project using TypeScript and Tailwind — every component typed, every style in Tailwind",
    tip: "TypeScript feels like bureaucracy until it catches the first bug you didn't know you had. After that it feels like a safety net. The week you spend learning it will pay back in reduced debugging time within the first month of a job.",
  },
  {
    number: "05",
    title: "Build Your Portfolio",
    duration: "Weeks 31–38",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    icon: Globe,
    tagline: "Projects that make a hiring manager stop scrolling and look twice",
    skills: [
      {
        name: "Three Portfolio Projects",
        desc: "Real applications that solve real problems — not clones of tutorials, not todo lists, not weather apps. Build something you would actually use. The best portfolio projects come from genuine frustration with something that doesn't exist yet.",
        time: "3 weeks",
      },
      {
        name: "Deploy Everything",
        desc: "Every project live on a real URL, accessible to anyone with a browser. Vercel and Netlify both offer free hosting. A project that only runs on localhost is a project that doesn't exist for a hiring manager.",
        time: "3 days",
      },
      {
        name: "GitHub Profile",
        desc: "Pinned repositories, professional README files with screenshots, consistent commit history — your GitHub is the second thing every technical interviewer will look at after your resume. Make it look like you've been building things consistently.",
        time: "3 days",
      },
      {
        name: "Portfolio Website",
        desc: "Your personal brand — the place that links everything together. Keep it simple. Load fast. Show the work. The portfolio website itself is an implicit coding test: if it looks broken or generic, that's information about your skills.",
        time: "1 week",
      },
    ],
    resources: [
      "Vercel (free tier)",
      "GitHub Pages (free)",
      "readme.so (free)",
    ],
    milestone:
      "Three deployed projects plus a professional portfolio website — all live, all shareable, all linked from your LinkedIn",
    tip: "Projects beat certificates in almost every technical interview. One genuinely useful, well-built deployed application demonstrates more than ten Udemy completion badges. Build things that solve problems you actually have. Those projects carry conviction that a tutorial clone never will.",
  },
  {
    number: "06",
    title: "Land Your First Role",
    duration: "Weeks 39–48",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
    icon: Rocket,
    tagline: "The job search is a skill — learn it the same way you learned React",
    skills: [
      {
        name: "Resume & LinkedIn Optimisation",
        desc: "Quantify your project impact, use the vocabulary of frontend job listings, and pass applicant tracking systems. 'Built a React application with 95% Lighthouse performance score' beats 'developed web projects' in every ATS and in every hiring manager's memory.",
        time: "1 week",
      },
      {
        name: "Technical Interview Preparation",
        desc: "JavaScript fundamentals questions, React component design, explain-your-reasoning coding exercises, system design basics for frontend — the actual formats of frontend technical interviews. Practice out loud. Saying the answer is different from thinking it.",
        time: "2 weeks",
      },
      {
        name: "Algorithmic Problem Solving",
        desc: "Arrays, strings, objects, basic recursion — easy to medium difficulty LeetCode problems. Not all companies use these, but enough do that being unprepared is a risk. Focus on patterns, not memorisation.",
        time: "2 weeks",
      },
      {
        name: "Volume, Network & Follow-Through",
        desc: "Apply to five or more positions per day. Follow up after one week. Attend local meetups and online communities. Most people get hired between application 40 and 80. The difference between people who make it and people who give up is mostly persistence.",
        time: "Ongoing",
      },
    ],
    resources: [
      "Frontend Interview Handbook (free)",
      "interviewing.io (free practice)",
      "LinkedIn Job Alerts",
    ],
    milestone:
      "First frontend developer role offer — you made it",
    tip: "Apply to five or more positions per day, consistently. Treat the job search like a job with fixed hours. Most people stop at 20 applications and conclude it isn't working. The data says otherwise. The offer arrives between application 40 and 80 for most successful career changers. The only way to get there is volume.",
  },
]

const salaryData: SalaryRow[] = [
  {
    label: "Junior Frontend (0–2 yrs)",
    range: "$55K–$85K",
    bar: 38,
    color: "#6366f1",
  },
  {
    label: "Mid-Level (2–5 yrs)",
    range: "$85K–$130K",
    bar: 60,
    color: "#0891b2",
  },
  {
    label: "Senior Developer (5+ yrs)",
    range: "$130K–$200K",
    bar: 80,
    color: "#059669",
  },
  {
    label: "Lead / Staff Engineer",
    range: "$160K–$280K+",
    bar: 100,
    color: "#7c3aed",
  },
]

const advantages: AdvantageItem[] = [
  {
    title: "You Already Know What Good Feels Like",
    desc: "Years of using software — as a customer, as an employee, as a user frustrated by bad design — have calibrated your instinct for what works. Most CS graduates can build a feature. Fewer can immediately tell you why it feels wrong. You can.",
  },
  {
    title: "You Understand the Human on the Other Side",
    desc: "Frontend development is the discipline closest to the actual user. Unlike backend or infrastructure work, what you build is what people touch. Your experience navigating systems and communicating with non-technical people is directly valuable here.",
  },
  {
    title: "You Know How to Learn Under Pressure",
    desc: "Career changers who make it are not the ones who found it easiest. They are the ones who developed the ability to learn new things quickly in environments that do not wait for them to be ready. You've already done that in at least one career.",
  },
  {
    title: "You Have Domain Knowledge to Leverage",
    desc: "Build a tool for the industry you came from. A retail professional building inventory tools, a healthcare worker building patient interfaces, a teacher building learning apps — domain expertise plus technical skills is a combination that companies in those spaces will pay significantly more for.",
  },
]

export default function FrontendDeveloperRoadmapPage(): React.ReactElement {
  const [openPhase, setOpenPhase] = useState<number | null>(0)
  const [heroRef, heroIn] = useInView()
  const [salRef, salIn] = useInView()

  const stats: StatItem[] = [
    { icon: DollarSign, val: "$75K", label: "Avg. Starting Salary", color: "#6366f1" },
    { icon: TrendingUp, val: "+25%", label: "Job Growth (10yr)", color: "#0891b2" },
    { icon: Users, val: "12K+", label: "Successful Transitioners", color: "#059669" },
    { icon: Clock, val: "10mo", label: "Avg. Time to Hire", color: "#d97706" },
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
        .github-callout{background:#fff;border:1.5px solid #e2e8f0;border-radius:14px;padding:1.25rem 1.5rem;display:flex;gap:14px;align-items:flex-start;margin-top:2rem}
        @media(max-width:640px){.adv-grid{grid-template-columns:1fr!important}.stat-row{flex-direction:column!important}}
      `}</style>

      {/* TOP BAR */}
      <div
        style={{
          height: 3,
          background:
            "linear-gradient(90deg, #6366f1, #0891b2, #059669, #d97706, #7c3aed)",
        }}
      />

      {/* HERO */}
      <section
        style={{
          background:
            "linear-gradient(160deg, #f8f9ff 0%, #eef2ff 50%, #ecfeff 100%)",
          padding: "4.5rem 6% 3.5rem",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <button className="back-btn" onClick={() => window.history.back()}>
            ← Back to Career Paths
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#6366f1",
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
            From Non-Tech
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #6366f1, #0891b2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              to Frontend Developer
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
            You don't need a computer science degree. You don't need to be a
            maths person. You need curiosity, consistency, and a roadmap built
            for people exactly like you.
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
              <Clock size={13} color="#6366f1" /> ~10–12 months part-time
            </span>
          </div>

          <div className="stat-row">
            {stats.map((s: StatItem, i: number) => (
              <div key={i} className="stat-chip">
                <s.icon size={18} color={s.color} style={{ marginBottom: 6 }} />
                <div
                  className="sans"
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    color: "#0d1117",
                    lineHeight: 1,
                  }}
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
        style={{
          padding: "4.5rem 6%",
          background: "#fff",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div className="section-tag" style={{ marginBottom: "1.5rem" }}>
            Before We Begin
          </div>

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
            People from every background imaginable have become frontend
            developers. The ones who make it share one trait: they didn't
            wait until they felt ready.
          </h2>

          <p
            style={{
              fontSize: "1.05rem",
              color: "#334155",
              lineHeight: 1.9,
              marginBottom: "1.25rem",
            }}
          >
            Frontend development is the part of software that people actually
            touch. Every button, every form, every animation, every loading
            state — someone wrote that code. That person does not need to have
            studied computer science. They need to understand how users think,
            how browsers work, and how to translate a design into something
            functional and responsive.
          </p>

          <p
            style={{
              fontSize: "1.05rem",
              color: "#334155",
              lineHeight: 1.9,
              marginBottom: "1.25rem",
            }}
          >
            The tools you need to learn are genuinely learnable. HTML and CSS
            are not programming languages in the traditional sense — they are
            descriptive. JavaScript takes longer, but it follows consistent
            rules. React is opinionated, which means once you understand its
            way of thinking, everything clicks into place. This is not a field
            that requires a particular type of mind. It requires persistence
            and a structured path.
          </p>

          <div className="data-quote">
            "Half of my team came from non-technical backgrounds — retail
            management, graphic design, a chef, someone who worked in
            logistics. The ones who self-taught were often more resourceful
            than the CS graduates. They'd been solving messy real-world
            problems for years. Code is just another type of problem to solve."
            <div
              className="sans"
              style={{
                marginTop: "0.75rem",
                fontSize: "0.85rem",
                color: "#6366f1",
                fontStyle: "normal",
                fontWeight: 600,
              }}
            >
              — Engineering Manager at a Series B SaaS company
            </div>
          </div>

          <p
            style={{
              fontSize: "1.05rem",
              color: "#334155",
              lineHeight: 1.9,
              marginBottom: "1.25rem",
            }}
          >
            The roadmap below takes you from no coding experience to a deployed
            portfolio and an active job search. It is sequenced carefully —
            each phase builds on the last, and nothing is introduced before you
            have the context to understand why it matters.
          </p>

          <div className="callout-indigo">
            <strong>The honest picture:</strong> This transition takes real
            time and consistent effort. Ten to twelve months of part-time
            learning, built around existing work and life commitments, is
            realistic for most people. The salary at the end is significantly
            higher than most non-technical roles, the remote options are
            exceptional, and the career ceiling is higher than almost any other
            skilled trade that requires no formal credential to enter.
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section
        id="roadmap"
        style={{ padding: "4.5rem 6%", background: "#f8f9ff" }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="section-tag" style={{ marginBottom: "0.75rem" }}>
            The Roadmap
          </div>
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
          <p
            className="sans"
            style={{
              color: "#94a3b8",
              marginBottom: "2.5rem",
              fontSize: "0.95rem",
            }}
          >
            Click each phase to read the full breakdown
          </p>

          {phases.map((phase: Phase, i: number) => {
            const Icon = phase.icon
            const isOpen = openPhase === i
            return (
              <div
                key={i}
                className="phase-card"
                style={{
                  borderColor: isOpen ? phase.color + "50" : "#e2e8f0",
                }}
                onClick={() => setOpenPhase(isOpen ? null : i)}
              >
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 3,
                      }}
                    >
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
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "#0d1117",
                        lineHeight: 1.25,
                      }}
                    >
                      {phase.title}
                    </h3>
                    <p
                      className="sans"
                      style={{
                        fontSize: "0.8rem",
                        color: "#94a3b8",
                        marginTop: 2,
                      }}
                    >
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

                {isOpen && (
                  <div
                    style={{
                      padding: "0 1.5rem 1.5rem",
                      borderTop: `1px solid ${phase.color}18`,
                    }}
                  >
                    {/* Skills */}
                    <div
                      style={{ marginTop: "1.25rem", marginBottom: "1.5rem" }}
                    >
                      <div
                        className="section-tag"
                        style={{ marginBottom: "0.75rem" }}
                      >
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
                            <div
                              style={{
                                fontSize: "0.875rem",
                                color: "#475569",
                                lineHeight: 1.7,
                              }}
                            >
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
                      <div
                        className="section-tag"
                        style={{ marginBottom: "0.625rem" }}
                      >
                        Best Free Resources
                      </div>
                      <div
                        style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
                      >
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
                      <Award
                        size={16}
                        color={phase.color}
                        style={{ flexShrink: 0, marginTop: 2 }}
                      />
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
                          style={{
                            fontSize: "0.875rem",
                            color: "#334155",
                            fontWeight: 600,
                            lineHeight: 1.5,
                          }}
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
                      <Zap
                        size={14}
                        color="#d97706"
                        style={{ flexShrink: 0, marginTop: 2 }}
                      />
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "#78350f",
                          lineHeight: 1.7,
                          fontStyle: "italic",
                        }}
                      >
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
          <div className="section-tag" style={{ marginBottom: "1.5rem" }}>
            Your Unfair Advantage
          </div>
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
            What you bring that a fresh CS graduate doesn't
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#334155",
              lineHeight: 1.9,
              marginBottom: "2rem",
            }}
          >
            The software industry has spent years trying to hire people who can
            write excellent code and understand people at the same time. Those
            two skills rarely come together in a single graduate. Career
            changers tend to have the second skill already — often more
            developed than someone who has spent four years exclusively in
            lectures and labs. Add the technical skills this roadmap teaches
            and the combination becomes genuinely unusual.
          </p>
          <div className="adv-grid" style={{ marginBottom: "2rem" }}>
            {advantages.map((item: AdvantageItem, i: number) => (
              <div key={i} className="adv-card">
                <div
                  className="sans"
                  style={{
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: "#0d1117",
                    marginBottom: 6,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "#475569",
                    lineHeight: 1.7,
                  }}
                >
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          {/* GitHub callout */}
          <div className="github-callout">
            <GitBranch
              size={20}
              color="#6366f1"
              style={{ flexShrink: 0, marginTop: 2 }}
            />
            <div>
              <div
                className="sans"
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  color: "#94a3b8",
                  letterSpacing: "0.1em",
                  marginBottom: 6,
                }}
              >
                YOUR GITHUB MATTERS
              </div>
              <p
                className="sans"
                style={{
                  fontSize: "0.875rem",
                  color: "#475569",
                  lineHeight: 1.65,
                }}
              >
                Recruiters and engineering managers check GitHub before they
                finish reading your resume. Pin your three best repositories,
                write clear README files with screenshots and setup
                instructions, and maintain a consistent commit history. A
                well-maintained GitHub profile signals sustained effort and
                genuine interest — neither of which any certificate can
                demonstrate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SALARY */}
      <section style={{ padding: "4.5rem 6%", background: "#f8f9ff" }}>
        <div ref={salRef} style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="section-tag" style={{ marginBottom: "0.75rem" }}>
            Earning Potential
          </div>
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
          <p
            className="sans"
            style={{
              color: "#94a3b8",
              marginBottom: "2.5rem",
              fontSize: "0.9rem",
            }}
          >
            US market averages — remote-friendly roles and senior positions
            typically land at the higher end of each band
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {salaryData.map((s: SalaryRow, i: number) => (
              <div key={i}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <span
                    className="sans"
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#334155",
                    }}
                  >
                    {s.label}
                  </span>
                  <span
                    className="sans"
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 800,
                      color: s.color,
                    }}
                  >
                    {s.range}
                  </span>
                </div>
                <div
                  style={{
                    height: 6,
                    background: "#e2e8f0",
                    borderRadius: 99,
                    overflow: "hidden",
                  }}
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
        style={{
          padding: "4.5rem 6%",
          background: "#fff",
          borderTop: "1px solid #e2e8f0",
        }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="section-tag" style={{ marginBottom: "1.5rem" }}>
            A Final Word
          </div>
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
            Software is built by people. The best software is built by people
            who understand other people.
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#334155",
              lineHeight: 1.9,
              marginBottom: "1.25rem",
            }}
          >
            The industry has spent years trying to solve a problem it created
            for itself: hiring brilliant engineers who build features nobody
            wants in ways nobody can use. The correction — slowly, imperfectly
            — is toward people who combine technical skill with genuine
            understanding of human behaviour. Frontend development is the
            discipline where that combination matters most, because it is
            exactly what users experience.
          </p>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#334155",
              lineHeight: 1.9,
              marginBottom: "1.25rem",
            }}
          >
            You do not need to have always been a technical person to become
            one. You need to start, and to keep going when it is difficult,
            which it will be. The difficulty is not evidence that you are not
            capable. It is evidence that the skill is real and worth acquiring.
          </p>
          <div className="data-quote">
            The first line of code you write will be wrong. The tenth will be
            less wrong. The hundredth will work. The thousandth will be
            something you're proud of. None of that happens without the first
            one.
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
