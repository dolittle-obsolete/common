---
title: .dolittlerc
description: Learn about the configuration system
keywords: Tools, tooling platform, configurations, .dolittlerc
author: einari, woksin
---

The configurations system uses [rc](https://www.npmjs.com/package/rc) to use rc configuration files called .dolittlerc to give the [Tooling Platform](../..) a dolittle configuration object.

As of now this configuration object is only used to determine folder name for a specific area for a core language. The default .dolittlerc configuration folder looks like this:

```json
{
    "any": {
        "concepts": "Concepts",
        "domain": "Domain",
        "events": "Events",
        "read": "Read"
    },
    "csharp": {
        "concepts": "Concepts",
        "domain": "Domain",
        "events": "Events",
        "read": "Read"
    }
}
```

This configuration object is for example used by the dependency system when resolving [discover dependencies](../../dependencies/discover_dependency)