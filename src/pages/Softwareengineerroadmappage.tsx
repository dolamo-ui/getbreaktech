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
  Sparkles, TrendingUp,
  Link2, Download, Share2, Copy, CheckCheck,
  BookOpen, AlertTriangle, RefreshCw, Star, Calendar,
  Award, Target, Flame,
  Layers, 
  GitBranch, Shield,
  Workflow, Terminal, 
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
  primary: '#2563eb',
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
    level: 'Junior', title: 'Junior Software Engineer', duration: '0–2 yrs', salary: 'R300k–R520k',
    description: 'Write and review code under guidance, fix bugs, implement well-scoped features, learn the codebase, and build understanding of the full software development lifecycle.',
    skills: ['Core Language', 'Git & CI/CD', 'Debugging', 'Unit Testing'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Software Engineer', duration: '2–5 yrs', salary: 'R580k–R1.1M',
    description: 'Own features end-to-end, design components, drive code reviews, participate in system design, and contribute to engineering standards and reliability practices.',
    skills: ['System Design', 'APIs & DBs', 'Observability', 'Code Reviews'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Software Engineer', duration: '5–8 yrs', salary: 'R1.1M–R2M',
    description: 'Lead architectural decisions, mentor engineers, define engineering standards, drive cross-team technical initiatives, and influence the long-term product roadmap.',
    skills: ['Architecture', 'Leadership', 'Distributed Sys', 'Strategy'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Principal', title: 'Principal / Staff Eng', duration: '8+ yrs', salary: 'R2M+',
    description: 'Define engineering org vision, drive adoption of best practices across the company, shape multi-year technical roadmaps, and operate at the intersection of engineering and business.',
    skills: ['Org Strategy', 'Tech Vision', 'Cross-Team', 'Exec Influence'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Programming Foundations & Core Language',
    description: 'Master one language deeply — Python, JavaScript, Java, or Go. Learn data types, control flow, functions, OOP, and memory management. A strong language foundation is the bedrock of every engineering skill you will ever build.',
    duration: '2–3 months', skills: ['Python / JS / Go', 'OOP Principles', 'Data Structures', 'Algorithms Basics'],
  },
  {
    step: 2, title: 'Data Structures & Algorithms',
    description: 'Learn arrays, linked lists, trees, graphs, hash maps, sorting, searching, and recursion. DSA is the universal language of software engineering interviews and underpins every scalable system design decision you will face.',
    duration: '2–3 months', skills: ['Arrays & Trees', 'Graphs & Heaps', 'Sorting/Search', 'Big-O Notation'],
  },
  {
    step: 3, title: 'Databases & Storage Systems',
    description: 'Understand relational databases (PostgreSQL), NoSQL stores (MongoDB, Redis), data modeling, SQL querying, indexing strategies, and when to choose which storage solution for your use case.',
    duration: '1–2 months', skills: ['SQL & PostgreSQL', 'NoSQL / Redis', 'Data Modeling', 'Indexing'],
  },
  {
    step: 4, title: 'System Design & Architecture',
    description: 'Learn to design scalable, reliable distributed systems. Understand CAP theorem, load balancing, caching layers, message queues, microservices vs monoliths, and how to architect systems that handle millions of users.',
    duration: '2–3 months', skills: ['Distributed Sys', 'Microservices', 'Caching', 'Message Queues'],
  },
  {
    step: 5, title: 'DevOps, Cloud & Infrastructure',
    description: 'Master CI/CD pipelines, containerisation with Docker and Kubernetes, cloud platforms (AWS/GCP/Azure), infrastructure as code, monitoring, and how software gets deployed and operated reliably in production.',
    duration: '1–2 months', skills: ['Docker & K8s', 'AWS / GCP', 'CI/CD', 'Monitoring'],
  },
  {
    step: 6, title: 'Software Craftsmanship & Best Practices',
    description: 'Level up with clean code principles, design patterns, comprehensive testing strategies (unit, integration, e2e), code review practices, security fundamentals, and how to write software that lasts decades.',
    duration: '2–3 months', skills: ['Clean Code', 'Design Patterns', 'Testing Suite', 'Security Basics'],
  },
]

const HARD_SKILLS = [
  { name: 'Core Programming Language Mastery', level: 96 },
  { name: 'Data Structures & Algorithms', level: 90 },
  { name: 'System Design & Architecture', level: 85 },
  { name: 'Databases & SQL', level: 88 },
  { name: 'Git & Version Control', level: 92 },
  { name: 'APIs & Microservices', level: 85 },
  { name: 'Testing (Unit, Integration, E2E)', level: 80 },
  { name: 'Cloud & DevOps Fundamentals', level: 76 },
]

const SOFT_SKILLS = [
  { name: 'Problem Decomposition', description: 'Break large, ambiguous problems into small, solvable pieces. Every complex system is built from primitives. Great engineers see the path from vague requirement to working software.' },
  { name: 'Written Communication', description: 'Write clear technical design documents, PR descriptions, and incident post-mortems. Code is read far more than it is written — so is engineering communication.' },
  { name: 'Ownership Mentality', description: 'Take responsibility for the full lifecycle: design, build, test, deploy, monitor, and support. Software engineers who own outcomes — not just tasks — accelerate their careers exponentially.' },
  { name: 'Estimation & Planning', description: 'Learn to scope work accurately, communicate timeline uncertainty, and break projects into testable milestones. Engineering estimation is a skill that separates seniors from juniors more than technical ability.' },
  { name: 'Cross-Functional Collaboration', description: 'Work with product managers, designers, data scientists, and business stakeholders. The best engineers translate between technical and business languages fluently.' },
  { name: 'Debugging Under Pressure', description: 'Systematically isolate root causes in complex distributed systems. Stay calm during incidents. Read stack traces, correlate logs, and form hypotheses rather than guessing randomly.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Computer Science Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(37,99,235,0.2)', bgColor: '#f0f5ff', typeBg: 'rgba(37,99,235,0.12)', typeColor: '#2563eb',
    pros: ['Deep CS fundamentals (compilers, OS, networking)', 'Opens doors at top-tier tech companies', 'Strong recruiter credibility and brand value', 'Internship and research opportunities'],
    cons: ['4-year time commitment before first job', 'Curriculum lags behind industry tools', 'Expensive tuition with rising costs', 'Heavy theory with limited hands-on projects'],
  },
  {
    type: 'Bootcamp', title: 'Engineering Bootcamp', duration: '3–6 months', cost: 'R50k – R150k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Fast path to employable skills', 'Strong cohort network and career support', 'Project-based learning from day one', 'Structured curriculum with accountability'],
    cons: ['Highly variable quality across programs', 'Limited CS depth (DSA, OS fundamentals)', 'Competitive graduate job market', 'Not accepted at all top-tier tech firms'],
  },
  {
    type: 'Self-Taught', title: 'Online Courses & Projects', duration: '12–24 months', cost: 'R0 – R8k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['World-class free resources (MIT OpenCourseWare, CS50)', 'Learn at your own pace', 'Build real projects and portfolio immediately', 'No debt ceiling on earnings'],
    cons: ['Requires iron discipline and self-direction', 'Easy to skip fundamentals for trendy tools', 'Portfolio carries more weight than credential', 'Imposter syndrome hits hard without peers'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Standup & Sprint Planning', desc: 'Sync on blockers, review tickets, align with PM on priorities, and surface any cross-team dependencies before deep work begins', duration: '30 min', icon: <Users size={14} /> },
  { time: '9:30', act: 'Deep Engineering Work', desc: 'Core coding time — feature development, bug fixing, infrastructure work, or system design in full uninterrupted focus mode', duration: '3 hrs', icon: <Terminal size={14} /> },
  { time: '12:30', act: 'Code Review & PR Feedback', desc: 'Review teammates\' pull requests, write detailed feedback, discuss tradeoffs asynchronously, and unblock reviewers on your open PRs', duration: '45 min', icon: <GitBranch size={14} /> },
  { time: '1:15', act: 'Lunch & Mental Reset', desc: 'Step away from the screen. Complex debugging problems often solve themselves during lunch when your brain processes in the background', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:15', act: 'Design & Architecture Review', desc: 'Technical design docs, system design discussions, reviewing RFCs, or cross-team architectural alignment sessions', duration: '1 hr', icon: <Layers size={14} /> },
  { time: '3:15', act: 'Testing & Documentation', desc: 'Write and run unit/integration tests, update technical documentation, review monitoring dashboards, and close out tickets properly', duration: '1 hr', icon: <Shield size={14} /> },
  { time: '4:15', act: 'Learning & Exploration', desc: 'Read engineering blogs, experiment with new technologies, work on open source, or study system design patterns for career growth', duration: '45 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'VS Code / JetBrains', cat: 'IDE' }, { name: 'Docker', cat: 'Containers' },
  { name: 'Kubernetes', cat: 'Orchestration' }, { name: 'PostgreSQL', cat: 'Database' },
  { name: 'GitHub Actions', cat: 'CI/CD' }, { name: 'Datadog', cat: 'Monitoring' },
  { name: 'Terraform', cat: 'Infra' }, { name: 'Slack / Notion', cat: 'Comms' },
]

const WORK_ENVS = [
  { type: 'Remote', pct: 52 },
  { type: 'Hybrid', pct: 35 },
  { type: 'In-Office', pct: 13 },
]

const AI_IMPACTS = [
  {
    title: 'AI Pair Programming', icon: <Sparkles size={20} />,
    desc: 'GitHub Copilot, Claude, and Cursor act as always-on pair programmers. Engineers using AI coding assistants ship features 35–50% faster, catch bugs earlier in the cycle, and spend less time on boilerplate.',
    tools: ['GitHub Copilot', 'Claude', 'Cursor', 'Codeium'],
    borderColor: 'rgba(37,99,235,0.18)', bgColor: '#f0f5ff', icoBg: 'rgba(37,99,235,0.12)', icoColor: '#2563eb', tagBg: 'rgba(37,99,235,0.1)', tagColor: '#2563eb', titleColor: '#2563eb',
  },
  {
    title: 'AI-Assisted Testing', icon: <Shield size={20} />,
    desc: 'AI tools generate test cases, identify edge cases you missed, and detect regressions in CI/CD pipelines automatically. Less time writing boilerplate test scaffolding, more time on meaningful engineering.',
    tools: ['Diffblue Cover', 'CodiumAI', 'Launchable', 'Testim AI'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI Code Review & Security', icon: <TrendingUp size={20} />,
    desc: 'AI-powered static analysis tools catch security vulnerabilities, performance bottlenecks, and code quality issues automatically. Every engineer now gets a senior reviewer\'s eye on every PR, always.',
    tools: ['CodeRabbit', 'Snyk AI', 'SonarQube', 'DeepCode'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'LLM Integration & Prompt Engineering',
  'Platform Engineering & Internal Dev Tooling',
  'eBPF & Observability Internals',
  'WebAssembly (WASM) for Performance',
  'Distributed Tracing & Chaos Engineering',
  'AI-Augmented Code Review Workflows',
]

const PROS = [
  { title: 'Exceptional Earning Potential', desc: 'Senior software engineers earn R1.1M–R2M in South Africa. Global remote roles at FAANG or funded startups can pay 3–5× that in USD. Few careers match this earning ceiling.' },
  { title: 'Remote-First Opportunities', desc: 'Software engineering has the highest remote adoption of any profession globally. Your code compiles the same from Cape Town as from Silicon Valley. Geography is no longer destiny.' },
  { title: 'Universal Problem-Solving', desc: 'Software touches every industry. Work on healthcare, climate, finance, education, or entertainment. Your skills transfer instantly across domains, giving you career optionality most professions can\'t match.' },
  { title: 'High Craft Satisfaction', desc: 'Building something from nothing — a system that handles millions of transactions, an algorithm that runs in microseconds, an API used by thousands of developers — creates deep professional satisfaction.' },
  { title: 'Constant Intellectual Challenge', desc: 'Every codebase, system design, and performance bottleneck is a unique puzzle. Boredom is essentially impossible. Technology evolves so fast that you are always learning, always growing.' },
  { title: 'Outsized Career Leverage', desc: 'Software engineers can move into engineering management, product management, founding startups, or technical investing. The career pivot options are uniquely broad compared to almost any other field.' },
]

const CONS = [
  { title: 'Interview Culture Disconnect', desc: 'Most software engineering interviews test LeetCode algorithmic puzzles unrelated to actual day-to-day work. Preparing for this meta-game requires months of deliberate practice on top of real engineering.' },
  { title: 'Constant Technology Churn', desc: 'The framework that\'s hot today is legacy in three years. Staying current without drowning requires curating what to learn carefully. The noise-to-signal ratio in tech is brutally high.' },
  { title: 'On-Call Responsibilities', desc: 'Production systems fail at 3am. Senior engineers carry on-call rotations that interrupt weekends and sleep. Incident response is stressful and mentally taxing even for experienced engineers.' },
  { title: 'Technical Debt Pressure', desc: 'Most codebases accumulate debt faster than it\'s paid down. Working with poor architecture, undocumented systems, or brittle legacy code is the unglamorous daily reality of most engineering roles.' },
  { title: 'Scope Creep & Estimation Difficulty', desc: 'Requirements change mid-sprint. The simple feature turns into a platform refactor. Estimating software work accurately is notoriously hard, creating constant schedule pressure on engineering teams.' },
  { title: 'Isolation Risk in Remote Roles', desc: 'Deep technical work can become isolating. Remote engineering roles offer flexibility but can create professional loneliness, reduce visibility for promotion, and slow informal knowledge transfer.' },
]

const VIDEOS = [
  { id: 'ysEN5RaKOlA', title: 'Software Engineering Full Roadmap 2025', desc: 'Complete guide covering everything from core CS fundamentals to system design and landing your first engineering role.', dur: '22:48', channel: 'Traversy Media' },
  { id: 'uk2gvveHd74', title: 'System Design Interview Masterclass', desc: 'Learn to design scalable distributed systems — databases, caching, load balancing, and microservices explained clearly.', dur: '1:04:00', channel: 'Exponent' },
  { id: 'zOjov-2OZ0E', title: 'Data Structures & Algorithms Full Course', desc: 'Master DSA from scratch. Arrays, trees, graphs, dynamic programming — everything you need for technical interviews.', dur: '8:18:00', channel: 'freeCodeCamp' },
]

const TAKEAWAYS = [
  'Master one programming language deeply before jumping to others — depth beats breadth early in your career',
  'Build and deploy at least 3 real projects that solve genuine problems and put them on GitHub',
  'Study system design — it\'s the skill that separates junior from senior engineers faster than anything else',
  'LeetCode is a necessary evil for interviews — dedicate 60–90 days before any interview loop',
  'Write clean, well-documented code from day one — your future self and your teammates will thank you',
]

const CAREER_FACTS = [
  {
    icon: <Terminal size={20} />, title: 'What You Build',
    desc: 'Backend services, APIs, databases, distributed systems, developer tools, mobile apps, CLIs, platform infrastructure, data pipelines, and the invisible machinery powering every digital product.',
    color: '#2563eb',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Feature development, code reviews, system design, incident response, technical planning, database optimization, API design, security hardening, performance profiling, and mentoring.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Product managers, designers, data engineers, DevOps/SRE teams, QA engineers, security teams, and business stakeholders — all depending on your software to function reliably at scale.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'Software engineering remains the most in-demand technical role globally. The U.S. Bureau of Labor Statistics projects 25% job growth through 2032 — far outpacing every other profession.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '💻', title: 'Build Anything You Imagine', desc: 'Software is the only medium where one person can build a product used by millions overnight. The leverage of code is unmatched in any other creative or technical discipline.' },
  { emoji: '💰', title: 'Elite Compensation', desc: 'Senior engineers in South Africa earn R1.1M–R2M. Global remote roles pay $150k–$400k. Engineering is one of the highest-paying professions accessible without a decade of graduate school.' },
  { emoji: '🌍', title: 'Work From Anywhere', desc: '52% of engineering roles are fully remote. The best companies in the world compete for engineers regardless of location. Your address is irrelevant to your career ceiling.' },
  { emoji: '🧩', title: 'Endless Intellectual Depth', desc: 'Every system, every algorithm, every distributed architecture is a new puzzle. Software engineering rewards curiosity infinitely. You will never solve every problem — and that\'s the point.' },
  { emoji: '🚀', title: 'Career Optionality', desc: 'Engineering opens doors: startup founder, CTO, engineering manager, product manager, technical investor. Few careers offer this breadth of exit ramp into high-leverage opportunities.' },
  { emoji: '⚡', title: 'Immediate Global Impact', desc: 'Code you write today could run for a decade, serving millions of people across the world. The impact-per-hour of software engineering is extraordinary compared to almost any other profession.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#2563eb', bgColor: '#f0f5ff', items: [
    { name: 'CS50 by Harvard (free, legendary intro)', url: '#', type: 'Course', rating: 5 },
    { name: 'MIT OpenCourseWare — 6.006 Algorithms', url: '#', type: 'Course', rating: 5 },
    { name: 'The Odin Project — Full Stack Path', url: '#', type: 'Course', rating: 5 },
    { name: 'freeCodeCamp — Programming Fundamentals', url: '#', type: 'Course', rating: 4 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'LeetCode — Algorithm Interview Prep', url: '#', type: 'Practice', rating: 5 },
    { name: 'Exercism — Language-Specific Drills', url: '#', type: 'Practice', rating: 5 },
    { name: 'HackerRank — Structured Skill Tracks', url: '#', type: 'Practice', rating: 4 },
    { name: 'System Design Primer (GitHub)', url: '#', type: 'Reference', rating: 5 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'Fireship.io — Engineering Essentials', url: '#', type: 'YouTube', rating: 5 },
    { name: 'ByteByteGo — System Design Content', url: '#', type: 'YouTube', rating: 5 },
    { name: 'r/cscareerquestions — Career Advice', url: '#', type: 'Forum', rating: 4 },
    { name: 'roadmap.sh — Visual Learning Paths', url: '#', type: 'Resource', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Software Engineer', range: 'R300k – R520k', midpoint: 410, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Software Engineer', range: 'R580k – R1.1M', midpoint: 840, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Software Engineer', range: 'R1.1M – R2M', midpoint: 1550, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Principal / Staff Engineer', range: 'R2M – R4M+', midpoint: 2800, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Tutorial Hell — Watching Without Building',
    desc: 'Watching coding tutorials for months without building real projects. You feel busy, but you\'re not learning. The knowledge doesn\'t stick until you struggle through implementing something yourself.',
    fix: 'After every tutorial module, rebuild the feature from scratch with the tutorial closed. Break it intentionally and fix it. Struggle is the learning.',
  },
  {
    num: '02', title: 'Skipping Data Structures & Algorithms',
    desc: 'Jumping straight to frameworks without understanding the fundamentals. You\'ll hit a ceiling fast — and fail every technical interview at a company worth joining.',
    fix: 'Dedicate 60–90 days to DSA before anything else. LeetCode daily (Easy first, then Medium). Study the System Design Primer on GitHub.',
  },
  {
    num: '03', title: 'Not Writing Tests',
    desc: 'Shipping code without unit or integration tests. It feels faster initially, but untested systems accumulate debt so fast that velocity collapses within months. Test-driven development saves time overall.',
    fix: 'Make testing non-negotiable from day one. Aim for 70%+ coverage on all new code. Learn to write tests before writing implementation (TDD).',
  },
  {
    num: '04', title: 'Ignoring System Design Until Interviews',
    desc: 'Only studying system design when an interview is imminent. System design is not a topic — it\'s a mindset. Engineers who think architecturally from the start advance dramatically faster.',
    fix: 'Read "Designing Data-Intensive Applications" by Martin Kleppmann. Design every personal project as if it needs to scale. Review ByteByteGo weekly.',
  },
  {
    num: '05', title: 'Not Using Version Control Properly',
    desc: 'Committing large, unfocused blobs of changes. Poor Git hygiene makes collaboration miserable, code reviews meaningless, and rollbacks a nightmare. It signals inexperience immediately to senior engineers.',
    fix: 'Commit small and often. Write meaningful commit messages. Open focused PRs. Learn Git rebase, stash, and bisect. Make every PR reviewable in under 20 minutes.',
  },
  {
    num: '06', title: 'Optimising Too Early',
    desc: 'Spending days on micro-optimisations before the system even works correctly. Premature optimisation is the root of all evil — you optimise the wrong things and lose engineering velocity.',
    fix: 'Make it work, make it right, then make it fast. Profile before optimising. Measure with real data. Let benchmarks — not intuition — drive performance decisions.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Data Analyst / Data Scientist',
    ease: 'Very Natural', easeColor: '#2563eb', easeBg: '#f0f5ff',
    desc: 'You already write Python, understand logic, and work with data systems. Backend engineering is a natural next step. Add web APIs, system design, and software craft principles.',
    steps: ['Strengthen Python or pick up Go/Java', 'Build REST APIs with FastAPI or Express', 'Learn PostgreSQL and data modeling deeply', 'Target backend or data engineering roles'],
  },
  {
    from: 'IT Support / Sysadmin',
    ease: 'Strong Foundation', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'You understand networks, servers, and how systems fail. This operational knowledge is gold in platform engineering and DevOps-adjacent software roles.',
    steps: ['Learn Python scripting and automation', 'Study Docker and Kubernetes deeply', 'Learn infrastructure as code with Terraform', 'Target DevOps or platform engineering roles'],
  },
  {
    from: 'Product Manager / Business Analyst',
    ease: 'Achievable Path', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'You understand user needs, product context, and business requirements. Adding engineering skills makes you uniquely valuable — you bridge technical and product thinking better than pure engineers.',
    steps: ['Learn Python basics and web fundamentals', 'Build a real product MVP and ship it', 'Study system design and APIs', 'Target full-stack or technical PM-adjacent roles'],
  },
  {
    from: 'Frontend Developer',
    ease: 'Direct Pivot', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'You already write JavaScript and understand APIs. Adding backend engineering skills — databases, server logic, and system design — makes you a formidable full-stack engineer.',
    steps: ['Learn Node.js or pick up Python/Go', 'Master PostgreSQL and data modeling', 'Study distributed systems fundamentals', 'Target full-stack or backend roles'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Language & Foundations', color: '#2563eb', bg: '#f0f5ff', days: [
    { day: 'Day 1–2', task: 'Set up VS Code, Git, and GitHub. Write your first 100 lines in Python or your chosen language. Push to GitHub.' },
    { day: 'Day 3–4', task: 'Solve 5 Easy LeetCode problems. Implement arrays, strings, and hash maps from scratch.' },
    { day: 'Day 5–6', task: 'Build a CLI tool that solves a real problem — task manager, file organiser, or weather checker.' },
    { day: 'Day 7', task: 'Write a blog post explaining what you built and why. Documenting learning accelerates it dramatically.' },
  ]},
  { week: 'Week 2', theme: 'Databases & APIs', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Install PostgreSQL locally. Learn SQL — CREATE, SELECT, JOIN, INDEX. Build a data model for a real app.' },
    { day: 'Day 10–11', task: 'Build a REST API with FastAPI (Python) or Express (JS) connected to PostgreSQL. Test with Postman.' },
    { day: 'Day 12–13', task: 'Add authentication (JWT), error handling, and input validation. Deploy to Railway or Render.' },
    { day: 'Day 14', task: 'Write integration tests for your API. Aim for 60%+ coverage. Push the full project to GitHub with README.' },
  ]},
  { week: 'Week 3', theme: 'System Design & Cloud', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Read "System Design Primer" chapters on scalability and load balancing. Design Twitter\'s architecture on paper.' },
    { day: 'Day 17–18', task: 'Containerise your API with Docker. Write a Dockerfile. Learn docker-compose for multi-service setups.' },
    { day: 'Day 19–20', task: 'Deploy to AWS (EC2 or ECS) or GCP. Set up a basic CI/CD pipeline with GitHub Actions.' },
    { day: 'Day 21', task: 'Add monitoring with structured logs. Set up one alert. On-call readiness is a senior engineer trait worth building early.' },
  ]},
  { week: 'Week 4', theme: 'Polish & Job Prep', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Solve 10 more LeetCode problems (mix of Easy and Medium). Focus on time and space complexity analysis.' },
    { day: 'Day 25–26', task: 'Write a technical design document for a system you would build. Practice written engineering communication.' },
    { day: 'Day 27–28', task: 'Polish GitHub, update LinkedIn, write 3 project READMEs, and craft your engineering story for interviews.' },
    { day: 'Day 29–30', task: 'Apply to 5 roles. Reach out to 3 engineers for informational interviews. Share your projects on LinkedIn.' },
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
      try { await navigator.share({ title: 'Software Engineer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Software Engineer in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/software-engineer'}</span>
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
export default function SoftwareEngineerRoadmapPage() {
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
            src="https://i.imgur.com/4jQiOUp.jpeg"
            alt="Software Engineer workspace"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.45) brightness(1.08)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Terminal size={12} /> Engineering & Systems
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Software Engineer
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
            Build the systems that power the world. Software engineers design, build, and ship the APIs, databases, and distributed infrastructure behind every product billions of people use every day.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Software Engineering" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0f5ff', borderColor: 'rgba(37,99,235,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Software Engineer</strong> designs, builds, and maintains the systems that power digital products. Whether backend APIs, distributed databases, mobile apps, or developer tools — software engineers turn requirements into reliable, scalable, and maintainable code. The role sits at the intersection of logic, architecture, and product thinking.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Software Engineering could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Software Engineer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(37,99,235,0.3)'; (e.currentTarget as HTMLElement).style.background = '#f0f5ff' }}
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → Principal</span></div>
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
              const icons = ['💻', '🧩', '🗄️', '🏗️', '☁️', '🛡️']
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
              <div className="text-4xl mb-3">🚀</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>12–18 months · Consistent daily practice · Build and ship real systems</div>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Software Engineering in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0f5ff', borderColor: 'rgba(37,99,235,0.2)', color: C.textMuted }}>
              AI coding assistants like Copilot, Claude, and Cursor are reshaping the craft. Engineers who leverage AI effectively ship faster and catch more bugs — but the fundamentals of system design, architecture, and debugging are more valuable than ever because AI amplifies the engineer's judgment.
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially for senior and principal roles — can pay 3–5× these figures in USD.</p>
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
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 3500) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f0f5ff', borderColor: 'rgba(37,99,235,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> Engineers at product companies and well-funded startups earn 30–50% more than at consultancies or agencies. Target companies where software is the product, not a cost centre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring engineers" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into software engineering from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Software Engineering" iconBg={C.redLight} iconColor={C.red} />
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
                Software engineering is one of the most <strong style={{ color: C.primary }}>leveraged, well-compensated, and intellectually rich</strong> careers available to anyone with a computer and internet access. The barriers to entry are low; the ceiling is extraordinarily high.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The path is not about memorising frameworks — it's about building a deep understanding of how systems work, shipping real software that real people use, and developing the judgment to make sound architectural decisions under uncertainty. Start simple, build consistently, and let your work speak louder than your credentials.
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open your terminal and start building something real.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>
          
            
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start building today. Your future self will be proud.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}