/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { UserinfoResponse } from "openid-client";

/**
 * Defines the response from a user info request
 *
 * @export
 * @interface UserInfoResponse
 * @extends {UserinfoResponse}
 */
export interface UserInfoResponse extends UserinfoResponse {
    /**
     * The Tenant ID the user is associated with
     *
     * @type {string}
     */
    readonly tid: string

    /**
     * The name of the Tenant the user is associated with
     *
     * @type {string}
     */
    readonly tenant_name: string

    /**
     * The Full Name of the user
     *
     * @type {string}
     */
    readonly name: string

    /**
     * The Subject ID of the user
     *
     * @type {string}
     */
    readonly sub: string
};
