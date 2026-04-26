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
  Layers, Layout,
  GitBranch, Shield,
  Workflow, Eye,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── COLORS ──────────────────────────────────────────────────────────────── */
const C = {
  bg: '#ffffff',
  bgAlt: '#fffbeb',
  bgCard: '#ffffff',
  border: 'rgba(0,0,0,0.07)',
  text: '#0f172a',
  textMuted: '#64748b',
  textFaint: '#94a3b8',
  primary: '#f59e0b',
  primaryLight: 'rgba(245,158,11,0.08)',
  primaryDark: '#b45309',
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
    level: 'Junior', title: 'Junior Blockchain Dev', duration: '0–2 yrs', salary: 'R320k–R560k',
    description: 'Write and deploy simple smart contracts, learn Solidity fundamentals, audit existing contracts for common vulnerabilities, and contribute to DApp frontends under close mentorship.',
    skills: ['Solidity Basics', 'Ethereum', 'Web3.js', 'Git'],
    accent: '#0891b2', accentBg: 'rgba(8,145,178,0.08)', accentBorder: 'rgba(8,145,178,0.18)',
  },
  {
    level: 'Mid-Level', title: 'Blockchain Developer', duration: '2–5 yrs', salary: 'R620k–R1.1M',
    description: 'Design and audit smart contract systems, build full-stack DApps, integrate oracles and cross-chain bridges, and contribute to protocol-level improvements and tokenomics design.',
    skills: ['Advanced Solidity', 'DeFi Protocols', 'Hardhat/Foundry', 'Testing'],
    accent: '#16a34a', accentBg: 'rgba(22,163,74,0.08)', accentBorder: 'rgba(22,163,74,0.18)',
  },
  {
    level: 'Senior', title: 'Senior Blockchain Dev', duration: '5–8 yrs', salary: 'R1.1M–R2M',
    description: 'Architect decentralised protocol systems, perform formal security audits, mentor developers, design token economies, and drive decisions on consensus mechanism and L2 scaling strategy.',
    skills: ['Protocol Design', 'Security Audits', 'Layer 2 / ZK', 'Mentoring'],
    accent: '#7c3aed', accentBg: 'rgba(124,58,237,0.08)', accentBorder: 'rgba(124,58,237,0.18)',
  },
  {
    level: 'Principal', title: 'Principal Protocol Eng', duration: '8+ yrs', salary: 'R2M+',
    description: 'Define blockchain engineering vision, design novel consensus algorithms, lead cross-chain interoperability projects, publish research, and shape the technical direction of entire Web3 ecosystems.',
    skills: ['Consensus Design', 'Cryptography', 'Research', 'Vision'],
    accent: '#ea580c', accentBg: 'rgba(234,88,12,0.08)', accentBorder: 'rgba(234,88,12,0.18)',
  },
]

const ROADMAP_STEPS = [
  {
    step: 1, title: 'Computer Science & Crypto Fundamentals',
    description: 'Master programming basics in Python or JavaScript, then dive into cryptography essentials — hashing, asymmetric encryption, digital signatures, and Merkle trees. These are the mathematical backbone of every blockchain system.',
    duration: '2–3 months', skills: ['Python / JS', 'Hash Functions', 'Public Key Crypto', 'Merkle Trees'],
  },
  {
    step: 2, title: 'Blockchain Architecture & Ethereum',
    description: 'Understand how blockchains achieve decentralised consensus — PoW, PoS, and BFT variants. Deep dive into Ethereum: accounts, transactions, EVM internals, gas mechanics, and the Ethereum execution layer.',
    duration: '2–3 months', skills: ['Consensus Mechanisms', 'EVM Internals', 'Ethereum Node', 'Gas & Fees'],
  },
  {
    step: 3, title: 'Solidity & Smart Contract Development',
    description: 'Learn Solidity deeply — data types, storage layout, function modifiers, events, inheritance, and interface design. Build, test, and deploy ERC-20 and ERC-721 contracts. Understand common vulnerability patterns like reentrancy and integer overflow.',
    duration: '3–4 months', skills: ['Solidity', 'ERC Standards', 'OpenZeppelin', 'Security Patterns'],
  },
  {
    step: 4, title: 'DApp Development & Web3 Integration',
    description: 'Build full-stack decentralised applications — connect React frontends to smart contracts using ethers.js or viem. Integrate wallets like MetaMask, implement transaction signing, and build intuitive UIs for complex DeFi interactions.',
    duration: '2–3 months', skills: ['ethers.js / viem', 'React + Web3', 'Wallet Integration', 'IPFS'],
  },
  {
    step: 5, title: 'DeFi Protocols & Advanced Patterns',
    description: 'Study the mechanics of real DeFi protocols — AMMs (Uniswap), lending (Aave, Compound), stablecoins (MakerDAO), and yield strategies. Understand flash loans, MEV, liquidity mechanics, and how protocols are economically exploited.',
    duration: '2–3 months', skills: ['AMMs / DEXs', 'Lending Protocols', 'Flash Loans', 'MEV'],
  },
  {
    step: 6, title: 'Security Auditing, Layer 2 & Advanced Chains',
    description: 'Master smart contract security auditing with Slither, Echidna, and Foundry fuzzing. Study Layer 2 scaling — Optimistic Rollups, ZK-Rollups, and State Channels. Explore alternative chains: Solana, Polkadot, and Cosmos IBC.',
    duration: '3–4 months', skills: ['Security Auditing', 'ZK Rollups', 'Foundry Fuzzing', 'Cross-Chain'],
  },
]

const HARD_SKILLS = [
  { name: 'Solidity & Smart Contracts', level: 96 },
  { name: 'Ethereum / EVM Architecture', level: 94 },
  { name: 'DeFi Protocol Design', level: 88 },
  { name: 'Security Auditing', level: 85 },
  { name: 'ethers.js / viem / Web3.js', level: 87 },
  { name: 'Layer 2 & Scaling Solutions', level: 80 },
  { name: 'Testing (Hardhat / Foundry)', level: 83 },
  { name: 'Cryptography Fundamentals', level: 78 },
]

const SOFT_SKILLS = [
  { name: 'Security-First Thinking', description: 'A single smart contract bug can drain millions of dollars instantly. Blockchain developers must be adversarially paranoid — always asking "how could someone exploit this?" before shipping.' },
  { name: 'Economic Reasoning', description: 'Protocol design requires understanding game theory and tokenomics. Great blockchain engineers think like economists — designing incentive structures that remain robust under adversarial conditions.' },
  { name: 'Meticulous Code Review', description: 'Smart contracts are immutable once deployed. Code review in blockchain is not optional — it is the last line of defence between your users and catastrophic, irreversible loss.' },
  { name: 'Research Fluency', description: 'Blockchain moves fast. Reading Ethereum Improvement Proposals (EIPs), academic papers on ZK proofs, and audit reports is part of the daily work. Staying current is a professional requirement.' },
  { name: 'Collaborative Open-Source Culture', description: 'Most of the best blockchain work happens in the open. Contributing to open-source protocols, writing detailed forum proposals, and engaging with DAOs is how you build reputation and influence in this space.' },
  { name: 'Trust Minimisation Mindset', description: 'The best blockchain developers design systems that require users to trust as little as possible. This philosophy shapes every architectural decision — from custody models to oracle design.' },
]

const EDU_PATHS = [
  {
    type: 'Degree', title: 'CS / Maths Degree', duration: '3–4 years', cost: 'R400k – R1M+',
    borderColor: 'rgba(245,158,11,0.2)', bgColor: '#fffbeb', typeBg: 'rgba(245,158,11,0.12)', typeColor: '#b45309',
    pros: ['Deep cryptography & algorithms foundation', 'Research career pathway', 'Recruiter trust for protocol roles', 'Strong peer and academic network'],
    cons: ['Blockchain rarely taught well', 'Slow to reach first job', 'Theory-heavy, practice-light', 'Self-study of Solidity still required'],
  },
  {
    type: 'Bootcamp', title: 'Web3 / Blockchain Bootcamp', duration: '3–6 months', cost: 'R60k – R150k',
    borderColor: 'rgba(22,163,74,0.2)', bgColor: '#f0fdf4', typeBg: 'rgba(22,163,74,0.12)', typeColor: '#16a34a',
    pros: ['Fast path to Solidity proficiency', 'Portfolio of deployed contracts', 'Career support & job placement', 'Strong project-based learning'],
    cons: ['Variable program quality', 'Limited cryptography depth', 'Bear markets reduce job openings', 'Credential not universally valued'],
  },
  {
    type: 'Self-Taught', title: 'Online Courses & Protocols', duration: '12–20 months', cost: 'R0 – R8k',
    borderColor: 'rgba(79,70,229,0.2)', bgColor: '#eef2ff', typeBg: 'rgba(79,70,229,0.12)', typeColor: '#4f46e5',
    pros: ['World-class free resources (CryptoZombies, Alchemy)', 'Build and deploy real contracts', 'Learn by reading protocol source', 'No credential ceiling in Web3'],
    cons: ['Requires extreme self-discipline', 'Easy to miss security fundamentals', 'Portfolio-driven job search', 'Imposter syndrome is common'],
  },
]

const SCHEDULE = [
  { time: '9:00', act: 'Protocol & Security Review', desc: 'Read audit reports, EIPs, and forum discussions. Understand the latest attack vectors and protocol upgrade proposals impacting your work.', duration: '45 min', icon: <Shield size={14} /> },
  { time: '9:45', act: 'Smart Contract Development', desc: 'Deep focus on writing, refactoring, and testing smart contracts in Solidity. Use Foundry or Hardhat for a tight test-driven loop.', duration: '2.5 hrs', icon: <Code size={14} /> },
  { time: '12:15', act: 'Contract Testing & Auditing', desc: 'Write invariant fuzz tests, run Slither static analysis, simulate edge cases, and verify economic assumptions in your protocol.', duration: '1 hr', icon: <Eye size={14} /> },
  { time: '1:15', act: 'Lunch & Clear the Mind', desc: 'Step away. Security thinking requires mental freshness — a rested mind catches reentrancy bugs a tired one misses completely.', duration: '45 min', icon: <Coffee size={14} /> },
  { time: '2:00', act: 'DApp Frontend & Integration', desc: 'Connect contracts to React frontends, integrate wallet providers, handle transaction state, and build intuitive Web3 UIs.', duration: '1.5 hrs', icon: <Layout size={14} /> },
  { time: '3:30', act: 'Code Review & DAO Collaboration', desc: 'Review teammates\' PRs, participate in governance discussions, contribute to open-source protocols, and respond to community audit findings.', duration: '1 hr', icon: <Users size={14} /> },
  { time: '4:30', act: 'Research & Protocol Exploration', desc: 'Read ZK research papers, explore new L2 designs, experiment with novel contract patterns, or write technical blog posts for the community.', duration: '30 min', icon: <BookOpen size={14} /> },
]

const TOOLS = [
  { name: 'Foundry', cat: 'Testing' }, { name: 'Hardhat', cat: 'Dev Env' },
  { name: 'Remix IDE', cat: 'IDE' }, { name: 'Slither', cat: 'Security' },
  { name: 'ethers.js', cat: 'Web3' }, { name: 'OpenZeppelin', cat: 'Libraries' },
  { name: 'The Graph', cat: 'Indexing' }, { name: 'IPFS / Filecoin', cat: 'Storage' },
]

const WORK_ENVS = [
  { type: 'Remote', pct: 72 },
  { type: 'Hybrid', pct: 22 },
  { type: 'In-Office', pct: 6 },
]

const AI_IMPACTS = [
  {
    title: 'AI Contract Auditing', icon: <Shield size={20} />,
    desc: 'AI-powered tools like Certora and CodeHawks AI assist in formal verification and finding vulnerabilities before deployment. Developers can catch 60% of common attack vectors automatically, spending human audit time on business-logic flaws.',
    tools: ['Certora Prover', 'CodeHawks AI', 'Claude', 'GPT-4 Audit'],
    borderColor: 'rgba(245,158,11,0.18)', bgColor: '#fffbeb', icoBg: 'rgba(245,158,11,0.12)', icoColor: '#b45309', tagBg: 'rgba(245,158,11,0.1)', tagColor: '#b45309', titleColor: '#b45309',
  },
  {
    title: 'AI-Driven Protocol Design', icon: <Sparkles size={20} />,
    desc: 'AI tools help model tokenomics, simulate economic attacks, and generate invariant tests for protocol logic. Developers using AI to model incentive structures catch design flaws before any code is written.',
    tools: ['Gauntlet AI', 'Monte Carlo Sim', 'Claude', 'Protocol Sim Tools'],
    borderColor: 'rgba(79,70,229,0.18)', bgColor: '#eef2ff', icoBg: 'rgba(79,70,229,0.12)', icoColor: '#4f46e5', tagBg: 'rgba(79,70,229,0.1)', tagColor: '#4f46e5', titleColor: '#4f46e5',
  },
  {
    title: 'AI Code Generation', icon: <Zap size={20} />,
    desc: 'GitHub Copilot and Claude generate Solidity boilerplate, test scaffolding, and deployment scripts. Blockchain devs using AI assistants reduce repetitive contract coding by 45%, focusing effort on architecture and security.',
    tools: ['GitHub Copilot', 'Claude', 'Cursor', 'Tabnine'],
    borderColor: 'rgba(22,163,74,0.18)', bgColor: '#f0fdf4', icoBg: 'rgba(22,163,74,0.12)', icoColor: '#16a34a', tagBg: 'rgba(22,163,74,0.1)', tagColor: '#16a34a', titleColor: '#16a34a',
  },
]

const FUTURE_SKILLS = [
  'ZK-SNARKs & ZK-STARKs (Circom, Noir)',
  'Account Abstraction (ERC-4337)',
  'Cross-Chain Messaging (LayerZero, Axelar)',
  'Intent-Based Architectures',
  'Formal Verification (Certora, Halmos)',
  'Modular Blockchain Design (EigenLayer)',
]

const PROS = [
  { title: 'Exceptional Compensation', desc: 'Blockchain developers are among the highest-paid engineers globally. Senior Solidity engineers command R1.1M–R2M in South Africa; remote USD roles frequently pay $150k–$400k+. Talent shortage keeps rates high.' },
  { title: 'Fully Remote by Default', desc: 'With 72% of blockchain roles fully remote — the highest of any engineering discipline — your productivity is measured in shipped code and secured protocols, not office attendance.' },
  { title: 'Work at the Frontier', desc: 'You are building infrastructure that did not exist a decade ago. Decentralised finance, self-sovereign identity, and trustless computation are genuinely new categories of software with no historical precedent.' },
  { title: 'Direct Financial Impact', desc: 'Protocols you build can secure billions of dollars and serve millions of users in DeFi. The stakes create intense focus and the satisfaction of knowing your code runs financial infrastructure.' },
  { title: 'Open Source & Reputation', desc: 'The best blockchain work is public. A well-audited smart contract or open-source protocol contribution builds global reputation faster than any closed-source corporate role ever could.' },
  { title: 'Global Community', desc: 'Hackathons, DAOs, and open governance mean you collaborate with engineers, economists, and cryptographers worldwide on protocols that transcend any single company or jurisdiction.' },
]

const CONS = [
  { title: 'Security Pressure is Extreme', desc: 'Smart contracts are immutable and hold real money. A single bug can result in tens of millions of dollars lost instantly and permanently. This responsibility can be psychologically taxing.' },
  { title: 'Market Volatility Affects Jobs', desc: 'Crypto bear markets reduce hiring significantly. Many startups and protocols shut down or pause hiring when token prices collapse. This boom-bust cycle is unlike any other tech sector.' },
  { title: 'Steep Learning Curve', desc: 'Blockchain requires simultaneous mastery of cryptography, distributed systems, economics, and Solidity. Becoming genuinely job-ready takes longer than most web development paths.' },
  { title: 'Regulatory Uncertainty', desc: 'Governments globally are still defining cryptocurrency regulation. Protocols you build today may face legal challenges tomorrow. Legal compliance is a shifting target that affects product decisions.' },
  { title: 'Scams and Rug Pulls', desc: 'The ecosystem contains a high proportion of fraudulent projects. You must carefully vet employers and projects — working on a scam protocol damages your reputation significantly and permanently.' },
  { title: 'EVM Monoculture Risk', desc: 'Ethereum dominates blockchain development, but alternative VMs (SVM on Solana, CosmWasm) are growing fast. Staying EVM-only increasingly limits your options in a multi-chain future.' },
]

const VIDEOS = [
  { id: 'gyMwXuJrbJQ', title: 'Blockchain Developer Roadmap 2025', desc: 'Complete guide to blockchain development — from crypto fundamentals and Solidity to DeFi protocols and security auditing. The definitive map for 2025.', dur: '22:48', channel: 'Patrick Collins' },
  { id: 'M576WGiDBdQ', title: 'Solidity, Blockchain & Smart Contracts — Full Course', desc: 'Learn Solidity from zero to advanced — smart contracts, DeFi protocols, NFTs, and security patterns. Patrick Collins\' legendary full-course masterclass.', dur: '32:00:00', channel: 'freeCodeCamp' },
  { id: 'cGQHXjkB-KM', title: 'How to Become a Smart Contract Auditor', desc: 'The complete guide to getting into smart contract security — tools, techniques, competitive auditing on Sherlock and Code4rena, and building a portfolio.', dur: '18:30', channel: 'Patrick Collins' },
]

const TAKEAWAYS = [
  'Learn cryptography fundamentals before Solidity — they are the mathematical backbone of everything',
  'Never deploy a smart contract without comprehensive testing and at least one independent audit',
  'Study real exploits — the Ronin Bridge, Euler Finance, and Curve hacks teach more than any tutorial',
  'Tokenomics and game theory matter as much as code — protocols fail economically before they fail technically',
  'Build and ship on testnets constantly — your portfolio must include deployed, working smart contracts',
]

const CAREER_FACTS = [
  {
    icon: <Shield size={20} />, title: 'What You Build',
    desc: 'Smart contracts, DeFi protocols, NFT marketplaces, DAOs, cross-chain bridges, Layer 2 rollups, decentralised identity systems, and trustless financial infrastructure that operates 24/7 without intermediaries.',
    color: '#f59e0b',
  },
  {
    icon: <Workflow size={20} />, title: 'Core Activities',
    desc: 'Smart contract development in Solidity, security auditing, DApp frontend integration, protocol design, tokenomics modelling, gas optimisation, formal verification, and governance participation in DAOs.',
    color: '#16a34a',
  },
  {
    icon: <Users size={20} />, title: 'Who You Work With',
    desc: 'Cryptographers, DeFi economists, security auditors, product managers, frontend engineers, and the open-source community through DAOs, hackathons, and public forums like Ethereum Research.',
    color: '#4f46e5',
  },
  {
    icon: <TrendingUp size={20} />, title: 'Industry Demand',
    desc: 'Blockchain developer demand grew 187% in 2024. Despite market cycles, the talent shortage is structural — there are fewer than 50,000 professional Solidity developers globally for thousands of active protocols.',
    color: '#ea580c',
  },
]

const WHY_REASONS = [
  { emoji: '🔐', title: 'Build Trustless Systems', desc: 'You create code that runs without needing to trust any person or institution. Trustless computation is one of the most profound ideas in modern computer science — and you get to implement it.' },
  { emoji: '💰', title: 'Top-Tier Compensation', desc: 'Senior Solidity developers earn R1.1M–R2M in South Africa; global USD remote roles pay $150k–$400k+. A structural talent shortage keeps salaries consistently high even in bear markets.' },
  { emoji: '🌍', title: 'Fully Remote Ecosystem', desc: '72% of blockchain roles are fully remote — the highest of any engineering discipline. DAOs have no offices by design. Your work is measured in shipped protocols, not attendance.' },
  { emoji: '⚡', title: 'Work at the Frontier', desc: 'You are building infrastructure categories that literally did not exist 15 years ago. DeFi, NFTs, ZK proofs, and on-chain governance are genuinely new computing paradigms.' },
  { emoji: '🔗', title: 'Open Source Impact', desc: 'Your contracts are public and verifiable. A well-designed protocol can be forked and used by millions globally. Open-source contribution builds reputation faster than any closed-source role.' },
  { emoji: '🧠', title: 'Hardest Engineering Problems', desc: 'Combining cryptography, distributed systems, economic game theory, and adversarial security into one codebase is extraordinarily challenging. You will never be bored or run out of things to learn.' },
]

const FREE_RESOURCES = [
  { category: 'Courses', color: '#b45309', bgColor: '#fffbeb', items: [
    { name: 'CryptoZombies — Solidity Interactive (free)', url: '#', type: 'Course', rating: 5 },
    { name: 'Alchemy University — Complete Web3 Track', url: '#', type: 'Course', rating: 5 },
    { name: 'freeCodeCamp — Solidity & Blockchain', url: '#', type: 'Course', rating: 5 },
    { name: 'Patrick Collins Cyfrin Courses (free)', url: '#', type: 'Course', rating: 5 },
  ]},
  { category: 'Practice', color: '#16a34a', bgColor: '#f0fdf4', items: [
    { name: 'Ethernaut — Smart Contract Hacking CTF', url: '#', type: 'Practice', rating: 5 },
    { name: 'Damn Vulnerable DeFi', url: '#', type: 'Practice', rating: 5 },
    { name: 'Code4rena — Competitive Auditing', url: '#', type: 'Audit', rating: 5 },
    { name: 'Sherlock — Audit Competitions', url: '#', type: 'Audit', rating: 4 },
  ]},
  { category: 'Community', color: '#4f46e5', bgColor: '#eef2ff', items: [
    { name: 'Ethereum Research Forum (ethresear.ch)', url: '#', type: 'Research', rating: 5 },
    { name: 'Patrick Collins YouTube', url: '#', type: 'YouTube', rating: 5 },
    { name: 'r/ethdev & r/solidity', url: '#', type: 'Forum', rating: 4 },
    { name: 'Foundry Book (Official Docs)', url: '#', type: 'Reference', rating: 5 },
  ]},
]

const SALARY_DATA = [
  { role: 'Junior Blockchain Developer', range: 'R320k – R560k', midpoint: 440, yoe: '0–2 yrs', color: '#0891b2' },
  { role: 'Blockchain Developer', range: 'R620k – R1.1M', midpoint: 860, yoe: '2–5 yrs', color: '#16a34a' },
  { role: 'Senior Blockchain Developer', range: 'R1.1M – R2M', midpoint: 1550, yoe: '5–8 yrs', color: '#7c3aed' },
  { role: 'Principal Protocol Engineer', range: 'R2M – R4M+', midpoint: 2800, yoe: '8+ yrs', color: '#ea580c' },
]

const MISTAKES = [
  {
    num: '01', title: 'Skipping Security Fundamentals',
    desc: 'Writing Solidity without deeply understanding reentrancy, integer overflow, access control flaws, and oracle manipulation. The most common audit findings are also the most preventable.',
    fix: 'Complete Ethernaut and Damn Vulnerable DeFi before writing production code. Study every major exploit post-mortem published by rekt.news.',
  },
  {
    num: '02', title: 'Not Testing Thoroughly',
    desc: 'Deploying contracts with only happy-path unit tests. Real protocols require invariant fuzzing, fork tests against mainnet state, and adversarial simulation to catch edge-case vulnerabilities.',
    fix: 'Use Foundry for fuzz testing. Write at least one invariant test for every financial invariant in your protocol. Aim for 100% branch coverage.',
  },
  {
    num: '03', title: 'Ignoring Gas Optimization',
    desc: 'Shipping contracts with expensive storage operations, inefficient loops, and wasteful calldata. In a high-fee environment, poor gas design makes your protocol unusable and uncompetitive.',
    fix: 'Learn storage packing, use mappings over arrays where possible, use calldata over memory, and profile every function with Foundry\'s gas reports.',
  },
  {
    num: '04', title: 'Trusting Oracles Blindly',
    desc: 'Using spot price from a single DEX pool as a price oracle. This is the source of dozens of flash loan exploits. Spot prices can be manipulated within a single transaction.',
    fix: 'Use Chainlink price feeds with TWAP fallback. Never use single-block spot prices for any financial calculation. Study the Mango Markets and Euler exploits.',
  },
  {
    num: '05', title: 'Portfolio with Only Tutorial Contracts',
    desc: 'Applying for jobs showing cloned tutorial projects. Recruiters have seen thousands of identical ERC-20 and NFT contracts. Your portfolio needs to show protocol design thinking.',
    fix: 'Build one original DeFi primitive — a novel AMM, lending market, or novel reward distribution mechanism. Audit it, document the design decisions, and deploy it to a testnet.',
  },
  {
    num: '06', title: 'Ignoring Upgradability Complexity',
    desc: 'Using proxy upgrade patterns without understanding storage collision risks, function selector clashes, and the trust assumptions upgradability introduces into supposedly trustless protocols.',
    fix: 'Read the OpenZeppelin Proxy documentation in full. Understand UUPS vs Transparent proxies. Use upgrade-safe contracts from OpenZeppelin. Always consider whether upgradability is truly necessary.',
  },
]

const CAREER_CHANGE_PATHS = [
  {
    from: 'Backend Developer (Node / Python)',
    ease: 'Very Achievable', easeColor: '#16a34a', easeBg: '#f0fdf4',
    desc: 'You already understand APIs, data structures, and server-side logic. Blockchain is distributed backend infrastructure. Add cryptography knowledge, learn Solidity, and you transition naturally.',
    steps: ['Learn Ethereum architecture and EVM', 'Master Solidity and OpenZeppelin', 'Build and deploy 3 original DeFi contracts', 'Study security auditing and compete on Code4rena'],
  },
  {
    from: 'Frontend / Full-Stack Developer',
    ease: 'Natural Fit', easeColor: '#4f46e5', easeBg: '#eef2ff',
    desc: 'You understand JavaScript and React — the foundation for DApp frontends. Add ethers.js, wallet integration, and Solidity basics and you can build complete, end-to-end decentralised applications.',
    steps: ['Learn Solidity and smart contract basics', 'Integrate ethers.js / viem into existing React skills', 'Build and deploy a full-stack DApp', 'Target frontend-heavy DeFi protocol roles'],
  },
  {
    from: 'Traditional Finance / Quant',
    ease: 'Exceptional Fit', easeColor: '#b45309', easeBg: '#fffbeb',
    desc: 'You understand financial instruments, risk modelling, and market microstructure — skills most blockchain developers lack. Add Solidity and DeFi protocol knowledge and you become extremely rare.',
    steps: ['Learn programming basics (Python first)', 'Study DeFi protocol mechanics deeply', 'Learn Solidity focusing on DeFi patterns', 'Target protocol economist or DeFi architect roles'],
  },
  {
    from: 'Security / Penetration Tester',
    ease: 'Elite Pathway', easeColor: '#ea580c', easeBg: '#fff7ed',
    desc: 'Your adversarial mindset is exactly what blockchain security needs. Learn Solidity to read contracts, understand EVM exploitation, and you can command $300k+ salaries as a smart contract auditor.',
    steps: ['Learn Solidity to read and understand contracts', 'Complete Ethernaut and Damn Vulnerable DeFi', 'Start competing on Sherlock and Code4rena', 'Build audit report portfolio and apply to firms'],
  },
]

const THIRTY_DAY_PLAN = [
  { week: 'Week 1', theme: 'Crypto Foundations', color: '#b45309', bg: '#fffbeb', days: [
    { day: 'Day 1–2', task: 'Set up development environment. Understand hashing, public-key cryptography, and digital signatures. Read Nakamoto\'s Bitcoin whitepaper.' },
    { day: 'Day 3–4', task: 'Ethereum architecture deep dive — accounts, transactions, EVM, and gas mechanics. Run a local Ethereum node.' },
    { day: 'Day 5–6', task: 'Solidity basics — data types, functions, modifiers, and events. Write and deploy your first contract on Remix.' },
    { day: 'Day 7', task: 'Deploy an ERC-20 token to the Sepolia testnet. Interact with it using ethers.js. Commit everything to GitHub.' },
  ]},
  { week: 'Week 2', theme: 'Smart Contracts & Security', color: '#16a34a', bg: '#f0fdf4', days: [
    { day: 'Day 8–9', task: 'OpenZeppelin contracts library — ERC standards, Ownable, ReentrancyGuard, and AccessControl patterns.' },
    { day: 'Day 10–11', task: 'Start Ethernaut CTF challenges. Complete at least 6 levels. Document every exploit and what you learned.' },
    { day: 'Day 12–13', task: 'Testing with Foundry — unit tests, fuzz tests, and fork tests against mainnet state.' },
    { day: 'Day 14', task: 'Build a simple staking contract with rewards. Write 20+ tests. Run Slither. Deploy to testnet.' },
  ]},
  { week: 'Week 3', theme: 'DeFi & DApp Development', color: '#4f46e5', bg: '#eef2ff', days: [
    { day: 'Day 15–16', task: 'Study Uniswap V2 AMM mechanics — constant product formula, liquidity provision, and swap math.' },
    { day: 'Day 17–18', task: 'Build a React + ethers.js DApp frontend. Connect MetaMask, read contract state, submit transactions.' },
    { day: 'Day 19–20', task: 'Build a simple lending protocol with collateralisation and liquidation logic. Fuzz test the invariants.' },
    { day: 'Day 21', task: 'Deploy your lending protocol to Sepolia. Write full documentation. Share on Twitter and Ethereum Research.' },
  ]},
  { week: 'Week 4', theme: 'Auditing & Portfolio', color: '#ea580c', bg: '#fff7ed', days: [
    { day: 'Day 22–24', task: 'Complete Damn Vulnerable DeFi challenges. Study real exploit post-mortems from rekt.news in depth.' },
    { day: 'Day 25–26', task: 'Gas optimisation — storage packing, custom errors, assembly basics. Reduce your contract\'s gas costs by 30%.' },
    { day: 'Day 27–28', task: 'Participate in a Code4rena or Sherlock audit competition. Submit at least one finding, however small.' },
    { day: 'Day 29–30', task: 'Finalise portfolio: 3 deployed contracts, 1 audit report, documented security learnings. Apply to blockchain roles.' },
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
      try { await navigator.share({ title: 'Blockchain Developer Career Roadmap 2026', text: 'Complete step-by-step roadmap to become a Blockchain Developer in 2026', url: window.location.href }) }
      catch (_) {}
    } else { handleCopy() }
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-10 p-4 rounded-2xl" style={{ background: '#fffbeb', border: `1px solid ${C.border}` }}>
      <span className="text-xs font-semibold" style={{ color: C.textMuted }}>Share this roadmap:</span>
      <button onClick={handleCopy} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border-0" style={{ background: copied ? 'rgba(22,163,74,0.1)' : C.primaryLight, color: copied ? '#16a34a' : C.primaryDark, outline: 'none' }}>
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
        <span className="truncate">{typeof window !== 'undefined' ? window.location.href : '/roadmaps/blockchain-developer'}</span>
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
export default function BlockchainDeveloperRoadmapPage() {
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
            src="https://i.imgur.com/xHm6OjV.jpeg"
            alt="Blockchain Developer workspace"
            className="w-full h-full object-cover object-center block"
            style={{ filter: 'saturate(0.6) brightness(1.05)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 45%, rgba(255,255,255,0.75) 72%, rgba(255,255,255,1) 88%)' }} />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-8 pb-12">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-3 text-xs font-semibold" style={{ background: C.primaryLight, color: C.primaryDark }}>
                <GitBranch size={12} /> Blockchain & Web3
              </div>
              <h1 className="font-extrabold leading-tight mb-2" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0f172a', letterSpacing: '-0.03em' }}>
                Blockchain Developer
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
            Build the decentralised infrastructure rewriting finance, identity, and ownership. Blockchain developers write smart contracts, design trustless protocols, and create the Web3 applications that millions interact with every day.
          </p>
          <div className="h-px mt-10" style={{ background: C.border }} />
        </div>
      </div>

      {/* ── TABLE OF CONTENTS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#fffbeb' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={introRef}>
            <SectionHeader icon={<BookOpen size={22} />} title="What's Inside" subtitle="Everything you need to know about this career in one place" iconBg={C.primaryLight} iconColor={C.primaryDark} />
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
            <SectionHeader icon={<Layers size={22} />} title="What This Career Is" subtitle="The role, responsibilities, and scope of Blockchain Development" iconBg={C.primaryLight} iconColor={C.primaryDark} />
            <div className="rounded-2xl p-6 mb-8 border" style={{ background: '#fffbeb', borderColor: 'rgba(245,158,11,0.25)' }}>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                A <strong style={{ color: C.primaryDark }}>Blockchain Developer</strong> builds decentralised systems where code is law and trust is cryptographic. Smart contracts in Solidity, protocol design, DeFi mechanics, and security auditing are the core craft. Blockchain developers eliminate intermediaries — banks, brokers, and platforms — replacing them with transparent, unstoppable, and programmable logic that runs 24/7 without any single point of control.
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
      <section className="border-b" style={{ ...sectionStyle, background: '#fffbeb' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={whyRef}>
            <SectionHeader icon={<Flame size={22} />} title="Why Choose This Career" subtitle="Six compelling reasons Blockchain Development could be your best move" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<Briefcase size={22} />} title="A Day in the Life" subtitle="What a typical Blockchain Developer workday looks like" iconBg={C.indigoLight} iconColor={C.indigo} />
            <div className="grid gap-7" style={{ gridTemplateColumns: '1fr 260px' }}>
              <div>
                <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.textMuted }}>Typical Daily Schedule</p>
                {SCHEDULE.map(item => (
                  <div key={item.time} className="flex items-start gap-3.5 rounded-2xl p-4 border mb-2.5 transition-all duration-200" style={{ background: C.bg, borderColor: C.border }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,158,11,0.3)'; (e.currentTarget as HTMLElement).style.background = '#fffbeb' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.background = C.bg }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: C.primaryLight, color: C.primaryDark }}>{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="text-sm font-semibold" style={{ color: C.text }}>{item.act}</span>
                        <span className="text-xs flex-shrink-0" style={{ color: C.textMuted }}>{item.duration}</span>
                      </div>
                      <div className="text-xs" style={{ color: C.textMuted }}>{item.desc}</div>
                    </div>
                    <span className="font-mono text-xs flex-shrink-0" style={{ color: C.primaryDark }}>{item.time}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="rounded-2xl p-5 mb-4 border" style={{ background: '#fffbeb', borderColor: C.border }}>
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
                <div className="rounded-2xl p-5 border" style={{ background: '#fffbeb', borderColor: C.border }}>
                  <div className="text-sm font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Work Environment</div>
                  {WORK_ENVS.map(e => (
                    <div key={e.type} className="mb-3.5">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span style={{ color: C.textMuted }}>{e.type}</span>
                        <span className="font-mono" style={{ color: C.primaryDark }}>{e.pct}%</span>
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
      <section ref={tlSectionRef} className="border-b" style={{ ...sectionStyle, background: '#fffbeb' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={tlRef}>
            <SectionHeader icon={<Clock size={22} />} title="Career Timeline" subtitle="Time estimates and salary ranges for each level" iconBg={C.indigoLight} iconColor={C.indigo} />
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
          <SectionHeader icon={<Target size={22} />} title="Step-by-Step Roadmap" subtitle="Your path from complete beginner to job-ready blockchain developer" iconBg={C.primaryLight} iconColor={C.primaryDark} />
          <div className="relative flex flex-col items-center">
            {ROADMAP_STEPS.map((s, i) => {
              const icons = ['🔐', '⛓️', '📜', '🌐', '💱', '🛡️']
              const accentColors = ['#b45309', '#16a34a', '#b45309', '#16a34a', '#b45309', '#16a34a']
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
            <div className="w-full rounded-3xl mt-2 py-8 px-8 text-center" style={{ background: `linear-gradient(135deg, #b45309 0%, #7c3aed 100%)`, boxShadow: '0 8px 48px rgba(180,83,9,0.25)' }}>
              <div className="text-4xl mb-3">⛓️</div>
              <div className="font-extrabold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>GO FROM ZERO to</div>
              <div className="font-extrabold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'rgba(255,255,255,0.75)' }}>JOB-READY IN 2026</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>12–18 months · Security-first mindset · Deploy real contracts to mainnet</div>
            </div>
          </div>
          <ShareBar />
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#fffbeb' }}>
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
                        <div className="h-1.5 rounded-full" data-bar-w={s.level} style={{ width: 0, background: `linear-gradient(90deg, #f59e0b, #7c3aed)` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-7 border" style={{ background: C.bg, borderColor: C.border }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.primaryLight }}><MessageSquare size={16} style={{ color: C.primaryDark }} /></div>
                  <div>
                    <div className="text-base font-bold" style={{ fontFamily: 'Syne, sans-serif', color: C.text }}>Soft Skills</div>
                    <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>Interpersonal abilities to build</div>
                  </div>
                </div>
                {SOFT_SKILLS.map(s => (
                  <div key={s.name} className="rounded-xl p-3.5 mb-2.5 last:mb-0 border transition-colors cursor-default" style={{ background: '#fffbeb', borderColor: C.border }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.primaryLight}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#fffbeb'}>
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
      <section className="border-b" style={{ ...sectionStyle, background: '#fffbeb' }}>
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
            <SectionHeader icon={<Sparkles size={22} />} title="AI-Enhanced Roadmap" subtitle="How AI is transforming Blockchain Development in 2026" iconBg={C.primaryLight} iconColor={C.primaryDark} />
            <div className="rounded-2xl p-5 mb-7 text-sm leading-relaxed border" style={{ background: '#fffbeb', borderColor: 'rgba(245,158,11,0.25)', color: C.textMuted }}>
              AI tools like Claude and Copilot accelerate Solidity development — generating test scaffolding, identifying common vulnerability patterns, and modelling economic attack simulations. Blockchain developers using AI for auditing and code generation ship more secure protocols 40% faster.
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
                <div key={s} className="flex items-center gap-2.5 rounded-xl px-4 py-3.5 border" style={{ background: '#fffbeb', borderColor: C.border }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-black text-xs" style={{ background: C.primaryLight, color: C.primaryDark }}>{i + 1}</div>
                  <span className="text-xs font-medium" style={{ color: C.text }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROS & CONS ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#fffbeb' }}>
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
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>Figures reflect South African total compensation. Global remote contracts — especially for senior and principal roles — can pay 3–6× these figures in USD. Blockchain remains one of the highest-paying engineering disciplines globally.</p>
            </div>
            <div className="space-y-4">
              {SALARY_DATA.map(row => (
                <div key={row.role} className="rounded-2xl p-5 border" style={{ background: '#fffbeb', borderColor: C.border }}>
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div>
                      <span className="text-sm font-bold" style={{ color: C.text }}>{row.role}</span>
                      <span className="ml-3 text-xs font-mono" style={{ color: C.textFaint }}>{row.yoe}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: row.color }}>{row.range}</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                    <div className="h-2.5 rounded-full" style={{ width: `${(row.midpoint / 3600) * 100}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 border" style={{ background: '#fffbeb', borderColor: 'rgba(245,158,11,0.25)' }}>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <strong style={{ color: C.primaryDark }}>Pro tip:</strong> Smart contract auditors at top firms (Trail of Bits, OpenZeppelin, Spearbit) earn $200k–$600k+ USD globally. Competitive auditing on Code4rena and Sherlock is the fastest path to an auditor career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISTAKES ── */}
      <section className="border-b" style={{ ...sectionStyle, background: '#fffbeb' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={mistakesRef}>
            <SectionHeader icon={<AlertTriangle size={22} />} title="Common Mistakes" subtitle="Avoid the traps that slow down most aspiring blockchain developers" iconBg={C.orangeLight} iconColor={C.orange} />
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
            <SectionHeader icon={<RefreshCw size={22} />} title="Career Change Guide" subtitle="How to break into blockchain from your current background" iconBg={C.primaryLight} iconColor={C.primaryDark} />
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
      <section className="border-b" style={{ ...sectionStyle, background: '#fffbeb' }}>
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
            <SectionHeader icon={<Play size={22} />} title="Video Resources" subtitle="Learn from the best educators in Blockchain Development" iconBg={C.redLight} iconColor={C.red} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {VIDEOS.map(v => (
                <div key={v.id} className="rounded-2xl overflow-hidden border transition-all duration-200" style={{ background: '#fffbeb', borderColor: C.border }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,158,11,0.4)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)' }}
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
      <section className="border-b" style={{ ...sectionStyle, background: '#fffbeb' }}>
        <div className="max-w-4xl mx-auto px-8">
          <div ref={finalRef}>
            <SectionHeader icon={<Award size={22} />} title="Final Thoughts" subtitle="What we want you to take away from this guide" iconBg={C.primaryLight} iconColor={C.primaryDark} />
            <div className="rounded-2xl p-6 border mb-8" style={{ background: C.bg, borderColor: C.border }}>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#374151' }}>
                Blockchain development is where <strong style={{ color: C.primaryDark }}>mathematics meets money</strong>. It is one of the most technically demanding and intellectually rewarding paths in software engineering. The protocols you build hold real value, serve real users globally, and operate without any off switch. That combination of technical depth and genuine impact is extraordinarily rare.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                The path to a blockchain job demands more than learning Solidity syntax — it requires internalising a security-first mindset, understanding economic incentives, and deploying real contracts that real users interact with. Start with the fundamentals, study every major exploit, and let your audit findings and deployed protocols speak for themselves.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {TAKEAWAYS.map((t, i) => (
                <div key={t} className="flex items-center gap-3.5 rounded-xl px-5 py-3.5 border" style={{ background: C.bg, borderColor: C.border }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-mono font-black text-xs" style={{ background: C.primaryLight, color: C.primaryDark }}>{i + 1}</div>
                  <span className="text-sm" style={{ color: C.text }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="max-w-4xl mx-auto px-8" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="relative overflow-hidden rounded-3xl px-12 py-16 text-center" style={{ background: `linear-gradient(135deg, #b45309 0%, #7c3aed 100%)` }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, background: 'rgba(255,255,255,0.05)', top: -120, right: -80 }} />
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-7" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <Rocket size={30} style={{ color: '#fff' }} />
          </div>
          <h2 className="font-extrabold text-white mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
            Ready to Build on the Blockchain?
          </h2>
          <p className="text-sm mb-10 mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440 }}>
            You have the roadmap. You have the resources. You have the 30-day plan. All that's left is to open Foundry and write your first smart contract.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link to="/roadmaps" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm no-underline" style={{ fontFamily: 'Syne, sans-serif', background: '#fff', color: '#b45309' }}>
              Explore More Roadmaps <ArrowRight size={16} />
            </Link>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white no-underline" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              Get Career Advice
            </a>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Deploy your first contract today. Your future self will be proud.</p>
        </div>
        <ShareBar />
      </div>

    </div>
  )
}