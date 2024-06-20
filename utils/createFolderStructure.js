const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const capitalizeFirstLetter = require('./capitalizeFirstLetter');
const deleteFolderRecursive = require('./deleteFolderRecursive');

// Function to create folder structure
function createFolderStructure(libName, dirName) {
  const libDir = path.join('libs', dirName, libName);
  const srcDir = path.join(libDir, 'src');
  const libFolder = path.join(srcDir, 'lib');

  try {
    // Delete existing lib folder if it exists
    deleteFolderRecursive(libFolder);

    // Create lib folder
    fs.mkdirSync(libFolder, { recursive: true });
    console.log(`Folder 'lib' created successfully`);

    // Create components and core folders inside lib
    const componentsDir = path.join(libFolder, 'components');
    const coreDirInsideLib = path.join(libFolder, 'core');
    const servicesDir = path.join(coreDirInsideLib, 'service');

    fs.mkdirSync(componentsDir);
    fs.mkdirSync(coreDirInsideLib);
    fs.mkdirSync(servicesDir);
    console.log(
      `Folders 'components', 'core', and 'service' created successfully inside 'lib'`
    );

    // Create core subfolders and files
    const coreModelsDir = path.join(coreDirInsideLib, 'models');
    const coreRoutingModuleFile = path.join(
      coreDirInsideLib,
      `core-${libName}-routing.module.ts`
    );
    const coreModuleFile = path.join(
      coreDirInsideLib,
      `core-${libName}-module.ts`
    );

    fs.mkdirSync(coreModelsDir);
    console.log(`Folder 'models' created successfully inside 'core'`);

    // Write content to core routing module file
    const coreRoutingModuleContent = `/* ====================================
*            ANGULAR IMPORTS
======================================= */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// * CUSTOM
import { Role } from '@app/shared/common';

/**
 * @routeAccess Define who can access routes
 */
const routeAccess = [Role.SUPERADMIN, Role.ADMIN];

const routes = [];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Core${capitalizeFirstLetter(libName)}RoutingModule {}
`;

    fs.writeFileSync(coreRoutingModuleFile, coreRoutingModuleContent);
    console.log(
      `File 'core-${libName}-routing.module.ts' created successfully inside 'core'`
    );

    // Write content to core module file
    const coreModuleContent = `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '@app/shared/components';
import { SharedUiModule } from '@app/shared/ui';
import { Core${capitalizeFirstLetter(
      libName
    )}RoutingModule } from './core-${libName}-routing.module';
import { Route } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

export const core${capitalizeFirstLetter(libName)}Routes: Route[] = [];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedComponentsModule,
    SharedUiModule,
    Core${capitalizeFirstLetter(libName)}RoutingModule,
    ReactiveFormsModule,
  ],
})
export class Core${capitalizeFirstLetter(libName)}Module {}
`;

    fs.writeFileSync(coreModuleFile, coreModuleContent);
    console.log(
      `File 'core-${libName}-module.ts' created successfully inside 'core'`
    );

    // Run Angular CLI commands to generate services
    try {
      console.log(libName);
      execSync(
        `nx g @nx/angular:service core/service/${libName}-fields --project=${libName} --skipTests`,
        {
          stdio: 'inherit',
        }
      );

      execSync(
        `nx g @nx/angular:service core/service/${libName} --project=${libName} --skipTests`,
        {
          stdio: 'inherit',
        }
      );

      console.log(
        `Services '${libName}-fields.service.ts' and '${libName}.service.ts' created successfully inside 'services'`
      );
    } catch (error) {
      console.error('Error generating services:', error);
    }
  } catch (err) {
    console.error('Error creating folder structure:', err);
  }
}

module.exports = createFolderStructure;
