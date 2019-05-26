/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import path from 'path';
import spawn from 'cross-spawn';
import { Script, ScriptStdOut, ScriptOnError, ScriptFailed, IScriptRunner } from './index';

/**
 * Represents an implementation of {IScriptRunner} for running scripts
 */
export class ScriptRunner implements IScriptRunner {
    
    runScriptsSync(scripts: Script[] | string[], cwd: string, 
        onStderr: ScriptStdOut, onStdout: ScriptStdOut, 
        onError: ScriptOnError
        ) 
    {
        onStderr = onStderr || this.scriptOnStderr;
        onStdout = onStdout || this.scriptOnStdout;
        onError = onError || this.scriptOnError;
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
    
    async runScripts(scripts: Script[] | string[], cwd: string, 
        onStderr: ScriptStdOut, onStdout: ScriptStdOut, 
        onError: ScriptOnError,
        onUncaughtException: ScriptOnError) 
    {
    onStderr = onStderr || this.scriptOnStderr;
    onStdout = onStdout || this.scriptOnStdout;
    onError = onError || this.scriptOnError;
    onUncaughtException = onUncaughtException || this.scriptOnUncaughtException;

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