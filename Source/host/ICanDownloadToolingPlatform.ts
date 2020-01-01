/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Represents a system that can download the tooling platform
 *
 * @export
 * @interface ICanDownloadToolingPlatform
 */
export interface ICanDownloadToolingPlatform {
    /**
     * Downloads the tooling platform
     *
     * @returns {Promise<void>}
     */
    download(toolingPackage: {version: string}): Promise<void>;
}
