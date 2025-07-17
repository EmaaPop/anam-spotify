import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const ANAM_API_KEY = process.env.ANAM_API_KEY;
  if (!ANAM_API_KEY) {
    return NextResponse.json({ error: 'Missing ANAM_API_KEY' }, { status: 500 });
  }
  const body = await req.json();

  try {
    const response = await fetch('https://api.anam.ai/v1/auth/session-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ANAM_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
} 