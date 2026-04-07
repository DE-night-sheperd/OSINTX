import { NextResponse } from "next/server";
import { runPythonScript } from '@/lib/python-bridge';

export async function GET() {
  try {
    const pythonResult = await runPythonScript('recon_network.py');

    if (pythonResult.error) {
      return NextResponse.json({ error: pythonResult.error }, { status: 500 });
    }

    return NextResponse.json(pythonResult, { status: 200 });
  } catch (error) {
    console.error('Network Recon Error:', error);
    return NextResponse.json({ error: 'System interrogation failed' }, { status: 500 });
  }
}
