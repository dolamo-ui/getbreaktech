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
  Shield,
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
  primary: '#7c3aed',
  primaryLight: 'rgba(124,58,237,0.08)',
  primaryMid: 'rgba(124,58,237,0.15)',
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
    level: 'Junior', title: 'Project Coordinator', duration: '0–2 yrs', salary: 'R260k–R460k',
    description: 'Support senior PMs with scheduling, status reporting, meeting coordination, and risk tracking. Learn project management tools, update plans, and own administrative delivery tasks.',
    skills: ['MS Project / Jira', 'Status Reporting', 'Meeting Facilitation', 'Risk Logging'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Project Manager', duration: '2–5 yrs', salary: 'R580k–R1.0M',
    description: 'Own project delivery end-to-end. Define scope, build project plans, manage budgets up to R5M, run steering committees, and coordinate cross-functional delivery teams of 5–15 people.',
    skills: ['Scope Management', 'Budget Control', 'Stakeholder Mgmt', 'PMP / CAPM'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Project Manager', duration: '5–8 yrs', salary: 'R1.0M–R1.8M',
    description: 'Lead complex multi-workstream programmes, manage executive stakeholders, control budgets of R10M+, define PM methodology and governance frameworks, and mentor junior PMs.',
    skills: ['Programme Mgmt', 'Executive Comms', 'Budget R10M+', 'PMO Leadership'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'Programme Director / PMO Head', duration: '8+ yrs', salary: 'R2M+',
    description: 'Lead the entire portfolio of delivery programmes, define organisational PM standards, sit on executive committees, and drive strategic transformation agendas at board level.',
    skills: ['Portfolio Mgmt', 'PMO Strategy', 'Org Transformation', 'Board Reporting'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Project Management Fundamentals',
    description: 'Study the PMBOK Guide — the global standard for project management knowledge. Understand the five process groups: Initiating, Planning, Executing, Monitoring & Controlling, and Closing. Learn the ten knowledge areas. Grasp the triple constraint: scope, schedule, and cost — and how every PM decision balances them.',
    duration: '1–2 months', skills: ['PMBOK Guide', 'Triple Constraint', 'Project Lifecycle', 'PM Terminology'],
  },
  {
    step: 2, title: 'Planning, Scheduling & Scope Management',
    description: 'Master the planning phase — the most critical PM skill. Learn Work Breakdown Structures (WBS), Gantt charts, critical path method (CPM), resource levelling, and dependency mapping. Study scope management: how to write a project scope statement and manage scope creep without damaging stakeholder relationships.',
    duration: '2–3 months', skills: ['WBS & Gantt Charts', 'Critical Path Method', 'Scope Management', 'MS Project / Smartsheet'],
  },
  {
    step: 3, title: 'Budget Management & Risk',
    description: 'Learn earned value management (EVM) to track project performance against baseline. Build and manage project budgets, track burn rates, and forecast at completion. Study risk management: identification, qualitative and quantitative analysis, response planning, and risk registers. A PM who can\'t manage money and risk is not a PM.',
    duration: '2–3 months', skills: ['Earned Value Mgmt', 'Budget Forecasting', 'Risk Register', 'Risk Response Planning'],
  },
  {
    step: 4, title: 'Agile, Scrum & Hybrid Delivery',
    description: 'Modern projects rarely run pure waterfall. Learn Scrum deeply — sprints, ceremonies, velocity, and backlogs. Understand Kanban for operational delivery and SAFe for large enterprise programmes. Master the hybrid PM approach: blending Agile flexibility with waterfall governance structures that corporates require.',
    duration: '1–2 months', skills: ['Scrum / Agile', 'SAFe for PMs', 'Hybrid Delivery', 'Kanban Boards'],
  },
  {
    step: 5, title: 'Stakeholder Management & Leadership',
    description: 'A project plan is worthless without people who support it. Study stakeholder mapping, influence strategies, and change management. Learn how to run effective steering committees, present to executives, and manage sponsor expectations. Build the conflict resolution skills that keep delivery on track when people disagree.',
    duration: '2–3 months', skills: ['Stakeholder Mapping', 'Executive Reporting', 'Conflict Resolution', 'Change Management'],
  },
  {
    step: 6, title: 'Certification, Specialisation & PMO',
    description: 'Certify your knowledge with PMP (gold standard, requires 36 months experience), CAPM (entry-level), or PRINCE2 (popular in UK and South Africa). Specialise in a delivery domain: IT projects, construction, financial services, or digital transformation. Study PMO governance to lead at portfolio level.',
    duration: '3–4 months', skills: ['PMP / PRINCE2', 'PMO Governance', 'Portfolio Mgmt', 'Benefits Realisation'],
  },
]

const HARD_SKILLS = [
  { name: 'Project Planning & Scheduling', level: 95 },
  { name: 'Stakeholder Management', level: 93 },
  { name: 'Budget & Cost Management', level: 88 },
  { name: 'Risk Management', level: 85 },
  { name: 'Agile / Scrum', level: 82 },
  { name: 'MS Project / Smartsheet', level: 78 },
  { name: 'PMO Governance', level: 70 },
  { name: 'Benefits Realisation', level: 65 },
]

const SOFT_SKILLS = [
  { name: 'Leadership Without Authority', description: 'PMs rarely have direct authority over project team members, who report to functional managers. The ability to motivate, align, and direct people through influence — not hierarchy — is the single most important PM skill.' },
  { name: 'Communication Precision', description: 'A status report that confuses executives costs projects. PMs communicate the right information to the right people at the right time — concisely, accurately, and at the right level of detail for each audience.' },
  { name: 'Decisive Problem Solving', description: 'Projects hit problems daily. The PM who freezes under ambiguity creates delay. The PM who moves fast, makes a decision with available information, and pivots when wrong keeps delivery on track.' },
  { name: 'Calm Under Pressure', description: 'Red projects, executive escalations, and vendor failures are part of every PM\'s career. The ability to remain composed, think clearly, and project confidence during a crisis is what separates good PMs from great ones.' },
  { name: 'Negotiation', description: 'PMs negotiate constantly: with vendors on SLAs, with sponsors on scope changes, with resource managers on team allocation, and with team members on timelines. This is a craft that must be deliberately developed.' },
  { name: 'Scope Change Management', description: 'Every stakeholder believes their new request is urgent and out of scope. Managing change requests with discipline — logging them, assessing impact, and getting sponsor sign-off — is what keeps project baselines meaningful.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Business / Management Degree', duration: '3–4 years', cost: 'R350k – R900k',
    borderColor: 'rgba(124,58,237,0.2)', bgColor: '#faf5ff', typeBg: 'rgba(124,58,237,0.12)', typeColor: '#7c3aed',
    pros: ['Strong business, finance, and leadership foundations', 'Graduate programme access at large corporates', 'High credibility for senior PM and PMO roles', 'Network of future business leaders'],
    cons: ['Slow and expensive path to first PM role', 'Rarely teaches PMBOK, Agile, or Jira', 'Most PM skills are learned on the job regardless', 'Entry-level PM roles still require a PMP or experience'],
  },
  {
    type: 'Bootcamp', title: 'PM Certification Bootcamp', duration: '2–4 months', cost: 'R15k – R60k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Fast path to CAPM / PRINCE2 Foundation certification', 'Practical tools: MS Project, Jira, risk templates', 'Career support and employer networks', 'Focused, outcome-oriented curriculum'],
    cons: ['Highly variable programme quality', 'Doesn\'t replace domain experience for complex programmes', 'Credential alone won\'t unlock senior roles', 'PMP requires 36 months experience regardless of course'],
  },
  {
    type: 'Self-Taught', title: 'PMBOK, Online Courses & Projects', duration: '12–18 months', cost: 'R0 – R12k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['PMBOK 7th Edition is accessible and widely studied', 'Free Agile / Scrum content widely available', 'Volunteer to PM a real project from day one', 'CAPM exam accessible with no experience required'],
    cons: ['Requires significant self-discipline and initiative', 'Hard to get first PM role without a portfolio or mentor', 'Easy to develop theory without practical delivery experience', 'PMP requires 36 months documented experience minimum'],
  },
]

const SCHEDULE = [
  { time: '8:30', act: 'Morning Status Review', desc: 'Review overnight RAG status updates from workstream leads, check project dashboards, flag risks for the daily standup, and prepare the executive summary for the steering committee', duration: '30 min', icon: <Monitor size={14} /> },
  { time: '9:00', act: 'Daily Standup / Scrum', desc: 'Run a 15-minute standup with the project team. Surface blockers, confirm priorities, and track action items. A PM who runs tight standups saves hours of wasted time weekly.', duration: '15–30 min', icon: <Users size={14} /> },
  { time: '9:30', act: 'Stakeholder Management', desc: 'Respond to sponsor queries, manage scope change requests, prepare for the afternoon steering committee, and navigate the political dynamics that determine whether the project gets support.', duration: '1.5 hrs', icon: <MessageSquare size={14} /> },
  { time: '11:00', act: 'Risk & Issue Management', desc: 'Review the risk register, update issue logs, escalate critical items, and work through mitigation actions with workstream leads. Risk management is daily work, not a quarterly exercise.', duration: '1 hr', icon: <Shield size={14} /> },
  { time: '1:00', act: 'Lunch & Recovery', desc: 'Project management is emotionally intensive. A proper lunch break away from the laptop resets focus for the afternoon — especially before a difficult steering committee conversation.', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Steering Committee / Reporting', desc: 'Present RAG status, budget burn, milestone progress, risks, and decisions required to executive sponsors. The quality of your pack determines the quality of the decision you walk out with.', duration: '1.5 hrs', icon: <FileText size={14} /> },
  { time: '3:30', act: 'Planning & Schedule Updates', desc: 'Update the project plan, rebaseline tasks, process approved change requests, and update the RAID log. Planning is never finished — it\'s continuously refined throughout the project lifecycle.', duration: '1 hr', icon: <Calendar size={14} /> },
  { time: '4:30', act: 'Professional Development', desc: 'Study PMBOK chapters, track PMP PDUs, read PM blogs (PMI, PMI-ACP), or mentor a junior coordinator. The best PMs invest in their craft as deliberately as developers invest in code.', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'MS Project', cat: 'Scheduling' }, { name: 'Jira / Azure DevOps', cat: 'Agile' },
  { name: 'Smartsheet', cat: 'Planning' }, { name: 'Confluence / Notion', cat: 'Documentation' },
  { name: 'Power BI', cat: 'Reporting' }, { name: 'MS Teams / Slack', cat: 'Communication' },
  { name: 'Excel', cat: 'Budget Tracking' }, { name: 'Miro', cat: 'Workshops' },
]

const WORK_ENVS = [
  { type: 'Hybrid', pct: 62 },
  { type: 'In-Office', pct: 24 },
  { type: 'Remote', pct: 14 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Assisted Project Planning', icon: <Sparkles size={20} />,
    desc: 'AI tools can now generate first-draft project plans from scope statements, identify missing tasks based on project type, flag unrealistic timelines, and suggest resource allocation patterns from historical data. PMs using AI planning tools report 35% faster project kick-off cycles.',
    tools: ['Microsoft Copilot', 'Asana AI', 'ClickUp AI', 'Notion AI'],
    borderColor: 'rgba(124,58,237,0.18)', bgColor: '#faf5ff', icoBg: 'rgba(124,58,237,0.12)', icoColor: '#7c3aed', tagBg: 'rgba(124,58,237,0.1)', tagColor: '#7c3aed', titleColor: '#7c3aed',
  },
  {
    title: 'Predictive Risk Intelligence', icon: <Zap size={20} />,
    desc: 'AI-powered portfolio tools analyse project health signals — velocity trends, issue escalation patterns, budget burn rates — and predict which projects are likely to go red weeks before they do. PMs who act on early warnings recover projects before executives escalate.',
    tools: ['Planview AI', 'Workfront AI', 'Broadcom Clarity', 'Datadog'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'Automated Reporting & Status', icon: <TrendingUp size={20} />,
    desc: 'AI can now aggregate data from Jira, Smartsheet, and financial systems to auto-generate weekly status reports, RAG dashboards, and executive summaries — reducing report preparation from 3 hours to 20 minutes and freeing PMs for actual delivery work.',
    tools: ['Power BI AI', 'Tableau AI', 'Copilot for M365', 'ChatGPT'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'AI-Augmented Project Planning', 'Sustainability & ESG Project Delivery',
  'Portfolio-Level OKR Management', 'Agile at Scale (SAFe 6.0)',
  'Benefits Realisation Frameworks', 'Digital Transformation Programme Management',
]

const PROS = [
  { title: 'You Own the Outcome', desc: 'PMs are accountable for whether projects succeed or fail. This responsibility comes with visibility. A PM who delivers a R100M programme on time and budget is remembered — and rewarded — for years.' },
  { title: 'Transferable Across Every Industry', desc: 'Project management works in construction, IT, healthcare, finance, government, and mining. Once you have the skill, you are never locked into one sector — an option almost no other career provides.' },
  { title: 'Clear Certification & Career Path', desc: 'CAPM → PMP → Programme Director is one of the clearest, most globally recognised career paths in business. PMI certifications are understood and valued in over 200 countries.' },
  { title: 'High Earning Potential', desc: 'Senior PMs and Programme Directors at large South African corporations and banks earn R1.8M–R3M+. International contracting for USD-paying clients significantly increases this ceiling.' },
  { title: 'Constant Variety', desc: 'Every project is different — new problem, new team, new domain. PMs never stop learning. The variety of challenges keeps the role intellectually stimulating across an entire career.' },
  { title: 'Natural Path to Executive Leadership', desc: 'Programme Director → Head of PMO → COO is a well-worn leadership path. PMs develop exactly the organisational, financial, and human skills that senior leadership requires.' },
]

const CONS = [
  { title: 'Everything That Goes Wrong Is Your Problem', desc: 'Vendor delivers late? Your problem. Developer quits mid-sprint? Your problem. Scope changes approved without budget? Still your problem. The PM carries the weight of every delivery failure regardless of the actual cause.' },
  { title: 'Constant Stakeholder Pressure', desc: 'Sponsors want it faster. Finance wants it cheaper. The business wants more scope. Your team needs more time. Balancing these competing pressures without breaking any relationship is exhausting work.' },
  { title: 'Meeting Fatigue is Real', desc: 'A PM\'s calendar fills with standups, steering committees, risk reviews, planning sessions, and status calls. Protecting time to actually do focused PM work requires deliberate boundary-setting.' },
  { title: 'PMP is Expensive and Time-Gated', desc: 'The PMP requires 36 months of project management experience before you can even sit the exam. The entry barrier is real, and the cost (exam fees, study materials, PDUs) adds up to R20k–R50k.' },
  { title: 'Accountability Without Full Control', desc: 'PMs are responsible for outcomes they cannot fully control. Team members report to functional managers. Budgets are controlled by finance. Timelines are dictated by business events. You own the result but not the levers.' },
  { title: 'Scope Creep Never Stops', desc: '"While we\'re at it, can we just add..." is the sentence that has derailed more projects than any technical failure. Managing scope creep with discipline while maintaining stakeholder goodwill is an ongoing PM battle.' },
]

const VIDEOS = [
  { id: 'RDzHKGXix7Y', title: 'Project Management Full Course 2025', desc: 'Complete introduction to project management — covering PMBOK, Agile, risk, stakeholder management, and the PMP certification pathway for aspiring project managers.', dur: '6:20:00', channel: 'Simplilearn' },
  { id: 'GnK_n9Cv0hk', title: 'How to Pass the PMP Exam on Your First Try', desc: 'Proven PMP exam strategy — domain breakdown, question types, application process, and the study plan that gets you certified without wasting months on the wrong material.', dur: '1:34:20', channel: 'Andrew Ramdayal' },
  { id: 'Nj0bpMbqEkc', title: 'Agile Project Management Full Course', desc: 'Master Agile PM for modern delivery — sprints, ceremonies, velocity tracking, hybrid waterfall-agile delivery, and how PMs operate inside Scrum teams.', dur: '2:15:45', channel: 'freeCodeCamp' },
]

const TAKEAWAYS = [
  'The project plan is not the project — the conversations, decisions, and relationships around it are; keep the plan updated but never mistake documentation for delivery',
  'Every scope change must go through formal change control — verbal approval from a sponsor is not approval, and undocumented changes will cost you at go-live',
  'Build your stakeholder relationships before you need them — a sponsor who trusts you will defend your project in the budget meeting you\'re not invited to',
  'Risk management is daily work, not a quarterly exercise — the risk you spotted and mitigated early is the crisis that never made headlines',
  'PMP certification dramatically improves your salary and credibility — start accumulating your 36 months of documented experience from your very first project coordinator role',
]

/* ─── NEW SECTIONS ────────────────────────────────────────────────────────── */

const CAREER_FACTS = [
  {
    icon: <Target size={20} />, title: 'What You Deliver',
    desc: 'Project charters, WBS plans, RAID logs, budget forecasts, Gantt charts, steering committee packs, stakeholder maps, risk registers, change control logs, lessons learned reports, and the final deliverable — on time, on budget, in scope.',
    color: '#7c3aed',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Project planning, scope definition, budget management, risk identification and mitigation, stakeholder communication, team coordination, change management, vendor management, reporting, and benefits realisation tracking.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Executive sponsors approving funding, business owners defining requirements, technical teams delivering solutions, business analysts defining requirements, finance teams tracking budgets, vendors supplying services, and end users receiving the change.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'PMI estimates 25 million new project management roles will be needed globally by 2030. South African demand is strongest in banking, mining, telecommunications, and government infrastructure — all running large-scale transformation programmes.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🏆', title: 'You Own the Most Visible Work', desc: 'Projects are where strategy becomes reality. The PM who delivered the new core banking system, the national infrastructure programme, or the ERP migration is remembered at every company they\'ve ever worked for.' },
  { emoji: '💰', title: 'Strong Earning Potential', desc: 'Senior PMs and Programme Directors earn R1.8M–R3M+ in South Africa. Global USD-paying contracting adds another multiplier. The PMP certification has one of the highest salary correlations of any professional credential.' },
  { emoji: '🌐', title: 'Skills Travel Anywhere', desc: 'Project management certifications (PMP, PRINCE2) are globally recognised. South African PMs regularly work in the UK, UAE, and Australia — without retraining — because the skills are internationally portable.' },
  { emoji: '🧩', title: 'A Different Problem Every Project', desc: 'Building a data centre, rolling out SAP, launching a new product, or implementing regulatory change — every project is a new puzzle. PMs who love variety will never be bored.' },
  { emoji: '📈', title: 'Clear Progression to the C-Suite', desc: 'Programme Director → Head of PMO → COO or MD is a path that many business leaders have walked. PM experience builds exactly the financial, operational, and leadership skills executives need.' },
  { emoji: '⚡', title: 'You Make Organisations Actually Change', desc: 'Strategies fail not because the strategy is wrong, but because execution fails. PMs are the execution layer — without you, nothing actually changes. That is a position of extraordinary organisational power.' },
]

const FREE_RESOURCES = [
  { category: 'Learning', color: '#7c3aed', bgColor: '#faf5ff', items: [
    { name: 'PMI PMBOK Guide 7th Edition (PMI members)', url: '#', type: 'Guide', rating: 5 },
    { name: 'Google Project Management Certificate (Coursera)', url: '#', type: 'Course', rating: 5 },
    { name: 'PRINCE2 Foundation Free Study Guide', url: '#', type: 'Guide', rating: 4 },
    { name: 'ProjectManagement.com — Free Articles', url: '#', type: 'Reference', rating: 5 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'PMP Exam Simulator — PM PrepCast (free trial)', url: '#', type: 'Practice', rating: 5 },
    { name: 'PMI CAPM Practice Exams (PMI.org)', url: '#', type: 'Practice', rating: 5 },
    { name: 'Smartsheet / Jira Free Plans (hands-on)', url: '#', type: 'Tool', rating: 4 },
    { name: 'PM Templates — ProjectManagement.com', url: '#', type: 'Templates', rating: 5 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'PMI South Africa Chapter (free events)', url: '#', type: 'Network', rating: 5 },
    { name: 'r/projectmanagement — Active PM Community', url: '#', type: 'Forum', rating: 4 },
    { name: 'Andrew Ramdayal YouTube (PMP prep)', url: '#', type: 'YouTube', rating: 5 },
    { name: 'The Digital Project Manager Blog', url: '#', type: 'Blog', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Project Coordinator', range: 'R260k – R460k', midpoint: 360, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Project Manager', range: 'R580k – R1.0M', midpoint: 790, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Project Manager', range: 'R1.0M – R1.8M', midpoint: 1400, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Programme Director / PMO Head', range: 'R2M – R3.5M+', midpoint: 2600, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Skipping Proper Project Initiation',
    desc: 'Jumping straight into planning and execution without a proper project charter, defined success criteria, and confirmed stakeholder buy-in. Projects without a clear mandate lose sponsor support at the first obstacle.',
    fix: 'Write a project charter before a single task is created. Get it formally signed by the sponsor. Define what "done" means before you begin.',
  },
  {
    num: '02', title: 'Building a Plan and Never Updating It',
    desc: 'A project plan that reflects the original baseline while the project has moved on is worse than no plan at all — it destroys your credibility when executives compare actuals to a fantasy document.',
    fix: 'Update the project plan every week. Rebaseline only through formal change control. The plan is a living document, not a historical artefact.',
  },
  {
    num: '03', title: 'Managing Tasks Instead of Outcomes',
    desc: 'A PM who tracks whether tasks are completed misses the point. Tasks being green doesn\'t mean the project is on track if the outputs aren\'t meeting quality standards or the business need has shifted.',
    fix: 'Define measurable acceptance criteria for every deliverable. Track outcome quality, not just task completion. Ask "is this actually done?" not "is the task ticked off?"',
  },
  {
    num: '04', title: 'Avoiding Escalation',
    desc: 'Junior PMs try to solve every problem themselves rather than escalating to sponsors. By the time the problem becomes visible, it\'s a crisis — not a manageable risk that the sponsor could have resolved in a five-minute conversation.',
    fix: 'Escalate early. Frame escalations as "I need a decision" not "I have a problem." Sponsors want early warning, not late surprises.',
  },
  {
    num: '05', title: 'No Formal Change Control',
    desc: 'Accepting scope changes informally — verbally, over email, without budget or schedule impact assessment — is how projects become 40% larger than planned without any corresponding increase in resources or time.',
    fix: 'Use a change request log from day one. Every change gets an impact assessment. Nothing is added to scope without formal sponsor approval and baseline adjustment.',
  },
  {
    num: '06', title: 'Ignoring Team Morale and Burnout',
    desc: 'PMs who focus only on tasks and timelines and ignore the humans delivering them lose their best people mid-project. A team that is burning out will produce poor quality work and miss deadlines regardless of the plan.',
    fix: 'Check in with team members individually, not just in standups. Watch for overallocation. Shield your team from unreasonable sponsor demands. People deliver plans.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Business Analyst',
    ease: 'Natural Fit', easeColor: '#7c3aed', easeBg: '#faf5ff',
    desc: 'You understand requirements, stakeholder management, and project scopes deeply. Add scheduling, budget management, and governance skills — and you can step directly into a PM role, often on the same project where you were the BA.',
    steps: ['Complete a CAPM or PRINCE2 Foundation course', 'Shadow a PM on your current project', 'Volunteer to run a small sub-project or workstream', 'Apply for junior PM or coordinator roles using your BA portfolio'],
  },
  {
    from: 'Team Lead / Tech Lead',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'You understand delivery, technical complexity, and team dynamics. Add formal PM methodology, stakeholder management, and budget tracking skills — your technical credibility makes you an unusually effective technology project manager.',
    steps: ['Study PMBOK and Agile PM fundamentals', 'Pursue CAPM certification as a starting credential', 'Apply your Scrum / Agile knowledge to PM ceremonies', 'Target IT Project Manager roles in your current domain'],
  },
  {
    from: 'Operations / Administration',
    ease: 'Very Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'You understand how organisations actually work, how to navigate bureaucracy, and how to coordinate across teams. Add formal PM methodology and certification — your organisational savvy is a genuine advantage over theory-only candidates.',
    steps: ['Complete Google PM Certificate on Coursera (free)', 'Pursue CAPM certification (no experience required)', 'Volunteer for a coordinator role on a current company project', 'Apply to project coordinator roles — the natural entry point'],
  },
  {
    from: 'Other Professional Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Domain expertise combined with PM skills is highly valuable. A PM who genuinely understands construction, mining, healthcare, or financial services commands premium rates in those verticals — generalist PMs can\'t match the contextual credibility.',
    steps: ['Start with PMBOK fundamentals and Google PM Certificate', 'Build a mini project case study from your domain', 'Pursue CAPM or PRINCE2 Foundation certification', 'Target PM roles in your previous industry sector'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Foundations & Framework', color: '#7c3aed', bg: '#faf5ff', days: [
    { day: 'Day 1–2', task: 'Read PMI\'s PMBOK overview. Understand the five process groups and ten knowledge areas. Map how they relate to a real project you\'ve been involved in.' },
    { day: 'Day 3–4', task: 'Study the triple constraint: scope, schedule, cost. Find a real project example of each constraint being traded off. Understand why no project ever escapes this triangle.' },
    { day: 'Day 5–6', task: 'Sign up for a free Jira or Smartsheet account. Create a project board. Add tasks, assign owners, set due dates, and mark dependencies.' },
    { day: 'Day 7', task: 'Write a one-page project charter for a project you could run — even hypothetically. Include scope, objectives, stakeholders, budget, and success criteria.' },
  ]},
  { week: 'Week 2', theme: 'Planning & Risk', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Build a Work Breakdown Structure (WBS) for your charter project. Decompose deliverables into tasks. Learn how tasks roll up into milestones.' },
    { day: 'Day 10–11', task: 'Create a simple Gantt chart in Excel or Smartsheet. Add dependencies using the critical path method. Identify the longest path through your project.' },
    { day: 'Day 12–13', task: 'Build a RAID log: Risks, Assumptions, Issues, Dependencies. Add 5–10 realistic entries for your project. Write mitigation actions for each risk.' },
    { day: 'Day 14', task: 'Build a simple budget tracker in Excel. Add resource costs, timeline, and burn rate. Practice forecasting Estimate at Completion (EAC) from a midpoint.' },
  ]},
  { week: 'Week 3', theme: 'Agile & Stakeholders', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Complete a free Scrum fundamentals course. Understand sprint ceremonies: planning, standup, review, retrospective. Know the difference between a PM and a Scrum Master.' },
    { day: 'Day 17–18', task: 'Build a stakeholder map for your project. Plot stakeholders on a power/interest grid. Write a one-line engagement strategy for each quadrant.' },
    { day: 'Day 19–20', task: 'Write a one-page status report in RAG format. Practice the executive summary: what\'s green, what\'s amber, what decisions are needed this week.' },
    { day: 'Day 21', task: 'Review CAPM eligibility on PMI.org. Plan your certification study path. If eligible, schedule your exam date to create accountability.' },
  ]},
  { week: 'Week 4', theme: 'Portfolio & Job Application', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Assemble your PM portfolio: project charter, WBS, Gantt, RAID log, budget tracker, stakeholder map, and status report. Export as a PDF case study.' },
    { day: 'Day 25–26', task: 'Update your LinkedIn profile. Headline: "Aspiring Project Manager | CAPM Candidate | Agile | Planning | Stakeholder Management". Add your portfolio project.' },
    { day: 'Day 27–28', task: 'Research 10 target companies hiring project coordinators or junior PMs. Identify the domain (IT, financial services, construction) matching your background.' },
    { day: 'Day 29–30', task: 'Apply to 5 coordinator or junior PM roles with your portfolio attached. Connect with 3 PMs on LinkedIn and ask for a 20-minute informational conversation.' },
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
      try { await navigator.share({ title: 'Project Manager Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Project Manager in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/project-manager'}</span>
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
export default function ProjectManagerRoadmapPage() {
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
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80"
            alt="Project Manager leading team planning session"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Briefcase size={12} /> Delivery & Leadership
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Project Manager
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
            Turn strategy into reality. Project Managers are the people who make things actually happen — planning the work, coordinating the team, managing the budget, and steering the ship through every storm from kickoff to go-live.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Project Management" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#faf5ff', borderColor: 'rgba(124,58,237,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Project Manager</strong> plans, executes, and closes projects — ensuring they deliver the right outcome, within budget, on schedule, and within scope. They are the single point of accountability for everything from team coordination and stakeholder communication to risk management and budget control. While other roles contribute expertise to a project, the PM is responsible for the outcome as a whole. No project succeeds by accident — it succeeds because a great PM managed it.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Project Management could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Project Manager workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.3)'; (e.currentTarget as HTMLElement).style.background = '#faf5ff' }}
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Coordinator → Programme Director</span></div>
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
              const icons = ['📖', '📅', '💰', '⚡', '🤝', '🏅']
              const accentColors = ['#7c3aed', '#16a34a', '#7c3aed', '#16a34a', '#7c3aed', '#16a34a']
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.indigo} 100%)`, boxShadow: '0 8px 48px rgba(124,58,237,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>10–14 months · Consistent daily practice · Build and deliver real projects</div>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Project Management in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#faf5ff', borderColor: 'rgba(124,58,237,0.2)', color: C.textMuted }}>
              AI tools don't replace Project Managers — they <em style={{ color: C.primary }}>amplify</em> them. PMs who use AI for automated reporting, predictive risk intelligence, and planning optimisation reclaim hours of administrative time — freeing capacity for the human work that no model can replicate: stakeholder trust, political judgement, and team leadership.
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. PMs in banking, mining, and large infrastructure programmes earn at the top of each band. Contract rates are typically 30–50% higher than permanent equivalents.</p>
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
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#faf5ff', borderColor: 'rgba(124,58,237,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> PMP certification is correlated with a 20–25% salary premium over uncertified PMs at every level. The exam investment pays back within the first year at senior level. Contract PM work can push earnings 40–60% above permanent equivalent roles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring Project Managers" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into Project Management from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Project Management" iconBg={C.redLight} iconColor={C.red} />
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
                Project Management is <strong style={{ color: C.primary }}>the discipline that turns strategy into reality</strong>. Every ambitious plan, every transformation programme, every new product launch — without a great PM at the centre, they remain PowerPoint slides. With one, they become delivered outcomes that change organisations.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The skills you build as a PM — planning, leadership, communication, risk management, and financial control — are among the most durable and transferable in all of professional life. They compound into executive authority in a way that few technical specialisations can match. Start managing something today, even if it's small. Your first project is the beginning of a career trajectory with no ceiling.
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open your planning tool and kick off your first project.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              Get Career Advice
            </a>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start managing something today. Your future self will thank you.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}