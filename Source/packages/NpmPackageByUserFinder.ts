/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import npmUserPackages from 'npm-user-packages';
import { ICanFindPackagesByUser, packageIsToolingPackage, ToolingPackage } from './index';

/**
 * Represents an implementation of {ICanFindPackagesByUser} for finding packages on npm
 *
 * @export
 * @class NpmPackageByUserFinder
 * @implements {ICanFindPackagesByUser}
 */
export class NpmPackageByUserFinder implements ICanFindPackagesByUser {

    async find(user: string, check: (toolingPackage: ToolingPackage) => boolean = (_) => true) {
        let packages = await npmUserPackages(user);
        return packages.filter(packageJson => packageIsToolingPackage(packageJson) && check(packageJson as any as ToolingPackage));
    }
}