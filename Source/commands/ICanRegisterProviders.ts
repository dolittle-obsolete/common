/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

/**
 * Defines a system that can register providers to the {ICommandManager}
 */
export interface ICanRegisterProviders {
    
    /**
     * Registers providers to the {ICommandManager}
     *
     */
    register(): Promise<void>

}
