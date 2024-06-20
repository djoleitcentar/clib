const { execSync } = require('child_process');

// Function to generate CRUD components
function generateCrud(libName, dirName) {
  const componentNames = [
    `add-${libName}`,
    `all-${libName}`,
    `edit-${libName}`,
  ];

  for (const componentName of componentNames) {
    let command;
    console.log(`Create ${componentName} component:`);
    command = `nx g @nx/angular:component ${componentName} --style=scss --directory libs/${dirName}/${libName}/src/lib/components/${componentName} --skipTests`;
    execSync(command, { stdio: 'inherit' }); // Inherit output for feedback
  }
}

module.exports = generateCrud;
