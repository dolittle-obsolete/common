/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import rc from 'rc';
import { GlobalCacheConfig, UserCacheConfig } from './internal';
import { nodeModulesPath, userHomePath } from '@dolittle/tooling.common.packages';

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

GlobalCacheConfig.nodeModulesFolder = nodeModulesPath;
UserCacheConfig.userHomeFolder = userHomePath;
