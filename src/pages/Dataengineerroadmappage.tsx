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
  Award, Target, Flame, Database,
  Layers, FileText, 
  Terminal, Shield,
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
  primary: '#0e7490',          // teal — data brand colour
  primaryLight: 'rgba(14,116,144,0.08)',
  primaryMid: 'rgba(14,116,144,0.15)',
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
    level: 'Junior', title: 'Junior Data Engineer', duration: '0–2 yrs', salary: 'R280k–R480k',
    description: 'Build and maintain basic ETL pipelines, write SQL queries, clean and transform datasets, and learn the data warehouse under mentorship. Understand data flow from source to sink.',
    skills: ['Python/SQL', 'ETL Pipelines', 'Data Warehousing', 'Git'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Data Engineer', duration: '2–5 yrs', salary: 'R550k–R980k',
    description: 'Design scalable data pipelines, own data modelling end-to-end, implement orchestration with Airflow, optimise Spark jobs, and manage cloud data warehouse schemas.',
    skills: ['Apache Spark', 'Airflow', 'BigQuery/Redshift', 'dbt'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Data Engineer', duration: '5–8 yrs', salary: 'R980k–R1.65M',
    description: 'Architect the data platform, define data governance and quality standards, lead streaming infrastructure with Kafka, mentor juniors, and drive reliability across the data stack.',
    skills: ['Kafka/Streaming', 'Data Governance', 'Platform Design', 'Mentoring'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'Staff / Principal Eng', duration: '8+ yrs', salary: 'R1.8M+',
    description: 'Define the data engineering vision, drive cross-team platform strategy, solve the hardest reliability and scale challenges, and shape how the company thinks about data as an asset.',
    skills: ['Data Strategy', 'Eng Leadership', 'Lakehouse Arch', 'Observability'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Programming Fundamentals — Python & SQL',
    description: 'Python is the lingua franca of data engineering. Master it: variables, functions, OOP, error handling, file I/O, and libraries like Pandas and NumPy. In parallel, learn SQL deeply — SELECT, JOIN, GROUP BY, window functions, CTEs, and subqueries. These two skills are the bedrock of every pipeline you will ever build.',
    duration: '2–3 months', skills: ['Python 3', 'SQL (Advanced)', 'Pandas / NumPy', 'Jupyter Notebooks'],
  },
  {
    step: 2, title: 'Data Warehousing & Storage Systems',
    description: 'Understand the difference between OLTP and OLAP databases. Learn cloud data warehouses — BigQuery, Snowflake, or Amazon Redshift. Study dimensional modelling: fact tables, dimension tables, star schema, and snowflake schema. These are the storage foundations every analytics platform is built on.',
    duration: '2–3 months', skills: ['BigQuery / Redshift', 'Snowflake', 'Dimensional Modelling', 'Star Schema'],
  },
  {
    step: 3, title: 'ETL Pipelines & Data Transformation',
    description: 'Build extract-transform-load pipelines from scratch. Learn dbt (data build tool) for SQL-first transformations with version control, testing, and documentation. Understand data quality patterns: null handling, deduplication, schema validation, and idempotency. Every downstream consumer depends on your pipeline reliability.',
    duration: '2–3 months', skills: ['dbt', 'ETL Design', 'Data Quality', 'Pipeline Testing'],
  },
  {
    step: 4, title: 'Orchestration & Workflow Automation',
    description: 'Production pipelines need scheduling, dependency management, failure handling, and alerting. Master Apache Airflow — DAGs, operators, sensors, and hooks. Understand pipeline idempotency, backfilling historical data, and SLA monitoring. A pipeline that runs once manually is not a pipeline.',
    duration: '1–2 months', skills: ['Apache Airflow', 'DAG Design', 'SLA Monitoring', 'Backfilling'],
  },
  {
    step: 5, title: 'Distributed Computing & Streaming',
    description: 'When your data volume exceeds a single machine, you need Spark. Learn PySpark for large-scale batch processing: RDDs, DataFrames, partitioning, and job optimisation. Then learn streaming with Apache Kafka and Spark Streaming or Flink for real-time data pipelines. This is what separates data engineers from data analysts.',
    duration: '2–3 months', skills: ['PySpark', 'Apache Kafka', 'Stream Processing', 'Job Optimisation'],
  },
  {
    step: 6, title: 'Cloud Platforms, DataOps & Architecture',
    description: 'Modern data engineering is cloud-native. Master AWS (S3, Glue, EMR, Lambda), GCP (Dataflow, Pub/Sub, BigQuery), or Azure (Data Factory, Synapse). Learn the modern data lakehouse pattern with Delta Lake or Apache Iceberg. Implement DataOps practices: CI/CD for pipelines, data lineage, and observability.',
    duration: '3–4 months', skills: ['AWS / GCP / Azure', 'Delta Lake / Iceberg', 'Data Lineage', 'DataOps / CI-CD'],
  },
]

const HARD_SKILLS = [
  { name: 'Python & SQL', level: 96 },
  { name: 'ETL / ELT Pipeline Design', level: 93 },
  { name: 'Cloud Data Warehouses', level: 90 },
  { name: 'Apache Spark (PySpark)', level: 85 },
  { name: 'dbt (Data Build Tool)', level: 82 },
  { name: 'Apache Airflow', level: 80 },
  { name: 'Apache Kafka / Streaming', level: 72 },
  { name: 'Data Lakehouse Architecture', level: 65 },
]

const SOFT_SKILLS = [
  { name: 'Data Ownership Mindset', description: 'You are accountable for data accuracy, freshness, and reliability. Downstream teams — analysts, data scientists, executives — make decisions based on your work. Own that responsibility completely.' },
  { name: 'Systems Thinking', description: 'Every pipeline change has upstream and downstream consequences. Great data engineers think across the entire data flow before touching anything — sources, consumers, and every transformation in between.' },
  { name: 'Debugging & Root Cause Analysis', description: 'Silent data corruption is worse than a loud pipeline failure. The ability to trace a bad value back through five transformations to a source system bug is a critical and rare skill.' },
  { name: 'Stakeholder Communication', description: 'Translate data engineering constraints — latency, freshness windows, sampling error — into language analysts and product managers understand. Great data engineers are trusted partners, not ticket-takers.' },
  { name: 'Documentation Discipline', description: 'Undocumented pipelines are technical debt. Data dictionaries, lineage graphs, and README files are not optional extras — they are part of the job. Future you and your colleagues will thank you.' },
  { name: 'Attention to Data Quality', description: 'A fast pipeline with bad data is worse than no pipeline. Build quality checks into every stage: schema validation, row count assertions, distribution monitoring, and anomaly detection.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Computer Science / Statistics Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(14,116,144,0.2)', bgColor: '#ecfeff', typeBg: 'rgba(14,116,144,0.12)', typeColor: '#0e7490',
    pros: ['Deep CS, algorithms, and statistics foundations', 'High credibility at large tech and finance companies', 'Access to internship pipelines and graduate programmes', 'Strong peer network of future engineers and data scientists'],
    cons: ['Slow and expensive path to first job', 'Often teaches outdated tooling (Hadoop over Spark)', 'Light on dbt, Airflow, and modern cloud platforms', 'Data warehousing and pipeline design largely self-taught'],
  },
  {
    type: 'Bootcamp', title: 'Data Engineering Bootcamp', duration: '3–6 months', cost: 'R60k – R130k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Job-ready pipeline and warehouse skills fast', 'Strong portfolio projects on exit', 'Career support and employer networks', 'Structured, cohort-based accountability'],
    cons: ['Highly variable programme quality', 'Credential not universally respected', 'Rarely covers Spark or streaming depth', 'Competitive entry into junior data market'],
  },
  {
    type: 'Self-Taught', title: 'Online Courses & Projects', duration: '12–24 months', cost: 'R0 – R8k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['World-class free content (DataTalks.Club, dbt docs)', 'Learn at your own pace and build real pipelines', 'No ceiling — learn Spark, Kafka, and cloud natively', 'Portfolio-driven: every project proves your ability'],
    cons: ['Requires exceptional self-discipline', 'Easy to develop dangerous knowledge gaps', 'No formal credential on CV', 'Imposter syndrome is real and persistent'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Pipeline Health Review', desc: 'Check Airflow dashboard for failed DAGs, review data quality alerts, investigate late-arriving partitions, and triage overnight incidents', duration: '30 min', icon: <Database size={14} /> },
  { time: '9:30', act: 'Core Pipeline Development', desc: 'Build new ELT pipelines, refactor transformation logic in dbt, optimise Spark jobs, or design new data models for upcoming analytics features', duration: '2.5 hrs', icon: <Workflow size={14} /> },
  { time: '12:00', act: 'Data Quality Investigation', desc: 'Trace data anomalies back through the lineage graph, reproduce data quality bugs in staging, and implement assertions to prevent recurrence', duration: '1 hr', icon: <Terminal size={14} /> },
  { time: '1:00', act: 'Lunch & Recovery', desc: 'Step away from the terminal. The best pipeline architectures are designed during lunch walks, not during stressful debugging sessions', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Stakeholder Sync & Documentation', desc: 'Meet with analysts to understand data needs, update the data catalogue, document schema changes, and review data model PRs', duration: '1 hr', icon: <FileText size={14} /> },
  { time: '3:00', act: 'Testing & Deployment', desc: 'Write dbt tests, run pipeline validation in staging, deploy to production via CI/CD, and monitor the first run after deployment', duration: '1.5 hrs', icon: <Shield size={14} /> },
  { time: '4:30', act: 'Learning & Exploration', desc: 'Read the dbt blog, DataTalks.Club newsletters, Databricks engineering posts, or experiment with a new Spark optimisation technique', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'dbt', cat: 'Transformation' }, { name: 'Apache Airflow', cat: 'Orchestration' },
  { name: 'PySpark', cat: 'Processing' }, { name: 'BigQuery / Snowflake', cat: 'Warehouse' },
  { name: 'Apache Kafka', cat: 'Streaming' }, { name: 'AWS / GCP', cat: 'Cloud' },
  { name: 'Delta Lake', cat: 'Lakehouse' }, { name: 'Great Expectations', cat: 'Quality' },
]

const WORK_ENVS = [
  { type: 'Remote', pct: 62 },
  { type: 'Hybrid', pct: 28 },
  { type: 'In-Office', pct: 10 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Assisted Pipeline Generation', icon: <Sparkles size={20} />,
    desc: 'GitHub Copilot and Claude generate dbt models, write Airflow DAGs, and suggest Spark optimisations. Data engineers using AI report 40–55% productivity gains on repetitive transformation and pipeline scaffolding work.',
    tools: ['GitHub Copilot', 'Claude', 'Cursor', 'SQLFluff AI'],
    borderColor: 'rgba(14,116,144,0.18)', bgColor: '#ecfeff', icoBg: 'rgba(14,116,144,0.12)', icoColor: '#0e7490', tagBg: 'rgba(14,116,144,0.1)', tagColor: '#0e7490', titleColor: '#0e7490',
  },
  {
    title: 'LLM-Powered Data Features', icon: <Zap size={20} />,
    desc: 'Data engineers who can build vector pipelines, integrate embedding models, design RAG data infrastructure, and serve LLM context at scale are in a completely different demand tier in 2026.',
    tools: ['OpenAI Embeddings', 'Pinecone', 'Weaviate', 'LangChain'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI-Powered Data Observability', icon: <TrendingUp size={20} />,
    desc: 'AI tools now detect schema drift, predict pipeline failures, surface data quality regressions, and flag anomalous distributions before stakeholders file support tickets. Learn to configure and extend these tools.',
    tools: ['Monte Carlo', 'Soda Core', 'Anomalo', 'Datafold'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'Vector Databases (Pinecone, pgvector)', 'LLM Embedding Pipelines',
  'Apache Iceberg & Delta Lake', 'Real-Time Feature Stores',
  'OpenLineage & Data Lineage', 'DataOps & Pipeline CI/CD',
]

const PROS = [
  { title: 'One of the Highest-Paying Data Roles', desc: 'Senior data engineers consistently earn more than data analysts and often match data scientists. Staff-level data platform engineers at product companies earn R1.6M–R2.5M+ in South Africa.' },
  { title: 'Remote-First by Default', desc: 'Data engineering has zero physical dependency. Over 62% of data engineering roles are fully remote globally — one of the highest rates across all technical disciplines.' },
  { title: 'Every Business Needs You', desc: 'No company can build a data-driven culture without reliable pipelines. Data engineers are the infrastructure team behind every analyst, data scientist, and executive dashboard.' },
  { title: 'Enormous and Growing Demand', desc: 'The global data engineering market grew 38% in 2024. Every company collecting data — which is every company — needs someone to move, clean, and serve it reliably.' },
  { title: 'Deep, Transferable Skills', desc: 'SQL, Python, distributed systems, and cloud infrastructure skills transfer across industries and tools. The patterns you learn building your first data lakehouse apply at every company you will ever work at.' },
  { title: 'Clear Path to Platform Architecture', desc: 'Senior Data Engineer → Staff Data Engineer → Principal / Head of Data Platform is one of the most lucrative and intellectually rich career trajectories in all of technology.' },
]

const CONS = [
  { title: 'Invisible Work When It Works', desc: 'When every pipeline runs on time and every number is correct, nobody notices. Data engineers become visible only when something breaks — and it always breaks at the worst moment.' },
  { title: 'Steep Distributed Systems Learning Curve', desc: 'Debugging a Spark job on a 100-node cluster, understanding partition skew, or tracing a Kafka consumer lag spike requires knowledge that takes years to develop.' },
  { title: 'On-Call for Data Freshness', desc: 'Executives, analysts, and product teams often need data for critical decisions. Pipeline failures at odd hours are a real part of senior data engineering life at high-traffic companies.' },
  { title: 'Constant Tool Churn', desc: 'The modern data stack evolves rapidly. Staying current with dbt, Iceberg, Flink, and new cloud-native services requires continuous investment in learning outside working hours.' },
  { title: 'Data Quality is a Shared Responsibility Nobody Owns', desc: 'Bad data from upstream systems is frequently the data engineer\'s problem to fix, even when the root cause lies in a system owned by another team. This creates endless organisational friction.' },
  { title: 'Legacy Data Tech Debt', desc: 'Most professional data platforms are messier than any tutorial. Migrating decade-old Hadoop clusters, untangling spaghetti SQL, and supporting outdated BI tools is unglamorous daily reality.' },
]

const VIDEOS = [
  { id: 'qWru-b3h1MQ', title: 'Data Engineering Full Course 2025', desc: 'A complete beginner-to-intermediate data engineering course covering Python, SQL, Airflow, Spark, and cloud warehouses from first principles.', dur: '8:32:00', channel: 'freeCodeCamp' },
  { id: 'eiPI6oGMcJQ', title: 'dbt Crash Course — Modern Data Transformation', desc: 'Build production-grade dbt models with tests, documentation, and CI/CD. The fastest way to learn the most important tool in the modern data stack.', dur: '2:14:00', channel: 'Kahan Data Solutions' },
  { id: 'lJufQLEsNHg', title: 'Apache Spark with PySpark — Complete Guide', desc: 'Master PySpark from DataFrames to performance optimisation. Learn the distributed computing skills every senior data engineer needs.', dur: '4:18:00', channel: 'DataTalks.Club' },
]

const TAKEAWAYS = [
  'SQL is never beneath you — a senior data engineer who writes elegant SQL is more valuable than one who reaches for Spark unnecessarily',
  'Every pipeline must be idempotent, observable, and tested — build these in from day one, not as an afterthought',
  'Read dbt docs, Databricks engineering blog, and Uber\'s data infrastructure posts — that is where the real knowledge lives',
  'Data quality is your responsibility even when data quality problems originate upstream — own the full chain',
  'The modern data stack changes fast: follow the tools, but master the underlying patterns that never change',
]

const CAREER_FACTS = [
  {
    icon: <Database size={20} />, title: 'What You Build',
    desc: 'ETL/ELT pipelines, data warehouses, streaming architectures, data lakes, transformation layers (dbt), orchestration workflows (Airflow), data catalogues, quality frameworks, and the entire infrastructure that powers analytics.',
    color: '#0e7490',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Pipeline design and maintenance, data modelling, schema management, query optimisation, orchestration, streaming pipeline development, data quality monitoring, and production incident response.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Data analysts consuming your pipelines, data scientists using your feature stores, analytics engineers building on your models, platform engineers managing your infrastructure, and business stakeholders who trust your numbers.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'Data engineering roles grew 38% globally in 2024. Every company with data needs reliable pipelines — which is every company. The gap between data supply and qualified data engineers continues to widen.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🗄️', title: 'You Power Every Data Decision', desc: 'Every analyst query, executive dashboard, and ML model runs on pipelines you built. If your data is wrong, every decision downstream is wrong. If it\'s right, the whole company wins.' },
  { emoji: '💰', title: 'Among the Highest Data Salaries', desc: 'Senior data engineers earn R980k–R1.65M in South Africa. Platform engineers and principal engineers at USD-paying global companies earn considerably more.' },
  { emoji: '🌍', title: 'Fully Remote is the Norm', desc: 'Over 62% of data engineering roles are fully remote. Your pipelines run in the cloud — it makes no difference whether you\'re in Johannesburg or Jakarta.' },
  { emoji: '🧩', title: 'Deep Problems, Deep Satisfaction', desc: 'Designing a pipeline that processes 10TB daily with sub-minute latency, eliminating data drift, or building a self-healing quality layer — data engineering problems are genuinely hard and deeply satisfying.' },
  { emoji: '📈', title: 'The Clearest Path to Data Platform Architect', desc: 'Senior Data Engineer → Staff Engineer → Head of Data Platform is one of the most financially rewarding trajectories in the entire technology landscape.' },
  { emoji: '🔒', title: 'Skills That Age Slowly', desc: 'SQL, Python, distributed systems, and data modelling fundamentals change slowly. The pipeline patterns you master today will still be relevant in 15 years — unlike many software engineering specialisations.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#0e7490', bgColor: '#ecfeff', items: [
    { name: 'DataTalks.Club — Free Data Engineering Zoomcamp', url: '#', type: 'Course', rating: 5 },
    { name: 'dbt Learn — Official Free Courses', url: '#', type: 'Course', rating: 5 },
    { name: 'CS50 for Python and Data (Harvard)', url: '#', type: 'Course', rating: 5 },
    { name: 'Databricks Academy — Free Spark Courses', url: '#', type: 'Course', rating: 4 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'Mode Analytics SQL School', url: '#', type: 'Practice', rating: 5 },
    { name: 'Build a data pipeline from CSV → BigQuery', url: '#', type: 'Project', rating: 5 },
    { name: 'dbt Project — Jaffle Shop Tutorial', url: '#', type: 'Project', rating: 5 },
    { name: 'roadmap.sh — Data Engineer Path', url: '#', type: 'Reference', rating: 4 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'Data Engineering Podcast (Tobias Macey)', url: '#', type: 'Podcast', rating: 5 },
    { name: 'r/dataengineering — Active Community', url: '#', type: 'Forum', rating: 5 },
    { name: 'Locally Optimistic — Data Blog', url: '#', type: 'Blog', rating: 5 },
    { name: 'Seattle Data Guy YouTube Channel', url: '#', type: 'YouTube', rating: 4 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Data Engineer', range: 'R280k – R480k', midpoint: 380, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Data Engineer', range: 'R550k – R980k', midpoint: 765, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Data Engineer', range: 'R980k – R1.65M', midpoint: 1315, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Staff / Principal Data Engineer', range: 'R1.8M – R3M+', midpoint: 2300, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Building Pipelines That Cannot Be Rerun',
    desc: 'Non-idempotent pipelines that duplicate data or fail silently on rerun are one of the most dangerous patterns in data engineering. Every pipeline must produce the same result whether it runs once or a hundred times.',
    fix: 'Design every pipeline with idempotency as a first principle. Use MERGE statements, partition overwriting, and unique constraint checks before inserting any data.',
  },
  {
    num: '02', title: 'Skipping Data Quality Tests',
    desc: 'Shipping a pipeline without data quality assertions is like shipping code without tests. Silent corruption — wrong row counts, null columns, duplicate keys — propagates through the entire analytics layer before anyone notices.',
    fix: 'Add dbt tests (not_null, unique, accepted_values) and Great Expectations checks to every model and pipeline before it reaches production.',
  },
  {
    num: '03', title: 'Using Spark When SQL Is Sufficient',
    desc: 'Many early data engineers reach for PySpark because it sounds impressive. Processing 5 GB of data with Spark when BigQuery could handle it in 10 seconds of SQL wastes cost and adds unnecessary complexity.',
    fix: 'Default to SQL in your cloud data warehouse. Only reach for Spark when data volume, custom logic, or latency requirements genuinely justify it.',
  },
  {
    num: '04', title: 'Ignoring Data Lineage and Documentation',
    desc: 'An undocumented data pipeline is a liability. Analysts will not trust numbers they cannot trace. When a column definition changes, the blast radius is invisible without lineage.',
    fix: 'Use dbt\'s built-in documentation and lineage DAG from day one. Every model must have a description and every column must be defined in schema.yml.',
  },
  {
    num: '05', title: 'Treating Data Freshness as Someone Else\'s Problem',
    desc: 'Analysts need to know when data was last updated. Dashboards showing stale data without a clear timestamp destroy trust faster than wrong data. Freshness SLAs must be explicit and monitored.',
    fix: 'Add dbt freshness tests to every source. Monitor pipeline SLAs in Airflow and alert proactively before stakeholders discover staleness themselves.',
  },
  {
    num: '06', title: 'Never Learning the Business Domain',
    desc: 'A data engineer who does not understand what the data means cannot model it correctly. Misunderstood business logic baked into transformation SQL causes company-wide analytics errors that are very hard to trace.',
    fix: 'Spend time with analysts and business stakeholders every week. Understanding the business is not optional — it is how you avoid modelling catastrophes.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Data Analyst / BI Developer',
    ease: 'Natural Fit', easeColor: '#0e7490', easeBg: '#ecfeff',
    desc: 'SQL and business domain knowledge are already in your toolkit. Add Python, pipeline orchestration (Airflow), and cloud infrastructure skills — and you become a formidable data engineer with rare business context.',
    steps: ['Deep-dive Python — automate your current SQL workflows', 'Learn dbt and build a transformation project from scratch', 'Add Airflow for orchestration and Docker for deployment', 'Target analytics engineering or data engineering roles'],
  },
  {
    from: 'Software / Backend Developer',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Programming, distributed systems thinking, and production engineering skills give you a massive head start. Add data-specific tooling — dbt, Spark, Airflow, and data modelling — and you can transition quickly.',
    steps: ['Learn advanced SQL and dimensional modelling', 'Build a dbt project on top of a cloud data warehouse', 'Study Apache Airflow and Spark fundamentals', 'Target data engineering or platform engineering roles'],
  },
  {
    from: 'Data Scientist / ML Engineer',
    ease: 'Very Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Python and statistical data intuition are already yours. Add pipeline engineering discipline — orchestration, testing, quality, and production reliability — and you can move into data engineering or ML platform roles.',
    steps: ['Master SQL beyond what data science requires', 'Learn dbt and build production-grade transformations', 'Study Airflow orchestration and streaming with Kafka', 'Target data engineering or ML infrastructure roles'],
  },
  {
    from: 'Other Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Domain expertise combined with data engineering skills is genuinely rare. A data engineer who deeply understands healthcare, finance, or logistics data commands a premium in those verticals.',
    steps: ['Start with SQL — Mode Analytics or SQLZoo', 'Build a Python ETL script on real data from your domain', 'Deploy a dbt project to BigQuery or Snowflake', 'Target companies in your previous industry'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Python & SQL Foundations', color: '#0e7490', bg: '#ecfeff', days: [
    { day: 'Day 1–2', task: 'Set up Python. Write scripts covering variables, loops, functions, file I/O, and Pandas basics. Push to GitHub.' },
    { day: 'Day 3–4', task: 'Advanced SQL: window functions, CTEs, GROUP BY, HAVING, and complex JOINs. Use Mode Analytics or SQLZoo.' },
    { day: 'Day 5–6', task: 'Python + SQL together: write a Python script that queries a SQLite database, transforms data, and writes results to a CSV.' },
    { day: 'Day 7', task: 'Git fundamentals: init, commit, branch, merge. Push your first data project to GitHub with a proper README.' },
  ]},
  { week: 'Week 2', theme: 'Pipelines & Data Modelling', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Set up a free BigQuery or Snowflake account. Load a public dataset. Write 10 analytical SQL queries against it.' },
    { day: 'Day 10–11', task: 'Install dbt and complete the Jaffle Shop tutorial. Understand models, tests, and documentation.' },
    { day: 'Day 12–13', task: 'Build your own dbt project: define 3 staging models, 2 intermediate models, and 1 mart model on your chosen dataset.' },
    { day: 'Day 14', task: 'Add dbt tests: not_null, unique, accepted_values on every model. Fix any test failures you find.' },
  ]},
  { week: 'Week 3', theme: 'Orchestration & Quality', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Install Apache Airflow with Docker Compose. Build a DAG that runs your Python ETL script on a schedule.' },
    { day: 'Day 17–18', task: 'Add a second DAG with dependencies — DAG A extracts, DAG B transforms after A succeeds. Test backfill.' },
    { day: 'Day 19–20', task: 'Add Great Expectations data quality checks to your pipeline. Assert row counts, null rates, and value ranges.' },
    { day: 'Day 21', task: 'Add email alerting to your Airflow DAG for failures. Document your pipeline in a README with a lineage diagram.' },
  ]},
  { week: 'Week 4', theme: 'Cloud, Deploy & Ship', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Dockerise your entire stack (Python extractor + dbt + Airflow). Write a docker-compose.yml that spins everything up.' },
    { day: 'Day 25–26', task: 'Set up GitHub Actions: run dbt tests on every PR, run Python linting, and fail the pipeline on quality check failures.' },
    { day: 'Day 27–28', task: 'Deploy to a cloud environment (Railway, GCP Cloud Run, or AWS Lambda). Run your pipeline in a real cloud environment.' },
    { day: 'Day 29–30', task: 'Share your project on LinkedIn with a screenshot of the Airflow DAG and dbt lineage graph. Apply to 5 junior data engineering roles.' },
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
      try { await navigator.share({ title: 'Data Engineer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Data Engineer in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/data-engineer'}</span>
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
export default function DataEngineerRoadmapPage() {
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
            src="https://i.imgur.com/DKHrPLu.jpeg"
            alt="Data Engineer data pipelines and analytics"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Database size={12} /> Data & Analytics Engineering
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Data Engineer
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
            Build the pipelines that power every data decision. Data engineers design the infrastructure that moves, transforms, and serves data reliably — invisible to the world, indispensable to every analyst, scientist, and executive who depends on it.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Data Engineering" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#ecfeff', borderColor: 'rgba(14,116,144,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Data Engineer</strong> architects the systems that collect, transform, store, and serve data reliably at scale. While analysts and data scientists get the visibility, data engineers build the invisible infrastructure they depend on. Every dashboard that loads, every ML model that trains, every business decision made from data — it all runs on pipelines data engineers designed and maintain.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Data Engineering could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Data Engineer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(14,116,144,0.3)'; (e.currentTarget as HTMLElement).style.background = '#ecfeff' }}
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → Staff Engineer</span></div>
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
              const icons = ['🐍', '🗄️', '🔄', '⏰', '⚡', '☁️']
              const accentColors = ['#0e7490', '#16a34a', '#0e7490', '#16a34a', '#0e7490', '#16a34a']
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.indigo} 100%)`, boxShadow: '0 8px 48px rgba(14,116,144,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>10–14 months · Consistent daily practice · Build and ship real pipelines</div>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Data Engineering in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#ecfeff', borderColor: 'rgba(14,116,144,0.2)', color: C.textMuted }}>
              AI tools don't replace data engineers — they <em style={{ color: C.primary }}>amplify</em> them. Engineers who integrate Copilot and Claude into their workflow generate dbt models, write Airflow DAGs, and debug pipeline failures significantly faster — freeing time for architecture and data modelling.
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
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 3200) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#ecfeff', borderColor: 'rgba(14,116,144,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> Data engineers at product-led companies (fintech, SaaS, e-commerce) earn 30–50% more than those at agencies. Target companies where data is a competitive moat, not just a reporting function.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring data engineers" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into data engineering from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Data Engineering" iconBg={C.redLight} iconColor={C.red} />
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
                Data engineering is the discipline that <strong style={{ color: C.primary }}>makes data-driven decisions possible</strong>. Every successful company with a data culture — every startup that scaled its analytics, every product that personalised to millions — was built on the work of data engineers who designed reliable pipelines, modelled data correctly, and kept the numbers trustworthy.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The path is demanding, but the fundamentals you build early compound for decades. An engineer who deeply understands SQL, distributed computing, and data modelling never stops being valuable — regardless of which tool is fashionable that year.
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open your terminal and write your first pipeline.
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