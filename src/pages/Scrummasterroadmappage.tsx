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
  primary: '#0f766e',          // teal — agile brand colour
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

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const CAREER_LEVELS = [
  {
    level: 'Junior', title: 'Junior Scrum Master', duration: '0–2 yrs', salary: 'R280k–R480k',
    description: 'Facilitate daily standups, sprint planning and retrospectives. Support the team in understanding Scrum. Remove small impediments under a senior SM\'s guidance.',
    skills: ['Scrum Basics', 'Facilitation', 'Jira/Confluence', 'Active Listening'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Scrum Master', duration: '2–5 yrs', salary: 'R520k–R950k',
    description: 'Own agile ceremonies end-to-end, coach the product owner on backlog management, remove cross-team impediments, and drive continuous improvement through metrics.',
    skills: ['Team Coaching', 'Metrics & KPIs', 'Scaled Agile', 'Stakeholder Mgmt'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Scrum Master', duration: '5–8 yrs', salary: 'R950k–R1.6M',
    description: 'Lead agile transformation across multiple teams, establish agile frameworks at the organisational level, mentor other Scrum Masters, and influence culture change.',
    skills: ['SAFe / LeSS', 'Change Management', 'OKRs', 'Org Design'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'Agile Coach / Head of Agile', duration: '8+ yrs', salary: 'R1.8M+',
    description: 'Define enterprise agile strategy, coach C-suite and leadership, architect operating models, and drive business agility at scale across divisions and geographies.',
    skills: ['Enterprise Agility', 'Executive Coaching', 'Portfolio Mgmt', 'Leadership'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Agile Fundamentals & the Scrum Framework',
    description: 'Master the Scrum Guide cover to cover. Understand the three pillars (transparency, inspection, adaptation), five values, three accountabilities, five events, and three artefacts. Learn the Agile Manifesto and its 12 principles — they underpin every coaching conversation you will ever have.',
    duration: '1–2 months', skills: ['Scrum Guide', 'Agile Manifesto', 'Sprint Cycle', 'Scrum Values'],
  },
  {
    step: 2, title: 'Facilitation Skills & Agile Ceremonies',
    description: 'Become an expert facilitator of Sprint Planning, Daily Scrum, Sprint Review, and Retrospective. Study facilitation techniques — liberating structures, 1-2-4-All, WSJF prioritisation, and retrospective formats. Great Scrum Masters are great meeting designers.',
    duration: '1–2 months', skills: ['Sprint Planning', 'Retrospectives', 'Liberating Structures', 'Timeboxing'],
  },
  {
    step: 3, title: 'Product Backlog, User Stories & Estimation',
    description: 'Coach product owners in writing clear, valuable user stories with acceptance criteria. Facilitate backlog refinement, relative estimation with story points, and planning poker. Understand the relationship between backlog health and team velocity.',
    duration: '1–2 months', skills: ['User Stories', 'Story Points', 'Backlog Refinement', 'Definition of Done'],
  },
  {
    step: 4, title: 'Agile Metrics, Tooling & Reporting',
    description: 'Learn to measure what matters: velocity, cycle time, lead time, sprint burndown, and cumulative flow diagrams. Become proficient in Jira, Azure DevOps, or Linear. Use data to drive retrospectives and inform stakeholder conversations — not to micromanage.',
    duration: '1–2 months', skills: ['Velocity & Burndown', 'Cycle Time', 'Jira / Azure DevOps', 'CFD Charts'],
  },
  {
    step: 5, title: 'Coaching, Impediment Removal & Servant Leadership',
    description: 'Shift from facilitation to coaching. Learn coaching stances, powerful questions, and active listening. Study servant leadership and psychological safety. Master impediment escalation and the art of removing organisational blockers without authority.',
    duration: '2–3 months', skills: ['Coaching Stance', 'Servant Leadership', 'Psychological Safety', 'Conflict Resolution'],
  },
  {
    step: 6, title: 'Scaled Agile, Transformation & Agile Coaching',
    description: 'Grow into enterprise agility. Study SAFe, LeSS, Nexus, or Scrum@Scale. Understand value stream mapping, portfolio management, and OKRs. Develop change management skills to lead agile transformations — this is where Scrum Masters become Agile Coaches.',
    duration: '3–4 months', skills: ['SAFe / LeSS', 'OKRs', 'Value Streams', 'Org Change'],
  },
]

const HARD_SKILLS = [
  { name: 'Scrum Framework Mastery', level: 95 },
  { name: 'Facilitation & Meeting Design', level: 93 },
  { name: 'Agile Metrics & Reporting', level: 88 },
  { name: 'Backlog & Estimation Coaching', level: 85 },
  { name: 'Jira / Azure DevOps', level: 82 },
  { name: 'Scaled Agile (SAFe / LeSS)', level: 72 },
  { name: 'OKRs & Portfolio Management', level: 65 },
  { name: 'Organisational Change Management', level: 60 },
]

const SOFT_SKILLS = [
  { name: 'Servant Leadership', description: 'A Scrum Master\'s power is influence without authority. The ability to motivate, protect, and serve a team while driving outcomes is the single most defining trait of an exceptional SM.' },
  { name: 'Coaching & Powerful Questioning', description: 'Ask, don\'t tell. Great Scrum Masters resist solving problems for teams and instead ask questions that help teams solve problems themselves — building capability, not dependency.' },
  { name: 'Psychological Safety Builder', description: 'Teams that feel safe speak up, experiment, and learn from failure. Creating an environment of trust and safety is a deliberate skill that the best Scrum Masters practise in every interaction.' },
  { name: 'Conflict Navigation', description: 'Conflict in teams is healthy if channelled well. Scrum Masters who can surface, name, and facilitate through interpersonal tension build higher-performing teams than those who avoid it.' },
  { name: 'Stakeholder Communication', description: 'Translate delivery realities into language executives understand. Scrum Masters who can manage up — giving clear, calm, data-driven progress communication — earn trust that protects their teams.' },
  { name: 'Systems Thinking', description: 'See the whole, not just the sprint. Great Agile Coaches understand how team dynamics, org structure, incentives, and processes interact — and intervene at the right level to create lasting improvement.' },
]

const EDU_PATHS = [
  {
    type: 'Certification', title: 'CSM / PSM Certification Path', duration: '3–6 months', cost: 'R8k – R25k',
    borderColor: 'rgba(15,118,110,0.2)', bgColor: '#f0fdfa', typeBg: 'rgba(15,118,110,0.12)', typeColor: '#0f766e',
    pros: ['Industry-recognised credential (CSM, PSM I/II)', 'Fast path to first Scrum Master role', 'Structured learning with coaching community', 'Practitioner-taught with real case studies'],
    cons: ['Certification alone does not equal competence', 'Ongoing renewal costs and CPD requirements', 'Does not cover scaled agile or coaching depth', 'Market is saturated with basic SM certifications'],
  },
  {
    type: 'Degree', title: 'Business / Management Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Strong foundation in organisational behaviour', 'Credibility at enterprise and corporate level', 'Access to graduate management programmes', 'Deep business context for agile conversations'],
    cons: ['Rarely covers Scrum or agile directly', 'Slow and expensive path to first SM role', 'Practical agile skills are entirely self-taught', 'Academic theory lags agile practice by years'],
  },
  {
    type: 'Self-Taught', title: 'Online Courses & Practice', duration: '6–18 months', cost: 'R0 – R6k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['World-class free content (Scrum.org, YouTube)', 'Volunteer SM on community or open-source projects', 'No ceiling on depth you can reach', 'Flexible — learn while working your current role'],
    cons: ['No formal credential without exams', 'Harder to get first role without certification', 'Easy to miss nuanced facilitation techniques', 'Requires strong self-motivation and structure'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Daily Standup Facilitation', desc: 'Facilitate the 15-minute Daily Scrum. Ensure it stays focused on the Sprint Goal — not a status report. Remove blockers surfaced by the team immediately after.', duration: '15–30 min', icon: <Users size={14} /> },
  { time: '9:30', act: 'Impediment Resolution', desc: 'Chase down blockers raised in standup. Coordinate with product owners, other teams, or management to clear the path for your developers.', duration: '1 hr', icon: <Target size={14} /> },
  { time: '10:30', act: 'Backlog Refinement Support', desc: 'Support the Product Owner in grooming the backlog — coaching on story splitting, acceptance criteria, and estimation ahead of Sprint Planning.', duration: '1 hr', icon: <FileText size={14} /> },
  { time: '12:00', act: 'Stakeholder Communication', desc: 'Prepare sprint progress updates, update velocity dashboards, and communicate risks to stakeholders before they become crises.', duration: '45 min', icon: <MessageSquare size={14} /> },
  { time: '1:00', act: 'Lunch & Recovery', desc: 'Step away intentionally. Scrum Masters who don\'t recharge burn out from constant human-facing work faster than almost any other tech role.', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Coaching & 1-on-1s', desc: 'Coach team members, the Product Owner, or leadership. Use powerful questions rather than answers. Build the team\'s agile capability and self-organisation.', duration: '1.5 hrs', icon: <Award size={14} /> },
  { time: '3:30', act: 'Ceremony Preparation & Learning', desc: 'Design the next retrospective. Research new facilitation formats. Read agile blogs (Mountain Goat, Less.works, Liberating Structures) or study for your next certification.', duration: '1 hr', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Jira', cat: 'Backlog Mgmt' }, { name: 'Confluence', cat: 'Documentation' },
  { name: 'Miro / Mural', cat: 'Facilitation' }, { name: 'Azure DevOps', cat: 'Sprint Tracking' },
  { name: 'Retrium', cat: 'Retrospectives' }, { name: 'Slack / Teams', cat: 'Communication' },
  { name: 'Linear', cat: 'Issue Tracking' }, { name: 'Notion', cat: 'Knowledge Base' },
]

const WORK_ENVS = [
  { type: 'Hybrid', pct: 52 },
  { type: 'Remote', pct: 33 },
  { type: 'In-Office', pct: 15 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Assisted Retrospectives & Facilitation', icon: <Sparkles size={20} />,
    desc: 'AI tools now help Scrum Masters generate retrospective formats, synthesise team feedback into themes, and suggest action items based on sprint data. Tools like Parabol and Echometer use AI to surface patterns across multiple retrospectives.',
    tools: ['Parabol', 'Echometer', 'Miro AI', 'ChatGPT'],
    borderColor: 'rgba(15,118,110,0.18)', bgColor: '#f0fdfa', icoBg: 'rgba(15,118,110,0.12)', icoColor: '#0f766e', tagBg: 'rgba(15,118,110,0.1)', tagColor: '#0f766e', titleColor: '#0f766e',
  },
  {
    title: 'AI-Powered Sprint Analytics', icon: <Zap size={20} />,
    desc: 'AI tools integrated into Jira and Azure DevOps predict sprint risk, identify velocity anomalies, and surface bottlenecks in the delivery pipeline before they become missed commitments. Scrum Masters who read this data lead more proactive conversations.',
    tools: ['Jira Atlassian AI', 'LinearB', 'Nave', 'Haystack'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI-Augmented Coaching Conversations', icon: <TrendingUp size={20} />,
    desc: 'Agile coaches now use AI tools to analyse team health survey data, identify engagement trends, and personalise coaching approaches per individual. Understanding how to integrate AI insights into coaching practice is a differentiating skill in 2026.',
    tools: ['TeamRetro AI', 'Culture Amp AI', 'Lattice AI', 'Leapsome'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'AI-Augmented Delivery Analytics', 'Product Discovery & Dual-Track Agile',
  'OKR Coaching & Alignment', 'Team Topology Design',
  'Value Stream Mapping', 'Executive & Leadership Coaching',
]

const PROS = [
  { title: 'High Human Impact', desc: 'You directly improve the working lives of development teams. When a Scrum Master does their job well, teams become happier, more autonomous, and more effective — the human ROI is immediate and visible.' },
  { title: 'Strong Demand Across All Industries', desc: 'Every company adopting agile — from banks to hospitals to tech startups — needs Scrum Masters and Agile Coaches. The role is industry-agnostic, giving you extraordinary career flexibility.' },
  { title: 'No Deep Technical Coding Required', desc: 'One of the few high-paying roles in technology that doesn\'t require programming skills. Background in business, HR, project management, or psychology is equally valid and valued.' },
  { title: 'Clear Path to Agile Coaching & Leadership', desc: 'The natural growth path from Scrum Master to Agile Coach to Head of Agile / Chief Agile Officer is one of the most respected leadership trajectories in modern organisations.' },
  { title: 'Transferable Cross-Domain Expertise', desc: 'Coaching, facilitation, change management, and servant leadership skills transfer across every team, organisation, and industry. Skills built here compound across your entire career.' },
  { title: 'Hybrid & Remote-Friendly Role', desc: 'With the right facilitation tools, Scrum Masters operate effectively from anywhere. 33% of SM roles are fully remote globally; 52% are hybrid — among the most flexible arrangements in tech.' },
]

const CONS = [
  { title: 'Authority Without Power', desc: 'Scrum Masters have significant responsibility but no line management authority. Driving change through influence alone is exhausting when the organisation isn\'t bought into agile values.' },
  { title: 'Credential Inflation', desc: 'The market is flooded with CSM holders who attended a two-day course and call themselves Scrum Masters. Differentiating genuine expertise from credential-holding is a challenge on both sides of the hiring table.' },
  { title: 'Organisational Resistance to Change', desc: 'The hardest part of this job is not Scrum — it\'s culture. Helping traditional hierarchies embrace agile values requires patience, political savvy, and resilience against constant institutional friction.' },
  { title: 'Constant Emotional Labour', desc: 'Mediating conflict, coaching struggling team members, and managing stakeholder anxiety is emotionally demanding. Scrum Masters who lack healthy boundaries burn out faster than almost any other tech-adjacent role.' },
  { title: 'Misunderstood & Undervalued Role', desc: 'Many organisations hire Scrum Masters but don\'t understand what the role should do. Being reduced to "meeting organiser" or "Jira administrator" is a frustrating reality for many SMs in immature agile organisations.' },
  { title: 'Salary Ceiling vs. Technical Peers', desc: 'Senior Scrum Masters and mid-level Agile Coaches typically earn less than equivalent-experience backend or data engineers. The path to top compensation requires reaching Head of Agile or enterprise coaching level.' },
]

const VIDEOS = [
  { id: 'vuqBIdgKcDQ', title: 'What Does a Scrum Master Actually Do?', desc: 'A clear, honest breakdown of the Scrum Master role — what it is, what it isn\'t, and what great Scrum Masters actually spend their time doing day to day.', dur: '12:18', channel: 'Scrum.org' },
  { id: 'XU0llRltyFM', title: 'Scrum Master Full Course — Agile & Scrum', desc: 'Comprehensive beginner-to-intermediate guide covering the Scrum framework, ceremonies, artefacts, and how to prepare for the PSM I certification exam.', dur: '6:34:00', channel: 'freeCodeCamp' },
  { id: 'TRcReyRYIMg', title: 'Agile Coach vs Scrum Master — What\'s the Difference?', desc: 'A practical comparison of the Scrum Master and Agile Coach roles — career paths, responsibilities, and how to grow from one into the other.', dur: '18:42', channel: 'Agile Mentors' },
]

const TAKEAWAYS = [
  'Read the Scrum Guide in full — it\'s only 13 pages, but every word matters and most "Scrum Masters" haven\'t truly internalised it',
  'Get experience facilitating real teams before any certification — workshops, community projects, and volunteer teams all count',
  'Your job is to make yourself unnecessary — teams that fully self-organise are the sign of a great Scrum Master, not teams that depend on you',
  'Coaching is not advising — learn the difference early and practice asking powerful questions instead of giving answers',
  'Metrics should serve conversations, not replace them — velocity is a tool for the team, not a weapon for management',
]

/* ─── CAREER FACTS ─────────────────────────────────────────────────────────── */

const CAREER_FACTS = [
  {
    icon: <Users size={20} />, title: 'What You Do',
    desc: 'Facilitate agile ceremonies, remove impediments, coach teams and product owners, protect the team\'s focus, drive continuous improvement, and serve as a change agent for agile values across the organisation.',
    color: '#0f766e',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Sprint facilitation, retrospective design, backlog refinement coaching, impediment escalation, stakeholder communication, team health measurement, agile metrics analysis, and organisational coaching.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Development teams you serve, Product Owners you coach, engineering managers you partner with, executives you influence, and other Scrum Masters you mentor — the role is fundamentally relational.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'Scrum Master and Agile Coach roles grew 28% year-on-year globally in 2024. Every company undergoing digital transformation — from banks to retailers to healthcare — is actively hiring agile practitioners.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🤝', title: 'You Make Teams Thrive', desc: 'Scrum Masters directly improve how people work together. When you do your job well, developers have more autonomy, less friction, and more satisfaction — the human impact is immediate and profound.' },
  { emoji: '💰', title: 'Competitive Compensation', desc: 'Senior Scrum Masters earn R950k–R1.6M in South Africa. Agile Coaches at enterprise level command R1.8M+. Global remote contracts in USD push these figures considerably higher.' },
  { emoji: '🌍', title: 'Work From Anywhere', desc: '33% of Scrum Master roles are fully remote. Armed with Miro and Zoom, you can facilitate ceremonies and coach teams from Cape Town to Cape Breton — the role is inherently location-flexible.' },
  { emoji: '🧩', title: 'People Problems Are Hard Problems', desc: 'Helping 8 humans align on a goal, resolve conflict, and deliver together — sprint after sprint — is genuinely difficult and deeply satisfying. These are the richest professional challenges you\'ll ever face.' },
  { emoji: '📈', title: 'Clear Path to Agile Leadership', desc: 'Scrum Master → Senior SM → Agile Coach → Head of Agile is one of the most respected career trajectories in modern product organisations — and it doesn\'t require writing a single line of code.' },
  { emoji: '🔒', title: 'Skills That Will Never Be Automated', desc: 'Coaching, facilitation, conflict resolution, and servant leadership are deeply human. These skills are not just AI-resistant — they become more valuable as AI takes over routine technical work.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#0f766e', bgColor: '#f0fdfa', items: [
    { name: 'Scrum.org — Free Scrum Guide & Learning Path', url: '#', type: 'Guide', rating: 5 },
    { name: 'Atlassian Agile Coach Resource Hub', url: '#', type: 'Course', rating: 5 },
    { name: 'Mountain Goat Software — Mike Cohn Blog', url: '#', type: 'Blog', rating: 5 },
    { name: 'Agile Alliance — Resources & Case Studies', url: '#', type: 'Reference', rating: 4 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'Open PSM I Practice Assessments (Scrum.org)', url: '#', type: 'Practice', rating: 5 },
    { name: 'Liberating Structures — Full Method Library', url: '#', type: 'Reference', rating: 5 },
    { name: 'Volunteer as SM on an open-source project', url: '#', type: 'Project', rating: 5 },
    { name: 'roadmap.sh — Scrum Master Learning Path', url: '#', type: 'Reference', rating: 4 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'Agile Amped Podcast (Scaled Agile)', url: '#', type: 'Podcast', rating: 5 },
    { name: 'r/scrum & r/agile Reddit Communities', url: '#', type: 'Forum', rating: 4 },
    { name: 'Adventures with Agile YouTube Channel', url: '#', type: 'YouTube', rating: 5 },
    { name: 'LeadingAgile Blog & Podcast', url: '#', type: 'Blog', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Scrum Master', range: 'R280k – R480k', midpoint: 380, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Scrum Master', range: 'R520k – R950k', midpoint: 735, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Scrum Master', range: 'R950k – R1.6M', midpoint: 1275, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Agile Coach / Head of Agile', range: 'R1.8M – R3M+', midpoint: 2300, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Acting as a Project Manager in Disguise',
    desc: 'Tracking tasks, assigning work, and reporting status to management makes you a glorified PM — not a Scrum Master. Teams become dependent rather than self-organising, and you undermine the whole point of agile.',
    fix: 'Ask: "Is the team doing this themselves?" If not, coach them to own it. Your job is to make your role unnecessary over time.',
  },
  {
    num: '02', title: 'Skipping Retrospectives When Things Are Busy',
    desc: 'The retrospective is the most important ceremony in Scrum. Cancelling it when sprints are rough is like removing smoke detectors when there\'s a fire. It sends exactly the wrong message to the team.',
    fix: 'Protect retros unconditionally. If you only have 30 minutes, run a 30-minute retro. The ceremony must happen every sprint.',
  },
  {
    num: '03', title: 'Giving Answers Instead of Asking Questions',
    desc: 'When a Scrum Master solves problems for the team, the team learns nothing. Handing over solutions creates dependency and stunts the team\'s agile maturity — even when your answer is right.',
    fix: 'Replace "Here\'s what you should do" with "What do you think the options are?" Coach first, advise only when necessary.',
  },
  {
    num: '04', title: 'Using Velocity as a Management Weapon',
    desc: 'Sharing raw velocity data with management so they can compare or pressure teams destroys trust immediately. Velocity is a planning tool for the team — not a performance metric for executives.',
    fix: 'Educate stakeholders on what velocity is and isn\'t. Share trend data and outcome metrics instead of raw sprint points.',
  },
  {
    num: '05', title: 'Ignoring the Product Owner Relationship',
    desc: 'A Scrum Master who only works with developers misses half the role. The PO relationship is equally critical — backlog health, story quality, and stakeholder alignment are all coaching opportunities.',
    fix: 'Schedule regular 1-on-1s with your Product Owner. Coach them on backlog refinement, user story quality, and stakeholder management.',
  },
  {
    num: '06', title: 'Stopping at Scrum — Not Growing into Coaching',
    desc: 'Pure ceremony facilitation is a junior skill. Mid-career Scrum Masters who don\'t develop coaching, change management, and scaled agile skills plateau quickly and find themselves passed over for senior roles.',
    fix: 'Deliberately grow your coaching vocabulary. Study ICAgile, the Agile Coaching Growth Wheel, and at least one scaling framework deeply.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Project Manager (Traditional)',
    ease: 'Natural Fit', easeColor: '#0f766e', easeBg: '#f0fdfa',
    desc: 'You already understand delivery cycles, stakeholder management, and risk. The shift to Scrum Master requires unlearning command-and-control and embracing servant leadership — but your planning instincts are a genuine asset.',
    steps: ['Study the Scrum Guide deeply — compare it to PMP/PRINCE2', 'Get CSM or PSM I certification', 'Volunteer as SM on an internal agile pilot', 'Position yourself as a "PM turned SM" with transformation experience'],
  },
  {
    from: 'QA / Test Engineer',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Your technical credibility means developers respect you immediately. Quality mindset maps directly to Definition of Done coaching and acceptance criteria. Add facilitation skills and you become a highly effective engineering-focused SM.',
    steps: ['Learn facilitation techniques from Liberating Structures', 'Get PSM I certification (Scrum.org)', 'Facilitate standups and retros on your current team', 'Target SM roles on technical/engineering-heavy teams'],
  },
  {
    from: 'HR / People Operations',
    ease: 'Very Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Coaching, conflict resolution, and people development are already your strengths. You\'ll need to build agile framework knowledge and technical credibility — but your human skills make you a natural Agile Coach candidate.',
    steps: ['Complete CSM + ICAgile ICP-ACC certifications', 'Shadow an existing Scrum Master for one quarter', 'Run retrospectives and team health assessments', 'Target HR-tech or people-ops teams where your background is valued'],
  },
  {
    from: 'Developer / Tech Lead',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Technical depth earns immediate developer respect. The challenge is shifting from solving technical problems to coaching people — from doing to enabling. Your engineering background makes you exceptional at technical debt and architecture conversations.',
    steps: ['Deliberately practise restraint — coach, don\'t solve', 'Get PSM I or CSM and study coaching frameworks', 'Volunteer to facilitate ceremonies on your current team', 'Target developer-heavy product teams where your technical credibility is valued'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Foundation & Framework', color: '#0f766e', bg: '#f0fdfa', days: [
    { day: 'Day 1–2', task: 'Read the Scrum Guide in full (scrumguides.org). Take notes on each event, artefact, and accountability. Re-read twice.' },
    { day: 'Day 3–4', task: 'Study the Agile Manifesto and all 12 principles. Write one personal example for each principle from your current work.' },
    { day: 'Day 5–6', task: 'Watch the Scrum.org introductory video series. Take the free Open Assessment on Scrum.org and aim for 85%+.' },
    { day: 'Day 7', task: 'Create a one-page visual summary of the Scrum Framework from memory. Share it — teaching is the fastest path to understanding.' },
  ]},
  { week: 'Week 2', theme: 'Facilitation Practice', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Study 5 retrospective formats (4Ls, KALM, Start-Stop-Continue, Sailboat, Mad-Sad-Glad). Design one and run it — even informally.' },
    { day: 'Day 10–11', task: 'Learn 3 Liberating Structures techniques (1-2-4-All, Troika Consulting, What-So What-Now What). Practise in a real or simulated setting.' },
    { day: 'Day 12–13', task: 'Volunteer to facilitate a meeting at work. Practise timekeeping, equal voice, and parking lot management. Gather feedback.' },
    { day: 'Day 14', task: 'Set up Miro or Mural free account. Recreate a retrospective board digitally. Practice the facilitation flow for a remote team.' },
  ]},
  { week: 'Week 3', theme: 'Coaching & Tools', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Study the GROW coaching model and practice "powerful questions." Coach a colleague through a work problem using only questions.' },
    { day: 'Day 17–18', task: 'Create a free Jira project. Build a product backlog with user stories, acceptance criteria, story points, and a sprint board.' },
    { day: 'Day 19–20', task: 'Study velocity, burndown charts, and cycle time. Pull data from any project tool you have access to and produce a sprint health report.' },
    { day: 'Day 21', task: 'Review the PSM I exam syllabus. Complete two practice exams on Scrum.org. Identify knowledge gaps and address them.' },
  ]},
  { week: 'Week 4', theme: 'Certify & Apply', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Book and take the PSM I exam (Scrum.org — $150). Target 85%+ to earn the certification. Study any gaps from your practice exams.' },
    { day: 'Day 25–26', task: 'Update your LinkedIn profile to reflect your SM journey. Write a post sharing your certification and what you learned.' },
    { day: 'Day 27–28', task: 'Draft your SM CV. Highlight any facilitation, coaching, team leadership, or project experience as relevant agile experience.' },
    { day: 'Day 29–30', task: 'Apply to 5 junior Scrum Master or Agile Coordinator roles. Join the Scrum Alliance and r/scrum communities. Start networking actively.' },
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
      try { await navigator.share({ title: 'Scrum Master / Agile Coach Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Scrum Master / Agile Coach in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/scrum-master'}</span>
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
export default function ScrumMasterRoadmapPage() {
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
            src="https://i.imgur.com/hyv0AoI.jpeg"
            alt="Scrum Master agile team collaboration"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Users size={12} /> Agile & Delivery Leadership
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Scrum Master / Agile Coach
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
            Make teams extraordinary. Scrum Masters and Agile Coaches serve the people who build the product — removing obstacles, designing better ways of working, and driving the culture change that makes great delivery possible.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of the Scrum Master / Agile Coach" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Scrum Master / Agile Coach</strong> is a servant leader whose job is to make teams more effective, organisations more adaptive, and delivery more predictable. Unlike project managers who direct work, Scrum Masters facilitate process, remove obstacles, coach people, and champion agile values — creating the conditions where great engineering teams do their best work.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons the Scrum Master path could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Scrum Master workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior SM → Agile Coach</span></div>
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
              const icons = ['📋', '🗣️', '🗂️', '📊', '🤝', '🏢']
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
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>8–12 months · Consistent daily practice · Facilitate real teams from day one</div>
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
                    <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>Framework and tooling competencies required</div>
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
                    <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>Human abilities to build and sharpen</div>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming the Scrum Master / Agile Coach role in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)', color: C.textMuted }}>
              AI tools don't replace Scrum Masters — they <em style={{ color: C.primary }}>free them</em>. When AI handles retrospective data synthesis, sprint analytics, and survey reporting, Scrum Masters spend more time on what machines cannot do: coaching humans, building trust, and navigating organisational complexity.
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially for senior Agile Coach and Head of Agile roles — can pay 2–3× these figures in USD.</p>
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
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> Agile Coaches at product-led companies and digital transformation consultancies earn significantly more than internal SMs at traditional organisations. Target companies actively undergoing agile transformation — that's where coaching is a competitive advantage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring Scrum Masters" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into Scrum Master / Agile Coaching from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Agile & Scrum" iconBg={C.redLight} iconColor={C.red} />
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
                The Scrum Master is one of the most <strong style={{ color: C.primary }}>underestimated roles in technology</strong>. When done well, it transforms the way teams work — creating the safety, clarity, and momentum that turns a group of individuals into a high-performing unit. When done poorly, it becomes an expensive meeting-scheduling service.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The path from junior SM to senior Agile Coach is a journey of continuous human growth. The frameworks are learnable in weeks — but the coaching, the facilitation mastery, and the organisational wisdom take years to build. Start with the Scrum Guide. Then go coach a real team.
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open the Scrum Guide and facilitate your first retrospective.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              Get Career Advice
            </a>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start serving teams today. Your future self will thank you.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}