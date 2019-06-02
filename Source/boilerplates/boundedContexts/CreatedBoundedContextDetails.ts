/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ContentBoilerplate } from "../index";

 export type CreatedBoundedContextDetails = {

    /**
     * The boilerplate that was created
     *
     * @type {ContentBoilerplate}
     */
    boilerplate: ContentBoilerplate;
    /**
     * The destination of of the created boilerplate
     *
     * @type {string}
     */
    destination: string;
 }