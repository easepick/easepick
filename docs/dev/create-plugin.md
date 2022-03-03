---
layout: default
nav: Creating plugins
title: "Creating plugins"
description: ""
parent: Development
nav_order: 2
permalink: /dev/creating-plugins
---

# Creating plugins
{: .no_toc }

There are two ways to create a plugin:

1. TOC
{:toc}

## Creating plugin in own repository

Clone a sample plugin and install dependencies.

```bash
git clone https://github.com/easepick/sample-plugin.git
cd sample-plugin
npm install
```

Rename plugin and add your features.

## Adding plugin in main repository

1. Create a folder in `packages` folder. (Eg.: myawesome-plugin)
2. Add `package.json` and `tsconfig.json` to `myawesome-plugin` folder. (Copy and edit from existing plugins)
3. Create `src` folder in `myawesome-plugin` folder.
4. Create `index.ts` and `index.scss`
5. Create symlink to `myawesome-plugin` folder in `node_modules/@easepick` folder.
6. Add plugin references in `~/tsconfig.json`.
7. Add plugin in `rollup.config.js` file.
