---
title: Package
description: Learn about the boilerplates system
keywords: Tools, tooling platform, boilerplates, package
author: einari, woksin
aliases: /tools/common/boilerplates/package
---

Boilerplates are one of two extension points in the tooling. Anyone can publish new boilerplates 

### Package structure
Following the rules for [content boilerplates](../content_boilerplates) and [templates boilerplates](../templates_boilerplates) one simply adheres to the rules for [tooling packages](../../packages/package) 
and include the *'boilerplates'* keyword in the *keywords* list in the package.json. 
Then simply publish the package and every running tooling with the [Tooling Platform](../..) with a version that satisfies that package's compatible tooling version range can install that boilerplate. 
