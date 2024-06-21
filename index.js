#!/usr/bin/env node
const providedArgs = require("./utils/providedArgs");
const generateLibrary = require("./utils/generateLibrary");
const createFolderStructure = require("./utils/createFolderStructure");
const generateCrud = require("./utils/generateCrud");

// Main function
function main() {
  // Check if the library or directory name is provided as an argument
  const [libName, dirName, isCrudFlag] = providedArgs(process.argv[2]);

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
