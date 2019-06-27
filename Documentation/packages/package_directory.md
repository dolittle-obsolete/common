---
title: Package Directory
description: Learn about the packages system
keywords: Tools, tooling platform, packages, package directory
author: einari, woksin
---

The [Tooling Platform](../..) would need a well-known place to look for, and install, packages in. Right now all the packages are put inside the global node_modules folder, as is, when they are installed.

{{% notice info %}}
More specifically the node_modules folder used is the one that is given when doing the
```shell
$ npm root -g
```
command in the environment that the tooling in executed in.

One cool side effect that's achieved with this is that you can have multiple 'tooling environments' with their own plugins and boilerplates when using a tool like [nvm](https://github.com/nvm-sh/nvm). 

For example when using the [Dolittle CLI tool](https://www.github.com/dolittle-tools/cli) together with nvm you would have the CLI linked with the node version you're using with nvm, the plugins and boilerplates would also be linked with the node version.
{{% /notice %}}

{{% notice warning %}}
Having npm installed is a requirement for the Tooling Platform to work.
{{% /notice %}}