import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const ANAM_API_KEY = process.env.ANAM_API_KEY;
  if (!ANAM_API_KEY) {
    return NextResponse.json(
      { error: "Missing ANAM_API_KEY" },
      { status: 500 }
    );
  }
  try {
    const response = await fetch("https://api.anam.ai/v1/auth/session-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ANAM_API_KEY}`,
      },
      body: JSON.stringify({
        personaConfig: {
          name: "Cara",
          avatarId: "30fa96d0-26c4-4e55-94a0-517025942e18",
          voiceId: "6bfbe25a-979d-40f3-a92b-5394170af54b",
          brainType: "ANAM_GPT_4O_MINI_V1",
          systemPrompt:
            "You are Cara, a helpful and friendly AI assistant. Keep responses conversational and concise.",
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
