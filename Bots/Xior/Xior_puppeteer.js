const { exec } = require('child_process');

function main() {
    setInterval(() => {
        exec('powershell.exe ./Xior/Xior_Script.ps1', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    }, 2 * 60 * 1000); // 2 minutes
}

main();

