/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { PromptDependency } from '../index';
import { a_valid_configuration_for_a_prompt_dependency } from './given/a_valid_configuration_for_a_prompt_dependency';

describe('when creating prompt dependency with undefined prompt message', () => {
    let context = new a_valid_configuration_for_a_prompt_dependency();
    let promptMessage = undefined;
    let error = null;
    try {
        let dep = new PromptDependency(context.name, context.description, context.userInputType, promptMessage);
        
    } catch(e) {
        error = e;
    }
    it('Should throw an exception', () => error.should.not.be.null);
    it('Should throw an Error exception', () => error.should.be.an.instanceof(Error));
    
});