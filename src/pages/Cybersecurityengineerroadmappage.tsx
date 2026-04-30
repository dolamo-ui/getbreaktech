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
  GitBranch, Terminal, Shield,
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
  primary: '#0f766e',          // deep teal — cybersecurity brand colour
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
  indigo: '#1d4ed8',
  indigoLight: 'rgba(29,78,216,0.08)',
  cyan: '#0891b2',
  cyanLight: 'rgba(8,145,178,0.08)',
}

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const CAREER_LEVELS = [
  {
    level: 'Junior', title: 'Junior Security Analyst', duration: '0–2 yrs', salary: 'R280k–R500k',
    description: 'Monitor security alerts, triage incidents, run vulnerability scans, and support senior engineers in penetration tests and remediation efforts.',
    skills: ['Linux CLI', 'Wireshark', 'Nmap', 'SIEM Basics'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Security Engineer', duration: '2–5 yrs', salary: 'R580k–R1.0M',
    description: 'Conduct penetration tests, design secure architectures, build detection rules, implement SIEM pipelines, and lead incident response operations.',
    skills: ['Penetration Testing', 'SIEM/SOAR', 'Cloud Security', 'Scripting'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Security Engineer', duration: '5–8 yrs', salary: 'R1.0M–R1.8M',
    description: 'Architect enterprise security postures, define red-team and blue-team strategies, lead threat modelling workshops, and guide security across engineering organisations.',
    skills: ['Threat Modelling', 'Red Teaming', 'Zero Trust', 'Mentoring'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'Principal / CISO Track', duration: '8+ yrs', salary: 'R2M+',
    description: 'Set the organisation-wide security vision, drive compliance frameworks (ISO 27001, SOC 2), manage risk at the board level, and define the culture of security-first engineering.',
    skills: ['GRC & Compliance', 'Security Strategy', 'Executive Comms', 'Leadership'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Networking & Operating System Fundamentals',
    description: 'Security is built on a deep understanding of how systems communicate and operate. Master TCP/IP, DNS, HTTP/S, firewalls, and routing. Learn Linux internals — file permissions, processes, users, and the shell — because nearly every security tool runs on Linux. Windows Active Directory is equally critical for enterprise security work.',
    duration: '2–3 months', skills: ['TCP/IP & DNS', 'Linux CLI', 'Windows AD', 'Firewalls & VPNs'],
  },
  {
    step: 2, title: 'Security Fundamentals & Cryptography',
    description: 'Understand the CIA triad (Confidentiality, Integrity, Availability), common attack categories, and the principles of least privilege and defence-in-depth. Learn how symmetric and asymmetric encryption, TLS, hashing, and PKI work — not just what they are, but why they exist and where they break down.',
    duration: '2–3 months', skills: ['CIA Triad', 'Encryption & TLS', 'PKI & Certificates', 'OWASP Top 10'],
  },
  {
    step: 3, title: 'Ethical Hacking & Penetration Testing',
    description: 'You cannot defend what you do not know how to attack. Learn the penetration testing methodology: reconnaissance, scanning, exploitation, post-exploitation, and reporting. Use industry-standard tools — Nmap, Metasploit, Burp Suite, and Kali Linux — on legal practice environments like TryHackMe and HackTheBox.',
    duration: '3–4 months', skills: ['Kali Linux', 'Burp Suite', 'Metasploit', 'HackTheBox'],
  },
  {
    step: 4, title: 'Blue Team — Defence, SIEM & Incident Response',
    description: 'Master the defensive side: set up SIEM platforms (Splunk, Elastic SIEM), write detection rules, analyse logs, and practice incident response playbooks. Learn digital forensics basics — how to preserve evidence, analyse memory dumps, and trace attacker activity through system artifacts.',
    duration: '2–3 months', skills: ['Splunk / Elastic', 'Log Analysis', 'IR Playbooks', 'Digital Forensics'],
  },
  {
    step: 5, title: 'Cloud Security & DevSecOps',
    description: 'The majority of infrastructure has moved to cloud platforms. Learn AWS and Azure security services (IAM, Security Groups, GuardDuty, Defender), container security (Docker and Kubernetes hardening), and how to embed security into CI/CD pipelines through static analysis, secret scanning, and policy-as-code tools.',
    duration: '2–3 months', skills: ['AWS/Azure Security', 'IAM & Policies', 'Container Security', 'DevSecOps'],
  },
  {
    step: 6, title: 'Certifications, Specialisation & Advanced Threats',
    description: 'Certifications unlock doors in this field. Target CompTIA Security+ for the foundation, then CEH or OSCP for offensive skills, and CISSP or CCSP for senior and cloud roles. Choose a specialisation — red team, cloud security, application security, or GRC — and go deep. Study advanced persistent threats (APTs), malware analysis, and threat intelligence.',
    duration: '3–6 months', skills: ['CompTIA Sec+', 'OSCP / CEH', 'Malware Analysis', 'Threat Intelligence'],
  },
]

const HARD_SKILLS = [
  { name: 'Network Security & Protocols', level: 95 },
  { name: 'Penetration Testing', level: 90 },
  { name: 'SIEM & Log Analysis', level: 88 },
  { name: 'Cloud Security (AWS/Azure)', level: 83 },
  { name: 'Scripting (Python/Bash)', level: 80 },
  { name: 'Digital Forensics & IR', level: 75 },
  { name: 'Malware Analysis / Reverse Engineering', level: 65 },
  { name: 'Threat Intelligence & APT Research', level: 60 },
]

const SOFT_SKILLS = [
  { name: 'Adversarial Thinking', description: 'The best defenders think like attackers. Every cybersecurity engineer must instinctively ask "how would someone abuse this?" before a system goes live — not after a breach.' },
  { name: 'Calm Under Incident Pressure', description: 'A live breach at 2am with business systems down is the ultimate test. The ability to think methodically, communicate clearly, and contain threats without panic separates great security engineers from good ones.' },
  { name: 'Precise Technical Writing', description: 'A penetration test is only as valuable as its report. Findings must be reproducible, prioritised by risk, and written so that both engineers and executives understand the impact and remediation path.' },
  { name: 'Continuous Learning Mindset', description: 'The threat landscape evolves daily. Zero-days, new attack techniques, and emerging cloud misconfigurations demand that cybersecurity engineers treat ongoing education as a professional obligation, not an optional extra.' },
  { name: 'Cross-Functional Influence', description: 'Security only works when the whole organisation participates. Cybersecurity engineers must influence product teams, developers, and leadership without being the team that blocks progress — they enable safe velocity.' },
  { name: 'Ethical Judgement & Discretion', description: 'Security professionals have access to some of the most sensitive systems and data in any organisation. Integrity, discretion, and strict ethical boundaries are non-negotiable — and are increasingly regulated by law.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Computer Science / Information Security Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(15,118,110,0.2)', bgColor: '#f0fdfa', typeBg: 'rgba(15,118,110,0.12)', typeColor: '#0f766e',
    pros: ['Deep networking, OS, and cryptography foundations', 'High credibility at government and large enterprises', 'Access to internship pipelines and graduate programmes', 'Strong peer network of future security professionals'],
    cons: ['Slow and expensive path to first role', 'Certifications often matter more in this field', 'Practical hacking skills are largely self-taught', 'Threat landscape changes faster than syllabi'],
  },
  {
    type: 'Bootcamp', title: 'Cybersecurity Bootcamp', duration: '3–6 months', cost: 'R60k – R130k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Hands-on lab environments from day one', 'Career support and SOC analyst job pipelines', 'Structured path through certifications', 'CompTIA Security+ prep often included'],
    cons: ['Highly variable programme quality', 'Certifications still need independent study', 'May not cover advanced red-team techniques', 'Competitive entry into analyst market'],
  },
  {
    type: 'Self-Taught', title: 'TryHackMe, HackTheBox & Certs', duration: '12–24 months', cost: 'R0 – R15k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['World-class free platforms (TryHackMe, HackTheBox)', 'Certifications are the true credential in this field', 'Learn by doing — real attack and defence labs', 'OSCP is more respected than most degrees'],
    cons: ['Requires exceptional self-discipline', 'Easy to have dangerous knowledge gaps', 'No formal credential beyond certifications', 'Imposter syndrome is intense in security'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Threat Intelligence Briefing', desc: 'Review overnight threat feeds, CVE disclosures, and SIEM alerts from the prior night\'s automated monitoring to identify anything requiring immediate action', duration: '30 min', icon: <Shield size={14} /> },
  { time: '9:30', act: 'Active Penetration Testing / Red Team', desc: 'The core technical work — running structured assessments against client systems, developing exploits, chaining vulnerabilities, and documenting findings in real time', duration: '2.5 hrs', icon: <Terminal size={14} /> },
  { time: '12:00', act: 'Incident Investigation & Forensics', desc: 'Analyse suspicious alerts, trace lateral movement through SIEM logs, examine artifacts on compromised hosts, and determine the scope and dwell time of any intrusion', duration: '1 hr', icon: <GitBranch size={14} /> },
  { time: '1:00', act: 'Lunch & Recovery', desc: 'Disconnect. Security work is cognitively intense. The pattern-recognition that catches threats works better after genuine rest than after grinding through without a break', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Report Writing & Risk Communication', desc: 'Translate technical findings into clear, prioritised reports for engineering teams and executives — the deliverable that turns a pentest into actual security improvement', duration: '1 hr', icon: <FileText size={14} /> },
  { time: '3:00', act: 'Detection Engineering & Rule Tuning', desc: 'Write and refine SIEM detection rules, reduce false positives, update IR playbooks, and implement new controls based on the latest threat intelligence', duration: '1.5 hrs', icon: <Database size={14} /> },
  { time: '4:30', act: 'Research & Lab Practice', desc: 'Study new CVEs, practise techniques in home lab environments, read threat actor TTPs on MITRE ATT&CK, or contribute to open-source security tooling', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Kali Linux', cat: 'OS' }, { name: 'Burp Suite', cat: 'Web Testing' },
  { name: 'Metasploit', cat: 'Exploitation' }, { name: 'Nmap / Nessus', cat: 'Scanning' },
  { name: 'Splunk / Elastic', cat: 'SIEM' }, { name: 'Wireshark', cat: 'Network Analysis' },
  { name: 'Cobalt Strike', cat: 'Red Team' }, { name: 'Volatility', cat: 'Forensics' },
]

const WORK_ENVS = [
  { type: 'Hybrid', pct: 48 },
  { type: 'Remote', pct: 37 },
  { type: 'In-Office / Secure Facility', pct: 15 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Augmented Threat Detection', icon: <Sparkles size={20} />,
    desc: 'AI/ML models now power anomaly detection in SIEM platforms, automatically correlating events across millions of log lines to surface genuine threats with far fewer false positives than static rules alone. Security engineers who can tune and validate these models are in high demand.',
    tools: ['Darktrace', 'Microsoft Sentinel AI', 'CrowdStrike Falcon', 'Vectra AI'],
    borderColor: 'rgba(15,118,110,0.18)', bgColor: '#f0fdfa', icoBg: 'rgba(15,118,110,0.12)', icoColor: '#0f766e', tagBg: 'rgba(15,118,110,0.1)', tagColor: '#0f766e', titleColor: '#0f766e',
  },
  {
    title: 'LLM-Assisted Offensive Security', icon: <Zap size={20} />,
    desc: 'AI tools accelerate penetration testing by generating custom payloads, suggesting exploit chains, automating reconnaissance, and drafting professional pentest reports from raw findings — giving skilled red teamers significantly more throughput per engagement.',
    tools: ['GPT-4 for Reporting', 'Nuclei AI Templates', 'PentestGPT', 'Claude for Analysis'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI-Powered Vulnerability Management', icon: <TrendingUp size={20} />,
    desc: 'AI tools now triage and contextualise CVEs automatically, predict which vulnerabilities are most likely to be exploited in your specific environment, and recommend prioritised remediation — reducing mean time to remediate by up to 60% in enterprise environments.',
    tools: ['Tenable One AI', 'Qualys AI', 'Wiz', 'Orca Security'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'AI/ML Security & Adversarial ML', 'Quantum-Safe Cryptography',
  'eBPF for Runtime Security', 'Cloud-Native Security (CNAPP)',
  'MITRE ATT&CK Detection Engineering', 'Deception Technology & Honeypots',
]

const PROS = [
  { title: 'One of the Most In-Demand Careers on Earth', desc: 'There are over 3.5 million unfilled cybersecurity positions globally. Demand structurally outstrips supply, giving skilled security engineers extraordinary leverage in hiring.' },
  { title: 'Exceptional and Growing Salaries', desc: 'Senior security engineers in South Africa earn R1.0M–R2.5M+. Global remote contracts — particularly for penetration testers and cloud security architects — can pay significantly more in USD.' },
  { title: 'Purpose-Driven Work', desc: 'You protect real people — their financial data, health records, and personal information. The adversaries are real, the stakes are high, and the impact of doing your job well extends far beyond your employer.' },
  { title: 'Constant Intellectual Stimulation', desc: 'No two engagements are identical. Adversaries evolve, new vulnerabilities emerge, and attack techniques advance constantly. Cybersecurity is one of the few careers where learning is mandated by the job itself.' },
  { title: 'Multiple Specialisation Paths', desc: 'Red team, blue team, cloud security, application security, GRC and compliance, threat intelligence, digital forensics — the field is vast and offers deep niches for every type of thinker.' },
  { title: 'Certifications Trump Degrees', desc: 'Unlike many tech fields, cybersecurity places enormous weight on certifications. OSCP, CISSP, and CEH open more doors than many CS degrees — making this one of the most accessible high-paying tech careers.' },
]

const CONS = [
  { title: 'Constant Adversarial Pressure', desc: 'You are in an arms race with adversaries who are creative, motivated, and well-resourced. The moment you stop learning, the threat landscape has already moved past you.' },
  { title: 'On-Call and High-Stakes Incidents', desc: 'A ransomware attack doesn\'t wait for business hours. Senior security engineers carry real on-call responsibilities and may spend sleepless nights containing breaches with significant business impact.' },
  { title: 'Heavy Certification Requirements', desc: 'Maintaining certifications like CISSP, CEH, and OSCP requires ongoing continuing education credits, exam renewal fees, and significant preparation time — a real ongoing cost of staying relevant.' },
  { title: 'Ethical and Legal Complexity', desc: 'The tools and techniques of offensive security are inherently dual-use. Working in this field demands exceptional ethical discipline and awareness of legal boundaries — mistakes have serious consequences.' },
  { title: 'Alert Fatigue in Blue Team Roles', desc: 'SOC analysts at large organisations can process thousands of alerts per shift. The mental toll of high-volume, high-stakes monitoring is real and contributes to significant burnout in junior blue team roles.' },
  { title: 'Scope Creep and Undefined Boundaries', desc: 'Security responsibility has no natural boundary. From the application layer to physical access control, security teams are asked to own risk across the entire organisation, often without commensurate headcount.' },
]

const VIDEOS = [
  { id: 'inWWhr5tnEA', title: 'Cybersecurity Career Roadmap 2025', desc: 'A complete walkthrough of the certifications, roles, and skills you need to break into cybersecurity — from total beginner to employed security professional.', dur: '18:45', channel: 'NetworkChuck' },
  { id: '3Kq1MIfTWCE', title: 'Ethical Hacking Full Course for Beginners', desc: 'Learn penetration testing from scratch: reconnaissance, scanning, exploitation, and reporting — using real tools on legal lab environments.', dur: '15:00:00', channel: 'freeCodeCamp' },
  { id: 'U_P23SqJaDc', title: 'How to Get Your First Cybersecurity Job', desc: 'Practical, honest advice on breaking into the security industry: which certifications matter, how to build a home lab, and how to stand out in a competitive job market.', dur: '22:10', channel: 'John Hammond' },
]

const TAKEAWAYS = [
  'Build a home lab from day one — a virtual machine running Kali Linux and a vulnerable target machine teaches more than any course alone',
  'TryHackMe and HackTheBox are not optional extras — consistent platform practice is what separates hired candidates from rejected ones',
  'CompTIA Security+ is the minimum credential for most employer conversations; OSCP is the gold standard for offensive roles',
  'Document every lab exercise as if it were a professional report — your writeups are your portfolio and your proof of skill',
  'Study the MITRE ATT&CK framework until you can map real-world threat actors to their techniques from memory — it is the common language of the industry',
]

/* ─── NEW SECTIONS ────────────────────────────────────────────────────────── */

const CAREER_FACTS = [
  {
    icon: <Shield size={20} />, title: 'What You Protect',
    desc: 'Enterprise networks, cloud infrastructure, web applications, user data, financial systems, healthcare records, and critical national infrastructure. Every organisation that stores data needs cybersecurity professionals.',
    color: '#0f766e',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Penetration testing, vulnerability management, threat detection, incident response, security architecture review, compliance auditing, red team operations, detection rule engineering, and security awareness training.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Software engineers receiving your security reviews, DevOps teams integrating your security controls, legal and compliance teams interpreting regulations, executives receiving your risk reports, and law enforcement during major incident response.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'Cybersecurity is the single fastest-growing discipline in all of technology. With 3.5 million unfilled roles globally and ransomware attacks increasing 150% year-on-year, demand is structural and will not decline for decades.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🛡️', title: 'The Most In-Demand Tech Career', desc: 'Over 3.5 million cybersecurity positions sit unfilled globally. Every organisation — government, healthcare, finance, retail — needs security engineers, and supply will not catch demand for the foreseeable future.' },
  { emoji: '💰', title: 'Exceptional Compensation', desc: 'Senior security engineers earn R1.0M–R2.5M+ in South Africa. Offensive security specialists and cloud security architects contracting for global firms earn considerably more in USD.' },
  { emoji: '🎯', title: 'Real-World Impact and Purpose', desc: 'You protect real people\'s financial data, medical records, and personal lives from adversaries who actively try to cause harm. The ethical stakes make this one of the most meaningful careers in tech.' },
  { emoji: '🧠', title: 'Endlessly Stimulating Problems', desc: 'Adversaries are creative, adaptive, and persistent. No two breaches are identical. Cybersecurity guarantees that you will never stop learning — the job demands it of you every single day.' },
  { emoji: '🏆', title: 'Certifications Open Every Door', desc: 'OSCP, CISSP, and Security+ carry more weight in this field than most degrees. Cybersecurity is one of the few high-paying tech disciplines where demonstrated skill consistently trumps academic credential.' },
  { emoji: '🔐', title: 'Choose Your Path: Offence or Defence', desc: 'Red team, blue team, cloud security, application security, GRC, threat intelligence — the field offers deep specialisations for analytical defenders and creative offensive thinkers alike.' },
]

const FREE_RESOURCES = [
  { category: 'Platforms', color: '#0f766e', bgColor: '#f0fdfa', items: [
    { name: 'TryHackMe — Beginner-Friendly Cyber Labs', url: '#', type: 'Platform', rating: 5 },
    { name: 'HackTheBox — Intermediate to Advanced CTFs', url: '#', type: 'Platform', rating: 5 },
    { name: 'PicoCTF — Free Beginner CTF Challenges', url: '#', type: 'CTF', rating: 5 },
    { name: 'OWASP WebGoat — Web Vuln Practice App', url: '#', type: 'Lab', rating: 5 },
  ]},
  { category: 'Certifications', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'CompTIA Security+ (Essential Foundation)', url: '#', type: 'Cert', rating: 5 },
    { name: 'Google Cybersecurity Certificate (Coursera)', url: '#', type: 'Course', rating: 4 },
    { name: 'OSCP — Offensive Security (Gold Standard)', url: '#', type: 'Cert', rating: 5 },
    { name: 'TCM Security Free Courses (YouTube)', url: '#', type: 'Free', rating: 5 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'John Hammond — YouTube Channel', url: '#', type: 'YouTube', rating: 5 },
    { name: 'r/netsec & r/cybersecurity', url: '#', type: 'Forum', rating: 4 },
    { name: 'Darknet Diaries Podcast', url: '#', type: 'Podcast', rating: 5 },
    { name: 'MITRE ATT&CK Framework (Free)', url: '#', type: 'Reference', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Security Analyst', range: 'R280k – R500k', midpoint: 390, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Security Engineer', range: 'R580k – R1.0M', midpoint: 790, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Security Engineer', range: 'R1.0M – R1.8M', midpoint: 1400, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Principal Engineer / CISO Track', range: 'R2M – R4M+', midpoint: 2800, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Choosing a Side Too Early — Ignoring the Other',
    desc: 'Many beginners commit to either red team or blue team without understanding both. The best security engineers understand the full attack lifecycle — defenders who can think offensively catch far more.',
    fix: 'Spend your first year doing both: practise attack techniques on HackTheBox AND build detection rules in a home SIEM for those exact techniques.',
  },
  {
    num: '02', title: 'Collecting Certifications Without Practical Skills',
    desc: 'Paper certifications with no lab experience are transparent to experienced hiring managers. Multiple-choice knowledge is not the same as demonstrably being able to exploit a real system or contain a real incident.',
    fix: 'For every certification you study, build a hands-on project that proves the skill — a pentest report, a home SIEM setup, a CTF writeup.',
  },
  {
    num: '03', title: 'Skipping the Documentation Habit',
    desc: 'Security professionals who cannot write clear, structured reports do not advance. A pentest no one can act on has zero value. Documentation is a core security skill, not an administrative afterthought.',
    fix: 'Write a structured report for every lab exercise and CTF challenge you complete. Build the habit before it is required professionally.',
  },
  {
    num: '04', title: 'Ignoring Legal and Ethical Boundaries',
    desc: 'Testing systems you do not have explicit written authorisation to test is a criminal offence in most jurisdictions. The line between "ethical hacker" and "criminal" is purely one of authorisation.',
    fix: 'Only ever practise on your own systems, explicit lab environments (TryHackMe, HackTheBox), or systems you have written permission to test. Always.',
  },
  {
    num: '05', title: 'Not Building a Home Lab',
    desc: 'Security cannot be learned passively. Candidates who have built and operated their own virtualised lab environments — with attack machines, vulnerable targets, and SIEM logging — are immediately distinguishable in interviews.',
    fix: 'Set up VirtualBox or Proxmox with Kali Linux, a Windows Server target, and a vulnerable VM (VulnHub or DVWA). Document your setup on GitHub.',
  },
  {
    num: '06', title: 'Treating Security as a One-Time Achievement',
    desc: 'Security engineers who stop studying the threat landscape become liabilities within two years. CVEs, new attack techniques, and cloud misconfigurations evolve faster than any static knowledge base.',
    fix: 'Subscribe to CVE feeds, follow threat intelligence sources (Mandiant, CrowdStrike blog), and dedicate at least 30 minutes daily to security research.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'IT Support / Sysadmin',
    ease: 'Natural Fit', easeColor: '#0f766e', easeBg: '#f0fdfa',
    desc: 'You already understand networks, operating systems, and user management — the exact foundation cybersecurity is built on. Add security tooling, ethical hacking practice, and a Security+ certification to make the transition.',
    steps: ['Earn CompTIA Security+ (study 2–3 months)', 'Build a home lab with Kali and vulnerable targets', 'Complete 30 TryHackMe rooms on your target domain', 'Apply to SOC Analyst Level 1 or Junior Pentester roles'],
  },
  {
    from: 'Software Developer',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Your understanding of code, APIs, and system architecture gives you a massive edge in application security and secure code review. Add offensive web testing skills and you become extremely valuable in AppSec roles.',
    steps: ['Study OWASP Top 10 and web application attacks deeply', 'Learn Burp Suite and practise on DVWA/WebGoat', 'Complete the TryHackMe "Web Fundamentals" path', 'Target Application Security Engineer roles specifically'],
  },
  {
    from: 'Network Engineer',
    ease: 'Very Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Deep networking knowledge — routing, firewalls, packet analysis — is one of the most valuable foundations in cybersecurity. Extend your skills into network security monitoring, IDS/IPS, and threat detection.',
    steps: ['Add Wireshark deep analysis and network forensics', 'Study SIEM platforms — set up Elastic SIEM in a lab', 'Earn CompTIA CySA+ alongside your networking certs', 'Target Network Security Engineer or SOC roles'],
  },
  {
    from: 'Other Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Domain expertise in finance, healthcare, legal, or government combined with cybersecurity skills is genuinely rare. These sectors are heavily regulated and pay premium rates for security professionals who understand the business.',
    steps: ['Start with Google Cybersecurity Certificate on Coursera', 'Build practical skills on TryHackMe (complete 50 rooms)', 'Earn CompTIA Security+ as your first formal credential', 'Target GRC or compliance roles in your previous industry'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Foundations & Environment', color: '#0f766e', bg: '#f0fdfa', days: [
    { day: 'Day 1–2', task: 'Install VirtualBox. Set up Kali Linux VM. Navigate the terminal: files, permissions, networking commands, and package management.' },
    { day: 'Day 3–4', task: 'Network fundamentals: trace a packet through the OSI model. Use Wireshark to capture and analyse HTTP and DNS traffic on your local network.' },
    { day: 'Day 5–6', task: 'Create a TryHackMe account. Complete the "Pre-Security" learning path. Document your notes in a personal security journal.' },
    { day: 'Day 7', task: 'Set up a vulnerable target VM (DVWA or Metasploitable). Map your lab network with Nmap and interpret the output. Commit notes to GitHub.' },
  ]},
  { week: 'Week 2', theme: 'Offensive Fundamentals', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Complete TryHackMe "Introduction to Web Hacking". Understand SQL injection and XSS by exploiting DVWA at low security setting.' },
    { day: 'Day 10–11', task: 'Install Burp Suite Community. Intercept, inspect, and modify HTTP requests to DVWA. Explore the Repeater and Intruder modules.' },
    { day: 'Day 12–13', task: 'Learn Metasploit basics: search modules, use auxiliary scanners, run a simple exploit against Metasploitable in your lab.' },
    { day: 'Day 14', task: 'Complete your first HackTheBox Starting Point machine. Write a structured "writeup" in Markdown — treat it as a professional report.' },
  ]},
  { week: 'Week 3', theme: 'Defence & Detection', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Install the Elastic SIEM stack in your lab. Configure log forwarding from your Windows or Linux VM. Explore the Discover interface.' },
    { day: 'Day 17–18', task: 'Simulate an attack (Nmap scan, failed SSH logins) against your target VM. Find evidence of the attack in your SIEM logs. Write a detection rule.' },
    { day: 'Day 19–20', task: 'Study the MITRE ATT&CK framework. Map the techniques you\'ve practised to ATT&CK tactics. Understand how defenders use this model.' },
    { day: 'Day 21', task: 'Read a published incident response report (e.g., Mandiant or CrowdStrike). Identify the TTPs used and map them to ATT&CK. Document findings.' },
  ]},
  { week: 'Week 4', theme: 'Portfolio & Applications', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Complete a full TryHackMe room and write a professional-grade pentest report with findings, risk ratings, CVSS scores, and remediation steps.' },
    { day: 'Day 25–26', task: 'Create a GitHub repository documenting your home lab: architecture diagram, tools installed, and at least three security findings with analysis.' },
    { day: 'Day 27–28', task: 'Begin CompTIA Security+ study. Use Professor Messer\'s free materials. Create a 60-day exam prep schedule and commit to it.' },
    { day: 'Day 29–30', task: 'Share your lab writeup on LinkedIn. Apply to 5 junior SOC Analyst or junior pentester roles. Tailor your CV to highlight your practical lab work.' },
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
      try { await navigator.share({ title: 'Cybersecurity Engineer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Cybersecurity Engineer in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/cybersecurity-engineer'}</span>
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
export default function CybersecurityEngineerRoadmapPage() {
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
            src="https://i.imgur.com/7YGHJid.jpeg"
            alt="Cybersecurity engineer monitoring screens and code"
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
                Cybersecurity Engineer
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
            Defend the systems that power the world. Cybersecurity engineers protect organisations from adversaries who never stop evolving — making this the most intellectually demanding, purpose-driven, and in-demand career in all of technology.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Cybersecurity Engineering" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Cybersecurity Engineer</strong> protects organisations' digital infrastructure, data, and systems from malicious actors, accidental exposure, and systemic vulnerabilities. The role spans both offensive work — finding vulnerabilities before attackers do — and defensive work — detecting, containing, and recovering from breaches. As every organisation's attack surface expands into cloud, mobile, and AI, cybersecurity engineers sit at the intersection of the most urgent and most financially rewarding problems in technology.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Cybersecurity could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Cybersecurity Engineer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Analyst → Principal / CISO Track</span></div>
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
              const icons = ['🌐', '🔐', '⚔️', '🛡️', '☁️', '🏆']
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #0f5e56 100%)`, boxShadow: '0 8px 48px rgba(15,118,110,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>12–18 months · Consistent lab practice · Build and document real security projects</div>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Cybersecurity in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)', color: C.textMuted }}>
              AI tools don't replace cybersecurity engineers — they <em style={{ color: C.primary }}>amplify</em> them. Security professionals who leverage AI for threat detection, exploit research, and report generation operate at a fundamentally different level of speed and coverage than those who don't.
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially for senior penetration testers, cloud security architects, and threat intelligence leads — can pay 2–5× these figures in USD.</p>
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
                <strong style={{ color: C.primary }}>Pro tip:</strong> Cybersecurity engineers at fintech, cloud, and government contractors earn significantly more than those at general IT consultancies. OSCP-certified penetration testers and cloud security architects command the highest premiums — specialise early and certify deliberately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring cybersecurity engineers" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into cybersecurity from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
                Cybersecurity is the discipline that <strong style={{ color: C.primary }}>makes everything else trustworthy</strong>. Every company that processes a payment, stores a health record, or holds a user's personal data depends on security engineers to protect the trust that their business is built on.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The path demands continuous learning — but that is also what makes it one of the most rewarding careers in technology. Adversaries never stop evolving, which means you never stop growing. The skills you build in this field compound for decades and open doors across every industry on earth.
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
        <div className="relative overflow-hidden rounded-3xl px-12 py-16 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #064e47 100%)` }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: 'rgba(255,255,255,0.05)', top: -120, right: -80 }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Rocket size={30} style={{ color: '#fff' }} />
          </div>
          <h2 className="font-extrabold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
            Ready to Start Your Journey?
          </h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open your terminal and fire up Kali Linux.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              Get Career Advice
            </a>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start building today. Your future self will thank you.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}