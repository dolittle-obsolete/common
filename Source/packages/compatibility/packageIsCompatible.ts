/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import semver from 'semver';
import { ToolingPackage } from '../internal';

/**
 * Whether or not this boilerplate package is compatible with the tooling version
 *
 * @export
 * @param {BoilerplatePackage} pkgJson
 */
export function packageIsCompatible(pkgJson: ToolingPackage, toolingPackage: any) {
    return pkgJson.dolittle !== undefined && pkgJson.dolittle.tooling !== undefined && semver.satisfies(toolingPackage.version, pkgJson.dolittle.tooling);
}
