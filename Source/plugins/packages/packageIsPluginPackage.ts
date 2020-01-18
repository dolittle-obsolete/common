
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { packageIsToolingPackage } from '@dolittle/tooling.common.packages';

export const pluginPackageKeyword = 'plugin';

/**
 * Whether or not the package object represents a dolittle tooling plugin package
 *
 * @export
 * @param {*} packageJson
 */
export function packageIsPluginPackage(packageJson: any) {
    return packageIsToolingPackage(packageJson) && packageJson.keywords.includes(pluginPackageKeyword);
}
