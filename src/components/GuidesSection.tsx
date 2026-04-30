import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Clock, TrendingUp, ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const featuredGuides = [
  {
    slug: "devops",
    title: "DevOps Engineer",
    description: "No experience? No problem. Learn how to automate, deploy, and manage systems — one step at a time.",
    category: "Tech",
    readTime: "16 min read",
    salary: "$95k–$135k/yr",
    trending: true,
    gradientFrom: "#8b5cf6",
    gradientTo: "#6366f1",
    accentColor: "#8b5cf6",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="5" rx="2" />
        <rect x="2" y="10" width="20" height="5" rx="2" />
        <rect x="2" y="17" width="20" height="4" rx="2" />
        <circle cx="6" cy="5.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="6" cy="12.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="6" cy="19" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    slug: "cloud-engineer",
    title: "Cloud Engineer",
    description: "Start from zero and learn how to build, scale, and secure cloud systems used by top companies worldwide.",
    category: "Tech",
    readTime: "14 min read",
    salary: "$90k–$130k/yr",
    trending: true,
    gradientFrom: "#0ea5e9",
    gradientTo: "#06b6d4",
    accentColor: "#0ea5e9",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 0 1 0 9Z" />
      </svg>
    ),
  },
  {
    slug: "cybersecurity-specialist",
    title: "Cybersecurity Specialist",
    description: "Learn to protect systems and data from hackers — a beginner-friendly path into one of tech's fastest-growing fields.",
    category: "Security",
    readTime: "18 min read",
    salary: "$85k–$125k/yr",
    trending: true,
    gradientFrom: "#ef4444",
    gradientTo: "#f97316",
    accentColor: "#ef4444",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    slug: "data-science",
    title: "Data Scientist",
    description: "Turn raw numbers into real insights. Perfect for students who love patterns, math, or just want a high-paying career.",
    category: "Data",
    readTime: "18 min read",
    salary: "$100k–$145k/yr",
    trending: true,
    gradientFrom: "#06b6d4",
    gradientTo: "#3b82f6",
    accentColor: "#06b6d4",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <path d="M3 20h18" />
        <circle cx="18" cy="10" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="12" cy="4" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="6" cy="14" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    slug: "data-analyst",
    title: "Data Analyst",
    description: "Already use Excel or Google Sheets? You're closer than you think. Learn to analyse data and land your first tech role.",
    category: "Data",
    readTime: "13 min read",
    salary: "$60k–$95k/yr",
    trending: false,
    gradientFrom: "#10b981",
    gradientTo: "#06b6d4",
    accentColor: "#10b981",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="9" y1="3" x2="9" y2="21" />
      </svg>
    ),
  },
  {
    slug: "software-developer",
    title: "Software Developer",
    description: "The ultimate beginner's entry point into tech. Build real apps, write real code, and get your first developer job.",
    category: "Tech",
    readTime: "15 min read",
    salary: "$80k–$130k/yr",
    trending: true,
    gradientFrom: "#3b82f6",
    gradientTo: "#6366f1",
    accentColor: "#3b82f6",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="12" y1="2" x2="12" y2="22" strokeDasharray="2 2" />
      </svg>
    ),
  },
]

export function GuidesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      )

      const cards = cardsRef.current?.children
      if (!cards) return

      Array.from(cards).forEach((card) => {
        (card as HTMLElement).style.opacity = "1"
      })

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 90%",
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .fgs-section {
          background: #f8f7f4;
          font-family: 'DM Sans', sans-serif;
          padding: 80px 0 100px;
        }
        .fgs-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 28px;
        }
        .fgs-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: 52px;
        }
        .fgs-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #6366f1;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .fgs-eyebrow::before {
          content: '';
          display: block;
          width: 24px;
          height: 2px;
          background: #6366f1;
          border-radius: 2px;
        }
        .fgs-heading {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 400;
          color: #111;
          line-height: 1.15;
          margin: 0 0 12px;
        }
        .fgs-heading em {
          font-style: italic;
          color: #6366f1;
        }
        .fgs-subtext {
          font-size: 15px;
          color: #6b7280;
          max-width: 480px;
          line-height: 1.6;
          margin: 0;
          font-weight: 300;
        }
        .fgs-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          border: 1.5px solid #d1d5db;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: #374151;
          background: white;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .fgs-btn:hover {
          background: #111;
          color: white;
          border-color: #111;
        }
        .fgs-btn svg {
          transition: transform 0.2s ease;
        }
        .fgs-btn:hover svg {
          transform: translateX(3px);
        }
        .fgs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .fgs-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .fgs-grid { grid-template-columns: 1fr; }
          .fgs-inner { padding: 0 16px; }
          .fgs-section { padding: 52px 0 72px; }
        }
        .fgs-card {
          display: flex;
          flex-direction: column;
          border-radius: 20px;
          background: white;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
        }
        .fgs-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06);
        }
        .fgs-card-banner {
          height: 130px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .fgs-card-banner::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.08);
        }
        .fgs-card-banner .orb1 {
          position: absolute;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          top: -30px;
          right: -20px;
          pointer-events: none;
        }
        .fgs-card-banner .orb2 {
          position: absolute;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          bottom: -20px;
          left: 20px;
          pointer-events: none;
        }
        .fgs-icon-box {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          box-shadow: 0 2px 12px rgba(0,0,0,0.12);
          transition: transform 0.3s ease;
        }
        .fgs-card:hover .fgs-icon-box {
          transform: scale(1.08) rotate(-2deg);
        }
        .fgs-body {
          padding: 18px 20px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .fgs-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .fgs-tag {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 100px;
          background: #f3f4f6;
          color: #374151;
          letter-spacing: 0.02em;
        }
        .fgs-tag-trending {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 100px;
          background: #fef3c7;
          color: #d97706;
        }
        .fgs-tag-salary {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 100px;
          background: #dcfce7;
          color: #16a34a;
        }
        .fgs-title {
          font-family: 'Instrument Serif', serif;
          font-size: 1.25rem;
          font-weight: 400;
          color: #111;
          margin: 12px 0 6px;
          line-height: 1.3;
          transition: color 0.2s;
        }
        .fgs-card:hover .fgs-title {
          color: #6366f1;
        }
        .fgs-desc {
          font-size: 13.5px;
          color: #6b7280;
          line-height: 1.6;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-weight: 300;
        }
        .fgs-footer {
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .fgs-read-time {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: #9ca3af;
          font-weight: 400;
        }
        .fgs-read-link {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12.5px;
          font-weight: 600;
          opacity: 0;
          transition: opacity 0.2s ease, transform 0.2s ease;
          transform: translateX(-4px);
        }
        .fgs-card:hover .fgs-read-link {
          opacity: 1;
          transform: translateX(0);
        }
        .fgs-card:hover .fgs-read-link svg {
          animation: nudge 0.5s ease infinite alternate;
        }
        @keyframes nudge {
          from { transform: translateX(0); }
          to { transform: translateX(3px); }
        }
      `}</style>

      <section ref={sectionRef} className="fgs-section">
        <div className="fgs-inner">
          <div ref={headerRef} className="fgs-header">
            <div>
              <p className="fgs-eyebrow">Featured Guides</p>
              <h2 className="fgs-heading">
                Popular <em>Career</em> Roadmaps
              </h2>
              <p className="fgs-subtext">
                Beginner-friendly guides to help you break into tech — no degree or experience required.
              </p>
            </div>
            {/* ✅ FIX: Use React Router <Link> instead of <a href> */}
            <Link to="/roadmaps" className="fgs-btn">
              View All Roadmaps
              <ArrowRight size={15} />
            </Link>
          </div>

          <div ref={cardsRef} className="fgs-grid">
            {featuredGuides.map((guide) => (
              // ✅ FIX: Use React Router <Link to=...> instead of <a href=...>
              <Link
                key={guide.slug}
                to={`/roadmaps/${guide.slug}`}
                className="fgs-card"
              >
                <div
                  className="fgs-card-banner"
                  style={{
                    background: `linear-gradient(135deg, ${guide.gradientFrom}, ${guide.gradientTo})`,
                  }}
                >
                  <div className="orb1" />
                  <div className="orb2" />
                  <div
                    className="fgs-icon-box"
                    style={{ color: guide.accentColor }}
                  >
                    {guide.icon}
                  </div>
                </div>

                <div className="fgs-body">
                  <div className="fgs-tags">
                    <span className="fgs-tag">{guide.category}</span>
                    {guide.trending && (
                      <span className="fgs-tag-trending">
                        <TrendingUp size={10} />
                        Trending
                      </span>
                    )}
                    <span className="fgs-tag-salary">
                      💰 {guide.salary}
                    </span>
                  </div>

                  <h3 className="fgs-title">{guide.title}</h3>
                  <p className="fgs-desc">{guide.description}</p>

                  <div className="fgs-footer">
                    <span className="fgs-read-time">
                      <Clock size={13} />
                      {guide.readTime}
                    </span>
                    <span
                      className="fgs-read-link"
                      style={{ color: guide.accentColor }}
                    >
                      Read Guide
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
