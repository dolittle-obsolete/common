/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { Guid } from '@dolittle/tooling.common.utilities';
import { dolittleConfigDefault } from '@dolittle/tooling.common.configurations';
import _Handlebars from 'handlebars';

export type Handlebars = typeof _Handlebars;
export let handlebars = _Handlebars; 

/**
 * Sets up the handlebars system with custom helpers
 */
(function setupHandlebars() {
    handlebars.registerHelper('createGuid', () => {
        return Guid.create();
    });
    handlebars.registerHelper('dolittleConfigDefault', () => {
        let config: any  = dolittleConfigDefault;
        if (config['_']) config['_'] = undefined;
        return JSON.stringify(config, null, 4).normalize();
    });
    handlebars.registerHelper('addUniqueCSharpNamespace', objects => {
        return objects.map((_: any) => _.namespace).filter((v: any, i: any, a: { indexOf: (arg0: any) => void; }) =>  a.indexOf(v) === i)
                                                   .map((_: any) => `using ${_};`).join('\n');
    });
})();