import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { Navbar } from '../components/Navbar';   // ← shared Navbar

// ════════════════════════════════════════════════════════════════
//  TYPES
// ════════════════════════════════════════════════════════════════

interface Skill {
  name: string;
  pct: number;
  tag: string;
  color: string;
}

interface Career {
  title: string;
  emoji: string;
  status: 'thriving' | 'resilient' | 'evolving' | 'atrisk';
  score: number;
  salary: string;
  growth: string;
  note: string;
}

interface TimelineItem {
  year: string;
  icon: string;
  heading: string;
  body: string;
}

interface Stat {
  value: string;
  label: string;
  src: string;
  color: string;
}

interface Cluster {
  icon: string;
  name: string;
  jobs: string;
  trend: string;
  color: string;
}

interface Tool {
  name: string;
  cat: string;
  hot: boolean;
}

type TabKey = 'all' | 'thriving' | 'evolving' | 'atrisk';

// ════════════════════════════════════════════════════════════════
//  DATA
// ════════════════════════════════════════════════════════════════

const skills: Skill[] = [
  { name: 'Generative AI & LLMs',          pct: 96, tag: 'Explosive Growth',  color: '#f97316' },
  { name: 'Machine Learning Engineering',   pct: 88, tag: 'Essential',         color: '#8b5cf6' },
  { name: 'Natural Language Processing',    pct: 84, tag: 'High Demand',       color: '#ec4899' },
  { name: 'MLOps & AI Infrastructure',      pct: 82, tag: 'Rising Fast',       color: '#0ea5e9' },
  { name: 'AI Agents & Automation',         pct: 79, tag: 'Frontier',          color: '#10b981' },
  { name: 'AI Ethics & Governance',         pct: 75, tag: 'Mandated by 2026',  color: '#f59e0b' },
  { name: 'Prompt Engineering',             pct: 72, tag: 'Emerging',          color: '#6366f1' },
  { name: 'Vector Databases & RAG',         pct: 68, tag: 'Specialist',        color: '#14b8a6' },
];

const careers: Career[] = [
  { title: 'AI / ML Engineer',             emoji: '🤖', status: 'thriving',  score: 95, salary: '$130K – $220K', growth: '+87%',  note: 'Core builders powering the next industrial era' },
  { title: 'AI Research Scientist',         emoji: '🔬', status: 'thriving',  score: 98, salary: '$160K – $280K', growth: '+72%',  note: 'Pushing the frontier of machine reasoning' },
  { title: 'MLOps Engineer',               emoji: '🛠️', status: 'thriving',  score: 91, salary: '$125K – $195K', growth: '+95%',  note: 'Bridging models and production deployment' },
  { title: 'Prompt Engineer',              emoji: '✨', status: 'thriving',  score: 82, salary: '$90K – $165K',  growth: '+200%', note: 'Translating human intent into AI output' },
  { title: 'AI Ethics Officer',            emoji: '⚖️', status: 'resilient', score: 78, salary: '$110K – $180K', growth: '+54%',  note: 'Ensuring fair, accountable AI systems' },
  { title: 'Data Scientist',               emoji: '📊', status: 'thriving',  score: 88, salary: '$100K – $175K', growth: '+40%',  note: 'Turning complex data into strategic decisions' },
  { title: 'Software Developer',           emoji: '💻', status: 'evolving',  score: 70, salary: '$95K – $165K',  growth: '+15%',  note: 'Rapidly augmented by AI copilots and assistants' },
  { title: 'Paralegal / Legal Researcher', emoji: '🏛️', status: 'evolving',  score: 48, salary: '$55K – $90K',   growth: '−20%',  note: 'AI tools shifting role to higher-value strategy' },
  { title: 'Content Writer',               emoji: '✍️', status: 'evolving',  score: 55, salary: '$50K – $110K',  growth: '−10%',  note: 'Pivoting to curation, strategy, AI collaboration' },
  { title: 'Tier 1 Customer Support',      emoji: '🎧', status: 'atrisk',    score: 22, salary: '$32K – $50K',   growth: '−45%',  note: 'LLM chatbots now handle 90%+ of queries' },
  { title: 'Data Entry Clerk',             emoji: '⌨️', status: 'atrisk',    score: 12, salary: '$30K – $45K',   growth: '−76%',  note: '80%+ of tasks automated with higher accuracy' },
  { title: 'Basic Proofreader',            emoji: '📝', status: 'atrisk',    score: 18, salary: '$28K – $48K',   growth: '−61%',  note: 'Grammar AI delivers faster, cheaper results' },
];

const timeline: TimelineItem[] = [
  { year: '2024',    icon: '💥', heading: 'The GenAI Explosion',      body: 'ChatGPT reaches 100M users. Fortune 500s deploy AI copilots. Prompt engineering becomes a $150K+ career path.' },
  { year: '2025',    icon: '🤖', heading: 'Agentic AI Emerges',       body: 'Autonomous AI agents handle complex multi-step workflows. MLOps becomes the #1 hiring priority worldwide.' },
  { year: '2026',    icon: '⚖️', heading: 'The Regulation Era',       body: 'EU AI Act enforced globally. AI Ethics Officers mandated in 30+ countries. AI auditing is a $50B industry.' },
  { year: '2027–28', icon: '👁️', heading: 'Multimodal & Physical AI', body: 'AI sees, hears, reasons, and acts in the physical world. Robotics integration reaches 3M deployed units.' },
  { year: '2029–30', icon: '🌐', heading: 'AI-Native Economy',        body: '50% of all knowledge work is AI-augmented. Human-AI collaboration becomes the universal default work mode.' },
];

const stats: Stat[] = [
  { value: '97M',   label: 'New AI Jobs by 2025',      src: 'World Economic Forum', color: '#8b5cf6' },
  { value: '$1.8T', label: 'AI Market by 2030',        src: 'Goldman Sachs',        color: '#f97316' },
  { value: '85M',   label: 'Jobs Displaced by AI',     src: 'WEF Future of Jobs',   color: '#ef4444' },
  { value: '44%',   label: 'Workers Need Reskilling',  src: 'McKinsey Global',      color: '#0ea5e9' },
  { value: '3.5M',  label: 'Global AI Talent Gap',     src: 'LinkedIn Workforce',   color: '#10b981' },
  { value: '10×',   label: 'AI Productivity Boost',    src: 'Stanford AI Index',    color: '#f59e0b' },
];

const clusters: Cluster[] = [
  { icon: '🧬', name: 'AI in Healthcare',     jobs: '340K+ open roles', trend: 'Fastest-growing sector',  color: '#ef4444' },
  { icon: '✨', name: 'Generative AI',         jobs: '180K+ open roles', trend: '+200% demand YoY',        color: '#8b5cf6' },
  { icon: '🏦', name: 'FinTech AI',            jobs: '210K+ open roles', trend: '+62% YoY growth',         color: '#10b981' },
  { icon: '🔐', name: 'AI Cybersecurity',      jobs: '290K+ open roles', trend: '$200B market 2030',       color: '#ec4899' },
  { icon: '🤖', name: 'Robotics & Automation', jobs: '120K+ open roles', trend: 'Physical AI frontier',    color: '#f97316' },
  { icon: '⚖️', name: 'AI Safety & Ethics',    jobs: '45K+ open roles',  trend: 'Govt-mandated 2026',      color: '#0ea5e9' },
  { icon: '🎓', name: 'AI in Education',       jobs: '95K+ open roles',  trend: 'UNESCO backed',           color: '#6366f1' },
  { icon: '🌍', name: 'Climate & AI',          jobs: '60K+ open roles',  trend: 'G7 priority sector',      color: '#14b8a6' },
];

const tools: Tool[] = [
  { name: 'GPT-4o / Claude 3.5',      cat: 'Foundation Models',   hot: true  },
  { name: 'LangChain / LlamaIndex',   cat: 'AI Frameworks',       hot: true  },
  { name: 'Cursor / GitHub Copilot',  cat: 'AI Code Assistants',  hot: true  },
  { name: 'AutoGen / CrewAI',         cat: 'AI Agents',           hot: true  },
  { name: 'Pinecone / Weaviate',      cat: 'Vector Databases',    hot: true  },
  { name: 'Ollama / vLLM',            cat: 'Local LLMs',          hot: true  },
  { name: 'Hugging Face',             cat: 'Model Hub',           hot: false },
  { name: 'PyTorch / TensorFlow',     cat: 'ML Frameworks',       hot: false },
  { name: 'Weights & Biases',         cat: 'MLOps Tracking',      hot: false },
  { name: 'Midjourney / DALL·E 3',    cat: 'Image Generation',    hot: false },
  { name: 'Vertex AI / AWS Bedrock',  cat: 'Cloud AI Platforms',  hot: false },
  { name: 'Whisper / ElevenLabs',     cat: 'Audio AI',            hot: false },
];

// ════════════════════════════════════════════════════════════════
//  STATUS CONFIG
// ════════════════════════════════════════════════════════════════

const statusConfig: Record<Career['status'], { label: string; dot: string; bg: string; border: string; text: string }> = {
  thriving:  { label: 'Thriving',  dot: '#10b981', bg: '#f0fdf4', border: '#bbf7d0', text: '#065f46' },
  resilient: { label: 'Resilient', dot: '#0ea5e9', bg: '#f0f9ff', border: '#bae6fd', text: '#0c4a6e' },
  evolving:  { label: 'Evolving',  dot: '#f59e0b', bg: '#fffbeb', border: '#fde68a', text: '#78350f' },
  atrisk:    { label: 'At Risk',   dot: '#ef4444', bg: '#fef2f2', border: '#fecaca', text: '#7f1d1d' },
};

// ════════════════════════════════════════════════════════════════
//  SUB-COMPONENTS
// ════════════════════════════════════════════════════════════════

const SkillRow: React.FC<{ s: Skill; i: number }> = ({ s, i }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>{s.name}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: s.color, background: s.color + '14', border: `1px solid ${s.color}30`, padding: '2px 9px', borderRadius: 99 }}>{s.tag}</span>
        </div>
        <span style={{ fontSize: 14, fontWeight: 800, color: s.color, marginLeft: 8, whiteSpace: 'nowrap' }}>{s.pct}%</span>
      </div>
      <div style={{ height: 8, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${s.pct}%` } : {}}
          transition={{ duration: 1.3, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${s.color}99, ${s.color})` }}
        />
      </div>
    </div>
  );
};

const CareerCard: React.FC<{ c: Career; index: number }> = ({ c, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const cfg = statusConfig[c.status];
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff',
        border: `1.5px solid ${hov ? cfg.dot : '#e5e7eb'}`,
        borderRadius: 18, padding: 22,
        transition: 'all 0.22s',
        boxShadow: hov ? '0 12px 40px rgba(0,0,0,0.09)' : '0 1px 4px rgba(0,0,0,0.04)',
        transform: hov ? 'translateY(-3px)' : 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: cfg.bg, border: `1px solid ${cfg.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
            {c.emoji}
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: 0 }}>{c.title}</p>
            <p style={{ fontSize: 12, color: '#10b981', fontWeight: 600, margin: '2px 0 0' }}>{c.salary}</p>
          </div>
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 99, background: cfg.bg, color: cfg.text, border: `1px solid ${cfg.border}`, whiteSpace: 'nowrap' }}>
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: cfg.dot, marginRight: 5, verticalAlign: 'middle' }} />
          {cfg.label}
        </span>
      </div>
      <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.65, marginBottom: 14 }}>{c.note}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, height: 5, background: '#f3f4f6', borderRadius: 99, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${c.score}%` } : {}}
            transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
            style={{ height: '100%', borderRadius: 99, background: cfg.dot }}
          />
        </div>
        <span style={{ fontSize: 12, fontWeight: 800, color: c.status === 'atrisk' ? '#ef4444' : c.status === 'thriving' ? '#10b981' : '#f59e0b', minWidth: 44, textAlign: 'right' }}>
          {c.growth}
        </span>
      </div>
    </motion.div>
  );
};

// ════════════════════════════════════════════════════════════════
//  MAIN PAGE
// ════════════════════════════════════════════════════════════════

const AICareerPage: React.FC = () => {
  const [tab, setTab] = useState<TabKey>('all');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filtered: Career[] =
    tab === 'all'      ? careers :
    tab === 'thriving' ? careers.filter(c => c.status === 'thriving' || c.status === 'resilient') :
                         careers.filter(c => c.status === tab);

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'all',      label: 'All Careers' },
    { key: 'thriving', label: '🟢 Thriving'  },
    { key: 'evolving', label: '🟡 Evolving'  },
    { key: 'atrisk',   label: '🔴 At Risk'   },
  ];

  return (
    <div style={{ background: '#ffffff', fontFamily: "'DM Sans', system-ui, sans-serif", color: '#111827', minHeight: '100vh' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #ffffff; }
        .serif { font-family: 'DM Serif Display', serif; }

        @keyframes ticker    { from { transform: translateX(0) }   to { transform: translateX(-50%) } }
        @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:0.6; transform:scale(1.3) } }

        .tab-btn {
          border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 600;
          padding: 8px 20px; border-radius: 99px;
          transition: all 0.18s;
        }
        .tab-btn.active { background: #111827; color: #fff; border: 1.5px solid #111827; }
        .tab-btn:not(.active) { background: #f9fafb; color: #6b7280; border: 1.5px solid #e5e7eb; }
        .tab-btn:not(.active):hover { background: #f3f4f6; }

        input[type=email]:focus { outline: none; border-color: #111827 !important; }
        input[type=email]::placeholder { color: #9ca3af; }

        .grid-2  { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .grid-3  { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        .grid-4  { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
        .card-grid  { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; }
        .tool-grid  { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
        .stat-mini  { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        @media (max-width: 1024px) {
          .grid-4  { grid-template-columns: 1fr 1fr; }
          .tool-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .grid-2  { grid-template-columns: 1fr; }
          .grid-3  { grid-template-columns: 1fr 1fr; }
          .card-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .grid-3  { grid-template-columns: 1fr; }
          .card-grid { grid-template-columns: 1fr; }
          .grid-4  { grid-template-columns: 1fr; }
          .tool-grid { grid-template-columns: 1fr; }
          .stat-mini { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* ── SHARED NAVBAR ─────────────────────────────────────────── */}
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '112px 40px 80px', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 99, padding: '6px 16px', marginBottom: 32 }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', letterSpacing: 1.2 }}>2025–2030 AI CAREER INTELLIGENCE REPORT</span>
          </motion.div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 64, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 360px' }}>
              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
                className="serif"
                style={{ fontSize: 'clamp(42px, 5vw, 74px)', fontWeight: 400, lineHeight: 1.05, color: '#111827', marginBottom: 24, letterSpacing: '-1px' }}
              >
                The AI Career<br />
                <em style={{ fontStyle: 'italic', color: '#8b5cf6' }}>Revolution</em><br />
                Is Here.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
                style={{ fontSize: 17, color: '#6b7280', lineHeight: 1.8, maxWidth: 420, marginBottom: 36 }}
              >
                By 2030, <strong style={{ color: '#111827' }}>97 million new AI roles</strong> will emerge while 85 million traditional jobs disappear. The question is not <em>if</em> AI will change your career — it is whether you will be ready.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
                style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
              >
                <button style={{ background: '#111827', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                  Explore AI Roadmaps →
                </button>
                <button style={{ background: '#fff', color: '#111827', border: '1.5px solid #e5e7eb', borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                  Watch Overview
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
              className="stat-mini"
              style={{ flex: '1 1 300px' }}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.07 }}
                  style={{ background: '#fafafa', border: '1.5px solid #f3f4f6', borderRadius: 16, padding: '20px 18px' }}
                >
                  <p style={{ fontSize: 30, fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: 6 }}>{s.value}</p>
                  <p style={{ fontSize: 12, color: '#374151', fontWeight: 600, marginBottom: 3, lineHeight: 1.4 }}>{s.label}</p>
                  <p style={{ fontSize: 10, color: '#9ca3af' }}>{s.src}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TICKER ──────────────────────────────────────────────────── */}
      <div style={{ background: '#111827', padding: '13px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', animation: 'ticker 35s linear infinite', whiteSpace: 'nowrap' }}>
          {[...Array(4)].map((_, r) => (
            <span key={r} style={{ display: 'inline-flex', gap: 48, paddingRight: 48 }}>
              {[
                '🚀 97M new AI jobs by 2030',
                '💰 AI Engineers earn $130K–$280K+',
                '⚡ 44% of skills change by 2027',
                '🌍 3.5M unfilled AI roles globally',
                '📈 Prompt Engineering +200% demand',
                '⚠️ 85M jobs face automation risk',
              ].map(t => (
                <span key={t} style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: 0.2 }}>{t}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── TIMELINE ─────────────────────────────────────────────────── */}
      <section style={{ padding: '88px 40px', background: '#fff', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 56 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#8b5cf6', letterSpacing: 2, textTransform: 'uppercase' }}>The AI Era Unfolding</span>
            <h2 className="serif" style={{ fontSize: 'clamp(30px, 3.5vw, 52px)', color: '#111827', marginTop: 10, marginBottom: 12, letterSpacing: '-0.5px' }}>
              What Happens Next —<br /><em style={{ color: '#8b5cf6' }}>Year by Year</em>
            </h2>
            <p style={{ color: '#6b7280', fontSize: 16, maxWidth: 480 }}>The AI transformation is already underway. Here is how the next 6 years unfold for your career.</p>
          </motion.div>

          <div style={{ position: 'relative', paddingLeft: 20 }}>
            <div style={{ position: 'absolute', left: 47, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg,#8b5cf6,#f97316,#10b981)' }} />
            {timeline.map((t, i) => (
              <motion.div key={t.year}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{ display: 'flex', gap: 28, marginBottom: 28, position: 'relative' }}
              >
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#fafafa', border: '2px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0, zIndex: 2 }}>
                  {t.icon}
                </div>
                <div style={{ background: '#fafafa', border: '1.5px solid #f3f4f6', borderRadius: 16, padding: '20px 24px', flex: 1 }}>
                  <div style={{ display: 'inline-block', background: '#111827', color: '#fff', borderRadius: 99, fontSize: 11, fontWeight: 700, padding: '3px 12px', marginBottom: 10, letterSpacing: 0.5 }}>{t.year}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 6 }}>{t.heading}</h3>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7 }}>{t.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS MATRIX ────────────────────────────────────────────── */}
      <section style={{ padding: '88px 40px', background: '#fafafa', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 56 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#ec4899', letterSpacing: 2, textTransform: 'uppercase' }}>Skills Intelligence</span>
            <h2 className="serif" style={{ fontSize: 'clamp(30px,3.5vw,52px)', color: '#111827', marginTop: 10, marginBottom: 12, letterSpacing: '-0.5px' }}>
              The 2025 AI <em style={{ color: '#ec4899' }}>Skills Matrix</em>
            </h2>
            <p style={{ color: '#6b7280', fontSize: 16, maxWidth: 480 }}>Not optional upgrades — the new professional literacy.</p>
          </motion.div>

          <div className="grid-2" style={{ alignItems: 'start' }}>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              style={{ background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 20, padding: '32px 28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <p style={{ fontSize: 12, fontWeight: 800, color: '#9ca3af', letterSpacing: 1.5, textTransform: 'uppercase' }}>Demand Index 2025</p>
                <span style={{ fontSize: 10, background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#065f46', fontWeight: 700, padding: '3px 10px', borderRadius: 99 }}>● Live Data</span>
              </div>
              {skills.map((s, i) => <SkillRow key={s.name} s={s} i={i} />)}
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                style={{ background: '#111827', borderRadius: 20, padding: '32px 28px' }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>🔥</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 10 }}>The Reskilling Imperative</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, marginBottom: 20 }}>
                  McKinsey estimates <strong style={{ color: '#fbbf24' }}>375 million workers</strong> — 14% of the global workforce — will need to switch occupational categories entirely by 2030.
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['NLP', 'GenAI', 'MLOps', 'AI Ethics', 'Agents', 'RAG'].map(tag => (
                    <span key={tag} style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 99, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#e5e7eb' }}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAREER CARDS ─────────────────────────────────────────────── */}
      <section style={{ padding: '88px 40px', background: '#fff', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 40 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#0ea5e9', letterSpacing: 2, textTransform: 'uppercase' }}>Career Intelligence</span>
            <h2 className="serif" style={{ fontSize: 'clamp(30px,3.5vw,52px)', color: '#111827', marginTop: 10, marginBottom: 12, letterSpacing: '-0.5px' }}>
              Who Wins and Who Loses<br /><em style={{ color: '#0ea5e9' }}>in the AI Economy</em>
            </h2>
            <p style={{ color: '#6b7280', fontSize: 16, maxWidth: 520, marginBottom: 32 }}>Data-backed analysis of 12 careers — real salaries, growth rates, and AI resilience scores.</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {tabs.map(t => (
                <button key={t.key} className={`tab-btn ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>
                  {t.label}
                </button>
              ))}
            </div>
          </motion.div>
          <div className="card-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((c, i) => <CareerCard key={c.title} c={c} index={i} />)}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── HOT TOOLS ────────────────────────────────────────────────── */}
      <section style={{ padding: '88px 40px', background: '#fafafa', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 56 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#f97316', letterSpacing: 2, textTransform: 'uppercase' }}>Tools & Ecosystem</span>
            <h2 className="serif" style={{ fontSize: 'clamp(30px,3.5vw,52px)', color: '#111827', marginTop: 10, marginBottom: 12, letterSpacing: '-0.5px' }}>
              AI Tools You <em style={{ color: '#f97316' }}>Must Know</em>
            </h2>
          </motion.div>
          <div className="tool-grid">
            {tools.map((t, i) => (
              <motion.div key={t.name}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(0,0,0,0.08)' }}
                style={{ background: '#fff', border: `1.5px solid ${t.hot ? '#fde68a' : '#e5e7eb'}`, borderRadius: 14, padding: '16px 18px', transition: 'all 0.2s', position: 'relative' }}
              >
                {t.hot && (
                  <span style={{ position: 'absolute', top: 10, right: 10, fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 99, background: '#fffbeb', color: '#92400e', border: '1px solid #fde68a' }}>🔥 HOT</span>
                )}
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#f9fafb', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 900, color: '#111827' }}>AI</span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 4 }}>{t.name}</p>
                <p style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600 }}>{t.cat}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLUSTERS ─────────────────────────────────────────────────── */}
      <section style={{ padding: '88px 40px', background: '#fff', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 56 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#10b981', letterSpacing: 2, textTransform: 'uppercase' }}>Emerging Industries</span>
            <h2 className="serif" style={{ fontSize: 'clamp(30px,3.5vw,52px)', color: '#111827', marginTop: 10, marginBottom: 12, letterSpacing: '-0.5px' }}>
              8 AI Industry Clusters<br /><em style={{ color: '#10b981' }}>Exploding With Opportunity</em>
            </h2>
          </motion.div>
          <div className="grid-4">
            {clusters.map((cl, i) => (
              <motion.div key={cl.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.08)' }}
                style={{ background: '#fff', border: '1.5px solid #f3f4f6', borderRadius: 18, padding: '24px 20px', transition: 'all 0.25s', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: cl.color }} />
                <div style={{ fontSize: 26, marginBottom: 12 }}>{cl.icon}</div>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: '#111827', marginBottom: 8 }}>{cl.name}</h3>
                <p style={{ fontSize: 12, color: cl.color, fontWeight: 700, marginBottom: 4 }}>💼 {cl.jobs}</p>
                <p style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600 }}>📈 {cl.trend}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK STATS STRIP ─────────────────────────────────────────── */}
      <section style={{ background: '#111827', padding: '72px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="grid-3">
            {stats.slice(3).map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '28px 24px', textAlign: 'center' }}
              >
                <p style={{ fontSize: 38, fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: 10 }}>{s.value}</p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: 600, marginBottom: 4 }}>{s.label}</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Source: {s.src}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / NEWSLETTER ─────────────────────────────────────────── */}
      <section style={{ padding: '96px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="serif" style={{ fontSize: 'clamp(32px,4vw,56px)', color: '#111827', marginBottom: 16, letterSpacing: '-0.5px', lineHeight: 1.1 }}>
              Don't Get Left Behind<br />by the <em style={{ color: '#8b5cf6' }}>AI Revolution</em>
            </h2>
            <p style={{ color: '#6b7280', fontSize: 16, lineHeight: 1.8, marginBottom: 40 }}>
              Every week: the hottest AI job roles, real salary data, skill trends, and actionable career roadmaps.{' '}
              <strong style={{ color: '#111827' }}>12,000+ tech professionals</strong> already subscribed.
            </p>
            {!subscribed ? (
              <div>
                <div style={{ display: 'flex', gap: 10, maxWidth: 440, margin: '0 auto 16px' }}>
                  <input
                    type="email" placeholder="your@email.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    style={{ flex: 1, padding: '13px 18px', borderRadius: 12, background: '#f9fafb', border: '1.5px solid #e5e7eb', color: '#111827', fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}
                  />
                  <button
                    onClick={() => email && setSubscribed(true)}
                    style={{ padding: '13px 24px', borderRadius: 12, background: '#111827', color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Get Access
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
                  {['No spam, ever', 'Cancel anytime', '100% free'].map(t => (
                    <span key={t} style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600 }}>✓ {t}</span>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: 16, padding: '20px 32px', display: 'inline-block' }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#065f46' }}>🎉 You're in! Check your inbox for a confirmation.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer style={{ background: '#fafafa', borderTop: '1px solid #e5e7eb', padding: '40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: 12, color: '#9ca3af' }}>© 2026 CareerPathGuide. All rights reserved. Data: WEF, McKinsey, Goldman Sachs, LinkedIn.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Privacy', '/privacy'], ['Terms', '/terms'], ['Contact', '/contact'], ['About', '/about']].map(([l, to]) => (
              <a key={l} href={to} style={{ fontSize: 12, color: '#9ca3af', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AICareerPage;