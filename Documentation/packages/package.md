---
title: Package
description: Learn about the packages system
keywords: Tools, tooling platform, packages, package
author: einari, woksin
---

Packages are node packages used to extend the tooling. For now the extension points are limited to [boilerplates](../../boilerplates) and [plugins](../../plugins).

### Requirements
Packages are defined, and found in the registry, by a few markers in the package.json file. 
There are two requirements:

The first requirement is that all packages must have the 'dolittle' and 'tooling' keywords in the *keywords* list in the package.json

The second is that all packages must have a *dolittle* field in the package.json with a *tooling* field representing the semver range of the tooling system that this particular package is compatible with.

The package.json will be looking something like this.
```json
{
    "name": "some-package-name",
    "version": "<version>",
    "keywords": ["dolittle", "tooling"],
    "dolittle": {
        "tooling": "<targeted version or range>"
    }
}
```

### Naming
We use a node package naming convention for packages.

{{% notice info %}}
The naming actually does not mean anything as of now, but we could be using the name to more efficiently find packages online on npmjs for example.
{{% /notice %}}

#### Boilerplate
@dolittle/boilerplates.\<namespace if any\>.\<name\>.\<language if for specific language\>

@\<scope\>/dolittle.boilerplates.\<namespace if any\>.\<name\>.\<language if for specific language\>

dolittle.boilerplates.\<namespace if any\>.\<name\>.\<language if for specific language\>

#### Plugin
@dolittle/tooling.plugin.\<name\>

@\<scope\>/dolittle.tooling.plugin.\<name\>

dolittle.tooling.plugin.\<name\>
