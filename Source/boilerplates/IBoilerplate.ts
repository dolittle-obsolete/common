/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependencies } from '@dolittle/tooling.common.dependencies';
import { Scripts } from './internal';

/**
 * Defines a boilerplate
 */
export interface IBoilerplate {

    /**
     * The name of the {Boilerplate}
     *
     * @type {string}
     */
    readonly name: string;

    /**
     * The language of the {Boilerplate}
     *
     * @type {string}
     */
    readonly language: string;

    /**
     * The description of the {Boilerplate}
     *
     * @type {string}
     */
    readonly description: string;

    /**
     * The type of {Boilerplate}
     *
     * @type {string}
     */
    readonly type: string;

    /**
     * The dependencies of the {Boilerplate}
     *
     * @type {IDependencies}
     */
    readonly dependencies: IDependencies;

    /**
     * The namespace of the {Boilerplate}
     *
     * @type {string}
     */
    readonly namespace: string;

    /**
     * The scripts of the {Boilerplate}
     *
     * @type {Scripts}
     */
    readonly scripts: Scripts;

    /**
     * The path of the directory of the boilerplate files
     *
     * @type {string}
     */
    readonly contentDirectory: string;


    /**
     * Whether or not this {BaseBoilerplate} is the {BaseBoilerplate} of an {InteractionLayer}
     *
     * @returns {boolean}
     */
    isInteractionLayer(): boolean

    /**
     * Check if this is equal to boilerplate
     *
     * @param {IBoilerplate} boilerplate
     * @returns {boolean}
     */
    equals(boilerplate: IBoilerplate): boolean
}
