/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export type BoilerplatePackageJson =  {
    /**
     * The name of the package
     *
     * @type {string}
     */
    name: string;
    /**
     * The version of the package 
     *
     * @type {string}
     */
    version: string;
    /**
     * The description of the package
     *
     * @type {string}
     */
    description: string;
    /**
     * The keywords of the package
     *
     * @type {string[]}
     */
    keywords: string[];
    /**
     * The dolittle configuration
     *
     * @type {{tooling: string}}
     * 
     */
    dolittle: {tooling: string}
}