---
title: Commands
description: Learn about the commands system
keywords: Tools, tooling platform, commands
author: einari, woksin
weight: 10
---

The commands system is related to everything around the execution of a command. It is essentially the core of the [Tooling Platform](../), providing the system to provide actual functionality to the tools built upon the Tooling Platform.
It makes it possible to create commands, provide new commands to the Tooling Platform and to execute them.

There are three important building blocks; [Commands](./command), [CommandGroups](./command_group) and [Namespaces](./namespace), with the Command being at the core of this. These pieces are glued together in the [Command Manager](./command_manager).