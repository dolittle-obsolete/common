---
title: Get started
description: Learn about the boilerplates system
keywords: Tools, tooling platform, boilerplates
author: einari, woksin
weight: 10
aliases:
    - /tools/common/boilerplates/
    - /tooling/tooling-platform/boilerplates/get_started/
---

The boilerplates is one of the key building blocks in the [Tooling Platform](../). A boilerplate is basically a description of something you'd want created, essentially a template.

There are currently two types of boilerplates; [***content boilerplates***](./content_boilerplates) and [***templates boilerplates***](./templates_boilerplates)

### Templating
We use [handlebars](https://handlebarsjs.com/) as a templating engine in the boilerplates system. When a boilerplate is created a context object is passed to the templating engine, creating the context for which files can be created from.
So in the files included in the boilerplates you'd simply have '{{\<fromContext\>}}' to make use of the templating system. See an [example](https://github.com/dolittle-runtime/DotNET.SDK/tree/master/Boilerplates/Artifacts/Templates/CommandHandler)

{{% notice info %}}
File names can also be templated.
{{% /notice %}}

#### Dependencies
The dependencies related to a boilerplate are resolved and put into the context object that eventually goes into the templating engine.

### Extension
Boilerplates represents one of the two [extension points](./package) for the tooling. New boilerplates can be created and boilerplates can be updated without having to to patch the tools, one can simply just install them directly through the tools. 
Any person can create a boilerplate for the dolittle tooling system and make it available to anyone by simply publishing it to [npmjs](https://www.npmjs.com).

### Structure
A boilerplate is essentially a json object represented by a boilerplate.json configuration.

The common structure for boilerplates includes; *name*, *language*, *description*, *type*, *dependencies*, *namespace* and *scripts* 

Example of a boilerplate.json for a templates boilerplate:
```json
{
    "name": "C# artifact templates",
    "language": "csharp",
    "type": "templates",
    "description": "All artifact templates for C#",
    "dependencies": {
        "namespace": {
            "description": "The namespace of the artifact",
            "type": "discover",
            "discoverType": "namespace",
            "milestone": ".*\\.csproj$" 
        }
    }
}
```

### Properties

##### name - string
Is the name of the boilerplate.

##### language - string 
Represents the core language of the created boilerplate. E.g *'any'* or *'csharp'* 

##### type - string 
Represents the type of the boilerplate. The *'templates'* type denotes that this is a [templates boilerplate](./templates_boilerplates), any other value indicates it's a [content boilerplate](./content_boilerplates)

##### dependencies (optional) - [Dependency object](../dependencies) 
Is an object that represents the boilerplate's dependencies

##### namespace (optional) - string
The namespace that this boilerplate is under. If it's not under a namespace it should be *undefined*.

##### scripts (optional) - [Scripts object](./scripts)
Is an object that represents scripts that'll be executed in a specified part of the "boilerplate creation life cycle" 
