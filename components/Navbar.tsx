import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

// ── IMPORTANT: Place your logo files in /public/images/ ──
// favicon.png  →  /public/images/favicon.png   (the "G" swirl icon)
// logo.png     →  /public/images/logo.png      (full logo with text)

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
          max-width: 900px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px 0 12px;
          background: #f5f5f4;
          border-radius: 999px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04);
          transition: box-shadow 0.3s ease;
        }
        .nav-pill:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05);
        }
        @media (max-width: 480px) {
          .nav-pill { height: 48px; padding: 0 6px 0 10px; }
        }

        /* ── LOGO ── */
        .nav-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
        }

        /* Full logo (icon + wordmark image) — shown on ≥521px */
        .nav-logo-full {
          height: 36px;
          width: auto;
          display: block;
          /* The logo.png has a black background, so we invert it to look
             clean on the light pill. Remove the filter if your logo.png
             already has a transparent background. */
         
          /* Optional: if you want to keep the blue colour, use:
          */
        }

        /* Icon-only (favicon) — shown on ≤520px */
        .nav-logo-icon-img {
          height: 30px;
          width: 30px;
          object-fit: contain;
          display: none;
          /* favicon.png has a black background — blend it away */
          mix-blend-mode: multiply;
          
        }

        @media (max-width: 520px) {
          .nav-logo-full      { display: none; }
          .nav-logo-icon-img  { display: block; }
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.15rem;
        }
        @media (max-width: 768px) { .nav-links { display: none; } }

        .nav-link {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-size: 0.82rem;
          font-weight: 450;
          color: #4b4b4b;
          text-decoration: none;
          padding: 6px 10px;
          border-radius: 999px;
          transition: color 0.18s, background 0.18s;
          white-space: nowrap;
        }
        .nav-link:hover  { color: #2563eb; background: rgba(37,99,235,0.07); }
        .nav-link.active { color: #2563eb; font-weight: 600; }

        .nav-actions {
          display: flex; align-items: center; gap: 4px; flex-shrink: 0;
        }

        .nav-hamburger {
          display: none;
          background: none; border: none; cursor: pointer;
          color: #1a1a1a; padding: 6px; border-radius: 50%;
          transition: background 0.18s;
          align-items: center; justify-content: center;
        }
        .nav-hamburger:hover { background: rgba(0,0,0,0.07); }
        @media (max-width: 768px) { .nav-hamburger { display: flex; } }

        .nav-mobile {
          position: fixed;
          top: 72px; left: 16px; right: 16px;
          z-index: 199;
          background: #f5f5f4;
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06);
          padding: 8px;
          display: flex; flex-direction: column; gap: 2px;
          transform: translateY(-12px) scale(0.97);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.22s ease, opacity 0.22s ease;
        }
        .nav-mobile.open {
          transform: translateY(0) scale(1);
          opacity: 1;
          pointer-events: all;
        }
        @media (min-width: 769px) { .nav-mobile { display: none !important; } }

        .nav-mobile-link {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-size: 0.92rem; font-weight: 500;
          color: #1a1a1a; text-decoration: none;
          padding: 11px 14px; border-radius: 12px;
          transition: background 0.15s;
          display: block;
        }
        .nav-mobile-link:hover  { background: rgba(0,0,0,0.05); }
        .nav-mobile-link.active { color: #2563eb; background: rgba(37,99,235,0.07); font-weight: 600; }

        .nav-spacer { height: 76px; }
      `}</style>

      <div className={`nav-outer${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-pill">

          {/* ── Logo ── */}
          <Link to="/" className="nav-logo">
            {/* Full logo (desktop) */}
            <img
              src="/images/logo.png"
              alt="GetBreakTech"
              className="nav-logo-full"
            />
            {/* Icon only (mobile) */}
            <img
              src="/images/favicon.png"
              alt="GetBreakTech"
              className="nav-logo-icon-img"
            />
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
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
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