const path = require('path');
const fs = require('fs');

const { Printer, print: pf, toColor, toPrintClear, printWarn } = require('@suey/printer');

const node_modules = path.join(__dirname, '../../node_modules/');
const rootPackageJson = require(path.join(__dirname, '../../package.json'));

const dependencies = [];

if (rootPackageJson.dependencies) {
  for (const key in rootPackageJson.dependencies) {
    dependencies.push(key);
  }
}
if (rootPackageJson.devDependencies) {
  for (const key in rootPackageJson.devDependencies) {
    dependencies.push(key);
  }
}

readProtocol(node_modules);

function readProtocol(distPath) {
  try {
    if (fs.statSync(distPath).isDirectory()) {
      fs.readdirSync(distPath).forEach(name => readProtocol(path.join(distPath, name)));
    }
  } catch {
    printWarn('依赖树可能存在某些问题');
  }

  if (distPath.endsWith('package.json')) {

    const packageJson = require(distPath);

    const license = (typeof packageJson.license === 'object' ? packageJson.license.type : packageJson.license);

    const registory = distPath.replace(node_modules, '').replace(/\\package\.json$/, '');

    if (dependencies.some(dep => registory.includes(dep))) {
      pf(
        toPrintClear(),
        registory,
        '  ',
        toColor('red'),
        license,
        toPrintClear()
      );
    }
  }
}






