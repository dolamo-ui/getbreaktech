import { useEffect, useRef, useState } from "react"
import { Plus, Minus } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    question: "Do I need a degree or prior experience to use these roadmaps?",
    answer:
      "Not at all. Every roadmap on CareerPathGuide is designed with complete beginners in mind. We show you exactly where to start, what to learn first, and how to build momentum — regardless of your current background.",
    accent: "#2563eb",
  },
  {
    question: "How are the career roadmaps different from a simple Google search?",
    answer:
      "A Google search gives you information. Our roadmaps give you a structured, sequential path — verified by industry professionals — so you always know what to learn next, what to skip, and how each skill connects to your end goal. No more guessing or tutorial-hopping.",
    accent: "#7c3aed",
  },
  {
    question: "Are the roadmaps kept up to date with industry changes?",
    answer:
      "Yes. Tech moves fast, and so do we. Our team continuously reviews and updates each roadmap to reflect current hiring trends, in-demand tools, and the latest industry standards. You'll never be following an outdated path.",
    accent: "#0ea5e9",
  },
  {
    question: "Can I use CareerPathGuide if I want to switch careers, not start from scratch?",
    answer:
      "Absolutely — in fact, career changers are one of our most common success stories. Our Career Change section maps your existing transferable skills to your target role and shows you the shortest, most efficient path to get there.",
    accent: "#10b981",
  },
  {
    question: "Is this platform free to use?",
    answer:
      "The core roadmaps, guides, and resources are completely free. We believe everyone deserves access to clear career guidance regardless of their budget. In the future, we may offer optional premium features — but the essentials will always be free.",
    accent: "#f59e0b",
  },
  {
    question: "What makes the AI Careers section different?",
    answer:
      "The AI & Future Careers section focuses specifically on emerging roles that didn't exist 5 years ago — AI prompt engineers, MLOps specialists, AI ethicists, and more. We map out what skills you need today to be competitive in these high-growth, high-paying roles tomorrow.",
    accent: "#ef4444",
  },
]

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const body = bodyRef.current
    const inner = innerRef.current
    if (!body || !inner) return

    if (isOpen) {
      gsap.fromTo(
        body,
        { height: 0, opacity: 0 },
        { height: inner.offsetHeight, opacity: 1, duration: 0.38, ease: "power3.out" }
      )
    } else {
      gsap.to(body, { height: 0, opacity: 0, duration: 0.28, ease: "power2.in" })
    }
  }, [isOpen])

  return (
    <>
      <style>{`
        .faq-item-${index} {
          border-bottom: 1px solid #e5e7eb;
          transition: background 0.2s ease;
        }
        .faq-item-${index}:last-child { border-bottom: none; }

        .faq-trigger-${index} {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 22px 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .faq-q-${index} {
          font-family: 'Sora', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #0f172a;
          line-height: 1.45;
          flex: 1;
          transition: color 0.2s ease;
        }

        .faq-trigger-${index}:hover .faq-q-${index} {
          color: ${faq.accent};
        }

        .faq-icon-${index} {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid #e5e7eb;
          flex-shrink: 0;
          transition: all 0.25s ease;
          color: #64748b;
        }

        .faq-item-open-${index} .faq-icon-${index} {
          background: ${faq.accent};
          border-color: ${faq.accent};
          color: white;
        }

        .faq-body-${index} {
          height: 0;
          overflow: hidden;
          opacity: 0;
        }

        .faq-answer-${index} {
          font-family: 'DM Sans', sans-serif;
          font-size: 14.5px;
          color: #64748b;
          line-height: 1.8;
          font-weight: 300;
          padding-bottom: 20px;
          max-width: 680px;
        }

        .faq-number-${index} {
          font-family: 'Sora', sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: ${faq.accent};
          opacity: 0.55;
          letter-spacing: 0.08em;
          margin-bottom: 4px;
        }
      `}</style>

      <div className={`faq-item-${index} ${isOpen ? `faq-item-open-${index}` : ""}`}>
        <button
          className={`faq-trigger-${index}`}
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          <div style={{ flex: 1 }}>
            <div className={`faq-number-${index}`}>{String(index + 1).padStart(2, "0")}</div>
            <div className={`faq-q-${index}`}>{faq.question}</div>
          </div>
          <div className={`faq-icon-${index}`}>
            {isOpen ? <Minus size={14} /> : <Plus size={14} />}
          </div>
        </button>

        <div ref={bodyRef} className={`faq-body-${index}`}>
          <div ref={innerRef}>
            <p className={`faq-answer-${index}`}>{faq.answer}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      )
        .fromTo(
          leftRef.current,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.75, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          rightRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.75, ease: "power3.out" },
          "-=0.65"
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleToggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&family=Lora:ital,wght@0,600;0,700;1,500&display=swap');

        .fqs {
          background: #f8f7f4;
          padding: 96px 0 108px;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }

        .fqs-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 28px;
        }

        .fqs-head {
          text-align: center;
          margin-bottom: 60px;
        }

        .fqs-eyebrow {
          font-family: 'Sora', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #6366f1;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .fqs-eyebrow::before,
        .fqs-eyebrow::after {
          content: '';
          display: block;
          width: 24px;
          height: 2px;
          background: #6366f1;
          border-radius: 2px;
        }

        .fqs-h2 {
          font-family: 'Lora', serif;
          font-size: clamp(1.85rem, 4vw, 2.8rem);
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 14px;
          line-height: 1.15;
        }

        .fqs-h2 em {
          font-style: italic;
          color: #6366f1;
        }

        .fqs-sub {
          font-size: 15px;
          color: #64748b;
          font-weight: 300;
          margin: 0 auto;
          max-width: 480px;
          line-height: 1.7;
        }

        .fqs-layout {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 56px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .fqs-layout { grid-template-columns: 1fr; gap: 40px; }
          .fqs-left { text-align: center; }
        }

        @media (max-width: 560px) {
          .fqs-inner { padding: 0 16px; }
          .fqs { padding: 60px 0 80px; }
        }

        /* ── Left decorative panel ── */
        .fqs-left-card {
          background: linear-gradient(148deg, #1a56db 0%, #1e40af 52%, #1e3a8a 100%);
          border-radius: 26px;
          padding: 36px 30px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 18px 56px rgba(30, 64, 175, 0.28);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .fqs-left-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 28px 72px rgba(30, 64, 175, 0.38);
        }

        .fqs-left-orb-a {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.3);
          top: -60px;
          right: -40px;
          pointer-events: none;
          filter: blur(2px);
        }

        .fqs-left-orb-b {
          position: absolute;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: rgba(99, 102, 241, 0.22);
          bottom: -30px;
          left: 10px;
          pointer-events: none;
        }

        .fqs-left-ico {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.13);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
          backdrop-filter: blur(8px);
          position: relative;
          z-index: 1;
          transition: transform 0.35s ease;
        }

        .fqs-left-card:hover .fqs-left-ico {
          transform: rotate(-7deg) scale(1.08);
        }

        .fqs-left-title {
          font-family: 'Lora', serif;
          font-size: 1.45rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 12px;
          line-height: 1.25;
          position: relative;
          z-index: 1;
        }

        .fqs-left-desc {
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.72);
          line-height: 1.75;
          font-weight: 300;
          position: relative;
          z-index: 1;
          margin: 0 0 28px;
        }

        .fqs-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          position: relative;
          z-index: 1;
        }

        .fqs-stat-card {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 14px;
          padding: 14px;
          backdrop-filter: blur(8px);
          transition: background 0.2s ease;
        }

        .fqs-stat-card:hover {
          background: rgba(255, 255, 255, 0.16);
        }

        .fqs-stat-number {
          font-family: 'Sora', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          line-height: 1;
          margin-bottom: 4px;
          letter-spacing: -0.02em;
        }

        .fqs-stat-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 300;
          line-height: 1.4;
        }

        .fqs-contact-note {
          margin-top: 20px;
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 1;
          text-decoration: none;
          transition: background 0.2s ease;
        }

        .fqs-contact-note:hover {
          background: rgba(255, 255, 255, 0.14);
        }

        .fqs-contact-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4ade80;
          flex-shrink: 0;
          box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.25);
          animation: fqs-pulse 2s ease-in-out infinite;
        }

        @keyframes fqs-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.25); }
          50% { box-shadow: 0 0 0 6px rgba(74, 222, 128, 0.1); }
        }

        .fqs-contact-text {
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 400;
          line-height: 1.4;
        }

        .fqs-contact-text strong {
          color: #fff;
          font-weight: 600;
          display: block;
          margin-bottom: 1px;
        }

        /* ── Right accordion panel ── */
        .fqs-right {
          background: #fff;
          border-radius: 26px;
          padding: 12px 32px 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }

        @media (max-width: 560px) {
          .fqs-right { padding: 8px 18px 8px; }
        }
      `}</style>

      <section ref={sectionRef} className="fqs">
        <div className="fqs-inner">

          {/* Heading */}
          <div ref={headingRef} className="fqs-head">
            <p className="fqs-eyebrow">FAQ</p>
            <h2 className="fqs-h2">
              Got <em>Questions?</em>
            </h2>
            <p className="fqs-sub">
              Everything you need to know before you start your career journey with us.
            </p>
          </div>

          <div className="fqs-layout">

            {/* Left panel */}
            <div ref={leftRef}>
              <div className="fqs-left-card">
                <div className="fqs-left-orb-a" />
                <div className="fqs-left-orb-b" />

                <div className="fqs-left-ico">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <circle cx="12" cy="17" r="0.5" fill="white" />
                  </svg>
                </div>

                <h3 className="fqs-left-title">
                  Still have<br />questions?
                </h3>
                <p className="fqs-left-desc">
                  Our team is here to help you find the right path. Reach out any time and we'll get back to you within 24 hours.
                </p>

                {/* Quick stats */}
                <div className="fqs-stats-grid">
                  <div className="fqs-stat-card">
                    <div className="fqs-stat-number">50+</div>
                    <div className="fqs-stat-label">Roadmaps available</div>
                  </div>
                  <div className="fqs-stat-card">
                    <div className="fqs-stat-number">3.4k</div>
                    <div className="fqs-stat-label">Students this week</div>
                  </div>
                  <div className="fqs-stat-card">
                    <div className="fqs-stat-number">98%</div>
                    <div className="fqs-stat-label">Success rate</div>
                  </div>
                  <div className="fqs-stat-card">
                    <div className="fqs-stat-number">+42%</div>
                    <div className="fqs-stat-label">Avg salary boost</div>
                  </div>
                </div>

                {/* Contact note */}
                <a href="/contact" className="fqs-contact-note">
                  <div className="fqs-contact-dot" />
                  <div className="fqs-contact-text">
                    <strong>Chat with our team</strong>
                    Usually responds in under 24h
                  </div>
                </a>
              </div>
            </div>

            {/* Right accordion */}
            <div ref={rightRef} className="fqs-right">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  faq={faq}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => handleToggle(i)}
                />
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}