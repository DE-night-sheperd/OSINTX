import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(req: Request) {
  try {
    const { targetNumber, credentials } = await req.json();

    if (!targetNumber) {
      return NextResponse.json({ error: 'Target number is required' }, { status: 400 });
    }

    // Use provided credentials or fallback to env
    const sid = credentials?.sid || process.env.TWILIO_ACCOUNT_SID;
    const token = credentials?.token || process.env.TWILIO_AUTH_TOKEN;
    const from = credentials?.from || process.env.TWILIO_PHONE_NUMBER;

    if (!sid || !token || !from || sid.includes('XXXX')) {
      return NextResponse.json({ error: 'Twilio credentials not configured' }, { status: 401 });
    }

    // Initialize Twilio client
    const client = twilio(sid, token);

    // Create a "Silent Ping" call
    const call = await client.calls.create({
      twiml: '<Response><Pause length="1"/><Say voice="alice">Incoming SS7 Pulse Test. Secure connection established.</Say><Hangup/></Response>',
      to: targetNumber,
      from: from,
      timeout: 15, 
    });

    return NextResponse.json({ 
      success: true, 
      sid: call.sid, 
      status: call.status,
      msg: 'Real-time SS7 Pulse Call Initiated.' 
    });

  } catch (error: unknown) {
    console.error('Twilio Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      error: 'Failed to initiate real-time call.', 
      details: errorMessage 
    }, { status: 500 });
  }
}
