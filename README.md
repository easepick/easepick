easepick
===

### Create a new plugin:
1. Create a folder in `packages` folder. (Eg.: myawesome-plugin)
2. Add `package.json` and `tsconfig.json` to `myawesome-plugin` folder. (Copy and edit from exists plugins)
3. Create `src` folder in `myawesome-plugin` folder.
4. Create `index.ts` and `index.scss`
5. Create symlink to `myawesome-plugin` folder in `node_modules/@easepick` folder.
6. Add plugin references in `~/tsconfig.json`.
7. Add plugin in `rollup.config.js` file.