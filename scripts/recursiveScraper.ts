import axios from "axios";
import { load } from "cheerio";
import fs from "fs/promises";
import path from "path";

type ScrapeOptions = {
  baseUrl: string;
  docsFolderName: string;
  allowedPathPrefix: string;
  mainContentSelector: string;
};

export async function recursiveScrape({
  baseUrl,
  docsFolderName,
  allowedPathPrefix,
  mainContentSelector,
}: ScrapeOptions) {
  const visited = new Set<string>();
  const queue: string[] = [baseUrl];
  const MAX_PAGES = 100;  // optional limit

  const docsDir = path.resolve(`./docs/full/${docsFolderName}`);
  await fs.mkdir(docsDir, { recursive: true });

  while (queue.length && visited.size < MAX_PAGES) {
    const currentUrl = queue.shift()!;
    if (visited.has(currentUrl)) continue;

    try {
      console.log(`Scraping: ${currentUrl}`);
      const { data } = await axios.get(currentUrl);
      const $ = load(data);

      // Extract main content text
      const content = $(mainContentSelector).text().trim().replace(/\s+/g, " ");

      // Create filename from URL path
      const urlPath = new URL(currentUrl).pathname;
      const fileName =
        urlPath
          .replace(/\//g, "_")
          .replace(/^_/, "")
          .replace(/\.[a-z]+$/, "") + ".txt";

      const filePath = path.join(docsDir, fileName);
      await fs.writeFile(filePath, content, "utf-8");
      console.log(`Saved: ${filePath}`);

      visited.add(currentUrl);

      // Extract and normalize links
      const rawLinks = $("a[href]").map((_, el) => $(el).attr("href")).get();

      // Normalize links to absolute URLs
      const absoluteLinks = rawLinks
        .map((link) => {
          if (!link) return null;
          try {
            return new URL(link, currentUrl).toString();
          } catch {
            return null;
          }
        })
        .filter((link): link is string => !!link) // remove nulls

        // Keep only those starting with allowedPathPrefix and same origin and not visited
        .filter(
          (link) =>
            link.startsWith(allowedPathPrefix) &&
            new URL(link).origin === new URL(baseUrl).origin &&
            !visited.has(link)
        );

      // Enqueue new links
      for (const link of absoluteLinks) {
        if (!queue.includes(link)) queue.push(link);
      }
    } catch (err) {
      console.error(`Failed to scrape ${currentUrl}:`, err);
    }
  }
}

// Example usage for all 3 docs at once:
(async () => {
  await recursiveScrape({
    baseUrl: "https://reactjs.org/docs/getting-started.html",
    docsFolderName: "react",
    allowedPathPrefix: "https://reactjs.org/docs",
    mainContentSelector: ".theme-doc-markdown",
  });

  await recursiveScrape({
    baseUrl: "https://nextjs.org/docs",
    docsFolderName: "nextjs",
    allowedPathPrefix: "https://nextjs.org/docs",
    mainContentSelector: "main",
  });

  await recursiveScrape({
    baseUrl: "https://www.typescriptlang.org/docs/handbook/intro.html",
    docsFolderName: "typescript",
    allowedPathPrefix: "https://www.typescriptlang.org/docs/",
    mainContentSelector: "article",
  });

  console.log("Finished scraping all docs!");
})();
