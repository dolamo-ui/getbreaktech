import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft, ArrowRight, Check, X,
  Clock, DollarSign, Rocket,
  CheckCircle2, Code, MessageSquare, Play, ExternalLink,
  GraduationCap, Scale, ThumbsUp, ThumbsDown,
  Briefcase, Coffee, Users, Lightbulb, Monitor, Home,
  Sparkles, Zap, TrendingUp,
  Link2, Download, Share2, Copy, CheckCheck,
  BookOpen, AlertTriangle, RefreshCw, Star, Calendar,
  Award, Target, Flame, BarChart2,
  Layers, FileText, Globe, Layout,
  GitBranch, Package, Cpu, Shield,
  Cloud, Workflow, Eye, Wifi, Radio, Database,
  Server, Lock, Activity, Settings, Terminal,
  BatteryCharging, Thermometer, Box,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── COLORS ──────────────────────────────────────────────────────────────── */
const C = {
  bg: '#ffffff',
  bgAlt: '#f5f9f8',
  bgCard: '#ffffff',
  border: 'rgba(0,0,0,0.07)',
  text: '#0f1f1a',
  textMuted: '#4a6b5e',
  textFaint: '#8aab9c',
  primary: '#0d6b4f',         // deep teal/green — IoT brand colour
  primaryLight: 'rgba(13,107,79,0.08)',
  primaryMid: 'rgba(13,107,79,0.15)',
  teal: '#0891b2',
  tealLight: 'rgba(8,145,178,0.08)',
  green: '#16a34a',
  greenLight: 'rgba(22,163,74,0.08)',
  amber: '#d97706',
  amberLight: 'rgba(217,119,6,0.08)',
  orange: '#ea580c',
  orangeLight: 'rgba(234,88,12,0.08)',
  indigo: '#4f46e5',
  indigoLight: 'rgba(79,70,229,0.08)',
  violet: '#7c3aed',
  violetLight: 'rgba(124,58,237,0.08)',
  red: '#dc2626',
  redLight: 'rgba(220,38,38,0.08)',
}

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const CAREER_LEVELS = [
  {
    level: 'Junior', title: 'Junior IoT Engineer', duration: '0–2 yrs', salary: 'R260k–R450k',
    description: 'Develop firmware for microcontrollers, interface with sensors, implement basic MQTT/HTTP protocols, and support IoT platform integration under senior guidance.',
    skills: ['C/C++', 'Arduino/ESP32', 'MQTT', 'Python'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'IoT Engineer', duration: '2–5 yrs', salary: 'R500k–R900k',
    description: 'Design end-to-end IoT solutions, implement security protocols, optimize power consumption, work with cloud IoT platforms, and lead device integration projects.',
    skills: ['RTOS', 'AWS IoT / Azure', 'Security', 'Edge Computing'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior IoT Engineer', duration: '5–8 yrs', salary: 'R900k–R1.5M',
    description: 'Architect large-scale IoT deployments, design device management systems, establish security standards, optimize for scalability, and mentor junior engineers.',
    skills: ['System Architecture', 'OTA Updates', 'Device Mgmt', 'Mentoring'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Principal', title: 'Principal IoT Architect', duration: '8+ yrs', salary: 'R1.5M+',
    description: 'Define IoT strategy across the organization, architect connected ecosystems, drive standards adoption, evaluate emerging technologies, and shape product direction.',
    skills: ['IoT Strategy', 'Platform Design', 'Standards', 'Vision'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Electronics & Embedded Fundamentals',
    description: 'Master basic electronics (Ohm\'s law, circuits, sensors, actuators), learn C/C++ for embedded systems, and get hands-on with microcontrollers like Arduino and ESP32. These hardware fundamentals are the bedrock of all IoT work.',
    duration: '2–3 months', skills: ['C/C++', 'Arduino', 'Electronics', 'GPIO'],
  },
  {
    step: 2, title: 'Communication Protocols & Networking',
    description: 'Deep dive into IoT communication protocols — MQTT, CoAP, HTTP, BLE, Zigbee, LoRaWAN, and Wi-Fi. Understand how devices talk to each other and to the cloud. Protocol selection affects power, range, and cost.',
    duration: '2–3 months', skills: ['MQTT', 'BLE', 'LoRaWAN', 'Wi-Fi/Zigbee'],
  },
  {
    step: 3, title: 'Cloud IoT Platforms & Data Pipelines',
    description: 'Learn AWS IoT Core, Azure IoT Hub, or Google Cloud IoT. Understand how to ingest device data, store it efficiently, and build processing pipelines that transform raw sensor data into business intelligence.',
    duration: '2–3 months', skills: ['AWS IoT', 'Azure IoT', 'Time-Series DB', 'Data Pipelines'],
  },
  {
    step: 4, title: 'RTOS & Edge Computing',
    description: 'Real-Time Operating Systems (FreeRTOS, Zephyr) enable complex multi-task firmware. Edge computing with platforms like AWS Greengrass or Azure IoT Edge brings processing closer to devices, reducing latency and cloud costs.',
    duration: '2 months', skills: ['FreeRTOS', 'Zephyr', 'Edge Computing', 'Task Scheduling'],
  },
  {
    step: 5, title: 'IoT Security & Device Management',
    description: 'Security is non-negotiable in IoT. Learn TLS/DTLS encryption, certificate-based authentication, secure boot, OTA (Over-The-Air) firmware updates, and device lifecycle management at scale.',
    duration: '1–2 months', skills: ['TLS/DTLS', 'PKI', 'OTA Updates', 'Secure Boot'],
  },
  {
    step: 6, title: 'Analytics, AI & Production Deployment',
    description: 'Apply machine learning to IoT data — anomaly detection, predictive maintenance, and TinyML on microcontrollers. Learn to monitor fleet health, manage deployments at scale, and build dashboards for real-time visibility.',
    duration: '2–3 months', skills: ['TinyML', 'Anomaly Detection', 'Fleet Mgmt', 'Dashboards'],
  },
]

const HARD_SKILLS = [
  { name: 'C / C++ for Embedded Systems', level: 93 },
  { name: 'Microcontrollers (ESP32, STM32, Arduino)', level: 91 },
  { name: 'MQTT & IoT Protocols', level: 89 },
  { name: 'Cloud IoT Platforms (AWS/Azure/GCP)', level: 85 },
  { name: 'Python for IoT & Data', level: 84 },
  { name: 'RTOS (FreeRTOS, Zephyr)', level: 78 },
  { name: 'IoT Security & Cryptography', level: 76 },
  { name: 'Edge Computing & TinyML', level: 70 },
]

const SOFT_SKILLS = [
  { name: 'Systems Thinking', description: 'IoT spans hardware, firmware, networking, cloud, and UI. You must see how changes at one layer ripple through the entire system. Engineers who think in systems solve problems faster and prevent costly bugs.' },
  { name: 'Power Budget Obsession', description: 'Battery-powered devices live or die by power consumption. Every millisecond of radio use, every peripheral left on — it all costs milliwatts that compound into dead devices in the field.' },
  { name: 'Debugging Across Layers', description: 'Is the issue firmware? The network? The cloud? A sensor calibration drift? IoT debugging spans every layer simultaneously. Methodical isolation and protocol analyzers are your best tools.' },
  { name: 'Constraint-Driven Design', description: 'IoT hardware has severe constraints — limited RAM, slow processors, low bandwidth. The best solutions are elegant within these bounds. Resourcefulness within constraints is the core craft.' },
  { name: 'Field Reliability Mindset', description: 'Deployed devices sit in remote locations for years. Code that works in your lab must survive power outages, poor connectivity, and edge cases. Defensive programming and watchdog timers are table stakes.' },
  { name: 'Cross-Discipline Collaboration', description: 'IoT engineers work with mechanical engineers, industrial designers, cloud architects, and data scientists. Bridging these worlds requires patience, curiosity, and communication that non-engineers can follow.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Electrical / Computer Eng Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(13,107,79,0.2)', bgColor: '#f0faf6', typeBg: 'rgba(13,107,79,0.12)', typeColor: '#0d6b4f',
    pros: ['Strong electronics & signal fundamentals', 'PCB design and hardware lab experience', 'Recruiter trust for hardware roles', 'Access to research and internships'],
    cons: ['IoT curriculum often outdated', 'Limited cloud and connectivity focus', 'Theory-heavy on topics rarely used', 'Self-study still required for cloud skills'],
  },
  {
    type: 'Bootcamp', title: 'IoT / Embedded Systems Bootcamp', duration: '3–6 months', cost: 'R40k – R100k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Hands-on hardware project portfolio', 'Fast track to job-ready skills', 'Industry-aligned curriculum', 'Networking with cohort peers'],
    cons: ['Variable hardware lab quality', 'Limited depth in security', 'Competitive job market on exit', 'Less coverage of enterprise scale'],
  },
  {
    type: 'Self-Taught', title: 'Online Courses & Maker Projects', duration: '12–24 months', cost: 'R500 – R8k',
    borderColor: 'rgba(8,145,178,0.2)', bgColor: '#f0f9ff', typeBg: 'rgba(8,145,178,0.12)', typeColor: '#0891b2',
    pros: ['Massive open-source hardware community', 'Cheap hardware (ESP32 ~R80)', 'Build real-world IoT projects immediately', 'Platforms like Coursera, Udemy, Arduino Project Hub'],
    cons: ['Requires strong self-discipline', 'Easy to miss security fundamentals', 'Portfolio must compensate for no credential', 'Harder to get first role without network'],
  },
]

const SCHEDULE = [
  { time: '8:30', act: 'Standup & Device Health Review', desc: 'Check fleet dashboards for overnight anomalies, review alerts, discuss blockers with firmware and cloud teams', duration: '30 min', icon: <Activity size={14} /> },
  { time: '9:00', act: 'Firmware Development', desc: 'Deep focus on writing and testing firmware — sensor drivers, protocol handlers, RTOS tasks, and power optimization routines', duration: '2.5 hrs', icon: <Cpu size={14} /> },
  { time: '11:30', act: 'Protocol Testing & Simulation', desc: 'Test MQTT message flows, simulate connectivity failures, validate OTA update sequences across test devices', duration: '1 hr', icon: <Wifi size={14} /> },
  { time: '1:00', act: 'Lunch & Lab Exploration', desc: 'IoT engineers often tinker during lunch — breadboarding new sensor ideas, reading datasheets, exploring new modules', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Cloud Platform Integration', desc: 'Integrate device telemetry with IoT Hub, configure rules engines, build data pipelines, and troubleshoot connectivity edge cases', duration: '1.5 hrs', icon: <Cloud size={14} /> },
  { time: '3:30', act: 'Code Review & Documentation', desc: 'Review teammates\' firmware PRs, update device integration docs, and validate security configurations before release', duration: '1 hr', icon: <FileText size={14} /> },
  { time: '4:30', act: 'Learning & Community', desc: 'Read embedded engineering blogs, explore new microcontrollers, follow Hackster.io projects, or contribute to open-source firmware libraries', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'VS Code + PlatformIO', cat: 'IDE' }, { name: 'MQTT Explorer', cat: 'Debugging' },
  { name: 'Wireshark', cat: 'Network' }, { name: 'AWS IoT Core', cat: 'Cloud' },
  { name: 'FreeRTOS', cat: 'RTOS' }, { name: 'Grafana', cat: 'Dashboard' },
  { name: 'OpenOCD / JTAG', cat: 'Debugging' }, { name: 'GitHub', cat: 'Version Control' },
]

const WORK_ENVS = [
  { type: 'Hybrid', pct: 52 },
  { type: 'In-Office / Lab', pct: 32 },
  { type: 'Remote', pct: 16 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Assisted Firmware', icon: <Sparkles size={20} />,
    desc: 'LLMs accelerate firmware development by generating boilerplate driver code, suggesting efficient algorithms, and helping debug complex RTOS timing issues. Engineers using AI tools write firmware 30–40% faster.',
    tools: ['GitHub Copilot', 'Claude', 'Cursor', 'ChatGPT'],
    borderColor: 'rgba(13,107,79,0.18)', bgColor: '#f0faf6', icoBg: 'rgba(13,107,79,0.12)', icoColor: '#0d6b4f', tagBg: 'rgba(13,107,79,0.1)', tagColor: '#0d6b4f', titleColor: '#0d6b4f',
  },
  {
    title: 'TinyML on Devices', icon: <Cpu size={20} />,
    desc: 'TensorFlow Lite Micro and Edge Impulse enable machine learning directly on microcontrollers. IoT devices can now perform anomaly detection, gesture recognition, and predictive maintenance entirely on-device.',
    tools: ['TensorFlow Lite', 'Edge Impulse', 'CMSIS-NN', 'MicroAI'],
    borderColor: 'rgba(8,145,178,0.18)', bgColor: '#f0f9ff', icoBg: 'rgba(8,145,178,0.12)', icoColor: '#0891b2', tagBg: 'rgba(8,145,178,0.1)', tagColor: '#0891b2', titleColor: '#0891b2',
  },
  {
    title: 'AI-Driven Device Ops', icon: <TrendingUp size={20} />,
    desc: 'AI fleet management tools predict device failures before they happen, auto-generate OTA rollback plans, and detect security anomalies across thousands of connected devices in real time.',
    tools: ['AWS IoT Defender', 'Azure Sphere', 'Samsara AI', 'Particle AI'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'Matter Protocol (smart home standard)', 'Digital Twins & Simulation',
  'TinyML & On-Device Inference', '5G NR IoT (RedCap / NB-IoT)',
  'Zero Trust IoT Security Architecture', 'Satellite IoT (Starlink, Swarm)',
]

const PROS = [
  { title: 'Hardware Meets Software', desc: 'IoT engineering is the rare discipline where you write C firmware for a microcontroller AND build cloud infrastructure on the same day. The breadth is unmatched and deeply satisfying.' },
  { title: 'Massive Global Market', desc: 'The IoT market is projected to exceed $1.1 trillion by 2028. Industrial IoT, smart buildings, agriculture, healthcare — every industry is connecting devices. Demand for IoT engineers vastly outpaces supply.' },
  { title: 'Tangible Real-World Impact', desc: 'Your firmware runs inside real devices that monitor crops, track cold-chain logistics, or detect gas leaks in factories. The physical, measurable impact of IoT work is deeply motivating.' },
  { title: 'Diverse Problem Domains', desc: 'IoT engineers work in agriculture, healthcare, manufacturing, energy, logistics, and smart cities. The diversity of application domains means you\'re never solving the same problem twice.' },
  { title: 'Strong Compensation', desc: 'Senior IoT engineers earn R900k–R1.5M in South Africa. The hardware expertise combined with cloud skills creates a rare combination that commands a significant salary premium over pure software roles.' },
  { title: 'Maker Culture & Community', desc: 'The IoT and embedded engineering community is passionate and welcoming. Hackster.io, maker faires, and open-source hardware projects create an ecosystem that celebrates builders and experimenters.' },
]

const CONS = [
  { title: 'Hardware Debugging is Brutal', desc: 'When a device fails in the field at 3am in a remote location, debugging without access to the physical hardware is an exercise in creative diagnostics. Remote debugging tools help, but hardware problems can still take days to isolate.' },
  { title: 'Security is Constantly Neglected', desc: 'The IoT industry has a poor track record on security. You\'ll inherit legacy systems with no encryption, default passwords, and no OTA update mechanism. Retrofitting security is harder than building it in from the start.' },
  { title: 'Fragmented Ecosystem', desc: 'Hundreds of hardware platforms, communication protocols, cloud providers, and operating systems exist with little standardization. Choosing the wrong platform early can lock you into costly migration work later.' },
  { title: 'Power Constraints Are Relentless', desc: 'Battery-powered devices demand extreme optimization. Every byte sent over the radio, every millisecond the processor runs — it consumes power. The arithmetic of battery life dominates design decisions constantly.' },
  { title: 'Long Development Cycles', desc: 'Hardware has long lead times. PCB fabrication takes weeks, component shortages can delay projects by months, and field testing takes longer than software testing. The pace is slower than pure software development.' },
  { title: 'Complex Multi-Layer Debugging', desc: 'Is the bug in firmware? The network stack? The cloud message broker? A faulty sensor reading? IoT bugs span every layer of the stack simultaneously. Isolating root causes requires deep knowledge of all layers.' },
]

const VIDEOS = [
  { id: 'h0gWfVCSGQQ', title: 'IoT Full Course — Beginners to Advanced', desc: 'Complete IoT development course covering hardware, firmware, protocols, cloud integration, and building real-world projects from scratch.', dur: '9:32:00', channel: 'freeCodeCamp' },
  { id: 'LYNMSGPOxp0', title: 'ESP32 & MQTT — Complete IoT Project', desc: 'Build a complete IoT sensor system with ESP32, MQTT messaging, and a cloud dashboard. The definitive hands-on IoT project tutorial.', dur: '1:24:30', channel: 'Random Nerd Tutorials' },
  { id: 'cIr8n8Mgq2o', title: 'AWS IoT Core — Full Tutorial 2024', desc: 'Connect real devices to AWS IoT Core, set up device shadows, build rules engines, and integrate with DynamoDB and Lambda for full IoT pipelines.', dur: '2:08:00', channel: 'AWS Training' },
]

const TAKEAWAYS = [
  'Start with a microcontroller, a sensor, and a blinking LED — physical fundamentals before cloud abstractions',
  'Security must be designed in from day one — retrofitting encryption and authentication is extremely painful',
  'Learn to read datasheets — every sensor and chip has one, and they answer the questions Stack Overflow can\'t',
  'Power budgeting is a first-class engineering concern — design your sleep modes before you design your features',
  'Build at least 3 complete IoT projects end-to-end and document them publicly — this is your portfolio',
]

const CAREER_FACTS = [
  {
    icon: <Wifi size={20} />, title: 'What You Build',
    desc: 'Connected sensor systems, smart industrial equipment, asset tracking platforms, environmental monitoring networks, predictive maintenance systems, and intelligent building automation — physical-digital bridges.',
    color: '#0d6b4f',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Firmware development, protocol implementation, cloud IoT integration, device security hardening, OTA update systems, fleet management, power optimization, and data pipeline engineering.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Hardware/PCB engineers, mechanical engineers, cloud architects, data scientists, product managers, and industrial domain experts (factory engineers, agronomists, building managers).',
    color: '#0891b2',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'IoT engineer demand grew 34% in 2024. Industrial IoT alone is a $110B market. Smart agriculture, healthcare wearables, and smart cities are creating millions of connected endpoints that need expert engineers.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🔧', title: 'Hardware + Software Mastery', desc: 'IoT is the only engineering discipline that demands deep firmware knowledge AND cloud architecture skills simultaneously. The breadth makes you exceptionally rare and well-compensated.' },
  { emoji: '🌍', title: 'Massive Market Growth', desc: 'Over 29 billion IoT devices will be connected by 2027. The demand for engineers who can build, secure, and scale connected systems is growing faster than the supply can fill.' },
  { emoji: '🏭', title: 'Real-World Physical Impact', desc: 'Your code runs in hospitals, farms, factories, and power plants. When your predictive maintenance system prevents a factory line from going down, you feel the impact viscerally.' },
  { emoji: '🔐', title: 'Critical Security Domain', desc: 'IoT security is chronically underfunded yet critically important. Engineers who understand device security are in extreme demand as regulatory pressure mounts globally on connected device manufacturers.' },
  { emoji: '⚡', title: 'Maker & Innovator Culture', desc: 'IoT attracts builders and inventors. The community is collaborative, passionate, and celebrates open-source hardware. You\'ll never run out of fascinating problems to explore in your home lab.' },
  { emoji: '🚀', title: 'Frontier Technology', desc: '5G NR-IoT, satellite connectivity, TinyML, and Matter protocol are reshaping what\'s possible. IoT engineers work at the frontier of physical-digital integration constantly.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#0d6b4f', bgColor: '#f0faf6', items: [
    { name: 'Coursera: IoT Specialization (UC San Diego)', url: '#', type: 'Course', rating: 5 },
    { name: 'ESP-IDF / Arduino Official Docs', url: '#', type: 'Docs', rating: 5 },
    { name: 'edX: Embedded Systems — Shape the World', url: '#', type: 'Course', rating: 5 },
    { name: 'Random Nerd Tutorials (ESP32/ESP8266)', url: '#', type: 'Tutorial', rating: 5 },
  ]},
  { category: 'Practice', color: '#0891b2', bgColor: '#f0f9ff', items: [
    { name: 'Hackster.io — IoT Project Ideas', url: '#', type: 'Projects', rating: 5 },
    { name: 'Wokwi — Online ESP32 Simulator', url: '#', type: 'Simulator', rating: 5 },
    { name: 'Node-RED — Visual IoT Programming', url: '#', type: 'Tool', rating: 4 },
    { name: 'AWS IoT Core Free Tier', url: '#', type: 'Platform', rating: 5 },
  ]},
  { category: 'Community', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'Andreas Spiess YouTube (IoT & Electronics)', url: '#', type: 'YouTube', rating: 5 },
    { name: 'r/esp32 & r/embedded Community', url: '#', type: 'Forum', rating: 5 },
    { name: 'Embedded.fm Podcast', url: '#', type: 'Podcast', rating: 4 },
    { name: 'Eclipse IoT & Arduino Forums', url: '#', type: 'Forum', rating: 4 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior IoT Engineer', range: 'R260k – R450k', midpoint: 355, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'IoT Engineer', range: 'R500k – R900k', midpoint: 700, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior IoT Engineer', range: 'R900k – R1.5M', midpoint: 1200, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Principal IoT Architect', range: 'R1.5M – R2.6M+', midpoint: 2050, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Ignoring Security from Day One',
    desc: 'Shipping devices with hardcoded credentials, no TLS, and no OTA update mechanism is a liability that affects every device ever manufactured. Security retrofits are nightmarishly expensive.',
    fix: 'Start every project with a security threat model. Use certificate-based auth, TLS 1.2+, and plan your OTA update mechanism before writing any feature code.',
  },
  {
    num: '02', title: 'Not Reading Datasheets',
    desc: 'Guessing how a sensor or chip works instead of reading its datasheet leads to subtle bugs that manifest months later in the field — wrong voltage levels, incorrect timing, misconfigured modes.',
    fix: 'Make it a habit: always read the full datasheet for every component before writing a single line of driver code. Highlight the key timing diagrams and electrical specifications.',
  },
  {
    num: '03', title: 'Skipping Power Budget Analysis',
    desc: 'Building a device that lasts 2 days on battery instead of 2 years because sleep modes weren\'t designed in from the start. Power is an architectural decision, not an afterthought.',
    fix: 'Before coding, build a power budget spreadsheet. Model every current draw state (active, sleep, transmit). Set targets and measure against them from the first prototype.',
  },
  {
    num: '04', title: 'No Error Handling in Firmware',
    desc: 'IoT devices encounter unexpected conditions: bad sensor reads, lost connectivity, corrupt memory, power glitches. Without defensive error handling and watchdog timers, devices stop working silently in the field.',
    fix: 'Implement watchdog timers, hardware fault handlers, and connectivity retry logic in every project. Assume everything will fail. Design your device to recover gracefully from every failure mode.',
  },
  {
    num: '05', title: 'Choosing the Wrong Protocol',
    desc: 'Using Wi-Fi for a battery-powered device that checks in once per hour, or choosing LoRaWAN for a device that streams 10KB of data every second. Protocol mismatches waste power and money.',
    fix: 'Map your requirements (data rate, range, power budget, cost) against protocol capabilities before choosing. Build a small prototype to validate protocol choice before committing to hardware design.',
  },
  {
    num: '06', title: 'No Field Testing Strategy',
    desc: 'A device that works perfectly in your lab may fail immediately in real environmental conditions — temperature extremes, RF interference, unstable power, and real-world network congestion.',
    fix: 'Build a field testing plan. Test at temperature extremes, in high-RF environments, with weak network signals, and with deliberately corrupted data. Simulate years of operation with accelerated testing.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Electrical / Electronics Engineer',
    ease: 'Natural Fit', easeColor: '#0d6b4f', easeBg: '#f0faf6',
    desc: 'You already understand circuits, sensors, and signal processing. Add embedded C firmware, MQTT protocols, and cloud IoT integration. You\'re building on a strong foundation — the transition is very achievable.',
    steps: ['Learn C/C++ for embedded systems (ESP32)', 'Master MQTT and cloud IoT basics', 'Build 3 end-to-end IoT projects', 'Target industrial IoT or smart device companies'],
  },
  {
    from: 'Software Developer (Backend / Full-Stack)',
    ease: 'Very Achievable', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Your cloud and API skills are incredibly valuable. You need to add hardware fundamentals and embedded C knowledge. The IoT cloud side will feel familiar — the firmware and hardware layer is what requires focused study.',
    steps: ['Learn electronics basics and embedded C', 'Buy an ESP32 kit and build sensor projects', 'Leverage cloud skills on IoT platforms', 'Target IoT cloud/platform engineering roles'],
  },
  {
    from: 'Mechatronics / Robotics Engineer',
    ease: 'Very Easy', easeColor: '#0891b2', easeBg: '#f0f9ff',
    desc: 'You already understand sensors, actuators, real-time systems, and control loops. IoT adds connectivity and cloud intelligence to systems you already understand deeply. The transition is almost seamless.',
    steps: ['Learn MQTT and IoT connectivity protocols', 'Study cloud IoT platforms (AWS IoT)', 'Add data analytics and dashboard skills', 'Target industrial IoT or smart manufacturing roles'],
  },
  {
    from: 'Network / Systems Engineer',
    ease: 'Strong Pathway', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'You understand networking deeply — TCP/IP, protocols, infrastructure. IoT adds constrained hardware and firmware to your existing strengths. Your security and network optimization knowledge is especially valuable.',
    steps: ['Learn microcontroller basics (ESP32)', 'Study embedded C and sensor integration', 'Apply networking expertise to IoT protocols', 'Target IoT security or infrastructure roles'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Hardware & Firmware Basics', color: '#0d6b4f', bg: '#f0faf6', days: [
    { day: 'Day 1–2', task: 'Order ESP32 dev kit (~R80). Set up VS Code + PlatformIO. Blink an LED. Read your first sensor datasheet.' },
    { day: 'Day 3–4', task: 'Read a temperature/humidity sensor (DHT22 or BME280). Display real sensor data over Serial.' },
    { day: 'Day 5–6', task: 'Learn C structs, pointers, and embedded memory management. Understand the difference between stack and heap on constrained devices.' },
    { day: 'Day 7', task: 'Build a multi-sensor data logger that reads 3 sensors and stores readings to flash memory. Push code to GitHub.' },
  ]},
  { week: 'Week 2', theme: 'Connectivity & Protocols', color: '#0891b2', bg: '#f0f9ff', days: [
    { day: 'Day 8–9', task: 'Connect ESP32 to Wi-Fi. Publish sensor data to a local MQTT broker (Mosquitto). Use MQTT Explorer to inspect messages.' },
    { day: 'Day 10–11', task: 'Explore BLE with ESP32. Implement a BLE GATT service that exposes sensor data to a mobile app.' },
    { day: 'Day 12–13', task: 'Set up AWS IoT Core free tier. Connect your ESP32 to AWS IoT using MQTT over TLS with X.509 certificates.' },
    { day: 'Day 14', task: 'Build a sensor telemetry pipeline: ESP32 → AWS IoT → DynamoDB → simple Node.js dashboard. Deploy and document it.' },
  ]},
  { week: 'Week 3', theme: 'Security & RTOS', color: '#7c3aed', bg: '#f5f0ff', days: [
    { day: 'Day 15–16', task: 'Implement proper certificate-based TLS authentication. Learn about secure boot and encrypted flash storage on ESP32.' },
    { day: 'Day 17–18', task: 'Learn FreeRTOS fundamentals: tasks, queues, semaphores. Refactor your firmware to run 3 concurrent tasks.' },
    { day: 'Day 19–20', task: 'Implement OTA (Over-The-Air) firmware updates using ESP-IDF OTA API and AWS IoT Jobs service.' },
    { day: 'Day 21', task: 'Security audit your project: check for hardcoded credentials, verify TLS, test error handling paths. Fix all issues found.' },
  ]},
  { week: 'Week 4', theme: 'Cloud, Analytics & Deploy', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Build an AWS IoT Rules Engine pipeline that routes anomalous sensor readings to SNS alerts and normal data to S3 for analysis.' },
    { day: 'Day 25–26', task: 'Set up Grafana + InfluxDB to visualize time-series sensor data. Build a real-time IoT dashboard with alerts.' },
    { day: 'Day 27–28', task: 'Power optimization pass: implement deep sleep modes, measure actual current draw, optimize to extend battery life by 50%.' },
    { day: 'Day 29–30', task: 'Finalize project documentation, write a detailed README with architecture diagram, share on LinkedIn and Hackster.io, apply to IoT roles.' },
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
      try { await navigator.share({ title: 'IoT Engineer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become an IoT Engineer in 2026', url: window.location.href }) }
      catch (_) {}
    } else { handleCopy() }
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-10 p-4 rounded-2xl" style={{ background: '#f5f9f8', border: `1px solid ${C.border}` }}>
      <span className="text-xs font-semibold" style={{ color: C.textMuted }}>Share this roadmap:</span>
      <button onClick={handleCopy} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: copied ? 'rgba(22,163,74,0.1)' : C.primaryLight, color: copied ? '#16a34a' : C.primary, outline: 'none' }}>
        {copied ? <CheckCheck size={13} /> : <Copy size={13} />}{copied ? 'Copied!' : 'Copy Link'}
      </button>
      <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: C.tealLight, color: C.teal, outline: 'none' }}>
        <Download size={13} />Download / Save PDF
      </button>
      <button onClick={handleShare} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: C.orangeLight, color: C.orange, outline: 'none' }}>
        <Share2 size={13} />Share
      </button>
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono truncate max-w-xs" style={{ background: '#f1f5f9', color: C.textMuted, border: `1px solid ${C.border}` }}>
        <Link2 size={11} style={{ color: C.textFaint, flexShrink: 0 }} />
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/iot-engineer'}</span>
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
export default function IoTEngineerRoadmapPage() {
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
            src="https://i.imgur.com/WH5jj6C.jpeg"
            alt="IoT Engineer workspace with connected devices"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.6) brightness(1.02)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Wifi size={12} /> Embedded & Connected Systems
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f1f1a', letterSpacing: '-0.03em' }}>
                IoT Engineer
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
            Design intelligent connected systems that bridge the physical and digital worlds. IoT Engineers write firmware for microcontrollers, architect cloud pipelines, and build the infrastructure that makes billions of connected devices possible.
          </p>
          <div className="h-px mt-10" style={{ background: C.border }} />
        </div>
      </div>

      {/* ── TABLE OF CONTENTS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f5f9f8' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={introRef}>
            <SectionHeader icon={<BookOpen size={22} />} title="What's Inside" subtitle="Everything you need to know about becoming an IoT Engineer" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of IoT Engineering" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0faf6', borderColor: 'rgba(13,107,79,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                An <strong style={{ color: C.primary }}>IoT Engineer</strong> designs and builds systems where physical devices communicate, compute, and act intelligently. Firmware for microcontrollers, communication protocols like MQTT and BLE, cloud IoT platforms, and real-time data pipelines — all converging into connected solutions. IoT engineers are rare because they must excel at both hardware-constrained embedded code AND scalable cloud architecture.
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
      <section className="border-b" style={{ ...sectionStyle, background: '#f5f9f8' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={whyRef}>
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons IoT Engineering could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical IoT Engineer workday looks like" iconBg={C.tealLight} iconColor={C.teal} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(13,107,79,0.3)'; (e.currentTarget as HTMLElement).style.background = '#f0faf6' }}
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
                <div className="rounded-2xl p-5 mb-4 border" style={{ background: '#f5f9f8', borderColor: C.border }}>
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
                <div className="rounded-2xl p-5 border" style={{ background: '#f5f9f8', borderColor: C.border }}>
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
      <section ref={tlSectionRef} className="border-b" style={{ ...sectionStyle, background: '#f5f9f8' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={tlRef}>
            <SectionHeader icon={<Clock size={22} />} title="Career Timeline" subtitle="Time estimates and salary ranges for each level" iconBg={C.tealLight} iconColor={C.teal} />
            <div className="mb-10">
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → Principal</span></div>
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
          <SectionHeader icon={<Target size={22} />} title="Step-by-Step Roadmap" subtitle="Your path from complete beginner to job-ready IoT Engineer" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="relative flex flex-col items-center">
            {ROADMAP_STEPS.map((s, i) => {
              const icons = ['🔌', '📡', '☁️', '⚙️', '🔐', '🤖']
              const accentColors = ['#0d6b4f', '#0891b2', '#0d6b4f', '#0891b2', '#0d6b4f', '#0891b2']
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.teal} 100%)`, boxShadow: '0 8px 48px rgba(13,107,79,0.25)' }}>
              <div className="text-4xl mb-3">🌐</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>12–16 months · Consistent daily practice · Build and deploy real IoT systems</div>
            </div>
          </div>
          <ShareBar />
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f5f9f8' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={skillsRef}>
            <SectionHeader icon={<CheckCircle2 size={22} />} title="Skill Checkpoints" subtitle="Technical and interpersonal skills to develop" iconBg={C.tealLight} iconColor={C.teal} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl p-7 border" style={{ background: C.bg, borderColor: C.border }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.tealLight }}><Code size={16} style={{ color: C.teal }} /></div>
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
                        <div className="h-1.5 rounded-full" data-bar-w={s.level} style={{ width: 0, background: `linear-gradient(90deg, ${C.primary}, ${C.teal})` }} />
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
                  <div key={s.name} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border transition-colors cursor-default" style={{ background: '#f5f9f8', borderColor: C.border }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.primaryLight}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#f5f9f8'}>
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
      <section className="border-b" style={{ ...sectionStyle, background: '#f5f9f8' }}>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming IoT Engineering in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0faf6', borderColor: 'rgba(13,107,79,0.2)', color: C.textMuted }}>
              AI tools accelerate IoT development by generating boilerplate firmware, suggesting power optimization strategies, and auto-detecting anomalies in device telemetry. TinyML is enabling machine learning directly on microcontrollers — a fundamental shift in what connected devices can do at the edge.
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
                <div key={s} className="flex items-center gap-2.5 rounded-xl px-4 py-3.5 border" style={{ background: '#f5f9f8', borderColor: C.border }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-black text-xs" style={{ background: C.primaryLight, color: C.primary }}>{i + 1}</div>
                  <span className="text-xs font-medium" style={{ color: C.text }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROS & CONS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f5f9f8' }}>
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially for senior IoT engineers with hardware + cloud expertise — can pay 3–5× these figures in USD or EUR.</p>
            </div>
            <div className="space-y-4">
              {SALARY_DATA.map(row => (
                <div key={row.role} className="rounded-2xl p-5 border" style={{ background: '#f5f9f8', borderColor: C.border }}>
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div>
                      <span className="text-sm font-bold" style={{ color: C.text }}>{row.role}</span>
                      <span className="ml-3 text-xs font-mono" style={{ color: C.textFaint }}>{row.yoe}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: row.color }}>{row.range}</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 2400) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f0faf6', borderColor: 'rgba(13,107,79,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> IoT engineers with both hardware (embedded C, PCB design) and cloud skills earn 30–50% more than pure embedded developers. The combination is exceptionally rare and in massive demand globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f5f9f8' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring IoT engineers" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into IoT engineering from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
      <section className="border-b" style={{ ...sectionStyle, background: '#f5f9f8' }}>
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in IoT & Embedded Engineering" iconBg={C.redLight} iconColor={C.red} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {VIDEOS.map(v => (
                <div key={v.id} className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ background: '#f5f9f8', borderColor: C.border }}
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
      <section className="border-b" style={{ ...sectionStyle, background: '#f5f9f8' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={finalRef}>
            <SectionHeader icon={<Award size={22} />} title="Final Thoughts" subtitle="What we want you to take away from this guide" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 border mb-8" style={{ background: C.bg, borderColor: C.border }}>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#374151' }}>
                IoT engineering is where the <strong style={{ color: C.primary }}>physical world meets the digital</strong>. It demands both the precision of hardware engineering and the scalability of cloud architecture. When you write firmware that runs in a device monitoring a patient's heartbeat, or tracking a cold-chain shipment across continents, the stakes and satisfaction are both immense.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                Start with an ESP32 and a sensor. Get your hands dirty with real hardware. Build, break, debug, and rebuild. The path to a great IoT engineering career is paved with actual devices that you've connected to the cloud yourself. No simulations — real circuits, real protocols, real data.
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
        <div className="relative overflow-hidden rounded-3xl px-12 py-16 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.teal} 100%)` }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: 'rgba(255,255,255,0.05)', top: -120, right: -80 }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Rocket size={30} style={{ color: '#fff' }} />
          </div>
          <h2 className="font-extrabold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
            Ready to Build the Connected World?
          </h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to order an ESP32 and start connecting things.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              Get Career Advice
            </a>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start connecting devices today. Your future self will be proud.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}