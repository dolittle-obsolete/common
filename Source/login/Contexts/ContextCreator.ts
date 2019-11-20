/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Context, IContextCreator } from '../index';

/**
 * Represents an implementation of {IContextsCreator}
 *
 * @export
 * @class ContextCreator
 * @implements {IContextsCreator}
 */
export class ContextCreator implements IContextCreator {
    
    create(id_token: string, expires_at: number, sub: string, name: string, tid: string, tenant_name: string, refresh_token?: string) {
        if (!id_token) throw new Error('Missing id_token');
        if (!sub) throw new Error('Missing sub');
        if (!name) throw new Error('Missing name');
        if (!tid) throw new Error('Missing tid');
        if (!tenant_name) throw new Error('Missing tenant_name');

        let context: Context = {
            token: id_token,
            expiresAt: expires_at,
            refreshToken: refresh_token,
            userInfo: {
                name,
                subjectID: sub,
                tenantID: tid,
                tenantName: tenant_name,
            }
        };

        return context;
    }
}