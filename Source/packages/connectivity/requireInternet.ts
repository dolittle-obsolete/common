/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import isOnline from 'is-online';
import { OnStdCallback, NotConnectedToInternet } from '../index';

/**
 * Checks whether or not the user is connected to the internet. compatability
 * An error will be thrown when there is no connection
 * 
 * @param {OnStdCallback} [onStdOut] Optional callback for handling outgoing text 
 * @param {OnStdCallback} [onNoInternet] Optional callback for handling the message going out when no internet connection could be established 
 * @throws An Error when no connection can be established 
 * @export
 */
export async function requireInternet(onStdOut?: OnStdCallback, onNoInternet?: OnStdCallback ) {
    if (onStdOut) onStdOut('Checking for internet connection');
    let hasInternet = await isOnline();
    if (!hasInternet) {
        if (onNoInternet) onNoInternet('Not connected to the internet');
        throw new NotConnectedToInternet('');
    }
    
}