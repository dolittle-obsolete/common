/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as _fsExtra from 'fs-extra';
import { Folders } from './Folders';
import rc from 'rc';
import winston from 'winston';
import spawn from 'cross-spawn';

let npmRootSpawn = spawn.sync('npm', ['root', '-g']);
if (npmRootSpawn.error) throw npmRootSpawn.error;
export const nodeModulesPath = npmRootSpawn.stdout.toString().replace(/\n$/, '');

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
/**
 * Turns off the logging
 *
 * @export
 */
export function turnOffLogging() {
    logger.transports.forEach(t => t.silent = true);
}
