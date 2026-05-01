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
  GitBranch, Terminal, Shield,
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

const CAREER_LEVELS = [
  {
    level: 'Junior', title: 'Junior Software Dev', duration: '0–2 yrs', salary: 'R280k–R500k',
    description: 'Implement features, fix bugs, write tests, and learn software design patterns under mentorship. Understand version control, code reviews, and agile workflows.',
    skills: ['Python/Java/C#', 'Git & GitHub', 'Unit Testing', 'Agile Basics'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Software Developer', duration: '2–5 yrs', salary: 'R550k–R1M',
    description: 'Own features end-to-end, design software modules, lead code reviews, implement design patterns, and mentor junior developers across the product.',
    skills: ['Design Patterns', 'System Design', 'CI/CD', 'Cloud Basics'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Software Dev', duration: '5–8 yrs', salary: 'R1M–R1.8M',
    description: 'Architect complex software solutions, define engineering standards, drive technical roadmaps, and mentor entire engineering teams across the organization.',
    skills: ['Architecture', 'Tech Strategy', 'Mentoring', 'Cross-team'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'Staff / Principal Eng', duration: '8+ yrs', salary: 'R2M+',
    description: 'Define engineering vision across the organization, shape culture, resolve the hardest design and reliability challenges, and drive strategic technical decisions.',
    skills: ['Eng Leadership', 'Platform Design', 'Org Strategy', 'Innovation'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Programming Fundamentals — Pick Your Language',
    description: 'Choose Python, Java, or C# as your first language and master it deeply. Learn variables, data types, control flow, functions, OOP, error handling, and modules. Understand how programs execute and how memory is managed at a conceptual level.',
    duration: '2–3 months', skills: ['Python / Java / C#', 'OOP Principles', 'Data Structures', 'Algorithms Basics'],
  },
  {
    step: 2, title: 'Data Structures & Algorithms',
    description: 'Master arrays, linked lists, stacks, queues, trees, graphs, and hash maps. Understand time and space complexity (Big O). Solve problems on LeetCode and HackerRank. These concepts underpin every technical interview and every high-performance system.',
    duration: '2–3 months', skills: ['Arrays & Trees', 'Sorting & Search', 'Big O Notation', 'Problem Solving'],
  },
  {
    step: 3, title: 'Software Design & Architecture Patterns',
    description: 'Learn the SOLID principles, design patterns (Factory, Observer, Strategy, Singleton), and clean code practices. Understand how to structure large codebases, separate concerns, and write code that is readable, testable, and maintainable.',
    duration: '2–3 months', skills: ['SOLID Principles', 'Design Patterns', 'Clean Code', 'Refactoring'],
  },
  {
    step: 4, title: 'Version Control, Testing & Collaboration',
    description: 'Master Git branching strategies, pull requests, and merge conflict resolution. Learn unit, integration, and end-to-end testing. Write code that others can review and build on. Understand agile ceremonies and how engineering teams collaborate at scale.',
    duration: '1–2 months', skills: ['Git Advanced', 'TDD / BDD', 'Code Reviews', 'Agile/Scrum'],
  },
  {
    step: 5, title: 'Databases, APIs & System Integration',
    description: 'Learn relational (PostgreSQL) and NoSQL (MongoDB) databases. Build and consume REST APIs. Understand authentication, caching, and data modeling. Software developers who can reason across the full system are significantly more valuable than specialists in isolation.',
    duration: '2–3 months', skills: ['SQL & NoSQL', 'REST APIs', 'Authentication', 'Caching'],
  },
  {
    step: 6, title: 'Cloud, DevOps & Deployment',
    description: 'Learn Docker for containerization, CI/CD pipelines for automated deployment, and cloud platforms (AWS, Azure, or GCP) for hosting and scaling. Understand infrastructure as code, environment management, and how to ship software reliably to production systems.',
    duration: '2–3 months', skills: ['Docker', 'CI/CD Pipelines', 'AWS / Azure / GCP', 'IaC Basics'],
  },
]

const HARD_SKILLS = [
  { name: 'Core Programming Language', level: 95 },
  { name: 'Data Structures & Algorithms', level: 90 },
  { name: 'Software Design Patterns', level: 87 },
  { name: 'Testing (Unit / Integration)', level: 85 },
  { name: 'Git & Version Control', level: 92 },
  { name: 'Databases (SQL & NoSQL)', level: 80 },
  { name: 'Cloud & DevOps', level: 72 },
  { name: 'System Architecture', level: 65 },
]

const SOFT_SKILLS = [
  { name: 'Analytical Problem Solving', description: 'Break ambiguous requirements into precise, implementable specifications. The best software developers turn vague product ideas into clean, working systems through structured decomposition.' },
  { name: 'Code Communication', description: 'Write code as communication first, execution second. Variable names, function signatures, and module structure tell the story of your intent. Code that needs comments to explain what it does is code that needs refactoring.' },
  { name: 'Estimating Accurately', description: 'One of the rarest skills in software development. Decompose tasks, identify unknowns early, and communicate uncertainty. Teams trust developers who estimate well and communicate changes proactively.' },
  { name: 'Feedback Receptiveness', description: 'Code reviews are gifts. Every PR comment is an opportunity to learn how your peers think about design. Developers who detach ego from code grow significantly faster than those who defend their first draft.' },
  { name: 'Product Thinking', description: 'The best software developers understand why a feature exists, not just what it should do. Asking "why" before implementing "how" consistently leads to simpler, more elegant solutions.' },
  { name: 'Adaptability', description: 'Technologies change. Requirements change. Codebases get rewritten. Developers who build strong fundamentals and stay curious adapt faster than specialists tied to a single tool or framework.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Computer Science Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(3,105,161,0.2)', bgColor: '#f0f9ff', typeBg: 'rgba(3,105,161,0.12)', typeColor: '#0369a1',
    pros: ['Deep theory: algorithms, OS, compilers, networking', 'High credibility at top tech companies', 'Structured exposure to mathematics and formal logic', 'Access to graduate programmes and internship pipelines'],
    cons: ['3–4 year runway before first job', 'Heavy on theory, light on practical tooling', 'Web frameworks and modern DevOps largely self-taught', 'Expensive — especially at private universities'],
  },
  {
    type: 'Bootcamp', title: 'Software Dev Bootcamp', duration: '3–6 months', cost: 'R60k – R130k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Job-ready skills in months, not years', 'Strong project portfolio on exit', 'Career support and employer networks', 'Cohort accountability and structured pacing'],
    cons: ['Variable programme quality across providers', 'Credential not universally respected by employers', 'Algorithms and CS depth largely absent', 'Junior market highly competitive on exit'],
  },
  {
    type: 'Self-Taught', title: 'Online Courses & Projects', duration: '12–24 months', cost: 'R0 – R8k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['World-class free courses (CS50, The Odin Project)', 'Build real projects from day one', 'No ceiling on what you can learn or how fast', 'Flexible to your schedule and interests'],
    cons: ['Requires exceptional self-discipline', 'Easy to have dangerous knowledge gaps', 'No formal credential on your CV', 'Imposter syndrome is persistent and common'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Standup & Sprint Planning', desc: 'Sync on progress, blockers, and priorities. Review pull requests and triage bug reports from the previous day.', duration: '30 min', icon: <GitBranch size={14} /> },
  { time: '9:30', act: 'Feature Development', desc: 'Deep implementation work: new features, refactoring, or performance improvements. Protected time with no interruptions.', duration: '2.5 hrs', icon: <Code size={14} /> },
  { time: '12:00', act: 'Code Reviews & Debugging', desc: 'Review teammates\' pull requests, investigate reported bugs, and trace logic through test environments.', duration: '1 hr', icon: <Terminal size={14} /> },
  { time: '1:00', act: 'Lunch & Recovery', desc: 'Rest restores cognitive capacity. The best code often comes after stepping away — the brain solves problems in the background.', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Technical Design & Planning', desc: 'Write technical specs, design system architecture, create diagrams, collaborate with product on upcoming feature requirements.', duration: '1 hr', icon: <FileText size={14} /> },
  { time: '3:00', act: 'Testing & CI Pipeline', desc: 'Write unit and integration tests, run the test suite, fix CI failures, and merge approved pull requests to staging.', duration: '1.5 hrs', icon: <Shield size={14} /> },
  { time: '4:30', act: 'Learning & Documentation', desc: 'Read engineering blogs, study new patterns, update internal docs, or work on a side project or open source contribution.', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'VS Code / IntelliJ', cat: 'IDE' }, { name: 'Git / GitHub', cat: 'Version Control' },
  { name: 'Docker', cat: 'Containers' }, { name: 'GitHub Actions', cat: 'CI/CD' },
  { name: 'Jest / JUnit', cat: 'Testing' }, { name: 'AWS / Azure', cat: 'Cloud' },
  { name: 'Jira / Linear', cat: 'Project Mgmt' }, { name: 'Postman', cat: 'API Testing' },
]

const WORK_ENVS = [
  { type: 'Remote', pct: 52 },
  { type: 'Hybrid', pct: 35 },
  { type: 'In-Office', pct: 13 },
]

const AI_IMPACTS = [
  {
    title: 'AI Pair Programming', icon: <Sparkles size={20} />,
    desc: 'GitHub Copilot, Cursor, and Claude now write boilerplate, generate test cases, refactor code, and explain complex logic inline. Software developers using AI tools report 30–50% productivity gains on implementation tasks.',
    tools: ['GitHub Copilot', 'Cursor', 'Claude', 'Tabnine'],
    borderColor: 'rgba(3,105,161,0.18)', bgColor: '#f0f9ff', icoBg: 'rgba(3,105,161,0.12)', icoColor: '#0369a1', tagBg: 'rgba(3,105,161,0.1)', tagColor: '#0369a1', titleColor: '#0369a1',
  },
  {
    title: 'AI-Powered Code Review', icon: <Zap size={20} />,
    desc: 'AI tools now catch security vulnerabilities, detect anti-patterns, suggest performance improvements, and flag missing test coverage automatically — before human reviewers even open the PR.',
    tools: ['CodeRabbit', 'Sourcery', 'DeepCode', 'SonarQube AI'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'LLM Feature Integration', icon: <TrendingUp size={20} />,
    desc: 'Software developers who can integrate LLMs into product features — chat interfaces, document summarisation, intelligent search, and recommendation engines — command a significant premium in 2026.',
    tools: ['OpenAI API', 'Anthropic API', 'LangChain', 'Vector DBs'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'LLM API Integration (OpenAI / Anthropic)', 'AI-Assisted Test Generation',
  'WebAssembly (WASM)', 'Edge Computing & Serverless',
  'OpenTelemetry & Observability', 'Infrastructure as Code (Terraform)',
]

const PROS = [
  { title: 'Universal Demand Across Every Industry', desc: 'Every sector — healthcare, finance, education, logistics, entertainment — needs software developers. This is one of the most transferable and recession-resistant careers in the global economy.' },
  { title: 'Remote Work is the Default', desc: '52% of software development roles are fully remote globally. The work requires only a computer and an internet connection — enabling developers to work from anywhere in the world.' },
  { title: 'Continuous Intellectual Stimulation', desc: 'No two problems are the same. Software development is a craft that combines engineering discipline with creative problem solving — the learning never stops and neither does the satisfaction.' },
  { title: 'Excellent Compensation at All Levels', desc: 'From junior to principal, software developers earn above-average salaries. Senior developers at product companies in SA earn R1.2M–R2.5M. Global remote contracts pay significantly more.' },
  { title: 'Clear Growth Path', desc: 'Junior → Mid → Senior → Staff → Principal / Engineering Manager. The path is well-defined, meritocratic, and tied to skill — not tenure or politics.' },
  { title: 'You Build Things That Exist', desc: 'Every feature you ship, every app you build, every bug you fix creates something that real people use. The tangible output of software development is deeply satisfying in ways most careers are not.' },
]

const CONS = [
  { title: 'Constant Technology Change', desc: 'The JavaScript ecosystem reinvents itself every two years. New frameworks, new paradigms, new tools — keeping up requires ongoing learning that never ends, even for senior engineers.' },
  { title: 'Technical Debt Reality', desc: 'Most professional codebases are far messier than any tutorial project. Maintaining legacy systems, untangling ten-year-old code, and working around poor past decisions is the unglamorous daily reality of software development.' },
  { title: 'Estimation is Hard', desc: 'Software projects routinely run over time and budget. The pressure to deliver unrealistic timelines, combined with the inherent unpredictability of software development, creates chronic stress in most teams.' },
  { title: 'Isolation Risk', desc: 'Deep focus work can become isolating, especially in remote environments. Developers who neglect collaboration, communication, and relationship-building within their teams often plateau professionally.' },
  { title: 'Imposter Syndrome is Pervasive', desc: 'The field is vast. No single developer knows everything, but many feel they should. Comparing yourself to senior engineers when you\'re still learning creates psychological pressure that takes years to resolve.' },
  { title: 'Meetings and Context Switching', desc: 'As seniority increases, so does the meeting load. Context switching between deep technical work and planning or review meetings fragments concentration and reduces the depth of the actual development work.' },
]

const VIDEOS = [
  { id: 'ysEN5RaKOlA', title: 'Software Development Career Roadmap 2025', desc: 'A comprehensive guide covering all the skills, tools, and learning paths to build a successful career as a software developer in 2025 and beyond.', dur: '18:44', channel: 'Fireship' },
  { id: 'zOjov-2OZ0E', title: 'Data Structures & Algorithms Full Course', desc: 'Master the core data structures and algorithms every software developer needs — arrays, trees, graphs, sorting, searching, and dynamic programming.', dur: '8:03:51', channel: 'freeCodeCamp' },
  { id: 'FLtqAi7WNBY', title: 'Clean Code — Writing Code That Lasts', desc: 'Learn the principles of clean code, SOLID design, and software craftsmanship that separate junior developers from senior engineers.', dur: '1:04:52', channel: 'Continuous Delivery' },
]

const TAKEAWAYS = [
  'Master one language deeply before learning a second — breadth without depth is the most common trap for early career developers',
  'Every project you build must be deployed publicly — local projects teach you nothing about the real challenges of software in production',
  'Algorithms and data structures are permanent knowledge — invest heavily in them early and they will compound throughout your entire career',
  'Read code written by engineers better than you — open source repositories are free mentorship at the highest level available',
  'The best developers write less code, not more — simplicity, clarity, and restraint are the marks of genuine software mastery',
]

const CAREER_FACTS = [
  {
    icon: <Code size={20} />, title: 'What You Build',
    desc: 'Desktop applications, web platforms, mobile apps, APIs, developer tools, automation scripts, embedded software, data pipelines, and the internal systems that run businesses of every size.',
    color: '#0369a1',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Feature implementation, code review, debugging, system design, test writing, technical documentation, architecture planning, sprint participation, and continuous delivery pipeline management.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Product managers defining requirements, designers creating interfaces, QA engineers testing your code, DevOps engineers managing infrastructure, and other developers building the same product.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'Software developers are among the most in-demand professionals globally. The World Economic Forum lists software development among the top 5 roles seeing the highest demand growth through 2030.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '💻', title: 'You Build Products Millions Use', desc: 'Software developers create the apps, platforms, and tools that people interact with every day. From mobile banking to productivity tools, your code shapes how the world works.' },
  { emoji: '💰', title: 'Excellent Salaries at Every Level', desc: 'Senior software developers at product companies in South Africa earn R1.2M–R2.5M. Global remote roles for experienced developers can pay 2–4× more in USD.' },
  { emoji: '🌍', title: 'Work From Anywhere', desc: '52% of software developer roles are fully remote. All you need is a laptop and internet connection — the work is the same whether you\'re in Johannesburg or Japan.' },
  { emoji: '🧩', title: 'Creative Problem Solving Every Day', desc: 'Software development combines engineering rigour with creative thinking. Every feature is a design problem, every bug is a detective case, and every architecture is a work of craft.' },
  { emoji: '📈', title: 'A Well-Defined Growth Path', desc: 'Junior → Mid → Senior → Staff → Principal. The career ladder is clear, skill-based, and meritocratic. Hard work and learning translate directly into career advancement.' },
  { emoji: '🔧', title: 'You\'re Always Learning', desc: 'Technology evolves constantly — which means software developers are always growing. If lifelong learning energises rather than exhausts you, software development is an ideal career.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#0369a1', bgColor: '#f0f9ff', items: [
    { name: 'CS50x — Harvard Introduction to CS (free)', url: '#', type: 'Course', rating: 5 },
    { name: 'The Odin Project (full curriculum, free)', url: '#', type: 'Course', rating: 5 },
    { name: 'MIT OpenCourseWare — 6.006 Algorithms', url: '#', type: 'Course', rating: 5 },
    { name: 'roadmap.sh — Software Developer Path', url: '#', type: 'Reference', rating: 5 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'LeetCode (algorithms & interview prep)', url: '#', type: 'Practice', rating: 5 },
    { name: 'Exercism.io (language-specific challenges)', url: '#', type: 'Practice', rating: 4 },
    { name: 'Build Your Own X (GitHub)', url: '#', type: 'Project', rating: 5 },
    { name: 'Refactoring Guru (patterns & refactoring)', url: '#', type: 'Reference', rating: 5 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'Fireship.io YouTube Channel', url: '#', type: 'YouTube', rating: 5 },
    { name: 'r/learnprogramming & r/cscareerquestions', url: '#', type: 'Forum', rating: 4 },
    { name: 'Software Engineering Daily Podcast', url: '#', type: 'Podcast', rating: 5 },
    { name: 'The Pragmatic Programmer (book)', url: '#', type: 'Book', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Software Developer', range: 'R280k – R500k', midpoint: 390, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Software Developer', range: 'R550k – R1M', midpoint: 775, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Software Developer', range: 'R1M – R1.8M', midpoint: 1400, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Staff / Principal Engineer', range: 'R2M – R3.5M+', midpoint: 2600, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Tutorial Hell — Learning Without Building',
    desc: 'Watching 50 tutorials gives you the feeling of progress without the skills. Real learning happens when you stop following instructions and build something you designed yourself.',
    fix: 'After every tutorial, close it and rebuild the same thing from memory without looking. Then add one feature the tutorial didn\'t cover.',
  },
  {
    num: '02', title: 'Skipping Algorithms & Data Structures',
    desc: 'Many bootcamp graduates cannot pass technical interviews at quality companies because they avoided the fundamentals. Data structures and algorithms are permanent, transferable knowledge.',
    fix: 'Commit to solving at least 2 LeetCode problems per week, every week, starting from your first month of learning.',
  },
  {
    num: '03', title: 'Writing Zero Tests',
    desc: 'Untested code is a liability that accumulates interest. Developers who don\'t test create technical debt for their entire team and make refactoring terrifying instead of routine.',
    fix: 'Start every feature with a failing test. Write code to make it pass. This is TDD and it changes how you think about design.',
  },
  {
    num: '04', title: 'Neglecting Clean Code Practices',
    desc: 'Code that works but can\'t be read is half-finished. Variable names, function size, single responsibility, and consistent formatting are professional obligations, not aesthetic preferences.',
    fix: 'Read "Clean Code" by Robert Martin. Apply one principle per week to code you\'re actively writing.',
  },
  {
    num: '05', title: 'Learning Too Many Languages at Once',
    desc: 'Dabbling in Python, JavaScript, Java, and Go simultaneously means mastering none of them. Shallow knowledge in many languages is worth less than deep expertise in one.',
    fix: 'Pick one language and commit to it for at least 18 months. Depth compounds; breadth at this stage is procrastination.',
  },
  {
    num: '06', title: 'Ignoring Soft Skills',
    desc: 'Technical skills get you hired. Communication, collaboration, and estimation skills determine your career trajectory. Engineers who can\'t communicate their technical ideas hit a hard ceiling at mid-level.',
    fix: 'Write a technical blog, give a talk at a local meetup, or start contributing to open source. Practise communicating technical ideas in public.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Mathematics / Statistics Graduate',
    ease: 'Natural Fit', easeColor: '#0369a1', easeBg: '#f0f9ff',
    desc: 'Mathematical thinking, logical reasoning, and comfort with abstraction transfer directly to software development. Add a programming language and software engineering practices to a foundation that\'s already strong.',
    steps: ['Learn Python — math grads pick it up in weeks', 'Study data structures and algorithm complexity', 'Build a project combining your domain and code', 'Target data engineering or backend developer roles'],
  },
  {
    from: 'IT Support / Sysadmin',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Systems thinking, networking knowledge, and familiarity with Linux give IT professionals a major advantage in understanding how software runs in production. Add programming skills to move into development or DevOps.',
    steps: ['Learn Python scripting (automate your current job)', 'Build a small application that solves a work problem', 'Study web frameworks and add API development skills', 'Apply to junior developer or DevOps-adjacent roles'],
  },
  {
    from: 'Non-Technical / Other Background',
    ease: 'Very Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Domain expertise plus software skills is a rare and powerful combination. A developer who deeply understands healthcare, legal, finance, or education workflows commands a significant premium in those verticals.',
    steps: ['Start with CS50 — the best intro to programming available', 'Learn Python fundamentals over 3 months', 'Build a project relevant to your previous industry', 'Target companies in your domain with your combined skills'],
  },
  {
    from: 'Designer / Creative Professional',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Designers who code are exceptionally rare and valuable. Visual thinking, user empathy, and attention to detail translate beautifully into frontend development and ultimately into full-stack roles.',
    steps: ['Start with HTML, CSS, and JavaScript fundamentals', 'Learn a modern frontend framework (React)', 'Add backend skills (Node.js or Python)', 'Target frontend or full-stack developer roles'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Language & Foundations', color: '#0369a1', bg: '#f0f9ff', days: [
    { day: 'Day 1–2', task: 'Choose Python or JavaScript. Install the environment. Write scripts covering variables, loops, functions, and basic classes.' },
    { day: 'Day 3–4', task: 'Git fundamentals: init, commit, branch, merge, rebase. Create a GitHub profile and push your first repository.' },
    { day: 'Day 5–6', task: 'Solve 5 easy algorithm problems on LeetCode. Focus on arrays and string manipulation — the most common interview categories.' },
    { day: 'Day 7', task: 'Build a small CLI tool that solves a real problem you have. Commit to GitHub with a clear README.' },
  ]},
  { week: 'Week 2', theme: 'Data Structures & OOP', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Implement a linked list, stack, and queue from scratch. Understand when to use each one.' },
    { day: 'Day 10–11', task: 'Study OOP: classes, inheritance, polymorphism, encapsulation. Refactor your CLI tool using proper OOP design.' },
    { day: 'Day 12–13', task: 'Learn hash maps and binary trees. Solve 5 more LeetCode problems using these structures.' },
    { day: 'Day 14', task: 'Write unit tests for every function in your CLI tool using pytest or Jest. Fix any bugs your tests expose.' },
  ]},
  { week: 'Week 3', theme: 'Web Development & APIs', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Build a simple web application with a framework (Flask/Django or Express). Understand request/response lifecycle.' },
    { day: 'Day 17–18', task: 'Connect the application to a PostgreSQL database. Perform CRUD operations using an ORM.' },
    { day: 'Day 19–20', task: 'Add user authentication (registration, login, JWT tokens). Protect private routes with middleware.' },
    { day: 'Day 21', task: 'Write integration tests for all API endpoints. Achieve 80% test coverage before moving on.' },
  ]},
  { week: 'Week 4', theme: 'Deploy & Get Hired', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Dockerise the application. Write a docker-compose file. Deploy to Railway or Render with a working live URL.' },
    { day: 'Day 25–26', task: 'Set up GitHub Actions CI. Automatically run tests on every push. Send a Slack notification on failure.' },
    { day: 'Day 27–28', task: 'Write a README with architecture diagram, setup guide, and feature list. Add OpenAPI docs for every endpoint.' },
    { day: 'Day 29–30', task: 'Post the project to LinkedIn with a short writeup. Apply to 5 junior developer roles. Update CV with GitHub and live URL.' },
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
      try { await navigator.share({ title: 'Software Developer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Software Developer in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/software-developer'}</span>
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

export default function SoftwareDeveloperRoadmapPage() {
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
          <img
            src="https://i.imgur.com/d7StxGp.jpeg"
            alt="Software Developer coding workspace"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Code size={12} /> Software Engineering
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Software Developer
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
            Write the future. Software developers design, build, and maintain the applications that power every modern business — from startup MVPs to enterprise platforms used by millions.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Software Development" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0f9ff', borderColor: 'rgba(3,105,161,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Software Developer</strong> designs, writes, tests, and maintains the code that powers applications, platforms, and tools. Unlike more specialised roles, software developers work across the full product lifecycle — from understanding user requirements and designing technical solutions to shipping features and fixing production bugs. The role is a blend of analytical engineering and creative problem solving.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Software Development could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Software Developer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
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

      {/* CAREER TIMELINE */}
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

      {/* ROADMAP */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div ref={stepsRef} className="max-w-2xl mx-auto px-4">
          <SectionHeader icon={<Target size={22} />} title="Step-by-Step Roadmap" subtitle="Your path from complete beginner to job-ready" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="relative flex flex-col items-center">
            {ROADMAP_STEPS.map((s, i) => {
              const icons = ['💻', '🧮', '🏗️', '🧪', '🗄️', '☁️']
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
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>10–14 months · Consistent daily practice · Build and ship real projects</div>
            </div>
          </div>
          
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Software Development in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0f9ff', borderColor: 'rgba(3,105,161,0.2)', color: C.textMuted }}>
              AI tools don't replace software developers — they <em style={{ color: C.primary }}>amplify</em> them. Developers who integrate Copilot and Claude into their workflow generate boilerplate, write test suites, and debug complex logic significantly faster — freeing cognitive capacity for architecture and design.
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
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f0f9ff', borderColor: 'rgba(3,105,161,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> Software developers at product-led companies (SaaS, fintech, developer tools) earn 30–50% more than those at agencies or outsourcing firms. Target companies where software is the product, not just a tool.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISTAKES */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring software developers" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into software development from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Software Development" iconBg={C.redLight} iconColor={C.red} />
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
                Software development is one of the most <strong style={{ color: C.primary }}>intellectually rewarding and financially compelling</strong> careers available today. Every application you build, every bug you fix, every system you improve creates real value for real people.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The fundamentals you invest in early — algorithms, design patterns, clean code — compound over decades. A developer who deeply understands these principles writes better code in any language, on any platform, in any era of technology.
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open your editor and write your first function.
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