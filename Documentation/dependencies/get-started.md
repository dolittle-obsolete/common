---
title: Get started
description: Learn about the dependency system
keywords: Tools, tooling platform, dependencies
author: einari, woksin, joel
weight: 10
aliases:
    - /tools/common/dependecies
---

A dependency is in essence just a requirement, an argument, to something.
[Commands](../commands) and [boilerplates](../boilerplates) can have dependencies. A dependency for a command could be a simple argument or an option.
Shell example for command dependencies:
```shell
$ program <dependency> --<anotherDependency> 
```
While for boilerplates it would in most cases be an argument to the templating engine, for example for the 'application' boilerplate a dependency would be the name of the application:
```json
{
    "id": "some-uuid",
    "name": <'name' dependency>
}
``` 

### Structure

A dependency can be created programmatically, for example for a command, or it can be defined as part of a json object.

For json a dependency is a key-value pair where the key is the name of the dependency and the value is an object with the properties. Thus the dependencies for something (a boilerplate, for instance) is a map.
```json
{
    "dependencyName": {
        "description": "",
        "type": ""
    },
    "secondDependencyName": {
        "description": "",
        "type": ""
    },
}
```

### Properties

#### description - string
Is simply the description of this dependency. For a CLI, for instance, it can be the text printed out in association with the dependency when doing ---help.

#### type - string
Is the type of dependency. The dependency type determines how that specific dependency is going to be resolved.

There are two possible values for 'type': ***'userInput'*** and ***'discover'***

A ***'userInput'*** dependency, also called [Prompt Dependency](./prompt_dependency), is a dependency that is resolved by the user, usually as an argument or as an answer to a prompt.

A ***'discover'*** dependency is a dependency that is resolved automatically, it usually involves finding one or more files based on a regex pattern.


### Resolving
When a boilerplate or command have dependencies we would expect that they'd be resolved somehow, somewhere, before they are needed. 
The dependency system provides an interface defining a system that can resolve dependencies called *ICanResolveDependencies*. That interface simply provides two, self explaining, methods: *canResolve* and *resolve*.

The dependency system exposes a system that knows about all registered resolvers, so when a dependency is attempted resolved this is where the resolving starts. For any given dependency that is attempted resolved the dependency system will find a resolver that can resolve the dependency, meaning that there can only exist one resolver that can resolve it, otherwise the dependency system will fall over.

{{% notice info %}}
There are a few dependency resolvers provided by the dependency system, but every tool built upon the [Tooling Platform](..) will need to create some of its own. See [Prompt dependency](./prompt_dependency) for more info
{{% /notice %}}


