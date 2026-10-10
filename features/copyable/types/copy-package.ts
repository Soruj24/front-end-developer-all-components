export interface CopyFile {
  filename: string;
  language: string;
  code: string;
}

export interface CopyPackage {
  slug: string;
  componentFile: CopyFile;
  standaloneFile: CopyFile;
  exampleFile: CopyFile;
  cnFile: CopyFile | null;
  installCommand: string;
  requiredDeps: string[];
  needsClientDirective: boolean;
  usesCn: boolean;
  isPlaceholder: boolean;
}
