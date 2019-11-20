/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages, IBusyIndicator } from "@dolittle/tooling.common.utilities";
import { AuthenticationResponse } from '../internal';

/**
 * Defines a system that can handle authentication
 *
 * @export
 * @interface ICanHandleAuthentication
 */
export interface ICanHandleAuthentication {
    
    /**
     * Authenticates the user and returns a response consisting of tokens and information on the user
     *
     * @param {ICanOutputMessages} outputter
     * @param {IBusyIndicator} busyIndicator
     * @returns {Promise<AuthenticationResponse>}
     */
    authenticate(outputter: ICanOutputMessages, busyIndicator: IBusyIndicator): Promise<AuthenticationResponse>

}
