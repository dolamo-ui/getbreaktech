import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft, ArrowRight, Check, X,
  Clock, DollarSign, Rocket,
  CheckCircle2, Code, MessageSquare, Play, ExternalLink,
  GraduationCap, Scale, ThumbsUp, ThumbsDown,
  Briefcase, Coffee, Users, Lightbulb, Monitor, Home,
  Sparkles, Zap, TrendingUp,
  Link2, Download, Share2, Copy, CheckCheck,
  BookOpen, AlertTriangle, RefreshCw, Star, Calendar,
  Award, Target, Flame, BarChart2, Database,
  Layers, FileText, Compass, PieChart, Globe, Search,
  CheckSquare, Layout, Map, Mic, Package,
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
  primary: '#7c3aed',         // violet — PM brand colour
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
  teal: '#0891b2',
  tealLight: 'rgba(8,145,178,0.08)',
}

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const CAREER_LEVELS = [
  { level: 'Beginner', title: 'Associate PM', duration: '0–2 yrs', salary: 'R380k–R580k', description: 'Write specs, manage backlogs, run sprint ceremonies, and support senior PMs with research and delivery.', skills: ['User Stories', 'Jira', 'Wireframing', 'Agile'], accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)' },
  { level: 'Intermediate', title: 'Product Manager', duration: '2–5 yrs', salary: 'R700k–R1.2M', description: 'Own a product area end-to-end, define roadmaps, drive cross-functional execution, and ship meaningful features.', skills: ['Roadmapping', 'OKRs', 'A/B Testing', 'SQL'], accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)' },
  { level: 'Advanced', title: 'Senior PM', duration: '5–8 yrs', salary: 'R1.2M–R1.9M', description: 'Define product strategy, mentor PMs, manage stakeholders at exec level, and drive company-level outcomes.', skills: ['Product Strategy', 'OKRs', 'P&L Thinking', 'Leadership'], accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)' },
  { level: 'Expert', title: 'Director / VP Product', duration: '8+ yrs', salary: 'R2M+', description: 'Lead product orgs, shape company strategy, allocate resources, and define the vision that drives entire product lines.', skills: ['Vision', 'Org Design', 'P&L', 'Executive Comms'], accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)' },
]

const ROADMAP_STEPS = [
  { step: 1, title: 'Product Thinking & Frameworks', description: 'Develop the mental models PMs use daily — Jobs-to-be-Done, user needs vs. solutions, outcome vs. output, and the core PM mindset of building the right thing.', duration: '1–2 months', skills: ['JTBD', 'Problem Framing', 'User Empathy', 'Product Sense'] },
  { step: 2, title: 'Discovery & User Research', description: 'Learn how to validate problems before building solutions. Conduct interviews, run surveys, analyse feedback, and synthesise insights into actionable requirements.', duration: '1–2 months', skills: ['User Interviews', 'Surveys', 'Personas', 'Opportunity Trees'] },
  { step: 3, title: 'Product Strategy & Roadmapping', description: 'Connect company goals to product decisions. Write compelling product visions, define OKRs, prioritise ruthlessly, and communicate roadmaps to all audiences.', duration: '1–2 months', skills: ['OKRs', 'RICE', 'Now/Next/Later', 'Stakeholder Comms'] },
  { step: 4, title: 'Agile Delivery & Execution', description: 'Master the delivery cycle — writing specs and user stories, running sprints, unblocking engineers, managing scope, and shipping products on time with quality.', duration: '2–3 months', skills: ['Scrum', 'User Stories', 'Jira', 'Sprint Planning'] },
  { step: 5, title: 'Data, Metrics & Experimentation', description: 'Product decisions must be data-informed. Learn SQL basics, define north star metrics, design A/B experiments, and use dashboards to understand product health.', duration: '2–3 months', skills: ['SQL Basics', 'A/B Testing', 'Mixpanel', 'North Star Metrics'] },
  { step: 6, title: 'Influence, Stakeholders & Leadership', description: 'PMs lead without authority. Master the art of influencing engineering, design, and business stakeholders — and communicating up to executives with clarity and conviction.', duration: '1–2 months', skills: ['Stakeholder Mgmt', 'Executive Comms', 'Negotiation', 'Storytelling'] },
]

const HARD_SKILLS = [
  { name: 'Product Strategy & Roadmapping', level: 94 },
  { name: 'Agile / Scrum Delivery', level: 90 },
  { name: 'User Research & Discovery', level: 88 },
  { name: 'Data Analysis & SQL', level: 75 },
  { name: 'Wireframing & Prototyping', level: 72 },
  { name: 'A/B Testing & Experimentation', level: 68 },
  { name: 'Technical Literacy (APIs, Systems)', level: 62 },
  { name: 'Go-to-Market & Launch Strategy', level: 58 },
]

const SOFT_SKILLS = [
  { name: 'Strategic Thinking', description: 'Connect every feature decision to business outcomes and company strategy. Ask "why" before "what" and "what" before "how".' },
  { name: 'Influence Without Authority', description: 'PMs own outcomes but don\'t manage the teams who deliver them. Persuasion, credibility, and relationships are your most powerful tools.' },
  { name: 'Clear Communication', description: 'Translate complex trade-offs for engineers, executives, and customers — each of whom needs a completely different framing.' },
  { name: 'Prioritisation Discipline', description: 'Say no more than you say yes. Every item you add to the backlog delays everything else — ruthless prioritisation is a core PM superpower.' },
  { name: 'Customer Obsession', description: 'Stay close to real users. The best PMs interview customers weekly and let those insights drive every significant decision.' },
  { name: 'Resilience & Ambiguity Tolerance', description: 'Products change, priorities shift, and launches fail. Great PMs recover fast, learn faster, and keep the team moving forward.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Business / CS / Engineering Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(124,58,237,0.2)', bgColor: '#faf5ff', typeBg: 'rgba(124,58,237,0.12)', typeColor: '#7c3aed',
    pros: ['Broad foundation across strategy and tech', 'Campus recruiting pipelines', 'Credibility at top-tier companies', 'Network of future founders'],
    cons: ['Slow and expensive path to entry', 'Degree rarely teaches PM skills directly', 'Risk of over-qualifying for APM roles', 'Theory heavy, practice light'],
  },
  {
    type: 'Bootcamp', title: 'PM Bootcamp / Certificate', duration: '2–4 months', cost: 'R50k – R120k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Structured, job-focused curriculum', 'Portfolio and mock interview prep', 'Cohort network & accountability', 'Career support included'],
    cons: ['Variable programme quality', 'Credential not always respected', 'Limited depth on strategy & data', 'Competitive market entry'],
  },
  {
    type: 'Self-Taught', title: 'Books, Courses & Internal Move', duration: '6–18 months', cost: 'R0 – R10k',
    borderColor: 'rgba(8,145,178,0.2)', bgColor: '#f0f9ff', typeBg: 'rgba(8,145,178,0.12)', typeColor: '#0891b2',
    pros: ['Cheapest and most flexible', 'Transition from adjacent role (eng, design)', 'Build real PM artefacts on the job', 'Domain expertise already in hand'],
    cons: ['Needs strong self-direction', 'No credential or cohort structure', 'Hard to get first PM role cold', 'Easy to plateau without feedback'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Standup & Async Review', desc: 'Check engineering status, review overnight metrics, and clear blockers before the team gets deep into work', duration: '30 min', icon: <Users size={14} /> },
  { time: '9:30', act: 'Deep Work Block', desc: 'Strategy, spec writing, or roadmap review — deep cognitive work done while focus is highest', duration: '2 hrs', icon: <FileText size={14} /> },
  { time: '11:30', act: 'User Interview or Research', desc: 'A 45-minute customer call to understand pain points and validate upcoming priorities', duration: '45 min', icon: <Mic size={14} /> },
  { time: '1:30', act: 'Lunch & Recovery', desc: 'Away from Slack. The best product ideas arrive in these quiet gaps', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:30', act: 'Cross-Functional Sync', desc: 'Engineering, design, or data review. Unblock, decide, and align on next sprint priorities', duration: '1.5 hrs', icon: <Layers size={14} /> },
  { time: '4:00', act: 'Stakeholder Update', desc: 'Write the weekly product update or prepare slides for the exec review on Friday', duration: '45 min', icon: <BarChart2 size={14} /> },
  { time: '4:45', act: 'Backlog Grooming & Notes', desc: 'Prioritise backlog, document decisions from the day, and clear open Jira items', duration: '45 min', icon: <CheckSquare size={14} /> },
]

const TOOLS = [
  { name: 'Jira', cat: 'Delivery' }, { name: 'Notion', cat: 'Docs' },
  { name: 'Figma', cat: 'Design' }, { name: 'Mixpanel', cat: 'Analytics' },
  { name: 'Amplitude', cat: 'Analytics' }, { name: 'Miro', cat: 'Whiteboard' },
  { name: 'Linear', cat: 'Delivery' }, { name: 'Productboard', cat: 'Roadmap' },
]

const WORK_ENVS = [
  { type: 'Hybrid', pct: 52 },
  { type: 'Remote', pct: 33 },
  { type: 'In-Office', pct: 15 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Assisted Discovery', icon: <Sparkles size={20} />,
    desc: 'Use Claude and ChatGPT to analyse interview transcripts, synthesise qualitative feedback at scale, and generate user personas from raw research notes in minutes.',
    tools: ['Claude', 'ChatGPT', 'Dovetail AI', 'Notion AI'],
    borderColor: 'rgba(124,58,237,0.18)', bgColor: '#faf5ff', icoBg: 'rgba(124,58,237,0.12)', icoColor: '#7c3aed', tagBg: 'rgba(124,58,237,0.1)', tagColor: '#7c3aed', titleColor: '#7c3aed',
  },
  {
    title: 'Automated Spec Writing', icon: <Zap size={20} />,
    desc: 'Draft PRDs, user stories, and acceptance criteria faster using AI. PMs who prompt well ship specs 3–5× faster, leaving more time for strategy and customer work.',
    tools: ['Claude', 'GitHub Copilot', 'Notion AI', 'ClickUp AI'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
  {
    title: 'AI Products as PM Territory', icon: <TrendingUp size={20} />,
    desc: 'PMs who understand LLM capabilities, prompt design, and AI UX patterns are leading the most valuable product opportunities in 2026. This is the new frontier.',
    tools: ['OpenAI API', 'LangChain', 'Hugging Face', 'Anthropic'],
    borderColor: 'rgba(8,145,178,0.18)', bgColor: '#f0f9ff', icoBg: 'rgba(8,145,178,0.12)', icoColor: '#0891b2', tagBg: 'rgba(8,145,178,0.1)', tagColor: '#0891b2', titleColor: '#0891b2',
  },
]

const FUTURE_SKILLS = [
  'AI Product Management & LLM UX', 'Platform & API Product Strategy',
  'Causal Inference for PMs', 'Growth & Monetisation Loops',
  'Developer Experience (DevEx) PM', 'Product-Led Growth (PLG)',
]

const PROS = [
  { title: 'Strategic Seat at the Table', desc: 'PMs influence roadmap, positioning, pricing, and go-to-market. Few roles carry this level of business impact without being C-suite.' },
  { title: 'Exceptional Compensation', desc: 'Senior PMs at tech companies earn R1.5M–R2M+ in South Africa. Global remote roles multiply that significantly.' },
  { title: 'Clear Path to Leadership', desc: 'PM is the most natural path to CPO, CEO, or founder. A disproportionate number of startup founders are former PMs.' },
  { title: 'Intellectually Stimulating', desc: 'Every product is a puzzle of user needs, tech constraints, and business strategy. No two days or problems are the same.' },
  { title: 'Cross-Functional Exposure', desc: 'PMs work with engineering, design, data, sales, and marketing. You develop fluency across every function of a company.' },
  { title: 'Remote-Friendly Work', desc: 'PM work translates well to asynchronous remote environments — 33% of PM roles are now fully remote globally.' },
]

const CONS = [
  { title: 'Responsibility Without Authority', desc: 'You\'re accountable for product outcomes but don\'t manage any of the people who deliver them. It can be deeply frustrating.' },
  { title: 'Politics and Stakeholder Management', desc: 'A significant portion of the job is managing conflicting priorities, egos, and competing agendas across the business.' },
  { title: 'Constant Context Switching', desc: 'A PM day involves switching between strategy, execution details, customer calls, and technical decisions every 30 minutes.' },
  { title: 'Vague Success Criteria', desc: 'Unlike engineering or design, PM success is hard to measure. Proving your contribution to outcomes can be difficult.' },
  { title: 'Hard to Break Into', desc: 'Entry-level PM roles are highly competitive. Without an existing tech background, breaking in typically requires a roundabout path.' },
  { title: 'Breadth Over Depth', desc: 'PMs know a little about everything. If you crave deep technical mastery in one domain, PM\'s generalist nature may frustrate you.' },
]

const VIDEOS = [
  { id: 'yoFKwHfHnN8', title: 'How to Become a Product Manager', desc: 'Shreyas Doshi shares the most honest and practical breakdown of what it takes to succeed as a PM at any level.', dur: '18:44', channel: 'Shreyas Doshi' },
  { id: '4NkO-oJm2hU', title: 'Product Strategy Fundamentals', desc: 'A masterclass on connecting vision to execution — exactly the strategic thinking employers test for in PM interviews.', dur: '22:30', channel: 'Lenny Rachitsky' },
  { id: 'T-4k-eGAnuA', title: 'User Research Methods for PMs', desc: 'How to run effective user interviews, extract insights, and turn qualitative data into confident product decisions.', dur: '16:55', channel: 'Product School' },
]

const TAKEAWAYS = [
  'Build something — even a tiny side project — before applying for your first PM role',
  'SQL is not optional. Learn enough to query product metrics without asking a data analyst',
  'Strategy is knowing what NOT to build. Practise saying no with clear reasoning',
  'Your most important skill is communication — write more, present more, get feedback',
  'Get close to customers every week. Everything else follows from that habit',
]

/* ─── NEW SECTIONS ────────────────────────────────────────────────────────── */

const CAREER_FACTS = [
  { icon: <Map size={20} />, title: 'What You Own', desc: 'The product roadmap, feature prioritisation, user stories, OKRs, launch strategies, and the product\'s commercial performance over time.', color: '#7c3aed' },
  { icon: <Users size={20} />, title: 'Core Activities', desc: 'Customer interviews, roadmap planning, sprint ceremonies, data analysis, stakeholder meetings, spec writing, and launch coordination.', color: '#16a34a' },
  { icon: <Layers size={20} />, title: 'Who You Work With', desc: 'Software engineers, UX designers, data analysts, marketing, sales, customer success, and executives — basically everyone.', color: '#0891b2' },
  { icon: <TrendingUp size={20} />, title: 'Industry Demand', desc: 'PM roles grew 32% globally in 2024. The rise of AI products has created an entirely new category of PM demand that will dominate hiring through 2030.', color: '#ea580c' },
]

const WHY_REASONS = [
  { emoji: '🎯', title: 'You Shape What Gets Built', desc: 'PMs sit at the centre of every important product decision. You define what problems to solve and why, before anyone writes a single line of code.' },
  { emoji: '💰', title: 'Elite Compensation', desc: 'Senior PMs at scaling tech companies earn R1.5M–R2M+ in South Africa. With global remote roles, those figures can triple in USD.' },
  { emoji: '🚀', title: 'Most Direct Path to Founder', desc: 'More tech founders come from PM backgrounds than any other function. Every day as a PM is practice for running a company.' },
  { emoji: '🧩', title: 'Strategy Meets Execution', desc: 'PM is rare in combining big-picture thinking with the gritty reality of daily delivery. You never get bored because no two weeks look the same.' },
  { emoji: '🌍', title: 'Work Across Every Industry', desc: 'Every tech company — fintech, health, education, logistics, media — needs PMs. Your skills are fully transferable across all of them.' },
  { emoji: '📈', title: 'Clear Path to Leadership', desc: 'PM is the clearest route to CPO or CEO. You\'re already thinking like a general manager from day one — just at product scale.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#7c3aed', bgColor: '#faf5ff', items: [
    { name: 'Lenny\'s Newsletter PM Course', url: '#', type: 'Course', rating: 5 },
    { name: 'Reforge — Product Strategy', url: '#', type: 'Programme', rating: 5 },
    { name: 'Product School Free Courses', url: '#', type: 'Course', rating: 4 },
    { name: 'Coursera PM Specialisation (Google)', url: '#', type: 'Course', rating: 4 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'PM Exercises (pmexercises.com)', url: '#', type: 'Practice', rating: 5 },
    { name: 'Exponent PM Interview Prep', url: '#', type: 'Interview', rating: 5 },
    { name: 'Build a feature for an existing app', url: '#', type: 'Project', rating: 5 },
    { name: 'Kaggle for PM Metrics (SQL)', url: '#', type: 'Practice', rating: 4 },
  ]},
  { category: 'Community', color: '#0891b2', bgColor: '#f0f9ff', items: [
    { name: 'Lenny\'s Podcast', url: '#', type: 'Podcast', rating: 5 },
    { name: 'r/productmanagement', url: '#', type: 'Forum', rating: 4 },
    { name: 'Mind the Product', url: '#', type: 'Community', rating: 5 },
    { name: 'Shreyas Doshi on X/Twitter', url: '#', type: 'Newsletter', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Associate PM', range: 'R380k – R580k', midpoint: 480, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Product Manager', range: 'R700k – R1.2M', midpoint: 950, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Product Manager', range: 'R1.2M – R1.9M', midpoint: 1550, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Director / VP of Product', range: 'R2M – R4M+', midpoint: 2800, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  { num: '01', title: 'Solutionising Before Diagnosing', desc: 'Jumping straight to feature ideas before truly understanding the user problem. Features that solve the wrong problem perfectly are worthless.', fix: 'Write a one-sentence problem statement before touching any wireframe or backlog item.' },
  { num: '02', title: 'Treating the Roadmap as a Feature List', desc: 'A roadmap filled with features is a commitment to solutions. A good roadmap is a bet on outcomes — always anchor it to metrics and goals.', fix: 'Reframe every roadmap item as "we believe X will achieve outcome Y, measured by Z."' },
  { num: '03', title: 'Avoiding Technical Depth', desc: 'Relying entirely on engineers to assess feasibility. PMs who understand technical trade-offs earn 10× more respect from their team.', fix: 'Spend 2 hours a week with an engineer understanding how the current system works.' },
  { num: '04', title: 'No Metrics Ownership', desc: 'Shipping features without defining what success looks like first. If you can\'t measure it, you can\'t improve it and you can\'t claim the win.', fix: 'Define a primary and secondary success metric before starting development on any feature.' },
  { num: '05', title: 'Poor Stakeholder Management', desc: 'Surprising stakeholders with bad news, scope cuts, or delays. Nothing erodes PM credibility faster than executives hearing bad news late.', fix: 'Over-communicate proactively. Bad news delivered early is always better than bad news delivered late.' },
  { num: '06', title: 'Skipping User Research', desc: 'Making decisions based on loudest internal voice ("the CEO wants it") instead of actual user evidence. One of the most common PM failure modes.', fix: 'Talk to at least 3 users before adding any item to the top of your roadmap.' },
]

const CAREER_CHANGE_PATHS = [
  { from: 'Software Engineer', ease: 'Very Manageable', easeColor: '#7c3aed', easeBg: '#faf5ff', desc: 'Technical credibility is a massive advantage. Add strategy, communication, and customer empathy skills to make the jump into Technical PM or PM roles at dev-tool companies.', steps: ['Shadow current PM for 1 month', 'Write 3 mock PRDs', 'Build an internal tool as PM lead', 'Apply for Technical PM roles'] },
  { from: 'UX Designer', ease: 'Natural Fit', easeColor: '#16a34a', easeBg: '#f0fdf4', desc: 'Your user empathy and design thinking are already core PM skills. Add business strategy, metrics fluency, and stakeholder management to complete the picture.', steps: ['Learn SQL and product metrics', 'Own a roadmap item end-to-end', 'Study OKR frameworks', 'Target design-forward product companies'] },
  { from: 'Data Analyst / Data Scientist', ease: 'Strong Fit', easeColor: '#0891b2', easeBg: '#f0f9ff', desc: 'Your metrics fluency and analytical rigour are rare in PM. Bridge the gap with product strategy, customer discovery, and cross-functional leadership.', steps: ['Complete a PM course or bootcamp', 'Learn Agile delivery basics', 'Run a side project as PM', 'Apply for growth or data PM roles'] },
  { from: 'Other Background', ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed', desc: 'Domain expertise + PM skills is a powerful combination. A PM with legal, finance, or healthcare background commands a premium at companies in those industries.', steps: ['Start with APM programme or bootcamp', 'Build a product portfolio project', 'Get PM-adjacent role (BizOps, CS)', 'Target vertical/niche PM roles in your domain'] },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'PM Foundations', color: '#7c3aed', bg: '#faf5ff', days: [
    { day: 'Day 1–2', task: 'Read "Inspired" by Marty Cagan (chapters 1–10). Understand the PM role deeply.' },
    { day: 'Day 3–4', task: 'Study core frameworks: JTBD, Opportunity Solution Trees, and north star metrics.' },
    { day: 'Day 5–6', task: 'Study RICE, Kano, and Now/Next/Later prioritisation frameworks with examples.' },
    { day: 'Day 7', task: 'Write your first mock PRD for a feature of an app you use daily.' },
  ]},
  { week: 'Week 2', theme: 'Research & Discovery', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Study user interview techniques — watch 3 PM discovery call recordings on YouTube.' },
    { day: 'Day 10–11', task: 'Conduct 3 informal user interviews about a product you use. Document insights.' },
    { day: 'Day 12–13', task: 'Create a user persona and an opportunity solution tree from your research.' },
    { day: 'Day 14', task: 'Write a short research summary as if presenting to a product team. Get feedback.' },
  ]},
  { week: 'Week 3', theme: 'Metrics & Delivery', color: '#0891b2', bg: '#f0f9ff', days: [
    { day: 'Day 15–16', task: 'Learn SQL basics on Mode Analytics: SELECT, GROUP BY, JOIN, subqueries.' },
    { day: 'Day 17–18', task: 'Study Agile/Scrum: sprint ceremonies, user story writing, and acceptance criteria.' },
    { day: 'Day 19–20', task: 'Design a 6-week feature delivery plan for your mock PRD with milestones.' },
    { day: 'Day 21', task: 'Define north star metric and 3 supporting KPIs for your mock product.' },
  ]},
  { week: 'Week 4', theme: 'Ship & Show', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Build a simple product roadmap in Notion or Productboard for your mock project.' },
    { day: 'Day 25–26', task: 'Create a 5-slide stakeholder deck presenting your product vision and roadmap.' },
    { day: 'Day 27–28', task: 'Record a 5-min Loom walkthrough of your PRD and roadmap. Share it online.' },
    { day: 'Day 29–30', task: 'Write a LinkedIn post about your PM journey. Tag 3 PMs you admire. Apply to 5 APM roles.' },
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
      try { await navigator.share({ title: 'Product Manager Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Product Manager in 2026', url: window.location.href }) }
      catch (_) {}
    } else { handleCopy() }
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-10 p-4 rounded-2xl" style={{ background: '#f8f9ff', border: `1px solid ${C.border}` }}>
      <span className="text-xs font-semibold" style={{ color: C.textMuted }}>Share this roadmap:</span>
      <button onClick={handleCopy} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: copied ? 'rgba(22,163,74,0.1)' : C.primaryLight, color: copied ? '#16a34a' : C.primary, outline: 'none' }}>
        {copied ? <CheckCheck size={13} /> : <Copy size={13} />}{copied ? 'Copied!' : 'Copy Link'}
      </button>
      <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: C.tealLight, color: C.teal, outline: 'none' }}>
        <Download size={13} />Download / Save PDF
      </button>
      <button onClick={handleShare} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: C.orangeLight, color: C.orange, outline: 'none' }}>
        <Share2 size={13} />Share
      </button>
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono truncate max-w-xs" style={{ background: '#f1f5f9', color: C.textMuted, border: `1px solid ${C.border}` }}>
        <Link2 size={11} style={{ color: C.textFaint, flexShrink: 0 }} />
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/product-manager'}</span>
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
export default function ProductManagerRoadmapPage() {
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
          <img src="https://i.imgur.com/RNgJv7s.jpeg" alt="Product Manager workspace" className="w-full h-full object-cover object-center block" style={{ filter: 'saturate(0.55) brightness(1.05)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Layers size={12} /> Product & Strategy
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>Product Manager</h1>
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
            Shape the products that millions of people use. Product managers sit at the intersection of business, technology, and design — translating user needs into strategy and strategy into shipped software.
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
            <SectionHeader icon={<Package size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Product Management" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#faf5ff', borderColor: 'rgba(124,58,237,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Product Manager</strong> is often called the "CEO of the product" — not because they manage people, but because they are responsible for the product's outcomes. PMs bridge the gap between customer problems, business goals, and technical solutions, deciding what gets built, when, and why.
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
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={whyRef}>
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Product Management could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Product Manager workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>APM → Director</span></div>
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
              const icons = ['🧠', '🔍', '🗺️', '⚙️', '📊', '🤝']
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
                        {isEven ? <polygon points="372,36 388,44 372,52" fill={accentColors[i+1] ?? accent} opacity="0.5" /> : <polygon points="28,36 12,44 28,52" fill={accentColors[i+1] ?? accent} opacity="0.5" />}
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
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>8–12 months · Consistent daily practice · Build real PM artefacts</div>
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
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.indigoLight }}><Layout size={16} style={{ color: C.indigo }} /></div>
                  <div><div className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Hard Skills</div><div className="text-xs mt-0.5" style={{ color: C.textMuted }}>Technical competencies required</div></div>
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
            <SectionHeader icon={<BookOpen size={22} />} title="Best Free Resources" subtitle="World-class learning material, most of it free" iconBg={C.greenLight} iconColor={C.green} />
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Product Management in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#faf5ff', borderColor: 'rgba(124,58,237,0.2)', color: C.textMuted }}>
              AI doesn't replace PMs — it <em style={{ color: C.primary }}>elevates</em> them. A PM who uses Claude to synthesise research, draft PRDs, and analyse customer feedback moves 3–5× faster and spends far more time on the high-leverage strategic work that creates real value.
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially for senior and principal roles — can pay 2–4× these figures in USD.</p>
            </div>
            <div className="space-y-4">
              {SALARY_DATA.map(row => (
                <div key={row.role} className="rounded-2xl p-5 border" style={{ background: '#f8f9ff', borderColor: C.border }}>
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div><span className="text-sm font-bold" style={{ color: C.text }}>{row.role}</span><span className="ml-3 text-xs font-mono" style={{ color: C.textFaint }}>{row.yoe}</span></div>
                    <span className="text-sm font-bold" style={{ color: row.color }}>{row.range}</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 3400) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#faf5ff', borderColor: 'rgba(124,58,237,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> PMs at product-led growth (PLG) companies — where the product itself drives revenue — earn 25–40% more than those at service or consulting firms. Target SaaS, fintech, or consumer tech.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring PMs" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into PM from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators and practitioners in Product Management" iconBg={C.redLight} iconColor={C.red} />
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
                Product management is one of the most <strong style={{ color: C.primary }}>rewarding and challenging</strong> careers in technology. It demands that you be simultaneously visionary and pragmatic, analytical and empathetic, decisive and humble. The best PMs are relentlessly curious about customers and brutally honest about what the data says.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The difference between someone who "tried to get into PM" and someone who landed the role almost always comes down to one thing: a tangible, well-documented artefact — a PRD, a roadmap, a case study — that proves you can already think like a product manager.
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open Notion and write your first PRD.
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