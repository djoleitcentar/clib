const minimist = require('minimist');

function providedArgs(route) {
  const argv = minimist(process.argv.slice(2), {
    boolean: ['c', 'crud'],
  });
  const isCrudFlag = argv.crud || argv.c;
  let libName = '';
  let dirName = '';
  if (route.split('/').length > 1) {
    libName = route?.split('/')[1];
    dirName = route?.split('/')[0];
  } else {
    libName = route;
    dirName = 'core';
  }
  if (!libName) {
    libName = 'new-lib';
  }
  if (!dirName) {
    dirName = null;
  }

  return [libName, dirName, isCrudFlag];
}

module.exports = providedArgs;
