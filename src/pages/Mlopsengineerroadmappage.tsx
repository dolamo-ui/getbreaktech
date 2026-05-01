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
  Layers,
  Terminal, Shield,
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
  primary: '#7c3aed',          // violet — MLOps / AI brand colour
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

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const CAREER_LEVELS = [
  {
    level: 'Junior', title: 'Junior MLOps Engineer', duration: '0–2 yrs', salary: 'R320k–R560k',
    description: 'Support ML model deployment, maintain training pipelines, write CI/CD scripts for ML workflows, and monitor model performance metrics under mentorship. Understand the ML lifecycle end to end.',
    skills: ['Python', 'Docker', 'ML Pipelines', 'Git'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'MLOps Engineer', duration: '2–5 yrs', salary: 'R650k–R1.1M',
    description: 'Own end-to-end ML platform design, build feature stores, implement model monitoring with drift detection, manage experiment tracking with MLflow, and design retraining triggers.',
    skills: ['Kubeflow / MLflow', 'Feature Stores', 'Model Monitoring', 'Kubernetes'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior MLOps Engineer', duration: '5–8 yrs', salary: 'R1.1M–R1.9M',
    description: 'Architect the ML platform for scale, define model governance and approval workflows, lead LLMOps infrastructure, mentor juniors, and drive reliability across the production ML estate.',
    skills: ['LLMOps', 'ML Governance', 'Platform Arch', 'Mentoring'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'Staff / Principal MLOps', duration: '8+ yrs', salary: 'R2.2M+',
    description: 'Define the ML engineering vision, drive AI infrastructure strategy across the organisation, solve the hardest reliability, latency, and cost challenges in production ML, and set standards for model governance.',
    skills: ['AI Strategy', 'Eng Leadership', 'Cost Optimisation', 'Model Risk'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Programming, ML Fundamentals & DevOps Basics',
    description: 'MLOps sits at the intersection of software engineering, data science, and DevOps. Master Python thoroughly, then learn ML fundamentals — supervised learning, model evaluation, overfitting, and feature engineering. In parallel, learn Git, CI/CD concepts, and basic Linux commands. You cannot operate ML systems you don\'t understand.',
    duration: '2–3 months', skills: ['Python 3', 'ML Fundamentals', 'Git & CI/CD', 'Linux Basics'],
  },
  {
    step: 2, title: 'Containerisation, Cloud & Infrastructure',
    description: 'Every production ML system runs in containers. Master Docker — images, containers, registries, and Compose. Learn Kubernetes fundamentals for orchestrating containerised ML workloads. Choose a cloud provider (AWS SageMaker, GCP Vertex AI, or Azure ML) and understand how compute, storage, and networking work together in cloud-native ML.',
    duration: '2–3 months', skills: ['Docker & Kubernetes', 'AWS SageMaker / Vertex AI', 'Cloud Infrastructure', 'IaC (Terraform)'],
  },
  {
    step: 3, title: 'ML Pipelines & Experiment Tracking',
    description: 'Production ML is not Jupyter notebooks. Learn to build reproducible, automated training pipelines using tools like Apache Airflow, Kubeflow Pipelines, or Metaflow. Implement experiment tracking with MLflow or W&B — every hyperparameter, every metric, every artifact must be logged. Reproducibility is non-negotiable in production ML.',
    duration: '2–3 months', skills: ['MLflow / W&B', 'Kubeflow Pipelines', 'Experiment Tracking', 'Pipeline Automation'],
  },
  {
    step: 4, title: 'Model Deployment & Serving',
    description: 'Trained models have no value until they serve predictions. Learn model serving patterns: REST APIs (FastAPI), gRPC endpoints, batch inference jobs, and streaming inference. Study deployment strategies — blue-green deployments, canary releases, shadow mode. Learn BentoML, Seldon, or TorchServe for production model serving.',
    duration: '1–2 months', skills: ['FastAPI Serving', 'Canary Deployments', 'BentoML / Seldon', 'Batch Inference'],
  },
  {
    step: 5, title: 'Model Monitoring, Drift & Retraining',
    description: 'Models degrade in production — data drift, concept drift, and schema drift are inevitable. Learn to monitor prediction distributions, feature statistics, and model performance metrics over time. Implement automated drift detection with Evidently AI or Whylogs. Design retraining triggers and approval workflows that keep models current.',
    duration: '2–3 months', skills: ['Evidently AI', 'Data / Concept Drift', 'Retraining Triggers', 'Alerting / SLAs'],
  },
  {
    step: 6, title: 'Feature Stores, LLMOps & ML Governance',
    description: 'Senior MLOps work means owning the feature store — Feast, Tecton, or Hopsworks — to serve consistent, low-latency features to models in production and training. Learn LLMOps patterns: prompt versioning, LLM evaluation pipelines, RAG infrastructure, and cost management for inference at scale. Understand model risk management, audit trails, and responsible AI governance.',
    duration: '3–4 months', skills: ['Feast / Tecton', 'LLMOps & RAG Infra', 'Model Governance', 'ML Risk Management'],
  },
]

const HARD_SKILLS = [
  { name: 'Python & ML Fundamentals', level: 95 },
  { name: 'Docker & Kubernetes', level: 92 },
  { name: 'ML Pipeline Orchestration', level: 88 },
  { name: 'Model Serving & Deployment', level: 85 },
  { name: 'MLflow / Experiment Tracking', level: 83 },
  { name: 'Model Monitoring & Drift Detection', level: 80 },
  { name: 'Feature Store Architecture', level: 70 },
  { name: 'LLMOps & RAG Infrastructure', level: 65 },
]

const SOFT_SKILLS = [
  { name: 'Bridge Between Data Science & Engineering', description: 'MLOps engineers translate between the world of data scientists (models, experiments, Jupyter) and software engineers (reliability, CI/CD, APIs). The ability to speak both languages fluently is the most valuable skill you can develop.' },
  { name: 'Production Reliability Mindset', description: 'ML models in production fail in subtle ways that don\'t crash servers — they just silently return wrong predictions. Internalise the DevOps culture of reliability, monitoring, and on-call ownership.' },
  { name: 'Experiment Design Intuition', description: 'Understand why an experiment is being run before automating it. MLOps engineers who understand model evaluation, A/B testing, and statistical significance build better infrastructure for data scientists.' },
  { name: 'Cost Consciousness', description: 'GPU compute and LLM inference are expensive. Great MLOps engineers always ask: can this be cheaper? Can this batch job run on spot instances? Can this embedding be cached? Cost awareness is a competitive advantage.' },
  { name: 'Model Risk Communication', description: 'Translate model confidence, drift metrics, and failure modes into language product managers and business stakeholders understand. Not everyone speaks ROC curves.' },
  { name: 'Debugging Across the ML Stack', description: 'Production ML bugs span Python code, SQL features, Docker environments, Kubernetes scheduling, and cloud networking. The ability to debug across all these layers without panicking is what separates senior MLOps engineers from everyone else.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'CS / Statistics / Data Science Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(124,58,237,0.2)', bgColor: '#faf5ff', typeBg: 'rgba(124,58,237,0.12)', typeColor: '#7c3aed',
    pros: ['Deep ML theory, statistics, and algorithm foundations', 'High credibility at research-led and large tech companies', 'Access to internship pipelines and graduate programmes', 'Strong network of future data scientists and engineers'],
    cons: ['Slow and expensive path to first job', 'Rarely teaches production ML, MLOps, or DevOps skills', 'Kubeflow, MLflow, and feature stores are largely self-taught', 'ML theory without production context is insufficient'],
  },
  {
    type: 'Bootcamp', title: 'MLOps / AI Engineering Bootcamp', duration: '3–6 months', cost: 'R60k – R130k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Job-ready MLOps pipeline and deployment skills fast', 'Strong portfolio projects and capstone work on exit', 'Career support and employer networks in the AI space', 'Structured, cohort-based accountability'],
    cons: ['Highly variable programme quality', 'Credential not universally respected', 'Rarely covers advanced LLMOps or feature engineering depth', 'Competitive entry into a rapidly evolving market'],
  },
  {
    type: 'Self-Taught', title: 'Online Courses & Projects', duration: '12–24 months', cost: 'R0 – R10k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['World-class content: fast.ai, Coursera MLOps Specialization, Chip Huyen\'s courses', 'Build real ML systems and deploy them from day one', 'Stay current with the fastest-moving field in tech', 'Portfolio-driven: every deployed model proves your ability'],
    cons: ['Requires exceptional self-discipline', 'MLOps tooling changes so fast that courses become outdated', 'No formal credential on CV', 'Imposter syndrome is pervasive in the ML world'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Model Health Review', desc: 'Check dashboards for drift alerts, prediction distribution shifts, serving latency spikes, and any model performance degradation across the production ML estate', duration: '30 min', icon: <Monitor size={14} /> },
  { time: '9:30', act: 'Core Platform Development', desc: 'Build or improve ML pipeline components — training automation, feature pipeline updates, model registry integrations, or serving infrastructure improvements', duration: '2.5 hrs', icon: <Workflow size={14} /> },
  { time: '12:00', act: 'Model Debugging & Incident Response', desc: 'Investigate production model failures, reproduce prediction errors in staging, trace issues through feature pipelines, and implement fixes with data scientists', duration: '1 hr', icon: <Terminal size={14} /> },
  { time: '1:00', act: 'Lunch & Recovery', desc: 'Step away from the terminal. The subconscious solves ML architecture problems during breaks far better than stressful debugging sessions', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Data Scientist Collaboration', desc: 'Review experiment configs, help data scientists productionise new models, align on API contracts for new features, and plan model deployment timelines', duration: '1 hr', icon: <Users size={14} /> },
  { time: '3:00', act: 'CI/CD & Deployment', desc: 'Review model deployment PRs, run validation tests on new model versions, push approved models through the deployment pipeline, and monitor canary rollouts', duration: '1.5 hrs', icon: <Shield size={14} /> },
  { time: '4:30', act: 'Learning & Exploration', desc: 'Read Chip Huyen\'s blog, Papers With Code, Shreya Shankar\'s ML monitoring research, or experiment with a new LLMOps pattern', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'MLflow / W&B', cat: 'Experiment Tracking' }, { name: 'Kubeflow / Metaflow', cat: 'Pipelines' },
  { name: 'Docker & Kubernetes', cat: 'Containers' }, { name: 'BentoML / Seldon', cat: 'Serving' },
  { name: 'Evidently AI', cat: 'Monitoring' }, { name: 'Feast / Tecton', cat: 'Feature Store' },
  { name: 'AWS SageMaker', cat: 'ML Platform' }, { name: 'GitHub Actions', cat: 'CI/CD' },
]

const WORK_ENVS = [
  { type: 'Remote', pct: 65 },
  { type: 'Hybrid', pct: 27 },
  { type: 'In-Office', pct: 8 },
]

const AI_IMPACTS = [
  {
    title: 'LLMOps — The New Frontier', icon: <Sparkles size={20} />,
    desc: 'MLOps engineers who can build LLM serving infrastructure, design RAG pipelines, implement prompt versioning systems, manage vector databases at scale, and control inference costs are in extreme demand in 2026.',
    tools: ['LangChain', 'LlamaIndex', 'Pinecone', 'vLLM'],
    borderColor: 'rgba(124,58,237,0.18)', bgColor: '#faf5ff', icoBg: 'rgba(124,58,237,0.12)', icoColor: '#7c3aed', tagBg: 'rgba(124,58,237,0.1)', tagColor: '#7c3aed', titleColor: '#7c3aed',
  },
  {
    title: 'AI-Assisted MLOps Development', icon: <Zap size={20} />,
    desc: 'Copilot and Claude generate Kubernetes YAML configs, write MLflow tracking code, build Airflow DAG scaffolding, and suggest model monitoring logic. MLOps engineers using AI tooling report 45–60% productivity gains on infrastructure code.',
    tools: ['GitHub Copilot', 'Claude', 'Cursor', 'Tabnine'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI-Powered Model Observability', icon: <TrendingUp size={20} />,
    desc: 'AI tools now detect prediction drift, automatically correlate model degradation to upstream data changes, surface silent model failures, and even suggest retraining strategies. Use them to build observability you could never staff manually.',
    tools: ['Arize AI', 'WhyLabs', 'Fiddler AI', 'Aporia'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'LLMOps & Prompt Versioning', 'RAG Infrastructure at Scale',
  'eBPF for ML System Observability', 'GPU Cluster Management',
  'Model Quantisation & Distillation', 'Responsible AI & Fairness Auditing',
]

const PROS = [
  { title: 'The Hottest Role in AI Infrastructure', desc: 'MLOps engineers are at the centre of the AI boom. Every company deploying ML models needs reliable ML infrastructure. Demand grew 52% in 2024 — one of the fastest-growing specialisations in all of engineering.' },
  { title: 'Exceptional Compensation', desc: 'Senior MLOps engineers at AI-first companies earn R1.1M–R1.9M in South Africa. At USD-paying global AI companies, principal-level MLOps engineers command salaries that rival quantitative finance roles.' },
  { title: 'Remote-First and Global', desc: 'Over 65% of MLOps roles are fully remote — the highest rate of any engineering specialisation. AI companies hire globally, and a South African MLOps engineer can work for a San Francisco startup from day one.' },
  { title: 'You Are at the Heart of the AI Transition', desc: 'MLOps engineers are the people who make AI investments actually work. Every LLM feature that ships, every recommendation model that improves, every fraud system that deploys — you made it possible.' },
  { title: 'Deep, Interdisciplinary Skills', desc: 'MLOps combines software engineering, data engineering, DevOps, and ML knowledge. The breadth of skills you build makes you exceptionally adaptable across the entire AI/ML industry.' },
  { title: 'The AI Economy Needs You', desc: 'There is a structural shortage of engineers who can bridge ML research and production systems. This gap is not closing — companies train data scientists far faster than they produce MLOps engineers.' },
]

const CONS = [
  { title: 'Relentlessly Fast-Moving Field', desc: 'The MLOps tooling landscape reinvents itself every 18 months. Tools that were standard in 2023 are legacy in 2026. Continuous learning is not optional — it is the job.' },
  { title: 'Debugging Across Invisible Boundaries', desc: 'Production ML bugs can hide in Python code, SQL feature definitions, Docker environments, Kubernetes configs, or cloud networking. The blast radius of a silent model failure is wide and often discovered slowly.' },
  { title: 'Caught Between Two Worlds', desc: 'Data scientists want experimentation flexibility. Software engineers want stability and reliability. MLOps engineers live in the middle of this tension — and are blamed by both sides when something breaks.' },
  { title: 'Model Governance and Compliance Weight', desc: 'As AI regulation tightens globally, MLOps engineers carry increasing responsibility for audit trails, bias testing, model cards, and explainability. This adds significant non-engineering workload.' },
  { title: 'GPU Cost Pressure', desc: 'LLM inference and model training are brutally expensive. MLOps engineers are expected to control and justify GPU spend — a pressure that increases as models get larger.' },
  { title: 'On-Call for Silent Failures', desc: 'Models that silently degrade are the worst kind of production incident. The financial, reputational, and user-experience cost of a quietly misbehaving model can be catastrophic and very hard to detect.' },
]

const VIDEOS = [
  { id: 'ngwIFEMFcQY', title: 'MLOps Full Course for Beginners 2025', desc: 'A complete end-to-end MLOps course covering Python, Docker, MLflow, Kubeflow Pipelines, model monitoring, and cloud deployment from first principles.', dur: '6:14:00', channel: 'freeCodeCamp' },
  { id: 'zA4KL3FYMUU', title: 'ML Model Deployment with FastAPI & Docker', desc: 'Build and deploy a production-ready ML model serving system with FastAPI, Docker, and Kubernetes. The most practical MLOps tutorial available.', dur: '1:48:00', channel: 'Patrick Loeber' },
  { id: 'kqDa6UAm5_c', title: 'MLflow Complete Tutorial — Experiment Tracking', desc: 'Master MLflow from experiment tracking to model registry to production deployment. The essential tool every MLOps engineer must know deeply.', dur: '2:22:00', channel: 'DataTalks.Club' },
]

const TAKEAWAYS = [
  'Learn to read a model\'s predictions in production as fluently as you read code — model debugging is the highest-leverage skill in MLOps',
  'Every model you ship to production must have monitoring, alerting, and a rollback plan before it goes live — not as an afterthought',
  'Read Chip Huyen\'s ML Systems Design book and Shreya Shankar\'s research — that is where the real production ML knowledge lives',
  'Cost awareness is a career advantage: the engineer who can cut inference costs by 40% without degrading performance is invaluable',
  'LLMOps is the frontier — invest time in RAG infrastructure, prompt versioning, and vector database design now, before the market becomes crowded',
]

const CAREER_FACTS = [
  {
    icon: <Cloud size={20} />, title: 'What You Build',
    desc: 'ML training pipelines, model registries, feature stores, model serving APIs, monitoring dashboards, drift detection systems, LLM inference infrastructure, RAG pipelines, and the entire platform that makes AI products reliable.',
    color: '#7c3aed',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Pipeline automation, model deployment and rollback, experiment tracking, feature engineering infrastructure, model monitoring, drift detection, retraining orchestration, LLMOps, and production incident response.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Data scientists whose models you productionise, backend engineers integrating your model APIs, data engineers building the feature data, product managers defining ML feature requirements, and compliance teams auditing model behaviour.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'MLOps roles grew 52% in 2024 — the fastest-growing engineering specialisation. The global AI investment wave is creating structural demand for engineers who can make ML work reliably in production. Demand far outstrips supply.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🤖', title: 'You Are at the Centre of the AI Economy', desc: 'Every company investing in AI needs MLOps engineers to make that investment work. Without reliable ML infrastructure, data scientist work never reaches production. You are the critical path.' },
  { emoji: '💰', title: 'The Highest AI Engineering Salaries', desc: 'Senior MLOps engineers at AI-first companies earn R1.1M–R1.9M in South Africa. At USD-paying global AI companies, the ceiling is significantly higher.' },
  { emoji: '🌍', title: 'Fully Remote is Expected', desc: 'Over 65% of MLOps roles are fully remote — the highest rate in engineering. AI companies are global by default. Your infrastructure runs in the cloud regardless of your timezone.' },
  { emoji: '🧩', title: 'Uniquely Interdisciplinary Problems', desc: 'Debugging a model drift incident requires understanding ML, data engineering, distributed systems, and cloud networking simultaneously. MLOps problems are genuinely unique and deeply engaging.' },
  { emoji: '📈', title: 'Fastest-Growing Engineering Specialisation', desc: 'MLOps grew 52% in job postings in 2024. As every company becomes an AI company, the demand for engineers who can productionise ML will only accelerate.' },
  { emoji: '🔒', title: 'Skills That Are Structurally Scarce', desc: 'There are far more data scientists who need their models productionised than there are MLOps engineers to do it. This structural scarcity keeps compensation high and job security exceptional.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#7c3aed', bgColor: '#faf5ff', items: [
    { name: 'Coursera — MLOps Specialization (DeepLearning.AI)', url: '#', type: 'Course', rating: 5 },
    { name: 'Made With ML — MLOps for Production (free)', url: '#', type: 'Course', rating: 5 },
    { name: 'DataTalks.Club — MLOps Zoomcamp (free)', url: '#', type: 'Course', rating: 5 },
    { name: 'fast.ai — Practical Deep Learning for Coders', url: '#', type: 'Course', rating: 5 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'Deploy a model end-to-end: train → MLflow → FastAPI → Docker', url: '#', type: 'Project', rating: 5 },
    { name: 'Add Evidently AI drift monitoring to a real model', url: '#', type: 'Project', rating: 5 },
    { name: 'Build a RAG pipeline with LangChain + Pinecone', url: '#', type: 'Project', rating: 5 },
    { name: 'roadmap.sh — MLOps Engineer Path', url: '#', type: 'Reference', rating: 4 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'Chip Huyen — ML Systems Design Blog', url: '#', type: 'Blog', rating: 5 },
    { name: 'MLOps.community Podcast & Slack', url: '#', type: 'Community', rating: 5 },
    { name: 'r/mlops — Active Practitioner Forum', url: '#', type: 'Forum', rating: 4 },
    { name: 'Weights & Biases Engineering Blog', url: '#', type: 'Blog', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior MLOps Engineer', range: 'R320k – R560k', midpoint: 440, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'MLOps Engineer', range: 'R650k – R1.1M', midpoint: 875, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior MLOps Engineer', range: 'R1.1M – R1.9M', midpoint: 1500, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Staff / Principal MLOps', range: 'R2.2M – R4M+', midpoint: 2800, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Deploying Models Without Monitoring',
    desc: 'Shipping a model to production without drift detection, prediction monitoring, and performance alerting is the single most dangerous mistake in MLOps. Models degrade silently — you will not know until users or stakeholders notice.',
    fix: 'Before any model goes live, deploy Evidently AI or WhyLabs alongside it. Monitor prediction distributions, input feature statistics, and business metrics from day one.',
  },
  {
    num: '02', title: 'Skipping Experiment Tracking from the Start',
    desc: 'Untracked experiments make model governance impossible. When a production model behaves unexpectedly, you need to reproduce the exact training run. Without MLflow or W&B, that is simply not possible.',
    fix: 'Make MLflow or W&B the first tool you configure in any ML project. Track every hyperparameter, every metric, and every artifact before a single training run.',
  },
  {
    num: '03', title: 'Treating Model Deployment Like Software Deployment',
    desc: 'Software is deterministic. ML models are probabilistic and degrade with data drift. A deployment strategy that works for APIs does not work for models — you need canary releases, shadow mode testing, and statistical validation.',
    fix: 'Always validate new model versions in shadow mode before canary rollout. Compare prediction distributions against the current production model before flipping traffic.',
  },
  {
    num: '04', title: 'Ignoring the Feature Store Problem',
    desc: 'Training-serving skew — where model inputs during training differ from inputs during serving — is one of the most common and hardest-to-debug sources of model degradation. It is almost always caused by inconsistent feature computation.',
    fix: 'Use a feature store (Feast, Tecton, or Hopsworks) so training and serving features are computed identically. Training-serving consistency must be by design, not by hope.',
  },
  {
    num: '05', title: 'Never Testing Models Before Deployment',
    desc: 'Many teams have CI/CD for code but not for models. Deploying a model without testing prediction latency, memory consumption, output distribution, and edge case behaviour causes production incidents that are very hard to diagnose.',
    fix: 'Write model validation tests: assertion on output schema, latency benchmarks under load, prediction distribution checks, and adversarial input tests before every deployment.',
  },
  {
    num: '06', title: 'Building Before Understanding the ML Workflow',
    desc: 'MLOps engineers who have never trained, evaluated, or iterated on a real model build infrastructure that doesn\'t fit how data scientists actually work. The result is platform adoption failure.',
    fix: 'Before building infrastructure, spend two weeks working alongside a data scientist on an actual project. Understand their workflow before automating it.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Data Scientist / ML Researcher',
    ease: 'Natural Fit', easeColor: '#7c3aed', easeBg: '#faf5ff',
    desc: 'Deep ML knowledge is your biggest advantage. Add production engineering skills — Docker, Kubernetes, CI/CD, and monitoring — and you can transition into MLOps relatively quickly. You already understand what needs to be automated.',
    steps: ['Learn Docker thoroughly — containerise every model you build', 'Study Kubernetes fundamentals and deploy a model to a cluster', 'Add MLflow experiment tracking to your current workflow', 'Target MLOps or ML platform engineering roles'],
  },
  {
    from: 'Backend / Software Developer',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Production engineering, CI/CD, and API design are already in your toolkit. Add ML fundamentals and MLOps-specific tooling — MLflow, Kubeflow, and monitoring — and you can move into MLOps with exceptional production engineering credibility.',
    steps: ['Complete Andrew Ng\'s ML Specialisation to build ML fundamentals', 'Deploy a model end-to-end with FastAPI, Docker, and MLflow', 'Study model monitoring and add drift detection to your project', 'Target MLOps roles at companies deploying ML at scale'],
  },
  {
    from: 'DevOps / Platform Engineer',
    ease: 'Very Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Infrastructure, Kubernetes, CI/CD, and cloud skills are your foundation. Add ML fundamentals and ML-specific tooling to become an MLOps engineer. Your production engineering credibility is a significant differentiator.',
    steps: ['Learn Python and complete a beginner ML course (fast.ai)', 'Set up MLflow and Kubeflow on your existing Kubernetes cluster', 'Build a model deployment pipeline using your existing CI/CD skills', 'Target ML platform engineering or MLOps roles'],
  },
  {
    from: 'Data Engineer',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Pipeline design, orchestration, and data infrastructure skills give you a strong foundation. Feature store design, training pipeline automation, and data quality for ML are natural extensions of your existing expertise.',
    steps: ['Study ML fundamentals — you already understand the data layer', 'Build a training pipeline with Airflow, extending your existing skills', 'Add MLflow and model serving to your data platform expertise', 'Target ML platform or MLOps roles at data-mature companies'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Python, ML & DevOps Basics', color: '#7c3aed', bg: '#faf5ff', days: [
    { day: 'Day 1–2', task: 'Set up Python. Train a scikit-learn classifier on a real dataset. Evaluate it with precision, recall, and ROC AUC. Push to GitHub.' },
    { day: 'Day 3–4', task: 'Containerise your model: write a Dockerfile, build an image, and serve predictions via a FastAPI endpoint in a Docker container.' },
    { day: 'Day 5–6', task: 'Add MLflow experiment tracking to your training script. Log hyperparameters, metrics, and the trained model artifact. View the MLflow UI.' },
    { day: 'Day 7', task: 'Git fundamentals: branch, PR, merge. Set up a GitHub Actions workflow that runs your model evaluation test on every push.' },
  ]},
  { week: 'Week 2', theme: 'Pipelines & Serving', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Build a training pipeline with Apache Airflow: DAG with extract → train → evaluate → register steps. Run it on a schedule.' },
    { day: 'Day 10–11', task: 'Register your model in the MLflow Model Registry. Write a script that automatically promotes models that pass evaluation thresholds.' },
    { day: 'Day 12–13', task: 'Deploy the registered model to production using BentoML or Seldon. Test prediction latency and throughput under load with Locust.' },
    { day: 'Day 14', task: 'Implement a canary deployment: split 10% of traffic to the new model, 90% to the current model. Verify both serve correctly.' },
  ]},
  { week: 'Week 3', theme: 'Monitoring & Drift Detection', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Add Evidently AI monitoring to your serving pipeline. Generate a data drift report comparing production inputs to training data.' },
    { day: 'Day 17–18', task: 'Set up prediction monitoring: log model outputs to a database. Write alerts for prediction distribution changes beyond a threshold.' },
    { day: 'Day 19–20', task: 'Build a retraining trigger: when drift exceeds your threshold, automatically kick off a new training run via Airflow.' },
    { day: 'Day 21', task: 'Simulate data drift deliberately by changing your input data. Verify your detection and retraining pipeline responds correctly.' },
  ]},
  { week: 'Week 4', theme: 'Cloud, Kubernetes & Ship', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Deploy your entire ML system to Kubernetes: training pipeline, model server, and monitoring stack. Use a free-tier GKE or EKS cluster.' },
    { day: 'Day 25–26', task: 'Set up GitHub Actions CI/CD: run model validation tests on every PR. Auto-deploy to staging on merge. Promote to production manually.' },
    { day: 'Day 27–28', task: 'Build a RAG pipeline: embed documents into Pinecone, retrieve context, and serve via an LLM API. Add latency monitoring.' },
    { day: 'Day 29–30', task: 'Write a project README with architecture diagram. Share on LinkedIn. Apply to 5 junior MLOps or ML platform engineering roles.' },
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
      try { await navigator.share({ title: 'MLOps Engineer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become an MLOps Engineer in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/mlops-engineer'}</span>
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
export default function MLOpsEngineerRoadmapPage() {
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

      {/* ── HERO ── */}
      <div className="relative w-full" style={{ background: C.bg }}>
        <div className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: 600 }}>
          <img src="https://i.imgur.com/tZn2A5R.jpeg" alt="MLOps Engineer AI and infrastructure" className="w-full h-full object-cover object-center block" style={{ filter: 'saturate(0.55) brightness(1.05)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Cloud size={12} /> AI / ML Infrastructure Engineering
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                MLOps Engineer
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
            Make AI actually work in production. MLOps engineers build the infrastructure that takes ML models from research notebooks to reliable, monitored, production systems — the critical link between data science ambition and real-world AI products.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of MLOps Engineering" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#faf5ff', borderColor: 'rgba(124,58,237,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                An <strong style={{ color: C.primary }}>MLOps Engineer</strong> builds and operates the infrastructure that makes machine learning work reliably in production. While data scientists train models and researchers publish papers, MLOps engineers build the pipelines, platforms, and monitoring systems that take ML from notebook to production — and keep it working at scale. In the AI economy, MLOps is the role that makes the difference between AI investment and AI impact.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons MLOps Engineering could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical MLOps Engineer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.3)'; (e.currentTarget as HTMLElement).style.background = '#faf5ff' }}
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → Staff MLOps</span></div>
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
              const icons = ['🐍', '🐳', '🔬', '🚀', '📊', '🏗️']
              const accentColors = ['#7c3aed', '#16a34a', '#7c3aed', '#16a34a', '#7c3aed', '#16a34a']
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
                        {isEven ? <polygon points="372,36 388,44 372,52" fill={accentColors[i + 1] ?? accent} opacity="0.5" /> : <polygon points="28,36 12,44 28,52" fill={accentColors[i + 1] ?? accent} opacity="0.5" />}
                      </svg>
                    </div>
                  )}
                </div>
              )
            })}
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.indigo} 100%)`, boxShadow: '0 8px 48px rgba(124,58,237,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>10–14 months · Consistent daily practice · Build and deploy real ML systems</div>
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

      {/* ── EDUCATION ── */}
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming MLOps Engineering in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#faf5ff', borderColor: 'rgba(124,58,237,0.2)', color: C.textMuted }}>
              AI tools don't replace MLOps engineers — they <em style={{ color: C.primary }}>amplify</em> them. Engineers who integrate Copilot and Claude into their workflow write Kubernetes configs, build monitoring pipelines, and debug model failures significantly faster — freeing time for architecture and platform strategy.
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially for senior and staff roles — can pay 2–4× these figures in USD.</p>
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
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 4000) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#faf5ff', borderColor: 'rgba(124,58,237,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> MLOps engineers at AI-first product companies (AI labs, LLM startups, ML platform companies) earn 40–80% more than those at traditional enterprises. Target companies where AI is the product, not a feature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring MLOps engineers" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into MLOps from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in MLOps Engineering" iconBg={C.redLight} iconColor={C.red} />
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
                MLOps engineering is the discipline that <strong style={{ color: C.primary }}>turns AI investments into AI outcomes</strong>. Every successful company in the AI economy — every product that uses ML reliably, every model that improves over time, every AI feature that ships safely — was built on the work of MLOps engineers who designed reliable systems, monitored model behaviour, and kept the AI trustworthy.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The field is fast-moving but the fundamentals are stable. An engineer who deeply understands model deployment, drift detection, and experiment tracking will always be valuable — regardless of which platform or tool is dominant in any given year.
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to train your first model and ship it.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
           <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>
           
           
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start building today. Your future self will thank you.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}