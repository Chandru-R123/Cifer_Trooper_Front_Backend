// node seed.mjs
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cifertrooper';

const UserSchema = new mongoose.Schema({ name: String, email: { type: String, unique: true }, password: String, role: { type: String, default: 'user' }, isActive: { type: Boolean, default: true } }, { timestamps: true });
const PageSchema = new mongoose.Schema({ slug: { type: String, unique: true }, title: String, content: mongoose.Schema.Types.Mixed, isPublished: { type: Boolean, default: true } }, { timestamps: true });
const ServiceSchema = new mongoose.Schema({ slug: { type: String, unique: true }, title: String, description: String, image: String, subtitle: String, heroImageUrl: String, about: mongoose.Schema.Types.Mixed, sections: mongoose.Schema.Types.Mixed, benefits: [String], faqs: mongoose.Schema.Types.Mixed, isPublished: { type: Boolean, default: true }, order: Number }, { timestamps: true });
const CourseSchema = new mongoose.Schema({ slug: { type: String, unique: true }, title: String, description: String, image: String, price: Number, duration: String, level: String, instructor: String, curriculum: mongoose.Schema.Types.Mixed, isPublished: { type: Boolean, default: true }, tags: [String] }, { timestamps: true });
const ProductSchema = new mongoose.Schema({ slug: { type: String, unique: true }, title: String, description: String, price: Number, comparePrice: Number, images: [String], category: String, stock: Number, isPublished: { type: Boolean, default: true }, tags: [String] }, { timestamps: true });

const User = mongoose.model('User', UserSchema);
const Page = mongoose.model('Page', PageSchema);
const Service = mongoose.model('Service', ServiceSchema);
const Course = mongoose.model('Course', CourseSchema);
const Product = mongoose.model('Product', ProductSchema);
const hash = async (p) => bcrypt.hash(p, 12);

const USERS = [
  { name: 'Admin User',   email: 'admin@cifertrooper.com',  role: 'admin',  password: 'Admin@1234'  },
  { name: 'Editor User',  email: 'editor@cifertrooper.com', role: 'editor', password: 'Editor@1234' },
  { name: 'Ravi Kumar',   email: 'ravi@example.com',        role: 'user',   password: 'User@1234'   },
  { name: 'Priya Sharma', email: 'priya@example.com',       role: 'user',   password: 'User@1234'   },
  { name: 'Arjun Nair',   email: 'arjun@example.com',       role: 'user',   password: 'User@1234'   },
];

const PAGES = [
  {
    slug: 'home', title: 'Home',
    content: {
      hero: { heading: 'Cyber Excellence.', subheading: 'Master the most advanced security techniques with our industry-standard programs. From beginner fundamentals to elite red teaming.', cta: 'Explore Courses' },
      stats: [{ label: 'Expert Instructors', value: '15+' }, { label: 'Hands-on Modules', value: '600+' }, { label: 'Students Certified', value: '3000+' }, { label: 'Success Rate', value: '98%' }],
      whyChoose: [
        { title: 'Practical Labs', desc: 'Every module includes intensive practical sessions using industry tools.' },
        { title: 'Real-world Projects', desc: 'Build tools and perform penetration tests that reflect real-world scenarios.' },
        { title: 'Lifetime Mentorship', desc: 'Our instructors guide you even after you complete your course.' },
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
      values: ['Innovation', 'Integrity', 'Excellence', 'Community', 'Impact', 'Trust'],
      stats: [{ label: 'Projects Delivered', value: '200+' }, { label: 'Happy Clients', value: '150+' }, { label: 'Team Members', value: '35+' }, { label: 'Years Experience', value: '6+' }],
      team: [
        { name: 'Chandru K.', role: 'CEO & Founder', bio: 'Cybersecurity expert with 10+ years in ethical hacking and digital strategy.' },
        { name: 'Alice Johnson', role: 'CTO', bio: 'Full-stack architect specializing in scalable cloud systems and microservices.' },
        { name: 'Bob Smith', role: 'Head of Security', bio: 'Certified ethical hacker and red team specialist with OSCP certification.' },
        { name: 'Carol White', role: 'Lead Designer', bio: 'UI/UX expert with a passion for accessible, beautiful, and conversion-focused interfaces.' },
      ],
    },
  },
  {
    slug: 'team', title: 'Our Team',
    content: {
      heading: 'Meet the Team',
      subheading: 'A diverse group of experts passionate about technology, security, and education.',
      members: [
        { name: 'Chandru K.', role: 'CEO & Founder', bio: 'Cybersecurity expert with 10+ years in ethical hacking and digital strategy.', image: '/images/team/chandru.jpg', linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
        { name: 'Alice Johnson', role: 'CTO', bio: 'Full-stack architect specializing in scalable cloud systems and microservices.', image: '/images/team/alice.jpg', linkedin: 'https://linkedin.com' },
        { name: 'Bob Smith', role: 'Head of Security', bio: 'Certified ethical hacker and red team specialist with OSCP certification.', image: '/images/team/bob.jpg', linkedin: 'https://linkedin.com' },
        { name: 'Carol White', role: 'Lead Designer', bio: 'UI/UX expert with a passion for accessible, beautiful interfaces.', image: '/images/team/carol.jpg', linkedin: 'https://linkedin.com' },
        { name: 'David Lee', role: 'AI Engineer', bio: 'Machine learning researcher with expertise in NLP, computer vision, and LLM fine-tuning.', image: '/images/team/david.jpg', linkedin: 'https://linkedin.com' },
        { name: 'Meera Iyer', role: 'Marketing Head', bio: 'Digital marketing strategist with 8+ years of growth hacking experience.', image: '/images/team/meera.jpg', linkedin: 'https://linkedin.com' },
        { name: 'Raj Patel', role: 'Backend Engineer', bio: 'Node.js and Python specialist focused on high-performance APIs.', image: '/images/team/raj.jpg', linkedin: 'https://linkedin.com' },
        { name: 'Sneha Nair', role: 'Mobile Developer', bio: 'React Native and Flutter developer who has shipped 20+ apps.', image: '/images/team/sneha.jpg', linkedin: 'https://linkedin.com' },
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
        { q: 'Can I get a free consultation?', a: 'Yes! Book a free 30-minute consultation call with our team. No strings attached.' },
        { q: 'Do you offer training programs?', a: 'Yes, through CiferTrooper Academy we offer cybersecurity, full-stack, AI, and mobile development courses.' },
        { q: 'What is your pricing model?', a: 'We offer fixed-price projects, hourly rates, and monthly retainer packages.' },
        { q: 'Do you sign NDAs?', a: 'Yes, we are happy to sign an NDA before any project discussion.' },
        { q: 'Can you work with our existing team?', a: 'Absolutely. We integrate seamlessly with in-house teams as an extension of your capacity.' },
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
  {
    slug: 'services', title: 'Services',
    content: { heading: 'What We Offer', subheading: 'End-to-end digital services tailored to your needs.' },
  },
];

const SERVICES = [
  {
    slug: 'custom-app-development', title: 'Clone App Development', order: 1,
    description: 'Build your own version of popular apps like Uber, Gojek, Netflix, Zomato — customized for your brand.',
    image: '/images/services/tinder-openai-game-inc.webp',
    subtitle: 'We develop customized, ready-to-launch clones of the world\'s most popular apps, tailored for your market',
    heroImageUrl: '/assets/images/services/tinder-openai-game-inc.webp',
    about: { title: 'Cifer Trooper – Clone App Development Company', description: ['At Cifer Trooper, we specialize in mobile app clone development for startups, enterprises, and mid-level businesses. We deliver Uber clone apps, Netflix clone platforms, and Amazon-style marketplaces that help brands launch quickly and scale efficiently.', 'We combine UI/UX design, branding, and digital marketing to create customizable, secure, and scalable clone apps for industries like ride-hailing, food delivery, OTT streaming, dating, and e-learning.'], ctaText: 'Get a Clone App Quote', imageUrl: '/assets/images/services/cross-plateform-blog-1.webp' },
    sections: [{ subtitle: 'Our Solutions', title: 'App Categories', items: [{ title: 'Ride-Hailing & Taxi Apps', image: '/assets/images/services/taxi.jpg', description: 'Build your own Uber-like taxi booking app with real-time GPS tracking, driver earnings dashboard, and multiple payment gateways.', list: ['Uber Clone', 'Ola Clone', 'Lyft Clone', 'Bolt Clone'] }, { title: 'Super App Solutions', image: '/assets/images/services/super.jpg', description: 'Empower entrepreneurs to build multi-service super apps offering ride-hailing, food delivery, and logistics — all in one platform.', list: ['Gojek Clone', 'Grab Clone', 'Rappi Clone'] }, { title: 'Dating & Social Clones', image: '/assets/images/services/dating.jpg', description: 'Build engaging social media and dating apps with swipe features, AI-driven matching, and chat tools.', list: ['Tinder Clone', 'Bumble Clone', 'Instagram Clone'] }, { title: 'E-Learning Platforms', image: '/assets/images/services/ebook.jpg', description: 'Launch your own e-learning clone app with course marketplaces and live sessions.', list: ['Udemy Clone', 'Coursera Clone'] }] }],
    benefits: ['Rapid time-to-market (6-10 weeks)', 'Reduced development costs', 'Proven, market-tested business models', 'Full customization for your brand', 'Ongoing technical support'],
    faqs: [{ question: 'What is a clone app?', answer: 'A clone app is a ready-made solution inspired by top apps like Uber or Amazon, built with unique source code and customized branding.' }, { question: 'How long does it take to launch?', answer: 'On average, clone apps can be launched in 6–10 weeks, depending on complexity and integrations.' }, { question: 'Do you provide marketing services?', answer: 'Absolutely. We provide App Store Optimization (ASO), digital marketing, and branding to ensure your app succeeds.' }],
  },
  {
    slug: 'website-development', title: 'Website Development', order: 2,
    description: 'SEO-friendly, responsive websites built with the latest technologies to ensure performance and scalability.',
    image: '/images/services/cor-web.jpg',
    subtitle: 'SEO-friendly, responsive websites for any business.',
    about: { title: 'Building Digital Growth Platforms, Not Just Websites', description: ['At Cifer Trooper, we don\'t just create websites — we build digital growth platforms. Your website is more than just a presence; it\'s a business engine that drives leads, sales, and brand credibility.', 'We harness the future with AI-driven websites that deliver personalized experiences and smart content automation.'], ctaText: 'Start Your Project', imageUrl: '/assets/images/services/cu.jpg' },
    sections: [{ title: 'Development Solutions', items: [{ title: 'Corporate & AI-Powered Websites', image: '/assets/images/services/cor-web.jpg', description: 'Professional, scalable, and brand-focused websites for businesses of all sizes. We integrate AI for personalized user journeys.' }, { title: 'CMS & E-Commerce Solutions', image: '/assets/images/services/cms.jpg', description: 'Manage your content with ease using WordPress or Webflow. From single-brand stores to multi-vendor marketplaces.' }] }],
    benefits: ['Designed to drive leads and sales', 'Optimized for speed and SEO', 'Multilingual and global-ready', 'AI and automation integration', 'High ROI performance'],
    faqs: [{ question: 'How long does it take to build a website?', answer: 'Typically 2–8 weeks, depending on features, complexity, and custom integrations.' }, { question: 'Can you build AI-powered websites?', answer: 'Yes - we integrate AI chatbots, personalization engines, and smart automation into websites.' }],
  },
  {
    slug: 'ui-ux-design', title: 'UI / UX Design', order: 3,
    description: 'Modern, user-friendly interfaces for mobile apps and websites designed for maximum engagement and retention.',
    image: '/images/services/ui.gif',
    subtitle: 'Modern, user-friendly interfaces for mobile apps and websites.',
    about: { title: 'Beautiful, Functional Designs', description: ['At Cifer Trooper, we create beautiful, functional, and user-centered designs for both mobile apps and websites.', 'Our UI/UX design services focus on blending creativity with usability to ensure high conversion rates.'], ctaText: 'Discuss Design', imageUrl: '/assets/images/services/ui.gif' },
    sections: [{ title: 'Design Process', items: [{ title: 'Mobile & Web UI Design', image: '/assets/images/services/mobile-app.jpg', description: 'Modern interfaces for Android and iOS apps, as well as responsive website designs.' }, { title: 'Wireframing & Prototyping', image: '/assets/images/services/wire.jpg', description: 'Visual layouts and interactive prototypes to bring your vision to life before development.' }] }],
    benefits: ['Higher conversions', 'Better user retention', 'Faster development', 'Stronger brand identity'],
    faqs: [{ question: 'What is UI/UX design?', answer: 'UI (User Interface) design focuses on the look and feel, while UX (User Experience) ensures it is easy and intuitive to use.' }],
  },
  {
    slug: 'logo-branding-design', title: 'Logo & Branding Design', order: 4,
    description: 'Create a strong identity with professional logo design and complete brand kits that stand out in the marketplace.',
    image: '/images/services/Blog-12.png',
    subtitle: 'Creative brand identity and logo design services.',
    about: { title: 'Define Your Brand Identity', description: ['We help businesses create a strong visual identity that resonates with their audience. Our designs are modern, memorable, and professional.', 'From logo creation to full brand guidelines, we ensure your brand stands out in the marketplace.'], ctaText: 'Get Your Logo', imageUrl: '/assets/images/services/Blog-12.png' },
    sections: [{ title: 'Branding Services', items: [{ title: 'Logo Design', description: 'Custom logo designs that represent your brand\'s core values and vision.' }, { title: 'Brand Guidelines', description: 'Comprehensive guides covering color palettes, typography, and usage rules.' }] }],
    benefits: ['Professional brand image', 'Consistent visual identity', 'Increased brand recognition', 'Tailored to your industry'],
    faqs: [],
  },
  {
    slug: 'e-commerce-development', title: 'E-Commerce Development', order: 5,
    description: 'Launch a high-converting online store with seamless payment gateway integration and mobile-first shopping experiences.',
    image: '/images/services/ecom-1.jpg',
    subtitle: 'Launch an online store with payment gateway integration and mobile optimization.',
    heroImageUrl: '/assets/images/services/ecom-1.jpg',
    about: { title: 'Scale Your Business with E-Commerce', description: ['We specialize in building scalable, high-converting, and secure e-commerce platforms that help businesses sell smarter.', 'From startups to enterprises, we design SEO-optimized, AI-powered, and payment-ready solutions.'], ctaText: 'Start Selling', imageUrl: '/assets/images/services/ecom-1.jpg' },
    sections: [{ subtitle: 'Our Services', title: 'E-Commerce Solutions', items: [{ title: 'Custom Online Stores', image: '/assets/images/services/custome.jpg', description: 'Tailored websites that showcase your brand and drive conversions.', list: ['Shopify', 'WooCommerce', 'Magento'] }, { title: 'Multi-Vendor Marketplaces', description: 'Build platforms like Amazon with vendor dashboards and secure management.', list: ['Vendor Portal', 'Commission Systems', 'Logistics'] }] }],
    benefits: ['Boost sales globally', 'Frictionless checkout', 'Higher conversions', 'Secure and scalable'],
    faqs: [{ question: 'Can you build marketplaces?', answer: 'Yes - we develop multi-vendor marketplaces with vendor dashboards and scalable infrastructure.' }],
  },
  {
    slug: 'online-marketing', title: 'Online Marketing', order: 6,
    description: 'SEO, social media marketing, PPC, and high-conversion ad campaigns to grow your business globally.',
    image: '/images/services/seo.jpg',
    subtitle: 'SEO, social media marketing, and ad campaigns to grow your business.',
    about: { title: 'Strategic Online Marketing for Business Growth', description: ['At Cifer Trooper, we specialize in creating data-driven, AI-powered marketing campaigns that connect you with the right audience.', 'Our online marketing solutions are designed to maximize your ROI through multi-channel expertise.'], ctaText: 'Get Marketing Audit', imageUrl: '/assets/images/services/Blog-12.png' },
    sections: [{ title: 'Marketing Solutions', items: [{ title: 'SEO & Content Marketing', image: '/assets/images/services/seo-opt.jpg', description: 'Climb search rankings with AI-powered SEO strategies and technical optimization.', list: ['Technical SEO', 'AI Content', 'Backlinks'] }, { title: 'Social Media & PPC', image: '/assets/images/services/social.jpg', description: 'Drive traffic with Google Ads and social PPC campaigns managed with AI-driven bidding.', list: ['Facebook Ads', 'Google Ads', 'LinkedIn'] }] }],
    benefits: ['Increase brand visibility', 'Generate qualified leads', 'Reduce acquisition costs', 'Build customer loyalty'],
    faqs: [{ question: 'How soon can I see results from SEO?', answer: 'SEO is a long-term strategy; noticeable improvements typically appear in 3–6 months.' }],
  },
  {
    slug: 'ai-automation-chatbot-solutions', title: 'AI Automation & Chatbots', order: 7,
    description: 'Work smarter with intelligent chatbots and AI-driven automation to reduce manual tasks and improve customer experience.',
    image: '/images/services/ai.jpg',
    subtitle: 'Workflow automation, intelligent chatbots, and AI-driven business solutions.',
    about: { title: 'Harness the Power of AI for Smarter Business', description: ['We help businesses harness the power of AI automation and intelligent chatbots to work smarter and reduce manual tasks.', 'From workflow automation to AI-driven website bots, we build solutions that make your business future-ready.'], ctaText: 'Automate Now', imageUrl: '/assets/images/services/full-screen-10.webp' },
    sections: [{ title: 'AI Solutions', items: [{ title: 'Workflow Automation', image: '/assets/images/services/12.jpg', description: 'Custom workflows using Zapier and n8n to integrate your apps and automate repetitive tasks.', list: ['CRM Integration', 'Marketing Automation', 'E-commerce Flows'] }, { title: 'Intelligent AI Chatbots', image: '/assets/images/services/9.jpg', description: 'AI chatbots for websites and WhatsApp that capture leads and provide 24/7 support.', list: ['WhatsApp Bots', 'Lead Capture', '24/7 Support'] }] }],
    benefits: ['Higher efficiency', 'Reduced support costs', '24/7 lead capture', 'Seamless integrations'],
    faqs: [{ question: 'What platforms do you use for automation?', answer: 'We primarily use Zapier, n8n, and Make to build custom automated workflows.' }],
  },
  {
    slug: 'mobile-app-development', title: 'Mobile App Development', order: 8,
    description: 'Native and cross-platform iOS and Android apps built with React Native and Flutter.',
    image: '/images/services/mobile-app.jpg',
    subtitle: 'Native and cross-platform iOS and Android apps.',
    about: { title: 'Mobile Apps That Users Love', description: ['We build high-performance, beautiful mobile apps for iOS and Android using React Native and Flutter.', 'From concept to App Store, we handle everything — design, development, testing, and deployment.'], ctaText: 'Build Your App', imageUrl: '/assets/images/services/mobile-app.jpg' },
    sections: [{ title: 'Mobile Solutions', items: [{ title: 'React Native Apps', image: '/assets/images/services/mobile-app.jpg', description: 'Cross-platform apps that run natively on both iOS and Android from a single codebase.' }, { title: 'Flutter Development', description: 'Beautiful, fast apps with Flutter\'s expressive UI toolkit and Dart language.' }] }],
    benefits: ['Single codebase for iOS & Android', 'Native performance', 'Faster time to market', 'Lower development cost'],
    faqs: [{ question: 'React Native or Flutter — which is better?', answer: 'Both are excellent. We recommend React Native for JavaScript teams and Flutter for pixel-perfect UI requirements.' }],
  },
  {
    slug: 'cybersecurity-services', title: 'Cybersecurity Services', order: 9,
    description: 'Penetration testing, vulnerability assessments, and security audits to protect your business from modern cyber threats.',
    image: '/images/services/super.jpg',
    subtitle: 'Protect your business with enterprise-grade cybersecurity.',
    about: { title: 'Security-First Digital Protection', description: ['Our cybersecurity team provides comprehensive protection for your digital assets through penetration testing, vulnerability assessments, and security audits.', 'We follow industry standards including OWASP, NIST, and ISO 27001 to ensure your systems are secure.'], ctaText: 'Get Security Audit', imageUrl: '/assets/images/services/super.jpg' },
    sections: [{ title: 'Security Services', items: [{ title: 'Penetration Testing', description: 'Simulate real-world attacks to identify vulnerabilities before hackers do.', list: ['Web App Pentesting', 'Network Pentesting', 'Mobile App Pentesting'] }, { title: 'Security Audits', description: 'Comprehensive review of your security posture, policies, and infrastructure.', list: ['Code Review', 'Infrastructure Audit', 'Compliance Check'] }] }],
    benefits: ['Identify vulnerabilities before attackers', 'Compliance with security standards', 'Protect customer data', 'Reduce breach risk'],
    faqs: [{ question: 'How often should we do a security audit?', answer: 'We recommend at least once a year, or after any major system change or incident.' }],
  },
];

const COURSES = [
  { slug: 'ethical-hacking', title: 'Ethical Hacking', level: 'beginner', price: 199, duration: '10 weeks', instructor: 'Bob Smith', description: 'Learn penetration testing, network scanning, and vulnerability exploitation from scratch.', image: '/images/services/super.jpg', tags: ['security', 'hacking', 'networking'], curriculum: [{ title: 'Introduction to Ethical Hacking', lessons: ['Information Security Overview', 'Hacking Concepts & Phases', 'Ethical Hacking Scope', 'Security Laws & Standards'] }, { title: 'Bash Scripting', lessons: ['Basic Linux Commands', 'Advanced Linux Commands', 'Bash Scripting Basics', 'Loops & Functions in Bash'] }, { title: 'Scanning Networks', lessons: ['Network Scanning Overview', 'Open Port Detection', 'Scanning Techniques', 'Vulnerability Scanning'] }, { title: 'System Hacking', lessons: ['Privilege Escalation', 'Executing Applications', 'Hacking Windows & Linux', 'Covering Tracks'] }, { title: 'Hacking Web Applications', lessons: ['OWASP Top 10', 'XSS Attacks', 'SQL Injection', 'CSRF'] }] },
  { slug: 'advanced-ethical-hacking', title: 'Advanced Ethical Hacking', level: 'advanced', price: 349, duration: '14 weeks', instructor: 'Bob Smith', description: 'Red teaming, advanced exploitation, and enterprise-level penetration testing techniques.', image: '/images/services/super.jpg', tags: ['red-team', 'advanced', 'security'], curriculum: [{ title: 'Advanced Reconnaissance', lessons: ['Passive Recon', 'Active Recon', 'OSINT Automation', 'Target Profiling'] }, { title: 'Advanced Exploitation', lessons: ['Buffer Overflow', 'Shellcode Writing', 'Metasploit Advanced', 'Post-Exploitation'] }, { title: 'Active Directory Attacks', lessons: ['AD Enumeration', 'Kerberoasting', 'Pass-the-Hash', 'DCSync Attack'] }, { title: 'Red Team Operations', lessons: ['Red Team Planning', 'C2 Frameworks', 'Lateral Movement', 'Persistence Techniques'] }] },
  { slug: 'full-stack-web-development', title: 'Full Stack Web Development', level: 'beginner', price: 299, duration: '12 weeks', instructor: 'Alice Johnson', description: 'Master React, Node.js, TypeScript, and MongoDB to build production-ready web applications.', image: '/images/services/cor-web.jpg', tags: ['react', 'nodejs', 'mongodb', 'typescript'], curriculum: [{ title: 'HTML & CSS Fundamentals', lessons: ['Semantic HTML', 'CSS Flexbox', 'CSS Grid', 'Responsive Design'] }, { title: 'JavaScript Essentials', lessons: ['ES6+ Features', 'DOM Manipulation', 'Async/Await', 'Fetch API'] }, { title: 'React & State Management', lessons: ['Components & Props', 'Hooks', 'Context API', 'React Query'] }, { title: 'Node.js & Express', lessons: ['REST API Design', 'Middleware', 'JWT Authentication', 'File Uploads'] }, { title: 'MongoDB & Mongoose', lessons: ['Schema Design', 'CRUD Operations', 'Aggregation Pipeline', 'Indexing'] }] },
  { slug: 'ai-machine-learning', title: 'AI & Machine Learning', level: 'advanced', price: 399, duration: '14 weeks', instructor: 'Carol White', description: 'Build intelligent systems with Python, TensorFlow, PyTorch, and OpenAI APIs.', image: '/images/services/ai.jpg', tags: ['python', 'tensorflow', 'pytorch', 'openai'], curriculum: [{ title: 'Python for Data Science', lessons: ['NumPy Arrays', 'Pandas DataFrames', 'Matplotlib & Seaborn', 'Data Cleaning'] }, { title: 'Machine Learning Fundamentals', lessons: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Feature Engineering'] }, { title: 'Deep Learning', lessons: ['Neural Network Architecture', 'CNNs for Vision', 'RNNs & LSTMs', 'Transformers'] }, { title: 'OpenAI & LLM Integration', lessons: ['GPT-4 API', 'Prompt Engineering', 'RAG Systems', 'LangChain'] }] },
  { slug: 'mobile-app-development', title: 'Mobile App Development', level: 'intermediate', price: 249, duration: '10 weeks', instructor: 'Alice Johnson', description: 'Build cross-platform iOS and Android apps with React Native and Expo.', image: '/images/services/mobile-app.jpg', tags: ['react-native', 'expo', 'mobile'], curriculum: [{ title: 'React Native Fundamentals', lessons: ['Setup & Expo', 'Core Components', 'Styling with StyleSheet', 'Flexbox in RN'] }, { title: 'Navigation', lessons: ['Stack Navigator', 'Tab Navigator', 'Drawer Navigator', 'Deep Linking'] }, { title: 'Native Features', lessons: ['Camera & Gallery', 'Push Notifications', 'Geolocation', 'Biometric Auth'] }, { title: 'Publishing', lessons: ['App Store Submission', 'Play Store Submission', 'OTA Updates with Expo'] }] },
  { slug: 'python-programming', title: 'Python Programming', level: 'beginner', price: 149, duration: '8 weeks', instructor: 'Carol White', description: 'Go from zero to Python hero. Learn scripting, automation, web scraping, and data analysis.', image: '/images/services/ai.jpg', tags: ['python', 'scripting', 'automation'], curriculum: [{ title: 'Python Basics', lessons: ['Variables & Data Types', 'Control Flow', 'Functions', 'Modules & Packages'] }, { title: 'Data Structures', lessons: ['Lists & Tuples', 'Dictionaries & Sets', 'List Comprehensions', 'Generators'] }, { title: 'OOP in Python', lessons: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Magic Methods'] }, { title: 'Automation Projects', lessons: ['Task Automation', 'Email Automation', 'Web Scraping with BeautifulSoup', 'Scheduled Scripts'] }] },
  { slug: 'ui-ux-design-course', title: 'UI/UX Design Masterclass', level: 'beginner', price: 179, duration: '8 weeks', instructor: 'Carol White', description: 'Design beautiful, user-centered interfaces using Figma, design systems, and UX research methods.', image: '/images/services/ui.gif', tags: ['figma', 'design', 'ux', 'ui'], curriculum: [{ title: 'Design Fundamentals', lessons: ['Color Theory', 'Typography', 'Spacing & Layout', 'Visual Hierarchy'] }, { title: 'Figma Mastery', lessons: ['Figma Interface', 'Components & Variants', 'Auto Layout', 'Prototyping'] }, { title: 'UX Research', lessons: ['User Interviews', 'Personas', 'User Journey Maps', 'Usability Testing'] }, { title: 'Portfolio Projects', lessons: ['Mobile App Redesign', 'SaaS Dashboard', 'E-Commerce UI', 'Case Study Writing'] }] },
  { slug: 'cloud-aws-devops', title: 'Cloud & AWS DevOps', level: 'intermediate', price: 329, duration: '12 weeks', instructor: 'Alice Johnson', description: 'Master AWS services, Docker, Kubernetes, Terraform, and CI/CD pipelines for modern DevOps.', image: '/images/services/cor-web.jpg', tags: ['aws', 'docker', 'kubernetes', 'devops', 'terraform'], curriculum: [{ title: 'Linux & Networking', lessons: ['Linux Administration', 'Networking Fundamentals', 'SSH & Security', 'Shell Scripting'] }, { title: 'Docker & Containers', lessons: ['Docker Basics', 'Dockerfile', 'Docker Compose', 'Container Networking'] }, { title: 'AWS Core Services', lessons: ['EC2 & VPC', 'S3 & CloudFront', 'RDS & DynamoDB', 'IAM & Security', 'Lambda & API Gateway'] }, { title: 'Kubernetes', lessons: ['K8s Architecture', 'Pods & Deployments', 'Services & Ingress', 'Helm Charts'] }, { title: 'CI/CD & IaC', lessons: ['GitHub Actions', 'Jenkins Pipelines', 'Terraform Basics', 'Monitoring with Prometheus'] }] },
];

const PRODUCTS = [
  { slug: 'web-dev-starter-kit', title: 'Web Dev Starter Kit', description: 'Complete boilerplate with React, TypeScript, Tailwind, and Node.js backend. Production-ready in minutes.', price: 49, comparePrice: 79, images: ['/images/services/cor-web.jpg'], category: 'digital', stock: 999, tags: ['starter', 'react', 'nodejs'] },
  { slug: 'cybersecurity-toolkit', title: 'Cybersecurity Toolkit', description: 'Professional security tools, cheat sheets, and step-by-step guides for ethical hackers.', price: 99, comparePrice: 149, images: ['/images/services/super.jpg'], category: 'digital', stock: 999, tags: ['security', 'hacking', 'tools'] },
  { slug: 'ai-prompt-library', title: 'AI Prompt Library Pro', description: '1000+ curated prompts for ChatGPT, Claude, Gemini, and Midjourney — organized by use case.', price: 39, comparePrice: 69, images: ['/images/services/ai.jpg'], category: 'digital', stock: 999, tags: ['ai', 'prompts', 'chatgpt'] },
  { slug: 'ui-component-pack', title: 'UI Component Pack', description: '150+ React components with Tailwind CSS and dark mode support. Copy-paste ready for any project.', price: 79, comparePrice: 129, images: ['/images/services/ui.gif'], category: 'digital', stock: 999, tags: ['react', 'ui', 'tailwind'] },
  { slug: 'seo-audit-template', title: 'SEO Audit Template', description: 'Complete SEO audit checklist, reporting template, and keyword research spreadsheet.', price: 19, comparePrice: 39, images: ['/images/services/seo.jpg'], category: 'digital', stock: 999, tags: ['seo', 'template', 'marketing'] },
  { slug: 'ethical-hacking-ebook', title: 'Ethical Hacking Handbook', description: '300-page comprehensive guide covering all CEH exam topics with real-world examples and labs.', price: 29, comparePrice: 49, images: ['/images/services/super.jpg'], category: 'ebook', stock: 999, tags: ['security', 'ebook', 'ceh'] },
  { slug: 'figma-ui-kit', title: 'Figma UI Kit — SaaS Edition', description: 'Complete Figma design system with 200+ components, 10 page templates, and dark/light mode variants.', price: 59, comparePrice: 99, images: ['/images/services/ui.gif'], category: 'design', stock: 999, tags: ['figma', 'design', 'ui-kit'] },
  { slug: 'nextjs-saas-boilerplate', title: 'Next.js SaaS Boilerplate', description: 'Production-ready SaaS starter with auth, billing (Stripe), dashboard, API, and deployment config.', price: 149, comparePrice: 249, images: ['/images/services/cor-web.jpg'], category: 'digital', stock: 999, tags: ['nextjs', 'saas', 'boilerplate'] },
];

async function seed() {
  process.stdout.write('Connecting to ' + MONGO_URI + '\n');
  await mongoose.connect(MONGO_URI);
  process.stdout.write('Connected!\n');
  await Promise.all([User.deleteMany({}), Page.deleteMany({}), Service.deleteMany({}), Course.deleteMany({}), Product.deleteMany({})]);
  process.stdout.write('Cleared collections\n');
  const usersWithHash = await Promise.all(USERS.map(async (u) => ({ ...u, password: await hash(u.password) })));
  await User.create(usersWithHash);
  process.stdout.write('Seeded ' + USERS.length + ' users\n');
  await Page.create(PAGES);
  process.stdout.write('Seeded ' + PAGES.length + ' pages\n');
  await Service.create(SERVICES);
  process.stdout.write('Seeded ' + SERVICES.length + ' services\n');
  await Course.create(COURSES);
  process.stdout.write('Seeded ' + COURSES.length + ' courses\n');
  await Product.create(PRODUCTS);
  process.stdout.write('Seeded ' + PRODUCTS.length + ' products\n');
  process.stdout.write('\nDatabase seeded!\nAdmin: admin@cifertrooper.com / Admin@1234\n');
  await mongoose.disconnect();
  process.exit(0);
}
seed().catch((err) => { process.stderr.write('Seed failed: ' + err.message + '\n'); process.exit(1); });
