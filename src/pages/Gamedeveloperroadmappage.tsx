import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft, ArrowRight, Check, X,
  Clock, DollarSign, Rocket,
  CheckCircle2, Code, MessageSquare, Play, ExternalLink,
  GraduationCap, Scale, ThumbsUp, ThumbsDown,
  Briefcase, Coffee, Users, Monitor,
  Sparkles, Zap, TrendingUp,
  Link2, Download, Share2, Copy, CheckCheck,
  BookOpen, AlertTriangle, RefreshCw, Star, Calendar,
  Award, Target, Flame,
  Layers, 
  GitBranch, Terminal, 
  Workflow,
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
  primary: '#7c3aed',
  primaryLight: 'rgba(124,58,237,0.08)',
  primaryMid: 'rgba(124,58,237,0.15)',
  violet: '#7c3aed',
  violetLight: 'rgba(124,58,237,0.08)',
  green: '#16a34a',
  greenLight: 'rgba(22,163,74,0.08)',
  red: '#dc2626',
  redLight: 'rgba(220,38,38,0.08)',
  orange: '#ea580c',
  orangeLight: 'rgba(234,88,12,0.08)',
  indigo: '#4f46e5',
  indigoLight: 'rgba(79,70,229,0.08)',
  cyan: '#0891b2',
  cyanLight: 'rgba(8,145,178,0.08)',
}

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const CAREER_LEVELS = [
  {
    level: 'Junior', title: 'Junior Game Developer', duration: '0–2 yrs', salary: 'R280k–R480k',
    description: 'Implement gameplay features, fix bugs, write game logic scripts, and learn the engine under mentorship. Understand game loops, physics, and asset pipelines.',
    skills: ['Unity/Unreal', 'C#/C++', 'Game Physics', 'Git'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Game Developer', duration: '2–5 yrs', salary: 'R550k–R950k',
    description: 'Own feature systems end-to-end, optimise performance, design data schemas, implement multiplayer, AI behaviours, and shader pipelines across platforms.',
    skills: ['Systems Design', 'Shaders/HLSL', 'Netcode', 'Profiling'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Game Developer', duration: '5–8 yrs', salary: 'R950k–R1.6M',
    description: 'Architect engine systems, define coding standards, mentor juniors, lead performance and platform shipping initiatives across the full game lifecycle.',
    skills: ['Engine Architecture', 'Rendering', 'Team Leadership', 'Mentoring'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'Lead / Principal Dev', duration: '8+ yrs', salary: 'R1.8M+',
    description: 'Define the technical vision for an entire game or studio, drive cross-team engine strategy, and solve the hardest performance and platform challenges at AAA scale.',
    skills: ['Studio Tech Vision', 'Engine Dev', 'Platforms', 'Executive Alignment'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Programming Fundamentals — C# or C++',
    description: 'Pick one language and master it. C# is the language of Unity — the most beginner-friendly engine; C++ powers Unreal Engine and is the backbone of AAA game development. Learn variables, functions, OOP, memory management, and basic data structures before touching an engine.',
    duration: '2–3 months', skills: ['C# / C++', 'OOP Principles', 'Memory Management', 'Data Structures'],
  },
  {
    step: 2, title: 'Game Engine Fundamentals — Unity or Unreal',
    description: 'Pick one engine and go deep. Unity uses C# and has an enormous indie ecosystem; Unreal uses C++/Blueprints and powers most AAA games. Learn the editor, scene management, game object hierarchies, prefabs/blueprints, and input systems.',
    duration: '2–3 months', skills: ['Unity / Unreal', 'Scene Management', 'Input Systems', 'Physics Engine'],
  },
  {
    step: 3, title: 'Game Math, Physics & Graphics',
    description: 'Games are applied mathematics. Master vectors, matrices, quaternions, and linear algebra for 3D transforms. Understand collision detection, rigidbody physics, and the rendering pipeline. Learn basic shader writing in HLSL/GLSL — it separates mid-level from junior developers.',
    duration: '2–3 months', skills: ['Linear Algebra', 'Physics Simulation', 'Rendering Pipeline', 'HLSL/GLSL Shaders'],
  },
  {
    step: 4, title: 'Game Design Patterns & Systems',
    description: 'Great game code is structured code. Learn the Game Loop, Entity-Component-System (ECS), state machines, event systems, and object pooling. Understand how to separate data from logic, and how to build systems that designers can extend without programmer involvement.',
    duration: '1–2 months', skills: ['ECS Architecture', 'State Machines', 'Event Systems', 'Object Pooling'],
  },
  {
    step: 5, title: 'Multiplayer, Audio & Platform Deployment',
    description: 'Ship games — it is what separates developers from hobbyists. Learn Unity Netcode or Unreal\'s replication system for multiplayer. Integrate audio middleware (FMOD or Wwise). Build and deploy to PC (Steam), mobile (iOS/Android), or console (PlayStation/Xbox developer programmes).',
    duration: '2–3 months', skills: ['Netcode / Replication', 'FMOD / Wwise', 'Steam SDK', 'Mobile / Console'],
  },
  {
    step: 6, title: 'Performance, Optimisation & Professional Portfolio',
    description: 'Game performance is non-negotiable. Master profiling tools (Unity Profiler, Unreal Insights), GPU draw call batching, LOD systems, memory budgeting, and frame-time analysis. Build and ship 2–3 complete polished games and publish them on itch.io or Steam — this is your CV.',
    duration: '3–4 months', skills: ['Profiling Tools', 'GPU Optimisation', 'LOD Systems', 'Shipped Portfolio'],
  },
]

const HARD_SKILLS = [
  { name: 'C# / C++ Programming', level: 95 },
  { name: 'Unity or Unreal Engine', level: 92 },
  { name: 'Game Math & Physics', level: 88 },
  { name: 'Shader / Graphics Programming', level: 78 },
  { name: 'Multiplayer Netcode', level: 72 },
  { name: 'Audio Integration (FMOD)', level: 68 },
  { name: 'Console / Platform SDKs', level: 62 },
  { name: 'Engine Architecture & ECS', level: 58 },
]

const SOFT_SKILLS = [
  { name: 'Creative Problem Solving', description: 'Games break in ways no other software does. Unexpected interactions between physics, AI, and player input require lateral thinking and creative debugging approaches that go far beyond typical software engineering.' },
  { name: 'Player Empathy', description: 'Great game developers think like players, not just engineers. You must feel the latency in your own controls, notice the frame drops in your own levels, and care deeply about how every decision lands for someone experiencing your game for the first time.' },
  { name: 'Performance Obsession', description: 'A game running at 45fps on target hardware is a failed game. Develop a permanent instinct for frame budgets, GPU memory, draw calls, and CPU spikes — and learn to find satisfaction in shaving milliseconds.' },
  { name: 'Iteration Mindset', description: 'Games are designed through iteration, not specification. The ability to prototype quickly, accept that 80% of prototypes will be discarded, and maintain creative momentum through repeated failure is the defining trait of professional game developers.' },
  { name: 'Multidisciplinary Collaboration', description: 'You will work daily with artists, designers, sound engineers, and producers who speak entirely different professional languages. Great game developers translate technical constraints into creative possibilities — not dead ends.' },
  { name: 'Scope Discipline', description: 'Scope creep kills indie studios and delays AAA titles by years. The ability to say no to features that aren\'t core to the game, cut content that isn\'t working, and ship something imperfect rather than something never-finished is one of the hardest and most important skills.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Game Design / CS Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(124,58,237,0.2)', bgColor: '#f5f3ff', typeBg: 'rgba(124,58,237,0.12)', typeColor: '#7c3aed',
    pros: ['Structured engine and graphics theory', 'Credibility at major studios (EA, Ubisoft)', 'Access to student game jams and studio pipelines', 'Strong peer network of future developers'],
    cons: ['Slow path to shipping a real game', 'Often focuses on outdated engines or theory', 'Light on modern multiplayer and live service skills', 'Portfolio still must be built independently'],
  },
  {
    type: 'Bootcamp', title: 'Game Dev Bootcamp', duration: '3–6 months', cost: 'R60k – R130k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Ship a real game quickly', 'Cohort accountability and studio mentors', 'Portfolio-first curriculum', 'Job placement support at indie studios'],
    cons: ['Highly variable programme quality', 'Rarely covers graphics programming depth', 'Credential not recognised at AAA studios', 'Competitive entry into junior market'],
  },
  {
    type: 'Self-Taught', title: 'Online Courses & Game Jams', duration: '12–24 months', cost: 'R0 – R8k',
    borderColor: 'rgba(234,88,12,0.2)', bgColor: '#fff7ed', typeBg: 'rgba(234,88,12,0.12)', typeColor: '#ea580c',
    pros: ['World-class free content (GDC Vault, Unity Learn, Epic Online)', 'Learn at your own pace', 'Build real games from day one', 'Game jams build portfolio and community fast'],
    cons: ['Requires exceptional self-discipline', 'Easy to skip graphics and systems depth', 'No formal credential for AAA studio applications', 'Imposter syndrome is pervasive in game dev'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Standup & Sprint Planning', desc: 'Sync with designers and artists on feature state, review overnight build issues, and align on day\'s development priorities', duration: '30 min', icon: <GitBranch size={14} /> },
  { time: '9:30', act: 'Core Feature Development', desc: 'The best game work happens uninterrupted — new enemy AI, physics interactions, complex animation state machines, or engine system refactors', duration: '2.5 hrs', icon: <Monitor size={14} /> },
  { time: '12:00', act: 'Bug Investigation & Playtesting', desc: 'Reproduce reported bugs in the dev build, profile frame spikes, investigate collision edge cases, and playtest yesterday\'s feature changes', duration: '1 hr', icon: <Terminal size={14} /> },
  { time: '1:00', act: 'Lunch & Recovery', desc: 'Step away from the screen. Your subconscious solves game design problems during breaks that no amount of staring at code will fix', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Designer & Artist Collaboration', desc: 'Review designer\'s feature requests, expose new scripting APIs for designers, review artist assets for performance and integration', duration: '1 hr', icon: <Users size={14} /> },
  { time: '3:00', act: 'Optimisation & Profiling', desc: 'Profile the latest build on target hardware, reduce draw calls, optimise shader complexity, and hit the memory budget for the current level', duration: '1.5 hrs', icon: <Zap size={14} /> },
  { time: '4:30', act: 'Game Jam & Learning', desc: 'Read GDC Vault talks, experiment with a rendering technique, contribute to an open source engine, or prototype a personal game mechanic', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Unity / Unreal', cat: 'Engine' }, { name: 'Rider / VS 2022', cat: 'IDE' },
  { name: 'RenderDoc', cat: 'GPU Debug' }, { name: 'Perforce / Git LFS', cat: 'Version Control' },
  { name: 'FMOD Studio', cat: 'Audio' }, { name: 'Blender / Maya', cat: '3D Art' },
  { name: 'Jira / Hansoft', cat: 'Project Mgmt' }, { name: 'Steam SDK', cat: 'Platform' },
]

const WORK_ENVS = [
  { type: 'In-Studio (AAA/Mid)', pct: 54 },
  { type: 'Hybrid (Mid-size)', pct: 28 },
  { type: 'Remote (Indie/AA)', pct: 18 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Assisted Game Development', icon: <Sparkles size={20} />,
    desc: 'GitHub Copilot and Claude accelerate boilerplate game code, generate NPC dialogue trees, write unit tests for game systems, and suggest physics parameter tuning. Game developers using AI assistants report 30–45% productivity gains on scripting tasks.',
    tools: ['GitHub Copilot', 'Claude', 'Cursor', 'Tabnine'],
    borderColor: 'rgba(124,58,237,0.18)', bgColor: '#f5f3ff', icoBg: 'rgba(124,58,237,0.12)', icoColor: '#7c3aed', tagBg: 'rgba(124,58,237,0.1)', tagColor: '#7c3aed', titleColor: '#7c3aed',
  },
  {
    title: 'AI-Powered NPC & World Systems', icon: <Zap size={20} />,
    desc: 'Game developers who can integrate LLMs for dynamic NPC dialogue, procedural content generation, and adaptive difficulty systems are in an entirely different demand tier in 2026. This skill is becoming a core hiring criterion at leading studios.',
    tools: ['OpenAI API', 'Inworld AI', 'Convai', 'NVIDIA ACE'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI-Driven QA & Playtesting', icon: <TrendingUp size={20} />,
    desc: 'AI tools now automate regression testing, detect game-breaking edge cases, simulate millions of player sessions, and flag balancing anomalies before launch. Use them to ship higher quality games with smaller QA teams and faster iteration cycles.',
    tools: ['modl.ai', 'Codium AI', 'GameBench', 'Unity Sentis'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'AI-Driven NPC Systems (Inworld, NVIDIA ACE)', 'Procedural Generation & Wave Function Collapse',
  'Ray Tracing & Lumen/Nanite (Unreal 5)', 'WebGPU & Browser-Based 3D',
  'Spatial Computing (Vision Pro / Quest)', 'Machine Learning for Game Balancing',
]

const PROS = [
  { title: 'You Create Entire Worlds', desc: 'Game developers build interactive experiences that millions of people inhabit for thousands of hours. No other engineering discipline lets you create something that generates this level of human engagement and emotion.' },
  { title: 'Explosive Global Industry', desc: 'Gaming is now a $220 billion global industry — larger than film and music combined. Every platform from mobile to cloud to VR is growing, and developer demand grows with it.' },
  { title: 'Deeply Creative Technical Work', desc: 'Game development uniquely blends software engineering, applied mathematics, visual art, sound design, and human psychology. It is the most creatively rich technical discipline in existence.' },
  { title: 'Skills Transfer to Simulation & XR', desc: 'Game developer skills transfer directly into defence simulation, AR/VR enterprise software, architectural visualisation, film VFX, and AI training environments — all high-growth adjacent markets.' },
  { title: 'Indie Success Stories Are Real', desc: 'Stardew Valley (1 developer), Undertale, Among Us — indie games regularly generate millions. The barrier to self-publishing on Steam is low, and the upside of a breakout hit is extraordinary.' },
  { title: 'Passionate Global Community', desc: 'The game development community — through GDC, game jams, Discord servers, and open source engines — is one of the most generous and collaborative in all of tech. Learning resources and mentorship are abundant.' },
]

const CONS = [
  { title: 'Notoriously Poor Pay at Junior Level', desc: 'Junior game developer salaries are among the lowest in software engineering. Passion for games is exploited by studios, and many juniors are underpaid relative to equally skilled backend or frontend peers.' },
  { title: 'Crunch Culture Is Real', desc: 'The game industry has a documented crunch problem. Shipping a major title often means months of 60–80 hour weeks. This is improving, but remains a reality especially at large studios.' },
  { title: 'Extremely Competitive Entry', desc: 'Everyone loves games. The ratio of applicants to junior positions at major studios is among the highest in tech. A portfolio of shipped games is essential — without it, applications are ignored.' },
  { title: 'Layoffs & Studio Closures', desc: '2023–2024 saw over 10,000 game developer layoffs globally. Studios are expensive to run, games can fail commercially, and the business model — especially at AAA — is highly volatile.' },
  { title: 'Technical Debt in Game Codebases', desc: 'Shipping deadlines create legendary technical debt. Maintaining 15-year-old engine code, migrating rendering pipelines mid-project, and untangling years of designer-edited scripts is a genuine daily reality.' },
  { title: 'Platform Dependency Risk', desc: 'Apple policies, Steam algorithm changes, or console certification rules can kill a game\'s distribution at any moment. Game developers must maintain awareness of platform business risk alongside technical work.' },
]

const VIDEOS = [
  { id: 'mFEnttu_h_g', title: 'How to Become a Game Developer in 2025', desc: 'A practical, no-nonsense breakdown of the exact skills, portfolio, and learning path you need to land your first game developer role in 2025.', dur: '18:45', channel: 'Brackeys' },
  { id: 'XtQMytORBmM', title: 'Unity Complete Beginner Course 2024', desc: 'Build your first 3D game from scratch with Unity and C# — covering physics, game loops, UI, audio, and publishing to itch.io in a single comprehensive course.', dur: '6:22:00', channel: 'freeCodeCamp' },
  { id: 'LDU_Txk06tM', title: 'Game Developer Portfolio — What Studios Look For', desc: 'A senior recruiter from a major studio breaks down exactly what makes a game developer portfolio stand out, and the most common mistakes junior applicants make.', dur: '24:10', channel: 'GDC' },
]

const TAKEAWAYS = [
  'Ship something — anything. An imperfect published game is worth more than a perfect unfinished one in every portfolio review',
  'Do game jams: Ludum Dare and Global Game Jam build portfolio projects, community connections, and production discipline simultaneously',
  'Learn the engine internals, not just the tutorials — understanding the render loop and physics step separates senior developers from mid-level ones',
  'Study games as a developer: play new releases and ask yourself constantly "how did they build that?" — then prototype the answer',
  'Mathematics is your competitive advantage — the developers who understand linear algebra and calculus build the best physics and rendering systems',
]

/* ─── NEW SECTIONS ────────────────────────────────────────────────────────── */

const CAREER_FACTS = [
  {
    icon: <Monitor size={20} />, title: 'What You Build',
    desc: 'Game engines, gameplay systems, physics simulations, AI behaviours, rendering pipelines, multiplayer netcode, audio systems, UI frameworks, and the tools artists and designers use to build levels and content.',
    color: '#7c3aed',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Feature implementation, performance profiling, engine integration, shader development, collision system tuning, netcode debugging, platform certification, tool development for content creators, and bug investigation.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Game designers who specify mechanics, artists providing 3D assets and textures, audio engineers delivering adaptive music, producers managing delivery schedules, QA testers finding edge cases, and platform relations managers.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'The global games market reached $220B in 2024. Mobile, PC, console, VR, and cloud gaming are all growing simultaneously. The specialised technical skills required mean game developers remain in strong demand globally.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🎮', title: 'You Build Worlds People Live In', desc: 'Games generate more emotional engagement than any other medium. Players spend thousands of hours in worlds you build — that level of creative impact is unmatched in software engineering.' },
  { emoji: '💰', title: 'Strong Earning Potential at Senior Level', desc: 'Senior game developers at major studios earn R950k–R2M+ in South Africa. Principal engineers and technical directors at USD-paying global studios earn considerably more.' },
  { emoji: '🚀', title: 'Transferable to Simulation & XR Markets', desc: 'Defence simulation, medical training, architectural VR, and film VFX all run on game engine skills. A game developer\'s toolkit opens doors far beyond entertainment.' },
  { emoji: '🧩', title: 'The Hardest Technical Problems in Software', desc: 'Achieving 60fps on constrained hardware while simulating physics, AI, audio, and rendering simultaneously is one of the most demanding performance engineering challenges in existence.' },
  { emoji: '📈', title: 'The Industry Is Still Growing', desc: 'Gaming surpassed $220 billion globally in 2024 and is projected to reach $300 billion by 2027 — driven by mobile, subscription services, and emerging XR platforms.' },
  { emoji: '🎨', title: 'The Most Creative Technical Discipline', desc: 'No other engineering role demands simultaneous mastery of mathematics, computer graphics, audio engineering, AI, and user experience design. Game development is uniquely multidisciplinary.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#7c3aed', bgColor: '#f5f3ff', items: [
    { name: 'Unity Learn — Official Free Tutorials', url: '#', type: 'Course', rating: 5 },
    { name: 'Unreal Online Learning (Epic Games)', url: '#', type: 'Course', rating: 5 },
    { name: 'CS50G — Harvard Game Dev Course', url: '#', type: 'Course', rating: 5 },
    { name: 'The Cherno — C++ & Game Engine Series', url: '#', type: 'YouTube', rating: 5 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'Ludum Dare — Game Jam (48–72 hr)', url: '#', type: 'Jam', rating: 5 },
    { name: 'Global Game Jam — Annual Event', url: '#', type: 'Jam', rating: 5 },
    { name: 'itch.io — Publish & Get Feedback', url: '#', type: 'Platform', rating: 5 },
    { name: 'GDC Vault — 1,000s of Free Talks', url: '#', type: 'Reference', rating: 5 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'Brackeys YouTube (Unity & Unreal)', url: '#', type: 'YouTube', rating: 5 },
    { name: 'r/gamedev & r/Unity3D', url: '#', type: 'Forum', rating: 4 },
    { name: 'Game Dev Unlocked Podcast', url: '#', type: 'Podcast', rating: 5 },
    { name: 'GameDeveloper.com Articles', url: '#', type: 'Blog', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Game Developer', range: 'R280k – R480k', midpoint: 380, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Game Developer', range: 'R550k – R950k', midpoint: 750, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Game Developer', range: 'R950k – R1.6M', midpoint: 1275, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Lead / Principal Developer', range: 'R1.8M – R3M+', midpoint: 2400, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Building Tech Demos Instead of Games',
    desc: 'Spending months building an engine, editor, or rendering system instead of shipping a playable game is the most common trap. Studios hire developers who can ship experiences, not developers who can build tools.',
    fix: 'Finish a small, complete game first. Then build tools once you have shipped something real.',
  },
  {
    num: '02', title: 'Ignoring Performance Until It\'s Too Late',
    desc: 'Game performance must be designed in, not bolted on. Architectural decisions made in week one — physics layer configuration, draw call budget, asset streaming — are almost impossible to reverse near ship.',
    fix: 'Set frame and memory budgets before writing gameplay code. Profile every major feature on target hardware immediately after implementation.',
  },
  {
    num: '03', title: 'Skipping Game Math Fundamentals',
    desc: 'Developers who can\'t work with vectors, quaternions, and matrices hit a ceiling every time they need to implement a camera system, AI steering behaviour, or physics constraint. This gap is visible immediately in technical interviews.',
    fix: 'Study linear algebra through 3Blue1Brown\'s Essence of Linear Algebra. Implement a simple physics system from scratch using nothing but maths — no engine.',
  },
  {
    num: '04', title: 'Never Participating in Game Jams',
    desc: 'Game jams are the single most efficient way to build portfolio projects, shipping discipline, and community connections simultaneously. Developers who skip them miss an irreplaceable accelerant.',
    fix: 'Enter at least four game jams in your first year: Ludum Dare, Global Game Jam, GMTK Jam, and one small itch.io jam. Ship something every time.',
  },
  {
    num: '05', title: 'Copying Tutorials Without Understanding',
    desc: 'Following a Unity tutorial and submitting the result as your portfolio project is immediately obvious to hiring developers. Clone projects with no modification demonstrate nothing beyond the ability to watch a video.',
    fix: 'After finishing any tutorial, delete the project and rebuild it from memory. Add a mechanic that wasn\'t in the tutorial before adding it to your portfolio.',
  },
  {
    num: '06', title: 'Targeting AAA Studios as First Job',
    desc: 'EA, Ubisoft, and CD Projekt Red receive thousands of junior applications. Indie and mid-size studios offer dramatically better learning opportunities, more responsibility, and realistic entry points for new developers.',
    fix: 'Target studios with 10–100 developers as your first role. Build experience and portfolio there, then apply upward.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Software Developer (Web/Backend)',
    ease: 'Natural Fit', easeColor: '#7c3aed', easeBg: '#f5f3ff',
    desc: 'Programming fundamentals, version control, and software architecture transfer directly. Add engine skills (Unity/Unreal), game mathematics, and a portfolio of shipped games to make a strong transition.',
    steps: ['Learn C# if you know JavaScript/Python; C++ if you know systems languages', 'Complete Unity Learn or Unreal Online Learning fundamentals', 'Ship three small games via game jams in your first six months', 'Apply to mid-size or indie studios targeting gameplay programmer roles'],
  },
  {
    from: 'Visual / Interactive Designer',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Visual intuition, UX thinking, and understanding of user experience give you a rare advantage over pure programmers. Add programming fundamentals and engine skills to move into a UI/UX or technical artist role.',
    steps: ['Learn C# fundamentals through Unity\'s official free courses', 'Focus on Unity UI Toolkit and shader graph first', 'Build two games with exceptional visual design and UI polish', 'Target technical artist or game UI developer roles at mid-size studios'],
  },
  {
    from: '3D Artist / Animator',
    ease: 'Very Achievable', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'You already understand the asset pipeline from the creation side. Learning scripting and engine integration makes you a technical artist — one of the most valued hybrid roles in the industry.',
    steps: ['Learn engine integration from an artist\'s perspective (Unity/Unreal)', 'Master the technical art pipeline: LODs, atlasing, shader parameters', 'Learn basic C# or Python for tool scripting', 'Apply to technical artist roles at any studio size'],
  },
  {
    from: 'Other Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Domain expertise plus game dev skills creates uniquely valuable developers. A game developer who understands finance can build trading simulations; one with a medicine background can build medical training tools.',
    steps: ['Start with CS50G (Harvard free game development course)', 'Build a game set in your previous industry for immediate differentiation', 'Enter four game jams in your first year to build portfolio fast', 'Target serious game, simulation, or training companies in your field'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Language & Engine Setup', color: '#7c3aed', bg: '#f5f3ff', days: [
    { day: 'Day 1–2', task: 'Install Unity (LTS) or Unreal Engine 5. Complete the official "Get Started" sample project. Understand the editor layout, hierarchy, and inspector.' },
    { day: 'Day 3–4', task: 'C# or C++ fundamentals: variables, loops, functions, classes, and inheritance. Write scripts that make a cube move, rotate, and change colour.' },
    { day: 'Day 5–6', task: 'Git + Git LFS setup. Version control a Unity/Unreal project. Understand why binary assets need LFS. Push to GitHub.' },
    { day: 'Day 7', task: 'Build a complete Pong clone. Include a game loop, score tracking, and a restart mechanic. Post it on itch.io.' },
  ]},
  { week: 'Week 2', theme: 'Physics, Input & Game Design', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Study rigidbody physics. Build a simple platformer with gravity, jumping, and collision. Make the controls feel responsive.' },
    { day: 'Day 10–11', task: 'Implement an enemy AI with basic patrol, detection, and chase behaviour using a finite state machine.' },
    { day: 'Day 12–13', task: 'Add UI: main menu, pause screen, and a HUD with health and score. Use Unity\'s Canvas system or Unreal\'s UMG.' },
    { day: 'Day 14', task: 'Enter a 48-hour micro jam on itch.io. Ship something — anything — by the deadline. Reflect on what you cut to ship on time.' },
  ]},
  { week: 'Week 3', theme: 'Audio, Shaders & Saving', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Integrate audio: background music that transitions between game states, and 3D positional SFX for player and enemy actions.' },
    { day: 'Day 17–18', task: 'Write your first custom shader: a simple dissolve effect or outline shader. Understand properties, vertex, and fragment stages.' },
    { day: 'Day 19–20', task: 'Implement a save/load system using JSON serialisation. Persist player progress across sessions.' },
    { day: 'Day 21', task: 'Profile your game for the first time. Identify the top three performance costs. Optimise at least one of them measurably.' },
  ]},
  { week: 'Week 4', theme: 'Polish, Ship & Apply', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Add screen shake, particle effects, and audio feedback to every major player action. Feel the difference that juice makes.' },
    { day: 'Day 25–26', task: 'Build your game for the target platform. Create a proper itch.io page with screenshots, a GIF trailer, and a description.' },
    { day: 'Day 27–28', task: 'Write a project case study: what you built, why you made each design decision, and what you would do differently. Add to portfolio site.' },
    { day: 'Day 29–30', task: 'Share your game on r/gamedev and in three Discord servers. Apply to 5 junior game developer roles. Update your LinkedIn with the itch.io link.' },
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
      try { await navigator.share({ title: 'Game Developer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Game Developer in 2026', url: window.location.href }) }
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
      <button onClick={handleShare} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: C.orangeLight, color: C.orange, outline: 'none' }}>
        <Share2 size={13} />Share
      </button>
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono truncate max-w-xs" style={{ background: '#f1f5f9', color: C.textMuted, border: `1px solid ${C.border}` }}>
        <Link2 size={11} style={{ color: C.textFaint, flexShrink: 0 }} />
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/game-developer'}</span>
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
export default function GameDeveloperRoadmapPage() {
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
            src="https://i.imgur.com/81fCg1A.jpeg"
            alt="Game Developer workspace"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Monitor size={12} /> Creative & Interactive Technology
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Game Developer
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
            Build the worlds people escape to. Game developers design the engines, systems, and mechanics that power interactive experiences — invisible architecture that generates billions of hours of human engagement.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Game Development" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f5f3ff', borderColor: 'rgba(124,58,237,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Game Developer</strong> engineers the interactive systems that make games feel alive. While players experience characters, worlds, and mechanics as magic, game developers design and build the physics simulations, AI systems, rendering pipelines, and netcode that make those experiences possible. Game development is the most technically and creatively demanding discipline in software engineering — and the most rewarding.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Game Development could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Game Developer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.3)'; (e.currentTarget as HTMLElement).style.background = '#f5f3ff' }}
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → Lead Engineer</span></div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                <div ref={progressRef} className="h-1.5 rounded-full" style={{ width: '0%', background: 'linear-gradient(90deg, #0891b2 0%, #16a34a 33%, #7c3aed 66%, #ea580c 100%)' }} />
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
              const icons = ['🎯', '🎮', '📐', '🧩', '🌐', '⚡']
              const accentColors = ['#7c3aed', '#16a34a', '#7c3aed', '#16a34a', '#7c3aed', '#16a34a']
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.indigo} 100%)`, boxShadow: '0 8px 48px rgba(124,58,237,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>10–14 months · Consistent daily practice · Build and ship real games</div>
            </div>
          </div>
          
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
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.indigoLight }}><Code size={16} style={{ color: C.indigo }} /></div>
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
                        <div className="h-1.5 rounded-full" data-bar-w={s.level} style={{ width: 0, background: `linear-gradient(90deg, ${C.primary}, ${C.indigo})` }} />
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Game Development in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f5f3ff', borderColor: 'rgba(124,58,237,0.2)', color: C.textMuted }}>
              AI tools don't replace game developers — they <em style={{ color: C.primary }}>amplify</em> them. Developers integrating Copilot, Claude, and AI NPC platforms into their workflow generate boilerplate, create dynamic content systems, and debug physics edge cases significantly faster — freeing time for creative systems design and performance work.
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially for senior and lead roles at international studios — can pay 2–4× these figures in USD or GBP.</p>
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
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f5f3ff', borderColor: 'rgba(124,58,237,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> Game developers at product-led studios (live service games, subscription platforms) earn 25–40% more than those at work-for-hire studios. Target studios where your work ships as a product to real players, not as contract work for a client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring game developers" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into game development from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Calendar size={22} />} title="30-Day Action Plan" subtitle="Exactly what to do in your first month. Start today." iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Game Development" iconBg={C.redLight} iconColor={C.red} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {VIDEOS.map(v => (
                <div key={v.id} className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ background: '#f8f9ff', borderColor: C.border }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.3)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: '#0a0c1a' }}>
                    <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} className="w-full h-full object-cover" style={{ opacity: 0.75 }} />
                    <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center no-underline">
                      <div className="rounded-full flex items-center justify-center" style={{ width: 52, height: 52, background: 'rgba(220,38,38,0.9)' }}>
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
                      <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs no-underline" style={{ color: C.indigo }}>Watch <ExternalLink size={11} /></a>
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
                Game development is the discipline that <strong style={{ color: C.primary }}>turns imagination into reality</strong>. Every great game — every world players lose themselves in, every mechanic that sparks joy, every story that generates genuine emotion — was built by developers who cared deeply about craft and had the technical skills to execute their vision.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The path demands patience and resilience. Junior salaries are modest, entry is competitive, and the gap between knowing tutorials and shipping real games is significant. But the developers who ship consistently, study relentlessly, and build community around their work find a career of extraordinary creative and financial reward.
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
        <div className="relative overflow-hidden rounded-3xl px-12 py-16 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.indigo} 100%)`, boxShadow: '0 8px 48px rgba(124,58,237,0.25)' }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: 'rgba(255,255,255,0.05)', top: -120, right: -80 }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Rocket size={30} style={{ color: '#fff' }} />
          </div>
          <h2 className="font-extrabold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
            Ready to Start Your Journey?
          </h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open Unity or Unreal and build your first game object.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}> Get Career Advice </Link>
         
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start building today. Your future self will thank you.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}