/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/export */
import * as React from 'react';
import { expect, afterEach, vi } from 'vitest';
import { RenderOptions, cleanup, render } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { BrowserRouter } from 'react-router-dom';
import {
  UserContextProvider,
  UserContextValueType,
} from '../contexts/UserContext';
import {
  AuthContextProvider,
  AuthContextValueType,
} from '../contexts/AuthContext';
import {
  PostContextProvider,
  PostContextValueType,
} from '../contexts/PostContext';

// extends Vitest's expect method with methods from react-testing-library

expect.extend(matchers);

//@ts-ignore
global.jest = vi;

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
interface AllTheProvidersProps {
  children: React.ReactElement;
  userContextValues?: UserContextValueType;
  authContextValues?: AuthContextValueType;
  postContextValues?: PostContextValueType;
}

function AllProviders({
  children,
  userContextValues,
  authContextValues,
  postContextValues,
}: AllTheProvidersProps) {
  return (
    <BrowserRouter>
      <UserContextProvider value={userContextValues}>
        <AuthContextProvider value={authContextValues}>
          <PostContextProvider value={postContextValues}>
            {children}
          </PostContextProvider>
        </AuthContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  providerProps?: Pick<
    AllTheProvidersProps,
    'userContextValues' | 'authContextValues' | 'postContextValues'
  >;
}

const customRender = (
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) => {
  // Fix an error when using Dialog component.
  window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
      disconnect: jest.fn(),
      observe: jest.fn(),
      unobserve: jest.fn(),
    }));

  const { providerProps } = options;

  return render(<AllProviders {...providerProps}>{ui}</AllProviders>, {
    ...options,
  });
};

export * from '@testing-library/react';

// override render method
export { customRender as render };
