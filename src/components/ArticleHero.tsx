import { useEffect, useRef } from "react";
import { Clock, Calendar, BarChart3, DollarSign, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";

interface CareerInfo {
  title: string;
  category: string;
  description: string;
  readTime: string;
  lastUpdated: string;
  difficulty: string;
  salary: string;
}

export function ArticleHero({ career }: { career: CareerInfo }) {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current?.children) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" }
        );
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const meta = [
    { icon: <Clock size={15} />, text: career.readTime },
    { icon: <Calendar size={15} />, text: `Updated ${career.lastUpdated}` },
    { icon: <BarChart3 size={15} />, text: career.difficulty },
    { icon: <DollarSign size={15} />, text: career.salary },
  ];

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden py-20 border-b border-indigo-500/10"
      style={{
        background:
          "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, #05060f 50%, rgba(34,211,238,0.04) 100%)",
      }}
    >
      {/* Glow orbs */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-14 -right-14 h-64 w-64 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)" }} />

      <div className="relative mx-auto max-w-4xl px-6">
        <div ref={contentRef} className="flex flex-col gap-0">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500" style={{ opacity: 0 }}>
            <Link to="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/roadmaps" className="hover:text-slate-300 transition-colors">Roadmaps</Link>
            <ChevronRight size={14} />
            <span className="text-slate-300">{career.title}</span>
          </nav>

          {/* Badge */}
          <div className="mt-6" style={{ opacity: 0 }}>
            <span className="inline-block rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-300 font-mono">
              {career.category}
            </span>
          </div>

          {/* Title */}
          <h1
            className="mt-4 text-5xl font-black leading-none tracking-tight text-slate-50 md:text-6xl"
            style={{ fontFamily: "'Syne', sans-serif", opacity: 0 }}
          >
            {career.title}
            <span className="mt-2 block text-2xl font-normal text-slate-500 md:text-3xl">
              Career Roadmap
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400" style={{ opacity: 0 }}>
            {career.description}
          </p>

          {/* Meta */}
          <div className="mt-8 flex flex-wrap gap-6" style={{ opacity: 0 }}>
            {meta.map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-sm text-slate-500">
                <span className="text-indigo-400">{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}