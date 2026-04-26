import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ChevronDown,
  Shield, Cloud, BarChart2, Bot, Code2, Palette,
  Briefcase, Megaphone, Sparkles, TrendingUp,
  CheckCircle2, Users, Zap, BookOpen, Award,
  Globe, Monitor, Activity, Clock,
  Database, Layers, Network, Gamepad2, Smartphone,
  Bug, ServerCog, Fingerprint, AlertTriangle,
  Blocks, ChevronLeft,
  Loader2, Star, ChevronRight, Cpu, HardDrive,
  LifeBuoy, Settings, Lock, Search, Radio,
  ShieldCheck, UserCheck, HeadphonesIcon, Wrench,
} from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { Newsletter, Footer } from '../components/Footer'

// ⚠️  SECURITY WARNING: Never commit API keys to version control or share them publicly.
// Rotate this key immediately at console.groq.com if it has been exposed.
const GROQ_API_KEY = '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'
const GROQ_MODEL   = 'llama3-70b-8192'

/* ─── TYPES ───────────────────────────────────────────────────────────────── */
interface Card {
  id: string; title: string; description: string; category: string
  readTime: string; salary: string; level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string; tags: string[]; trending?: boolean; badge?: string
  gradientFrom: string; gradientTo: string; accentColor: string
  icon: React.ReactNode; img: string
}
interface QuizOption { icon: React.ReactNode; bg: string; label: string; desc: string }
interface Question   { text: string; options: QuizOption[] }

interface AIMatch {
  id: string
  title: string
  reason: string
  fit: number
}

/* ─── GROQ CALL ───────────────────────────────────────────────────────────── */
async function callGroq(systemPrompt: string, userMessage: string): Promise<string> {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: 0.4,
      max_tokens: 800,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userMessage   },
      ],
    }),
  })
  if (!res.ok) throw new Error(`Groq API error: ${res.status}`)
  const data = await res.json()
  return data.choices?.[0]?.message?.content ?? ''
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

    /* ── QUIZ ── */
    .ap-quiz-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 20px; margin-bottom: 36px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
    .ap-quiz-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 24px; cursor: pointer; border-bottom: 1px solid transparent; transition: border-color 0.2s; }
    .ap-quiz-header.open { border-bottom-color: #f3f4f6; }
    .ap-quiz-header-left { display: flex; align-items: center; gap: 14px; }
    .ap-quiz-icon { width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, #dbeafe, #ede9fe); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .ap-quiz-title { font-weight: 700; font-size: 0.95rem; color: #111; }
    .ap-quiz-sub { font-size: 0.78rem; color: #9ca3af; margin-top: 2px; }
    .ap-quiz-body { padding: 28px 24px 28px; }
    .ap-quiz-progress-label { display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 600; color: #6b7280; margin-bottom: 8px; }
    .ap-quiz-progress-track { height: 5px; background: #e5e7eb; border-radius: 999px; margin-bottom: 24px; }
    .ap-quiz-progress-bar { height: 5px; background: linear-gradient(90deg, #2563eb, #7c3aed); border-radius: 999px; transition: width 0.5s cubic-bezier(0.4,0,0.2,1); }
    .ap-quiz-q { font-size: 1.05rem; font-weight: 700; color: #111827; text-align: center; margin-bottom: 20px; line-height: 1.4; }
    .ap-quiz-options { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
    @media(max-width: 640px) { .ap-quiz-options { grid-template-columns: 1fr; } }
    .ap-quiz-option {
      display: flex; align-items: flex-start; gap: 10px; padding: 14px 16px;
      border-radius: 12px; border: 1.5px solid #e5e7eb; background: #fff; cursor: pointer;
      text-align: left; font-family: 'Plus Jakarta Sans', sans-serif; transition: all 0.18s;
    }
    .ap-quiz-option:hover { border-color: #2563eb; background: #eff6ff; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(37,99,235,0.1); }
    .ap-quiz-option.selected { border-color: #2563eb; background: #eff6ff; box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
    .ap-quiz-opt-icon { width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .ap-quiz-opt-label { font-size: 0.87rem; font-weight: 700; color: #111; }
    .ap-quiz-opt-desc { font-size: 0.75rem; color: #9ca3af; margin-top: 2px; }
    .ap-quiz-footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .ap-skip-btn { background: none; border: none; font-size: 0.83rem; color: #9ca3af; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px 0; }
    .ap-skip-btn:hover { color: #6b7280; }
    .ap-next-btn {
      background: linear-gradient(135deg, #1d4ed8, #2563eb); color: #fff; border: none;
      padding: 11px 28px; border-radius: 10px; font-size: 0.9rem; font-weight: 700;
      cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; transition: all 0.15s;
      display: flex; align-items: center; gap: 8px;
      box-shadow: 0 2px 8px rgba(37,99,235,0.3);
    }
    .ap-next-btn:hover { background: linear-gradient(135deg, #1e40af, #1d4ed8); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(37,99,235,0.4); }
    .ap-next-btn:disabled { background: #93c5fd; cursor: not-allowed; box-shadow: none; transform: none; }

    /* ── FREE TEXT STEP ── */
    .ap-quiz-textarea {
      width: 100%; min-height: 130px; padding: 14px 16px;
      border: 1.5px solid #e2e8f0; border-radius: 12px; outline: none; resize: vertical;
      font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.9rem; color: #111827;
      line-height: 1.65; background: #f8fafc; transition: all 0.2s;
      margin-bottom: 8px;
    }
    .ap-quiz-textarea:focus { border-color: #93c5fd; background: #fff; box-shadow: 0 0 0 4px rgba(59,130,246,0.1); }
    .ap-quiz-textarea::placeholder { color: #94a3b8; }
    .ap-quiz-textarea.error { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.1); }
    .ap-quiz-char-count { font-size: 0.75rem; text-align: right; margin-bottom: 20px; }
    .ap-quiz-validation-msg { font-size: 0.78rem; color: #ef4444; font-weight: 600; margin-bottom: 12px; display: flex; align-items: center; gap: 5px; }

    /* ── AI LOADING ── */
    .ap-quiz-loading {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 40px 20px; gap: 16px; text-align: center;
    }
    .ap-quiz-loading-spinner {
      width: 52px; height: 52px; border-radius: 50%;
      background: linear-gradient(135deg, #dbeafe, #ede9fe);
      display: flex; align-items: center; justify-content: center;
      animation: ap-spin 1s linear infinite;
    }
    @keyframes ap-spin { to { transform: rotate(360deg); } }
    .ap-quiz-loading-title { font-size: 1rem; font-weight: 700; color: #111; }
    .ap-quiz-loading-sub { font-size: 0.82rem; color: #9ca3af; }
    .ap-typing-dots span {
      display: inline-block; width: 6px; height: 6px; border-radius: 50%;
      background: #2563eb; margin: 0 2px;
      animation: ap-typing 1.2s ease-in-out infinite;
    }
    .ap-typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .ap-typing-dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes ap-typing { 0%,60%,100%{transform:translateY(0);opacity:0.4} 30%{transform:translateY(-6px);opacity:1} }

    /* ── AI RESULTS ── */
    .ap-results-header { text-align: center; margin-bottom: 24px; }
    .ap-results-icon {
      width: 60px; height: 60px; border-radius: 50%; background: #dcfce7;
      display: flex; align-items: center; justify-content: center; margin: 0 auto 14px;
    }
    .ap-results-title { font-family: 'Fraunces', serif; font-size: 1.3rem; font-weight: 700; color: #111; margin-bottom: 6px; }
    .ap-results-sub { font-size: 0.85rem; color: #6b7280; line-height: 1.6; max-width: 500px; margin: 0 auto; }
    .ap-match-cards { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
    .ap-match-card {
      display: flex; align-items: flex-start; gap: 14px; padding: 16px 18px;
      border-radius: 14px; border: 1.5px solid #e5e7eb; background: #f8fafc;
      transition: all 0.2s; cursor: pointer; text-decoration: none; color: inherit;
    }
    .ap-match-card:hover { border-color: #2563eb; background: #eff6ff; transform: translateX(3px); box-shadow: 0 4px 16px rgba(37,99,235,0.1); }
    .ap-match-rank {
      width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center;
      justify-content: center; font-size: 0.85rem; font-weight: 800; flex-shrink: 0;
    }
    .ap-match-body { flex: 1; min-width: 0; }
    .ap-match-title { font-size: 0.95rem; font-weight: 700; color: #111; margin-bottom: 4px; }
    .ap-match-reason { font-size: 0.8rem; color: #6b7280; line-height: 1.5; }
    .ap-match-fit { display: flex; align-items: center; gap: 6px; margin-top: 8px; }
    .ap-match-fit-bar { flex: 1; height: 4px; background: #e5e7eb; border-radius: 999px; overflow: hidden; }
    .ap-match-fit-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #2563eb, #7c3aed); }
    .ap-match-fit-label { font-size: 0.7rem; font-weight: 700; color: #2563eb; white-space: nowrap; }
    .ap-match-arrow { color: #2563eb; flex-shrink: 0; margin-top: 2px; }
    .ap-results-actions { display: flex; gap: 10px; flex-wrap: wrap; }
    .ap-retake-btn {
      background: none; border: 1.5px solid #e2e8f0; padding: 10px 20px; border-radius: 10px;
      font-size: 0.85rem; font-weight: 600; color: #374151; cursor: pointer;
      font-family: 'Plus Jakarta Sans', sans-serif; transition: all 0.15s;
    }
    .ap-retake-btn:hover { border-color: #2563eb; color: #2563eb; background: #eff6ff; }
    .ap-error-box {
      background: #fef2f2; border: 1.5px solid #fecaca; border-radius: 12px;
      padding: 16px; font-size: 0.85rem; color: #dc2626; margin-bottom: 20px;
      display: flex; align-items: flex-start; gap: 10px;
    }

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
  { id: 'site-reliability-engineer', title: 'Site Reliability Engineer', description: 'Keep large-scale systems running at peak performance. SREs earn top-of-market salaries and own production reliability.', category: 'Tech', readTime: '16 min read', salary: 'R750k – R1.7M', level: 'Advanced', duration: '9–13 months', tags: ['SLOs', 'Prometheus', 'Kubernetes'], trending: true, gradientFrom: '#0c4a6e', gradientTo: '#075985', accentColor: '#0369a1', icon: <Activity size={28} />, img: '' },
  { id: 'systems-engineer', title: 'Systems Engineer', description: 'Design and manage the complex systems that underpin enterprise infrastructure. High impact, high pay.', category: 'Tech', readTime: '15 min read', salary: 'R600k – R1.4M', level: 'Intermediate', duration: '7–10 months', tags: ['Linux', 'Networking', 'Scripting'], gradientFrom: '#1e3a5f', gradientTo: '#1e40af', accentColor: '#3b82f6', icon: <HardDrive size={28} />, img: '' },
  { id: 'systems-administrator', title: 'Systems Administrator', description: 'Keep servers, networks, and IT infrastructure running smoothly. A reliable, well-paying role that is always in demand.', category: 'Tech', readTime: '13 min read', salary: 'R350k – R850k', level: 'Beginner', duration: '4–7 months', tags: ['Windows Server', 'Linux', 'Active Directory'], badge: 'Beginner Friendly', gradientFrom: '#1d4ed8', gradientTo: '#2563eb', accentColor: '#3b82f6', icon: <Settings size={28} />, img: '' },
  { id: 'network-engineer', title: 'Network Engineer', description: 'Design and manage the networks that connect the modern world. Everything runs on the foundation you build.', category: 'Tech', readTime: '14 min read', salary: 'R550k – R1.2M', level: 'Intermediate', duration: '7–10 months', tags: ['Cisco', 'BGP', 'Network+'], gradientFrom: '#164e63', gradientTo: '#155e75', accentColor: '#0e7490', icon: <Network size={28} />, img: '' },
  { id: 'solutions-architect', title: 'Solutions Architect', description: 'Design technical solutions aligned to business goals. Between sales, engineering and client — earns extremely well.', category: 'Tech', readTime: '15 min read', salary: 'R900k – R2M', level: 'Advanced', duration: '6–9 months', tags: ['AWS SAA', 'System Design', 'Cloud'], badge: 'Top Earner', gradientFrom: '#0c4a6e', gradientTo: '#075985', accentColor: '#0369a1', icon: <Layers size={28} />, img: '' },
  { id: 'iot-engineer', title: 'IoT Engineer', description: 'Connect the physical and digital worlds. Build smart devices, sensors, and embedded systems that power Industry 4.0.', category: 'Tech', readTime: '15 min read', salary: 'R550k – R1.3M', level: 'Intermediate', duration: '7–10 months', tags: ['MQTT', 'Embedded C', 'AWS IoT'], gradientFrom: '#065f46', gradientTo: '#047857', accentColor: '#059669', icon: <Radio size={28} />, img: '' },
  { id: 'blockchain-developer', title: 'Blockchain Developer', description: 'Build the decentralised web. Write smart contracts and DeFi protocols reshaping finance and ownership.', category: 'Tech', readTime: '18 min read', salary: 'R800k – R2M', level: 'Advanced', duration: '10–14 months', tags: ['Solidity', 'Ethereum', 'Web3.js'], badge: 'Future Tech', gradientFrom: '#f59e0b', gradientTo: '#d97706', accentColor: '#f59e0b', icon: <Blocks size={28} />, img: '' },
  { id: 'game-developer', title: 'Game Developer', description: 'Turn creative ideas into interactive worlds. The global games industry is worth $200B+.', category: 'Tech', readTime: '15 min read', salary: 'R500k – R1.4M', level: 'Intermediate', duration: '8–12 months', tags: ['Unity', 'C#', 'Unreal Engine'], gradientFrom: '#dc2626', gradientTo: '#ea580c', accentColor: '#ea580c', icon: <Gamepad2 size={28} />, img: '' },
  { id: 'qa-engineer', title: 'QA Engineer', description: 'Catch bugs before users do. QA engineers own quality across the entire software lifecycle.', category: 'Tech', readTime: '12 min read', salary: 'R450k – R1M', level: 'Beginner', duration: '4–7 months', tags: ['Selenium', 'Jest', 'Cypress'], badge: 'Beginner Friendly', gradientFrom: '#166534', gradientTo: '#15803d', accentColor: '#16a34a', icon: <Bug size={28} />, img: '' },

  // ── IT Support & Entry-Level Tech ──────────────────────────────────────────
  { id: 'help-desk-technician', title: 'Help Desk Technician', description: 'First-line IT support. The perfect launchpad for a career in tech — no degree required. Learn ticketing, troubleshooting, and customer service.', category: 'IT Support', readTime: '10 min read', salary: 'R200k – R450k', level: 'Beginner', duration: '2–4 months', tags: ['Windows', 'ITIL', 'Ticketing'], badge: 'Great Entry Point', gradientFrom: '#0369a1', gradientTo: '#0284c7', accentColor: '#0284c7', icon: <Monitor size={28} />, img: '' },
  { id: 'it-support-specialist', title: 'IT Support Specialist', description: 'Resolve hardware, software, and network issues for employees and customers. A rock-solid foundation for any IT career — no prior experience needed.', category: 'IT Support', readTime: '10 min read', salary: 'R220k – R500k', level: 'Beginner', duration: '2–4 months', tags: ['Troubleshooting', 'Windows', 'Networking Basics'], badge: 'Great Entry Point', gradientFrom: '#1d4ed8', gradientTo: '#2563eb', accentColor: '#3b82f6', icon: <LifeBuoy size={28} />, img: '' },
  { id: 'it-technician', title: 'IT Technician', description: 'Install, maintain, and repair computer hardware, software, and peripherals. Hands-on work with real equipment — the quickest path into the IT industry.', category: 'IT Support', readTime: '9 min read', salary: 'R200k – R480k', level: 'Beginner', duration: '2–3 months', tags: ['Hardware', 'CompTIA A+', 'Repairs'], badge: 'Beginner Friendly', gradientFrom: '#475569', gradientTo: '#334155', accentColor: '#64748b', icon: <Wrench size={28} />, img: '' },
  { id: 'service-desk-analyst', title: 'Service Desk Analyst', description: 'Be the central hub of IT support. Triage, log, and resolve incidents using ITSM tools. Perfect for those who love helping people and solving problems.', category: 'IT Support', readTime: '10 min read', salary: 'R200k – R480k', level: 'Beginner', duration: '2–4 months', tags: ['ServiceNow', 'ITIL', 'SLA Management'], badge: 'Great Entry Point', gradientFrom: '#0891b2', gradientTo: '#0e7490', accentColor: '#0891b2', icon: <HeadphonesIcon size={28} />, img: '' },
  { id: 'customer-it-support', title: 'Customer IT Support', description: 'Guide customers through technical issues over phone, chat, or email. Combine soft skills with tech knowledge — an ideal starter role that pays steadily.', category: 'IT Support', readTime: '9 min read', salary: 'R180k – R420k', level: 'Beginner', duration: '2–3 months', tags: ['CRM Tools', 'Communication', 'Remote Support'], badge: 'No Experience Needed', gradientFrom: '#059669', gradientTo: '#047857', accentColor: '#10b981', icon: <UserCheck size={28} />, img: '' },

  // ── Security ───────────────────────────────────────────────────────────────
  { id: 'cybersecurity', title: 'Cybersecurity Specialist', description: 'Every company on earth needs protection. Learn ethical hacking, network defence, and incident response.', category: 'Security', readTime: '18 min read', salary: 'R750k – R1.6M', level: 'Advanced', duration: '9–12 months', tags: ['Ethical Hacking', 'SIEM', 'CompTIA'], trending: true, badge: 'Critical Demand', gradientFrom: '#ef4444', gradientTo: '#f97316', accentColor: '#ef4444', icon: <Shield size={28} />, img: '' },
  { id: 'cybersecurity-analyst', title: 'Cybersecurity Analyst', description: 'Monitor networks, hunt threats, and respond to incidents. The first line of defence against attackers.', category: 'Security', readTime: '16 min read', salary: 'R600k – R1.4M', level: 'Intermediate', duration: '7–10 months', tags: ['SIEM', 'Threat Intel', 'CompTIA'], trending: true, gradientFrom: '#dc2626', gradientTo: '#b91c1c', accentColor: '#dc2626', icon: <AlertTriangle size={28} />, img: '' },
  { id: 'cybersecurity-engineer', title: 'Cybersecurity Engineer', description: 'Architect and implement the security systems that protect entire organisations. A highly technical, highly paid specialisation.', category: 'Security', readTime: '18 min read', salary: 'R800k – R1.9M', level: 'Advanced', duration: '10–14 months', tags: ['Zero Trust', 'PKI', 'CISSP'], trending: true, badge: 'Top Earner', gradientFrom: '#7f1d1d', gradientTo: '#991b1b', accentColor: '#ef4444', icon: <ShieldCheck size={28} />, img: '' },
  { id: 'information-security-analyst', title: 'Information Security Analyst', description: 'Protect sensitive data and ensure compliance with security frameworks. A pivotal role in every regulated industry.', category: 'Security', readTime: '15 min read', salary: 'R550k – R1.3M', level: 'Intermediate', duration: '7–10 months', tags: ['ISO 27001', 'Risk Analysis', 'GRC'], gradientFrom: '#9f1239', gradientTo: '#be123c', accentColor: '#f43f5e', icon: <Search size={28} />, img: '' },
  { id: 'security-engineer', title: 'Security Engineer', description: 'Build and maintain security tooling, infrastructure defences, and automated security pipelines at scale.', category: 'Security', readTime: '16 min read', salary: 'R700k – R1.7M', level: 'Advanced', duration: '9–12 months', tags: ['Firewalls', 'IDS/IPS', 'Python'], trending: true, gradientFrom: '#1e1b4b', gradientTo: '#312e81', accentColor: '#6d28d9', icon: <Lock size={28} />, img: '' },
  { id: 'ethical-hacker', title: 'Ethical Hacker (Pen Tester)', description: 'Get paid to break things legally. One of the most exciting and highest-paying careers in cybersecurity.', category: 'Security', readTime: '17 min read', salary: 'R700k – R1.7M', level: 'Advanced', duration: '9–12 months', tags: ['Kali Linux', 'Metasploit', 'OSCP'], badge: 'High Demand', trending: true, gradientFrom: '#1e1b4b', gradientTo: '#312e81', accentColor: '#6d28d9', icon: <Fingerprint size={28} />, img: '' },
  { id: 'soc-analyst', title: 'SOC Analyst', description: 'Monitor, triage and respond to threats in real time. The heartbeat of enterprise security. Great entry point for security careers.', category: 'Security', readTime: '14 min read', salary: 'R500k – R1.1M', level: 'Beginner', duration: '5–8 months', tags: ['Splunk', 'SIEM', 'Incident Response'], badge: 'Great Entry Point', gradientFrom: '#dc2626', gradientTo: '#9f1239', accentColor: '#e11d48', icon: <Monitor size={28} />, img: '' },
  { id: 'cloud-security-engineer', title: 'Cloud Security Engineer', description: 'Secure cloud-native environments across AWS, Azure, and GCP. One of the fastest-growing specialisations in security.', category: 'Security', readTime: '16 min read', salary: 'R750k – R1.8M', level: 'Advanced', duration: '9–13 months', tags: ['AWS Security', 'IAM', 'CSPM'], trending: true, gradientFrom: '#0c4a6e', gradientTo: '#1e3a5f', accentColor: '#0369a1', icon: <Cloud size={28} />, img: '' },
  { id: 'security-operations-engineer', title: 'Security Operations Engineer', description: 'Build and optimise the tools, automation, and processes inside a Security Operations Centre. A high-impact technical role.', category: 'Security', readTime: '15 min read', salary: 'R650k – R1.5M', level: 'Intermediate', duration: '7–10 months', tags: ['SOAR', 'SIEM', 'Automation'], gradientFrom: '#7f1d1d', gradientTo: '#991b1b', accentColor: '#dc2626', icon: <ServerCog size={28} />, img: '' },

  // ── Design ─────────────────────────────────────────────────────────────────
  { id: 'ux-ui-designer', title: 'UX/UI Designer', description: 'Design is the difference between products people love and ones they abandon. Master Figma and build a portfolio from scratch.', category: 'Design', readTime: '14 min read', salary: 'R450k – R900k', level: 'Beginner', duration: '4–6 months', tags: ['Figma', 'User Research', 'Prototyping'], gradientFrom: '#ec4899', gradientTo: '#a855f7', accentColor: '#ec4899', icon: <Palette size={28} />, img: '' },

  // ── Business ───────────────────────────────────────────────────────────────
  { id: 'product-manager', title: 'Product Manager', description: "The CEO of the product. Great at people, strategy, and bridging business with tech? This role is for you.", category: 'Business', readTime: '14 min read', salary: 'R700k – R1.5M', level: 'Intermediate', duration: '5–8 months', tags: ['Strategy', 'Agile', 'Analytics'], badge: 'Leadership Track', gradientFrom: '#f59e0b', gradientTo: '#f97316', accentColor: '#f59e0b', icon: <Briefcase size={28} />, img: '' },
  { id: 'business-analyst', title: 'Business Analyst', description: 'Bridge the gap between business needs and technology. Analyse processes and drive meaningful change.', category: 'Business', readTime: '13 min read', salary: 'R500k – R1.1M', level: 'Intermediate', duration: '5–7 months', tags: ['Requirements', 'BPMN', 'Agile'], gradientFrom: '#b45309', gradientTo: '#92400e', accentColor: '#d97706', icon: <BarChart2 size={28} />, img: '' },
  { id: 'scrum-master', title: 'Scrum Master / Agile Coach', description: 'Facilitate agile ceremonies and coach teams to self-organise. The heartbeat of every high-performing dev team.', category: 'Business', readTime: '12 min read', salary: 'R500k – R1.1M', level: 'Intermediate', duration: '3–5 months', tags: ['Scrum', 'Jira', 'SAFe'], gradientFrom: '#7c3aed', gradientTo: '#6d28d9', accentColor: '#8b5cf6', icon: <Users size={28} />, img: '' },
  { id: 'project-manager', title: 'Project Manager', description: 'Lead teams, manage timelines, and deliver results. PMs are the engine behind every successful product launch.', category: 'Business', readTime: '13 min read', salary: 'R550k – R1.3M', level: 'Intermediate', duration: '4–7 months', tags: ['PMP', 'MS Project', 'Risk Mgmt'], badge: 'Leadership Track', gradientFrom: '#0f766e', gradientTo: '#0d9488', accentColor: '#0d9488', icon: <Briefcase size={28} />, img: '' },

  // ── Marketing ──────────────────────────────────────────────────────────────
  { id: 'digital-marketer', title: 'Digital Marketer', description: 'Learn SEO, paid ads, content strategy, and analytics — help brands grow in the digital economy.', category: 'Marketing', readTime: '12 min read', salary: 'R350k – R800k', level: 'Beginner', duration: '3–5 months', tags: ['SEO', 'Google Ads', 'Analytics'], gradientFrom: '#10b981', gradientTo: '#06b6d4', accentColor: '#10b981', icon: <Megaphone size={28} />, img: '' },
]

/* ─── QUIZ DATA ───────────────────────────────────────────────────────────── */
const QUESTIONS: Question[] = [
  {
    text: 'What kind of tasks energise you most at work?',
    options: [
      { icon: <Palette size={15} color="#7c3aed" />, bg: '#ede9fe', label: 'Creating & Designing', desc: 'Visuals, UI, user experiences' },
      { icon: <Code2 size={15} color="#2563eb" />,   bg: '#dbeafe', label: 'Building & Problem Solving', desc: 'Logic, systems, code' },
      { icon: <BarChart2 size={15} color="#047857" />, bg: '#dcfce7', label: 'Analysing Data', desc: 'Finding patterns & insights' },
      { icon: <Users size={15} color="#d97706" />,   bg: '#fef9c3', label: 'Leading & Strategising', desc: 'Teams, planning, business' },
    ],
  },
  {
    text: 'How would you describe your current experience level?',
    options: [
      { icon: <BookOpen size={15} color="#2563eb" />,   bg: '#dbeafe', label: 'Complete Beginner', desc: 'New to tech, starting fresh' },
      { icon: <Zap size={15} color="#d97706" />,        bg: '#fef9c3', label: 'Some Experience',  desc: 'I have basic skills already' },
      { icon: <TrendingUp size={15} color="#047857" />, bg: '#dcfce7', label: 'Intermediate',     desc: 'Looking to level up' },
      { icon: <Award size={15} color="#7c3aed" />,      bg: '#ede9fe', label: 'Advanced',         desc: 'Specialising or pivoting' },
    ],
  },
  {
    text: 'What is your preferred working style?',
    options: [
      { icon: <Globe size={15} color="#2563eb" />,    bg: '#dbeafe', label: 'Fully Remote',  desc: 'Work from anywhere in the world' },
      { icon: <Monitor size={15} color="#7c3aed" />, bg: '#ede9fe', label: 'In-Office',     desc: 'I thrive in team environments' },
      { icon: <Activity size={15} color="#047857" />, bg: '#dcfce7', label: 'Freelance',    desc: 'Multiple clients & projects' },
      { icon: <Briefcase size={15} color="#d97706" />, bg: '#fef9c3', label: 'Hybrid',      desc: 'Best of both worlds' },
    ],
  },
  {
    text: 'What is your primary motivation for this career move?',
    options: [
      { icon: <TrendingUp size={15} color="#047857" />, bg: '#dcfce7', label: 'Higher Salary',   desc: 'Significantly better income' },
      { icon: <Sparkles size={15} color="#7c3aed" />,  bg: '#ede9fe', label: 'Passion & Purpose', desc: 'Do work that truly excites me' },
      { icon: <Globe size={15} color="#2563eb" />,     bg: '#dbeafe', label: 'Job Security',     desc: 'Future-proof my career' },
      { icon: <Zap size={15} color="#d97706" />,       bg: '#fef9c3', label: 'Flexibility',      desc: 'Control my own schedule' },
    ],
  },
]

const FREE_TEXT_STEP = QUESTIONS.length
const TOTAL_STEPS    = QUESTIONS.length + 1

const CARD_IDS_FOR_AI = CARDS.map(c => c.id).join(', ')

/* ─── AI QUIZ ─────────────────────────────────────────────────────────────── */
const AIQuiz: React.FC<{ onMatchFound: (ids: string[]) => void }> = ({ onMatchFound }) => {
  const [open,    setOpen]    = useState(true)
  const [step,    setStep]    = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null))
  const [bio,     setBio]     = useState('')
  const [bioErr,  setBioErr]  = useState('')
  const [loading, setLoading] = useState(false)
  const [matches, setMatches] = useState<AIMatch[] | null>(null)
  const [aiError, setAiError] = useState('')

  const pct       = Math.round((step / TOTAL_STEPS) * 100)
  const isMCQ     = step < FREE_TEXT_STEP
  const isBioStep = step === FREE_TEXT_STEP

  const pickAnswer = (i: number) => {
    const n = [...answers]; n[step] = i; setAnswers(n)
  }

  const handleNext = () => {
    if (isBioStep) {
      const wordCount = bio.trim().split(/\s+/).filter(Boolean).length
      if (bio.trim().length < 20) { setBioErr('Please write at least a sentence or two about yourself.'); return }
      if (wordCount < 10)          { setBioErr('Please share a bit more — at least 10 words.'); return }
      const sensitivePatterns = [/\b(password|credit card|ssn|social security|passport|pin\b)/i, /\b(kill|murder|harm|hurt|abuse)\b/i]
      if (sensitivePatterns.some(p => p.test(bio))) { setBioErr('Please keep your response relevant to your career background and goals.'); return }
      setBioErr('')
      submitToGroq()
    } else {
      setStep(s => s + 1)
    }
  }

  const submitToGroq = async () => {
    setLoading(true); setAiError(''); setStep(s => s + 1)
    const mcqSummary = QUESTIONS.map((q, i) => {
      const selected = answers[i] !== null ? q.options[answers[i]!].label : 'Skipped'
      return `Q: ${q.text}\nA: ${selected}`
    }).join('\n\n')

    const systemPrompt = `You are a career advisor AI for CareerPathGuide.com.
Your job is to analyse a user's quiz answers and personal background, then recommend the top 3 most suitable career roadmaps from the available list.

Available career IDs: ${CARD_IDS_FOR_AI}

Respond ONLY with valid JSON in this exact format, no markdown, no extra text:
{
  "matches": [
    { "id": "career-id-here", "title": "Career Title", "reason": "2-sentence personalised reason why this fits them specifically", "fit": 92 },
    { "id": "career-id-here", "title": "Career Title", "reason": "2-sentence personalised reason", "fit": 85 },
    { "id": "career-id-here", "title": "Career Title", "reason": "2-sentence personalised reason", "fit": 78 }
  ]
}

Rules:
- Only use IDs from the available career IDs list
- fit is a number 1-100 representing match percentage
- reasons must be personalised and reference their actual answers
- Order by fit descending`

    const userMessage = `Quiz Answers:\n${mcqSummary}\n\nPersonal Background (in their own words):\n${bio}`

    try {
      const raw     = await callGroq(systemPrompt, userMessage)
      const cleaned = raw.replace(/```json|```/g, '').trim()
      const parsed  = JSON.parse(cleaned)
      const results: AIMatch[] = parsed.matches ?? []
      if (!results.length) throw new Error('No matches returned')
      setMatches(results)
      onMatchFound(results.map(m => m.id))
    } catch {
      setAiError('Our AI had trouble analysing your answers. Please try again.')
      setStep(FREE_TEXT_STEP)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setStep(0); setAnswers(Array(QUESTIONS.length).fill(null))
    setBio(''); setBioErr(''); setMatches(null); setAiError(''); setLoading(false)
    onMatchFound([])
  }

  const rankColors = [
    { bg: '#fef3c7', color: '#d97706' },
    { bg: '#e0e7ff', color: '#4f46e5' },
    { bg: '#dcfce7', color: '#16a34a' },
  ]

  return (
    <div className="ap-quiz-card">
      <div className={`ap-quiz-header${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
        <div className="ap-quiz-header-left">
          <div className="ap-quiz-icon"><Bot size={20} color="#2563eb" /></div>
          <div>
            <div className="ap-quiz-title">Not sure what to choose? Let AI match you 🤖</div>
            <div className="ap-quiz-sub">Answer {TOTAL_STEPS} questions — get your personalised career matches</div>
          </div>
        </div>
        <ChevronDown size={18} color="#9ca3af" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </div>

      {open && (
        <div className="ap-quiz-body">
          {loading && (
            <div className="ap-quiz-loading">
              <div className="ap-quiz-loading-spinner"><Loader2 size={24} color="#2563eb" /></div>
              <div className="ap-quiz-loading-title">Analysing your profile with AI…</div>
              <div className="ap-quiz-loading-sub">Finding your best career matches&nbsp;<span className="ap-typing-dots"><span /><span /><span /></span></div>
            </div>
          )}

          {!loading && matches && (
            <>
              <div className="ap-results-header">
                <div className="ap-results-icon"><CheckCircle2 size={28} color="#16a34a" /></div>
                <div className="ap-results-title">Your Top Career Matches</div>
                <div className="ap-results-sub">Based on your quiz answers and background, our AI recommends these careers as your strongest fits.</div>
              </div>
              <div className="ap-match-cards">
                {matches.map((m, i) => (
                  <Link key={m.id} to={`/roadmaps/${m.id}`} className="ap-match-card">
                    <div className="ap-match-rank" style={{ background: rankColors[i]?.bg ?? '#f1f5f9', color: rankColors[i]?.color ?? '#374151' }}>#{i + 1}</div>
                    <div className="ap-match-body">
                      <div className="ap-match-title">{m.title}</div>
                      <div className="ap-match-reason">{m.reason}</div>
                      <div className="ap-match-fit">
                        <div className="ap-match-fit-bar"><div className="ap-match-fit-fill" style={{ width: `${m.fit}%` }} /></div>
                        <div className="ap-match-fit-label">{m.fit}% match</div>
                      </div>
                    </div>
                    <ChevronRight size={16} className="ap-match-arrow" />
                  </Link>
                ))}
              </div>
              <div className="ap-results-actions">
                <button className="ap-retake-btn" onClick={reset}>Retake Quiz</button>
              </div>
            </>
          )}

          {!loading && aiError && (
            <div className="ap-error-box">
              <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{aiError}</span>
            </div>
          )}

          {!loading && !matches && (
            <>
              <div className="ap-quiz-progress-label">
                <span>Step {Math.min(step + 1, TOTAL_STEPS)} of {TOTAL_STEPS}</span>
                <span>{pct}% Complete</span>
              </div>
              <div className="ap-quiz-progress-track">
                <div className="ap-quiz-progress-bar" style={{ width: `${pct}%` }} />
              </div>

              {isMCQ && (() => {
                const q = QUESTIONS[step]
                return (
                  <>
                    <div className="ap-quiz-q">{q.text}</div>
                    <div className="ap-quiz-options">
                      {q.options.map((opt, i) => (
                        <button key={i} className={`ap-quiz-option${answers[step] === i ? ' selected' : ''}`} onClick={() => pickAnswer(i)}>
                          <div className="ap-quiz-opt-icon" style={{ background: opt.bg }}>{opt.icon}</div>
                          <div>
                            <div className="ap-quiz-opt-label">{opt.label}</div>
                            <div className="ap-quiz-opt-desc">{opt.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="ap-quiz-footer">
                      <button className="ap-skip-btn" onClick={() => setStep(s => s + 1)}>Skip for now</button>
                      <button className="ap-next-btn" disabled={answers[step] === null} onClick={() => setStep(s => s + 1)}>
                        {step < QUESTIONS.length - 1 ? 'Next Question' : 'Almost Done'}
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </>
                )
              })()}

              {isBioStep && (
                <>
                  <div className="ap-quiz-q">
                    Tell us about yourself — your background, current skills, and what you're hoping to achieve in your next career.{' '}
                    <span style={{ fontSize: '0.85em', fontWeight: 400, color: '#6b7280' }}>(~100 words)</span>
                  </div>
                  {aiError && (
                    <div className="ap-error-box">
                      <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 1 }} /><span>{aiError}</span>
                    </div>
                  )}
                  <textarea
                    className={`ap-quiz-textarea${bioErr ? ' error' : ''}`}
                    placeholder="e.g. I'm currently a teacher with 5 years of experience. I've always been curious about technology and recently taught myself some basic Python..."
                    value={bio}
                    onChange={e => { setBio(e.target.value); if (bioErr) setBioErr('') }}
                    maxLength={1200}
                    spellCheck
                  />
                  <div className="ap-quiz-char-count" style={{ color: bio.length > 1000 ? '#ef4444' : bio.length > 700 ? '#d97706' : '#9ca3af' }}>
                    {bio.trim().split(/\s+/).filter(Boolean).length} words · {bio.length} / 1200 chars
                  </div>
                  {bioErr && (
                    <div className="ap-quiz-validation-msg">
                      <AlertTriangle size={13} /> {bioErr}
                    </div>
                  )}
                  <div className="ap-quiz-footer">
                    <button className="ap-skip-btn" onClick={() => { setBio('I prefer not to share details.'); submitToGroq() }}>Skip this step</button>
                    <button className="ap-next-btn" onClick={handleNext} disabled={bio.trim().length < 10}>
                      <Sparkles size={15} /> Get My AI Matches
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

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

const CustomSelect: React.FC<{ label: string; options: string[]; value: string; onChange: (v: string) => void }> = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div ref={ref} className={`ap-select-wrap${open ? ' open' : ''}`}>
      <div className="ap-select-trigger" onClick={() => setOpen(o => !o)}>
        {value === options[0] ? label : value}
        <svg className="ap-select-arrow" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
      </div>
      <div className="ap-select-dropdown">
        {options.map(opt => (
          <div key={opt} className={`ap-select-option${value === opt ? ' selected' : ''}`} onClick={() => { onChange(opt); setOpen(false) }}>{opt}</div>
        ))}
      </div>
    </div>
  )
}

/* ─── ROADMAP CARD ────────────────────────────────────────────────────────── */
const RoadmapCard: React.FC<{
  card: Card; delay: number; isHighlighted?: boolean; isAIMatch?: boolean
  cardRef?: React.RefObject<HTMLAnchorElement>
}> = ({ card, delay, isHighlighted, isAIMatch, cardRef }) => {
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
        {isAIMatch && (
          <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.95)', borderRadius: 999, padding: '3px 10px', fontSize: '0.62rem', fontWeight: 800, color: '#7c3aed', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Star size={9} fill="#7c3aed" /> AI Match
          </div>
        )}
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
  const [aiMatchIds,      setAiMatchIds]      = useState<string[]>([])

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
    const t = setTimeout(() => { cardRefs.current[first.id]?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }, 80)
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

  // Beginner-first sort for display label
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
            <p>Search, filter, or let AI match you to the right path. Your journey from zero to hired — mapped out step by step.</p>

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
              alt="Hiker climbing toward a mountain peak with a flag at the summit"
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
        <AIQuiz onMatchFound={ids => {
          setAiMatchIds(ids)
          if (ids.length > 0) {
            setTimeout(() => {
              const el = document.getElementById(`card-${ids[0]}`)
              el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }, 200)
          }
        }} />

        {/* Beginner callout banner */}
        <div style={{
          background: 'linear-gradient(135deg, #ecfdf5, #eff6ff)',
          border: '1.5px solid #a7f3d0',
          borderRadius: 16,
          padding: '18px 22px',
          marginBottom: 28,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          flexWrap: 'wrap',
        }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <BookOpen size={20} color="#16a34a" />
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#111', marginBottom: 3 }}>
              New to tech? Start here 👋
            </div>
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
              {aiMatchIds.length > 0 && <span style={{ marginLeft: 8, color: '#7c3aed', fontWeight: 700 }}>· ✨ AI matches highlighted</span>}
              &nbsp;&nbsp;·&nbsp;&nbsp;Page <strong style={{ color: '#111' }}>{currentPage}</strong> of <strong style={{ color: '#111' }}>{totalPages}</strong>
            </div>

            <div className="ap-grid">
              {paginated.map((card, i) => (
                <RoadmapCard
                  key={card.id}
                  card={card}
                  delay={i * 0.05}
                  isHighlighted={highlightId === card.id}
                  isAIMatch={aiMatchIds.includes(card.id)}
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