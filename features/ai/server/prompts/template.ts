export type PromptVariables = Record<string, string | number | boolean | undefined>;

export class PromptTemplate {
  constructor(readonly template: string) {}

  render(variables: PromptVariables): string {
    return this.template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key: string) => {
      const value = variables[key];
      if (value === undefined) {
        throw new Error(`Missing prompt variable: ${key}`);
      }
      return String(value);
    });
  }
}

export function renderTemplate(template: string, variables: PromptVariables): string {
  return new PromptTemplate(template).render(variables);
}
