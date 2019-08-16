/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { requireInternet, IConnectionChecker } from '@dolittle/tooling.common.packages';
import { IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { OnlineDolittleBoilerplatesFinder } from '../index';

/**
 * Fetches the online dolittle boilerplates
 *
 * @param {OnlineDolittleBoilerplatesFinder} onlineBoilerplatesDiscoverer
 * @param {IBusyIndicator} busyIndicator
 * @returns
 */
export async function fetchDolittleBoilerplates(onlineBoilerplatesDiscoverer: OnlineDolittleBoilerplatesFinder, 
    connectionChecker: IConnectionChecker,busyIndicator: IBusyIndicator ) {
    
    await requireInternet(connectionChecker, busyIndicator);
    busyIndicator = busyIndicator.createNew().start('Getting dolittle boilerplates (this might take a while, depending on your internet connection): ');
    let boilerplates = await onlineBoilerplatesDiscoverer.findLatest()
        .then(boilerplates => {
            busyIndicator.succeed(`Found ${boilerplates.length} dolittle boilerplates`);
            return boilerplates;
        }).catch(error => {
            busyIndicator.fail(`An error occurred ${error.message? error.message : error}`);
            throw error;
        });
    return boilerplates;
}