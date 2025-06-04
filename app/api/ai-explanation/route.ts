import { NextResponse } from "next/server";
import Groq from "groq";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: process.env.GROQ_API_URL,
});

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable biology tutor. Provide clear, accurate, and engaging explanations of biology topics. Use appropriate scientific terminology while keeping the explanation accessible.",
        },
        {
          role: "user",
          content: `Please explain the following biology topic: ${topic}. Include key concepts, examples, and real-world applications where relevant.`,
        },
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.7,
      max_tokens: 2048,
    });

    const explanation = completion.choices[0]?.message?.content || "No explanation available.";

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("AI Explanation error:", error);
    return NextResponse.json(
      { error: "Failed to generate explanation" },
      { status: 500 }
    );
  }
} 