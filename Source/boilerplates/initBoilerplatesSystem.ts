/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { IBoilerplateDiscoverers } from './index';

/**
 * Initializes the boilerplates system in the common tooling
 * 
 * @param {IBoilerplateDiscoverers} boilerplateDiscoverers
 * @param {IBusyIndicator} busyIndicator
 */
export async function initBoilerplatesSystem(boilerplateDiscoverers: IBoilerplateDiscoverers, busyIndicator: IBusyIndicator) {
    busyIndicator = busyIndicator.createNew().start('Initializing boilerplates system');
    try {
        boilerplateDiscoverers.discover();
        busyIndicator.succeed('Boilerplates system initialized');
    } catch (error) {
        busyIndicator.fail(`An error occurred: ${error.message? error.message : error}`);
        throw error;
    }
}