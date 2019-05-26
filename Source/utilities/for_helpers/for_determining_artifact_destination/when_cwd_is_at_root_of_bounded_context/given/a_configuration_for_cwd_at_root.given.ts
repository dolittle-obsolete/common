/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export class a_configuration_for_cwd_at_root {
    dolittleConfig: any;
    area: string
    language: string
    name: string
    boundedContextPath: string
    boundedContextRoot: string
    cwd: string
    constructor() {
        this.dolittleConfig = {
            language: {
                concepts: 'Concepts',
                domain: 'Domain',
                events: 'Events',
                read: 'Read'
            }
        };
        this.area = 'domain';
        this.language = 'language';
        this.name = 'artifact';
        this.boundedContextPath = require('path').join('some', 'path', 'to', 'boundedcontext-root', 'bounded-context.json');
        this.boundedContextRoot = require('path').dirname(this.boundedContextPath);

        this.cwd = this.boundedContextRoot;
    }
}