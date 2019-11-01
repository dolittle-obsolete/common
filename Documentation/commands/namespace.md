---
title: Namespace
description: Learn about the commands system
keywords: Tools, tooling platform, commands, namespace
author: einari, woksin
aliases: /tools/common/commands/namesoace
---

The namespace represents a grouping of related [commands](../command) and [command groups](../command_group).

Namespaces are created in one of two ways; either directly by providing namespaces to the [command manager](../command_manager) or indirectly while discovering [boilerplates](../../boilerplates).

### Structure

A namespace consists of a name, a short and a long description, commands and command groups.

The namespace also has a property saying whether it has boilerplates related to it. This is so that we know which namespaces to inject commands and command groups related to boilerplates in.

### Indirect namespaces

Boilerplates can have namespace tags. While initializing, the tooling system registers all command, command group and namespace providers, it also discover all boilerplates. If there are any boilerplate with a namespace that has not been previously provided, the command manager will create a namespace and mark it as a namespace that has boilerplates.
