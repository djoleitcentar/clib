const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "bin", "clib");

if (process.platform !== "win32" && fs.existsSync(filePath)) {
  execSync(`chmod +x ${filePath}`);
}
