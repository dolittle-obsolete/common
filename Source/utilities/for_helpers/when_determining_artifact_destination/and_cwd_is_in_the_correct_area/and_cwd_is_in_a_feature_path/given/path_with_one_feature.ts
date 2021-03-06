/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export class path_with_one_feature{
    dolittleConfig: any;
    area: string;
    language: string;
    name: string;
    boundedContextPath: any;
    boundedContextRoot: any;
    featureSegments: string;
    cwd: any;
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

        this.featureSegments = 'feature1';
        this.cwd = require('path').join(this.boundedContextRoot, `${this.dolittleConfig[this.language][this.area]}`, ...this.featureSegments.split('.'));
    }
}
