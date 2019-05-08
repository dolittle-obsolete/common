/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Script } from './Script';
import lodash from 'lodash';
import spawn from 'cross-spawn';
import path from 'path';
import { ScriptFailedError } from './ScriptFailedError';

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
function scriptOnStderr(data) {
    if (data && data !== '') console.error(data);
}
function scriptOnStdout(data) {
}
function scriptOnError(error) {
    if (error) throw new ScriptFailedError(error);
}
function scriptOnUncaughtException(error) {
    if (error) throw new ScriptFailedError(error);
}

/**
 * @callback StdCallback
 * @param {string} data
 * @returns {void}
 */

 /**
 * @callback OnErrorCallback
 * @param {error} error
 * @returns {void}
 */

/**
 * Run scripts in sync
 * @export
 * @param {Script[] | string[]} scripts 
 * @param {string} cwd
 * @param {StdCallback} onStderr
 * @param {StdCallback} onStdout
 * @param {OnErrorCallback} onError
 */
export function runScriptsSync(scripts, cwd, onStderr, onStdout, onError) {
    onStderr = onStderr || scriptOnStderr;
    onStdout = onStdout || scriptOnStdout;
    onError = onError || scriptOnError;
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
        let child = spawn.sync(cmd, args, {cwd});
        if(child.stderr && child.stderr.toString() !== '') onStderr(child.stderr.toString());
        onStdout(child.stdout.toString());
        if (child.error) onError(child.error); 
    });
}
/**
 *
 * Run scripts in asynchronously
 * @export
 * @param {Script[] | string[]} scripts 
 * @param {string} cwd
 * @param {StdCallback} onStderr
 * @param {StdCallback} onStdout
 * @param {OnErrorCallback} onError
 * @param {OnErrorCallback} onUncaughtException
 */
export async function runScripts(scripts, cwd, onStderr, onStdout, onError, onUncaughtException) {
    onStderr = onStderr || scriptOnStderr;
    onStdout = onStdout || scriptOnStdout;
    onError = onError || scriptOnError;
    onUncaughtException = onUncaughtException || scriptOnUncaughtException;
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
        let child = spawn(cmd, args, {cwd});
        child.stderr.on('data', onStderr);
        child.stdout.on('data', onStdout);
        child.on('error', onError);
        child.on('uncaughtException', onUncaughtException);
    }
}