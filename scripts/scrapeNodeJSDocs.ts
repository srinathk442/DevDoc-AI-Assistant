// scripts/scrapeFullNodeDocs.ts
import axios from "axios";
import { load } from "cheerio";
import fs from "fs";
import path from "path";

const BASE_URL = "https://nodejs.org/api/";
const OUTPUT_DIR = path.resolve("docs/full-nodejs");
const visited = new Set<string>();

async function scrapePage(url: string) {
  if (visited.has(url)) return;
  visited.add(url);

  try {
    const { data } = await axios.get(url);
    const $ = load(data);
    const mainContent = $("main").text().replace(/\s+/g, " ").trim();

    const filename = url.split("/").pop()?.replace(".html", "") || "index";
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    fs.writeFileSync(path.join(OUTPUT_DIR, `${filename}.txt`), mainContent);
    console.log(`Saved: ${filename}.txt`);

    // Recursively follow links in the API menu
    $("a").each((_, el) => {
      const href = $(el).attr("href");
      if (href && href.endsWith(".html") && !href.startsWith("http")) {
        const fullLink = new URL(href, BASE_URL).toString();
        scrapePage(fullLink);
      }
    });
  } catch (err) {
    console.error(`Failed to scrape ${url}:`, err.message);
  }
}

(async () => {
  await scrapePage(BASE_URL);
  console.log("Finished scraping full Node.js docs");
})();
