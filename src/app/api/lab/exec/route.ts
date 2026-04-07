import { NextResponse } from 'next/server';
import { runPythonScript } from '@/lib/python-bridge';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export async function POST(req: Request) {
  try {
    const { command, args } = await req.json();

    if (!command) {
      return NextResponse.json({ error: 'Command required' }, { status: 400 });
    }

    // White-list of allowed "real" commands or script triggers
    const allowedCommands: Record<string, { type: 'python' | 'shell', target: string }> = {
      'osint-phone': { type: 'python', target: 'osint_phone.py' },
      'osint-email': { type: 'python', target: 'osint_email.py' },
      'recon-net': { type: 'python', target: 'recon_network.py' },
      'ping': { type: 'shell', target: 'ping' },
      'whois': { type: 'shell', target: 'whois' }, // Requires whois installed
    };

    const cmdConfig = allowedCommands[command];
    if (!cmdConfig) {
      return NextResponse.json({ error: `Command '${command}' is restricted or not implemented.` }, { status: 403 });
    }

    if (cmdConfig.type === 'python') {
      const result = await runPythonScript(cmdConfig.target, args);
      return NextResponse.json({ output: JSON.stringify(result, null, 2), type: 'success' });
    } else {
      // Shell commands
      try {
        const { stdout, stderr } = await execPromise(`${cmdConfig.target} ${args.join(' ')}`);
        if (stderr) return NextResponse.json({ output: stderr, type: 'error' });
        return NextResponse.json({ output: stdout, type: 'output' });
      } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
    }

  } catch (error) {
    console.error('Lab Exec Error:', error);
    return NextResponse.json({ error: 'Internal system error' }, { status: 500 });
  }
}
