/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages } from "@dolittle/tooling.common.utilities";

/**
 * Defines a system that can deal with login
 *
 * @export
 * @interface ILoginService
 */
export interface ILoginService {
    
    /**
     * Logs a user in and caches login information
     *
     * @argument {ICanOutputMessages} outputter
     * @returns {Promise<void>}
     */
    login(outputter: ICanOutputMessages): Promise<void>
}
