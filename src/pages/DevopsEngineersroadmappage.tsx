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
  GitBranch, 
  Workflow, Server, 
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
  primary: '#0f766e',
  primaryLight: 'rgba(15,118,110,0.08)',
  primaryMid: 'rgba(15,118,110,0.15)',
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
    level: 'Junior', title: 'Junior DevOps Engineer', duration: '0–2 yrs', salary: 'R450k–R800k',
    description: 'Support deployment pipelines, manage test environments, and assist with infrastructure. Learn CI/CD tools and cloud basics under senior guidance. Build foundational DevOps knowledge.',
    skills: ['CI/CD Basics', 'Docker', 'Linux', 'Git'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'DevOps Engineer', duration: '2–5 yrs', salary: 'R950k–R1.6M',
    description: 'Design and maintain production systems. Automate deployments, manage cloud infrastructure, write Infrastructure as Code. Lead reliability improvements and mentor junior engineers.',
    skills: ['Kubernetes', 'Terraform', 'CI/CD Mastery', 'Cloud Architecture'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
  {
    level: 'Senior', title: 'Senior DevOps / Platform Engineer', duration: '5–8 yrs', salary: 'R1.6M–R2.5M',
    description: 'Build internal developer platforms and tooling. Shape infrastructure strategy across the organization. Design for scale, reliability, and developer experience. Lead architecture decisions.',
    skills: ['Platform Design', 'System Architecture', 'Team Leadership', 'Cost Optimization'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Principal', title: 'Principal / VP of Infrastructure', duration: '8+ yrs', salary: 'R2.5M–R4M+',
    description: 'Define infrastructure strategy for the entire company. Lead teams, shape technology choices, and ensure reliability at scale. Authority on cloud architecture and DevOps practices.',
    skills: ['Strategic Leadership', 'Infrastructure Vision', 'Team Management', 'Enterprise Architecture'],
    accent: '#dc2626', accentBg: 'rgba(220,38,38,0.08)', accentBorder: 'rgba(220,38,38,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Linux & Networking Fundamentals',
    description: 'Master Linux command line, bash scripting, file systems, and permissions. Understand networking: DNS, HTTP, TCP/IP. Linux is your foundation — spend time here.',
    duration: '2–3 months', skills: ['Linux Basics', 'Bash Scripting', 'Networking', 'User Management'],
  },
  {
    step: 2, title: 'Version Control & Git',
    description: 'Learn Git deeply: branching, merging, rebasing, workflows. Understand GitFlow and trunk-based development. Git is how teams collaborate on code.',
    duration: '1–2 months', skills: ['Git Workflows', 'Collaboration', 'Merge Strategies', 'Branch Management'],
  },
  {
    step: 3, title: 'Containerization with Docker',
    description: 'Learn Docker: images, containers, networking, volumes. Build multi-container applications with Docker Compose. Containers are the future of deployment.',
    duration: '2–3 months', skills: ['Docker Images', 'Container Orchestration', 'Docker Compose', 'Registry Management'],
  },
  {
    step: 4, title: 'CI/CD Pipelines & Automation',
    description: 'Master CI/CD tools: Jenkins, GitLab CI, GitHub Actions. Build automated pipelines for testing, building, and deploying applications.',
    duration: '2–3 months', skills: ['Jenkins', 'GitHub Actions', 'Pipeline Design', 'Testing Automation'],
  },
  {
    step: 5, title: 'Kubernetes & Orchestration',
    description: 'Learn Kubernetes: pods, deployments, services, ingress. Master cluster management, scaling, and load balancing. Kubernetes is the industry standard.',
    duration: '3–4 months', skills: ['Kubernetes', 'Helm', 'YAML', 'Cluster Management'],
  },
  {
    step: 6, title: 'Infrastructure as Code & Cloud Platforms',
    description: 'Learn Terraform, Ansible, and CloudFormation. Master AWS/Azure/GCP. Build production infrastructure using IaC. This is where DevOps becomes valuable.',
    duration: '3–4 months', skills: ['Terraform', 'AWS/GCP', 'Infrastructure Design', 'Cost Optimization'],
  },
]

const HARD_SKILLS = [
  { name: 'Kubernetes & Container Orchestration', level: 92 },
  { name: 'Infrastructure as Code (Terraform)', level: 89 },
  { name: 'CI/CD Pipeline Design', level: 88 },
  { name: 'AWS / Cloud Platform Mastery', level: 85 },
  { name: 'Docker & Containerization', level: 90 },
  { name: 'Bash & Scripting', level: 82 },
  { name: 'Monitoring & Logging (Prometheus, ELK)', level: 80 },
  { name: 'Network & Linux Admin', level: 84 },
]

const SOFT_SKILLS = [
  { name: 'Systems Thinking', description: 'DevOps requires understanding entire systems — not just individual components. Think in pipelines, dependencies, and failure scenarios.' },
  { name: 'Reliability Obsession', description: 'Your job is keeping systems online. You take outages personally. Reliability is non-negotiable. Build systems that fail gracefully.' },
  { name: 'Documentation Discipline', description: 'Write clear runbooks, architecture diagrams, and troubleshooting guides. Good documentation saves teams from disasters. It\'s not boring — it\'s essential.' },
  { name: 'On-Call Resilience', description: 'You\'ll get paged at 3 AM. Fires happen. Stay calm, follow runbooks, fix fast. On-call experience builds character and problem-solving skills.' },
  { name: 'Collaboration & Communication', description: 'DevOps bridges development and operations. You work with everyone. Clear communication about infrastructure changes prevents disasters. Listen and explain.' },
  { name: 'Continuous Learning', description: 'Cloud platforms, tools, and best practices change constantly. Stay current through documentation, blogs, labs, and experiments. Learning never stops.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Computer Science / Systems Engineering Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(15,118,110,0.2)', bgColor: '#f0fdf5', typeBg: 'rgba(15,118,110,0.12)', typeColor: '#0f766e',
    pros: ['Deep theoretical foundation', 'Networking & reputation', 'Comprehensive curriculum', 'Access to labs'],
    cons: ['Slow path to first job', 'Outdated curriculum often', 'Expensive', 'Less hands-on practice'],
  },
  {
    type: 'Bootcamp', title: 'DevOps / Cloud Bootcamp', duration: '12–16 weeks', cost: 'R100k – R180k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Hands-on with real tools', 'Fast path to job-ready', 'Current tech stack', 'Strong portfolio building'],
    cons: ['Expensive upfront', 'Intense pace', 'Quality varies widely', 'Limited depth initially'],
  },
  {
    type: 'Certifications', title: 'AWS / Cloud Certifications', duration: '3–6 months', cost: 'R25k – R75k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['Industry-recognized', 'Hands-on labs', 'Self-paced', 'Affordable per cert'],
    cons: ['Requires strong foundation', 'Self-discipline needed', 'Lab costs', 'Continuous recertification'],
  },
]

const SCHEDULE = [
  { time: '8:00', act: 'Morning Standup & Review', desc: 'Team sync on ongoing deployments, incidents, and priorities. Review monitoring dashboards for overnight issues.', duration: '30 min', icon: <Users size={14} /> },
  { time: '8:30', act: 'Code Review & Pipeline Work', desc: 'Review infrastructure code changes, CI/CD pipelines, and automation scripts. Ensure quality and maintainability.', duration: '1.5 hrs', icon: <GitBranch size={14} /> },
  { time: '10:00', act: 'Infrastructure Maintenance', desc: 'Update systems, patch security vulnerabilities, optimize cloud costs, manage Kubernetes clusters.', duration: '1.5 hrs', icon: <Workflow size={14} /> },
  { time: '11:30', act: 'Lunch Break', desc: 'Step away. Recharge. On-call stress is real — rest matters.', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '12:30', act: 'Deployment & Testing', desc: 'Deploy changes to staging/production, run tests, monitor for issues. Verify everything works smoothly.', duration: '1.5 hrs', icon: <Zap size={14} /> },
  { time: '2:00', act: 'Troubleshooting & Optimization', desc: 'Investigate performance issues, optimize pipelines, reduce deployment time, improve reliability.', duration: '1.5 hrs', icon: <AlertTriangle size={14} /> },
  { time: '3:30', act: 'Documentation & Knowledge Sharing', desc: 'Write runbooks, update architecture docs, create troubleshooting guides, share learnings with team.', duration: '1 hr', icon: <FileText size={14} /> },
  { time: '4:30', act: 'Planning & Learning', desc: 'Plan next infrastructure improvements, read cloud docs, experiment with new tools in sandbox.', duration: '1 hr', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Kubernetes', cat: 'Orchestration' }, { name: 'Terraform', cat: 'IaC' },
  { name: 'Docker', cat: 'Containerization' }, { name: 'Jenkins', cat: 'CI/CD' },
  { name: 'GitHub Actions', cat: 'CI/CD' }, { name: 'Prometheus', cat: 'Monitoring' },
  { name: 'ELK Stack', cat: 'Logging' }, { name: 'Ansible', cat: 'Automation' },
]

const WORK_ENVS = [
  { type: 'Fully Remote', pct: 40 },
  { type: 'Hybrid', pct: 45 },
  { type: 'In-Office', pct: 15 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Powered Infrastructure Optimization', icon: <Sparkles size={20} />,
    desc: 'ML algorithms optimize cloud costs, predict failures, and auto-scale resources based on demand patterns. AI reduces DevOps toil significantly.',
    tools: ['Kubecost AI', 'AWS Cost Explorer', 'Datadog ML'],
    borderColor: 'rgba(15,118,110,0.18)', bgColor: '#f0fdf5', icoBg: 'rgba(15,118,110,0.12)', icoColor: '#0f766e', tagBg: 'rgba(15,118,110,0.1)', tagColor: '#0f766e', titleColor: '#0f766e',
  },
  {
    title: 'Intelligent Incident Response', icon: <Zap size={20} />,
    desc: 'AI detects anomalies, predicts failures before they happen, and suggests automated remediation actions. Reduce MTTR dramatically.',
    tools: ['PagerDuty AI', 'OpsGenie', 'Splunk ML'],
    borderColor: 'rgba(234,88,12,0.18)', bgColor: '#fff7ed', icoBg: 'rgba(234,88,12,0.12)', icoColor: '#ea580c', tagBg: 'rgba(234,88,12,0.1)', tagColor: '#ea580c', titleColor: '#ea580c',
  },
  {
    title: 'GitOps & Automated Deployments', icon: <TrendingUp size={20} />,
    desc: 'AI learns deployment patterns, suggests optimizations, and automates infrastructure changes. Continuous deployment becomes safer.',
    tools: ['ArgoCD', 'Flux', 'CloudFormation'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
]

const FUTURE_SKILLS = [
  'GitOps & Continuous Deployment', 'AI-Enhanced Monitoring & Observability',
  'Serverless Architecture & Functions', 'Service Mesh & Advanced Networking',
  'Supply Chain Security', 'FinOps & Cost Management',
]

const PROS = [
  { title: 'High Impact & Visibility', desc: 'When systems run smoothly, the whole company moves fast. Your infrastructure enables everything. Direct business impact.' },
  { title: 'Excellent Compensation', desc: 'Mid-level DevOps engineers earn R950k–R1.6M. Senior platform engineers exceed R2M. Demand far exceeds supply. Premium compensation.' },
  { title: 'Remote-Friendly Career', desc: 'DevOps is 40%+ remote adoption. Global hiring. Location independence is becoming standard. Work from anywhere.' },
  { title: 'Continuous Learning', desc: 'New tools, platforms, and best practices emerge constantly. You never get bored. Always something new to master.' },
  { title: 'Path to Leadership', desc: 'DevOps engineers move into platform engineering, infrastructure leadership, and CTO roles. Technical credibility opens doors.' },
  { title: 'Problem-Solving Heaven', desc: 'Complex systems, real constraints, creative solutions. DevOps is puzzle-solving at production scale. Intellectually satisfying.' },
]

const CONS = [
  { title: 'On-Call Stress is Real', desc: 'You get paged at 3 AM. Production is down. Pressure is intense. On-call rotations are mandatory in most companies. Sleep suffers.' },
  { title: 'High Pressure & Responsibility', desc: 'Outages cost millions. Your decisions affect the entire company. One mistake cascades. The pressure is relentless.' },
  { title: 'Continuous Patching & Maintenance', desc: 'Security updates, dependency upgrades, and tool maintenance never stop. Toil is always present despite "infrastructure as code."' },
  { title: 'Legacy System Burden', desc: 'Many jobs mean managing old infrastructure alongside new tech. Dealing with technical debt is frustrating and time-consuming.' },
  { title: 'Tool Fragmentation', desc: 'Too many DevOps tools exist. Choosing, learning, and maintaining them is overwhelming. Tool churn is constant.' },
  { title: 'Burnout is Common', desc: 'Always on-call, always learning, always fixing. DevOps burnout is high industry-wide. Work-life balance requires vigilance.' },
]

const VIDEOS = [
  { id: 'ZDPUIlDc-eY', title: 'DevOps Roadmap 2025 - Complete Guide', desc: 'Everything you need to know about becoming a DevOps engineer — tools, paths, salary, and career growth.', dur: '28:45', channel: 'TechWorld with Nana' },
  { id: 'I6lrXl5RsPE', title: 'Kubernetes Deep Dive - Production Ready', desc: 'Master Kubernetes for production: deployments, networking, security, and scaling real applications.', dur: '4:30:00', channel: 'KodeKloud' },
  { id: 'hmkF77F17qU', title: 'Terraform Complete Guide', desc: 'Learn Infrastructure as Code with Terraform — from basics to advanced patterns for AWS and cloud.', dur: '6:15:00', channel: 'Stephane Maarek' },
]

const TAKEAWAYS = [
  'Start with Linux and bash — it\'s the foundation of everything in DevOps',
  'Learn Docker and Kubernetes deeply — they are the modern infrastructure standard',
  'Master Infrastructure as Code — manual infrastructure is a DevOps antipattern',
  'Get comfortable with on-call rotations — they build resilience and problem-solving skills',
  'Contribute to open-source DevOps projects — hands-on experience beats theory',
]

const CAREER_FACTS = [
  {
    icon: <Server size={20} />, title: 'What You Build',
    desc: 'CI/CD pipelines, cloud infrastructure, Kubernetes clusters, monitoring systems, and automation frameworks. You build the systems that enable software delivery.',
    color: '#0f766e',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Deploy code, maintain infrastructure, optimize performance, respond to incidents, monitor systems, and automate everything. DevOps is about velocity and reliability.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Software engineers, infrastructure teams, product managers, and operations teams. DevOps bridges development and infrastructure. Collaboration is essential.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Job Market Demand',
    desc: 'Explosive and sustained demand. Every company on earth needs DevOps. The skillset is diverse and valuable. Job security is excellent.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🚀', title: 'Enable Fast Delivery', desc: 'Build systems that make software delivery blazingly fast. Enable developers to ship code confidently. That speed is competitive advantage.' },
  { emoji: '⚙️', title: 'Master Complex Systems', desc: 'DevOps teaches you how systems really work. You understand the entire stack. Deep technical knowledge across the board.' },
  { emoji: '💰', title: 'Excellent Compensation', desc: 'Mid-level earns R950k–R1.6M. Senior platform engineers exceed R2M. One of the highest-paid engineering roles. Demand drives salaries.' },
  { emoji: '🌍', title: 'Global Remote Opportunities', desc: 'DevOps is remote-friendly (40%+ adoption). Work for global companies. Location independence is becoming standard in this field.' },
  { emoji: '🔥', title: 'Real-World Problem Solving', desc: 'Build systems that handle millions of users. Scale challenges. Performance optimization. This is engineering at production scale.' },
  { emoji: '🎯', title: 'Define Infrastructure', desc: 'Shape how your organization builds and deploys software. Your infrastructure decisions affect the entire company. Real impact and influence.' },
]

const FREE_RESOURCES = [
  { category: 'Learning Platforms', color: '#0f766e', bgColor: '#f0fdf5', items: [
    { name: 'KodeKloud Free DevOps Course', url: '#', type: 'Course', rating: 5 },
    { name: 'TechWorld with Nana (YouTube)', url: '#', type: 'YouTube', rating: 5 },
    { name: 'DevOps Roadmap (roadmap.sh)', url: '#', type: 'Guide', rating: 5 },
    { name: 'Linux Academy Free Tier', url: '#', type: 'Tutorial', rating: 4 },
  ]},
  { category: 'Tools & Labs', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'Docker (free community edition)', url: '#', type: 'Tool', rating: 5 },
    { name: 'Kubernetes (minikube / kind)', url: '#', type: 'Lab', rating: 5 },
    { name: 'Terraform (open source)', url: '#', type: 'Tool', rating: 5 },
    { name: 'Play with Docker / Katacoda', url: '#', type: 'Lab', rating: 4 },
  ]},
  { category: 'Community & Documentation', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'Kubernetes Official Docs', url: '#', type: 'Reference', rating: 5 },
    { name: 'Docker Documentation', url: '#', type: 'Reference', rating: 5 },
    { name: 'r/devops & DevOps communities', url: '#', type: 'Forum', rating: 4 },
    { name: 'GitHub DevOps Projects', url: '#', type: 'Community', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior DevOps Engineer', range: 'R450k – R800k', midpoint: 625, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'DevOps Engineer', range: 'R950k – R1.6M', midpoint: 1275, yoe: '2–5 yrs', color: '#ea580c' },
  { role: 'Senior DevOps / Platform Engineer', range: 'R1.6M – R2.5M', midpoint: 2050, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Principal / VP Infrastructure', range: 'R2.5M – R4M+', midpoint: 3250, yoe: '8+ yrs', color: '#dc2626' },
]

const MISTAKES = [
  {
    num: '01', title: 'Skipping Linux Fundamentals',
    desc: 'Starting with Kubernetes without strong Linux knowledge. Linux is the foundation — everything runs on it. Without it, you\'re lost.',
    fix: 'Spend 2–3 months on Linux mastery before jumping to Kubernetes. Bash scripting, file systems, permissions. This foundation is critical.',
  },
  {
    num: '02', title: 'Infrastructure Without Code',
    desc: 'Manually creating infrastructure instead of using Terraform or CloudFormation. Manual infrastructure is unrepeatable and unmaintainable.',
    fix: 'Always use Infrastructure as Code. Treat infrastructure like software — version control everything. IaC is non-negotiable in modern DevOps.',
  },
  {
    num: '03', title: 'No Monitoring / Observability',
    desc: 'Building systems without proper monitoring, logging, or alerting. You can\'t fix what you can\'t see. Flying blind is dangerous.',
    fix: 'Build monitoring in from day one. Prometheus, Grafana, ELK. You need visibility into everything. Observability is part of the job.',
  },
  {
    num: '04', title: 'Ignoring Security',
    desc: 'Focusing only on speed and ignoring security best practices. Fast but insecure systems are disasters waiting to happen.',
    fix: 'Security is part of DevOps. Use network policies, secrets management, RBAC. Security is not an afterthought.',
  },
  {
    num: '05', title: 'Tool Sprawl Without Strategy',
    desc: 'Adopting every new tool that looks interesting. Tool fragmentation causes chaos. Your team can\'t maintain 20 different tools.',
    fix: 'Choose your tool stack carefully. Evaluate for your needs. Commit to tools for 1–2 years. Master them before adding more.',
  },
  {
    num: '06', title: 'No Documentation or Runbooks',
    desc: 'Building systems without documenting how they work or how to fix them. When you\'re not around, nobody can handle incidents.',
    fix: 'Document everything. Write runbooks for common issues. Make it easy for anyone on the team to troubleshoot and respond to incidents.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Systems / Network Administrator',
    ease: 'Natural Transition', easeColor: '#0f766e', easeBg: '#f0fdf5',
    desc: 'You understand infrastructure intimately. Now learn automation and modern cloud tooling. Your infrastructure knowledge is 50% of what you need.',
    steps: ['Learn Docker and containerization basics', 'Master cloud platform (AWS/GCP)', 'Learn Kubernetes fundamentals', 'Build end-to-end CI/CD pipelines'],
  },
  {
    from: 'Software Developer',
    ease: 'Strong Foundation', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'You understand application code deeply. Now learn infrastructure, cloud platforms, and deployment. Your development knowledge helps you build better DevOps systems.',
    steps: ['Learn Linux command line thoroughly', 'Master Docker and containers', 'Study Infrastructure as Code (Terraform)', 'Learn Kubernetes and deployment strategies'],
  },
  {
    from: 'Cloud Engineer / Solutions Architect',
    ease: 'Quick Pivot', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'You have cloud knowledge. Now focus on automation, CI/CD, and infrastructure code. Your cloud expertise gives you a big head start.',
    steps: ['Deepen Kubernetes skills', 'Master Terraform and IaC', 'Design and build CI/CD pipelines', 'Focus on efficient, repeatable deployments'],
  },
  {
    from: 'Quality Assurance / Testing Engineer',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'You understand testing and quality control. DevOps is about release quality and reliability. Your QA mindset transfers well.',
    steps: ['Learn Linux and bash scripting', 'Study CI/CD pipeline design', 'Master Docker and Kubernetes', 'Focus on reliability and monitoring'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Linux Mastery', color: '#0f766e', bg: '#f0fdf5', days: [
    { day: 'Day 1–2', task: 'Linux fundamentals: file system, permissions, user management, shell basics.' },
    { day: 'Day 3–4', task: 'Bash scripting: variables, loops, conditionals, functions, and error handling.' },
    { day: 'Day 5–6', task: 'Advanced Linux: processes, networking tools, package management, systemd.' },
    { day: 'Day 7', task: 'Quiz on Linux. Build a bash script for system administration tasks.' },
  ]},
  { week: 'Week 2', theme: 'Containerization', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Docker basics: images, containers, layers, Dockerfile fundamentals.' },
    { day: 'Day 10–11', task: 'Docker deep dive: networking, volumes, registries, multi-stage builds.' },
    { day: 'Day 12–13', task: 'Docker Compose: multi-container applications, service orchestration.' },
    { day: 'Day 14', task: 'Build and push a Docker image. Deploy a multi-container application locally.' },
  ]},
  { week: 'Week 3', theme: 'CI/CD & Automation', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'GitHub Actions or Jenkins basics: triggers, jobs, workflows.' },
    { day: 'Day 17–18', task: 'Build CI/CD pipeline: test → build → push image → deploy.' },
    { day: 'Day 19–20', task: 'Infrastructure as Code basics: Terraform fundamentals.' },
    { day: 'Day 21', task: 'Deploy an application end-to-end using CI/CD pipeline.' },
  ]},
  { week: 'Week 4', theme: 'Kubernetes & Advanced', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Kubernetes basics: pods, deployments, services, namespaces.' },
    { day: 'Day 25–26', task: 'Kubernetes deep dive: StatefulSets, DaemonSets, configmaps, secrets.' },
    { day: 'Day 27–28', task: 'Monitoring and logging: Prometheus, Grafana, ELK basics.' },
    { day: 'Day 29–30', task: 'Deploy complete application on Kubernetes with monitoring.' },
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
      try { await navigator.share({ title: 'DevOps Engineer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a DevOps Engineer in 2026', url: window.location.href }) }
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
      <button onClick={handleShare} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: C.primaryLight, color: C.primary, outline: 'none' }}>
        <Share2 size={13} />Share
      </button>
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono truncate max-w-xs" style={{ background: '#f1f5f9', color: C.textMuted, border: `1px solid ${C.border}` }}>
        <Link2 size={11} style={{ color: C.textFaint, flexShrink: 0 }} />
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/devops-engineer'}</span>
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

export default function DevopsEngineersRoadmapPage() {
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
            src="https://i.imgur.com/GhbeK0c.jpeg"
            alt="DevOps infrastructure"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.6) brightness(1.08)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Workflow size={12} /> DevOps & Infrastructure
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                DevOps Engineer
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
            DevOps engineers build the systems that enable software delivery at scale. Master containerization, infrastructure automation, and cloud platforms to deploy and operate applications reliably. You're the force multiplier for engineering teams.
          </p>
          <div className="h-px mt-10" style={{ background: C.border }} />
        </div>
      </div>

      {/* TABLE OF CONTENTS */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={introRef}>
            <SectionHeader icon={<BookOpen size={22} />} title="What's Inside" subtitle="Everything you need to know about DevOps in one place" iconBg={C.primaryLight} iconColor={C.primary} />
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

      {/* WHAT IS DEVOPS */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={whatRef}>
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and impact of DevOps Engineers" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: C.primaryLight, borderColor: `${C.primary}40` }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>DevOps Engineer</strong> builds and maintains the systems that enable teams to ship software reliably and frequently. You design CI/CD pipelines, manage cloud infrastructure, optimize performance, and respond to incidents. DevOps is the intersection of development and operations — you automate everything and enable teams to move fast without breaking things.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons DevOps could be your path" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical DevOps Engineer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${C.primary}50`; (e.currentTarget as HTMLElement).style.background = C.primaryLight }}
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → Principal / VP</span></div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                <div ref={progressRef} className="h-1.5 rounded-full" style={{ width: '0%', background: `linear-gradient(90deg, ${C.cyan} 0%, ${C.orange} 33%, ${C.violet} 66%, ${C.red} 100%)` }} />
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
          <SectionHeader icon={<Target size={22} />} title="Step-by-Step Roadmap" subtitle="Your path from complete beginner to senior platform engineer" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="relative flex flex-col items-center">
            {ROADMAP_STEPS.map((s, i) => {
              const icons = ['🐧', '📁', '🐳', '🔄', '☸️', '🌐']
              const accentColors = ['#0f766e', '#16a34a', '#0f766e', '#16a34a', '#0f766e', '#16a34a']
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
                      </svg>
                    </div>
                  )}
                </div>
              )
            })}
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #ea580c 100%)`, boxShadow: `0 8px 48px ${C.primary}40` }}>
              <div className="text-4xl mb-3">🚀</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>FROM JUNIOR TO</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>SENIOR PLATFORM ENGINEER IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>18–24 months · Hands-on experience · Real production systems</div>
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
                        <div className="h-1.5 rounded-full" data-bar-w={s.level} style={{ width: 0, background: `linear-gradient(90deg, ${C.primary}, #ea580c)` }} />
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

      {/* EDUCATION */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={eduRef}>
            <SectionHeader icon={<GraduationCap size={22} />} title="Education Paths" subtitle="Three routes into DevOps — pick yours" iconBg="rgba(148,163,184,0.1)" iconColor={C.textMuted} />
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
            <SectionHeader icon={<BookOpen size={22} />} title="Best Free Resources" subtitle="World-class learning material to launch your DevOps career" iconBg={C.greenLight} iconColor={C.green} />
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming DevOps in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: C.primaryLight, borderColor: `${C.primary}40`, color: C.textMuted }}>
              AI is revolutionizing DevOps — automating infrastructure optimization, predicting failures before they occur, and reducing toil significantly. AI-powered tools help DevOps engineers focus on strategic work instead of manual operations.
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
            <SectionHeader icon={<DollarSign size={22} />} title="Salary" subtitle="What you can realistic earn at each stage" iconBg={C.greenLight} iconColor={C.green} />
            <div className="rounded-2xl p-6 mb-6 border" style={{ background: '#f0fdf4', borderColor: 'rgba(22,163,74,0.2)' }}>
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Kubernetes and Terraform expertise commands premium salaries. Remote global roles for senior engineers exceed R3M+ in USD equivalent.</p>
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
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: C.primaryLight, borderColor: `${C.primary}40` }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> Remote DevOps roles globally pay significantly more than on-site roles locally. Cloud expertise (AWS/GCP/Azure) and Kubernetes mastery command premium compensation. Early adoption of new tools increases your market value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISTAKES */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that derail many aspiring DevOps engineers" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into DevOps from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Calendar size={22} />} title="30-Day Action Plan" subtitle="Exactly what to do in your first month. Start building today." iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from legendary DevOps engineers" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {VIDEOS.map(v => (
                <div key={v.id} className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ background: '#f8f9ff', borderColor: C.border }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${C.primary}50`; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: '#0a0c1a' }}>
                    <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} className="w-full h-full object-cover" style={{ opacity: 0.75 }} />
                    <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center no-underline">
                      <div className="rounded-full flex items-center justify-center" style={{ width: 52, height: 52, background: `${C.primary}e6` }}>
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
                      <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs no-underline" style={{ color: C.primary }}>Watch <ExternalLink size={11} /></a>
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
                DevOps is the <strong style={{ color: C.primary }}>future of software engineering</strong>. It's where infrastructure meets automation, where speed meets reliability. Your job is to enable teams to ship faster without breaking systems. That responsibility is meaningful and well-paid.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The path requires deep technical knowledge, systems thinking, and relentless learning. But the payoff — excellent salary, remote opportunities, real impact, and intellectual satisfaction — is tremendous. Start with Linux, master the tools, and never stop learning. DevOps is a career that compounds.
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
        <div className="relative overflow-hidden rounded-3xl px-12 py-16 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #ea580c 100%)` }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: 'rgba(255,255,255,0.05)', top: -120, right: -80 }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Rocket size={30} style={{ color: '#fff' }} />
          </div>
          <h2 className="font-extrabold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
            Ready to Build Infrastructure at Scale?
          </h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>
            You have the roadmap. You have the tools to learn. You have the labs to practice on. All that's left is to start, build relentlessly, and master DevOps. The world needs engineers like you.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>
          
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start your DevOps engineering career today. The demand is real — become irreplaceable in 2026.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}
