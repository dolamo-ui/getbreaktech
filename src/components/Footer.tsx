// src/components/Footer.tsx
// Newsletter + Footer — email saved to Firebase Firestore
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState }           from 'react'
import { Link }                       from 'react-router-dom'
import { Mail, X, Link2, ArrowRight } from 'lucide-react'
import { FaTiktok }                   from 'react-icons/fa'
import { saveEmail }                  from '../services/emailService'

// ── NEWSLETTER ───────────────────────────────────────────────────────────────

export const Newsletter: React.FC = () => {
  const [email,  setEmail]  = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'dup' | 'err'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    const result = await saveEmail(email, 'newsletter_footer')
    setStatus(result === 'saved' ? 'done' : result === 'duplicate' ? 'dup' : 'err')
  }

  return (
    <section style={{
      background: 'linear-gradient(135deg, #0d1b2e 0%, #0d1f2d 55%, #0a2318 100%)',
      padding: '56px 24px',
    }}>
      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>

        <p style={{
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: '#4ade80', marginBottom: 12,
        }}>
          Free Weekly Newsletter
        </p>

        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 700,
          color: '#ffffff', lineHeight: 1.2, marginBottom: 12,
        }}>
          Stay Ahead of the Curve
        </h2>

        <p style={{
          fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.7, maxWidth: 480, margin: '0 auto 32px',
        }}>
          Weekly insights on tech career trends, job-hunting strategies, salary data,
          and curated learning resources — delivered free to your inbox.
        </p>

        {/* ── Feedback messages ── */}
        {status === 'done' && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)',
            borderRadius: 12, padding: '14px 28px', color: '#4ade80',
            fontWeight: 600, fontSize: '0.9rem',
          }}>
            ✓ You're in! Check your inbox for a confirmation.
          </div>
        )}
        {status === 'dup' && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)',
            borderRadius: 12, padding: '14px 28px', color: '#4ade80',
            fontWeight: 600, fontSize: '0.9rem',
          }}>
            ✓ You're already subscribed — thanks!
          </div>
        )}
        {status === 'err' && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 12, padding: '14px 28px', color: '#fca5a5',
            fontWeight: 600, fontSize: '0.9rem',
          }}>
            ✗ Something went wrong — please try again.
          </div>
        )}

        {/* ── Form (hide after success) ── */}
        {status !== 'done' && status !== 'dup' && (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex', gap: 10, maxWidth: 440,
              margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center',
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                flex: '1 1 220px', padding: '13px 18px', borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.07)', color: '#ffffff',
                fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '13px 22px', borderRadius: 10, border: 'none',
                background: '#16a34a', color: '#ffffff', fontSize: '0.875rem',
                fontWeight: 700, cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit', whiteSpace: 'nowrap',
                opacity: status === 'loading' ? 0.7 : 1,
              }}
            >
              {status === 'loading' ? 'Saving…' : <> Subscribe Free <ArrowRight size={14} /> </>}
            </button>
          </form>
        )}

        <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', marginTop: 14 }}>
          No spam, ever. Unsubscribe with one click anytime.
        </p>
      </div>
    </section>
  )
}

// ── FOOTER ───────────────────────────────────────────────────────────────────

const footerLinks = {
  explore: [
    { href: '/roadmaps',      label: 'Career Roadmaps'      },
    { href: '/career-change', label: 'Career Change Guides' },
    { href: '/ai-career',     label: 'AI & Future Careers'  },
    { href: '/blog',          label: 'Blog & Articles'      },
  ],
  resources: [
    { href: '/blog',          label: 'Career Guides'          },
    { href: '/roadmaps',      label: 'Learning Roadmaps'      },
    { href: '/ai-career',     label: 'AI Career Intelligence' },
    { href: '/career-change', label: 'Career Transition Help' },
  ],
  company: [
    { href: '/about',   label: 'About the Creator' },
    { href: '/contact', label: 'Contact'            },
    { href: '/privacy', label: 'Privacy Policy'     },
    { href: '/terms',   label: 'Terms of Use'       },
  ],
}

const lnkStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.82rem',
  color: 'rgba(255,255,255,0.38)',
  textDecoration: 'none',
  marginBottom: 10,
  transition: 'color 0.2s',
}
const mouseOn  = (e: React.MouseEvent<HTMLElement>) =>
  ((e.currentTarget as HTMLElement).style.color = '#fff')
const mouseOff = (e: React.MouseEvent<HTMLElement>) =>
  ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.38)')

// Social icon button style
const socialBtn: React.CSSProperties = {
  width: 32, height: 32, borderRadius: '50%',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
  transition: 'all 0.2s',
}

export const Footer: React.FC = () => (
  <footer style={{
    background: '#080d18',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    padding: '52px 24px 28px',
  }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '2.5rem',
        marginBottom: 48,
      }}>

        {/* ── Brand column ── */}
        <div>
          {/* Logo badge — matches the Navbar style */}
          <Link
            to="/"
            style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', marginBottom: 16 }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
              borderRadius: 999, padding: '5px 14px 5px 6px',
              boxShadow: '0 2px 8px rgba(15,23,42,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}>
              {/* Favicon in white circle */}
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: '#ffffff', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', flexShrink: 0,
              }}>
                <img
                  src="/images/favicon.png"
                  alt=""
                  aria-hidden="true"
                  style={{ width: 20, height: 20, objectFit: 'contain', display: 'block' }}
                />
              </div>
              {/* Wordmark */}
              <span style={{
                fontFamily: "'Space Grotesk', 'Helvetica Neue', sans-serif",
                fontSize: '0.8rem', fontWeight: 700, color: '#ffffff',
                letterSpacing: '0.01em', whiteSpace: 'nowrap',
              }}>
                Get<span style={{ color: '#60a5fa' }}>Break</span>Tech
              </span>
            </div>
          </Link>

          <p style={{
            fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)',
            lineHeight: 1.75, marginBottom: 20, maxWidth: 220,
          }}>
            Free, step-by-step career roadmaps for anyone looking to break into tech — no degree required.
          </p>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: 8 }}>
            {([
              {
                // ✅ Fixed: was missing the 'h' — ttps:// → https://
                href: 'https://www.tiktok.com/@getbreaktech',
                icon: <FaTiktok size={14} />,
                label: 'TikTok',
              },
              {
                href: 'https://x.com/getbreakget',
                icon: <X size={14} />,
                label: 'Twitter / X',
              },
              {
                href: 'https://www.linkedin.com/in/nyakallo-dolamo-8192aa324/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BAzLpTxzpS%2FmQuxIo1YTdFQ%3D%3D',
                icon: <Link2 size={14} />,
                label: 'LinkedIn',
              },
              {
                href: 'mailto:dolamonyakallo07@gmail.com',
                icon: <Mail size={14} />,
                label: 'Email',
              },
            ] as { href: string; icon: React.ReactNode; label: string }[]).map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                style={socialBtn}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'
                  ;(e.currentTarget as HTMLElement).style.color = '#fff'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'
                  ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Explore column ── */}
        <div>
          <p style={{
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#ffffff', marginBottom: 16,
          }}>
            Explore
          </p>
          {footerLinks.explore.map(l => (
            <Link
              key={l.href}
              to={l.href}
              style={lnkStyle}
              onMouseEnter={mouseOn}
              onMouseLeave={mouseOff}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* ── Resources column ── */}
        <div>
          <p style={{
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#ffffff', marginBottom: 16,
          }}>
            Resources
          </p>
          {footerLinks.resources.map(l => (
            <Link
              key={l.label}
              to={l.href}
              style={lnkStyle}
              onMouseEnter={mouseOn}
              onMouseLeave={mouseOff}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* ── Company column ── */}
        <div>
          <p style={{
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#ffffff', marginBottom: 16,
          }}>
            Company
          </p>
          {footerLinks.company.map(l => (
            <Link
              key={l.href}
              to={l.href}
              style={lnkStyle}
              onMouseEnter={mouseOn}
              onMouseLeave={mouseOff}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <p style={{ fontSize: '0.73rem', color: 'rgba(255,255,255,0.2)', margin: 0 }}>
          © {new Date().getFullYear()} GetBreakTech. Built by{' '}
          <Link
            to="/about"
            style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}
          >
            Nyakallo Dolamo
          </Link>.
        </p>

        <div style={{ display: 'flex', gap: 20 }}>
          {[
            { href: '/privacy', label: 'Privacy Policy' },
            { href: '/terms',   label: 'Terms of Use'   },
            { href: '/contact', label: 'Contact'         },
          ].map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              style={{
                fontSize: '0.73rem', color: 'rgba(255,255,255,0.22)',
                textDecoration: 'none', transition: 'color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.22)' }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* AdSense disclosure */}
      <p style={{
        fontSize: '0.65rem', color: 'rgba(255,255,255,0.14)',
        marginTop: 16, lineHeight: 1.6, textAlign: 'center',
      }}>
        This site is supported by Google AdSense advertising.{' '}
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'rgba(255,255,255,0.28)', textDecoration: 'underline' }}
        >
          Learn more
        </a>.
      </p>
    </div>
  </footer>
)

export default Footer