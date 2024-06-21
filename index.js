#!/usr/bin/env node
const providedArgs = require("./utils/providedArgs");
const generateLibrary = require("./utils/generateLibrary");
const createFolderStructure = require("./utils/createFolderStructure");
const generateCrud = require("./utils/generateCrud");

// Main function
function main() {
  // Check if the library or directory name is provided as an argument
  args = providedArgs(process.argv[2]);
  const [libName, dirName, isCrudFlag] = args;

  // Generate Nx library
  generateLibrary(libName, dirName);

  // Create folder structure
  createFolderStructure(libName, dirName);

  if (isCrudFlag) {
    generateCrud(libName, dirName);
  }
}

// Invoke main function
main();
