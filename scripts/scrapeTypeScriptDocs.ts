import axios from "axios";
import { load } from "cheerio";
import fs from "fs";



async function scrapeTypeScriptDocs() {
  try {
    const url = "https://www.typescriptlang.org/docs/handbook/intro.html";
    const { data } = await axios.get(url);
    const $ = load(data);


    const content = $("article").text(); // Correct selector for TS docs
    const cleaned = content.replace(/\s+/g, " ").trim();

    fs.writeFileSync("./docs/typescript-docs.txt", cleaned);
    console.log("TypeScript docs saved to ./docs/typescript-docs.txt");
  } catch (error) {
    console.error("Error scraping TypeScript docs:", error);
  }
}

scrapeTypeScriptDocs();
