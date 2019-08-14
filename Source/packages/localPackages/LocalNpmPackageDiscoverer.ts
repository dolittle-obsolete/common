/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IFileSystem } from "@dolittle/tooling.common.files";
import { ICanDiscoverLocalPackages, packageIsToolingPackage, DiscoveredToolingPackage, ToolingPackage, MultiplePackagesWithSameName } from "../index";
import path from 'path';

/**
 * Represents an implementation of {ICanDiscoverLocalPackages} that discover locally installed npm packages
 *
 * @export
 * @class LocalNpmPackageDiscoverer
 * @implements {ICanDiscoverLocalPackages}
 */
export class LocalNpmPackageDiscoverer implements ICanDiscoverLocalPackages{
    private static packageName = 'package.json';

    /**
     * Instantiates an instance of {LocalNpmPackageDiscoverer}.
     * @param {IFileSystem} _fileSystem
     * @param {string} _nodeModulesFolder
     */
    constructor(
        private _fileSystem: IFileSystem,
        private _nodeModulesFolder: string
    ) {}

    async discover(check: (toolingPackage: ToolingPackage) => boolean = (_) => true) {
        let discoveredPackages = await this.getPackages();
        
        discoveredPackages = discoveredPackages.filter(_ => check(_.package))
        this.throwIfDuplicatePackages(discoveredPackages);
        return discoveredPackages;
    }

    private async getPackages() {
        let discoveredPackages: DiscoveredToolingPackage[] = [];
        let dirs = await this._fileSystem.readDirectory(this._nodeModulesFolder);
        await Promise.all(dirs.map(async dir => {
            const dirPath = path.join(this._nodeModulesFolder, dir);
            const isDirectory = (await this._fileSystem.lstat(dirPath)).isDirectory();
            if (isDirectory) {
                let subDir = await this._fileSystem.readDirectory(dirPath);
                return this.searchDirectoryForPackages(dir, subDir.map(_ => path.join(dirPath, _)), discoveredPackages);
            }
        }));

        return discoveredPackages;
    }

    private async searchDirectoryForPackages(dirName: string, filePaths: string[], discoveredPackages: DiscoveredToolingPackage[]) {
        for (let filePath of filePaths) {
            let fileName = path.parse(filePath).name;
            const fileStat = await this._fileSystem.lstat(filePath);
            if (fileStat.isFile()) {
                filePath = path.normalize(filePath);
                if (path.parse(filePath).base === LocalNpmPackageDiscoverer.packageName) {
                    let packageJson = await this._fileSystem.readJson(filePath);
                    if (packageIsToolingPackage(packageJson)) {
                        let folderPath = path.parse(filePath).dir;
                        let discoveredPackage: DiscoveredToolingPackage = {path: folderPath, package: packageJson as ToolingPackage}
                        discoveredPackages.push(discoveredPackage);
                    }
                }
            }
            else if (fileStat.isDirectory() && dirName.startsWith('@')) {
                let subDir = await this._fileSystem.readDirectory(filePath);
                await this.searchDirectoryForPackages(fileName, subDir.map(_ => path.join(filePath, _)), discoveredPackages);   
            }
        }
    }
    
    private throwIfDuplicatePackages(discoveredPackages: DiscoveredToolingPackage[]) {
        let packageNames = discoveredPackages.map(_ => _.package.name);
        packageNames.forEach((packageName, i) => {
            if (packageNames.slice(i + 1).includes(packageName)) throw new MultiplePackagesWithSameName(packageName);
        })
    }
}
