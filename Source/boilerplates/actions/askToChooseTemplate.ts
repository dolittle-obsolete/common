/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { IDependencyResolvers, PromptDependency, chooseOneUserInputType } from '@dolittle/tooling.common.dependencies';
import { ArtifactTemplate } from '../index';

/**
 * Prompts the user to choose a template
 * @param {ArtifactTemplate[]} templates
 * @param {IDependencyResolvers} resolvers
 */
export async function chooseTemplate(templates: ArtifactTemplate[], resolvers: IDependencyResolvers) {
    if (templates.length && templates.length > 0) {
        let template = await askWhichTemplate(templates, resolvers);
        return template;
    }
    return null;
}

async function askWhichTemplate(templates: ArtifactTemplate[], resolvers: IDependencyResolvers) {
    let choices = templates.map(_ => new Object({name: `${_.name} language: ${_.boilerplate.language}`, value: _}));
    let dep = new PromptDependency('artifactTemplate','Choose an artifact template', chooseOneUserInputType, 'Choose template:', choices);
    let answer = await resolvers.resolve({}, [dep]);
    return <ArtifactTemplate>answer['artifactTemplate'];
}