import type { InstallManager } from "../types/component";

export const installManagers: InstallManager[] = ["npm", "pnpm", "yarn", "bun"];

export const installManagerLabel: Record<InstallManager, string> = {
  npm: "npm",
  pnpm: "pnpm",
  yarn: "yarn",
  bun: "bun",
};

/** The scoped package name a component is published under. */
export function packageName(slug: string): string {
  return `@component-library/${slug}`;
}

/** The CLI command that scaffolds a component into a project. */
export function cliCommand(slug: string): string {
  return `npx @component-library/cli add ${slug}`;
}
