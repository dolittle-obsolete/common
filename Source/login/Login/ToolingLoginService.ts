/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ILoggers } from '@dolittle/tooling.common.logging';
import { ICanOutputMessages, IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { IContexts, ILoginService, ICanHandleAuthentication } from '../index';
import { IDependencyResolvers, PromptDependency, IsNotEmpty, inputUserInputType } from '@dolittle/tooling.common.dependencies';

function isUndefinedContextName(name: string) {
    return name.split('-', 2).filter(_ => _.trim() === 'undefined').length > 0;
}
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

    async login(dependencyResolvers: IDependencyResolvers, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        this._loggers.info('Tooling Login Service: performing login');
        const {tokens, userInfo} = await this._authenticationHandler.authenticate(outputter, busyIndicator);
        this._loggers.info('Authenticated');

        const context = this._contexts.createAndAdd(tokens.access_token!, tokens.expires_at!, userInfo.sub, userInfo.name, userInfo.tid, userInfo.tenant_name, tokens.refresh_token);
        this._contexts.useContext(context);
        const { contextName } = this._contexts.current();
        if ((!context.userInfo.tenantName || !context.userInfo.name)
            && isUndefinedContextName(contextName) ) {
            const contextNameDependency = new PromptDependency(
                'promptName',
                'The name of the context',
                [new IsNotEmpty()],
                inputUserInputType,
                'The name of the context'
            );
            const dependencyContext = await dependencyResolvers.resolve({}, [contextNameDependency]);
            this._contexts.renameCurrent(dependencyContext[contextNameDependency.name]);
        }
        return context;
    }

}
