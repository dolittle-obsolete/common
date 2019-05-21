/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { IDependencyParsers, IDependency, ICanParseDependencies, MultipleDependencyParsersError, CannotParseDependencyError  } from "./internal";


/**
 * Responsible for parsing an object into a Dependency
 *
 * @export
 * @interface IDependencyParser
 */
export class DependencyParsers implements IDependencyParsers {
    
    constructor(private _parsers: ICanParseDependencies[]) {}
    
    get parsers() {return this._parsers;}

    addParsers(...parsers: ICanParseDependencies[]) {
        this._parsers.push(...parsers);
    }
    parse(obj: any, name: string): IDependency {
        let parser: ICanParseDependencies | null = null;

        this._parsers.forEach(_ => {
            if (_.canParse(obj)) {
                if (parser !== null) throw MultipleDependencyParsersError.new;
                parser = _;
            }
        });
        if (parser === null) throw CannotParseDependencyError.new;
        
        return (<ICanParseDependencies>parser).parse(obj, name);
    }

}