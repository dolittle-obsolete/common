/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { IDependencyParsers, IDependency, ICanParseDependencies, MultipleParsersForDependency, CannotParseDependency  } from '../index';


/**
 * Represents an implementation of {IDependencyParsers} responsible for parsing an object into a Dependency
 *
 * @export
 * @interface IDependencyParser
 */
export class DependencyParsers implements IDependencyParsers {
    
    /**
     * Instantiates an instance of {DependencyParsers}.
     * @param {ICanParseDependencies[]} _parsers
     */
    constructor(private _parsers: ICanParseDependencies[]) {}
    
    get parsers() {return this._parsers;}

    add(...parsers: ICanParseDependencies[]) {
        this._parsers.push(...parsers);
    }
    
    parse(obj: any, name: string): IDependency {
        let parser: ICanParseDependencies | null = null;

        this._parsers.forEach(_ => {
            if (_.canParse(obj)) {
                if (parser !== null) throw new MultipleParsersForDependency(name);
                parser = _;
            }
        });
        if (parser === null) throw new CannotParseDependency(name);
        
        return (<ICanParseDependencies>parser).parse(obj, name);
    }

}