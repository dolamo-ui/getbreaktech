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
  Layers, FileText,
  Workflow, Headphones, Wrench, LifeBuoy,
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
  primary: '#0369a1',
  primaryLight: 'rgba(3,105,161,0.08)',
  primaryMid: 'rgba(3,105,161,0.15)',
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
    level: 'Junior', title: 'IT Support Technician', duration: '0–2 yrs', salary: 'R180k–R320k',
    description: 'Handle password resets, basic hardware troubleshooting, software installs, and user account management. Learn the ticketing system and escalation procedures.',
    skills: ['Help Desk Tools', 'Windows OS', 'Hardware Basics', 'Ticketing Systems'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'IT Support Specialist', duration: '2–5 yrs', salary: 'R320k–R600k',
    description: 'Own complex troubleshooting cases, manage network configurations, administer Active Directory, and mentor junior technicians across the team.',
    skills: ['Active Directory', 'Networking', 'VPN & Remote Tools', 'ITIL Basics'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior IT Support / Analyst', duration: '5–8 yrs', salary: 'R600k–R950k',
    description: 'Lead IT projects, implement systems and infrastructure upgrades, manage vendor relationships, and define support processes that scale across the organisation.',
    skills: ['Systems Admin', 'Project Management', 'ITIL Certified', 'Cloud Platforms'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'IT Manager / Director', duration: '8+ yrs', salary: 'R1M+',
    description: 'Define the IT strategy, manage departments and budgets, oversee enterprise infrastructure, and align technology investments with organisational goals.',
    skills: ['IT Strategy', 'Budget Management', 'Enterprise Arch.', 'Leadership'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'IT Fundamentals & Operating Systems',
    description: 'Start with CompTIA IT Fundamentals (ITF+) or A+ concepts. Learn how hardware components interact, understand Windows 10/11 and macOS administration, file systems, user accounts, and basic command-line operations. This foundation makes every subsequent skill faster to learn.',
    duration: '1–2 months', skills: ['Windows 10/11', 'macOS Basics', 'Hardware Components', 'Command Line'],
  },
  {
    step: 2, title: 'Networking Essentials',
    description: 'Understand TCP/IP, DNS, DHCP, subnetting, and the OSI model. Learn how to troubleshoot connectivity issues, configure basic routers and switches, set up VPNs, and understand Wi-Fi security. CompTIA Network+ is the gold standard certification for this stage.',
    duration: '2–3 months', skills: ['TCP/IP & DNS', 'Network Troubleshooting', 'VPN Configuration', 'Wi-Fi Security'],
  },
  {
    step: 3, title: 'Help Desk & Ticketing Systems',
    description: 'Learn to work with ticketing platforms like ServiceNow, Jira Service Desk, or Zendesk. Understand ITIL incident, problem, and change management frameworks. Practice writing clear ticket documentation, setting priorities, and communicating resolutions to non-technical users.',
    duration: '1–2 months', skills: ['ServiceNow / Jira', 'ITIL Framework', 'Ticket Documentation', 'SLA Management'],
  },
  {
    step: 4, title: 'Active Directory & User Management',
    description: 'Learn Microsoft Active Directory — creating and managing users, groups, OUs, and Group Policy Objects. Understand permissions models, password policies, and Microsoft 365 administration including Exchange, Teams, and SharePoint from the admin perspective.',
    duration: '2–3 months', skills: ['Active Directory', 'Group Policy', 'Microsoft 365 Admin', 'User Provisioning'],
  },
  {
    step: 5, title: 'Security Basics & Endpoint Management',
    description: 'IT support is the first line of defence. Learn antivirus and EDR tools, patch management, disk encryption (BitLocker), MFA setup, phishing identification, and basic incident response. Study CompTIA Security+ to formalise your knowledge and boost hiring eligibility.',
    duration: '2–3 months', skills: ['Endpoint Security', 'Patch Management', 'MFA & BitLocker', 'Security+ Concepts'],
  },
  {
    step: 6, title: 'Cloud, Remote Tools & Automation',
    description: 'Modern IT support is increasingly cloud-based. Learn Azure AD, Intune for device management, and remote support tools like TeamViewer and AnyDesk. Begin automating repetitive tasks with PowerShell scripts — this skill alone separates good IT support professionals from great ones.',
    duration: '2–3 months', skills: ['Azure AD / Intune', 'Remote Support Tools', 'PowerShell Basics', 'MDM Platforms'],
  },
]

const HARD_SKILLS = [
  { name: 'Windows & macOS Administration', level: 95 },
  { name: 'Active Directory & M365', level: 90 },
  { name: 'Networking & TCP/IP', level: 85 },
  { name: 'Ticketing & ITIL Processes', level: 88 },
  { name: 'Endpoint Security & EDR', level: 78 },
  { name: 'PowerShell Scripting', level: 65 },
  { name: 'Azure / Cloud Fundamentals', level: 60 },
  { name: 'Remote Support & MDM Tools', level: 82 },
]

const SOFT_SKILLS = [
  { name: 'Patient Communication', description: 'Translate technical problems into language any user understands. The ability to stay calm, empathetic, and clear when a frustrated user calls is the single most important skill in IT support.' },
  { name: 'Systematic Troubleshooting', description: 'Great IT support engineers never guess. They eliminate variables methodically, document what they try, and follow a logical process from symptom to root cause every single time.' },
  { name: 'Ownership & Follow-Through', description: 'Own every ticket from open to close. Users should never have to chase up on their issue. Follow through even when resolution requires escalation to another team.' },
  { name: 'Prioritisation Under Pressure', description: 'Multiple critical tickets at once is the norm. The ability to triage by business impact, communicate delays proactively, and stay composed under pressure is highly valued.' },
  { name: 'Documentation Discipline', description: 'Write resolution notes that your future self and your teammates can actually use. Good documentation eliminates repeat incidents and builds a knowledge base the whole organisation benefits from.' },
  { name: 'Security Awareness', description: 'IT support professionals are trusted with admin credentials and access to every system. Maintaining a security-first mindset — never sharing passwords, always verifying identity — protects the entire organisation.' },
]

const EDU_PATHS = [
  {
    type: 'Certifications', title: 'CompTIA Certification Path', duration: '6–18 months', cost: 'R8k – R30k',
    borderColor: 'rgba(3,105,161,0.2)', bgColor: '#f0f9ff', typeBg: 'rgba(3,105,161,0.12)', typeColor: '#0369a1',
    pros: ['Industry-recognised credentials (A+, Net+, Sec+)', 'Directly matched to job descriptions', 'Faster path to employment than a degree', 'Stackable — each cert builds on the last'],
    cons: ['Certs alone without hands-on experience have limits', 'Renewal every 3 years required', 'Exam costs can add up quickly', 'Self-study requires discipline'],
  },
  {
    type: 'Diploma / Degree', title: 'IT Diploma or IS Degree', duration: '2–4 years', cost: 'R80k – R600k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Broad theoretical foundation in systems and networking', 'Higher starting salary in some organisations', 'Internship and graduate placement programmes', 'Opens doors to IT management faster'],
    cons: ['Slow and expensive compared to certs', 'Often outdated tooling in curriculum', 'Degree alone without certs can be less competitive', 'Opportunity cost of 2–4 years not working'],
  },
  {
    type: 'Self-Taught', title: 'Online Courses & Home Lab', duration: '6–18 months', cost: 'R0 – R5k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['Professor Messer, TryHackMe, and YouTube are free', 'Build a home lab with old hardware or VMs', 'Learn exactly what the job requires', 'Move at your own pace'],
    cons: ['No formal credential on CV without passing an exam', 'Easy to miss important fundamentals', 'Requires exceptional self-motivation', 'Home lab setup can be confusing without guidance'],
  },
]

const SCHEDULE = [
  { time: '8:00', act: 'Ticket Triage & Morning Standup', desc: 'Review overnight tickets, prioritise by urgency and business impact, and sync with the team on active incidents and scheduled work', duration: '30 min', icon: <LifeBuoy size={14} /> },
  { time: '8:30', act: 'High-Priority Incident Resolution', desc: 'Work through P1 and P2 tickets first — system outages, VPN failures, email access issues, and anything blocking business-critical work', duration: '2 hrs', icon: <AlertTriangle size={14} /> },
  { time: '10:30', act: 'User Walk-Ins & Remote Sessions', desc: 'Handle desk-side support, remote desktop sessions, hardware swap-outs, new employee onboarding, and device setup tasks', duration: '2 hrs', icon: <Headphones size={14} /> },
  { time: '12:30', act: 'Lunch & Mental Reset', desc: 'Step away from the screen. IT support is emotionally taxing — a proper break maintains the patience and focus the afternoon requires', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '1:30', act: 'Proactive Maintenance & Projects', desc: 'Patch deployments, software rollouts, Active Directory cleanup, user access reviews, and progress on IT infrastructure improvement projects', duration: '1.5 hrs', icon: <Wrench size={14} /> },
  { time: '3:00', act: 'Documentation & Knowledge Base', desc: 'Document resolved tickets, write how-to guides for common issues, update runbooks, and contribute to the internal knowledge base', duration: '1 hr', icon: <FileText size={14} /> },
  { time: '4:00', act: 'Learning & Certification Study', desc: 'Study for the next CompTIA certification, work through an online lab, or research a new tool or technology relevant to your current environment', duration: '1 hr', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'ServiceNow / Jira', cat: 'Ticketing' }, { name: 'TeamViewer / AnyDesk', cat: 'Remote' },
  { name: 'Active Directory', cat: 'Identity' }, { name: 'Microsoft Intune', cat: 'MDM' },
  { name: 'Wireshark', cat: 'Network' }, { name: 'Azure Portal', cat: 'Cloud' },
  { name: 'PowerShell / CMD', cat: 'Scripting' }, { name: 'Bitdefender / CrowdStrike', cat: 'Security' },
]

const WORK_ENVS = [
  { type: 'In-Office / On-Site', pct: 52 },
  { type: 'Hybrid', pct: 35 },
  { type: 'Remote', pct: 13 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Powered Help Desk Automation', icon: <Sparkles size={20} />,
    desc: 'AI chatbots now handle Tier 1 tickets — password resets, basic troubleshooting, and FAQs — automatically. IT support professionals who understand how to configure, maintain, and escalate from these AI systems are far more valuable than those who fight them.',
    tools: ['ServiceNow AI', 'Freshdesk Freddy', 'Microsoft Copilot', 'Zendesk AI'],
    borderColor: 'rgba(3,105,161,0.18)', bgColor: '#f0f9ff', icoBg: 'rgba(3,105,161,0.12)', icoColor: '#0369a1', tagBg: 'rgba(3,105,161,0.1)', tagColor: '#0369a1', titleColor: '#0369a1',
  },
  {
    title: 'AI Diagnostics & Root Cause Analysis', icon: <Zap size={20} />,
    desc: 'Tools like Microsoft Copilot for IT and AI-powered monitoring platforms surface anomalies, predict hardware failures, and suggest resolution steps before the ticket is even submitted. Learning to work alongside these tools makes you dramatically faster.',
    tools: ['MS Copilot for IT', 'Datadog', 'SolarWinds AI', 'Dynatrace'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI-Assisted Script Generation', icon: <TrendingUp size={20} />,
    desc: 'GitHub Copilot and Claude generate PowerShell and Bash scripts for repetitive IT tasks — user provisioning, bulk password resets, system audits, and report generation. IT support engineers who use AI to automate handle 3× the workload with less manual effort.',
    tools: ['GitHub Copilot', 'Claude', 'PowerShell AI', 'Ansible'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'Microsoft Copilot Administration', 'AI Chatbot Configuration (ServiceNow)',
  'Zero Trust Network Architecture', 'Cloud Identity (Azure AD / Entra ID)',
  'PowerShell & Python Automation', 'AI-Powered Monitoring Tools',
]

const PROS = [
  { title: 'Always in Demand', desc: 'Every organisation — from schools to banks to hospitals — needs IT support. Demand is consistent, stable, and geographically widespread in ways that few tech roles can match.' },
  { title: 'Clear, Fast Path to Employment', desc: 'CompTIA A+ and Network+ open doors quickly. With the right certs and a home lab portfolio, motivated candidates can land their first role in 6–12 months.' },
  { title: 'Excellent Career Springboard', desc: 'IT support is one of the best entry points into tech. Many cybersecurity analysts, systems administrators, and cloud engineers started their careers on the help desk.' },
  { title: 'Broad, Transferable Skills', desc: 'Networking, security, operating systems, and cloud — the breadth of knowledge IT support builds transfers across every technical specialisation in the industry.' },
  { title: 'Human Impact Is Immediate', desc: 'You fix someone\'s problem and see their relief immediately. The feedback loop is instant and gratifying in a way that many behind-the-scenes tech roles are not.' },
  { title: 'Growth Into Management', desc: 'IT support professionals who develop leadership and project management skills progress naturally into IT Manager and IT Director roles with significant compensation increases.' },
]

const CONS = [
  { title: 'Repetitive Tier 1 Work', desc: 'Password resets, printer issues, and "have you tried turning it off and on again" can feel intellectually unstimulating. Junior roles especially involve a high volume of low-complexity tasks.' },
  { title: 'Emotional Labour with Frustrated Users', desc: 'Users in an IT crisis are often stressed, impatient, or rude. Maintaining composure, empathy, and professionalism under persistent pressure is genuinely draining.' },
  { title: 'Lower Starting Salaries vs Engineering', desc: 'Entry-level IT support pays significantly less than software engineering or cybersecurity. The ceiling is high, but the floor requires patience and progression.' },
  { title: 'On-Call and After-Hours Expectations', desc: 'Critical systems don\'t respect business hours. Senior IT support and systems admin roles often include on-call rotations and after-hours emergency response.' },
  { title: 'Undervalued in Many Organisations', desc: 'When everything works, IT support is invisible. Recognition and appreciation vary enormously by company culture — some organisations treat IT as a cost centre, not a strategic partner.' },
  { title: 'AI Automation of Tier 1 Tasks', desc: 'AI chatbots and self-service portals are steadily automating the most basic support tasks. Professionals who don\'t move up the value chain will find their roles shrinking.' },
]

const VIDEOS = [
  { id: 'tSodBEAJp3E', title: 'IT Support Fundamentals — Full Course', desc: 'A complete walkthrough of IT support concepts, help desk operations, troubleshooting methodology, and the technologies every IT support professional must know.', dur: '8:14:22', channel: 'freeCodeCamp' },
  { id: 'qiQR5rTSshw', title: 'CompTIA A+ Core 1 & 2 — Full Study Guide', desc: 'The definitive CompTIA A+ preparation covering hardware, operating systems, networking, and security for the most important entry-level IT certification.', dur: '20:11:48', channel: 'Professor Messer' },
  { id: '9eVywwAmmd4', title: 'Active Directory for IT Support — Full Guide', desc: 'Learn Active Directory administration from the ground up — users, groups, GPOs, OUs, permissions, and troubleshooting in a Windows Server environment.', dur: '3:47:30', channel: 'Josh Madakor' },
]

const TAKEAWAYS = [
  'Get your CompTIA A+ first — it\'s the universal entry credential and proves you know the fundamentals every employer tests for',
  'Build a home lab with VirtualBox and practice Active Directory, Windows Server, and networking on real (virtual) infrastructure',
  'Every resolved ticket is a learning opportunity — document what you learned, not just what you did',
  'Start studying for Security+ early — it\'s the fastest path to doubling your salary and transitioning into cybersecurity',
  'Your soft skills are as important as your technical skills — the IT support engineers who advance fastest are the ones users love working with',
]

const CAREER_FACTS = [
  {
    icon: <Headphones size={20} />, title: 'What You Do',
    desc: 'Troubleshoot hardware and software issues, manage user accounts, configure and maintain systems and networks, support employees across the organisation, and keep IT infrastructure running smoothly and securely.',
    color: '#0369a1',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Ticket management, remote and on-site support, Active Directory administration, network troubleshooting, device setup and imaging, patch management, software deployment, and security incident first response.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Every department in the organisation — from finance to operations to executives. Also works closely with systems administrators, network engineers, vendors, and the broader IT team on projects and escalations.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'IT support is one of the most consistently demanded technical roles globally. Every organisation needs it. The role serves as the primary entry point into the technology sector for thousands of professionals annually.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🚀', title: 'The Best Entry Point Into Tech', desc: 'IT support is the most accessible first step into a technology career. No coding required to start, certifications are achievable in months, and the role exposes you to the full breadth of an IT environment.' },
  { emoji: '🏦', title: 'Work in Any Industry', desc: 'Healthcare, finance, education, government, retail — every sector employs IT support professionals. Your skills travel with you across industries in a way that few specialisations allow.' },
  { emoji: '🔐', title: 'Springboard to Cybersecurity', desc: 'The fastest and most reliable path into cybersecurity runs through IT support. The hands-on network and security exposure builds the foundation every security analyst needs.' },
  { emoji: '🤝', title: 'You Solve Real Problems for Real People', desc: 'When a user\'s computer crashes before a presentation, you are the hero. The immediate, human impact of IT support is deeply satisfying and builds genuine relationships across an organisation.' },
  { emoji: '📜', title: 'Certifications Open Doors Fast', desc: 'CompTIA A+ is universally recognised and achievable without a degree. In 6 months of focused study, you can go from no IT background to a credential that gets CVs through screening software.' },
  { emoji: '📈', title: 'Multiple Career Trajectories', desc: 'From IT Support you can grow into systems administration, cybersecurity, cloud engineering, networking, IT management, or DevOps. Few roles in tech offer this breadth of onward paths.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#0369a1', bgColor: '#f0f9ff', items: [
    { name: 'Professor Messer — CompTIA A+ (free)', url: '#', type: 'Course', rating: 5 },
    { name: 'Google IT Support Certificate (Coursera)', url: '#', type: 'Course', rating: 5 },
    { name: 'Microsoft Learn — Azure Fundamentals', url: '#', type: 'Course', rating: 5 },
    { name: 'TryHackMe — Pre-Security Path (free tier)', url: '#', type: 'Labs', rating: 5 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'VirtualBox Home Lab (Windows Server)', url: '#', type: 'Lab', rating: 5 },
    { name: 'ExamCompass — Free CompTIA Practice Tests', url: '#', type: 'Practice', rating: 5 },
    { name: 'Josh Madakor\'s Active Directory Lab (YouTube)', url: '#', type: 'Project', rating: 5 },
    { name: 'r/homelab — Setup guides and inspiration', url: '#', type: 'Community', rating: 4 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'r/ITCareerQuestions & r/sysadmin', url: '#', type: 'Forum', rating: 5 },
    { name: 'NetworkChuck YouTube Channel', url: '#', type: 'YouTube', rating: 5 },
    { name: 'Spiceworks Community & Help Desk', url: '#', type: 'Forum', rating: 4 },
    { name: 'CompTIA CertMaster Practice', url: '#', type: 'Practice', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'IT Support Technician (Junior)', range: 'R180k – R320k', midpoint: 250, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'IT Support Specialist', range: 'R320k – R600k', midpoint: 460, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior IT Analyst / Systems Admin', range: 'R600k – R950k', midpoint: 775, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'IT Manager / Director', range: 'R1M – R2M+', midpoint: 1500, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Stopping at A+ and Never Progressing',
    desc: 'A+ is the starting line, not the finish. Professionals who don\'t continue to Network+, Security+, and cloud certifications plateau quickly in both salary and responsibility.',
    fix: 'Plan your certification roadmap before you start: A+ → Network+ → Security+ → specialisation. Treat each cert as a 6-month goal.',
  },
  {
    num: '02', title: 'Never Building a Home Lab',
    desc: 'Reading about Active Directory is very different from configuring it. Candidates who can describe hands-on lab experience in interviews stand out dramatically from those who only studied.',
    fix: 'Set up VirtualBox with a Windows Server VM, install Active Directory, create users and GPOs, and break things intentionally. Document everything on GitHub.',
  },
  {
    num: '03', title: 'Treating Every Ticket as Isolated',
    desc: 'If ten users report the same issue in a week, the problem is systemic — not individual. Professionals who spot patterns and address root causes create far more value than those who just close tickets.',
    fix: 'Track recurring issues in a personal log. When you see a pattern, write a problem ticket and propose a permanent fix to your manager.',
  },
  {
    num: '04', title: 'Neglecting Documentation',
    desc: 'Solved a tricky issue with no written record? That knowledge lives only in your head. When you leave or are on leave, the team starts from scratch — and so will you six months later.',
    fix: 'Write a resolution note on every non-trivial ticket. Contribute to the knowledge base monthly. Documentation is a gift to your future self and teammates.',
  },
  {
    num: '05', title: 'Underestimating Security Responsibilities',
    desc: 'IT support has admin access to nearly every system. Sharing credentials, skipping identity verification, or bypassing change control creates security risks with serious legal and organisational consequences.',
    fix: 'Always verify identity before resetting credentials. Never share admin passwords. Follow change management processes even when they feel slow.',
  },
  {
    num: '06', title: 'Ignoring the Path to Specialisation',
    desc: 'Generalist IT support is a great starting point, but specialists earn significantly more. Professionals who don\'t identify and pursue a specialisation remain on the lower end of the salary scale.',
    fix: 'By year 2, decide your direction: cybersecurity, cloud, networking, or systems administration. Every cert and project from that point should serve that specialisation.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Customer Service Representative',
    ease: 'Natural Fit', easeColor: '#0369a1', easeBg: '#f0f9ff',
    desc: 'You already have the communication skills that make IT support excellent. Add the technical fundamentals through CompTIA A+ and you have the complete package — empathy and expertise.',
    steps: ['Study CompTIA ITF+ or A+ for technical foundations', 'Volunteer to assist your workplace IT team', 'Build a home lab and document your learning', 'Apply to junior help desk roles with your service background'],
  },
  {
    from: 'Retail / Trade Technician',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Hardware knowledge, troubleshooting mindset, and customer interaction skills transfer directly. Many excellent IT support engineers came from electronics retail, appliance repair, or trade backgrounds.',
    steps: ['Leverage existing hardware knowledge for CompTIA A+', 'Study networking fundamentals (Network+)', 'Build and configure your own PC and home network', 'Target desktop support or hardware-heavy IT roles first'],
  },
  {
    from: 'Recent Graduate (Any Field)',
    ease: 'Very Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'A degree in any field combined with CompTIA A+ and hands-on lab work makes you a strong junior candidate. IT support values practical problem-solving over specific academic backgrounds.',
    steps: ['Complete CompTIA A+ (Core 1 & 2)', 'Build a home lab with Active Directory', 'Pursue the Google IT Support Certificate', 'Apply widely to entry-level help desk positions'],
  },
  {
    from: 'Other Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Domain expertise from another field combined with IT skills is genuinely valuable. An IT support professional who understands healthcare systems, financial software, or legal workflows commands a premium in those sectors.',
    steps: ['Start with CompTIA ITF+ to validate interest', 'Study for A+ with Professor Messer (free)', 'Build hands-on experience with a home lab', 'Target IT support roles in your previous industry vertical'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Foundations & Setup', color: '#0369a1', bg: '#f0f9ff', days: [
    { day: 'Day 1–2', task: 'Install VirtualBox. Create a Windows 10 VM. Spend 2 hours exploring every system setting, control panel, and admin tool you can find.' },
    { day: 'Day 3–4', task: 'Register for Professor Messer\'s free CompTIA A+ study guide. Complete the hardware section. Draw a diagram of how a PC\'s components connect.' },
    { day: 'Day 5–6', task: 'Practice the command line: ipconfig, ping, tracert, nslookup, netstat. Understand what each one tells you and when you\'d use it for troubleshooting.' },
    { day: 'Day 7', task: 'Sign up for a free ExamCompass practice test. Take your first A+ Core 1 practice exam without studying. Note every topic you get wrong.' },
  ]},
  { week: 'Week 2', theme: 'Networking & Active Directory', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Study TCP/IP, DNS, DHCP, and subnetting. Watch NetworkChuck\'s subnetting video. Practice calculating subnets until it becomes automatic.' },
    { day: 'Day 10–11', task: 'Set up a Windows Server VM. Install Active Directory Domain Services. Create an OU structure with user accounts and apply a basic GPO.' },
    { day: 'Day 12–13', task: 'Simulate 5 common support scenarios: password reset, shared drive access issue, printer not found, email not syncing, and VPN connection failure.' },
    { day: 'Day 14', task: 'Document your home lab setup in a GitHub README. Take screenshots of your Active Directory configuration. This becomes portfolio material.' },
  ]},
  { week: 'Week 3', theme: 'Ticketing, Security & Tools', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Sign up for a free Freshdesk or Zoho Desk trial. Create mock tickets for your home lab issues. Practice writing clear, professional resolution notes.' },
    { day: 'Day 17–18', task: 'Start the Google IT Support Certificate on Coursera (free to audit). Complete the first two modules on technical support and computer hardware.' },
    { day: 'Day 19–20', task: 'Study CompTIA Security+ domain 1 (Threats, Attacks, and Vulnerabilities). Identify 10 real phishing emails using PhishTank examples.' },
    { day: 'Day 21', task: 'Write 3 knowledge base articles: how to reset a Windows password, how to map a network drive, and how to configure MFA on Microsoft 365.' },
  ]},
  { week: 'Week 4', theme: 'Apply & Certify', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Take 3 full CompTIA A+ Core 1 practice exams. Aim for 85%+ consistently. Review every wrong answer with the official CompTIA study guide.' },
    { day: 'Day 25–26', task: 'Update your LinkedIn with your home lab project, skills, and any completed course certificates. Join 3 IT support LinkedIn groups and engage.' },
    { day: 'Day 27–28', task: 'Book your CompTIA A+ Core 1 exam. Write your CV emphasising your lab work, certifications in progress, and any relevant service or technical experience.' },
    { day: 'Day 29–30', task: 'Apply to 10 junior IT support or help desk roles. Tailor each application. Send a connection request to every IT recruiter on LinkedIn in your city.' },
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
      try { await navigator.share({ title: 'Customer IT Support Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Customer IT Support professional in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/customer-it-support'}</span>
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
export default function CustomerITSupportRoadmapPage() {
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
            src="https://i.imgur.com/y48FcBC.jpeg"
            alt="Customer IT Support professional at work"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Headphones size={12} /> IT & Technical Support
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Customer IT Support
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
            Be the person everyone calls when technology fails. Customer IT Support professionals keep organisations running — resolving issues, managing systems, and turning technical chaos into calm, reliable infrastructure.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Customer IT Support" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0f9ff', borderColor: 'rgba(3,105,161,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Customer IT Support Professional</strong> is the human interface between technology and the people who use it. They diagnose hardware and software failures, manage user accounts and permissions, maintain network infrastructure, and ensure the technology environment of an organisation functions reliably every day. Without IT support, every system failure becomes a crisis — with it, most issues are resolved before users even notice.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Customer IT Support could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Customer IT Support workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(3,105,161,0.3)'; (e.currentTarget as HTMLElement).style.background = '#f0f9ff' }}
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Technician → IT Manager</span></div>
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
              const icons = ['💻', '🌐', '🎫', '🏢', '🔒', '☁️']
              const accentColors = ['#0369a1', '#16a34a', '#0369a1', '#16a34a', '#0369a1', '#16a34a']
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.indigo} 100%)`, boxShadow: '0 8px 48px rgba(3,105,161,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>6–12 months · Consistent daily study · Pass your A+ and build your home lab</div>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Customer IT Support in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0f9ff', borderColor: 'rgba(3,105,161,0.2)', color: C.textMuted }}>
              AI is automating Tier 1 support tasks — not eliminating IT support professionals. The engineers who <em style={{ color: C.primary }}>configure, manage, and escalate from</em> AI systems are more productive and more valuable than ever. Understanding AI tools is now a required skill, not an optional one.
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Salaries vary significantly by industry — IT support in financial services and large corporates pays 30–50% above these figures.</p>
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
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 2000) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f0f9ff', borderColor: 'rgba(3,105,161,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> CompTIA Security+ certification typically adds R80k–R150k to an IT support salary and opens the door to cybersecurity analyst roles that pay significantly more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring IT support professionals" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into IT support from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in IT Support" iconBg={C.redLight} iconColor={C.red} />
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
                Customer IT Support is <strong style={{ color: C.primary }}>one of the most powerful starting points in technology</strong>. It gives you breadth — exposure to networking, security, systems, and cloud — that specialists take years to accumulate. The professionals who use that foundation strategically, and stack certifications and specialisations deliberately, consistently achieve remarkable career outcomes.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The help desk is not where careers end. For thousands of engineers working in cybersecurity, cloud architecture, and IT leadership today, it is precisely where their careers began.
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open VirtualBox and build your first Active Directory domain.
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