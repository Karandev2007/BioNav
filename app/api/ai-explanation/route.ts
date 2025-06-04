import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const response = await fetch(process.env.GROQ_API_URL!, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    const data = await response.json();
    const explanation = data.choices[0]?.message?.content || "No explanation available.";

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("AI Explanation error:", error);
    return NextResponse.json(
      { error: "Failed to generate explanation" },
      { status: 500 }
    );
  }
} 