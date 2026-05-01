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
  Award, Target,  Flame,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── COLORS (light theme) ────────────────────────────────────────────────── */
const C = {
  bg: '#ffffff',
  bgAlt: '#f8f9ff',
  bgCard: '#ffffff',
  border: 'rgba(0,0,0,0.07)',
  borderStrong: 'rgba(0,0,0,0.12)',
  text: '#0f172a',
  textMuted: '#64748b',
  textFaint: '#94a3b8',
  violet: '#7c3aed',
  violetLight: 'rgba(124,58,237,0.08)',
  violetMid: 'rgba(124,58,237,0.15)',
  teal: '#0891b2',
  tealLight: 'rgba(8,145,178,0.08)',
  green: '#16a34a',
  greenLight: 'rgba(22,163,74,0.08)',
  red: '#dc2626',
  redLight: 'rgba(220,38,38,0.08)',
  orange: '#ea580c',
  orangeLight: 'rgba(234,88,12,0.08)',
  indigo: '#4f46e5',
  indigoLight: 'rgba(79,70,229,0.08)',
}

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const CAREER_LEVELS = [
  { level: 'Beginner', title: 'Junior ML Engineer', duration: '0–2 yrs', salary: 'R400k–R600k', description: 'Run supervised learning experiments with guidance and learn the ML workflow end to end.', skills: ['Python', 'Scikit-learn', 'Pandas', 'Stats'], accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)' },
  { level: 'Intermediate', title: 'ML Engineer', duration: '2–5 yrs', salary: 'R700k–R1.2M', description: 'Train and deploy models independently, own evaluation pipelines, and contribute to MLOps.', skills: ['PyTorch/TF', 'MLflow', 'Docker', 'Cloud AI'], accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)' },
  { level: 'Advanced', title: 'Senior ML Engineer', duration: '5–8 yrs', salary: 'R1.2M–R1.8M', description: 'Lead model architecture decisions, mentor juniors, and drive model quality across products.', skills: ['Architecture', 'LLM FT', 'System Design', 'Lead'], accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)' },
  { level: 'Expert', title: 'Staff / Principal ML', duration: '8+ yrs', salary: 'R2M+', description: 'Define AI strategy, publish research, and solve frontier problems that shape the entire field.', skills: ['Research', 'AI Strategy', 'Publications', 'Org'], accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)' },
]

const ROADMAP_STEPS = [
  { step: 1, title: 'Python & Math Foundations', description: 'Build a rock-solid base in Python, linear algebra, calculus, and probability. These non-negotiables gate every advanced concept.', duration: '2–3 months', skills: ['Python', 'NumPy', 'Linear Algebra', 'Statistics'] },
  { step: 2, title: 'Data Wrangling & EDA', description: 'Learn to clean, transform, and explore real-world datasets. Data quality is the single biggest driver of model quality.', duration: '1–2 months', skills: ['Pandas', 'Matplotlib', 'Seaborn', 'SQL'] },
  { step: 3, title: 'Classical Machine Learning', description: 'Master supervised and unsupervised algorithms. Understand why each works — not just how to call it from Scikit-learn.', duration: '2–3 months', skills: ['Scikit-learn', 'Regression', 'Decision Trees', 'Clustering'] },
  { step: 4, title: 'Deep Learning & Transformers', description: 'Dive into neural networks, CNNs, RNNs, and the Transformer architecture. Train models on real data with PyTorch.', duration: '3–4 months', skills: ['PyTorch', 'CNNs', 'Transformers', 'TensorFlow'] },
  { step: 5, title: 'MLOps & Production Deployment', description: 'Learn to ship models to production, monitor drift, and maintain pipelines. This is what separates hobbyists from professionals.', duration: '2 months', skills: ['Docker', 'MLflow', 'FastAPI', 'Cloud AI'] },
  { step: 6, title: 'LLMs & Specialisation', description: 'Fine-tune large language models, build RAG pipelines, and specialise in a domain: NLP, vision, or reinforcement learning.', duration: '2–3 months', skills: ['Hugging Face', 'LangChain', 'LoRA / QLoRA', 'RAG'] },
]

const HARD_SKILLS = [
  { name: 'Python & Data Libraries (NumPy, Pandas)', level: 95 },
  { name: 'Machine Learning Fundamentals', level: 90 },
  { name: 'Deep Learning & Neural Networks', level: 85 },
  { name: 'PyTorch / TensorFlow', level: 80 },
  { name: 'MLOps & Model Deployment', level: 72 },
  { name: 'NLP & LLM Fine-Tuning', level: 70 },
  { name: 'Computer Vision', level: 65 },
  { name: 'Distributed Training & Cloud AI', level: 58 },
]

const SOFT_SKILLS = [
  { name: 'Research Mindset', description: 'Read and apply cutting-edge papers; translate theory into working systems.' },
  { name: 'Experimental Thinking', description: 'Design rigorous experiments, track metrics, and iterate fast on insights.' },
  { name: 'Communication', description: 'Explain complex model behaviour clearly to non-technical stakeholders.' },
  { name: 'Statistical Intuition', description: 'Spot data leakage, bias, and overfitting before they become production problems.' },
  { name: 'Collaboration', description: 'Work fluidly alongside data engineers, product teams, and infrastructure.' },
  { name: 'Ethical Judgment', description: 'Evaluate fairness, safety, and societal impact of every model you ship.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'CS / Statistics Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#f5f3ff', typeBg: 'rgba(79,70,229,0.1)', typeColor: '#4f46e5',
    pros: ['Strong mathematical foundation', 'Research network & internships', 'Valued at top AI labs', 'Peer cohort & connections'],
    cons: ['Time-intensive (3–4 years)', 'Expensive tuition costs', 'Slow initial career start', 'Theory-heavy curriculum'],
  },
  {
    type: 'Bootcamp', title: 'ML / Data Science Bootcamp', duration: '3–6 months', cost: 'R80k – R180k',
    borderColor: 'rgba(8,145,178,0.18)', bgColor: '#f0f9ff', typeBg: 'rgba(8,145,178,0.1)', typeColor: '#0891b2',
    pros: ['Fast-tracked practical skills', 'Project-based curriculum', 'Career services included', 'Strong community cohort'],
    cons: ['Limited theoretical depth', 'Variable programme quality', 'Credential not always respected', 'Competitive job market entry'],
  },
  {
    type: 'Self-Taught', title: 'Online Courses + Projects', duration: '6–24 months', cost: 'R0 – R6k',
    borderColor: 'rgba(124,58,237,0.18)', bgColor: '#faf5ff', typeBg: 'rgba(124,58,237,0.1)', typeColor: '#7c3aed',
    pros: ['Fully flexible schedule', 'Very low cost to start', 'Curate your own path', 'Global world-class resources'],
    cons: ['Requires iron discipline', 'No formal credential', 'Can feel isolating', 'Hard to validate skills early'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Team Standup', desc: 'Sync on experiment progress, blockers, and model metrics', duration: '15 min', icon: <Users size={14} /> },
  { time: '9:30', act: 'Experiment Design', desc: 'Write hypothesis, set up training runs, configure hyperparameters', duration: '1.5 hrs', icon: <Lightbulb size={14} /> },
  { time: '11:00', act: 'Model Training', desc: 'Launch training jobs, monitor loss curves, review training logs', duration: '2 hrs', icon: <Monitor size={14} /> },
  { time: '1:00', act: 'Lunch Break', desc: 'Step away from the screen, recharge, and decompress', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Paper Reading', desc: 'Stay current — read a new arXiv paper or engineering blog post', duration: '1 hr', icon: <Code size={14} /> },
  { time: '3:00', act: 'Code & Evaluation', desc: 'Analyse results, write evaluation scripts, improve the pipeline', duration: '2 hrs', icon: <MessageSquare size={14} /> },
  { time: '5:00', act: 'Async Reviews & Docs', desc: 'Review PRs, update experiment tracking, log key findings', duration: '30 min', icon: <Home size={14} /> },
]

const TOOLS = [
  { name: 'PyTorch', cat: 'Framework' }, { name: 'Jupyter', cat: 'Notebook' },
  { name: 'W&B', cat: 'Tracking' }, { name: 'VS Code', cat: 'IDE' },
  { name: 'Docker', cat: 'Infra' }, { name: 'AWS / GCP', cat: 'Cloud' },
  { name: 'Hugging Face', cat: 'Models' }, { name: 'GitHub', cat: 'Version Control' },
]

const WORK_ENVS = [
  { type: 'Remote', pct: 52 },
  { type: 'Hybrid', pct: 33 },
  { type: 'In-Office', pct: 15 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Assisted Experimentation', icon: <Sparkles size={20} />,
    desc: 'Use AutoML platforms and neural architecture search to run 10× more experiments in the same time.',
    tools: ['AutoML', 'Optuna', 'Ray Tune', 'NAS'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#f5f3ff', icoBg: 'rgba(79,70,229,0.1)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'LLM-Powered Code & Debugging', icon: <Zap size={20} />,
    desc: 'GitHub Copilot, Claude, and GPT-4 accelerate writing training pipelines, data loaders, and evaluation scripts.',
    tools: ['GitHub Copilot', 'Claude', 'ChatGPT', 'Cursor AI'],
    borderColor: 'rgba(8,145,178,0.18)', bgColor: '#f0f9ff', icoBg: 'rgba(8,145,178,0.1)', icoColor: '#0891b2', tagBg: 'rgba(8,145,178,0.1)', tagColor: '#0891b2', titleColor: '#0891b2',
  },
  {
    title: 'Foundation Model Fine-Tuning', icon: <TrendingUp size={20} />,
    desc: 'Instead of training from scratch, adapt pre-trained LLMs and vision models for your domain with LoRA / QLoRA.',
    tools: ['LoRA / QLoRA', 'PEFT', 'Hugging Face', 'vLLM'],
    borderColor: 'rgba(124,58,237,0.18)', bgColor: '#faf5ff', icoBg: 'rgba(124,58,237,0.1)', icoColor: '#7c3aed', tagBg: 'rgba(124,58,237,0.1)', tagColor: '#7c3aed', titleColor: '#7c3aed',
  },
]

const FUTURE_SKILLS = [
  'Prompt Engineering & Evaluation', 'Retrieval-Augmented Generation (RAG)',
  'RLHF & Alignment Techniques', 'Multimodal Model Development',
  'LLM Observability & Monitoring', 'AI Safety & Red-Teaming',
]

const PROS = [
  { title: 'Explosive Demand', desc: 'AI engineers are among the most sought-after professionals globally, with job postings growing 75% year-over-year.' },
  { title: 'Frontier Work', desc: "Build systems that push the boundaries of what's possible — from generative AI to fully autonomous agents." },
  { title: 'Exceptional Salaries', desc: 'Top-tier compensation with senior roles exceeding R2M total comp at leading South African and global companies.' },
  { title: 'High Impact', desc: 'Your models directly shape products used by millions of people and influence entire industries.' },
  { title: 'Intellectual Depth', desc: 'Combines maths, statistics, software engineering, and domain expertise into a uniquely stimulating discipline.' },
  { title: 'Remote-Friendly', desc: 'Most AI/ML roles are fully remote or hybrid, giving you flexibility to work from anywhere in the world.' },
]

const CONS = [
  { title: 'Steep Learning Curve', desc: 'Requires strong foundations in linear algebra, calculus, statistics, and programming before tackling advanced ML.' },
  { title: 'Compute Costs', desc: 'Training large models is expensive. Access to GPUs and cloud budgets can be a genuine bottleneck.' },
  { title: 'Rapid Obsolescence', desc: "Techniques and architectures change fast — what's state-of-the-art today may be outdated next year." },
  { title: 'Data Dependency', desc: 'Model quality is only as good as your data. Obtaining, cleaning, and labelling it is unglamorous but critical.' },
  { title: 'Evaluation Challenges', desc: 'Measuring model performance fairly and avoiding benchmark overfitting requires careful, rigorous methodology.' },
  { title: 'Ethical Complexity', desc: 'Navigating bias, fairness, hallucinations, and misuse adds significant responsibility to every project you ship.' },
]

const VIDEOS = [
  { id: 'aircAruvnKk', title: 'But what is a neural network?', desc: "3Blue1Brown's iconic visual explanation of how neural networks learn — the best introduction on the internet.", dur: '19:13', channel: '3Blue1Brown' },
  { id: 'wjZofJX0v4M', title: 'Deep Learning in 100 Seconds', desc: 'A lightning-fast overview of deep learning fundamentals for developers who want the essentials fast.', dur: '2:12', channel: 'Fireship' },
  { id: '5tvmMX8r_OM', title: 'ML Engineering for Production', desc: 'Andrew Ng\'s course overview on deploying ML models at scale in the real world — the MLOps perspective.', dur: '16:04', channel: 'DeepLearning.AI' },
]

const TAKEAWAYS = [
  'Master Python, maths, and statistics before jumping to any framework',
  'Build end-to-end projects: data collection → model → production deployment',
  'Learn MLOps early — most candidates skip it and hiring managers notice',
  'Read papers and implement key architectures from scratch at least once',
  'Embrace AI coding tools to accelerate your own engineering velocity',
]

/* ─── NEW SECTION DATA ────────────────────────────────────────────────────── */

// 1. What This Career Is
const CAREER_FACTS = [
  { icon: <Bot size={20} />, title: 'What You Build', desc: 'Recommendation engines, fraud detectors, image classifiers, LLM fine-tunes, voice assistants, and autonomous decision systems.', color: '#7c3aed' },
  { icon: <Code size={20} />, title: 'Core Activities', desc: 'Data pipelines, model training, hyperparameter tuning, evaluation, deployment, monitoring, and research.', color: '#0891b2' },
  { icon: <Users size={20} />, title: 'Who You Work With', desc: 'Data engineers, product managers, infrastructure engineers, research scientists, and business stakeholders.', color: '#16a34a' },
  { icon: <TrendingUp size={20} />, title: 'Industry Demand', desc: 'One of the fastest-growing roles globally. Job postings for ML engineers grew 74% in 2024 alone.', color: '#ea580c' },
]

// 2. Why Choose This Career
const WHY_REASONS = [
  { emoji: '💰', title: 'Top 3% Salaries', desc: 'ML Engineers consistently rank among the highest-paid professionals globally — and demand continues to outpace supply.' },
  { emoji: '🌍', title: 'Work Anywhere', desc: 'With 52% of roles fully remote, you can work for global tech giants while living in Cape Town, Johannesburg, or anywhere.' },
  { emoji: '🔮', title: 'Shape the Future', desc: "The models you build today will be used by millions. Few careers offer this level of real-world impact." },
  { emoji: '🧠', title: 'Never Stop Learning', desc: 'AI evolves faster than any other field. Every week brings new papers, tools, and challenges — it never gets boring.' },
  { emoji: '🚀', title: 'Leverage AI to Move Faster', desc: 'Ironically, ML engineers who use AI tools ship 3–5× faster. You build the very technology that supercharges your own work.' },
  { emoji: '🏆', title: 'Enormous Career Ceiling', desc: 'From Staff Engineer to AI Research Scientist to CTO — the trajectory and ceiling of this career path are extraordinary.' },
]

// 3. Free Resources
const FREE_RESOURCES = [
  { category: 'Courses', color: '#7c3aed', bgColor: '#faf5ff', items: [
    { name: 'fast.ai Practical Deep Learning', url: '#', type: 'Course', rating: 5 },
    { name: 'Andrew Ng ML Specialisation', url: '#', type: 'Course', rating: 5 },
    { name: 'CS231n Stanford (Computer Vision)', url: '#', type: 'Lecture', rating: 5 },
    { name: 'Hugging Face NLP Course', url: '#', type: 'Course', rating: 4 },
  ]},
  { category: 'Practice', color: '#0891b2', bgColor: '#f0f9ff', items: [
    { name: 'Kaggle Competitions', url: '#', type: 'Platform', rating: 5 },
    { name: 'LeetCode (Python focus)', url: '#', type: 'Practice', rating: 4 },
    { name: 'Papers With Code', url: '#', type: 'Research', rating: 5 },
    { name: 'Weights & Biases Examples', url: '#', type: 'Tutorials', rating: 4 },
  ]},
  { category: 'Communities', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'r/MachineLearning', url: '#', type: 'Forum', rating: 4 },
    { name: 'Hugging Face Discord', url: '#', type: 'Discord', rating: 5 },
    { name: 'ML Twitter / X', url: '#', type: 'Social', rating: 4 },
    { name: 'arXiv cs.LG', url: '#', type: 'Papers', rating: 5 },
  ]},
]

// 4. Salary section
const SALARY_DATA = [
  { role: 'Junior ML Engineer', range: 'R400k – R600k', midpoint: 500, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'ML Engineer', range: 'R700k – R1.2M', midpoint: 950, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior ML Engineer', range: 'R1.2M – R1.8M', midpoint: 1500, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Staff / Principal ML', range: 'R2M – R3.5M+', midpoint: 2500, yoe: '8+ yrs', color: '#ea580c' },
]

// 5. Common Mistakes
const MISTAKES = [
  { num: '01', title: 'Tutorial Hell', desc: 'Watching course after course without building anything. Real learning comes from fighting with real data and broken models, not passive consumption.', fix: 'Build one real project for every two tutorials you complete.' },
  { num: '02', title: 'Skipping MLOps', desc: 'Learning to train models but never deploying them. 80% of ML value is in production — hiring managers know who has end-to-end experience.', fix: 'Deploy every model you build, even if it\'s just a simple FastAPI endpoint.' },
  { num: '03', title: 'Ignoring Math', desc: 'Relying entirely on library calls without understanding the underlying mathematics. You\'ll hit a hard ceiling as soon as you need to debug or innovate.', fix: 'Spend 30 minutes a day on linear algebra and probability — it compounds fast.' },
  { num: '04', title: 'No GitHub Presence', desc: 'Recruiters and hiring managers check GitHub. An empty or private profile signals either no practical experience or nothing worth showing.', fix: 'Commit something every week. Document your projects with clear READMEs.' },
  { num: '05', title: 'Chasing Trends Only', desc: 'Jumping to every new framework or LLM release without mastering fundamentals. Foundations transfer; hype cycles don\'t.', fix: 'Master the fundamentals first. Then adopt new tools with critical judgment.' },
  { num: '06', title: 'Working in Isolation', desc: 'Learning alone without any community, feedback, or accountability. Progress stalls and motivation collapses without external input.', fix: 'Join Kaggle, contribute to open source, or find a learning partner.' },
]

// 6. Career Change Section
const CAREER_CHANGE_PATHS = [
  { from: 'Software Engineer', ease: 'Easiest', easeColor: '#16a34a', easeBg: '#f0fdf4', desc: 'Your coding foundation transfers directly. Focus on statistics, ML theory, and model training. Expect 3–6 months of focused upskilling.', steps: ['Learn statistical foundations', 'Complete fast.ai course', 'Build 3 ML projects', 'Apply for ML Engineering roles'] },
  { from: 'Data Analyst', ease: 'Manageable', easeColor: '#0891b2', easeBg: '#f0f9ff', desc: 'You already understand data and business context. Bridge the gap with deep learning and engineering skills.', steps: ['Learn Python deeply', 'Study neural networks', 'Master PyTorch basics', 'Add MLOps skills'] },
  { from: 'Academic / Researcher', ease: 'Natural Fit', easeColor: '#7c3aed', easeBg: '#faf5ff', desc: 'Your research and mathematical background is invaluable. Industry needs your rigour — just add production engineering skills.', steps: ['Learn software engineering', 'Study MLOps & deployment', 'Build production projects', 'Network with industry peers'] },
  { from: 'Other Background', ease: 'Challenging', easeColor: '#ea580c', easeBg: '#fff7ed', desc: 'Requires building multiple skills simultaneously, but the career payoff is enormous. Bootcamps and structured paths help.', steps: ['Start with Python basics', 'Complete a structured bootcamp', 'Build portfolio projects', 'Network aggressively'] },
]

// 7. 30-Day Plan
const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Python Foundations', color: '#0891b2', bg: '#f0f9ff', days: [
    { day: 'Day 1–2', task: 'Install Python, Jupyter, set up your dev environment' },
    { day: 'Day 3–4', task: 'Python fundamentals: functions, classes, list comprehensions' },
    { day: 'Day 5–6', task: 'NumPy arrays, vectorised operations, and broadcasting' },
    { day: 'Day 7', task: 'Build your first data manipulation project with Pandas' },
  ]},
  { week: 'Week 2', theme: 'Data & Statistics', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Descriptive statistics, distributions, and visualisation' },
    { day: 'Day 10–11', task: 'Hypothesis testing, correlation, and regression basics' },
    { day: 'Day 12–13', task: 'EDA on a real dataset from Kaggle' },
    { day: 'Day 14', task: 'Write a short analysis report and publish to GitHub' },
  ]},
  { week: 'Week 3', theme: 'First ML Model', color: '#7c3aed', bg: '#faf5ff', days: [
    { day: 'Day 15–16', task: 'Train your first Scikit-learn classifier on Iris dataset' },
    { day: 'Day 17–18', task: 'Cross-validation, precision/recall, and confusion matrices' },
    { day: 'Day 19–20', task: 'Try 3 different algorithms and compare their performance' },
    { day: 'Day 21', task: 'Submit to your first Kaggle competition (beginner level)' },
  ]},
  { week: 'Week 4', theme: 'Ship Something Real', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Build an end-to-end ML pipeline with a real dataset' },
    { day: 'Day 25–26', task: 'Wrap your model in a FastAPI endpoint' },
    { day: 'Day 27–28', task: 'Deploy to a free cloud service (Render, Railway, or HuggingFace Spaces)' },
    { day: 'Day 29–30', task: 'Write a LinkedIn post about what you built. Start networking.' },
  ]},
]

/* ─── SHARE BAR ───────────────────────────────────────────────────────────── */
function ShareBar() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'AI & ML Engineer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become an AI/ML Engineer in 2026', url: window.location.href })
      } catch (_) {}
    } else { handleCopy() }
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-10 p-4 rounded-2xl" style={{ background: '#f8f9ff', border: `1px solid ${C.border}` }}>
      <span className="text-xs font-semibold" style={{ color: C.textMuted }}>Share this roadmap:</span>
      <button onClick={handleCopy} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: copied ? 'rgba(22,163,74,0.1)' : C.violetLight, color: copied ? '#16a34a' : C.violet, outline: 'none' }}>
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/ai-ml-engineer'}</span>
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

/* ─── HOOK: fade-in on scroll ─────────────────────────────────────────────── */
function useFade() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(24px)'
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease'
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect() }
    }, { threshold: 0.07 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ─── TABLE OF CONTENTS ──────────────────────────────────────────────────── */
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

/* ─── PAGE ────────────────────────────────────────────────────────────────── */
export default function AiMlRoadmapPage() {
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
        gsap.fromTo(progressRef.current, { width: '0%' }, {
          width: '100%', duration: 2.2, ease: 'power2.out',
          scrollTrigger: { trigger: tlSectionRef.current, start: 'top 72%', toggleActions: 'play none none reverse' },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bars = barsContainerRef.current?.querySelectorAll<HTMLElement>('[data-bar-w]')
      bars?.forEach(bar => {
        const w = bar.dataset.barW
        gsap.fromTo(bar, { width: '0%' }, {
          width: `${w}%`, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: bar, start: 'top 92%', toggleActions: 'play none none reverse' },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  const heroRef = useFade()
  const introRef = useFade()
  const whatRef = useFade()
  const whyRef = useFade()
  const tlRef = useFade()
  const stepsRef = useFade()
  const skillsRef = useFade()
  const eduRef = useFade()
  const freeRef = useFade()
  const dayRef = useFade()
  const pcRef = useFade()
  const aiRef = useFade()
  const salaryRef = useFade()
  const mistakesRef = useFade()
  const changeRef = useFade()
  const planRef = useFade()
  const finalRef = useFade()
  const vidsRef = useFade()

  const sectionStyle = { paddingTop: 72, paddingBottom: 72, borderBottomColor: C.border }

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.text, fontFamily: 'Inter, sans-serif' }}>

      {/* Back button */}
      <Link to="/roadmaps" className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold no-underline transition-all duration-200" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', border: `1px solid ${C.border}`, color: C.textMuted, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <ArrowLeft size={14} /> All Roadmaps
      </Link>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="relative w-full" style={{ background: C.bg }}>
        <div className="relative w-full overflow-hidden" style={{ height: 520 }}>
          <img src="https://i.imgur.com/NWydjMJ_d.webp?maxwidth=760&fidelity=grand" alt="AI & ML Engineering workspace" className="w-full h-full object-cover object-center block" style={{ filter: 'saturate(0.55) brightness(1.05)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 55%, rgba(255,255,255,0.75) 78%, rgba(255,255,255,1) 92%)' }} />
          <div ref={heroRef} className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-8">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.violetLight, color: C.violet }}>
                <Bot size={12} /> AI & Data
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                AI & ML Engineer
              </h1>
              <span className="block font-normal mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', color: C.textMuted, letterSpacing: '-0.01em' }}>
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
            Build, train, and deploy machine learning models that power the next generation of intelligent products — from recommendation engines to large language models. One of the most in-demand and highest-paying careers in the world.
          </p>
          <div className="h-px mt-10" style={{ background: C.border }} />
        </div>
      </div>

      {/* ── TABLE OF CONTENTS ────────────────────────────────────────────── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={introRef}>
            <SectionHeader icon={<BookOpen size={22} />} title="What's Inside" subtitle="Everything you need to know about this career in one place" iconBg={C.violetLight} iconColor={C.violet} />
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

      {/* ── WHAT THIS CAREER IS ──────────────────────────────────────────── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={whatRef}>
            <SectionHeader icon={<Bot size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of ML Engineering" iconBg={C.violetLight} iconColor={C.violet} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#faf5ff', borderColor: 'rgba(124,58,237,0.15)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                An <strong style={{ color: C.violet }}>ML Engineer</strong> sits at the intersection of software engineering and data science. Unlike a pure data scientist who focuses on analysis and experimentation, an ML engineer is responsible for taking models from notebook to production — ensuring they run reliably, scale under load, and continuously improve over time.
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

      {/* ── WHY CHOOSE THIS CAREER ───────────────────────────────────────── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={whyRef}>
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons ML Engineering could be your best move" iconBg="rgba(234,88,12,0.1)" iconColor={C.orange} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WHY_REASONS.map((r, ) => (
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

      {/* ── DAY IN THE LIFE ──────────────────────────────────────────────── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={dayRef}>
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical ML engineer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid grid-cols-1 gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
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
                        <span className="font-mono" style={{ color: C.violet }}>{e.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${e.pct}%`, background: C.violet }} />
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

      {/* ── CAREER TIMELINE ──────────────────────────────────────────────── */}
      <section ref={tlSectionRef} className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={tlRef}>
            <SectionHeader icon={<Clock size={22} />} title="Career Timeline" subtitle="Time estimates and salary ranges for each level" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="mb-10">
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}>
                <span>Career Progression</span><span>Beginner → Expert</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                <div ref={progressRef} className="h-1.5 rounded-full" style={{ width: '0%', background: 'linear-gradient(90deg, #0891b2 0%, #16a34a 33%, #7c3aed 66%, #ea580c 100%)' }} />
              </div>
              <div className="flex justify-between mt-2.5">
                {CAREER_LEVELS.map(l => (
                  <span key={l.level} className="font-mono" style={{ color: l.accent, fontSize: '0.68rem' }}>{l.duration}</span>
                ))}
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
                    {l.skills.map(s => (
                      <span key={s} className="rounded px-1.5 py-0.5 font-mono text-xs" style={{ background: '#f1f5f9', color: C.textMuted }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STEP-BY-STEP ROADMAP ─────────────────────────────────────────── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div ref={stepsRef} className="max-w-2xl mx-auto px-4">
          <SectionHeader icon={<Target size={22} />} title="Step-by-Step Roadmap" subtitle="Your path from complete beginner to job-ready" iconBg={C.violetLight} iconColor={C.violet} />
          <div className="relative flex flex-col items-center" style={{ gap: 0 }}>
            {ROADMAP_STEPS.map((s, i) => {
              const icons = ['🐍', '📊', '🤖', '🧠', '🚀', '💡']
              const accentColors = ['#0891b2','#4f46e5','#0891b2','#4f46e5','#0891b2','#4f46e5']
              const accent = accentColors[i]
              const isLast = i === ROADMAP_STEPS.length - 1
              const isEven = i % 2 === 0
              return (
                <div key={s.step} className="w-full flex flex-col items-center">
                  <div className="w-full relative" style={{ opacity: 0, transform: 'translateY(20px)', transition: `opacity 0.5s ${i * 0.13}s ease, transform 0.5s ${i * 0.13}s ease` }}
                    ref={el => {
                      if (!el) return
                      const obs = new IntersectionObserver(([e]) => {
                        if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect() }
                      }, { threshold: 0.15 })
                      obs.observe(el)
                    }}>
                    <div className="w-full rounded-3xl overflow-hidden" style={{ background: `${accent}08`, border: `2px solid ${accent}25`, boxShadow: `0 4px 24px ${accent}12` }}>
                      <div className="flex items-center gap-4 px-5 py-5">
                        <div className="flex-shrink-0 flex items-center justify-center rounded-full text-2xl font-bold" style={{ width: 64, height: 64, background: `linear-gradient(135deg, ${accent}20, ${accent}10)`, border: `3px solid ${accent}40`, boxShadow: `0 0 16px ${accent}20` }}>
                          {icons[i]}
                        </div>
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.violet} 0%, ${C.indigo} 100%)`, boxShadow: '0 8px 48px rgba(124,58,237,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>10–14 months · Consistent daily practice · Build real projects</div>
            </div>
          </div>
          <ShareBar />
        </div>
      </section>

      {/* ── SKILL CHECKPOINTS ────────────────────────────────────────────── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={skillsRef}>
            <SectionHeader icon={<CheckCircle2 size={22} />} title="Skill Checkpoints" subtitle="Technical and interpersonal skills to develop" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl p-7 border" style={{ background: C.bg, borderColor: C.border }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: C.indigoLight }}><Code size={16} style={{ color: C.indigo }} /></div>
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
                        <div className="h-1.5 rounded-full" data-bar-w={s.level} style={{ width: 0, background: `linear-gradient(90deg, ${C.violet}, ${C.teal})` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-7 border" style={{ background: C.bg, borderColor: C.border }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: C.tealLight }}><MessageSquare size={16} style={{ color: C.teal }} /></div>
                  <div>
                    <div className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Soft Skills</div>
                    <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>Interpersonal abilities to build</div>
                  </div>
                </div>
                {SOFT_SKILLS.map(s => (
                  <div key={s.name} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border transition-colors duration-150 cursor-default" style={{ background: '#f8f9ff', borderColor: C.border }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.violetLight}
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

      {/* ── EDUCATION PATHS ──────────────────────────────────────────────── */}
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
                  <div className="text-xs font-bold mb-2" style={{ color: '#16a34a' }}>Advantages</div>
                  {p.pros.map(item => (
                    <div key={item} className="flex items-start gap-2 text-xs mb-1.5 leading-relaxed" style={{ color: C.textMuted }}>
                      <Check size={11} style={{ color: '#16a34a', flexShrink: 0, marginTop: 2 }} />{item}
                    </div>
                  ))}
                  <div className="text-xs font-bold mb-2 mt-3.5" style={{ color: '#dc2626' }}>Challenges</div>
                  {p.cons.map(item => (
                    <div key={item} className="flex items-start gap-2 text-xs mb-1.5 leading-relaxed" style={{ color: C.textMuted }}>
                      <X size={11} style={{ color: '#dc2626', flexShrink: 0, marginTop: 2 }} />{item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BEST FREE RESOURCES ──────────────────────────────────────────── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={freeRef}>
            <SectionHeader icon={<BookOpen size={22} />} title="Best Free Resources" subtitle="World-class learning material, most of it free" iconBg="rgba(22,163,74,0.1)" iconColor={C.green} />
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
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} fill={i < item.rating ? cat.color : 'none'} style={{ color: i < item.rating ? cat.color : C.textFaint }} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AI IMPACT ────────────────────────────────────────────────────── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={aiRef}>
            <SectionHeader icon={<Bot size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming this career in 2026" iconBg={C.violetLight} iconColor={C.violet} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#faf5ff', borderColor: 'rgba(124,58,237,0.15)', color: C.textMuted }}>
              Ironically, AI tools are <em style={{ color: C.violet }}>accelerating</em> the work of AI engineers themselves. The engineers who master leveraging foundation models, automated search, and co-pilot tools will move dramatically faster and ship better systems than those who don't.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-9">
              {AI_IMPACTS.map(item => (
                <div key={item.title} className="rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-1 hover:shadow-md" style={{ background: item.bgColor, borderColor: item.borderColor }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: item.icoBg }}><span style={{ color: item.icoColor }}>{item.icon}</span></div>
                  <div className="text-sm font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif', color: item.titleColor }}>{item.title}</div>
                  <div className="text-xs leading-relaxed mb-3.5" style={{ color: C.textMuted }}>{item.desc}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tools.map(t => (
                      <span key={t} className="rounded px-2 py-0.5 text-xs font-mono font-semibold" style={{ background: item.tagBg, color: item.tagColor }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Emerging Skills to Learn Now</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {FUTURE_SKILLS.map((s, i) => (
                <div key={s} className="flex items-center gap-2.5 rounded-xl px-4 py-3.5 border" style={{ background: '#f8f9ff', borderColor: C.border }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-black text-xs" style={{ background: C.violetLight, color: C.violet }}>{i + 1}</div>
                  <span className="text-xs font-medium" style={{ color: C.text }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROS & CONS ──────────────────────────────────────────────────── */}
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

      {/* ── SALARY ───────────────────────────────────────────────────────── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={salaryRef}>
            <SectionHeader icon={<DollarSign size={22} />} title="Salary" subtitle="What you can realistically earn at each stage" iconBg="rgba(22,163,74,0.1)" iconColor={C.green} />
            <div className="rounded-2xl p-6 mb-6 border" style={{ background: '#f0fdf4', borderColor: 'rgba(22,163,74,0.2)' }}>
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Salaries below reflect South African total compensation (base + bonus). Senior professionals with global remote contracts can earn significantly more in USD — often 2–4× these figures.</p>
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
                    <div className="h-2.5 rounded-full transition-all duration-1000" style={{ width: `${(row.midpoint / 2800) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#faf5ff', borderColor: 'rgba(124,58,237,0.15)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.violet }}>Pro tip:</strong> The fastest way to increase your salary is to work on a product that uses ML at its core — not just as a feature. Target companies where AI is the product.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMON MISTAKES ──────────────────────────────────────────────── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most learners" iconBg="rgba(234,88,12,0.1)" iconColor={C.orange} />
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

      {/* ── CAREER CHANGE SECTION ────────────────────────────────────────── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={changeRef}>
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break in from your current background" iconBg={C.tealLight} iconColor={C.teal} />
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

      {/* ── 30-DAY PLAN ──────────────────────────────────────────────────── */}
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

      {/* ── VIDEO RESOURCES ──────────────────────────────────────────────── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={vidsRef}>
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in AI & ML" iconBg="rgba(220,38,38,0.1)" iconColor={C.red} />
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
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded px-2 py-1 text-xs text-white" style={{ background: 'rgba(0,0,0,0.75)' }}>
                      <Clock size={10} />{v.dur}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-semibold mb-1.5 leading-snug" style={{ color: C.text }}>{v.title}</div>
                    <div className="text-xs leading-relaxed mb-3" style={{ color: C.textMuted }}>{v.desc}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: C.textFaint }}>{v.channel}</span>
                      <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs no-underline" style={{ color: C.indigo }}>
                        Watch <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL THOUGHTS ───────────────────────────────────────────────── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={finalRef}>
            <SectionHeader icon={<Award size={22} />} title="Final Thoughts" subtitle="What we want you to take away from this guide" iconBg={C.violetLight} iconColor={C.violet} />
            <div className="rounded-2xl p-6 border mb-8" style={{ background: C.bg, borderColor: C.border }}>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#374151' }}>
                Becoming an ML Engineer in 2026 is both more accessible and more competitive than ever before. The tools are free, the resources are world-class, and the demand is extraordinary. The only thing that separates the people who make it from those who don't is <strong style={{ color: C.violet }}>consistent, deliberate practice</strong>.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                Don't wait until you feel "ready." You'll learn more by deploying a broken model than by watching 50 more tutorial videos. Start building today. Start shipping today. The best ML engineers are the ones who never stop being students — and never stop shipping.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
              {TAKEAWAYS.map((t, i) => (
                <div key={t} className="flex items-center gap-3.5 rounded-xl px-5 py-3.5 border" style={{ background: C.bg, borderColor: C.border }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-black text-xs" style={{ background: C.violetLight, color: C.violet }}>{i + 1}</div>
                  <span className="text-sm" style={{ color: C.text }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-8" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="relative overflow-hidden rounded-3xl px-12 py-16 text-center" style={{ background: `linear-gradient(135deg, ${C.violet} 0%, ${C.indigo} 50%, #6d28d9 100%)` }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: 'rgba(255,255,255,0.05)', top: -120, right: -80 }} />
          <div className="absolute rounded-full pointer-events-none" style={{ width: 200, height: 200, background: 'rgba(255,255,255,0.04)', bottom: -80, left: -60 }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Rocket size={30} style={{ color: '#fff' }} />
          </div>
          <h2 className="font-extrabold text-white mb-3 tracking-tight" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
            Ready to Start Your Journey?
          </h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>
            You now have everything you need. The roadmap, the resources, the plan. The only missing ingredient is you — starting today.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline transition-opacity duration-150 hover:opacity-90" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.violet }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
             <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>

          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start learning today. Your future self will thank you.</p>
        </div>
      </div>

    </div>
  )
}