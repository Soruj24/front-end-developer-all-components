export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  category: "Startups" | "Enterprise" | "Agencies";
}

export const testimonials: Testimonial[] = [
  { quote: "This platform completely transformed how our team builds and ships products. The developer experience is unmatched.", name: "Sarah Chen", title: "CTO", company: "TechStart", category: "Startups" },
  { quote: "We migrated our entire infrastructure in two days. The documentation is fantastic and support is incredibly responsive.", name: "Marcus Johnson", title: "Engineering Lead", company: "DataFlow", category: "Enterprise" },
  { quote: "The analytics and monitoring tools gave us insights we never had before. It's become an essential part of our stack.", name: "Emily Rodriguez", title: "VP of Product", company: "CloudScale", category: "Enterprise" },
  { quote: "Best decision we made this year. The performance improvements alone justified the switch.", name: "James Park", title: "Founder", company: "Launchpad", category: "Startups" },
  { quote: "Enterprise-grade features with startup-friendly pricing. A rare combination that actually delivers on its promises.", name: "Aisha Patel", title: "Director of Engineering", company: "FinCore", category: "Enterprise" },
  { quote: "The collaboration features are outstanding. Our distributed team feels more connected than ever before.", name: "Tom Andersen", title: "DevOps Manager", company: "Streamline", category: "Agencies" },
  { quote: "We switched from three different tools to one unified platform. Our workflow is simpler and our team is happier.", name: "Lisa Kim", title: "Creative Director", company: "Brightside Studio", category: "Agencies" },
  { quote: "The onboarding was seamless. Within a week we were fully operational and shipping features faster than ever.", name: "David Okafor", title: "VP of Technology", company: "NexGen Solutions", category: "Enterprise" },
  { quote: "As a small team we needed something powerful yet simple. This platform gave us enterprise capabilities without the overhead.", name: "Priya Sharma", title: "Co-Founder", company: "EcoLabs", category: "Startups" },
  { quote: "We run campaigns for Fortune 500 companies and this tool has become indispensable. The reliability is unmatched.", name: "Carlos Mendez", title: "Head of Growth", company: "Pinnacle Agency", category: "Agencies" },
  { quote: "The API is a dream to work with. We built a custom integration in an afternoon that would have taken weeks elsewhere.", name: "Yuki Tanaka", title: "Senior Engineer", company: "Quantum Labs", category: "Startups" },
  { quote: "We evaluated a dozen solutions before choosing this one. Two years later we are still discovering new features.", name: "Rachel Cohen", title: "CEO", company: "Meridian Health", category: "Enterprise" },
];

export const companies = ["TechStart", "DataFlow", "CloudScale", "Launchpad", "FinCore", "Streamline", "Brightside Studio", "NexGen Solutions", "Pinnacle Agency", "Quantum Labs"];

export const categories = ["Startups", "Enterprise", "Agencies"] as const;
