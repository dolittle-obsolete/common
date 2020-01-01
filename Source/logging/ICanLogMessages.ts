/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Defines a system that can log messages
 *
 * @export
 * @interface ICanLogMessages
 */
export interface ICanLogMessages {

    /**
     * Paths to log files
     *
     * @type {string[]}
     */
    readonly logFilePaths: string[]

    /**
     * Get or set whether to exit on error
     *
     * @type {boolean}
     */
    exitOnError: boolean

    /**
     * Logs an info message
     *
     * @param {string} message
     */
    info(message: string): void

    /**
     * Logs a warning message
     *
     * @param {string} message
     */
    warn(message: string): void

    /**
     * Logs an error message
     *
     * @param {string} message
     */
    error(message: string): void

    /**
     * Turn on logger
     *
     */
    turnOn(): void

    /**
     * Turn off logger
     *
     */
    turnOff(): void
}
