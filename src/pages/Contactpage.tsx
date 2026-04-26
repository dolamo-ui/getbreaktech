import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, Mail, MessageSquare, HelpCircle, Briefcase,
  CheckCircle, MapPin, Lightbulb, AlertCircle
} from 'lucide-react'

const topics = [
  { id: 'general',      label: 'General question',            icon: MessageSquare },
  { id: 'roadmap',      label: 'Suggest a roadmap topic',     icon: Lightbulb     },
  { id: 'content',      label: 'Article or content feedback', icon: HelpCircle    },
  { id: 'partnership',  label: 'Partnership or advertising',  icon: Briefcase     },
  { id: 'issue',        label: 'Report a website issue',      icon: AlertCircle   },
]

const ContactPage: React.FC = () => {
  const [topic,     setTopic]     = useState('general')
  const [name,      setName]      = useState('')
  const [email,     setEmail]     = useState('')
  const [message,   setMessage]   = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: wire up to EmailJS / Formspree / your own API
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Sora:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ink:    #0d0f12;
          --ink-2:  #2d3139;
          --ink-3:  #6b7280;
          --bg:     #fafaf8;
          --card:   #ffffff;
          --accent: #0f52ba;
          --accent2:#1a73e8;
          --lime:   #b5f23c;
          --border: #e8e8e4;
        }

        .contact-page {
          background: var(--bg);
          font-family: 'Sora', sans-serif;
          min-height: 100vh;
          padding: 0 0 100px;
          color: var(--ink);
        }

        /* ── page header ─────────────────────────────────────────────────── */
        .contact-header {
          background: var(--ink); padding: 56px 0 60px;
          position: relative; overflow: hidden;
        }
        .contact-header::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 55% 80% at 100% 50%, rgba(15,82,186,.4) 0%, transparent 70%);
        }
        .contact-header-inner {
          max-width: 820px; margin: 0 auto; padding: 0 28px;
          position: relative; z-index: 1;
        }
        .header-back {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: .8rem; font-weight: 500;
          color: rgba(255,255,255,.45); text-decoration: none;
          margin-bottom: 36px; transition: color .2s;
        }
        .header-back:hover { color: rgba(255,255,255,.85); }

        .header-eyebrow {
          font-size: .7rem; font-weight: 700; letter-spacing: .15em;
          text-transform: uppercase; color: var(--lime); margin-bottom: 10px;
          display: flex; align-items: center; gap: 8px;
        }
        .header-eyebrow span {
          display: block; width: 20px; height: 2px;
          background: var(--lime); border-radius: 2px;
        }
        .header-h1 {
          font-family: 'Playfair Display', serif;
          font-size: 2.8rem; font-weight: 700; color: #fff; line-height: 1.1;
          margin-bottom: 12px;
        }
        .header-sub {
          font-size: .9rem; color: rgba(255,255,255,.5); font-weight: 300; max-width: 480px;
        }

        /* ── main ─────────────────────────────────────────────────────────── */
        .contact-main {
          max-width: 820px; margin: 0 auto; padding: 0 28px;
        }

        /* ── two-column layout ── */
        .contact-columns {
          display: grid; grid-template-columns: 1fr 340px;
          gap: 24px; margin-top: 40px;
        }
        @media(max-width:680px){ .contact-columns { grid-template-columns: 1fr; } }

        /* ── form card ── */
        .form-card {
          background: var(--card); border: 1px solid var(--border);
          border-radius: 20px; padding: 36px;
        }

        .form-section-h {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; font-weight: 700; color: var(--ink);
          margin-bottom: 6px;
        }
        .form-section-sub {
          font-size: .82rem; color: var(--ink-3); font-weight: 300;
          margin-bottom: 28px; line-height: 1.7;
        }

        /* topic picker */
        .topic-label {
          font-size: .78rem; font-weight: 600; color: var(--ink-2);
          margin-bottom: 10px; display: block; text-transform: uppercase;
          letter-spacing: .08em;
        }
        .topic-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 8px; margin-bottom: 24px;
        }
        @media(max-width:420px){ .topic-grid { grid-template-columns: 1fr; } }
        .topic-btn {
          padding: 10px 12px; border-radius: 10px;
          font-family: 'Sora', sans-serif;
          font-size: .78rem; font-weight: 500;
          border: 1.5px solid var(--border);
          background: transparent; cursor: pointer;
          color: var(--ink-3); transition: all .18s;
          display: flex; align-items: center; gap: 8px; text-align: left;
        }
        .topic-btn.active {
          border-color: var(--accent2); color: var(--accent);
          background: #eff6ff;
        }
        .topic-btn:hover:not(.active) {
          border-color: #c5c5c0; color: var(--ink);
        }

        /* fields */
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media(max-width:420px){ .field-row { grid-template-columns: 1fr; } }
        .field-group { margin-bottom: 16px; }
        .field-lbl {
          font-size: .78rem; font-weight: 600; color: var(--ink-2);
          margin-bottom: 7px; display: block; text-transform: uppercase;
          letter-spacing: .08em;
        }
        .ci {
          width: 100%; padding: 11px 14px; border-radius: 10px;
          border: 1.5px solid var(--border); font-family: 'Sora', sans-serif;
          font-size: .875rem; background: #f9f8f5; color: var(--ink);
          outline: none; transition: border-color .2s, background .2s;
        }
        .ci:focus { border-color: var(--accent2); background: #fff; }
        .ci::placeholder { color: #b5b5ae; }
        .ct { resize: vertical; min-height: 130px; line-height: 1.65; }

        /* submit */
        .submit-btn {
          width: 100%; padding: 13px 24px; border-radius: 12px; border: none;
          background: var(--accent); color: #fff; font-family: 'Sora', sans-serif;
          font-size: .9rem; font-weight: 700; cursor: pointer;
          transition: opacity .2s; margin-top: 4px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .submit-btn:hover:not(:disabled) { opacity: .88; }
        .submit-btn:disabled { opacity: .6; cursor: not-allowed; }

        /* ── success state ── */
        .success-state {
          text-align: center; padding: 56px 20px;
        }
        .success-circle {
          width: 68px; height: 68px; border-radius: 50%; background: #d1fae5;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
        }
        .success-h {
          font-family: 'Playfair Display', serif;
          font-size: 1.7rem; font-weight: 700; color: var(--ink); margin-bottom: 10px;
        }
        .success-p {
          font-size: .88rem; color: var(--ink-3); line-height: 1.75;
          font-weight: 300;
        }

        /* ── sidebar ── */
        .sidebar { display: flex; flex-direction: column; gap: 16px; }

        .info-card {
          background: var(--card); border: 1px solid var(--border);
          border-radius: 16px; padding: 24px;
        }
        .info-card-h {
          font-size: .82rem; font-weight: 700; color: var(--ink);
          text-transform: uppercase; letter-spacing: .1em; margin-bottom: 14px;
          display: flex; align-items: center; gap: 8px;
        }
        .info-card-h .ic-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
        }

        /* direct email */
        .email-block {
          display: flex; align-items: center; gap: 12px;
          background: #eff6ff; border-radius: 12px; padding: 14px;
        }
        .email-icon {
          width: 40px; height: 40px; border-radius: 10px; background: var(--accent);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .email-label { font-size: .72rem; color: var(--ink-3); margin-bottom: 2px; }
        .email-addr {
          font-size: .85rem; font-weight: 600; color: var(--accent);
          text-decoration: none;
        }
        .email-addr:hover { text-decoration: underline; }

        /* response time */
        .rt-row {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 0; border-bottom: 1px solid var(--border);
        }
        .rt-row:last-child { border-bottom: none; padding-bottom: 0; }
        .rt-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .rt-dot.green  { background: #10b981; }
        .rt-dot.yellow { background: #f59e0b; }
        .rt-dot.blue   { background: var(--accent); }
        .rt-label { font-size: .78rem; color: var(--ink-2); font-weight: 500; }
        .rt-val   { font-size: .72rem; color: var(--ink-3); font-weight: 300; }

        /* why contact */
        .why-item {
          display: flex; align-items: flex-start; gap: 10px;
          margin-bottom: 10px; font-size: .82rem; color: var(--ink-2); line-height: 1.6;
          font-weight: 300;
        }
        .why-item:last-child { margin-bottom: 0; }
        .why-check { flex-shrink: 0; margin-top: 2px; }

        /* note */
        .note-card {
          background: #fffbeb; border: 1px solid #fde68a; border-radius: 14px; padding: 18px;
        }
        .note-card p { font-size: .78rem; color: #78350f; line-height: 1.7; font-weight: 300; }
        .note-card strong { font-weight: 600; }
      `}</style>

      <div className="contact-page">

        {/* ── HEADER ────────────────────────────────────────────────────────── */}
        <div className="contact-header">
          <div className="contact-header-inner">
            <Link to="/" className="header-back"><ArrowLeft size={14}/> Back to home</Link>
            <p className="header-eyebrow"><span/> Let's talk</p>
            <h1 className="header-h1">Contact Me</h1>
            <p className="header-sub">
              Questions, ideas, feedback — I read every message personally and reply as soon as I can.
            </p>
          </div>
        </div>

        {/* ── MAIN ──────────────────────────────────────────────────────────── */}
        <div className="contact-main">
          <div className="contact-columns">

            {/* ── FORM ── */}
            <div className="form-card">
              {submitted ? (
                <div className="success-state">
                  <div className="success-circle">
                    <CheckCircle size={28} color="#059669"/>
                  </div>
                  <h2 className="success-h">Message received!</h2>
                  <p className="success-p">
                    Thanks for reaching out. I'll get back to you at<br/>
                    <strong>{email}</strong> — usually within 1–2 days.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="form-section-h">Send a message</h2>
                  <p className="form-section-sub">
                    Whether you need help choosing a path, want to suggest content, or just want to say hello —
                    all messages are welcome.
                  </p>

                  {/* topic picker */}
                  <label className="topic-label">What is this about?</label>
                  <div className="topic-grid">
                    {topics.map(t => (
                      <button
                        key={t.id} type="button"
                        className={`topic-btn${topic === t.id ? ' active' : ''}`}
                        onClick={() => setTopic(t.id)}
                      >
                        <t.icon size={13}/> {t.label}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="field-row">
                      <div className="field-group">
                        <label className="field-lbl" htmlFor="cnt-name">Your name</label>
                        <input
                          id="cnt-name" className="ci" type="text"
                          placeholder="First name"
                          value={name} onChange={e => setName(e.target.value)} required
                        />
                      </div>
                      <div className="field-group">
                        <label className="field-lbl" htmlFor="cnt-email">Email address</label>
                        <input
                          id="cnt-email" className="ci" type="email"
                          placeholder="you@example.com"
                          value={email} onChange={e => setEmail(e.target.value)} required
                        />
                      </div>
                    </div>

                    <div className="field-group">
                      <label className="field-lbl" htmlFor="cnt-msg">Your message</label>
                      <textarea
                        id="cnt-msg" className="ci ct"
                        placeholder="Tell me what's on your mind — the more detail, the better I can help..."
                        value={message} onChange={e => setMessage(e.target.value)} required
                      />
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                      {loading ? 'Sending…' : <><Mail size={15}/> Send message</>}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* ── SIDEBAR ── */}
            <div className="sidebar">

              {/* direct email */}
              <div className="info-card">
                <p className="info-card-h"><span className="ic-dot"/> Direct Email</p>
                <div className="email-block">
                  <div className="email-icon">
                    <Mail size={18} color="#fff"/>
                  </div>
                  <div>
                    <p className="email-label">Prefer email directly?</p>
                    {/* ── CHANGE: your email ── */}
                    <a href="mailto:dolamonyakallo07@gmail.com" className="email-addr">
                      dolamonyakallo07@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* response times */}
              <div className="info-card">
                <p className="info-card-h"><span className="ic-dot"/> Response Times</p>
                {[
                  { dot: 'green',  label: 'General questions',    val: 'Within 24–48 hours' },
                  { dot: 'yellow', label: 'Partnership requests', val: 'Within 3–5 days'    },
                  { dot: 'blue',   label: 'Content feedback',     val: 'Within 1–2 days'    },
                ].map(r => (
                  <div key={r.label} className="rt-row">
                    <div className={`rt-dot ${r.dot}`}/>
                    <div>
                      <p className="rt-label">{r.label}</p>
                      <p className="rt-val">{r.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* why contact */}
              <div className="info-card">
                <p className="info-card-h"><span className="ic-dot"/> Good Reasons to Write</p>
                {[
                  'You need help choosing a career path',
                  'You want to suggest a new roadmap topic',
                  'You found outdated information on the site',
                  'You spotted a technical issue or broken link',
                  'You want to share your progress or success story',
                  'You have a question about career change',
                ].map(w => (
                  <div key={w} className="why-item">
                    <CheckCircle size={14} color="#10b981" className="why-check"/>
                    {w}
                  </div>
                ))}
              </div>

              {/* note */}
              <div className="note-card">
                <p>
                  <strong>Please note:</strong> CareerPathGuide provides educational and informational
                  content only. We do not offer professional legal, financial, or personalised
                  career consulting services.
                </p>
              </div>

              {/* location */}
              <div className="info-card">
                <p className="info-card-h"><span className="ic-dot"/> Based In</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '.85rem', color: 'var(--ink-2)' }}>
                  <MapPin size={15} color="var(--accent)"/>
                  South Africa
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default ContactPage