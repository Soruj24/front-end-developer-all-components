export interface AccordionItemData {
  title: string;
  body: string;
  disabled?: boolean;
}

export const faqItems: AccordionItemData[] = [
  { title: "What is Next.js?", body: "Next.js is a React framework for building full-stack web applications. It provides server-side rendering, static site generation, and API routes." },
  { title: "What is Tailwind CSS?", body: "Tailwind CSS is a utility-first CSS framework that lets you build custom designs directly in your HTML with predefined classes." },
  { title: "What are React Hooks?", body: "Hooks are functions that let you use state and lifecycle features in functional components. Common hooks include useState, useEffect, and useContext." },
  { title: "What is TypeScript?", body: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript." },
  { title: "What is the App Router?", body: "The App Router is the new routing paradigm in Next.js 13+, built on React Server Components. It supports layouts, nested routes, and streaming." },
];

export const simpleItems: AccordionItemData[] = [
  { title: "How do I reset my password?", body: "Click 'Forgot Password' on the login page. Enter your email and follow the reset link sent to your inbox." },
  { title: "How do I delete my account?", body: "Go to Settings > Account and scroll to the bottom. Click 'Delete Account' and confirm the action." },
  { title: "How do I export my data?", body: "Navigate to Settings > Data and click 'Export All'. You will receive a zip file via email within 24 hours." },
];

export const disabledItems: AccordionItemData[] = [
  { title: "Edit Profile", body: "You can update your name, email, and profile picture." },
  { title: "Change Password", disabled: true, body: "Feature temporarily unavailable." },
  { title: "Notification Settings", body: "Configure email, push, and SMS notifications." },
  { title: "Billing", disabled: true, body: "Payment processing is currently down." },
];

export const longItems: AccordionItemData[] = [
  { title: "Getting Started Guide", body: "Welcome to our platform! This guide will help you set up your account, configure your profile, and start using the core features. Follow the step-by-step instructions to get up and running quickly." },
  { title: "API Documentation", body: "Our REST API provides endpoints for managing resources, querying data, and integrating with third-party services. All requests require authentication via API key." },
  { title: "Best Practices", body: "Follow these best practices to get the most out of our platform: use version control, write automated tests, monitor your usage, and keep your dependencies up to date." },
];

export const nestedData: AccordionItemData[] = [
  { title: "Project Structure", body: "The project follows a standard layout with src/, public/, and config/ directories at the root level." },
  { title: "Component Architecture", body: "Components are organized by feature in the components/ directory. Shared UI primitives live in components/ui/. Each component has its own folder with the component file, styles, and tests." },
  { title: "State Management", body: "We use React Context for global state and React Query for server state. Local component state uses useState and useReducer hooks." },
];

export const itemsWithIcons: AccordionItemData[] = [
  { title: "⚡ Quick Start", body: "Get started in minutes with our quick start tutorial. No prior experience required." },
  { title: "🎨 Customization", body: "Customize the look and feel with themes, custom CSS, and component overrides." },
  { title: "🔒 Security", body: "Enterprise-grade security with end-to-end encryption, SSO, and audit logging." },
  { title: "📊 Analytics", body: "Built-in analytics dashboard with real-time metrics and custom report generation." },
];

export interface AccordionSectionGroup {
  title: string;
  items: AccordionItemData[];
}

export const sections: AccordionSectionGroup[] = [
  {
    title: "Account",
    items: [
      { title: "Profile Settings", body: "Update your name, email, avatar, and personal information." },
      { title: "Security", body: "Manage your password, two-factor authentication, and active sessions." },
    ],
  },
  {
    title: "Workspace",
    items: [
      { title: "Team Members", body: "Invite, remove, and manage team members and their roles." },
      { title: "Billing", body: "View invoices, update payment method, and manage subscription." },
    ],
  },
  {
    title: "Preferences",
    items: [
      { title: "Notifications", body: "Configure email, push, and in-app notification preferences." },
      { title: "Appearance", body: "Choose between light, dark, and system theme modes." },
    ],
  },
];

export interface AccordionUseCase {
  label: string;
  desc: string;
  items: AccordionItemData[];
}

export const useCases: AccordionUseCase[] = [
  { label: "FAQ Section", desc: "Common questions with collapsible answers", items: faqItems.slice(0, 3) },
  { label: "Settings Panel", desc: "Grouped configuration options", items: simpleItems },
  { label: "Documentation", desc: "Docs with expandable sections", items: longItems },
  { label: "Onboarding", desc: "Step-by-step setup guide", items: nestedData },
];

export interface FaqQuestion {
  q: string;
  a: string;
}

export const faqQuestions: FaqQuestion[] = [
  { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, Amex, PayPal, and bank transfers for enterprise plans." },
  { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time. Your access will continue until the end of the billing period." },
  { q: "Is there a free trial?", a: "Yes, we offer a 14-day free trial with full access to all Pro features. No credit card required." },
  { q: "How does billing work?", a: "Billing is monthly or annual. Annual plans come with a 20% discount. Invoices are sent via email." },
  { q: "Can I upgrade my plan?", a: "You can upgrade at any time. The price difference will be prorated for the remainder of the billing period." },
  { q: "Do you offer refunds?", a: "We offer a 30-day money-back guarantee for all annual plans. Monthly plans can be canceled anytime." },
  { q: "What is your SLA?", a: "Enterprise plans include a 99.9% uptime SLA with 24/7 support and 1-hour response time." },
  { q: "How do I contact support?", a: "Email support@example.com, use the in-app chat, or call 1-800-555-0199 for urgent issues." },
];
