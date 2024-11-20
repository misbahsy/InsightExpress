import { NextResponse } from 'next/server';

interface ResearchRequest {
  topic: string;
  email: string;
}

export async function POST(request: Request) {
  try {
    const { topic, email }: ResearchRequest = await request.json();
    
    if (!topic || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const currentDateTime = new Date().toLocaleString();
    
    const response = await fetch(
      `${process.env.LANGFLOW_URL}/api/v1/run/${process.env.FLOW_ID}?stream=false`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${process.env.LANGFLOW_TOKEN}`, #could be used if auth enabled
        },
        body: JSON.stringify({
          input_value: `${topic}, send it to this email: ${email}. Current date and time: ${currentDateTime}`,
          output_type: 'chat',
          input_type: 'chat',
          tweaks: {
          },
        }),
      }
    );

    const data = await response.json();
    const result = data.outputs[0].outputs[0].outputs.message.message.text;

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Research API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate research report' },
      { status: 500 }
    );
  }
}