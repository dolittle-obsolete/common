/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// Store in node_modules/@dolittle/
import Conf from 'conf';

export class DolittleConfig extends Conf {
    constructor(configName, ) {
        super({
                projectName: '.dolittle', 
                configName,

            })
    }
}