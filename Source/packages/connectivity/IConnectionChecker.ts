/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export interface IConnectionChecker {
    /**
     * Whether or not there is an active connection
     *
     * @returns {Promise<boolean>}
     */
    isConnected(): Promise<boolean>
}