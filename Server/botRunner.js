const cp = require("child_process");
const psData = cp.spawn
("powershell -executionpolicy bypass  ./Plaza_Script.ps1", [], {
    shell: "powershell.exe",
});