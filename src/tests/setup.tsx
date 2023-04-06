/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/export */
import * as React from 'react';
import { expect, afterEach, vi } from 'vitest';
import { RenderOptions, cleanup, render } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from '../contexts/UserContext';
import { AuthContextProvider } from '../contexts/AuthContext';
import { PostContextProvider } from '../contexts/PostContext';

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
}

function AllTheProviders({ children }: AllTheProvidersProps) {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <AuthContextProvider>
          <PostContextProvider>{children}</PostContextProvider>
        </AuthContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}

const customRender = (ui: React.ReactElement, options: RenderOptions = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

// override render method
export { customRender as render };
