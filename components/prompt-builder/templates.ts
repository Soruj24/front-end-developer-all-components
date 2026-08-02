export interface PromptVariable {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
}

export interface PromptSection {
  id: string;
  title: string;
  content: string;
}

export interface PromptTemplate {
  id: string;
  name: string;
  description?: string;
  sections: PromptSection[];
  variables: PromptVariable[];
}

export const promptBuilderTemplates: PromptTemplate[] = [
  {
    id: "marketing",
    name: "Marketing Copy",
    description: "Generate high-converting marketing copy for any product.",
    sections: [
      {
        id: "system",
        title: "System",
        content:
          "You are an expert copywriter with 15 years of experience writing high-converting marketing copy. You write clearly, speak directly to the reader's pain points, and always end with a compelling call to action.",
      },
      {
        id: "brief",
        title: "Brief",
        content:
          "Write marketing copy for: {{topic}}\n\nTarget audience: {{audience}}\n\nBrand voice: {{tone}}",
      },
      {
        id: "structure",
        title: "Structure",
        content:
          "1. Start with a hook that grabs attention\n2. Highlight the key benefits as bullet points\n3. Address the main objection\n4. End with a strong call to action: {{cta}}",
      },
      {
        id: "constraints",
        title: "Constraints",
        content:
          "- No fluff or filler words\n- Keep sentences under 20 words\n- Avoid clichés and overused phrases",
      },
      {
        id: "output",
        title: "Output",
        content: "Output the copy as plain text with clear section breaks.",
      },
    ],
    variables: [
      { id: "topic", label: "Topic", value: "", placeholder: "e.g., a new line of ergonomic office chairs", required: true },
      { id: "audience", label: "Audience", value: "", placeholder: "e.g., remote workers aged 25–40", required: true },
      { id: "tone", label: "Tone", value: "", placeholder: "e.g., friendly and persuasive", required: true },
      { id: "cta", label: "Call to action", value: "", placeholder: "e.g., Visit our website to learn more" },
    ],
  },
  {
    id: "code-review",
    name: "Code Review",
    description: "Get thorough, actionable reviews of a code snippet.",
    sections: [
      {
        id: "system",
        title: "System",
        content:
          "You are a senior software engineer performing a thorough, kind, and actionable code review. You never assume intent — you point out concrete issues and suggest fixes.",
      },
      {
        id: "code",
        title: "Code",
        content: "Here is the code to review:\n\n{{code}}",
      },
      {
        id: "instructions",
        title: "Instructions",
        content:
          "Review the code for:\n- Correctness\n- {{focus}}\n- Code style and maintainability\n- Edge cases and error handling",
      },
      {
        id: "output",
        title: "Output Format",
        content:
          "For each issue provide:\n1. File and line number\n2. Severity (Critical / Major / Minor / Nit)\n3. Why it matters\n4. A concrete suggested fix\n\nEnd with a summary of the strengths and the top 3 priorities.",
      },
    ],
    variables: [
      { id: "code", label: "Code", value: "", placeholder: "Paste the code to review", required: true },
      { id: "language", label: "Language", value: "", placeholder: "e.g., TypeScript", required: true },
      { id: "focus", label: "Focus areas", value: "", placeholder: "e.g., performance, readability, security" },
    ],
  },
  {
    id: "blog-outline",
    name: "Blog Post Outline",
    description: "Draft a structured outline for a blog post.",
    sections: [
      {
        id: "system",
        title: "System",
        content:
          "You are a world-class blog editor who writes clear, skimmable, SEO-friendly outlines. You think in sections, not paragraphs.",
      },
      {
        id: "brief",
        title: "Brief",
        content:
          "Create a detailed outline for a blog post titled \"{{topic}}\".\n\nTarget audience: {{audience}}\n\nTarget length: {{wordCount}} words\n\nTone: {{tone}}",
      },
      {
        id: "structure",
        title: "Structure",
        content:
          "For each section include:\n- A working H2 heading\n- 2–3 key points\n- Suggested SEO keywords\n- Where to place a supporting example or data point",
      },
      {
        id: "output",
        title: "Output",
        content:
          "Return the outline as a numbered list of sections, plus a meta description and title tag at the end.",
      },
    ],
    variables: [
      { id: "topic", label: "Topic", value: "", placeholder: "e.g., how to build a design system", required: true },
      { id: "audience", label: "Audience", value: "", placeholder: "e.g., product designers and engineers", required: true },
      { id: "wordCount", label: "Target length", value: "", placeholder: "e.g., 1500" },
      { id: "tone", label: "Tone", value: "", placeholder: "e.g., authoritative yet approachable" },
    ],
  },
];
