/* eslint-disable @typescript-eslint/ban-types */
export {};

declare global {
  namespace NodeJS {
    interface Global {
      [key: string]: object;
    }
  }
  interface Window {
    config: {
      env: string;
      apiServices?: { [key: string]: string };
    };
    colorPresets: {
      [key: string]: {
        id: string;
        name: string;
        primary: string;
        secondary: string;
      };
    };
  }
  function track(
    param1?: string,
    param2?: Object,
    param3?: Object,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...rest: any
  ): () => void;
}
