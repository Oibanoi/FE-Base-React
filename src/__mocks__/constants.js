/**
 * This mock is to get rid of wrong dependencies and load
 * dependencies on demand. For example:
 *
 * We have an entry file:
 * // helpers/index.ts
 * export { default as commonHelpers } from './helper';
 * export { default as stringHelpers } from './string';
 * export { default as dateTimeHelpers } from './dateTime';
 * ...
 *
 * And a consumer:
 * // hooks/product.ts
 * import { commonHelpers } form 'helpers'
 * ...
 *
 * Without this, resolver will require all dependencies of `helpers/index.ts` (
 * common.ts, string.ts, dateTime.ts, ...) but there is only one will be used.
 * Therefore, there are lots of wrong dependencies and potentially lead to
 * circular imports.
 */
module.exports = new Proxy(
  {},
  {
    get(_, name) {
      return require(`../constants/${name.replace('Constants', '')}`).default;
    },
  }
);
