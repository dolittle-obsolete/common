/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ContextsConfiguration, IContextCreator, ContextCreator, IContexts, Contexts, CLILoginService, ILoginService } from './internal';

export let contextCreator: IContextCreator  = new ContextCreator();
export let contextsConfiguration = new ContextsConfiguration();
export let contexts: IContexts = new Contexts(contextCreator, contextsConfiguration);

export let loginService: ILoginService = new CLILoginService(contexts);
