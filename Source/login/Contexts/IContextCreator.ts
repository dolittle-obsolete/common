/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Context } from '../index';

/**
 * Defines a system that can create a {Context} configuration
 *
 * @export
 * @interface IContextCreator
 */
export interface IContextCreator {
    
    /**
     * Creates a {Context}
     *
     * @param {string} id_token
     * @param {number} expires_at
     * @param {string} sub Subject ID
     * @param {string} name Name of the subject
     * @param {string} tid Tenant ID
     * @param {string} tenant_name 
     * @param {string} [refresh_token]
     * @returns {Context}
     */
    create(id_token: string, expires_at: number, sub: string, name: string, tid: string, tenant_name: string, refresh_token?: string): Context
}