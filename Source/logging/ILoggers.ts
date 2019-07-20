/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Format } from 'logform';
import {ICanLogMessages} from './index';


/**
 * Defines a system that knows about {ICanLogMessages}
 *
 * @export
 * @interface ILoggers
 */
export interface ILoggers {
    
    /**
     * Gets the instances of {ICanLogMessages}
     *
     * @type {ICanLogMessages[]}
     */
    readonly loggers: ICanLogMessages[]

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
     * Logs an info message through all loggers
     *
     * @param {string} message
     */
    info(message: string): void
    
    /**
     * Logs a warning message through all loggers
     *
     * @param {string} message
     */
    warn(message: string): void
    
    /**
     * Logs an error message through all loggers
     *
     * @param {string} message
     */
    error(message: string): void

    /**
     * Creates and replaces the console logger if it exists
     *
     * @param {string} [level]
     * @param {Format} [format]
     */
    createNewConsoleLogger(level?: string, format?: Format): void

    /**
     * Removes the console logger
     *
     */
    removeConsoleLogger(): void

    /**
     * Create a new instance of {FileLogger}
     *
     * @param {string} filePath
     * @param {boolean} [separateErrorFile]
     * @param {string} [level]
     * @param {Format} [format]
     */
    createNewFileLogger(filePath: string, separateErrorFile?: boolean, level?: string, format?: Format): void

    /**
     * Clears all loggers
     *
     */
    clear(): void

    /**
     * Turns off all loggers
     *
     */
    turnOffLogging(): void

    /**
     * Turns on all loggers
     *
     */
    turnOnLogging(): void
}