/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IDependencyResolvers, PromptDependency, chooseOneUserInputType } from '@dolittle/tooling.common.dependencies';
import { ITemplate } from '../internal';

/**
 * Prompts the user to choose a template
 * @param {Template[]} templates
 * @param {ITemplatesBoilerplate} boilerplate
 * @param {IDependencyResolvers} resolvers
 */
export async function chooseTemplate(templates: ITemplate[], resolvers: IDependencyResolvers) {
    if (templates.length && templates.length > 0) {
        const template = await askWhichTemplate(templates, resolvers);
        return template;
    }
    return null;
}

async function askWhichTemplate(templates: ITemplate[], resolvers: IDependencyResolvers) {
    const choices = templates.map(_ => new Object({name: `${_.name} description: ${_.description}`, value: _}));
    const dep = new PromptDependency('template','Choose a template', [], chooseOneUserInputType, 'Choose template:', false,  choices);
    const answer = await resolvers.resolve({}, [dep], []);
    return answer['template'] as ITemplate;
}
