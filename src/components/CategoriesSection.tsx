import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Map, RefreshCw, Bot, ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const categories = [
  {
    // ✅ FIX: unified to "to" prop for React Router
    to: "/roadmaps",
    icon: Map,
    title: "Career Roadmaps",
    description: "Step-by-step guides to help you navigate from beginner to expert in your chosen field.",
    iconBg: "#e0f2fe",
    iconColor: "#0284c7",
    hoverBorderColor: "#0284c7",
    cta: "View Roadmaps",
  },
  {
    to: "/career-change",
    icon: RefreshCw,
    title: "Career Change",
    description: "Transition smoothly between careers with tailored guidance and transferable skills mapping.",
    iconBg: "#fce7f3",
    iconColor: "#db2777",
    hoverBorderColor: "#db2777",
    cta: "Pivot Now",
  },
  {
    to: "/ai-career",
    icon: Bot,
    title: "AI & Future Careers",
    description: "Explore emerging roles in AI and discover how technology is reshaping the job market.",
    iconBg: "#ede9fe",
    iconColor: "#7c3aed",
    hoverBorderColor: "#7c3aed",
    cta: "See Future",
  },
]

export function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children
      if (!cards) return

      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Explore by Category
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <span className="text-balance">Choose Your Path</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            <span className="text-pretty">
              Whether you&apos;re starting fresh, switching careers, or exploring future
              opportunities, we have the resources you need.
            </span>
          </p>
        </div>

        <div
          ref={cardsRef}
          className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3"
        >
          {categories.map((category) => (
            // ✅ FIX: Use React Router <Link to=...> instead of <a href=...>
            // Also removed style={{ opacity: 0 }} — GSAP sets this via fromTo
            <Link
              key={category.to}
              to={category.to}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = category.hoverBorderColor)
              }
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: category.iconBg,
                  color: category.iconColor,
                }}
              >
                <category.icon className="h-7 w-7" />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-foreground">
                {category.title}
              </h3>

              <p className="mt-2 flex-1 text-muted-foreground">
                {category.description}
              </p>

              <div
                className="mt-4 flex items-center text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100"
                style={{ color: category.iconColor }}
              >
                <span>{category.cta}</span>
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
