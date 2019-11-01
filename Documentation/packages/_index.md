---
title: Packages
description: Learn about the packages system
keywords: Tools, tooling platform, packages
author: einari, woksin
weight: 10
aliases: /tools/common/packages
---

The package system is essentially what makes the tooling built upon the [Tooling Platform](..) extensible.

In essence, [boilerplates](../boilerplates) and [plugins](../plugins) are just node packages, they can be local packages or packages on a node package registry like [npmjs](https://www.npmjs.com). The boilerplates and plugins that are installed on your system is what defines the functionalities of the tooling you're using.

The package system provides utilities for working with boilerplate and plugin packages.

### Compatibility
Boilerplates and plugins needs to state which versions of the tooling that it supports. This is a part of the [package definition](./package). 

The Tooling Platform will only download and use packages that are compatible with itself.

### Downloading
The package system exposes functionality to download the latest compatible packages online from [npmjs](https://www.npmjs.com). For now we only support to download packages through the 'npm' command. All packages will be downloaded globally using the -g option. Read more [here](./package_directory) on how they are stored.

A package can be manually downloaded by doing
```shell
$ npm i -g package-to-install
```