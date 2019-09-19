/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import {IFileSystem} from '@dolittle/tooling.common.files';
import { IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { IBoilerplateDiscoverers } from './internal';

/**
 * Finds and gets the boilerplates installed on the local machine
 *
 * @param {IBoilerplateDiscoverers} boilerplateDiscoverers
 * @param {IFileSystem} filesystem
 * @param {IBusyIndicator} busyIndicator
 * @export
 * @returns A list of the boilerplate and package configurations for each boilerplate
 */
export async function getInstalledBoilerplates(boilerplateDiscoverers: IBoilerplateDiscoverers, filesystem: IFileSystem, busyIndicator: IBusyIndicator) {
    busyIndicator = busyIndicator.createNew().start('Getting installed boilerplates:\n');
    try {
        await boilerplateDiscoverers.discover();
        let boilerplatePackages = boilerplateDiscoverers.discovered;
    
        let numBoilerplates = boilerplatePackages.length;
        if (numBoilerplates > 0) busyIndicator.succeed(`Found ${numBoilerplates} installed boilerplates`);
        else busyIndicator.info(`Could not find any installed boilerplates`);
        
        return boilerplatePackages;
        
    } catch (error) {
        busyIndicator.fail(`An error occurred: ${error.message? error.message : error}`);
        throw error;
    }
}