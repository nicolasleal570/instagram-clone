import { render } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  test('Should render without crashing', () => {
    const { getByText } = render(<App />);

    expect(getByText(/HOLA MUNDO/)).toBeInTheDocument();
  });
});
