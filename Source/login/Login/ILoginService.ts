/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages, IBusyIndicator } from '@dolittle/tooling.common.utilities';
import { IDependencyResolvers } from '@dolittle/tooling.common.dependencies';
import { Context } from '../internal';

/**
 * Defines a system that can deal with login
 *
 * @export
 * @interface ILoginService
 */
export interface ILoginService {

    /**
     * Logs a user in and stores login information in a context map. Returns the created login context
     *
     * @argument {IDependencyResolvers} dependencyResolvers
     * @argument {ICanOutputMessages} outputter
     * @argument {IBusyIndicator} busyIndicator
     * @returns {Promise<Context>}
     */
    login(dependencyResolvers: IDependencyResolvers, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator): Promise<Context>

}
