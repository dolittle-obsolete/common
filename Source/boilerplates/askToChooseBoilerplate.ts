/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { PromptDependency, IDependencyResolvers, chooseOneUserInputType } from '@dolittle/tooling.common.dependencies';
import { IBoilerplate } from './internal';

/**
 * Prompts the user to choose a boilerplate
 * @param {Boilerplate[]} boilerplates
 * @param {IDependencyResolvers} resolvers
 */
export async function chooseBoilerplate(boilerplates: IBoilerplate[], resolvers: IDependencyResolvers) {
    if (boilerplates.length && boilerplates.length > 0) {
        const boilerplate = await askWhichBoilerplate(boilerplates, resolvers);
        return boilerplate;
    }
    return null;
}

async function askWhichBoilerplate(boilerplates: IBoilerplate[], resolvers: IDependencyResolvers) {
    const choices = boilerplates.map(boilerplate => new Object({name: `${boilerplate.namespace ? `${boilerplate.namespace}::` : ''}${boilerplate.name} language: ${boilerplate.language}`, value: boilerplate}));
    const dep = new PromptDependency('boilerplate', 'Choose a boilerplate', [], chooseOneUserInputType, 'Choose boilerplate:', false, choices);
    const answer = await resolvers.resolve({}, [dep], []);
    return answer['boilerplate'] as IBoilerplate;
}
