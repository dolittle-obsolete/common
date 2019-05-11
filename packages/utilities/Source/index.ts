/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import rc from 'rc';
import * as _fsExtra from 'fs-extra';
import { Folders } from './Folders';
import * as _helpers from './helpers';
import winston from 'winston';

export * from './Guid';
export * from './Folders';

/**
 * Generates and returns the .dolittlerc configuration
 *
 * @returns
 */
export function getDolittleConfig() { return rc('dolittle', dolittleConfigDefault); } 

export const helpers = _helpers;

export const dolittleConfigDefault = {
    any: {
        concepts: 'Concepts',
        domain: 'Domain',
        events: 'Events',
        read: 'Read'
    },
    csharp: {
        concepts: 'Concepts',
        domain: 'Domain',
        events: 'Events',
        read: 'Read'
    }
};
export const fileSystem = _fsExtra;
export const dolittleConfig = rc('dolittle', dolittleConfigDefault);

export const folders = new Folders(fileSystem);
export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console()
    ]
});
