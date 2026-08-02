export type InstallManager = "npm" | "pnpm" | "yarn" | "bun";

export interface RegistryItem {
  id: string;
  title: string;
  description?: string;
  source: string;
  files: string[];
  cli: string;
  install: Record<InstallManager, string>;
  dependencies: string[];
}

export interface RegistryEntry {
  id: string;
  title: string;
  description?: string;
  source: string;
  files?: string[];
  cli?: string;
  install?: Partial<Record<InstallManager, string>>;
  dependencies?: string[];
}
