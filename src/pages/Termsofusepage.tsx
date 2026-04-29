import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Shield,
  BookOpen,
  AlertCircle,
  Users,
  ExternalLink,
  Copyright,
  Ban,
  RefreshCw,
  Mail,
  ChevronDown,
  FileText,
} from 'lucide-react'

/* ─── TYPES ─────────────────────────────────────────────── */

interface Section {
  id: string
  number: string
  icon: React.ElementType
  title: string
  content: React.ReactNode
}

interface TocItem {
  id: string
  number: string
  title: string
}

/* ─── TOC HOOK ───────────────────────────────────────────── */

function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-20% 0px -70% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [ids])

  return active
}

/* ─── DATA ──────────────────────────────────────────────── */

const LAST_UPDATED = 'June 2025'
const SITE_NAME = 'GetBreakTech'
const SITE_URL = 'https://www.getbreaktech.com'
const CONTACT_EMAIL = 'dolamonyakallo07@gmail.com'

const sections: Section[] = [
  {
    id: 'acceptance',
    number: '01',
    icon: Shield,
    title: 'Acceptance of Terms',
    content: (
      <>
        <p>
          By accessing or using <strong>{SITE_NAME}</strong> ({SITE_URL}), you confirm that you have read,
          understood, and agree to be bound by these Terms of Use. If you do not agree with any part
          of these terms, you must not use this website.
        </p>
        <p>
          These terms apply to all visitors, users, and anyone who accesses or uses the site —
          whether browsing, reading, or interacting with any content or features.
        </p>
        <p>
          We reserve the right to update or modify these Terms at any time. Changes take effect
          immediately upon being posted to this page. Continued use of the site after any changes
          constitutes your acceptance of the revised Terms. The date at the top of this page
          reflects when these terms were last updated.
        </p>
      </>
    ),
  },
  {
    id: 'description',
    number: '02',
    icon: BookOpen,
    title: 'About GetBreakTech',
    content: (
      <>
        <p>
          {SITE_NAME} is an independent, free educational platform that publishes career roadmaps,
          guides, and articles designed to help people transition into technology careers. All content
          is produced by a single creator based in South Africa.
        </p>
        <p>
          The site is supported by advertising (including Google AdSense). No premium tiers, paid
          memberships, or paywalls exist. All editorial content is free to access.
        </p>
        <p>
          {SITE_NAME} is a <strong>personal project</strong> — not a company, registered business,
          educational institution, or accredited training provider. It does not offer professional
          career counselling, certified courses, or any service that results in a qualification.
        </p>
      </>
    ),
  },
  {
    id: 'educational',
    number: '03',
    icon: AlertCircle,
    title: 'Educational Content Only',
    content: (
      <>
        <p>
          All content published on {SITE_NAME} — including roadmaps, guides, salary estimates,
          article recommendations, resource lists, and any other material — is provided for
          <strong> general educational and informational purposes only</strong>.
        </p>
        <div className="terms-callout">
          <AlertCircle size={16} />
          <p>
            Nothing on this site constitutes professional career advice, legal advice, financial
            advice, or any other form of licensed professional advice. You should not rely on
            this content as a substitute for consultation with a qualified professional.
          </p>
        </div>
        <p>
          Outcomes in career transitions vary significantly based on individual circumstances,
          effort, prior experience, location, and market conditions. No content on this site
          guarantees employment, a specific salary, or any particular career result. Any salary
          figures, timelines, or outcome estimates are illustrative only and based on publicly
          available information at the time of publication.
        </p>
        <p>
          Third-party resources, platforms, and tools referenced on this site are recommended
          based on our own research and evaluation. We do not guarantee the quality, accuracy,
          safety, or continued availability of any third-party service.
        </p>
      </>
    ),
  },
  {
    id: 'intellectual-property',
    number: '04',
    icon: Copyright,
    title: 'Intellectual Property',
    content: (
      <>
        <p>
          All original content on {SITE_NAME} — including text, roadmap structures, layout designs,
          graphics, and editorial copy — is the intellectual property of the site's creator and is
          protected by applicable copyright laws.
        </p>
        <p>
          You are welcome to:
        </p>
        <ul className="terms-list">
          <li>Read, save, and share links to content on this site for personal, non-commercial use.</li>
          <li>Quote brief excerpts (with clear attribution and a link back to the original page).</li>
          <li>Reference roadmap frameworks in your own personal learning plans.</li>
        </ul>
        <p>You may <strong>not</strong>:</p>
        <ul className="terms-list terms-list--negative">
          <li>Reproduce, republish, or copy substantial portions of any content without written permission.</li>
          <li>Sell, license, or commercially exploit any content from this site.</li>
          <li>Scrape, aggregate, or systematically download content for redistribution.</li>
          <li>Remove or obscure any attribution or copyright notices.</li>
          <li>Use site content to train AI models or machine learning systems without permission.</li>
        </ul>
        <p>
          To request permission for any use not covered above, contact us at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="terms-link">{CONTACT_EMAIL}</a>.
        </p>
      </>
    ),
  },
  {
    id: 'user-conduct',
    number: '05',
    icon: Users,
    title: 'User Conduct',
    content: (
      <>
        <p>
          When using {SITE_NAME}, you agree to behave in a manner that is lawful, respectful, and
          consistent with the intent of this platform. Specifically, you agree that you will not:
        </p>
        <ul className="terms-list terms-list--negative">
          <li>Use the site for any unlawful purpose or in violation of any applicable laws or regulations.</li>
          <li>Attempt to gain unauthorised access to any part of the site, its infrastructure, or its systems.</li>
          <li>Introduce viruses, malicious code, or any technology designed to disrupt or damage the site.</li>
          <li>Use automated tools (bots, scrapers, crawlers) to access the site in ways that impose an unreasonable burden on its infrastructure.</li>
          <li>Submit false, misleading, or fraudulent information through any contact or feedback mechanism.</li>
          <li>Impersonate {SITE_NAME} or its creator in any communication or on any platform.</li>
        </ul>
        <p>
          We reserve the right to block or restrict access to the site for any user who violates these
          terms, without notice and at our sole discretion.
        </p>
      </>
    ),
  },
  {
    id: 'third-party',
    number: '06',
    icon: ExternalLink,
    title: 'Third-Party Links & Resources',
    content: (
      <>
        <p>
          {SITE_NAME} links extensively to third-party websites, platforms, courses, and tools as
          part of its educational content. These links are provided for convenience and educational
          value.
        </p>
        <p>
          We have <strong>no control</strong> over the content, availability, privacy practices, or
          terms of any third-party site. Inclusion of a link does not imply endorsement, sponsorship,
          or affiliation unless explicitly stated.
        </p>
        <p>
          You access third-party links at your own risk. We strongly encourage you to review the
          terms and privacy policies of any external site before using it.
        </p>
        <p>
          Some links on this site may be affiliate links. Where this is the case, we may earn a
          small commission if you make a purchase — at no additional cost to you. We only link to
          products and services we believe are genuinely useful. Affiliate relationships do not
          influence our editorial recommendations.
        </p>
      </>
    ),
  },
  {
    id: 'advertising',
    number: '07',
    icon: FileText,
    title: 'Advertising',
    content: (
      <>
        <p>
          This site displays advertisements served through Google AdSense and potentially other
          advertising networks. These ads help cover the costs of running and maintaining the site.
        </p>
        <p>
          Advertisements are <strong>clearly distinct</strong> from editorial content. We do not
          accept direct paid placements, sponsored articles, or any arrangement in which an
          advertiser has influence over editorial content.
        </p>
        <p>
          Google AdSense may use cookies and other tracking technologies to serve ads that are
          relevant to your interests based on your browsing activity. You can opt out of
          personalised advertising at{' '}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="terms-link"
          >
            adssettings.google.com
          </a>
          .
        </p>
        <p>
          For more information on how Google uses data from sites that use its advertising services,
          visit{' '}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="terms-link"
          >
            Google's Privacy & Terms
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: 'disclaimers',
    number: '08',
    icon: Ban,
    title: 'Disclaimers & Limitation of Liability',
    content: (
      <>
        <p>
          {SITE_NAME} is provided on an <strong>"as is" and "as available"</strong> basis, without
          any warranties of any kind, express or implied. We do not warrant that:
        </p>
        <ul className="terms-list terms-list--negative">
          <li>The site will be uninterrupted, error-free, or free from viruses or other harmful components.</li>
          <li>Any information on the site is accurate, complete, current, or suitable for any particular purpose.</li>
          <li>Results obtained from using any content on the site will meet your expectations.</li>
        </ul>
        <p>
          To the fullest extent permitted by law, {SITE_NAME} and its creator shall not be liable
          for any direct, indirect, incidental, consequential, or punitive damages arising from:
        </p>
        <ul className="terms-list terms-list--negative">
          <li>Your use of, or inability to use, the site or its content.</li>
          <li>Any reliance you place on information published on the site.</li>
          <li>Decisions you make based on content found on this site.</li>
          <li>Unauthorised access to or alteration of your data.</li>
          <li>Any content or conduct of any third party linked to from this site.</li>
        </ul>
        <p>
          Nothing in these terms limits liability for death or personal injury caused by negligence,
          fraud, or any other liability that cannot be excluded by law.
        </p>
      </>
    ),
  },
  {
    id: 'updates',
    number: '09',
    icon: RefreshCw,
    title: 'Content Updates & Availability',
    content: (
      <>
        <p>
          We strive to keep all content on {SITE_NAME} accurate and up to date. However, the
          technology and careers landscape changes rapidly. Salary figures, tool recommendations,
          platform features, and hiring requirements may change at any time without notice.
        </p>
        <p>
          We review and update roadmaps and major guides periodically, but we cannot guarantee
          that any specific piece of content reflects the most current industry standards at any
          given moment. Always verify important information — particularly salary data and specific
          tool requirements — through current, primary sources before making career decisions.
        </p>
        <p>
          We reserve the right to modify, suspend, or discontinue any part of the site —
          including specific pages, features, or the entire site — at any time and without notice.
          We are not liable to you or any third party for any modification, suspension, or
          discontinuation of the site.
        </p>
      </>
    ),
  },
  {
    id: 'governing-law',
    number: '10',
    icon: Shield,
    title: 'Governing Law',
    content: (
      <>
        <p>
          These Terms of Use are governed by and construed in accordance with the laws of the
          <strong> Republic of South Africa</strong>, without regard to its conflict of law provisions.
        </p>
        <p>
          Any dispute arising from or in connection with these Terms that cannot be resolved
          informally shall be subject to the jurisdiction of the courts of South Africa.
        </p>
        <p>
          If you are accessing this site from outside South Africa, you are responsible for
          compliance with any local laws that may apply.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    number: '11',
    icon: Mail,
    title: 'Contact',
    content: (
      <>
        <p>
          If you have questions about these Terms of Use, believe content on this site infringes
          your rights, or need to report a concern, please contact us at:
        </p>
        <div className="terms-contact-block">
          <div className="terms-contact-icon">
            <Mail size={18} color="#fff" />
          </div>
          <div>
            <p className="terms-contact-label">Email</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="terms-contact-email">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
        <p>
          We aim to respond to all substantive enquiries within 5 business days. For general
          questions or content feedback, you can also use the{' '}
          <Link to="/contact" className="terms-link">Contact page</Link>.
        </p>
      </>
    ),
  },
]

const tocItems: TocItem[] = sections.map(({ id, number, title }) => ({ id, number, title }))

/* ─── COMPONENT ─────────────────────────────────────────── */

const TermsOfUsePage: React.FC = () => {
  const activeId = useActiveSection(sections.map((s) => s.id))
  const [tocOpen, setTocOpen] = useState<boolean>(false)

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
        }

        .terms-page {
          background: var(--bg);
          font-family: 'Sora', sans-serif;
          min-height: 100vh;
          padding-bottom: 100px;
          color: var(--ink);
        }

        /* ── header ──────────────────────────────────────────────────────── */
        .terms-header {
          background: var(--ink);
          padding: 56px 0 64px;
          position: relative;
          overflow: hidden;
        }
        .terms-header::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 55% 80% at 100% 50%, rgba(15,82,186,.4) 0%, transparent 70%),
            radial-gradient(ellipse 30% 50% at 0% 100%, rgba(181,242,60,.08) 0%, transparent 60%);
        }
        /* decorative large number */
        .terms-header::after {
          content: '§';
          position: absolute;
          right: 6%;
          top: 50%;
          transform: translateY(-50%);
          font-family: 'Playfair Display', serif;
          font-size: 14rem;
          color: rgba(255,255,255,.03);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }
        .terms-header-inner {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 28px;
          position: relative;
          z-index: 1;
        }
        .header-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: .8rem;
          font-weight: 500;
          color: rgba(255,255,255,.45);
          text-decoration: none;
          margin-bottom: 40px;
          transition: color .2s;
        }
        .header-back:hover { color: rgba(255,255,255,.85); }

        .header-eyebrow {
          font-size: .7rem;
          font-weight: 700;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: var(--lime);
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .header-eyebrow span {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--lime);
          border-radius: 2px;
        }
        .header-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 5vw, 3.2rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 14px;
        }
        .header-meta {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .header-meta-item {
          font-size: .78rem;
          color: rgba(255,255,255,.4);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .header-meta-item strong {
          color: rgba(255,255,255,.65);
          font-weight: 600;
        }
        .meta-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,.2);
        }

        /* ── layout ──────────────────────────────────────────────────────── */
        .terms-layout {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 28px;
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 40px;
          align-items: start;
          margin-top: 48px;
        }
        @media (max-width: 768px) {
          .terms-layout {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }

        /* ── sticky TOC ──────────────────────────────────────────────────── */
        .terms-toc {
          position: sticky;
          top: 90px;
        }
        @media (max-width: 768px) {
          .terms-toc {
            position: static;
            margin-bottom: 32px;
          }
        }

        .toc-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
        }

        /* mobile TOC toggle */
        .toc-toggle {
          display: none;
          width: 100%;
          padding: 14px 16px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Sora', sans-serif;
          font-size: .82rem;
          font-weight: 700;
          color: var(--ink);
          text-transform: uppercase;
          letter-spacing: .1em;
          align-items: center;
          justify-content: space-between;
        }
        @media (max-width: 768px) {
          .toc-toggle { display: flex; }
          .toc-inner  { display: none; }
          .toc-inner.open { display: block; }
        }

        .toc-header {
          padding: 14px 16px 10px;
          font-size: .7rem;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--ink-3);
          border-bottom: 1px solid var(--border);
        }
        @media (max-width: 768px) { .toc-header { display: none; } }

        .toc-list {
          padding: 8px 0;
          list-style: none;
        }
        .toc-item {
          display: block;
        }
        .toc-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 16px;
          text-decoration: none;
          font-size: .78rem;
          font-weight: 400;
          color: var(--ink-3);
          transition: color .18s, background .18s;
          border-left: 2px solid transparent;
        }
        .toc-link:hover {
          color: var(--ink);
          background: #f5f5f3;
        }
        .toc-link.active {
          color: var(--accent);
          font-weight: 600;
          border-left-color: var(--accent);
          background: #eff6ff;
        }
        .toc-num {
          font-size: .65rem;
          font-weight: 700;
          color: var(--ink-3);
          opacity: .6;
          flex-shrink: 0;
          font-variant-numeric: tabular-nums;
        }
        .toc-link.active .toc-num {
          color: var(--accent);
          opacity: .8;
        }

        /* ── content column ──────────────────────────────────────────────── */
        .terms-content {
          min-width: 0;
        }

        /* ── section ─────────────────────────────────────────────────────── */
        .terms-section {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 40px;
          margin-bottom: 16px;
          scroll-margin-top: 100px;
        }

        .section-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .section-num {
          font-size: .65rem;
          font-weight: 800;
          letter-spacing: .15em;
          color: var(--accent);
          text-transform: uppercase;
        }
        .section-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .section-h {
          font-family: 'Playfair Display', serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.25;
          margin-bottom: 20px;
        }

        /* prose */
        .terms-section p {
          font-size: .9rem;
          color: var(--ink-2);
          line-height: 1.9;
          font-weight: 300;
          margin-bottom: 14px;
        }
        .terms-section p:last-child { margin-bottom: 0; }
        .terms-section p strong {
          font-weight: 600;
          color: var(--ink);
        }

        /* lists */
        .terms-list {
          margin: 10px 0 14px 0;
          padding: 0;
          list-style: none;
        }
        .terms-list li {
          font-size: .875rem;
          color: var(--ink-2);
          line-height: 1.75;
          font-weight: 300;
          padding: 6px 0 6px 22px;
          position: relative;
          border-bottom: 1px solid #f3f3f1;
        }
        .terms-list li:last-child { border-bottom: none; }
        .terms-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 14px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          opacity: .5;
        }
        .terms-list--negative li::before {
          background: #ef4444;
          opacity: .55;
        }

        /* callout */
        .terms-callout {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          background: #fffbeb;
          border: 1px solid #fde68a;
          border-radius: 12px;
          padding: 16px;
          margin: 16px 0;
          color: #78350f;
        }
        .terms-callout svg { flex-shrink: 0; margin-top: 2px; color: #d97706; }
        .terms-callout p {
          font-size: .85rem !important;
          color: #78350f !important;
          margin: 0 !important;
          line-height: 1.7 !important;
        }

        /* links */
        .terms-link {
          color: var(--accent);
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: opacity .18s;
        }
        .terms-link:hover { opacity: .75; }

        /* contact block */
        .terms-contact-block {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #eff6ff;
          border-radius: 12px;
          padding: 16px;
          margin: 18px 0;
        }
        .terms-contact-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .terms-contact-label {
          font-size: .72rem !important;
          color: var(--ink-3) !important;
          margin-bottom: 2px !important;
          line-height: 1 !important;
          font-weight: 500 !important;
        }
        .terms-contact-email {
          font-size: .9rem;
          font-weight: 600;
          color: var(--accent);
          text-decoration: none;
        }
        .terms-contact-email:hover { text-decoration: underline; }

        /* ── intro banner ────────────────────────────────────────────────── */
        .terms-intro {
          background: linear-gradient(135deg, #0f52ba 0%, #1a73e8 100%);
          border-radius: 20px;
          padding: 32px 36px;
          margin-bottom: 16px;
          position: relative;
          overflow: hidden;
        }
        .terms-intro::before {
          content: '';
          position: absolute;
          bottom: -40px; right: -40px;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,.08) 0%, transparent 70%);
        }
        .terms-intro p {
          font-size: .9rem;
          color: rgba(255,255,255,.8);
          line-height: 1.85;
          font-weight: 300;
          position: relative;
          z-index: 1;
          margin: 0;
        }
        .terms-intro p strong {
          color: #fff;
          font-weight: 600;
        }
        .terms-intro-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
        }
        .terms-intro-header span {
          font-size: .75rem;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--lime);
        }

        /* ── footer note ─────────────────────────────────────────────────── */
        .terms-footer-note {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px 32px;
          text-align: center;
          margin-top: 8px;
        }
        .terms-footer-note p {
          font-size: .82rem;
          color: var(--ink-3);
          line-height: 1.75;
          font-weight: 300;
        }
        .terms-footer-note p + p { margin-top: 8px; }
      `}</style>

      <div className="terms-page">

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <div className="terms-header">
          <div className="terms-header-inner">
            <Link to="/" className="header-back">
              <ArrowLeft size={14} /> Back to home
            </Link>

            <p className="header-eyebrow">
              <span /> Legal
            </p>
            <h1 className="header-h1">Terms of Use</h1>

            <div className="header-meta">
              <span className="header-meta-item">
                <FileText size={12} />
                <strong>{SITE_NAME}</strong>
              </span>
              <span className="meta-dot" />
              <span className="header-meta-item">
                Last updated: <strong>{LAST_UPDATED}</strong>
              </span>
              <span className="meta-dot" />
              <span className="header-meta-item">
                {sections.length} sections
              </span>
            </div>
          </div>
        </div>

        {/* ── LAYOUT ─────────────────────────────────────────────────────── */}
        <div className="terms-layout">

          {/* ── STICKY TOC ── */}
          <aside className="terms-toc">
            <div className="toc-card">
              {/* mobile toggle */}
              <button
                className="toc-toggle"
                onClick={() => setTocOpen((o) => !o)}
                aria-expanded={tocOpen}
              >
                Contents
                <ChevronDown
                  size={16}
                  style={{
                    transform: tocOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform .2s',
                  }}
                />
              </button>

              <div className={`toc-inner${tocOpen ? ' open' : ''}`}>
                <p className="toc-header">Contents</p>
                <ul className="toc-list">
                  {tocItems.map((item: TocItem) => (
                    <li key={item.id} className="toc-item">
                      <a
                        href={`#${item.id}`}
                        className={`toc-link${activeId === item.id ? ' active' : ''}`}
                        onClick={() => setTocOpen(false)}
                      >
                        <span className="toc-num">{item.number}</span>
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* ── CONTENT ── */}
          <main className="terms-content">

            {/* intro banner */}
            <div className="terms-intro">
              <div className="terms-intro-header">
                <Shield size={14} color="#b5f23c" />
                <span>Please read carefully</span>
              </div>
              <p>
                These Terms of Use govern your access to and use of <strong>{SITE_NAME}</strong>.
                By using this site, you agree to these terms. If you do not agree, please do not
                use the site. These terms were last updated in <strong>{LAST_UPDATED}</strong>{' '}
                and apply to all content and features currently available on {SITE_URL}.
              </p>
            </div>

            {/* sections */}
            {sections.map((section: Section) => {
              const Icon = section.icon
              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="terms-section"
                >
                  <div className="section-eyebrow">
                    <span className="section-num">§ {section.number}</span>
                    <div className="section-icon-wrap">
                      <Icon size={14} color="#0f52ba" />
                    </div>
                  </div>
                  <h2 className="section-h">{section.title}</h2>
                  {section.content}
                </section>
              )
            })}

            {/* footer note */}
            <div className="terms-footer-note">
              <p>
                These Terms of Use were last updated in <strong>{LAST_UPDATED}</strong>. If you
                have questions, contact us at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="terms-link">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
              <p>
                © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
              </p>
            </div>

          </main>
        </div>
      </div>
    </>
  )
}

export default TermsOfUsePage