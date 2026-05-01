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
  Layers, GitBranch, Terminal,
  Cloud, 
  BarChart2, Settings, Activity, Workflow,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const C = {
  bg: '#ffffff',
  bgAlt: '#f8f9ff',
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
  sky: '#0369a1',
  skyLight: 'rgba(3,105,161,0.08)',
}

const CAREER_LEVELS = [
  {
    level: 'Junior', title: 'Junior Cloud Engineer', duration: '0–2 yrs', salary: 'R360k–R580k',
    description: 'Deploy and manage cloud resources under guidance, write infrastructure scripts, monitor systems, and learn the major cloud platforms from the ground up.',
    skills: ['AWS/Azure/GCP basics', 'Linux', 'Bash scripting', 'Terraform intro'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Cloud Engineer', duration: '2–5 yrs', salary: 'R680k–R1.2M',
    description: 'Design and implement cloud architectures, own CI/CD pipelines, manage Kubernetes clusters, and optimise cloud costs and performance at scale.',
    skills: ['Kubernetes', 'Terraform', 'CI/CD', 'Cost Optimisation'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Cloud Engineer', duration: '5–8 yrs', salary: 'R1.2M–R2M',
    description: 'Architect multi-cloud and hybrid environments, define infrastructure standards, lead cloud migrations, and mentor teams on cloud-native best practices.',
    skills: ['Multi-cloud', 'Architecture', 'FinOps', 'Migration Strategy'],
    accent: '#0369a1', accentBg: 'rgba(3,105,161,0.08)', accentBorder: 'rgba(3,105,161,0.18)',
  },
  {
    level: 'Expert', title: 'Principal / Cloud Architect', duration: '8+ yrs', salary: 'R2.2M+',
    description: 'Set the cloud strategy for entire organisations, evaluate new services, drive platform engineering initiatives, and partner with CTO-level stakeholders.',
    skills: ['Platform Eng', 'FinOps Strategy', 'Vendor Mgmt', 'Cloud Vision'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Linux & Networking Fundamentals',
    description: 'Cloud engineering is built on Linux and networking. Master the command line, bash scripting, file permissions, processes, and core networking concepts — TCP/IP, DNS, HTTP, load balancing, firewalls. These are foundational and permanent.',
    duration: '2–3 months', skills: ['Linux CLI', 'Bash Scripting', 'TCP/IP & DNS', 'Networking Basics'],
  },
  {
    step: 2, title: 'Cloud Platform Foundations — AWS, Azure, or GCP',
    description: 'Pick one cloud platform and go deep. Understand the core services: compute (EC2/VMs), storage (S3/Blob), networking (VPC/VNet), identity (IAM), and managed databases. Earn your first associate-level certification.',
    duration: '2–3 months', skills: ['Compute & Storage', 'IAM & Security', 'VPC Networking', 'Cloud Certification'],
  },
  {
    step: 3, title: 'Infrastructure as Code — Terraform & IaC',
    description: 'Infrastructure defined in code is the standard. Master Terraform to provision and manage cloud resources declaratively. Understand state management, modules, workspaces, and how to structure IaC for real teams.',
    duration: '2–3 months', skills: ['Terraform', 'State Management', 'Modules', 'IaC Patterns'],
  },
  {
    step: 4, title: 'Containers & Kubernetes',
    description: 'Docker and Kubernetes are non-negotiable for cloud engineers. Understand containerisation, image building, registry management, Kubernetes architecture, deployments, services, ingress, and Helm chart management.',
    duration: '2–3 months', skills: ['Docker', 'Kubernetes', 'Helm Charts', 'Container Registry'],
  },
  {
    step: 5, title: 'CI/CD, DevOps & GitOps',
    description: 'Build automated pipelines that test, build, and deploy infrastructure and applications. Master GitHub Actions, ArgoCD, or Flux. Understand GitOps workflows where Git is the single source of truth for infrastructure state.',
    duration: '2–3 months', skills: ['GitHub Actions', 'ArgoCD / Flux', 'GitOps', 'Pipeline Design'],
  },
  {
    step: 6, title: 'Observability, Security & Cost Optimisation',
    description: 'At senior level, you own the health and cost of cloud environments. Learn distributed tracing, metrics, alerting with Prometheus and Grafana, cloud security best practices, and FinOps disciplines to reduce cloud spend.',
    duration: '3–4 months', skills: ['Prometheus/Grafana', 'Cloud Security', 'FinOps', 'Incident Response'],
  },
]

const HARD_SKILLS = [
  { name: 'AWS / Azure / GCP', level: 94 },
  { name: 'Terraform & IaC', level: 90 },
  { name: 'Kubernetes & Docker', level: 88 },
  { name: 'Linux & Bash', level: 92 },
  { name: 'CI/CD Pipelines', level: 85 },
  { name: 'Networking & Security', level: 80 },
  { name: 'Observability & Monitoring', level: 76 },
  { name: 'FinOps & Cost Management', level: 65 },
]

const SOFT_SKILLS = [
  { name: 'Systems Thinking', description: 'Cloud engineers see the entire system — compute, network, storage, security, cost — simultaneously. Decisions in one layer ripple through all others, and great engineers track those ripples.' },
  { name: 'Documentation Culture', description: 'Infrastructure that isn\'t documented is a liability. Great cloud engineers write runbooks, architecture decision records, and incident post-mortems that make teams safer and faster.' },
  { name: 'On-Call Composure', description: 'When production goes down at 2am, calm methodical debugging is what separates senior engineers. Panic and speed are the enemy of resolution.' },
  { name: 'Cost Consciousness', description: 'Cloud spend is business spend. Engineers who instinctively ask "what does this cost at scale?" are far more valuable than those who treat compute as free.' },
  { name: 'Security Mindset', description: 'Security is not the security team\'s job — it\'s every cloud engineer\'s job. Thinking about blast radius, least privilege, and defence-in-depth should be automatic.' },
  { name: 'Continuous Learning', description: 'AWS releases hundreds of new features annually. Azure and GCP match that pace. Staying current is not optional — it\'s the job. Engineers who stop learning become obsolete.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'CS or IT Degree', duration: '3–4 years', cost: 'R350k – R900k',
    borderColor: 'rgba(3,105,161,0.2)', bgColor: '#f0f9ff', typeBg: 'rgba(3,105,161,0.12)', typeColor: '#0369a1',
    pros: ['Deep networking, OS, and systems programming fundamentals', 'Trusted by enterprise and government employers', 'Structured academic rigour', 'Graduate internship pipelines at large cloud providers'],
    cons: ['Curriculum rarely covers Terraform, Kubernetes, or modern cloud', 'Very slow path to first cloud job', 'Theory-heavy, lab-light', 'High cost relative to cloud outcomes'],
  },
  {
    type: 'Bootcamp', title: 'Cloud / DevOps Bootcamp', duration: '3–6 months', cost: 'R50k – R110k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Hands-on labs with real cloud environments', 'Current tooling curriculum (Terraform, K8s)', 'Career mentorship and job placement support', 'Structured pace and accountability'],
    cons: ['Variable programme quality — vet carefully', 'Credential carries little weight alone', 'Labs rarely simulate true production complexity', 'Competitive junior market entry'],
  },
  {
    type: 'Self-Taught', title: 'Certifications & Labs', duration: '12–18 months', cost: 'R3k – R20k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['Cloud certifications are highly respected and valued', 'AWS/GCP/Azure have world-class free learning paths', 'Practice with real cloud accounts (free tiers exist)', 'Self-paced around existing work'],
    cons: ['Certification alone without project experience is insufficient', 'Self-discipline required', 'Easy to collect certificates without building anything real', 'Imposter syndrome is very common'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Standups & Incident Review', desc: 'Review overnight alerts, on-call handoffs, open incidents, and planned maintenance windows for the day', duration: '30 min', icon: <Activity size={14} /> },
  { time: '9:30', act: 'Infrastructure Work', desc: 'Core engineering — writing Terraform modules, building Kubernetes deployments, implementing new cloud architecture', duration: '2.5 hrs', icon: <Cloud size={14} /> },
  { time: '12:00', act: 'Pipeline & Automation Work', desc: 'Build, fix, and improve CI/CD pipelines, deployment automation scripts, and infrastructure testing suites', duration: '1 hr', icon: <GitBranch size={14} /> },
  { time: '1:00', act: 'Lunch & Recovery', desc: 'Cloud engineers manage significant cognitive load — a real break between intense focus sessions matters for quality of work', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Architecture Reviews & Planning', desc: 'Design sessions with engineering teams, review new service requests, cost forecasting, security architecture discussions', duration: '1 hr', icon: <Settings size={14} /> },
  { time: '3:00', act: 'Monitoring, Alerts & Runbooks', desc: 'Review dashboards, investigate anomalies, update runbooks, improve alerting thresholds to reduce noise', duration: '1.5 hrs', icon: <BarChart2 size={14} /> },
  { time: '4:30', act: 'Learning & Certification Study', desc: 'Stay current on cloud platform updates, study for certifications, explore new services in sandbox accounts', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Terraform', cat: 'IaC' }, { name: 'Kubernetes', cat: 'Orchestration' },
  { name: 'AWS / GCP', cat: 'Cloud' }, { name: 'GitHub Actions', cat: 'CI/CD' },
  { name: 'Prometheus', cat: 'Monitoring' }, { name: 'Grafana', cat: 'Dashboards' },
  { name: 'ArgoCD', cat: 'GitOps' }, { name: 'Vault', cat: 'Secrets' },
]

const WORK_ENVS = [
  { type: 'Remote', pct: 58 },
  { type: 'Hybrid', pct: 30 },
  { type: 'On-site', pct: 12 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Assisted Infrastructure', icon: <Sparkles size={20} />,
    desc: 'AI tools generate Terraform modules, Kubernetes manifests, and Helm charts from natural language descriptions. Engineers review, adapt, and deploy — cutting initial provisioning time dramatically.',
    tools: ['GitHub Copilot', 'AWS CodeWhisperer', 'Pulumi AI', 'Claude'],
    borderColor: 'rgba(3,105,161,0.18)', bgColor: '#f0f9ff', icoBg: 'rgba(3,105,161,0.12)', icoColor: '#0369a1', tagBg: 'rgba(3,105,161,0.1)', tagColor: '#0369a1', titleColor: '#0369a1',
  },
  {
    title: 'AIOps & Intelligent Monitoring', icon: <Zap size={20} />,
    desc: 'AI-powered observability platforms detect anomalies, predict outages, and correlate incidents across thousands of metrics automatically — replacing alert fatigue with actionable intelligence.',
    tools: ['Dynatrace AI', 'Datadog AI', 'New Relic AI', 'AWS DevOps Guru'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI-Driven Cost Optimisation', icon: <TrendingUp size={20} />,
    desc: 'AI continuously analyses cloud resource usage patterns, identifies idle resources, recommends right-sizing, and automates savings plans — putting FinOps on autopilot for engineering teams.',
    tools: ['AWS Cost Explorer AI', 'CloudHealth', 'Spot.io', 'Infracost AI'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'Platform Engineering & Internal Developer Platforms', 'eBPF for Kernel-Level Observability',
  'WebAssembly (WASM) on the Edge', 'AI/ML Infrastructure & MLOps',
  'Sustainable Cloud / GreenOps', 'Multi-cloud Cost Intelligence',
]

const PROS = [
  { title: 'Exceptional Salary Trajectory', desc: 'Senior cloud engineers and architects earn R1.2M–R2.5M+ in South Africa. Global remote contracts with hyperscalers or US companies command 3–4× those figures.' },
  { title: 'Highest Remote Work Rate', desc: 'Cloud infrastructure is inherently remote-first — you manage it through code and APIs, not physical access. 58% of cloud engineering roles are fully remote.' },
  { title: 'Mission-Critical Impact', desc: 'The infrastructure you build keeps businesses running. Cloud engineers are responsible for the availability, performance, and security of systems that generate real revenue every second.' },
  { title: 'Certifications as Currency', desc: 'AWS, GCP, and Azure certifications are globally portable and immediately recognised. Each certification level demonstrably increases your market value by 15–30%.' },
  { title: 'Exploding Demand', desc: 'Every company is migrating to or expanding in the cloud. Cloud engineering demand grew 35% in 2024 and shows no signs of slowing as AI workloads demand more infrastructure.' },
  { title: 'Natural Path to Architecture', desc: 'Senior cloud engineers become cloud architects — some of the highest-paid technical roles in the industry — without leaving the technical track.' },
]

const CONS = [
  { title: 'On-Call is a Real Commitment', desc: 'Cloud infrastructure doesn\'t sleep. Production incidents, security events, and outages happen at night and on weekends. On-call rotations are a permanent feature of senior roles.' },
  { title: 'Relentless Platform Change', desc: 'AWS launches 200+ new features per year. Azure and GCP match that pace. Staying current is not optional — it\'s a significant ongoing time investment.' },
  { title: 'Certification Treadmill', desc: 'Cloud certifications expire and must be renewed. Keeping a full certification portfolio current requires regular exam prep alongside a full-time job.' },
  { title: 'Vendor Lock-in Complexity', desc: 'Deep expertise in one cloud platform doesn\'t transfer cleanly to another. Multi-cloud skills require learning three different paradigms simultaneously.' },
  { title: 'Production Pressure', desc: 'Infrastructure mistakes can be catastrophic — data loss, security breaches, extended outages. The responsibility is significant and the margin for error is low.' },
  { title: 'Screen-Heavy & Sedentary', desc: 'Long sessions with terminals, dashboards, and documentation are physically demanding. Ergonomics and movement habits require deliberate management.' },
]

const VIDEOS = [
  { id: 'M988_fsOSWo', title: 'AWS Cloud Practitioner Full Course', desc: 'Complete AWS Cloud Practitioner certification prep — all the core services, architecture patterns, and pricing models you need to pass the exam and start your cloud journey.', dur: '11:35:00', channel: 'freeCodeCamp' },
  { id: 'rv4LlmLmVWk', title: 'Terraform Full Course for Beginners', desc: 'Learn Infrastructure as Code from scratch with Terraform — from provider setup to modules, state management, and deploying real cloud infrastructure.', dur: '2:47:00', channel: 'TechWorld with Nana' },
  { id: 'X48VuDVv0do', title: 'Kubernetes Tutorial for Beginners', desc: 'Complete Kubernetes course covering pods, deployments, services, ingress, Helm, and everything you need to run containerised workloads in production.', dur: '3:36:00', channel: 'TechWorld with Nana' },
]

const TAKEAWAYS = [
  'Pick one cloud provider and get certified first — depth on AWS or Azure beats surface knowledge of all three',
  'Build real infrastructure projects and publish them on GitHub — employers verify Terraform and K8s skills in interviews',
  'Linux and networking fundamentals never become obsolete — they underpin every cloud service ever built',
  'FinOps is a career differentiator — engineers who understand and optimise cloud cost become invaluable to business',
  'Treat your home lab like production — document everything, use IaC from day one, practice incident response',
]

const CAREER_FACTS = [
  {
    icon: <Cloud size={20} />, title: 'What You Build',
    desc: 'Cloud infrastructure, Kubernetes clusters, CI/CD pipelines, multi-region deployments, disaster recovery systems, auto-scaling architectures, and the platforms that engineering teams build products on top of.',
    color: '#0369a1',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Infrastructure provisioning, pipeline automation, container orchestration, incident response, capacity planning, security hardening, cost optimisation, and platform engineering.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Software engineers, security engineers, DevOps teams, finance stakeholders, compliance officers, and executive leadership — cloud engineers interface across every department in a technology organisation.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'Cloud engineering is the fastest-growing infrastructure discipline in the world. Demand grew 35% in 2024, driven by cloud migration, AI workloads, and the global push toward serverless and edge architectures.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '☁️', title: 'Infrastructure Defines Everything', desc: 'The cloud infrastructure you build is the foundation every product, API, and user experience runs on. Without reliable infrastructure, nothing else matters.' },
  { emoji: '💰', title: 'Among the Best-Paid in Tech', desc: 'Senior cloud engineers and architects earn R1.2M–R2.5M+ in South Africa. Global remote roles frequently pay $150k–$250k USD, especially at AWS, Google, and Microsoft.' },
  { emoji: '🏠', title: 'Truly Remote Career', desc: '58% of cloud engineering roles are fully remote. You manage infrastructure through APIs and code — physical presence in an office adds zero value to the work.' },
  { emoji: '🚀', title: 'Certifications Accelerate Growth', desc: 'Cloud certifications are globally portable and business-recognised. Each level unlocks higher pay and more senior responsibilities in a way few other credentials in tech can match.' },
  { emoji: '🔒', title: 'Mission-Critical Role', desc: 'Cloud engineers own the systems that keep companies running 24/7. That criticality translates directly into job security, seniority, and influence within organisations.' },
  { emoji: '🌍', title: 'Global Talent Market', desc: 'Cloud skills are recognised and in demand on every continent. Your AWS or Kubernetes expertise is equally valuable to a startup in Cape Town or a bank in Frankfurt.' },
]

const FREE_RESOURCES = [
  { category: 'Certifications', color: '#0369a1', bgColor: '#f0f9ff', items: [
    { name: 'AWS Skill Builder — Official Free Training', url: '#', type: 'Course', rating: 5 },
    { name: 'Google Cloud Skills Boost (free tier)', url: '#', type: 'Course', rating: 5 },
    { name: 'Microsoft Learn — Azure Fundamentals', url: '#', type: 'Course', rating: 5 },
    { name: 'HashiCorp Learn — Terraform Tutorials', url: '#', type: 'Tutorial', rating: 5 },
  ]},
  { category: 'Practice Labs', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'KodeKloud — Kubernetes & DevOps Labs', url: '#', type: 'Lab', rating: 5 },
    { name: 'A Cloud Guru — Hands-on Sandboxes', url: '#', type: 'Lab', rating: 5 },
    { name: 'Play with Kubernetes (PWK)', url: '#', type: 'Sandbox', rating: 4 },
    { name: 'TerraGoat — Terraform Vulnerable IaC', url: '#', type: 'Project', rating: 4 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'TechWorld with Nana — YouTube', url: '#', type: 'YouTube', rating: 5 },
    { name: 'r/aws & r/kubernetes & r/devops', url: '#', type: 'Forum', rating: 4 },
    { name: 'Cloud Native Computing Foundation Blog', url: '#', type: 'Blog', rating: 5 },
    { name: 'Last Week in AWS Newsletter', url: '#', type: 'Newsletter', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Cloud Engineer', range: 'R360k – R580k', midpoint: 470, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Cloud Engineer', range: 'R680k – R1.2M', midpoint: 940, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Cloud Engineer', range: 'R1.2M – R2M', midpoint: 1600, yoe: '5–8 yrs', color: '#0369a1' },
  { role: 'Principal / Cloud Architect', range: 'R2.2M – R4M+', midpoint: 2800, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Using Console Instead of Code',
    desc: 'Clicking through the AWS console to create resources instead of writing Terraform. Console-created infrastructure is undocumented, unrepeatable, and impossible to audit.',
    fix: 'Everything in Terraform from day one. If you can\'t code it, you don\'t own it.',
  },
  {
    num: '02', title: 'Ignoring IAM and Security',
    desc: 'Using root accounts, over-permissioned IAM roles, and storing secrets in environment variables. Security mistakes in the cloud can result in catastrophic data breaches and six-figure AWS bills.',
    fix: 'Learn IAM deeply before any other cloud service. Least privilege is the only policy.',
  },
  {
    num: '03', title: 'No Monitoring or Alerting',
    desc: 'Building infrastructure without dashboards, metrics, or alerts. You can\'t manage what you can\'t observe. Production incidents discovered by users rather than your own monitoring are career-damaging.',
    fix: 'Prometheus and Grafana are set up before the first workload. Alerting is designed alongside infrastructure.',
  },
  {
    num: '04', title: 'Ignoring Cost From the Start',
    desc: 'Provisioning large instance types and forgetting to add auto-scaling or lifecycle policies. Cloud bills are not fixed — they grow with every mistake and every forgotten resource.',
    fix: 'Set up cost alerts and billing dashboards before deploying anything. Tag every resource.',
  },
  {
    num: '05', title: 'Certification Without Project Work',
    desc: 'Passing the AWS Solutions Architect exam but never having built a real multi-tier application end to end. Certifications open doors — project experience is what gets you the offer.',
    fix: 'For every certification, build and deploy one real project that uses the services covered in that exam.',
  },
  {
    num: '06', title: 'Treating Kubernetes as Magic',
    desc: 'Using Kubernetes without understanding what it actually does. When pods crash or networking fails, engineers who don\'t understand the fundamentals are completely lost.',
    fix: 'Before using K8s, understand what problems it solves. Run a cluster manually before using any managed service.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Sysadmin / IT Operations',
    ease: 'Natural Fit', easeColor: '#0369a1', easeBg: '#f0f9ff',
    desc: 'Your Linux, networking, and infrastructure knowledge is the foundation of cloud engineering. The shift is learning to express that expertise in code (Terraform) and containers (Docker/K8s). You\'re closer than you think.',
    steps: ['Learn Terraform and deploy existing infra as code', 'Earn AWS or Azure associate certification', 'Containerise an existing application with Docker', 'Target cloud migration or infrastructure roles'],
  },
  {
    from: 'Software Developer',
    ease: 'Very Manageable', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Your coding skills make Terraform, Python automation, and CI/CD pipeline work feel natural. Add Linux proficiency, networking fundamentals, and a cloud certification and you\'re job-ready for cloud engineering.',
    steps: ['Learn Linux and networking fundamentals', 'Get AWS/GCP associate certified', 'Build and deploy a containerised app end-to-end', 'Target DevOps or cloud engineering roles'],
  },
  {
    from: 'Network Engineer',
    ease: 'Strong Fit', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Your networking depth is a massive advantage. VPCs, security groups, route tables, and load balancers are things you already understand deeply. Add cloud-specific tooling and automation skills.',
    steps: ['Map your network knowledge to cloud constructs (VPC, etc.)', 'Learn Infrastructure as Code (Terraform)', 'Earn a cloud networking specialty certification', 'Target cloud networking or platform engineering roles'],
  },
  {
    from: 'Other Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Cloud engineering is one of the most accessible infrastructure disciplines to enter from a non-technical background, especially with cloud providers offering structured free learning paths and widely respected certifications.',
    steps: ['Start with AWS Cloud Practitioner (free training available)', 'Learn Linux basics alongside cloud fundamentals', 'Build 2–3 real projects using cloud free tiers', 'Target junior cloud support or cloud operations roles'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Linux & Cloud Foundations', color: '#0369a1', bg: '#f0f9ff', days: [
    { day: 'Day 1–2', task: 'Install Ubuntu VM or use WSL2. Master the top 40 Linux commands. Navigate, create, edit, and manage files entirely in the terminal.' },
    { day: 'Day 3–4', task: 'Create a free AWS account. Explore IAM — create users, roles, and policies with least-privilege permissions. Never use root.' },
    { day: 'Day 5–6', task: 'Launch an EC2 instance via the console. SSH in, install nginx, make it serve a web page. Understand security groups as firewalls.' },
    { day: 'Day 7', task: 'Write your first Bash script that automates EC2 setup. Commit it to GitHub. Screenshot your working web server. Document everything.' },
  ]},
  { week: 'Week 2', theme: 'IaC & Containers', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Install Terraform. Write a .tf file that creates a VPC, subnet, and EC2 instance. Run terraform plan and terraform apply. See infrastructure created from code.' },
    { day: 'Day 10–11', task: 'Install Docker. Containerise a simple Node.js or Python web app. Build an image, push to DockerHub, run locally.' },
    { day: 'Day 12–13', task: 'Write a Docker Compose file for a multi-container app (app + database). Understand networking between containers.' },
    { day: 'Day 14', task: 'Destroy and recreate all AWS infrastructure using Terraform only. Nothing by hand. Understand idempotency and state files.' },
  ]},
  { week: 'Week 3', theme: 'Kubernetes & CI/CD', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Install minikube or k3s locally. Deploy your Docker container as a Kubernetes Deployment. Create a Service to expose it.' },
    { day: 'Day 17–18', task: 'Add Kubernetes Ingress and ConfigMaps. Practice kubectl get, describe, logs, exec. Simulate a pod failure and observe self-healing.' },
    { day: 'Day 19–20', task: 'Build a GitHub Actions workflow that builds your Docker image, runs tests, and pushes to a registry on every commit.' },
    { day: 'Day 21', task: 'Deploy your full stack (Terraform → EKS or GKE node pool → K8s deployment → GitHub Actions pipeline) to a real cloud environment.' },
  ]},
  { week: 'Week 4', theme: 'Monitoring & Certifications', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Install Prometheus and Grafana. Create dashboards for CPU, memory, request rates. Set up an alert that fires on high CPU.' },
    { day: 'Day 25–26', task: 'Register for AWS Cloud Practitioner or associate exam. Begin official AWS Skill Builder free training path.' },
    { day: 'Day 27–28', task: 'Write a full architecture document for your project: diagram, cost estimate, security considerations, and runbook.' },
    { day: 'Day 29–30', task: 'Publish GitHub repo with README, architecture diagram, and setup guide. Apply to 5 junior cloud or DevOps roles. Share on LinkedIn.' },
  ]},
]

const TOC_ITEMS = [
  { num: '01', label: 'Introduction' }, { num: '02', label: 'What This Career Is' },
  { num: '03', label: 'Why Choose This Career' }, { num: '04', label: 'A Day in the Life' },
  { num: '05', label: 'Career Timeline' }, { num: '06', label: 'Step-by-Step Roadmap' },
  { num: '07', label: 'Skill Checkpoints' }, { num: '08', label: 'Education Paths' },
  { num: '09', label: 'Best Free Resources' }, { num: '10', label: 'AI-Enhanced Roadmap' },
  { num: '11', label: 'Pros & Cons' }, { num: '12', label: 'Salary' },
  { num: '13', label: 'Common Mistakes' }, { num: '14', label: 'Career Change Guide' },
  { num: '15', label: '30-Day Action Plan' }, { num: '16', label: 'Final Thoughts' },
]

function ShareBar() {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => { navigator.clipboard.writeText(window.location.href).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }) }
  const handleShare = async () => { if (navigator.share) { try { await navigator.share({ title: 'Cloud Engineer Career Roadmap 2026', url: window.location.href }) } catch (_) {} } else { handleCopy() } }
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-10 p-4 rounded-2xl" style={{ background: '#f8f9ff', border: `1px solid ${C.border}` }}>
      <span className="text-xs font-semibold" style={{ color: C.textMuted }}>Share this roadmap:</span>
      <button onClick={handleCopy} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: copied ? 'rgba(22,163,74,0.1)' : C.primaryLight, color: copied ? '#16a34a' : C.primary, outline: 'none' }}>
        {copied ? <CheckCheck size={13} /> : <Copy size={13} />}{copied ? 'Copied!' : 'Copy Link'}
      </button>
      <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: C.violetLight, color: C.violet, outline: 'none' }}><Download size={13} />Download PDF</button>
      <button onClick={handleShare} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: C.orangeLight, color: C.orange, outline: 'none' }}><Share2 size={13} />Share</button>
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono truncate max-w-xs" style={{ background: '#f1f5f9', color: C.textMuted, border: `1px solid ${C.border}` }}>
        <Link2 size={11} style={{ color: C.textFaint, flexShrink: 0 }} /><span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/cloud-engineer'}</span>
      </div>
    </div>
  )
}

function SectionHeader({ icon, title, subtitle, iconBg, iconColor }: { icon: React.ReactNode; title: string; subtitle: string; iconBg: string; iconColor: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg }}><span style={{ color: iconColor }}>{icon}</span></div>
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

export default function CloudEngineerRoadmapPage() {
  const progressRef = useRef<HTMLDivElement>(null)
  const tlSectionRef = useRef<HTMLElement>(null)
  const barsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap'; document.head.appendChild(link)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (progressRef.current) gsap.fromTo(progressRef.current, { width: '0%' }, { width: '100%', duration: 2.2, ease: 'power2.out', scrollTrigger: { trigger: tlSectionRef.current, start: 'top 72%', toggleActions: 'play none none reverse' } })
    }); return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bars = barsContainerRef.current?.querySelectorAll<HTMLElement>('[data-bar-w]')
      bars?.forEach(bar => { gsap.fromTo(bar, { width: '0%' }, { width: `${bar.dataset.barW}%`, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: bar, start: 'top 92%', toggleActions: 'play none none reverse' } }) })
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
      <Link to="/roadmaps" className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold no-underline transition-all duration-200" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', border: `1px solid ${C.border}`, color: C.textMuted, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <ArrowLeft size={14} /> All Roadmaps
      </Link>

      {/* HERO */}
      <div className="relative w-full" style={{ background: C.bg }}>
        <div className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: 600 }}>
          <img src="https://i.imgur.com/r7DbY27.jpeg" alt="Cloud Engineer workspace" className="w-full h-full object-cover object-center block" style={{ filter: 'saturate(0.55) brightness(1.05)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Cloud size={12} /> Infrastructure & Cloud Computing
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>Cloud Engineer</h1>
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
            Build the infrastructure the world runs on. Cloud engineers design, automate, and operate the systems that power every app, API, and AI service in production — at planet scale.
          </p>
          <div className="h-px mt-10" style={{ background: C.border }} />
        </div>
      </div>

      {/* TOC */}
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

      {/* WHAT */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={whatRef}>
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Cloud Engineering" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0f9ff', borderColor: 'rgba(3,105,161,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Cloud Engineer</strong> designs, builds, and operates the infrastructure that runs modern software — on AWS, Azure, Google Cloud, or a combination of all three. Unlike traditional sysadmins, cloud engineers work entirely in code: infrastructure is defined as Terraform, deployments are automated via CI/CD pipelines, and systems self-heal through Kubernetes orchestration. The result is infrastructure that scales to millions of users, costs what it should, and recovers from failure automatically.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CAREER_FACTS.map(f => (
                <div key={f.title} className="flex gap-4 rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style={{ background: C.bg, borderColor: C.border }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${f.color}12` }}><span style={{ color: f.color }}>{f.icon}</span></div>
                  <div><div className="text-sm font-bold mb-1.5" style={{ color: C.text }}>{f.title}</div><div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{f.desc}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={whyRef}>
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Cloud Engineering could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WHY_REASONS.map(r => (
                <div key={r.title} className="rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style={{ background: C.bg, borderColor: C.border }}>
                  <div className="flex items-start gap-3"><div className="text-2xl flex-shrink-0">{r.emoji}</div>
                    <div><div className="text-sm font-bold mb-1.5" style={{ color: C.text }}>{r.title}</div><div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{r.desc}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DAY */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={dayRef}>
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Cloud Engineer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
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
                      <div className="flex justify-between text-xs mb-1.5"><span style={{ color: C.textMuted }}>{e.type}</span><span className="font-mono" style={{ color: C.primary }}>{e.pct}%</span></div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}><div className="h-1.5 rounded-full" style={{ width: `${e.pct}%`, background: C.primary }} /></div>
                    </div>
                  ))}
                  <div className="text-xs mt-2" style={{ color: C.textFaint }}>Based on 2026 industry surveys</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section ref={tlSectionRef} className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={tlRef}>
            <SectionHeader icon={<Clock size={22} />} title="Career Timeline" subtitle="Time estimates and salary ranges for each level" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="mb-10">
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → Cloud Architect</span></div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                <div ref={progressRef} className="h-1.5 rounded-full" style={{ width: '0%', background: 'linear-gradient(90deg, #0891b2 0%, #16a34a 33%, #0369a1 66%, #ea580c 100%)' }} />
              </div>
              <div className="flex justify-between mt-2.5">{CAREER_LEVELS.map(l => <span key={l.level} className="font-mono" style={{ color: l.accent, fontSize: '0.68rem' }}>{l.duration}</span>)}</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              {CAREER_LEVELS.map(l => (
                <div key={l.level} className="rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg" style={{ background: C.bg, borderColor: l.accentBorder }}>
                  <div className="inline-block rounded-full px-2.5 py-0.5 mb-3 font-mono text-xs font-bold uppercase tracking-widest" style={{ background: l.accentBg, color: l.accent }}>{l.level}</div>
                  <div className="text-base font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>{l.title}</div>
                  <div className="text-sm font-semibold mb-2.5" style={{ color: l.accent }}>{l.salary}</div>
                  <div className="text-xs leading-relaxed mb-3.5" style={{ color: C.textMuted }}>{l.description}</div>
                  <div className="flex flex-wrap gap-1.5">{l.skills.map(s => <span key={s} className="rounded px-1.5 py-0.5 font-mono text-xs" style={{ background: '#f1f5f9', color: C.textMuted }}>{s}</span>)}</div>
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
              const icons = ['🐧', '☁️', '🏗️', '🐳', '⚙️', '📊']
              const accentColors = ['#0369a1', '#16a34a', '#0369a1', '#16a34a', '#0369a1', '#16a34a']
              const accent = accentColors[i]; const isLast = i === ROADMAP_STEPS.length - 1; const isEven = i % 2 === 0
              return (
                <div key={s.step} className="w-full flex flex-col items-center">
                  <div className="w-full" style={{ opacity: 0, transform: 'translateY(20px)', transition: `opacity 0.5s ${i * 0.13}s ease, transform 0.5s ${i * 0.13}s ease` }}
                    ref={el => { if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect() } }, { threshold: 0.15 }); obs.observe(el) }}>
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
                        {isEven ? <polygon points="372,36 388,44 372,52" fill={accentColors[i + 1] ?? accent} opacity="0.5" /> : <polygon points="28,36 12,44 28,52" fill={accentColors[i + 1] ?? accent} opacity="0.5" />}
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
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>12–16 months · Consistent daily practice · Build and deploy real infrastructure</div>
            </div>
          </div>
          <ShareBar />
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
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.primaryLight }}><Terminal size={16} style={{ color: C.primary }} /></div>
                  <div><div className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Hard Skills</div><div className="text-xs mt-0.5" style={{ color: C.textMuted }}>Technical competencies required</div></div>
                </div>
                <div ref={barsContainerRef}>
                  {HARD_SKILLS.map(s => (
                    <div key={s.name} className="mb-4">
                      <div className="flex justify-between mb-1.5"><span className="text-xs" style={{ color: C.textMuted }}>{s.name}</span><span className="text-xs font-mono" style={{ color: C.textFaint }}>{s.level}%</span></div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                        <div className="h-1.5 rounded-full" data-bar-w={s.level} style={{ width: 0, background: `linear-gradient(90deg, ${C.primary}, ${C.indigo})` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-7 border" style={{ background: C.bg, borderColor: C.border }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.indigoLight }}><MessageSquare size={16} style={{ color: C.indigo }} /></div>
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

      {/* EDUCATION */}
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
                      <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < item.rating ? cat.color : 'none'} style={{ color: i < item.rating ? cat.color : C.textFaint }} />)}</div>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Cloud Engineering in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0f9ff', borderColor: 'rgba(3,105,161,0.2)', color: C.textMuted }}>
              AI is transforming infrastructure operations — but cloud engineers who understand the underlying systems remain <em style={{ color: C.primary }}>irreplaceable</em>. AI generates code; engineers validate, secure, and maintain what AI produces at scale.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-9">
              {AI_IMPACTS.map(item => (
                <div key={item.title} className="rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-1 hover:shadow-md" style={{ background: item.bgColor, borderColor: item.borderColor }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: item.icoBg }}><span style={{ color: item.icoColor }}>{item.icon}</span></div>
                  <div className="text-sm font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif', color: item.titleColor }}>{item.title}</div>
                  <div className="text-xs leading-relaxed mb-3.5" style={{ color: C.textMuted }}>{item.desc}</div>
                  <div className="flex flex-wrap gap-1.5">{item.tools.map(t => <span key={t} className="rounded px-2 py-0.5 text-xs font-mono font-semibold" style={{ background: item.tagBg, color: item.tagColor }}>{t}</span>)}</div>
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

      {/* PROS CONS */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={pcRef}>
            <SectionHeader icon={<Scale size={22} />} title="Pros & Cons" subtitle="The honest picture of this career path" iconBg="rgba(148,163,184,0.1)" iconColor={C.textMuted} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-3xl p-7 border" style={{ background: '#f0fdf4', borderColor: 'rgba(22,163,74,0.2)' }}>
                <div className="flex items-center gap-3 mb-5"><div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(22,163,74,0.12)' }}><ThumbsUp size={16} style={{ color: C.green }} /></div><span className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.green }}>Advantages</span></div>
                {PROS.map(p => (<div key={p.title} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border" style={{ background: C.bg, borderColor: 'rgba(22,163,74,0.12)' }}><div className="text-sm font-semibold mb-1" style={{ color: C.text }}>{p.title}</div><div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{p.desc}</div></div>))}
              </div>
              <div className="rounded-3xl p-7 border" style={{ background: '#fff5f5', borderColor: 'rgba(220,38,38,0.2)' }}>
                <div className="flex items-center gap-3 mb-5"><div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(220,38,38,0.1)' }}><ThumbsDown size={16} style={{ color: C.red }} /></div><span className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.red }}>Challenges</span></div>
                {CONS.map(c => (<div key={c.title} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border" style={{ background: C.bg, borderColor: 'rgba(220,38,38,0.12)' }}><div className="text-sm font-semibold mb-1" style={{ color: C.text }}>{c.title}</div><div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{c.desc}</div></div>))}
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially senior and architect roles — can pay 2–4× these figures in USD.</p>
            </div>
            <div className="space-y-4">
              {SALARY_DATA.map(row => (
                <div key={row.role} className="rounded-2xl p-5 border" style={{ background: '#f8f9ff', borderColor: C.border }}>
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div><span className="text-sm font-bold" style={{ color: C.text }}>{row.role}</span><span className="ml-3 text-xs font-mono" style={{ color: C.textFaint }}>{row.yoe}</span></div>
                    <span className="text-sm font-bold" style={{ color: row.color }}>{row.range}</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}><div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 3200) * 100}%`, background: row.color }} /></div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f0f9ff', borderColor: 'rgba(3,105,161,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}><strong style={{ color: C.primary }}>Pro tip:</strong> Cloud engineers with FinOps skills and multi-cloud expertise earn 20–40% more than single-platform specialists. Add a cost optimisation win to your portfolio for maximum impact.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MISTAKES */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring cloud engineers" iconBg={C.orangeLight} iconColor={C.orange} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISTAKES.map(m => (
                <div key={m.num} className="rounded-2xl p-5 border transition-all duration-200 hover:shadow-md" style={{ background: C.bg, borderColor: C.border }}>
                  <div className="flex items-start gap-3 mb-3">
                    <span className="font-mono text-xs font-black flex-shrink-0 mt-0.5" style={{ color: C.textFaint }}>{m.num}</span>
                    <div><div className="text-sm font-bold mb-1.5" style={{ color: C.red }}>{m.title}</div><div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{m.desc}</div></div>
                  </div>
                  <div className="rounded-xl p-3 border-l-2 ml-5" style={{ background: '#f0fdf4', borderLeftColor: C.green }}>
                    <span className="text-xs font-bold" style={{ color: C.green }}>Fix: </span><span className="text-xs" style={{ color: C.textMuted }}>{m.fix}</span>
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into cloud engineering from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: `${path.easeColor}20`, color: path.easeColor }}>{i + 1}</div>{step}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 30 DAY */}
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Cloud Engineering" iconBg={C.redLight} iconColor={C.red} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {VIDEOS.map(v => (
                <div key={v.id} className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ background: '#f8f9ff', borderColor: C.border }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.3)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: '#0a0c1a' }}>
                    <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} className="w-full h-full object-cover" style={{ opacity: 0.75 }} />
                    <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center no-underline">
                      <div className="rounded-full flex items-center justify-center" style={{ width: 52, height: 52, background: 'rgba(220,38,38,0.9)' }}><Play size={20} fill="white" style={{ color: '#fff', marginLeft: 2 }} /></div>
                    </a>
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded px-2 py-1 text-xs text-white" style={{ background: 'rgba(0,0,0,0.75)' }}><Clock size={10} />{v.dur}</div>
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

      {/* FINAL */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={finalRef}>
            <SectionHeader icon={<Award size={22} />} title="Final Thoughts" subtitle="What we want you to take away from this guide" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 border mb-8" style={{ background: C.bg, borderColor: C.border }}>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#374151' }}>Cloud engineering is one of the most <strong style={{ color: C.primary }}>financially rewarding and intellectually demanding</strong> disciplines in all of technology. The infrastructure you build is the foundation everything else runs on. That criticality commands both exceptional compensation and deep professional respect.</p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>The engineers who succeed fastest are those who treat certifications as milestones, not destinations — and build real projects alongside every exam they pass. Infrastructure that runs in production, has been monitored, broken, and fixed by your own hand is what separates a certified cloud practitioner from a working cloud engineer.</p>
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
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(255,255,255,0.15)' }}><Rocket size={30} style={{ color: '#fff' }} /></div>
          <h2 className="font-extrabold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>Ready to Start Your Journey?</h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open a terminal and create your first cloud resource.</p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>Explore More Roadmaps <ArrowRight size={16} /></Link>
           <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start building today. Your future self will thank you.</p>
        </div>
        <ShareBar />
      </div>
    </div>
  )
}