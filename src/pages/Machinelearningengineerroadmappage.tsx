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
  Layers, FileText,  Server,
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
  primary: '#7c3aed',
  primaryLight: 'rgba(124,58,237,0.08)',
  primaryMid: 'rgba(124,58,237,0.15)',
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

/* ─── TYPES ───────────────────────────────────────────────────────────────── */
interface CareerLevel {
  level: string
  title: string
  duration: string
  salary: string
  description: string
  skills: string[]
  accent: string
  accentBg: string
  accentBorder: string
}

interface RoadmapStep {
  step: number
  title: string
  description: string
  duration: string
  skills: string[]
}

interface HardSkill {
  name: string
  level: number
}

interface SoftSkill {
  name: string
  description: string
}

interface EduPath {
  type: string
  title: string
  duration: string
  cost: string
  borderColor: string
  bgColor: string
  typeBg: string
  typeColor: string
  pros: string[]
  cons: string[]
}

interface ScheduleItem {
  time: string
  act: string
  desc: string
  duration: string
  iconKey: string
}

interface Tool {
  name: string
  cat: string
}

interface WorkEnv {
  type: string
  pct: number
}

interface AiImpact {
  title: string
  iconKey: string
  desc: string
  tools: string[]
  borderColor: string
  bgColor: string
  icoBg: string
  icoColor: string
  tagBg: string
  tagColor: string
  titleColor: string
}

interface CareerFact {
  iconKey: string
  title: string
  desc: string
  color: string
}

interface WhyReason {
  emoji: string
  title: string
  desc: string
}

interface ResourceItem {
  name: string
  url: string
  type: string
  rating: number
}

interface FreeResource {
  category: string
  color: string
  bgColor: string
  items: ResourceItem[]
}

interface SalaryRow {
  role: string
  range: string
  midpoint: number
  yoe: string
  color: string
}

interface Mistake {
  num: string
  title: string
  desc: string
  fix: string
}

interface CareerChangePath {
  from: string
  ease: string
  easeColor: string
  easeBg: string
  desc: string
  steps: string[]
}

interface WeekPlan {
  week: string
  theme: string
  color: string
  bg: string
  days: { day: string; task: string }[]
}

interface Video {
  id: string
  title: string
  desc: string
  dur: string
  channel: string
}

interface TocItem {
  num: string
  label: string
}

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const CAREER_LEVELS: CareerLevel[] = [
  {
    level: 'Junior', title: 'Junior ML Engineer', duration: '0–2 yrs', salary: 'R320k–R560k',
    description: 'Train and evaluate standard ML models, implement data pipelines, run experiments, and analyse results under mentorship. Learn the fundamentals of model selection, feature engineering, and evaluation metrics.',
    skills: ['Python & NumPy', 'Scikit-Learn', 'SQL & Pandas', 'Git & Jupyter'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'ML Engineer', duration: '2–5 yrs', salary: 'R650k–R1.15M',
    description: 'Design end-to-end ML pipelines, build and productionise models, own experiment tracking, model versioning, and A/B testing. Work closely with data engineers and product teams to ship ML-powered features.',
    skills: ['Deep Learning', 'MLflow / DVC', 'Feature Stores', 'PyTorch / TF'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior ML Engineer', duration: '5–8 yrs', salary: 'R1.15M–R2M',
    description: 'Architect ML platforms, lead model research and productionisation, define evaluation frameworks, set ML engineering standards, mentor juniors, and drive model reliability and scalability across the organisation.',
    skills: ['System Design', 'LLM Fine-Tuning', 'ML Infra', 'Mentoring'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'Staff / Principal / Research Scientist', duration: '8+ yrs', salary: 'R2.5M+',
    description: 'Define ML research directions, drive cross-team technical strategy, publish novel research, architect next-generation model infrastructure, and solve the hardest scalability and alignment challenges.',
    skills: ['Research Pub.', 'Model Architecture', 'AI Strategy', 'Leadership'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS: RoadmapStep[] = [
  {
    step: 1, title: 'Python, Math & Statistics Foundations',
    description: 'Python is the lingua franca of machine learning. Master it deeply — NumPy, Pandas, Matplotlib, and object-oriented programming. Alongside Python, study the three mathematical pillars: linear algebra (vectors, matrices, eigenvalues), calculus (derivatives, gradient descent), and probability & statistics (distributions, Bayes theorem, hypothesis testing). These aren\'t optional — they are the language models speak.',
    duration: '2–3 months', skills: ['Python & NumPy', 'Linear Algebra', 'Calculus & Optimisation', 'Probability & Stats'],
  },
  {
    step: 2, title: 'Classical Machine Learning',
    description: 'Before touching deep learning, master classical ML with Scikit-Learn. Understand regression, classification, clustering, and dimensionality reduction from first principles. Learn how to evaluate models properly — train/val/test splits, cross-validation, precision/recall, ROC curves — and build intuition for when each algorithm is the right tool.',
    duration: '2–3 months', skills: ['Scikit-Learn', 'Feature Engineering', 'Model Evaluation', 'Data Preprocessing'],
  },
  {
    step: 3, title: 'Deep Learning & Neural Networks',
    description: 'Learn how neural networks actually work — forward and backward propagation, activation functions, weight initialisation, regularisation (dropout, batch normalisation), and optimisers. Implement models from scratch before using frameworks. Then master PyTorch or TensorFlow/Keras to build CNNs, RNNs, and transformer architectures for vision, NLP, and tabular tasks.',
    duration: '3–4 months', skills: ['PyTorch / TensorFlow', 'CNNs & RNNs', 'Transformers', 'GPU Training'],
  },
  {
    step: 4, title: 'Data Engineering & ML Pipelines',
    description: 'Real ML runs on data you never fully control. Learn SQL, data wrangling at scale with Spark or Dask, feature stores (Feast), and data versioning (DVC). Understand how to build reproducible, automated pipelines from raw data to trained model — and how to detect and handle data drift in production.',
    duration: '2–3 months', skills: ['SQL & Spark', 'Feature Stores', 'DVC / MLflow', 'Data Versioning'],
  },
  {
    step: 5, title: 'MLOps, Deployment & Serving',
    description: 'A model that isn\'t deployed is a science experiment. Learn how to productionise ML — containerise models with Docker, serve inference via REST APIs (FastAPI, Triton), track experiments with MLflow, orchestrate retraining pipelines with Airflow or Prefect, and monitor models for accuracy drift in production with tools like Evidently or Arize.',
    duration: '2–3 months', skills: ['Docker & K8s', 'Model Serving', 'Pipeline Orchestration', 'Model Monitoring'],
  },
  {
    step: 6, title: 'LLMs, Foundation Models & AI Research',
    description: 'Large Language Models have fundamentally changed the field. Learn how transformer architectures work in depth, how to fine-tune open-source LLMs (LLaMA, Mistral), prompt engineering and RAG (Retrieval-Augmented Generation), and how to build production LLM applications with LangChain or LlamaIndex. For research roles, study alignment, RLHF, and how to contribute to the scientific literature.',
    duration: '3–4 months', skills: ['LLM Fine-Tuning', 'RAG & Embeddings', 'RLHF / Alignment', 'Research Methods'],
  },
]

const HARD_SKILLS: HardSkill[] = [
  { name: 'Python & Scientific Stack', level: 97 },
  { name: 'Machine Learning (Classical)', level: 93 },
  { name: 'Deep Learning & Neural Networks', level: 90 },
  { name: 'Data Engineering & Pipelines', level: 82 },
  { name: 'MLOps & Model Deployment', level: 78 },
  { name: 'NLP & Large Language Models', level: 75 },
  { name: 'Computer Vision', level: 68 },
  { name: 'Research & Experimentation', level: 65 },
]

const SOFT_SKILLS: SoftSkill[] = [
  { name: 'Scientific Rigour', description: 'ML is an empirical discipline. The best engineers maintain hypothesis-driven thinking, keep meticulous experiment logs, and never confuse correlation with causation — even under product pressure to ship.' },
  { name: 'Statistical Scepticism', description: 'Know when your metrics are misleading you. Overfitting, data leakage, and benchmark gaming are everywhere. Great ML engineers question results before celebrating them.' },
  { name: 'Business Translation', description: 'Translate model performance metrics (AUC-ROC, BLEU, F1) into business outcomes that stakeholders care about. The model that ships is more valuable than the model with the best validation score.' },
  { name: 'Experiment Design', description: 'Know how to design a controlled experiment that will actually answer your question. Confounded experiments waste weeks. Clear experimental design is one of the most underrated skills in the field.' },
  { name: 'Debugging Intuition', description: 'ML bugs are unlike software bugs — they fail silently. Developing intuition for when a model is underperforming, why, and what to change next is a skill built through hundreds of failed experiments.' },
  { name: 'Cross-Functional Communication', description: 'Work with data engineers who collect the data, product managers who define the problem, and backend engineers who deploy the solution. ML engineers who communicate well ship more.' },
]

const EDU_PATHS: EduPath[] = [
  {
    type: 'Degree', title: 'Computer Science / Statistics Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(124,58,237,0.2)', bgColor: '#f5f3ff', typeBg: 'rgba(124,58,237,0.12)', typeColor: '#7c3aed',
    pros: ['Deep mathematical and algorithmic foundations', 'Strong research credibility for academic and research roles', 'Access to lab compute, datasets, and professor networks', 'PhD pathway for frontier AI research roles'],
    cons: ['Slow and expensive path to first industry job', 'Often teaches algorithms that are rarely used in industry', 'Light on MLOps, deployment, and production skills', 'NLP and vision work largely requires self-directed study'],
  },
  {
    type: 'Bootcamp', title: 'Data Science / ML Bootcamp', duration: '3–6 months', cost: 'R60k – R150k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Job-ready Python, ML, and model-building skills fast', 'Strong portfolio of end-to-end ML projects on exit', 'Career support and employer employer networks', 'Structured accountability for career switchers'],
    cons: ['Highly variable programme quality and rigor', 'Often skips mathematical foundations entirely', 'Credential not universally respected at top AI companies', 'Competitive entry into a flooded junior data science market'],
  },
  {
    type: 'Self-Taught', title: 'Online Courses, Papers & Projects', duration: '12–24 months', cost: 'R0 – R10k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['World-class free content (fast.ai, DeepLearning.AI, Papers With Code)', 'Build real ML projects from day one', 'Read papers and stay at the frontier of the field', 'No ceiling — learn whatever is most relevant now'],
    cons: ['Requires extreme self-discipline and direction', 'Easy to skip the math that separates good from great', 'No formal credential — portfolio must do all the work', 'Imposter syndrome is intense in a field full of PhDs'],
  },
]

// Schedule uses iconKey strings to avoid JSX-in-data-literal TS errors
const SCHEDULE: ScheduleItem[] = [
  { time: '9:00', act: 'Standup & Experiment Review', desc: 'Sync with team on running experiments, review overnight training job results, check model dashboards for accuracy drift', duration: '30 min', iconKey: 'gitbranch' },
  { time: '9:30', act: 'Model Development & Research', desc: 'Core ML work — designing experiments, implementing new model architectures, running ablation studies, or reading the latest relevant papers', duration: '2.5 hrs', iconKey: 'server' },
  { time: '12:00', act: 'Data Analysis & Debugging', desc: 'Investigate underperforming model segments, analyse training data quality, debug data pipelines, or root-cause production model degradation', duration: '1 hr', iconKey: 'terminal' },
  { time: '1:00', act: 'Lunch & Recovery', desc: 'Step away from the terminal. The subconscious solves architecture and research problems during breaks better than any whiteboard session', duration: '1 hr', iconKey: 'coffee' },
  { time: '2:00', act: 'Cross-Functional Collaboration', desc: 'Work with product and data engineering teams on feature definitions, data collection requirements, and model integration requirements', duration: '1 hr', iconKey: 'filetext' },
  { time: '3:00', act: 'MLOps & Deployment Work', desc: 'Write training pipeline code, update feature engineering, deploy model updates to staging, run A/B test analysis, monitor production metrics', duration: '1.5 hrs', iconKey: 'shield' },
  { time: '4:30', act: 'Research Reading & Learning', desc: 'Read arXiv papers, follow ML Twitter, reproduce results from recent publications, or contribute experiments to internal research notes', duration: '30 min', iconKey: 'bookopen' },
]

const TOOLS: Tool[] = [
  { name: 'PyTorch / TensorFlow', cat: 'Frameworks' }, { name: 'Jupyter / VS Code', cat: 'IDE' },
  { name: 'MLflow / W&B', cat: 'Experiment Tracking' }, { name: 'Docker & K8s', cat: 'Infra' },
  { name: 'Hugging Face', cat: 'Model Hub' }, { name: 'AWS SageMaker', cat: 'Cloud ML' },
  { name: 'Apache Spark', cat: 'Data Eng' }, { name: 'Evidently AI', cat: 'Monitoring' },
]

const WORK_ENVS: WorkEnv[] = [
  { type: 'Remote', pct: 52 },
  { type: 'Hybrid', pct: 38 },
  { type: 'In-Office', pct: 10 },
]

// iconKey strings to avoid JSX-in-data-literal TS errors
const AI_IMPACTS: AiImpact[] = [
  {
    title: 'LLM-Assisted Research & Development', iconKey: 'sparkles',
    desc: 'GitHub Copilot and Claude generate boilerplate training loops, suggest hyperparameter strategies, and help debug tensor shape errors. ML engineers using AI coding assistants report 40–55% productivity gains on routine data pipeline and experiment scaffolding work.',
    tools: ['GitHub Copilot', 'Claude', 'Cursor', 'Gemini'],
    borderColor: 'rgba(124,58,237,0.18)', bgColor: '#f5f3ff', icoBg: 'rgba(124,58,237,0.12)', icoColor: '#7c3aed', tagBg: 'rgba(124,58,237,0.1)', tagColor: '#7c3aed', titleColor: '#7c3aed',
  },
  {
    title: 'Foundation Model Engineering', iconKey: 'zap',
    desc: 'ML engineers who can fine-tune open-source LLMs (LLaMA, Mistral, Gemma), build RAG pipelines, design vector database schemas, implement RLHF, and manage inference at scale are in an entirely different demand tier in 2026.',
    tools: ['Hugging Face', 'vLLM', 'Pinecone', 'LangChain'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI-Powered MLOps & Monitoring', iconKey: 'trending',
    desc: 'AI tools now detect model performance degradation automatically, flag data drift before it causes incidents, and suggest retraining strategies. Use them to build more reliable and self-healing ML systems with less manual monitoring overhead.',
    tools: ['Evidently AI', 'Arize AI', 'Weights & Biases', 'DataRobot'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS: string[] = [
  'Retrieval-Augmented Generation (RAG)', 'RLHF & Constitutional AI',
  'Multimodal Model Architectures', 'Mixture of Experts (MoE)',
  'LoRA & Parameter-Efficient Fine-Tuning', 'LLM Inference Optimisation (vLLM, TRT)',
]

const PROS: { title: string; desc: string }[] = [
  { title: 'The Most In-Demand Engineering Specialisation', desc: 'ML engineers are among the highest-paid and most sought-after engineers on earth. Every major company — from banks to hospitals to e-commerce — is building AI-powered products that need their skills.' },
  { title: 'Intellectually Stimulating Work', desc: 'Few engineering roles combine mathematics, computer science, domain expertise, and product intuition. ML problems require original thinking — there is rarely one right answer and always more to learn.' },
  { title: 'Global Remote Opportunities', desc: '52% of ML roles are fully remote, and USD-paying global remote roles are abundant for strong ML engineers. Geographic location is largely irrelevant for world-class practitioners.' },
  { title: 'You Build the Future — Literally', desc: 'Language models, computer vision systems, recommendation engines, and medical AI — these technologies are reshaping every industry. ML engineers are building the infrastructure of the next century.' },
  { title: 'Exponential Career Growth', desc: 'The ML field is growing faster than talent can keep up. A skilled ML engineer with 3 years of experience can command salaries that take software engineers 8 years to reach.' },
  { title: 'Research-to-Industry Pipeline', desc: 'The field is close enough to academia that strong practitioners can publish papers, attend NeurIPS and ICML, and contribute meaningfully to scientific progress — while still earning industry salaries.' },
]

const CONS: { title: string; desc: string }[] = [
  { title: 'Steep Mathematical Requirements', desc: 'Linear algebra, calculus, probability, and information theory are genuine prerequisites for understanding why models work. Engineers who skip the math hit hard ceilings they can\'t see until they try to solve novel problems.' },
  { title: 'Experiments Fail — Constantly', desc: 'Most experiments produce negative results. Days or weeks of work can produce a model that performs no better than a baseline. Building resilience to persistent failure is essential and genuinely difficult.' },
  { title: 'Extremely Competitive Field', desc: 'Top ML roles attract candidates from MIT, Stanford, Oxford, and DeepMind. Self-taught engineers must build exceptional portfolios to compete. The barrier to entry for elite roles is very high.' },
  { title: 'Rapid Obsolescence of Knowledge', desc: 'The field moves faster than any other in technology. A technique that was state-of-the-art 18 months ago may already be obsolete. Continuous learning is not optional — it is the job.' },
  { title: 'GPU Compute Costs Are Real', desc: 'Training and experimenting with modern models requires access to GPUs that cost R200–R700+ per hour in the cloud. Learning effectively without employer-provided compute is a genuine challenge for self-learners.' },
  { title: 'Production ML Is Harder Than Research ML', desc: 'Making a model that works in a notebook and making a model that serves reliable predictions at 50ms latency to millions of users are completely different problems. The gap between research and production consistently surprises new practitioners.' },
]

const VIDEOS: Video[] = [
  { id: 'aircAruvnKk', title: 'Neural Networks: Zero to Hero (Andrej Karpathy)', desc: 'Build neural networks from scratch in Python, starting from the basics of backpropagation all the way to building GPT — the most legendary ML education series of 2024.', dur: '8:15:00', channel: 'Andrej Karpathy' },
  { id: 'VMj-3S1tku0', title: 'Deep Learning for Computer Vision (Fast.ai)', desc: 'A top-down, practical approach to deep learning that gets you training state-of-the-art models on real datasets in the very first lesson.', dur: '7:30:00', channel: 'fast.ai' },
  { id: '1if3MbicYzY', title: 'Full Machine Learning Course for Beginners', desc: 'A comprehensive and well-structured introduction to classical machine learning, from linear regression to ensemble methods, using Python and Scikit-Learn.', dur: '9:52:14', channel: 'freeCodeCamp' },
]

const TAKEAWAYS: string[] = [
  'Master the math before the models — engineers who understand why gradient descent works solve problems that engineers who just know the API cannot',
  'Every model must be shipped to production at least once — notebook experiments alone teach you almost nothing about real ML engineering',
  'Read papers, not just tutorials — the frontier of the field lives on arXiv and at NeurIPS, not in YouTube videos',
  'Track every experiment meticulously — reproducibility is a professional standard, not an academic luxury',
  'Deploy a model that makes real predictions for real users before you call yourself an ML engineer — production changes everything you thought you knew',
]

const CAREER_FACTS: CareerFact[] = [
  {
    iconKey: 'server', title: 'What You Build',
    desc: 'Recommendation systems, fraud detection models, NLP pipelines, computer vision systems, LLM-powered applications, RAG pipelines, ranking algorithms, anomaly detectors, and the entire ML platform infrastructure that enables teams to train, evaluate, and deploy models reliably.',
    color: '#7c3aed',
  },
  {
    iconKey: 'workflow', title: 'Core Activities',
    desc: 'Experiment design and execution, feature engineering, model training and evaluation, hyperparameter tuning, pipeline development, model productionisation, A/B testing, model monitoring, data analysis, and research reading and reproduction.',
    color: '#16a34a',
  },
  {
    iconKey: 'users', title: 'Who You Work With',
    desc: 'Data engineers who build the pipelines feeding your models, backend engineers who integrate your model APIs, product managers who define success metrics, data analysts who interpret results, and researchers who push the frontier of what\'s possible.',
    color: '#4f46e5',
  },
  {
    iconKey: 'trending', title: 'Industry Demand',
    desc: 'ML Engineers are among the fastest-growing roles in the global tech economy. Job postings for ML and AI roles grew 62% in 2024. Every company with data — which is every company — needs people who can turn that data into intelligent products.',
    color: '#ea580c',
  },
]

const WHY_REASONS: WhyReason[] = [
  { emoji: '🧠', title: 'You Build Intelligent Systems', desc: 'Every recommendation that feels eerily accurate, every fraud flag that saves a customer, every translation that bridges a language barrier — that\'s ML engineers at work. The impact is invisible and enormous.' },
  { emoji: '💰', title: 'The Highest Engineering Salaries', desc: 'Senior ML engineers earn R1.5M–R3M+ in South Africa. Global remote roles at AI labs and product companies pay considerably more in USD. This is consistently the highest-paid engineering discipline.' },
  { emoji: '🌍', title: 'Location-Independent Career', desc: '52% of ML roles are fully remote. Your models run on GPUs in data centres — they don\'t care where you wrote the code. This is one of the most genuinely location-independent technical careers.' },
  { emoji: '📐', title: 'Deep Problems, Deep Satisfaction', desc: 'Designing an architecture that outperforms a baseline, debugging a subtle data leakage issue, or getting a model to generalise to a distribution it has never seen — these are hard, satisfying problems unlike any other.' },
  { emoji: '📈', title: 'The Clearest Path to AI Research', desc: 'ML Engineer → Senior ML Engineer → Research Scientist → Research Lead is one of the most intellectually rewarding and well-compensated trajectories in all of technology. The field is still young enough that standout engineers can become genuinely famous.' },
  { emoji: '🔬', title: 'Science and Engineering Combined', desc: 'ML engineering is the rare career where scientific curiosity and software craftsmanship are both rewarded. Reading the latest NeurIPS paper in the morning and shipping a production model in the afternoon is Tuesday.' },
]

const FREE_RESOURCES: FreeResource[] = [
  { category: 'Courses', color: '#7c3aed', bgColor: '#f5f3ff', items: [
    { name: 'fast.ai — Practical Deep Learning (free)', url: '#', type: 'Course', rating: 5 },
    { name: 'DeepLearning.AI — Machine Learning Spec.', url: '#', type: 'Course', rating: 5 },
    { name: 'CS229 — Stanford ML (free lectures)', url: '#', type: 'Course', rating: 5 },
    { name: 'Andrej Karpathy — Neural Networks: Zero to Hero', url: '#', type: 'YouTube', rating: 5 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'Kaggle (competitions & datasets)', url: '#', type: 'Practice', rating: 5 },
    { name: 'Papers With Code (reproduce papers)', url: '#', type: 'Research', rating: 5 },
    { name: 'Google Colab (free GPU training)', url: '#', type: 'Tool', rating: 5 },
    { name: 'roadmap.sh — ML Engineer Path', url: '#', type: 'Reference', rating: 4 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'Yannic Kilcher YouTube Channel', url: '#', type: 'YouTube', rating: 5 },
    { name: 'r/MachineLearning & r/learnmachinelearning', url: '#', type: 'Forum', rating: 4 },
    { name: 'Lex Fridman Podcast (AI/ML episodes)', url: '#', type: 'Podcast', rating: 5 },
    { name: 'The Batch — DeepLearning.AI Newsletter', url: '#', type: 'Newsletter', rating: 5 },
  ]},
]

const SALARY_DATA: SalaryRow[] = [
  { role: 'Junior ML Engineer', range: 'R320k – R560k', midpoint: 440, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'ML Engineer', range: 'R650k – R1.15M', midpoint: 900, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior ML Engineer', range: 'R1.15M – R2M', midpoint: 1575, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Staff / Principal / Research Scientist', range: 'R2.5M – R4.5M+', midpoint: 3100, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES: Mistake[] = [
  {
    num: '01', title: 'Skipping the Math and Going Straight to Frameworks',
    desc: 'Using PyTorch without understanding backpropagation is like driving without knowing how brakes work. When things go wrong — and they will — you have no tools to debug them. You can only tune hyperparameters and pray.',
    fix: 'Before touching a deep learning framework, implement logistic regression and a small MLP from scratch using only NumPy. This forces you to understand gradient flow.',
  },
  {
    num: '02', title: 'Training Only on Clean Tutorial Datasets',
    desc: 'The MNIST-trained engineer is a meme in the field. Real datasets have class imbalance, missing values, label noise, and distribution shift. Engineers who only work on clean benchmarks are blindsided by production data.',
    fix: 'Source a messy real-world dataset from Kaggle or a public API for every project. Deliberately practice data cleaning, outlier analysis, and dealing with imbalance.',
  },
  {
    num: '03', title: 'Never Deploying a Model to Production',
    desc: 'A model that only runs in a Jupyter notebook is not an ML engineering project. Real engineering problems — latency, memory limits, serving infrastructure, input validation — only appear when you try to deploy.',
    fix: 'For every model you build, deploy it as a REST API with FastAPI, containerise it with Docker, and host it on a free cloud tier. Non-negotiable.',
  },
  {
    num: '04', title: 'Ignoring Data Leakage',
    desc: 'Data leakage is the silent killer of ML credibility. It occurs when information from the test set influences training — producing models that appear to perform brilliantly but fail completely in production.',
    fix: 'Always set up your train/val/test split before any preprocessing. Fit all transformers (scalers, encoders) only on training data and apply them to validation and test sets.',
  },
  {
    num: '05', title: 'Not Tracking Experiments',
    desc: 'Running experiments without tracking hyperparameters, metrics, and dataset versions is how engineers spend three months unable to reproduce their best result. Reproducibility is table stakes for professional ML.',
    fix: 'Set up MLflow or Weights & Biases before you run your first experiment. Log everything: hyperparameters, metrics, data version, model artifacts, and random seeds.',
  },
  {
    num: '06', title: 'Optimising the Wrong Metric',
    desc: 'A model with 99% accuracy on a 1% positive-class fraud dataset is useless. Engineers who don\'t align their evaluation metric with the actual business problem ship models that look great in notebooks and fail in production.',
    fix: 'Before modelling, ask: "If this metric improves, does the business outcome improve?" For imbalanced problems, default to precision-recall curves and F1 over raw accuracy.',
  },
]

const CAREER_CHANGE_PATHS: CareerChangePath[] = [
  {
    from: 'Software / Backend Developer',
    ease: 'Natural Fit', easeColor: '#7c3aed', easeBg: '#f5f3ff',
    desc: 'Your programming skills, debugging intuition, and systems thinking give you a massive head start. Add the math, learn data manipulation, and focus your transition on MLOps and ML engineering roles rather than pure research.',
    steps: ['Work through fast.ai and DeepLearning.AI courses', 'Build 2–3 complete ML projects with deployed APIs', 'Add MLflow, Docker, and model serving to your stack', 'Target ML Engineering (not Data Science) roles'],
  },
  {
    from: 'Data Analyst / Business Intelligence',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'You already think statistically and know how to find insights in data. The transition to ML is about adding modelling depth and engineering skills on top of the analytical foundation you\'ve already built.',
    steps: ['Deepen Python skills with Pandas, NumPy, Scikit-Learn', 'Study supervised learning deeply — not just intuition, but math', 'Build a full prediction project end-to-end and deploy it', 'Target applied ML or Data Science roles to bridge the gap'],
  },
  {
    from: 'Academic / Research Background',
    ease: 'Very Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Your mathematical rigour, experiment design skills, and comfort with technical literature are extremely rare. The transition requires adding software engineering and deployment skills — not researching how to add them, actually doing it.',
    steps: ['Learn Python, Git, Docker from a software engineering angle', 'Deploy at least one model as a production service', 'Contribute to an open-source ML project on GitHub', 'Target research engineering or applied science roles'],
  },
  {
    from: 'Other Technical Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Domain expertise combined with ML is exceptionally rare. A ML engineer who deeply understands healthcare, finance, materials science, or logistics is worth more in those verticals than a generalist ML engineer.',
    steps: ['Start with CS50 Python and then fast.ai', 'Build an ML project solving a problem in your domain', 'Deploy it publicly and write about what you learned', 'Target AI companies in your previous industry vertical'],
  },
]

const THIRTY_DAY_PLAN: WeekPlan[] = [
  { week: 'Week 1', theme: 'Python & Math Foundations', color: '#7c3aed', bg: '#f5f3ff', days: [
    { day: 'Day 1–2', task: 'Install Python, set up VS Code + Jupyter. Work through NumPy fundamentals — arrays, broadcasting, vectorisation. Solve 20 NumPy exercises from the "100 NumPy Exercises" GitHub repo.' },
    { day: 'Day 3–4', task: 'Linear algebra refresher: matrix multiplication, dot products, eigenvalues. Use 3Blue1Brown\'s "Essence of Linear Algebra" playlist. Implement matrix operations in NumPy by hand.' },
    { day: 'Day 5–6', task: 'Statistics foundations: distributions (normal, binomial, Poisson), mean/variance/std, Bayes theorem. Load a real dataset with Pandas and compute descriptive statistics across all features.' },
    { day: 'Day 7', task: 'Implement linear regression from scratch with NumPy — no Scikit-Learn. Use gradient descent. Plot the loss curve and visualise the fitted line with Matplotlib. Commit to GitHub.' },
  ]},
  { week: 'Week 2', theme: 'Classical ML & Model Evaluation', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Scikit-Learn fundamentals: train/val/test splits, cross-validation, pipelines. Build logistic regression and decision tree classifiers on a real-world classification dataset.' },
    { day: 'Day 10–11', task: 'Model evaluation deep dive: confusion matrix, precision, recall, F1, ROC-AUC. Practice on an imbalanced dataset. Understand when accuracy is a misleading metric.' },
    { day: 'Day 12–13', task: 'Feature engineering: handle missing values, encode categoricals, normalise features. Apply to a Kaggle tabular dataset. Build a full Scikit-Learn pipeline with preprocessing and a classifier.' },
    { day: 'Day 14', task: 'Train a Random Forest and XGBoost model. Compare performance. Analyse feature importances. Write a clear README explaining your findings. Push to GitHub.' },
  ]},
  { week: 'Week 3', theme: 'Deep Learning & Neural Networks', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Watch Karpathy\'s first two videos. Implement a neural network in pure NumPy with forward pass, backward pass, and gradient descent — before touching PyTorch.' },
    { day: 'Day 17–18', task: 'Learn PyTorch fundamentals: tensors, autograd, nn.Module, DataLoader. Reimplement your NumPy network in PyTorch. Train on MNIST, achieve >98% accuracy.' },
    { day: 'Day 19–20', task: 'Set up Weights & Biases or MLflow. Log all your experiments: hyperparameters, metrics, model artifacts. Reproduce your best experiment from a fresh environment.' },
    { day: 'Day 21', task: 'Train a CNN on CIFAR-10. Apply data augmentation (random flips, crops). Implement early stopping. Visualise what the first convolutional layers have learned.' },
  ]},
  { week: 'Week 4', theme: 'Deploy & Ship Your First ML Product', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Build a FastAPI inference server for one of your trained models. Write a /predict endpoint that accepts JSON input and returns model predictions. Add input validation.' },
    { day: 'Day 25–26', task: 'Containerise with Docker. Write a Dockerfile for your ML API. Confirm it runs identically in the container as locally. Push the Docker image to Docker Hub.' },
    { day: 'Day 27–28', task: 'Deploy to a free cloud tier (Render, Railway, or Hugging Face Spaces). Test the live endpoint. Add a simple monitoring script that pings the API and logs response times.' },
    { day: 'Day 29–30', task: 'Write a technical blog post about what you built and what you learned. Share on LinkedIn. Apply to 5 junior ML or data science roles. Link your GitHub and your live model API.' },
  ]},
]

const TOC_ITEMS: TocItem[] = [
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

/* ─── ICON RESOLVER ───────────────────────────────────────────────────────── */
function resolveIcon(key: string, size = 14): React.ReactNode {
  switch (key) {
    case 'gitbranch': return <GitBranch size={size} />
    case 'server': return <Server size={size} />
    case 'terminal': return <Terminal size={size} />
    case 'coffee': return <Coffee size={size} />
    case 'filetext': return <FileText size={size} />
    case 'shield': return <Shield size={size} />
    case 'bookopen': return <BookOpen size={size} />
    case 'sparkles': return <Sparkles size={size} />
    case 'zap': return <Zap size={size} />
    case 'trending': return <TrendingUp size={size} />
    case 'workflow': return <Workflow size={size} />
    case 'users': return <Users size={size} />
    default: return <Server size={size} />
  }
}

/* ─── SHARE BAR ───────────────────────────────────────────────────────────── */
function ShareBar(): React.ReactElement {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }
  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'Machine Learning Engineer & AI Researcher Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Machine Learning Engineer in 2026', url: window.location.href }) }
      catch (_) { /* user cancelled */ }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/machine-learning-engineer'}</span>
      </div>
    </div>
  )
}

/* ─── SECTION HEADER ─────────────────────────────────────────────────────── */
interface SectionHeaderProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  iconBg: string
  iconColor: string
}

function SectionHeader({ icon, title, subtitle, iconBg, iconColor }: SectionHeaderProps): React.ReactElement {
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
export default function MachineLearningEngineerRoadmapPage(): React.ReactElement {
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

  const sectionStyle: React.CSSProperties = { paddingTop: 72, paddingBottom: 72, borderBottomColor: C.border }

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
            src="https://i.imgur.com/uN765de.jpeg"
            alt="Machine Learning Engineer and AI Researcher"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Sparkles size={12} /> Artificial Intelligence & Research
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Machine Learning Engineer
              </h1>
              <span className="block font-normal mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', color: C.textMuted }}>
                & AI Researcher — Career Roadmap 2026
              </span>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><Clock size={14} style={{ color: C.textFaint }} /> 20 min read</div>
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><BookOpen size={14} style={{ color: C.textFaint }} /> 16 sections</div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-8 pt-6 pb-16">
          <p className="text-base leading-relaxed" style={{ color: '#4b5563', maxWidth: 560, marginLeft: 140 }}>
            Build the systems that think. Machine Learning Engineers and AI Researchers design the models, pipelines, and infrastructure that power intelligent products — from recommendation engines and fraud detectors to large language models and autonomous systems.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of ML Engineering & AI Research" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f5f3ff', borderColor: 'rgba(124,58,237,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Machine Learning Engineer</strong> builds the systems that learn from data and make predictions, decisions, or generative outputs at scale. While users see the results — a tailored recommendation, a detected anomaly, a fluent translation — ML engineers design the architectures, training pipelines, feature stores, and serving infrastructure that make intelligent products possible. <strong style={{ color: C.indigo }}>AI Researchers</strong> at the frontier push what is computationally possible, publishing advances in model architectures, training methods, and alignment that the whole industry builds on.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CAREER_FACTS.map(f => (
                <div key={f.title} className="flex gap-4 rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style={{ background: C.bg, borderColor: C.border }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${f.color}12` }}>
                    <span style={{ color: f.color }}>{resolveIcon(f.iconKey, 20)}</span>
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons ML Engineering could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical ML Engineer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.3)'; (e.currentTarget as HTMLElement).style.background = '#f5f3ff' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.background = C.bg }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: C.primaryLight, color: C.primary }}>
                      {resolveIcon(item.iconKey, 14)}
                    </div>
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → Staff / Research Scientist</span></div>
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
          <SectionHeader icon={<Target size={22} />} title="Step-by-Step Roadmap" subtitle="Your path from complete beginner to job-ready ML Engineer" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="relative flex flex-col items-center">
            {ROADMAP_STEPS.map((s, i) => {
              const icons = ['🐍', '🤖', '🧠', '🗄️', '🚀', '🔬']
              const accentColors = ['#7c3aed', '#16a34a', '#7c3aed', '#16a34a', '#7c3aed', '#16a34a']
              const accent = accentColors[i]; const isLast = i === ROADMAP_STEPS.length - 1; const isEven = i % 2 === 0
              return (
                <div key={s.step} className="w-full flex flex-col items-center">
                  <div className="w-full" style={{ opacity: 0, transform: 'translateY(20px)', transition: `opacity 0.5s ${i * 0.13}s ease, transform 0.5s ${i * 0.13}s ease` }}
                    ref={(el: HTMLDivElement | null) => {
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.indigo} 100%)`, boxShadow: '0 8px 48px rgba(124,58,237,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>ML ENGINEER IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>12–18 months · Consistent daily practice · Build and ship real ML projects</div>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming ML Engineering in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f5f3ff', borderColor: 'rgba(124,58,237,0.2)', color: C.textMuted }}>
              AI tools don't replace ML engineers — they <em style={{ color: C.primary }}>amplify</em> them. Engineers who integrate Copilot and Claude into their workflow generate experiment scaffolding, debug tensor operations, and review model architecture code significantly faster — freeing time for the research and design problems that actually require human ingenuity.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-9">
              {AI_IMPACTS.map(item => (
                <div key={item.title} className="rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-1 hover:shadow-md" style={{ background: item.bgColor, borderColor: item.borderColor }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: item.icoBg }}>
                    <span style={{ color: item.icoColor }}>{resolveIcon(item.iconKey, 20)}</span>
                  </div>
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially for senior and research roles at AI labs — can pay 3–6× these figures in USD.</p>
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
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 4500) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f5f3ff', borderColor: 'rgba(124,58,237,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> ML engineers at AI-first companies (LLM labs, autonomous vehicles, healthtech AI) earn 40–70% more than those at traditional companies experimenting with ML. Target companies where the model is the product, not a supporting feature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring ML engineers" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into ML Engineering from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Machine Learning" iconBg={C.redLight} iconColor={C.red} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {VIDEOS.map(v => (
                <div key={v.id} className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ background: '#f8f9ff', borderColor: C.border }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.3)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: '#0a0c1a' }}>
                    <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} className="w-full h-full object-cover" style={{ opacity: 0.75 }} />
                    <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center no-underline">
                      <div className="rounded-full flex items-center justify-center" style={{ width: 52, height: 52, background: 'rgba(124,58,237,0.9)' }}>
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
                Machine Learning Engineering is the discipline that <strong style={{ color: C.primary }}>makes intelligence scalable</strong>. Every product that personalises, predicts, or generates — every system that learns from data and gets better over time — was built by engineers who did the hard work of connecting mathematics, software, and domain understanding into something that actually ships and works in the real world.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The path is demanding and the field moves fast, but the fundamentals you build — statistical reasoning, deep learning intuition, and the discipline of rigorous experimentation — compound for a career. The engineers who invest in depth early become the ones who lead the field later.
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open a Jupyter notebook and run your first gradient descent.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
           <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>
           
            
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start training today. Your future self will thank you.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}