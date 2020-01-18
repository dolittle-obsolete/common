/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ILoggers } from '@dolittle/tooling.common.logging';
import path from 'path';
import spawn from 'cross-spawn';
import { Script, ScriptStdOut, ScriptOnError, ScriptFailed, IScriptRunner } from '../internal';

/**
 * Represents an implementation of {IScriptRunner} for running scripts
 */
export class ScriptRunner implements IScriptRunner {

    /**
     * Instantiates an instance of {ScriptRunner}.
     * @param {ILoggers} _loggers
     */
    constructor(private _loggers: ILoggers) {}

    runSync(scripts: Script[] | string[], cwd: string,
        onStderr: ScriptStdOut, onStdout: ScriptStdOut,
        onError: ScriptOnError)
    {
        this._loggers.info('Running scripts');

        onStderr = onStderr || this.scriptOnStderr;
        onStdout = onStdout || this.scriptOnStdout;
        onError = onError || this.scriptOnError;
        scripts.forEach((script: Script | string) => {
            let cmd;
            let args;
            let _cwd = cwd;
            if (script instanceof Script) {
                cmd = script.command;
                args = script.arguments;
                _cwd = script.currentWorkingDirectory ? path.join(cwd, script.currentWorkingDirectory) : cwd;
            } else {
                [cmd, ...args] = script.split(' ');
            }
            const child = spawn.sync(cmd, args, {cwd: _cwd});
            if (child.stderr && child.stderr.toString() !== '') onStderr(child.stderr.toString());
            if (child.stdout && child.stdout.toString() !== '') onStdout(child.stdout.toString());
            if (child.error) onError(child.error);
        });
        this._loggers.info('Finished running scripts');

    }

    async run(scripts: Script[] | string[], cwd: string,
        onStderr: ScriptStdOut, onStdout: ScriptStdOut,
        onError: ScriptOnError,
        onUncaughtException: ScriptOnError)
    {
    onStderr = onStderr || this.scriptOnStderr;
    onStdout = onStdout || this.scriptOnStdout;
    onError = onError || this.scriptOnError;
    onUncaughtException = onUncaughtException || this.scriptOnUncaughtException;

    for (const script of scripts) {
        let cmd;
        let args;
        let _cwd = cwd;
        if (script instanceof Script) {
            cmd = script.command;
            args = script.arguments;
            _cwd = script.currentWorkingDirectory ? path.join(cwd, script.currentWorkingDirectory) : cwd;
        } else {
            [cmd, ...args] = script.split(' ');
        }
        const child = spawn(cmd, args, {cwd: _cwd});
        if (child.stderr) child.stderr.on('data', onStderr);
        if (child.stdout) child.stdout.on('data', onStdout);
        child.on('error', onError);
        child.on('uncaughtException', onUncaughtException);
    }
    }

    private scriptOnStderr(data: string) {
        if (data && data !== '') console.error(data);
    }

    private scriptOnStdout(data?: string) {
    }

    private scriptOnError(error: Error | string) {
        if (error) throw new ScriptFailed(error);
    }

    private scriptOnUncaughtException(error: Error) {
        if (error) throw new ScriptFailed(error);
    }
}
