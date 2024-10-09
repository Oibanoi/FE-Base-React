# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Naming conventions

- Files naming in `index.ts` should following the below convention so that the mock files in `__mocks__` folder will work correctly :

  - Hook: {fileName} + `Hooks`. example: `userHooks`
  - Constant: {fileName} + `Constants`. example: `userConstants`
  - Helper: {fileName} + `Helpers`. example: `userHelpers`
  - Services: {fileName} + `Services`. example: `userServices`
  - ...

- If you want to follow your own convention, then you should change the replace text in file in `__mocks__` folder, for example:

  - I want constants files to have name like: {fileName} + `ConstantFile` (example: `userConstantFile`).
  - Modify file `src/__mocks__/constants.js` like this:

    - BEFORE

    ```js
    module.exports = new Proxy(
      {},
      {
        get(_, name) {
          return require(`../constants/${name.replace('Constants', '')}`)
            .default;
        },
      }
    );
    ```

    - AFTER

    ```js
    module.exports = new Proxy(
      {},
      {
        get(_, name) {
          // change the replace text in replace func
          return require(`../constants/${name.replace('ConstantFile', '')}`)
            .default;
        },
      }
    );
    ```
