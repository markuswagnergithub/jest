/**
 * Copyright (c) 2014, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

const babel = require('babel-core');
const chalk = require('chalk');
const fs = require('fs');
const getPackages = require('./_getPackages');
const glob = require('glob');
const minimatch = require('minimatch');
const path = require('path');
const spawnSync = require('child_process').spawnSync;

const BUILD_DIR = 'build';
const SRC_DIR = 'src';
const JS_FILES_PATTERN = '**/*.js';
const IGNORE_PATTERN = '**/__@(tests|mocks|test_modules)__/**/*';

function buildPackage(p) {
  const srcDir = path.resolve(p, SRC_DIR);
  const pattern = path.resolve(srcDir, JS_FILES_PATTERN);
  const files = glob.sync(pattern).filter(f => !minimatch(f, IGNORE_PATTERN));
  const buildDir = path.resolve(p, BUILD_DIR);
  spawnSync('mkdir', ['-p', buildDir]);

  process.stdout.write(
    chalk.inverse(`Building package: ${path.basename(p)}\n`)
  );

  files.forEach(file => {
    const destPath = path.resolve(buildDir, path.relative(srcDir, file));
    const transformed = babel.transformFileSync(file, {
      plugins: 'transform-flow-strip-types',
      retainLines: true,
      babelrc: false,
    }).code;
    spawnSync('mkdir', ['-p', path.dirname(destPath)]);
    fs.writeFileSync(destPath, transformed);
    process.stdout.write(
      chalk.green('  \u2022 ') +
      path.relative(p, file) +
      chalk.green(' \u21D2 ') +
      path.relative(p, destPath) +
      '\n'
    );
  });
}

getPackages().forEach(buildPackage);
process.stdout.write('\n');
