/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {TemplatesBoilerplateParser} from '../../../internal';
import { PromptDependency, IDependencyParsers, IDependencies } from '@dolittle/tooling.common.dependencies';
import { Substitute, Arg, SubstituteOf } from '@fluffy-spoon/substitute';
import { IFileSystem, IFolders } from '@dolittle/tooling.common.files';
export class a_templates_boilerplate_parser {
    dependency: PromptDependency;
    parser: TemplatesBoilerplateParser;
    dependencies: SubstituteOf<IDependencies>;
    constructor() {
        this.dependency = new PromptDependency('name', 'desc', [], 'input', 'something');
        let dependencyParsers = Substitute.for<IDependencyParsers>();
        dependencyParsers.parse(Arg.any(), Arg.any()).returns(this.dependency);
        this.parser = new TemplatesBoilerplateParser(
            dependencyParsers, Substitute.for<IFolders>(), Substitute.for<IFileSystem>());
        this.dependencies = Substitute.for<IDependencies>();
        this.dependencies.dependencies.returns([this.dependency]);
        
    }
}
