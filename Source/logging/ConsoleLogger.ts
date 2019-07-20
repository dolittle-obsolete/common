/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import winston from 'winston';
import { Format } from 'logform';
import { Logger } from './index'

/**
 * Represents an implementation of {ICanLogMessages} for logging messages to console
 *
 * @export
 * @class ConsoleLogger
 * @extends {Logger}
 */
export class ConsoleLogger extends Logger {
    private static _defaultFormat = winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    );
    private static _defaultLogLevel = 'info';
    private static _transports = [
        new winston.transports.Console()
    ];

    /**
     * Instantiates an instance of {ConsoleLogger}.
     * @param {boolean} exitOnError
     * @param {string} [level]
     * @param {Format} [format]
     */
    constructor(exitOnError: boolean, level?: string, format?: Format ) {
        super(winston.createLogger({
            exitOnError: exitOnError,
            level: level || ConsoleLogger._defaultLogLevel,
            format: format || ConsoleLogger._defaultFormat,
            transports: ConsoleLogger._transports
        }));
    }
    readonly logFilePaths = [];

}