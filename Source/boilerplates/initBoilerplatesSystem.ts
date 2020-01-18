/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { IBoilerplateDiscoverers, IBoilerplatesLoader } from './internal';

/**
 * Initializes the boilerplates system in the common tooling
 *
 * @param {IBoilerplateDiscoverers} boilerplateDiscoverers
 * @param {IBusyIndicator} busyIndicator
 */
export async function initBoilerplatesSystem(boilerplateDiscoverers: IBoilerplateDiscoverers, boilerplatesLoader: IBoilerplatesLoader, busyIndicator: IBusyIndicator) {
    busyIndicator = busyIndicator.createNew().start('Initializing boilerplates system');
    try {
        await boilerplateDiscoverers.discover();
        if (boilerplatesLoader.needsReload) await boilerplatesLoader.load();
        busyIndicator.succeed('Boilerplates system initialized');
    } catch (error) {
        busyIndicator.fail(`An error occurred: ${error.message ? error.message : error}`);
        throw error;
    }
}
