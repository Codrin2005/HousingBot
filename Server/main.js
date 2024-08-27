const {findingNemoP} = require('./../Bots/Plaza/Plaza_script.js');
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
  console.log("result length: " + result.length);
}

setInterval(runBots, 60000);
runBots();
