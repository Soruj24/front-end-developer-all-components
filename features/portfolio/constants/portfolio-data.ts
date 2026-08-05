import type {
  Project,
  Skill,
  Experience,
  Testimonial,
  Stat,
  ContactInfo,
  NavItem,
} from "../types/portfolio";

export const navItems: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const stats: Stat[] = [
  { label: "Years Experience", value: "8", suffix: "+" },
  { label: "Projects Delivered", value: "120", suffix: "+" },
  { label: "Happy Clients", value: "85", suffix: "+" },
  { label: "Open Source Contributions", value: "300", suffix: "+" },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "NextPay Dashboard",
    subtitle: "Fintech Payment Platform",
    description:
      "A comprehensive payment processing dashboard handling $2M+ in monthly transactions. Built with real-time analytics, multi-currency support, and PCI-DSS compliance.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    tags: ["Next.js 14", "TypeScript", "Stripe", "PostgreSQL"],
    category: "Dashboard",
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Stripe Connect", "Prisma", "PostgreSQL", "Redis", "Vercel"],
    liveUrl: "https://nextpay-demo.vercel.app",
    githubUrl: "https://github.com/username/nextpay",
    featured: true,
    metrics: [
      { label: "Monthly Transactions", value: "$2.4M" },
      { label: "Uptime", value: "99.99%" },
      { label: "Response Time", value: "<120ms" },
    ],
  },
  {
    id: "2",
    title: "Artisan Marketplace",
    subtitle: "E-Commerce Platform",
    description:
      "A curated marketplace connecting artisan makers with conscious consumers. Features real-time inventory, custom product builder, and AI-powered recommendations.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "E-Commerce",
    techStack: ["React 18", "Node.js", "Express", "MongoDB", "Stripe", "AWS S3", "Elasticsearch", "Docker"],
    liveUrl: "https://artisan-market.vercel.app",
    githubUrl: "https://github.com/username/artisan-market",
    featured: true,
    metrics: [
      { label: "Active Sellers", value: "2,400+" },
      { label: "GMV", value: "$180K/mo" },
      { label: "Conversion Rate", value: "4.2%" },
    ],
  },
  {
    id: "3",
    title: "HealthPulse",
    subtitle: "Health & Fitness SaaS",
    description:
      "A SaaS platform for personal trainers and gym owners to manage clients, track workouts, and process subscriptions. Includes a native mobile companion app.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=500&fit=crop",
    tags: ["Next.js", "React Native", "Supabase", "Tailwind"],
    category: "SaaS",
    techStack: ["Next.js 14", "React Native", "Supabase", "Tailwind CSS", "Stripe Billing", "Push Notifications", "Expo"],
    liveUrl: "https://healthpulse-app.vercel.app",
    githubUrl: "https://github.com/username/healthpulse",
    featured: true,
    metrics: [
      { label: "Active Users", value: "12K+" },
      { label: "MRR", value: "$48K" },
      { label: "NPS Score", value: "72" },
    ],
  },
  {
    id: "4",
    title: "DevCollab",
    subtitle: "Developer Collaboration Tool",
    description:
      "Real-time collaborative IDE with video chat, shared terminals, and live code preview. Built for remote pair programming and technical interviews.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop",
    tags: ["TypeScript", "WebSockets", "Docker", "WebRTC"],
    category: "Web App",
    techStack: ["Next.js 14", "TypeScript", "Socket.io", "WebRTC", "Docker", "Monaco Editor", "Redis", "PostgreSQL"],
    liveUrl: "https://devcollab.io",
    githubUrl: "https://github.com/username/devcollab",
    featured: true,
    metrics: [
      { label: "Daily Sessions", value: "1,800" },
      { label: "Latency", value: "<50ms" },
      { label: "Code Reviews", value: "8,400+" },
    ],
  },
  {
    id: "5",
    title: "CloudSnap",
    subtitle: "AWS Infrastructure Monitor",
    description:
      "Infrastructure monitoring dashboard with cost optimization alerts, security scanning, and automated remediation for multi-account AWS setups.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop",
    tags: ["React", "Go", "Terraform", "AWS"],
    category: "Dashboard",
    techStack: ["React 18", "Go", "Terraform", "AWS Lambda", "CloudWatch", "DynamoDB", "Grafana", "Kubernetes"],
    liveUrl: "https://cloudsnap.dev",
    githubUrl: "https://github.com/username/cloudsnap",
    featured: false,
    metrics: [
      { label: "AWS Accounts", value: "340+" },
      { label: "Cost Savings", value: "$2.1M/yr" },
      { label: "Alerts Processed", value: "1.2M/day" },
    ],
  },
  {
    id: "6",
    title: "PixelForge",
    subtitle: "AI Image Generator",
    description:
      "Text-to-image generation platform with style transfer, inpainting, and batch processing. Built on Stable Diffusion with a custom fine-tuned model.",
    image: "https://images.unsplash.com/photo-1686191128892-3b3728d49767?w=800&h=500&fit=crop",
    tags: ["Python", "FastAPI", "React", "GPU"],
    category: "Web App",
    techStack: ["React 18", "Python", "FastAPI", "Stable Diffusion", "Redis Queue", "S3", "CloudFront", "CUDA"],
    liveUrl: "https://pixelforge.ai",
    githubUrl: "https://github.com/username/pixelforge",
    featured: false,
    metrics: [
      { label: "Images Generated", value: "2.8M" },
      { label: "Avg Gen Time", value: "1.2s" },
      { label: "GPU Utilization", value: "94%" },
    ],
  },
];

export const skills: Skill[] = [
  { name: "React / Next.js", level: 95, category: "Frontend", icon: "⚛" },
  { name: "TypeScript", level: 92, category: "Frontend", icon: "📘" },
  { name: "Tailwind CSS", level: 90, category: "Frontend", icon: "🎨" },
  { name: "Node.js / Express", level: 88, category: "Backend", icon: "🟢" },
  { name: "PostgreSQL", level: 85, category: "Backend", icon: "🐘" },
  { name: "MongoDB", level: 82, category: "Backend", icon: "🍃" },
  { name: "AWS / Vercel", level: 80, category: "DevOps", icon: "☁️" },
  { name: "Docker / K8s", level: 75, category: "DevOps", icon: "🐳" },
  { name: "Figma", level: 78, category: "Design", icon: "🎯" },
  { name: "GraphQL", level: 82, category: "Backend", icon: "◆" },
  { name: "Python / FastAPI", level: 78, category: "Backend", icon: "🐍" },
  { name: "CI/CD Pipelines", level: 85, category: "DevOps", icon: "🔄" },
];

export const experiences: Experience[] = [
  {
    id: "1",
    role: "Senior Frontend Engineer",
    company: "Stripe",
    logo: "https://images.unsplash.com/photo-1557683316-973673baf926?w=100&h=100&fit=crop",
    startDate: "Jan 2022",
    endDate: "Present",
    current: true,
    description:
      "Leading frontend architecture for the Payments Dashboard, serving millions of merchants worldwide.",
    achievements: [
      "Redesigned the checkout flow, increasing conversion by 18% across 50K merchants",
      "Built a real-time analytics dashboard processing 10M+ events daily",
      "Led migration from class components to React Server Components, reducing bundle size by 35%",
      "Mentored 4 junior engineers and established frontend code review standards",
    ],
    techStack: ["React", "TypeScript", "Ruby on Rails", "GraphQL", "Kafka"],
  },
  {
    id: "2",
    role: "Full Stack Developer",
    company: "Vercel",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop",
    startDate: "Mar 2020",
    endDate: "Dec 2021",
    current: false,
    description:
      "Full stack development on the Next.js platform and deployment infrastructure.",
    achievements: [
      "Shipped the Edge Functions runtime, reducing cold starts by 60%",
      "Built the deployment preview system used by 200K+ developers",
      "Implemented SSR streaming, improving TTFB by 40% for data-heavy pages",
      "Contributed to Next.js open source with 15+ merged PRs",
    ],
    techStack: ["Next.js", "TypeScript", "Go", "PostgreSQL", "Redis"],
  },
  {
    id: "3",
    role: "Frontend Engineer",
    company: "Shopify",
    logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop",
    startDate: "Jun 2018",
    endDate: "Feb 2020",
    current: false,
    description:
      "Developed merchant-facing features for the Shopify admin and online store editor.",
    achievements: [
      "Built the product variant editor used by 1M+ merchants daily",
      "Reduced admin page load time from 4.2s to 1.8s through code splitting and lazy loading",
      "Created a component library adopted by 5 internal teams",
      "Led accessibility audit achieving WCAG 2.1 AA compliance",
    ],
    techStack: ["React", "TypeScript", "Ruby on Rails", "GraphQL", "Polaris"],
  },
  {
    id: "4",
    role: "Junior Developer",
    company: "Local Startup (Acqui-Hired)",
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    startDate: "Aug 2017",
    endDate: "May 2018",
    current: false,
    description:
      "First engineering hire building the MVP of a B2B SaaS platform from zero to product-market fit.",
    achievements: [
      "Built the entire frontend from scratch in 3 months",
      "Implemented real-time collaboration features using WebSockets",
      "Scaled from 0 to 500 paying customers in 6 months",
      "Company acqui-hired by a Series B startup",
    ],
    techStack: ["React", "Node.js", "MongoDB", "Socket.io", "Heroku"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "CTO",
    company: "NextPay",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    quote:
      "One of the most talented engineers I've worked with. Delivered our payment dashboard ahead of schedule with zero critical bugs. Their attention to performance optimization saved us $40K/month in infrastructure costs.",
    rating: 5,
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    role: "Founder & CEO",
    company: "Artisan Marketplace",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    quote:
      "Transformed our rough wireframes into a beautiful, scalable platform. The AI recommendation engine they built increased our average order value by 34%. Absolutely world-class work.",
    rating: 5,
  },
  {
    id: "3",
    name: "Emily Watson",
    role: "VP of Engineering",
    company: "Stripe",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    quote:
      "A rare combination of technical depth and product thinking. Led our dashboard redesign that increased merchant satisfaction scores by 28 points. Strongly recommend for any complex frontend challenge.",
    rating: 5,
  },
  {
    id: "4",
    name: "James Park",
    role: "Product Lead",
    company: "Vercel",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    quote:
      "Built features that our developers love. The Edge Functions runtime they shipped reduced our customers' cold start times by 60%. A true craftsperson who cares deeply about developer experience.",
    rating: 5,
  },
];

export const contactInfo: ContactInfo = {
  email: "hello@johndoe.dev",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  socials: [
    { platform: "GitHub", url: "https://github.com/johndoe", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
    { platform: "Twitter", url: "https://twitter.com/johndoe", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
    { platform: "Dribbble", url: "https://dribbble.com/johndoe", icon: "M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.81zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.29zm10.335 3.483c-.218.29-1.91 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" },
  ],
};
