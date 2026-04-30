import { useEffect, useRef } from "react";
import { CheckCircle2, Rocket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const takeaways = [
  "Master Python, maths, and statistics before jumping to frameworks",
  "Build end-to-end projects: data → model → deployment",
  "Learn MLOps early — most candidates skip it and it shows",
  "Read papers and implement key architectures from scratch",
  "Embrace AI tools to accelerate your own engineering",
];

export function ArticleCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(boxRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div
          ref={boxRef}
          className="relative overflow-hidden rounded-3xl p-10 text-center"
          style={{
            opacity: 0,
            background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #a78bfa 100%)",
          }}
        >
          {/* Decorative orbs */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/4" />

          <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 mb-6">
            <Rocket size={28} className="text-white" />
          </div>

          <h2
            className="mb-3 text-2xl font-black text-white sm:text-3xl"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            Ready to Start Your Journey?
          </h2>
          <p className="mx-auto mb-7 max-w-md text-sm leading-relaxed text-white/75">
            You now have a complete roadmap. Here are the most important takeaways:
          </p>

          <ul className="mx-auto mb-10 max-w-md space-y-3 text-left">
            {takeaways.map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm text-white/88">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-white/55" />
                {t}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/roadmaps"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-600 transition-opacity hover:opacity-85"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              Get Career Advice
            </a>
          </div>

          <p className="mt-6 text-xs text-white/40">
            Start learning today. Your future self will thank you.
          </p>
        </div>
      </div>
    </section>
  );
}