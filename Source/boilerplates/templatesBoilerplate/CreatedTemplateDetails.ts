/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ITemplatesBoilerplate, ITemplate } from '../index';

 export type CreatedTemplateDetails = {

    /**
     * The parent boilerplate of the created artifact template
     *
     * @type {ITemplatesBoilerplate}
     */
    boilerplate: ITemplatesBoilerplate;
    
    /**
     * The artifact template that was created
     *
     * @type {ITemplate}
     */
    template: ITemplate;

    /**
     * The destination of of the created {ITemplate}
     *
     * @type {string}
     */
    destination: string;
 }