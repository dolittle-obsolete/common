/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

/**
 * Defines a system that can output messages
 *
 * @export
 * @interface ICanOutputMessages
 */
export interface ICanOutputMessages {
    
    /**
     * Outputs a message
     *
     * @param {...string[]} args
     */
    print(...args: string[]): void
    /**
     * Outputs a warning
     *
     * @param {...string[]} args
     */
    warn(...args: string[]): void
    /**
     * Outputs an error
     *
     * @param {...string[]} args
     */
    error(...args: string[]): void
}