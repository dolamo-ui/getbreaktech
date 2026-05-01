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
  Award, Target, Flame, Database,
  Layers, FileText, 
  Terminal,  Shield,
  Workflow,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

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

const CAREER_LEVELS = [
  {
    level: 'Junior', title: 'Junior Security Analyst', duration: '0–2 yrs', salary: 'R280k–R480k',
    description: 'Monitor SIEM dashboards, triage security alerts, assist with vulnerability scans, and document incidents under mentorship. Learn the fundamentals of network and endpoint security.',
    skills: ['SIEM Tools', 'Log Analysis', 'Networking', 'CompTIA Sec+'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Security Analyst', duration: '2–5 yrs', salary: 'R550k–R980k',
    description: 'Own incident response end-to-end, conduct vulnerability assessments, write security policies, perform threat hunting, and lead security awareness initiatives across the organisation.',
    skills: ['Incident Response', 'Threat Hunting', 'Vulnerability Mgmt', 'SOAR'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Security Analyst', duration: '5–8 yrs', salary: 'R1M–R1.65M',
    description: 'Architect security monitoring frameworks, lead blue team operations, define incident response playbooks, mentor junior analysts, and engage with executive leadership on risk posture.',
    skills: ['SOC Leadership', 'Threat Intelligence', 'Risk Management', 'DFIR'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'CISO / Security Director', duration: '8+ yrs', salary: 'R2M+',
    description: 'Define the organisational security strategy, manage regulatory compliance programmes, oversee all security operations, and represent security risk to boards and stakeholders.',
    skills: ['Security Strategy', 'GRC', 'Board Reporting', 'Team Leadership'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Networking & Operating System Fundamentals',
    description: 'Security starts with understanding what you are protecting. Master TCP/IP, DNS, HTTP/S, firewalls, VPNs, and the OSI model. Learn Linux and Windows administration — most attacks and defences live at the OS level. Platforms like TryHackMe and Professor Messer are excellent starting points.',
    duration: '2–3 months', skills: ['TCP/IP & DNS', 'Linux Admin', 'Windows Admin', 'Firewall Basics'],
  },
  {
    step: 2, title: 'Security Fundamentals & Core Certifications',
    description: 'Learn the foundational concepts: CIA triad, authentication, encryption, PKI, access control, and the types of threats organisations face. CompTIA Security+ is the industry-standard entry certification and is valued by virtually every employer hiring junior analysts.',
    duration: '2–3 months', skills: ['CIA Triad', 'Cryptography', 'Access Control', 'CompTIA Sec+'],
  },
  {
    step: 3, title: 'SIEM, Log Analysis & Threat Detection',
    description: 'Security analysts live in SIEM platforms. Learn Splunk, Microsoft Sentinel, or IBM QRadar. Understand how to write detection rules, correlate logs from multiple sources, reduce false positives, and triage real alerts from noise. Practice with free Splunk and Elastic labs.',
    duration: '2–3 months', skills: ['Splunk / Sentinel', 'Log Correlation', 'Detection Rules', 'Alert Triage'],
  },
  {
    step: 4, title: 'Incident Response & Digital Forensics',
    description: 'When a breach occurs, analysts must respond with speed and precision. Study the NIST incident response lifecycle: Preparation, Detection, Containment, Eradication, Recovery, and Lessons Learned. Learn memory and disk forensics with tools like Autopsy, Volatility, and FTK.',
    duration: '2–3 months', skills: ['IR Lifecycle', 'Memory Forensics', 'Disk Analysis', 'Chain of Custody'],
  },
  {
    step: 5, title: 'Vulnerability Management & Threat Intelligence',
    description: 'Learn to run vulnerability scans with Nessus and OpenVAS, interpret CVSS scores, and prioritise remediation based on business risk. Study threat intelligence frameworks like MITRE ATT&CK and how to consume threat feeds to proactively detect adversary TTPs.',
    duration: '2–3 months', skills: ['Nessus / OpenVAS', 'CVSS Scoring', 'MITRE ATT&CK', 'Threat Feeds'],
  },
  {
    step: 6, title: 'GRC, Cloud Security & Advanced Specialisation',
    description: 'Enterprise security requires governance. Study ISO 27001, NIST CSF, POPIA, and GDPR compliance frameworks. Add cloud security skills for AWS or Azure — most modern attacks target cloud misconfigurations. Consider advanced certifications: GCIH, GCFE, or CEH for specialisation.',
    duration: '3–4 months', skills: ['ISO 27001 / NIST', 'Cloud Security', 'Compliance', 'GCIH / GCFE'],
  },
]

const HARD_SKILLS = [
  { name: 'SIEM & Log Analysis', level: 95 },
  { name: 'Incident Response', level: 92 },
  { name: 'Network Security', level: 90 },
  { name: 'Vulnerability Management', level: 88 },
  { name: 'Threat Intelligence', level: 82 },
  { name: 'Digital Forensics', level: 75 },
  { name: 'Cloud Security (AWS/Azure)', level: 70 },
  { name: 'GRC & Compliance', level: 65 },
]

const SOFT_SKILLS = [
  { name: 'Analytical Thinking', description: 'Security analysts must find patterns in vast noise. The ability to sift through thousands of log lines and identify the one anomaly that signals a real attack is what separates excellent analysts from average ones.' },
  { name: 'Calm Under Pressure', description: 'Incidents are chaotic by nature. The ability to execute a structured response plan calmly while stakeholders panic and systems are down is a priceless and rare professional quality.' },
  { name: 'Written Communication', description: 'Every incident ends with a report. Your ability to explain a complex attack chain, its business impact, and remediation steps clearly to non-technical executives is as important as finding the breach.' },
  { name: 'Continuous Learning', description: 'The threat landscape evolves daily. Analysts who stop learning fall behind within 18 months. The best in the field treat staying current as a professional obligation — not a burden.' },
  { name: 'Attention to Detail', description: 'A single misconfigured firewall rule or an overlooked log entry can mean the difference between catching an intrusion early and discovering it six months later during a forensic investigation.' },
  { name: 'Ethical Judgement', description: 'Security analysts have privileged access to sensitive data and systems. The highest integrity and ethical judgement is non-negotiable — this is the role that sees everything and must be trusted completely.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Information Security / IT Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(15,118,110,0.2)', bgColor: '#f0fdfa', typeBg: 'rgba(15,118,110,0.12)', typeColor: '#0f766e',
    pros: ['Deep foundation in networks, OS, and cryptography', 'High credibility with government and financial sector employers', 'Access to graduate and internship programmes', 'Strong theoretical grounding for advanced certifications'],
    cons: ['Slow path to first security role', 'Curriculum often lags behind current threats', 'Light on hands-on lab and SOC experience', 'Vendor-specific tools largely self-taught'],
  },
  {
    type: 'Bootcamp', title: 'Cybersecurity Bootcamp', duration: '3–6 months', cost: 'R60k – R130k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Fast path to Security+ and SOC readiness', 'Hands-on labs with real SIEM and forensics tools', 'Career placement support included', 'Cohort accountability accelerates learning'],
    cons: ['Programme quality varies significantly', 'Credential not universally accepted', 'Rarely develops deep forensics or GRC knowledge', 'Competitive junior market on exit'],
  },
  {
    type: 'Self-Taught', title: 'Certifications & Labs', duration: '12–24 months', cost: 'R3k – R25k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['CompTIA Sec+, CySA+, and GCIH widely respected', 'TryHackMe and HackTheBox provide real lab experience', 'Completely self-paced', 'Certifications are the real currency in security hiring'],
    cons: ['Requires exceptional self-discipline', 'Easy to have dangerous skill gaps', 'No formal degree on CV', 'Imposter syndrome is very common in this field'],
  },
]

const SCHEDULE = [
  { time: '8:30', act: 'SOC Briefing & Shift Handover', desc: 'Review overnight alerts, open incidents from the previous shift, and receive briefing on new threat intelligence relevant to the organisation', duration: '30 min', icon: <Shield size={14} /> },
  { time: '9:00', act: 'Alert Triage & Investigation', desc: 'Work through the SIEM alert queue — classify, investigate, and escalate genuine incidents. Dismiss false positives with documented reasoning', duration: '2.5 hrs', icon: <Terminal size={14} /> },
  { time: '11:30', act: 'Threat Hunting', desc: 'Proactively search for indicators of compromise that automated detection may have missed, using threat intelligence feeds and MITRE ATT&CK', duration: '1 hr', icon: <Target size={14} /> },
  { time: '12:30', act: 'Lunch & Recovery', desc: 'Mental recovery is critical in security work — the stakes are high and sustained concentration is taxing. Step away from the screens.', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '1:30', act: 'Vulnerability Management', desc: 'Review scan results from Nessus or Qualys, update risk register, coordinate remediation with IT teams, and track patch compliance', duration: '1.5 hrs', icon: <Database size={14} /> },
  { time: '3:00', act: 'Documentation & Reporting', desc: 'Write up incident reports, update security runbooks and playbooks, prepare weekly metrics for management, and log all work in ticketing system', duration: '1.5 hrs', icon: <FileText size={14} /> },
  { time: '4:30', act: 'Learning & Intelligence Review', desc: 'Read threat intelligence bulletins (CISA, SANS ISC), review new CVEs, study for the next certification, or contribute to detection rule improvements', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Splunk / Sentinel', cat: 'SIEM' }, { name: 'Nessus / OpenVAS', cat: 'Vuln Scan' },
  { name: 'Wireshark', cat: 'Network' }, { name: 'Autopsy / FTK', cat: 'Forensics' },
  { name: 'Volatility', cat: 'Memory' }, { name: 'CrowdStrike', cat: 'EDR' },
  { name: 'TheHive', cat: 'IR Platform' }, { name: 'MISP', cat: 'Threat Intel' },
]

const WORK_ENVS = [
  { type: 'Hybrid', pct: 52 },
  { type: 'In-Office / SOC', pct: 35 },
  { type: 'Remote', pct: 13 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Powered Threat Detection', icon: <Sparkles size={20} />,
    desc: 'Machine learning models in modern SIEMs now detect anomalous behaviour patterns that rule-based detection misses entirely. Analysts who understand how to tune and interpret AI-driven alerts catch significantly more threats with fewer false positives.',
    tools: ['Microsoft Sentinel AI', 'Darktrace', 'CrowdStrike Falcon', 'Vectra AI'],
    borderColor: 'rgba(15,118,110,0.18)', bgColor: '#f0fdfa', icoBg: 'rgba(15,118,110,0.12)', icoColor: '#0f766e', tagBg: 'rgba(15,118,110,0.1)', tagColor: '#0f766e', titleColor: '#0f766e',
  },
  {
    title: 'Generative AI for Security Operations', icon: <Zap size={20} />,
    desc: 'AI copilots like Microsoft Security Copilot and Google Chronicle AI now assist analysts in summarising incidents, generating detection queries, explaining malware behaviour, and drafting incident reports — dramatically accelerating SOC productivity.',
    tools: ['Microsoft Security Copilot', 'Chronicle AI', 'IBM QRadar AI', 'Elastic AI'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI-Augmented Threat Intelligence', icon: <TrendingUp size={20} />,
    desc: 'AI systems now correlate threat intelligence from thousands of sources in real time, identifying relevant adversary campaigns targeting your industry before they reach your organisation. Analysts who can operate these platforms add extraordinary value.',
    tools: ['Recorded Future AI', 'ThreatConnect', 'OpenCTI', 'MISP with ML'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'AI/ML Security & Adversarial Attack Detection',
  'Cloud Security Posture Management (CSPM)',
  'SOAR Automation & Playbook Development',
  'Zero Trust Architecture Implementation',
  'OT/ICS & Critical Infrastructure Security',
  'Supply Chain Attack Detection & Response',
]

const PROS = [
  { title: 'Mission-Critical Organisational Role', desc: 'Information security analysts protect the data, systems, and reputation of their employers. Few roles carry this level of responsibility and strategic importance — it is a career that truly matters.' },
  { title: 'Exceptional Job Security', desc: 'Cybercrime costs are projected to reach $10.5 trillion annually by 2025. Every organisation needs analysts. Demand consistently outstrips supply by a significant margin globally.' },
  { title: 'Highly Competitive Salaries', desc: 'Senior security analysts earn R1M–R1.65M in South Africa. CISO-level roles at major organisations pay R2M–R4M+. International remote security roles pay USD rates that are transformational for South African professionals.' },
  { title: 'Intellectually Stimulating Work', desc: 'Every attack is different. Threat actors are creative, sophisticated, and adapt constantly. The investigative and analytical nature of security work attracts people who love puzzles and hate boredom.' },
  { title: 'Clear Certification Pathway', desc: 'Unlike many careers, security has a well-defined certification track: Sec+ → CySA+ → GCIH → CISSP. Each certification is a measurable, respected milestone that directly increases your market value.' },
  { title: 'Diverse Specialisation Options', desc: 'From digital forensics to threat intelligence, cloud security to GRC, penetration testing to SOC operations — security offers specialisations to match nearly every professional personality and interest.' },
]

const CONS = [
  { title: 'High Stress & Burnout Risk', desc: 'Operating in a constant state of alertness, managing real breaches with serious consequences, and the weight of protecting sensitive data creates significant psychological pressure. Burnout rates in SOC roles are among the highest in tech.' },
  { title: 'On-Call & Shift Requirements', desc: 'Attacks happen at 3am on Christmas Eve. Many security roles involve after-hours on-call rotations, 24/7 SOC shift work, and the expectation of immediate response to critical incidents regardless of the hour.' },
  { title: 'The Adversary Always Has the Initiative', desc: 'Attackers only need to succeed once. Defenders must be right every time. This asymmetry is psychologically demanding — the best security teams still get breached, and the responsibility is real.' },
  { title: 'Certification Costs & Continuous Learning', desc: 'Top security certifications cost R20k–R80k each. The threat landscape evolves so rapidly that continuous investment in learning and recertification is not optional — it is required to remain effective.' },
  { title: 'False Positive Fatigue', desc: 'Analysts in busy SOCs triage hundreds of alerts daily, the vast majority of which are false positives. The monotony of alert fatigue can dull vigilance — making it harder to catch the real threats hiding in the noise.' },
  { title: 'Ethical and Legal Complexity', desc: 'Security analysts operate in legally sensitive territory. The boundaries between authorised testing, incident response, and activities that cross legal lines require careful judgment and robust organisational policies.' },
]

const VIDEOS = [
  { id: 'inWWhr5tnEA', title: 'SOC Analyst Full Career Guide 2025', desc: 'A comprehensive walkthrough of the Security Operations Centre analyst role — tools, responsibilities, certifications, and daily work in a real SOC environment.', dur: '18:45', channel: 'Josh Madakor' },
  { id: 'a83ASGn_V_s', title: 'TryHackMe SOC Level 1 Path Review', desc: 'Hands-on walkthrough of the TryHackMe SOC Analyst path — the most popular free training route for breaking into information security analysis.', dur: '12:30', channel: 'NetworkChuck' },
  { id: 'lpa8uy4DyMo', title: 'CompTIA Security+ Full Study Course', desc: 'Complete preparation course for the CompTIA Security+ certification — the industry-standard entry credential for information security analysts.', dur: '25:33:00', channel: 'Professor Messer' },
]

const TAKEAWAYS = [
  'Build a home lab immediately — a Raspberry Pi running Security Onion teaches more than any textbook on log analysis',
  'TryHackMe and HackTheBox are not optional extras; they are the practical training ground every analyst must use before applying for roles',
  'The MITRE ATT&CK framework is the lingua franca of modern security — learn it deeply and think in its terms',
  'Every certification is a milestone, not a destination — keep your skills current because the threat landscape waits for no one',
  'Document everything: your incident responses, your lab work, your threat hunting hypotheses — your portfolio is your professional credibility',
]

const CAREER_FACTS = [
  {
    icon: <Shield size={20} />, title: 'What You Protect',
    desc: 'Confidential data, financial systems, employee identities, operational infrastructure, intellectual property, and customer trust — everything an organisation values most lives behind the security controls you build and monitor.',
    color: '#0f766e',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'SIEM monitoring, alert triage, incident response, threat hunting, vulnerability scanning, forensic investigation, security policy writing, awareness training, and compliance audit support.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'IT teams for remediation, DevOps for security tooling, legal and compliance for regulatory requirements, HR for policy enforcement, and executive leadership for risk reporting and security investment decisions.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'The global cybersecurity workforce gap exceeds 3.5 million unfilled positions. South African demand is growing rapidly, driven by POPIA compliance requirements and escalating ransomware targeting of local enterprises.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🛡️', title: 'You Protect What Matters Most', desc: 'Security analysts defend organisations from real criminal attacks targeting real people\'s data. Few careers provide the combination of intellectual challenge and genuine societal impact that this role delivers.' },
  { emoji: '💰', title: 'Top-Tier Compensation', desc: 'Senior analysts earn R1M–R1.65M in South Africa. CISO roles pay R2M–R4M+. USD-denominated international remote security roles are achievable by mid-career and completely transformational financially.' },
  { emoji: '🌍', title: 'Global Demand & Portability', desc: 'Security skills are valued identically in Johannesburg, London, Singapore, and Toronto. The 3.5 million global workforce gap means skilled analysts can work remotely for international employers from South Africa.' },
  { emoji: '🧩', title: 'Endlessly Interesting Problems', desc: 'Every breach investigation is a unique puzzle. Threat actors are sophisticated, creative, and constantly evolving. This is one of the rare careers where the work itself never becomes routine.' },
  { emoji: '📈', title: 'Multiple Advancement Paths', desc: 'Analyst → Senior Analyst → Threat Intelligence → SOC Manager → CISO, or pivot to penetration testing, GRC, cloud security, or digital forensics. The career tree branches in every direction.' },
  { emoji: '🔒', title: 'Exceptional Job Security', desc: 'Cybercrime is not going away. Every digitised organisation needs protection. Security is arguably the most recession-resistant specialisation in all of technology — organisations cut budgets everywhere else first.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#0f766e', bgColor: '#f0fdfa', items: [
    { name: 'TryHackMe SOC Level 1 Path (free tier)', url: '#', type: 'Platform', rating: 5 },
    { name: 'CS50 Cybersecurity — Harvard (free)', url: '#', type: 'Course', rating: 5 },
    { name: 'SANS Cyber Aces Online (free)', url: '#', type: 'Course', rating: 5 },
    { name: 'Blue Team Labs Online (free tier)', url: '#', type: 'Platform', rating: 4 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'HackTheBox Defender & Fortress labs', url: '#', type: 'Practice', rating: 5 },
    { name: 'Splunk Free Training (Splunk Fundamentals 1)', url: '#', type: 'Course', rating: 5 },
    { name: 'LetsDefend.io (SOC simulation platform)', url: '#', type: 'Practice', rating: 5 },
    { name: 'MITRE ATT&CK Navigator (free framework)', url: '#', type: 'Reference', rating: 5 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'Gerald Auger — Simply Cyber YouTube', url: '#', type: 'YouTube', rating: 5 },
    { name: 'r/cybersecurity & r/netsec community', url: '#', type: 'Forum', rating: 5 },
    { name: 'Darknet Diaries Podcast (real incidents)', url: '#', type: 'Podcast', rating: 5 },
    { name: 'SANS Internet Storm Center Blog', url: '#', type: 'Blog', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Security Analyst', range: 'R280k – R480k', midpoint: 380, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Security Analyst', range: 'R550k – R980k', midpoint: 760, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Security Analyst', range: 'R1M – R1.65M', midpoint: 1325, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'CISO / Security Director', range: 'R2M – R4M+', midpoint: 2800, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Chasing Certs Without Building Lab Skills',
    desc: 'Candidates who memorise CompTIA Security+ without ever running Wireshark, configuring a SIEM, or investigating a real alert are unprepared for actual analyst work. Employers test practical skills in interviews.',
    fix: 'Build a home lab on day one. Use TryHackMe and Security Onion alongside every certification you study for.',
  },
  {
    num: '02', title: 'Ignoring Networking Fundamentals',
    desc: 'Most attacks travel over networks. Analysts who cannot read a packet capture, understand TCP handshakes, or identify anomalous DNS behaviour are blind to 60% of attack techniques they will face.',
    fix: 'Complete the entire Cisco CCNA networking content or the Professor Messer Network+ course before anything else.',
  },
  {
    num: '03', title: 'Skipping Documentation Habits',
    desc: 'Incident response without rigorous documentation creates legal risk, prevents post-incident learning, and makes the next analyst\'s job harder. Poor documentation is a professional liability in security.',
    fix: 'Document every lab exercise, every investigation, and every alert triage as if it will be read in court. Because one day, it might be.',
  },
  {
    num: '04', title: 'Not Learning the Adversary\'s Perspective',
    desc: 'Analysts who understand only defensive tools are limited. The best analysts think like attackers — understanding how phishing, privilege escalation, and lateral movement actually work in practice.',
    fix: 'Spend at least 20% of your lab time on offensive techniques in HackTheBox or TryHackMe attack paths. Know what you\'re defending against.',
  },
  {
    num: '05', title: 'Alert Fatigue Without Tuning',
    desc: 'New analysts often accept a high false positive rate as normal. High-volume noisy alerts desensitise analysts and increase the risk of missing real threats buried in the noise.',
    fix: 'Learn detection rule tuning from your first SIEM lab. Measure your false positive rate and work to reduce it systematically.',
  },
  {
    num: '06', title: 'Neglecting Soft Skills and Communication',
    desc: 'Technical excellence without communication skills limits career progression. Security analysts who cannot write a clear incident report or present risk findings to management stay junior indefinitely.',
    fix: 'Write a post-mortem for every lab exercise you complete. Practice explaining technical findings in plain English to non-technical friends.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'IT Support / Help Desk',
    ease: 'Natural Fit', easeColor: '#0f766e', easeBg: '#f0fdfa',
    desc: 'You already understand user endpoints, ticketing systems, and organisational IT environments. Add SIEM training, incident response knowledge, and the Security+ certification to move directly into a junior analyst role.',
    steps: ['Complete CompTIA Security+ study and exam', 'Build a SIEM lab with Security Onion or Splunk Free', 'Complete TryHackMe SOC Level 1 path', 'Apply to junior SOC analyst roles in your current organisation first'],
  },
  {
    from: 'Network / Systems Administrator',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Your networking and systems knowledge is the foundation of security. Add security monitoring, threat detection, and incident response skills — and you can transition into senior analyst roles faster than most.',
    steps: ['Learn SIEM fundamentals and write your first detection rules', 'Study MITRE ATT&CK and apply it to your existing network knowledge', 'Earn CompTIA CySA+ or eJPT for security validation', 'Target network security or infrastructure security analyst roles'],
  },
  {
    from: 'Software Developer',
    ease: 'Very Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Your coding skills are a significant advantage in security automation, SOAR playbook development, and understanding how vulnerabilities are introduced in code. AppSec and SIEM automation roles are natural targets.',
    steps: ['Learn OWASP Top 10 and how to apply them as a defender', 'Build SOAR automations using Python for alert triage', 'Study SAST/DAST tools and integrate security into CI/CD', 'Target AppSec analyst or security engineering roles'],
  },
  {
    from: 'Other Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Domain expertise from finance, healthcare, or law can be a powerful differentiator. Security analysts with industry knowledge become indispensable in regulated sectors that struggle to find technical staff who understand the business.',
    steps: ['Start with TryHackMe Pre-Security and Security Fundamentals paths', 'Earn CompTIA Security+ as your first certification', 'Build a home lab and document everything on GitHub or a blog', 'Target security roles in your previous industry vertical'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Foundations & Environment', color: '#0f766e', bg: '#f0fdfa', days: [
    { day: 'Day 1–2', task: 'Create a TryHackMe account and complete the Pre-Security path. Set up a Kali Linux VM. Install Wireshark and capture your first network traffic.' },
    { day: 'Day 3–4', task: 'Study the OSI model, TCP/IP stack, DNS, HTTP/S, and common ports in depth. Practise packet analysis in Wireshark — identify GET requests, DNS lookups, and TCP handshakes.' },
    { day: 'Day 5–6', task: 'Study the CIA Triad, authentication methods, cryptography basics, and access control models. Begin the CompTIA Security+ study materials.' },
    { day: 'Day 7', task: 'Complete TryHackMe SOC Level 1 — Introduction to SIEM module. Document your notes on a GitHub repo or personal blog.' },
  ]},
  { week: 'Week 2', theme: 'SIEM & Log Analysis', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Install Splunk Free on a local VM. Ingest sample Windows event logs and web server logs. Write your first 3 SPL search queries.' },
    { day: 'Day 10–11', task: 'Complete the TryHackMe Splunk room. Practise log correlation. Identify at least 5 distinct attack patterns from sample log data.' },
    { day: 'Day 12–13', task: 'Study the MITRE ATT&CK framework. Map 10 techniques to logs you would see in a real SIEM. Document your analysis process.' },
    { day: 'Day 14', task: 'Complete a LetsDefend.io challenge. Triage 10 simulated alerts. Write a triage report for each one as if submitting to a manager.' },
  ]},
  { week: 'Week 3', theme: 'Incident Response & Forensics', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Study the NIST Incident Response lifecycle. Build an IR playbook template for a phishing incident in a Google Doc or Notion.' },
    { day: 'Day 17–18', task: 'Install Autopsy and analyse a forensic disk image from a DFIR practice challenge (CyberDefenders.org provides free ones).' },
    { day: 'Day 19–20', task: 'Install Volatility 3. Analyse a memory dump for malicious processes, network connections, and injected shellcode. Document your findings.' },
    { day: 'Day 21', task: 'Complete TryHackMe\'s Advent of Cyber forensics section or a CyberDefenders blue team challenge. Write a full incident report from findings.' },
  ]},
  { week: 'Week 4', theme: 'Apply & Launch Career', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Register for CompTIA Security+ exam. Set a date 60 days out. Create a study schedule. Begin Professor Messer\'s free video course.' },
    { day: 'Day 25–26', task: 'Polish GitHub: add a README to your security lab repo. Write a 500-word blog post about a technique you learned this month.' },
    { day: 'Day 27–28', task: 'Build a simple home SOC using Elastic SIEM (free). Ingest pfSense firewall logs. Write 3 detection rules. Document with screenshots.' },
    { day: 'Day 29–30', task: 'Update LinkedIn with your TryHackMe profile, GitHub lab, and Sec+ exam date. Apply to 5 junior analyst roles. Send 3 LinkedIn messages to working analysts asking for a 15-minute call.' },
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

function ShareBar() {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }
  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'Information Security Analyst Career Roadmap 2026', text: 'Complete step-by-step roadmap to become an Information Security Analyst in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/information-security-analyst'}</span>
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

export default function InformationSecurityAnalystRoadmapPage() {
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
            src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1600&q=80"
            alt="Information Security Analyst cybersecurity operations"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Shield size={12} /> Security & Defence
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Information Security Analyst
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
            Defend the digital perimeter. Information security analysts monitor, detect, and respond to threats that target organisations every second of every day — invisible guardians of the data and systems that modern business runs on.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Information Security Analysis" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                An <strong style={{ color: C.primary }}>Information Security Analyst</strong> is the frontline defender of an organisation's digital assets. Working within Security Operations Centres (SOCs) or as standalone security professionals, analysts monitor systems for threats, investigate incidents, manage vulnerabilities, and ensure compliance with security policies and regulations. They are the people who stand between adversaries and the data that organisations — and the customers they serve — depend upon.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Information Security could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Information Security Analyst workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → CISO</span></div>
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
              const icons = ['🌐', '🔐', '📊', '🔍', '🎯', '📋']
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
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>10–14 months · Consistent daily practice · Build real security labs and get certified</div>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Information Security in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)', color: C.textMuted }}>
              AI tools don't replace security analysts — they <em style={{ color: C.primary }}>amplify</em> them. Analysts who use AI-driven SIEM tools, threat intelligence platforms, and copilots for report writing detect more threats, respond faster, and spend more time on strategic security work.
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. USD-denominated international remote security roles — especially senior analyst and DFIR positions — can pay 2–4× these figures.</p>
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
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 4200) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> Security analysts at financial institutions, healthcare companies, and critical infrastructure operators earn a 20–40% premium over equivalent roles at general companies. Regulated sectors pay more because the cost of a breach is catastrophically high.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring security analysts" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into information security from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Information Security" iconBg={C.redLight} iconColor={C.red} />
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
                Information security analysis is the career that <strong style={{ color: C.primary }}>keeps everything else safe</strong>. In a world where every organisation is a potential target and the cost of a breach is measured in millions — the professionals who can detect, respond to, and prevent attacks are among the most valued in technology.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The certifications are achievable, the labs are free, and the demand has never been higher. What separates those who make it is not raw intelligence — it is consistent practice, rigorous documentation, and an unrelenting curiosity about how adversaries think.
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open TryHackMe and start your first security lab.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
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