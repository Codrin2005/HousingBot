const cp = require("child_process");
const psData = cp.spawn
("powershell -executionpolicy bypass  ./Bots/Plaza/Plaza_Script.ps1", [], {
    shell: "powershell.exe",
});