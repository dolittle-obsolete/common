
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import packageJson from 'package-json';
import { ToolingPackage, IAllVersionsOfPackageFinder } from '../../internal';

/**
 * Represents an implementation of {ICanFindAllVersionsOfAPackage} that finds all versions of a package on npm
 *
 * @export
 * @class AllNpmPackageVersionsFinder
 * @implements
 */
export class AllNpmPackageVersionsFinder implements IAllVersionsOfPackageFinder {

    async find(packageName: string) {
        const packageObj = await packageJson(packageName, {allVersions: true, fullMetadata: true});
        const versionsObject = packageObj.versions;
        return Object.keys(versionsObject).map(_ => versionsObject[_]) as any as ToolingPackage[];
    }

}
