/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Script } from './index';


/**
 * @callback StdCallback
 * @param {string} data
 * @returns {void}
 */

export type ScriptStdOut = (data: string) => void 

export type ScriptOnError = (error: Error | string) => void

/**
 * Defines a system for running scripts
 */
export interface IScriptRunner
{
    /**
     * Run scripts in sync
     * @export
     * @param {Script[] | string[]} scripts 
     * @param {string} cwd
     * @param {StdCallback} onStderr
     * @param {StdCallback} onStdout
     * @param {OnErrorCallback} onError
     */
    runScriptsSync(scripts: Script[] | string[], cwd: string, 
        onStderr: ScriptStdOut, onStdout: ScriptStdOut, 
        onError: ScriptOnError
        ): void

    /**
     *
     * Run scripts asynchronously
     * @export
     * @param {Script[] | string[]} scripts 
     * @param {string} cwd
     * @param {StdCallback} onStderr
     * @param {StdCallback} onStdout
     * @param {OnErrorCallback} onError
     * @param {OnErrorCallback} onUncaughtException
     */
    runScripts(scripts: Script[] | string[], cwd: string, 
        onStderr: ScriptStdOut, onStdout: ScriptStdOut, 
        onError: ScriptOnError,
        onUncaughtException: ScriptOnError): Promise<void>
}