import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft, ArrowRight, Check, X,
  Clock, DollarSign, Rocket,
  CheckCircle2, MessageSquare, Play, ExternalLink,
  GraduationCap, Scale, ThumbsUp, ThumbsDown,
  Briefcase, Coffee, Users, 
  Sparkles, Zap, TrendingUp,
  Link2, Download, Share2, Copy, CheckCheck,
  BookOpen, AlertTriangle, RefreshCw, Star, Calendar,
  Award, Target, Flame, BarChart2,
  Layers, Layout,
  Megaphone,
  Cpu, Workflow, 
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── COLORS ──────────────────────────────────────────────────────────────── */
const C = {
  bg: '#ffffff',
  bgAlt: '#f8f9ff',
  bgCard: '#ffffff',
  border: 'rgba(0,0,0,0.07)',
  text: '#0f172a',
  textMuted: '#64748b',
  textFaint: '#94a3b8',
  primary: '#f97316',         // orange — marketing brand colour
  primaryLight: 'rgba(249,115,22,0.08)',
  primaryMid: 'rgba(249,115,22,0.15)',
  violet: '#7c3aed',
  violetLight: 'rgba(124,58,237,0.08)',
  green: '#16a34a',
  greenLight: 'rgba(22,163,74,0.08)',
  red: '#dc2626',
  redLight: 'rgba(220,38,38,0.08)',
  pink: '#ec4899',
  pinkLight: 'rgba(236,72,153,0.08)',
  indigo: '#4f46e5',
  indigoLight: 'rgba(79,70,229,0.08)',
  cyan: '#0891b2',
  cyanLight: 'rgba(8,145,178,0.08)',
}

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const CAREER_LEVELS = [
  {
    level: 'Junior', title: 'Junior Digital Marketer', duration: '0–2 yrs', salary: 'R280k–R450k',
    description: 'Execute digital marketing campaigns under guidance. Manage social media, create content, run PPC ads, and measure performance. Learn the tools and fundamentals while building strong campaigns.',
    skills: ['Social Media', 'Content Writing', 'Basic Analytics', 'Email Marketing'],
    accent: '#06b6d4', accentBg: 'rgba(6,182,212,0.08)', accentBorder: 'rgba(6,182,212,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Digital Marketer / Specialist', duration: '2–5 yrs', salary: 'R550k–R1M',
    description: 'Own complete marketing channels and strategy. Plan campaigns, optimize performance, lead team projects. Make data-driven decisions that move the needle on metrics and revenue.',
    skills: ['Campaign Strategy', 'Data Analysis', 'SEO/SEM', 'Team Leadership'],
    accent: '#f97316', accentBg: 'rgba(249,115,22,0.08)', accentBorder: 'rgba(249,115,22,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Digital Marketer / Manager', duration: '5–8 yrs', salary: 'R1M–R1.8M',
    description: 'Drive marketing strategy across channels and markets. Lead teams, budget allocation, ROI optimization. Shape how your organization acquires and retains customers at scale.',
    skills: ['Strategic Planning', 'Team Management', 'Marketing Ops', 'Cross-functional Leadership'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Principal', title: 'Chief Marketing Officer / Head of Growth', duration: '8+ yrs', salary: 'R2M–R4M+',
    description: 'Define organizational marketing vision and growth strategy. Make strategic bets, shape brand and positioning, lead global marketing organizations. Directly impact bottom-line business results.',
    skills: ['Business Strategy', 'Executive Leadership', 'Growth Systems', 'Market Vision'],
    accent: '#dc2626', accentBg: 'rgba(220,38,38,0.08)', accentBorder: 'rgba(220,38,38,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Digital Marketing Fundamentals & Platforms',
    description: 'Understand digital marketing landscape: channels (social, email, search), platforms (Google, Meta, LinkedIn), and marketing funnels. Learn how each channel works and its role in customer acquisition.',
    duration: '1–2 months', skills: ['Digital Channels', 'Platform Basics', 'Marketing Funnels', 'KPI Thinking'],
  },
  {
    step: 2, title: 'Social Media & Content Strategy',
    description: 'Master social media marketing across platforms. Create engaging content, build communities, manage accounts, and measure social performance. Content is king in digital marketing.',
    duration: '1–2 months', skills: ['Social Media Strategy', 'Content Creation', 'Community Management', 'Analytics'],
  },
  {
    step: 3, title: 'SEO & Search Marketing',
    description: 'Learn search engine optimization and search ads (Google Ads). Understand keyword research, on-page/technical SEO, content optimization, and PPC campaign management. Organic and paid search drive sales.',
    duration: '2–3 months', skills: ['SEO', 'Google Ads', 'Keyword Research', 'A/B Testing'],
  },
  {
    step: 4, title: 'Email Marketing & Conversion Optimization',
    description: 'Master email marketing automation, segmentation, and personalization. Learn conversion rate optimization (CRO) and landing page design. Email ROI is the highest of any channel.',
    duration: '1–2 months', skills: ['Email Marketing', 'Automation', 'CRO', 'Landing Pages'],
  },
  {
    step: 5, title: 'Data Analytics & Marketing Intelligence',
    description: 'Become proficient in Google Analytics, data visualization, and marketing analytics. Make data-driven decisions. Understand attribution, cohort analysis, and campaign performance measurement.',
    duration: '2–3 months', skills: ['Google Analytics', 'Data Visualization', 'Attribution', 'Reporting'],
  },
  {
    step: 6, title: 'Advanced Strategy & Multi-Channel Marketing',
    description: 'Integrate all channels into cohesive strategy. Master marketing automation, customer journey mapping, and revenue attribution. Plan integrated campaigns that coordinate across channels.',
    duration: '2–3 months', skills: ['Marketing Automation', 'Customer Journey', 'Platform Integration', 'Strategy'],
  },
]

const HARD_SKILLS = [
  { name: 'Google Analytics & Data Analysis', level: 88 },
  { name: 'SEO & Technical SEO Knowledge', level: 84 },
  { name: 'Social Media Management & Strategy', level: 86 },
  { name: 'Google Ads & PPC Campaign Management', level: 82 },
  { name: 'Email Marketing & Automation', level: 80 },
  { name: 'Content Writing & Copywriting', level: 78 },
  { name: 'Marketing Automation Platforms', level: 76 },
  { name: 'A/B Testing & Experimentation', level: 74 },
]

const SOFT_SKILLS = [
  { name: 'Creative Thinking', description: 'Digital marketing is competitive. Creative, memorable campaigns cut through noise. Original thinking and bold ideas differentiate your work and drive engagement.' },
  { name: 'Customer Empathy', description: 'Understand your audience deeply. Know their pain points, motivations, and desires. Great marketers think like customers, not just broadcasters. Genuine connection drives loyalty.' },
  { name: 'Data Storytelling', description: 'Numbers matter, but stories move people. Translate analytics into compelling narratives. Show impact clearly. Numbers without context bore; stories backed by data persuade.' },
  { name: 'Adaptability', description: 'Digital platforms change constantly. Algorithms update weekly. New channels emerge. Successful marketers embrace change, experiment relentlessly, and adjust based on feedback.' },
  { name: 'Analytical Mindset', description: 'Digital marketing is measurable. Every action has data. Develop deep curiosity about metrics. Question assumptions. Test hypotheses. Let data guide decisions, not intuition.' },
  { name: 'Cross-functional Communication', description: 'Partner with sales, product, design, and engineering. Marketing success requires alignment. Articulate strategy clearly. Build relationships. Marketing is a team sport.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Marketing / Communications Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(249,115,22,0.2)', bgColor: '#fff7ed', typeBg: 'rgba(249,115,22,0.12)', typeColor: '#f97316',
    pros: ['Deep marketing fundamentals', 'Broad business foundation', 'Networking with classmates', 'Internship opportunities'],
    cons: ['Slow path to first job', 'Digital curriculum often dated', 'Expensive and time-consuming', 'Theory over practice'],
  },
  {
    type: 'Bootcamp', title: 'Digital Marketing Bootcamp', duration: '8–12 weeks', cost: 'R60k – R120k',
    borderColor: 'rgba(16,185,129,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(16,185,129,0.12)', typeColor: '#10b981',
    pros: ['Fast path to job-ready', 'Hands-on with real tools', 'Current industry practices', 'Job placement support'],
    cons: ['Requires self-motivation', 'Limited depth initially', 'Quality varies widely', 'Expensive for bootcamp'],
  },
  {
    type: 'Certifications', title: 'Professional Certifications', duration: '2–6 months', cost: 'R15k – R40k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['Industry-recognized credentials', 'Study while employed', 'Affordable and flexible', 'Multiple specialization options'],
    cons: ['Requires strong foundation first', 'No guaranteed job', 'Continuous learning needed', 'Self-paced discipline required'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Campaign & Analytics Review', desc: 'Check campaign performance, analyze overnight results, review dashboards, and identify opportunities to optimize for today.', duration: '45 min', icon: <BarChart2 size={14} /> },
  { time: '9:45', act: 'Strategic Planning & Team Meetings', desc: 'Plan the day, discuss ongoing initiatives with team, align on priorities, and troubleshoot any campaign issues from previous day.', duration: '1.5 hrs', icon: <Layout size={14} /> },
  { time: '11:15', act: 'Content Creation & Social Media', desc: 'Create posts, write copy, schedule content, engage with audience, and manage community conversations across social platforms.', duration: '1.5 hrs', icon: <Megaphone size={14} /> },
  { time: '12:45', act: 'Lunch & Mind Refresh', desc: 'Step away from screens. Inspiration often comes in downtime. Recharge mentally before the afternoon execution sprint.', duration: '45 min', icon: <Coffee size={14} /> },
  { time: '1:30', act: 'Campaign Execution & Optimization', desc: 'Launch campaigns, adjust bids, optimize landing pages, run A/B tests, and make real-time adjustments based on performance data.', duration: '1.5 hrs', icon: <Zap size={14} /> },
  { time: '3:00', act: 'Analytics & Reporting', desc: 'Analyze data, create reports, document insights, and prepare metrics for stakeholders. Data literacy is a core skill.', duration: '1.5 hrs', icon: <Cpu size={14} /> },
  { time: '4:30', act: 'Learning & Industry Updates', desc: 'Read marketing blogs, check industry news, explore new tools, and stay current on algorithm changes and platform updates.', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Google Analytics / GA4', cat: 'Analytics' }, { name: 'Google Ads / Facebook Ads', cat: 'Paid Ads' },
  { name: 'SEMrush / Ahrefs', cat: 'SEO Tools' }, { name: 'Hootsuite / Buffer', cat: 'Social Media' },
  { name: 'HubSpot / Mailchimp', cat: 'Email Marketing' }, { name: 'Figma / Canva', cat: 'Design' },
  { name: 'Google Data Studio', cat: 'Reporting' }, { name: 'Notion / Asana', cat: 'Project Management' },
]

const WORK_ENVS = [
  { type: 'Fully Remote', pct: 48 },
  { type: 'Hybrid', pct: 40 },
  { type: 'In-Office', pct: 12 },
]

const AI_IMPACTS = [
  {
    title: 'AI Content Generation & Copywriting', icon: <Sparkles size={20} />,
    desc: 'AI writes blog posts, social media copy, email sequences, and ad headlines instantly. Marketers use AI to generate 10× content at quick iterations. Human creators focus on strategy and voice; AI handles production.',
    tools: ['ChatGPT', 'Jasper', 'Copy.ai', 'Writesonic'],
    borderColor: 'rgba(249,115,22,0.18)', bgColor: '#fff7ed', icoBg: 'rgba(249,115,22,0.12)', icoColor: '#f97316', tagBg: 'rgba(249,115,22,0.1)', tagColor: '#f97316', titleColor: '#f97316',
  },
  {
    title: 'AI Audience Segmentation & Targeting', icon: <Zap size={20} />,
    desc: 'AI finds your ideal customers automatically using behavioral patterns and propensity models. Hyper-targeted ads reach the right person at the right time. Precision targeting improves ROI 30–50%.',
    tools: ['6sense', 'Clearbit', 'ZoomInfo', 'LinkedIn AI'],
    borderColor: 'rgba(236,72,153,0.18)', bgColor: '#fce7f3', icoBg: 'rgba(236,72,153,0.12)', icoColor: '#ec4899', tagBg: 'rgba(236,72,153,0.1)', tagColor: '#ec4899', titleColor: '#ec4899',
  },
  {
    title: 'AI Predictive Analytics & Forecasting', icon: <TrendingUp size={20} />,
    desc: 'AI predicts customer churn, lifetime value, and campaign ROI before launching. Forecast demand gaps. Prevent customer loss. Allocate budget intelligently. Data-driven decisions with confidence.',
    tools: ['Sisense', 'Tableau AI', 'Looker AI', 'Mode Analytics'],
    borderColor: 'rgba(16,185,129,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(16,185,129,0.12)', icoColor: '#10b981', tagBg: 'rgba(16,185,129,0.1)', tagColor: '#10b981', titleColor: '#10b981',
  },
]

const FUTURE_SKILLS = [
  'Marketing AI & Automation Platforms', 'Zero-Party Data Collection & Privacy',
  'Brand Safety & Modern Measurement', 'Composable Martech Stack Knowledge',
  'Customer Data Platforms (CDPs)', 'Voice & Visual Search Marketing',
]

const PROS = [
  { title: 'Creative + Data Perfect Balance', desc: 'Digital marketing uniquely blends creative thinking with hard data. You get to be artistic AND analytical. That combination is rare and endlessly rewarding.' },
  { title: 'Immediate Impact & Measurable Results', desc: 'Every campaign produces data within hours. You see real-time impact of your decisions. Optimization is fast feedback loop. You know if you\'re winning immediately.' },
  { title: 'Recession-Proof Skill', desc: 'Companies cut budgets but never stop marketing. Digital marketing skills are always in demand. Remote work is standard. Job security is strong across economic cycles.' },
  { title: 'Rapidly Growing Market', desc: 'Digital ad spend grows 15%+ annually. New platforms emerge constantly. Demand for skilled marketers exceeds supply. Your expertise will be in high demand for decades.' },
  { title: 'Path to Executive Leadership', desc: 'CMOs and Chief Growth Officers come from marketing. Your technical expertise opens doors to C-suite roles. You can run organizations or build your own business.' },
  { title: 'Entrepreneurship-Friendly', desc: 'Digital marketing skills directly transfer to starting your own agency or product. Marketing is the language of growth. Many founders succeed because they mastered marketing first.' },
]

const CONS = [
  { title: 'Algorithm Changes Cause Chaos', desc: 'Platforms change algorithms without warning. Yesterday\'s best practice becomes obsolete overnight. One algorithm update can tank performance 40%+. Constant adaptation is required.' },
  { title: 'Pressure for Immediate Results', desc: 'Executives demand results now. Marketing is fast but not instant. Expectations often exceed reality. You face pressure from stakeholders expecting overnight ROI.' },
  { title: 'Tool Overload & Fragmentation', desc: 'Martech landscape has 10,000+ tools. Learning new tools constantly is necessary but exhausting. Integration challenges are real. No universal best tool — always tradeoffs.' },
  { title: 'Attribution Challenges', desc: 'Figuring out which touchpoint drove conversion is hard. Multi-touch attribution is imperfect. You struggle to prove marketing value. Budget debates are common frustrations.' },
  { title: 'Audience Burnout & Fatigue', desc: 'Over-marketing leads to ad fatigue and email unsubscribe. Finding balance between reach and engagement is hard. Privacy regulations limit data. Harder to reach audiences effectively.' },
  { title: 'High Stress & Always-On Mindset', desc: 'Campaigns run 24/7. Weekends and evenings often involve checking metrics. On-call for emergencies is common. Work-life balance is challenging in growth-focused companies.' },
]

const VIDEOS = [
  { id: 'tKVYlWFIUYA', title: 'Digital Marketing Roadmap 2025', desc: 'Complete roadmap to becoming a skilled digital marketer — platforms, skills, certifications, career path, and salary expectations in 2025.', dur: '18:42', channel: 'Marketing Mavens' },
  { id: 'PNfpI4Yb8tA', title: 'Google Analytics for Marketers', desc: 'Deep dive into GA4, tracking setup, audience segmentation, and using analytics to drive marketing decisions with precision.', dur: '6:30:00', channel: 'Think Media' },
  { id: 'C1ZXarTKqyY', title: 'SEO Fundamentals Course', desc: 'Comprehensive SEO guide covering keyword research, on-page optimization, technical SEO, and building backlinks that drive traffic.', dur: '4:20:00', channel: 'Neil Patel' },
]

const TAKEAWAYS = [
  'Start with one channel (social, SEO, or email) and master it deeply before expanding',
  'Data literacy is non-negotiable — become fluent in analytics and KPIs',
  'Content quality trumps quantity — focus on resonance with your audience',
  'Build a personal brand in marketing — showcase your work and results publicly',
  'Experiment constantly and embrace failure — marketing is iterative and fast-paced',
]

const CAREER_FACTS = [
  {
    icon: <Megaphone size={20} />, title: 'What You Work On',
    desc: 'Digital marketing campaigns across channels — social media, search, email, content, paid ads. You plan, execute, optimize, and analyze campaigns that drive customer acquisition and engagement.',
    color: '#f97316',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Responsibilities',
    desc: 'Create marketing strategies, manage advertising budgets, write and publish content, analyze performance data, optimize campaigns, build audiences, and report results to leadership and stakeholders.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Collaborate With',
    desc: 'Product managers, designers, content creators, sales teams, brand managers, and other marketers. Marketing success requires cross-functional coordination and strong stakeholder communication skills.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Growth',
    desc: 'Digital marketing is growing 15%+ annually. Every company needs marketing. Remote-first adoption is high. Talent shortages exist in specialized areas. Job security and growth opportunities are strong.',
    color: '#ec4899',
  },
]

const WHY_REASONS = [
  { emoji: '📊', title: 'Blend Creativity & Data', desc: 'Marketing uniquely requires both creative thinking and analytical rigor. You balance art and science. That combination is intellectually stimulating and deeply rewarding.' },
  { emoji: '🚀', title: 'See Results Immediately', desc: 'Unlike many careers, marketing shows results in real-time. You launch a campaign and see results within hours. Fast feedback loops accelerate learning and optimize decisions rapidly.' },
  { emoji: '💰', title: 'Strong Compensation Growth', desc: 'Mid-level digital marketers earn R550k–R1M. Senior roles reach R1.8M+. CMOs exceed R2M+. Growth trajectory is steep. Your salary compounds with results and experience.' },
  { emoji: '🌍', title: 'Remote Work Abundance', desc: '48% of digital marketing roles are fully remote. Location independence is standard. You can work from anywhere. Companies hire globally. Remote work + high salary = exceptional lifestyle.' },
  { emoji: '🎯', title: 'Direct Business Impact', desc: 'Marketing directly drives revenue. Your campaigns generate sales and growth. You see tangible business impact. That sense of contribution and importance is highly motivating.' },
  { emoji: '📚', title: 'Continuous Learning', desc: 'Platforms evolve weekly. New strategies emerge constantly. AI transforms marketing. Learning never stops. You stay intellectually engaged and professionally current indefinitely.' },
]

const FREE_RESOURCES = [
  { category: 'Courses & Certifications', color: '#f97316', bgColor: '#fff7ed', items: [
    { name: 'Google Digital Garage Certifications (free)', url: '#', type: 'Cert', rating: 5 },
    { name: 'SEMrush SEO Fundamentals (free)', url: '#', type: 'Course', rating: 5 },
    { name: 'Coursera Digital Marketing Course', url: '#', type: 'Course', rating: 4 },
    { name: 'HubSpot Inbound Certification (free)', url: '#', type: 'Cert', rating: 5 },
  ]},
  { category: 'Tools & Platforms', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'Google Analytics Academy (free training)', url: '#', type: 'Tool', rating: 5 },
    { name: 'Google Ads Training (free)', url: '#', type: 'Tool', rating: 5 },
    { name: 'Canva (free design tool)', url: '#', type: 'Tool', rating: 5 },
    { name: 'Buffer (free social media scheduling)', url: '#', type: 'Tool', rating: 4 },
  ]},
  { category: 'Learning Resources', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'Neil Patel Blog (marketing best practices)', url: '#', type: 'Blog', rating: 5 },
    { name: 'Marketing Insider Group (strategy & tactics)', url: '#', type: 'Blog', rating: 5 },
    { name: 'HubSpot Marketing Blog', url: '#', type: 'Blog', rating: 5 },
    { name: 'Search Engine Journal (SEO news)', url: '#', type: 'Blog', rating: 4 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Digital Marketer', range: 'R280k – R450k', midpoint: 365, yoe: '0–2 yrs', color: '#06b6d4' },
  { role: 'Digital Marketer / Specialist', range: 'R550k – R1M', midpoint: 775, yoe: '2–5 yrs', color: '#f97316' },
  { role: 'Senior Digital Marketer', range: 'R1M – R1.8M', midpoint: 1400, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'CMO / Head of Growth', range: 'R2M – R4M+', midpoint: 3000, yoe: '8+ yrs', color: '#dc2626' },
]

const MISTAKES = [
  {
    num: '01', title: 'Ignoring Channel Strategy',
    desc: 'Jumping to execution without understanding which channels fit your audience. You end up creating content in the wrong places. Channel fit matters more than volume.',
    fix: 'Study your audience deeply. Choose 2–3 channels they actually use. Master those channels. Expand later.',
  },
  {
    num: '02', title: 'No Analytics Foundation',
    desc: 'Running campaigns without understanding metrics and analytics. You optimize in the dark. Without data literacy, you\'re guessing, not marketing.',
    fix: 'Learn Google Analytics deeply. Understand KPIs for your channel. Track what matters. Let data guide optimization.',
  },
  {
    num: '03', title: 'Content Without Strategy',
    desc: 'Creating lots of content without a strategy or audience understanding. You produce noise instead of signal. Volume without strategy wastes time.',
    fix: 'Create a content strategy framework. Know your audience. Know your goal (awareness, leads, sales). Create purposefully.',
  },
  {
    num: '04', title: 'Ignoring Budget Constraints',
    desc: 'Recommending expensive solutions without considering budget reality. Senior stakeholders lose confidence. You learn budget discipline the hard way.',
    fix: 'Always understand budget constraints. Work within them. Propose cost-efficient solutions. Prove ROI before spending.',
  },
  {
    num: '05', title: 'Fire-and-Forget Campaigns',
    desc: 'Launching campaigns and not monitoring performance. You miss optimization opportunities. Campaigns underperform unnecessarily.',
    fix: 'Monitor campaigns daily. Optimize continuously. A/B test constantly. Optimization is the job; launching is just the start.',
  },
  {
    num: '06', title: 'No Testing Culture',
    desc: 'Running full go-live campaigns without testing. Mistakes scale. Budget gets wasted. Small tests before scaling is core methodology.',
    fix: 'Always test first. Small audiences. Test headlines, copy, images, CTAs. Scale winners. Testing saves money.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Sales Professional / Account Executive',
    ease: 'Natural Transition', easeColor: '#f97316', easeBg: '#fff7ed',
    desc: 'Sales fundamentals transfer directly: understanding audiences, persuasion, objection handling. You already know what resonates. Now learn to scale it through channels.',
    steps: ['Learn digital channels (social, email, search)', 'Understand audience data and segmentation', 'Take Google Ads and GA4 certifications', 'Transition to marketing in your current company'],
  },
  {
    from: 'Content Creator / Writer',
    ease: 'Strong Foundation', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'You already create content. Now learn the marketing infrastructure around it: channels, distribution, analytics, conversion funnels. Your creativity + marketing knowledge = powerful combination.',
    steps: ['Study digital marketing fundamentals', 'Learn analytics and KPI tracking', 'Get certified in your primary channel', 'Transition to marketing role in existing company'],
  },
  {
    from: 'Social Media Manager / Community Manager',
    ease: 'Easy Expansion', easeColor: '#06b6d4', easeBg: '#f0f9ff',
    desc: 'You already manage audiences and platforms. Expand to business outcomes: conversion tracking, paid ads, multi-channel strategy. Your platform expertise is valuable foundation.',
    steps: ['Learn Google Analytics and conversion tracking', 'Take Google Ads and paid social certification', 'Study conversion rate optimization', 'Target full digital marketer roles'],
  },
  {
    from: 'Product Manager / Project Manager',
    ease: 'Conceptual Fit', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Your project and cross-functional management skills transfer. Learn marketing-specific skills: channels, tools, analytics. Your organizational ability is rare among marketers.',
    steps: ['Master one marketing channel deeply', 'Get Google Analytics and Ads certified', 'Learn marketing strategy frameworks', 'Target marketing manager or growth roles'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Digital Marketing Fundamentals', color: '#f97316', bg: '#fff7ed', days: [
    { day: 'Day 1–2', task: 'Set up Google Analytics and personal website. Learn dashboard navigation, events, and audience reports.' },
    { day: 'Day 3–4', task: 'Core digital marketing concepts: customer acquisition cost (CAC), lifetime value (LTV), conversion funnels, and marketing metrics.' },
    { day: 'Day 5–6', task: 'Platform landscape: social media, search, email, content. Understand where each channel excels and audience fit.' },
    { day: 'Day 7', task: 'Quiz yourself on digital marketing fundamentals. Score 85%+ before moving forward.' },
  ]},
  { week: 'Week 2', theme: 'Social Media & Content Marketing', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Social media strategy: choose platform (Instagram or LinkedIn), plan content calendar, understand platform algorithms.' },
    { day: 'Day 10–11', task: 'Create content: write 10 posts, develop personal voice, understand what resonates with audiences.' },
    { day: 'Day 12–13', task: 'Community management: engage authentically, respond to comments, build relationships, analyze engagement metrics.' },
    { day: 'Day 14', task: 'Audit your own social presence. Growth goals set. Content strategy documented.' },
  ]},
  { week: 'Week 3', theme: 'SEO & Paid Advertising', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'SEO fundamentals: keyword research with free tools, on-page optimization, technical basics, backlink concepts.' },
    { day: 'Day 17–18', task: 'Google Ads basics: set up account, create search campaign, understand bidding strategies, budget management.' },
    { day: 'Day 19–20', task: 'A/B testing and optimization: split test headlines, copy, landing pages, analyze results statistically.' },
    { day: 'Day 21', task: 'Launch live Google Ads campaign. Set daily budget R50–100. Monitor and optimize daily.' },
  ]},
  { week: 'Week 4', theme: 'Analytics & Strategy', color: '#ec4899', bg: '#fce7f3', days: [
    { day: 'Day 22–24', task: 'Advanced Google Analytics: custom dimensions, UTM parameters, goals, funnels, and attribution models.' },
    { day: 'Day 25–26', task: 'Take Google Analytics certification exam. Build dashboard for your campaign metrics.' },
    { day: 'Day 27–28', task: 'Marketing strategy synthesis: integrate all channels into cohesive strategy. Document comprehensive plan.' },
    { day: 'Day 29–30', task: 'Portfolio: document all campaigns, results, and lessons. Update resume and LinkedIn. Start applying.' },
  ]},
]

const TOC_ITEMS = [
  { num: '01', label: 'Introduction' },
  { num: '02', label: 'What This Career Is' },
  { num: '03', label: 'Why Choose This Career' },
  { num: '04', label: 'A Day in the Life' },
  { num: '05', label: 'Career Timeline' },
  { num: '06', label: 'Step-by-Step Roadmap' },
  { num: '07', label: 'Skill Checkpoints' },
  { num: '08', label: 'Education Paths' },
  { num: '09', label: 'Best Free Resources' },
  { num: '10', label: 'AI-Enhanced Roadmap' },
  { num: '11', label: 'Pros & Cons' },
  { num: '12', label: 'Salary' },
  { num: '13', label: 'Common Mistakes' },
  { num: '14', label: 'Career Change Guide' },
  { num: '15', label: '30-Day Action Plan' },
  { num: '16', label: 'Final Thoughts' },
]

/* ─── SHARE BAR ───────────────────────────────────────────────────────────── */
function ShareBar() {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }
  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'Digital Marketer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Digital Marketer in 2026', url: window.location.href }) }
      catch (_) {}
    } else { handleCopy() }
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-10 p-4 rounded-2xl" style={{ background: '#f8f9ff', border: `1px solid ${C.border}` }}>
      <span className="text-xs font-semibold" style={{ color: C.textMuted }}>Share this roadmap:</span>
      <button onClick={handleCopy} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: copied ? 'rgba(22,163,74,0.1)' : C.primaryLight, color: copied ? '#16a34a' : C.primary, outline: 'none' }}>
        {copied ? <CheckCheck size={13} /> : <Copy size={13} />}{copied ? 'Copied!' : 'Copy Link'}
      </button>
      <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: C.violetLight, color: C.violet, outline: 'none' }}>
        <Download size={13} />Download / Save PDF
      </button>
      <button onClick={handleShare} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: C.primaryLight, color: C.primary, outline: 'none' }}>
        <Share2 size={13} />Share
      </button>
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono truncate max-w-xs" style={{ background: '#f1f5f9', color: C.textMuted, border: `1px solid ${C.border}` }}>
        <Link2 size={11} style={{ color: C.textFaint, flexShrink: 0 }} />
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/digital-marketer'}</span>
      </div>
    </div>
  )
}

/* ─── SECTION HEADER ─────────────────────────────────────────────────────── */
function SectionHeader({ icon, title, subtitle, iconBg, iconColor }: { icon: React.ReactNode; title: string; subtitle: string; iconBg: string; iconColor: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg }}>
        <span style={{ color: iconColor }}>{icon}</span>
      </div>
      <div>
        <div className="text-2xl font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>{title}</div>
        <div className="text-xs" style={{ color: C.textMuted }}>{subtitle}</div>
      </div>
    </div>
  )
}

/* ─── FADE HOOK ──────────────────────────────────────────────────────────── */
function useFade() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; el.style.transition = 'opacity 0.55s ease, transform 0.55s ease'
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect() } }, { threshold: 0.07 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return ref
}

/* ─── PAGE ────────────────────────────────────────────────────────────────── */
export default function DigitalMarketerRoadmapPage() {
  const progressRef = useRef<HTMLDivElement>(null)
  const tlSectionRef = useRef<HTMLElement>(null)
  const barsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap'
    document.head.appendChild(link)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (progressRef.current) {
        gsap.fromTo(progressRef.current, { width: '0%' }, { width: '100%', duration: 2.2, ease: 'power2.out', scrollTrigger: { trigger: tlSectionRef.current, start: 'top 72%', toggleActions: 'play none none reverse' } })
      }
    }); return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bars = barsContainerRef.current?.querySelectorAll<HTMLElement>('[data-bar-w]')
      bars?.forEach(bar => {
        gsap.fromTo(bar, { width: '0%' }, { width: `${bar.dataset.barW}%`, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: bar, start: 'top 92%', toggleActions: 'play none none reverse' } })
      })
    }); return () => ctx.revert()
  }, [])

  const introRef = useFade(); const whatRef = useFade(); const whyRef = useFade()
  const tlRef = useFade(); const stepsRef = useFade(); const skillsRef = useFade()
  const eduRef = useFade(); const freeRef = useFade(); const dayRef = useFade()
  const pcRef = useFade(); const aiRef = useFade(); const salaryRef = useFade()
  const mistakesRef = useFade(); const changeRef = useFade(); const planRef = useFade()
  const finalRef = useFade(); const vidsRef = useFade()

  const sectionStyle = { paddingTop: 72, paddingBottom: 72, borderBottomColor: C.border }

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.text, fontFamily: 'Inter, sans-serif' }}>

      {/* Back button */}
      <Link to="/roadmaps" className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold no-underline transition-all duration-200"
        style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', border: `1px solid ${C.border}`, color: C.textMuted, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <ArrowLeft size={14} /> All Roadmaps
      </Link>

      {/* ── HERO ── */}
      <div className="relative w-full" style={{ background: C.bg }}>
        <div className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: 600 }}>
          <img
            src="https://i.imgur.com/LewImNM.jpeg"
            alt="Digital Marketer workspace"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Megaphone size={12} /> Marketing & Growth
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Digital Marketer
              </h1>
              <span className="block font-normal mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', color: C.textMuted }}>
                Career Roadmap 2026
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><Clock size={14} style={{ color: C.textFaint }} /> 20 min read</div>
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><BookOpen size={14} style={{ color: C.textFaint }} /> 16 sections</div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-8 pt-6 pb-16">
          <p className="text-base leading-relaxed" style={{ color: '#4b5563', maxWidth: 560, marginLeft: 140 }}>
            Drive customer acquisition, growth, and revenue through digital channels. Digital Marketers blend creative thinking with data-driven strategy to build brands and businesses that scale. You're the architect of growth.
          </p>
          <div className="h-px mt-10" style={{ background: C.border }} />
        </div>
      </div>

      {/* ── TABLE OF CONTENTS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={introRef}>
            <SectionHeader icon={<BookOpen size={22} />} title="What's Inside" subtitle="Everything you need to know about this career in one place" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {TOC_ITEMS.map(item => (
                <div key={item.num} className="flex items-center gap-2.5 rounded-xl px-3.5 py-3 border transition-all duration-150 cursor-default hover:shadow-sm" style={{ background: C.bg, borderColor: C.border }}>
                  <span className="font-mono text-xs font-bold flex-shrink-0" style={{ color: C.textFaint }}>{item.num}</span>
                  <span className="text-xs font-medium" style={{ color: C.text }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT THIS CAREER IS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={whatRef}>
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Digital Marketing" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#fff7ed', borderColor: 'rgba(249,115,22,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Digital Marketer</strong> drives customer acquisition, engagement, and growth across digital channels — social media, search, email, content, and paid advertising. You plan campaigns, analyze data, optimize performance, and directly impact business revenue. Digital marketing is measurable, fast-moving, and increasingly AI-powered. Your blend of creativity and analytics makes you invaluable.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CAREER_FACTS.map(f => (
                <div key={f.title} className="flex gap-4 rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style={{ background: C.bg, borderColor: C.border }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${f.color}12` }}>
                    <span style={{ color: f.color }}>{f.icon}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold mb-1.5" style={{ color: C.text }}>{f.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={whyRef}>
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Digital Marketing could be your best move" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WHY_REASONS.map(r => (
                <div key={r.title} className="rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style={{ background: C.bg, borderColor: C.border }}>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">{r.emoji}</div>
                    <div>
                      <div className="text-sm font-bold mb-1.5" style={{ color: C.text }}>{r.title}</div>
                      <div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{r.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DAY IN THE LIFE ── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={dayRef}>
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Digital Marketer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(249,115,22,0.3)'; (e.currentTarget as HTMLElement).style.background = '#fff7ed' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.background = C.bg }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: C.primaryLight, color: C.primary }}>{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="text-sm font-semibold" style={{ color: C.text }}>{item.act}</span>
                        <span className="text-xs flex-shrink-0" style={{ color: C.textMuted }}>{item.duration}</span>
                      </div>
                      <div className="text-xs" style={{ color: C.textMuted }}>{item.desc}</div>
                    </div>
                    <span className="font-mono text-xs flex-shrink-0" style={{ color: C.primary }}>{item.time}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="rounded-2xl p-5 mb-4 border" style={{ background: '#f8f9ff', borderColor: C.border }}>
                  <div className="text-sm font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Tools & Tech</div>
                  <div className="flex flex-wrap">
                    {TOOLS.map(t => (
                      <span key={t.name} className="inline-block rounded-lg px-2.5 py-1.5 mr-1.5 mb-2 border" style={{ background: C.bg, borderColor: C.border }}>
                        <span className="text-xs font-semibold" style={{ color: C.text }}>{t.name}</span>
                        <span className="text-xs" style={{ color: C.textFaint }}> ({t.cat})</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl p-5 border" style={{ background: '#f8f9ff', borderColor: C.border }}>
                  <div className="text-sm font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Work Environment</div>
                  {WORK_ENVS.map(e => (
                    <div key={e.type} className="mb-3.5">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span style={{ color: C.textMuted }}>{e.type}</span>
                        <span className="font-mono" style={{ color: C.primary }}>{e.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${e.pct}%`, background: C.primary }} />
                      </div>
                    </div>
                  ))}
                  <div className="text-xs mt-2" style={{ color: C.textFaint }}>Based on 2026 industry surveys</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAREER TIMELINE ── */}
      <section ref={tlSectionRef} className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={tlRef}>
            <SectionHeader icon={<Clock size={22} />} title="Career Timeline" subtitle="Time estimates and salary ranges for each level" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="mb-10">
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → CMO</span></div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                <div ref={progressRef} className="h-1.5 rounded-full" style={{ width: '0%', background: 'linear-gradient(90deg, #06b6d4 0%, #f97316 33%, #7c3aed 66%, #dc2626 100%)' }} />
              </div>
              <div className="flex justify-between mt-2.5">
                {CAREER_LEVELS.map(l => <span key={l.level} className="font-mono" style={{ color: l.accent, fontSize: '0.68rem' }}>{l.duration}</span>)}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              {CAREER_LEVELS.map(l => (
                <div key={l.level} className="rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg" style={{ background: C.bg, borderColor: l.accentBorder }}>
                  <div className="inline-block rounded-full px-2.5 py-0.5 mb-3 font-mono text-xs font-bold uppercase tracking-widest" style={{ background: l.accentBg, color: l.accent }}>{l.level}</div>
                  <div className="text-base font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>{l.title}</div>
                  <div className="text-sm font-semibold mb-2.5" style={{ color: l.accent }}>{l.salary}</div>
                  <div className="text-xs leading-relaxed mb-3.5" style={{ color: C.textMuted }}>{l.description}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {l.skills.map(s => <span key={s} className="rounded px-1.5 py-0.5 font-mono text-xs" style={{ background: '#f1f5f9', color: C.textMuted }}>{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div ref={stepsRef} className="max-w-2xl mx-auto px-4">
          <SectionHeader icon={<Target size={22} />} title="Step-by-Step Roadmap" subtitle="Your path from complete beginner to job-ready" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="relative flex flex-col items-center">
            {ROADMAP_STEPS.map((s, i) => {
              const icons = ['📱', '📝', '🔍', '✉️', '📊', '🎯']
              const accentColors = ['#f97316', '#16a34a', '#f97316', '#16a34a', '#f97316', '#16a34a']
              const accent = accentColors[i]; const isLast = i === ROADMAP_STEPS.length - 1; const isEven = i % 2 === 0
              return (
                <div key={s.step} className="w-full flex flex-col items-center">
                  <div className="w-full" style={{ opacity: 0, transform: 'translateY(20px)', transition: `opacity 0.5s ${i * 0.13}s ease, transform 0.5s ${i * 0.13}s ease` }}
                    ref={el => {
                      if (!el) return
                      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect() } }, { threshold: 0.15 })
                      obs.observe(el)
                    }}>
                    <div className="w-full rounded-3xl overflow-hidden" style={{ background: `${accent}08`, border: `2px solid ${accent}25`, boxShadow: `0 4px 24px ${accent}12` }}>
                      <div className="flex items-center gap-4 px-5 py-5">
                        <div className="flex-shrink-0 flex items-center justify-center rounded-full text-2xl font-bold" style={{ width: 64, height: 64, background: `linear-gradient(135deg, ${accent}20, ${accent}10)`, border: `3px solid ${accent}40` }}>{icons[i]}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-xs font-black uppercase tracking-widest font-mono" style={{ color: accent }}>STEP {s.step}:</span>
                            <span className="text-xs rounded-full px-2 py-0.5 font-mono" style={{ background: `${accent}12`, color: accent }}>{s.duration}</span>
                          </div>
                          <div className="font-extrabold mb-2 leading-tight" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', color: C.text }}>{s.title.toUpperCase()}</div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                            {s.skills.map(sk => (
                              <div key={sk} className="flex items-center gap-1.5 text-xs" style={{ color: C.textMuted }}>
                                <CheckCircle2 size={11} style={{ color: accent, flexShrink: 0 }} />
                                <span className="font-mono uppercase tracking-wide" style={{ fontSize: '0.65rem' }}>{sk}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="px-5 pb-4 text-xs leading-relaxed" style={{ color: C.textMuted, borderTop: `1px solid ${accent}15`, paddingTop: 10 }}>{s.description}</div>
                    </div>
                  </div>
                  {!isLast && (
                    <div className="flex w-full" style={{ height: 48 }}>
                      <svg viewBox="0 0 400 48" className="w-full" style={{ height: 48 }} preserveAspectRatio="none">
                        <path d={isEven ? 'M200,0 C200,24 380,24 380,48' : 'M200,0 C200,24 20,24 20,48'} fill="none" stroke="#e2e8f0" strokeWidth="40" strokeLinecap="round" />
                        <path d={isEven ? 'M200,0 C200,24 380,24 380,48' : 'M200,0 C200,24 20,24 20,48'} fill="none" stroke={accentColors[i + 1] ?? accent} strokeWidth="4" strokeLinecap="round" strokeOpacity="0.4" strokeDasharray="12 8" />
                        {isEven
                          ? <polygon points="372,36 388,44 372,52" fill={accentColors[i + 1] ?? accent} opacity="0.5" />
                          : <polygon points="28,36 12,44 28,52" fill={accentColors[i + 1] ?? accent} opacity="0.5" />}
                      </svg>
                    </div>
                  )}
                </div>
              )
            })}
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #ec4899 100%)`, boxShadow: '0 8px 48px rgba(249,115,22,0.25)' }}>
              <div className="text-4xl mb-3">🚀</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>12–16 weeks · Hands-on campaigns · Real results</div>
            </div>
          </div>
          <ShareBar />
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={skillsRef}>
            <SectionHeader icon={<CheckCircle2 size={22} />} title="Skill Checkpoints" subtitle="Technical and interpersonal skills to develop" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl p-7 border" style={{ background: C.bg, borderColor: C.border }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.indigoLight }}><BarChart2 size={16} style={{ color: C.indigo }} /></div>
                  <div>
                    <div className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Hard Skills</div>
                    <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>Technical competencies required</div>
                  </div>
                </div>
                <div ref={barsContainerRef}>
                  {HARD_SKILLS.map(s => (
                    <div key={s.name} className="mb-4">
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs" style={{ color: C.textMuted }}>{s.name}</span>
                        <span className="text-xs font-mono" style={{ color: C.textFaint }}>{s.level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                        <div className="h-1.5 rounded-full" data-bar-w={s.level} style={{ width: 0, background: `linear-gradient(90deg, ${C.primary}, #ec4899)` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-7 border" style={{ background: C.bg, borderColor: C.border }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.primaryLight }}><MessageSquare size={16} style={{ color: C.primary }} /></div>
                  <div>
                    <div className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Soft Skills</div>
                    <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>Interpersonal abilities to build</div>
                  </div>
                </div>
                {SOFT_SKILLS.map(s => (
                  <div key={s.name} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border transition-colors cursor-default" style={{ background: '#f8f9ff', borderColor: C.border }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.primaryLight}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#f8f9ff'}>
                    <div className="text-sm font-semibold mb-0.5" style={{ color: C.text }}>{s.name}</div>
                    <div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{s.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION PATHS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={eduRef}>
            <SectionHeader icon={<GraduationCap size={22} />} title="Education Paths" subtitle="Three routes into the field — pick yours" iconBg="rgba(148,163,184,0.1)" iconColor={C.textMuted} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {EDU_PATHS.map(p => (
                <div key={p.type} className="rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg" style={{ background: p.bgColor, borderColor: p.borderColor }}>
                  <div className="inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest mb-4 font-mono" style={{ background: p.typeBg, color: p.typeColor }}>{p.type}</div>
                  <div className="text-base font-bold mb-3.5" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>{p.title}</div>
                  <div className="flex gap-3.5 text-xs mb-4" style={{ color: C.textMuted }}>
                    <span className="flex items-center gap-1"><Clock size={11} />{p.duration}</span>
                    <span className="flex items-center gap-1"><DollarSign size={11} />{p.cost}</span>
                  </div>
                  <div className="text-xs font-bold mb-2" style={{ color: C.green }}>Advantages</div>
                  {p.pros.map(item => <div key={item} className="flex items-start gap-2 text-xs mb-1.5" style={{ color: C.textMuted }}><Check size={11} style={{ color: C.green, flexShrink: 0, marginTop: 2 }} />{item}</div>)}
                  <div className="text-xs font-bold mb-2 mt-3.5" style={{ color: C.red }}>Challenges</div>
                  {p.cons.map(item => <div key={item} className="flex items-start gap-2 text-xs mb-1.5" style={{ color: C.textMuted }}><X size={11} style={{ color: C.red, flexShrink: 0, marginTop: 2 }} />{item}</div>)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FREE RESOURCES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={freeRef}>
            <SectionHeader icon={<BookOpen size={22} />} title="Best Free Resources" subtitle="World-class learning material, most of it completely free" iconBg={C.greenLight} iconColor={C.green} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FREE_RESOURCES.map(cat => (
                <div key={cat.category} className="rounded-2xl p-6 border" style={{ background: cat.bgColor, borderColor: `${cat.color}25` }}>
                  <div className="inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest mb-5 font-mono" style={{ background: `${cat.color}15`, color: cat.color }}>{cat.category}</div>
                  {cat.items.map(item => (
                    <div key={item.name} className="rounded-xl p-3 mb-2.5 last:mb-0 border" style={{ background: C.bg, borderColor: C.border }}>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-xs font-semibold" style={{ color: C.text }}>{item.name}</span>
                        <span className="text-xs rounded px-1.5 py-0.5 flex-shrink-0 font-mono" style={{ background: `${cat.color}12`, color: cat.color }}>{item.type}</span>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < item.rating ? cat.color : 'none'} style={{ color: i < item.rating ? cat.color : C.textFaint }} />)}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AI IMPACT ── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={aiRef}>
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Digital Marketing in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#fff7ed', borderColor: 'rgba(249,115,22,0.2)', color: C.textMuted }}>
              AI is revolutionising digital marketing — automated content generation, intelligent audience targeting, predictive analytics, and intelligent optimization. Marketers using AI achieve 5–10× productivity. AI automates execution; humans drive strategy.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-9">
              {AI_IMPACTS.map(item => (
                <div key={item.title} className="rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-1 hover:shadow-md" style={{ background: item.bgColor, borderColor: item.borderColor }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: item.icoBg }}><span style={{ color: item.icoColor }}>{item.icon}</span></div>
                  <div className="text-sm font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif', color: item.titleColor }}>{item.title}</div>
                  <div className="text-xs leading-relaxed mb-3.5" style={{ color: C.textMuted }}>{item.desc}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tools.map(t => <span key={t} className="rounded px-2 py-0.5 text-xs font-mono font-semibold" style={{ background: item.tagBg, color: item.tagColor }}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Emerging Skills to Learn Now</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {FUTURE_SKILLS.map((s, i) => (
                <div key={s} className="flex items-center gap-2.5 rounded-xl px-4 py-3.5 border" style={{ background: '#f8f9ff', borderColor: C.border }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-black text-xs" style={{ background: C.primaryLight, color: C.primary }}>{i + 1}</div>
                  <span className="text-xs font-medium" style={{ color: C.text }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROS & CONS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={pcRef}>
            <SectionHeader icon={<Scale size={22} />} title="Pros & Cons" subtitle="The honest picture of this career path" iconBg="rgba(148,163,184,0.1)" iconColor={C.textMuted} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-3xl p-7 border" style={{ background: '#f0fdf4', borderColor: 'rgba(22,163,74,0.2)' }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(22,163,74,0.12)' }}><ThumbsUp size={16} style={{ color: C.green }} /></div>
                  <span className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.green }}>Advantages</span>
                </div>
                {PROS.map(p => (
                  <div key={p.title} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border" style={{ background: C.bg, borderColor: 'rgba(22,163,74,0.12)' }}>
                    <div className="text-sm font-semibold mb-1" style={{ color: C.text }}>{p.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{p.desc}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-3xl p-7 border" style={{ background: '#fff5f5', borderColor: 'rgba(220,38,38,0.2)' }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(220,38,38,0.1)' }}><ThumbsDown size={16} style={{ color: C.red }} /></div>
                  <span className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.red }}>Challenges</span>
                </div>
                {CONS.map(c => (
                  <div key={c.title} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border" style={{ background: C.bg, borderColor: 'rgba(220,38,38,0.12)' }}>
                    <div className="text-sm font-semibold mb-1" style={{ color: C.text }}>{c.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SALARY ── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={salaryRef}>
            <SectionHeader icon={<DollarSign size={22} />} title="Salary" subtitle="What you can realistically earn at each stage" iconBg={C.greenLight} iconColor={C.green} />
            <div className="rounded-2xl p-6 mb-6 border" style={{ background: '#f0fdf4', borderColor: 'rgba(22,163,74,0.2)' }}>
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Remote global positions for specialists and CMOs often pay 2–4× these figures in USD equivalent.</p>
            </div>
            <div className="space-y-4">
              {SALARY_DATA.map(row => (
                <div key={row.role} className="rounded-2xl p-5 border" style={{ background: '#f8f9ff', borderColor: C.border }}>
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div>
                      <span className="text-sm font-bold" style={{ color: C.text }}>{row.role}</span>
                      <span className="ml-3 text-xs font-mono" style={{ color: C.textFaint }}>{row.yoe}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: row.color }}>{row.range}</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 3200) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#fff7ed', borderColor: 'rgba(249,115,22,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> Digital marketers who drive measurable results command premium salaries. Build a portfolio of successful campaigns. Specialised skills (performance marketing, growth hacking) pay 30–50% more than generalists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring digital marketers" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISTAKES.map(m => (
                <div key={m.num} className="rounded-2xl p-5 border transition-all duration-200 hover:shadow-md" style={{ background: C.bg, borderColor: C.border }}>
                  <div className="flex items-start gap-3 mb-3">
                    <span className="font-mono text-xs font-black flex-shrink-0 mt-0.5" style={{ color: C.textFaint }}>{m.num}</span>
                    <div>
                      <div className="text-sm font-bold mb-1.5" style={{ color: C.red }}>{m.title}</div>
                      <div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{m.desc}</div>
                    </div>
                  </div>
                  <div className="rounded-xl p-3 border-l-2 ml-5" style={{ background: '#f0fdf4', borderLeftColor: C.green }}>
                    <span className="text-xs font-bold" style={{ color: C.green }}>Fix: </span>
                    <span className="text-xs" style={{ color: C.textMuted }}>{m.fix}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAREER CHANGE ── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={changeRef}>
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into digital marketing from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {CAREER_CHANGE_PATHS.map(path => (
                <div key={path.from} className="rounded-2xl p-6 border" style={{ background: path.easeBg, borderColor: `${path.easeColor}20` }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>From: {path.from}</div>
                    <span className="text-xs rounded-full px-2.5 py-1 font-semibold" style={{ background: `${path.easeColor}15`, color: path.easeColor }}>{path.ease}</span>
                  </div>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: C.textMuted }}>{path.desc}</p>
                  <div className="space-y-2">
                    {path.steps.map((step, i) => (
                      <div key={step} className="flex items-center gap-2.5 text-xs" style={{ color: C.text }}>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: `${path.easeColor}20`, color: path.easeColor }}>{i + 1}</div>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 30-DAY PLAN ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={planRef}>
            <SectionHeader icon={<Calendar size={22} />} title="30-Day Action Plan" subtitle="Exactly what to do in your first month. Start today." iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {THIRTY_DAY_PLAN.map(week => (
                <div key={week.week} className="rounded-2xl border overflow-hidden" style={{ background: C.bg, borderColor: C.border }}>
                  <div className="px-5 py-4 border-b" style={{ background: week.bg, borderBottomColor: `${week.color}20` }}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold" style={{ fontFamily: 'Syne, sans-serif', color: week.color }}>{week.week}</span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${week.color}15`, color: week.color }}>{week.theme}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    {week.days.map(d => (
                      <div key={d.day} className="flex items-start gap-3 mb-3.5 last:mb-0">
                        <span className="text-xs font-mono font-bold flex-shrink-0 pt-0.5" style={{ color: week.color }}>{d.day}</span>
                        <span className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{d.task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEOS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={vidsRef}>
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Digital Marketing" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {VIDEOS.map(v => (
                <div key={v.id} className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ background: '#f8f9ff', borderColor: C.border }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(249,115,22,0.3)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: '#0a0c1a' }}>
                    <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} className="w-full h-full object-cover" style={{ opacity: 0.75 }} />
                    <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center no-underline">
                      <div className="rounded-full flex items-center justify-center" style={{ width: 52, height: 52, background: 'rgba(249,115,22,0.9)' }}>
                        <Play size={20} fill="white" style={{ color: '#fff', marginLeft: 2 }} />
                      </div>
                    </a>
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded px-2 py-1 text-xs text-white" style={{ background: 'rgba(0,0,0,0.75)' }}>
                      <Clock size={10} />{v.dur}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-semibold mb-1.5 leading-snug" style={{ color: C.text }}>{v.title}</div>
                    <div className="text-xs leading-relaxed mb-3" style={{ color: C.textMuted }}>{v.desc}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: C.textFaint }}>{v.channel}</span>
                      <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs no-underline" style={{ color: C.primary }}>Watch <ExternalLink size={11} /></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL THOUGHTS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={finalRef}>
            <SectionHeader icon={<Award size={22} />} title="Final Thoughts" subtitle="What we want you to take away from this guide" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 border mb-8" style={{ background: C.bg, borderColor: C.border }}>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#374151' }}>
                Digital marketing is where <strong style={{ color: C.primary }}>creativity meets business results</strong>. Every campaign you run generates data. Every decision you make is measurable. You see impact immediately. That combination — creative expression + analytical rigor + real business impact — is rare and deeply satisfying.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The path requires learning tools, understanding platforms, developing data literacy, and mastering customer psychology. But the payoff — strong salary, remote work abundance, job security, and the satisfaction of driving real growth — is exceptional.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {TAKEAWAYS.map((t, i) => (
                <div key={t} className="flex items-center gap-3.5 rounded-xl px-5 py-3.5 border" style={{ background: C.bg, borderColor: C.border }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-black text-xs" style={{ background: C.primaryLight, color: C.primary }}>{i + 1}</div>
                  <span className="text-sm" style={{ color: C.text }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="max-w-4xl mx-auto px-8" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="relative overflow-hidden rounded-3xl px-12 py-16 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #ec4899 100%)` }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: 'rgba(255,255,255,0.05)', top: -120, right: -80 }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Rocket size={30} style={{ color: '#fff' }} />
          </div>
          <h2 className="font-extrabold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
            Ready to Master Digital Marketing?
          </h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>
            You have the roadmap. You have the learning path. You have the campaigns to run. All that's left is to start, learn from results, and build a portfolio that impresses.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start your digital marketing journey today. The growth industry needs talented marketers now.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}
