
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { logger } from '@dolittle/tooling.common.logging';
import { ICommandManager, CommandManager } from './index';

export let commandManager: ICommandManager = new CommandManager(logger);