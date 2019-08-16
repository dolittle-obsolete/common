/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import path from 'path';
import winston from 'winston';
import { Format } from 'logform';
import { Logger } from './index'

/**
 * Represents an implementation of {ICanLogMessages} for logging messages to files
 *
 * @export
 * @class ConsoleLogger
 * @extends {Logger}
 */
export class FileLogger extends Logger {
    private static _defaultFormat = winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
    );
    private static _defaultLogLevel = 'info';
    

    /**
     * Instantiates an instance of {ConsoleLogger}.
     * @param {boolean} exitOnError
     * @param {string} [level]
     * @param {Format} [format]
     */
    constructor(exitOnError: boolean, filePath: string, separateErrorFile?: boolean, level?: string, format?: Format ) {
        super(winston.createLogger({
            exitOnError: exitOnError,
            level: level || FileLogger._defaultLogLevel,
            format: format || FileLogger._defaultFormat,
            transports: separateErrorFile? [
                new winston.transports.File({filename: filePath}),
                new winston.transports.File(
                    {
                        level: 'error', 
                        filename: path.parse(filePath).dir + path.parse(filePath).name + '_error' + path.parse(filePath).ext
                    }
                )
            ]
            : [
                new winston.transports.File({filename: filePath})
            ]
        }));
        this.logFilePaths = separateErrorFile? [filePath, path.parse(filePath).dir + path.parse(filePath).name + '_error' + path.parse(filePath).ext]
                            : [filePath];
    }
    readonly logFilePaths: string[];

}
