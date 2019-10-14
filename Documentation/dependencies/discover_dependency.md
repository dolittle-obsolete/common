---
title: Discover Dependency
description: Learn about the dependency system
keywords: Tools, tooling platform, dependencies, discover dependency
author: einari, woksin
aliases: /tools/common/dependencies/discover_and_prompt_dependency/
---

As stated [previously](..), a discover dependency is a dependency that is resolved by the dependency system itself. Normally through traversing through files.

### Properties

#### discoverType - string

There are different types of discover dependencies: **_'namespace'_**, **_'file'_**, **_'fileContent'_**, **_'multipleFiles'_** and **_'multipleFileContents'_**

The **_'namespace'_** discover dependency is a special kind of dependency where a 'namespace' is resolved. 'namespace' is a dot (.) separated string that is resolved by traversing the file system backwards until it finds a file that matches the _milestone_ regex pattern.
The first segment of the 'namespace' is the name of that milestone file and the rest of the segments are the names of the folders going back to the starting point.

This type is actually strictly tied to the Dolittle C# SDK for the moment. It's something that is not entirely decided upon and may be subject to change or removal down the line.

(NOT IMPLEMENTED YET. CAN PERHAPS BE REMOVED) The **_'file'_** discover dependency uses the _fileMatch_ and _contentMatch_ regex patterns to match a single file and return its file name. If _fromArea_ is not given it search the file directory downwards from the given starting point.

(NOT IMPLEMENTED YET. CAN PERHAPS BE REMOVED) The **_'fileContent'_** discover dependency uses the _fileMatch_ and _contentMatch_ regex patterns to match a single file and return its content. If _fromArea_ is not given it search the file directory downwards from the given starting point

The **_'multipleFiles'_** discover dependency uses the _fileMatch_ and _contentMatch_ regex patterns to match multiple files and return the file names. If _fromArea_ is not given it search the file directory downwards from the given starting point

(NOT IMPLEMENTED YET) The **_'multipleFileContents'_** discover dependency uses the _fileMatch_ and _contentMatch_ regex patterns to match multiple files and return the contents. If _fromArea_ is not given it search the file directory downwards from the given starting point

#### withNamespace (optional) - boolean

An optional field denoting that when the discover types is not _'namespace'_ instead of resolving a file path or file content it instead returns an object where 'value' is the file name or content and 'namespace' is the resolved namespace for that file.

#### milestone (optional) - string / javascript regex

An optional field that represents a regex pattern matching a file name for finding the 'milestone' when resolving a 'namespace'.

Required when discover type is _'namespace'_ or when the _withNamespace_ is true.

#### fileMatch (optional) - string / javascript regex

An optional field that represents a regex pattern matching a file name.

Required when discover type is not _'namespace'_

#### contentMatch (optional) - string / javascript regex

An optional field that represents a regex pattern matching a file's content.

Is only in use when discover type is not _'namespace'_, it is however optional

#### fromArea (optional) - string

An optional field that denotes the area / folder from where the file traversing should look from. The area is simply a regex pattern for a folder. It maps up the 'fromArea' with a folder name based on a [.dolittlerc](../../configurations/dolittlerc) configuration file.

### Resolving

Dependency resolvers that resolves discover dependencies are shipped with the dependency system.
