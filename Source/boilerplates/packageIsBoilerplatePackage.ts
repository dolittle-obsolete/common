
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { packageIsToolingPackage } from "@dolittle/tooling.common.packages";
export const boilerplatePackageKeyword = 'boilerplates'; 

/**
 * Whether or not the package object represents a dolittle tooling boilerplate package
 *
 * @export
 * @param {*} packageJson
 */
export function packageIsBoilerplatePackage(packageJson: any) {
    return packageIsToolingPackage(packageJson) && packageJson.keywords.includes(boilerplatePackageKeyword);
}