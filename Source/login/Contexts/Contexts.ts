/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import {TokenSet} from 'openid-client';
import { Context, IContexts, IContextCreator, ContextsConfiguration, contextEquals } from '../index';

/**
 * Represents an implementation of {IContexts}
 *
 * @export
 * @class Contexts
 * @implements {IContexts}
 */
export class Contexts implements IContexts {

    /**
     * Instantiates an instance of {Contexts}.
     * @param {IContextCreator} _contextCreator
     * @param {ContextsConfiguration} _contextsConfig
     */
    constructor(private _contextCreator: IContextCreator, private _contextsConfig: ContextsConfiguration) {}
    
    current() {
        let contextName = this._contextsConfig.currentContext;
        let context = this._contextsConfig.contexts[contextName];
        return {contextName, context};
    }

    use(contextName: string) {
        if (!this._contextsConfig.hasContext(contextName)) throw new Error(`Contexts configuration does not have a context with name ${contextName}`);
        let context = this._contextsConfig.contexts[contextName];
        this._contextsConfig.currentContext = contextName;
        return context;
    }

    rename(oldName: string, newName: string): void {
        this._throwIfInvalidContextName(newName);
        this._contextsConfig.renameContext(oldName, newName);
    }

    renameCurrent(newName: string): void {
        this._throwIfInvalidContextName(newName);
        this._contextsConfig.renameCurrent(newName);
    }

    add(context: Context) {
        let equalContexts = Object.keys(this._contextsConfig.contexts).map(key => {
            return {contextName: key, context: this._contextsConfig.contexts[key]}
        }).filter(_ => contextEquals(context, _.context));
        
        if(equalContexts.length > 0) {
            equalContexts.every(_ => this._contextsConfig.addContext(_.contextName, _.context))
        }
        else {
            let contextName = this._createContextName(context);
            this._contextsConfig.addContext(contextName, context);
            if (this._contextsConfig.numContexts === 1) {
                this.use(contextName);   
            }
        }
    }

    get(contextName: string) {
        return this._contextsConfig.contexts[contextName];
    }

    all() {
        return this._contextsConfig.contexts;
    }
    
    createAndAdd(id_token: string, expires_at: number, sub: string, name: string, tid: string, tenant_name: string, refresh_token?: string) {
        let context = this._contextCreator.create(id_token, expires_at, sub, name, tid, tenant_name, refresh_token);

        this.add(context);
        return context;
    }

    delete(contextName: string) {
        return this._contextsConfig.deleteContext(contextName);
    }

    clear() {
        this._contextsConfig.clear();
    }

    private _createContextName(context: Context) {
        let standardName = `${context.userInfo.name} - ${context.userInfo.tenantName}`;
        let name = standardName;
        let i = 0;
        while (this._contextsConfig.hasContext(name)) {
            name = `${standardName} - ${i.toString()}`;  
            i++;
        }
        return name;
    }
    private _throwIfInvalidContextName(contextName: string) {
        if (!contextName) throw new Error(`'${contextName}' is an invalid name for a context`);
    }

    contextHasExpired(context: Context) {
        return new TokenSet({expires_at: context.expiresAt}).expired();
    }
    
    hasExpired(contextName: string) {
        let context = this.get(contextName);
        return this.contextHasExpired(context);
    }
}