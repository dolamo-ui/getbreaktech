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
  Bot, Sparkles, Zap, TrendingUp,
  Link2, Download, Share2, Copy, CheckCheck,
  BookOpen, AlertTriangle, RefreshCw, Star, Calendar,
  Award, Target, Flame, Cpu,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const C = {
  bg: '#ffffff', bgAlt: '#f8f9ff', bgCard: '#ffffff',
  border: 'rgba(0,0,0,0.07)', borderStrong: 'rgba(0,0,0,0.12)',
  text: '#0f172a', textMuted: '#64748b', textFaint: '#94a3b8',
  violet: '#7c3aed', violetLight: 'rgba(124,58,237,0.08)', violetMid: 'rgba(124,58,237,0.15)',
  teal: '#0891b2', tealLight: 'rgba(8,145,178,0.08)',
  green: '#16a34a', greenLight: 'rgba(22,163,74,0.08)',
  red: '#dc2626', redLight: 'rgba(220,38,38,0.08)',
  orange: '#ea580c', orangeLight: 'rgba(234,88,12,0.08)',
  indigo: '#4f46e5', indigoLight: 'rgba(79,70,229,0.08)',
  // AI Engineer accent: indigo/blue
  accent: '#4f46e5', accentLight: 'rgba(79,70,229,0.08)',
}

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const CAREER_LEVELS = [
  { level: 'Beginner', title: 'Junior AI Engineer', duration: '0–2 yrs', salary: 'R380k–R580k', description: 'Build and integrate AI-powered features using APIs, manage prompts, and assist in deploying LLM-based tools.', skills: ['Python', 'OpenAI API', 'REST APIs', 'Prompt Eng'], accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)' },
  { level: 'Intermediate', title: 'AI Engineer', duration: '2–5 yrs', salary: 'R650k–R1.1M', description: 'Design end-to-end AI systems, build RAG pipelines, fine-tune models, and own the full production AI lifecycle.', skills: ['LangChain', 'Fine-tuning', 'Vector DBs', 'Evals'], accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)' },
  { level: 'Advanced', title: 'Senior AI Engineer', duration: '5–8 yrs', salary: 'R1.1M–R1.7M', description: 'Lead AI product architecture, mentor teams, drive model evaluation strategy, and ship reliable AI at scale.', skills: ['System Design', 'RLHF', 'AI Safety', 'Lead'], accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)' },
  { level: 'Expert', title: 'Staff AI Engineer / AI Architect', duration: '8+ yrs', salary: 'R2M+', description: 'Define an organisation\'s entire AI strategy, evaluate frontier models, and build the systems that shape future products.', skills: ['AI Strategy', 'Research', 'Org Influence', 'Publications'], accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)' },
]

const ROADMAP_STEPS = [
  { step: 1, title: 'Python & API Fundamentals', description: 'Build solid Python skills and learn how to consume and integrate third-party REST APIs. Everything in AI engineering runs on this foundation — get it right first.', duration: '1–2 months', skills: ['Python', 'REST APIs', 'JSON', 'Env Variables'] },
  { step: 2, title: 'Prompt Engineering & LLM APIs', description: 'Master prompt design patterns — zero-shot, few-shot, chain-of-thought, and structured outputs. Learn to call OpenAI, Anthropic, and Cohere APIs reliably.', duration: '1–2 months', skills: ['OpenAI API', 'Anthropic Claude', 'System Prompts', 'Output Parsing'] },
  { step: 3, title: 'RAG & Vector Databases', description: 'Build Retrieval-Augmented Generation systems. Connect LLMs to your own data using vector stores, embeddings, and chunking strategies.', duration: '2–3 months', skills: ['Pinecone', 'ChromaDB', 'Embeddings', 'LangChain'] },
  { step: 4, title: 'Fine-Tuning & Model Evaluation', description: 'Learn to fine-tune open-source models on custom data using LoRA/QLoRA. Build robust evaluation frameworks to measure AI system performance accurately.', duration: '2–3 months', skills: ['Hugging Face', 'LoRA / QLoRA', 'LLM Evals', 'PEFT'] },
  { step: 5, title: 'AI Agent & Tool-Use Systems', description: 'Build autonomous AI agents that can use tools, browse the web, write code, and complete multi-step tasks. Understand planning, memory, and orchestration.', duration: '2 months', skills: ['LangGraph', 'AutoGen', 'Tool Calling', 'Memory'] },
  { step: 6, title: 'Production AI Systems & Observability', description: 'Deploy AI applications reliably at scale. Add monitoring, tracing, guardrails, and feedback loops so your AI systems improve over time — not degrade.', duration: '2–3 months', skills: ['LangSmith', 'Guardrails AI', 'FastAPI', 'Docker'] },
]

const HARD_SKILLS = [
  { name: 'Python & API Integration', level: 95 },
  { name: 'Prompt Engineering & LLM APIs', level: 92 },
  { name: 'RAG Pipelines & Vector Databases', level: 85 },
  { name: 'LangChain / LlamaIndex', level: 82 },
  { name: 'Fine-Tuning (LoRA / QLoRA)', level: 75 },
  { name: 'AI Agent Frameworks', level: 72 },
  { name: 'LLM Evaluation & Testing', level: 70 },
  { name: 'MLOps & Production Deployment', level: 65 },
]

const SOFT_SKILLS = [
  { name: 'Product Thinking', description: 'Understand the product problem deeply before reaching for an LLM. Know when AI is the right solution — and when it\'s not.' },
  { name: 'Prompt Intuition', description: 'Develop a feel for how models respond to instruction changes. Debug outputs methodically like a scientist, not by trial and error.' },
  { name: 'Technical Communication', description: 'Explain AI behaviour, limitations, and risks clearly to product managers, executives, and non-technical stakeholders.' },
  { name: 'Rapid Prototyping', description: 'Ship fast, get feedback, iterate. AI engineering moves faster than traditional software — bias toward learning over perfection.' },
  { name: 'Cross-Functional Collaboration', description: 'Work fluidly with data scientists, backend engineers, product managers, and designers on AI-powered features.' },
  { name: 'Ethical Awareness', description: 'Identify hallucination risks, bias, misuse vectors, and privacy concerns before they become production or PR disasters.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'CS / Software Engineering Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#f5f3ff', typeBg: 'rgba(79,70,229,0.1)', typeColor: '#4f46e5',
    pros: ['Strong software engineering base', 'Research network & internships', 'Respected at top tech companies', 'Structured deep learning in algorithms'],
    cons: ['3–4 years to first job', 'Expensive tuition', 'Curriculum often lags industry', 'Less practical AI tooling coverage'],
  },
  {
    type: 'Bootcamp', title: 'AI Engineering / LLM Bootcamp', duration: '3–6 months', cost: 'R60k – R150k',
    borderColor: 'rgba(8,145,178,0.18)', bgColor: '#f0f9ff', typeBg: 'rgba(8,145,178,0.1)', typeColor: '#0891b2',
    pros: ['Fast-tracked practical LLM skills', 'Project portfolio from day one', 'Career support included', 'Cohort of learning peers'],
    cons: ['Shallow on ML theory', 'Variable programme quality', 'Credential not always respected', 'Market is crowded post-bootcamp'],
  },
  {
    type: 'Self-Taught', title: 'Online Courses + Real Projects', duration: '4–18 months', cost: 'R0 – R6k',
    borderColor: 'rgba(124,58,237,0.18)', bgColor: '#faf5ff', typeBg: 'rgba(124,58,237,0.1)', typeColor: '#7c3aed',
    pros: ['Completely flexible pace', 'Very low barrier to start', 'Build exactly what you want', 'World-class free content available'],
    cons: ['Requires extreme self-discipline', 'No formal credential', 'Can feel isolating without peers', 'Hard to know what to prioritise'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Team Sync', desc: 'Review AI product metrics, discuss prompt regressions, unblock each other', duration: '20 min', icon: <Users size={14} /> },
  { time: '9:30', act: 'Prompt & System Design', desc: 'Iterate on prompts, design context windows, improve retrieval quality', duration: '1.5 hrs', icon: <Lightbulb size={14} /> },
  { time: '11:00', act: 'Build & Integrate', desc: 'Code new AI features, RAG chains, agent tools, or evaluation scripts', duration: '2 hrs', icon: <Monitor size={14} /> },
  { time: '1:00', act: 'Lunch Break', desc: 'Step away — AI problems are solved with fresh eyes, not overtime', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Evaluation & Red-Teaming', desc: 'Run evals against golden datasets, probe edge cases, test for hallucinations', duration: '1 hr', icon: <Code size={14} /> },
  { time: '3:00', act: 'Stakeholder Collaboration', desc: 'Demo AI features to product team, gather feedback, document decisions', duration: '1.5 hrs', icon: <MessageSquare size={14} /> },
  { time: '4:30', act: 'Research & Learning', desc: 'Read new model release notes, papers, or engineering blog posts', duration: '1 hr', icon: <Home size={14} /> },
]

const TOOLS = [
  { name: 'OpenAI / Claude API', cat: 'LLM' }, { name: 'LangChain', cat: 'Framework' },
  { name: 'Pinecone / Chroma', cat: 'Vector DB' }, { name: 'FastAPI', cat: 'Backend' },
  { name: 'Docker', cat: 'Infra' }, { name: 'LangSmith', cat: 'Observability' },
  { name: 'Hugging Face', cat: 'Models' }, { name: 'GitHub Actions', cat: 'CI/CD' },
]

const WORK_ENVS = [
  { type: 'Remote', pct: 58 },
  { type: 'Hybrid', pct: 31 },
  { type: 'In-Office', pct: 11 },
]

const AI_IMPACTS = [
  {
    title: 'AI Builds AI Faster', icon: <Sparkles size={20} />,
    desc: 'Use Claude or GPT-4 to write your LangChain pipelines, debug your prompts, and draft your evaluation scripts — AI engineers who use AI tools move 3–5× faster.',
    tools: ['Claude', 'ChatGPT', 'Cursor AI', 'GitHub Copilot'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#f5f3ff', icoBg: 'rgba(79,70,229,0.1)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'Foundation Models Change Everything', icon: <Zap size={20} />,
    desc: 'Instead of training from scratch, AI engineers leverage GPT-4, Claude 3, Gemini, and open models like Llama 3. Your job is to orchestrate and specialise these giants.',
    tools: ['GPT-4o', 'Claude 3.5', 'Llama 3', 'Gemini Pro'],
    borderColor: 'rgba(8,145,178,0.18)', bgColor: '#f0f9ff', icoBg: 'rgba(8,145,178,0.1)', icoColor: '#0891b2', tagBg: 'rgba(8,145,178,0.1)', tagColor: '#0891b2', titleColor: '#0891b2',
  },
  {
    title: 'Agentic Systems Are the New Frontier', icon: <TrendingUp size={20} />,
    desc: 'Multi-agent systems, autonomous coding assistants, and AI workflows are where the field is going. Engineers who can build reliable agents are the most hired in 2026.',
    tools: ['LangGraph', 'AutoGen', 'CrewAI', 'OpenAI Assistants'],
    borderColor: 'rgba(124,58,237,0.18)', bgColor: '#faf5ff', icoBg: 'rgba(124,58,237,0.1)', icoColor: '#7c3aed', tagBg: 'rgba(124,58,237,0.1)', tagColor: '#7c3aed', titleColor: '#7c3aed',
  },
]

const FUTURE_SKILLS = [
  'Multi-Agent Orchestration', 'LLM Observability & Tracing',
  'Structured Output & Tool Calling', 'AI Safety & Guardrails',
  'Multimodal API Integration', 'Model Context Protocol (MCP)',
]

const PROS = [
  { title: 'Fastest-Growing Role in 2026', desc: 'AI Engineer is the #1 emerging role globally, with job postings growing over 100% year-on-year as every company races to ship AI products.' },
  { title: 'Lower Barrier than ML Research', desc: 'You don\'t need a PhD or deep ML theory — strong engineering skills plus LLM knowledge are enough to land senior roles at top companies.' },
  { title: 'Exceptional Salaries', desc: 'Senior AI engineers command R1M+ in SA and significantly more working remotely for global companies in USD or GBP.' },
  { title: 'Build Products People Actually Use', desc: 'Your work ships to users within weeks, not months. AI engineers are shipping chatbots, copilots, and agents used by thousands daily.' },
  { title: 'Intellectually Stimulating', desc: 'LLMs are probabilistic, creative, and unpredictable. Debugging and improving AI systems requires genuine curiosity and creative thinking.' },
  { title: 'Mostly Remote', desc: '58% of AI engineering roles are fully remote, giving you freedom to work for global companies without relocating.' },
]

const CONS = [
  { title: 'Extremely Fast-Moving Field', desc: 'The tooling changes weekly. LangChain v0.1 is nothing like v0.3. You must enjoy continuous learning to stay relevant.' },
  { title: 'Evaluation Is Hard', desc: 'Measuring whether an AI system is actually better is genuinely difficult. Building reliable eval frameworks is one of the hardest open problems.' },
  { title: 'Non-Deterministic Systems', desc: 'LLM outputs are probabilistic. Debugging "why did the model do that?" requires a different mindset than traditional software debugging.' },
  { title: 'API Cost Management', desc: 'At scale, LLM API costs can become significant. Optimising prompts, caching, and model selection for cost-efficiency is a real skill.' },
  { title: 'Hype vs. Reality Gap', desc: 'Stakeholders often expect magic. Setting realistic expectations about LLM capabilities and failure modes is a constant challenge.' },
  { title: 'Security & Privacy Risks', desc: 'Prompt injection, data leakage, and jailbreaks are real threats in production AI systems. Security must be a first-class concern.' },
]

const VIDEOS = [
  { id: 'hhiLw5Q_UFg', title: 'LangChain Explained in 13 Minutes', desc: 'The fastest way to understand LangChain — the most popular AI engineering framework — before building your first RAG pipeline.', dur: '13:35', channel: 'Rabbitmetrics' },
  { id: 'T-D1OfcDW1M', title: 'What is RAG? Retrieval Augmented Generation', desc: 'A clear explanation of how RAG works, why it matters, and how to build your first knowledge-base powered chatbot.', dur: '8:22', channel: 'IBM Technology' },
  { id: 'xZDB1naRUlk', title: 'Build an AI Agent from Scratch', desc: 'Step-by-step walkthrough of building a real autonomous AI agent that can search the web, write code, and complete tasks.', dur: '22:48', channel: 'Code With Prince' },
]

const TAKEAWAYS = [
  'Python and API integration skills are your essential foundation — everything else builds on them',
  'Ship one real AI application before studying another framework or model',
  'Evaluation is 80% of the job — build your eval suite before your first deploy',
  'Read model release notes and API docs obsessively — the field moves weekly',
  'Use AI tools to engineer AI systems — the irony is that this doubles your output',
]

const CAREER_FACTS = [
  { icon: <Bot size={20} />, title: 'What You Build', desc: 'AI chatbots, copilots, RAG knowledge bases, autonomous agents, AI-powered search, summarisation tools, and LLM-backed APIs.', color: '#4f46e5' },
  { icon: <Code size={20} />, title: 'Core Activities', desc: 'Prompt engineering, LLM API integration, RAG pipeline design, fine-tuning, evaluation, and production deployment.', color: '#0891b2' },
  { icon: <Users size={20} />, title: 'Who You Work With', desc: 'Product managers, backend engineers, data scientists, ML researchers, UX designers, and executive stakeholders.', color: '#16a34a' },
  { icon: <TrendingUp size={20} />, title: 'Industry Demand', desc: '#1 fastest-growing tech role globally in 2025–2026. Every company building software is now building AI features.', color: '#ea580c' },
]

const WHY_REASONS = [
  { emoji: '🚀', title: 'Hottest Role in Tech Right Now', desc: 'AI Engineer is the most sought-after job title in 2026. Every funded startup and every enterprise is hiring — demand massively outstrips supply.' },
  { emoji: '💰', title: 'Elite Salaries Without a PhD', desc: 'Unlike ML research, AI engineering rewards strong software skills + LLM knowledge. No PhD required to earn R1M+ at senior level.' },
  { emoji: '🌍', title: 'Work for Global Companies Remotely', desc: 'With 58% of roles fully remote, you can earn USD salaries from Cape Town, Johannesburg, or Durban without relocating.' },
  { emoji: '⚡', title: 'Ship Real Products Incredibly Fast', desc: 'AI engineers ship features that reach real users in days. The feedback loop is addictive — you see your impact immediately.' },
  { emoji: '🧩', title: 'Creative Problem Solving', desc: 'Working with LLMs is part engineering, part psychology. Crafting prompts and architectures that reliably solve real problems is deeply satisfying.' },
  { emoji: '🏆', title: 'Enormous Career Upside', desc: 'From AI Engineer to Staff Engineer to VP of AI — this career path leads directly to the most impactful and well-compensated roles in tech.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#7c3aed', bgColor: '#faf5ff', items: [
    { name: 'DeepLearning.AI Short Courses', url: '#', type: 'Course', rating: 5 },
    { name: 'LangChain Official Docs & Tutorials', url: '#', type: 'Docs', rating: 5 },
    { name: 'fast.ai Practical Deep Learning', url: '#', type: 'Course', rating: 4 },
    { name: 'Hugging Face NLP Course', url: '#', type: 'Course', rating: 5 },
  ]},
  { category: 'Practice', color: '#0891b2', bgColor: '#f0f9ff', items: [
    { name: 'Build a RAG app from scratch', url: '#', type: 'Project', rating: 5 },
    { name: 'OpenAI Cookbook', url: '#', type: 'Recipes', rating: 5 },
    { name: 'Anthropic Prompt Library', url: '#', type: 'Examples', rating: 4 },
    { name: 'LLM Evaluation Benchmarks', url: '#', type: 'Research', rating: 4 },
  ]},
  { category: 'Communities', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'Latent Space Discord', url: '#', type: 'Discord', rating: 5 },
    { name: 'r/LocalLLaMA', url: '#', type: 'Forum', rating: 4 },
    { name: 'Hugging Face Discord', url: '#', type: 'Discord', rating: 5 },
    { name: 'AI Twitter / X Community', url: '#', type: 'Social', rating: 4 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior AI Engineer', range: 'R380k – R580k', midpoint: 480, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'AI Engineer', range: 'R650k – R1.1M', midpoint: 875, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior AI Engineer', range: 'R1.1M – R1.7M', midpoint: 1400, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Staff AI Engineer / AI Architect', range: 'R2M – R3.5M+', midpoint: 2500, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  { num: '01', title: 'Skipping Evals', desc: 'Building and shipping AI features without any evaluation pipeline. You have no idea if your model is getting better or worse with each prompt change.', fix: 'Build a golden eval set with at least 50 representative examples before your first deploy.' },
  { num: '02', title: 'LangChain Overengineering', desc: 'Using complex agent frameworks for simple prompt-and-response tasks. Simple LLM calls with good prompts often outperform elaborate pipelines.', fix: 'Start with direct API calls. Only add a framework when plain calls are genuinely insufficient.' },
  { num: '03', title: 'Ignoring Prompt Security', desc: 'Shipping AI features without testing for prompt injection, jailbreaks, and data leakage. These are real attack vectors, not theoretical concerns.', fix: 'Red-team every AI feature you build before it goes to production. Hire someone to try to break it.' },
  { num: '04', title: 'Using Only One Model', desc: 'Locking your architecture to a single LLM provider. Model prices drop, capabilities improve, and new models emerge — you need a flexible abstraction layer.', fix: 'Architect your system to swap models with a config change. Abstract the LLM client from day one.' },
  { num: '05', title: 'No Observability', desc: 'Shipping AI features that you can\'t trace, monitor, or debug in production. When something breaks, you have no idea what happened.', fix: 'Add LangSmith, Langfuse, or Helicone tracing from day one. Log every LLM call with full context.' },
  { num: '06', title: 'Chasing Every New Model', desc: 'Rebuilding your architecture every week when a new model drops. GPT-4o, Claude 3.5, Llama 3 — each needs proper evaluation before you migrate.', fix: 'Evaluate new models against your eval set before deciding to switch. Metrics first, hype second.' },
]

const CAREER_CHANGE_PATHS = [
  { from: 'Backend / Full-Stack Engineer', ease: 'Easiest', easeColor: '#16a34a', easeBg: '#f0fdf4', desc: 'Your software engineering skills are 80% of the job. Add LLM API knowledge, prompt engineering, and RAG fundamentals and you\'re job-ready within months.', steps: ['Learn OpenAI / Anthropic APIs', 'Build a RAG chatbot project', 'Study LangChain fundamentals', 'Apply for Junior AI Engineer roles'] },
  { from: 'Data Scientist / ML Engineer', ease: 'Natural Fit', easeColor: '#0891b2', easeBg: '#f0f9ff', desc: 'You understand models and data. Bridge to AI engineering by learning LLM tooling, prompt design, and production deployment patterns.', steps: ['Learn LangChain and LlamaIndex', 'Study RAG pipeline design', 'Build an agent-based project', 'Add software engineering skills'] },
  { from: 'Product Manager / Designer', ease: 'Manageable', easeColor: '#7c3aed', easeBg: '#faf5ff', desc: 'Your product intuition is invaluable. Add Python, API integration, and prompt engineering skills through dedicated study over 6–12 months.', steps: ['Learn Python fundamentals', 'Complete an AI engineering course', 'Build a portfolio project', 'Target "AI Product Engineer" hybrid roles'] },
  { from: 'Other Background', ease: 'Challenging', easeColor: '#ea580c', easeBg: '#fff7ed', desc: 'Building from scratch takes 12–18 months of focused effort, but this career has one of the highest payoffs for career changers right now.', steps: ['Start with Python (3 months)', 'Complete an AI bootcamp', 'Build 3 real AI projects', 'Network relentlessly on LinkedIn'] },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Python & API Basics', color: '#0891b2', bg: '#f0f9ff', days: [
    { day: 'Day 1–2', task: 'Set up Python, VS Code, and your first virtual environment' },
    { day: 'Day 3–4', task: 'Python fundamentals: functions, classes, error handling' },
    { day: 'Day 5–6', task: 'Make your first OpenAI API call and parse the response' },
    { day: 'Day 7', task: 'Build a simple Q&A chatbot with conversation history' },
  ]},
  { week: 'Week 2', theme: 'Prompt Engineering', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Study system prompts, zero-shot and few-shot techniques' },
    { day: 'Day 10–11', task: 'Learn structured output with JSON mode and function calling' },
    { day: 'Day 12–13', task: 'Build a document summariser with different prompt strategies' },
    { day: 'Day 14', task: 'Test and document which prompt patterns work best for your task' },
  ]},
  { week: 'Week 3', theme: 'RAG Pipeline', color: '#7c3aed', bg: '#faf5ff', days: [
    { day: 'Day 15–16', task: 'Learn what embeddings are and how vector search works' },
    { day: 'Day 17–18', task: 'Set up ChromaDB and embed your first document set' },
    { day: 'Day 19–20', task: 'Build a RAG pipeline that answers questions from your own PDFs' },
    { day: 'Day 21', task: 'Add basic evaluation: does the RAG answer beat vanilla GPT-4?' },
  ]},
  { week: 'Week 4', theme: 'Ship It', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Wrap your RAG chatbot in a FastAPI backend with proper error handling' },
    { day: 'Day 25–26', task: 'Add a simple Streamlit or Next.js frontend so it looks like a real product' },
    { day: 'Day 27–28', task: 'Deploy to Railway, Render, or HuggingFace Spaces' },
    { day: 'Day 29–30', task: 'Write a LinkedIn post about what you built. Start applying to AI roles.' },
  ]},
]

/* ─── SHARE BAR ───────────────────────────────────────────────────────────── */
function ShareBar() {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }
  const handleShare = async () => {
    if (navigator.share) { try { await navigator.share({ title: 'AI Engineer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become an AI Engineer in 2026', url: window.location.href }) } catch (_) {} } else { handleCopy() }
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-10 p-4 rounded-2xl" style={{ background: '#f8f9ff', border: `1px solid ${C.border}` }}>
      <span className="text-xs font-semibold" style={{ color: C.textMuted }}>Share this roadmap:</span>
      <button onClick={handleCopy} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: copied ? 'rgba(22,163,74,0.1)' : C.indigoLight, color: copied ? '#16a34a' : C.indigo, outline: 'none' }}>
        {copied ? <CheckCheck size={13} /> : <Copy size={13} />}{copied ? 'Copied!' : 'Copy Link'}
      </button>
      <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: C.tealLight, color: C.teal, outline: 'none' }}>
        <Download size={13} />Download / Save PDF
      </button>
      <button onClick={handleShare} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: C.orangeLight, color: C.orange, outline: 'none' }}>
        <Share2 size={13} />Share
      </button>
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono truncate max-w-xs" style={{ background: '#f1f5f9', color: C.textMuted, border: `1px solid ${C.border}` }}>
        <Link2 size={11} style={{ color: C.textFaint, flexShrink: 0 }} />
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/ai-engineer'}</span>
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

export default function AIEngineerRoadmapPage() {
  const progressRef = useRef<HTMLDivElement>(null)
  const tlSectionRef = useRef<HTMLElement>(null)
  const barsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap'; document.head.appendChild(link)
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
      bars?.forEach(bar => { const w = bar.dataset.barW; gsap.fromTo(bar, { width: '0%' }, { width: `${w}%`, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: bar, start: 'top 92%', toggleActions: 'play none none reverse' } }) })
    }); return () => ctx.revert()
  }, [])

  const heroRef = useFade(); const introRef = useFade(); const whatRef = useFade(); const whyRef = useFade()
  const tlRef = useFade(); const stepsRef = useFade(); const skillsRef = useFade(); const eduRef = useFade()
  const freeRef = useFade(); const dayRef = useFade(); const pcRef = useFade(); const aiRef = useFade()
  const salaryRef = useFade(); const mistakesRef = useFade(); const changeRef = useFade()
  const planRef = useFade(); const finalRef = useFade(); const vidsRef = useFade()

  const sectionStyle = { paddingTop: 72, paddingBottom: 72, borderBottomColor: C.border }

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.text, fontFamily: 'Inter, sans-serif' }}>
      <Link to="/roadmaps" className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold no-underline transition-all duration-200" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', border: `1px solid ${C.border}`, color: C.textMuted, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <ArrowLeft size={14} /> All Roadmaps
      </Link>

      {/* HERO */}
      <div className="relative w-full" style={{ background: C.bg }}>
        <div className="relative w-full overflow-hidden" style={{ height: 520 }}>
          <img src="https://i.imgur.com/NWydjMJ_d.webp?maxwidth=760&fidelity=grand" alt="AI Engineer workspace" className="w-full h-full object-cover object-center block" style={{ filter: 'saturate(0.55) brightness(1.05)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 55%, rgba(255,255,255,0.75) 78%, rgba(255,255,255,1) 92%)' }} />
          <div ref={heroRef} className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-8">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.indigoLight, color: C.indigo }}>
                <Cpu size={12} /> AI & Data
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                AI Engineer
              </h1>
              <span className="block font-normal mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', color: C.textMuted, letterSpacing: '-0.01em' }}>
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
            Build intelligent products by integrating, orchestrating, and deploying large language models. The AI Engineer is the bridge between raw AI capabilities and real-world applications — one of the most in-demand and highest-paying roles in tech today.
          </p>
          <div className="h-px mt-10" style={{ background: C.border }} />
        </div>
      </div>

      {/* TOC */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={introRef}>
            <SectionHeader icon={<BookOpen size={22} />} title="What's Inside" subtitle="Everything you need to know about becoming an AI Engineer" iconBg={C.indigoLight} iconColor={C.indigo} />
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
            <SectionHeader icon={<Cpu size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of AI Engineering" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f5f3ff', borderColor: 'rgba(79,70,229,0.15)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                An <strong style={{ color: C.indigo }}>AI Engineer</strong> is the hands-on builder who turns cutting-edge AI models into real, production-grade products. Unlike a data scientist who focuses on analysis, or a pure ML researcher who focuses on model training, an AI engineer specialises in <em>integrating</em> foundation models into products — using APIs, prompt engineering, RAG pipelines, and agent frameworks to solve genuine business problems.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons AI Engineering could be your best move" iconBg="rgba(234,88,12,0.1)" iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical AI engineer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(79,70,229,0.3)'; (e.currentTarget as HTMLElement).style.background = '#f8f9ff' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.background = C.bg }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: C.indigoLight, color: C.indigo }}>{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="text-sm font-semibold" style={{ color: C.text }}>{item.act}</span>
                        <span className="text-xs flex-shrink-0" style={{ color: C.textMuted }}>{item.duration}</span>
                      </div>
                      <div className="text-xs" style={{ color: C.textMuted }}>{item.desc}</div>
                    </div>
                    <span className="font-mono text-xs flex-shrink-0" style={{ color: C.indigo }}>{item.time}</span>
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
                        <span className="font-mono" style={{ color: C.indigo }}>{e.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${e.pct}%`, background: C.indigo }} />
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
            <SectionHeader icon={<Clock size={22} />} title="Career Timeline" subtitle="Time estimates and salary ranges at each level" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="mb-10">
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → Staff</span></div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                <div ref={progressRef} className="h-1.5 rounded-full" style={{ width: '0%', background: 'linear-gradient(90deg, #0891b2 0%, #16a34a 33%, #7c3aed 66%, #ea580c 100%)' }} />
              </div>
              <div className="flex justify-between mt-2.5">
                {CAREER_LEVELS.map(l => (<span key={l.level} className="font-mono" style={{ color: l.accent, fontSize: '0.68rem' }}>{l.duration}</span>))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              {CAREER_LEVELS.map(l => (
                <div key={l.level} className="rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-default" style={{ background: C.bg, borderColor: l.accentBorder }}>
                  <div className="inline-block rounded-full px-2.5 py-0.5 mb-3 font-mono text-xs font-bold uppercase tracking-widest" style={{ background: l.accentBg, color: l.accent }}>{l.level}</div>
                  <div className="text-base font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>{l.title}</div>
                  <div className="text-sm font-semibold mb-2.5" style={{ color: l.accent }}>{l.salary}</div>
                  <div className="text-xs leading-relaxed mb-3.5" style={{ color: C.textMuted }}>{l.description}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {l.skills.map(s => (<span key={s} className="rounded px-1.5 py-0.5 font-mono text-xs" style={{ background: '#f1f5f9', color: C.textMuted }}>{s}</span>))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP STEPS */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div ref={stepsRef} className="max-w-2xl mx-auto px-4">
          <SectionHeader icon={<Target size={22} />} title="Step-by-Step Roadmap" subtitle="Your path from complete beginner to job-ready AI Engineer" iconBg={C.indigoLight} iconColor={C.indigo} />
          <div className="relative flex flex-col items-center" style={{ gap: 0 }}>
            {ROADMAP_STEPS.map((s, i) => {
              const icons = ['🐍', '💬', '🔍', '🤖', '⚡', '🚀']
              const accentColors = ['#0891b2','#4f46e5','#0891b2','#4f46e5','#0891b2','#4f46e5']
              const accent = accentColors[i]; const isLast = i === ROADMAP_STEPS.length - 1; const isEven = i % 2 === 0
              return (
                <div key={s.step} className="w-full flex flex-col items-center">
                  <div className="w-full relative" style={{ opacity: 0, transform: 'translateY(20px)', transition: `opacity 0.5s ${i * 0.13}s ease, transform 0.5s ${i * 0.13}s ease` }}
                    ref={el => { if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect() } }, { threshold: 0.15 }); obs.observe(el) }}>
                    <div className="w-full rounded-3xl overflow-hidden" style={{ background: `${accent}08`, border: `2px solid ${accent}25`, boxShadow: `0 4px 24px ${accent}12` }}>
                      <div className="flex items-center gap-4 px-5 py-5">
                        <div className="flex-shrink-0 flex items-center justify-center rounded-full text-2xl font-bold" style={{ width: 64, height: 64, background: `linear-gradient(135deg, ${accent}20, ${accent}10)`, border: `3px solid ${accent}40`, boxShadow: `0 0 16px ${accent}20` }}>{icons[i]}</div>
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
                    <div className="flex w-full" style={{ height: 48, position: 'relative' }}>
                      <svg viewBox="0 0 400 48" className="w-full" style={{ height: 48, display: 'block' }} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d={isEven ? 'M200,0 C200,24 380,24 380,48' : 'M200,0 C200,24 20,24 20,48'} fill="none" stroke="#e2e8f0" strokeWidth="40" strokeLinecap="round" />
                        <path d={isEven ? 'M200,0 C200,24 380,24 380,48' : 'M200,0 C200,24 20,24 20,48'} fill="none" stroke={accentColors[i + 1] ?? accentColors[i]} strokeWidth="4" strokeLinecap="round" strokeOpacity="0.4" strokeDasharray="12 8" />
                        {isEven ? <polygon points="372,36 388,44 372,52" fill={accentColors[i+1] ?? accentColors[i]} opacity="0.5" /> : <polygon points="28,36 12,44 28,52" fill={accentColors[i+1] ?? accentColors[i]} opacity="0.5" />}
                      </svg>
                    </div>
                  )}
                </div>
              )
            })}
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.indigo} 0%, ${C.violet} 100%)`, boxShadow: '0 8px 48px rgba(79,70,229,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>8–12 months · Consistent daily practice · Build real AI products</div>
            </div>
          </div>
          
        </div>
      </section>

      {/* SKILLS */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={skillsRef}>
            <SectionHeader icon={<CheckCircle2 size={22} />} title="Skill Checkpoints" subtitle="Technical and interpersonal skills to develop on your journey" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl p-7 border" style={{ background: C.bg, borderColor: C.border }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: C.indigoLight }}><Code size={16} style={{ color: C.indigo }} /></div>
                  <div><div className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Hard Skills</div><div className="text-xs mt-0.5" style={{ color: C.textMuted }}>Technical competencies required</div></div>
                </div>
                <div ref={barsContainerRef}>
                  {HARD_SKILLS.map(s => (
                    <div key={s.name} className="mb-4">
                      <div className="flex justify-between mb-1.5"><span className="text-xs" style={{ color: C.textMuted }}>{s.name}</span><span className="text-xs font-mono" style={{ color: C.textFaint }}>{s.level}%</span></div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                        <div className="h-1.5 rounded-full" data-bar-w={s.level} style={{ width: 0, background: `linear-gradient(90deg, ${C.indigo}, ${C.teal})` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-7 border" style={{ background: C.bg, borderColor: C.border }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: C.tealLight }}><MessageSquare size={16} style={{ color: C.teal }} /></div>
                  <div><div className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Soft Skills</div><div className="text-xs mt-0.5" style={{ color: C.textMuted }}>Interpersonal abilities to build</div></div>
                </div>
                {SOFT_SKILLS.map(s => (
                  <div key={s.name} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border transition-colors duration-150 cursor-default" style={{ background: '#f8f9ff', borderColor: C.border }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.indigoLight}
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
            <SectionHeader icon={<GraduationCap size={22} />} title="Education Paths" subtitle="Three routes into AI Engineering — pick yours" iconBg="rgba(148,163,184,0.1)" iconColor={C.textMuted} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {EDU_PATHS.map(p => (
                <div key={p.type} className="rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg" style={{ background: p.bgColor, borderColor: p.borderColor }}>
                  <div className="inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest mb-4 font-mono" style={{ background: p.typeBg, color: p.typeColor }}>{p.type}</div>
                  <div className="text-base font-bold mb-3.5" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>{p.title}</div>
                  <div className="flex gap-3.5 text-xs mb-4" style={{ color: C.textMuted }}>
                    <span className="flex items-center gap-1"><Clock size={11} />{p.duration}</span>
                    <span className="flex items-center gap-1"><DollarSign size={11} />{p.cost}</span>
                  </div>
                  <div className="text-xs font-bold mb-2" style={{ color: '#16a34a' }}>Advantages</div>
                  {p.pros.map(item => (<div key={item} className="flex items-start gap-2 text-xs mb-1.5 leading-relaxed" style={{ color: C.textMuted }}><Check size={11} style={{ color: '#16a34a', flexShrink: 0, marginTop: 2 }} />{item}</div>))}
                  <div className="text-xs font-bold mb-2 mt-3.5" style={{ color: '#dc2626' }}>Challenges</div>
                  {p.cons.map(item => (<div key={item} className="flex items-start gap-2 text-xs mb-1.5 leading-relaxed" style={{ color: C.textMuted }}><X size={11} style={{ color: '#dc2626', flexShrink: 0, marginTop: 2 }} />{item}</div>))}
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
            <SectionHeader icon={<BookOpen size={22} />} title="Best Free Resources" subtitle="World-class AI engineering learning material, mostly free" iconBg="rgba(22,163,74,0.1)" iconColor={C.green} />
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
                      <div className="flex gap-0.5">{[...Array(5)].map((_, i) => (<Star key={i} size={10} fill={i < item.rating ? cat.color : 'none'} style={{ color: i < item.rating ? cat.color : C.textFaint }} />))}</div>
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
            <SectionHeader icon={<Bot size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI tools are transforming AI engineering itself in 2026" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f5f3ff', borderColor: 'rgba(79,70,229,0.15)', color: C.textMuted }}>
              The best AI engineers use <em style={{ color: C.indigo }}>AI to build AI</em>. Using Claude, Copilot, and ChatGPT to write your LangChain pipelines, debug your prompts, and generate evaluation datasets means you can ship 3–5× faster than engineers who don't.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-9">
              {AI_IMPACTS.map(item => (
                <div key={item.title} className="rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-1 hover:shadow-md" style={{ background: item.bgColor, borderColor: item.borderColor }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: item.icoBg }}><span style={{ color: item.icoColor }}>{item.icon}</span></div>
                  <div className="text-sm font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif', color: item.titleColor }}>{item.title}</div>
                  <div className="text-xs leading-relaxed mb-3.5" style={{ color: C.textMuted }}>{item.desc}</div>
                  <div className="flex flex-wrap gap-1.5">{item.tools.map(t => (<span key={t} className="rounded px-2 py-0.5 text-xs font-mono font-semibold" style={{ background: item.tagBg, color: item.tagColor }}>{t}</span>))}</div>
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Emerging Skills to Learn Now</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {FUTURE_SKILLS.map((s, i) => (
                <div key={s} className="flex items-center gap-2.5 rounded-xl px-4 py-3.5 border" style={{ background: '#f8f9ff', borderColor: C.border }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-black text-xs" style={{ background: C.indigoLight, color: C.indigo }}>{i + 1}</div>
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
            <SectionHeader icon={<Scale size={22} />} title="Pros & Cons" subtitle="The honest picture of the AI Engineering career path" iconBg="rgba(148,163,184,0.1)" iconColor={C.textMuted} />
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
            <SectionHeader icon={<DollarSign size={22} />} title="Salary" subtitle="What you can realistically earn as an AI Engineer in South Africa" iconBg="rgba(22,163,74,0.1)" iconColor={C.green} />
            <div className="rounded-2xl p-6 mb-6 border" style={{ background: '#f0fdf4', borderColor: 'rgba(22,163,74,0.2)' }}>
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>South African total compensation figures below. Senior AI engineers contracting globally in USD can earn significantly more — often 3–5× these ranges.</p>
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
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f5f3ff', borderColor: 'rgba(79,70,229,0.15)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.indigo }}>Pro tip:</strong> The fastest salary jump comes from moving to companies where AI is the core product — not just a feature. Target AI-first startups and AI divisions of large enterprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISTAKES */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring AI engineers" iconBg="rgba(234,88,12,0.1)" iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into AI Engineering from your current background" iconBg={C.tealLight} iconColor={C.teal} />
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
            <SectionHeader icon={<Calendar size={22} />} title="30-Day Action Plan" subtitle="Exactly what to do in your first month. Start today." iconBg="rgba(234,88,12,0.1)" iconColor={C.orange} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="The best video explanations of AI Engineering concepts" iconBg="rgba(220,38,38,0.1)" iconColor={C.red} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {VIDEOS.map(v => (
                <div key={v.id} className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ background: '#f8f9ff', borderColor: C.border }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.3)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: '#0a0c1a' }}>
                    <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} className="w-full h-full object-cover" style={{ opacity: 0.75 }} />
                    <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center no-underline">
                      <div className="w-13 h-13 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110" style={{ width: 52, height: 52, background: 'rgba(220,38,38,0.9)' }}>
                        <Play size={20} fill="white" style={{ color: '#fff', marginLeft: 2 }} />
                      </div>
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

      {/* FINAL THOUGHTS */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={finalRef}>
            <SectionHeader icon={<Award size={22} />} title="Final Thoughts" subtitle="What we want you to take away from this guide" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="rounded-2xl p-6 border mb-8" style={{ background: C.bg, borderColor: C.border }}>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#374151' }}>
                AI Engineering in 2026 is the most accessible high-paying career pivot in tech. You don't need a PhD. You don't need to train your own models from scratch. You need Python, strong engineering instincts, a deep understanding of how LLMs behave, and the discipline to build and ship real things.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The engineers who will win are the ones who combine <strong style={{ color: C.indigo }}>rigorous evaluation thinking</strong> with <strong style={{ color: C.indigo }}>fast shipping</strong>. Don't just tinker — build something real, measure it properly, and put it in front of users. That gap between tinkering and shipping is where careers are made.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {TAKEAWAYS.map((t, i) => (
                <div key={t} className="flex items-center gap-3.5 rounded-xl px-5 py-3.5 border" style={{ background: C.bg, borderColor: C.border }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-black text-xs" style={{ background: C.indigoLight, color: C.indigo }}>{i + 1}</div>
                  <span className="text-sm" style={{ color: C.text }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-8" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="relative overflow-hidden rounded-3xl px-12 py-16 text-center" style={{ background: `linear-gradient(135deg, ${C.indigo} 0%, ${C.violet} 50%, #6d28d9 100%)` }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: 'rgba(255,255,255,0.05)', top: -120, right: -80 }} />
          <div className="absolute rounded-full pointer-events-none" style={{ width: 200, height: 200, background: 'rgba(255,255,255,0.04)', bottom: -80, left: -60 }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Rocket size={30} style={{ color: '#fff' }} />
          </div>
          <h2 className="font-extrabold text-white mb-3 tracking-tight" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
            Ready to Start Your AI Engineering Journey?
          </h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>
            You now have the roadmap, the resources, and the plan. The AI revolution is happening right now. The only question is whether you're building it — or watching it.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline transition-opacity duration-150 hover:opacity-90" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.indigo }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start building today. Your future self will thank you.</p>
        </div>
      </div>
      <ShareBar />
    </div>
  )
}