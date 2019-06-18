
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ICanOutputMessages, NullMessageOutputter, NullBusyIndicator, IBusyIndicator } from "@dolittle/tooling.common.utilities";
import { Logger } from "@dolittle/tooling.common.logging";
import { 
    INamespaces, IDefaultCommands, IDefaultCommandGroups, ICanProvideDefaultCommands, 
    ICanProvideDefaultCommandGroups, ICanProvideNamespaces, ICommandManager, Namespaces, 
    DefaultCommandGroups, DefaultCommands, ICommand, NoArgumentsGiven, NoMatchingCommand, INamespace, ICommandGroup, ICanValidateProviderFor 
} from "./index";
import { IDependencyResolvers } from "@dolittle/tooling.common.dependencies";

/**
 * Represents an implementation of {ICommandManager}
 */
export class CommandManager implements ICommandManager {
    
    private _namespaces: INamespaces;
    private _defaultCommandGroups: IDefaultCommandGroups;
    private _defaultCommands: IDefaultCommands;

    /**
     * Instantiates an instance of {CommandManager}.
     * @param {Logger} _logger
     */
    constructor(private _commandProviderValidator: ICanValidateProviderFor<ICommand>, private _commandGroupProviderValidator: ICanValidateProviderFor<ICommandGroup>,
                private _namespaceProviderValidator: ICanValidateProviderFor<INamespace>, private _logger: Logger) {
        this._namespaces = new Namespaces(this._namespaceProviderValidator, this._logger);
        this._defaultCommandGroups = new DefaultCommandGroups(this._commandGroupProviderValidator, this._logger);
        this._defaultCommands = new DefaultCommands(this._commandProviderValidator, this._logger);
    }
    
    get namespaces() { 
        let namespaces = this._namespaces.namespaces;
        this.addDefaultsToNamespaces(namespaces);
        return namespaces;
    }
    
    get commands() { return this._defaultCommands.commands; }

    get commandGroups() { return this._defaultCommandGroups.commandGroups; }

    
    async execute(dependencyResolvers: IDependencyResolvers, allArguments: string[], currentWorkingDirectory: string, coreLanguage: string, commandOptions?: Map<string, any>, 
                    outputter: ICanOutputMessages = new NullMessageOutputter(), busyIndicator: IBusyIndicator = new NullBusyIndicator()) {
        
        if (allArguments.length < 1) throw new NoArgumentsGiven();
        const {command, commandArguments, namespace} = this.getCommandContext(allArguments);
        await command.action(dependencyResolvers, currentWorkingDirectory, coreLanguage, commandArguments, commandOptions, namespace, outputter, busyIndicator);
    }

    clear() {
        this._defaultCommands.clear();
        this._defaultCommandGroups.clear();
        this._namespaces.clear();
    }

    registerProviders(defaultCommandProviders: ICanProvideDefaultCommands[], defaultCommandGroupsProviders: ICanProvideDefaultCommandGroups[], namespaceProviders: ICanProvideNamespaces[]) {
        this._defaultCommands.register(...defaultCommandProviders);
        this._defaultCommandGroups.register(...defaultCommandGroupsProviders);
        this._namespaces.register(...namespaceProviders);
    }
    registerDefaultProviders(defaultCommandProviders: ICanProvideDefaultCommands[], defaultCommandGroupsProviders: ICanProvideDefaultCommandGroups[], namespaceProviders: ICanProvideNamespaces[]) {
        this._defaultCommands.registerDefault(...defaultCommandProviders);
        this._defaultCommandGroups.registerDefault(...defaultCommandGroupsProviders);
        this._namespaces.registerDefault(...namespaceProviders);
    }

    private addDefaultsToNamespaces(namespaces: INamespace[]) {
        namespaces.forEach(_ => {
            _.addDefaultCommands(this._defaultCommands.commands);
            _.addDefaultCommandGroups(this._defaultCommandGroups.commandGroups);
        });
    }

    private getCommandContext(allArguments: string[]): {command: ICommand, commandArguments: string[], namespace?: string} {
        let [firstArgument, ...restArguments] = allArguments;
        let namespace = this.namespaces.find(_ => _.name === firstArgument);
        if (namespace) {
            let nextArgument = restArguments.shift();
            if (!nextArgument) throw new NoMatchingCommand(firstArgument);
            firstArgument = nextArgument;
            return this.getCommandContextFromNamespace(firstArgument, restArguments, namespace);
        }
        let commandGroup = this.commandGroups.find(_ => _.name === firstArgument);
        if (commandGroup) {
            let nextArgument = restArguments.shift();
            if (!nextArgument) throw new NoMatchingCommand(firstArgument);
            firstArgument = nextArgument;
            return this.getCommandContextFromCommandGroup(firstArgument, restArguments, commandGroup);
        }
        let command = this.commands.find(_ => _.name);
        if (command) return {command, commandArguments: restArguments};

        throw new NoMatchingCommand(firstArgument);
    }

    private getCommandContextFromNamespace(firstArgument: string, restArguments: string[], namespace: INamespace): { command: ICommand, commandArguments: string[], namespace?: string | undefined } {
        let commandGroup = this.commandGroups.find(_ => _.name === firstArgument);
        if (commandGroup) {
            let nextArgument = restArguments.shift();
            if (!nextArgument) throw new NoMatchingCommand(firstArgument, namespace.name);
            firstArgument = nextArgument;
            return this.getCommandContextFromCommandGroup(firstArgument, restArguments, commandGroup, namespace.name);
        }
        let command = this.commands.find(_ => _.name);
        if (command) return {command, commandArguments: restArguments, namespace: namespace.name};

        throw new NoMatchingCommand(firstArgument, namespace.name);
    }

    private getCommandContextFromCommandGroup(firstArgument: string, restArguments: string[], commandGroup: ICommandGroup, namespace?: string): { command: ICommand, commandArguments: string[], namespace?: string } {
        let command = commandGroup.commands.find(_ => _.name);
        if (command) return {command, commandArguments: restArguments, namespace};

        throw new NoMatchingCommand(firstArgument, namespace, commandGroup.name);
    }
}