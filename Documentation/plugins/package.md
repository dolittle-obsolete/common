---
title: Package
description: Learn about the plugins system
keywords: Tools, tooling platform, plugins, package
author: einari, woksin
---

Plugins are one of two extension points in the tooling. Anyone can publish new plugins 

### Package structure
One simply adheres to the rules for [tooling packages](../../packages/package) and include the *'plugins'* keyword in the *keywords* list in the package.json. 
Then simply publish the package and every running tooling with the [Tooling Platform](../..) with a version that satisfies that package's compatible tooling version range can install that plugin. 
