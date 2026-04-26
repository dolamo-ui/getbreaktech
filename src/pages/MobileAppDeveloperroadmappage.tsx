import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft, ArrowRight, Check, X,
  Clock, DollarSign, Rocket,
  CheckCircle2, Code, MessageSquare, Play, ExternalLink,
  GraduationCap, Scale, ThumbsUp, ThumbsDown,
  Briefcase, Coffee, Users,
  Sparkles, Zap, TrendingUp,
  Link2, Download, Share2, Copy, CheckCheck,
  BookOpen, AlertTriangle, RefreshCw, Star, Calendar,
  Award, Target, Flame,
  Layers, Palette,
  Smartphone,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const C = {
  bg: '#ffffff', bgAlt: '#f8f9ff', border: 'rgba(0,0,0,0.07)',
  text: '#0f172a', textMuted: '#64748b', textFaint: '#94a3b8',
  primary: '#0891b2', primaryLight: 'rgba(8,145,178,0.08)', primaryMid: 'rgba(8,145,178,0.15)',
  violet: '#7c3aed', violetLight: 'rgba(124,58,237,0.08)',
  green: '#16a34a', greenLight: 'rgba(22,163,74,0.08)',
  red: '#dc2626', redLight: 'rgba(220,38,38,0.08)',
  orange: '#ea580c', orangeLight: 'rgba(234,88,12,0.08)',
  indigo: '#4f46e5', indigoLight: 'rgba(79,70,229,0.08)',
  rose: '#e11d48', roseLight: 'rgba(225,29,72,0.08)',
}

const CAREER_LEVELS = [
  {
    level: 'Junior', title: 'Junior Mobile Developer', duration: '0–2 yrs', salary: 'R380k–R650k',
    description: 'Build simple UI screens, learn app lifecycles, work on bug fixes and small features under senior guidance. Focus on mastering one platform (iOS or Android) and core SDK patterns.',
    skills: ['UI Implementation', 'App Lifecycle', 'Version Control', 'Debugging'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Mobile App Developer', duration: '2–5 yrs', salary: 'R750k–R1.4M',
    description: 'Own entire features end-to-end. Design screen flows, integrate REST APIs, implement local databases, write tests, and mentor juniors. Work across both native and cross-platform stacks.',
    skills: ['Architecture Patterns', 'API Integration', 'State Management', 'Testing'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Mobile Dev / Tech Lead', duration: '5–8 yrs', salary: 'R1.4M–R2.4M',
    description: 'Architect the entire mobile application ecosystem. Define coding standards, conduct architecture reviews, lead performance initiatives, mentor teams, and align mobile strategy with product goals.',
    skills: ['System Architecture', 'Team Leadership', 'Performance Profiling', 'Platform Strategy'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Principal', title: 'Principal / Director of Mobile', duration: '8+ yrs', salary: 'R2.5M–R5M+',
    description: 'Define the organisation-wide mobile strategy. Lead multiple platform teams, shape app portfolio decisions, influence product roadmaps, and represent mobile engineering at the executive level.',
    skills: ['Product Vision', 'Org Leadership', 'Tech Strategy', 'Executive Communication'],
    accent: '#dc2626', accentBg: 'rgba(220,38,38,0.08)', accentBorder: 'rgba(220,38,38,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Choose Your Platform & Environment Setup',
    description: 'Decide between iOS (Swift/Xcode), Android (Kotlin/Android Studio), or cross-platform (React Native/Flutter). Each path has different tooling, market demand, and learning curves. Install your IDE, configure simulators, and run your first Hello World app before week one ends.',
    duration: '2–3 weeks', skills: ['Platform Selection', 'Xcode / Android Studio', 'Simulator Setup', 'First App'],
  },
  {
    step: 2, title: 'UI Fundamentals — Layouts, Navigation & Components',
    description: 'Master the UI layer: how layouts are composed (SwiftUI, Jetpack Compose, or React Native components), how navigation stacks work, and how to build custom reusable components. UI is 70% of mobile development — invest here deeply.',
    duration: '4–6 weeks', skills: ['SwiftUI / Compose', 'Navigation Stacks', 'Custom Components', 'Responsive Layouts'],
  },
  {
    step: 3, title: 'Data — Local Storage, APIs & State Management',
    description: 'Every useful app persists and fetches data. Learn REST API integration (URLSession, Retrofit, Fetch), local database patterns (Core Data, Room, SQLite, AsyncStorage), and state management (ViewModel, Redux, BLoC). Understand the offline-first approach.',
    duration: '4–6 weeks', skills: ['REST API Integration', 'Local Databases', 'State Management', 'Offline-First'],
  },
  {
    step: 4, title: 'Architecture Patterns — MVVM, Clean Architecture',
    description: 'Write maintainable, scalable mobile code. Learn MVVM (Model-View-ViewModel), Clean Architecture principles, dependency injection, and separation of concerns. These patterns define the difference between apps that fall apart at 10,000 lines and those that thrive at 200,000.',
    duration: '4–6 weeks', skills: ['MVVM Pattern', 'Clean Architecture', 'Dependency Injection', 'Unit Testing'],
  },
  {
    step: 5, title: 'Advanced Features — Animations, Push Notifications & Performance',
    description: 'Elevate your apps with platform-specific capabilities: smooth animations and transitions, push notifications (APNs/FCM), background tasks, biometric authentication, camera and media access, and deep performance profiling using platform tools (Instruments, Android Profiler).',
    duration: '4–6 weeks', skills: ['Animations & Transitions', 'Push Notifications', 'Background Tasks', 'Performance Profiling'],
  },
  {
    step: 6, title: 'App Store Deployment — CI/CD, Release & Analytics',
    description: 'Ship confidently. Learn code signing, provisioning profiles, build configurations, and the App Store / Play Store submission process. Set up CI/CD pipelines (Fastlane, Bitrise, GitHub Actions), integrate crash reporting (Firebase Crashlytics), and analytics dashboards.',
    duration: '3–4 weeks', skills: ['App Store Submission', 'CI/CD Pipelines', 'Crash Reporting', 'Analytics'],
  },
]

const HARD_SKILLS = [
  { name: 'UI/UX Implementation', level: 95 },
  { name: 'REST API Integration', level: 91 },
  { name: 'Mobile Architecture Patterns', level: 88 },
  { name: 'Performance & Memory Optimisation', level: 85 },
  { name: 'Local Databases (Core Data / Room)', level: 83 },
  { name: 'Animations & Transitions', level: 80 },
  { name: 'Testing (Unit, UI, Integration)', level: 78 },
  { name: 'App Store Release Management', level: 74 },
]

const SOFT_SKILLS = [
  { name: 'Pixel-Perfect Attention to Detail', description: 'Mobile users notice every misaligned pixel. Great mobile developers share a designer\'s eye — they obsess over spacing, typography, touch targets, and motion. That visual discipline defines app quality.' },
  { name: 'User-Centric Thinking', description: 'Think in flows, not features. How does this feel at thumb-reach on a 6" screen? Is the tap target large enough? Mobile development requires constant empathy for how people actually use devices in the real world.' },
  { name: 'Platform Fluency', description: 'iOS and Android have fundamentally different human interface guidelines, interaction paradigms, and technical constraints. Knowing when to follow the platform and when to deviate strategically is a real skill.' },
  { name: 'Performance Obsession', description: 'Mobile devices are constrained: battery, CPU, memory, network. Great mobile developers profile constantly, eliminate jank before users find it, and treat 60fps as a minimum, not a goal.' },
  { name: 'Cross-Functional Collaboration', description: 'Mobile work sits at the intersection of design, backend, and product. Clear communication about technical constraints to designers, and about API requirements to backend teams, defines mobile engineering maturity.' },
  { name: 'Continuous Learning', description: 'Swift, Kotlin, React Native, and Flutter evolve rapidly every year. New APIs, deprecated frameworks, new design patterns — staying current with platform evolution is not optional, it\'s the job.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Computer Science / Software Engineering', duration: '3–4 years', cost: 'R350k – R900k',
    borderColor: 'rgba(8,145,178,0.2)', bgColor: '#f0fdff', typeBg: 'rgba(8,145,178,0.12)', typeColor: '#0891b2',
    pros: ['Deep CS foundations: algorithms, OS, networking', 'Respected by enterprise and large tech companies', 'Structured curriculum and strong peer network', 'Access to academic internship pipelines'],
    cons: ['Rarely teaches mobile-specific development', 'Curriculum often lags behind current frameworks', '3–4 years is slow to first mobile job', 'Portfolio still requires self-built mobile projects'],
  },
  {
    type: 'Bootcamp', title: 'iOS / Android / Cross-Platform Bootcamp', duration: '12–20 weeks', cost: 'R80k – R160k',
    borderColor: 'rgba(234,88,12,0.2)', bgColor: '#fff7ed', typeBg: 'rgba(234,88,12,0.12)', typeColor: '#ea580c',
    pros: ['Hands-on app building from week one', 'Job-ready portfolio on graduation', 'Structured learning with mentor access', 'Fast path to junior roles with strong projects'],
    cons: ['Programme quality varies significantly', 'Limited depth in architecture and CS fundamentals', 'Competitive junior market after graduation', 'App Store deployment rarely covered'],
  },
  {
    type: 'Self-Taught', title: 'Online Courses, Docs & Apps', duration: '12–18 months', cost: 'R0 – R10k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['Official Apple/Google documentation is world-class and free', 'Real project building from day one', 'No ceiling on learning depth or specialisation', 'Published apps on the App Store are the best portfolio'],
    cons: ['Requires exceptional self-discipline and structure', 'Easy to develop knowledge gaps in architecture', 'No formal credential on CV without additional certification', 'Imposter syndrome is common and real'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Standup & Sprint Review', desc: 'Team sync on current sprint features, blockers, and design handoffs. Mobile work requires tight designer collaboration.', duration: '15 min', icon: <Users size={14} /> },
  { time: '9:15', act: 'Feature Development', desc: 'Implement new UI screens, integrate API endpoints, wire up state management. Core feature building in focused blocks.', duration: '2.5 hrs', icon: <Code size={14} /> },
  { time: '11:45', act: 'Design Review & Implementation QA', desc: 'Compare implemented UI against Figma specs pixel by pixel. Negotiate edge cases with designers. Adjust for different device sizes.', duration: '45 min', icon: <Palette size={14} /> },
  { time: '12:30', act: 'Lunch', desc: 'Step away. Mobile UI work is visually demanding — a genuine break improves afternoon output and avoids decision fatigue.', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '1:30', act: 'Testing & Debugging', desc: 'Test features on multiple physical devices. Reproduce reported bugs. Profile memory and frame rate. Write unit and UI tests.', duration: '1.5 hrs', icon: <AlertTriangle size={14} /> },
  { time: '3:00', act: 'Code Review & Architecture', desc: 'Review teammates\' PRs for pattern consistency, performance issues, and code clarity. Discuss architecture decisions with tech lead.', duration: '1 hr', icon: <CheckCircle2 size={14} /> },
  { time: '4:00', act: 'Learning & Platform Updates', desc: 'Read WWDC session notes or Google I/O announcements, explore new APIs, experiment in a playground, follow Swift/Kotlin evolution proposals.', duration: '1 hr', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Xcode', cat: 'iOS IDE' }, { name: 'Android Studio', cat: 'Android IDE' },
  { name: 'Figma', cat: 'Design Handoff' }, { name: 'Firebase', cat: 'Backend / Analytics' },
  { name: 'Fastlane', cat: 'CI/CD' }, { name: 'Instruments', cat: 'Performance' },
  { name: 'TestFlight', cat: 'Beta Testing' }, { name: 'Postman', cat: 'API Testing' },
]

const WORK_ENVS = [
  { type: 'Fully Remote', pct: 55 },
  { type: 'Hybrid', pct: 35 },
  { type: 'In-Office', pct: 10 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Generated UI Boilerplate', icon: <Sparkles size={20} />,
    desc: 'Copilot and Claude generate standard view components, navigation setups, and boilerplate layout code. Mobile developers using AI assistants report 30–45% speed gains on routine screen implementation work.',
    tools: ['GitHub Copilot', 'Claude', 'Cursor', 'Codeium'],
    borderColor: 'rgba(8,145,178,0.18)', bgColor: '#f0fdff', icoBg: 'rgba(8,145,178,0.12)', icoColor: '#0891b2', tagBg: 'rgba(8,145,178,0.1)', tagColor: '#0891b2', titleColor: '#0891b2',
  },
  {
    title: 'On-Device ML & Personalisation', icon: <Zap size={20} />,
    desc: 'Core ML (iOS) and ML Kit (Android) bring machine learning directly onto the device. Mobile developers who can integrate on-device models for recommendations, image recognition, and NLP are in the highest demand tier.',
    tools: ['Core ML', 'ML Kit', 'TensorFlow Lite', 'Create ML'],
    borderColor: 'rgba(234,88,12,0.18)', bgColor: '#fff7ed', icoBg: 'rgba(234,88,12,0.12)', icoColor: '#ea580c', tagBg: 'rgba(234,88,12,0.1)', tagColor: '#ea580c', titleColor: '#ea580c',
  },
  {
    title: 'AI-Powered Crash Analytics', icon: <TrendingUp size={20} />,
    desc: 'Intelligent crash reporting tools now group, prioritise, and annotate crashes automatically. AI surfaces the root cause of regressions before they reach the App Store review process.',
    tools: ['Firebase Crashlytics', 'Bugsnag AI', 'Sentry', 'Datadog Mobile'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
]

const FUTURE_SKILLS = [
  'Vision Pro / Spatial Computing (visionOS)', 'Generative AI Integration in Apps',
  'Advanced SwiftUI & Swift Concurrency', 'Kotlin Multiplatform (KMP)',
  'App Clips & Instant Apps', 'Widget & Live Activity Development',
]

const PROS = [
  { title: 'Your Work Lives in Billions of Pockets', desc: 'Mobile apps are the primary computing interface for most humans. The code you ship reaches millions of daily users. The impact is immediate, personal, and genuinely global.' },
  { title: 'High Creative Expression', desc: 'Mobile UI is where engineering meets design artistry. Fluid animations, haptic feedback, gesture choreography, and visual polish make mobile development one of the most creatively satisfying disciplines in tech.' },
  { title: 'Exceptional Demand & Compensation', desc: 'Senior mobile developers earn R1.4M–R2.4M+ in South Africa. Demand for skilled iOS and Android engineers consistently outpaces supply — especially for engineers with architecture experience.' },
  { title: 'Fast, Tangible Feedback Loop', desc: 'Press Run, see your code on a physical device in seconds. Ship to TestFlight, get feedback from users that day. Mobile\'s feedback cycle is uniquely fast and satisfying.' },
  { title: 'Remote-First Discipline', desc: '55%+ of mobile developer roles are fully remote. The global market for mobile talent is enormous — South African developers regularly work for US and European companies at global salary rates.' },
  { title: 'Clear Career Pathways', desc: 'From junior developer to senior architect to director of mobile engineering — the career path is well-defined. Alternatively, build and publish your own apps as a solo founder or indie developer.' },
]

const CONS = [
  { title: 'Device & OS Fragmentation', desc: 'Android fragmentation is legendary — thousands of device configurations, screen densities, and OS versions. Even iOS requires careful support matrix management across hardware generations.' },
  { title: 'App Store Gatekeeping', desc: 'Apple and Google control your distribution. Opaque review processes, arbitrary rejections, and policy changes outside your control are a genuine ongoing frustration for every mobile developer.' },
  { title: 'Long Build & Compile Times', desc: 'Full Xcode or Gradle rebuilds can take minutes on large projects. Compared to web development\'s instant hot reload, native build times are a persistent productivity friction.' },
  { title: 'Pixel-Perfect Design Pressure', desc: 'Designers expect pixel-perfect implementations across dozens of screen sizes, from iPhone SE to iPad Pro to foldable Android devices. This expectation is relentless and sometimes genuinely impossible.' },
  { title: 'Rapid Platform Evolution', desc: 'Apple and Google introduce major SDK changes annually at WWDC and Google I/O. SwiftUI and Jetpack Compose are still maturing rapidly. Keeping current requires consistent annual investment.' },
  { title: 'Two Codebases (Native Path)', desc: 'If you build native iOS and Android, you maintain two codebases in two languages. Cross-platform alternatives reduce this but introduce their own abstraction costs and limitations.' },
]

const VIDEOS = [
  { id: 'comQ1-x2a1Q', title: 'SwiftUI Tutorial — Full iOS App Build', desc: 'Build a complete, production-quality iOS app with SwiftUI from scratch. Covers navigation, data, animations, and App Store submission.', dur: '3:24:00', channel: 'Sean Allen' },
  { id: 'BBWyXo-3JGQ', title: 'Kotlin Android Development — Full Course', desc: 'Complete Android development course in Kotlin. MVVM architecture, Jetpack Compose, Retrofit API integration, and Room database.', dur: '4:10:00', channel: 'Philipp Lackner' },
  { id: 'obH0Po_RxWk', title: 'React Native Full Course 2024', desc: 'Build cross-platform iOS and Android apps with React Native and Expo. Navigation, APIs, state management, and publishing to both stores.', dur: '2:50:00', channel: 'Sonny Sangha' },
]

const TAKEAWAYS = [
  'Publish an app to the App Store or Play Store before applying for any role — shipped apps are the only portfolio that matters',
  'Master one platform deeply before expanding to cross-platform — native fundamentals make you a better React Native or Flutter developer',
  'Profile your app on a real device, not just a simulator — performance issues invisible in the simulator are obvious on hardware',
  'Study the Human Interface Guidelines (iOS) and Material Design (Android) — knowing the rules is how you earn the right to break them',
  'Follow WWDC and Google I/O every year — platform changes are not optional reading, they are your professional curriculum',
]

const CAREER_FACTS = [
  {
    icon: <Smartphone size={20} />, title: 'Your Platform',
    desc: 'Build apps that live on the most personal computing device humans have ever owned. Every feature you ship is touched by fingertips, felt through haptics, and used in the most intimate moments of daily life.',
    color: '#0891b2',
  },
  {
    icon: <Code size={20} />, title: 'Core Activities',
    desc: 'UI implementation, API integration, local data persistence, animation engineering, performance profiling, app store release management, crash analysis, and cross-functional collaboration with design and backend.',
    color: '#ea580c',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Product managers defining features, designers creating Figma specs, backend engineers building APIs, QA engineers testing releases, and App Store reviewers approving your submissions.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'Mobile developer demand is structurally high and shows no signs of slowing. Every new business needs a mobile app. The shortage of experienced mobile developers — especially those with architecture skills — is severe.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '📱', title: 'Build What People Use Every Day', desc: 'Your code runs in pockets and handbags worldwide. Users open your app dozens of times per day. That intimacy and daily presence is unique to mobile development.' },
  { emoji: '🎨', title: 'Design & Engineering Merge Beautifully', desc: 'Mobile is where creative engineering meets visual artistry. Fluid animations, gesture choreography, and beautiful UI make mobile one of the most expressive disciplines in all of engineering.' },
  { emoji: '💰', title: 'Premium Market Compensation', desc: 'Senior mobile developers earn R1.4M–R2.4M+ in South Africa. The global shortage of experienced iOS and Kotlin developers means international remote roles pay even more.' },
  { emoji: '🌍', title: 'Global Audience by Default', desc: 'App Store and Play Store distribution is global from day one. Your app can reach users in 175 countries without any additional infrastructure work.' },
  { emoji: '🏗️', title: 'Build and Publish Your Own Apps', desc: 'The barrier to publishing your own product is low. Every mobile developer has the ability to become an indie developer or founder. That creative independence is rare in engineering.' },
  { emoji: '🚀', title: 'Fast Iteration & Real Feedback', desc: 'TestFlight and Google Play testing programmes mean real users can try your features within hours of a build. That tight feedback loop accelerates both learning and product quality.' },
]

const FREE_RESOURCES = [
  { category: 'iOS / Swift', color: '#0891b2', bgColor: '#f0fdff', items: [
    { name: 'Apple Developer Documentation (free)', url: '#', type: 'Docs', rating: 5 },
    { name: 'Hacking with Swift by Paul Hudson (free)', url: '#', type: 'Tutorial', rating: 5 },
    { name: 'Swift Playgrounds App (free, iPad/Mac)', url: '#', type: 'Tool', rating: 5 },
    { name: 'WWDC Session Videos — Apple (free)', url: '#', type: 'Video', rating: 5 },
  ]},
  { category: 'Android / Kotlin', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'Android Developers Official Docs (free)', url: '#', type: 'Docs', rating: 5 },
    { name: 'Google Codelabs — Android (free)', url: '#', type: 'Lab', rating: 5 },
    { name: 'Philipp Lackner YouTube Channel (free)', url: '#', type: 'YouTube', rating: 5 },
    { name: 'Kotlin Official Language Guide (free)', url: '#', type: 'Docs', rating: 5 },
  ]},
  { category: 'Cross-Platform', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'Flutter Official Documentation (free)', url: '#', type: 'Docs', rating: 5 },
    { name: 'React Native Docs & Expo Guide (free)', url: '#', type: 'Docs', rating: 5 },
    { name: 'The Net Ninja — React Native Series', url: '#', type: 'YouTube', rating: 4 },
    { name: 'FlutterFlow (visual builder + code)', url: '#', type: 'Tool', rating: 4 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Mobile Developer', range: 'R380k – R650k', midpoint: 515, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Mobile App Developer', range: 'R750k – R1.4M', midpoint: 1075, yoe: '2–5 yrs', color: '#ea580c' },
  { role: 'Senior Mobile Dev / Tech Lead', range: 'R1.4M – R2.4M', midpoint: 1900, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Principal / Director of Mobile', range: 'R2.5M – R5M+', midpoint: 3500, yoe: '8+ yrs', color: '#dc2626' },
]

const MISTAKES = [
  {
    num: '01', title: 'Building Only for the Simulator',
    desc: 'Simulators hide real-world performance issues, touch behaviour differences, actual frame rates, and memory constraints. An app that feels smooth in the simulator can feel janky on a 3-year-old device.',
    fix: 'Test on real physical devices from day one. Buy a cheap used device if needed. The simulator is for development; real devices are for truth.',
  },
  {
    num: '02', title: 'Ignoring Memory Management',
    desc: 'Strong reference cycles in iOS, or unoptimised RecyclerViews in Android, cause memory leaks that degrade app performance over time and eventually crash. Most beginners never profile memory usage.',
    fix: 'Learn ARC (iOS) and garbage collection (Android) deeply. Profile memory in Instruments and Android Studio regularly. Look for retain cycles in every class that captures self.',
  },
  {
    num: '03', title: 'Skipping Architecture Until the App is Huge',
    desc: 'Adding MVVM or Clean Architecture after 20,000 lines of Massive View Controller code is a nightmare. Most junior apps become unmaintainable because architecture was ignored at the start.',
    fix: 'Apply MVVM from your very first non-trivial screen. The overhead is minimal; the maintainability benefit compounds with every feature added.',
  },
  {
    num: '04', title: 'Not Reading Platform Guidelines',
    desc: 'Ignoring Apple\'s Human Interface Guidelines or Google\'s Material Design results in apps that feel wrong on the platform. Users can\'t articulate why, but they know something is off.',
    fix: 'Read the HIG and Material Design guide cover to cover once. Reference them every time you design a new interaction. Platforms have opinions for good reasons.',
  },
  {
    num: '05', title: 'Chasing Frameworks Before Mastering Native',
    desc: 'Jumping to React Native or Flutter before understanding UIKit or Android SDK fundamentals means you\'ll hit walls you can\'t debug because you don\'t understand what\'s underneath.',
    fix: 'Spend at least 3 months on native before any cross-platform framework. Native knowledge makes you a dramatically better cross-platform developer.',
  },
  {
    num: '06', title: 'No App Store Strategy',
    desc: 'Submitting an app without screenshots optimised for conversion, a compelling description, or a keyword strategy results in zero organic discovery. The App Store is a marketplace — treat it like one.',
    fix: 'Study App Store Optimisation (ASO) before your first submission. The store listing is a marketing document, not an afterthought.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Web Frontend Developer',
    ease: 'Natural Transition', easeColor: '#0891b2', easeBg: '#f0fdff',
    desc: 'Your UI component thinking, JavaScript proficiency, and layout intuition transfer directly. React Native is a natural next step. Native Swift/Kotlin requires learning a new paradigm but your frontend thinking is a genuine advantage.',
    steps: ['Learn React Native with Expo — your JS knowledge applies immediately', 'Build a cross-platform app that mirrors something you\'ve built for web', 'Deepen into native by studying Swift or Kotlin alongside React Native', 'Target hybrid or React Native roles first, then expand to native'],
  },
  {
    from: 'Backend Developer',
    ease: 'Moderate Effort', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'You understand the API layer your mobile app will consume — a genuine advantage. The shift requires learning UI-first thinking, platform-specific frameworks, and visual design sensibility.',
    steps: ['Study SwiftUI or Jetpack Compose — start with official tutorials', 'Build a mobile client for an API you already understand', 'Study MVVM and understand how it differs from backend patterns', 'Target roles where backend context is valued — fintech, data apps'],
  },
  {
    from: 'UI/UX Designer',
    ease: 'Unique Advantage', easeColor: '#7c3aed', easeBg: '#f5f3ff',
    desc: 'Your design eye and understanding of user flows is a rare and valuable advantage in mobile development. The barrier is learning to code — but your aesthetic judgment accelerates everything once you can.',
    steps: ['Learn Swift with SwiftUI — Playgrounds is a natural entry point for designers', 'Prototype interactions in code that you previously described in Figma', 'Study MVVM to understand how state drives the UI you design', 'Target design-engineering roles or work with design-led mobile teams'],
  },
  {
    from: 'Other Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Domain expertise plus mobile development is genuinely rare. A mobile developer who understands healthcare, logistics, or finance is exceptionally valuable in those verticals.',
    steps: ['Start with Swift Playgrounds or Android\'s Kotlin Bootcamp for Programmers', 'Build a mobile app in your previous domain — the context expertise is your edge', 'Publish it to the App Store or Play Store — a live app beats any certificate', 'Target companies in your previous industry who need mobile developers who speak their domain'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Environment & First App', color: '#0891b2', bg: '#f0fdff', days: [
    { day: 'Day 1–2', task: 'Install Xcode (iOS) or Android Studio (Android). Configure a simulator. Complete the official "Hello World" tutorial to verify your setup works end to end.' },
    { day: 'Day 3–4', task: 'Language fundamentals: Swift optionals, structs, enums, closures — or Kotlin data classes, sealed classes, coroutines. Build small programs, not apps yet.' },
    { day: 'Day 5–6', task: 'Build your first proper app: a counter with a button and label. Deploy to the simulator. Understand the view lifecycle and what happens on state change.' },
    { day: 'Day 7', task: 'Extend the counter: add multiple counters, reset functionality, and a history list. Document what each concept does in a personal notes file.' },
  ]},
  { week: 'Week 2', theme: 'UI Layouts & Navigation', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Study SwiftUI layout system (VStack, HStack, ZStack, GeometryReader) or Jetpack Compose (Column, Row, Box). Build a static profile screen from a Figma screenshot.' },
    { day: 'Day 10–11', task: 'Implement multi-screen navigation. Build a 3-screen app: list → detail → settings. Use NavigationView (iOS) or NavController (Android).' },
    { day: 'Day 12–13', task: 'Build a custom UI component: a reusable card with an image, title, subtitle, and action button. Make it work with different data inputs.' },
    { day: 'Day 14', task: 'Build a weather or recipe app UI from a Figma reference. Match it pixel-by-pixel. No API yet — use hardcoded mock data.' },
  ]},
  { week: 'Week 3', theme: 'Data, APIs & State', color: '#7c3aed', bg: '#f5f3ff', days: [
    { day: 'Day 15–16', task: 'Integrate your first REST API. Fetch JSON, decode it into model objects, and display results in a list. Use URLSession (iOS) or Retrofit (Android).' },
    { day: 'Day 17–18', task: 'Implement local data persistence. Save user favourites to Core Data (iOS) or Room (Android). Data should survive app restarts.' },
    { day: 'Day 19–20', task: 'Implement MVVM pattern. Move business logic out of the view into a ViewModel. Write one unit test for the ViewModel.' },
    { day: 'Day 21', task: 'Build an app that lists items from a real API, lets the user save favourites locally, and persists state correctly across sessions.' },
  ]},
  { week: 'Week 4', theme: 'Polish, Testing & Ship', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Add animations: list row transitions, button press feedback, a loading shimmer. Profile on a real device. Identify and fix any jank.' },
    { day: 'Day 25–26', task: 'Write UI tests for the main user flow. Add Firebase Crashlytics. Set up a basic TestFlight or internal Play Store track.' },
    { day: 'Day 27–28', task: 'Prepare App Store listing: icon, screenshots, description, keywords. Review App Store guidelines for anything that could cause rejection.' },
    { day: 'Day 29–30', task: 'Submit your app to TestFlight or Play Store internal track. Update your LinkedIn with the app link. Apply to 5 junior mobile developer roles.' },
  ]},
]

const TOC_ITEMS = [
  { num: '01', label: 'Introduction' }, { num: '02', label: 'What This Career Is' },
  { num: '03', label: 'Why Choose This Career' }, { num: '04', label: 'A Day in the Life' },
  { num: '05', label: 'Career Timeline' }, { num: '06', label: 'Step-by-Step Roadmap' },
  { num: '07', label: 'Skill Checkpoints' }, { num: '08', label: 'Education Paths' },
  { num: '09', label: 'Best Free Resources' }, { num: '10', label: 'AI-Enhanced Roadmap' },
  { num: '11', label: 'Pros & Cons' }, { num: '12', label: 'Salary' },
  { num: '13', label: 'Common Mistakes' }, { num: '14', label: 'Career Change Guide' },
  { num: '15', label: '30-Day Action Plan' }, { num: '16', label: 'Final Thoughts' },
]

function ShareBar() {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => { navigator.clipboard.writeText(window.location.href).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }) }
  const handleShare = async () => { if (navigator.share) { try { await navigator.share({ title: 'Mobile App Developer Career Roadmap 2026', url: window.location.href }) } catch (_) {} } else { handleCopy() } }
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-10 p-4 rounded-2xl" style={{ background: '#f8f9ff', border: `1px solid ${C.border}` }}>
      <span className="text-xs font-semibold" style={{ color: C.textMuted }}>Share this roadmap:</span>
      <button onClick={handleCopy} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: copied ? 'rgba(22,163,74,0.1)' : C.primaryLight, color: copied ? '#16a34a' : C.primary, outline: 'none' }}>{copied ? <CheckCheck size={13} /> : <Copy size={13} />}{copied ? 'Copied!' : 'Copy Link'}</button>
      <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: C.violetLight, color: C.violet, outline: 'none' }}><Download size={13} />Download PDF</button>
      <button onClick={handleShare} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: C.orangeLight, color: C.orange, outline: 'none' }}><Share2 size={13} />Share</button>
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono truncate max-w-xs" style={{ background: '#f1f5f9', color: C.textMuted, border: `1px solid ${C.border}` }}><Link2 size={11} style={{ color: C.textFaint, flexShrink: 0 }} /><span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/mobile-developer'}</span></div>
    </div>
  )
}

function SectionHeader({ icon, title, subtitle, iconBg, iconColor }: { icon: React.ReactNode; title: string; subtitle: string; iconBg: string; iconColor: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg }}><span style={{ color: iconColor }}>{icon}</span></div>
      <div><div className="text-2xl font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>{title}</div><div className="text-xs" style={{ color: C.textMuted }}>{subtitle}</div></div>
    </div>
  )
}

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

export default function MobileAppDeveloperRoadmapPage() {
  const progressRef = useRef<HTMLDivElement>(null)
  const tlSectionRef = useRef<HTMLElement>(null)
  const barsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => { const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap'; document.head.appendChild(link) }, [])
  useEffect(() => { const ctx = gsap.context(() => { if (progressRef.current) gsap.fromTo(progressRef.current, { width: '0%' }, { width: '100%', duration: 2.2, ease: 'power2.out', scrollTrigger: { trigger: tlSectionRef.current, start: 'top 72%', toggleActions: 'play none none reverse' } }) }); return () => ctx.revert() }, [])
  useEffect(() => { const ctx = gsap.context(() => { const bars = barsContainerRef.current?.querySelectorAll<HTMLElement>('[data-bar-w]'); bars?.forEach(bar => { gsap.fromTo(bar, { width: '0%' }, { width: `${bar.dataset.barW}%`, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: bar, start: 'top 92%', toggleActions: 'play none none reverse' } }) }) }); return () => ctx.revert() }, [])

  const introRef = useFade(); const whatRef = useFade(); const whyRef = useFade()
  const tlRef = useFade(); const stepsRef = useFade(); const skillsRef = useFade()
  const eduRef = useFade(); const freeRef = useFade(); const dayRef = useFade()
  const pcRef = useFade(); const aiRef = useFade(); const salaryRef = useFade()
  const mistakesRef = useFade(); const changeRef = useFade(); const planRef = useFade()
  const finalRef = useFade(); const vidsRef = useFade()

  const sectionStyle = { paddingTop: 72, paddingBottom: 72, borderBottomColor: C.border }

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.text, fontFamily: 'Inter, sans-serif' }}>
      <Link to="/roadmaps" className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold no-underline transition-all duration-200" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', border: `1px solid ${C.border}`, color: C.textMuted, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}><ArrowLeft size={14} /> All Roadmaps</Link>

      {/* HERO */}
      <div className="relative w-full" style={{ background: C.bg }}>
        <div className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: 600 }}>
          <img src="https://i.imgur.com/K4hIYrQ.jpeg" alt="Mobile App Developer" className="w-full h-full object-cover object-center block" style={{ filter: 'saturate(0.65) brightness(1.1)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}><Smartphone size={12} /> Product Development</div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>Mobile App Developer</h1>
              <span className="block font-normal mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', color: C.textMuted }}>Career Roadmap 2026</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><Clock size={14} style={{ color: C.textFaint }} /> 20 min read</div>
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><BookOpen size={14} style={{ color: C.textFaint }} /> 16 sections</div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-8 pt-6 pb-16">
          <p className="text-base leading-relaxed" style={{ color: '#4b5563', maxWidth: 560, marginLeft: 140 }}>Build the apps billions of people use every day. Mobile developers craft the primary digital interface for most of humanity — blending engineering precision with visual artistry to create experiences that live in pockets worldwide.</p>
          <div className="h-px mt-10" style={{ background: C.border }} />
        </div>
      </div>

      {/* TOC */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={introRef}><SectionHeader icon={<BookOpen size={22} />} title="What's Inside" subtitle="Everything you need to know about this career in one place" iconBg={C.primaryLight} iconColor={C.primary} /><div className="grid grid-cols-2 md:grid-cols-4 gap-2">{TOC_ITEMS.map(item => (<div key={item.num} className="flex items-center gap-2.5 rounded-xl px-3.5 py-3 border transition-all duration-150 cursor-default hover:shadow-sm" style={{ background: C.bg, borderColor: C.border }}><span className="font-mono text-xs font-bold flex-shrink-0" style={{ color: C.textFaint }}>{item.num}</span><span className="text-xs font-medium" style={{ color: C.text }}>{item.label}</span></div>))}</div></div></div>
      </section>

      {/* WHAT */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={whatRef}>
          <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Mobile App Development" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0fdff', borderColor: 'rgba(8,145,178,0.2)' }}>
            <p className="text-base leading-relaxed" style={{ color: '#374151' }}>A <strong style={{ color: C.primary }}>Mobile App Developer</strong> designs, builds, and ships the software applications that run on iOS and Android devices. Unlike web development, mobile engineering requires deep mastery of platform-specific frameworks, hardware constraints, device capabilities (camera, GPS, sensors), and the unique UX patterns users expect on touchscreens. It is one of the most visible and user-impactful roles in all of software engineering.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{CAREER_FACTS.map(f => (<div key={f.title} className="flex gap-4 rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style={{ background: C.bg, borderColor: C.border }}><div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${f.color}12` }}><span style={{ color: f.color }}>{f.icon}</span></div><div><div className="text-sm font-bold mb-1.5" style={{ color: C.text }}>{f.title}</div><div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{f.desc}</div></div></div>))}</div>
        </div></div>
      </section>

      {/* WHY */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={whyRef}><SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Mobile Development could be your best move" iconBg={C.orangeLight} iconColor={C.orange} /><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{WHY_REASONS.map(r => (<div key={r.title} className="rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style={{ background: C.bg, borderColor: C.border }}><div className="flex items-start gap-3"><div className="text-2xl flex-shrink-0">{r.emoji}</div><div><div className="text-sm font-bold mb-1.5" style={{ color: C.text }}>{r.title}</div><div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{r.desc}</div></div></div></div>))}</div></div></div>
      </section>

      {/* DAY */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={dayRef}><SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Mobile App Developer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
          <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
            <div><p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>{SCHEDULE.map(item => (<div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(8,145,178,0.3)'; (e.currentTarget as HTMLElement).style.background = '#f0fdff' }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.background = C.bg }}><div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: C.primaryLight, color: C.primary }}>{item.icon}</div><div className="flex-1 min-w-0"><div className="flex items-center justify-between gap-2 mb-0.5"><span className="text-sm font-semibold" style={{ color: C.text }}>{item.act}</span><span className="text-xs flex-shrink-0" style={{ color: C.textMuted }}>{item.duration}</span></div><div className="text-xs" style={{ color: C.textMuted }}>{item.desc}</div></div><span className="font-mono text-xs flex-shrink-0" style={{ color: C.primary }}>{item.time}</span></div>))}</div>
            <div><div className="rounded-2xl p-5 mb-4 border" style={{ background: '#f8f9ff', borderColor: C.border }}><div className="text-sm font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Tools & Tech</div><div className="flex flex-wrap">{TOOLS.map(t => (<span key={t.name} className="inline-block rounded-lg px-2.5 py-1.5 mr-1.5 mb-2 border" style={{ background: C.bg, borderColor: C.border }}><span className="text-xs font-semibold" style={{ color: C.text }}>{t.name}</span><span className="text-xs" style={{ color: C.textFaint }}> ({t.cat})</span></span>))}</div></div>
              <div className="rounded-2xl p-5 border" style={{ background: '#f8f9ff', borderColor: C.border }}><div className="text-sm font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Work Environment</div>{WORK_ENVS.map(e => (<div key={e.type} className="mb-3.5"><div className="flex justify-between text-xs mb-1.5"><span style={{ color: C.textMuted }}>{e.type}</span><span className="font-mono" style={{ color: C.primary }}>{e.pct}%</span></div><div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}><div className="h-1.5 rounded-full" style={{ width: `${e.pct}%`, background: C.primary }} /></div></div>))}<div className="text-xs mt-2" style={{ color: C.textFaint }}>Based on 2026 industry surveys</div></div></div>
          </div>
        </div></div>
      </section>

      {/* TIMELINE */}
      <section ref={tlSectionRef} className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={tlRef}><SectionHeader icon={<Clock size={22} />} title="Career Timeline" subtitle="Time estimates and salary ranges for each level" iconBg={C.indigoLight} iconColor={C.indigo} />
          <div className="mb-10"><div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → Director of Mobile</span></div><div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}><div ref={progressRef} className="h-1.5 rounded-full" style={{ width: '0%', background: 'linear-gradient(90deg, #0891b2 0%, #ea580c 33%, #7c3aed 66%, #dc2626 100%)' }} /></div><div className="flex justify-between mt-2.5">{CAREER_LEVELS.map(l => <span key={l.level} className="font-mono" style={{ color: l.accent, fontSize: '0.68rem' }}>{l.duration}</span>)}</div></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">{CAREER_LEVELS.map(l => (<div key={l.level} className="rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg" style={{ background: C.bg, borderColor: l.accentBorder }}><div className="inline-block rounded-full px-2.5 py-0.5 mb-3 font-mono text-xs font-bold uppercase tracking-widest" style={{ background: l.accentBg, color: l.accent }}>{l.level}</div><div className="text-base font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>{l.title}</div><div className="text-sm font-semibold mb-2.5" style={{ color: l.accent }}>{l.salary}</div><div className="text-xs leading-relaxed mb-3.5" style={{ color: C.textMuted }}>{l.description}</div><div className="flex flex-wrap gap-1.5">{l.skills.map(s => <span key={s} className="rounded px-1.5 py-0.5 font-mono text-xs" style={{ background: '#f1f5f9', color: C.textMuted }}>{s}</span>)}</div></div>))}</div>
        </div></div>
      </section>

      {/* ROADMAP */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div ref={stepsRef} className="max-w-2xl mx-auto px-4">
          <SectionHeader icon={<Target size={22} />} title="Step-by-Step Roadmap" subtitle="Your path from complete beginner to job-ready" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="relative flex flex-col items-center">
            {ROADMAP_STEPS.map((s, i) => {
              const icons = ['📱', '🎨', '🗄️', '🏗️', '✨', '🚀']
              const accentColors = ['#0891b2', '#ea580c', '#0891b2', '#ea580c', '#0891b2', '#ea580c']
              const accent = accentColors[i]; const isLast = i === ROADMAP_STEPS.length - 1; const isEven = i % 2 === 0
              return (
                <div key={s.step} className="w-full flex flex-col items-center">
                  <div className="w-full" style={{ opacity: 0, transform: 'translateY(20px)', transition: `opacity 0.5s ${i * 0.13}s ease, transform 0.5s ${i * 0.13}s ease` }} ref={el => { if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect() } }, { threshold: 0.15 }); obs.observe(el) }}>
                    <div className="w-full rounded-3xl overflow-hidden" style={{ background: `${accent}08`, border: `2px solid ${accent}25`, boxShadow: `0 4px 24px ${accent}12` }}>
                      <div className="flex items-center gap-4 px-5 py-5">
                        <div className="flex-shrink-0 flex items-center justify-center rounded-full text-2xl font-bold" style={{ width: 64, height: 64, background: `linear-gradient(135deg, ${accent}20, ${accent}10)`, border: `3px solid ${accent}40` }}>{icons[i]}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap"><span className="text-xs font-black uppercase tracking-widest font-mono" style={{ color: accent }}>STEP {s.step}:</span><span className="text-xs rounded-full px-2 py-0.5 font-mono" style={{ background: `${accent}12`, color: accent }}>{s.duration}</span></div>
                          <div className="font-extrabold mb-2 leading-tight" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', color: C.text }}>{s.title.toUpperCase()}</div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1">{s.skills.map(sk => (<div key={sk} className="flex items-center gap-1.5 text-xs" style={{ color: C.textMuted }}><CheckCircle2 size={11} style={{ color: accent, flexShrink: 0 }} /><span className="font-mono uppercase tracking-wide" style={{ fontSize: '0.65rem' }}>{sk}</span></div>))}</div>
                        </div>
                      </div>
                      <div className="px-5 pb-4 text-xs leading-relaxed" style={{ color: C.textMuted, borderTop: `1px solid ${accent}15`, paddingTop: 10 }}>{s.description}</div>
                    </div>
                  </div>
                  {!isLast && (<div className="flex w-full" style={{ height: 48 }}><svg viewBox="0 0 400 48" className="w-full" style={{ height: 48 }} preserveAspectRatio="none"><path d={isEven ? 'M200,0 C200,24 380,24 380,48' : 'M200,0 C200,24 20,24 20,48'} fill="none" stroke="#e2e8f0" strokeWidth="40" strokeLinecap="round" /><path d={isEven ? 'M200,0 C200,24 380,24 380,48' : 'M200,0 C200,24 20,24 20,48'} fill="none" stroke={accentColors[i + 1] ?? accent} strokeWidth="4" strokeLinecap="round" strokeOpacity="0.4" strokeDasharray="12 8" />{isEven ? <polygon points="372,36 388,44 372,52" fill={accentColors[i + 1] ?? accent} opacity="0.5" /> : <polygon points="28,36 12,44 28,52" fill={accentColors[i + 1] ?? accent} opacity="0.5" />}</svg></div>)}
                </div>
              )
            })}
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.violet} 100%)`, boxShadow: '0 8px 48px rgba(8,145,178,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>10–14 months · Consistent daily practice · Publish real apps, not just tutorials</div>
            </div>
          </div>
          <ShareBar />
        </div>
      </section>

      {/* SKILLS */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={skillsRef}><SectionHeader icon={<CheckCircle2 size={22} />} title="Skill Checkpoints" subtitle="Technical and interpersonal skills to develop" iconBg={C.indigoLight} iconColor={C.indigo} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-7 border" style={{ background: C.bg, borderColor: C.border }}>
              <div className="flex items-center gap-3 mb-6"><div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.primaryLight }}><Smartphone size={16} style={{ color: C.primary }} /></div><div><div className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Hard Skills</div><div className="text-xs mt-0.5" style={{ color: C.textMuted }}>Technical competencies required</div></div></div>
              <div ref={barsContainerRef}>{HARD_SKILLS.map(s => (<div key={s.name} className="mb-4"><div className="flex justify-between mb-1.5"><span className="text-xs" style={{ color: C.textMuted }}>{s.name}</span><span className="text-xs font-mono" style={{ color: C.textFaint }}>{s.level}%</span></div><div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}><div className="h-1.5 rounded-full" data-bar-w={s.level} style={{ width: 0, background: `linear-gradient(90deg, ${C.primary}, ${C.violet})` }} /></div></div>))}</div>
            </div>
            <div className="rounded-2xl p-7 border" style={{ background: C.bg, borderColor: C.border }}>
              <div className="flex items-center gap-3 mb-6"><div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.indigoLight }}><MessageSquare size={16} style={{ color: C.indigo }} /></div><div><div className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Soft Skills</div><div className="text-xs mt-0.5" style={{ color: C.textMuted }}>Interpersonal abilities to build</div></div></div>
              {SOFT_SKILLS.map(s => (<div key={s.name} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border transition-colors cursor-default" style={{ background: '#f8f9ff', borderColor: C.border }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.primaryLight} onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#f8f9ff'}><div className="text-sm font-semibold mb-0.5" style={{ color: C.text }}>{s.name}</div><div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{s.description}</div></div>))}
            </div>
          </div>
        </div></div>
      </section>

      {/* EDU */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={eduRef}><SectionHeader icon={<GraduationCap size={22} />} title="Education Paths" subtitle="Three routes into the field — pick yours" iconBg="rgba(148,163,184,0.1)" iconColor={C.textMuted} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">{EDU_PATHS.map(p => (<div key={p.type} className="rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg" style={{ background: p.bgColor, borderColor: p.borderColor }}><div className="inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest mb-4 font-mono" style={{ background: p.typeBg, color: p.typeColor }}>{p.type}</div><div className="text-base font-bold mb-3.5" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>{p.title}</div><div className="flex gap-3.5 text-xs mb-4" style={{ color: C.textMuted }}><span className="flex items-center gap-1"><Clock size={11} />{p.duration}</span><span className="flex items-center gap-1"><DollarSign size={11} />{p.cost}</span></div><div className="text-xs font-bold mb-2" style={{ color: C.green }}>Advantages</div>{p.pros.map(item => <div key={item} className="flex items-start gap-2 text-xs mb-1.5" style={{ color: C.textMuted }}><Check size={11} style={{ color: C.green, flexShrink: 0, marginTop: 2 }} />{item}</div>)}<div className="text-xs font-bold mb-2 mt-3.5" style={{ color: C.red }}>Challenges</div>{p.cons.map(item => <div key={item} className="flex items-start gap-2 text-xs mb-1.5" style={{ color: C.textMuted }}><X size={11} style={{ color: C.red, flexShrink: 0, marginTop: 2 }} />{item}</div>)}</div>))}</div>
        </div></div>
      </section>

      {/* FREE RESOURCES */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={freeRef}><SectionHeader icon={<BookOpen size={22} />} title="Best Free Resources" subtitle="World-class learning material, most of it completely free" iconBg={C.greenLight} iconColor={C.green} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{FREE_RESOURCES.map(cat => (<div key={cat.category} className="rounded-2xl p-6 border" style={{ background: cat.bgColor, borderColor: `${cat.color}25` }}><div className="inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest mb-5 font-mono" style={{ background: `${cat.color}15`, color: cat.color }}>{cat.category}</div>{cat.items.map(item => (<div key={item.name} className="rounded-xl p-3 mb-2.5 last:mb-0 border" style={{ background: C.bg, borderColor: C.border }}><div className="flex items-start justify-between gap-2 mb-1"><span className="text-xs font-semibold" style={{ color: C.text }}>{item.name}</span><span className="text-xs rounded px-1.5 py-0.5 flex-shrink-0 font-mono" style={{ background: `${cat.color}12`, color: cat.color }}>{item.type}</span></div><div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < item.rating ? cat.color : 'none'} style={{ color: i < item.rating ? cat.color : C.textFaint }} />)}</div></div>))}</div>))}</div>
        </div></div>
      </section>

      {/* AI */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={aiRef}><SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Mobile Development in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0fdff', borderColor: 'rgba(8,145,178,0.2)', color: C.textMuted }}>AI accelerates mobile development in 2026 — from generating boilerplate screens to powering on-device intelligence. Mobile developers who integrate AI tools into their workflow ship faster and build smarter apps. Understanding both sides of AI in mobile is now a professional baseline.</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-9">{AI_IMPACTS.map(item => (<div key={item.title} className="rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-1 hover:shadow-md" style={{ background: item.bgColor, borderColor: item.borderColor }}><div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: item.icoBg }}><span style={{ color: item.icoColor }}>{item.icon}</span></div><div className="text-sm font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif', color: item.titleColor }}>{item.title}</div><div className="text-xs leading-relaxed mb-3.5" style={{ color: C.textMuted }}>{item.desc}</div><div className="flex flex-wrap gap-1.5">{item.tools.map(t => <span key={t} className="rounded px-2 py-0.5 text-xs font-mono font-semibold" style={{ background: item.tagBg, color: item.tagColor }}>{t}</span>)}</div></div>))}</div>
          <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Emerging Skills to Learn Now</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">{FUTURE_SKILLS.map((s, i) => (<div key={s} className="flex items-center gap-2.5 rounded-xl px-4 py-3.5 border" style={{ background: '#f8f9ff', borderColor: C.border }}><div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-black text-xs" style={{ background: C.primaryLight, color: C.primary }}>{i + 1}</div><span className="text-xs font-medium" style={{ color: C.text }}>{s}</span></div>))}</div>
        </div></div>
      </section>

      {/* PROS CONS */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={pcRef}><SectionHeader icon={<Scale size={22} />} title="Pros & Cons" subtitle="The honest picture of this career path" iconBg="rgba(148,163,184,0.1)" iconColor={C.textMuted} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl p-7 border" style={{ background: '#f0fdf4', borderColor: 'rgba(22,163,74,0.2)' }}><div className="flex items-center gap-3 mb-5"><div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(22,163,74,0.12)' }}><ThumbsUp size={16} style={{ color: C.green }} /></div><span className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.green }}>Advantages</span></div>{PROS.map(p => (<div key={p.title} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border" style={{ background: C.bg, borderColor: 'rgba(22,163,74,0.12)' }}><div className="text-sm font-semibold mb-1" style={{ color: C.text }}>{p.title}</div><div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{p.desc}</div></div>))}</div>
            <div className="rounded-3xl p-7 border" style={{ background: '#fff5f5', borderColor: 'rgba(220,38,38,0.2)' }}><div className="flex items-center gap-3 mb-5"><div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(220,38,38,0.1)' }}><ThumbsDown size={16} style={{ color: C.red }} /></div><span className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.red }}>Challenges</span></div>{CONS.map(c => (<div key={c.title} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border" style={{ background: C.bg, borderColor: 'rgba(220,38,38,0.12)' }}><div className="text-sm font-semibold mb-1" style={{ color: C.text }}>{c.title}</div><div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{c.desc}</div></div>))}</div>
          </div>
        </div></div>
      </section>

      {/* SALARY */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={salaryRef}><SectionHeader icon={<DollarSign size={22} />} title="Salary" subtitle="What you can realistically earn at each stage" iconBg={C.greenLight} iconColor={C.green} />
          <div className="rounded-2xl p-6 mb-6 border" style={{ background: '#f0fdf4', borderColor: 'rgba(22,163,74,0.2)' }}><p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Remote roles for US and European companies — common for experienced mobile developers — can pay 2–4× these figures in USD.</p></div>
          <div className="space-y-4">{SALARY_DATA.map(row => (<div key={row.role} className="rounded-2xl p-5 border" style={{ background: '#f8f9ff', borderColor: C.border }}><div className="flex items-center justify-between mb-3 flex-wrap gap-2"><div><span className="text-sm font-bold" style={{ color: C.text }}>{row.role}</span><span className="ml-3 text-xs font-mono" style={{ color: C.textFaint }}>{row.yoe}</span></div><span className="text-sm font-bold" style={{ color: row.color }}>{row.range}</span></div><div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}><div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 4200) * 100}%`, background: row.color }} /></div></div>))}</div>
          <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f0fdff', borderColor: 'rgba(8,145,178,0.2)' }}><p className="text-xs leading-relaxed" style={{ color: C.textMuted }}><strong style={{ color: C.primary }}>Pro tip:</strong> Developers who publish popular apps on the App Store or Play Store command 20–35% salary premiums. A live app with real users is worth more than any certification in mobile developer interviews.</p></div>
        </div></div>
      </section>

      {/* MISTAKES */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={mistakesRef}><SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring mobile developers" iconBg={C.orangeLight} iconColor={C.orange} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{MISTAKES.map(m => (<div key={m.num} className="rounded-2xl p-5 border transition-all duration-200 hover:shadow-md" style={{ background: C.bg, borderColor: C.border }}><div className="flex items-start gap-3 mb-3"><span className="font-mono text-xs font-black flex-shrink-0 mt-0.5" style={{ color: C.textFaint }}>{m.num}</span><div><div className="text-sm font-bold mb-1.5" style={{ color: C.red }}>{m.title}</div><div className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{m.desc}</div></div></div><div className="rounded-xl p-3 border-l-2 ml-5" style={{ background: '#f0fdf4', borderLeftColor: C.green }}><span className="text-xs font-bold" style={{ color: C.green }}>Fix: </span><span className="text-xs" style={{ color: C.textMuted }}>{m.fix}</span></div></div>))}</div>
        </div></div>
      </section>

      {/* CAREER CHANGE */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={changeRef}><SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into mobile development from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{CAREER_CHANGE_PATHS.map(path => (<div key={path.from} className="rounded-2xl p-6 border" style={{ background: path.easeBg, borderColor: `${path.easeColor}20` }}><div className="flex items-center justify-between mb-3"><div className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>From: {path.from}</div><span className="text-xs rounded-full px-2.5 py-1 font-semibold" style={{ background: `${path.easeColor}15`, color: path.easeColor }}>{path.ease}</span></div><p className="text-xs leading-relaxed mb-4" style={{ color: C.textMuted }}>{path.desc}</p><div className="space-y-2">{path.steps.map((step, i) => (<div key={step} className="flex items-center gap-2.5 text-xs" style={{ color: C.text }}><div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: `${path.easeColor}20`, color: path.easeColor }}>{i + 1}</div>{step}</div>))}</div></div>))}</div>
        </div></div>
      </section>

      {/* 30 DAY */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={planRef}><SectionHeader icon={<Calendar size={22} />} title="30-Day Action Plan" subtitle="Exactly what to do in your first month. Start today." iconBg={C.orangeLight} iconColor={C.orange} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{THIRTY_DAY_PLAN.map(week => (<div key={week.week} className="rounded-2xl border overflow-hidden" style={{ background: C.bg, borderColor: C.border }}><div className="px-5 py-4 border-b" style={{ background: week.bg, borderBottomColor: `${week.color}20` }}><div className="flex items-center justify-between"><span className="text-sm font-bold" style={{ fontFamily: 'Syne, sans-serif', color: week.color }}>{week.week}</span><span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${week.color}15`, color: week.color }}>{week.theme}</span></div></div><div className="p-5">{week.days.map(d => (<div key={d.day} className="flex items-start gap-3 mb-3.5 last:mb-0"><span className="text-xs font-mono font-bold flex-shrink-0 pt-0.5" style={{ color: week.color }}>{d.day}</span><span className="text-xs leading-relaxed" style={{ color: C.textMuted }}>{d.task}</span></div>))}</div></div>))}</div>
        </div></div>
      </section>

      {/* VIDEOS */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={vidsRef}><SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Mobile App Development" iconBg={C.redLight} iconColor={C.red} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{VIDEOS.map(v => (<div key={v.id} className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ background: '#f8f9ff', borderColor: C.border }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(8,145,178,0.3)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)' }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}><div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: '#0a0c1a' }}><img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} className="w-full h-full object-cover" style={{ opacity: 0.75 }} /><a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center no-underline"><div className="rounded-full flex items-center justify-center" style={{ width: 52, height: 52, background: 'rgba(8,145,178,0.9)' }}><Play size={20} fill="white" style={{ color: '#fff', marginLeft: 2 }} /></div></a><div className="absolute bottom-2 right-2 flex items-center gap-1 rounded px-2 py-1 text-xs text-white" style={{ background: 'rgba(0,0,0,0.75)' }}><Clock size={10} />{v.dur}</div></div><div className="p-4"><div className="text-sm font-semibold mb-1.5 leading-snug" style={{ color: C.text }}>{v.title}</div><div className="text-xs leading-relaxed mb-3" style={{ color: C.textMuted }}>{v.desc}</div><div className="flex items-center justify-between"><span className="text-xs" style={{ color: C.textFaint }}>{v.channel}</span><a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs no-underline" style={{ color: C.indigo }}>Watch <ExternalLink size={11} /></a></div></div></div>))}</div>
        </div></div>
      </section>

      {/* FINAL */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8"><div ref={finalRef}><SectionHeader icon={<Award size={22} />} title="Final Thoughts" subtitle="What we want you to take away from this guide" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="rounded-2xl p-6 border mb-8" style={{ background: C.bg, borderColor: C.border }}><p className="text-base leading-relaxed mb-4" style={{ color: '#374151' }}>Mobile development is one of the most <strong style={{ color: C.primary }}>creative, impactful, and personally satisfying</strong> disciplines in engineering. The moment you hold your own published app on a physical device and use it the way real users will — that experience is uniquely motivating and difficult to replicate in any other area of software development.</p><p className="text-base leading-relaxed" style={{ color: '#374151' }}>Publish something. It doesn't have to be perfect. A live app with 10 real users teaches you more than 100 tutorial videos. The App Store and Play Store are your portfolio — start filling them today.</p></div>
          <div className="grid grid-cols-1 gap-3">{TAKEAWAYS.map((t, i) => (<div key={t} className="flex items-center gap-3.5 rounded-xl px-5 py-3.5 border" style={{ background: C.bg, borderColor: C.border }}><div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-black text-xs" style={{ background: C.primaryLight, color: C.primary }}>{i + 1}</div><span className="text-sm" style={{ color: C.text }}>{t}</span></div>))}</div>
        </div></div>
      </section>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-8" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="relative overflow-hidden rounded-3xl px-12 py-16 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.violet} 100%)` }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: 'rgba(255,255,255,0.05)', top: -120, right: -80 }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(255,255,255,0.15)' }}><Rocket size={30} style={{ color: '#fff' }} /></div>
          <h2 className="font-extrabold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>Ready to Build Your First App?</h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>You have the roadmap. You have the resources. You have the 30-day plan. Open Xcode or Android Studio and write your first line of mobile code today.</p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>Explore More Roadmaps <ArrowRight size={16} /></Link>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>Get Career Advice</a>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start building today. Millions of users are waiting for your app.</p>
        </div>
        <ShareBar />
      </div>
    </div>
  )
}