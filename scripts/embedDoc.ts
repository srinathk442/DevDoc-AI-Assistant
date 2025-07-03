import { config } from "dotenv";
import path from "path";
import fs from "fs";
import OpenAI from "openai";
import pLimit from "p-limit"; // add this package
import { connectDB } from "../lib/db";
import DocChunk from "../models/DocChunk";

config({ path: path.resolve(process.cwd(), ".env") });

console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "Loaded" : "Missing");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function getTxtFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of list) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(getTxtFiles(fullPath));
    } else if (file.isFile() && file.name.endsWith(".txt")) {
      results.push(fullPath);
    }
  }
  return results;
}

async function embedDocs() {
  await connectDB();

  const docsDir = path.resolve("./docs/full"); // use the full docs folder
  const files = getTxtFiles(docsDir);

  const limit = pLimit(5); // limit concurrency to 5

  for (const filePath of files) {
    const data = fs.readFileSync(filePath, "utf-8");

    // Split into 1000 char chunks
    const chunks = data.match(/(.|[\r\n]){1,1000}/g) || [];

    // embed all chunks concurrently but limited to 5 at a time
    const embeddingPromises = chunks.map((chunk) =>
      limit(async () => {
        const response = await openai.embeddings.create({
          model: "text-embedding-3-small",
          input: chunk,
        });
        const embedding = response.data[0].embedding;
        await DocChunk.create({ text: chunk, embedding });
      })
    );

    await Promise.all(embeddingPromises);
    console.log(`Embedded and saved chunks for ${path.relative(docsDir, filePath)}`);
  }

  console.log("All docs embedded successfully.");
  process.exit();
}

embedDocs();
