/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { IDependency, ICanParseDependencies } from "./internal";
/**
 * Responsible for parsing an object into a Dependency
 *
 * @export
 * @interface IDependencyParser
 */
export interface IDependencyParsers {
    parsers: ICanParseDependencies[]
    parse(obj: any, name: string): IDependency
    addParsers(...parser: ICanParseDependencies[]): void
}