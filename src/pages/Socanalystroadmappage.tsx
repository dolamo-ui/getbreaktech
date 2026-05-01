import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft, ArrowRight, Check, X,
  Clock, DollarSign, Rocket,
  CheckCircle2, Code, MessageSquare, Play, ExternalLink,
  GraduationCap, Scale, ThumbsUp, ThumbsDown,
  Briefcase, Coffee, Users, Monitor,
  Sparkles, Zap, TrendingUp,
  Link2, Download, Share2, Copy, CheckCheck,
  BookOpen, AlertTriangle, RefreshCw, Star, Calendar,
  Award, Target, Flame,
  Shield, Eye, Search, Radio,
  Activity, Radar,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── COLORS ──────────────────────────────────────────────────────────────── */
const C = {
  bg: '#ffffff',
  bgAlt: '#f8f9ff',
  bgCard: '#ffffff',
  border: 'rgba(0,0,0,0.07)',
  text: '#0f172a',
  textMuted: '#64748b',
  textFaint: '#94a3b8',
  primary: '#dc2626',         // red — SOC / security brand colour
  primaryLight: 'rgba(220,38,38,0.08)',
  primaryMid: 'rgba(220,38,38,0.15)',
  violet: '#7c3aed',
  violetLight: 'rgba(124,58,237,0.08)',
  green: '#16a34a',
  greenLight: 'rgba(22,163,74,0.08)',
  red: '#dc2626',
  redLight: 'rgba(220,38,38,0.08)',
  orange: '#ea580c',
  orangeLight: 'rgba(234,88,12,0.08)',
  indigo: '#4f46e5',
  indigoLight: 'rgba(79,70,229,0.08)',
  slate: '#475569',
  slateLight: 'rgba(71,85,105,0.08)',
}

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const CAREER_LEVELS = [
  {
    level: 'Tier 1', title: 'SOC Analyst (T1)', duration: '0–2 yrs', salary: 'R280k–R480k',
    description: 'Monitor SIEM dashboards, triage incoming alerts, escalate confirmed incidents, and document initial findings according to playbooks.',
    skills: ['SIEM Monitoring', 'Alert Triage', 'Ticketing', 'Playbooks'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Tier 2', title: 'SOC Analyst (T2)', duration: '2–4 yrs', salary: 'R520k–R900k',
    description: 'Investigate escalated incidents, perform deep-dive log analysis, correlate threat intelligence, and develop detection rules and use cases.',
    skills: ['Incident Response', 'Threat Intel', 'Log Analysis', 'YARA/Sigma'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Tier 3', title: 'Senior SOC Analyst', duration: '4–7 yrs', salary: 'R900k–R1.5M',
    description: 'Lead threat hunts, perform advanced malware analysis, build detection engineering pipelines, and mentor T1/T2 analysts.',
    skills: ['Threat Hunting', 'Malware Analysis', 'Detection Eng.', 'Forensics'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Lead', title: 'SOC Lead / Manager', duration: '7+ yrs', salary: 'R1.5M+',
    description: 'Run the SOC team, define strategy and tooling, own reporting to CISO, manage vendor relationships, and drive continuous improvement programmes.',
    skills: ['SOC Strategy', 'Team Leadership', 'CISO Reporting', 'Vendor Mgmt'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Networking & Operating System Fundamentals',
    description: 'Security is built on top of infrastructure. You must understand TCP/IP, DNS, HTTP/S, firewalls, routing, and how Windows and Linux systems work — including file systems, processes, and user accounts.',
    duration: '2–3 months', skills: ['TCP/IP', 'DNS & HTTP', 'Windows OS', 'Linux CLI'],
  },
  {
    step: 2, title: 'Security Fundamentals & Core Concepts',
    description: 'Build the foundational cybersecurity vocabulary — the CIA triad, attack types (phishing, malware, MITM), defence frameworks like MITRE ATT&CK, and how the NIST Cybersecurity Framework structures defensive programmes.',
    duration: '1–2 months', skills: ['CIA Triad', 'MITRE ATT&CK', 'Attack Types', 'NIST CSF'],
  },
  {
    step: 3, title: 'SIEM Platforms & Log Analysis',
    description: 'The SOC analyst\'s primary tool is the SIEM. Learn to ingest, query, and correlate logs from firewalls, endpoints, and cloud sources using Splunk, Microsoft Sentinel, or IBM QRadar. Write detection rules and SPL/KQL queries.',
    duration: '2–3 months', skills: ['Splunk / Sentinel', 'Log Analysis', 'SPL / KQL', 'Correlation Rules'],
  },
  {
    step: 4, title: 'Incident Response & Threat Intelligence',
    description: 'Know how to respond when an alert becomes a confirmed incident. Understand the IR lifecycle (Preparation → Detection → Containment → Eradication → Recovery), and how to use threat intel feeds to enrich investigations.',
    duration: '2–3 months', skills: ['IR Lifecycle', 'IOCs & IOAs', 'Threat Intel', 'MISP / VirusTotal'],
  },
  {
    step: 5, title: 'Endpoint Detection, Forensics & Malware Basics',
    description: 'Learn to investigate compromised endpoints using EDR tools like CrowdStrike Falcon or Microsoft Defender. Understand basic static and dynamic malware analysis, memory forensics, and artefact collection.',
    duration: '2–3 months', skills: ['EDR Tools', 'Memory Forensics', 'Malware Basics', 'Volatility / FTK'],
  },
  {
    step: 6, title: 'Cloud Security Monitoring & Detection Engineering',
    description: 'Modern environments live in the cloud. Learn to monitor AWS CloudTrail, Azure Activity Logs, and GCP Audit Logs. Write detection-as-code using Sigma rules and integrate alerts into your SIEM pipeline.',
    duration: '2–3 months', skills: ['AWS / Azure Logs', 'CloudTrail', 'Sigma Rules', 'Detection-as-Code'],
  },
]

const HARD_SKILLS = [
  { name: 'SIEM Platforms (Splunk, Sentinel, QRadar)', level: 94 },
  { name: 'Network Traffic Analysis (Wireshark, Zeek)', level: 88 },
  { name: 'Incident Response & IR Lifecycle', level: 90 },
  { name: 'Log Analysis & Correlation', level: 92 },
  { name: 'Threat Intelligence & IOC Analysis', level: 82 },
  { name: 'Endpoint Detection & Response (EDR)', level: 78 },
  { name: 'Digital Forensics & Malware Analysis', level: 65 },
  { name: 'Cloud Security Monitoring (AWS / Azure)', level: 60 },
]

const SOFT_SKILLS = [
  { name: 'Attention to Detail', description: 'A single misconfigured alert or missed log entry can be the difference between catching a breach and missing one. Precision is non-negotiable in this role.' },
  { name: 'Analytical Thinking Under Pressure', description: 'Active incidents demand rapid, structured analysis in high-stress conditions. The ability to stay systematic when the noise is loudest is a core SOC skill.' },
  { name: 'Clear Incident Documentation', description: 'Every action taken during an incident must be documented precisely — for legal, compliance, and post-incident review purposes. Writing matters as much as technical skill.' },
  { name: 'Continuous Curiosity', description: 'Threat actors evolve daily. The best SOC analysts are obsessive readers of threat reports, CVE advisories, and incident write-ups from the security community.' },
  { name: 'Cross-Team Communication', description: 'Translate technical findings into clear, concise updates for IT teams, managers, and non-technical stakeholders who need to understand the business impact.' },
  { name: 'Resilience & Focus', description: 'Alert fatigue is real. Monitoring dashboards for eight hours requires mental resilience and the discipline to stay sharp when most alerts turn out to be false positives.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'IT / Cybersecurity Degree', duration: '3–4 years', cost: 'R350k – R900k',
    borderColor: 'rgba(220,38,38,0.2)', bgColor: '#fff5f5', typeBg: 'rgba(220,38,38,0.1)', typeColor: '#dc2626',
    pros: ['Strong networking and OS theory foundation', 'Trusted by enterprise and government employers', 'Internship pipelines and security labs', 'Peer network of future security professionals'],
    cons: ['Slow path to entry — threat landscape changes faster', 'Curriculum often lags behind real-world tools', 'Expensive investment for an operational role', 'Practical SIEM and SOC skills still need supplementing'],
  },
  {
    type: 'Certifications', title: 'CompTIA / GIAC / SC-200', duration: '6–18 months', cost: 'R15k – R80k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Industry-respected and employer-recognised', 'Highly focused on practical SOC skills', 'Stackable — earn entry certs then advanced ones', 'CompTIA Security+/CySA+ are near-universal entry requirements'],
    cons: ['Exam cost adds up across multiple certs', 'Certification without labs can feel shallow', 'Need to recertify every 3 years (CompTIA)', 'Does not replace hands-on platform experience'],
  },
  {
    type: 'Self-Taught', title: 'Home Lab + Online Platforms', duration: '8–18 months', cost: 'R0 – R12k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['Hands-on platforms like TryHackMe and HTB are highly effective', 'Build real detection skills in simulated environments', 'Learn at your own pace around existing work', 'SOC community is generous with free resources'],
    cons: ['No formal credential without certs', 'Requires strong self-motivation', 'Home lab setup has upfront cost', 'Hard to signal skill to employers without certs or a degree'],
  },
]

const SCHEDULE = [
  { time: '07:00', act: 'Shift Handover & Briefing', desc: 'Receive incoming shift handover, review overnight incident summaries, and check open tickets from the outgoing team', duration: '30 min', icon: <Radio size={14} /> },
  { time: '07:30', act: 'SIEM Dashboard Review', desc: 'Review all active alerts on the SIEM. Triage by severity, begin investigating priority queues, and close confirmed false positives', duration: '2 hrs', icon: <Monitor size={14} /> },
  { time: '09:30', act: 'Active Incident Investigation', desc: 'Deep-dive into escalated or confirmed incidents — correlate logs, analyse network traffic, pivot on IOCs, and document findings', duration: '2 hrs', icon: <Search size={14} /> },
  { time: '11:30', act: 'Threat Intel & Feed Review', desc: 'Review latest threat intelligence feeds, CVE advisories, and vendor bulletins. Update watchlists and detection rules accordingly', duration: '30 min', icon: <Radar size={14} /> },
  { time: '12:00', act: 'Lunch & Mental Reset', desc: 'Away from screens. Alert fatigue is real — deliberate recovery breaks sustain performance across a full shift', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '13:00', act: 'Detection Tuning & Rule Writing', desc: 'Reduce false positive rates by refining SIEM correlation rules, updating playbooks, and writing new Sigma or SPL detection logic', duration: '1.5 hrs', icon: <Code size={14} /> },
  { time: '14:30', act: 'Shift Notes & Escalations', desc: 'Document all investigated incidents, prepare escalation reports for T2/T3, and complete handover notes for the incoming shift', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Splunk', cat: 'SIEM' }, { name: 'MS Sentinel', cat: 'SIEM' },
  { name: 'CrowdStrike', cat: 'EDR' }, { name: 'Wireshark', cat: 'Network' },
  { name: 'VirusTotal', cat: 'Intel' }, { name: 'MISP', cat: 'Threat Intel' },
  { name: 'Volatility', cat: 'Forensics' }, { name: 'TheHive', cat: 'IR Platform' },
]

const WORK_ENVS = [
  { type: 'Shift Work / On-Site', pct: 52 },
  { type: 'Hybrid', pct: 32 },
  { type: 'Remote SOC', pct: 16 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Assisted Alert Triage', icon: <Sparkles size={20} />,
    desc: 'AI models now auto-classify incoming SIEM alerts, reducing false positive noise by 40–60%. SOC analysts focus human attention on the high-confidence, high-severity events that actually matter.',
    tools: ['Darktrace', 'Chronicle SIEM AI', 'Splunk MLTK', 'Microsoft Copilot for Security'],
    borderColor: 'rgba(220,38,38,0.18)', bgColor: '#fff5f5', icoBg: 'rgba(220,38,38,0.1)', icoColor: '#dc2626', tagBg: 'rgba(220,38,38,0.08)', tagColor: '#dc2626', titleColor: '#dc2626',
  },
  {
    title: 'Generative AI for Threat Reports', icon: <Zap size={20} />,
    desc: 'Tools like Microsoft Security Copilot let analysts describe an incident in natural language and receive structured incident reports, MITRE ATT&CK mappings, and recommended remediation steps instantly.',
    tools: ['MS Security Copilot', 'Google SecLM', 'Claude', 'CrowdStrike Charlotte AI'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
  {
    title: 'Autonomous Threat Hunting', icon: <TrendingUp size={20} />,
    desc: 'AI-driven threat hunting platforms continuously scan for attacker behaviours across endpoints, identity logs, and network traffic — surfacing anomalies that human analysts would take days to find manually.',
    tools: ['Vectra AI', 'ExtraHop Reveal(x)', 'Elastic SIEM AI', 'SentinelOne Singularity'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
]

const FUTURE_SKILLS = [
  'Detection Engineering & Detection-as-Code', 'Cloud Security Posture Management (CSPM)',
  'AI/ML for Anomaly Detection', 'Identity Threat Detection (ITDR)',
  'OT / ICS Security Monitoring', 'Purple Team Operations',
]

const PROS = [
  { title: 'Critical & Growing Demand', desc: 'Cybersecurity talent shortages are projected through 2030. SOC analysts are among the most urgently needed roles across every industry globally.' },
  { title: 'Clear Certification Path', desc: 'Unlike many tech careers, SOC has a well-defined certification ladder — CompTIA Security+, CySA+, GIAC GCIH — that employers actively trust and reward.' },
  { title: 'Intellectually Stimulating', desc: 'Every incident is a unique puzzle. Attacker techniques evolve constantly, which means the learning never stops and boredom is almost structurally impossible.' },
  { title: 'Mission-Driven Work', desc: 'SOC analysts protect people\'s data, critical infrastructure, and organisational trust. Few tech roles carry the same direct sense of purpose and societal importance.' },
  { title: 'Wide Industry Access', desc: 'Banks, hospitals, government, telcos, retailers, energy companies — every regulated sector needs SOC coverage. Your skills are portable everywhere.' },
  { title: 'Path to High-Earning Specialisations', desc: 'SOC is the launchpad to incident response consulting, red teaming, malware analysis, and CISO-track roles that command R2M+ salaries.' },
]

const CONS = [
  { title: 'Alert Fatigue is Real', desc: 'Tier 1 SOC involves reviewing hundreds of alerts per shift, the vast majority of which are false positives. Sustaining attention and quality is genuinely hard work.' },
  { title: 'Shift Work & Unsociable Hours', desc: 'SOCs operate 24/7/365. Junior analysts regularly work nights, weekends, and public holidays. This is a significant lifestyle trade-off in early career.' },
  { title: 'High-Stress Incident Response', desc: 'Active breaches generate extreme pressure — business leaders, legal teams, and regulators all demand immediate answers. The stress during live incidents is substantial.' },
  { title: 'Repetitive Tier 1 Work', desc: 'Early SOC work — triaging the same classes of alerts daily — can feel monotonous before you develop enough skills to move to investigation and hunting work.' },
  { title: 'Constant Learning Requirement', desc: 'The threat landscape shifts weekly. CVEs, new malware families, and emerging attack techniques demand that you read and upskill outside of work consistently.' },
  { title: 'Tooling Fragmentation', desc: 'Enterprises often run 15–30 different security tools. Learning each organisation\'s unique stack from scratch is a recurring challenge when changing roles.' },
]

const VIDEOS = [
  { id: 'RqTb8pNSjGE', title: 'How to Become a SOC Analyst in 2025', desc: 'A practical breakdown of the role, required skills, certifications, and how to land your first SOC analyst position from scratch.', dur: '19:44', channel: 'Gerald Auger — SimplyCyber' },
  { id: 'vSy7R9eNg2E', title: 'SIEM Fundamentals — Splunk for Beginners', desc: 'A hands-on introduction to Splunk, the most widely deployed SIEM in enterprise SOCs. Understand searches, dashboards, and alerts.', dur: '24:11', channel: 'Cybersecurity with Josh' },
  { id: 'RvMhiVJQISU', title: 'SOC Analyst Day in the Life', desc: 'A real SOC analyst walks through a typical shift — alert triage, incident investigation, and the mindset required to thrive in this role.', dur: '15:38', channel: 'John Hammond' },
]

const TAKEAWAYS = [
  'Build a home lab with Splunk Free or Microsoft Sentinel — hands-on practice is non-negotiable',
  'Earn CompTIA Security+ first, then CySA+ — these two certs open 80% of entry SOC roles',
  'Practice on TryHackMe and Hack The Box Blue Team Labs before applying for jobs',
  'Learn SPL (Splunk) or KQL (Sentinel) query language to a level where you can write detection rules',
  'Read one threat intelligence report per week — start with CISA advisories and Mandiant reports',
]

/* ─── CAREER FACTS ────────────────────────────────────────────────────────── */

const CAREER_FACTS = [
  {
    icon: <Eye size={20} />, title: 'What You Do',
    desc: 'Monitor security alerts 24/7, investigate suspicious events, respond to confirmed incidents, analyse threat intelligence, and harden detection capabilities.',
    color: '#dc2626',
  },
  {
    icon: <Activity size={20} />, title: 'Core Activities',
    desc: 'SIEM alert triage, log correlation, network traffic analysis, malware sandboxing, IOC enrichment, incident documentation, and detection rule writing.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Threat intelligence teams, incident response consultants, IT operations, CISO and security leadership, legal and compliance, and infrastructure engineers.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'There are an estimated 3.5 million unfilled cybersecurity roles globally in 2026. SOC analyst is consistently ranked as the most in-demand entry security position worldwide.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🛡️', title: 'You Are the Last Line of Defence', desc: 'SOC analysts are the team that catches active attackers before they cause catastrophic damage. The work carries weight that most tech roles never approach.' },
  { emoji: '💰', title: 'Excellent Pay Progression', desc: 'Starting salaries are solid and the path to R1.5M+ as a senior analyst or specialist is clear and achievable within 5–7 years with the right certs and experience.' },
  { emoji: '🔐', title: 'Critical Skills That Age Well', desc: 'Unlike frontend frameworks that become obsolete, core security skills — log analysis, incident response, threat intelligence — remain valuable across every technology generation.' },
  { emoji: '🚀', title: 'Springboard to Elite Specialisations', desc: 'SOC is the gateway to incident response consulting, red team operations, threat intelligence, malware research, and CISO-track leadership roles.' },
  { emoji: '🌍', title: 'Work in Every Regulated Industry', desc: 'Every bank, hospital, government department, telco, and energy utility needs SOC coverage. Security skills never lack for an industry to apply them in.' },
  { emoji: '🧩', title: 'Intellectually Rewarding', desc: 'Threat actors are adaptive and creative. Hunting them requires the same qualities. Every investigation is a novel puzzle with real consequences and real stakes.' },
]

const FREE_RESOURCES = [
  { category: 'Certifications', color: '#dc2626', bgColor: '#fff5f5', items: [
    { name: 'CompTIA Security+ (SY0-701)', url: '#', type: 'Cert', rating: 5 },
    { name: 'CompTIA CySA+ (CS0-003)', url: '#', type: 'Cert', rating: 5 },
    { name: 'Microsoft SC-200 (Sentinel)', url: '#', type: 'Cert', rating: 5 },
    { name: 'GIAC GCIH — Incident Handler', url: '#', type: 'Cert', rating: 5 },
  ]},
  { category: 'Hands-On Labs', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'TryHackMe — SOC Level 1 Path', url: '#', type: 'Platform', rating: 5 },
    { name: 'Hack The Box — Blue Team Labs', url: '#', type: 'Platform', rating: 5 },
    { name: 'LetsDefend.io (SOC focused)', url: '#', type: 'Platform', rating: 5 },
    { name: 'Splunk Free Training (Splunk.com)', url: '#', type: 'Course', rating: 4 },
  ]},
  { category: 'Community & Intel', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'CISA Advisories (cisa.gov)', url: '#', type: 'Intel Feed', rating: 5 },
    { name: 'Malware Traffic Analysis (.net)', url: '#', type: 'Practice', rating: 5 },
    { name: 'Gerald Auger — SimplyCyber', url: '#', type: 'YouTube', rating: 5 },
    { name: 'r/blueteamsec & r/netsec', url: '#', type: 'Forum', rating: 4 },
  ]},
]

const SALARY_DATA = [
  { role: 'SOC Analyst Tier 1', range: 'R280k – R480k', midpoint: 380, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'SOC Analyst Tier 2', range: 'R520k – R900k', midpoint: 710, yoe: '2–4 yrs', color: '#16a34a' },
  { role: 'Senior SOC Analyst (T3)', range: 'R900k – R1.5M', midpoint: 1200, yoe: '4–7 yrs', color: '#7c3aed' },
  { role: 'SOC Lead / Manager', range: 'R1.5M – R2.5M+', midpoint: 2000, yoe: '7+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Skipping Networking Fundamentals',
    desc: 'Jumping into SIEM tools without understanding TCP/IP, DNS, firewalls, and packet analysis. You cannot investigate what you don\'t understand at the network layer.',
    fix: 'Complete Professor Messer\'s CompTIA Network+ free course before touching any security tooling.',
  },
  {
    num: '02', title: 'Treating Certifications as a Substitute for Labs',
    desc: 'Memorising exam dumps for Security+ without any hands-on time in a SIEM or lab environment. Paper certifications without practical skill are immediately visible in interviews.',
    fix: 'For every hour of cert study, spend an equal hour in TryHackMe, LetsDefend, or a home lab.',
  },
  {
    num: '03', title: 'Ignoring the Attacker\'s Perspective',
    desc: 'Focusing exclusively on defence without understanding how attacks are actually conducted. You cannot detect what you don\'t know how to do.',
    fix: 'Complete TryHackMe\'s Jr Penetration Tester path alongside the SOC path — the offensive perspective is essential.',
  },
  {
    num: '04', title: 'Poor Incident Documentation Habits',
    desc: 'Taking notes casually during investigations instead of building the habit of precise, structured, timestamped documentation. In real incidents, documentation is legal evidence.',
    fix: 'In every lab exercise, document every action with timestamps as if it were a real incident report.',
  },
  {
    num: '05', title: 'Not Learning Query Languages',
    desc: 'Relying on GUI-only SIEM workflows instead of learning SPL (Splunk), KQL (Sentinel), or Elastic Query Language. Manual GUI navigation is too slow during an active incident.',
    fix: 'Spend 30 minutes daily writing SPL or KQL queries in a free trial or lab environment until it\'s fluent.',
  },
  {
    num: '06', title: 'Neglecting Threat Intelligence',
    desc: 'Treating every alert in isolation without enriching with threat intelligence context. An IOC that matches a known APT campaign should trigger a completely different response than a generic phishing attempt.',
    fix: 'Integrate VirusTotal, AbuseIPDB, and MISP into every investigation habit from day one of lab work.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'IT Support / Helpdesk',
    ease: 'Most Common Path', easeColor: '#dc2626', easeBg: '#fff5f5',
    desc: 'The majority of T1 SOC analysts come from IT support. Your knowledge of Windows, Active Directory, and network troubleshooting is directly applicable. Add security certs and lab time.',
    steps: ['Earn CompTIA Security+', 'Complete TryHackMe SOC Level 1', 'Set up a Splunk home lab', 'Apply for T1 SOC or junior analyst roles'],
  },
  {
    from: 'Network / Systems Administrator',
    ease: 'Natural Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Deep infrastructure knowledge makes you a strong candidate for T2 SOC immediately. You understand how things are supposed to look — which makes anomalies obvious to you.',
    steps: ['Complete CompTIA CySA+ or SC-200', 'Learn SIEM query languages (SPL/KQL)', 'Practice incident response scenarios', 'Target T2 SOC or security engineer roles directly'],
  },
  {
    from: 'Software Developer / Engineer',
    ease: 'Strong Fit', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Coding skills are increasingly valuable in modern SOCs — for detection engineering, automation, and building SOAR playbooks. Your scripting ability sets you apart from most analysts.',
    steps: ['Learn networking and OS security fundamentals', 'Study MITRE ATT&CK and IR lifecycle', 'Earn CompTIA Security+ for baseline cred', 'Target Detection Engineering or AppSec-adjacent SOC roles'],
  },
  {
    from: 'Other Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Cybersecurity actively recruits from military intelligence, law enforcement, and finance. Pattern recognition, analytical discipline, and structured thinking translate directly.',
    steps: ['Start with Professor Messer free Security+ course', 'Complete TryHackMe Pre-Security path', 'Earn Security+ and CySA+ sequentially', 'Target MSSP or entry SOC roles with broad intake'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Foundations', color: '#dc2626', bg: '#fff5f5', days: [
    { day: 'Day 1–2', task: 'Install a free Splunk trial or connect to TryHackMe. Understand the SIEM interface and basic navigation.' },
    { day: 'Day 3–4', task: 'Study the OSI model, TCP/IP, DNS, and HTTP/S until you can explain them without notes.' },
    { day: 'Day 5–6', task: 'Complete TryHackMe\'s "Pre-Security" path — networking, web fundamentals, Linux basics.' },
    { day: 'Day 7', task: 'Read your first CISA security advisory. Identify the TTPs referenced in MITRE ATT&CK format.' },
  ]},
  { week: 'Week 2', theme: 'SIEM & Log Analysis', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Complete the TryHackMe "Splunk: Basics" room. Write 10 SPL queries from scratch.' },
    { day: 'Day 10–11', task: 'Study Windows Event Logs — understand Event IDs 4624, 4625, 4688, 4768, 7045 and what they mean.' },
    { day: 'Day 12–13', task: 'Analyse a PCAP file in Wireshark. Identify protocols, connections, and any suspicious activity.' },
    { day: 'Day 14', task: 'Complete a LetsDefend.io free alert investigation scenario end to end. Document your findings.' },
  ]},
  { week: 'Week 3', theme: 'Incident Response', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Study the NIST SP 800-61 Incident Response lifecycle in full. Know every phase.' },
    { day: 'Day 17–18', task: 'Complete TryHackMe\'s "Cyber Defence" path — IR, endpoint analysis, and memory forensics rooms.' },
    { day: 'Day 19–20', task: 'Set up a VirusTotal and AbuseIPDB account. Enrich 10 IOCs from threat reports you\'ve read.' },
    { day: 'Day 21', task: 'Write a mock incident report for a phishing attack investigation as if it were a real submission.' },
  ]},
  { week: 'Week 4', theme: 'Certify & Apply', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Start Professor Messer\'s CompTIA Security+ study guide. Create a 6-week exam study plan.' },
    { day: 'Day 25–26', task: 'Complete the TryHackMe SOC Level 1 path certificates. Download and save as portfolio evidence.' },
    { day: 'Day 27–28', task: 'Update your CV to include lab work, TryHackMe badges, and specific tools (Splunk, Wireshark).' },
    { day: 'Day 29–30', task: 'Apply to 5 T1 SOC or junior analyst roles. Write a cover letter referencing your home lab and platform certs.' },
  ]},
]

const TOC_ITEMS = [
  { num: '01', label: 'Introduction' },
  { num: '02', label: 'What This Career Is' },
  { num: '03', label: 'Why Choose This Career' },
  { num: '04', label: 'A Day in the Life' },
  { num: '05', label: 'Career Timeline' },
  { num: '06', label: 'Step-by-Step Roadmap' },
  { num: '07', label: 'Skill Checkpoints' },
  { num: '08', label: 'Education Paths' },
  { num: '09', label: 'Best Free Resources' },
  { num: '10', label: 'AI-Enhanced Roadmap' },
  { num: '11', label: 'Pros & Cons' },
  { num: '12', label: 'Salary' },
  { num: '13', label: 'Common Mistakes' },
  { num: '14', label: 'Career Change Guide' },
  { num: '15', label: '30-Day Action Plan' },
  { num: '16', label: 'Final Thoughts' },
]

/* ─── SHARE BAR ───────────────────────────────────────────────────────────── */
function ShareBar() {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000)
    })
  }
  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'SOC Analyst Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a SOC Analyst in 2026', url: window.location.href }) }
      catch (_) {}
    } else { handleCopy() }
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-10 p-4 rounded-2xl" style={{ background: '#f8f9ff', border: `1px solid ${C.border}` }}>
      <span className="text-xs font-semibold" style={{ color: C.textMuted }}>Share this roadmap:</span>
      <button onClick={handleCopy} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0"
        style={{ background: copied ? 'rgba(22,163,74,0.1)' : C.primaryLight, color: copied ? '#16a34a' : C.primary, outline: 'none' }}>
        {copied ? <CheckCheck size={13} /> : <Copy size={13} />}{copied ? 'Copied!' : 'Copy Link'}
      </button>
      <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0"
        style={{ background: C.violetLight, color: C.violet, outline: 'none' }}>
        <Download size={13} />Download / Save PDF
      </button>
      <button onClick={handleShare} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0"
        style={{ background: C.orangeLight, color: C.orange, outline: 'none' }}>
        <Share2 size={13} />Share
      </button>
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono truncate max-w-xs" style={{ background: '#f1f5f9', color: C.textMuted, border: `1px solid ${C.border}` }}>
        <Link2 size={11} style={{ color: C.textFaint, flexShrink: 0 }} />
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/soc-analyst'}</span>
      </div>
    </div>
  )
}

/* ─── SECTION HEADER ─────────────────────────────────────────────────────── */
function SectionHeader({ icon, title, subtitle, iconBg, iconColor }: {
  icon: React.ReactNode; title: string; subtitle: string; iconBg: string; iconColor: string
}) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg }}>
        <span style={{ color: iconColor }}>{icon}</span>
      </div>
      <div>
        <div className="text-2xl font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>{title}</div>
        <div className="text-xs" style={{ color: C.textMuted }}>{subtitle}</div>
      </div>
    </div>
  )
}

/* ─── FADE HOOK ──────────────────────────────────────────────────────────── */
function useFade() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    el.style.opacity = '0'; el.style.transform = 'translateY(24px)'
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease'
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect() }
    }, { threshold: 0.07 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return ref
}

/* ─── PAGE ────────────────────────────────────────────────────────────────── */
export default function SOCAnalystRoadmapPage() {
  const progressRef = useRef<HTMLDivElement>(null)
  const tlSectionRef = useRef<HTMLElement>(null)
  const barsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap'
    document.head.appendChild(link)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (progressRef.current) {
        gsap.fromTo(progressRef.current, { width: '0%' }, {
          width: '100%', duration: 2.2, ease: 'power2.out',
          scrollTrigger: { trigger: tlSectionRef.current, start: 'top 72%', toggleActions: 'play none none reverse' },
        })
      }
    }); return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bars = barsContainerRef.current?.querySelectorAll<HTMLElement>('[data-bar-w]')
      bars?.forEach(bar => {
        gsap.fromTo(bar, { width: '0%' }, {
          width: `${bar.dataset.barW}%`, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: bar, start: 'top 92%', toggleActions: 'play none none reverse' },
        })
      })
    }); return () => ctx.revert()
  }, [])

  const introRef = useFade(); const whatRef = useFade(); const whyRef = useFade()
  const tlRef = useFade(); const stepsRef = useFade(); const skillsRef = useFade()
  const eduRef = useFade(); const freeRef = useFade(); const dayRef = useFade()
  const pcRef = useFade(); const aiRef = useFade(); const salaryRef = useFade()
  const mistakesRef = useFade(); const changeRef = useFade(); const planRef = useFade()
  const finalRef = useFade(); const vidsRef = useFade()

  const sectionStyle = { paddingTop: 72, paddingBottom: 72, borderBottomColor: C.border }

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.text, fontFamily: 'Inter, sans-serif' }}>

      {/* Back button */}
      <Link to="/roadmaps"
        className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold no-underline transition-all duration-200"
        style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', border: `1px solid ${C.border}`, color: C.textMuted, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <ArrowLeft size={14} /> All Roadmaps
      </Link>

      {/* ── HERO ── */}
      <div className="relative w-full" style={{ background: C.bg }}>
        <div className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: 600 }}>
          <img
            src="https://i.imgur.com/Vu4d54D.jpeg"
            alt="SOC Analyst workspace"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.5) brightness(0.98)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 40%, rgba(255,255,255,0.72) 70%, rgba(255,255,255,1) 87%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Shield size={12} /> Cybersecurity & Defence
              </div>
              <h1 className="font-extrabold leading-tight mb-2"
                style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                SOC Analyst
              </h1>
              <span className="block font-normal mb-3"
                style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', color: C.textMuted }}>
                Career Roadmap 2026
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><Clock size={14} style={{ color: C.textFaint }} /> 20 min read</div>
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><BookOpen size={14} style={{ color: C.textFaint }} /> 16 sections</div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-8 pt-6 pb-16">
          <p className="text-base leading-relaxed" style={{ color: '#4b5563', maxWidth: 560, marginLeft: 140 }}>
            Be the analyst who stops the breach. Security Operations Centre analysts are the cyber defenders on the front lines — monitoring for threats, investigating alerts, and responding to incidents before they become catastrophes.
          </p>
          <div className="h-px mt-10" style={{ background: C.border }} />
        </div>
      </div>

      {/* ── TABLE OF CONTENTS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={introRef}>
            <SectionHeader icon={<BookOpen size={22} />} title="What's Inside" subtitle="Everything you need to know about this career in one place" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {TOC_ITEMS.map(item => (
                <div key={item.num} className="flex items-center gap-2.5 rounded-xl px-3.5 py-3 border transition-all duration-150 cursor-default hover:shadow-sm" style={{ background: C.bg, borderColor: C.border }}>
                  <span className="font-mono text-xs font-bold flex-shrink-0" style={{ color: C.textFaint }}>{item.num}</span>
                  <span className="text-xs font-medium" style={{ color: C.text }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT THIS CAREER IS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={whatRef}>
            <SectionHeader icon={<Shield size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of SOC Analysis" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#fff5f5', borderColor: 'rgba(220,38,38,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>SOC Analyst</strong> (Security Operations Centre Analyst) is a cybersecurity professional responsible for monitoring an organisation's IT environment for threats, analysing security alerts, and responding to confirmed incidents. Operating from a centralised SOC, analysts work across tiered levels — from initial alert triage (Tier 1) through deep investigation and threat hunting (Tier 3) — to detect and contain attackers before they cause irreversible damage.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CAREER_FACTS.map(f => (
                <div key={f.title} className="flex gap-4 rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style={{ background: C.bg, borderColor: C.border }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${f.color}12` }}>
                    <span style={{ color: f.color }}>{f.icon}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold mb-1.5" style={{ color: C.text }}>{f.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={whyRef}>
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons SOC Analysis could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WHY_REASONS.map(r => (
                <div key={r.title} className="rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style={{ background: C.bg, borderColor: C.border }}>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">{r.emoji}</div>
                    <div>
                      <div className="text-sm font-bold mb-1.5" style={{ color: C.text }}>{r.title}</div>
                      <div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{r.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DAY IN THE LIFE ── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={dayRef}>
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical SOC Analyst workday (morning shift) looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Morning Shift Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200"
                    style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.3)'; (e.currentTarget as HTMLElement).style.background = '#fff5f5' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.background = C.bg }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: C.primaryLight, color: C.primary }}>{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="text-sm font-semibold" style={{ color: C.text }}>{item.act}</span>
                        <span className="text-xs flex-shrink-0" style={{ color: C.textMuted }}>{item.duration}</span>
                      </div>
                      <div className="text-xs" style={{ color: C.textMuted }}>{item.desc}</div>
                    </div>
                    <span className="font-mono text-xs flex-shrink-0" style={{ color: C.primary }}>{item.time}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="rounded-2xl p-5 mb-4 border" style={{ background: '#f8f9ff', borderColor: C.border }}>
                  <div className="text-sm font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Primary Tools</div>
                  <div className="flex flex-wrap">
                    {TOOLS.map(t => (
                      <span key={t.name} className="inline-block rounded-lg px-2.5 py-1.5 mr-1.5 mb-2 border" style={{ background: C.bg, borderColor: C.border }}>
                        <span className="text-xs font-semibold" style={{ color: C.text }}>{t.name}</span>
                        <span className="text-xs" style={{ color: C.textFaint }}> ({t.cat})</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl p-5 border" style={{ background: '#f8f9ff', borderColor: C.border }}>
                  <div className="text-sm font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Work Environment</div>
                  {WORK_ENVS.map(e => (
                    <div key={e.type} className="mb-3.5">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span style={{ color: C.textMuted }}>{e.type}</span>
                        <span className="font-mono" style={{ color: C.primary }}>{e.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${e.pct}%`, background: C.primary }} />
                      </div>
                    </div>
                  ))}
                  <div className="text-xs mt-2" style={{ color: C.textFaint }}>Based on 2026 industry surveys</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAREER TIMELINE ── */}
      <section ref={tlSectionRef} className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={tlRef}>
            <SectionHeader icon={<Clock size={22} />} title="Career Timeline" subtitle="Time estimates and salary ranges across all tiers" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="mb-10">
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}>
                <span>Career Progression</span><span>T1 Analyst → SOC Lead</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                <div ref={progressRef} className="h-1.5 rounded-full" style={{ width: '0%', background: 'linear-gradient(90deg, #0891b2 0%, #16a34a 33%, #7c3aed 66%, #ea580c 100%)' }} />
              </div>
              <div className="flex justify-between mt-2.5">
                {CAREER_LEVELS.map(l => (
                  <span key={l.level} className="font-mono" style={{ color: l.accent, fontSize: '0.68rem' }}>{l.duration}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              {CAREER_LEVELS.map(l => (
                <div key={l.level} className="rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg" style={{ background: C.bg, borderColor: l.accentBorder }}>
                  <div className="inline-block rounded-full px-2.5 py-0.5 mb-3 font-mono text-xs font-bold uppercase tracking-widest" style={{ background: l.accentBg, color: l.accent }}>{l.level}</div>
                  <div className="text-base font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>{l.title}</div>
                  <div className="text-sm font-semibold mb-2.5" style={{ color: l.accent }}>{l.salary}</div>
                  <div className="text-xs leading-relaxed mb-3.5" style={{ color: C.textMuted }}>{l.description}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {l.skills.map(s => <span key={s} className="rounded px-1.5 py-0.5 font-mono text-xs" style={{ background: '#f1f5f9', color: C.textMuted }}>{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div ref={stepsRef} className="max-w-2xl mx-auto px-4">
          <SectionHeader icon={<Target size={22} />} title="Step-by-Step Roadmap" subtitle="Your path from complete beginner to job-ready SOC analyst" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="relative flex flex-col items-center">
            {ROADMAP_STEPS.map((s, i) => {
              const icons = ['🌐', '🛡️', '📊', '🚨', '💻', '☁️']
              const accentColors = ['#dc2626', '#16a34a', '#dc2626', '#16a34a', '#dc2626', '#16a34a']
              const accent = accentColors[i]
              const isLast = i === ROADMAP_STEPS.length - 1
              const isEven = i % 2 === 0
              return (
                <div key={s.step} className="w-full flex flex-col items-center">
                  <div className="w-full" style={{ opacity: 0, transform: 'translateY(20px)', transition: `opacity 0.5s ${i * 0.13}s ease, transform 0.5s ${i * 0.13}s ease` }}
                    ref={el => {
                      if (!el) return
                      const obs = new IntersectionObserver(([e]) => {
                        if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect() }
                      }, { threshold: 0.15 })
                      obs.observe(el)
                    }}>
                    <div className="w-full rounded-3xl overflow-hidden" style={{ background: `${accent}08`, border: `2px solid ${accent}25`, boxShadow: `0 4px 24px ${accent}12` }}>
                      <div className="flex items-center gap-4 px-5 py-5">
                        <div className="flex-shrink-0 flex items-center justify-center rounded-full text-2xl font-bold"
                          style={{ width: 64, height: 64, background: `linear-gradient(135deg, ${accent}20, ${accent}10)`, border: `3px solid ${accent}40` }}>
                          {icons[i]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-xs font-black uppercase tracking-widest font-mono" style={{ color: accent }}>STEP {s.step}:</span>
                            <span className="text-xs rounded-full px-2 py-0.5 font-mono" style={{ background: `${accent}12`, color: accent }}>{s.duration}</span>
                          </div>
                          <div className="font-extrabold mb-2 leading-tight" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', color: C.text }}>{s.title.toUpperCase()}</div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                            {s.skills.map(sk => (
                              <div key={sk} className="flex items-center gap-1.5 text-xs" style={{ color: C.textMuted }}>
                                <CheckCircle2 size={11} style={{ color: accent, flexShrink: 0 }} />
                                <span className="font-mono uppercase tracking-wide" style={{ fontSize: '0.65rem' }}>{sk}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="px-5 pb-4 text-xs leading-relaxed" style={{ color: C.textMuted, borderTop: `1px solid ${accent}15`, paddingTop: 10 }}>
                        {s.description}
                      </div>
                    </div>
                  </div>
                  {!isLast && (
                    <div className="flex w-full" style={{ height: 48 }}>
                      <svg viewBox="0 0 400 48" className="w-full" style={{ height: 48 }} preserveAspectRatio="none">
                        <path d={isEven ? 'M200,0 C200,24 380,24 380,48' : 'M200,0 C200,24 20,24 20,48'} fill="none" stroke="#e2e8f0" strokeWidth="40" strokeLinecap="round" />
                        <path d={isEven ? 'M200,0 C200,24 380,24 380,48' : 'M200,0 C200,24 20,24 20,48'} fill="none" stroke={accentColors[i + 1] ?? accent} strokeWidth="4" strokeLinecap="round" strokeOpacity="0.4" strokeDasharray="12 8" />
                        {isEven
                          ? <polygon points="372,36 388,44 372,52" fill={accentColors[i + 1] ?? accent} opacity="0.5" />
                          : <polygon points="28,36 12,44 28,52" fill={accentColors[i + 1] ?? accent} opacity="0.5" />}
                      </svg>
                    </div>
                  )}
                </div>
              )
            })}
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center"
              style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.indigo} 100%)`, boxShadow: '0 8px 48px rgba(220,38,38,0.22)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>9–13 months · Consistent daily practice · Build real detection skills</div>
            </div>
          </div>
         
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={skillsRef}>
            <SectionHeader icon={<CheckCircle2 size={22} />} title="Skill Checkpoints" subtitle="Technical and interpersonal skills to develop" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl p-7 border" style={{ background: C.bg, borderColor: C.border }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.indigoLight }}><Shield size={16} style={{ color: C.indigo }} /></div>
                  <div>
                    <div className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Hard Skills</div>
                    <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>Technical competencies required</div>
                  </div>
                </div>
                <div ref={barsContainerRef}>
                  {HARD_SKILLS.map(s => (
                    <div key={s.name} className="mb-4">
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs" style={{ color: C.textMuted }}>{s.name}</span>
                        <span className="text-xs font-mono" style={{ color: C.textFaint }}>{s.level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                        <div className="h-1.5 rounded-full" data-bar-w={s.level} style={{ width: 0, background: `linear-gradient(90deg, ${C.primary}, ${C.indigo})` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-7 border" style={{ background: C.bg, borderColor: C.border }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.primaryLight }}><MessageSquare size={16} style={{ color: C.primary }} /></div>
                  <div>
                    <div className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Soft Skills</div>
                    <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>Interpersonal abilities to build</div>
                  </div>
                </div>
                {SOFT_SKILLS.map(s => (
                  <div key={s.name} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border transition-colors cursor-default" style={{ background: '#f8f9ff', borderColor: C.border }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.primaryLight}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#f8f9ff'}>
                    <div className="text-sm font-semibold mb-0.5" style={{ color: C.text }}>{s.name}</div>
                    <div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{s.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION PATHS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={eduRef}>
            <SectionHeader icon={<GraduationCap size={22} />} title="Education Paths" subtitle="Three routes into the field — pick yours" iconBg="rgba(148,163,184,0.1)" iconColor={C.textMuted} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {EDU_PATHS.map(p => (
                <div key={p.type} className="rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg" style={{ background: p.bgColor, borderColor: p.borderColor }}>
                  <div className="inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest mb-4 font-mono" style={{ background: p.typeBg, color: p.typeColor }}>{p.type}</div>
                  <div className="text-base font-bold mb-3.5" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>{p.title}</div>
                  <div className="flex gap-3.5 text-xs mb-4" style={{ color: C.textMuted }}>
                    <span className="flex items-center gap-1"><Clock size={11} />{p.duration}</span>
                    <span className="flex items-center gap-1"><DollarSign size={11} />{p.cost}</span>
                  </div>
                  <div className="text-xs font-bold mb-2" style={{ color: C.green }}>Advantages</div>
                  {p.pros.map(item => <div key={item} className="flex items-start gap-2 text-xs mb-1.5" style={{ color: C.textMuted }}><Check size={11} style={{ color: C.green, flexShrink: 0, marginTop: 2 }} />{item}</div>)}
                  <div className="text-xs font-bold mb-2 mt-3.5" style={{ color: C.red }}>Challenges</div>
                  {p.cons.map(item => <div key={item} className="flex items-start gap-2 text-xs mb-1.5" style={{ color: C.textMuted }}><X size={11} style={{ color: C.red, flexShrink: 0, marginTop: 2 }} />{item}</div>)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FREE RESOURCES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={freeRef}>
            <SectionHeader icon={<BookOpen size={22} />} title="Best Free Resources" subtitle="The certifications, platforms, and communities that actually build SOC skills" iconBg={C.greenLight} iconColor={C.green} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FREE_RESOURCES.map(cat => (
                <div key={cat.category} className="rounded-2xl p-6 border" style={{ background: cat.bgColor, borderColor: `${cat.color}25` }}>
                  <div className="inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest mb-5 font-mono" style={{ background: `${cat.color}15`, color: cat.color }}>{cat.category}</div>
                  {cat.items.map(item => (
                    <div key={item.name} className="rounded-xl p-3 mb-2.5 last:mb-0 border" style={{ background: C.bg, borderColor: C.border }}>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-xs font-semibold" style={{ color: C.text }}>{item.name}</span>
                        <span className="text-xs rounded px-1.5 py-0.5 flex-shrink-0 font-mono" style={{ background: `${cat.color}12`, color: cat.color }}>{item.type}</span>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < item.rating ? cat.color : 'none'} style={{ color: i < item.rating ? cat.color : C.textFaint }} />)}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AI IMPACT ── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={aiRef}>
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming the SOC in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#fff5f5', borderColor: 'rgba(220,38,38,0.2)', color: C.textMuted }}>
              AI is not replacing SOC analysts — it is <em style={{ color: C.primary }}>re-levelling</em> them. Tier 1 noise reduction, automated IOC enrichment, and AI-generated incident reports mean analysts spend far more time on genuine investigation and threat hunting rather than manual triage.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-9">
              {AI_IMPACTS.map(item => (
                <div key={item.title} className="rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-1 hover:shadow-md" style={{ background: item.bgColor, borderColor: item.borderColor }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: item.icoBg }}>
                    <span style={{ color: item.icoColor }}>{item.icon}</span>
                  </div>
                  <div className="text-sm font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif', color: item.titleColor }}>{item.title}</div>
                  <div className="text-xs leading-relaxed mb-3.5" style={{ color: C.textMuted }}>{item.desc}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tools.map(t => <span key={t} className="rounded px-2 py-0.5 text-xs font-mono font-semibold" style={{ background: item.tagBg, color: item.tagColor }}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Emerging Skills to Learn Now</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {FUTURE_SKILLS.map((s, i) => (
                <div key={s} className="flex items-center gap-2.5 rounded-xl px-4 py-3.5 border" style={{ background: '#f8f9ff', borderColor: C.border }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-black text-xs" style={{ background: C.primaryLight, color: C.primary }}>{i + 1}</div>
                  <span className="text-xs font-medium" style={{ color: C.text }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROS & CONS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={pcRef}>
            <SectionHeader icon={<Scale size={22} />} title="Pros & Cons" subtitle="The honest picture of this career path" iconBg="rgba(148,163,184,0.1)" iconColor={C.textMuted} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-3xl p-7 border" style={{ background: '#f0fdf4', borderColor: 'rgba(22,163,74,0.2)' }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(22,163,74,0.12)' }}><ThumbsUp size={16} style={{ color: C.green }} /></div>
                  <span className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.green }}>Advantages</span>
                </div>
                {PROS.map(p => (
                  <div key={p.title} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border" style={{ background: C.bg, borderColor: 'rgba(22,163,74,0.12)' }}>
                    <div className="text-sm font-semibold mb-1" style={{ color: C.text }}>{p.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{p.desc}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-3xl p-7 border" style={{ background: '#fff5f5', borderColor: 'rgba(220,38,38,0.2)' }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(220,38,38,0.1)' }}><ThumbsDown size={16} style={{ color: C.red }} /></div>
                  <span className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.red }}>Challenges</span>
                </div>
                {CONS.map(c => (
                  <div key={c.title} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border" style={{ background: C.bg, borderColor: 'rgba(220,38,38,0.12)' }}>
                    <div className="text-sm font-semibold mb-1" style={{ color: C.text }}>{c.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SALARY ── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={salaryRef}>
            <SectionHeader icon={<DollarSign size={22} />} title="Salary" subtitle="What you can realistically earn at each tier" iconBg={C.greenLight} iconColor={C.green} />
            <div className="rounded-2xl p-6 mb-6 border" style={{ background: '#f0fdf4', borderColor: 'rgba(22,163,74,0.2)' }}>
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. MSSP and global remote security roles — particularly at Tier 3 and senior levels — can pay 2–3× these figures in USD.</p>
            </div>
            <div className="space-y-4">
              {SALARY_DATA.map(row => (
                <div key={row.role} className="rounded-2xl p-5 border" style={{ background: '#f8f9ff', borderColor: C.border }}>
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div>
                      <span className="text-sm font-bold" style={{ color: C.text }}>{row.role}</span>
                      <span className="ml-3 text-xs font-mono" style={{ color: C.textFaint }}>{row.yoe}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: row.color }}>{row.range}</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 2500) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#fff5f5', borderColor: 'rgba(220,38,38,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> Analysts at MSSPs (Managed Security Service Providers) gain multi-client exposure 3–5× faster than in-house SOC roles. Starting at an MSSP accelerates your skill development significantly — even if the starting salary is slightly lower.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring SOC analysts" iconBg={C.orangeLight} iconColor={C.orange} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISTAKES.map(m => (
                <div key={m.num} className="rounded-2xl p-5 border transition-all duration-200 hover:shadow-md" style={{ background: C.bg, borderColor: C.border }}>
                  <div className="flex items-start gap-3 mb-3">
                    <span className="font-mono text-xs font-black flex-shrink-0 mt-0.5" style={{ color: C.textFaint }}>{m.num}</span>
                    <div>
                      <div className="text-sm font-bold mb-1.5" style={{ color: C.red }}>{m.title}</div>
                      <div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{m.desc}</div>
                    </div>
                  </div>
                  <div className="rounded-xl p-3 border-l-2 ml-5" style={{ background: '#f0fdf4', borderLeftColor: C.green }}>
                    <span className="text-xs font-bold" style={{ color: C.green }}>Fix: </span>
                    <span className="text-xs" style={{ color: C.textMuted }}>{m.fix}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAREER CHANGE ── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={changeRef}>
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into SOC from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {CAREER_CHANGE_PATHS.map(path => (
                <div key={path.from} className="rounded-2xl p-6 border" style={{ background: path.easeBg, borderColor: `${path.easeColor}20` }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>From: {path.from}</div>
                    <span className="text-xs rounded-full px-2.5 py-1 font-semibold" style={{ background: `${path.easeColor}15`, color: path.easeColor }}>{path.ease}</span>
                  </div>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: C.textMuted }}>{path.desc}</p>
                  <div className="space-y-2">
                    {path.steps.map((step, i) => (
                      <div key={step} className="flex items-center gap-2.5 text-xs" style={{ color: C.text }}>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: `${path.easeColor}20`, color: path.easeColor }}>{i + 1}</div>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 30-DAY PLAN ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={planRef}>
            <SectionHeader icon={<Calendar size={22} />} title="30-Day Action Plan" subtitle="Exactly what to do in your first month. Start today." iconBg={C.orangeLight} iconColor={C.orange} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {THIRTY_DAY_PLAN.map(week => (
                <div key={week.week} className="rounded-2xl border overflow-hidden" style={{ background: C.bg, borderColor: C.border }}>
                  <div className="px-5 py-4 border-b" style={{ background: week.bg, borderBottomColor: `${week.color}20` }}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold" style={{ fontFamily: 'Syne, sans-serif', color: week.color }}>{week.week}</span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${week.color}15`, color: week.color }}>{week.theme}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    {week.days.map(d => (
                      <div key={d.day} className="flex items-start gap-3 mb-3.5 last:mb-0">
                        <span className="text-xs font-mono font-bold flex-shrink-0 pt-0.5" style={{ color: week.color }}>{d.day}</span>
                        <span className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{d.task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEOS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={vidsRef}>
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in cybersecurity and SOC analysis" iconBg={C.redLight} iconColor={C.red} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {VIDEOS.map(v => (
                <div key={v.id} className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ background: '#f8f9ff', borderColor: C.border }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.3)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: '#0a0c1a' }}>
                    <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} className="w-full h-full object-cover" style={{ opacity: 0.75 }} />
                    <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center no-underline">
                      <div className="rounded-full flex items-center justify-center" style={{ width: 52, height: 52, background: 'rgba(220,38,38,0.9)' }}>
                        <Play size={20} fill="white" style={{ color: '#fff', marginLeft: 2 }} />
                      </div>
                    </a>
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded px-2 py-1 text-xs text-white" style={{ background: 'rgba(0,0,0,0.75)' }}>
                      <Clock size={10} />{v.dur}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-semibold mb-1.5 leading-snug" style={{ color: C.text }}>{v.title}</div>
                    <div className="text-xs leading-relaxed mb-3" style={{ color: C.textMuted }}>{v.desc}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: C.textFaint }}>{v.channel}</span>
                      <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs no-underline" style={{ color: C.indigo }}>
                        Watch <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL THOUGHTS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={finalRef}>
            <SectionHeader icon={<Award size={22} />} title="Final Thoughts" subtitle="What we want you to take away from this guide" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 border mb-8" style={{ background: C.bg, borderColor: C.border }}>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#374151' }}>
                SOC analysis is one of the most <strong style={{ color: C.primary }}>mission-critical and intellectually demanding</strong> roles in technology. You are the professional who stands between an organisation and an attacker who has spent months planning to destroy it. That weight is real — and so is the satisfaction when you catch them.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The difference between someone who "studied cybersecurity" and someone who landed a SOC role almost always comes down to one thing: documented, hands-on lab experience in a real SIEM platform. TryHackMe, LetsDefend, and Splunk's free tier are your interview portfolio. Build it before you apply.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {TAKEAWAYS.map((t, i) => (
                <div key={t} className="flex items-center gap-3.5 rounded-xl px-5 py-3.5 border" style={{ background: C.bg, borderColor: C.border }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-black text-xs" style={{ background: C.primaryLight, color: C.primary }}>{i + 1}</div>
                  <span className="text-sm" style={{ color: C.text }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="max-w-4xl mx-auto px-8" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="relative overflow-hidden rounded-3xl px-12 py-16 text-center"
          style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.indigo} 100%)` }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: 'rgba(255,255,255,0.05)', top: -120, right: -80 }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Rocket size={30} style={{ color: '#fff' }} />
          </div>
          <h2 className="font-extrabold text-white mb-3"
            style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
            Ready to Start Your Journey?
          </h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open TryHackMe and start your first SOC lab today.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline"
              style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start defending today. Your future self will thank you.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}