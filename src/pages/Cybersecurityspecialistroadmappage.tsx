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
  Award, Target, Flame, Database,
  Layers, FileText, Globe, Server, Layout,
  GitBranch, Terminal, Package, Shield,
  Cloud, Workflow,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── COLORS ──────────────────────────────────────────────────────────────── */
const C = {
  bg: '#ffffff',
  bgAlt: '#f8fff9',
  bgCard: '#ffffff',
  border: 'rgba(0,0,0,0.07)',
  text: '#0f1a0f',
  textMuted: '#4a6350',
  textFaint: '#8aaa8f',
  primary: '#15803d',          // deep green — cybersec brand colour
  primaryLight: 'rgba(21,128,61,0.08)',
  primaryMid: 'rgba(21,128,61,0.15)',
  violet: '#7c3aed',
  violetLight: 'rgba(124,58,237,0.08)',
  green: '#15803d',
  greenLight: 'rgba(21,128,61,0.08)',
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
    description: 'Monitor SIEM alerts, triage security incidents, run vulnerability scans, and assist with patch management under senior guidance. Learn the threat landscape and common attack vectors.',
    skills: ['Networking Basics', 'SIEM Tools', 'Linux CLI', 'Security+'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Cybersecurity Engineer', duration: '2–5 yrs', salary: 'R550k–R980k',
    description: 'Lead incident response investigations, conduct penetration tests, design security controls, and implement defence-in-depth strategies across the organisation\'s attack surface.',
    skills: ['Pen Testing', 'Incident Response', 'Cloud Security', 'CISSP / CEH'],
    accent: '#15803d', accentBg: 'rgba(21,128,61,0.08)', accentBorder: 'rgba(21,128,61,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Security Engineer', duration: '5–8 yrs', salary: 'R980k–R1.75M',
    description: 'Architect enterprise security programmes, lead red/blue team operations, define security policies, build threat intelligence capabilities, and mentor junior analysts.',
    skills: ['Security Architecture', 'Red Teaming', 'Threat Intel', 'Leadership'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'CISO / Principal Eng', duration: '8+ yrs', salary: 'R2M+',
    description: 'Define the organisation\'s security vision, manage risk at the executive level, lead compliance programmes, and build a security culture across hundreds of engineers and departments.',
    skills: ['Risk Management', 'Compliance', 'Exec Leadership', 'GRC'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Networking & Operating System Fundamentals',
    description: 'Security is built on networks and operating systems. Master the OSI model, TCP/IP, DNS, HTTP/S, firewalls, and VPNs. Get comfortable with Linux command-line and Windows administration. These are the foundations every security concept builds upon.',
    duration: '2–3 months', skills: ['TCP/IP & OSI Model', 'Linux CLI', 'Windows Admin', 'Wireshark'],
  },
  {
    step: 2, title: 'Security Fundamentals & First Certification',
    description: 'Learn the CIA triad, threat modelling, cryptography basics, authentication mechanisms, and access control models. Earn CompTIA Security+ to validate your foundation — it\'s the most widely recognised entry-level certification and opens doors to analyst roles.',
    duration: '2–3 months', skills: ['CompTIA Security+', 'Cryptography', 'IAM Concepts', 'Risk Basics'],
  },
  {
    step: 3, title: 'Ethical Hacking & Penetration Testing',
    description: 'Learn to think like an attacker. Study the OWASP Top 10, web application vulnerabilities, SQL injection, XSS, and privilege escalation. Use Kali Linux, Burp Suite, Metasploit, and Nmap hands-on in lab environments like TryHackMe and Hack The Box.',
    duration: '3–4 months', skills: ['Kali Linux', 'Burp Suite', 'Metasploit', 'OWASP Top 10'],
  },
  {
    step: 4, title: 'Incident Response & Digital Forensics',
    description: 'Organisations will be breached. The ability to detect, contain, investigate, and recover is invaluable. Learn SIEM platforms (Splunk, Microsoft Sentinel), log analysis, memory forensics, malware analysis basics, and incident response playbooks.',
    duration: '2–3 months', skills: ['Splunk / Sentinel', 'Log Analysis', 'DFIR', 'Threat Hunting'],
  },
  {
    step: 5, title: 'Cloud Security & Modern Attack Surfaces',
    description: 'The perimeter has dissolved. Learn AWS and Azure security services, IAM misconfiguration attacks, container security, Kubernetes hardening, and serverless security. Cloud misconfigurations are now the #1 cause of enterprise data breaches.',
    duration: '2–3 months', skills: ['AWS Security', 'Azure Defender', 'Container Security', 'CSPM Tools'],
  },
  {
    step: 6, title: 'Advanced Specialisation & Professional Certification',
    description: 'Choose your specialisation: Red Team (OSCP, CEH), Blue Team (CISSP, GCIH), Cloud Security (CCSP, AWS Security Specialty), or GRC (CISM, ISO 27001). Advanced certs dramatically accelerate salary growth and open senior-level positions.',
    duration: '3–6 months', skills: ['OSCP / CISSP / CCSP', 'Red or Blue Team', 'GRC Frameworks', 'Threat Intelligence'],
  },
]

const HARD_SKILLS = [
  { name: 'Network Security & Protocols', level: 95 },
  { name: 'Penetration Testing & Ethical Hacking', level: 90 },
  { name: 'SIEM & Log Analysis', level: 88 },
  { name: 'Cloud Security (AWS/Azure/GCP)', level: 83 },
  { name: 'Incident Response & DFIR', level: 82 },
  { name: 'Malware Analysis & Reverse Engineering', level: 70 },
  { name: 'Security Architecture & Zero Trust', level: 68 },
  { name: 'GRC, Compliance & Risk Management', level: 62 },
]

const SOFT_SKILLS = [
  { name: 'Adversarial Thinking', description: 'The best defenders think like attackers. Developing the instinct to look for weaknesses in every system, process, and human behaviour is the core mental model of an elite security professional.' },
  { name: 'Calm Under Pressure', description: 'Incidents happen at 2am on a Friday. The ability to methodically investigate, communicate clearly, and make sound decisions while stakeholders panic is what separates great analysts from good ones.' },
  { name: 'Continuous Learning Mindset', description: 'The threat landscape changes weekly. Security professionals who stop learning become obsolete within two years. The best treat CVE databases, threat reports, and CTF challenges as daily reading.' },
  { name: 'Clear Written Communication', description: 'Security findings mean nothing if they can\'t be understood by executives. Writing clear, actionable vulnerability reports and incident post-mortems is one of the most underdeveloped skills in the field.' },
  { name: 'Ethical Integrity', description: 'Security professionals have privileged access to the most sensitive systems and data in any organisation. Absolute integrity — even when no one is watching — is the non-negotiable foundation of trust in this role.' },
  { name: 'Cross-Functional Collaboration', description: 'Security works with every team. The ability to partner with developers, IT, legal, and executives — influencing without authority — determines whether security becomes an enabler or a bottleneck.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Computer Science / Cybersecurity Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(21,128,61,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(21,128,61,0.12)', typeColor: '#15803d',
    pros: ['Deep networking, cryptography, and OS theory', 'High credibility at government and enterprise employers', 'Access to internship pipelines and graduate programmes', 'Strong peer network of future engineers'],
    cons: ['Slow and expensive path to first role', 'Often teaches outdated tooling and frameworks', 'Light on practical pen testing and cloud security', 'Hands-on lab skills largely self-taught'],
  },
  {
    type: 'Bootcamp', title: 'Cybersecurity Bootcamp', duration: '3–6 months', cost: 'R60k – R130k',
    borderColor: 'rgba(21,128,61,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(21,128,61,0.12)', typeColor: '#15803d',
    pros: ['Job-ready SOC and pen testing skills fast', 'Strong portfolio and lab projects on exit', 'Career support and employer networks', 'Structured, cohort-based accountability'],
    cons: ['Highly variable programme quality', 'Credential not universally respected', 'Rarely covers GRC or enterprise security depth', 'Competitive entry into junior analyst market'],
  },
  {
    type: 'Self-Taught', title: 'Certifications & CTF Labs', duration: '12–24 months', cost: 'R0 – R15k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['Industry-recognised certs (Security+, OSCP) beat many degrees', 'TryHackMe, Hack The Box offer real lab environments', 'Build a documented CTF and bug bounty portfolio', 'Learn at your own pace, go deep on your niche'],
    cons: ['Requires exceptional self-discipline', 'Easy to have dangerous knowledge gaps', 'No formal degree on CV for regulated industries', 'Imposter syndrome is common without peer support'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Threat Intelligence Briefing', desc: 'Review overnight SIEM alerts, new CVEs, and threat intelligence feeds. Triage and prioritise incidents for the day with the SOC team', duration: '30 min', icon: <Shield size={14} /> },
  { time: '9:30', act: 'Incident Investigation', desc: 'Deep-dive into active incidents — trace attack chains through logs, isolate compromised hosts, and coordinate containment with IT and DevOps teams', duration: '2.5 hrs', icon: <Terminal size={14} /> },
  { time: '12:00', act: 'Vulnerability Assessment', desc: 'Run automated scans, validate findings, prioritise by CVSS score and business impact, and work with teams on remediation timelines', duration: '1 hr', icon: <Target size={14} /> },
  { time: '1:00', act: 'Lunch & Recovery', desc: 'Security work is cognitively taxing. Disconnecting fully during lunch preserves the analytical sharpness needed for afternoon decision-making', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Security Reviews & Architecture', desc: 'Review new infrastructure changes, approve cloud configurations, consult on secure-by-design patterns with engineering teams, and update runbooks', duration: '1 hr', icon: <Cloud size={14} /> },
  { time: '3:00', act: 'Detection Engineering & Tuning', desc: 'Write and tune SIEM detection rules, reduce false positives, build new threat hunting queries, and test detection coverage against the MITRE ATT&CK framework', duration: '1.5 hrs', icon: <Code size={14} /> },
  { time: '4:30', act: 'Learning & Research', desc: 'Read threat reports (Mandiant, CrowdStrike, CISA advisories), practise CTF challenges, or work on certification study material', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Kali Linux', cat: 'Pen Testing' }, { name: 'Burp Suite', cat: 'Web Testing' },
  { name: 'Splunk / Sentinel', cat: 'SIEM' }, { name: 'Nmap / Nessus', cat: 'Scanning' },
  { name: 'Metasploit', cat: 'Exploitation' }, { name: 'Wireshark', cat: 'Packet Analysis' },
  { name: 'CrowdStrike / SentinelOne', cat: 'EDR' }, { name: 'Terraform + AWS', cat: 'Cloud SecOps' },
]

const WORK_ENVS = [
  { type: 'Hybrid', pct: 47 },
  { type: 'Remote', pct: 38 },
  { type: 'In-Office / Secure', pct: 15 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Powered Threat Detection', icon: <Sparkles size={20} />,
    desc: 'AI-driven SIEM and EDR platforms now detect behavioural anomalies that rule-based systems miss entirely. Security engineers who understand how to train, tune, and interpret AI threat models are dramatically more effective than those relying on signature-based tools alone.',
    tools: ['Microsoft Sentinel AI', 'CrowdStrike Charlotte AI', 'Darktrace', 'Vectra AI'],
    borderColor: 'rgba(21,128,61,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(21,128,61,0.12)', icoColor: '#15803d', tagBg: 'rgba(21,128,61,0.1)', tagColor: '#15803d', titleColor: '#15803d',
  },
  {
    title: 'AI-Assisted Penetration Testing', icon: <Zap size={20} />,
    desc: 'AI tools now automate reconnaissance, suggest attack chains from known CVEs, and generate custom payloads. Security professionals using AI assistants in pen testing engagements complete assessments 40–60% faster — but still need deep manual expertise for complex targets.',
    tools: ['PentestGPT', 'Nuclei AI', 'Exploit-DB AI', 'Claude for Reports'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI-Augmented Incident Response', icon: <TrendingUp size={20} />,
    desc: 'AI-powered SOAR platforms automatically correlate alerts, enrich indicators of compromise, and suggest remediation playbooks. Security teams using AI-assisted response report mean-time-to-contain (MTTC) reductions of 50–70% compared to fully manual investigation.',
    tools: ['Palo Alto XSOAR', 'Splunk SOAR', 'Google SecOps', 'IBM QRadar AI'],
    borderColor: 'rgba(234,88,12,0.18)', bgColor: '#fff7ed', icoBg: 'rgba(234,88,12,0.12)', icoColor: '#ea580c', tagBg: 'rgba(234,88,12,0.1)', tagColor: '#ea580c', titleColor: '#ea580c',
  },
]

const FUTURE_SKILLS = [
  'AI/ML Security & Adversarial ML', 'LLM Prompt Injection & AI Red Teaming',
  'eBPF-Based Security Monitoring', 'Zero Trust Network Architecture',
  'Quantum-Resistant Cryptography', 'Cloud-Native Security (eBPF, Falco)',
]

const PROS = [
  { title: 'One of the Most In-Demand Fields on Earth', desc: 'There are 3.5 million unfilled cybersecurity positions globally as of 2026. Demand structurally exceeds supply across every industry — from banking to healthcare to critical infrastructure.' },
  { title: 'Exceptional Salary Ceiling', desc: 'Senior security engineers and CISOs at South African enterprises and global remote companies earn R1.75M–R4M+. Specialisations like cloud security and red team command the highest premiums.' },
  { title: 'Genuinely Important Work', desc: 'You protect hospitals, banks, governments, and millions of ordinary people from criminals and nation-state actors. Security professionals defend the digital infrastructure that modern society depends on.' },
  { title: 'Career Variety Within One Field', desc: 'Cybersecurity contains multitudes: red team operator, digital forensics investigator, cloud security architect, malware analyst, GRC consultant, threat intelligence analyst. One career, a dozen specialisations.' },
  { title: 'Always Learning, Never Bored', desc: 'The threat landscape evolves continuously. No two incidents are identical. Security professionals are forced to keep learning — which keeps the work intellectually stimulating for decades.' },
  { title: 'Respected and Visible at Executive Level', desc: 'Security is now a board-level concern. Skilled security engineers get direct exposure to executive leadership and have genuine influence over company strategy — rare in most technical roles.' },
]

const CONS = [
  { title: 'Adversarial, Asymmetric Pressure', desc: 'Defenders must protect everything, always. Attackers only need to succeed once. This asymmetry creates constant pressure that less resilient professionals find unsustainable long-term.' },
  { title: 'On-Call and Incident Stress', desc: 'Breaches don\'t respect business hours. Senior security professionals carry on-call responsibilities, and major incidents can mean 72-hour response sprints with enormous business pressure.' },
  { title: 'Certification Treadmill', desc: 'Certifications in this field expire and require continuing education credits. Staying credentialled — especially for CISSP, CISM, and cloud certs — requires continuous investment of time and money.' },
  { title: 'Ethical and Legal Complexity', desc: 'Security professionals regularly handle evidence of crimes, sensitive data, and legally complex situations. Operating within strict ethical and legal boundaries — even under pressure — is non-negotiable and stressful.' },
  { title: 'Alert Fatigue and Burnout Risk', desc: 'SOC analysts face hundreds of alerts daily. The combination of high-volume repetitive triage, high stakes, and chronic understaffing creates one of the highest burnout rates in all of tech.' },
  { title: 'Rapid Tool and Threat Evolution', desc: 'A technique that worked against a threat actor last year may be obsolete today. Security professionals who stop learning for six months risk falling meaningfully behind the threat landscape.' },
]

const VIDEOS = [
  { id: 'hXSFdwIOfnE', title: 'Cybersecurity Full Course for Beginners 2025', desc: 'A comprehensive introduction to cybersecurity concepts, tools, and career paths — everything you need to start your journey from complete zero.', dur: '11:24:35', channel: 'freeCodeCamp' },
  { id: 'qiQR5rTSshw', title: 'CompTIA Security+ Full Course & Exam Prep', desc: 'Complete preparation for the Security+ certification — the #1 entry-level cybersecurity cert trusted by employers worldwide including the US Department of Defense.', dur: '8:56:07', channel: 'Professor Messer' },
  { id: 'aU-8AxBSXNk', title: 'Ethical Hacking Full Course — Kali Linux & Tools', desc: 'Hands-on ethical hacking course covering network scanning, exploitation, privilege escalation, and post-exploitation using Kali Linux and industry tools.', dur: '14:32:20', channel: 'TCM Security' },
]

const TAKEAWAYS = [
  'Build a home lab — virtual machines, vulnerable-by-design apps, and network simulations teach you more than any book',
  'Earn certifications in order: Security+ first, then specialise into OSCP (red team), CISSP (management), or CCSP (cloud)',
  'Practise on TryHackMe or Hack The Box every week — consistent hands-on reps separate working knowledge from theory',
  'Document every investigation, CTF writeup, and tool you build — a public portfolio beats a certificate in most hiring processes',
  'The MITRE ATT&CK framework is the lingua franca of modern security — learn it inside out before any interview',
]

/* ─── CAREER FACTS ────────────────────────────────────────────────────────── */

const CAREER_FACTS = [
  {
    icon: <Shield size={20} />, title: 'What You Protect',
    desc: 'Networks, cloud infrastructure, web applications, endpoints, identities, data pipelines, APIs, and the people who depend on all of them — from individual users to national critical infrastructure.',
    color: '#15803d',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Penetration testing, incident response, threat hunting, vulnerability management, security architecture review, detection engineering, malware analysis, and compliance auditing.',
    color: '#1d4ed8',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Software engineers needing secure code review, DevOps teams building secure pipelines, legal and compliance departments, executive leadership on risk decisions, and law enforcement on serious incidents.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: '3.5 million unfilled cybersecurity roles globally in 2026. Every organisation that stores data — which is every organisation — needs security expertise. Demand is growing faster than supply in every vertical.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🛡️', title: 'You Defend What Matters Most', desc: 'Security professionals protect hospitals, financial systems, government infrastructure, and millions of ordinary people. The work is not abstract — it has tangible, life-changing consequences.' },
  { emoji: '💰', title: 'Elite Compensation', desc: 'Senior security engineers earn R1.75M–R4M+ in South Africa. Cloud security architects and red team leads at USD-paying companies earn considerably more, with near-zero competition for the best roles.' },
  { emoji: '🌍', title: 'Work From Anywhere', desc: '38% of cybersecurity roles are fully remote. Security analysis, threat hunting, and pen testing engagements are conducted digitally — your location is irrelevant to your effectiveness.' },
  { emoji: '🧩', title: 'Endlessly Interesting Problems', desc: 'No two breaches are the same. Tracking a sophisticated threat actor through log data, reverse-engineering malware, or hunting for a zero-day in a live environment — this work is genuinely thrilling.' },
  { emoji: '📈', title: 'Clear Path to CISO and Leadership', desc: 'Senior Security Engineer → Security Architect → VP of Security → CISO is one of the most financially rewarding and strategically impactful career trajectories in all of technology.' },
  { emoji: '🔒', title: 'Skills That Never Expire', desc: 'Network fundamentals, cryptography, and attacker mindset are timeless. The tools change, but the foundational thinking of a skilled security professional compounds for 30 years.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#15803d', bgColor: '#f0fdf4', items: [
    { name: 'TryHackMe — Learning Paths (free tier)', url: '#', type: 'Lab', rating: 5 },
    { name: 'Hack The Box Academy (free modules)', url: '#', type: 'Lab', rating: 5 },
    { name: 'SANS Cyber Aces (free fundamentals)', url: '#', type: 'Course', rating: 5 },
    { name: 'TCM Security — free YouTube courses', url: '#', type: 'YouTube', rating: 5 },
  ]},
  { category: 'Practice', color: '#1d4ed8', bgColor: '#eff6ff', items: [
    { name: 'PicoCTF — beginner-friendly CTFs', url: '#', type: 'CTF', rating: 5 },
    { name: 'PortSwigger Web Security Academy', url: '#', type: 'Lab', rating: 5 },
    { name: 'VulnHub — downloadable VM targets', url: '#', type: 'Lab', rating: 4 },
    { name: 'MITRE ATT&CK Navigator', url: '#', type: 'Reference', rating: 5 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'The Cyber Mentor YouTube Channel', url: '#', type: 'YouTube', rating: 5 },
    { name: 'r/netsec & r/cybersecurity', url: '#', type: 'Forum', rating: 4 },
    { name: 'Risky Business Podcast', url: '#', type: 'Podcast', rating: 5 },
    { name: 'Krebs on Security Blog', url: '#', type: 'Blog', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Security Analyst', range: 'R280k – R500k', midpoint: 390, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Cybersecurity Engineer', range: 'R550k – R980k', midpoint: 765, yoe: '2–5 yrs', color: '#15803d' },
  { role: 'Senior Security Engineer', range: 'R980k – R1.75M', midpoint: 1365, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'CISO / Principal Security', range: 'R2M – R4M+', midpoint: 2800, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Studying Theory Without Touching Tools',
    desc: 'Reading about SQL injection and actually exploiting a vulnerable application are entirely different experiences. Cybersecurity is a practical discipline — professionals hired without lab hours are dangerous to themselves and their employer.',
    fix: 'Spend at least 60% of your learning time in labs. TryHackMe, Hack The Box, and PortSwigger Web Academy are free. Start before you feel ready.',
  },
  {
    num: '02', title: 'Skipping Networking Fundamentals',
    desc: 'Security engineers who don\'t understand TCP/IP, DNS, routing, and packet analysis cannot effectively investigate network-based attacks — which account for the majority of all real-world incidents.',
    fix: 'Before touching Kali Linux, complete a solid networking fundamentals course. Professor Messer\'s Network+ material is free and excellent.',
  },
  {
    num: '03', title: 'Chasing Too Many Certifications at Once',
    desc: 'The cybersecurity certification landscape is vast. Beginners who pursue CISSP, CEH, and OSCP simultaneously typically pass none. Diluted focus produces shallow, fragile knowledge.',
    fix: 'One certification at a time. Security+ first, always. Then specialise based on the type of role you want — red or blue team.',
  },
  {
    num: '04', title: 'Never Documenting Your Work',
    desc: 'A security professional who cannot communicate findings clearly in writing is only half as effective. Undocumented lab work, CTF writeups, and incident responses are invisible to hiring managers.',
    fix: 'Start a blog or GitHub repo today. Write up every CTF you complete, every lab you run, every tool you configure. This becomes your most powerful hiring asset.',
  },
  {
    num: '05', title: 'Ignoring the Defensive Side (or Offensive Side)',
    desc: 'Red-team-only thinkers struggle to build lasting defensive programmes. Blue-team-only thinkers struggle to understand attacker perspective. The best security professionals understand both deeply.',
    fix: 'Alternate your learning between offensive (pen testing, CTFs) and defensive (SIEM, detection engineering, incident response). The intersection is where expertise lives.',
  },
  {
    num: '06', title: 'Neglecting Legal and Ethical Boundaries',
    desc: 'Testing systems without explicit written permission — even out of curiosity — is illegal in most jurisdictions. New security professionals who explore outside of lab environments risk criminal charges.',
    fix: 'Always have explicit, written permission. Use designated lab environments (TryHackMe, HackTheBox, your own VMs). Understand the Computer Misuse Act in your jurisdiction.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'IT Support / Sysadmin',
    ease: 'Natural Fit', easeColor: '#15803d', easeBg: '#f0fdf4',
    desc: 'Systems administration experience gives you deep OS, networking, and infrastructure knowledge — the exact foundation security is built on. You already know what normal looks like, which is half of threat detection.',
    steps: ['Earn CompTIA Security+ (builds directly on your A+ / N+)', 'Set up a home SIEM lab with Splunk or Elastic', 'Complete TryHackMe\'s SOC Level 1 learning path', 'Apply to Junior SOC Analyst or Security Engineer roles'],
  },
  {
    from: 'Software Developer',
    ease: 'Strong Fit', easeColor: '#1d4ed8', easeBg: '#eff6ff',
    desc: 'Programming skills are a massive advantage in security. You understand how applications are built — which means you can understand exactly how they are broken. Application security and red team engineering are natural destinations.',
    steps: ['Study OWASP Top 10 in depth — exploit each category in a lab', 'Complete PortSwigger Web Security Academy (free)', 'Earn Security+ then pursue OSCP for penetration testing', 'Target AppSec, DevSecOps, or Red Team engineering roles'],
  },
  {
    from: 'Network Engineer',
    ease: 'Very Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Network engineers already understand the infrastructure attacks traverse. Pivoting to network security, intrusion detection, and firewall engineering requires relatively little additional foundational learning.',
    steps: ['Add Security+ to your CCNA/CCNP credentials', 'Learn Wireshark packet analysis at an advanced level', 'Study intrusion detection systems (Snort, Suricata)', 'Target Network Security Engineer or SOC roles immediately'],
  },
  {
    from: 'Other Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Domain expertise is genuinely valuable in cybersecurity. Healthcare, legal, financial, and industrial backgrounds are prized in GRC, compliance, and sector-specific security roles that generic security professionals can\'t fill.',
    steps: ['Start with TryHackMe pre-security learning path', 'Earn CompTIA Security+ as your foundation credential', 'Target GRC or compliance roles in your previous industry', 'Add CISM or ISO 27001 Lead Implementer for management track'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Foundations & Lab Setup', color: '#15803d', bg: '#f0fdf4', days: [
    { day: 'Day 1–2', task: 'Install VirtualBox. Set up Kali Linux VM. Learn 20 essential CLI commands. Watch a networking fundamentals crash course.' },
    { day: 'Day 3–4', task: 'Create a TryHackMe account. Complete the "Pre-Security" learning path. Understand networking, web, and Linux basics.' },
    { day: 'Day 5–6', task: 'Study the OSI model, TCP/IP, DNS, and HTTP/S until you can explain them from memory. Use Wireshark to capture and analyse real traffic.' },
    { day: 'Day 7', task: 'Complete TryHackMe "Introduction to Cybersecurity" path. Write your first security notes document in Obsidian or Notion.' },
  ]},
  { week: 'Week 2', theme: 'Security Concepts & First Tools', color: '#1d4ed8', bg: '#eff6ff', days: [
    { day: 'Day 8–9', task: 'Study CIA Triad, threat actors, attack types, and basic cryptography. Begin Professor Messer\'s Security+ course.' },
    { day: 'Day 10–11', task: 'Run your first Nmap scan against your own lab VMs. Document findings. Learn what open ports mean for attack surface.' },
    { day: 'Day 12–13', task: 'Set up a vulnerable target (Metasploitable 2 or DVWA). Run basic vulnerability scans with Nessus Essentials (free).' },
    { day: 'Day 14', task: 'Complete your first TryHackMe room that involves a full compromise chain. Document every step in a writeup.' },
  ]},
  { week: 'Week 3', theme: 'Ethical Hacking & Web Security', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Install Burp Suite Community. Complete PortSwigger\'s "SQL Injection" and "XSS" labs. Understand OWASP Top 10 category by category.' },
    { day: 'Day 17–18', task: 'Complete TryHackMe "Jr Penetration Tester" path first two modules. Practice enumeration and basic exploitation.' },
    { day: 'Day 19–20', task: 'Set up a basic Splunk or Elastic SIEM. Ingest logs from your VMs. Write your first detection rule for a login brute force.' },
    { day: 'Day 21', task: 'Complete a full CTF room on HackTheBox or TryHackMe. Write a full writeup and post it publicly on GitHub or a blog.' },
  ]},
  { week: 'Week 4', theme: 'Portfolio & Job Readiness', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Create a GitHub profile. Upload your lab documentation, CTF writeups, and tool configurations. Add a clear README.' },
    { day: 'Day 25–26', task: 'Register for CompTIA Security+ exam. Build a 60-day study plan. Complete two full practice exams to baseline your knowledge.' },
    { day: 'Day 27–28', task: 'Update your LinkedIn with your lab skills, TryHackMe profile, and CTF completions. Request recommendations from peers.' },
    { day: 'Day 29–30', task: 'Apply to 5 Junior SOC Analyst or Security Analyst roles. Tailor each application to the specific tools and skills in the JD.' },
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
      try { await navigator.share({ title: 'Cybersecurity Specialist Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Cybersecurity Specialist in 2026', url: window.location.href }) }
      catch (_) {}
    } else { handleCopy() }
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-10 p-4 rounded-2xl" style={{ background: '#f8fff9', border: `1px solid ${C.border}` }}>
      <span className="text-xs font-semibold" style={{ color: C.textMuted }}>Share this roadmap:</span>
      <button onClick={handleCopy} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: copied ? 'rgba(21,128,61,0.1)' : C.primaryLight, color: copied ? '#15803d' : C.primary, outline: 'none' }}>
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/cybersecurity'}</span>
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
export default function CybersecuritySpecialistRoadmapPage() {
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
            src="https://i.imgur.com/vINLHHJ.jpeg"
            alt="Cybersecurity specialist monitoring threats"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Shield size={12} /> Security & Defence
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f1a0f', letterSpacing: '-0.03em' }}>
                Cybersecurity Specialist
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
            Defend the systems the world depends on. Cybersecurity specialists protect networks, data, and infrastructure from adversaries — the last line of defence between organisations and the threats that never sleep.
          </p>
          <div className="h-px mt-10" style={{ background: C.border }} />
        </div>
      </div>

      {/* ── TABLE OF CONTENTS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8fff9' }}>
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Cybersecurity" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0fdf4', borderColor: 'rgba(21,128,61,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Cybersecurity Specialist</strong> protects an organisation's digital assets from unauthorised access, attack, and disruption. They operate across both offensive and defensive disciplines — hunting threats before they strike, responding to incidents when they do, and architecting security controls that make systems resilient by design. While software developers build the digital world, security specialists ensure it remains trustworthy.
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
      <section className="border-b" style={{ ...sectionStyle, background: '#f8fff9' }}>
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Cybersecurity Specialist workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(21,128,61,0.3)'; (e.currentTarget as HTMLElement).style.background = '#f0fdf4' }}
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
                <div className="rounded-2xl p-5 mb-4 border" style={{ background: '#f8fff9', borderColor: C.border }}>
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
                <div className="rounded-2xl p-5 border" style={{ background: '#f8fff9', borderColor: C.border }}>
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
      <section ref={tlSectionRef} className="border-b" style={{ ...sectionStyle, background: '#f8fff9' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={tlRef}>
            <SectionHeader icon={<Clock size={22} />} title="Career Timeline" subtitle="Time estimates and salary ranges for each level" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="mb-10">
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior Analyst → CISO</span></div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                <div ref={progressRef} className="h-1.5 rounded-full" style={{ width: '0%', background: 'linear-gradient(90deg, #0891b2 0%, #15803d 33%, #7c3aed 66%, #ea580c 100%)' }} />
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
              const icons = ['🌐', '🔐', '⚔️', '🔍', '☁️', '🏆']
              const accentColors = ['#15803d', '#1d4ed8', '#15803d', '#1d4ed8', '#15803d', '#1d4ed8']
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.indigo} 100%)`, boxShadow: '0 8px 48px rgba(21,128,61,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>12–18 months · Consistent daily practice · Build and document real lab work</div>
            </div>
          </div>
          <ShareBar />
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8fff9' }}>
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
                  <div key={s.name} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border transition-colors cursor-default" style={{ background: '#f8fff9', borderColor: C.border }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.primaryLight}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#f8fff9'}>
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
      <section className="border-b" style={{ ...sectionStyle, background: '#f8fff9' }}>
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
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0fdf4', borderColor: 'rgba(21,128,61,0.2)', color: C.textMuted }}>
              AI tools don't replace security professionals — they <em style={{ color: C.primary }}>amplify</em> them. Specialists who leverage AI-powered detection, automated SOAR playbooks, and AI-assisted pen testing tools complete investigations faster and cover more attack surface than those working with manual processes alone.
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
                <div key={s} className="flex items-center gap-2.5 rounded-xl px-4 py-3.5 border" style={{ background: '#f8fff9', borderColor: C.border }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-black text-xs" style={{ background: C.primaryLight, color: C.primary }}>{i + 1}</div>
                  <span className="text-xs font-medium" style={{ color: C.text }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROS & CONS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8fff9' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={pcRef}>
            <SectionHeader icon={<Scale size={22} />} title="Pros & Cons" subtitle="The honest picture of this career path" iconBg="rgba(148,163,184,0.1)" iconColor={C.textMuted} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-3xl p-7 border" style={{ background: '#f0fdf4', borderColor: 'rgba(21,128,61,0.2)' }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(21,128,61,0.12)' }}><ThumbsUp size={16} style={{ color: C.green }} /></div>
                  <span className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.green }}>Advantages</span>
                </div>
                {PROS.map(p => (
                  <div key={p.title} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border" style={{ background: C.bg, borderColor: 'rgba(21,128,61,0.12)' }}>
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
            <div className="rounded-2xl p-6 mb-6 border" style={{ background: '#f0fdf4', borderColor: 'rgba(21,128,61,0.2)' }}>
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially for senior security and cloud security roles — can pay 2–4× these figures in USD.</p>
            </div>
            <div className="space-y-4">
              {SALARY_DATA.map(row => (
                <div key={row.role} className="rounded-2xl p-5 border" style={{ background: '#f8fff9', borderColor: C.border }}>
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div>
                      <span className="text-sm font-bold" style={{ color: C.text }}>{row.role}</span>
                      <span className="ml-3 text-xs font-mono" style={{ color: C.textFaint }}>{row.yoe}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: row.color }}>{row.range}</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 3800) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f0fdf4', borderColor: 'rgba(21,128,61,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> Security engineers at financial institutions, healthcare companies, and critical infrastructure providers earn 30–50% more than those at agencies. Target companies where a breach would be catastrophic — their security investment reflects it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8fff9' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring cybersecurity professionals" iconBg={C.orangeLight} iconColor={C.orange} />
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
      <section className="border-b" style={{ ...sectionStyle, background: '#f8fff9' }}>
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
                <div key={v.id} className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ background: '#f8fff9', borderColor: C.border }}
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
      <section className="border-b" style={{ ...sectionStyle, background: '#f8fff9' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={finalRef}>
            <SectionHeader icon={<Award size={22} />} title="Final Thoughts" subtitle="What we want you to take away from this guide" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 border mb-8" style={{ background: C.bg, borderColor: C.border }}>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#374151' }}>
                Cybersecurity is one of the most <strong style={{ color: C.primary }}>consequential and in-demand disciplines</strong> in all of technology. Every organisation that stores data — which is every organisation — is a target. And every target needs defenders who understand how attacks work and how to stop them.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The path demands continuous learning, ethical commitment, and comfort with ambiguity. But the professionals who commit to this field build skills that never become irrelevant — because as long as there are systems, there will be people trying to break them.
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to spin up Kali Linux and run your first scan.
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