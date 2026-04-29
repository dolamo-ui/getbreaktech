import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Clock, TrendingUp, ArrowRight, Search, BookOpen, Users, Flame } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navbar }                from '../components/Navbar'
import { Newsletter, Footer }    from '../components/Footer'
import { BlogSidebarNewsletter } from '../components/BlogSidebarNewsletter' // ← connected

gsap.registerPlugin(ScrollTrigger)

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  categoryColor: string
  author: string
  authorInitials: string
  authorColor: string
  date: string
  readTime: string
  views: string
  featured?: boolean
  trending?: boolean
  tags: string[]
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const categories = [
  'All', 'Career Change', 'Roadmaps', 'Salaries',
  'Interviews', 'AI & Future', 'Beginner Tips', 'Success Stories',
]

const posts: BlogPost[] = [
  {
    slug: 'retail-manager-to-frontend-developer',
    title: 'From retail manager to frontend developer in 8 months — no bootcamp required',
    excerpt: 'Sarah Chen shares her step-by-step journey, the free resources she used every day, and exactly how she landed a $95K offer with zero prior experience on her resume.',
    category: 'Career Change', categoryColor: '#10b981',
    author: 'Sarah Chen', authorInitials: 'SC', authorColor: '#2563eb',
    date: 'Apr 14, 2026', readTime: '8 min read', views: '14.2K views',
    featured: true, trending: true,
    tags: ['career change', 'frontend', 'self-taught'],
  },
  {
    slug: 'python-learning-order-beginners',
    title: 'The only Python learning order that actually works for complete beginners',
    excerpt: "Stop tutorial-hopping. Here's the structured sequence top developers recommend, with exact resources at every stage.",
    category: 'Roadmaps', categoryColor: '#2563eb',
    author: 'Nyakallo Dolamo', authorInitials: 'ND', authorColor: '#7c3aed',
    date: 'Apr 10, 2026', readTime: '6 min read', views: '9.8K views', trending: true,
    tags: ['python', 'beginner', 'learning path'],
  },
  {
    slug: 'ai-replace-jobs-2027',
    title: 'Which jobs will AI replace by 2027? The data tells a surprising story',
    excerpt: 'We analysed 500,000 job postings to find out which roles are growing, which are shrinking, and where the real opportunity is hiding.',
    category: 'AI & Future', categoryColor: '#7c3aed',
    author: 'Lerato Mokoena', authorInitials: 'LM', authorColor: '#db2777',
    date: 'Apr 8, 2026', readTime: '11 min read', views: '22.4K views', trending: true,
    tags: ['AI', 'automation', 'future of work'],
  },
  {
    slug: 'tech-salaries-south-africa-2026',
    title: 'Tech salaries in South Africa 2026 — what every developer should know',
    excerpt: 'Up-to-date salary ranges for 18 tech roles across Johannesburg, Cape Town, and remote, including what skills push you to the top of the bracket.',
    category: 'Salaries', categoryColor: '#ea580c',
    author: 'Thabo Nkosi', authorInitials: 'TN', authorColor: '#059669',
    date: 'Apr 5, 2026', readTime: '7 min read', views: '18.7K views',
    tags: ['salary', 'South Africa', 'negotiation'],
  },
  {
    slug: 'top-interview-questions-tech',
    title: '30 real interview questions asked at top tech companies — with model answers',
    excerpt: 'Sourced from engineers who passed interviews at Google, Amazon, Microsoft, and fast-growing startups.',
    category: 'Interviews', categoryColor: '#db2777',
    author: 'Ayesha Patel', authorInitials: 'AP', authorColor: '#d97706',
    date: 'Apr 2, 2026', readTime: '14 min read', views: '31.6K views', trending: true,
    tags: ['interview', 'hiring', 'tech jobs'],
  },
  {
    slug: 'bootcamp-vs-self-taught-2026',
    title: 'Bootcamp vs self-taught in 2026 — we interviewed 50 people who did both',
    excerpt: "Cost, time, job placement rates, and the honest truths you won't find in marketing materials.",
    category: 'Career Change', categoryColor: '#10b981',
    author: 'Marcus Adeyemi', authorInitials: 'MA', authorColor: '#ef4444',
    date: 'Mar 28, 2026', readTime: '12 min read', views: '11.3K views',
    tags: ['bootcamp', 'self-taught', 'career advice'],
  },
  {
    slug: 'github-portfolio-no-experience',
    title: 'How to build a GitHub portfolio that gets you hired with zero experience',
    excerpt: 'The exact projects to build, how to write good READMEs, and the one mistake that kills 90% of beginner portfolios.',
    category: 'Beginner Tips', categoryColor: '#0284c7',
    author: 'Priya Krishnamurthy', authorInitials: 'PK', authorColor: '#7c3aed',
    date: 'Mar 24, 2026', readTime: '9 min read', views: '26.1K views',
    tags: ['github', 'portfolio', 'job search'],
  },
  {
    slug: 'call-centre-to-qa-engineer',
    title: "I was a call centre agent for 6 years. Here's how I became a QA engineer",
    excerpt: 'Patience, pattern-recognition, and attention to customer frustrations turned out to be exactly what software testing requires.',
    category: 'Success Stories', categoryColor: '#059669',
    author: 'Nomsa Dlamini', authorInitials: 'ND', authorColor: '#2563eb',
    date: 'Mar 20, 2026', readTime: '10 min read', views: '8.9K views',
    tags: ['career change', 'QA', 'success story'],
  },
  {
    slug: 'free-resources-learn-coding-2026',
    title: 'The 20 best free resources to learn coding in 2026 (ranked and reviewed)',
    excerpt: "We actually completed courses on freeCodeCamp, The Odin Project, CS50, and 17 others so you don't have to guess which ones are worth your time.",
    category: 'Roadmaps', categoryColor: '#2563eb',
    author: 'Nyakallo Dolamo', authorInitials: 'ND', authorColor: '#7c3aed',
    date: 'Mar 16, 2026', readTime: '8 min read', views: '42.5K views',
    tags: ['free resources', 'learning', 'coding'],
  },
  {
    slug: 'remote-tech-career-no-office',
    title: 'No Office? No Problem: Start Your Remote Tech Career Today',
    excerpt: 'Everything you need to know about landing a remote tech job — from building the right skills to passing async interviews.',
    category: 'Career Change', categoryColor: '#10b981',
    author: 'Nyakallo Dolamo', authorInitials: 'ND', authorColor: '#7c3aed',
    date: 'Apr 18, 2026', readTime: '10 min read', views: '7.1K views', trending: true,
    tags: ['remote work', 'career change', 'tech jobs'],
  },
  {
    slug: 'why-python-best-first-language',
    title: 'Why Python Is the Best First Language for Beginners',
    excerpt: "An honest look at why Python beats every other language as a starting point — and the rare cases where a different choice actually makes more sense.",
    category: 'Roadmaps', categoryColor: '#2563eb',
    author: 'Nyakallo Dolamo', authorInitials: 'ND', authorColor: '#7c3aed',
    date: 'Apr 16, 2026', readTime: '7 min read', views: '5.4K views',
    tags: ['python', 'beginner', 'programming'],
  },
  {
    slug: 'frontend-developer-without-degree',
    title: 'How to Become a Frontend Developer Without a Degree',
    excerpt: 'A clear, phase-by-phase path to your first frontend job — no degree, no bootcamp. Just the right skills, in the right order.',
    category: 'Roadmaps', categoryColor: '#2563eb',
    author: 'Priya Krishnamurthy', authorInitials: 'PK', authorColor: '#7c3aed',
    date: 'Apr 20, 2026', readTime: '9 min read', views: '6.2K views', trending: true,
    tags: ['frontend', 'career change', 'self-taught'],
  },
  {
    slug: 'resume-mistakes-killing-job-chances',
    title: '5 Resume Mistakes That Are Killing Your Job Chances',
    excerpt: 'The five things that cause recruiters to reject applications in under 30 seconds — and exactly what to do instead.',
    category: 'Interviews', categoryColor: '#db2777',
    author: 'Ayesha Patel', authorInitials: 'AP', authorColor: '#d97706',
    date: 'Apr 22, 2026', readTime: '8 min read', views: '4.8K views', trending: true,
    tags: ['resume', 'job search', 'hiring'],
  },
]

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const categoryPillStyle = (color: string): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center',
  padding: '3px 10px', borderRadius: 99,
  fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.03em',
  background: `${color}15`, color, border: `1px solid ${color}30`,
})

const AuthorAvatar: React.FC<{ initials: string; color: string; size?: number }> = ({
  initials, color, size = 28,
}) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: `${color}18`, border: `1.5px solid ${color}35`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: size * 0.32, fontWeight: 700, color, flexShrink: 0,
  }}>
    {initials}
  </div>
)

// ─── BLOG PAGE ───────────────────────────────────────────────────────────────

const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery,    setSearchQuery]     = useState('')
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef   = useRef<HTMLDivElement>(null)

  // ── filter posts ──────────────────────────────────────────────────────────
  const filtered = posts.filter(p => {
    const matchCat    = activeCategory === 'All' || p.category === activeCategory
    const q           = searchQuery.toLowerCase()
    const matchSearch = !q
      || p.title.toLowerCase().includes(q)
      || p.excerpt.toLowerCase().includes(q)
      || p.tags.some(t => t.includes(q))
    return matchCat && matchSearch
  })

  const featured = filtered.find(p => p.featured) || filtered[0]
  const rest     = filtered.filter(p => p !== featured)

  // ── GSAP entrance animation ───────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      )
      if (gridRef.current?.children) {
        gsap.fromTo(
          Array.from(gridRef.current.children),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
        )
      }
    })
    return () => ctx.revert()
  }, [activeCategory, searchQuery])

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .blog-page        { background: #f9f8f5; font-family: 'DM Sans', sans-serif; min-height: 100vh; }
        .blog-hero        { background: #fff; border-bottom: 1px solid #ebebeb; padding: 104px 0 48px; }
        .blog-container   { max-width: 1160px; margin: 0 auto; padding: 0 28px; }

        .blog-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #2563eb; margin-bottom: 16px; }
        .blog-eyebrow::before { content: ''; display: block; width: 20px; height: 2px; background: #2563eb; border-radius: 2px; }

        .blog-title    { font-family: 'Instrument Serif', serif; font-size: clamp(2.2rem, 5vw, 3.25rem); font-weight: 400; color: #111; line-height: 1.15; margin-bottom: 16px; }
        .blog-title em { font-style: italic; color: #2563eb; }
        .blog-subtitle { font-size: 1rem; color: #6b7280; font-weight: 300; max-width: 480px; line-height: 1.7; }

        .blog-stats      { display: flex; gap: 32px; margin-top: 28px; flex-wrap: wrap; }
        .blog-stat       { display: flex; align-items: center; gap: 8px; }
        .blog-stat-icon  { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .blog-stat-label { font-size: 0.78rem; color: #6b7280; font-weight: 400; }
        .blog-stat-val   { font-size: 1.1rem; font-weight: 700; color: #111; line-height: 1; }

        /* sticky filter bar */
        .blog-controls       { background: #fff; border-bottom: 1px solid #ebebeb; position: sticky; top: 76px; z-index: 90; padding: 14px 0; }
        .blog-controls-inner { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .search-wrap         { position: relative; flex: 0 0 240px; }
        .search-wrap svg     { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #9ca3af; }
        .search-input        { width: 100%; padding: 9px 12px 9px 38px; border-radius: 10px; border: 1.5px solid #e5e7eb; font-family: 'DM Sans', sans-serif; font-size: 0.875rem; background: #f9f8f5; outline: none; color: #111; transition: border-color 0.2s; box-sizing: border-box; }
        .search-input:focus  { border-color: #2563eb; background: #fff; }

        .cat-tabs              { display: flex; gap: 6px; flex-wrap: wrap; }
        .cat-tab               { padding: 7px 16px; border-radius: 99px; font-size: 0.8rem; font-weight: 500; border: 1.5px solid #e5e7eb; background: transparent; cursor: pointer; font-family: 'DM Sans', sans-serif; color: #6b7280; transition: all 0.2s; white-space: nowrap; }
        .cat-tab:hover         { border-color: #2563eb; color: #2563eb; }
        .cat-tab.active        { background: #2563eb; border-color: #2563eb; color: #fff; }

        /* layout */
        .blog-content  { padding: 48px 0 80px; }
        .blog-layout   { display: grid; grid-template-columns: 1fr 320px; gap: 40px; align-items: start; }
        @media (max-width: 900px) { .blog-layout { grid-template-columns: 1fr; } .blog-sidebar { display: none; } }

        /* featured card */
        .featured-card       { background: #fff; border-radius: 20px; overflow: hidden; border: 1px solid #ebebeb; margin-bottom: 28px; display: grid; grid-template-columns: 1fr 1fr; transition: box-shadow 0.25s; text-decoration: none; color: inherit; }
        .featured-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
        @media (max-width: 640px) { .featured-card { grid-template-columns: 1fr; } }

        .featured-img    { background: linear-gradient(135deg, #2563eb, #06b6d4); min-height: 220px; display: flex; align-items: center; justify-content: center; padding: 0; overflow: hidden; }
        .featured-body   { padding: 28px; display: flex; flex-direction: column; }
        .featured-meta   { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; flex-wrap: wrap; }
        .featured-label  { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280; }
        .featured-title  { font-family: 'Instrument Serif', serif; font-size: 1.5rem; font-weight: 400; color: #111; line-height: 1.3; margin-bottom: 12px; }
        .featured-excerpt{ font-size: 0.875rem; color: #6b7280; line-height: 1.7; flex: 1; margin-bottom: 20px; font-weight: 300; }
        .featured-footer { display: flex; align-items: center; justify-content: space-between; }
        .author-row      { display: flex; align-items: center; gap: 8px; }
        .author-name     { font-size: 0.8rem; font-weight: 600; color: #374151; }
        .post-meta       { font-size: 0.72rem; color: #9ca3af; }

        /* post grid */
        .posts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media (max-width: 640px) { .posts-grid { grid-template-columns: 1fr; } }

        .post-card            { background: #fff; border-radius: 16px; padding: 22px; border: 1px solid #ebebeb; text-decoration: none; color: inherit; display: flex; flex-direction: column; transition: all 0.25s; }
        .post-card:hover      { box-shadow: 0 8px 28px rgba(0,0,0,0.07); transform: translateY(-3px); border-color: #d1d5db; }
        .post-top             { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
        .post-title           { font-family: 'Instrument Serif', serif; font-size: 1.05rem; font-weight: 400; color: #111; line-height: 1.35; margin-bottom: 8px; transition: color 0.2s; }
        .post-card:hover .post-title { color: #2563eb; }
        .post-excerpt         { font-size: 0.8rem; color: #6b7280; line-height: 1.65; flex: 1; margin-bottom: 14px; font-weight: 300; }
        .post-bottom          { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid #f3f4f6; }
        .post-author-row      { display: flex; align-items: center; gap: 6px; }

        .trending-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 99px; font-size: 0.65rem; font-weight: 700; background: #fef3c7; color: #d97706; border: 1px solid #fde68a; }

        /* sidebar */
        .sidebar-card       { background: #fff; border-radius: 16px; padding: 20px; border: 1px solid #ebebeb; margin-bottom: 20px; }
        .sidebar-title      { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280; margin-bottom: 14px; }
        .sidebar-post       { display: flex; flex-direction: column; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
        .sidebar-post:last-child { border-bottom: none; padding-bottom: 0; }
        .sidebar-post-title { font-size: 0.82rem; font-weight: 500; color: #111; line-height: 1.4; margin-bottom: 4px; text-decoration: none; transition: color 0.2s; }
        .sidebar-post-title:hover { color: #2563eb; }
        .sidebar-post-meta  { font-size: 0.72rem; color: #9ca3af; }

        /* tag pills */
        .tags-wrap { display: flex; flex-wrap: wrap; gap: 6px; }
        .tag-pill  { padding: 5px 12px; border-radius: 99px; font-size: 0.75rem; font-weight: 500; background: #f3f4f6; color: #374151; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
        .tag-pill:hover { background: #2563eb; color: #fff; }

        /* empty state */
        .no-results   { text-align: center; padding: 60px 20px; }
        .no-results h3{ font-size: 1.2rem; color: #374151; margin-bottom: 8px; }
        .no-results p { font-size: 0.875rem; color: #6b7280; }

        /* read arrow */
        .read-link { display: inline-flex; align-items: center; gap: 4px; font-size: 0.78rem; font-weight: 600; color: #2563eb; text-decoration: none; opacity: 0; transition: opacity 0.2s, transform 0.2s; transform: translateX(-4px); }
        .post-card:hover .read-link, .featured-card:hover .read-link { opacity: 1; transform: translateX(0); }
      `}</style>

      {/* ── NAVBAR ── */}
      <Navbar />

      <div className="blog-page">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="blog-hero">
          <div className="blog-container" ref={headerRef}>
            <div className="blog-eyebrow">Career Insights</div>
            <h1 className="blog-title">
              Stories, guides &amp;<br />
              <em>real advice</em> for career changers
            </h1>
            <p className="blog-subtitle">
              Honest, practical content written by people who've actually made the leap into tech.
              No fluff, no paid promotions.
            </p>
            <div className="blog-stats">
              <div className="blog-stat">
                <div className="blog-stat-icon" style={{ background: '#dbeafe' }}>
                  <BookOpen size={16} color="#2563eb" />
                </div>
                <div>
                  <div className="blog-stat-val">51</div>
                  <div className="blog-stat-label">Articles published</div>
                </div>
              </div>
              <div className="blog-stat">
                <div className="blog-stat-icon" style={{ background: '#d1fae5' }}>
                  <Users size={16} color="#059669" />
                </div>
                <div>
                  <div className="blog-stat-val">120K+</div>
                  <div className="blog-stat-label">Monthly readers</div>
                </div>
              </div>
              <div className="blog-stat">
                <div className="blog-stat-icon" style={{ background: '#fce7f3' }}>
                  <Flame size={16} color="#db2777" />
                </div>
                <div>
                  <div className="blog-stat-val">New</div>
                  <div className="blog-stat-label">Every week</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── STICKY FILTER BAR ────────────────────────────────────────────── */}
        <div className="blog-controls">
          <div className="blog-container">
            <div className="blog-controls-inner">
              <div className="search-wrap">
                <Search size={15} />
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search articles…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="cat-tabs">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`cat-tab${activeCategory === cat ? ' active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
        <div className="blog-content">
          <div className="blog-container">
            <div className="blog-layout">

              {/* ── Articles column ── */}
              <div>
                {filtered.length === 0 ? (
                  <div className="no-results">
                    <h3>No articles found</h3>
                    <p>Try a different search term or category.</p>
                  </div>
                ) : (
                  <>
                    {/* Featured post */}
                    {featured && (
                      <Link to={`/blog/${featured.slug}`} className="featured-card">
                        <div className="featured-img">
                          <img
                            src="https://i.imgur.com/5xhdOLx.jpeg"
                            alt="Featured article"
                            style={{
                              width: '100%', height: '100%',
                              objectFit: 'cover', objectPosition: 'center',
                              display: 'block', minHeight: '260px',
                            }}
                          />
                        </div>
                        <div className="featured-body">
                          <div className="featured-meta">
                            <span style={categoryPillStyle(featured.categoryColor)}>
                              {featured.category}
                            </span>
                            {featured.trending && (
                              <span className="trending-badge">
                                <TrendingUp size={10} /> Trending
                              </span>
                            )}
                            <span className="featured-label">Featured</span>
                          </div>
                          <h2 className="featured-title">{featured.title}</h2>
                          <p className="featured-excerpt">{featured.excerpt}</p>
                          <div className="featured-footer">
                            <div className="author-row">
                              <AuthorAvatar
                                initials={featured.authorInitials}
                                color={featured.authorColor}
                              />
                              <div>
                                <div className="author-name">{featured.author}</div>
                                <div className="post-meta">
                                  {featured.date} · {featured.readTime}
                                </div>
                              </div>
                            </div>
                            <span className="read-link">
                              Read <ArrowRight size={13} />
                            </span>
                          </div>
                        </div>
                      </Link>
                    )}

                    {/* Post grid */}
                    <div className="posts-grid" ref={gridRef}>
                      {rest.map(post => (
                        <Link
                          key={post.slug}
                          to={`/blog/${post.slug}`}
                          className="post-card"
                        >
                          <div className="post-top">
                            <span style={categoryPillStyle(post.categoryColor)}>
                              {post.category}
                            </span>
                            {post.trending && (
                              <span className="trending-badge">
                                <TrendingUp size={10} /> Trending
                              </span>
                            )}
                          </div>
                          <h3 className="post-title">{post.title}</h3>
                          <p className="post-excerpt">{post.excerpt}</p>
                          <div className="post-bottom">
                            <div className="post-author-row">
                              <AuthorAvatar
                                initials={post.authorInitials}
                                color={post.authorColor}
                                size={22}
                              />
                              <span className="post-meta">
                                {post.date} ·{' '}
                                <Clock size={11} style={{ display: 'inline', marginRight: 2 }} />
                                {post.readTime}
                              </span>
                            </div>
                            <span className="read-link">
                              Read <ArrowRight size={12} />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* ── Sidebar ────────────────────────────────────────────────── */}
              <aside className="blog-sidebar">

                {/*
                  ✅ THIS IS THE FIX:
                  We removed the old fake form that was here and replaced it
                  with <BlogSidebarNewsletter /> which actually saves to Firebase.
                */}
                <BlogSidebarNewsletter />

                {/* Most read this week */}
                <div className="sidebar-card">
                  <p className="sidebar-title">Most read this week</p>
                  {posts.filter(p => p.trending).slice(0, 5).map(p => (
                    <div key={p.slug} className="sidebar-post">
                      <Link to={`/blog/${p.slug}`} className="sidebar-post-title">
                        {p.title}
                      </Link>
                      <span className="sidebar-post-meta">
                        {p.views} · {p.readTime}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Browse by topic */}
                <div className="sidebar-card">
                  <p className="sidebar-title">Browse by topic</p>
                  <div className="tags-wrap">
                    {[
                      'python', 'career change', 'frontend', 'salary',
                      'interview', 'AI', 'bootcamp', 'portfolio',
                      'remote work', 'resume',
                    ].map(tag => (
                      <button
                        key={tag}
                        className="tag-pill"
                        onClick={() => setSearchQuery(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

              </aside>
            </div>
          </div>
        </div>

        {/* ── NEWSLETTER + FOOTER ── */}
        <Newsletter />
        <Footer />

      </div>
    </>
  )
}

export default BlogPage