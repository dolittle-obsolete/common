---
title: Command Group
description: Learn about the commands system
keywords: Tools, tooling platform, commands, command group
author: einari, woksin
aliases: /tools/common/commands/command_group
---

The command group represents a grouping of related commands. It can belong directly to the [Tooling Platform](../..) or be a part of a [namespace](../namespace). 
A command group that belongs directly to the Tooling Platform is also called a default command group.

### Structure
The command group needs a name, a short and a long description, a set of commands and a boolean denoting whether the command group has something to do with [boilerplates](../../boilerplates).
Most of these properties should be self explanatory. We need to mark a command group that has something to do with boilerplates so that that it can be injected into namespaces that also are related to boilerplates.

{{% notice info %}}
Only default command groups marked with whether they have something to do with boilerplates are injected into the namespaces. It otherwise has no effect
{{% /notice %}}

### Discoverable command group
A discoverable command group is a command group that does not know about its commands until they have been loaded in at runtime. Otherwise it has all the same properties as the command group.