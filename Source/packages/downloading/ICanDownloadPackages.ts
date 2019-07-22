/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { DownloadPackageInfo } from "../index";

/**
 * Defines a system that can download packages
 *
 * @export
 * @interface ICanDownloadPackages
 */
export interface ICanDownloadPackages {

    /**
     * Downloads packages
     *
     * @param {DownloadPackageInfo[]} packages
     * @returns {Promise<void>}
     */
    download(packages: DownloadPackageInfo[]): Promise<void>
    /**
     * Downloads packages
     *
     * @param {DownloadPackageInfo[]} packages
     */
    downloadSync(packages: DownloadPackageInfo[]): void
}