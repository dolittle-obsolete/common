/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Dependency } from '../../index';

export class a_non_abstract_dependency_class extends Dependency {
    static description = 'description';
    static type = 'type';
    constructor(name) {
        super(name, a_non_abstract_dependency_class.description, a_non_abstract_dependency_class.type);
    }
}