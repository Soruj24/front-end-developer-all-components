import type { InstallManager, RegistryEntry, RegistryItem } from "../types";

const DEFAULT_DEPS = ["react", "@component-library/ui"];

export function entry(e: RegistryEntry): RegistryItem {
  const id = e.id;
  const cli = e.cli ?? `npx @component-library/cli add ${id}`;
  const files = e.files ?? [`components/ui/${id}.tsx`];
  const install: Record<InstallManager, string> = {
    npm: `npm install @component-library/${id}`,
    pnpm: `pnpm add @component-library/${id}`,
    yarn: `yarn add @component-library/${id}`,
    bun: `bun add @component-library/${id}`,
    ...e.install,
  };
  return {
    files,
    cli,
    dependencies: DEFAULT_DEPS,
    ...e,
    install,
  };
}
