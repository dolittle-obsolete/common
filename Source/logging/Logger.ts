/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import winston from 'winston';
import {ICanLogMessages} from './index'

/**
 * Represents an abstract implementation of {ICanLogMessages}
 *
 * @export
 * @class Logger
 * @implements {ICanLogMessages}
 */
export abstract class Logger implements ICanLogMessages {

    /**
     * Instantiates an instance of {Logger}.
     * @param {winston.Logger} _logger
     */
    constructor(private _logger: winston.Logger) {}

    abstract readonly logFilePaths: string[];

    set exitOnError(val: boolean) {
        this._logger.exitOnError = val;
    }

    get exitOnError() {
        return this._logger.exitOnError as boolean;
    };
    
    info(message: string) {
        this._logger.info(message);
    }

    warn(message: string) {
        this._logger.warn(message);
    }

    error(message: string) {
        this._logger.error(message);
    }

    turnOn() {
        this._logger.transports.forEach(_ => _.silent = false);
    }

    turnOff() {
        this._logger.transports.forEach(_ => _.silent = true);
    }
}