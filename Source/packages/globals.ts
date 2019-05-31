/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import spawn from 'cross-spawn';

let npmRootSpawn = spawn.sync('npm', ['root', '-g']);
if (npmRootSpawn.error) throw npmRootSpawn.error;
export const nodeModulesPath = npmRootSpawn.stdout.toString().replace(/\n$/, '');

export const toolingPackage = process.env.WALLABY_TESTING? require('./package.json') : require('../package.json');
