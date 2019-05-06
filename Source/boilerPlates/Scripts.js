/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Script } from './Script';
import lodash from 'lodash';
import spawn from 'cross-spawn';

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
     * @type {Script[] | string[]}
     * @readonly
     * @memberof Scripts
     */
    get creation() {return this.#_creation;}
    /**
     * Gets the build scripts
     * @type {Script[] | string[]}
     * @readonly
     * @memberof Scripts
     */
    get build() {return this.#_build;}
    /**
     * Gets the run scripts
     * @type {Script[] | string[]}
     * @readonly
     * @memberof Scripts
     */
    get run() {return this.#_run;}
    /**
     * Gets the rest of the scripts
     * @type {any}
     * @readonly
     * @memberof Scripts
     */
    get rest() {return this.#_rest;}
    
}
/**
 * Run scripts in sync
 * @export
 * @param {Script[] | string[]} scripts 
 * @param {string} cwd
 */
export function runScriptsSync(scripts, cwd) {
    scripts.forEach(script => {
        let cmd;
        let args;
        if (script.cmd) {
            cmd = script.cmd;
            args = script.args;
            cwd = script.cwd? path.join(cwd, script.cwd): cwd;
        } else {
            [cmd, ...args] = script.split(' ');
        }
        spawn.sync(cmd, args, {cwd, stdio: "inherit"});
    });
}
/**
 *
 * Run scripts in asynchronously
 * @export
 * @param {Script[] | string[]} scripts 
 * @param {string} cwd
 */
export async function runScripts(scripts, cwd) {
    for (let script of scripts) {
        let cmd;
        let args;
        if (script.cmd) {
            cmd = script.cmd;
            args = script.args;
            cwd = script.cwd? path.join(cwd, script.cwd): cwd;
        } else {
            [cmd, ...args] = script.split(' ');
        }
        await spawn(cmd, args, {cwd, stdio: "inherit"});
    }
}