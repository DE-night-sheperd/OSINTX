import { NextResponse } from 'next/server';
import { runPythonScript } from '@/lib/python-bridge';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Target email required' }, { status: 400 });
    }

    const pythonResult = await runPythonScript('osint_email.py', [email]);

    if (pythonResult.error) {
      return NextResponse.json({ error: pythonResult.error }, { status: 400 });
    }

    return NextResponse.json({
      email: email,
      hits: pythonResult.hits,
      total_hits: pythonResult.hit_count,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Email OSINT Search Error:', error);
    return NextResponse.json({ error: 'System interrogation failed' }, { status: 500 });
  }
}
