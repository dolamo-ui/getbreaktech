import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function WhySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const heroCardRef = useRef<HTMLDivElement>(null)
  const skillRef = useRef<HTMLDivElement>(null)
  const trioRef = useRef<HTMLDivElement>(null)
  const duoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      })

      tl.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      )
      .fromTo(heroCardRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, "-=0.3"
      )
      .fromTo(skillRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.5"
      )
      .fromTo(trioRef.current ? Array.from(trioRef.current.children) : [],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: "power3.out" }, "-=0.3"
      )
      .fromTo(duoRef.current ? Array.from(duoRef.current.children) : [],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: "power3.out" }, "-=0.2"
      )

      // floating orbs
      gsap.to(".ws-orb-a", { y: -20, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 })
      gsap.to(".ws-orb-b", { y: 14, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1 })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Lora:ital,wght@0,600;0,700;1,500&display=swap');

        .ws { background: #edf0f7; padding: 96px 0 108px; font-family: 'Sora', sans-serif; overflow: hidden; }
        .ws-inner { max-width: 1120px; margin: 0 auto; padding: 0 28px; }

        .ws-head { text-align: center; margin-bottom: 52px; }
        .ws-h2 {
          font-family: 'Lora', serif;
          font-size: clamp(1.85rem, 4vw, 2.8rem);
          font-weight: 700; color: #0f172a; margin: 0 0 12px; line-height: 1.15;
        }
        .ws-sub { font-size: 15px; color: #64748b; font-weight: 300; margin: 0; }

        /* two-col outer */
        .ws-grid {
          display: grid;
          grid-template-columns: 1fr 1.22fr;
          gap: 18px;
          align-items: stretch;
        }
        @media (max-width: 820px) { .ws-grid { grid-template-columns: 1fr; } }

        /* ── hero card ── */
        .ws-hero {
          background: linear-gradient(148deg, #1a56db 0%, #1e40af 52%, #1e3a8a 100%);
          border-radius: 26px; padding: 44px 34px 40px;
          position: relative; overflow: hidden;
          display: flex; flex-direction: column; justify-content: flex-end;
          min-height: 430px;
          box-shadow: 0 18px 56px rgba(30,64,175,.3);
          transition: transform .4s ease, box-shadow .4s ease;
          cursor: default;
        }
        .ws-hero:hover { transform: translateY(-5px); box-shadow: 0 28px 72px rgba(30,64,175,.4); }

        .ws-orb-a {
          position: absolute; width: 240px; height: 240px; border-radius: 50%;
          background: rgba(59,130,246,.3); top: -70px; right: -48px;
          pointer-events: none; filter: blur(2px);
        }
        .ws-orb-b {
          position: absolute; width: 150px; height: 150px; border-radius: 50%;
          background: rgba(99,102,241,.2); top: 30px; right: 52px; pointer-events: none;
        }
        .ws-orb-c {
          position: absolute; width: 72px; height: 72px; border-radius: 50%;
          background: rgba(255,255,255,.06); bottom: 28px; right: 28px; pointer-events: none;
        }
        .ws-hero-ico {
          width: 62px; height: 62px; border-radius: 16px;
          background: rgba(255,255,255,.13); border: 1px solid rgba(255,255,255,.2);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 28px; backdrop-filter: blur(8px);
          position: relative; z-index: 1;
          transition: transform .35s ease;
        }
        .ws-hero:hover .ws-hero-ico { transform: rotate(-7deg) scale(1.1); }
        .ws-hero-title {
          font-family: 'Lora', serif; font-size: 1.65rem; font-weight: 700;
          color: #fff; margin: 0 0 13px; line-height: 1.25; position: relative; z-index: 1;
        }
        .ws-hero-desc {
          font-size: 13.5px; color: rgba(255,255,255,.72);
          line-height: 1.75; font-weight: 300; max-width: 285px;
          position: relative; z-index: 1;
        }

        /* ── right stack ── */
        .ws-right { display: flex; flex-direction: column; gap: 16px; }

        /* shared card base */
        .ws-card {
          background: #fff; border-radius: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,.05);
          transition: transform .3s ease, box-shadow .3s ease;
          cursor: default; position: relative; overflow: hidden;
        }
        .ws-card:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,.09); }

        /* Skill Checkpoints — horizontal */
        .ws-skill {
          display: flex; align-items: flex-start;
          gap: 16px; padding: 24px 24px 22px;
        }

        /* trio row */
        .ws-trio { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
        @media (max-width: 560px) { .ws-trio { grid-template-columns: 1fr; } }

        .ws-card-trio {
          padding: 20px 16px 18px;
          display: flex; flex-direction: column; gap: 11px;
        }
        .ws-card-trio::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px; border-radius: 0 0 20px 20px;
          opacity: 0; transition: opacity .3s ease;
        }
        .ws-card-trio:nth-child(1)::after { background: linear-gradient(90deg,#3b82f6,#6366f1); }
        .ws-card-trio:nth-child(2)::after { background: linear-gradient(90deg,#10b981,#06b6d4); }
        .ws-card-trio:nth-child(3)::after { background: linear-gradient(90deg,#f59e0b,#ef4444); }
        .ws-card-trio:hover::after { opacity: 1; }

        /* duo row */
        .ws-duo { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 480px) { .ws-duo { grid-template-columns: 1fr; } }

        .ws-card-duo {
          padding: 20px 18px 18px;
          display: flex; flex-direction: column; gap: 11px;
        }
        .ws-card-duo::before {
          content: ''; position: absolute; inset: 0; border-radius: 20px;
          border: 1.5px solid transparent; pointer-events: none;
          transition: border-color .3s ease;
        }
        .ws-card-duo:nth-child(1):hover::before { border-color: rgba(124,58,237,.22); }
        .ws-card-duo:nth-child(2):hover::before { border-color: rgba(29,78,216,.22); }

        /* icon pill */
        .ws-ico {
          width: 46px; height: 46px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: transform .3s ease;
        }
        .ws-card:hover .ws-ico { transform: scale(1.1) rotate(-5deg); }

        .ws-ctitle { font-size: .92rem; font-weight: 600; color: #0f172a; margin: 0 0 4px; line-height: 1.3; }
        .ws-cdesc  { font-size: 12px; color: #64748b; line-height: 1.65; font-weight: 300; margin: 0; }
        .ws-ctext  { flex: 1; }
      `}</style>

      <section ref={sectionRef} className="ws">
        <div className="ws-inner">

          {/* heading */}
          <div ref={headingRef} className="ws-head">
            <h2 className="ws-h2">Why GetBreakTech?</h2>
            <p className="ws-sub">We provide the structure you need to move from ambition to achievement.</p>
          </div>

          <div className="ws-grid">

            {/* left blue hero */}
            <div ref={heroCardRef} className="ws-hero">
              <div className="ws-orb-a" />
              <div className="ws-orb-b" />
              <div className="ws-orb-c" />
              <div className="ws-hero-ico">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1.5"/>
                  <rect x="3" y="14" width="7" height="7" rx="1.5"/>
                  <rect x="14" y="3" width="7" height="7" rx="1.5"/>
                  <path d="M14 17.5h7M17.5 14v7"/>
                </svg>
              </div>
              <h3 className="ws-hero-title">Complete Visual<br/>Roadmaps</h3>
              <p className="ws-hero-desc">
                Don't just learn skills; see where they lead. Our visual tracks show the prerequisite knowledge and final destination for every career path.
              </p>
            </div>

            {/* right column */}
            <div className="ws-right">

              {/* 1 — Skill Checkpoints */}
              <div ref={skillRef} className="ws-card ws-skill">
                <div className="ws-ico" style={{ backgroundColor: "#d1fae5", color: "#059669" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <div className="ws-ctext">
                  <h4 className="ws-ctitle">Skill Checkpoints</h4>
                  <p className="ws-cdesc">Validate your learning at every milestone with curated assessment resources.</p>
                </div>
              </div>

              {/* 2 — trio: Step-by-Step / Verified / Education */}
              <div ref={trioRef} className="ws-trio">
                <div className="ws-card ws-card-trio">
                  <div className="ws-ico" style={{ backgroundColor: "#dbeafe", color: "#2563eb" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="ws-ctitle">Step-by-Step Roadmaps</h4>
                    <p className="ws-cdesc">Clear, actionable pathways from beginner to expert with milestones.</p>
                  </div>
                </div>

                <div className="ws-card ws-card-trio">
                  <div className="ws-ico" style={{ backgroundColor: "#d1fae5", color: "#059669" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><polyline points="16 3 18 5 22 1"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="ws-ctitle">Verified Pathways</h4>
                    <p className="ws-cdesc">Researched and validated by industry experts and professionals.</p>
                  </div>
                </div>

                <div className="ws-card ws-card-trio">
                  <div className="ws-ico" style={{ backgroundColor: "#fef3c7", color: "#d97706" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="ws-ctitle">Education Guides</h4>
                    <p className="ws-cdesc">Compare degrees, bootcamps, and self-taught paths.</p>
                  </div>
                </div>
              </div>

              {/* 3 — duo: Real-life Insights + AI Learning */}
              <div ref={duoRef} className="ws-duo">
                <div className="ws-card ws-card-duo">
                  <div className="ws-ico" style={{ backgroundColor: "#ede9fe", color: "#7c3aed" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="ws-ctitle">Real-life Insights</h4>
                    <p className="ws-cdesc">Stories and advice from experts currently working in the field.</p>
                  </div>
                </div>

                <div className="ws-card ws-card-duo">
                  <div className="ws-ico" style={{ backgroundColor: "#dbeafe", color: "#1d4ed8" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="ws-ctitle">AI-Powered Learning</h4>
                    <p className="ws-cdesc">Personalized recommendations based on your unique goals.</p>
                  </div>
                </div>
              </div>

            </div>{/* end right */}
          </div>{/* end grid */}
        </div>
      </section>
    </>
  )
}