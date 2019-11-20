/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { loggers } from '@dolittle/tooling.common.logging';
import { connectionChecker } from '@dolittle/tooling.common.packages';
import { ContextsConfiguration, IContextCreator, ContextCreator, IContexts, Contexts, ToolingLoginService, ILoginService, ToolingDeviceFlowAuthorizer } from './internal';

export let contextCreator: IContextCreator  = new ContextCreator();
export let contextsConfiguration = new ContextsConfiguration();
export let contexts: IContexts = new Contexts(contextCreator, contextsConfiguration);

export let openIdDeviceFlowAuthorizer = new ToolingDeviceFlowAuthorizer(connectionChecker);
export let loginService: ILoginService = new ToolingLoginService(openIdDeviceFlowAuthorizer, contexts, loggers);
