
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import {ICanRegisterProviders} from '../index';

/**
 * Defines a system that initializes the tooling system
 */
export interface IProviderRegistrators {
    
    readonly hasRegistered: boolean;
    
    /**
     * Registers all providers to the command system
     *
     */
    register(): Promise<void>

    /**
     * Adds instances of {ICanRegisterProviders}
     *
     * @param {...ICanRegisterProviders[]} registrator
     */
    addRegistrators(...registrator: ICanRegisterProviders[]): void;

}
