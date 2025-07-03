import axios from "axios";
import { load } from "cheerio";
import fs from "fs";

async function scrapeNextjsDocs() {
  try {
    const url = "https://nextjs.org/docs";

    const { data } = await axios.get(url);
    const $ = load(data);

    // Main content selector for Next.js docs page
    const content = $("main").text();

    const cleaned = content.replace(/\s+/g, " ").trim();

    fs.writeFileSync("./docs/nextjs-docs.txt", cleaned);

    console.log("Next.js docs saved to ./docs/nextjs-docs.txt");
  } catch (error) {
    console.error("Error scraping Next.js docs:", error);
  }
}

scrapeNextjsDocs();
