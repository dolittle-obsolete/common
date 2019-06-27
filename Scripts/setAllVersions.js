#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

let version = process.argv[2];

let packageJsonPaths = [
    '../Source/boilerplates/package.json',
    '../Source/commands/package.json',
    '../Source/common/package.json',
    '../Source/configurations/package.json',
    '../Source/dependencies/package.json',
    '../Source/files/package.json',
    '../Source/logging/package.json',
    '../Source/packages/package.json',
    '../Source/plugins/package.json',
    '../Source/utilities/package.json'
];

packageJsonPaths.forEach(_ => {
    let packagePath = path.join(__dirname, _);
    let packageObj = fs.readJsonSync(packagePath);
    packageObj.version = version;
    fs.writeJsonSync(packagePath, packageObj, {spaces: 2});
})