import type { BlogPost, BlogCategoryCount, BlogTag } from "../types/blog.types";

export const BLOG_CATEGORIES: BlogCategoryCount[] = [
  { name: "Technology", count: 8 },
  { name: "Design", count: 6 },
  { name: "Business", count: 4 },
  { name: "AI", count: 5 },
  { name: "Security", count: 3 },
];

export const BLOG_TAGS: BlogTag[] = [
  { name: "Next.js", count: 4 },
  { name: "React", count: 3 },
  { name: "TypeScript", count: 2 },
  { name: "AI", count: 5 },
  { name: "LLM", count: 2 },
  { name: "Design Systems", count: 3 },
  { name: "Security", count: 3 },
  { name: "Edge", count: 2 },
  { name: "Serverless", count: 2 },
  { name: "UX", count: 4 },
  { name: "Architecture", count: 2 },
  { name: "Accessibility", count: 2 },
  { name: "OAuth", count: 1 },
  { name: "Animation", count: 1 },
  { name: "Startup", count: 1 },
  { name: "Remote Work", count: 1 },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "building-scalable-web-apps-nextjs",
    title: "Building Scalable Web Applications with Next.js",
    excerpt:
      "Learn how to architect and build modern web applications that scale seamlessly using Next.js and its powerful features including server components, streaming, and edge functions.",
    content: `
## Why Next.js?

Next.js has become the go-to framework for building production-grade web applications. Its hybrid rendering model gives you the flexibility to choose the best rendering strategy per page.

### Server Components

React Server Components allow you to render components on the server, reducing the JavaScript bundle sent to the client. This means faster page loads and better SEO.

\`\`\`tsx
// This component runs on the server
async function BlogPost({ id }: { id: string }) {
  const post = await fetchPost(id);
  return <Article data={post} />;
}
\`\`\`

### Streaming and Suspense

Streaming lets you progressively render UI from the server to the client. You can show a loading skeleton while waiting for slow data fetches.

\`\`\`tsx
import { Suspense } from "react";

export default function Page() {
  return (
    <Layout>
      <Header />
      <Suspense fallback={<Skeleton />}>
        <SlowDataComponent />
      </Suspense>
    </Layout>
  );
}
\`\`\`

### Edge Functions

Edge functions run closer to your users, reducing latency for API routes and middleware. They're perfect for authentication checks, A/B testing, and geolocation-based rendering.

## Architecture Patterns

### Feature-Based Structure

Organize your code by features, not by type. Each feature folder contains its own components, hooks, types, and utilities.

### Data Fetching Strategy

Use a layered approach to data fetching:
1. **Server Components** for initial data
2. **Route Handlers** for client-side updates
3. **Server Actions** for form submissions

### Caching

Next.js provides multiple caching layers:
- **Full Route Cache** for static pages
- **Data Cache** for fetched data
- **Router Cache** for client-side navigation

## Performance Tips

1. **Use \`next/image\`** for optimized images with lazy loading
2. **Split large pages** into smaller components with dynamic imports
3. **Leverage edge runtime** for low-latency responses
4. **Monitor bundle size** with \`@next/bundle-analyzer\`

## Conclusion

Next.js provides all the tools you need to build scalable web applications. By following these patterns and leveraging the framework's features, you can create applications that handle millions of users with ease.
    `,
    category: "Technology",
    author: {
      name: "Sarah Chen",
      role: "Senior Engineer",
      bio: "Sarah is a senior engineer with 10+ years of experience building scalable web applications. She specializes in React, Next.js, and distributed systems.",
      social: {
        twitter: "https://twitter.com/sarahchen",
        github: "https://github.com/sarahchen",
        linkedin: "https://linkedin.com/in/sarahchen",
      },
    },
    date: "Mar 15, 2026",
    readTime: "8 min read",
    featured: true,
    tags: ["Next.js", "React", "Architecture"],
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    views: 12847,
    likes: 342,
    comments: [
      {
        id: "c1",
        author: "Mike Johnson",
        date: "Mar 16, 2026",
        content: "Great article! The section on streaming was particularly helpful. I've been struggling with loading states in my app.",
        likes: 24,
        replies: [
          {
            id: "c1r1",
            author: "Sarah Chen",
            date: "Mar 16, 2026",
            content: "Thanks Mike! Streaming has been a game-changer for our team's UX. Happy to help if you have more questions.",
            likes: 8,
          },
        ],
      },
      {
        id: "c2",
        author: "Lisa Wang",
        date: "Mar 17, 2026",
        content: "The architecture patterns section is gold. We just migrated our monolith to a feature-based structure and it's been incredible for developer experience.",
        likes: 15,
      },
      {
        id: "c3",
        author: "David Park",
        date: "Mar 18, 2026",
        content: "Would love to see a follow-up on how to handle authentication with Next.js middleware. That's always been tricky for me.",
        likes: 9,
      },
    ],
  },
  {
    id: "2",
    slug: "future-of-ui-design-trends-2026",
    title: "The Future of UI Design Trends in 2026",
    excerpt:
      "Explore the emerging design patterns and visual trends shaping the future of user interfaces from glassmorphism to kinetic typography.",
    content: `
## Design Trends Shaping 2026

The design landscape is evolving rapidly. Let's explore the trends that are defining the future of user interfaces.

### Glassmorphism 2.0

Glassmorphism has evolved beyond simple frosted glass effects. The new iteration combines:
- **Layered transparency** with depth perception
- **Dynamic blur** that responds to scroll position
- **Color-shifting glass** that adapts to content

### Kinetic Typography

Text is no longer static. Kinetic typography adds motion to create emotional connections:
- **Scroll-triggered animations** that reveal text as users explore
- **Morphing letterforms** that transition between weights
- **Responsive typography** that adapts to viewport and context

### AI-Powered Design

Artificial intelligence is transforming the design process:
- **Generative layouts** that adapt to content and user behavior
- **Dynamic color systems** that evolve based on usage patterns
- **Personalized interfaces** that learn from user interactions

### Spatial Design

With AR/VR becoming mainstream, spatial design principles are entering web:
- **Parallax depth** that creates 3D illusions
- **Spatial audio cues** for interface feedback
- **Gesture-based navigation** alongside traditional inputs

### Micro-Interactions

Small animations that provide feedback and delight:
- **Haptic-inspired animations** that mimic physical interactions
- **Contextual transitions** that guide user attention
- **Progressive disclosure** through motion

## Implementing These Trends

### CSS Techniques

Modern CSS makes these effects achievable without heavy JavaScript:

\`\`\`css
.glass-card {
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
\`\`\`

### Animation Libraries

Tools like Framer Motion and GSAP make complex animations accessible:

\`\`\`tsx
import { motion } from "framer-motion";

function AnimatedText({ text }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {text}
    </motion.h1>
  );
}
\`\`\`

## Accessibility Considerations

Every trend must be implemented with accessibility in mind:
- **Respect \`prefers-reduced-motion\`** for users who need fewer animations
- **Maintain contrast ratios** even with glassmorphism effects
- **Provide alternatives** for gesture-based interactions
- **Test with screen readers** to ensure motion doesn't break comprehension

## Conclusion

These trends represent exciting opportunities for creating more engaging and intuitive user experiences. The key is to implement them thoughtfully, always keeping accessibility and performance at the forefront.
    `,
    category: "Design",
    author: {
      name: "Alex Rivera",
      role: "Design Lead",
      bio: "Alex is a design lead passionate about creating beautiful, accessible digital experiences. He's spoken at multiple design conferences worldwide.",
      social: {
        twitter: "https://twitter.com/alexrivera",
        linkedin: "https://linkedin.com/in/alexrivera",
      },
    },
    date: "Mar 12, 2026",
    readTime: "6 min read",
    tags: ["UI", "Trends", "Design Systems"],
    coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    views: 8234,
    likes: 198,
    comments: [
      {
        id: "c4",
        author: "Emma Thompson",
        date: "Mar 13, 2026",
        content: "The section on spatial design is fascinating. I've been experimenting with parallax depth in my latest project and the results are stunning.",
        likes: 12,
      },
      {
        id: "c5",
        author: "Ryan Kim",
        date: "Mar 14, 2026",
        content: "Finally someone addresses accessibility with these trends! Too many articles ignore that aspect completely.",
        likes: 31,
      },
    ],
  },
  {
    id: "3",
    slug: "mastering-typescript-generics",
    title: "Mastering TypeScript Generics",
    excerpt:
      "A comprehensive guide to understanding and using TypeScript generics in your daily workflow with practical real-world examples.",
    content: `
## Why Generics Matter

Generics are one of TypeScript's most powerful features. They allow you to write flexible, reusable code while maintaining full type safety.

### Basic Generic Functions

Start with a simple identity function:

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

const result = identity<string>("hello"); // type: string
const num = identity(42); // type: number (inferred)
\`\`\`

### Generic Constraints

Constrain your generics to specific shapes:

\`\`\`typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello"); // OK
logLength([1, 2, 3]); // OK
logLength(42); // Error: number doesn't have .length
\`\`\`

### Generic Utility Types

TypeScript provides built-in generic utility types:

\`\`\`typescript
// Partial - all properties optional
type PartialUser = Partial<User>;

// Pick - select specific properties
type UserPreview = Pick<User, "id" | "name">;

// Omit - remove specific properties
type CreateUser = Omit<User, "id" | "createdAt">;
\`\`\`

## Real-World Examples

### API Response Wrapper

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

async function fetchApi<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  return response.json();
}

// Usage
const users = await fetchApi<User[]>("/api/users");
const user = await fetchApi<User>("/api/users/1");
\`\`\`

### Component Props

\`\`\`typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
\`\`\`

### State Management

\`\`\`typescript
class Store<T> {
  private state: T;

  constructor(initialState: T) {
    this.state = initialState;
  }

  getState(): T {
    return this.state;
  }

  setState(newState: Partial<T>): void {
    this.state = { ...this.state, ...newState };
  }
}
\`\`\`

## Advanced Patterns

### Conditional Types

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">; // true
type B = IsString<42>; // false
\`\`\`

### Mapped Types

\`\`\`typescript
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Optional<T> = {
  [K in keyof T]?: T[K];
};
\`\`\`

## Conclusion

Generics are essential for writing maintainable TypeScript code. They help you catch errors early, reduce code duplication, and create intuitive APIs. Practice these patterns and you'll find yourself reaching for generics naturally in your day-to-day work.
    `,
    category: "Technology",
    author: {
      name: "James Wilson",
      role: "Staff Engineer",
      bio: "James is a staff engineer with deep expertise in TypeScript and programming language design. He contributes to the TypeScript compiler.",
      social: {
        twitter: "https://twitter.com/jameswilson",
        github: "https://github.com/jameswilson",
      },
    },
    date: "Mar 10, 2026",
    readTime: "10 min read",
    tags: ["TypeScript", "Programming"],
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
    views: 15632,
    likes: 421,
    comments: [
      {
        id: "c6",
        author: "Chris Anderson",
        date: "Mar 11, 2026",
        content: "The conditional types section blew my mind. I've been using TypeScript for years and didn't know you could do that!",
        likes: 45,
      },
      {
        id: "c7",
        author: "Anna Lee",
        date: "Mar 11, 2026",
        content: "Could you do a follow-up on template literal types? They're equally powerful but confusing.",
        likes: 28,
      },
    ],
  },
  {
    id: "4",
    slug: "scaling-your-startup-lessons-learned",
    title: "Scaling Your Startup: Lessons Learned",
    excerpt:
      "Key insights from growing a tech startup from zero to millions of users while maintaining team culture and product quality.",
    content: `
## The Journey from 0 to 1M Users

Growing a startup is a marathon, not a sprint. Here are the lessons we learned along the way.

### Phase 1: Finding Product-Market Fit

Before scaling, you need to know people actually want your product. Signs you've found PMF:
- **Organic growth** is happening without paid marketing
- **Users are retention** - they come back regularly
- **NPS scores** are consistently positive
- **Word of mouth** is your primary acquisition channel

### Phase 2: Building the Foundation

Once you have PMF, invest in:
1. **Monitoring and observability** - you can't improve what you can't measure
2. **Automated testing** - manual QA doesn't scale
3. **CI/CD pipelines** - fast, reliable deployments
4. **Documentation** - onboarding new team members efficiently

### Phase 3: Scaling the Team

Your team culture will be tested as you grow. What worked for us:
- **Hire slowly** and carefully - one bad hire can derail months
- **Document everything** - tribal knowledge is a liability
- **Invest in onboarding** - first impressions matter
- **Create feedback loops** - regular 1:1s and retrospectives

### Phase 4: Scaling the Product

As your user base grows, your architecture needs to evolve:
- **Move from monolith to services** when teams need independence
- **Invest in caching** - database becomes the bottleneck first
- **Consider edge computing** - reduce latency for global users
- **Implement feature flags** - deploy safely, release when ready

## Common Mistakes

### Scaling Too Early
Premature optimization is real. Don't build for 10M users when you have 10K.

### Neglecting Tech Debt
Small shortcuts compound. Dedicate 20% of engineering time to paying down debt.

### Ignoring Culture
Growth without culture alignment creates dysfunction. Be intentional about values.

## Conclusion

Scaling a startup is one of the hardest challenges in tech. But with the right foundation, the right team, and the right mindset, it's incredibly rewarding.
    `,
    category: "Business",
    author: {
      name: "Priya Patel",
      role: "Founder",
      bio: "Priya is a founder and CEO who has raised over $50M in venture funding. She writes about entrepreneurship, leadership, and building great companies.",
      social: {
        twitter: "https://twitter.com/priyapatel",
        linkedin: "https://linkedin.com/in/priyapatel",
      },
    },
    date: "Mar 8, 2026",
    readTime: "7 min read",
    tags: ["Startup", "Growth"],
    coverImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
    views: 9876,
    likes: 267,
    comments: [
      {
        id: "c8",
        author: "Tom Harris",
        date: "Mar 9, 2026",
        content: "As a first-time founder, this is exactly what I needed to read. The section on scaling too early really resonated with our current situation.",
        likes: 19,
      },
    ],
  },
  {
    id: "5",
    slug: "integrating-llms-into-applications",
    title: "Integrating LLMs into Your Application",
    excerpt:
      "Practical steps for integrating large language models into real-world applications with cost optimization and latency considerations.",
    content: `
## Getting Started with LLMs

Large Language Models are transforming how we build software. Here's how to integrate them effectively.

### Choosing the Right Model

Consider these factors:
- **Latency requirements** - GPT-4 is slower than GPT-3.5
- **Cost constraints** - larger models cost more per token
- **Accuracy needs** - some tasks require the best model available
- **Privacy requirements** - some models can run locally

### Basic Integration

Start with a simple API call:

\`\`\`typescript
async function generateContent(prompt: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });
  return response.choices[0].message.content;
}
\`\`\`

### Prompt Engineering

The quality of your prompts determines output quality:

\`\`\`typescript
const systemPrompt = \`
You are a helpful assistant that generates professional emails.
Always use a formal tone.
Include a clear subject line.
Keep emails under 200 words.
\`;
\`\`\`

## Advanced Patterns

### Streaming Responses

Stream responses for better UX:

\`\`\`typescript
const stream = await openai.chat.completions.create({
  model: "gpt-4",
  messages,
  stream: true,
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content || "";
  appendToUI(content);
}
\`\`\`

### Function Calling

Let LLMs call your functions:

\`\`\`typescript
const functions = [
  {
    name: "get_weather",
    description: "Get current weather",
    parameters: {
      type: "object",
      properties: {
        location: { type: "string" },
      },
    },
  },
];
\`\`\`

### Caching and Rate Limiting

Cache responses and implement rate limiting:

\`\`\`typescript
class LLMCache {
  private cache = new Map<string, string>();

  async getOrCreate(
    key: string,
    fn: () => Promise<string>
  ): Promise<string> {
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }
    const result = await fn();
    this.cache.set(key, result);
    return result;
  }
}
\`\`\`

## Cost Optimization

1. **Use smaller models** for simple tasks
2. **Cache aggressively** for repeated queries
3. **Batch requests** when possible
4. **Set token limits** to control costs
5. **Monitor usage** with dashboards

## Conclusion

LLMs are powerful tools, but integrating them well requires careful consideration of cost, latency, and user experience. Start simple, measure everything, and iterate.
    `,
    category: "AI",
    author: {
      name: "Michael Brown",
      role: "AI Engineer",
      bio: "Michael is an AI engineer who has built production ML systems at scale. He's passionate about making AI accessible to all developers.",
      social: {
        twitter: "https://twitter.com/michaelbrown",
        github: "https://github.com/michaelbrown",
      },
    },
    date: "Mar 5, 2026",
    readTime: "12 min read",
    tags: ["LLM", "AI", "Integration"],
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    views: 18923,
    likes: 534,
    comments: [
      {
        id: "c9",
        author: "Jessica Wu",
        date: "Mar 6, 2026",
        content: "The streaming section is really practical. We implemented this in our chatbot and the UX improvement was immediate.",
        likes: 32,
      },
      {
        id: "c10",
        author: "Mark Davis",
        date: "Mar 6, 2026",
        content: "Would love to see a comparison of different LLM providers. Cost vs quality trade-offs are always tricky.",
        likes: 21,
      },
    ],
  },
  {
    id: "6",
    slug: "web-security-best-practices-2026",
    title: "Web Security Best Practices for 2026",
    excerpt:
      "Stay ahead of threats with the latest security practices and tools for web applications including zero-trust architecture.",
    content: `
## The Modern Security Landscape

Web security threats are evolving rapidly. Here's how to protect your applications in 2026.

### Zero-Trust Architecture

The traditional perimeter-based security model is dead. Zero-trust means:
- **Never trust, always verify** - every request is authenticated
- **Least privilege access** - users get minimum necessary permissions
- **Micro-segmentation** - isolate breaches to limit blast radius
- **Continuous monitoring** - detect anomalies in real-time

### Authentication Best Practices

\`\`\`typescript
// Use secure session management
const session = await createSession({
  userId: user.id,
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: true,
  sameSite: "lax",
});
\`\`\`

### Input Validation

Never trust user input:

\`\`\`typescript
import { z } from "zod";

const UserInput = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().int().positive().max(150),
});
\`\`\`

## Common Vulnerabilities

### XSS Prevention

\`\`\`typescript
// Sanitize HTML output
import DOMPurify from "dompurify";

function sanitize(html: string): string {
  return DOMPurify.sanitize(html);
}
\`\`\`

### CSRF Protection

Always use CSRF tokens for state-changing operations:

\`\`\`typescript
const csrfToken = generateCSRFToken();
// Include in forms and AJAX requests
\`\`\`

### SQL Injection

Use parameterized queries:

\`\`\`typescript
// BAD
const query = \`SELECT * FROM users WHERE id = '\${userId}'\`;

// GOOD
const query = "SELECT * FROM users WHERE id = ?";
const result = await db.query(query, [userId]);
\`\`\`

## Security Headers

Configure these headers:

\`\`\`typescript
const securityHeaders = {
  "Content-Security-Policy": "default-src 'self'",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};
\`\`\`

## Monitoring and Response

1. **Log security events** with structured data
2. **Set up alerts** for suspicious patterns
3. **Have an incident response plan** ready
4. **Regular security audits** and penetration testing

## Conclusion

Security is not a feature you add later—it's a mindset you build from day one. Stay vigilant, stay updated, and always assume you're a target.
    `,
    category: "Security",
    author: {
      name: "Emily Davis",
      role: "Security Engineer",
      bio: "Emily is a security engineer who has helped secure systems for Fortune 500 companies. She holds multiple security certifications and speaks at DEF CON.",
      social: {
        twitter: "https://twitter.com/emilydavis",
        linkedin: "https://linkedin.com/in/emilydavis",
      },
    },
    date: "Mar 3, 2026",
    readTime: "9 min read",
    tags: ["Security", "Best Practices"],
    coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
    views: 11245,
    likes: 298,
    comments: [
      {
        id: "c11",
        author: "Kevin Zhang",
        date: "Mar 4, 2026",
        content: "The zero-trust section is spot on. We just finished implementing it and the peace of mind is worth the effort.",
        likes: 16,
      },
    ],
  },
  {
    id: "7",
    slug: "color-theory-modern-web-design",
    title: "Color Theory in Modern Web Design",
    excerpt:
      "Understanding color psychology and accessibility to create harmonious and inclusive digital experiences.",
    content: `
## The Psychology of Color

Colors evoke emotions and communicate meaning. Understanding this is crucial for effective design.

### Color Harmonies

Use established color theory principles:
- **Complementary** - opposite on the color wheel, high contrast
- **Analogous** - adjacent colors, harmonious and calm
- **Triadic** - three evenly spaced, vibrant and balanced
- **Split-complementary** - complement with adjacent tones, versatile

### Accessibility in Color

WCAG guidelines ensure your color choices work for everyone:

\`\`\`css
/* Minimum contrast ratios */
:root {
  --text-primary: #1a1a1a; /* 15.4:1 on white */
  --text-secondary: #666666; /* 5.7:1 on white */
  --accent: #2563eb; /* 4.6:1 on white - AA compliant */
}
\`\`\`

### Dark Mode Considerations

Dark mode isn't just inverting colors:

\`\`\`css
:root {
  --bg-primary: #ffffff;
  --text-primary: #1a1a1a;
}

[data-theme="dark"] {
  --bg-primary: #0a0a0a;
  --text-primary: #e5e5e5;
  /* Don't use pure black or white */
}
\`\`\`

## Color in Practice

### Building a Design System

\`\`\`typescript
const colors = {
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    // ...
    900: "#1e3a8a",
  },
  neutral: {
    50: "#fafafa",
    // ...
    900: "#171717",
  },
};
\`\`\`

### Semantic Colors

Use semantic naming over literal colors:

\`\`\`css
:root {
  --color-success: #22c55e;
  --color-warning: #eab308;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}
\`\`\`

## Conclusion

Color theory is both an art and a science. By understanding the principles and applying them thoughtfully, you can create designs that are both beautiful and accessible.
    `,
    category: "Design",
    author: {
      name: "Alex Rivera",
      role: "Design Lead",
      bio: "Alex is a design lead passionate about creating beautiful, accessible digital experiences. He's spoken at multiple design conferences worldwide.",
      social: {
        twitter: "https://twitter.com/alexrivera",
        linkedin: "https://linkedin.com/in/alexrivera",
      },
    },
    date: "Feb 28, 2026",
    readTime: "5 min read",
    tags: ["Color", "Accessibility"],
    coverImage: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800&q=80",
    views: 6789,
    likes: 156,
    comments: [
      {
        id: "c12",
        author: "Nicole Adams",
        date: "Mar 1, 2026",
        content: "The accessibility section is so important. I've been sharing this with my entire team.",
        likes: 18,
      },
    ],
  },
  {
    id: "8",
    slug: "machine-learning-frontend-developers",
    title: "Machine Learning for Frontend Developers",
    excerpt:
      "Demystifying ML concepts and showing how frontend developers can leverage browser-based AI models.",
    content: `
## ML in the Browser

Machine learning is no longer just for data scientists. Frontend developers can now build intelligent features directly in the browser.

### TensorFlow.js

The most popular ML library for JavaScript:

\`\`\`javascript
import * as tf from "@tensorflow/tfjs";

// Load a pre-trained model
const model = await tf.loadLayersModel("/model.json");

// Make predictions
const input = tf.tensor2d([[1, 2, 3]]);
const prediction = model.predict(input);
\`\`\`

### Use Cases

1. **Image classification** - identify objects in photos
2. **Natural language processing** - analyze text sentiment
3. **Recommendation engines** - suggest relevant content
4. **Anomaly detection** - flag unusual patterns

## Getting Started

### Quick Example

\`\`\`typescript
import * as mobilenet from "@tensorflow-models/mobilenet";

const image = document.getElementById("photo");
const model = await mobilenet.load();
const prediction = await model.classify(image);

console.log(prediction[0].className); // "golden retriever"
console.log(prediction[0].probability); // 0.95
\`\`\`

### Performance Tips

- **Use WebGL backend** for GPU acceleration
- **Quantize models** to reduce size
- **Run inference off the main thread** with Web Workers
- **Cache model files** for faster loading

## Privacy Benefits

Browser-based ML keeps data local:
- No data leaves the user's device
- Works offline after initial model load
- No server costs for inference
- Compliant with privacy regulations

## Conclusion

The browser is becoming a powerful platform for ML. By leveraging these tools, you can build intelligent features that are fast, private, and accessible to all users.
    `,
    category: "AI",
    author: {
      name: "Michael Brown",
      role: "AI Engineer",
      bio: "Michael is an AI engineer who has built production ML systems at scale. He's passionate about making AI accessible to all developers.",
      social: {
        twitter: "https://twitter.com/michaelbrown",
        github: "https://github.com/michaelbrown",
      },
    },
    date: "Feb 25, 2026",
    readTime: "11 min read",
    tags: ["ML", "Browser AI"],
    coverImage: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
    views: 7845,
    likes: 189,
    comments: [
      {
        id: "c13",
        author: "Alex Kim",
        date: "Feb 26, 2026",
        content: "I had no idea ML could work this well in the browser. Going to try the image classification example this weekend!",
        likes: 14,
      },
    ],
  },
  {
    id: "9",
    slug: "remote-team-collaboration-tools",
    title: "Remote Team Collaboration Tools",
    excerpt:
      "A comparison of the best tools and practices for keeping distributed teams productive and connected.",
    content: `
## The Remote Work Revolution

Remote work is here to stay. The right tools and practices make all the difference.

### Communication Tools

**Synchronous:**
- Video calls for complex discussions
- Instant messaging for quick questions
- Virtual offices for spontaneous collaboration

**Asynchronous:**
- Project management boards
- Documentation wikis
- Recorded video messages

### Best Practices

1. **Default to async** - respect time zones and focus time
2. **Document decisions** - don't let knowledge live in DMs
3. **Overcommunicate** - context is harder to share remotely
4. **Build social connections** - virtual coffee chats, team events

## Tool Comparison

### Project Management
- **Linear** - developer-friendly, fast, opinionated
- **Jira** - enterprise, customizable, complex
- **Notion** - flexible, docs + tasks, can be overwhelming

### Communication
- **Slack** - async-first, integrations, can be noisy
- **Discord** - voice channels, community, informal
- **Teams** - enterprise, Office integration, heavy

### Documentation
- **Notion** - all-in-one, powerful, can be slow
- **Confluence** - enterprise, Jira integration, dated UI
- **GitHub Docs** - developer-friendly, version controlled, simple

## Measuring Productivity

Focus on outcomes, not hours:
- **Delivered features** - what shipped
- **Quality metrics** - bugs, incidents
- **Team health** - satisfaction surveys, retention
- **Customer impact** - usage, feedback

## Conclusion

Remote work success comes down to intentional tool selection and cultural practices. Invest in the right tools, establish clear norms, and trust your team to deliver.
    `,
    category: "Business",
    author: {
      name: "Priya Patel",
      role: "Founder",
      bio: "Priya is a founder and CEO who has raised over $50M in venture funding. She writes about entrepreneurship, leadership, and building great companies.",
      social: {
        twitter: "https://twitter.com/priyapatel",
        linkedin: "https://linkedin.com/in/priyapatel",
      },
    },
    date: "Feb 22, 2026",
    readTime: "6 min read",
    tags: ["Remote Work", "Tools"],
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    views: 5432,
    likes: 134,
    comments: [
      {
        id: "c14",
        author: "Laura Chen",
        date: "Feb 23, 2026",
        content: "We switched to Linear last year and it's been a game changer for our dev team. Highly recommend!",
        likes: 11,
      },
    ],
  },
  {
    id: "10",
    slug: "edge-computing-with-nextjs",
    title: "Edge Computing with Next.js",
    excerpt:
      "How edge functions and middleware are changing the way we think about server-side rendering and API routes.",
    content: `
## What is Edge Computing?

Edge computing moves computation closer to the user. Instead of a single server region, your code runs at edge locations worldwide.

### Benefits

- **Lower latency** - responses in <50ms globally
- **Better scalability** - distributed by default
- **Cost efficiency** - pay per request, not server hours
- **Global reach** - consistent performance everywhere

## Next.js Edge Runtime

### Edge Middleware

\`\`\`typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const country = request.geo?.country || "US";

  if (country === "EU") {
    return NextResponse.rewrite(new URL("/eu", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
\`\`\`

### Edge API Routes

\`\`\`typescript
export const config = {
  runtime: "edge",
};

export default async function handler(request: Request) {
  const data = await fetch("https://api.example.com/data", {
    headers: {
      Authorization: \`Bearer \${process.env.API_KEY}\`,
    },
  });

  return Response.json(await data.json());
}
\`\`\`

## Use Cases

1. **A/B testing** - run experiments without client-side flicker
2. **Geolocation routing** - serve region-specific content
3. **Authentication** - validate tokens at the edge
4. **Rate limiting** - protect APIs globally

## Limitations

Edge functions have constraints:
- **No Node.js APIs** - limited runtime
- **128MB memory limit** - can't do heavy computation
- **No file system access** - stateless by design
- **10 second execution limit** - keep functions short

## Conclusion

Edge computing is the future of web applications. Next.js makes it easy to adopt, starting with middleware and gradually moving more logic to the edge.
    `,
    category: "Technology",
    author: {
      name: "Sarah Chen",
      role: "Senior Engineer",
      bio: "Sarah is a senior engineer with 10+ years of experience building scalable web applications. She specializes in React, Next.js, and distributed systems.",
      social: {
        twitter: "https://twitter.com/sarahchen",
        github: "https://github.com/sarahchen",
        linkedin: "https://linkedin.com/in/sarahchen",
      },
    },
    date: "Feb 20, 2026",
    readTime: "7 min read",
    tags: ["Edge", "Next.js", "Serverless"],
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    views: 10234,
    likes: 276,
    comments: [
      {
        id: "c15",
        author: "Ben Martinez",
        date: "Feb 21, 2026",
        content: "The middleware example is exactly what I needed for our internationalization setup. Thanks!",
        likes: 22,
      },
    ],
  },
  {
    id: "11",
    slug: "oauth-openid-connect-guide",
    title: "OAuth 2.0 and OpenID Connect Guide",
    excerpt:
      "Everything you need to know about implementing authentication and authorization securely in your applications.",
    content: `
## Understanding OAuth 2.0

OAuth 2.0 is an authorization framework that lets applications obtain limited access to user accounts.

### Key Concepts

- **Resource Owner** - the user who owns the data
- **Client** - the application requesting access
- **Authorization Server** - issues tokens after authentication
- **Resource Server** - hosts the protected resources

### Grant Types

**Authorization Code (Recommended):**
\`\`\`
1. Client redirects user to authorization server
2. User authenticates and grants permission
3. Server redirects back with authorization code
4. Client exchanges code for tokens
\`\`\`

**PKCE (For SPAs/Mobile):**
\`\`\`
1. Client generates code verifier and challenge
2. Includes challenge in authorization request
3. Includes verifier when exchanging for tokens
4. Server validates the verifier
\`\`\`

## OpenID Connect

OIDC adds identity layer on top of OAuth:

\`\`\`json
{
  "sub": "1234567890",
  "name": "John Doe",
  "email": "john@example.com",
  "picture": "https://example.com/photo.jpg"
}
\`\`\`

## Implementation Tips

### Token Management

\`\`\`typescript
// Store tokens securely
const tokens = {
  accessToken: encrypt(accessToken),
  refreshToken: encrypt(refreshToken),
  expiresAt: Date.now() + expiresIn * 1000,
};

// Refresh before expiry
async function getValidToken() {
  if (Date.now() > tokens.expiresAt - 60000) {
    await refreshTokens();
  }
  return tokens.accessToken;
}
\`\`\`

### Security Best Practices

1. **Always use HTTPS** in production
2. **Validate state parameter** to prevent CSRF
3. **Store secrets securely** - never in client-side code
4. **Implement token rotation** for refresh tokens
5. **Use short-lived access tokens** - 15-60 minutes

## Conclusion

OAuth 2.0 and OIDC are complex but essential. Don't roll your own - use established libraries and follow the specs.
    `,
    category: "Security",
    author: {
      name: "Emily Davis",
      role: "Security Engineer",
      bio: "Emily is a security engineer who has helped secure systems for Fortune 500 companies. She holds multiple security certifications and speaks at DEF CON.",
      social: {
        twitter: "https://twitter.com/emilydavis",
        linkedin: "https://linkedin.com/in/emilydavis",
      },
    },
    date: "Feb 18, 2026",
    readTime: "10 min read",
    tags: ["OAuth", "Authentication"],
    coverImage: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80",
    views: 8765,
    likes: 212,
    comments: [
      {
        id: "c16",
        author: "Sam Wilson",
        date: "Feb 19, 2026",
        content: "Finally a guide that makes OAuth understandable. The PKCE section is particularly clear.",
        likes: 26,
      },
    ],
  },
  {
    id: "12",
    slug: "micro-interactions-delight-users",
    title: "Micro-Interactions That Delight Users",
    excerpt:
      "Small animation details that make a big difference in user experience and how to implement them efficiently.",
    content: `
## The Power of Micro-Interactions

Micro-interactions are small, contained moments that accomplish a single task. They make interfaces feel alive.

### Four Elements

1. **Trigger** - initiates the interaction
2. **Rules** - what happens when triggered
3. **Feedback** - how the user knows what happened
4. **Loops & Modes** - what happens over time

## Common Micro-Interactions

### Button States

\`\`\`css
.button {
  transition: transform 0.2s, box-shadow 0.2s;
}

.button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.button:active {
  transform: translateY(0);
}
\`\`\`

### Loading Indicators

\`\`\`css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.skeleton {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
\`\`\`

### Form Validation

\`\`\`css
.input-error {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
\`\`\`

## Implementation Tips

1. **Keep it subtle** - users shouldn't notice individual animations
2. **Be consistent** - similar actions should have similar feedback
3. **Respect preferences** - honor \`prefers-reduced-motion\`
4. **Optimize performance** - use CSS transforms over layout properties

## Conclusion

Micro-interactions are the difference between good and great user experiences. They provide feedback, guide attention, and create emotional connections.
    `,
    category: "Design",
    author: {
      name: "Alex Rivera",
      role: "Design Lead",
      bio: "Alex is a design lead passionate about creating beautiful, accessible digital experiences. He's spoken at multiple design conferences worldwide.",
      social: {
        twitter: "https://twitter.com/alexrivera",
        linkedin: "https://linkedin.com/in/alexrivera",
      },
    },
    date: "Feb 15, 2026",
    readTime: "4 min read",
    tags: ["Animation", "UX"],
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    views: 6234,
    likes: 167,
    comments: [
      {
        id: "c17",
        author: "Hannah Lee",
        date: "Feb 16, 2026",
        content: "The CSS examples are perfect! I've bookmarked this for reference on my next project.",
        likes: 13,
      },
    ],
  },
];

export const POPULAR_POSTS = [
  { id: "5", slug: "integrating-llms-into-applications", title: "Integrating LLMs into Your Application" },
  { id: "3", slug: "mastering-typescript-generics", title: "Mastering TypeScript Generics" },
  { id: "6", slug: "web-security-best-practices-2026", title: "Web Security Best Practices for 2026" },
  { id: "1", slug: "building-scalable-web-apps-nextjs", title: "Building Scalable Web Applications with Next.js" },
  { id: "10", slug: "edge-computing-with-nextjs", title: "Edge Computing with Next.js" },
];
