import { IBusyIndicator } from "@dolittle/tooling.common.utilities";

/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

/**
 * Defines a system that initializes the tooling system
 */
export interface IInitializer {
    
    /**
     * Whether the tooling system has been initialized
     *
     * @type {boolean}
     */
    readonly isInitialized: boolean;
    
    /**
     * Initializes the tooling system
     * 
     * @param {IBusyIndicator} busyIndicator
     * @returns {Promise<void>}
     */
    initialize(busyIndicator: IBusyIndicator): Promise<void>

}