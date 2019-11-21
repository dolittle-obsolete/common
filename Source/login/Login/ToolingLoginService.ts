/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ILoggers } from '@dolittle/tooling.common.logging';
import { ICanOutputMessages, IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { IContexts, ILoginService, ICanHandleAuthentication} from '../index';

/**
 * Represents an implementation of {ILoginService} which 
 *
 * @export
 * @class CLILoginService
 * @extends {BaseLoginService}
 */
export class ToolingLoginService implements ILoginService {
   
    /**
     * Instantiates an instance of {CLILoginService}.
     * @param {IContexts} contexts
     */
    constructor(private _authenticationHandler: ICanHandleAuthentication, private _contexts: IContexts, private _loggers: ILoggers) { } 

    async login(outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        this._loggers.info('Tooling Login Service: performing login')
        let {tokens, userInfo} = await this._authenticationHandler.authenticate(outputter, busyIndicator); 
        this._loggers.info('Authenticated');
        
        let context = this._contexts.createAndAdd(tokens.access_token!, tokens.expires_at!, userInfo.sub, userInfo.name, userInfo.tid, userInfo.tenant_name, tokens.refresh_token);
        this._contexts.useContext(context);
        return context;
    }

}
