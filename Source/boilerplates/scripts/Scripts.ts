/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import lodash from 'lodash';
import { Script } from '../internal';

/**
 * Represents a Boilerplate's scripts
 */
export class Scripts
{
    /**
     * Creates a new instance of {Scripts} from a json object
     *
     * @static
     * @param {*} scripts
     * @returns {Scripts}
     */
    static fromJson(scripts: any): Scripts {
        const creationScriptObjects = scripts && scripts.creation || [];
        const buildScriptObjects = scripts && scripts.build || [];
        const runScriptObject = scripts && scripts.run || [];

        return new Scripts(
            creationScriptObjects.map((_: any) => _.command ? new Script(_.command, _.arguments, _.currentWorkingDirectory) : _),
            buildScriptObjects.map((_: any) => _.command ? new Script(_.command, _.arguments, _.currentWorkingDirectory) : _),
            runScriptObject.map((_: any) => _.command ? new Script(_.command, _.arguments, _.currentWorkingDirectory) : _),
            scripts ? lodash.omit(scripts, ['creation', 'build', 'run']) : {});
    }

     /**
      * Instantiates an instance of {Scripts}
      * @param {{cmd: string, args: string[], cwd: string}[] | string[]} creation
      * @param {any[] | string[]} build
      * @param {any[] | string[]} run
      * @param {any} rest
      */
    constructor (creation: Script[] | string[], build: any[] | string[], run: any[] | string[], rest: any) {
        this.creation = creation;
        this.build = build;
        this.run = run;
        this.rest = rest;
    }

    /**
     * Gets the creation scripts
     * @type {Script[] | string[]}
     * @readonly
     */
    readonly creation: Script[] | string[];

    /**
     * Gets the build scripts
     * @type {Script[] | string[]}
     * @readonly
     */
    readonly build: Script[] | string[];

    /**
     * Gets the run scripts
     * @type {Script[] | string[]}
     * @readonly
     */
    readonly run: Script[] | string[];

    /**
     * Gets the rest of the scripts
     * @type {any}
     * @readonly
     */
    readonly rest: any;
}
