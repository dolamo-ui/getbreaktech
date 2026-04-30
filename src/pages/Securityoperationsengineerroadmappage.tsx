import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft, ArrowRight, Check, X,
  Clock, DollarSign, Rocket,
  CheckCircle2, MessageSquare, Play, ExternalLink,
  GraduationCap, Scale, ThumbsUp, ThumbsDown,
  Briefcase, Coffee, Users, 
  Sparkles, Zap, TrendingUp,
  Link2, Download, Share2, Copy, CheckCheck,
  BookOpen, AlertTriangle, RefreshCw, Star, Calendar,
  Award, Target, Flame, 
  Layers, 
  Shield,
  Workflow, Eye,
  Terminal, Search, 
  Bell,
  Radar, AlertOctagon,
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
  primary: '#0f766e',         // teal — SecOps brand colour
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
    level: 'Junior', title: 'SOC Analyst (Tier 1)', duration: '0–2 yrs', salary: 'R280k–R480k',
    description: 'Monitor security alerts, triage incidents, escalate threats, and respond to common attack patterns. Learn SIEM tools, work rotating shifts, and build foundational threat detection skills under guidance.',
    skills: ['SIEM Tools', 'Alert Triage', 'Ticketing', 'Log Analysis'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'SOC Analyst (Tier 2)', duration: '2–5 yrs', salary: 'R540k–R950k',
    description: 'Lead incident response investigations, perform threat hunting, tune detection rules, and mentor Tier 1 analysts. Own complex incidents end-to-end and contribute to playbook development.',
    skills: ['Threat Hunting', 'IR Leadership', 'Rule Tuning', 'Forensics'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Security Operations Engineer', duration: '5–8 yrs', salary: 'R950k–R1.6M',
    description: 'Architect detection frameworks, build custom tooling, design SIEM/SOAR pipelines, lead threat intelligence programs, and establish security operations standards across the organisation.',
    skills: ['Detection Eng', 'SOAR Automation', 'Threat Intel', 'Architecture'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Principal', title: 'Principal SecOps / CISO', duration: '8+ yrs', salary: 'R1.6M+',
    description: 'Define security operations strategy, shape organisational risk posture, lead SOC transformation, build world-class detection & response programs, and advise executive leadership on threat landscape.',
    skills: ['Security Strategy', 'Program Mgmt', 'Risk Mgmt', 'Leadership'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Networking & OS Fundamentals',
    description: 'Master TCP/IP networking, OSI model, DNS, HTTP/S, firewall concepts, and operating system internals for both Linux and Windows. Security is built on deep infrastructure understanding — without this foundation, threat detection is guesswork.',
    duration: '2–3 months', skills: ['TCP/IP', 'Linux / Windows', 'Firewalls', 'DNS & HTTP'],
  },
  {
    step: 2, title: 'Security Foundations & Frameworks',
    description: 'Learn core security concepts — CIA triad, authentication, encryption, PKI, and vulnerability management. Study MITRE ATT&CK, NIST CSF, and Cyber Kill Chain frameworks. These mental models govern how defenders think about every threat.',
    duration: '2–3 months', skills: ['MITRE ATT&CK', 'NIST CSF', 'Encryption', 'Vuln Mgmt'],
  },
  {
    step: 3, title: 'SIEM, Log Analysis & Threat Detection',
    description: 'Get hands-on with SIEM platforms (Splunk, Microsoft Sentinel, Elastic). Learn to write detection rules, correlate events, reduce false positives, and build dashboards. Log analysis is the daily bread of every SOC analyst worldwide.',
    duration: '2–3 months', skills: ['Splunk / Sentinel', 'KQL / SPL', 'Log Correlation', 'Detection Rules'],
  },
  {
    step: 4, title: 'Incident Response & Digital Forensics',
    description: 'Learn the full incident response lifecycle — preparation, detection, containment, eradication, recovery, and post-incident review. Study memory forensics, disk imaging, malware triage, and how to preserve and analyse evidence correctly.',
    duration: '2–3 months', skills: ['IR Lifecycle', 'Memory Forensics', 'Malware Triage', 'Chain of Custody'],
  },
  {
    step: 5, title: 'Threat Intelligence & Threat Hunting',
    description: 'Understand threat actor TTPs, IOC management, threat feeds, and intelligence-led detection. Learn proactive threat hunting methodologies — hypothesis-driven, analytics-driven — to uncover attacks before alerts fire.',
    duration: '2 months', skills: ['Threat Intel', 'IOC/TTP Analysis', 'Threat Hunting', 'OSINT'],
  },
  {
    step: 6, title: 'SOAR, Automation & Cloud Security',
    description: 'Build automated response playbooks with SOAR platforms. Learn scripting (Python, PowerShell) for security automation. Understand cloud security monitoring for AWS, Azure, and GCP — cloud is where most modern attacks unfold.',
    duration: '2–3 months', skills: ['SOAR Playbooks', 'Python/PS Scripting', 'Cloud Security', 'API Integration'],
  },
]

const HARD_SKILLS = [
  { name: 'SIEM Platforms (Splunk, Sentinel, Elastic)', level: 95 },
  { name: 'Incident Response & Forensics', level: 92 },
  { name: 'Network Traffic Analysis', level: 88 },
  { name: 'Threat Intelligence & Hunting', level: 85 },
  { name: 'Scripting (Python / PowerShell / Bash)', level: 80 },
  { name: 'SOAR & Security Automation', level: 78 },
  { name: 'Cloud Security Monitoring (AWS/Azure/GCP)', level: 76 },
  { name: 'Malware Analysis & Reverse Engineering', level: 70 },
]

const SOFT_SKILLS = [
  { name: 'Analytical Thinking Under Pressure', description: 'Security incidents rarely announce themselves cleanly. Piece together fragmented signals across thousands of log lines under time pressure while maintaining methodical, evidence-based analysis.' },
  { name: 'Adversarial Mindset', description: 'Think like an attacker. Understand attacker motivations, TTPs, and persistence techniques. The best defenders are those who genuinely understand how breaches unfold from the inside.' },
  { name: 'Clear Communication', description: 'Translate complex technical findings into clear executive summaries. Stakeholders need to understand severity, business impact, and recommended actions — without requiring a CISSP to read your reports.' },
  { name: 'Attention to Anomalies', description: 'Notice what\'s slightly wrong. A single unusual login time, a rarely-used account, or a slightly misspelled domain name can be the difference between catching an APT and missing a major breach entirely.' },
  { name: 'Calm in Crisis', description: 'When a ransomware incident activates at 2 AM, panic is the enemy. Experienced SecOps engineers follow established playbooks, communicate clearly, make decisive containment calls, and protect calm reasoning.' },
  { name: 'Continuous Learning Drive', description: 'The threat landscape evolves daily. Zero-days, novel persistence techniques, and new attack vectors emerge constantly. Security engineers who stop learning become the weakest link in the defence chain.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Computer Science / Cybersecurity Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(15,118,110,0.2)', bgColor: '#f0fdfa', typeBg: 'rgba(15,118,110,0.12)', typeColor: '#0f766e',
    pros: ['Strong networking & OS fundamentals', 'Recruiter credibility and brand recognition', 'Campus security research opportunities', 'Foundational CS depth'],
    cons: ['Outdated threat landscape curriculum', 'Limited hands-on SOC simulation', 'Slow path to first analyst role', 'Certifications still required alongside degree'],
  },
  {
    type: 'Bootcamp', title: 'Cybersecurity Bootcamp', duration: '3–6 months', cost: 'R50k – R120k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Rapid path to SOC Analyst entry role', 'Hands-on labs and simulated environments', 'Career support and job placement', 'Often includes certification prep'],
    cons: ['Variable program quality', 'Depth depends heavily on provider', 'Competitive entry-level market', 'Practical experience still needed post-bootcamp'],
  },
  {
    type: 'Self-Taught', title: 'Certifications & Home Labs', duration: '9–18 months', cost: 'R5k – R40k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['Industry-recognised certifications (CompTIA, SANS)', 'Build real home labs with free tools', 'Self-paced with no tuition debt', 'Directly applicable practical skills'],
    cons: ['Requires strong self-discipline', 'Certification costs add up quickly', 'No structured mentorship', 'Lab environment does not replicate enterprise scale'],
  },
]

const SCHEDULE = [
  { time: '8:00', act: 'Shift Handover & Alert Queue Review', desc: 'Review overnight alerts, receive handover from previous shift, prioritise the active incident queue and set the day\'s investigation focus', duration: '30 min', icon: <Bell size={14} /> },
  { time: '8:30', act: 'Alert Triage & Initial Investigation', desc: 'Work through prioritised SIEM alerts, correlate with threat intel, determine false positives vs genuine threats, and escalate critical incidents', duration: '2.5 hrs', icon: <Search size={14} /> },
  { time: '11:00', act: 'Active Incident Response', desc: 'Lead or support ongoing incidents — containment actions, evidence preservation, stakeholder communication, and coordinating with IT and legal teams', duration: '1.5 hrs', icon: <AlertOctagon size={14} /> },
  { time: '12:30', act: 'Lunch & Mental Reset', desc: 'Step away. Security work is cognitively draining. Returning with fresh perspective catches things tired eyes miss — and prevents analyst burnout over time', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '1:30', act: 'Threat Hunting & Proactive Analysis', desc: 'Run hypothesis-driven threat hunts through historical log data, analyse unusual patterns, and look for attacker activity that bypassed automated detection', duration: '1.5 hrs', icon: <Radar size={14} /> },
  { time: '3:00', act: 'Detection Engineering & Playbooks', desc: 'Tune SIEM rules to reduce false positives, build new detection logic, update incident response playbooks, and automate repetitive response tasks via SOAR', duration: '1.5 hrs', icon: <Shield size={14} /> },
  { time: '4:30', act: 'Documentation & Threat Intel Review', desc: 'Update incident tickets, write post-incident reports, review daily threat intel feeds, and brief team on emerging TTPs and adversary campaigns', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Splunk / Sentinel', cat: 'SIEM' }, { name: 'CrowdStrike', cat: 'EDR' },
  { name: 'Wireshark', cat: 'Network' }, { name: 'MISP', cat: 'Threat Intel' },
  { name: 'TheHive / Cortex', cat: 'SOAR' }, { name: 'Velociraptor', cat: 'Forensics' },
  { name: 'YARA', cat: 'Detection' }, { name: 'VirusTotal', cat: 'Analysis' },
]

const WORK_ENVS = [
  { type: 'On-Site / SOC', pct: 45 },
  { type: 'Hybrid', pct: 38 },
  { type: 'Remote', pct: 17 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Assisted Threat Detection', icon: <Sparkles size={20} />,
    desc: 'AI/ML models in modern SIEM platforms drastically reduce alert fatigue by correlating thousands of events and surfacing genuine threats. Security engineers who understand and tune these models detect breaches faster and with higher confidence.',
    tools: ['Microsoft Copilot for Security', 'Splunk MLTK', 'Darktrace', 'CrowdStrike Charlotte AI'],
    borderColor: 'rgba(15,118,110,0.18)', bgColor: '#f0fdfa', icoBg: 'rgba(15,118,110,0.12)', icoColor: '#0f766e', tagBg: 'rgba(15,118,110,0.1)', tagColor: '#0f766e', titleColor: '#0f766e',
  },
  {
    title: 'Automated Incident Response', icon: <Zap size={20} />,
    desc: 'AI-powered SOAR platforms can now triage, enrich, and respond to common threats in seconds — blocking IPs, isolating endpoints, and notifying stakeholders autonomously. This frees SecOps engineers to focus on sophisticated, novel threats.',
    tools: ['Palo Alto XSOAR', 'Splunk SOAR', 'IBM QRadar SOAR', 'Tines'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI-Powered Threat Intelligence', icon: <TrendingUp size={20} />,
    desc: 'LLMs and AI tools can now parse threat actor reports, extract IOCs, summarise CVEs, and generate contextual threat briefings automatically. Security engineers using these tools operate with far more intelligence context in less time.',
    tools: ['Recorded Future AI', 'Google SecPalm', 'Anomali AI', 'OpenCTI'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'Cloud-Native Detection (AWS GuardDuty, Azure Defender)',
  'Detection-as-Code (Sigma Rules, Terraform for Security)',
  'AI/ML Security Model Tuning',
  'Identity Threat Detection & Response (ITDR)',
  'Kubernetes & Container Security Monitoring',
  'Attack Surface Management (ASM)',
]

const PROS = [
  { title: 'Mission-Critical Work', desc: 'Security operations protect real people, real data, and real organisations. When you catch an attacker before they exfiltrate data, you prevent real harm. That sense of mission is rare and deeply motivating.' },
  { title: 'Exceptional Job Security', desc: 'Cyber threats are not going away. The global shortage of qualified security engineers is massive and growing. SecOps professionals have near-zero unemployment in any economic climate.' },
  { title: 'Constantly Evolving Challenge', desc: 'No two incidents are the same. Attackers constantly innovate. Security engineers who embrace this endless learning curve never experience the career stagnation common in more static technical fields.' },
  { title: 'Strong Compensation', desc: 'Senior SecOps engineers earn R950k–R1.6M in South Africa. Global remote contracts, especially MSSP or consulting roles in USD or GBP, can pay 2–4× these figures.' },
  { title: 'Adversarial Thinking Mindset', desc: 'You develop a unique cognitive skill — thinking like an attacker. This adversarial perspective is powerful, rare, and transfers to technical decision-making in almost every other engineering discipline.' },
  { title: 'Deep Technical Breadth', desc: 'SecOps exposes you to networking, operating systems, cloud, applications, identity, and infrastructure simultaneously. You become one of the most technically broad engineers in any organisation.' },
]

const CONS = [
  { title: 'Alert Fatigue is Real', desc: 'High-volume SOC environments generate thousands of alerts daily. The cognitive load of sustained triage work without proper tooling and processes causes burnout — especially at Tier 1 analyst level.' },
  { title: 'Rotating Shift Work', desc: 'Threats happen around the clock. Many SOC roles — especially at Tier 1 — involve nights, weekends, and holiday on-call rotations that disrupt work-life balance significantly.' },
  { title: 'Incident Response Stress', desc: 'When a major breach is unfolding, the pressure is intense. Executives are watching, legal teams are involved, and the organisation\'s reputation may be at stake. High-stakes moments are frequent.' },
  { title: 'Attacker Asymmetry', desc: 'Attackers only need to succeed once. Defenders must succeed every time. This fundamental asymmetry creates a sustained psychological burden that security professionals must consciously manage.' },
  { title: 'Tooling & Budget Constraints', desc: 'Many organisations underinvest in security tooling. Working with outdated SIEM configurations, inadequate logging coverage, or overstretched teams is common and professionally frustrating.' },
  { title: 'Imposter Syndrome Culture', desc: 'The security community\'s gatekeeping culture and breadth of required knowledge creates significant imposter syndrome, especially early in careers. Certifications and confidence take time to build.' },
]

const VIDEOS = [
  { id: 'a83ASGn_V_s', title: 'SOC Analyst Career Roadmap 2025', desc: 'Complete guide to becoming a SOC Analyst — tools, certifications, home labs, and the realistic path from zero to first security job.', dur: '22:10', channel: 'Gerald Auger, PhD' },
  { id: 'inWWhr5tnEA', title: 'How to Build a Home Security Lab', desc: 'Set up a professional-grade security testing environment at home using free and open-source tools. Essential for building practical detection skills.', dur: '45:00', channel: 'John Hammond' },
  { id: 'qiQR7Qe0pQU', title: 'MITRE ATT&CK Full Explanation', desc: 'Deep dive into the MITRE ATT&CK framework — tactics, techniques, and procedures that every SecOps professional must know inside and out.', dur: '31:22', channel: 'Simply Cyber' },
]

const TAKEAWAYS = [
  'Build a home lab immediately — hands-on experience with free tools beats theory alone every time',
  'Learn MITRE ATT&CK deeply — every detection rule, playbook, and threat hunt maps back to this framework',
  'Get CompTIA Security+ first, then pursue specialised certs (CySA+, GCIH, GCIA) as you level up',
  'Practice writing clear, concise incident reports — communication is as important as technical skill',
  'Follow threat intelligence feeds daily — knowing current adversary TTPs keeps your detection logic sharp',
]

const CAREER_FACTS = [
  {
    icon: <Eye size={20} />, title: 'What You Protect',
    desc: 'Networks, endpoints, cloud infrastructure, applications, identities, and sensitive data. Security Operations Engineers are the last line of defence against nation-state actors, ransomware gangs, and insider threats.',
    color: '#0f766e',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Alert triage, incident response, threat hunting, detection rule engineering, SOAR automation, threat intelligence analysis, forensic investigation, and security posture improvement.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'IT operations, legal and compliance teams, executive leadership, red teams, vulnerability management, cloud architects, and external MSSPs and threat intelligence providers.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'There are 3.5 million unfilled cybersecurity roles globally. In South Africa, demand for qualified SecOps engineers grew 31% in 2024. The shortage continues widening as threat volumes increase.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🛡️', title: 'Protect What Matters', desc: 'Security is not optional. You defend real people\'s data, livelihoods, and privacy against genuine adversaries. Few technical roles carry this level of real-world impact and responsibility.' },
  { emoji: '💰', title: 'Exceptional Salaries', desc: 'Senior SecOps engineers earn R950k–R1.6M in South Africa. Global MSSP and consulting contracts in USD pay significantly more. Demand far exceeds supply in every region.' },
  { emoji: '🧩', title: 'Intellectual Challenge', desc: 'Threat actors are creative, persistent, and intelligent. Defeating them requires deep analytical thinking, adversarial creativity, and continuous learning. Boredom is structurally impossible.' },
  { emoji: '🌐', title: 'Global Relevance', desc: 'Cybersecurity skills transfer universally. South African SecOps engineers work for companies in the US, UK, Europe, and the Middle East remotely — commanding global salaries.' },
  { emoji: '⚡', title: 'Always In Demand', desc: 'The global shortage of security professionals is structural. 3.5 million unfilled roles globally means qualified SecOps engineers are never at risk of unemployment, even during recessions.' },
  { emoji: '🔬', title: 'Endless Specialisation', desc: 'From malware analysis to cloud security to threat intelligence to red teaming — security offers more deep specialisation paths than almost any other technical discipline.' },
]

const FREE_RESOURCES = [
  { category: 'Certifications', color: '#0f766e', bgColor: '#f0fdfa', items: [
    { name: 'CompTIA Security+ (entry-level foundation)', url: '#', type: 'Cert', rating: 5 },
    { name: 'Blue Team Labs Online (free tier)', url: '#', type: 'Practice', rating: 5 },
    { name: 'TryHackMe — SOC Level 1 Path', url: '#', type: 'Platform', rating: 5 },
    { name: 'SANS Cyber Aces (free)', url: '#', type: 'Course', rating: 4 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'LetsDefend — Blue Team Simulations', url: '#', type: 'Lab', rating: 5 },
    { name: 'Hack The Box — Defender Track', url: '#', type: 'Lab', rating: 5 },
    { name: 'Splunk Free Training (Splunk.com)', url: '#', type: 'Course', rating: 5 },
    { name: 'Elastic Security Documentation', url: '#', type: 'Reference', rating: 4 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'Gerald Auger PhD — Simply Cyber YouTube', url: '#', type: 'YouTube', rating: 5 },
    { name: 'John Hammond — Security YouTube Channel', url: '#', type: 'YouTube', rating: 5 },
    { name: 'r/netsec & r/blueteamsec Reddit', url: '#', type: 'Forum', rating: 4 },
    { name: 'MITRE ATT&CK Navigator (free)', url: '#', type: 'Tool', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'SOC Analyst Tier 1 (Junior)', range: 'R280k – R480k', midpoint: 380, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'SOC Analyst Tier 2 (Mid-Level)', range: 'R540k – R950k', midpoint: 745, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Security Operations Engineer (Senior)', range: 'R950k – R1.6M', midpoint: 1275, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Principal SecOps / Security Architect', range: 'R1.6M – R2.8M+', midpoint: 2100, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Chasing Certifications Without Hands-On Experience',
    desc: 'Collecting paper certifications without building home labs or working real incident scenarios. Recruiters and interviewers probe practical knowledge — certificates open doors but skills get offers.',
    fix: 'Set up a home lab using VirtualBox, Splunk Free, and Security Onion before your first certification exam.',
  },
  {
    num: '02', title: 'Ignoring the Attacker Perspective',
    desc: 'Trying to build detections without understanding attacker TTPs. If you don\'t know how privilege escalation works, you can\'t detect it. Blue teamers must think red to be effective.',
    fix: 'Spend 20% of your learning time in offensive security basics. TryHackMe and HackTheBox both have beginner offensive tracks.',
  },
  {
    num: '03', title: 'Not Learning to Write Detection Rules',
    desc: 'Relying solely on vendor-provided rules. Real security engineers write custom Sigma rules, KQL queries, and SPL searches that match their specific environment — vendor defaults miss too much.',
    fix: 'Learn Sigma rule syntax. Convert 3 real MITRE ATT&CK techniques into custom SIEM detection rules for your home lab.',
  },
  {
    num: '04', title: 'Poor Documentation Habits',
    desc: 'Closing incidents without thorough documentation. In security, evidence chains, timelines, and decision logs are legally significant and operationally essential for post-incident review.',
    fix: 'Treat every lab exercise like a real incident. Write proper timelines, IOC lists, and executive summaries even for practice scenarios.',
  },
  {
    num: '05', title: 'Neglecting Cloud Security Fundamentals',
    desc: 'Focusing only on on-premise security while the enterprise attack surface has moved to AWS, Azure, and GCP. Attackers follow the assets — most modern breaches involve cloud-native attack paths.',
    fix: 'Get AWS Cloud Practitioner or AZ-900 certified. Lab with AWS CloudTrail and Azure Sentinel to understand cloud log sources.',
  },
  {
    num: '06', title: 'Burnout from Unsustainable Shift Patterns',
    desc: 'Accepting back-to-back night shifts without negotiating sustainable schedules. Alert fatigue and sleep deprivation create genuine security risk — tired analysts miss critical indicators.',
    fix: 'Advocate for healthy rotations. Senior engineers should mentor junior analysts on the career sustainability of well-managed on-call schedules.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'IT Support / SysAdmin',
    ease: 'Natural Fit', easeColor: '#0f766e', easeBg: '#f0fdfa',
    desc: 'You already understand networks, operating systems, user management, and how infrastructure breaks. Security is the adversarial version of what you already know. Add threat analysis skills on top.',
    steps: ['Learn MITRE ATT&CK and threat fundamentals', 'Build a Splunk home lab', 'Get CompTIA Security+ certified', 'Apply for Tier 1 SOC roles'],
  },
  {
    from: 'Network Engineer',
    ease: 'Very Easy', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Deep TCP/IP, firewall, and routing knowledge is gold in security. Network traffic analysis is a core detection discipline. You understand the terrain — now learn to defend it from adversaries.',
    steps: ['Study threat hunting via network forensics', 'Learn Wireshark and Zeek deeply', 'Get CompTIA CySA+ or GCIH', 'Target network detection engineering roles'],
  },
  {
    from: 'Software Developer',
    ease: 'Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Your coding skills are incredibly valuable — SOAR automation, detection-as-code, and security tooling development are in high demand. Developers who move into security bring rare capability.',
    steps: ['Learn Python scripting for security automation', 'Study OWASP and application attack vectors', 'Get familiar with SIEM query languages (KQL/SPL)', 'Target detection engineering or AppSec roles'],
  },
  {
    from: 'Risk / Compliance Analyst',
    ease: 'Very Manageable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'You understand frameworks, policy, and organisational risk. Adding technical security skills creates a hybrid profile that senior leadership roles — GRC, vCISO, and security strategy — explicitly need.',
    steps: ['Learn NIST, ISO 27001, and CIS Controls in depth', 'Build basic technical lab skills (SIEM, log analysis)', 'Get CISM or CISSP certified', 'Target GRC engineer or security management roles'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Foundations & Lab Setup', color: '#0f766e', bg: '#f0fdfa', days: [
    { day: 'Day 1–2', task: 'Install VirtualBox or VMware. Set up Ubuntu and Windows 10 VMs. Install Splunk Free edition — your home SIEM.' },
    { day: 'Day 3–4', task: 'Study MITRE ATT&CK framework. Map 10 real techniques to detection hypotheses. Understand Tactics vs Techniques vs Procedures.' },
    { day: 'Day 5–6', task: 'Complete TryHackMe SOC Level 1 Introduction module. Learn Windows Event Logs and Sysmon configuration.' },
    { day: 'Day 7', task: 'Configure Sysmon on your Windows VM. Ingest logs into Splunk. Write your first detection rule for a suspicious process creation.' },
  ]},
  { week: 'Week 2', theme: 'Threat Detection & Analysis', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Learn Splunk SPL query language basics. Run searches against your Windows event logs. Identify anomalies in authentication events.' },
    { day: 'Day 10–11', task: 'Simulate attack techniques using Atomic Red Team on your lab. Verify your Splunk detections fire correctly. Fix false negatives.' },
    { day: 'Day 12–13', task: 'Study network traffic analysis with Wireshark. Analyse a PCAP from a malware infection. Identify C2 communication patterns.' },
    { day: 'Day 14', task: 'Write 3 Sigma detection rules for real MITRE ATT&CK techniques. Share them on GitHub. Document your methodology.' },
  ]},
  { week: 'Week 3', theme: 'Incident Response & Forensics', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Study the NIST incident response lifecycle. Write an incident response playbook for a phishing attack from scratch.' },
    { day: 'Day 17–18', task: 'Complete a LetsDefend SOC alert investigation. Practice writing a formal incident report with timeline and IOC documentation.' },
    { day: 'Day 19–20', task: 'Learn basic memory forensics with Volatility. Analyse a memory image to identify injected malicious code and suspicious processes.' },
    { day: 'Day 21', task: 'Simulate a full incident: receive alert → investigate → contain → document. Time yourself. Aim for sub-30-minute triage and containment.' },
  ]},
  { week: 'Week 4', theme: 'Threat Intel & Career Prep', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Set up MISP or OpenCTI. Ingest a threat intelligence feed. Practice extracting and operationalising IOCs into your Splunk environment.' },
    { day: 'Day 25–26', task: 'Study CompTIA Security+ exam objectives. Identify and fill knowledge gaps. Schedule your exam within 60 days.' },
    { day: 'Day 27–28', task: 'Build your security portfolio: GitHub with lab write-ups, detection rules, and incident reports. Update LinkedIn with lab experience.' },
    { day: 'Day 29–30', task: 'Apply to 5 Tier 1 SOC roles. Reach out to 3 security professionals on LinkedIn. Join a local ISACA or (ISC)² chapter.' },
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
      try { await navigator.share({ title: 'Security Operations Engineer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Security Operations Engineer in 2026', url: window.location.href }) }
      catch (_) {}
    } else { handleCopy() }
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-10 p-4 rounded-2xl" style={{ background: '#f0fdfa', border: `1px solid ${C.border}` }}>
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/security-operations-engineer'}</span>
      </div>
    </div>
  )
}

/* ─── SECTION HEADER ─────────────────────────────────────────────────────── */
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

/* ─── FADE HOOK ──────────────────────────────────────────────────────────── */
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

/* ─── PAGE ────────────────────────────────────────────────────────────────── */
export default function SecurityOperationsEngineerRoadmapPage() {
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

      {/* Back button */}
      <Link to="/roadmaps" className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold no-underline transition-all duration-200"
        style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', border: `1px solid ${C.border}`, color: C.textMuted, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <ArrowLeft size={14} /> All Roadmaps
      </Link>

      {/* ── HERO ── */}
      <div className="relative w-full" style={{ background: C.bg }}>
        <div className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: 600 }}>
          <img
            src="https://i.imgur.com/82g34qW_d.webp?maxwidth=760&fidelity=grand"
            alt="Security Operations Engineer workspace"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Shield size={12} /> Cybersecurity & Defence
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Security Operations
              </h1>
              <span className="block font-normal mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', color: C.textMuted }}>
                Engineer Career Roadmap 2026
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><Clock size={14} style={{ color: C.textFaint }} /> 18 min read</div>
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><BookOpen size={14} style={{ color: C.textFaint }} /> 16 sections</div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-8 pt-6 pb-16">
          <p className="text-base leading-relaxed" style={{ color: '#4b5563', maxWidth: 560, marginLeft: 140 }}>
            Detect, investigate, and neutralise cyber threats before they cause damage. Security Operations Engineers are the defenders who protect organisations from nation-state actors, ransomware gangs, and sophisticated adversaries — 24 hours a day.
          </p>
          <div className="h-px mt-10" style={{ background: C.border }} />
        </div>
      </div>

      {/* ── TABLE OF CONTENTS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Security Operations Engineering" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Security Operations Engineer</strong> detects, investigates, and responds to cyber threats across an organisation's entire digital environment. They build detection logic, automate response workflows, hunt for hidden threats, and engineer the systems that keep businesses safe. They sit at the intersection of threat intelligence, automation, and incident response — operating as both analyst and engineer.
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
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={whyRef}>
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Security Operations could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Security Operations Engineer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
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
                <div className="rounded-2xl p-5 mb-4 border" style={{ background: '#f0fdfa', borderColor: C.border }}>
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
                <div className="rounded-2xl p-5 border" style={{ background: '#f0fdfa', borderColor: C.border }}>
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
      <section ref={tlSectionRef} className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={tlRef}>
            <SectionHeader icon={<Clock size={22} />} title="Career Timeline" subtitle="Time estimates and salary ranges for each level" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="mb-10">
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → Principal</span></div>
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
              const icons = ['🌐', '🛡️', '🔍', '🔬', '🎯', '⚡']
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #0891b2 100%)`, boxShadow: '0 8px 48px rgba(15,118,110,0.25)' }}>
              <div className="text-4xl mb-3">🛡️</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>SOC ANALYST IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>9–14 months · Consistent daily practice · Build and defend real environments</div>
            </div>
          </div>
          <ShareBar />
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={skillsRef}>
            <SectionHeader icon={<CheckCircle2 size={22} />} title="Skill Checkpoints" subtitle="Technical and interpersonal skills to develop" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl p-7 border" style={{ background: C.bg, borderColor: C.border }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.indigoLight }}><Terminal size={16} style={{ color: C.indigo }} /></div>
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
                        <div className="h-1.5 rounded-full" data-bar-w={s.level} style={{ width: 0, background: `linear-gradient(90deg, ${C.primary}, #0891b2)` }} />
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
                  <div key={s.name} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border transition-colors cursor-default" style={{ background: '#f0fdfa', borderColor: C.border }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.primaryLight}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#f0fdfa'}>
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
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Security Operations in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)', color: C.textMuted }}>
              AI is fundamentally reshaping Security Operations — not replacing analysts, but dramatically amplifying what great analysts can accomplish. Engineers who learn to work with AI-powered detection, automated response, and intelligence tools will operate at a level previously requiring entire teams.
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
                <div key={s} className="flex items-center gap-2.5 rounded-xl px-4 py-3.5 border" style={{ background: '#f0fdfa', borderColor: C.border }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-black text-xs" style={{ background: C.primaryLight, color: C.primary }}>{i + 1}</div>
                  <span className="text-xs font-medium" style={{ color: C.text }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROS & CONS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially MSSP, consulting, and senior detection engineering roles — can pay 2–4× these figures in USD or GBP.</p>
            </div>
            <div className="space-y-4">
              {SALARY_DATA.map(row => (
                <div key={row.role} className="rounded-2xl p-5 border" style={{ background: '#f0fdfa', borderColor: C.border }}>
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div>
                      <span className="text-sm font-bold" style={{ color: C.text }}>{row.role}</span>
                      <span className="ml-3 text-xs font-mono" style={{ color: C.textFaint }}>{row.yoe}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: row.color }}>{row.range}</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 2400) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> Security engineers at financial services, healthcare, and critical infrastructure organisations earn 30–50% more than general enterprise. MSSPs also pay premium rates for experienced Tier 2 and Tier 3 analysts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into Security Operations from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Security Operations" iconBg={C.redLight} iconColor={C.red} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {VIDEOS.map(v => (
                <div key={v.id} className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ background: '#f0fdfa', borderColor: C.border }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,118,110,0.3)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: '#0a0c1a' }}>
                    <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} className="w-full h-full object-cover" style={{ opacity: 0.75 }} />
                    <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center no-underline">
                      <div className="rounded-full flex items-center justify-center" style={{ width: 52, height: 52, background: 'rgba(15,118,110,0.9)' }}>
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
                      <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs no-underline" style={{ color: C.primary }}>Watch <ExternalLink size={11} /></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL THOUGHTS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={finalRef}>
            <SectionHeader icon={<Award size={22} />} title="Final Thoughts" subtitle="What we want you to take away from this guide" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 border mb-8" style={{ background: C.bg, borderColor: C.border }}>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#374151' }}>
                Security Operations is where <strong style={{ color: C.primary }}>technical mastery meets mission</strong>. Every alert you triage, every incident you contain, and every detection rule you write protects real people from real harm. The adversaries are sophisticated, relentless, and well-resourced — but so are the defenders who master this craft.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The path to your first SOC role isn't about memorising security textbooks — it's about building a home lab, running real attack simulations, writing genuine detection rules, and showing employers you can think like an adversary and act like a defender. Start building. Start hunting. Start today.
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
        <div className="relative overflow-hidden rounded-3xl px-12 py-16 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #0891b2 100%)` }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: 'rgba(255,255,255,0.05)', top: -120, right: -80 }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Rocket size={30} style={{ color: '#fff' }} />
          </div>
          <h2 className="font-extrabold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
            Ready to Start Your Journey?
          </h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to install Splunk, run your first threat simulation, and defend something real.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              Get Career Advice
            </a>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start defending today. The threat landscape won't wait.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}