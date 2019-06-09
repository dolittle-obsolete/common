/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const path = require('path');

/**
 * Gets the full directory path
 * @param {string} filePath
 * @returns {string} directory path
 */
export function getFileDirPath(filePath: string): string {
    filePath = path.normalize(filePath);
    return path.parse(filePath).dir;
}
/**
 * Gets the filename without extension
 * @param {string} filePath
 * @returns {string} filename
 */
export function getFileName(filePath: string): string {
    filePath = path.normalize(filePath);
    return path.parse(filePath).name;
}
/**
 * Gets the filename with extension
 * @param {string} filePath
 * @returns {string} filename
 */
export function getFileNameAndExtension(filePath: string): string {
    filePath = path.normalize(filePath);
    return path.parse(filePath).base;
}
/**
  * Gets the directory name
  * @param {string} filePath
  * @returns {string} file dirname
  */
export function getFileDir(filePath: string): string {
    filePath = path.normalize(filePath);
    return path.dirname(filePath);
}