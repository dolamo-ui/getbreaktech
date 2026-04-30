import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Shield, Cloud, BarChart2, Bot, Code2, Palette,
  Briefcase, Megaphone, Sparkles, TrendingUp,
  Users, BookOpen, Award,
  Monitor, Activity, Clock,
  Database, Layers, Network, Gamepad2, Smartphone,
  Bug, ServerCog, Fingerprint, AlertTriangle,
  Blocks, ChevronLeft,
  Cpu, HardDrive,
  LifeBuoy, Settings, Lock, Search, Radio,
  ShieldCheck, UserCheck, HeadphonesIcon, Wrench,
} from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { Newsletter, Footer } from '../components/Footer'

/* ─── TYPES ───────────────────────────────────────────────────────────────── */
interface Card {
  id: string; title: string; description: string; category: string
  readTime: string; salary: string; level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string; tags: string[]; trending?: boolean; badge?: string
  gradientFrom: string; gradientTo: string; accentColor: string
  icon: React.ReactNode; img: string
}

/* ─── STYLES ──────────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,300;1,9..144,700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .ap-root { font-family: 'Plus Jakarta Sans', sans-serif; background: #f0f2f5; min-height: 100vh; color: #111827; }

    /* ── HERO ── */
    .ap-hero {
      position: relative; overflow: hidden; background: #f8fafc;
      border-bottom: 1px solid #e5e7eb;
    }
    .ap-hero::before {
      content: ''; position: absolute; inset: 0;
      background-image: radial-gradient(circle, #cbd5e1 1px, transparent 1px);
      background-size: 28px 28px; opacity: 0.45; pointer-events: none; z-index: 0;
    }
    .ap-hero-blob1 { position: absolute; width: 560px; height: 560px; border-radius: 50%; background: radial-gradient(circle, #e0e7ff 0%, transparent 70%); top: -220px; left: -140px; pointer-events: none; animation: ap-blobdrift 8s ease-in-out infinite alternate; }
    .ap-hero-blob2 { position: absolute; width: 440px; height: 440px; border-radius: 50%; background: radial-gradient(circle, #fce7f3 0%, transparent 70%); top: -80px; right: -100px; pointer-events: none; animation: ap-blobdrift 10s ease-in-out infinite alternate-reverse; }
    .ap-hero-blob3 { position: absolute; width: 380px; height: 380px; border-radius: 50%; background: radial-gradient(circle, #cffafe 0%, transparent 70%); bottom: 0; left: 42%; pointer-events: none; animation: ap-blobdrift 12s ease-in-out infinite alternate; }
    @keyframes ap-blobdrift { from{transform:translate(0,0) scale(1)} to{transform:translate(30px,20px) scale(1.08)} }
    .ap-hero-inner {
      position: relative; z-index: 2; max-width: 1100px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center;
      padding: 72px 40px 64px;
    }
    @media(max-width:800px){ .ap-hero-inner{ grid-template-columns:1fr; padding: 48px 24px 40px; } .ap-hero-right{ display:none; } }
    .ap-hero-left { padding-bottom: 0; }
    .ap-hero-badge {
      display: inline-flex; align-items: center; gap: 7px;
      background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 999px;
      padding: 5px 14px; margin-bottom: 22px;
      font-size: 0.72rem; font-weight: 700; color: #2563eb; letter-spacing: 0.08em; text-transform: uppercase;
      animation: ap-fadeslide 0.6s ease forwards;
    }
    @keyframes ap-fadeslide { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    .ap-hero h1 {
      font-family: 'Fraunces', serif; font-size: clamp(2.4rem, 4.5vw, 3.6rem); font-weight: 700;
      color: #0f172a; line-height: 1.08; margin-bottom: 18px; letter-spacing: -0.03em;
      animation: ap-fadeslide 0.6s ease 0.1s both;
    }
    .ap-hero h1 em { font-style: italic; color: #2563eb; }
    .ap-hero p {
      font-size: 1rem; color: #64748b; max-width: 460px; margin: 0 0 32px;
      line-height: 1.75; font-weight: 400; animation: ap-fadeslide 0.6s ease 0.2s both;
    }
    .ap-hero-search-group {
      display: flex; align-items: center; position: relative;
      max-width: 440px; margin-bottom: 16px; animation: ap-fadeslide 0.6s ease 0.25s both;
    }
    .ap-hero-search-icon { position: absolute; left: 16px; fill: #94a3b8; width: 16px; height: 16px; flex-shrink: 0; }
    .ap-hero-search-input {
      width: 100%; height: 50px; padding: 0 1rem 0 2.8rem;
      border: 1.5px solid #e2e8f0; border-radius: 12px; outline: none;
      background: #fff; color: #0f172a; font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 0.9rem; box-shadow: 0 1px 4px rgba(0,0,0,0.06); transition: 0.2s ease;
    }
    .ap-hero-search-input::placeholder { color: #94a3b8; }
    .ap-hero-search-input:focus,.ap-hero-search-input:hover { border-color: #93c5fd; box-shadow: 0 0 0 4px rgba(59,130,246,0.1); }
    .ap-hero-chips { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 22px; animation: ap-fadeslide 0.6s ease 0.3s both; }
    .ap-hero-chips-label { font-size: 0.75rem; color: #94a3b8; font-weight: 500; }
    .ap-hero-chip {
      padding: 4px 12px; border-radius: 999px; border: 1px solid #e2e8f0; background: #fff;
      font-size: 0.72rem; font-weight: 600; color: #475569; cursor: pointer;
      font-family: 'Plus Jakarta Sans', sans-serif; transition: all 0.15s;
    }
    .ap-hero-chip:hover { background: #eff6ff; border-color: #93c5fd; color: #2563eb; }
    .ap-hero-filters { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 32px; animation: ap-fadeslide 0.6s ease 0.35s both; }
    .ap-select-wrap { position: relative; width: fit-content; }
    .ap-select-trigger {
      display: flex; align-items: center; gap: 8px; background: #fff; border: 1.5px solid #e2e8f0;
      border-radius: 9px; padding: 8px 14px; font-size: 0.82rem; font-weight: 600; color: #374151;
      cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; transition: all 0.2s;
      white-space: nowrap; user-select: none; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .ap-select-trigger:hover { border-color: #93c5fd; background: #f8fafc; }
    .ap-select-arrow { width: 12px; height: 12px; fill: #9ca3af; transition: transform 0.25s ease; flex-shrink: 0; }
    .ap-select-wrap.open .ap-select-arrow { transform: rotate(180deg); }
    .ap-select-dropdown {
      position: absolute; top: calc(100% + 6px); left: 0; background: #fff;
      border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 6px; min-width: 160px;
      z-index: 200; box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      opacity: 0; transform: translateY(-8px); pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
    .ap-select-wrap.open .ap-select-dropdown { opacity: 1; transform: translateY(0); pointer-events: all; }
    .ap-select-option { padding: 8px 10px; border-radius: 7px; font-size: 0.82rem; font-weight: 500; color: #374151; cursor: pointer; transition: background 0.15s; }
    .ap-select-option:hover { background: #f1f5f9; color: #111; }
    .ap-select-option.selected { color: #2563eb; font-weight: 700; background: #eff6ff; }
    .ap-clear-link { background: none; border: none; font-size: 0.78rem; color: #ef4444; cursor: pointer; font-weight: 600; font-family: 'Plus Jakarta Sans', sans-serif; padding: 8px 4px; transition: color 0.15s; }
    .ap-clear-link:hover { color: #dc2626; }
    .ap-hero-stats { display: flex; gap: 28px; flex-wrap: wrap; margin-bottom: 20px; animation: ap-fadeslide 0.6s ease 0.4s both; }
    .ap-hero-stat { display: flex; align-items: center; gap: 9px; }
    .ap-hero-stat-icon { width: 36px; height: 36px; border-radius: 9px; background: #fff; border: 1.5px solid #e2e8f0; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
    .ap-hero-stat-val { font-size: 1.05rem; font-weight: 800; color: #0f172a; line-height: 1; }
    .ap-hero-stat-lbl { font-size: 0.7rem; color: #94a3b8; margin-top: 2px; }
    .ap-hero-trust { display: flex; align-items: center; gap: 10px; animation: ap-fadeslide 0.6s ease 0.45s both; }
    .ap-avatar-stack { display: flex; }
    .ap-avatar { width: 28px; height: 28px; border-radius: 50%; border: 2px solid #f8fafc; margin-left: -8px; font-size: 0.6rem; font-weight: 700; color: #fff; display: flex; align-items: center; justify-content: center; }
    .ap-avatar:first-child { margin-left: 0; }
    .ap-trust-text { font-size: 0.75rem; color: #94a3b8; }
    .ap-trust-text strong { color: #1e293b; }
    .ap-hero-right { display: flex; align-items: center; justify-content: center; animation: ap-fadeslide 0.7s ease 0.3s both; }
    .ap-hero-illustration { width: 100%; max-width: 460px; height: auto; object-fit: contain; filter: drop-shadow(0 8px 32px rgba(0,0,0,0.08)); }

    /* ── MARQUEE ── */
    .ap-marquee-wrap { position: relative; z-index: 2; overflow: hidden; padding: 16px 0; border-top: 1px solid #e2e8f0; background: #fff; }
    .ap-marquee-track { display: flex; gap: 0; width: max-content; animation: ap-marquee 28s linear infinite; }
    .ap-marquee-wrap:hover .ap-marquee-track { animation-play-state: paused; }
    @keyframes ap-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    .ap-marquee-item { display: flex; align-items: center; gap: 10px; padding: 0 28px; white-space: nowrap; font-size: 0.82rem; font-weight: 600; color: #94a3b8; }
    .ap-marquee-item span { color: #475569; }
    .ap-marquee-dot { width: 5px; height: 5px; border-radius: 50%; background: #cbd5e1; flex-shrink: 0; }

    /* ── MAIN ── */
    .ap-main { max-width: 1100px; margin: 0 auto; padding: 32px 24px 80px; }

    /* ── SECTION LABEL ── */
    .ap-section-label {
      display: flex; align-items: center; gap: 10px; margin-bottom: 20px; margin-top: 8px;
    }
    .ap-section-label-line { flex: 1; height: 1px; background: #e5e7eb; }
    .ap-section-label-text {
      font-size: 0.72rem; font-weight: 800; color: #6b7280; letter-spacing: 0.1em;
      text-transform: uppercase; white-space: nowrap; padding: 4px 12px;
      background: #fff; border: 1.5px solid #e5e7eb; border-radius: 999px;
    }

    /* ── CARDS GRID ── */
    .ap-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    @media(max-width: 900px) { .ap-grid { grid-template-columns: repeat(2, 1fr); } }
    @media(max-width: 560px)  { .ap-grid { grid-template-columns: 1fr; } }
    .ap-card {
      background: #fff; border-radius: 16px; overflow: hidden; border: 1.5px solid #e5e7eb;
      text-decoration: none; color: inherit; display: flex; flex-direction: column; cursor: pointer;
      transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease;
      position: relative;
    }
    .ap-card:hover { transform: translateY(-6px) scale(1.01); border-color: var(--accent, #93c5fd); box-shadow: 0 20px 48px rgba(0,0,0,0.13), 0 0 0 3px color-mix(in srgb, var(--accent, #93c5fd) 18%, transparent); }
    @keyframes ap-shimmer { 0%{left:-100%} 100%{left:160%} }
    .ap-card-banner-shimmer { position: absolute; top: 0; width: 40%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent); transform: skewX(-15deg); left: -100%; pointer-events: none; animation: none; }
    .ap-card:hover .ap-card-banner-shimmer { animation: ap-shimmer 0.7s ease forwards; }
    @keyframes ap-iconbounce { 0%{transform:scale(1)} 40%{transform:scale(1.18) rotate(-4deg)} 70%{transform:scale(0.95) rotate(2deg)} 100%{transform:scale(1) rotate(0deg)} }
    .ap-card:hover .ap-card-icon-box { animation: ap-iconbounce 0.5s ease forwards; }
    @keyframes ap-nudge { from{transform:translateX(0)} to{transform:translateX(4px)} }
    .ap-card:hover .ap-read-arrow { animation: ap-nudge 0.45s ease infinite alternate; }
    .ap-card:hover .ap-card-title { color: var(--accent, #2563eb); }
    .ap-card-title { transition: color 0.2s ease; }
    .ap-card-banner { position: relative; height: 160px; overflow: hidden; background: #1e293b; }
    .ap-card-category-pill { position: absolute; top: 12px; left: 12px; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 10px; border-radius: 999px; background: rgba(255,255,255,0.18); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.3); color: #fff; }
    .ap-card-body { padding: 18px 18px 20px; flex: 1; display: flex; flex-direction: column; }
    .ap-card-title { font-size: 1.05rem; font-weight: 700; color: #111827; margin-bottom: 7px; letter-spacing: -0.01em; }
    .ap-card-desc { font-size: 0.8rem; color: #6b7280; line-height: 1.6; font-weight: 400; flex: 1; margin-bottom: 14px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

    /* ── CTA ── */
    .ap-cta { background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 50%, #2563eb 100%); border-radius: 20px; padding: clamp(28px, 5vw, 48px); text-align: center; position: relative; overflow: hidden; margin-top: 48px; }
    .ap-cta::before { content: ''; position: absolute; width: 400px; height: 400px; border-radius: 50%; background: rgba(255,255,255,0.05); top: -200px; right: -100px; pointer-events: none; }
    .ap-cta h2 { font-family: 'Fraunces', serif; font-size: clamp(1.4rem, 3vw, 1.9rem); font-weight: 700; color: #fff; margin-bottom: 10px; letter-spacing: -0.02em; }
    .ap-cta p { font-size: 0.88rem; color: rgba(255,255,255,0.72); margin-bottom: 24px; line-height: 1.7; }
    .ap-cta-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; border-radius: 10px; border: 2px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.12); color: #fff; font-size: 0.9rem; font-weight: 700; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; backdrop-filter: blur(8px); transition: background 0.2s; text-decoration: none; }
    .ap-cta-btn:hover { background: rgba(255,255,255,0.22); }

    /* ── FADE ── */
    .ap-fade { opacity: 0; transform: translateY(20px); transition: opacity 0.55s ease, transform 0.55s ease; }
    .ap-fade.visible { opacity: 1; transform: translateY(0); }

    /* ── HIGHLIGHT ── */
    @keyframes ap-highlight-pulse {
      0%   { box-shadow: 0 0 0 0px rgba(37,99,235,0.55), 0 20px 48px rgba(0,0,0,0.13); border-color: #2563eb; }
      40%  { box-shadow: 0 0 0 8px rgba(37,99,235,0.18), 0 20px 48px rgba(0,0,0,0.13); border-color: #2563eb; }
      100% { box-shadow: 0 0 0 0px rgba(37,99,235,0.0),  0 20px 48px rgba(0,0,0,0.13); border-color: #93c5fd; }
    }
    .ap-card-highlight { border-color: #2563eb !important; animation: ap-highlight-pulse 1.4s ease forwards !important; transform: translateY(-6px) scale(1.02) !important; }
  `}</style>
)

/* ─── CARD DATA ───────────────────────────────────────────────────────────── */
const levelColor: Record<'Beginner' | 'Intermediate' | 'Advanced', string> = {
  Beginner: '#16a34a', Intermediate: '#d97706', Advanced: '#dc2626',
}

const CARDS: Card[] = [
  // ── AI & Data ──────────────────────────────────────────────────────────────
  { id: 'ai-ml-engineer', title: 'AI & ML Engineer', description: 'The most in-demand role of the decade. Build intelligent systems, train LLMs, and create AI products that shape the future.', category: 'AI & Data', readTime: '20 min read', salary: 'R900k – R2.2M', level: 'Advanced', duration: '10–14 months', tags: ['LLMs', 'PyTorch', 'Python'], trending: true, badge: 'Hottest in 2026', gradientFrom: '#7c3aed', gradientTo: '#4f46e5', accentColor: '#7c3aed', icon: <Bot size={28} />, img: '' },
  { id: 'ai-engineer', title: 'AI Engineer', description: 'Bridge the gap between AI research and production. Build AI-powered applications, integrate LLM APIs, and ship intelligent products to real users.', category: 'AI & Data', readTime: '18 min read', salary: 'R850k – R2M', level: 'Intermediate', duration: '8–12 months', tags: ['OpenAI API', 'LangChain', 'Python'], trending: true, badge: 'High Demand', gradientFrom: '#6d28d9', gradientTo: '#7c3aed', accentColor: '#8b5cf6', icon: <Bot size={28} />, img: '' },
  { id: 'machine-learning-engineer', title: 'Machine Learning Engineer', description: 'Design, build and deploy ML models at scale. From training pipelines to production inference — you own the full ML lifecycle.', category: 'AI & Data', readTime: '20 min read', salary: 'R850k – R2M', level: 'Advanced', duration: '10–14 months', tags: ['Scikit-learn', 'TensorFlow', 'MLOps'], trending: true, badge: 'High Growth', gradientFrom: '#4f46e5', gradientTo: '#7c3aed', accentColor: '#6366f1', icon: <Cpu size={28} />, img: '' },
  { id: 'ai-researcher', title: 'AI Researcher', description: 'Push the boundaries of what AI can do. Shape the future of machine intelligence at labs and universities.', category: 'AI & Data', readTime: '20 min read', salary: 'R1M – R2.5M', level: 'Advanced', duration: '12–18 months', tags: ['PyTorch', 'Papers', 'Statistics'], badge: 'Elite Track', gradientFrom: '#312e81', gradientTo: '#3730a3', accentColor: '#6366f1', icon: <Bot size={28} />, img: '' },
  { id: 'data-science', title: 'Data Scientist', description: 'Turn mountains of raw data into strategic gold. If you love patterns and problem-solving, start here.', category: 'AI & Data', readTime: '18 min read', salary: 'R800k – R1.8M', level: 'Intermediate', duration: '8–12 months', tags: ['Python', 'Pandas', 'SQL'], trending: true, badge: 'Top Salary', gradientFrom: '#06b6d4', gradientTo: '#3b82f6', accentColor: '#06b6d4', icon: <BarChart2 size={28} />, img: '' },
  { id: 'data-analyst', title: 'Data Analyst', description: 'Transform raw data into actionable business insights using SQL, Excel, and BI tools.', category: 'AI & Data', readTime: '14 min read', salary: 'R450k – R950k', level: 'Beginner', duration: '4–6 months', tags: ['SQL', 'Power BI', 'Excel'], badge: 'Beginner Friendly', gradientFrom: '#0284c7', gradientTo: '#0369a1', accentColor: '#0ea5e9', icon: <BarChart2 size={28} />, img: '' },
  { id: 'data-engineer', title: 'Data Engineer', description: 'Build pipelines, warehouses, and infrastructure that power modern data teams.', category: 'AI & Data', readTime: '16 min read', salary: 'R700k – R1.6M', level: 'Intermediate', duration: '7–10 months', tags: ['Spark', 'dbt', 'Airflow'], trending: true, gradientFrom: '#0369a1', gradientTo: '#0284c7', accentColor: '#0ea5e9', icon: <Database size={28} />, img: '' },
  { id: 'mlops-engineer', title: 'MLOps Engineer', description: 'Deploy, monitor, and maintain AI models at scale. One of the fastest-growing roles in tech.', category: 'AI & Data', readTime: '16 min read', salary: 'R800k – R1.9M', level: 'Advanced', duration: '9–13 months', tags: ['MLflow', 'Kubeflow', 'Docker'], trending: true, badge: 'High Growth', gradientFrom: '#4f46e5', gradientTo: '#7c3aed', accentColor: '#6366f1', icon: <Bot size={28} />, img: '' },
  // ── Tech / Development ─────────────────────────────────────────────────────
  { id: 'frontend-developer', title: 'Frontend Developer', description: 'Craft the digital experiences people see and love. Learn React and launch your career with one of the most hirable skills in tech.', category: 'Tech', readTime: '15 min read', salary: 'R650k – R1.2M', level: 'Beginner', duration: '6–9 months', tags: ['React', 'TypeScript', 'Tailwind'], trending: true, badge: 'Beginner Friendly', gradientFrom: '#3b82f6', gradientTo: '#6366f1', accentColor: '#3b82f6', icon: <Code2 size={28} />, img: '' },
  { id: 'backend-developer', title: 'Backend Developer', description: 'Build the engine that powers every app. Master databases, APIs, and server architecture.', category: 'Tech', readTime: '16 min read', salary: 'R600k – R1.4M', level: 'Intermediate', duration: '7–10 months', tags: ['Node.js', 'PostgreSQL', 'Docker'], gradientFrom: '#8b5cf6', gradientTo: '#6366f1', accentColor: '#8b5cf6', icon: <Code2 size={28} />, img: '' },
  { id: 'full-stack-developer', title: 'Full-Stack Developer', description: 'Own the entire product from database to UI. The Swiss Army knife every startup wants.', category: 'Tech', readTime: '17 min read', salary: 'R700k – R1.5M', level: 'Intermediate', duration: '9–12 months', tags: ['React', 'Node.js', 'PostgreSQL'], trending: true, badge: 'Most Versatile', gradientFrom: '#2563eb', gradientTo: '#7c3aed', accentColor: '#4f46e5', icon: <Layers size={28} />, img: '' },
  { id: 'web-developer', title: 'Web Developer', description: 'Build everything from static websites to complex web applications. The most accessible entry into tech.', category: 'Tech', readTime: '13 min read', salary: 'R400k – R1M', level: 'Beginner', duration: '4–7 months', tags: ['HTML/CSS', 'JavaScript', 'React'], badge: 'Beginner Friendly', gradientFrom: '#0891b2', gradientTo: '#0e7490', accentColor: '#0891b2', icon: <Code2 size={28} />, img: '' },
  { id: 'software-engineer', title: 'Software Engineer', description: 'Build the software that powers the modern world. The most universally hired role in tech.', category: 'Tech', readTime: '16 min read', salary: 'R600k – R1.5M', level: 'Intermediate', duration: '8–12 months', tags: ['Python', 'Java', 'System Design'], trending: true, gradientFrom: '#1e40af', gradientTo: '#2563eb', accentColor: '#3b82f6', icon: <Code2 size={28} />, img: '' },
  { id: 'mobile-developer', title: 'Mobile App Developer', description: "Build apps that live in people's pockets. Learn React Native or Flutter and ship cross-platform.", category: 'Tech', readTime: '14 min read', salary: 'R600k – R1.3M', level: 'Intermediate', duration: '7–10 months', tags: ['React Native', 'Flutter', 'Swift'], gradientFrom: '#0891b2', gradientTo: '#0e7490', accentColor: '#0891b2', icon: <Smartphone size={28} />, img: '' },
  { id: 'devops', title: 'DevOps Engineer', description: 'Bridge the gap between development and operations. Automate pipelines and ship software faster.', category: 'Tech', readTime: '15 min read', salary: 'R650k – R1.5M', level: 'Intermediate', duration: '7–10 months', tags: ['CI/CD', 'Docker', 'Kubernetes'], gradientFrom: '#0f766e', gradientTo: '#0d9488', accentColor: '#0d9488', icon: <ServerCog size={28} />, img: '' },
  { id: 'cloud-devops', title: 'Cloud & DevOps Engineer', description: 'Master AWS, automate deployments, and build scalable infrastructure that powers apps used by millions.', category: 'Tech', readTime: '16 min read', salary: 'R700k – R1.5M', level: 'Intermediate', duration: '8–11 months', tags: ['AWS', 'Terraform', 'Kubernetes'], trending: true, badge: 'High Growth', gradientFrom: '#0ea5e9', gradientTo: '#06b6d4', accentColor: '#0ea5e9', icon: <Cloud size={28} />, img: '' },
  { id: 'cloud-engineer', title: 'Cloud Engineer', description: 'Design, build and maintain cloud infrastructure. Master AWS, Azure or GCP and command top salaries.', category: 'Tech', readTime: '16 min read', salary: 'R700k – R1.6M', level: 'Intermediate', duration: '8–11 months', tags: ['AWS', 'Azure', 'Terraform'], trending: true, gradientFrom: '#0369a1', gradientTo: '#0284c7', accentColor: '#0284c7', icon: <Cloud size={28} />, img: '' },
  { id: 'site-reliability-engineer', title: 'Site Reliability Engineer', description: 'Keep large-scale systems running at peak performance. SREs earn top-of-market salaries.', category: 'Tech', readTime: '16 min read', salary: 'R750k – R1.7M', level: 'Advanced', duration: '9–13 months', tags: ['SLOs', 'Prometheus', 'Kubernetes'], trending: true, gradientFrom: '#0c4a6e', gradientTo: '#075985', accentColor: '#0369a1', icon: <Activity size={28} />, img: '' },
  { id: 'systems-engineer', title: 'Systems Engineer', description: 'Design and manage the complex systems that underpin enterprise infrastructure.', category: 'Tech', readTime: '15 min read', salary: 'R600k – R1.4M', level: 'Intermediate', duration: '7–10 months', tags: ['Linux', 'Networking', 'Scripting'], gradientFrom: '#1e3a5f', gradientTo: '#1e40af', accentColor: '#3b82f6', icon: <HardDrive size={28} />, img: '' },
  { id: 'systems-administrator', title: 'Systems Administrator', description: 'Keep servers, networks, and IT infrastructure running smoothly. A reliable, well-paying role.', category: 'Tech', readTime: '13 min read', salary: 'R350k – R850k', level: 'Beginner', duration: '4–7 months', tags: ['Windows Server', 'Linux', 'Active Directory'], badge: 'Beginner Friendly', gradientFrom: '#1d4ed8', gradientTo: '#2563eb', accentColor: '#3b82f6', icon: <Settings size={28} />, img: '' },
  { id: 'network-engineer', title: 'Network Engineer', description: 'Design and manage the networks that connect the modern world. Everything runs on the foundation you build.', category: 'Tech', readTime: '14 min read', salary: 'R550k – R1.2M', level: 'Intermediate', duration: '7–10 months', tags: ['Cisco', 'BGP', 'Network+'], gradientFrom: '#164e63', gradientTo: '#155e75', accentColor: '#0e7490', icon: <Network size={28} />, img: '' },
  { id: 'solutions-architect', title: 'Solutions Architect', description: 'Design technical solutions aligned to business goals. Between sales, engineering and client — earns extremely well.', category: 'Tech', readTime: '15 min read', salary: 'R900k – R2M', level: 'Advanced', duration: '6–9 months', tags: ['AWS SAA', 'System Design', 'Cloud'], badge: 'Top Earner', gradientFrom: '#0c4a6e', gradientTo: '#075985', accentColor: '#0369a1', icon: <Layers size={28} />, img: '' },
  { id: 'iot-engineer', title: 'IoT Engineer', description: 'Connect the physical and digital worlds. Build smart devices, sensors, and embedded systems.', category: 'Tech', readTime: '15 min read', salary: 'R550k – R1.3M', level: 'Intermediate', duration: '7–10 months', tags: ['MQTT', 'Embedded C', 'AWS IoT'], gradientFrom: '#065f46', gradientTo: '#047857', accentColor: '#059669', icon: <Radio size={28} />, img: '' },
  { id: 'blockchain-developer', title: 'Blockchain Developer', description: 'Build the decentralised web. Write smart contracts and DeFi protocols reshaping finance.', category: 'Tech', readTime: '18 min read', salary: 'R800k – R2M', level: 'Advanced', duration: '10–14 months', tags: ['Solidity', 'Ethereum', 'Web3.js'], badge: 'Future Tech', gradientFrom: '#f59e0b', gradientTo: '#d97706', accentColor: '#f59e0b', icon: <Blocks size={28} />, img: '' },
  { id: 'game-developer', title: 'Game Developer', description: 'Turn creative ideas into interactive worlds. The global games industry is worth $200B+.', category: 'Tech', readTime: '15 min read', salary: 'R500k – R1.4M', level: 'Intermediate', duration: '8–12 months', tags: ['Unity', 'C#', 'Unreal Engine'], gradientFrom: '#dc2626', gradientTo: '#ea580c', accentColor: '#ea580c', icon: <Gamepad2 size={28} />, img: '' },
  { id: 'qa-engineer', title: 'QA Engineer', description: 'Catch bugs before users do. QA engineers own quality across the entire software lifecycle.', category: 'Tech', readTime: '12 min read', salary: 'R450k – R1M', level: 'Beginner', duration: '4–7 months', tags: ['Selenium', 'Jest', 'Cypress'], badge: 'Beginner Friendly', gradientFrom: '#166534', gradientTo: '#15803d', accentColor: '#16a34a', icon: <Bug size={28} />, img: '' },
  // ── IT Support ─────────────────────────────────────────────────────────────
  { id: 'help-desk-technician', title: 'Help Desk Technician', description: 'First-line IT support. The perfect launchpad for a career in tech — no degree required.', category: 'IT Support', readTime: '10 min read', salary: 'R200k – R450k', level: 'Beginner', duration: '2–4 months', tags: ['Windows', 'ITIL', 'Ticketing'], badge: 'Great Entry Point', gradientFrom: '#0369a1', gradientTo: '#0284c7', accentColor: '#0284c7', icon: <Monitor size={28} />, img: '' },
  { id: 'it-support-specialist', title: 'IT Support Specialist', description: 'Resolve hardware, software, and network issues for employees and customers.', category: 'IT Support', readTime: '10 min read', salary: 'R220k – R500k', level: 'Beginner', duration: '2–4 months', tags: ['Troubleshooting', 'Windows', 'Networking Basics'], badge: 'Great Entry Point', gradientFrom: '#1d4ed8', gradientTo: '#2563eb', accentColor: '#3b82f6', icon: <LifeBuoy size={28} />, img: '' },
  { id: 'it-technician', title: 'IT Technician', description: 'Install, maintain, and repair computer hardware, software, and peripherals.', category: 'IT Support', readTime: '9 min read', salary: 'R200k – R480k', level: 'Beginner', duration: '2–3 months', tags: ['Hardware', 'CompTIA A+', 'Repairs'], badge: 'Beginner Friendly', gradientFrom: '#475569', gradientTo: '#334155', accentColor: '#64748b', icon: <Wrench size={28} />, img: '' },
  { id: 'service-desk-analyst', title: 'Service Desk Analyst', description: 'Be the central hub of IT support. Triage, log, and resolve incidents using ITSM tools.', category: 'IT Support', readTime: '10 min read', salary: 'R200k – R480k', level: 'Beginner', duration: '2–4 months', tags: ['ServiceNow', 'ITIL', 'SLA Management'], badge: 'Great Entry Point', gradientFrom: '#0891b2', gradientTo: '#0e7490', accentColor: '#0891b2', icon: <HeadphonesIcon size={28} />, img: '' },
  { id: 'customer-it-support', title: 'Customer IT Support', description: 'Guide customers through technical issues over phone, chat, or email.', category: 'IT Support', readTime: '9 min read', salary: 'R180k – R420k', level: 'Beginner', duration: '2–3 months', tags: ['CRM Tools', 'Communication', 'Remote Support'], badge: 'No Experience Needed', gradientFrom: '#059669', gradientTo: '#047857', accentColor: '#10b981', icon: <UserCheck size={28} />, img: '' },
  // ── Security ───────────────────────────────────────────────────────────────
  { id: 'cybersecurity-specialist', title: 'Cybersecurity Specialist', description: 'Every company on earth needs protection. Learn ethical hacking, network defence, and incident response.', category: 'Security', readTime: '18 min read', salary: 'R750k – R1.6M', level: 'Advanced', duration: '9–12 months', tags: ['Ethical Hacking', 'SIEM', 'CompTIA'], trending: true, badge: 'Critical Demand', gradientFrom: '#ef4444', gradientTo: '#f97316', accentColor: '#ef4444', icon: <Shield size={28} />, img: '' },
  { id: 'cybersecurity-analyst', title: 'Cybersecurity Analyst', description: 'Monitor networks, hunt threats, and respond to incidents. The first line of defence against attackers.', category: 'Security', readTime: '16 min read', salary: 'R600k – R1.4M', level: 'Intermediate', duration: '7–10 months', tags: ['SIEM', 'Threat Intel', 'CompTIA'], trending: true, gradientFrom: '#dc2626', gradientTo: '#b91c1c', accentColor: '#dc2626', icon: <AlertTriangle size={28} />, img: '' },
  { id: 'cybersecurity-engineer', title: 'Cybersecurity Engineer', description: 'Architect and implement the security systems that protect entire organisations.', category: 'Security', readTime: '18 min read', salary: 'R800k – R1.9M', level: 'Advanced', duration: '10–14 months', tags: ['Zero Trust', 'PKI', 'CISSP'], trending: true, badge: 'Top Earner', gradientFrom: '#7f1d1d', gradientTo: '#991b1b', accentColor: '#ef4444', icon: <ShieldCheck size={28} />, img: '' },
  { id: 'information-technology', title: 'Information Security Analyst', description: 'Protect sensitive data and ensure compliance with security frameworks.', category: 'Security', readTime: '15 min read', salary: 'R550k – R1.3M', level: 'Intermediate', duration: '7–10 months', tags: ['ISO 27001', 'Risk Analysis', 'GRC'], gradientFrom: '#9f1239', gradientTo: '#be123c', accentColor: '#f43f5e', icon: <Search size={28} />, img: '' },
  { id: 'security-engineer', title: 'Security Engineer', description: 'Build and maintain security tooling, infrastructure defences, and automated security pipelines at scale.', category: 'Security', readTime: '16 min read', salary: 'R700k – R1.7M', level: 'Advanced', duration: '9–12 months', tags: ['Firewalls', 'IDS/IPS', 'Python'], trending: true, gradientFrom: '#1e1b4b', gradientTo: '#312e81', accentColor: '#6d28d9', icon: <Lock size={28} />, img: '' },
  { id: 'ethical-hacker', title: 'Ethical Hacker (Pen Tester)', description: 'Get paid to break things legally. One of the most exciting and highest-paying careers in cybersecurity.', category: 'Security', readTime: '17 min read', salary: 'R700k – R1.7M', level: 'Advanced', duration: '9–12 months', tags: ['Kali Linux', 'Metasploit', 'OSCP'], badge: 'High Demand', trending: true, gradientFrom: '#1e1b4b', gradientTo: '#312e81', accentColor: '#6d28d9', icon: <Fingerprint size={28} />, img: '' },
  { id: 'soc-analyst', title: 'SOC Analyst', description: 'Monitor, triage and respond to threats in real time. The heartbeat of enterprise security.', category: 'Security', readTime: '14 min read', salary: 'R500k – R1.1M', level: 'Beginner', duration: '5–8 months', tags: ['Splunk', 'SIEM', 'Incident Response'], badge: 'Great Entry Point', gradientFrom: '#dc2626', gradientTo: '#9f1239', accentColor: '#e11d48', icon: <Monitor size={28} />, img: '' },
  { id: 'cloud-security-engineer', title: 'Cloud Security Engineer', description: 'Secure cloud-native environments across AWS, Azure, and GCP.', category: 'Security', readTime: '16 min read', salary: 'R750k – R1.8M', level: 'Advanced', duration: '9–13 months', tags: ['AWS Security', 'IAM', 'CSPM'], trending: true, gradientFrom: '#0c4a6e', gradientTo: '#1e3a5f', accentColor: '#0369a1', icon: <Cloud size={28} />, img: '' },
  { id: 'security-operations-engineer', title: 'Security Operations Engineer', description: 'Build and optimise the tools, automation, and processes inside a Security Operations Centre.', category: 'Security', readTime: '15 min read', salary: 'R650k – R1.5M', level: 'Intermediate', duration: '7–10 months', tags: ['SOAR', 'SIEM', 'Automation'], gradientFrom: '#7f1d1d', gradientTo: '#991b1b', accentColor: '#dc2626', icon: <ServerCog size={28} />, img: '' },
  // ── Design ─────────────────────────────────────────────────────────────────
  { id: 'ux-ui-designer', title: 'UX/UI Designer', description: 'Design is the difference between products people love and ones they abandon. Master Figma and build a portfolio.', category: 'Design', readTime: '14 min read', salary: 'R450k – R900k', level: 'Beginner', duration: '4–6 months', tags: ['Figma', 'User Research', 'Prototyping'], gradientFrom: '#ec4899', gradientTo: '#a855f7', accentColor: '#ec4899', icon: <Palette size={28} />, img: '' },
  // ── Business ───────────────────────────────────────────────────────────────
  { id: 'product-manager', title: 'Product Manager', description: "The CEO of the product. Great at people, strategy, and bridging business with tech? This role is for you.", category: 'Business', readTime: '14 min read', salary: 'R700k – R1.5M', level: 'Intermediate', duration: '5–8 months', tags: ['Strategy', 'Agile', 'Analytics'], badge: 'Leadership Track', gradientFrom: '#f59e0b', gradientTo: '#f97316', accentColor: '#f59e0b', icon: <Briefcase size={28} />, img: '' },
  { id: 'business-analyst', title: 'Business Analyst', description: 'Bridge the gap between business needs and technology. Analyse processes and drive meaningful change.', category: 'Business', readTime: '13 min read', salary: 'R500k – R1.1M', level: 'Intermediate', duration: '5–7 months', tags: ['Requirements', 'BPMN', 'Agile'], gradientFrom: '#b45309', gradientTo: '#92400e', accentColor: '#d97706', icon: <BarChart2 size={28} />, img: '' },
  { id: 'scrum-master', title: 'Scrum Master / Agile Coach', description: 'Facilitate agile ceremonies and coach teams to self-organise. The heartbeat of every high-performing dev team.', category: 'Business', readTime: '12 min read', salary: 'R500k – R1.1M', level: 'Intermediate', duration: '3–5 months', tags: ['Scrum', 'Jira', 'SAFe'], gradientFrom: '#7c3aed', gradientTo: '#6d28d9', accentColor: '#8b5cf6', icon: <Users size={28} />, img: '' },
  { id: 'project-manager', title: 'Project Manager', description: 'Lead teams, manage timelines, and deliver results. PMs are the engine behind every successful product launch.', category: 'Business', readTime: '13 min read', salary: 'R550k – R1.3M', level: 'Intermediate', duration: '4–7 months', tags: ['PMP', 'MS Project', 'Risk Mgmt'], badge: 'Leadership Track', gradientFrom: '#0f766e', gradientTo: '#0d9488', accentColor: '#0d9488', icon: <Briefcase size={28} />, img: '' },
  // ── Marketing ──────────────────────────────────────────────────────────────
  { id: 'digital-marketer', title: 'Digital Marketer', description: 'Learn SEO, paid ads, content strategy, and analytics — help brands grow in the digital economy.', category: 'Marketing', readTime: '12 min read', salary: 'R350k – R800k', level: 'Beginner', duration: '3–5 months', tags: ['SEO', 'Google Ads', 'Analytics'], gradientFrom: '#10b981', gradientTo: '#06b6d4', accentColor: '#10b981', icon: <Megaphone size={28} />, img: '' },
]

/* ─── HELPERS ─────────────────────────────────────────────────────────────── */
function useFadeIn(skip = false) {
  const ref = useRef<HTMLElement>(null)
  const [v, setV] = useState<boolean>(skip)
  useEffect(() => {
    if (skip) { setV(true); return }
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [skip])
  return { ref, cls: v ? 'ap-fade visible' : 'ap-fade' }
}

const CustomSelect: React.FC<{
  label: string; options: string[]; value: string; onChange: (v: string) => void
}> = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div ref={ref} className={`ap-select-wrap${open ? ' open' : ''}`}>
      <div className="ap-select-trigger" onClick={() => setOpen(o => !o)}>
        {value === options[0] ? label : value}
        <svg className="ap-select-arrow" viewBox="0 0 512 512">
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
      </div>
      <div className="ap-select-dropdown">
        {options.map(opt => (
          <div
            key={opt}
            className={`ap-select-option${value === opt ? ' selected' : ''}`}
            onClick={() => { onChange(opt); setOpen(false) }}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── ROADMAP CARD ────────────────────────────────────────────────────────── */
const RoadmapCard: React.FC<{
  card: Card; delay: number; isHighlighted?: boolean
  cardRef?: React.RefObject<HTMLAnchorElement>
}> = ({ card, delay, isHighlighted, cardRef }) => {
  const { ref, cls } = useFadeIn(!!cardRef)
  return (
    <Link
      ref={cardRef ?? (ref as unknown as React.RefObject<HTMLAnchorElement>)}
      id={`card-${card.id}`}
      to={`/roadmaps/${card.id}`}
      className={`ap-card ${cls}${isHighlighted ? ' ap-card-highlight' : ''}`}
      style={{ transitionDelay: `${delay}s`, '--accent': card.accentColor } as React.CSSProperties}
    >
      <div className="ap-card-banner" style={{ background: `linear-gradient(135deg, ${card.gradientFrom}, ${card.gradientTo})` }}>
        <div className="ap-card-banner-shimmer" />
        <div style={{ position: 'absolute', width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', top: -30, right: -20 }} />
        <div style={{ position: 'absolute', width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', bottom: -20, left: 20 }} />
        <span className="ap-card-category-pill">{card.category}</span>
        <div className="ap-card-icon-box" style={{ position: 'absolute', bottom: 14, right: 14, width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.accentColor, boxShadow: '0 2px 12px rgba(0,0,0,0.18)', border: '2px solid rgba(255,255,255,0.85)' }}>
          {card.icon}
        </div>
      </div>
      <div className="ap-card-body">
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          {card.trending && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.65rem', fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: '#fef3c7', color: '#d97706' }}>
              <TrendingUp size={10} /> Trending
            </span>
          )}
          {card.badge && (
            <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: card.accentColor + '18', color: card.accentColor, border: `1px solid ${card.accentColor}30` }}>
              {card.badge}
            </span>
          )}
          <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '0.65rem', fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: '#dcfce7', color: '#16a34a' }}>
            💰 {card.salary}
          </span>
        </div>
        <div className="ap-card-title">{card.title}</div>
        <div className="ap-card-desc">{card.description}</div>
        <div style={{ display: 'flex', gap: 7, marginBottom: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: levelColor[card.level], background: levelColor[card.level] + '18', borderRadius: 999, padding: '3px 9px' }}>{card.level}</span>
          <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748b', background: '#f1f5f9', borderRadius: 999, padding: '3px 9px' }}>⏱ {card.duration}</span>
        </div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 14 }}>
          {card.tags.map(t => (
            <span key={t} style={{ fontSize: '0.62rem', fontWeight: 600, color: '#475569', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, padding: '2px 7px' }}>{t}</span>
          ))}
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.72rem', color: '#9ca3af', fontWeight: 400 }}><Clock size={12} /> {card.readTime}</span>
          <span style={{ color: card.accentColor, display: 'flex', alignItems: 'center', gap: 4, fontSize: '12.5px', fontWeight: 600 }}>
            View Roadmap <span className="ap-read-arrow"><ArrowRight size={13} /></span>
          </span>
        </div>
      </div>
    </Link>
  )
}

/* ─── CONSTANTS ───────────────────────────────────────────────────────────── */
const QUICK_CHIPS       = ['React', 'Python', 'Figma', 'AWS', 'SQL', 'LLMs', 'Security', 'IT Support', 'AI']
const SEARCH_CATEGORIES = ['All', 'Tech', 'AI & Data', 'Security', 'IT Support', 'Design', 'Business', 'Marketing']
const CATEGORY_OPTIONS  = ['All', 'Tech', 'AI & Data', 'Security', 'IT Support', 'Design', 'Business', 'Marketing']
const LEVEL_OPTIONS     = ['All Levels', 'Beginner', 'Intermediate', 'Advanced']
const WORKSTYLE_OPTIONS = ['Any Style', 'Remote', 'On-site', 'Hybrid', 'Freelance']
const CARDS_PER_PAGE    = 12
const MARQUEE_ITEMS     = ['AI & ML Engineer', 'Frontend Developer', 'Cybersecurity Specialist', 'Data Scientist', 'Cloud & DevOps', 'UX/UI Designer', 'Backend Developer', 'Product Manager', 'Digital Marketer', 'Full Stack Dev', 'Data Analyst', 'Blockchain Dev', 'IT Support Specialist', 'SOC Analyst', 'AI Engineer', 'Systems Admin']
const AVATARS = [{ bg: '#6366f1', letter: 'S' }, { bg: '#ec4899', letter: 'T' }, { bg: '#f59e0b', letter: 'A' }, { bg: '#10b981', letter: 'M' }]

/* ─── PAGE ────────────────────────────────────────────────────────────────── */
export default function RoadmapsPage() {
  const [search,          setSearch]          = useState('')
  const [activeCategory,  setActiveCategory]  = useState('All')
  const [activeLevel,     setActiveLevel]     = useState('All Levels')
  const [activeWorkStyle, setActiveWorkStyle] = useState('Any Style')
  const [highlightId,     setHighlightId]     = useState<string | null>(null)
  const [currentPage,     setCurrentPage]     = useState(1)

  const cardRefs = useRef<Record<string, React.RefObject<HTMLAnchorElement>>>(
    Object.fromEntries(CARDS.map(c => [c.id, React.createRef<HTMLAnchorElement>()])) as Record<string, React.RefObject<HTMLAnchorElement>>
  )
  const gridTopRef = useRef<HTMLDivElement>(null)

  const filtered = CARDS.filter(c => {
    const matchCat    = activeCategory === 'All' || c.category === activeCategory
    const matchLevel  = activeLevel === 'All Levels' || c.level === activeLevel
    const matchSearch = !search
      || c.title.toLowerCase().includes(search.toLowerCase())
      || c.description.toLowerCase().includes(search.toLowerCase())
      || c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return matchCat && matchLevel && matchSearch
  })

  useEffect(() => {
    if (!search.trim()) { setHighlightId(null); return }
    if (!filtered.length) { setHighlightId(null); return }
    const first = filtered[0]; setHighlightId(first.id)
    const t = setTimeout(() => {
      cardRefs.current[first.id]?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 80)
    return () => clearTimeout(t)
  }, [search, activeCategory, activeLevel])

  useEffect(() => { setCurrentPage(1) }, [search, activeCategory, activeLevel])

  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE)
  const paginated  = filtered.slice((currentPage - 1) * CARDS_PER_PAGE, currentPage * CARDS_PER_PAGE)

  const goToPage = (p: number) => {
    setCurrentPage(p)
    setTimeout(() => gridTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
  }

  const marqueeDouble = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  const beginnerCount = CARDS.filter(c => c.level === 'Beginner').length

  return (
    <div className="ap-root">
      <GlobalStyles />
      <Navbar />

      {/* ── HERO ── */}
      <section className="ap-hero" style={{ marginTop: 76 }}>
        <div className="ap-hero-blob1" /><div className="ap-hero-blob2" /><div className="ap-hero-blob3" />
        <div className="ap-hero-inner">
          <div className="ap-hero-left">
            <div className="ap-hero-badge"><Sparkles size={11} /> New Paths Added Weekly</div>
            <h1>Explore <em>Career</em><br />Roadmaps 🚀</h1>
            <p>Search, filter, and find the right path. Your journey from zero to hired — mapped out step by step.</p>

            <div className="ap-hero-search-group">
              <svg className="ap-hero-search-icon" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
              </svg>
              <input
                className="ap-hero-search-input"
                placeholder="Search for your dream career..."
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="ap-hero-chips">
              <span className="ap-hero-chips-label">Popular:</span>
              {QUICK_CHIPS.map(chip => (
                <button key={chip} className="ap-hero-chip" onClick={() => setSearch(chip)}>{chip}</button>
              ))}
            </div>

            <div className="ap-hero-filters">
              <CustomSelect label="Category"   options={CATEGORY_OPTIONS}  value={activeCategory}  onChange={setActiveCategory}  />
              <CustomSelect label="Level"      options={LEVEL_OPTIONS}     value={activeLevel}     onChange={setActiveLevel}     />
              <CustomSelect label="Work Style" options={WORKSTYLE_OPTIONS} value={activeWorkStyle} onChange={setActiveWorkStyle} />
              {(activeCategory !== 'All' || activeLevel !== 'All Levels' || activeWorkStyle !== 'Any Style' || search) && (
                <button className="ap-clear-link" onClick={() => { setSearch(''); setActiveCategory('All'); setActiveLevel('All Levels'); setActiveWorkStyle('Any Style') }}>
                  Clear all
                </button>
              )}
            </div>

            <div className="ap-hero-stats">
              {[
                { icon: <BookOpen size={16} color="#818cf8" />, val: `${CARDS.length}+`,  lbl: 'Career Roadmaps' },
                { icon: <Users    size={16} color="#34d399" />, val: '28k+', lbl: 'Active Learners'  },
                { icon: <Award    size={16} color="#fbbf24" />, val: '94%',  lbl: 'Job Placement'    },
              ].map(s => (
                <div key={s.lbl} className="ap-hero-stat">
                  <div className="ap-hero-stat-icon">{s.icon}</div>
                  <div>
                    <div className="ap-hero-stat-val">{s.val}</div>
                    <div className="ap-hero-stat-lbl">{s.lbl}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="ap-hero-trust">
              <div className="ap-avatar-stack">
                {AVATARS.map(a => <div key={a.letter} className="ap-avatar" style={{ background: a.bg }}>{a.letter}</div>)}
              </div>
              <span className="ap-trust-text">Trusted by <strong>28,000+</strong> learners worldwide</span>
            </div>
          </div>

          <div className="ap-hero-right">
            <img
              src="https://i.imgur.com/2G29ZeN.png"
              alt="Hiker climbing toward a mountain peak"
              className="ap-hero-illustration"
            />
          </div>
        </div>

        <div className="ap-marquee-wrap">
          <div className="ap-marquee-track">
            {marqueeDouble.map((item, i) => (
              <div key={i} className="ap-marquee-item">
                <div className="ap-marquee-dot" /><span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN ── */}
      <div className="ap-main">

        {/* Beginner banner */}
        <div style={{ background: 'linear-gradient(135deg, #ecfdf5, #eff6ff)', border: '1.5px solid #a7f3d0', borderRadius: 16, padding: '18px 22px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <BookOpen size={20} color="#16a34a" />
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#111', marginBottom: 3 }}>New to tech? Start here 👋</div>
            <div style={{ fontSize: '0.8rem', color: '#475569' }}>
              We have <strong>{beginnerCount} beginner-friendly</strong> career paths — including IT Support, Help Desk, Web Developer, and more. No degree or experience required.
            </div>
          </div>
          <button
            onClick={() => { setActiveLevel('Beginner'); setActiveCategory('All'); setSearch('') }}
            style={{ padding: '9px 20px', borderRadius: 10, border: 'none', background: '#16a34a', color: '#fff', fontWeight: 700, fontSize: '0.83rem', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', whiteSpace: 'nowrap' }}
          >
            Show Beginner Paths
          </button>
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {SEARCH_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{ padding: '6px 16px', borderRadius: 999, border: `1.5px solid ${activeCategory === cat ? '#2563eb' : '#e5e7eb'}`, background: activeCategory === cat ? '#eff6ff' : '#fff', color: activeCategory === cat ? '#1d4ed8' : '#374151', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s' }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={gridTopRef} style={{ scrollMarginTop: 24 }} />

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
            <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>No roadmaps found</div>
            <div style={{ fontSize: '0.85rem' }}>Try a different search term or clear your filters</div>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 16, fontSize: '0.82rem', color: '#6b7280', fontWeight: 500 }}>
              Showing <strong style={{ color: '#111' }}>{paginated.length}</strong> of{' '}
              <strong style={{ color: '#111' }}>{filtered.length}</strong> careers
              {search && <span> for &ldquo;<strong style={{ color: '#2563eb' }}>{search}</strong>&rdquo;</span>}
              &nbsp;&nbsp;·&nbsp;&nbsp;Page <strong style={{ color: '#111' }}>{currentPage}</strong> of <strong style={{ color: '#111' }}>{totalPages}</strong>
            </div>

            <div className="ap-grid">
              {paginated.map((card, i) => (
                <RoadmapCard
                  key={card.id}
                  card={card}
                  delay={i * 0.05}
                  isHighlighted={highlightId === card.id}
                  cardRef={cardRefs.current[card.id]}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 40, flexWrap: 'wrap' }}>
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: currentPage === 1 ? '#f8fafc' : '#fff', color: currentPage === 1 ? '#cbd5e1' : '#374151', fontSize: '0.85rem', fontWeight: 600, cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s' }}
                >
                  <ChevronLeft size={15} /> Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    style={{ width: 40, height: 40, borderRadius: 10, border: `1.5px solid ${p === currentPage ? '#2563eb' : '#e2e8f0'}`, background: p === currentPage ? '#2563eb' : '#fff', color: p === currentPage ? '#fff' : '#374151', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s', boxShadow: p === currentPage ? '0 2px 8px rgba(37,99,235,0.3)' : 'none' }}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 10, border: '1.5px solid #e2e8f0', background: currentPage === totalPages ? '#f8fafc' : '#fff', color: currentPage === totalPages ? '#cbd5e1' : '#374151', fontSize: '0.85rem', fontWeight: 600, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s' }}
                >
                  Next <ArrowRight size={15} />
                </button>
              </div>
            )}
          </>
        )}

        <div className="ap-cta">
          <h2>Still not sure? Start exploring beginner-friendly guides.</h2>
          <p>Our curated starter guides are designed for those making their first career pivot into tech.</p>
          <button
            className="ap-cta-btn"
            onClick={() => { setActiveLevel('Beginner'); setActiveCategory('All'); setSearch(''); gridTopRef.current?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            Show Beginner Paths <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  )
}