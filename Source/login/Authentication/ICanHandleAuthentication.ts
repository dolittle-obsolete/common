/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages } from "@dolittle/tooling.common.utilities";
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
     * @returns {Promise<AuthenticationResponse>}
     */
    authenticate(outputter: ICanOutputMessages): Promise<AuthenticationResponse>
    
}
