---
title: Content Boilerplates
description: Learn about the boilerplates system
keywords: Tools, tooling platform, boilerplates, content boilerplates
author: einari, woksin
aliases: /tools/common/boilerplates/content_boilerplates
---

The content boilerplate is the most complicated form of boilerplate. It's a type of boilerplate that describes a suit of files and directories that's going to be created.

### Adornment boilerplates
A content boilerplate can have a number of adornment boilerplates. Adornment boilerplates are boilerplates that are built on top of their parent boilerplate. One can only add one adornment boilerplate on top of a content boilerplate.

If the boilerplate.json configuration has a *parent* configuration it is an adornment boilerplate.

### Structure
As mentioned [before](../), a content boilerplate is defined by a boilerplate.json that might look something like this:
```json
{
    "name": "Application template",
    "language": "any",
    "type": "application",
    "description": "The application template",
    "dependencies": {
        "name": {
            "description": "The name of the application",
            "type": "userInput",
            "promptMessage": "The name of the application",
            "userInputType": "argument"
        }
    }
 }
 
```

There is only one requirement. A content boilerplate package needs to include a folder named "Content" at the root (same level as the boilerplate.json). Then all the files and folders in the 'Content' folder will be created.

### Properties

##### target (optional) - string
Indicates the target of the boilerplate. E.g *'web'*, *'bot'*, *'edge'*.

##### framework (optional) - string
Indicates the framework of the boilerplate, if relevant.

##### parent (optional) - object
Indicates the parent boilerplate for this boilerplate. This also indicates that this is an adornment boilerplate. 
The parent object must consist of a *name*, *type* and *language* that should indicate which content boilerplates this can be an adornment for.