/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { PromptDependency } from '../../../internal';

export class a_prompt_dependency {
    dependency: PromptDependency;
    constructor() {
        this.dependency = new PromptDependency('name', 'desc', [], 'input', 'something');
    }
}
