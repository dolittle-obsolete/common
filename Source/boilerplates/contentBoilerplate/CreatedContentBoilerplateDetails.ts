/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { IContentBoilerplate } from "../index";

export type CreatedContentBoilerplateDetails = {

   /**
    * The boilerplate that was created
    *
    * @type {IContentBoilerplate}
    */
   boilerplate: IContentBoilerplate;
   
   /**
    * The destination of of the created boilerplate
    *
    * @type {string}
    */
   destination: string;
}