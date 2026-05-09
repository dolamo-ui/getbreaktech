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
  Database,
  Code2,
  Search,
  FileSpreadsheet,
  PieChart,
  Rocket,
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
    title: "Reframe What You Already Know",
    duration: "Weeks 1–3",
    color: "#6366f1",
    bg: "#eef2ff",
    border: "#c7d2fe",
    icon: Search,
    tagline: "You've been doing data analysis — without the title",
    skills: [
      {
        name: "The Data Analyst Mindset",
        desc: "Data analysis is the art of turning numbers into decisions. Every campaign report you've written, every A/B test you've read, every attribution model you've argued about — that's data analysis. Learn to recognise what you already know.",
        time: "3 days",
      },
      {
        name: "The Analytics Workflow",
        desc: "Ask → Collect → Clean → Analyse → Visualise → Communicate. This is the data analyst's loop. It mirrors the campaign lifecycle you already know: brief, research, execute, measure, report.",
        time: "1 week",
      },
      {
        name: "Key Metrics & KPIs",
        desc: "CAC, LTV, conversion rate, CTR, attribution models, cohort analysis — you've seen these in marketing dashboards. Now understand the math behind them and how analysts build them from raw data.",
        time: "1 week",
      },
    ],
    resources: [
      "DataCamp Introduction to Data Analysis (free tier)",
      "Storytelling with Data by Cole Knaflic (book)",
      "Towards Data Science (free)",
    ],
    milestone:
      "Write a 1-page analysis of a marketing dataset — go beyond the dashboard, explain the why",
    tip: "Marketing people are the best analysts in the room who just don't know it yet. You already ask the right questions. You're already obsessed with what the numbers mean for the business. You just haven't been taught the tools to answer those questions yourself. That's what this roadmap fixes.",
  },
  {
    number: "02",
    title: "SQL — The Language of Data",
    duration: "Weeks 4–10",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    icon: Database,
    tagline: "If you only learn one technical skill, make it this one",
    skills: [
      {
        name: "SQL Fundamentals",
        desc: "SELECT, FROM, WHERE, ORDER BY, LIMIT — reading data from a database. This is the single most important technical skill a data analyst can have, and it's learnable in weeks, not years.",
        time: "2 weeks",
      },
      {
        name: "Joins & Aggregations",
        desc: "JOIN, GROUP BY, COUNT, SUM, AVG — combining tables and summarising data. This is where you stop just looking at dashboards and start building them.",
        time: "2 weeks",
      },
      {
        name: "Subqueries & CTEs",
        desc: "Nested queries and Common Table Expressions — write complex analyses that answer multi-part business questions. This is what separates a beginner from someone who gets hired.",
        time: "1.5 weeks",
      },
      {
        name: "Window Functions",
        desc: "ROW_NUMBER, RANK, LAG, LEAD, running totals — the advanced SQL that appears in virtually every analyst interview. Master this and you stand out from 80% of applicants.",
        time: "1 week",
      },
    ],
    resources: [
      "Mode SQL Tutorial (free)",
      "SQLZoo (free)",
      "StrataScratch SQL Practice (free tier)",
    ],
    milestone:
      "Complete 30 SQL challenges on StrataScratch or LeetCode — at least 5 at medium difficulty",
    tip: "SQL feels intimidating until you realise you've been writing it in English your whole career. 'Show me all customers who bought more than twice in Q4' is a SQL query. You just didn't know the syntax. Learn the syntax.",
  },
  {
    number: "03",
    title: "Excel & Google Sheets at Analyst Level",
    duration: "Weeks 11–15",
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    icon: FileSpreadsheet,
    tagline: "You use Excel. You don't yet use Excel like an analyst.",
    skills: [
      {
        name: "Advanced Formulas",
        desc: "VLOOKUP/XLOOKUP, INDEX/MATCH, SUMIFS, COUNTIFS, array formulas — the formulas that turn a spreadsheet from a table into an analytical tool.",
        time: "1 week",
      },
      {
        name: "Pivot Tables & Power Query",
        desc: "Analyse millions of rows without writing code. Build the same summaries that take SQL two joins and a GROUP BY — but in minutes, with a GUI.",
        time: "1 week",
      },
      {
        name: "Dynamic Charts & Dashboards",
        desc: "Build dashboards your CMO actually wants to look at. Dynamic charts, conditional formatting, interactive slicers — spreadsheets that update when the data changes.",
        time: "1.5 weeks",
      },
    ],
    resources: [
      "ExcelJet (free)",
      "Chandoo.org (free)",
      "Google Sheets official documentation (free)",
    ],
    milestone:
      "Rebuild your company's most important marketing report in Excel from raw data — no formulas pre-filled",
    tip: "Marketing teams live in spreadsheets. You probably know Excel better than you think. An analyst-level Excel user doesn't just build tables — they build models that answer questions. That's the shift.",
  },
  {
    number: "04",
    title: "Python for Data Analysis",
    duration: "Weeks 16–26",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
    icon: Code2,
    tagline: "This is where your analysis becomes truly limitless",
    skills: [
      {
        name: "Python Basics for Analysts",
        desc: "Variables, lists, dicts, functions, loops — the minimum Python you need before touching data libraries. Not a programming course. Just enough to work with data.",
        time: "2 weeks",
      },
      {
        name: "Pandas — The Analyst's Library",
        desc: "DataFrames, filtering, groupby, merge, pivot_table — doing everything you've been doing in Excel, but on datasets of any size, with full automation.",
        time: "3 weeks",
      },
      {
        name: "Data Visualization with Matplotlib & Seaborn",
        desc: "Build publication-quality charts in code. Scatter plots, histograms, heatmaps, time series — visuals that go beyond what Excel can produce.",
        time: "1.5 weeks",
      },
      {
        name: "Intro to Statistics for Analysts",
        desc: "Mean, median, standard deviation, correlation, confidence intervals, hypothesis testing — the statistical concepts that come up in every analyst role.",
        time: "1.5 weeks",
      },
    ],
    resources: [
      "Kaggle Python Course (free)",
      "Pandas documentation (free)",
      "StatQuest with Josh Starmer on YouTube (free)",
    ],
    milestone:
      "Perform a full end-to-end analysis in a Jupyter notebook: load data → clean → analyse → visualise → write conclusions",
    tip: "Python feels like a wall until you get over it. And then it feels like a superpower. Every manual task you've done in Excel — filtering, pivoting, merging — Python does in a line of code, on any size dataset, automatically. The investment pays back immediately.",
  },
  {
    number: "05",
    title: "BI Tools & Data Storytelling",
    duration: "Weeks 27–34",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    icon: PieChart,
    tagline: "Build dashboards executives actually use",
    skills: [
      {
        name: "Tableau or Power BI",
        desc: "Build interactive dashboards that connect directly to databases. Drag-and-drop analytics that turn raw SQL results into decisions for the C-suite.",
        time: "2.5 weeks",
      },
      {
        name: "Data Storytelling",
        desc: "How to structure an analytical narrative: context → complication → resolution. How to present data in a way that leads to action, not just information.",
        time: "1.5 weeks",
      },
      {
        name: "Marketing Analytics Specialisation",
        desc: "Attribution modelling, funnel analysis, cohort analysis, LTV modelling — the specific analytical frameworks most valuable in your target market.",
        time: "1.5 weeks",
      },
    ],
    resources: [
      "Tableau Public (free)",
      "Power BI Desktop (free)",
      "Cole Nussbaumer Knaflic's blog (free)",
    ],
    milestone:
      "Build a complete marketing performance dashboard in Tableau or Power BI connected to a real dataset",
    tip: "Your marketing background makes you exceptional at this phase. You know what the CMO wants to see. You know what questions the Sales team will ask. Most pure analysts don't. You're not just building a dashboard — you're building the right dashboard.",
  },
  {
    number: "06",
    title: "Build Your Portfolio & Land the Role",
    duration: "Weeks 35–48",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
    icon: Rocket,
    tagline: "Your marketing experience is the differentiator — use it",
    skills: [
      {
        name: "3 Analytics Portfolio Projects",
        desc: "Each one tells a story: here's the business problem, here's the data I had, here's what I found, here's what I recommended. Not just charts — conclusions.",
        time: "4 weeks",
      },
      {
        name: "Kaggle & Public Datasets",
        desc: "Build projects on public marketing datasets. Demonstrate SEO analysis, customer segmentation, campaign attribution — analyses that hiring managers in your target companies care about.",
        time: "2 weeks",
      },
      {
        name: "Interview Prep",
        desc: "SQL interview questions, case studies, the 'product metrics' interview — how data teams at tech companies think about analytical problems.",
        time: "2 weeks",
      },
      {
        name: "Resume & LinkedIn Pivot",
        desc: "Quantify your marketing achievements in analytical language. 'Reduced CAC by 34% through attribution model optimisation' is a data analyst achievement, not a marketing one.",
        time: "1 week",
      },
    ],
    resources: [
      "Kaggle Datasets (free)",
      "Data Portfolio Builder YouTube (free)",
      "Interviewing.io (free practice)",
    ],
    milestone:
      "3 published projects + a GitHub portfolio + your first data analyst role offer.",
    tip: "You have a genuine advantage over candidates from pure technical backgrounds: you know what the business needs. Target companies in marketing-heavy industries — e-commerce, SaaS, consumer apps. They need analysts who speak both languages. That's you.",
  },
]

const salaryData: SalaryRow[] = [
  {
    label: "Junior Data Analyst (0–2 yrs)",
    range: "$55K–$80K",
    bar: 38,
    color: "#6366f1",
  },
  {
    label: "Data Analyst (2–4 yrs)",
    range: "$80K–$115K",
    bar: 58,
    color: "#0891b2",
  },
  {
    label: "Senior Analyst / Analytics Manager",
    range: "$115K–$160K",
    bar: 78,
    color: "#059669",
  },
  {
    label: "Analytics Lead / Director",
    range: "$150K–$220K+",
    bar: 100,
    color: "#7c3aed",
  },
]

const advantages: AdvantageItem[] = [
  {
    title: "You Already Think in Business Questions",
    desc: "Most junior analysts know how to calculate a metric but not why it matters. You've spent years translating business goals into measurement frameworks. That's a senior-level skill in a junior's body.",
  },
  {
    title: "You Understand the Audience",
    desc: "Data without communication is just noise. You know how to present to a CMO, a sales team, or a board. Your instinct for narrative and audience is what makes analysis actionable.",
  },
  {
    title: "You Know Which Numbers Matter",
    desc: "You've seen vanity metrics vs meaningful metrics up close. You know the difference between a metric that looks good and one that actually drives decisions. Most analysts learn this after two years on the job.",
  },
  {
    title: "You've Already Run Experiments",
    desc: "A/B testing, multivariate campaigns, audience segmentation — you've been running experiments and interpreting results longer than most data analysts. You just never called it that.",
  },
]

export default function DataAnalystRoadmapPage(): React.ReactElement {
  const [openPhase, setOpenPhase] = useState<number | null>(0)
  const [heroRef, heroIn] = useInView()
  const [salRef, salIn] = useInView()
  const [advRef] = useInView()

  const stats: StatItem[] = [
    { icon: DollarSign, val: "$70K", label: "Avg. Starting Salary", color: "#6366f1" },
    { icon: TrendingUp, val: "+28%", label: "Job Growth (10yr)", color: "#0891b2" },
    { icon: Users, val: "#2", label: "Most In-Demand Tech Role", color: "#059669" },
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
          <button
            className="back-btn"
            onClick={() => window.history.back()}
          >
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
            From Marketing
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #6366f1, #0891b2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              to Data Analyst
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
            You've spent years living inside marketing data. Now it's time to
            make it official — and get paid like an analyst.
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
              <Clock size={13} color="#6366f1" /> ~11 months part-time
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
            Marketing people make extraordinary data analysts. The industry just
            doesn't advertise that yet.
          </h2>

          <p
            style={{
              fontSize: "1.05rem",
              color: "#334155",
              lineHeight: 1.9,
              marginBottom: "1.25rem",
            }}
          >
            Think about what a marketing analyst actually does every day. They
            ask a business question — "Why did conversions drop in Q3?" — and
            then they find the data to answer it. They pull reports, filter by
            segments, compare cohorts, spot patterns, and build a story around
            what the numbers are saying. Then they present it to people who
            don't want to look at spreadsheets.
          </p>

          <p
            style={{
              fontSize: "1.05rem",
              color: "#334155",
              lineHeight: 1.9,
              marginBottom: "1.25rem",
            }}
          >
            If you've been in marketing for more than two years, you've done
            this. Every week. You just did it with dashboards someone else
            built, with metrics someone else defined. The gap between what
            you've been doing and what a data analyst is paid to do is
            surprisingly narrow.
          </p>

          <div className="data-quote">
            "The best analysts I've ever hired came from marketing backgrounds.
            They had something our engineers didn't: they cared about what the
            numbers meant for the business, not just whether the query was
            technically correct."
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
              — Analytics Manager at a growth-stage e-commerce company
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
            The roadmap below bridges a narrow but specific gap: moving from
            reading data to creating it. From interpreting dashboards to
            building them. From knowing what questions to ask to having the
            technical tools to answer them yourself.
          </p>

          <div className="callout-indigo">
            <strong>The honest picture:</strong> Data analysts earn
            significantly more than marketing coordinators and managers in most
            industries. The skills overlap is real, the transition time is
            shorter than most, and the demand for people who understand both the
            technical and business sides is higher than ever.
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
        ref={advRef}
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
            What you bring that a pure technical candidate doesn't
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#334155",
              lineHeight: 1.9,
              marginBottom: "2rem",
            }}
          >
            Companies are drowning in data but starving for insight. They have
            engineers who can write flawless SQL but don't know what questions
            to ask. They have analysts who can build beautiful dashboards but
            don't understand the business context. You come in already
            understanding both sides.
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
            Data roles have among the strongest salary growth curves in tech
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
            Data without business context is just a spreadsheet. You bring the
            context.
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#334155",
              lineHeight: 1.9,
              marginBottom: "1.25rem",
            }}
          >
            The data industry is full of people who can write a flawless Python
            script but can't tell you what the output means for the business.
            They know how to calculate churn but not why it went up last
            quarter. They can build a funnel analysis but wouldn't know which
            stage to prioritise fixing first.
          </p>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#334155",
              lineHeight: 1.9,
              marginBottom: "1.25rem",
            }}
          >
            You've spent years developing exactly that context. You know how
            campaigns work, how audiences behave, how funnels break, and how to
            translate data into a recommendation someone will act on. Add the
            technical skills this roadmap teaches you, and you become something
            genuinely rare: an analyst who is also a strategist.
          </p>
          <div className="data-quote">
            Data is the raw material. Insight is the product. The ability to
            produce insight consistently — not just technically correct
            analysis, but analysis that leads to better decisions — is worth
            significantly more than the ability to write a JOIN.
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
