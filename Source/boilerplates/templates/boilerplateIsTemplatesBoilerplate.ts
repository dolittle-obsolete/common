/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ITemplatesBoilerplate, templatesBoilerplateType } from "../index";

/**
 * Type-guard for {ITemplatesBoilerplate}
 *
 * @export
 * @param {IBoilerplate} boilerplate
 */
export function boilerplateIsTemplatesBoilerplate(boilerplate: any): boilerplate is ITemplatesBoilerplate {
    return boilerplate.type === templatesBoilerplateType;
}