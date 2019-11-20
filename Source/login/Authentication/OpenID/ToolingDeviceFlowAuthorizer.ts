/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages } from '@dolittle/tooling.common.utilities';
import { Client, Issuer } from 'openid-client';
import { UserInfoResponse, OpenIDDeviceFlowAuthorizer } from '../../internal';

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
    constructor() {
        super('http://localhost:5000/.well-known/openid-configuration', 'device', 'hello', 'openid profile tenant');
    }

}
