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
  Layers, FileText, Globe, 
  Terminal,
  Brain, FlaskConical,
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
  primary: '#6d28d9',          // deep violet — AI/research brand colour
  primaryLight: 'rgba(109,40,217,0.08)',
  primaryMid: 'rgba(109,40,217,0.15)',
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
    level: 'Junior', title: 'Research Intern / Jr. Researcher', duration: '0–2 yrs', salary: 'R280k–R500k',
    description: 'Replicate published papers, assist with data collection and cleaning, run experiments under supervision, and contribute to literature reviews. Learn to use PyTorch, JAX, and research computing clusters.',
    skills: ['Python / PyTorch', 'Math Fundamentals', 'Paper Reading', 'Git + LaTeX'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'AI / ML Researcher', duration: '2–5 yrs', salary: 'R700k–R1.2M',
    description: 'Design and run independent experiments, publish papers to NeurIPS / ICML / ICLR, fine-tune and evaluate large models, collaborate cross-functionally with engineering to productionise findings.',
    skills: ['Research Design', 'LLM Fine-tuning', 'Experiment Tracking', 'Paper Writing'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior AI Researcher', duration: '5–8 yrs', salary: 'R1.2M–R2.2M',
    description: 'Define research agendas, mentor junior researchers, lead multi-month projects, publish at top-tier venues, and influence product and model strategy at the organisational level.',
    skills: ['Research Leadership', 'Alignment / Safety', 'Architecture Design', 'Mentoring'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'Principal / Research Director', duration: '8+ yrs', salary: 'R3M+',
    description: 'Set the long-term research vision for an organisation, represent the company at academic conferences, recruit world-class talent, and drive breakthroughs that define the state of the art.',
    skills: ['Research Vision', 'Team Building', 'Grant Writing', 'Industry Leadership'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Mathematics & Statistics Foundations',
    description: 'AI research is built on math. Master linear algebra (matrix operations, eigenvalues, SVD), calculus (gradients, chain rule, optimisation), probability theory, and statistics. These are not optional prerequisites — they are the language of every paper you will ever read or write.',
    duration: '3–4 months', skills: ['Linear Algebra', 'Calculus & Optimisation', 'Probability Theory', 'Statistics'],
  },
  {
    step: 2, title: 'Machine Learning Fundamentals',
    description: 'Understand the building blocks: supervised, unsupervised, and reinforcement learning. Implement gradient descent, backpropagation, regularisation, and evaluation metrics from scratch. Andrej Karpathy\'s micrograd is the single best exercise for cementing these concepts.',
    duration: '2–3 months', skills: ['Supervised / Unsupervised', 'Backpropagation', 'Loss Functions', 'Evaluation Metrics'],
  },
  {
    step: 3, title: 'Deep Learning — Architectures & Frameworks',
    description: 'Master the transformer architecture end-to-end — attention mechanisms, positional encodings, layer normalisation, and scaling laws. Learn CNNs, RNNs, and diffusion models. Implement everything in PyTorch. Study the original papers: Attention Is All You Need, GPT-3, BERT, DALL-E.',
    duration: '3–4 months', skills: ['Transformers', 'CNNs / Diffusion', 'PyTorch / JAX', 'Paper Implementation'],
  },
  {
    step: 4, title: 'Research Methods & Scientific Writing',
    description: 'Learn to read 3–5 papers per week efficiently. Understand experimental design, ablation studies, statistical significance, and reproducibility. Practice writing clearly: results sections, limitations, related work. Contribute to open-source replication projects to build credibility.',
    duration: '2–3 months', skills: ['Paper Reading', 'Ablation Studies', 'LaTeX / Writing', 'Reproducibility'],
  },
  {
    step: 5, title: 'Specialisation — Choose Your Research Area',
    description: 'AI research is vast. Pick a lane: NLP and language models, computer vision, reinforcement learning, AI safety and alignment, multimodal systems, or AI for science. Deep specialisation in one area makes you a real research contributor. Go deep, not wide, at this stage.',
    duration: '3–6 months', skills: ['NLP / LLMs', 'Computer Vision', 'RL / RLHF', 'AI Safety'],
  },
  {
    step: 6, title: 'Publishing, Collaboration & Research Identity',
    description: 'Submit to workshops at NeurIPS, ICML, ICLR, or ACL as your first papers. Use arXiv to share preprints. Build a research identity on Twitter/X and through a personal site. Collaborate with academic labs via research internships at DeepMind, Anthropic, OpenAI, Google Brain, or university labs.',
    duration: '6–12 months', skills: ['Paper Submission', 'arXiv / Preprints', 'Research Internships', 'Community Building'],
  },
]

const HARD_SKILLS = [
  { name: 'Python (NumPy / PyTorch / JAX)', level: 95 },
  { name: 'Deep Learning & Neural Networks', level: 93 },
  { name: 'Transformer Architecture & LLMs', level: 90 },
  { name: 'Mathematical Modelling', level: 88 },
  { name: 'Experiment Design & Statistics', level: 85 },
  { name: 'Reinforcement Learning', level: 72 },
  { name: 'Distributed Training (GPU Clusters)', level: 68 },
  { name: 'Scientific Writing & Publishing', level: 80 },
]

const SOFT_SKILLS = [
  { name: 'Intellectual Curiosity & Persistence', description: 'Most experiments fail. Researchers who succeed are driven by deep curiosity and the resilience to treat negative results as information, not defeat. The best discoveries come from asking questions others dismissed.' },
  { name: 'First-Principles Thinking', description: 'Strip problems to their mathematical core. Great AI researchers don\'t accept "this is how it\'s done" — they re-derive results from scratch and often find better approaches in doing so.' },
  { name: 'Critical Paper Reading', description: 'The ability to identify flawed methodology, cherry-picked benchmarks, and overstated claims in published research separates competent researchers from exceptional ones. Healthy scepticism is a skill.' },
  { name: 'Collaborative Research Mindset', description: 'The biggest breakthroughs in AI come from teams. The ability to clearly communicate your ideas, build on others\' work generously, and share credit honestly defines great research culture.' },
  { name: 'Clear Scientific Writing', description: 'If you can\'t write your idea down precisely, you probably don\'t understand it yet. Clarity in writing forces clarity in thinking — and it\'s what gets papers accepted and ideas adopted.' },
  { name: 'Long-Term Research Vision', description: 'Research that matters takes years. The ability to maintain direction over a long research arc — iterating without losing the plot — distinguishes research leaders from researchers who produce isolated papers.' },
]

const EDU_PATHS = [
  {
    type: 'PhD', title: 'PhD in CS / AI / Statistics', duration: '4–6 years', cost: 'Often Funded',
    borderColor: 'rgba(109,40,217,0.2)', bgColor: '#f5f3ff', typeBg: 'rgba(109,40,217,0.12)', typeColor: '#6d28d9',
    pros: ['Gold-standard credential for research roles at top labs', 'Deep, structured expertise in a specialisation', 'Publication record and academic network', 'Access to research computing infrastructure and mentors'],
    cons: ['Very long time-to-first-job (4–6 years)', 'Stipend income during PhD years is low', 'Topic can feel narrow and disconnected from industry', 'Not required for applied ML research roles at many companies'],
  },
  {
    type: "Master's", title: "Master's Degree in AI / ML", duration: '1–2 years', cost: 'R120k – R400k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Solid credential for applied research and ML engineering', 'Faster path to industry than a PhD', 'Deep enough to publish or contribute to research teams', 'Strong alumni networks at top universities'],
    cons: ['Not always sufficient for pure research scientist roles', 'Can be very expensive without funding', 'Less research independence than a PhD', 'Quality varies enormously by institution and supervisor'],
  },
  {
    type: 'Self-Directed', title: 'Online Courses + Independent Research', duration: '18–36 months', cost: 'R0 – R15k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['Fast Lane (courses exist): fast.ai, deeplearning.ai, Stanford CS231n are world-class', 'ArXiv, Papers With Code, and Hugging Face give full access to the frontier', 'Independent preprints and open-source contributions build real credibility', 'Many research engineers at top labs are self-directed learners'],
    cons: ['No formal credential — harder to get into top academic labs', 'Requires elite self-discipline and structured independent research', 'No supervisor to guide research direction or catch mistakes', 'Networking is harder without institutional affiliation'],
  },
]

const SCHEDULE = [
  { time: '8:00', act: 'Paper Reading & Morning Literature Review', desc: 'Read 1–2 recent arXiv papers in your area. Take structured notes. This daily habit compounds into genuine field expertise over months.', duration: '1 hr', icon: <BookOpen size={14} /> },
  { time: '9:00', act: 'Experiment Running & Analysis', desc: 'The core of the research day — running ablations, analysing loss curves, debugging training, and interpreting results. Protect this block fiercely from meetings.', duration: '3 hrs', icon: <FlaskConical size={14} /> },
  { time: '12:00', act: 'Research Discussions & Team Sync', desc: 'Weekly or daily research syncs with collaborators. Present results, discuss ideas, review each other\'s experiment logs and draft papers.', duration: '1 hr', icon: <Users size={14} /> },
  { time: '1:00', act: 'Lunch & Mental Recovery', desc: 'Research requires deep concentration. A genuine break — away from screens — replenishes the cognitive resources that creative thinking demands.', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Writing & Paper Drafting', desc: 'Write every day, even a paragraph. Draft sections, refine the narrative of your results, update related work, or sharpen your abstract. Writing clarifies thinking.', duration: '1.5 hrs', icon: <FileText size={14} /> },
  { time: '3:30', act: 'Implementation & Codebase Work', desc: 'Implement new architectural ideas, write cleaner training scripts, add evaluation harnesses, and maintain experiment tracking with W&B or MLflow.', duration: '1.5 hrs', icon: <Terminal size={14} /> },
  { time: '5:00', act: 'Community & Career Development', desc: 'Follow Twitter/X research accounts, engage with the research community, update your personal site, or review open PhD / internship opportunities.', duration: '30 min', icon: <Globe size={14} /> },
]

const TOOLS = [
  { name: 'PyTorch / JAX', cat: 'Frameworks' }, { name: 'Weights & Biases', cat: 'Experiment Tracking' },
  { name: 'Hugging Face', cat: 'Models / Data' }, { name: 'CUDA / A100s', cat: 'Compute' },
  { name: 'Jupyter / Colab', cat: 'Notebooks' }, { name: 'arXiv / Semantic Scholar', cat: 'Literature' },
  { name: 'Overleaf / LaTeX', cat: 'Writing' }, { name: 'GitHub / DVC', cat: 'Version Control' },
]

const WORK_ENVS = [
  { type: 'Remote / Hybrid', pct: 62 },
  { type: 'Lab / Office', pct: 30 },
  { type: 'Field / Conference', pct: 8 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Assisted Research & Hypothesis Generation', icon: <Sparkles size={20} />,
    desc: 'Researchers now use LLMs to summarise hundreds of papers, surface related work, generate experimental hypotheses, and identify gaps in the literature. AI assistants are accelerating the literature review phase by 60–80%.',
    tools: ['Semantic Scholar', 'Elicit', 'Claude', 'Perplexity'],
    borderColor: 'rgba(109,40,217,0.18)', bgColor: '#f5f3ff', icoBg: 'rgba(109,40,217,0.12)', icoColor: '#6d28d9', tagBg: 'rgba(109,40,217,0.1)', tagColor: '#6d28d9', titleColor: '#6d28d9',
  },
  {
    title: 'Foundation Model Research & Fine-tuning', icon: <Zap size={20} />,
    desc: 'The frontier of AI research is increasingly about fine-tuning, alignment, and interpretability of large foundation models. Researchers who understand RLHF, constitutional AI, and sparse autoencoders are operating at the edge of the field.',
    tools: ['Hugging Face', 'LLaMA / Mistral', 'LoRA / QLoRA', 'RLHF Frameworks'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'Automated ML & Neural Architecture Search', icon: <TrendingUp size={20} />,
    desc: 'AI is now helping design AI: neural architecture search, hyperparameter optimisation, and automated data augmentation are reducing the manual experiment burden. Researchers using these tools publish faster and find better configurations.',
    tools: ['Optuna', 'Ray Tune', 'AutoML', 'NAS Frameworks'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'Mechanistic Interpretability & Circuit Analysis', 'Constitutional AI & RLHF',
  'Multimodal Models (Vision-Language)', 'Sparse Autoencoders for LLM Internals',
  'AI for Science (Biology / Chemistry)', 'Agent Architectures & Tool Use',
]

const PROS = [
  { title: 'You Work at the Frontier of Human Knowledge', desc: 'AI researchers are solving problems nobody has solved before. The problems are genuinely hard, the discoveries are novel, and the impact on civilisation is measurable and growing.' },
  { title: 'The Highest Compensation in Tech', desc: 'Top AI researchers at Anthropic, OpenAI, DeepMind, and Google Brain command R3M–R15M+ equivalent total compensation globally. AI research talent has never been more valued.' },
  { title: 'Remote and Globally Mobile', desc: 'The top AI research labs — Anthropic, DeepMind, FAIR, OpenAI — hire globally and support remote researchers. A strong publication record is a passport that works anywhere.' },
  { title: 'Massive Societal Impact', desc: 'The systems AI researchers design today will transform medicine, scientific discovery, education, and economic productivity over the next decade. Few careers offer comparable civilisational leverage.' },
  { title: 'Exceptional Intellectual Community', desc: 'The AI research community — through arXiv, NeurIPS, Twitter, and research internships — is one of the most intellectually generous and collaborative in any field. Ideas spread fast and attribution norms are strong.' },
  { title: 'Compounding Research Capital', desc: 'A strong publication record, citation count, and research network compound over a career in a way few other assets do. Senior researchers with strong reputations have near-permanent demand.' },
]

const CONS = [
  { title: 'Extreme Competition for Top Roles', desc: 'Research scientist positions at Anthropic, DeepMind, and OpenAI receive thousands of applications. Without publications at top venues (NeurIPS, ICML, ICLR), it is extremely difficult to break into frontier research labs.' },
  { title: 'Most Experiments Fail', desc: 'Research is a negative results business. 90%+ of experiments don\'t produce publishable findings. The emotional tolerance for prolonged uncertainty and failure is the single hardest requirement of the role.' },
  { title: 'Long Time Horizon to Credibility', desc: 'A PhD takes 4–6 years. Building a meaningful publication record takes years beyond that. There are few shortcuts to becoming a credible independent researcher — it is a long-term investment.' },
  { title: 'Compute Bottleneck', desc: 'Frontier research increasingly requires hundreds of thousands of GPU-hours. Without affiliation with a well-resourced lab, university, or cloud credit programme, certain research directions are simply inaccessible.' },
  { title: 'Rapid Obsolescence of Results', desc: 'The field moves so fast that a paper can be superseded before it is even published. Staying current requires reading multiple new papers every week, indefinitely, with no endpoint.' },
  { title: 'Ethical and Safety Complexity', desc: 'Building systems that could cause significant harm at scale requires researchers to carry genuine moral responsibility. AI safety, misuse prevention, and bias mitigation are not optional considerations.' },
]

const VIDEOS = [
  { id: 'aircAruvnKk', title: 'Neural Networks: Zero to Hero — Karpathy', desc: 'Andrej Karpathy builds neural networks from scratch in Python — the best deep learning education ever recorded. Essential viewing for every serious AI researcher.', dur: '1:55:32', channel: 'Andrej Karpathy' },
  { id: 'wjZofJX0v4M', title: 'How Large Language Models Actually Work', desc: 'A visually stunning technical explainer of transformer architecture, attention mechanisms, and how GPT-style models are trained and scaled.', dur: '27:14', channel: '3Blue1Brown' },
  { id: 'pTr1uLQTJNE', title: 'How to Read AI Research Papers Effectively', desc: 'A senior AI researcher explains the structured approach to reading and critically evaluating papers — a foundational skill for every aspiring AI researcher.', dur: '18:45', channel: 'Yannic Kilcher' },
]

const TAKEAWAYS = [
  'Implement every paper you read — understanding comes from building, not reading alone',
  'Publish early and often, even to workshops — a preprint on arXiv is infinitely better than a perfect paper that does not exist yet',
  'Your research identity is defined by the questions you ask, not the answers you find — develop genuine intellectual obsessions',
  'Negative results are not failure — they are data. Document them, share them, and build on them.',
  'Find a research community early — Twitter/X, Discord research servers, and paper reading groups will shape your thinking more than any course',
]

/* ─── NEW SECTIONS ────────────────────────────────────────────────────────── */

const CAREER_FACTS = [
  {
    icon: <Brain size={20} />, title: 'What You Build',
    desc: 'Novel AI architectures, training algorithms, evaluation benchmarks, safety techniques, theoretical proofs, datasets, and the published research that advances the state of the art and shapes how the entire industry builds AI systems.',
    color: '#6d28d9',
  },
  {
    icon: <FlaskConical size={20} />, title: 'Core Activities',
    desc: 'Designing experiments, implementing and training models, analysing results, writing papers, presenting at conferences, reviewing others\' papers, and collaborating with engineering teams to translate research into products.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Fellow researchers in your lab, ML engineers who productionise your findings, data scientists sourcing training data, product teams defining research priorities, and the global research community through papers and conferences.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'Demand for qualified AI researchers has grown 650% since 2019 and shows no sign of slowing. Every major technology company, hundreds of startups, and national governments are aggressively competing for research talent.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🧠', title: 'You Define What AI Becomes', desc: 'AI researchers are not observers of a technological revolution — they are its architects. The alignment techniques, architectures, and safety methods you develop will determine how the most powerful technology in history is built.' },
  { emoji: '💰', title: 'The Highest Salaries in Technology', desc: 'Senior AI researchers at frontier labs command R3M–R15M+ equivalent globally. The supply-demand gap for deep research expertise has never been wider, and compensation reflects that scarcity.' },
  { emoji: '🌍', title: 'Location-Independent with Global Reach', desc: 'A strong publication record at NeurIPS or ICML is a credential recognised instantly anywhere in the world. The top research labs actively recruit globally and support distributed research teams.' },
  { emoji: '🔬', title: 'Genuine Intellectual Challenge', desc: 'AI research problems are genuinely unsolved. You are not implementing known solutions — you are designing experiments to answer questions nobody has answered. The work is intellectually demanding in a way few careers match.' },
  { emoji: '📈', title: 'A Career that Gets More Valuable Over Time', desc: 'A strong citation record, publication list, and research reputation compound over decades. Senior AI researchers with track records at top venues have career capital that grows, not decays.' },
  { emoji: '⚡', title: 'The Fastest-Moving Field in Science', desc: 'AI research moves faster than any academic discipline in history. Papers published 18 months ago can already be outdated. If you love being at the frontier of knowledge where things change weekly, there is no better place.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#6d28d9', bgColor: '#f5f3ff', items: [
    { name: 'fast.ai — Practical Deep Learning (free)', url: '#', type: 'Course', rating: 5 },
    { name: "Stanford CS231n — CNN for Visual Recognition", url: '#', type: 'Course', rating: 5 },
    { name: 'deeplearning.ai — Deep Learning Specialisation', url: '#', type: 'Course', rating: 5 },
    { name: 'Karpathy: Neural Networks Zero to Hero', url: '#', type: 'YouTube', rating: 5 },
  ]},
  { category: 'Research', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'arXiv.org — CS.LG / CS.AI sections', url: '#', type: 'Papers', rating: 5 },
    { name: 'Papers With Code — benchmarks + code', url: '#', type: 'Reference', rating: 5 },
    { name: 'Distill.pub — visual ML explanations', url: '#', type: 'Blog', rating: 5 },
    { name: 'Connected Papers — literature mapping', url: '#', type: 'Tool', rating: 4 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'Yannic Kilcher — paper walkthroughs', url: '#', type: 'YouTube', rating: 5 },
    { name: 'ML Twitter / X Research Community', url: '#', type: 'Community', rating: 5 },
    { name: 'The Gradient — AI research publication', url: '#', type: 'Blog', rating: 5 },
    { name: 'Alignment Forum — safety research', url: '#', type: 'Forum', rating: 4 },
  ]},
]

const SALARY_DATA = [
  { role: 'Research Intern / Junior Researcher', range: 'R280k – R500k', midpoint: 390, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'AI / ML Researcher', range: 'R700k – R1.2M', midpoint: 950, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior AI Researcher', range: 'R1.2M – R2.2M', midpoint: 1700, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Principal / Research Director', range: 'R3M – R6M+', midpoint: 4000, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Reading Papers Without Implementing Them',
    desc: 'Reading research is not the same as understanding it. Researchers who only read — and never implement — accumulate a false sense of expertise. The bugs you encounter when coding a paper reveal the depth of your actual understanding.',
    fix: 'For every paper you read deeply, spend 2–4 hours reproducing the core result in PyTorch. Use Papers With Code to find reference implementations to check against.',
  },
  {
    num: '02', title: 'Skipping the Mathematical Foundations',
    desc: 'Using frameworks like PyTorch without understanding the underlying linear algebra, calculus, and probability theory creates a ceiling. You can reproduce existing results but cannot innovate or debug novel architectures.',
    fix: '3Blue1Brown\'s Essence of Linear Algebra and Gilbert Strang\'s MIT 18.06 course are the most efficient paths to genuine mathematical fluency.',
  },
  {
    num: '03', title: 'Trying to Follow Every Paper in the Field',
    desc: 'The volume of arXiv submissions has made it impossible to track everything. Researchers who try to read everything end up deep in none of it — scattered, anxious, and without the genuine depth the field requires.',
    fix: 'Pick one primary research area. Follow the 20 most influential researchers in that area closely. Read everything else at a headline level only.',
  },
  {
    num: '04', title: 'Never Publishing or Sharing Work',
    desc: 'Brilliant research that exists only in a private GitHub repository does not exist. The academic career in AI is built on citations, peer review feedback, and community recognition — none of which happen without submission.',
    fix: 'Submit to workshops before conferences. Put preprints on arXiv. Share experimental findings on Twitter. Imperfect published work beats perfect unpublished work every time.',
  },
  {
    num: '05', title: 'Ignoring AI Safety and Ethics',
    desc: 'Researchers who see safety as someone else\'s problem are building systems in an ethical vacuum. Top labs increasingly require researchers to engage with safety, robustness, fairness, and misuse questions as first-class research concerns.',
    fix: 'Read the Anthropic model card, DeepMind\'s safety papers, and the AI Alignment Forum. Integrate safety considerations into your experimental design from the start.',
  },
  {
    num: '06', title: 'Working in Isolation',
    desc: 'Solo researchers rarely produce the breakthroughs that collaborative teams do. The most cited papers in deep learning all have multiple authors from diverse backgrounds. Isolation limits the quality of ideas you are exposed to.',
    fix: 'Join a research reading group. Collaborate with one other researcher on a project. Find a research mentor — even informally via Twitter/X cold outreach.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Software Engineer',
    ease: 'Natural Fit', easeColor: '#6d28d9', easeBg: '#f5f3ff',
    desc: 'Strong coding and system thinking skills are a genuine asset in AI research. Add mathematical foundations and deep learning — and you become an ML research engineer capable of bridging research and production, a combination labs desperately need.',
    steps: ['Complete fast.ai or deeplearning.ai Specialisation', 'Implement 5 landmark papers in PyTorch from scratch', 'Contribute to open-source ML projects on GitHub', 'Target ML Research Engineer or Applied Researcher roles'],
  },
  {
    from: 'Data Scientist',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Statistical modelling, experimentation, and Python are already in your toolkit. Deepen your neural network knowledge, add paper-reading and writing skills, and transition into applied or research-adjacent AI roles at tech companies.',
    steps: ['Deepen neural network and transformer understanding', 'Replicate 3 recent arXiv papers in your domain', 'Write up findings as a blog post or preprint', 'Target research scientist or applied scientist roles'],
  },
  {
    from: 'Academic Researcher (Other Field)',
    ease: 'Very Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'PhD-level scientific thinking, experimental rigour, and paper writing are directly transferable. AI for Science is an exploding field — researchers from biology, chemistry, physics, and neuroscience are extraordinarily valuable.',
    steps: ['Learn Python and PyTorch through fast.ai', 'Identify where AI intersects your domain (AlphaFold, etc.)', 'Write a paper applying ML to a problem in your field', 'Target AI for Science roles at DeepMind, Isomorphic Labs, etc.'],
  },
  {
    from: 'Maths / Physics Graduate',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Mathematical maturity is the hardest thing to teach and the thing you already have. Add coding proficiency and deep learning knowledge, and you have the rare combination that top research labs recruit most aggressively.',
    steps: ['Learn Python and implement ML algorithms from scratch', 'Work through CS231n and Karpathy\'s Zero to Hero series', 'Write a small research paper on a theoretical ML question', 'Apply to PhD programmes or research internships at top labs'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Mathematical Foundations', color: '#6d28d9', bg: '#f5f3ff', days: [
    { day: 'Day 1–2', task: 'Complete 3Blue1Brown\'s Essence of Linear Algebra series. Take hand-written notes. Reproduce the key operations in NumPy.' },
    { day: 'Day 3–4', task: 'Review calculus fundamentals: gradients, chain rule, partial derivatives. Implement gradient descent by hand on a simple loss function.' },
    { day: 'Day 5–6', task: 'Work through probability basics: Bayes\' theorem, Gaussian distributions, expectation. Implement a Naive Bayes classifier from scratch.' },
    { day: 'Day 7', task: 'Implement backpropagation manually using only NumPy, following Karpathy\'s micrograd tutorial. Push to GitHub.' },
  ]},
  { week: 'Week 2', theme: 'Deep Learning Basics', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Set up PyTorch. Implement a basic MLP, train on MNIST, track loss and accuracy. Understand the training loop end-to-end.' },
    { day: 'Day 10–11', task: 'Implement a CNN from scratch. Train on CIFAR-10. Experiment with architecture changes and observe their effect on accuracy.' },
    { day: 'Day 12–13', task: 'Read the original Attention Is All You Need paper. Implement a minimal transformer in PyTorch following a reference guide.' },
    { day: 'Day 14', task: 'Set up Weights & Biases. Re-run your experiments with proper experiment tracking. Document your findings in a research log.' },
  ]},
  { week: 'Week 3', theme: 'Paper Reading & Research Methods', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Read 3 seminal papers: GPT-3, BERT, and DALL-E. Use the structured note-taking method: hypothesis, method, results, limitations, future work.' },
    { day: 'Day 17–18', task: 'Pick one paper and fully reproduce its key experiment. Compare your results to the reported numbers. Document discrepancies.' },
    { day: 'Day 19–20', task: 'Learn LaTeX in Overleaf. Write a 2-page technical summary of your reproduction experiment in proper academic format.' },
    { day: 'Day 21', task: 'Design a small ablation study: vary one component of your implementation and measure the effect. Write up results clearly.' },
  ]},
  { week: 'Week 4', theme: 'Publish & Connect', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Polish your reproduction experiment into a short technical report or blog post. Publish on Medium, your personal site, or Substack.' },
    { day: 'Day 25–26', task: 'Create an arXiv account. Learn the submission process. Identify 3 workshops at upcoming NeurIPS or ICML where you could submit.' },
    { day: 'Day 27–28', task: 'Join 2 research communities online: a ML Discord server, a paper reading group, or follow 20 AI researchers on Twitter/X. Engage genuinely.' },
    { day: 'Day 29–30', task: 'Write a research question you want to investigate over the next 3 months. Identify 5 related papers. Apply to 3 research internships or open PhD positions.' },
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
      try { await navigator.share({ title: 'AI Researcher Career Roadmap 2026', text: 'Complete step-by-step roadmap to become an AI Researcher in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/ai-researcher'}</span>
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
export default function AIResearcherRoadmapPage() {
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
            src="https://i.imgur.com/XbkNPs6.jpeg"
            alt="AI Researcher working with neural network visualisations"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Brain size={12} /> AI Research & Machine Learning
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                AI Researcher
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
            Push the boundaries of what machines can do. AI researchers design the architectures, algorithms, and training methods that define the frontier — invisible to most, indispensable to everything that calls itself artificial intelligence.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of AI Research" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f5f3ff', borderColor: 'rgba(109,40,217,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                An <strong style={{ color: C.primary }}>AI Researcher</strong> advances the science of artificial intelligence. While product engineers build on existing models, researchers push the frontier itself — designing novel architectures, training algorithms, safety techniques, and evaluation methods. Their work appears first on arXiv and at conferences like NeurIPS, ICML, and ICLR, and then shapes every AI product built for years afterward.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons AI Research could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical AI Researcher workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(109,40,217,0.3)'; (e.currentTarget as HTMLElement).style.background = '#f5f3ff' }}
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Intern → Research Director</span></div>
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
              const icons = ['📐', '🤖', '🔮', '📄', '🎯', '🏆']
              const accentColors = ['#6d28d9', '#16a34a', '#6d28d9', '#16a34a', '#6d28d9', '#16a34a']
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.indigo} 100%)`, boxShadow: '0 8px 48px rgba(109,40,217,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>PUBLISHED RESEARCHER IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>12–18 months · Daily paper reading + implementation · Build and publish real research</div>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI tools are transforming AI Research itself in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f5f3ff', borderColor: 'rgba(109,40,217,0.2)', color: C.textMuted }}>
              AI tools don't replace AI researchers — they <em style={{ color: C.primary }}>accelerate</em> them. Researchers who use LLMs for literature synthesis, code generation, and hypothesis exploration publish more, iterate faster, and spend more time on the genuinely creative parts of research.
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote roles — especially at Anthropic, OpenAI, and DeepMind — pay 3–8× these figures in USD, particularly for researchers with strong publication records.</p>
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
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f5f3ff', borderColor: 'rgba(109,40,217,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> AI researchers with publications at NeurIPS, ICML, or ICLR earn 40–80% more than those without. A single top-venue paper can be the difference between an applied ML role and a frontier research scientist position.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring AI researchers" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into AI research from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in AI Research" iconBg={C.redLight} iconColor={C.red} />
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
                AI research is the discipline that <strong style={{ color: C.primary }}>defines what AI becomes</strong>. Every foundation model, every safety technique, every architectural breakthrough — these are not inevitable. They are the product of researchers who asked hard questions and built the tools to answer them.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The path is long and demanding. But the researchers who commit to genuine mathematical depth, who implement and publish consistently, and who stay at the frontier for years will find themselves with career capital that compounds unlike anything else in technology.
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
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open a paper, implement it, and write up what you find.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>
          
            
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start reading today. Your future self will thank you.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}