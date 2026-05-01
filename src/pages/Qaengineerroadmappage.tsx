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
  primary: '#0d9488',          // teal — QA brand colour
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
    level: 'Junior', title: 'Junior QA Engineer', duration: '0–2 yrs', salary: 'R220k–R400k',
    description: 'Execute manual test cases, log and track bugs, understand the SDLC, and learn exploratory testing under mentorship. Contribute to test plans.',
    skills: ['Manual Testing', 'Bug Tracking', 'Test Cases', 'JIRA'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'QA Engineer', duration: '2–5 yrs', salary: 'R420k–R780k',
    description: 'Own test automation frameworks, design regression suites, perform API and performance testing, and integrate tests into CI/CD pipelines.',
    skills: ['Selenium/Playwright', 'API Testing', 'CI/CD', 'SQL'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior QA Engineer', duration: '5–8 yrs', salary: 'R850k–R1.4M',
    description: 'Architect test strategies, lead automation guilds, define quality standards, mentor junior QAs, and drive shift-left testing culture across engineering.',
    skills: ['Test Architecture', 'Performance Test', 'Security Testing', 'Mentoring'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'QA Lead / Architect', duration: '8+ yrs', salary: 'R1.5M+',
    description: 'Define the quality vision for the entire engineering organisation, drive testing strategy across multiple teams, and own quality metrics at company level.',
    skills: ['Quality Strategy', 'Eng Leadership', 'Observability', 'Coaching'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Software Testing Fundamentals',
    description: 'Master the core concepts of quality assurance: the SDLC, STLC, testing principles, test types (unit, integration, system, acceptance), and the difference between verification and validation. Learn how bugs are found, classified, and tracked.',
    duration: '1–2 months', skills: ['SDLC / STLC', 'Test Types', 'Bug Lifecycle', 'Test Design'],
  },
  {
    step: 2, title: 'Manual Testing & Test Case Design',
    description: 'Learn how to write precise test cases, execute exploratory testing, perform regression testing, and document defects effectively. Master test design techniques: equivalence partitioning, boundary value analysis, and decision tables.',
    duration: '1–2 months', skills: ['Test Case Writing', 'Exploratory Testing', 'Regression Testing', 'JIRA / Zephyr'],
  },
  {
    step: 3, title: 'Programming for Testers - Python or JavaScript',
    description: 'QA engineers who can code unlock a completely different level of impact. Learn Python or JavaScript to write test scripts, interact with APIs, parse responses, and build reusable test utilities. You dont need to be a developer — but you need to be code-literate.',
    duration: '2–3 months', skills: ['Python / JS', 'Functions & OOP', 'File I/O', 'REST Concepts'],
  },
  {
    step: 4, title: 'Test Automation — Selenium, Playwright & Cypress',
    description: 'Automate browser interactions with Playwright or Cypress for web UIs. Learn the Page Object Model for maintainable test code. Write reliable, fast, and parallelisable tests that survive UI changes. Understand when automation adds value and when it doesnt.',
    duration: '2–3 months', skills: ['Playwright / Cypress', 'Selenium WebDriver', 'Page Object Model', 'Test Parallelism'],
  },
  {
    step: 5, title: 'API Testing & Database Validation',
    description: 'Most modern software fails at the API layer. Learn Postman and REST Assured (or requests in Python) for API testing. Write SQL queries to validate that backend operations produce correct database state. Understand JSON, XML, and response schema validation.',
    duration: '1–2 months', skills: ['Postman / REST Assured', 'SQL for Testers', 'JSON Schema', 'Auth Testing'],
  },
  {
    step: 6, title: 'CI/CD, Performance & Security Testing',
    description: 'Integrate your test suites into GitHub Actions or Jenkins CI/CD pipelines so tests run on every commit. Learn k6 or JMeter for performance testing. Understand OWASP basics and how to test for common web vulnerabilities. At this level, QA becomes indistinguishable from engineering excellence.',
    duration: '2–3 months', skills: ['GitHub Actions / Jenkins', 'k6 / JMeter', 'OWASP Testing', 'Shift-Left Quality'],
  },
]

const HARD_SKILLS = [
  { name: 'Manual & Exploratory Testing', level: 95 },
  { name: 'Test Case Design', level: 93 },
  { name: 'Test Automation (Playwright/Cypress)', level: 88 },
  { name: 'API Testing (Postman / REST Assured)', level: 85 },
  { name: 'SQL & Database Validation', level: 80 },
  { name: 'CI/CD Integration', level: 74 },
  { name: 'Performance Testing (k6/JMeter)', level: 68 },
  { name: 'Security & Penetration Testing', level: 58 },
]

const SOFT_SKILLS = [
  { name: 'Quality Mindset', description: 'Great QA engineers dont just find bugs — they think about what could go wrong before code is even written. This adversarial, curious mindset is the foundation of everything else.' },
  { name: 'Attention to Detail', description: 'The defect that ships to production is the one nobody noticed was a defect. Edge cases, boundary values, unexpected inputs — a QA engineer notices what everyone else ignores.' },
  { name: 'Communication & Bug Advocacy', description: 'A bug report is only as valuable as it is clear. The ability to describe a defect precisely, reproduce it reliably, and communicate its impact to a developer and product manager is an underrated professional skill.' },
  { name: 'Analytical Thinking', description: 'Break down complex user journeys into testable conditions. Identify coverage gaps before they become production failures. Think systematically about risk and prioritise testing effort accordingly.' },
  { name: 'Collaboration in Agile Teams', description: 'QA engineers who wait until the end of the sprint to test are a bottleneck. The best QAs are embedded in planning, refine acceptance criteria early, and test continuously throughout the sprint.' },
  { name: 'Continuous Learning', description: 'Test tooling evolves rapidly — Playwright displaced Selenium in three years. QA engineers who stop learning become technical debt. The best ones are perpetually curious about new automation approaches.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Computer Science / IT Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(13,148,136,0.2)', bgColor: '#f0fdfa', typeBg: 'rgba(13,148,136,0.12)', typeColor: '#0d9488',
    pros: ['Deep CS fundamentals', 'Respected credential at enterprise companies', 'Access to internship pipelines', 'Strong peer network'],
    cons: ['Rarely covers test automation directly', 'Slow and expensive path', 'QA-specific skills largely self-taught', 'Light on real agile workflow exposure'],
  },
  {
    type: 'Bootcamp', title: 'QA / SDET Bootcamp', duration: '3–6 months', cost: 'R50k – R120k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Job-ready automation skills fast', 'Portfolio projects on exit', 'Career support included', 'Cohort accountability'],
    cons: ['Variable programme quality', 'Credential not universally respected', 'Rarely covers CS depth', 'Competitive junior market entry'],
  },
  {
    type: 'Self-Taught', title: 'Online Courses & Projects', duration: '8–18 months', cost: 'R0 – R6k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['Excellent free content available', 'Learn at your own pace', 'Build a real automation portfolio', 'ISTQB certification as credential'],
    cons: ['Requires strong self-discipline', 'Easy to have dangerous gaps', 'No formal credential on CV initially', 'Imposter syndrome is real'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Standup & Sprint Review', desc: 'Sync with developers on what shipped overnight, review new acceptance criteria, and identify what needs test coverage today', duration: '30 min', icon: <GitBranch size={14} /> },
  { time: '9:30', act: 'Exploratory & Manual Testing', desc: 'Deep exploratory sessions on new features — probing edge cases, negative flows, and boundary conditions that no automated test covers', duration: '2 hrs', icon: <Monitor size={14} /> },
  { time: '11:30', act: 'Automation Suite Development', desc: 'Write new automated tests for features approved by the team, refactor flaky tests, update Page Object Models after UI changes', duration: '1.5 hrs', icon: <Terminal size={14} /> },
  { time: '1:00', act: 'Lunch & Recovery', desc: 'Step away from the test suite. Fresh eyes catch more bugs than exhausted ones. Quality of testing declines with mental fatigue.', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Bug Reporting & Collaboration', desc: 'Write precise, reproducible bug reports. Pair with developers to reproduce tricky defects, clarify acceptance criteria, and review test plans', duration: '1 hr', icon: <FileText size={14} /> },
  { time: '3:00', act: 'CI Pipeline & Test Maintenance', desc: 'Review CI test results, investigate pipeline failures, fix flaky tests, update test data, and ensure the automation suite stays healthy', duration: '1.5 hrs', icon: <Shield size={14} /> },
  { time: '4:30', act: 'Learning & Community', desc: 'Read the Ministry of Testing blog, experiment with a new automation tool, study for ISTQB, or contribute to open-source testing projects', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Playwright / Cypress', cat: 'UI Automation' }, { name: 'Postman', cat: 'API Testing' },
  { name: 'JIRA / Zephyr', cat: 'Test Management' }, { name: 'GitHub Actions', cat: 'CI/CD' },
  { name: 'k6 / JMeter', cat: 'Performance' }, { name: 'Selenium WebDriver', cat: 'Browser Automation' },
  { name: 'BrowserStack', cat: 'Cross-Browser' }, { name: 'Allure', cat: 'Reporting' },
]

const WORK_ENVS = [
  { type: 'Remote', pct: 52 },
  { type: 'Hybrid', pct: 36 },
  { type: 'In-Office', pct: 12 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Assisted Test Generation', icon: <Sparkles size={20} />,
    desc: 'GitHub Copilot and Claude generate test cases from user stories, write automation scripts, and suggest edge cases. QA engineers using AI assistants report 40–60% productivity gains on test authoring and coverage analysis.',
    tools: ['GitHub Copilot', 'Claude', 'Testim AI', 'Mabl'],
    borderColor: 'rgba(13,148,136,0.18)', bgColor: '#f0fdfa', icoBg: 'rgba(13,148,136,0.12)', icoColor: '#0d9488', tagBg: 'rgba(13,148,136,0.1)', tagColor: '#0d9488', titleColor: '#0d9488',
  },
  {
    title: 'Self-Healing Test Automation', icon: <Zap size={20} />,
    desc: 'AI-powered testing platforms like Testim, Mabl, and Healenium automatically heal broken locators when the UI changes — reducing maintenance burden and keeping automation suites green without manual intervention.',
    tools: ['Testim', 'Mabl', 'Healenium', 'Functionize'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI-Powered Test Analytics', icon: <TrendingUp size={20} />,
    desc: 'AI tools now analyse test results for flakiness patterns, predict which tests are most likely to catch a given change, and surface risk areas in the codebase. Use them to run smarter, faster test suites with less maintenance.',
    tools: ['Sentry AI', 'Datadog', 'ReportPortal AI', 'Launchable'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'AI Test Generation (Copilot, Claude)', 'Visual Regression Testing (Percy)',
  'Contract Testing (Pact)', 'Chaos Engineering Basics',
  'Accessibility Testing (axe-core)', 'Shift-Left Security (SAST/DAST)',
]

const PROS = [
  { title: 'The Guardian of Product Quality', desc: 'QA engineers are the last line of defence before a bug reaches a user. The pride of shipping a reliable, polished product rests significantly on the QA team\'s shoulders.' },
  { title: 'Remote-Friendly Role', desc: 'QA engineering has no physical dependency. A large proportion of QA roles are hybrid or fully remote, with global companies actively hiring remote QA engineers from South Africa.' },
  { title: 'Clear Automation Career Path', desc: 'QA engineers who master automation evolve into SDETs (Software Development Engineers in Test) — a role that commands developer-level salaries and demands genuine engineering skill.' },
  { title: 'In Demand Across Every Industry', desc: 'Every company that ships software needs QA. From healthcare to fintech to e-commerce — the demand for quality engineers is universal, recession-resilient, and global.' },
  { title: 'Great Entry Point into Tech', desc: 'QA is one of the most accessible entry points into the tech industry. Strong analytical skills and attention to detail matter more than a CS degree, especially for manual testing roles.' },
  { title: 'Unique Business Impact', desc: 'A single critical bug in production can cost millions. QA engineers directly protect company revenue, user trust, and brand reputation — the ROI of great QA is measurable and significant.' },
]

const CONS = [
  { title: 'Undervalued in Some Cultures', desc: 'In engineering teams that don\'t have a quality culture, QA can feel like a second-class citizen. Finding teams that genuinely respect testing is important for long-term job satisfaction.' },
  { title: 'Automation Debt is Exhausting', desc: 'Maintaining a large, flaky automation suite is demoralising. Flaky tests erode team trust in automation, and fixing them is unglamorous but essential work.' },
  { title: 'Blamed for Escaped Defects', desc: 'When a bug ships to production, QA is often the first team questioned — even if the root cause was inadequate unit tests or poor requirements clarity. The blame can be unfair.' },
  { title: 'Constant Context Switching', desc: 'Testing multiple features simultaneously, while managing automation maintenance and supporting developers with reproduction steps, demands significant mental load management.' },
  { title: 'Tooling Churn', desc: 'The test automation landscape changes fast — Playwright emerged and displaced Selenium in years, not decades. QA engineers must continuously re-learn tools or risk becoming stale.' },
  { title: 'Scope Can Feel Unbounded', desc: 'The definition of "done" in QA is fuzzy. There is always more test coverage to add, more edge cases to explore, and more risk to mitigate. Without strong scope management, QA becomes a bottleneck.' },
]

const VIDEOS = [
  { id: 'ztMr3JCVhRk', title: 'Complete QA Testing Course 2025', desc: 'A comprehensive introduction to software quality assurance — manual testing, test case design, bug reporting, and the full QA workflow for beginners.', dur: '6:02:15', channel: 'freeCodeCamp' },
  { id: 'JM-o-ORvEp8', title: 'Playwright Automation Full Course', desc: 'Learn modern browser test automation with Microsoft Playwright — from setup to parallel execution, CI integration, and Page Object Model patterns.', dur: '3:14:22', channel: 'Traversy Media' },
  { id: 'VqTiu-2MOrQ', title: 'API Testing with Postman — Full Guide', desc: 'Master API testing from basics to advanced: collections, environments, Newman CLI, and integrating Postman tests into CI/CD pipelines.', dur: '2:08:40', channel: 'TechWorld with Nana' },
]

const TAKEAWAYS = [
  'Test automation is only valuable if it is maintained — an ignored, flaky suite is worse than no automation at all',
  'Shift left: the earlier you find a defect, the cheaper it is to fix — get involved in requirements and design, not just code review',
  'Learn to code: QA engineers who automate fluently earn developer-level salaries and command respect across the engineering team',
  'ISTQB Foundation certification is the global standard — it validates your testing knowledge and opens doors at enterprise employers',
  'Measure your quality: track defect escape rate, test coverage, and automation ROI — data-driven QA gets invested in and promoted',
]

/* ─── NEW SECTIONS ────────────────────────────────────────────────────────── */

const CAREER_FACTS = [
  {
    icon: <Shield size={20} />, title: 'What You Build',
    desc: 'Comprehensive test plans, automated regression suites, API test collections, performance benchmarks, CI/CD quality gates, bug report repositories, and the testing infrastructure that keeps products reliable.',
    color: '#0d9488',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Manual and exploratory testing, test case authoring, automation framework development, CI/CD integration, performance benchmarking, security validation, and production incident root-cause analysis.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Backend and frontend developers whose code you test, product managers who define acceptance criteria, DevOps engineers who run pipelines, and stakeholders who depend on reliable release cycles.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'QA engineering demand grew 24% in 2024. Every team shipping software needs quality assurance. The transition from manual to automation testing has created a significant skills gap that benefits automation-capable QA engineers.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🛡️', title: 'You Are the Last Line of Defence', desc: 'Before a bug reaches a million users, it reaches you. QA engineers directly protect the user experience, brand reputation, and in regulated industries, legal compliance.' },
  { emoji: '💰', title: 'Automation Engineers Earn Developer Salaries', desc: 'Senior SDETs (Software Development Engineers in Test) earn R850k–R1.4M+ in South Africa. Automation-capable QA engineers are in exceptionally high demand.' },
  { emoji: '🌍', title: 'Remote Roles are Common', desc: 'QA engineering has no location dependency. Global companies regularly hire South African QA engineers on USD contracts for fully remote test automation roles.' },
  { emoji: '🔍', title: 'Great Entry Point into Tech', desc: 'Strong analytical thinking and attention to detail matter more than a CS degree for junior QA roles. It\'s one of the most accessible paths into a tech engineering career.' },
  { emoji: '📈', title: 'Clear Path to SDET and Beyond', desc: 'QA Engineer → SDET → Senior SDET → QA Architect is a well-defined, financially rewarding path. Code-literate QA engineers advance into engineering leadership naturally.' },
  { emoji: '🧩', title: 'Every Day is a Puzzle', desc: 'Finding the one edge case that breaks a system is a genuinely satisfying intellectual challenge. The adversarial creativity of great testing is unlike any other engineering discipline.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#0d9488', bgColor: '#f0fdfa', items: [
    { name: 'Ministry of Testing — Free Learning Path', url: '#', type: 'Course', rating: 5 },
    { name: 'Playwright Official Docs & Tutorials', url: '#', type: 'Docs', rating: 5 },
    { name: 'Test Automation University (Applitools)', url: '#', type: 'Course', rating: 5 },
    { name: 'freeCodeCamp — QA Certification', url: '#', type: 'Course', rating: 4 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'The-Internet (Heroku) — Automation Practice', url: '#', type: 'Practice', rating: 5 },
    { name: 'DemoQA — Element Testing Practice Site', url: '#', type: 'Practice', rating: 4 },
    { name: 'roadmap.sh — QA Engineer Path', url: '#', type: 'Reference', rating: 5 },
    { name: 'ISTQB Foundation Syllabus (free PDF)', url: '#', type: 'Reference', rating: 5 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'Ministry of Testing Community', url: '#', type: 'Forum', rating: 5 },
    { name: 'r/QualityAssurance subreddit', url: '#', type: 'Forum', rating: 4 },
    { name: 'Testing Peers Podcast', url: '#', type: 'Podcast', rating: 5 },
    { name: 'Automation Step by Step (YouTube)', url: '#', type: 'YouTube', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior QA Engineer', range: 'R220k – R400k', midpoint: 310, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'QA Engineer', range: 'R420k – R780k', midpoint: 600, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior QA / SDET', range: 'R850k – R1.4M', midpoint: 1125, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'QA Lead / Architect', range: 'R1.5M – R2.5M+', midpoint: 2000, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Only Testing the Happy Path',
    desc: 'Writing test cases that only verify what should work misses the point. Production bugs almost always live in edge cases, boundary values, and error flows that nobody thought to test.',
    fix: 'For every positive test case, write at least two negative ones. What happens with empty input? Invalid data? Expired sessions? Network failure?',
  },
  {
    num: '02', title: 'Building a Fragile Automation Suite',
    desc: 'Tests that rely on hard-coded waits, brittle CSS selectors, and no structure break constantly. A flaky test suite destroys team trust in automation faster than anything.',
    fix: 'Implement the Page Object Model from day one. Use data-testid attributes for selectors. Replace all Thread.sleep() with proper explicit waits.',
  },
  {
    num: '03', title: 'Testing Too Late in the Cycle',
    desc: 'Waiting until code is "done" to start testing means bugs are expensive to fix and releases are delayed. Late testing makes QA the bottleneck and strains developer relationships.',
    fix: 'Join sprint planning, review acceptance criteria before development starts, and write test cases during development — not after.',
  },
  {
    num: '04', title: 'Writing Vague Bug Reports',
    desc: 'A bug report that says "it doesn\'t work" is useless. Developers can\'t reproduce it, product managers can\'t prioritise it, and it gets closed as "cannot reproduce."',
    fix: 'Every bug report must include: exact steps to reproduce, expected vs actual behaviour, environment details, screenshots or screen recordings, and severity/priority assessment.',
  },
  {
    num: '05', title: 'Avoiding Automation Because "Manual is Safer"',
    desc: 'Manual regression testing at scale is unsustainable. Companies that rely entirely on manual QA become unable to release quickly — and QA engineers who can\'t automate become unemployable.',
    fix: 'Start automating your most-run regression tests immediately. Even 20% automation coverage of critical paths dramatically improves release confidence.',
  },
  {
    num: '06', title: 'Ignoring Performance and Security Testing',
    desc: 'Functional testing alone is insufficient. An app that works but crashes under load, or passes functional tests but leaks user data, is a product failure regardless of test pass rates.',
    fix: 'Add at least one performance test scenario to every major feature. Review OWASP Top 10 and include security-relevant test cases in every API test suite.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Manual Tester (Non-Tech)',
    ease: 'Natural Fit', easeColor: '#0d9488', easeBg: '#f0fdfa',
    desc: 'You already understand testing principles and the bug lifecycle. Adding automation skills — Python or JavaScript plus Playwright — transforms you from a manual tester into an SDET and dramatically increases your earning potential.',
    steps: ['Learn Python fundamentals (variables, functions, loops)', 'Write your first Playwright automation script', 'Automate your existing manual regression suite', 'Target SDET or automation-focused QA roles'],
  },
  {
    from: 'Developer / Frontend Engineer',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'You already write code and understand the system being tested. Add testing mindset, test design techniques, and framework-specific tooling — and you can transition into a senior SDET role with less effort than most.',
    steps: ['Study ISTQB Foundation test design techniques', 'Learn Playwright and write tests for your own apps', 'Add API and performance testing to your skill set', 'Target senior SDET or QA architect roles'],
  },
  {
    from: 'Business Analyst / Product Manager',
    ease: 'Very Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'You deeply understand requirements, user journeys, and acceptance criteria — critical ingredients for great testing. Add technical testing skills and you become a uniquely valuable QA engineer who bridges business and engineering.',
    steps: ['Learn manual testing and test case design formally', 'Get ISTQB Foundation certified', 'Learn basic automation (Playwright or Cypress)', 'Target QA roles at companies in your domain expertise'],
  },
  {
    from: 'Other Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Domain expertise is a genuine QA superpower. A QA engineer who understands healthcare workflows, financial regulations, or logistics processes can find hidden bugs that a generalist engineer would never discover.',
    steps: ['Start with ISTQB Foundation syllabus and certification', 'Practice on public testing sites (DemoQA, The-Internet)', 'Build automation skills with Playwright tutorials', 'Target QA roles in your previous industry vertical'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Testing Fundamentals', color: '#0d9488', bg: '#f0fdfa', days: [
    { day: 'Day 1–2', task: 'Study SDLC and STLC. Understand the difference between verification and validation. Map the seven testing principles from ISTQB.' },
    { day: 'Day 3–4', task: 'Learn test case design techniques: equivalence partitioning, boundary value analysis, and decision table testing.' },
    { day: 'Day 5–6', task: 'Set up JIRA free tier. Create a test project. Write 10 test cases for a simple login form — positive and negative.' },
    { day: 'Day 7', task: 'Perform exploratory testing on any live website (e.g. a public e-commerce site). Log 5 real bugs with full reproduction steps.' },
  ]},
  { week: 'Week 2', theme: 'Automation Foundations', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Install Node.js and Playwright. Run the official getting-started tutorial. Inspect DOM selectors with browser dev tools.' },
    { day: 'Day 10–11', task: 'Automate a login flow on a practice site. Use data-testid attributes. Add assertions on URL, text, and elements.' },
    { day: 'Day 12–13', task: 'Implement the Page Object Model for your test suite. Refactor your existing tests to use POM structure.' },
    { day: 'Day 14', task: 'Run tests in headed and headless mode. Generate an Allure HTML report. Push everything to GitHub.' },
  ]},
  { week: 'Week 3', theme: 'API & Database Testing', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Install Postman. Test a public REST API (JSONPlaceholder or Reqres.in). Write tests for GET, POST, PUT, DELETE endpoints.' },
    { day: 'Day 17–18', task: 'Add environment variables and collection-level pre-request scripts. Chain requests using variables from previous responses.' },
    { day: 'Day 19–20', task: 'Set up a local PostgreSQL instance. Write SQL queries to validate that API operations create/update the correct database state.' },
    { day: 'Day 21', task: 'Run your Postman collection via Newman CLI. Export the HTML report. Practice explaining your API test strategy aloud.' },
  ]},
  { week: 'Week 4', theme: 'CI/CD & Ship', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Set up GitHub Actions workflow. Run your Playwright test suite on every push. Fix any environment-dependent failures.' },
    { day: 'Day 25–26', task: 'Add a basic k6 performance test for one API endpoint. Capture p95 response time. Set a pass/fail threshold.' },
    { day: 'Day 27–28', task: 'Write a project README with architecture diagram, tech stack, and test coverage summary. Record a short demo video.' },
    { day: 'Day 29–30', task: 'Share project on LinkedIn. Register for ISTQB Foundation exam. Apply to 5 QA or SDET roles. Update CV with GitHub link.' },
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
      try { await navigator.share({ title: 'QA Engineer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a QA Engineer in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/qa-engineer'}</span>
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
export default function QAEngineerRoadmapPage() {
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
            src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1600&auto=format&fit=crop&q=80"
            alt="QA Engineer testing software"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Shield size={12} /> Quality & Testing
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                QA Engineer
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
            Protect the product that users love. QA Engineers design the testing strategies, automation frameworks, and quality gates that ensure software ships reliably, securely, and on time — every sprint, every release.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of QA Engineering" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0fdfa', borderColor: 'rgba(13,148,136,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>QA Engineer</strong> is the guardian of software quality. They design and execute testing strategies that prevent bugs from reaching users, build automation frameworks that provide rapid feedback to development teams, and champion a culture of quality that spans the entire software delivery lifecycle. In modern engineering, great QA is inseparable from great engineering.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons QA Engineering could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical QA Engineer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
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
      <section ref={tlSectionRef} className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={tlRef}>
            <SectionHeader icon={<Clock size={22} />} title="Career Timeline" subtitle="Time estimates and salary ranges for each level" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="mb-10">
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → QA Architect</span></div>
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
              const icons = ['📋', '🔍', '🐍', '🤖', '🔌', '🚀']
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
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>8–14 months · Consistent daily practice · Build and ship real test projects</div>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming QA Engineering in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0fdfa', borderColor: 'rgba(13,148,136,0.2)', color: C.textMuted }}>
              AI tools don't replace QA engineers — they <em style={{ color: C.primary }}>amplify</em> them. Engineers who integrate AI-assisted test generation and self-healing automation into their workflow ship more coverage with less maintenance — freeing time for the adversarial, creative testing that machines can't replicate.
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially for senior SDET and QA Architect roles — can pay 2–4× these figures in USD.</p>
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
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 2500) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f0fdfa', borderColor: 'rgba(13,148,136,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> SDETs at product-led companies (fintech, SaaS, cloud) earn 30–50% more than QA engineers at agencies. Automation-capable QA engineers in regulated industries (healthcare, finance) command significant premiums.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring QA engineers" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into QA engineering from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in QA Engineering" iconBg={C.redLight} iconColor={C.red} />
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
                QA engineering is <strong style={{ color: C.primary }}>the conscience of every engineering team</strong>. Great QA engineers don't just find bugs — they prevent them, by shaping requirements, challenging assumptions, and building the automated safety nets that let teams ship with confidence.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The path from manual tester to automation architect is one of the most rewarding in all of tech. The engineers who learn to code, think adversarially, and build trustworthy test infrastructure are indispensable — in any economy, at any company.
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open your browser, find a site to test, and write your first bug report.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
           <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>
           
            
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start testing today. Your future self will thank you.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}