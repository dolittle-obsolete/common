/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Dependency, IDependencyResolvers } from '@dolittle/tooling.common.dependencies';
import { BaseBoilerplate } from '../internal';

/**
 * Prompts the user to choose a boilerplate
 * @param {BaseBoilerplate[]} boilerplates
 * @param {IDependencyResolvers} resolvers
 */
export async function chooseBoilerplate(boilerplates: BaseBoilerplate[], resolvers: IDependencyResolvers) {
    if (boilerplates.length && boilerplates.length > 0) {
        let boilerplate = await askWhichBoilerplate(boilerplates, resolvers);
        return boilerplate;
    }
    return null;
}

async function askWhichBoilerplate(boilerplates: BaseBoilerplate[], resolvers: IDependencyResolvers) {
    let choices = boilerplates.map(boilerplate => new Object({name: `${boilerplate.namespace? `${boilerplate.namespace}::`: ''}${boilerplate.name} language: ${boilerplate.language}`, value: boilerplate}));
    let dep = new Dependency('Choose a boilerplate', 'boilerplate', 'userInput', undefined, 'chooseOne', choices, 'Choose boilerplate:');
    let answer = await resolvers.resolve({}, [dep]);
    return <BaseBoilerplate>answer['boilerplate'];
}