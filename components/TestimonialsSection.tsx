import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Star, Quote, ChevronLeft, ChevronRight, TrendingUp, Users, Award } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// ─── Types ───────────────────────────────────────────────────────────────────

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  avatar: string
  quote: string
  rating: number
  careerPath: string
  salaryIncrease: string
  timeframe: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "Google",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    quote: "The roadmap was my north star. I went from teaching to a $145K engineering role in 8 months. Every checkpoint validated I was on the right track.",
    rating: 5,
    careerPath: "Software Developer",
    salaryIncrease: "+180%",
    timeframe: "8 months"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Data Scientist",
    company: "Netflix",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    quote: "I was skeptical about career roadmaps until I tried this. The AI recommendations saved me 200+ hours of research. Landed my dream role in data science.",
    rating: 5,
    careerPath: "Data Science",
    salaryIncrease: "+95%",
    timeframe: "12 months"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Product Manager",
    company: "Stripe",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    quote: "The career change section helped me map my marketing skills to product management. The community mentorship was the secret weapon I didn't know I needed.",
    rating: 5,
    careerPath: "Product Management",
    salaryIncrease: "+65%",
    timeframe: "6 months"
  },
  {
    id: 4,
    name: "David Park",
    role: "DevOps Engineer",
    company: "AWS",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    quote: "From IT support to cloud infrastructure at AWS. The visual roadmaps made complex career transitions feel achievable and structured.",
    rating: 5,
    careerPath: "Cloud Engineering",
    salaryIncrease: "+140%",
    timeframe: "10 months"
  },
  {
    id: 5,
    name: "Aisha Patel",
    role: "AI Engineer",
    company: "OpenAI",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    quote: "The AI career section predicted the skills I'd need before the market demanded them. I was ahead of the curve and it paid off — literally.",
    rating: 5,
    careerPath: "AI Engineering",
    salaryIncrease: "+210%",
    timeframe: "14 months"
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Cybersecurity Analyst",
    company: "CrowdStrike",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    quote: "The verified pathways gave me confidence I wasn't wasting time on outdated skills. Zero regrets — best career investment I've ever made.",
    rating: 5,
    careerPath: "Cybersecurity",
    salaryIncrease: "+120%",
    timeframe: "9 months"
  }
]

const stats = [
  { icon: Users, value: "3,400+", label: "Career Changers", color: "#2563eb" },
  { icon: TrendingUp, value: "+42%", label: "Avg. Salary Boost", color: "#10b981" },
  { icon: Award, value: "98%", label: "Success Rate", color: "#7c3aed" },
]

// ─── Component ───────────────────────────────────────────────────────────────

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const scrollStartX = useRef(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )

      // Stats animation
      const statItems = statsRef.current?.children
      if (statItems) {
        gsap.fromTo(statItems,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )
      }

      // Cards stagger animation
      const cards = cardsRef.current?.children
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 50, rotateY: -15 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setActiveIndex((prev) => (prev + 1) % testimonials.length)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [isDragging])

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  // Touch/drag handling
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    dragStartX.current = clientX
    scrollStartX.current = activeIndex
  }

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    setIsDragging(false)
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX
    const diff = dragStartX.current - clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext()
      else handlePrev()
    }
  }

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex
    const normalizedDiff = ((diff + testimonials.length) % testimonials.length)
    const adjustedDiff = normalizedDiff > testimonials.length / 2 ? normalizedDiff - testimonials.length : normalizedDiff
    
    const absDistance = Math.abs(adjustedDiff)
    const isActive = adjustedDiff === 0
    
    return {
      transform: `
        translateX(${adjustedDiff * 110}%) 
        translateZ(${isActive ? 0 : -absDistance * 80}px) 
        rotateY(${adjustedDiff * -8}deg)
        scale(${isActive ? 1 : 1 - absDistance * 0.08})
      `,
      opacity: absDistance > 2 ? 0 : 1 - absDistance * 0.25,
      zIndex: 10 - absDistance,
      pointerEvents: isActive ? "auto" : "none" as const,
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,600;0,700;1,500&display=swap');

        .ts-section {
          background: linear-gradient(180deg, #f8f9fc 0%, #ffffff 30%, #f8f9fc 100%);
          padding: 100px 0 120px;
          font-family: 'Sora', sans-serif;
          overflow: hidden;
          position: relative;
        }

        .ts-section::before {
          content: '';
          position: absolute;
          top: 10%;
          left: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        .ts-section::after {
          content: '';
          position: absolute;
          bottom: 5%;
          right: -5%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        .ts-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        /* ── Heading ── */
        .ts-head {
          text-align: center;
          margin-bottom: 48px;
        }

        .ts-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(37,99,235,0.08);
          border: 1px solid rgba(37,99,235,0.15);
          border-radius: 100px;
          padding: 6px 16px;
          margin-bottom: 20px;
        }

        .ts-eyebrow span {
          font-size: 0.75rem;
          font-weight: 600;
          color: #2563eb;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .ts-h2 {
          font-family: 'Lora', serif;
          font-size: clamp(2rem, 4.5vw, 3rem);
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 16px;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .ts-sub {
          font-size: 1.05rem;
          color: #64748b;
          font-weight: 300;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ── Stats Row ── */
        .ts-stats {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 64px;
          flex-wrap: wrap;
        }

        .ts-stat {
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 20px;
          padding: 20px 28px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .ts-stat:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }

        .ts-stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ts-stat-value {
          font-family: 'Sora', sans-serif;
          font-size: 1.35rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1;
          margin-bottom: 2px;
        }

        .ts-stat-label {
          font-size: 0.78rem;
          color: #64748b;
          font-weight: 400;
        }

        /* ── Carousel ── */
        .ts-carousel {
          position: relative;
          height: 480px;
          perspective: 1200px;
          margin-bottom: 40px;
        }

        @media (max-width: 768px) {
          .ts-carousel { height: 520px; }
        }

        .ts-cards-track {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
        }

        .ts-card {
          position: absolute;
          width: 100%;
          max-width: 560px;
          background: #ffffff;
          border-radius: 28px;
          padding: 40px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04);
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          cursor: grab;
          user-select: none;
        }

        .ts-card:active {
          cursor: grabbing;
        }

        @media (max-width: 640px) {
          .ts-card {
            padding: 28px;
            max-width: 90vw;
          }
        }

        .ts-card-badge {
          position: absolute;
          top: 24px;
          right: 24px;
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #059669;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ts-quote-icon {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          border: 1px solid rgba(37,99,235,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          color: #2563eb;
        }

        .ts-quote-text {
          font-family: 'Lora', serif;
          font-size: 1.15rem;
          font-weight: 600;
          font-style: italic;
          color: #1e293b;
          line-height: 1.7;
          margin-bottom: 32px;
          position: relative;
        }

        @media (max-width: 640px) {
          .ts-quote-text { font-size: 1rem; }
        }

        .ts-stars {
          display: flex;
          gap: 4px;
          margin-bottom: 28px;
        }

        .ts-star {
          color: #fbbf24;
          fill: #fbbf24;
        }

        .ts-author {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-top: 24px;
          border-top: 1px solid rgba(0,0,0,0.06);
        }

        .ts-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 12px rgba(0,0,0,0.12);
        }

        .ts-author-info {
          flex: 1;
        }

        .ts-author-name {
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 2px;
        }

        .ts-author-role {
          font-size: 0.82rem;
          color: #64748b;
          font-weight: 400;
        }

        .ts-author-company {
          font-size: 0.78rem;
          color: #94a3b8;
          font-weight: 500;
          margin-top: 2px;
        }

        .ts-meta {
          text-align: right;
        }

        .ts-meta-value {
          font-size: 0.9rem;
          font-weight: 800;
          color: #059669;
        }

        .ts-meta-label {
          font-size: 0.7rem;
          color: #94a3b8;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* ── Navigation ── */
        .ts-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .ts-nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #475569;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .ts-nav-btn:hover {
          background: #2563eb;
          color: #ffffff;
          border-color: #2563eb;
          transform: scale(1.1);
          box-shadow: 0 4px 16px rgba(37,99,235,0.3);
        }

        .ts-dots {
          display: flex;
          gap: 8px;
        }

        .ts-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #cbd5e1;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .ts-dot.active {
          width: 28px;
          border-radius: 99px;
          background: #2563eb;
        }

        .ts-dot:hover {
          background: #94a3b8;
        }

        /* ── CTA ── */
        .ts-cta {
          text-align: center;
          margin-top: 64px;
          padding: 48px 32px;
          background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1e40af 100%);
          border-radius: 28px;
          position: relative;
          overflow: hidden;
        }

        .ts-cta::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .ts-cta h3 {
          font-family: 'Lora', serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
          position: relative;
        }

        .ts-cta p {
          color: rgba(255,255,255,0.7);
          font-size: 1rem;
          margin-bottom: 28px;
          max-width: 440px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
        }

        .ts-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          color: #1e40af;
          font-family: 'Sora', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          padding: 14px 32px;
          border-radius: 14px;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }

        .ts-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }

        /* ── Floating particles ── */
        .ts-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.4;
        }

        .ts-particle-1 {
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%);
          top: 20%; left: 5%;
          animation: ts-float 6s ease-in-out infinite;
        }

        .ts-particle-2 {
          width: 150px; height: 150px;
          background: radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%);
          bottom: 30%; right: 8%;
          animation: ts-float 8s ease-in-out infinite 1s;
        }

        @keyframes ts-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
      `}</style>

      <section ref={sectionRef} className="ts-section" id="testimonials">
        <div className="ts-particle ts-particle-1" />
        <div className="ts-particle ts-particle-2" />

        <div className="ts-inner">

          {/* ── Header ── */}
          <div ref={headingRef} className="ts-head">
            <div className="ts-eyebrow">
              <Star size={14} fill="#2563eb" color="#2563eb" />
              <span>Success Stories</span>
            </div>
            <h2 className="ts-h2">What People Say</h2>
            <p className="ts-sub">
              Real results from real career changers who trusted the process and transformed their professional lives.
            </p>
          </div>

          {/* ── Stats ── */}
          <div ref={statsRef} className="ts-stats">
            {stats.map((stat, i) => (
              <div key={i} className="ts-stat">
                <div className="ts-stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                  <stat.icon size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="ts-stat-value">{stat.value}</div>
                  <div className="ts-stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Carousel ── */}
          <div 
            ref={carouselRef}
            className="ts-carousel"
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onMouseLeave={() => isDragging && handleDragEnd({ clientX: dragStartX.current } as React.MouseEvent)}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
          >
            <div className="ts-cards-track" ref={cardsRef}>
              {testimonials.map((t, i) => (
                <div
                  key={t.id}
                  className="ts-card"
                  style={getCardStyle(i)}
                  onClick={() => !isDragging && setActiveIndex(i)}
                >
                  <div className="ts-card-badge">
                    <TrendingUp size={12} />
                    {t.salaryIncrease}
                  </div>

                  <div className="ts-quote-icon">
                    <Quote size={22} />
                  </div>

                  <div className="ts-stars">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star key={si} size={16} className="ts-star" />
                    ))}
                  </div>

                  <p className="ts-quote-text">"{t.quote}"</p>

                  <div className="ts-author">
                    <img src={t.avatar} alt={t.name} className="ts-avatar" />
                    <div className="ts-author-info">
                      <div className="ts-author-name">{t.name}</div>
                      <div className="ts-author-role">{t.role}</div>
                      <div className="ts-author-company">{t.company}</div>
                    </div>
                    <div className="ts-meta">
                      <div className="ts-meta-value">{t.timeframe}</div>
                      <div className="ts-meta-label">Timeline</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Navigation ── */}
          <div className="ts-nav">
            <button className="ts-nav-btn" onClick={handlePrev} aria-label="Previous testimonial">
              <ChevronLeft size={20} />
            </button>
            
            <div className="ts-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`ts-dot${i === activeIndex ? ' active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button className="ts-nav-btn" onClick={handleNext} aria-label="Next testimonial">
              <ChevronRight size={20} />
            </button>
          </div>

          {/* ── Bottom CTA ── */}
          <div className="ts-cta">
            <h3>Ready to Write Your Success Story?</h3>
            <p>Join thousands of professionals who have already made the leap. Your future self will thank you.</p>
            <Link to="/roadmaps" className="ts-cta-btn">
              Start Your Journey
              <ChevronRight size={18} />
            </Link>
          </div>

        </div>
      </section>
    </>
  )
}
