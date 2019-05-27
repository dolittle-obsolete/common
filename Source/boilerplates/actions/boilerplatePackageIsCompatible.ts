/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import semver from 'semver';
import { BoilerplatePackage } from "../index";

const toolingPkg = require('../../package.json')

/**
 * Whether or not this boilerplate package is compatible with the tooling version
 *
 * @export
 * @param {BoilerplatePackage} pkgJson
 */
export function boilerplatePackageIsCompatible(pkgJson: BoilerplatePackage) {
    return pkgJson.dolittle.tooling === semver.major(toolingPkg.version).toString()
} 