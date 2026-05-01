import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft, ArrowRight, Check, X,
  Clock, DollarSign, Rocket,
  CheckCircle2, MessageSquare, Play, ExternalLink,
  GraduationCap, Scale, ThumbsUp, ThumbsDown,
  Briefcase, Coffee, Users,
  Sparkles, Zap, TrendingUp,
  Link2, Download, Share2, Copy, CheckCheck,
  BookOpen, AlertTriangle, RefreshCw, Star, Calendar,
  Award, Target, Flame,
  Layers,
  GitBranch,
  Workflow, Eye, PenTool, Layout,
  Search,
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
  primary: '#7c3aed',         // violet — UX/UI brand colour
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
  pink: '#db2777',
  pinkLight: 'rgba(219,39,119,0.08)',
  cyan: '#0891b2',
  cyanLight: 'rgba(8,145,178,0.08)',
}

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const CAREER_LEVELS = [
  {
    level: 'Junior', title: 'Junior UX/UI Designer', duration: '0–2 yrs', salary: 'R280k–R480k',
    description: 'Create wireframes, assist on user research, build UI components under guidance, and learn design systems. Your craft and eye for detail are your classroom.',
    skills: ['Figma', 'Wireframing', 'UI Components', 'User Research Basics'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'UX/UI Designer', duration: '2–5 yrs', salary: 'R580k–R1M',
    description: 'Own end-to-end design of features — from discovery and research to high-fidelity UI and developer handoff. Lead usability tests and define interaction patterns.',
    skills: ['Design Systems', 'Prototyping', 'Usability Testing', 'Accessibility'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior UX/UI Designer', duration: '5–8 yrs', salary: 'R1M–R1.7M',
    description: 'Drive design strategy, establish design language, mentor junior designers, and influence product direction through deep user insights and business alignment.',
    skills: ['Design Leadership', 'Strategy', 'Research Ops', 'Cross-Functional'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'Principal / Design Lead', duration: '8+ yrs', salary: 'R1.8M+',
    description: 'Define product vision and design philosophy at the organisational level. Grow and manage design teams, drive research culture, and shape company-wide UX standards.',
    skills: ['Design Vision', 'Team Building', 'Design Ops', 'Exec Alignment'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Design Fundamentals — Visual Design Principles',
    description: 'Master the timeless principles that underpin all great design: typography, colour theory, hierarchy, grid systems, spacing, and gestalt psychology. These principles apply across every medium and are never outgrown.',
    duration: '1–2 months', skills: ['Typography', 'Colour Theory', 'Grid Systems', 'Visual Hierarchy'],
  },
  {
    step: 2, title: 'UX Research & User Psychology',
    description: 'Design is only as good as your understanding of users. Learn qualitative and quantitative research methods — interviews, surveys, usability testing, heuristic evaluation — and how to translate findings into actionable design decisions.',
    duration: '1–2 months', skills: ['User Interviews', 'Usability Testing', 'Heuristics', 'Personas'],
  },
  {
    step: 3, title: 'Wireframing & Information Architecture',
    description: 'Define the structure and flow of digital products before committing to visual style. Master low-fidelity wireframes, user flows, site maps, and information architecture to solve navigation and hierarchy problems early.',
    duration: '1–2 months', skills: ['Wireframing', 'User Flows', 'Site Maps', 'IA Principles'],
  },
  {
    step: 4, title: 'Figma & Prototyping Mastery',
    description: 'Figma is the industry standard. Master components, auto-layout, design tokens, variants, interactive prototypes, and developer handoff workflows. Know every shortcut — speed and precision in Figma are professional skills.',
    duration: '2–3 months', skills: ['Figma', 'Components', 'Auto-Layout', 'Prototyping'],
  },
  {
    step: 5, title: 'Design Systems & Accessibility',
    description: 'Scalable design starts with systems. Learn to build and maintain design systems with reusable components, tokens, and documentation. Understand WCAG accessibility guidelines and design inclusive products from the start.',
    duration: '2–3 months', skills: ['Design Systems', 'WCAG 2.1', 'Component Libraries', 'Tokens'],
  },
  {
    step: 6, title: 'Advanced UX Strategy & Portfolio',
    description: 'At senior level, the question shifts from "how does it look?" to "does it solve the right problem?". Study product strategy, OKR alignment, Jobs-to-be-Done, and design metrics. Build a portfolio of case studies that demonstrate impact, not just craft.',
    duration: '3–4 months', skills: ['Product Strategy', 'UX Metrics', 'Case Studies', 'Storytelling'],
  },
]

const HARD_SKILLS = [
  { name: 'Figma & Prototyping', level: 96 },
  { name: 'Visual Design & UI Craft', level: 92 },
  { name: 'User Research Methods', level: 85 },
  { name: 'Design Systems', level: 82 },
  { name: 'Information Architecture', level: 80 },
  { name: 'Accessibility (WCAG)', level: 74 },
  { name: 'Motion & Microinteractions', level: 68 },
  { name: 'HTML/CSS Basics', level: 60 },
]

const SOFT_SKILLS = [
  { name: 'Empathy & User Advocacy', description: 'The best UX designers are relentless advocates for the user inside the organisation. They bring data and stories from real users into every product decision.' },
  { name: 'Design Critique', description: 'Give and receive critique constructively. Great design teams grow through honest, specific feedback grounded in user needs and design principles — not personal taste.' },
  { name: 'Visual Storytelling', description: 'Your design presentation IS part of the design. The ability to walk a stakeholder through a decision with narrative clarity is as important as the pixels themselves.' },
  { name: 'Cross-Functional Collaboration', description: 'UX designers sit between product, engineering, and business. Fluency in each team\'s language and constraints makes you the most influential person in the room.' },
  { name: 'Systems Thinking', description: 'See patterns across the whole product, not just individual screens. Understand how a change on one flow affects the experience five steps later and across five different devices.' },
  { name: 'Handling Ambiguity', description: 'The brief is almost never complete. Senior designers are comfortable starting with nothing but a problem statement and working toward clarity through research and iteration.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Design or HCI Degree', duration: '3–4 years', cost: 'R350k – R900k',
    borderColor: 'rgba(124,58,237,0.2)', bgColor: '#faf5ff', typeBg: 'rgba(124,58,237,0.12)', typeColor: '#7c3aed',
    pros: ['Deep theoretical grounding in design principles', 'Formal exposure to HCI, psychology, and research methods', 'Portfolio-building over multiple years', 'Access to internship pipelines at design studios'],
    cons: ['High cost relative to outcomes', 'Often behind industry tooling (Figma, etc.)', 'Degree not always required by employers', 'Graduate portfolios often lack real-world product work'],
  },
  {
    type: 'Bootcamp', title: 'UX/UI Design Bootcamp', duration: '3–6 months', cost: 'R40k – R100k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Fast path to a presentable portfolio', 'Current tooling curriculum (Figma, Maze, etc.)', 'Career mentorship and hiring events', 'Cohort accountability structure'],
    cons: ['Highly variable programme quality', 'Credential means little without portfolio', 'Minimal research and strategy depth', 'Junior market entry is competitive'],
  },
  {
    type: 'Self-Taught', title: 'Online Courses & Freelance', duration: '12–18 months', cost: 'R0 – R6k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['World-class free content (Google UX Course, Figma Learn)', 'Build real projects from day one', 'Fully self-paced', 'Early freelance projects build portfolio and confidence'],
    cons: ['Self-discipline is non-negotiable', 'Easy to skip research and strategy fundamentals', 'No credential or structured feedback', 'Imposter syndrome is common and real'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Design Reviews & Standups', desc: 'Review designs with product and engineering, align on scope changes, and share progress on active features', duration: '45 min', icon: <Users size={14} /> },
  { time: '9:45', act: 'Deep Design Work', desc: 'Uninterrupted time in Figma — exploring solutions, building components, iterating on screens based on feedback', duration: '2.5 hrs', icon: <PenTool size={14} /> },
  { time: '12:15', act: 'Research & User Interviews', desc: 'Conduct user interviews, analyse session recordings, review analytics, and synthesise research findings into insights', duration: '1 hr', icon: <Search size={14} /> },
  { time: '1:15', act: 'Lunch & Inspiration', desc: 'Step away from the screen. Browse Dribbble, read design articles, or simply let your subconscious process design problems', duration: '45 min', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Stakeholder Presentations', desc: 'Present design decisions, walk through prototypes, gather feedback from product and business stakeholders', duration: '1 hr', icon: <Layout size={14} /> },
  { time: '3:00', act: 'Dev Handoff & Specs', desc: 'Prepare detailed design specs, annotate edge cases, answer developer questions, and review implemented UI', duration: '1.5 hrs', icon: <GitBranch size={14} /> },
  { time: '4:30', act: 'Learning & Inspiration', desc: 'Study design systems, explore new interaction patterns, or work on personal portfolio or side projects', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Figma', cat: 'Design & Prototype' }, { name: 'FigJam', cat: 'Workshops' },
  { name: 'Maze', cat: 'User Testing' }, { name: 'Hotjar', cat: 'Analytics' },
  { name: 'Notion', cat: 'Docs & Research' }, { name: 'Lottie', cat: 'Animation' },
  { name: 'Zeplin', cat: 'Dev Handoff' }, { name: 'Miro', cat: 'Collaboration' },
]

const WORK_ENVS = [
  { type: 'Remote', pct: 52 },
  { type: 'Hybrid', pct: 36 },
  { type: 'In-Studio', pct: 12 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Powered Design Generation', icon: <Sparkles size={20} />,
    desc: 'Figma AI, Galileo AI, and Uizard generate UI layouts, component variants, and design system tokens from prompts. Designers who leverage these tools iterate 3–5× faster on initial concepts.',
    tools: ['Figma AI', 'Galileo AI', 'Uizard', 'Relume'],
    borderColor: 'rgba(124,58,237,0.18)', bgColor: '#faf5ff', icoBg: 'rgba(124,58,237,0.12)', icoColor: '#7c3aed', tagBg: 'rgba(124,58,237,0.1)', tagColor: '#7c3aed', titleColor: '#7c3aed',
  },
  {
    title: 'AI-Assisted User Research', icon: <Zap size={20} />,
    desc: 'AI tools now synthesise hours of user interviews into themes, generate survey questions, and identify patterns in usability test recordings — compressing weeks of analysis into hours.',
    tools: ['Dovetail', 'EnjoyHQ', 'UserTesting AI', 'Notion AI'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI Accessibility Auditing', icon: <TrendingUp size={20} />,
    desc: 'AI tools automatically audit contrast ratios, check WCAG compliance, identify missing alt text, and flag interaction patterns that would fail assistive technology — before a single user is affected.',
    tools: ['Stark', 'Axe AI', 'Accessibility Insights', 'Equal Access'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'AI-Augmented Design Workflows', 'Spatial / AR UX Design',
  'Voice & Conversational Interface', 'Design Engineering (React + Figma)',
  'Quantitative UX & Metrics', 'Design for AI Systems (LLM UX)',
]

const PROS = [
  { title: 'Creative & Commercial at Once', desc: 'UX/UI design sits at the intersection of art and business. You get to make things beautiful AND solve real problems that affect millions of people daily.' },
  { title: 'High Remote Work Adoption', desc: 'Over 52% of UX/UI roles are fully remote. Design work travels exceptionally well — Figma is the same from anywhere on earth.' },
  { title: 'Excellent Compensation', desc: 'Senior UX/UI designers earn R1M–R1.7M in South Africa. Global remote roles in USD — particularly at top tech companies — can pay 2–3× those figures.' },
  { title: 'Impact at Human Scale', desc: 'The interfaces you design are used by thousands or millions of people. When you improve a flow, real people save real time and feel less frustrated every single day.' },
  { title: 'Massive and Diverse Job Market', desc: 'Every company that has a digital product needs UX/UI talent. From startups to banks to NGOs — the market for design skills is enormous and growing.' },
  { title: 'Transferable Across Industries', desc: 'Unlike engineering specialisations, design thinking and UX methodology transfer seamlessly across healthcare, fintech, edtech, e-commerce, and every other vertical.' },
]

const CONS = [
  { title: 'Subjective Feedback Can Be Draining', desc: '"Make it pop", "I just don\'t feel it", "Can we try something more modern?" — design invites opinions from everyone. Managing stakeholder taste without compromising user needs is a real challenge.' },
  { title: 'Tool Churn', desc: 'The design tooling landscape shifts frequently. Figma dominates today, but the ecosystem is always evolving and keeping current requires ongoing effort.' },
  { title: 'Research vs. Shipping Tension', desc: 'Product timelines don\'t always respect research timelines. Designers are regularly asked to produce solutions before proper research, creating tension between craft and speed.' },
  { title: 'Seat at the Table Isn\'t Guaranteed', desc: 'In less design-mature organisations, UX can be treated as a beautification layer rather than a strategic function. Fighting for design\'s role is a real part of the job.' },
  { title: 'Portfolio Maintenance is Ongoing', desc: 'Unlike code commits, a design portfolio requires active curation. Case studies need narrative, context, and evidence of outcomes — which takes considerable effort to document well.' },
  { title: 'Screen Time & Sedentary Work', desc: 'Long Figma sessions, detailed design reviews, and back-to-back video calls are physically demanding. Ergonomics and scheduled movement require deliberate attention.' },
]

const VIDEOS = [
  { id: 'c9Wg6Cb_YlU', title: 'UX Design Full Course for Beginners', desc: 'A comprehensive introduction to user experience design covering research, wireframing, prototyping, and the full end-to-end design process.', dur: '3:42:00', channel: 'freeCodeCamp' },
  { id: 'wIuVvCuiJhU', title: 'UI Design for Beginners — Full Figma Course', desc: 'Learn visual UI design and Figma from scratch — components, auto-layout, styles, and building a professional interface from a blank canvas.', dur: '1:28:00', channel: 'DesignCourse' },
  { id: 'Ovj4hFxko7c', title: 'UX Research Methods You Should Know', desc: 'A practical breakdown of the most important user research methods — when to use each one and how to synthesise findings into actionable insights.', dur: '22:45', channel: 'AJ&Smart' },
]

const TAKEAWAYS = [
  'Your portfolio is everything — one great case study that shows process, insight, and outcome beats ten polished mockups',
  'Learn to say why, not just what — design decisions must be rooted in user data or established principles',
  'Get comfortable presenting and defending your work — the best design loses if it can\'t be communicated',
  'Figma is the craft tool but design thinking is the real skill — never confuse the two',
  'Accessibility is not a feature, it\'s the baseline — design inclusively from the very first frame',
]

/* ─── NEW SECTIONS ────────────────────────────────────────────────────────── */

const CAREER_FACTS = [
  {
    icon: <Eye size={20} />, title: 'What You Design',
    desc: 'Web and mobile interfaces, dashboards, onboarding flows, design systems, prototypes, marketing pages, native apps, and the interaction patterns that make digital products feel effortless to use.',
    color: '#7c3aed',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'User research, wireframing, high-fidelity UI design, interactive prototyping, usability testing, design system maintenance, developer handoff, and stakeholder presentations.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Product managers, engineers, marketing teams, brand designers, data analysts, and business stakeholders — UX/UI designers are the connective tissue between all of them.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'UX/UI designers are among the most in-demand creative roles in the tech sector. Demand grew 22% in 2024 as companies invested heavily in product-led growth and user retention strategies.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🎨', title: 'Create Things Millions Use', desc: 'Every button, flow, and screen you design gets used by real humans. When you solve a problem elegantly, thousands of people have a better day because of your work.' },
  { emoji: '💰', title: 'Excellent Compensation', desc: 'Senior UX/UI designers earn R1M–R1.7M in South Africa. Global remote contracts at top companies in USD can double or triple that figure.' },
  { emoji: '🏠', title: 'Remote-First Career', desc: '52% of UX/UI roles are fully remote. Figma links replace office desks. Your design work travels anywhere in the world with a laptop and internet connection.' },
  { emoji: '🧠', title: 'Psychology Meets Craft', desc: 'Design is applied psychology. Understanding how humans perceive, decide, and feel is as valuable as your visual skills. It\'s intellectually deep and constantly evolving.' },
  { emoji: '🚀', title: 'Direct Business Impact', desc: 'Great UX directly lifts conversion rates, reduces churn, and increases user satisfaction scores. Designers who can show that impact become irreplaceable in any organisation.' },
  { emoji: '🌍', title: 'Industry-Agnostic Skills', desc: 'Your UX research, Figma fluency, and design thinking apply across healthcare, fintech, edtech, e-commerce, and government. You are never locked to one industry.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#7c3aed', bgColor: '#faf5ff', items: [
    { name: 'Google UX Design Certificate (Coursera)', url: '#', type: 'Course', rating: 5 },
    { name: 'Figma Learn — Official Free Tutorials', url: '#', type: 'Course', rating: 5 },
    { name: 'Interaction Design Foundation (IDF)', url: '#', type: 'Course', rating: 5 },
    { name: 'Nielsen Norman Group UX Articles', url: '#', type: 'Reference', rating: 5 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'Figma Community — Free templates & UI kits', url: '#', type: 'Resource', rating: 5 },
    { name: 'Daily UI — 100 design challenges', url: '#', type: 'Challenge', rating: 4 },
    { name: 'Mobbin — Real app design patterns library', url: '#', type: 'Reference', rating: 5 },
    { name: 'UX Challenges — Real-world scenarios', url: '#', type: 'Practice', rating: 4 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'DesignCourse YouTube Channel', url: '#', type: 'YouTube', rating: 5 },
    { name: 'r/UXDesign & r/UI_Design', url: '#', type: 'Forum', rating: 4 },
    { name: 'Design Better Podcast by InVision', url: '#', type: 'Podcast', rating: 5 },
    { name: 'Shift Nudge — Visual Design Newsletter', url: '#', type: 'Newsletter', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior UX/UI Designer', range: 'R280k – R480k', midpoint: 380, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'UX/UI Designer', range: 'R580k – R1M', midpoint: 790, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior UX/UI Designer', range: 'R1M – R1.7M', midpoint: 1350, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Principal / Design Lead', range: 'R1.8M – R3M+', midpoint: 2300, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Portfolio Without Process',
    desc: 'Showing only polished final screens. Recruiters and hiring managers want to understand how you think — the research, explorations, decisions, and iterations matter as much as the outcome.',
    fix: 'For every project, document your problem, process, decisions, and measured outcomes in a written case study.',
  },
  {
    num: '02', title: 'Skipping Research Entirely',
    desc: 'Jumping into Figma the moment you get a brief. Without research, you\'re guessing. Even one round of five user interviews will change your design more than 100 hours in the tool.',
    fix: 'Before opening Figma, define your research questions. Talk to at least 3–5 real users before wireframing.',
  },
  {
    num: '03', title: 'Copying Without Understanding',
    desc: 'Recreating Dribbble shots without understanding why they work. Beautiful UI copied without UX rationale results in visually impressive, functionally broken products.',
    fix: 'When you find a design pattern you like, ask why it works. Can you articulate the user need it solves?',
  },
  {
    num: '04', title: 'Presenting Designs, Not Decisions',
    desc: 'Walking into a review and saying "here\'s what I made" instead of "here\'s the problem, here\'s what I tried, here\'s why this is the right direction." Confidence requires justification.',
    fix: 'Structure every presentation: Problem → Research insight → Options explored → Recommendation → Why.',
  },
  {
    num: '05', title: 'Ignoring Developer Constraints',
    desc: 'Designing interactions and animations that are technically impractical or wildly expensive to build. Great UX designers understand engineering constraints and design within them.',
    fix: 'Build a relationship with at least one developer. Ask them to review designs before finalising. Learn basic CSS.',
  },
  {
    num: '06', title: 'Neglecting Accessibility',
    desc: 'Using 12px text, 2:1 contrast ratios, and tiny tap targets. Inaccessible design is bad design. WCAG compliance is the legal and ethical baseline, not a stretch goal.',
    fix: 'Install Stark or Colour Contrast in Figma. Run every screen through an accessibility check before handoff.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Graphic / Brand Designer',
    ease: 'Very Manageable', easeColor: '#7c3aed', easeBg: '#faf5ff',
    desc: 'Your visual craft, typography, and layout skills are already advanced. The shift to UX adds research, interaction design, and user empathy to your existing toolkit. You\'ll accelerate fast.',
    steps: ['Learn UX research methods (Google UX Course)', 'Add wireframing and user flows to your process', 'Rebuild 2–3 existing projects as full UX case studies', 'Target product design roles at growing startups'],
  },
  {
    from: 'Marketing / Content',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Your understanding of audiences, messaging hierarchy, and user psychology translates directly to UX. Content strategy and UX writing are high-demand specialisations within the field.',
    steps: ['Complete a UX fundamentals course', 'Learn Figma basics (2–4 weeks)', 'Focus on UX writing, onboarding flows, and IA', 'Target content design or UX writer roles'],
  },
  {
    from: 'Frontend Developer',
    ease: 'Natural Fit', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Your technical fluency makes you a unicorn — a designer who understands component constraints, responsive behaviour, and animation performance. Design engineering is one of the fastest-growing roles in tech.',
    steps: ['Learn design fundamentals and Figma deeply', 'Study UX research and information architecture', 'Build a portfolio with both design files and code', 'Target design engineer or product designer roles'],
  },
  {
    from: 'Other Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Domain expertise is a genuine competitive advantage. A UX designer who understands healthcare, legal, finance, or education can command a significant premium in those verticals.',
    steps: ['Start with Google UX Design Certificate', 'Learn Figma with Daily UI challenges', 'Design a product that solves a problem in your domain', 'Apply to companies in your previous industry'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Design Foundations', color: '#7c3aed', bg: '#faf5ff', days: [
    { day: 'Day 1–2', task: 'Set up Figma free account. Study typography basics: type scale, line height, hierarchy. Pick 3 well-designed apps and analyse why they feel right.' },
    { day: 'Day 3–4', task: 'Study colour theory: contrast, harmony, accessibility. Install Stark in Figma. Recreate a real app screen pixel-perfectly from scratch.' },
    { day: 'Day 5–6', task: 'Grid systems and spacing: learn the 8-point grid. Redesign a poor UI you use daily using proper spacing and hierarchy.' },
    { day: 'Day 7', task: 'Design your first original screen (a login page). Apply all week\'s principles. Save to Figma Community and share the link.' },
  ]},
  { week: 'Week 2', theme: 'UX Research & Wireframing', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Learn user interview techniques. Interview 3 people about an app they find frustrating. Document your findings in a Notion research doc.' },
    { day: 'Day 10–11', task: 'Build a user persona and journey map from your research. Identify the top 3 pain points to solve.' },
    { day: 'Day 12–13', task: 'Create low-fidelity wireframes for a solution to the pain points. Focus on structure, not style. Use Figma\'s frame and shape tools only.' },
    { day: 'Day 14', task: 'Convert wireframes into a clickable prototype in Figma. Test it with 2 people. Document what breaks and why.' },
  ]},
  { week: 'Week 3', theme: 'High-Fidelity & Design Systems', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Design a complete high-fidelity UI for your Week 2 wireframes. Apply typography, colour system, and spacing principles.' },
    { day: 'Day 17–18', task: 'Build a mini design system for your project: colours, type styles, button variants, card components. Use Figma variables.' },
    { day: 'Day 19–20', task: 'Add a complete user flow — onboarding, main action, success state. Build interactive prototype with transitions and micro-interactions.' },
    { day: 'Day 21', task: 'Run a usability test with 3 participants on your prototype. Record sessions. Note every moment of confusion. Iterate on the top 3 issues.' },
  ]},
  { week: 'Week 4', theme: 'Portfolio & Applications', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Write your first case study: Problem, Research, Process, Decisions, Outcome. Include before/after comparisons. Aim for 800–1200 words.' },
    { day: 'Day 25–26', task: 'Set up a portfolio on Notion, Framer, or Behance. Add your case study with screenshots, prototype link, and a clear headline.' },
    { day: 'Day 27–28', task: 'Research 10 companies that have strong design teams. Tailor your portfolio and case study framing to their product challenges.' },
    { day: 'Day 29–30', task: 'Share portfolio on LinkedIn with a post explaining your design process. Apply to 5 junior roles. Connect with 3 designers on LinkedIn for feedback.' },
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
      try { await navigator.share({ title: 'UX/UI Designer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a UX/UI Designer in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/ux-ui-designer'}</span>
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
export default function UXUIDesignerRoadmapPage() {
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
            src="https://i.imgur.com/s5YBJfH.jpeg"
            alt="UX/UI Designer workspace"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <PenTool size={12} /> Design & User Experience
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                UX/UI Designer
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
            Shape the way millions of people experience technology. UX/UI designers bridge the gap between human psychology and digital interfaces — creating products that feel intuitive, beautiful, and impossible to put down.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of UX/UI Design" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#faf5ff', borderColor: 'rgba(124,58,237,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>UX/UI Designer</strong> shapes how people experience digital products — from the first impression of a landing page to the satisfaction of completing a complex workflow. UX (User Experience) focuses on how a product feels and functions; UI (User Interface) focuses on how it looks. Great designers do both: they research user needs, design intuitive flows, and craft visually refined interfaces that make technology feel human.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons UX/UI Design could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical UX/UI Designer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → Principal Designer</span></div>
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
              const icons = ['🎨', '🔬', '🗺️', '⚡', '🧩', '🏆']
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.pink} 100%)`, boxShadow: '0 8px 48px rgba(124,58,237,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>10–14 months · Consistent daily practice · Build and ship real projects</div>
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
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.primaryLight }}><PenTool size={16} style={{ color: C.primary }} /></div>
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
                        <div className="h-1.5 rounded-full" data-bar-w={s.level} style={{ width: 0, background: `linear-gradient(90deg, ${C.primary}, ${C.pink})` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-7 border" style={{ background: C.bg, borderColor: C.border }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.indigoLight }}><MessageSquare size={16} style={{ color: C.indigo }} /></div>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming UX/UI Design in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#faf5ff', borderColor: 'rgba(124,58,237,0.2)', color: C.textMuted }}>
              AI doesn't replace great designers — it <em style={{ color: C.primary }}>amplifies</em> them. Designers who leverage AI for ideation, research synthesis, and accessibility auditing ship better work faster and spend more time on the strategic and human parts of design that AI cannot replicate.
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially at senior and principal level — can pay 2–4× these figures in USD.</p>
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
                <strong style={{ color: C.primary }}>Pro tip:</strong> UX/UI designers at product-led companies (SaaS, fintech, consumer apps) earn 30–50% more than those at agencies. Target companies where design has a seat at the leadership table.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring designers" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into UX/UI design from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in UX/UI Design" iconBg={C.redLight} iconColor={C.red} />
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
                UX/UI design is one of the most <strong style={{ color: C.primary }}>human-centred and creatively fulfilling</strong> careers in the technology sector. Every decision you make changes how thousands — sometimes millions — of people experience technology. That is not a small thing.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The difference between someone who "learned design" and someone who lands a job is almost always a portfolio with one or two outstanding case studies. Not 30 polished screens — one documented problem, thoughtfully solved, with evidence of the impact. Start there. Ship that. Everything else follows.
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
        <div className="relative overflow-hidden rounded-3xl px-12 py-16 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.pink} 100%)` }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: 'rgba(255,255,255,0.05)', top: -120, right: -80 }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Rocket size={30} style={{ color: '#fff' }} />
          </div>
          <h2 className="font-extrabold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
            Ready to Start Your Journey?
          </h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open Figma and design your first screen.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>
            
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start designing today. Your future self will thank you.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}