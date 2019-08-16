/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IBusyIndicator } from "@dolittle/tooling.common.utilities";
import { NotConnectedToInternet, IConnectionChecker } from '../index';

/**
 * Checks whether or not the user is connected to the internet.
 * An error will be thrown when there is no connection
 * 
 * @param {IBusyIndicator} busyIndicator
 * @throws An Error when no connection can be established 
 * @export
 */
export async function requireInternet(connectionChecker: IConnectionChecker, busyIndicator: IBusyIndicator ) {
    busyIndicator = busyIndicator.createNew().start('Checking for internet connection')
    let isConnected = await connectionChecker.isConnected();
    if (!isConnected) {
        busyIndicator.warn('Not connected to the internet');
        throw new NotConnectedToInternet();
    }
    busyIndicator.stop();
}
