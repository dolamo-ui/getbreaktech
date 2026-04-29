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
  bgAlt: '#f8f9ff',
  bgCard: '#ffffff',
  border: 'rgba(0,0,0,0.07)',
  text: '#0f172a',
  textMuted: '#64748b',
  textFaint: '#94a3b8',
  primary: '#2563eb',          // blue — IT Support brand colour
  primaryLight: 'rgba(37,99,235,0.08)',
  primaryMid: 'rgba(37,99,235,0.15)',
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
    description: 'Resolve Tier 1 helpdesk tickets, set up workstations, troubleshoot hardware and software, manage user accounts, and escalate complex issues under supervision.',
    skills: ['Helpdesk', 'Windows/macOS', 'Active Directory', 'Hardware'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'IT Support Specialist', duration: '2–5 yrs', salary: 'R340k–R600k',
    description: 'Own Tier 2 escalations, manage network infrastructure, administer servers and cloud platforms, write automation scripts, and mentor junior technicians.',
    skills: ['Networking', 'Azure/M365', 'PowerShell', 'Server Admin'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior IT Specialist', duration: '5–8 yrs', salary: 'R650k–R1.1M',
    description: 'Architect IT infrastructure, lead migrations to cloud platforms, define security policies, manage vendor relationships, and drive digital transformation projects.',
    skills: ['Cloud Architecture', 'Security Policy', 'ITIL', 'Project Mgmt'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'IT Manager / Director', duration: '8+ yrs', salary: 'R1.2M+',
    description: 'Lead the entire IT function, set technology strategy, manage budgets and teams, own business continuity planning, and align IT investment with organisational goals.',
    skills: ['IT Strategy', 'Budget & Vendors', 'Risk Management', 'Leadership'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Hardware, Operating Systems & Helpdesk Fundamentals',
    description: 'Understand PC components, how to assemble and troubleshoot hardware, and master Windows 10/11 and macOS administration. Learn how helpdesks work: ticket systems, SLAs, escalation paths, and professional communication with end users.',
    duration: '1–2 months', skills: ['PC Hardware', 'Windows 10/11', 'macOS Basics', 'JIRA / ServiceNow'],
  },
  {
    step: 2, title: 'Networking Fundamentals',
    description: 'Networking is the backbone of all IT. Learn the OSI model, TCP/IP, subnetting, DNS, DHCP, VPNs, and how to configure switches and routers. Earn CompTIA Network+ to validate your knowledge — it\'s the industry-standard networking credential.',
    duration: '2–3 months', skills: ['TCP/IP & DNS', 'Subnetting', 'Wi-Fi & VPN', 'Network+'],
  },
  {
    step: 3, title: 'Microsoft 365, Active Directory & Identity Management',
    description: 'The majority of enterprise IT runs on Microsoft technologies. Learn Active Directory user and group management, Microsoft 365 administration, Exchange Online, Teams, SharePoint, and Azure AD (Entra ID). This knowledge is required at virtually every corporate IT role.',
    duration: '2–3 months', skills: ['Active Directory', 'Microsoft 365', 'Azure AD', 'Exchange Online'],
  },
  {
    step: 4, title: 'Scripting & Automation — PowerShell',
    description: 'IT specialists who automate repetitive tasks with PowerShell earn significantly more and advance faster. Learn to write scripts that create users in bulk, query Active Directory, manage files, and automate onboarding/offboarding workflows. This is the single biggest differentiator between junior and mid-level IT specialists.',
    duration: '2–3 months', skills: ['PowerShell', 'Automation Scripts', 'Task Scheduler', 'Bash Basics'],
  },
  {
    step: 5, title: 'Cloud Platforms — Azure or AWS',
    description: 'Enterprise IT has moved to the cloud. Learn Microsoft Azure (most relevant for Microsoft-centric environments) or AWS fundamentals. Understand virtual machines, storage, identity, and networking in the cloud. Earn AZ-900 or AWS Cloud Practitioner as your first cloud credential.',
    duration: '2–3 months', skills: ['Azure / AWS', 'Virtual Machines', 'Cloud Storage', 'AZ-900 / CCP'],
  },
  {
    step: 6, title: 'Security, ITIL & Advanced Infrastructure',
    description: 'Security is no longer optional in IT support. Learn CompTIA Security+ concepts, endpoint protection, patch management, and incident response. Study ITIL 4 Foundation to understand IT service management best practices. This knowledge unlocks senior specialist, sysadmin, and IT management roles.',
    duration: '2–3 months', skills: ['Security+', 'ITIL 4', 'Patch Management', 'Endpoint Security'],
  },
]

const HARD_SKILLS = [
  { name: 'Windows & macOS Administration', level: 95 },
  { name: 'Networking & TCP/IP', level: 90 },
  { name: 'Microsoft 365 & Active Directory', level: 90 },
  { name: 'PowerShell Scripting', level: 80 },
  { name: 'Cloud Platforms (Azure/AWS)', level: 72 },
  { name: 'IT Security & Endpoint Protection', level: 70 },
  { name: 'Virtualisation (Hyper-V / VMware)', level: 65 },
  { name: 'ITIL Service Management', level: 60 },
]

const SOFT_SKILLS = [
  { name: 'Patience & Empathy', description: 'IT support professionals work with non-technical users under stress. The ability to communicate calmly, explain solutions without jargon, and show genuine empathy for frustrated users defines great IT support.' },
  { name: 'Systematic Troubleshooting', description: 'Great IT specialists don\'t guess — they methodically isolate variables, rule out causes, and follow a logical diagnostic process. This structured approach solves problems faster and prevents recurrence.' },
  { name: 'Clear Written Communication', description: 'Ticket notes, knowledge base articles, and incident reports are read by colleagues and auditors. Precise, clear written communication is a professional skill that separates average and excellent IT specialists.' },
  { name: 'Prioritisation Under Pressure', description: 'IT support involves constant context switching between tickets of varying urgency. The ability to triage effectively, focus on business-critical issues first, and manage user expectations is a daily requirement.' },
  { name: 'Continuous Self-Learning', description: 'Technology changes faster than any training programme can keep up with. IT specialists who build a habit of continuous learning — certifications, YouTube, documentation — never become obsolete.' },
  { name: 'Stakeholder Management', description: 'At senior levels, IT specialists liaise with vendors, executives, and department heads. The ability to translate technical constraints into business language and manage expectations is critical for career advancement.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'IT / Computer Science Degree', duration: '3–4 years', cost: 'R300k – R900k',
    borderColor: 'rgba(37,99,235,0.2)', bgColor: '#eff6ff', typeBg: 'rgba(37,99,235,0.12)', typeColor: '#2563eb',
    pros: ['Strong CS and networking foundations', 'Respected at enterprise companies', 'Access to graduate IT programmes', 'Broader career options (dev, security, cloud)'],
    cons: ['Slow and expensive', 'Rarely teaches practical helpdesk or M365 skills', 'Cert-based knowledge often more valued in IT support', 'Significant classroom-to-workplace gap'],
  },
  {
    type: 'Certifications', title: 'CompTIA A+ → Network+ → Security+', duration: '6–18 months', cost: 'R15k – R60k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Industry-recognised globally', 'Faster to employment than a degree', 'Vendor-neutral technical validation', 'CompTIA A+ is widely required for junior roles'],
    cons: ['Cert alone without hands-on experience may not be enough', 'Renewal required every 3 years', 'No credential for leadership skills', 'Cost adds up across multiple certs'],
  },
  {
    type: 'Self-Taught', title: 'Home Lab + Online Courses', duration: '6–12 months', cost: 'R5k – R20k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['Hands-on learning from day one', 'Home lab builds real troubleshooting skills', 'Excellent free resources (Professor Messer, TryHackMe)', 'Can lead directly to certifications'],
    cons: ['No formal credential without sitting exams', 'Self-discipline required', 'Home lab hardware costs money', 'Networking gaps without structured curriculum'],
  },
]

const SCHEDULE = [
  { time: '8:30', act: 'Ticket Queue Review', desc: 'Triage overnight helpdesk tickets, prioritise by SLA urgency and business impact, assign unresolved escalations from the previous day', duration: '30 min', icon: <FileText size={14} /> },
  { time: '9:00', act: 'Tier 1 & 2 Support', desc: 'Resolve password resets, software installations, connectivity issues, printer problems, and VPN access — the daily bread of IT support at speed', duration: '2.5 hrs', icon: <Monitor size={14} /> },
  { time: '11:30', act: 'Infrastructure & Maintenance', desc: 'Apply patch updates, manage Active Directory accounts, review Azure alerts, maintain backup jobs, and respond to monitoring dashboard anomalies', duration: '1 hr', icon: <Server size={14} /> },
  { time: '1:00', act: 'Lunch & Recovery', desc: 'Step away from the queue. IT support has intense context-switching demands — mental recovery between peak periods maintains quality and accuracy', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Projects & Automation', desc: 'Work on longer-term infrastructure projects — new hardware rollouts, PowerShell automation scripts, user provisioning templates, or cloud migration tasks', duration: '1.5 hrs', icon: <Terminal size={14} /> },
  { time: '3:30', act: 'Documentation & Knowledge Base', desc: 'Update ticket notes, write knowledge base articles for recurring issues, document SOPs for common procedures, and update asset management records', duration: '1 hr', icon: <BookOpen size={14} /> },
  { time: '4:30', act: 'Learning & Certification Prep', desc: 'Study CompTIA, Microsoft, or Azure certification material. Home lab practice. Reading IT blogs (Spiceworks, The IT Pro). Building new automation scripts.', duration: '30 min', icon: <Globe size={14} /> },
]

const TOOLS = [
  { name: 'ServiceNow / JIRA', cat: 'Ticketing' }, { name: 'Microsoft 365 Admin', cat: 'Cloud Admin' },
  { name: 'Active Directory', cat: 'Identity' }, { name: 'PowerShell / Bash', cat: 'Automation' },
  { name: 'Azure Portal', cat: 'Cloud' }, { name: 'Wireshark / nmap', cat: 'Network' },
  { name: 'Acronis / Veeam', cat: 'Backup' }, { name: 'Lansweeper', cat: 'Asset Mgmt' },
]

const WORK_ENVS = [
  { type: 'In-Office', pct: 48 },
  { type: 'Hybrid', pct: 38 },
  { type: 'Remote', pct: 14 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Powered Help Desks', icon: <Sparkles size={20} />,
    desc: 'Microsoft Copilot and ServiceNow AI now handle Tier 1 ticket resolution autonomously — password resets, software installs, and basic troubleshooting. IT specialists who understand AI tooling manage these systems rather than being replaced by them.',
    tools: ['Microsoft Copilot', 'ServiceNow AI', 'Freshservice AI', 'Zendesk AI'],
    borderColor: 'rgba(37,99,235,0.18)', bgColor: '#eff6ff', icoBg: 'rgba(37,99,235,0.12)', icoColor: '#2563eb', tagBg: 'rgba(37,99,235,0.1)', tagColor: '#2563eb', titleColor: '#2563eb',
  },
  {
    title: 'AI-Assisted Script Generation', icon: <Zap size={20} />,
    desc: 'GitHub Copilot and Claude generate PowerShell and Bash scripts on demand. IT specialists who use AI to write automation scripts dramatically accelerate infrastructure management — bulk user creation, policy deployment, and compliance reporting in minutes.',
    tools: ['GitHub Copilot', 'Claude', 'PowerShell Copilot', 'Cursor'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'Intelligent Monitoring & AIOps', icon: <TrendingUp size={20} />,
    desc: 'AI monitoring platforms detect anomalies, predict hardware failures, and correlate incidents before users notice them. IT specialists who master AIOps tooling prevent outages rather than just responding to them — a fundamental shift in the role.',
    tools: ['Azure Monitor AI', 'Datadog AIOps', 'Dynatrace', 'SolarWinds AI'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'Microsoft Copilot Administration', 'Zero Trust Network Architecture',
  'Intune / MDM Cloud Management', 'PowerShell 7 & Azure Automation',
  'SIEM Basics (Sentinel, Splunk)', 'Cloud Identity (Entra ID / IAM)',
]

const PROS = [
  { title: 'The Most Accessible Tech Career Entry', desc: 'IT support has a lower barrier to entry than almost any other tech role. CompTIA A+ certification, a home lab, and good communication skills can land you a first job — no degree required.' },
  { title: 'Job Security Everywhere', desc: 'Every company with computers needs IT support. From hospitals to banks to schools — IT support is one of the most stable, universally in-demand roles in the technology sector.' },
  { title: 'The Broadest Tech Foundation', desc: 'IT support exposes you to networking, security, cloud, scripting, and systems administration simultaneously. It builds a broader technical foundation than almost any other entry-level tech role.' },
  { title: 'Clear Paths in Multiple Directions', desc: 'From IT support you can specialise into cybersecurity, cloud engineering, networking, DevOps, or IT management. It is one of the most versatile launching pads in the tech industry.' },
  { title: 'Real Problem-Solving Every Day', desc: 'No two days in IT support are the same. Every ticket is a new puzzle, every user a different communication challenge. The variety is genuinely stimulating for curious, analytical minds.' },
  { title: 'Human Impact is Immediate', desc: 'When you fix someone\'s computer before their important presentation, restore lost data, or get an executive\'s email working again — the gratitude is immediate and the impact is real and personal.' },
]

const CONS = [
  { title: 'Underappreciated Until Things Break', desc: 'IT infrastructure is only noticed when it fails. Great IT support is invisible by design — which means the effort that goes into maintaining reliable systems is often invisible to the business.' },
  { title: 'Repetitive Tier 1 Work', desc: 'Password resets, "have you tried turning it off and on again," and printer troubleshooting can feel relentless in a pure helpdesk role. Moving up the technical ladder requires proactively demonstrating broader skills.' },
  { title: 'On-Call and After-Hours Demands', desc: 'Critical infrastructure failures happen outside business hours. Senior IT specialists and IT managers often carry on-call responsibilities and may need to respond to incidents evenings and weekends.' },
  { title: 'Difficult Users', desc: 'Some users are frustrated, dismissive, or blame IT for problems outside your control. Managing these interactions with professionalism consistently is a genuine emotional labour requirement of the role.' },
  { title: 'Certification Treadmill', desc: 'CompTIA certifications expire every three years. Microsoft certifications change frequently. Staying certified in a fast-moving field requires continuous time and financial investment.' },
  { title: 'Career Ceiling Without Specialisation', desc: 'Generalist IT support has a relatively low salary ceiling. Significant salary growth requires specialising into cloud, security, networking, or management — which demands continuous upskilling beyond helpdesk work.' },
]

const VIDEOS = [
  { id: 'dGhFDfn8SEg', title: 'CompTIA A+ Core 1 Full Course', desc: 'The complete CompTIA A+ Core 1 (220-1101) certification course — covering hardware, networking, mobile devices, virtualisation, and cloud computing fundamentals.', dur: '14:01:45', channel: 'Professor Messer' },
  { id: 'yZn3Z7jEWGI', title: 'Active Directory & Microsoft 365 Full Course', desc: 'Master Active Directory administration, Microsoft 365 setup, Azure AD, Exchange Online, and Group Policy — the essential Microsoft stack for every IT support specialist.', dur: '5:22:10', channel: 'John Savill' },
  { id: 'qiQR5rTSshw', title: 'PowerShell for IT Professionals', desc: 'Learn PowerShell scripting from zero to automation hero — covering cmdlets, pipelines, Active Directory automation, and real-world IT administration scripts.', dur: '3:45:20', channel: 'NetworkChuck' },
]

const TAKEAWAYS = [
  'CompTIA A+ is the global entry credential — earn it before applying for your first IT role, it is widely required',
  'Build a home lab from day one: old laptops, free Hyper-V or VMware, and a cheap managed switch teach more than any course',
  'Learn PowerShell seriously — IT specialists who automate earn 40–60% more than those who do everything manually',
  'Document everything: great ticket notes, runbooks, and SOPs are the difference between a specialist and an indispensable one',
  'Treat every user interaction as a communication skill practice — empathy and clarity separate great IT support from average IT support',
]

/* ─── NEW SECTIONS ────────────────────────────────────────────────────────── */

const CAREER_FACTS = [
  {
    icon: <Monitor size={20} />, title: 'What You Build',
    desc: 'IT infrastructure documentation, user provisioning workflows, automation scripts, knowledge base articles, network diagrams, backup and recovery procedures, and the operational systems that keep organisations running 24/7.',
    color: '#2563eb',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Helpdesk ticket resolution, hardware and software troubleshooting, user account management, network monitoring, patch management, cloud administration, and proactive infrastructure maintenance.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'End users from all departments who depend on IT, HR teams for onboarding and offboarding, management for IT project prioritisation, vendors for hardware and software procurement, and security teams for compliance.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'IT support is one of the most stable roles in technology. Every organisation with digital infrastructure needs IT specialists. Demand is structurally resilient across economic cycles and continues to grow with cloud adoption.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🖥️', title: 'The Most Accessible Tech Career', desc: 'CompTIA A+ certification and a willingness to learn can get you your first IT job — no degree required. It is the most accessible and fastest entry point into a long-term tech career.' },
  { emoji: '💰', title: 'Strong Salary Progression', desc: 'Entry-level IT support is modest, but IT managers and cloud-specialised IT architects earn R1.2M+ in South Africa. The progression is clear, merit-based, and well-defined.' },
  { emoji: '🌍', title: 'Job Security in Every Industry', desc: 'Hospitals, banks, schools, retailers, government — every sector needs IT support. Unemployment risk is exceptionally low compared to other technology roles.' },
  { emoji: '🔧', title: 'Broad Skills, Multiple Exit Paths', desc: 'IT support exposes you to every technology domain — networking, security, cloud, scripting. From here you can transition into cybersecurity, DevOps, cloud engineering, or management.' },
  { emoji: '📈', title: 'Cloud is Transforming the Role', desc: 'IT support specialists who add Azure, Intune, and PowerShell skills are in extraordinary demand as organisations migrate from on-premises infrastructure to cloud platforms.' },
  { emoji: '🤝', title: 'Daily Human Impact', desc: 'Few tech roles have as immediate and visible an impact on real people. Fixing the problem that is blocking someone\'s work, restoring lost data, or keeping critical systems running creates tangible daily satisfaction.' },
]

const FREE_RESOURCES = [
  { category: 'Certifications', color: '#2563eb', bgColor: '#eff6ff', items: [
    { name: 'Professor Messer — CompTIA A+ (free)', url: '#', type: 'Course', rating: 5 },
    { name: 'Microsoft Learn — AZ-900 Path (free)', url: '#', type: 'Course', rating: 5 },
    { name: 'CompTIA CertMaster Learn Trial', url: '#', type: 'Course', rating: 4 },
    { name: 'TryHackMe — Pre-Security Path (free)', url: '#', type: 'Practice', rating: 5 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'Build a home lab (free with old hardware)', url: '#', type: 'Lab', rating: 5 },
    { name: 'TechNet / Microsoft Docs (free)', url: '#', type: 'Reference', rating: 5 },
    { name: 'Spiceworks Community Forum', url: '#', type: 'Community', rating: 4 },
    { name: 'r/sysadmin — learn from the field', url: '#', type: 'Community', rating: 5 },
  ]},
  { category: 'Learning', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'NetworkChuck YouTube Channel', url: '#', type: 'YouTube', rating: 5 },
    { name: 'John Savill Microsoft YouTube', url: '#', type: 'YouTube', rating: 5 },
    { name: 'Practical Networking (free courses)', url: '#', type: 'Course', rating: 5 },
    { name: 'IT Pro TV — Free Trial', url: '#', type: 'Course', rating: 4 },
  ]},
]

const SALARY_DATA = [
  { role: 'IT Support Technician (Tier 1)', range: 'R180k – R320k', midpoint: 250, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'IT Support Specialist (Tier 2)', range: 'R340k – R600k', midpoint: 470, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior IT Specialist / Sysadmin', range: 'R650k – R1.1M', midpoint: 875, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'IT Manager / IT Director', range: 'R1.2M – R2M+', midpoint: 1600, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Treating Every Ticket as Isolated',
    desc: 'Recurring issues that get resolved but never fixed at the root are a waste of everyone\'s time. If you see the same problem three times, there is a systemic cause that needs addressing — not another band-aid.',
    fix: 'For any ticket you resolve more than twice, investigate the root cause and either write a permanent fix script or escalate to infrastructure for a real solution.',
  },
  {
    num: '02', title: 'Never Writing Documentation',
    desc: 'Tribal knowledge that lives only in your head is a business risk and a career ceiling. Teams that don\'t document create bottlenecks, make onboarding new IT staff expensive, and suffer badly during staff turnover.',
    fix: 'Write a knowledge base article for every issue you resolve more than once. Aim to make yourself replaceable — it\'s paradoxically what makes you most valuable.',
  },
  {
    num: '03', title: 'Skipping the Networking Foundation',
    desc: 'Many IT support specialists can reset passwords but can\'t explain why DNS is failing or how DHCP works. Without networking fundamentals, you hit a ceiling that limits every advanced role.',
    fix: 'Study TCP/IP, subnetting, DNS, and DHCP until you can explain them without looking anything up. CompTIA Network+ is the structured path to get there.',
  },
  {
    num: '04', title: 'Avoiding Scripting and Automation',
    desc: 'IT specialists who do everything manually are slow, inconsistent, and increasingly less employable. Every task you repeat more than ten times should be automated — or someone else will, and they will earn more for it.',
    fix: 'Learn PowerShell basics in your first year. Automate your most repetitive task — even if it\'s just creating users or resetting profiles. Build the habit early.',
  },
  {
    num: '05', title: 'Ignoring Cloud Platforms',
    desc: 'On-premises infrastructure is declining. Companies are migrating to Azure, Microsoft 365, and AWS. IT specialists who have no cloud skills are increasingly competing for a shrinking pool of legacy-environment jobs.',
    fix: 'Start with AZ-900 (Azure Fundamentals) — it\'s the fastest, cheapest way to demonstrate cloud credibility. Then add M365 administration and Intune MDM to your skill set.',
  },
  {
    num: '06', title: 'Poor Communication with Users',
    desc: 'Technical accuracy without communication skill is insufficient in IT support. Users who feel dismissed, confused, or talked down to become negative stakeholders — escalating small issues and damaging the IT team\'s reputation.',
    fix: 'Practice plain-language explanations for every technical issue you resolve. Never use acronyms without explaining them. Follow up after resolutions to confirm satisfaction.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Retail / Customer Service',
    ease: 'Natural Fit', easeColor: '#2563eb', easeBg: '#eff6ff',
    desc: 'Your customer communication skills, patience under pressure, and problem-solving experience translate directly to Tier 1 IT support. Add CompTIA A+ and a home lab, and you have everything needed for a first IT role.',
    steps: ['Study CompTIA A+ with Professor Messer (free)', 'Build a basic home lab with an old PC and free Hyper-V', 'Sit the CompTIA A+ exam and add to your CV', 'Apply to Tier 1 helpdesk and IT support technician roles'],
  },
  {
    from: 'Office / Administrative Background',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'You already understand how businesses use technology from a user perspective. Adding IT fundamentals and certification gives you a uniquely empathetic IT specialist who understands both the user side and the technical side.',
    steps: ['Complete CompTIA A+ Core 1 and Core 2', 'Learn Microsoft 365 admin via Microsoft Learn (free)', 'Practise Active Directory in a home lab', 'Target IT support roles at companies in your previous industry'],
  },
  {
    from: 'Telecommunications / ISP Technician',
    ease: 'Very Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Networking fundamentals, cable infrastructure, and customer-facing technical work are deeply transferable. Add Windows administration and Microsoft 365 skills and you can move into a corporate IT specialist role relatively quickly.',
    steps: ['Add CompTIA Network+ to formalise your networking knowledge', 'Learn Windows Server and Active Directory administration', 'Study Microsoft 365 and Azure fundamentals', 'Target IT Specialist or sysadmin roles in enterprise environments'],
  },
  {
    from: 'Other Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'IT support is one of the most accessible career pivots into tech. Domain expertise from your previous career — healthcare, logistics, finance — makes you a more effective IT specialist in those industries and helps you get hired faster.',
    steps: ['Start with Professor Messer CompTIA A+ (completely free)', 'Build a home lab and practise real troubleshooting', 'Sit CompTIA A+ and list it prominently on your CV', 'Target entry-level helpdesk roles in your previous industry vertical'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Hardware & OS Fundamentals', color: '#2563eb', bg: '#eff6ff', days: [
    { day: 'Day 1–2', task: 'Download Professor Messer\'s CompTIA A+ study guide. Study PC components: CPU, RAM, storage types, motherboard, PSU. Draw and label a PC diagram from memory.' },
    { day: 'Day 3–4', task: 'Install Windows 10 and Windows 11 in VirtualBox (free). Practise navigation, settings, Control Panel, and basic administration tasks.' },
    { day: 'Day 5–6', task: 'Create a free ServiceNow Personal Developer Instance. Log 5 fictitious support tickets. Practice triage, assignment, and resolution notes.' },
    { day: 'Day 7', task: 'Study IP addressing: IPv4 vs IPv6, subnets, default gateways, DNS, and DHCP. Practice subnetting with online tools until you can calculate subnet masks confidently.' },
  ]},
  { week: 'Week 2', theme: 'Networking & Microsoft 365', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Set up a free Microsoft 365 Developer tenant. Create 5 user accounts, assign licences, configure mailboxes, and set a custom domain.' },
    { day: 'Day 10–11', task: 'Install Windows Server 2022 Evaluation (free) in VirtualBox. Promote it to a Domain Controller. Create OUs, groups, and users in Active Directory.' },
    { day: 'Day 12–13', task: 'Create Group Policy Objects: password policy, desktop wallpaper, and software restriction. Apply to an OU. Confirm with gpresult /r.' },
    { day: 'Day 14', task: 'Run ipconfig, nslookup, ping, tracert, and netstat on your lab VMs. Document what each command tells you and when you would use it.' },
  ]},
  { week: 'Week 3', theme: 'PowerShell & Cloud', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Open PowerShell ISE. Learn Get-Command, Get-Help, and the pipeline. Write a script that exports all Active Directory users to a CSV file.' },
    { day: 'Day 17–18', task: 'Write a PowerShell onboarding script: creates a new user, sets a password, adds to a group, and creates a home folder.' },
    { day: 'Day 19–20', task: 'Create a free Azure account. Deploy a Windows virtual machine. Connect via RDP. Explore the Azure portal: resource groups, storage, and networking.' },
    { day: 'Day 21', task: 'Start AZ-900 study on Microsoft Learn. Complete Module 1: Cloud Concepts. Take the practice test and identify gaps to address in week 4.' },
  ]},
  { week: 'Week 4', theme: 'Security & Apply', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Study CompTIA Security+ Domains 1 and 2 using Professor Messer. Understand authentication types, encryption basics, and common attack vectors.' },
    { day: 'Day 25–26', task: 'Install Wireshark. Capture network traffic in your home lab. Identify DNS queries, HTTP requests, and DHCP exchanges in the capture.' },
    { day: 'Day 27–28', task: 'Write a 2-page IT support portfolio document: your home lab setup, skills practised, tools used, and problems solved. Add to GitHub and LinkedIn.' },
    { day: 'Day 29–30', task: 'Register for CompTIA A+ exam. Apply to 5 IT support roles. Reach out to one IT professional on LinkedIn for a 15-minute informational chat.' },
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
      try { await navigator.share({ title: 'IT Support Specialist Career Roadmap 2026', text: 'Complete step-by-step roadmap to become an IT Support Specialist in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/it-support-specialist'}</span>
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

export default function ITSupportSpecialistRoadmapPage() {
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
            src="https://i.imgur.com/LmCPx9H.jpeg"
            alt="IT Support Specialist at help desk"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Monitor size={12} /> Infrastructure & Support
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                IT Support Specialist
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
            Keep the world working. IT Support Specialists maintain the hardware, networks, and systems that every organisation depends on — the most accessible, most in-demand, and most diverse launchpad into a lifelong technology career.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of IT Support" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#eff6ff', borderColor: 'rgba(37,99,235,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                An <strong style={{ color: C.primary }}>IT Support Specialist</strong> is the person who keeps every organisation's technology running. From resolving helpdesk tickets and managing user accounts to administering servers, cloud platforms, and network infrastructure — IT support specialists are the operational backbone of digital business. It is the most accessible entry into a tech career and one of the broadest in scope.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons IT Support could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical IT Support Specialist workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,99,235,0.3)'; (e.currentTarget as HTMLElement).style.background = '#eff6ff' }}
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Technician → IT Director</span></div>
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
              const icons = ['🖥️', '🌐', '☁️', '⚡', '🏗️', '🔒']
              const accentColors = ['#2563eb', '#16a34a', '#2563eb', '#16a34a', '#2563eb', '#16a34a']
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.indigo} 100%)`, boxShadow: '0 8px 48px rgba(37,99,235,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>6–12 months · Consistent daily practice · Home lab + certification</div>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming IT Support in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#eff6ff', borderColor: 'rgba(37,99,235,0.2)', color: C.textMuted }}>
              AI tools don't replace IT specialists — they <em style={{ color: C.primary }}>amplify</em> them. IT professionals who understand and manage AI helpdesk tools, use Copilot for automation, and deploy AIOps monitoring become significantly more valuable than those who resist these technologies.
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Cloud-specialised IT architects and IT directors at large organisations can exceed R2M+.</p>
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
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#eff6ff', borderColor: 'rgba(37,99,235,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> IT specialists who add Azure and PowerShell skills earn 30–50% more than generalist helpdesk engineers. Specialising into cloud, security, or networking dramatically accelerates salary growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring IT specialists" iconBg={C.orangeLight} iconColor={C.orange} />
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
                IT support is <strong style={{ color: C.primary }}>the most accessible door into the technology industry</strong>. It asks less of you upfront than any other tech career — and gives you back more in breadth of knowledge, career options, and human impact than almost any other starting point.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The IT specialists who grow into IT managers, cloud architects, and cybersecurity professionals are not the ones who waited for their employer to train them. They are the ones who built home labs, earned certifications in their own time, and treated every ticket as an opportunity to understand the system a little better.
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to download Professor Messer and build your first home lab.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              Get Career Advice
            </a>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start learning today. Your future self will thank you.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}