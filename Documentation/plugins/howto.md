# How to write a Dolittle CLI plugin with namespaces, commandgroups and commands

This tutorial shows you how to write a simple plugin to utilize [Commands](https://dolittle.io/runtime/runtime/command/about_commands/) and [Queries](https://dolittle.io/runtime/runtime/read/query/) from a simple Dolittle application.

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
|   ├──── namespace
|   ├────── commandgroup
|   ├───────── YourCommand.ts
|   └───────── YourCommandGroup.ts
```

