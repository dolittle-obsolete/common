---
title: Providing System
description: Learn about the commands system
keywords: Tools, tooling platform, commands, providing system
author: einari, woksin
---

The commands system does not know about any concrete commands, it relies on others to create and register providers that can provide [commands](../command), [command groups](../command_group) and [namespaces](../namespace).

A provider is simply an interface that exposes one method, *provide*, which returns a list of something. There are essentially three types of providers that the [command manager](../command_manager) deals with; 
*ICanProvideDefaultCommands*, ICanProvideDefaultCommandGroups* and *ICanProvideNamespaces*