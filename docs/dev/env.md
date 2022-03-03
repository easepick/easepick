---
layout: default
nav: Environment
title: "Environment"
description: ""
parent: Development
nav_order: 1
permalink: /dev/env
---

# Development environment
{: .no_toc }

The main package’s GitHub repository hosts [all other easepick sub-packages](https://github.com/easepick/easepick/tree/master/packages).

## Requirements

In order to start developing `easepick` you will require:

* Node.js ^14.0.0
* npm 7+
* Git

## Setting up the easepick development environment

Clone the `easepick` repository:

```bash
git clone https://github.com/easepick/easepick.git
cd easepick
```

And install all easepick dependencies from the [npm registry](http://npmjs.com/).

```bash
npm install
```

Run script `scripts/env.sh` to create symlinks:

```bash
sh scripts/env.sh
```

## Running tests

In order to run tests, you need to use the `test`.

```bash
npm test
```

## Creating a build

Creating development version:

```bash
npm run dev
```

Creating minified version:

```bash
npm run prod
```