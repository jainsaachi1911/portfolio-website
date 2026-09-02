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
    'I design and build backend systems — Spring Boot microservices containerised with Docker, orchestrated on Kubernetes and shipped through GitLab CI/CD. My focus is scalable, secure architecture that holds up in production.',
  summary:
    'Software engineer working across distributed backend services, cloud-native infrastructure and secure, scalable system design.',
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
    'I work across the backend stack — designing Spring Boot microservices and RESTful APIs, containerising them with Docker and orchestrating deployments on Kubernetes. Day to day that means writing production Java, hardening the code that already runs, and automating build and release through GitLab CI/CD pipelines.',
    'What pulls me in is system design: how services are decomposed, how they fail, and how they scale. I care about the architectural decisions that make a platform both resilient and secure — service discovery and API gateways, observability, secure code review, and infrastructure a team can actually reason about.',
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
    grade: 'CGPA: 3.53/4',
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
      'Designed a real-time fraud detection system leveraging microservices architecture and rule-based logic to identify suspicious activity efficiently, ensuring scalable and secure transaction monitoring.',
    tech: ['SpringBoot', 'Eureka Server', 'API gateway', 'Docker', 'Kubernetes', 'MySQL'],
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
      'Currently developing a comprehensive full-stack application that leverages artificial intelligence for enhanced user experiences and intelligent automation features.',
    tech: ['React', 'Node.js', 'AI/ML', 'TypeScript', 'PostgreSQL'],
    href: 'https://github.com/jainsaachi1911/ai-powered-fullstack-platform',
    status: 'In Development',
    accent: 'lime',
  },
];

export type SkillGroup = {
  key: string;
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    key: 'programming',
    label: 'Programming',
    items: ['Python', 'Java', 'C++', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    key: 'web',
    label: 'Web',
    items: ['Spring Boot REST APIs', 'React.js', 'OAuth2', 'MySQL'],
  },
  {
    key: 'aiMl',
    label: 'AI / ML',
    items: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'TensorFlow', 'OpenCV', 'YOLO', 'NLP'],
  },
  {
    key: 'tools',
    label: 'Tools',
    items: ['Git', 'Docker', 'Kubernetes', 'AWS (beginner)'],
  },
  {
    key: 'concepts',
    label: 'Concepts',
    items: ['OOP', 'RESTful APIs', 'Docker', 'Kubernetes', 'Microservices Architecture'],
  },
  {
    key: 'soft',
    label: 'Collaboration',
    items: [
      'Agile Collaboration',
      'Sprint Planning',
      'Communication Skills',
      'Problem Solving',
      'Cross-Functional Teamwork',
    ],
  },
];

/** Self-assessed proficiency, plotted as coded meters and a wireframe radar. */
export const aiMlProficiency = [
  { name: 'TensorFlow', value: 60 },
  { name: 'OpenCV', value: 85 },
  { name: 'YOLO', value: 89 },
  { name: 'NLP', value: 40 },
  { name: 'Scikit-learn', value: 70 },
  { name: 'Pandas', value: 65 },
];

export const webProficiency = [
  { name: 'React.js', value: 70 },
  { name: 'Spring Boot', value: 50 },
  { name: 'REST APIs', value: 77 },
  { name: 'OAuth2', value: 55 },
  { name: 'MySQL', value: 70 },
  { name: 'AWS', value: 35 },
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
    name: 'Dr. Manoj Sankhe',
    position: 'Senior Professor & Department In-charge',
    company: 'Databyte Systems',
    text: 'Exceptional talent in AI/ML with outstanding problem-solving abilities. Delivered high-quality solutions consistently. She was a valuable asset to the team.',
  },
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
