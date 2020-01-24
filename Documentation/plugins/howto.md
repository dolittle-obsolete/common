# How to write a Dolittle CLI plugin with namespaces, commandgroups and commands

This tutorial shows you how to write a simple CLI plugin to call [Commands](https://dolittle.io/runtime/runtime/command/about_commands/) and [Queries](https://dolittle.io/runtime/runtime/read/query/) from a simple Dolittle application. Rest of this tutorial expects you to have a simple Dolittle application up and running, if you don't have an application already here's [a tutorial for that](www.example.com).

You should first understand some of the basic points about a [Plugin.](https://dolittle.io/tooling/tooling-platform/plugins/)


For this example a plugin that would work like this:
```bash
$ dolittle names add name "John Madden" "Maddenstreet 10"
John Madded added
$ dolittle names get name "John Madden"
John Madden: Maddenstreet 10 
$ dolittle names get names
John Madden: Maddenstreet 10 
Bohn Badden: Badstreet 123
```

## Structure
```
.
├── Core
├── Domain
|   ├── YourCommands
├── Events
|   ├── YourEvents
├── Read
|   ├── YourReadModels
├── Tooling
|   ├── Plugin
|   ├──── CommandGroupsProvider.ts
|   ├──── CommandsProvider.ts
|   ├──── NamespaceProvider.ts
|   ├──── package.json
|   ├──── index.ts
|   ├──── names
|   ├────── NamesNamespace.ts
|   ├────── add
|   ├───────── AddName.ts
|   └───────── AddCommandGroup.ts
|   ├────── get
|   ├───────── GetName.ts
|   ├───────── GetNames.ts
|   └───────── GetCommandGroup.ts
```

## 1. Install Dolittle cli globally

[Follow the setup here.](https://dolittle.io/tooling/cli/installing/)

## 2. Create the necessary files and folders

First you need to create all the necessary files for the plugin to work:

* `CommandGroupsProvider.ts` boilerplate
* `CommandsProvider.ts` boilerplate
* `NamespaceProvider.ts` boilerplate
* `index.ts` exports the actual plugin to be used with the CLI

* `names/NamesNamespace.ts` Defines the namespace
* `names/add/AddName.ts` Defines the real command logic for the `add name` keyword
* `names/add/AddCommandGroup.ts` Defines the commandgroup for the `add` keyword
* `names/get/GetName.ts` Defines the get commands
* `names/get/GetNames.ts` Defines another command inside the same commandgroup
* `names/get/GetCommandGroup.ts` Defines another command inside the same commandgroup

## 3. Define the namespace and commandgroups

In `names/NamesNamespace.ts`:
```typescript
import { Namespace, ICommandGroup, ICommand } from "@dolittle/tooling.common.commands";

// this defines the keyword for the CLI
const name = 'names';
// a descriptive text
const description = 'The names namespace';

export class EdgeNamespace extends Namespace {

    constructor(commands: ICommand[], commandGroups: ICommandGroup[]) {
        super(name, commands, commandGroups, description);
    }
}
```

In `names/add/AddCommandGroup.ts`:
```typescript
import { CommandGroup, ICommand } from "@dolittle/tooling.common.commands";
// this defines the commangdgroups keyword for the CLI
const name = 'add';

const description = `add names`;

export class AddCommandGroup extends CommandGroup {

    constructor(commands: ICommand[]) {
        super(name, commands, description, false);
    }
}

```

In `names/get/GetCommandGroup.ts`:
```typescript
import { CommandGroup, ICommand } from "@dolittle/tooling.common.commands";

const name = 'get';

const description = `Get a name or all the names`;

export class GetCommandGroup extends CommandGroup {

    constructor(commands: ICommand[]) {
        super(name, commands, description, false);
    }
}

```


## 4. Implement the logic to AddName.ts

In `names/add/AddName.ts`

```typescript
import { Command, CommandContext, IFailedCommandOutputter } from "@dolittle/tooling.common.commands";
import { IDependencyResolvers, PromptDependency, argumentUserInputType, IsNotEmpty } from "@dolittle/tooling.common.dependencies";
import { ICanOutputMessages, IBusyIndicator } from "@dolittle/tooling.common.utilities";
import { requireInternet, IConnectionChecker} from "@dolittle/tooling.common.packages";
// TODO: explain the fixed commandcoordinator
// import { CommandCoordinator } from "../../internal";
// import { AddLocation } from "../../internal";

const name = 'name';
const description = 'Add a name and address to the application';

// Prompt
const nameDependency = new PromptDependency(
    // name of dependency
    'name',
    'The name of the person',
    [new IsNotEmpty()],
    argumentUserInputType,
    'The address of the person'
);

export class AddNameCommand extends Command {

    constructor(private _edgeAPI: string, private _connectionChecker: IConnectionChecker, 
        private _commandCoordinator: CommandCoordinator) {
        super(name, description, false, undefined, [nameDependency]);
    }
    
    async onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers,
        failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        let context = await dependencyResolvers.resolve({}, this.dependencies);
        let name: any = context[nameDependency.name];
        await requireInternet(this._connectionChecker, busyIndicator);
        CommandCoordinator.apiBaseUrl = this._edgeAPI;
        let commandResult = await this._commandCoordinator.handle(new AddLocation(name, Guid.create()));
        outputter.print(commandResult);
    }
}
```

Let's explain what's happening in here:

```typescript
// Prompt
const nameDependency = new PromptDependency(
    // name of dependency
    'name',
    // short description
    'name and address',
    // input validators
    [new IsNotEmpty()],
    // the type of the arguments incoming
    argumentUserInputType,
    // long description
    'The name and address of the person'
);
```

`PromptDependency` handles the users input and also also works as a validator. There are different kinds of dependencies you can use. The word `Dependency` is used to mean that the command depends on some external data, be it user input through the command prompt or [INSERT SOMETHING ELSE HERE]

```typescript
export class AddNameCommand extends Command {

    constructor(private _edgeAPI: string, private _connectionChecker: IConnectionChecker, private _commandCoordinator: CommandCoordinator) {
        super(name, description, false, undefined, [nameDependency]);
    }
    
    async onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers,
        failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        let context = await dependencyResolvers.resolve({}, this.dependencies);
        let name: any = context[nameDependency.name];
        await requireInternet(this._connectionChecker, busyIndicator);
        CommandCoordinator.apiBaseUrl = this._edgeAPI;
        let commandResult = await this._commandCoordinator.handle(new AddLocation(name, Guid.create()));
        outputter.print(commandResult);
    }
}
```



TODO: add stuff about commandcoordinator and using the generated files and what is all of this extra import going on here and dependencyresolvers and ourputters and busyindicators

