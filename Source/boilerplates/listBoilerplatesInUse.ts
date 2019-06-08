/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { IBoilerplates } from './index';

/**
 * Lists the boilerplates used by the tooling
 *
 * @param {IBoilerplate} _boilerplates 
 * @param {IBusyIndicator} busyIndicator
 * @export
 * 
 */
export async function listBoilerplatesInUse(_boilerplates: IBoilerplates, busyIndicator: IBusyIndicator) {
    busyIndicator = busyIndicator.createNew().start('Listing boilerplates in use:\n');
    try {
        let boilerplates = _boilerplates.boilerplates;
        let numBoilerplates = boilerplates.length;
        if (numBoilerplates > 0) busyIndicator.succeed(`There are ${numBoilerplates} in use`);
        else busyIndicator.info(`There are no boilerplates in use.`);

    } catch(error) {
        busyIndicator.fail(`An error occurred: ${error.message? error.message : error}`);
        throw error;
    }
}