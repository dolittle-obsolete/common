/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IBoilerplate, IContentBoilerplate, templatesBoilerplateType } from "../internal";

/**
 * Type-guard for {IContentBoilerplate}
 *
 * @export
 * @param {IBoilerplate} boilerplate
 */
export function boilerplateIsContentBoilerplate(boilerplate: IBoilerplate): boilerplate is IContentBoilerplate {
    return boilerplate.type !== templatesBoilerplateType;
}