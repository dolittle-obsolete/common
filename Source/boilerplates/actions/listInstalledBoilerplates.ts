/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { OnStdCallback } from '@dolittle/tooling.common.packages';
import {FileSystem} from '@dolittle/tooling.common.files';
import path from 'path';
import { IBoilerplateDiscoverers } from '../index';

/**
 * Finds and gets the boilerplates installed on the local machine
 *
 * @param {IBoilerplateDiscoverers} boilerplateDiscoverers
 * @param {FileSystem} filesystem
 * @param {OnStdCallback} [onStdOut] Optional callback for dealing with the standard text output  
 * @param {OnStdCallback} [onNoBoilerplates] Optional callback for dealing the text output when there are no boilerplates
 * @param {OnStdCallback} [onStdErr] Optional callback for dealing with the text output when an error occurs  
 * @export
 * @returns A list of the boilerplate and package configurations for each boilerplate
 */
export async function listInstalledBoilerplates(boilerplateDiscoverers: IBoilerplateDiscoverers, filesystem: FileSystem, onStdOut?: OnStdCallback, onNoBoilerplates?: OnStdCallback, onStdErr?: OnStdCallback) {
    let ifStdOut = (data: string) => onStdOut? onStdOut(data) : {};
    let ifNoBoilerplates = (data: string) => onNoBoilerplates? onNoBoilerplates(data) : {};
    let ifStdErr = (data: string) => onStdErr? onStdErr(data) : {};
    ifStdOut('Getting installed boilerplates:\n');
    try {
        let paths = boilerplateDiscoverers.boilerplatePaths;
    
        let boilerplatesAndPackages = paths.map(boilerplatePaths => {
            let boilerplate = filesystem.readJSONSync(path.join(boilerplatePaths, 'boilerplate.json'));
            let packageJson = filesystem.readJsonSync(path.join(boilerplatePaths, 'package.json'));
            return {boilerplate, packageJson};
        });
        let numBoilerplates = boilerplatesAndPackages.length;
        if (numBoilerplates > 0) ifStdOut(`Found ${numBoilerplates} installed boilerplates`);
        else ifNoBoilerplates(`Could not find any installed boilerplates.

Use 'dolittle boilerplates online' to discover what's available on npm.
Or use 'dolittle boilerplates dolittle' to discover boilerplates that the Dolittle team has made available on npm`);
        
        return boilerplatesAndPackages;
        
    } catch (error) {
        ifStdErr(`An error occurred: ${error.message? error.message : error}`);
        throw error;
    }
}