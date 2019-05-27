/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import {FullVersion} from 'package-json';

/**
 * Defines a system that's responsible for finding the latest compatible boilerplate of a package online
 *
 * @export
 * @interface ILatestCompatibleBoilerplateFinder
 */
export interface ILatestCompatibleBoilerplateFinder {
    
    /**
     * Gets the package.json of the latest compatible boilerplate with the given package name
     *
     * @param {string} boilerplatePackageName
     * @returns {Promise<BoilerplatePackage | null>}
     */
    find(boilerplatePackageName: string): Promise<FullVersion | null>

}