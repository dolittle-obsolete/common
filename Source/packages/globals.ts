/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import spawn from 'cross-spawn';
import os from 'os';
import path from 'path';
import { fileSystem } from '@dolittle/tooling.common.files';
import { 
    LatestCompatibleNpmPackageFinder, IPackages, Packages, AllNpmPackageVersionsFinder, 
    NpmPackagesByUserFinder, NpmPackagesWithKeywordsFinder, LatestNpmPackageVersionFinder, 
    ICanFindLatestVersionOfPackage, ILocalPackageDiscoverers, LocalPackageDiscoverers, 
    LocalNpmPackageDiscoverer, NpmPackageDownloader,ICanDownloadPackages,
    IConnectionChecker, ConnectionChecker, ILatestCompatiblePackageFinder
} from './internal';


let npmRootSpawn = spawn.sync('npm', ['root', '-g']);
if (npmRootSpawn.error) throw npmRootSpawn.error;
export const nodeModulesPath = npmRootSpawn.stdout.toString().replace(/\n$/, '');
export const userHomePath = os.homedir();

export const toolingPackage = fileSystem.existsSync(path.join(__dirname, 'package.json'))? 
                                fileSystem.readJsonSync(path.join(__dirname, 'package.json'))
                                : fileSystem.readJsonSync(path.join(__dirname, '..', 'package.json'));

export let latestNpmPackageVersionFinder: ICanFindLatestVersionOfPackage = new LatestNpmPackageVersionFinder();

let allNpmPackageVersionsFinder = new AllNpmPackageVersionsFinder(); 
export let latestCompatiblePackageFinder: ILatestCompatiblePackageFinder = new LatestCompatibleNpmPackageFinder(allNpmPackageVersionsFinder, toolingPackage);
let npmPackagesByUserFinder = new NpmPackagesByUserFinder();
let npmPackagesWithKeywordsFinder = new NpmPackagesWithKeywordsFinder();

export let packages: IPackages = new Packages(latestCompatiblePackageFinder, [npmPackagesByUserFinder], [npmPackagesWithKeywordsFinder]);

let localNpmPackageDiscoverer = new LocalNpmPackageDiscoverer(fileSystem, nodeModulesPath);
export let localPackageDiscoverers: ILocalPackageDiscoverers = new LocalPackageDiscoverers([localNpmPackageDiscoverer]);

export let npmPackageDownloader: ICanDownloadPackages = new NpmPackageDownloader();

export let connectionChecker: IConnectionChecker = new ConnectionChecker();
