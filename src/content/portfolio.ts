/**
 * Single source of truth for every piece of copy on the site.
 * Text here is carried over verbatim from the original portfolio.
 */

const BASE = '/portfolio-website';

export const profile = {
  firstName: 'Saachi',
  lastName: 'Jain',
  fullName: 'Saachi Jain',
  role: 'Software Engineer & Systems Architect',
  /** Split so the masthead can set the ampersand in the accent colour. */
  roleParts: ['Software Engineer', 'Systems Architect'],
  intro:
    'I design and ship backend systems that hold up in production — Spring Boot microservices containerised with Docker, orchestrated on Kubernetes and released through GitLab CI/CD on AWS. My focus is system design: how services are decomposed, how they fail, and how they scale.',
  summary:
    'Software engineer building distributed backend systems — microservices architecture, cloud-native infrastructure on AWS, and AI-powered services designed for scale, security and uptime.',
  location: 'Mumbai, India',
  coordinates: '19.0760° N / 72.8777° E',
  availability: 'Available for opportunities',
  email: 'jainsaachi1911@gmail.com',
  cv: 'https://drive.google.com/file/d/1_2LQr65PwSRyGcKTWTji73euhqE0PScY/view?usp=sharing',
  footer: '2025 Saachi Jain. Built with React & Tailwind CSS.',
} as const;

export const socials = [
  { label: 'GitHub', handle: 'jainsaachi1911', href: 'https://github.com/jainsaachi1911' },
  { label: 'LinkedIn', handle: 'saachijain1911', href: 'https://www.linkedin.com/in/saachijain1911/' },
  { label: 'Email', handle: profile.email, href: `mailto:${profile.email}` },
] as const;

export const about = {
  heading: 'My Journey',
  paragraphs: [
    'I work across the backend stack — designing Spring Boot microservices and RESTful APIs, containerising them with Docker and orchestrating deployments on Kubernetes. Day to day that means writing production Java for a high-availability insurance platform serving customers at scale, hardening the code that already runs, and automating build and release through GitLab CI/CD.',
    'What pulls me in is system design: service decomposition, service discovery and API gateways, caching and load balancing, observability and graceful failure. I have taken systems from architecture diagram to deployed service — a distributed fraud detection platform, a serverless OCR pipeline on AWS Lambda, and an enterprise migration from SVN to GitLab — and I care about building infrastructure a team can actually reason about.',
  ],
  plates: [
    { src: `${BASE}/sih.jpg`, alt: 'Saachi Jain at the Smart India Hackathon finals' },
    { src: `${BASE}/srg.jpg`, alt: 'Saachi Jain presenting student research group work' },
    { src: `${BASE}/saavishkar.jpeg`, alt: 'Saachi Jain receiving first place at Saavishkar 2024-25' },
    { src: `${BASE}/cs.jpg`, alt: 'Saachi Jain at a community service initiative' },
  ],
} as const;

export type Education = {
  degree: string;
  institution: string;
  period: string;
  grade: string;
};

export const education: Education[] = [
  {
    degree: 'B. Tech in Computer Engineering (Honours in AI/ML)',
    institution: 'MPSTME, NMIMS University',
    period: '2023 - 2026',
    grade: 'CGPA: 3.60/4',
  },
  {
    degree: 'Diploma in Computer Engineering',
    institution: 'MPSTME, NMIMS University',
    period: '2020 - 2023',
    grade: 'CGPA: 3.51/4',
  },
  {
    degree: 'ICSE',
    institution: 'Ryan International School',
    period: '2020',
    grade: 'Percentage: 91.71%',
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
};

export const experience: Experience[] = [
  {
    role: 'Management Trainee — Software Development Engineer',
    company: 'ICICI Prudential Life Insurance',
    period: '2026 — Present',
    description:
      'Develop and maintain production features for a customer-facing insurance platform built on Spring Boot, Spring Web Flow and AngularJS. Build RESTful services and modular server-side components within a high-availability enterprise architecture, and ship through Agile sprints with code review, testing and release support across environments.',
    tech: ['Spring Boot', 'Spring Web Flow', 'AngularJS', 'Java', 'REST APIs', 'Agile / Scrum'],
  },
  {
    role: 'IT Security Analyst',
    company: 'ICICI Prudential Life Insurance',
    period: 'Jan 2026 — May 2026',
    description:
      'Performed secure code reviews and vulnerability assessments across production-ready applications, identifying and remediating security defects before release. Drove the enterprise migration from SVN to GitLab, integrating GitLab CI/CD pipelines into existing DevOps workflows to standardise version control and automate builds. Engineered a serverless OCR pipeline on AWS — pairing Amazon Textract with Tesseract across S3, Lambda and CloudWatch — to automate text extraction and monitoring of video log feeds.',
    tech: [
      'GitLab CI/CD',
      'SVN to GitLab Migration',
      'AWS Lambda',
      'Amazon S3',
      'Amazon Textract',
      'Amazon CloudWatch',
      'Tesseract OCR',
      'Secure Code Review',
      'DevSecOps',
    ],
  },
  {
    role: 'AI/ML Research Intern',
    company: 'Databyte Systems and Services',
    period: '1 year',
    description:
      'Developed an AI-powered real-time surveillance system using YOLOv8 and MTCNN, achieving 82.6% mAP@0.5 for object detection and a 30 FPS tracking rate, enabling accurate multi-camera crime detection and continuous person tracking.',
    tech: ['YOLOv8', 'MTCNN', 'Computer Vision', 'Deep Learning', 'Real-time Analytics'],
  },
  {
    role: 'Frontend Developer Intern',
    company: 'InventoHub',
    period: '4 months',
    description:
      'Built responsive front-end with React.js and Material UI Styling, implementing OAuth authentication and multi-step validated forms. Collaborated on REST API integration with AWS Database.',
    tech: ['React.js', 'Material UI', 'OAuth2', 'AWS', 'REST APIs'],
  },
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  href: string | null;
  /** Shown in place of a repository link when the work is still in flight. */
  status?: string;
  accent: 'flare' | 'cobalt' | 'lime' | 'paper';
};

export const projects: Project[] = [
  {
    title: 'Fraud Detection in Digital Transactions',
    description:
      'Designed a distributed, real-time fraud detection platform: independently deployable Spring Boot services behind an API gateway, discovered through Eureka, containerised with Docker and orchestrated on Kubernetes. Rule-based scoring flags suspicious transactions in-flight while the architecture keeps monitoring scalable, secure and resilient to single-service failure.',
    tech: ['Spring Boot', 'Eureka Server', 'API Gateway', 'Docker', 'Kubernetes', 'MySQL'],
    href: 'https://github.com/jainsaachi1911/Fraud-Detection-SpringBoot-Microservices',
    accent: 'flare',
  },
  {
    title: 'AI-based Microplastics Detection and Classification',
    description:
      'An automated microplastic detection and pollution classification system using YOLOv10 achieved 94.50% mAP@0.5, with over 1,700 augmented images across four classes.',
    tech: ['YOLOv10', 'Streamlit', 'Computer Vision', 'Deep Learning'],
    href: 'https://github.com/jainsaachi1911/AI-Based-Microplastic-Detection',
    accent: 'cobalt',
  },
  {
    title: 'Traffic Violation Monitoring',
    description:
      'Built a real-time traffic monitoring system to detect red light violations using color segmentation for signal detection and centroid-based object tracking. Defined a violation zone near the stop line and captured vehicles crossing it during a red signal.',
    tech: ['OpenCV', 'Python', 'NumPy', 'Object Tracking', 'HSV Color Segmentation'],
    href: 'https://github.com/jainsaachi1911/traffic-violation-monitoring',
    accent: 'paper',
  },
  {
    title: 'AI-Powered Full Stack Platform',
    description:
      'Building a full-stack platform with a retrieval-augmented generation (RAG) layer — vector search over an embedded knowledge base, served through a typed API to a React front end — so answers stay grounded in real data rather than model guesswork.',
    tech: ['React', 'Node.js', 'RAG', 'LangChain', 'TypeScript', 'PostgreSQL'],
    href: 'https://github.com/jainsaachi1911/ai-powered-fullstack-platform',
    status: 'In Development',
    accent: 'lime',
  },
];

export type Skill = {
  name: string;
  /** Marks the tools that carry production work — rendered as a lit chip. */
  core?: boolean;
};

export type SkillGroup = {
  key: string;
  label: string;
  /** One recruiter-facing line on what this group is actually used for. */
  summary: string;
  /** The shipped work this group backs — keeps the stack tied to evidence. */
  shippedIn: string[];
  accent: 'flare' | 'cobalt' | 'lime' | 'paper';
  items: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    key: 'backend',
    label: 'Backend & APIs',
    summary: 'Production Java services and REST APIs, decomposed into microservices that scale independently.',
    shippedIn: ['ICICI Prudential Platform', 'Fraud Detection Microservices'],
    accent: 'flare',
    items: [
      { name: 'Java', core: true },
      { name: 'Spring Boot', core: true },
      { name: 'Spring Web Flow' },
      { name: 'REST APIs', core: true },
      { name: 'Microservices', core: true },
      { name: 'Eureka Service Discovery' },
      { name: 'API Gateway' },
      { name: 'OAuth2' },
      { name: 'Node.js' },
      { name: 'MySQL', core: true },
      { name: 'PostgreSQL' },
    ],
  },
  {
    key: 'systemDesign',
    label: 'System Design',
    summary: 'How services split, how they fail and how they hold up — the architecture decisions behind the code.',
    shippedIn: ['Fraud Detection Microservices', 'ICICI Prudential Platform'],
    accent: 'cobalt',
    items: [
      { name: 'Distributed Systems', core: true },
      { name: 'Service Decomposition', core: true },
      { name: 'High Availability' },
      { name: 'Load Balancing' },
      { name: 'Caching Strategies' },
      { name: 'Event-Driven Design' },
      { name: 'Fault Tolerance' },
      { name: 'Observability' },
      { name: 'Secure Code Review', core: true },
      { name: 'OOP & Design Patterns' },
    ],
  },
  {
    key: 'cloud',
    label: 'Cloud, Containers & CI/CD',
    summary: 'Containerised services shipped to the cloud through automated pipelines, with monitoring wired in.',
    shippedIn: ['Serverless OCR Pipeline', 'SVN → GitLab Migration'],
    accent: 'lime',
    items: [
      { name: 'AWS', core: true },
      { name: 'Docker', core: true },
      { name: 'Kubernetes', core: true },
      { name: 'GitLab CI/CD', core: true },
      { name: 'AWS Lambda' },
      { name: 'Amazon S3' },
      { name: 'Amazon Textract' },
      { name: 'CloudWatch' },
      { name: 'Git' },
      { name: 'Linux' },
      { name: 'DevSecOps' },
    ],
  },
  {
    key: 'aiEngineering',
    label: 'AI Engineering',
    summary: 'Retrieval-augmented services and models wired into real products, not notebooks.',
    shippedIn: ['AI-Powered Full Stack Platform', 'ADTS Surveillance System'],
    accent: 'paper',
    items: [
      { name: 'RAG Pipelines', core: true },
      { name: 'Vector Databases' },
      { name: 'LangChain' },
      { name: 'LLM APIs' },
      { name: 'Embeddings' },
      { name: 'Prompt Engineering' },
      { name: 'TensorFlow' },
      { name: 'Scikit-learn' },
      { name: 'NLP' },
    ],
  },
  {
    key: 'vision',
    label: 'Computer Vision',
    summary: 'Real-time detection and tracking systems benchmarked on accuracy and frame rate.',
    shippedIn: ['Microplastics Detection', 'Traffic Violation Monitoring'],
    accent: 'cobalt',
    items: [
      { name: 'YOLOv8 / YOLOv10', core: true },
      { name: 'OpenCV', core: true },
      { name: 'MTCNN' },
      { name: 'Tesseract OCR' },
      { name: 'Object Tracking' },
      { name: 'NumPy' },
      { name: 'Pandas' },
      { name: 'Matplotlib' },
    ],
  },
  {
    key: 'automation',
    label: 'AI Automation',
    summary: 'Agentic tooling and workflow automation that removes the repetitive parts of delivery.',
    shippedIn: ['Internal Workflow Automation'],
    accent: 'flare',
    items: [
      { name: 'n8n', core: true },
      { name: 'Zapier' },
      { name: 'Make.com' },
      { name: 'Cursor', core: true },
      { name: 'GitHub Copilot' },
      { name: 'OpenAI API' },
      { name: 'Hugging Face' },
    ],
  },
  {
    key: 'frontend',
    label: 'Frontend & Web',
    summary: 'Interfaces on top of the services — typed, responsive and accessible.',
    shippedIn: ['ICICI Prudential Platform', 'InventoHub'],
    accent: 'lime',
    items: [
      { name: 'React.js', core: true },
      { name: 'TypeScript' },
      { name: 'JavaScript' },
      { name: 'AngularJS' },
      { name: 'Tailwind CSS' },
      { name: 'Material UI' },
      { name: 'Webflow' },
      { name: 'Streamlit' },
      { name: 'HTML / CSS' },
    ],
  },
  {
    key: 'languages',
    label: 'Languages & Foundations',
    summary: 'The fundamentals every one of these systems is built on.',
    shippedIn: ['Every project on this page'],
    accent: 'paper',
    items: [
      { name: 'Java', core: true },
      { name: 'Python', core: true },
      { name: 'C++' },
      { name: 'SQL', core: true },
      { name: 'TypeScript' },
      { name: 'Data Structures' },
      { name: 'Algorithms' },
      { name: 'Operating Systems' },
      { name: 'Computer Networks' },
    ],
  },
];

export const waysOfWorking = [
  'Agile / Scrum',
  'Sprint Planning',
  'Code Review',
  'Cross-Functional Teamwork',
  'Technical Communication',
];

/** Self-assessed proficiency, plotted as coded meters and a wireframe radar. */
export const engineeringProficiency = [
  { name: 'Java & Spring Boot', value: 84 },
  { name: 'REST & Microservices', value: 80 },
  { name: 'System Design', value: 76 },
  { name: 'Docker & Kubernetes', value: 72 },
  { name: 'CI/CD & DevSecOps', value: 74 },
  { name: 'AWS Cloud', value: 66 },
  { name: 'SQL & Data Modelling', value: 70 },
];

export const aiMlProficiency = [
  { name: 'RAG / LLM', value: 72 },
  { name: 'OpenCV', value: 85 },
  { name: 'YOLO', value: 89 },
  { name: 'NLP', value: 55 },
  { name: 'Sklearn', value: 70 },
  { name: 'TensorFlow', value: 60 },
];

export type Publication = {
  title: string;
  venue: string;
  status: string;
  year: string;
  description: string;
  paperLink: string;
  ieeexploreLink: string | null;
};

export const publications: Publication[] = [
  {
    title:
      'Advanced AI-Based Detection and Tracking System (ADTS) for Crime Prevention and Identification in Real-Time Surveillance',
    venue: 'IEEE ICOCT, Bengaluru, Karnataka, India',
    status: 'Published in IEEE Xplore',
    year: '2024',
    description:
      'Developed an innovative real-time surveillance system leveraging advanced AI algorithms for crime detection and prevention with high accuracy tracking capabilities.',
    paperLink: 'https://drive.google.com/file/d/14V5O4o_2TJgXE6zSKk4Dp-gNWqtIL21H/view?usp=sharing',
    ieeexploreLink: 'https://ieeexplore.ieee.org/document/11118424',
  },
  {
    title: 'Classification and Environmental Analysis of Microplastics for a Sustainable Ecosystem using AI',
    venue: 'Unpublished Research',
    status: 'In Review',
    year: '2025',
    description:
      'Comprehensive research on AI-powered microplastic detection and environmental impact analysis for sustainable ecosystem monitoring.',
    paperLink: 'https://drive.google.com/file/d/your-file-id/view?usp=sharing',
    ieeexploreLink: null,
  },
];

export const achievements = [
  'Won 1st Place at Saavishkar 2024–25 (IEEE NMIMS); developed ML innovation using Python – Computer Vision.',
  'Ranked Top 20 Finalist in Smart India Hackathon (SIH); built a prototype for optimized ship routing.',
  'Led community outreach and digital engagement as Director – Community Service, Rotaract Club of Bombay Airport (2023).',
  'Awarded Best Avenue Chair for event coordination and team leadership at Rotaract Club of Bombay Airport (2022–23).',
];

export const certifications = {
  headline: 'Over 15+ Certifications',
  caption: 'Professional development and learning achievements',
  href: 'https://www.coursera.org/learner/saachi-jain-1911',
  items: [
    'Introduction to Deep Learning – University of Colorado Boulder',
    'Machine Learning Foundation: A Case Study Approach - University of Washington',
    'Speak English Professionally: In Person, Online & On the Phone – Georgia Institute of Technology',
    'Improving your Statistical Inferences by Eindhoven University of Technology',
    'Regression, Classification, and Clustering Models by CertNexus',
    'Introduction to Artificial Intelligence – IBM',
  ],
} as const;

export type Recommendation = {
  name: string;
  position: string;
  company: string;
  text: string;
};

export const recommendations: Recommendation[] = [
  {
    name: "Savio D'Souza",
    position: 'Founder',
    company: 'InventoHub',
    text: 'Saachi showed a strong sense of responsibility, quick adaptability, and a collaborative mindset that made her a valuable contributor to our team.',
  },
];

export type SectionMeta = {
  id: string;
  index: string;
  label: string;
  /** Shorter label used by the navigation rail. */
  nav?: string;
  inNav: boolean;
};

export const sections: SectionMeta[] = [
  { id: 'home', index: '00', label: 'Index', inNav: false },
  { id: 'about', index: '01', label: 'About', inNav: true },
  { id: 'education', index: '02', label: 'Education', inNav: true },
  { id: 'experience', index: '03', label: 'Experience', inNav: true },
  { id: 'projects', index: '04', label: 'Selected Work', nav: 'Work', inNav: true },
  { id: 'skills', index: '05', label: 'Stack', inNav: true },
  { id: 'publications', index: '06', label: 'Research', inNav: true },
  { id: 'achievements', index: '07', label: 'Recognition', inNav: true },
  { id: 'references', index: '08', label: 'References', inNav: false },
  { id: 'contact', index: '09', label: 'Contact', inNav: true },
];
