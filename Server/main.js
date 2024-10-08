const {findingNemoP} = require('./../Bots/Plaza/Plaza_script.js');
const {sendMails} = require('./mailService.js');
//const {findingNemoRP} = require('./../Bots/RoomPlaza/RoomPlaza_script.js');
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

async function runBots(){
  result = await findingNemoP('Nederland - Zuid-Holland');
  if (result.length > 0){
    sendMails("Found " + result.length + " new listings on Plaza");
  }
}

setInterval(runBots, 60000);
