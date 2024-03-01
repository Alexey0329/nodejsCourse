import os from 'os';
import childProcess from 'child_process';
import fs from 'fs';

const logFile = 'activityMonitor.log';
const platform = os.platform()
let log = '';
let command = '';
if (platform === 'linux' || platform === 'darwin') {
  command='ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
} else if (platform === 'win32') {
  command = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"`
} else {
  console.log('Unsupported platform');
  process.exit(1);
}

const getFormattedLog = (stdout) => {
  const now = Math.floor(new Date().getTime() / 1000);
  return `${now} : ${stdout}`;
}

setInterval(() => {
    childProcess.exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`process exec error: ${error}`);
            return;
        }
        console.clear();
        console.log(stdout);
        log += getFormattedLog(stdout);

        const now = Math.floor(new Date().getTime() / 1000);
        if (now % 60 === 0) {
            fs.appendFile(logFile, log, err => {
                if (err) console.error(`file write error: ${err}`);
            });
            log = '';
        }
    });
}, 100);

