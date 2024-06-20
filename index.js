#!/usr/bin/env node
const minimist = require("minimist");
const generateLibrary = require("./utils/generateLibrary");
const createFolderStructure = require("./utils/createFolderStructure");
const generateCrud = require("./utils/generateCrud");

// Main function
function main() {
  // Check if the library or directory name is provided as an argument
  const route = process.argv[2];
  const argv = minimist(process.argv.slice(2), {
    boolean: ["c", "crud"],
  });
  const isCrudFlag = argv.crud || argv.c;
  let libName = "";
  let dirName = "";
  if (route.split("/").length > 1) {
    libName = route?.split("/")[1];
    dirName = route?.split("/")[0];
  } else {
    libName = route;
    dirName = "core";
  }
  if (!libName) {
    libName = "new-lib";
  }
  if (!dirName) {
    dirName = null;
  }

  // Generate Nx library
  generateLibrary(libName, dirName);

  // Create folder structure
  createFolderStructure(libName, dirName);

  if (true) {
    generateCrud(libName, dirName);
  }
}

// Invoke main function
main();
