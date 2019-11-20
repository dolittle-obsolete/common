/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

/**
 * Represents the user info 
 */
export type UserInfo = {
    /**
     * The subject_id
     *
     * @type {string}
     */
    subjectID: string,
    /**
     * The full name
     *
     * @type {string}
     */
    name: string,
    /**
     * The tenant id which this user is a part of
     *
     * @type {string}
     */
    tenantID: string,
    /**
     * The display name of the tenant
     *
     * @type {string}
     */
    tenantName: string
};
