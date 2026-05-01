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
  Layers, FileText,
  Workflow, Headphones, Phone,
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
  primary: '#b45309',          // amber — service desk brand colour
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

const CAREER_LEVELS = [
  {
    level: 'Junior', title: 'Service Desk Analyst L1', duration: '0–2 yrs', salary: 'R180k–R320k',
    description: 'Handle inbound calls and tickets, troubleshoot common hardware/software issues, reset passwords, and escalate complex incidents to L2. Document every interaction in the ITSM tool.',
    skills: ['Ticket Management', 'Windows Support', 'Active Directory', 'ITIL Basics'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Service Desk Analyst L2', duration: '2–4 yrs', salary: 'R320k–R580k',
    description: 'Own complex escalations, perform root cause analysis, configure networking and server basics, train L1 staff, and contribute to knowledge base articles and SLA improvement initiatives.',
    skills: ['Root Cause Analysis', 'Networking Basics', 'ITIL Foundation', 'Knowledge Management'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Analyst / Team Lead', duration: '4–7 yrs', salary: 'R580k–R950k',
    description: 'Lead a team of analysts, manage SLA performance, handle major incident coordination, drive ITIL process improvements, and act as technical authority for desktop and productivity tools.',
    skills: ['Team Leadership', 'ITIL Practitioner', 'SLA Management', 'Major Incident Mgmt'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'IT Service Manager', duration: '7+ yrs', salary: 'R1M+',
    description: 'Define and own the service delivery strategy, manage vendor relationships, lead ITIL implementations, oversee budgets, and drive continuous service improvement programmes across the IT function.',
    skills: ['ITIL Managing Pro', 'ITSM Strategy', 'Vendor Management', 'IT Leadership'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'IT Fundamentals & Hardware',
    description: 'Build a solid foundation in how computers work. Learn hardware components (CPU, RAM, storage, networking cards), the boot process, BIOS/UEFI, and basic troubleshooting methodology. CompTIA A+ is your first certification target.',
    duration: '2–3 months', skills: ['CompTIA A+', 'Hardware Basics', 'Troubleshooting', 'OS Installation'],
  },
  {
    step: 2, title: 'Operating Systems — Windows & Linux',
    description: 'Service desk analysts need to be fluent in Windows 10/11 — Group Policy, registry, event logs, and user management. Learn Linux basics for server environments. Master the command line on both platforms.',
    duration: '2–3 months', skills: ['Windows 10/11', 'Active Directory', 'Linux Basics', 'PowerShell / CMD'],
  },
  {
    step: 3, title: 'Networking Fundamentals',
    description: 'Understand TCP/IP, DNS, DHCP, VPN, and Wi-Fi troubleshooting — the source of a huge proportion of service desk tickets. CompTIA Network+ certifies this knowledge and opens doors to L2 and infrastructure roles.',
    duration: '2–3 months', skills: ['TCP/IP & DNS', 'VPN & Wi-Fi', 'CompTIA Network+', 'Network Troubleshooting'],
  },
  {
    step: 4, title: 'ITIL & ITSM Processes',
    description: 'ITIL (Information Technology Infrastructure Library) is the standard framework for IT service management. Learn incident management, problem management, change management, and service request fulfilment. ITIL 4 Foundation is the industry-standard entry certification.',
    duration: '1–2 months', skills: ['ITIL 4 Foundation', 'Incident Management', 'Change Management', 'SLA & KPIs'],
  },
  {
    step: 5, title: 'ITSM Tools & Ticketing Systems',
    description: 'Become proficient in industry ITSM tools — ServiceNow, Jira Service Management, Zendesk, or Freshservice. Learn ticket categorisation, SLA tracking, escalation workflows, and reporting dashboards. Hands-on tool experience is heavily weighted in interviews.',
    duration: '1–2 months', skills: ['ServiceNow', 'Jira Service Mgmt', 'Ticket Workflows', 'Reporting & KPIs'],
  },
  {
    step: 6, title: 'Security, Cloud & Specialisation',
    description: 'CompTIA Security+ rounds out your IT fundamentals with cybersecurity awareness — essential for every IT role. Then choose a specialisation path: Microsoft 365 administration, Azure / AWS cloud support, or ITIL practitioner for service management leadership.',
    duration: '2–3 months', skills: ['CompTIA Security+', 'Microsoft 365', 'Azure Basics', 'ITIL Specialist'],
  },
]

const HARD_SKILLS = [
  { name: 'Windows OS Support & Troubleshooting', level: 95 },
  { name: 'Active Directory & User Management', level: 90 },
  { name: 'ITIL Incident & Request Management', level: 88 },
  { name: 'ITSM Tools (ServiceNow / Jira)', level: 85 },
  { name: 'Networking Fundamentals (TCP/IP, DNS)', level: 80 },
  { name: 'Microsoft 365 Administration', level: 75 },
  { name: 'Remote Support Tools (RDP, TeamViewer)', level: 72 },
  { name: 'PowerShell Scripting', level: 55 },
]

const SOFT_SKILLS = [
  { name: 'Patience Under Pressure', description: 'Service desk analysts support frustrated users in stressful moments — hardware failures, deadline pressure, data loss. Remaining calm, empathetic, and methodical in these moments defines exceptional analysts.' },
  { name: 'Clear Non-Technical Communication', description: 'Translating complex technical problems into plain language that non-technical users understand is the core skill of the role. "Your DNS cache needs flushing" becomes "let\'s refresh your internet connection settings."' },
  { name: 'Systematic Troubleshooting', description: 'Great analysts follow a methodical diagnostic process — isolate the variable, test the hypothesis, document the outcome. Random clicking wastes time and erodes user trust.' },
  { name: 'Priority Management', description: 'Managing a queue of 20+ simultaneous tickets while handling a live call requires clear priority judgment, effective triage, and the ability to communicate wait times honestly to users.' },
  { name: 'Knowledge Documentation', description: 'Every solved problem is an asset. Analysts who document solutions clearly contribute to a knowledge base that reduces resolution times for the whole team — and demonstrates leadership potential.' },
  { name: 'Escalation Judgement', description: 'Knowing when to own an issue and when to escalate — without either over-escalating simple issues or bottlenecking critical incidents — is a nuanced skill that separates L1 from L2 analysts.' },
]

const EDU_PATHS = [
  {
    type: 'Certifications', title: 'Vendor Certifications Path', duration: '6–12 months', cost: 'R8k – R35k',
    borderColor: 'rgba(180,83,9,0.2)', bgColor: '#fffbeb', typeBg: 'rgba(180,83,9,0.12)', typeColor: '#b45309',
    pros: ['Directly aligned with job requirements', 'CompTIA A+ opens the first door', 'ITIL Foundation recognised globally', 'Can be done while working or job-seeking'],
    cons: ['Certifications alone don\'t replace real experience', 'Ongoing cost to maintain and renew', 'Some employers overvalue degree over certs', 'Exams require genuine preparation, not just memorisation'],
  },
  {
    type: 'Diploma', title: 'IT Support Diploma / Learnership', duration: '1–2 years', cost: 'R20k – R80k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Structured curriculum covering broad IT base', 'Often includes workplace placement', 'Recognised by SA employers and SETA', 'Strong network of classmates entering the industry'],
    cons: ['Slower path than cert-only route', 'Variable quality between institutions', 'Less in-depth than a full degree', 'May need supplementary certifications anyway'],
  },
  {
    type: 'Self-Taught', title: 'Online Courses + Cert Prep', duration: '6–18 months', cost: 'R0 – R10k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['Professor Messer (free A+ study), YouTube IT courses', 'Learn at your own pace', 'Pair with home lab for hands-on experience', 'Cheapest path into the field'],
    cons: ['Requires exceptional self-discipline', 'No formal credential beyond certifications', 'Hard to build professional network', 'Imposter syndrome without structured community'],
  },
]

const SCHEDULE = [
  { time: '8:00', act: 'Queue Review & Shift Handover', desc: 'Review overnight tickets, accept shift handover from the previous team, and assess any major incidents or critical SLA risks', duration: '30 min', icon: <Headphones size={14} /> },
  { time: '8:30', act: 'Inbound Ticket & Call Handling', desc: 'Primary focus — resolve inbound incidents and service requests via phone, email, and chat. Document every action taken and time to resolution', duration: '3 hrs', icon: <Phone size={14} /> },
  { time: '11:30', act: 'Escalation & Follow-Up', desc: 'Chase open escalations with L2 and L3 teams, provide users with status updates, and close resolved tickets with full documentation', duration: '1 hr', icon: <Users size={14} /> },
  { time: '12:30', act: 'Lunch & Break', desc: 'Step away from the queue. Mental recovery between high-volume support sessions is essential for sustained quality', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '1:30', act: 'Knowledge Base & Documentation', desc: 'Write or update knowledge articles for solutions found today, complete mandatory ticket documentation, and review SLA compliance reports', duration: '1 hr', icon: <FileText size={14} /> },
  { time: '2:30', act: 'Afternoon Queue & Projects', desc: 'Second wave of inbound support, work on scheduled maintenance tasks, and assist with onboarding new users or device setups', duration: '2 hrs', icon: <Monitor size={14} /> },
  { time: '4:30', act: 'Shift Close & Handover Prep', desc: 'Document open tickets for the next shift, flag any SLA risks, and update the shift log with key incidents and status updates', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'ServiceNow', cat: 'ITSM' }, { name: 'Jira Service Mgmt', cat: 'ITSM' },
  { name: 'Active Directory', cat: 'Identity' }, { name: 'Microsoft 365 Admin', cat: 'Productivity' },
  { name: 'TeamViewer / RDP', cat: 'Remote' }, { name: 'Zendesk', cat: 'Ticketing' },
  { name: 'Wireshark', cat: 'Network' }, { name: 'PowerShell', cat: 'Automation' },
]

const WORK_ENVS = [
  { type: 'In-Office / On-Site', pct: 52 },
  { type: 'Hybrid', pct: 35 },
  { type: 'Remote', pct: 13 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Powered Ticket Triage', icon: <Sparkles size={20} />,
    desc: 'AI tools now auto-classify tickets, predict resolution categories, suggest knowledge articles, and route incidents to the correct team instantly. Analysts who understand and configure these tools are becoming AI-orchestrators rather than just ticket handlers.',
    tools: ['ServiceNow AI', 'Jira AI', 'Freshservice AI', 'Moveworks'],
    borderColor: 'rgba(180,83,9,0.18)', bgColor: '#fffbeb', icoBg: 'rgba(180,83,9,0.12)', icoColor: '#b45309', tagBg: 'rgba(180,83,9,0.1)', tagColor: '#b45309', titleColor: '#b45309',
  },
  {
    title: 'Chatbot & Virtual Agent Support', icon: <Zap size={20} />,
    desc: 'AI virtual agents now handle Level 1 tickets — password resets, software installs, and FAQ resolution — automatically. Service desk analysts are moving up the value chain to handle complex, human-requiring incidents that AI cannot resolve.',
    tools: ['ServiceNow Virtual Agent', 'Microsoft Copilot', 'Intercom AI', 'Aisera'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'Predictive Incident Prevention', icon: <TrendingUp size={20} />,
    desc: 'AIOps tools predict infrastructure failures before they cause incidents, automatically open problem tickets, and suggest remediation scripts. Analysts who can interpret these signals and act on them prevent user-impacting outages proactively.',
    tools: ['Dynatrace AI', 'PagerDuty AIOps', 'BigPanda', 'Moogsoft'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'Microsoft Intune & Endpoint Management', 'Azure AD & Entra ID',
  'PowerShell Automation & Scripting', 'ITIL 4 Managing Professional',
  'AI Tool Configuration (ServiceNow AI)', 'Cloud Support (Azure / M365)',
]

const PROS = [
  { title: 'The Gateway into IT', desc: 'Service desk is the entry point for thousands of successful IT careers. The exposure to networking, security, systems, and applications in a single role is unmatched as a foundation.' },
  { title: 'Certifications Open Doors Fast', desc: 'CompTIA A+, Network+, and ITIL Foundation can take you from zero to employed in under a year. No degree required for many entry-level service desk roles in South Africa.' },
  { title: 'Every Industry Needs You', desc: 'Banks, hospitals, mines, government, logistics — every sector with IT infrastructure needs service desk support. Job security is structural and geographically diverse.' },
  { title: 'Human Impact Every Day', desc: 'Fixing someone\'s computer before their presentation, recovering lost files, or resolving a network outage — the immediate, tangible impact on real people\'s working lives is genuinely rewarding.' },
  { title: 'Clear Specialisation Paths', desc: 'Service desk experience leads naturally into systems administration, network engineering, cybersecurity, cloud engineering, or IT service management — all higher-paying disciplines.' },
  { title: 'Strong Demand in SA', desc: 'Service desk and IT support roles are consistently among the highest-volume IT job postings in South Africa. Certified analysts with good soft skills have very low unemployment rates.' },
]

const CONS = [
  { title: 'High Volume & Repetition', desc: 'Level 1 service desk work involves handling the same password reset, email configuration, and VPN issue dozens of times a day. The repetition can become mentally draining without a growth path.' },
  { title: 'Lower Entry Salaries', desc: 'L1 service desk is among the lowest-paid IT roles at R180k–R320k. While the career path grows significantly, the starting point requires careful budgeting.' },
  { title: 'Emotionally Demanding', desc: 'Users are often frustrated, panicked, or rude when they contact the service desk. Managing emotional interactions professionally and consistently is a daily soft-skills challenge that takes a real toll.' },
  { title: 'Shift Work is Common', desc: 'Many service desks operate 24/7 or extended hours. Evening, weekend, and public holiday shifts are a reality for a significant portion of service desk roles.' },
  { title: 'Viewed as Cost Centre', desc: 'Service desk teams are often seen as overhead rather than strategic function in many organisations — leading to underinvestment in tools, training, and headcount.' },
  { title: 'Ceiling Without Certification', desc: 'Without ongoing certification and deliberate skill development, it\'s easy to remain at L1 indefinitely. Career growth requires proactive investment that not everyone makes.' },
]

const VIDEOS = [
  { id: 'qiQR5rTSshw', title: 'CompTIA A+ Core 1 Full Course', desc: 'Complete study course for the CompTIA A+ Core 1 (220-1101) exam — hardware, networking basics, mobile devices, and troubleshooting methodology.', dur: '14:28:00', channel: 'Professor Messer' },
  { id: 'tSodBEAJryY', title: 'ITIL 4 Foundation Full Course', desc: 'Master ITIL 4 Foundation concepts — service management, the four dimensions model, guiding principles, and the service value system for your certification exam.', dur: '3:15:00', channel: 'Udemy IT Training' },
  { id: 'IPvYjXCsTg8', title: 'ServiceNow Tutorial for Beginners', desc: 'Learn the world\'s leading ITSM platform — incident management, service requests, change management, and the admin console used in enterprise environments.', dur: '2:45:00', channel: 'Simplilearn' },
]

const TAKEAWAYS = [
  'Get CompTIA A+ certified before applying — it signals technical competence and eliminates CV screening hurdles',
  'Document every solution you find — your knowledge base contributions are evidence of leadership potential',
  'Treat every frustrated user with patience — your response to anger is observed and remembered by managers',
  'Start studying for Network+ within 6 months of your first role — it accelerates the L2 transition significantly',
  'ITIL Foundation certification signals that you understand service management, not just technical firefighting',
]

const CAREER_FACTS = [
  {
    icon: <Headphones size={20} />, title: 'What You Do',
    desc: 'Handle inbound IT support tickets and calls, troubleshoot hardware and software issues, manage user accounts, resolve network problems, and ensure that technology works for every person in the organisation.',
    color: '#b45309',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Ticket triage and resolution, password resets and account management, software installation, hardware troubleshooting, incident escalation, knowledge documentation, and SLA compliance management.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Support',
    desc: 'Every employee in the organisation — from the CEO whose laptop won\'t connect to VPN, to the call centre agent whose headset isn\'t working, to the accountant who can\'t access the ERP system.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'IT support roles are consistently among the most advertised IT positions in South Africa. With digital transformation accelerating across all sectors, the demand for skilled service desk professionals continues to grow.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🚪', title: 'The Best Door into IT', desc: 'Service desk is the most accessible entry point into the IT industry. With a CompTIA A+ certification and strong people skills, you can get hired with no prior IT work experience.' },
  { emoji: '💰', title: 'Fast Growth with Certification', desc: 'IT support salaries grow quickly with each certification. An analyst who earns R240k at L1 can be at R580k as an L2 within 3–4 years with deliberate skill development.' },
  { emoji: '🔑', title: 'Exposure to Everything', desc: 'No other IT role gives you such broad exposure to networking, systems, security, applications, and cloud in a single position. The breadth builds a foundation for any specialisation.' },
  { emoji: '🧠', title: 'Problem-Solving Every Day', desc: 'Every ticket is a puzzle. Service desk analysts develop rapid diagnostic thinking — pattern recognition, hypothesis testing, and solution validation that sharpens with every resolved incident.' },
  { emoji: '🌍', title: 'In Demand Everywhere', desc: 'Every company with a computer network needs IT support. From mining houses to hospitals to banks to schools — geographic and sector diversity of opportunity is unmatched in IT.' },
  { emoji: '📈', title: 'Clear Path to Higher Roles', desc: 'Service desk → Systems Administrator, Network Engineer, Cybersecurity Analyst, Cloud Engineer, or IT Service Manager — each path is well-worn, well-documented, and financially rewarding.' },
]

const FREE_RESOURCES = [
  { category: 'Certification Prep', color: '#b45309', bgColor: '#fffbeb', items: [
    { name: 'Professor Messer — Free A+ & N+ Study', url: '#', type: 'Course', rating: 5 },
    { name: 'CompTIA CertMaster Learn (free trial)', url: '#', type: 'Course', rating: 4 },
    { name: 'ITIL 4 Foundation Study Guide (Axelos)', url: '#', type: 'Docs', rating: 5 },
    { name: 'ExamCompass — Free Practice Tests', url: '#', type: 'Practice', rating: 4 },
  ]},
  { category: 'Hands-On Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'TryHackMe — IT Fundamentals Path', url: '#', type: 'Practice', rating: 5 },
    { name: 'ServiceNow Developer Instance (free)', url: '#', type: 'Lab', rating: 5 },
    { name: 'GNS3 / Packet Tracer (networking labs)', url: '#', type: 'Lab', rating: 4 },
    { name: 'Microsoft Learn — M365 & Azure paths', url: '#', type: 'Course', rating: 5 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'r/sysadmin & r/ITCareerQuestions', url: '#', type: 'Forum', rating: 5 },
    { name: 'NetworkChuck YouTube Channel', url: '#', type: 'YouTube', rating: 5 },
    { name: 'IT Career Energizer Podcast', url: '#', type: 'Podcast', rating: 4 },
    { name: 'South African IT forums (MyBroadband)', url: '#', type: 'Forum', rating: 4 },
  ]},
]

const SALARY_DATA = [
  { role: 'Service Desk Analyst L1', range: 'R180k – R320k', midpoint: 250, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Service Desk Analyst L2', range: 'R320k – R580k', midpoint: 450, yoe: '2–4 yrs', color: '#16a34a' },
  { role: 'Senior Analyst / Team Lead', range: 'R580k – R950k', midpoint: 765, yoe: '4–7 yrs', color: '#7c3aed' },
  { role: 'IT Service Manager', range: 'R1M – R1.8M+', midpoint: 1350, yoe: '7+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Closing Tickets Without Full Documentation',
    desc: 'A ticket closed with "fixed" as the resolution note is useless to every future analyst who encounters the same issue. Poor documentation wastes team time and signals a lack of professionalism.',
    fix: 'Document the symptom, root cause, steps taken, and solution for every ticket — even simple ones. Treat it as a knowledge contribution.',
  },
  {
    num: '02', title: 'Over-Escalating Simple Issues',
    desc: 'Escalating password resets, printer drivers, and standard software installs to L2 wastes senior analyst time and signals lack of confidence or competence in basic troubleshooting.',
    fix: 'Build a personal troubleshooting checklist for the 20 most common ticket types. Own them completely before reaching for escalation.',
  },
  {
    num: '03', title: 'Neglecting Certifications',
    desc: 'Remaining at L1 without pursuing A+, Network+, or ITIL certification is a career stall. Uncertified analysts become invisible to promotion committees and recruiter searches alike.',
    fix: 'Book and pay for your next exam before you start studying — the financial commitment creates real motivation.',
  },
  {
    num: '04', title: 'Poor Phone Manner Under Pressure',
    desc: 'Sighing, interrupting users, or sounding disengaged on calls is noticed, recorded, and reported. Service desk calls are often monitored — your communication quality is your professional reputation.',
    fix: 'Record your own call simulations and listen back. Identify your verbal tics, interrupting patterns, and empathy gaps.',
  },
  {
    num: '05', title: 'Not Building a Home Lab',
    desc: 'Reading about networking and Windows administration is completely different from doing it. Analysts who never practice outside of work hours fall behind peers who do.',
    fix: 'Build a free home lab: VirtualBox + Windows Server evaluation + pfSense. Practise what you learn in a consequence-free environment.',
  },
  {
    num: '06', title: 'Treating Every Ticket as Isolated',
    desc: 'Recurring tickets that are never escalated to problem management waste team resources indefinitely. Spotting patterns in repeat incidents is the hallmark of an analyst ready for L2.',
    fix: 'Review your closed tickets weekly. If you see the same issue appearing 3+ times, raise a problem ticket and document the pattern.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Call Centre / Customer Service',
    ease: 'Natural Fit', easeColor: '#b45309', easeBg: '#fffbeb',
    desc: 'Phone manner, empathy, queue management, and communication skills are directly transferable. Add technical certification to your existing soft skills and you become an exceptionally complete service desk candidate.',
    steps: ['Study and pass CompTIA A+ (Professor Messer is free)', 'Build a home lab with VirtualBox', 'Get ITIL 4 Foundation certified', 'Apply to L1 service desk roles immediately'],
  },
  {
    from: 'Retail / Sales',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Patience, product explanation, and handling frustrated customers are skills you\'ve already mastered. The service desk values exactly these competencies — pair them with CompTIA A+ and you are immediately hireable.',
    steps: ['Complete Professor Messer\'s free A+ course', 'Buy a second-hand PC to practise hardware skills', 'Study ITIL 4 Foundation basics', 'Apply for service desk learnership or entry-level role'],
  },
  {
    from: 'Admin / Office Professional',
    ease: 'Very Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Organisational skills, Microsoft Office proficiency, and professional communication are already in your toolkit. Service desk work requires exactly these administrative competencies — combined with technical certification.',
    steps: ['Use your Microsoft 365 knowledge as a foundation', 'Study CompTIA A+ fundamentals', 'Learn Active Directory basics via Microsoft Learn (free)', 'Target internal IT support roles first for the transition'],
  },
  {
    from: 'Other Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Domain expertise from healthcare, finance, or engineering makes you a highly effective service desk analyst in those sectors — you understand the users\' work context in ways that purely technical analysts don\'t.',
    steps: ['Start with CS50 IT and CompTIA A+ fundamentals', 'Target service desk roles in your previous industry', 'Leverage domain knowledge as a differentiator in interviews', 'Use the role as a deliberate launchpad to IT specialisation'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Foundation & Environment', color: '#b45309', bg: '#fffbeb', days: [
    { day: 'Day 1–2', task: 'Download and install VirtualBox. Install Windows 10 and Windows Server 2022 evaluation editions. Explore the interfaces.' },
    { day: 'Day 3–4', task: 'Begin Professor Messer CompTIA A+ Core 1 video series (free). Take notes on hardware components and troubleshooting methodology.' },
    { day: 'Day 5–6', task: 'Active Directory basics: create users, reset passwords, manage groups in your home lab Windows Server VM.' },
    { day: 'Day 7', task: 'Create an account on ExamCompass. Take your first CompTIA A+ practice test. Note every wrong answer and study those topics.' },
  ]},
  { week: 'Week 2', theme: 'Networking & ITSM', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Study TCP/IP, DNS, DHCP, and VPN fundamentals using Professor Messer. Configure basic networking in your VirtualBox environment.' },
    { day: 'Day 10–11', task: 'Register for a free ServiceNow developer instance. Complete the "Welcome to ServiceNow" learning path and create your first incident ticket.' },
    { day: 'Day 12–13', task: 'Study ITIL 4 Foundation core concepts: service management, the four dimensions, and guiding principles from the Axelos free resources.' },
    { day: 'Day 14', task: 'Take a full timed CompTIA A+ mock exam. Score yourself. If below 80%, identify and revisit weak domains.' },
  ]},
  { week: 'Week 3', theme: 'Real-World Practice', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Practice remote support: use RDP and Windows Remote Assistance to connect between your VMs and simulate a support session.' },
    { day: 'Day 17–18', task: 'Study PowerShell basics: get-help, get-service, get-process, and common user management commands. Write 5 scripts from scratch.' },
    { day: 'Day 19–20', task: 'Create 10 realistic ticket scenarios in your ServiceNow dev instance. Practice triage, categorisation, and documentation for each.' },
    { day: 'Day 21', task: 'Record yourself doing a mock support call. Play it back and critique your communication, empathy, and troubleshooting process.' },
  ]},
  { week: 'Week 4', theme: 'Certification & Job Prep', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Final CompTIA A+ revision: take 3 full practice tests. Book your exam on PearsonVUE if scoring consistently above 80%.' },
    { day: 'Day 25–26', task: 'Write and refine your CV. Highlight any troubleshooting experience, Microsoft Office proficiency, and your A+ certification status.' },
    { day: 'Day 27–28', task: 'Research 10 service desk job postings in your area. Note the tools they mention (ServiceNow, Jira, Azure AD). Add all relevant ones to your CV.' },
    { day: 'Day 29–30', task: 'Apply to 5 service desk positions. Prepare answers to: "Walk me through your troubleshooting process" and "Tell me about a time you calmed an angry user."' },
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
      try { await navigator.share({ title: 'Service Desk Analyst Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Service Desk Analyst in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/service-desk-analyst'}</span>
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

export default function ServiceDeskAnalystRoadmapPage() {
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

      {/* HERO */}
      <div className="relative w-full" style={{ background: C.bg }}>
        <div className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: 600 }}>
          <img src="https://i.imgur.com/6tUnitE.jpeg" alt="Service Desk Analyst workspace" className="w-full h-full object-cover object-center block" style={{ filter: 'saturate(0.55) brightness(1.05)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Headphones size={12} /> IT Support & Service Management
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Service Desk Analyst
              </h1>
              <span className="block font-normal mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', color: C.textMuted }}>
                Career Roadmap 2026
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><Clock size={14} style={{ color: C.textFaint }} /> 16 min read</div>
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><BookOpen size={14} style={{ color: C.textFaint }} /> 16 sections</div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-8 pt-6 pb-16">
          <p className="text-base leading-relaxed" style={{ color: '#4b5563', maxWidth: 560, marginLeft: 140 }}>
            The frontline of IT. Service desk analysts are the first responders of technology — solving real problems for real people every day, and building the technical foundation for an entire IT career.
          </p>
          <div className="h-px mt-10" style={{ background: C.border }} />
        </div>
      </div>

      {/* TABLE OF CONTENTS */}
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

      {/* WHAT THIS CAREER IS */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={whatRef}>
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Service Desk Analysis" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#fffbeb', borderColor: 'rgba(180,83,9,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Service Desk Analyst</strong> is the primary point of contact between an organisation's employees and its IT function. They receive, log, diagnose, and resolve technology problems — from a locked-out account to a network outage — and ensure that every user gets the support they need to stay productive. It is the foundational role of the IT support career pathway.
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

      {/* WHY CHOOSE */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={whyRef}>
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Service Desk could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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

      {/* DAY IN THE LIFE */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={dayRef}>
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Service Desk Analyst workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
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

      {/* CAREER TIMELINE */}
      <section ref={tlSectionRef} className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={tlRef}>
            <SectionHeader icon={<Clock size={22} />} title="Career Timeline" subtitle="Time estimates and salary ranges for each level" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="mb-10">
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>L1 Analyst → IT Service Manager</span></div>
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

      {/* ROADMAP */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div ref={stepsRef} className="max-w-2xl mx-auto px-4">
          <SectionHeader icon={<Target size={22} />} title="Step-by-Step Roadmap" subtitle="Your path from complete beginner to job-ready" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="relative flex flex-col items-center">
            {ROADMAP_STEPS.map((s, i) => {
              const icons = ['🖥️', '🪟', '🌐', '📋', '🎫', '🔒']
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
                        {isEven ? <polygon points="372,36 388,44 372,52" fill={accentColors[i + 1] ?? accent} opacity="0.5" /> : <polygon points="28,36 12,44 28,52" fill={accentColors[i + 1] ?? accent} opacity="0.5" />}
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
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>6–12 months · Consistent daily study · Real certifications that open doors</div>
            </div>
          </div>
          <ShareBar />
        </div>
      </section>

      {/* SKILLS */}
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

      {/* EDUCATION PATHS */}
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

      {/* FREE RESOURCES */}
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

      {/* AI IMPACT */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={aiRef}>
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Service Desk in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#fffbeb', borderColor: 'rgba(180,83,9,0.2)', color: C.textMuted }}>
              AI is changing service desk work — but not eliminating it. Routine L1 tasks are being automated, which raises the bar on what analysts handle. The analysts who thrive in 2026 are those who can <em style={{ color: C.primary }}>configure, oversee, and improve AI tools</em> — not just use them.
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

      {/* PROS & CONS */}
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

      {/* SALARY */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={salaryRef}>
            <SectionHeader icon={<DollarSign size={22} />} title="Salary" subtitle="What you can realistically earn at each stage" iconBg={C.greenLight} iconColor={C.green} />
            <div className="rounded-2xl p-6 mb-6 border" style={{ background: '#f0fdf4', borderColor: 'rgba(22,163,74,0.2)' }}>
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. ITIL certified analysts and those with Microsoft or cloud certifications command the top of each range.</p>
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
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 3200) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MISTAKES */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring service desk analysts" iconBg={C.orangeLight} iconColor={C.orange} />
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

      {/* CAREER CHANGE */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={changeRef}>
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into service desk from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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

      {/* 30-DAY PLAN */}
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

      {/* VIDEOS */}
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

      {/* FINAL THOUGHTS */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={finalRef}>
            <SectionHeader icon={<Award size={22} />} title="Final Thoughts" subtitle="What we want you to take away from this guide" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 border mb-8" style={{ background: C.bg, borderColor: C.border }}>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#374151' }}>
                Service desk is where great IT careers begin. The skills you build — systematic troubleshooting, professional communication, ITSM knowledge, and broad technical exposure — are the foundation of <strong style={{ color: C.primary }}>every specialisation in IT</strong>.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The analysts who thrive are those who see the role as a launchpad, not a destination. Every ticket resolved is a skill refined. Every certification earned is a door opened. Start today.
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

      {/* CTA */}
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open Professor Messer and begin.
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