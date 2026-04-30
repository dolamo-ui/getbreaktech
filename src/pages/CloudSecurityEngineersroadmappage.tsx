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
  Layers, FileText, Layout,
  Cloud,
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
  primary: '#0369a1',         // blue/cyan — cloud brand colour
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

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const CAREER_LEVELS = [
  {
    level: 'Junior', title: 'Junior Cloud Security Engineer', duration: '0–2 yrs', salary: 'R380k–R620k',
    description: 'Deploy security controls in cloud environments under guidance. Configure firewalls, implement identity management, and learn cloud provider security services. Strong mentorship accelerates your growth.',
    skills: ['AWS/Azure Basics', 'IAM', 'Security Groups', 'Cloud Config'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Cloud Security Engineer', duration: '2–5 yrs', salary: 'R750k–R1.3M',
    description: 'Design and implement cloud security architectures. Own cloud infrastructure security, lead compliance implementations, and architect security solutions across multiple cloud environments and teams.',
    skills: ['Multi-cloud Architecture', 'Compliance', 'Infrastructure Security', 'Automation'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Cloud Security Engineer', duration: '5–8 yrs', salary: 'R1.3M–R2.1M',
    description: 'Architect enterprise cloud security strategies, establish security standards, lead organizational cloud security program, and make architectural decisions that protect millions of cloud resources and users.',
    skills: ['Enterprise Architecture', 'Policy Dev', 'Risk Management', 'Team Leadership'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Principal', title: 'Principal Cloud Security Architect', duration: '8+ yrs', salary: 'R2.2M–R4M+',
    description: 'Define cloud security vision across the organization. Make strategic decisions that balance security, compliance, and business agility. Shape how the entire company builds securely in the cloud.',
    skills: ['Strategic Vision', 'Cloud Strategy', 'Governance', 'Executive Leadership'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Cloud Fundamentals & AWS/Azure Basics',
    description: 'Understand cloud computing models (IaaS, PaaS, SaaS), cloud service providers, and their security models. Learn core AWS or Azure services: EC2, S3, VPC, IAM, storage, networking, and databases.',
    duration: '2–3 months', skills: ['AWS / Azure', 'Cloud Models', 'Core Services', 'Basic Networking'],
  },
  {
    step: 2, title: 'Cloud Security & Identity Management',
    description: 'Master cloud-native security: IAM policies and roles, authentication/authorization, encryption, network security, VPCs, and security groups. Understand cloud-specific threat models and defences.',
    duration: '2–3 months', skills: ['IAM Deep Dive', 'Encryption', 'Network Security', 'Authentication'],
  },
  {
    step: 3, title: 'Infrastructure as Code & Automation',
    description: 'Learn Infrastructure as Code (Terraform, CloudFormation, Bicep). Automate security controls, compliance checking, and infrastructure deployment. Security at scale requires automation.',
    duration: '2–3 months', skills: ['Terraform', 'CloudFormation', 'Python/Bash', 'CI/CD Security'],
  },
  {
    step: 4, title: 'Cloud Compliance & Governance',
    description: 'Study compliance frameworks relevant to cloud: SOC2, ISO27001, HIPAA, GDPR, PCI-DSS. Implement compliance controls, audit trails, and policy enforcement. Understand cloud-specific compliance challenges.',
    duration: '2 months', skills: ['Compliance Frameworks', 'Auditing', 'Policy Enforcement', 'Governance'],
  },
  {
    step: 5, title: 'Multi-Cloud & Advanced Security Architecture',
    description: 'Extend to multiple cloud providers (AWS, Azure, GCP). Design security across hybrid and multi-cloud environments. Study advanced topics: containers, serverless security, and cloud-native architecture patterns.',
    duration: '2–3 months', skills: ['Multi-cloud Design', 'Containers/K8s', 'Serverless Security', 'Advanced Patterns'],
  },
  {
    step: 6, title: 'Cloud Incident Response & Logging',
    description: 'Master cloud logging (CloudTrail, Azure Monitor, Stack Driver). Design cloud security monitoring and incident response. Understand cloud-specific attack vectors and how to detect them at scale.',
    duration: '2–3 months', skills: ['Logging & Monitoring', 'Cloud Incident Response', 'Threat Detection', 'Forensics'],
  },
]

const HARD_SKILLS = [
  { name: 'AWS / Azure / GCP Platform Knowledge', level: 92 },
  { name: 'Cloud Identity & Access Management', level: 90 },
  { name: 'Infrastructure as Code (Terraform)', level: 85 },
  { name: 'Cloud Networking & Security Architecture', level: 84 },
  { name: 'Compliance & Governance Frameworks', level: 80 },
  { name: 'Container Security (Docker / Kubernetes)', level: 78 },
  { name: 'Encryption & Data Protection', level: 76 },
  { name: 'Cloud Incident Response & Forensics', level: 74 },
]

const SOFT_SKILLS = [
  { name: 'Strategic Thinking', description: 'Cloud security is business enablement. Understand how to balance security, compliance, and business agility. Great cloud security engineers make security the accelerant, not the brake.' },
  { name: 'Cross-Team Collaboration', description: 'Work with platform teams, developers, DevOps, and architects. Cloud security succeeds through collaboration. Isolation creates insecurity. Build strong relationships across teams.' },
  { name: 'Change Management', description: 'Cloud adoption requires cultural change. Help teams adopt security practices without slowing innovation. Be the bridge between security perfection and business reality.' },
  { name: 'Deep Curiosity', description: 'Cloud services evolve weekly. New services, new attack vectors, new defences. Relentless learning and experimentation are non-negotiable. Stay obsessed with cloud technology.' },
  { name: 'Communication at All Levels', description: 'Explain cloud security to executives, architects, and developers differently. Translate between business language, technical depth, and implementation details seamlessly.' },
  { name: 'Problem-Solving Under Constraints', description: 'Cloud brings new constraints. Build secure solutions within cloud limitations. Cost, performance, and security trade-offs are constant. Navigate them skillfully.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Computer Science / Cloud degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(3,105,161,0.2)', bgColor: '#f0f7ff', typeBg: 'rgba(3,105,161,0.12)', typeColor: '#0369a1',
    pros: ['Deep networking and systems foundation', 'Respected by enterprise employers', 'Access to cloud lab environments', 'Peer network of strong engineers'],
    cons: ['Dated cloud curriculum often', 'Slow path to first job', 'Expensive and time-consuming', 'Outdated by graduation'],
  },
  {
    type: 'Bootcamp', title: 'Cloud Security Bootcamp', duration: '3–6 months', cost: 'R80k – R160k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Fast path to job-ready skills', 'Hands-on cloud labs with real tools', 'Industry-current curriculum', 'Career placement assistance'],
    cons: ['Requires AWS/programming background', 'Limited depth on networking', 'Bootcamp credential alone limited', 'Quality varies significantly'],
  },
  {
    type: 'Certifications', title: 'Cloud Certifications (AWS/Azure)', duration: '6–18 months', cost: 'R20k – R50k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['Industry-recognized credentials', 'Study while working (flexible)', 'Current technology always', 'Cost-effective path'],
    cons: ['Requires strong fundamentals first', 'No guaranteed job placement', 'Lab costs can add up ($100-300/mo)', 'Continuous recertification needed'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Cloud Infrastructure Review', desc: 'Check cloud security dashboards, review recent deployments, and scan for misconfigurations or non-compliance issues in production.', duration: '45 min', icon: <Cloud size={14} /> },
  { time: '9:45', act: 'Architecture & Design Reviews', desc: 'Review security designs for new projects. Advise on threats, compliance implications, and security implementation patterns. Make big decisions early.', duration: '1.5 hrs', icon: <Layout size={14} /> },
  { time: '11:15', act: 'Compliance & Audit Work', desc: 'Implement compliance controls, create evidence for audits, prepare compliance documentation, and respond to audit findings. Governance work is constant.', duration: '1 hr', icon: <FileText size={14} /> },
  { time: '12:15', act: 'Lunch & Recovery', desc: 'Step away from screens. Cloud architecture is cognitively demanding. Use lunch to recharge before the afternoon session.', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '1:15', act: 'Infrastructure as Code & Automation', desc: 'Write Terraform, implement security policies as code, automate security controls, and build tools that scale security across the organization.', duration: '1.5 hrs', icon: <Code size={14} /> },
  { time: '2:45', act: 'Incident Response & Troubleshooting', desc: 'Respond to cloud security incidents, investigate suspicious activity, trace through cloud logs, and implement remediations in real-time.', duration: '1 hr', icon: <AlertTriangle size={14} /> },
  { time: '3:45', act: 'Learning & Exploration', desc: 'Study new cloud services, experiment with security features, read AWS/Azure blogs, or explore emerging cloud security practices.', duration: '45 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'AWS / Azure / GCP', cat: 'Cloud Platforms' }, { name: 'Terraform', cat: 'IaC' },
  { name: 'Kubernetes', cat: 'Container Orchestration' }, { name: 'CloudTrail / Defender', cat: 'Logging' },
  { name: 'Vault / Secrets Manager', cat: 'Secrets Mgmt' }, { name: 'Git / GitLab', cat: 'Version Control' },
  { name: 'CloudMapper', cat: 'Visualization' }, { name: 'Prowler / ScoutSuite', cat: 'Config Audit' },
]

const WORK_ENVS = [
  { type: 'Fully Remote', pct: 52 },
  { type: 'Hybrid', pct: 35 },
  { type: 'In-Office', pct: 13 },
]

const AI_IMPACTS = [
  {
    title: 'AI Cloud Misconfig Detection', icon: <Sparkles size={20} />,
    desc: 'ML models detect misconfigured cloud resources in seconds — overly permissive IAM, exposed S3 buckets, unencrypted data. Continuous automated scanning catches 98% of misconfigurations before they become breaches.',
    tools: ['CloudGuard', 'Wiz', 'Lacework', 'Prisma Cloud'],
    borderColor: 'rgba(3,105,161,0.18)', bgColor: '#f0f7ff', icoBg: 'rgba(3,105,161,0.12)', icoColor: '#0369a1', tagBg: 'rgba(3,105,161,0.1)', tagColor: '#0369a1', titleColor: '#0369a1',
  },
  {
    title: 'AI Cloud Threat Detection', icon: <Zap size={20} />,
    desc: 'AI analysed cloud logs and detects anomalous behavior: unusual API calls, suspicious access patterns, and potential compromises. Human analysts review high-confidence alerts only. Noise drops 80%.',
    tools: ['Darktrace', 'Vectra', 'Mimecast', 'Microsoft Sentinel'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI Cloud Compliance Automation', icon: <TrendingUp size={20} />,
    desc: 'AI generates compliance evidence automatically — tracks changes, proves controls, finds gaps. Audit-ready compliance reports in minutes instead of weeks. Compliance becomes continuous, not annual.',
    tools: ['Compliance.ai', 'Vanta', 'Drata', 'Hyperproof'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'Kubernetes Security & Container Orchestration', 'Serverless Security (AWS Lambda, Functions)',
  'Cloud-Native Threat Modeling', 'Supply Chain Security in Cloud',
  'ZeroTrust Architecture Implementation', 'eBPF & Runtime Security',
]

const PROS = [
  { title: 'Explosive Job Market', desc: 'Every company migrating to cloud simultaneously. Talent shortage is severe. You will have multiple offers before completing certifications. Demand exceeds supply dramatically.' },
  { title: 'Exceptional Compensation', desc: 'Cloud security engineers earn R750k–R2.1M+. Senior roles command premiums. Remote global roles pay 2–4× more in USD. Security specialists in cloud are premium talent.' },
  { title: 'Build Secure Infrastructure at Scale', desc: 'You architect security for millions of cloud resources. Decisions you make protect entire organizations. That scale and impact is massive and immediate.' },
  { title: 'Technology Constantly Evolving', desc: 'Cloud services evolve weekly. New features, new threats, new defences. Boredom is impossible. You stay intellectually challenged indefinitely.' },
  { title: 'High Remote Work Adoption', desc: '52% of cloud security roles are fully remote. Cloud-based work is location-agnostic. You can live anywhere with reliable internet.' },
  { title: 'Path to Architecture & Leadership', desc: 'Cloud security engineers transition naturally to enterprise architecture and leadership. Your technical depth opens doors to strategic roles and executive positions.' },
]

const CONS = [
  { title: 'Rapid Technology Evolution', desc: 'Cloud services change faster than you can learn them. Certifications expire quickly. Staying current requires constant study and experimentation. It\'s exhausting.' },
  { title: 'Shared Responsibility Confusion', desc: 'Cloud providers handle some security; organizations handle others. The boundary is blurry. Misunderstanding who owns what is a major source of breaches and conflicts.' },
  { title: 'Vendor Lock-In Complications', desc: 'Multi-cloud strategy is ideal but complex. Each provider has different security models, tools, and policies. Consistency is hard. Switching clouds is painful.' },
  { title: 'Configuration Complexity', desc: 'Cloud security requires managing thousands of granular settings. One misconfiguration exposes everything. The surface area for mistakes is enormous.' },
  { title: 'Cost Optimization Pressure', desc: 'Security often increases cloud costs. You navigate constant pressure: make it secure but cheaper. These constraints create real friction with engineering teams.' },
  { title: 'Burnout from On-Call Rotations', desc: 'Cloud-native infrastructure is 24/7. On-call rotations are common. Cloud incidents are high-pressure, live-fire situations. Recovery time is fast but intensity is high.' },
]

const VIDEOS = [
  { id: 'xZII6iIqMv8', title: 'Cloud Security Engineer Roadmap 2025', desc: 'Complete guide to becoming a cloud security engineer — cloud fundamentals, certifications, tools, and path from zero to enterprise architect.', dur: '22:15', channel: 'Tech Career Booster' },
  { id: '0oEqd9d-s3c', title: 'AWS Cloud Security Full Course', desc: 'Comprehensive AWS security deep dive — IAM, encryption, logging, compliance, and designing secure cloud architectures from scratch.', dur: '12:30:00', channel: 'A Cloud Guru' },
  { id: 'ggz9zrVHMQQ', title: 'Terraform & Cloud Security Automation', desc: 'Learn Infrastructure as Code for security — automate security controls, compliance checking, and infrastructure deployment using Terraform.', dur: '8:45:00', channel: 'Linux Academy' },
]

const TAKEAWAYS = [
  'Master one cloud platform deeply (AWS, Azure, or GCP) before attempting multi-cloud',
  'Get certified early — cloud certifications are industry standard and prove competency',
  'Infrastructure as Code is non-negotiable — security at scale requires automation',
  'Understand cloud compliance deeply — security without compliance is incomplete',
  'Stay current with cloud evolution — one month of not learning means significant knowledge gaps',
]

const CAREER_FACTS = [
  {
    icon: <Cloud size={20} />, title: 'What You Secure',
    desc: 'Cloud infrastructure, applications, data, identities, networks, and compute resources across AWS, Azure, GCP. You architect solutions protecting millions of resources and users in distributed cloud environments.',
    color: '#0369a1',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Design cloud security architecture, implement IAM policies, manage encryption, audit configurations, automate security controls, respond to incidents, maintain compliance, and design secure CI/CD pipelines.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Cloud architects, platform engineers, DevOps teams, application developers, compliance officers, cloud providers\' security experts, and business stakeholders managing cloud infrastructure decisions.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'Explosive growth. Every organization migrating to cloud. 60%+ of companies prioritize cloud security. Job growth exceeds 25% annually. Talent supply cannot meet demand. Your expertise is highly valuable.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '☁️', title: 'Build at Cloud Scale', desc: 'Architect security for thousands of cloud resources, millions of users, and petabytes of data. The scale and scope of cloud security is incomparable to traditional infrastructure.' },
  { emoji: '💰', title: 'Premium Compensation', desc: 'Senior cloud security architects earn R1.3M–R2.1M+. Remote global roles exceed R4M in USD. Cloud security talent commands top-tier salaries across every market.' },
  { emoji: '🏢', title: 'Strategic Business Role', desc: 'Cloud security directly impacts company capabilities. Fast, secure cloud adoption is competitive advantage. Your work shapes how entire organizations operate technologically.' },
  { emoji: '🚀', title: 'Technology Innovation', desc: 'Work with the newest cloud services, architectural patterns, and security solutions. You stay on the bleeding edge of infrastructure and security innovation.' },
  { emoji: '🌍', title: 'Remote-First Profession', desc: '52% remote adoption globally. Cloud-native work transcends geography. You can work from anywhere — benefits and flexibility are exceptional.' },
  { emoji: '📈', title: 'Career Growth Path', desc: 'Cloud security engineers transition naturally to solutions architecture, enterprise architecture, and executive leadership. Your technical expertise opens high-impact career doors.' },
]

const FREE_RESOURCES = [
  { category: 'Certifications', color: '#0369a1', bgColor: '#f0f7ff', items: [
    { name: 'AWS Certified Cloud Practitioner (free tier)', url: '#', type: 'Cert', rating: 5 },
    { name: 'A Cloud Guru / Pluralsight (free trial)', url: '#', type: 'Course', rating: 5 },
    { name: 'Linux Academy Cloud Training', url: '#', type: 'Course', rating: 4 },
    { name: 'DigitalOcean Cloud Engineer Path', url: '#', type: 'Course', rating: 4 },
  ]},
  { category: 'Practice & Labs', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'AWS Free Tier (hands-on labs)', url: '#', type: 'Labs', rating: 5 },
    { name: 'CloudSploit (configuration auditing)', url: '#', type: 'Tool', rating: 5 },
    { name: 'Prowler (AWS cloud auditing)', url: '#', type: 'Tool', rating: 5 },
    { name: 'IaC Templates on GitHub', url: '#', type: 'Reference', rating: 4 },
  ]},
  { category: 'Community & Resources', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'AWS Architecture Center & Whitepapers', url: '#', type: 'Reference', rating: 5 },
    { name: 'Cloud Security Alliance Resources', url: '#', type: 'Reference', rating: 5 },
    { name: 'r/cloudcomputing & r/aws', url: '#', type: 'Forum', rating: 4 },
    { name: 'AWS Security Best Practices Blog', url: '#', type: 'Blog', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Cloud Security Engineer', range: 'R380k – R620k', midpoint: 500, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Cloud Security Engineer', range: 'R750k – R1.3M', midpoint: 1040, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Cloud Security Engineer', range: 'R1.3M – R2.1M', midpoint: 1700, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Principal Cloud Architect', range: 'R2.2M – R4M+', midpoint: 3100, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'No Cloud Fundamentals',
    desc: 'Jumping to AWS security without understanding cloud computing basics, shared responsibility models, or cloud architecture. Security without understanding architecture fails.',
    fix: 'Start with cloud fundamentals: compute, storage, networking, IAM models. Master architecture before securing it.',
  },
  {
    num: '02', title: 'Ignoring Infrastructure as Code',
    desc: 'Building cloud security manually without IaC, then discovering you cannot scale or audit changes. Security at scale requires automation — manual work does not scale.',
    fix: 'Learn Terraform or CloudFormation early. Automate everything. IaC is non-negotiable for cloud security.',
  },
  {
    num: '03', title: 'Single Cloud Thinking',
    desc: 'Specialising in one cloud (AWS only), then finding multi-cloud roles require broader knowledge. Cloud-native architects need multi-cloud understanding.',
    fix: 'Learn one deeply first. Then expand to Azure and GCP. Multi-cloud is the future.',
  },
  {
    num: '04', title: 'Compliance Without Understanding',
    desc: 'Implementing compliance controls without understanding the business rationale or compliance framework. Compliance work without context is busywork.',
    fix: 'Study compliance frameworks deeply: SOC2, ISO27001, HIPAA. Understand why each control exists.',
  },
  {
    num: '05', title: 'No Hands-On Lab Experience',
    desc: 'Passing certifications without actually building cloud environments. Real learning comes from building and breaking things — not just studying.',
    fix: 'Use AWS Free Tier, Azure Free Tier extensively. Build real architectures. Break them. Fix them. Learn deeply.',
  },
  {
    num: '06', title: 'Neglecting Cloud Cost Implications',
    desc: 'Proposing security solutions without understanding cloud cost impact. Expensive security creates friction with engineering and platform teams.',
    fix: 'Always consider cost. Propose cost-efficient security. Understand cost trade-offs. Cloud economics matter.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Systems Administrator / On-Premises Admin',
    ease: 'Very Easy', easeColor: '#0369a1', easeBg: '#f0f7ff',
    desc: 'You understand systems, networking, and Infrastructure already. Cloud is just a new deployment model. Security concepts translate directly. Only the tools and platforms are new.',
    steps: ['Master cloud fundamentals first', 'Get AWS or Azure certification', 'Build cloud infrastructure in labs', 'Transition to cloud-focused company'],
  },
  {
    from: 'DevOps / Platform Engineer',
    ease: 'Natural Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Your infrastructure expertise is invaluable in cloud. You understand CI/CD, infrastructure automation, and deployment at scale. Add security perspective and you\'re a cloud security engineer.',
    steps: ['Study cloud security-specific topics', 'Get cloud security certification', 'Lead security in your current infrastructure projects', 'Target cloud security architect roles'],
  },
  {
    from: 'Network or Security Engineer',
    ease: 'Strong Foundation', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Your security and networking fundamentals are solid. Translate them to cloud: VPCs are like networks, security groups like firewalls, IAM like access control. Architecture patterns differ, but security thinking is similar.',
    steps: ['Learn cloud fundamentals and architecture', 'Study how cloud security models differ from on-premises', 'Get AWS or Azure security certification', 'Specialise at intersection of your strength and cloud'],
  },
  {
    from: 'Software Developer / Backend Engineer',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Your coding skills are rare in cloud security. You can write security tools, automation, and infrastructure as code better than most. Cloud security can use developer thinking.',
    steps: ['Learn cloud fundamentals and architecture', 'Study security and compliance concepts', 'Write infrastructure as code in your projects', 'Target DevSecOps or cloud security engineering roles'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Cloud Fundamentals', color: '#0369a1', bg: '#f0f7ff', days: [
    { day: 'Day 1–2', task: 'Set up AWS or Azure Free Tier account. Launch first VM, create storage bucket, and explore the console.' },
    { day: 'Day 3–4', task: 'Cloud fundamentals: IaaS vs PaaS vs SaaS, shared responsibility model, cloud regions and availability zones.' },
    { day: 'Day 5–6', task: 'Cloud networking: VPCs, subnets, security groups, NACLs, and basic network architecture in cloud.' },
    { day: 'Day 7', task: 'Quiz yourself on cloud fundamentals. Take practice AWS Cloud Practitioner exam (target 80%+).' },
  ]},
  { week: 'Week 2', theme: 'Identity & Access Management', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'IAM deep dive: users, groups, roles, policies, and principle of least privilege in AWS or Azure.' },
    { day: 'Day 10–11', task: 'Build IAM from scratch: create users, assign roles, test permissions, understand policy languages.' },
    { day: 'Day 12–13', task: 'MFA, password policies, and access key rotation. Implement identity best practices in your lab.' },
    { day: 'Day 14', task: 'Audit your IAM configuration. Find overly permissive accounts. Tighten security.' },
  ]},
  { week: 'Week 3', theme: 'Infrastructure as Code & Automation', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Terraform basics: write code to launch EC2 instances, create VPCs, and configure security groups.' },
    { day: 'Day 17–18', task: 'Policy as code: write security policies that validate and enforce compliance automatically in Terraform.' },
    { day: 'Day 19–20', task: 'Git workflows for infrastructure: branching strategies, code review, and CI/CD for infrastructure changes.' },
    { day: 'Day 21', task: 'Build a complete secure infrastructure using Terraform. Deploy it, audit it, destroy it cleanly.' },
  ]},
  { week: 'Week 4', theme: 'Certification & Specialisation', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Take full AWS Certified Security - Specialty practice exam (aim 750+/1000). Review all weak areas.' },
    { day: 'Day 25–26', task: 'Compliance framework study: pick one (SOC2 or ISO27001), understand controls, map to cloud.' },
    { day: 'Day 27–28', task: 'Build a portfolio: document your secure cloud architecture, explain design decisions, share on GitHub.' },
    { day: 'Day 29–30', task: 'Apply for cloud security roles. Update LinkedIn with certifications. Schedule interviews.' },
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
      try { await navigator.share({ title: 'Cloud Security Engineer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Cloud Security Engineer in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/cloud-security-engineer'}</span>
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
export default function CloudSecurityEngineerRoadmapPage() {
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
            src="https://i.imgur.com/LEGq8US.jpeg"
            alt="Cloud Security Engineer workspace"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Cloud size={12} /> Cloud & Infrastructure
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Cloud Security Engineer
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
            Secure cloud infrastructure at global scale. Cloud Security Engineers architect, implement, and defend the cloud platforms that power modern organisations. You're the bridge between cloud innovation and security.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Cloud Security Engineering" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0f7ff', borderColor: 'rgba(3,105,161,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Cloud Security Engineer</strong> designs, implements, and maintains security infrastructure in cloud environments (AWS, Azure, GCP). You architect security controls, automate compliance, respond to incidents, and make sure organisations can innovate securely in the cloud. Unlike traditional security, cloud security is code-driven, automated, and integrated into development workflows from day one.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Cloud Security could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Cloud Security Engineer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(3,105,161,0.3)'; (e.currentTarget as HTMLElement).style.background = '#f0f7ff' }}
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → Principal Architect</span></div>
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
              const icons = ['☁️', '🔐', '⚙️', '📋', '🌐', '📊']
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
              <div className="text-4xl mb-3">🏗️</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>12–18 months · Hands-on labs · Real cloud architecture</div>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Cloud Security in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0f7ff', borderColor: 'rgba(3,105,161,0.2)', color: C.textMuted }}>
              AI is revolutionising cloud security — automated misconfig detection, ML-powered threat detection, and AI-driven compliance automation. Cloud security engineers using AI tools achieve 10× scale with same team size. AI augments human expertise significantly.
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially for senior architect roles — can pay 2–5× these figures in USD.</p>
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
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f0f7ff', borderColor: 'rgba(3,105,161,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> Cloud security engineers are premium talent. Negotiate aggressively. Remote global opportunities can exceed R6M+. Security expertise in cloud commands top-tier compensation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring cloud security engineers" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into cloud security from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Cloud Security" iconBg={C.redLight} iconColor={C.red} />
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
                Cloud is the future of infrastructure, and <strong style={{ color: C.primary }}>security is the gatekeeper</strong>. Every organisation is migrating to cloud. Cloud security engineers are the architects who ensure that migration happens securely and compliantly. That expertise is rare and extremely valuable.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The path requires mastering cloud fundamentals, learning Infrastructure as Code, understanding compliance, and getting hands dirty in labs. There are no shortcuts. But the payoff — exceptional salary, global remote work, intellectual challenge, and genuine impact — is tremendous.
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
            Ready to Architect Cloud Security?
          </h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>
            You have the roadmap. You have the learning path. You have the labs. All that's left is to commit to mastery and start building secure cloud infrastructure.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              Get Career Advice
            </a>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start your cloud security journey today. The industry needs you.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}
