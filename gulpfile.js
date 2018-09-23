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

// ================== Src directory resolver ========================
function resolveToSrc() {
  return path.join(rootDir, 'src');
}

// ================== Controller Resolvers ===========================
function resolveToControllers() {
  return path.join(rootDir, 'src', 'controllers'); // src/controllers
}

function resolveToControllersIndex() {
  return path.join(resolveToControllers(), 'index.ts');
}

function resolveToControllersTypes() {
  return path.join(rootDir, 'src', 'controllers', 'types'); // src/controllers/types/{glob}
}

// ==================== Model Resolvers ==============================
function resolveToModels() {
  return path.join(rootDir, 'src', 'models'); // src/models
}

function resolveToModelsIndex() {
  return path.join(rootDir, 'src', 'models', 'index.ts'); // src/models/index.ts
}

function resolveToModelsSpec() {
  return path.join(rootDir, 'tests', 'unit', 'models'); // tests/unit/models
}

// ==================== Inversify Resolvers ===========================

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

// ===================== Helper Functions =============================

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
  blankControllerInterfaceTemplate: path.join(__dirname, 'generator', 'itemp.controller.ts'),
  modelTemplate: path.join(__dirname, 'generator', 'temp.model.ts'),
  modelSpecTemplate: path.join(__dirname, 'generator', 'temp.model.spec.ts')
};

// ========================= Gulp tasks ================================

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
});

// add to controllers exports barrel
gulp.task('controller:export', () => {
  const name = yargs.argv.name;

  return gulp.src(resolveToControllersIndex())
    .pipe(inject.append(`export * from './${capitalizeFirstLetter(name)}.controller';`))
    .pipe(gulp.dest(resolveToControllers()))
});

// Add to inversify types src/inversify.types.ts
gulp.task('controller:inversify:types', () => {
  const interfaceName = generateInterfaceName(yargs.argv.name);

  return gulp.src(resolveToInversifyPath('types'))
    .pipe(inject.after('const TYPES = {', `
  ${interfaceName}Controller: Symbol.for('${interfaceName}Controller'),`))
    .pipe(gulp.dest(resolveToSrc()));
})

gulp.task('controller:inversify:config', () => {
  const name = yargs.argv.name;
  const interfaceName = generateInterfaceName(name);

  return gulp.src(resolveToInversifyPath('config'))
    .pipe(inject.before('import { Container } from \'inversify\';', `
import { ${capitalizeFirstLetter(name)}Controller } from '@/controllers';
import { ${interfaceName}Controller } from '@/controllers/types';
`))
    .pipe(inject.after('const container: Container = new Container();', `
container.bind<${interfaceName}Controller>(TYPES.${interfaceName}Controller).to(${capitalizeFirstLetter(name)}Controller);`))
    .pipe(gulp.dest(resolveToSrc()));
})

gulp.task('model:create', () => {
  const interfaceName = generateInterfaceName(yargs.argv.name);
  const modelName = capitalizeFirstLetter(yargs.argv.name);

  // Creating the model
  return gulp.src(pathMap.modelTemplate)
    .pipe(template({
      interfaceName,
      name: modelName
    }))
    .pipe(rename((filePath) => {
      filePath.basename = filePath.basename.replace('temp', modelName)
    }))
    .pipe(gulp.dest(resolveToModels()));
});

gulp.task('model:export', () => {
  const name = yargs.argv.name;

  return gulp.src(resolveToModelsIndex())
    .pipe(inject.append(`export * from './${capitalizeFirstLetter(name)}.model';`))
    .pipe(gulp.dest(resolveToModels()))
});

gulp.task('model:tdd', () => {
  const interfaceName = generateInterfaceName(yargs.argv.name);
  const modelName = capitalizeFirstLetter(yargs.argv.name);

  // Creating the model test
  return gulp.src(pathMap.modelSpecTemplate)
    .pipe(template({
      interfaceName,
      modelName
    }))
    .pipe(rename((filePath) => {
      filePath.basename = filePath.basename.replace('temp', modelName)
    }))
    .pipe(gulp.dest(resolveToModelsSpec()));
});

// gulp controller --name controllerName
gulp.task('controller', gulp.series(
  'controller:interface:create', 
  'controller:interface:export',
  'controller:create',
  'controller:export',
  'controller:inversify:types',
  'controller:inversify:config'
  )
);

// gulp model --name modelName
gulp.task('model', gulp.series(
    'model:create',
    'model:export',
    'model:tdd'
  )
)