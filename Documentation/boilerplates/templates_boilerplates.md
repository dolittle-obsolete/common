---
title: Templates Boilerplates
description: Learn about the boilerplates system
keywords: Tools, tooling platform, boilerplates, templates boilerplates
author: einari, woksin
---

The templates boilerplates is the simplest kind of boilerplate. It's basically a collection of templates that can be created.

All template boilerplates by default have a 'name' prompt dependency.

### Structure
As mentioned [before](../), a templates boilerplate is defined by a boilerplate.json that might look something like this:
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

There is only one requirement to templates boilerplates. A templates boilerplate package needs to include a folder named "Templpates" at the root (same level as the boilerplate.json). 

Inside the 'Templates' folder there should be a folder per template.

A template is a folder that has a 'template.json' configuration file. All other files inside that folder will be created.

### Template
A template is a description of the actual files being created. It has a configuration that is pretty similar to the boilerplate configuration.

A template belongs to a templates boilerplate, thus the properties of the template is inherited from the boilerplate it's a part of.

#### Structure
The template is defined by a 'template.json' configuration that might look something like this:
```json
{
   "name": "Concept template",
   "type": "concept",
   "area": "concepts",
   "description": "Creates a concept",
   "dependencies": {
        "conceptType": {
            "description": "The type of the Concept",
            "type": "userInput",
            "userInputType": "input",
            "promptMessage": "Concept as (Concept Type):"
        }
    }
}
```
#### Properties
##### name - string
The name of the template

##### type - string
The type of the template. Can be anything

##### area - string
The area that this template belongs to to. E.g 'read', 'domain', 'events'

##### description - string
The description of the template

##### dependencies (optional) - [Dependency object](../../dependencies)
Is an object that represents the boilerplate's dependencies
