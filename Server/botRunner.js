const cp = require("child_process");

function runPlaza(){
  const psData = cp.spawn
  ("powershell -executionpolicy bypass  ./Bots/Plaza/Plaza_Script.ps1", [], {
      shell: "powershell.exe",
  });
}

setInterval(runPlaza, 60000);
runPlaza();