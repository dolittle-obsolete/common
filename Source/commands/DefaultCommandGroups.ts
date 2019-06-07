/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Logger } from "@dolittle/tooling.common.logging";
import { ICanProvideDefaultCommandGroups, IDefaultCommandGroups, ICommandGroup } from "./index";

/**
 * Represents an implementation of {IDefaultCommandGroups}
 *
 * @export
 * @interface DefaultCommandGroups
 */
export class DefaultCommandGroups implements IDefaultCommandGroups {
    
    private _commandGroups: ICommandGroup[] = []

    constructor (private _providers: ICanProvideDefaultCommandGroups[], private _logger: Logger) {}

    get providers() {return this._providers; }

    get commandGroups() {
        this.loadCommandGroups();
        return this._commandGroups;
    } 
    
    addProviders(...providers: ICanProvideDefaultCommandGroups[]) {
        this._providers.push(...providers);
    }

    private loadCommandGroups() {
        this._logger.info('Providing default command groups');
        this._commandGroups = [];
        this.providers.forEach(_ => this._commandGroups.push(..._.provide()));
    }

}