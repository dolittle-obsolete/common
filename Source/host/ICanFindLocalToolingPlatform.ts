/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Represents a system that can find the tooling platform locally on the host system
 *
 * @export
 * @interface ICanFindLocalToolingPlatform
 */
export interface ICanFindLocalToolingPlatform {
    /**
     * Checks if a compatible tooling platform exists locally
     *
     * @returns {Promise<boolean>}
     */
    exists(toolingPackage: {version: string}): Promise<boolean>;
}
