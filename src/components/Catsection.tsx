import React, { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Rocket } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// ── Inline Button component ──────────────────────────────────────────────────

type ButtonVariant = "primary" | "secondary" | "outline"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
  children: React.ReactNode
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
}

function Button({
  variant = "primary",
  size = "md",
  asChild = false,
  className = "",
  style,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"

  const variantStyle: React.CSSProperties =
    variant === "secondary"
      ? {
          background: "#ffffff",
          color: "#1d4ed8",
          border: "none",
        }
      : variant === "outline"
      ? {
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          color: "#ffffff",
        }
      : {}

  const hoverClass =
    variant === "secondary"
      ? "hover:brightness-95 hover:-translate-y-0.5"
      : variant === "outline"
      ? "hover:bg-white/20 hover:-translate-y-0.5"
      : "hover:opacity-90"

  const classes = [base, sizeStyles[size], hoverClass, className]
    .filter(Boolean)
    .join(" ")

  if (asChild) {
    const child = children as React.ReactElement<
      React.HTMLAttributes<HTMLElement> & { style?: React.CSSProperties }
    >
    return React.cloneElement(child, {
      className: [classes, child.props.className].filter(Boolean).join(" "),
      style: { ...variantStyle, ...child.props.style, ...style },
      ...props,
    } as React.HTMLAttributes<HTMLElement>)
  }

  return (
    <button className={classes} style={{ ...variantStyle, ...style }} {...props}>
      {children}
    </button>
  )
}

// ── CTASection ───────────────────────────────────────────────────────────────

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
    <section
      ref={sectionRef}
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 40%, #1d4ed8 100%)",
      }}
      className="py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={contentRef}
          className="mx-auto max-w-3xl text-center"
          style={{ opacity: 0 }}
        >
          {/* Gradient circle with icon */}
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)",
              boxShadow: "0 8px 32px rgba(167, 139, 250, 0.4)",
            }}
          >
            <Rocket className="h-8 w-8 text-white" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            <span className="text-balance">Start Building Your Future Today</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg" style={{ color: "rgba(255,255,255,0.75)" }}>
            <span className="text-pretty">
              Join thousands of professionals who have found their perfect career
              path. Your journey to success starts with a single step.
            </span>
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Primary — white bg, blue text */}
            <Button
              size="lg"
              variant="secondary"
              className="group w-full sm:w-auto shadow-lg shadow-blue-900/40"
              asChild
            >
              <Link
                to="/roadmaps"
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                Explore Roadmaps
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>

            {/* Secondary — frosted glass */}
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              asChild
            >
              <Link to="/contact">Get Personalized Advice</Link>
            </Button>
          </div>

          {/* No account notice */}
          <p className="mt-8 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            No account needed. Start instantly.
          </p>
        </div>
      </div>
    </section>
  )
}