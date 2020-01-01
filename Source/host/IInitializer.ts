/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Represents a system that can initialize the tooling host
 *
 * @export
 * @interface IInitializer
 */
export interface IInitializer {
    /**
     * Initializes the hose
     *
     * @returns {Promise<void>}
     */
    initialize(): Promise<void>;
}
