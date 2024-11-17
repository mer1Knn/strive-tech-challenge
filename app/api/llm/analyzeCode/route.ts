import { NextResponse } from "next/server";
import { OpenAI } from "@langchain/openai";

export async function POST(req: Request) {
  try {
    const { repo, sha } = await req.json();

    // Fetch file content
    const response = await fetch(`${process.env.BASE_URL}/api/github/getFile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repo, sha }),
    });

    const { content, error } = await response.json();
    if (error) throw new Error(error);

    // Analyze content with LangChain
    const model = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `Review the following code and provide a quality score (0-100) and reasoning:\n\n${content}`;

    const analysis = await model.call(prompt);

    const [score, ...reasoning] = analysis.split("\n");
    return NextResponse.json({
      score: score.trim(),
      reasoning: reasoning.join("\n").trim(),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to analyze code" },
      { status: 500 }
    );
  }
}
