import { fireEvent, render, waitFor } from '../../tests/setup';
import { LoginPage } from './LoginPage';

describe('Test Login page component', () => {
  test('Should render correctly', () => {
    const { getByText, getByRole } = render(<LoginPage />);

    getByRole('textbox', { name: 'username' });
    getByText(/Entrar/i);
    getByText(/Volver al feed/i);
    getByText(/Regístarte aquí/i);
  });

  test('Should display error if username is empty', async () => {
    const mockOnSubmit = jest.fn();
    const { getByText, getByRole } = render(
      <LoginPage mockOnSubmit={mockOnSubmit} />
    );

    fireEvent.click(getByRole('button', { name: /Entrar/i }));

    await waitFor(() => {
      getByText(/Debes ingresar un nombre de usuario válido/i);
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  test('Should display error if username is not valid', async () => {
    const { getByText, getByPlaceholderText, getByRole } = render(
      <LoginPage />
    );

    fireEvent.change(getByPlaceholderText(/john_doe23/i), {
      target: { value: 'Hello world' },
    });

    fireEvent.click(getByRole('button', { name: /Entrar/i }));

    await waitFor(() => {
      getByText(/Debes ingresar un nombre de usuario válido/i);
    });
  });

  test('Should display error if username is less than 3 characters long', async () => {
    const { getByText, getByPlaceholderText, getByRole } = render(
      <LoginPage />
    );

    fireEvent.change(getByPlaceholderText(/john_doe23/i), {
      target: { value: 'ab' },
    });

    fireEvent.click(getByRole('button', { name: /Entrar/i }));

    await waitFor(() => {
      getByText(/Debes ingresar un usuario de mínimo 3 caracteres/i);
    });
  });

  test('Should display error if username is longer than 20 characters long', async () => {
    const { getByText, getByPlaceholderText, getByRole } = render(
      <LoginPage />
    );

    fireEvent.change(getByPlaceholderText(/john_doe23/i), {
      target: { value: 'foo'.repeat(20) },
    });

    fireEvent.click(getByRole('button', { name: /Entrar/i }));

    await waitFor(() => {
      getByText(/Debes ingresar un usuario de máximo 20 caracteres/i);
    });
  });

  test('Should send the form', async () => {
    const mockOnSubmit = jest.fn();
    const { getByPlaceholderText, getByRole } = render(
      <LoginPage mockOnSubmit={mockOnSubmit} />
    );

    fireEvent.change(getByPlaceholderText(/john_doe23/i), {
      target: { value: 'john_doe23' },
    });

    fireEvent.click(getByRole('button', { name: /Entrar/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
