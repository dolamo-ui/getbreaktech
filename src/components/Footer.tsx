import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Compass, GitBranch, Mail } from 'lucide-react'

// ── Types ────────────────────────────────────────────────────────────────────

interface FooterLinkItem {
  href: string
  label: string
}

interface FooterLinksMap {
  explore: FooterLinkItem[]
  resources: FooterLinkItem[]
  company: FooterLinkItem[]
}

// ── Data ─────────────────────────────────────────────────────────────────────

const footerLinks: FooterLinksMap = {
  explore: [
    { href: '/roadmaps', label: 'Career Roadmaps' },
    { href: '/career-change', label: 'Career Change' },
    { href: '/ai-careers', label: 'AI & Future Careers' },
    { href: '/skills', label: 'Skills Guide' },
  ],
  resources: [
    { href: '/blog', label: 'Blog' },
    { href: '/guides', label: 'Guides' },
    { href: '/tools', label: 'Career Tools' },
    { href: '/community', label: 'Community' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/careers', label: 'Careers' },
    { href: '/privacy', label: 'Privacy Policy' },
  ],
}

// ── Styles ───────────────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
  /* Newsletter */
  nlWrapper: {
    background: '#080d18',
    padding: '2.5rem 2rem',
  },
  nlCard: {
    background: 'linear-gradient(135deg, #0d1b2e 0%, #0d1f2d 55%, #0a2318 100%)',
    borderRadius: '16px',
    padding: '2.5rem 3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '2rem',
    maxWidth: '960px',
    margin: '0 auto',
    flexWrap: 'wrap',
  },
  nlLeft: { flex: '1 1 280px' },
  nlTitle: {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontWeight: 800,
    color: '#ffffff',
    lineHeight: 1.2,
    margin: '0 0 0.75rem 0',
  },
  nlSub: {
    fontSize: '0.88rem',
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 1.65,
    margin: 0,
    maxWidth: '340px',
  },
  nlRight: {
    flex: '1 1 340px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.55rem',
  },
  nlRow: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
  },
  emailInput: {
    flex: 1,
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    padding: '0.85rem 1.2rem',
    color: '#ffffff',
    fontSize: '0.88rem',
    outline: 'none',
    fontFamily: 'inherit',
    minWidth: 0,
  },
  joinBtn: {
    background: '#16a34a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    padding: '0.85rem 1.75rem',
    fontSize: '0.9rem',
    fontWeight: 700,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontFamily: 'inherit',
    transition: 'background 0.2s, transform 0.15s',
  },
  spamNote: {
    fontSize: '0.76rem',
    color: 'rgba(255,255,255,0.3)',
    margin: 0,
  },

  /* Footer */
  footer: {
    background: '#080d18',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    padding: '3.5rem 2rem 2rem',
  },
  footerInner: {
    maxWidth: '1100px',
    margin: '0 auto',
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: '1.8fr 1fr 1fr 1fr',
    gap: '2.5rem',
    marginBottom: '3rem',
  },
  brandLogoWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    textDecoration: 'none',
    marginBottom: '1rem',
  },
  logoIcon: {
    width: '36px',
    height: '36px',
    background: '#1d4ed8',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  logoText: {
    fontSize: '1rem',
    fontWeight: 700,
    color: '#ffffff',
  },
  brandDesc: {
    fontSize: '0.82rem',
    color: 'rgba(255,255,255,0.35)',
    lineHeight: 1.75,
    maxWidth: '240px',
    margin: '0 0 1.25rem 0',
  },
  socialRow: {
    display: 'flex',
    gap: '0.55rem',
  },
  socialBtn: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255,255,255,0.4)',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  colTitle: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#ffffff',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '1rem',
  },
  colLink: {
    display: 'block',
    fontSize: '0.82rem',
    color: 'rgba(255,255,255,0.38)',
    textDecoration: 'none',
    marginBottom: '0.65rem',
    transition: 'color 0.2s',
  },
  footerBottom: {
    borderTop: '1px solid rgba(255,255,255,0.05)',
    paddingTop: '1.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  copyright: {
    fontSize: '0.76rem',
    color: 'rgba(255,255,255,0.22)',
    margin: 0,
  },
  bottomLinks: {
    display: 'flex',
    gap: '1.5rem',
  },
  bottomLink: {
    fontSize: '0.76rem',
    color: 'rgba(255,255,255,0.22)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
}

// ── Newsletter ────────────────────────────────────────────────────────────────

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [joinHover, setJoinHover] = useState<boolean>(false)

  return (
    <section style={s.nlWrapper} className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div
        style={s.nlCard}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 p-6 sm:p-10 rounded-2xl mx-auto w-full"
      >
        {/* Left */}
        <div style={s.nlLeft} className="w-full sm:w-auto">
          <h2 style={s.nlTitle} className="text-2xl sm:text-3xl">
            Stay Ahead of the<br />Curve
          </h2>
          <p style={s.nlSub} className="text-sm sm:text-base">
            Weekly insights on tech trends, job hunting strategies, and learning
            resources delivered to your inbox.
          </p>
        </div>

        {/* Right */}
        <div style={s.nlRight} className="w-full sm:w-auto flex-1">
          <div style={s.nlRow} className="flex flex-col sm:flex-row gap-3 w-full">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              style={s.emailInput}
              className="w-full sm:flex-1 rounded-xl px-4 py-3 text-sm"
            />
            <button
              style={{
                ...s.joinBtn,
                background: joinHover ? '#15803d' : '#16a34a',
                transform: joinHover ? 'translateY(-1px)' : 'translateY(0)',
              }}
              onMouseEnter={() => setJoinHover(true)}
              onMouseLeave={() => setJoinHover(false)}
              className="w-full sm:w-auto rounded-xl px-6 py-3 text-sm font-bold"
            >
              Join Now
            </button>
          </div>
          <p style={s.spamNote} className="text-xs mt-1">
            No spam. Just value. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────

export const Footer: React.FC = () => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const socialLinks = [
    { id: 'github', icon: <GitBranch size={14} />, href: '#', label: 'GitHub' },
    { id: 'mail', icon: <Mail size={14} />, href: '#', label: 'Email' },
  ]

  const linkId = (prefix: string, href: string) => `${prefix}-${href}`

  return (
    <footer style={s.footer} className="px-4 sm:px-6 lg:px-8 pt-10 pb-6">
      <div style={s.footerInner} className="w-full max-w-[1100px] mx-auto">

        {/* Grid — 1 col mobile → 2 col sm → 4 col lg */}
        <div
          style={s.footerGrid}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-8 sm:gap-10 mb-10"
        >
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link to="/" style={s.brandLogoWrap} className="flex items-center gap-2 mb-4">
              <div style={s.logoIcon}>
                <Compass size={17} color="#fff" />
              </div>
              <span style={s.logoText}>CareerPathGuide</span>
            </Link>
            <p style={s.brandDesc} className="text-xs sm:text-sm mb-5">
              Your comprehensive guide to navigating career paths with
              step-by-step roadmaps, skill checkpoints, and real-world insights.
            </p>
            <div style={s.socialRow} className="flex gap-2">
              {socialLinks.map(({ id, icon, href, label }) => (
                <a
                  key={id}
                  href={href}
                  aria-label={label}
                  style={{
                    ...s.socialBtn,
                    background:
                      hoveredSocial === id
                        ? 'rgba(255,255,255,0.12)'
                        : 'rgba(255,255,255,0.06)',
                    color:
                      hoveredSocial === id ? '#ffffff' : 'rgba(255,255,255,0.4)',
                  }}
                  onMouseEnter={() => setHoveredSocial(id)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <p style={s.colTitle} className="text-xs uppercase tracking-widest font-bold mb-4">
              Explore
            </p>
            {footerLinks.explore.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                style={{
                  ...s.colLink,
                  color:
                    hoveredLink === linkId('explore', link.href)
                      ? '#ffffff'
                      : 'rgba(255,255,255,0.38)',
                }}
                onMouseEnter={() => setHoveredLink(linkId('explore', link.href))}
                onMouseLeave={() => setHoveredLink(null)}
                className="block text-sm mb-2"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Resources */}
          <div>
            <p style={s.colTitle} className="text-xs uppercase tracking-widest font-bold mb-4">
              Resources
            </p>
            {footerLinks.resources.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                style={{
                  ...s.colLink,
                  color:
                    hoveredLink === linkId('resources', link.href)
                      ? '#ffffff'
                      : 'rgba(255,255,255,0.38)',
                }}
                onMouseEnter={() => setHoveredLink(linkId('resources', link.href))}
                onMouseLeave={() => setHoveredLink(null)}
                className="block text-sm mb-2"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <p style={s.colTitle} className="text-xs uppercase tracking-widest font-bold mb-4">
              Company
            </p>
            {footerLinks.company.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                style={{
                  ...s.colLink,
                  color:
                    hoveredLink === linkId('company', link.href)
                      ? '#ffffff'
                      : 'rgba(255,255,255,0.38)',
                }}
                onMouseEnter={() => setHoveredLink(linkId('company', link.href))}
                onMouseLeave={() => setHoveredLink(null)}
                className="block text-sm mb-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={s.footerBottom}
          className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 pt-6 border-t border-white/5"
        >
          <p style={s.copyright} className="text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} CareerPathGuide. All rights reserved.
          </p>
          <div style={s.bottomLinks} className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {[
              { href: '/terms', label: 'Terms' },
              { href: '/privacy', label: 'Privacy' },
              { href: '/cookies', label: 'Cookies' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                style={{
                  ...s.bottomLink,
                  color:
                    hoveredLink === linkId('bottom', href)
                      ? 'rgba(255,255,255,0.6)'
                      : 'rgba(255,255,255,0.22)',
                }}
                onMouseEnter={() => setHoveredLink(linkId('bottom', href))}
                onMouseLeave={() => setHoveredLink(null)}
                className="text-xs"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer