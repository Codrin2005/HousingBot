const {findingNemoP} = require('./../Bots/Plaza/Plaza_script.js');
const {exec} = require('child_process');

exec(`node ./Server/server.js`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});

function runPlaza(){
  console.log(findingNemoP('Nederland - Zuid-Holland'));
}

setInterval(runPlaza, 60000);
runPlaza();
