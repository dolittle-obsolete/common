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
     * @param {string} command
     * @param {string[]} arguments
     * @param {string} currentWorkingDirectory
     */
    constructor (command: string, _arguments: string[], currentWorkingDirectory: string) {
        this.command = command;
        this.arguments = _arguments;
        this.currentWorkingDirectory = currentWorkingDirectory;
    }

    /**
     * Gets the command
     * @returns {string}
     * @readonly
     */
    readonly command: string;

    /**
     * Gets the arguments
     * @returns {string[]}
     * @readonly
     */
    readonly arguments: string[];

    /**
     * Gets the current working directory the script shall be run from
     * @returns {string}
     * @readonly
     */
    readonly currentWorkingDirectory: string;

    toJson() {
        return {
            cmd: this.command,
            args: this.arguments,
            cwd: this.currentWorkingDirectory
        };
    }
}
