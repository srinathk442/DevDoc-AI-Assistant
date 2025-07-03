import axios from "axios";
import { load } from "cheerio";
import fs from "fs";

async function scrapeReactDocs() {
  try {
    const url = "https://reactjs.org/docs/getting-started.html";

    const { data } = await axios.get(url);
    const $ = load(data);

    // React docs main content is inside '.theme-doc-markdown'
    const content = $(".theme-doc-markdown").text();

    const cleaned = content.replace(/\s+/g, " ").trim();

    fs.writeFileSync("./docs/react-docs.txt", cleaned);

    console.log("React docs saved to ./docs/react-docs.txt");
  } catch (error) {
    console.error("Error scraping React docs:", error);
  }
}

scrapeReactDocs();
