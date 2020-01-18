/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IDependencyParsers, DependenciesWithStandardValidators } from '@dolittle/tooling.common.dependencies';
import { Template } from '../internal';

/**
 * Creates a {Template} from a json object
 *
 * @static
 * @param {*} obj The template json object
 * @param {string} path The path of the template file
 * @param {string[]} includedFiles The files that needs to be created by the template
 * @param {IDependencyParsers} dependencyParsers
 * @returns
 */
export function templateFromJson(obj: any, path: string, includedFiles: string[], dependencyParsers: IDependencyParsers) {
    return new Template(obj.name, obj.type, obj.area, obj.description,
        obj.dependencies !== undefined ?
            new DependenciesWithStandardValidators(Object.keys(obj.dependencies).map(key => dependencyParsers.parse(obj.dependencies[key], key)))
            : new DependenciesWithStandardValidators([]), includedFiles, path);
}
