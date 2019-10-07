/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The context of a command
 */
export type CommandContext = {
    /**
     * The current working directory from where the command is executed
     *
     * @type {string}
     */
    currentWorkingDirectory: string;
    /**
     * The core language
     *
     * @type {string}
     */
    coreLanguage: string;
    /**
     * The namespace
     *
     * @type {string}
     */
    namespace?: string;

}
