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
  Layers, Globe, Layout,
  Terminal,
  Workflow,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const C = {
  bg: '#ffffff',
  bgAlt: '#f8f9ff',
  bgCard: '#ffffff',
  border: 'rgba(0,0,0,0.07)',
  text: '#0f172a',
  textMuted: '#64748b',
  textFaint: '#94a3b8',
  primary: '#0f766e',
  primaryLight: 'rgba(15,118,110,0.08)',
  primaryMid: 'rgba(15,118,110,0.15)',
  violet: '#7c3aed',
  violetLight: 'rgba(124,58,237,0.08)',
  green: '#16a34a',
  greenLight: 'rgba(22,163,74,0.08)',
  red: '#dc2626',
  redLight: 'rgba(220,38,38,0.08)',
  orange: '#ea580c',
  orangeLight: 'rgba(234,88,12,0.08)',
  indigo: '#0891b2',
  indigoLight: 'rgba(8,145,178,0.08)',
  cyan: '#0891b2',
  cyanLight: 'rgba(8,145,178,0.08)',
}

const CAREER_LEVELS = [
  {
    level: 'Junior', title: 'Junior Network Eng', duration: '0–2 yrs', salary: 'R280k–R480k',
    description: 'Configure and troubleshoot basic LAN/WAN infrastructure, manage switches and routers, assist with network monitoring and helpdesk escalations under senior guidance.',
    skills: ['TCP/IP', 'Cisco IOS', 'VLANs', 'Network+'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Network Engineer', duration: '2–5 yrs', salary: 'R550k–R950k',
    description: 'Design and implement enterprise networks, configure BGP/OSPF routing, manage firewalls and VPNs, and own network security policies across the organisation.',
    skills: ['BGP/OSPF', 'Firewalls', 'SD-WAN', 'CCNP'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Network Eng', duration: '5–8 yrs', salary: 'R950k–R1.6M',
    description: 'Architect multi-site enterprise networks, lead cloud networking migrations, define security standards, and mentor junior engineers through complex deployments.',
    skills: ['Cloud Networking', 'Zero Trust', 'Architecture', 'Mentoring'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Expert', title: 'Principal / Architect', duration: '8+ yrs', salary: 'R1.8M+',
    description: 'Define enterprise network strategy, drive vendor relationships, lead SD-WAN and SASE transformations, and solve the most complex multi-cloud networking challenges.',
    skills: ['SASE/SSE', 'Network Strategy', 'Multi-cloud', 'Leadership'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Networking Fundamentals & OSI Model',
    description: 'Master the OSI and TCP/IP models layer by layer. Understand IP addressing, subnetting (CIDR), ARP, DNS, DHCP, and the flow of a packet from source to destination. This is the foundation everything else is built on.',
    duration: '2–3 months', skills: ['OSI Model', 'TCP/IP Stack', 'IP Subnetting', 'DNS & DHCP'],
  },
  {
    step: 2, title: 'Switching, VLANs & Spanning Tree',
    description: 'Learn Layer 2 switching: MAC address tables, VLAN segmentation, inter-VLAN routing, 802.1Q trunking, and Spanning Tree Protocol. Configure Cisco Catalyst and Juniper switches in real or simulated labs.',
    duration: '2–3 months', skills: ['VLANs & Trunking', 'STP / RSTP', 'EtherChannel', 'Cisco IOS'],
  },
  {
    step: 3, title: 'Routing Protocols — Static, OSPF & BGP',
    description: 'Move from static routes to dynamic routing. Implement OSPF for enterprise internal routing, and BGP for inter-AS communication. Understand route redistribution, path selection, and route summarisation.',
    duration: '2–3 months', skills: ['Static Routing', 'OSPF', 'BGP', 'Route Redistribution'],
  },
  {
    step: 4, title: 'Network Security — Firewalls, VPNs & ACLs',
    description: 'Implement perimeter and microsegmentation security using ACLs, zone-based firewalls, IPSec VPNs, SSL VPNs, and NAT. Understand firewall policy design and network threat models.',
    duration: '2–3 months', skills: ['ACLs', 'IPSec VPN', 'Palo Alto / FortiGate', 'NAT'],
  },
  {
    step: 5, title: 'Cloud Networking — AWS, Azure & GCP',
    description: 'Extend networking skills to the cloud. Configure VPCs, subnets, route tables, transit gateways, VPN connections, and Direct Connect/ExpressRoute. Understand hybrid connectivity patterns.',
    duration: '2–3 months', skills: ['AWS VPC', 'Azure vNet', 'Transit Gateway', 'ExpressRoute'],
  },
  {
    step: 6, title: 'Automation, SD-WAN & Network Programmability',
    description: 'The future of networking is code-driven. Learn Python for network automation (Netmiko, NAPALM, Nornir), Ansible for configuration management, and SD-WAN platforms (Cisco Viptela, Velocloud). Understand REST APIs for network devices.',
    duration: '3–4 months', skills: ['Python / Netmiko', 'Ansible', 'SD-WAN', 'REST APIs'],
  },
]

const HARD_SKILLS = [
  { name: 'TCP/IP & Subnetting', level: 97 },
  { name: 'Cisco IOS / NX-OS', level: 90 },
  { name: 'OSPF & BGP Routing', level: 88 },
  { name: 'Firewalls & VPN', level: 85 },
  { name: 'Cloud Networking (AWS/Azure)', level: 78 },
  { name: 'SD-WAN', level: 72 },
  { name: 'Network Automation (Python)', level: 68 },
  { name: 'Zero Trust Architecture', level: 60 },
]

const SOFT_SKILLS = [
  { name: 'Systematic Troubleshooting', description: 'Network issues require a methodical, layer-by-layer approach. Great network engineers isolate problems fast, starting at Layer 1 and working up — never guessing, always measuring.' },
  { name: 'Documentation Discipline', description: 'Every network change must be documented before and after. A network that only lives in one engineer\'s head is a liability. Diagrams, runbooks, and change logs are as important as the config itself.' },
  { name: 'Change Management Mindset', description: 'Production networks touch everything. A misconfigured BGP peer can take down the internet for thousands of users. Network engineers develop a careful, deliberate approach to every change.' },
  { name: 'Security-First Thinking', description: 'Every port opened, every ACL created, every VPN configured is a potential attack surface. Great network engineers think adversarially and design networks that assume breach.' },
  { name: 'Incident Response Calm', description: 'Network outages are high-pressure, high-visibility events. The ability to diagnose and restore connectivity methodically while communicating clearly to stakeholders is a career-defining skill.' },
  { name: 'Vendor Communication', description: 'Network engineers work with Cisco, Palo Alto, Fortinet, and cloud vendors daily. Ability to escalate TAC cases effectively and extract useful information from vendor support accelerates resolution dramatically.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'IT / Computer Networks Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(15,118,110,0.2)', bgColor: '#f0fdfa', typeBg: 'rgba(15,118,110,0.12)', typeColor: '#0f766e',
    pros: ['Deep theory: routing, switching, OSI, security', 'High credibility at ISPs and large enterprises', 'Access to internship pipelines and graduate programmes', 'Strong peer network of future engineers'],
    cons: ['Slow and expensive path to first role', 'Lab time often insufficient for practical skill', 'Vendor certifications still expected on top', 'Outdated curriculum in many institutions'],
  },
  {
    type: 'Certifications', title: 'Cisco CCNA → CCNP → CCIE', duration: '1–5 years', cost: 'R30k – R200k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Industry gold standard — CCNA opens doors everywhere', 'Vendor-validated, immediately understood by hiring managers', 'CCIE is one of the most respected credentials in all of tech', 'Structured lab-heavy curriculum builds real skills'],
    cons: ['Expensive exam and lab fees (CCIE lab: R35k+)', 'Require renewal every 3 years', 'Cisco-centric (supplement with Juniper/Palo Alto)', 'Time-intensive alongside full-time work'],
  },
  {
    type: 'Self-Taught', title: 'Labs + Online Courses + Certs', duration: '12–24 months', cost: 'R5k – R30k',
    borderColor: 'rgba(8,145,178,0.2)', bgColor: '#f0f9ff', typeBg: 'rgba(8,145,178,0.12)', typeColor: '#0891b2',
    pros: ['GNS3 / Packet Tracer labs are free and powerful', 'Jeremy\'s IT Labs and CBT Nuggets cover CCNA thoroughly', 'Build portfolio through home lab documentation', 'Combine vendor certs for a comprehensive credential'],
    cons: ['No formal degree credential on CV', 'Requires exceptional self-discipline', 'Easy to skip weak areas (e.g. BGP, security)', 'Home lab hardware costs can add up'],
  },
]

const SCHEDULE = [
  { time: '8:30', act: 'Morning Check & NOC Review', desc: 'Review overnight alerts from network monitoring (PRTG, SolarWinds), check interface errors, and assess any ticket escalations from the NOC', duration: '30 min', icon: <Monitor size={14} /> },
  { time: '9:00', act: 'Change Implementation', desc: 'Execute approved change requests — VLAN additions, BGP policy updates, firewall rule changes — all documented and peer-reviewed before touching production', duration: '2 hrs', icon: <Terminal size={14} /> },
  { time: '11:00', act: 'Incident & Problem Management', desc: 'Diagnose and resolve ongoing network incidents, engage vendor TAC for hardware faults, and document root cause analysis for post-mortems', duration: '1 hr', icon: <AlertTriangle size={14} /> },
  { time: '12:00', act: 'Lunch', desc: 'Step away from the console. Network troubleshooting benefits from fresh eyes — breaks improve problem-solving speed significantly', duration: '1 hr', icon: <Coffee size={14} /> },
  { time: '1:00', act: 'Project & Design Work', desc: 'Capacity planning, network architecture diagrams (draw.io), SD-WAN migration planning, or cloud VPC design for upcoming deployments', duration: '2 hrs', icon: <Layout size={14} /> },
  { time: '3:00', act: 'Automation & Scripting', desc: 'Write Python scripts for config backup, compliance checking, or automated provisioning. Improve Ansible playbooks for standard deployments', duration: '1 hr', icon: <Code size={14} /> },
  { time: '4:00', act: 'Documentation & Study', desc: 'Update network diagrams, write runbooks for new configurations, or study for CCNP/cloud networking certifications', duration: '1 hr', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'GNS3 / EVE-NG', cat: 'Lab Sim' }, { name: 'Wireshark', cat: 'Packet Analysis' },
  { name: 'SolarWinds / PRTG', cat: 'Monitoring' }, { name: 'Cisco DNA Center', cat: 'Mgmt' },
  { name: 'Palo Alto NGFW', cat: 'Security' }, { name: 'draw.io', cat: 'Diagrams' },
  { name: 'Ansible / Nornir', cat: 'Automation' }, { name: 'NetBox', cat: 'IPAM/DCIM' },
]

const WORK_ENVS = [
  { type: 'Hybrid', pct: 48 },
  { type: 'In-Office / On-Site', pct: 38 },
  { type: 'Remote', pct: 14 },
]

const AI_IMPACTS = [
  {
    title: 'AI-Driven Network Monitoring', icon: <Sparkles size={20} />,
    desc: 'AI-powered observability platforms now detect anomalies in real-time traffic patterns, predict link failures before they occur, and correlate alerts across hundreds of devices. Network engineers using these tools resolve incidents 40% faster.',
    tools: ['Cisco ThousandEyes', 'Darktrace', 'Kentik', 'SolarWinds AI'],
    borderColor: 'rgba(15,118,110,0.18)', bgColor: '#f0fdfa', icoBg: 'rgba(15,118,110,0.12)', icoColor: '#0f766e', tagBg: 'rgba(15,118,110,0.1)', tagColor: '#0f766e', titleColor: '#0f766e',
  },
  {
    title: 'Network Automation & Intent-Based Networking', icon: <Zap size={20} />,
    desc: 'Network engineers who can write Python automation, use Ansible for config management, and work with Cisco DNA Center\'s intent-based APIs are in a completely different demand tier in 2026 than those who configure manually.',
    tools: ['Python / Netmiko', 'Ansible', 'Cisco DNA Center', 'Terraform'],
    borderColor: 'rgba(8,145,178,0.18)', bgColor: '#f0f9ff', icoBg: 'rgba(8,145,178,0.12)', icoColor: '#0891b2', tagBg: 'rgba(8,145,178,0.1)', tagColor: '#0891b2', titleColor: '#0891b2',
  },
  {
    title: 'AI-Assisted Troubleshooting', icon: <TrendingUp size={20} />,
    desc: 'Large language models integrated into network management platforms now suggest probable root causes, recommend configuration fixes, and generate runbook steps. Network engineers who use these tools effectively multiply their throughput.',
    tools: ['Cisco AI Assistant', 'Juniper Mist AI', 'ChatOps Bots', 'Claude API'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'SASE (Secure Access Service Edge)', 'Zero Trust Network Access (ZTNA)',
  'Network as Code (IaC)', 'Cloud-native SD-WAN',
  'IPv6 Enterprise Deployment', 'eBPF for Network Observability',
]

const PROS = [
  { title: 'Essential Infrastructure Role', desc: 'Without the network, nothing works. Network engineers keep hospitals, banks, manufacturers, and every other organisation online. The role is foundational and non-negotiable.' },
  { title: 'Strong and Stable Salaries', desc: 'Senior network engineers in South Africa earn R950k–R1.6M. Cloud networking and security specialists command significant premiums in all markets.' },
  { title: 'Clear Certification Roadmap', desc: 'CCNA → CCNP → CCIE is one of the most well-defined, respected credential paths in all of technology. Each step unlocks a higher salary band.' },
  { title: 'Expanding into Cloud & Security', desc: 'Network engineering now overlaps deeply with cloud infrastructure and cybersecurity — two of the fastest-growing sectors in tech. Skills multiply in value.' },
  { title: 'Global Demand, Global Portability', desc: 'Network engineering skills are genuinely portable across industries and geographies. A CCIE can walk into a role in Singapore, London, or Johannesburg.' },
  { title: 'Intellectual Variety', desc: 'No two network environments are alike. Troubleshooting complex routing issues, designing redundant WAN architectures, and automating config management provide genuine intellectual variety.' },
]

const CONS = [
  { title: 'On-Call and After-Hours Incidents', desc: 'Network outages don\'t wait for business hours. Senior network engineers are frequently on-call for production incidents that require immediate response, including nights and weekends.' },
  { title: 'Vendor Lock-In Complexity', desc: 'Enterprise networks span Cisco, Juniper, Palo Alto, Fortinet, and cloud vendors simultaneously. Managing multi-vendor complexity — and staying current — requires constant learning.' },
  { title: 'Physical Infrastructure Dependency', desc: 'Unlike software roles, networking often requires physical data centre presence for hardware installation, cabling, and hands-on troubleshooting — limiting full remote flexibility.' },
  { title: 'Certification Cost and Churn', desc: 'Cisco certifications expire every three years. Keeping CCNP/CCIE current requires ongoing exam fees, lab time, and continuing education investment.' },
  { title: 'Slow Enterprise Change Cycles', desc: 'Enterprise network changes go through rigorous change management processes. Engineers who want to ship fast find the approval, testing, and maintenance windows of enterprise networking frustratingly slow.' },
  { title: 'Security Responsibility Weight', desc: 'The network perimeter is the first and last line of defence. A misconfigured firewall or VPN can expose the entire organisation. This responsibility is significant and constant.' },
]

const VIDEOS = [
  { id: 'qiQR5rTSshw', title: 'Computer Networking Full Course', desc: 'Comprehensive introduction to networking fundamentals — OSI model, TCP/IP, DNS, DHCP, routing, switching, and security from the ground up.', dur: '9:08:31', channel: 'freeCodeCamp' },
  { id: 'IPvYjXa1-Yg', title: 'CCNA Full Course 2025', desc: 'Complete CCNA exam preparation covering everything from subnetting to OSPF, VLANs, ACLs, and network security concepts.', dur: '13:26:42', channel: 'Jeremy\'s IT Lab' },
  { id: 'AYAh6YDXuho', title: 'BGP for Beginners — Complete Tutorial', desc: 'Master Border Gateway Protocol from first principles through advanced path selection and enterprise BGP design.', dur: '2:14:05', channel: 'Network Direction' },
]

const TAKEAWAYS = [
  'Lab everything before touching production — GNS3 and Packet Tracer exist so that production never becomes your learning environment',
  'Get your CCNA first — it is the most universally respected entry credential in networking and opens every door',
  'Learn Python for network automation early — manual CLI-only engineers are being replaced by those who can script at scale',
  'Document every change, every topology, every IP address — undocumented networks are technical debt that compounds silently',
  'Study cloud networking alongside on-premise — the enterprise network now extends into AWS and Azure and you must follow it there',
]

const CAREER_FACTS = [
  {
    icon: <Globe size={20} />, title: 'What You Build & Maintain',
    desc: 'Enterprise LAN/WAN infrastructure, data centre fabrics, cloud VPCs, SD-WAN overlays, VPN tunnels, network security policies, and the monitoring systems that keep all of it visible.',
    color: '#0f766e',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Network design, routing protocol configuration, firewall policy management, VPN deployment, capacity planning, performance troubleshooting, cloud connectivity, and automation scripting.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Security teams auditing your firewall policies, cloud architects designing hybrid connectivity, systems administrators depending on your infrastructure, and vendors supporting your hardware.',
    color: '#0891b2',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'Network engineers are in sustained global demand. Cloud adoption, SD-WAN migration, and zero-trust security initiatives are driving demand significantly above baseline — especially for engineers who bridge on-premise and cloud.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🌐', title: 'You Keep Everything Connected', desc: 'When the network is down, everything is down. Network engineers are the reason hospitals, banks, schools, and businesses stay operational. The criticality of this role is hard to overstate.' },
  { emoji: '💰', title: 'Excellent Salaries With Clear Steps', desc: 'CCNA → CCNP → CCIE is a straightforward path to R1.5M+ earnings. Each certification is a validated, immediate salary step-up that hiring managers universally respect.' },
  { emoji: '🏢', title: 'Every Industry Needs You', desc: 'Finance, healthcare, manufacturing, government, cloud providers — every organisation with more than 10 people needs a network. Industry portability is exceptional.' },
  { emoji: '🧩', title: 'Deeply Satisfying Troubleshooting', desc: 'Diagnosing why a BGP session dropped, tracing a packet through 12 hops to find a misconfigured ACL, or watching OSPF converge after a topology change — network puzzles are genuinely satisfying to solve.' },
  { emoji: '☁️', title: 'Cloud Networking Is Exploding', desc: 'AWS, Azure, and GCP need network engineers who understand VPCs, transit gateways, and hybrid connectivity. Cloud network engineers are among the highest-paid specialists in the field.' },
  { emoji: '🔒', title: 'Merging With Cybersecurity', desc: 'Zero trust, SASE, microsegmentation, and network detection & response have made network and security engineering inseparable. Network engineers who add security expertise become exceptionally valuable.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#0f766e', bgColor: '#f0fdfa', items: [
    { name: 'Jeremy\'s IT Labs — Free CCNA Course', url: '#', type: 'Course', rating: 5 },
    { name: 'Professor Messer — CompTIA Network+', url: '#', type: 'Course', rating: 5 },
    { name: 'freeCodeCamp — Computer Networking Full Course', url: '#', type: 'YouTube', rating: 5 },
    { name: 'Cisco NetAcad — CCNA Self-Paced', url: '#', type: 'Course', rating: 4 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'Packet Tracer (free with Cisco NetAcad)', url: '#', type: 'Lab', rating: 5 },
    { name: 'GNS3 — Full Network Emulation (free)', url: '#', type: 'Lab', rating: 5 },
    { name: 'EVE-NG Community Edition', url: '#', type: 'Lab', rating: 4 },
    { name: 'subnettingpractice.com', url: '#', type: 'Practice', rating: 5 },
  ]},
  { category: 'Community', color: '#0891b2', bgColor: '#f0f9ff', items: [
    { name: 'Network Direction YouTube Channel', url: '#', type: 'YouTube', rating: 5 },
    { name: 'r/networking & r/ccna subreddits', url: '#', type: 'Forum', rating: 5 },
    { name: 'Packet Pushers Podcast', url: '#', type: 'Podcast', rating: 5 },
    { name: 'NetworkLessons.com (partially free)', url: '#', type: 'Blog', rating: 4 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Network Engineer', range: 'R280k – R480k', midpoint: 380, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Network Engineer', range: 'R550k – R950k', midpoint: 750, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Network Engineer', range: 'R950k – R1.6M', midpoint: 1275, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Principal / Network Architect', range: 'R1.8M – R3M+', midpoint: 2300, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Skipping Subnetting Mastery',
    desc: 'Engineers who can\'t subnet quickly and accurately struggle with every VLAN design, ACL, and routing task they encounter. This foundational gap never goes away — it only compounds.',
    fix: 'Drill subnetting until it is instant. Use subnettingpractice.com daily for two weeks. No calculator allowed.',
  },
  {
    num: '02', title: 'Never Building a Lab',
    desc: 'Reading about OSPF and BGP without configuring them in a lab produces knowledge that evaporates under interview pressure and fails completely in production.',
    fix: 'Set up GNS3 or Packet Tracer in week one. Every concept must be configured, broken, and fixed before it is truly learned.',
  },
  {
    num: '03', title: 'Ignoring Documentation',
    desc: 'Undocumented networks are a ticking clock. The engineer who knows the topology by memory is not an asset — they are a single point of failure. Poor documentation is unprofessional.',
    fix: 'Document every lab and every configuration change. Build the habit before you touch production systems.',
  },
  {
    num: '04', title: 'Cisco-Only Tunnel Vision',
    desc: 'Enterprise environments use Palo Alto firewalls, Juniper routers, Fortinet VPNs, and AWS VPCs alongside Cisco. Cisco-only engineers hit a ceiling quickly.',
    fix: 'After CCNA, deliberately add a Palo Alto PCNSA or Juniper JNCIA to your stack. Diversify your vendor exposure.',
  },
  {
    num: '05', title: 'Avoiding Automation',
    desc: 'Network engineers who refuse to learn Python or Ansible are building a career on manual CLI work that is increasingly automated. This limits both salary and opportunity.',
    fix: 'Start with simple Python scripts: automate a config backup, then a compliance check. Build from there.',
  },
  {
    num: '06', title: 'No Cloud Networking Knowledge',
    desc: 'Enterprise networks now extend into AWS and Azure. A network engineer who has never configured a VPC, a transit gateway, or a VPN connection to a cloud provider is already behind.',
    fix: 'Get an AWS Cloud Practitioner certification, then configure a VPC with subnets, route tables, and a VPN connection to a simulated on-premise environment.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'IT Helpdesk / Support',
    ease: 'Natural Fit', easeColor: '#0f766e', easeBg: '#f0fdfa',
    desc: 'You already understand infrastructure basics, ticketing systems, and organisational IT environments. Add network fundamentals and earn your CCNA — the transition is highly achievable and common.',
    steps: ['Study subnetting and OSI model thoroughly', 'Earn CompTIA Network+ then CCNA', 'Set up a GNS3 lab and document your configs', 'Apply for junior network engineer or NOC analyst roles'],
  },
  {
    from: 'Systems Administrator',
    ease: 'Strong Fit', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'Sysadmins understand servers, DNS, DHCP, and the operating environment that networks support. Adding switching, routing, and firewall skills makes you an exceptionally well-rounded infrastructure engineer.',
    steps: ['Build on existing DNS/DHCP/firewall knowledge', 'Complete CCNA with focus on routing and switching', 'Add cloud networking (AWS VPC) to your skills', 'Target network-adjacent or infrastructure engineer roles'],
  },
  {
    from: 'Cybersecurity Analyst',
    ease: 'Very Achievable', easeColor: '#0891b2', easeBg: '#f0f9ff',
    desc: 'Security analysts understand threat models, firewall concepts, and network traffic analysis. Adding routing, switching, and network design skills creates a security-networking hybrid that commands premium salaries.',
    steps: ['Learn OSPF, BGP, and VLAN design fundamentals', 'Configure Palo Alto or FortiGate firewalls in a lab', 'Pursue CCNP Security or Palo Alto PCNSE', 'Target network security engineer or SASE architect roles'],
  },
  {
    from: 'Other Background',
    ease: 'Achievable', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Domain knowledge from finance, healthcare, or manufacturing combined with network engineering skills is genuinely rare and valuable. Industry-specific compliance requirements make domain-aware network engineers highly sought-after.',
    steps: ['Start with CompTIA Network+ fundamentals', 'Build a home lab with GNS3 and Packet Tracer', 'Earn CCNA and document everything on GitHub', 'Target companies in your previous industry vertical'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Foundations & Subnetting', color: '#0f766e', bg: '#f0fdfa', days: [
    { day: 'Day 1–2', task: 'Install Packet Tracer (free). Study the OSI model — memorise all 7 layers with their protocols and devices.' },
    { day: 'Day 3–4', task: 'Master IPv4 subnetting: classful, CIDR notation, subnet masks. Practice at subnettingpractice.com until it is fast.' },
    { day: 'Day 5–6', task: 'TCP vs UDP, ports and protocols. Build a packet capture in Wireshark. Understand the 3-way handshake.' },
    { day: 'Day 7', task: 'Configure your first Packet Tracer lab: 2 routers, 2 switches, 4 PCs with static IPs. Ping between all devices.' },
  ]},
  { week: 'Week 2', theme: 'Switching & VLANs', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'Study switch operation: MAC address table, collision domains, broadcast domains. Configure basic switch in Packet Tracer.' },
    { day: 'Day 10–11', task: 'VLANs and 802.1Q trunking. Configure 3 VLANs across 2 switches with trunk port. Verify with show commands.' },
    { day: 'Day 12–13', task: 'Inter-VLAN routing with a Layer 3 switch or router-on-a-stick. Test connectivity between VLANs.' },
    { day: 'Day 14', task: 'Spanning Tree Protocol: understand why it exists, root bridge election, port states. Observe STP convergence.' },
  ]},
  { week: 'Week 3', theme: 'Routing & Security', color: '#0891b2', bg: '#f0f9ff', days: [
    { day: 'Day 15–16', task: 'Static routing: configure routes between 3 routers in Packet Tracer. Understand administrative distance.' },
    { day: 'Day 17–18', task: 'OSPF single-area: configure OSPF between 3 routers. Verify with show ip ospf neighbor and show ip route.' },
    { day: 'Day 19–20', task: 'Standard and extended ACLs: write 5 ACLs blocking specific traffic. Apply them to interfaces and test.' },
    { day: 'Day 21', task: 'NAT configuration: static NAT, dynamic NAT, PAT. Simulate internet access with NAT overload.' },
  ]},
  { week: 'Week 4', theme: 'WAN, Cloud & Study', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Create a free AWS account. Build a VPC with public/private subnets, route table, and internet gateway. Launch an EC2 instance.' },
    { day: 'Day 25–26', task: 'Study DHCP, DNS, and NTP configuration on Cisco IOS. Implement all three in your Packet Tracer lab.' },
    { day: 'Day 27–28', task: 'Write a simple Python script using Netmiko to connect to a router and pull "show version" and "show ip route".' },
    { day: 'Day 29–30', task: 'Register for CCNA exam (or Network+). Update your LinkedIn. Apply to 5 junior network or NOC analyst roles.' },
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

function ShareBar() {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }
  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'Network Engineer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Network Engineer in 2026', url: window.location.href }) }
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/network-engineer'}</span>
      </div>
    </div>
  )
}

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

export default function NetworkEngineerRoadmapPage() {
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

      <Link to="/roadmaps" className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold no-underline transition-all duration-200"
        style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', border: `1px solid ${C.border}`, color: C.textMuted, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <ArrowLeft size={14} /> All Roadmaps
      </Link>

      {/* HERO */}
      <div className="relative w-full" style={{ background: C.bg }}>
        <div className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: 600 }}>
          <img
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80"
            alt="Network Engineer server room cables"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.55) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primary }}>
                <Globe size={12} /> Networking & Infrastructure
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Network Engineer
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
            Build the infrastructure that connects the world. Network engineers design, implement, and secure the routers, switches, firewalls, and cloud networks that make every digital service possible.
          </p>
          <div className="h-px mt-10" style={{ background: C.border }} />
        </div>
      </div>

      {/* TABLE OF CONTENTS */}
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

      {/* WHAT THIS CAREER IS */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={whatRef}>
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Network Engineering" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primary }}>Network Engineer</strong> designs, implements, and maintains the physical and logical infrastructure that carries data across an organisation and the internet. From configuring a BGP peer with an ISP to designing a zero-trust cloud network architecture, network engineers are responsible for the reliability, performance, and security of every connection in the enterprise.
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

      {/* WHY CHOOSE */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={whyRef}>
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Network Engineering could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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

      {/* DAY IN THE LIFE */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={dayRef}>
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Network Engineer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,118,110,0.3)'; (e.currentTarget as HTMLElement).style.background = '#f0fdfa' }}
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

      {/* CAREER TIMELINE */}
      <section ref={tlSectionRef} className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={tlRef}>
            <SectionHeader icon={<Clock size={22} />} title="Career Timeline" subtitle="Time estimates and salary ranges for each level" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="mb-10">
              <div className="flex justify-between text-xs mb-2.5" style={{ color: C.textMuted }}><span>Career Progression</span><span>Junior → Principal Architect</span></div>
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

      {/* ROADMAP */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div ref={stepsRef} className="max-w-2xl mx-auto px-4">
          <SectionHeader icon={<Target size={22} />} title="Step-by-Step Roadmap" subtitle="Your path from complete beginner to job-ready" iconBg={C.primaryLight} iconColor={C.primary} />
          <div className="relative flex flex-col items-center">
            {ROADMAP_STEPS.map((s, i) => {
              const icons = ['🌐', '🔀', '🛣️', '🔒', '☁️', '🤖']
              const accentColors = ['#0f766e', '#16a34a', '#0f766e', '#16a34a', '#0f766e', '#16a34a']
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #0891b2 100%)`, boxShadow: '0 8px 48px rgba(15,118,110,0.25)' }}>
              <div className="text-4xl mb-3">🏆</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>10–14 months · Consistent daily practice · Build and lab real networks</div>
            </div>
          </div>
          <ShareBar />
        </div>
      </section>

      {/* SKILLS */}
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
                        <div className="h-1.5 rounded-full" data-bar-w={s.level} style={{ width: 0, background: `linear-gradient(90deg, ${C.primary}, #0891b2)` }} />
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

      {/* EDUCATION PATHS */}
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

      {/* FREE RESOURCES */}
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

      {/* AI IMPACT */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={aiRef}>
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Network Engineering in 2026" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)', color: C.textMuted }}>
              AI tools don't replace network engineers — they <em style={{ color: C.primary }}>amplify</em> them. Engineers who integrate AI-assisted monitoring, automation, and troubleshooting tools into their workflow resolve incidents faster, find misconfigurations sooner, and design more resilient networks.
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

      {/* PROS & CONS */}
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

      {/* SALARY */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={salaryRef}>
            <SectionHeader icon={<DollarSign size={22} />} title="Salary" subtitle="What you can realistically earn at each stage" iconBg={C.greenLight} iconColor={C.green} />
            <div className="rounded-2xl p-6 mb-6 border" style={{ background: '#f0fdf4', borderColor: 'rgba(22,163,74,0.2)' }}>
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Cloud networking and security-focused roles, especially for global remote contracts, can pay 2–4× these figures in USD.</p>
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
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#f0fdfa', borderColor: 'rgba(15,118,110,0.2)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primary }}>Pro tip:</strong> Network engineers at ISPs, cloud providers, and financial institutions earn 30–50% more than those at IT service companies. Target environments where the network is a revenue-critical asset.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISTAKES */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring network engineers" iconBg={C.orangeLight} iconColor={C.orange} />
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

      {/* CAREER CHANGE */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={changeRef}>
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into network engineering from your current background" iconBg={C.primaryLight} iconColor={C.primary} />
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

      {/* 30-DAY PLAN */}
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

      {/* VIDEOS */}
      <section className="border-b" style={{ ...sectionStyle, background: C.bg }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={vidsRef}>
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Network Engineering" iconBg={C.redLight} iconColor={C.red} />
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

      {/* FINAL THOUGHTS */}
      <section className="border-b" style={{ ...sectionStyle, background: '#f8f9ff' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={finalRef}>
            <SectionHeader icon={<Award size={22} />} title="Final Thoughts" subtitle="What we want you to take away from this guide" iconBg={C.primaryLight} iconColor={C.primary} />
            <div className="rounded-2xl p-6 border mb-8" style={{ background: C.bg, borderColor: C.border }}>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#374151' }}>
                Network engineering is the discipline that <strong style={{ color: C.primary }}>keeps the world connected</strong>. Every call, every transaction, every video stream, every cloud workload — all of it travels over networks that network engineers designed, configured, and secured.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The path requires patience and hands-on lab work, but the fundamentals you build early transfer across every technology generation. An engineer who deeply understands routing, switching, and security never stops being valuable — regardless of whether the network runs on physical hardware or cloud infrastructure.
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

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-8" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="relative overflow-hidden rounded-3xl px-12 py-16 text-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #0891b2 100%)` }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: 'rgba(255,255,255,0.05)', top: -120, right: -80 }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Rocket size={30} style={{ color: '#fff' }} />
          </div>
          <h2 className="font-extrabold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
            Ready to Start Your Journey?
          </h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open Packet Tracer and configure your first network.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: C.primary }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              Get Career Advice
            </a>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Start building today. Your future self will thank you.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}