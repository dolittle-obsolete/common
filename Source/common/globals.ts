/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { IInitializer, Initializer } from "./index";
import { boilerplates, boilerplateDiscoverers } from "@dolittle/tooling.common.boilerplates";
import { commandManager, providerRegistrators } from "@dolittle/tooling.common.commands";
import { plugins } from "@dolittle/tooling.common.plugins";
import { logger } from "@dolittle/tooling.common.logging";


export let initializer: IInitializer = new Initializer(providerRegistrators, commandManager, plugins, boilerplates, boilerplateDiscoverers, logger, )