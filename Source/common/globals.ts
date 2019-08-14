/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IInitializer, Initializer } from "./index";
import { boilerplates, boilerplatesLoader } from "@dolittle/tooling.common.boilerplates";
import { commandManager, providerRegistrators, ICanRegisterProviders } from "@dolittle/tooling.common.commands";
import { plugins } from "@dolittle/tooling.common.plugins";
import { loggers } from "@dolittle/tooling.common.logging";
import {ProviderRegistrator} from './index';

export let initializer: IInitializer = new Initializer(providerRegistrators, commandManager, plugins, boilerplates, boilerplatesLoader, loggers);

let providerRegistrator: ICanRegisterProviders = new ProviderRegistrator(commandManager, initializer, loggers);
providerRegistrators.addRegistrators(providerRegistrator);
