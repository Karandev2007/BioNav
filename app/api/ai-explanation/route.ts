import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (!process.env.GROQ_API_KEY || !process.env.GROQ_API_URL) {
    console.error("Missing GROQ API configuration");
    return NextResponse.json(
      { error: "API configuration missing" },
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

    console.log("Sending request to Groq API for topic:", topic);

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
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
      const errorData = await response.text();
      console.error("Groq API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      console.error("Unexpected API response format:", data);
      throw new Error("Invalid API response format");
    }

    const explanation = data.choices[0].message.content;
    console.log("Successfully generated explanation for topic:", topic);

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("AI Explanation error:", error);
    return NextResponse.json(
      { error: "Failed to generate explanation. Please try again." },
      { status: 500 }
    );
  }
} 