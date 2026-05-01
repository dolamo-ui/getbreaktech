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
  GitBranch, 
  Cloud, Workflow,
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
  primary: '#0f766e',          // teal — solutions architect brand colour
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
  indigo: '#0891b2',
  indigoLight: 'rgba(8,145,178,0.08)',
  cyan: '#0891b2',
  cyanLight: 'rgba(8,145,178,0.08)',
}

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const CAREER_LEVELS = [
  {
    level: 'Associate', title: 'Associate Solutions Architect', duration: '0–3 yrs', salary: 'R480k–R750k',
    description: 'Support senior architects on cloud projects, document solution designs, assist with RFPs, and develop hands-on cloud certifications while learning the business of technical consulting.',
    skills: ['AWS/Azure Basics', 'Cloud Certifications', 'Diagramming', 'Documentation'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Solutions Architect', duration: '3–6 yrs', salary: 'R900k–R1.5M',
    description: 'Own end-to-end solution designs for mid-market clients, lead technical discovery workshops, produce architecture documentation, and independently respond to RFPs across cloud and on-premise scenarios.',
    skills: ['Solution Design', 'Cloud Platforms', 'Security Architecture', 'Client Workshops'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Solutions Architect', duration: '6–10 yrs', salary: 'R1.6M–R2.4M',
    description: 'Lead enterprise transformation programmes, define architecture standards across organisations, mentor junior architects, and serve as the trusted technical advisor for C-level stakeholders on large deals.',
    skills: ['Enterprise Architecture', 'Pre-Sales Leadership', 'Multi-Cloud Strategy', 'C-Level Advisory'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Principal', title: 'Principal / Distinguished Architect', duration: '10+ yrs', salary: 'R2.5M+',
    description: 'Define the technical vision for an organisation\'s entire cloud and infrastructure strategy. Drive industry thought leadership, influence product roadmaps, and shape architectural standards at a global scale.',
    skills: ['Technical Vision', 'Industry Strategy', 'Org Architecture', 'Thought Leadership'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Cloud Fundamentals & Infrastructure Literacy',
    description: 'Start with AWS, Azure, or GCP fundamentals. Understand compute, storage, networking, IAM, and the shared responsibility model. Get your first cloud certification (AWS Cloud Practitioner or AZ-900) to build credibility and prove foundational knowledge to employers.',
    duration: '2–3 months', skills: ['AWS / Azure / GCP', 'Networking Basics', 'IAM & Security', 'Cloud Certifications'],
  },
  {
    step: 2, title: 'Architecture Patterns & Design Principles',
    description: 'Study well-architected framework pillars: reliability, security, performance, cost optimisation, and operational excellence. Learn microservices vs. monoliths, event-driven architecture, the saga pattern, CQRS, and how to choose patterns based on business requirements.',
    duration: '2–3 months', skills: ['Well-Architected', 'Design Patterns', 'Microservices', 'Event-Driven Arch'],
  },
  {
    step: 3, title: 'Enterprise Integration & Data Architecture',
    description: 'Solutions architects must connect disparate systems. Master API gateways, ESBs, ETL pipelines, data lake design, streaming architectures (Kafka, Kinesis), and hybrid cloud integration. Understand when to use each integration pattern.',
    duration: '2–3 months', skills: ['API Gateway', 'ETL / ELT', 'Kafka / Kinesis', 'Data Architecture'],
  },
  {
    step: 4, title: 'Security Architecture & Compliance',
    description: 'Security is non-negotiable in enterprise architecture. Learn zero-trust models, defence-in-depth, network segmentation, secrets management, encryption at rest and in transit, and compliance frameworks like POPIA, GDPR, SOC2, and ISO 27001.',
    duration: '1–2 months', skills: ['Zero-Trust', 'Compliance Frameworks', 'Network Security', 'Encryption'],
  },
  {
    step: 5, title: 'Pre-Sales, Communication & Stakeholder Management',
    description: 'A great solution nobody can explain is worthless. Learn to run technical discovery workshops, write winning technical proposals, create architecture diagrams (C4 model, ArchiMate), present to executive and technical audiences, and translate complex trade-offs into business language.',
    duration: '2–3 months', skills: ['C4 / ArchiMate', 'Technical Proposals', 'Stakeholder Comms', 'Discovery Workshops'],
  },
  {
    step: 6, title: 'FinOps, Governance & Enterprise Strategy',
    description: 'Senior architects must understand total cost of ownership, cloud financial management, architectural governance boards, and how to align technical strategy to business OKRs. Study TOGAF, Zachman, or SAFe to understand enterprise architecture frameworks.',
    duration: '3–4 months', skills: ['FinOps', 'TOGAF / Zachman', 'Cloud Governance', 'Technology Strategy'],
  },
]

const HARD_SKILLS = [
  { name: 'Cloud Platforms (AWS/Azure/GCP)', level: 95 },
  { name: 'Architecture Patterns & Design', level: 93 },
  { name: 'Security Architecture', level: 88 },
  { name: 'Enterprise Integration', level: 85 },
  { name: 'Data Architecture & Pipelines', level: 80 },
  { name: 'FinOps & Cost Optimisation', level: 75 },
  { name: 'TOGAF / Enterprise Frameworks', level: 68 },
  { name: 'Technical Pre-Sales', level: 65 },
]

const SOFT_SKILLS = [
  { name: 'Translating Tech to Business', description: 'The single most important skill in solutions architecture. You must articulate complex technical trade-offs in terms of business risk, cost, time, and competitive advantage — for audiences who do not code.' },
  { name: 'Structured Problem Decomposition', description: 'Enterprise problems arrive as ambiguous messes. Great architects decompose them into bounded contexts, identify constraints, and design solutions that actually match the real problem.' },
  { name: 'Stakeholder Influence Without Authority', description: 'You will frequently need to drive architectural decisions without line authority. Mastering influence through credibility, data, and relationships is core to the role at every level.' },
  { name: 'Technical Curiosity at Scale', description: 'The technology landscape shifts constantly. Solutions architects who stay genuinely curious — reading engineering blogs, testing new services, earning certs — remain relevant longer than those who stop learning.' },
  { name: 'Facilitating Alignment in Large Groups', description: 'Running a discovery workshop with 20 stakeholders who all have different agendas requires structured facilitation skills. Architecture decisions made in chaos rarely survive contact with reality.' },
  { name: 'Comfort with Ambiguity', description: 'RFPs arrive with missing information. Requirements change mid-project. Clients know what they want but not what they need. The ability to design robust solutions under uncertainty separates senior architects from the rest.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Computer Science / Engineering Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(15,118,110,0.2)', bgColor: '#f0fdfa', typeBg: 'rgba(15,118,110,0.12)', typeColor: '#0f766e',
    pros: ['Deep CS fundamentals that inform architecture decisions', 'High credibility at large enterprises and consulting firms', 'Access to internship pipelines and graduate programmes', 'Strong foundation for advanced certifications'],
    cons: ['No direct architecture curriculum — requires self-directed learning', 'Expensive path with slow return to first SA role', 'Rarely covers cloud, enterprise frameworks, or pre-sales', 'Architecture skills largely built through experience, not degree'],
  },
  {
    type: 'Certifications', title: 'Cloud Certifications Path', duration: '12–24 months', cost: 'R8k – R40k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Direct, verifiable credibility with cloud vendors', 'AWS SA Pro or Azure Solutions Expert are job requirements at top firms', 'Structured learning path with clear milestones', 'Relatively affordable with high ROI'],
    cons: ['Certifications alone without project experience are thin', 'Must be continuously renewed as cloud services evolve', 'Does not cover enterprise frameworks or consulting skills', 'Requires prior hands-on experience to be meaningful'],
  },
  {
    type: 'Self-Taught', title: 'Experience-Led Path (Internal Move)', duration: '2–5 years', cost: 'R0 – R15k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['Most common actual path for working architects', 'Real project credibility no course can replicate', 'Build a portfolio of production solutions', 'Domain expertise compounds with architecture skills'],
    cons: ['Requires intentional self-study alongside work', 'Career progression can stall without formal frameworks', 'No credential signal for hiring managers outside your network', 'Easy to develop blind spots in areas your company never uses'],
  },
]

const SCHEDULE = [
  { time: '8:30', act: 'Client Discovery Call', desc: 'Understand new client requirements, document the as-is state, and begin scoping the solution design engagement or RFP response', duration: '1 hr', icon: <Users size={14} /> },
  { time: '9:30', act: 'Architecture Design Work', desc: 'The core creative work: designing multi-service cloud solutions, drawing C4 diagrams, selecting patterns, and documenting trade-offs in Architecture Decision Records', duration: '2 hrs', icon: <Layers size={14} /> },
  { time: '11:30', act: 'Internal Technical Review', desc: 'Present in-progress architecture to internal peers for critique, security review, and FinOps validation before any client presentation', duration: '1 hr', icon: <GitBranch size={14} /> },
  { time: '12:30', act: 'Lunch & Thinking Time', desc: 'Walk away from the diagrams. The best architectural insights arrive during lunch, not staring at a whiteboard', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '1:30', act: 'RFP & Proposal Writing', desc: 'Translate architecture decisions into compelling written technical proposals with pricing narratives, risk registers, and implementation timelines', duration: '1.5 hrs', icon: <FileText size={14} /> },
  { time: '3:00', act: 'Client Presentation Prep', desc: 'Create executive-level decks, prepare for technical objections, rehearse the architecture story arc, and update diagrams based on review feedback', duration: '1 hr', icon: <Monitor size={14} /> },
  { time: '4:00', act: 'Certification Study & Research', desc: 'Earn the next cloud cert, read AWS/Azure release notes, study a new architectural pattern, or contribute to the firm\'s internal knowledge base', duration: '1 hr', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'draw.io / Lucidchart', cat: 'Diagramming' },
  { name: 'AWS Console / CLI', cat: 'Cloud' },
  { name: 'Terraform / Pulumi', cat: 'IaC' },
  { name: 'Confluence', cat: 'Documentation' },
  { name: 'Jira / Azure DevOps', cat: 'Planning' },
  { name: 'Figma', cat: 'Prototyping' },
  { name: 'CloudHealth / Apptio', cat: 'FinOps' },
  { name: 'Miro', cat: 'Workshops' },
]

const WORK_ENVS = [
  { type: 'Hybrid', pct: 52 },
  { type: 'Remote', pct: 34 },
  { type: 'On-Site (Client)', pct: 14 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Assisted Architecture Design', icon: <Sparkles size={20} />,
    desc: 'GitHub Copilot and Claude help generate Infrastructure-as-Code templates, review security configurations, and suggest architecture patterns. Architects using AI assistants report 40% faster IaC scaffolding and more thorough documentation.',
    tools: ['GitHub Copilot', 'Claude', 'Amazon Q', 'Azure Copilot'],
    borderColor: 'rgba(15,118,110,0.18)', bgColor: '#f0fdfa', icoBg: 'rgba(15,118,110,0.12)', icoColor: '#0f766e', tagBg: 'rgba(15,118,110,0.1)', tagColor: '#0f766e', titleColor: '#0f766e',
  },
  {
    title: 'AI-Powered Well-Architected Reviews', icon: <Zap size={20} />,
    desc: 'Solutions architects who can configure AWS Well-Architected Tool, run AI-driven compliance scans, and integrate LLMs into governance workflows create reviews that are faster and catch more issues than manual assessments.',
    tools: ['AWS Well-Architected', 'Azure Advisor', 'Snyk', 'Checkov'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'Generative AI Architecture Patterns', icon: <TrendingUp size={20} />,
    desc: 'Designing RAG pipelines, vector database architectures, LLM inference infrastructure, and AI-native application patterns is now a distinct differentiator. Architects who understand AI workloads command top-tier project fees.',
    tools: ['Bedrock', 'Azure OpenAI', 'Vertex AI', 'Pinecone'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'AI/ML Architecture on Cloud (Bedrock, Vertex)',
  'FinOps Practitioner Certification',
  'Platform Engineering & Internal Developer Portals',
  'Zero-Trust Network Architecture',
  'Sustainability / Green Architecture Metrics',
  'TOGAF 10 Enterprise Architecture Framework',
]

const PROS = [
  { title: 'The Highest-Paid Non-Management Role', desc: 'Senior solutions architects at cloud vendors and consulting firms consistently earn R1.6M–R2.5M+ in South Africa. Principal architects at global firms earn equivalent of R4M+ in USD contracts.' },
  { title: 'The Bridge Between Business and Technology', desc: 'Solutions architects occupy the most strategic position in the technology landscape — translating business vision into technical reality. It is intellectually rich and permanently relevant.' },
  { title: 'Cloud Vendor Career Paths Are Outstanding', desc: 'AWS, Microsoft, and Google all have dedicated Solutions Architect career paths with exceptional compensation, training budgets, certification support, and global exposure.' },
  { title: 'Demand Is Structural and Growing', desc: 'Every enterprise undergoing digital transformation — which is every enterprise — needs solutions architects. Cloud adoption, AI integration, and legacy modernisation are decade-long programmes.' },
  { title: 'Skills That Compound With Seniority', desc: 'Unlike coding skills that can become commoditised, architecture judgment, stakeholder trust, and domain expertise compound as you advance. A 15-year architect is exponentially more valuable than a 5-year one.' },
  { title: 'Variety Is Guaranteed', desc: 'No two projects are alike. Fintech one month, healthcare the next, retail digital transformation after that. Solutions architects never stop learning because every client brings a new domain challenge.' },
]

const CONS = [
  { title: 'Breadth Over Depth Trade-Off', desc: 'Solutions architects know a lot about many things but rarely go deep on any single technology. Developers who want to specialise deeply often find the breadth-first nature of the role frustrating.' },
  { title: 'Difficult to Break In Without Experience', desc: 'Every solutions architect job description asks for 5+ years of experience. The path from developer to architect is real but rarely fast — it requires intentional positioning and visible technical leadership.' },
  { title: 'Client Pressure and Pre-Sales Stress', desc: 'Architecture that is attached to commercial deals carries enormous pressure. Winning or losing a R10M contract can hinge on your technical proposal. Pre-sales cycles are exhausting.' },
  { title: 'Frequent Context Switching', desc: 'Managing five active clients or projects simultaneously, each at a different stage, requiring different knowledge domains, is cognitively demanding and hard to sustain without strong systems.' },
  { title: 'Ambiguous Scope Creep Risk', desc: '"You\'re the architect, so you should handle this" is something solutions architects hear constantly. Scope boundaries get violated frequently, especially in consulting environments.' },
  { title: 'Keeping Up With Cloud Services Is Relentless', desc: 'AWS releases hundreds of new services and features every year. Azure and GCP match that pace. Staying genuinely current across one cloud platform is a part-time job. Across three is impossible without focus.' },
]

const VIDEOS = [
  { id: 'FZR0rJ4a6LI', title: 'What Does a Solutions Architect Actually Do?', desc: 'An honest, detailed look at the daily work of a solutions architect — discovery, design, stakeholder management, and how the role differs at vendors vs consulting firms vs enterprises.', dur: '18:45', channel: 'TechWorld with Nana' },
  { id: 'pEDxC53RVPs', title: 'AWS Solutions Architect Full Course 2025', desc: 'Complete preparation guide for the AWS Solutions Architect Associate exam — covering compute, networking, storage, databases, and security architecture patterns.', dur: '9:30:00', channel: 'freeCodeCamp' },
  { id: 'RMn3OsajXTU', title: 'Enterprise Architecture Explained', desc: 'A comprehensive breakdown of enterprise architecture frameworks — TOGAF, Zachman, and how to apply architectural thinking to large-scale digital transformation programmes.', dur: '2:44:10', channel: 'ByteByteGo' },
]

const TAKEAWAYS = [
  'Earn at least one professional-level cloud certification before calling yourself a solutions architect — it is table stakes, not optional',
  'Every architecture decision is a trade-off; document the trade-offs you considered and rejected, not just the one you chose',
  'Learn to draw before you learn to design — clear diagrams that non-technical stakeholders understand are a competitive advantage',
  'The best architects ask better questions, not just give better answers — discovery skill is the most underrated architecture capability',
  'Your reputation is your pipeline: one successful enterprise transformation, properly documented and referenced, is worth more than any certification',
]

/* ─── CAREER FACTS ────────────────────────────────────────────────────────── */

const CAREER_FACTS = [
  {
    icon: <Cloud size={20} />, title: 'What You Build',
    desc: 'Cloud architecture blueprints, enterprise integration designs, security frameworks, data platform architectures, hybrid-cloud solutions, technical proposals, RFP responses, and the strategic technical roadmaps that guide organisations for 3–5 years.',
    color: '#0f766e',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Client discovery workshops, solution design, architecture documentation, pre-sales support, technology strategy consulting, RFP writing, stakeholder presentations, proof-of-concept builds, and governance reviews.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'C-suite executives defining digital strategy, IT directors managing transformation budgets, engineering teams implementing your designs, cloud vendor account managers, security teams, compliance officers, and procurement stakeholders.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'Solutions architects are among the most sought-after professionals in enterprise technology. Cloud migration and AI integration demand surged 45% in 2024. Every enterprise has a 3–5 year transformation backlog that requires architects.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🏗️', title: 'You Design Entire Platforms', desc: 'Every enterprise system — the banking app, the hospital patient portal, the retailer\'s ecommerce platform — was designed by a solutions architect. You shape the technological foundation organisations run on.' },
  { emoji: '💰', title: 'The Ceiling Is Extraordinary', desc: 'Senior solutions architects earn R1.6M–R2.5M+ in South Africa. Principal architects at global cloud vendors or consulting firms on USD contracts earn the equivalent of R4M–R8M. The ceiling barely exists.' },
  { emoji: '🌍', title: 'Globally Transferable Role', desc: 'AWS, Azure, and GCP certifications are recognised worldwide. A solutions architect in Johannesburg can move to London, Dubai, or Singapore without retraining. The skills are genuinely portable.' },
  { emoji: '🧩', title: 'The Most Interesting Problems in Tech', desc: 'How do you migrate a 40-year-old mainframe to cloud without downtime? How do you design an AI architecture for a healthcare system that meets POPIA? These problems have no easy answers — and that\'s the point.' },
  { emoji: '📈', title: 'The Bridge to the C-Suite', desc: 'Solutions architects routinely present to CTOs, CIOs, and boards. The career path from architect to CTO is direct and well-worn. No other engineering role provides equivalent executive exposure.' },
  { emoji: '🔒', title: 'Domain Knowledge Compounds', desc: 'Five years of healthcare architecture makes you priceless to healthcare clients. Finance, logistics, retail — domain-specific architectural expertise is rare, difficult to acquire, and extremely well compensated.' },
]

const FREE_RESOURCES = [
  { category: 'Certifications', color: '#0f766e', bgColor: '#f0fdfa', items: [
    { name: 'AWS Skill Builder — Free Tier (Official)', url: '#', type: 'Course', rating: 5 },
    { name: 'Microsoft Learn — AZ-900 to AZ-305 Path', url: '#', type: 'Course', rating: 5 },
    { name: 'Google Cloud Skills Boost — Free Tier', url: '#', type: 'Course', rating: 4 },
    { name: 'A Cloud Guru — SA Associate Prep', url: '#', type: 'Course', rating: 5 },
  ]},
  { category: 'Architecture', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'AWS Well-Architected Framework (Free)', url: '#', type: 'Reference', rating: 5 },
    { name: 'The C4 Model — c4model.com', url: '#', type: 'Reference', rating: 5 },
    { name: 'Martin Fowler — Architecture Patterns', url: '#', type: 'Blog', rating: 5 },
    { name: 'roadmap.sh — Software Architect Path', url: '#', type: 'Reference', rating: 5 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'TechWorld with Nana — YouTube', url: '#', type: 'YouTube', rating: 5 },
    { name: 'AWS Architecture Blog (Official)', url: '#', type: 'Blog', rating: 5 },
    { name: 'Software Engineering Radio Podcast', url: '#', type: 'Podcast', rating: 5 },
    { name: 'r/cscareerquestions Architecture Posts', url: '#', type: 'Forum', rating: 4 },
  ]},
]

const SALARY_DATA = [
  { role: 'Associate Solutions Architect', range: 'R480k – R750k', midpoint: 615, yoe: '0–3 yrs', color: '#0891b2' },
  { role: 'Solutions Architect', range: 'R900k – R1.5M', midpoint: 1200, yoe: '3–6 yrs', color: '#16a34a' },
  { role: 'Senior Solutions Architect', range: 'R1.6M – R2.4M', midpoint: 2000, yoe: '6–10 yrs', color: '#7c3aed' },
  { role: 'Principal / Distinguished Architect', range: 'R2.5M – R5M+', midpoint: 3500, yoe: '10+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Designing Architecture Before Understanding the Business',
    desc: 'Architecture designed in a vacuum, without deep understanding of organisational constraints, culture, and strategic goals, will be technically elegant and practically useless. The hardest part of architecture is asking better questions, not drawing better diagrams.',
    fix: 'Spend at least 30% of every engagement in discovery before designing anything. Document the business drivers and constraints first.',
  },
  {
    num: '02', title: 'Over-Engineering for Scale That Will Never Come',
    desc: 'A 10-microservice Kubernetes architecture for a startup with 200 users is a liability, not an asset. The bias toward complexity is strong in architecture — it feels more impressive. It often isn\'t.',
    fix: 'Design for the load you have, not the load you dream of. Build in seams that allow you to scale specific components when the data shows you need to.',
  },
  {
    num: '03', title: 'Ignoring the Humans Who Will Operate the System',
    desc: 'An architecture that requires a PhD to operate will be misoperated in production. Operational complexity kills systems that look perfect on a whiteboard. Design for the team that will maintain it, not the team you wish existed.',
    fix: 'Introduce operational complexity reviews. Before finalising, ask: "Can the ops team support this at 2am without the architect on-call?"',
  },
  {
    num: '04', title: 'No Architecture Decision Records',
    desc: 'Six months after a design is implemented, nobody remembers why the team chose Kafka over SQS. Without ADRs, every decision gets re-litigated constantly, and bad assumptions get baked in permanently.',
    fix: 'Write an ADR for every major technical decision. It takes 20 minutes and saves hundreds of hours of future confusion and debates.',
  },
  {
    num: '05', title: 'Skipping the Proof-of-Concept Phase',
    desc: 'Committing a client to an architecture pattern that has never been validated in their specific environment — with their data volumes, their latency requirements, their team constraints — is a major risk that architects repeatedly underestimate.',
    fix: 'Insist on a time-boxed PoC for any novel architectural pattern before committing to full implementation. Discoveries in a PoC are features; discoveries in production are incidents.',
  },
  {
    num: '06', title: 'Treating Security as a Phase, Not a Pillar',
    desc: 'Security architecture added at the end of a project is not security architecture — it\'s security decoration. Encryption, identity, network segmentation, and audit logging must be in the initial design, not the final sprint.',
    fix: 'Include a security architect or security-focused review in every design milestone, not just before go-live.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Software Developer / Engineer',
    ease: 'Natural Fit', easeColor: '#0f766e', easeBg: '#f0fdfa',
    desc: 'Deep implementation experience is the most valued background for solutions architects. You already understand what is hard to build, which is exactly the knowledge that prevents unrealistic designs. Add cloud platforms, architecture frameworks, and stakeholder communication skills.',
    steps: ['Earn AWS SAA-C03 or Azure AZ-305 certification', 'Lead the architecture on your next internal project', 'Write public ADRs and architecture posts on your blog', 'Target cloud vendor or consulting SA roles'],
  },
  {
    from: 'IT Infrastructure / Network Engineer',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Networking fundamentals, security mindset, and operational experience are exactly what software-only architects often lack. Add cloud-native services, software architecture patterns, and pre-sales skills to transition into solutions architecture.',
    steps: ['Bridge from networking to cloud with AWS/Azure networking certifications', 'Study application architecture patterns to complement infra knowledge', 'Build a hybrid-cloud architecture showcase project', 'Target infrastructure-focused SA roles at cloud vendors or SIs'],
  },
  {
    from: 'Business Analyst / Consultant',
    ease: 'Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Stakeholder management, requirements elicitation, and business communication are already at a high level. You need to build genuine technical depth — cloud infrastructure, integration patterns, and security — to become credible as a technical advisor.',
    steps: ['Get a foundational cloud certification to establish technical credibility', 'Build a hands-on cloud architecture project — deploy and document it publicly', 'Study Well-Architected Framework and write an analysis for a real use case', 'Target SA roles at consulting firms where your business skills are immediately valued'],
  },
  {
    from: 'Other Background',
    ease: 'Long-Term Play', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Domain expertise combined with architecture skills is extremely rare and commands premium fees. A solutions architect who deeply understands healthcare, finance, or logistics is worth far more than a generalist.',
    steps: ['Start with cloud fundamentals and get certified', 'Move into a technical role in your domain industry', 'Volunteer to document and present technical solutions internally', 'Transition into solutions architecture within your domain vertical'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Cloud Foundation', color: '#0f766e', bg: '#f0fdfa', days: [
    { day: 'Day 1–2', task: 'Create free-tier AWS and Azure accounts. Deploy a virtual machine, configure networking, and set up IAM roles manually on both platforms.' },
    { day: 'Day 3–4', task: 'Study AWS Well-Architected Framework pillars. Take notes on 3 real-world architectural anti-patterns it describes.' },
    { day: 'Day 5–6', task: 'Learn the C4 model for architecture diagramming. Install draw.io. Draw a C4 context and container diagram for a hypothetical e-commerce platform.' },
    { day: 'Day 7', task: 'Begin AWS Cloud Practitioner exam prep. Take a practice test and identify your weakest domain areas for focused study.' },
  ]},
  { week: 'Week 2', theme: 'Architecture Patterns', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Study microservices vs. monolith trade-offs. Design both architectures for the same problem and write a 1-page ADR documenting your recommended approach.' },
    { day: 'Day 10–11', task: 'Build a serverless API on AWS Lambda + API Gateway + DynamoDB. Document the architecture with a C4 diagram and cost estimate.' },
    { day: 'Day 12–13', task: 'Study event-driven architecture patterns (pub/sub, event sourcing, CQRS). Extend your design to include an event bus and async processing.' },
    { day: 'Day 14', task: 'Write a Well-Architected review of your serverless project. Identify 3 improvements across the 5 pillars. Document them as ADRs.' },
  ]},
  { week: 'Week 3', theme: 'Security & Integration', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Study zero-trust architecture. Redesign your serverless project\'s IAM roles and network configuration to follow least-privilege principles.' },
    { day: 'Day 17–18', task: 'Design a hybrid-cloud integration architecture connecting an on-premise database to your AWS environment using VPN and an API Gateway.' },
    { day: 'Day 19–20', task: 'Set up CloudWatch dashboards and alarms for your AWS project. Write a runbook for the most likely operational issue your architecture could face.' },
    { day: 'Day 21', task: 'Study a real architectural failure post-mortem (AWS S3 outage 2017 or similar). Write a 1-page analysis of the root cause and architectural lessons.' },
  ]},
  { week: 'Week 4', theme: 'Communicate & Position', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Create an Architecture Portfolio document: your 2 cloud projects, their ADRs, their C4 diagrams, and their Well-Architected reviews. Publish on GitHub.' },
    { day: 'Day 25–26', task: 'Write a LinkedIn article: "Microservices vs Monolith: A Trade-Off Analysis for Growing Companies." Include your diagrams. Post it publicly.' },
    { day: 'Day 27–28', task: 'Register for AWS SAA-C03 or AZ-305 exam. Build your 60-day study plan with daily practice questions and lab time scheduled.' },
    { day: 'Day 29–30', task: 'Apply to 5 solutions architecture roles or adjacent technical positions. Update your CV with your portfolio, your cloud projects, and your certification progress.' },
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
      try { await navigator.share({ title: 'Solutions Architect Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Solutions Architect in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/solutions-architect'}</span>
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
export default function SolutionsArchitectRoadmapPage() {
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
            src="https://i.imgur.com/sBXOt63.jpeg"
            alt="Solutions Architect cloud infrastructure and design"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Cloud size={12} /> Architecture & Cloud Strategy
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Solutions Architect
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
            Design the systems enterprises run on. Solutions architects translate business vision into technical reality — building the cloud platforms, integration frameworks, and data architectures that power organisations at scale.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Solutions Architecture" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Solutions Architect</strong> designs the technical systems that solve business problems at scale. They sit at the intersection of technology strategy and engineering reality — understanding what organisations need, what is technically possible, and how to design solutions that are secure, scalable, cost-effective, and actually maintainable by the teams that will operate them.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Solutions Architecture could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Solutions Architect workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,118,110,0.3)'; (e.currentTarget as HTMLElement).style.background = '#f0fdfa' }}
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Associate → Principal Architect</span></div>
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
              const icons = ['☁️', '🏗️', '🔗', '🔒', '🎤', '📊']
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
                        {isEven
                          ? <polygon points="372,36 388,44 372,52" fill={accentColors[i + 1] ?? accent} opacity="0.5" />
                          : <polygon points="28,36 12,44 28,52" fill={accentColors[i + 1] ?? accent} opacity="0.5" />}
                      </svg>
                    </div>
                  )}
                </div>
              )
            })}
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #0891b2 100%)`, boxShadow: '0 8px 48px rgba(15,118,110,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>CERTIFIED ARCHITECT IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>12–18 months · Cloud certifications · Real architecture portfolio</div>
            </div>
          </div>
          
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
                        <div className="h-1.5 rounded-full" data-bar-w={s.level} style={{ width: 0, background: `linear-gradient(90deg, ${C.primary}, #0891b2)` }} />
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Solutions Architecture in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)', color: C.textMuted }}>
              AI tools don't replace solutions architects — they <em style={{ color: C.primary }}>amplify</em> them. Architects who integrate Copilot, Claude, and AI-native cloud services into their workflow generate IaC templates, review security configurations, and produce documentation significantly faster — freeing time for the strategic design work only humans can do.
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially for senior and principal roles at cloud vendors — can pay 2–4× these figures in USD.</p>
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
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> Solutions architects at cloud vendors (AWS, Microsoft, Google) typically earn 40–60% more than those at system integrators, and receive significant training, certification, and conference budgets. Target vendor roles early — the brand credibility and skills transfer everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring solutions architects" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into solutions architecture from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Solutions Architecture" iconBg={C.redLight} iconColor={C.red} />
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
                Solutions architecture is the discipline where <strong style={{ color: C.primary }}>technology vision becomes organisational reality</strong>. Every major cloud migration, every AI integration programme, every enterprise modernisation initiative was steered by an architect who could hold the business vision and the technical constraints in their head simultaneously.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The path is long, but it is one of the most intellectually rewarding and financially lucrative in the entire technology industry. The architects who invest in cloud certifications, build real portfolios, and develop genuine business communication skills will never struggle for opportunities.
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
        <div className="relative overflow-hidden rounded-3xl px-12 py-16 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #0891b2 100%)` }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: 'rgba(255,255,255,0.05)', top: -120, right: -80 }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Rocket size={30} style={{ color: '#fff' }} />
          </div>
          <h2 className="font-extrabold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
            Ready to Start Your Journey?
          </h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open your AWS console and deploy your first architecture.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
           <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>
           
           
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start designing today. Your future self will thank you.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}