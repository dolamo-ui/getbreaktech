import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft, Check, X,
  Clock, DollarSign, Rocket,
  CheckCircle2, Code, MessageSquare, Play, ExternalLink,
  GraduationCap, Scale, ThumbsUp, ThumbsDown,
  Briefcase, Coffee, Users, Monitor,
  Sparkles, Zap, TrendingUp,
  Link2, Download, Share2, Copy, CheckCheck,
  BookOpen, AlertTriangle, RefreshCw, Star, Calendar,
  Award, Target, Flame,
  Layers, Server,
  Package,
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
  primary: '#7c2d12',
  primaryLight: 'rgba(124,45,18,0.08)',
  primaryMid: 'rgba(124,45,18,0.15)',
  violet: '#7c3aed',
  violetLight: 'rgba(124,58,237,0.08)',
  green: '#16a34a',
  greenLight: 'rgba(22,163,74,0.08)',
  red: '#dc2626',
  redLight: 'rgba(220,38,38,0.08)',
  orange: '#ea580c',
  orangeLight: 'rgba(234,88,12,0.08)',
  indigo: '#4338ca',
  indigoLight: 'rgba(67,56,202,0.08)',
  cyan: '#0891b2',
  cyanLight: 'rgba(8,145,178,0.08)',
}

const CAREER_LEVELS = [
  {
    level: 'Junior', title: 'Junior Sysadmin', duration: '0–2 yrs', salary: 'R260k–R460k',
    description: 'Provision user accounts, manage helpdesk tickets, maintain Windows/Linux servers, apply patches, and monitor system health under the guidance of senior administrators.',
    skills: ['Windows Server', 'Linux Basics', 'Active Directory', 'CompTIA A+'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Systems Administrator', duration: '2–5 yrs', salary: 'R500k–R900k',
    description: 'Own server infrastructure end-to-end: deploy virtualisation, manage Active Directory, configure backup and disaster recovery, and lead OS migrations and cloud integrations.',
    skills: ['VMware/Hyper-V', 'PowerShell', 'Backup & DR', 'Azure AD'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Sysadmin', duration: '5–8 yrs', salary: 'R900k–R1.5M',
    description: 'Architect enterprise infrastructure, lead cloud migrations to Azure or AWS, define security baselines, implement endpoint management at scale, and mentor junior staff.',
    skills: ['Azure / AWS', 'Ansible', 'Security Hardening', 'Mentoring'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'IT / Infra Architect', duration: '8+ yrs', salary: 'R1.6M+',
    description: 'Define the enterprise infrastructure strategy, lead digital transformation initiatives, evaluate and implement enterprise platforms, and drive cloud-first or hybrid-cloud architecture.',
    skills: ['Infra Strategy', 'Multi-cloud', 'DevOps Bridge', 'Leadership'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Operating Systems — Windows Server & Linux',
    description: 'Master both Windows Server (2019/2022) and Linux (Ubuntu/RHEL). Learn installation, disk management, user management, services, logging, and performance monitoring. These are the two platforms you will manage for your entire career.',
    duration: '2–3 months', skills: ['Windows Server', 'Ubuntu / RHEL', 'File Systems', 'User Management'],
  },
  {
    step: 2, title: 'Active Directory, DNS & Group Policy',
    description: 'Active Directory is the backbone of enterprise identity. Master AD DS, user and group management, OU structures, Group Policy Objects (GPOs), DNS zones, and DHCP. This is the most common sysadmin interview topic.',
    duration: '2–3 months', skills: ['AD DS', 'DNS & DHCP', 'Group Policy', 'Kerberos Auth'],
  },
  {
    step: 3, title: 'Virtualisation — VMware & Hyper-V',
    description: 'Almost all enterprise servers are virtualised. Learn VMware vSphere and Microsoft Hyper-V: VM creation, snapshots, templates, vMotion, HA clusters, and resource management. Understanding virtualisation separates junior from mid-level administrators.',
    duration: '2–3 months', skills: ['VMware vSphere', 'Hyper-V', 'VM Templates', 'Clustering'],
  },
  {
    step: 4, title: 'Scripting — PowerShell & Bash',
    description: 'Manual administration does not scale. PowerShell is non-negotiable for Windows environments; Bash for Linux. Automate user provisioning, report generation, patch checking, and configuration tasks. Write scripts that replace repetitive manual work.',
    duration: '2–3 months', skills: ['PowerShell', 'Bash Scripting', 'Task Scheduling', 'Automation'],
  },
  {
    step: 5, title: 'Backup, Disaster Recovery & Security Hardening',
    description: 'Systems administrators are responsible for business continuity. Learn backup strategies (3-2-1 rule), implement Veeam or Azure Backup, test restore procedures, and apply CIS security benchmarks to harden servers against attack.',
    duration: '2–3 months', skills: ['Veeam / Backup', 'DR Planning', 'CIS Benchmarks', 'Patch Management'],
  },
  {
    step: 6, title: 'Cloud Administration — Azure & AWS',
    description: 'The modern sysadmin must operate in the cloud. Learn Microsoft Azure (most common in enterprise), including virtual machines, Azure AD, Intune, and hybrid identity. Add AWS fundamentals. Cloud skills have become mandatory, not optional.',
    duration: '3–4 months', skills: ['Microsoft Azure', 'Azure AD / Intune', 'AWS Basics', 'Hybrid Identity'],
  },
]

const HARD_SKILLS = [
  { name: 'Windows Server Administration', level: 95 },
  { name: 'Active Directory & Group Policy', level: 93 },
  { name: 'Linux Administration', level: 85 },
  { name: 'PowerShell Scripting', level: 82 },
  { name: 'VMware / Hyper-V Virtualisation', level: 80 },
  { name: 'Microsoft Azure / Cloud', level: 75 },
  { name: 'Backup & Disaster Recovery', level: 72 },
  { name: 'Security Hardening & Compliance', level: 65 },
]

const SOFT_SKILLS = [
  { name: 'Methodical Problem Solving', description: 'Sysadmins deal with ambiguous failures — a server that "just stopped working". The ability to isolate, reproduce, and resolve issues systematically, without panic, defines great administrators.' },
  { name: 'Documentation Rigour', description: 'Every server configuration, every change, every recovery procedure must be documented. An undocumented infrastructure is a single point of failure. Great sysadmins treat documentation as part of the job, not a bonus.' },
  { name: 'Security Mindset', description: 'Every unpatched server, every over-privileged account, every weak password is a liability. Systems administrators are responsible for the security baseline of the entire organisation\'s infrastructure.' },
  { name: 'Change Management Discipline', description: 'Production systems require rigorous change control. A misconfigured GPO can lock out thousands of users. Great sysadmins test changes in staging, document rollback plans, and schedule maintenance windows.' },
  { name: 'User Communication', description: 'Sysadmins serve end-users and management simultaneously. Translating technical outages into plain language, managing expectations during incidents, and communicating maintenance windows professionally are essential.' },
  { name: 'Calm Under Incident Pressure', description: 'When the mail server fails at 8am or the domain controller goes down on payroll day, sysadmins are the first responders. The ability to work methodically under pressure while communicating status is a career-defining skill.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'IT / Information Systems Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(124,45,18,0.2)', bgColor: '#fff7ed', typeBg: 'rgba(124,45,18,0.12)', typeColor: '#7c2d12',
    pros: ['Broad IT foundation including networking and security', 'Respected at large enterprises and government', 'Access to graduate programmes and internships', 'Strong theoretical grounding'],
    cons: ['Slow path to practical sysadmin skills', 'Microsoft certifications still expected on top', 'Lab time often insufficient', 'Many employers value experience over degree alone'],
  },
  {
    type: 'Certifications', title: 'Microsoft & CompTIA Track', duration: '1–3 years', cost: 'R20k – R80k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['CompTIA A+ → Network+ → Server+ is the fastest entry path', 'Microsoft Azure Administrator (AZ-104) is highly valued', 'MCSA/MCSE legacy credentials still respected in large enterprises', 'Each certification is an immediate, measurable salary step-up'],
    cons: ['Certification fees add up (CompTIA + Microsoft exams)', 'Require renewal and continuing education', 'Lab environment cost (Azure free tier covers most)', 'Cisco/Linux certs needed to supplement Microsoft track'],
  },
  {
    type: 'Self-Taught', title: 'Home Lab + Online Courses', duration: '12–18 months', cost: 'R3k – R20k',
    borderColor: 'rgba(67,56,202,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(67,56,202,0.12)', typeColor: '#4338ca',
    pros: ['Build a home lab on a refurbished PC (cheap, effective)', 'Microsoft Learn and TechNet are free and comprehensive', 'Azure free tier gives 12 months of real cloud practice', 'Home lab documentation is a genuine portfolio piece'],
    cons: ['No formal credential initially', 'Easy to develop knowledge gaps in security or DR', 'Requires discipline to study systematically', 'Home lab hardware costs (though minimal with virtualisation)'],
  },
]

const SCHEDULE = [
  { time: '8:00', act: 'Morning Systems Check', desc: 'Review overnight monitoring alerts (SCOM, Zabbix, Azure Monitor), check backup job success, verify patch compliance dashboards, and triage overnight helpdesk tickets', duration: '30 min', icon: <Monitor size={14} /> },
  { time: '8:30', act: 'Patch & Change Management', desc: 'Deploy approved patches to staging servers, review change requests for the week, and coordinate maintenance windows with the helpdesk and end-user communications', duration: '1.5 hrs', icon: <Package size={14} /> },
  { time: '10:00', act: 'User & Identity Management', desc: 'Process onboarding/offboarding requests, provision AD accounts, manage Azure AD group memberships, and respond to access and permission tickets', duration: '1 hr', icon: <Users size={14} /> },
  { time: '11:00', act: 'Incident & Problem Resolution', desc: 'Diagnose server performance issues, troubleshoot service failures, escalate to vendors when needed, and update incident tickets with resolution steps', duration: '1 hr', icon: <AlertTriangle size={14} /> },
  { time: '12:00', act: 'Lunch', desc: 'Step away from the console. Infrastructure problems benefit from fresh perspective — context switching during breaks improves diagnostic speed significantly', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '1:00', act: 'Project & Infrastructure Work', desc: 'Server builds, Azure VM deployments, VMware infrastructure upgrades, scripting automation tasks, or migrating on-premise workloads to cloud', duration: '2 hrs', icon: <Server size={14} /> },
  { time: '3:00', act: 'Documentation & Learning', desc: 'Update runbooks, write KB articles for the helpdesk, or study for Azure Administrator (AZ-104) or CompTIA Server+ certifications', duration: '1 hr', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Active Directory', cat: 'Identity' }, { name: 'Azure / Intune', cat: 'Cloud' },
  { name: 'VMware vCenter', cat: 'Virtualisation' }, { name: 'Veeam', cat: 'Backup' },
  { name: 'SCCM / Endpoint Mgr', cat: 'Mgmt' }, { name: 'Zabbix / PRTG', cat: 'Monitoring' },
  { name: 'PowerShell ISE', cat: 'Scripting' }, { name: 'WSUS / Patch Mgmt', cat: 'Patching' },
]

const WORK_ENVS = [
  { type: 'Hybrid', pct: 52 },
  { type: 'In-Office / On-Site', pct: 35 },
  { type: 'Remote', pct: 13 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Powered IT Operations (AIOps)', icon: <Sparkles size={20} />,
    desc: 'AIOps platforms correlate events across hundreds of systems, predict failures before they occur, and automate routine remediation tasks. Sysadmins using these tools spend less time on reactive firefighting and more on strategic infrastructure work.',
    tools: ['Azure Monitor AI', 'Dynatrace', 'Moogsoft', 'BigPanda'],
    borderColor: 'rgba(124,45,18,0.18)', bgColor: '#fff7ed', icoBg: 'rgba(124,45,18,0.12)', icoColor: '#7c2d12', tagBg: 'rgba(124,45,18,0.1)', tagColor: '#7c2d12', titleColor: '#7c2d12',
  },
  {
    title: 'Automation & Infrastructure as Code', icon: <Zap size={20} />,
    desc: 'Sysadmins who can write Ansible playbooks, Terraform modules, and PowerShell DSC configurations to provision and manage infrastructure at scale are in a completely different demand category than those who click through GUIs manually.',
    tools: ['Ansible', 'Terraform', 'PowerShell DSC', 'Bicep / ARM'],
    borderColor: 'rgba(67,56,202,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(67,56,202,0.12)', icoColor: '#4338ca', tagBg: 'rgba(67,56,202,0.1)', tagColor: '#4338ca', titleColor: '#4338ca',
  },
  {
    title: 'AI-Assisted Security & Compliance', icon: <TrendingUp size={20} />,
    desc: 'Microsoft Copilot for Security and similar AI tools now assist with vulnerability triage, compliance gap analysis, and automated policy enforcement. Sysadmins who leverage these tools harden infrastructure faster and with fewer gaps.',
    tools: ['Microsoft Copilot Security', 'Defender XDR', 'Qualys AI', 'Tenable One'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'Microsoft Azure Virtual Desktop (AVD)', 'Infrastructure as Code (Terraform/Bicep)',
  'Zero Trust Identity (Entra ID)', 'Kubernetes for Sysadmins',
  'Ansible for Windows Automation', 'Cloud Security Posture Management',
]

const PROS = [
  { title: 'Every Organisation Needs You', desc: 'Schools, hospitals, banks, factories, government — every organisation with IT infrastructure needs a systems administrator. Job security is structural and persistent.' },
  { title: 'Broad, Varied Day-to-Day Work', desc: 'No two days are identical. From building a server to troubleshooting an authentication failure to scripting a user provisioning workflow — variety is built into the role.' },
  { title: 'Clear Certification Progression', desc: 'CompTIA A+ → Network+ → Server+ → Azure Administrator is a well-defined, respected path that translates directly into salary increases at each milestone.' },
  { title: 'Strong Salaries at Senior Level', desc: 'Senior sysadmins and infrastructure architects in South Africa earn R900k–R1.6M+. Cloud-specialised administrators command significant premiums over purely on-premise roles.' },
  { title: 'Springboard into Cloud & DevOps', desc: 'Systems administration is the fastest on-ramp into cloud engineering, DevOps, and SRE roles. The infrastructure knowledge base transfers directly and reduces the learning gap dramatically.' },
  { title: 'Genuine Impact on Business Operations', desc: 'When systems run smoothly, the entire organisation is productive. When they don\'t, sysadmins are the heroes who restore order. The impact is immediate and visible.' },
]

const CONS = [
  { title: 'On-Call Responsibility', desc: 'Production servers don\'t respect working hours. Senior sysadmins are frequently on-call for critical infrastructure failures, including evenings, weekends, and holidays.' },
  { title: 'The "Invisible Until It Breaks" Problem', desc: 'Great systems administration is invisible — users notice infrastructure only when it fails. The most important preventative work rarely earns recognition, while failures earn immediate attention.' },
  { title: 'Legacy System Burden', desc: 'Many enterprise environments run 10-15 year old systems that cannot be easily modernised. Maintaining legacy Windows Server 2008 or ancient ERP infrastructure is unglamorous but common.' },
  { title: 'Security Responsibility Without Authority', desc: 'Sysadmins are often responsible for security compliance without the authority to enforce all the changes required. This tension between accountability and authority is a common frustration.' },
  { title: 'Perception vs DevOps/Cloud Roles', desc: 'Systems administration is sometimes perceived as less prestigious than DevOps or cloud-native roles. Career advancement requires deliberate upskilling into automation and cloud skills to avoid stagnation.' },
  { title: 'Physical Infrastructure Constraints', desc: 'Server rooms, data centres, and hardware failures often require physical presence. The role is less fully remote than purely software-focused careers.' },
]

const VIDEOS = [
  { id: 'RWnrRyVFHQk', title: 'Windows Server Administration — Full Course', desc: 'Complete Windows Server training covering Active Directory, Group Policy, DNS, DHCP, file servers, and remote desktop services from scratch.', dur: '6:32:14', channel: 'freeCodeCamp' },
  { id: 'ZtqBQ68cfJc', title: 'Linux Administration Bootcamp', desc: 'Master Linux system administration: user management, permissions, networking, services, shell scripting, and server hardening on Ubuntu and CentOS.', dur: '5:48:22', channel: 'freeCodeCamp' },
  { id: 'NKEPjRBHetQ', title: 'Microsoft Azure Administrator AZ-104', desc: 'Full AZ-104 exam preparation covering virtual machines, storage, networking, identity, and monitoring in Microsoft Azure.', dur: '11:14:38', channel: 'John Savill\'s Technical Training' },
]

const TAKEAWAYS = [
  'Build a home lab from day one — a single refurbished PC running VMware or Hyper-V teaches more than any course alone',
  'Master Active Directory deeply before anything else — it underpins identity and security in 90% of enterprise environments',
  'Learn PowerShell scripting early — every task you automate is time you get back for more strategic work',
  'Document everything you build and change — undocumented infrastructure is a liability that will cost you at 3am during an incident',
  'Start learning Azure now — cloud administration skills are rapidly becoming the baseline expectation, not a premium',
]

const CAREER_FACTS = [
  {
    icon: <Server size={20} />, title: 'What You Manage',
    desc: 'Windows and Linux servers, Active Directory and Azure AD, virtualisation platforms (VMware/Hyper-V), backup systems, patch management, endpoint management, and cloud infrastructure.',
    color: '#7c2d12',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Server provisioning, user and identity management, OS patching, backup and disaster recovery, performance monitoring, scripting and automation, incident response, and cloud migrations.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'End users who need accounts and access, network engineers managing the underlying infrastructure, security teams auditing your systems, and management expecting high availability.',
    color: '#4338ca',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'Every organisation with more than 20 employees needs systems administration expertise. Cloud adoption is changing the tools but not the demand — cloud sysadmins are among the most sought-after IT professionals globally.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🖥️', title: 'You Keep the Business Running', desc: 'Email, file shares, authentication, printing, business applications — sysadmins keep everything operational. When you do your job well, the entire organisation is productive.' },
  { emoji: '💰', title: 'Excellent Salaries With Clear Steps', desc: 'CompTIA A+ through Azure Administrator is one of the most defined certification paths in IT, with each step translating directly to a salary increase at each level.' },
  { emoji: '🏢', title: 'Every Industry, Every Company', desc: 'Healthcare, finance, education, government, manufacturing — every sector needs sysadmins. This breadth gives unmatched job security and industry mobility.' },
  { emoji: '☁️', title: 'Perfect Springboard to Cloud', desc: 'No other role provides a faster on-ramp to cloud engineering. The infrastructure knowledge you build as a sysadmin is exactly what cloud architects need — and cloud sysadmins earn significantly more.' },
  { emoji: '🤖', title: 'Automation Is Making It More Interesting', desc: 'PowerShell, Ansible, and Terraform are transforming sysadmin work from repetitive manual tasks to engineering automation. The role is evolving rapidly toward infrastructure engineering.' },
  { emoji: '🔒', title: 'Central to Every Security Strategy', desc: 'Systems administrators manage the attack surface of the entire organisation. Adding security knowledge (CIS benchmarks, endpoint protection, patch compliance) dramatically increases your value.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#7c2d12', bgColor: '#fff7ed', items: [
    { name: 'Microsoft Learn — Azure Administrator Path', url: '#', type: 'Course', rating: 5 },
    { name: 'Professor Messer — CompTIA A+ / Server+', url: '#', type: 'Course', rating: 5 },
    { name: 'TechNet & Microsoft Docs (always free)', url: '#', type: 'Docs', rating: 5 },
    { name: 'Linux Foundation — Introduction to Linux', url: '#', type: 'Course', rating: 4 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'Azure Free Tier (12 months, $200 credit)', url: '#', type: 'Lab', rating: 5 },
    { name: 'VirtualBox + Ubuntu Server (free)', url: '#', type: 'Lab', rating: 5 },
    { name: 'Windows Server Evaluation (180-day free ISO)', url: '#', type: 'Lab', rating: 5 },
    { name: 'OverTheWire — Linux command practice', url: '#', type: 'Practice', rating: 4 },
  ]},
  { category: 'Community', color: '#4338ca', bgColor: '#eef2ff', items: [
    { name: 'John Savill\'s Technical Training (YouTube)', url: '#', type: 'YouTube', rating: 5 },
    { name: 'r/sysadmin — 900k member community', url: '#', type: 'Forum', rating: 5 },
    { name: 'Packet Pushers — Heavy Networking Podcast', url: '#', type: 'Podcast', rating: 4 },
    { name: 'Ned Pyle\'s Active Directory blog (Microsoft)', url: '#', type: 'Blog', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Systems Administrator', range: 'R260k – R460k', midpoint: 360, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Systems Administrator', range: 'R500k – R900k', midpoint: 700, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Systems Administrator', range: 'R900k – R1.5M', midpoint: 1200, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'IT / Infrastructure Architect', range: 'R1.6M – R2.8M+', midpoint: 2100, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'No Home Lab, No Real Learning',
    desc: 'Reading about Active Directory and watching tutorials without configuring it yourself produces theoretical knowledge that evaporates under interview pressure and fails in production.',
    fix: 'Set up a home lab in week one. Run Windows Server and Ubuntu in VMware/VirtualBox on any PC with 16GB RAM. Build AD, promote a domain controller, create GPOs.',
  },
  {
    num: '02', title: 'Ignoring PowerShell',
    desc: 'Sysadmins who refuse to script are constrained to manual, repetitive work. Every task you automate is time you get back — and organisations specifically seek administrators who reduce operational toil.',
    fix: 'Write one PowerShell script per week. Start with user creation from a CSV, then move to automated reports, then server health checks.',
  },
  {
    num: '03', title: 'No Documentation Habit',
    desc: 'Undocumented servers are a liability. When you leave or are unavailable during an incident, poorly documented infrastructure creates chaos. Employers and teams notice documentation quality.',
    fix: 'Document every lab build, every production change, every procedure. Treat it as inseparable from the technical work itself.',
  },
  {
    num: '04', title: 'No Backup & DR Testing',
    desc: 'Many sysadmins implement backup systems but never test restores. An untested backup is not a backup — it is false confidence. Real DR skills require practising restoration, not just monitoring backup jobs.',
    fix: 'Restore from backup in your lab regularly. Test bare-metal recovery. Know your RTO and RPO. Make DR testing a monthly exercise.',
  },
  {
    num: '05', title: 'Avoiding Cloud Skills',
    desc: 'Sysadmins who only know on-premise infrastructure are building a shrinking career path. Cloud administration — especially Microsoft Azure and Intune — is now a baseline expectation at most organisations.',
    fix: 'Start the Azure free tier today. Complete the AZ-900 foundations exam, then pursue AZ-104 (Azure Administrator). This one investment changes your salary trajectory.',
  },
  {
    num: '06', title: 'Security as Someone Else\'s Problem',
    desc: 'Systems administrators manage the attack surface of the entire organisation. Treating security as the security team\'s problem — while running unpatched servers and weak password policies — creates systemic risk.',
    fix: 'Study the CIS benchmarks for Windows and Linux. Implement them in your lab. Make patch compliance a non-negotiable personal standard.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'IT Helpdesk / Desktop Support',
    ease: 'Natural Fit', easeColor: '#7c2d12', easeBg: '#fff7ed',
    desc: 'The most common and natural transition in IT. You already understand the environment, the users, and the ticketing systems. Adding server skills and AD knowledge is a direct and well-trodden path.',
    steps: ['Earn CompTIA A+ if not already certified', 'Build a home lab with Windows Server and AD', 'Study for CompTIA Server+ or AZ-900 / AZ-104', 'Apply for junior sysadmin or IT administrator roles'],
  },
  {
    from: 'Network Engineer',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Network engineers already understand infrastructure deeply. Adding server administration, Active Directory, and virtualisation skills creates a highly capable infrastructure engineer who can own the entire stack.',
    steps: ['Learn Windows Server and Active Directory fundamentals', 'Get comfortable with VMware vSphere or Hyper-V', 'Add PowerShell scripting to your automation skills', 'Target infrastructure engineer or senior IT roles'],
  },
  {
    from: 'Developer / Software Engineer',
    ease: 'Very Achievable', easeColor: '#4338ca', easeBg: '#eef2ff',
    desc: 'Developers who move into systems administration bring scripting and automation skills that are genuinely rare. The gap is understanding enterprise infrastructure — AD, Group Policy, backup, and server management — which is learnable.',
    steps: ['Study Windows Server and Active Directory architecture', 'Learn VMware vSphere and enterprise infrastructure patterns', 'Apply your scripting skills to PowerShell / Ansible', 'Target DevOps-adjacent or cloud infrastructure roles'],
  },
  {
    from: 'Other Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Domain knowledge from healthcare, finance, or education combined with sysadmin skills is valuable. Industry-specific compliance requirements (HIPAA, POPIA, ISO 27001) make domain-aware administrators highly sought-after.',
    steps: ['Start with CompTIA IT Fundamentals (ITF+) or A+', 'Build a Windows Server home lab from scratch', 'Earn AZ-900 and then AZ-104 (Azure Administrator)', 'Target companies in your previous industry vertical'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'OS Foundations', color: '#7c2d12', bg: '#fff7ed', days: [
    { day: 'Day 1–2', task: 'Download and install VMware Workstation Player (free) or VirtualBox. Create a Windows Server 2022 Evaluation VM (free ISO from Microsoft).' },
    { day: 'Day 3–4', task: 'Install Windows Server 2022. Explore Server Manager, install roles and features, configure static IP, and enable Remote Desktop.' },
    { day: 'Day 5–6', task: 'Install Ubuntu Server 22.04 in a second VM. Practice basic Linux commands: ls, cd, chmod, chown, systemctl, journalctl, nano/vim.' },
    { day: 'Day 7', task: 'Create a simple Bash script that checks disk usage, memory, and CPU load and outputs a system health report. Run it on your Linux VM.' },
  ]},
  { week: 'Week 2', theme: 'Active Directory', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Promote your Windows Server VM to a Domain Controller. Create a new AD domain (e.g., lab.local). Understand the AD database and SYSVOL.' },
    { day: 'Day 10–11', task: 'Create Organizational Units, user accounts, and security groups in Active Directory Users and Computers. Join a second Windows VM to the domain.' },
    { day: 'Day 12–13', task: 'Create your first Group Policy Object. Enforce a password policy, deploy a desktop wallpaper, and map a network drive via GPO.' },
    { day: 'Day 14', task: 'Configure DNS and DHCP on your domain controller. Test name resolution and dynamic IP assignment. Document your entire lab topology.' },
  ]},
  { week: 'Week 3', theme: 'Scripting & Cloud', color: '#4338ca', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Open PowerShell ISE. Write scripts to: create 10 AD users from an array, list all computers in a domain, and check all services status.' },
    { day: 'Day 17–18', task: 'Create a free Microsoft Azure account. Deploy a Windows Server VM and a Linux VM in Azure. Configure NSG rules to allow RDP and SSH.' },
    { day: 'Day 19–20', task: 'Set up Azure AD (Entra ID) in your free tenant. Create users, assign roles, and explore conditional access policies.' },
    { day: 'Day 21', task: 'Install Veeam Community Edition (free). Back up your AD lab VM. Practice restoring an individual file from the backup to verify it works.' },
  ]},
  { week: 'Week 4', theme: 'Certify & Apply', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Take a CompTIA A+ or AZ-900 practice exam. Identify weak areas. Study Microsoft Learn modules for the topics you missed.' },
    { day: 'Day 25–26', task: 'Document your entire lab in a README or Notion page: architecture diagram, step-by-step build guide, GPOs created, scripts written.' },
    { day: 'Day 27–28', task: 'Register for CompTIA A+, CompTIA Server+, or AZ-900 exam — whichever aligns with your current level. Book it within 6 weeks to create a deadline.' },
    { day: 'Day 29–30', task: 'Update your LinkedIn with your lab project and skills. Apply to 5 junior sysadmin or IT administrator roles. Start studying for your booked exam.' },
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
      try { await navigator.share({ title: 'Systems Administrator Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Systems Administrator in 2026', url: window.location.href }) } catch (_) {}
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/systems-administrator'}</span>
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

export default function SystemsAdministratorRoadmapPage() {
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

      <div className="relative w-full" style={{ background: C.bg }}>
        <div className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: 600 }}>
          <img src="https://i.imgur.com/6O5ISr2_d.webp?maxwidth=760&fidelity=grand" alt="Systems Administrator server room" className="w-full h-full object-cover object-center block" style={{ filter: 'saturate(0.55) brightness(1.05)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Server size={12} /> Infrastructure & Operations
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Systems Administrator
              </h1>
              <span className="block font-normal mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', color: C.textMuted }}>Career Roadmap 2026</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><Clock size={14} style={{ color: C.textFaint }} /> 20 min read</div>
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><BookOpen size={14} style={{ color: C.textFaint }} /> 16 sections</div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-8 pt-6 pb-16">
          <p className="text-base leading-relaxed" style={{ color: '#4b5563', maxWidth: 560, marginLeft: 140 }}>
            Keep the enterprise running. Systems administrators manage the servers, identity systems, and infrastructure that every employee and business process depends on — from Active Directory to Azure cloud.
          </p>
          <div className="h-px mt-10" style={{ background: C.border }} />
        </div>
      </div>

      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={introRef}>
          <SectionHeader icon={<BookOpen size={22} />} title="What's Inside" subtitle="Everything you need to know about this career in one place" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {TOC_ITEMS.map(item => (
              <div key={item.num} className="flex items-center gap-2.5 rounded-xl px-3.5 py-3 border transition-all duration-150 cursor-default hover:shadow-sm" style={{ background: C.bg, borderColor: C.border }}>
                <span className="font-mono text-xs font-bold flex-shrink-0" style={{ color: C.textFaint }}>{item.num}</span>
                <span className="text-xs font-medium" style={{ color: C.text }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div></div>
      </section>

      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={whatRef}>
          <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Systems Administration" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#fff7ed', borderColor: 'rgba(124,45,18,0.2)' }}>
            <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
              A <strong style={{ color: C.primary }}>Systems Administrator</strong> manages the servers, operating systems, identity infrastructure, and business-critical services that keep an organisation running. From provisioning a new employee's account to recovering a failed domain controller at 3am, sysadmins are the operational backbone of every enterprise IT environment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CAREER_FACTS.map(f => (
              <div key={f.title} className="flex gap-4 rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style={{ background: C.bg, borderColor: C.border }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${f.color}12` }}><span style={{ color: f.color }}>{f.icon}</span></div>
                <div>
                  <div className="text-sm font-bold mb-1.5" style={{ color: C.text }}>{f.title}</div>
                  <div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div></div>
      </section>

      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={whyRef}>
          <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Systems Administration could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
        </div></div>
      </section>

      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={dayRef}>
          <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Systems Administrator workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
          <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
            <div>
              <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
              {SCHEDULE.map(item => (
                <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,45,18,0.3)'; (e.currentTarget as HTMLElement).style.background = '#fff7ed' }}
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
        </div></div>
      </section>

      <section ref={tlSectionRef} className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={tlRef}>
          <SectionHeader icon={<Clock size={22} />} title="Career Timeline" subtitle="Time estimates and salary ranges for each level" iconBg={C.indigoLight} iconColor={C.indigo} />
          <div className="mb-10">
            <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → IT Architect</span></div>
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
        </div></div>
      </section>

      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div ref={stepsRef} className="max-w-2xl mx-auto px-4">
          <SectionHeader icon={<Target size={22} />} title="Step-by-Step Roadmap" subtitle="Your path from complete beginner to job-ready" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="relative flex flex-col items-center">
            {ROADMAP_STEPS.map((s, i) => {
              const icons = ['🖥️', '🏢', '💻', '⚙️', '🛡️', '☁️']
              const accentColors = ['#7c2d12', '#16a34a', '#7c2d12', '#16a34a', '#7c2d12', '#16a34a']
              const accent = accentColors[i]; const isLast = i === ROADMAP_STEPS.length - 1; const isEven = i % 2 === 0
              return (
                <div key={s.step} className="w-full flex flex-col items-center">
                  <div className="w-full" style={{ opacity: 0, transform: 'translateY(20px)', transition: `opacity 0.5s ${i * 0.13}s ease, transform 0.5s ${i * 0.13}s ease` }}
                    ref={el => { if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect() } }, { threshold: 0.15 }); obs.observe(el) }}>
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #4338ca 100%)`, boxShadow: '0 8px 48px rgba(124,45,18,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>10–14 months · Consistent daily practice · Build and manage real infrastructure</div>
            </div>
          </div>
          
        </div>
      </section>

      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={skillsRef}>
          <SectionHeader icon={<CheckCircle2 size={22} />} title="Skill Checkpoints" subtitle="Technical and interpersonal skills to develop" iconBg={C.indigoLight} iconColor={C.indigo} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-7 border" style={{ background: C.bg, borderColor: C.border }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.indigoLight }}><Code size={16} style={{ color: C.indigo }} /></div>
                <div><div className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Hard Skills</div><div className="text-xs mt-0.5" style={{ color: C.textMuted }}>Technical competencies required</div></div>
              </div>
              <div ref={barsContainerRef}>
                {HARD_SKILLS.map(s => (
                  <div key={s.name} className="mb-4">
                    <div className="flex justify-between mb-1.5"><span className="text-xs" style={{ color: C.textMuted }}>{s.name}</span><span className="text-xs font-mono" style={{ color: C.textFaint }}>{s.level}%</span></div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                      <div className="h-1.5 rounded-full" data-bar-w={s.level} style={{ width: 0, background: `linear-gradient(90deg, ${C.primary}, #4338ca)` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-7 border" style={{ background: C.bg, borderColor: C.border }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.primaryLight }}><MessageSquare size={16} style={{ color: C.primary }} /></div>
                <div><div className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Soft Skills</div><div className="text-xs mt-0.5" style={{ color: C.textMuted }}>Interpersonal abilities to build</div></div>
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
        </div></div>
      </section>

      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={eduRef}>
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
        </div></div>
      </section>

      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={freeRef}>
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
        </div></div>
      </section>

      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={aiRef}>
          <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Systems Administration in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#fff7ed', borderColor: 'rgba(124,45,18,0.2)', color: C.textMuted }}>
            AI tools don't replace systems administrators — they <em style={{ color: C.primary }}>amplify</em> them. Administrators who embrace AIOps, automation, and AI-assisted security monitoring resolve incidents faster, maintain more systems, and deliver higher reliability with the same headcount.
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
        </div></div>
      </section>

      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={pcRef}>
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
        </div></div>
      </section>

      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={salaryRef}>
          <SectionHeader icon={<DollarSign size={22} />} title="Salary" subtitle="What you can realistically earn at each stage" iconBg={C.greenLight} iconColor={C.green} />
          <div className="rounded-2xl p-6 mb-6 border" style={{ background: '#f0fdf4', borderColor: 'rgba(22,163,74,0.2)' }}>
            <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Azure and cloud-specialised administrators earn 20–40% more. Global remote contracts for senior roles can pay 2–3× in USD.</p>
          </div>
          <div className="space-y-4">
            {SALARY_DATA.map(row => (
              <div key={row.role} className="rounded-2xl p-5 border" style={{ background: '#f8f9ff', borderColor: C.border }}>
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <div><span className="text-sm font-bold" style={{ color: C.text }}>{row.role}</span><span className="ml-3 text-xs font-mono" style={{ color: C.textFaint }}>{row.yoe}</span></div>
                  <span className="text-sm font-bold" style={{ color: row.color }}>{row.range}</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                  <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 3200) * 100}%`, background: row.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#fff7ed', borderColor: 'rgba(124,45,18,0.2)' }}>
            <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
              <strong style={{ color: C.primary }}>Pro tip:</strong> Sysadmins at financial institutions, healthcare systems, and cloud-first companies earn 30–50% more than those at IT service providers. Add Azure Administrator (AZ-104) and Intune to your credentials — they are the fastest salary accelerators in this career.
            </p>
          </div>
        </div></div>
      </section>

      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={mistakesRef}>
          <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring sysadmins" iconBg={C.orangeLight} iconColor={C.orange} />
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
        </div></div>
      </section>

      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={changeRef}>
          <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into systems administration from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
        </div></div>
      </section>

      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={planRef}>
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
        </div></div>
      </section>

      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={vidsRef}>
          <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Systems Administration" iconBg={C.redLight} iconColor={C.red} />
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
        </div></div>
      </section>

      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={finalRef}>
          <SectionHeader icon={<Award size={22} />} title="Final Thoughts" subtitle="What we want you to take away from this guide" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="rounded-2xl p-6 border mb-8" style={{ background: C.bg, borderColor: C.border }}>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#374151' }}>
              Systems administration is the discipline that <strong style={{ color: C.primary }}>keeps the enterprise operational</strong>. Every employee who logs in, every email that is sent, every business application that runs — it all depends on the infrastructure that sysadmins build, maintain, and secure.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
              The role is evolving rapidly into cloud administration and infrastructure engineering, creating an exciting transition opportunity for those who invest in cloud skills alongside traditional on-premise expertise. The fundamentals never go stale — and the cloud layer multiplies their value.
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
        </div></div>
      </section>

      <div className="max-w-4xl mx-auto px-8" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="relative overflow-hidden rounded-3xl px-12 py-16 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #4338ca 100%)` }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: 'rgba(255,255,255,0.05)', top: -120, right: -80 }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Rocket size={30} style={{ color: '#fff' }} />
          </div>
          <h2 className="font-extrabold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>Ready to Start Your Journey?</h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to spin up a VM and promote your first domain controller.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start building today. Your future self will thank you.</p>
        </div>
        <ShareBar />
      </div>
    </div>
  )
}