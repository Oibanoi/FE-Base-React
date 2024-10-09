// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import fs from 'fs';

// mock env
window.config = {
  env: 'dev',
};

// mock date
class MockDate extends Date {
  constructor(...args: Parameters<DateConstructor>) {
    if (args.length) {
      super(...args);
    } else {
      super('2023-09-09:00:00:00'); // now is 09/09/2023
    }
  }
}

// mock current time
global.Date = MockDate as DateConstructor;

// Ignore test console
global.console.error = jest.fn();
global.console.warn = jest.fn();

// Mock local storage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 1,
};
global.localStorage = localStorageMock;

// Mock react-router-dom
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useLocation: jest.fn().mockReturnValue({ pathname: '/' }),
  };
});

// Custom mocks
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock all services
const apiDir = 'src/services/apis';
const ignoreFiles = ['request.ts'];
fs.readdirSync(apiDir)
  .filter((file: string) => !ignoreFiles.includes(file))
  .forEach((file: string) => {
    const path = `../${apiDir}/${file}`;
    jest.doMock(path, () => jest.requireActual(path.replace('apis', 'mocks')));
  });
