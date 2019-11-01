---
title: Scripts
description: Learn about the boilerplates system
keywords: Tools, tooling platform, boilerplates, scripts
author: einari, woksin
aliases: /tools/common/boilerplates/scripts
---

{{% notice warning %}}
Not fully implemented yet.
{{% /notice %}}

Scripts can be attached to boilerplates.

There are mainly three different kinds of scripts: **_creation_**, **_build_** and **_run_**

### Structure

Scripts is an object where the key is the type of the script and the value is a list of that can be include a string or an object consisting of a _command_, _arguments_ list and _currentWorkingDirectory_

```json
{
    "creation": [
        {
            "command": "dotnet",
            "arguments": ["add", "package", "Veracity.Authentication.OpenIDConnect.Core", "-v", "1.0.0"],
            "currentWorkingDirectory": "Core"
        },
        {
            "command": "dotnet",
            "arguments": ["add", "package", "Microsoft.AspNetCore.All", "-v", "2.1.4"],
            "currentWorkingDirectory": "Core"
        },
        {
            "command": "dotnet",
            "arguments": ["restore"],
            "currentWorkingDirectory": "Core"
        }
    ]
}
```
