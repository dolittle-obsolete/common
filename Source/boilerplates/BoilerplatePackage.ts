/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ToolingPackage } from "@dolittle/tooling.common.packages";


export type BoilerplatePackage = {
    
    /**
     * The path of the boilerplate package
     *
     * @type {string}
     */
    readonly boilerplatePackagePath: string

    /**
     * The tooling package configuration
     *
     * @type {ToolingPackage}
     */
    readonly packageJson: ToolingPackage
    
}