import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execPromise = promisify(exec);

export async function runMultiLangScript(scriptName: string, lang: 'python' | 'go' | 'rust' | 'cpp' | 'powershell', args: string[] = []) {
  try {
    const scriptPath = path.join(process.cwd(), 'scripts', scriptName);
    const escapedArgs = args.map(arg => `"${arg.replace(/"/g, '\\"')}"`).join(' ');
    
    let command = '';
    switch (lang) {
      case 'python':
        command = `python "${scriptPath}" ${escapedArgs}`;
        break;
      case 'go':
        command = `go run "${scriptPath}" ${escapedArgs}`;
        break;
      case 'rust':
        command = `rustc "${scriptPath}" -o "${scriptPath}.exe" && "${scriptPath}.exe" ${escapedArgs}`;
        break;
      case 'cpp':
        command = `g++ "${scriptPath}" -o "${scriptPath}.exe" && "${scriptPath}.exe" ${escapedArgs}`;
        break;
      case 'powershell':
        command = `powershell -ExecutionPolicy Bypass -File "${scriptPath}" ${escapedArgs}`;
        break;
      default:
        throw new Error(`Unsupported language: ${lang}`);
    }

    const { stdout, stderr } = await execPromise(command);
    
    if (stderr) {
      console.error(`Script stderr (${lang}): ${stderr}`);
    }
    
    try {
      return JSON.parse(stdout);
    } catch (e) {
      return { output: stdout, error: stderr };
    }
  } catch (error) {
    console.error(`Error running ${lang} script ${scriptName}:`, error);
    throw error;
  }
}

// Keeping the original function for backward compatibility
export async function runPythonScript(scriptName: string, args: string[] = []) {
  return runMultiLangScript(scriptName, 'python', args);
}
