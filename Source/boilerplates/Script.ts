/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Represents a Boilerplate's scripts
 */
export class Script
{
    /**
     * Instantiates an instance of {Script}
     * @param {string} cmd 
     * @param {string[]} args
     * @param {string} cwd
     */
    constructor (cmd: string, args: string[], cwd: string) {
        this.cmd = cmd;
        this.args = args;
        this.cwd = cwd;  
    }
    /**
     * Gets the command
     * @returns {string}
     * @readonly
     * @memberof Scripts
     */
    readonly cmd: string;
    /**
     * Gets the arguments
     * @returns {string[]}
     * @readonly
     * @memberof Scripts
     */
    readonly args: string[];
    /**
     * Gets the cwd the script shall be run from
     * @returns {string}
     * @readonly
     * @memberof Scripts
     */
    readonly cwd: string;

    toJson() {
        return {
            cmd: this.cmd,
            args: this.args,
            cwd: this.cwd
        };
    }
}