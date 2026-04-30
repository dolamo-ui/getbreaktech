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
  Layers, Server, Terminal, Shield,
  GitBranch, Network, Activity,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const C = {
  bg: '#ffffff', bgAlt: '#f8f9ff', border: 'rgba(0,0,0,0.07)',
  text: '#0f172a', textMuted: '#64748b', textFaint: '#94a3b8',
  primary: '#0f766e', primaryLight: 'rgba(15,118,110,0.08)', primaryMid: 'rgba(15,118,110,0.15)',
  violet: '#7c3aed', violetLight: 'rgba(124,58,237,0.08)',
  green: '#16a34a', greenLight: 'rgba(22,163,74,0.08)',
  red: '#dc2626', redLight: 'rgba(220,38,38,0.08)',
  orange: '#ea580c', orangeLight: 'rgba(234,88,12,0.08)',
  indigo: '#4f46e5', indigoLight: 'rgba(79,70,229,0.08)',
  teal: '#0d9488', tealLight: 'rgba(13,148,136,0.08)',
}

const CAREER_LEVELS = [
  {
    level: 'Junior', title: 'Junior Systems / Site Reliability Engineer', duration: '0–2 yrs', salary: 'R350k–R600k',
    description: 'Support infrastructure, respond to alerts, assist with deployments, learn monitoring tools, and build foundational Linux and networking skills under senior guidance.',
    skills: ['Linux Administration', 'Monitoring Tools', 'Scripting Basics', 'On-call Support'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Systems / Infrastructure Engineer', duration: '2–5 yrs', salary: 'R700k–R1.3M',
    description: 'Design and own infrastructure components, implement CI/CD pipelines, architect cloud environments, manage Kubernetes clusters, and build automation that eliminates manual toil.',
    skills: ['Cloud Architecture', 'Kubernetes', 'CI/CD Design', 'Infrastructure as Code'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Systems / SRE', duration: '5–8 yrs', salary: 'R1.2M–R2.1M',
    description: 'Define infrastructure strategy, architect multi-region distributed systems, lead incident management programmes, drive SLO culture, and mentor engineering teams on reliability principles.',
    skills: ['Distributed Systems', 'SLO / SLI Design', 'Incident Management', 'Platform Architecture'],
    accent: '#0f766e', accentBg: 'rgba(15,118,110,0.08)', accentBorder: 'rgba(15,118,110,0.18)',
  },
  {
    level: 'Principal', title: 'Principal / Staff Infrastructure Architect', duration: '8+ yrs', salary: 'R2.2M+',
    description: 'Own the engineering organisation\'s infrastructure vision. Define platform strategy, lead cross-team reliability initiatives, represent infrastructure at the executive level, and shape the company\'s cloud and systems roadmap.',
    skills: ['Platform Strategy', 'Engineering Leadership', 'Cost Engineering', 'Org Design'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Linux & Operating System Fundamentals',
    description: 'Systems engineering starts here. Master the Linux command line: filesystem hierarchy, permissions and users, process management, networking tools (netstat, ss, tcpdump), systemd services, log management, and shell scripting. Without deep Linux fluency, everything else is a black box you cannot debug.',
    duration: '2–3 months', skills: ['Linux CLI Mastery', 'Shell Scripting', 'Systemd Services', 'Process & Network Tools'],
  },
  {
    step: 2, title: 'Networking — TCP/IP, DNS, Load Balancing & TLS',
    description: 'Systems engineers own the network layer. Deeply understand TCP/IP, the OSI model, DNS resolution, HTTP/S, load balancers (Nginx, HAProxy), firewalls and iptables, VPNs, and TLS certificate management. Network problems are the hardest to debug — understanding them cold is the entry requirement.',
    duration: '2–3 months', skills: ['TCP/IP & OSI Model', 'DNS & HTTP/S', 'Load Balancers', 'TLS & Firewalls'],
  },
  {
    step: 3, title: 'Cloud Platforms — AWS, GCP or Azure',
    description: 'Modern systems infrastructure is cloud-native. Master one cloud provider deeply: compute (EC2/GCE), networking (VPC, subnets, security groups), storage (S3, object storage), managed databases (RDS, Cloud SQL), IAM, and cost management. Earn a foundational cloud certification to validate your knowledge.',
    duration: '2–3 months', skills: ['EC2 / Compute', 'VPC & Networking', 'IAM & Security', 'Cloud Storage & DBs'],
  },
  {
    step: 4, title: 'Infrastructure as Code — Terraform & Ansible',
    description: 'Manual infrastructure is a liability. Learn Terraform to provision and manage cloud resources declaratively — state files, modules, workspaces, and remote backends. Learn Ansible or Puppet for configuration management. Infrastructure as Code is now the professional baseline for any systems role.',
    duration: '2–3 months', skills: ['Terraform', 'Ansible / Puppet', 'State Management', 'Module Design'],
  },
  {
    step: 5, title: 'Containers, Kubernetes & CI/CD',
    description: 'Containerisation defines modern deployment. Master Docker deeply, then Kubernetes: pods, deployments, services, ingress controllers, RBAC, namespaces, persistent volumes, and Helm charts. Build CI/CD pipelines with GitHub Actions or GitLab CI. Deploy with confidence through automated, reproducible pipelines.',
    duration: '3–4 months', skills: ['Docker & OCI', 'Kubernetes (K8s)', 'Helm Charts', 'CI/CD Pipelines'],
  },
  {
    step: 6, title: 'Observability — Monitoring, Logging & SRE Practices',
    description: 'Systems you cannot observe are systems you cannot operate. Learn the three pillars of observability: metrics (Prometheus, Grafana), logs (Elastic Stack, Loki), and distributed tracing (Jaeger, OpenTelemetry). Study SRE principles: SLIs, SLOs, error budgets, incident management, and post-mortem culture.',
    duration: '2–3 months', skills: ['Prometheus & Grafana', 'ELK / Loki', 'OpenTelemetry', 'SLO / Error Budgets'],
  },
]

const HARD_SKILLS = [
  { name: 'Linux Systems Administration', level: 96 },
  { name: 'Cloud Platforms (AWS / GCP / Azure)', level: 92 },
  { name: 'Kubernetes & Container Orchestration', level: 89 },
  { name: 'Infrastructure as Code (Terraform)', level: 87 },
  { name: 'CI/CD Pipeline Design', level: 85 },
  { name: 'Monitoring & Observability Stack', level: 83 },
  { name: 'Networking & Security', level: 80 },
  { name: 'Distributed Systems Architecture', level: 72 },
]

const SOFT_SKILLS = [
  { name: 'Systems Thinking', description: 'Great systems engineers see the whole picture — how a change in one component cascades through the entire system. They model failure modes before they happen and design for graceful degradation rather than catastrophic failure.' },
  { name: 'Calm Under Pressure', description: 'Production incidents are time-pressured, high-stakes, and publicly visible. Engineers who can methodically diagnose a failing system at 3am while coordinating with stakeholders — without panic — are the most trusted professionals in the building.' },
  { name: 'Documentation Discipline', description: 'Every runbook, architecture diagram, post-mortem, and deployment guide you write is infrastructure in its own right. Systems teams that document well recover from incidents faster and onboard new engineers in weeks, not months.' },
  { name: 'Automation Mindset', description: 'If you do it twice, automate it. If a junior engineer has to read a 40-step runbook to complete a task, that runbook should be a script. Systems engineers who default to automation reduce toil and elevate the entire team.' },
  { name: 'Cross-Functional Communication', description: 'Systems decisions affect every team. Communicating infrastructure changes, capacity constraints, and incident impacts to product, security, and executive stakeholders clearly and without jargon is a senior systems engineering competency.' },
  { name: 'Continuous Learning', description: 'The infrastructure landscape evolves relentlessly: new Kubernetes releases, cloud-native tooling, eBPF, WebAssembly edge compute. Systems engineers who stay current prevent the organisation from accumulating technical debt that compounds silently.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Computer Science / Information Technology', duration: '3–4 years', cost: 'R350k – R900k',
    borderColor: 'rgba(15,118,110,0.2)', bgColor: '#f0fdfa', typeBg: 'rgba(15,118,110,0.12)', typeColor: '#0f766e',
    pros: ['Deep OS, networking, and systems theory foundations', 'High credibility for government, defence, and enterprise roles', 'Structured exposure to algorithms and distributed systems', 'Academic research and internship pipeline access'],
    cons: ['Curriculum lags practical DevOps and Kubernetes experience', 'Cloud skills still require significant self-study', '3–4 years to first systems role is slow', 'Lab environments rarely match production cloud scale'],
  },
  {
    type: 'Certifications', title: 'AWS / CKA / RHCSA Path', duration: '12–24 months', cost: 'R25k – R80k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['CKA (Kubernetes), AWS SAA, and RHCSA are universally respected', 'Clear, measurable progression from one cert to next', 'Hands-on lab focus builds genuine practical skill', 'Enterprise employers specifically filter for these credentials'],
    cons: ['Certifications without hands-on project experience are hollow', 'Cert fees add up — plan budget carefully', 'Requires discipline to study alongside work', 'Knowledge gaps in areas not covered by exam objectives'],
  },
  {
    type: 'Self-Taught', title: 'Homelab, Cloud Labs & Open Source', duration: '12–20 months', cost: 'R0 – R15k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['Homelabs teach real systems administration at depth', 'Free AWS / GCP / Azure trial credits enable cloud practice', 'Open source contributions demonstrate real capability', 'No ceiling on learning depth or specialisation'],
    cons: ['No formal credential without separate certification', 'Homelab knowledge doesn\'t always translate to cloud-native', 'Self-discipline and structured curriculum required', 'Enterprise roles may require formal credentials regardless'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Incident Review & Alert Triage', desc: 'Review overnight alerts, check SLO compliance dashboards, triage any open incidents, and plan the day\'s infrastructure work.', duration: '30 min', icon: <Activity size={14} /> },
  { time: '9:30', act: 'Infrastructure Development', desc: 'Write Terraform modules, update Kubernetes manifests, build CI/CD pipeline improvements, or automate a previously manual workflow.', duration: '2.5 hrs', icon: <Terminal size={14} /> },
  { time: '12:00', act: 'Deployment & Release Support', desc: 'Support engineering teams deploying to production. Monitor metrics during rollouts. Roll back if SLO error budget is burning.', duration: '1 hr', icon: <GitBranch size={14} /> },
  { time: '1:00', act: 'Lunch', desc: 'Step away from the terminal. Systems work requires sustained concentration — genuine breaks maintain the clarity needed for incident diagnosis.', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Incident Response & Post-Mortems', desc: 'Investigate active incidents, coordinate with development teams, write post-mortems with actionable follow-up items, and track resolution.', duration: '1.5 hrs', icon: <Shield size={14} /> },
  { time: '3:30', act: 'Capacity Planning & Architecture', desc: 'Review infrastructure costs, plan capacity for upcoming growth, design new systems, and document architecture decisions.', duration: '1 hr', icon: <Network size={14} /> },
  { time: '4:30', act: 'Learning & Tooling Research', desc: 'Read engineering blogs (Cloudflare, Netflix Tech, AWS re:Invent talks), evaluate new tooling, and explore relevant CNCF project updates.', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Terraform', cat: 'IaC' }, { name: 'Kubernetes', cat: 'Orchestration' },
  { name: 'Prometheus', cat: 'Monitoring' }, { name: 'Grafana', cat: 'Dashboards' },
  { name: 'AWS / GCP', cat: 'Cloud' }, { name: 'Ansible', cat: 'Config Mgmt' },
  { name: 'GitHub Actions', cat: 'CI/CD' }, { name: 'Datadog', cat: 'Observability' },
]

const WORK_ENVS = [
  { type: 'Fully Remote', pct: 62 },
  { type: 'Hybrid', pct: 28 },
  { type: 'On-site (Datacentre)', pct: 10 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Assisted Infrastructure Automation', icon: <Sparkles size={20} />,
    desc: 'AI tools generate Terraform modules, Kubernetes manifests, and shell scripts from natural language descriptions. Systems engineers using AI assistants report 40–55% productivity gains on infrastructure-as-code development.',
    tools: ['GitHub Copilot', 'Claude', 'Cursor', 'Ansible Lightspeed'],
    borderColor: 'rgba(15,118,110,0.18)', bgColor: '#f0fdfa', icoBg: 'rgba(15,118,110,0.12)', icoColor: '#0f766e', tagBg: 'rgba(15,118,110,0.1)', tagColor: '#0f766e', titleColor: '#0f766e',
  },
  {
    title: 'AI-Powered Incident Detection', icon: <Zap size={20} />,
    desc: 'Machine learning models now detect anomalous infrastructure behaviour, predict capacity exhaustion, and correlate distributed traces to surface root causes faster than human analysis. MTTD drops dramatically with AI-augmented observability.',
    tools: ['Datadog AI', 'Dynatrace Davis', 'New Relic AI', 'PagerDuty AIOps'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'LLM-Augmented On-Call', icon: <TrendingUp size={20} />,
    desc: 'AI copilots for on-call engineers now surface relevant runbooks, suggest remediation actions, and generate incident summaries automatically. Engineers spend less time searching documentation and more time solving the actual problem.',
    tools: ['Incident.io AI', 'PagerDuty Copilot', 'Rootly AI', 'OpsGenie AI'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'eBPF for Deep System Observability', 'Platform Engineering & Internal Developer Platforms',
  'WebAssembly Edge Computing (Wasm)', 'FinOps & Cloud Cost Engineering',
  'Cilium & eBPF-based Networking', 'Chaos Engineering (Chaos Mesh, LitmusChaos)',
]

const PROS = [
  { title: 'The Infrastructure Beneath Everything', desc: 'Systems engineers power every product, every API call, and every user interaction. No software runs without the infrastructure systems engineers design, build, and operate. The role has foundational importance.' },
  { title: 'Exceptional Compensation at Scale', desc: 'Senior systems engineers and SREs earn R1.2M–R2.1M+ in South Africa. Cloud architects and platform engineers at global remote companies earn considerably more in USD.' },
  { title: 'Remote-First by Nature', desc: '62% of systems engineering roles are fully remote. Infrastructure work has zero physical dependency — production systems run the same whether you\'re in Johannesburg or Tokyo.' },
  { title: 'Intellectually Deep Problems', desc: 'Distributed systems, consensus algorithms, network partitions, cache invalidation, and failure cascades are genuinely hard problems. Systems engineering attracts engineers who prefer depth over breadth.' },
  { title: 'Cross-Domain Impact', desc: 'Systems engineers interact with every team in engineering — security, data, product, platform. Your work enables the organisation. That central position confers both visibility and influence.' },
  { title: 'Skills That Transfer Globally', desc: 'Linux, Kubernetes, Terraform, and AWS fundamentals are universally in demand. Systems skills built today are relevant in every country, every industry, and every company size.' },
]

const CONS = [
  { title: 'On-Call Rotation Reality', desc: 'Production systems fail outside business hours. Senior systems engineers carry on-call responsibility that includes nights, weekends, and holidays. The mental load of on-call — even when incidents don\'t occur — is real.' },
  { title: 'Blame Asymmetry', desc: 'When infrastructure works perfectly, engineering moves fast and takes credit for shipping. When infrastructure fails, systems engineers are front and centre. The accountability is real; the recognition is often not.' },
  { title: 'Rapid Tooling Churn', desc: 'Kubernetes, Helm, Argo, Flux, Cilium, Crossplane — the CNCF landscape evolves at an exhausting pace. Staying current requires consistent annual investment in learning new tooling.' },
  { title: 'Hidden Complexity Debt', desc: 'Every shortcut taken in infrastructure configuration compounds silently. Technical debt in infrastructure manifests as cascading failures during peak load, not gradual degradation. Cleaning it up is expensive and risky.' },
  { title: 'Difficult to Demo', desc: 'Systems work is hard to showcase to non-technical stakeholders. A 99.99% uptime quarter is invisible. A 30-minute outage is highly visible. The asymmetry between visible failure and invisible success is a career frustration.' },
  { title: 'Vendor Lock-In Decisions', desc: 'Every cloud-native architecture decision creates long-term vendor dependency. Managing multi-cloud or avoiding lock-in requires careful upfront architecture that conflicts with the speed engineering teams demand.' },
]

const VIDEOS = [
  { id: 'a3e4-jUXMbE', title: 'DevOps Engineering Full Course', desc: 'Complete DevOps and systems engineering course covering Linux, Docker, Kubernetes, CI/CD, cloud platforms, monitoring, and infrastructure automation from the ground up.', dur: '10:25:00', channel: 'TechWorld with Nana' },
  { id: 'X48VuDVv0do', title: 'Kubernetes Full Course for Beginners', desc: 'Master Kubernetes from pod basics to production deployments, Helm charts, RBAC, and cluster operations. The definitive beginner-to-practitioner Kubernetes course.', dur: '3:31:00', channel: 'TechWorld with Nana' },
  { id: 'YMXwThdmIkM', title: 'Site Reliability Engineering (SRE) Explained', desc: 'Google SRE principles explained: SLIs, SLOs, error budgets, toil reduction, incident management, and how to implement reliability engineering at scale.', dur: '45:00', channel: 'Google Cloud Tech' },
]

const TAKEAWAYS = [
  'Build a homelab or use free cloud credits to practise — systems skills only develop through hands-on infrastructure work, never through reading alone',
  'Earn the CKA (Certified Kubernetes Administrator) as your first serious certification — it is the most respected credential in modern systems engineering',
  'Write post-mortems for everything that breaks in your lab — the discipline of blameless post-mortems is the most transferable SRE skill you can develop',
  'Learn to read distributed traces — engineers who can navigate a full request trace across 12 microservices are invaluable during production incidents',
  'Automate before the second time — every manual procedure you document should become a script. Toil elimination is the systems engineer\'s primary contribution to engineering culture',
]

const CAREER_FACTS = [
  {
    icon: <Server size={20} />, title: 'What You Build & Operate',
    desc: 'Cloud infrastructure, Kubernetes clusters, CI/CD pipelines, monitoring stacks, networking layers, database platforms, security controls, and the automation that makes all of it reproducible and reliable at scale.',
    color: '#0f766e',
  },
  {
    icon: <Activity size={20} />, title: 'Core Activities',
    desc: 'Infrastructure as code development, Kubernetes cluster management, CI/CD pipeline design, incident response and post-mortems, capacity planning, SLO definition and monitoring, and elimination of operational toil.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Development teams deploying services onto your platform, security engineers hardening your infrastructure, data engineers consuming your databases, product managers impacted by outages, and finance teams reviewing your cloud bills.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'The shift to cloud-native architectures has created massive structural demand for systems engineers. Every company operating at scale needs engineers who can design, automate, and reliably operate complex distributed infrastructure.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '⚙️', title: 'You Make Everything Else Possible', desc: 'No code ships without infrastructure. No feature runs without the systems you build and operate. Systems engineers are the foundation upon which every product in the organisation stands.' },
  { emoji: '💰', title: 'Among the Highest Engineering Salaries', desc: 'Senior SREs and cloud architects earn R1.2M–R2.1M+ in South Africa. Platform engineers and infrastructure architects at global remote companies earn significantly more in USD.' },
  { emoji: '🌍', title: 'Fully Remote by Default', desc: '62% of systems engineering roles are fully remote. Production infrastructure runs the same from any location. South African systems engineers routinely work for US and EU companies at international rates.' },
  { emoji: '🧩', title: 'Genuinely Hard, Genuinely Satisfying', desc: 'Designing a distributed system that survives regional cloud failures, diagnosing a cascading incident across 40 microservices, or eliminating the last manual step in a deployment pipeline — these are deeply satisfying engineering achievements.' },
  { emoji: '📈', title: 'Path to Staff / Principal Architecture', desc: 'Senior SRE → Staff Infrastructure Engineer → Principal Systems Architect is one of the highest-compensation and most intellectually respected career paths in all of engineering.' },
  { emoji: '🔧', title: 'Deep Cross-Domain Expertise', desc: 'Systems engineers develop deep expertise in networking, security, storage, compute, databases, and distributed systems simultaneously. This breadth of knowledge makes systems engineers some of the most technically rounded engineers in any organisation.' },
]

const FREE_RESOURCES = [
  { category: 'Linux & Infrastructure', color: '#0f766e', bgColor: '#f0fdfa', items: [
    { name: 'Linux Journey (free interactive tutorials)', url: '#', type: 'Tutorial', rating: 5 },
    { name: 'The Linux Command Line (free PDF)', url: '#', type: 'Book', rating: 5 },
    { name: 'OverTheWire: Bandit (free Linux labs)', url: '#', type: 'Lab', rating: 5 },
    { name: 'Killercoda (free interactive K8s labs)', url: '#', type: 'Lab', rating: 5 },
  ]},
  { category: 'Cloud & Kubernetes', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'AWS Free Tier (12 months free)', url: '#', type: 'Platform', rating: 5 },
    { name: 'Kubernetes Official Docs & Tasks', url: '#', type: 'Docs', rating: 5 },
    { name: 'TechWorld with Nana YouTube (free)', url: '#', type: 'YouTube', rating: 5 },
    { name: 'Terraform Official Get Started Guides', url: '#', type: 'Tutorial', rating: 5 },
  ]},
  { category: 'SRE & Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'Google SRE Books (free online)', url: '#', type: 'Book', rating: 5 },
    { name: 'CNCF Landscape (free reference)', url: '#', type: 'Reference', rating: 5 },
    { name: 'r/devops & r/sysadmin', url: '#', type: 'Forum', rating: 4 },
    { name: 'Ship It! Podcast — Infrastructure Engineering', url: '#', type: 'Podcast', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Systems / SRE', range: 'R350k – R600k', midpoint: 475, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Systems / Infrastructure Engineer', range: 'R700k – R1.3M', midpoint: 1000, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Systems / SRE', range: 'R1.2M – R2.1M', midpoint: 1650, yoe: '5–8 yrs', color: '#0f766e' },
  { role: 'Principal / Staff Infrastructure Architect', range: 'R2.2M – R4M+', midpoint: 2900, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Skipping Deep Linux Before Cloud',
    desc: 'Jumping directly to cloud platforms and Kubernetes without solid Linux fundamentals means hitting walls you cannot debug. Cloud is just Linux at scale — you cannot bypass the foundation.',
    fix: 'Spend 2–3 months on Linux before touching a cloud console. If you cannot explain what systemd does, what /proc contains, and how iptables works, Linux is not yet your foundation.',
  },
  {
    num: '02', title: 'Treating Infrastructure as a Ticket Queue',
    desc: 'Systems engineers who only respond to requests — "provision this server, update this config" — never develop the architectural thinking that defines senior engineering. Reactive work crowds out strategic infrastructure improvement.',
    fix: 'Allocate 20% of your time to proactive work: eliminating toil, improving observability, or building platform capabilities that prevent future incidents.',
  },
  {
    num: '03', title: 'No Observability on Your Own Infrastructure',
    desc: 'Building infrastructure without metrics, logs, and traces means flying blind. You won\'t know something is degrading until it fails completely — and you\'ll have no signal to guide your diagnosis.',
    fix: 'Add Prometheus and Grafana to every project you build, including your homelab. Practice building dashboards before you need them in production.',
  },
  {
    num: '04', title: 'Manual Everything, Automated Nothing',
    desc: 'Creating infrastructure by clicking in the cloud console instead of writing Terraform means you have environments that cannot be reproduced, audited, or version-controlled. Manual infrastructure is fragile infrastructure.',
    fix: 'Write Terraform for every cloud resource you create, even in your personal lab. Never click to create something you\'ll use more than once.',
  },
  {
    num: '05', title: 'No Incident Management Discipline',
    desc: 'Responding to incidents without structured communication, clear ownership, and written timelines results in chaos, slow resolution, and no organisational learning. Most systems engineers never practise incident management until they\'re in one.',
    fix: 'Write a post-mortem for every significant failure in your lab. Treat your personal infrastructure like production from day one.',
  },
  {
    num: '06', title: 'Ignoring Security in Infrastructure Design',
    desc: 'Infrastructure security is not a separate concern — it\'s an architectural constraint that shapes every design decision. IAM policies, network segmentation, secrets management, and encryption at rest are not optional.',
    fix: 'Before provisioning any cloud environment, design the IAM model, define network boundaries, and plan secrets management. Security is architecture, not afterthought.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Backend / Software Developer',
    ease: 'Natural Transition', easeColor: '#0f766e', easeBg: '#f0fdfa',
    desc: 'You understand the software that runs on the infrastructure. Learning the infrastructure itself is a natural extension. Your debugging skills, scripting ability, and system-level thinking are genuine assets in systems engineering.',
    steps: ['Deep-dive Linux administration — use Ubuntu for 30 days as your primary dev environment', 'Learn Docker thoroughly — containerise all your existing projects', 'Complete HashiCorp\'s Terraform Getting Started guide', 'Earn AWS Cloud Practitioner then Solutions Architect Associate'],
  },
  {
    from: 'Network / IT Administrator',
    ease: 'Very Natural Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Your networking fundamentals and systems administration experience are the core of systems engineering. Add cloud platforms, infrastructure as code, and container orchestration to transition into a modern systems engineering role.',
    steps: ['Translate your on-premise skills to cloud: VPC = your network, EC2 = your servers', 'Learn Terraform to define in code what you currently configure manually', 'Earn AWS Solutions Architect Associate or Google Cloud Associate Engineer', 'Target cloud infrastructure or hybrid cloud engineering roles'],
  },
  {
    from: 'Security / IT Analyst',
    ease: 'Strong Foundation', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Your security mindset and understanding of network perimeters gives you a genuine advantage in infrastructure design. Systems engineering with a security focus — cloud security architecture, zero-trust networking — is one of the highest-paid specialisations.',
    steps: ['Build a homelab running Kubernetes with proper RBAC and network policies', 'Learn Terraform with a focus on IAM, security groups, and encryption', 'Study cloud security architecture (AWS Security Specialty or GCP PCSE)', 'Target cloud security architecture or DevSecOps engineering roles'],
  },
  {
    from: 'Other Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Systems engineering is learnable from any background. The combination of free cloud trial credits, excellent free documentation, and hands-on lab platforms like Killercoda and Play with Kubernetes makes self-directed learning highly effective.',
    steps: ['Start with Linux Journey and The Linux Command Line (free)', 'Set up an AWS free-tier account and build a web server from scratch', 'Complete TechWorld with Nana\'s full Docker and Kubernetes courses', 'Earn AWS Cloud Practitioner then apply to junior DevOps or SRE roles'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Linux & Shell Mastery', color: '#0f766e', bg: '#f0fdfa', days: [
    { day: 'Day 1–2', task: 'Install Ubuntu (WSL2 or dual-boot). Navigate the filesystem, manage users and permissions, and run services with systemd. Read man pages for every command you use.' },
    { day: 'Day 3–4', task: 'Shell scripting fundamentals: variables, loops, conditionals, functions. Write a script that automates a system administration task (e.g., automated backup with logging).' },
    { day: 'Day 5–6', task: 'Networking tools: use netstat, ss, tcpdump, curl, dig, and nmap. Capture and analyse a packet trace. Understand what happens during a TCP connection establishment.' },
    { day: 'Day 7', task: 'Set up a Linux web server (Nginx) with TLS. Configure a systemd service, enable log rotation, and set up basic firewall rules with ufw. Document the full setup as a runbook.' },
  ]},
  { week: 'Week 2', theme: 'Cloud & Infrastructure as Code', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Create an AWS free-tier account. Manually create a VPC, subnets, security groups, an EC2 instance, and an S3 bucket. Understand what each resource does and how they connect.' },
    { day: 'Day 10–11', task: 'Install Terraform. Write Terraform code to recreate everything you just built manually. Plan, apply, and destroy. Understand state files.' },
    { day: 'Day 12–13', task: 'Build a Terraform module for a reusable VPC with public and private subnets. Add variables, outputs, and a remote state backend (S3 + DynamoDB lock).' },
    { day: 'Day 14', task: 'Tear down your manually created infrastructure and recreate it entirely via Terraform. Document the infrastructure in a README with an architecture diagram.' },
  ]},
  { week: 'Week 3', theme: 'Containers & Kubernetes', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Docker fundamentals: build a Dockerfile, create a container, push to Docker Hub. Understand layers, volumes, and networking between containers.' },
    { day: 'Day 17–18', task: 'Install minikube or use Killercoda. Deploy a pod, create a deployment, expose it with a service, and configure an ingress. Understand how each K8s object relates.' },
    { day: 'Day 19–20', task: 'Write Kubernetes YAML manifests from scratch. Deploy a multi-container application with a backend service, frontend deployment, and ConfigMaps for configuration.' },
    { day: 'Day 21', task: 'Deploy your Terraform infrastructure to AWS, then deploy a containerised application to a lightweight managed Kubernetes cluster. Wire them together end-to-end.' },
  ]},
  { week: 'Week 4', theme: 'Observability & Apply', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Deploy Prometheus and Grafana to your Kubernetes cluster using Helm. Create a dashboard monitoring your application\'s request rate, error rate, and latency (RED method).' },
    { day: 'Day 25–26', task: 'Set up log aggregation with Loki and Grafana. Write a runbook for your most likely failure scenario. Simulate a failure and practice using your observability stack to diagnose it.' },
    { day: 'Day 27–28', task: 'Create a GitHub repository with all your Terraform, Kubernetes manifests, and automation scripts. Write a comprehensive README. This is your portfolio.' },
    { day: 'Day 29–30', task: 'Register for AWS Cloud Practitioner or CKA exam. Update LinkedIn with your homelab project. Apply to 5 junior SRE or cloud infrastructure roles.' },
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
  const handleShare = async () => { if (navigator.share) { try { await navigator.share({ title: 'Systems Engineer Career Roadmap 2026', url: window.location.href }) } catch (_) {} } else { handleCopy() } }
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-10 p-4 rounded-2xl" style={{ background: '#f8f9ff', border: `1px solid ${C.border}` }}>
      <span className="text-xs font-semibold" style={{ color: C.textMuted }}>Share this roadmap:</span>
      <button onClick={handleCopy} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: copied ? 'rgba(22,163,74,0.1)' : C.primaryLight, color: copied ? '#16a34a' : C.primary, outline: 'none' }}>{copied ? <CheckCheck size={13} /> : <Copy size={13} />}{copied ? 'Copied!' : 'Copy Link'}</button>
      <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: C.violetLight, color: C.violet, outline: 'none' }}><Download size={13} />Download PDF</button>
      <button onClick={handleShare} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: C.orangeLight, color: C.orange, outline: 'none' }}><Share2 size={13} />Share</button>
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono truncate max-w-xs" style={{ background: '#f1f5f9', color: C.textMuted, border: `1px solid ${C.border}` }}><Link2 size={11} style={{ color: C.textFaint, flexShrink: 0 }} /><span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/systems-engineer'}</span></div>
    </div>
  )
}

function SectionHeader({ icon, title, subtitle, iconBg, iconColor }: { icon: React.ReactNode; title: string; subtitle: string; iconBg: string; iconColor: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg }}><span style={{ color: iconColor }}>{icon}</span></div>
      <div><div className="text-2xl font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>{title}</div><div className="text-xs" style={{ color: C.textMuted }}>{subtitle}</div></div>
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

export default function SystemsEngineerRoadmapPage() {
  const progressRef = useRef<HTMLDivElement>(null)
  const tlSectionRef = useRef<HTMLElement>(null)
  const barsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => { const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap'; document.head.appendChild(link) }, [])
  useEffect(() => { const ctx = gsap.context(() => { if (progressRef.current) gsap.fromTo(progressRef.current, { width: '0%' }, { width: '100%', duration: 2.2, ease: 'power2.out', scrollTrigger: { trigger: tlSectionRef.current, start: 'top 72%', toggleActions: 'play none none reverse' } }) }); return () => ctx.revert() }, [])
  useEffect(() => { const ctx = gsap.context(() => { const bars = barsContainerRef.current?.querySelectorAll<HTMLElement>('[data-bar-w]'); bars?.forEach(bar => { gsap.fromTo(bar, { width: '0%' }, { width: `${bar.dataset.barW}%`, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: bar, start: 'top 92%', toggleActions: 'play none none reverse' } }) }) }); return () => ctx.revert() }, [])

  const introRef = useFade(); const whatRef = useFade(); const whyRef = useFade()
  const tlRef = useFade(); const stepsRef = useFade(); const skillsRef = useFade()
  const eduRef = useFade(); const freeRef = useFade(); const dayRef = useFade()
  const pcRef = useFade(); const aiRef = useFade(); const salaryRef = useFade()
  const mistakesRef = useFade(); const changeRef = useFade(); const planRef = useFade()
  const finalRef = useFade(); const vidsRef = useFade()

  const sectionStyle = { paddingTop: 72, paddingBottom: 72, borderBottomColor: C.border }

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.text, fontFamily: 'Inter, sans-serif' }}>
      <Link to="/roadmaps" className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold no-underline transition-all duration-200" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', border: `1px solid ${C.border}`, color: C.textMuted, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}><ArrowLeft size={14} /> All Roadmaps</Link>

      {/* HERO */}
      <div className="relative w-full" style={{ background: C.bg }}>
        <div className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: 600 }}>
          <img src="https://i.imgur.com/FO6AGoY.jpeg" alt="Systems Engineer server infrastructure" className="w-full h-full object-cover object-center block" style={{ filter: 'saturate(0.55) brightness(1.05)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}><Server size={12} /> Infrastructure & Reliability</div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>Systems Engineer</h1>
              <span className="block font-normal mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', color: C.textMuted }}>Career Roadmap 2026</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><Clock size={14} style={{ color: C.textFaint }} /> 20 min read</div>
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><BookOpen size={14} style={{ color: C.textFaint }} /> 16 sections</div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-8 pt-6 pb-16">
          <p className="text-base leading-relaxed" style={{ color: '#4b5563', maxWidth: 560, marginLeft: 140 }}>Build the infrastructure that never sleeps. Systems engineers design, automate, and operate the cloud platforms, Kubernetes clusters, and reliability frameworks that power every product at scale — the invisible foundation everything else depends on.</p>
          <div className="h-px mt-10" style={{ background: C.border }} />
        </div>
      </div>

      {/* TOC */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={introRef}><SectionHeader icon={<BookOpen size={22} />} title="What's Inside" subtitle="Everything you need to know about this career in one place" iconBg={C.primaryLight} iconColor={C.primary} /><div className="grid grid-cols-2 md:grid-cols-4 gap-2">{TOC_ITEMS.map(item => (<div key={item.num} className="flex items-center gap-2.5 rounded-xl px-3.5 py-3 border transition-all duration-150 cursor-default hover:shadow-sm" style={{ background: C.bg, borderColor: C.border }}><span className="font-mono text-xs font-bold flex-shrink-0" style={{ color: C.textFaint }}>{item.num}</span><span className="text-xs font-medium" style={{ color: C.text }}>{item.label}</span></div>))}</div></div></div>
      </section>

      {/* WHAT */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={whatRef}>
          <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Systems Engineering" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)' }}>
            <p className="text-base leading-relaxed" style={{ color: '#374151' }}>A <strong style={{ color: C.primary }}>Systems Engineer</strong> (also called SRE, DevOps Engineer, or Infrastructure Engineer) designs, builds, and operates the technical infrastructure that keeps software systems running reliably at scale. This includes cloud platforms, container orchestration, CI/CD pipelines, monitoring and alerting, and the automation that eliminates manual operational toil. Systems engineers bridge the gap between software development and production operations — and their work determines whether the rest of engineering can ship confidently.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{CAREER_FACTS.map(f => (<div key={f.title} className="flex gap-4 rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style={{ background: C.bg, borderColor: C.border }}><div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${f.color}12` }}><span style={{ color: f.color }}>{f.icon}</span></div><div><div className="text-sm font-bold mb-1.5" style={{ color: C.text }}>{f.title}</div><div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{f.desc}</div></div></div>))}</div>
        </div></div>
      </section>

      {/* WHY */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={whyRef}><SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Systems Engineering could be your best move" iconBg={C.orangeLight} iconColor={C.orange} /><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{WHY_REASONS.map(r => (<div key={r.title} className="rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style={{ background: C.bg, borderColor: C.border }}><div className="flex items-start gap-3"><div className="text-2xl flex-shrink-0">{r.emoji}</div><div><div className="text-sm font-bold mb-1.5" style={{ color: C.text }}>{r.title}</div><div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{r.desc}</div></div></div></div>))}</div></div></div>
      </section>

      {/* DAY */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={dayRef}><SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Systems Engineer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
          <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
            <div><p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>{SCHEDULE.map(item => (<div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,118,110,0.3)'; (e.currentTarget as HTMLElement).style.background = '#f0fdfa' }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.background = C.bg }}><div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: C.primaryLight, color: C.primary }}>{item.icon}</div><div className="flex-1 min-w-0"><div className="flex items-center justify-between gap-2 mb-0.5"><span className="text-sm font-semibold" style={{ color: C.text }}>{item.act}</span><span className="text-xs flex-shrink-0" style={{ color: C.textMuted }}>{item.duration}</span></div><div className="text-xs" style={{ color: C.textMuted }}>{item.desc}</div></div><span className="font-mono text-xs flex-shrink-0" style={{ color: C.primary }}>{item.time}</span></div>))}</div>
            <div><div className="rounded-2xl p-5 mb-4 border" style={{ background: '#f8f9ff', borderColor: C.border }}><div className="text-sm font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Tools & Tech</div><div className="flex flex-wrap">{TOOLS.map(t => (<span key={t.name} className="inline-block rounded-lg px-2.5 py-1.5 mr-1.5 mb-2 border" style={{ background: C.bg, borderColor: C.border }}><span className="text-xs font-semibold" style={{ color: C.text }}>{t.name}</span><span className="text-xs" style={{ color: C.textFaint }}> ({t.cat})</span></span>))}</div></div>
              <div className="rounded-2xl p-5 border" style={{ background: '#f8f9ff', borderColor: C.border }}><div className="text-sm font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Work Environment</div>{WORK_ENVS.map(e => (<div key={e.type} className="mb-3.5"><div className="flex justify-between text-xs mb-1.5"><span style={{ color: C.textMuted }}>{e.type}</span><span className="font-mono" style={{ color: C.primary }}>{e.pct}%</span></div><div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}><div className="h-1.5 rounded-full" style={{ width: `${e.pct}%`, background: C.primary }} /></div></div>))}<div className="text-xs mt-2" style={{ color: C.textFaint }}>Based on 2026 industry surveys</div></div></div>
          </div>
        </div></div>
      </section>

      {/* TIMELINE */}
      <section ref={tlSectionRef} className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={tlRef}><SectionHeader icon={<Clock size={22} />} title="Career Timeline" subtitle="Time estimates and salary ranges for each level" iconBg={C.indigoLight} iconColor={C.indigo} />
          <div className="mb-10"><div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → Principal Architect</span></div><div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}><div ref={progressRef} className="h-1.5 rounded-full" style={{ width: '0%', background: 'linear-gradient(90deg, #0891b2 0%, #16a34a 33%, #0f766e 66%, #ea580c 100%)' }} /></div><div className="flex justify-between mt-2.5">{CAREER_LEVELS.map(l => <span key={l.level} className="font-mono" style={{ color: l.accent, fontSize: '0.68rem' }}>{l.duration}</span>)}</div></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">{CAREER_LEVELS.map(l => (<div key={l.level} className="rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg" style={{ background: C.bg, borderColor: l.accentBorder }}><div className="inline-block rounded-full px-2.5 py-0.5 mb-3 font-mono text-xs font-bold uppercase tracking-widest" style={{ background: l.accentBg, color: l.accent }}>{l.level}</div><div className="text-base font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>{l.title}</div><div className="text-sm font-semibold mb-2.5" style={{ color: l.accent }}>{l.salary}</div><div className="text-xs leading-relaxed mb-3.5" style={{ color: C.textMuted }}>{l.description}</div><div className="flex flex-wrap gap-1.5">{l.skills.map(s => <span key={s} className="rounded px-1.5 py-0.5 font-mono text-xs" style={{ background: '#f1f5f9', color: C.textMuted }}>{s}</span>)}</div></div>))}</div>
        </div></div>
      </section>

      {/* ROADMAP */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div ref={stepsRef} className="max-w-2xl mx-auto px-4">
          <SectionHeader icon={<Target size={22} />} title="Step-by-Step Roadmap" subtitle="Your path from complete beginner to job-ready" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="relative flex flex-col items-center">
            {ROADMAP_STEPS.map((s, i) => {
              const icons = ['🐧', '🌐', '☁️', '🏗️', '🐳', '📊']
              const accentColors = ['#0f766e', '#16a34a', '#0f766e', '#16a34a', '#0f766e', '#16a34a']
              const accent = accentColors[i]; const isLast = i === ROADMAP_STEPS.length - 1; const isEven = i % 2 === 0
              return (
                <div key={s.step} className="w-full flex flex-col items-center">
                  <div className="w-full" style={{ opacity: 0, transform: 'translateY(20px)', transition: `opacity 0.5s ${i * 0.13}s ease, transform 0.5s ${i * 0.13}s ease` }} ref={el => { if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect() } }, { threshold: 0.15 }); obs.observe(el) }}>
                    <div className="w-full rounded-3xl overflow-hidden" style={{ background: `${accent}08`, border: `2px solid ${accent}25`, boxShadow: `0 4px 24px ${accent}12` }}>
                      <div className="flex items-center gap-4 px-5 py-5">
                        <div className="flex-shrink-0 flex items-center justify-center rounded-full text-2xl font-bold" style={{ width: 64, height: 64, background: `linear-gradient(135deg, ${accent}20, ${accent}10)`, border: `3px solid ${accent}40` }}>{icons[i]}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap"><span className="text-xs font-black uppercase tracking-widest font-mono" style={{ color: accent }}>STEP {s.step}:</span><span className="text-xs rounded-full px-2 py-0.5 font-mono" style={{ background: `${accent}12`, color: accent }}>{s.duration}</span></div>
                          <div className="font-extrabold mb-2 leading-tight" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', color: C.text }}>{s.title.toUpperCase()}</div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1">{s.skills.map(sk => (<div key={sk} className="flex items-center gap-1.5 text-xs" style={{ color: C.textMuted }}><CheckCircle2 size={11} style={{ color: accent, flexShrink: 0 }} /><span className="font-mono uppercase tracking-wide" style={{ fontSize: '0.65rem' }}>{sk}</span></div>))}</div>
                        </div>
                      </div>
                      <div className="px-5 pb-4 text-xs leading-relaxed" style={{ color: C.textMuted, borderTop: `1px solid ${accent}15`, paddingTop: 10 }}>{s.description}</div>
                    </div>
                  </div>
                  {!isLast && (<div className="flex w-full" style={{ height: 48 }}><svg viewBox="0 0 400 48" className="w-full" style={{ height: 48 }} preserveAspectRatio="none"><path d={isEven ? 'M200,0 C200,24 380,24 380,48' : 'M200,0 C200,24 20,24 20,48'} fill="none" stroke="#e2e8f0" strokeWidth="40" strokeLinecap="round" /><path d={isEven ? 'M200,0 C200,24 380,24 380,48' : 'M200,0 C200,24 20,24 20,48'} fill="none" stroke={accentColors[i + 1] ?? accent} strokeWidth="4" strokeLinecap="round" strokeOpacity="0.4" strokeDasharray="12 8" />{isEven ? <polygon points="372,36 388,44 372,52" fill={accentColors[i + 1] ?? accent} opacity="0.5" /> : <polygon points="28,36 12,44 28,52" fill={accentColors[i + 1] ?? accent} opacity="0.5" />}</svg></div>)}
                </div>
              )
            })}
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.violet} 100%)`, boxShadow: '0 8px 48px rgba(15,118,110,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>12–16 months · Build real infrastructure · Automate everything you touch</div>
            </div>
          </div>
          <ShareBar />
        </div>
      </section>

      {/* SKILLS */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={skillsRef}><SectionHeader icon={<CheckCircle2 size={22} />} title="Skill Checkpoints" subtitle="Technical and interpersonal skills to develop" iconBg={C.indigoLight} iconColor={C.indigo} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-7 border" style={{ background: C.bg, borderColor: C.border }}>
              <div className="flex items-center gap-3 mb-6"><div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.primaryLight }}><Server size={16} style={{ color: C.primary }} /></div><div><div className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Hard Skills</div><div className="text-xs mt-0.5" style={{ color: C.textMuted }}>Technical competencies required</div></div></div>
              <div ref={barsContainerRef}>{HARD_SKILLS.map(s => (<div key={s.name} className="mb-4"><div className="flex justify-between mb-1.5"><span className="text-xs" style={{ color: C.textMuted }}>{s.name}</span><span className="text-xs font-mono" style={{ color: C.textFaint }}>{s.level}%</span></div><div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}><div className="h-1.5 rounded-full" data-bar-w={s.level} style={{ width: 0, background: `linear-gradient(90deg, ${C.primary}, ${C.violet})` }} /></div></div>))}</div>
            </div>
            <div className="rounded-2xl p-7 border" style={{ background: C.bg, borderColor: C.border }}>
              <div className="flex items-center gap-3 mb-6"><div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.indigoLight }}><MessageSquare size={16} style={{ color: C.indigo }} /></div><div><div className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Soft Skills</div><div className="text-xs mt-0.5" style={{ color: C.textMuted }}>Interpersonal abilities to build</div></div></div>
              {SOFT_SKILLS.map(s => (<div key={s.name} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border transition-colors cursor-default" style={{ background: '#f8f9ff', borderColor: C.border }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.primaryLight} onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#f8f9ff'}><div className="text-sm font-semibold mb-0.5" style={{ color: C.text }}>{s.name}</div><div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{s.description}</div></div>))}
            </div>
          </div>
        </div></div>
      </section>

      {/* EDU */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={eduRef}><SectionHeader icon={<GraduationCap size={22} />} title="Education Paths" subtitle="Three routes into the field — pick yours" iconBg="rgba(148,163,184,0.1)" iconColor={C.textMuted} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">{EDU_PATHS.map(p => (<div key={p.type} className="rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg" style={{ background: p.bgColor, borderColor: p.borderColor }}><div className="inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest mb-4 font-mono" style={{ background: p.typeBg, color: p.typeColor }}>{p.type}</div><div className="text-base font-bold mb-3.5" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>{p.title}</div><div className="flex gap-3.5 text-xs mb-4" style={{ color: C.textMuted }}><span className="flex items-center gap-1"><Clock size={11} />{p.duration}</span><span className="flex items-center gap-1"><DollarSign size={11} />{p.cost}</span></div><div className="text-xs font-bold mb-2" style={{ color: C.green }}>Advantages</div>{p.pros.map(item => <div key={item} className="flex items-start gap-2 text-xs mb-1.5" style={{ color: C.textMuted }}><Check size={11} style={{ color: C.green, flexShrink: 0, marginTop: 2 }} />{item}</div>)}<div className="text-xs font-bold mb-2 mt-3.5" style={{ color: C.red }}>Challenges</div>{p.cons.map(item => <div key={item} className="flex items-start gap-2 text-xs mb-1.5" style={{ color: C.textMuted }}><X size={11} style={{ color: C.red, flexShrink: 0, marginTop: 2 }} />{item}</div>)}</div>))}</div>
        </div></div>
      </section>

      {/* FREE RESOURCES */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={freeRef}><SectionHeader icon={<BookOpen size={22} />} title="Best Free Resources" subtitle="World-class learning material, most of it completely free" iconBg={C.greenLight} iconColor={C.green} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{FREE_RESOURCES.map(cat => (<div key={cat.category} className="rounded-2xl p-6 border" style={{ background: cat.bgColor, borderColor: `${cat.color}25` }}><div className="inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest mb-5 font-mono" style={{ background: `${cat.color}15`, color: cat.color }}>{cat.category}</div>{cat.items.map(item => (<div key={item.name} className="rounded-xl p-3 mb-2.5 last:mb-0 border" style={{ background: C.bg, borderColor: C.border }}><div className="flex items-start justify-between gap-2 mb-1"><span className="text-xs font-semibold" style={{ color: C.text }}>{item.name}</span><span className="text-xs rounded px-1.5 py-0.5 flex-shrink-0 font-mono" style={{ background: `${cat.color}12`, color: cat.color }}>{item.type}</span></div><div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < item.rating ? cat.color : 'none'} style={{ color: i < item.rating ? cat.color : C.textFaint }} />)}</div></div>))}</div>))}</div>
        </div></div>
      </section>

      {/* AI */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={aiRef}><SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Systems Engineering in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)', color: C.textMuted }}>AI is transforming systems engineering from reactive to predictive. Engineers who combine strong infrastructure fundamentals with AI-augmented observability, automated incident response, and intelligent capacity planning are operating at a fundamentally different level of effectiveness in 2026.</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-9">{AI_IMPACTS.map(item => (<div key={item.title} className="rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-1 hover:shadow-md" style={{ background: item.bgColor, borderColor: item.borderColor }}><div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: item.icoBg }}><span style={{ color: item.icoColor }}>{item.icon}</span></div><div className="text-sm font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif', color: item.titleColor }}>{item.title}</div><div className="text-xs leading-relaxed mb-3.5" style={{ color: C.textMuted }}>{item.desc}</div><div className="flex flex-wrap gap-1.5">{item.tools.map(t => <span key={t} className="rounded px-2 py-0.5 text-xs font-mono font-semibold" style={{ background: item.tagBg, color: item.tagColor }}>{t}</span>)}</div></div>))}</div>
          <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Emerging Skills to Learn Now</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">{FUTURE_SKILLS.map((s, i) => (<div key={s} className="flex items-center gap-2.5 rounded-xl px-4 py-3.5 border" style={{ background: '#f8f9ff', borderColor: C.border }}><div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-black text-xs" style={{ background: C.primaryLight, color: C.primary }}>{i + 1}</div><span className="text-xs font-medium" style={{ color: C.text }}>{s}</span></div>))}</div>
        </div></div>
      </section>

      {/* PROS CONS */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={pcRef}><SectionHeader icon={<Scale size={22} />} title="Pros & Cons" subtitle="The honest picture of this career path" iconBg="rgba(148,163,184,0.1)" iconColor={C.textMuted} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl p-7 border" style={{ background: '#f0fdf4', borderColor: 'rgba(22,163,74,0.2)' }}><div className="flex items-center gap-3 mb-5"><div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(22,163,74,0.12)' }}><ThumbsUp size={16} style={{ color: C.green }} /></div><span className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.green }}>Advantages</span></div>{PROS.map(p => (<div key={p.title} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border" style={{ background: C.bg, borderColor: 'rgba(22,163,74,0.12)' }}><div className="text-sm font-semibold mb-1" style={{ color: C.text }}>{p.title}</div><div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{p.desc}</div></div>))}</div>
            <div className="rounded-3xl p-7 border" style={{ background: '#fff5f5', borderColor: 'rgba(220,38,38,0.2)' }}><div className="flex items-center gap-3 mb-5"><div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(220,38,38,0.1)' }}><ThumbsDown size={16} style={{ color: C.red }} /></div><span className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.red }}>Challenges</span></div>{CONS.map(c => (<div key={c.title} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border" style={{ background: C.bg, borderColor: 'rgba(220,38,38,0.12)' }}><div className="text-sm font-semibold mb-1" style={{ color: C.text }}>{c.title}</div><div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{c.desc}</div></div>))}</div>
          </div>
        </div></div>
      </section>

      {/* SALARY */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={salaryRef}><SectionHeader icon={<DollarSign size={22} />} title="Salary" subtitle="What you can realistically earn at each stage" iconBg={C.greenLight} iconColor={C.green} />
          <div className="rounded-2xl p-6 mb-6 border" style={{ background: '#f0fdf4', borderColor: 'rgba(22,163,74,0.2)' }}><p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Senior systems engineers working remotely for US or European companies commonly earn 2–4× these figures in USD — especially in cloud architecture and SRE specialisations.</p></div>
          <div className="space-y-4">{SALARY_DATA.map(row => (<div key={row.role} className="rounded-2xl p-5 border" style={{ background: '#f8f9ff', borderColor: C.border }}><div className="flex items-center justify-between mb-3 flex-wrap gap-2"><div><span className="text-sm font-bold" style={{ color: C.text }}>{row.role}</span><span className="ml-3 text-xs font-mono" style={{ color: C.textFaint }}>{row.yoe}</span></div><span className="text-sm font-bold" style={{ color: row.color }}>{row.range}</span></div><div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}><div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 3800) * 100}%`, background: row.color }} /></div></div>))}</div>
          <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)' }}><p className="text-xs leading-relaxed" style={{ color: C.textMuted }}><strong style={{ color: C.primary }}>Pro tip:</strong> CKA-certified engineers and cloud architects with Terraform expertise command 25–40% salary premiums. The CKA is the highest-ROI certification in systems engineering — study for it within your first 18 months.</p></div>
        </div></div>
      </section>

      {/* MISTAKES */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={mistakesRef}><SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring systems engineers" iconBg={C.orangeLight} iconColor={C.orange} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{MISTAKES.map(m => (<div key={m.num} className="rounded-2xl p-5 border transition-all duration-200 hover:shadow-md" style={{ background: C.bg, borderColor: C.border }}><div className="flex items-start gap-3 mb-3"><span className="font-mono text-xs font-black flex-shrink-0 mt-0.5" style={{ color: C.textFaint }}>{m.num}</span><div><div className="text-sm font-bold mb-1.5" style={{ color: C.red }}>{m.title}</div><div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{m.desc}</div></div></div><div className="rounded-xl p-3 border-l-2 ml-5" style={{ background: '#f0fdf4', borderLeftColor: C.green }}><span className="text-xs font-bold" style={{ color: C.green }}>Fix: </span><span className="text-xs" style={{ color: C.textMuted }}>{m.fix}</span></div></div>))}</div>
        </div></div>
      </section>

      {/* CAREER CHANGE */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={changeRef}><SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into systems engineering from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{CAREER_CHANGE_PATHS.map(path => (<div key={path.from} className="rounded-2xl p-6 border" style={{ background: path.easeBg, borderColor: `${path.easeColor}20` }}><div className="flex items-center justify-between mb-3"><div className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>From: {path.from}</div><span className="text-xs rounded-full px-2.5 py-1 font-semibold" style={{ background: `${path.easeColor}15`, color: path.easeColor }}>{path.ease}</span></div><p className="text-xs leading-relaxed mb-4" style={{ color: C.textMuted }}>{path.desc}</p><div className="space-y-2">{path.steps.map((step, i) => (<div key={step} className="flex items-center gap-2.5 text-xs" style={{ color: C.text }}><div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: `${path.easeColor}20`, color: path.easeColor }}>{i + 1}</div>{step}</div>))}</div></div>))}</div>
        </div></div>
      </section>

      {/* 30 DAY */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={planRef}><SectionHeader icon={<Calendar size={22} />} title="30-Day Action Plan" subtitle="Exactly what to do in your first month. Start today." iconBg={C.orangeLight} iconColor={C.orange} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{THIRTY_DAY_PLAN.map(week => (<div key={week.week} className="rounded-2xl border overflow-hidden" style={{ background: C.bg, borderColor: C.border }}><div className="px-5 py-4 border-b" style={{ background: week.bg, borderBottomColor: `${week.color}20` }}><div className="flex items-center justify-between"><span className="text-sm font-bold" style={{ fontFamily: 'Syne, sans-serif', color: week.color }}>{week.week}</span><span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${week.color}15`, color: week.color }}>{week.theme}</span></div></div><div className="p-5">{week.days.map(d => (<div key={d.day} className="flex items-start gap-3 mb-3.5 last:mb-0"><span className="text-xs font-mono font-bold flex-shrink-0 pt-0.5" style={{ color: week.color }}>{d.day}</span><span className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{d.task}</span></div>))}</div></div>))}</div>
        </div></div>
      </section>

      {/* VIDEOS */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={vidsRef}><SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Systems Engineering" iconBg={C.redLight} iconColor={C.red} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{VIDEOS.map(v => (<div key={v.id} className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ background: '#f8f9ff', borderColor: C.border }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,118,110,0.3)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)' }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}><div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: '#0a0c1a' }}><img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} className="w-full h-full object-cover" style={{ opacity: 0.75 }} /><a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center no-underline"><div className="rounded-full flex items-center justify-center" style={{ width: 52, height: 52, background: 'rgba(15,118,110,0.9)' }}><Play size={20} fill="white" style={{ color: '#fff', marginLeft: 2 }} /></div></a><div className="absolute bottom-2 right-2 flex items-center gap-1 rounded px-2 py-1 text-xs text-white" style={{ background: 'rgba(0,0,0,0.75)' }}><Clock size={10} />{v.dur}</div></div><div className="p-4"><div className="text-sm font-semibold mb-1.5 leading-snug" style={{ color: C.text }}>{v.title}</div><div className="text-xs leading-relaxed mb-3" style={{ color: C.textMuted }}>{v.desc}</div><div className="flex items-center justify-between"><span className="text-xs" style={{ color: C.textFaint }}>{v.channel}</span><a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs no-underline" style={{ color: C.indigo }}>Watch <ExternalLink size={11} /></a></div></div></div>))}</div>
        </div></div>
      </section>

      {/* FINAL */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={finalRef}><SectionHeader icon={<Award size={22} />} title="Final Thoughts" subtitle="What we want you to take away from this guide" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="rounded-2xl p-6 border mb-8" style={{ background: C.bg, borderColor: C.border }}><p className="text-base leading-relaxed mb-4" style={{ color: '#374151' }}>Systems engineering is the discipline that <strong style={{ color: C.primary }}>makes everything else possible</strong>. The engineers who design reliable infrastructure, automate operational toil, and maintain the observability that lets teams deploy with confidence — these are the professionals every engineering organisation needs and cannot afford to lose.</p><p className="text-base leading-relaxed" style={{ color: '#374151' }}>The fastest path in is through a real homelab and a cloud free tier account — not certification videos watched passively. Build real infrastructure. Break it deliberately. Fix it completely. Document the failure as a post-mortem. That hands-on discipline is what separates systems engineers from system administrators.</p></div>
          <div className="grid grid-cols-1 gap-3">{TAKEAWAYS.map((t, i) => (<div key={t} className="flex items-center gap-3.5 rounded-xl px-5 py-3.5 border" style={{ background: C.bg, borderColor: C.border }}><div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-black text-xs" style={{ background: C.primaryLight, color: C.primary }}>{i + 1}</div><span className="text-sm" style={{ color: C.text }}>{t}</span></div>))}</div>
        </div></div>
      </section>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-8" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="relative overflow-hidden rounded-3xl px-12 py-16 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.violet} 100%)` }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: 'rgba(255,255,255,0.05)', top: -120, right: -80 }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(255,255,255,0.15)' }}><Rocket size={30} style={{ color: '#fff' }} /></div>
          <h2 className="font-extrabold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>Ready to Build the Infrastructure?</h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>You have the roadmap. You have the resources. You have the 30-day plan. Open your terminal, spin up Ubuntu, and build something that runs in production today.</p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>Explore More Roadmaps <ArrowRight size={16} /></Link>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>Get Career Advice</a>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start building today. Your future self — and your production systems — will thank you.</p>
        </div>
        <ShareBar />
      </div>
    </div>
  )
}