import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, MapPin, Link2, ExternalLink,
  Rocket, BookOpen, Users, Zap, Star, Target, Heart
} from 'lucide-react'
import { FaTiktok } from 'react-icons/fa'


const MY_PHOTO_URL = 'https://i.imgur.com/EwwsHnz_d.webp?maxwidth=1520&fidelity=grand'   // ← REPLACE WITH YOUR PHOTO URL OR IMPORT

const AboutPage: React.FC = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Sora:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ink:     #0d0f12;
          --ink-2:   #2d3139;
          --ink-3:   #6b7280;
          --bg:      #fafaf8;
          --card:    #ffffff;
          --accent:  #0f52ba;
          --accent2: #1a73e8;
          --lime:    #b5f23c;
          --border:  #e8e8e4;
          --red:     #ef4444;
        }

        .about-page {
          background: var(--bg);
          font-family: 'Sora', sans-serif;
          min-height: 100vh;
          padding: 0 0 100px;
          color: var(--ink);
        }

        /* ── hero ─────────────────────────────────────────────────────────── */
        .hero {
          background: var(--ink);
          padding: 60px 0 70px;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 60% at 80% 50%, rgba(15,82,186,.35) 0%, transparent 70%),
            radial-gradient(ellipse 40% 80% at 10% 80%, rgba(181,242,60,.12) 0%, transparent 70%);
        }
        .hero-inner {
          max-width: 820px; margin: 0 auto; padding: 0 28px;
          position: relative; z-index: 1;
        }
        .hero-back {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: .8rem; font-weight: 500; color: rgba(255,255,255,.5);
          text-decoration: none; margin-bottom: 48px; transition: color .2s;
        }
        .hero-back:hover { color: rgba(255,255,255,.9); }

        .hero-layout {
          display: flex; gap: 40px; align-items: center;
        }
        @media(max-width:620px){ .hero-layout { flex-direction: column; align-items: flex-start; } }

        .hero-avatar {
          width: 120px; height: 120px; border-radius: 24px; flex-shrink: 0;
          background: linear-gradient(135deg, var(--accent), #4fa8e8);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 2.6rem; color: #fff; font-weight: 700;
          border: 3px solid rgba(255,255,255,.12);
          letter-spacing: -.02em;
        }
        .hero-photo {
          width: 120px; height: 120px; border-radius: 24px; flex-shrink: 0;
          object-fit: cover; border: 3px solid rgba(255,255,255,.12);
        }

        .hero-eyebrow {
          font-size: .72rem; font-weight: 600; letter-spacing: .15em;
          text-transform: uppercase;
          color: var(--lime); margin-bottom: 10px;
        }
        .hero-name {
          font-family: 'Playfair Display', serif;
          font-size: 2.6rem; font-weight: 700; color: #fff;
          line-height: 1.1; margin-bottom: 8px;
        }
        .hero-title {
          font-size: .9rem; color: rgba(255,255,255,.55);
          font-weight: 400; margin-bottom: 14px;
        }
        .hero-location {
          display: flex; align-items: center; gap: 6px;
          font-size: .78rem; color: rgba(255,255,255,.35);
        }
        .hero-socials {
          display: flex; gap: 10px; margin-top: 20px;
        }
        .hs-btn {
          width: 38px; height: 38px; border-radius: 10px;
          background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,.5); text-decoration: none; transition: all .2s;
        }
        .hs-btn:hover { background: var(--accent); border-color: var(--accent); color: #fff; }

        /* ── main content ─────────────────────────────────────────────────── */
        .main { max-width: 820px; margin: 0 auto; padding: 0 28px; }

        /* ── stats strip ── */
        .stats-strip {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: var(--border);
          border: 1px solid var(--border); border-radius: 16px;
          overflow: hidden; margin: 40px 0;
        }
        @media(max-width:560px){ .stats-strip { grid-template-columns: repeat(2,1fr); } }
        .stat-box {
          background: var(--card); padding: 22px 20px; text-align: center;
        }
        .stat-val {
          font-family: 'Playfair Display', serif;
          font-size: 2rem; font-weight: 700; color: var(--ink);
          line-height: 1; margin-bottom: 5px;
        }
        .stat-lbl {
          font-size: .72rem; color: var(--ink-3); font-weight: 400;
          text-transform: uppercase; letter-spacing: .08em;
        }

        /* ── story card ── */
        .story-card {
          background: var(--card); border: 1px solid var(--border);
          border-radius: 20px; padding: 40px; margin-bottom: 24px;
          position: relative; overflow: hidden;
        }
        .story-card::after {
          content: '';
          position: absolute; top: -40px; right: -40px;
          width: 180px; height: 180px; border-radius: 50%;
          background: radial-gradient(circle, rgba(15,82,186,.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .card-eyebrow {
          font-size: .7rem; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: var(--accent);
          margin-bottom: 14px; display: flex; align-items: center; gap: 8px;
        }
        .card-eyebrow span {
          display: block; width: 20px; height: 2px;
          background: var(--accent); border-radius: 2px;
        }
        .card-h {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem; font-weight: 700; color: var(--ink);
          margin-bottom: 18px; line-height: 1.3;
        }
        .card-p {
          font-size: .9rem; color: var(--ink-2); line-height: 1.9;
          font-weight: 300; margin-bottom: 14px;
        }
        .card-p:last-child { margin-bottom: 0; }
        .card-p strong { font-weight: 600; color: var(--ink); }

        /* ── mission banner ── */
        .mission-banner {
          background: var(--ink); border-radius: 20px;
          padding: 40px; margin-bottom: 24px; position: relative; overflow: hidden;
        }
        .mission-banner::before {
          content: '';
          position: absolute; bottom: -60px; right: -60px;
          width: 240px; height: 240px; border-radius: 50%;
          background: radial-gradient(circle, rgba(181,242,60,.15) 0%, transparent 70%);
        }
        .mission-banner::after {
          content: '"';
          position: absolute; top: 10px; right: 36px;
          font-family: 'Playfair Display', serif;
          font-size: 8rem; color: rgba(255,255,255,.04);
          line-height: 1; pointer-events: none;
        }
        .mission-banner .card-eyebrow { color: var(--lime); }
        .mission-banner .card-eyebrow span { background: var(--lime); }
        .mission-banner .card-h { color: #fff; }
        .mission-banner .card-p  { color: rgba(255,255,255,.6); }

        .mission-pillars {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 16px; margin-top: 28px;
        }
        @media(max-width:580px){ .mission-pillars { grid-template-columns: 1fr; } }
        .pillar {
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 12px; padding: 18px;
        }
        .pillar-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(255,255,255,.08);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 10px;
        }
        .pillar-h { font-size: .85rem; font-weight: 600; color: #fff; margin-bottom: 5px; }
        .pillar-p { font-size: .75rem; color: rgba(255,255,255,.45); line-height: 1.7; font-weight: 300; }

        /* ── what you'll find grid ── */
        .finds-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 16px; margin-bottom: 24px;
        }
        @media(max-width:520px){ .finds-grid { grid-template-columns: 1fr; } }
        .find-card {
          background: var(--card); border: 1px solid var(--border);
          border-radius: 16px; padding: 24px;
          transition: border-color .2s, box-shadow .2s;
        }
        .find-card:hover {
          border-color: var(--accent2);
          box-shadow: 0 4px 20px rgba(15,82,186,.08);
        }
        .find-icon {
          width: 42px; height: 42px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px; font-size: 1.3rem;
        }
        .find-h { font-size: .95rem; font-weight: 600; color: var(--ink); margin-bottom: 6px; }
        .find-p { font-size: .8rem; color: var(--ink-3); line-height: 1.7; font-weight: 300; }

        /* ── promise list ── */
        .promise-list {
          background: var(--card); border: 1px solid var(--border);
          border-radius: 20px; padding: 36px; margin-bottom: 24px;
        }
        .promise-item {
          display: flex; gap: 16px; align-items: flex-start;
          padding: 18px 0; border-bottom: 1px solid var(--border);
        }
        .promise-item:first-of-type { padding-top: 0; }
        .promise-item:last-of-type { border-bottom: none; padding-bottom: 0; }
        .promise-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--accent); flex-shrink: 0; margin-top: 6px;
        }
        .promise-h { font-size: .9rem; font-weight: 600; color: var(--ink); margin-bottom: 4px; }
        .promise-p { font-size: .82rem; color: var(--ink-3); line-height: 1.7; font-weight: 300; }

        /* ── CTA ── */
        .cta-band {
          background: linear-gradient(135deg, var(--accent), #1a73e8);
          border-radius: 20px; padding: 40px; text-align: center;
        }
        .cta-h {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem; font-weight: 700; color: #fff; margin-bottom: 10px;
        }
        .cta-p { font-size: .9rem; color: rgba(255,255,255,.7); margin-bottom: 24px; font-weight: 300; }
        .cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .cta-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 12px;
          background: var(--lime); color: var(--ink);
          font-size: .875rem; font-weight: 700; text-decoration: none;
          transition: opacity .2s;
        }
        .cta-btn-primary:hover { opacity: .9; }
        .cta-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 12px;
          background: rgba(255,255,255,.12); color: #fff;
          border: 1px solid rgba(255,255,255,.2);
          font-size: .875rem; font-weight: 600; text-decoration: none;
          transition: background .2s;
        }
        .cta-btn-secondary:hover { background: rgba(255,255,255,.2); }
      `}</style>

      <div className="about-page">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <div className="hero">
          <div className="hero-inner">
            <Link to="/" className="hero-back"><ArrowLeft size={14}/> Back to home</Link>

            <div className="hero-layout">
              {MY_PHOTO_URL
                ? <img src={MY_PHOTO_URL} alt="Nyakallo Dolamo" className="hero-photo" />
                : <div className="hero-avatar">ND</div>
              }

              <div>
                <p className="hero-eyebrow">Founder · GetBreakTech</p>
                {/* ── CHANGE: name ── */}
                <h1 className="hero-name">Nyakallo<br/>Dolamo</h1>
                <p className="hero-title">Self-Taught Developer &amp; Career Transition Guide</p>
                <p className="hero-location"><MapPin size={13}/> South Africa</p>

                {/* ── CHANGE: social URLs ── */}
                <div className="hero-socials">
                  <a href="https://www.tiktok.com/@getbreaktech"
                     target="_blank" rel="noopener noreferrer"
                     className="hs-btn" aria-label="Tiktok" title="Tiktok">
                    <FaTiktok size={15}/>
                  </a>
                  <a href="https://www.linkedin.com/in/nyakallo-dolamo-8192aa324/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BiOoK7Sh9Th6VahJraATNig%3D%3D"
                     target="_blank" rel="noopener noreferrer"
                     className="hs-btn" aria-label="LinkedIn" title="LinkedIn">
                    <Link2 size={15}/>
                  </a>
                  <a href="https://x.com/getbreakget"
                     target="_blank" rel="noopener noreferrer"
                     className="hs-btn" aria-label="X / Twitter" title="X (Twitter)">
                    <ExternalLink size={15}/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN ──────────────────────────────────────────────────────────── */}
        <div className="main">

          {/* stats */}
          <div className="stats-strip">
            {[
              { val: '50+',   lbl: 'Career roadmaps'  },
              { val: '47',    lbl: 'Original articles' },
              { val: '120K+', lbl: 'Monthly readers'  },
              { val: '1',     lbl: 'Person building this' },
            ].map(s => (
              <div key={s.lbl} className="stat-box">
                <div className="stat-val">{s.val}</div>
                <div className="stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>

          {/* story */}
          <div className="story-card">
            <p className="card-eyebrow"><span/> My Story</p>
            <h2 className="card-h">I built the resource I desperately needed</h2>
            <p className="card-p">
              I am a <strong>self-taught developer</strong> who knows exactly what it feels like to
              stare at a screen and have absolutely no idea where to begin. I spent months jumping between
              YouTube videos, random blog posts, and free courses — learning a little bit of everything,
              mastering nothing, and never feeling like I was actually getting closer to a real career in tech.
            </p>
            <p className="card-p">
              Nobody around me had made this journey before. I had no mentor, no roadmap, and no
              community. Every question I Googled led me to advice written for people who were already
              halfway there. It was frustrating. It was expensive. And it was lonely.
            </p>
            <p className="card-p">
              When I finally figured it out — when the pieces clicked and things started moving — the
              very first thing I did was write everything down. Every shortcut I found. Every mistake I
              made. Every resource that actually helped. That document became GetBreakTech.
            </p>
            <p className="card-p">
              This site is a <strong>solo project</strong>. No investors. No team of writers. No
              sponsored content. Just me, sharing everything I know so that the next person does not
              have to go through what I went through.
            </p>
          </div>

          {/* mission */}
          <div className="mission-banner">
            <p className="card-eyebrow"><span/> Our Mission</p>
            <h2 className="card-h">Break into tech — without getting lost</h2>
            <p className="card-p">
              Breaking into tech should not require a computer science degree, R150,000 for a bootcamp,
              or years of trial and error. It should be clear, direct, and achievable for anyone who is
              willing to put in the work — regardless of where they are starting from.
            </p>

            <div className="mission-pillars">
              {[
                {
                  icon: <Target size={17} color="#b5f23c"/>,
                  h: 'Clarity over chaos',
                  p: 'No more drowning in options. Every roadmap on this site gives you a clear, numbered path from zero to hired.',
                },
                {
                  icon: <Users size={17} color="#b5f23c"/>,
                  h: 'Anyone can do this',
                  p: 'Whether you are in retail, fresh out of matric, or switching careers at 35 — this is built for you.',
                },
                {
                  icon: <Zap size={17} color="#b5f23c"/>,
                  h: 'Action over theory',
                  p: 'Every guide ends with a next step. Not just knowledge — momentum. Confusion → Clarity → Action.',
                },
              ].map(p => (
                <div key={p.h} className="pillar">
                  <div className="pillar-icon">{p.icon}</div>
                  <p className="pillar-h">{p.h}</p>
                  <p className="pillar-p">{p.p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* what you'll find */}
          <div className="finds-grid">
            {[
              {
                icon: '🗺️', bg: '#dbeafe',
                h: 'Career Roadmaps',
                p: 'Step-by-step guides that show you exactly which skills to learn, in what order, and where to learn them — built around real hiring expectations.',
              },
              {
                icon: '🤖', bg: '#d1fae5',
                h: 'AI & Future Jobs',
                p: 'Honest takes on which roles AI is creating, which it is changing, and how to position yourself for long-term career security in tech.',
              },
              {
                icon: '🔁', bg: '#fce7f3',
                h: 'Career Change Guides',
                p: 'Moving from retail, customer service, or any non-tech role? These guides map the fastest and most practical path to your first tech job.',
              },
              {
                icon: '📚', bg: '#ede9fe',
                h: 'Beginner Resources',
                p: 'Hand-picked tools, platforms, and free courses — evaluated for quality, not sponsored. Only the resources that actually work make the list.',
              },
            ].map(f => (
              <div key={f.h} className="find-card">
                <div className="find-icon" style={{ background: f.bg }}>{f.icon}</div>
                <p className="find-h">{f.h}</p>
                <p className="find-p">{f.p}</p>
              </div>
            ))}
          </div>

          {/* promises */}
          <div className="promise-list">
            <p className="card-eyebrow" style={{ marginBottom: 24 }}><span/> What I promise you</p>
            {[
              {
                h: 'Free, forever',
                p: 'Every roadmap, guide, and article on this site is completely free. The site is supported by Google AdSense — not paywalls, upsells, or premium tiers.',
              },
              {
                h: 'No paid promotions or sponsored content',
                p: 'I recommend resources because they work, not because someone paid me to say so. Every recommendation on this site is something I have personally used or thoroughly evaluated.',
              },
              {
                h: 'Kept up to date',
                p: 'Tech evolves fast. I review and update every roadmap and salary guide at least twice a year so the information stays accurate and relevant.',
              },
              {
                h: 'I personally read every message',
                p: 'If you reach out with a question or feedback, it lands in my inbox — not a support ticket system, not an AI bot. I read everything and I reply.',
              },
              {
                h: 'Your background does not define your future',
                p: 'Matric or no matric. Rural or urban. Retail or restaurant. If you are willing to be consistent and put in the work, there is a place for you in tech. This site exists to help you find it.',
              },
            ].map(item => (
              <div key={item.h} className="promise-item">
                <div className="promise-dot"/>
                <div>
                  <p className="promise-h">{item.h}</p>
                  <p className="promise-p">{item.p}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="cta-band">
            <h2 className="cta-h">Ready to start your tech journey?</h2>
            <p className="cta-p">
              Pick a roadmap, follow the steps, and take your first action today.
              Every expert was once a beginner. 🚀
            </p>
            <div className="cta-btns">
              <Link to="/roadmaps" className="cta-btn-primary">
                <Rocket size={16}/> Explore Roadmaps
              </Link>
              <Link to="/contact" className="cta-btn-secondary">
                <Heart size={16}/> Get in Touch
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default AboutPage