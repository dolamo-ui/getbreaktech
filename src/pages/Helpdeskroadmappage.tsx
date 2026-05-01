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
   Shield,
  Workflow, Headphones, Wrench, Radio, PhoneCall,
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
  primary: '#0369a1',          // support blue — IT support brand colour
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
    level: 'Junior', title: 'Help Desk Technician', duration: '0–2 yrs', salary: 'R160k–R290k',
    description: 'Handle Tier 1 support tickets, troubleshoot hardware and software issues, reset passwords, and escalate complex problems. Learn ticketing systems and ITIL basics.',
    skills: ['Windows OS', 'Ticketing Tools', 'Basic Networking', 'Active Directory'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'IT Support Specialist', duration: '2–5 yrs', salary: 'R290k–R540k',
    description: 'Own Tier 2 escalations, manage endpoints at scale, configure network equipment, support cloud tools (Microsoft 365, Google Workspace), and mentor junior staff.',
    skills: ['Microsoft 365', 'ITIL Foundation', 'Network Config', 'MDM / Intune'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Service Desk Analyst', duration: '5–8 yrs', salary: 'R540k–R900k',
    description: 'Drive SLA compliance, lead incident and problem management, design knowledge base processes, and build automation that reduces ticket volume. Technical escalation lead.',
    skills: ['ITIL Advanced', 'PowerShell', 'SIEM Basics', 'Process Design'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'IT Support Manager', duration: '8+ yrs', salary: 'R900k+',
    description: 'Lead the support function, define IT service strategy, manage vendor relationships, implement ITSM platforms, and align IT operations with business objectives.',
    skills: ['ITSM Strategy', 'Team Leadership', 'Budget Mgmt', 'ITIL Expert'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'IT Fundamentals & Operating Systems',
    description: 'Build a solid base in how computers work. Learn Windows 10/11 administration inside out — installation, user accounts, Group Policy, file systems, and troubleshooting. Supplement with macOS and Linux basics. CompTIA A+ is the gold-standard certification for this stage and is widely recognised by employers.',
    duration: '2–3 months', skills: ['Windows 10/11', 'macOS Basics', 'Linux CLI', 'CompTIA A+'],
  },
  {
    step: 2, title: 'Networking Essentials',
    description: 'Every support call eventually becomes a network problem. Learn TCP/IP, DNS, DHCP, subnetting, VLANs, Wi-Fi troubleshooting, and VPN concepts. Understand the OSI model at a practical level. CompTIA Network+ validates these skills and is required or preferred at most IT departments.',
    duration: '2–3 months', skills: ['TCP/IP & DNS', 'Subnetting', 'Wi-Fi & VPN', 'CompTIA Network+'],
  },
  {
    step: 3, title: 'Active Directory, M365 & Identity',
    description: 'Enterprise IT runs on Microsoft. Learn Active Directory — user and group management, OUs, Group Policy Objects, and domain structure. Then master Microsoft 365 administration: Exchange Online, Teams, SharePoint, and Intune for device management. These skills appear in nearly every job description.',
    duration: '2–3 months', skills: ['Active Directory', 'Microsoft 365', 'Intune / MDM', 'Azure AD'],
  },
  {
    step: 4, title: 'ITIL, Ticketing & Service Management',
    description: 'IT support is a professional service, not just fixing computers. Learn ITIL 4 — incident, problem, change, and service request management. Get hands-on with a ticketing system (ServiceNow, Jira Service Management, or Freshdesk). Study SLA management and how to write knowledge base articles that reduce repeat tickets.',
    duration: '1–2 months', skills: ['ITIL 4 Foundation', 'ServiceNow / Jira', 'SLA Management', 'Knowledge Mgmt'],
  },
  {
    step: 5, title: 'Security Fundamentals & Endpoint Protection',
    description: 'Security is inseparable from IT support. Learn how to identify phishing attempts, configure Windows Defender and endpoint protection tools, manage BitLocker encryption, apply patches, and respond to a basic security incident. CompTIA Security+ is the entry-point certification into cybersecurity-adjacent IT roles.',
    duration: '2–3 months', skills: ['CompTIA Security+', 'Endpoint Protection', 'Patch Management', 'Incident Response'],
  },
  {
    step: 6, title: 'Scripting, Automation & Cloud',
    description: 'Senior support professionals automate repetitive tasks. Learn PowerShell to script Active Directory operations, user onboarding, and reporting. Add basics of Azure or AWS for cloud-hosted infrastructure support. Automation skills dramatically differentiate you from peers and open paths into sysadmin and cloud engineering roles.',
    duration: '3–4 months', skills: ['PowerShell', 'Azure Fundamentals', 'Automation Scripts', 'Cloud Basics'],
  },
]

const HARD_SKILLS = [
  { name: 'Windows OS Administration', level: 95 },
  { name: 'Microsoft 365 & Azure AD', level: 93 },
  { name: 'Networking & TCP/IP', level: 88 },
  { name: 'Active Directory & GPO', level: 85 },
  { name: 'ITIL / ITSM Processes', level: 82 },
  { name: 'Security & Endpoint Protection', level: 75 },
  { name: 'PowerShell Scripting', level: 68 },
  { name: 'Cloud Platforms (Azure/AWS)', level: 60 },
]

const SOFT_SKILLS = [
  { name: 'Empathetic Communication', description: 'Users are often stressed when they call support. The ability to listen patiently, explain technical concepts in plain language, and make the person feel heard is what separates great support from merely functional support.' },
  { name: 'Calm Under Pressure', description: 'Major outages affect hundreds of people simultaneously. The support professional who stays methodical, communicates clearly, and works the problem without panicking is irreplaceable during incidents.' },
  { name: 'Systematic Troubleshooting', description: 'The best IT support people don\'t guess — they eliminate variables. A disciplined, hypothesis-driven approach to diagnosis gets to root causes faster and prevents repeat calls on the same issue.' },
  { name: 'Documentation Discipline', description: 'Every ticket is an opportunity to create institutional knowledge. Support professionals who document problems and solutions thoroughly build the knowledge base that makes the whole team faster over time.' },
  { name: 'Customer Service Mindset', description: 'IT support is a service. Treating users as internal customers — not as interruptions — builds trust, improves response quality, and makes you the person people actually want to call when things break.' },
  { name: 'Continuous Self-Learning', description: 'Technology changes faster than any job description can capture. The best support professionals are perpetually curious — studying for the next cert, testing new tools in a home lab, and following IT news to stay ahead.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'IT / Computer Science Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(3,105,161,0.2)', bgColor: '#eff6ff', typeBg: 'rgba(3,105,161,0.12)', typeColor: '#0369a1',
    pros: ['Deepest theoretical foundation', 'Opens doors to management and specialisation faster', 'Graduate schemes at large corporates and banks', 'Strong peer network of future IT professionals'],
    cons: ['Slow and expensive path to first salary', 'Practical hands-on lab time is limited', 'Many grads still need certifications to get hired', 'IT support roles rarely require a degree at entry level'],
  },
  {
    type: 'Certifications', title: 'CompTIA A+ → Network+ → Security+', duration: '6–18 months', cost: 'R15k – R60k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Vendor-neutral, globally recognised credentials', 'Directly maps to job descriptions and hiring filters', 'Much faster and cheaper than a degree', 'CompTIA A+ is explicitly required by many help desk roles'],
    cons: ['Exams require dedicated study and exam fees', 'Credentials alone don\'t replace hands-on lab practice', 'Need to be renewed every 3 years via CEUs', 'Won\'t replace leadership experience for management roles'],
  },
  {
    type: 'Self-Taught', title: 'Home Lab + Free Courses', duration: '12–24 months', cost: 'R2k – R10k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['Build real skills on real hardware', 'Microsoft Learn and Google IT Support cert are free/cheap', 'Immediate hands-on practice with no waiting', 'Home lab experience impresses interviewers who test practically'],
    cons: ['No formal credential on CV without separate exam', 'Requires significant self-discipline and structure', 'Knowledge gaps can be dangerous without structured curriculum', 'Harder to demonstrate competence without certification'],
  },
]

const SCHEDULE = [
  { time: '8:00', act: 'Queue Triage & Priority Setting', desc: 'Review the overnight ticket queue, identify P1/P2 incidents, assign team members to urgent items and communicate status to affected users before business starts', duration: '30 min', icon: <PhoneCall size={14} /> },
  { time: '8:30', act: 'Active Incident Resolution', desc: 'Work through priority tickets — remote desktop sessions, on-site hardware swaps, account provisioning, software licensing issues, and connectivity problems', duration: '3 hrs', icon: <Wrench size={14} /> },
  { time: '11:30', act: 'Escalation & Vendor Follow-up', desc: 'Escalate unresolved Tier 2 issues to sysadmin or vendor support, follow up on outstanding hardware replacements and software licences, update users on ETA', duration: '30 min', icon: <Radio size={14} /> },
  { time: '12:00', act: 'Lunch & Recovery', desc: 'Step away from the screen. Complex technical problems benefit from a mental reset — some of the best diagnostic insights arrive after a proper break', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '1:00', act: 'Knowledge Base & Documentation', desc: 'Write up solutions for recurring issues, update runbooks, improve existing KB articles, and document this morning\'s unusual fixes before the context is lost', duration: '1 hr', icon: <FileText size={14} /> },
  { time: '2:00', act: 'Proactive Maintenance & Projects', desc: 'Run patch deployments, update endpoint agents, work on ongoing IT projects (e.g., hardware refresh, Office 365 migration), or build automation scripts for repetitive tasks', duration: '1.5 hrs', icon: <Shield size={14} /> },
  { time: '3:30', act: 'Learning & Certification Study', desc: 'Work through CompTIA study material, practise PowerShell scripts in the home lab, complete a Microsoft Learn module, or test a new tool in a sandbox environment', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'ServiceNow / Jira SM', cat: 'Ticketing' }, { name: 'Microsoft Intune', cat: 'MDM' },
  { name: 'Active Directory', cat: 'Identity' }, { name: 'TeamViewer / AnyDesk', cat: 'Remote' },
  { name: 'Microsoft 365 Admin', cat: 'Cloud' }, { name: 'Wireshark', cat: 'Network' },
  { name: 'PowerShell ISE', cat: 'Scripting' }, { name: 'Windows Defender', cat: 'Security' },
]

const WORK_ENVS = [
  { type: 'In-Office / On-Site', pct: 52 },
  { type: 'Hybrid', pct: 37 },
  { type: 'Fully Remote', pct: 11 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Assisted Ticket Resolution', icon: <Sparkles size={20} />,
    desc: 'AI tools like Copilot for Microsoft 365 and ServiceNow\'s Now Assist auto-suggest resolutions based on ticket content, prior solutions, and knowledge base articles. Support teams using AI report 40–60% faster Tier 1 resolution times and significantly lower escalation rates.',
    tools: ['Copilot for M365', 'ServiceNow AI', 'Freshdesk AI', 'Zendesk AI'],
    borderColor: 'rgba(3,105,161,0.18)', bgColor: '#eff6ff', icoBg: 'rgba(3,105,161,0.12)', icoColor: '#0369a1', tagBg: 'rgba(3,105,161,0.1)', tagColor: '#0369a1', titleColor: '#0369a1',
  },
  {
    title: 'Intelligent Automation & Self-Service', icon: <Zap size={20} />,
    desc: 'IT support professionals who can build AI-powered chatbots, configure automated provisioning workflows, and connect ITSM platforms to automation tools (Power Automate, Zapier) are in a completely different demand tier in 2026.',
    tools: ['Power Automate', 'Microsoft Copilot Studio', 'Zapier', 'Azure Logic Apps'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI-Powered IT Monitoring', icon: <TrendingUp size={20} />,
    desc: 'AIOps platforms now detect infrastructure anomalies, predict hardware failures before they impact users, and auto-route tickets based on historical patterns. Understanding these tools makes you a force multiplier for your entire IT team.',
    tools: ['Microsoft Sentinel', 'Datadog', 'SolarWinds AI', 'PagerDuty AIOps'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'Microsoft Copilot Administration', 'Power Automate & Low-Code Workflows',
  'Zero Trust Network Access (ZTNA)', 'Azure Virtual Desktop Support',
  'AI Chatbot Configuration (Copilot Studio)', 'AIOps & Predictive Monitoring',
]

const PROS = [
  { title: 'Always in Demand — Everywhere', desc: 'Every organisation with computers needs IT support. Hospitals, banks, schools, government, retail — the demand is universal, recession-resistant, and geographically distributed across every city in South Africa.' },
  { title: 'The Fastest Entry into IT', desc: 'Help desk is the most accessible entry point into the technology industry. CompTIA A+ certification and a few months of study can land your first role — no degree required at entry level.' },
  { title: 'Exposure to the Entire IT Stack', desc: 'No other role gives you broader exposure faster. In a single week, a help desk technician might touch networking, identity management, cloud apps, hardware, security, and backup systems.' },
  { title: 'Clear Paths to Specialisation', desc: 'IT support is a launchpad, not a ceiling. From here, experienced technicians branch into sysadmin, network engineering, cybersecurity, cloud architecture, or IT management — with every path well-marked.' },
  { title: 'Strong Job Security', desc: 'Unlike many tech roles, IT support cannot be fully offshored or replaced by software. On-site hardware, physical network infrastructure, and user relationships require a local, trusted human presence.' },
  { title: 'Fast Skill Development', desc: 'The variety of problems encountered in support accelerates learning faster than almost any other tech role. In two years you\'ll have solved more edge cases than most developers see in five.' },
]

const CONS = [
  { title: 'Emotionally Demanding Work', desc: 'Supporting frustrated users who can\'t work, managing an overflowing ticket queue, and being the first person blamed when systems fail takes a toll. Emotional resilience is as important as technical skill.' },
  { title: 'Compensation Ceiling at Tier 1', desc: 'Entry-level help desk roles are among the lower-paid positions in IT. Breaking through to R400k+ requires active upskilling, certifications, and movement into specialist or senior roles.' },
  { title: 'Repetitive Ticket Fatigue', desc: 'Password resets, "my printer isn\'t working," and Outlook crashes account for a large percentage of tickets. Without deliberate variety and growth goals, the work can become monotonous.' },
  { title: 'On-Site Requirements', desc: 'Unlike backend or development roles, much IT support still requires physical presence. Hardware replacements, cabling, server room access, and in-person user support mean remote work is limited compared to other tech fields.' },
  { title: 'Underappreciated Until It Breaks', desc: 'IT support is invisible when it works and immediately visible when it fails. Getting credit for preventing 300 incidents is harder than being blamed for the one that gets through. This is the reality of a support culture.' },
  { title: 'Credential Treadmill', desc: 'Technology evolves quickly and certifications expire. Staying current in Microsoft, CompTIA, and cloud platforms requires ongoing study investment — both time and money — throughout your career.' },
]

const VIDEOS = [
  { id: 'G7V2nqFRojA', title: 'CompTIA A+ Core 1 Full Course', desc: 'Complete preparation for the CompTIA A+ 220-1101 exam covering hardware, networking, and troubleshooting — the foundational certification for IT support professionals.', dur: '14:08:00', channel: 'Professor Messer' },
  { id: 'qiQR5rTSshw', title: 'Google IT Support Professional Certificate', desc: 'Google\'s fully free IT support training program covering technical support fundamentals, networking, operating systems, system administration, and IT security.', dur: '6:32:00', channel: 'Google / Coursera' },
  { id: 'ynbHdHrU5gs', title: 'CompTIA Network+ Full Course', desc: 'Complete Network+ study guide covering network infrastructure, protocols, troubleshooting, and security — essential for anyone moving beyond Tier 1 support.', dur: '12:16:00', channel: 'Professor Messer' },
]

const TAKEAWAYS = [
  'Certifications open doors — CompTIA A+, Network+, and Security+ are worth every hour of study and every rand of exam fees',
  'Build a home lab on spare hardware or free Azure credits — practical troubleshooting experience you created yourself impresses interviewers more than anything on paper',
  'Every ticket is a teaching moment: document your solutions well enough that your past self could have solved the problem faster with them',
  'Learn PowerShell early — a support professional who can automate 20 minutes of daily manual work is immediately more valuable than one who cannot',
  'Treat every user interaction as a service experience, not a technical problem — the reputation you build with users is your most transferable career asset',
]

/* ─── NEW SECTIONS ─────────────────────────────────────────────────────────── */

const CAREER_FACTS = [
  {
    icon: <Headphones size={20} />, title: 'What You Do',
    desc: 'Diagnose and resolve hardware, software, and network issues. Manage user accounts and permissions, deploy and configure devices, handle IT service requests, and keep systems running so the business never stops.',
    color: '#0369a1',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Ticket management and prioritisation, remote and on-site troubleshooting, OS and application support, account and identity management, endpoint deployment, patch management, knowledge base creation, and user training.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Support',
    desc: 'Every employee in the organisation — from the CEO who can\'t connect to a Teams meeting to the accountant whose VPN won\'t authenticate. You are the human face of technology and the bridge between IT infrastructure and every user.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'IT support is one of the most consistently in-demand roles in South Africa. Every sector — banking, healthcare, retail, education, mining, and government — employs IT support staff. Demand grew 18% in 2024 alone.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🚪', title: 'The Best Door into IT', desc: 'Help desk is where thousands of successful IT careers begin. Network engineers, cloud architects, and CISOs often started here. It is the most accessible, fastest, and lowest-barrier entry point into a technology career.' },
  { emoji: '💼', title: 'Hire-Ready in Months, Not Years', desc: 'A CompTIA A+ certification and three months of focused study can get you your first interview. No four-year degree required. IT support is one of the few fields where demonstrated competence beats paper qualifications at entry level.' },
  { emoji: '🌐', title: 'The Widest Industry Exposure', desc: 'Support touches every part of the IT stack — networking, identity, security, cloud, hardware, and software. You\'ll understand how technology really works in ways most specialists never do.' },
  { emoji: '🔐', title: 'Security Skills Are Table Stakes', desc: 'In 2026, every IT support role has a security component. You\'re the front line of phishing defence, the person who spots the compromised account, and the one who enforces password and device policies. This makes you essential.' },
  { emoji: '📈', title: 'Multiple Paths Forward', desc: 'From help desk you can go into sysadmin, network engineering, cybersecurity, cloud, or IT management. This role is not a dead end — it is a crossroads with clearly signed paths to six-figure careers.' },
  { emoji: '🤝', title: 'You Make a Real Difference Daily', desc: 'When you fix someone\'s laptop so they can present to a client, recover a corrupted file they worked on all week, or restore email during a crisis — you\'ve made a tangible, immediate difference to a real person\'s day.' },
]

const FREE_RESOURCES = [
  { category: 'Certifications', color: '#0369a1', bgColor: '#eff6ff', items: [
    { name: 'Professor Messer — CompTIA A+ (free video course)', url: '#', type: 'Video', rating: 5 },
    { name: 'Google IT Support Professional Cert (Coursera)', url: '#', type: 'Course', rating: 5 },
    { name: 'Microsoft Learn — M365 & Azure fundamentals', url: '#', type: 'Docs', rating: 5 },
    { name: 'CompTIA CertMaster Practice (paid, worth it)', url: '#', type: 'Practice', rating: 5 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'TryHackMe — IT fundamentals & security labs', url: '#', type: 'Lab', rating: 5 },
    { name: 'Microsoft Learn sandbox environments (free)', url: '#', type: 'Lab', rating: 5 },
    { name: 'Build a home lab with old hardware or VMs', url: '#', type: 'Project', rating: 5 },
    { name: 'r/ITCareerQuestions study guides', url: '#', type: 'Forum', rating: 4 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'NetworkChuck YouTube Channel', url: '#', type: 'YouTube', rating: 5 },
    { name: 'r/sysadmin & r/helpdesk communities', url: '#', type: 'Forum', rating: 5 },
    { name: 'Darknet Diaries Podcast (security stories)', url: '#', type: 'Podcast', rating: 5 },
    { name: 'ITIL 4 Foundation Study Guide (free PDF)', url: '#', type: 'Book', rating: 4 },
  ]},
]

const SALARY_DATA = [
  { role: 'Help Desk Technician (Tier 1)', range: 'R160k – R290k', midpoint: 225, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'IT Support Specialist (Tier 2)', range: 'R290k – R540k', midpoint: 415, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Service Desk Analyst / Senior', range: 'R540k – R900k', midpoint: 720, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'IT Support Manager / Team Lead', range: 'R900k – R1.5M+', midpoint: 1150, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Staying at Tier 1 Without Studying for Certs',
    desc: 'Many technicians spend years in Tier 1 without progressing because they never formalise their skills with certifications. CompTIA A+ and Network+ are the explicit signal employers look for to promote to Tier 2 and beyond.',
    fix: 'Set a certification target date within 90 days of starting your first role. Study 30 minutes per day minimum, without exception.',
  },
  {
    num: '02', title: 'Treating Documentation as Optional',
    desc: 'Solving the same problem four times because it was never documented wastes hours every week. Undocumented solutions exist only in one person\'s head — and walk out the door when they leave.',
    fix: 'Write a KB article for every novel problem you solve. If it took more than 20 minutes to diagnose, document it. No exceptions.',
  },
  {
    num: '03', title: 'Skipping the Networking Foundation',
    desc: 'Most complex support issues — slow applications, connectivity failures, VPN problems, cloud service disruptions — have a network root cause. Technicians who can\'t read a ping output or trace a route are fundamentally limited.',
    fix: 'Study subnetting until you can do it in your head. Complete Cisco\'s free NetAcad Networking Basics course alongside your A+ studies.',
  },
  {
    num: '04', title: 'Never Learning PowerShell',
    desc: 'Manually resetting 50 passwords or onboarding 30 users one by one is a wasted afternoon. A single PowerShell script does it in five minutes. Technicians without scripting skills hit a hard ceiling in any Microsoft environment.',
    fix: 'Automate one repetitive task per month using PowerShell. Start with bulk user creation or automated disk space reporting.',
  },
  {
    num: '05', title: 'Neglecting the User Relationship',
    desc: 'IT support professionals who are technically brilliant but dismissive or impatient with users destroy team trust. The "I don\'t do hand-holding" attitude is career-limiting in any support function.',
    fix: 'Treat every ticket as if a senior manager will read your notes later. Write updates in plain English. Follow up on closed tickets the next day.',
  },
  {
    num: '06', title: 'Working Without a Home Lab',
    desc: 'Reading about Active Directory is not the same as breaking it and fixing it. Technicians with home lab experience solve unfamiliar problems faster and interview far better than those who only know production environments.',
    fix: 'Build a free lab using VirtualBox and Windows Server evaluation images. Spend two hours per week deliberately breaking and fixing things.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Customer Service / Call Centre',
    ease: 'Natural Fit', easeColor: '#0369a1', easeBg: '#eff6ff',
    desc: 'You already have the most underrated skill in IT support: dealing with frustrated people calmly and professionally. Add the technical layer — A+ certification and a home lab — and you transition more smoothly than most.',
    steps: ['Study CompTIA A+ (3–4 months of focused prep)', 'Build a free home lab with VirtualBox + Windows Server eval', 'Apply for Tier 1 help desk roles emphasising your customer skills', 'Earn Network+ within your first year to accelerate to Tier 2'],
  },
  {
    from: 'General IT / Tech Hobbyist',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'If you\'ve been building PCs, fixing family members\' computers, or tinkering with routers for fun — you have more practical experience than most candidates. Certify what you already know and document your lab work for interviews.',
    steps: ['Convert your hobby experience into CompTIA A+ certification', 'Add structured enterprise skills: Active Directory, M365, Intune', 'Build a home lab simulating an enterprise environment', 'Target SME IT support roles where breadth beats depth'],
  },
  {
    from: 'Business / Administrative Role',
    ease: 'Very Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Business acumen combined with IT skills is genuinely rare and valued in service desk management. Your understanding of how the business works — priorities, stakeholders, impact — makes you an unusually effective IT support professional.',
    steps: ['Start with the Google IT Support Professional Certificate', 'Study for CompTIA A+ while working in your current role', 'Volunteer as informal IT contact in your current workplace', 'Apply to IT support roles in your current industry vertical'],
  },
  {
    from: 'Other Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Domain expertise from healthcare, finance, legal, or education combined with IT support skills is extremely valuable in those verticals. Healthcare IT support, for example, pays a significant premium over general help desk roles.',
    steps: ['Complete the Google IT Support Certificate (free/cheap)', 'Study A+ and N+ using Professor Messer\'s free courses', 'Target IT support roles in your previous industry', 'Leverage your domain knowledge as a differentiator in interviews'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Foundation & Setup', color: '#0369a1', bg: '#eff6ff', days: [
    { day: 'Day 1–2', task: 'Install VirtualBox. Set up a Windows 10 VM and a Windows Server 2019 eval VM. Get comfortable with the interface.' },
    { day: 'Day 3–4', task: 'Begin Professor Messer\'s free CompTIA A+ Core 1 video series. Complete the hardware and components modules.' },
    { day: 'Day 5–6', task: 'Configure a free ServiceNow Developer Instance or set up a Freshdesk free trial. Create your first mock tickets.' },
    { day: 'Day 7', task: 'Research local IT support job listings. Identify the 5 most common tools and requirements in your target market.' },
  ]},
  { week: 'Week 2', theme: 'OS & Networking', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Windows Server lab: install Active Directory Domain Services, promote to domain controller, create 10 test users.' },
    { day: 'Day 10–11', task: 'Networking fundamentals: study subnetting using the subnettingpractice.com tool. Do 30 minutes of subnetting drills per day.' },
    { day: 'Day 12–13', task: 'Install Wireshark. Capture and analyse a DNS lookup, a ping, and a web page load. Understand what you\'re seeing.' },
    { day: 'Day 14', task: 'CompTIA A+ Core 1 mock exam. Target 75%+. Identify knowledge gaps and revisit the weak sections.' },
  ]},
  { week: 'Week 3', theme: 'Cloud & Identity', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Create a free Microsoft 365 developer tenant. Set up users, assign licences, configure MFA. Simulate a real onboarding.' },
    { day: 'Day 17–18', task: 'Complete the Microsoft Learn "Azure Fundamentals" learning path (AZ-900). It\'s free and takes about 10 hours.' },
    { day: 'Day 19–20', task: 'Begin PowerShell: write scripts to create AD users in bulk, list all computers in the domain, and check disk space.' },
    { day: 'Day 21', task: 'ITIL 4 Foundation overview: watch the free YouTube overview by AXELOS. Understand the core concepts and vocabulary.' },
  ]},
  { week: 'Week 4', theme: 'Polish & Apply', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Build your IT support portfolio: document 3 lab scenarios with screenshots, problem descriptions, and step-by-step resolutions.' },
    { day: 'Day 25–26', task: 'Rewrite your CV with IT language. List your home lab setup, tools used, and the specific skills you\'ve demonstrated.' },
    { day: 'Day 27–28', task: 'Book your CompTIA A+ Core 1 exam date. Having a real target date forces productive study. Schedule Core 2 for 6 weeks after.' },
    { day: 'Day 29–30', task: 'Apply to 5 junior IT support or help desk roles. Customise each CV. Follow up with a connection request to the hiring manager on LinkedIn.' },
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

/* ─── SHARE BAR ─────────────────────────────────────────────────────────────── */
function ShareBar() {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }
  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'Help Desk & IT Support Career Roadmap 2026', text: 'Complete step-by-step roadmap to become an IT Support Specialist in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/help-desk-it-support'}</span>
      </div>
    </div>
  )
}

/* ─── SECTION HEADER ──────────────────────────────────────────────────────── */
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
export default function HelpDeskITSupportRoadmapPage() {
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
            src="https://i.imgur.com/6rBm8j5.jpeg"
            alt="IT Support technician at service desk"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.45) brightness(1.1) hue-rotate(190deg)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Headphones size={12} /> Customer IT Support & Service Desk
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Help Desk & IT Support
              </h1>
              <span className="block font-normal mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', color: C.textMuted }}>
                Career Roadmap 2026 — Technician · Specialist · Analyst · Manager
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
            Be the person who keeps every organisation running. IT support professionals solve real problems for real people every day — and use that experience as the launchpad to every specialisation in technology.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The roles, responsibilities, and scope of IT Support" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#eff6ff', borderColor: 'rgba(3,105,161,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                <strong style={{ color: C.primary }}>IT Support & Help Desk professionals</strong> are the operational backbone of every technology-dependent organisation. Whether operating as a Help Desk Technician handling first-call resolution, an IT Support Specialist owning complex escalations, a Service Desk Analyst driving process improvement, or a Customer IT Support Engineer building long-term user relationships — these roles ensure that technology serves people, not the other way around.
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical IT Support professional's workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(3,105,161,0.3)'; (e.currentTarget as HTMLElement).style.background = '#eff6ff' }}
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
              const icons = ['💻', '🌐', '🏢', '📋', '🔐', '⚡']
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
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>8–12 months · Consistent daily study · Certify as you learn</div>
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
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#eff6ff', borderColor: 'rgba(3,105,161,0.2)', color: C.textMuted }}>
              AI tools don't replace IT support professionals — they <em style={{ color: C.primary }}>amplify</em> them. Support teams using AI-assisted ticket resolution and automation handle 40–60% more tickets with the same headcount — freeing senior staff for complex incidents and strategic projects.
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Sectors like financial services, mining, and large enterprise consistently pay 20–35% above these benchmarks for senior IT support professionals.</p>
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
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 1500) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#eff6ff', borderColor: 'rgba(3,105,161,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> ITIL certification, PowerShell scripting skills, and Microsoft 365 administration experience consistently command a 15–25% salary premium over uncertified peers at the same experience level. Certifications are not optional — they are the salary lever in IT support.
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into IT Support from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
                IT support is <strong style={{ color: C.primary }}>where technology careers begin and where great careers are built</strong>. The help desk is not a waiting room for a "real" IT job — it is the most complete technology education available. In a single year, a driven help desk technician encounters more real-world IT problems than most CS graduates see in three years of lectures.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The professionals who thrive here are those who treat every ticket as a learning opportunity, every user as a valued customer, and every certification as a commitment to excellence. The field rewards curiosity, consistency, and care — and it rewards them generously.
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open your browser, register for CompTIA A+, and take the first step.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>
            
            
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start studying today. Your future self will thank you.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}