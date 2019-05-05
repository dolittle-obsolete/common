/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import lodash from 'lodash';
import { Script } from './Script';

export function scriptsFromJson(scripts) { 
    return new Scripts(scripts && scripts.creation || undefined, scripts && scripts.build || undefined, scripts && scripts.run || undefined, scripts? lodash.omit(scripts, ['creation', 'build', 'run']) : undefined);
}
/**
  * Represents a Boilerplate's scripts
  */
export class Scripts
{
    #_creation;
    #_build;
    #_run;
    #_rest;

    /**
      * Instantiates an instance of {Scripts}
      * @param {Script[] | string[]} creation 
      * @param {Script[] | string[]} build
      * @param {Script[] | string[]} run
      * @param {any} rest
      */
    constructor (creation, build, run, rest) {
        this.#_creation = creation? 
                            creation.cmd? 
                                creation.map(_ => new Script(_.cmd, _.args, _.cwd)) : creation
                            : undefined;
        this.#_build = build? 
                        build.cmd? 
                            build.map(_ => new Script(_.cmd, _.args, _.cwd)) : build
                        : undefined;
        this.#_run = run? 
                        run.cmd? 
                            run.map(_ => new Script(_.cmd, _.args, _.cwd)) : run
                        : undefined;
        this.#_rest = rest;  
    }
    /**
     * Gets the creation scripts
     * @returns {Script | string[]}
     * @readonly
     * @memberof Scripts
     */
    get creation() {return this.#_creation;}
    /**
     * Gets the build scripts
     * @returns {Script | string[]}
     * @readonly
     * @memberof Scripts
     */
    get build() {return this.#_build;}
    /**
     * Gets the run scripts
     * @returns {Script | string[]}
     * @readonly
     * @memberof Scripts
     */
    get run() {return this.#_run;}
    /**
     * Gets the rest of the scripts
     * @returns {any}
     * @readonly
     * @memberof Scripts
     */
    get rest() {return this.#_rest;}
    
    toJson() {
        let obj = {};
        obj.creation = this.creation;
        obj.build = this.build;
        obj.run = this.run;
        Object.keys(this.rest).forEach(_ => {
            obj[_] = this.rest[_];
        });
        return obj;
    }
}