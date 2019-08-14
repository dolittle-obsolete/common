/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import isOnline from 'is-online';
import {IConnectionChecker} from '../index';
/**
 * Represents an implementation of {IConnectionChecker}
 *
 * @export
 * @class ConnectionChecker
 * @implements {IConnectionChecker}
 */
export class ConnectionChecker implements IConnectionChecker {

    isConnected() {
        return isOnline();
    }
}
