import { NextResponse } from "next/server";
import OpenAI from "openai";
import { connectDB } from "../../../lib/db";
import DocChunk from "../../../models/DocChunk";

const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY! });
function cosineSimilarity(vecA: number[],vecB: number[]){
  const dotProduct=vecA.reduce((acc,val,i)=>acc+val*vecB[i],0);
   const magA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (magA * magB);
}
export async function POST(req: Request) {
  try {
    await connectDB();
    const {question,history} = await req.json();
    const embeddingResponse = await openai.embeddings.create({
       model: "text-embedding-3-small",
      input: question,
    });
    const questionEmbedding=embeddingResponse.data[0].embedding;
    const chunks = await DocChunk.find();

    //  Calculate similarity scores between question embedding and chunk embeddings
    const scoredChunks = chunks.map((chunk) => ({
      text: chunk.text,
      score: cosineSimilarity(questionEmbedding, chunk.embedding),
    }));
     scoredChunks.sort((a, b) => b.score - a.score);
    const topChunks = scoredChunks.slice(0, 5);

    const contextText=topChunks.map((c)=>c.text).join("\n---\n");
    const systemMessage = {
      role: "system",
      content: `You are a helpful AI assistant. Use the following context from documents to answer the user questions:\n${contextText}`,
    };

    //Compose full messages array: system + conversation history + current question as user
    const messages = [
      systemMessage,
      ...(history || []), // previous conversation messages
      { role: "user", content: question },
    ];

    const completion=await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      max_tokens: 500,
    });
    const answer = completion.choices[0].message?.content ?? "Sorry, I could not find an answer.";
    return NextResponse.json({ answer });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}



