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
        super('https://dolittle.studio/.well-known/openid-configuration', '588d4bcf-01bb-4173-a46b-4e054b59ba1e', undefined, 'openid', connectionChecker);
    }

}
