---
title: Discover and Prompt Dependency
description: Learn about the dependency system
keywords: Tools, tooling platform, dependencies, discover and prompt dependency
author: einari, woksin
---

A discover and prompt dependency is a combination of a [discover dependency](../discover_dependency) and a [prompt dependency](../prompt_dependency) where *type* is *'discover'* and *userInputType* is not undefined.

The idea of the discover and prompt dependency is that the choices the user is presented with in the prompt is resolved by discovering stuff.

### Properties
It can contain all the properties of a [discover dependency](../discover_dependency) and a [prompt dependency](../prompt_dependency).

There are only two exceptions: *discoverType* cannot be *'namespace'* and *userInputType* cannot be *'argument'*. 

### Resolving
The resolving of a discover and prompt dependency needs to be done in two steps. Since a dependency cannot have two resolvers and because a [custom prompt dependency resolver has to be made](../prompt_dependency), the tool that is built upon the [Tooling Platform](../..)
would normally want to create one dependency resolver that can resolve both normal prompt dependencies and discover and prompt dependencies.

The resolving of the prompt dependencies would have to be customized, but the dependency system exposes a system for resolving discover dependencies.

This implementation could look something like this:
```typescript
import {IDependencyDiscoverResolver} from '@dolittle/tooling.common.dependencies';

export class PromptDependencyResolver implements ICanResolveDependencies  {
    
    constructor(private _discoverResolver: IDependencyDiscoverResolver, private _dolittleConfig: any) { }
    
    canResolve(dependency: IDependency): boolean {
        // If userInputType is not 'undefined' and not 'argument' it can be both a prompt dependency and a discover and prompt dependency
        return  (dependency as any).userInputType !== undefined && (dependency as any).userInputType !== argumentUserInputType;
    }
    
    resolve(context: any, dependencies: IDependency[], destinationPath: string, coreLanguage: string) {
        dependencies.forEach( dependency => {
            let choices = this._discoverResolver.resolve(<DiscoverAndPromptDependency>dependency, destinationPath, coreLanguage, this._dolittleConfig);
            context[dependency.name] = <prompt>
        });
        return new_resolved_context
    }
}
```