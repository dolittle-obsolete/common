/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { PromptDependency, promptDependencyType } from '../index';
import { a_valid_configuration_for_a_prompt_dependency } from './given/a_valid_configuration_for_a_prompt_dependency';

describe('when creating a valid prompt dependency', () => {
    let context = new a_valid_configuration_for_a_prompt_dependency();
    let dependency = new PromptDependency(context.name, context.description, context.userInputType, context.promptMessage);

    it('Should have the correct name', () => dependency.name.should.be.equal(context.name));
    it('Should have the correct description', () => dependency.description.should.be.equal(context.description));
    it('Should have the correct type', () => dependency.type.should.be.equal(promptDependencyType));
    it('Should have the correct userInputType', () => dependency.userInputType.should.be.equal(context.userInputType));
    it('Should have the correct promptMessage', () => dependency.promptMessage.should.be.equal(context.promptMessage));  
    it('Should have the correct choices', () => expect(dependency.choices).to.be.undefined);  
    it('Should have the correct customInput', () => expect(dependency.customInput).to.be.undefined);
    
});