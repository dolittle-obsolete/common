---
title: Scripts
description: Learn about the boilerplates system
keywords: Tools, tooling platform, boilerplates, scripts
author: einari, woksin
---

{{% notice warning %}}
Not fully implemented yet. 
{{% /notice %}}

Scripts can be attached to boilerplates. 

There are mainly three different kinds of scripts: ***creation***, ***build*** and ***run*** 

### Structure
Scripts is an object where the key is the type of the script and the value is a list of that can be include a string or an object consisting of a *command*, *arguments* list and *currentWorkingDirectory*

```json
{
    "creation": [
        {
            "command": "dotnet",
            "arguments": ["add", "package", "Veracity.Authentication.OpenIDConnect.Core", "-v", "1.0.0"],
            "currentWorkingDirectory": "Core"
        },{
            "command": "dotnet",
            "arguments": ["add", "package", "Microsoft.AspNetCore.All", "-v", "2.1.4"],
            "currentWorkingDirectory": "Core"
        },{
            "command": "dotnet",
            "arguments": ["restore"],
            "currentWorkingDirectory": "Core"
        }
    ]
}
```
