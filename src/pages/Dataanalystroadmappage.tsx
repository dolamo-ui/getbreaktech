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
  Sparkles, TrendingUp,
  Link2, Download, Share2, Copy, CheckCheck,
  BookOpen, AlertTriangle, RefreshCw, Star, Calendar,
  Award, Target, Flame, BarChart2,
  Layers, FileText, 
  Workflow, Database, PieChart,
  Search,  Activity,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── COLORS ──────────────────────────────────────────────────────────────── */
const C = {
  bg: '#ffffff',
  bgAlt: '#f0fdfa',
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

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const CAREER_LEVELS = [
  {
    level: 'Junior', title: 'Junior Data Analyst', duration: '0–2 yrs', salary: 'R260k–R440k',
    description: 'Clean and prepare datasets, create standard reports and dashboards, run SQL queries under guidance, and support senior analysts with ad-hoc data requests and documentation.',
    skills: ['SQL', 'Excel', 'Power BI', 'Data Cleaning'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Data Analyst', duration: '2–5 yrs', salary: 'R480k–R850k',
    description: 'Own end-to-end analytics projects, design self-serve dashboards for business teams, build predictive models, and translate complex findings into actionable business insights.',
    skills: ['Python / R', 'Advanced SQL', 'Tableau', 'Statistics'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Data Analyst', duration: '5–8 yrs', salary: 'R850k–R1.4M',
    description: 'Lead analytics strategy for business units, mentor junior analysts, architect data models, design A/B experiments, and drive data-informed culture across the organisation.',
    skills: ['ML Fundamentals', 'Data Strategy', 'Mentoring', 'A/B Testing'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Principal', title: 'Principal / Head of Data', duration: '8+ yrs', salary: 'R1.4M+',
    description: 'Define enterprise data strategy, lead teams of analysts and scientists, establish data governance standards, and advise C-suite executives on analytics-driven business decisions.',
    skills: ['Data Governance', 'Team Leadership', 'Strategy', 'Executive Comms'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Excel & Spreadsheet Mastery',
    description: 'Before anything else, master Excel or Google Sheets — pivot tables, VLOOKUP/XLOOKUP, conditional formatting, and data validation. Most business data still lives in spreadsheets and this is where analysts prove immediate value to employers.',
    duration: '1–2 months', skills: ['Pivot Tables', 'VLOOKUP / XLOOKUP', 'Charts & Graphs', 'Data Validation'],
  },
  {
    step: 2, title: 'SQL & Database Fundamentals',
    description: 'SQL is the most important skill in data analytics. Learn to query relational databases, write JOINs, aggregate data with GROUP BY, use window functions, and write CTEs. SQL is used daily at every level of a data career.',
    duration: '2–3 months', skills: ['SELECT & Filtering', 'JOINs & Aggregations', 'Window Functions', 'CTEs & Subqueries'],
  },
  {
    step: 3, title: 'Python for Data Analysis',
    description: 'Python supercharges what you can do with data. Learn Pandas for data manipulation, NumPy for numerical analysis, Matplotlib and Seaborn for visualisation. Python lets you automate repetitive analysis and work with datasets too large for spreadsheets.',
    duration: '2–3 months', skills: ['Pandas', 'NumPy', 'Matplotlib / Seaborn', 'Jupyter Notebooks'],
  },
  {
    step: 4, title: 'Data Visualisation & Storytelling',
    description: 'Data only creates value when communicated effectively. Learn Tableau or Power BI to build interactive dashboards. Master the principles of data storytelling — choosing the right chart type, simplifying complexity, and structuring insights for decision-makers.',
    duration: '2 months', skills: ['Tableau / Power BI', 'Dashboard Design', 'Chart Selection', 'Storytelling'],
  },
  {
    step: 5, title: 'Statistics & Probability',
    description: 'Statistical thinking separates strong analysts from average ones. Learn descriptive statistics, hypothesis testing, probability distributions, correlation vs causation, and A/B testing methodology. These concepts underpin every rigorous analytical decision.',
    duration: '2–3 months', skills: ['Descriptive Stats', 'Hypothesis Testing', 'A/B Testing', 'Regression Basics'],
  },
  {
    step: 6, title: 'Machine Learning Fundamentals',
    description: 'Senior analysts increasingly use predictive modelling. Learn supervised learning (regression, classification), clustering, and how to use scikit-learn. You don\'t need to be a data scientist, but understanding ML opens doors to more impactful and higher-paying roles.',
    duration: '2–3 months', skills: ['Regression Models', 'Classification', 'Clustering', 'scikit-learn'],
  },
]

const HARD_SKILLS = [
  { name: 'SQL & Database Querying', level: 96 },
  { name: 'Excel / Google Sheets', level: 92 },
  { name: 'Python (Pandas, NumPy)', level: 88 },
  { name: 'Data Visualisation (Tableau / Power BI)', level: 87 },
  { name: 'Statistics & Probability', level: 82 },
  { name: 'Data Cleaning & Preparation', level: 90 },
  { name: 'A/B Testing & Experimentation', level: 76 },
  { name: 'Machine Learning Fundamentals', level: 70 },
]

const SOFT_SKILLS = [
  { name: 'Business Acumen', description: 'Understand the business context behind every data request. The best analysts ask "why do we need this?" before "how do I query this?" — because framing the right question is half the answer.' },
  { name: 'Stakeholder Communication', description: 'Translate complex statistical findings into clear business language for non-technical audiences. Executives don\'t want p-values — they want confidence and clear recommendations.' },
  { name: 'Curiosity & Intellectual Rigour', description: 'Good analysts are never satisfied with "the numbers look fine." They dig deeper, question assumptions, validate data sources, and challenge conclusions that seem too convenient.' },
  { name: 'Attention to Detail', description: 'A single misplaced formula or incorrect JOIN can cascade into millions of rand in wrong business decisions. Analysts must be meticulous, check their work twice, and document assumptions clearly.' },
  { name: 'Problem Decomposition', description: 'Break complex business questions into smaller, answerable analytical questions. This skill separates analysts who produce insights from those who produce reports.' },
  { name: 'Data Scepticism', description: 'Always question data quality, collection methodology, and potential biases in your dataset. Confident but incorrect analysis is far more dangerous than openly uncertain analysis.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Statistics / CS / Commerce Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(15,118,110,0.2)', bgColor: '#f0fdfa', typeBg: 'rgba(15,118,110,0.12)', typeColor: '#0f766e',
    pros: ['Strong statistical foundations', 'Highly valued by enterprise employers', 'Campus internship network', 'Research methodology training'],
    cons: ['Slow path to entry-level roles', 'Outdated BI tool curriculum', 'Theory-heavy, less practical', 'SQL/Python require self-study'],
  },
  {
    type: 'Bootcamp', title: 'Data Analytics Bootcamp', duration: '3–6 months', cost: 'R50k – R120k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Fast path to job-ready portfolio', 'Practical project experience', 'Career support services', 'Industry-current tooling taught'],
    cons: ['Limited statistical depth', 'Variable program quality', 'Competitive job market exit', 'Credential not universally recognised'],
  },
  {
    type: 'Self-Taught', title: 'Online Courses & Projects', duration: '9–18 months', cost: 'R0 – R5k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['World-class free resources exist', 'Fully self-paced learning', 'Build real datasets from day one', 'No tuition debt ceiling'],
    cons: ['Requires extreme self-discipline', 'Easy to skip stats fundamentals', 'Portfolio-driven job search required', 'Imposter syndrome very common'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Standup & Stakeholder Sync', desc: 'Review open data requests, align on business priorities, and clarify ambiguous analytical requirements from the team', duration: '30 min', icon: <Users size={14} /> },
  { time: '9:30', act: 'Data Extraction & Cleaning', desc: 'Write SQL queries to pull datasets, clean messy data in Python or Excel, handle nulls and outliers, validate data quality', duration: '2 hrs', icon: <Database size={14} /> },
  { time: '11:30', act: 'Exploratory Data Analysis', desc: 'Explore distributions, identify patterns, test hypotheses, and form preliminary conclusions from the cleaned dataset', duration: '1.5 hrs', icon: <Search size={14} /> },
  { time: '1:00', act: 'Lunch & Mental Reset', desc: 'Step away. Analytical work requires sustained concentration — a proper break improves the quality of afternoon insights significantly', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Dashboard & Reporting', desc: 'Build or update Tableau / Power BI dashboards, create visualisations, and prepare executive summary slides for stakeholders', duration: '1.5 hrs', icon: <PieChart size={14} /> },
  { time: '3:30', act: 'Insight Communication', desc: 'Write up analytical findings, present results to business partners, answer follow-up questions, and document methodology', duration: '1 hr', icon: <FileText size={14} /> },
  { time: '4:30', act: 'Learning & Development', desc: 'Kaggle competitions, new Python techniques, statistics deep-dives, or experimenting with new BI tool features and approaches', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'SQL Server / BigQuery', cat: 'Databases' }, { name: 'Python / Jupyter', cat: 'Analysis' },
  { name: 'Tableau / Power BI', cat: 'Dashboards' }, { name: 'Excel / Sheets', cat: 'Spreadsheets' },
  { name: 'dbt', cat: 'Data Models' }, { name: 'Looker', cat: 'BI' },
  { name: 'Git / GitHub', cat: 'Version Control' }, { name: 'Slack / Notion', cat: 'Collaboration' },
]

const WORK_ENVS = [
  { type: 'Hybrid', pct: 52 },
  { type: 'Remote', pct: 35 },
  { type: 'In-Office', pct: 13 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Assisted SQL & Code', icon: <Sparkles size={20} />,
    desc: 'LLMs like Claude and Copilot generate complex SQL queries, Python data pipelines, and statistical code from plain-English descriptions. Analysts write 50% less boilerplate and focus more time on interpretation.',
    tools: ['Claude', 'GitHub Copilot', 'ChatGPT', 'Cursor'],
    borderColor: 'rgba(15,118,110,0.18)', bgColor: '#f0fdfa', icoBg: 'rgba(15,118,110,0.12)', icoColor: '#0f766e', tagBg: 'rgba(15,118,110,0.1)', tagColor: '#0f766e', titleColor: '#0f766e',
  },
  {
    title: 'Automated Insights', icon: <Activity size={20} />,
    desc: 'Tools like Tableau Pulse, Power BI Copilot, and ThoughtSpot use AI to automatically surface anomalies, generate narrative summaries, and answer ad-hoc business questions in plain English.',
    tools: ['Tableau Pulse', 'Power BI Copilot', 'ThoughtSpot', 'Sigma AI'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'Predictive Analytics AI', icon: <TrendingUp size={20} />,
    desc: 'AutoML platforms like DataRobot and H2O.ai let analysts build predictive models without deep ML expertise. Analysts now do work that previously required data scientists, expanding their scope and value.',
    tools: ['DataRobot', 'H2O.ai', 'Google AutoML', 'Azure ML'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'dbt (Data Build Tool)', 'Cloud Data Warehouses (BigQuery, Snowflake)',
  'Python for ML (scikit-learn)', 'Real-Time Analytics Pipelines',
  'Data Mesh & Governance Principles', 'LLM-Powered Analytics (AI Queries)',
]

const PROS = [
  { title: 'Every Business Needs Data', desc: 'Finance, healthcare, e-commerce, sports, government — every sector employs data analysts. This breadth means you can choose industries you\'re passionate about and switch when you want variety.' },
  { title: 'High Impact on Business Decisions', desc: 'Your analysis directly influences strategic decisions worth millions of rand. Watching an executive pivot company strategy based on insights you produced is deeply satisfying and professionally validating.' },
  { title: 'Strong and Growing Demand', desc: 'Data literacy is now a core business competency. Demand for data analysts grew 28% in 2024 across South Africa. The pipeline of skilled analysts still doesn\'t meet business demand.' },
  { title: 'Multiple Career Branching Points', desc: 'Data analysis is a launching pad to data science, data engineering, product analytics, business intelligence, or data strategy. Few careers offer as many adjacent paths to grow into.' },
  { title: 'Intellectual Stimulation Daily', desc: 'Every dataset tells a different story. Every business question is a fresh puzzle. Analysts never solve the same problem twice, which makes the work genuinely stimulating long-term.' },
  { title: 'Remote-Friendly Career', desc: 'Data work happens in tools and code — it\'s inherently remote-compatible. 35% of data analyst roles are fully remote in South Africa, with global remote opportunities in USD paying 2–3× local rates.' },
]

const CONS = [
  { title: 'Data Quality is Often Terrible', desc: 'Up to 80% of an analyst\'s time can be spent cleaning messy, incomplete, and inconsistent data. It is unglamorous, tedious work that nobody warns you about during the career romanticisation phase.' },
  { title: 'Stakeholder Expectation Management', desc: 'Business stakeholders often want answers instantly, want them to confirm their existing beliefs, and don\'t understand why analysis takes time. Managing these expectations is ongoing emotional labour.' },
  { title: 'Ambiguous Problem Definitions', desc: 'You\'ll frequently receive vague data requests like "can you just pull some numbers on customer churn?" — which require significant back-and-forth to define properly before any analysis can begin.' },
  { title: 'Results Don\'t Always Drive Action', desc: 'You can produce a brilliant analysis that nobody acts on. When business decisions are made for political or emotional reasons despite clear data, it is frustrating and demoralising.' },
  { title: 'Constant Tool Evolution', desc: 'The analytics stack changes rapidly. New warehouses, new BI tools, new Python libraries. Staying current requires dedicated continuous learning alongside your full-time role.' },
  { title: 'Boundary with Data Science', desc: 'The line between analyst and scientist is blurry and contested. You may be asked to do data science work (ML models) on an analyst\'s salary. Know your scope and negotiate accordingly.' },
]

const VIDEOS = [
  { id: 'yZvFH7B6gKI', title: 'Data Analyst Roadmap 2025 — Complete Guide', desc: 'Full step-by-step guide to becoming a data analyst — tools, skills, resources and realistic timelines from zero to employed.', dur: '22:45', channel: 'Alex The Analyst' },
  { id: 'AXDByU3D1hA', title: 'SQL Full Course for Beginners', desc: 'Learn SQL from scratch — SELECT, WHERE, JOINs, window functions, CTEs and real-world analytical queries across a complete dataset.', dur: '4:20:00', channel: 'freeCodeCamp' },
  { id: 'r-uOLxNrNk8', title: 'Python for Data Analysis (Full Course)', desc: 'Complete Pandas and NumPy walkthrough with Matplotlib visualisations, data cleaning techniques, and real EDA projects.', dur: '5:30:00', channel: 'Data School' },
]

const TAKEAWAYS = [
  'SQL is the single most important skill — master it deeply before adding anything else to your stack',
  'Build a portfolio of 3–5 real projects on public datasets and publish your findings on GitHub',
  'Learn to tell stories with data — your job is to drive decisions, not just produce dashboards',
  'Business context matters as much as technical skill — understand the domain you\'re analysing',
  'Statistics is not optional — learn hypothesis testing, probability, and regression to avoid surface-level analysis',
]

const CAREER_FACTS = [
  {
    icon: <BarChart2 size={20} />, title: 'What You Build',
    desc: 'Interactive dashboards, automated reports, predictive models, A/B test frameworks, customer segmentation analyses, KPI tracking systems, and data-driven business recommendations.',
    color: '#0f766e',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'SQL querying, Python scripting, data cleaning, exploratory analysis, dashboard design, statistical testing, model building, and translating findings into business recommendations.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Product managers, marketing teams, finance directors, executives, data engineers, data scientists, and business stakeholders across every function of the organisation.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'Data analysts are among the most in-demand professionals globally. The World Economic Forum lists data analysis in the top 5 fastest-growing roles through 2027 with no sign of slowing.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🔍', title: 'Solve Real Business Problems', desc: 'Every day you tackle genuine business questions — why is churn increasing, which campaigns perform best, where should we expand next. The problems are real and the answers have measurable business impact.' },
  { emoji: '💰', title: 'Excellent Salary Trajectory', desc: 'Senior data analysts earn R850k–R1.4M in South Africa. Global remote roles in USD pay 2–3× that. Specialising in ML or data science from an analyst base can push compensation even higher.' },
  { emoji: '🌍', title: 'Work Across Any Industry', desc: 'Healthcare, fintech, retail, sport, government — every industry runs on data. You can follow your passion and apply analytical skills to whatever sector excites you most.' },
  { emoji: '📊', title: 'Visible & Credible Impact', desc: 'When your dashboard is viewed 500 times a day or your analysis changes a product roadmap, that impact is clear and attributable. Analytical work has a level of traceability most jobs don\'t.' },
  { emoji: '🤖', title: 'AI Amplifies Your Work', desc: 'AI tools make analysts dramatically more productive — not obsolete. SQL generation, anomaly detection, and predictive modelling are now accessible to analysts without deep ML expertise.' },
  { emoji: '🚀', title: 'Gateway to Data Science', desc: 'Data analysis is the natural on-ramp to data science, ML engineering, and analytics leadership. Build your foundation here and branch into whichever adjacent specialisation excites you.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#0f766e', bgColor: '#f0fdfa', items: [
    { name: 'Google Data Analytics Certificate (Coursera)', url: '#', type: 'Course', rating: 5 },
    { name: 'Mode Analytics SQL Tutorial (free)', url: '#', type: 'Course', rating: 5 },
    { name: 'Kaggle Learn — Data Analysis Path', url: '#', type: 'Course', rating: 5 },
    { name: 'Alex The Analyst — YouTube Bootcamp', url: '#', type: 'Course', rating: 4 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'Kaggle Competitions & Datasets', url: '#', type: 'Practice', rating: 5 },
    { name: 'Mode Analytics SQL Challenges', url: '#', type: 'Practice', rating: 5 },
    { name: 'LeetCode — Database SQL Problems', url: '#', type: 'Practice', rating: 4 },
    { name: 'Tableau Public (free visualisation)', url: '#', type: 'Tool', rating: 5 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'r/dataanalysis & r/learnpython', url: '#', type: 'Forum', rating: 4 },
    { name: 'Towards Data Science (Medium)', url: '#', type: 'Blog', rating: 5 },
    { name: 'StatQuest with Josh Starmer (YouTube)', url: '#', type: 'YouTube', rating: 5 },
    { name: 'Data Elixir Newsletter (weekly)', url: '#', type: 'Newsletter', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Data Analyst', range: 'R260k – R440k', midpoint: 350, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Data Analyst', range: 'R480k – R850k', midpoint: 665, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Data Analyst', range: 'R850k – R1.4M', midpoint: 1125, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Principal / Head of Data', range: 'R1.4M – R2.5M+', midpoint: 1950, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Jumping to Conclusions Without Validating Data',
    desc: 'Analysts who trust source data blindly produce incorrect analyses confidently. Always check for nulls, duplicates, outliers, and inconsistencies before drawing any conclusions from a dataset.',
    fix: 'Add a data validation step to every project. Run row counts, check date ranges, and verify key metrics against known benchmarks before any analysis.',
  },
  {
    num: '02', title: 'Confusing Correlation with Causation',
    desc: 'Ice cream sales and drowning rates both peak in summer — but ice cream doesn\'t cause drowning. Drawing causal conclusions from correlational data is the most common and consequential analytical error.',
    fix: 'State explicitly whether your analysis is exploratory or causal. Use A/B testing or causal inference frameworks when causality claims are required.',
  },
  {
    num: '03', title: 'Building Dashboards Before Understanding the Question',
    desc: 'Rushing to build a beautiful Tableau dashboard before clarifying what business question it needs to answer. Beautiful dashboards that answer the wrong question are worse than no dashboard at all.',
    fix: 'Always write down the exact business question in one sentence before touching any data or tool. Get stakeholder sign-off on the question before building anything.',
  },
  {
    num: '04', title: 'Ignoring Statistical Significance',
    desc: 'Reporting that "segment A has a 3% higher conversion rate than segment B" without checking if it\'s statistically significant. Small differences on small samples are often just random noise.',
    fix: 'Learn hypothesis testing basics. Always report sample sizes, p-values, and confidence intervals alongside percentage differences in analytical findings.',
  },
  {
    num: '05', title: 'Portfolio with Only Guided Tutorial Projects',
    desc: 'Submitting a portfolio of Kaggle titanic survival analyses and iris flower classifications. Every candidate does those. Employers want to see your analytical thinking on unique, real-world datasets.',
    fix: 'Find a dataset about something you genuinely care about — sport, music, your city — and build an original analysis with novel questions and published findings.',
  },
  {
    num: '06', title: 'Neglecting Business Communication Skills',
    desc: 'Producing technically rigorous analysis presented in a way that non-technical stakeholders can\'t understand or act on. Technical accuracy without clear communication creates zero business value.',
    fix: 'Practice writing executive summaries. Learn to lead with the "so what?" — the recommendation — before explaining the methodology. Present findings verbally whenever possible.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Finance / Accounting',
    ease: 'Natural Fit', easeColor: '#0f766e', easeBg: '#f0fdfa',
    desc: 'You already understand business metrics, P&L, and financial modelling in Excel. Adding SQL, Python, and BI tools transforms you into a highly valued financial data analyst with significantly higher earning potential.',
    steps: ['Master SQL for financial queries', 'Learn Python Pandas for large datasets', 'Build Power BI / Tableau skills', 'Target FP&A or FinTech analyst roles'],
  },
  {
    from: 'Marketing / Digital Marketing',
    ease: 'Very Achievable', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'You understand customer behaviour, campaign metrics, and conversion funnels. Adding SQL and analytics tools makes you a highly sought marketing analyst with the business domain knowledge most technical analysts lack.',
    steps: ['Learn SQL for marketing data', 'Master Google Analytics & Attribution', 'Build dashboards in Looker / Tableau', 'Target growth analytics or marketing analyst roles'],
  },
  {
    from: 'Psychology / Social Science',
    ease: 'Strong Foundation', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Your research methodology, statistical training (SPSS, hypothesis testing), and user behaviour understanding are genuinely valuable. Add SQL, Python, and BI tools and you\'re a compelling candidate for UX research and product analytics roles.',
    steps: ['Transfer SPSS skills to Python statsmodels', 'Learn SQL for behavioral data', 'Build visualisation skills in Tableau', 'Target UX research or product analytics roles'],
  },
  {
    from: 'Software Developer / Engineer',
    ease: 'Highly Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'You understand data structures, databases, and code. The analytical thinking and statistical reasoning are the additions needed. Your SQL and Python are already strong — focus on stats, business context, and data storytelling.',
    steps: ['Deepen SQL analytical functions', 'Learn statistics and probability', 'Master a BI tool (Tableau or Power BI)', 'Target data engineering or analytics engineering roles'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'SQL Foundations', color: '#0f766e', bg: '#f0fdfa', days: [
    { day: 'Day 1–2', task: 'Set up DB Browser for SQLite. Download a real dataset (Kaggle). Write your first SELECT, WHERE, and ORDER BY queries.' },
    { day: 'Day 3–4', task: 'SQL JOINs mastery — INNER, LEFT, RIGHT. Aggregate with GROUP BY and HAVING. Write 20 practice queries.' },
    { day: 'Day 5–6', task: 'Advanced SQL: subqueries, CTEs (WITH clauses), window functions (ROW_NUMBER, RANK, LAG/LEAD).' },
    { day: 'Day 7', task: 'Complete a Mode Analytics SQL challenge. Document solutions with explanations on GitHub. Commit your work.' },
  ]},
  { week: 'Week 2', theme: 'Python & Pandas', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Python basics: variables, lists, dictionaries, functions. Install Anaconda, open Jupyter Notebook.' },
    { day: 'Day 10–11', task: 'Pandas fundamentals — DataFrames, filtering, groupby, merge. Load and explore a CSV dataset end-to-end.' },
    { day: 'Day 12–13', task: 'Data cleaning deep-dive: handle nulls, remove duplicates, fix data types, standardise strings in a messy dataset.' },
    { day: 'Day 14', task: 'Build a complete Python EDA (Exploratory Data Analysis) notebook on a Kaggle dataset. Publish to GitHub.' },
  ]},
  { week: 'Week 3', theme: 'Visualisation & Stats', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Tableau Public (free): connect to data, build bar, line, and scatter charts. Create your first interactive dashboard.' },
    { day: 'Day 17–18', task: 'Statistics foundations: mean, median, standard deviation, distributions, correlation. Calculate these in Python.' },
    { day: 'Day 19–20', task: 'Hypothesis testing: p-values, t-tests, chi-square tests. Run a statistical test on real data and interpret results.' },
    { day: 'Day 21', task: 'Build a Tableau dashboard answering 3 real business questions. Publish to Tableau Public. Add to your portfolio.' },
  ]},
  { week: 'Week 4', theme: 'Portfolio & Apply', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Choose a dataset you genuinely find interesting. Define 5 business questions it can answer. Begin full analysis.' },
    { day: 'Day 25–26', task: 'Complete analysis: SQL queries + Python notebook + Tableau dashboard. Write an executive summary document.' },
    { day: 'Day 27–28', task: 'Polish your GitHub portfolio. Write a clear README for each project explaining the business question and methodology.' },
    { day: 'Day 29–30', task: 'Update LinkedIn with your skills and projects. Write a post sharing your Tableau dashboard. Apply to 5 junior analyst roles.' },
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
      try { await navigator.share({ title: 'Data Analyst Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Data Analyst in 2026', url: window.location.href }) }
      catch (_) {}
    } else { handleCopy() }
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-10 p-4 rounded-2xl" style={{ background: '#f0fdfa', border: `1px solid ${C.border}` }}>
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/data-analyst'}</span>
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
export default function DataAnalystRoadmapPage() {
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
            src="https://i.imgur.com/iFluVb3.jpeg"
            alt="Data Analyst workspace"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Database size={12} /> Data & Analytics
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Data Analyst
              </h1>
              <span className="block font-normal mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', color: C.textMuted }}>
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
            Turn raw data into decisions that move businesses forward. Data analysts are the translators between numbers and strategy — finding the insights hidden in datasets that drive growth, efficiency, and competitive advantage.
          </p>
          <div className="h-px mt-10" style={{ background: C.border }} />
        </div>
      </div>

      {/* ── TABLE OF CONTENTS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Data Analysis" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Data Analyst</strong> extracts meaning from data to guide business decisions. SQL for querying, Python for processing, and Tableau or Power BI for visualisation — combined with statistical reasoning and business acumen. Data analysts ask the right questions, find the hidden patterns, and communicate findings in ways that move organisations forward.
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
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={whyRef}>
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Data Analysis could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Data Analyst workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
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
                <div className="rounded-2xl p-5 mb-4 border" style={{ background: '#f0fdfa', borderColor: C.border }}>
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
                <div className="rounded-2xl p-5 border" style={{ background: '#f0fdfa', borderColor: C.border }}>
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
      <section ref={tlSectionRef} className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={tlRef}>
            <SectionHeader icon={<Clock size={22} />} title="Career Timeline" subtitle="Time estimates and salary ranges for each level" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="mb-10">
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → Principal</span></div>
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
              const icons = ['📊', '🗃️', '🐍', '📈', '🧮', '🤖']
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.indigo} 100%)`, boxShadow: '0 8px 48px rgba(15,118,110,0.25)' }}>
              <div className="text-4xl mb-3">📊</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>9–14 months · Consistent daily practice · Build and publish real analyses</div>
            </div>
          </div>
          
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={skillsRef}>
            <SectionHeader icon={<CheckCircle2 size={22} />} title="Skill Checkpoints" subtitle="Technical and interpersonal skills to develop" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl p-7 border" style={{ background: C.bg, borderColor: C.border }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.indigoLight }}><Database size={16} style={{ color: C.indigo }} /></div>
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
                  <div key={s.name} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border transition-colors cursor-default" style={{ background: '#f0fdfa', borderColor: C.border }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.primaryLight}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#f0fdfa'}>
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
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Data Analysis in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)', color: C.textMuted }}>
              AI tools like Claude and Copilot accelerate analytical work — generating SQL queries, creating Python data pipelines, and surfacing anomalies automatically. Data analysts using AI tools are 35–50% more productive while producing higher-quality insights and spending more time on strategic thinking.
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
                <div key={s} className="flex items-center gap-2.5 rounded-xl px-4 py-3.5 border" style={{ background: '#f0fdfa', borderColor: C.border }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-black text-xs" style={{ background: C.primaryLight, color: C.primary }}>{i + 1}</div>
                  <span className="text-xs font-medium" style={{ color: C.text }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROS & CONS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
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
                <div key={row.role} className="rounded-2xl p-5 border" style={{ background: '#f0fdfa', borderColor: C.border }}>
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div>
                      <span className="text-sm font-bold" style={{ color: C.text }}>{row.role}</span>
                      <span className="ml-3 text-xs font-mono" style={{ color: C.textFaint }}>{row.yoe}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: row.color }}>{row.range}</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 2400) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> Data analysts at product companies, fintech firms, and e-commerce businesses earn 25–40% more than at traditional consulting firms. Target organisations where data is core to the product, not a support function.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring analysts" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into data analysis from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Data Analysis" iconBg={C.redLight} iconColor={C.red} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {VIDEOS.map(v => (
                <div key={v.id} className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ background: '#f0fdfa', borderColor: C.border }}
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
      <section className="border-b" style={{ ...sectionStyle, background: '#f0fdfa' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={finalRef}>
            <SectionHeader icon={<Award size={22} />} title="Final Thoughts" subtitle="What we want you to take away from this guide" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 border mb-8" style={{ background: C.bg, borderColor: C.border }}>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#374151' }}>
                Data analysis is where <strong style={{ color: C.primary }}>curiosity meets consequence</strong>. It's intellectually demanding, business-critical, and immediately rewarding. Every insight you uncover, every dashboard you build, and every recommendation you make has the potential to shift how an organisation allocates resources, prioritises products, or serves its customers. That responsibility is real, and so is the satisfaction.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The path to a data analyst role isn't about collecting certifications — it's about building real analytical projects on real datasets, asking interesting questions, and showing employers that you can turn messy data into clear decisions. Start small, publish your work, and let the quality of your thinking speak for itself.
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open your SQL editor and start asking better questions of your data.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
           <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>
           
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start querying today. Your future self will thank you.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}