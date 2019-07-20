/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { FileSystem, Folders, IFileSystem, IFolders } from './index';

export const fileSystem: IFileSystem = new FileSystem();
export const folders: IFolders = new Folders(fileSystem);