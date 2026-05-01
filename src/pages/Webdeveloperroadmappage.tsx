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
  Layers, Globe, Layout,
  GitBranch, Shield,
  Workflow, Eye,
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
  primary: '#0d9488',         // teal — web dev brand colour
  primaryLight: 'rgba(13,148,136,0.08)',
  primaryMid: 'rgba(13,148,136,0.15)',
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
    level: 'Junior', title: 'Junior Web Developer', duration: '0–2 yrs', salary: 'R260k–R450k',
    description: 'Build and maintain web pages, implement designs, write basic JavaScript, and collaborate with senior developers. Learning Git, debugging browser issues, and understanding client requirements.',
    skills: ['HTML/CSS', 'JavaScript', 'Git', 'CMS Tools'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Web Developer', duration: '2–5 yrs', salary: 'R500k–R900k',
    description: 'Lead feature development, choose appropriate tech stacks, integrate APIs and databases, mentor juniors, and make architectural decisions for mid-scale web projects.',
    skills: ['React/Vue', 'Node.js', 'SQL/NoSQL', 'REST APIs'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Web Developer', duration: '5–8 yrs', salary: 'R900k–R1.5M',
    description: 'Architect scalable web applications, define coding standards, conduct technical interviews, drive performance improvements, and mentor entire development teams across projects.',
    skills: ['Full Stack', 'Architecture', 'DevOps Basics', 'Mentoring'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Lead/Principal', title: 'Lead Web Engineer', duration: '8+ yrs', salary: 'R1.5M+',
    description: 'Define technical vision, lead engineering teams, make technology strategy decisions, drive adoption of best practices across the organization, and influence product roadmap at the executive level.',
    skills: ['Tech Leadership', 'Strategy', 'Team Building', 'Vision'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Web Fundamentals: HTML, CSS & the Browser',
    description: 'Understand how the web works — HTTP, DNS, browsers, and rendering. Master semantic HTML5, modern CSS (Flexbox, Grid, custom properties), and responsive design. These fundamentals never expire and separate real developers from those who just copy-paste.',
    duration: '2–3 months', skills: ['HTML5', 'CSS3', 'HTTP / DNS', 'Browser Dev Tools'],
  },
  {
    step: 2, title: 'JavaScript & DOM Fundamentals',
    description: 'Learn JavaScript deeply — variables, functions, closures, prototypes, async patterns, and DOM manipulation. Without a strong JS foundation, every framework you learn will feel like magic you cannot control or debug effectively.',
    duration: '2–3 months', skills: ['JS ES6+', 'DOM API', 'Fetch / Async', 'Event Handling'],
  },
  {
    step: 3, title: 'Version Control, Git & Collaboration',
    description: 'Git is non-negotiable. Learn branching, merging, pull requests, and collaborative workflows. Understand GitHub/GitLab, CI/CD pipelines, and how professional teams ship code safely and collaboratively every single day.',
    duration: '2–4 weeks', skills: ['Git', 'GitHub/GitLab', 'Branching', 'Pull Requests'],
  },
  {
    step: 4, title: 'Frontend Framework: React or Vue',
    description: 'Pick one modern framework and go deep. React dominates the job market; Vue is elegant and approachable. Learn components, state, props, routing, and lifecycle patterns. Build 3+ real projects before moving on.',
    duration: '2–3 months', skills: ['React or Vue', 'Component Design', 'Routing', 'State Mgmt'],
  },
  {
    step: 5, title: 'Backend Basics: Node.js & Databases',
    description: 'Become a full-stack developer by learning server-side programming with Node.js and Express. Understand relational databases (PostgreSQL), NoSQL (MongoDB), REST API design, authentication, and how the frontend and backend communicate.',
    duration: '2–3 months', skills: ['Node.js', 'Express', 'PostgreSQL/MongoDB', 'REST APIs'],
  },
  {
    step: 6, title: 'Deployment, DevOps & Web Performance',
    description: 'Ship your work to the world. Learn cloud platforms (Vercel, AWS, Railway), Docker basics, CI/CD pipelines, environment variables, SSL certificates, and web performance optimization — Lighthouse, Core Web Vitals, and caching strategies.',
    duration: '1–2 months', skills: ['Vercel/AWS', 'CI/CD', 'Docker Basics', 'Web Vitals'],
  },
]

const HARD_SKILLS = [
  { name: 'HTML & CSS (Foundations)', level: 95 },
  { name: 'JavaScript / TypeScript', level: 92 },
  { name: 'React / Vue / Angular', level: 88 },
  { name: 'Node.js & Backend APIs', level: 80 },
  { name: 'Git & Version Control', level: 87 },
  { name: 'SQL & NoSQL Databases', level: 75 },
  { name: 'Responsive & Accessible Design', level: 85 },
  { name: 'Deployment & CI/CD', level: 72 },
]

const SOFT_SKILLS = [
  { name: 'Client Communication', description: 'Web developers often work directly with clients or product owners. Translating technical constraints into plain language — and business requirements into working software — is a superpower.' },
  { name: 'Problem Decomposition', description: 'Breaking a complex feature into small, shippable pieces. The best web developers think in user stories, not monolithic implementations. Ship incrementally, learn constantly.' },
  { name: 'Self-Directed Learning', description: 'The web evolves every year. New browser APIs, new frameworks, new deployment paradigms. Staying current without losing depth requires intentional, self-directed learning habits.' },
  { name: 'Cross-Functional Collaboration', description: 'Web developers work with designers, backend engineers, product managers, QA, and marketing. Being technically strong AND easy to collaborate with is the career accelerant.' },
  { name: 'Debugging Mindset', description: 'Browser DevTools, server logs, and network traces are your detective toolkit. Methodical debugging — isolate, hypothesize, test — separates senior developers from juniors faster than any framework knowledge.' },
  { name: 'Shipping Discipline', description: 'The best web developers ship. Done and deployed beats perfect and pending. Learn to scope work to completion, iterate fast, and measure real-world impact rather than chasing endless polish.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Computer Science / IT Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(13,148,136,0.2)', bgColor: '#f0fdfa', typeBg: 'rgba(13,148,136,0.12)', typeColor: '#0d9488',
    pros: ['Strong CS and networking fundamentals', 'Recruiter trust and university brand', 'Campus recruitment pipelines', 'Broad peer network'],
    cons: ['Web-specific content is often outdated', 'Slow path to first real web job', 'Lots of theory, limited project depth', 'Self-study required for modern stacks'],
  },
  {
    type: 'Bootcamp', title: 'Full-Stack Web Bootcamp', duration: '3–6 months', cost: 'R50k – R130k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Job-ready skills in months not years', 'Portfolio-first curriculum', 'Career placement & hiring support', 'Cohort accountability and community'],
    cons: ['Program quality varies wildly', 'Can lack CS fundamentals depth', 'Competitive entry-level market', 'Not universally valued by all employers'],
  },
  {
    type: 'Self-Taught', title: 'Online Courses & Open Source', duration: '9–18 months', cost: 'R0 – R6k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['World-class free resources available', 'Build at your own pace', 'Real projects from day one', 'No ceiling — skills speak for themselves'],
    cons: ['Requires extreme self-discipline', 'Easy to skip CS fundamentals', 'Job search is portfolio-driven', 'Imposter syndrome is very real'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Sprint Standup & Planning', desc: 'Sync with the team, review Jira tickets, discuss blockers, and align on the day\'s deliverables across frontend and backend tasks', duration: '30 min', icon: <Eye size={14} /> },
  { time: '9:30', act: 'Feature Development', desc: 'Deep focus block: building new features end-to-end — designing components, writing API routes, wiring database queries, and integrating it all', duration: '2.5 hrs', icon: <Code size={14} /> },
  { time: '12:00', act: 'Code Review & PR Feedback', desc: 'Review teammates\' pull requests, leave constructive feedback, approve or request changes, and merge completed work to staging', duration: '1 hr', icon: <GitBranch size={14} /> },
  { time: '1:00', act: 'Lunch Break', desc: 'Step away completely. Web problems often solve themselves after a proper break and a short walk outside the screen', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Bug Fixing & QA', desc: 'Triage bug reports, reproduce issues in the browser and server logs, apply targeted fixes, and verify on multiple devices', duration: '1 hr', icon: <Shield size={14} /> },
  { time: '3:00', act: 'Client / Product Sync', desc: 'Review requirements, present progress, discuss scope changes, and align on upcoming sprint priorities with stakeholders', duration: '45 min', icon: <Users size={14} /> },
  { time: '3:45', act: 'Learning & Documentation', desc: 'Read MDN, study new browser APIs, write technical documentation, or contribute a small fix to an open source project', duration: '1.25 hrs', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'VS Code', cat: 'IDE' }, { name: 'Chrome DevTools', cat: 'Debug' },
  { name: 'Postman', cat: 'API' }, { name: 'Vercel / Railway', cat: 'Deploy' },
  { name: 'Figma', cat: 'Design' }, { name: 'PostgreSQL', cat: 'Database' },
  { name: 'Docker', cat: 'Containers' }, { name: 'GitHub', cat: 'Version Control' },
]

const WORK_ENVS = [
  { type: 'Remote', pct: 52 },
  { type: 'Hybrid', pct: 34 },
  { type: 'In-Office', pct: 14 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Assisted Full-Stack Development', icon: <Sparkles size={20} />,
    desc: 'GitHub Copilot and Claude write boilerplate API routes, database queries, and frontend components in seconds. Web developers using AI tools ship features 40% faster while maintaining code quality and ownership.',
    tools: ['GitHub Copilot', 'Claude', 'Cursor', 'Codeium'],
    borderColor: 'rgba(13,148,136,0.18)', bgColor: '#f0fdfa', icoBg: 'rgba(13,148,136,0.12)', icoColor: '#0d9488', tagBg: 'rgba(13,148,136,0.1)', tagColor: '#0d9488', titleColor: '#0d9488',
  },
  {
    title: 'AI-Powered Web Builders', icon: <Layout size={20} />,
    desc: 'Tools like Webflow AI, Framer AI, and v0 by Vercel generate production-ready web pages and React components from natural language. Web developers who master these tools can deliver client projects 3× faster.',
    tools: ['Webflow AI', 'Framer AI', 'v0 by Vercel', 'Builder.io AI'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI for Testing & Monitoring', icon: <TrendingUp size={20} />,
    desc: 'AI-powered tools auto-generate end-to-end tests, detect performance regressions, flag accessibility violations, and predict UX drop-off points. Less time writing boilerplate tests, more time shipping quality features.',
    tools: ['Playwright AI', 'Sentry AI', 'Datadog', 'Checkly'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'Edge Computing & Serverless Functions',
  'Web Assembly (WASM)',
  'Progressive Web Apps (PWA)',
  'Real-Time Features with WebSockets',
  'Headless CMS Architecture',
  'Core Web Vitals Optimization',
]

const PROS = [
  { title: 'Broadest Career Opportunities', desc: 'Every business on Earth needs a website. Web developers are hired by startups, enterprises, agencies, NGOs, government, and solo founders alike. Job security is exceptional.' },
  { title: 'Full-Stack Versatility', desc: 'Web development spans frontend, backend, databases, and DevOps. You can choose a specialism or stay full-stack — either path leads to excellent, well-paid career opportunities.' },
  { title: 'High Remote Work Flexibility', desc: '52% of web developer roles are fully remote — one of the highest rates in any career. All you need is a laptop and internet. Many web developers work globally from anywhere on Earth.' },
  { title: 'Fast Path to Employment', desc: 'A motivated, self-taught web developer can be job-ready in 12–18 months. No four-year degree required. A strong portfolio beats a certificate every single time.' },
  { title: 'Freelance & Agency Options', desc: 'Web development is one of the few technical careers with a thriving freelance ecosystem. You can build client websites independently, charge R80k–R200k+ per project, and own your schedule.' },
  { title: 'Immediate, Visible Impact', desc: 'You build things people actually use. Launch a website, send the link, and your work is live for the world to experience. Feedback is immediate, real, and deeply satisfying.' },
]

const CONS = [
  { title: 'Cross-Browser Compatibility', desc: 'What renders beautifully in Chrome may break in Safari. Testing across browsers, devices, and screen sizes adds significant time and is an unavoidable part of professional web work.' },
  { title: 'Broad Skill Surface Area', desc: 'Web development spans HTML, CSS, JavaScript, backend, databases, security, performance, SEO, and DevOps. Staying current across all of it requires constant, disciplined learning.' },
  { title: 'Client Management Complexity', desc: 'Freelance and agency web developers often deal with scope creep, changing requirements, and clients who don\'t understand technical constraints. Communication skills matter as much as coding skills.' },
  { title: 'Security Responsibility', desc: 'XSS, SQL injection, CSRF, broken authentication — web applications are attack surfaces. Senior web developers carry significant responsibility for keeping user data and business systems safe.' },
  { title: 'Framework Fragmentation', desc: 'React, Vue, Angular, Svelte, Astro, Next.js, Nuxt — the JavaScript ecosystem evolves constantly. Making framework choices wisely and resisting hype requires experience and discipline.' },
  { title: 'Performance Expectations', desc: 'Users expect sub-second page loads globally. Delivering that on 3G networks with varied device capabilities requires deep performance expertise that takes years to develop properly.' },
]

const VIDEOS = [
  { id: 'ysEN5RaKOlA', title: 'Web Development Full Course 2025', desc: 'Complete beginner-to-advanced web development guide covering HTML, CSS, JavaScript, React, and backend fundamentals in one comprehensive course.', dur: '12:30:00', channel: 'freeCodeCamp' },
  { id: 'T9ogK8uKD0w', title: 'The Web Developer Roadmap 2025', desc: 'Traversy Media\'s definitive guide to the technologies, tools, and learning order for becoming a professional web developer in 2025 and beyond.', dur: '22:45', channel: 'Traversy Media' },
  { id: 'V74oLC_jHJU', title: 'Full Stack Web Development Bootcamp', desc: 'Build a complete full-stack web application from scratch — React frontend, Node.js backend, PostgreSQL database, and Vercel deployment.', dur: '9:15:00', channel: 'The Odin Project' },
]

const TAKEAWAYS = [
  'HTML, CSS, and JavaScript fundamentals are permanent — master these before touching any framework',
  'Deploy 5+ real projects publicly before applying for jobs — a live URL beats a GitHub repo',
  'Learn the full HTTP request/response cycle deeply — it makes debugging everything faster',
  'Security is not optional — understand OWASP Top 10 vulnerabilities and how to prevent them',
  'Web performance is a business metric — slow websites cost real money in lost conversions',
]

const CAREER_FACTS = [
  {
    icon: <Globe size={20} />, title: 'What You Build',
    desc: 'Websites, web applications, e-commerce stores, SaaS platforms, content management systems, APIs, dashboards, landing pages, and everything else users access through a browser.',
    color: '#0d9488',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Feature development, bug fixing, API integration, database design, performance optimization, code reviews, client communication, deployment, and cross-browser testing.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'UI/UX designers, backend engineers, project managers, clients, QA testers, DevOps engineers, SEO specialists, and marketing teams who all depend on the web experience you build.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'Web developer demand is consistently among the highest of all tech roles. Every business — from corner shops to global enterprises — needs web presence, and that need is only growing.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🌍', title: 'Universal Career', desc: 'Every country, every industry, every company size needs web developers. This is one of the most universally demanded technical skills on the planet.' },
  { emoji: '💰', title: 'Excellent Earnings', desc: 'Senior web developers earn R900k–R1.5M+ in South Africa. Global remote roles in USD pay significantly more. Demand consistently outpaces supply.' },
  { emoji: '🏠', title: 'Remote-Friendly', desc: '52% of web developer roles are fully remote. You can work from Johannesburg, Cape Town, Bali, or Portugal. Your skills travel with you everywhere.' },
  { emoji: '⚡', title: 'Fast Feedback', desc: 'Hit save, hit refresh — your work appears instantly in the browser. This tight feedback loop makes learning and building genuinely satisfying from your very first week.' },
  { emoji: '🔀', title: 'Diverse Specializations', desc: 'Go frontend, backend, full-stack, DevOps, mobile-web, or e-commerce. Web development branches into countless specializations with distinct career paths.' },
  { emoji: '🚀', title: 'Fast Entry Point', desc: 'You can be job-ready in 12–18 months of focused self-study. No four-year degree required. A strong portfolio and deployed projects open doors that credentials cannot.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#0d9488', bgColor: '#f0fdfa', items: [
    { name: 'The Odin Project (free, full curriculum)', url: '#', type: 'Course', rating: 5 },
    { name: 'freeCodeCamp Web Dev Certification', url: '#', type: 'Course', rating: 5 },
    { name: 'MDN Web Docs (comprehensive reference)', url: '#', type: 'Reference', rating: 5 },
    { name: 'Scrimba — Interactive Web Courses', url: '#', type: 'Course', rating: 4 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'Frontend Mentor — Real Projects', url: '#', type: 'Practice', rating: 5 },
    { name: 'Full Stack Open (University of Helsinki)', url: '#', type: 'Course', rating: 5 },
    { name: 'roadmap.sh — Web Dev Roadmap', url: '#', type: 'Resource', rating: 5 },
    { name: 'CSS Tricks — Guides & Almanac', url: '#', type: 'Reference', rating: 4 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'Traversy Media (YouTube)', url: '#', type: 'YouTube', rating: 5 },
    { name: 'Fireship.io — Web Dev Essentials', url: '#', type: 'YouTube', rating: 5 },
    { name: 'r/webdev & r/learnwebdev', url: '#', type: 'Forum', rating: 4 },
    { name: 'web.dev by Google (best practices)', url: '#', type: 'Resource', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Web Developer', range: 'R260k – R450k', midpoint: 355, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Web Developer', range: 'R500k – R900k', midpoint: 700, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Web Developer', range: 'R900k – R1.5M', midpoint: 1200, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Lead / Principal Web Engineer', range: 'R1.5M – R2.6M+', midpoint: 2050, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Learning Frameworks Before Fundamentals',
    desc: 'Jumping straight into React or Next.js without truly understanding HTML, CSS, and vanilla JavaScript. When something breaks, you have no foundation to debug from. Frameworks abstract the web — they don\'t replace it.',
    fix: 'Spend at least 3 months on pure HTML, CSS, and vanilla JavaScript. Build projects without any framework before touching React.',
  },
  {
    num: '02', title: 'Tutorial Hell — Watching Without Building',
    desc: 'Watching 50 hours of YouTube tutorials and building nothing independently. You recognise the syntax but cannot write it from scratch. Passive learning creates the illusion of progress without real skill.',
    fix: 'For every tutorial, rebuild the project from zero without looking. Then build something different using the same concepts.',
  },
  {
    num: '03', title: 'Ignoring Web Security',
    desc: 'Building web apps without understanding SQL injection, XSS, CSRF, and broken authentication. These are not advanced topics — they\'re junior developer responsibilities. Insecure apps get you and your users into serious trouble.',
    fix: 'Study the OWASP Top 10 vulnerabilities. Implement parameterised queries, CSP headers, and input sanitization in every project.',
  },
  {
    num: '04', title: 'No Version Control Discipline',
    desc: 'Committing everything to main with message "fix" or "update". Employers review your commit history. Messy, infrequent, or meaningless commits signal poor professional habits regardless of code quality.',
    fix: 'Use conventional commits. Branch for every feature. Write meaningful commit messages. Practice the PR review workflow even on solo projects.',
  },
  {
    num: '05', title: 'Not Deploying Projects',
    desc: 'Building great projects locally but never deploying them. A project that isn\'t live doesn\'t exist to employers, clients, or your future self. Deployment is part of the job — not a final optional step.',
    fix: 'Deploy every project to Vercel, Railway, or Netlify. Buy a domain (R150/year). Link live URLs in your portfolio and resume.',
  },
  {
    num: '06', title: 'Portfolio Without Real Problems',
    desc: 'Portfolios full of to-do lists, weather apps, and tutorial clones. Recruiters have seen all of these a thousand times. Generic projects signal you can follow instructions, not solve real problems.',
    fix: 'Build one project that solves a problem you genuinely have. Deploy it. Get 20 real users. Write about what you learned building it.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Marketing / Content Creator',
    ease: 'Strong Fit', easeColor: '#0d9488', easeBg: '#f0fdfa',
    desc: 'You understand audiences, messaging, and conversion funnels. Adding web development skills lets you build the tools you already understand. Marketers who code are disproportionately valuable.',
    steps: ['Learn HTML/CSS fundamentals', 'Pick up JavaScript basics', 'Build landing pages and content sites', 'Target marketing-tech companies or agencies'],
  },
  {
    from: 'Graphic / Visual Designer',
    ease: 'Very Natural', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'You already think in layouts, colour, and visual hierarchy. HTML/CSS translates your design skills into the browser. Add JavaScript and a framework — you become a one-person product team.',
    steps: ['Master HTML/CSS from design intent', 'Learn JavaScript interactions', 'Study React component patterns', 'Target design-forward agencies and startups'],
  },
  {
    from: 'Data Analyst / Scientist',
    ease: 'Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'You understand data, logic, and structured problem-solving. Web development adds the layer of building interfaces for that data. Full-stack data visualization is a rare and highly paid specialization.',
    steps: ['Learn HTML/CSS fundamentals', 'JavaScript and D3.js for data viz', 'Pick up React and Node.js basics', 'Build data dashboard projects'],
  },
  {
    from: 'Non-Technical Business / Admin',
    ease: 'Completely Possible', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Many successful web developers started with zero technical background. Business understanding is actually an advantage — you build websites that solve real problems because you understand what businesses actually need.',
    steps: ['Start with HTML/CSS from scratch', 'Follow The Odin Project curriculum', 'Build 3 complete projects', 'Apply for junior roles at 12–18 months'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'HTML & CSS Mastery', color: '#0d9488', bg: '#f0fdfa', days: [
    { day: 'Day 1–2', task: 'Set up VS Code, Chrome DevTools, and Git. Build a semantic HTML page with proper headings, links, and images from scratch.' },
    { day: 'Day 3–4', task: 'CSS Flexbox complete — rebuild 3 real-world layouts: navbar, hero section, and a card grid with responsive columns.' },
    { day: 'Day 5–6', task: 'CSS Grid mastery — responsive dashboard layout, auto-placement, and media queries from mobile-first.' },
    { day: 'Day 7', task: 'Build and deploy a complete personal portfolio website. Push to GitHub. Deploy on Vercel. Share the live URL.' },
  ]},
  { week: 'Week 2', theme: 'JavaScript & APIs', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'JavaScript fundamentals: variables, functions, arrays, objects, loops, conditionals, and DOM manipulation.' },
    { day: 'Day 10–11', task: 'Async JavaScript: Promises, async/await, Fetch API. Call the OpenWeather API and render live data on the page.' },
    { day: 'Day 12–13', task: 'Build an interactive web app: task manager, quiz app, or a GitHub user search tool using a public API.' },
    { day: 'Day 14', task: 'Code review day: clean up your code, add README files, deploy all projects to Vercel with live links.' },
  ]},
  { week: 'Week 3', theme: 'React & Full Stack Intro', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'React foundations: components, JSX, props, useState, and useEffect. Build a multi-component SPA from scratch.' },
    { day: 'Day 17–18', task: 'Node.js and Express basics: build a simple REST API with GET/POST routes and test it using Postman.' },
    { day: 'Day 19–20', task: 'Connect React frontend to your Node.js API. Add a database with SQLite or Supabase for data persistence.' },
    { day: 'Day 21', task: 'Build and deploy a full-stack app: React + Node + database. Live URL on Vercel/Railway. Add it to your portfolio.' },
  ]},
  { week: 'Week 4', theme: 'Polish, Performance & Jobs', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Performance audit: run Lighthouse on all projects. Fix Core Web Vitals issues. Compress images. Lazy load content.' },
    { day: 'Day 25–26', task: 'Security audit: add input validation, CSRF protection, and environment variables. Remove all hardcoded secrets.' },
    { day: 'Day 27–28', task: 'Accessibility pass: WCAG 2.1 compliance, keyboard navigation testing, and semantic HTML audit across all projects.' },
    { day: 'Day 29–30', task: 'Update portfolio, write case studies for each project, update LinkedIn, and submit 10 job applications or client inquiries.' },
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
      try { await navigator.share({ title: 'Web Developer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Web Developer in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/web-developer'}</span>
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
export default function WebDeveloperRoadmapPage() {
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
            src="https://i.imgur.com/YSePX5B.jpeg"
            alt="Web Developer workspace"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.45) brightness(1.08) hue-rotate(160deg)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Globe size={12} /> Web & Internet
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Web Developer
              </h1>
              <span className="block font-normal mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', color: C.textMuted }}>
                Career Roadmap 2026
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><Clock size={14} style={{ color: C.textFaint }} /> 18 min read</div>
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><BookOpen size={14} style={{ color: C.textFaint }} /> 16 sections</div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-8 pt-6 pb-16">
          <p className="text-base leading-relaxed" style={{ color: '#4b5563', maxWidth: 560, marginLeft: 140 }}>
            Build the internet. Web developers create the websites, applications, and digital experiences that billions of people use every day — spanning the full stack from pixel-perfect interfaces to performant, secure backends.
          </p>
          <div className="h-px mt-10" style={{ background: C.border }} />
        </div>
      </div>

      {/* ── TABLE OF CONTENTS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Web Development" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0fdfa', borderColor: 'rgba(13,148,136,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Web Developer</strong> builds and maintains websites and web applications — everything users interact with through a browser. This spans frontend (what users see), backend (servers, databases, logic), and full-stack (both). Web developers use HTML, CSS, and JavaScript as core languages, combined with frameworks, databases, and cloud platforms to ship products used by millions.
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
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={whyRef}>
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Web Development could be your best career move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Web Developer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(13,148,136,0.3)'; (e.currentTarget as HTMLElement).style.background = '#f0fdfa' }}
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
      <section ref={tlSectionRef} className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={tlRef}>
            <SectionHeader icon={<Clock size={22} />} title="Career Timeline" subtitle="Time estimates and salary ranges for each level" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="mb-10">
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → Lead</span></div>
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
          <SectionHeader icon={<Target size={22} />} title="Step-by-Step Roadmap" subtitle="Your path from complete beginner to job-ready web developer" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="relative flex flex-col items-center">
            {ROADMAP_STEPS.map((s, i) => {
              const icons = ['🌐', '⚡', '🔀', '⚛️', '🖥️', '🚀']
              const accentColors = ['#0d9488', '#16a34a', '#0d9488', '#16a34a', '#0d9488', '#16a34a']
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.indigo} 100%)`, boxShadow: '0 8px 48px rgba(13,148,136,0.25)' }}>
              <div className="text-4xl mb-3">🌐</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>12–18 months · Consistent daily practice · Build and deploy real projects</div>
            </div>
          </div>
          
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={skillsRef}>
            <SectionHeader icon={<CheckCircle2 size={22} />} title="Skill Checkpoints" subtitle="Technical and interpersonal skills to develop as a web developer" iconBg={C.indigoLight} iconColor={C.indigo} />
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
            <SectionHeader icon={<GraduationCap size={22} />} title="Education Paths" subtitle="Three routes into web development — pick yours" iconBg="rgba(148,163,184,0.1)" iconColor={C.textMuted} />
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
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Web Development in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0fdfa', borderColor: 'rgba(13,148,136,0.2)', color: C.textMuted }}>
              AI tools are reshaping how web developers work — from generating boilerplate code and writing tests to building entire page layouts from text descriptions. Web developers who master AI-assisted workflows ship faster, maintain higher quality, and take on work that would previously require larger teams.
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
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={pcRef}>
            <SectionHeader icon={<Scale size={22} />} title="Pros & Cons" subtitle="The honest picture of a web development career path" iconBg="rgba(148,163,184,0.1)" iconColor={C.textMuted} />
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially for senior and lead roles — can pay 2–4× these figures in USD for the same quality of work.</p>
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
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 2400) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f0fdfa', borderColor: 'rgba(13,148,136,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> Freelance web developers can earn significantly more per project. A well-positioned web developer building e-commerce stores or SaaS MVPs can charge R80k–R200k per project and work with multiple clients simultaneously.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring web developers" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into web development from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Web Development" iconBg={C.redLight} iconColor={C.red} />
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
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={finalRef}>
            <SectionHeader icon={<Award size={22} />} title="Final Thoughts" subtitle="What we want you to take away from this guide" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 border mb-8" style={{ background: C.bg, borderColor: C.border }}>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#374151' }}>
                Web development is one of the most <strong style={{ color: C.primary }}>accessible, rewarding, and future-proof careers</strong> available today. You don't need a degree. You don't need expensive tools. You need curiosity, consistency, and the willingness to ship imperfect projects and learn from them.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                Every website you use was built by a web developer. Every online store, every SaaS tool, every news site, every portfolio — all of it runs on the skills you're learning right now. The path is clear. The resources are free. The jobs are plentiful. The only variable is whether you start.
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open VS Code and build your first webpage.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
           <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>
            
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start shipping today. Your future self will be proud.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}