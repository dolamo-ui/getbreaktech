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
  Layers, FileText, Server, 
  GitBranch, Terminal, Shield,
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
  primary: '#1d4ed8',          // deep blue — backend brand colour
  primaryLight: 'rgba(29,78,216,0.08)',
  primaryMid: 'rgba(29,78,216,0.15)',
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
    level: 'Junior', title: 'Junior Backend Dev', duration: '0–2 yrs', salary: 'R300k–R520k',
    description: 'Build CRUD APIs, fix bugs, write unit tests, and learn the codebase under mentorship. Understand request lifecycles and database queries.',
    skills: ['Python/Node.js', 'REST APIs', 'SQL Basics', 'Git'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Backend Developer', duration: '2–5 yrs', salary: 'R600k–R1.05M',
    description: 'Own API design end-to-end, optimise queries, design database schemas, implement authentication and caching strategies across services.',
    skills: ['System Design', 'PostgreSQL', 'Redis', 'Docker'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Backend Dev', duration: '5–8 yrs', salary: 'R1.05M–R1.75M',
    description: 'Architect distributed systems, define API standards, mentor juniors, lead performance and reliability initiatives across the platform.',
    skills: ['Microservices', 'Kafka/Queues', 'Architecture', 'Mentoring'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'Staff / Principal Eng', duration: '8+ yrs', salary: 'R2M+',
    description: 'Define the engineering vision for infrastructure and platform, drive cross-team technical strategy, and solve the hardest reliability and scale challenges.',
    skills: ['Platform Eng', 'Eng Strategy', 'Observability', 'Leadership'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Programming Fundamentals — Python or Node.js',
    description: 'Pick one language and master it. Python is excellent for data-adjacent backend work; Node.js shines for real-time and JavaScript-heavy stacks. Learn variables, functions, OOP, error handling, modules, and async patterns before anything else.',
    duration: '2–3 months', skills: ['Python 3 / Node.js', 'OOP Principles', 'Async/Await', 'Error Handling'],
  },
  {
    step: 2, title: 'HTTP, APIs & Web Frameworks',
    description: 'Understand the entire HTTP request lifecycle, status codes, headers, and methods. Build REST APIs using Express (Node) or FastAPI/Django (Python). Learn routing, middleware, validation, and API versioning.',
    duration: '2–3 months', skills: ['HTTP Protocol', 'REST API Design', 'Express / FastAPI', 'Middleware'],
  },
  {
    step: 3, title: 'Databases — SQL & NoSQL',
    description: 'Data is the backbone of every backend. Master PostgreSQL — schema design, indexes, joins, transactions, and query optimisation. Then learn MongoDB or Redis for caching and document storage. Use an ORM (Prisma, SQLAlchemy) to bridge code and data.',
    duration: '2–3 months', skills: ['PostgreSQL', 'MongoDB', 'Redis', 'ORM / Query Builder'],
  },
  {
    step: 4, title: 'Authentication, Security & Testing',
    description: 'Secure your APIs with JWT, OAuth 2.0, and session management. Understand OWASP top 10 vulnerabilities, SQL injection, XSS, and rate limiting. Write integration and unit tests — untested backend code is a liability.',
    duration: '1–2 months', skills: ['JWT / OAuth', 'OWASP Security', 'Unit Testing', 'Integration Tests'],
  },
  {
    step: 5, title: 'DevOps, Cloud & Containerisation',
    description: 'Backend services only create value when deployed. Learn Docker to containerise your applications, CI/CD pipelines to automate deployments, and cloud platforms (AWS EC2, RDS, Lambda or GCP) to host production systems. Understand environment variables and secrets management.',
    duration: '2–3 months', skills: ['Docker', 'CI/CD', 'AWS / GCP', 'Linux & Shell'],
  },
  {
    step: 6, title: 'System Design, Scalability & Architecture',
    description: 'Senior backend work is about designing systems that scale. Study load balancing, message queues (Kafka, RabbitMQ), microservices vs monoliths, caching strategies, database replication, and API rate limiting. Practise system design interview questions from the start.',
    duration: '3–4 months', skills: ['System Design', 'Kafka / Queues', 'Microservices', 'Observability'],
  },
]

const HARD_SKILLS = [
  { name: 'Python / Node.js', level: 95 },
  { name: 'REST API Design', level: 93 },
  { name: 'SQL & Database Design', level: 90 },
  { name: 'Authentication & Security', level: 85 },
  { name: 'Docker & Containers', level: 80 },
  { name: 'Message Queues (Kafka)', level: 70 },
  { name: 'Cloud Platforms (AWS/GCP)', level: 68 },
  { name: 'System Design & Architecture', level: 62 },
]

const SOFT_SKILLS = [
  { name: 'Logical Problem Solving', description: 'Break complex server-side problems into small, testable units. Backend bugs can be subtle — rigorous methodical thinking separates great backend engineers from average ones.' },
  { name: 'Security Mindset', description: 'Think adversarially by default. Every input is hostile until proven safe. Great backend engineers build security into the design, not as an afterthought.' },
  { name: 'Performance Intuition', description: 'Know where your bottlenecks are before your users find them. Develop a feel for slow queries, inefficient loops, and missing indexes through profiling and measurement.' },
  { name: 'API Contract Ownership', description: 'Your API is a public interface that others depend on. Write clear documentation, version carefully, and communicate breaking changes. Reliability builds trust.' },
  { name: 'Debugging Under Pressure', description: 'Production incidents happen. The ability to read logs, trace distributed calls, and restore service calmly and quickly is one of the most valued backend skills in any team.' },
  { name: 'Cross-Functional Communication', description: 'Translate backend constraints into language product managers and frontend developers understand. Great backend engineers are bridges, not black boxes.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Computer Science Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(29,78,216,0.2)', bgColor: '#eff6ff', typeBg: 'rgba(29,78,216,0.12)', typeColor: '#1d4ed8',
    pros: ['Deep algorithms, OS, networking & compilers', 'High credibility at large tech companies', 'Access to internship pipelines and graduate programmes', 'Strong peer network of future engineers'],
    cons: ['Slow and expensive path to first job', 'Often teaches outdated tooling', 'Light on practical DevOps and cloud skills', 'Web APIs and modern frameworks largely self-taught'],
  },
  {
    type: 'Bootcamp', title: 'Backend Coding Bootcamp', duration: '3–6 months', cost: 'R60k – R130k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Job-ready API and database skills fast', 'Strong portfolio projects on exit', 'Career support and employer networks', 'Structured, cohort-based accountability'],
    cons: ['Highly variable programme quality', 'Credential not universally respected', 'Rarely covers CS depth or system design', 'Competitive entry into junior market'],
  },
  {
    type: 'Self-Taught', title: 'Online Courses & Projects', duration: '12–24 months', cost: 'R0 – R8k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['World-class free content available (CS50, FastAPI docs)', 'Learn at your own pace', 'Build real APIs and services from day one', 'No ceiling on what you can learn'],
    cons: ['Requires exceptional self-discipline', 'Easy to have dangerous knowledge gaps', 'No formal credential on CV', 'Imposter syndrome is real and common'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Standup & PR Reviews', desc: 'Sync with team on production incidents, review teammates\' pull requests, and plan the day\'s API work', duration: '30 min', icon: <GitBranch size={14} /> },
  { time: '9:30', act: 'Core Feature Development', desc: 'The best backend work happens in uninterrupted blocks — new services, complex query optimisation, or architectural refactors', duration: '2.5 hrs', icon: <Server size={14} /> },
  { time: '12:00', act: 'Incident Investigation', desc: 'Investigate production anomalies, read distributed traces, analyse slow query logs, and reproduce bugs in staging', duration: '1 hr', icon: <Terminal size={14} /> },
  { time: '1:00', act: 'Lunch & Recovery', desc: 'Step away from the terminal. The subconscious solves architecture problems during breaks better than any whiteboard', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'API Design & Documentation', desc: 'Collaborate with frontend and product on API contracts, update OpenAPI specs, and review integration requirements', duration: '1 hr', icon: <FileText size={14} /> },
  { time: '3:00', act: 'Testing & Deployment', desc: 'Write integration tests, update migrations, run the CI pipeline, and ship code through staging to production', duration: '1.5 hrs', icon: <Shield size={14} /> },
  { time: '4:30', act: 'Learning & Exploration', desc: 'Read engineering blogs (Stripe, Cloudflare, Uber Eng), experiment with a new tool, or contribute to open source', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'VS Code / PyCharm', cat: 'IDE' }, { name: 'Postman / Insomnia', cat: 'API Testing' },
  { name: 'Docker', cat: 'Containers' }, { name: 'GitHub Actions', cat: 'CI/CD' },
  { name: 'DataGrip', cat: 'Database' }, { name: 'AWS / GCP', cat: 'Cloud' },
  { name: 'Grafana', cat: 'Observability' }, { name: 'Redis', cat: 'Cache' },
]

const WORK_ENVS = [
  { type: 'Remote', pct: 58 },
  { type: 'Hybrid', pct: 31 },
  { type: 'In-Office', pct: 11 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Assisted API Development', icon: <Sparkles size={20} />,
    desc: 'GitHub Copilot and Claude generate boilerplate endpoints, write data validation schemas, and suggest query optimisations. Backend developers using AI assistants report 35–50% productivity gains on routine CRUD work.',
    tools: ['GitHub Copilot', 'Claude', 'Cursor', 'Tabnine'],
    borderColor: 'rgba(29,78,216,0.18)', bgColor: '#eff6ff', icoBg: 'rgba(29,78,216,0.12)', icoColor: '#1d4ed8', tagBg: 'rgba(29,78,216,0.1)', tagColor: '#1d4ed8', titleColor: '#1d4ed8',
  },
  {
    title: 'LLM-Powered Backend Features', icon: <Zap size={20} />,
    desc: 'Backend developers who can integrate OpenAI and Anthropic APIs, build RAG pipelines, design vector database schemas, and manage LLM context windows are in an entirely different demand tier in 2026.',
    tools: ['OpenAI API', 'Anthropic API', 'Pinecone', 'LangChain'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI-Powered Observability', icon: <TrendingUp size={20} />,
    desc: 'AI tools now detect anomalies in metrics, predict query performance regressions, and surface security vulnerabilities before they hit production. Use them to build more reliable systems with less manual monitoring.',
    tools: ['Datadog AI', 'New Relic AI', 'Sentry AI', 'PagerDuty'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'Vector Databases (Pinecone, pgvector)', 'LLM API Integration & RAG',
  'eBPF for Observability', 'WebSockets & Server-Sent Events',
  'gRPC & Protocol Buffers', 'OpenTelemetry & Distributed Tracing',
]

const PROS = [
  { title: 'The Highest-Paying Specialisation', desc: 'Backend and infrastructure roles consistently command the highest salaries in engineering. Senior backend engineers at product companies earn R1.4M–R2.5M+ in South Africa.' },
  { title: 'Remote-First by Nature', desc: 'Backend development has no physical dependency. 58% of backend roles are fully remote globally — the second highest rate after full-stack.' },
  { title: 'You Power Everything', desc: 'Every feature users love, every transaction that completes, every piece of data that persists — backend engineers make it possible. The impact is deep and lasting.' },
  { title: 'Massive Global Demand', desc: 'Every company that handles data needs backend engineers. From startups to multinationals, cloud to fintech — demand is structurally high and shows no slowdown.' },
  { title: 'Deep, Transferable Skills', desc: 'Backend fundamentals — data structures, databases, networking, concurrency — transfer across languages and industries. Skills built here compound for decades.' },
  { title: 'Clear Path to Architecture', desc: 'The natural growth path from senior backend to staff engineer to principal architect is one of the most financially rewarding trajectories in all of tech.' },
]

const CONS = [
  { title: 'Invisible Work, Invisible Credit', desc: 'Backend engineers build the engine. When it works, nobody notices. When it breaks at 2am, everyone does. The most critical work in the company often gets the least visible appreciation.' },
  { title: 'Steep Learning Curve on Scale', desc: 'Building APIs for 100 users is different from building for 10 million. The gap between junior and senior backend knowledge is one of the widest in the industry.' },
  { title: 'On-Call & Production Pressure', desc: 'Backend engineers own production uptime. On-call rotations, incident response, and 3am pages are a real part of senior backend life — especially at high-traffic products.' },
  { title: 'Security Responsibility', desc: 'A frontend bug degrades UX. A backend security flaw exposes user data. The weight of data security, compliance, and breach prevention rests with the backend team.' },
  { title: 'Distributed Systems Complexity', desc: 'Microservices, eventual consistency, network partitions, and race conditions are genuinely hard. The backend at scale is intellectually demanding in ways that have no easy answers.' },
  { title: 'Abstraction Debt in Legacy Systems', desc: 'Most professional backends are messier than any tutorial. Maintaining ten-year-old codebases, migrating legacy databases, and untangling years of technical debt is unglamorous daily reality.' },
]

const VIDEOS = [
  { id: 'WGFxHD9lcxo', title: 'Backend Development Roadmap 2025', desc: 'A complete, up-to-date guide to the technologies, concepts, and learning order for becoming a backend developer in 2025 and beyond.', dur: '14:22', channel: 'Traversy Media' },
  { id: 'Sxxw3qtb3dg', title: 'Node.js & Express REST API Full Course', desc: 'Build a production-ready REST API with Node.js, Express, MongoDB and JWT authentication — deployed to cloud from scratch.', dur: '7:48:30', channel: 'freeCodeCamp' },
  { id: 'qbLc5a9jdXo', title: 'System Design Interview — Complete Guide', desc: 'Master the system design concepts every backend developer needs: load balancers, caching, databases, queues, and microservices.', dur: '3:09:15', channel: 'ByteByteGo' },
]

const TAKEAWAYS = [
  'Learn one language deeply before adding a second — mastery beats familiarity in every interview',
  'Every side project must connect to a real database and be deployed — local-only projects teach you almost nothing about production',
  'Read the official docs, not just tutorials — documentation is where the edge cases live and where senior engineers spend their time',
  'Security is not a feature you add later — design it into your data model and API layer from day one',
  'System design knowledge compounds: study one pattern per week and in a year you will think like a senior engineer',
]

/* ─── NEW SECTIONS ────────────────────────────────────────────────────────── */

const CAREER_FACTS = [
  {
    icon: <Server size={20} />, title: 'What You Build',
    desc: 'REST and GraphQL APIs, authentication systems, database schemas, background workers, microservices, webhooks, payment integrations, and the entire data layer that powers every user-facing feature.',
    color: '#1d4ed8',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'API development, database design and optimisation, authentication, background job processing, service integration, performance profiling, security hardening, and production incident response.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Frontend developers consuming your APIs, DevOps engineers managing infrastructure, data engineers using your data layer, product managers defining requirements, and security teams auditing your systems.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'Backend developers are among the most sought-after engineers globally. API and infrastructure demand grew 31% in 2024. Every company handling data — which is every company — needs them.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🗄️', title: 'You Power Everything Users Love', desc: 'Every feature a user interacts with rests on a backend you built. Payments, authentication, notifications, search — all of it lives in the systems backend engineers design and maintain.' },
  { emoji: '💰', title: 'The Highest Engineering Salaries', desc: 'Senior backend engineers earn R1.4M–R2.5M+ in South Africa. Distributed systems and platform engineers at USD-paying global companies earn considerably more.' },
  { emoji: '🌍', title: 'Remote Work is Expected', desc: '58% of backend roles are fully remote. Backend work has zero physical dependency — your API responds the same way whether you\'re in Cape Town or Kraków.' },
  { emoji: '🧩', title: 'Deep Problems, Deep Satisfaction', desc: 'Scaling a system from 100 to 10 million requests, eliminating a P99 latency spike, or designing an elegant database schema — backend problems are genuinely hard and deeply satisfying to solve.' },
  { emoji: '📈', title: 'The Clearest Path to Architecture', desc: 'Senior Backend → Staff Engineer → Principal Architect is one of the most financially rewarding and intellectually satisfying career paths in all of technology.' },
  { emoji: '🔒', title: 'Skills That Age Slowly', desc: 'HTTP, databases, security, and distributed systems fundamentals change slowly. Backend skills you build today compound for 20 years — unlike frontend frameworks that reinvent themselves annually.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#1d4ed8', bgColor: '#eff6ff', items: [
    { name: 'The Odin Project — Node.js Path (free)', url: '#', type: 'Course', rating: 5 },
    { name: 'CS50x — Harvard Introduction to CS', url: '#', type: 'Course', rating: 5 },
    { name: 'Full Stack Open — Node, SQL, GraphQL', url: '#', type: 'Course', rating: 5 },
    { name: 'FastAPI Official Tutorial (Python)', url: '#', type: 'Docs', rating: 5 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'LeetCode (algorithms & system design)', url: '#', type: 'Practice', rating: 5 },
    { name: 'SQLZoo & PGExercises (SQL mastery)', url: '#', type: 'Practice', rating: 4 },
    { name: 'Build your own X (GitHub repo)', url: '#', type: 'Project', rating: 5 },
    { name: 'roadmap.sh — Backend Developer Path', url: '#', type: 'Reference', rating: 5 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'Fireship.io YouTube Channel', url: '#', type: 'YouTube', rating: 5 },
    { name: 'r/backend & r/learnprogramming', url: '#', type: 'Forum', rating: 4 },
    { name: 'Software Engineering Daily Podcast', url: '#', type: 'Podcast', rating: 5 },
    { name: 'ByteByteGo Newsletter & Blog', url: '#', type: 'Blog', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Backend Developer', range: 'R300k – R520k', midpoint: 410, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Backend Developer', range: 'R600k – R1.05M', midpoint: 825, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Backend Developer', range: 'R1.05M – R1.75M', midpoint: 1400, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Staff / Principal Engineer', range: 'R2M – R3.5M+', midpoint: 2600, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Only Building CRUD — Never Studying Systems',
    desc: 'Writing create/read/update/delete endpoints is the easy part. Developers who never study caching, queuing, and distributed systems hit a ceiling they can\'t see until interviews reveal it.',
    fix: 'After every project, ask: "How would this work with 1,000× the traffic?" Design the answer on paper.',
  },
  {
    num: '02', title: 'Ignoring Security Until the End',
    desc: 'Adding authentication and validation as an afterthought creates structural vulnerabilities. SQL injection, broken auth, and mass assignment bugs are all avoidable with early, intentional design.',
    fix: 'Before writing a single endpoint, design your auth model, input validation rules, and rate limiting strategy.',
  },
  {
    num: '03', title: 'Writing No Tests',
    desc: 'Backend code without tests makes refactoring terrifying and deployments risky. Integration tests on APIs catch real bugs before users do — this is professional table stakes.',
    fix: 'Add an integration test for every endpoint you build. Start with happy-path tests, then add failure cases.',
  },
  {
    num: '04', title: 'Skipping Documentation',
    desc: 'An undocumented API is a liability. Your frontend colleagues waste hours guessing at schemas, and you become the bottleneck every time someone needs to integrate with your service.',
    fix: 'Use OpenAPI (Swagger) from day one. Auto-generate docs and treat them as part of the definition of done.',
  },
  {
    num: '05', title: 'Never Profiling or Measuring Performance',
    desc: 'Assuming your queries are fast without measuring is naive. The N+1 query problem silently kills performance at scale — and you won\'t find it without a profiler.',
    fix: 'Enable query logging in development. Profile every new endpoint under realistic data volumes before shipping.',
  },
  {
    num: '06', title: 'Deploying Everything Manually',
    desc: 'Manual deployments are slow, inconsistent, and error-prone. If shipping code requires SSH-ing into a server, your deployment process is a liability that will eventually cause a production incident.',
    fix: 'Set up a basic GitHub Actions CI/CD pipeline for your very first project. Automate tests and deployment from the start.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Data Analyst / Scientist',
    ease: 'Natural Fit', easeColor: '#1d4ed8', easeBg: '#eff6ff',
    desc: 'SQL, Python, and statistical thinking are already in your toolkit. Add web frameworks, API design, and deployment skills — and you become an exceptionally well-rounded data-oriented backend developer.',
    steps: ['Learn FastAPI or Django REST Framework', 'Build a data API serving your analytics work', 'Add Docker + PostgreSQL to your stack', 'Target data-engineering or analytics-backend roles'],
  },
  {
    from: 'IT Support / Sysadmin',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Linux, networking, and infrastructure knowledge gives you a massive DevOps advantage. Add programming and API development skills to move into backend or platform engineering roles.',
    steps: ['Learn Python fundamentals (automate tasks first)', 'Build REST APIs with FastAPI or Flask', 'Apply your Linux/Docker knowledge to deployments', 'Target DevOps-adjacent or backend platform roles'],
  },
  {
    from: 'Frontend Developer',
    ease: 'Very Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'You already understand the API contract from the consuming side. Flip to the producing side with Node.js, add database skills, and you can transition into a true backend or full-stack role relatively quickly.',
    steps: ['Deep-dive Node.js / Express beyond what you know', 'Build a complete API with auth and a SQL database', 'Learn Docker and deploy your first backend service', 'Apply to backend-heavy or full-stack roles'],
  },
  {
    from: 'Other Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Domain expertise combined with backend skills is genuinely rare. A backend engineer who understands healthcare, finance, or logistics commands a premium in those verticals.',
    steps: ['Start with CS50 and Python fundamentals', 'Build a backend project in your domain', 'Deploy it publicly with proper auth and a database', 'Target companies in your previous industry'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Language & Environment', color: '#1d4ed8', bg: '#eff6ff', days: [
    { day: 'Day 1–2', task: 'Install Python or Node.js. Set up VS Code. Write scripts covering variables, loops, functions, and basic OOP.' },
    { day: 'Day 3–4', task: 'Git fundamentals: init, add, commit, branch, merge. Push your first project to GitHub.' },
    { day: 'Day 5–6', task: 'HTTP deep dive: understand GET/POST/PUT/DELETE, status codes, headers, and the request-response cycle.' },
    { day: 'Day 7', task: 'Build a simple HTTP server from scratch (no framework). Handle routes manually. Commit to GitHub.' },
  ]},
  { week: 'Week 2', theme: 'APIs & Databases', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Set up Express (Node) or FastAPI (Python). Build 5 REST endpoints for a resource (e.g. blog posts).' },
    { day: 'Day 10–11', task: 'Connect your API to PostgreSQL. Write CREATE TABLE, SELECT, INSERT, UPDATE, DELETE queries manually.' },
    { day: 'Day 12–13', task: 'Swap raw SQL for an ORM (Prisma or SQLAlchemy). Write migrations. Seed the database with test data.' },
    { day: 'Day 14', task: 'Add input validation and proper error handling. Every endpoint returns consistent JSON error responses.' },
  ]},
  { week: 'Week 3', theme: 'Auth, Security & Testing', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Implement user registration and JWT login. Protect endpoints with auth middleware.' },
    { day: 'Day 17–18', task: 'Write integration tests for all your endpoints using Jest (Node) or pytest (Python).' },
    { day: 'Day 19–20', task: 'Add Redis caching to one expensive endpoint. Observe the performance difference with logging.' },
    { day: 'Day 21', task: 'Review OWASP top 10 list. Audit your own API for the most common vulnerabilities. Fix what you find.' },
  ]},
  { week: 'Week 4', theme: 'Deploy & Ship', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Dockerise the entire application. Write a docker-compose file for API + database + Redis.' },
    { day: 'Day 25–26', task: 'Set up GitHub Actions CI/CD pipeline. Auto-run tests on every push. Deploy passing builds to Railway.' },
    { day: 'Day 27–28', task: 'Add OpenAPI docs (Swagger UI). Write a README with setup, endpoints, and architecture diagram.' },
    { day: 'Day 29–30', task: 'Share project on LinkedIn. Apply to 5 junior backend roles. Update CV with GitHub link and tech stack.' },
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
      try { await navigator.share({ title: 'Backend Developer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Backend Developer in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/backend-developer'}</span>
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
export default function BackendDeveloperRoadmapPage() {
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
            alt="Backend Developer server room and code"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Server size={12} /> Engineering & Infrastructure
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Backend Developer
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
            Build the systems that never sleep. Backend developers design the APIs, databases, and infrastructure that power every user interaction — invisible to the world, indispensable to the product.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Backend Development" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#eff6ff', borderColor: 'rgba(29,78,216,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Backend Developer</strong> engineers the server-side systems that store, process, and serve data. While users never see the backend directly, they feel it in every page load, every successful payment, every search result, and every notification. Backend engineers design APIs, model databases, secure data, and ensure systems remain performant and reliable as they scale from hundreds to millions of users.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Backend Development could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Backend Developer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(29,78,216,0.3)'; (e.currentTarget as HTMLElement).style.background = '#eff6ff' }}
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → Staff Engineer</span></div>
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
              const icons = ['🐍', '🌐', '🗄️', '🔒', '🐳', '🏗️']
              const accentColors = ['#1d4ed8', '#16a34a', '#1d4ed8', '#16a34a', '#1d4ed8', '#16a34a']
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.indigo} 100%)`, boxShadow: '0 8px 48px rgba(29,78,216,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>10–14 months · Consistent daily practice · Build and ship real projects</div>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Backend Development in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#eff6ff', borderColor: 'rgba(29,78,216,0.2)', color: C.textMuted }}>
              AI tools don't replace backend developers — they <em style={{ color: C.primary }}>amplify</em> them. Developers who integrate Copilot and Claude into their workflow generate boilerplate, write test suites, and debug production issues significantly faster — freeing time for architecture and system design.
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially for senior and staff roles — can pay 2–4× these figures in USD.</p>
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
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#eff6ff', borderColor: 'rgba(29,78,216,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> Backend engineers at product-led companies (fintech, SaaS, cloud infrastructure) earn 30–50% more than those at agencies. Target companies where the backend is a competitive advantage, not just a cost centre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring backend developers" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into backend development from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Backend Development" iconBg={C.redLight} iconColor={C.red} />
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
                Backend development is the discipline that <strong style={{ color: C.primary }}>makes everything else possible</strong>. Every successful product — every startup that scaled, every fintech that processed billions — was built on the work of backend engineers who designed reliable systems, secured user data, and kept the lights on.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The path is demanding, but the fundamentals you build early compound for decades. An engineer who deeply understands HTTP, databases, and distributed systems never stops being valuable — regardless of which framework is fashionable that year.
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open your terminal and write your first endpoint.
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