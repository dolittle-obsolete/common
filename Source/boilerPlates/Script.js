/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import lodash from 'lodash';

export function scriptsFromJson(scripts) {
    return new Scripts(scripts && scripts.creation || undefined, scripts && scripts.build || undefined, scripts && scripts.run || undefined, scripts? lodash.omit(scripts, ['creation', 'build', 'run']) : undefined);
}
/**
  * Represents a Boilerplate's scripts
  */
export class Script
{
    #_cmd;
    #_args;
    #_cwd;

    /**
      * Instantiates an instance of {Script}
      * @param {string} cmd 
      * @param {string[]} args
      * @param {string} cwd
      */
    constructor (cmd, args, cwd) {
        this.#_cmd = cmd;
        this.#_args = args;
        this.#_cwd = cwd;  
    }
    /**
     * Gets the command
     * @returns {string}
     * @readonly
     * @memberof Scripts
     */
    get cmd() {return this.#_cmd;}
    /**
     * Gets the arguments
     * @returns {string[]}
     * @readonly
     * @memberof Scripts
     */
    get args() {return this.#_args;}
    /**
     * Gets the cwd the script shall be run from
     * @returns {string[]}
     * @readonly
     * @memberof Scripts
     */
    get cwd() {return this.#_cwd;}

    toJson() {
        
    return {
            cmd: this.cmd,
            args: this.args,
            cwd: this.cwd
        };
    }
}