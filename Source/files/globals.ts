/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as _fsExtra from 'fs-extra';
import { Folders } from './Folders';
export const fileSystem = _fsExtra;
export type FileSystem = typeof _fsExtra;

export const folders = new Folders(fileSystem);