/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IFileSystem } from '@dolittle/tooling.common.files';
import { ICanDiscoverLocalPackages, packageIsToolingPackage, DiscoveredToolingPackage, ToolingPackage, MultiplePackagesWithSameName } from '../internal';
import path from 'path';
import { Exception } from '@dolittle/tooling.common.utilities';

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

    async discover(folder: string = this._nodeModulesFolder, check: (toolingPackage: ToolingPackage) => boolean = (_) => true) {
        let discoveredPackages = await this.getPackages(folder);

        discoveredPackages = discoveredPackages.filter(_ => check(_.package));
        this.throwIfDuplicatePackages(discoveredPackages);
        return discoveredPackages;
    }

    private async getPackages(folder: string) {
        const discoveredPackages: DiscoveredToolingPackage[] = [];
        if (! (await this._fileSystem.stat(folder)).isDirectory()) throw new Exception(`Path '${folder}' is not a directory`);
        const dirs = await this._fileSystem.readDirectory(folder);
        await Promise.all(dirs.map(async dir => {
            const dirPath = path.join(folder, dir);
            try {
                const subDir = await this._fileSystem.readDirectory(dirPath);
                return this.searchDirectoryForPackages(dir, subDir.map(_ => path.join(dirPath, _)), discoveredPackages);
            }
            // tslint:disable-next-line: no-empty
            catch (err) {}
        }));

        return discoveredPackages;
    }

    private async searchDirectoryForPackages(dirName: string, filePaths: string[], discoveredPackages: DiscoveredToolingPackage[]) {
        for (let filePath of filePaths) {
            const fileName = path.parse(filePath).name;
            const fileStat = await this._fileSystem.stat(filePath);
            if (fileStat.isFile()) {
                filePath = path.normalize(filePath);
                if (path.parse(filePath).base === LocalNpmPackageDiscoverer.packageName) {
                    const packageJson = await this._fileSystem.readJson(filePath);
                    if (packageIsToolingPackage(packageJson)) {
                        const folderPath = path.parse(filePath).dir;
                        const discoveredPackage: DiscoveredToolingPackage = {path: folderPath, package: packageJson as ToolingPackage};
                        discoveredPackages.push(discoveredPackage);
                    }
                }
            }
            else if (fileStat.isDirectory() && dirName.startsWith('@')) {
                const subDir = await this._fileSystem.readDirectory(filePath);
                await this.searchDirectoryForPackages(fileName, subDir.map(_ => path.join(filePath, _)), discoveredPackages);
            }
        }
    }

    private throwIfDuplicatePackages(discoveredPackages: DiscoveredToolingPackage[]) {
        const packageNames = discoveredPackages.map(_ => _.package.name);
        packageNames.forEach((packageName, i) => {
            if (packageNames.slice(i + 1).includes(packageName)) throw new MultiplePackagesWithSameName(packageName);
        });
    }
}
