/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IBoilerplate } from '../internal';

/**
 * Defines the content boilerplate
 */
export interface IContentBoilerplate extends IBoilerplate {

    /**
     * Get the target of {Boilerplate}.
     *
     * @type {string}
     */
    readonly target: string;

    /**
     * Get the framework of {Boilerplate}
     *
     * @type {string}
     */
    readonly framework: string;

    /**
     * Get the parent boilerplate that this is an adornment boilerplate of
     *
     * @type {{name: string, type: string, language: string}}
     */
    readonly parent: {name: string, type: string, language: string};

    /**
     * Get the paths that need binding - relative within the content of the location of the {Boilerplate}
     *
     * @type {string[]}
     */
    readonly pathsNeedingBinding: string[];

    /**
     * Gets the files that need binding - relative within the content of the location of the {Boilerplate}
     *
     * @type {string[]}
     */
    readonly filesNeedingBinding: string[];
}
