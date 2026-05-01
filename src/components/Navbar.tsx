import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home',          to: '/'             },
  { label: 'Roadmaps',      to: '/roadmaps'     },
  { label: 'Career Change', to: '/career-change' },
  { label: 'AI Careers',    to: '/ai-career'    },
  { label: 'Blog',          to: '/blog'         },
  { label: 'About',         to: '/about'        },
  { label: 'Contact',       to: '/contact'      },
]

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <>
      <style>{`
        /* ── Google Fonts ── */
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap');

        .nav-outer {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 200;
          display: flex;
          justify-content: center;
          padding: 12px 16px;
          transition: padding 0.35s ease;
          pointer-events: none;
        }
        .nav-outer.scrolled { padding: 8px 16px; }

        .nav-pill {
          pointer-events: all;
          width: 100%;
          max-width: 920px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px 0 8px;
          background: rgba(250, 250, 248, 0.97);
          border-radius: 999px;
          box-shadow:
            0 1px 3px rgba(0,0,0,0.07),
            0 0 0 1px rgba(0,0,0,0.05),
            0 4px 16px rgba(0,0,0,0.06);
          transition: box-shadow 0.3s ease, background 0.3s ease;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .nav-pill.scrolled {
          background: rgba(248, 248, 246, 0.98);
          box-shadow:
            0 2px 8px rgba(0,0,0,0.1),
            0 0 0 1px rgba(0,0,0,0.06),
            0 8px 32px rgba(0,0,0,0.08);
        }

        /* ── LOGO BADGE ── */
        .nav-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
          margin-left: 4px;
        }

        /* Pill-shaped logo container */
        .nav-logo-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
          border-radius: 999px;
          padding: 5px 14px 5px 6px;
          box-shadow:
            0 2px 8px rgba(15,23,42,0.35),
            inset 0 1px 0 rgba(255,255,255,0.08);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .nav-logo-badge:hover {
          transform: translateY(-1px);
          box-shadow:
            0 4px 16px rgba(15,23,42,0.45),
            inset 0 1px 0 rgba(255,255,255,0.08);
        }

        /* Icon circle inside badge */
        .nav-logo-icon-wrap {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.15);
        }
        .nav-logo-icon-wrap img {
          width: 22px;
          height: 22px;
          object-fit: contain;
          display: block;
        }

        /* Wordmark inside badge */
        .nav-logo-wordmark {
          font-family: 'Space Grotesk', 'Helvetica Neue', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          color: #ffffff;
          white-space: nowrap;
          line-height: 1;
        }
        .nav-logo-wordmark span {
          color: #60a5fa;
        }

        /* On very small screens — hide wordmark, keep icon only */
        @media (max-width: 380px) {
          .nav-logo-badge { padding: 5px; }
          .nav-logo-wordmark { display: none; }
        }

        /* ── DESKTOP NAV LINKS ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.1rem;
        }
        @media (max-width: 768px) { .nav-links { display: none; } }

        .nav-link {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-size: 0.81rem;
          font-weight: 500;
          color: #3d3d3d;
          text-decoration: none;
          padding: 6px 11px;
          border-radius: 999px;
          transition: color 0.15s, background 0.15s;
          white-space: nowrap;
        }
        .nav-link:hover  { color: #1d4ed8; background: rgba(29,78,216,0.07); }
        .nav-link.active {
          color: #1d4ed8;
          font-weight: 600;
          background: rgba(29,78,216,0.08);
        }

        /* ── ACTIONS / HAMBURGER ── */
        .nav-actions {
          display: flex; align-items: center; gap: 4px; flex-shrink: 0;
          margin-right: 4px;
        }

        .nav-hamburger {
          display: none;
          background: none; border: none; cursor: pointer;
          color: #1a1a1a; padding: 7px; border-radius: 50%;
          transition: background 0.18s;
          align-items: center; justify-content: center;
          width: 36px; height: 36px;
        }
        .nav-hamburger:hover { background: rgba(0,0,0,0.07); }
        @media (max-width: 768px) { .nav-hamburger { display: flex; } }

        /* ── MOBILE DRAWER ── */
        .nav-mobile {
          position: fixed;
          top: 74px; left: 16px; right: 16px;
          z-index: 199;
          background: rgba(250,250,248,0.98);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 20px;
          box-shadow:
            0 8px 32px rgba(0,0,0,0.12),
            0 0 0 1px rgba(0,0,0,0.06);
          padding: 8px;
          display: flex; flex-direction: column; gap: 2px;
          transform: translateY(-10px) scale(0.97);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), opacity 0.18s ease;
        }
        .nav-mobile.open {
          transform: translateY(0) scale(1);
          opacity: 1;
          pointer-events: all;
        }
        @media (min-width: 769px) { .nav-mobile { display: none !important; } }

        .nav-mobile-link {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-size: 0.9rem; font-weight: 500;
          color: #1a1a1a; text-decoration: none;
          padding: 11px 16px; border-radius: 12px;
          transition: background 0.13s;
          display: block;
        }
        .nav-mobile-link:hover  { background: rgba(0,0,0,0.05); }
        .nav-mobile-link.active {
          color: #1d4ed8;
          background: rgba(29,78,216,0.07);
          font-weight: 600;
        }

        .nav-spacer { height: 78px; }
      `}</style>

      <div className={`nav-outer${scrolled ? ' scrolled' : ''}`}>
        <div className={`nav-pill${scrolled ? ' scrolled' : ''}`}>

          {/* ── Logo Badge ── */}
          <Link to="/" className="nav-logo">
            <div className="nav-logo-badge">
              <div className="nav-logo-icon-wrap">
                {/*
                  This renders your favicon.png cleanly inside a white circle.
                  The white background neutralises any dark/black bg the PNG may have.
                */}
                <img
                  src="/images/favicon.png"
                  alt=""
                  aria-hidden="true"
                />
              </div>
              <span className="nav-logo-wordmark">
                Get<span>Break</span>Tech
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="nav-links">
            {NAV_LINKS.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`nav-link${isActive(l.to) ? ' active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <div className="nav-actions">
            <button
              className="nav-hamburger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div ref={menuRef} className={`nav-mobile${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={`nav-mobile-link${isActive(l.to) ? ' active' : ''}`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </>
  )
}

export default Navbar