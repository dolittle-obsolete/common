/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { a_templates_boilerplate_parser } from '../given/a_templates_boilerplate_parser';
import { Scripts,TemplatesBoilerplate } from '../../../internal';

describe('and boilerplate can be parsed', () => {
    const context = new a_templates_boilerplate_parser();
    const boilerplate = new TemplatesBoilerplate('language', 'name', 'desc', context.dependencies, 'namespace', new Scripts([], [], [], {}), 'Templates', []);

    it('Should be able to parse', () => context.parser.canParse(boilerplate).should.not.be.false);
});
