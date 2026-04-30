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
  Layers, FileText,
  Shield, Lock,
 Workflow, Eye,
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
  primary: '#dc2626',         // red — security brand colour
  primaryLight: 'rgba(220,38,38,0.08)',
  primaryMid: 'rgba(220,38,38,0.15)',
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
    level: 'Junior', title: 'Junior Security Analyst', duration: '0–2 yrs', salary: 'R340k–R560k',
    description: 'Monitor logs, investigate alerts, identify threats, and learn security fundamentals under guidance. SOC analyst work with mentorship from senior team members. Build your threat detection foundation.',
    skills: ['Network Basics', 'Log Analysis', 'SIEM Tools', 'Threat Response'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Security Analyst', duration: '2–5 yrs', salary: 'R680k–R1.2M',
    description: 'Lead threat investigations, design security controls, conduct vulnerability assessments, and mentor junior analysts. Own security for specific systems and take incident response lead on critical events.',
    skills: ['Incident Response', 'Penetration Testing', 'Compliance', 'Risk Assessment'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Security Analyst', duration: '5–8 yrs', salary: 'R1.2M–R2M',
    description: 'Design security architecture, establish security policies, lead major incident responses, and drive security culture across the organization. Build and manage security teams and systems.',
    skills: ['Architecture Design', 'Policy Dev', 'Team Leadership', 'Risk Mgmt'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Principal', title: 'Chief Security Officer', duration: '8+ yrs', salary: 'R2.2M+',
    description: 'Define company-wide security strategy, ensure regulatory compliance, manage security budgets, and align security with business goals. The highest responsibility in organizational security.',
    skills: ['Strategy', 'Compliance', 'Leadership', 'Business Acumen'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Networking & OS Fundamentals',
    description: 'Understand TCP/IP, DNS, HTTP/HTTPS, and operate confidently in Linux and Windows. You cannot defend what you don\'t understand. Networks are where attacks happen.',
    duration: '2–3 months', skills: ['TCP/IP', 'DNS/DHCP', 'Linux Basics', 'Windows Admin'],
  },
  {
    step: 2, title: 'Security Fundamentals & Certifications',
    description: 'Learn the Security+ or CompTIA A+ exam. These certifications cover essential security concepts and are often required by employers. They build your security vocabulary and framework.',
    duration: '2–3 months', skills: ['Security+', 'Cybersecurity Basics', 'Threats & Mitigations', 'Best Practices'],
  },
  {
    step: 3, title: 'SIEM & Log Analysis',
    description: 'Master Security Information and Event Management tools like Splunk or Elastic. Learn to analyse logs, detect anomalies, write detection rules, and identify threats from raw data.',
    duration: '2–3 months', skills: ['Splunk / Elastic', 'Log Parsing', 'Detection Rules', 'Alert Tuning'],
  },
  {
    step: 4, title: 'Incident Response & Threat Hunting',
    description: 'Learn incident response procedures, forensics basics, and active threat hunting. Understand the attacker lifecycle and how to detect each stage. Start with playbooks, then build intuition.',
    duration: '2–3 months', skills: ['Incident Response', 'Threat Hunting', 'Forensics', 'Attack Taxonomy'],
  },
  {
    step: 5, title: 'Vulnerability Management & Penetration Testing',
    description: 'Conduct vulnerability assessments with tools like Nessus or Qualys. Learn to prioritise findings by risk. Understand penetration testing basics — how attackers think and operate.',
    duration: '2–3 months', skills: ['Nessus / Qualys', 'Vuln Assessment', 'Pen Testing Basics', 'Risk Prioritisation'],
  },
  {
    step: 6, title: 'Compliance, Governance & Advanced Topics',
    description: 'Learn frameworks like ISO27001, HIPAA, PCI-DSS, and GDPR. Understand how security aligns with business. Study advanced topics: cloud security, threat intelligence, or specialise further.',
    duration: '3–4 months', skills: ['Compliance Frameworks', 'Governance', 'Auditing', 'Advanced Topics'],
  },
]

const HARD_SKILLS = [
  { name: 'Network Protocols & Architecture', level: 88 },
  { name: 'Incident Response & Investigation', level: 86 },
  { name: 'SIEM Tools (Splunk, Elastic)', level: 82 },
  { name: 'Linux & Windows Administration', level: 80 },
  { name: 'Vulnerability Assessment', level: 78 },
  { name: 'Threat Hunting & Detection', level: 75 },
  { name: 'Penetration Testing Basics', level: 72 },
  { name: 'Security Compliance Frameworks', level: 70 },
]

const SOFT_SKILLS = [
  { name: 'Attention to Detail', description: 'Security breaches hide in log lines. Notice patterns, anomalies, and subtle signals. The best security analysts spot what everyone else missed.' },
  { name: 'Incident Response Mindset', description: 'Stay calm under pressure. When a breach is live, you must think clearly, communicate effectively, and act decisively. Panic spreads; clarity saves organizations.' },
  { name: 'Communication & Documentation', description: 'Translate technical findings into business language for executives. Write clear incident reports and security policies that teams actually follow.' },
  { name: 'Continuous Learning', description: 'Threats evolve daily. The attacker techniques that work today are tomorrow\'s defenses. Great security analysts stay obsessed with learning new threats and techniques.' },
  { name: 'Threat Intelligence Mindset', description: 'Think like an attacker. Understand adversary tactics, techniques, and procedures (TTPs). This mindset helps you predict attacks before they happen.' },
  { name: 'Collaboration & Team Work', description: 'Security is not a solo sport. Work effectively with engineers, network team, and business units. Isolation creates blind spots; collaboration prevents breaches.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'Computer Science / Cybersecurity Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(220,38,38,0.2)', bgColor: '#fef5f5', typeBg: 'rgba(220,38,38,0.12)', typeColor: '#dc2626',
    pros: ['Deep cybersecurity theory and CS fundamentals', 'Highly respected by enterprise employers', 'Access to lab environments and research', 'Strong peer network of future security pros'],
    cons: ['Slow path to first security job', 'Labs don\'t match real-world tools', 'Expensive and time-consuming', 'Practical hands-on experience limited'],
  },
  {
    type: 'Bootcamp', title: 'Cybersecurity Bootcamp', duration: '3–6 months', cost: 'R70k – R150k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Fast path to SOC analyst ready skills', 'Hands-on lab environments and tools', 'Job placement assistance and networking', 'Industry-relevant curriculum'],
    cons: ['Variable program quality — research carefully', 'Limited depth on CS fundamentals', 'Requires prior IT/networking knowledge often', 'Bootcamp credential alone may not suffice'],
  },
  {
    type: 'Certifications', title: 'Security+ & Specialisation Certs', duration: '6–18 months', cost: 'R15k – R40k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['Industry-recognized credentials', 'Study while working — flexible timeline', 'Cost-effective path to credibility', 'Build specific specialisations (CEH, OSCP)'],
    cons: ['Requires strong self-discipline', 'No guaranteed job placement', 'Credentials don\'t replace experience', 'Labs can be expensive ($100-500/month)'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'SOC Standup & Shift Briefing', desc: 'Review overnight alerts, ongoing incidents, and threat intelligence updates. Get briefed on active threats.', duration: '30 min', icon: <Shield size={14} /> },
  { time: '9:30', act: 'Threat Detection & Monitoring', desc: 'Monitor SIEM dashboards, review alerts, analyse suspicious activity, and triage events for escalation.', duration: '2.5 hrs', icon: <Eye size={14} /> },
  { time: '12:00', act: 'Incident Investigation', desc: 'Deep dive into suspected threats — pull logs, analyse binaries, trace attack chains, and build evidence.', duration: '1 hr', icon: <Code size={14} /> },
  { time: '1:00', act: 'Lunch & Mental Break', desc: 'Step away. Incident response is mentally taxing. Clear your head before the afternoon shift.', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'Documentation & Communication', desc: 'Write incident reports, document findings, communicate with stakeholders, and update ticketing systems.', duration: '1 hr', icon: <FileText size={14} /> },
  { time: '3:00', act: 'Vulnerability Scans & Assessments', desc: 'Run vulnerability scans, review results, prioritise by risk, and communicate findings to engineering teams.', duration: '1.5 hrs', icon: <AlertTriangle size={14} /> },
  { time: '4:30', act: 'Learning & Skill Development', desc: 'Study new threats, take online courses, practise in labs, or read security research and threat reports.', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Splunk / Elastic', cat: 'SIEM' }, { name: 'Nessus / Qualys', cat: 'Vuln Scanning' },
  { name: 'Wireshark', cat: 'Network Analysis' }, { name: 'Linux / Windows', cat: 'OS' },
  { name: 'Burp Suite', cat: 'Web Security' }, { name: 'Metasploit', cat: 'Pen Testing' },
  { name: 'Virustotal / Reputation', cat: 'Threat Intel' }, { name: 'OSINT Tools', cat: 'Investigation' },
]

const WORK_ENVS = [
  { type: 'Remote / Hybrid', pct: 45 },
  { type: 'On-Site SOC', pct: 40 },
  { type: 'Fully Remote', pct: 15 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Powered Threat Detection', icon: <Sparkles size={20} />,
    desc: 'Machine learning models identify unknown threats and zero-days by detecting anomalies humans would miss. AI analysts reduce false positives by 60%, letting security teams focus on real threats.',
    tools: ['Splunk ML Toolkit', 'Darktrace', 'Vectra AI', 'Microsoft Defender'],
    borderColor: 'rgba(220,38,38,0.18)', bgColor: '#fef5f5', icoBg: 'rgba(220,38,38,0.12)', icoColor: '#dc2626', tagBg: 'rgba(220,38,38,0.1)', tagColor: '#dc2626', titleColor: '#dc2626',
  },
  {
    title: 'AI Incident Response Automation', icon: <Zap size={20} />,
    desc: 'Automated incident response playbooks handle routine attacks (ransomware, credential spraying) instantly. Humans focus on sophisticated, targeted threats. Response time drops from hours to seconds.',
    tools: ['SOAR Platforms', 'Rapid7 InsightConnect', 'Cortex XSOAR', 'Custom Automation'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI-Powered Threat Intelligence', icon: <TrendingUp size={20} />,
    desc: 'AI synthesises thousands of threat reports, code samples, and attack patterns. Analysts get structured intelligence about emerging threats instead of drowning in noise and data.',
    tools: ['ThreatStream', 'Anomali', 'Recorded Future', 'Crowdstrike Intel'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'Cloud Security (AWS, Azure, GCP)', 'Zero Trust Architecture',
  'API Security & Threat Modeling', 'Threat Intelligence & OSINT',
  'Incident Response Automation (SOAR)', 'Supply Chain Security (SBOM)',
]

const PROS = [
  { title: 'Incredibly High Demand', desc: 'Every company needs security. Cybersecurity talent shortage is severe globally. You will have job offers before graduation. Demand vastly exceeds supply.' },
  { title: 'Exceptional Salary & Benefits', desc: 'Senior security analysts earn R1.2M–R2M+. Chief security officers exceed R2.2M. Hazard pay, sign-on bonuses, and stock options are common for experienced talent.' },
  { title: 'Meaningful Work', desc: 'You protect millions of users\' data and privacy. Preventing a breach saves companies millions and protects real people. That impact is tangible and immediate.' },
  { title: 'Always Learning', desc: 'Threats evolve daily. New attack techniques, new tools, new defences. Boredom is impossible. You stay sharp indefinitely or you fall behind fast.' },
  { title: 'Remote Work Opportunity', desc: '45% of security roles are remote. SOC work especially is remote-friendly. You can monitor threats from anywhere with secure access.' },
  { title: 'Career Specialisation Options', desc: 'Choose your focus: incident response, threat hunting, penetration testing, cloud security, compliance, or governance. Deep specialisation builds premium expertise.' },
]

const CONS = [
  { title: 'High Stress & On-Call Rotations', desc: 'When a breach happens at 3am, you are on-call. Live incident response is high-stress. The pressure of protecting critical systems affects work-life balance.' },
  { title: 'Burnout & Alert Fatigue', desc: 'SOC work generates thousands of alerts daily. Burnout is common. The false positive ratio in many early-career roles is crushing. Persistence is essential.' },
  { title: 'Technical Knowledge Ceiling', desc: 'Security requires understanding networks, systems, applications, and code. The depth is massive. You will regularly encounter threats you don\'t fully understand.' },
  { title: 'Certification Treadmill', desc: 'The industry expects continuous certifications: Security+, CEH, CISSP, OSCP. Staying current requires investment in time and money continuously.' },
  { title: 'Adversarial Asymmetry', desc: 'Attackers only need to find one vulnerability. Defenders must patch everything. The game is asymmetrical — it\'s exhausting to always play catch-up.' },
  { title: 'Imposter Syndrome is Real', desc: 'Security feels impossibly broad. There is always more to learn. Even experienced analysts feel like frauds sometimes. Confidence takes years to build.' },
]

const VIDEOS = [
  { id: 'p2OQ4fNxb5I', title: 'Cybersecurity Career Roadmap 2025', desc: 'Step-by-step guide to becoming a cybersecurity analyst — certifications, skills, jobs, and realistic timeline from zero to first role.', dur: '18:45', channel: 'NetworkChuck' },
  { id: 'dv_dVSxN2cs', title: 'Security Analyst Day in the Life', desc: 'Real SOC analyst shares what 24 hours monitoring threats looks like — tools, alerts, incident response, and the reality of security work.', dur: '14:32', channel: 'Cybersec Academy' },
  { id: 'TyS5Z5qn_3A', title: 'CompTIA Security+ Full Course', desc: 'Complete Security+ exam prep covering all domains — cryptography, authentication, attacks, incident response, and governance fundamentals.', dur: '16:08:00', channel: 'Professor Messer' },
]

const TAKEAWAYS = [
  'Start with networking and OS fundamentals before jumping into advanced security tools',
  'Get Security+ certified early — it\'s the industry baseline and opens doors immediately',
  'Build hands-on lab experience with SIEM tools, vulnerability scanners, and penetration testing',
  'Join a Security Operations Center (SOC) as your first role — it teaches you incident response at scale',
  'Stay obsessed with threat intelligence — understand what attackers are doing right now',
]

const CAREER_FACTS = [
  {
    icon: <Lock size={20} />, title: 'What You Protect',
    desc: 'User data, intellectual property, critical infrastructure, financial systems, healthcare records, and personal privacy. You prevent breaches that cost companies millions and harm millions of users.',
    color: '#dc2626',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Monitor logs and alerts, investigate incidents, analyse threats, assess vulnerabilities, conduct penetration tests, build security architecture, enforce policies, and respond to breaches.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'System administrators, network engineers, developers, incident response teams, law enforcement (on breaches), compliance officers, executives, and sometimes external security consultants.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'Severe talent shortage. Cybersecurity job openings exceed qualified candidates by 3:1 globally. Demand grows 13% annually. Every company that operates needs security professionals now.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🛡️', title: 'Protect Real People', desc: 'Every breach affects millions. Your work prevents identity theft, privacy invasion, and financial harm to real people. That impact is profound and immediate.' },
  { emoji: '💰', title: 'Exceptional Earning Potential', desc: 'Senior security analysts earn R1.2M–R2M+. CSOs exceed R2.2M. Security talent is scarce. You control your compensation by building expertise.' },
  { emoji: '🚀', title: 'Explosive Job Market', desc: 'Cybersecurity talent shortage is severe. You will have 5+ job offers before graduation. Job security is unparalleled. Ever.' },
  { emoji: '🧠', title: 'Intellectual Challenge', desc: 'Security is chess against intelligent adversaries. Every threat is unique. Problem-solving is deep and satisfying. The challenge never ends.' },
  { emoji: '🌍', title: 'Work Across Every Industry', desc: 'Healthcare systems, financial services, critical infrastructure, Fortune 500s, startups — every industry desperately needs security. Career flexibility is enormous.' },
  { emoji: '🔬', title: 'Cutting-Edge Technology', desc: 'Machine learning, zero trust, cloud security, threat intelligence — you work with bleeding-edge technology shaping the future of digital security globally.' },
]

const FREE_RESOURCES = [
  { category: 'Certifications', color: '#dc2626', bgColor: '#fef5f5', items: [
    { name: 'Professor Messer Security+ Course', url: '#', type: 'Course', rating: 5 },
    { name: 'Andrew Ramdayal Cybersecurity Fundamentals', url: '#', type: 'Course', rating: 5 },
    { name: 'TryHackMe (hands-on labs & challenges)', url: '#', type: 'Labs', rating: 5 },
    { name: 'HackTheBox (penetration testing practice)', url: '#', type: 'Labs', rating: 5 },
  ]},
  { category: 'Practice & Tools', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'OWASP Top 10 Web Security', url: '#', type: 'Reference', rating: 5 },
    { name: 'Splunk Free Edition (hands-on SIEM)', url: '#', type: 'Tool', rating: 4 },
    { name: 'Wireshark & tcpdump (packet analysis)', url: '#', type: 'Tool', rating: 5 },
    { name: 'VirusTotal (malware analysis)', url: '#', type: 'Tool', rating: 5 },
  ]},
  { category: 'Community & Intel', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'SecurityWeekly Podcast', url: '#', type: 'Podcast', rating: 5 },
    { name: 'r/cybersecurity & r/Malware', url: '#', type: 'Forum', rating: 4 },
    { name: 'MITRE ATT&CK Framework', url: '#', type: 'Reference', rating: 5 },
    { name: 'Krebs on Security Blog', url: '#', type: 'Blog', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Security Analyst', range: 'R340k – R560k', midpoint: 450, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Security Analyst', range: 'R680k – R1.2M', midpoint: 940, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Security Analyst', range: 'R1.2M – R2M', midpoint: 1600, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Chief Security Officer', range: 'R2.2M – R4M+', midpoint: 3000, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Jumping to Advanced Topics Without Fundamentals',
    desc: 'Learning malware analysis before understanding networking and OS administration. Advanced security only makes sense with solid fundamentals. Build the foundation first.',
    fix: 'Start with CompTIA A+, Network+, then Security+. Fundamentals compound. Don\'t skip.',
  },
  {
    num: '02', title: 'No Hands-On Lab Experience',
    desc: 'Certifications without labs mean you can pass exams but can\'t use a SIEM or run a scan in a real environment. Theory without practice is useless in security.',
    fix: 'Use TryHackMe, HackTheBox, and set up your own lab environment. Learn by doing.',
  },
  {
    num: '03', title: 'Avoiding Scripting & Programming',
    desc: 'Security increasingly requires scripting (Bash, Python) for automation and investigation. Avoiding it limits your growth and earning potential significantly.',
    fix: 'Learn Python basics and Bash scripting. Write small security automation scripts gradually.',
  },
  {
    num: '04', title: 'Not Following Threat Intelligence',
    desc: 'Missing what attackers are doing right now. If you don\'t know about the latest CVEs, malware, and campaigns, you can\'t defend against them.',
    fix: 'Subscribe to threat feeds, read security blogs daily, follow researchers on social media. Stay current.',
  },
  {
    num: '05', title: 'Building a Portfolio Without Demo Ability',
    desc: 'Certifications alone don\'t get you hired. You need to demonstrate skills by discussing incident response, explaining security architecture, or showing lab work in interviews.',
    fix: 'Be ready to discuss a threat you detected, an incident you responded to, or a vulnerability you assessed. Have stories.',
  },
  {
    num: '06', title: 'Burnout from Alert Fatigue',
    desc: 'Starting in a toxic SOC with 50,000 daily alerts destroys your motivation. Not all SOCs are equal. Some are designed to fail analysts.',
    fix: 'When evaluating SOC jobs, ask about false positive rates, alert volume, and team size. Quality of first role matters.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'IT Support / System Administrator',
    ease: 'Very Easy', easeColor: '#dc2626', easeBg: '#fef5f5',
    desc: 'You understand systems, networks, and administration deeply. Adding security perspective and threat knowledge is a natural progression with minimal reskilling.',
    steps: ['Get Security+ certified', 'Study incident response basics', 'Move to SOC analyst role in your company', 'Specialise in threat hunting or pen testing'],
  },
  {
    from: 'Network Administrator / Engineer',
    ease: 'Natural Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Network knowledge is invaluable in security. You understand traffic, protocols, and infrastructure. Add security tools, threat analysis, and you bridge the gap quickly.',
    steps: ['Get Security+ and Network+ certifications', 'Learn SIEM tools and log analysis', 'Transition to network security or threat detection role', 'Target CDN, DDoS, or network security positions'],
  },
  {
    from: 'Software Developer / DevOps',
    ease: 'Strong Foundation', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'Your code knowledge is rare in security. You can secure code better than most. Application security (AppSec) and DevSecOps are natural fits needing your skills.',
    steps: ['Learn OWASP Top 10 and secure coding', 'Get Security+ if you lack fundamentals', 'Build web application security skills', 'Target AppSec or DevSecOps roles'],
  },
  {
    from: 'Other Technical Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Any technical foundation (databases, storage, infrastructure) provides a head start. Security builds on technical knowledge. Pivot by adding security certifications gradually.',
    steps: ['Start with CompTIA Security+ fundamentals', 'Choose your specialisation (SOC, pen testing, compliance)', 'Build hands-on experience in labs', 'Apply to entry-level security roles'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Fundamentals & Certifications', color: '#dc2626', bg: '#fef5f5', days: [
    { day: 'Day 1–2', task: 'Set up lab environment. Install VirtualBox and create Linux/Windows VMs for practice.' },
    { day: 'Day 3–4', task: 'Network fundamentals: OSI model, TCP/IP, DNS, HTTP/HTTPS, common ports and protocols.' },
    { day: 'Day 5–6', task: 'Start Security+ study: authentication, encryption, risk management, and security controls.' },
    { day: 'Day 7', task: 'Practice Security+ practice questions (aim for 80%+). Identify weak areas to focus on.' },
  ]},
  { week: 'Week 2', theme: 'Hands-On Tools & Detection', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Network analysis: Learn Wireshark. Capture and analyse network traffic. Spot anomalies.' },
    { day: 'Day 10–11', task: 'Vulnerability scanning: Use Nessus or OpenVAS. Run scans on your lab VMs. Understand CVE ratings.' },
    { day: 'Day 12–13', task: 'Log analysis basics: Set up Splunk Free Edition. Ingest logs. Write basic search queries.' },
    { day: 'Day 14', task: 'Build your first detection rule in Splunk to spot suspicious activity pattern.' },
  ]},
  { week: 'Week 3', theme: 'Incident Response & Threat Hunting', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Incident response fundamentals: Study response playbooks and the attack lifecycle (MITRE ATT&CK).' },
    { day: 'Day 17–18', task: 'Malware analysis basics: Use VirusTotal, Hybrid Analysis, and ANY.RUN to analyse a suspicious file.' },
    { day: 'Day 19–20', task: 'Threat hunting practice: Use TryHackMe or HackTheBox. Hunt for simulated threats in logs.' },
    { day: 'Day 21', task: 'Document a full incident response scenario: detection, investigation, containment, recovery.' },
  ]},
  { week: 'Week 4', theme: 'Specialisation & Preparation', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Take full Security+ practice exam (aim 750+/900). Review all weak domains thoroughly.' },
    { day: 'Day 25–26', task: 'Join a CTF (Capture The Flag) competition or complete HackTheBox machines to challenge yourself.' },
    { day: 'Day 27–28', task: 'Build a security portfolio: document your lab findings, analysis, and incident responses.' },
    { day: 'Day 29–30', task: 'Apply for Junior Security Analyst roles. Update LinkedIn. Schedule informational interviews with SOC analysts.' },
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
      try { await navigator.share({ title: 'Cybersecurity Analyst Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Cybersecurity Analyst in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/cybersecurity-analyst'}</span>
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
export default function CybersecurityAnalystRoadmapPage() {
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
            src="https://i.imgur.com/EugLmwg.jpeg"
            alt="Cybersecurity Analyst workspace"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Shield size={12} /> Security & Defense
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Cybersecurity Analyst
              </h1>
              <span className="block font-normal mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', color: C.textMuted }}>
                Career Roadmap 2026
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><Clock size={14} style={{ color: C.textFaint }} /> 19 min read</div>
                <div className="flex items-center gap-1.5 text-sm" style={{ color: C.textMuted }}><BookOpen size={14} style={{ color: C.textFaint }} /> 16 sections</div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-8 pt-6 pb-16">
          <p className="text-base leading-relaxed" style={{ color: '#4b5563', maxWidth: 560, marginLeft: 140 }}>
            Defend organisations against cyber threats. Cybersecurity analysts detect attacks, respond to incidents, and build defences that protect millions of users. You are on the front line of digital security.
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Cybersecurity Analysis" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#fef5f5', borderColor: 'rgba(220,38,38,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Cybersecurity Analyst</strong> defends organisations against cyber threats. Monitor logs and alerts for attacks, investigate suspicious activity, assess systems for vulnerabilities, and respond to security incidents. From detection to containment to recovery — you protect critical assets and user data from adversaries working 24/7 to breach systems.
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
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Cybersecurity could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Cybersecurity Analyst workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.3)'; (e.currentTarget as HTMLElement).style.background = '#fef5f5' }}
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
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → Chief Security Officer</span></div>
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
              const icons = ['🌐', '🔐', '📊', '🚨', '🔍', '📋']
              const accentColors = ['#dc2626', '#16a34a', '#dc2626', '#16a34a', '#dc2626', '#16a34a']
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.indigo} 100%)`, boxShadow: '0 8px 48px rgba(220,38,38,0.25)' }}>
              <div className="text-4xl mb-3">🛡️</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>12–18 months · Hands-on labs · Real threat detection skills</div>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Cybersecurity in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#fef5f5', borderColor: 'rgba(220,38,38,0.2)', color: C.textMuted }}>
              AI is revolutionising security — machine learning detects unknown attacks, automation responds to threats instantly, and AI synthesises threat intelligence. Analysts using AI tools detect breaches 70% faster and reduce false positives 60%. AI augments human analysts, not replaces them.
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially for senior and CSO roles — can pay 2–5× these figures in USD.</p>
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
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 3000) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#fef5f5', borderColor: 'rgba(220,38,38,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> Security talent shortage means aggressive compensation. Negotiate hard. Remote global roles pay 3–5× more. Geographic arbitrage is real in cybersecurity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring defenders" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into cybersecurity from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Cybersecurity" iconBg={C.redLight} iconColor={C.red} />
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
                Cybersecurity is on the front line of the digital world. Every organisation is under attack. The skills you build defend millions of users, protect critical infrastructure, and prevent massive financial loss. Your work has profound real-world impact every single day.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The path to a security job requires hands-on lab experience, industry certifications, and genuine curiosity about how attacks work. You cannot learn this from videos alone. Get your hands dirty in labs, break things on purpose, understand how breaches happen, then build the defences to prevent them.
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
        <div className="relative overflow-hidden rounded-3xl px-12 py-16 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.indigo} 100%)` }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: 'rgba(255,255,255,0.05)', top: -120, right: -80 }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Rocket size={30} style={{ color: '#fff' }} />
          </div>
          <h2 className="font-extrabold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
            Ready to Defend the Digital World?
          </h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>
            You have the roadmap. You have the labs. You have the resources. All that's left is to start your hands-on learning journey and build real security expertise.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              Get Career Advice
            </a>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start learning today. The world needs more defenders.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}
