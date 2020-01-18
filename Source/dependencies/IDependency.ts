/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IDependencyRule } from './internal';

/**
 * Defines the base configuration of a dependency
 *
 * @export
 * @interface IDependency
 */
export interface IDependency {

    /**
     * The name of the dependency
     *
     * @readonly
     */
    readonly name: string;

    /**
     * The description of the dependency
     *
     * @type {string}
     * @readonly
     */
    readonly description: string;

    /**
     * The type of the dependency. Either 'discover' or 'userInput'
     *
     * The 'discover' dependency type tells the system that it should find the dependency somehow, normally by searching through the file system. A 'discover' could also mean to discover multiple choices and then make it the user's responsibility to choose. If so the dependency should also have a 'userInputType' parameter for how the user can choose.
     *
     * The 'userInput' dependency type tells the system that this dependency is supplied by the user
     *
     * @type {string}
     * @readonly
     */
    readonly type: string;

    /**
     * The rules associated with this specific dependency
     *
     * @type {IDependencyRule[]}
     */
    readonly rules: IDependencyRule[]
}
