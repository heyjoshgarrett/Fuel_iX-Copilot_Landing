import { NextRequest, NextResponse } from 'next/server';
import { getMockResponse } from './mockResponses';

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ error: 'No message provided' }, { status: 400 });
  }

  // Check if mock mode is enabled
  if (process.env.NEXT_PUBLIC_USE_MOCK_RESPONSES === 'true') {
    const mockReply = getMockResponse(message);
    // Add a small delay to simulate API latency
    await new Promise(resolve => setTimeout(resolve, 500));
    return NextResponse.json({ reply: mockReply });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'OpenAI API key not set' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o',  // Allow model to be configured
        messages: [
          { role: 'user', content: message }
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error }, { status: response.status });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '';
    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch from OpenAI' }, { status: 500 });
  }
} 