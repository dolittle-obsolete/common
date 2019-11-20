/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages } from '@dolittle/tooling.common.utilities';
import {Issuer, Client} from 'openid-client';
import {BaseLoginService, IContexts} from '../index';

/**
 * Represents an implementation of {ILoginService} which 
 *
 * @export
 * @class CLILoginService
 * @extends {BaseLoginService}
 */
export class CLILoginService extends BaseLoginService {
   
    /**
     * Instantiates an instance of {CLILoginService}.
     * @param {IContexts} contexts
     */
    constructor(contexts: IContexts) {
        super('device', 'hello', 'openid profile tenant', contexts);
    } 

    protected async authorize(client: Client, outputter: ICanOutputMessages) {
        let handle = await client.deviceAuthorization({
            client_id: client.metadata.client_id,
            scope: this._scope
        });

        outputter.print(`Please go to '${handle.verification_uri}', choose your identity provider and use the code '${handle.user_code}' to login`);
        return handle.poll();
    }
    
    protected clientFrom<TClient extends Client>(issuer: Issuer<TClient>): TClient {
        return new issuer.Client({
            client_id: this._clientID,
            client_secret: this._clientSecret
        })   
    }
}
