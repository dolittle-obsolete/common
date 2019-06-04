/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export interface ICanOutputMessages {
    /**
     * Outputs a message
     *
     * @param {...string[]} args
     * @memberof ICanOutputMessages
     */
    print(...args: string[]): void
    /**
     * Outputs a warning
     *
     * @param {...string[]} args
     * @memberof ICanOutputMessages
     */
    warn(...args: string[]): void
    /**
     * Outputs an error
     *
     * @param {...string[]} args
     * @memberof ICanOutputMessages
     */
    error(...args: string[]): void
}