const { execSync } = require('child_process');

// Function to generate Nx library
function generateLibrary(libName, dirName) {
  try {
    execSync(
      `nx g @nx/angular:library ${libName} --directory libs/${dirName}/${libName} --projectNameAndRootFormat as-provided --no-interactive`,
      {
        stdio: 'inherit',
      }
    );
  } catch (error) {
    console.error('Error generating library:', error);
    process.exit(1);
  }
}

module.exports = generateLibrary;
