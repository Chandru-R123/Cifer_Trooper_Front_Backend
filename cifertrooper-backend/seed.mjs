// Plain ESM seed — run with: node seed.mjs
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cifertrooper';

const UserSchema = new mongoose.Schema({ name: String, email: { type: String, unique: true }, password: String, role: { type: String, default: 'user' }, isActive: { type: Boolean, default: true } }, { timestamps: true });
const PageSchema = new mongoose.Schema({ slug: { type: String, unique: true }, title: String, content: mongoose.Schema.Types.Mixed, isPublished: { type: Boolean, default: true } }, { timestamps: true });
const ServiceSchema = new mongoose.Schema({ slug: { type: String, unique: true }, title: String, description: String, image: String, isPublished: { type: Boolean, default: true }, order: Number }, { timestamps: true });
const CourseSchema = new mongoose.Schema({ slug: { type: String, unique: true }, title: String, description: String, image: String, price: Number, duration: String, level: String, instructor: String, curriculum: mongoose.Schema.Types.Mixed, isPublished: { type: Boolean, default: true }, tags: [String] }, { timestamps: true });
const ProductSchema = new mongoose.Schema({ slug: { type: String, unique: true }, title: String, description: String, price: Number, comparePrice: Number, images: [String], category: String, stock: Number, isPublished: { type: Boolean, default: true }, tags: [String] }, { timestamps: true });

const User = mongoose.model('User', UserSchema);
const Page = mongoose.model('Page', PageSchema);
const Service = mongoose.model('Service', ServiceSchema);
const Course = mongoose.model('Course', CourseSchema);
const Product = mongoose.model('Product', ProductSchema);

const hash = async (p) => bcrypt.hash(p, 12);

// ── Users ──────────────────────────────────────────────────────────────────
const USERS = [
  { name: 'Admin User',    email: 'admin@cifertrooper.com',   role: 'admin',  password: 'Admin@1234'  },
  { name: 'Editor User',   email: 'editor@cifertrooper.com',  role: 'editor', password: 'Editor@1234' },
  { name: 'Ravi Kumar',    email: 'ravi@example.com',         role: 'user',   password: 'User@1234'   },
  { name: 'Priya Sharma',  email: 'priya@example.com',        role: 'user',   password: 'User@1234'   },
  { name: 'Arjun Nair',    email: 'arjun@example.com',        role: 'user',   password: 'User@1234'   },
  { name: 'Sneha Patel',   email: 'sneha@example.com',        role: 'user',   password: 'User@1234'   },
  { name: 'Dev Ops Lead',  email: 'devops@cifertrooper.com',  role: 'editor', password: 'Editor@1234' },
];

// ── Pages ──────────────────────────────────────────────────────────────────
const PAGES = [
  {
    slug: 'home', title: 'Home',
    content: {
      hero: { heading: 'Cyber Excellence.', subheading: 'Master the most advanced security techniques with our industry-standard programs. From beginner fundamentals to elite red teaming.', cta: 'Explore Courses' },
      stats: [{ label: 'Expert Instructors', value: '15+' }, { label: 'Hands-on Modules', value: '600+' }, { label: 'Students Certified', value: '3000+' }, { label: 'Success Rate', value: '98%' }],
      features: [
        { icon: 'code', title: 'Web Development', desc: 'Modern, fast, scalable web apps built with the latest frameworks.' },
        { icon: 'mobile', title: 'Mobile Apps', desc: 'Cross-platform iOS and Android solutions.' },
        { icon: 'shield', title: 'Cybersecurity', desc: 'Protect your digital assets with enterprise-grade security.' },
        { icon: 'brain', title: 'AI & ML', desc: 'Intelligent automation and machine learning solutions.' },
      ],
      testimonials: [
        { name: 'Kavimugil R.', role: 'Alumni 2024', quote: 'The Red Team Field course was a game-changer. Hands-on PCB design and ethical hacking modules gave me skills I could not find anywhere else.' },
        { name: 'Priya Sharma', role: 'Alumni 2024', quote: 'The Full Stack course transformed my career. I landed a job within 2 weeks of completing the program.' },
        { name: 'Arjun Nair', role: 'Alumni 2023', quote: 'Best cybersecurity training in the region. The instructors are real-world practitioners, not just teachers.' },
      ],
    },
  },
  {
    slug: 'about-us', title: 'About Us',
    content: {
      heading: 'Who We Are',
      description: 'Cifertrooper is a full-service digital agency and training academy specializing in web, mobile, cybersecurity, and AI solutions. Founded in 2018, we have helped 200+ businesses and trained 3000+ students.',
      mission: 'Empowering businesses and individuals through cutting-edge technology and education.',
      vision: 'To be the most trusted digital partner and cybersecurity training institute in South Asia.',
      values: ['Innovation', 'Integrity', 'Excellence', 'Community'],
      stats: [{ label: 'Projects Delivered', value: '200+' }, { label: 'Happy Clients', value: '150+' }, { label: 'Team Members', value: '35+' }, { label: 'Years Experience', value: '6+' }],
      team: [
        { name: 'Chandru K.', role: 'CEO & Founder', bio: 'Cybersecurity expert with 10+ years in ethical hacking and digital strategy.', image: '/images/team/chandru.jpg' },
        { name: 'Alice Johnson', role: 'CTO', bio: 'Full-stack architect specializing in scalable cloud systems.', image: '/images/team/alice.jpg' },
        { name: 'Bob Smith', role: 'Head of Security', bio: 'Certified ethical hacker and red team specialist.', image: '/images/team/bob.jpg' },
        { name: 'Carol White', role: 'Lead Designer', bio: 'UI/UX expert with a passion for accessible, beautiful interfaces.', image: '/images/team/carol.jpg' },
        { name: 'David Lee', role: 'AI Engineer', bio: 'Machine learning researcher with expertise in NLP and computer vision.', image: '/images/team/david.jpg' },
        { name: 'Meera Iyer', role: 'Marketing Head', bio: 'Digital marketing strategist with 8+ years of growth hacking experience.', image: '/images/team/meera.jpg' },
      ],
    },
  },
  {
    slug: 'services', title: 'Services',
    content: { heading: 'What We Offer', subheading: 'End-to-end digital services tailored to your needs.', categories: ['Web', 'Mobile', 'Security', 'AI', 'Marketing', 'Design'] },
  },
  {
    slug: 'team', title: 'Our Team',
    content: {
      heading: 'Meet the Team',
      subheading: 'A diverse group of experts passionate about technology and education.',
      members: [
        { name: 'Chandru K.', role: 'CEO & Founder', image: '/images/team/chandru.jpg', linkedin: '#', twitter: '#' },
        { name: 'Alice Johnson', role: 'CTO', image: '/images/team/alice.jpg', linkedin: '#' },
        { name: 'Bob Smith', role: 'Head of Security', image: '/images/team/bob.jpg', linkedin: '#' },
        { name: 'Carol White', role: 'Lead Designer', image: '/images/team/carol.jpg', linkedin: '#' },
        { name: 'David Lee', role: 'AI Engineer', image: '/images/team/david.jpg', linkedin: '#' },
        { name: 'Meera Iyer', role: 'Marketing Head', image: '/images/team/meera.jpg', linkedin: '#' },
        { name: 'Raj Patel', role: 'Backend Engineer', image: '/images/team/raj.jpg', linkedin: '#' },
        { name: 'Sneha Nair', role: 'Mobile Developer', image: '/images/team/sneha.jpg', linkedin: '#' },
      ],
    },
  },
  {
    slug: 'faq', title: 'FAQ',
    content: {
      heading: 'Frequently Asked Questions',
      items: [
        { q: 'What services do you offer?', a: 'We offer web development, mobile apps, UI/UX design, SEO, cybersecurity, AI solutions, and digital marketing.' },
        { q: 'How long does a project take?', a: 'Typically 4–12 weeks depending on scope and complexity.' },
        { q: 'Do you offer support after launch?', a: 'Yes, we offer ongoing maintenance and support plans for all projects.' },
        { q: 'What technologies do you use?', a: 'React, Node.js, TypeScript, MongoDB, Python, TensorFlow, React Native, and more.' },
        { q: 'Do you work with startups?', a: 'Absolutely. We love working with early-stage startups and have special packages for them.' },
        { q: 'Can I get a free consultation?', a: 'Yes! Book a free 30-minute consultation call with our team.' },
        { q: 'Do you offer training programs?', a: 'Yes, through CiferTrooper Academy we offer cybersecurity, full-stack, AI, and mobile development courses.' },
        { q: 'What is your pricing model?', a: 'We offer fixed-price projects, hourly rates, and monthly retainer packages depending on your needs.' },
      ],
    },
  },
  {
    slug: 'contact-us', title: 'Contact Us',
    content: {
      heading: 'Get In Touch',
      subheading: 'Tell us about your project and we will reply within 24 hours.',
      email: 'cifertrooper@gmail.com',
      phone: '+91 80155 77055',
      address: 'No: 04, Kathir IT Park, Wisdom Tree, Avinashi Rd, Neelambur, Tamil Nadu 641062',
      hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
      socials: { facebook: 'https://www.facebook.com/share/16THVpMj6s/', instagram: 'https://www.instagram.com/cifertrooper', twitter: 'https://x.com/CiferTrooper' },
    },
  },
];

// ── Services ───────────────────────────────────────────────────────────────
const SERVICES = [
  { slug: 'custom-app-development',         title: 'Clone App Development',       description: 'Build your own version of popular apps like Uber, Gojek, Netflix, Zomato, and more — customized for your brand and market.',                                                    image: '/images/services/tinder-openai-game-inc.webp', order: 1 },
  { slug: 'website-development',            title: 'Website Development',          description: 'SEO-friendly, responsive websites built with the latest technologies to ensure performance, scalability, and high conversion rates.',                                              image: '/images/services/cor-web.jpg',                 order: 2 },
  { slug: 'ui-ux-design',                   title: 'UI / UX Design',               description: 'Modern, user-friendly interfaces for mobile apps and websites designed for maximum engagement, retention, and brand consistency.',                                                image: '/images/services/ui.gif',                      order: 3 },
  { slug: 'logo-branding-design',           title: 'Logo & Branding Design',       description: 'Create a strong identity with professional logo design and complete brand kits that stand out in the marketplace and build trust.',                                               image: '/images/services/Blog-12.png',                 order: 4 },
  { slug: 'e-commerce-development',         title: 'E-Commerce Development',       description: 'Launch a high-converting online store with seamless payment gateway integration, inventory management, and mobile-first shopping experiences.',                                   image: '/images/services/ecom-1.jpg',                  order: 5 },
  { slug: 'online-marketing',               title: 'Online Marketing',             description: 'SEO, social media marketing, PPC, and high-conversion ad campaigns to grow your business globally and dominate your niche.',                                                      image: '/images/services/seo.jpg',                     order: 6 },
  { slug: 'ai-automation-chatbot-solutions',title: 'AI Automation & Chatbots',     description: 'Work smarter with intelligent chatbots and AI-driven automation to reduce manual tasks, capture leads 24/7, and improve customer experience.',                                   image: '/images/services/ai.jpg',                      order: 7 },
  { slug: 'mobile-app-development',         title: 'Mobile App Development',       description: 'Native and cross-platform iOS and Android apps built with React Native and Flutter — fast, beautiful, and production-ready.',                                                    image: '/images/services/mobile-app.jpg',              order: 8 },
  { slug: 'cybersecurity-services',         title: 'Cybersecurity Services',       description: 'Penetration testing, vulnerability assessments, and security audits to protect your business from modern cyber threats.',                                                         image: '/images/services/super.jpg',                   order: 9 },
  { slug: 'cloud-devops',                   title: 'Cloud & DevOps',               description: 'AWS, GCP, and Azure infrastructure setup, CI/CD pipelines, Docker, Kubernetes, and 24/7 monitoring for your production systems.',                                                image: '/images/services/cor-web.jpg',                 order: 10 },
  { slug: 'cms-development',                title: 'CMS Development',              description: 'Custom WordPress, Webflow, and headless CMS solutions that give your team full control over content without touching code.',                                                       image: '/images/services/cms.jpg',                     order: 11 },
  { slug: 'digital-strategy-consulting',    title: 'Digital Strategy & Consulting',description: 'Expert guidance on digital transformation, technology stack selection, product roadmaps, and go-to-market strategies for your business.',                                         image: '/images/services/Blog-12.png',                 order: 12 },
];

// ── Courses ────────────────────────────────────────────────────────────────
const COURSES = [
  {
    slug: 'ethical-hacking', title: 'Ethical Hacking', level: 'beginner', price: 199, duration: '10 weeks', instructor: 'Bob Smith',
    description: 'Learn penetration testing, network scanning, and vulnerability exploitation from scratch.',
    image: '/images/services/super.jpg', tags: ['security', 'hacking', 'networking'],
    curriculum: [
      { title: 'Introduction to Ethical Hacking', lessons: ['Information Security Overview', 'Hacking Concepts & Phases', 'Ethical Hacking Scope', 'Security Laws & Standards'] },
      { title: 'Bash Scripting', lessons: ['Basic Linux Commands', 'Advanced Linux Commands', 'Bash Scripting Basics', 'Loops & Functions in Bash'] },
      { title: 'Scanning Networks', lessons: ['Network Scanning Overview', 'Open Port Detection', 'Scanning Techniques', 'Vulnerability Scanning', 'IP Spoofing'] },
      { title: 'Footprinting & Reconnaissance', lessons: ['Footprinting Concepts', 'Footprinting Methodology', 'OSINT Tools', 'Countermeasures'] },
      { title: 'System Hacking', lessons: ['Privilege Escalation', 'Executing Applications', 'Hacking Windows & Linux', 'Hiding Files & Covering Tracks'] },
      { title: 'Malware Threats', lessons: ['Trojan Concepts', 'Virus & Worm Creation', 'Malware Detection', 'Exploit Writing'] },
      { title: 'Social Engineering', lessons: ['Social Engineering Techniques', 'Phishing Attacks', 'Identity Theft', 'Countermeasures'] },
      { title: 'Hacking Web Applications', lessons: ['OWASP Top 10', 'XSS Attacks', 'SQL Injection', 'CSRF', 'Web App Hacking Methodology'] },
    ],
  },
  {
    slug: 'advanced-ethical-hacking', title: 'Advanced Ethical Hacking', level: 'advanced', price: 349, duration: '14 weeks', instructor: 'Bob Smith',
    description: 'Red teaming, advanced exploitation, and enterprise-level penetration testing techniques.',
    image: '/images/services/super.jpg', tags: ['red-team', 'advanced', 'security'],
    curriculum: [
      { title: 'Advanced Reconnaissance', lessons: ['Passive Recon', 'Active Recon', 'OSINT Automation', 'Target Profiling'] },
      { title: 'Advanced Exploitation', lessons: ['Buffer Overflow', 'Shellcode Writing', 'Metasploit Advanced', 'Post-Exploitation'] },
      { title: 'Active Directory Attacks', lessons: ['AD Enumeration', 'Kerberoasting', 'Pass-the-Hash', 'DCSync Attack'] },
      { title: 'Red Team Operations', lessons: ['Red Team Planning', 'C2 Frameworks', 'Lateral Movement', 'Persistence Techniques'] },
      { title: 'Wireless & IoT Hacking', lessons: ['WPA2 Cracking', 'Evil Twin Attacks', 'IoT Firmware Analysis', 'Bluetooth Hacking'] },
      { title: 'Malware Development', lessons: ['Custom Payload Creation', 'AV Evasion', 'Rootkit Basics', 'Ransomware Analysis'] },
    ],
  },
  {
    slug: 'full-stack-web-development', title: 'Full Stack Web Development', level: 'beginner', price: 299, duration: '12 weeks', instructor: 'Alice Johnson',
    description: 'Master React, Node.js, TypeScript, and MongoDB to build production-ready web applications.',
    image: '/images/services/cor-web.jpg', tags: ['react', 'nodejs', 'mongodb', 'typescript'],
    curriculum: [
      { title: 'HTML & CSS Fundamentals', lessons: ['Semantic HTML', 'CSS Flexbox', 'CSS Grid', 'Responsive Design', 'CSS Variables'] },
      { title: 'JavaScript Essentials', lessons: ['ES6+ Features', 'DOM Manipulation', 'Async/Await', 'Fetch API', 'Error Handling'] },
      { title: 'TypeScript', lessons: ['Types & Interfaces', 'Generics', 'Decorators', 'TypeScript with React'] },
      { title: 'React & State Management', lessons: ['Components & Props', 'Hooks (useState, useEffect)', 'Context API', 'React Query', 'TanStack Router'] },
      { title: 'Node.js & Express', lessons: ['REST API Design', 'Middleware', 'JWT Authentication', 'File Uploads', 'Rate Limiting'] },
      { title: 'MongoDB & Mongoose', lessons: ['Schema Design', 'CRUD Operations', 'Aggregation Pipeline', 'Indexing', 'Transactions'] },
      { title: 'Deployment & DevOps', lessons: ['Docker Basics', 'CI/CD with GitHub Actions', 'Deploying to VPS', 'Nginx Configuration'] },
    ],
  },
  {
    slug: 'ai-machine-learning', title: 'AI & Machine Learning', level: 'advanced', price: 399, duration: '14 weeks', instructor: 'Carol White',
    description: 'Build intelligent systems with Python, TensorFlow, PyTorch, and OpenAI APIs.',
    image: '/images/services/ai.jpg', tags: ['python', 'tensorflow', 'pytorch', 'openai'],
    curriculum: [
      { title: 'Python for Data Science', lessons: ['NumPy Arrays', 'Pandas DataFrames', 'Matplotlib & Seaborn', 'Data Cleaning'] },
      { title: 'Machine Learning Fundamentals', lessons: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Cross-Validation', 'Feature Engineering'] },
      { title: 'Deep Learning', lessons: ['Neural Network Architecture', 'Backpropagation', 'CNNs for Vision', 'RNNs & LSTMs', 'Transformers'] },
      { title: 'Natural Language Processing', lessons: ['Text Preprocessing', 'Word Embeddings', 'Sentiment Analysis', 'Named Entity Recognition', 'LLM Fine-tuning'] },
      { title: 'OpenAI & LLM Integration', lessons: ['GPT-4 API', 'Prompt Engineering', 'RAG Systems', 'LangChain', 'Vector Databases'] },
      { title: 'MLOps & Deployment', lessons: ['Model Versioning', 'FastAPI for ML', 'Docker for ML', 'Monitoring Models in Production'] },
    ],
  },
  {
    slug: 'mobile-app-development', title: 'Mobile App Development', level: 'intermediate', price: 249, duration: '10 weeks', instructor: 'Alice Johnson',
    description: 'Build cross-platform iOS and Android apps with React Native and Expo.',
    image: '/images/services/mobile-app.jpg', tags: ['react-native', 'expo', 'mobile', 'ios', 'android'],
    curriculum: [
      { title: 'React Native Fundamentals', lessons: ['Setup & Expo', 'Core Components', 'Styling with StyleSheet', 'Flexbox in RN'] },
      { title: 'Navigation', lessons: ['React Navigation Setup', 'Stack Navigator', 'Tab Navigator', 'Drawer Navigator', 'Deep Linking'] },
      { title: 'State & Data', lessons: ['useState & useReducer', 'Context API', 'Zustand', 'React Query for Mobile', 'AsyncStorage'] },
      { title: 'Native Features', lessons: ['Camera & Gallery', 'Push Notifications', 'Geolocation', 'Biometric Auth', 'File System'] },
      { title: 'Backend Integration', lessons: ['REST API Calls', 'JWT Auth in RN', 'Real-time with WebSockets', 'Offline Support'] },
      { title: 'Publishing', lessons: ['App Store Submission', 'Play Store Submission', 'OTA Updates with Expo', 'CI/CD for Mobile'] },
    ],
  },
  {
    slug: 'python-programming', title: 'Python Programming', level: 'beginner', price: 149, duration: '8 weeks', instructor: 'Carol White',
    description: 'Go from zero to Python hero. Learn scripting, automation, web scraping, and data analysis.',
    image: '/images/services/ai.jpg', tags: ['python', 'scripting', 'automation'],
    curriculum: [
      { title: 'Python Basics', lessons: ['Variables & Data Types', 'Control Flow', 'Functions', 'Modules & Packages'] },
      { title: 'Data Structures', lessons: ['Lists & Tuples', 'Dictionaries & Sets', 'List Comprehensions', 'Generators'] },
      { title: 'OOP in Python', lessons: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Magic Methods'] },
      { title: 'File Handling & APIs', lessons: ['Reading/Writing Files', 'JSON & CSV', 'REST API Calls with requests', 'Web Scraping with BeautifulSoup'] },
      { title: 'Automation Projects', lessons: ['Task Automation', 'Email Automation', 'PDF Generation', 'Scheduled Scripts'] },
    ],
  },
  {
    slug: 'ui-ux-design-course', title: 'UI/UX Design Masterclass', level: 'beginner', price: 179, duration: '8 weeks', instructor: 'Carol White',
    description: 'Design beautiful, user-centered interfaces using Figma, design systems, and UX research methods.',
    image: '/images/services/ui.gif', tags: ['figma', 'design', 'ux', 'ui'],
    curriculum: [
      { title: 'Design Fundamentals', lessons: ['Color Theory', 'Typography', 'Spacing & Layout', 'Visual Hierarchy'] },
      { title: 'Figma Mastery', lessons: ['Figma Interface', 'Components & Variants', 'Auto Layout', 'Prototyping', 'Design Tokens'] },
      { title: 'UX Research', lessons: ['User Interviews', 'Personas', 'User Journey Maps', 'Usability Testing'] },
      { title: 'Design Systems', lessons: ['Atomic Design', 'Building a Component Library', 'Documentation', 'Handoff to Developers'] },
      { title: 'Portfolio Projects', lessons: ['Mobile App Redesign', 'SaaS Dashboard', 'E-Commerce UI', 'Case Study Writing'] },
    ],
  },
  {
    slug: 'cloud-aws-devops', title: 'Cloud & AWS DevOps', level: 'intermediate', price: 329, duration: '12 weeks', instructor: 'Alice Johnson',
    description: 'Master AWS services, Docker, Kubernetes, Terraform, and CI/CD pipelines for modern DevOps.',
    image: '/images/services/cor-web.jpg', tags: ['aws', 'docker', 'kubernetes', 'devops', 'terraform'],
    curriculum: [
      { title: 'Linux & Networking', lessons: ['Linux Administration', 'Networking Fundamentals', 'SSH & Security', 'Shell Scripting'] },
      { title: 'Docker & Containers', lessons: ['Docker Basics', 'Dockerfile', 'Docker Compose', 'Container Networking', 'Docker Registry'] },
      { title: 'AWS Core Services', lessons: ['EC2 & VPC', 'S3 & CloudFront', 'RDS & DynamoDB', 'IAM & Security', 'Lambda & API Gateway'] },
      { title: 'Kubernetes', lessons: ['K8s Architecture', 'Pods & Deployments', 'Services & Ingress', 'Helm Charts', 'EKS on AWS'] },
      { title: 'CI/CD & IaC', lessons: ['GitHub Actions', 'Jenkins Pipelines', 'Terraform Basics', 'Ansible', 'Monitoring with Prometheus'] },
    ],
  },
];

// ── Products ───────────────────────────────────────────────────────────────
const PRODUCTS = [
  { slug: 'web-dev-starter-kit',        title: 'Web Dev Starter Kit',          description: 'Complete boilerplate with React, TypeScript, Tailwind, and Node.js backend. Production-ready in minutes.',                    price: 49,  comparePrice: 79,  images: ['/images/services/cor-web.jpg'],                 category: 'digital',  stock: 999, tags: ['starter', 'react', 'nodejs'] },
  { slug: 'cybersecurity-toolkit',      title: 'Cybersecurity Toolkit',        description: 'Professional security tools, cheat sheets, and step-by-step guides for ethical hackers and security professionals.',           price: 99,  comparePrice: 149, images: ['/images/services/super.jpg'],                   category: 'digital',  stock: 999, tags: ['security', 'hacking', 'tools'] },
  { slug: 'ai-prompt-library',          title: 'AI Prompt Library Pro',        description: '1000+ curated prompts for ChatGPT, Claude, Gemini, and Midjourney — organized by use case and industry.',                     price: 39,  comparePrice: 69,  images: ['/images/services/ai.jpg'],                      category: 'digital',  stock: 999, tags: ['ai', 'prompts', 'chatgpt'] },
  { slug: 'ui-component-pack',          title: 'UI Component Pack',            description: '150+ React components with Tailwind CSS and dark mode support. Copy-paste ready for any project.',                             price: 79,  comparePrice: 129, images: ['/images/services/ui.gif'],                      category: 'digital',  stock: 999, tags: ['react', 'ui', 'tailwind', 'components'] },
  { slug: 'seo-audit-template',         title: 'SEO Audit Template',           description: 'Complete SEO audit checklist, reporting template, and keyword research spreadsheet used by professional SEO agencies.',         price: 19,  comparePrice: 39,  images: ['/images/services/seo.jpg'],                     category: 'digital',  stock: 999, tags: ['seo', 'template', 'marketing'] },
  { slug: 'ethical-hacking-ebook',      title: 'Ethical Hacking Handbook',     description: '300-page comprehensive guide covering all CEH exam topics with real-world examples, labs, and practice questions.',            price: 29,  comparePrice: 49,  images: ['/images/services/super.jpg'],                   category: 'ebook',    stock: 999, tags: ['security', 'ebook', 'ceh'] },
  { slug: 'figma-ui-kit',               title: 'Figma UI Kit — SaaS Edition',  description: 'Complete Figma design system with 200+ components, 10 page templates, and dark/light mode variants for SaaS products.',       price: 59,  comparePrice: 99,  images: ['/images/services/ui.gif'],                      category: 'design',   stock: 999, tags: ['figma', 'design', 'ui-kit', 'saas'] },
  { slug: 'python-automation-scripts',  title: 'Python Automation Scripts',    description: '50+ ready-to-use Python scripts for web scraping, email automation, PDF generation, API integrations, and data processing.',   price: 35,  comparePrice: 59,  images: ['/images/services/ai.jpg'],                      category: 'digital',  stock: 999, tags: ['python', 'automation', 'scripts'] },
  { slug: 'nextjs-saas-boilerplate',    title: 'Next.js SaaS Boilerplate',     description: 'Production-ready SaaS starter with auth, billing (Stripe), dashboard, API, and deployment config. Save 100+ hours.',          price: 149, comparePrice: 249, images: ['/images/services/cor-web.jpg'],                 category: 'digital',  stock: 999, tags: ['nextjs', 'saas', 'boilerplate', 'stripe'] },
  { slug: 'mobile-app-ui-kit',          title: 'React Native UI Kit',          description: '80+ React Native screens and components with Expo support. Includes auth flows, onboarding, dashboards, and e-commerce screens.',price: 89,  comparePrice: 149, images: ['/images/services/mobile-app.jpg'],              category: 'digital',  stock: 999, tags: ['react-native', 'mobile', 'ui-kit'] },
  { slug: 'digital-marketing-playbook', title: 'Digital Marketing Playbook',   description: 'Step-by-step playbook for SEO, Google Ads, Facebook Ads, email marketing, and social media growth. 150+ pages.',              price: 25,  comparePrice: 45,  images: ['/images/services/seo.jpg'],                     category: 'ebook',    stock: 999, tags: ['marketing', 'seo', 'ads', 'playbook'] },
  { slug: 'aws-devops-cheatsheet',      title: 'AWS & DevOps Cheat Sheet Pack',description: '20 cheat sheets covering AWS services, Docker, Kubernetes, Terraform, CI/CD, and Linux commands. Print-ready PDFs.',           price: 15,  comparePrice: 29,  images: ['/images/services/cor-web.jpg'],                 category: 'digital',  stock: 999, tags: ['aws', 'devops', 'cheatsheet'] },
];

// ── Seed Runner ────────────────────────────────────────────────────────────
async function seed() {
  process.stdout.write('Connecting to ' + MONGO_URI + '\n');
  await mongoose.connect(MONGO_URI);
  process.stdout.write('Connected!\n');

  await Promise.all([User.deleteMany({}), Page.deleteMany({}), Service.deleteMany({}), Course.deleteMany({}), Product.deleteMany({})]);
  process.stdout.write('Cleared all collections\n');

  const usersWithHash = await Promise.all(USERS.map(async (u) => ({ ...u, password: await hash(u.password) })));
  await User.create(usersWithHash);
  process.stdout.write(`Seeded ${USERS.length} users\n`);

  await Page.create(PAGES);
  process.stdout.write(`Seeded ${PAGES.length} pages\n`);

  await Service.create(SERVICES);
  process.stdout.write(`Seeded ${SERVICES.length} services\n`);

  await Course.create(COURSES);
  process.stdout.write(`Seeded ${COURSES.length} courses\n`);

  await Product.create(PRODUCTS);
  process.stdout.write(`Seeded ${PRODUCTS.length} products\n`);

  process.stdout.write('\n✅ Database seeded successfully!\n');
  process.stdout.write('─────────────────────────────────────────\n');
  process.stdout.write('Admin:  admin@cifertrooper.com  / Admin@1234\n');
  process.stdout.write('Editor: editor@cifertrooper.com / Editor@1234\n');
  process.stdout.write('Users:  ravi@example.com        / User@1234\n');
  process.stdout.write('─────────────────────────────────────────\n');
  process.stdout.write(`Total: ${USERS.length} users | ${PAGES.length} pages | ${SERVICES.length} services | ${COURSES.length} courses | ${PRODUCTS.length} products\n`);

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => { process.stderr.write('Seed failed: ' + err.message + '\n' + err.stack + '\n'); process.exit(1); });
