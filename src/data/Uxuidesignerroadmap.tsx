import React, { useState, useEffect, useRef } from "react"
import {
  ArrowRight, ChevronDown, Clock, DollarSign, TrendingUp, Users,
  BookOpen, Award, Zap, Eye, PenTool, Grid, Rocket, Cpu
} from "lucide-react"

// ─── SHARED GLOBAL CSS ────────────────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,800;0,9..144,900;1,9..144,300;1,9..144,400;1,9..144,600;1,9..144,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --cream:#faf8f4; --cream2:#f5f0e8; --ink:#1c1410; --ink2:#3d2e24;
  --ink3:#6b5447; --ink4:#a08070; --rule:#e8ddd4; --white:#fff;
  --fd:'Fraunces',Georgia,serif; --fu:'DM Sans',system-ui,sans-serif;
}
body{font-family:var(--fu);background:var(--cream);color:var(--ink);overflow-x:hidden}
@keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes barGrow{from{width:0}}
.fade{animation:fadeUp .7s cubic-bezier(.16,1,.3,1) both}
.eyebrow{font-family:var(--fu);font-size:.67rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink4)}
.phase-card{background:var(--white);border:1.5px solid var(--rule);border-radius:18px;overflow:hidden;cursor:pointer;transition:box-shadow .25s,border-color .25s,transform .2s;margin-bottom:10px}
.phase-card:hover{box-shadow:0 8px 32px rgba(28,20,16,.08);transform:translateY(-1px)}
.adv-card{background:var(--white);border:1.5px solid var(--rule);border-radius:14px;padding:1.375rem 1.5rem;transition:box-shadow .25s,transform .2s}
.adv-card:hover{box-shadow:0 6px 24px rgba(28,20,16,.08);transform:translateY(-2px)}
.stat-pill{display:inline-flex;flex-direction:column;align-items:center;background:var(--white);border:1.5px solid var(--rule);border-radius:14px;padding:1.25rem 1.5rem;min-width:112px;text-align:center;transition:border-color .2s}
.resource-pill{display:inline-flex;align-items:center;gap:5px;background:var(--cream2);border:1px solid var(--rule);border-radius:99px;padding:4px 13px;font-size:.74rem;font-weight:600;color:var(--ink3);font-family:var(--fu)}
.back-btn{display:inline-flex;align-items:center;gap:7px;color:var(--ink4);font-size:.85rem;font-weight:600;text-decoration:none;margin-bottom:2.25rem;transition:color .2s;background:none;border:none;cursor:pointer;padding:0;font-family:var(--fu)}
.back-btn:hover{color:var(--ink)}
.pull-quote{border-left:3px solid var(--rule);padding:1.25rem 1.75rem;margin:2rem 0;border-radius:0 14px 14px 0;font-family:var(--fd);font-style:italic;color:var(--ink2);font-size:1.08rem;line-height:1.85;background:var(--cream2)}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.stat-row{display:flex;gap:14px;flex-wrap:wrap}
@media(max-width:640px){.two-col{grid-template-columns:1fr!important}.stat-row{flex-direction:column!important}}
`

function useInView(): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.12 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

// ─── PAGE CONFIG ──────────────────────────────────────────────────────────────
const PAGE = {
  accentA: "#d946ef",
  accentB: "#f97316",
  accentGrad: "linear-gradient(135deg,#d946ef,#f97316)",
  stripe: "linear-gradient(90deg,#d946ef,#f97316,#06b6d4,#10b981,#8b5cf6)",
  from: "Creative Background",
  to: "UX / UI Designer",
  time: "~11 months part-time",
  tagline: "You've spent years making things beautiful. Now it's time to make them useful, too — and get paid like an engineer.",
  stats: [
    { icon: DollarSign, val: "$68K", label: "Avg. Starting Salary", color: "#d946ef" },
    { icon: TrendingUp, val: "+23%", label: "Job Growth (10yr)", color: "#f97316" },
    { icon: Users, val: "High", label: "Demand vs Supply", color: "#10b981" },
    { icon: Clock, val: "11mo", label: "Avg. Time to Hire", color: "#8b5cf6" },
  ]
}

const phases = [
  {
    number:"01", title:"Understand What UX Actually Means", duration:"Weeks 1–4",
    color:"#d946ef", bg:"#fdf4ff", border:"#f0abfc",
    icon: Eye, tagline:"Design isn't what it looks like — it's how it works",
    skills:[
      {name:"The UX Mindset",desc:"UX is problem-solving, not decoration. Your job is to understand what users need, why they struggle, and how to remove friction from their path. If you've ever said 'this could be better' about a product — you already have the instinct.",time:"3 days"},
      {name:"The Design Process",desc:"Empathise → Define → Ideate → Prototype → Test. The double-diamond process is the backbone of every UX project. Learn it deeply, not just the names.",time:"1 week"},
      {name:"User Research Basics",desc:"Interviews, surveys, usability tests — how to gather insights from real people rather than assuming what they want.",time:"1 week"},
      {name:"Information Architecture",desc:"How to organise content so users can find what they need. Card sorting, sitemaps, navigation patterns.",time:"1 week"},
    ],
    resources:["Google UX Design Certificate (Coursera, financial aid available)","Nielsen Norman Group Articles (free)","UX Collective on Medium (free)"],
    milestone:"Conduct 3 user interviews about an app you use daily and write a structured findings report",
    tip:"Creative people often overthink aesthetics and underthink users. The hardest part of becoming a UX designer isn't learning tools — it's learning to separate your taste from what users actually need. Start practising that distinction now.",
  },
  {
    number:"02", title:"Master Visual Design Fundamentals", duration:"Weeks 5–12",
    color:"#f97316", bg:"#fff7ed", border:"#fed7aa",
    icon: PenTool, tagline:"The principles that separate good design from great design",
    skills:[
      {name:"Typography for UI",desc:"Type hierarchy, pairing, scale, line height, letter spacing — how text creates structure, guides attention, and communicates before anyone reads a word.",time:"1.5 weeks"},
      {name:"Colour Theory & Systems",desc:"Primary/secondary palettes, accessibility contrast ratios, dark mode, brand colour usage — design that works for everyone, not just people with perfect vision.",time:"1.5 weeks"},
      {name:"Layout & Grid Systems",desc:"8pt grids, columns, spacing, alignment — the invisible structure that makes interfaces feel ordered and trustworthy.",time:"1 week"},
      {name:"UI Components & Patterns",desc:"Buttons, forms, cards, modals, navigation — the building blocks of every interface and when to use each one.",time:"2 weeks"},
    ],
    resources:["Refactoring UI (book — exceptional)","Google Material Design (free)","Apple HIG (free)"],
    milestone:"Redesign one screen of an app you think is poorly designed — document every decision you made and why",
    tip:"Your creative background is a superpower here, but also a trap. Designers with art backgrounds often over-design. The constraints of UI design — grids, 8pt spacing, accessibility requirements — will feel rigid at first. Embrace them. Structure is what makes creativity usable.",
  },
  {
    number:"03", title:"Learn Figma Deeply", duration:"Weeks 13–20",
    color:"#06b6d4", bg:"#ecfeff", border:"#a5f3fc",
    icon: Cpu, tagline:"The industry-standard tool — and it's free to start",
    skills:[
      {name:"Figma Fundamentals",desc:"Frames, components, auto-layout, constraints, styles — the core Figma workflow used by every design team on earth.",time:"2 weeks"},
      {name:"Design Systems & Components",desc:"Build reusable component libraries. Design tokens, variants, instances — how enterprise design teams work at scale.",time:"2 weeks"},
      {name:"Prototyping & Interactions",desc:"Turn static screens into clickable flows. Smart animate, overlays, scroll triggers — make your work feel alive before any code is written.",time:"1.5 weeks"},
      {name:"Design Handoff",desc:"Inspect panels, developer annotations, redlines — how to communicate your designs to engineers so they build what you actually designed.",time:"1 week"},
    ],
    resources:["Figma's official tutorials (free)","Femke van Schoonhoven YouTube (free)","Figma Community files (free)"],
    milestone:"Rebuild a popular app's core screens in Figma with a proper reusable component library",
    tip:"Figma is not just a tool — it's the language designers and engineers speak together. Get fluent in it the way a writer gets fluent in their word processor. The faster you can execute your ideas in Figma, the more creative you can be.",
  },
  {
    number:"04", title:"Research, Testing & Iteration", duration:"Weeks 21–28",
    color:"#10b981", bg:"#ecfdf5", border:"#a7f3d0",
    icon: Users, tagline:"Great designers validate — they don't just create",
    skills:[
      {name:"Usability Testing",desc:"Think-aloud testing, moderated vs unmoderated, 5-second tests — how to watch real users interact with your design and extract useful, actionable insights.",time:"2 weeks"},
      {name:"A/B Testing Concepts",desc:"How product teams use data to make design decisions. Key metrics: conversion rate, task completion, time-on-task.",time:"1 week"},
      {name:"Accessibility (WCAG)",desc:"AA compliance, colour contrast, keyboard navigation, screen reader compatibility — design that works for everyone is better design for everyone.",time:"1.5 weeks"},
      {name:"Iteration & Design Critique",desc:"How to receive feedback without ego, iterate with purpose, and explain design decisions in terms of user outcomes rather than personal preference.",time:"1 week"},
    ],
    resources:["Maze.design (free tier)","Useberry (free tier)","WebAIM Contrast Checker (free)"],
    milestone:"Run 3 usability tests on your Figma prototype and write a structured, actionable findings report",
    tip:"Testing feels like criticism of your work. It isn't. Every time a user is confused by your design, they're giving you free information that makes your work better. The best designers are obsessively curious about where they got it wrong.",
  },
  {
    number:"05", title:"Build Your Portfolio", duration:"Weeks 29–38",
    color:"#8b5cf6", bg:"#f5f3ff", border:"#ddd6fe",
    icon: Grid, tagline:"Your portfolio is your most important design project",
    skills:[
      {name:"3 Case Studies",desc:"Process-first, outcome-driven portfolio pieces. Each case study shows: the problem, your research, your process, your decisions, and the impact. Not just pretty screens.",time:"4 weeks"},
      {name:"Portfolio Website",desc:"Built in Webflow, Framer, or custom code — your portfolio site is itself a design portfolio piece. Make it distinctive and representative of your taste.",time:"2 weeks"},
      {name:"Speculative Work",desc:"Redesign a product you care about. Solve a real problem in your community. Employers want to see how you think, not just what you've shipped.",time:"1.5 weeks"},
      {name:"Case Study Writing",desc:"Learn to write clearly about design decisions. 'I made it blue because blue is calming' is not a case study. 'We tested 3 approaches and this one reduced drop-off by 40%' is.",time:"1 week"},
    ],
    resources:["Webflow (free tier)","Framer (free tier)","Notion for case study drafting (free)"],
    milestone:"3 published case studies on a live portfolio site — at least one involving real user research with real participants",
    tip:"The number one mistake UX portfolios make is showing only final designs. Show your thinking. Show your mess. Show your iteration. Hiring managers want to know how you solve problems, not just what the final output looked like.",
  },
  {
    number:"06", title:"Land Your First UX Role", duration:"Weeks 39–48",
    color:"#ec4899", bg:"#fdf2f8", border:"#fbcfe8",
    icon: Rocket, tagline:"The design industry is accessible — if you approach it right",
    skills:[
      {name:"Portfolio Presentation",desc:"Walk through a case study in 15 minutes. Explain decisions in terms of user outcomes. Handle design critique gracefully and constructively.",time:"2 weeks"},
      {name:"Design Challenges",desc:"Many companies send take-home challenges. Practice: redesign this screen in 2 hours. Time-box yourself and focus on showing your thinking process.",time:"1 week"},
      {name:"Target Product Companies",desc:"In-house UX roles at startups and product companies offer more growth than agencies. Junior roles at B2B SaaS companies are your highest-volume entry point.",time:"Ongoing"},
      {name:"Resume & LinkedIn",desc:"Lead with your creative background as a strength: 'I bring a visual arts perspective to user-centred design.' Frame it as an asset, not a detour that needs explaining.",time:"1 week"},
    ],
    resources:["ADPList.org (free mentorship)","UX Coffee Hours (free)","Dribbble Job Board (free)"],
    milestone:"Your first UX or product design role offer — where your creativity finally gets paid what it's worth",
    tip:"The UX industry is full of people who came from illustration, architecture, graphic design, and film. Your creative background isn't a liability to explain away. It's a perspective that most developers and product managers simply don't have. Lead with it in every interview.",
  },
]

const salaryData = [
  {label:"Junior UX Designer (0–2 yrs)", range:"$55K–$80K", bar:38, color:"#d946ef"},
  {label:"Mid-Level UX Designer (2–4 yrs)", range:"$80K–$120K", bar:58, color:"#f97316"},
  {label:"Senior UX Designer (4–7 yrs)", range:"$120K–$165K", bar:80, color:"#10b981"},
  {label:"Principal / Design Lead", range:"$165K–$250K+", bar:100, color:"#8b5cf6"},
]

const advantages = [
  {title:"You Already See the World Visually",desc:"Most UX designers struggle to develop a genuine visual sensibility. You've been training yours for years. That's the difference between a competent design and a beautiful one."},
  {title:"You Understand Composition and Flow",desc:"Whether from painting, photography, illustration, or film — you understand how the eye moves through space. UI layout is this exact skill applied to screens."},
  {title:"You're Comfortable with Ambiguity",desc:"Creative work teaches you to work without a brief, to iterate without certainty, and to make judgment calls with incomplete information. Product design demands exactly that."},
  {title:"You Know How to Give and Receive Critique",desc:"Art school and creative work involve regular critique. You've learned to separate yourself from your work and use feedback constructively. Many engineers-turned-designers never learn this."},
]

export default function UXUIRoadmap() {
  const [openPhase, setOpenPhase] = useState<number | null>(0)
  const [heroRef, heroIn] = useInView()
  const [salRef, salIn] = useInView()

  return (
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif",background:"var(--cream)",color:"var(--ink)",overflowX:"hidden"}}>
      <style>{GLOBAL_CSS + `
        .cta-btn{display:inline-flex;align-items:center;gap:8px;background:${PAGE.accentGrad};color:#fff;padding:.875rem 2rem;border-radius:11px;font-size:.92rem;font-weight:700;border:none;cursor:pointer;font-family:var(--fu);text-decoration:none;transition:transform .22s,box-shadow .22s}
        .cta-btn:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(217,70,239,.3)}
        .stat-pill:hover{border-color:${PAGE.accentA}}
      `}</style>

      {/* ACCENT STRIPE */}
      <div style={{height:4,background:PAGE.stripe}} />

      {/* HERO */}
      <section style={{background:"linear-gradient(160deg,var(--cream) 0%,#fdf4ff 45%,#fff7ed 100%)",padding:"4.5rem 6% 3.5rem",borderBottom:"1px solid var(--rule)"}}>
        <div style={{maxWidth:800,margin:"0 auto"}}>
          <button className="back-btn" onClick={() => window.history.back()}>← Back to Career Paths</button>

          <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:"1.5rem"}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:PAGE.accentA,display:"inline-block",animation:"pulse 2s ease-in-out infinite"}} />
            <span className="eyebrow">Career Transition Guide</span>
          </div>

          <h1 ref={heroRef} className={heroIn ? "fade" : ""} style={{fontFamily:"var(--fd)",fontSize:"clamp(2.4rem,5.5vw,4rem)",fontWeight:800,lineHeight:1.08,letterSpacing:"-.02em",marginBottom:"1.25rem",color:"var(--ink)"}}>
            From {PAGE.from}
            <br />
            <span style={{background:PAGE.accentGrad,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
              to {PAGE.to}
            </span>
          </h1>

          <p style={{fontSize:"1.18rem",color:"var(--ink2)",lineHeight:1.85,marginBottom:"2rem",fontFamily:"var(--fd)",fontStyle:"italic"}}>
            {PAGE.tagline}
          </p>

          <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:"2.5rem",alignItems:"center"}}>
            <a href="#roadmap" className="cta-btn">Start the Roadmap <ArrowRight size={16}/></a>
            <span style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:"var(--ink4)",fontWeight:600}}>
              <Clock size={13} color={PAGE.accentA}/> {PAGE.time}
            </span>
          </div>

          <div className="stat-row">
            {PAGE.stats.map((s,i) => (
              <div key={i} className="stat-pill">
                <s.icon size={17} color={s.color} style={{marginBottom:6}} />
                <div style={{fontSize:"1.35rem",fontWeight:800,color:"var(--ink)",lineHeight:1}}>{s.val}</div>
                <div style={{fontSize:".66rem",color:"var(--ink4)",marginTop:4,fontWeight:600,letterSpacing:".04em",textAlign:"center"}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESSAY INTRO */}
      <section style={{padding:"4.5rem 6%",background:"var(--white)",borderBottom:"1px solid var(--rule)"}}>
        <div style={{maxWidth:720,margin:"0 auto"}}>
          <div className="eyebrow" style={{marginBottom:"1.5rem"}}>Before We Begin</div>

          <h2 style={{fontFamily:"var(--fu)",fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:800,letterSpacing:"-.025em",marginBottom:"1.5rem",lineHeight:1.2,color:"var(--ink)"}}>
            The industry has been hiring from the wrong places.
          </h2>

          <p style={{fontSize:"1.05rem",color:"var(--ink2)",lineHeight:1.9,marginBottom:"1.25rem",fontFamily:"var(--fd)"}}>
            For years, tech companies hired engineers to design their products. The results were predictable: powerful, capable, and profoundly cold. Things that worked but that no one wanted to touch. Confusing. Transactional. Without warmth.
          </p>

          <p style={{fontSize:"1.05rem",color:"var(--ink2)",lineHeight:1.9,marginBottom:"1.25rem",fontFamily:"var(--fd)"}}>
            Then they discovered UX. And they went looking for a new kind of person — someone who could bridge the gap between what's technically possible and what people actually want to use. What they found, again and again, was that the best designers came from unexpected places: fine art, graphic design, architecture, illustration, film.
          </p>

          <div className="pull-quote">
            "We don't hire people who know how to use Figma. We hire people who understand how human beings feel when they interact with things. Then we teach them Figma."
            <div style={{marginTop:".75rem",fontSize:".85rem",color:"var(--ink4)",fontStyle:"normal",fontWeight:600,fontFamily:"var(--fu)"}}>
              — Head of Design at a Series B fintech startup
            </div>
          </div>

          <p style={{fontSize:"1.05rem",color:"var(--ink2)",lineHeight:1.9,marginBottom:"1.25rem",fontFamily:"var(--fd)"}}>
            UX/UI Design is the rare career path where coming from a creative background isn't a deviation from the ideal — it is the ideal. The companies that produce the best digital products are the ones that put people with genuine aesthetic sensibility and human empathy in charge of how those products look and feel.
          </p>

          <div style={{background:"#fdf4ff",border:"1px solid #f0abfc",borderRadius:12,padding:"1.125rem 1.5rem"}}>
            <strong>What this roadmap assumes:</strong> You have some creative background — art, design, photography, illustration, film, architecture, or simply an obsession with how things look and feel. You don't need formal design education. You need curiosity, the willingness to learn how users think, and the discipline to learn new tools.
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" style={{padding:"4.5rem 6%",background:"var(--cream2)"}}>
        <div style={{maxWidth:800,margin:"0 auto"}}>
          <div className="eyebrow" style={{marginBottom:".75rem"}}>The Roadmap</div>
          <h2 style={{fontFamily:"var(--fu)",fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:800,letterSpacing:"-.025em",marginBottom:".5rem",color:"var(--ink)"}}>
            Your 6-Phase Journey
          </h2>
          <p style={{color:"var(--ink4)",marginBottom:"2.5rem",fontSize:".95rem"}}>Click each phase to read the full breakdown</p>

          {phases.map((phase, i) => {
            const Icon = phase.icon
            const isOpen = openPhase === i
            return (
              <div key={i} className="phase-card" style={{borderColor: isOpen ? phase.color + "55" : "var(--rule)"}} onClick={() => setOpenPhase(isOpen ? null : i)}>
                <div style={{padding:"1.375rem 1.5rem",display:"flex",alignItems:"center",gap:"1rem"}}>
                  <div style={{width:50,height:50,borderRadius:13,background:phase.bg,border:`1.5px solid ${phase.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <Icon size={20} color={phase.color} />
                  </div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                      <span style={{fontSize:".67rem",fontWeight:800,color:phase.color,letterSpacing:".1em"}}>PHASE {phase.number}</span>
                      <span style={{fontSize:".7rem",color:"var(--ink4)",background:"var(--cream2)",padding:"2px 9px",borderRadius:99,fontWeight:600}}>{phase.duration}</span>
                    </div>
                    <h3 style={{fontSize:"1rem",fontWeight:700,color:"var(--ink)",lineHeight:1.25}}>{phase.title}</h3>
                    <p style={{fontSize:".8rem",color:"var(--ink4)",marginTop:2}}>{phase.tagline}</p>
                  </div>
                  <div style={{color:"var(--ink4)",transform:isOpen?"rotate(180deg)":"rotate(0deg)",transition:"transform .3s",flexShrink:0}}>
                    <ChevronDown size={18} />
                  </div>
                </div>

                {isOpen && (
                  <div style={{padding:"0 1.5rem 1.5rem",borderTop:`1px solid ${phase.color}1a`}}>
                    {/* Skills */}
                    <div style={{marginTop:"1.25rem",marginBottom:"1.5rem"}}>
                      <div className="eyebrow" style={{marginBottom:".75rem"}}>What You'll Learn</div>
                      {phase.skills.map((skill, j) => (
                        <div key={j} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"11px 0",borderBottom:"1px solid var(--cream2)"}}>
                          <div style={{width:7,height:7,borderRadius:"50%",background:phase.color,flexShrink:0,marginTop:7}} />
                          <div style={{flex:1}}>
                            <div style={{fontWeight:700,color:"var(--ink)",fontSize:".9rem",marginBottom:3}}>{skill.name}</div>
                            <div style={{fontSize:".875rem",color:"var(--ink3)",lineHeight:1.7,fontFamily:"var(--fd)"}}>{skill.desc}</div>
                          </div>
                          <div style={{fontSize:".7rem",color:phase.color,fontWeight:700,background:phase.bg,padding:"3px 10px",borderRadius:99,flexShrink:0,whiteSpace:"nowrap"}}>{skill.time}</div>
                        </div>
                      ))}
                    </div>

                    {/* Resources */}
                    <div style={{marginBottom:"1.25rem"}}>
                      <div className="eyebrow" style={{marginBottom:".625rem"}}>Best Resources</div>
                      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                        {phase.resources.map((r, j) => (
                          <span key={j} className="resource-pill"><BookOpen size={10} color={phase.color}/> {r}</span>
                        ))}
                      </div>
                    </div>

                    {/* Milestone */}
                    <div style={{background:phase.bg,border:`1px solid ${phase.border}`,borderRadius:11,padding:"1rem 1.25rem",marginBottom:".875rem",display:"flex",gap:10,alignItems:"flex-start"}}>
                      <Award size={16} color={phase.color} style={{flexShrink:0,marginTop:2}} />
                      <div>
                        <div style={{fontSize:".67rem",fontWeight:800,color:phase.color,letterSpacing:".08em",marginBottom:3}}>PHASE MILESTONE</div>
                        <div style={{fontSize:".875rem",color:"var(--ink2)",fontWeight:600,lineHeight:1.5}}>{phase.milestone}</div>
                      </div>
                    </div>

                    {/* Tip */}
                    <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:11,padding:"1rem 1.25rem",display:"flex",gap:10,alignItems:"flex-start"}}>
                      <Zap size={14} color="#d97706" style={{flexShrink:0,marginTop:2}} />
                      <div style={{fontSize:".875rem",color:"#78350f",lineHeight:1.7,fontFamily:"var(--fd)",fontStyle:"italic"}}>"{phase.tip}"</div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* UNFAIR ADVANTAGE */}
      <section style={{padding:"4.5rem 6%",background:"var(--white)",borderTop:"1px solid var(--rule)",borderBottom:"1px solid var(--rule)"}}>
        <div style={{maxWidth:760,margin:"0 auto"}}>
          <div className="eyebrow" style={{marginBottom:"1.5rem"}}>Your Unfair Advantage</div>
          <h2 style={{fontFamily:"var(--fu)",fontSize:"clamp(1.5rem,3vw,2rem)",fontWeight:800,letterSpacing:"-.025em",marginBottom:"1.25rem",color:"var(--ink)"}}>
            What you bring that a CS graduate doesn't
          </h2>
          <p style={{fontSize:"1.05rem",color:"var(--ink2)",lineHeight:1.9,marginBottom:"2rem",fontFamily:"var(--fd)"}}>
            The tech industry is full of extremely capable engineers who cannot design their way out of a grid system. You bring something they spent years trying to acquire and often never do.
          </p>
          <div className="two-col" style={{marginBottom:"2rem"}}>
            {advantages.map((item, i) => (
              <div key={i} className="adv-card">
                <div style={{fontWeight:700,fontSize:".9rem",color:"var(--ink)",marginBottom:6}}>{item.title}</div>
                <div style={{fontSize:".875rem",color:"var(--ink3)",lineHeight:1.7,fontFamily:"var(--fd)"}}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SALARY */}
      <section style={{padding:"4.5rem 6%",background:"var(--cream2)"}}>
        <div ref={salRef} style={{maxWidth:680,margin:"0 auto"}}>
          <div className="eyebrow" style={{marginBottom:".75rem"}}>Earning Potential</div>
          <h2 style={{fontFamily:"var(--fu)",fontSize:"clamp(1.5rem,3vw,2rem)",fontWeight:800,letterSpacing:"-.025em",marginBottom:".5rem",color:"var(--ink)"}}>What You'll Earn</h2>
          <p style={{color:"var(--ink4)",marginBottom:"2.5rem",fontSize:".9rem"}}>UX salaries rival engineering roles at the senior level</p>
          <div style={{display:"flex",flexDirection:"column",gap:"1.25rem"}}>
            {salaryData.map((s, i) => (
              <div key={i}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{fontSize:".875rem",fontWeight:600,color:"var(--ink2)"}}>{s.label}</span>
                  <span style={{fontSize:".875rem",fontWeight:800,color:s.color}}>{s.range}</span>
                </div>
                <div style={{height:6,background:"var(--rule)",borderRadius:99,overflow:"hidden"}}>
                  <div style={{height:"100%",width:salIn?`${s.bar}%`:"0%",background:s.color,borderRadius:99,transition:`width 1.2s ease ${i*.15}s`}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section style={{padding:"4.5rem 6%",background:"var(--white)",borderTop:"1px solid var(--rule)"}}>
        <div style={{maxWidth:680,margin:"0 auto"}}>
          <div className="eyebrow" style={{marginBottom:"1.5rem"}}>A Final Word</div>
          <h2 style={{fontFamily:"var(--fu)",fontSize:"clamp(1.5rem,3vw,2rem)",fontWeight:800,letterSpacing:"-.025em",marginBottom:"1.25rem",color:"var(--ink)"}}>
            Design is one of the few careers where taste is a job requirement
          </h2>
          <p style={{fontSize:"1.05rem",color:"var(--ink2)",lineHeight:1.9,marginBottom:"1.25rem",fontFamily:"var(--fd)"}}>
            The tech industry produces an almost infinite supply of engineers. What it cannot produce in a bootcamp or a computer science degree is genuine aesthetic intelligence — the ability to look at something and know, viscerally, that it could be better. That something is wrong even if you can't yet articulate what.
          </p>
          <p style={{fontSize:"1.05rem",color:"var(--ink2)",lineHeight:1.9,marginBottom:"1.25rem",fontFamily:"var(--fd)"}}>
            That ability is yours. It was built over years of looking at, making, and caring about how things appear in the world. This roadmap gives you the vocabulary and the tools to apply it to software. The rest — the taste, the eye, the instinct — you already have.
          </p>
          <div className="pull-quote">
            What the best products have in common is not that they were built by the most technically sophisticated teams. It's that someone, somewhere, cared deeply about how they felt to use.
          </div>
          <div style={{marginTop:"2.5rem",display:"flex",gap:"1rem",flexWrap:"wrap",alignItems:"center"}}>
            <a href="#roadmap" className="cta-btn">Start Phase 01 Today <ArrowRight size={16}/></a>
            <a href="/roadmaps" style={{fontSize:".9rem",fontWeight:600,color:"var(--ink4)",textDecoration:"none"}}>← Browse All Paths</a>
          </div>
        </div>
      </section>
    </div>
  )
}