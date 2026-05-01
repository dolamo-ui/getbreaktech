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
  primary: '#0891b2',       // teal — Data Science brand colour
  primaryLight: 'rgba(8,145,178,0.08)',
  primaryMid: 'rgba(8,145,178,0.15)',
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
}

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const CAREER_LEVELS = [
  { level: 'Beginner', title: 'Junior Data Scientist', duration: '0–2 yrs', salary: 'R350k–R550k', description: 'Clean datasets, run exploratory analysis, and build your first predictive models under guidance.', skills: ['Python', 'Pandas', 'SQL', 'Stats'], accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)' },
  { level: 'Intermediate', title: 'Data Scientist', duration: '2–5 yrs', salary: 'R650k–R1.1M', description: 'Own entire analysis pipelines, deploy models, and communicate insights to business stakeholders.', skills: ['ML Models', 'Scikit-learn', 'A/B Testing', 'Tableau'], accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)' },
  { level: 'Advanced', title: 'Senior Data Scientist', duration: '5–8 yrs', salary: 'R1.1M–R1.7M', description: 'Lead data strategy, design experiments, and mentor junior scientists across the organisation.', skills: ['Causal Inference', 'Deep Learning', 'Leadership', 'NLP'], accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)' },
  { level: 'Expert', title: 'Principal / Staff DS', duration: '8+ yrs', salary: 'R1.8M+', description: 'Define the data science vision, publish research, and make company-level decisions through data.', skills: ['Research', 'Strategy', 'Org Design', 'Publications'], accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)' },
]

const ROADMAP_STEPS = [
  { step: 1, title: 'Python & Statistics Foundations', description: 'Python is the language of data science. Pair it with solid statistics — distributions, hypothesis testing, probability — and you have the foundation for everything.', duration: '2–3 months', skills: ['Python', 'NumPy', 'Statistics', 'Probability'] },
  { step: 2, title: 'Data Wrangling & SQL', description: 'Real-world data is messy. Learn to collect, clean, and transform data using Pandas and SQL — the daily bread of every data scientist on the planet.', duration: '1–2 months', skills: ['Pandas', 'SQL', 'Seaborn', 'Matplotlib'] },
  { step: 3, title: 'Exploratory Data Analysis', description: 'Before modelling, you must understand your data. EDA reveals patterns, anomalies, and business insights that drive every downstream decision.', duration: '1 month', skills: ['EDA', 'Plotly', 'Feature Analysis', 'Storytelling'] },
  { step: 4, title: 'Machine Learning Fundamentals', description: 'Learn regression, classification, and clustering with Scikit-learn. Understand the bias–variance tradeoff, cross-validation, and model selection.', duration: '2–3 months', skills: ['Scikit-learn', 'Regression', 'Classification', 'Clustering'] },
  { step: 5, title: 'Advanced ML & Deep Learning', description: 'Move beyond classical ML into ensemble methods, neural networks, and NLP. PyTorch and Transformers are now expected at senior levels.', duration: '3–4 months', skills: ['XGBoost', 'PyTorch', 'Transformers', 'NLP'] },
  { step: 6, title: 'Deployment & Communication', description: 'Models that stay in notebooks create zero value. Learn to deploy, monitor, and — critically — communicate your findings to non-technical audiences.', duration: '2 months', skills: ['Streamlit', 'FastAPI', 'MLflow', 'Storytelling'] },
]

const HARD_SKILLS = [
  { name: 'Python & Data Libraries (NumPy, Pandas)', level: 96 },
  { name: 'Statistical Analysis & Hypothesis Testing', level: 92 },
  { name: 'Machine Learning (Scikit-learn)', level: 88 },
  { name: 'SQL & Database Querying', level: 85 },
  { name: 'Data Visualisation (Matplotlib, Plotly)', level: 82 },
  { name: 'Deep Learning & Neural Networks', level: 70 },
  { name: 'NLP & Text Analytics', level: 65 },
  { name: 'Model Deployment & MLOps', level: 58 },
]

const SOFT_SKILLS = [
  { name: 'Analytical Curiosity', description: 'Ask better questions than anyone else in the room — the best insights come from the right question, not the fanciest model.' },
  { name: 'Business Acumen', description: 'Translate data findings into revenue, risk, or cost terms that executives actually care about.' },
  { name: 'Data Storytelling', description: 'Turn a complex analysis into a clear narrative. Charts that confuse create no value.' },
  { name: 'Statistical Rigour', description: 'Avoid p-hacking, data leakage, and survivorship bias. Good science requires discipline.' },
  { name: 'Collaboration', description: 'Work closely with engineers, product, and business to define problems worth solving.' },
  { name: 'Ethical Judgment', description: 'Understand and challenge bias in data collection, model design, and outcome measurement.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Statistics / Maths / CS Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(8,145,178,0.2)', bgColor: '#f0f9ff', typeBg: 'rgba(8,145,178,0.12)', typeColor: '#0891b2',
    pros: ['Deep statistical foundation', 'Academic network & research exposure', 'Respected by top employers', 'Access to internship pipelines'],
    cons: ['Multi-year time investment', 'High tuition cost', 'Slow start to earning', 'Can be heavy on theory'],
  },
  {
    type: 'Bootcamp', title: 'Data Science Bootcamp', duration: '3–6 months', cost: 'R80k – R160k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Job-ready skills fast', 'Strong project portfolio', 'Career support included', 'Cohort accountability'],
    cons: ['Uneven programme quality', 'Credential not always valued', 'Theory often shallow', 'Competitive market entry'],
  },
  {
    type: 'Self-Taught', title: 'Online Courses + Projects', duration: '8–24 months', cost: 'R0 – R8k',
    borderColor: 'rgba(124,58,237,0.2)', bgColor: '#faf5ff', typeBg: 'rgba(124,58,237,0.12)', typeColor: '#7c3aed',
    pros: ['Fully flexible learning pace', 'World-class free resources', 'Customisable curriculum', 'Low barrier to start'],
    cons: ['Needs strong self-discipline', 'No formal credential', 'Easy to get lost', 'Hard to validate skills'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Data Review & Standup', desc: 'Review yesterday\'s query results, sync with analysts and PMs on priorities', duration: '20 min', icon: <Users size={14} /> },
  { time: '9:30', act: 'Exploratory Analysis', desc: 'Deep dive into a new dataset — profiling, visualisation, anomaly detection', duration: '2 hrs', icon: <BarChart2 size={14} /> },
  { time: '11:30', act: 'Model Development', desc: 'Train, evaluate, and iterate on predictive models or experiments', duration: '2 hrs', icon: <Monitor size={14} /> },
  { time: '1:30', act: 'Lunch & Recovery', desc: 'Away from the screen — the best insights often arrive in downtime', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:30', act: 'Stakeholder Prep', desc: 'Build charts and narrative for tomorrow\'s business review', duration: '1.5 hrs', icon: <Lightbulb size={14} /> },
  { time: '4:00', act: 'Code Reviews & Docs', desc: 'Review colleague notebooks, update analysis documentation, log findings', duration: '1 hr', icon: <Code size={14} /> },
  { time: '5:00', act: 'Learning Block', desc: 'Read a paper, follow a new technique, or experiment with a new tool', duration: '30 min', icon: <Home size={14} /> },
]

const TOOLS = [
  { name: 'Jupyter', cat: 'Notebook' }, { name: 'VS Code', cat: 'IDE' },
  { name: 'Pandas', cat: 'Data' }, { name: 'Scikit-learn', cat: 'ML' },
  { name: 'Tableau', cat: 'BI' }, { name: 'dbt', cat: 'Transform' },
  { name: 'Spark', cat: 'Big Data' }, { name: 'Snowflake', cat: 'Warehouse' },
]

const WORK_ENVS = [
  { type: 'Remote', pct: 48 },
  { type: 'Hybrid', pct: 38 },
  { type: 'In-Office', pct: 14 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Powered Analysis', icon: <Sparkles size={20} />,
    desc: 'Tools like Claude and ChatGPT can generate SQL queries, debug Pandas pipelines, and explain statistical concepts on demand.',
    tools: ['Claude', 'ChatGPT', 'Jupyter AI', 'GitHub Copilot'],
    borderColor: 'rgba(8,145,178,0.18)', bgColor: '#f0f9ff', icoBg: 'rgba(8,145,178,0.12)', icoColor: '#0891b2', tagBg: 'rgba(8,145,178,0.1)', tagColor: '#0891b2', titleColor: '#0891b2',
  },
  {
    title: 'AutoML & Feature Engineering', icon: <Zap size={20} />,
    desc: 'AutoML platforms automatically select models and tune hyperparameters, letting you focus on problem framing and interpretation.',
    tools: ['TPOT', 'H2O AutoML', 'AutoGluon', 'Optuna'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
  {
    title: 'LLMs for Text & Unstructured Data', icon: <TrendingUp size={20} />,
    desc: 'Pre-trained LLMs unlock NLP tasks that previously required huge labelled datasets — sentiment, summarisation, classification.',
    tools: ['Hugging Face', 'LangChain', 'spaCy', 'OpenAI API'],
    borderColor: 'rgba(124,58,237,0.18)', bgColor: '#faf5ff', icoBg: 'rgba(124,58,237,0.12)', icoColor: '#7c3aed', tagBg: 'rgba(124,58,237,0.1)', tagColor: '#7c3aed', titleColor: '#7c3aed',
  },
]

const FUTURE_SKILLS = [
  'Causal Inference & A/B Testing', 'LLM-Powered Data Analysis',
  'Real-Time Feature Stores', 'Responsible AI & Fairness',
  'Time-Series Forecasting at Scale', 'Graph Neural Networks',
]

const PROS = [
  { title: 'Massive Demand', desc: 'Data scientists are needed in every industry — finance, health, retail, government. Demand grew 36% in 2024.' },
  { title: 'Exceptional Pay', desc: 'Senior data scientists regularly earn R1.5M+ in South Africa, with global remote roles paying far more.' },
  { title: 'Diverse Industries', desc: 'Apply your skills anywhere — from banking fraud detection to sports analytics to climate modelling.' },
  { title: 'Creative Problem Solving', desc: 'Every analysis is a puzzle. Data scientists combine rigour with creativity to extract insight from chaos.' },
  { title: 'Strategic Influence', desc: 'Data scientists often sit at the executive table, influencing product, pricing, and company strategy.' },
  { title: 'Remote-Friendly', desc: 'Analysis work translates perfectly to async remote environments — 48% of DS roles are fully remote.' },
]

const CONS = [
  { title: 'Heavy Math Barrier', desc: 'Linear algebra, calculus, and statistics are prerequisites. Without them, you\'ll hit a ceiling fast.' },
  { title: '"Janitor Work" Reality', desc: '60–80% of real data science is cleaning and wrangling data — not building cool models.' },
  { title: 'Business Misalignment', desc: 'Companies often don\'t know how to use data scientists well. You may spend months on low-impact work.' },
  { title: 'Model Interpretability', desc: 'Explaining black-box model decisions to regulators or executives is hard and often underestimated.' },
  { title: 'Tool Churn', desc: 'The ecosystem evolves fast. Mastering one stack can become a liability when the industry moves on.' },
  { title: 'High Expectations', desc: '"Data science" is often oversold internally. Managing expectations around what ML can and can\'t do is exhausting.' },
]

const VIDEOS = [
  { id: 'ua-CiDNNj30', title: 'How to become a Data Scientist in 2025', desc: 'A practical, no-nonsense guide from a working data scientist on how to break into the field.', dur: '14:32', channel: 'Ken Jee' },
  { id: 'X3paOmcrTjQ', title: 'Statistics for Data Science', desc: 'The essential statistics you need — probability, distributions, hypothesis testing — explained clearly.', dur: '21:08', channel: 'StatQuest' },
  { id: 'N6BghzuFLIg', title: 'Pandas Data Analysis Tutorial', desc: 'A complete hands-on walkthrough of Pandas for real data wrangling tasks every DS does daily.', dur: '33:15', channel: 'Tech With Tim' },
]

const TAKEAWAYS = [
  'Statistics and Python are non-negotiable — master them before touching ML',
  'Spend more time on EDA and storytelling than on model complexity',
  'Learn SQL deeply — it\'s what separates entry-level from hireable',
  'Deploy at least one project publicly on Streamlit or Hugging Face Spaces',
  'Kaggle competitions are the fastest way to build credible experience',
]

/* ─── NEW SECTIONS ────────────────────────────────────────────────────────── */

const CAREER_FACTS = [
  { icon: <BarChart2 size={20} />, title: 'What You Build', desc: 'Predictive models, dashboards, recommendation systems, A/B tests, forecasting tools, and business intelligence pipelines.', color: '#0891b2' },
  { icon: <Code size={20} />, title: 'Core Activities', desc: 'SQL queries, Python analysis, statistical modelling, experiment design, visualisation, and stakeholder presentations.', color: '#16a34a' },
  { icon: <Users size={20} />, title: 'Who You Work With', desc: 'Product managers, data engineers, executives, analysts, and machine learning engineers.', color: '#7c3aed' },
  { icon: <TrendingUp size={20} />, title: 'Industry Demand', desc: 'The global data science market is projected to reach $322B by 2026. Hiring grew 36% in 2024 despite broader tech layoffs.', color: '#ea580c' },
]

const WHY_REASONS = [
  { emoji: '💡', title: 'Solve Real Business Problems', desc: 'Every analysis you run informs real decisions — pricing strategies, product launches, risk management. Your work has visible, measurable impact.' },
  { emoji: '💰', title: 'Top-Tier Compensation', desc: 'Senior data scientists earn R1.5M–R1.8M in South Africa. Add global remote work and USD rates multiply that significantly.' },
  { emoji: '🌐', title: 'Work in Any Industry', desc: 'Healthcare, finance, sport, retail, government — every sector runs on data. Your skills are portable across all of them.' },
  { emoji: '🧪', title: 'Intellectual Depth', desc: 'Data science sits at the intersection of statistics, programming, and domain knowledge. It is genuinely challenging in the best way.' },
  { emoji: '📊', title: 'Tell Stories With Data', desc: 'The best data scientists are master storytellers. If you love making complexity clear, this career rewards that skill enormously.' },
  { emoji: '🚀', title: 'Path to AI & Leadership', desc: 'Data science is the natural entry point to ML engineering, AI research, and ultimately data leadership roles like Head of Data or CDO.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#0891b2', bgColor: '#f0f9ff', items: [
    { name: 'fast.ai — Practical Machine Learning', url: '#', type: 'Course', rating: 5 },
    { name: 'Andrew Ng Data Science Specialisation', url: '#', type: 'Course', rating: 5 },
    { name: 'StatQuest with Josh Starmer', url: '#', type: 'YouTube', rating: 5 },
    { name: 'Kaggle Free Courses (Pandas, SQL, ML)', url: '#', type: 'Platform', rating: 4 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'Kaggle Competitions & Datasets', url: '#', type: 'Platform', rating: 5 },
    { name: 'Mode Analytics SQL School', url: '#', type: 'Practice', rating: 4 },
    { name: 'Papers With Code', url: '#', type: 'Research', rating: 5 },
    { name: 'StrataScratch (SQL + Python)', url: '#', type: 'Practice', rating: 4 },
  ]},
  { category: 'Community', color: '#7c3aed', bgColor: '#faf5ff', items: [
    { name: 'r/datascience', url: '#', type: 'Forum', rating: 4 },
    { name: 'Towards Data Science (Medium)', url: '#', type: 'Blog', rating: 5 },
    { name: 'Ken Jee\'s #66DaysOfData', url: '#', type: 'Challenge', rating: 5 },
    { name: 'Data Science Weekly Newsletter', url: '#', type: 'Newsletter', rating: 4 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Data Scientist', range: 'R350k – R550k', midpoint: 450, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Data Scientist', range: 'R650k – R1.1M', midpoint: 875, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Data Scientist', range: 'R1.1M – R1.7M', midpoint: 1400, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Principal / Staff DS', range: 'R1.8M – R3M+', midpoint: 2300, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  { num: '01', title: 'Building Models Before Understanding Data', desc: 'Jumping straight to neural networks without spending 80% of your time on EDA and cleaning. Garbage in, garbage out — always.', fix: 'Spend at least 3× more time on data understanding than model selection.' },
  { num: '02', title: 'Ignoring SQL', desc: 'Thinking Python replaces SQL. Every real DS role requires writing efficient queries at scale. SQL is non-negotiable.', fix: 'Complete Mode Analytics SQL School and StrataScratch before any interviews.' },
  { num: '03', title: 'Optimising for Accuracy, Not Business Value', desc: 'A 99% accurate model on a 99% baseline dataset is useless. Learn to define success in terms of business metrics, not just RMSE.', fix: 'Always ask "what decision does this model change?" before starting any project.' },
  { num: '04', title: 'No Public Portfolio', desc: 'Applying with only Kaggle notebooks that follow tutorials. Recruiters want to see you solve a real, original problem end to end.', fix: 'Build one project on a dataset you personally scraped or collected. Document it well.' },
  { num: '05', title: 'Skipping Data Storytelling', desc: 'Building great models but communicating findings with walls of numbers. Executives decide with stories, not with p-values.', fix: 'Practice presenting findings to a non-technical friend or family member regularly.' },
  { num: '06', title: 'Treating Stats as Optional', desc: 'Skipping statistical theory in favour of just calling library functions. When your model misbehaves, you won\'t know why.', fix: 'Read "Naked Statistics" or "Statistics Done Wrong" before touching advanced ML.' },
]

const CAREER_CHANGE_PATHS = [
  { from: 'Data Analyst', ease: 'Easiest', easeColor: '#16a34a', easeBg: '#f0fdf4', desc: 'You already query data and build dashboards. Add ML fundamentals and Python depth to make the jump naturally.', steps: ['Deepen Python skills', 'Learn Scikit-learn basics', 'Build 2 predictive models', 'Reframe your portfolio'] },
  { from: 'Software Engineer', ease: 'Very Manageable', easeColor: '#0891b2', easeBg: '#f0f9ff', desc: 'Your engineering foundation is a huge asset. Add statistics, ML theory, and domain knowledge and you\'re there.', steps: ['Learn statistical inference', 'Complete a fast.ai course', 'Build EDA + ML projects', 'Target DS-adjacent roles'] },
  { from: 'Academic / Researcher', ease: 'Natural Fit', easeColor: '#7c3aed', easeBg: '#faf5ff', desc: 'Your rigour and research skills are exactly what DS needs. Bridge the gap with Python engineering and business communication.', steps: ['Master Python & Pandas', 'Learn business framing', 'Deploy one project publicly', 'Network in industry'] },
  { from: 'Other Background', ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed', desc: 'Domain expertise + data skills is a powerful combination. A finance or healthcare DS is rarer and often better paid.', steps: ['Start with statistics basics', 'Complete Kaggle courses', 'Apply DS to your domain', 'Target niche DS roles'] },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Python Essentials', color: '#0891b2', bg: '#f0f9ff', days: [
    { day: 'Day 1–2', task: 'Set up Python, Jupyter, and VS Code. Run your first notebook.' },
    { day: 'Day 3–4', task: 'Python fundamentals: functions, loops, comprehensions, classes.' },
    { day: 'Day 5–6', task: 'NumPy — array operations, broadcasting, vectorised math.' },
    { day: 'Day 7', task: 'Load a CSV with Pandas. Explore, clean, and summarise it.' },
  ]},
  { week: 'Week 2', theme: 'Statistics & SQL', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Probability distributions, mean, variance, standard deviation.' },
    { day: 'Day 10–11', task: 'Hypothesis testing — t-tests, chi-square, confidence intervals.' },
    { day: 'Day 12–13', task: 'SQL basics: SELECT, JOIN, GROUP BY, subqueries.' },
    { day: 'Day 14', task: 'Write 10 SQL queries on a public dataset from Mode Analytics.' },
  ]},
  { week: 'Week 3', theme: 'First ML Model', color: '#7c3aed', bg: '#faf5ff', days: [
    { day: 'Day 15–16', task: 'Linear regression from scratch, then with Scikit-learn.' },
    { day: 'Day 17–18', task: 'Classification: logistic regression + decision trees.' },
    { day: 'Day 19–20', task: 'Train/test split, cross-validation, precision & recall.' },
    { day: 'Day 21', task: 'Submit your first Kaggle competition (Titanic survival).' },
  ]},
  { week: 'Week 4', theme: 'Ship & Share', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Pick a real dataset you care about. Perform full EDA.' },
    { day: 'Day 25–26', task: 'Build and evaluate 3 different models on your dataset.' },
    { day: 'Day 27–28', task: 'Deploy your analysis as a Streamlit app (free on Streamlit Cloud).' },
    { day: 'Day 29–30', task: 'Write a LinkedIn post about your project. Tag 3 data scientists.' },
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
      try { await navigator.share({ title: 'Data Scientist Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Data Scientist in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/data-scientist'}</span>
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
export default function DataScienceRoadmapPage() {
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
        {/* Full-screen image container */}
        <div className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: 600 }}>
          <img src="https://i.imgur.com/FeLj1Ct.jpeg" alt="Data Science workspace" className="w-full h-full object-cover object-center block" style={{ filter: 'saturate(0.55) brightness(1.05)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <BarChart2 size={12} /> AI & Data
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>Data Scientist</h1>
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
            Transform raw data into strategic decisions. Data scientists are the detectives of the digital age — combining statistical rigour, programming skill, and business intuition to find the signal inside the noise.
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
            <SectionHeader icon={<Database size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Data Science" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0f9ff', borderColor: 'rgba(8,145,178,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Data Scientist</strong> sits between software engineering and domain expertise. Unlike a data analyst who mostly describes what happened, a data scientist builds models to predict what will happen — and designs the experiments to test those predictions.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Data Science could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Data Scientist workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(8,145,178,0.3)'; (e.currentTarget as HTMLElement).style.background = '#f0f9ff' }}
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Beginner → Expert</span></div>
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
              const icons = ['🐍', '🗃️', '🔍', '🤖', '🧠', '🚀']
              const accentColors = ['#0891b2', '#16a34a', '#0891b2', '#16a34a', '#0891b2', '#16a34a']
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
                        {isEven ? <polygon points="372,36 388,44 372,52" fill={accentColors[i+1] ?? accent} opacity="0.5" /> : <polygon points="28,36 12,44 28,52" fill={accentColors[i+1] ?? accent} opacity="0.5" />}
                      </svg>
                    </div>
                  )}
                </div>
              )
            })}
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.indigo} 100%)`, boxShadow: '0 8px 48px rgba(8,145,178,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>9–13 months · Consistent daily practice · Build real projects</div>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Data Science in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0f9ff', borderColor: 'rgba(8,145,178,0.2)', color: C.textMuted }}>
              AI coding tools don't replace data scientists — they <em style={{ color: C.primary }}>amplify</em> them. A DS who uses Claude to write boilerplate SQL, generate EDA code, and explain statistical concepts ships 3–5× faster than one who doesn't.
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially for senior and principal roles — can pay 2–4× these figures in USD.</p>
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
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f0f9ff', borderColor: 'rgba(8,145,178,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> Data scientists at product companies (where data drives the product) earn 30–50% more than those at service companies. Target fintech, insurtech, e-commerce, or media.
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Data Science" iconBg={C.redLight} iconColor={C.red} />
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
                Data science is one of the most rewarding career transitions you can make — but it rewards those who combine <strong style={{ color: C.primary }}>genuine curiosity</strong> with <strong style={{ color: C.primary }}>disciplined execution</strong>. The field doesn't need more people who can call <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 4, fontSize: '0.85em' }}>model.fit()</code>. It needs people who ask better questions.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                Start with the 30-day plan. Build something real. Put it on GitHub. Then do it again. The difference between someone who "tried data science" and someone who landed a job is almost always one completed project they can talk about confidently.
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open a notebook and start.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
           <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>

          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start learning today. Your future self will thank you.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}