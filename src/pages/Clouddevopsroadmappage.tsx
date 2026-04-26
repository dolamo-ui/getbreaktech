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
  Cloud, Server, GitBranch, Shield, Terminal, Cpu,
  Activity, Lock, Globe, Package, Layers, Settings,
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
  primary: '#6366f1',        // indigo — Cloud/DevOps brand colour
  primaryLight: 'rgba(99,102,241,0.08)',
  primaryMid: 'rgba(99,102,241,0.15)',
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
    level: 'Beginner', title: 'Junior DevOps Engineer', duration: '0–2 yrs', salary: 'R320k–R520k',
    description: 'Set up CI/CD pipelines, manage cloud infrastructure basics, and support deployments under senior guidance.',
    skills: ['Linux', 'Git', 'Docker', 'AWS Basics'],
    accent: '#6366f1', accentBg: 'rgba(99,102,241,0.08)', accentBorder: 'rgba(99,102,241,0.18)'
  },
  {
    level: 'Intermediate', title: 'DevOps / Cloud Engineer', duration: '2–5 yrs', salary: 'R620k–R1.0M',
    description: 'Own infrastructure-as-code, manage Kubernetes clusters, design CI/CD workflows, and drive cloud cost optimisation.',
    skills: ['Kubernetes', 'Terraform', 'CI/CD', 'Monitoring'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)'
  },
  {
    level: 'Advanced', title: 'Senior Cloud / DevOps Engineer', duration: '5–8 yrs', salary: 'R1.0M–R1.6M',
    description: 'Architect cloud platforms, lead SRE practices, define reliability standards, and mentor engineering teams.',
    skills: ['SRE', 'Multi-Cloud', 'Security', 'Architecture'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)'
  },
  {
    level: 'Expert', title: 'Principal / Staff Engineer', duration: '8+ yrs', salary: 'R1.7M+',
    description: 'Define platform engineering vision, drive cloud strategy, build internal developer platforms, and influence industry standards.',
    skills: ['Platform Eng', 'FinOps', 'Org Design', 'Strategy'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)'
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Linux & Networking Foundations',
    description: 'Every cloud and DevOps engineer lives in the terminal. Master Linux commands, file systems, process management, and networking fundamentals — DNS, TCP/IP, firewalls, load balancers.',
    duration: '1–2 months', skills: ['Linux CLI', 'Bash Scripting', 'Networking', 'SSH']
  },
  {
    step: 2, title: 'Version Control & Git',
    description: 'Git is the heartbeat of modern software delivery. Learn branching strategies, merge workflows, pull requests, and how Git integrates into every CI/CD pipeline you will ever build.',
    duration: '2–3 weeks', skills: ['Git', 'GitHub/GitLab', 'Branching', 'Code Review']
  },
  {
    step: 3, title: 'Containers with Docker',
    description: 'Containerisation changed software delivery forever. Understand Docker images, containers, volumes, networks, and Dockerfiles. Build, run, and push your own containerised applications.',
    duration: '3–4 weeks', skills: ['Docker', 'Dockerfiles', 'Compose', 'Container Registry']
  },
  {
    step: 4, title: 'Cloud Platform Fundamentals (AWS / Azure / GCP)',
    description: 'Pick one major cloud provider and go deep before branching out. Learn compute (EC2/VMs), storage (S3/Blob), networking (VPC), IAM, and billing. AWS is the safest first choice.',
    duration: '2–3 months', skills: ['AWS/Azure/GCP', 'IAM', 'VPC', 'S3/Compute']
  },
  {
    step: 5, title: 'Infrastructure as Code (Terraform)',
    description: 'Manual cloud console clicking is not engineering. Terraform lets you define, version, and automate your entire infrastructure. Learn HCL, state management, modules, and remote backends.',
    duration: '1–2 months', skills: ['Terraform', 'HCL', 'State Mgmt', 'Modules']
  },
  {
    step: 6, title: 'CI/CD Pipelines',
    description: 'Continuous Integration and Continuous Delivery is the engine room of DevOps. Build pipelines with GitHub Actions, GitLab CI, or Jenkins. Automate build, test, and deploy stages end to end.',
    duration: '1–2 months', skills: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'ArgoCD']
  },
  {
    step: 7, title: 'Kubernetes & Container Orchestration',
    description: 'Kubernetes is the operating system of the cloud-native world. Master pods, deployments, services, ingress, ConfigMaps, and Helm charts. This is what separates mid from senior engineers.',
    duration: '2–3 months', skills: ['Kubernetes', 'Helm', 'kubectl', 'Ingress']
  },
  {
    step: 8, title: 'Monitoring, Observability & SRE',
    description: 'You can\'t fix what you can\'t see. Set up metrics (Prometheus/Grafana), logging (ELK/Loki), and distributed tracing. Learn SLOs, SLAs, error budgets, and on-call engineering.',
    duration: '1–2 months', skills: ['Prometheus', 'Grafana', 'ELK Stack', 'SRE Practices']
  },
]

const HARD_SKILLS = [
  { name: 'Linux & Bash Scripting', level: 95 },
  { name: 'Cloud Platforms (AWS / Azure / GCP)', level: 92 },
  { name: 'Docker & Containerisation', level: 90 },
  { name: 'Kubernetes & Orchestration', level: 85 },
  { name: 'Terraform / Infrastructure as Code', level: 83 },
  { name: 'CI/CD Pipelines (GitHub Actions, Jenkins)', level: 88 },
  { name: 'Monitoring & Observability (Prometheus, Grafana)', level: 75 },
  { name: 'Security & Compliance (DevSecOps)', level: 65 },
]

const SOFT_SKILLS = [
  { name: 'Systems Thinking', description: 'See the full picture — how a change in one service ripples through the platform. Great DevOps engineers think in systems, not silos.' },
  { name: 'Reliability Mindset', description: 'Obsess over uptime, error budgets, and graceful degradation. Treat every incident as a learning opportunity, not a blame exercise.' },
  { name: 'Developer Empathy', description: 'DevOps exists to unblock developers. The best platform engineers build tools that make developers feel superpowered, not bottlenecked.' },
  { name: 'On-Call Discipline', description: 'Responding calmly and methodically under pressure. Write thorough runbooks. Own your incidents end-to-end, postmortem and all.' },
  { name: 'Automation-First Thinking', description: 'If you did something manually twice, it should be automated. Build toil-elimination into your daily practice.' },
  { name: 'Security Ownership', description: 'Security is not the security team\'s job alone. DevSecOps means embedding security checks into every pipeline and infrastructure change.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'CS / IT / Engineering Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(99,102,241,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(99,102,241,0.12)', typeColor: '#6366f1',
    pros: ['Strong computer science foundation', 'Network & employer recognition', 'Access to graduate programmes', 'Networking & research exposure'],
    cons: ['Multi-year time investment', 'High tuition cost', 'Cloud skills often outdated in curriculum', 'Slow start to earning'],
  },
  {
    type: 'Certification', title: 'AWS / Azure / GCP Certifications', duration: '3–12 months', cost: 'R8k – R30k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Vendor-recognised credentials', 'Highly respected by employers', 'Practical, job-focused content', 'Can be done while working'],
    cons: ['Cert alone doesn\'t replace experience', 'Exams expire and need renewal', 'Can be narrow in scope', 'Cost adds up for multiple certs'],
  },
  {
    type: 'Self-Taught', title: 'Online Courses + Home Lab', duration: '8–18 months', cost: 'R0 – R6k',
    borderColor: 'rgba(124,58,237,0.2)', bgColor: '#faf5ff', typeBg: 'rgba(124,58,237,0.12)', typeColor: '#7c3aed',
    pros: ['Fully flexible learning pace', 'World-class free resources', 'Build real projects fast', 'Low barrier to start'],
    cons: ['Needs strong self-discipline', 'No formal credential', 'Easy to get lost in tool sprawl', 'Hard to validate skills initially'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Infrastructure Review & Standup', desc: 'Check alerting dashboards, review overnight incidents, sync with engineering teams on deployment plans', duration: '20 min', icon: <Activity size={14} /> },
  { time: '9:30', act: 'CI/CD Pipeline Work', desc: 'Build or improve automated pipelines — writing GitHub Actions workflows, fixing flaky test stages, optimising build times', duration: '2 hrs', icon: <GitBranch size={14} /> },
  { time: '11:30', act: 'Infrastructure as Code', desc: 'Write Terraform modules, review PRs for cloud changes, manage state and refactor legacy configurations', duration: '2 hrs', icon: <Terminal size={14} /> },
  { time: '1:30', act: 'Lunch & Recovery', desc: 'Away from the screen — on-call fatigue is real. Rest is part of reliability engineering.', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:30', act: 'Kubernetes & Platform Work', desc: 'Deploy workloads, debug pods, manage Helm releases, tune resource limits, and update cluster configurations', duration: '1.5 hrs', icon: <Layers size={14} /> },
  { time: '4:00', act: 'Monitoring & Incident Review', desc: 'Build dashboards in Grafana, review error rates, update runbooks, and close out postmortem action items', duration: '1 hr', icon: <BarChart2 size={14} /> },
  { time: '5:00', act: 'Learning & Documentation', desc: 'Follow a new cloud service release, update architecture diagrams, or experiment in a dev environment', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Terraform', cat: 'IaC' }, { name: 'Kubernetes', cat: 'Orchestration' },
  { name: 'Docker', cat: 'Containers' }, { name: 'GitHub Actions', cat: 'CI/CD' },
  { name: 'Prometheus', cat: 'Metrics' }, { name: 'Grafana', cat: 'Dashboards' },
  { name: 'Helm', cat: 'K8s Packages' }, { name: 'ArgoCD', cat: 'GitOps' },
]

const WORK_ENVS = [
  { type: 'Remote', pct: 52 },
  { type: 'Hybrid', pct: 36 },
  { type: 'In-Office', pct: 12 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Assisted Infrastructure', icon: <Sparkles size={20} />,
    desc: 'Tools like GitHub Copilot and Claude generate Terraform modules, Kubernetes manifests, and CI/CD pipeline YAML on demand — dramatically accelerating IaC development.',
    tools: ['GitHub Copilot', 'Claude', 'Amazon Q', 'Gemini Code'],
    borderColor: 'rgba(99,102,241,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(99,102,241,0.12)', icoColor: '#6366f1', tagBg: 'rgba(99,102,241,0.1)', tagColor: '#6366f1', titleColor: '#6366f1',
  },
  {
    title: 'AIOps & Intelligent Monitoring', icon: <Zap size={20} />,
    desc: 'AI-powered observability platforms detect anomalies, predict failures, and correlate incidents across thousands of microservices far faster than any human team.',
    tools: ['Dynatrace', 'New Relic AI', 'Datadog AI', 'PagerDuty AIOps'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
  {
    title: 'AI-Driven Security & FinOps', icon: <TrendingUp size={20} />,
    desc: 'Machine learning models continuously scan cloud configurations for vulnerabilities, misconfigurations, and cost inefficiencies — flagging issues before they become incidents.',
    tools: ['Wiz', 'Snyk', 'Infracost', 'CloudHealth'],
    borderColor: 'rgba(124,58,237,0.18)', bgColor: '#faf5ff', icoBg: 'rgba(124,58,237,0.12)', icoColor: '#7c3aed', tagBg: 'rgba(124,58,237,0.1)', tagColor: '#7c3aed', titleColor: '#7c3aed',
  },
]

const FUTURE_SKILLS = [
  'Platform Engineering & IDPs', 'eBPF-Based Observability',
  'WebAssembly (WASM) on Kubernetes', 'Cloud FinOps & Cost Engineering',
  'AI/ML Infrastructure (GPUOps)', 'Zero-Trust Network Architecture',
]

const PROS = [
  { title: 'Explosive Demand', desc: 'Every company moving to cloud needs DevOps engineers. Demand has grown 40%+ in the last 3 years with no signs of slowing down.' },
  { title: 'Excellent Compensation', desc: 'Senior Cloud/DevOps engineers earn R1.2M–R1.6M in South Africa. Global remote roles in USD are 3–5× higher.' },
  { title: 'Critical Business Role', desc: 'Production goes down, the DevOps engineer gets the call. This criticality translates directly to job security and strategic influence.' },
  { title: 'Massive Tech Breadth', desc: 'No two weeks are the same. You work across infrastructure, security, networking, development, and operations simultaneously.' },
  { title: 'Remote-First Career', desc: 'Cloud and infrastructure work is inherently remote-compatible. Over 52% of DevOps roles are fully remote in 2026.' },
  { title: 'Vendor Certification Paths', desc: 'AWS, Azure, and GCP certifications are widely respected and can accelerate your career significantly, even without a degree.' },
]

const CONS = [
  { title: 'On-Call Reality', desc: 'Production incidents happen at 3am. On-call rotations are part of the job. Burnout is a real and well-documented problem in the SRE space.' },
  { title: 'Tool Sprawl Is Exhausting', desc: 'The CNCF landscape has 1,000+ tools. Deciding what to learn and keeping up with the pace of change is genuinely overwhelming.' },
  { title: 'Blamed When Things Break', desc: 'Even when the root cause is application code, the DevOps team often takes the heat for outages. Thick skin is required.' },
  { title: 'Security Responsibility', desc: 'A misconfigured S3 bucket or IAM role can expose millions of records. The security responsibility is significant and unforgiving.' },
  { title: 'Credentials Without Context', desc: 'Many companies hire engineers with AWS certs but zero practical experience. Exam passers who can\'t debug a failing pod are common.' },
  { title: 'Constant Re-skilling', desc: 'Kubernetes replaced VMs. Serverless is rising. What you master today may be legacy in 3 years. Continuous learning is mandatory, not optional.' },
]

const VIDEOS = [
  { id: 'j-_s8f6iQEo', title: 'DevOps Roadmap 2026 — Complete Guide', desc: 'A comprehensive walkthrough of every skill a DevOps engineer needs in 2026, from Linux to Kubernetes to cloud.', dur: '18:44', channel: 'TechWorld with Nana' },
  { id: 'pg19Z8LL06w', title: 'Docker & Kubernetes Full Course', desc: 'The definitive hands-on introduction to containers and orchestration — the foundation of modern cloud engineering.', dur: '42:10', channel: 'FreeCodeCamp' },
  { id: 'X48VuDVv0do', title: 'Kubernetes Tutorial for Beginners', desc: 'TechWorld with Nana breaks down Kubernetes from zero — pods, deployments, services, ingress and more.', dur: '31:25', channel: 'TechWorld with Nana' },
]

const TAKEAWAYS = [
  'Linux and networking are the non-negotiable bedrock — skip them and you will always be guessing',
  'Infrastructure as Code (Terraform) is more important than any single cloud provider',
  'Kubernetes is the career accelerator — it separates junior from senior engineers fastest',
  'Build a home lab or use free-tier cloud accounts to practice everything hands-on',
  'Get your first AWS/Azure certification — it opens doors, especially early-career',
]

/* ─── NEW SECTIONS ────────────────────────────────────────────────────────── */

const CAREER_FACTS = [
  { icon: <Cloud size={20} />, title: 'What You Build', desc: 'CI/CD pipelines, Kubernetes clusters, cloud infrastructure, monitoring stacks, internal developer platforms, and automated deployment systems.', color: '#6366f1' },
  { icon: <Terminal size={20} />, title: 'Core Activities', desc: 'Writing Terraform, managing Kubernetes, building pipelines, debugging production incidents, optimising cloud costs, and automating toil.', color: '#16a34a' },
  { icon: <Users size={20} />, title: 'Who You Work With', desc: 'Software developers, security teams, product managers, data engineers, and C-level executives during major incidents.', color: '#7c3aed' },
  { icon: <TrendingUp size={20} />, title: 'Industry Demand', desc: 'The global DevOps market is projected to reach $51B by 2030. Cloud job postings grew 42% in 2024 despite broader tech layoffs.', color: '#ea580c' },
]

const WHY_REASONS = [
  { emoji: '☁️', title: 'Power Every Digital Business', desc: 'Every app, every API, every website runs on infrastructure someone built and maintains. Cloud engineers are the invisible force powering the digital economy.' },
  { emoji: '💰', title: 'Among the Highest-Paid Engineers', desc: 'Senior DevOps and Cloud engineers consistently rank in the top 5% of engineering salaries. Global remote roles in USD are life-changing for South African engineers.' },
  { emoji: '🔧', title: 'Solve Real Problems Daily', desc: 'From fixing a broken deployment pipeline to designing a multi-region failover architecture — every day involves real, tangible problem solving.' },
  { emoji: '🌍', title: 'Work Remotely for Global Companies', desc: 'Cloud and DevOps work is inherently location-independent. South African engineers regularly earn USD salaries from US and European companies.' },
  { emoji: '🔐', title: 'Strategic Security Ownership', desc: 'As cloud infrastructure security becomes critical to business survival, cloud engineers with security skills command premium salaries and board-level visibility.' },
  { emoji: '🚀', title: 'Path to Platform & Staff Engineering', desc: 'Cloud/DevOps is the launchpad to Staff Engineer, Platform Engineering Lead, VP of Engineering, and CTO roles at technology companies.' },
]

const FREE_RESOURCES = [
  { category: 'Learning', color: '#6366f1', bgColor: '#eef2ff', items: [
    { name: 'TechWorld with Nana — Full DevOps Course', url: '#', type: 'YouTube', rating: 5 },
    { name: 'KodeKloud — Hands-on Labs', url: '#', type: 'Platform', rating: 5 },
    { name: 'AWS Free Tier + Skill Builder', url: '#', type: 'Platform', rating: 5 },
    { name: 'Linux Foundation Free Courses', url: '#', type: 'Course', rating: 4 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'Killer.sh — Kubernetes Exam Simulators', url: '#', type: 'Practice', rating: 5 },
    { name: 'Play with Docker / Play with K8s', url: '#', type: 'Sandbox', rating: 4 },
    { name: 'HashiCorp Learn (Terraform)', url: '#', type: 'Practice', rating: 5 },
    { name: 'GitHub Actions Marketplace', url: '#', type: 'Reference', rating: 4 },
  ]},
  { category: 'Community', color: '#7c3aed', bgColor: '#faf5ff', items: [
    { name: 'r/devops & r/kubernetes', url: '#', type: 'Forum', rating: 4 },
    { name: 'CNCF Slack Community', url: '#', type: 'Slack', rating: 5 },
    { name: 'DevOps Toolkit Newsletter', url: '#', type: 'Newsletter', rating: 5 },
    { name: 'The SRE Book (Google — Free)', url: '#', type: 'Book', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior DevOps Engineer', range: 'R320k – R520k', midpoint: 420, yoe: '0–2 yrs', color: '#6366f1' },
  { role: 'DevOps / Cloud Engineer', range: 'R620k – R1.0M', midpoint: 810, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Cloud / DevOps Engineer', range: 'R1.0M – R1.6M', midpoint: 1300, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Principal / Staff Engineer', range: 'R1.7M – R3M+', midpoint: 2200, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  { num: '01', title: 'Skipping Linux Fundamentals', desc: 'Jumping straight to Kubernetes without understanding how Linux processes, file systems, and networking work. You will constantly be guessing at root causes.', fix: 'Complete "The Linux Command Line" book before touching Docker or cloud services.' },
  { num: '02', title: 'Clicking Around the Console', desc: 'Building infrastructure manually in the AWS console instead of code. It\'s not repeatable, not reviewable, and will bite you in production at the worst moment.', fix: 'Commit to writing Terraform from day one. Even simple VMs should be code.' },
  { num: '03', title: 'Ignoring Security', desc: 'Creating overly permissive IAM roles, storing secrets in environment variables, and skipping vulnerability scanning. One misconfiguration can cost millions.', fix: 'Learn IAM least-privilege, use Secrets Manager, and add Trivy/Snyk to every pipeline.' },
  { num: '04', title: 'No Real Projects in Portfolio', desc: 'Only completing courses and labs without deploying anything publicly. Hiring managers want to see real Terraform repos, working pipelines, and architecture diagrams.', fix: 'Deploy a 3-tier app on AWS with Terraform, a CI/CD pipeline, and monitoring. Document everything.' },
  { num: '05', title: 'Tool Chasing Instead of Depth', desc: 'Spending a week on Ansible, then Puppet, then Chef, then SaltStack without mastering any. Tool sprawl learning is the DevOps beginner trap.', fix: 'Master Terraform deeply before touching any other configuration management tool.' },
  { num: '06', title: 'Underestimating Kubernetes Complexity', desc: 'Thinking a basic tutorial qualifies you to run Kubernetes in production. Cluster networking, RBAC, resource management, and storage are each deep topics.', fix: 'Get CKA certified. It forces you to understand Kubernetes deeply, not just run helm install.' },
]

const CAREER_CHANGE_PATHS = [
  { from: 'Software Developer', ease: 'Easiest', easeColor: '#16a34a', easeBg: '#f0fdf4', desc: 'You already understand code, version control, and debugging. Add infrastructure and automation skills and you\'re a natural DevOps engineer.', steps: ['Learn Docker & containerise your apps', 'Set up GitHub Actions for your projects', 'Study Terraform and deploy to AWS', 'Get AWS Solutions Architect cert'] },
  { from: 'Systems / Network Admin', ease: 'Very Natural', easeColor: '#6366f1', easeBg: '#eef2ff', desc: 'Your operations foundation is incredibly valuable. Bridge the gap by adding code, automation, and cloud-native tooling.', steps: ['Learn Python/Bash scripting deeply', 'Study cloud networking (VPC, subnets)', 'Master Terraform and Kubernetes', 'Focus on SRE practices'] },
  { from: 'IT Support / Helpdesk', ease: 'Achievable', easeColor: '#7c3aed', easeBg: '#faf5ff', desc: 'Your troubleshooting mindset is a real asset. Invest 12–18 months in structured learning to make the jump into entry-level DevOps.', steps: ['Start with Linux fundamentals', 'Complete AWS Cloud Practitioner cert', 'Learn Docker basics', 'Build a home lab project'] },
  { from: 'Other Background', ease: 'Possible', easeColor: '#ea580c', easeBg: '#fff7ed', desc: 'A career switch is absolutely possible with dedication. The structured roadmap below will take 12–24 months of consistent work.', steps: ['Begin with CS50 or Linux basics', 'Pick one cloud (AWS) and go deep', 'Build projects from scratch', 'Target junior DevOps roles at startups'] },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Linux & Git', color: '#6366f1', bg: '#eef2ff', days: [
    { day: 'Day 1–2', task: 'Install Ubuntu (VM or WSL2). Navigate the filesystem, manage permissions, run processes.' },
    { day: 'Day 3–4', task: 'Bash scripting basics: loops, conditionals, functions, cron jobs.' },
    { day: 'Day 5–6', task: 'Git fundamentals: commit, branch, merge, rebase, pull requests.' },
    { day: 'Day 7', task: 'Push a project to GitHub. Write a README. Create your first .gitignore.' },
  ]},
  { week: 'Week 2', theme: 'Docker', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Install Docker. Pull images, run containers, inspect logs and processes.' },
    { day: 'Day 10–11', task: 'Write your first Dockerfile. Build, tag, and push an image to Docker Hub.' },
    { day: 'Day 12–13', task: 'Docker Compose: run a multi-container app (web + database + cache).' },
    { day: 'Day 14', task: 'Containerise one of your own projects end to end. Document the process.' },
  ]},
  { week: 'Week 3', theme: 'Cloud & IaC', color: '#7c3aed', bg: '#faf5ff', days: [
    { day: 'Day 15–16', task: 'Create an AWS free-tier account. Explore EC2, S3, IAM, and VPC in the console.' },
    { day: 'Day 17–18', task: 'Install Terraform. Write HCL to provision an EC2 instance and S3 bucket.' },
    { day: 'Day 19–20', task: 'Terraform state, variables, outputs, and modules. Destroy and rebuild your infra.' },
    { day: 'Day 21', task: 'Deploy your Dockerised app to EC2 with Terraform. Use userdata or Ansible.' },
  ]},
  { week: 'Week 4', theme: 'CI/CD & Ship It', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Set up a GitHub Actions workflow: lint, test, build Docker image on every push.' },
    { day: 'Day 25–26', task: 'Add a deploy stage: push to Docker Hub and SSH-deploy to your EC2 instance.' },
    { day: 'Day 27–28', task: 'Add basic monitoring: install Prometheus + Grafana on your server. Create a dashboard.' },
    { day: 'Day 29–30', task: 'Write a LinkedIn post with your GitHub repo link. Tag 3 DevOps engineers.' },
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
      try { await navigator.share({ title: 'Cloud & DevOps Engineer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Cloud & DevOps Engineer in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/cloud-devops-engineer'}</span>
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
export default function CloudDevOpsRoadmapPage() {
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
            src="https://i.imgur.com/aqrmk5l.png"
            alt="Cloud & DevOps Engineering workspace"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.6) brightness(1.0)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Cloud size={12} /> Cloud & Infrastructure
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>Cloud & DevOps Engineer</h1>
              <span className="block font-normal mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', color: C.textMuted }}>Career Roadmap 2026</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><Clock size={14} style={{ color: C.textFaint }} /> 22 min read</div>
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><BookOpen size={14} style={{ color: C.textFaint }} /> 16 sections</div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-8 pt-6 pb-16">
          <p className="text-base leading-relaxed" style={{ color: '#4b5563', maxWidth: 560, marginLeft: 140 }}>
            Build the infrastructure that powers the world. Cloud and DevOps engineers are the architects of reliability — combining automation, cloud platforms, and engineering discipline to ship software faster and safer than ever before.
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
            <SectionHeader icon={<Server size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Cloud & DevOps Engineering" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#eef2ff', borderColor: 'rgba(99,102,241,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Cloud & DevOps Engineer</strong> sits at the intersection of software engineering and operations. They build the automated systems, cloud infrastructure, and delivery pipelines that allow development teams to ship software reliably, repeatedly, and at scale — often measured in hundreds of deployments per day.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Cloud & DevOps could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Cloud & DevOps Engineer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.3)'; (e.currentTarget as HTMLElement).style.background = '#eef2ff' }}
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
                <div ref={progressRef} className="h-1.5 rounded-full" style={{ width: '0%', background: 'linear-gradient(90deg, #6366f1 0%, #16a34a 33%, #7c3aed 66%, #ea580c 100%)' }} />
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
          <SectionHeader icon={<Target size={22} />} title="Step-by-Step Roadmap" subtitle="Your path from complete beginner to job-ready DevOps engineer" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="relative flex flex-col items-center">
            {ROADMAP_STEPS.map((s, i) => {
              const icons = ['🐧', '🌿', '🐳', '☁️', '🏗️', '⚙️', '🎛️', '📊']
              const accentColors = ['#6366f1', '#16a34a', '#6366f1', '#16a34a', '#6366f1', '#16a34a', '#6366f1', '#16a34a']
              const accent = accentColors[i]; const isLast = i === ROADMAP_STEPS.length - 1; const isEven = i % 2 === 0
              return (
                <div key={s.step} className="w-full flex flex-col items-center">
                  <div className="w-full" style={{ opacity: 0, transform: 'translateY(20px)', transition: `opacity 0.5s ${i * 0.11}s ease, transform 0.5s ${i * 0.11}s ease` }}
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.violet} 100%)`, boxShadow: '0 8px 48px rgba(99,102,241,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>PRODUCTION-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>10–14 months · Daily hands-on practice · Build real infrastructure</div>
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
                        <div className="h-1.5 rounded-full" data-bar-w={s.level} style={{ width: 0, background: `linear-gradient(90deg, ${C.primary}, ${C.violet})` }} />
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Cloud & DevOps in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#eef2ff', borderColor: 'rgba(99,102,241,0.2)', color: C.textMuted }}>
              AI tools don't replace DevOps engineers — they <em style={{ color: C.primary }}>amplify</em> them. Engineers using GitHub Copilot and Claude to generate Terraform modules, Kubernetes manifests, and pipeline YAML ship infrastructure 4–6× faster. The demand is shifting toward engineers who understand <em style={{ color: C.primary }}>when</em> AI is wrong, not just those who can prompt it.
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
                    <div><span className="text-sm font-bold" style={{ color: C.text }}>{row.role}</span><span className="ml-3 text-xs font-mono" style={{ color: C.textFaint }}>{row.yoe}</span></div>
                    <span className="text-sm font-bold" style={{ color: row.color }}>{row.range}</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 2800) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#eef2ff', borderColor: 'rgba(99,102,241,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> Cloud engineers specialising in Kubernetes, Terraform, and AWS/GCP at fintech, insurtech, or SaaS companies earn 25–40% more than generalist DevOps engineers. The CKA and AWS Solutions Architect Professional certs command real salary premiums.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most learners" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break in from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Cloud & DevOps" iconBg={C.redLight} iconColor={C.red} />
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
                Cloud and DevOps engineering is one of the most future-proof careers you can build. While other tech roles face automation pressure, the engineers who <strong style={{ color: C.primary }}>design, automate, and secure the infrastructure itself</strong> remain indispensable. AI needs somewhere to run — and that somewhere needs you.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                Start with the 30-day plan. Get Linux and Docker working on your machine today. Deploy something real to AWS. The gap between "I'm learning DevOps" and "I have a job in DevOps" is almost always one deployed, documented, public project that proves you can do the work.
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
        <div className="relative overflow-hidden rounded-3xl px-12 py-16 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.violet} 100%)` }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: 'rgba(255,255,255,0.05)', top: -120, right: -80 }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Cloud size={30} style={{ color: '#fff' }} />
          </div>
          <h2 className="font-extrabold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
            Ready to Start Your Journey?
          </h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>
            You have the roadmap. You have the 30-day plan. You have the resources. All that's left is to open a terminal and start.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              Get Career Advice
            </a>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start building today. Your future infrastructure awaits.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}