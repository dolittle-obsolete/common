/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {Exception} from '@dolittle/tooling.common.utilities';
import { IDependency, IDependencyRule } from '../index';

/**
 * The exception that gets thrown when a rule is not respected by a dependency
 * @export
 * @class RuleNotRespected
 * @extends {Exception}
 */
export class RuleNotRespected extends Exception {

    /**
     * Instantiates an instance of {RuleNotRespected}.
     * @param {string} [message]
     */
    constructor(dependency: IDependency, rule: IDependencyRule) {
        super(`Dependency '${dependency.name}' does not respect the '${rule.constructor.name}' rule.`);
    }
}
