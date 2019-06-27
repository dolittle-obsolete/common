---
title: Prompt Dependency
description: Learn about the dependency system
keywords: Tools, tooling platform, dependencies, prompt dependency
author: einari, woksin
---

As stated [previously](..), a prompt dependency is a dependency that is resolved by some kind of user interaction, either by a given argument or as an answer to a prompted question. 


### Properties

#### userInputType - string
There are different types of prompt dependencies: ***'argument'***, ***'input'***, ***'chooseOne'***, ***'chooseMultiple'***

The ***'argument'*** prompt dependency is a special kind of dependency. The user is not necessarily prompted for it, it can be 'pre supplied', for 
example in the case of a command line argument to a command. 

The ***'input'*** prompt dependency is just a text input prompt.

The ***'chooseOne'*** prompt dependency prompts the user to choose one item from the list of choices.

The ***'chooseMultiple'*** prompt dependency prompts the user to choose zero or more items from the list of choices.

#### promptMessage - string
Is the message that the user is prompted with.

#### optional (optional) - boolean
Denotes whether this dependency is optional or required. Default value is false. 

The most likely use of optional dependencies, for example in the case of a CLI, would be options.
```shell
$ program <command> <requiredDependency> <--optionalDependency>  
```

#### choices (optional) - list of strings 
Is a list of choices given to the user. 

#### customInput (optional) - string
Can be used to denote a 'custom input: ' choice when *userInputType* is *'chooseOne'* or *'chooseMultiple'*.

{{% notice info %}}
Note since this concerns *'non-argument'* prompt dependencies and that the tool built upon the Tooling Platform would need to create its own prompt dependency resolver, there are no concrete implementation manipulating the *'customInput'* field. So how it is handled is up to the tool. 
{{% /notice %}}

### Resolving

When developing an application that uses the [Tooling Platform](../..) one would have to create an implementation of a dependency resolver that can resolve prompt dependencies. This is simply because there is no way for the dependency system to infer how a prompt dependency is resolved.

{{% notice info %}}
In a typescript application this could simply be done by having a class implement the ICanResolveSyncDependencies interface.
```typescript
export class PromptDependencyResolver implements ICanResolveDependencies  {
    
    canResolve(dependency: IDependency): boolean {
        return whether_dependency_is_the_type_of_prompt_dependency_this_resolver_can_resolve
    }
    
    resolve(context: any, dependencies: IDependency[], destinationPath?: string, coreLanguage?: string, args?: string[]) {
        return context_with_resolved_dependencies
    }
}
```
And then you would have to add this resolver to the dependency system. 
```typescript
import {dependencyResolvers} from '@dolittle/tooling.common.dependencies';

dependencyResolvers.add(new PromptDependencyResolver())
```
{{% /notice %}}

There is, however, one exception. A dependency resolver for prompt dependencies with *userInputType* of *'argument'* is already shipped with the dependency system. The idea is that *'argument'* prompt dependencies are 'pre supplied', so no further prompting would be necessary.

{{% notice warning %}}
Note that in the scenario of a CLI this would make sense, but not necessarily for an editor extension.

The argument dependency resolvers requires the arguments (optional or required) to be given to the *resolve* method, they are not prompted to the user as normal prompt dependencies. But in the case for an editor extension, for example for vscode, the user would have to be prompted for these dependencies (like a normal prompt dependency). However solving this should be trivial in most cases. One could for example filter all dependencies for the ones where *userInputType* equals *'argument'* and create prompts for them and fill up the arguments list before passing the dependencies over to the *resolve* method.  
{{% /notice %}}
