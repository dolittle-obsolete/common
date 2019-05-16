/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import spawn from 'cross-spawn';
import lodash from 'lodash';
import path from 'path';
import { Script, ScriptFailedError } from './internal';


/**
 * Represents a Boilerplate's scripts
 */
export class Scripts
{
    static fromJson(scripts: any): Scripts {
        let creationScriptObjects = scripts && scripts.creation || [];
        let buildScriptObjects = scripts && scripts.build || [];
        let runScriptObject = scripts && scripts.run || [];

        return new Scripts(
            creationScriptObjects.map((_: any) => _.cmd? new Script(_.cmd, _.args, _.cwd) : _),
            buildScriptObjects.map((_: any) => _.cmd? new Script(_.cmd, _.args, _.cwd) : _),
            runScriptObject.map((_: any) => _.cmd? new Script(_.cmd, _.args, _.cwd) : _), 
            scripts? lodash.omit(scripts, ['creation', 'build', 'run']) : {});
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
     * @memberof Scripts
     */
    readonly creation: Script[] | string[];
    /**
     * Gets the build scripts
     * @type {Script[] | string[]}
     * @readonly
     * @memberof Scripts
     */
    readonly build: Script[] | string[]
    /**
     * Gets the run scripts
     * @type {Script[] | string[]}
     * @readonly
     * @memberof Scripts
     */
    readonly run: Script[] | string[];
    /**
     * Gets the rest of the scripts
     * @type {any}
     * @readonly
     * @memberof Scripts
     */
    readonly rest: any;
    
}
function scriptOnStderr(data: string) {
    if (data && data !== '') console.error(data);
}
function scriptOnStdout(data?: string) {
}
function scriptOnError(error: Error | string) {
    if (error) throw new ScriptFailedError(error);
}
function scriptOnUncaughtException(error: Error) {
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
export function runScriptsSync(scripts: Script[] | string[], cwd: string, 
        onStderr: (data: string) => void, onStdout: (data: string) => void, 
        onError: (error: Error | string) => void
        ) {
    onStderr = onStderr || scriptOnStderr;
    onStdout = onStdout || scriptOnStdout;
    onError = onError || scriptOnError;
    scripts.forEach((script: any) => {
        let cmd;
        let args;
        let _cwd = cwd;
        if (script.cmd) {
            cmd = script.cmd;
            args = script.args;
            _cwd = script.cwd? path.join(cwd, script.cwd): cwd;
        } else {
            [cmd, ...args] = script.split(' ');
        }
        let child = spawn.sync(cmd, args, {cwd: _cwd});
        if (child.stderr && child.stderr.toString() !== '') onStderr(child.stderr.toString());
        if (child.stdout && child.stdout.toString() !== '') onStdout(child.stdout.toString());
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
export async function runScripts(scripts: Script[] | string[], cwd: string, 
        onStderr: (data: string) => void, onStdout: (data: string) => void, 
        onError: (error: Error | string) => void,
        onUncaughtException: (error: Error | string) => void) {
    onStderr = onStderr || scriptOnStderr;
    onStdout = onStdout || scriptOnStdout;
    onError = onError || scriptOnError;
    onUncaughtException = onUncaughtException || scriptOnUncaughtException;

    for (let script of scripts) {
        let cmd;
        let args;
        let _cwd = cwd;
        if (script instanceof Script) {
            cmd = script.cmd;
            args = script.args;
            _cwd = script.cwd? path.join(cwd, script.cwd): cwd;
        } else {
            [cmd, ...args] = script.split(' ');
        }
        let child = spawn(cmd, args, {cwd: _cwd});
        if (child.stderr) child.stderr.on('data', onStderr);
        if (child.stdout) child.stdout.on('data', onStdout);
        child.on('error', onError);
        child.on('uncaughtException', onUncaughtException);
    }
}