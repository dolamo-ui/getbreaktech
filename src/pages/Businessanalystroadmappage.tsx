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
  GitBranch,
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
    level: 'Junior', title: 'Junior Business Analyst', duration: '0–2 yrs', salary: 'R280k–R480k',
    description: 'Gather requirements, document processes, create user stories, and support senior BAs on stakeholder workshops. Learn to translate business needs into clear specifications.',
    skills: ['Requirements Gathering', 'Process Mapping', 'User Stories', 'Excel'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Business Analyst', duration: '2–5 yrs', salary: 'R550k–R950k',
    description: 'Lead requirements workshops, own the full analysis lifecycle, facilitate JAD sessions, write BRDs and FRDs, and bridge communication between business and technology teams.',
    skills: ['BRD / FRD Writing', 'SQL Queries', 'Stakeholder Mgmt', 'Agile / Scrum'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Business Analyst', duration: '5–8 yrs', salary: 'R950k–R1.6M',
    description: 'Define BA strategy, drive enterprise-level transformation initiatives, mentor junior analysts, lead complex multi-stakeholder projects, and own the solution design process.',
    skills: ['Enterprise Architecture', 'Change Management', 'BA Leadership', 'Strategy'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'Principal BA / BA Manager', duration: '8+ yrs', salary: 'R1.8M+',
    description: 'Lead the BA practice, define standards and frameworks, drive digital transformation strategy, consult at the C-suite level, and develop the next generation of business analysts.',
    skills: ['BA Practice Lead', 'Digital Strategy', 'Executive Consulting', 'Org Design'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Business Analysis Fundamentals',
    description: 'Understand what a Business Analyst actually does. Study the BABOK Guide — the gold standard framework. Learn the six knowledge areas: Business Analysis Planning, Elicitation, Requirements Management, Strategy Analysis, Requirements Analysis, and Solution Evaluation.',
    duration: '1–2 months', skills: ['BABOK Guide', 'BA Knowledge Areas', 'Stakeholder Analysis', 'Problem Framing'],
  },
  {
    step: 2, title: 'Requirements Elicitation & Documentation',
    description: 'Master the core BA skill: extracting the real need behind every stated want. Learn interviews, workshops, observation, surveys, and JAD sessions. Document findings as user stories, use cases, BRDs, and FRDs that engineers and business owners both understand.',
    duration: '2–3 months', skills: ['User Stories', 'Use Cases', 'BRD / FRD Writing', 'JAD Workshops'],
  },
  {
    step: 3, title: 'Process Modelling & Data Analysis',
    description: 'Map as-is and to-be business processes using BPMN notation. Learn swimlane diagrams, value stream mapping, and gap analysis. Add SQL and Excel skills to query data, validate requirements against real data, and support data-driven decisions.',
    duration: '2–3 months', skills: ['BPMN', 'Process Mapping', 'SQL Basics', 'Excel / Power BI'],
  },
  {
    step: 4, title: 'Agile & Waterfall Delivery Methods',
    description: 'Business analysts must work inside delivery frameworks. Learn Scrum deeply — sprint planning, backlog refinement, retrospectives. Understand Kanban and SAFe for enterprise contexts. Learn how BA responsibilities shift in agile versus traditional waterfall projects.',
    duration: '1–2 months', skills: ['Scrum / Agile', 'Waterfall / SDLC', 'Backlog Refinement', 'SAFe Basics'],
  },
  {
    step: 5, title: 'Stakeholder Management & Communication',
    description: 'A BA lives in the space between business and technology. Learn stakeholder mapping, influence without authority, conflict resolution, and executive presentation skills. Write reports and proposals that decision-makers actually read and act on.',
    duration: '2–3 months', skills: ['Stakeholder Mapping', 'Conflict Resolution', 'Executive Presentations', 'Facilitation'],
  },
  {
    step: 6, title: 'Specialisation, Certification & Strategy',
    description: 'Distinguish yourself with an IIBA CBAP, PMI-PBA, or ECBA certification. Specialise in a domain: digital transformation, fintech, healthcare IT, or data analytics. Study business case development, cost-benefit analysis, and strategic planning to move into leadership.',
    duration: '3–4 months', skills: ['CBAP / PMI-PBA', 'Business Case Writing', 'Digital Transformation', 'Strategic Analysis'],
  },
]

const HARD_SKILLS = [
  { name: 'Requirements Elicitation', level: 95 },
  { name: 'Process Modelling (BPMN)', level: 90 },
  { name: 'BRD / FRD Documentation', level: 92 },
  { name: 'SQL & Data Analysis', level: 75 },
  { name: 'Agile / Scrum', level: 85 },
  { name: 'Stakeholder Management', level: 88 },
  { name: 'Business Case Development', level: 78 },
  { name: 'Change Management', level: 65 },
]

const SOFT_SKILLS = [
  { name: 'Active Listening', description: 'The most important BA skill is what you hear between the lines. Stakeholders rarely articulate the real problem first — active listening reveals hidden needs, unstated constraints, and political dynamics that define project success.' },
  { name: 'Analytical Thinking', description: 'Break complex business problems into structured components. A BA who can take a vague "we need to improve customer experience" and decompose it into measurable, addressable requirements is irreplaceable.' },
  { name: 'Facilitation Mastery', description: 'Run workshops where 15 stakeholders with competing agendas reach consensus. The ability to guide a room to a shared conclusion without alienating anyone is one of the rarest and most valuable BA skills.' },
  { name: 'Ambiguity Tolerance', description: 'Projects begin as fog. BAs must be comfortable operating with incomplete information while systematically reducing uncertainty — not paralysed by what isnt known yet.' },
  { name: 'Negotiation & Influence', description: 'You have no direct authority over developers, business owners, or executives. Everything you achieve is through influence, trust, and well-reasoned persuasion. Build this muscle early.' },
  { name: 'Written Communication', description: 'A BRD nobody reads is a failed requirement. Great BAs write concisely, structure documents logically, and adapt their communication style to the audience — from executive one-pagers to detailed technical specifications.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Business / IS / Commerce Degree', duration: '3–4 years', cost: 'R350k – R900k',
    borderColor: 'rgba(3,105,161,0.2)', bgColor: '#f0f9ff', typeBg: 'rgba(3,105,161,0.12)', typeColor: '#0369a1',
    pros: ['Strong business fundamentals and critical thinking', 'High credibility at large corporates and consulting firms', 'Access to graduate programmes and internship pipelines', 'Broad exposure to economics, finance, and management'],
    cons: ['Slow and expensive path to first BA role', 'Rarely covers BPMN, BABOK, or modern Agile practices', 'Limited practical experience with real stakeholder scenarios', 'Many skills are self-taught regardless of degree'],
  },
  {
    type: 'Bootcamp', title: 'BA Skills Bootcamp / Short Course', duration: '3–6 months', cost: 'R25k – R80k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Job-ready BA skills fast with real case studies', 'Covers tools: Jira, Confluence, draw.io, SQL basics', 'Career support and employer networks included', 'Structured, cohort-based accountability'],
    cons: ['Highly variable programme quality', 'Credential not universally respected by large corporates', 'Doesn\'t replace domain knowledge in complex industries', 'Competitive junior BA market on exit'],
  },
  {
    type: 'Self-Taught', title: 'BABOK, Certifications & Projects', duration: '12–18 months', cost: 'R0 – R15k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['BABOK Guide is freely readable and industry-standard', 'ECBA certification is accessible with no experience required', 'Volunteer or shadow on real projects from day one', 'No ceiling on domain knowledge you can build'],
    cons: ['Requires exceptional self-discipline and initiative', 'Hard to get first opportunity without a portfolio', 'No formal credential makes corporate entry difficult', 'Easy to miss critical elicitation and facilitation nuances'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Stakeholder Sync & Emails', desc: 'Review overnight emails from business stakeholders, prepare for morning workshops, and align with the project manager on daily priorities and blockers', duration: '30 min', icon: <Users size={14} /> },
  { time: '9:30', act: 'Requirements Workshop', desc: 'Facilitate a structured workshop with business owners to elicit, clarify, and validate requirements for an in-flight project. Document outcomes in real time.', duration: '2 hrs', icon: <FileText size={14} /> },
  { time: '11:30', act: 'Documentation & Analysis', desc: 'Translate workshop outputs into formal user stories, BRD sections, or process maps. Cross-reference against existing systems and data to identify gaps.', duration: '1.5 hrs', icon: <Layers size={14} /> },
  { time: '1:00', act: 'Lunch & Relationship Building', desc: 'Informal lunches with stakeholders often surface requirements that workshops never will. The BA who is trusted informally is the one who gets the real information.', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Agile Ceremonies & Dev Liaison', desc: 'Attend sprint planning or backlog refinement. Clarify user stories with developers, resolve ambiguity in acceptance criteria, and review developer questions on requirements.', duration: '1.5 hrs', icon: <Workflow size={14} /> },
  { time: '3:30', act: 'Process Modelling & Diagrams', desc: 'Build or refine BPMN process diagrams, swimlane charts, or data flow diagrams in draw.io or Lucidchart. Validate with process owners before finalising.', duration: '1 hr', icon: <GitBranch size={14} /> },
  { time: '4:30', act: 'Professional Development', desc: 'Study BABOK chapters, read case studies from IIBA, or work toward CBAP/PMI-PBA certification. The best BAs are always sharpening their elicitation toolkit.', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Confluence / Notion', cat: 'Documentation' }, { name: 'Jira / Azure DevOps', cat: 'Agile' },
  { name: 'draw.io / Lucidchart', cat: 'Diagramming' }, { name: 'Excel / Power BI', cat: 'Data Analysis' },
  { name: 'SQL (SSMS / DBeaver)', cat: 'Data Querying' }, { name: 'Miro / Mural', cat: 'Workshops' },
  { name: 'MS Visio', cat: 'Process Modelling' }, { name: 'Tableau', cat: 'Visualisation' },
]

const WORK_ENVS = [
  { type: 'Hybrid', pct: 54 },
  { type: 'Remote', pct: 31 },
  { type: 'In-Office', pct: 15 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Assisted Requirements Analysis', icon: <Sparkles size={20} />,
    desc: 'Claude and ChatGPT can now parse meeting transcripts, extract implicit requirements, identify contradictions between stakeholder statements, and generate first-draft user stories. BAs using AI on elicitation tasks report 40% faster documentation cycles.',
    tools: ['Claude', 'ChatGPT', 'Notion AI', 'Otter.ai'],
    borderColor: 'rgba(3,105,161,0.18)', bgColor: '#f0f9ff', icoBg: 'rgba(3,105,161,0.12)', icoColor: '#0369a1', tagBg: 'rgba(3,105,161,0.1)', tagColor: '#0369a1', titleColor: '#0369a1',
  },
  {
    title: 'AI-Powered Process Discovery', icon: <Zap size={20} />,
    desc: 'Process mining tools powered by AI (Celonis, UiPath Process Mining) automatically discover as-is processes from system event logs — dramatically accelerating gap analysis and eliminating the need for lengthy observation sessions.',
    tools: ['Celonis', 'UiPath Process Mining', 'Signavio', 'IBM Process Mining'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'Data-Driven Requirement Validation', icon: <TrendingUp size={20} />,
    desc: 'AI analytics tools can now validate whether proposed business requirements are achievable given historical data patterns, flag unrealistic targets before development begins, and surface data quality issues that would undermine solution success.',
    tools: ['Power BI AI', 'Tableau AI', 'Dataiku', 'Alteryx'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'AI & Automation Requirements (RPA)', 'Data Governance & Data Quality Analysis',
  'Product Management Crossover Skills', 'Low-Code / No-Code Platform Analysis',
  'Customer Journey Mapping at Scale', 'Generative AI Prompt Engineering for BAs',
]

const PROS = [
  { title: 'The Bridge Everyone Needs', desc: 'Every project that fails due to miscommunication between business and technology is proof that a great BA was needed. You are structurally essential in every organisation that builds or buys technology.' },
  { title: 'Industry-Agnostic Demand', desc: 'Banking, healthcare, retail, government, insurance, logistics — every sector needs Business Analysts. Your skills transfer across industries, giving you career resilience that few specialisations offer.' },
  { title: 'Excellent Work-Life Balance', desc: 'Unlike on-call engineering roles, BA work is largely predictable. 54% of roles are hybrid. You rarely face 3am production incidents. The work is intense but bounded.' },
  { title: 'Natural Path to Leadership', desc: 'BA → Senior BA → Product Owner → BA Manager → Transformation Director is one of the clearest leadership progression paths in corporate environments. People skills compound into leadership roles.' },
  { title: 'Variety Every Day', desc: 'No two projects are the same. One month you\'re mapping a claims process for an insurer; the next you\'re defining API requirements for a fintech platform. BAs never stop learning new domains.' },
  { title: 'High Impact, Visible Work', desc: 'When a BA does their job well, projects ship on time and meet actual business needs. Stakeholders remember the analyst who made the complex simple — and the referrals follow.' },
]

const CONS = [
  { title: 'The Blame Magnet', desc: 'When a project fails because requirements were misunderstood — even for reasons outside your control — the BA often absorbs the criticism. Document everything; it is both your protection and your professional standard.' },
  { title: 'Constant Context Switching', desc: 'Most BAs juggle 3–5 projects simultaneously. Switching between an insurance claims project and an HR system upgrade in the same afternoon is cognitively demanding and a skill in itself.' },
  { title: 'Vague Scope is Your Daily Reality', desc: 'Stakeholders will give you contradictory requirements, change their minds after sign-off, and redefine "done" after development begins. Managing scope creep without damaging relationships is an ongoing challenge.' },
  { title: 'The Politics of Stakeholder Management', desc: 'Senior stakeholders protect their turf. The VP of Finance and the Head of Operations will often want incompatible things. Navigating organisational politics without losing either is genuinely hard.' },
  { title: 'Undervalued in Immature Organisations', desc: 'Companies that don\'t understand the BA role will treat you as a glorified note-taker or admin assistant. Finding organisations that value structured analysis is part of your career strategy.' },
  { title: 'Certification Investment Required', desc: 'CBAP certification requires 7,500 hours of BA experience. While valuable, the path to recognised credentials is long. Junior BAs must invest time and money in certifications to accelerate progression.' },
]

const VIDEOS = [
  { id: 'z8RQmWT-R0o', title: 'Business Analyst Full Course 2025', desc: 'A comprehensive introduction to business analysis — covering BABOK, requirements elicitation, process modelling, agile BA, and career pathways for aspiring BAs.', dur: '5:42:00', channel: 'Simplilearn' },
  { id: 'WnMQ8HlmeXc', title: 'How to Write a Business Requirements Document', desc: 'Step-by-step walkthrough of creating a professional BRD from scratch — structure, language, stakeholder sign-off, and common pitfalls to avoid.', dur: '28:14', channel: 'BusinessAnalystMentor' },
  { id: 'HloT5-JTNBY', title: 'Agile Business Analysis — Complete Guide', desc: 'How the BA role works inside Scrum and SAFe — user story writing, backlog refinement, working with developers, and transitioning from waterfall BA work.', dur: '1:12:30', channel: 'AgileAnalysis' },
]

const TAKEAWAYS = [
  'Document every requirement decision and the rationale behind it — you will need the paper trail when a stakeholder changes their mind',
  'The real requirement is almost never the first thing the stakeholder says — ask "why" at least three times before you start documenting',
  'Get every requirement formally signed off before development begins — verbal agreement is not agreement in a project context',
  'Build your domain expertise deliberately — a BA who understands insurance deeply is worth twice a generalist BA in that sector',
  'Learn SQL even if nobody requires it — the ability to validate requirements against real data makes you a dramatically better analyst',
]

/* ─── NEW SECTIONS ────────────────────────────────────────────────────────── */

const CAREER_FACTS = [
  {
    icon: <FileText size={20} />, title: 'What You Build',
    desc: 'Business Requirements Documents, Functional Specs, User Stories, Process Maps, Gap Analyses, Business Cases, Feasibility Studies, UAT Test Plans, and Change Management documentation that guides every project from idea to delivery.',
    color: '#0369a1',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Requirements elicitation, stakeholder workshops, process modelling, gap analysis, user story writing, agile backlog refinement, UAT coordination, change impact assessment, and business case development.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Business owners defining needs, developers building solutions, project managers controlling delivery, UX designers shaping interfaces, data teams validating assumptions, and executives approving investment decisions.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'The BA role grew 14% in 2024 in South Africa. Digital transformation and cloud migration projects in banking, insurance, and retail are driving structural demand for senior BAs who understand both business and technology.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🔗', title: 'You Make Projects Actually Succeed', desc: 'The #1 cause of IT project failure is poor requirements. Every project that ships on time with the right features is proof a great BA was involved. You are the difference between a failed investment and a successful one.' },
  { emoji: '💰', title: 'Strong Earning Potential Across All Sectors', desc: 'Senior BAs in banking and fintech earn R950k–R1.6M+ in South Africa. Principal BAs and transformation leads at large corporates earn R2M+. The certification path creates clear earning milestones.' },
  { emoji: '🏢', title: 'Work in Every Industry', desc: 'There is no industry that doesn\'t need business analysis. Banking, healthcare, logistics, retail, government — once you have the skill, you can pivot between sectors without retraining.' },
  { emoji: '🧠', title: 'Intellectually Rich Work', desc: 'Understanding how a complex business works, finding the hidden inefficiency, and designing the requirement that solves it elegantly — this is intellectually demanding work that never gets boring.' },
  { emoji: '📊', title: 'Gateway to Product Management', desc: 'BA is the clearest natural progression path into Product Management. BA → Product Owner → Product Manager is a well-worn route that combines analysis rigour with strategic ownership.' },
  { emoji: '⚖️', title: 'Excellent Work-Life Balance', desc: 'Unlike on-call engineering or sales target pressure, BA work is largely 9-to-5. You solve hard problems in structured ways during business hours — one of the most sustainable careers in tech-adjacent fields.' },
]

const FREE_RESOURCES = [
  { category: 'Learning', color: '#0369a1', bgColor: '#f0f9ff', items: [
    { name: 'IIBA BABOK Guide (standard reference)', url: '#', type: 'Guide', rating: 5 },
    { name: 'Business Analysis Fundamentals — Udemy', url: '#', type: 'Course', rating: 5 },
    { name: 'PMI-PBA Exam Prep (LinkedIn Learning)', url: '#', type: 'Course', rating: 4 },
    { name: 'Modern Analyst — Free Articles & Guides', url: '#', type: 'Reference', rating: 5 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'IIBA ECBA Practice Exam Questions', url: '#', type: 'Practice', rating: 5 },
    { name: 'Lucidchart BPMN Templates (free)', url: '#', type: 'Tool', rating: 4 },
    { name: 'SQLZoo — SQL for Business Analysts', url: '#', type: 'Practice', rating: 5 },
    { name: 'BA Times — Case Studies & Templates', url: '#', type: 'Resource', rating: 5 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'IIBA Chapter Events (free to attend)', url: '#', type: 'Network', rating: 5 },
    { name: 'r/businessanalysis — Active Community', url: '#', type: 'Forum', rating: 4 },
    { name: 'Business Analyst Mentor YouTube', url: '#', type: 'YouTube', rating: 5 },
    { name: 'BA Weekly Newsletter', url: '#', type: 'Newsletter', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Business Analyst', range: 'R280k – R480k', midpoint: 380, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Business Analyst', range: 'R550k – R950k', midpoint: 750, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Business Analyst', range: 'R950k – R1.6M', midpoint: 1275, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Principal BA / BA Manager', range: 'R1.8M – R3M+', midpoint: 2300, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Documenting What Was Said, Not What Was Meant',
    desc: 'Taking stakeholder statements at face value and transcribing them as requirements is the most common BA mistake. "We need a report" is not a requirement — what decision does it support? For whom? How often? What data?',
    fix: 'Use the "5 Whys" technique on every stated requirement. The real need is always deeper than the first answer.',
  },
  {
    num: '02', title: 'Getting Requirements Signed Off Verbally',
    desc: 'A stakeholder\'s nodding head in a meeting means nothing when the system goes live and "this isn\'t what I asked for." Every requirement needs a documented signature trail. Verbal approval is no approval at all.',
    fix: 'Send a formal requirements review document after every workshop. Get email confirmation minimum. Use a sign-off register.',
  },
  {
    num: '03', title: 'Neglecting Non-Functional Requirements',
    desc: 'Capturing that the system must "generate a report" without specifying that it must do so in under 3 seconds, for 500 concurrent users, on mobile devices, in three languages — creates expensive rework in development.',
    fix: 'Add a standard NFR checklist to every requirements document: performance, security, usability, scalability, and compliance.',
  },
  {
    num: '04', title: 'Avoiding Conflict Between Stakeholders',
    desc: 'When two stakeholders want incompatible things, a junior BA tries to satisfy both simultaneously. This creates requirements that contradict each other and designs that please nobody.',
    fix: 'Surface conflicts early and explicitly. Facilitate a resolution workshop with decision authority in the room. Don\'t let contradictions hide in the documentation.',
  },
  {
    num: '05', title: 'Skipping User Acceptance Testing Involvement',
    desc: 'BAs who hand over their requirements and disappear until go-live will find the system doesn\'t match intent even when it matches the documented spec. UAT is where requirements meet reality.',
    fix: 'Write UAT test cases directly from your acceptance criteria. Be present during UAT to interpret requirements and triage defects accurately.',
  },
  {
    num: '06', title: 'Ignoring the Technical Constraint Conversation',
    desc: 'A requirement that ignores system limitations, data architecture, or integration constraints will be redesigned by developers without BA involvement — producing something that meets the technical constraint but misses the business intent.',
    fix: 'Have a technical feasibility conversation before finalising any requirement. Involve solution architects early in your elicitation process.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Software Developer / Tester',
    ease: 'Natural Fit', easeColor: '#0369a1', easeBg: '#f0f9ff',
    desc: 'You understand how systems are built, what engineers need to know, and how to read technical documentation. Add elicitation, facilitation, and business communication skills — you become a technically credible BA who commands a premium.',
    steps: ['Study BABOK fundamentals and user story writing', 'Shadow a senior BA on a real project', 'Volunteer to write requirements on your current team', 'Pursue ECBA certification and apply to BA roles'],
  },
  {
    from: 'Operations / Process Manager',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'You understand business processes deeply, know where the inefficiencies are, and have stakeholder credibility. Add requirements documentation, Agile knowledge, and IT literacy — and you can move directly into a Business Analyst role.',
    steps: ['Learn BPMN process modelling tools (draw.io, Visio)', 'Study Agile / Scrum fundamentals', 'Document a current process improvement as a mini-BRD', 'Apply to internal BA openings in your current company'],
  },
  {
    from: 'Project Coordinator / Administrator',
    ease: 'Very Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'You already manage stakeholder communication, documentation, and project logistics. Deepen your requirements elicitation and analysis skills — the shift from coordinator to BA is one of the most natural transitions in the industry.',
    steps: ['Complete a BA fundamentals course (online)', 'Learn SQL basics and Excel/Power BI', 'Pursue ECBA certification (no experience required)', 'Request exposure to requirements work on current projects'],
  },
  {
    from: 'Other Professional Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Domain expertise combined with BA skills is genuinely rare and valuable. A BA who deeply understands healthcare, legal, or financial services is worth considerably more than a generalist in those sectors.',
    steps: ['Start with IIBA BABOK overview and BA fundamentals', 'Build a case study from your domain', 'Complete ECBA certification as your first credential', 'Target companies in your previous industry'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Foundations & Frameworks', color: '#0369a1', bg: '#f0f9ff', days: [
    { day: 'Day 1–2', task: 'Download the IIBA BABOK Guide overview. Study the six knowledge areas. Understand what a BA actually does day-to-day.' },
    { day: 'Day 3–4', task: 'Learn stakeholder analysis: create a power/interest grid for a business you know. Identify who the real decision-makers are.' },
    { day: 'Day 5–6', task: 'Study elicitation techniques: interviews, workshops, observation, surveys. Role-play a requirements interview with a friend or colleague.' },
    { day: 'Day 7', task: 'Write a one-page "problem statement" for a process you know is broken. Frame the problem before jumping to solutions.' },
  ]},
  { week: 'Week 2', theme: 'Requirements & Process Mapping', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Set up a free draw.io account. Learn basic BPMN notation: events, tasks, gateways, flows. Map a simple as-is process.' },
    { day: 'Day 10–11', task: 'Write 10 user stories using the "As a [role] I want [feature] so that [benefit]" format for your chosen process improvement.' },
    { day: 'Day 12–13', task: 'Create a gap analysis: document the difference between how the process works today and how it should work tomorrow.' },
    { day: 'Day 14', task: 'Build a simple BRD template. Include: executive summary, scope, stakeholders, functional requirements, and sign-off section.' },
  ]},
  { week: 'Week 3', theme: 'Agile BA & Data Skills', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Complete a free Scrum fundamentals course. Understand sprint planning, backlog refinement, and acceptance criteria.' },
    { day: 'Day 17–18', task: 'Start SQLZoo\'s free SQL exercises. Write basic SELECT, WHERE, JOIN, and GROUP BY queries against sample data.' },
    { day: 'Day 19–20', task: 'Set up a free Jira or Trello board. Create a mini backlog with epics, user stories, and acceptance criteria for your project.' },
    { day: 'Day 21', task: 'Review ECBA certification requirements from IIBA. Register for the exam if eligible. Create your 60-day study plan.' },
  ]},
  { week: 'Week 4', theme: 'Portfolio & Job Application', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Complete your mini-project: process map, gap analysis, 10 user stories, and a one-page BRD. Package it as a PDF portfolio piece.' },
    { day: 'Day 25–26', task: 'Build your LinkedIn profile around BA skills. Write a clear headline: "Aspiring Business Analyst | Requirements | Process Modelling | Agile".' },
    { day: 'Day 27–28', task: 'Research 10 target companies hiring junior BAs. Identify the domain (banking, insurance, retail) you want to target based on your background.' },
    { day: 'Day 29–30', task: 'Apply to 5 junior BA roles with your portfolio attached. Reach out to 3 BAs on LinkedIn for an informational interview. Start building your network.' },
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
      try { await navigator.share({ title: 'Business Analyst Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Business Analyst in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/business-analyst'}</span>
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
export default function BusinessAnalystRoadmapPage() {
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
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80"
            alt="Business Analyst working with stakeholders and data"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Briefcase size={12} /> Strategy & Business
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Business Analyst
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
            Bridge the gap between business and technology. Business Analysts turn ambiguous problems into clear requirements, map the processes that slow companies down, and ensure that technology delivers real business value — not just features.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Business Analysis" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0f9ff', borderColor: 'rgba(3,105,161,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Business Analyst</strong> investigates business needs, identifies problems and opportunities, and translates them into clear, actionable requirements that technology teams can build against. They are the translators between the language of business — strategy, process, value — and the language of technology — systems, data, APIs, and code. When a BA does their job well, projects deliver what the business actually needs, on time, with no expensive rework.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Business Analysis could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Business Analyst workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → Principal BA</span></div>
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
              const icons = ['📋', '📝', '🗺️', '⚡', '🤝', '🏅']
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
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>10–14 months · Consistent daily practice · Build a real requirements portfolio</div>
            </div>
          </div>
         
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Business Analysis in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0f9ff', borderColor: 'rgba(3,105,161,0.2)', color: C.textMuted }}>
              AI tools don't replace Business Analysts — they <em style={{ color: C.primary }}>amplify</em> them. BAs who use AI for transcript analysis, process mining, and automated documentation generate requirements faster and with fewer gaps — freeing time for the human judgment that no model can replicate: stakeholder trust, political navigation, and nuanced negotiation.
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Senior BAs at financial services firms and consulting companies often earn at the top of each band. Contract rates can be 30–60% higher.</p>
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
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f0f9ff', borderColor: 'rgba(3,105,161,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> BAs in financial services (banking, insurance, asset management) and management consulting earn 25–40% more than those in retail or public sector. Domain expertise in regulated industries commands the highest premiums.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring Business Analysts" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into Business Analysis from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Business Analysis" iconBg={C.redLight} iconColor={C.red} />
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
                Business Analysis is <strong style={{ color: C.primary }}>the discipline that makes technology investments pay off</strong>. For every project that ships the wrong thing, there was a missing BA — someone who could have asked the right questions, surfaced the hidden requirements, and aligned the team before a single line of code was written.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The skills you build as a BA — structured thinking, communication, facilitation, and domain expertise — compound into leadership in a way that few technical paths match. Start documenting requirements today, even informally. Your portfolio begins with the first process you map.
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open your notebook and map your first process.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
  
           <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start asking the right questions today. Your future self will thank you.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}