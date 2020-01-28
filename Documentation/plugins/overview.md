---
title: Overview
url: /tooling/tooling-platform/plugins/
description: Learn about the plugin system
keywords: Tools, tooling platform, plugin
author: einari, woksin
weight: 10
aliases:
    - /tools/common/plugins
    - /tooling/tooling-platform/plugins/overview/
---

Plugins are one of the key building blocks in the [Tooling Platform](../). It provides a system for providing new [commands](../commands/command), [command groups](../commands/command_group) and [namespaces](../commands/namespace) into the tooling system.

### Extension
Plugins represents one of the two [extension points](../packages) for the tooling. New plugins can be installed and  updated without having to to patch the tools, one can simply just install them directly through the tools. 
Any person can create a plugin for the dolittle tooling system and make it available to anyone by simply publishing it to [npmjs](https://www.npmjs.com).


### Structure
A plugin is just a [node](https://www.nodejs.org) application that can provide commands, command groups and namespaces. It derives from and uses the constructs in the Tooling Platform to do this however it wants.

There are two things that makes a plugin. First it must adhere to the [package rules](./package). Second, it needs a javascript file called index to be at the root directory of the exported node package, or in a 'lib' or 'dist' folder.
That index.js file must export an object called ***'plugin'***, the ***'plugin'*** object must implement the *IPluginInterface*, which is just an object with three [providers](../commands/providing_system);

A *ICanProvideDefaultCommands* provider called *'defaultCommandsProvider'* that has a method called provide that returns a list of commands.

A *ICanProvideDefaultCommandGroups* provider called *'defaultCommandGroupsProvider'* that has a method called provide that returns a list of command group.

A *ICanProvideNamespaces* provider called *'namespaceProvider'* that has a method called provide that returns a list of namespaces.

In javascript it could simply be done by having this in the index.js:

```javascript
let plugin = {
    defaultCommandsProvider: {provide: () => [<commands>]},
    defaultCommandGroupsProvider: {provide: () => [<command groups>]},
    namespaceProvider: {provide: () => [<namespaces]},
}
```
(See [here](https://github.com/dolittle-runtime/Runtime/tree/master/Source/Tooling/Plugin) for example on how write a plugin)

{{% notice info%}}
A plugin is a node application. Even though it needs to have an index.js file, it does not have a to written with javascript, you could for instance write it with typescript and then make sure that it transpiles the files to a 'dist' or 'lib' folder.
{{% /notice %}}

