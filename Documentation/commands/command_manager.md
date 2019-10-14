---
title: Command Manager
description: Learn about the commands system
keywords: Tools, tooling platform, commands, command manager
author: einari, woksin
aliases: /tools/common/commands/command_manager
---

We need a system that knows about and manages all [commands](../command), [command groups](../command_group), and [namespaces](../namespace).
This includes knowing how to execute a command and also managing all [providers](../providing_system).

Providers are registered to the command manager and it ensures that the providers are valid. For example there cannot exist multiple default commands, command groups or namespaces with the same name. 
And there cannot exist multiple commands in a command group with the same name. 

