import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react'

interface ArticleData {
  slug: string
  title: string
  metaDescription: string
  category: string
  categoryColor: string
  author: string
  authorInitials: string
  authorColor: string
  authorBio: string
  date: string
  readTime: string
  views: string
  tags: string[]
  intro: string
  sections: Array<{ heading: string; body: string }>
  keyTakeaways: string[]
  relatedSlugs: string[]
}

const articles: ArticleData[] = [
  {
    slug: 'retail-manager-to-frontend-developer',
    title: 'From retail manager to frontend developer in 8 months — no bootcamp required',
    metaDescription: 'Sarah Chen shares her exact step-by-step journey from retail management to a $95K frontend developer role using only free resources.',
    category: 'Career Change', categoryColor: '#10b981',
    author: 'Sarah Chen', authorInitials: 'SC', authorColor: '#2563eb',
    authorBio: 'Frontend developer at a Cape Town fintech startup. Transitioned from 8 years in retail management.',
    date: 'April 14, 2026', readTime: '8 min read', views: '14.2K views',
    tags: ['career change', 'frontend', 'self-taught'],
    intro: `In January 2025, I was managing a team of 12 at a busy retail chain, spending my days resolving stockroom disputes and analysing inventory spreadsheets. By September, I had my first developer job offer — $95,000, remote, with a company I genuinely liked.\n\nI did not do a bootcamp. I did not have a computer science degree. And I had never written a single line of code before March 2025. Here is exactly what I did, week by week, so you can copy it if you want to.`,
    sections: [
      { heading: 'Why I decided to switch careers', body: `I had been in retail management for eight years. I was good at it, and I did not hate it — but I had hit an invisible ceiling. Every year the salary bumps got smaller, the hours got longer, and the job security felt more uncertain as online retail continued eating physical stores alive.\n\nI had a friend who had made a similar switch two years before me. She was working remotely, had doubled her income, and seemed genuinely energised by her work. I started asking questions. I expected her to tell me she had some secret technical background. Instead, she told me that the hardest part was believing it was actually possible. The skills part was learnable.\n\nThat conversation changed everything. I gave myself six months to find out if I could do it.` },
      { heading: 'Month 1–2: Learning the foundations (free)', body: `I started with freeCodeCamp's Responsive Web Design certification. It is genuinely free, it builds projects from day one, and it is structured enough that you always know what to do next. I spent about 90 minutes per day, mostly after my kids went to bed.\n\nBy the end of month two I understood HTML and CSS. I could build static pages. Nothing fancy, but I understood the foundation. I also started The Odin Project, which gave me a more project-based approach that complemented freeCodeCamp well.\n\nOne thing I wish I had known: do not try to fully understand everything before moving on. You will learn by doing. Read it once, try to apply it, Google what you do not understand. That loop — read, attempt, search, repeat — is what learning to code actually looks like.` },
      { heading: 'Month 3–4: JavaScript and the wall', body: `Month three was hard. JavaScript is where most self-taught learners hit the wall, and I hit it hard. Objects, functions, the way JavaScript handles "this" — none of it made intuitive sense at first.\n\nWhat helped: I stopped trying to understand JavaScript abstractly and started building things that required it. I built a to-do list app, a simple weather app using a free API, and a word counter tool I actually used at work. Building real things made the concepts stick in a way that tutorials never could.\n\nCS50's Introduction to Computer Science (free on edX) also gave me the mental models I was missing. It taught me how to think about problems computationally rather than just memorising syntax.` },
      { heading: 'Month 5–6: React and portfolio building', body: `I moved to React using the official documentation and Scrimba's free React course. I built three React projects: a recipe manager, a job application tracker, and a dashboard for my household budget.\n\nEvery project got a proper README explaining what it does, the problem it solves, and the technologies used. I pushed commits daily because a green contribution graph signals consistency to employers.\n\nI also updated my LinkedIn headline to "Frontend Developer (Career Changer) | HTML, CSS, JavaScript, React" and started engaging with developer content. Two of my eventual interviews came from LinkedIn reach-outs.` },
      { heading: 'Month 7–8: Job applications and the offer', body: `I sent 47 job applications over six weeks. I heard back from 11. Six first-round interviews, three technical assessments, two final-stage interviews. One offer.\n\nThe acceptance rate sounds low but it is normal for career changers. I targeted companies that had recently posted on LinkedIn, used easy-apply to increase volume, and personalised my cover letters by referencing something specific about each company.\n\nThe offer came from a fintech startup that had recently rebuilt their product in React. My portfolio demonstrated exactly the skills they needed. I was honest about my background — the problem-solving from retail, the self-discipline required to learn without structure. They hired me.` },
    ],
    keyTakeaways: ['You do not need a bootcamp or degree to get a frontend developer job in 2026', 'Free resources like freeCodeCamp, The Odin Project, and CS50 are genuinely excellent', 'Building real projects matters far more than completing tutorials', 'A strong GitHub portfolio with readable READMEs is your most important job-search asset', 'The job search takes longer for career changers — budget 6–12 weeks of applications', 'Be honest about your background in interviews; your transition story is an asset'],
    relatedSlugs: ['bootcamp-vs-self-taught-2026', 'github-portfolio-no-experience', 'top-interview-questions-tech'],
  },
  {
    slug: 'python-learning-order-beginners',
    title: 'The only Python learning order that actually works for complete beginners',
    metaDescription: 'A structured, stage-by-stage Python learning path with exact resources at every level. No more tutorial-hopping.',
    category: 'Roadmaps', categoryColor: '#2563eb',
    author: 'James Oduya', authorInitials: 'JO', authorColor: '#7c3aed',
    authorBio: 'Software engineer and technical writer. Has mentored 200+ developers through career transitions.',
    date: 'April 10, 2026', readTime: '6 min read', views: '9.8K views',
    tags: ['python', 'beginner', 'learning path'],
    intro: `The biggest reason beginners fail to learn Python is not lack of intelligence. It is jumping between resources without a structured sequence. They try a YouTube course, jump to Udemy, start a book, get confused, and eventually quit.\n\nThis guide gives you one clear sequence. Follow it in order. Do not skip stages. Total time from zero to job-ready is 400–600 hours of focused practice — at 2 hours per day, that is 7–10 months.`,
    sections: [
      { heading: 'Stage 1: Absolute basics (weeks 1–3)', body: `Start with the official Python tutorial at docs.python.org. It is free, accurate, and written by the people who built Python. Read chapters 3–5 and type every example yourself.\n\nDo not just read. Type. Running code yourself, seeing the output, making small changes and seeing what breaks — this is how the concepts become muscle memory.\n\nAlso complete the "Learn Python" track on Codecademy (free tier). It takes about 25 hours and gives you interactive feedback. By the end of three weeks you should understand variables and data types, conditionals, loops, functions, and basic string manipulation.` },
      { heading: 'Stage 2: Projects and problem-solving (weeks 4–8)', body: `This is where most learners make a critical mistake: they move straight to another course. Do not do this. Instead, build three small projects using only what you already know.\n\nProject ideas: a simple calculator, a number guessing game, a script that reads a CSV file and does basic analysis. The projects do not have to be impressive. They have to be yours — code you wrote, debugged, and made work.\n\nSimultaneously, start solving Python problems on Edabit or HackerRank (beginner level). 15 minutes per day. The goal is training yourself to break problems into steps.` },
      { heading: 'Stage 3: Intermediate Python (weeks 9–16)', body: `Now you are ready for Automate the Boring Stuff with Python by Al Sweigart (free online at automatetheboringstuff.com). This is the book that took countless people from "I sort of understand Python" to "I can actually build useful things."\n\nThe book teaches you file manipulation, working with spreadsheets and PDFs, web scraping, scheduling tasks, and sending emails programmatically. Real-world skills that demonstrate value to employers.\n\nAfter this, read Python Crash Course by Eric Matthes, particularly the chapters on object-oriented programming. OOP is where Python starts feeling like a real programming language.` },
      { heading: 'Stage 4: Pick your specialisation (weeks 17–30)', body: `Python is used in web development (Django, Flask), data science (pandas, scikit-learn), automation, and AI/ML. By week 17 you need to pick a direction.\n\nFor data roles: work through the Python Data Science Handbook by Jake VanderPlas (free online). Learn pandas, matplotlib, and scikit-learn. Build a portfolio project using a real Kaggle dataset.\n\nFor web development: follow Django's official tutorial, then build one complete web application with user authentication, a database, and a deployed version on Render. Deployment matters — employers want to see you can ship.` },
    ],
    keyTakeaways: ['Follow a structured sequence — do not jump between resources', 'Build projects from week 4 onwards, even small ones', 'Automate the Boring Stuff is the best intermediate Python resource and it is free', 'Pick a specialisation by week 17: data, web, or automation', 'Plan for 400–600 total hours to reach job-readiness'],
    relatedSlugs: ['free-resources-learn-coding-2026', 'github-portfolio-no-experience', 'bootcamp-vs-self-taught-2026'],
  },
  {
    slug: 'ai-replace-jobs-2027',
    title: 'Which jobs will AI replace by 2027? The data tells a surprising story',
    metaDescription: 'We analysed 500,000 job postings to find out which roles are growing, which are shrinking, and where the real opportunity is hiding in the AI economy.',
    category: 'AI & Future', categoryColor: '#7c3aed',
    author: 'Lerato Mokoena', authorInitials: 'LM', authorColor: '#db2777',
    authorBio: 'Data analyst tracking tech job market trends across 30+ countries. Writes our AI career reports.',
    date: 'April 8, 2026', readTime: '11 min read', views: '22.4K views',
    tags: ['AI', 'automation', 'future of work'],
    intro: `Everyone is worried about AI taking their job. Some of that worry is justified. Most of it is pointed at the wrong targets.\n\nWe analysed over 500,000 job postings across LinkedIn, Indeed, and Glassdoor between January 2024 and March 2026. The picture that emerged is more nuanced — and in some ways more hopeful — than the headlines suggest.\n\nThe short version: AI is not replacing jobs as fast as feared, but it is replacing specific tasks within jobs faster than most people realise. Workers who understand this distinction are already ahead.`,
    sections: [
      { heading: 'The jobs that are actually disappearing', body: `Our data shows that certain job postings have declined sharply over 24 months. Data entry clerk postings fell 76% between January 2024 and March 2026. Basic proofreading and copy-editing roles dropped 61%. Tier-1 customer support fell 45%.\n\nWhat these roles have in common: they involve highly repetitive, rule-based tasks that can be described precisely enough for an AI to replicate. "Good enough, fast, and cheap" beats "excellent but expensive and slow" for most business decisions.\n\nRoutine legal document review fell 38%. Basic financial reporting dropped 42%. These required training and education — but they required applying rules to information, and that is exactly what large language models do well.` },
      { heading: 'The jobs that are surprisingly safe', body: `Trades and physical work — plumbers, electricians, HVAC technicians — saw no meaningful decline. You cannot send an AI to fix a pipe. Physical presence, dexterity, and real-world problem-solving in unpredictable environments remain stubbornly human.\n\nHigh-empathy roles are also resilient. Mental health counsellors, social workers, and occupational therapists saw demand increase over the period we studied. People in crisis do not want to be supported by a chatbot.\n\nTeaching — the kind that involves mentorship, relationship-building, and adaptive instruction — is holding steady. The core relational work of education remains human.` },
      { heading: 'The jobs that are transforming fastest', body: `The most interesting category is "transformed" — roles where AI is changing what the work looks like rather than eliminating it entirely.\n\nSoftware developers are a prime example. Coding assistants have not reduced demand — they changed what developers spend time on. More architecture and complex problem-solving, less boilerplate. Developer job postings grew 15% over our study period, but required skills shifted toward system design, AI integration, and technical leadership.\n\nMarketing roles showed the same pattern. Demand for pure copywriters dropped. Demand for content strategists and AI-augmented marketing specialists increased. The underlying skill — understanding audiences — remains valuable. The tooling changed.` },
      { heading: 'What the 2027 picture actually looks like', body: `Based on our modelling of current trends, the roles most at risk are not the ones in scary headlines. The real mechanism is not "AI replaces all workers." It is more specific: AI makes some workers dramatically more productive, which means companies need fewer people to do the same work.\n\nA single developer using AI tools can produce what previously required a small team. This productivity compression is the real displacement mechanism — not direct job elimination, but headcount reduction as productivity per worker rises.\n\nThe response is not panic — it is skill investment. Workers who learn to use AI as a multiplier rather than a threat will be on the right side of this shift.` },
      { heading: 'The 5 fastest-growing roles right now', body: `Our data identified the roles with the steepest growth in job postings between 2024 and 2026. AI/ML Engineer grew 87% year on year. Prompt Engineer grew 200% from a standing start, but the trajectory is real. MLOps Engineer grew 95%. AI Ethics Officer grew 54% as regulatory pressure increased globally. Data scientists focused on AI systems grew 40%.\n\nBeyond pure AI roles, product managers with AI product experience saw a 35% increase. Technical writers specialising in AI documentation grew 28%. Cybersecurity professionals focused on AI vulnerabilities grew 78%.\n\nThe pattern: growth is not just in building AI. It is in deploying it responsibly, governing it, securing it, and explaining it to humans who need to use it.` },
    ],
    keyTakeaways: ['Data entry, basic proofreading, and tier-1 customer support have already declined sharply', 'Physical trades and high-empathy roles are structurally resistant to AI replacement', 'The bigger risk is productivity compression reducing headcount, not direct replacement', 'Software development and marketing are transforming, not disappearing', 'The 5 fastest-growing roles are all AI-related: ML Engineer, Prompt Engineer, MLOps, AI Ethics, Data Scientist', 'Workers who use AI as a multiplier will be valued more, not less'],
    relatedSlugs: ['tech-salaries-south-africa-2026', 'python-learning-order-beginners', 'retail-manager-to-frontend-developer'],
  },
  {
    slug: 'tech-salaries-south-africa-2026',
    title: 'Tech salaries in South Africa 2026 — what every developer should know',
    metaDescription: 'Up-to-date salary ranges for 18 tech roles across Johannesburg, Cape Town, and remote, including what skills push you to the top of the bracket.',
    category: 'Salaries', categoryColor: '#ea580c',
    author: 'Thabo Nkosi', authorInitials: 'TN', authorColor: '#059669',
    authorBio: 'Data analyst tracking tech job market trends. Authors our annual South African salary guides.',
    date: 'April 5, 2026', readTime: '7 min read', views: '18.7K views',
    tags: ['salary', 'South Africa', 'negotiation'],
    intro: `South African tech salaries have changed significantly over the past two years. The post-COVID remote work normalisation, the rand's performance, and growing international demand for South African developers have all shifted what companies pay — and what developers are willing to accept.\n\nThis guide is based on salary data collected from 1,200+ tech professionals across South Africa between October 2025 and March 2026, combined with public job posting data from LinkedIn, Careers24, and OfferZen.`,
    sections: [
      { heading: 'How to read these numbers', body: `The ranges below reflect total package (base salary + benefits + performance bonus) for South African residents employed by South African companies or working remotely for international companies and paid in rands.\n\nWe have separated Johannesburg/Pretoria figures from Cape Town where the data was sufficient. Cape Town has historically paid slightly below Johannesburg, but the gap has narrowed significantly as remote work made geography less relevant.\n\nIf you are working directly for an international company and paid in USD, GBP, or EUR, your real compensation will be substantially higher — often 2–4× for senior roles.` },
      { heading: 'Salary ranges by role — 2026 data', body: `Junior Software Developer (0–2 years): R280,000–R480,000.\n\nMid-level Software Developer (2–5 years): R550,000–R950,000.\n\nSenior Software Developer (5+ years): R950,000–R1,600,000.\n\nData Scientist: R600,000–R1,800,000. ML and AI specialisation is now the highest-paid sub-specialisation.\n\nDevOps/SRE Engineer: R700,000–R2,200,000.\n\nProduct Manager (tech products): R650,000–R1,900,000.` },
      { heading: 'What actually moves you to the top of the bracket', body: `First: demonstrable AI tool proficiency. Developers who show they use Copilot, Claude, or Cursor effectively are being offered 12–18% premiums.\n\nSecond: deployment and production experience.\n\nThird: cross-functional communication. Developers who can run a stakeholder meeting consistently earn more.\n\nFourth: negotiation itself. Our data showed a consistent 15–22% gap between developers who negotiated and those who accepted the first number.` },
      { heading: 'The international remote opportunity', body: `A mid-level developer with 3–4 years of experience working for a US company can realistically earn $70,000–$110,000 USD. At current exchange rates, this translates to R1,270,000–R2,000,000+ per year.\n\nPlatforms: Toptal, OfferZen's international matching service, Remote.co, We Work Remotely, and direct applications via LinkedIn and AngelList.` },
      { heading: 'Salary negotiation: what actually works', body: `Anchor high but within reason. The first number stated in a negotiation anchors the conversation.\n\nJustify with specificity. "I shipped the payment integration that reduced checkout drop-off by 23%" is strong.\n\nNegotiate total package. Companies often have more flexibility on remote work stipends and training budgets. Do not accept on the day — always ask for 24–48 hours to consider.` },
    ],
    keyTakeaways: ['Senior developers at South African companies earn R950K–R1.6M; international remote roles can reach R2M+', 'AI tool proficiency adds a 12–18% premium', 'Negotiation accounts for a 15–22% gap between developers who negotiate and those who accept the first offer', 'Mid-level developers working for US companies can realistically earn R1.2M–R2M+ at current exchange rates', 'DevOps/SRE earns a consistent premium over general software development'],
    relatedSlugs: ['ai-replace-jobs-2027', 'top-interview-questions-tech', 'github-portfolio-no-experience'],
  },
  {
    slug: 'top-interview-questions-tech',
    title: '30 real interview questions asked at top tech companies — with model answers',
    metaDescription: 'Sourced from engineers who passed interviews at Google, Amazon, Microsoft, and fast-growing startups.',
    category: 'Interviews', categoryColor: '#db2777',
    author: 'Ayesha Patel', authorInitials: 'AP', authorColor: '#d97706',
    authorBio: 'Ex-recruiter who reviewed 10,000+ developer applications. Writes about the hiring market.',
    date: 'April 2, 2026', readTime: '14 min read', views: '31.6K views',
    tags: ['interview', 'hiring', 'tech jobs'],
    intro: `I spent three years on the other side of the hiring table before becoming a developer myself. I have reviewed over 10,000 job applications, conducted hundreds of technical interviews, and debriefed more hiring decisions than I can count.\n\nThese are the questions that actually come up — submitted by 90 engineers who passed interviews at Google, Amazon, Microsoft, Meta, and fast-growing startups between 2024 and 2026.`,
    sections: [
      { heading: 'Behavioural questions — the ones that eliminate most candidates', body: `"Tell me about a time you disagreed with your manager. What did you do?"\n\nWhat they are evaluating: Maturity, communication, and whether you can navigate conflict professionally.\n\n"Describe a project that failed. What happened and what would you do differently?"\n\nWhat they are evaluating: Self-awareness and accountability. Candidates who claim they have never experienced failure are disqualified immediately.\n\n"Tell me about the most technically complex thing you have built."\n\nWhat they are evaluating: Depth of technical knowledge and your ability to communicate it clearly.` },
      { heading: 'Technical concept questions', body: `"What is the difference between a process and a thread?"\n\nModel answer: A process has its own memory space; threads share memory within a process. Processes are safer for isolation but have higher overhead.\n\n"Explain how HTTP works at a high level."\n\nModel answer: HTTP is a stateless protocol operating over TCP/IP. A client sends a request with a method, headers, and optionally a body. The server returns a response with a status code.\n\n"What happens when you type google.com into a browser?"\n\nModel answer structure: DNS resolution → TCP handshake → HTTP(S) request → server processing → HTML parsing and rendering → JavaScript execution.` },
      { heading: 'System design questions — for mid to senior roles', body: `"Design a URL shortener like bit.ly."\n\nModel approach: Clarify requirements first. Estimate scale. Design the API. Choose storage. Discuss shortcode generation. Mention CDN for global performance.\n\n"How would you design a notification system that sends 10 million push notifications per day?"\n\nModel approach: The answer must involve a queue (Kafka, SQS, RabbitMQ). Workers pull from the queue, batch by device type, call platform APIs. Handle failures with exponential backoff and dead-letter queues.` },
      { heading: 'Questions to ask the interviewer', body: `"What does success look like for the person in this role in their first 90 days?" — signals you think in terms of outcomes.\n\n"What is the biggest technical challenge the team is currently working through?" — signals genuine curiosity.\n\n"How does the team handle production incidents?" — signals you understand reliability culture.\n\n"What made the last person who left this role decide to leave?" — bold, but it gets remarkably honest answers.` },
    ],
    keyTakeaways: ['Behavioural questions test maturity and self-awareness more than technical skill', 'System design questions have no single right answer — process matters more than conclusion', 'Asking strong questions at the end is as important as answering them well', '"Tell me about a failure" eliminates candidates who claim they have never failed', 'HTTP, DNS, and TCP/IP fundamentals come up in almost every backend interview'],
    relatedSlugs: ['github-portfolio-no-experience', 'tech-salaries-south-africa-2026', 'bootcamp-vs-self-taught-2026'],
  },
  {
    slug: 'bootcamp-vs-self-taught-2026',
    title: 'Bootcamp vs self-taught in 2026 — we interviewed 50 people who did both',
    metaDescription: 'Cost, time, job placement rates, and the honest truths you will not find in marketing materials.',
    category: 'Career Change', categoryColor: '#10b981',
    author: 'Marcus Adeyemi', authorInitials: 'MA', authorColor: '#ef4444',
    authorBio: 'Career transition specialist. Interviewed 200+ developers about their learning paths over four years.',
    date: 'March 28, 2026', readTime: '12 min read', views: '11.3K views',
    tags: ['bootcamp', 'self-taught', 'career advice'],
    intro: `I have spent four years interviewing developers about how they learned to code. For this article I focused on 50 people: 25 who completed a coding bootcamp in 2023–2025 and 25 who were fully self-taught. The results were not what I expected.`,
    sections: [
      { heading: 'The numbers: cost and time to first job', body: `Bootcamp graduates spent an average of R112,000 on their programme. Time from enrolment to first job offer averaged 9.4 months.\n\nSelf-taught developers spent an average of R3,200 on learning resources. Time from starting to first job offer averaged 14.1 months.\n\nBootcamp graduates got hired about 5 months faster on average but spent approximately R109,000 more to do so.` },
      { heading: 'What bootcamp graduates actually got', body: `The consistent advantages bootcamp graduates cited were structure, accountability, and networking. Structure matters enormously for people who struggle to self-direct.\n\nThe most common complaint: the curriculum was often 6–12 months behind the current job market. Several graduates arrived at interviews only to discover the frameworks they had learned were no longer what employers wanted.` },
      { heading: 'What self-taught developers actually got', body: `Self-taught developers had different advantages: depth, flexibility, and stronger portfolios. Because self-taught learners spend more time with each concept, many developed deeper understanding of fundamentals.\n\nThe obvious disadvantage: 8 of 25 self-taught developers reported significant periods of being stuck or demotivated, adding 3–6 months to their journey.` },
      { heading: 'What actually predicted getting hired — for both groups', body: `Three factors predicted getting a first job offer across both groups.\n\nFirst: a deployed project — accessible via URL, not just on GitHub.\n\nSecond: active networking. 31 of the 50 developers got their first job through someone they knew.\n\nThird: willingness to start at the bottom. Developers who got hired fastest took junior positions at smaller companies.` },
      { heading: 'Which path should you choose?', body: `Choose a bootcamp if: you have failed at self-directed learning before. You have R80,000–R150,000 to invest. The 5-month time advantage is worth the cost.\n\nChoose self-teaching if: you have strong self-discipline. You cannot comfortably afford a bootcamp. You already have transferable skills.\n\nA third option: do the first 3–4 months of self-teaching using free resources, then decide. By that point you will know whether you can sustain it on your own.` },
    ],
    keyTakeaways: ['Bootcamp graduates got hired 5 months faster but spent R109,000 more', 'Structure and accountability are the real bootcamp value — curriculum is often behind the market', 'A deployed project was the strongest predictor of getting hired quickly', '31 of 50 developers got their first job through networking, not cold applications', 'Do 3–4 months of free self-teaching before committing to a bootcamp'],
    relatedSlugs: ['github-portfolio-no-experience', 'retail-manager-to-frontend-developer', 'free-resources-learn-coding-2026'],
  },
  {
    slug: 'github-portfolio-no-experience',
    title: 'How to build a GitHub portfolio that gets you hired with zero experience',
    metaDescription: 'The exact projects to build, how to write good READMEs, and the mistake that kills 90% of beginner portfolios.',
    category: 'Beginner Tips', categoryColor: '#0284c7',
    author: 'Priya Krishnamurthy', authorInitials: 'PK', authorColor: '#7c3aed',
    authorBio: 'Software engineer and technical writer. Writes about practical learning paths for career changers.',
    date: 'March 24, 2026', readTime: '9 min read', views: '26.1K views',
    tags: ['github', 'portfolio', 'job search'],
    intro: `Most beginner GitHub portfolios fail before a recruiter opens a single project. Not because the code is bad — because there is no README, no deployed version, and no evidence that the developer thought about the project as anything other than a tutorial exercise.`,
    sections: [
      { heading: 'The mistake that kills 90% of beginner portfolios', body: `The most common portfolio mistake is a README that says nothing more than "This is a todo app built with React."\n\nEvery project you share publicly needs a README that answers four questions: What does this do? Why did you build it? How do I run it locally? What were the technically interesting decisions?` },
      { heading: 'The 5 project types that actually impress hirers', body: `Project type 1: A full-stack application with a real database — deployed and accessible via URL.\n\nProject type 2: An integration with a real API. Demonstrates working with external data sources.\n\nProject type 3: A performance optimisation project. Document the before and after.\n\nProject type 4: An open source contribution. Worth more than most developers realise.\n\nProject type 5: Something you actually use. The best portfolio projects solve a real problem you had.` },
      { heading: 'How to write a README that gets read', body: `Start with one sentence describing what the project does. Include a live link immediately after. Add screenshots. Write a brief "why I built this" section. Document the technical decisions.\n\nIf your project is not deployed, deploy it before adding it to your portfolio. Free deployment is available on Render, Railway, Vercel, and Netlify.` },
      { heading: 'The commit history matters more than you think', body: `Your commit history tells a story about how you work. Hiring managers want to see commits that are regular, small, and descriptively named: "Add user authentication middleware," "Fix null pointer exception in search results."\n\nConsistent commits across weeks and months signals sustained effort and regular practice.` },
      { heading: 'The pinned repository strategy', body: `GitHub lets you pin up to six repositories. Pin your three strongest full projects and your best open source contribution. Leave the other two slots for your most recently active projects.\n\nAlso invest 30 minutes in your GitHub profile README — write a brief introduction about who you are, what you are working on, and what kinds of roles you are looking for.` },
    ],
    keyTakeaways: ['A missing or sparse README is the most common reason portfolios are dismissed', 'Every portfolio project needs: one sentence of purpose, a live link, screenshots, and a technical decisions section', 'Full-stack projects with user auth and a deployed database are the highest-signal project type', 'Commit history and contribution graph signal professional habits', 'Pin your 3–4 strongest projects on your profile page'],
    relatedSlugs: ['bootcamp-vs-self-taught-2026', 'top-interview-questions-tech', 'retail-manager-to-frontend-developer'],
  },
  {
    slug: 'call-centre-to-qa-engineer',
    title: "I was a call centre agent for 6 years. Here's how I became a QA engineer",
    metaDescription: 'Nomsa Dlamini shares the full story of her transition from call centre agent to QA engineer.',
    category: 'Success Stories', categoryColor: '#059669',
    author: 'Nomsa Dlamini', authorInitials: 'ND', authorColor: '#2563eb',
    authorBio: 'QA engineer at a fintech company. Transitioned from six years in call centre operations.',
    date: 'March 20, 2026', readTime: '10 min read', views: '8.9K views',
    tags: ['career change', 'QA testing', 'success story'],
    intro: `For six years, my job was to listen to frustrated people and stay calm. I did not know it at the time, but I was developing exactly the skills that make a good QA engineer. Patience. Attention to detail. The ability to reproduce a problem reliably from a vague description.`,
    sections: [
      { heading: 'When I realised my job was already about finding bugs', body: `The moment of realisation came during a particularly bad week of calls about a new feature in our app. Customers were describing a problem in the payment flow the tech team had not caught. I was logging the same issue forty different ways.\n\nFrustrated, I went to my team lead and said: "I know exactly when this happens and what causes it." She forwarded my notes to the product team, and they fixed the bug within 48 hours.` },
      { heading: 'The skills that transferred directly', body: `Reproducing problems from incomplete information: customers never describe bugs clearly. Learning to ask the right questions to narrow down exact conditions is a skill QA engineers call "bug reproduction" — and I had been doing it daily for six years.\n\nDocumentation and precision: not "the payment failed" but "the payment failed at the confirmation step when using a Visa card, on iOS app version 2.3.1." That precision is the foundation of a good bug report.` },
      { heading: 'What I had to learn from scratch', body: `SQL: I spent three months on SQLZoo and Mode Analytics SQL Tutorial (both free).\n\nAPI testing: learning to use Postman to send HTTP requests directly to an API — bypassing the UI entirely — was transformative.\n\nTest writing with Playwright: the logic — "open this page, click this button, verify this text appears" — mapped perfectly to how I already thought about testing.` },
      { heading: 'How I got my first QA role', body: `I sent 15 personalised LinkedIn connection requests to QA engineers. Seven responded. Five agreed to calls. One referred me to a junior QA opening.\n\nThe deciding factor was my bug reports. I had created sample bug reports as portfolio pieces — detailed, precisely documented, formatted professionally. No other candidate had done that.` },
    ],
    keyTakeaways: ['Call centre skills transfer directly to QA engineering', 'SQL, API testing with Postman, and browser automation with Playwright are the core technical skills to learn', 'Personalised LinkedIn outreach is more effective than mass applications', 'Sample bug reports as portfolio pieces are a differentiator almost no other candidate uses', 'The QA path into tech is faster than development — 6–9 months is realistic'],
    relatedSlugs: ['retail-manager-to-frontend-developer', 'github-portfolio-no-experience', 'bootcamp-vs-self-taught-2026'],
  },
  {
    slug: 'free-resources-learn-coding-2026',
    title: 'The 20 best free resources to learn coding in 2026 (ranked and reviewed)',
    metaDescription: 'We completed courses on freeCodeCamp, The Odin Project, CS50, and 17 others so you do not have to guess.',
    category: 'Roadmaps', categoryColor: '#2563eb',
    author: 'James Oduya', authorInitials: 'JO', authorColor: '#7c3aed',
    authorBio: 'Software engineer and technical writer. Has mentored 200+ developers through career transitions.',
    date: 'March 16, 2026', readTime: '8 min read', views: '42.5K views',
    tags: ['free resources', 'learning', 'coding'],
    intro: `There has never been more free coding education available. There has also never been more confusion about what is actually worth your time.\n\nOver the past 18 months, our team and 12 volunteers completed or substantially progressed through each resource on this list. This is not a list of resources we have heard about. We did the work.`,
    sections: [
      { heading: 'Tier 1: Genuinely exceptional — start here', body: `The Odin Project (free, full-stack web development): The best free full-curriculum coding programme we reviewed. The curriculum is well-maintained, the Discord community is active, and graduates consistently produce strong portfolios.\n\nCS50x — Harvard's Introduction to Computer Science (free on edX): The best introduction to computer science fundamentals that exists. Commit to doing the problem sets. Do not skip them.\n\nfreeCodeCamp (free, full curriculum): The most beginner-friendly structured curriculum on the list.\n\nFull Stack Open (free, University of Helsinki): Excellent for JavaScript and React specifically.` },
      { heading: 'Tier 2: Excellent for specific skills', body: `fast.ai — Practical Deep Learning for Coders (free): If you want to get into machine learning, start here.\n\nMDN Web Docs (free): The best technical reference for HTML, CSS, and JavaScript. Every professional web developer uses it daily.\n\nLinux Journey (free): The best free resource for Linux fundamentals. Essential for backend, DevOps, or systems engineering.\n\nSQLZoo (free): The best free resource for learning SQL through practice.\n\nAutomateTheBoringStuff.com (free): The best intermediate Python resource for learners who want to apply skills to real-world tasks.` },
      { heading: 'The learning path we recommend', body: `Weeks 1–4: freeCodeCamp Responsive Web Design certification.\n\nWeeks 5–12: CS50x through week 5 (data structures). Do the problem sets.\n\nWeeks 13–40: The Odin Project, starting from the Foundations path and progressing through the JavaScript/React track.\n\nThroughout: MDN for reference, YouTube for supplemental explanations, and The Odin Project Discord for community support.` },
    ],
    keyTakeaways: ['The Odin Project is the best free full-curriculum programme for web development', 'CS50x builds computational thinking that makes every other resource faster and easier', 'MDN is the definitive reference for HTML, CSS, and JavaScript', 'Community is underrated as a learning tool — isolation is the most common reason people quit'],
    relatedSlugs: ['python-learning-order-beginners', 'bootcamp-vs-self-taught-2026', 'github-portfolio-no-experience'],
  },
  {
    slug: 'remote-tech-career-no-office',
    title: 'No Office? No Problem: Start Your Remote Tech Career Today',
    metaDescription: 'Everything you need to know about landing a remote tech job — from building the right skills to passing remote interviews and getting paid from anywhere.',
    category: 'Career Change', categoryColor: '#10b981',
    author: 'James Oduya', authorInitials: 'JO', authorColor: '#7c3aed',
    authorBio: 'Software engineer and technical writer. Has mentored 200+ developers through career transitions.',
    date: 'April 18, 2026', readTime: '10 min read', views: '7.1K views',
    tags: ['remote work', 'career change', 'tech jobs'],
    intro: `Three years ago, Amara was sitting in Cape Town traffic for two hours every single day. Today she works from her apartment in Tamboerskloof, earns in US dollars, and has not set foot in an office since 2023. She built a specific set of skills, found the right platforms, and learned how remote hiring actually works. This article is everything she wishes she had known.`,
    sections: [
      { heading: 'Why remote tech jobs are genuinely different', body: `Remote work runs on written communication, async updates, and output. Nobody sees you working. They only see what you produce.\n\nCompanies like GitLab, Automattic, and Basecamp have built entire systems around async work — detailed documentation, clear project tracking tools, and written updates instead of meetings. Learning to work in this style is a skill in itself.` },
      { heading: 'The skills that open remote doors fastest', body: `Frontend development — specifically React — has the most remote job postings of any technical skill. The barrier to demonstrating competence is low: you can build and deploy a visible project anyone in the world can open.\n\nCloud and DevOps skills — particularly AWS, Terraform, and Kubernetes — are also heavily remote-friendly.\n\nData roles — analytics, SQL, Python for data — have seen the largest growth in remote postings since 2024.` },
      { heading: 'How to actually find remote tech jobs', body: `OfferZen: built specifically for the African tech market with an explicit international matching service.\n\nWe Work Remotely and Remote.co: every posting is explicitly remote.\n\nWellfound (formerly AngelList): the best place to find remote roles at funded startups.\n\nDirect company career pages: many remote-first companies post jobs on their own sites before job boards.\n\nOne thing almost nobody does: write a public post on LinkedIn explaining what you are looking for and what you have built.` },
      { heading: 'Passing the remote hiring process', body: `Most remote hiring processes start with an async assessment. Treat these as seriously as live interviews. Write clearly. Review your answers. Submit work you are genuinely proud of.\n\nOne thing to prepare for: "how do you communicate when you are stuck?" comes up constantly in remote hiring. Remote companies want to hear that you communicate proactively and ask specific questions rather than vague ones.` },
      { heading: 'Getting paid, taxes, and protecting yourself', body: `If you are in South Africa working for an international company, you will most likely be hired as a contractor. Use Wise (formerly TransferWise) for receiving international payments — it gives you a US or UK bank account number and transfers to your South African account at excellent exchange rates.\n\nFor taxes: you are required to declare all foreign income to SARS. South Africa uses a residence-based tax system. Always insist on a written contract.` },
    ],
    keyTakeaways: ['Remote work runs on written communication and output', 'React, cloud/DevOps, and data skills have the most remote job postings', 'OfferZen, We Work Remotely, and Wellfound outperform generic job boards for remote roles', 'Async take-home assessments are common in remote hiring — treat them seriously', 'Use Wise for international payments; declare all foreign income to SARS'],
    relatedSlugs: ['tech-salaries-south-africa-2026', 'github-portfolio-no-experience', 'retail-manager-to-frontend-developer'],
  },
  {
    slug: 'why-python-best-first-language',
    title: 'Why Python Is the Best First Language for Beginners',
    metaDescription: 'An honest look at why Python beats every other language as a starting point — and the rare cases where a different choice makes more sense.',
    category: 'Roadmaps', categoryColor: '#2563eb',
    author: 'James Oduya', authorInitials: 'JO', authorColor: '#7c3aed',
    authorBio: 'Software engineer and technical writer. Has mentored 200+ developers through career transitions.',
    date: 'April 16, 2026', readTime: '7 min read', views: '5.4K views',
    tags: ['python', 'beginner', 'programming'],
    intro: `I have taught over 200 people to code from scratch. I have seen which languages help beginners build confidence and momentum, and which ones crush them before they ever get started. The answer, consistently and by a wide margin, is Python.`,
    sections: [
      { heading: 'Python reads like English — and that matters more than you think', body: `The hardest part of learning to code is not learning logic — it is the syntax. Python strips almost all of that away. A Python program that prints "hello" is simply: print("hello")\n\nThis matters enormously for beginners because every minute spent fighting syntax is a minute not spent learning to think like a programmer. Python lets you focus on logic from day one.` },
      { heading: 'Python works for almost every career direction', body: `Data science and machine learning: Python is the industry standard. Libraries like pandas, NumPy, scikit-learn, and TensorFlow have made it the default tool.\n\nWeb development: Django and Flask are mature, widely-used frameworks.\n\nAutomation and scripting: Python is the go-to language for automating repetitive tasks.\n\nCybersecurity: many penetration testing tools and security scripts are written in Python.\n\nLearning Python does not lock you into one direction. It opens many.` },
      { heading: 'The job market for Python is real and growing', body: `Python consistently ranks in the top three most in-demand programming languages globally. It appears in more job postings than Java for the first time in 2025.\n\nIn South Africa specifically, Python skills appear in 68% of data science job postings and 45% of automation roles.\n\nPython developers in South Africa earn R650,000–R1,400,000 depending on specialisation.` },
      { heading: 'The learning resources for Python are the best in the industry', body: `The official Python tutorial at docs.python.org is clear and accurate. Automate the Boring Stuff with Python (free online) is the best beginner-to-intermediate programming book of any language. Stack Overflow has more Python questions and answers than any other language.\n\nWhen you Google a Python error message at midnight when you are stuck, you will almost always find a clear answer. Python's community is enormous, active, and patient with beginners.` },
      { heading: 'The honest cases where Python is not the right first language', body: `If your only goal is to build iOS apps, start with Swift.\n\nIf you want to become a frontend web developer specifically, JavaScript is unavoidable — it is the only language that runs in a browser.\n\nIf you are interested in game development with Unity, C# is the language to learn.\n\nFor everyone else — especially anyone not yet sure what direction they want — Python is the right answer.` },
    ],
    keyTakeaways: ['Python reads like plain English — beginners can focus on logic instead of fighting syntax', 'Python is the dominant language in data science, machine learning, and automation', 'Python appears in more job postings than Java for the first time in 2025', 'The community and free resources for Python are the best of any programming language', 'If your goal is iOS apps, frontend, or Unity game dev, another language may be a better starting point'],
    relatedSlugs: ['python-learning-order-beginners', 'free-resources-learn-coding-2026', 'bootcamp-vs-self-taught-2026'],
  },
  {
    slug: 'frontend-developer-without-degree',
    title: 'How to Become a Frontend Developer Without a Degree',
    metaDescription: 'A clear, step-by-step path to your first frontend developer job — no degree, no bootcamp required.',
    category: 'Roadmaps', categoryColor: '#2563eb',
    author: 'Priya Krishnamurthy', authorInitials: 'PK', authorColor: '#7c3aed',
    authorBio: 'Software engineer and technical writer. Writes about practical learning paths for career changers.',
    date: 'April 20, 2026', readTime: '9 min read', views: '6.2K views',
    tags: ['frontend', 'career change', 'self-taught'],
    intro: `A computer science degree takes four years and costs hundreds of thousands of rands. But the skills required to get your first frontend developer job can be learned for free in eight to twelve months if you go about it correctly. Here is the exact sequence that works.`,
    sections: [
      { heading: 'What frontend developers actually do', body: `Frontend development is the part of software that users see and interact with. Frontend developers work mostly with three languages: HTML (structure), CSS (appearance), and JavaScript (interactivity). React is by far the most popular framework right now.\n\nWhat employers actually want from a junior frontend developer without a degree: deployed projects they can click through, understanding of HTML/CSS/JS fundamentals, ability to work with React, and evidence of independent learning. Note what is not on that list: a degree.` },
      { heading: 'Phase 1: HTML and CSS (weeks 1–6)', body: `Start with freeCodeCamp's Responsive Web Design Certification — free, structured, and project-based from the beginning. The certification involves 15 projects. Build all of them.\n\nAlso watch Kevin Powell's CSS tutorials on YouTube. Kevin teaches CSS better than anyone else online and his content is free. CSS is the part that trips most beginners up — Kevin's tutorials will save you enormous frustration.` },
      { heading: 'Phase 2: JavaScript fundamentals (weeks 7–16)', body: `Start with JavaScript.info — the best free JavaScript resource online. It is thorough, accurate, and explains the "why" behind each concept.\n\nBuild after every major concept. After learning arrays: build a shopping list app. After learning functions: build a tip calculator. After learning DOM manipulation: build a quiz game.\n\nThe Odin Project's JavaScript curriculum is also excellent for this phase — more project-focused. Use both together.` },
      { heading: 'Phase 3: React (weeks 17–26)', body: `Start with the official React documentation at react.dev. Work through the tutorial and the "Learn React" section.\n\nThen build. Three React projects is the minimum for a portfolio — ideally a weather app using a real API, a task management app, and one more complex project of your choosing.\n\nLearn to deploy your projects. Vercel and Netlify both offer free hosting. A React project live at a real URL is worth ten that sit in a repository.` },
      { heading: 'Phase 4: The job search (weeks 27 onwards)', body: `Update your LinkedIn headline to "Junior Frontend Developer | React, JavaScript, CSS." Target small companies and startups — they are more open to candidates without degrees than large corporations.\n\nPersonalise every application. A cover letter that says "I noticed your product does X, and I rebuilt a similar feature in my portfolio project — here is the link" gets read.\n\nExpect rejection. Most junior developers apply to 30–60 companies before getting an offer.` },
    ],
    keyTakeaways: ['Frontend developer skills can be learned for free in 8–12 months', 'The portfolio is your credential — deployed projects at real URLs matter more than certificates', 'Phase sequence: HTML/CSS → JavaScript → React → job search', 'Do not start applying until you have at least 3 deployed React projects', 'Target startups and small companies — they are more open to candidates without degrees'],
    relatedSlugs: ['github-portfolio-no-experience', 'retail-manager-to-frontend-developer', 'bootcamp-vs-self-taught-2026'],
  },
  {
    slug: 'resume-mistakes-killing-job-chances',
    title: '5 Resume Mistakes That Are Killing Your Job Chances',
    metaDescription: 'The five most common resume mistakes that cause recruiters to reject applications in under 30 seconds — and exactly how to fix each one.',
    category: 'Interviews', categoryColor: '#db2777',
    author: 'Ayesha Patel', authorInitials: 'AP', authorColor: '#d97706',
    authorBio: 'Ex-recruiter who reviewed 10,000+ developer applications. Writes about the hiring market.',
    date: 'April 22, 2026', readTime: '8 min read', views: '4.8K views',
    tags: ['resume', 'job search', 'hiring'],
    intro: `I spent three years as a technical recruiter reviewing developer resumes. Most resumes — I would estimate 80% — are rejected within 30 seconds. Not because the candidate is unqualified. Because the resume contains one of five specific mistakes that experienced hiring people have learned to filter out instantly.`,
    sections: [
      { heading: 'Mistake 1: Listing responsibilities instead of achievements', body: `A responsibility tells me what your job was. An achievement tells me what you actually did.\n\nInstead of: "Responsible for building and maintaining frontend components."\n\nWrite: "Built a reusable component library used across 4 internal products, reducing new feature development time by an estimated 30%."\n\nFor every bullet point, ask: does this tell someone what my job was, or what I achieved? If the former, rewrite it.` },
      { heading: 'Mistake 2: Using a template that looks like everyone else\'s', body: `When every resume uses the same two-column layout with the same grey sidebar, they blur together. You become forgettable before anyone reads a word.\n\nMake your resume easy to scan in 10 seconds. The 10-second version should communicate: who you are, what kind of role you are looking for, and two or three impressive things about you.\n\nAvoid Canva resumes — the complex multi-column designs often fail applicant tracking systems (ATS).` },
      { heading: 'Mistake 3: A skills section listing every technology you have ever heard of', body: `I have seen resumes that list 40 technologies. This raises a red flag, not a green one.\n\nA better approach: group skills by proficiency level. "Proficient: React, JavaScript, CSS, Node.js. Familiar with: Python, Docker, AWS." This immediately tells a hiring manager what they can rely on you to do.\n\nAlso remove technologies you cannot pass a basic interview question about. Every technology on your resume is fair game.` },
      { heading: 'Mistake 4: No link, no portfolio, no proof', body: `A resume describes what you say you can do. A portfolio proves it. A GitHub link with three strong projects or a personal site with live demos gives hiring managers evidence that your resume is accurate.\n\nMake sure your resume links to your portfolio prominently — in the header, not buried at the bottom. Test the link before every single application.\n\nFor South African developers: an OfferZen profile in addition to a resume is strongly recommended.` },
      { heading: 'Mistake 5: Generic objective statements that say nothing', body: `"Seeking a challenging position where I can leverage my skills and contribute to a dynamic team." I have read it ten thousand times. It adds no value.\n\nInstead, write a three-sentence professional summary: what you are, what you have done (with numbers), and what you are looking for. Three specific sentences beat three lines of platitudes every single time.` },
    ],
    keyTakeaways: ['List achievements, not responsibilities — what you accomplished, not what your job description said', 'Make your resume scannable in 10 seconds', 'Group skills by proficiency level and remove technologies you cannot speak to', 'A portfolio link in the header of your resume is non-negotiable for tech roles', 'Replace generic objective statements with a 3-sentence professional summary that includes specific numbers'],
    relatedSlugs: ['top-interview-questions-tech', 'github-portfolio-no-experience', 'retail-manager-to-frontend-developer'],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // NEW ARTICLES
  // ─────────────────────────────────────────────────────────────────────────────

  {
    slug: 'no-degree-no-experience-tech-job',
    title: 'No Degree, No Experience? Here\'s How You Can Still Get a Tech Job',
    metaDescription: 'A practical, honest guide for people who have no degree and no tech experience — and still want to break into the industry in 2026.',
    category: 'Beginner Tips', categoryColor: '#0284c7',
    author: 'Marcus Adeyemi', authorInitials: 'MA', authorColor: '#ef4444',
    authorBio: 'Career transition specialist. Interviewed 200+ developers about their learning paths over four years.',
    date: 'April 23, 2026', readTime: '11 min read', views: '3.1K views',
    tags: ['no degree', 'beginner', 'career change', 'self-taught'],
    intro: `Let me say something clearly upfront: the idea that you need a computer science degree to get a tech job is one of the most harmful myths circulating among people who want to change careers.\n\nIt is not true. It has not been true for years. And the number of people who believe it and give up before they start is genuinely heartbreaking.\n\nThis guide is for you if you have no degree, no experience, and possibly no clear idea of where to start. By the end, you will have a specific plan — not a vague collection of tips, but a step-by-step path you can actually follow.`,
    sections: [
      {
        heading: 'Why tech genuinely does not care about your degree',
        body: `Most industries use degrees as a filter because they have no better way to assess candidates quickly. Tech is different because the work is demonstrable. Code either runs or it does not. A portfolio either shows you can build things or it does not. A technical interview either reveals understanding or it reveals gaps.\n\nThis is why tech has moved faster than almost any other industry toward skills-based hiring. Major companies including Google, Apple, IBM, and many of the largest tech employers globally have publicly removed degree requirements from most of their job postings.\n\nIn South Africa specifically, the developer shortage is severe enough that companies are actively looking for talented people wherever they can find them. The 2026 OfferZen State of the Developer Nation report found that 34% of developers currently employed in South Africa do not have a computer science degree — and that number has been rising every year.\n\nWhat companies actually use to screen candidates: a portfolio of projects, performance on technical assessments, communication skills demonstrated during interviews, and evidence of the ability to learn independently. None of these require a degree.`
      },
      {
        heading: 'The honest reality of what you are signing up for',
        body: `I want to be direct with you here because a lot of content in this space is unrealistically optimistic.\n\nBreaking into tech without a degree or prior experience is absolutely possible. It is also genuinely hard and takes real time. The realistic range for most people learning part-time (1–2 hours per day) is 9–18 months from starting to first job offer. If you can dedicate 4–6 hours per day, you can compress this to 6–9 months.\n\nYou will hit walls. There will be weeks where nothing makes sense and you question whether you are capable of this. This is not a sign that you cannot do it — it is a normal part of learning. Every developer you admire has been through the same feeling.\n\nYou will also need to manage your own learning in a way that school and university did not require. Nobody will be checking your progress. Nobody will give you a deadline. The people who succeed are not necessarily the smartest — they are the most consistent. One hour per day for a year beats five hours on Saturdays.`
      },
      {
        heading: 'Choosing the right role to target first',
        body: `One of the biggest mistakes beginners make is trying to decide between developer, data analyst, DevOps engineer, UX designer, and cybersecurity all at once, getting overwhelmed, and doing nothing.\n\nYou need to pick one direction. Here is how to think about it.\n\nIf you like the idea of building things people can see and interact with: frontend development is your path. HTML, CSS, JavaScript, React. This is the most beginner-accessible entry point into tech.\n\nIf you are analytical, good with spreadsheets, and interested in data: data analytics is your path. SQL, Excel/Google Sheets, Python basics, and Tableau or Power BI.\n\nIf you enjoy finding problems and breaking things: QA (quality assurance) testing is your path. It has the lowest technical barrier to entry and is chronically understaffed.\n\nIf you are interested in how systems work and want to eventually earn at the top end of the market: cloud and DevOps is your path. Harder and slower to break into at the junior level, but the ceiling is exceptional.\n\nIf security and protecting systems interests you: cybersecurity is your path. We cover this in detail in a separate article.`
      },
      {
        heading: 'The free learning path that actually works',
        body: `Regardless of which direction you choose, the first three months look the same for almost everyone.\n\nWeeks 1–4: Get comfortable with the basics of your chosen area. For developers: freeCodeCamp's HTML/CSS curriculum. For data analysts: Mode Analytics SQL Tutorial. For QA: read "Lessons Learned in Software Testing" by Kaner, Bach, and Pettichord (available used for under R100).\n\nWeeks 5–12: Complete CS50x from Harvard (free on edX). This is not optional. CS50x teaches you how to think computationally — the mental model that makes everything else faster and easier to learn. It is taught by David Malan, who is genuinely one of the best educators in the world. Do the problem sets. Do not just watch the lectures.\n\nWeeks 13 onwards: specialise. Developers move into JavaScript and then React via The Odin Project. Data analysts work through the Google Data Analytics Certificate on Coursera (free to audit). QA testers learn SQL and Postman and start building sample bug reports.\n\nThroughout: build things. The instinct to keep learning before you build is wrong. Build from week four onwards. Even small, ugly, broken things. Building is how you discover what you do not know.`
      },
      {
        heading: 'Building proof of skill without job experience',
        body: `The question everyone asks: how do I prove I can do the job if I have never had the job? The answer is: you build a portfolio of real work.\n\nFor developers: three deployed projects (accessible via URL, not just on GitHub) with proper READMEs explaining what they do and why you built them. One should involve a database. One should use an external API. One should solve a real problem you actually have.\n\nFor data analysts: three data projects on GitHub or Kaggle. Each one should have a clear question ("which product category has the highest return rate?"), a dataset, an analysis, and a clearly communicated finding. Tableau Public or Looker Studio let you publish interactive dashboards for free.\n\nFor QA testers: a portfolio of sample bug reports. Write them for bugs you find in publicly available applications — report them as if you were a professional QA engineer, with steps to reproduce, expected vs actual results, and severity ratings. Five strong bug reports demonstrate more than any certificate.\n\nFor all paths: an active LinkedIn presence where you document your learning journey. Post once a week about what you learned or built. This creates a public record of consistency and growth that hiring managers value.`
      },
      {
        heading: 'Your first job will probably not be what you imagined',
        body: `Set realistic expectations for your first role. Junior tech roles in South Africa for people without degrees typically pay R180,000–R350,000 in the first year, at companies willing to invest in training. This is less than mid-career professionals in your current field might earn, but the trajectory is steep — developers who perform well see rapid salary growth in years two and three.\n\nYour first job is not your career. It is evidence. It proves you can do professional tech work in a real environment. After 12–18 months of experience, you become a dramatically easier candidate to hire and your salary options expand significantly.\n\nApply to smaller companies and startups. They are more likely to take a chance on a career changer with a strong portfolio than large corporations with structured graduate hiring processes. Look for companies that have posted junior roles before — this signals they are willing to develop people rather than only hiring experienced candidates.\n\nBe honest about your background in every interview. Your transition story — why you are making this change, what drove you to it, how you have taught yourself — is genuinely compelling. Interviewers who have spent years hiring developers have heard thousands of standard candidate stories. A thoughtful career changer who can explain their "why" clearly is memorable.`
      },
    ],
    keyTakeaways: [
      '34% of developers in South Africa do not have a computer science degree — and the number is rising',
      'Realistic timeline: 9–18 months part-time or 6–9 months full-time from starting to first job offer',
      'Pick one direction first: frontend dev, data analytics, QA testing, or cloud/DevOps — not all of them',
      'CS50x from Harvard (free on edX) is the single best investment of your first three months',
      'Your portfolio is your credential — deployed projects, data dashboards, or sample bug reports depending on your path',
      'Your first role will probably pay less than your current job — this is normal, and the trajectory from there is steep',
    ],
    relatedSlugs: ['free-resources-learn-coding-2026', 'bootcamp-vs-self-taught-2026', 'github-portfolio-no-experience'],
  },

  {
    slug: 'i-wish-i-knew-before-tech-career',
    title: 'I Wish I Knew This Before Starting My Tech Career',
    metaDescription: 'The honest lessons that experienced developers wish someone had told them at the start — things that would have saved months of frustration.',
    category: 'Beginner Tips', categoryColor: '#0284c7',
    author: 'James Oduya', authorInitials: 'JO', authorColor: '#7c3aed',
    authorBio: 'Software engineer and technical writer. Has mentored 200+ developers through career transitions.',
    date: 'April 23, 2026', readTime: '9 min read', views: '2.8K views',
    tags: ['beginner', 'career advice', 'self-taught', 'lessons'],
    intro: `I asked 40 developers with 3–10 years of experience one question: what do you wish you had known at the very beginning?\n\nThe answers were remarkably consistent. Not "I wish I had learned X language instead of Y." Not "I wish I had gone to a better bootcamp." The lessons that came up again and again were about mindset, habits, and the realities of the industry that nobody thinks to tell beginners.\n\nHere are the ones that matter most.`,
    sections: [
      {
        heading: 'Tutorial hell is real — and it will kill your progress',
        body: `Tutorial hell is what happens when you spend months watching videos and reading documentation and doing guided exercises, feel like you are learning constantly, and then sit down to build something from scratch and realise you cannot do it.\n\nThis is the single most common way beginners waste months or years. You feel productive — you are consuming content, finishing exercises, moving through courses — but you are not actually developing the core skill: building things independently.\n\nThe fix is simple but psychologically uncomfortable: stop consuming and start building far earlier than feels ready. Attempt things you do not know how to do. Get stuck. Google the specific problem. Read the documentation. Attempt again. This cycle — attempt, stuck, search, attempt — is how programming is actually learned.\n\nAs a rough rule: for every hour you spend watching or reading, spend two hours building or attempting to build. If your ratio is the other way around, you are in tutorial hell and your timeline to a job will be much longer than it needs to be.`
      },
      {
        heading: 'You will never feel "ready" — and that is the point',
        body: `Almost every developer I interviewed said some version of: "I waited far too long to apply for jobs because I did not feel ready. I finally applied and got hired, and I spent months after being hired learning on the job."\n\nThis is not a problem with you. It is a structural feature of the industry. Software development moves fast enough that nobody is ever fully ready. Senior developers with fifteen years of experience encounter new problems every week that they have to figure out.\n\nThe job is not "know everything before you start." The job is "learn what you need to, when you need to, quickly and reliably." Companies know this. Good companies are not looking for candidates who know everything — they are looking for candidates who learn fast and communicate clearly.\n\nThis means: start applying before you feel ready. The interview process itself is valuable feedback. You will learn exactly what gaps you need to fill by going through interviews and hearing what employers are actually asking for.`
      },
      {
        heading: 'Your soft skills are more valuable than you think',
        body: `I wish someone had told me at the beginning that communication, writing, and people skills are not "nice to have" in tech — they are often what separates developers who get promoted from developers who do not.\n\nBeing able to explain a technical problem clearly to a non-technical person is rare and valuable. Writing a clear Slack message that gives your team the right context without wasting their time is a skill. Running a productive meeting where decisions actually get made is a skill. None of these are taught in coding courses.\n\nIf you are coming from a non-technical background, pay attention to which skills you developed there that tech teams often lack. Retail managers who became developers consistently mention that their team leadership skills made them stand out. Teachers who went into tech mention that their ability to explain concepts clearly accelerated their career dramatically.\n\nYour background is not a liability. It is a different kind of experience — and in the right environment, that difference is genuinely valuable.`
      },
      {
        heading: 'The fundamentals matter more than the frameworks',
        body: `When you are learning, it is tempting to chase the newest framework, the trendiest library, the most-mentioned tool on Twitter. In 2021 it was Svelte. In 2023 it was Bun. In 2025 it is something else.\n\nFrameworks come and go. The developers who have long, successful careers are the ones who built strong foundations in the fundamentals: how does the web actually work? How do computers represent data? How do networks communicate? How do databases store and retrieve information efficiently?\n\nThese concepts do not change. A developer who deeply understands HTTP can learn any web framework in days. A developer who only knows Next.js is stuck when the industry moves on.\n\nThis means: resist the urge to jump to the newest tool. When you are learning, go deeper on the basics rather than broader across many technologies. Understanding why something works is more valuable than knowing that it works.`
      },
      {
        heading: 'Your network is your most underrated career asset',
        body: `31 of the 50 developers we interviewed for our bootcamp vs self-taught article got their first job through someone they knew. This number surprised me when I first encountered it. It should not have.\n\nTech hiring is relationship-driven at every level. The most coveted roles are often filled through referrals before they are ever publicly posted. Engineering managers hire people whose work they have seen or whose judgment colleagues trust.\n\nYou build this network before you need it. Show up in communities: The Odin Project Discord, local meetups, Twitter/X tech communities, LinkedIn. Help other beginners with problems you have already solved. Share what you are building. Comment thoughtfully on other people's work.\n\nDo this consistently for a year and you will have a network of hundreds of people who have seen your work and your character. When you start your job search, a post saying "I am looking for my first developer role" will generate warm leads from people who already know you and trust your work.`
      },
      {
        heading: 'Comparison is the thief of progress',
        body: `The tech community is highly visible online. You will see 19-year-olds on Twitter posting about being hired at Google. You will see developers who appear to have been coding since they were eight years old. You will see blog posts about developers who went from zero to senior engineer in eighteen months.\n\nMost of these are either misleading, cherry-picked outliers, or both.\n\nThe relevant comparison is not you versus some developer you found on social media. The relevant comparison is you today versus you six months ago. Are you building things you could not build before? Do you understand concepts that previously confused you? Are you solving harder problems?\n\nLearning to code is a long game. It does not reward intensity followed by burnout. It rewards consistency, patience, and the willingness to stay curious even when progress feels invisible. The people who succeed are rarely the fastest learners — they are the ones who do not quit.`
      },
    ],
    keyTakeaways: [
      'Tutorial hell is real — for every hour of content you consume, spend two hours actually building',
      'You will never feel fully ready — start applying earlier than feels comfortable',
      'Soft skills like communication and writing often determine who gets promoted, not just technical skill',
      'Go deep on fundamentals rather than broad across many frameworks — fundamentals outlast every trend',
      'Your network is your most underrated career asset — build it before you need it',
      'The relevant comparison is you six months ago, not some developer you saw on Twitter',
    ],
    relatedSlugs: ['no-degree-no-experience-tech-job', 'free-resources-learn-coding-2026', 'github-portfolio-no-experience'],
  },

  {
    slug: 'stop-applying-blindly-get-hired-faster',
    title: 'Stop Applying Blindly: Do This Instead to Get Hired Faster',
    metaDescription: 'Why mass applications to job boards are the slowest way to get hired — and the targeted strategies that actually work.',
    category: 'Interviews', categoryColor: '#db2777',
    author: 'Ayesha Patel', authorInitials: 'AP', authorColor: '#d97706',
    authorBio: 'Ex-recruiter who reviewed 10,000+ developer applications. Writes about the hiring market.',
    date: 'April 24, 2026', readTime: '10 min read', views: '1.9K views',
    tags: ['job search', 'hiring', 'networking', 'career advice'],
    intro: `I reviewed applications for years. I have seen exactly what happens to resumes sent through job boards — especially the ones sent by candidates who copy-pasted the same cover letter to eighty different companies.\n\nHere is the truth: mass blind applications are one of the least efficient ways to get hired. They feel productive because you are doing something. But the hit rate is brutal, the feedback loop is almost nonexistent, and it can take months of this before anything moves.\n\nThere is a better approach. It requires more thought and more courage upfront, but it works dramatically faster. This is what it looks like.`,
    sections: [
      {
        heading: 'Why blind mass applications almost never work',
        body: `When you apply to a job posting on LinkedIn or Indeed, your application enters a queue with anywhere from fifty to five hundred other applications. At companies without a dedicated recruiter, these applications are often not reviewed at all for the first week or two. Many are filtered by an Applicant Tracking System (ATS) before a human ever sees them.\n\nEven when a recruiter does review your application, the median time spent on a resume before a decision is made is 7.4 seconds, according to eye-tracking studies done by hiring software companies. In those 7.4 seconds, the recruiter is not reading — they are pattern-matching. They are looking for names of companies they recognise, role titles that match what they need, and skills keywords that match the job description.\n\nFor career changers without conventional backgrounds, mass applications to large companies with structured hiring processes are particularly inefficient. These processes are designed to surface candidates who fit the standard profile. If you do not fit the standard profile — and as someone without a degree or without direct experience, you probably do not — you are fighting the system rather than working with it.`
      },
      {
        heading: 'Build a target company list instead of spraying applications',
        body: `The most effective job searchers I observed did not apply to every relevant posting they found. They built a list of 20–40 specific companies they genuinely wanted to work for — companies whose products they used, whose culture seemed aligned with how they worked, whose team size and stage felt right for where they were in their career.\n\nFor each company on the list, they researched deeply: what is the tech stack? Who is on the engineering team? What problems is the company working on? Has the company recently raised funding or announced expansion?\n\nThis research serves two purposes. First, it tells you whether this is genuinely a place you want to work — which matters for longevity and motivation. Second, it gives you the material to write a genuinely personalised outreach message that demonstrates you have done your homework.\n\nA personalised message to a company you have researched outperforms a generic application to a job board posting by a significant margin, consistently, across every study ever done on hiring outcomes.`
      },
      {
        heading: 'Reach out directly before a job is posted',
        body: `The most underused hiring strategy is also one of the most effective: contacting hiring managers directly before they have posted a role.\n\nHere is how it works. Find a company you want to work for. Find the engineering manager or CTO on LinkedIn. Send a short, specific, direct message. Not "I am looking for opportunities" — that gets ignored. Something like: "I have been using your product for three months and noticed that the search results are inconsistently ranked between mobile and desktop. I built a similar search ranking system in a side project — here is the link. I am a React developer actively looking for my first professional role. Would you have 20 minutes to talk about what your team is working on?"\n\nThis message works for three reasons. It demonstrates that you are a user of the product who notices things. It demonstrates technical awareness by pointing to a real observation. It provides proof of skill with a link. And it asks for a conversation, not a job — which is a much lower-stakes ask.\n\nNot everyone will respond. But the response rate to a targeted, specific, well-researched message is dramatically higher than your response rate to a job board application. And the conversations that result are often warm enough that when a role does open, you are already on their radar.`
      },
      {
        heading: 'Use referrals systematically, not accidentally',
        body: `We already know from our bootcamp vs self-taught research that 31 of 50 developers got their first tech job through someone they knew. What this statistic does not capture is how those relationships were built — and whether they were built intentionally.\n\nFor many of the 31, the relationship was accidental. They happened to know someone who happened to mention an opening. For a smaller number, the relationship was intentional. They had spent months building genuine connections in developer communities, helping others, and showing up consistently in a way that made people want to help them.\n\nYou can build this intentionally. Start with your existing network — friends, family, former colleagues — and ask specifically: "Do you know anyone in tech who might be open to a 20-minute conversation about the industry?" Not "do you know of any jobs" — that puts pressure on people to help with something specific they may not be able to do. Conversations are low-stakes.\n\nThen expand your network deliberately. Join The Odin Project Discord. Attend local developer meetups (Johannesburg, Cape Town, Pretoria, and Durban all have active communities). Contribute to open source projects — even small bug fixes put you in contact with project maintainers and contributors who are working developers.`
      },
      {
        heading: 'Use job boards strategically, not as your primary channel',
        body: `Job boards are not useless — they are just not the primary channel. Here is how to use them effectively.\n\nApply to jobs posted within the last 48 hours. Applications submitted within 24–48 hours of posting have a significantly higher chance of being reviewed than applications submitted a week later. Set alerts for your target roles and respond quickly.\n\nApply at smaller companies. A job posting at a ten-person startup will receive dozens of applications. The same posting at a well-known tech company will receive thousands. Your individual application has more weight at a smaller company, and smaller companies are more likely to value a portfolio over a credential.\n\nTailor your application to the specific job description. Read the posting carefully and mirror the language it uses. If the posting says "async communication skills" and your resume says "written communication skills," change yours to match — ATS systems look for keyword matches.\n\nAnd follow up. If you have not heard back within 10 days of applying, a brief, polite follow-up email to the recruiter or hiring manager is appropriate and often noticed. Most candidates never follow up. Being one of the few who does puts your name back in front of someone at no cost.`
      },
      {
        heading: 'Treating the job search like a project with metrics',
        body: `One of the most useful shifts you can make in your job search is treating it like a project you are managing rather than a series of rejections you are surviving.\n\nTrack your numbers. How many targeted outreach messages did you send this week? How many follow-ups? How many applications? How many conversations? How many interviews? These metrics tell you where the bottleneck is.\n\nIf you are sending many applications and getting few responses, the problem is your resume or portfolio — get feedback and iterate. If you are getting responses but not advancing past the first interview, the problem is your interview performance — practice more.\n\nSet a weekly activity target rather than an outcome target. "I will apply for 5 jobs this week" is an outcome target that can be blocked by external factors. "I will send 5 targeted outreach messages, follow up on 3 previous applications, and spend 2 hours on interview practice this week" is an activity target that is entirely within your control.\n\nThe job search is a funnel. More activity at the top means more outcomes at the bottom, provided the quality of your applications is good. Focus on the activities you can control and let the outcomes follow.`
      },
    ],
    keyTakeaways: [
      'Mass blind applications to large companies are the slowest path to a first tech job for career changers',
      'Build a target list of 20–40 specific companies and research each one before applying',
      'Direct outreach to hiring managers before a job is posted has a dramatically higher hit rate than job board applications',
      'Ask your network for conversations, not jobs — it is a lower-stakes request and generates better outcomes',
      'Apply within 48 hours of a job being posted — applications submitted early have significantly higher review rates',
      'Track your job search metrics weekly: outreach sent, responses received, interviews completed, and iterate on the bottleneck',
    ],
    relatedSlugs: ['resume-mistakes-killing-job-chances', 'top-interview-questions-tech', 'github-portfolio-no-experience'],
  },

  {
    slug: 'top-youtube-channels-developers',
    title: 'Top YouTube Channels You Should Follow (Beginner to Advanced)',
    metaDescription: 'The best YouTube channels for learning to code in 2026 — covering networking, web development, Python, JavaScript, and more. Rated for beginner and advanced learners.',
    category: 'Roadmaps', categoryColor: '#2563eb',
    author: 'James Oduya', authorInitials: 'JO', authorColor: '#7c3aed',
    authorBio: 'Software engineer and technical writer. Has mentored 200+ developers through career transitions.',
    date: 'April 24, 2026', readTime: '8 min read', views: '2.4K views',
    tags: ['youtube', 'learning resources', 'beginner', 'coding'],
    intro: `YouTube has become one of the most powerful free learning tools available to anyone entering tech. But the platform is also flooded with low-quality content, clickbait tutorials, and channels that look authoritative but teach outdated or simply wrong things.\n\nThis guide covers the channels that are genuinely worth your time — channels we have evaluated based on accuracy, depth, teaching quality, and how well they prepare you for real work rather than just demos. Each channel is rated for beginner-friendliness and also flagged if it is particularly valuable for more advanced learners.`,
    sections: [
      {
        heading: 'NetworkChuck — Networking, Cybersecurity, Linux',
        body: `Level: Beginner to Intermediate\n\nNetworkChuck is one of the most engaging tech educators on YouTube. His content covers computer networking, Linux, cybersecurity, Python, and cloud fundamentals — with a presentation style that makes genuinely complex topics feel approachable and exciting.\n\nWhat makes him particularly valuable for beginners: he explains concepts through real demonstrations rather than abstract theory. When he explains how a VPN works, he actually sets one up in front of you. When he covers subnetting, he walks through real scenarios rather than formulas on a whiteboard.\n\nBest starting videos: his free CCNA course (networking fundamentals), his "Hacking Google" series (real-world security concepts), and his Linux for beginners playlist. If you are interested in cybersecurity or networking specifically, NetworkChuck should be one of your first subscriptions.`
      },
      {
        heading: 'David Bombal — Networking, Ethical Hacking, Python',
        body: `Level: Intermediate to Advanced\n\nDavid Bombal is one of the most respected voices in networking education on YouTube. He holds multiple Cisco certifications and has been teaching networking professionally for decades. His content goes deeper than NetworkChuck's and requires more baseline knowledge to follow, but the depth is the point.\n\nHis content is particularly valuable for anyone pursuing networking certifications (CCNA, CCNP, CompTIA Network+) or getting into ethical hacking. He interviews leading cybersecurity professionals regularly, giving viewers a realistic picture of what the industry actually looks like.\n\nHe also covers Python for network automation extensively — a growing niche that is extremely well-compensated and relatively uncrowded. If you are a network engineer wanting to automate your work, his Python for network engineers series is specifically relevant.`
      },
      {
        heading: 'Corey Schafer — Python, Django, Git',
        body: `Level: Beginner to Intermediate\n\nCorey Schafer is widely regarded as one of the best Python educators on YouTube — possibly the best. His tutorials are meticulously well-explained, methodically structured, and consistently accurate. He does not make common beginner mistakes, and he does not take shortcuts that would confuse viewers later.\n\nHis Python beginner series is genuinely excellent for complete beginners. His Django series is the best free introduction to Django web development available anywhere. His Git and GitHub tutorials are clear enough that even people who find version control confusing usually get it after watching his series.\n\nThe one limitation: Corey does not post frequently. But the existing catalogue is deep enough that you could spend months working through it. Every video is worth watching — he does not produce filler content.`
      },
      {
        heading: 'Programming with Mosh — Python, JavaScript, React, Node',
        body: `Level: Beginner to Intermediate\n\nProgramming with Mosh (Mosh Hamedani) is one of the most polished coding educators on YouTube. His videos have production quality that rivals paid courses, and his ability to explain complex topics clearly and without jargon is exceptional.\n\nHis most valuable content for beginners: his Python for beginners course (free, 6+ hours), his JavaScript mastery series, and his React and Node.js tutorials. He also offers paid courses through his website (Code with Mosh), but the free YouTube content alone is substantial.\n\nMosh is particularly good at explaining "why" alongside "how" — a quality that is rarer than you would think. Beginners who watch his content come away with genuine understanding rather than just the ability to copy code they do not fully grasp.`
      },
      {
        heading: 'freeCodeCamp.org — Everything, for Free',
        body: `Level: Beginner to Advanced\n\nfreeCodeCamp's YouTube channel is one of the most valuable learning resources on the internet, full stop. It publishes complete courses — not previews, not trailers, but full multi-hour courses — across every major area of software development and data science, entirely for free.\n\nHighlights: a 12-hour Python for beginners course, a complete college-level algorithms course, a full-stack web development course, data science with Python and pandas, machine learning with TensorFlow, and dozens more. The instructors vary (different community contributors teach different courses) but the quality is consistently high.\n\nIf you are serious about learning and cannot afford paid courses, the freeCodeCamp YouTube channel is where you should be spending most of your learning time. It is the closest thing to a free university education in software development that currently exists.`
      },
      {
        heading: 'Traversy Media — Web Development, Full-Stack',
        body: `Level: Beginner to Intermediate\n\nTraversy Media (Brad Traversy) is one of the most prolific and trusted names in web development education on YouTube. He covers HTML, CSS, JavaScript, React, Node, Python, PHP, and a broad range of tools and frameworks with consistent, practical tutorials.\n\nWhat distinguishes Traversy Media: Brad builds complete, realistic projects in his tutorials rather than isolated code snippets. When he teaches REST APIs, he builds a complete API. When he teaches React, he builds a real application. This project-based approach means you end up with working code you can use as a reference or build on.\n\nHe also regularly publishes "crash course" videos — one to two hour deep dives into specific technologies — that are excellent for quickly getting up to speed on a new tool without committing to a full course.`
      },
      {
        heading: 'The Net Ninja — JavaScript, React, Vue, Tailwind',
        body: `Level: Beginner to Intermediate\n\nThe Net Ninja (Shaun Pelling) specialises in frontend web development with a particular strength in JavaScript frameworks. His series-based approach — teaching a technology through a sequence of short, focused videos rather than one long lecture — works exceptionally well for people who prefer learning in shorter sessions.\n\nHis most popular series: JavaScript for beginners, React from scratch, Vue.js tutorial, Tailwind CSS tutorial, and Firebase tutorial. All are free, all are well-structured, and all are kept reasonably up to date.\n\nHe is especially good for visual learners who struggle with long-form content. Each Net Ninja video is typically 10–20 minutes and covers one specific concept — a format that suits commute-based learning or short study sessions.`
      },
      {
        heading: 'Fireship — Fast, Dense, Advanced',
        body: `Level: Intermediate to Advanced\n\nFireship (Jeff Delaney) is different from every other channel on this list. His content is fast, dense, and sometimes satirical — not appropriate for complete beginners. But for intermediate to advanced developers who want to stay current with new technologies and understand concepts quickly, there is almost nothing better.\n\nHis "100 seconds" series explains technologies in under two minutes with clarity and accuracy that takes years of expertise to achieve. His longer deep-dives into specific tools, patterns, or architectural decisions are consistently excellent.\n\nFireship's value is not in teaching you fundamentals — it is in expanding your awareness of what exists and giving you a quick, intelligent introduction before you go deeper elsewhere. Watch him once you have solid foundations. Do not start there.`
      },
    ],
    keyTakeaways: [
      'NetworkChuck is the best starting point for cybersecurity, networking, and Linux beginners',
      'Corey Schafer is arguably the best Python educator on YouTube — start his beginner series before any other Python content',
      'freeCodeCamp.org publishes complete free courses rivalling paid platforms — the most valuable free resource on YouTube',
      'Traversy Media builds complete projects in tutorials, not isolated code snippets — ideal for learning how pieces fit together',
      'The Net Ninja is excellent for visual learners who prefer short focused videos over long lectures',
      'Fireship is for intermediate to advanced developers only — not a starting point but invaluable for staying current',
    ],
    relatedSlugs: ['free-resources-learn-coding-2026', 'python-learning-order-beginners', 'no-degree-no-experience-tech-job'],
  },

  {
    slug: 'how-to-get-into-cybersecurity-beginner-guide',
    title: 'How to Get Into Cybersecurity: The Complete Beginner\'s Guide',
    metaDescription: 'A practical roadmap for breaking into cybersecurity from scratch — the skills, certifications, YouTube channels, and realistic timeline you need to know.',
    category: 'Roadmaps', categoryColor: '#2563eb',
    author: 'Thabo Nkosi', authorInitials: 'TN', authorColor: '#059669',
    authorBio: 'Data analyst tracking tech job market trends. Authors our annual South African salary guides.',
    date: 'April 24, 2026', readTime: '12 min read', views: '2.2K views',
    tags: ['cybersecurity', 'beginner', 'career change', 'networking'],
    intro: `Cybersecurity is one of the fastest-growing areas in tech, one of the most severe talent shortages, and — for the right kind of person — one of the most interesting fields in the industry.\n\nIt is also one of the most misunderstood entry points for beginners. People assume cybersecurity requires advanced programming skills from day one, or years of IT experience, or specialised hardware. None of that is true.\n\nThis guide gives you an honest, practical roadmap — the actual sequence of learning, the certifications that matter, the free resources that work, and the realistic timeline for breaking in.`,
    sections: [
      {
        heading: 'What cybersecurity professionals actually do',
        body: `Cybersecurity is a broad field. People working in it do very different things depending on their specialisation.\n\nDefensive security (also called "blue team"): these professionals protect organisations. They monitor networks for suspicious activity, respond to incidents, implement security controls, and ensure that systems are configured securely. This includes roles like Security Analyst, SOC (Security Operations Centre) Analyst, and Security Engineer.\n\nOffensive security (also called "red team" or "ethical hacking"): these professionals are hired to attack systems with permission to find vulnerabilities before malicious actors do. This includes Penetration Tester, Red Team Operator, and Bug Bounty Hunter.\n\nGovernance, Risk, and Compliance (GRC): these professionals ensure organisations comply with security regulations, manage risk frameworks, and develop security policies. This path requires less hands-on technical skill and more process and documentation expertise.\n\nFor most beginners without a technical background, the realistic entry point is a SOC Analyst role or a GRC role. Penetration testing and red teaming typically require more foundational experience and are harder to break into at the junior level.`
      },
      {
        heading: 'The foundational skills every beginner needs first',
        body: `Before you learn anything security-specific, you need foundations. Security professionals who skip these foundations hit walls constantly because they do not understand what they are trying to protect or attack.\n\nNetworking fundamentals: you need to understand how data moves across networks. TCP/IP, DNS, HTTP/HTTPS, firewalls, routers, switches, and the OSI model. These are not optional — they are the language of cybersecurity. Start with the CompTIA Network+ curriculum or David Bombal's and NetworkChuck's YouTube content.\n\nLinux: most security tools run on Linux. Most servers run Linux. You need to be comfortable navigating the command line, managing files and permissions, understanding processes, and writing basic shell scripts. Linux Journey (linuxjourney.com) is free and excellent.\n\nBasic programming: you do not need to be a developer, but you need to read code and write basic scripts. Python is the most relevant language for security — it is used for automation, tool development, and scripting. Spend 4–6 weeks on Python basics before moving into security-specific content.`
      },
      {
        heading: 'The certifications that actually matter',
        body: `CompTIA Security+: this is the entry-level certification that most hiring managers recognise and many job postings specifically list. It validates foundational security knowledge across a broad range of domains. It is vendor-neutral (not specific to one company's products) and is required or preferred by many government and corporate security positions. Cost: approximately R8,000–R12,000 for the exam. Study time: 3–4 months part-time.\n\nCompTIA Network+: if your networking knowledge is weak, do this before Security+. It builds the network fundamentals that Security+ assumes you already have.\n\nGoogle Cybersecurity Certificate (Coursera): a newer certification that is gaining recognition quickly. It costs approximately R200/month to access on Coursera and can be completed in 3–6 months. It is more hands-on than CompTIA Security+ and covers practical tools. Several South African graduates of this programme have reported it helped them land their first SOC analyst roles.\n\nEC-Council CEH (Certified Ethical Hacker): relevant if you want to move into penetration testing eventually. This is not a beginner certification — do CompTIA Security+ first.\n\nTryHackMe and Hack The Box: these are not certifications but hands-on practice platforms. TryHackMe is more beginner-friendly. Hack The Box is more advanced. Both are widely recognised in the industry as proof of hands-on skill — often more compelling to technical hiring managers than a certificate alone.`
      },
      {
        heading: 'The best free YouTube channels for cybersecurity',
        body: `NetworkChuck: the most beginner-friendly cybersecurity educator on YouTube. His content covers networking fundamentals, Linux, ethical hacking basics, and security concepts in a format that is genuinely engaging without sacrificing accuracy. Start here.\n\nDavid Bombal: deeper and more technical than NetworkChuck. Essential for anyone pursuing networking certifications or getting into serious ethical hacking. His interviews with industry professionals give an unusually honest picture of what cybersecurity careers actually look like day to day.\n\nJohn Hammond: one of the best ethical hacking educators on YouTube. His CTF (Capture the Flag) walkthroughs are excellent for developing practical hacking skills. More advanced than NetworkChuck or David Bombal but worth progressing to.\n\nTCM Security (The Cyber Mentor): Heath Adams runs one of the most practically oriented cybersecurity channels on YouTube. His free ethical hacking course is one of the most comprehensive free penetration testing resources available. He also offers affordable paid courses if you want to go deeper.\n\nBlack Hills Information Security: professional-level webinars and talks from working security professionals. Not for beginners, but invaluable once you have the foundations.`
      },
      {
        heading: 'Building hands-on skills without a job',
        body: `Cybersecurity employers care more about demonstrated hands-on skill than almost any other area of tech. A candidate who can show they have solved real security challenges is far more compelling than a candidate with only certificates.\n\nTryHackMe: start here. The learning paths for absolute beginners are well-structured and the browser-based labs mean you do not need to set up any software. Complete the "Pre-Security" and "SOC Level 1" learning paths. These are directly relevant to your first job.\n\nCapture the Flag (CTF) competitions: these are online security competitions where you solve real security challenges to find hidden "flags." They are how security professionals develop and demonstrate practical skills. Platforms: CTFtime.org lists active competitions. picoCTF is beginner-friendly. HackTheBox and TryHackMe also run CTF events.\n\nHome lab: as you develop more skills, set up a home lab using virtual machines (VirtualBox or VMware, both free). Practice attacking and defending in a controlled environment. This is where the real learning happens — and it gives you specific stories to tell in interviews.\n\nDocument everything: write up your CTF solutions, your home lab configurations, your learnings. A blog, a GitHub repository, or even LinkedIn posts demonstrating what you have been working on is proof of skill that stands out dramatically from a candidate who has only studied.`
      },
      {
        heading: 'Realistic timeline and salary expectations',
        body: `Timeline: from zero to first cybersecurity job typically takes 12–24 months for someone learning part-time. This is longer than web development, which reflects the depth of foundational knowledge required. However, the salary premium in cybersecurity is significant — the investment in time pays off faster than it might appear.\n\nFor South Africa specifically: junior SOC Analyst roles typically start at R280,000–R450,000. Mid-level Security Analysts with 2–3 years of experience earn R600,000–R950,000. Senior penetration testers and security engineers earn R1,000,000–R2,000,000+.\n\nFor international remote roles: cybersecurity is particularly in demand globally. Junior security analysts working remotely for US or European companies can realistically earn $50,000–$80,000 USD, with senior roles reaching $120,000–$200,000+.\n\nThe talent shortage in cybersecurity globally is severe and is projected to continue for at least the next decade. Every organisation that handles data (which is every organisation) needs security professionals, and the supply of qualified people is far below the demand. If you commit to this path and develop genuine competence, the employment prospects are exceptional.`
      },
    ],
    keyTakeaways: [
      'The realistic entry point for most beginners is SOC Analyst or GRC — not penetration testing',
      'Master networking fundamentals, Linux, and basic Python before learning anything security-specific',
      'CompTIA Security+ is the most widely recognised entry-level certification — 3–4 months of part-time study',
      'TryHackMe is the best hands-on practice platform for beginners — complete the SOC Level 1 learning path',
      'NetworkChuck and David Bombal are the two best free YouTube resources for cybersecurity beginners',
      'Junior SOC Analysts in South Africa earn R280K–R450K; remote roles for international companies can reach $50K–$80K USD',
    ],
    relatedSlugs: ['top-youtube-channels-developers', 'no-degree-no-experience-tech-job', 'free-resources-learn-coding-2026'],
  },

  {
    slug: 'best-tech-bootcamps-south-africa',
    title: 'Best Tech Bootcamps in South Africa — The Top Options Reviewed',
    metaDescription: 'An honest review of the best coding bootcamps available in South Africa in 2026 — covering cost, curriculum, job outcomes, and who each one is right for.',
    category: 'Beginner Tips', categoryColor: '#0284c7',
    author: 'Marcus Adeyemi', authorInitials: 'MA', authorColor: '#ef4444',
    authorBio: 'Career transition specialist. Interviewed 200+ developers about their learning paths over four years.',
    date: 'April 24, 2026', readTime: '11 min read', views: '3.6K views',
    tags: ['bootcamp', 'South Africa', 'career change', 'learning'],
    intro: `If you have decided that a structured bootcamp experience is right for you — rather than self-directed learning — choosing the right programme in South Africa is a significant decision. The cost difference between options can be R100,000 or more. The job placement outcomes vary dramatically. And not every bootcamp is honest about either.\n\nThis guide is based on interviews with 45 South African bootcamp graduates, publicly available outcome data, and our own assessment of curriculum quality. We have tried to give you the information you need to make an informed decision — not marketing copy.`,
    sections: [
      {
        heading: 'WeThinkCode_ — Cape Town and Johannesburg',
        body: `Cost: Free (competitive admission process)\nDuration: 2 years\nFocus: Software development (Python, Java, full-stack)\n\nWeThinkCode_ is consistently cited as one of the most respected coding programmes in South Africa, and its free model makes it uniquely accessible. It is not a bootcamp in the traditional sense — it is closer to a two-year educational programme with a heavy emphasis on peer-to-peer learning (similar to the French 42 school model).\n\nAdmission is highly competitive and based on a logic and problem-solving assessment, not prior technical experience or academic qualifications. This makes it genuinely accessible to people from non-traditional backgrounds.\n\nThe trade-off for the free model: it requires a two-year commitment and the self-directed nature of the programme is not for everyone. Graduates who succeed are typically highly self-motivated. The outcomes are strong — WeThinkCode_ graduates are well-regarded by South African employers and the programme has established partnerships with major companies.\n\nBest for: motivated learners who can commit to two years, live near Cape Town or Johannesburg, and want a rigorous, well-credentialed programme without the financial cost.`
      },
      {
        heading: 'HyperionDev — Online, South Africa-based',
        body: `Cost: R20,000–R65,000 depending on programme\nDuration: 3–6 months\nFocus: Web development, data science, software engineering\n\nHyperionDev is one of the most widely known bootcamps in South Africa, and it operates in partnership with Edinburgh University — a credentialing arrangement that carries weight with some employers.\n\nThe programmes are online and mentor-supported, which suits working professionals who need flexibility. The curriculum is up-to-date and covers relevant technologies (JavaScript, React, Python, Django, SQL).\n\nFrom our graduate interviews: the quality of the mentoring experience varies significantly depending on which mentor you are assigned. Some graduates reported excellent, responsive mentorship; others felt the feedback was generic. The Edinburgh partnership adds credibility on a CV, which matters for some employers.\n\nJob placement support exists but graduates report it is better described as job search support (resume review, interview prep) than active placement (company introductions). Manage expectations accordingly.\n\nBest for: working professionals who need a flexible, structured programme with a recognisable name and cannot commit to a full-time in-person experience.`
      },
      {
        heading: 'CodeSpace Academy — Cape Town',
        body: `Cost: R45,000–R80,000\nDuration: 6 months (full-time)\nFocus: Software development, web development\n\nCodeSpace Academy is based in Cape Town and offers a full-time, in-person (and hybrid) programme with a strong focus on JavaScript and web development. It is smaller than HyperionDev, which means more personalised attention and a tighter community experience.\n\nGraduates consistently cite the cohort experience as a major differentiator — learning alongside others in a structured environment creates accountability and community that online programmes cannot fully replicate.\n\nThe curriculum is practically focused: students build multiple real projects over the programme and finish with a portfolio. Employer connections in the Cape Town tech ecosystem are one of CodeSpace's genuine strengths — they have established relationships with local companies that recruit directly from the programme.\n\nThe cost is significant and there is no income share arrangement available. The in-person requirement means it is not accessible to people outside Cape Town.\n\nBest for: Cape Town-based learners who can make the financial investment and want the accountability and community of an in-person cohort experience.`
      },
      {
        heading: 'Umuzi — Johannesburg',
        body: `Cost: Free (income share or employer-sponsored in some cases)\nDuration: 12 months\nFocus: Software development, data engineering, UX design\n\nUmuzi is a social enterprise that runs a competitive admissions programme targeting talented young people from disadvantaged backgrounds in South Africa. The programme is free for accepted candidates — costs are covered through employer partnerships and income share arrangements.\n\nThe programme is longer than most bootcamps (12 months) and includes significant professional development alongside the technical curriculum. Graduates are placed with partner employers for part of the programme, giving them real work experience before graduation.\n\nUmuzi is selective (admission is competitive) and has a specific social mission — it is not positioned as a general bootcamp but as an intervention designed to create pathways for people who would not otherwise have access to tech careers.\n\nBest for: talented learners who face financial barriers to paid programmes and are based in Johannesburg. The competitive admission process means not everyone will be accepted, but for those who are, it is one of the most comprehensive pathways in the country.`
      },
      {
        heading: 'The Dev Academy and other online global options',
        body: `South African learners increasingly have access to globally respected bootcamps that operate online. App Academy Open (free), Flatiron School, and General Assembly all offer programmes accessible from South Africa.\n\nHowever, it is worth noting that globally-oriented bootcamps optimise for the US and European job market. If you intend to work for a South African company, locally-known programmes (WeThinkCode_, HyperionDev, CodeSpace) may have stronger employer recognition. If you intend to target international remote roles, globally-known programmes may give you an edge.\n\nOur strong recommendation: before committing to any paid bootcamp, complete 3–4 months of free self-study (The Odin Project, freeCodeCamp, CS50x) and assess honestly whether you need a structured programme. Many people who pay R60,000 for a bootcamp would have gotten the same outcome with free resources and more patience. If after 3–4 months of self-study you are genuinely struggling to maintain motivation and direction, then a paid bootcamp's structure is worth the investment.`
      },
      {
        heading: 'Questions to ask any bootcamp before you commit',
        body: `What percentage of graduates are employed in tech roles within 6 months of graduation? Ask for this number specifically. Any credible programme should have this data.\n\nWhat is the definition of "employed" in their outcomes data? "Employed" can mean a full-time developer role, a part-time contract, an internship, or a customer service job at a tech company. These are very different outcomes.\n\nCan I speak to 3 graduates from the last cohort who are willing to talk to me? Bootcamps will always point you to their most successful graduates. Ask to speak to a random selection, not handpicked success stories.\n\nWhat does the curriculum look like in the last month of the programme? By the end, students should be building substantial projects and preparing portfolios — not completing small exercises. Programmes that spend the final month on tutorials rather than portfolio projects are not preparing you for interviews.\n\nWhat job placement support is included and for how long after graduation? Some programmes offer alumni career support for 6–12 months post-graduation. Others end their support the day you graduate.`
      },
    ],
    keyTakeaways: [
      'WeThinkCode_ is free, rigorous, and highly regarded — competitive admission but no cost barrier',
      'HyperionDev is the most flexible option for working professionals and has Edinburgh University credentialing',
      'CodeSpace Academy is best for Cape Town learners who want an in-person cohort experience',
      'Umuzi is a free programme for Johannesburg learners from disadvantaged backgrounds with strong employer placement',
      'Always ask for specific, verifiable job placement rates before committing to any paid bootcamp',
      'Do 3–4 months of free self-study before committing to a paid bootcamp — many people do not need one',
    ],
    relatedSlugs: ['bootcamp-vs-self-taught-2026', 'no-degree-no-experience-tech-job', 'free-resources-learn-coding-2026'],
  },

  {
    slug: 'best-global-free-learning-platforms',
    title: 'Best Global Free Learning Platforms for Tech in 2026',
    metaDescription: 'A comprehensive guide to the best free global learning platforms for tech — ranked and reviewed so you know exactly where to spend your learning time.',
    category: 'Roadmaps', categoryColor: '#2563eb',
    author: 'James Oduya', authorInitials: 'JO', authorColor: '#7c3aed',
    authorBio: 'Software engineer and technical writer. Has mentored 200+ developers through career transitions.',
    date: 'April 24, 2026', readTime: '10 min read', views: '2.7K views',
    tags: ['free resources', 'learning platforms', 'online learning', 'coding'],
    intro: `The quality and quantity of free learning available for tech in 2026 is genuinely staggering. You can learn to build web applications, work with machine learning, manage cloud infrastructure, or get into cybersecurity without spending a single rand — if you know where to look and how to use these platforms effectively.\n\nThis guide reviews the best global platforms we have evaluated, explains what each one is genuinely good for, and gives you a clear recommendation on how to combine them into an effective learning path.`,
    sections: [
      {
        heading: 'The Odin Project — Best for Full-Stack Web Development',
        body: `Cost: Completely free\nBest for: Anyone who wants to become a web developer\nLevel: Beginner to intermediate\n\nThe Odin Project is the single best free, structured, full-stack web development programme available anywhere. It covers HTML, CSS, JavaScript, React, Node.js, databases, and deployment — the complete stack needed for a junior developer role.\n\nWhat makes it exceptional: it is intentionally difficult in the right way. Rather than guiding you through every step, it puts you in situations where you must figure things out yourself — exactly as real developer work requires. The community Discord is one of the most active and helpful free learning communities anywhere.\n\nIt is not a passive learning experience. You will be frustrated. You will get stuck. This is the feature, not a bug. Graduates of The Odin Project consistently produce stronger portfolios and perform better in technical interviews than graduates of more hand-holding platforms.\n\nTime to complete the full curriculum: 12–18 months at 1–2 hours per day.`
      },
      {
        heading: 'freeCodeCamp — Best for Structured Certification and Variety',
        body: `Cost: Completely free\nBest for: Beginners who need structure and want certifications\nLevel: Beginner\n\nfreeCodeCamp offers structured, interactive learning paths with certification at the end of each track. The Responsive Web Design, JavaScript Algorithms, and Front End Libraries certifications are the most valuable for web developers.\n\nThe interactive format — you write code directly in the browser and get immediate feedback — is more forgiving and beginner-friendly than The Odin Project's self-directed approach. This is where most complete beginners should start.\n\nThe certifications themselves carry moderate weight with employers — they demonstrate completion and basic competency but are not sufficient alone to get hired. Pair freeCodeCamp certifications with a strong portfolio of deployed projects.\n\nfreeCodeCamp also has an extensive YouTube channel (separate from the platform) with full-length courses on almost every tech topic.`
      },
      {
        heading: 'CS50x (Harvard) — Best for Computer Science Fundamentals',
        body: `Cost: Free to audit; certificate costs approximately R2,000\nBest for: Anyone who wants to genuinely understand how computers work\nLevel: Beginner to intermediate (the course itself covers a wide range)\n\nCS50x is Harvard University's Introduction to Computer Science, available free through edX. It is taught by David Malan, who is widely regarded as one of the best programming educators alive.\n\nThe course covers C, Python, SQL, JavaScript, and HTML/CSS — not as separate isolated topics but as a progression that teaches you how to think about problems at every level of abstraction. By the end, you understand memory management, data structures, algorithms, databases, and web development — all built on a foundation that makes everything else easier to learn.\n\nThis is the one course we recommend to almost every beginner regardless of their ultimate career path. The mental models CS50x installs are worth more than any specific technical skill you will acquire in the early months.`
      },
      {
        heading: 'Coursera and edX — Best for University-Grade Courses',
        body: `Cost: Free to audit most courses; certificates cost R2,000–R8,000 each\nBest for: Learners who want credentialed learning from recognised institutions\nLevel: Varies by course\n\nCoursera and edX both offer courses from leading universities and companies including Google, IBM, Microsoft, Stanford, MIT, and Johns Hopkins — available to audit for free (no certificate).\n\nHighlights worth knowing about: the Google Data Analytics Certificate (Coursera) is one of the most recognised entry-level data analytics credentials with South African employers. The Google Cybersecurity Certificate (Coursera) is gaining recognition quickly. The IBM Data Science Professional Certificate covers Python, SQL, machine learning, and data visualisation comprehensively.\n\nThe audit option (free, no certificate) is sufficient for learning purposes. The paid certificate option is worth considering if you need the credential to satisfy a job requirement or want the structured deadline pressure of a paid course.`
      },
      {
        heading: 'Khan Academy and MIT OpenCourseWare — Best for Deep Fundamentals',
        body: `Cost: Completely free\nBest for: Filling in mathematical and computer science fundamentals\nLevel: Beginner to advanced\n\nKhan Academy's computer science and mathematics content is excellent for filling gaps in foundational knowledge. If you find yourself struggling with concepts in programming courses because your mathematics is weak, Khan Academy's Algebra, Statistics, and Linear Algebra courses will close those gaps fast.\n\nMIT OpenCourseWare publishes actual MIT course materials — lecture notes, problem sets, exams — for free. The Introduction to Algorithms course and the Introduction to Computer Science courses are particularly relevant for developers who want to go deep on computer science theory.\n\nNeither platform is a starting point for most beginners — they are resources to reach for when you hit a conceptual wall that requires going back to first principles.`
      },
      {
        heading: 'TryHackMe and Hack The Box — Best for Cybersecurity',
        body: `Cost: Free tier available; premium from R100–R200/month\nBest for: Anyone pursuing cybersecurity\nLevel: Beginner (TryHackMe) to advanced (Hack The Box)\n\nFor cybersecurity specifically, TryHackMe and Hack The Box are the most effective learning platforms available at any price point. Both offer browser-based lab environments where you practice real security techniques against intentionally vulnerable systems.\n\nTryHackMe is the right starting point. The learning paths for complete beginners are well-structured, the interface is forgiving, and the community is supportive. The free tier gives you access to enough content to spend weeks learning before you need to consider paying.\n\nHack The Box is more advanced and less hand-holding. It is where you go once you have TryHackMe fundamentals and want harder challenges that more closely resemble real penetration testing work.\n\nBoth platforms are explicitly valued by security hiring managers as proof of hands-on skill — more so than most certifications. A candidate who has completed TryHackMe's SOC Level 1 path is demonstrably more prepared for a SOC analyst role than a candidate who has only studied theory.`
      },
      {
        heading: 'Kaggle — Best for Data Science and Machine Learning',
        body: `Cost: Completely free\nBest for: Data science and machine learning learners\nLevel: Beginner to advanced\n\nKaggle is both a learning platform and a competition platform for data science and machine learning. The free micro-courses covering Python, pandas, SQL, machine learning, and deep learning are concise, practical, and taught by experts from the field.\n\nBeyond the courses, Kaggle's value lies in its datasets and competitions. Building a data science portfolio means working with real datasets and producing real analyses — Kaggle has thousands of publicly available datasets on every topic imaginable, and the competition format gives you a structured goal to work toward.\n\nA strong Kaggle profile — active notebooks, competition participation, and community contributions — is a recognised signal of data science skill that employers look for. It is the data science equivalent of a strong GitHub profile for software developers.`
      },
    ],
    keyTakeaways: [
      'The Odin Project is the best free full-stack web development curriculum — difficult by design, excellent in outcome',
      'freeCodeCamp is the most beginner-friendly starting point with structured certifications',
      'CS50x from Harvard is the single most valuable course for building foundational computer science thinking',
      'Google Data Analytics and Google Cybersecurity Certificates on Coursera are employer-recognised and can be audited for free',
      'TryHackMe is the most effective hands-on cybersecurity learning platform for beginners',
      'Kaggle is the essential platform for data science learners — courses, datasets, and a portfolio all in one place',
    ],
    relatedSlugs: ['free-resources-learn-coding-2026', 'top-youtube-channels-developers', 'no-degree-no-experience-tech-job'],
  },
]

const fallbackArticle = (slug: string): ArticleData => ({
  slug, title: 'Article coming soon',
  metaDescription: '', category: 'Career Change', categoryColor: '#2563eb',
  author: 'CareerPathGuide', authorInitials: 'CP', authorColor: '#2563eb',
  authorBio: 'The CareerPathGuide team.',
  date: 'Coming soon', readTime: '—', views: '—', tags: [],
  intro: 'This article is being written. Check back soon.',
  sections: [], keyTakeaways: [], relatedSlugs: [],
})

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const article = articles.find(a => a.slug === slug) || fallbackArticle(slug || '')
  const related = articles.filter(a => article.relatedSlugs.includes(a.slug))
  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .pp{background:#f9f8f5;font-family:'DM Sans',sans-serif;min-height:100vh}
        .pw{max-width:760px;margin:0 auto;padding:40px 24px 100px}
        .pb{display:inline-flex;align-items:center;gap:6px;font-size:.82rem;font-weight:500;color:#6b7280;text-decoration:none;margin-bottom:28px;transition:color .2s}
        .pb:hover{color:#111}
        .pcat{display:inline-flex;padding:3px 12px;border-radius:99px;font-size:.7rem;font-weight:700;margin-bottom:14px}
        .ph1{font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,4vw,2.5rem);font-weight:400;color:#111;line-height:1.2;margin-bottom:18px}
        .pmr{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:28px}
        .pmi{font-size:.75rem;color:#9ca3af;display:flex;align-items:center;gap:4px}
        .as{display:flex;align-items:center;gap:12px;padding:16px 20px;background:#fff;border-radius:12px;border:1px solid #ebebeb;margin-bottom:32px}
        .av{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.85rem;font-weight:700;flex-shrink:0}
        .an{font-size:.88rem;font-weight:600;color:#111}
        .ab{font-size:.75rem;color:#6b7280;margin-top:2px}
        .ab2{background:#fff;border-radius:16px;border:1px solid #ebebeb;padding:32px;margin-bottom:24px}
        .ai{font-size:1.02rem;color:#374151;line-height:1.85;font-weight:300;margin-bottom:28px;white-space:pre-line;border-bottom:1px solid #f3f4f6;padding-bottom:28px}
        .asec{margin-bottom:28px}
        .asec h2{font-family:'Instrument Serif',serif;font-size:1.3rem;font-weight:400;color:#111;margin-bottom:12px;line-height:1.3}
        .asec p{font-size:.9rem;color:#374151;line-height:1.9;font-weight:300;white-space:pre-line}
        .sd{border:none;border-top:1px solid #f0f0f0;margin:24px 0}
        .kb{background:#eff6ff;border-radius:14px;border:1px solid #bfdbfe;padding:22px;margin-top:24px;margin-bottom:24px}
        .kb h3{font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#1d4ed8;margin-bottom:12px}
        .ki{display:flex;align-items:flex-start;gap:10px;margin-bottom:9px}
        .ki p{font-size:.85rem;color:#1e3a5f;line-height:1.6}
        .tr{display:flex;flex-wrap:wrap;gap:6px;padding-top:20px;border-top:1px solid #f0f0f0}
        .tc{padding:4px 12px;border-radius:99px;font-size:.72rem;font-weight:500;background:#f3f4f6;color:#374151;border:1px solid #e5e7eb;text-decoration:none}
        .rw{margin-top:36px}
        .rt{font-size:.75rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#6b7280;margin-bottom:14px}
        .rg{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
        .rc{background:#fff;border-radius:14px;border:1px solid #ebebeb;padding:16px;text-decoration:none;color:inherit;transition:all .2s;display:block}
        .rc:hover{box-shadow:0 6px 20px rgba(0,0,0,.07);transform:translateY(-2px)}
        .rc h4{font-family:'Instrument Serif',serif;font-size:.92rem;font-weight:400;color:#111;line-height:1.4;margin-top:8px}
        .rm{font-size:.7rem;color:#9ca3af;margin-top:5px}
      `}</style>
      <div className="pp">
        <div className="pw">
          <Link to="/blog" className="pb"><ArrowLeft size={14} /> Back to blog</Link>
          <div className="pcat" style={{ background: `${article.categoryColor}15`, color: article.categoryColor, border: `1px solid ${article.categoryColor}30` }}>{article.category}</div>
          <h1 className="ph1">{article.title}</h1>
          <div className="pmr">
            <span className="pmi"><Clock size={12} /> {article.readTime}</span>
            <span className="pmi">{article.date}</span>
            <span className="pmi">{article.views}</span>
          </div>
          <div className="as">
            <div className="av" style={{ background: `${article.authorColor}18`, color: article.authorColor, border: `2px solid ${article.authorColor}30` }}>{article.authorInitials}</div>
            <div><div className="an">{article.author}</div><div className="ab">{article.authorBio}</div></div>
          </div>
          <div className="ab2">
            <p className="ai">{article.intro}</p>
            {article.sections.map((s, i) => (
              <div key={i} className="asec">
                <h2>{s.heading}</h2>
                <p>{s.body}</p>
                {i < article.sections.length - 1 && <hr className="sd" />}
              </div>
            ))}
            {article.keyTakeaways.length > 0 && (
              <div className="kb">
                <h3>Key takeaways</h3>
                {article.keyTakeaways.map((point, i) => (
                  <div key={i} className="ki"><CheckCircle size={15} color="#2563eb" style={{ flexShrink: 0, marginTop: 2 }} /><p>{point}</p></div>
                ))}
              </div>
            )}
            <div className="tr">{article.tags.map(tag => <Link key={tag} to={`/blog?tag=${tag}`} className="tc">{tag}</Link>)}</div>
          </div>
          {related.length > 0 && (
            <div className="rw">
              <p className="rt">Related articles</p>
              <div className="rg">
                {related.map(r => (
                  <Link key={r.slug} to={`/blog/${r.slug}`} className="rc">
                    <span style={{ display: 'inline-flex', padding: '3px 10px', borderRadius: 99, fontSize: '.65rem', fontWeight: 700, background: `${r.categoryColor}15`, color: r.categoryColor, border: `1px solid ${r.categoryColor}25` }}>{r.category}</span>
                    <h4>{r.title}</h4>
                    <p className="rm">{r.readTime} · {r.views}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default BlogPostPage