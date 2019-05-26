/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as _fsExtra from 'fs-extra';
import { Folders } from './Folders';
const rc = require('rc');
const winston = require('winston');

export * from './Guid';
export * from './Folders';
export * from './helpers';
export * from './actions';

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
export type FileSystem = typeof _fsExtra;

export let dolittleConfig = rc('dolittle', dolittleConfigDefault);

/**
 * Resets the dolittleConfig object to something else
 *
 * @export
 * @param {*} [config] If config is undefined the config will be the joined result of dolittlerc configurations
 */
export function setNewDolittleConfig(config?: any) { 
    if (!config)
        config = rc('dolittle', dolittleConfigDefault); 
    dolittleConfig = config;
}

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
