/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export type DownloadPackageInfo =  {
    /**
     * The name of the package
     */
    name: string;
    /**
     * The version of the package 
     */
    version?: string;
}