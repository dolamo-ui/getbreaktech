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
  Layers, Server, 
  Package, Shield,
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
  primary: '#b45309',
  primaryLight: 'rgba(180,83,9,0.08)',
  primaryMid: 'rgba(180,83,9,0.15)',
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
    level: 'Junior', title: 'Junior IT Technician', duration: '0–2 yrs', salary: 'R160k–R300k',
    description: 'Install and configure hardware and software, troubleshoot end-user issues, manage printer and peripheral devices, and escalate complex problems under supervision.',
    skills: ['PC Hardware', 'Windows OS', 'Basic Networking', 'Help Desk'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'IT Technician', duration: '2–5 yrs', salary: 'R300k–R560k',
    description: 'Manage Active Directory accounts, deploy endpoint devices, maintain local area networks, administer servers, and independently resolve complex hardware and software failures.',
    skills: ['Active Directory', 'LAN/WAN', 'Server Admin', 'Virtualization'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior IT Technician', duration: '5–8 yrs', salary: 'R560k–R950k',
    description: 'Design and maintain IT infrastructure, manage cloud environments, lead hardware refresh cycles, implement backup and disaster recovery, and mentor junior technicians.',
    skills: ['Cloud (Azure/GCP)', 'DR Planning', 'ITIL Practices', 'Mentoring'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'IT Manager / Systems Arch', duration: '8+ yrs', salary: 'R1M+',
    description: 'Oversee all IT operations, manage vendor relationships, define technology strategy, align IT investments with business goals, and lead multi-person IT teams.',
    skills: ['IT Strategy', 'Vendor Mgmt', 'Budget Planning', 'Leadership'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Computer Hardware & Operating Systems',
    description: 'Master PC components — CPU, RAM, storage, and motherboards. Learn to build, upgrade, and diagnose hardware failures. Install and configure Windows 10/11 and Linux from scratch. Understand boot sequences, drivers, and file systems.',
    duration: '2–3 months', skills: ['PC Assembly', 'Windows 10/11', 'Linux Basics', 'Storage Types'],
  },
  {
    step: 2, title: 'Networking Fundamentals',
    description: 'Understand the OSI model, TCP/IP, subnetting, DNS, DHCP, and VLANs. Learn to configure switches and routers at a basic level. Understand Wi-Fi standards, cable types, and how to use network diagnostic tools like ping, tracert, and Wireshark.',
    duration: '2–3 months', skills: ['TCP/IP & DNS', 'Subnetting', 'DHCP & VLANs', 'Wi-Fi Standards'],
  },
  {
    step: 3, title: 'Active Directory & User Management',
    description: 'Learn Microsoft Active Directory — creating and managing user accounts, group policies, organisational units, and domain controllers. Understand permissions, security groups, and how enterprise identity management works in corporate environments.',
    duration: '1–2 months', skills: ['Active Directory', 'Group Policy', 'User Accounts', 'Permissions'],
  },
  {
    step: 4, title: 'Server Administration & Virtualization',
    description: 'Learn Windows Server fundamentals — DNS, DHCP, file server, and print server roles. Understand virtualisation with VMware or Hyper-V. Learn to manage VMs, snapshots, and resource allocation. Study basic backup and recovery strategies.',
    duration: '2–3 months', skills: ['Windows Server', 'VMware/Hyper-V', 'Backup & Recovery', 'File Services'],
  },
  {
    step: 5, title: 'Cloud Platforms & Microsoft 365',
    description: 'Every organisation has moved or is moving to the cloud. Learn Microsoft 365 administration — Exchange Online, SharePoint, Teams, and Intune for device management. Understand Azure Active Directory and how hybrid environments connect cloud and on-premises.',
    duration: '2–3 months', skills: ['Microsoft 365', 'Azure AD', 'Intune MDM', 'Exchange Online'],
  },
  {
    step: 6, title: 'ITIL, Documentation & Scripting',
    description: 'Senior IT technicians know ITIL service management practices — incident, change, and problem management. Learn PowerShell scripting to automate repetitive tasks. Develop professional documentation skills for runbooks, network diagrams, and user guides.',
    duration: '2–3 months', skills: ['ITIL Practices', 'PowerShell', 'Documentation', 'ITSM Tools'],
  },
]

const HARD_SKILLS = [
  { name: 'PC Hardware & Troubleshooting', level: 95 },
  { name: 'Windows OS Administration', level: 93 },
  { name: 'Networking (TCP/IP, DNS, DHCP)', level: 88 },
  { name: 'Active Directory & Group Policy', level: 85 },
  { name: 'Microsoft 365 Administration', level: 80 },
  { name: 'Server Administration', level: 75 },
  { name: 'Virtualization (VMware/Hyper-V)', level: 68 },
  { name: 'PowerShell Scripting', level: 62 },
]

const SOFT_SKILLS = [
  { name: 'Patient Problem Solving', description: 'IT technicians deal with frustrated users who have lost work or productivity. The ability to stay calm, empathetic, and methodical under pressure — even when the user is not — is what defines great technicians.' },
  { name: 'Clear Communication', description: 'Translate complex technical problems into plain language that non-technical users and managers understand. The best IT technicians make technology feel approachable, not intimidating.' },
  { name: 'Systematic Troubleshooting', description: 'A methodical approach — isolating variables, checking the simple things first, and documenting steps — resolves issues faster and avoids the chaos of random trial-and-error.' },
  { name: 'Prioritisation', description: 'When multiple issues hit simultaneously, deciding what to fix first based on business impact rather than urgency or who complains loudest is a critical operational skill.' },
  { name: 'Documentation Discipline', description: 'An undocumented solution is a solution that disappears when you leave. The best IT technicians write clear, reproducible procedures that make the entire team more effective.' },
  { name: 'Continuous Self-Updating', description: 'Technology changes constantly. IT technicians who don\'t keep their skills current become the bottleneck rather than the solution. Curiosity and self-directed learning are non-negotiable.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'IT / Information Systems Degree', duration: '3 years', cost: 'R300k – R700k',
    borderColor: 'rgba(180,83,9,0.2)', bgColor: '#fffbeb', typeBg: 'rgba(180,83,9,0.12)', typeColor: '#b45309',
    pros: ['Strong theoretical foundation in networking and systems', 'Access to graduate IT programmes at large corporations', 'Credibility for senior and management roles', 'Broad understanding of IT across domains'],
    cons: ['Slow and expensive path to first entry-level role', 'Certifications often valued more than degrees by hiring managers', 'Practical hands-on skills require additional self-study', 'Three-year opportunity cost vs certifications'],
  },
  {
    type: 'Certifications', title: 'CompTIA A+ / Network+ / Server+', duration: '4–12 months', cost: 'R8k – R35k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['CompTIA A+ is the industry-standard entry credential', 'Vendor-neutral and globally recognised', 'Fast path to first IT technician role', 'Stackable: A+ → Network+ → Security+ → specialisation'],
    cons: ['Exam costs add up (each exam R2k–R5k)', 'Must be renewed every three years', 'Theory without hands-on labs is insufficient', 'Entry-level market is competitive'],
  },
  {
    type: 'Self-Taught', title: 'Home Labs & Online Courses', duration: '6–18 months', cost: 'R0 – R5k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['Build a real home lab with cheap second-hand equipment', 'Professor Messer and Professor Messer are free', 'Hands-on experience transfers directly to the job', 'Learn exactly what current employers need'],
    cons: ['No formal credential without exams', 'Requires discipline without external accountability', 'Knowledge gaps are easy to miss without structured curriculum', 'Harder to get first interview without a cert or degree'],
  },
]

const SCHEDULE = [
  { time: '8:00', act: 'Ticket Queue Review', desc: 'Review overnight support tickets, prioritise by impact and urgency, assign to queue, and flag any critical hardware failures or connectivity outages', duration: '30 min', icon: <Monitor size={14} /> },
  { time: '8:30', act: 'Hardware & Desktop Support', desc: 'On-site or remote troubleshooting of PC, laptop, and printer issues — replacing components, reimaging machines, and resolving software conflicts for end users', duration: '2.5 hrs', icon: <Package size={14} /> },
  { time: '11:00', act: 'Network & Server Checks', desc: 'Monitor server health, check backup completion reports, verify network switch and router status, and respond to any performance alerts from monitoring systems', duration: '1 hr', icon: <Server size={14} /> },
  { time: '12:00', act: 'Lunch & Recovery', desc: 'Step away from the desk. IT support is mentally draining — dedicated recovery time makes the afternoon significantly more effective and patient', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '1:00', act: 'User Account & Access Management', desc: 'Process new employee onboarding, manage Active Directory accounts, configure Office 365 licences, set up MFA, and handle access permission changes', duration: '1.5 hrs', icon: <Users size={14} /> },
  { time: '2:30', act: 'Maintenance & Patching', desc: 'Deploy software updates, run patch compliance reports, schedule server maintenance windows, update firmware, and maintain asset inventory records', duration: '1.5 hrs', icon: <Shield size={14} /> },
  { time: '4:00', act: 'Documentation & Learning', desc: 'Update runbooks, document resolved tickets for the knowledge base, study for next certification, and research solutions for recurring issues', duration: '1 hr', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Active Directory', cat: 'Identity' }, { name: 'Microsoft 365', cat: 'Productivity' },
  { name: 'ServiceNow / JIRA', cat: 'Ticketing' }, { name: 'VMware / Hyper-V', cat: 'Virtual' },
  { name: 'Wireshark', cat: 'Network' }, { name: 'PowerShell', cat: 'Scripting' },
  { name: 'Azure / Intune', cat: 'Cloud MDM' }, { name: 'Veeam / Acronis', cat: 'Backup' },
]

const WORK_ENVS = [
  { type: 'In-Office / On-Site', pct: 52 },
  { type: 'Hybrid', pct: 35 },
  { type: 'Remote', pct: 13 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Assisted Troubleshooting', icon: <Sparkles size={20} />,
    desc: 'AI tools now diagnose hardware failures, suggest fixes from ticket history, and guide technicians through complex resolutions in real time. IT technicians who use AI assistants resolve tickets 40% faster on average.',
    tools: ['Microsoft Copilot', 'ServiceNow AI', 'Freshdesk AI', 'Slack AI'],
    borderColor: 'rgba(180,83,9,0.18)', bgColor: '#fffbeb', icoBg: 'rgba(180,83,9,0.12)', icoColor: '#b45309', tagBg: 'rgba(180,83,9,0.1)', tagColor: '#b45309', titleColor: '#b45309',
  },
  {
    title: 'Automated Endpoint Management', icon: <Zap size={20} />,
    desc: 'Microsoft Intune and AI-driven MDM platforms now automate patch deployment, enforce compliance policies, and self-heal common software issues without technician intervention — shifting the role towards higher-level system management.',
    tools: ['Microsoft Intune', 'Jamf Pro', 'ManageEngine', 'NinjaRMM'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI-Powered IT Operations (AIOps)', icon: <TrendingUp size={20} />,
    desc: 'AIOps platforms correlate infrastructure metrics, predict hardware failures before they occur, and automatically route incidents to the right team. IT technicians who understand these platforms are far more effective and employable.',
    tools: ['Datadog', 'New Relic', 'Dynatrace', 'SolarWinds AI'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'Microsoft Azure Administration', 'PowerShell & Automation Scripting',
  'Zero Trust Network Architecture', 'Microsoft Intune & Endpoint Management',
  'ITIL 4 Service Management', 'Cloud Backup & Disaster Recovery',
]

const PROS = [
  { title: 'Always in Demand', desc: 'Every organisation that uses computers needs IT technicians. Demand is stable, geographically diverse, and exists in every industry — from hospitals to banks to schools and government.' },
  { title: 'Clear Entry Point', desc: 'IT technician is one of the most accessible entry points into tech. With a CompTIA A+ and a home lab, a motivated person can get their first role within 6 months.' },
  { title: 'Excellent Career Ladder', desc: 'The progression from technician to sysadmin to cloud engineer to IT manager is one of the most well-defined career ladders in technology — with clear skills and certifications at each step.' },
  { title: 'Hands-On Tangible Work', desc: 'IT technicians fix real problems that directly impact real people\'s workdays. The satisfaction of resolving a complex issue and getting someone back to work is immediate and concrete.' },
  { title: 'Broad Exposure', desc: 'No other role gives you visibility into as many parts of an organisation\'s technology as IT support. This exposure is the foundation for specialising in networking, cloud, security, or development.' },
  { title: 'Springboard Into Tech', desc: 'Many senior engineers, security specialists, and cloud architects started as IT technicians. The hands-on experience is an accelerant for any technical career path you choose later.' },
]

const CONS = [
  { title: 'Lower Starting Salaries', desc: 'Entry-level IT technician salaries are among the lowest in tech. The compensation improves significantly with experience and certifications, but the starting point requires patience.' },
  { title: 'User Frustration', desc: 'Dealing with frustrated, stressed users who cannot do their job is emotionally draining. Patience and empathy are required skills, not optional soft skills, in this role.' },
  { title: 'Repetitive Work at Entry Level', desc: 'Password resets, printer troubleshooting, and software installations dominate junior technician queues. The work becomes more interesting with seniority, but early days can feel monotonous.' },
  { title: 'On-Call and After-Hours', desc: 'Critical system failures don\'t happen during business hours. Senior IT technicians often carry after-hours responsibilities for server failures, network outages, and cyber incidents.' },
  { title: 'Pace of Technology Change', desc: 'The tools, operating systems, and cloud platforms IT technicians support change constantly. Staying current requires continuous investment in learning throughout the entire career.' },
  { title: 'Undervalued Until Something Breaks', desc: 'IT technicians are invisible when everything works and in the spotlight when anything breaks. The role rarely receives recognition proportional to its business-critical importance.' },
]

const VIDEOS = [
  { id: 'o2Gf_-OzMSg', title: 'CompTIA A+ Study Guide — Full Course', desc: 'Complete preparation for the CompTIA A+ certification covering hardware, OS, networking, security, and troubleshooting — the foundational IT technician credential.', dur: '27:00:00', channel: 'Professor Messer' },
  { id: 'QjHjuBsKVsU', title: 'Active Directory Crash Course', desc: 'Learn Active Directory from scratch — setting up a domain, creating users, managing group policies, and understanding enterprise identity management.', dur: '1:15:00', channel: 'NetworkChuck' },
  { id: 'tSodBEAJTrM', title: 'IT Support Career Path — Where to Start', desc: 'A practical guide to launching your IT support career — which certifications to get first, how to build a home lab, and what employers actually look for.', dur: '18:30', channel: 'Josh Madakor' },
]

const TAKEAWAYS = [
  'Build a home lab before spending money on exam vouchers — hands-on experience proves your skills far better than a certificate alone',
  'Document every problem you solve, no matter how small — your documentation becomes the knowledge base that makes you irreplaceable',
  'Get CompTIA A+ first, then Network+, then choose your specialisation — this path is trusted by employers and gives you the broadest foundation',
  'Learn PowerShell enough to automate one repetitive task per month — scripting skills separate IT technicians from IT professionals',
  'Treat every ticket as a learning opportunity — the technician who understands why a problem occurred beats the one who just reboots the machine',
]

/* ─── NEW SECTIONS ────────────────────────────────────────────────────────── */

const CAREER_FACTS = [
  {
    icon: <Monitor size={20} />, title: 'What You Maintain',
    desc: 'Desktop and laptop computers, servers, network switches and routers, printers, VoIP systems, cloud services, user accounts, software licences, and all the physical and digital infrastructure employees rely on daily.',
    color: '#b45309',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Hardware installation and repair, operating system deployment, end-user troubleshooting, Active Directory and account management, patch management, backup monitoring, and network configuration.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Every employee in the organisation who uses technology — which is everyone. You also collaborate with vendors, cloud service providers, security teams, and management to keep systems available and compliant.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'IT technicians are needed in every industry across South Africa — government, healthcare, financial services, education, and retail. Cloud migration and remote work have increased complexity and demand simultaneously.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🖥️', title: 'The Gateway Into Technology', desc: 'IT technician is the most accessible and respected entry point into a technology career. From here, you can pivot to networking, cloud, security, development, or IT management.' },
  { emoji: '💼', title: 'Jobs in Every Industry', desc: 'Unlike specialised tech roles, IT technicians are needed everywhere — hospitals, banks, schools, government departments, and every business in between. The demand is universal.' },
  { emoji: '🔧', title: 'Tangible, Satisfying Work', desc: 'You fix real problems for real people. Getting a colleague back to work after a hardware failure, or recovering data that seemed lost, delivers immediate, visible satisfaction.' },
  { emoji: '📈', title: 'Exceptional Career Ladder', desc: 'Technician → Sysadmin → Cloud Engineer → IT Manager / Architect. Each rung is clearly defined, well-compensated, and reachable with the right certifications and experience.' },
  { emoji: '🌱', title: 'Foundation That Lasts Decades', desc: 'Understanding how hardware, networking, and operating systems actually work gives you an advantage in every technical role you move into. These fundamentals never go out of date.' },
  { emoji: '🎓', title: 'Low Barrier to Entry', desc: 'With a CompTIA A+ and genuine curiosity, you can get your first IT technician job in under a year — making this one of the most accessible career transitions available in tech.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#b45309', bgColor: '#fffbeb', items: [
    { name: 'Professor Messer — CompTIA A+ (free)', url: '#', type: 'Course', rating: 5 },
    { name: 'Professor Messer — Network+ (free)', url: '#', type: 'Course', rating: 5 },
    { name: 'Microsoft Learn — Azure Fundamentals', url: '#', type: 'Course', rating: 5 },
    { name: 'Google IT Support Certificate (Coursera)', url: '#', type: 'Course', rating: 4 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'ExamCompass — Free CompTIA Practice Tests', url: '#', type: 'Practice', rating: 5 },
    { name: 'TechExams.net — Community Study Forums', url: '#', type: 'Forum', rating: 4 },
    { name: 'Home Lab Guide — Cheap Server Setup (Reddit)', url: '#', type: 'Reference', rating: 5 },
    { name: 'PowerShell.org — Free Learning Resources', url: '#', type: 'Course', rating: 4 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'NetworkChuck YouTube Channel', url: '#', type: 'YouTube', rating: 5 },
    { name: 'r/ITCareerQuestions & r/sysadmin', url: '#', type: 'Forum', rating: 5 },
    { name: 'Techie Lawrence YouTube Channel', url: '#', type: 'YouTube', rating: 4 },
    { name: 'Spiceworks Community — IT Help', url: '#', type: 'Forum', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior IT Technician', range: 'R160k – R300k', midpoint: 230, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'IT Technician', range: 'R300k – R560k', midpoint: 430, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior IT Technician', range: 'R560k – R950k', midpoint: 755, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'IT Manager / Systems Architect', range: 'R1M – R1.8M+', midpoint: 1300, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Only Learning Windows, Ignoring Linux',
    desc: 'Most enterprise servers and cloud infrastructure runs on Linux. IT technicians who cannot navigate a Linux terminal are limited to desktop support and excluded from the higher-paying server and cloud roles.',
    fix: 'Install Ubuntu or CentOS in a VM and practice common admin tasks daily. Aim for Linux Essentials or LPIC-1 within your first two years.',
  },
  {
    num: '02', title: 'Skipping Documentation',
    desc: 'Technicians who solve problems but don\'t document solutions create knowledge silos. When they leave, the organisation loses all that accumulated problem-solving knowledge.',
    fix: 'Write a resolution note for every ticket, no matter how simple. Build your own personal knowledge base that follows you across employers.',
  },
  {
    num: '03', title: 'Ignoring PowerShell and Scripting',
    desc: 'IT technicians who can\'t automate repetitive tasks spend half their time on work that should take five minutes. Manual-only technicians are significantly less valuable and less promotable.',
    fix: 'Write one PowerShell script per week that automates something you do manually. Start with user account creation, then move to reporting and patching.',
  },
  {
    num: '04', title: 'Not Getting the A+ First',
    desc: 'Many new IT technicians skip CompTIA A+ because they feel they already know the content. Hiring managers still filter on it — and the structured knowledge it provides fills real gaps.',
    fix: 'Get CompTIA A+ within your first six months, even if you already work in IT. It formalises your knowledge and unlocks many job applications that require it.',
  },
  {
    num: '05', title: 'Staying Only in Desktop Support',
    desc: 'Desktop support skills plateau quickly. IT technicians who never expand into networking, server administration, or cloud management hit a hard salary ceiling that they cannot escape without a lateral move.',
    fix: 'After two years, pursue Network+ or Microsoft Azure Administrator and deliberately seek tickets and projects outside your desktop support comfort zone.',
  },
  {
    num: '06', title: 'Never Building a Home Lab',
    desc: 'You cannot safely experiment on production systems. IT technicians who never build their own practice environment develop skills slowly and lack confidence when handling unfamiliar systems.',
    fix: 'Buy a second-hand Dell or HP server for under R2,000 and install ESXi or Proxmox. Run Active Directory, DNS, and file server VMs to practise freely.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'General Administrative / Office',
    ease: 'Very Achievable', easeColor: '#b45309', easeBg: '#fffbeb',
    desc: 'Office workers who are the unofficial "tech person" already have more relevant experience than they realise. Your end-user perspective and process understanding is a genuine advantage in IT support roles.',
    steps: ['Study Professor Messer\'s free CompTIA A+ videos', 'Build a basic home lab with a spare PC', 'Get CompTIA A+ certified', 'Apply to helpdesk or desktop support roles at your current company first'],
  },
  {
    from: 'Retail / Customer Service',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'IT support is fundamentally a customer service role with a technical twist. Your patience, communication skills, and ability to manage difficult people in stressful moments transfer directly and are undervalued by purely technical candidates.',
    steps: ['Complete the Google IT Support Professional Certificate on Coursera', 'Set up a home lab and build basic troubleshooting skills', 'Get CompTIA A+ as your first formal credential', 'Target helpdesk and Level 1 IT support roles'],
  },
  {
    from: 'Electronics / Engineering Technician',
    ease: 'Natural Fit', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Your understanding of electrical components, signal flow, and physical systems gives you a head start on hardware troubleshooting. Add software, networking, and OS knowledge to move into IT with a strong practical foundation.',
    steps: ['Learn Windows Server and Active Directory administration', 'Study networking fundamentals with CompTIA Network+', 'Get CompTIA A+ to formalise and certify your hardware knowledge', 'Target IT technician roles at manufacturing or industrial companies'],
  },
  {
    from: 'Recent School Leaver',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'IT technician is one of the best first careers in tech for school leavers. You don\'t need a degree — you need a CompTIA A+, a home lab, and the communication skills to explain technology to people who find it intimidating.',
    steps: ['Build a home lab immediately — even a single spare PC is enough to start', 'Complete Professor Messer\'s free CompTIA A+ course', 'Get your A+ certification (budget R3k–R5k for the exam)', 'Apply to managed service provider (MSP) roles for broad exposure'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Hardware & OS', color: '#b45309', bg: '#fffbeb', days: [
    { day: 'Day 1–2', task: 'Download and install VirtualBox or VMware Workstation Player. Create a Windows 10 and Ubuntu 22.04 VM from ISO files.' },
    { day: 'Day 3–4', task: 'Start Professor Messer\'s free CompTIA A+ 220-1101 course. Complete the Mobile Devices and Networking domains.' },
    { day: 'Day 5–6', task: 'Build a PC from parts (in a video walkthrough if physical parts aren\'t available). Learn each component\'s function and common failure modes.' },
    { day: 'Day 7', task: 'Create a GitHub account. Write your first documentation page describing how to install Windows 10 cleanly from scratch.' },
  ]},
  { week: 'Week 2', theme: 'Networking', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Study TCP/IP, DNS, and DHCP. Use your VMs to observe how IP addresses are assigned and how DNS resolution works.' },
    { day: 'Day 10–11', task: 'Learn subnetting using free practice tools online. Understand /24, /16, and /8 networks and calculate subnet ranges.' },
    { day: 'Day 12–13', task: 'Install Wireshark and capture your own network traffic. Identify DNS queries, HTTP requests, and DHCP handshakes.' },
    { day: 'Day 14', task: 'Configure a DHCP reservation and custom DNS in your router or a VM. Document what you did and why.' },
  ]},
  { week: 'Week 3', theme: 'Active Directory', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Set up a Windows Server 2022 VM (evaluation copy is free). Install the Active Directory Domain Services role and promote to domain controller.' },
    { day: 'Day 17–18', task: 'Create 10 test users and 3 organisational units. Apply a Group Policy that sets a desktop wallpaper and disables USB drives.' },
    { day: 'Day 19–20', task: 'Join your Windows 10 VM to the domain. Log in as a domain user and verify group policy applies.' },
    { day: 'Day 21', task: 'Write a PowerShell script that creates a new user account with the correct OU, group membership, and home folder.' },
  ]},
  { week: 'Week 4', theme: 'Cloud & Apply', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Create a free Microsoft 365 developer account. Set up a test user, assign a licence, configure Exchange Online mailbox, and explore Intune.' },
    { day: 'Day 25–26', task: 'Register for Microsoft Azure Free Tier. Deploy a Windows Server VM in Azure and connect via RDP.' },
    { day: 'Day 27–28', task: 'Register for CompTIA A+ exam using the exam voucher from their site. Schedule your exam date within 60 days.' },
    { day: 'Day 29–30', task: 'Update your LinkedIn with your new skills, lab projects, and certification target. Apply to 5 helpdesk or IT technician roles.' },
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
      try { await navigator.share({ title: 'IT Technician Career Roadmap 2026', text: 'Complete step-by-step roadmap to become an IT Technician in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/it-technician'}</span>
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

export default function ITTechnicianRoadmapPage() {
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
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80"
            alt="IT Technician — hardware and computer systems"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Monitor size={12} /> Hardware & Systems
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                IT Technician
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
            Keep the technology running that keeps businesses running. IT technicians are the hands-on engineers who ensure every device, network, and system works — the invisible backbone of every productive organisation.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of IT Technicians" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#fffbeb', borderColor: 'rgba(180,83,9,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                An <strong style={{ color: C.primary }}>IT Technician</strong> installs, maintains, and repairs the hardware, software, and network infrastructure that organisations depend on. While software engineers build systems and security engineers protect them, IT technicians ensure those systems are physically and operationally functional for every employee, every day. They are the first line of response when technology fails — and the first point of contact for every end user who needs help.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons IT Technician could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical IT Technician workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(180,83,9,0.3)'; (e.currentTarget as HTMLElement).style.background = '#fffbeb' }}
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior Tech → IT Manager</span></div>
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
              const icons = ['🖥️', '🌐', '👥', '🗄️', '☁️', '📋']
              const accentColors = ['#b45309', '#16a34a', '#b45309', '#16a34a', '#b45309', '#16a34a']
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.indigo} 100%)`, boxShadow: '0 8px 48px rgba(180,83,9,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>8–12 months · Daily hands-on practice · Build a real home lab</div>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming IT Technician work in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#fffbeb', borderColor: 'rgba(180,83,9,0.2)', color: C.textMuted }}>
              AI tools don't replace IT technicians — they <em style={{ color: C.primary }}>amplify</em> them. Automated patch management, AI-assisted diagnostics, and intelligent ticketing systems handle routine tasks — freeing technicians to focus on complex problems, infrastructure projects, and user relationships that require human judgement.
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. IT managers and senior system administrators with cloud certifications (Azure, AWS) consistently earn at the upper end of or above these ranges.</p>
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
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 1800) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#fffbeb', borderColor: 'rgba(180,83,9,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> IT technicians who add a Microsoft Azure Administrator (AZ-104) or AWS SysOps certification can jump salaries by R80k–R150k and move into cloud operations roles that pay significantly more than traditional on-premises support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring IT technicians" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into IT from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in IT Support and Systems" iconBg={C.redLight} iconColor={C.red} />
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
                IT technicians are the <strong style={{ color: C.primary }}>foundation of every technology-dependent organisation</strong>. The developer who writes brilliant code, the security engineer who defends the perimeter, and the executive who makes strategy decisions — all of them depend on working hardware, reliable networks, and functioning systems that IT technicians maintain.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The career is accessible, rewarding, and a proven gateway into every other area of technology. Build the fundamentals well, document everything, and never stop learning — and you will have a career that grows with you for decades.
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to set up your first VM and get your hands dirty.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>
          

          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start building today. Your future self will thank you.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}