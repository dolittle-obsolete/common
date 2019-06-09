/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {IDependency} from './index';

/**
 * Defines the configuration of a discover dependency
 *
 * @export
 * @interface IDiscoverDependency
 * @extends {IDependency}
 */
export interface IDiscoverDependency extends IDependency {
   
    /**
     * The discover type of the dependency, it dictates what should be discovered and how it will be discovered.
     * 
     * The 'namespace' discovery type tries to resolve a namespace for an artifact by going upwards in the file system and finding a file matching the 'milestone' parameter and then creating the namespace by joining folder names with '.'. 
     * 
     * The 'file' discovery type tries to find a file that matches the given 'fileMatch' parameter and sets the file name as the dependency. If the 'contentMatch' parameter is also given then the system will match the file by the fileMatch and contentMatch
     * 
     * The 'fileContent' discovery type does the same as the 'file' type, but the dependency is the file's content, not its file name.
     * 
     * The 'multipleFiles' discovery type does the same as the 'file' type, but it discovers multiple files instead of just one.
     * 
     * The 'multipleFileContents' discovery type does the same as the 'fileContent' type, but it discovers multiple files instead of just one.
     *
     * @readonly
     */
    readonly discoverType: string;
    
    /**
     * Whether or not to generate namespaces for each file that's discovered. 
     *
     * @readonly
     */
    readonly withNamespace?: boolean;

    /**
     * The regex that represents the filename of a milestone that's used to determine a namespace.
     *
     * @readonly
     */
    readonly milestone?: RegExp;

    /**
     * The regex that represents the filename pattern of the file to match
     *
     * @readonly
     */
    readonly fileMatch?: RegExp;

    /**
     * The regex that represents the content pattern of the file to match
     *
     * @readonly
     */
    readonly contentMatch?: RegExp;

    /**
     * The area a file discovery should start searching from.
     *
     * @readonly
     */
    readonly fromArea?: string;
}