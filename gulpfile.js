'use strict';

const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const clean = require('gulp-clean');
const sync = require('run-sequence');
const rename = require('gulp-rename');
const template = require('gulp-template');
const inject = require('gulp-inject-string');
const merge = require('merge-stream');
const yargs = require('yargs');

const rootDir = './';

function resolveToSrc() {
  return path.join(rootDir, 'src');
}

/**
 *
 * @param glob - the new incoming file name
 */

function resolveToControllers() {
  // glob = glob || '';
  return path.join(rootDir, 'src', 'controllers'); // src/controllers
}

function resolveToControllersIndex() {
  return path.join(resolveToControllersTypes(), 'index.ts');
}

function resolveToControllersTypes(glob) {
  glob = glob || '';
  return path.join(rootDir, 'src', 'controllers', 'types', glob); // src/controllers/types/{glob}
}

function resolveToInversifyPath(file) {
  switch (file) {
    case 'config':
      return path.join(rootDir, 'src', 'inversify.config.ts');
      break;
    case 'types':
      return path.join(rootDir, 'src', 'inversify.types.ts');
      break;
    default:
      throw new Error(`Cannot find inversify type ${file}, must be config or types`);
  }
}

function capitalizeFirstLetter(val) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

function generateInterfaceName(val) {
  // Capitalize the first letter
  val = capitalizeFirstLetter(val);
  // Split into an array
  var stringArr = val.split("");
  // Concat an I array with the string array then join
  return ["I"].concat(stringArr).join("");
}

// ------------------------- Map of all paths ---------------------------
const pathMap = {
  blankControllerTemplate: path.join(__dirname, 'generator', 'temp.controller.ts'),
  blankControllerInterfaceTemplate: path.join(__dirname, 'generator', 'itemp.controller.ts')
};

// ========================= Gulp tasks ================================
// gulp controller --name booyah
gulp.task('booyah', () => {
  const name = yargs.argv.name;
  const controllerDestinationPath = resolveToControllers();
  const controllerTypeDestinationPath = resolveToControllersTypes();
  const controllerIndexPath = path.join(resolveToControllers(), 'index.ts');
  const controllerTypeIndexPath = path.join(resolveToControllersTypes(), 'index.ts');
  const interfaceName = generateInterfaceName(name);

  const addControllerToIndex = gulp.src(controllerIndexPath)
    .pipe(inject.append(`export * from './${capitalizeFirstLetter(name)}.controller';`))
    .pipe(gulp.dest(resolveToControllers))
  
  // Add to inversify types
  const addToInversifyTypes = gulp.src(resolveToInversifyPath('types'))
    .pipe(inject.after('const TYPES = {', `
  ${interfaceName}Controller: Symbol.for('${interfaceName}Controller'),`))
    .pipe(gulp.dest(resolveToSrc()));
  
  const addToInversifyConfig = gulp.src(resolveToInversifyPath('config'))
    .pipe(inject.before('import { Container } from \'inversify\';', `
import { ${capitalizeFirstLetter(name)}Controller } from '@/controllers';
import { ${interfaceName}Controller } from '@/controllers/types';
`))
    .pipe(inject.after('const container: Container = new Container();', `
container.bind<${interfaceName}Controller>(TYPES.${interfaceName}Controller).to(${capitalizeFirstLetter(name)}Controller);`))
    .pipe(gulp.dest(resolveToSrc()));

  return merge(createNewControllerInterface, addExportToIndex, createNewController, addControllerToIndex, merge(addToInversifyTypes, addToInversifyConfig));
});

// interface generator
gulp.task('controller:interface:create', () => {
  const name = yargs.argv.name;
  const controllerTypeDestinationPath = resolveToControllersTypes();
  const interfaceName = generateInterfaceName(name);

  return gulp.src(pathMap.blankControllerInterfaceTemplate)
    .pipe(template({
      IName: interfaceName
    }))
    .pipe(rename((filePath) => {
      filePath.basename = filePath.basename.replace('itemp', interfaceName)
    }))
    .pipe(gulp.dest(controllerTypeDestinationPath));
});

gulp.task('controller:interface:export', () => {
  const interfaceName = generateInterfaceName(yargs.argv.name);

  return gulp.src(resolveToControllersIndex())
    .pipe(inject.append(`export * from './${interfaceName}.controller';`))
    .pipe(gulp.dest(resolveToControllersTypes()))
});

gulp.task('controller:create', () => {
  const interfaceName = generateInterfaceName(yargs.argv.name);
  const controllerName = capitalizeFirstLetter(yargs.argv.name);

  // Creating the controller
  return gulp.src(pathMap.blankControllerTemplate)
    .pipe(template({
      IName: interfaceName,
      upCaseName: controllerName
    }))
    .pipe(rename((filePath) => {
      filePath.basename = filePath.basename.replace('temp', controllerName)
    }))
    .pipe(gulp.dest(resolveToControllers()));
})

gulp.task('controller', gulp.series(
  'controller:interface:create', 
  'controller:interface:export',
  'controller:create'
  )
)