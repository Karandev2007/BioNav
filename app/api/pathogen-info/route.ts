import { NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const runtime = "edge";

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key is not configured" },
      { status: 500 }
    );
  }

  try {
    const { pathogen } = await req.json();

    if (!pathogen) {
      return NextResponse.json(
        { error: "Pathogen name is required" },
        { status: 400 }
      );
    }

    const payload = {
      model: "gemma2-9b-it",
      messages: [
        {
          role: "system",
          content: "You are a medical expert specializing in infectious diseases. Provide accurate, well-structured information about pathogens. Format important terms or key points between ** marks for emphasis.",
        },
        {
          role: "user",
          content: `Please provide detailed information about ${pathogen} in the following format:
1. Symptoms: List the main symptoms and signs
2. Causes: Explain the causative agents and transmission
3. Treatments: Describe available treatments and preventive measures`,
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
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "Invalid response format from API" },
        { status: 500 }
      );
    }

    // divide the content into sections
    const sections = content.split(/\d\.\s+/).filter(Boolean);
    const info = {
      symptoms: sections[0]?.replace(/^Symptoms:\s*/i, "").trim(),
      causes: sections[1]?.replace(/^Causes:\s*/i, "").trim(),
      treatments: sections[2]?.replace(/^Treatments:\s*/i, "").trim(),
    };

    return NextResponse.json({ info });

  } catch (error) {
    console.error("Request error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
} 