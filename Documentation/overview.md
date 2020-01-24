---
title: Overview
url: /tooling/tooling-platform/
description: Learn about the tooling platform
keywords: Tools, tooling platform 
author: einari, woksin
weight: 1
repository: https://github.com/dolittle-tools/common
aliases:
    - /tools/common
    - /tooling/tooling-platform/overview/
---

[Common tooling](https://www.github.com/dolittle-tools/common) represents a set of [Node](https://nodejs.org/) packages that makes up a tooling system / platform for which Dolittle tools can be built upon.
The common tooling is built in such a way that it can provide a common tool set for tools like [CLIs](https://www.github.com/dolittle-tools/cli) and editor extensions ([vscode](https://www.github.com/dolittle-tools/vscode)) so that they can provide more or less the functionality with low effort. Read about how to extend the tooling system [here](./boilerplates) and [here](plugins)

{{% notice note %}}
The tooling system requires Node.js ≥ 10.0.0
{{% /notice %}}
