---
title: Command
description: Learn about the commands system
keywords: Tools, tooling platform, commands, command
author: einari, woksin
---

A command represents something that can be done / performed. A command can either be a command directly in the [Tooling Platform](../..), a part of a [command group](../command_group) can have or a part of a [namespace](../namespace).
A command that belongs directly to the Tooling Platform is also called a default command.

### Structure
A command has a pretty simple structure. It has a name, a long and a short description, [dependencies](../../dependencies), an action and a boolean denoting whether the command has something to do with [boilerplates](../../boilerplates).
Most of these properties should be self explanatory. We need to mark a command that has something to do with boilerplates so that that it can be injected into namespaces that also are related to boilerplates.


{{% notice info %}}
Only default commands marked with whether they have something to do with boilerplates are injected into the namespaces. It otherwise has no effect
{{% /notice %}}