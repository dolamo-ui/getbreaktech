import React, { useState, useEffect, useRef } from "react"
import { ArrowRight, Shield, Lock, Eye, Terminal, Server, Bug, AlertTriangle, ChevronDown, Clock, TrendingUp, Users, DollarSign, BookOpen, Award, Zap, CheckCircle2 } from "lucide-react"

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
    title: "Solidify IT Fundamentals",
    duration: "Weeks 1–4",
    color: "#22c55e",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    icon: Server,
    tagline: "Your IT background is already a head start",
    skills: [
      { name: "Networking Deep Dive", desc: "TCP/IP, DNS, DHCP, VLANs, firewalls, subnetting — know it cold", time: "1.5 weeks" },
      { name: "OS Internals", desc: "Windows Active Directory, Linux CLI, file systems, processes", time: "1 week" },
      { name: "Virtualization Labs", desc: "Set up your home lab: VirtualBox, VMware — practice safely", time: "1 week" },
      { name: "CompTIA Network+ Review", desc: "Fill any knowledge gaps — especially if you don't hold this yet", time: "0.5 weeks" },
    ],
    resources: ["Professor Messer (free)", "TryHackMe (free tier)", "NetworkChuck YouTube (free)"],
    milestone: "Build a home lab with 2+ VMs: one Windows, one Kali Linux",
    tip: "You already know more than you think. IT Support taught you how systems break. Now you'll learn how attackers exploit that.",
  },
  {
    number: "02",
    title: "Security Foundations & CompTIA Security+",
    duration: "Weeks 5–12",
    color: "#3b82f6",
    bg: "#eff6ff",
    border: "#bfdbfe",
    icon: Shield,
    tagline: "Get the cert that opens every door",
    skills: [
      { name: "Threats & Vulnerabilities", desc: "Malware, social engineering, injection attacks, zero-days", time: "2 weeks" },
      { name: "Cryptography Basics", desc: "Symmetric/asymmetric encryption, hashing, PKI, certificates", time: "1 week" },
      { name: "Identity & Access Mgmt", desc: "MFA, SSO, RBAC, least privilege — the pillars of access control", time: "1 week" },
      { name: "Security+ Exam Prep", desc: "Practice exams, Darril Gibson book, exam technique", time: "2 weeks" },
    ],
    resources: ["Professor Messer Security+ (free)", "Jason Dion Practice Tests", "CompTIA CertMaster"],
    milestone: "Pass CompTIA Security+ — your first industry-recognized cybersecurity credential",
    tip: "Security+ is the golden ticket to entry-level cybersecurity. 97% of employers recognize it. Get this first.",
  },
  {
    number: "03",
    title: "Blue Team & SOC Skills",
    duration: "Weeks 13–22",
    color: "#06b6d4",
    bg: "#ecfeff",
    border: "#a5f3fc",
    icon: Eye,
    tagline: "Detect, investigate, respond",
    skills: [
      { name: "SIEM & Log Analysis", desc: "Splunk, Microsoft Sentinel — parse logs, find anomalies", time: "2 weeks" },
      { name: "Incident Response", desc: "IR lifecycle, containment, eradication, recovery playbooks", time: "2 weeks" },
      { name: "Threat Intelligence", desc: "MITRE ATT&CK framework, IOCs, threat hunting basics", time: "1.5 weeks" },
      { name: "Vulnerability Management", desc: "Nessus, OpenVAS — scan, prioritize, report findings", time: "1.5 weeks" },
    ],
    resources: ["Blue Team Labs Online (free tier)", "Splunk Free Training", "MITRE ATT&CK (free)"],
    milestone: "Complete 10 hands-on SOC labs and write 3 incident response reports",
    tip: "Most entry cybersecurity roles are SOC Analyst Level 1. Master this phase and you're hireable.",
  },
  {
    number: "04",
    title: "Hands-On Platforms & CTFs",
    duration: "Weeks 23–30",
    color: "#a855f7",
    bg: "#faf5ff",
    border: "#e9d5ff",
    icon: Terminal,
    tagline: "Experience beats certificates every time",
    skills: [
      { name: "TryHackMe Learning Paths", desc: "SOC Level 1 path — 60+ guided rooms, all beginner-friendly", time: "3 weeks" },
      { name: "Hack The Box Starting Point", desc: "Real attack-and-defend scenarios, community writeups", time: "2 weeks" },
      { name: "CTF Competitions", desc: "picoCTF, CTFtime.org — practice forensics, crypto, web hacking", time: "1 week" },
      { name: "Python for Security", desc: "Automate log parsing, write simple scripts for security tasks", time: "1 week" },
    ],
    resources: ["TryHackMe SOC L1 Path (free)", "Hack The Box (free)", "picoCTF (free)"],
    milestone: "Complete TryHackMe SOC Level 1 path + 2 CTF events",
    tip: "TryHackMe's SOC Level 1 path is the closest thing to on-the-job training you can get for free.",
  },
  {
    number: "05",
    title: "Portfolio & Certifications",
    duration: "Weeks 31–38",
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
    icon: Award,
    tagline: "Document your skills in a way employers can verify",
    skills: [
      { name: "CySA+ or CEH Prep", desc: "CySA+ is the natural next cert after Security+ for analysts", time: "3 weeks" },
      { name: "GitHub Security Portfolio", desc: "Document your labs, write-ups, and projects publicly", time: "1 week" },
      { name: "Home Lab Documentation", desc: "Blog posts or LinkedIn articles showing your setups and findings", time: "1 week" },
      { name: "LinkedIn Optimization", desc: "Keywords, featured section, skill endorsements from your IT peers", time: "3 days" },
    ],
    resources: ["Jason Dion CySA+ Course", "Medium / Hashnode (free blogging)", "LinkedIn Premium (1 mo free trial)"],
    milestone: "CySA+ cert + public portfolio with 5+ documented security projects",
    tip: "A write-up showing you investigated a real (simulated) security incident is more impressive than any cert.",
  },
  {
    number: "06",
    title: "Land Your SOC Role",
    duration: "Weeks 39–48",
    color: "#ef4444",
    bg: "#fef2f2",
    border: "#fecaca",
    icon: AlertTriangle,
    tagline: "The job search is a numbers game — play it smart",
    skills: [
      { name: "Resume Tailoring", desc: "Map your IT experience to security language — use the STAR format", time: "1 week" },
      { name: "Interview Prep", desc: "SOC scenario questions, explain security concepts clearly, practice aloud", time: "2 weeks" },
      { name: "MSSP Targets", desc: "Apply to MSSPs first — they hire the most entry-level analysts", time: "Ongoing" },
      { name: "Government & Defense", desc: "DoD, CISA, FBI internships — often easier to break into than big tech", time: "Ongoing" },
    ],
    resources: ["CyberSeek.org (free career map)", "SANS Community Slack (free)", "Indeed + LinkedIn Job Alerts"],
    milestone: "First SOC Analyst offer — your first day defending real infrastructure.",
    tip: "Apply to MSSPs (Managed Security Service Providers). They hire the most junior talent. Get the experience, then move up.",
  },
]

const salaryData = [
  { label: "SOC Analyst L1 (0–2 yrs)", range: "$55K–$80K", bar: 40, color: "#22c55e" },
  { label: "SOC Analyst L2 (2–4 yrs)", range: "$80K–$110K", bar: 60, color: "#3b82f6" },
  { label: "Security Engineer (4–6 yrs)", range: "$110K–$160K", bar: 80, color: "#a855f7" },
  { label: "Security Architect / CISO", range: "$160K–$300K+", bar: 100, color: "#f59e0b" },
]

export default function CybersecurityAnalystRoadmapPage() {
  const [openPhase, setOpenPhase] = useState<number | null>(0)
  const [heroRef, heroIn] = useInView()
  const [salRef, salIn] = useInView()

  return (
    <div style={{ fontFamily: "'Outfit', system-ui, sans-serif", background: "#050a0a", color: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        @keyframes scan{0%{transform:translateY(-100%)}100%{transform:translateY(100%)}}
        .fade{animation:fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both}
        .phase-card{background:#0a0f0a;border:1.5px solid #0f1f0f;border-radius:20px;overflow:hidden;transition:all 0.3s;cursor:pointer}
        .phase-card:hover{background:#0d150d}
        .skill-row{display:flex;gap:12px;align-items:flex-start;padding:12px 0;border-bottom:1px solid #0f1f0f}
        .skill-row:last-child{border-bottom:none}
        .resource-pill{display:inline-flex;align-items:center;gap:6px;background:#0a120a;border:1px solid #1a2a1a;border-radius:99px;padding:4px 12px;font-size:12px;color:#6b7f6b;font-weight:600}
        .stat-box{background:#0a0f0a;border:1.5px solid #0f1f0f;border-radius:16px;padding:1.5rem;text-align:center;transition:all 0.3s}
        .stat-box:hover{border-color:#22c55e40;transform:translateY(-3px)}
        .back-btn{display:inline-flex;align-items:center;gap:8px;color:#445544;font-size:14px;font-weight:600;text-decoration:none;margin-bottom:2rem;transition:color 0.2s;background:none;border:none;cursor:pointer;padding:0;font-family:inherit}
        .back-btn:hover{color:#22c55e}
        .cta-btn{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;padding:1rem 2rem;border-radius:14px;font-size:1rem;font-weight:800;border:none;cursor:pointer;font-family:inherit;text-decoration:none;transition:all 0.3s}
        .cta-btn:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(34,197,94,0.35)}
      `}</style>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #050a05 0%, #071207 50%, #050a05 100%)", padding: "5rem 5% 4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #22c55e, #3b82f6, #a855f7, #22c55e)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(34,197,94,0.03) 39px, rgba(34,197,94,0.03) 40px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.07), transparent 60%)", pointerEvents: "none" }} />

        <div ref={heroRef} style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <button className="back-btn" onClick={() => window.history.back()}>← Back to Roadmaps</button>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", color: "#22c55e", fontSize: "0.72rem", fontWeight: 700, padding: "0.4rem 1rem", borderRadius: 30, marginBottom: "1.5rem", letterSpacing: "0.1em" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
            CAREER TRANSITION ROADMAP
          </div>

          <h1 className={heroIn ? "fade" : ""} style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "1.25rem" }}>
            IT Support →{" "}
            <span style={{ background: "linear-gradient(90deg, #22c55e, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Cybersecurity Analyst</span>
          </h1>

          <p className={heroIn ? "fade" : ""} style={{ fontSize: "1.15rem", color: "#4a6b4a", lineHeight: 1.75, maxWidth: 620, marginBottom: "2.5rem", animationDelay: "0.1s" }}>
            You already speak the language of systems, networks, and troubleshooting. Cybersecurity is the next chapter — and your IT background puts you years ahead of career changers starting from scratch.
          </p>

          <div className={heroIn ? "fade" : ""} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem", animationDelay: "0.2s" }}>
            <a href="#roadmap" className="cta-btn">Start the Roadmap <ArrowRight size={18} /></a>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#445544", fontSize: 14 }}>
              <Clock size={14} color="#22c55e" /> ~9–11 months part-time
            </div>
          </div>

          <div className={heroIn ? "fade" : ""} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", animationDelay: "0.3s" }}>
            {[
              { icon: DollarSign, val: "$80K", label: "Avg. Starting Salary", color: "#22c55e" },
              { icon: TrendingUp, val: "+35%", label: "Job Growth (10yr)", color: "#3b82f6" },
              { icon: Shield, val: "3.5M", label: "Unfilled Global Jobs", color: "#a855f7" },
              { icon: Clock, val: "9mo", label: "Avg. Time to Hire", color: "#06b6d4" },
            ].map((s, i) => (
              <div key={i} className="stat-box">
                <s.icon size={20} color={s.color} style={{ marginBottom: 8 }} />
                <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#cde8cd", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: "0.72rem", color: "#3a5a3a", marginTop: 4, fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHASES */}
      <section id="roadmap" style={{ padding: "5rem 5%", background: "#050a05" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "0.5rem", textAlign: "center", color: "#cde8cd" }}>
            Your 6-Phase Journey
          </h2>
          <p style={{ color: "#3a5a3a", marginBottom: "3rem", textAlign: "center" }}>Click each phase to expand</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {phases.map((phase, i) => {
              const Icon = phase.icon
              const isOpen = openPhase === i
              return (
                <div key={i} className="phase-card" style={{ borderColor: isOpen ? phase.color + "40" : "#0f1f0f" }} onClick={() => setOpenPhase(isOpen ? null : i)}>
                  <div style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: phase.bg, border: `1.5px solid ${phase.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={22} color={phase.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: 800, color: phase.color, letterSpacing: "0.1em" }}>PHASE {phase.number}</span>
                        <span style={{ fontSize: "0.72rem", color: "#3a5a3a", background: "#0a120a", padding: "2px 10px", borderRadius: 99, fontWeight: 600 }}>{phase.duration}</span>
                      </div>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#cde8cd", lineHeight: 1.2 }}>{phase.title}</h3>
                      <p style={{ fontSize: "0.82rem", color: "#3a5a3a", marginTop: 2 }}>{phase.tagline}</p>
                    </div>
                    <div style={{ color: "#2a3a2a", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
                      <ChevronDown size={20} />
                    </div>
                  </div>

                  {isOpen && (
                    <div style={{ padding: "0 1.5rem 1.5rem", borderTop: `1px solid ${phase.color}15` }}>
                      <div style={{ marginTop: "1.25rem", marginBottom: "1.5rem" }}>
                        <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#3a5a3a", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>WHAT YOU'LL LEARN</div>
                        {phase.skills.map((skill, j) => (
                          <div key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 0", borderBottom: "1px solid #0a150a" }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: phase.color, flexShrink: 0, marginTop: 6 }} />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 700, color: "#cde8cd", fontSize: "0.9rem", marginBottom: 2 }}>{skill.name}</div>
                              <div style={{ fontSize: "0.82rem", color: "#3a5a3a", lineHeight: 1.5 }}>{skill.desc}</div>
                            </div>
                            <div style={{ fontSize: "0.72rem", color: phase.color, fontWeight: 700, background: phase.bg, padding: "3px 10px", borderRadius: 99, flexShrink: 0 }}>{skill.time}</div>
                          </div>
                        ))}
                      </div>

                      <div style={{ marginBottom: "1.25rem" }}>
                        <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#3a5a3a", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>BEST RESOURCES</div>
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

                      <div style={{ background: "#0a120a", border: "1px solid #0f1f0f", borderRadius: 12, padding: "1rem 1.25rem", display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <Zap size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: 2 }} />
                        <div style={{ fontSize: "0.82rem", color: "#3a5a3a", lineHeight: 1.6, fontStyle: "italic" }}>"{phase.tip}"</div>
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
      <section style={{ padding: "5rem 5%", background: "#030703" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div ref={salRef}>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "0.5rem", color: "#cde8cd" }}>What You'll Earn</h2>
            <p style={{ color: "#3a5a3a", marginBottom: "2.5rem", fontSize: "0.95rem" }}>Cybersecurity salaries are among the fastest-growing in tech</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {salaryData.map((s, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#8aaa8a" }}>{s.label}</span>
                    <span style={{ fontSize: "0.9rem", fontWeight: 800, color: s.color }}>{s.range}</span>
                  </div>
                  <div style={{ height: 8, background: "#0a120a", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: salIn ? `${s.bar}%` : "0%", background: s.color, borderRadius: 99, transition: `width 1s ease ${i * 0.15}s` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 5%", background: "#050a05", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem", animation: "float 4s ease-in-out infinite" }}>🛡️</div>
          <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "1rem", color: "#cde8cd" }}>
            The world needs<br />cyber defenders
          </h2>
          <p style={{ color: "#3a5a3a", lineHeight: 1.7, marginBottom: "2rem", fontSize: "0.95rem" }}>
            3.5 million cybersecurity jobs go unfilled every year. Your IT background is exactly what employers are looking for. The only missing piece is the roadmap.
          </p>
          <a href="/roadmaps" className="cta-btn">Browse All Roadmaps <ArrowRight size={18} /></a>
        </div>
      </section>
    </div>
  )
}