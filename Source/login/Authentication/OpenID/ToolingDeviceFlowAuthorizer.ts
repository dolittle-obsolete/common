/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IConnectionChecker } from '@dolittle/tooling.common.packages';
import { OpenIDDeviceFlowAuthorizer } from '../../internal';

/**
 * Represents an implementation of {ICanRetrieveTokens} which can retrieve tokens through OpenID Device Authorization Grant using the Tooling client
 *
 * @export
 * @class OpenIDDeviceFlowAuthorizer
 * @extends {ICanRetrieveTokens}
 */
export class ToolingDeviceFlowAuthorizer extends OpenIDDeviceFlowAuthorizer {
    /**
     * Instantiates an instance of {ToolingDeviceFlowAuthorizer}.
     */
    constructor(connectionChecker: IConnectionChecker) {
        super('http://localhost:5000/.well-known/openid-configuration', 'device', 'hello', 'openid profile tenant', connectionChecker);
    }

}
