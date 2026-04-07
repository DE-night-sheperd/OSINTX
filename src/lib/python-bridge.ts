import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execPromise = promisify(exec);

export async function runPythonScript(scriptName: string, args: string[] = []) {
  try {
    const scriptPath = path.join(process.cwd(), 'scripts', scriptName);
    const escapedArgs = args.map(arg => `"${arg.replace(/"/g, '\\"')}"`).join(' ');
    
    // Use 'python' or 'python3' depending on the environment
    const { stdout, stderr } = await execPromise(`python ${scriptPath} ${escapedArgs}`);
    
    if (stderr) {
      console.error(`Python script stderr: ${stderr}`);
    }
    
    return JSON.parse(stdout);
  } catch (error) {
    console.error(`Error running Python script ${scriptName}:`, error);
    throw error;
  }
}
