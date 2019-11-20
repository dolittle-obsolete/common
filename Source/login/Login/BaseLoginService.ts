/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages } from '@dolittle/tooling.common.utilities';
import {Issuer, Client, TokenSet} from 'openid-client';
import {ILoginService, IContexts} from '../index';

/**
 * Represents an implementation of {ILoginService} which 
 *
 * @export
 * @class BaseLoginService
 * @abstract
 * @implements {ILoginService}
 */
export abstract class BaseLoginService implements ILoginService {
    
    static get DISCOVERY_DOCUMENT() { return 'http://localhost:5000/.well-known/openid-configuration'; }
   
    constructor(clientID: string, clientSecret: string, scope: string, contexts: IContexts) {
        this._clientID = clientID;
        this._clientSecret = clientSecret;
        this._scope = scope;
        this._contexts = contexts;
    }

    /**
     * The ID of the client used for login
     *
     * @protected
     * @type {string}
     */
    protected readonly _clientID: string
    
    /**
     * The secret of the client used for login 
     *
     * @protected
     * @type {string}
     */
    protected readonly _clientSecret: string

    /**
     * The requested scope in the grant
     *
     * @protected
     * @type {string}
     */
    protected readonly _scope: string

    /**
     * The {IContexts} contexts manager
     *
     * @protected
     * @type {IContexts}
     */
    protected readonly _contexts: IContexts
    

    /**
     * Starts an authorization request flow and returns a set of tokens
     *
     * @protected
     * @abstract
     * @param {Client} client
     * @returns {Promise<TokenSet>}
     */
    protected abstract authorize(client: Client, outputter: ICanOutputMessages): Promise<TokenSet>

    /**
     * Creates a {Client} from an issuer
     *
     * @protected
     * @abstract
     * @template TClient
     * @param {Issuer<TClient>} issuer
     * @returns {TClient}
     */
    protected abstract clientFrom<TClient extends Client>(issuer: Issuer<TClient>): TClient

    async login(outputter: ICanOutputMessages) {
        let issuer = await Issuer.discover(BaseLoginService.DISCOVERY_DOCUMENT);
        let client = this.clientFrom(issuer);
        let tokens = await this.authorize(client, outputter);
        let userInfo = await client.userinfo(tokens);
        console.log(tokens);
        console.log(userInfo);
        tokens.id
        this._contexts.createAndAdd(tokens.id_token!, tokens.expires_at!, userInfo.sub, userInfo.name!, (userInfo as any).tid, (userInfo as any).tenant_name, tokens.refresh_token);
    }
}