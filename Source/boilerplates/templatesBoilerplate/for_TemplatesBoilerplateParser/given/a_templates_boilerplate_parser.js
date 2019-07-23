/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {TemplatesBoilerplateParser} from '../../../index';
import { PromptDependency } from '@dolittle/tooling.common.dependencies';
export class a_templates_boilerplate_parser {
    constructor() {
        this.dependency = new PromptDependency('name', 'desc', 'input', 'something');
        this.parser = new TemplatesBoilerplateParser({
            add: sinon.stub(),
            parsers: sinon.stub().returns([]),
            parse: sinon.stub()
        }, {}, {});
        
    }
}
