/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import fs, { ReadOptions, WriteOptions, WriteFileOptions, CopyOptions, CopyOptionsSync, EnsureOptions } from 'fs-extra';
import { IFileSystem } from "./index";

/**
 * Represents the implementation of {IFileSystem}
 *
 * @export
 * @class FileSystem
 * @implements {IFileSystem}
 */
export class FileSystem implements IFileSystem {

    readJson(file: string, options?: ReadOptions) {
        return fs.readJson(file, options);
    }

    readJsonSync(file: string, options?: ReadOptions) {
        return fs.readJsonSync(file, options);
    }

    readFile(file: string, encoding: string = 'utf8') {
        return fs.readFile(file, encoding);
    }

    readFileSync(file: string, encoding: string = 'utf8') {
        return fs.readFileSync(file, encoding);
    }

    readLink(file: string) {
        return fs.readlink(file);
    }

    readLinkSync(file: string) {
        return fs.readlinkSync(file);
    }

    readDirectory(path: string) {
        return fs.readdir(path);
    }

    readDirectorySync(path: string) {
        return fs.readdirSync(path);
    }
    
    writeJson(file: string, object: any, options?: WriteOptions) {
        return fs.writeJson(file, object, options);
    }

    writeJsonSync(file: string, object: any, options?: WriteOptions) {
        fs.writeJsonSync(file, object, options);
    }
    
    writeFile(file: string, data: string, options?: WriteFileOptions) {
        return fs.writeFile(file, data, options);
    }

    writeFileSync(file: string, data: string, options?: WriteFileOptions) {
        fs.writeFileSync(file, data, options);
    }

    rename(oldPath: string, newPath: string) {
        return fs.rename(oldPath, newPath);
    }

    renameSync(oldPath: string, newPath: string) {
        fs.renameSync(oldPath, newPath);
    }

    copy(source: string, destination: string, options?: CopyOptions) {
        return fs.copy(source, destination, options);
    }

    copySync(source: string, destination: string, options?: CopyOptionsSync) {
        fs.copySync(source, destination, options);
    }
    
    exists(path: string) {
        return fs.pathExists(path);
    }

    existsSync(path: string) {
        return fs.pathExistsSync(path);
    }

    ensureDirectory(path: string, options?: EnsureOptions) {
        return fs.ensureDir(path, options);
    }

    ensureDirectorySync(path: string, options?: EnsureOptions) {
        fs.ensureDirSync(path, options);
    }

    stat(path: string) {
        return fs.stat(path);
    }

    statSync(path: string) {
        return fs.statSync(path);
    }

    lstat(path: string) {
        return fs.lstat(path);
    }

    lstatSync(path: string) {
        return fs.lstatSync(path);
    }
}
