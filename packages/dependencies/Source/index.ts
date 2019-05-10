import { IDependenciesManager } from './IDependenciesManager';
import { DependenciesManager } from './DependenciesManager';
import { folders, logger, fileSystem, dolittleConfig } from '@dolittle/tooling.common.utilities';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export * from './IDependenciesManager';
export * from './Dependency';
export * from './DependenciesManager';

export const dependenciesManager: IDependenciesManager = new DependenciesManager(folders, fileSystem, dolittleConfig, logger);