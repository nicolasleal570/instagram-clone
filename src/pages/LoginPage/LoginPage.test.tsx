import { fireEvent, render, waitFor } from '../../tests/setup';
import { LoginPage } from './LoginPage';

describe('Test Login page component', () => {
  test('Should render correctly', async () => {
    const { getByText, getByRole } = render(<LoginPage />);

    const usernameInput = getByRole('textbox', { name: 'username' });
    const loginButton = getByText(/Entrar/i);
    const backButton = getByText(/Volver al feed/i);
    const signUpLink = getByText(/Regístarte aquí/i);

    await waitFor(() => {
      expect(usernameInput).toBeInTheDocument();
      expect(loginButton).toBeInTheDocument();
      expect(backButton).toBeInTheDocument();
      expect(signUpLink).toBeInTheDocument();
    });
  });

  test('Should display error if username is empty', async () => {
    const mockOnSubmit = jest.fn();
    const { getByText } = render(<LoginPage mockOnSubmit={mockOnSubmit} />);

    fireEvent.click(getByText(/Entrar/i));

    await waitFor(() => {
      expect(
        getByText(/Debes ingresar un nombre de usuario válido/i)
      ).toBeInTheDocument();

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  test('Should display error if username is not valid', async () => {
    const { getByText, getByPlaceholderText } = render(<LoginPage />);

    fireEvent.change(getByPlaceholderText(/john_doe23/i), {
      target: { value: 'Hello world' },
    });

    fireEvent.click(getByText(/Entrar/i));

    await waitFor(() => {
      expect(
        getByText(/Debes ingresar un nombre de usuario válido/i)
      ).toBeInTheDocument();
    });
  });

  test('Should display error if username is less than 3 characters long', async () => {
    const { getByText, getByPlaceholderText } = render(<LoginPage />);

    fireEvent.change(getByPlaceholderText(/john_doe23/i), {
      target: { value: 'ab' },
    });

    fireEvent.click(getByText(/Entrar/i));

    await waitFor(() => {
      expect(
        getByText(/Debes ingresar un usuario de mínimo 3 caracteres/i)
      ).toBeInTheDocument();
    });
  });

  test('Should display error if username is longer than 20 characters long', async () => {
    const { getByText, getByPlaceholderText } = render(<LoginPage />);

    fireEvent.change(getByPlaceholderText(/john_doe23/i), {
      target: { value: 'foo'.repeat(20) },
    });

    fireEvent.click(getByText(/Entrar/i));

    await waitFor(() => {
      expect(
        getByText(/Debes ingresar un usuario de máximo 20 caracteres/i)
      ).toBeInTheDocument();
    });
  });

  test('Should send the form', async () => {
    const mockOnSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <LoginPage mockOnSubmit={mockOnSubmit} />
    );

    fireEvent.change(getByPlaceholderText(/john_doe23/i), {
      target: { value: 'john_doe23' },
    });

    fireEvent.click(getByText(/Entrar/i));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
