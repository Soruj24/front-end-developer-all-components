export const marketingTemplate = `  {
    id: "marketing",
    name: "Marketing Copy",
    description: "Generate high-converting marketing copy for any product.",
    sections: [
      { id: "system", title: "System", content: "You are an expert copywriter with 15 years of experience writing high-converting marketing copy. Write clearly, speak directly to the reader's pain points, and always end with a compelling call to action." },
      { id: "brief", title: "Brief", content: "Write marketing copy for: {{topic}}\\n\\nTarget audience: {{audience}}\\n\\nBrand voice: {{tone}}" },
      { id: "structure", title: "Structure", content: "1. Start with a hook\\n2. Highlight key benefits as bullets\\n3. Address the main objection\\n4. End with a strong call to action: {{cta}}" },
      { id: "output", title: "Output", content: "Output the copy as plain text with clear section breaks." },
    ],
    variables: [
      { id: "topic", label: "Topic", value: "", placeholder: "e.g., a new line of ergonomic office chairs", required: true },
      { id: "audience", label: "Audience", value: "", placeholder: "e.g., remote workers aged 25-40", required: true },
      { id: "tone", label: "Tone", value: "", placeholder: "e.g., friendly and persuasive", required: true },
      { id: "cta", label: "Call to action", value: "", placeholder: "e.g., Visit our website to learn more" },
    ],
  }`;

export const blogTemplate = `  {
    id: "blog",
    name: "Blog Post Outline",
    description: "Draft a structured outline for a blog post.",
    sections: [
      { id: "system", title: "System", content: "You are a world-class blog editor who writes clear, skimmable, SEO-friendly outlines." },
      { id: "brief", title: "Brief", content: "Create a detailed outline for a blog post titled \\"{{topic}}\\".\\n\\nTarget audience: {{audience}}\\n\\nTarget length: {{wordCount}} words\\n\\nTone: {{tone}}" },
      { id: "structure", title: "Structure", content: "For each section include:\\n- A working H2 heading\\n- 2-3 key points\\n- Suggested SEO keywords" },
      { id: "output", title: "Output", content: "Return the outline as a numbered list, plus a meta description and title tag." },
    ],
    variables: [
      { id: "topic", label: "Topic", value: "", placeholder: "e.g., how to build a design system", required: true },
      { id: "audience", label: "Audience", value: "", placeholder: "e.g., product designers and engineers", required: true },
      { id: "wordCount", label: "Target length", value: "", placeholder: "e.g., 1500" },
      { id: "tone", label: "Tone", value: "", placeholder: "e.g., authoritative yet approachable" },
    ],
  }`;
