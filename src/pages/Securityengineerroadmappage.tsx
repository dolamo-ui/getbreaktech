import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft, ArrowRight, Check, X,
  Clock, DollarSign, Rocket,
  CheckCircle2, Code, MessageSquare, Play, ExternalLink,
  GraduationCap, Scale, ThumbsUp, ThumbsDown,
  Briefcase, Coffee, Users, 
  Sparkles, Zap, TrendingUp,
  Link2, Download, Share2, Copy, CheckCheck,
  BookOpen, AlertTriangle, RefreshCw, Star, Calendar,
  Award, Target, Flame,
  Layers, FileText, Server,
  Terminal, Shield,
  Workflow,
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
  primary: '#0f766e',
  primaryLight: 'rgba(15,118,110,0.08)',
  primaryMid: 'rgba(15,118,110,0.15)',
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
  cyan: '#0891b2',
  cyanLight: 'rgba(8,145,178,0.08)',
}

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const CAREER_LEVELS = [
  {
    level: 'Junior', title: 'Junior Security Analyst', duration: '0–2 yrs', salary: 'R280k–R500k',
    description: 'Monitor security alerts, run vulnerability scans, analyse logs, support incident response, and learn the security toolchain under senior guidance.',
    skills: ['SIEM Tools', 'Vulnerability Scan', 'Linux Basics', 'Networking'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Security Engineer', duration: '2–5 yrs', salary: 'R580k–R1M',
    description: 'Design security controls, conduct penetration tests, lead threat modelling sessions, implement IAM policies, and respond to incidents independently.',
    skills: ['Penetration Testing', 'IAM', 'Threat Modelling', 'Cloud Security'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Security Engineer', duration: '5–8 yrs', salary: 'R1M–R1.8M',
    description: 'Architect security frameworks, define zero-trust strategies, lead red team operations, mentor junior analysts, and drive compliance programmes.',
    skills: ['Zero Trust', 'Red Teaming', 'Architecture', 'Compliance'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'CISO / Principal Sec Eng', duration: '8+ yrs', salary: 'R2M+',
    description: 'Define the organisation-wide security posture, lead security strategy across business units, interface with board and regulators, and build security culture.',
    skills: ['Sec Strategy', 'GRC', 'Board Reporting', 'Leadership'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Networking & Operating System Fundamentals',
    description: 'Security starts with understanding what you are protecting. Master TCP/IP, DNS, HTTP/S, firewalls, and routing. Learn Linux deeply — the command line, file permissions, processes, and logging. Most security tools live in Linux environments.',
    duration: '2–3 months', skills: ['TCP/IP & DNS', 'Linux CLI', 'Firewalls', 'Networking Protocols'],
  },
  {
    step: 2, title: 'Security Concepts & Frameworks',
    description: 'Learn the CIA triad, OWASP Top 10, MITRE ATT&CK, and the NIST Cybersecurity Framework. Understand threat actors, attack vectors, and how defenders think. Study real-world breach case studies to build intuition for attacker behaviour.',
    duration: '2–3 months', skills: ['OWASP Top 10', 'MITRE ATT&CK', 'NIST CSF', 'Threat Actors'],
  },
  {
    step: 3, title: 'Penetration Testing & Ethical Hacking',
    description: 'Offensive security skills make you a far better defender. Learn to use Kali Linux, Metasploit, Burp Suite, and Nmap. Practise on legal lab environments like Hack The Box and TryHackMe. Understand web app attacks, SQL injection, and privilege escalation.',
    duration: '3–4 months', skills: ['Kali Linux', 'Burp Suite', 'Metasploit', 'Web App Attacks'],
  },
  {
    step: 4, title: 'SIEM, Log Analysis & Incident Response',
    description: 'Defenders live in logs. Learn to use Splunk or Microsoft Sentinel to detect anomalies, correlate events, and build detection rules. Understand incident response playbooks, digital forensics basics, and how to contain and eradicate threats.',
    duration: '2–3 months', skills: ['Splunk / Sentinel', 'Log Analysis', 'IR Playbooks', 'DFIR Basics'],
  },
  {
    step: 5, title: 'Cloud Security & Identity Management',
    description: 'Most infrastructure has moved to cloud. Master IAM policies, least privilege principles, cloud security posture management (CSPM), and secure configuration of AWS, Azure, or GCP environments. Understand shared responsibility models.',
    duration: '2–3 months', skills: ['AWS/Azure Security', 'IAM & Zero Trust', 'CSPM Tools', 'DevSecOps'],
  },
  {
    step: 6, title: 'Governance, Risk & Compliance (GRC)',
    description: 'Senior security roles require business alignment. Study ISO 27001, SOC 2, POPIA, GDPR, and risk assessment frameworks. Learn to write security policies, conduct risk assessments, and communicate security risk in business language.',
    duration: '2–3 months', skills: ['ISO 27001', 'GDPR / POPIA', 'Risk Assessment', 'Policy Writing'],
  },
]

const HARD_SKILLS = [
  { name: 'Networking & Protocols', level: 95 },
  { name: 'Penetration Testing', level: 90 },
  { name: 'SIEM & Log Analysis', level: 88 },
  { name: 'Cloud Security (AWS/Azure)', level: 82 },
  { name: 'Identity & Access Management', level: 80 },
  { name: 'Malware Analysis & Forensics', level: 72 },
  { name: 'GRC & Compliance Frameworks', level: 68 },
  { name: 'Threat Intelligence', level: 65 },
]

const SOFT_SKILLS = [
  { name: 'Adversarial Thinking', description: 'Think like an attacker to defend like a pro. The best security engineers model every system from the perspective of someone trying to break it — before attackers get the chance.' },
  { name: 'Calm Under Pressure', description: 'Security incidents are chaotic. The ability to triage, communicate clearly, and make sound decisions during a live breach is one of the most valuable — and rarest — skills in the field.' },
  { name: 'Communication & Influence', description: 'Security is fundamentally a people problem. You must translate technical risk into business language that executives, legal teams, and developers all understand and act on.' },
  { name: 'Continuous Learning', description: 'The threat landscape evolves faster than any other technology discipline. Security engineers who stop learning become obsolete within two years. Curiosity is not optional.' },
  { name: 'Attention to Detail', description: 'A single misconfigured permission, overlooked log entry, or missed patch is how breaches happen. Elite security engineers develop a near-obsessive attention to detail in every audit and review.' },
  { name: 'Ethical Judgement', description: 'Security engineers have access to sensitive systems and data. Operating with strict ethical discipline — even when no one is watching — is the non-negotiable foundation of this career.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Computer Science / Cybersecurity Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(15,118,110,0.2)', bgColor: '#f0fdfa', typeBg: 'rgba(15,118,110,0.12)', typeColor: '#0f766e',
    pros: ['Deep networking, OS, and cryptography foundations', 'High credibility for government and defence roles', 'Access to security research labs and internships', 'Strong academic peer network'],
    cons: ['Slow path to first security job', 'Theory-heavy, practice-light in most programmes', 'Certifications often more valued than degrees in industry', 'Rapidly evolving threat landscape outpaces curricula'],
  },
  {
    type: 'Certifications', title: 'CompTIA / CEH / OSCP Path', duration: '6–18 months', cost: 'R15k – R80k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Industry-recognised credentials that open doors', 'Vendor-neutral foundations (CompTIA Security+)', 'OSCP is the gold standard for offensive security roles', 'Faster time-to-hire than a degree'],
    cons: ['Cost of exams and study materials adds up', 'Cert alone without practical labs is insufficient', 'Must be renewed periodically', 'Entry-level certs commoditised — need multiple to stand out'],
  },
  {
    type: 'Self-Taught', title: 'Labs, CTFs & Online Platforms', duration: '12–24 months', cost: 'R0 – R6k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['Hack The Box and TryHackMe are world-class free platforms', 'CTF competitions build real offensive skills', 'Build a public portfolio of security write-ups', 'Learn exactly what the market needs right now'],
    cons: ['Requires extreme discipline and structured self-direction', 'Easy to focus on hacking without learning defence', 'No formal credential on a CV', 'Knowledge gaps in GRC and compliance are common'],
  },
]

const SCHEDULE = [
  { time: '8:30', act: 'Threat Intelligence Review', desc: 'Review overnight security alerts, threat feeds (CISA, NVD), and SIEM dashboards for anomalies or active incidents requiring investigation', duration: '30 min', icon: <Shield size={14} /> },
  { time: '9:00', act: 'Vulnerability Assessment', desc: 'Run and analyse vulnerability scans across infrastructure, prioritise findings by exploitability and business impact, and assign remediation tickets', duration: '2 hrs', icon: <Terminal size={14} /> },
  { time: '11:00', act: 'Security Engineering Work', desc: 'The deep work: building detection rules, hardening cloud configurations, reviewing code for security issues, or developing security tooling', duration: '2 hrs', icon: <Server size={14} /> },
  { time: '1:00', act: 'Lunch & Recovery', desc: 'Step away from the screens. Security work is cognitively intense — recovery time directly improves the quality of threat analysis in the afternoon', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Incident Response / Pen Test', desc: 'Investigate flagged incidents, conduct scheduled penetration tests, or perform tabletop exercise facilitation with development and infrastructure teams', duration: '2 hrs', icon: <AlertTriangle size={14} /> },
  { time: '4:00', act: 'Documentation & Reporting', desc: 'Write up findings, update runbooks, document new threat intelligence, prepare board-level risk summaries, or update security policies', duration: '1 hr', icon: <FileText size={14} /> },
  { time: '5:00', act: 'Learning & Research', desc: 'Read security blogs (Krebs on Security, Schneier), practise CTF challenges, research new attack techniques, or contribute to bug bounty programmes', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Kali Linux', cat: 'Pentesting' }, { name: 'Burp Suite', cat: 'Web Sec' },
  { name: 'Splunk / Sentinel', cat: 'SIEM' }, { name: 'Nmap / Nessus', cat: 'Scanning' },
  { name: 'Metasploit', cat: 'Exploitation' }, { name: 'Wireshark', cat: 'Packets' },
  { name: 'CrowdStrike', cat: 'EDR' }, { name: 'AWS Security Hub', cat: 'Cloud' },
]

const WORK_ENVS = [
  { type: 'Hybrid', pct: 48 },
  { type: 'Remote', pct: 36 },
  { type: 'In-Office', pct: 16 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Powered Threat Detection', icon: <Sparkles size={20} />,
    desc: 'AI systems now detect anomalous behaviour patterns, correlate threat intelligence at machine speed, and surface zero-day indicators that humans would miss in the volume of daily logs. Security engineers who build and tune these models are in extreme demand.',
    tools: ['Microsoft Copilot for Security', 'CrowdStrike Charlotte AI', 'Darktrace', 'SentinelOne AI'],
    borderColor: 'rgba(15,118,110,0.18)', bgColor: '#f0fdfa', icoBg: 'rgba(15,118,110,0.12)', icoColor: '#0f766e', tagBg: 'rgba(15,118,110,0.1)', tagColor: '#0f766e', titleColor: '#0f766e',
  },
  {
    title: 'LLM-Assisted Penetration Testing', icon: <Zap size={20} />,
    desc: 'AI tools now assist in generating exploit payloads, analysing code for vulnerabilities, and automating reconnaissance phases of penetration tests. Security engineers who leverage these responsibly complete assessments significantly faster.',
    tools: ['PentestGPT', 'BurpAI', 'Claude', 'Nuclei AI Templates'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI-Enhanced Security Operations', icon: <TrendingUp size={20} />,
    desc: 'SOAR platforms with AI dramatically reduce mean time to respond (MTTR) by automating alert triage, enrichment, and first-line containment. Security engineers who build and maintain these automated response pipelines are invaluable.',
    tools: ['Palo Alto XSOAR', 'Splunk SOAR', 'IBM QRadar AI', 'Google SecOps'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'AI/ML Security & Adversarial ML', 'Quantum-Resistant Cryptography',
  'Cloud-Native Security (CNAPP)', 'Supply Chain Security & SBOMs',
  'Cyber Threat Intelligence (CTI)', 'OT/IoT Security Engineering',
]

const PROS = [
  { title: 'Exceptional and Growing Demand', desc: 'Cybersecurity has a global talent shortfall of 3.5 million professionals. In South Africa, demand significantly outpaces supply at every level — from analyst to CISO.' },
  { title: 'High and Recession-Proof Salaries', desc: 'Security engineers are among the highest-paid engineers in the industry. Demand doesn\'t decrease during economic downturns — it increases as fraud and attacks rise.' },
  { title: 'Constant Intellectual Challenge', desc: 'No two days are the same. The threat landscape evolves continuously. Security engineers face genuinely novel problems that require creative, adversarial thinking to solve.' },
  { title: 'You Protect Real People', desc: 'Security breaches destroy lives — stolen identities, compromised medical records, drained bank accounts. Security engineers provide a service that has direct, meaningful human impact.' },
  { title: 'Clear Specialisation Paths', desc: 'You can specialise in offensive security (red team), defensive operations (blue team), cloud security, application security, GRC, or forensics — each a distinct and highly valued career.' },
  { title: 'Remote Work is Common', desc: 'Security engineering is largely remote-compatible. Many roles — especially for USD-paying international companies — offer full remote arrangements for skilled professionals.' },
]

const CONS = [
  { title: 'On-Call and Incident Pressure', desc: 'Security incidents don\'t happen on schedule. Senior security engineers face on-call rotations and may be pulled into a critical incident response at any hour — including weekends.' },
  { title: 'Adversarial Cat-and-Mouse', desc: 'Attackers only need to be right once. Defenders must be right every time. This asymmetry creates a persistent psychological weight that some engineers find exhausting long-term.' },
  { title: 'Certification Treadmill', desc: 'The field moves fast. Certifications expire, new frameworks emerge, and staying current requires continuous investment in time and money — throughout your entire career.' },
  { title: 'Blame Culture Risk', desc: 'When a breach happens, security teams often face intense scrutiny. Despite best efforts, security engineers can become scapegoats for systemic organisational failures in security culture.' },
  { title: 'Scope Keeps Expanding', desc: 'Every new cloud service, device, or API expands the attack surface you are responsible for. The scope of what a security team must protect grows faster than teams can keep pace.' },
  { title: 'Ethical and Legal Complexity', desc: 'Offensive security tools are dual-use. Understanding legal boundaries, scope limitations, and ethical responsibilities in penetration testing and research requires careful ongoing judgement.' },
]

const VIDEOS = [
  { id: 'inWWhr5tnEA', title: 'Cybersecurity Roadmap 2025 — Complete Guide', desc: 'A comprehensive guide to becoming a security engineer in 2025, covering all the essential skills, certifications, and career paths in cybersecurity.', dur: '18:45', channel: 'NetworkChuck' },
  { id: 'qiQR5rTSshw', title: 'Ethical Hacking Full Course', desc: 'Learn penetration testing from scratch — covering reconnaissance, exploitation, post-exploitation, and reporting with real-world lab environments.', dur: '15:00:00', channel: 'freeCodeCamp' },
  { id: 'U_P23SqJaDc', title: 'TryHackMe vs Hack The Box — Which Platform?', desc: 'Compare the two leading hands-on security learning platforms to choose the best path for your skill level and career goals.', dur: '12:30', channel: 'John Hammond' },
]

const TAKEAWAYS = [
  'Build a home lab and break things intentionally — you cannot defend what you have never attacked',
  'Certifications open doors, but practical skills close offers — every cert must come with documented hands-on lab work',
  'Learn to communicate risk in business terms — a security finding no one acts on provides zero protection',
  'Contribute to bug bounty programmes early — real-world targets teach you what textbooks and labs cannot',
  'Follow threat intelligence sources daily — the CISA KEV catalogue, NVD, and vendor advisories are your newspaper',
]

/* ─── NEW SECTIONS ────────────────────────────────────────────────────────── */

const CAREER_FACTS = [
  {
    icon: <Shield size={20} />, title: 'What You Protect',
    desc: 'Networks, cloud infrastructure, web applications, APIs, identities, endpoints, and data. Security engineers defend every layer of the technology stack against internal and external threats.',
    color: '#0f766e',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Vulnerability assessments, penetration testing, incident response, threat modelling, security architecture review, IAM policy management, SIEM rule development, and compliance auditing.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'DevOps engineers to implement DevSecOps pipelines, developers to fix code vulnerabilities, executives to communicate risk, legal and compliance teams, and law enforcement during major incidents.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'Cybersecurity is one of the fastest-growing fields globally. South Africa faces acute shortages driven by rising ransomware, POPIA compliance requirements, and cloud adoption across all sectors.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🛡️', title: 'You Are Always Needed', desc: 'Every organisation that handles data needs security engineers. Banks, hospitals, government, startups — the demand is universal, permanent, and growing at double-digit rates annually.' },
  { emoji: '💰', title: 'Among the Highest Engineering Salaries', desc: 'Senior security engineers earn R1M–R2M+ in South Africa. USD-paying remote roles for cloud security or offensive security specialists can far exceed this.' },
  { emoji: '🧩', title: 'Intellectually Addictive Problems', desc: 'Security is a never-ending puzzle. Adversaries evolve, new attack surfaces emerge, and defenders must constantly adapt. If you thrive on challenge, this career will never bore you.' },
  { emoji: '🌍', title: 'Work Anywhere', desc: 'Cybersecurity talent is globally portable. South African security engineers are sought by European, US, and UK companies for remote roles at international salaries.' },
  { emoji: '🎯', title: 'Clear Specialisations', desc: 'Red team, blue team, cloud security, AppSec, GRC, threat intelligence — each specialisation has its own career ladder, community, and highly competitive salary band.' },
  { emoji: '🔐', title: 'You Make a Real Difference', desc: 'Preventing a ransomware attack saves jobs. Stopping a data breach protects thousands of real people\'s lives and finances. Security work has direct, measurable, human impact.' },
]

const FREE_RESOURCES = [
  { category: 'Platforms', color: '#0f766e', bgColor: '#f0fdfa', items: [
    { name: 'TryHackMe — Beginner to Advanced Labs', url: '#', type: 'Platform', rating: 5 },
    { name: 'Hack The Box — Real-World Machines', url: '#', type: 'Platform', rating: 5 },
    { name: 'PortSwigger Web Security Academy (free)', url: '#', type: 'Course', rating: 5 },
    { name: 'OWASP WebGoat — Vulnerable App Lab', url: '#', type: 'Lab', rating: 5 },
  ]},
  { category: 'Study Paths', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'Professor Messer — CompTIA Security+ (free)', url: '#', type: 'Course', rating: 5 },
    { name: 'TCM Security — Practical Ethical Hacking', url: '#', type: 'Course', rating: 5 },
    { name: 'SANS Cyber Aces (free introductory)', url: '#', type: 'Course', rating: 4 },
    { name: 'roadmap.sh — Cybersecurity Path', url: '#', type: 'Reference', rating: 5 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'John Hammond YouTube Channel', url: '#', type: 'YouTube', rating: 5 },
    { name: 'r/netsec & r/AskNetsec', url: '#', type: 'Forum', rating: 4 },
    { name: 'Darknet Diaries Podcast', url: '#', type: 'Podcast', rating: 5 },
    { name: 'Krebs on Security Blog', url: '#', type: 'Blog', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Security Analyst', range: 'R280k – R500k', midpoint: 390, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Security Engineer', range: 'R580k – R1M', midpoint: 790, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Security Engineer', range: 'R1M – R1.8M', midpoint: 1400, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'CISO / Principal Sec Eng', range: 'R2M – R4M+', midpoint: 2800, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Only Studying Offence, Never Defence',
    desc: 'Many aspiring security engineers get addicted to hacking labs and neglect defensive skills — log analysis, detection engineering, and incident response. Employers need balanced professionals.',
    fix: 'For every offensive technique you learn, practise the corresponding detection and response. Study how a SIEM would catch that attack.',
  },
  {
    num: '02', title: 'Collecting Certifications Without Labs',
    desc: 'A Security+ or CEH without hands-on experience is a paper qualification that experienced hiring managers see through immediately. Certificates without practice are nearly worthless.',
    fix: 'Complete every cert study with a corresponding hands-on lab project. For OSCP, commit to completing at least 30 Hack The Box machines before the exam.',
  },
  {
    num: '03', title: 'Ignoring Scripting and Automation',
    desc: 'Security engineers who can\'t write Python or Bash scripts to automate repetitive tasks are significantly less effective. Manual-only defenders cannot keep pace with automated attackers.',
    fix: 'Learn Python well enough to write your own tools, automate log parsing, and build simple security utilities. It will multiply your effectiveness.',
  },
  {
    num: '04', title: 'Skipping GRC and Compliance Knowledge',
    desc: 'Technical skills get you hired; business alignment gets you promoted. Security engineers who cannot communicate risk or understand compliance frameworks hit a hard ceiling at mid-level.',
    fix: 'Study ISO 27001 and POPIA even as a junior. Understanding how security aligns with business risk will differentiate you from purely technical peers.',
  },
  {
    num: '05', title: 'Never Building a Public Portfolio',
    desc: 'Security hiring is competitive. A GitHub of CTF write-ups, a blog analysing malware samples, or a bug bounty Hall of Fame entry proves your skills in a way a CV cannot.',
    fix: 'Write a blog post for every major CTF or machine you complete. Publish your tools. Contribute to open-source security projects. Make your learning visible.',
  },
  {
    num: '06', title: 'Underestimating Social Engineering',
    desc: 'The most sophisticated technical defences in the world are regularly bypassed through phishing and pretexting. Security engineers who ignore human-layer attacks miss the most common attack vector.',
    fix: 'Study social engineering deeply. Include phishing simulation and security awareness in your skill set — not just technical controls.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Network / Sysadmin',
    ease: 'Natural Fit', easeColor: '#0f766e', easeBg: '#f0fdfa',
    desc: 'Your knowledge of firewalls, routing, and server configuration is foundational security knowledge. Add threat analysis, penetration testing, and SIEM skills to move directly into security operations or network security roles.',
    steps: ['Get CompTIA Security+ to formalise existing knowledge', 'Set up a home lab and practise on TryHackMe', 'Learn SIEM basics with free Splunk training', 'Target network security or SOC analyst roles'],
  },
  {
    from: 'Software Developer',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Developers who pivot to security become exceptional application security engineers. Your code knowledge lets you spot vulnerabilities that pure security analysts miss. Add OWASP, secure code review, and pentesting skills.',
    steps: ['Complete PortSwigger Web Security Academy (free)', 'Learn SAST/DAST tools and secure code review', 'Study OWASP Top 10 in depth with lab exercises', 'Target AppSec engineer or DevSecOps roles'],
  },
  {
    from: 'IT Support / Help Desk',
    ease: 'Very Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Your understanding of end-user environments, Active Directory, and endpoint issues translates well into SOC analyst and endpoint security roles. Add formal security knowledge and SIEM skills to make the transition.',
    steps: ['Complete CompTIA Security+ and Network+', 'Get hands-on with TryHackMe SOC Level 1 path', 'Learn basic scripting in Python or PowerShell', 'Apply to SOC Tier 1 Analyst roles as your entry point'],
  },
  {
    from: 'Legal / Risk / Compliance',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'GRC skills are in high demand and underserved by purely technical candidates. Your regulatory knowledge and risk communication skills are rare and valuable. Add technical security foundations to build a uniquely powerful hybrid profile.',
    steps: ['Study CISSP fundamentals (not the exam, the concepts)', 'Learn cloud security basics through AWS or Azure training', 'Get CISA or CRISC certification to formalise GRC skills', 'Target security governance, risk, and compliance manager roles'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Foundations', color: '#0f766e', bg: '#f0fdfa', days: [
    { day: 'Day 1–2', task: 'Set up Kali Linux in a VM. Explore the OS, learn basic terminal commands, and understand the toolset pre-installed.' },
    { day: 'Day 3–4', task: 'Complete the TryHackMe "Pre-Security" pathway. Cover networking, the web, Linux, and Windows fundamentals.' },
    { day: 'Day 5–6', task: 'Study the OWASP Top 10. Understand each vulnerability with a real-world breach example for each one.' },
    { day: 'Day 7', task: 'Create a GitHub account and write your first security blog post summarising what you learned this week.' },
  ]},
  { week: 'Week 2', theme: 'Offensive Skills', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Start PortSwigger Web Security Academy. Complete the SQL Injection and XSS modules with all labs.' },
    { day: 'Day 10–11', task: 'Complete your first TryHackMe room with Burp Suite. Practise intercepting and modifying HTTP requests.' },
    { day: 'Day 12–13', task: 'Learn Nmap scanning techniques. Map a local network and understand service enumeration output.' },
    { day: 'Day 14', task: 'Complete an "Easy" machine on Hack The Box or TryHackMe. Write up your approach and publish it.' },
  ]},
  { week: 'Week 3', theme: 'Defensive Skills', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Set up free Splunk (or Elastic Stack). Ingest system logs and write your first detection query.' },
    { day: 'Day 17–18', task: 'Study incident response phases. Write a basic IR playbook for a phishing attack scenario.' },
    { day: 'Day 19–20', task: 'Review the MITRE ATT&CK framework. Map 5 common techniques to specific log sources and detection methods.' },
    { day: 'Day 21', task: 'Complete TryHackMe "SOC Level 1" introductory rooms. Document what you learned about blue team operations.' },
  ]},
  { week: 'Week 4', theme: 'Apply & Ship', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Sign up for a bug bounty programme (HackerOne or Bugcrowd). Read their in-scope guidelines and begin reconnaissance.' },
    { day: 'Day 25–26', task: 'Study for CompTIA Security+ using Professor Messer\'s free videos. Complete the first two domains.' },
    { day: 'Day 27–28', task: 'Build a simple home network with a pfSense firewall. Configure basic firewall rules and review logs.' },
    { day: 'Day 29–30', task: 'Update your LinkedIn and CV with new skills and projects. Apply to 5 junior SOC or security analyst roles.' },
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
    navigator.clipboard.writeText(window.location.href).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }
  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'Security Engineer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Security Engineer in 2026', url: window.location.href }) }
      catch (_) {}
    } else { handleCopy() }
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-10 p-4 rounded-2xl" style={{ background: '#f8f9ff', border: `1px solid ${C.border}` }}>
      <span className="text-xs font-semibold" style={{ color: C.textMuted }}>Share this roadmap:</span>
      <button onClick={handleCopy} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: copied ? 'rgba(22,163,74,0.1)' : C.primaryLight, color: copied ? '#16a34a' : C.primary, outline: 'none' }}>
        {copied ? <CheckCheck size={13} /> : <Copy size={13} />}{copied ? 'Copied!' : 'Copy Link'}
      </button>
      <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: C.violetLight, color: C.violet, outline: 'none' }}>
        <Download size={13} />Download / Save PDF
      </button>
      <button onClick={handleShare} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: C.orangeLight, color: C.orange, outline: 'none' }}>
        <Share2 size={13} />Share
      </button>
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono truncate max-w-xs" style={{ background: '#f1f5f9', color: C.textMuted, border: `1px solid ${C.border}` }}>
        <Link2 size={11} style={{ color: C.textFaint, flexShrink: 0 }} />
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/security-engineer'}</span>
      </div>
    </div>
  )
}

function SectionHeader({ icon, title, subtitle, iconBg, iconColor }: { icon: React.ReactNode; title: string; subtitle: string; iconBg: string; iconColor: string }) {
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

function useFade() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; el.style.transition = 'opacity 0.55s ease, transform 0.55s ease'
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect() } }, { threshold: 0.07 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return ref
}

export default function SecurityEngineerRoadmapPage() {
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
        gsap.fromTo(progressRef.current, { width: '0%' }, { width: '100%', duration: 2.2, ease: 'power2.out', scrollTrigger: { trigger: tlSectionRef.current, start: 'top 72%', toggleActions: 'play none none reverse' } })
      }
    }); return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bars = barsContainerRef.current?.querySelectorAll<HTMLElement>('[data-bar-w]')
      bars?.forEach(bar => {
        gsap.fromTo(bar, { width: '0%' }, { width: `${bar.dataset.barW}%`, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: bar, start: 'top 92%', toggleActions: 'play none none reverse' } })
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

      <Link to="/roadmaps" className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold no-underline transition-all duration-200"
        style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', border: `1px solid ${C.border}`, color: C.textMuted, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <ArrowLeft size={14} /> All Roadmaps
      </Link>

      {/* ── HERO ── */}
      <div className="relative w-full" style={{ background: C.bg }}>
        <div className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: 600 }}>
          <img
            src="https://i.imgur.com/mVJonou.jpeg"
            alt="Security Engineer — cybersecurity and server infrastructure"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Shield size={12} /> Security & Cybersecurity
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Security Engineer
              </h1>
              <span className="block font-normal mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', color: C.textMuted }}>
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
            Defend the systems that power the world. Security engineers protect networks, data, and infrastructure from adversaries — the invisible force that keeps every digital interaction safe.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Security Engineering" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Security Engineer</strong> designs, implements, and maintains the defences that protect an organisation's systems, networks, and data from cyber threats. Unlike general IT roles, security engineers think adversarially — modelling attacker behaviour to build controls that can withstand real-world attacks. They operate across offensive security (finding vulnerabilities before attackers do) and defensive security (detecting, responding to, and recovering from incidents).
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Security Engineering could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Security Engineer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,118,110,0.3)'; (e.currentTarget as HTMLElement).style.background = '#f0fdfa' }}
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
                  <div className="text-sm font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Tools & Tech</div>
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
            <SectionHeader icon={<Clock size={22} />} title="Career Timeline" subtitle="Time estimates and salary ranges for each level" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="mb-10">
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Analyst → CISO</span></div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                <div ref={progressRef} className="h-1.5 rounded-full" style={{ width: '0%', background: 'linear-gradient(90deg, #0891b2 0%, #16a34a 33%, #7c3aed 66%, #ea580c 100%)' }} />
              </div>
              <div className="flex justify-between mt-2.5">
                {CAREER_LEVELS.map(l => <span key={l.level} className="font-mono" style={{ color: l.accent, fontSize: '0.68rem' }}>{l.duration}</span>)}
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
          <SectionHeader icon={<Target size={22} />} title="Step-by-Step Roadmap" subtitle="Your path from complete beginner to job-ready" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="relative flex flex-col items-center">
            {ROADMAP_STEPS.map((s, i) => {
              const icons = ['🌐', '🛡️', '🔓', '📊', '☁️', '📋']
              const accentColors = ['#0f766e', '#16a34a', '#0f766e', '#16a34a', '#0f766e', '#16a34a']
              const accent = accentColors[i]; const isLast = i === ROADMAP_STEPS.length - 1; const isEven = i % 2 === 0
              return (
                <div key={s.step} className="w-full flex flex-col items-center">
                  <div className="w-full" style={{ opacity: 0, transform: 'translateY(20px)', transition: `opacity 0.5s ${i * 0.13}s ease, transform 0.5s ${i * 0.13}s ease` }}
                    ref={el => {
                      if (!el) return
                      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect() } }, { threshold: 0.15 })
                      obs.observe(el)
                    }}>
                    <div className="w-full rounded-3xl overflow-hidden" style={{ background: `${accent}08`, border: `2px solid ${accent}25`, boxShadow: `0 4px 24px ${accent}12` }}>
                      <div className="flex items-center gap-4 px-5 py-5">
                        <div className="flex-shrink-0 flex items-center justify-center rounded-full text-2xl font-bold" style={{ width: 64, height: 64, background: `linear-gradient(135deg, ${accent}20, ${accent}10)`, border: `3px solid ${accent}40` }}>{icons[i]}</div>
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
                      <div className="px-5 pb-4 text-xs leading-relaxed" style={{ color: C.textMuted, borderTop: `1px solid ${accent}15`, paddingTop: 10 }}>{s.description}</div>
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.indigo} 100%)`, boxShadow: '0 8px 48px rgba(15,118,110,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>12–16 months · Daily lab practice · Build and document real projects</div>
            </div>
          </div>
          <ShareBar />
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
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.indigoLight }}><Code size={16} style={{ color: C.indigo }} /></div>
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
            <SectionHeader icon={<BookOpen size={22} />} title="Best Free Resources" subtitle="World-class learning material, most of it completely free" iconBg={C.greenLight} iconColor={C.green} />
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Security Engineering in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)', color: C.textMuted }}>
              AI tools don't replace security engineers — they <em style={{ color: C.primary }}>amplify</em> them. The engineers who leverage AI for threat detection, automated response, and assisted penetration testing complete more work at higher quality — freeing time for the creative, adversarial thinking that machines cannot replicate.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-9">
              {AI_IMPACTS.map(item => (
                <div key={item.title} className="rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-1 hover:shadow-md" style={{ background: item.bgColor, borderColor: item.borderColor }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: item.icoBg }}><span style={{ color: item.icoColor }}>{item.icon}</span></div>
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
            <SectionHeader icon={<DollarSign size={22} />} title="Salary" subtitle="What you can realistically earn at each stage" iconBg={C.greenLight} iconColor={C.green} />
            <div className="rounded-2xl p-6 mb-6 border" style={{ background: '#f0fdf4', borderColor: 'rgba(22,163,74,0.2)' }}>
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially for senior cloud security and offensive security specialists — can pay 2–4× these figures in USD.</p>
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
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 3500) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> Security engineers at fintech, financial services, and cloud infrastructure companies earn 30–50% more than those at general IT service companies. OSCP certification can increase junior salaries by R100k–R180k overnight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring security engineers" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into security engineering from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Cybersecurity" iconBg={C.redLight} iconColor={C.red} />
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
                      <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs no-underline" style={{ color: C.indigo }}>Watch <ExternalLink size={11} /></a>
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
                Security engineering is the discipline that <strong style={{ color: C.primary }}>makes trust possible</strong>. Every digital transaction, every private conversation, every medical record stored online depends on security engineers who chose to defend the systems others take for granted.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The path demands constant learning and adversarial thinking — but the fundamentals of networking, cryptography, and threat modelling you build early compound for decades. A security engineer who understands why systems fail will never be without work.
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
        <div className="relative overflow-hidden rounded-3xl px-12 py-16 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.indigo} 100%)` }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: 'rgba(255,255,255,0.05)', top: -120, right: -80 }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Rocket size={30} style={{ color: '#fff' }} />
          </div>
          <h2 className="font-extrabold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
            Ready to Start Your Journey?
          </h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open Kali Linux and start your first lab.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              Get Career Advice
            </a>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start defending today. Your future self will thank you.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}
