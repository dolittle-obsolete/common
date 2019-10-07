/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export const namespaceDiscoverType = 'namespace';
export const fileDiscoverType = 'file';
export const fileContentDiscoverType = 'fileContent';
export const multipleFilesDiscoverType = 'multipleFiles';
export const multipleFileContentsDiscoverType = 'multipleFileContents';

export const dependencyDiscoverTypes = [
    namespaceDiscoverType,
    fileDiscoverType,
    fileContentDiscoverType,
    multipleFilesDiscoverType,
    multipleFileContentsDiscoverType
];
