/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import {FileSystem} from '@dolittle/tooling.common.files';
import { IBusyIndicator } from '@dolittle/tooling.common.utilities';
import path from 'path';
import { IBoilerplateDiscoverers } from './index';

/**
 * Finds and gets the boilerplates installed on the local machine
 *
 * @param {IBoilerplateDiscoverers} boilerplateDiscoverers
 * @param {FileSystem} filesystem
 * @param {IBusyIndicator} busyIndicator
 * @export
 * @returns A list of the boilerplate and package configurations for each boilerplate
 */
export async function listInstalledBoilerplates(boilerplateDiscoverers: IBoilerplateDiscoverers, filesystem: FileSystem, busyIndicator: IBusyIndicator) {
    busyIndicator = busyIndicator.createNew().start('Getting installed boilerplates:\n');
    try {
        let paths = boilerplateDiscoverers.boilerplatePaths;
    
        let boilerplatesAndPackages = paths.map(boilerplatePaths => {
            let boilerplate = filesystem.readJSONSync(path.join(boilerplatePaths, 'boilerplate.json'));
            let packageJson = filesystem.readJsonSync(path.join(boilerplatePaths, 'package.json'));
            return {boilerplate, packageJson};
        });
        let numBoilerplates = boilerplatesAndPackages.length;
        if (numBoilerplates > 0) busyIndicator.succeed(`Found ${numBoilerplates} installed boilerplates`);
        else busyIndicator.info(`Could not find any installed boilerplates`);
        
        return boilerplatesAndPackages;
        
    } catch (error) {
        busyIndicator.fail(`An error occurred: ${error.message? error.message : error}`);
        throw error;
    }
}