import { registryCatalog } from "@/features/registry/data";
import { registryCategories } from "@/features/registry/constants/categories";
import { siteConfig } from "@/config/site";

export interface HomeStats {
  components: number;
  categories: number;
  downloads: number;
  stars: number | null;
}

function sumDownloads(): number {
  return registryCatalog.reduce(
    (sum, component) => sum + (component.stats?.downloads ?? 0),
    0,
  );
}

async function fetchGitHubStars(): Promise<number | null> {
  try {
    const githubUrl = siteConfig.github;
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return null;
    const [, owner, repo] = match;
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

export async function getHomeStats(): Promise<HomeStats> {
  const componentCount = registryCatalog.length;
  const categoryCount = registryCategories.length;
  const downloads = sumDownloads();
  const stars = await fetchGitHubStars();

  return {
    components: componentCount,
    categories: categoryCount,
    downloads,
    stars,
  };
}
