import { OnStdCallback } from '@dolittle/tooling.common.utilities';
import { IBoilerplateDiscoverers } from '../internal';

/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

/**
 * Initializes the boilerplates system in the common tooling
 * 
 * @param {OnStdCallback} [onStdOut] Optional callback for dealing with the standard text output  
 * @param {OnStdCallback} [onStdErr] Optional callback for dealing with the text output when an error occurs  
 */
export async function initBoilerplatesSystem(boilerplateDiscoverers: IBoilerplateDiscoverers, onStdOut?: OnStdCallback, onStdErr?: OnStdCallback) {
    let ifStdOut = (data: string) => onStdOut? onStdOut(data) : {};
    let ifStdErr = (data: string) => onStdErr? onStdErr(data) : {};
    ifStdOut('Initializing boilerplates system');
    try {
        boilerplateDiscoverers.discover();
        ifStdOut('Boilerplates system initialized');
    } catch (error) {
        ifStdErr(`An error occurred: ${error.message? error.message : error}`);
        throw error;
    }
}