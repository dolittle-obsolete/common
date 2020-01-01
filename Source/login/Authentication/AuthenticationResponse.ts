/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { TokenSet } from 'openid-client';
import { UserInfoResponse } from '../internal';

export type AuthenticationResponse = {
    /**
     * The tokens from the grant
     *
     * @type {TokenSet}
     */
    tokens: TokenSet,

    /**
     * The user information retrieved that's allowed based on the scope of the {IAuthenticationHandler}
     *
     * @type {UserInfoResponse}
     */
    userInfo: UserInfoResponse
};
