import i18n from 'i18n';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const t = (text: string, options?: any) =>
  i18n.t(text, options) as string;
