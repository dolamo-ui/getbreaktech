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
  Shield,
  Server,
  Eye,
  Terminal,
  AlertTriangle,
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
    title: "Solidify Your IT Foundations",
    duration: "Weeks 1–4",
    color: "#6366f1",
    bg: "#eef2ff",
    border: "#c7d2fe",
    icon: Server,
    tagline: "Your IT background is already a head start — now make it airtight",
    skills: [
      {
        name: "Networking Deep Dive",
        desc: "TCP/IP, DNS, DHCP, VLANs, firewalls, subnetting — the protocols that underpin every attack and every defence. If you've been doing IT support, you already know most of this. Now understand it at the packet level.",
        time: "1.5 weeks",
      },
      {
        name: "OS Internals",
        desc: "Windows Active Directory, Linux CLI, file systems, process management, registry — attackers exploit OS behaviour. Defenders need to understand it just as deeply. Your helpdesk experience here is genuinely worth years.",
        time: "1 week",
      },
      {
        name: "Virtualisation Labs",
        desc: "Set up your home lab using VirtualBox or VMware. One Windows machine, one Kali Linux. This is your private range — where you break things, test attacks, and learn without consequences. Every serious analyst has one.",
        time: "1 week",
      },
      {
        name: "CompTIA Network+ Review",
        desc: "If you don't already hold Network+, close any gaps now. The exam is less important than the knowledge — subnetting, switching, routing, wireless protocols. Cybersecurity is applied networking.",
        time: "0.5 weeks",
      },
    ],
    resources: [
      "Professor Messer (free)",
      "TryHackMe (free tier)",
      "NetworkChuck YouTube (free)",
    ],
    milestone:
      "Build a home lab with 2+ VMs — one Windows, one Kali Linux — and document it publicly",
    tip: "You already know more than you think. IT support taught you how systems break. Cybersecurity is just the next chapter — learning how attackers exploit those same breakpoints on purpose.",
  },
  {
    number: "02",
    title: "Security Foundations & CompTIA Security+",
    duration: "Weeks 5–12",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    icon: Shield,
    tagline: "The credential that opens 97% of entry-level cybersecurity doors",
    skills: [
      {
        name: "Threats & Vulnerabilities",
        desc: "Malware types, social engineering, injection attacks, zero-days, ransomware — understand the attacker's full toolkit. You can't defend against what you don't understand.",
        time: "2 weeks",
      },
      {
        name: "Cryptography Basics",
        desc: "Symmetric and asymmetric encryption, hashing, PKI, digital certificates, TLS — the mathematical backbone of every secure system. You don't need the maths. You need to understand when each method applies.",
        time: "1 week",
      },
      {
        name: "Identity & Access Management",
        desc: "MFA, SSO, RBAC, least privilege, privileged access management — the single biggest source of breaches is identity mismanagement. These concepts appear in every security role on earth.",
        time: "1 week",
      },
      {
        name: "Security+ Exam Preparation",
        desc: "Practice exams, timed tests, exam technique — Security+ is performance-based as well as multiple choice. The preparation discipline matters as much as the knowledge.",
        time: "2 weeks",
      },
    ],
    resources: [
      "Professor Messer Security+ (free)",
      "Jason Dion Practice Tests",
      "CompTIA CertMaster",
    ],
    milestone:
      "Pass CompTIA Security+ — your first industry-recognised cybersecurity credential",
    tip: "Security+ is the golden ticket to the first role. 97% of employers recognise it. DoD 8570 compliance requires it. Get this done before anything else — it validates every subsequent skill you build.",
  },
  {
    number: "03",
    title: "Blue Team & SOC Analyst Skills",
    duration: "Weeks 13–22",
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    icon: Eye,
    tagline: "Detect threats. Investigate incidents. Contain damage.",
    skills: [
      {
        name: "SIEM & Log Analysis",
        desc: "Splunk, Microsoft Sentinel, IBM QRadar — parse enormous volumes of logs, correlate events, surface anomalies. SIEM is the primary tool of every SOC analyst. Learn to read what the logs are telling you.",
        time: "2 weeks",
      },
      {
        name: "Incident Response",
        desc: "The IR lifecycle: preparation, identification, containment, eradication, recovery, lessons learned. Build playbooks. Practice the decision trees. An analyst who can run IR calmly under pressure is invaluable.",
        time: "2 weeks",
      },
      {
        name: "Threat Intelligence",
        desc: "MITRE ATT&CK framework, indicators of compromise, threat actor TTPs, threat hunting basics — understand how adversaries operate so you can anticipate, not just react.",
        time: "1.5 weeks",
      },
      {
        name: "Vulnerability Management",
        desc: "Nessus, OpenVAS, Tenable — scan environments, prioritise findings by severity and exploitability, write reports that stakeholders can act on. Vulnerability triage is a core analyst skill.",
        time: "1.5 weeks",
      },
    ],
    resources: [
      "Blue Team Labs Online (free tier)",
      "Splunk Free Training",
      "MITRE ATT&CK (free)",
    ],
    milestone:
      "Complete 10 hands-on SOC labs and write 3 incident response reports from scratch",
    tip: "Most entry-level cybersecurity roles are SOC Analyst Level 1. This is the phase that makes you directly hireable. Master it and you qualify for thousands of open positions right now.",
  },
  {
    number: "04",
    title: "Hands-On Platforms & CTF Competitions",
    duration: "Weeks 23–30",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
    icon: Terminal,
    tagline: "Practical experience beats every certificate in an interview",
    skills: [
      {
        name: "TryHackMe Learning Paths",
        desc: "The SOC Level 1 path — 60+ guided, browser-based rooms. No setup required. Covers network analysis, malware analysis, threat intelligence, SIEM, and more. The closest thing to on-the-job training that exists for free.",
        time: "3 weeks",
      },
      {
        name: "Hack The Box Starting Point",
        desc: "Real attack-and-defend scenarios with community writeups. Harder than TryHackMe, but the prestige is higher. A completed HTB profile on your resume signals serious intent to any hiring manager.",
        time: "2 weeks",
      },
      {
        name: "CTF Competitions",
        desc: "picoCTF, CTFtime.org — compete in forensics, cryptography, web hacking, and reverse engineering challenges. CTFs teach you to think like an adversary. Mention competition placements in your application.",
        time: "1 week",
      },
      {
        name: "Python for Security Automation",
        desc: "Log parsing, port scanning, alerting scripts — you don't need to be a developer. You need enough Python to automate repetitive SOC tasks and stand out from analysts who can't script at all.",
        time: "1 week",
      },
    ],
    resources: [
      "TryHackMe SOC L1 Path (free)",
      "Hack The Box (free tier)",
      "picoCTF (free)",
    ],
    milestone:
      "Complete TryHackMe SOC Level 1 path in full and participate in 2 CTF events",
    tip: "TryHackMe's SOC Level 1 path is the single best free resource in this roadmap. If you only have time for one platform, make it this one. The structured progression mirrors how real SOC teams operate.",
  },
  {
    number: "05",
    title: "Portfolio, Certifications & LinkedIn",
    duration: "Weeks 31–38",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    icon: Award,
    tagline: "Document your skills in a way that survives the first 10-second resume scan",
    skills: [
      {
        name: "CySA+ Certification",
        desc: "The natural successor to Security+ for analysts — behavioural analytics, threat hunting, incident response. CySA+ signals you are beyond entry-level. Add it after your SOC lab work and it lands with far more credibility.",
        time: "3 weeks",
      },
      {
        name: "GitHub Security Portfolio",
        desc: "Document your home lab builds, TryHackMe writeups, and Python scripts publicly on GitHub. Hiring managers will look. A well-maintained GitHub profile is evidence of sustained effort — something no certificate can fake.",
        time: "1 week",
      },
      {
        name: "Blog or LinkedIn Articles",
        desc: "Write three short posts: how you set up your home lab, a CTF challenge walkthrough, an incident you investigated in a simulation. Writing about what you've learned forces precision and signals communication skills.",
        time: "1 week",
      },
      {
        name: "LinkedIn Profile Optimisation",
        desc: "Keywords matter: SOC Analyst, SIEM, Splunk, incident response, threat intelligence, MITRE ATT&CK. Recruiters are searching these terms daily. Your profile either appears or it doesn't.",
        time: "3 days",
      },
    ],
    resources: [
      "Jason Dion CySA+ Course",
      "Medium / Hashnode (free blogging)",
      "LinkedIn (free)",
    ],
    milestone:
      "CySA+ certification in progress + public portfolio with 5 or more documented security projects",
    tip: "A write-up showing you investigated a real simulated security incident — logs, timeline, containment decision, lessons learned — is more impressive to a hiring manager than any certificate. Show the thinking, not just the outcome.",
  },
  {
    number: "06",
    title: "Land Your First SOC Role",
    duration: "Weeks 39–48",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
    icon: AlertTriangle,
    tagline: "Your IT experience is the differentiator — translate it into security language",
    skills: [
      {
        name: "Resume Translation",
        desc: "Every IT support task maps to a security skill. 'Troubleshot network issues' becomes 'identified and isolated anomalous network behaviour.' Rewrite your history in the language of the role you're targeting.",
        time: "1 week",
      },
      {
        name: "Interview Preparation",
        desc: "SOC scenario walkthroughs: you receive a SIEM alert, what do you do next? Practice explaining your investigation methodology out loud. Technical interviews test your reasoning process, not just your answers.",
        time: "2 weeks",
      },
      {
        name: "MSSP Applications",
        desc: "Managed Security Service Providers hire the most entry-level analysts. The experience is intense, the breadth is huge, and after 12 to 18 months you become attractive to every in-house security team that exists.",
        time: "Ongoing",
      },
      {
        name: "Government & Public Sector",
        desc: "DoD, CISA, defence contractors — often more willing to train candidates with potential than the private sector. Many roles specifically value IT support backgrounds over pure security graduates.",
        time: "Ongoing",
      },
    ],
    resources: [
      "CyberSeek.org (free career map)",
      "SANS Community Slack (free)",
      "Indeed + LinkedIn Job Alerts",
    ],
    milestone:
      "First SOC Analyst offer — your first day defending real infrastructure",
    tip: "Apply to MSSPs first. They hire the most junior talent, they train aggressively, and the exposure is unmatched. Spend 12 to 18 months there, then move to an in-house role at twice the salary. It is the fastest path that consistently works.",
  },
]

const salaryData: SalaryRow[] = [
  {
    label: "SOC Analyst L1 (0–2 yrs)",
    range: "$55K–$80K",
    bar: 38,
    color: "#6366f1",
  },
  {
    label: "SOC Analyst L2 (2–4 yrs)",
    range: "$80K–$110K",
    bar: 56,
    color: "#0891b2",
  },
  {
    label: "Security Engineer (4–6 yrs)",
    range: "$110K–$160K",
    bar: 76,
    color: "#059669",
  },
  {
    label: "Security Architect / CISO",
    range: "$160K–$300K+",
    bar: 100,
    color: "#7c3aed",
  },
]

const advantages: AdvantageItem[] = [
  {
    title: "You Already Understand How Systems Fail",
    desc: "IT support is a masterclass in failure modes. You've seen misconfigurations, corrupted permissions, broken authentication flows, and rogue processes — all of which are exactly what attackers exploit. Most cybersecurity graduates have never seen a production system in distress. You have.",
  },
  {
    title: "You Know How to Stay Calm Under Pressure",
    desc: "Incident response requires composure. When a ransomware alert fires at 2am, the analyst who panics makes it worse. IT support trained you to triage calmly, communicate clearly, and work the problem. That is a rare and genuinely valuable skill in a SOC.",
  },
  {
    title: "You Speak Both Technical and Human",
    desc: "Analysts who can explain a security incident to a non-technical stakeholder are worth significantly more than those who can't. Your helpdesk work required translating technical problems for frustrated users. That communication skill transfers directly to security briefings.",
  },
  {
    title: "You've Already Built a Lab Mindset",
    desc: "Good IT support people have always tested things, built workarounds, and learned by breaking stuff in safe environments. That mindset — curious, methodical, hands-on — is identical to what makes an exceptional security analyst.",
  },
]

export default function CybersecurityAnalystRoadmapPage(): React.ReactElement {
  const [openPhase, setOpenPhase] = useState<number | null>(0)
  const [heroRef, heroIn] = useInView()
  const [salRef, salIn] = useInView()

  const stats: StatItem[] = [
    { icon: DollarSign, val: "$80K", label: "Avg. Starting Salary", color: "#6366f1" },
    { icon: TrendingUp, val: "+35%", label: "Job Growth (10yr)", color: "#0891b2" },
    { icon: Users, val: "3.5M", label: "Unfilled Global Jobs", color: "#059669" },
    { icon: Clock, val: "9mo", label: "Avg. Time to Hire", color: "#d97706" },
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
            From IT Support
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #6366f1, #0891b2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              to Cybersecurity Analyst
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
            You already speak the language of systems, networks, and
            troubleshooting. Cybersecurity is the next chapter — and your IT
            background puts you years ahead of career changers starting from
            scratch.
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
              <Clock size={13} color="#6366f1" /> ~9–11 months part-time
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
            IT support people make extraordinary security analysts. The gap is
            narrower than the job titles suggest.
          </h2>

          <p
            style={{
              fontSize: "1.05rem",
              color: "#334155",
              lineHeight: 1.9,
              marginBottom: "1.25rem",
            }}
          >
            Think about what a SOC analyst actually does every day. They receive
            an alert, they investigate a system, they trace the origin of
            something suspicious, they contain the damage, and they explain what
            happened to people who don't want to read log files. If you've spent
            time in IT support, you've done every single one of those things —
            just without the security framing.
          </p>

          <p
            style={{
              fontSize: "1.05rem",
              color: "#334155",
              lineHeight: 1.9,
              marginBottom: "1.25rem",
            }}
          >
            The difference between what you've been doing and what a
            cybersecurity analyst is paid to do is a set of specific technical
            skills, a different vocabulary, and a shift in perspective from
            fixing systems to defending them. That gap closes faster than most
            people expect — especially when you already understand what's
            underneath.
          </p>

          <div className="data-quote">
            "The best SOC analysts I've ever worked with came from helpdesk
            backgrounds. They already knew how to stay calm when everything is
            on fire, how to communicate to stressed stakeholders, and how to
            think through problems methodically. We taught them the security
            tools in weeks."
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
              — Security Operations Manager, Fortune 500 financial services firm
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
            The roadmap below bridges a specific technical gap: moving from
            managing systems to defending them. From responding to user tickets
            to responding to security incidents. From knowing how networks work
            to understanding how they get attacked and how to stop it.
          </p>

          <div className="callout-indigo">
            <strong>The honest picture:</strong> Cybersecurity analysts earn
            significantly more than IT support roles at every level of
            experience. The global skills shortage is real — 3.5 million
            unfilled positions worldwide. And companies are actively looking for
            people who combine technical IT knowledge with security training.
            That combination is rarer than either skill alone.
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
            What you bring that a pure security-theory candidate doesn't
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#334155",
              lineHeight: 1.9,
              marginBottom: "2rem",
            }}
          >
            Security teams are full of people who understand attack frameworks
            and can recite MITRE ATT&CK tactics — but have never managed a live
            system under pressure, never talked a panicked user through a
            ransomware incident, never had to figure out why the network was
            behaving strangely at 3am on a Friday. Your IT background covers
            all of that. Add the security layer and you become something the
            industry genuinely struggles to find.
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
            Cybersecurity salaries are among the fastest-growing in tech, with
            a shortage that keeps compensation rising
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
            Security without systems knowledge is theory. You bring the systems
            knowledge.
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#334155",
              lineHeight: 1.9,
              marginBottom: "1.25rem",
            }}
          >
            The cybersecurity industry is full of people who can name every
            MITRE ATT&CK technique but freeze when they have to explain why a
            particular Windows process is behaving strangely, or how an
            attacker actually moves laterally through an Active Directory
            environment, or what the network logs would look like at the moment
            of compromise. That operational knowledge comes from working with
            systems — which you have done.
          </p>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#334155",
              lineHeight: 1.9,
              marginBottom: "1.25rem",
            }}
          >
            Add the security layer this roadmap teaches you — the frameworks,
            the certifications, the detection and response tools — and you
            become something rare: a defender who genuinely understands what
            they are defending. That combination is exactly what the industry
            has been struggling to hire for over a decade.
          </p>
          <div className="data-quote">
            The cybersecurity skills gap is not a myth. 3.5 million positions go
            unfilled globally every year — not because the industry doesn't want
            to hire, but because it can't find people who combine technical
            knowledge with the composure and communication that security work
            demands. IT support people have both. They just haven't made the
            move yet.
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
            <a
              href="/roadmaps"
              className="sans"
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#94a3b8",
                textDecoration: "none",
              }}
            >
              ← Browse All Paths
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}