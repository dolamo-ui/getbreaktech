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
  Activity, Monitor, Lightbulb,
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
  primary: '#059669',
  primaryLight: 'rgba(5,150,105,0.08)',
  primaryMid: 'rgba(5,150,105,0.15)',
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
    level: 'Junior', title: 'Junior SRE', duration: '0–2 yrs', salary: 'R500k–R900k',
    description: 'Support the SRE team with monitoring setup, alert configuration, and incident response. Learn SLOs, error budgets, and deployment processes under mentorship. Build observability fundamentals.',
    skills: ['Monitoring Setup', 'Linux Basics', 'Alert Config', 'Incident Response'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Site Reliability Engineer', duration: '2–5 yrs', salary: 'R1.1M–R1.9M',
    description: 'Own service reliability end-to-end. Design SLOs, respond to incidents, improve MTTR, build automation tools, and mentor juniors. Balance reliability with deployment velocity.',
    skills: ['SLO Design', 'Incident Mgmt', 'Observability', 'Automation'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
  {
    level: 'Senior', title: 'Senior SRE / Lead', duration: '5–8 yrs', salary: 'R1.9M–R3M',
    description: 'Lead reliability initiatives across services. Define SRE practices, design reliability architecture, drive cultural change toward reliability, and shape incident response processes organisation-wide.',
    skills: ['Reliability Arch', 'Team Leadership', 'Strategy', 'Postmortems'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Principal', title: 'Principal SRE / VP', duration: '8+ yrs', salary: 'R3M–R5M+',
    description: 'Define organisation-wide reliability strategy and SRE culture. Lead SRE teams, shape infrastructure decisions, and influence company reliability standards at the executive level.',
    skills: ['Org Strategy', 'Exec Influence', 'Reliability Vision', 'Hiring'],
    accent: '#dc2626', accentBg: 'rgba(220,38,38,0.08)', accentBorder: 'rgba(220,38,38,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Linux, Networking & Systems Fundamentals',
    description: 'SRE is built on deep systems knowledge. Master Linux administration — file systems, processes, permissions, systemd, cron. Learn TCP/IP, DNS, HTTP, load balancing, and how packets move through networks. These fundamentals determine your ceiling in every SRE interview.',
    duration: '2–3 months', skills: ['Linux Admin', 'TCP/IP & DNS', 'Shell Scripting', 'Networking Basics'],
  },
  {
    step: 2, title: 'Programming — Python & Go',
    description: 'SREs automate everything. Python is essential for scripting, tooling, and monitoring integrations. Go is increasingly the language of infrastructure tooling (Kubernetes, Prometheus, Terraform are all Go). Learn one deeply, then add the other. Write scripts that replace manual toil from week one.',
    duration: '2–3 months', skills: ['Python 3', 'Go Basics', 'Automation Scripts', 'CLI Tools'],
  },
  {
    step: 3, title: 'Observability — Monitoring, Logging & Tracing',
    description: 'You cannot improve what you cannot see. Master the three pillars: metrics (Prometheus, Grafana), logging (ELK Stack, Loki), and distributed tracing (Jaeger, Tempo). Learn to design effective dashboards, write alert rules, and correlate signals across systems during incidents.',
    duration: '2–3 months', skills: ['Prometheus', 'Grafana', 'ELK Stack', 'Distributed Tracing'],
  },
  {
    step: 4, title: 'Incident Management & SLOs',
    description: 'SRE lives and dies by error budgets. Learn to define Service Level Indicators (SLIs), set Service Level Objectives (SLOs), and calculate error budgets. Master incident response: on-call rotations, runbooks, blameless postmortems, and root cause analysis. This is the intellectual core of SRE.',
    duration: '1–2 months', skills: ['SLI/SLO/SLA', 'Error Budgets', 'On-Call', 'Postmortems'],
  },
  {
    step: 5, title: 'Containers, Kubernetes & Infrastructure-as-Code',
    description: 'Modern SRE is inseparable from container orchestration. Master Docker deeply, then Kubernetes — pods, deployments, services, ingress, autoscaling, and resource limits. Learn Terraform for infrastructure-as-code and Helm for Kubernetes package management. Deploy and manage production clusters.',
    duration: '3–4 months', skills: ['Docker', 'Kubernetes', 'Terraform', 'Helm'],
  },
  {
    step: 6, title: 'Chaos Engineering, Performance & Reliability Architecture',
    description: 'Senior SRE work is about designing systems that survive failure. Study chaos engineering (Chaos Monkey, LitmusChaos), load testing (k6, Locust), database reliability, and distributed systems theory — CAP theorem, eventual consistency, circuit breakers. Run game days and failure injection exercises.',
    duration: '3–4 months', skills: ['Chaos Engineering', 'Load Testing', 'Distributed Systems', 'Reliability Design'],
  },
]

const HARD_SKILLS = [
  { name: 'Linux & Systems Administration', level: 95 },
  { name: 'Observability (Prometheus / Grafana)', level: 92 },
  { name: 'Kubernetes & Container Orchestration', level: 90 },
  { name: 'Incident Response & Postmortems', level: 88 },
  { name: 'Python / Go Scripting & Automation', level: 85 },
  { name: 'Infrastructure-as-Code (Terraform)', level: 80 },
  { name: 'Chaos Engineering & Load Testing', level: 72 },
  { name: 'Distributed Systems & Architecture', level: 68 },
]

const SOFT_SKILLS = [
  { name: 'Calm Under Pressure', description: 'Production is down and hundreds of thousands of users are affected. The SRE\'s value is measured by how clearly they think when the heat is highest. Panic is the enemy — method and calm are the tools.' },
  { name: 'Blameless Culture Mindset', description: 'Great SREs run postmortems that improve systems, not ones that assign blame. They understand that complex systems fail in complex ways and that psychological safety enables faster learning.' },
  { name: 'Toil Elimination Instinct', description: 'Any manual, repetitive, automatable task is toil — and toil is the enemy of reliability. The best SREs are deeply uncomfortable with repetitive manual work and driven to eliminate it permanently.' },
  { name: 'Cross-Functional Influence', description: 'SREs must convince product and development teams to invest in reliability even when it competes with features. Communicating error budgets and SLOs in business language is a core professional skill.' },
  { name: 'Deep Root Cause Curiosity', description: 'Surface-level fixes are not SRE work. The drive to understand why a system behaved unexpectedly — following the chain of causality until it reaches the actual root — separates great SREs from reactive ones.' },
  { name: 'Documentation Discipline', description: 'Runbooks, playbooks, architecture diagrams, and postmortem reports are the institutional memory that make on-call survivable. SREs who document well reduce mean time to recovery for their entire team.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Computer Science / Engineering Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(5,150,105,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(5,150,105,0.12)', typeColor: '#059669',
    pros: ['Deep algorithms, OS, networking & compilers', 'High credibility at large tech companies', 'Access to internship pipelines and graduate programmes', 'Strong peer network of future engineers'],
    cons: ['Slow and expensive path to first job', 'Often teaches outdated tooling', 'Light on SRE-specific skills: Kubernetes, Terraform, chaos engineering', 'SLOs, error budgets, and observability largely self-taught'],
  },
  {
    type: 'Bootcamp', title: 'DevOps / SRE Bootcamp', duration: '3–6 months', cost: 'R60k – R150k',
    borderColor: 'rgba(234,88,12,0.2)', bgColor: '#fff7ed', typeBg: 'rgba(234,88,12,0.12)', typeColor: '#ea580c',
    pros: ['Hands-on Kubernetes, Terraform, and monitoring fast', 'Portfolio of practical infrastructure projects on exit', 'Career support and employer networks', 'Structured, cohort-based accountability'],
    cons: ['Highly variable programme quality', 'Credential not universally respected', 'Rarely covers deep systems or distributed systems theory', 'Competitive entry into junior SRE market'],
  },
  {
    type: 'Self-Taught', title: 'Certifications & Projects', duration: '12–24 months', cost: 'R5k – R30k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['CKA, AWS Solutions Architect, Google SRE certs are respected', 'Build real infrastructure and monitor real systems from day one', 'Learn at your own pace', 'No ceiling on what you can learn'],
    cons: ['Requires exceptional self-discipline', 'Easy to have dangerous knowledge gaps under pressure', 'No formal credential competes poorly at large companies', 'Imposter syndrome is real and common'],
  },
]

const SCHEDULE = [
  { time: '8:00', act: 'Overnight Review & Health Check', desc: 'Review overnight alerts, check if any on-call issues arose, review key metrics dashboards for anomalies before the team arrives.', duration: '30 min', icon: <Monitor size={14} /> },
  { time: '8:30', act: 'Team Sync & Planning', desc: 'Discuss reliability goals, ongoing incidents, error budget status, metrics improvement targets, and team priorities for the day.', duration: '30 min', icon: <Users size={14} /> },
  { time: '9:00', act: 'SRE Project Work', desc: 'Build reliability improvements — automation tools, monitoring enhancements, postmortem action items, runbook rewrites, or new SLO definitions.', duration: '2.5 hrs', icon: <Code size={14} /> },
  { time: '11:30', act: 'Incident Investigation', desc: 'Analyse recent incidents, gather context from logs and traces, build root cause analysis, prepare postmortem reports for team review.', duration: '1 hr', icon: <AlertTriangle size={14} /> },
  { time: '12:30', act: 'Lunch Break', desc: 'Step away from dashboards. SRE work is intense — mental recovery is as important as technical skill.', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '1:30', act: 'Reliability Consultation', desc: 'Work with product and engineering teams on scaling strategies, deployment safety, capacity planning, and incident prevention.', duration: '1.5 hrs', icon: <Lightbulb size={14} /> },
  { time: '3:00', act: 'Monitoring & Documentation', desc: 'Improve alert signal-to-noise ratio, write runbooks for failure scenarios, update playbooks, and document architecture decisions.', duration: '1 hr', icon: <FileText size={14} /> },
  { time: '4:00', act: 'Learning & Skill Development', desc: 'Read incident reports from Stripe, Cloudflare, or AWS, study distributed systems theory, or experiment with chaos engineering tools.', duration: '1 hr', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Prometheus', cat: 'Metrics' }, { name: 'Grafana', cat: 'Dashboards' },
  { name: 'ELK Stack', cat: 'Logging' }, { name: 'Jaeger', cat: 'Tracing' },
  { name: 'PagerDuty', cat: 'Alerting' }, { name: 'Kubernetes', cat: 'Orchestration' },
  { name: 'Terraform', cat: 'IaC' }, { name: 'Chaos Monkey', cat: 'Chaos Eng' },
]

const WORK_ENVS = [
  { type: 'Fully Remote', pct: 45 },
  { type: 'Hybrid', pct: 40 },
  { type: 'In-Office', pct: 15 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Powered Anomaly Detection', icon: <Sparkles size={20} />,
    desc: 'ML models detect anomalies hours before they escalate into incidents. Tools like Datadog\'s Watchdog and New Relic\'s Applied Intelligence surface patterns in millions of metrics that no human team could monitor manually — reducing MTTR by 40–60%.',
    tools: ['Datadog AI', 'New Relic AI', 'Prophet', 'Anomalo'],
    borderColor: 'rgba(5,150,105,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(5,150,105,0.12)', icoColor: '#059669', tagBg: 'rgba(5,150,105,0.1)', tagColor: '#059669', titleColor: '#059669',
  },
  {
    title: 'Intelligent Incident Response', icon: <Zap size={20} />,
    desc: 'AI assistants trained on postmortem history suggest remediation steps in real-time during incidents. Auto-remediation scripts triggered by AI classification resolve 20–30% of common incidents without human intervention.',
    tools: ['PagerDuty ML', 'Opsgenie AI', 'Blameless AI', 'Moogsoft'],
    borderColor: 'rgba(234,88,12,0.18)', bgColor: '#fff7ed', icoBg: 'rgba(234,88,12,0.12)', icoColor: '#ea580c', tagBg: 'rgba(234,88,12,0.1)', tagColor: '#ea580c', titleColor: '#ea580c',
  },
  {
    title: 'Capacity Planning & Cost Optimisation', icon: <TrendingUp size={20} />,
    desc: 'ML predicts capacity needs days in advance, optimises resource allocation in Kubernetes clusters, and identifies idle resources that inflate cloud bills. SREs using AI capacity tools report 25–40% reductions in cloud spend.',
    tools: ['Kubecost', 'Cloudability', 'CAST AI', 'Harness CCM'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
]

const FUTURE_SKILLS = [
  'eBPF for Deep System Observability', 'OpenTelemetry & Unified Signals',
  'AI-Assisted Incident Classification', 'Platform Engineering & Internal Developer Platforms',
  'WebAssembly in Infrastructure', 'GitOps with ArgoCD / Flux',
]

const PROS = [
  { title: 'The Highest Engineering Compensation', desc: 'Senior SREs at product companies earn R2M–R5M+ in South Africa. USD-paying global remote contracts for principal SREs exceed this significantly. Reliability expertise is genuinely scarce.' },
  { title: 'Permanent Job Security', desc: 'Every company running production workloads at scale needs SREs. The discipline is spreading from big tech to finance, healthcare, and logistics. Structural demand is intense and shows no signs of slowing.' },
  { title: 'Intellectual Depth', desc: 'Distributed systems, consensus algorithms, network partitions, and complex failure modes are genuinely hard. SRE sits at the intersection of systems theory and practical engineering — perpetually challenging.' },
  { title: 'Measurable, Visible Impact', desc: 'Error budgets, SLO compliance, MTTR improvements, and uptime percentages make your impact quantifiable. When the system stays up, you can prove you made it happen.' },
  { title: 'Remote-First Culture', desc: 'SRE work has no physical dependency. 45% of roles are fully remote globally. Expertise travels anywhere with an internet connection and terminal.' },
  { title: 'Clear Path to Architecture & Leadership', desc: 'Senior SRE → Staff SRE → Principal → VP Engineering is one of the highest-compensated and most respected technical leadership trajectories in all of tech.' },
]

const CONS = [
  { title: 'On-Call Is a Real Cost', desc: 'Production never sleeps. At-scale companies, on-call rotations are mandatory. 3am pages, weekend incidents, and interrupted holidays are a genuine part of senior SRE life at high-traffic products.' },
  { title: 'Extremely Steep Learning Curve', desc: 'The gap between junior SRE and senior SRE knowledge is one of the widest in engineering. Distributed systems, deep Linux internals, and Kubernetes internals take years to truly master.' },
  { title: 'Stress of Production Ownership', desc: 'When you own reliability, you own the consequences of failure. Data loss, security breaches, and extended outages create real professional and psychological pressure.' },
  { title: 'Invisible Successes', desc: 'An outage that didn\'t happen is invisible. The systems you stabilised, the failures you prevented — nobody celebrates the absence of incidents. Your best work goes unnoticed.' },
  { title: 'Toil Never Fully Disappears', desc: 'Despite automation ambitions, manual operational work persists at every company. Legacy systems, fire-fighting, and organisational inertia mean toil is a constant companion even at the most mature engineering organisations.' },
  { title: 'Cultural Resistance', desc: 'Convincing product teams to spend engineering time on reliability instead of features is an ongoing political battle. SREs must influence without authority — a difficult and exhausting skill to develop.' },
]

const VIDEOS = [
  { id: 'uTEL8Ff1Zvk', title: 'Site Reliability Engineering Full Course', desc: 'Complete deep-dive into SRE principles, SLOs, error budgets, incident response, and the full lifecycle of production reliability engineering from first principles.', dur: '4:12:00', channel: 'TechWorld with Nana' },
  { id: 'Cxb7a8lTv9A', title: 'Kubernetes for SREs — Production Patterns', desc: 'Production Kubernetes patterns for reliability: health checks, resource limits, autoscaling, disruption budgets, and monitoring with Prometheus and Grafana.', dur: '2:45:18', channel: 'freeCodeCamp' },
  { id: 'RrdfSVBnbOU', title: 'Incident Management & Postmortem Culture', desc: 'How Google, Netflix, and Cloudflare manage production incidents — the full lifecycle from detection to postmortem to prevention. Essential SRE culture knowledge.', dur: '58:22', channel: 'SREcon' },
]

const TAKEAWAYS = [
  'Reliability is a product — define SLOs before you build monitoring, not after',
  'Automate every runbook step you find yourself executing more than twice — toil is the enemy of scale',
  'Read every major postmortem you can find: the AWS, Cloudflare, and Stripe incident reports are a free graduate education in distributed systems',
  'Error budgets are a conversation, not a constraint — use them to align engineering and product on reliability priorities',
  'Your on-call documentation is your team\'s memory — write runbooks as if the person paged is new, exhausted, and it\'s 3am',
]

const CAREER_FACTS = [
  {
    icon: <Activity size={20} />, title: 'What You Own',
    desc: 'Service reliability end-to-end. SLOs, incident response, monitoring pipelines, automation tooling. You own the reliability contract between your service and the users who depend on it.',
    color: '#059669',
  },
  {
    icon: <Zap size={20} />, title: 'Core Activities',
    desc: 'Respond to incidents, improve observability, eliminate toil through automation, investigate root causes, design for resilience, and lead blameless postmortems. Always balancing deployment velocity with system stability.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Application engineering teams, infrastructure engineers, ops teams, product managers, and security. SREs are the bridge between development and operations — cross-team influence is everything.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Job Market Demand',
    desc: 'Explosive and sustained. The SRE discipline is spreading from big tech into finance, logistics, healthcare, and enterprise. Talent shortage is severe globally. Senior SREs are among the most competed-for engineers.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🚨', title: 'Be the Hero in a Crisis', desc: 'When systems go down, you\'re the one who fixes it. The adrenaline, the methodical problem-solving under pressure, the moment systems recover — SRE attracts people who thrive in high-stakes environments.' },
  { emoji: '📊', title: 'Data-Driven Decision Making', desc: 'Everything is metrics, SLOs, and error budgets. You live in quantified decisions. Reliability is measured, not asserted. That precision and rigour is deeply satisfying to the analytically minded.' },
  { emoji: '💰', title: 'Highest Pay in Engineering', desc: 'Senior SREs earn R2M–R5M+ in South Africa. USD-paying global companies pay significantly more. Reliability expertise is genuinely scarce, and compensation reflects that scarcity.' },
  { emoji: '🏆', title: 'Become the Reliability Authority', desc: 'SREs are the people everyone trusts when things go wrong and respects when systems stay up. Your expertise shapes company-wide engineering decisions. The influence and authority compound over a career.' },
  { emoji: '🔍', title: 'Solve Genuinely Hard Problems', desc: 'Production failures in distributed systems are some of the most intellectually complex challenges in engineering. Root cause investigation through distributed traces, logs, and metrics is detective work at scale.' },
  { emoji: '🌍', title: 'Your Work Impacts Millions', desc: 'Reliability engineering at scale means your systems serve hundreds of millions of users. When you keep those systems up, you\'re part of the infrastructure the modern world depends on.' },
]

const FREE_RESOURCES = [
  { category: 'Books & Courses', color: '#059669', bgColor: '#f0fdf4', items: [
    { name: 'Google SRE Book — free online (sre.google)', url: '#', type: 'Book', rating: 5 },
    { name: 'The SRE Workbook — free online (sre.google)', url: '#', type: 'Book', rating: 5 },
    { name: 'KodeKloud — CKA Kubernetes Course', url: '#', type: 'Course', rating: 5 },
    { name: 'Linux Foundation — LFS258 Kubernetes', url: '#', type: 'Course', rating: 4 },
  ]},
  { category: 'Practice & Labs', color: '#ea580c', bgColor: '#fff7ed', items: [
    { name: 'Kubernetes the Hard Way (GitHub)', url: '#', type: 'Lab', rating: 5 },
    { name: 'Katacoda / Killercoda — Free K8s Labs', url: '#', type: 'Lab', rating: 5 },
    { name: 'Play with Kubernetes (play-with-k8s.com)', url: '#', type: 'Lab', rating: 4 },
    { name: 'roadmap.sh — DevOps & SRE Path', url: '#', type: 'Reference', rating: 5 },
  ]},
  { category: 'Community & Blogs', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'SREcon Conference Talks (YouTube, free)', url: '#', type: 'YouTube', rating: 5 },
    { name: 'Increment Magazine — Infrastructure Issues', url: '#', type: 'Magazine', rating: 5 },
    { name: 'r/sre & DevOps Communities', url: '#', type: 'Forum', rating: 4 },
    { name: 'Gergely Orosz / The Pragmatic Engineer', url: '#', type: 'Newsletter', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior SRE', range: 'R500k – R900k', midpoint: 700, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Site Reliability Engineer', range: 'R1.1M – R1.9M', midpoint: 1500, yoe: '2–5 yrs', color: '#ea580c' },
  { role: 'Senior SRE / Reliability Lead', range: 'R1.9M – R3M', midpoint: 2450, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Principal SRE / VP Engineering', range: 'R3M – R5M+', midpoint: 4000, yoe: '8+ yrs', color: '#dc2626' },
]

const MISTAKES = [
  {
    num: '01', title: 'Setting SLOs Without User Research',
    desc: 'An SLO that doesn\'t reflect actual user experience is meaningless. Teams that pick "99.9%" because it sounds good, without measuring what users actually tolerate, build alert-driven organisations chasing the wrong signals.',
    fix: 'Interview users and product managers. Instrument real user interactions. Set SLOs that reflect pain, not arbitrary percentages.',
  },
  {
    num: '02', title: 'Alert Fatigue From Poor Signal Design',
    desc: 'An on-call engineer who receives 50 alerts a night stops trusting alerts entirely. Alert fatigue is one of the most dangerous failure modes in any SRE organisation — it causes real production incidents to be ignored.',
    fix: 'Every alert must be actionable. If you can\'t write a runbook step for it, delete the alert. Measure and reduce page volume weekly.',
  },
  {
    num: '03', title: 'Treating Every Incident as a Blame Exercise',
    desc: 'Blame-based postmortems destroy psychological safety. Engineers hide information, avoid owning on-call, and stop reporting near-misses. Blame cultures produce worse reliability than blameless ones — every time.',
    fix: 'Run blameless postmortems. Ask "how did our systems and processes fail?" not "who made the mistake?" Focus on systemic fixes.',
  },
  {
    num: '04', title: 'Over-Automating Without Understanding',
    desc: 'Automation built without deep understanding of the system it replaces fails in the exact conditions where reliability matters most — during unusual failure modes under load. Automated runbooks without human judgment are dangerous.',
    fix: 'Manually execute every runbook step at least ten times before automating it. Understand the failure mode completely before scripting the fix.',
  },
  {
    num: '05', title: 'Ignoring Capacity Planning Until Crisis',
    desc: 'Running without headroom means every traffic spike is a potential incident. SRE teams that don\'t maintain capacity buffers and do regular load testing discover their limits in production, under pressure, during peak traffic.',
    fix: 'Run load tests quarterly. Maintain at least 30% capacity headroom. Track growth curves and project capacity needs 90 days ahead.',
  },
  {
    num: '06', title: 'Building Observability for Engineers, Not for Incidents',
    desc: 'Dashboards with 50 panels and no clear hierarchy are useless at 3am. If your monitoring tells you everything is wrong without telling you what to do first, you have metrics without observability.',
    fix: 'Design every dashboard with the incident responder in mind. Top-of-page summary panel, then drill-down. Every panel answers a specific diagnostic question.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Software / Backend Developer',
    ease: 'Natural Fit', easeColor: '#059669', easeBg: '#f0fdf4',
    desc: 'You already understand the systems your SRE work will protect. Add observability, Kubernetes, incident response, and SLO thinking on top of your existing development skills — and you become an exceptionally well-rounded SRE.',
    steps: ['Learn Prometheus, Grafana, and Kubernetes hands-on', 'Deploy your own apps and monitor them in production', 'Run chaos experiments on your own services', 'Target product companies running Kubernetes at scale'],
  },
  {
    from: 'IT Support / Sysadmin',
    ease: 'Strong Fit', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Linux, networking, and infrastructure operations knowledge gives you a massive head start. Add programming skills (Python), container orchestration, and SRE methodology — and you have a direct path to junior SRE roles.',
    steps: ['Learn Python for scripting and automation', 'Get hands-on with Docker and Kubernetes', 'Study SLOs and error budgets (read the Google SRE book)', 'Target DevOps-adjacent or junior SRE roles'],
  },
  {
    from: 'DevOps / Platform Engineer',
    ease: 'Very Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'You\'re already doing much of what SREs do — CI/CD, infrastructure, containers. Add SRE methodology, SLO design, advanced observability, and postmortem facilitation to formalise your transition into a dedicated SRE role.',
    steps: ['Formalise your SLO and error budget practice', 'Go deeper on distributed tracing and observability', 'Lead your first formal postmortem process', 'Apply for SRE titles at companies with formal SRE programs'],
  },
  {
    from: 'Other Engineering Background',
    ease: 'Achievable', easeColor: '#dc2626', easeBg: '#fff5f5',
    desc: 'Domain expertise in healthcare, finance, or logistics combined with SRE skills is genuinely rare and highly valuable. The fundamentals path is longer but the destination is more unique.',
    steps: ['Start with Linux fundamentals and Python scripting', 'Build a personal project and monitor it with Prometheus', 'Study Kubernetes with the CKA certification path', 'Target companies in your previous industry that run complex infrastructure'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Linux & Observability Foundation', color: '#059669', bg: '#f0fdf4', days: [
    { day: 'Day 1–2', task: 'Set up a Linux VM. Practice file system navigation, process management (ps, top, htop), systemd, and shell scripting basics.' },
    { day: 'Day 3–4', task: 'Deploy Prometheus and Grafana locally using Docker Compose. Scrape metrics from a simple Node Exporter on your machine.' },
    { day: 'Day 5–6', task: 'Write your first alert rule in Prometheus. Trigger it deliberately. Route it to Alertmanager. Understand the full alert lifecycle.' },
    { day: 'Day 7', task: 'Build a Grafana dashboard for your own machine — CPU, memory, disk, network. Write the description for each panel as if someone on-call needs it.' },
  ]},
  { week: 'Week 2', theme: 'Kubernetes & Incident Thinking', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 8–9', task: 'Set up a local Kubernetes cluster with k3s or minikube. Deploy a simple web application with a Deployment, Service, and Ingress.' },
    { day: 'Day 10–11', task: 'Read the Google SRE Book chapters on SLOs. Write your first SLO definition for your deployed application — latency SLI, availability SLI.' },
    { day: 'Day 12–13', task: 'Simulate an incident: kill a pod, watch the alert fire, respond using your runbook. Time your MTTR and write a postmortem.' },
    { day: 'Day 14', task: 'Add resource limits and readiness probes to your Kubernetes deployment. Understand what happens when they\'re wrong.' },
  ]},
  { week: 'Week 3', theme: 'Automation & Chaos', color: '#7c3aed', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Write a Python script that checks your service\'s health endpoint every minute and pages you (email or Slack) if it fails 3 times in a row.' },
    { day: 'Day 17–18', task: 'Learn Terraform basics. Provision a cloud VM (AWS/GCP free tier). Deploy your application with infrastructure-as-code.' },
    { day: 'Day 19–20', task: 'Add distributed tracing to your application using OpenTelemetry. Visualise a request trace from frontend to backend in Jaeger.' },
    { day: 'Day 21', task: 'Run a chaos experiment: inject a 500ms network delay using tc netem. Observe how your SLOs and alerts respond.' },
  ]},
  { week: 'Week 4', theme: 'Deploy & Apply', color: '#dc2626', bg: '#fff5f5', days: [
    { day: 'Day 22–24', task: 'Set up a GitHub Actions CI/CD pipeline that runs tests, builds a Docker image, and deploys to your Kubernetes cluster on every merge.' },
    { day: 'Day 25–26', task: 'Write a full runbook for your deployed application. Cover: alert definitions, immediate triage steps, escalation paths, and rollback procedure.' },
    { day: 'Day 27–28', task: 'Write a postmortem for your Week 2 simulated incident. Include timeline, root cause, impact, and three action items with owners.' },
    { day: 'Day 29–30', task: 'Publish your SRE portfolio on GitHub. Apply to 5 junior SRE or DevOps roles. Share your postmortem and Grafana dashboard on LinkedIn.' },
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
      try { await navigator.share({ title: 'Site Reliability Engineer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become an SRE in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/site-reliability-engineer'}</span>
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
export default function SiteReliabilityEngineerRoadmapPage() {
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
            src="https://i.imgur.com/YaL0R2o.jpeg"
            alt="Site Reliability Engineering server operations"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.65) brightness(1.1)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Activity size={12} /> Reliability & Infrastructure
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Site Reliability Engineer
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
            SREs keep systems online and users happy. You blend software engineering with operations to prevent outages, respond to incidents, and automate reliability. When systems run smoothly, everything else is possible. That's SRE.
          </p>
          <div className="h-px mt-10" style={{ background: C.border }} />
        </div>
      </div>

      {/* ── TABLE OF CONTENTS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={introRef}>
            <SectionHeader icon={<BookOpen size={22} />} title="What's Inside" subtitle="Everything you need to know about SRE in one place" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and mission of Site Reliability Engineering" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0fdf4', borderColor: 'rgba(5,150,105,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Site Reliability Engineer</strong> is responsible for the reliability, availability, and performance of production services. You design systems for resilience, respond to incidents, automate operational toil, and lead postmortems to prevent future outages. SRE is the application of software engineering principles to infrastructure and operations — a discipline invented at Google and now adopted by every serious technology company in the world.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons SRE could be your best career move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Site Reliability Engineer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(5,150,105,0.3)'; (e.currentTarget as HTMLElement).style.background = '#f0fdf4' }}
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → Principal / VP Engineering</span></div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                <div ref={progressRef} className="h-1.5 rounded-full" style={{ width: '0%', background: 'linear-gradient(90deg, #0891b2 0%, #ea580c 33%, #7c3aed 66%, #dc2626 100%)' }} />
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
          <SectionHeader icon={<Target size={22} />} title="Step-by-Step Roadmap" subtitle="Your path from complete beginner to job-ready SRE" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="relative flex flex-col items-center">
            {ROADMAP_STEPS.map((s, i) => {
              const icons = ['🐧', '🐍', '📊', '🚨', '☸️', '💥']
              const accentColors = ['#059669', '#ea580c', '#059669', '#ea580c', '#059669', '#ea580c']
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #ea580c 100%)`, boxShadow: '0 8px 48px rgba(5,150,105,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY SRE IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>12–16 months · Consistent daily practice · Build and monitor real systems</div>
            </div>
          </div>
         
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={skillsRef}>
            <SectionHeader icon={<CheckCircle2 size={22} />} title="Skill Checkpoints" subtitle="Technical and interpersonal skills to develop on your SRE journey" iconBg={C.indigoLight} iconColor={C.indigo} />
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
                        <div className="h-1.5 rounded-full" data-bar-w={s.level} style={{ width: 0, background: `linear-gradient(90deg, ${C.primary}, ${C.orange})` }} />
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
            <SectionHeader icon={<GraduationCap size={22} />} title="Education Paths" subtitle="Three routes into SRE — pick yours" iconBg="rgba(148,163,184,0.1)" iconColor={C.textMuted} />
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
            <SectionHeader icon={<BookOpen size={22} />} title="Best Free Resources" subtitle="World-class SRE learning material, most of it completely free" iconBg={C.greenLight} iconColor={C.green} />
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Site Reliability Engineering in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0fdf4', borderColor: 'rgba(5,150,105,0.2)', color: C.textMuted }}>
              AI tools don't replace SREs — they <em style={{ color: C.primary }}>amplify</em> them. SREs who leverage AI anomaly detection, intelligent alerting, and automated remediation reduce toil by 40–60%, freeing time for the architectural and cultural work that only humans can do.
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
            <SectionHeader icon={<Scale size={22} />} title="Pros & Cons" subtitle="The honest picture of the SRE career path" iconBg="rgba(148,163,184,0.1)" iconColor={C.textMuted} />
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
            <SectionHeader icon={<DollarSign size={22} />} title="Salary" subtitle="What you can realistically earn at each stage as an SRE" iconBg={C.greenLight} iconColor={C.green} />
            <div className="rounded-2xl p-6 mb-6 border" style={{ background: '#f0fdf4', borderColor: 'rgba(22,163,74,0.2)' }}>
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially for senior and principal SREs — can pay 2–4× these figures in USD. SRE commands a premium over equivalent backend roles at every level.</p>
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
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 5000) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f0fdf4', borderColor: 'rgba(5,150,105,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> SREs at fintech, SaaS, and cloud infrastructure companies earn 30–50% more than those at agencies or traditional enterprises. Target companies where reliability is a competitive differentiator — not just a cost of doing business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring SREs" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into SRE from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn SRE from the best educators and practitioners" iconBg={C.redLight} iconColor={C.red} />
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
                Site Reliability Engineering is the discipline that <strong style={{ color: C.primary }}>makes everything else possible at scale</strong>. Every startup that survived hypergrowth, every fintech that processed billions without losing a transaction, every streaming platform that stayed up during peak load — they were underpinned by SREs who understood failure modes before they happened.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The path demands depth — in systems, in programming, in distributed theory — but the fundamentals you build compound for decades. An engineer who deeply understands observability, incident response, and reliability architecture is valuable at any company running any infrastructure, regardless of which tools are fashionable that year.
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
        <div className="relative overflow-hidden rounded-3xl px-12 py-16 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #ea580c 100%)` }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: 'rgba(255,255,255,0.05)', top: -120, right: -80 }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Rocket size={30} style={{ color: '#fff' }} />
          </div>
          <h2 className="font-extrabold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
            Ready to Master Reliability?
          </h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open your terminal, deploy your first service, and start monitoring it like a production SRE.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>
          
            
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start building today. Reliability engineers are in massive global demand.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}