import { NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const runtime = "edge"; // better performance for API routes

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key is not configured" },
      { status: 500 }
    );
  }

  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const payload = {
      model: "gemma2-9b-it",
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
      temperature: 0.7,
      max_tokens: 2048,
    };

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API Error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      return NextResponse.json(
        { error: `API Error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.choices?.[0]?.message?.content) {
      return NextResponse.json(
        { error: "Invalid response format from API" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      explanation: data.choices[0].message.content,
    });

  } catch (error) {
    console.error("Request error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
} 